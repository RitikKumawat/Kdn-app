import path from "path";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import fs from "fs/promises";

export const convertInvoiceHtmlToPdf = async (html:string, fileName:string) => {
  const executablePath = await chromium.executablePath; // Ensure it correctly fetches the path
  
  const browser = await puppeteer.launch({
    executablePath: executablePath, // Ensure compatibility
    headless: chromium.headless,
    args: chromium.args, // Ensures smooth execution on Render
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const invoicePath = path.join(process.cwd(), "uploads", "invoices");
    await fs.mkdir(invoicePath, { recursive: true });
    const filePath = path.join(invoicePath, `${fileName}.pdf`);

    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
    });

    return filePath;
  } finally {
    await browser.close(); // Ensure browser is always closed
  }
};
