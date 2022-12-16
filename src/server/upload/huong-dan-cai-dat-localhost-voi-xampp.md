**Khái niệm localhost, tầm quan trọng và hướng dẫn cài đặt localhost trên máy tính một cách dễ dàng và nhanh chóng.**
Khi bắt đầu học PHP, chúng ta cần phải sử dụng localhost để chạy các file PHP trên máy của mình. Vậy localhost là gì? Tại sao phải cài đặt localhost trên máy tính để chạy được các file PHP?

## Localhost là gì?
Localhost hiểu đơn giản nó là máy chủ được vận hành trên máy của bạn. Vì PHP là ngôn ngữ script trên server nên nó cần phải có server mới có thể chạy được.

Localhost bao gồm nhiều ứng dụng đi kèm với nhau:

- Webserver tên Apache.

- Phần mềm PHP để xử lý mã PHP.

- MySQL Server để lưu trữ và xử lý cơ sở dữ liệu.

- PHPMyAdmin để xem và quản lý cơ sở dữ liệu MySQL.

## Nguyên lý hoạt động của Localhost
Sau khi cài đặt localhost máy tính của bạn sẽ có một Webserver để chạy ứng dụng web ở địa chỉ http://127.0.0.1 hoặc bạn có thể chạy với đường dẫn  http://localhost.

Mỗi khi cần sử dụng bạn mở bảng điều khiển của localhost và kích hoạt khởi động các ứng dụng đi kèm.

## Hướng dẫn cài đặt Localhost với XAMPP
Có nhiều cách để cài đặt localhost nhưng bài này chúng ta sẽ cài đặt localhost với XAMPP vì một số lý do sau:

- XAMPP miễn phí.

- Dễ sử dụng.

- Hỗ trợ các hệ điều hành Windows, Linux, Mac.

Và bài này chúng ta sẽ chỉ cài đặt với Windows thôi nhé.

Trước tiên ta vào đường dẫn sau để tải XAMPP https://www.apachefriends.org/download.html chọn phiên bản phù hợp với máy của bạn nhé. XAMPP chỉ có bản 32bit nhưng 64bit vẫn dùng bình thường nhé.

![](https://images.viblo.asia/7ed42258-4ba7-4ff7-8961-f729ca0852fa.png)


Sau khi tải về chạy file, sau đó Next.

![](https://images.viblo.asia/650046f4-dfc1-41f1-a010-7522184b143a.png)


Đến phần chọn đường dẫn cài đặt XAMPP, bạn có thể để mặc định hoặc đặt vào ổ tùy thích nhưng hãy nhớ đường dẫn này nhé, sau đó next và next.

![](https://images.viblo.asia/b1e79bde-059c-40cb-869b-d5600dc26e49.png)

Sau khi cài đặt xong, bấm nút Finish để kết thúc cài đặt và hiện bảng điều khiển lên.

## Khởi động localhost trong XAMPP
Bây giờ bạn vào thư mục lưu cài đặt XAMPP phía trên, vd c:\xampp mở file xampp-control.exe để bật bảng điều khiển XAMPP.

![](https://images.viblo.asia/2bfc425f-08e1-4560-96b6-77004d98b0b0.png)

Nhấn vào nút start của 2 ứng dụng Apache và MySQL để khởi động Webserver Apache và MySQL Server.

![](https://images.viblo.asia/377de3af-e082-406b-93ec-2e632195fc79.png)

Nếu cả hai hiện thị chữ stop và không có thông báo gì là thành công rồi đó.
Truy cập vào địa chỉ http://localhost sẽ thấy trang giới thiệu của XAMPP.

Nếu xảy ra lỗi không khởi động được một trong hai ứng dụng trên bạn có thể vào hướng dẫn sửa lỗi không start được apache để xem hướng dẫn sửa lỗi.

![](https://images.viblo.asia/a8602f70-f990-4303-9490-6e8aacdc12d9.png)


## Tổng kết

Vậy là chúng ta đã tìm hiểu về localhost và cách cài đặt localhost với XAMPP rồi đó, hi vọng bài này sẽ giúp ích được nhiều cho bạn. Từ bài sau chúng ta sẽ tìm hiều về PHP mong mọi người ủng hộ nhiều.