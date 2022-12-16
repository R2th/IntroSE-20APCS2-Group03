### Giới thiệu
&nbsp;&nbsp;&nbsp;&nbsp; Xin chào mọi người, trong quá trình làm dự án trước đây với Laravel khi call ajax hay gọi API mình hay dùng theo đường link. Kiểu fix cứng link luôn như sau:

```js
$.ajax({
    type: 'POST',
    url: '/groups/teams/',
    data: data,
    success: function success(data) {
        //
    },
    
```


&nbsp;&nbsp;&nbsp;&nbsp;Điều này rất là khó khăn khi chúng ta bảo trì và nâng cấp.  Vào một  ngày đẹp trời nào đó khi khách hàng yêu cầu chúng ta cần sửa lại đường link URL thành một đường link khác thì lại phải đi tìm tất cả những file có đoạn link giống như vậy để sửa. Như vậy sẽ rất mất thời gian. Vậy giải pháp của chúng ta là gì?

&nbsp;&nbsp;&nbsp;&nbsp;  Để giải quyết vấn đề này thì Laravel đã cung cấp cho chúng ta router name để thay thế. Route name đại diện cho một đường link nào đó mà khi thay đổi link n lần theo khách hàng thì route name vẫn ko cần thay đổi gì cả. Như vậy chúng ra sẽ dễ dàng quản lý các url của một trang web thông qua route name.


&nbsp;&nbsp;&nbsp;&nbsp;  Laravel route name linh hoạt là thế vậy mà chúng ta lại không sử dụng được chúng ở trong javascript. Thật là phí. Giải pháp là gì cho bài toán này???

&nbsp;&nbsp;&nbsp;&nbsp; Để giải quyết bài toán này chúng ta sẽ sử dụng package Ziggy của composer. Nó cho phép chúng ta sử dụng route name trong javascript một cách dễ dàng và sử dụng cũng cực kì dễ dàng là sử dụng như cách mà chúng ta sử dụng như Laravel đang dùng.

### Cài đặt

&nbsp;&nbsp;&nbsp;&nbsp; Để cài đặt chúng ta sử dụng lệnh sau:

```php
   composer require tightenco/ziggy
```

&nbsp;&nbsp;&nbsp;&nbsp; Nếu muốn sử dụng phiên bản khác bạn có thể sử dụng câu lệnh sau:

```php
  composer require tightenco/ziggy v0.5
```

&nbsp;&nbsp;&nbsp;&nbsp; Tiếp theo chúng ta sẽ cấu hình như sau: 
Mở file **config/app.php** Include thư viện này bằng cách thêm dòng này vào **providers**:

```php
  Tightenco\Ziggy\ZiggyServiceProvider::class
```


&nbsp;&nbsp;&nbsp;&nbsp; Tiếp theo chúng ta sẽ mở file layout của chúng ta ra và thêm vào phần head (Trước khi js được biên dịch) của nó như sau:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>@yield('title')</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        @routes
    </head>
    <body>
        //body
    </body>
</html>
```

Vậy là xong. Thật đơn giản. :D

### Sử dụng
&nbsp;&nbsp;&nbsp;&nbsp; Cách gọi và sử dụng thì không khác gì như chúng ta sử dụng trong Laravel cả.
- Với route thường:
```js
$.ajax({
    type: 'POST',
    url: route('teams'),
    data: data,
    success: function success(data) {
        //
    },
    
```
- Có tham số:
```js
$.ajax({
    type: 'POST',
    url: route('teams', {id: 1, group_id: 3}),
    data: data,
    success: function success(data) {
        //
    },
    
```
Hoặc 
```js
  axios.get(route('teams', [10, 12]))
    .then((response) => {
        return response.data;
  });
  
```
Nếu chỉ có một tham số thì ta có thể rút ngắn lại như sau:
```js
  route('teams', 1)
```

### Các Method khác với Ziggy:
&nbsp;&nbsp;&nbsp;&nbsp; Ngoài ra Ziggy còn cung cấp 1 vài phương thức khác giúp chúng ta thuận tiện hơn trong việc xử lý các URL. Một vài method thông dụng như:
- Để lấy được route name hiện tại ta sử dụng:
```js
  route().current()
  // return 'teams'
```
- Để check xem có đang đúng với route mà mình cần không:
```js
  route().current('teams')
  return true
```
- Hoặc đại diện của 1 route:
```js
route().current("teams.*")
// returns true
```
&nbsp;&nbsp;&nbsp;&nbsp; Trên đây mình đã giới thiệu tới các bạn package hỗ trợ viết route name của Laravel trong javascript. Để có được chi tiết hơn các bạn có thể truy cập vào [trang chủ](https://github.com/tightenco/ziggy) của package. Cảm ơn các bạn đã đọc bài của mình. :D


&nbsp;&nbsp;&nbsp;&nbsp;