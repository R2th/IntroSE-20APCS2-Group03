## 1. Khái niệm
**Kiểm thử chấp nhận** là kiểm tra xem phần mềm đã thỏa mãn tất cả yêu cầu của khách hàng chưa? Và khách hàng có chấp nhận sản phẩm hay không?<br>
UAT được thực hiện sau khi kiểm thử hệ thống kết thúc và tất cả hoặc hầu hết các lỗi lớn đã được sửa. Kiểm thử này sẽ được thực hiện trong giai đoạn cuối cùng của vòng đời phát triển phần mềm (SDLC) trước khi hệ thống được chuyển đến môi trường thực.
## 2. Tại sao phải kiểm thử chấp nhận?
Khi phần mềm đã trải qua kiểm thử đơn vị, kiểm thử tích hợp, kiểm thử hệ thống, nhu cầu kiểm thử chấp nhận có thể dư thừa. Nhưng kiểm thử chấp nhận là cần thiết bởi vì:<br>
* Các nhà phát triển phần mềm dựa trên tài liệu yêu cầu, là sự hiểu biết riêng của họ về các yêu cầu và có thể không thực sự là những gì khách hàng cần từ phần mềm.
* Các yêu cầu thay đổi trong suốt quá trình của dự án có thể không được truyền đạt hiệu quả đến các nhà phát triển.<br>
 ![](https://images.viblo.asia/15ff6a16-8fa7-496c-93fd-ef8298a80297.png)
## 3. Điều kiện tiên quyết của kiểm thử chấp nhận
Dưới đây là những điều kiện được thực hiện trước khi kiểm thử chấp nhận:
* Các yêu cầu nghiệp vụ phải có sẵn
* Phần mềm được phát triển hoàn thiện nhất
* Kiểm thử đơn vị, kiểm thử hệ thống nên được hoàn thành
* Không có các lỗi nghiêm trọng, cao, trung bình trong hệ thống
* Chỉ lỗi về thẩm mỹ được chấp nhận trước UAT 
* Kiểm tra hồi quy nên được hoàn thành, không có lỗi lớn
* Tất cả các lỗi đã báo cáo phải được sửa và kiểm tra trước khi UAT
* Môi trường UAT phải được chuẩn bị sẵn sàng
* Nhà phát triển hệ thống chắc chắn rằng hệ thống đã sẵn sàng thực hiện UAT
## 4. Quy trình của kiểm thử chấp nhận
![](https://images.viblo.asia/3a78b34c-6202-4ef8-8ff7-3dd566c2e9a9.png)<br>
1.  **Phân tích yêu cầu nghiệp vụ** là xác định và xây dựng các kịch bản kiểm thử. Các kịch bản kiểm thử này được lấy từ các tài liệu sau:
      * Điều lệ dự án
      * Use case nghiệp vụ
      * Sơ đồ quy trình
      * Tài liệu yêu cầu nghiệp vụ
      * Đặc tả yêu cầu hệ thống
3.  **Tạo kế hoạch kiểm tra UAT** là phác thảo chiến lược sẽ được sử dụng để kiểm tra và đảm bảo ứng dụng đáp ứng các yêu cầu nghiệp vụ của nó. Nó ghi lại các tiêu chí bắt đầu, tiêu chí thoát cho UAT, kịch bản kiểm thử, trường hợp kiểm thử và thời gian kiểm thử.
4.  **Xác định các kịch bản kiểm thử và tạo các trường hợp kiểm thử** liên quan đến quy trình nghiệp vụ và tạo các trường hợp kiểm thử với các bước kiểm thử rõ ràng. Các trường hợp kiểm thử nên bao gồm hầu hết các kịch bản UAT. Use cases nghiệp vụ là đầu vào để tạo các trường hợp kiểm thử.
6.  **Chuẩn bị dữ liệu kiểm thử** nên sử dụng dữ liệu trực tiếp cho UAT. Dữ liệu nên được xáo trộn vì lý do riêng tư và bảo mật. Người kiểm thử nên làm quen với luồng cơ sở dữ liệu.
7.  **Chạy các trường hợp kiểm thử** là thực hiện các trường hợp kiểm thử như đã tạo với các dữ liệu đã chuẩn bị.
8.  **Ghi kết quả** là báo cáo lỗi nếu có. Kiểm tra lại lỗi khi đã sửa. Công cụ quản lý kiểm thử có thể được sử dụng để thực hiện.
9.  **Xác nhận mục tiêu nghiệp vụ** là người kiểm tra UAT cần gửi thư tắt sau khi kiểm tra UAT. Các sản phẩm để thử nghiệm UAT là kế hoạch kiểm thử, kịch bản UAT, các trường hợp kiểm thử, kết quả kiểm thử, nhật ký lỗi
## 5. Tiêu chí thoát UAT
Trước khi chuyển sang sản xuất, cần xem xét các yếu tố sau:<br>
* Không có lỗi quan trọng về chức năng và cả giao diện
* Quy trình nghiệp vụ hoạt động ổn định
* UAT họp với tất cả các bên liên quan
## 6. Người thực hiện kiểm thử chấp nhận
* Khách hàng
* Người dùng cuối cùng
![](https://images.viblo.asia/77f2bd7c-9f76-48d6-a935-ef3e1f77b7d1.jpg)
## 7. Các loại kiểm thử chấp nhận
Trong kiểm thử chấp nhận lại chia ra làm 2 loại chính:<br>
* **Alpha test**: Được thực hiện bởi các thành viên của tổ chức phát triển phần mềm nhưng không liên quan trực tiếp đến dự án (Thường là các thành viên của quản lý sản phẩm). Alpha test thực hiện test tại nơi sản xuất phần mềm, là một hình thức kiểm thử nội bộ, trước khi phần mềm được tiến hành kiểm thử Beta.<br>
* **Beta test**: Được thực hiện bởi người dùng cuối cùng (thường là khách hàng). Beta test thực hiện tại địa điểm của khách hàng, người dùng test hay sử dụng hệ thống trong môi trường riêng của họ - không phải nơi phát triển phần mềm. Kiểm thử Beta là một trong những phương pháp để đánh giá mức độ hài lòng của khách hàng đối với sản phẩm. Sau khi trải nghiệm sản phẩm khách hàng sẽ phản hồi về thiết kế, chức năng và khả năng sử dụng và điều này giúp đánh giá chất lượng sản phẩm.<br><br>
Tài liệu tham khảo
https://www.guru99.com/user-acceptance-testing.html<br>
https://www.softwaretestinghelp.com/what-is-acceptance-testing/<br>
https://www.softwaretestingclass.com/user-acceptance-testing-what-why-how/