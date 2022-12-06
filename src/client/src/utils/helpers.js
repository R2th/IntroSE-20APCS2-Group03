import { API_ENDPOINT } from "./const";

export const bypassCORSUrl = (url) => {
  if (process.env.NODE_ENV === "production") {
    return buildPath("https://cors-anywhere.herokuapp.com/", url);
  }
  return buildPath("http://localhost:8080/", url);
};

const buildPath = (...args) => {
  return args
    .map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/[\/]*$/g, "");
      } else {
        return part.trim().replace(/(^[\/]*|[\/]*$)/g, "");
      }
    })
    .filter((x) => x.length)
    .join("/");
};

export const fullPathAPI = (path) => {
  return bypassCORSUrl(buildPath(API_ENDPOINT, path));
};

export const fullPathImage = (user) => {
  if (user && user.data.avatar)
    return `https://images.viblo.asia/avatar/${user.data.avatar}`;
  else return "https://viblo.asia/images/mm.png";
};

export const thumbnail_url = (content) => {
  if (!content.slug)
    return "https://miro.medium.com/fit/c/112/112/1*vZJLfVrLT4u_VY1zmAr1_A.png";
  if (content.thumbnail_url) {
    return content.thumbnail_url;
  }
  if (content.tags.data.length > 0) {
    return content.tags.data[0].image;
  }
  return fullPathImage(content.user);
};
