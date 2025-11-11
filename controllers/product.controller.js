import { createProduct, listProducts, countProducts } from "../repositories/product.repo.js";
import { log } from "../utils/logger.js";

export const addProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await createProduct(data);
    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      data: product,
    });
    log(req.userId || "", req.url, 201, "Product added successfully!");
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add Product!" });
    log(req.userId || "", req.url, 500, "Failed to add Product!", error);
  }
};

export const allProducts = async (req, res) => {
  try {
    const page = req?.params?.page || 1;
    const pageSize = req?.params?.limit || 20;
    const sort = { [req?.query?.sort]: [req?.query?.sortDir] };
    const search = req?.body?.search;
    const category = req?.body?.category;
    const supplier = req?.body?.supplierId;
    let fetchObj = { page, pageSize, sort: req.query.sort ? sort : {}, search, category, supplier };
    const products = await listProducts(fetchObj);
    const totalRecords = await countProducts(fetchObj);
    res.status(200).json({
      success: true,
      message: "Product List fetched successfully!",
      totalRecords,
      data: products,
    });
    log(req.userId || "", req.url, 200, "Product List fetched successfully!");
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add Product!" });
    log(req.userId || "", req.url, 500, "Failed to add Product!", error);
  }
};
