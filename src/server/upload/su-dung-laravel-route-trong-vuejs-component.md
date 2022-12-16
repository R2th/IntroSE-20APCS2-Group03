Như các bạn đã biết Laravel có thể định dang cho route và phương thức `route('{route-name}')` để gọi đến những route tương ứng, điều này giúp ích rất nhiều khi mà bạn muốn đổi địa chỉ đường dẫn hay đổi phương thức xử lý cho đường dẫn bạn sẽ không phải mất công tìm đến từng nơi mình đã gọi đến route đó để sửa, trừ khi bạn sửa luôn lại cả định danh.

Bây giờ thì cùng bắt tay đi xây dựng một hệ thống để có thể truy cập đến route bên laravel dựa vào định danh bên Vue nhé.

*Ý tưởng đơn giản sẽ như thế này, đầu tiên bạn chỉ cần list tất cả các route theo định danh của nó bên laravel, ném nó sang bên js. Tại js mình sẽ viết một hàm route hoặc bạn có thể đặt tên nó là bất kì cái gì khác để xử lý khi truyền vào là tên route bạn sẽ lấy ra được đúng route tương ứng từ trong cái list mà bạn đã ném từ Laravel sang.*
## Sinh ra một danh sách định danh của các route bên Laravel

Khi người dùng gọi đường link trên URL, laravel sẽ chuyển đến `RouteServiceProvider` và xử lý tìm kiếm các route trong những file tại thư mục `routes`. Sau đó xử lý phần luồng trong `controller` hoặc thực hiện hành động đã được định nghĩa luôn trong route đó.

Rồi, tiếp tục, khi làm một project laravel kết hợp với VueJS thường chúng ta sẽ thiết lập các route bên web như sau
```routes/web.php
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
```
Như vậy có nghĩa là khi truy cập đến mọi đường dẫn Laravel cũng sẽ đưa bạn bề view xây dựng ở file `resources/view/app.blade.php`.

Vì vậy để nhét được bất kì thông tin gì từ laravel xuống bên javascript thì mình có thể xử lý ở file blade này.

Ví dụ nhé bạn có một thằng `$a` được sử dụng bên laravel cần vứt xuống để cho javascript cũng có thể lấy giá trị và sử dụng được thì bạn sẽ khai báo một biến `var a` và encode nó ra trong script và đoạn script này cần khai báo trước khi khai báo các file hoặc đoạn js mà bạn cần sử dụng đến biến `a` này.

Quay lại vấn đề, mình cần generate ra một danh sách gồm route và định danh của nó để đưa xuống js. Nhưng đã nói ở trên thì file `app.blade.php` chính là file mà các component vue được import vào:

```app.blade.php
<div id="app">
</div>
<script>
    window.Laravel = {!! json_encode([
        'csrfToken' => csrf_token(),
        'baseUrl' => url('/'),
        'routes' => collect(\Route::getRoutes())->mapWithKeys(function ($route) { return [$route->getName() => $route->uri()]; })
    ]) !!};
</script>
<script src="{{ asset('js/app.js') }}"></script>
```

Như vậy biến `window.Laravel.routes` đã có thể sử dụng được trong các file `js`.
## Tạo một helper để generate route
Từ routes nhận được trong biến `window.Laravel.routes` cần xây dựng một function helper để khi truyền vào định danh của route sẽ trả về đường link của route đó.

Tạo một file `route.js`để xây dựng funcion helper.
```route.js
var routes = window.Laravel.routes
module.exports = function () {
    var args = Array.prototype.slice.call(arguments);
    var name = args.shift();
    if (routes[name] === undefined) {
        console.error('Route not found ', name);
    } else {
        return window.Laravel.baseUrl + '/' + routes[name]
            .split('/')
            .map(s => s[0] == '{' ? args.shift() : s)
            .join('/');
    }
};
```

Trong đoạn code trên mình sẽ lấy thành phần đầu tiên được truyền vào funtion, mình sẽ quy định đây chính là định danh của route, nếu không tìm thấy key này trong mảng `routes` thì sẽ thông báo cho người dùng bằng việc console.

Ngược lại sẽ lấy giá trị đường link của routes nối với base URL cũng được truyền từ laravel xuống js tương tự như routes. Đối với những route có tham số truyền vào, các tham số sẽ được lần lượt truyền vào funtion này theo thứ tự và cách nhau bởi dấu `,`. 
Đoạn code
```
 .map(s => s[0] == '{' ? args.shift() : s)
 .join('/');
```
có nhiệm vụ xử lý nếu thành phần của route có dạng `{...}` (truyền biến) thì sẽ thay thế thành phần này bằng lần lượt từng biến được truyền vào trong hàm.

Bây giờ trong file `app.js` (chỗ để khởi tạo vue app) bạn chỉ cần gọi hàm này
```app.js
window.route = require('./route');
```

Bây giờ bạn chỉ cần sử dụng nó dưới cấu trúc
`route(‘post.index’)` hoặc `route(‘post.update’, this.post.id)` vậy là được rồi.

Thật ra ngoài những packgage có sẵn bạn cũng có thể thử xây dựng cho mình một hệ thống route như thế này để hiểu sâu hơn về cách hoạt động của nó.

Chúc bạn thực hiện thành công !
### Tài liệu tham khảo
> https://medium.com/@sargilla/laravel-named-routes-in-vue-js-components-7b03e96bede8