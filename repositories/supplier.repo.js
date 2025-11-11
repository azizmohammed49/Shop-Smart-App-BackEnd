import SupplierModel from "../models/SupplierModel.js";

export const createSupplier = (data) => {
  return SupplierModel.create(data);
};

export const listSuppliers = (data) => {
  const page = data.page || 1;
  const pageSize = data.pageSize || 20;
  const skip = (page - 1) * pageSize;
  const search = data.search;
  const sort = data.sort;

  return SupplierModel.find().sort(sort).skip(skip).limit(pageSize);
};

export const countSuppliers = (data) => {
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
  return SupplierModel.countDocuments(filter);
};
