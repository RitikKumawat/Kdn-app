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
exports.uploadCustomer = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
// import { io } from "../../app";
const dao_1 = require("../../dao");
const BATCH_COUNT = 200;
// Helper function to read Excel file and get data
const getExcelData = (filePath) => {
    try {
        const workbook = xlsx_1.default.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet contains the data
        const data = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetName]);
        return data;
    }
    catch (error) {
        console.error("Error reading Excel file:", error);
        return [];
    }
};
// Process each Excel row
const processExcelRow = (data, uploadItems) => __awaiter(void 0, void 0, void 0, function* () {
    // Basic validation for required fields
    if (!data.firstName ||
        !data.lastName ||
        !data.contactNumber ||
        !data.address) {
        uploadItems.invalidEntries.push(Object.assign(Object.assign({}, data), { reason: "Missing required fields" }));
        return;
    }
    // Check for duplicate entries
    //   const duplicate = await Customer.findOne({ contactNumber: data.contactNumber });
    //   if (duplicate) {
    //     uploadItems.duplicateEntries.push({
    //       ...data,
    //       reason: "Duplicate contactNumber",
    //     });
    //     return;
    //   }
    // Create a new customer entry
    const newCustomer = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        contactNumber: data.contactNumber,
    };
    try {
        const inserted = yield dao_1.dao.customer.add(newCustomer);
        uploadItems.inserted.push(inserted);
    }
    catch (error) {
        uploadItems.invalidEntries.push(Object.assign(Object.assign({}, data), { reason: `Database error: ${error.message}` }));
    }
});
// Process a batch of rows
const processRow = (item, uploadItems, totalRows, process) => __awaiter(void 0, void 0, void 0, function* () {
    yield processExcelRow(item, uploadItems);
    process.processedRows++;
});
// Start processing the Excel file
const startUploadProcess = (filePath, socketToken) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadItems = {
        duplicateEntries: [],
        inserted: [],
        invalidEntries: [],
    };
    const process = { processedRows: 0 };
    const data = getExcelData(filePath);
    const totalRows = data.length;
    const dataBatch = [];
    const socketChannel = `progress-${socketToken}`;
    for (const row of data) {
        dataBatch.push(row);
        if (dataBatch.length >= BATCH_COUNT) {
            yield Promise.all(dataBatch.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return processRow(item, uploadItems, totalRows, process);
            })));
            const percentage = Math.round((process.processedRows / totalRows) * 100);
            // io.emit(socketChannel, {
            //   percentage,
            //   uploadItems,
            // });
            dataBatch.length = 0;
        }
    }
    // Process remaining rows
    if (dataBatch.length > 0) {
        yield Promise.all(dataBatch.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return processRow(item, uploadItems, totalRows, process);
        })));
        const percentage = Math.round((process.processedRows / totalRows) * 100);
        // io.emit(socketChannel, {
        //   percentage,
        //   uploadItems,
        // });
    }
    fs_1.default.unlinkSync(filePath); // Delete the temporary uploaded file
});
// API Endpoint for Upload
const uploadCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const filePath = `./uploads/${file === null || file === void 0 ? void 0 : file.originalname}`;
    const token = "socketToken";
    yield startUploadProcess(filePath, token);
    return (0, jsonResponse_1.JsonResponse)(res, {
        statusCode: 200,
        status: "success",
        title: "Customer uploaded successfully",
        message: "Customers are uploaded",
        data: [],
    });
});
exports.uploadCustomer = uploadCustomer;
