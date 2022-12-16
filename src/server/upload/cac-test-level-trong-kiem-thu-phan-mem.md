![](https://images.viblo.asia/3c364b54-f42b-41ab-b479-e51c997a9d62.gif)
## 1. Unit Test  - Kiểm thử đơn vị
* **Khái niệm:** Kiểm thử đơn vị là loại kiểm thử phần mềm trong đó các đơn vị/thành phần đơn lẻ của phần mềm được kiểm tra như: Hàm (Function), Lớp (Class), Phương thức (Method). Kiểm thử đơn vị được thực hiện trong quá trình phát triển ứng dụng. Lỗi ở level này thường được fix ngay sau khi chúng được tìm ra mà không cần lưu lại và quản lý như các test level khác.

* **Mục đích** 
  + Tách riêng từng phần để kiểm tra và chứng minh các thành phần đó thực hiện chính xác các yêu cầu chức năng trong đặc tả. 
  + Lỗi được sửa sớm trong chu trình phát triển phần mềm vì vậy tiết kiệm thời gian và chi phí sửa lỗi.
  + Mã nguồn được tái sử dụng nhiều hơn.
  + Tăng sự tin tưởng trong việc thay đổi hoặc bảo trì 
  + Mã nguồn đáng tin cậy hơn.
* **Sử dụng phương pháp:** Kiểm thử hộp trắng
* **Người thực hiện:** Thường là developer thực hiện
## 2. Integration Test - Kiểm thử tích hợp
* **Khái niệm:** Kiểm thử tích hợp là loại kiểm thử trong đó các module phần mềm hay từng chức năng riêng lẻ được tích hợp logic và được kiểm tra theo nhóm. Mỗi dự án phần mềm gồm nhiều modules, được code bởi nhiều người khác nhau, vì vậy kiểm thử tích hợp tập chung vào việc kiểm tra truyền dữ liệu giữa các module.
* **Mục đích:** Phát hiện lỗi tương tác xảy ra giữa các Unit. Tập chung chủ yếu vào các giao diện và thông tin giữa các module. Tích hợp các Unit đơn lẻ thành các hệ thống nhỏ.
* **Cách tiếp cận:** 
  + **Big Bang:** tất cả các thành phần được tích hợp cùng một lúc và sau đó được kiểm thử. Cách tiếp cận này được thực hiện khi nhóm kiểm thử nhận được toàn bộ phần mềm
![](https://images.viblo.asia/296acc4f-8171-49c5-b2b9-37be303bf106.jpg)
  + **Top Down:** Kiểm tra diễn ra từ trên xuống theo luồng điều khiển của hệ thống. Các đơn vị cao nhất được kiểm tra trước và các cấp đơn vị thấp hơn được kiểm tra từng bước sau đó. 
![](https://images.viblo.asia/c2624061-3e7a-472f-a8c5-1b3c0dc8f055.png)
  + **Bottom up:** Ngược lại với Top Down, ở phương pháp tiếp cận này các đơn vị cấp thấp được kiểm tra trước và các cấp đơn vị cao hơn được kiểm tra sau đó.
![](https://images.viblo.asia/285d8591-8a46-426a-a843-176bdec054f3.png)
  + **Sandwich/Hybrid:** Là sự kết hợp của hai phương pháp Top Down và Bottom Up. Ở đây, các module hàng đầu được kiểm tra với các module thấp hơn đồng thời các module thấp hơn được tích hợp với các module hàng đầu và được kiểm thử.
![](https://images.viblo.asia/2d49ed98-8e8f-4e89-bfd9-ad91b7cc2007.png)
* **Người thực hiện:** Thường là Tester thực hiện
* **Ví dụ:** Có 2 module Login, Tạo tài khoản cho người dùng
    + Admin tạo tài khoản cho người dùng thành công, tài khoản có trạng thái là đang hoạt động. Người dùng sử dụng tài khoản vừa tạo đăng nhập thành công vào hệ thống.
    + Nếu Admin chuyển tài khoản này thành trạng thái ngừng hoạt động. Người dùng sử dụng tài khoản này đăng nhập, hệ thống sẽ báo không thành công.
## 3. System Test - Kiểm thử hệ thống
* **Khái niệm:** Kiểm thử hệ thống là kiểm thử toàn bộ chức năng và giao diện của hệ thống.
* **Mục đích:** Đánh giá  hệ thống có đáp ứng theo đúng yêu cầu nghiệp vụ, yêu cầu về chức năng đưa ra hay không.
* **Phân loại:** <br/>
Dưới đây là một số loại kiểm thử thường được thực hiện trong System Test:
  + Kiểm thử chức năng (Functional Test): Là kiểm thử toàn bộ hệ thống, đảm bảo hệ thống hoạt động đúng theo yêu cầu được đưa ra trước đó.
  + Kiểm thử hiệu năng (Performance Test): Là kiểm tra sự tuân thủ của hệ thống với các yêu cầu được chỉ định về hiệu năng. Xác định những thuộc tính chất lượng của hệ thống như khả năng mở rộng, độ tin cậy...
  + Kiểm thử cơ sở dữ liệu ( Database Test): Là kiểm tra dữ liệu hiển thị trên hệ thống có giống với dữ liệu trong cơ sở dữ liệu hay không?
  + Kiểm thử khả năng bảo mật ( Security Test): Là kiểm tra hệ thống được bảo vệ an toàn, không bị đánh cắp dữ liệu, thông tin trước các tấn công từ bên ngoài.
  + Kiểm thử tính khả dụng (Usability Test): Kiểm tra tính thân thiện với người dùng và tính dễ sử dụng của hệ thống.
  + Kiểm tra tính tương thích ( Compatibility Test) : Là kiểm tra xem hệ thống có tương thích với các yếu tố khác của hệ thống mà nó sẽ hoạt động hay không? (Ví dụ: Trình duyệt, hệ điều hành, phần cứng)
  + Kiểm tra khả năng phục hồi ( Recovery Test): Là kiểm tra hệ thống có khả năng khôi phục trạng thái ổn định khi gặp các sự cố bất thường không
* **Sử dụng phương pháp:** Kiểm thử hộp đen là phổ biến
* **Người thực hiện:** Thường là Tester thực hiện
## 4. Acceptance Test - Kiểm thử chấp nhận
* **Khái niệm:** Kiểm thử chấp nhận là kiểm tra xem phần mềm đã thỏa mãn tất cả yêu cầu của khách hàng chưa? Và khách hàng có chấp nhận sản phẩm hay không?
* **Mục đích:** Để nghiệm thu hệ thống trước khi hệ thống được đưa vào hoạt động.
* **Phân loại**<br/>
Trong kiểm thử chấp nhận lại chia ra làm 2 loại:
  + **Alpha test:** Được thực hiện bởi các thành viên của tổ chức phát triển phần mềm nhưng không liên quan trực tiếp đến dự án (Thường là các thành viên của quản lý sản phẩm). Alpha test  thực hiện test tại nơi sản xuất phần mềm, là một hình thức kiểm thử nội bộ, trước khi phần mềm được tiến hành kiểm thử Beta.
  + **Beta test:** Được thực hiện bởi người dùng cuối cùng (thường là khách hàng). Beta test thực hiện tại địa điểm của khách hàng, người dùng test hay sử dụng hệ thống trong môi trường riêng của họ - không phải nơi phát triển phần mềm.
*  **Sử dụng phương pháp:** Kiểm thử hộp đen
*  **Người thực hiện:** Khách hàng hoặc bên thứ 3<br/><br/>

Hi vọng bài viết sẽ giúp ích cho các bạn !!!!<br/>
Tài liệu tham khảo<br/>
http://softwaretestingfundamentals.com/unit-testing/
https://www.guru99.com/software-testing.html