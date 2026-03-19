import express from "express";
import { createBook, getBooks, getBookByUser, deleteBook } from "../controllers/bookController.js";
import protectRoute from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", protectRoute, createBook);
router.get("/", protectRoute, getBooks);
router.get("/user", protectRoute, getBookByUser);
router.delete("/:id", protectRoute, deleteBook);

export default router;