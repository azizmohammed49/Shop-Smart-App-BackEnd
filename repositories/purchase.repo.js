import PurchaseModel from "../models/PurchaseModel.js";

export const createPurchase = (data) => {
  return PurchaseModel.create(data);
};

export const listPurchases = (data) => {
  const page = data.page || 1;
  const pageSize = data.pageSize || 20;
  const skip = (page - 1) * pageSize;
  const search = data.search;
  const sort = data.sort;

  return PurchaseModel.find().sort(sort).skip(skip).limit(pageSize);
};

export const countPurchases = (data) => {
  const search = data.search;

  let filter = {};

  if (search) {
    let searchOr = [{ name: { $regex: search, $options: "i" } }];
    if (Object.keys(filter).length) {
      filter = { $and: [filter, { $or: searchOr }] };
    } else {
      filter.$or = searchOr;
    }
  }
  return PurchaseModel.countDocuments(filter);
};
