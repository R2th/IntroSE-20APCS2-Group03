## Giới thiệu
Ở phần 1, chúng ta đã đi qua 11/23 câu lệnh `php artisan make:xxx` vô cùng tiện lợi trong quá trình làm việc. Tiếp nối ở phần 2, tôi sẽ liệt kê những câu lệnh còn lại cùng options của chúng nhé. Let's go!!!

### 12. make:mail
Để tạo 1 mailable bạn sử dụng lệnh:
```
php artisan make:mail OrderStatus
```
Mặc định file này sẽ được lưu trong thư mục `app/Mail`

**Parameters:**
- Bạn có thể sử dụng markdown template của laravel bằng cách thêm tham số
```
--markdown=file_view_path
example: php artisan make:mail OrderStatusMarkdown --markdown=mails.markdown.order

//or
-m file_view_path
```
- Tạo 1 mailable mới mặc dù nó đã tồn tại
```
--force

//or
-f
```

### 13. make:notification

Để tạo 1 notification bạn sử dụng lệnh:
```
php artisan make:notification InvoicePaid
```
Mặc định file này sẽ được lưu trong thư mục `app/Notifications`

**Parameters:**
- Bạn có thể sử dụng markdown template của laravel bằng cách thêm tham số
```
--markdown=file_view_path

//or
-m file_view_path
```
- Tạo 1 notification mới mặc dù nó đã tồn tại
```
--force

//or
-f
```

### 14. make:provider

Tạo 1 lớp service provider mới bằng lệnh
```
php artisan make:provider DuskServiceProvider
```
**Parameters:** không có.

### 15. make:test

Tạo 1 test trong thư mục `tests/Feature` bằng lệnh
```
php artisan make:test UserTest
```
**Parameters:**
Tạo 1 test trong thư mục Unit
```
--unit
```

### 16. make:channel

Để tạo 1 class channel cho việc xử lý broadcasting, ta sử dụng lệnh:
```
php artisan make:channel OrderChannel
```
**Parameters:** không có.

### 17. make:exception
Với laravel, ta có thể tự tạo 1 exception bằng lệnh:

```
php artisan make:exception UserNotFoundException
```
**Parameters:**
- Tạo 1 Custom Exception với method `render()`
```
--render
```
- Tạo 1 Custom Exception với method `report()`
```
--report
```
Bạn có thể sử dụng 2 params này cùng lúc trong câu lệnh.

### 18. make:factory
Tạo 1 class model factory bằng lệnh:
```
php artisan make:factory PostFactory
```
**Parameters:**
- Để chỉ định 1 model được sử dụng trong factory
```
--model=Post
```

### 19. make:factory
Tạo 1 class observer bằng lệnh:
```
php artisan make:observer PostObserver
```
**Parameters:**
- Chỉ định 1 model mà observer sẽ áp dụng bằng cách thêm param:
```
--model=Post
```

### 20. make:rule
Chúng ta có thể tạo 1 rule mới cho việc validate với câu lệnh:
```
php artisan make:rule Uppercase
```
**Parameters:** không có.

### 21. make:resource
Việc tạo API resource với các phương thức có sẵn sẽ trở nên nhanh chóng với câu lệnh:
```
php artisan make:resource PostResource
```
**Parameters:**
- Với API resource thì không thể thiếu resource collection:
```
--collection=Post
```
Param này cho phép câu lệnh tạo thêm cả file resource collection cho việc response data structure API.
### 22. make:cast
Từ laravel 7.x, ngoài các kiểu dữ liệu thông thường khi cast model, chúng ta có thể tạo custom cast tùy theo yêu cầu của bài toán
```
php artisan make:cast JsonCaster
```
**Parameters:** không có.
### 23. make:component
Trước đây, laravel đã cung cấp tính năng component ở blade view. Kể từ bản 7.x, việc xử lý và sử dụng Component càng trở nên thuận tiện và mạnh mẽ hơn với class Component:
```
php artisan make:component Profile
```
**Parameters:**
- Trong view component class, mặc định render giao diện sử dụng method `view()`, nếu không thích chúng ta cũng có thể viết trực tiếp code HTML trong class với param:
```
--inline
```
## Tổng kết
Trên đây mình đã liệt kê danh sách câu lệnh `php artisan make:xxx` có sẵn trong Laravel. Hy vọng sẽ giúp ích cho các bạn trong quá trình học tập và làm việc. Cảm ơn các bạn đã đọc bài ;) 

Nguồn:
- https://quickadminpanel.com/blog/list-of-21-artisan-make-commands-with-parameters/