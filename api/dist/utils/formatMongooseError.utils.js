"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDuplicateError = void 0;
const handleCompoundIndexError = (err) => {
    var _a;
    try {
        const collectionName = (_a = err.errmsg.match(/collection: \w+\.([\w-]+)/)) === null || _a === void 0 ? void 0 : _a[1];
        if (collectionName === "custom-pricings") {
            return "custom pricing already present for this date";
        }
        return undefined;
    }
    catch (error) {
        return undefined;
    }
};
const formatDuplicateError = (err) => {
    const compoundIndex = handleCompoundIndexError(err);
    if (compoundIndex)
        return compoundIndex;
    const duplicateFeild = Object.keys(err.errorResponse.keyPattern)[0];
    return `${duplicateFeild} already in use`;
};
exports.formatDuplicateError = formatDuplicateError;
