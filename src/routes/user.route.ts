import express, { Request, Response } from "express";

const router = express.Router();

router.get("/testing", (req: Request, res: Response) => {
  res.send("Hello, Worlds!");
});

export default router;
