import { RequestOptions } from "https";

export const API_URL = "http://localhost:3001";

export default async function fetchRequest(url: string, params?: Request) {
  let response = await fetch(`${API_URL}${url}`, params);
  let result = await response.json();

  return result;
}
