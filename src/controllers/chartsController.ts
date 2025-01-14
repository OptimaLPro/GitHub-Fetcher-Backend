import { Request, Response } from "express";
import { TopProgrammingLang } from "../services/charsService";

export const getTopLang = async (req: Request, res: Response) => {
  try {
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

    // Run all API calls in parallel using Promise.all
    const languageStatsArray = await Promise.all(
      languages.map(async (lang) => {
        const count = await TopProgrammingLang(lang);
        return { lang, count };
      })
    );

    // Convert the result into an object
    const languageStats = languageStatsArray.reduce(
      (acc, { lang, count }) => ({ ...acc, [lang]: count }),
      {}
    );

    console.log("languageStats", languageStats);
    res.status(200).json(languageStats);
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
};
