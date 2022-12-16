#  1. Giới thiệu
Trong của bài viết `Vuejs và những kiến thức cần biết` chúng ta đã tìm hiểu về Vue Instance, Template Synxtax, Methods, Computed, Watcher. Nếu các bạn chưa đọc thì có thể đọc bài viết [tại đây](https://viblo.asia/p/vuejs-va-nhung-kien-thuc-can-biet-p1-ByEZkANg5Q0). Trong phần này chúng ta sẽ tìm hiểu thêm về Vue Component và Mixins trong Vuejs, chúng ta cùng bắt đầu ngay thôi nào.
# 2. Vue Component
Component là một khái niệm quen thuộc nếu các bạn đã từng sử dụng framework khác như Reactjs. Hiểu đơn giản thì component trong Vuejs là một đối tượng có thể được tái sử dụng. Việc tái sử dụng code giúp 
```js
// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```
Sử dụng component `<button-counter>`
```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
Một ứng dụng Vuejs thường được tổ chức theo dạng cây với các component cha và component con.
![image.png](https://images.viblo.asia/c95a99d3-e16a-42c8-a496-bcc536ffbe28.png)

**Component Registration**

Các component muốn sử dụng được thì phải được đăng ký. Có hai cách đăng ký component là toàn cục và cục bộ. Ngoài cách đăng ký thì cũng cần để ý tới quy tắc đặt tên cho component. Bạn có hai lựa chọn cho việc đặt tên compoent là `kebab-case` và `PascalCase`.

* **Global Registration**

Các component sau khi được đăng ký toàn cục thì có thể sử dụng trong template của bất cứ Vue Instance gốc nào. Ngoài ra thì các component con có thể sử dụng lẫn nhau.
```js
Vue.component('my-component-name', {
  // ... options ...
})
new Vue({ el: '#app' })
```
```html
<div id="app">
  <my-component-name></my-component-name>
</div>
```
* **Local Registration**

Đối với các component được đăng ký cục bộ thì khi sử dụng thì phải khai báo trong thuộc tính `components` . 
```js
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
```
```js
new Vue({
  el: '#app'
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

**Props**

Ở trên chúng ta đã nói một ứng dụng Vuejs thường được xây dựng trên các cây component gồm các component cha và component con. Một cây component thì việc nhu cầu truyền dữ liệu từ component cha xuống component con là điều không thể thiếu, và props là công cụ giúp giải quyết vấn đề này. 
```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
```html
<blog-post :title="post.title"></blog-post>
```
Ở trên chúng ta sử dụng một directive là `v-bind` ở dạng rút gọn `:` để truyền dữ liệu xuống component con.

Props nhận vào các kiểu dữ liệu `Object`, `String`, `Number`, `Array`, `Function`, `Boolean`, `Date`, `Symbol` và số lượng props trong một component là không giới hạn. Ngoài kiểu dữ liệu thì khi khai báo props còn có thêm hai option là `requỉed`, `default` và `validattor`.

**Slots**

Slots được sử dụng để tạo ra các khung component, khi đó chúng ta có thể truyền nội dung vào các component tại vị trí của slot. 

```html
<div class="demo-alert-box">
    <strong>Lỗi!</strong>
    <slot></slot>
</div>
```
* **Name Slots**

Đôi khi trong một component có nhiều slot, khi đó chúng ta sẽ không biết nên hiển thị như nào theo đúng ý. Khi đó chúng ta sử dụng thuộc tính `name` cho `slot` Chúng ta có một ví dụ layout như dưới đây: 
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
và để hiển thị đúng vị trí các slot đã được đặt tên thì chúng ta sử dụng thuộc tính `slot` cho các thẻ `template` (có thể sử dụng các thẻ bình thường khác). Ngoài ra thì chúng ta có một vị trí slot chưa được đặt tên, đó là `default slot`, nó dùng để hiển thị các nội dung không ghép được với các slot khác.
```html
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
# 3. Mixins
Mixins là một giải pháp mà Vuejs cung cấp cho chúng ta để có thể tái sử dụng các chức năng cho các component. Một object mixin có thể chứa bất kì những tùy chọn nào của component. Khi một component sử dụng một mixin, tất cả những tùy chọn trong mixin sẽ được “hòa trộn” (mixed) vào trong tùy chọn của component đó.
```js
// define a mixin object
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// define a component that uses this mixin
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

Vậy điều gì xảy ra nếu như cả component và mixin đều chưa các tùy chọn giống nhau? Chúng sẽ được merge lại và có thứ tự ưu tiên riêng cho từng tùy chọn nếu như có sự xung đột. Ví dụ như các tùy chọn `data`, `methods`, `components`, `directives` có xảy ra xung đột thì component sẽ được ưu tiên so với mixins.
```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})
// data => { message: "goodbye", foo: "abc", bar: "def" }
// conflicting() => "from self"

```
Ngoài ra thì còn có các lifecycle hooks trùng tên nhau thì được merge lại với nhau thành một mảng và được gọi theo thứ tự mixins ưu tiên trước component.
```js
var mixin = {
  created: function () {
    console.log('mixin hook called')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('component hook called')
  }
})

// => "mixin hook called"
// => "component hook called"
```
# 4. Tổng kết
Trong bài này chúng ta đã tìm hiểu thêm về component và mixins trong Vuejs và cũng là phần cuối về chủ đề tìm hiểu Vuejs cơ bản. Mong nó có thể đem lại thêm phần nào kiến thức cho các bạn. Cảm ơn các bạn đã theo dõi. Hẹn gặp lại các bạn trong bài viết tiếp theo.