import { Request, Response } from "express";
import { models } from "../../models/index.model";
import { JsonResponse } from "../../utils/jsonResponse";

const getStartAndEndDate = (
  type: "daily" | "monthly"
): { startDate: Date; endDate: Date } => {
  const now = new Date();
  let startDate: Date, endDate: Date;

  if (type === "daily") {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  } else {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  }

  return { startDate, endDate };
};


export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Get start and end dates for daily and monthly collections
    const { startDate: dailyStart, endDate: dailyEnd } = getStartAndEndDate("daily");
    const { startDate: monthlyStart, endDate: monthlyEnd } = getStartAndEndDate("monthly");

    // Debugging: Log the date ranges
    console.log("Daily Start:", dailyStart, "Daily End:", dailyEnd);
    console.log("Monthly Start:", monthlyStart, "Monthly End:", monthlyEnd);

    // Run both queries in parallel
    const [dailyCollection, monthlyCollection] = await Promise.all([
      models.transaction.aggregate([
        { $match: { createdAt: { $gte: dailyStart, $lte: dailyEnd } } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: { $toDouble: "$amount" } }, // Convert amount to double
          },
        },
      ]),

      models.transaction.aggregate([
        { $match: { createdAt: { $gte: monthlyStart, $lte: monthlyEnd } } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: { $toDouble: "$amount" } }, // Convert amount to double
          },
        },
      ]),
    ]);

    // Debugging: Log results
    console.log("Daily Collection:", dailyCollection);
    console.log("Monthly Collection:", monthlyCollection);

    return JsonResponse(res, {
      message: "Fetched analytics",
      status: "success",
      statusCode: 200,
      title: "Fetched analytics",
      data: {
        totalDailyCollection: dailyCollection.length ? dailyCollection[0].totalAmount : 0,
        totalMonthlyCollection: monthlyCollection.length ? monthlyCollection[0].totalAmount : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching transaction totals:", error);

    return JsonResponse(res, {
      message: "Internal server error",
      status: "error",
      statusCode: 500,
      title: "Error",
    });
  }
};


