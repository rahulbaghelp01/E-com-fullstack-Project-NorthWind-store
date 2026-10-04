import { Router, type NextFunction, type Request, type Response } from "express";
import { createStreamToken } from "../controllers/streamController";
import { desc } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema";

const router = Router();

router.post("/token",createStreamToken)


export default router
export async function listAdminProducts(_req: Request, res: Response, next: NextFunction) {
    try {
        const rows = await db.select().from(products).orderBy(desc(products.createdAt));
        res.json({ products: rows });
    } catch (e) {
        next(e);
    }
}
