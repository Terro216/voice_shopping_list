import express from "express";
import {
  getItems,
  getSuggestions,
  addItem,
  changeItemCount,
  setItemBought,
  clearBought,
  deleteItem,
} from "../controllers/itemsController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getItems);
router.get("/suggestions", getSuggestions);
router.post("/", addItem);
// Fixed paths must be registered before the /:id patterns.
router.delete("/bought", clearBought);
router.patch("/:id/count", changeItemCount);
router.patch("/:id/bought", setItemBought);
router.delete("/:id", deleteItem);

export default router;
