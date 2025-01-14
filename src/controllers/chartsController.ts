import { Request, Response } from "express";
import {
  getStarsForLanguage,
  TopProgrammingLang,
  getTrendingRepositories,
} from "../services/charsService";

const languages = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "TypeScript",
  "PHP",
  "Go",
  "C#",
  "Swift",
];

export const getTopLang = async (req: Request, res: Response) => {
  try {
    const languageStatsArray = await Promise.all(
      languages.map(async (lang) => {
        const count = await TopProgrammingLang(lang);
        return { lang, count };
      })
    );

    const languageStats = languageStatsArray.reduce(
      (acc, { lang, count }) => ({ ...acc, [lang]: count }),
      {} as { [key: string]: number }
    );

    console.log("languageStats", languageStats);
    res.status(200).json(languageStats);
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
};

export const getStarsDistribution = async (req: Request, res: Response) => {
  try {
    const starsPromises = languages.map(async (language) => {
      const stars = await getStarsForLanguage(language);
      return { language, stars };
    });

    const starsResults = await Promise.all(starsPromises);

    const starsDistribution = starsResults.reduce(
      (acc, { language, stars }) => {
        acc[language] = stars;
        return acc;
      },
      {} as { [key: string]: number }
    );

    res.status(200).json(starsDistribution);
  } catch (error: any) {
    console.error("Error fetching stars distribution:", error);
    res.status(500).json({ error: "Failed to fetch stars distribution" });
  }
};

export const getTrendingRepos = async (req: Request, res: Response) => {
  try {
    const { per_page, lastDate } = req.query;
    console.log(per_page, lastDate);
    const trendingRepos = await getTrendingRepositories(
      Number(per_page),
      String(lastDate)
    );
    // console.log("trendingRepos", trendingRepos);
    res.status(200).json(trendingRepos);
  } catch (error: any) {
    console.error("Error fetching trending repositories:", error);
    res.status(500).json({ error: "Failed to fetch trending repositories" });
  }
};
