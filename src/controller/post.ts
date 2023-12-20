import { NextFunction, Request, Response } from "express";
import * as postRepository from "../data/post";

export async function getPosts(req: Request, res: Response) {
  const data = await postRepository.getAll();
  res.status(200).json(data);
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const post = await postRepository.getById(+id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post id(${id}) not found` });
  }
}

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, text } = req.body;
  const post = await postRepository.create(title, text);
  res.status(201).json(post);
}

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const { title, text } = req.body;
  const post = await postRepository.getById(+id);
  if (!post) {
    return res.status(404).json({ message: `Post not found: ${id}` });
  }
  const updated = await postRepository.update(+id, title, text);
  res.status(200).json(updated);
}

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const post = await postRepository.getById(+id);
  if (!post) {
    return res.status(404).json({ message: `Post not found: ${id}` });
  }
  await postRepository.remove(+id);
  res.sendStatus(204);
}
