import path from "path";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import fs from "fs/promises";

export const convertInvoiceHtmlToPdf = async (html:string, fileName:string) => {
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath || "/usr/bin/google-chrome-stable",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-software-rasterizer",
      "--headless=new",
      ...chromium.args, // Ensure compatibility with serverless environments
    ],
    timeout: 120000,
    protocolTimeout: 120000,
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
