import axios from "axios";

export const TopProgrammingLang = async (lang: string) => {
  try {
    console.log("TopProgrammingLang:", lang);
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        params: {
          q: `language:${lang}`,
          sort: "stars",
        },
      }
    );

    console.log(`Total count for ${lang}:`, response.data.total_count);
    return response.data.total_count;
  } catch (error: any) {
    console.error(`Failed to fetch data for ${lang}:`, error.message);
    throw error;
  }
};

export const getStarsForLanguage = async (language: string) => {
  console.log("getStarsForLanguage:", language);
  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        params: {
          q: `language:${language}`,
          sort: "stars",
          order: "desc",
          per_page: 100,
        },
      }
    );

    // Calculate total stars
    const totalStars = response.data.items.reduce(
      (acc: number, repo: { stargazers_count: number }) =>
        acc + repo.stargazers_count,
      0
    );

    return totalStars;
  } catch (error) {
    console.error(`Error fetching stars for language ${language}:`, error);
    throw new Error(`Failed to fetch stars for ${language}`);
  }
};

export const getTrendingRepositories = async (
  per_page = 5,
  lastDate = "month"
) => {
  try {
    const currentDate = new Date();
    if (lastDate === "month") currentDate.setDate(currentDate.getDate() - 30);
    else if (lastDate === "year")
      currentDate.setDate(currentDate.getDate() - 365);
    else if (lastDate === "week")
      currentDate.setDate(currentDate.getDate() - 7);
    else currentDate.setDate(currentDate.getDate() - 30);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        params: {
          q: `created:>${formattedDate}`,
          sort: "stars",
          order: "desc",
          per_page: per_page,
        },
      }
    );
    return response.data.items;
  } catch (error: any) {
    console.error("Error fetching trending repositories:", error);
    throw new Error("Failed to fetch trending repositories");
  }
};
