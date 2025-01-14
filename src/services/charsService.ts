import axios from "axios";

export const TopProgrammingLang = async (lang: string) => {
  try {
    console.log("Fetching data for language:", lang);
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
    throw error; // Rethrow error to handle in the controller
  }
};
