import { Request, Response } from "express";
import { models } from "../../models/index.model";
import { JsonResponse } from "../../utils/jsonResponse";

const getStartAndEndDate = (
  type: "daily" | "monthly"
): { startDate: Date; endDate: Date } => {
  const today = new Date();
  let startDate: Date, endDate: Date;

  if (type === "daily") {
    startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
  } else {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }

  return { startDate, endDate };
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Get start and end dates for daily and monthly
    const { startDate: dailyStart, endDate: dailyEnd } =
      getStartAndEndDate("daily");
    const { startDate: monthlyStart, endDate: monthlyEnd } =
      getStartAndEndDate("monthly");

    // Run queries in parallel using Promise.all()
    const [dailyCollection, monthlyCollection] = await Promise.all([
      models.transaction.aggregate([
        { $match: { createdAt: { $gte: dailyStart, $lt: dailyEnd } } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: { $toDouble: "$amount" } },
          },
        },
      ]),

      models.transaction.aggregate([
        { $match: { createdAt: { $gte: monthlyStart, $lt: monthlyEnd } } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: { $toDouble: "$amount" } },
          },
        },
      ]),
    ]);

    return JsonResponse(res, {
      message: "Fetched analytics",
      status: "success",
      statusCode: 200,
      title: "Fetched analytics",
      data: {
        totalDailyCollection: dailyCollection.length
          ? dailyCollection[0].totalAmount
          : 0,
        totalMonthlyCollection: monthlyCollection.length
          ? monthlyCollection[0].totalAmount
          : 0,
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
