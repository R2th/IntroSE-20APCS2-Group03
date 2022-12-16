# Đặt vấn đề
Thỉnh thoảng, bạn sẽ lâm vào tình cảnh buộc phải tạo ra những component cực nặng trong việc create và render, nguyên nhân chủ yếu là nó phải thực hiện nhiều logic quá phức tạp. Tôi (tác giả) cũng không ngoại lệ.

Tôi đã làm ra một trang sử dụng có sử dụng [StoryBlok](https://www.storyblok.com/developers?utm_source=newsletter&utm_medium=logo&utm_campaign=vuedose), họ có một tính năng cực kỳ ngon đó là tạo ra một `rich-text field` để những người quản lý nội dung có thể sử dụng để định dạng văn bản như text, list, images, quote blocks, in đậm, in nghiêng...

Khi bạn get nội dung của `rich-text` từ StoryBlok API sẽ thấy nó có cấu trúc riêng của nó. Để render data đó thành HTML, bạn phải gọi hàm `richTextResolver.render(content)` từ `storyblok-js-client`.

Ví dụ nếu gói gọn chức năng này vào một component `RichText.vue` thì về cơ bản sẽ như này:

```html
<template>
  <div v-html="contentHtml"></div>
</template>

<script>
  export default {
    props: ["content"],
    computed: {
      contentHtml() {
        return this.$storyapi.richTextResolver.render(content);
      }
    }
  };
</script>
```

Code trông khá đơn giản nhỉ, có vẻ không có gì lạ lẫm lắm, nhưng lại có 1 điều khá bất ngờ.

Có vẻ như việc render tỏ ra rất nặng nề, dễ nhận thấy nhất là khi render nhiều components như thế này với một lượng nội dung kha khá.

Bây giờ tưởng tượng tình huống như sau: Bạn có 1 list các `rich-text` component ở trên page và một dropdown để filter hiển thị theo tiêu chí nào. Khi thay đổi trên dropdown filter, bạn fetch lại tất cả nội dung và cái list sẽ được render lại.

Đây là lúc bạn nhận rõ sự nặng nề của `richTextResolver.render`, cái dropdown bị lag khi đóng lại sau khi bạn select.

Nguyên nhân là mặc định JavaScript thực thi các lệnh trên main thread, which is UI-blocking.

Vấn đề đã ngộ, Vậy có cách cứu chữa nào ko?

# Giải quyết vấn đề

Dễ thôi: Sử dụng Web Worker cho việc render rich-text.

Web Workers chạy trong một Thread riêng biệt, quan trọng hơn là chúng ko `UI-blocking`, rất phù hợp cho case của chúng ta.

> Note: Tôi không đi sâu vào Web Workers, bạn có thể xem thêm [documents](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) của nó.

Hãy luôn nhớ rằng web workers có context riêng của nó, và mặc định chúng ta không thể access vào các contexts khác bên ngoài, nhưng chúng ta lại cần access `storyblok-js-client` module. Để làm được điều này, Webpack có 1 giải pháp là `worker-loader`.

Đầu tiên, cài đặt trước:

```sh
npm install -D worker-loader
# or
yarn add worker-loader
```

Nếu bạn dùng Nuxt.js, chúng ta sẽ config nó trong `nuxt.config.js` như sau:

```js
build: {
  extend(config, { isDev, isClient }) {
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: "worker-loader" }
    });
  }
}
```
Với cấu hình này, tất cả các file `*.worker.js` đều sẽ được xử lý và load bởi `worker-loader`.

Bây giờ thử tạo `render-html.worker.js`

```js
import StoryblokClient from "storyblok-js-client";

let storyClient = new StoryblokClient({});

// When the parent theard requires it, render the HTML
self.addEventListener("message", ({ data }) => {
  const result = storyClient.richTextResolver.render(data);
  self.postMessage(result);
});
```

Đó là một cách làm cơ bản của worker. Bạn cần phải lắng nghe sự kiện `message` - cách mà worker giao tiếp với Vue.js app. Từ đó bạn có thể lấy `data` từ event, render nó bằng `storyblok-js-client` và gửi về lại kết quả `self.postMessage`.

Bây giờ cần sửa component `RichText.vue` một xíu để sử dụng worker.

```html
<template>
  <div v-html="contentHtml"></div>
</template>

<script>
  import Worker from "./render-html.worker.js";

  const worker = new Worker();

  export default {
    props: ["content"],
    data() {
      return { contentHtml: "" };
    },
    mounted() {
      // Update the state with the processed HTML content
      worker.onmessage = ({ data }) => {
        this.contentHtml = data;
      };
   
      // Call the worker to render the content
      worker.postMessage(this.content);
    }
  };
</script>
```

# Kết quả
Hẳn là bạn tò mò về kết quả hiệu năng sẽ được cải thiện bao nhiêu sau khi sử dụng worker, chắc chắn rồi. Chúng ta sẽ thử đo đạc 1 tí để performace thêm ý nghĩa.

Thật ra bạn nên đọc trước bài này: [learn and undestand how to meassure performance in Vue.js components](https://vuedose.tips/tips/measure-runtime-performance-in-vue-js-apps) để đảm bản là bạn hiểu rõ hơn về việc test bên dưới.

Tôi đã mmeassure component bằng `medium-size` (6x throttle) trên máy mac của tôi.

Kết quả là: Thời gian render nhanh hơn __`20.65x`__ lần và thời gian patch nhanh hơn __`1.39x`__, con số cũng ấn tượng nhỉ.

![](https://images.viblo.asia/50104b61-f6c1-47a7-8522-1da4881cf515.png)
![](https://images.viblo.asia/38c385f3-ec8a-486a-b720-301165db27bf.png)

> Nếu bạn chưa biết `render` và `patch` nghĩa là gì thì [bài viết này](https://vuedose.tips/tips/measure-runtime-performance-in-vue-js-apps) có giải thích qua.


Và đó là tip của hôm nay.

See you next month =))

---
Bài viết được lược dịch từ [https://vuedose.tips](https://vuedose.tips/tips/use-web-workers-in-your-vuejs-component-for-max-performance), cảm ơn bạn đã đọc bài viết.