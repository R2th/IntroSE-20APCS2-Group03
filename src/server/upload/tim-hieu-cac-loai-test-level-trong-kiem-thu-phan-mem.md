Test level là tập các hoạt động kiểm thử được tổ chức và có sự liên kết với nhau. Các mức độ kiểm thử cũng liên quan đến các giai đoạn trong quy trình phát triển phần mềm. Có 4 mức độ kiểm thử:
* Component testing (Unit testing)
* Integration testing 
* System testing 
* Acceptance testing

![](https://images.viblo.asia/e82249e4-d613-464e-b113-74b6b71a3894.png)

## **1. Component testing - Kiểm thử đơn vị**


Component testing còn được gọi là Unit testing: là hành động test ở mức cơ bản, test từng module nhỏ trong hệ thống, ví dụ: các hàm, lớp, phương thức. Kiểm thử đơn vị có thể bao gồm kiểm thử chức năng và phi chức năng, chẳng hạn như hành vi của tài nguyên (ví dụ tìm kiếm sự rò rỉ của bộ nhớ) hoặc kiểm tra mức chịu tải cũng như kiểm tra cấu trúc (ví dụ quyết định độ bao phủ). Trong kiểm thử đơn vị có 2 khái niệm là: Stub và Driver.

**Stub**

Khi cần kiểm tra phương thức A, nhưng phương thức A lại cần dữ liệu từ phương thức B, mà phương thức B lại chưa được viết. Trong trường hợp này ta có thể giả lập một phương thức B để có dữ kiện giúp chúng ta kiểm thử phương thức A, khi đó phương thức giả lập B sẽ gọi là Stub.

**Driver**

Ngược lại với Stub, khi chúng ta cần kiểm thử Module B hoặc phương thức B nhưng cần phải qua Module A hoặc phương thức A mới kiểm thử được B, khi đó ta có thể giả lập Module hoặc phương thức A để ta có thể vào kiểm thử được B, lúc đó phương thức giả lập A gọi là Driver.
![](https://images.viblo.asia/41f29c5c-6c5f-4e52-b68b-ada8c4ff9a18.jpg)

Thông thường, kiểm thử đơn vị được kiểm tra trực tiếp trong code và sẽ do đội Developer thực hiện và sẽ được fix ngay khi họ phát hiện được mà không cần lưu lại và quản lý như ở các test level khác.

## **2. Integration Test – Kiểm thử tích hợp**

Kiểm thử tích hợp là loại kiểm thử trong đó các module phần mềm hay từng chức năng riêng lẻ được tích hợp logic và được kiểm tra theo nhóm chung với nhau. Mức độ kiểm thử này được thực hiện bởi Tester.

Ví dụ: sau khi đã unit test chức năng admin tạo tài khoản user và chức năng user đăng nhập thì ta có thể tiến hành kiểm thử tích hợp của 2 chức năng này để xem chúng có tương tác tốt với nhau không, sau khi admin tạo thành công tài khoản user thì ta có thể tiến hành đăng nhập bằng tài khoản đã được tạo xem có thực hiện được không.

Kiểm thử tích hợp tập trung vào việc kiểm tra interface (giao diện) giữa các thành phần và sự tương tác giữa những thành phần khác nhau trong hệ thống. Một số phương pháp thực hiện integration testing:
* **Big Bang**: tất cả các thành phần được tích hợp cùng một lúc và sau đó được kiểm thử. Cách tiếp cận này được thực hiện khi nhóm kiểm thử nhận được toàn bộ phần mềm.

![](https://images.viblo.asia/91f9b895-161b-4072-a996-15933c743ab2.jpg)
* **Top Down**: Kiểm tra diễn ra từ trên xuống theo luồng điều khiển của hệ thống. Các đơn vị cao nhất được kiểm tra trước và các cấp đơn vị thấp hơn được kiểm tra từng bước sau đó.

![](https://images.viblo.asia/4edefd23-9b3d-444f-bf28-1b0661c68c28.jpg)
* **Bottom up**: Ngược lại với Top Down, ở phương pháp tiếp cận này các đơn vị cấp thấp được kiểm tra trước và các cấp đơn vị cao hơn được kiểm tra sau đó.

![](https://images.viblo.asia/ebd4caf0-2501-4d00-bfd6-b2120ee3276d.jpg)
* **Sandwich/Hybrid**: (còn gọi Phương thức gia tăng chức năng) Là sự kết hợp của hai phương pháp Top Down và Bottom Up. Ở đây, các module hàng đầu được kiểm tra với các module thấp hơn đồng thời các module thấp hơn được tích hợp với các module hàng đầu và được kiểm thử.

![](https://images.viblo.asia/fd133091-1ef1-47ca-bd30-7ead104a92d1.jpg)

## **3. System Test – Kiểm thử hệ thống**

Kiểm thử hệ thống là kiểm thử toàn bộ chức năng và giao diện của hệ thống. System testing là bước test cuối cùng để kiểm tra xem hệ thống chuẩn bị deliver đã thỏa mãn yêu cầu và mục tiêu hay chưa và tìm ra càng nhiều bug càng tốt.

Điểm khác nhau then chốt giữa Integration Test và System Test là System Test chú trọng các hành vi và lỗi trên toàn hệ thống, còn Integration Test chú trọng sự giao tiếp giữa các đơn thể hoặc đối tượng khi chúng làm việc cùng nhau. Thông thường ta phải thực hiện Unit Test và Integration Test để bảo đảm mọi Unit và sự tương tác giữa chúng hoạt động chính xác trước khi thực hiện System Test.

Kiểm thử hệ thống thuộc phạm vi Kiểm thử hộp đen (tức là Tester chỉ quan tâm đầu vào và kết quả mong đợi ở đầu ra mà không cần kiểm tra code bên trong được viết như thế nào). Một số loại kiểm thử thường được thực hiện trong System Test:
* **Kiểm thử chức năng** (Functional Test): Là kiểm thử toàn bộ hệ thống, đảm bảo hệ thống hoạt động đúng theo yêu cầu được đưa ra trước đó.
* **Kiểm thử hiệu năng** (Performance Test): Là kiểm tra sự tuân thủ của hệ thống với các yêu cầu được chỉ định về hiệu năng. Xác định những thuộc tính chất lượng của hệ thống như khả năng mở rộng, độ tin cậy…
* **Kiểm thử cơ sở dữ liệu** ( Database Test): Là kiểm tra dữ liệu hiển thị trên hệ thống có giống với dữ liệu trong cơ sở dữ liệu hay không?
* **Kiểm thử khả năng bảo mật** ( Security Test): Là kiểm tra hệ thống được bảo vệ an toàn, không bị đánh cắp dữ liệu, thông tin trước các tấn công từ bên ngoài.
* **Kiểm thử tính khả dụng** (Usability Test): Kiểm tra tính thân thiện với người dùng và tính dễ sử dụng của hệ thống.
* **Kiểm tra tính tương thích** ( Compatibility Test) : Là kiểm tra xem hệ thống có tương thích với các yếu tố khác của hệ thống mà nó sẽ hoạt động hay không? (Ví dụ: Trình duyệt, hệ điều hành, phần cứng).
* **Kiểm tra khả năng phục hồi** ( Recovery Test): Là kiểm tra hệ thống có khả năng khôi phục trạng thái ổn định khi gặp các sự cố bất thường không.

Khi kiểm thử hệ thống, môi trường test nên được thiết lập sao cho giống hoặc gần giống nhất với môi trường thật để giảm thiểu những rủi ro do đặc thù của môi trường gây ra.

## 4. Acceptance Test – Kiểm thử chấp nhận

Acceptance Test giống như System Test nhưng thường được khách hàng thực hiện test, mục đích là xem phần mềm có đáp ứng đúng yêu cầu của khách hàng chưa. 

Kiểm thử chấp nhận chia làm 2 loại:
* **Alpha test**: Được thực hiện bởi các thành viên của tổ chức phát triển phần mềm nhưng không liên quan trực tiếp đến dự án (Thường là các thành viên của quản lý sản phẩm). Alpha test thực hiện test tại nơi sản xuất phần mềm, là một hình thức kiểm thử nội bộ, trước khi phần mềm được tiến hành kiểm thử Beta.
* **Beta test**: Được thực hiện bởi người dùng cuối cùng (thường là khách hàng). Beta test thực hiện tại địa điểm của khách hàng, người dùng test hay sử dụng hệ thống trong môi trường riêng của họ – không phải nơi phát triển phần mềm.

*Trên đây là các mức độ kiểm thử mà mình đã tìm hiểu được, hy vọng sẽ giúp ích cho các bạn!*

## **Tài liệu tham khảo:**

https://www.guru99.com/software-testing.html

https://softwaretestingfundamentals.com/software-testing-levels/