### Giới thiệu
Mình nghĩ các bạn ở đây chắc chắn đã nghe hai thuật ngữ này ít nhất một lần  **"code splitting"** và  **"lazy loading"**. Hãy cùng ngó qua để xem webpack định nghĩa các thuật ngữ này như thế nào:
> Lazy, or “on demand”, loading is a great way to optimize your site or application. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.
> 
Tạm dịch là 
> Tải chậm, hay "tải phụ thuộc", là một cách tuyệt vời để tối ưu hóa trang web hoặc ứng dụng của bạn. Hai phuong pháp này về cơ bản liên quan đến việc chia code của bạn tại các điểm dừng logic, và sau đó tải nó sau khi người dùng đã thực hiện một cái gì đó yêu cầu hoặc sẽ yêu cầu một khối code mới. Điều này làm tăng tốc độ tải ban đầu của ứng dụng và làm nhẹ trọng lượng tổng thể của nó vì một số khối code thậm chí có thể không bao giờ được tải.
> 
#### Coding
Bất cứ khi nào có thể mình khuyên các bạn nên sử dụng dynamic imports. Component sẽ tải theo kiểu lazy load (bởi webpack) khi cần thiết.

```js
// Thay vì như này
import MyComponent from "~/components/MyComponent.js";

// Hãy import theo cách này
const MyComponent = () => import("~/components/MyComponent.js");
```
#### Giải thích
Khi sử dụng Webpack để đóng gói ứng dụng của bạn, bạn có thể sử dụng các cách khác nhau để làm việc với các module (ES Modules, CJS, AMD...). Nếu bạn chọn cách ESM (được khuyến nghị), bạn sẽ có loại cú pháp này:
```js
import MyComponent from "~/components/MyComponent.js";
```
#### Use cases
Các trường hợp có thể áp dụng
1. Lazy load trong component

```js 
//import
Vue.component("AsyncCmp", () => import("./AsyncCmp"));

//And using local registration
new Vue({
  // ...
  components: {
    AsyncCmp: () => import("./AsyncCmp")
  }
});
```
Bằng cách đưa import vào arrow function, Vue sẽ load component này khi được yêu cầu, vào thời điểm đó.

Nếu component được import có sử dụng named export, bạn có thể sử dụng object trả về từ Promise. Ví dụ với component UiAlert
```js
...
components: {
  UiAlert: () => import('keen-ui').then(({ UiAlert }) => UiAlert)
}
...
```
2. Lazy load trong Vue router

Vue router được tích hợp sẵn lazy loading
```js
// Instead of: import Login from './login'
const Login = () => import("./login");

new VueRouter({
  routes: [{ path: "/login", component: Login }]
});
```
3. Lazy load trong Vuex module

Vuex có một phương thức ```registerModule``` cho phép chúng ta tự động tạo các module Vuex. Nếu import trả về một Promise với tham số là ES Module thì chúng ta có thể dùng lazy load
```js
const store = new Vuex.Store()

...

// Assume there is a "login" module we wanna load
import('./store/login').then(loginModule => {
  store.registerModule('login', loginModule)
})
```
#### Kết quả
![](https://images.viblo.asia/8b045156-7235-4799-8bca-e4bcc9c1da2f.png)

#### Tài liệu tham khảo
https://vuedose.tips/tips/dynamic-imports-in-vue-js-for-better-performance/

Chúc các bạn thành công. Happy coding and peace out :v: