Như chúng ta đã biết VueJs là một framework linh động dung để xây dựng giao diện người dùng rất phổ biến hiện nay.
# Single-page Application (SPA) là gì?
> A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application. In an SPA, either all necessary code – HTML, JavaScript, and CSS – is retrieved with a single page load,[1] or the appropriate resources are dynamically loaded and added to the page as necessary, usually in response to user actions. The page does not reload at any point in the process, nor does control transfer to another page, although the location hash or the HTML5 History API can be used to provide the perception and navigability of separate logical pages in the application.[2] Interaction with the single page application often involves dynamic communication with the web server behind the scenes.

Đây là định nghĩ trên wiki. Hiểu nôm na thì SPA là:

Single page Application là một ứng dụng web giúp nâng cao trải nghiệm người dùng. Trong một SPA, tất cả các mã cần thiết - HTML, JavaScript và CSS - được truy xuất với một lần tải trang. Các tài nguyên thích hợp được tải động và thêm vào trang khi cần, thường là để đáp ứng với hành động của người dùng. Trang không tải lại tại bất kỳ điểm nào trong quy trình, cũng như không chuyển sang trang khác. 

Mục tiêu của bài đăng này là chỉ ra một cách để thực hiện phân chia này và cách tải từng tệp bất đồng bộ, chỉ khi component được yêu cầu thay đổi từ client. Hành vi bất đồng bộ này được gọi là `lazy loading`.

# Create Project
Chúng ta sẽ sử dụng vue-cli 3 để tạo một project mới như sau
```js
vue create spa-app
...
Vue CLI v3.0.0-beta.9
? Please pick a preset: Manually select features
? Check the features needed for your project:
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 ( ) Vuex
 ( ) CSS Pre-processors
>(*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

Project được tạo có hai views: Home.vue và About.vue. Khi chúng ta chạy dự án, thông qua lệnh `yarn serve` hoặc `npm run serve`, các views được truy cập thông qua menu trên cùng, tương tự như hình dưới đây:
![](https://images.viblo.asia/ab44aa4d-22da-43e5-b421-0748bb7e8ef3.gif)

Hai file này, Home.vue và About.vue, được load khi ứng dụng khởi chạy. Đối với một project nhiều component, nó thường không thể tải tất cả các file cùng một lúc. Chúng ta cần tải các file theo yêu cầu.

Chúng ta có thể thực hiện `lazy loading` một cách dễ dàng, nhờ một tính năng mới JavaScript,  `dynamic imports`, `webpack`. Hiện tại, tệp `src/router.js` có code như sau:
```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
```
Chúng ta sẽ sửa `src/router.js` như sau:
```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home')
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About')
    }
  ]
})
```

Ở đây có vài thay đổi như sau:

1. Chúng ta bỏ việc import tĩnh 2 component là home và about
2. Tạo function `loadView`, sử dụng nó để nhập động một component nào đó.
3. Trong function `loadView`, chúng ta sử dụng `/ * webpackChunkName: "view- [request]" * /` để đánh dấu tên của từng tệp sẽ được nhập động.
4. Trong routes sử dụng function loadView để truyền tên component.

Bằng cách này chúng ta chạy project bằng npm run build hoặc yarn build sẽ cho ra kết quả ![](https://images.viblo.asia/cf854342-5452-4985-9663-34c3e5918d4f.png)
Lưu ý hai file `view-Home-vue...` và `view-About-vue...` Sẽ load theo yêu cầu trên server.
![](https://images.viblo.asia/33cf02a3-c955-4f1c-bdb4-80d4f3f6c79c.gif)

Như chúng ta thấy việc sử dụng vue-route và vue-cli để lazy loading rất đơn giản phải không nào.

# Tài liệu tham khảo
https://viblo.asia/p/single-page-application-concept-LzD5dDvo5jY

https://en.wikipedia.org/wiki/Single-page_application

https://alligator.io/vuejs/lazy-loading-vue-cli-3-webpack/