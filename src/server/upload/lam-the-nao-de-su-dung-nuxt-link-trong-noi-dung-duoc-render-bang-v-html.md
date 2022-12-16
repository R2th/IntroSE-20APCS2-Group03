## Giới thiệu chung

Chắc có lẽ khi làm việc với Nuxt.js thì bạn sẽ gặp trường hợp, nội dung văn bản được tạo trên server. Và trong Nuxt.js chúng ta sẽ cần phải dùng `v-html` để hiển thị được nội dung văn bản mong muốn của server trên trình duyệt chứ không phải là mã HTML đã bị encode mà người dùng không hiểu gì. :D

![](https://images.viblo.asia/bfc72742-3f83-4edc-8d37-b901f11a5a59.png)

Trong tình huống này, một vấn đề gặp phải đó là khi `click` vào những `backlink` có trong văn bản trên thì browser sẽ thực hiện tải mới lại cả trang thay vì sử dụng `Vue Router` để chỉ render những thành phần cần thay đổi mà không phải tải lại cả trang web. Điều này sẽ giúp tăng trải nghiệm của user phải không nào! :laughing: 

![](https://images.viblo.asia/6f917ff5-4eb0-4e99-8a00-08141ea11bc6.gif)

Hòa chung bầu không khí rộn ràng trao quà của Viblo May Fest 2020, bài viết này không phải gì cao siêu nhưng sẽ hướng dẫn các bạn cách để sử dụng *"NuxtLink"* trong nội dung văn bản đã được render bằng `v-html`.

Bài viết này sẽ làm một bài giúp bạn rèn luyện về Nuxt.js / Vue.js:
- Cách sử dụng methods trong component một cách linh hoạt
- Sử dụng hook `mounted`, `beforeDestroy`
- Biết cách vận dụng `event/listener` của JavaScript vào code Vue.

Bây giờ cùng bắt đầu nhé!

## Giải pháp

Giải pháp sẽ theo ý tưởng trong [answer này](https://viblo.asia/a/Je5E1dA45nL) của mình trên Viblo:
- Vẫn sẽ tiếp tục sử dụng `v-html` để render contents
- Sau khi component `mounted` thì sẽ listen sự kiện `click` trên các thẻ `<a>` và thực hiện chuyển trang bằng api của `vue-router`
- Xóa bỏ listener `click` ở trên khi chuyển page

## Nuxt.js mẫu

### Tạo Nuxt app

Tạo một app Nuxt.js nhỏ để demo, mình sử dụng tool `create-nuxt-app` để tạo cho nhanh:

```bash
yarn create nuxt-app demo-use-nuxtlink-v-html
```

![](https://images.viblo.asia/d0971deb-3c21-4248-a074-821da71367f5.png)

### HTML Contents

Mình copy một đoạn code giới thiệu về Viblo Platform trên trang https://about.viblo.asia về demo cho đỡ nhàm chán:

```typescript:~/contents/article.ts
const contents: string = `
<div class="about-text text-justify" style="visibility: visible;">
  <p class="my-3"><strong>Viblo Platform</strong> là cộng đồng chia sẻ kiến thức và học tập về công nghệ thông tin đang ngày một phát triển với hơn 40 nghìn thành viên đang hoạt động; Được quản lý và phát triển bởi Viblo Team (thuộc Công ty cổ phần Sun Asterisk). </p>
  <p class="my-3"> Với nền móng là dịch vụ <a href="https://viblo.asia" target="_blank" rel="noopener" class="underline"><strong>Viblo</strong></a> được ra mắt ngày 03.04.2015, bạn có thể viết và chia sẻ nội dung liên quan đến các vấn đề kỹ thuật như: <strong>Development</strong> (chủ đề lập trình, infrastructure...), <strong>Design</strong> (thiết kế trong quá trình sản xuất phần mềm), <strong>QA</strong> (test, đảm bảo chất lượng dự án...), <strong>Management</strong> (quản lý dự án). </p>
  <p class="my-3"> Từ năm 2019, Viblo mở rộng thêm những dịch vụ mới để trở thành Viblo Platform bao gồm: <a href="https://code.viblo.asia" target="_blank" rel="noopener" class="underline"><strong>Viblo Code</strong></a> (dịch vụ về luyện tập kỹ năng coding, giải thuật), <a href="https://ctf.viblo.asia" target="_blank" rel="noopener" class="underline"><strong>Viblo CTF</strong></a> (dịch vụ về luyện tập kỹ năng coding, an toàn thông tin) và <a href="https://cv.viblo.asia" target="_blank" rel="noopener" class="underline"><strong>Viblo CV</strong></a> (dịch vụ tạo các mẫu CV chuyên nghiệp dành cho lập trình viên) với mong muốn vươn mình trở thành một nền tảng mở, đóng góp cho sự phát triển của cộng đồng IT Việt Nam.</p>

  <p class="my-3">
    <a href="http://localhost:3000">Back to Home Page 1</a> <br>
    <a href="/#hello">Back to Home Page 2</a> <br>
    <a href="/?search=mayfest">Back to Home Page 3</a> <br>
    <a href="/inspire?search=mayfest#my-article">Back to Home Page 4</a> <br>
  </p>
</div>
`

export default contents
```

Hiển thị nội dung ra và style một xíu:

```typescript:~/pages/inspire.vue
import { Vue, Component } from 'vue-property-decorator'
import htmlContents from '@/contents/article'

@Component
export default class Inspire extends Vue {
  get htmlContents (): string {
    return htmlContents
  }
}
```

```jsx:~/pages/inspire.vue
<template>
  <v-layout>
    <v-flex class="my-article">
        ...

        <v-card-text v-html="htmlContents" />
      </v-card>
    </v-flex>
  </v-layout>
</template>
```

## Triển khai

Vẫn trên ý tưởng là listen `onClick` của các thẻ `<a>` để điều hướng chuyển trang bằng `vue-router`. Chúng ta sẽ tạo một method `useVueRouter` trong component `inspire.vue` để làm listener; sẽ chạy mỗi khi xảy ra hành động click vào một link trong bài viết.

- Query toàn bộ danh sách link trong bài viết `this.$el.querySelectorAll` chứ không phải là `document.querySelectorAll` để lấy các link trong component này chứ không phải toàn bộ trang.
```typescript
const anchors = this.$el.querySelectorAll('.my-article a[href]')
```

- Sử dụng `addEventListener` để thêm listener link và `removeEventListener` để xóa bỏ listener đấy đi khi component `destroy`. Vì cả hai code đều có 2 lệnh tương tự nhau nên mình sẽ gộp chung lại, kết quả sẽ như này:

```typescript:~/pages/inspire.vue
import { Vue, Component } from 'vue-property-decorator'
import htmlContents from '@/contents/article'

@Component
export default class Inspire extends Vue {
  get htmlContents (): string {
    return htmlContents
  }

  mounted () {
    this.forEachAnchor((element) => {
      element.addEventListener('click', this.useVueRouter)
    })
  }

  beforeDestroy () {
    this.forEachAnchor((element) => {
      element.removeEventListener('click', this.useVueRouter)
    })
  }

  forEachAnchor (callbackfn: (value: Element, key: number, parent: NodeListOf<Element>) => void): void {
    const anchors = this.$el.querySelectorAll('.my-article a[href]')

    anchors.forEach(callbackfn)
  }

  useVueRouter (e: Event) {
    e.preventDefault()

    console.log(e.target)
  }
}
```

Truy cập http://localhost:3000/inspire để test lại trang web mẫu và nhấn thử vào các link trong bài viết demo bạn sẽ thấy có gì đó sai sai nếu dùng `e.target`, dù click vào link nhưng một số trường hợp `e.target` lại lấy ra thẻ `strong`:

![](https://images.viblo.asia/53e51935-fd5b-40b7-9839-e19901f19b58.gif)

Đó là bởi, mội số thẻ `<a>` trong đoạn nội dung mình test có chứa thẻ `<strong>`. Thực chất thì event click được bắn ra từ `<strong>` và lan truyền ra cho thẻ chứ nó là`<a>`. Để lấy đúng thẻ `<a>`, mình dùng `e.currentTarget` thay vì `e.target`. Bây giờ, mình có thể lấy được đường dẫn link được click qua thuộc tính `href` ra rồi thực hiện phân tích link để quyết định xem thẻ `link` được click có dùng `vue-router` hay không. Chẳng hạn như những link không thuộc hệ thống thì vẫn sẽ tải trang bình thường, link thuộc web thì sẽ dùng `vue-router`. Mình sử dụng luôn API `URL` để parse link:

```typescript
const href = e.currentTarget.getAttribute('href') || ''
const parsedURL = new URL(href, window.location.origin)
const isNuxtLink = parsedURL.hostname === window.location.hostname
```

![](https://images.viblo.asia/dda90d20-65a9-41c9-a8d3-c795fc437f5e.gif)

Method `useVueRouter` cuối cùng được triển khai như sau:

```typescript:~/pages/inspire.vue
  useVueRouter (e: Event) {
    if (e.currentTarget instanceof Element) {
      const href = e.currentTarget.getAttribute('href') || ''
      const parsedURL = new URL(href, window.location.origin)
      const isNuxtLink = parsedURL.hostname === window.location.hostname

      if (isNuxtLink) {
        // Stop reload page
        e.preventDefault()

        // Use vue router
        this.$router.push({
          path: `${parsedURL.pathname}${parsedURL.search}`,
          hash: parsedURL.hash
        })
      }
    }
  }
```

### Kết quả

![](https://images.viblo.asia/f9bb7555-f116-4d16-a66a-b269a4b1196e.gif)

## Tổng kết

Trên đây là cách để khi click vào các thẻ link trong nội dung một bài viết được render bằng `v-html` sẽ sử dụng `vue-router` để không phải load lại trang giúp tăng trải nghiệm người dùng.

Bài viết này được viết ra nhằm mục đích làm demo cho answer của mình trên Viblo. Hy vọng bài viết sẽ giúp anh em phần nào biết thêm một cách để tùy biến trong Vue / Nuxt.js.

Nếu có đóng góp gì thêm cho bài viết, bạn vui lòng thả một comment phía dưới nhé! <3 Đừng quên vote up cho bài viết này và follow mình để nhận được thông báo khi mình publish các bài viết mới nha. :laughing:

[Source code - Github](https://github.com/kimyvgy/demo-use-nuxt-link-v-html)

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***