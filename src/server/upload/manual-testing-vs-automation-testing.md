Bài viết này chúng ta hãy cùng tìm hiểu về sự khác nhau giữa 2 loại testing được sử dụng ở trong vòng đời phát triển phần mềm đó là: Manual Testing và Automation Testing.

![](https://images.viblo.asia/f7df8ba3-435e-4216-9132-bb47d2b780a7.jpg)

  **Manual Testing:**

  Manual Testing chúng ta có thể hiểu đây là việc kiểm thử phần mềm theo phương pháp thủ công, không sử dụng các tool hỗ trợ khác. Đối với phương pháp này, tester sẽ đảm nhận vai trò như người dùng cuối để tìm kiếm và phát hiện các hiện tượng không đúng như mong muốn của phần mềm hay là những lỗi phát sinh trong quá trình sử dụng phần mềm. Có rất nhiều các giai đoạn khác nhau sử dụng phương pháp này như: unit testing, integration testing, system testing và user acceptance testing.
  
  ![](https://images.viblo.asia/c577e661-aa82-4088-a90f-c5f8fd44937f.png)

  **Automation Testing:**

  Automation Testing được hiểu là một phương pháp kiểm thử tự động. Các tester sẽ viết các kịch bản kiểm thử và sau đó sẽ sử dụng những tool hỗ trợ cho việc kiểm thử tự động phần mềm. Phương pháp này bao gồm sự tự động hóa các quy trình thủ công của Manual Testing. Automation Testing được sử dụng để chạy lại các kịch bản kiểm thử mà lặp đi lăp lại nhiều lần qua từng phase test theo yêu cầu dự án.
  Ngoài việc sử dụng trong regression testing, Automation Testing cũng đươc sử dụng trong load testing, performance testing và stress testing. Nó sẽ giúp tăng độ bao phủ test coverage, cải thiện độ chính xác và tiết kiệm được thời gian cũng như tiền bạc so với Manual Testing.
  ![](https://images.viblo.asia/cde2dd6c-e81f-40fa-94de-9bb14883848b.png)

  **Phạm vi áp dụng Automation Testing ?**

  Có thể nói là thực sự không khả thi để kiểm thử tự động tất cả mọi thứ trong phần mềm nhưng có những chức năng nên được áp dụng Automation Testing như những hành động của người dùng làm phát sinh các sự kiện trong hệ thống ví dụ: đăng nhập tài khoản, đăng ký tài khoản hay những chức năng liên quan đến các con số lớn mà người dùng có thể truy cập một cách đồng thời.
  Ngoài ra, tất cả các đối tượng GUI, các liên kết đến cơ sở dữ liệu, các trường cần xác nhận ... đều có thể áp dụng Automation Testing một cách hiệu quả.

  **Khi nào áp dụng Automation Testing ?**

  Automation Testing nên được cân nhắc để áp dụng vào các dự án phát triển phần mềm có các điểm sau:

- Dự án to và quan trọng.
- Dự án thường xuyên có các yêu cầu kiểm thử trong cùng một pham vi giống nhau.
- Các yêu cầu đặc tả không thường xuyên thay đổi.
- Cần giả lập một số lượng người dùng nhất định truy cập vào hệ thống.
- Phần mềm ổn định đối với việc kiểm thử một cách thủ công.
- Phù hợp về mặt thời gian đối với dự án.
  
  **Quy trình để thực hiện Automation Testing.**

  Để hoàn thành việc Automation Testing thì chúng ta cần phải viết các kịch bản kiểm thử bằng các ngôn ngữ lập trình thích hợp sau đó sử dụng tool hỗ trợ để chạy các kịch bản kiểm thử đó. Có rất nhiều các tool thích hợp có thể sử dụng để viết các kịch bản kiểm thử tự động, tuy nhiên trước đó chúng ta hãy cùng tìm hiểu về quy trình các bước cần làm:

- Xác định phạm vi có thể áp dụng được Automation Testing trong phần mềm.
- Lựa chọn tool thích hợp để thực hiện việc Automation Testing.
- Bắt đầu viết các kịch bản kiểm thử.
- Thiết kế các bộ kịch bản kiểm thử.
- Thực hiện chạy các kịch bản kiểm thử.
- Tạo báo cáo kết quả.
- Xác định các bug tiềm ẩn và các vấn đề về hiệu năng.

  **Các tool sử dụng trong Automation Testing.**

  Sau đây là các tool có thể được sử dụng trong Automation Testing:
  
- HP Quick Test Professional
- Selenium
- IBM Rational Functional Tester
- SilkTest
- TestComplete
- Testing Anywhere
- WinRunner
- LoadRunner
- Visual Studio Test Professional
- WATIR

Link tham khảo: 
https://www.tutorialspoint.com/software_testing/software_testing_types.htm