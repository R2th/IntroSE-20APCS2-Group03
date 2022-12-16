Xác thực là một trong những phần vô cùng quan trọng trong các ứng dụng. Các framework bây giờ cũng cung cấp các package giúp lập trình viên quản lý tốt hơn việc xác thực người dùng này và FuelPHP cũng không phải là một ngoại lệ. Với FuelPHP, bạn có thể sử dụng package Auth và SimpleAuth để thực hiện việc xác thực một cách đơn giản và hiệu quả

# 1. FuelPHP?
Theo wikipedia: "FuelPHP là một framework mã nguồn mở viết bằng ngôn ngữ PHP giúp xây dựng các ứng dụng web, thực thi pattern HMVC". Một vài thông số khác và so sánh với các framwork PHP hiện hành, các bạn có thể tham khảo tại https://viblo.asia/p/xay-dung-fuelphp-framework-than-thien-voi-developer-hon-bWrZnN1nZxw

# 2. Cấu hình và cài đặt

Như đã đề cập ở trên, package Auth trong Fuel khá rộng, được sử dụng cho cả xác thực và phân quyền. Trong phạm vi bài viết mình chỉ đề cập sử dụng package này để xác thực với driver SimpleAuth (ngoài ra còn có OrmAuth và Opauth sử dụng cách thực xác thực và phân quyền phức tạp hơn có thể sử dụng trong Auth package)

## 2.1. Cài đặt

Auth package đã được download trong framework Fuel, để sử dụng nó bạn chỉ cần enable nó trong file config (APP_CLASS/fuel/app/config/config.php)
```php
'always_load' => array(
    'packages' => array(
        'auth',
    ),
),
```

## 2.2. Cấu hình

Đây là một phần cực kì quan trọng để ứng dụng của bạn có thể sử dụng các function của Auth package và cách thức SimpleAuth hiệu quả. 

Mặc định SimpleAuth đã được sử dụng để xác thực trong Fuel, nếu bạn không muốn sử dụng SimpleAuth mà sử dụng drives khác (như OrmAuth), bạn phải tạo file cấu hình auth.php (trong thư mục config để thay đổi)

Cấu hình với drive SimpleAuth: Tạo một file trong thư mục config với tên "**simpleauth.php**" để thực hiện cấu hình, các thông số cần cấu hình https://fuelphp.com/docs/packages/auth/simpleauth/intro.html

Một vài thông số quan trọng cần lưu ý

* table_name: tên bảng sử dụng trong khi xác thực
* remember_me: cấu hình phần này để sử dụng chức năng remember me trên ứng dụng (mặc định đang là false tức là không sử dụng)

## 2.3. Cấu hình session
Session trong fuel được cấu hình trong đường dẫn **APP_CLASS/fuel/core/config/session.php**. Nếu bạn muốn chỉnh sửa file này, bạn cần copy nó để vào đường dẫn **APP_CLASS/fuel/app/config/session.php** để tránh mất file cấu hình mặc định từ phía khách hàng của bạn
Các thông số trong file cấu hình cũng đã được chú thích một cách rất chi tiết và đầy đủ. Các trường cũng khá giống với framework Laravel nên nếu bạn đã từng làm việc với Laravel thì chắc hẳn không còn xa lại với các thông số này nữa :D

Tham khảo thêm ý nghĩa các thông số tại: https://fuelphp.com/docs/classes/session/config.html
# 3. Xây dựng ứng dụng
## 3.1. Tạo bảng users
```
$ oil generate model users username:varchar[50] password:string group:int email:string last_login:int login_hash:string profile_fields:text
  Creating model: /Users/phil/Sites/blog/fuel/app/classes/model/user.php
  Creating migration: /Users/phil/Sites/blog/fuel/app/migrations/001_create_users.php
$ oil refine migrate
```

## 3.2. Cấu hình

Taọ file **simpleauth.php** trong thư mục cấu hình với nội dung kích hoạt chức năng remember me
```php
<?php
/**
 * Created by PhpStorm.
 * User: FRAMGIA\nguyen.van.minhb
 * Date: 09/07/2018
 * Time: 08:44
 */
return array(
    'remember_me' => array(
        'enabled' => true,
        'cookie_name' => 'rmcookie',
        'expiration' => 86400*31 // thời gian remember me mặc định là 31 ngày
    )
);
```

## 3.3. Xử lý controller

Phần view và chuyển hướng các bạn có thể tự xây dựng, mình chỉ đề cập phần xử lý logic (login.php trong controller)
```php
public function get_login()
{
    return Response::forge(View::forge('login/index'));
}
    
public function post_login()
{
    // was the login form posted?
    if (\Input::method() == 'POST')
    {
        // check the credentials.
        if (\Auth::instance()->login(\Input::param('username'), \Input::param('password')))
        {
            // did the user want to be remembered?
            if (\Input::param('remember', false))
            {
                // create the remember-me cookie
                \Auth::remember_me();
            }
            else
            {
                // delete the remember-me cookie if present
                \Auth::dont_remember_me();
            }
            // logged in, go back to the page the user came from, or the
            // application dashboard if no previous page can be detected
            \Response::redirect_back('/');
        }
        else
        {
            // login failed, show an error message
            //\Messages::error(__('login.failure'));
        }
    }

    // display the login page
    return \View::forge('login/index');
}
```

Code ở trên khá chi tiết và rõ ràng, chắc mình không cần giải thích nữa :D

# Tài liệu tham khảo

Authpackage: 

https://fuelphp.com/docs/packages/auth/intro.html#/configuration

SimpleAuth: 

https://fuelphp.com/docs/packages/auth/simpleauth/intro.html

Example: 

https://fuelphp.com/docs/packages/auth/examples/auth.html

https://code.tutsplus.com/tutorials/build-an-admin-panel-with-the-fuel-php-framework--net-23186

Project github:

https://github.com/minhnv2306/authencation_fuelphp

Tạo bảng book trong DB (tác giả chưa dùng migrate :v)

https://www.tutorialspoint.com/fuelphp/fuelphp_complete_working_example.htm