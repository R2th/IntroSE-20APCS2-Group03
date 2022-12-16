Các bài kiểm tra được nhóm lại với nhau dựa trên vị trí chúng được thêm vào trong SDLC hoặc theo mức độ chi tiết của chúng. Nói chung, có bốn cấp độ kiểm thử: kiểm thử đơn vị, kiểm thử tích hợp, kiểm thử hệ thống và kiểm thử chấp nhận. Mục đích của Cấp độ kiểm thử là làm cho việc kiểm thử phần mềm có hệ thống và dễ dàng xác định tất cả các trường hợp kiểm thử có thể có ở một cấp độ cụ thể.

Có nhiều cấp độ kiểm tra khác nhau giúp kiểm tra hành vi và hiệu suất để kiểm thử phần mềm. Các cấp độ kiểm tra này được thiết kế để nhận ra các khu vực còn thiếu và điều hòa giữa các trạng thái của vòng đời phát triển. Trong các mô hình SDLC có các giai đoạn đặc trưng như thu thập yêu cầu, phân tích, thiết kế, mã hóa hoặc thực thi, thử nghiệm và triển khai. Tất cả các giai đoạn này đều trải qua quá trình cấp kiểm thử phần mềm.

# Các loại Test Level

Chủ yếu có bốn cấp độ kiểm tra trong kiểm thử phần mềm: 

**Unit Testing** : Kiểm tra xem các thành phần phần mềm có đáp ứng đầy đủ các chức năng hay không           
**Integration Testing** : Kiểm tra luồng dữ liệu từ một mô-đun này sang các mô-đun khác  
**System Testing** : Đánh giá cả nhu cầu chức năng và phi chức năng cho việc kiểm thử  
**Acceptance Testing** : Xác nhận rằng phần mềm đã tạo ra có hoạt động phù hợp với người dùng cuối hay không

![image.png](https://images.viblo.asia/2369130a-6d24-4f8e-a17b-529252e72b6a.png)

Mỗi cấp độ thử nghiệm đều có một mục đích cụ thể. Mức độ kiểm thử này cung cấp giá trị cho vòng đời phát triển phần mềm.

## 1.  Unit testing - Kiểm thử đơn vị

Khái niệm: Kiểm thử đơn vị là loại kiểm thử phần mềm trong đó các đơn vị/thành phần đơn lẻ của phần mềm sẽ được kiểm tra như: Hàm (Function), Lớp (Class), Phương thức (Method) và người thực hiện kiểm tra thường là các developer. Kiểm thử đơn vị được thực hiện trong quá trình phát triển ứng dụng. Lỗi ở level này thường được fix ngay sau khi chúng được tìm ra mà không cần lưu lại và quản lý như các test level khác.

Mục đích:

* Lỗi dễ được tìm thấy và được sửa sớm trong chu trình phát triển phần mềm vì vậy tiết kiệm thời gian và chi phí sửa lỗi.

* Tách riêng từng phần để kiểm tra và chứng minh các thành phần đó thực hiện chính xác các yêu cầu chức năng trong đặc tả

* Mã code được tái sử dụng nhiều hơn

* Giúp cho việc thay đổi và bảo trì trở nên dễ dàng hơn

* Ngăn chặn lỗi xuất hiện trong các giai đoạn kiểm thử sau

Sử dụng phương pháp: Kiểm thử hộp trắng

Môi trường test: Framework, debug tool,

Người thực hiện: Developer 

## 2.  Integration Testing – Kiểm thử tích hợp

Khái niệm: Kiểm thử tích hợp là loại kiểm thử trong đó các module phần mềm hay từng chức năng riêng lẻ được tích hợp logic và được kiểm tra theo nhóm chung với nhau. Mỗi dự án phần mềm gồm nhiều module, được code bởi nhiều người khác nhau, vì vậy kiểm thử tích hợp tập chung vào việc kiểm tra tương tác, truyền dữ liệu giữa các module hoặc đơn vị được tích hợp

Mục đích: Phát hiện lỗi tương tác xảy ra giữa các module. Tập chung chủ yếu vào các giao diện và thông tin giữa các module. Tích hợp các module đơn lẻ thành các hệ thống nhỏ.

Một số phương pháp kiểm thử tích hợp:

### 2.1. Big Bang

Đây là phương pháp test tích hợp mà tất cả hoặc hầu hết các unit được kết hợp với nhau và cùng được kiểm thử. Phương pháp này được thực hiện khi team kiểm thử nhận được toàn bộ phần mềm

Ưu điểm: phù hợp với các dự án nhỏ

Nhược điểm: có thể bỏ qua các bug giao diện nhỏ trong quá trình tìm bug, mất thời gian cho tích hợp hệ thống nên không có thời gian cho test

![image.png](https://images.viblo.asia/bbbcfae8-a617-4028-8848-6de65fd9fd3b.png)

### 2.2. Top down

Kiểm thử được thực hiện từ trên xuống dưới. Đơn vị cao nhất được kiểm thử đầu tiền, đơn vị thấp hơn được kiểm thử sau đó một cách tuần tự

Ưu điểm: thu gọn bug dễ dàng hơn, module quan trọng được kiểm thử đầu tiên lỗi trong thiết kế lớn có thể được tìm thấy và cố định đầu tiên.

Nhược điểm: module ở mức độ thấp hơn sẽ được kiểm tra không đầy đủ

![image.png](https://images.viblo.asia/9b39e98d-6029-4483-b0a6-922b5e7fa31b.png)

### 2.3. Bottom up

Kiểm thử được thực hiện từ dưới lên trên. Đơn vị thấp nhất được kiểm thử đầu tiền, đơn vị cao hơn được kiểm thử sau đó.

Ưu điểm: thu gọn bug dễ dàng hơn, không mất thời gian để đợi các module được tích hợp.

Nhược điểm: module quan trọng của hệ thống có thể dễ bị lỗi, không giữ được nguyên mẫu ban đầu của hệ thống.

![image.png](https://images.viblo.asia/338d139e-07ba-401f-883c-9f79b7fa68d2.png)

### 2.4. Sandwich/Hybrid

Còn gọi Phương thức gia tăng chức năng. Là sự kết hợp của hai phương pháp Top Down và Bottom Up. Ở đây, các module hàng đầu được kiểm tra với các module thấp hơn đồng thời các module thấp hơn được tích hợp với các module hàng đầu và được kiểm thử.

![image.png](https://images.viblo.asia/70e26a0b-8488-4ad6-8ff4-1dc62a94068a.png)

Môi trường test: staging, develop

Người thực hiện: Developer and Tester

## 3. System Testing – Kiểm thử hệ thống

Khái niệm: Kiểm thử hệ thống là thực hiện kiểm thử một hệ thống đã được tích hợp hoàn chỉnh để đảm bảo nó hoạt động đúng yêu cầu

Mục đích:  Đánh giá hệ thống có đáp ứng theo đúng yêu cầu nghiệp vụ, yêu cầu về chức năng theo bản đặc tả yêu cầu phần mềm đưa ra hay không

Các loại kiểm thử hệ thống:

* Kiểm tra chức năng - Functional Testing: Kiểm thử chức năng nhằm đảm bảo chức năng phần mềm được vận hành theo đúng mục đích đưa ra

* Kiểm tra khả năng Recoverability Testing: Nó được thực hiện bằng cách cố làm cho phần mềm bị crash hoặc fail, để đánh giá khả năng phục hồi của sản phẩm một cách nhanh chóng.

* Kiểm tra khả năng tương tác - Interoperability Testing: Nó đảm bảo khả năng phần mềm tương thích và tương tác với phần mềm hoặc hệ thống khác và các thành phần của chúng.

* Kiểm tra năng suất - Performance Testing: Nó được thực hiện để kiểm tra phản ứng, độ ổn định, khả năng mở rộng, độ tin cậy và các số liệu chất lượng khác của phần mềm dưới các khối lượng công việc khác nhau.

* Kiểm tra khả năng mở rộng - Scalability Testing: Để đảm bảo các khả năng mở rộng quy mô của hệ thống theo các thuật ngữ khác nhau như chia tỷ lệ người dùng, chia tỷ lệ theo địa lý và mở rộng tài nguyên.

* Kiểm tra độ tin cậy - Reliability Testing: Đảm bảo hệ thống có thể được vận hành trong thời gian dài hơn mà không phát triển lỗi.

* Kiểm tra hồi quy - Regression Testing: Đảm bảo hệ thống ổn định khi hệ thống tích hợp các hệ thống con và nhiệm vụ bảo trì khác nhau.

* Kiểm tra bảo mật - Security Testing: Để đảm bảo rằng hệ thống không cho phép truy cập trái phép vào dữ liệu và tài nguyên.

* Kiểm thử khả năng sử dụng - Usability Testing: kiểm thử khả năng sử dụng chủ yếu tập trung vào việc người dùng dễ dàng sử dụng ứng dụng, linh hoạt trong việc kiểm soát xử lý và khả năng của hệ thống để đáp ứng các mục tiêu.

Sử dụng phương pháp: Kiểm thử hộp đen là phổ biến.

Môi trường test: production

Người thực hiện: Tester

## 4. Acceptance Test – Kiểm thử chấp nhận

Khái niệm: Kiểm thử chấp nhận chính thức liên quan đến yêu cầu và quy trình kinh doanh để xác định liệu hệ thống có đáp ứng tiêu chí chấp nhận hay không và cho phép người dùng, khách hàng hoặc tổ chức được ủy quyền khác xác định có chấp nhận hệ thống hay không

Mục đích: Để nghiệm thu hệ thống trước khi hệ thống được đưa vào hoạt động

Kiểm thử chấp nhận thường là trách nhiệm của người dùng hoặc khách hàng. Trong kiểm thử hệ thống, khách hàng sẽ kiểm tra xem phần mềm được viết có hoạt động đúng như mong đợi của mình không, có đảm bảo tính tiện dụng, hiệu suất hoạt động có như mong đợi không, có bảo mật tốt hay không,….

Tìm lỗi không phải là trọng tâm chính trong kiểm thử chấp nhận, vì việc tìm lỗi đã được đội Developer và Tester thực hiện trong các giai đoạn kiểm thử đơn vị, kiểm thử tích hợp, kiểm thử hệ thống rồi

Kiểm thử chấp nhận được chia thành 2 loại: 

* Kiểm thử alpha: được thực hiện tại nơi phát triển phần mềm bởi những người trong tổ chức nhưng không tham gia phát triển phần mềm.

* Kiểm thử beta: được thực hiện tại bởi khách hàng/ người dùng cuối tại địa điểm của người dùng cuối.

Sử dụng phương pháp: Kiểm thử hộp đen.

Môi trường test: staging, develop, production,..

Người thực hiện: thường là khách hàng hoặc bên thứ ba

Tài liệu tham khảo: 
https://www.guru99.com/levels-of-testing.html
https://www.javatpoint.com/levels-of-testing
https://softwaretestingfundamentals.com/software-testing-levels/