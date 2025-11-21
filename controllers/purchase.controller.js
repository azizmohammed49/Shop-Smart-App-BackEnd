import { createManyProduct } from "../repositories/product.repo.js";
import { countPurchases, createPurchase, listPurchases } from "../repositories/purchase.repo.js";
import { log } from "../utils/logger.js"; // Add this line

export const addPurchase = async (req, res) => {
  try {
    const data = req.body;
    if (data.newProducts?.length) {
      const newPrd = await createManyProduct(data.newProducts);
      const newPrdIds = newPrd?.map((prd) => prd?._id);
      data.products = [...data.products, ...newPrdIds];
    }
    const purchase = await createPurchase(data);
    res.status(201).json({
      success: true,
      message: "Purchase added successfully!",
      data: purchase,
    });
    log(req.userId || "", req.url, 201, "Purchase added successfully!");
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add Purchase!" });
    log(req.userId || "", req.url, 500, "Failed to add Purchase!");
  }
};

export const allPurchases = async (req, res) => {
  try {
    const page = req?.params?.page || 1;
    const pageSize = req?.params?.limit || 20;
    const sort = { [req?.query?.sort]: req?.query?.sortDir || 1 };
    const search = req?.body?.search;
    const supplier = req?.body?.supplierId; // Use supplierId

    let fetchObj = {
      page,
      pageSize,
      sort: req.query.sort ? sort : {},
      search,
      supplier,
    };

    const purchases = await listPurchases(fetchObj);
    const totalRecords = await countPurchases(fetchObj);

    res.status(200).json({
      success: true,
      message: "Purchases List fetched successfully!",
      totalRecords,
      data: purchases,
    });
    log(req.userId || "", req.url, 200, "Purchases List fetched successfully!");
  } catch (error) {
    console.error("Purchase Error:", error); // Add detailed logging
    res.status(500).json({
      success: false,
      message: "Failed to fetch Purchases!",
      error: error.message,
    });
    log(req.userId || "", req.url, 500, "Failed to fetch Purchases!", error);
  }
};
