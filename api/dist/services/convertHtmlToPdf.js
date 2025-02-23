"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertInvoiceHtmlToPdf = void 0;
const path_1 = __importDefault(require("path"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const promises_1 = __importDefault(require("fs/promises"));
const convertInvoiceHtmlToPdf = (html, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
        ],
    });
    try {
        const page = yield browser.newPage();
        yield page.setContent(html);
        const invoicePath = path_1.default.join("uploads", "invoices");
        yield promises_1.default.mkdir(invoicePath, { recursive: true });
        const filePath = path_1.default.join(invoicePath, `${fileName}.pdf`);
        yield page.pdf({
            path: filePath,
            format: "A4",
            printBackground: true,
        });
        return filePath;
    }
    finally {
        // Ensure the browser process is closed in all cases
        yield browser.close();
    }
});
exports.convertInvoiceHtmlToPdf = convertInvoiceHtmlToPdf;
