import express from "express";
import {
  getItems,
  getSuggestions,
  addItem,
  changeItemCount,
  renameItem,
  setItemBought,
  clearBought,
  deleteItem,
} from "../controllers/itemsController.js";
import { verifyToken, requireListAccess } from "../middleware/auth.js";
import { readLimiter, writeLimiter } from "../middleware/rateLimits.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", readLimiter, requireListAccess, getItems);
router.get("/suggestions", readLimiter, requireListAccess, getSuggestions);
router.post("/", writeLimiter, requireListAccess, addItem);
// Fixed paths must be registered before the /:id patterns.
router.delete("/bought", writeLimiter, requireListAccess, clearBought);
router.patch("/:id/count", writeLimiter, requireListAccess, changeItemCount);
router.patch("/:id/bought", writeLimiter, requireListAccess, setItemBought);
router.patch("/:id", writeLimiter, requireListAccess, renameItem);
router.delete("/:id", writeLimiter, requireListAccess, deleteItem);

export default router;
