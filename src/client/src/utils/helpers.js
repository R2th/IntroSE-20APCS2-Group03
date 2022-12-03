import { API_ENDPOINT } from "./const";

export const bypassCORSUrl = (url) => {
  if (process.env.NODE_ENV === "production") {
    return "https://cors-anywhere.herokuapp.com/" + url;
  }
  return "http://localhost:8080/" + url;
};

export const fullPathAPI = (path) => {
  return bypassCORSUrl(API_ENDPOINT + path);
};
