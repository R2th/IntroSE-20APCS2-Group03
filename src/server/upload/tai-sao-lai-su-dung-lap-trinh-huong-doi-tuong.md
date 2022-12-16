Tại sao lập trình hướng đối tượng là được sử dụng rộng rãi để giải quyết các vấn đề khi xây dựng phần mềm ngày nay? Trong thập niên 70 và 80, ngôn ngữ lập trình hướng thủ tục như C, Pascal, và Fortran được sử dụng phổ biến để xây dựng các hệ thống phần mềm. Ngôn ngữ thủ tục tổ chức chương trình theo hướng chạy trình tự các dòng từ trên xuống dưới. Nói cách khác, chương trình là một chuỗi các bước nối tiếp nhau sau khi bước trước đó đã hoàn thành. Kiểu lập trình này chỉ hoạt động tốt với chương trình nhỏ chỉ gồm khoảng vài trăm dòng lệnh, nhưng các chương trình ngày càng lớn dần và chúng trở nên khó quản lý và sửa lỗi.

Trong một nỗ lực để quản lý kích thước không ngừng lớn dần của các chương trình, lập trình cấu trúc (structured programming) được giới thiệu để chia nhỏ mã ra thành những đoạn nhỏ được gọi là hàm (function) hoặc thủ tục (procedure). Đây là một sự cải tiến lớn, nhưng khi các chương trình thi hành những chức năng phức tạp hơn và tương tác với nhiều hệ thống khác, nó bắt đầu để lộ những khuyết điểm dưới đây:
- Khó bảo trì.
- Tồn tại những chức năng rất khó chỉnh sửa mà không gây ảnh hưởng tới các chức năng khác của hệ thống.
- Các chương trình mới về cơ bản phải xây dựng từ đầu.
- Lập trình không có lợi cho nhóm phát triển. Các lập trình viên phải biết mọi khía cạnh cách chương trình làm việc và không thể tách riêng họ vào một khía cạnh nào đó của hệ thống.
- Khó chuyển đổi từ mô hình thực tế sang mô hình lập trình.
- Làm việc độc lập tốt nhưng không tích hợp tốt vào các hệ thống khác.

Ngoài các khuyết điểm, vài sự tiến triển của hệ thống máy tính tạo thêm khó khăn cho việc tiếp cận với ngôn ngữ cấu trúc, chẳng hạn như:
- Không lập trình viên nào được yêu cầu và được truy cập trực tiếp chương trình thông qua giao diện đồ họa người dùng và máy tính để bàn của họ.
- Người dùng yêu cầu trực quan hơn, ít cấu trúc hơn khi tương tác với chương trình.
- Hệ thống máy tính phát triển theo mô hình phân tán, nơi mà giao diện người dùng, cơ sở dữ liệu phụ trợ được liên kết lỏng lẻo (loosely coupled) và có thể truy cập từ mạng Internet.

Và như một điều tất yếu, các công ty phần mềm đã sử dụng phương pháp lập trình hướng đối tượng để giải quyết các vấn đề của họ. Những lợi ích mà họ có được như sau:
* Rất trực quan khi chuyển từ mô hình phân tích thực tế sang mô hình thực thi phần mềm.
* Khả năng bảo trì và thay đổi chương trình nhanh chóng và hiệu quả
* Khả năng dễ dàng chia hệ thống thành từng phần nhỏ để giao cho các nhóm phát triển.
* Khả năng tái sử dụng mã khi xây dựng các chương trình khác hoặc mua những đoạn mã được viết bởi hãng thứ ba để đẩy nhanh tốc độ xây dựng phần mềm.
* Tích hợp tốt với các hệ thống máy tính đã có sẵn
* Tích hợp tốt với các hệ điều hành hiện đại.
* Khả năng tạo giao diện người dùng trực quan.