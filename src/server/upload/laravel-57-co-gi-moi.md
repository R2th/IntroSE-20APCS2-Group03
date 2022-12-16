- Ở bải viết này ta sẽ cùng nhau tìm hiểu một số tính năng và cập nhật mới được bổ xung trong phiên bản Laravel 5.7
- Trong phiên bản mới này, [Taylor Otwell](https://twitter.com/taylorotwell) đã công bố một số thay đổi như sau:
    - **Resources Directory Changes.**
    - **Callable Action URLs.**
    - **Laravel Dump Server.**
    - **Improved Error Messages For Dynamic Calls.**
    - **Email Verification**
    - **Guest User Gates / Policies**
    - **Paginator Links**
    - **Filesystem Read / Write Streams**
    - **Laravel Nova**
- Cài đặt Laravel 5.7 từ nhánh Develop với tên project là `test`:
    ```
    composer create-project laravel/laravel test dev-develop
    ```
## **I. Resources Directory Changes** 
- Nếu bạn mở project `test` vừa tạo bên trên bằng sublime, bạn có thể thấy các thay đổi cấu trúc thư mục so với phiên bản 5.6. Cụ thể thư mục **assets** bên trong thư mục **Resources** sẽ không còn nữa, các thư mục con bên trong sẽ được move ra ngoài thư mục **Resources**
![](https://images.viblo.asia/dd64b29a-39dc-45b9-b9ea-4bb180049e3c.png)
- Để upgrade dự án cũ bằng tay lên phiên bản Laravel 5.7 bạn có thể thực hiện như sau:
    ```
    mv resources/assets/* resources
    rm -Rf resources/assets/
    ```
- Việc thay đổi này dẫn đến việc cấu hình Laravel Mix thay đổi theo:
    ```
    let mix = require('laravel-mix');

    mix.js('resources/js/app.js', 'public/js')
       .sass('resources/sass/app.scss', 'public/css');
    ```
## **II. Callable Action URLs**
- Hàm `action` để tạo URL trong helper đã được cải tiến cho phép gọi như sau trong phiên bản 5.7
    ```
    $url = action([UserController::class, 'index']);
    ```
- Bạn cũng có thể nghe được đâu đó tính năng mới này với tên *tuple* hoặc *callable array syntax*.
- So với phiên bản 5.6 cũ thì cú pháp sẽ như sau:
    ```
    $url = action('UserController@index');
    ```
- Lợi ích của cải tiến này là khi bạn dùng text editor, chẳng hạn ở đây mình dùng Sublime Text thì ta có thể đi thẳng đến UserController bằng cách rê chuột vào UserController::class các suggesstion sẽ hiển thị ra.

## **III. Laravel Dump Server**
- Package **Laravel Dump Server** sẽ được tích hợp sẵn trong phiên bản 5.7, cụ thể trong file [composer.json](https://github.com/laravel/laravel/blob/ff99e2fd5c6f868b9be53420057551c790f10785/composer.json#L14) sẽ như thế này:
    ```
    "require-dev": {
        "beyondcode/laravel-dump-server": "~1.0",
        "filp/whoops": "^2.0",
        "fzaninotto/faker": "^1.4",
        "mockery/mockery": "^1.0",
        "nunomaduro/collision": "^2.0",
        "phpunit/phpunit": "^7.0"
    },
    ```
- Để sử dụng package này ta chạy câu lệnh:
    ```
    php artisan dump-server
    ```
- Hoặc đặt định dạng đầu ra với option `--format`:
    ```
    php artisan dump-server --format=html > dump.html
    ```

## **III. Improved Error Messages for Dynamic Calls**
- Laravel 5.7 giúp ta dễ dàng theo dõi các thông báo lỗi gây ra khi ta gọi tới các model Eloquent.
- Chẳng hạn lỗi như hình ảnh dưới đây:
    ![](https://images.viblo.asia/708354b3-b4ad-4ca8-bf23-c68b9bb231d7.jpg)
- Như vậy lỗi chưa định nghĩa method `forst()` sẽ được chỉ ra rõ ràng trong class `App/User` thay vì class `Builder` như trước.
    
## **IV. Email Verification** 
- Đây là tính năng xác mình email cho người dùng khi sử dụng authentication mặc định của laravel.
- Cột mới `email_verified_at` đã được thêm vào bảng `users` để phục vụ chức năng này. Bạn thậm chí không phải update lại file migration vì file này đã được cập nhật thêm cột `email_verified_at` rồi. Việc của bạn là chạy `php artisan migrate` để tạo bảng `users`.
- Đồng thời bạn cần implement MustVerifyEmail interface vào model `User`:
    ```PHP
    <?php 
    // App/User.php namespace App; 
    use Illuminate\Notifications\Notifiable; 
    use Illuminate\Contracts\Auth\MustVerifyEmail; 
    use Illuminate\Foundation\Auth\User as Authenticatable; 

    class User extends Authenticatable implements MustVerifyEmail 
    { 
        // ... 
    }
    ```
## **V. Guest User Gates / Policies**
- Trong các phiên bản trước, các **gates** và **policies** sẽ tự động trả về `false` cho các khách chưa được xác thực vào ứng dụng của bạn. Tuy nhiên giờ đây, bạn có thể vượt qua bước kiểm tra này bằng khai báo "optional" hoặc định nghĩa giá trị mặc định bằng `null` cho đối số.
    ```PHP
    Gate::define('update-post', function (?User $user, Post $post) {
        // ...
    });
    ```
## **VI. Paginator Links**
- Cập nhật ở phiên bản này cho phép bạn hiển thị số lượng link tùy ý ở phần phân trang với method `onEachSide`
    ```HTML
    {{ $paginator->onEachSide(5)->links() }}
    ```
- Với config này phần phân trang sẽ hiển thị tối đa 5 link đến các trang khác.
## **VII. Filesystem Read / Write Streams**
- Flysystem của Laravel sẽ cung cấp các phương thức readStream và writeStream:
    ```PHP
    Storage::disk('s3')->writeStream(
        'remote-file.zip',
        Storage::disk('local')->readStream('local-file.zip')
    );
    ```
## **VIII. Laravel Nova**
- Đây không phải là một tính năng mới của Laravel 5.7. Nó là 1 package khác được tạo ra bởi [Taylor Otwell](https://twitter.com/taylorotwell).
- Nó được mô tả là một dashboard adminstration tốt nhất cho các ứng dụng laravel. Tất nhiên, tính năng chính của **Nova** là khả năng quản lý các bản ghi cơ sở dữ liệu bằng cách sử dụng Eloquent. Ngoài ra **Nova** còn hỗ trợ filters, lenses, actions, queued action, metrics, authorization, tùy chỉnh tools, tùy chỉnh cards, tùy chỉnh fields, và nhiều thứ khác nữa.
- Để trải nhiệm Nova, bạn có thể tham khảo từ đây [https://nova.laravel.com/](https://nova.laravel.com/)
    
    
    
- Nếu có bất cứ khó khăn gì có thể liên hệ trực tiếp với mình hoặc tham khảo tài liệu bên dưới.

    
    > **Tài liệu tham khảo**
    > 
    > [Laravel 5.7 New](https://laravel-news.com/category/laravel-5.7)
    > 
    > [Laravel 5.7 Features And Updates | What Is New](https://appdividend.com/2018/08/22/laravel-5-7-features-and-updates-what-is-new/)