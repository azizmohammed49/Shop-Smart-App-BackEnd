import {
  countSuppliers,
  createSupplier,
  listSuppliers,
} from "../repositories/supplier.repo.js";

export const addSupplier = async (req, res) => {
  try {
    const data = req.body;
    const supplier = await createSupplier(data);
    res.status(201).json({
      success: true,
      message: "Supplier added successfully!",
      data: supplier,
    });
    log(req.userId || "", req.url, 201, "Supplier added successfully!");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add Supplier!" });
    log(req.userId || "", req.url, 500, "Failed to add Supplier!");
  }
};

export const allSuppliers = async (req, res) => {
  try {
    const page = req?.params?.page || 1;
    const pageSize = req?.params?.limit || 20;
    const sort = { [req?.query?.sort]: [req?.query?.sortDir] };
    const search = req?.body?.search;
    let fetchObj = { page, pageSize, sort: req.query.sort ? sort : {} };
    const suppliers = await listSuppliers(fetchObj);
    const totalRecords = await countSuppliers(fetchObj);
    res.status(200).json({
      success: true,
      message: "Supplier List fetched successfully!",
      totalRecords,
      data: suppliers,
    });
    log(req.userId || "", req.url, 200, "Supplier List fetched successfully!");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetched Supplier!" });
    log(req.userId || "", req.url, 500, "Failed to fetched Supplier!", error);
  }
};
