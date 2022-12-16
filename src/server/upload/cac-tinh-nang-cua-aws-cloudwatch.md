## 1. AWS CloudWatch là gì?
AWS CloudWatch là một dịch vụ giúp giám sát, tổng hợp, phân tích dữ liệu, nguồn tài nguyên chạy trên AWS. 
Dịch vụ này giúp cung cấp thông tin thực tiễn một cách realtime,  cho phép giám sát các vùng nhớ của ứng dụng, cơ sở hạ tầng và dịch vụ ví dụ như Ram, Disk,... và sử dụng cảnh báo, tự động hành động; hỗ trợ việc tối ưu hóa hiệu suất ứng dụng, quản lý sử dụng tài nguyên và hiểu rõ tình trạng hoạt động của toàn hệ thống.

## 2. Các tính năng của AWS Cloud Watch
a. Tổng hợp số liệu
Trước tiên, Cloud Watch có chức năng lưu trữ nhật ký. Nhật ký trên Cloud Watch có 3 loại:
* Nhật ký có tính phí: đây là nhật ký do chính dịch vụ AWS trích xuất. Hiện tại, AWS hỗ trợ 2 loại nhật ký từ Amazon VPC Flow Logs và Amazon Route
* Nhật ký do các dịch vụ trên AWS trích xuất: đây là nhật ký do các dịch vụ của AWS trích xuất lên CloudWatch. Hiện tại có hơn 30 loại dịch vụ có thể trích xuất nhật ký như Amazon API Gateway, AWS Lambda, AWS CloudTrail,...
* Nhật ký tùy chỉnh: là nhật ký từ ứng dụng và tài nguyên tại chỗ của bạn. Bạn có thể sử dụng AWS Systems Manager để cài đặt CloudWatch Agent hoặc sử dụng PutLogData API để dễ dàng trích xuất nhật ký.

Các số liệu tích hợp trên Cloud Watch được thể hiện qua các metric - 1 biểu đồ thể hiện lượng sử dụng của 1 nguồn tài nguyên nào đó. Ví dụ EC2 mà bạn đang chạy sẽ tự động trích xuất các số liệu sử dụng CPU, tài nguyên Ram, tài nguyên disk, tài nguyên mạng giúp bạn nắm rõ hơn về các thay đổi trạng thái.

Ngoài ra, bạn còn có thể tạo thêm metric, tức là tạo thêm một số liệu mà bạn muốn trích xuất. Ví dụ bạn muốn tạo một cảnh báo khi lượng RAM vượt quá một mức độ nào đó và gửi cảnh báo cho bạn thì bạn có thể chọn một metric tương ứng, nhấn create alarm sau đó điền các thông tin bạn mong muốn vào. Các thông tin này bao gồm như mức độ sử dụng RAM bạn muốn gửi cảnh báo, mail adress sẽ gửi cảnh báo, consecutive periods. Ví dụ mình chọn mức độ cảnh báo là 40% và consecutive periods là 1 ngày. Khi đó nếu RAM ở ngưỡng 40% và trạng thái này kéo dài đã được 1 ngày thì sẽ gửi cảnh báo đến email mình input.

### b. Hành động
Ngoài việc gửi cảnh báo như ví dụ ở trên thì bạn có thể có những hành động thực tế  hơn, chuyên sâu hơn nữa.

**Auto Scaling**
Nghe cái tên là biết làm cái gì rồi. Bạn có thể setting để tự động giảm, tăng resource tùy theo tình hình. 
Đối với ví dụ gửi cảnh báo ở trên, bạn có thể setting để ngoài gửi cảnh báo còn tự động thực hiện hành động scaling để xóa bớt EC2 chẳng hạn. 

**CloudWatch Events**
Nếu bạn muốn thực hiện một hành động nào đó ko phải auto scaling thì có thể sử dụng CloudWatch Event. Với CloudWatch Event bạn chỉ cần define event và hành động tương ứng khi event xảy ra là được. Ví dụ bạn define một event là A, khi event A xảy ra thì chạy một hàm Lambda mà bạn đã viết sẵn. 

### c. Analysis

Cloud Watch tổng hợp dữ liệu một cách chi tiết lên đến 1 giây và có thể lưu trữ, duy trì dữ liệ trong 15 tháng. Với khả năng này bạn có thể giám sát xu hướng và phân tích lịch sử, từ đó điều chỉnh lại nguồn tài nguyên, tối ưu hiệu suất sử dụng.

**Amazon CloudWatch Metric Math** 
Amazon CloudWatch Metric Math cho phép thực hiện các tính toán trên các số liệu tổng hợp. Metric Math hỗ trợ các phép tính như +, -, /, , và những hàm toán học như Sum (Tổng), Average (Trung bình), Min, Max, Standard Deviation (Độ lệch chuẩn).
Bạn có thể hình ảnh hóa các số liệu đã tính toán này trong Bảng điều khiển quản lý AWS, thêm vào bảng thông tin CloudWatch hoặc extract bằng GetMetricData API. 

**Amazon CloudWatch Logs Insights** 
Cho phép bạn truy vấn các thông tin từ nhật ký của mình để giải quyết các vấn đề vận hành mà không cần phải cung cấp máy chủ hoặc quản lý phần mềm. 
Để truy vấn thông tin bạn có thể sử dụng bộ lọc hoặc biểu thức chính quy. Tính năng này giúp bạn nhìn thấy rõ được các vấn đề vận hành. 
Chức năng này có tốn phí và bạn chỉ phải trả tiền cho các truy vấn mà bạn sử dụng.

### d. Bảo mật
Amazon CloudWatch cũng được tích hợp với AWS Identity and Access Management (IAM) nên bạn có thể kiểm soát người dùng và tài nguyên nào được phép truy cập vào dữ liệu của bạn và cách thức họ truy cập.