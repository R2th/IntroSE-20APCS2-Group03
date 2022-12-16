# Tạo một Application Instance
Mỗi ứng dụng Vue bắt đầu bởi việc tạo một application instance bằng hàm createApp
```js
const app = Vue.createApp({
  /* options */
})
```
Application instance này dùng để đăng ký 'globals' sau đó sẽ được component trong ứng dụng sử dụng. 
```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```
Hầu hết các phương thức của application instance đều trả về cùng 1 instance nên bạn có thể gọi theo chuỗi như sau:
```js
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
  ```
  Bạn có thể xem đầy đủ các API của ứng dụng tại đây [https://v3.vuejs.org/api/application-api.html]
  
  # Root component
  Các tùy chọn được truyền vào createApp được dùng để cấu hình root component. Root component là điểm bắt đầu render khi bạn mount ứng dụng.
  Một ứng dụng cần được mount vào các phần tử DOM. Ví dụ, nếu bạn muốn mount một ứng dụng Vue vào `<div id="app"></div>`, bạn sẽ truyền id của thẻ div này vào hàm mount
  ```js
  const RootComponent = {
  /* options */
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```
Hàm mount ko trả về app instance giống các method khác, mà trả về root component instance.
Trong thực tế, các ứng dụng được tổ chức dưới dạng cây component. Ví dụ một cây componet của ứng dụng Todo như sau:
```js
Root Component
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
 ```
 Mỗi component sẽ có instance của riêng nó. Một số component như TodoItem có thể có nhiều instance được render bất cứ lúc nào.
 Root component cũng là một component bình thường, cấu hình và cách hoạt động giống như các component khác.
 
 # Các thuộc tính của component instance
 Trong bài trước, tôi đã giới thiệu với bạn về các thuộc tính data. Các thuộc tính này có thể được truy cập thông qua component instance
 ```js
 const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4
```
Ngoài data, bạn có thể thêm các thuộc tính tự định nghĩa khác vào component instance thông qua các options như methods, props, computed, inject và setup. Tất cả các thuộc tính của component instance sẽ truy cập được trong component template. Vue cũng cung cấp một số thuộc tính có sẵn cho component instance như $attrs và $emit. Những thuộc tính này đều có tiền tố $ để tránh conflict với các thuộc tính người dùng tự định nghĩa.
Tôi sẽ trình bày chi tiết hơn sự khác nhau giữa các options này trong các bài sau nhé.

# Lifecycle Hooks
Mỗi component instance đều trải qua một chuỗi các bước khởi tạo kể từ khi nó được tạo ra. Ví dụ, nó cần thiết lập data observation (để quan sát dữ liệu), biên dịch template, mount instance vào DOM và cập nhật DOM khi dữ liệu thay đổi. Quá trình này được gọi là lifecycle (vòng đời) và các hàm được gọi tương ứng ở từng bước được gọi là các lifecycle hooks. Người dùng có thể chạy code của mình trong từng stage (giai đoạn) cụ thể qua các hàm hook này. 
Ví dụ, hàm created được gọi sau khi instance được tạo ra:
```js
Vue.createApp({
  data() {
    return { count: 1 }
  },
  created() {
    // `this` points to the vm instance
    console.log('count is: ' + this.count) // => "count is: 1"
  }
})
```
Bạn có thể gọi các hooks này với this (trỏ đến instance hiện tại đang gọi nó).


TIP: Không dùng arrow functions với các options hoặc callback, ví dụ `created: () => console.log(this.a)` hay `vm.$watch('a', newValue => this.myMethod())`. Vì arrow function không có con trỏ **this**, **this** sẽ được hiểu như các biến khác và dẫn đến lỗi `Uncaught TypeError: Cannot read property of undefined` hoặc `Uncaught TypeError: this.myMethod is not a function`.

# Biểu đồ Lifecycle
Dưới đây là biểu đồ vòng đời của một instance:
![](https://images.viblo.asia/a24816ed-d1ff-4e8f-87a4-2281966410dd.png)

# Tài liệu tham khảo 
[https://v3.vuejs.org/guide/instance.html#creating-an-application-instance]