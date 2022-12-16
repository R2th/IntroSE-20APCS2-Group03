Hồi đầu tháng này VueJS vừa kỉ niệm [5 năm ngày release](https://twitter.com/vuejs/status/1092091579119087616), và sau đó 1 ngày thì Vue 2.6 cũng được release với mã tên gọi là “Macross”!

![](https://images.viblo.asia/f87471e8-8146-4e03-9052-3f041b6b4687.jpeg)

Năm vừa qua, đội ngũ của dự án đã dành phần lớn thời gian cho việc phát triển công cụ CLI mới và đưa ra prototype cho phiên bản 3.0. Chính vì thế mà trong giai đoạn đó phần core của Vue 2.x chưa nhận được một bản cập nhật nào đáng kể. Giờ đã đến lúc, bản release này bao gồm những cải tiến đáng kể, những thay đổi bên trong và các tính năng sẽ được giới thiệu trong bài viết này. Còn về chi tiết đầy đủ, bạn có thể check qua bản release note trên GitHub.


# Slots: New Syntax, Performance Improvements & Alignment with 3.0

`Slot` là một cơ chế quan trọng cho phép đặt một component bên trong 1 component trong Vue. Trong khoảng thời gian phát triển prototype cho phiên bản 3.0, đội ngũ phát triển đả phát hiện ra một số cách để cải thiện nó. Một số có thể được giới thiệu mà không phá vỡ các thay đổi, điều này cho phép chúng ta tích hợp vào một bản release cho phiên bản 2.x. Đối với những thay đổi khác bắc buộc phải phá vỡ các thay đổi, đội ngũ phát triển đã cố gắng để cung cấp nó theo một cách khác đối với bản release 2.x này, tuy nhiên vẫn đảm bảo khả năng nâng cấp về sau dễ dàng nhất.

### New Syntax

Điều đầu tiên là cú pháp mới của `scoped slots`. Đội ngũ phát triển đã đề xuất, thảo luận và thử nghiệm với nhiều design khác nhau ([1](https://github.com/vuejs/vue/issues/9180), [2](https://github.com/vuejs/vue/issues/9306), [3](https://github.com/vuejs/rfcs/pull/2)) và cuối cùng dừng lại ở một cú phát `v-slot` mới đã được mô tả trong tài liệu [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md) này. Đây là một ví vụ nhỏ về việc sử dụng `named slots`.

```html
<my-component>
  <template v-slot:header>
    <p>Header</p>
  </template>
  
  <template v-slot:item="{ data }">
    <h2>{{ data.title }}</h2>
    <p>{{ data.text }}</p>
  </template>
  
  <template v-slot:footer>
    <p>Footer</p>
  </template>
</my-component>
```
Cú pháp mới này thống nhất cách sử dụng của slot thông thường với scoped slot bằng một directive là `v-slot` và cú pháp trông rõ ràng và dễ đọc hơn rất nhiều đối với scoped slot. Nó hoàn toàn tương thích với cú pháp hiện tại, điều này cho phép chúng ta chuyển lên 2.6 ngay trong hôm nay.

Nếu bạn đã quen thuộc với cú pháp `slot` hiện tại, thì lời khuyên là bạn nên đọc qua tài liệu [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md) để hiểu rõ hơn về các mối liên quan đằng sau cú pháp mới này. Nếu chưa quá quen thuộc với slots, bạn nên đọc hết phần tại liệu update của slots. 

### Performance Improvements

Một cải tiến quan trọng cho slots mà chúng ta sẽ muốn xem trong bản 3.0 là sự thống nhất giữa slot bình thường và scoped slot trong cách thực hiện, dựa trên thế mạnh về hiệu suất của scoped slots.

Scope bình thường được render trong suốt vòng đời render của component cha. Khi các dependency của một slot thay đổi, nó làm cho cả cha lẫn con phải render lại. Mặc khác, scoped slots được compile thành các "inline functions" và được gọi trong suốt vòng đời render của component con. Điều này có nghĩa mỗi dữ liệu dependencies nằm trên scoped slot được collect bởi component con, làm cho việc cập nhật chính xác hơn. Trong bản 2.6, chúng tôi đã giới thiệu một sự tối ưu hóa để đảm bảo hơn nữa việc thay đổi dependencies trong parent scope chỉ ảnh hưởng đến parent và không ảnh hưởng đến component con nếu nó chỉ sử dụng scoped slot.

Ngoài ra:

- Tất cả slot sử dụng cú pháp `v-slot` mới đều sẽ được compile thành scoped slots. Nghĩa là toàn bộ các slot sử dụng cú pháp mới sẽ tự động có được những cải tiến về mặt hiệu năng;
- Tất cả các slot bình thường bây giờ sẽ exposed `this.$scopedSlots` như những funtions. Nghĩa là người dùng render functions thay vì templates thì nay có thể sử dụng `this.$scopedSlots` mà không cần phải lo lắng loại slots nào được truyền vào.

Trong 3.0, sẽ kkhoong còn sự phân biệt giữa scoped và non-scoped slots, tất cả slots đều sẽ dùng chung một cú pháp, và được compile thành cùng 1 định dạng, và có cùng được tối ưu hóa hiệu năng như nhau.

# Async Error Handling
Cơ chế xử lý lỗi tích hợp của Vue (in-component `errorCaptured` hook and the global `rrorHandler` hook)  nay có thể bắt những lỗi ngay bên trong `v-on` handlers. Ngoài ra, nếu có một lifecycle hooks hoặc một handler của event nào đó thực hiện các hoạt động bất đồng bộ, bạn cũng có thể return về một `Promise` từ hàm đó, nhờ đó mà bất cứ lỗi nào chưa được catch từ việc chain Promise đều được sent vào error handlers. Từ khi các async funtions luôn mặc định return về các Promise thì việc sử dụng async/await đã trở nên dễ dàng hơn.

```js

export default {
  async mounted() {
    // if an async error is thrown here, it now will get
    // caught by errorCaptured and Vue.config.errorHandler
    this.posts = await api.getPosts()
  }
}
```

# Dynamic Directive Arguments

Directive arguments nay chấp nhận cả các biểu thức javaScript động.

```html
<div v-bind:[attr]="value"></div>
<div :[attr]="value"></div>

<button v-on:[event]="handler"></button>
<button @[event]="handler"></button>

<my-component>
  <template v-slot:[slotName]>
    Dynamic slot name
  </template>
</my-component>
```

Mọi chi tiết bạn có thể xem ở mô tả [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0003-dynamic-directive-arguments.md). Quy ước, nếu giá trị truyền vào là `null` thì bindling/listener đó có như bị remove.

> Note to library authors: this feature requires the Vue runtime to be of version 2.6.0 or higher. If you ship pre-compiled components and want to maintain compatibility with versions before 2.6, avoid using this in your source code.

# Code Frame in Compiler Warning Messages
Nhờ vào các [stellar pull request](https://github.com/vuejs/vue/pull/7127) đến từ một người dùng GitHub có tên __@gzzhanghao__, bắt đầu từ bản 2.6, hầu hết việc compile template warning sẽ đi vùng với thông tin dòng code bị lỗi. Điều này cho phép chúng ta tạo ra những warning lỗi trên dòng code một cách trực quan hơn như sau:

![](https://images.viblo.asia/1764b9b1-1533-4f82-a75c-6081bdc9e884.png)

# Explicit Creation of Standalone Reactive Objects
2.6 giới thiệu một global API mới giúp tạo ra một object reactive độc lập:

```js
const reactiveState = Vue.observable({
  count: 0
})
```
Object nhận được có thể được sử dụng trực tiếp trong computed properties hoặc các hàm render, và sẽ được trigger updates khi có sự thay đổi.


# Data Pre-fetching during Server Side Rendering
The new serverPrefetch hook allows any component (instead of just route-level components) to pre-fetch data during server-side rendering, allowing for more flexible usage and reducing the coupling between data fetching and the router. Projects like Nuxt and vue-apollo are already planning to simplify their implementations using this new feature.

# ES Module Build for Direct Import
Previously, our ES Module build is primarily intended for use with bundlers. These builds contain usage of environment variables that are meant to be replaced at compile time. Vue 2.6 now also provides an ES Module build that are intended for direct in-browser usage:

```html
<script type="module">
import Vue from 'https://unpkg.com/vue/dist/vue.esm.browser.js'
  
new Vue({
  // ...
})
</script>
```
# Important Internal Changes
### Reverting nextTick to Microtask
In 2.5.0 we made an internal adjustment that caused nextTickto use Macrotasks instead of Microtasks to queue updates if the update was triggered in a v-on event handler. This was originally intended to fix some browser edge cases, but has in turn led to a number of other issues. In 2.6 we have found a simpler fix for the original issue, which allows us to revert nextTick to consistently use Microtasks in all cases.

If you are interested in more technical details, check it out here.

### Functions on this.$scopedSlots now always return Arrays
(This change only affects render function users.) In render functions, scoped slots are exposed on this.$scopedSlots as functions. Up until now, calling a scoped slot function can return a single VNode or an Array of VNodes based on what the parent component is passing in. This was honestly an oversight as it makes the return value type indeterministic and can lead to unintended edge cases. In 2.6, scoped slot functions are now guaranteed to return either an Array of VNodes or undefined. This may affect some existing code if it is not properly checking for possible Array return values. More details here.

# Shoutouts
Xin cảm ơn các [contributors](https://github.com/vuejs/vue/releases/tag/v2.6.0), những người đã góp nên những pull request trong bản release này, và cộng đồng các member đã tích cực tham gia thảo luận ý kiến trong RFC.

---

Lược dịch từ: https://medium.com/the-vue-point/vue-2-6-released-66aa6c8e785e