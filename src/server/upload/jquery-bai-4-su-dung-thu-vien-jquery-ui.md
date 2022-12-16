Trong khi `jQuery` là một thư viện cung cấp các hàm tiện ích, chủ yếu để giúp chúng ta đơn giản hóa việc thể hiện các thao tác cần thực hiện trong code JavaScript khi làm việc với các phần tử HTML và trình duyệt web; Thì `jQuery UI`, ở một khía cạnh khác, lại là một thư viện cung cấp các thành phần giao diện người dùng mang tính tiện ích bổ trợ `widget` cho các giao diện web. Các `widget` này có thể được sử dụng xen lẫn với các thành phần giao diện người dùng chính `component` do các `framework` như `Bootstrap` cung cấp.

## Tải về & Tài liệu sử dụng

Cũng giống với việc sử dụng jQuery, chúng ta có thể xuất phát từ trang chủ [https://jqueryui.com/](https://jqueryui.com/) của thư viện mới để tìm hiểu về các thành phần được cung cấp ở đây. Bạn có thể tải về tệp [jqueryui.min.js](https://code.jquery.com/ui/1.13.1/jquery-ui.min.js)  hoặc trỏ liên kết tham chiếu `src` của thẻ `<script>` tới thẳng địa chỉ tải về phiên bản jQuer UI mới nhất của [code.jQuery.com](https://releases.jquery.com/ui/).

```learn.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>jQuery UI</title>
   <link rel="stylesheet" href="/asset/style.css">
</head>
<body>
   <h1>jQuery UI</h1>

   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>
   <script src="/asset/main.js"></script>
</body>
</html>
```

Về tổng quan, [tài liệu của thư viện jQuery UI](https://api.jqueryui.com/) gồm các nhóm nội dung chính -

- Các thành phần tạo giao diện người dùng - [chỉ mục Widgets](https://api.jqueryui.com/category/widgets/).
- Các danh sách `class CSS` và `icons` để tham khảo và ghi đè thuộc tính hiển thị - [chỉ mục Theming](https://api.jqueryui.com/category/theming/).
- Các thành phần tạo tính tương tác với người dùng - [chỉ mục Interactions](https://api.jqueryui.com/category/interactions/).
- Các phương thức tạo hiệu ứng chuyển tiếp - [chỉ mục Effect Core](https://api.jqueryui.com/category/effects-core/) và [chỉ mục Effects](https://api.jqueryui.com/category/effects/).

Đối với nhu cầu tự tạo và chia sẻ các `widget` thì bạn có thể tham khảo thêm các chỉ mục hỗ trợ bao gồm -

- Các công cụ cơ bản để khởi tạo `widget` - [chỉ mục Utilities](https://api.jqueryui.com/category/utilities/).
- Một số phương thức tiện ích để làm việc với các phần tử HTML - [chỉ mục Methods](https://api.jqueryui.com/category/methods/) và [chỉ mục Methods Overrides](https://api.jqueryui.com/category/overrides/).

## Thử sử dụng một Widget của jQuery UI

Sau khi chọn một `widget` trong [chỉ mục Widgets](https://api.jqueryui.com/category/widgets/), chúng ta sẽ có một trang tài liệu rất dài với khu vực liên kết `QuickNav` để di chuyển nhanh tới các phần nội dung. Và ở ngay bên dưới là code ví dụ đơn giản nhất bao gồm những thành phần thiết yếu để `widget` có thể hoạt động được.

![](https://images.viblo.asia/ac24a0e5-89b4-465e-963f-f5c10287b34d.png)

```accordion.html
<div id="accordion">
   <h3>Tiêu đề đầu tiên</h3>
   <div>Khung nội dung thứ nhất</div>
   <h3>Tiêu đề thứ hai</h3>
   <div>Khung nội dung thứ hai</div>
    <h3>Tiêu đề thứ ba</h3>
    <div>Khung nội dung thứ ba</div>
    <h3>Tiêu đề thứ tư</h3>
    <div>Khung nội dung thứ tư</div>
    <h3>Tiêu đề thứ năm</h3>
    <div>Khung nội dung thứ năm</div>
   </div>
</div>
```

`accordion.js`
```js
$( "#accordion" ).accordion();
```

Sau khi copy/paste phần code ví dụ thì chúng ta thu được kết quả hiển thị đơn giản như thế này.

![](https://images.viblo.asia/fd1f8077-c794-4372-b953-42f4a0098088.png)

Lúc này chúng ta đã có thể click chuột vào các tiêu đề để mở xem khung nội dung tương ứng. Khi chọn mở một khung nội dung nào đó thì các khung nội dung khác sẽ tự động được thu lại và ẩn đi, và như vậy là `accordion` đã hoạt động tốt. :D

Để viết code CSS cho thành phần này, chúng ta có thể xuất phát từ bộ chọn `#accordion` trong code HTML ví dụ; Hoặc cuộn trang tài liệu xuống một chút thì chúng ta sẽ có mục `Theming` của `widget` này, liệt kê các `class` sẽ được tạo ra bởi code JavaScript của jQuery UI. Chúng ta cũng có thể xem các `class` này bằng cách xem cấu trúc của văn bản HTML trong cửa sổ `Elements` bên cạnh `Console`.

![](https://images.viblo.asia/52d26ddc-4a08-47da-bd57-56ecbf1d9b00.png)

Như vậy chúng ta đã có thể bắt đầu viết code CSS để `widget` phù hợp với thiết kế web muốn sử dụng.

```accordion.css
.ui-accordion {
   font-family: 'Times New Roman', Times, serif;
}

.ui-accordion-header {
   font-size: 24px;

   background: royalblue;
   color: white;

   padding: 12px 15px;
}

.ui-accordion-content {
   font-size: 18px;
   line-height: 1.5;

   border: 1px solid lightgray;

   padding: 12px 24px;
}
```

![](https://images.viblo.asia/e4c93ff9-7489-4592-9771-6e872440aad3.png)

Như vậy là chúng ta đã có được một thành phần hiển thị nội dung dành cho các bài viết dài và các chỉ mục có sự nối tiếp tương quan. So với `accordion` mà Bootstrap cung cấp, `widget` của jQuery UI có cấu trúc HTML đơn giản hơn khá nhiều bởi vì được xây dựng xoay quanh tính năng chính là `đóng/mở` các khung nội dung tương quan. Bootstrap, ở mặt khác lại cố gắng cung cấp dạng mẫu hoàn chỉnh ngay từ đầu và xử lý nhiều vấn đề liên quan như phong cách hiển thị mặc định. Cả jQuery UI và Bootstrap đều không ràng buộc chúng ta về tên thẻ HTML sử dụng và bạn có thể sử dụng các cấp tiêu đề khác cho các thanh điều khiển `accordion`.

Về mặt tùy chỉnh hiệu ứng chuyển tiếp `đóng/mở` thì vẫn trong trang tài liệu của `accordion` còn có hạng mục `Options` có một phần nói về phương thức để tùy chỉnh `animations`. Để tùy chỉnh logic hoạt động tương quan giữa các thành phần thì chúng ta có khung nội dung `Methods` và `Events`. Tất cả đều được liệt kê tổng quan trong khung `QuickNav` mở đầu.

## Tạo bộ code tải về kèm sẵn Theme

Đối với một số thành phần tạo giao diện người dùng có nhiều thành phần nhỏ và logic hoạt động phức tạp, việc viết code CSS để ghi đè lại phong cách hiển thị có thể sẽ hơi bất tiện. Vì vậy nên jQuery UI có cung cấp thêm cho chúng ta một phần mềm [Theme Roller](https://jqueryui.com/themeroller/) trên giao diện web của họ.

![](https://images.viblo.asia/6aaf885b-50e8-44ec-bed6-70b175a16a91.png)

Ở đây chúng ta có thể tự cấu hình một `theme` với tone màu riêng phù hợp với thiết kế web đang có để sử dụng. Sau đó chọn `Download Theme` để tải về.

![](https://images.viblo.asia/57ef99cd-ceff-4331-a203-cbbdf75588bc.png)

## Kết thúc bài viết

Như vậy là chúng ta đã có phần giới thiệu tổng quan về thư viện jQuery UI. Thư viện này thực sự rất dễ sử dụng và tùy biến, với nhiều `widget` tiện ích có thể giúp chúng ta nhanh chóng tích hợp một tính năng tương tác với người dùng vào trong một thành phần nào đó của trang web.

Trong bài tiếp theo, chúng ta tìm hiểu cách viết một `plug-in` đơn giản với jQuery. :D

[[jQuery] Bài 5 - Cách Viết Một Plug-in Đơn Giản](https://viblo.asia/p/aWj53x9pK6m)