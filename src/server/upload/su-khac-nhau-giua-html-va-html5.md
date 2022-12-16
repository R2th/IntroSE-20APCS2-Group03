# Sự khác nhau giữa HTML và HTML5
Ngôn ngữ đánh dấu siêu văn bản HTML (Hypertext Markup Language) là một trong những khái niệm cơ bản nhất trong lập trình web, được biết tới là một trong những thành phần không thể thiếu trong mỗi trang web. Trải qua quá trình phát triển mạnh mẽ của các công nghệ làm web, đi cùng với đó là nhu cầu ngày càng cao cũng như độ khó tính của người dùng cũng ngày càng lớn khiến cho HTML cũng liên tục cải thiện và đưa ra các phiên bản hoàn thiện hơn, tích hợp nhiều tính năng hơn để đáp ứng nhu cầu của người dùng.

Tháng 10 năm 2014, HTML5 được ra mắt. Đây được coi là một phiên bản mới, tối ưu hơn, mạnh mẽ hơn, được tích hợp nhiều tính năng hơn so với phiên bản HTML trước đó. Ở bài viết dưới đây, chúng ta hãy cùng đi tìm hiểu điều gì đã giúp cho HTML5 dần dần thay thế cho phiên bản tiền nhiệm của nó.
## Về cấu trúc
1. Dưới đây là cấu trúc cơ bản của HTML
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Guru99 Home</title>
    </head>
    <body>
        <h1>Best Tutorials on Planet</h1>
        <p>Paragraph</p>
    </body>
</html>
```
2. Dưới đây là cấu trúc cơ bản của HTML5
```html
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HTML5 Title</title>
  <meta name="description" content=" HTML5 Title">
  <meta name="author" content="Guru99">
  <link rel="stylesheet" href="/css/styles.css?v=1.0">
</head>
<body>
  <script src="/js/scripts.js"></script>
</body>
</html>
```
## Về các tính năng
![image.png](https://images.viblo.asia/da5033aa-d020-488a-936b-b2e96510dbea.png)
1. Các tính năng của HTML
    * Là một ngôn ngữ độc lập với các nền tảng
    * Không phân biệt chữ hoa, chữ thường
    * Có thể thay đổi màu sắc, font chữ, cỡ chữ, ... bằng cách sử dụng CSS (Cascading Style Sheets)
    * Hỗ trợ hiển thị bảng
    * Xây dựng các trang web bằng cách sử dụng các thành phần, các thẻ.
    * Hỗ trợ hiển thị văn bản bằng nhiều font chữ, kích thước khác nhau.
    * Hỗ trợ sử dụng đồ hoạ.
    * Giúp bạn tạo các link điều hướng
    * Tạo nhiều cửa số trong một trang web
2. Các tính năng của HTML5
    * Hỗ trợ sử dụng Local storage
    * Có thêm các thẻ sematic mới: `<header>`, `<footer>`, `<article>`, `<section>`, `<nav>`, ....
    * Cung cấp các điều khiển mẫu mới như: ngày, lịch, thời ian, URL, email và tìm kiếm
    * Thẻ `<canvas>` giúp cho việc vẽ sơ đồ 2D
    * Hỗ trợ CSS3
    * Có các phương tiện hỗ trợ người dùng
    * Có khả năng xử lý các lỗi cú pháp
    * Có thể lưu toàn bộ dữ liệu mà không ảnh hưởng đến hiệu suất trang web
## Bảng so sánh trực tiếp
Bảng so sánh HTML và HTML5

| HTML  | HTML5  |
| -------- | -------- |
| Khai báo HTML Doctype dài dòng     | Khai báo DOCTYPE trong HTML5 rất đơn giản  |
|Mã hóa ký tự HTML dài hơn |  Khai báo mã hóa ký tự HTML5 rất đơn giản. |
| Âm thanh và video không phải là phần HTML | Âm thanh và video là một phần HTML5 |
| Có thể vẽ vectơ với sự trợ giúp của các công nghệ khác như Silverlight, Flash, VML, v.v | Đồ họa vectơ là một phần của HTML5, ví dụ: canvas, SVG|
|Không thể có được Vị trí địa lý thực tế của một người đang duyệt bất kỳ trang web nào. | JS Geolocation API trong HTML5 cho phép bạn xác định vị trí của người dùng đang duyệt bất kỳ trang web nào.|
| HTML cung cấp bộ nhớ cục bộ thay vì cookie. | Html5 sử dụng cookie để lưu trữ dữ liệu.|
| Trong HTML, không thể vẽ các hình dạng cơ bản. | Trong Html5, có thể vẽ các hình dạng cơ bản.|
|Nó cho phép bạn chạy JavaScript trong trình duyệt. | Nó cho phép bạn chạy mã JavaScript trong nền.|
| Bạn có thể sử dụng HTML với tất cả các trình duyệt cũ. |Bạn có thể sử dụng HTML5 với tất cả các trình duyệt mới.|
| Bạn có thể sử dụng bộ nhớ cache của trình duyệt làm bộ nhớ tạm thời. | Bạn có thể sử dụng ứng dụng (cơ sở dữ liệu và lưu trữ web) Cache làm bộ nhớ tạm thời. |
| Web Socket không khả dụng | Bạn có thể thiết lập các kênh giao tiếp song công với một máy chủ bằng cách sử dụng Web Sockets.
Không có quy trình xử lý các mã HTML không chính xác về mặt cấu trúc. | HTML5 hỗ trợ xử lý lỗi liên tục thông qua quy trình xử lý lỗi ứng biến.|
|HTML ít thân thiện với thiết bị di động hơn. | HTML5 thân thiện với thiết bị di động.|
| Các thuộc tính như async, charset và ping không có trong HTML.| Các thuộc tính async, ping, charset và là một phần của HTML5.|
| HTML không cho phép kéo và thả hiệu ứng | HTML5 cho phép kéo và thả các hiệu ứng.|
| Cung cấp các thuộc tính mới như tabinex, id, tabinex, v.v. | Đây là những thuộc tính nhất định được áp dụng cho các phần tử HTML 5.|


## Các ưu điểm
![image.png](https://images.viblo.asia/823f031c-9f8a-4e1a-8593-ef59dcfc6775.png)
1. Ưu điểm của HTML
    * Dễ dàng sử dụng trong việc phát triển web
    * Dễ dàng tạo tài liệu web
    * Dễ dàng điều hướng trong các trang web và giữa các trang web với nhau
    * Người dùng không thể lưu dữ liệu trong trình duyệt 
2. Ưu điểm của HTML5
    * Có khả năng lưu trữ dữ liệu cũng như tạo ra các SPA
    * Dễ dàng tạo ra một trang web mới
    * Có thể sửa lỗi một cách trực tiếp
    * Doctype và các ký tự được đơn giản hoá
    * Cung cấp các phần tử như: `<details>`, `<dialog>`, `<mark>`, ...
    * Các biểu mẫu của thẻ input được cải thiện
    * Hỗ trợ local storage giúp cho việc phát triển các tính năng dễ dàng hơn mà không cần dùng bên thứ 3
    * Việc đánh dấu được đơn giản hoá
    * Hỗ trợ đồ hoạ 2D và có thể lập trình bằng javascript
    * Cho phép tạo từ vựng của riêng mình
    * Có thể tạo ra các thẻ sematic riêng
    * Hỗ trợ tích hợp nhiều video
    * Với khả năng tương thích với API đã nâng cao khẳ năng trải nghiệm người dùng.
## Các nhược điểm
1. Nhược điểm của HTML
     * Không hỗ trợ tạo các các trang web động
     * Tính năng bảo mật kém
     * Khá tốn thời gian để phát triển các tính năng mới
     * Không tuân theo việc tiếp cận tập trung. Bạn cần chỉnh sửa trang web một các riêng biệt
2. Nhược điểm của HTML5
    * Yêu cầu các trình duyệt hiện đại để có thể hiểu được chúng
    * Có các vấn đề về quyền sử dụng truyền thông
    * Chưa thự sự đáp ứng được tất cả các thiết bị
    * Vẫn đang trong quá trình hoàn thiện và phát triển
    * Việc chơi game gặp khó khăn với JS
    * Không có một IDE nào có sẵn trong HTML5
# Tổng kết
Như vậy, chúng ta đã cùng nhau tìm hiểu được sự khác biệt giữa HTML và HTML5. Mong rằng qua bài viết sẽ giúp bạn học tập cũng như thực hành tốt hơn về công nghệ này.
Link tham khảo: https://www.guru99.com/html-vs-html5.html