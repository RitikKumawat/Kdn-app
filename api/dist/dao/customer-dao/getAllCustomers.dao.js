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
const index_model_1 = require("../../models/index.model");
exports.default = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = props;
    // Build the match stage dynamically
    const matchConditions = {};
    if (search) {
        const combinedSearch = search.split(" ").join("|"); // Allow partial matching across fields
        matchConditions.$or = [
            {
                $expr: {
                    $regexMatch: {
                        input: {
                            $concat: ["$firstName", " ", "$lastName"],
                        },
                        regex: combinedSearch,
                        options: "i", // Case-insensitive
                    },
                },
            },
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
            { contactNumber: { $regex: search, $options: "i" } },
        ];
    }
    const pipeline = [
        // Match conditions
        ...(Object.keys(matchConditions).length > 0
            ? [{ $match: matchConditions }]
            : []),
        // Project only the required fields
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                address: 1,
                contactNumber: 1,
                boxNumber: 1,
            },
        },
        // Sorting by last name in ascending order (adjust as needed)
        {
            $sort: { firstName: 1 },
        },
    ];
    // Execute the aggregation
    const result = yield index_model_1.models.customer.aggregate(pipeline).exec();
    // Return all data
    return result;
});
