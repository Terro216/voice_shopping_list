import express from "express";
import { getItems, addItem, changeItemCount, deleteItem } from "../controllers/itemsController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getItems);
router.post("/", addItem);
router.patch("/:id/count", changeItemCount);
router.delete("/:id", deleteItem);

export default router;
