import {
  countPurchases,
  createPurchase,
  listPurchases,
} from "../repositories/purchase.repo.js";

export const addPurchase = async (req, res) => {
  try {
    const data = req.body;
    const purchase = await createPurchase(data);
    res.status(201).json({
      success: true,
      message: "Purchase added successfully!",
      data: purchase,
    });
    log(req.userId || "", req.url, 201, "Purchase added successfully!");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add Purchase!" });
    log(req.userId || "", req.url, 500, "Failed to add Purchase!");
  }
};

export const allPurchases = async (req, res) => {
  try {
    const page = req?.params?.page || 1;
    const pageSize = req?.params?.limit || 20;
    const sort = { [req?.query?.sort]: [req?.query?.sortDir] };
    const search = req?.body?.search;
    let fetchObj = { page, pageSize, sort: req.query.sort ? sort : {} };
    const purchases = await listPurchases(fetchObj);
    const totalRecords = await countPurchases(fetchObj);
    res.status(200).json({
      success: true,
      message: "Purchases List fetched successfully!",
      totalRecords,
      data: purchases,
    });
    log(req.userId || "", req.url, 200, "Purchase List fetched successfully!");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetched Purchase!" });
    log(req.userId || "", req.url, 500, "Failed to fetched Purchase!", error);
  }
};
