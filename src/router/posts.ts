import express from "express";
import { body } from "express-validator";
import * as postController from "../controller/post";
import { validate } from "../middleware/validator";

const router = express.Router();

const validatePost = [
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("text should be at least 1 characters"),
  validate,
];

router.get("/", postController.getPosts);

router.get("/:id", postController.getPost);

router.post("/", validatePost, postController.createPost);

router.put("/:id", validatePost, postController.updatePost);

router.delete("/:id", postController.deletePost);

export default router;
