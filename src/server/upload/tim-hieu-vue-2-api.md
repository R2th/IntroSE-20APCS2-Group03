## Giới thiệu 
Dạo này mình đang tìm hiểu về vue 2, để thực hiện dự án. Tiện thể ngồi dịch luôn. 
Bài viết gốc: [Vue2 API](https://vuejs.org/v2/api/)

## Nội dung
### Global Config 
*Vue.config* là một đối tượng thuộc về các cấu hình chung của Vue. Bạn có thể thay đổi các thuộc tính của chúng bằng các **bootrapping** (chỗ này chưa dịch được) tại ứng dụng của bạn. 

#### silent 
- **Type:** *boolean*
- **Default:**  *false*
- **Usage:** 
    ```js
    Vue.config.silent = true;
    ```
 - **Tác dụng:** Sẽ bỏ qua tất cả các bản ghi logs và warning của Vue 
 
 #### optionMergeStrategies 
- **Type:** *{ [key: string]: Function }*
- **Default:**  *{}*
- **Usage:** 
    ```js
   Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
        return child + 1
    }

    const Profile = Vue.extend({
          _my_option: 1
    })

    // Profile.options._my_option = 2
    ```
 - **Tác dụng:** 
    Đưa ra các tùy chỉnh phù hợp nhất đối với các option.
    **optionMergeStrategies** sẽ nhận giá trị từ những option đã được định nghĩa ở các Vue cha, và các vue con được coi là tham số đầu tiên, và tham số thứ hai của **optionMergeStrategies**. Các nội dung của các thể hiện của Vue, được xem là tham số thứ 3. 
- **[Xem thêm](https://vuejs.org/v2/guide/mixins.html#Custom-Option-Merge-Strategies)**
#### devtools
  - **Type:** *boolean**
  - **Default: true** trên môi trường **phát triển** và **false** trong môi trường **production**
  - **Usage:**
    ```js
    // make sure to set this synchronously immediately after loading vVUe
    Vue.config.devtools = true
    ```
#### errorHandler
- **Type:** *Function**
- **Default:** *undefined*
- **Usage:**
```js
    Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
 }
```
Dùng chủ yếu để định nghĩa hành vi với những error **bắt** được 

#### warnHandler
- :warning:  xuất hiện ở phiên bản Vue 2.4.0+
- **Type:** *Function*
- **Default:** *undefined*
- **Usage**
```js
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
}
```
Dùng để mô tả lại cho các Vue warning. Chỉ hoạt động trên môi trường **phát triển (development)**. 

#### ignoredElements 
- **Type:** *Array<string | RegExp>*
- **Default:** []
- **Usage**
```js
    Vue.config.ignoredElements = [
      'my-custom-web-component',
      'another-web-component',
      // Use a `RegExp` to ignore all elements that start with "ion-"
      // 2.5+ only
      /^ion-/
    ]
```
Tùy chọn này sẽ báo cho Vue biết nó sẽ bỏ qua các **custom element** được định nghĩa ngoài Vue. Ngược lại, Vue sẽ tung ra lỗi **Unknown custom element** với nhưng **custom element** chưa được khai báo trong **Vue**. 

#### keyCodes 
- **Type:**  *{ [key: string]: number | Array<number> }*
- **Default:** {}
- **Usage**
```js
    Vue.config.keyCodes = {
      v: 86,
      f1: 112,
      // camelCase won`t work
      mediaPlayPause: 179,
      // instead you can use kebab-case with double quotation marks
      "media-play-pause": 179,
      up: [38, 87]
    }
```
 ```html
    <input type="text" @keyup.media-play-pause="method">
  ```
Định nghĩa các alias cho  **v-on**

#### performance
:warning:  Xuất hiện ở Vue 2.2.0+
- **Type: ***boolean**
- **Default: ** *false* (từ phiên bản Vue 2.2.3+) 
- **Usage:**
Đặt giá trị là **true** trong component init, compile, render để hiển thị performance trên devtool. Chỉ hoạt động trên môi trường development và các trình duyệt hỗ trợ **performance.mark** 

#### productionTip 
:warning:  Xuất hiện từ phiên bản 2.2.0+ 
- **Type:** boolean 
- **Default:** true 
- **Usage:**  Đặt là **false** để ngăn chặn production tip khi Vue khởi động.

### Global API 
#### Vue.extend(options)
- **Tham số**: {Object} options
- **Usage:**
 Tạo một lớp con "subclass** từ hàm khởi tạo base của Vue. Tham số phải là một đối tượng (object) chứa các thành phần của một Vue component . 
 Điều đáng chú ý ở đây, là option **data** của đối tượng tham số phải là một **hàm (function)**. 
 ```js
 // create constructor
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// create an instance of Profile and mount it on an element
new Profile().$mount('#mount-point')
 ```
 Kết quả nhận dược là: 
 ```html
<p>Walter White aka Heisenberg</p>
```

#### Vue.nextTick([callback, content])
- **Tham số**: 
    -  {function} [callback]
    -  {Object} [context]
- **Usage**: 
- Hõan lại việc thực thi function trong callback cho đến khi DOM cập nhật trạng thái. Sử dụng trong trường hợp, khi bạn cập nhật dữ liệu data cho đến khi một DOM html nào đó được cập nhật. 
```js
// modify data
vm.msg = 'Hello'
// DOM not updated yet
Vue.nextTick(function () {
  // DOM updated
})

// usage as a promise (2.1.0+, see note below)
Vue.nextTick()
  .then(function () {
    // DOM updated
  })
```

#### Vue.set(target, key, value)
- **Tham số**
    - {Object | Array} target
    - {string | number| key
    - {any} value
- **Kết quả trả về:** Giá trị được set. 
- **Usage**
Thêm một thuộc tính vào một **reactive** object, và đảm bảo rằng thuộc tính mới này cũng **reactive** khi view được cập nhật. Hàm này phải được dùng, vì nếu gán theo một cách thông thường, Vue sẽ không nhận dạng được sự thêm thuộc tính thông thường. 

### Vue.delete(target, key)
- **Tham số**
    - {Object | Array} target 
    - {string| number) key/index 
- **Usage** Xóa một thuộc tính của một object. Nếu object là **reactive**, đảm bảo rằng xóa trigger update dữ liệu ở view.  Điều này được sử dụng, cũng giống như set, Vue sẽ không nhận dạng được thêm hoặc xóa thuộc tính một cách thông thường đối với các đối tượng **reactive**. 

#### Vue.directive(id, [definition])
- **Tham số:**
    -  {string} id
    -  {Function | Object} [definition]
- **Tham số**
    Đăng ký hoặc nhận một **global directive**
```js
// register
Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})

// register (function directive)
Vue.directive('my-directive', function () {
  // this will be called as `bind` and `update`
})

// getter, return the directive definition if registered
var myDirective = Vue.directive('my-directive')
```

#### Vue.filter(id, [definition])
- **Tham số:**
    -  {string} id
    -  {Function | Object} [definition]
- **Tham số**
    Đăng ký hoặc nhận một **global filter**
```js
// register
Vue.filter('my-filter', function (value) {
  // return processed value
})

// getter, return the filter if registered
var myFilter = Vue.filter('my-filter')
```

#### Vue.component(id, [definition])
- **Tham số:**
    -  {string} id
    -  {Function | Object} [definition]
- **Tham số**
    Đăng ký hoặc nhận một **global component**. Trong quá trình đăng ký, thì tên của component mới sẽ được đặt một cách tự động chính là tham số **id** truyền vào. 
```js
// register an extended constructor
Vue.component('my-component', Vue.extend({ /* ... */ }))

// register an options object (automatically call Vue.extend)
Vue.component('my-component', { /* ... */ })

// retrieve a registered component (always return constructor)
var MyComponent = Vue.component('my-component')
```

#### Vue.use(plugin)
- **Tham số**
    -  {Object | Function} plugin 
- **Usage**
    Cài đặt một Vue.js plugin. Nếu plugin là một Object, thì nó phải có phương thức **install**. Nếu nó là một function,  nó cũng cần có một thứ tương tự như môt phương thức install. 
    Phương thức này phải được gọi trước khi gọi phương thức **new Vue()**
    Khi phương thức này gọi 1 plugin nhiều lần, nó cũng chỉ được cài đặt 1 lần. 

#### Vue.mixin(mixin)
- **Tham số** {Object} mixin 
- **Usage**
Áp dụng một global mixin, và nó ảnh hưởng đến mọi thể hiện của Vue được tạo ra sau đó. Điều này có thể sử dụng bởi tác giả của plugin để cấy ghép vào những hành vi tùy chọn vào trong các components. **Không nên làm điều này trong các ứng dụng**

#### Vue.compile(template)
- **Tham số** {string} template
- **Usage** Biên dịch một template string vào trong một render funtion 
```js 
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```

#### Vue.version 

-**Chi tiết** Cung cấp chính xác phiên bản Vue được sử dụng.

-**Usage**
```js
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```