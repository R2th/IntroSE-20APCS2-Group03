Hôm nay chúng ta cùng đi tìm hiểu SSRF (Server Side Request Forgery) là gì, cách phát hiện và ngăn chặn tấn công yêu cầu giả mạo từ phía máy chủ qua bài viết dưới đây.

**SSRF là gì?**

SSRF (Server Side Request Forgery) hay còn gọi là tấn công yêu cầu giả mạo từ phía máy chủ cho phép kẻ tấn công thay đổi tham số được sử dụng trên ứng dụng web để tạo hoặc kiểm soát các yêu cầu từ máy chủ dễ bị tấn công.

![](https://images.viblo.asia/f327c4f3-5fb4-4eef-b72a-45b43026d8b7.jpg)

Khi thông tin trong một ứng dụng web phải được lấy từ một tài nguyên bên ngoài, chẳng hạn như nguồn cấp dữ liệu RSS từ một trang web khác, các yêu cầu phía máy chủ được sử dụng để tìm nạp tài nguyên và đưa nó vào ứng dụng web.

Ví dụ, một nhà phát triển có thể sử dụng một URL như `https://example.com/feed.php?url=externalsite.com/feed/`  để lấy nguồn cấp dữ liệu từ xa. Nếu kẻ tấn công có thể thay đổi tham số url thành localhost, thì anh ta có thể xem các tài nguyên cục bộ được lưu trữ trên máy chủ, làm cho nó dễ bị tấn công bởi yêu cầu giả mạo từ phía máy chủ.

**Nếu kẻ tấn công có thể kiểm soát đích của các yêu cầu phía máy chủ, chúng có thể thực hiện các hành động sau**:

* Lạm dụng mối quan hệ tin cậy giữa máy chủ dễ bị tổn thương và những người khác.
* Bỏ qua danh sách trắng IP.
* Bỏ qua dịch vụ xác thực dựa trên máy chủ.
* Đọc tài nguyên mà công chúng không thể truy cập, chẳng hạn như trace.axd trong ASP.NET hoặc siêu dữ liệu API trong môi trường AWS.
* Quét mạng nội bộ mà máy chủ được kết nối đến.
* Đọc tệp từ máy chủ web.
* Xem trang trạng thái và tương tác với các API như máy chủ web.
* Truy xuất thông tin nhạy cảm như địa chỉ IP của máy chủ web sau proxy ngược.

Thông thường SSRF xảy ra khi một ứng dụng web đang thực hiện một yêu cầu, trong đó kẻ tấn công có toàn quyền hoặc kiểm soát một phần yêu cầu đang được gửi đi. Một ví dụ phổ biến là khi kẻ tấn công có thể kiểm soát tất cả hoặc một phần của URL mà ứng dụng web đưa ra yêu cầu đối với một số dịch vụ của bên thứ ba.

**Điển hình của một cuộc tấn công yêu cầu giả mạo từ phía máy chủ**

![](https://images.viblo.asia/b0ae85ac-13ea-465d-a4a6-9e825c4c3fbd.jpg)

Vì kẻ tấn công không thể gửi yêu cầu trực tiếp đến máy chủ của nạn nhân, bởi vì chúng bị chặn bởi tường lửa, để quét một mạng nội bộ mà kẻ tấn công phải:

* Gửi yêu cầu đến máy chủ web dễ bị tấn công vi phạm lỗ hổng SSRF.
* Máy chủ web yêu cầu máy chủ của nạn nhân nằm phía sau tường lửa.
* Máy chủ của nạn nhân phản hồi với dữ liệu.
* Nếu lỗ hổng [SSRF](https://vakaxa.com/vi/ssrf-la-gi-phat-hien-va-ngan-chan-tan-cong-yeu-cau-gia-mao-tu-phia-may-chu/) cụ thể cho phép nó, dữ liệu được gửi lại cho kẻ tấn công.