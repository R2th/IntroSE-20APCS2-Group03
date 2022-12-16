# 1. Apollo
https://github.com/nuxt-community/apollo-module

Đây là một module của Nuxt để giúp bạn có thể sử dụng Graphql trong dự án Nuxt. Module này yêu cầu Vue 2.6+ và serverPrefetch support
```
npm install --save vue@2.6.6 vue-template-compiler@2.6.6 vue-server-renderer@2.6.6
```

# 2. Cài đặt
- Cài đặt nuxt

```
yarn create nuxt-app nuxt-demo
```
![](https://images.viblo.asia/73657d77-1fc1-4261-830f-82775aa6496d.png)

- Cài đặt Apollo 

```
yarn add @nuxtjs/apollo
```

- Tạo file `apollo-config.js` trong folder `plugins`, file này sẽ bao gồm 3 phần chính

**Handle lỗi**
```
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
```

**Setup endpoint**
```
const httpLink = createHttpLink({
    uri: httpEndpoint,
  });
```

**Setup context**
```
const authLink = setContext((_, { headers }) => {
    const  token = localStorage.getItem('access-token');
    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        Authorization: 'Basic ' + token,
      },
    };
  });
```

File `apollo-config.js` cuối cùng sẽ trông như thế này
```
import { onError } from '@apollo/client/link/error';
import { createHttpLink, from } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

export default function (context) {
  const httpEndpoint = context.env.ENDPOINT;

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const httpLink = createHttpLink({
    uri: httpEndpoint,
  });

  const authLink = setContext((_, { headers }) => {
    let token = '';
    if (!process.server) {
      token = localStorage.getItem('access-token');
    }
    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        Authorization: 'Basic ' + token,
      },
    };
  });

  return {
    link: from([errorLink, authLink, httpLink]),
    defaultHttpLink: false,
  };
}

```

- Add `apollo-config.js` vào `nuxt.config.js`

```
apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
    },
  },
```

# 3. Kết
Vậy là chúng ta đã setup xong `Apollo` cho `Nuxt`. Trong bài viết tiếp theo mình sẽ hướng dẫn cách sử dụng `Graphql` cho dự án.