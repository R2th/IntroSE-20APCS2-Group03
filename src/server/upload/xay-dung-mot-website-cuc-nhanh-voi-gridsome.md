Trong bài viết trước, mình đã giới thiệu tới các bạn  `VuePress`, trong bài viết này sẽ tiếp tục là 1 công cụ nữa, tiếp tục là 1 công cụ để xây dựng static web nữa là `Gridsome`.

Demo blog xây dựng từ `Gridsome` [ tại đây](https://daothaison.me).

## Về Gridsome

`Gridsome` cũng được xây dựng với `Vue.js` và được phát triển nằm trong `Jamstack framework`, nó được sử dụng để tạo ra website nhanh nhất có thể, đáp ứng được nhu cầu người dùng.

![](https://images.viblo.asia/718fbd60-9c97-4e03-a587-0272bbb6343b.png)

Điểm mạnh của `Gridsome` là :

- Vue.js cho frontend: Nếu bạn đã sử dụng qua Vue thì đây là một framework cực kỳ thân thiện, dễ sử dụng với người dùng, công động phát triển đông đảo.
- Việc tạo nội dung trên website cũng khá đơn giản, Gridsome tương thích với rất nhiều CMS tiện dụng, và cũng sử dụng Markdown để viết nội dung.
- Local development with hot-reloading: Giống như VuePress, Gridsome cũng có local server, giúp việc phát triển dễ dàng hơn
- Routing trên website dựa trên file, điều này tương tự như VuePress
- GraphQL data layer: Database của Gridsome sử dụng GraphQL, rất đơn giản để quản lý và truy xuất.
- Plugin ecosystem : Số lượng plugin được xây dựng phong phú, dễ dàng sử dụng.

## Gridsome hoạt động như nào ?

`Gridsome` sẽ generate các trang Markdown của bạn thành các trang HTML tĩnh, sau khi được trình duyệt load ra, website của bạn sẽ là một `Vue SPA`, trải nghiệm người dùng sẽ tốt hơn rất nhiều.

Gridsome sẽ build 1 file `html` và 1 file `json` cho mỗi trang. Sau khi trang đầu tiên được load, nó sẽ chỉ sử dụng file `json` để prefetch và lấy dữ iiệ cho trang tiếp theo, phần script `js` sẽ được build theo từng page, khiến tốc độ load mỗi lần sẽ giảm đi rất nhiều.

## Bắt đầu xây dựng web bằng Gridsome thôi

### Cài đặt Gridsome

Trước tiên bạn cần có `Node` (v8.3+) và mình sử dụng `Yarn` để cài các thư viện nhé

```
$ yarn global add @gridsome/cli  // cài đặt gridsome-cli

$ gridsome create my-gridsome-site // Để init dự án

❯ Clone https://github.com/gridsome/gridsome-starter-default.git 2.79s
❯ Update project package.json 0s
❯ Install dependencies


$ cd my-gridsome-site

$ yarn develop // Khởi tạo local server
 DONE  Compiled successfully in 106ms                                                                    9:31:07 PM


  Site running at:                                         
  - Local:                 http://localhost:8080/          
  - Network:               http://192.168.1.75:8080/       
                                                           
  Explore GraphQL data at: http://localhost:8080/___explore

```

Tadaa vậy là local server đã được bật, giao diện cũng khá đơn sơ nhỉ ? 
![](https://images.viblo.asia/516a3a22-ddf8-4034-b4d4-4c6d36f4d215.png)

Cấu trúc thư mục dự án cũng khá tường minh: 

```
.
├── package.json
├── gridsome.config.js
├── gridsome.server.js
├── articles/       # Thư mục chứa các trang nội dung
├── static/
└── src/            # Nơi chứa source trên website
    ├── main.js
    ├── index.html
    ├── App.vue
    ├── layouts/
    │   └── Default.vue
    ├── pages/
    │   ├── Index.vue
    │   └── Blog.vue
    └── templates/
        └── BlogPost.vue

```

Giờ mình cùng làm cho nó thêm sinh động 1 chút nhaa

### Cài thêm chút thư viện, plugin vô

Để thêm thư viện và plugin bạn bổ sung chúng vào trong file `package.json` nhé, sau đó lại chạy `yarn install`

```json:package.json
{
  "name": "my-gridsome-website",
  "private": true,
  "scripts": {
    "build": "gridsome build",
    "develop": "gridsome develop",
    "explore": "gridsome explore"
  },
  "dependencies": {
    "@gridsome/plugin-google-analytics": "^0.1.0",
    "@gridsome/plugin-sitemap": "^0.1.1",
    "babel-runtime": "^6.26.0",
    "bootstrap": "^4.3.1",
    "gridsome": "0.5.7",
    "gridsome-plugin-gtm": "^0.1.1",
    "jquery": "^3.4.0",
    "popper.js": "^1.15.0",
    "vue-instantsearch": "^2.0.1"
  },
  "devDependencies": {
    "@gridsome/remark-prismjs": "0.0.5",
    "@gridsome/source-filesystem": "^0.3.0",
    "@gridsome/transformer-remark": "^0.2.1",
    "webpack-node-externals": "^1.7.2"
  }
}

```
và cấu hình các plugin đó vào trong file `gridsome.config.js`
```js:gridsome.config.js
// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const nodeExternals = require('webpack-node-externals')

module.exports = {
  siteName: "My Gridsome Website",
  siteUrl: "https://daothaison.me",
  titleTemplate: '%s - daothaison.me',
  siteDescription: "Taaaadaaaaaaa",

  chainWebpack(config, { isServer }) {
    if (isServer) {
      config.externals(nodeExternals({
        whitelist: [
          /\.css$/,
          /\?vue&type=style/,
          /vue-instantsearch/,
          /instantsearch.js/,
        ]
      }))
    }
  },


  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "article/_posts/**/*.md",
        typeName: "Article",
        route: "/:slug-:id",
        // route: "/:slug"
        remark: {
          autolinkHeadings: {
            content: {
              type: 'text',
              value: '# '
            }
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap'
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-xxxxx'
      }
    }
  ],
  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "fe fe-hash mr-1",
      plugins: ["@gridsome/remark-prismjs"]
    }
  }
};

```

Trong file này mình có cấu hình thêm các plugin để `gridsome` tự động tìm đến các file `Markdown` nội dung của web và compile chúng ra html, plugin sitemap để tạo ra file sitemap - giúp việc Google có thể index website của bạn trên internet sau này, plugin `Google Analytics` để bạn theo dõi được lượng truy cập tới website các thứ,...

Bạn có thể tìm hiểu thêm các config khác từ https://gridsome.org/docs/config .

### Tạo layout cho trang

Layout của trang web được đặt trong thư mục `src/Layouts/Default.vue` , nó là layout mặc định và được sử dụng trong toàn bộ các trang.

```js:src/main.js
// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}

```
```js:src/Layouts/Default.vue
<template>
    <div>
      <div class="flex-fill">
        <div class="header py-4">
          <div class="container">
            <div class="d-flex">
              <g-link class="header-brand" to="/">
                <img src="https://gridsome.org/logos/logo-normal.svg" class="header-brand-img mr-0 w-25" alt="logo"/>
                My Gridsome Website
              </g-link>
              <div class="d-flex order-lg-2 ml-auto">
                <div class="nav-item d-none d-md-flex">
                  <a
                          href="https://github.com/daothaison"
                          class="btn btn-sm btn-outline-primary"
                          target="_blank"
                  >Github Profile</a>
                </div>
              </div>
              <a
                      href="#"
                      class="header-toggler d-lg-none ml-3 ml-lg-0"
                      data-toggle="collapse"
                      data-target="#headerMenuCollapse"
              >
                <span class="header-toggler-icon"></span>
              </a>
            </div>
          </div>
        </div>
        <div v-if="title" class="my-3 my-md-5">
          <div class="container">
            <div class="page-header">
              <h1 class="page-title">{{ title }}</h1>
            </div>
          </div>
        </div>

        <!-- content -->
        <div class="container">
          <slot/>
        </div>
        <!-- end content -->
      </div>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-auto mt-3 mt-lg-0 text-center m-auto">
              Copyright © 2020
            </div>
          </div>
        </div>
      </footer>
    </div>
</template>

<script>
  export default {
    props: {
      title: String
    },
    components: {
    }
  };
</script>

```
Chúng ta sẽ có 1 layout như này
![](https://images.viblo.asia/e1eeee45-8bad-48cc-8431-3b5fa05ebd94.png)

### Hiển thị nội dung lên trang chủ

Để đưa nội dung lên `Gridsome`, bạn cần bổ sung các trang `Markdown` vào trong thư mục` article/posts/` . Với `header` của từng file có template như sau 

```md
---
id: unique_id
date: 2019-04-24 14:04:27
title: 'Tiêu đề'
author: sondt
categories: [ xxx ]
image: ../../images/temp/1.jpg
description: xx
---

# Nội dung của bài
```

Cách `Gridsome` tạo ra các url cũng tương tự như VuePress, nó sẽ tự động xử lý các file `*.vue` bên trong thư mục `src/pages/` . Trang chủ của chúng ta sẽ là file `src/pages/Index.vue`, mình sẽ sửa chúng để lấy các bài viết trong thư mục article và hiển thị danh sách lên trang chủ
```js:src/pages/Index.vue
<template>
  <Layout title="Trang chủ">
    <div class="mb-6">
      <div class="row row-cards">
        <div class="col-lg-12 col-md-12">
            <ListPostTable :articles="$page.articles"/>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import ListPostTable from "~/components/table/ListPostTable.vue";
export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    ListPostTable
  }
}
</script>

<page-query>
  query Article {
    articles : allArticle(perPage: 3){
      edges {
        node {
          id
          date (format: "D MMMM, YYYY")
          title
          timeToRead
          path
        }
      }
    }
  }
</page-query>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

```

Kết quả ta sẽ được giao diện trang chủ như này ![](https://images.viblo.asia/6dc76dce-7b51-43bf-a5ef-e9ad933c95f4.png)

## Tạm kết
Qua bài viết này, hi vọng các bạn đã có thể dựng cho mình 1 website bằng `Gridsome` khá là nhanh gọn. 
Trong bài viết tới, mình sẽ hướng dẫn các bạn cách deploy các website vừa tạo lên server, auto deploy mỗi khi có thay đổi trong source code từ Github nhé. Hy vọng mọi người đón đọc

## Nguồn tham khảo

- https://gridsome.org/
- Github repository: [daothaison/my-gridsome-website](https://github.com/daothaison/my-gridsome-website)