Thiết lập một môi trường test (kiểm thử) đúng đảm bảo thành công cho kiểm thử phần mềm. Bất kỳ sai sót trong quá trình này có thể dẫn đến phát sinh thêm chi phí và thời gian cho khách hàng.
# Môi trường thử nghiệm (Test Environment) là gì?
Test Environment là một tổ hợp cài đặt phần mềm và phần cứng nơi các tester (nhân viên kiểm thử) có thể thực hiện các trường hợp kiểm thử của mình. Nói cách khác, nó hỗ trợ thực hiện kiểm thử với phần cứng, phần mềm và cấu hình mạng.

Test bed hoặc Test environment được định cấu hình theo nhu cầu của Ứng dụng đang thử nghiệm. Đôi khi, Test bed có thể là sự kết hợp của Test environment và dữ liệu thử nghiệm mà nó vận hành.
# Các key để thiết lập môi trường kiểm thử
Đối với môi trường kiểm thử, khu vực trọng điểm để thiết lập bao gồm:
* Hệ thống và các ứng dụng
* Dữ liệu kiểm thử
* Máy chủ cơ sở dữ liệu
* Môi trường để chạy Font end
* Hệ điều hành client
* Trình duyệt
* Phần cứng bao gồm hệ điều hành máy chủ
* Mạng
* Các tài liệu cần thiết như tài liệu tham khảo/hướng dẫn cấu hình/hướng dẫn cài đặt/hướng dẫn sử dụng

![](https://images.viblo.asia/aae5e8a2-4966-4d65-8d81-b300e9087a92.png)
# Quy trình thiết lập môi trường kiểm thử phần mềm
Các kiểm thử giới hạn những thứ có thể được kiểm thử và những thứ không
nên được kiểm thử.

Những người dưới đây liên quan đến việc thiết lập môi trường kiểm thử.
* Quản trị hệ thống.
* Nhà phát triển
* Tester
* Đôi khi, những người dùng hoặc chuyên viên đã quen với hệ thống có thể tham gia vào việc kiểm thử.

Môi trường kiểm thử đòi hỏi phải thiết lập ở một số trường riêng biệt khác nhau như:
## 1. Thiết lập máy chủ kiểm thử
Các phép kiểm thử có thể không thể thực hiện được trên máy tính cục bộ. Nó có thể cần phải được thiết lập trên một máy chủ kiểm thử có thể hỗ trợ các ứng dụng.

Ví dụ: Fedora thiết lập cho PHP, các ứng dụng dựa trên công nghệ Java có hoặc không có các máy chủ mail, thiết lập cron, các ứng dụng dựa trên công nghệ Java…
## 2. Mạng
Mạng được thiết lập theo các yêu cầu kiểm định, bao gồm:
* Thiết lập Internet
* Thiết lập mạng LAN wifi
* Thiệt lập mạng riêng

Đảm bảo không gây ảnh hưởng đến các thành viên khác (lập trình viên, nhà thiết kế, người viết nội dung...) khi xảy ra tình trạng nghẽn mạng.
## 3. Cài đặt PC kiểm thử
Để kiểm thử web, có thể cần phải cài đặt nhiều loại trình duyệt khác nhau cho các kiểm thử khác nhau. Đối với các ứng dụng Desktop, cần nhiều hệ điều hành khác nhau cho các loại PC kiểm thử khác nhau.

Chẳng hạn, kiểm thử ứng dụng windows phone có thể yêu cầu:
* Cài đặt Visual Studio
* Giả lập Windows phone
* Hoặc, gán một windows phone cho tester.
## 4. Báo lỗi
Cần cung cấp các công cụ báo cáo và quản lý lỗi cho các tester.
## 5. Tạo dữ liệu kiểm thử cho môi trường kiểm thử
Nhiều công ty sử dụng một môi trường kiểm thử riêng biệt để kiểm tra các sản phẩm phần mềm. Phương pháp phổ biến thường được sử dụng là sao chép dữ liệu production để kiểm thử. Điều này giúp các tester phát hiện các vấn đề tương tự như trên máy chủ production, mà không làm hỏng các dữ liệu production.

Phương pháp sao chép dữ production để kiểm thử dữ liệu, bao gồm:
* Thiết lập các job trên production để sao chép dữ liệu sang một môi trường kiểm thử chung.
* Tất cả các PII  (Personally Identifiable Information - Thông tin nhận dạng cá nhân) cùng với các dự liệu cá nhân cần được sửa đổi cho khác dữ liệu thật của user trên production. Phải thay thế các thông tin này bằng các dữ liệu logic tương tự (về định dạng, kiểu dữ liệu...) chứ không được dùng trực tiếp các dữ liệu thật của 1 cá nhân nào đó
* Xóa các dữ liệu không liên quan đến việc kiểm thử.

Các tester hoặc các nhà phát triển có thể sao chép dữ liệu này đến môi trường kiểm thử riêng của họ. Họ có thể thay đổi nó theo ý mình.

Bảo mật là vấn đề then chốt trong việc sao chép các dữ liệu production. Để khắc phục các vấn đề riêng tư, cần chú ý đến các dữ liệu kiểm thử xáo trộn và ẩn danh.

Có hai cách để có thể ẩn danh dữ liệu:
* BlackList: Với cách này, tất cả các trường dữ liệu được giữ nguyên, ngoạI trừ các trường dữ liệu được quy định bởi người dùng.
* WhiteList: Với cách này, theo mặc định, ẩn danh tất cả các trường dữ liệu, ngoại trừ các trường dữ liệu được phép sao chép. Một trường dữ liệu trong WhiteList cho phép sao chép dữ liệu và không cần ẩn danh.

Ngoài ra, nếu bạn đang sử dụng dữ liệu production, cần phải thật cẩn trọng. Truy vấn cơ sở dữ liệu sử dụng SQL script là một cách hiệu quả.
## 6. Quản lý môi trường kiểm thử
Quản lý môi trường kiểm thử đề cập đến việc bảo trì test bed.

Danh sách các công việc trong quản lý môi trường kiểm thử:
1. Duy trì một kho lưu trữ trung tâm chứa tất cả các phiên bản cập nhật của môi trường kiểm thử.
2. Quản lý môi trường kiểm thử theo yêu cầu của đội ngũ tester.
3. Tạo các môi trường kiểm thử theo các yêu cầu mới.
4. Giám sát môi trường kiểm thử
5. Cập nhật/xóa các môi trường kiểm thử đã hết hạn
6. Điều tra các vấn đề về môi trường kiểm thử
7. Cùng phối hợp giải quyết các vấn đề 

(còn tiếp)....

Link tham khảo: https://www.guru99.com/test-environment-software-testing.html