import { API_ENDPOINT } from "./const";

export const bypassCORSUrl = (url) => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    return "" + url;
  }
  return "http://localhost:8080/" + url;
};

export const fullPathAPI = (path) => {
  return bypassCORSUrl(API_ENDPOINT + path);
};
