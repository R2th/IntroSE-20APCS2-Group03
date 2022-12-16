# Tìm hiểu về Sonarqube
## Sonarqube là gì?
Được phát triển bởi 10 năm trước bởi SonarSource, sonarqube là một platform mã nguồn mở giúp chúng ta có thể kiểm tra chất lượng code của dự án, được viết bằng java nhưng nó hổ trợ nhiều ngôn ngữ khác nhau:  PHP, Ruby, Java (bao gồm cả Android), C#, JavaScript, TypeScript, C/C++, Kotlin, Go, COBOL, PL/SQL, PL/I, ABAP, VB.NET, VB6, Python, RPG, Flex, Objective-C, Swift, CSS, HTML, và XML và hỗ trợ các database để lưu trữ kết quả: MySql, Postgresql.
## Tại sao nên sử dụng Sonarqube?
Như các bạn đã biết, code review là một phần không thể thiếu trong quá trình phát triển phần mềm khi làm viêc với nhóm. Tuy nhiên, không phải lúc nào người review của bạn cũng rảnh hoặc kiên nhẫn đễ đọc từng dòng code, từng ký tự trong code của bạn, nhưng Sonarqube thì có thể làm điều này, Sonarqube sẽ quét tất cả code có trong dự án của bạn và đánh giá code dựa theo các coding standard tương ứng của tất cả ngôn ngữ có trong dự án. Ngoài ra Sonarqube có thể làm nhiều hơn là code convention:
* Phát hiện bug
* Phát hiện code smell, duplicate
* Tính toán độ bao phủ của Unit test (Unit-test coverage)
* Tính toán technical debt
* So sánh chất lượng code so với các lần kiểm tra trước
* Vân vân và mây mây...
## Hướng dẫn sử dụng
Bài viết này mục đích là để tìm hiểu sơ qua về Sonarqube nên mình sẽ dùng bản online của Sonarqube , Mình sẽ viết một bài khác để hướng dẫn sâu hơn cài đặt cấu hình các kiểu con đà điểu trên máy... 
- Truy cập vào sonarcloud.io/about/sq , bạn có thể chọn đăng nhập với nơi lưu trữ project cần test cảu bạn (git hay bitbucket), ở đây mình sử dụng github là nơi lưu trữ project để test.

![](https://images.viblo.asia/04bdfbd2-d56f-4d04-8763-b0fba9ffbf81.png)

-Sau đó đăng nhập với github, khi hoàn tất chúng ta sẽ được chuyển đến trang này

![](https://images.viblo.asia/53ee17b6-2d99-4d97-b63b-e12dc8513396.png)

-Chọn all repository, xác nhận đăng nhập với github và chọn free plan, sau đó bạn sẽ được chuyển tiếp đến trang quảng lý project

![](https://images.viblo.asia/03969654-8e2a-4da4-8319-047da07dfc8f.png)

-Click Analyze new project, chọn repository của project mà bạn muốn test và set up, ở đây mình đã tạo trước một project java spring với maven và làm theo các bước của trang hướng dẫn, các bạn mở terminal trong thư mục của project và chạy các lệnh trong phần màu đen nhé

![](https://images.viblo.asia/9562f867-92ef-4164-b811-10a5faa33478.png)

- Khi chạy xong terminal sẽ thông báo kết quả như sau

![](https://images.viblo.asia/6c7b89c9-6d00-458d-aad4-61ef7407abf7.png)

- Sau đó trang hướng dẫn sẽ tự động refresh và chuyển bạn đến trang thống kê như hình dưới

![](https://images.viblo.asia/412dd5e1-c65a-490d-9522-edbf5048d0bc.png)

- Các bạn có thể xem các lỗi của mình ở file nào và dòng code nào bằng cách click vào phần muốn xem

![](https://images.viblo.asia/77ad16f3-6c6f-4e47-ab9c-004db0deed61.png)
![](https://images.viblo.asia/6d92fa6d-5867-4aaf-b64f-ca57be29437c.png)

Đôi khi các bạn sẽ thấy con số bug hay code smell rất "Khủng khiếp" ví dụ như hình dưới, nhưng đừng lo vì Sonarqube đánh giá dựa trên tất cả ngôn ngữ có trong dự án và các quy tắt mặc định, bạn có thể tùy chỉnh các ngôn ngữ cũng như các quy tắc này 

![](https://images.viblo.asia/ad08bd5f-a268-4232-8c76-20267029ddf8.png)

## Lời kết
Ngoài ra Sonarqube còn có thể tích hợp với các platform khác như Jenkins để kiểm tra liên tục (Continuous Inspection), mình sẽ hướng dẫn tiếp vào các phần sau. Đây là lần đầu mình viết bài nên có nhiều thiếu xót, mong các bạn cứ góp ý dưới phần comment giúp mình nhé. Cám ơn các bạn đã quan tâm và hẹn gặp lại các bạn trong các bài viết tiếp theo nhé  ^_^