## 1.  Manual Testing là gì?

Manual Testing (Kiểm thử thủ công) là công việc kiểm tra hoạt động của ứng dụng hoặc phần mềm được thực hiện thủ công bởi một QA hoặc Tester với mục đích tìm ra các lỗi của sản phẩm trong quá trình phát triển. Trong kiểm thử thủ công, Tester sẽ kiểm tra tất cả các tính năng cần thiết của ứng dụng hoặc phần mềm, thực hiện các testcase và tạo báo cáo kiểm thử mà không cần sự hỗ trợ nào từ các công cụ kiểm thử tự động.

![](https://images.viblo.asia/403aba8b-ca67-4410-9954-d901ceed93fa.jpg)
## 2 . Automation Testing là gì?

Automation Testing( Kiểm thử tự động) là các tester sẽ viết code/test scripts, lựa chọn sử dụng tool tự động phù hợp để thực hiện các kịch bản kiểm thử và xác nhận một cách tự động với mục tiêu hoàn thành việc kiểm thử trong thời gian ngắn. Kiểm thử tự động dựa vào kịch bản kiểm thử chuẩn bị trước để chạy tự động và so sánh kết quả thực tế với kết quả mong đợi, giúp người kiểm thử xác định ứng dụng có thực hiện đúng như mong đợi hay không.
![](https://images.viblo.asia/ae4faeb8-d130-415a-9987-a930231bef53.png)

Kiểm thử tự động cho phép thực hiện lặp lại công việc và test hồi quy mà không cần sự can thiệp của kiểm thử thủ công. Mặc dù tất cả các quy trình được thực hiện tự động,  kiểm thử tự động đòi hỏi  effort thủ công để tạo các kịch bản thử nghiệm ban đầu.
## 3. Ưu, nhược điểm của Manual và Automated Testing
Một số phương pháp kiểm thử như black box testing, white box testing, integration testing, system testing, performance testing, and load testing, có loại phù hợp với Manual testing, có loại hoạt động tốt hơn với automated testing, dưới đây là một số so sánh ngắn gọn về từng loại và một số ưu, nhược điểm:
![](https://images.viblo.asia/63dbc1bd-65c0-47a4-8297-13376802050f.png)

| Manual Testing | Automated Testing | 
| -------- | -------- |
| Manual testing không thể đúng ở mọi thời điểm do lỗi con người, do đó độ tin cậy kém |  Automated testing có độ tin cậy cao hơn do nó được thực hiện bởi tool hoặc scripts | 
| Manual testing tốn thời gian, cần nhiều nguồn lực về con người.  |   Automated testing  được thực thi bởi các công cụ phần mềm do đó nhanh hơn đáng kể so với Manual test. | 
| Đầu tư nguồn lực về con người |   Đầu tư các công cụ kiểm thử phần mềm. | 
| Manual testing hữu ích khi các case kiểm thử chỉ chạy một hoặc hai lần và không lặp lại thường xuyên.  |  Automated testing là một lựa chọn tối ưu khi các case kiểm thử được chạy lặp lại trong một khoảng thời gian dài.  | 
|  Manual testing cho phép con người quan sát được nhiều hơn những hữu ích để nhắm tới mục đích thân thiện với người dùng hoặc nâng cao trải nghiệm của khách hàng. |  Automated testing không thể thay thế quan sát của con người và không thể đảm bảo được tính thân thiện cũng như những tính hữu ích để cải thiện trải nghiệm của khách hàng.  | 
## 4. Khi nào nên dùng Manual Testing và khi nào nên dùng Automation testing
***Manual testing sẽ là lựa chọn tốt nhất với các phương pháp kiểm thử sau:***
![](https://images.viblo.asia/6f749850-3644-438f-86b7-5c1aa39aba3d.png)
* Exploratory Testing (Kiểm thử thăm dò): Kiểu kiểm thử này yêu cầu các kĩ năng về kiến thức, kinh nghiệm, khả năng phân tích, tính sáng tạo và trực giác của người kiểm thử. Phương thức này đặc trưng ở tài liệu đặc tả kĩ thuật nghèo nàn hoặc thời gian thực hiện ngắn, do đó cần những kĩ nâng của con người để thực hiện trong quy trình kiểm thử này.

* Usability Testing (Kiểm thử tính hữu dụng): Đây là phương pháp người kiểm thử cần đóng vai trò như những người dùng cuối để xem xét tính thân thiện, hiệu quả và tiện ích của phần mềm hoặc sản phẩm, tính quan sát của con người là yếu tố quan trọng nhất trong phương pháp này, vì vậy một cách tiếp cận thủ công là hoàn toàn thích hợp.

* Ad-hoc Testing: Là một phương pháp kiểm thử không có cách tiếp cận rõ ràng, đó là một phương thức kiểm thử hoàn toàn không có kế hoạch, không tài liệu, không test case, sự hiểu biết và tầm nhìn sâu sắc của người kiểm thử là yếu tố quan trọng duy nhất.


***Automation testing sẽ là lựa chọn tốt nhất với các phương pháp kiểm thử sau:***

* Regression Testing (Kiểm thử hồi quy) : Do code thường xuyên thay đổi trong suốt quá trình phát triển phần mềm nên khi thực hiện kiểm thử hồi quay thì kiểm thử tự động là lựa chọn phù hợp hơn, nó có thể chạy hồi quy một cách kịp thời.
![](https://images.viblo.asia/2f44ad38-d40e-45ab-ad17-ebcce2e4946f.jpg)

* Load Testing (Kiểm thử mức độ tải trọng): Kiểm thử tự động cũng là cách tốt nhất để kiểm thử một cách hiệu quả khi cần Load testing.

* Repeated Execution (Kiểm thử lặp): Kiểm thử tự động là cách tốt nhất cho việc kiểm thử lặp.

* Performance Testing (Kiểm thử hiệu năng): Khi kiểm thử hiệu năng, việc giả lập hàng nghìn user tác động tới phần mềm hoặc sản phầm thì cần thiết phải dùng tới kiểm thử tự động, một trong các tool đang được sử dụng phổ biến để thực hiện kiểm thử hiệu năng ngày nay như Jmeter.

Nắm được những hiểu viết Automation testing và Manual testing, những ưu nhược điểm của mỗi loại sẽ giúp người kiểm thử tìm được cách tiếp cận tốt nhất trong bất kì tình huống kiểm thử nào và đạt được chất lượng đầu ra như mong đợi cả về ngân sách và thời gian.

### *Tài liệu tham khảo:*
1. https://www.apicasystems.com/blog/automated-testing-vs-manual-testing/
2. https://www.guru99.com/difference-automated-vs-manual-testing.html