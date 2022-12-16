### 1. API là gì?
Nói đơn giản, API là cái cầu nối giữa client và server. Client ở đây có thể là máy tính, điện thoại sử dụng hệ điều hành khác nhau và được viết bằng những ngôn ngữ khác nhau. Tương tự, server back-end cũng được viết bằng các ngôn ngữ khác nhau. Để 2 thằng này có thể nói chuyện được với nhau chúng phải nói cùng 1 ngôn ngữ. Ngôn ngữ ấy chính là API.
![](https://images.viblo.asia/670b9aac-402f-4e1c-9100-20366a3b82f0.png)
### 2. Vì sao phải test API?
* Trong quá trình triển khai dự án, phần server và client làm độc lập với nhau nên có nhiều chỗ client chưa làm xong, mình không thể chờ client làm xong để test được dữ liệu mà test API bằng công cụ khác luôn –> Lúc này việc test hoàn toàn không phụ thuộc gì vào client.
* Kể cả khi client làm xong rồi, nếu mình test trên client mà thấy lỗi liên quan đến logic và dữ liệu thì cũng cần test thêm cả API để biết chính xác là server sai hay client sai –> fix lỗi sẽ nhanh hơn.
* Khi làm hệ thống web services, dự án của mình chỉ viết API cho bên khác dùng, mình sẽ không có client để test giống như các dự án khác –> phải test API hoàn toàn.
 
### 3. Các phương thức cơ bản 
Nhìn chung có 4 phương thức mà các tester cần phải chú ý và nắm rõ:
* GET để truy vấn object
* POST để tạo object mới
* PUT để sửa đổi hoặc thay thế một object
* DELETE để loại bỏ 1 object
 
### 4. Test case cho API testing
Test case test API dựa trên:
* Giá trị trả về dựa trên điều kiện đầu vào: tương đối dễ dàng để kiểm tra, đầu vào có thể được xác định và kết quả có thể được xác thực.
* Không trả lại bất cứ điều gì: khi không có giá trị trả về, phải kiểm tra hành vi của API trên hệ thống.
* Kích hoạt một số API/event/giai đoạn khác: Nếu đầu ra của API kích hoạt một số sự kiện hoặc bị gián đoạn thì những sự kiện/sự gián đoạn đó sẽ được theo dõi.
* Cập nhật cấu trúc dữ liệu: cập nhật cấu trúc dữ liệu sẽ có một số ảnh hưởng đến hệ thống, cho nên cần được xác thực 
* Sửa đổi một số tài nguyên: Nếu API gọi sửa đổi một số tài nguyên thì cần phải xác nhận hợp lệ bằng cách truy cập các tài nguyên tương ứng.
### 5. Phương pháp kiểm tra API
Các điểm sau giúp người dùng thực hiện phương pháp Kiểm tra API:
* Hiểu chức năng của chương trình API và xác định rõ phạm vi của chương trình.
* Áp dụng các kỹ thuật kiểm tra như phân vùng tương đương, phân tích giá trị biên và đoán lỗi và viết các trường hợp kiểm thử cho API.
* Các tham số đầu vào cho API cần được lên kế hoạch và xác định một cách thích hợp.
* Thực hiện các trường hợp thử nghiệm và so sánh kết quả dự kiến và thực tế.
 
### 6. Khác biệt giữa Unit test với API test


| Unit test | API test | 
| -------- | -------- | 
| Thực hiện bởi developer     | Thực hiện bởi tester     | 
| Kiểm thử những chức năng riêng biệt    | Kiểm thử những chức năng liên quan đến nhau   | 
| Dev có thể truy cập vào source code | Tester không thể truy cập vào source code | 
| Phải kiểm tra cả UI   | Phải kiểm tra các hàm API   | 
|Chỉ các chức năng đơn giản được kiểm thử  | Tất cả các chức năng được kiểm thử | 
|Giới hạn phạm vi   | Phạm vi rộng hơn    | 
| Thường được chạy trước khi build    | Thường được chạy sau khi build   | 
### 7. Cách kiểm thử API
Kiểm thử API nên được thực theo các phương pháp kiểm thử trong quy trình phát triển phần mềm:
* Discovery testing: Kiểm tra các API khi truy cập các tài nguyên và xem các API truy cập các tài nguyên, có được các quyền xem, xóa và sửa hợp lệ hay không
* Usability testing: Loại kiểm thử này kiểm tra xem API có làm đúng chức năng và thân thiện hay không. và API được tích hợp tốt trên các nền tảng khác hay không
* Security testing: Loại kiểm thử này bao gồm các loại xác thực được yêu cầu và xem các dữ liệu nhạy cảm có được mã hóa thông qua HTTP hoặc cả hai hay không
* Automated testing: Kiểm thử API được nâng cao trong việc tạo ra các đoạn mã hoặc công cụ mà có thể chạy API thường xuyên
* Documentation: Đội kiểm thử phải đảm bảo rằng các tài liệu thích hợp và cung cấp đầy đủ các thông tin để tương tác với API. Tài liệu nên là một phần khi bàn giao
 
### 8. Cách thực hành tốt cho kiểm thử API
* Test case nên được nhóm theo loại kiểm thử
* Trên mỗi test case, nên bao gồm cả phần khai báo các API được gọi
* Các tham số lựa chọn nên được liệt kê đầy đủ trong các test case
* Nên đặt độ ưu tiên cho các API được gọi để dễ dàng test hơn
* Mỗi test các nên được khép kín, độc lập và tránh ít phụ thuộc
* Nên tránh kiểm tra xâu chuỗi (test chaining) trong quá trình phát triển
* Đặc biệt chú ý khi thực hiện xử lý các chức năng gọi một lần như xóa, đóng cửa sổ....
* Gọi trình tự nên được thực hiện và lập kế hoạch tốt
* Để đảm bảo hoàn thành các kiểm thử, tạo test case cho tất cả các tổ hợp đầu vào có thể có của API
 
### 9. Các loại lỗi mà kiểm thử API tìm ra
* Lỗi do xử lý các lỗi điều kiện tạo ra
* Các cờ chưa sử dụng
* Thiếu hoặc lặp các chức năng
* Các vấn đề về độ tin cậy. Khó khăn trong việc kết nối và nhận được phản hồi từ API.
* Các vấn đề về bảo mật
* Vấn đề về xử lý đa luồng
* Vấn đề về hiệu năng. Thời gian API phản hồi rất cao
* Lỗi/cảnh báo không đúng
* Xử lý không đúng các giá trị đối số hợp lệ
* Cấu trúc dữ liệu trả về không chính xác(JSON hoặc XML)
 
### 10. Các tool cho kiểm thử API
Kiểm thử API và Unit đều là kiểm tra về source code nên các công cụ tương tự có thể sử dụng cho cả hai
* SOAPUI
* Runscope
* Postman
* Curl
* Cfix
* Check
* CTESK
* dotTEST
* Eclipse SDK tool- Automated API testing

----------------------------------
Nguồn: https://www.guru99.com/api-testing.html