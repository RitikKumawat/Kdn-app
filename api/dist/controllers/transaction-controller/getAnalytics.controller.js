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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = void 0;
const index_model_1 = require("../../models/index.model");
const jsonResponse_1 = require("../../utils/jsonResponse");
const getStartAndEndDate = (type) => {
    const today = new Date();
    let startDate, endDate;
    if (type === "daily") {
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    }
    else {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }
    return { startDate, endDate };
};
const getAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get start and end dates for daily and monthly
        const { startDate: dailyStart, endDate: dailyEnd } = getStartAndEndDate("daily");
        const { startDate: monthlyStart, endDate: monthlyEnd } = getStartAndEndDate("monthly");
        // Run queries in parallel using Promise.all()
        const [dailyCollection, monthlyCollection] = yield Promise.all([
            index_model_1.models.transaction.aggregate([
                { $match: { createdAt: { $gte: dailyStart, $lt: dailyEnd } } },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: { $toDouble: "$amount" } },
                    },
                },
            ]),
            index_model_1.models.transaction.aggregate([
                { $match: { createdAt: { $gte: monthlyStart, $lt: monthlyEnd } } },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: { $toDouble: "$amount" } },
                    },
                },
            ]),
        ]);
        return (0, jsonResponse_1.JsonResponse)(res, {
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
    }
    catch (error) {
        console.error("Error fetching transaction totals:", error);
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Internal server error",
            status: "error",
            statusCode: 500,
            title: "Error",
        });
    }
});
exports.getAnalytics = getAnalytics;
