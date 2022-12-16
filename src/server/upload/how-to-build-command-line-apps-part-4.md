**Chào mừng các bạn đã quay trở lại với series How to Build Command-Line Apps Part 4**

Ở các phần trước thì mình đã giới thiệu đến các bạn về cách sử dụng cơ bản của package : symfony/console

Hôm nay chúng ta sẽ tiếp tục với các ứng dụng mà package : symfony/console có thể làm tạo ra được.

Trong chúng ta nếu các bạn thường hay làm việc với mysql trên server thì chắc hẳn chúng ta cũng rất quen thuộc với việc sử dụng mysql bằng command-line và khi truy xuất dữ liệu thì kết quả trả về sẽ ở dạng bảng quen thuộc. Hôm nay chúng ta cùng thử bắt đầu tạo ra các kết quả dạng bảng bằng package : symfony/console nhé.

Đầu tiên chúng ta sẽ lại khởi tạo file main như sau :
![](https://images.viblo.asia/a247b8b7-32d7-4057-bba0-346263b283d9.png)

Okie, tiếp đến là khởi tạo file RenderCommand.php để thực thi :
![](https://images.viblo.asia/b47405bd-3ecb-41ac-9ecf-04d3f02329ee.png)

Tiếp đến chúng ta sẽ khởi tạo Headers và Rows cho bảng :
![](https://images.viblo.asia/9676a1ab-f021-4371-9bce-d7fd7c41d180.png)

Cuối cùng chúng ta sẽ chạy file main và xem kết quả :
![](https://images.viblo.asia/b27e9074-d4d3-4704-bc90-b75b102f45c4.png)

Vô cùng đơn giản phải không :) . Phần table này thì không có thêm thay đổi về mặt hiển thị gì cả. Nên vào bài tiếp theo chúng ta sẽ thực hiện việc kết hợp xuất dữ liệu ra bảng với 1 số truy vấn trong database.

**Hẹn gặp lại mọi người vào bài tiếp theo trong series nhé !!!~**