# Mô hình trong dự án web
## Mô hình 3 lớp

- **User Interface** là phần giao diện tương tác với người dùng như web browser, winform, .... Đây là nơi người dùng gửi các yêu cầu RESTful tới hệ thống.
- **Controller Layer** tương tự như ở trên, là một điểm đầu vào của service, là nơi nhận các gói tin yêu cầu và phản hồi về User Interface. Layer chịu trách nhiệm xử lý các logic routing, kiểm tra tham số, chuyển tiếp request, ...
- **Business Logic Layer** là lớp xử lý chính các business của hệ thống. Khi nhận các yêu cầu từ Controller layer, tuỳ vào loại yêu cầu sẽ có cách xử lý, tính toán khác nhau. Những yêu cầu cần đến dữ liệu hay thay đổi dữ liệu sẽ được lớp này đẩy xuống Data Access Layer tính toán.
- **Data Access Layer** là lơp duy nhất có thể truy vấn đến database của service, layer thực hiện các thao tác có liên quan đến dữ liệu như (select, insert, update, delete, ...)
- Lợi ích:
  - Dễ dàng phát triển và bảo trì hệ thống.
  - Giảm sự phụ thuộc giữa các lớp khi hệ thống lớn lên, có thể tái sử dụng lại tiết kiệm được thời gian xây dựng.

# Repository Pattern
## Design Pattern
- Là một kỹ thuật trong lập trình hướng đối tượng, cung cấp cho chúng ta: 
  - Các mẫu thiết kế, cách tư duy trong các tình huống xảy ra của lập trình hướng đối tượng.
  - Các giải pháp tối ưu cho các vấn đề chung thường gặp trong lập trình cũng như trong quá trình phân tích thiết kế và phát triển phần mềm.

## Repository
- Là lớp trung gian giữa tầng **Business Logic** và **Data Access**, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.
- Đóng vai trò là một lớp kết nối giữa tầng **Business** và **Model** của ứng dụng.
- Lý do nên sử dụng **repository pattern**:
  - Nơi duy nhất để thay đổi quyền truy cập dữ liệu cũng như xử lý dữ liệu.
  - Tăng tính bảo mật và rõ ràng cho code.
  - Dễ dàng để thay thế.
  
# Go-kit 
- Go-kit được chia làm ba layer chính đó là:
  - Transport layer 
  - Endpoint layer 
  - Service layer 
  
- Tầng **service** là nơi chứa các domain của ứng dụng cũng như thực hiện tất cả logic cho ứng dụng.
- Tầng **transport** được liên kết với các giao thức cụ thể như Http, gRPC, Pub/Sub nhằm lấy request từ client và encoding/decoding request.
- Trong go-kit, mỗi service method trong go-kit sẽ được chuyển đổi thành một endpoint để giao tiếp giữa client và server. Mỗi endpoint sẻ expose một service method ra ngoài bằng cách sử dụng transport liên kết với một giao thức cụ thể như http, rest/gRPC hay pub/sub.