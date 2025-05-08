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
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
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
