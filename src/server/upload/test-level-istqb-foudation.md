Có 4 test level bao gồm:
- Component testing
- Integration testing
- System testing
- Acceptance testing

![](https://images.viblo.asia/427ea093-37de-4dd6-9e99-52056ac85e2a.png)


*Test level*

**Các test level có những đặc trưng ở các thuộc tính sau đây:**

-	Specific objectives 
-	Test basis, referenced to derive test cases  
-	Test object
-	Typical defects and failures 
-	Specific approaches and responsibilities 
-	A suitable test environment is required

**Mục tiêu chủ yêu của các Test level:**

- Giảm rủi ro
- Xác minh xem các hành vi chức năng và phi chức năng
- Xây dựng niềm tin rằng những thay đổi không phá vỡ các thành phần, hệ thống hiện có
- Tìm lỗi
- Ngăn chặn các lỗi phát sinh ở các cấp độ kiểm thử cao hơn

### 1. Component testing

Component testing hay còn được gọi là unit testing với mục đích để xác nhận từng unit của phần mềm được phát triển đúng như được thiết kế.

![](https://images.viblo.asia/6d8d2367-6c7e-484a-a4b7-5e9ed67efb44.png)


**Objective**

Tập trung vào các thành phần, module có thể kiểm thử riêng.

**Special**

Thực hiện tách biệt với phần còn lại của hệ thống, yêu cầu các đối tượng giả lập, dịch vụ ảo, stub, driver.

**Test type**

* Functional-testing
* Non-funtional

**Test basis**

* Detailed design  
* Code 
* Data model 
* Component specifications
* Test objects 

**Typical test objects**

* Thành phần, đơn vị hoặc mô-đun code và cấu trúc dữ liệu
* Classes 
* Database modules 

**Environment**
Môi trường phát triển với framework, debug tool,

**Typical defect and failure**

* Chức năng không chính xác (ví dụ: không được mô tả trong tài liệu phân tích thiết kế)
* Vấn đề về luồng dữ liệu
* Code và logic không chính xác
* Lỗi thường được sửa chữa ngay khi chúng được tìm thấy

**Responsibilites**

Developer

**Approach**

Có thể tiếp cận qua phương pháp mô hình Test-first -Test driven development (TDD) nghĩa là sẽ test trước và code sau. 


### 2. Integration testing

![](https://images.viblo.asia/7831fcbc-536b-4452-9f6c-0408e6b12f4d.png)


**Objective**

Tập trung vào việc tương tác và giao diện giữa các thành phần hoặc hệ thống.

**Special**

2 mức khác nhau của kiểm thử tích hợp là:<br>
* Component integration testing - Test tích hợp thành phần
* System integration testing - Test tích hợp hệ thống


**Test type**

* Functional testing
* Non-funtional testing

**Test basis**

* Software and system design - Phần mềm và thiết kế hệ thống
* Sequence diagrams - Biểu đồ tuần tự
* Interface and communication protocol specifications - Giao diện và giao thức 
* Use cases 
* Architecture at component or system level - Kiến trúc ở mức thành phần hoặc hệ thống 
* Workflows - Quy trình làm việc
* External interface definitions - Định nghĩa giao diện bên ngoài


**Typical test objects**

* Subsystems  - Hệ thống con
* Databases  
* Infrastructure- Cơ sở hạ tầng
* Interfaces - Giao diện
* APIs 
* Microservices 


**Environment**
Môi trường cụ thể: ví dụ như môi trường staging, develop,..

**Typical defect and failure**

* Cấu trúc message không nhất quán giữa các hệ thống
* Dữ liệu không chính xác, dữ liệu bị thiếu hoặc mã hóa dữ liệu không chính xác
* Trình tự hoặc thời gian của các chu trình không chính xác
* Lỗi trong giao tiếp giữa các thành phần
* Lỗi giao tiếp không được xử lý hoặc xử lý không đúng cách giữa các thành phần
* Các giả định không chính xác về ý nghĩa, đơn vị hoặc giá trị biên của dữ liệu được truyền giữa các thành phần
* Không tuân thủ quy định bảo mật bắt buộc

**Responsibilites**

Developer and tester

**Approach**
![](https://images.viblo.asia/94b8088d-9d84-4c9d-823b-90c707099381.png)


Phạm vi tích hợp càng lớn, càng khó phân tách các lỗi cho thành phần hoặc hệ thống cụ thể
Có 2 phương pháp tiếp cận là:

* Big-bang integration 
* Incremental integration


### 3. System testing

![](https://images.viblo.asia/0705fdd5-1357-478f-966c-c958d9b2b008.png)


**Objective**

Tập trung vào hành vi và khả năng của cả một hệ thống hoặc sản phẩm.

**Special**

Hầu như không có tài liệu mà dựa trên kinh nghiệm

**Test type**

* Functional testing
* Non-funtional testing

**Test basis**

* Tài liệu đặc tả yêu cầu phần mềm và hệ thống( chức năng và phi chức năng)
* Báo cáo phân tích rủi ro
* Use cases
* Lịch sử và phân tích người  dùng
* Mô hình hành vi hệ thống
* Hướng dẫn sử dụng hệ thống

**Typical test objects**

* Ứng dụng dử dụng
* Hệ thống phần cứng và phần mềm
* Các hệ điều hành
* Hệ thống đang thử nghiệm (SUT)
* Cấu hình hệ thống và dữ liệu cấu hình

**Environment**
Tương thích với môi trường production

**Typical defect and failure**

* Tính toán không chính xác
* Chức năng hệ thống không chính xác hoặc không mong đợi hoặc các hành vi phi chức năng
* Điều khiển và / hoặc luồng dữ liệu không chính xác trong hệ thống
* Không thực hiện đúng và không hoàn toàn các nhiệm vụ chức năng đến cuối cùng
* Lỗi hệ thống không hoạt động đúng trong môi trường production.
* Lỗi hệ thống không hoạt động như mô tả trong hướng dẫn sử dụng hệ thống người dùng. 

**Responsibilites**

Tester kiểm tra độc lậpCác kỹ thuật t thích hợp nhất cho (các) khía cạnh của
  hệ thống được kiểm tra

**Approach**

* Black box testing 
* Theo kinh nghiệm


### 4. Acceptance testing

![](https://images.viblo.asia/512f7039-bbe9-4316-bdcf-01d98066571a.png)


**Objective**

- Xây dựng niềm tin vào chất lượng của toàn bộ hệ thống
- Xác nhận rằng hệ thống đã hoàn tất và sẽ hoạt động như mong đợi
- Xác minh rằng các hành vi chức năng và phi chức năng của hệ thống là các hình thức kiểm tra chấp nhận phổ biến được chỉ định



**Test basis**

* Business processes 
-	User or business requirements 
-	Regulations, legal contracts and standards  
-	Use cases 
-	System requirements 
-	System or user documentation  
-	Installation procedures - 	Risk analysis reports 



**Typical test objects**

* Hệ thống đang thử nghiệm
- Cấu hình hệ thống và dữ liệu cấu hình
- Quy trình kinh doanh cho một hệ thống tích hợp đầy đủ
- Hệ thống khôi phục và các trang web nóng (để kiểm tra khả năng phục hồi liên tục và khắc phục thảm họa)
- Báo cáo mẫu
- Dữ liệu sản xuất hiện có và được chuyển đổi


**Environment**
Môi trường cụ thể: ví dụ như môi trường staging, develop,..

**Typical defect and failure**

- Quy trình công việc của hệ thống không đáp ứng yêu cầu của người dùng hoặc doanh nghiệp - Quy tắc kinh doanh không được triển khai chính xác
- Hệ thống không đáp ứng các yêu cầu hợp đồng hoặc quy định
- Các lỗi không chức năng như lỗ hổng bảo mật, hiệu suất hoạt động không đủ khi tải cao hoặc hoạt động không đúng trên nền tảng được hỗ trợ

**Responsibilites**

* Khách hàng
* Người dùng

**Approach**

* Functional
* Non-function
* Black box
* White box


**Tham khảo:**<br>
istqb.org<br>
https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.qualitylogic.com%2F2018%2F01%2F11%2Fcloser-look-integration-testing%2F&psig=AOvVaw2QzIEhmZRr6WBBs8FWOT_U&ust=1590373091257000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCLjVl8-3y-kCFQAAAAAdAAAAABAm