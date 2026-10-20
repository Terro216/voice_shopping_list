import express from "express";
import {
  getItems,
  getDeletedItems,
  getSuggestions,
  addItem,
  changeItemCount,
  updateItem,
  moveItem,
  setItemBought,
  reorderItems,
  clearBought,
  deleteItem,
  restoreItem,
  purgeDeleted,
} from "../controllers/itemsController.js";
import { verifyToken, requireListAccess } from "../middleware/auth.js";
import { readLimiter, writeLimiter } from "../middleware/rateLimits.js";

import { mutation } from "../middleware/mutation.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", readLimiter, requireListAccess, getItems);
router.get("/suggestions", readLimiter, requireListAccess, getSuggestions);
router.get("/deleted", readLimiter, requireListAccess, getDeletedItems);
router.post("/", writeLimiter, requireListAccess, mutation(addItem));
// Fixed paths must be registered before the /:id patterns.
router.put("/order", writeLimiter, requireListAccess, mutation(reorderItems));
router.delete("/bought", writeLimiter, requireListAccess, mutation(clearBought));
router.delete("/deleted", writeLimiter, requireListAccess, mutation(purgeDeleted));
router.patch("/:id/count", writeLimiter, requireListAccess, mutation(changeItemCount));
router.patch("/:id/bought", writeLimiter, requireListAccess, mutation(setItemBought));
router.post("/:id/restore", writeLimiter, requireListAccess, mutation(restoreItem));
router.post("/:id/move", writeLimiter, requireListAccess, mutation(moveItem));
router.patch("/:id", writeLimiter, requireListAccess, mutation(updateItem));
router.delete("/:id", writeLimiter, requireListAccess, mutation(deleteItem));

export default router;
