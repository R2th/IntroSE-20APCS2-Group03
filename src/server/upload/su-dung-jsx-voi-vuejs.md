### 1. JSX?
JSX là một phần mở rộng phổ biến cho JavaScript cho phép mã thông báo XML trong các tập lệnh của bạn.

VD: 
```js
const element = <h1>Hello, world!</h1>;
```
Cú pháp thẻ này không phải là một chuỗi hay là HTML, nó được gọi là JSX. Facebook sử dụng JSX để biểu thị UI components
> JSX = Javascript + XML

Nếu bạn muốn tạo các mẫu trong các tệp tập lệnh của mình và bạn thấy `render()`chức năng của Vue khó hoạt động, thì JSX có thể là thứ bạn cần.

VD:  đây là một hàm `render()` mà không có JSX:
```JS
render (h) {
  return h(
    'div',
    { attrs: { id: 'my-id' },
    [ this.msg ]
  );
}
```
 và với JSX:
```JS
 render (h) {
  return (
    <div id='my-id'>,
      { this.msg }
    </div>
  );
}
```
Dễ hơn nhiều đúng không :D

Tất nhiên,  trình duyệt không thể hiểu được JSX. Đầu tiên nó phải được dịch mã thành JavaScript tiêu chuẩn, tương tự như cách SASS trước tiên cần được dịch sang CSS
### 2. Tại sao nên sử dụng JSX với Vue?
Có nhiều cách để chỉ định một template trong Vue:

a. Sử dụng tệp HTML

b. Sử dụng một templatethuộc tính trong trình xây dựng cá thể / thành phần của bạn

c. Sử dụng `<template>` thẻ trong các thành phần tệp đơn
    
d. Sử dụng render.
    
Nếu bạn đi với tùy chọn cuối, bạn phải tạo các nút của mình theo một cách rất lạ, tức là sử dụng `createElement` cú pháp JavaScript.
    
JSX cho phép bạn sử dụng chức năng render và vẫn có giao diện của HTML. Một số người thấy điều này dễ dàng hơn nhiều. Những người khác thấy thật tệ khi dùng HTML với JS của họ.
    
Hãy xem ví dụ này và bạn có thể quyết định xem bạn có thích nó hay không:

### Ví dụ về JSX
Bây giờ chúng ta sẽ tạo một ứng dụng đơn giản, hiển thị một thông báo với nội dung văn bản. Khi bạn click vào thẻ nó sẽ đưa ra một thông báo.

**Đầu tiên, hãy sử dụng Vue theo cách thông thường với các tệp JS và HTML riêng biệt:**

*vue.js*
```js
new Vue({
  el: '#app',
  data: {
    msg: 'Show the message'
  },
  methods: {
    hello () {
      alert('Here is the message')
    }
  }
});
```
*index.html*
```html
<div id="app">
  <span class="my-class" v-on:click="hello">
    {{ msg }}
  </span>
</div>
```
**Kết hợp với render:**

*vue.js*
```js
new Vue({
  el: '#app',
  data: {
    msg: 'Show the message'
  },
  methods: {
    hello () {
      alert('Here is the message')
    }
  },
  render (createElement) {
    return createElement(
      'span',
      {
        class: { 'my-class': true },
        on: {
          click: this.hello
        }
      },
      [ this.msg ]
    );
  },
});
```
*index.js*
```html
<div id="app">
  <!--span will render here-->
</div>
```
**Kết hợp JSX**

Chức năng render hơi khó đọc, phải không? Và đó chỉ là một thẻ `<span>` bình thường, hãy tưởng tượng sử dụng nó cho một thành phần phức tạp hơn!

Sử dụng JSX thôi: 

*vue.js*
```js
new Vue({
  el: '#app',
  data: {
    msg: 'Show the message.'
  },
  methods: {
    hello () {
      alert('This is the message.')
    }
  },
  render(h) {
    return (
      <span class={{ 'my-class': true }} on-click={ this.hello } >
        { this.msg }
      </span>
    )
  }
});
```
*index.html*
```html
<div id="app">
  <!--span will render here-->
</div>
```
### 3. Transpiling JSX
JSX chỉ để phát triển và sẽ được transpiled từ lâu trước khi chạy. Vì vậy, chúng ta chỉ cần xem xét JSX về cách nó mang lại lợi ích cho chúng ta (hoặc không).

Để transpiled JSX của bạn, bạn có thể sử dụng` babel-plugin-transform-vue-jsx` module là plugin cho Babel và Webpack. Chỉ cần thêm nó vào cấu hình Webpack của bạn:
```js
{
  test: /\.js$/,
  exclude: [/node_modules/],
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015'], plugins: ['transform-vue-jsx'] }
  }]
}
```
Bây giờ, khi bạn thực hiện xây dựng gói webpack, JSX của bạn sẽ được transpiled thành mã chuẩn.

### Tài liệu tham khảo:
1. https://vi.vuejs.org/v2/guide/render-function.html
2. https://medium.com/js-dojo/using-jsx-with-vue-js-846f4fbbf07f
3. https://github.com/vuejs/babel-plugin-transform-vue-jsx