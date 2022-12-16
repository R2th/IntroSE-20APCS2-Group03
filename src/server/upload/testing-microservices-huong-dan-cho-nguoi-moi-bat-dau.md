Microservices không phải là một khái niệm mới. Nó đã được sử dụng trong hơn một thập kỷ nay bởi những người khổng lồ như Amazon, Google và Facebook. Khi bạn tìm kiếm nội dung nào đó trên Google, để truy xuất kết quả có liên quan, Google sẽ gọi tới gần 70 microservices.

Microservices testing ngày càng trở nên quan trọng vì nhiều ứng dụng mới đang được xây dựng bằng kiến trúc Microservices. Trước khi chúng ta tìm hiểu về Microservices testing, chúng ta cần phải hiểu chúng là gì.

# I. Microservices là gì?
![](https://images.viblo.asia/784e8c37-6ff1-4a41-93b0-ad7b6f2dda57.png)

Microservice được định nghĩa là một kiểu kiến trúc, một cách tiếp cận để phát triển một ứng dụng đơn lẻ như một bộ các dịch vụ. Mỗi dịch vụ được xác định bởi các đặc tính của nó, một số trong đó là:

* Đang chạy trong tiến trình của nó.
* Giao tiếp với một cơ chế gọn nhẹ thường với API tài nguyên HTTP.
* Độc lập có thể triển khai bởi một máy móc hoàn toàn tự động.
* Sử dụng các ngôn ngữ lập trình / công nghệ / DB khác nhau.
* Đang sử dụng các công nghệ lưu trữ dữ liệu khác nhau.

Phong cách kiến trúc microservice bao gồm phát triển các ứng dụng đơn lẻ có thể làm việc cùng nhau như một bộ các dịch vụ nhỏ, mỗi dịch vụ chạy trong quá trình riêng của nó và giao tiếp với các cơ chế nhẹ như API tài nguyên HTTP.

Các dịch vụ này yêu cầu quản lý tập trung tối thiểu, sử dụng các công nghệ lưu trữ dữ liệu khác nhau và có thể được viết bằng các ngôn ngữ lập trình khác nhau. Các dịch vụ này, được xây dựng xung quanh khả năng kinh doanh, cũng có thể được triển khai độc lập bởi máy móc hỗ trợ triển khai hoàn toàn tự động.

Đặc điểm Microservices:

* Được tổ chức xung quanh khả năng kinh doanh.
* Triển khai tự động.
* Thông minh trong các thiết bị đầu cuối hơn là trong xe buýt dịch vụ.
* Kiểm soát phân cấp ngôn ngữ và dữ liệu.

# II. Microservices và SOA khác nhau như thế nào?

* Kiến trúc hướng dịch vụ (SOA): một mẫu kiến trúc trong thiết kế phần mềm máy tính trong đó các thành phần ứng dụng cung cấp các dịch vụ cho các thành phần khác thông qua một giao thức truyền thông, thường trên một mạng.

* Microservices: một phong cách kiến trúc phần mềm trong đó các ứng dụng phức tạp bao gồm các quy trình nhỏ, độc lập giao tiếp với nhau bằng cách sử dụng các API không hiểu biết về ngôn ngữ

SOA điển hình thường có các bus dịch vụ doanh nghiệp phụ thuộc (ESB), với các dịch vụ nhỏ sử dụng các cơ chế nhắn tin nhanh hơn. Trong khi SOA tập trung vào lập trình bắt buộc, kiến trúc microservices sử dụng một kiểu lập trình tập trung vào một responsive-actor làm cơ sở của nó. Trong khi các mô hình SOA thường có RDBMS được mở rộng, microservices thường xuyên sử dụng các cơ sở dữ liệu như NoSQL hoặc vi-SQL có thể được kết nối với các cơ sở dữ liệu thông thường. Điều đó nói rằng, sự khác biệt thực sự nằm trong các phương pháp kiến trúc được sử dụng để tạo ra một bộ dịch vụ tích hợp.

# III. Cách kiểm tra Microservices?

![](https://images.viblo.asia/e3a0e108-2c65-408e-a773-ca5d898f080a.jpeg)

Kiến trúc microservices bao gồm các dịch vụ nhỏ, tập trung cùng nhau tạo ra một ứng dụng hoàn chỉnh. Mỗi phần của một microservice đại diện cho một chức năng duy nhất trong ứng dụng của bạn. Lợi thế thực sự là, các dịch vụ này độc lập với nhau, điều này làm cho chúng độc lập có thể triển khai và có thể thử nghiệm được.

## 1. Unit tests

Unit test thực hiện các phần nhỏ trong phần mềm như một hàm trong ứng dụng để xác định xem chúng có tạo ra đầu ra mong muốn cho một bộ các đầu vào đã biết hay không.
Điều đáng chú ý là việc thực hiện unit test một mình không đảm bảo về hành vi của hệ thống. Chúng ta cần các loại thử nghiệm khác cho microservices.

## 2. Component Tests

Sau khi chúng ta đã thực hiện unit tests của tất cả các chức năng trong một microservice, chúng ta cần phải kiểm tra bản thân dịch vụ microservice.
Thông thường, một ứng dụng sẽ bao gồm một số các microservices, do đó, để kiểm tra sự độc lập, chúng ta cần phải giả lập các microservices khác.

Component tests sẽ kiểm tra sự tương tác của microservices với các thành phần khác của nó , như cơ sở dữ liệu,...

## 3. Integration Tests

Sau khi đã xác minh chức năng của từng dịch vụ microservice, chúng ta cần kiểm tra các thông tin liên lạc giữa các dịch vụ. Integration test sẽ xác minh các đường dẫn truyền thông và sự tương tác giữa các thành phần để phát hiện lỗi giao diện.

Việc gọi các service phải được thực hiện với sự tích hợp với các Service bên ngoài, bao gồm các trường hợp lỗi và thành công. Vì thế, integration testing xác nhận rằng hệ thống đang làm việc với nhau liền mạch và sự phụ thuộc giữa các dịch vụ được như mong đợi.

## 4. Contract Tests

Contract Tests xác minh các tương tác tại ranh giới của một dịch vụ bên ngoài, nó đáp ứng được contract dự kiến bởi một dịch vụ tiêu thụ.

Loại thử nghiệm này nên xử lý từng dịch vụ dưới dạng hộp đen và tất cả các dịch vụ phải được gọi độc lập và phản hồi của chúng phải được xác minh.

"Contract" là cách gọi dịch vụ (nơi mà kết quả hoặc đầu ra cụ thể được kỳ vọng cho một số yếu tố đầu vào nhất định) được tham chiếu bằng thử nghiệm "hợp đồng" của người dùng. Mỗi người dùng phải nhận được cùng một kết quả từ một dịch vụ theo thời gian, ngay cả khi dịch vụ thay đổi. Cần có sự linh hoạt để thêm nhiều chức năng hơn theo yêu cầu cho câu trả lời sau này. Tuy nhiên, những bổ sung này không được phá vỡ chức năng dịch vụ.

## 5. End-To-End Tests

Vai trò của các kiểm thử đầu-cuối (End-To-End Tests) là đảm bảo mọi thứ liên kết với nhau và không có sự bất đồng cấp cao giữa các dịch vụ nhỏ.

Kiểm thử đầu-cuối xác minh rằng một hệ thống đáp ứng các yêu cầu bên ngoài và đạt được mục tiêu của nó, kiểm tra toàn bộ hệ thống, từ đầu đến cuối.

Việc kiểm thử cũng xác minh rằng toàn bộ quy trình và luồng người dùng hoạt động chính xác, bao gồm tất cả dịch vụ và tích hợp database. Kiểm tra kỹ lưỡng các hoạt động có ảnh hưởng đến nhiều dịch vụ đảm bảo rằng hệ thống hoạt động với nhau như một toàn thể và đáp ứng tất cả các yêu cầu.

# IV. Công cụ giúp bạn kiểm tra dịch vụ microservices

* Hoverfly: mô phỏng độ trễ và lỗi API

* Vagrant: xây dựng và duy trì các môi trường phát triển phần mềm ảo di động

* VCR: a unit testing tool

* Pact: frameworks consumer-driven contracts testing

* API Blueprint: thiết kế API và mẫu thử nghiệm

* Swagger: thiết kế API và mẫu thử nghiệm



### Nguồn tham khảo :
https://www.testingexcellence.com/testing-microservices-beginners-guide/
https://www.cigniti.com/blog/5-approaches-for-automating-microservices-testing/