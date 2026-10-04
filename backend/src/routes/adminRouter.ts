import {Router} from "express";
import { createAdminProduct, deleteAdminProduct, getImageKitAuth, requireAdmin, updateAdminProduct, } from "../controllers/adminController.js";
import { listAdminProducts } from "./streamRouter.js";

const router = Router();

router.use(requireAdmin);

router.get("/imagekit-auth", getImageKitAuth);

router.get("/products", listAdminProducts);
router.post("/products", createAdminProduct);
router.patch("/products/:id", updateAdminProduct);
router.delete("/products/:id", deleteAdminProduct);


export default router;