Nếu như bạn đang theo dõi [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m) mà mình đang thực hiện từ đầu cho đến giờ thì hiển nhiên là bạn đã biết sơ sơ jQuery là cái gì rồi. Tuy nhiên thì mình vẫn muốn viết lại một vài dòng giới thiệu để dành cho trường hợp ai đó bất ngờ ghé qua và tham gia vào bài viết của chúng ta tại đây.

## jQuery là cái gì? Tại sao chúng ta nên sử dụng nó?

jQuery là một thư viện JavaScript được thiết kế để đơn giản hóa việc viết code tương tác với trình duyệt web và văn bản HTML.

Để bắt đầu sử dụng jQuery, chúng ta cần nhúng tệp `jquery.min.js` vào phía trên các tệp JavaScript khác mà chúng ta sẽ viết với sự hỗ trợ của thư viện này.

```jquery.html
<!doctype html>
<html>
<head>
   <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
   <title>Hello, jQuery !</title>
    
   <link rel="stylesheet" href="style.css">
</head>
<body>
   <h1>Hello, jQuery !</h1>

   <script src="https://code.jquery.com/jquery-3.6.0.min.js"
           integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
           crossorigin="anonymous">
   </script>
   <script src="main.js"></script>
</body>
</html>
```

Như bạn thấy thì tệp `jquery.min.js` trong code phía trên được lưu trữ ở đâu đó trên mạng internet. Vì một số tính năng bảo mật của trình duyệt web nên chúng ta có thêm các thuộc tính bổ trợ khá dài dòng ở thẻ `<script>`. Bạn có thể tải về tệp `jquery` và đặt cạnh tệp `main.js` để code trông gọn gàng hơn nếu muốn. :D

## Tìm hiểu về các tính năng của jQuery ở đâu?

Từ trang web chính thức của thư viện này - [jQuery.com](https://api.jquery.com/)

Chắc chắn là như vậy rồi. Cũng giống với `Sub-Series Bootstrap`, chúng ta sẽ không tạo ra một bộ tài liệu khác của jQuery ở đây. Thay vào đó thì mình sẽ cùng bạn tìm hiểu tổng quan về bộ tài liệu chính thức của jQuery và áp dụng để viết code xử lý cho `dropdown` và `carousel` mà chúng ta đã xây dựng từ trước đó.

![](https://images.viblo.asia/4eb0b925-e073-42fe-92e4-4d14178589ff.png)

Ở đây chúng ta vẫn có một thanh điều hướng phía bên trái liệt kê một danh sách các hàm chức năng của jQuery được chia thành rất nhiều nhóm. Tuy nhiên, tổng quan tính năng của thư viện này thì như mình đã nói trước đó, là jQuery được thiết kế để đơn giản hóa các thao tác xử lý với văn bản HTML và trình duyệt web, và chỉ có vậy thôi:

- Chọn các phần tử HTML cần xử lý
- Thay đổi giá trị nội dung, thuộc tính HTML của các phần tử
- Thay đổi các giá trị thuộc tính CSS của các phần tử
- Hỗ trợ nhanh chóng tạo ra các hiệu ứng chuyển tiếp
- Gắn các hàm xử lý sự kiện cho các phần tử
- Tương tác với cửa sổ trình duyệt web
- Gửi yêu cầu truy vấn thêm dữ liệu tới máy chủ web

Đối với mỗi cái gạch đầu dòng phía trên thì chúng ta sẽ làm một phần thảo luận về các hàm hỗ trợ phổ biến nhất. Sau đó thì chúng ta sẽ áp dụng để viết lại code xử lý cho `dropdown` và `carousel` mà chúng ta đã xây dựng trước đó.

Sẵn sàng nhé. Hẹn gặp lại bạn trong bài viết tiếp theo.

[[jQuery] Bài 2 - Các bộ chọn & Thao Tác Cơ Bản](https://viblo.asia/p/GrLZDrwg5k0)