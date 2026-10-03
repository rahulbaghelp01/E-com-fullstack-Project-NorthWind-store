import { Router } from "express";
import { checkoutRouter } from "../controllers/checkoutController";

const router = Router();

router.post("/",checkoutRouter)

export default router;