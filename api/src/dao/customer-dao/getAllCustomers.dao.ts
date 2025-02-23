import { PipelineStage } from "mongoose";
import { models } from "../../models/index.model";

interface CustomerSearchProps {
  search?: string;
}

export default async (props: CustomerSearchProps) => {
  const { search } = props;

  // Build the match stage dynamically
  const matchConditions: any = {};

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

  const pipeline: PipelineStage[] = [
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
  const result = await models.customer.aggregate(pipeline).exec();

  // Return all data
  return result;
};
