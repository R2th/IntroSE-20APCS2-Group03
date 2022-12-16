Hầu hết các ứng dụng Laravel có rất nhiều views. Một ứng dụng nhỏ sẽ không xảy ra vấn đề gì cả, tuy nhiều nếu dự án lớn dần theo thời gian, chúng ta sẽ gặp bế tắc trong việc tổ chức và sắp xếp các view trong dự án một cách dễ quản lý.
Mình cũng như các bạn, mình đã thử rất nhiều kiểu cấu trúc thư mục khác nhau, tuy nhiên mình đã tìm ra được câu trả lời cho mình.
![](https://images.viblo.asia/2ef03f80-8fc4-4982-99fb-07d4385d02cd.jpg)

Cấu trúc thư mục tham khảo:
```
resourses/
├─ views/
│  ├─ account/
│  │  ├─ create.blade.php
│  │  ├─ edit.blade.php
│  │  ├─ layout.blade.php
│  │  ├─ show.blade.php
│  ├─ components/
│  ├─ layout/
│  │  ├─ footer.blade.php
│  │  ├─ head.blade.php
│  │  ├─ header.blade.php
│  │  ├─ sidebar.blade.php
│  ├─ master.blade.php
```
Việc sắp xếp thư mục Views của mình tương đối đơn giản. Ta có một số thư mục như `layout` và file `master.blade.php` để khai báo khung cho giao diện, và các thư mục để quản lý khác như `account`,  ...

## Layout master
Có một tệp layout.blade.php trong thư mục gốc của các chế độ xem web và đây là khung HTML cho tất cả các tệp khác.
Hãy tạo một file `layout.blade.php` ngay trong thư mục `views` , đây sẽ là layout cho tất cả các view trong ứng dụng.
Trong file này, mình sẽ khai báo các khung HTML cơ bản như `<head>`, `body` cùng các thành phần `header`, `footer`. Đồng thời mình cũng sẽ tạo thư mục `layout`  và đưa các thành phần như  `<head>`, `<header>`, `<footer>` ra riêng từng file để dễ quản lý.
Cấu trúc hiện tại:
```
resourses/
├─ views/
│  ├─ layout/
│  │  ├─ footer.blade.php
│  │  ├─ head.blade.php
│  │  ├─ header.blade.php
│  │  ├─ sidebar.blade.php
│  ├─ master.blade.php
```
Nội dung của `layout.blade.php`:
```
<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    @include('layout.head')
</head>
<body>
<header>
    @include('layout.header')
</header>
<main>
    @include('layout.sidebar')
    @yield('main')
</main>
<footer>
    @include('layout.footer')
</footer>
</body>
</html>
```
Bạn cũng có thể bổ sung các `@stack` như `head-css`, `head-js`, `footer-js` để tiện mở rộng sau này.
## Các thư mục quản lý nội dung
Bây giờ mình sẽ tạo thêm các thư mục tương ứng với các thành phần mà mình sẽ quản lý, ví dụ như `account`. Bạn nên cấu trúc thư mục view như thư cấu trúc route để dễ tìm và debug khi cần nhé.
```
// routes/web.php
Route::get('account/{account_id}', 'AccountController@show')->name('account.show');
```
```
// AccountController.php
public function show(Account $account)
{
    return view('account.show', ['account' => $account]);
}
```
Bây giờ ta hãy cấu trúc thư mục các view quản lý `account` như sau:
```
resourses/
├─ views/
│  ├─ account/
│  │  ├─ create.blade.php
│  │  ├─ edit.blade.php
│  │  ├─ layout.blade.php
│  │  ├─ show.blade.php
```
Tất nhiên file `account/layout.blade.php` sẽ extend file `master.blade.php` và bổ sung vào các mục cần thiết của trang quản lý `account`:
```
@extends('master')

@section('main')
    <h2>Quản lý tài khoản</h2>
    @yield('content')
@endsection
```
Các trang còn lại như `show.blade.php`, `edit.blade.php`, ... chỉ cần thực hiện extend file `account/layout.blade.php`:
```
@extends('account.layout')

@section('content')
    <h3>Thông tin tài khoản</h3>
   // Display something
@endsection
```
# Thư mục `components`
Theo mặc định, Laravel sẽ tìm các component bên trong thư mục `resource/views/components`. Mình xem các component là các view độc lập, có thể chèn vào bất cứ đâu mà bằng cú pháp `<x-component-name>`. Các bạn có thể tìm hiểu thêm về cách sử dụng [Component](https://laravel.com/docs/8.x/blade#components) tại trang chủ Laravel.
# Front-end và Back-end
Đôi khi bạn sẽ cần phân biệt giữ người dùng và quản trị viên. Đơn giản thôi, chỉ cần tạo các thư mục tương ứng với mỗi role, và tổ chức bên trong như ở trên.
```
resouces/
├─ views/
│  ├─ admin/
│  │  ├─ account/
│  │  ├─ layout/
│  │  ├─ post/
│  │  ├─ master.blade.php
│  ├─ user/
│  │  ├─ account/
│  │  ├─ layout/
│  │  ├─ post/
│  │  ├─ master.blade.php
```
Nếu bạn thấy bài viết hữu ích, hay clip lại nhé! Happy coding 😁

Xem thêm các bài viết của tác giả tại blog [Heliotech](https://heliotech.me)