### Progressive Web Application là gì
- Progressive Web App (PWA) được google giới thiệu vào 2015, là xu hướng mới nhất trong phát triển ứng dụng di động sử dụng công nghệ Web. Nó có nhiều tính năng vượt trội để tăng trải nghiệm người dùng trên nền web giống như một ứng dụng native.
- Đáng tin cậy - Tải trang ngay lập tức , ngay cả trong điều kiện mạng kém.
- Nhanh - Phản hồi nhanh chóng với tương tác của người dùng.
- Tương tác - Người dùng cảm thấy trang web giống như một ứng dụng native, trải nghiệm mượt mà.
- Cải thiện SEO - Tốc độ load và trải nghiệm là yếu tố quan trọng của SEO

Các bạn có thể tham khảo thêm các bài viết trên viblo:
- https://viblo.asia/p/gioi-thieu-ve-progressive-web-apps-maGK7WPBKj2

### Nuxt Js
Trên viblo có khá nhiều bài giới thiệu về nuxt js, có lẽ mình cũng ko cần phải nói nhiều:

> **Nuxt.js là một framework mạnh mẽ giúp chúng ta xây dựng trang web một cách đơn giản sử dụng Vue.js. Nó xây dựng giao diện người dùng (UI rendering), trong trừu tượng hóa việc phân phối giữa client và server. Mục tiêu của Nuxt.js là tạo ra một framework đủ linh hoạt để bạn có thể sử dụng nó làm cơ sở cho project hoặc ngoài project dựa trên Node.js. Nuxt.js đã cài đặt sẵn tất cả cấu hình cần thiết để dễ dàng tạo ra một bộ khung hoàn chỉnh cho ứng dụng Vue.js. Ngoài ra, Nuxt.js cũng cung cấp một lựa chọn deploy khác, gọi là: nuxt generate. Nó sẽ xây dựng một Static Generated cho ứng dụng Vue.js. Lựa chọn này có thể là bước tiến lớn cho việc phát các ứng dụng Web trên microservices. Là một framework, Nuxt.js có rất nhiều tính năng giúp bạn phát triển giữa client và server, ví dụ như: Dữ liệu không đồng bộ, Middleware, Layouts,...**

### Xây dựng ứng dụng

#### Cài đặt
Đầu tiên bạn cần cài đặt vue-cli để có thể làm server render:
```
npm install -g vue-cli
```

Khởi tạo project:
```
vue init nuxt/starter pwa-news
cd pwa-news
npm install
```

Chạy project:

```
npm run dev
```

server local sẽ chạy trên port 3000: http://localhost:3000

Chúng ta cần cài đặt một số thư viện cần thiết lên:

```
npm install @nuxtjs/axios @nuxtjs/bulma @nuxtjs/dotenv
```

- @nuxtjs/axios: Tương tác với api server bằng axios.
- @nuxtjs/bulma: Css framwork giống với bootstrap css 
- @nuxtjs/dotenv:  file config .env


Add 3 module trên vào file: `nuxt.config.js`

```
// nuxt.config.js

modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/bulma'
]
```

### Xây dựng ứng dụng

Sửa file `layouts/default.vue` như sau:

```html
// layouts/default.vue

<template>
    <div>
        <section class="hero has-text-centered is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">PWA News</h1>
                    <h2 class="subtitle">All the headlines making the wavy!</h2>
                </div>
            </div>
        </section>
        <nuxt/>
    </div>
</template>

<style>
    html {
        font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
</style>
```

trong file `pages/index.vue` thêm đoạn code sau:

```html
// pages/index.vue

<template>
    <section class="section">
        <div class="container">
            <div class="columns is-multiline">
                <div
                    class="column is-one-quarter"
                    v-for="(article, index) in articles"
                    :key="index">
                        <a :href="article.url" target="_blank">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-3by2">
                                        <img :src="article.urlToImage" :alt="article.title">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">{{ article.title }}</div>
                                </div>
                            </div>
                        </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        async asyncData({ app }) {
            const { articles } = await app.$axios.$get(
                `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${process.env.API_KEY}`
            );

            return { articles };
        },
    };
</script>
```

chúng ta cần tạo một file .env với nội dung sau ở thư mục gốc:

```
API_KEY=5deec62aa3594850bca10dc2f4f1410d
```

reload lại trang chúng ta sẽ có nội dung như sau:

![](https://images.viblo.asia/62fa3f54-629c-4700-929b-3c8d57edadec.png)

### Convert web sang PWA

Trong nuxt js có module là [Nuxt PWA](https://pwa.nuxtjs.org/)

Trong module này có sẵ các module sau:

​Manifest - Tạo manifest.json file.
​Meta - Add SEO với minifest file.
​Icon - Tạo app icon với các size khác nhau.
​OneSignal - Push notifications sử dụng  OneSignal.

```
npm install @nuxtjs/pwa
```

```
// nuxt.config.js

modules: [
    ...,
    '@nuxtjs/pwa'
]
```

add icon vào thư mục static của bạn: [icon](https://github.com/nuxt/hackernews/blob/master/static/icon.png)

chúng ta chỉ cần cài đặt như vậy là dc, không cần làm bất cứ gì thêm.

Sau khi cài đặt xong, bạn đặt debug lên vào tab audits để kiểm tra `Progressive Web App`:

![](https://images.viblo.asia/5da18f1d-ba15-4ca0-a38c-b40a41b2e1af.png)

### Tham khảo:
- https://scotch.io/tutorials/build-a-progressive-web-application-with-nuxtjs