import ProductModel from "../models/ProductModel.js";

export const createProduct = (data) => ProductModel.create(data);

export const listProducts = (data) => {
  const page = data.page || 1;
  const pageSize = data.pageSize || 20;
  const skip = (page - 1) * pageSize;
  const search = data.search;
  const category = data.category;
  const supplier = data.supplierId;
  const sort = data.sort;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (supplier) {
    filter.supplier = supplier;
  }

  if (search) {
    let searchOr = [
      { name: { $regex: search, $options: "i" } },
      { purchasePrice: { $regex: search, $options: "i" } },
    ];
    if (Object.keys(filter).length) {
      filter = { $and: [filter, { $or: searchOr }] };
    } else {
      filter.$or = searchOr;
    }
  }
  return ProductModel.find(filter)
    .populate({ path: "supplier", select: "supplierName" })
    .sort(sort)
    .skip(skip)
    .limit(pageSize);
};

export const countProducts = (data) => {
  const search = data.search;
  const category = data.category;
  const supplier = data.supplierId;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (supplier) {
    filter.supplier = supplier;
  }

  if (search) {
    let searchOr = [
      { name: { $regex: search, $options: "i" } },
      { purchasePrice: { $regex: search, $options: "i" } },
    ];
    if (Object.keys(filter).length) {
      filter = { $and: [filter, { $or: searchOr }] };
    } else {
      filter.$or = searchOr;
    }
  }
  return ProductModel.countDocuments(filter);
};
