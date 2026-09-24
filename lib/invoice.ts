export interface TaxInvoiceData {
  orderId: string;
  orderDate: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  deliveryAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    maker?: string;
  }>;
}

export function generateTaxInvoiceHTML(data: TaxInvoiceData): string {
  const {
    orderId,
    orderDate,
    customerName,
    customerEmail,
    customerPhone,
    deliveryAddress,
    paymentMethod,
    paymentStatus,
    totalAmount,
    items,
  } = data;

  const itemsRows = items
    .map(
      (it, idx) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 14px; color: #4b5563; font-size: 13px;">${idx + 1}</td>
        <td style="padding: 12px 14px;">
          <div style="font-weight: 600; color: #111827; font-size: 13.5px;">${it.name}</div>
          <div style="font-size: 11.5px; color: #6b7280; margin-top: 2px;">Sold by: ${it.maker || 'Miracle Feng Shui'}</div>
        </td>
        <td style="padding: 12px 14px; text-align: center; color: #374151; font-size: 13px;">${it.quantity}</td>
        <td style="padding: 12px 14px; text-align: right; color: #374151; font-size: 13px;">₹${it.price.toLocaleString('en-IN')}</td>
        <td style="padding: 12px 14px; text-align: right; font-weight: 600; color: #111827; font-size: 13.5px;">₹${(it.price * it.quantity).toLocaleString('en-IN')}</td>
      </tr>
    `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tax Invoice #${orderId} - Miracle Feng Shui</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f9fafb;
      color: #111827;
      padding: 32px 16px;
      -webkit-font-smoothing: antialiased;
    }
    .invoice-wrapper {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #111827;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #111827;
      text-transform: uppercase;
    }
    .brand-sub {
      font-size: 12px;
      color: #4b5563;
      margin-top: 4px;
      line-height: 1.5;
    }
    .tax-badge {
      text-align: right;
    }
    .tax-badge h2 {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      letter-spacing: 0.5px;
    }
    .tax-badge p {
      font-size: 12px;
      color: #6b7280;
      margin-top: 2px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 28px;
      padding: 16px 20px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }
    .meta-col h4 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #6b7280;
      margin-bottom: 6px;
      font-weight: 700;
    }
    .meta-col p {
      font-size: 13.5px;
      color: #111827;
      line-height: 1.45;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th {
      background: #f3f4f6;
      padding: 10px 14px;
      font-size: 12px;
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-top: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }
    .totals-area {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
      margin-bottom: 32px;
    }
    .totals-box {
      width: 300px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
      color: #4b5563;
    }
    .totals-row.grand-total {
      border-top: 2px solid #111827;
      border-bottom: 2px solid #111827;
      margin-top: 8px;
      padding: 10px 0;
      font-size: 16px;
      font-weight: 700;
      color: #111827;
    }
    .footer {
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 11.5px;
      color: #6b7280;
    }
    .auth-sign {
      text-align: right;
    }
    .auth-sign-box {
      border-bottom: 1px dashed #9ca3af;
      width: 160px;
      height: 40px;
      margin-left: auto;
      margin-bottom: 4px;
    }
    .print-bar {
      max-width: 800px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn-print {
      background: #111827;
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
    }
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
      }
      .print-bar {
        display: none !important;
      }
      .invoice-wrapper {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        max-width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  <div class="invoice-wrapper">
    <div class="header">
      <div>
        <div class="brand-title">Miracle Feng Shui</div>
        <div class="brand-sub">
          Official Retail & Tax Invoice<br />
          GSTIN: 07AABCM8291Q1ZX &bull; CIN: U52100DL2024PTC123456<br />
          Level 4, DLF Cyber City, Gurugram, Haryana 122002<br />
          Email: care@miraclefengshui.com &bull; Web: www.miraclefengshui.com
        </div>
      </div>
      <div class="tax-badge">
        <h2>TAX INVOICE</h2>
        <p>Original for Recipient</p>
        <p style="margin-top: 6px; font-weight: 600; color: #111827;">Invoice #: INV-${orderId}</p>
        <p>Date: ${orderDate}</p>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-col">
        <h4>Billed & Shipped To:</h4>
        <p><strong>${customerName}</strong></p>
        <p>${deliveryAddress}</p>
        ${customerPhone ? `<p>Phone: ${customerPhone}</p>` : ''}
        ${customerEmail ? `<p>Email: ${customerEmail}</p>` : ''}
      </div>
      <div class="meta-col">
        <h4>Order Summary:</h4>
        <p><strong>Order ID:</strong> #${orderId}</p>
        <p><strong>Order Date:</strong> ${orderDate}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Payment Status:</strong> ${paymentStatus}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="text-align: left; width: 40px;">#</th>
          <th style="text-align: left;">Item Description</th>
          <th style="text-align: center; width: 60px;">Qty</th>
          <th style="text-align: right; width: 110px;">Unit Price</th>
          <th style="text-align: right; width: 120px;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <div class="totals-area">
      <div class="totals-box">
        <div class="totals-row">
          <span>Subtotal</span>
          <span>₹${totalAmount.toLocaleString('en-IN')}</span>
        </div>
        <div class="totals-row">
          <span>Shipping & Handling</span>
          <span style="color: #15803d; font-weight: 600;">FREE</span>
        </div>
        <div class="totals-row">
          <span>GST (18% inclusive)</span>
          <span>₹${Math.round((totalAmount * 18) / 118).toLocaleString('en-IN')}</span>
        </div>
        <div class="totals-row grand-total">
          <span>Total Amount</span>
          <span>₹${totalAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <div>
        <p><strong>Thank you for choosing Miracle Feng Shui!</strong></p>
        <p style="margin-top: 3px;">All sacred items are authenticated and energized for harmony and wealth.</p>
        <p style="margin-top: 2px;">This is a computer-generated invoice and requires no physical signature.</p>
      </div>
      <div class="auth-sign">
        <div class="auth-sign-box"></div>
        <p>Authorized Signatory</p>
        <p>Miracle Feng Shui Pvt. Ltd.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function printIsolatedTaxInvoice(data: TaxInvoiceData): void {
  if (typeof window === 'undefined') return;
  const invoiceHtml = generateTaxInvoiceHTML(data);
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(invoiceHtml);
    doc.close();
    iframe.contentWindow?.focus();
    setTimeout(() => {
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }, 300);
  }
}

export function downloadStandaloneTaxInvoice(data: TaxInvoiceData): void {
  if (typeof window === 'undefined') return;
  const invoiceHtml = generateTaxInvoiceHTML(data);
  const blob = new Blob([invoiceHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Invoice-${data.orderId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
