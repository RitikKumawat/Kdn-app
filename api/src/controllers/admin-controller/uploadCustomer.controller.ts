import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import fs from "fs";
import xlsx from "xlsx";


import { dao } from "../../dao";
import { ICustomerModel } from "../../interfaces/models/customer.interface";

const BATCH_COUNT = 200;

// Define invalid entries type
type TInvalidItems = {
  duplicateEntries: any[];
  inserted: any[];
  invalidEntries: any[];
};

// Helper function to read Excel file and get data
const getExcelData = (filePath: string): any[] => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming the first sheet contains the data
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return data;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
};

// Process each Excel row
const processExcelRow = async (
  data: ICustomerModel,
  uploadItems: TInvalidItems
) => {
  // Basic validation for required fields
  if (
    !data.firstName ||
    !data.lastName ||
    !data.contactNumber ||
    !data.address
  ) {
    uploadItems.invalidEntries.push({
      ...data,
      reason: "Missing required fields",
    });
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
  const newCustomer: Partial<ICustomerModel> = {
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    contactNumber: data.contactNumber,
  };

  try {
    const inserted = await dao.customer.add(newCustomer);
    uploadItems.inserted.push(inserted);
  } catch (error: any) {
    uploadItems.invalidEntries.push({
      ...data,
      reason: `Database error: ${error.message}`,
    });
  }
};

// Process a batch of rows
const processRow = async (
  item: any,
  uploadItems: TInvalidItems,
  totalRows: number,
  process: any
) => {
  await processExcelRow(item, uploadItems);
  process.processedRows++;
};

// Start processing the Excel file
const startUploadProcess = async (filePath: string, socketToken: string) => {
  const uploadItems: TInvalidItems = {
    duplicateEntries: [],
    inserted: [],
    invalidEntries: [],
  };

  const process = { processedRows: 0 };
  const data = getExcelData(filePath);
  const totalRows = data.length;

  const dataBatch: any[] = [];
  const socketChannel = `progress-${socketToken}`;

  for (const row of data) {
    dataBatch.push(row);

    if (dataBatch.length >= BATCH_COUNT) {
      await Promise.all(
        dataBatch.map(async (item) => {
          return processRow(item, uploadItems, totalRows, process);
        })
      );

      const percentage = Math.round((process.processedRows / totalRows) * 100);
      io.emit(socketChannel, {
        percentage,
        uploadItems,
      });

      dataBatch.length = 0;
    }
  }

  // Process remaining rows
  if (dataBatch.length > 0) {
    await Promise.all(
      dataBatch.map(async (item) => {
        return processRow(item, uploadItems, totalRows, process);
      })
    );

    const percentage = Math.round((process.processedRows / totalRows) * 100);
    io.emit(socketChannel, {
      percentage,
      uploadItems,
    });
  }

  fs.unlinkSync(filePath); // Delete the temporary uploaded file
};

// API Endpoint for Upload
export const uploadCustomer = async (req: Request, res: Response) => {
  const file = req.file;
  const filePath = `./uploads/${file?.originalname}`;
  const token = "socketToken";

  await startUploadProcess(filePath, token);

  return JsonResponse(res, {
    statusCode: 200,
    status: "success",
    title: "Customer uploaded successfully",
    message: "Customers are uploaded",
    data: [],
  });
};
