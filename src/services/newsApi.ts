import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BingNewsApiResponse {
  totalEstimatedMatches: number;
  value: {
    name: string;
    url: string;
    description: string;
    image: {
      thumbnail: {
        contentUrl: string;
        width: number;
        height: number;
      };
    };
    provider: [
      {
        name: string;
      }
    ];
    datePublished: string;
  }[];
}

const baseUrl: string = `https://bing-news-search1.p.rapidapi.com/news/`;

const newsHeaders: { [key: string]: string } = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "bdb05c643amsh34105d2e4c7e7ddp17f265jsn42e36be3f35d",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

interface RequestNewsParams {
  url: string;
  headers: { [key: string]: string };
}

const requestNews = ({
  url,
  headers,
}: RequestNewsParams): RequestNewsParams => ({ url, headers });

// Define a service using a base URL and expected endpoints
export const newsApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query<BingNewsApiResponse, string>({
      query: (location) =>
        requestNews({
          url: `search?q=${location}%20Weather&freshness=Day&textFormat=Raw&safeSearch=Off`,
          headers: newsHeaders,
        }),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
