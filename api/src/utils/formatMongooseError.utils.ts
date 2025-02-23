import { MongoServerError } from "mongodb";

const handleCompoundIndexError = (err: MongoServerError) => {
  try {
    const collectionName = err.errmsg.match(/collection: \w+\.([\w-]+)/)?.[1];
    if (collectionName === "custom-pricings") {
      return "custom pricing already present for this date";
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const formatDuplicateError = (err: MongoServerError) => {
  const compoundIndex = handleCompoundIndexError(err);

  if (compoundIndex) return compoundIndex;

  const duplicateFeild = Object.keys(err.errorResponse.keyPattern)[0];
  return `${duplicateFeild} already in use`;
};
