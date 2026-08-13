import express from "express";
import {
  getItems,
  getDeletedItems,
  getSuggestions,
  addItem,
  changeItemCount,
  updateItem,
  setItemBought,
  reorderItems,
  clearBought,
  deleteItem,
  restoreItem,
  purgeDeleted,
} from "../controllers/itemsController.js";
import { verifyToken, requireListAccess } from "../middleware/auth.js";
import { readLimiter, writeLimiter } from "../middleware/rateLimits.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", readLimiter, requireListAccess, getItems);
router.get("/suggestions", readLimiter, requireListAccess, getSuggestions);
router.get("/deleted", readLimiter, requireListAccess, getDeletedItems);
router.post("/", writeLimiter, requireListAccess, addItem);
// Fixed paths must be registered before the /:id patterns.
router.put("/order", writeLimiter, requireListAccess, reorderItems);
router.delete("/bought", writeLimiter, requireListAccess, clearBought);
router.delete("/deleted", writeLimiter, requireListAccess, purgeDeleted);
router.patch("/:id/count", writeLimiter, requireListAccess, changeItemCount);
router.patch("/:id/bought", writeLimiter, requireListAccess, setItemBought);
router.post("/:id/restore", writeLimiter, requireListAccess, restoreItem);
router.patch("/:id", writeLimiter, requireListAccess, updateItem);
router.delete("/:id", writeLimiter, requireListAccess, deleteItem);

export default router;
