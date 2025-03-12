import pdf from "html-pdf";
import path from "path";
import fs from "fs/promises";

export const convertInvoiceHtmlToPdf = async (html: string, fileName: string): Promise<string> => {
  const invoicePath = path.join(process.cwd(), "uploads", "invoices");
  await fs.mkdir(invoicePath, { recursive: true });

  const filePath = path.join(invoicePath, `${fileName}.pdf`);

  return new Promise((resolve, reject) => {
    pdf.create(html, { format: "A4" }).toFile(filePath, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.filename); // Ensure that only the filename (string) is returned
      }
    });
  });
};