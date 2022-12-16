## Giới thiệu
Một trang quản trị trực quan là điều không thể thiếu trong quá trình xây dựng hệ thống website. Bạn còn đang loay hoay chưa biết xây dựng nó như thế nào cho nhanh và hiệu quả? Hôm nay, mình sẽ giới thiệu với bạn package **Laravel-admin** vô cùng mạnh mẽ. Với package này, bạn chỉ cần viết code Backend mà không cần động vào 1 dòng code HTML, CSS nào cả mà nó có UI rất gọn gàng, đẹp mắt. Tiết kiệm thời gian phát triển chưa nào? Không cần phải dài dòng nữa, cùng tìm hiểu thôi nào. Let's go!!!! ;)

### 1. Install
`Laravel-admin` yêu cầu bạn sử dụng PHP 7+ và Laravel 5.5+. Hãy chắc chắn rằng bạn đã cài đặt Laravel project và kết nối database thành công. Sau đó sử dụng câu lệnh để cài đặt package:
```
composer require encore/laravel-admin
```

Tiếp theo publish các file cần thiết:
```
php artisan vendor:publish --provider="Encore\Admin\AdminServiceProvider"
```

Sau khi chạy lệnh, bạn có thể tìm thấy tệp cấu hình **`config/admin.php`**, trong tệp này, bạn có thể thay đổi thư mục cài đặt, kết nối database hoặc tên bảng. 

Cuối cùng chạy lệnh sau để kết thúc cài đặt.

```
php artisan admin:install
```

Mở trình duyệt http://localhost/admin/, để đăng nhập bạn hãy sử dụng tài khoản mặc định **username: admin, password: admin**.

Trang Dashboard:
![](https://images.viblo.asia/c2649c3d-39f0-4244-8678-b23602b2e1ca.png)

Trang quản lý User:
![](https://images.viblo.asia/3364e5b5-730a-42cf-b79c-1e0c0e01ded0.png)


Sau khi cài đặt, bạn có thể tìm thấy thư mục **`app/Admin`**, và hầu hết các công việc phát triển của chúng ta đều nằm trong thư mục này.
```
app/Admin
├── Controllers
│   ├── AuthController.php
│   ├── ExampleController.php
│   └── HomeController.php
├── bootstrap.php
└── routes.php
```

- **`app/Admin/routes.php`** được sử dụng để xác định route.
- **`app/Admin/bootstrap.php`** là bootstrapper cho laravel-admin. 
- Thư mục **`app/Admin/Controllers`** được sử dụng để lưu trữ tất cả các Controller,  **`ExampleController.php`** là một ví dụ về Controller có sẵn. Bạn có thể tùy chỉnh việc xác thực bằng cách viết đè các function trong **`AuthController.php`**

### 2. CRUD
Mình sẽ demo ứng dụng CRUD sử dụng **`Laravel-admin`** để các bạn có thể dễ dàng áp dụng vào project của mình.

Chúng ta dùng luôn model **`User`** để demo.

```
users
    id          - integer
    name        - string
    email       - string
    password    - string
    created_at  - timestamp
    updated_at  - timestamp
```

1. **Thêm Controller**

Sử dụng lệnh sau để tạo Controller cho **`App\User`**

```
php artisan admin:controller App\\Models\\User
```

File controller sẽ được sinh ra trong **`app/Admin/Controllers/UserController.php`**

2. **Thêm route**

Chúng ta phải khai báo route mới trong **`app/Admin/routes.php`**
```
$router->resource('demo/users', UserController::class);
```

3. **Thêm Menu item**

Bạn có thể thêm item trên menu bằng cách truy cập trực tiếp vào ứng dụng **`http://localhost:8000/admin/auth/menu`**. 

Chỉ cần nhập URI **`demo/users`** là có đường dẫn đầy đủ **`http://localhost:8000/admin/demo/users`**. Còn bạn muốn tạo đường dẫn bên ngoài thì phải nhập đầy đủ url **`https://viblo.asia/followings`** là ngon nha.

![](https://images.viblo.asia/34d90a76-a479-4af1-ab0f-ecc16ac89ba2.png)

4. **Chỉnh sửa logic trong Controller**

**`UserController`** được tạo bằng lệnh nó sẽ như thế này:

```php
<?php

namespace App\Admin\Controllers;

use App\Models\User;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class UserController extends AdminController
{
    protected $title ='Users';

    protected function grid()
    {
        $grid = new Grid(new User());

        $grid->column('id', __('Id'));
        $grid->column('name', __('Name'));
        $grid->column('email', __('Email'));
        $grid->column('password', __('Password'));
        $grid->column('created_at', __('Created at'));
        $grid->column('updated_at', __('Updated at'));

        return $grid;
    }

    protected function detail($id)
    {
        $show = new Show(User::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('name', __('Name'));
        $show->field('email', __('Email'));
        $show->field('password', __('Password'));
        $show->field('created_at', __('Created at'));
        $show->field('updated_at', __('Updated at'));

        return $show;
    }

    protected function form()
    {
        $form = new Form(new User());

        $form->textarea('name', __('Name'));
        $form->textarea('email', __('Email'));
        $form->textarea('password', __('Password'));

        return $form;
    }
}
```

Wow!!! Chỉ bằng 1 câu lệnh mà đẩy đủ chức năng CRUD luôn. Giải thích tý nha:
- Thuộc tính **$title** được sử dụng để đặt tiêu đề cho module CRUD này

- Method **grid** tương ứng với trang index danh sách của dữ liệu. Mỗi cột trong bảng dữ liệu muốn hiển thị thì sử dụng **$grid->column(column_name, 'Column Title')**
![](https://images.viblo.asia/4169261d-b4bd-40e8-b992-00671205774d.png)
- Method **detail** tương ứng với trang show chi tiết của dữ liệu.
![](https://images.viblo.asia/51cf401c-8150-4356-bc53-1c8c31adf538.png)
- Method **form** tương ứng với trang create và edit của dữ liệu.
![](https://images.viblo.asia/aa219bc2-0ac5-42e4-ba98-a6220809befa.png)

Bạn có thể thấy dù không code một dòng HTML, CSS nào nhưng kết quả thật vi diệu.

### Tạm kết

Ở phần 1 này, mình đã giới thiệu cơ bản về sức mạnh của package **`Laravel-admin`**. Thật sự nó giúp mình tiết kiệm thời gian phát triển trang quản trị. Hơn hết, chúng ta có thể tùy chỉnh với các chức năng nâng cao và các gói mở rộng của package này mà mình sẽ trình bày ở các phần tiếp theo.

Hy vọng bài viết sẽ giúp ích cho các bạn trong quá trình học tập và làm việc. Cảm ơn bạn đã đọc bài <3 

**Nguồn:**
- https://laravel-admin.org/