import { RequestOptions } from "https";

export const API_URL = "https://testbackend.nc-one.com";

export default async function fetchRequest(url: string, params?: Request) {
  let response = await fetch(`${API_URL}${url}`, params);
  let result = await response.json();

  return result;
}
