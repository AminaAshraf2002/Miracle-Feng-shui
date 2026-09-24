import { orderRepository } from '../repositories/order.repository';
import { cartRepository } from '../repositories/cart.repository';
import { productRepository } from '../repositories/product.repository';
import { CreateOrderInput } from '../validators/order.validator';
import { ApiError } from '../utils/ApiError';
import { OrderStatus, PaymentMethod } from '@/app/generated/prisma/client';
import { emailService } from './email.service';

export const orderService = {
  formatOrder(order: any) {
    const address = order.shippingAddress as any;
    const addressStr = address
      ? typeof address === 'string'
        ? address
        : `${address.line1}${address.line2 ? ', ' + address.line2 : ''}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country || 'India'}`
      : '';

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      date: new Date(order.createdAt).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      customerName: address?.name || order.user?.name || 'Customer',
      email: order.user?.email || '',
      phone: address?.phone || order.user?.phone || '',
      address: addressStr,
      city: address?.city || '',
      state: address?.state || '',
      pincode: address?.pincode || '',
      totalAmount: order.total,
      paymentMethod:
        order.paymentMethod === 'COD'
          ? 'Cash on Delivery'
          : order.paymentMethod === 'RAZORPAY'
          ? 'UPI / Online Payment'
          : order.paymentMethod,
      paymentStatus: order.paymentStatus,
      status: order.status,
      courier: order.courier,
      trackingNumber: order.trackingNumber,
      createdAt: order.createdAt,
      items: order.items.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        productName: item.title,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        selectedVariations: item.selectedVariations,
        personalizationText: item.personalizationText,
        product: item.product,
      })),
    };
  },

  async createFromCart(userId: string, input: CreateOrderInput) {
    const cart = await cartRepository.findOrCreateCart(userId);
    if (!cart.items || cart.items.length === 0) {
      throw ApiError.badRequest('Cannot place an order with an empty cart');
    }

    // Validate stock and calculate total server-side
    let calculatedTotal = 0;
    const orderItemsData: {
      productId: string;
      title: string;
      price: number;
      quantity: number;
      image: string;
      selectedVariations?: any;
      personalizationText?: string;
    }[] = [];

    for (const item of cart.items) {
      const product = await productRepository.findBySlugOrId(item.productId);
      if (!product || !product.isActive) {
        throw ApiError.badRequest(`Product "${item.product.title}" is no longer available`);
      }

      if (product.stock < item.quantity) {
        throw ApiError.badRequest(
          `Insufficient stock for "${product.title}". Available: ${product.stock}, requested: ${item.quantity}`
        );
      }

      const itemPrice = product.price;
      calculatedTotal += itemPrice * item.quantity;

      orderItemsData.push({
        productId: product.id,
        title: product.title,
        price: itemPrice,
        quantity: item.quantity,
        image: product.images[0] || '',
        selectedVariations: item.selectedVariations,
        personalizationText: item.personalizationText || undefined,
      });
    }

    const orderNumber = `MFS-${Math.floor(100000 + Math.random() * 900000)}`;
    const isCod = input.paymentMethod === 'COD';
    const initialStatus: OrderStatus = isCod ? 'COD_PENDING' : 'PENDING';

    const order = await orderRepository.createOrderWithStockUpdate(
      {
        orderNumber,
        userId,
        status: initialStatus,
        paymentMethod: input.paymentMethod as PaymentMethod,
        paymentStatus: 'PENDING',
        total: calculatedTotal,
        shippingAddress: input.shippingAddress,
        items: orderItemsData,
      },
      isCod
    );

    const fullOrder = await orderRepository.findById(order.id);
    const formatted = this.formatOrder(fullOrder);

    // Send order confirmation email asynchronously
    emailService
      .sendOrderConfirmationEmail({
        orderNumber: formatted.orderNumber,
        customerName: formatted.customerName,
        email: formatted.email,
        phone: formatted.phone,
        address: formatted.address,
        paymentMethod: formatted.paymentMethod,
        paymentStatus: formatted.paymentStatus,
        totalAmount: formatted.totalAmount,
        items: formatted.items,
        date: formatted.date,
      })
      .catch((err) => console.error('[OrderService] Email dispatch failed:', err));

    return formatted;
  },

  async getUserOrders(userId: string) {
    const orders = await orderRepository.findUserOrders(userId);
    return orders.map(this.formatOrder);
  },

  async getOrderById(orderId: string, userId: string, userRole: string) {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    if (userRole !== 'ADMIN' && order.userId !== userId) {
      throw ApiError.forbidden('You do not have permission to view this order');
    }

    return this.formatOrder(order);
  },
};
