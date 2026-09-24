import PDFDocument from 'pdfkit';

export interface InvoiceItem {
  id?: string;
  title?: string;
  productName?: string;
  price: number;
  quantity: number;
}

export interface InvoiceOrderData {
  orderNumber: string;
  customerName: string;
  email: string;
  phone?: string;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  paymentMethod: string;
  paymentStatus?: string;
  totalAmount: number;
  items: InvoiceItem[];
  date?: string;
}

export class InvoiceService {
  /**
   * Generates a branded, publication-ready PDF invoice buffer.
   */
  async generateInvoicePdf(order: InvoiceOrderData): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          margin: 45,
          size: 'A4',
          info: {
            Title: `Invoice ${order.orderNumber} - Miracle Feng Shui`,
            Author: 'Miracle Feng Shui Pvt. Ltd.',
          },
        });

        const buffers: Buffer[] = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', (err) => reject(err));

        const invoiceDate = order.date || new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        // 1. HEADER BRANDING & INVOICE TITLE
        doc
          .fillColor('#140D1F')
          .fontSize(20)
          .font('Helvetica-Bold')
          .text('MIRACLE FENG SHUI', 45, 45);

        doc
          .fillColor('#C2410C')
          .fontSize(9)
          .font('Helvetica-Bold')
          .text('CONSECRATED TREASURES & SACRED LIVING', 45, 68);

        // Right-aligned Invoice Badge & Number
        doc
          .fillColor('#140D1F')
          .fontSize(16)
          .font('Helvetica-Bold')
          .text('TAX INVOICE', 350, 45, { align: 'right', width: 200 });

        doc
          .fillColor('#555555')
          .fontSize(9)
          .font('Helvetica')
          .text(`Invoice No: INV-${order.orderNumber}`, 350, 68, { align: 'right', width: 200 })
          .text(`Date: ${invoiceDate}`, 350, 80, { align: 'right', width: 200 });

        // Decorative horizontal rule
        doc
          .strokeColor('#E1E3DF')
          .lineWidth(1)
          .moveTo(45, 100)
          .lineTo(550, 100)
          .stroke();

        // 2. SELLER & BUYER DETAILS SECTION
        const colTop = 112;

        // Seller Block
        doc
          .fillColor('#888888')
          .fontSize(8)
          .font('Helvetica-Bold')
          .text('SOLD BY:', 45, colTop);

        doc
          .fillColor('#222222')
          .fontSize(9)
          .font('Helvetica-Bold')
          .text('Miracle Feng Shui Pvt. Ltd.', 45, colTop + 12)
          .font('Helvetica')
          .text('108 Harmony Pavilion, Lotus Walk', 45, colTop + 24)
          .text('Mumbai, Maharashtra 400053, India', 45, colTop + 36)
          .text('Email: care.miraclefengshui@gmail.com', 45, colTop + 48)
          .text('GSTIN: 27AAECM1080F1Z2', 45, colTop + 60);

        // Buyer Block
        doc
          .fillColor('#888888')
          .fontSize(8)
          .font('Helvetica-Bold')
          .text('BILLED & SHIPPED TO:', 320, colTop);

        doc
          .fillColor('#222222')
          .fontSize(9)
          .font('Helvetica-Bold')
          .text(order.customerName || 'Valued Customer', 320, colTop + 12)
          .font('Helvetica')
          .text(order.address || 'Address on file', 320, colTop + 24, { width: 230 });

        const buyerAddressY = doc.y;
        doc
          .text(`Phone: ${order.phone || 'N/A'}`, 320, buyerAddressY + 2)
          .text(`Email: ${order.email || 'N/A'}`, 320, buyerAddressY + 14)
          .text(`Payment: ${order.paymentMethod} (${order.paymentStatus || 'Confirmed'})`, 320, buyerAddressY + 26);

        // 3. LINE ITEMS TABLE
        const tableTop = Math.max(doc.y + 20, 215);

        // Table Header Background
        doc
          .rect(45, tableTop, 505, 22)
          .fill('#FAF9F5');

        doc
          .fillColor('#333333')
          .fontSize(8.5)
          .font('Helvetica-Bold')
          .text('#', 55, tableTop + 6)
          .text('ITEM DESCRIPTION', 80, tableTop + 6)
          .text('QTY', 360, tableTop + 6, { width: 40, align: 'center' })
          .text('PRICE', 410, tableTop + 6, { width: 60, align: 'right' })
          .text('TOTAL', 480, tableTop + 6, { width: 60, align: 'right' });

        doc
          .strokeColor('#E1E3DF')
          .lineWidth(0.5)
          .moveTo(45, tableTop + 22)
          .lineTo(550, tableTop + 22)
          .stroke();

        let currentY = tableTop + 28;

        order.items.forEach((item, index) => {
          const itemTitle = item.title || item.productName || 'Consecrated Feng Shui Item';
          const lineTotal = item.price * item.quantity;

          doc
            .fillColor('#666666')
            .fontSize(8.5)
            .font('Helvetica')
            .text(`${index + 1}`, 55, currentY);

          doc
            .fillColor('#111111')
            .font('Helvetica-Bold')
            .text(itemTitle, 80, currentY, { width: 270 });

          const rowHeight = Math.max(doc.y - currentY, 16);

          doc
            .font('Helvetica')
            .text(`${item.quantity}`, 360, currentY, { width: 40, align: 'center' })
            .text(`INR ${item.price.toLocaleString('en-IN')}`, 410, currentY, { width: 60, align: 'right' })
            .font('Helvetica-Bold')
            .text(`INR ${lineTotal.toLocaleString('en-IN')}`, 480, currentY, { width: 60, align: 'right' });

          currentY += rowHeight + 8;

          // Row divider
          doc
            .strokeColor('#F0EFEA')
            .lineWidth(0.5)
            .moveTo(45, currentY - 4)
            .lineTo(550, currentY - 4)
            .stroke();
        });

        // 4. TOTALS SUMMARY BLOCK
        const totalsY = currentY + 10;

        doc
          .fillColor('#666666')
          .fontSize(8.5)
          .font('Helvetica')
          .text('Subtotal:', 360, totalsY, { width: 100, align: 'right' })
          .font('Helvetica-Bold')
          .fillColor('#222222')
          .text(`INR ${order.totalAmount.toLocaleString('en-IN')}`, 470, totalsY, { width: 70, align: 'right' });

        doc
          .font('Helvetica')
          .fillColor('#666666')
          .text('Shipping & Handling:', 360, totalsY + 14, { width: 100, align: 'right' })
          .font('Helvetica-Bold')
          .fillColor('#15803d')
          .text('FREE', 470, totalsY + 14, { width: 70, align: 'right' });

        doc
          .font('Helvetica')
          .fillColor('#666666')
          .text('GST (18% Included):', 360, totalsY + 28, { width: 100, align: 'right' })
          .font('Helvetica-Bold')
          .fillColor('#222222')
          .text(`INR ${Math.round(order.totalAmount * 0.18 / 1.18).toLocaleString('en-IN')}`, 470, totalsY + 28, { width: 70, align: 'right' });

        doc
          .strokeColor('#E1E3DF')
          .lineWidth(1)
          .moveTo(360, totalsY + 44)
          .lineTo(550, totalsY + 44)
          .stroke();

        doc
          .fillColor('#140D1F')
          .fontSize(11)
          .font('Helvetica-Bold')
          .text('Grand Total:', 360, totalsY + 50, { width: 100, align: 'right' })
          .text(`INR ${order.totalAmount.toLocaleString('en-IN')}`, 470, totalsY + 50, { width: 70, align: 'right' });

        // 5. LEGAL NOTICE & FOOTER
        const footerY = 700;

        doc
          .strokeColor('#E1E3DF')
          .lineWidth(0.5)
          .moveTo(45, footerY)
          .lineTo(550, footerY)
          .stroke();

        doc
          .fillColor('#888888')
          .fontSize(7.5)
          .font('Helvetica-Bold')
          .text('POLICY & SACRED LIVING NOTICE:', 45, footerY + 8)
          .font('Helvetica')
          .text(
            'All items are spiritually consecrated and energized specifically for the recipient. In accordance with our Cancellation, Return & Refund Policy, all sales are final with zero cancellations, zero returns, and zero refunds. Damaged packages reported within 48 hours qualify for a free replacement only.',
            45,
            footerY + 18,
            { width: 505 }
          );

        doc
          .fillColor('#555555')
          .fontSize(7.5)
          .text(
            'This is a computer-generated tax invoice and requires no physical signature. Thank you for inviting prosperity home!',
            45,
            footerY + 44,
            { align: 'center', width: 505 }
          );

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const invoiceService = new InvoiceService();
