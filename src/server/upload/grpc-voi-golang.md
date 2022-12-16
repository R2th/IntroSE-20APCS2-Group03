### gRPC là gì
gRPC là viết tắt của “gRPC Remote Procedure Calls” là một framework RPC mã nguồn mở hiện đại và hiệu năng cao có thể chạy trên bất kỳ môi trường nào được Google khởi công phát triển vào 2015, đến 08/2016 thì được phát hành chính thức. Đây được cho là thế hệ tiếp theo của RPC đặc biệt là trong mô hình **Microservices**.
Các backend developer phải đứng trước lựa chọn dùng REST API hay dùng gRPC. Và sự khác biệt của gRPC và REST API là gì? Chúng ta sẽ tìm hiểu chúng sau đây.
![image.png](https://images.viblo.asia/09c52ab5-4cfc-47ab-8d92-066ea7691d4f.png)
### RPC và REST API
* **REST API**: Client và Server cần trao đổi state thông qua các resource được trả về. Do đó các response trả về thường là một resource.
* **RPC**: Client cần server thực hiện tính toán hoặc trả về một thông tin cụ thể nào đó. Bản chất giống y như ta đang gọi hàm, chỉ là hàm đó ở máy chủ khác hoặc service khác. Từ đó response trả về chỉ là kết quả của “hàm” thôi, không hơn, không kém.
![image.png](https://images.viblo.asia/14a56648-19bd-4f1a-bf11-97557e77df6c.png)
Hình ảnh được cắt ra từ video (https://www.youtube.com/watch?v=x8dybRs5q_g&list=PLC4c48H3oDRzLAn-YsHzY306qhuEvjhmh&index=1)
Thông qua thông tin trên chúng ta có thể thấy, các method của REST API chỉ tập trung vào tạo mới, đọc, sửa và xóa resource. Còn nếu muốn resource làm một cái gì đó hoặc tính toán cụ thể thì đó chính là RPC-base APIs.
### gRPC hoạt động như thế nào
![image.png](https://images.viblo.asia/99ccb670-c5ac-437b-972a-dc4854151a1c.png)
Quay lại với câu chuyện tăng tải cho cả hệ thống nhiều services (hay Microservices), Google đã phát triển 2 thứ:
1. Một giao thức mới để tối ưu các connection, đảm bảo dữ liệu đi trao đổi liên tục với ít băng thông nhất có thể.
2. Một định dạng dữ liệu mới để 2 đầu service (hoặc client và server) có thể hiểu được các message của nhau mà ít phải encode/decode.
HTTP/2 sẽ hoạt động rất tốt với binary thay vì là text. Vì thế Google phát minh kiểu dữ liệu binary mới với tên gọi: Protobuf (tên đầy đủ là Protocol Buffers). Về tốc độ encode/decode các bạn có thể xem qua một benchmark dưới đây:
![image.png](https://images.viblo.asia/038efb2c-aeb1-43c4-b84e-571679773ed5.png)
gRPC có 4 loại API sau đây mà các bạn có thể tìm hiểu để rõ hơn cách thức hoạt động:
* Unary: Phương thức gọi một lần và trả về ngay lập tức.
* Server streaming: Phương thức client phải đợi cho đến khi server kết thúc quá trình gửi response.
* Client streaming: Phương thức server phải đợi cho đến khi client hoàn tất việc gửi dữ liệu đến server.
* Bi directional streaming: Xảy ra khi bạn cần client và server được kết nối và gửi dữ liệu trực tiếp với kích thước lớn hoặc đối với dữ liệu đó cần thời gian thực, chẳng hạn như chat,...
### Kết
Tóm lại gRPC là một kỹ thuật rất ưu việt để scale tải hệ thống, đặc biệt trong hệ thống phân tán, nhiều services hoặc Microservices. Việc sử dụng tốt gRPC vẫn phụ thuộc phần lớn vào kỹ thuật xây dựng service và khả năng deploy và vận hành.
Bài viết tham khảo:
gRPC là gì? Vũ khí tối thượng tăng tải Microservices: https://200lab.io/blog/grpc-la-gi-vu-khi-tang-tai-microservices/
Tổng quan về gRPC: https://medium.com/@duynam_63755/t%E1%BB%95ng-quan-v%E1%BB%81-grpc-8b342dc9add7