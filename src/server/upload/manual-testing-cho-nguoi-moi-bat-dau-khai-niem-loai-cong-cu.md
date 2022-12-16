# Thế nào là manual testing?

Manual testing là một loại kiểm thử phần mềm trong đó người kiểm tra thực hiện chạy test case một cách thủ công mà không dùng bất cứ một công cụ tự động nào. Manual Testing là kiểu test nguyên thủy nhất trong các loại kiểm tra giúp tìm ra lỗi trong hệ thống phần mềm. 
Bất kì ứng dụng nào cũng đều phải được kiểm tra một cách thủ công trước khi có thể thực hiện test tự động. Manual Testing đòi hỏi nhiều effort hơn nhưng nó là cần thiết để kiểm tra tính khả thi của tự động hóa.

Manual Testing không đòi hỏi kiến thức về các công cụ kiểm thử.
Và một trong những vấn đề cơ bản của kiểm thử phần mềm là "không thể tự động hóa 100%"
Điều này làm cho Manual Testing trở nên bắt buộc.

# Mục tiêu của Manual Testing
Khái niệm chính của manual testing là nó hoạt động đúng và phù hợp với yêu cầu đặc tả.
Test Suites hoặc testcase, được thiết kế trong giai đoạn thử nghiệm và phải có phạm vi kiểm tra bao phủ 100%. Nó cũng đảm bảo rằng các lỗi được báo cáo được sửa chữa bởi các nhà phát triển và kiểm tra lại đã được thực hiện bởi những Tester.
Về cơ bản, mục đích là kiểm tra chất lượng của hệ thống và cung cấpsản phẩm không có lỗi cho khách hàng.

# Các loại Manual Testing 
Dưới đây là sơ đồ mô tả các loại Manual Testing . 
Trong thực tế, bất kỳ loại kiểm thử phần mềm nào cũng có thể được thực hiện bằng tay cũng như  sử dụng một công cụ tự động hóa.

* Black Box Testing
* White Box Testing
* Unit Testing
* System Testing
* Integration Testing
* Acceptance Testing

# Cách thực hiện Manual Testing

1. Đọc và hiểu tài liệu / hướng dẫn dự án phần mềm. Ngoài ra, nghiên cứu Ứng dụng đang thử nghiệm (AUT) nếu có.
2. Phác thảo testcases bao gồm tất cả các yêu cầu được đề cập trong tài liệu.
3. Xem xét và vạch ra các trường hợp thử nghiệm với Trưởng nhóm, Khách hàng (nếu có)
4. Thực hiện các trường hợp thử nghiệm trên AUT
5. Báo cáo lỗi.
6. Khi các lỗi đã được sửa, một lần nữa thực hiện các trường hợp thử nghiệm thất bại để xác minh chúng không còn sảy ra nữa.


# Một số quan niệm về Manual Testing 

Sau đây là một số quan niệm phổ biến liên quan đến thử nghiệm:

* Quan niệm: Bất cứ ai cũng có thể làm Manual Testing 
- Sự thật: Kiểm tra đòi hỏi nhiều bộ kỹ năng

* Quan niệm: Kiểm tra đảm bảo phát hiện 100% lỗi của sản phẩm
- Sự thật: Thử nghiệm để tìm ra càng nhiều khiếm khuyết càng tốt. Xác định tất cả các khiếm khuyết có thể là không thể-

* Quan niệm: Automation Testing mạnh hơn Manual Testing 
- Sự thật: 100% Automation Testing  không thể được thực hiện. Manual Testing cũng rất cần thiết.

* Quan niệm: Test rất dễ
- Sự thật: Test có thể cực kỳ khó khăn. Để thực hiện kiểm thử một ứng dụng với một trường hợp rất đơn giản nhưng lại đòi hỏi kỹ năng phân tích rất cao.

# Phân biệt Manual Testing vs Automation Testing



| Manual Testing | Automated Testing |
| -------- | -------- |
|Manual Testing đòi hỏi sự can thiệp của con người để thực hiện kiểm tra. |Automation Testing sử dụng toll để thực hiện chạy các testcase     |
| Kiểm tra thủ công sẽ đòi hỏi nhân lực có kỹ năng, thời gian dài &  chi phí cao | Kiểm tra tự động hóa tiết kiệm thời gian, chi phí và nhân lực. Sau khi được ghi lại, việc chạy bộ kiểm tra tự động sẽ dễ dàng hơn     |
| Bất kỳ loại ứng dụng nào cũng có thể được kiểm tra thủ công|Kiểm tra tự động chỉ được khuyến khích cho các hệ thống ổn định và chủ yếu được sử dụng cho Kiểm tra hồi quy    |
| Manual testing có thể trở nên lặp đi lặp lại và nhàm chán|Sự nhàm chán của việc thực hiện cùng một trường hợp kiểm tra nhiều lần được xử lý bởi phần mềm tự động hóa trong Automation Test   |

# Một số tool tự động hóa

* Selenium
* QTP
* Jmeter
* Loadrunner
* TestLink
* Quality Center(ALM)

# Phần kết luận 
Manual testing là một hoạt động mà tester cần phải kiễn nhẫn sáng tạo và cởi mở.
Họ cần phải suy nghĩ và hành động dưới vai trò quan điểm của người dùng cuối.

Nguồn: https://www.guru99.com/manual-testing.html