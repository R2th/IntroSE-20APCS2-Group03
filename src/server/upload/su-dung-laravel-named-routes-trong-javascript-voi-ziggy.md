# Giới thiệu
* Laravel cung cấp cách linh hoạt để truy cập URL bằng cách sử route name. Vì vậy chúng ta có thể sử dụng 1 URL nào đó bằng cách gọi tên của nó và khi chúng ta muốn thay đổi lại URL thì chỉ cần thay đổi trong web.php giúp dể dàng quản lý và chỉnh sửa.
* Nhưng đối với URL được sử dụng trong file javascript thì sao? Làm sao để đồng bộ URL trong file javascript và trong laravel?
* Có rất nhiều cách để giải quyết vấn đề này. Hôm nay mình sẽ hướng dẩn các bạn cách sử dụng ziggy trong laravel. Vậy ziggy là gì?
* Ziggy là 1 package cho phép sử dụng route name trong javascript (nghĩ mãi mới ra được cái khái niệm này :)).
## 1. Installs
Cài đặt Ziggy vào project vô cùng đơn giản
* Chạy dòng lệnh bên dưới và composer sẽ cài phiên bản ziggy mới nhất.
```
composer require tightenco/ziggy
```
* Bạn củng có thể chọn phiên bản ziggy muốn cài đặt bằng cách thêm version khi cài.
```
composer require tightenco/ziggy v0.5
```
Trong file config/app.php Hãy include thư viện sau vào 
**providers**
```
Tightenco\Ziggy\ZiggyServiceProvider::class
```
Thêm @routes ở bất  kì đâu trong template của bạn trước khi javascrip được biên dịch, nên để luôn trong header.
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @routes()
    {{ Html::style('/css/app.css') }}
    {{ Html::script('/js/app.js') }}
</head>
```
## 2. Usage
1. Với route không có tham số.
```
Route::get('/posts-url', function () {
    ...
})->name('posts');
```
Cách gọi route trong javascript.
```
route('posts')
```

2. Với route có tham số.
```
Route::get('/posts-url/{id}', function () {
    ...
})->name('posts');
```
Cách gọi route trong javascript.
```
route('posts', {id: 1})
```
hoặc
```
route('posts', [1])
```
hoặc
```
route('posts', 1)
```
3. Với route có nhiều tham số.
```
Route::get('/categories/{category_id}/posts/{post_id}', function () {
    ...
})->name('categories.posts');
```
Cách gọi route trong javascript.
```
route(categories.posts', {category_id: 1, post_id: 2})
```
hoặc
```
route('categories.posts', [1, 2])
```

# Kết luận.
> Bạn có thể tìm hiêu thêm tại https://github.com/tightenco/ziggy

Lần đầu làm chuyện ấy nên bài viết có gì sơ sót mong mọi người bỏ qua. :v