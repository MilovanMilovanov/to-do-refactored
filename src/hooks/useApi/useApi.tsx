import { useCallback } from "react";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestProps {
  endpoint: string;
  method?: RequestMethod;
  body?: BodyInit | null;
  params?: object;
}

interface RequestOptions {
  method: RequestMethod;
  headers: { "Content-Type": string };
  body?: BodyInit | null;
}

const BASE_URL = `https://jsonplaceholder.typicode.com`;

export default function useApi() {
  const request = useCallback(
    async ({
      endpoint,
      method = "GET",
      body = null,
      params = {},
    }: RequestProps) => {
      const url = new URL(`${BASE_URL}/${endpoint}`);
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key as keyof typeof params])
      );

      const options: RequestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? body : null,
      };

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      if (method === "DELETE") return;

      const data = await res.json();

      return data;
    },
    []
  );

  return { request };
}
