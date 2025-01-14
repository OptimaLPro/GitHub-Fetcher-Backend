import { Request, Response } from "express";
import {
  fetchSearchedRepositories,
  fetchRepositories,
} from "../services/githubService";

const MIN_STARS = 1;
const PAGE = 1;
const PER_PAGE = 9;

export const getRepositories = async (req: Request, res: Response) => {
  const { page = PAGE, per_page = PER_PAGE, stars = MIN_STARS, query = "", order = "desc" } = req.query;
  try {
    console.log(page, per_page, stars, query, order);
    const data = await fetchRepositories(Number(page), Number(per_page), String(query), Number(stars), String(order));
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
};