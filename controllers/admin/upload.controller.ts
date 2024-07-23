import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  try {
    res.json({
      location: req.body.file,
    });
  } catch (error) {
    console.log(error);
  }
};
