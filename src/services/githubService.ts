import axios from "axios";

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

export const fetchRepositoryByID = async (id: number) => {
  const response = await axios.get(
    `https://api.github.com/repositories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};
