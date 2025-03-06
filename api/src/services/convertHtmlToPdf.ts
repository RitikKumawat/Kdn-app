import path from "path";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import fs from "fs/promises";

export const convertInvoiceHtmlToPdf = async (html:string, fileName:string) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath || "/usr/bin/google-chrome-stable",
      headless: true,
      args: chromium.args, // Required for running in Render
    });

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
  } catch (error) {
    console.error("Puppeteer error:", error);
    throw new Error("Failed to generate PDF.");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
