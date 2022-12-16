### Giới thiệu
Hôm nay mình muốn chia sẻ một thứ có lẽ sẽ giúp ích được bạn trong vấn đề responsive.
Mình đã từng gặp rất nhiều component có thể tái sử dụng  và nó được đặt ở nhiều nơi. Và việc responsive với những component đó mình đã gặp một số khó khăn.
Mình đã sử dụng css `@media` nhưng nó cũng chưa đáp ứng được hoàn toàn trong trường hợp của mình.

### Ví dụ
Hãy tưởng tượng bạn có 1 component `PostItem` và `PostsPage` để hiển thị danh sách bài post:
Và với css thì bạn có thể làm như sau:
```css
.post__item {
  display: flex;
}
.post__image {
  flex: 0 0 200px;
  height: 200px;
}
```
![](https://images.viblo.asia/c2370c91-c71e-4264-96ba-4069d63f0061.png)

Và khi ở trên thiết bị mobile: 
Bạn cần thêm `@media` để giải quyết vấn đề
```css
@media only screen and (max-width: 576px) {
  .post__item {
    flex-direction: column;
  }
  
  .post__image {
    flex: 0 auto;
    height: auto;
  }
}
```

![](https://images.viblo.asia/0caf059b-7d06-4417-93d0-89352d75695e.png)

OK, nó đã hoạt động. Nhưng điều gì sẽ xảy ra nếu chúng ta sẽ sử dụng component `PostItem`  ở một chỗ khác?

![](https://images.viblo.asia/2f46cf36-11fc-4f49-8185-4df433200056.png)

Khi đó ở một màn hình lớn hơn thì nó đã hiển thị 3 item trên 1 hàng.  Và như các bạn thấy thì các khoản cách giữa các item không được chính xác nữa, khoản cách bị thu hẹp và chữ thì khá dài. Các nội dung giữa các component không đều nhau.
Vậy responsive của `@media` là nó chỉ dựa trên kích thước màn hình hiện tại chứ không dựa trên chính component đó.

### ResizeObserver
ResizeObserver là một tính năng mới cho phép bạn được thông báo khi nội dụng của một element nào đó bị thay đổi
Có có thể s dụng một cách đơn giản như sau:
```javascript
const observer = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px x ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  })
});

observer.observe(someElement);
```

Thc ra nó không được hỗ trợ tốt trên tất cả các trình duyệt. Bạn có thể tham khảo ở bảng sau:

![](https://images.viblo.asia/216daeec-eac0-416a-87b3-bf348c94d65a.png)

Nhưng may mắn là nó đã được pollyfill dựa trên  **MutationObserver** để có thể hỗ trợ nhiều trình duyệt hơn:

![](https://images.viblo.asia/8a406e4e-7087-486e-86bb-c1e8cbc06820.png)

### Sử dụng trong Vue  như thế nào?
Với package [vue-responsive-components](https://github.com/Kelin2025/vue-responsive-components) nó đã sử dụng **ResizeObserver** để responsive một component.
Có component sau: 
```javascript
<template>
  <Responsive :breakpoints="{ small: el => el.width <= 500 }">
    <div slot-scope="el" :class="['post__item', { small: el.is.small }]">
      <img class="post__image" :src="post.image" />
      <div class="post__text">{{post.text}}</div>
    </div>
  </Responsive>
</template>

<script>
import { Responsive } from "vue-responsive-components"
export default {
  props: ['post'],
  components: { Responsive }
}
</script>

<style lang="scss">
    .post__item {
      display: flex;
    }
    .post__image {
      flex: 0 0 200px;
      height: 200px;
    }
    .post__item.small {
      flex-direction: column;

      .post__image {
        flex: 0 auto;
        height: auto;
      }
    }
</style>
```
Và bây giờ bạn hãy nhìn kết quả sau khi trên 1 hàng có 3 item:

![](https://images.viblo.asia/251d5e27-02da-4ce2-bc68-5f2334f1f49b.png)

Điều đó cho chúng ta thấy nó đã responsive dựa trên mỗi component chứ không phải dựa trên kích cỡ của màn hình nữa.

Hình dưới là mình đã thêm các tab xem bài đăng ở chế độ "extra small":

![](https://images.viblo.asia/5cd5d1f2-c848-47ac-a087-91607671e448.png)

Ngoài ra ở `vue-responsive-components` còn có directive `v-responsive`
```javascript
<template>
  <!-- Will add/remove .small if the width is less / greater -->
  <div class="post__item" v-responsive="{ small: el => el.width <= 500 }">
    <img class="post__image" :src="post.image" />
    <div class="post__text">{{post.text}}</div>
  </div>
</template>

<script>
import { ResponsiveDirective } from "vue-responsive-components"
export default {
  props: ["post"],
  directives: {
    responsive: ResponsiveDirective
  }
}
</script>
```

### Tổng kết
Trên đây mà đã giới thiệu cho các bạn cách để responsive 1 component ở trong vue thông qua `ResizeObserver` của package `vue-responsive-components`. Hy vọng bài chia sẻ của mình giúp ích được cho các bạn.

Nguồn: [Making responsive Vue components with ResizeObserver](https://itnext.io/making-adaptive-vue-components-with-resizeobserver-123b5ebb20ae)