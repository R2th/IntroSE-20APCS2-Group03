# Lời mở đầu
Series Nuxt Js này mình tạo ra để tổng hợp các bài viết về Nuxt js mà mình đã tìm hiểu qua và thấy hay, và những gì mà mình tìm hiểu được. Mục đích phục vụ bản thân ghi nhớ và lục lại kiến thức , mong là nó có thể mang lại giá trị nào đó cho các bạn đọc ( Đừng spam mình nhá !!! :laughing::laughing::laughing:  Series đang trong quá trình hoàn thiện )
## 1. Tổng quan về NuxtJs
### Nuxt js là gì ?
*  Nuxt được xậy dựng trên nền là Vue js
*  Cho phép tạo Universal Vue Apps
*  Thiết lập sẵn file, cấu trúc thư mục
*  Giúp quá trình phát triển dễ dàng

*(Trước khi tìm hiểu về Nuxt js chúng ta cần biết đến khái niệm về [CSR và SSR](https://viblo.asia/p/tim-hieu-co-ban-ve-nuxtjs-naQZR9m0Kvx#csr-va-ssr-2). Khi tạo 1 project của Nuxt js chúng ta có hai tùy chỉnh là CSR hay SSR, series này mình sẽ viết về SSR của nuxt js nhé.)*
### Nuxt.js được cài đặt bao gồm một số công cụ sau
* [Vue 2](https://vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [Vuex (được cài đặt khi sử dụng store)](https://vuex.vuejs.org/guide/)
* Vue Server Renderer (sẽ được loại trừ nếu khi cài đặt bạn lựa chọn mode: 'spa')
* Vue Meta

theo như trang chủ của Nuxt.js thông báo thì tổng cộng dung lượng của tất cả những gói trên chỉ là 57kB (nếu có thêm Vuex thì sẽ lên "tận" 60kB), cực kì nhỏ gọn phải không nào!

## 2. Khởi tạo một project NuxtJs
- Khởi tạo 1 project Nuxt Js
```markdown
chúng ta có 3 cách để tạo 1 project NuxtJs như sau:
yarn create nuxt-app <project-name>
npx create-nuxt-app <project-name> (npx được cài đặt kèm với NPM từ phiên bản 5.2.0)
npm init nuxt-app <project-name>
```
- Khởi chạy dự án 
```php
install dependencies
$ npm install
serve with hot reload at localhost:3000
$ npm run dev
build for production and launch server
$ npm run build
```
## 3. Cấu trúc thư mục và chức năng cần chú ý
### Cấu trúc thư mục của project NuxtJs :
(* Ở đây mình có cài thêm ui là tailwind trong lúc khởi tạo dự án )
![](https://images.viblo.asia/543335f3-fbe1-4bc3-9adf-23b4eb5c7c91.PNG)
### Chức năng :
* **Routing** : Nuxt.js đã bao gồm vue-router nên nó sẽ tự động sinh ra các router dựa trên cấu trúc thư mục pages trong project. Tức là bạn sẽ không cần phải khai báo router mà chỉ cần đặt tên file, cấu trúc thư mục theo 1 quy tắc nhất định thì sẽ tự động sinh ra router.( Khi bạn chạy run build dự án sẽ sinh ra thư mục .nuxt. Nó là nơi mà .nuxt/route.js sẽ tự được bind 1 cách tự động) 
    - **Basic route:** 
       ```
             pages/
            --| user/
            -----| index.vue
            -----| one.vue
            --| index.vue
        ```
        sẽ tự động sinh ra khai báo router như sau:
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
     - Còn đối với Dynamic Route (tức là có truyền tham số vào router ví dụ như id, hashId) thì bạn chỉ cần đặt tên folder hoặc tên file bắt đầu bằng dấu _, ví dụ như là _id.vue hoặc _hashId.vue
         ```
         pages/
        --| users/
        -----| _id.vue
        --| index.vue
         ```
         thì sẽ tự động sinh ra khai báo router như sau:

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
          ]
        }
         ```

         Chúng ta có thể validate biến truyền vào bằng cách đặt validate trong đoạn script trong flie luôn
        ```
        export default {
          validate ({ params }) {
            // Must be a number
            return /^\d+$/.test(params.id)
          }
        }
        ```

* **View**: 
Layout: layout là một khung bố cục chung cho các trang gần giống nhau (ví dụ như các trang thuộc phần quản trị của admin sẽ dùng chung 1 layout). Để sử dụng layout cho một page, bạn chỉ cần khai báo trong flie vue
    ```
    <script>
         export default {
           layout: 'LayoutName'
         }
    </script>
    ```

* **Pages**: được đặt trong thư mục pages, Nuxt.js sẽ đọc tất cả các file .vue và dựa theo cấu trúc thư mục này để sinh ra các route tương ứng với các trang của bạn. Và ở trong page, Nuxt.js cung cấp thêm một số attributes và functions đặc biệt để hỗ trợ cho công việc phát triển. Điển hình như:

   - head: chỉ định các <meta> tags cho page để hỗ trợ cho việc SEO.
    asyncData: xử lý bất đồng bộ để nhận dữ liệu sử dụng cho page.
   - fetch: tương tự với asyncData, trừ việc nó sẽ không set component data.
   - validate: validate tham số được truyền vào trong dynamic route đã nói ở phần trên.
   -  middleware: khai báo middleware để giới hạn xem user/guest có thể xem được trang. Và nó sẽ được gọi trước khi trang được render ra.

* **Vuex**: được coi là kho lưu chữ chung của toàn bộ dự án . (có dịp mk sẽ tạo 1 series về vuex :D)

bài tới mình sẽ đi sau vào chi tiết từng chức năng của từng folder nhé. cảm ơn mọi người