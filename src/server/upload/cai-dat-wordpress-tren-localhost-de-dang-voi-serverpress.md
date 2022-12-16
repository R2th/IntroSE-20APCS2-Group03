Để phát triển WordPress trên localhost , chúng ta cần một local server  có cài đặt Apache và MySQL trong máy tính . Cách dễ nhất để có được những thứ này là cài đặt một ứng dụng đóng gói, chẳng hạn như WAMP cho Windows và MAMP cho OSX.
Tuy nhiên, việc cài đặt WordPress bên trong nó ít đơn giản hơn. Trước tiên, chúng ta cần đặt các file WordPress vào thư mục tương ứng, thường được đặt tên là htdocs, tạo cơ sở dữ liệu cho nó, nhập thông tin cần thiết để kết nối WordPress với cơ sở dữ liệu và đặt tài khoản người dùng trước khi cuối cùng chúng ta có thể đưa trang web vào chạy.
Kết hợp nó với việc thiết lập một máy chủ ảo và số lượng trang web WordPress mà bạn phải xử lý và quá trình này chắc chắn sẽ còn phức tạp hơn nữa. Nếu bạn thấy mình trong tình huống này, bạn có thể muốn thử một ứng dụng có tên ServerPress.
## Sử dụng ServerPress
ServerPress là một ứng dụng máy chủ cục bộ được xây dựng dành riêng cho việc phát triển WordPress, cũng như bbPress và BuddyPress. Nó đi kèm với tính năng cho phép chúng ta cài đặt WordPress nhanh hơn ban đầu. Nó có sẵn cho Windows và OSX.
Khi các  Web services  và Cơ sở dữ liệu (Apache, MySQL) đang chạy, chúng ta sẵn sàng cài đặt WordPress.
## Cài đặt WordPress
Trước khi tiếp tục, xin lưu ý rằng nếu bạn đang sử dụng Pow, bạn có thể cần phải hủy kích hoạt hoặc gỡ cài đặt nó để tránh xung đột, vì cả Pow và ServerPress đều sử dụng tên miền .dev.
Để tạo một dự án WordPress mới, chọn Create a new development website.

![](https://images.viblo.asia/34b30a11-c253-4b20-a9c7-ae858459d864.jpg)

Đặt tên miền cho trang web của bạn và chọn phiên bản WordPress bạn muốn cài đặt. Trong phần Site Root, bạn có thể thấy nơi trang sẽ được cài đặt.

![](https://images.viblo.asia/4a62137b-cdec-4e9b-a35c-9fcb88894d2a.jpg)

Nhấn nút Next. ServerPress sẽ tự động thiết lập các công cụ cần thiết (bảng, tên máy chủ, virtualhost, v.v.) tự động. Thực hiện theo bước tiếp theo để tạo người dùng Quản trị viên cho trang web của bạn.

![](https://images.viblo.asia/c1739985-c5d0-473d-bf54-28fe13d8f5bf.jpg)
Trang web mới của bạn đã được thiết lập.
## Di chuyển và thay đổi tên miền
Với ServerPress, bạn cũng có thể thay đổi hoặc sao chép các trang web hiện tại của mình bằng một tên miền khác, chỉ mất vài cú nhấp chuột.
Chọn **Remove**, **copy**, hoặc **move** website hiện có.

![](https://images.viblo.asia/9ddd7e8a-7e19-46e4-a640-90d72b41b474.jpg)

Chọn trang web của bạn và chọn xem bạn muốn**Remove**, **copy**, hoặc **move**. Trong trường hợp này, như bạn có thể thấy từ ảnh chụp màn hình bên dưới, tôi muốn di chuyển trang web của mình; đặt nó dưới một tên miền mới.

![](https://images.viblo.asia/9b8642e1-d2c1-45fb-8b27-2c4116117481.jpg)
## Kết luận
Nếu bạn không muốn một cách lộn xộn và phức tạp để thiết lập WordPress và virtualhost, ServerPress có thể là một lựa chọn tốt. Với nó, bạn có thể thiết lập và cài đặt WordPress chỉ bằng vài cú nhấp chuột. Hãy thử một lần.
Link download ServerPress : http://serverpress.com/downloads/