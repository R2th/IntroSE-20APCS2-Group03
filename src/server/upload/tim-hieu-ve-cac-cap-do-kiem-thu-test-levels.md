Tất cả các giai đoạn của quá trình phát triển phầm mềm đều trải qua quá trình kiểm thử phần mềm. Có 4 cấp độ kiểm thử phần mềm là:

* Kiểm thử đơn vị (Unit Testing)
* Kiểm thử tích hợp (Integration Testing)
* Kiểm thử hệ thống (System Testing)
* Kiểm thử chấp nhận (Acceptance Testing)
# 1. Unit Testing (Kiểm thử đơn vị)
* Kiểm thử đơn vị là cấp độ kiểm thử cơ bản, thực hiện test từng module nhỏ trong hệ thống.
* Kiểm thử đơn vị có thể được thực hiện tách biệt với phần còn lại của hệ thống tùy thuộc vào mô hình vòng đời phát triển được chọn cho ứng dụng cụ thể đó.
* Mục đích: để xác nhận mỗi thành phần của phần mềm thực hiện đúng với thiết kế
* Kiểm thử đơn vị thường do lập trình viên thực hiện

# 2. Integration Testing (Kiểm thử tích hợp)
* Kiểm thử tích hợp có nghĩa là kiểm thử kết hợp. Một dự án phầm mềm được kết hợp bởi nhiều module riêng lẻ khác nhau và được code bởi nhiều lập trình viên khác nhau. Chính vì thế kiểm thử tích hợp là tích hợp kiểm tra các module riêng lẻ với nhau thành một nhóm
* Tích hợp kiểm tra việc truyền dữ liệu giữa các module, tích hợp kiểm tra các hàm lại với nhau, các màn hình với nhau theo từng module hoặc theo chức năng
* Mục đích: để đảm bảo rằng hệ thống tích hợp đã sẵn sàng để thử nghiệm hệ thống
* Kiểm thử tích hợp được thực hiện sau khi kiểm tra đơn vị và trước khi kiểm tra hệ thống
* Integration testing được thực hiện bởi một người thử nghiệm cụ thể hoặc một nhóm kiểm thử 

* Một số phương pháp kiểm thử tích hợp:
   
   Phương pháp kiểm thử Bigbang
   
   Phương pháp kiểm thử Topdown
   
   Phương pháp kiểm thử Bottom up
   
   Phương pháp kiểm thử Sandwich

# 3. System Testing (Kiểm thử hệ thống)
* System Testing là thực hiện kiểm thử một hệ thống đã được tích hợp hoàn chỉnh để xác minh rằng nó đúng yêu cầu của phần mềm.
* Kiểm thử hệ thống nằm trong phạm vi kiểm thử hộp đen và do đó, không yêu cầu kiến ​​thức về thiết kế bên trong của mã hoặc logic.
* Kiểm thử hệ thống thường là thử nghiệm cuối cùng để xác minh rằng hệ thống được phân phối đáp ứng các đặc điểm kỹ thuật và mục đích của nó.
* Kiểm thử hệ thống nên thực hiện kiểm thử chức năng và phi chức năng  và được thực hiện bởi tester
# 4. Acceptance Testing (Kiểm thử chấp nhận)
Sau khi kiểm tra hệ thống đã sửa tất cả hoặc hầu hết các lỗi, hệ thống sẽ được gửi đến người dùng hoặc khách hàng để kiểm tra chấp nhận.
* Về cơ bản kiểm thử chấp nhận cũng khá giống kiểm thử hệ thống nhưng được thực hiện bởi khách hàng

* Mục đích: đảm bảo phần mềm đáp ứng đúng yêu cầu của khách hàng. Sản phẩm nhận được sự chấp nhận từ khách hàng/ người dùng cuối.

* Kiểm thử chấp nhận được chia thành 2 mức khác nhau:
 
   - Kiểm thử alpha: được thực hiện tại nơi phát triển phần mềm bởi những người trong tổ chức nhưng không tham gia phát triển phần mềm.
 
   - Kiểm thử beta: được thực hiện tại bởi khách hàng/ người dùng cuối tại địa điểm của người dùng cuối.

# Kết luận
Các mức độ kiểm thử lầ cần thiết trong suốt quá trình kiểm thử phần mềm. Với mỗi giai đoạn khác nhau cần áp dụng các mức kiểm thử khác nhau để đảm bảo các lỗi phần mềm không được bỏ sót. 

Nguồn tham khảo: 
http://softwaretestingfundamentals.com/software-testing-levels/
https://www.guru99.com/levels-of-testing.html