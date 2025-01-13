import { Request, Response } from "express";
import { fetchTopRepositories } from "../services/githubService";

export const getTopRepositories = async (req: Request, res: Response) => {
  const { page = 1, per_page = 10 } = req.query;

  try {
    const data = await fetchTopRepositories(Number(page), Number(per_page));
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
};
