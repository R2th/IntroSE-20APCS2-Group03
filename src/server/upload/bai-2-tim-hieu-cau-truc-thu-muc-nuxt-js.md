## 1.Assets
* Thư mục assets, đúng như với tên của nó. Assets chứa các nội dung un-compiled của bạn, chẳng hạn như JavaScript, SCSS và images. Nuxt.js sử dụng webpack để xử lý và compile các nội dung này.
    ```
    <template>
      <img src="~/assets/your_image.png" />
    </template>
    
    background: url('~assets/banner.svg');

    khi ta dùng cho 1 ảnh động thì phải dùng cú pháp : 
    
    <img :src="require(`~/assets/img/${image}.jpg`)" />
    ```
    
## 2.Components
- Tương tự như component mặc định của Vue js.
-  Các components là các bit code độc lập và có thể tái sử dụng. Để nhập một component được lưu dưới dạng BarChart (tức là **components/BarChart.vue**) và sau đó gọi nó bằng tên BarChart trong một page (tức là  **pages/posts.vue**  ), bạn viết như này:
    ```
    import BarChart from "~/components/BarChart";

    export default {
        components: { 
            BarChart
        },
    }
    ```
- Lưu ý rằng các thành phần trong thư mục này không có quyền truy cập vào **asyncData**
- 
## 3.Layouts 
- Layouts được sử dụng để thay đổi giao diện ứng dụng của bạn. Một ứng dụng có thể có nhiều layouts ví dụ: admin layout, guest layout và registered clients layout. Các bố cục này sẽ được sử dụng lại trong các trang khác nhau để xử lý giao diện của chúng (sidebar, menu, footer, v.v.). Trong khi cài đặt, Nuxt CLI cung cấp mặc định **layouts/default.vue** layout và được sử dụng trong tất cả các trang.
- Mỗi dự án được tạo Nuxt có một file default.vue trong thư mục layouts, với cấu trúc mẫu tối thiểu sau:
    ```
    <template>
      <nuxt/>
    </template>
    ```
- Thành phần </nuxt> rất quan trọng vì nó hiển thị các thành phần trang, tức là các file .vue của bạn từ thư mục pages.
- Tất nhiên, bạn cũng có thể tạo layout tùy chỉnh của riêng mình, bao gồm cả trang lỗi. Do đó, để sử dụng một instance layout có tên là admin (**layouts/admin.vue**) tại một page post (**pages/posts.vue**) , bạn sẽ viết:
    ```
    <template>
      <!-- Your template -->
    </template>

    <script>
    export default {
      layout: 'admin'
      // page component definitions
    }
    </script>
    ```
    
## 4.Middleware 
* Middleware về cơ bản, nó chứa các hàm JavaScript tùy chỉnh chạy ngay trước khi một trang hoặc nhóm trang được hiển thị. Ví dụ: Hãy tưởng tượng bạn muốn kiểm tra xem người dùng có thông tin đăng nhập phù hợp để truy cập một trang hay không. Trong trường hợp này, bạn có thể có thể tạo một file có tên ***middleware/auth.js*** chứa đoạn code bên dưới.
    ```
    export default function({ store }) {
      // some code to check user authentication
    }
    ```
- Tuy nhiên, nếu chỉ tạo một chức năng tùy chỉnh trong thư mục middleware sẽ không có tác dụng gì. Bạn phải cho Nuxt.js biết nơi mà bạn muốn áp dụng nó, nghĩa là trên tất cả các trang hoặc một vài trang được chọn hoặc một trang duy nhất.
- Từ đây, bạn có thể sử dụng chúng theo những cách sau:
    - Global middleware - (Thông qua file cấu hình Nuxt và ảnh hưởng đến tất cả các route) 
    ```
    // nuxt.config.js 
    export default {
      router: {
        middleware: 'auth'
      }
    }
    ```
 - Layout middleware (Thông qua layouts và ảnh hưởng đến nhóm các route tương ứng, tức là các trang sử dụng layouts đó chỉ được xem và truy cập bởi người dùng đã xác thực)
     ```
     // layouts/default.vue
    export default { 
      middleware: 'authenticated-basic-plan-user' 
    }
     ```
- Page middleware (Thông qua từng page và ảnh hưởng trên route gọi đến page đó) 
    ```
    // pages/index.vue
    export default { 
      middleware: 'subscribed'
    }
    ```
    
## 5.Pages 
- Có thể nói đây là một trong những thư mục quan trọng nhất của Nuxt, vì nó sẽ tự động tạo các route bất kỳ theo từng file .vue trong đó. Thư mục pages chứa các Views và Routers cho ứng dụng của bạn. Nó sẽ mô tả tất cả những gì bạn cần để cấu hình dữ liệu và view cho một route cụ thể trong ứng dụng của bạn App Template, Layouts, Pages and HTML Head).

- Tất cả các file .vue trong thư mục này đều cung cấp các tùy chọn như asyncData, layout, middleware, auth, fetch, head, validate, scrollToTop là tất cả những gì bạn cần để cấu hình dữ liệu và view cho bất kỳ route nào.

- Đặc biệt, mặc định Nuxt CLI tạo ra file pages/index.vue và nó đóng vai trò là trang chủ của ứng dụng (trang index). Với sức mạnh này thì nó có thể tạo ra các URL thân thiện với SEO.

- VD : 
    - http://localhost:3000/users -> sẽ vào file index.vue trong folder users
    - http://localhost:3000/users/1 -> sẽ vào file  _id.vue  trong folder users 
     
         ![](https://images.viblo.asia/f3f805a1-a6ef-4eb2-8d9a-07e900c50374.PNG)
        ```
        <template>
          <div><h1>{{ this.slug }}</h1></div>
        </template>

        <script>
        export default {
            async asyncData({ params }) {
              const slug = params.id // When calling /abc the slug will be "abc"
              return { slug }
            }
        }
        </script>
        ```
        
    - http://localhost:3000/posts -> sẽ vào file index.vue trong folder posts
    - http://localhost:3000/posts/1 -> sẽ vào file _book.vue trong folder posts 
    -  http://localhost:3000/posts/1/2 -> sẽ vào file _book.vue trong folder posts 
    
       ![](https://images.viblo.asia/4d940d2a-c981-4b41-971b-323109b0eb03.PNG)
            
        ```
        <template>
          <div>
            <h1>{{ this.book }} / {{ this.slug }}</h1>
          </div>
        </template>

        <script>
        export default {
        async asyncData({ params }) {
              const book = params.book
              const slug = params.slug
              return { book, slug }
            }
        }
        </script>
        ```
 
## 6.Plugins 
- Trong bất kỳ dự án Vue thông thường nào, bạn có thể đăng ký global các thư viện Vue trong file **main.js**. Tuy nhiên, file này không tồn tại trong ứng dụng Nuxt.js và do đó thư mục **plugins** sẽ làm điều này.

- Ví dụ: Vue plugin vue-notifications, cho phép bạn hiển thị thông báo trong ứng dụng của mình. Sau khi cài đặt qua npm hoặc yarn, bạn tạo file plugins/vue-notification.js chứa đoạn code bên dưới:

    ```
    import Vue from 'vue'
    import VueNotifications from 'vue-notifications'

    Vue.use(VueNotifications)
    ```
- Nhìn cú pháp quen chưa kìa 😄 Sau đó, bạn phải tìm cách thông báo cho Nuxt.js rằng bạn đã cài đặt xong rồi và muốn sử dụng plugin này, bằng cách chỉnh sửa file nuxt.config.js. Dấu ~ có chức năng giống như ký tự @, nghĩa là nó tham chiếu đến thư mục gốc:

    ```
    #plugins/vue-notification.js
    
    export default {
      plugins: ['~/plugins/vue-notifications']
    }
    ```
    
Vậy là xong rồi đó, về cơ bản thì bạn muốn dùng plugin nào thì cũng sẽ làm như bên trên vậy đó.

## 7.Static 
- Đối với các nội dung sẽ không thay đổi, bạn có thể đặt chúng vào thư mục static và webpack sẽ bỏ qua thư mục static và sẽ không xử lý bất cứ thứ gì trong đó (ví dụ: file favicon).

- Trong code của bạn, sau đó bạn có thể tham chiếu các file từ root (/):

- Xem sự khác biệt về cú pháp truy cập giữa thư mục static và thư mục assets:

    ```
    <!-- How to access static image from static directory --> 
    <img src="/image.jpg"/> 

    <!-- How to access webpacked image from assets directory --> 
    <img src="~/assets/image.jpg"/>
    ```
    
## 8.Store
- Về Stores thì mình phải tìm hiểu về vuex , ở đây sẽ được coi như 1 kho lưu trữ data cho toàn page . Ta sẽ thao tác với nó rồi từ đó sẽ thay đổi data trong các page trong app.
- (dang hoan thien :D để lấy ví dụ về module store)
- 
## 9.nuxt.config.js File
- File nuxt.config.js chứa cấu hình tùy chỉnh Nuxt của bạn và cho phép bạn config cấu hình ứng dụng của mình, những cấu hình này bao gồm head title và associated styles và scripts, middlewares, plugins, authentication, modules và thậm chí cả các API.

## 10.package.json File
- Cho t biết các dependencis của dự án đã có