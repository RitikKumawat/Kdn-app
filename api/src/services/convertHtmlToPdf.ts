import puppeteer from "puppeteer";
import path from "path";
import fs from "fs/promises";

export const convertInvoiceHtmlToPdf = async (
  html: string,
  fileName: string
): Promise<string> => {
  const invoicePath = path.join(process.cwd(), "uploads", "invoices");
  await fs.mkdir(invoicePath, { recursive: true });

  const filePath = path.join(invoicePath, `${fileName}.pdf`);

  const browser = await puppeteer.launch({
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage", // Important for limited memory in Railway
    ],
    headless: true,
    timeout: 0, // Disable browser launch timeout
  });

  try {
    const page = await browser.newPage();

    // Set a higher timeout (default is 30s)
    await page.setContent(html, {
      waitUntil: "load", // Try 'load' instead of 'networkidle0'
      timeout: 60000, // 60 seconds timeout
    });

    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
    });

    return filePath;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw error;
  } finally {
    await browser.close();
  }
};
