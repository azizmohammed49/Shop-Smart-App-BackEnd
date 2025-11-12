import PurchaseModel from "../models/PurchaseModel.js";

export const createPurchase = (data) => {
  return PurchaseModel.create(data);
};

export const listPurchases = async (fetchObj) => {
  const { page = 1, pageSize = 20, sort = {}, search, supplier } = fetchObj;

  let query = {};

  if (search) {
    query.$or = [{ notes: { $regex: search, $options: "i" } }];
  }

  if (supplier) {
    query.supplierId = supplier; // Use supplierId
  }

  const skip = (page - 1) * pageSize;

  return await PurchaseModel.find(query)
    .populate("supplierId", "supplierName email contactName") // Use supplierId
    .sort(sort)
    .skip(skip)
    .limit(pageSize)
    .exec();
};

export const countPurchases = (data) => {
  const { search, supplier } = data;

  let filter = {};

  if (search) {
    filter.$or = [{ notes: { $regex: search, $options: "i" } }];
  }

  if (supplier) {
    filter.supplierId = supplier; // Use supplierId
  }

  return PurchaseModel.countDocuments(filter);
};
