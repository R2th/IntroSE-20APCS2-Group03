import { API_ENDPOINT } from './const';

export const buildPath = (...args) => args
  .map((part, i) => {
    if (i === 0) {
      // eslint-disable-next-line
        return part.trim().replace(/[\/]*$/g, '');
    }
    // eslint-disable-next-line
      return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
  })
  .filter((x) => x.length)
  .join('/');

export const bypassCORSUrl = (url) => {
  if (process.env.NODE_ENV === 'production') {
    return buildPath('https://cors-anywhere.herokuapp.com/', url);
  }
  return buildPath('http://localhost:8080/', url);
};

export const exportFile = (data, filename) => {
  const element = document.createElement('a');
  const file = new Blob([data], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

export const fullPathAPI = (path) => bypassCORSUrl(buildPath(API_ENDPOINT, path));

export const fullPathImage = (user) => {
  if (user && user.data.avatar) return `https://images.viblo.asia/avatar/${user.data.avatar}`;
  return 'https://viblo.asia/images/mm.png';
};

export const thumbnailUrl = (content) => {
  if (!content.slug) return 'https://miro.medium.com/fit/c/112/112/1*vZJLfVrLT4u_VY1zmAr1_A.png';
  if (content.thumbnail_url) {
    return content.thumbnail_url;
  }
  if (content.tags.data.length > 0) {
    return content.tags.data[0].image;
  }
  return fullPathImage(content.user);
};

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const encodeQueryData = (data) => {
  const ret = [];
  // eslint-disable-next-line
  for (const d in data) ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
  return ret.join('&');
};
