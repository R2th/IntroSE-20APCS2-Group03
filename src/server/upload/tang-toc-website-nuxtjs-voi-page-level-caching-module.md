Đã bao giờ bạn tự hỏi: Thế méo nào truy cập cái trang web này web nọ nó nhanh vãi l..u.ô.n...? Chắc là server bọn này khủng lắm! Maybe... :)

Với một website, thời gian sau khi bạn nhấn enter trên address bar và nhìn thấy nội dung website phụ thuộc vào rất nhiều yếu tốc khác nhau:
- Cấu hình server (CPU/Memory)
- Khả đáp ứng của server
- Chất lượng code, loại nội dung, CDN...

Tuy nhiên, dù bằng cách này hay cách khác, một website hiển thị rất nhanh trên browser sau khi bạn nhấn nút Enter đều cần có một hệ thống caching phức tạp đứng đằng sau. Và trong bài viết này tôi sẽ đề cập tới một phương pháp giúp cải thiện tốc độ truy cập cho website Nuxt.js được gọi là Page-level caching và cách để implement cho Nuxt.js thì lại rất đơn giản nhưng vẫn mang lại hiệu quả.

![image.png](https://images.viblo.asia/1ed1d32f-92a2-40ae-975a-7e4b42a2cd90.png)

## Page-Level Caching là gì?

Page-Level caching là kỹ thuật lưu lại toàn bộ nội dung HTML trong response của website tại lần đâu tiên truy cập, và tái sử dụng nội dung đó cho các request tiếp theo mà không phải đợi web app render lại trang web đó nữa.

Tôi giả sử chúng ta truy cập https://viblo.asia, và khi có page cache thì trông nó sẽ kiểu như thế này:

![image.png](https://images.viblo.asia/bdcd8452-160e-4949-82b7-c8dd8b781b0e.png)

Tại lần truy cập https://viblo.asia  lần thứ hai trên browser, lúc này bước **2.1 Render HTML** sẽ bị loại bỏ vì trong Cache Storage đã tồn tại bản HTML Response của lần truy cập trước đó. Các bước sẽ thực hiện là: 1 -> 2 -> 3. Do web app không phải render HTML nên sẽ giảm thời gian response và user sẽ nhanh chóng nhận được full page HTML.

Thời gian sống của data trong Cache Storage được gọi là TTL - Time To Live. VD: TTL = 600s <=> 10 phút thì bản cache trên sẽ hết hạn và bị xóa đi.

## Implement Page-Level Caching

Chúng ta có thể implement page-level caching ở Nginx layer. Tuy nhiên, trong bài này tôi hoàn toàn có thể cache trong Node.js cho Nuxt app vì việc tích hợp khá nhanh chóng và có thể customize cache profile tùy theo context của Nuxt app. VD:
- Chỉ cache response của một số loại request nhất định
- Tùy biến cache TTL cho từng trang. Chẳng hạn, trang nhiều người truy cập trong, nội dung ít thay đổi: TTL 1 ngày; trang nhiều người truy cập, nội dung thay đổi nhiều: TTL 10 phút...

Sau quá trình tìm kiếm để đỡ phải tạo lại cái bánh xe. Tôi tìm thấy một cái lib nhỏ khá hay `nuxt-ssr-cache` nhưng owner có vẻ không còn check issue và PR để maintain nên tôi đã fork về cải thiện, customize và thêm thắt một vài thứ cho phù hợp với những điều trên. Hiện tại tôi đã publish nó trên NPM tại: https://www.npmjs.com/package/@kimyvgy/nuxt-page-cache.

Đây là một module cho Nuxt.js, giúp implement Page-Level Caching, hỗ trợ nhiều kiểu lưu trữ như:
- Memory
- Redis
- Memcached
- IORedis
- MultiLayer

### Cài đặt cache module

```bash
yarn add @kimyvgy/nuxt-page-cache

# nếu dùng NPM thì:
npm install @kimvygy/nuxt-page-cache
```

Sau khi cài đặt, chỉ cần activate module trong `nuxt.config.js` nữa là được.

```javascript:nuxt.config.js
const pageCacheOptions = {
  // ...
};

module.exports = {
  // ...,
  
  modules: [
    ["@kimyvgy/nuxt-page-cache", pageCacheOptions]
  ],
}
```

Trong đó, `pageCacheOptions` chứa phần cấu hình chi tiết cache sẽ đề cập phần dưới đây. VD như: trang nào được cache, trang nào không, lưu cache vào đâu...

### Cache Options

**1. Thiết lập trang cần được cache**

Chúng ta tạo property `pages` là array của string hoặc regex expression:
- Nếu là string, các trang bắt đầu bằng string đó sẽ được cache
- Nếu là Regex Expression, 1 hoặc nhiều trang thỏa mãn regex sẽ được cache

VD như sau:

```javascript
const pageCacheOptions = {
    pages: [
      '/articles', // áp dụng các trang bắt đầu bằng /articles hay /articles/*,
      /^\/$/,      // chỉ áp dụng cho trang chủ /
    ],
    
    // ...
}
```

**2. Thiết lập cache storage**

Theo document, sử dụng property `store` để cấu hình cache storage. Ở đây tôi dùng với Redis:

```javascript
const pageCacheOptions = {
    // ...,
    
    store: {
        type: 'redis',
        max: 100, // lưu tối đa 100 page
        ttl: 600, // TTL mặc định là 10 phút

        // REDIS options để connect tới Redis - https://www.npmjs.com/package/redis
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        db: process.env.REDIS_DB,
        prefix: process.env.REDIS_PREFIX,
    },
}
```

**3. Thiết lập cache key và tùy biến riêng TTL cho từng trang**

Module này cung cấp khả năng tạo custom key - kiểu như ID cho bản cache tương ứng, mặc định thì url của page sẽ dùng làm cache key:

```javascript
const pageCacheOptions = {
    // ...

    key(route, context) {
      if (/^\/articles\/.+/.test(context.req.url)) {
        return { key: context.req.url, ttl: 84600 } // ttl 1 ngày với trang /articles/*
      }
      
      return context.req.url // cache với TTL mặc định
    },
}
```



Hàm này generate cache key tương ứng cho request để lưu vào trong redis:
- Nếu return `false` sẽ bypass page-level caching -> không dùng page-cache
- Nếu return string thì string sẽ dùng làm cache key với TTL mặc định trong phần cấu hình `store`
- Nếu return object dạng `{key, ttl}`:  `key` sẽ dùng làm cache key, `ttl` sẽ áp dụng riêng cache key đó

Tips:
- Ở đây, bạn có thể dùng thêm md5 để băm key cho ngắn gọn cũng được
- Hoặc có thể check context của request như cache riêng cho user, cache cho guest...
- Tùy biến TTL để bản cache tồn tại lâu hơn.

## Thử nghiệm page cache

Áp dụng các bước trên và demo thử nghiệm trên repo https://github.com/bdrtsky/nuxt-dev-to-clone. Demo của họ tại https://dev-clone.nuxtjs.app/. Một số thứ đã sử dụng trong repo này giúp cải thiện trải nghệm về tốc:
- Prefetch data dưới client-side, hiển thị content placeholder khi đang loading.
- Sử dụng `<keep-alive>` với vue-router để cache lại trang vừa truy cập trên client-side (client memory cache nha)

### Chưa có dùng page cache

Response dao động khoảng 250 ~ 700ms khi tôi thử:

<div align="center">

![image.png](https://images.viblo.asia/059ee872-cd9e-4142-88d9-526825551646.png)
(Ảnh 1. Không có page cache, response time từ 300 ~ 600ms)

</div>

### Khi có page cache

Response sau request đầu tiên sẽ được cache lại Full HTML response và kết quả < 30 ms:

<div align="center">

![image.png](https://images.viblo.asia/1ed1d32f-92a2-40ae-975a-7e4b42a2cd90.png)
(Ảnh 2. Có dùng page cache, response time giảm xuống 6 ~ 30 ms)

</div>

## Lưu ý khi sử dụng

Luôn luôn thêm cơ auto versioning hoặc tương tự để mỗi khi deploy lên production thì module page-cache trên sẽ tự động xóa các bản cache của version trước đó.

Vì là full HTML cache mà, trong HTML luôn chưa các đường link JS, CSS... nội dung của chúng có thể sẽ thay đổi trong quá trình phát triển dẫn tới file hashcontent thay đổi làm tên file cũng thay đổi theo. Như vậy, tên một file JS trong bản cache của version trước có thể sẽ không còn tồn tại trên version mới. Điều này có thể gây crash hoặc lỗi style... Do đó, LUÔN ĐÁNH VERSION khi deploy.

Trong module trên, tôi chưa đề cập tới vấn đề config version cho bản cache. Cách thực hiện thì đơn giản thôi, đó là bạn thêm property `version` trong file `nuxt.config.js` nhé, bạn có thể lấy version từ `package.json` hoặc lấy build number của bản build trên CI/CD làm version cũng được. Miễn đảm bảo, chúng unique sau mỗi lần deploy là được.

```javascript:nuxt.config.js
const BUILD_NUMBER = process.env.BUILD_NUMBER

module.exports = {
  version: 'nuxt-dev-to-clone.build-${BUILD_NUMBER}',
  
  // ...
}
```

## Demo source

- https://github.com/kimyvgy-forks/nuxt-dev-to-clone
- https://devto.webee.asia
- https://www.npmjs.com/package/@kimyvgy/nuxt-page-cache

## Tổng kết

Trên đây là bài chia sẻ về việc implement full page cache trên Nuxt.js với package [@kimyvgy/nuxt-page-cache](https://www.npmjs.com/package/@kimyvgy/nuxt-page-cache) của tôi. Mời các bạn cùng ngâm cứu trải nghiệm.

Đừng quên vote bài này nếu bạn thấy bài viết hữu ích để recommend cho các anh em Viblo khác nhé. Xin cảm ơn!

Phần tiếp theo: https://viblo.asia/p/tang-toc-website-laravel-voi-page-cache-than-chuong-Eb85ozpjl2G

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***