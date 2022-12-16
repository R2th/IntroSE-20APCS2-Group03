# Lời mở đầu
* Hiện tại, kiến trúc thịnh hành cho xây dựng các ứng dụng web là mô hình client-server. Nó giúp việc xây dựng các ứng dụng trở nên dễ dàng hơn đặc biệt là các ứng dụng JavaScript bằng cách tìm nạp dữ liệu (fetching data) từ một nguồn từ xa hoặc từ API. Nó có thể là các API có sẵn hoặc các API do cá nhân bạn xây dựng bằng cách sử dụng các frameworks như Laravel.
* Vue cung cấp tính linh hoạt cho việc xây dựng các ứng dụng sử dụng dữ liệu được nạp từ bất kỳ API nào và cung cấp một cách thuận tiện nhất nội dung cho người dùng của ứng dụng.
Bài viết này xin được giới thiệu cách nạp dữ liệu từ API, giao tiếp với thông tin từ remote bằng **Axios**
# Bắt đầu
### 1. Thiết lập một ứng dụng vue sử dụng laravel

* Tạo một project Laravel, gõ lệnh ở terminal : 
    ```
    composer create-project --prefer-dist laravel/laravel vue-ajax
    ```
* chúng ta đã tạo ra một thư mục ứng dụng tên là vue-ajax, cd vào thư mục này
    ```
    cd vue-ajax
    ```
* Ở cấu trúc thư mục của Laravel, chúng ta có thư mục resource, trong có thư mục js, thông thường chúng ta sẽ viết các file js ở đây rồi dùng Webpack để compile JS sang thư mục public (Tham khảo https://laravel.com/docs/5.8/mix ). Tuy nhiên trong hướng dẫn này, để nhanh hơn chúng ta sẽ viết luôn JS ở thư mục public/js. 
* Trong file app.js ở thư mục public/js, ta khai báo một đối tượng vue, gắn với phần tử có id là app
    ```js
    new Vue ({
        el: '#app',
    });
    ```
### 2.     Tạo view
* Trong thư mục resource/view có file welcom.blade.php, chúng ta sử dụng luôn file view này.
* Tạo một div với id="app" để gắn với đối tượng vue, include script vuejs và file app.js vào
    ```html
    <!doctype html>
    <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <title>Laravel</title>
        </head>
        <body>
            <div id="app">

            </div>

            <script src="https://cdn.jsdelivr.net/npm/vue@2.6.9/dist/vue.js"></script>
            <script src="/js/app.js"></script>
        </body>
    </html>
    ```
### 3.     Tạo url cho Ajax
* Khai báo route trong file route/web.php, giả sử ở đây là trả về một mảng dữ liệu, chúng ta cũng dễ dàng convert sang Json để trả về nếu muốn
    ```php
    <?php

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    */

    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('skills', function () {
        return ['Laravel', 'Vue', 'PHP', 'Javascript'];
    });

    ```
    
    
    
    
### 4.     Sử dụng Axios
* Quay lại file app.js với đối tượng vue, chúng ta muốn khi component được mounted và sẵn sàng,  sẽ tạo một ajax request tới server và render response
*   Chúng ta có nhiều lựa chọn khác nhau để gửi và nhận request như dùng **fetch api**. Nếu bạn sử dụng jQuery bạn có thể dùng **$.ajax()      hoặc   $.getJson()**
*   Sử lý Ajax request trong một ứng dụng Vue trước đây được thực hiện dễ dàng bằng cách sử dụng vue-resource, tuy nhiên giờ nó đã được "nghỉ hưu". Có nhiều thư viện bên thứ 3 được sử dụng cho mục đích tạo Ajax request, và theo khuyến nghị của Evan ( [https://twitter.com/youyuxi](https://twitter.com/youyuxi)) , chúng ta sẽ sử dụng Axios (https://github.com/axios/axios) - một thư viện client HTTP dựa trên promise và có thể chạy được trên cả client và server.
*   Cài đặt Axios: 
    * dùng npm: `npm install axios`
    * dùng cdn: `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`
* Dùng Axios trong file app.js:
    ```js
    new Vue ({
        el: '#app',
        mounted() {
            axios.get('/skills').then(response => console.log(response));
        }
    });
    ```


* F12 mở tab console, ta sẽ thấy response của ajax request và trong trường data ta sẽ thấy dữ liệu mảng trả về từ route ajax:

 ![](https://images.viblo.asia/c6e60b28-c9a0-49bd-8c25-a1839310b492.png)

* Mở tab network bạn sẽ thấy toàn bộ thông tin về ajax request (Headers, Response):
  ![](https://images.viblo.asia/07d7ee04-668f-442b-a828-4b135f162db3.png)
### 5.  Hiển thị dữ liệu ra cho người dùng
* File app.js: khai báo data property cho dối tượng vue, data là một mảng skill có thể dùng được bên view và axios  response sẽ gán giá trị cho mảng skill đó:
    ```js
    new Vue ({
        el: '#app',

        data: {
            skills: []
        },

        mounted() {
            axios.get('/skills').then(response => console.log(response));
        }
    });
    ```
*   Xử lý bên view: file welcom.blade.php
    ```js
    new Vue ({
        el: '#app',

        data: {
            skills: []
        },

        mounted() {
            axios.get('/skills').then(response => this.skills = response.data);
        }
    });
    ```
    ***Lưu ý:** Ở đây, khi hiển thị dữ liệu từ VueJs, bạn không thể sử dụng cú pháp `{{ skill }}` như Docs mô tả vì nó sẽ nhầm lẫn với template view trong Laravel. Thay vào đó bạn phải dùng cú pháp `@{{ skill }}` để hiển thị dữ liệu như ví dụ. Hoặc có thể dùng directive `v-text` của Vue*
    ```html
    <ul>
         <li v-for="skill in skills" v-text="skill"></li>
    </ul>
    ```

*    Kết quả như sau:

   ![](https://images.viblo.asia/29e5796a-5deb-43d3-87f0-3ab1392179ac.png)
#    Kết luận
* Bài viết này giới thiệu cơ bản cách dùng Axios để gọi Ajax trong vuejs. Mong bài viết sẽ có ích đối với bạn đọc
* Nguồn tham khảo:
    *  https://laracasts.com/series/learn-vue-2-step-by-step/episodes/18
    *  https://medium.com/techtrument/handling-ajax-request-in-vue-applications-using-axios-1d26c47fab0