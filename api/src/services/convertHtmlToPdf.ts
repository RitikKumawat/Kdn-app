import path from "path";
import puppeteer from "puppeteer";
import fs from "fs/promises";
export const convertInvoiceHtmlToPdf = async (
  html: string,
  fileName: string
) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser", 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage', 
      '--disable-software-rasterizer',
      '--headless=new'
    ],
    timeout: 120000, 
    protocolTimeout: 120000, 
  });
  
  try {
    const page = await browser.newPage();
    await page.setContent(html);

    const invoicePath = path.join("uploads", "invoices");
    await fs.mkdir(invoicePath, { recursive: true });
    const filePath = path.join(invoicePath, `${fileName}.pdf`);

    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
    });
    return filePath;
  } finally {
    // Ensure the browser process is closed in all cases
    await browser.close();
  }
};
