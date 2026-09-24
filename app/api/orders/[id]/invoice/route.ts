import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { invoiceService } from '@/server/services/invoice.service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { orderNumber: id }],
      },
      include: {
        items: true,
        user: { select: { name: true, email: true, phone: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const addr = (order.shippingAddress as any) || {};

    const pdfBuffer = await invoiceService.generateInvoicePdf({
      orderNumber: order.orderNumber,
      customerName: order.user?.name || addr.name || 'Valued Customer',
      email: order.user?.email || addr.email || '',
      phone: order.user?.phone || addr.phone || '',
      address: addr.line1 ? `${addr.line1}${addr.line2 ? ', ' + addr.line2 : ''}` : 'Address on file',
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      paymentMethod: order.paymentMethod === 'RAZORPAY' ? 'UPI / Online Payment' : 'Cash on Delivery',
      paymentStatus: order.paymentStatus,
      totalAmount: order.total,
      date: order.createdAt.toISOString().replace('T', ' ').substring(0, 10),
      items: order.items.map((it) => ({
        id: it.id,
        title: it.title,
        price: it.price,
        quantity: it.quantity,
      })),
    });

    const uint8 = new Uint8Array(pdfBuffer);
    return new NextResponse(uint8, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${order.orderNumber}.pdf"`,
        'Content-Length': uint8.length.toString(),
      },
    });
  } catch (error) {
    console.error('Invoice download error:', error);
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 });
  }
}
