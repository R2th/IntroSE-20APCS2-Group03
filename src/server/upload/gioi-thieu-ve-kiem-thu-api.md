# API là gì?
**API (Application Programming Interface)** ta có thể hiểu đơn giản nó là phần mềm trung gian giữa Client và Server cho phép chúng có thể nói chuyện được với nhau.
Ví dụ cụ thể, khi bạn dùng facebook hay gửi một tin nhắn, kiểm tra thời tiết trên điện thoại đi động, lúc đó chính là bạn đang sử dụng API.
# API thường ứng dụng vào đâu?
* **Web API**: là hệ thống API được sử dụng trong các hệ thống website. Hầu hết các website đều ứng dụng đến Web API cho phép bạn kết nối, lấy dữ liệu hoặc cập nhật cơ sở dữ liệu. 
Ví dụ: Bạn thiết kế chức nằng login thông Google, Facebook, Twitter, Github… Điều này có nghĩa là bạn đang gọi đến API của. Hoặc như các ứng dụng di động đều lấy dữ liệu thông qua API.
* **API trên hệ điều hành**: Windows hay Linux có rất nhiều API, họ cung cấp các tài liệu API là đặc tả các hàm, phương thức cũng như các giao thức kết nối. Nó giúp lập trình viên có thể tạo ra các phần mềm ứng dụng có thể tương tác trực tiếp với hệ điều hành.
* **API của thư viện phần mềm hay framework**: API mô tả và quy định các hành động mong muốn mà các thư viện cung cấp. Một API có thể có nhiều cách triển khai khác nhau và nó cũng giúp cho một chương trình viết bằng ngôn ngữ này có thể sử dụng thư viện được viết bằng ngôn ngữ khác. Ví dụ bạn có thể dùng PHP để yêu cầu một thư viện tạo file PDF được viết bằng C++.
# Kiểm thử API là gì?
* Kiểm thử API là thử nghiệm mà trong đó bạn sử dụng phần mềm để gọi tới API, nhận kết quả đầu ra và ghi lại phản hồi của hệ thống. 
* Không tập trung vào giao diện mà chủ yếu tập trung vào lớp business logic của phần mềm.
![](https://images.viblo.asia/c924f694-0dcb-49c1-a801-d5a1571c532b.png)

* Trong API, thường sử dụng giao thức để Client và server giao tiếp với nhau. Trong đó giao thức chính là HTTP. Và API được xây dựng trên chính 2 thành phần: *Request* và *Reponse*.
* Một request thường sử dụng 4 phương thức chính đó là:<br>
**GET** để truy vấn object<br>
**POST** để tạo object mới<br>
**PUT** để sửa đổi hoặc thay thế một object<br>
**DELETE** để loại bỏ một object<br>
* Mỗi phương thức trên phải được API call thông qua để gửi chỉ thị cho server phải làm gì.
# Vì sao phải test API?
* Trong quá trình triển khai dự án, phần server và client làm độc lập với nhau nên có nhiều chỗ client chưa làm xong, mình không thể chờ client làm xong để test được dữ liệu mà test API bằng công cụ khác luôn –> Lúc này việc test hoàn toàn không phụ thuộc gì vào client.
* Kể cả khi client làm xong rồi, nếu mình test trên client mà thấy lỗi liên quan đến logic và dữ liệu thì cũng cần test thêm cả API để biết chính xác là server sai hay client sai –> fix lỗi sẽ nhanh hơn.
* Khi làm hệ thống web services, dự án của mình chỉ viết API cho bên khác dùng, mình sẽ không có client để test giống như các dự án khác –> phải test API hoàn toàn.
# Chuẩn bị những gì để kiểm thử API ?
## 1. Thiết lập môi trường kiểm thử API
* Thiết lập môi trường kiểm thử API với tập hợp các tham số cần thiết của API. 
* Cấu hình cơ sở dữ liệu và máy chủ theo các yêu cầu của ứng dụng. 
* Thử thực hiện gọi API để đảm bảo không có lỗi gì trước khi bạn tiến hành kiểm thử.
## 2. Xác định phạm vi và yêu cầu kiểm thử
 Đặt các câu hỏi liên quan đến API để xác định phạm vi và yêu cầu kiểm thử. Ví dụ: 
* Những môi trường nào nên sử dụng API như thế nào? 
* Độ ưu tiên trong kiểm thử API? 
* Điều gì sẽ xảy ra trong những trường hợp bình thường, trường hợp bất thường
* API nào khác có thể tương tác với API này? 
## 3. Quyết định xem bạn muốn thử nghiệm API của mình như thế nào?  
Một số phương pháp kiểm thử API phổ biến: 
* **Functionality testing** - Xác nhận API hoạt động chính xác theo đúng chức năng mà nó được tạo ra. 
* **Usability testing** - Xác nhận API có thể sử dụng một cách dễ dàng
* **Reliability testing** - Xác nhận việc gọi API và trả kết quả hoạt động ổn định và nhất quán
#  Cách Viết TestCase để Test API
Các trường hợp thử nghiệm về kiểm tra API dựa trên: 
* Kiểm tra các giá trị trả về dựa trên điều kiện đầu vào.
* Xác minh nếu API không trả lại bất kỳ kết quả gì hoặc kết quả sai. 
* Xác minh nếu API kích hoạt một số sự kiện khác hoặc gọi một API khác. 
* Xác minh xem API đang cập nhật bất kỳ cấu trúc dữ liệu nào
![](https://images.viblo.asia/fea2ec2d-2b08-41a7-bd5c-ece8d85b4948.png)
# Một số kiểu bug cần chú ý khi kiểm thử API
* Vấn đề bảo mật
* Các vấn đề về sự tin cậy. Khó khăn khi kết nối và nhận phản hồi từ API. 
* Vấn đề hiệu năng. API thời gian phản hồi rất cao. 
* Lỗi / cảnh báo không đúng cho người gọi 
* Xử lý sai số giá trị đối số hợp lệ 
* Dữ liệu phản hồi không được cấu trúc chính xác (JSON hoặc XML)
# Một số tool kiểm thử API
* SoapUI 
* Postman
* Jmeter 
* Runscope 
* Eclipse SDK tool- Automated kiểm thử API 
# Tóm Lại
Khi kiểm thử API chủ yếu cần phải kiểm tra response code, response message, và response body.
Dưới đây là các response code khác nhau có thể gặp trong kiểm thử API.
![](https://images.viblo.asia/7fcc4039-1228-4ac5-85b7-dd024671aa6c.png)