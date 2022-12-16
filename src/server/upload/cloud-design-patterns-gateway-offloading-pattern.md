Mô hình Gateway giảm tải là bài đầu tiên trong loạt bài về Cloud design pattern mà tôi sẽ tìm hiểu và giới thiệu trên Viblo - techblog.

Giảm tải chức năng của dịch vụ chia sẻ hay dịch vụ chuyên biệt tới một proxy gateway. Pattern nay có cả khả năng đơn giản hóa việc phát triển ứng dụng bằng cách di chuyển các chức năng dịch vụ chia sẻ, như sử dụng xác minh SSL từ các phần khác nhau của ứng dụng vào trong một gateway.

## Bối cảnh và Vấn đề
Một số tính năng thông dụng và được sử dụng trên nhiều dịch vụ, và các tính năng này đòi hỏi phải cấu hình, quản lý, và bảo trì. Một dịch vụ chia sẻ hoặc chuyên biệt được phân phối với mỗi lần triển khai ứng dụng đều làm gia tăng chi phí quản trị và làm tăng khả năng xảy ra lỗi triển khai. Bất kì cập nhật nào cho một tính năng chi sẻ đều phải được triển khai trên tất cả các dịch vụ chia sẻ tính năng đó.

Xử lý đúng các vấn đề bảo mật như như xác thực token, mã hóa, quản lý xác thực SSL, và các tác vụ phức tạp khác có thể đòi hỏi các thành viên trong nhóm dự án phải có các kỹ năng chuyên môn cao. Ví dụ, một xác thực cần thiết bởi một ứng dụng phải được cấu hình và triển khai trên tất cả các trường hợp của ứng dụng đó. Với mỗi lần triển khai mới, xác thực bắt buộc phải được quản lý để đảm bảo rằng nó không hết hạn. Bất kỳ một xác thực chung nào sắp hết hạn thì bắt buộc nó phải được cập nhật, kiểm tra, và xác minh trên mọi triển khai ứng dụng.

Các dịch vụ phổ biến khác như xác thực - authentication, ủy quyền - authorization, logging, theo dõi - monitoring, hay điều chỉnh - throttling có thể khó khăn cho việc thực hiện và quản lý một lượng lớn các triển khai.

## Giải pháp
Giảm tải một số tính năng bằng cách đưa chúng vào một gateway API, đặc biệt là các mối quan tâm xuyên suốt như quản lý certificate, authentication, hủy bỏ SSL, giám sát, chuyển đổi hoặc điều chỉnh giao thức.
![](https://images.viblo.asia/622f94ce-bf48-4555-8dc0-511d42d95ba1.png)
Sơ đồ trên cho thấy một gateway API chấm dứt các kết nối SSL không giới hạn. Nó yêu cầu dữ liệu thay mặt cho người yêu cầu ban đầu từ bất kỳ máy chủ HTTP nào ngược dòng cổng API.

#### Ý nghĩa của pattern này:
* Đơn giản hóa việc phát triển các dịch vụ bằng cách loại bỏ nhu cầu phân phối và duy trì các nguồn lực hỗ trợ, chẳng hạn như các web server certificates và cấu hình các bảo mật web. Cấu hình đơn giản hơn mang lại kết quả là giúp quản lý, mở rộng dễ dàng hơn và làm cho việc nâng cấp dịch vụ trở nên đơn giản hơn.
* Cho phép tạo các nhóm thực hiện các tính năng đòi hỏi chuyên môn chuyên biệt, chẳng hạn như bảo mật. Điều này cho phép nhóm core tập trung vào chức năng ứng dụng, để lại những vấn đề chuyên sâu cho các nhóm chuyên gia liên quan.
* Cung cấp sự thống nhất cho yêu cầu và phản hồi việc ghi log hay giám sát. Ngay cả khi một service hoạt động không chính xác, thì gateway có thể được cấu hình để đảm bảo mức độ giám sát và ghi log tối thiểu.

## Các vấn đề và những luận bàn
* Đảm bảo gateway API có tính sẵn sàng cao và có khả năng phục hồi nếu thất bại. Tránh các lỗi đơn bằng cách chạy nhiều phiên bản của gateway API.
* Đảm bảo gateway được thiết kế cho các yêu cầu về dung lượng hay mở rộng ứng dụng. Chắc chắn rằng gateway không trở thành nút cổ chai cho ứng dụng và có khả năng mở rộng đăp ứng yêu cầu.
* Chỉ giảm tải các tính năng mà được sử dụng bởi toàn bộ ứng dụng, như bảo mật hoặc truyền dữ liệu.
* Logic nghiệp vụ không bao giờ đưa vào giảm tải trong gateway API.
* Nếu bạn cần theo dõi các transactions, thì cần xem xét tạo các ID liên quan phục vụ cho mục đích ghi log.

## Khi nào ta áp dụng pattern này
Ta sử dụng pattern này khi.
* Khi ta triển khai ứng dụng mà có mối quan tâm chung chư xác thực SSL, hay mã hóa.
* Một tính năng chung trong các ứng dụng triển khai mà có thể có các yêu cầu tài nguyên khác nhau, ví dụ như memory, dung lương lưu trữ hay các kết nối mạng.
* Bạn muốn tách các vấn đề có tính chuyên biệt như bảo mật, điều tiết mạng cho một nhóm khác có chuyên môn cao và chuyên xâu.

**Nguồn**: [Microsoft - doc: Cloud design patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/gateway-offloading)