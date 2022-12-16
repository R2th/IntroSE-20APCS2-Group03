# Giới thiệu 
Các bạn sẽ làm gì khi chương trình của mình gặp bug chứ, vâng nếu như bạn đang trong quá trình phát triển hoặc kiểm thử, thì các bạn sẽ muốn chương trình hiển thị lỗi để fix bug rồi. Nhưng nếu như chương trình đó bạn đã chạy và trả về cho người dùng sử dụng, để lộ bug như vậy thật sự kém chuyên nghiệp, và mang lại trải nghiệm tệ hại cho người sử dụng. Mặc dù bug là một trong những thứ mà không ai mong muốn nhưng nếu là một lập trình viên thì khó mà các bạn không "chung một nhà" với nó. Chém gió vậy là được rồi :v giờ chúng ta cùng đi tìm hiểu về nó nhé :v

# 1. Các đơn giản nhất để giải quyết ngoại lệ
Laravel cung cấp một giải pháp ngay trong file cấu hình .env tại phần APP_DEBUG thường nó sẽ là true, bạn chỉ cần đưa nó về false là chương trình sẽ trả về trang thông lỗi có **code = 500** với 1 **message "Whoops, something went wrong on our servers.".**
Hoặc các bạn có thể sử dụng hàm **findOrFail()** thay vì **find()**. Kết hợp với try **catch** để xử lý ngoại lệ và đưa nó vào **session errors** một cách dễ hiểu. Ví dụ chúng ta sử dụng với một hàm search đơn giản như sau:
```php
public function search(Request $request)
    {
        try {
            $user = User::findOrFail($request->input('user_id'));
        } catch (ModelNotFoundException $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }
        
        return view('users.search', compact('user'));
    }
```
Và ở form chỉ cần gọi nó ra:
```php
@if (session('error'))
    <div class="alert alert-danger text-center">{{ session('error') }}</div>
@endif
```
# 2. Cách Exception hoạt động trong Laravel
Tất cả các exception được xử lý bởi **class App\Exceptions\Handler**. Chúng ta cùng xem bên trong nó sẽ chứa những gì:
### 	1.1 Thuộc tính $dontReport:

Thuộc tính này chứa một mảng các kiểu exception sẽ không cần log
Xem trong class cha của class Handler ta sẽ thấy 1 mảng các Exception đã được thêm vào sẵn ở thuộc tính **$internalDontReport**
### 	1.2 Thuộc tính $dontFlash:

Từ bản laravel 5.7 trở đi bổ sung thêm thuộc tính này
Nó sẽ chứa 1 mảng các input sẽ không bao giờ được truyền đi nếu có exception validate
### 1.3 Phương thức report 
Phương thức report được sử dụng để log các exception hoặc gửi chúng tới các dịch vụ ngoài như Bugsnag hoặc Sentry

Mặc định, phương thức report đơn giản chỉ đấy các exception về class nơi mà exception được log lại. Tuy nhiên, chúng ta có thể hoàn toàn tùy biến theo ý mình muốn.
Nếu bạn cần report nhiều kiểu exception theo nhiều cách khác nhau, bạn có thể sử dụng toán tử kiểm tra của PHP instanceof
### 1.4 Phương thức render :

Phương thức render có trách nhiệm chuyển đổi một exception thành một HTTP response để trả lại cho trình duyệt
Mặc định, exception được đẩy tới class cơ sở để tạo một response. Tuy nhiên, ta có thể thoải mái trong việc kiểm tra kiểu exception và trả về response tùy biến theo ý của mình, ví dụ:

# 3. Tạo Exception
	
Các Exception mà Laravel cung cấp sẵn đôi khi không đáp ứng đủ nhu cầu giải quyết vấn đề của chúng ta. Vì vậy, Laravel cho phép tự tạo Exception bằng câu lệnh 
php artisan make:exception UserException	
	Khi câu lệnh được thực thi sẽ có một file như sau:
    
```php
<?php

namespace App\Exceptions;

use Exception;

class test extends Exception
{
   //
}
```

Bạn cần thêm thư viện **class App\Exceptions\Handler**, chúng ta sẽ thêm vào 2 method report và render. Điều này giúp chúng ta thay vì kiểm tra các loại exception trong phương thức report và render của Handler, ta có thể định nghĩa trong tùy chỉnh exception của bạn. 
Và bây giờ thay vì gọi **ModelNotFoundException** trong catch thì bạn gọi **UserException** của bạn, tương đối đơn giản phải không ạ. 
# 4. Kết luận
Bài viết của mình đến đây là hết mong có thể mang để cho các bạn một sự support kịp thời, và có thể cung cấp được một phần để các bạn tìm hiểu về log lỗi 

tài liệu tham khảo: https://viblo.asia/p/exceptions-trong-laravel-lam-the-nao-de-catch-handle-va-tu-tao-mot-exception-de-xu-ly-van-de-cua-rieng-minh-bJzKmGnOl9N#_3-su-dung-services-de-xu-ly-error-message-3