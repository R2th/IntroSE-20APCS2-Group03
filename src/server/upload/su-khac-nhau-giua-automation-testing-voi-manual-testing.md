## **1. Manual testing là gì?**
Manual testing là việc kiểm thử phần mềm được thực hiện thủ công bởi QA/tester. 
Nó được thực hiện để tìm ra bug trong quá trình phát triển phần mềm. Trong manual testing, Tester phải kiểm tra tất cả các tính năng cần thiết của ứng dụng. Trong quá trình này, Tester phải execute test, lập báo cáo mà không cần sự trợ giúp của bất kì công cụ tự động nào.
    
## 2. Automation testing là gì?
Trong Automation testing, Tester phải viết test script để tự động hóa việc test. Họ sử dụng những công cụ thích hợp với mục tiêu là hoàn thành việc test trong một khoảng thời gian ngắn hơn và nhanh hơn.

## 3. Sự khác nhau giữa Manual testing với Automation testing
![](https://images.viblo.asia/949f398d-0624-478f-8909-89ce9fddfc73.png)



| Parameter |Manual testing  | Automation testing|
| -------- | -------- | -------- |
| Định nghĩa     | Testcase được thực hiện thủ công bởi tester      | Tester phải viết test script và lựa chọn công cụ để tự động hóa việc test     |
| Thời gian xử lý     | Cần nhiều thời gian và nhân lực      | Thời gian kiểm thử nhanh hơn so với manual testing     |
| Exploratory Testing/ Kiểm thử khám phá    |  Exploratory Testing/ Kiểm thử khám phá được thực hiện      | Không cho phép kiểm thử khám phá    |
| Thay đổi UI     | Sự thay đổi nhỏ như ID, Class hoặc 1 button nhưng không ảnh hưởng đến thực thi test      | Chỉ 1 vài thay đổi nhỏ trong UI, người dùng phải update script để đảm bảo có kết quả như mong đợi   |
| Độ tin cậy     | Kết quả kiểm thử không đáng tin cậy vì có khả năng xảy ra lỗi do con người      | Do được thực thi bằng tool và scripts nên kết quả đáng tin cậy hơn     |
| Đầu tư     | Cần nhiều nguồn nhân lực      | Bắt buộc phải đầu tư tool để test và những kĩ sư auto     |
| Báo cáo     | Manual test thường lưu lại kết quả ở Excel, Word...      | Tất cả stakeholders có thể đăng nhập vào hệ thống auto và kiểm tra lại kết quả test     |
| Sự quan sát của con người     | Cần có sự quan sát của con người để giúp cho hệ thống thân thiện với người dùng      | Không có sự quan sát của con người     |
| Kiểm thử hiệu năng/Performance Testing     | Không thực hiện được Kiểm thử hiệu năng/Performance Testing      | Kiểm thử hiệu năng/Performance Testing phải được thực hiện bởi 1 tool phù hợp     |
| Kiến thức lập trình     | Không cần có khả năng code      | Phải có kiến thức về lập trình để tạo ra các test script    |
| Cách tiếp cận tốt     |   Manual testing hữu ích khi chúng ta chạy lại bộ testcase 1 hoặc 2 lần    | Auto test rất hữu ích khi ta chạy lại bộ script nhiều lần   |
| Sử dụng khi nào?     | Kiểm thử thủ công phù hợp cho Exploratory Testing/ test khám phá, Usability/ Khả năng sử dụng và Adhoc Testing/ Kiểm thử dựa vào thực tế      | Test auto thích hợp cho kiểm thử hồi quy, hiệu năng hoặc các trường hợp có khả năng lặp lại nhiều lần     |


## 3. Ưu và nhược điểm của manual testing

### Ưu điểm:
+ Tester có phản hồi trực quan nhanh và chính xác
+ Ít tốn kém hơn vì chúng ta không cần phải chi ngân sách cho các công cụ và các quy trình tự động hóa.
+ Có thêm khả năng phán đoán của con người 
+ Một yêu cầu thay đổi cũng không làm kiểm thử thủ công trở lên quá phức tạp.

### Nhược điểm:
+ Manual testing ít tin cậy hơn bởi nó được thực hiện bởi con người => Dễ xảy ra sai sót hơn
+ Quá trình kiểm thử không thể ghi lại 
+ Với một số task khó thực hiện thủ công như performance testing/kiểm thử hiệu năng và stress testing/kiểm thử tải thì manual testing rất khó để thực hiện.


## 4. Ưu và nhược điểm của automation testing
### Ưu điểm:
+ Quá trình kiểm thử diễn ra nhanh chóng và hiệu quả hơn.
+ Kiểm tra tự động giúp chúng ta tìm thấy nhiều lỗi hơn so với con người
+ Quá trình test được ghi lại => Cho phép sử dụng lại hàng loạt các hoạt động thử nghiệm.
+ Kiểm thử tự động được thực hiện bằng cách sử dụng các công cụ phần mềm, do đó nó hoạt động không mệt mỏi, không giống như con người trong kiểm tra thủ công.
+ Kiểm tra tự động hỗ trợ các ứng dụng khác nhau.
+ Phạm vi kiểm tra có thể được tăng lên vì các tool không bao giờ quên kiểm tra ngay cả đơn vị nhỏ nhất.

### Nhược điểm:
+ Nếu không có yếu tố con người, rất khó để có được cái nhìn sâu sắc về các khía cạnh trực quan của giao diện người dùng của bạn như màu sắc, phông chữ, kích thước, độ tương phản hoặc kích thước nút.
+ Các công cụ để chạy thử nghiệm tự động hóa có thể đắt tiền, có thể làm tăng chi phí của dự án.
+ Công cụ chạy auto test vẫn chưa hoàn hảo.
+ Bảo trì tốn kém.

Tài liệu tham khảo: https://www.guru99.com/difference-automated-vs-manual-testing.html