Hello, chào mừng các bạn đã quay trở lại với series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" của mình. Trong những tập trước, ta hay đề cập đến thuật ngữ "CSRF", một số bạn có thể đã biết nhưng có những bạn vẫn chưa nghe từ này bao giờ. Chính vì vậy, ngày hôm nay mình sẽ dành một tập riêng để nói về kiểu tấn công CSRF và cũng như cơ chế bảo mật kiểu tấn công này của Laravel. Nào, chúng ta bắt đầu thôi!

# I. CSRF là gì? (What is CSRF?)
Trước khi bắt đầu, chúng ta sẽ tìm hiểu sơ lược về kiểu tấn công CSRF. CSRF và viết tắt tiếng Anh của "cross-site request forgery" (đại khái nghĩa là "giả mạo yêu cầu trên trang web"). Đây là một loại tấn công sẽ thực hiện các request trái phép thông qua user đã được xác thực (tức là đã đăng nhập trên hệ thống).

Hình thức tấn công rất đơn giản, mình sẽ lấy dẫn chứng cho các bạn dễ hiểu. Ví dụ các bạn có ứng dụng blog, dùng để viết bài, nhật ký... Trong phần admin cpanel, bạn thực thi lệnh xóa bài viết thông qua đường dẫn http://myapp.com/admin/posts/{id}/delete với method `GET` chẳng hạn. Một hacker nào đó vô tình biết được đường dẫn này, hắn sẽ gửi một mail tới cho bạn với nội dung gây tò mò như trúng thưởng, quà tặng... kèm theo một đường dẫn. Nhìn thì có vẻ vô hại, nhưng sau khi click vào link ấy, nó sẽ chuyển hướng đến http://myapp.com/admin/posts/{id}/delete và thực hiện xóa các bài viết nếu như session đăng nhập trong hệ thống vẫn chưa hết hạn. Thử tưởng tượng nếu một hệ thống lớn như ngân hàng, mạng xã hội không có cơ chế bảo mật CSRF và người dùng bị tấn công như vậy thì sẽ nghiêm trọng thế nào? 

Chính vì vậy, mỗi website luôn phải trang bị cơ chế bảo mật kiểu tấn công CSRF này, nếu người dùng không hiểu biết thì sẽ trở thành một hacker gián tiếp, gây ảnh hưởng nghiêm trọng đến hệ thống. 

# II. CSRF Laravel
Laravel dễ dàng bảo vệ ứng dụng của bạn khỏi kiển tấn công CSRF này. Laravel sẽ tự động tạo một "token" cho mỗi phiên hoạt động của người dùng, được quản lý bởi framework. Token dùng để xác minh rằng user đã đăng nhập là user thực sự thực hiện các request tới ứng dụng.

Khi tạo một form HTMl bất kỳ trong Laravel, bạn nên khai báo thẻ `@csrf` để tạo token. Khi đó middleware `VerifyCsrfToken` có thể xác thực request.

```PHP
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```

Middleware `VerifyCsrfToken` đã được thêm trong nhóm middleware `web`, nó sẽ tự động kiểm tra token đầu vào của request khớp với token được lưu trữ trong session.

## 1. CSRF token & Javascript
Theo mặc định thì file `resources/js/bootstrap.js` sẽ lấy token từ thẻ `meta` với name `csrf-token` để đăng ký cho thư viện Axios HTTP. Lúc này mọi request đều được gửi cùng với token.

```PHP:resources/js/bootstrap.js
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
```

Nếu bạn không sử dụng thư viện này, bạn phải cấu hình thủ công. Chẳng hạn nếu bạn sử dụng thư viện Ajax jQuery thay cho Axios HTTP thì có thể làm như sau:

Đầu tiên tạo thẻ `meta` với name là `csrf-token` trong thẻ `head`.

```PHP
<meta name="csrf-token" content="{{ csrf_token() }}">
```

Tiếp đó chỉ việc đăng ký ở file JS:

```Javascript
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```

Như vậy, mỗi lần gửi request với ajax, bạn đã kèm theo token csrf rồi đấy.

Để kiểm chứng bạn có thể tạo một blade view `home` với nội dung sau:

```PHP:/views/home.blade.php
<html>
    <head>
        <title>CSRF Laravel</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
        <form action="/post" method="POST">
            <input type="submit" value="Send">
        </form>

        <script src="https://code.jquery.com/jquery.min.js"></script>
        <script>
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $('form').submit(function(e) {
                e.preventDefault();

                $.ajax({
                    url: '/post',
                    type: 'POST',
                    success: function(res) {
                        console.log(res);
                    } 
                });
            });
        </script>
    </body>
</html>
```

Trong đoạn code trên mình đã khai báo thẻ meta chứa token csrf ở thẻ `head`. Sau đó tạo một form HTML, nhưng không khai báo thẻ `@csrf` đển tạo input token. Về Javascript, mình import thư việc jQuery, thực hiện setup như ở trên rồi thực thi gửi request với ajax đơn giản.

Để test thì chúng ta đăng ký các route sau:

```PHP:routes/web.php
Route::get('/', function () {
    return view('home');
});

Route::post('/post', function () {
    return 'Posted';
});
```

Đây là kết quả sau khi submit form:

![](https://images.viblo.asia/308baffd-99e5-48b4-8d3c-7ea387221c1d.JPG)

## 2. Ngoại trừ các URI khỏi bảo vệ CSRF (Excepting URIs from CSRF protection)
Bạn có thể ngoại trừ URI nào đó không cần đến cơ chế bảo vệ CSRF của Laravel bằng cách liệt kê chúng vào `$except` trong middleware `VerifyCsrfToken`.

```PHP:app/Http/Middlewares/VerifyCsrfToken.php
 protected $except = [
    'stripe/*',
    'http://example.com/foo/bar',
    'http://example.com/foo/*',
];
```

> **Lưu ý:** CSRF protection sẽ tự động tắt khi đang chạy testing (sẽ tìm hiểu ở các tập sau).

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ