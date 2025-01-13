import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  // headers: {
  //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  // },
});

export const fetchTopRepositories = async (page = 1, perPage = 10) => {
  const response = await githubApi.get("/search/repositories", {
    params: {
      q: "stars:>1",
      order: "desc",
      page,
      per_page: perPage,
    },
  });
  return response.data;
};
