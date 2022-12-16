# 1. Giới thiệu
- Laravel Socialite được đưa vào danh sách các gói cài đặt chính thức từ phiên bản Laravel 5.3. Bài viết này sẽ hướng dẫn các bạn tích hợp gói Laravel Socialite cùng với mạng xã hội Facebook vào hệ thống website của bạn.

- Hiện nay, các website đều sử dụng mạng xã hội như Facebook, Google, Github… để đăng nhập, điều này giúp cho mọi người sử dụng trang web sẽ thuận tiện hơn rất nhiều. 
![](https://images.viblo.asia/6963dc6e-0d46-4bf1-a853-549246b17f45.jpg)

- Tạo dự án mới:
    ```php
        laravel new laravel-learning
        cd laravel-learning
    ```

- Tiếp theo, tạo database.

- Migrate dữ liệu vào database vừa tạo

    ```php
        php artisan migrate
    ```
    
- Thêm phần khung đăng nhập vào trang web

    ```php
        php artisan make:auth
    ```
    
- Bắt đầu chạy trang chủ: http://localhost:8080

# 2. Cài đặt gói Laravel Socialite
- Socialite là một gói chuyên xây dựng xác thực người dùng thông qua các mạng xã hội phổ biến như Facebook, Google, Twitter, Github… 

- Sử dụng composer để cài đặt gói:
    ```php
        composer require laravel/socialite
    ```
    
    ![](https://images.viblo.asia/e0d8ea9d-901b-447f-9802-d241860eb7c8.png)
    
- Tiếp tục, thực hiện theo hướng dẫn sau:

    - Thêm provider vào file config/app.php
    ```php
        'providers' => [
            // Other service providers...

            Laravel\Socialite\SocialiteServiceProvider::class,
        ],
    ```
    
    - Thêm alias vào đoạn cuối của file này 
  
    ```php
        'Socialite' => Laravel\Socialite\Facades\Socialite::class,
    ```

Vậy là chúng ta đã cài đặt xong gói Socialite và đã có thể sử dụng.

# 3. Cấu hình trang Facebook cho người phát triển
- Facebook mạng xã hội lớn nhất hiện nay nên các website đều muốn tích hợp Facebook trong phần đăng nhập hệ thống. Tích hợp Facebook giúp người dùng rất thuận tiện trong việc sử dụng, người dùng chỉ cần đăng nhập vào Facebook là có thể xác thực luôn cả bên phía website. 

- Bạn cần có đăng ký tài khoản phát triển Facebook. [Xem ở đây!](http://laptrinhphp.vn/bai-25-tao-tai-khoan-facebook-developers-va-ung-dung-facebook/)

Mở trang phát triển Facebook và thực hiện theo các bước sau:
- Trong phần Ứng dụng của tôi chọn Thêm ứng dụng mới.
![](https://images.viblo.asia/0ff018ee-8a0f-4a53-96e5-184c1060ec4c.png)

- Trong cửa sổ tạo ứng dụng mới điền vào các thông tin:

    * Tên hiển thị: Tên sẽ được hiển thị trong trang đăng nhập của Facebook
    * Email liên hệ: Địa chỉ email hỗ trợ khi người dùng không đăng nhập được thông qua Facebook.
    * Danh mục: Chọn ứng dụng cho trang
![](https://images.viblo.asia/57295646-af22-4f67-b27e-edfc0e1cd30d.png)

- Tiếp tục, cấu hình các thông số khác trong trang ứng dụng Laravel Learning trên Facebook Developer vừa tạo. Trong cửa sổ mới chọn Cấu hình, trong đây chứa các thông tin để thiết lập cho file config/service.php.
![](https://images.viblo.asia/ad55e9b2-4cd6-4585-a73e-de88eef86be7.png)

    Tại mục Miền ứng dụng là đường dẫn ứng dụng của bạn, ở đây mình chạy trên local nên để là localhost.
- Từ trang bên trên của bạn, Lấy giá trị trong ID ứng dụng đưa vào client_id, giá trị trong Khóa ứng dụng đưa vào client_secret (Nhập mật khẩu để lấy khóa ứng dụng).

    ```php
        'facebook' => [
                'client_id' => '235359230474611',
                'client_secret' => '8789b6972c62b2cssdse43dec615a73f9d2',
                'redirect' => '',
            ],
    ```
- Tiếp theo chúng ta sẽ tiếp tục chuyển hướng người dùng đến Facebook và quản lý callback về từ Facebook. Chúng ta cần tạo một controller mới cho xác thực qua mạng xã hội:

    `php artisan make:controller SocialAuthController`
    
- Sau đó, thêm vào controller SocialAuthController.php này hai phương thức:

    ```php
        <?php
        namespace App\Http\Controllers;

        use Illuminate\Http\Request;

        use App\Http\Requests;
        use App\Http\Controllers\Controller;
        use Socialite;

        class SocialAuthController extends Controller
        {
            public function redirectToProvider()
            {
                return Socialite::driver('facebook')->redirect();   
            }   

            public function handleProviderCallback()
            {
                // Sau khi xác thực Facebook chuyển hướng về đây cùng với một token
                // Các xử lý liên quan đến đăng nhập bằng mạng xã hội cũng đưa vào đây.    
            }
        }
    ```

- Tiếp theo, chúng ta đăng ký các phương thức này trong routes/web.php

    ```php
        Route::get('/auth/facebook', 'SocialAuthController@redirectToProvider');
        Route::get('/auth/facebook/callback', 'SocialAuthController@handleProviderCallback');
    ```

- Tiếp theo, cập nhật lại file config/service.php giá trị chứa đường dẫn callback ở trên:

    ```php
        'facebook' => [
                'client_id' => '597752324277084316',
                'client_secret' => '8789b6972c62b2cssdse43dec615a73f9d2',
                'redirect' => 'http://localhost/laravel-learning/auth/facebook/callback',
            ],
    ```
    (Thay http://localhost/laravel-learning bằng đường dẫn tới ứng dụng của bạn)
- Tiếp theo, vào resources/views/auth/login.blade.php để thêm một liên kết xác thực website bằng Facebook, thêm một liên kết vào sau phần Quên mật khẩu.
    ```php
        <a href="{{ URL::to('auth/facebook') }}">Facebook Login</a>
    ```

# 4. Kiểm tra xem đăng nhập website thông qua Facebook như thế nào?

- Socialite sẽ xử lý một cách tự động, khi Facebook đã xác thực được người dùng nó sẽ chuyển hướng người dùng về http://localhost/laravel-learning/auth/facebook/callback cùng với token và thông tin người dùng đã đăng nhập Facebook. Socialite cung cấp phương thức để lấy các thông tin này:
    ```php
        $user = Socialite::driver($provider)->user();
    ```
        
    
- Như vậy $user đã chứa đầy đủ thông tin chúng ta có thể khai thác bằng các phương thức:

    * getId(): ID người dùng trên mạng xã hội Facebook
    * getNickName(): trả về Nickname người dùng
    * getName(): trả về tên người dùng trên Facebook
    * getEmail(): trả về email người dùng đăng ký với Facebook
    * getAvatar(): trả về ảnh đại diện người dùng trên Facebook
 
Trong phần tiếp theo mình sẽ hướng dẫn các bạn sử dụng Laravel Socialite để tích hợp xác thực người dùng qua Google.