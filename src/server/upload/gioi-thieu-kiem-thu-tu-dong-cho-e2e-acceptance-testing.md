## 1. Acceptance testing
Acceptance testing là một công đoạn trong quy trình phát triển phần mềm. Nó bao gồm các quá trình kiểm thử xem một ứng dụng có đáp ứng các yêu cầu tổng thể hay một ứng dụng có được chấp nhận để sẵn sàng đưa vào sử dụng hay không. Acceptance testing thường là công đoạn cuối cùng trước khi sản phẩm được phát hành, nó có thể gồm các quá trình user-based acceptance tests, business-based acceptance tests hay alpha/beta testing.

## 2. End to End (E2E) testing
E2E testing là một cách triển khai của Acceptance testing. E2E testing tập trung vào luồng hoạt động của ứng dụng nhằm kiểm tra ứng dụng từ đầu tới cuối có hoạt động đúng theo thiết kế hay không , nó liên quan đến các kịch bản người dùng và kiểm tra từng bước mà người dùng thực hiện theo thứ tự xem các kịch bản có hoạt động một cách chính xác hay không.

## 3. Làm sao để thực hiện E2E testing một cách tự động ?
Ngày nay khái niềm Automation testing đang ngày một trở nên phổ biến. Mặc dù Automation testing chưa phát triển tới ngưỡng có thể thay thế hoàn toàn Manual testing tuy nhiên nó đóng một vai trò quan trọng trong việc nâng cao hiệu suất kiểm thử, giảm thiểu các lỗi hay sự nhàm chán khi manual testing một công việc lặp đi lặp lại.

Trong bài viết này mình sẽ giới thiệu một kiến trúc để thực hiện E2E Acceptance testing một cách tự động dựa trên những kiến thức mình thu được trong quá trình làm dự án. Có nhiều công cụ để thực hiện tự động E2E acceptace testing tuy nhiên trong bài viết này mình sử dụng một mô hình dựa trên Cucumber một công cụ hỗ trợ cho việc phát triển phần mềm theo hướng BDD (Behavior-Driven Development). Cucumber cho phép mô tả một kịch bản bằng ngôn ngữ tự nhiên giúp cho người đọc dù không có nhiều kiến thức về mặt kỹ thuật cũng có thể hiểu được nội dung. 
Lấy ví dụ một kịch bản Cucumber 
```
  Scenario: Breaker guesses a word
  Given the Maker has chosen a word
  When the Breaker makes a guess
  Then the Maker is asked to score
```
Mỗi Scenario là một kịch bản bao gồm một danh sách các steps để Cucumber thực hiện. Cucumber sẽ xác định phần mềm phù hợp với các mô tả trong kịch bản hay không và tạo ra một báo cáo chỉ ra việc thực hiện thành công hay thất bại cho mỗi kịch bản. Để Cucumber có thể hiểu được các kịch bản cần tuân thủ theo một số quy tắc viết kịch bản dựa trên cú pháp Gherkin. Trong bài viết tiếp theo mình sẽ giải thích chi tiết hơn về Cucumber cũng như việc viết kịch bản theo cú pháp Gherkin hoặc các bạn có thể tham khảo ở đường link này đây về [Cucumber](https://cucumber.io/docs/guides/overview/). Trong bài viết này mình chỉ đưa ra một cái nhìn tổng quan về một dự án thực hiện E2E acceptance testing tự động. Các nội dung chi tiết về các thành phần sẽ được đề cập ở các bài viết sau trong loạt bài này.

#### Các lớp kiến trúc xây dựng một dự án kiểm thử tự động dựa trên Cucumber
![](https://images.viblo.asia/9b655574-4c4b-45db-9f26-eea1457f14ee.png)

Trong hình vẽ trên đi từ trên xuống dưới gồm có 5 lớp 

1.  BDD focussed API
2.  Client-side WebDriver
3.  Proxy server
4.  Server-side WebDriver
5.  Browser

Trong đó lớp BDD focussed API là các kịch bản (Scenario) của Cucumber mô tả các kịch bản kiểm thử. Từ các kịch bản kiểm thử sẽ được mapping với các đoạn mã định nghĩa sử dụng các API từ Client-side WebDriver là các API giúp điều kiển hành vi của trình duyệt nhằm mô tả các hành động của người dùng trên trình duyệt thay thế cho việc một người dùng thật tương tác với trình duyệt. Thành phần Selenium Server có thể không cần sử dụng nếu cài đặt, thiết lập automation test trên một máy tuy nhiên nó cần thiết trong trường hợp thiết lập một mạng lưới các máy kiểm thử. Nó hoạt động như một proxy để chuyển tiếp các yêu cầu từ các API của Client-side WebDriver đến đúng trình duyệt Webdriver và gửi lại phản hồi tương ứng. Thành phần Server-side WebDriver khi nhận được thông điệp từ Client-side WebDriver sẽ tương tác với thành phần Browser để thực hiện các yêu cầu tương ứng. Để giao tiếp với các trình duyệt khác nhau cần cài đặt các Server-side WebDriver khác nhau.

## Lời kết
Trong bài viết này mình giới thiệu về E2E Acceptance test và các thành phần khi xây dựng một dự án tự động hóa trong việc thực hiện E2E testing. Trong các bài viết tới mình sẽ đi chi tiết các thành phần và cách sử dụng các thành phần đó trong thực tế. Hy vọng mọi người theo dõi các bài viết tiếp theo.