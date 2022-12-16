Xin chào mọi người, hôm nay Báu xin phép giới thiệu đến mọi người một kỹ thuật đơn giản nhưng cần thiết trong hầu hết mọi dự án, đó chính là `Debounce action`.

# I. Debounce là gì?
Mình tìm được 1 định nghĩa về `Debounce` cơ bản như sau:

> The Debounce technique allow us to “group” multiple sequential calls in a single one. ([Link CSS-Tricks](https://css-tricks.com/debouncing-throttling-explained-examples/))

`Debounce` là một kỹ thuật cho phép chúng ta `nhóm` những hành động được gọi liên tục thành 1 hành động đơn.

Nghe có vẻ đơn giản nhỉ? Hmm, vậy còn ...

# II. Tại sao lại là `Debounce`?
Bởi vì `Debounce` là 1 cách giúp chúng ta cải thiện UX đối với người dùng và cả `browser performance`.  Đơn cử cho chúng ta chính là việc `click` của `End User`. Đôi khi việc click quá nhanh có thể tạo ra `double action`, chẳng hạn như tạo 2 bài viết, sửa 2 lần, click `dropdown` 2 lần, ... Những việc này đến tốn tài nguyên của `browser`, làm giảm `performance`. 

![](https://images.viblo.asia/e9589e32-4499-4053-a81c-027097fc426d.gif)

# III. Ví dụ `Debounce` với `Button` trong `VueJS`:
## 1. Chuẩn bị:
Mình cài đặt `VUE CLI` cùng với các config cơ bản như sau:
* node-sass.
* babel.
* eslint.

## 2. Ý tưởng:
Mình sẽ có 2 button thực hiện 2 hành động bất kỳ đối với trang web, một button sẽ sử dụng `Debounce`, còn cái còn lại thì giữ nguyên đặc tính cơ bản của `button`.

Về mặt ý tưởng cho `debounce-button`, mình sẽ đơn giản tạo ra 1 hàm chờ trong vòng 1 khoảng thời gian, nếu có bất kỳ `action` nào mới đối với `debounce-button`, chúng ta sẽ làm mới hàm chờ, cho đến khi `user` không còn  tạo thêm hành động, thì lúc này chúng ta mới thực hiện công việc chính mà `debounce-button` gọi đến. 

Trong thực tế, `Debounce` không chỉ được dùng trong `button`, mà còn cho cả `input/search` nữa.

## 3. Coding:
Chúng ta có phần `template`:
```html
<template>
  <div>
    <button @click.prevent="handleClick">
      <slot />
    </button>
    <div>clicked: {{ counter }}</div>
  </div>
</template>
```
Ở đây chúng ta có `.prevent`, đây là `Event Modifiers`, ([Link Document](https://vuejs.org/v2/guide/events.html#Event-Modifiers)). `.prevent` nhằm đảm bảo cho chúng ta rằng khi click vào `button` thì sẽ không bị `reload` trang web. Chúng ta có them `counter`, bạn này sẽ tính cho chúng ta số lần click vào `debounce-button`.

Tiếp theo là phần `script`:
```js
export default {
  name: "Button",
  props: {
    timer: {
      type: Number,
      default: 300
    }
  },
  data: () => ({
    timeOut: null,
    counter: 0
  }),
  methods: {
    handleClick() {
      this.counter += 1;
      clearTimeout(this.timeOut);

      this.timeOut = setTimeout(() => {
        this.$emit("click");
      }, this.timer);
    }
  }
};
```
Chúng ta sẽ truyền vào 1 prop, gọi là `timer`, dành cho khoảng thời gian chờ. Chúng ta có bạn `timeOur`, chính là hàm chờ của chúng ta, sẽ tạo mới khi user click vào `debounce-button`.

Hàm chính của chúng ta là `handleClick`, và flow rất đơn giản: Khi user click vào button, chúng ta sẽ đặt thời gian chờ là `timer-300ms`. Nếu trong khoảng thời gian này, user tác động thêm vào `debounce-button`, `timeOut` sẽ liên tục được làm mới. Và kể từ lần click cuối cùng, chúng ta sẽ thực hiện hành động.
Hãy nhìn qua sản phẩm một chút nhé:

![](https://images.viblo.asia/cf862672-7675-41fa-a1df-c6bd9a84c22d.gif)

Link repos demo: https://github.com/trdbau/debounce-button.

Bài viết của mình đến đây là hết rồi. Cảm ơn mọi người đã đọc bài viết của mình :clap:.