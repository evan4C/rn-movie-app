export const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
  BASE_IMAGE_URL: "https://image.tmdb.org/t/p/w500",
};

export const getMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : "/discover/movie?sort_by=popularity.desc";

  const url = `${TMDB_CONFIG.BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movies", { cause: response.statusText });
  }
  const data = await response.json();
  return data.results;
};
