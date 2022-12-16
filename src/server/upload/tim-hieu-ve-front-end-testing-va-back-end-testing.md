## 1. Front-end Testing là gì?

Front-end Testing là một loại kiểm thử, mà tại đây tester kiểm tra tầng UI, tầng giao diện người dùng trong mô hình 3 lớp (3-tier). 

Bao gồm quá trình xử lý các dữ liệu request nhận từ client và response gửi cho client. Cụ thể là các request của user sẽ được biên dịch thành gói dữ liệu thế nào trên client trước khi gửi đến server, và các gói dữ liệu response nhận được từ server sẽ được browser trình diễn ra trang web trên máy client thế nào.

Kiểm thử UI là kiểm tra bất cứ thứ gì người dùng nhìn thấy được trên màn hình như video, hình ảnh. Đối với một ứng dụng web, kiểm tra phần Front-end sẽ bao gồm kiểm tra các chức năng như sau: biểu mẫu, menu, báo cáo,… cũng như JavaScript có liên quan. Front-end Testing là một thuật ngữ kiểm thử mà ở đó có nhiều cấp độ kiểm thử khác nhau. Một nhà kiểm thử cần phải có những kiến thức về các nghiệp vụ có trong web. Có như vậy công việc kiểm thử mới trở nên có ý nghĩa

![](https://images.viblo.asia/6e40dc55-2b3a-4e5e-bd84-146598214d4c.png)

## 2. Back-end Testing là gì?

Back-end Testing là một loại thử nghiệm kiểm tra tầng Ứng dụng (application) và Cơ sở dữ liệu của mô hình 3 lớp (3-tier).

Bao gồm quá trình xử lý các dữ liệu request ở phía server và quá trình nhào nặn trên trình ứng dụng server (application) để tạo ra gói trả lời response gửi trả về cho client. Cụ thể là cần truy xuất phần thông tin nào từ database, xử lý thông tin đó thế nào và sẽ ghi xuống database những gì, gửi trả về cho client những thông tin nào sau khi xử lý xong.

Khi kiểm thử Back-end Testing , người kiểm thử phải phải kiểm tra tính logic nghiệp vụ trong tầng ứng dụng. Với các ứng dụng đơn giản việc kiểm thử phía server hoặc phía cơ sở dữ liệu có nghĩa là dữ liệu được nhập vào giao diện, người dùng sẽ  kiểm tra trong cơ sở dữ liệu phía sau.  Về định dạng cơ sở dữ liệu có thể đó là SQL Server, Oracle, DB2, MySQL. Tất cả các dữ liệu sẽ được sắp xếp trong các bảng dưới hình thức bảng ghi.

Cơ sở dữ liệu được kiểm tra những thuộc tính liên quan đến ACID ( ACID viết tắt của  atomicity, consistency, isolation, và durability), hoạt động CRUD ( Create, Read, Update, Delete), their Schema, Business rule conformance. Cơ sở dữ liệu được kiểm tra về Bảo mật cũng như là Hiệu suất.

Đối với kiểm thử Back-end các bạn không cần sử dụng đến GUI. Các bạn có thể làm trực tiếp bằng cách truyền dữ liệu bằng trình duyệt với những tham số cần thiết cho chức năng để nhận phản hồi ở một số định dạng được mặc định. Giả sử như: XML hoặc JSON. Hay bạn có thể kết nối trực tiếp với cơ sở dữ liệu và xác minh dữ liệu bằng cách truy vấn SQL.

### So sánh Front-end Testing và Back-end Testing

| Front-end Testing | Back-end Testing |
| -------- | -------- |
| Thực hiện trên giao diện người dùng (GUI)   |   Bao gồm kiểm thử nghiệp vụ và database   |
| Người kiểm thử phải hiểu về yêu cầu nghiệp vụ cũng như biết cách sử dụng tool tự động     | Người kiểm thử cần có kiến thức database, SQL tốt     |
| GUI được sử dụng để thực hiện Kiểm thử   | GUI có thể hoặc không thể được sử dụng để thực hiện Kiểm thử     |
| Không cần bất kỳ thông tin nào được lưu trữ trong cơ sở dữ liệu     | Cần thông tin được lưu trữ trong cơ sở dữ liệu.    |
| Nó cần kiểm tra tính năng tổng thể của ứng dụng.    | Back-end là quan trọng để kiểm tra deadlock, dữ liệu bị hỏng, dữ liệu, mất dữ liệu, v.v.    |
| Các loại kiểm thử: Unit Tests, Acceptance Testing, Accessibility Testing, Regression Testing, etc.    | Nhiều loại: bao gồm kiểm thử SQL testing và API testing   |


## 3. Một số công cụ kiểm thử Front-end Testing và Back-end Testing 
### 3.1. Kiểm thử cho phần Back-end

Các bạn có thể sử dụng Data factory, hay Data generator hoặc Turbo data để kiểm thử cho phần Back-end.

### 3.2. Kiểm thử cho phần Front-end

Đối với phần Front-end các bạn có thể sử dụng một số công cụ như Grunt, Live reload, hoặc công cụ Karma.

Grunt là một công cụ kiểm thử được các nhà kiểm thử phần Front-end tin dùng. Đặc biệt khi nói đến automation test frontend Grunt là một công cụ hữu hiệu. Grunt là một trình chạy tác vụ JavaScript, công cụ cung cấp nhiều plugin được đóng gói cho các tác vụ thông thường.

LiveReload là giao thức web đơn giản. Công cụ này kích hoạt các sự kiện cho khách hàng trong bất cứ khi nào tập tin được sửa đổi. Đồng thời khách hàng có thể xử lý sự kiện này theo cách của họ ngay cả trong trường hợp file không còn nguyên gốc.

Karma là công cụ hữu ích đối với phần Front-end. Karma chạy JavaScript giúp thực hiện test từ work station đến Cl.

### Tài liệu tham khảo

https://www.guru99.com/frontend-testing-vs-backend-testing.html