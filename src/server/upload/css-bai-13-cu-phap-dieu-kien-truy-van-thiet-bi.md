Trong bài viết này, chúng ta sẽ cùng gặp gỡ cú pháp truy vấn thiết bị trong CSS. Đây là công cụ được thiết kế để giúp chúng ta có thể tạo ra những trang web với thiết kế khả chuyển `responsive`, có khả năng thay đổi phong cách hiển thị để đáp ứng với nhiều thiết bị có kích thước màn hình khác nhau. Hãy cùng thảo luận.

## Sử dụng cú pháp điều kiện

Hãy cùng xem xét một ví dụ dưới đây. Nếu như bạn thu hẹp kích thước cửa sổ trình duyệt
web với độ rộng nhỏ hơn `720px` thì màu nền sẽ hiển thị là màu đỏ `Crimson`, nếu không thì sẽ hiển thị là màu xanh lá `ForestGreen`.

```chameleon.css
h1 {
   color: white;
   line-height: 1.6;
}

@media (max-width: 720px) {
   body {
      background-color: Crimson;
   }
}

@media (min-width: 721px) {
   body {
      background-color: ForestGreen;
   }
}
```

`chameleon.html`
```html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Chameleon</title>
      <link rel="stylesheet" href="chameleon.css">
   </head>
   <body>
      <h1>
         Khi nào thì hiện màu đỏ?<br>
         Khi nào thì hiện màu xanh lá?
      </h1>
   </body>
</html>
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/wvpaajB)

Như bạn đã thấy thì chúng ta có 2 khối `@media` đóng gói một vài luật CSS bên trong. Các khối này có thể được gọi là các luật CSS có điều kiện; Bởi vì code CSS bên trong các khối `@media` sẽ mặc định được vô hiệu hóa trừ khi những điều kiện nhất định được thỏa mãn.

Trong ví dụ ở trên thì điều kiện của khối truy vấn đầu tiên là: Khung hiển thị có chiều rộng không lớn hơn `720px`. Điều kiện của khối truy vấn thứ 2 là: Khung hiển thị có chiều rộng bằng hoặc lớn hơn `721px`.

## Các loại điều kiện truy vấn khác

Bên cạnh việc tạo ra các ràng buộc dựa trên kích thước của khung hiển thị trình duyệt web, chúng ta còn có thêm những lựa chọn khác nữa:

1. Truy vấn theo kiểu thiết bị:
    - `screen` có màn hình hiển thị
    - `speech` hỗ trợ đọc nội dung
    - `print` các thiết bị hỗ trợ lệnh in
    - `all` tất cả các loại thiết bị
2. Truy vấn theo dạng của màn hình hiển thị:
    - `landscape` màn hình ngang
    - `portrait` màn hình dọc

Lấy ví dụ là chúng ta đang xuất bản nội dung của một cuốn sách dưới dạng một trang blog.
Bạn rất có thể sẽ muốn giúp người đọc nội dung của bạn trong thao tác in trang web ra tệp 
PDF bằng cách ẩn đi các thành phần của trang web khi phát lệnh in. Lúc này bạn có thể viết code CSS hướng đến kiểu thiết bị `print` để ẩn đi các thanh điều hướng và quảng cáo. Chúng ta cũng giả định rằng các nội dung sẽ được in ra theo trang sách dọc.

`print.css`
```css
@media print and (orientation: portrait) {
   #topnav,
   #sidenav,
   #adsense {
      display: none;
   }
}
```

## Cùng xây dựng một thanh điều hướng `responsive`

Như đã hứa thì ở phần này của bài viết mình sẽ cùng với bạn đọc xây dựng một thanh điều hướng `responsive` có khả năng thay đổi phong cách hiển thị để đáp ứng với các thiết bị có kích thước màn hình khác nhau. Tuy nhiên để giữ cho nội dung của bài viết được gói gọn trong việc giới thiệu kiến thức nên mình đã di chuyển phần này tới một bài viết riêng. Vì vậy nên bạn hãy duy trì Tab web hiện tại và mở thêm liên kết dưới đây để đi tới bài viết cho thanh điều hướng nhé.

[[HTML + CSS] Xây Dựng Thanh Điều Hướng Responsive](https://viblo.asia/p/html-css-xay-dung-thanh-dieu-huong-responsive-LzD5dRAEZjY)

Bạn đã hoàn thành việc xây dựng thanh điều hướng chưa? :D

Mình biết rằng đó là một công việc không dễ dàng. Chỉ một thanh điều hướng `responsive` đơn giản và chúng ta đã phải viết ~100 dòng code CSS. Nếu như bây giờ mình nói với bạn rằng chúng ta không cần phải viết nhiều code như vậy để có thể thu được kết quả tương tự thì bạn cảm thấy thế nào? :D

Hẹn gặp lại bạn trong bài viết tiếp theo.

[[CSS] Bài 14 - Sử Dụng Framework & Icons](https://viblo.asia/p/css-bai-14-su-dung-framework-icons-eW65Gr2YlDO)