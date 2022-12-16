## Tổng Quan
Persistence data luôn là một chủ đề được tranh luận rất nhiều trong cộng đồng Java. Persistence data đã được giải quyết bằng SQL và các tiện ích mở rộng stored- procedures? Chúng ta có nên viết code kể cả các hàm cơ bản (đọc, ghi, cập nhật, xóa) trong SQL và JDBC hay chúng nên được triển khai một cách tự động? Làm thế nào để hệ thống có thể sử dụng linh hoạt các database management khi chúng đều có cú pháp và phương thức hoạt động riêng? 

Có rất nhiều câu hỏi được đặt ra và có lẽ cuộc tranh cãi sẽ không bao giờ dừng nhưng có một giải pháp với tên gọi object/relational mapping (ORM) đang được cộng đồng chấp nhận và sử dụng rộng rãi mà Hibernate là một trong những ORM implementation phát triển mạnh và có đóng góp to lớn cho cộng đồng.

Có thể bạn đã làm việc với Hibernate rất nhiều trong các dự án ở công ty. Thế nhưng khi bàn luận các vấn đề trong hibermate, những thuật ngữ được nêu ra chẳng hạn như Persistence Data thì đôi khi chúng ta lại lúng túng và nó khiến chúng ta bị bỏ lại phía sau cuộc thảo luận. Trong bài viết này chúng ta sẽ tập trung tìm hiểu khái niệm về thuật ngữ Persistence Data một khái niệm căn bản nhưng hầu hết các bạn mới tiếp xúc với hibernate thường bỏ qua.

## Persistence Data là gì?
Persistence Data là một khái niệm cơ bản trong phát triển ứng dụng nói đến vấn đề rằng nếu dữ liệu không được lưu trữ khi hệ thống ngưng hoạt động cho đến khi nó hoạt động lại thì tất cả các dữ liệu phải được khởi tạo và xử lý lại từ đầu. Điều này thường không được phép trong các ứng dụng doanh nghiệp. Chúng ta cần đảm bảo rằng dữ liệu vẫn có thể sống kể cả khi ứng dụng ngưng hoạt động và có thể tải lên để xử lý tiếp khi hệ thống hoạt động trở lại.

Trong Java khi nói đến Persistence Data thường sẽ liên quan các chủ đề ánh xạ giữa class trong Java và table trong database, lưu trữ và truy vấn dữ liệu sử dụng SQL.

## Sử dụng SQL trong Java
Khi xây dựng một ứng dụng Java sử dụng SQL database bạn sẽ phải sử dụng JDBC để thực thi các câu lệnh SQL xuống database. Những câu lệnh SQL này phải được viết một cách thủ công dù cho đó là các thao tác lặp đi lặp lại đơn giản và có cấu trúc. Ví dụ như khi truy vấn dữ liệu thông qua JDBC nó sẽ trả về một tập ResultSet, bạn phải duyệt qua nó để lấy các giá trị tương ứng trong từng cột. Rõ ràng công việc này khá nhàm chán và khiến chúng ta có ít thời gian hơn để xử lý các vấn đề business trong ứng dụng.

Nếu ứng dụng có độ phức tạp đơn giản thì sử dụng JDBC và SQL trong trường hợp này là hợp lý. Nhưng đối với các ứng dụng có độ phức tạp lớn yêu cầu mã nguồn dễ bảo trì và mở rộng thì bắt buộc chúng ta phải tìm một giải pháp tốt hơn. Phân tách phần data model ra khỏi phần business logic, mỗi tầng đều có một nhiệm vụ riêng giúp tăng tính tái sử dụng và bảo trì ứng dụng. 

Nguồn tham khảo
[https://shareprogramming.net/ban-co-hieu-ro-thuat-ngu-persistence-data/](https://shareprogramming.net/ban-co-hieu-ro-thuat-ngu-persistence-data/)

[Tin tức số 24h](https://tintucso24h.com/)