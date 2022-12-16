Nói qua một chút về Vuejs thì đây là một framework của Javascript dùng để xây dựng giao diện người dùng. Với Vuejs thì với nhu cầu như xây dựng một Single Page Applications là vô cùng thích hợp. Ở bài viết lần này thì mình xin giới thiệu với các bạn một vài những kiến thức mà mình nghĩ là sẽ phù hợp với những người mới tìm hiểu về framework này.
<br>
### Khởi tạo dự án mới với vuejs
Trước tiên thì chúng ta cần tạo một project vue, để cài được vuejs trên máy tính bạn cần chuẩn bị trước `npm` hoặc `yarn` (đây là công cụ để quản lý các thư viện javascript cho nodejs) và cũng cần cài `nodejs` cho máy nữa. Để kiểm tra đã cài đặt chưa
```
$ nodejs -v
v12.13.1
$ npm -v
6.12.1
```
Tiếp theo là cái `vue cli` đây là công cụ dòng lệnh (CLI – Command Line Interface), nó giúp chúng ta xây dựng các template một cách nhanh chóng, ví dụ với `PHP` thì chúng ta có `artisan` còn với `Vuejs` thì chúng ta có `Vue cli`. Chúng ta có thể cài đặt thông qua `npm` hoặc là `yarn`
```
npm install -g @vue/cli
# hoặc
yarn global add @vue/cli
```
Để kiểm tra đã cài đặt thành công hay chưa bằng cách gõ lệnh
```
$ vue --version
@vue/cli 4.3.1
```
Để khởi tạo một project `Vuejs`
```
vue init webpack ten_project
# ví dụ
vue init webpack vue-example
```
Ok giờ chúng ta chạy thử chương trình lên bằng cách
```
npm run dev
```
![](https://images.viblo.asia/85be33a6-e52a-4108-a873-423279b7cdcc.png)
<br>
Truy cập vào [http://localhost:8080/#/](http://localhost:8080/#/) để xem chương trình đã chạy chưa nhé.
Nếu chạy ra như thế này là bạn đã khởi tạo thành công project với `vue` rồi đó.  
### Cấu trúc thư mục
Giới thiệu qua một chút về cấu trúc thư mục của một dự án `Vuejs`.

**node_modules**:  Đây là thư mục chứa tất cả các thư viện cần để xây dựng Vue.

**public**: Đây là thư mục chứa các `static assets` mà bạn không muốn chạy thông qua webpack

**index.html**: Với ứng dụng SPA (Single Page Application) thì có 1 trang duy nhất. Sau đó, nội dung của trang bị thay đổi mà không phải tải lại trang, thì đây chính là trang duy nhất đó.

**src:** Đây là thư mục chứa mã nguồn của dự án. Bên trong đó gồm các folder 
* **assets**: Đây là nơi mà bạn sẽ làm việc với Webpack
* **components**: Đây là thư mục chứa các UI components của dự án
* **router**: Đây là nơi sẽ viết các routes và kết nối chúng với Components
* **App.vue**: Đây là entry point component. Là nơi sẽ khởi tạo tất cả các component khác. Hiểu nôm na là tệp chính của dự án.
* **main.js**: Entry point file để mount App.vue. Đây chính là file render ra `App.vue` component.
<br>
### Single File Components
Mặc định thì dự án `Vue` sẽ chạy vào `App.vue` và gọi đến `src/components/HelloWorld.vue` do `router` định nghĩa ở `src/router/index.js`, chúng ta viết lại ngắn gọn một chút file `HelloWorld.vue` như sau
```html
<template>
  <div id="binding-data">
    Welcome to Your Vue.js App
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```
Đây là cấu trúc thường thấy của một component. Các bạn để ý ở đây sẽ có 3 phần riêng biệt đó là `template`, `script` và `style`, các phần này tạo nên một file components, `template` để chúng ta tạo giao diện, `script` để xử lí các logic, `style` để định dạng css. Ba khối riêng biệt tạo nên một component gắn kết và dễ duy trì.
> **Chú ý**: Trong Vue yêu cầu tất cả các dữ liệu trong thẻ `<template>` phải được để tất cả ở trong một thẻ gọi là root element của component. Nếu cố tình không để trong root element sẽ lập tức báo lỗi.

VÍ dụ:
```html
<template>
    This is my first component
</template>
```
kết quả sẽ báo lỗi ở console là `Component template requires a root element, rather than just text.`
###  Binding data 
Như ở ví dụ trên chúng ta sẽ viết trực tiếp đoạn text `Xin chào tất cả mọi người` ở trong `template`, thì chúng ta còn một cách gọi khác như sau
```html
<template>
  <div id="binding-data">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```
Thay vì viết toàn bộ đoạn text ra thì ở đây chúng ta sẽ sử dụng một biến là `msg` đặt trong `data` với kiểu dữ liệu là `key-value` với `key` tương ứng là `msg` còn `value` là gía trị mà chúng ta muốn in ra. Để in giá trị của `msg` trong `template` ta chỉ cần sử dụng `{{}}` để in giá trị của biến này ra. Sau này các dữ liệu như thế này sẽ đều để trong `data` hết nhé các bạn.
<br>
Bên cạnh đó bạn cũng có thể sử dụng `javascript expression` trong `{{}}`. Ví dụ như là
```javascript
{{ ok ? 'YES' : 'NO' }}
# hoặc
{{ message.split('').reverse().join('') }}
```
### Directive
Đây là một câu lệnh để chèn vào các phần tử trong DOM. Cú pháp của nó được bắt đầu bằng từ khóa `v-`. Ví dụ, như đoạn code ở trên cũng là in ra câu `Welcome to Your Vue.js App`, thì ta cũng có thể dùng `directive` để in ra bằng `v-text`.
```html
<template>
  <div id="binding-data">
    <p v-text="msg"></p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```
Nó cũng sẽ in ra kết quả giống như là khi bạn sử dụng `{{}}` để in ra.
<br>
> 
> Có 2 loại directive mà chúng ta có thể chia ra:
> * Data Directive – chuyên để xử lý data.
> * Event Directive – chuyên để bắt các sự kiện của element.
<br>
#### Data Directive ####
Hoặc là chúng ta cũng có thể muốn in một giá trị tùy thuộc vào điều kiện thì chúng ta có thể sử dụng `v-if`
```html
<template>
  <div id="binding-data">
    <p v-if="seen">{{msg}}</p>
    <p v-else>{{nodata}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      seen: true,
      nodata: 'No data'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```
Trong trường hợp này chúng ta sẽ in ra `msg` nếu `seen` là `true`. ngược lại với `v-if` thì sẽ có `v-else`. Nếu `seen` là `false` thì `msg` sẽ không được in ra thay vào đó là `nodata` sẽ được in ra. Tương tự chúng ta cũng có `v-else-if`.
<br> 
Gần giống với `v-if` thì chúng ta còn có `v-show`.
```html
<template>
  <div id="binding-data">
    <p v-show="seen == true">{{msg}}</p>
    <p v-show="seen == false">{{nodata}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      seen: false,
      nodata: 'No data'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```
Kết quả vẫn ra giống `v-if`, vậy sự khác nhau ở đây là gì
<br>
**So sánh v-if và v-show**
Với `v-if` thì khi chúng ta inspect HTML lên thì tương ứng với điều kiện nào xảy ra thì sẽ xuất hiện element đó.
<br>
Còn với `v-show` khi chúng ta inspect HTML lên thì chúng ta sẽ thấy element của điều kiện còn lại vẫn xuất hiện những được css dấu đi với style là `display:none`
<br>
=> `v-if` sẽ kiểm tra điều kiện rồi từ đó sẽ xác nhận là sẽ render ra hay không còn `v-show` sẽ render ra hết rồi sẽ tùy thuộc vào điều kiện rồi cho nó ẩn đi hay không.

#### Event Directive ####
Giả sử khi chúng ta muốn click vào button mà khiến nội dung của `msg` thay đổi thì ta có thể là như sau
```html
<template>
  <div id="binding-data">
    <p>{{msg}}</p>
    <button v-on:click="clickMe()">Clickme</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    clickMe() {
      this.msg = "You change the text"
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```
Bạn chạy thử chương trình và sẽ thấy đoạn text được thay đổi giá trị. Khi bạn click vào button nó sẽ gọi đến một `method` với tên hàm là `clickMe` ở trong `script`. Mình sẽ giới thiệu luôn với các bạn `method` trong `Vuejs` luôn bây giờ
### Methods
Đúng với tên gọi của nó thì `methods` là danh sách các phương thức của component, nó sẽ được gọi tới với một nhiệm vụ nào đó trong component của bạn. Phương thức ở đây có thể truyền vào các biến hoặc không truyền. Cách để khai báo một `method`
```
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    clickMe() {
      this.msg = "You change the text"
    }
  }
}
</script>
```
Lưu ý ở đây là các bạn sẽ ghi là `methods` chứ không phải `method` vì trong `methods` này có thể chứa nhiều các phương thức. Cùng làm thử một ví dụ khác nhé. À quên bạn cũng có thể in ra phương thức trong `{{}}` khi mà bạn `return` một giá trị nào đó. Ví dụ 
```html
<template>
  <div id="binding-data">
    <p>{{clickMe()}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    clickMe() {
      return this.msg.toUpperCase();
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```
Chạy chương trình lên bạn sẽ nhận được giá trị là `WELCOME TO YOUR VUE.JS APP`. Nếu trong phương thức của bạn không `return` về một giá trị nào đó thì bạn sẽ không nhận được một giá trị nào được in ra trên màn hình nhưng các xử lí trong hàm vẫn chạy bình thường.
<br>
Có một cách viết ngắn gọn hơn về `event directive` ví dụ như với `v-on:click` ta có thể viết ngắn gọn lại là `@click` như sau
```html
 <button @click="clickMe()">Clickme</button>
```
Ngoài ra cũng có rất nhiều các `directive` cũng như các cú pháp viết tắt các bạn có thể tìm hiểu thêm ở trang chủ của vue tại [đây](https://vuejs.org/v2/guide/). Ở phần tiếp theo mình sẽ tiếp tục giới thiệu cho các bạn những kiến thức mà mình nghĩ sẽ cần đối với các newbie.
<br>
Cảm ơn các bạn đã đón đọc.
### Update: hiện đã có link phần 2 mọi người theo dõi nhé [xem tại đây](https://viblo.asia/p/vuejs-va-nhung-kien-thuc-cho-nguoi-moi-bat-daup2-GrLZD3Y3Kk0)