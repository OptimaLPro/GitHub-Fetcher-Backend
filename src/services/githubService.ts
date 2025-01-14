import axios from "axios";

const MAX_STARS = 999999;

export const fetchRepositories = async (
  page: number,
  perPage: number,
  query: string,
  stars: number,
  order: string
) => {
  const response = await axios.get(
    "https://api.github.com/search/repositories",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      params: {
        q: `${query} stars:>${stars}`,
        order: order,
        sort: "stars",
        page: page,
        per_page: perPage,
      },
    }
  );

  const sortedData = response.data.items.sort(
    (a: any, b: any) => b.stargazers_count - a.stargazers_count
  );

  return { sortedData, totalCount: response.data.total_count };
};

export const fetchSearchedRepositories = async (
  query = "",
  stars = MAX_STARS,
  page = 1,
  perPage = 10
) => {
  const response = await axios.get(
    "https://api.github.com/search/repositories",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      params: {
        q: `${query ? query : ""} stars:<=${stars}`,
        order: "desc",
        page: page,
        per_page: perPage,
      },
    }
  );
  return response.data;
};
