##### Nếu bạn mới chuẩn bị bắt đầu bước đầu tiên làm quen với `hacking` thì bài viết đầu tiền trong seri này rất cần thiết với bạn. Nó sẽ giúp bạn hiểu được `internet` hoạt động như thế nào.
Chúng ta có thể mô tả một cách tổng quan rằng  internet là một hệ thống các thiết bị thông tin được kết nối với nhau và có thể gửi `tin nhắn` cho nhau. Một số các thiết bị chỉ có phép nhận các loại `message` nhất định, một số thì chỉ nhận `message` từ 1 danh sách các thiết bị được xác định. Nhưng tất cả các hệ thống trên `internet` đều có 1 địa chỉ ip mà mọi người đều có thể gửi `message` đến. Và các hệ thống này sẽ xác định những điều cần làm với các `message` này và cách phản hỏi lại chúng cho người gửi.
- Để các hệ thống khác nhau có thể xác định được cấu trúc của các `message` này để xử lý thì chúng sẽ sử dụng các giao thức chung. Ví dụ như giao thức `HTTP` và `HTTPS` định nghĩa giao thức mà các trình duyệt `internet` của bạn giao tiếp. Ví khi trình duyệt của bạn và máy chủ web đồng ý sử dụng giao thức này thì chúng có thể giao tiếp với nhau.
-  Khi mà bạn gõ địa chỉ `http://www.google.com` vào trình duyệt của bạn thì các bước sẽ được thực hiện như sau:
    -  Trình duyệt của bạn sẽ lấy ra `domain name` của trang web từ `url` là : `google.com`
    -  Máy tính của bạn sẽ gửi yêu cầu `DNS` đến máy chủ được cài làm `DNS severs` của bạn. `DNS` sẽ giúp máy bạn phân giải `domain name` thành địa chỉ IP : `216.58.201.228:80`
    -  Máy tính của bạn sẽ cố gắng cài đặt một kết nối `TCP` đến địa chỉ IP này trên cổng 80 (cổng mặc định sử dụng cho giao thức HTTP). ( Bạn có thể thử tự tạo kết nối TCP bằng cách chạy lệnh `nc 216.58.201.228 80` trên `teminal`.
    -  Nếu thành công thì trình duyệt sẽ gửi 1 `HTTP request` đại loại như:
         ```
         GET / HTTP/1.1
        Host: www.google.com
        Connection: keep-alive
        Accept: application/html, */*
         ```
     - Sau đó nó sẽ đợi 1 phản hồi từ server kiểu như:
          ```
        HTTP/1.1 200 OK
        Content-Type: text/html
        <html>
        <head>
        <title>Google.com</title>
        </head>
        <body>
        ...
        </body>
        </html>
          ```
     - Sau đó trình duyệt sẽ phân tích và render các tài nguyên được trả về như `HTML`, `CSS`, và `Javascript` thành trang web hiện thị cho người dùng.
     - Ngoài ra các `request` này còn có các `method` (phương thức) khác nhau. Ví dụ như Post, Get, Put, ...
         - Get: Truy xuất các thông tin tài nguyên được xác định theo yêu cầu.
         - Head: Tương tự như Get nhưng server sẽ không trả về `request body` trong `response`.
         - Post: Thường được sử dụng để gọi đến các chức năng để tạo 1 cái gì đó ví dụ như tạo comment trong các bài đăng, tạo tài khoản người dùng, ... Tất nhiên các hành động này có thể server sẽ không thực hiện nếu như xảy ra lỗi hoặc không có quyền từ phía người dùng,...
         - Put: Phương thức này thường được dùng để gọi các chức năng dùng để chỉnh sửa các nguồn tài nguyên có sẵn.
         - Delete: Như tên gọi phương thức này để xóa một tài nguyên xác định trên server.
         - Trace: Đây là một phương thức không phổ biến giúp client xem được những gì máy chủ trả về, và sử dụng để kiểm tra và chuẩn đoán thông tin.
         - Connect: Thực sự dùng để sử dụng riêng với proxy.
         - Options: Sử dụng để yêu cầu thông tin từ sever về các phương thức có thể sử dụng. Ví dụ gọi phương thức OPTIONS có thể giúp client biết được server chấp nhận các phương thức GET, POST, PUT, DELETE nhưng không chấp nhận các phương thức HEAD hoặc TRACE.

Bây giờ bạn đọc đã có thể có những hiểu biết sơ qua về cách mà internet hoặc động. Chúng ta sẽ tìm hiểu về 1 số loại nguy cơ bảo mật có thể tìm thấy ở chúng trong phần sau nhé. :)