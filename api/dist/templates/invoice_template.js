"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceTemplate = void 0;
const invoiceTemplate = ({ name, paymentMode, amount }) => {
    const formattedDate = new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice - Kumawat Digital Network</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
          }
          .invoice-container {
              max-width: 800px;
              margin: 20px auto;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
          }
          .header {
              text-align: center;
              margin-bottom: 20px;
          }
          .header h1 {
              font-size: 24px;
              color: #333;
              margin: 0;
          }
          table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
          }
          table th, table td {
              padding: 12px 15px;
              border: 1px solid #ddd;
              text-align: left;
          }
          table th {
              background-color: #007bff;
              color: #fff;
          }
          table td {
              color: #333;
          }
          .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #888;
          }
      </style>
  </head>
  <body>
      <div class="invoice-container">
          <div class="header">
              <h1>Kumawat Digital Network</h1>
          </div>
          <table>
              <thead>
                  <tr>
                      <th>Customer Name</th>
                      <th>Payment Mode</th>
                      <th>Amount</th>
                      <th>Date of Payment</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>${name}</td>
                      <td>${paymentMode}</td>
                      <td>${amount} Rs.</td>
                      <td>${formattedDate}</td>
                  </tr>
              </tbody>
          </table>
          <div class="footer">
              <p>&copy; 2025 Kumawat Digital Network. All Rights Reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
};
exports.invoiceTemplate = invoiceTemplate;
