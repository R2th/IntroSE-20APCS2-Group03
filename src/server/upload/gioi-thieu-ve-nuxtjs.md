## Nuxtjs là gì?
Đây là một framework của Vuejs được sử dụng để xây dựng những ứng dụng từ Vuejs. Nó có thể dùng để xây dựng một static landing pages hay thậm chí là những ứng dựng phức tạp. Vì vậy trước khi học nuxt.js các bạn nhớ phải tìm hiểu về vuejs trước.

## Một vài tính năng nổi bật trong nuxt.js
* Viết dưới dạng file vue (.vue)
* Tự động split code để load javascript nhanh hơn
* Được áp dụng server side rendering
* Hỗ trợ routing khá dễ dàng
* Hỗ trợ ES6/ES7
* Đóng gói và nén javascript, css
* Quản lý các thẻ ở phần head

## Nuxtjs hoạt động thế nào
Chúng hỗ trợ các thư viện như:
* Vue 2
* Vue-Router
* Vuex (được include chỉ khi bạn sử dụng store)
* Vue Server Renderer
* Vue-meta

## Sơ đồ hoạt động
Khi có request đến server hoặc khi user bấm vào link thông qua `<nuxt-link>` thì nuxt.js sẽ hoạt động theo sơ đồ sau:
    
![](https://images.viblo.asia/1425a0e0-d0a6-416c-b176-86fc5bc6657a.png)

## Cài đặt ứng dụng nuxtjs
Các bạn có thể cài đặt qua `npx`
```
npx create-nuxt-app <project-name>
```
hoặc qua `yarn`
```
yarn create nuxt-app <project-name>
```
Trong quá trình cài đặt nó sẽ hỏi các bạn một vài  câu hỏi để chọn, bạn hãy chọn các thứ bạn cần là được. Cài xong bạn sẽ nhận được một cấu trúc thư mục dạng như thế này
![](https://images.viblo.asia/209570f2-d374-46d9-adf6-f1c1ed53fe7c.png)

Sau khi cài xong các bạn chạy `npm run dev` và mở `localhost:3000` lên để chạy ứng dụng `nuxtjs`
## Tìm hiểu về cấu trúc thư mục
* **Assets**: Chứa các tài nguyên chưa được biên dịch như `Stylus`, `Sass`, `image`, `font`.
* **Components**:  Chứa các components của bạn
    <br>
    Nếu một ứng dụng `vuejs` bình thường thì cấu trúc thư mục của `component` của bạn sẽ như thế này
    ![](https://images.viblo.asia/2c4b50a3-37fa-4ea4-a452-075b52e7b6a4.jpg)
    <br>
    Chúng ta sẽ đặt hết các `components` trong này chứ ? Nhưng đôi khi sẽ gây chút kiểm soát nhầm lẫn, ví dụ người dùng tạo 1 file để dành cho view, hay layouts, thì điều này trong `nuxtjs` đã phân chia khá rõ ràng
    ![](https://images.viblo.asia/55e680ef-628c-4e2c-bbaa-3da6b0293b73.jpg)
    <br>
Đó như các bạn thấy thì mỗi folder sẽ chứa những file `component` riêng, mỗi bản thân chúng chứa những tác dụng khác nhau.
**Layouts**:  Chứa các giao diện cho ứng dụng<br>
**Page**: Chứa các view ứng dụng và đồng thời đầy cũng là cấu trúc routes của chúng ta được sinh ra<br>
**Component**: Chức các `component` có thể tái sử dụng.<br>
Ba thư mục trên cấu hình tạo nên một trang để chúng ta nhìn thấy. Ví dụ như thế này.
![](https://images.viblo.asia/335fb966-e4e2-4015-9ae3-551292e6bdcf.jpg)

* **Middleware**: Chứa Middleware của ứng dụng, middleware cho phép bạn định nghĩa các function được chạy trước khi render 1 page hoặc nhóm page
* **Plugins**: Chứa các javascript plugin
* **Static**: Chứa các file tĩnh như các file ảnh chẳng hạn, được map tự động, ví dụ file `/static/logo.png` sẽ là `yoursite/logo.png`
* **Store**: Chứa các file vuex store
* **File nuxt.config.js**: Chứa các cấu hình được thiết đặt cho ứng dụng của bạn
* **File package.json**: Chứa các dependencies và scripts

## Đôi điều về routing
`Nuxtjs` sẽ tự động sinh ra `route` theo định nghĩa cấu trúc file trong thư mục `pages`.
### Basic route
Ví dụ chúng ta có một cấu trúc thư mục như sau:
```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```
Chúng sẽ tự động generate ra một cấu trúc `route` như sau
```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```
Quá nhanh đúng không nào, thay vì tự định nghĩa viết ra `route` thì thay vào đó chúng ta có thể tự sinh ra route bằng các tạo ra các `folder` vào các `file`. Đây là hình ảnh minh họa 
![](https://images.viblo.asia/08484141-255f-4e4b-b518-f0ab6990c482.png)
Rất hay phải không nào, bắt đầu thấy `nuxtjs` thú vị hơn rồi đấy nhỉ.
### Dynamic Routes
Để thêm tham số cho route, bạn chỉ cần định nghĩa 1 file mới với cách viết ví dụ như `_id`, với `_` là tiền tố đứng trước nhé.
Ví dụ có cấu trúc file như sau:
```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```
Route tương ứng sẽ là
```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```
Để lấy được tham số đó trên url, `nuxtjs` cũng hỗ trợ chúng ta luôn bằng cách sử dụng `$route.params.id` với id là tên file dưới dạng `_id`.<br>
Ngoài ra chúng ta cũng có thể validate tham số trên routes, hay có `nested route`. Các bạn có thể tìm hiểu thêm tại trang chủ của nó. Ở bài viết lần này mình chỉ giới thiệu sơ qua về route để cho các bạn hiểu hơn về `nuxtjs`. Ở bài viết khác mình sẽ nói rõ hơn về các khái niệm trong `nuxtjs`