Hi mọi người, bài viết này mình sẽ chia sẻ cách cài đặt bootstrap 5 trong angular 13.<br>
Như các bạn biết, bootstrap là một framwork phổ biến giúp phát triển các trang web của bạn có thể tương thích trên tất các thiết bị di động như iphone, ipad, laptop ....<br>
Bootstrap cung cấp một số class để tạo trang web đáp ứng cho các thiết bị di động của bạn.<br>

> Ví dụ 1

<br>
Trong ví dụ này bạn cần cài đặt bootstrap trên angular 13 và import file css của bootstrap vào file styles.css, cái này chỉ dùng cho việc import file css nhé.<br>

```
npm install bootstrap --save
```

Tiếp tục, bạn cần import file css bootstrap của mình vào tệp style.css như sau:<br>
**src/style.css**<br>
```
@import "~bootstrap/dist/css/bootstrap.css";
```

Bây giờ bạn có thể sử dụng các class trong thư viện bootstrap trong ứng dụng angular 13.<br><br>

> Ví dụ 2

<br>
Trong ví dụ này, bạn sẽ cài đặt bootstrap với jquery và popper js. Theo cách này, bạn cũng có thể import các files thư viện bootstrap css và bootstrap js.<br>
Bạn hãy chạy commands bên dưới:<br>

```
npm install bootstrap --save
```
```
npm install jquery --save
```
```
npm install popper.js --save
```

Sau khi chạy thành công lệnh trên, bạn hãy import nó vào file angular.json<br>
**angular.json**<br>
```
....
      "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "src/styles.css"
      ],
      "scripts": [
          "node_modules/jquery/dist/jquery.min.js",
          "node_modules/bootstrap/dist/js/bootstrap.min.js"
      ]
.....
```
Bây giờ, bạn có thể sử dụng css của bootstrap như bên dưới: <br>
**src/app/app.component.html**<br>
```html
<div class="container">
  <h1>Install Bootstrap 5 in Angular 13 - ItSolutionStuff.com</h1>
  
  <div class="card">
    <div class="card-header">
      Featured
    </div>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>
```

> Chạy ứng dụng angular

<br>

Sau khi tất cả các bước đã hoàn thành, bạn chạy command bên dưới để chạy ứng dụng angular nhé:<br>

```
ng serve
```

Bây giờ, hãy truy cập trình duyệt web của bạn, nhập URL đã cho và xem đầu ra ứng dụng:<br>
```
http://localhost:4200
```
Output:<br>
![](https://images.viblo.asia/feefe0c0-da88-4333-8abd-78d8d4af2a78.png)


Hy vọng bài viết này giúp ích cho bạn!