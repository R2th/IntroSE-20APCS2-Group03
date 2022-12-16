<div align="center">

# Lời nói đầu
    
</div>

Nếu bạn đang làm việc hoặc bắt đầu tìm hiểu về javascript thì chắc hẳn bạn cũng không còn quá xa lạ với những từ khóa "**Angular**, **React**, **Vue**, ..." rồi đúng không? Đó là **ba framework/library** javascript được sử dụng phổ biến nhất hiện nay. Nhưng **React/Vue** chủ yếu làm **Client Side Rendering (CSR)**, tuy nhiên trong thực tế thì sẽ cần sử dụng đến **Server Side Rendering (SSR)**, vì mục đích đó mà 2 framework **Nuxt.js** (sử dụng cho **Vue**) và **Nextjs** (sử dụng cho **React**) ra đời. 
- Nếu bạn còn chưa biết **CSR** và **SSR** là gì thì cũng đừng lo, chúng ta sẽ cùng nhau tìm hiểu nhé. 
- Nếu bạn thắc mắc tại sao bài này chỉ nói về **Nuxt.js** mà không phải **Nextjs** thì đơn giản là vì mình đang làm 1 dự án với **Nuxt.js** thì mình viết về nó thôi :D :D  

Bắt đầu thôi nào!

<div align="center">

# Nội dung
    
</div>

<div align="center">

## CSR và SSR
    
</div>

- Về cơ bản thì cái tên cũng đã nói lên sự khác biệt giữa 2 cơ chế này rồi: 
    - **Server Side Rendering (SSR)** là hầu hết logic từ đơn giản (validate, routing, render) đến phức tạp (phân quyền, xử lí dữ liệu, ...) sẽ được xử lí ở phía server, và server sẽ trả về dữ liệu để cho phía client hiển thị ra.
    -  Còn đối với **Client Side Rendering (CSR)** thì sẽ xử lí phần lớn logic đơn giản (validate, routing, render) ở bên phía client, còn những xử lí logic phức tạp vẫn sẽ do server xử lí. Điều đầu tiên chúng ta thấy là cách này sẽ giúp giảm bớt phần xử lí của server hơn.

- Còn về ưu và nhược điểm của từng cái thì mình xin phép trích lại từ trang https://toidicodedao.com/2018/09/11/su-khac-biet-giua-server-side-rendering-va-client-side-rendering/ như sau: 

|  | <div align="center">SSR</div> | <div align="center">CSR</div> |
| -------- | -------- | -------- |
| **Ưu điểm**     | - Initial load nhanh, dễ otpimize, vì toàn bộ dữ liệu đã được xử lý ở server. Client chỉ việc hiển thị  <br> - Các web framework từ xưa đến nay đều hỗ trợ cơ chế này <br> - Dễ hiểu và dễ code hơn. Developer chỉ cần code 1 project web là được, không cần phải tách riêng back-end và front-end <br> - SEO tốt vì khi bot của Google, Bing vào web sẽ thấy toàn bộ dữ liệu dưới dạng HTML <br> - Chạy được trên phần lớn mọi trình duyệt, kể cả disable JavaScript vẫn chạy tốt    | - Page chỉ cần load một lần duy nhất. Khi user chuyển trang hoặc thêm dữ liệu, JavaScript sẽ lấy và gửi dữ liệu từ server qua AJAX. User có thể thấy dữ liệu mới mà không cần chuyển trang <br> - Chuyển logic sang client nên giảm tải được một phần cho server <br> - Giảm được băng thông do chỉ cần lấy JSON và dữ liệu cần thiết, thay vì phải lấy toàn bộ trang <br> - Với các ứng dụng cần tương tác nhiều, SPA hoạt động mượt mà hơn vì code chạy trên browser, không cần load đi loại lại nhiều    |
| **Nhược điểm**     | - Mỗi lần người dùng chuyển trang là site phải load lại nhiều lần, gây khó chịu <br> - Nặng server vì server phải xử lý nhiều logic và dữ liệu. Có thể sử dụng caching để giảm tải <br> - Tốn băng thông vì server phải gửi nhiều dữ liệu thừa và trùng  (HTML, header, footer). Có thể sử dụng CDN để giảm tải <br> - Tương tác không tốt như Client Side rendering vì trang phải refresh, load lại nhiều lần   | - Initial load sẽ chậm hơn nếu không biết optimize. Lý do là broser phải tải toàn bộ JavaScript về (khá nặng), parse và chạy JS, gọi API để lấy dữ liệu từ server (chậm), sau đó render dữ liệu <br> - Đòi hỏi project phải chia làm 2 phần riêng là back-end (REST api) và front-end nên khó code hơn <br> - Không chạy được nếu JavaScript bị disable, hoặc ở các trình duyệt cũ không nhận JavaScript ES6 (Có thể dùng transpiler và polyfill nhưng sẽ làm tăng kích cỡ file js) <br> - SEO không tốt bằng Server Side Rendering (Do bot crawl không đọc được dữ liệu). Để giải quyết, ta phải kết hợp thêm SSR ([Bot mới của Google đọc được client-side rendering rồi](https://medium.com/@adamzerner/client-side-rendering-vs-server-side-rendering-a32d2cf3bfcc)) <br> - Nếu client sử dụng mobile, device yếu thì khi load sẽ bị chậm  |

- Trên đây là một số nội dung cơ bản về ưu nhược điểm của **Server Side Rendering (SSR)** và **Client Side Rendering (CSR)**. Khi đã nắm được những nội dung này rồi thì chúng ta hãy cùng nhau tìm hiểu "nhân vật chính" của bài viết nhé!

<div align="center">

## Tìm hiểu về Nuxtjs
    
</div>


### 1. Tổng quan về Nuxt.js:

- Khi đánh giá một repository trên github thì điều đầu tiên mình quan tâm chính là số stars, vì nó chính là sự công nhận, đánh giá của cộng đồng, và như các bạn có thể thấy là nuxt đang nhận được > 28.3k stars trên github, một con số rất đáng ngưỡng mộ ![](https://images.viblo.asia/8d64eef5-c201-4c1a-9848-9b12ffcfa916.png)

- Tiếp theo là số lượng người dùng và contributors cực kì đông đảo, bạn có thể yên tâm về việc có thể sử dụng lâu dài (vẫn liên tục được phát triển và sửa lỗi) và nhận được nhiều sự hỗ trợ với một cộng đồng người dùng lớn như thế này
    ![](https://images.viblo.asia/0ea58561-238c-4446-876b-e5aabe578056.png)

- Nuxt.js được cài đặt bao gồm một số công cụ sau:
    - [Vue 2](https://vuejs.org/)
    - [Vue Router](https://router.vuejs.org/)
    - [Vuex](https://vuex.vuejs.org/guide/) (được cài đặt khi sử dụng store)
    - [Vue Server Renderer](https://ssr.vuejs.org/) (sẽ được loại trừ nếu khi cài đặt bạn lựa chọn `mode: 'spa'`)
    - [Vue Meta](https://github.com/nuxt/vue-meta)
    
    theo như trang chủ của Nuxt.js thông báo thì tổng cộng dung lượng của tất cả những gói trên chỉ là **57kB** (nếu có thêm Vuex thì sẽ lên "tận" **60kB**), cực kì nhỏ gọn phải không nào! 
    
### 2. Khởi tạo và cấu trúc thư mục của một project nuxtjs:

- Để khởi tạo một project nuxt, chúng ta sử dụng `create-nuxt-app`:

    ```bash
    # sử dụng npx (npx được cài đặt kèm với NPM từ phiên bản 5.2.0)
    $ npx create-nuxt-app <project-name> 
    # hoặc sử dụng yarn
    $ yarn create nuxt-app <project-name>
    ```
- Trong quá trình khởi tạo project, bạn sẽ phải khai báo một số thông tin như là tên, UI framework (Ant Design, Boostrap, Element, ...), ... cho project của bạn.
   ![](https://images.viblo.asia/588a702c-4155-4f4c-a845-b723750de2be.png)
- Thư mục project sẽ có cấu trúc như sau: ![](https://images.viblo.asia/e92bdaf1-84b8-40c1-85f9-d3da76461745.png)

    
- Sau khi khởi tạo project thành công thì bạn sử dụng câu lệnh `npm run dev` để chạy project
        ```bash 
        npm run dev
        ```
       và bạn có thể truy cập thông qua đường dẫn http://localhost:3000
       
### 3. Một số chức năng cơ bản cần chú ý
   - **Routing**: như đã nói ở phần 1, Nuxt.js đã bao gồm `vue-router` nên nó sẽ tự động sinh ra các router dựa trên cấu trúc thư mục `pages` trong project. Tức là bạn sẽ không cần phải khai báo router mà chỉ cần đặt tên file, cấu trúc thư mục theo 1 quy tắc nhất định thì sẽ tự động sinh ra router. Ví dụ như sau:
       - **Basic route**:  
            ```javascript
                pages/
                --| user/
                -----| index.vue
                -----| one.vue
                --| index.vue
            ```
            sẽ tự động sinh ra khai báo router như sau:
            ```javascript
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
            
        - Còn đối với **Dynamic Route** (tức là có truyền tham số vào router ví dụ như id, hashId) thì bạn chỉ cần đặt tên folder hoặc tên file bắt đầu bằng dấu `_`, ví  dụ như là `_id.vue` hoặc `_hashId.vue`
            ```javascript
            pages/
            --| users/
            -----| _id.vue
            --| index.vue
            ```
            thì sẽ tự động sinh ra khai báo router như sau:
            ```javascript
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
            Và do tham số truyền vào dynamic route này có thể là do người dùng truyền vào nên chúng ta sẽ cần validate nó theo đúng kiểu, format mà chúng ta muốn. (Sau 1 thời gian làm coder thì mình luôn nhớ rõ 1 câu **`ĐỪNG BAO GIỜ TIN TƯỞNG NGƯỜI DÙNG`**). 
            
            Và Nuxt.js cũng cho phép chúng ta có thể viết hàm validate trong component. Các bạn có thể tham khảo thêm về validate trong Nuxt.js ở [đây](https://nuxtjs.org/api/pages-validate). Còn đây là ví dụ đơn giản validate id truyền vào phải là số.
            ```js
            export default {
              validate ({ params }) {
                // Must be a number
                return /^\d+$/.test(params.id)
              }
            }
            ```
   - **Views**:
       - **Layout**: layout là một khung bố cục chung cho các trang gần giống nhau (ví dụ như các trang thuộc phần quản trị của admin sẽ dùng chung 1 layout). Để sử dụng layout cho một page, bạn chỉ cần khai báo
           ```js
           <script>
                export default {
                  layout: 'LayoutName'
                }
           </script>
           ```
           Còn trong trường hợp bạn không khai báo layout thì Nuxt.js sẽ tự sử dụng layout mặc định tại `layouts/default.vue`.
           
           Hãy nhớ sử dụng component `<nuxt/>` trong layout để có thể load được nội dung của page nhé!
           ```html
           <template>
               <nuxt/>
           </template>
           ```
       - **Pages**: được đặt trong thư mục `pages`, Nuxt.js sẽ đọc tất cả các file .vue và dựa theo cấu trúc thư mục này để sinh ra các route tương ứng với các trang của bạn. Và ở trong page, Nuxt.js cung cấp thêm một số attributes và functions đặc biệt để hỗ trợ cho công việc phát triển. Điển hình như:
           - [head](https://nuxtjs.org/api/pages-head): chỉ định các <meta> tags cho page để hỗ trợ cho việc SEO.
           - [asyncData](https://nuxtjs.org/guide/async-data): xử lý bất đồng bộ để nhận dữ liệu sử dụng cho page.
           - [fetch](https://nuxtjs.org/api/pages-fetch): tương tự với asyncData, trừ việc nó sẽ không set component data.
           - [validate](https://nuxtjs.org/api/pages-validate#the-validate-method): validate tham số được truyền vào trong dynamic route đã nói ở phần trên.
           - [middleware](https://nuxtjs.org/guide/routing#middleware): khai báo middleware để giới hạn xem user/guest có thể xem được trang. Và nó sẽ được gọi trước khi trang được render ra.
       - **Error Page**: Ngoài các page hiển thị thông thường, Error Page khi có lỗi (404, 500) xảy ra cũng là một phần cần chú ý để tạo ra dấu ấn riêng cho trang web của bạn. Ví dụ như trang 404 đáng yêu này chẳng hạn ![](https://images.viblo.asia/1839f9ae-76db-47b1-b231-8879a3015837.jpg)

   - **Vuex Store**: Cái này chắc phải hẹn các bạn một bài viết riêng chứ không thể nói trong 1, 2 dòng trong bài viết này được.
   - **Một số câu lệnh thường dùng**:
   
        | Command | Description | 
        | -------- | -------- | 
        | `nuxt dev`     | start project kèm theo hot-reloading     | 
        | `nuxt build`     | build project với webpack và minify các file JS, CSS   | 
        | `nuxt export`     | sinh ra file HTML từ các route (sử dụng cho static hosting cho các phiên bản Nuxt >= 2.13)    | 
        | `nuxt generate`     | build project và sinh ra file HTML từ các route (sử dụng cho static hosting phiên bản Nuxt >= 2.13)   | 


<div align="center">

# Tổng kết
    
</div>

- Sau khi đọc xong bài viết này, hi vọng rằng các bạn đã có thể nắm được khái niệm **Server Side Rendering (SSR)** và **Client Side Rendering (CSR)** từ đó lựa chọn được cơ chế phù hợp cho project của các bạn. Ngoài ra, trong phạm vi của bài viết, mình chỉ có thể tóm lược một số nội dung cơ bản khi bắt đầu tìm hiểu về nuxt, nếu muốn tìm hiểu sâu hơn thì các bạn có thể tham khảo thêm ở https://nuxtjs.org/ hoặc đón đọc những bài viết tiếp theo của mình về chủ đề này nhé.
- Cảm ơn các bạn đã dành thời gian đọc bài viết, nếu thấy nội dung bài viết hay và hữu ích, hãy **upvote** và **clip** bài viết ủng hộ mình nhé, còn nếu có vấn đề gì chưa ổn (kiến thức, cách diễn đạt, ...) thì hãy **comment** góp ý xuống phía dưới để mình có thể cải thiện và viết được những bài viết chất lượng hơn nhé.


<div align="center">

# Tài liệu tham khảo
    
</div>

- Homepage: https://nuxtjs.org/
- Github: https://github.com/nuxt/nuxt.js
- https://www.google.com/
- So sánh về CSR và SSR: https://toidicodedao.com/2018/09/11/su-khac-biet-giua-server-side-rendering-va-client-side-rendering/