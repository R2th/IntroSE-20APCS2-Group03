Khi thiết kế cho một web application thì việc chọn cấu trúc thiết kế cho app là việc vô cùng quan trọng. Nó sẽ quyết định việc application có hoạt động hiệu quả, dễ dàng bảo trì và phát triển rộng hơn nữa trong tương lai. Bài viết sẽ tìm hiểu về các thiết kế web architecture cùng các khái niệm liên quan, để có cái nhìn tổng quan nhất và giúp việc chọn thiết kế hệ thống một cách chính xác hơn. <br>
# 1. Software architecture
## 1.1 Khái niệm
Software architechture (SA) bao gồm các thành phần quan trọng nhất của một hệ thống, mối quan hệ giữa chúng và cách chúng tương tác với nhau. Nó được xem như một bản thiết kế chi tiết, cung cấp mô hình để quản lý hệ thống và thiế lập cũng như điều phối giao tiếp giữa các component <br>
![](https://images.viblo.asia/d51dd48b-9f94-409a-86bf-1525ac16462f.png)
- Kiến trúc xác định một giải pháp để đáp ứng các yêu cầu kỹ thuật và vận hành. với mục tiêu chung là performance và bảo mật. <br>
- Thiết kế kiến trúc là kế hợp giữa nhu cầu của tổ chức cũng như nhu cầu của đội ngũ phát triển. Mỗi quyết định cần được xem xét ảnh hướng đến chất lượng, sự bảo trì, performance của dự án
## 1.2 Tại sao chúng quan trọng
Nhân tố chính làm nên thành công khi tạo dựng bất cứ thứ gì chính là làm đúng phần cơ sở. Dù là xây nhà hay thậm chí làm bánh, nếu phần gốc không ổn thì ta phải bắt đầu lại từ đầu. <br>
Xây dựng một ứng dụng web cũng vậy. Kiến trúc là nền tảng và phải được suy nghĩ cẩn thận để tránh những thay đổi lớn về thiết kế và refactor code sau này. Nhiều kỹ sư sẽ nói rằng bạn không muốn phải thiết kế lại. Nó sẽ làm chậm ngày realease dự án, lãng phí nhân lực cũng như tài chính. <br>
Tùy thuộc vào giai đoạn nào đó trong quy trình phát triển, chúng ta gặp phải thách thức do những quyết định trong pha thiết kế ban đầu. Bởi vậy, trước khi bắt tay vào code, tốt nhất là làm đúng phần cơ sở.
## 1.2. Sự khác nhau giữa software architecture và software design
Chúng ta sẽ làm rõ hai khái niệm này để tránh việc nhầm lẫn: <br>
**Software architecture** được dùng để xác định phần khung và các component cấp cao của hệ thống, và cách chúng làm việc với nhau. Chẳng hạn, ta cần một kiến trúc serverless chia nhỏ ứng dụng thành 2 component: BaaS (backend-as-a-service) và FaaS (functions-as-a-service), hoặc cần một kiến trúc microservice mà các chức năng được chia thành các modules riêng biệt. Lựa chọn một kiến trúc sẽ xác định cách ta xử lý performance, fault tolerance, tính mở rộng. <br>
**Software design** chịu trách nhiệm ở mức độ code design, module được code như thế nào, class scope, mục đích function. Khi sử dụng đúng thì lập trình viên sẽ làm việc hiệu quả hơn, tránh việc quay vòng. Chúng cũng cung cấp một ngôn ngữ chung để khái niệm hóa các vấn đề lặp đi lặp lại và giải pháp xử lý khi gặp phải.
# 2. Các mẫu thiết kế software architecture
## 2.1 Client-Server
Kiến trúc làm việc dựa trên mô hình request-response. Client gửi request đến server để lấy thông tin và server trả dữ liệu về. <br>
Mọi website ta truy cập như blog, Facebook, Twitter đều được xây dựng trên kiến trúc client-server. <br>
![](https://images.viblo.asia/de168278-c5fb-4574-9086-c65340b76f6f.png)
## 2.2 Peer to peer
Là một mạng lưới mà mỗi máy tính được xem như một node liên lạc với nhau mà không cần một server tập trung. Sự vắng mặt của server tập trung sẽ loại bỏ được vấn đề single point of failure. Tất cả máy tính trong mạng đều có quyền như nhau. Mỗi node vừa đóng vai seeder, vừa đóng vai leecher cùng một lúc, nên dù một số máy tính (node) không hoạt động thì hệ thống vẫn chạy tiếp. <br>
![](https://images.viblo.asia/e9facdc3-3604-46e6-9302-53bd61c0f21a.png)
## 2.3 Model-View-Controller (MVC)
[Kiến trúc MVC](https://www.educative.io/blog/mvc-tutorial) là software architectural pattern mà ở đó logic của ứng dụng được chia thành 3 component dựa theo chức năng. Các components bao gồm:  <br>
- Models - biểu diễn cách dữ liệu được lưu trữ trong database <br>
-  Views - hiển thị thông tin cho user (GUI) <br>
-  Controllers - component hoạt động như một interface giữa model và view. <br>
![](https://images.viblo.asia/f9d8533d-c559-4f18-99b1-83a95a7ac62b.jpg)
## 2.4 Microservice
Trong kiến trúc microservices, những chức năng khác nhau được chia thành cách module riêng biệt, liên kết với nhau để tạo thành một service lớn. Tìm hiểu thêm về microservice tại [đây](https://www.educative.io/blog/microservices-architecture-tutorial-all-you-need-to-get-started) <br>
![](https://images.viblo.asia/58815618-09f9-4ba5-9997-5487a2ae275f.png)
## 2.5 Event driven
Trong kiến trúc Event-Driven, khi một service thực hiện một số công việc mà các service khác có liên quan, service đó tạo ra một sự kiện, một bản ghi của tác vụ được thực hiện. Các service khác sử dụng các sự kiện đó để có thể thực hiện bất kỳ nhiệm vụ nào cần thiết như là một kết quả của sự kiện. Không giống như REST, các service tạo ra yêu cầu không cần biết chi tiết về các service sử dụng. Chúng có khả năng xử lý một số lượng lớn các kết nối đồng thời với mức tiêu thụ tài nguyên tối thiểu. Các ứng dụng hiện đại cần một mô hình không đồng bộ hoàn toàn để mở rộng quy mô (scaling). <br>
![](https://images.viblo.asia/b216d66a-50f1-45a5-af83-59c52d44ffc7.png)
## 2.6 Layered
Pattern này được dùng để cấu trúc chương trình mà có thể được phân tách thành các nhóm nhỏ, mỗi nhóm ở một mức độ trừu tượng hóa khác nhau. Mỗi layer cung cấp service cho layer ở mức cao hơn. <br>
Dưới đây là một số layer thường gặp: <br>
- Presentation layer
- Application layer
- Business logic layer
- Data access layer
# 3. Làm cách nào để quyết định xem số tier của ứng dụng
## Single tier application
Ưu điểm: <br>
- Không có độ trễ
- Dữ liệu truyền tải nhanh
- Dữ liệu không cần truyền qua mạng, đảm bảo an toàn
Nhược điểm: <br>
- Khó thiết kế chức năng mới <br>
- Testing phải cực kỳ kỹ lưỡng <br>
- Dễ bị reverse engineered
## Two-tier application
Ưu điểm: <br>
- Database server và business logic gần nhau (về mặt vật lý), nên performance sẽ cao <br>
Nhược điểm: <br>
- Vì client giữ hầu hết logic của ứng dụng, vấn đề nảy sinh khi cần kiểm soát version của ứng dụng và phân phối ứng dụng mới. <br>
- Thiếu tính mở rộng vì nó chỉ hỗ trợ một số ít người dùng, performance giảm khi có nhiều người dùng request <br>
- Khó để tái sử dụng
## Three-tier application
Ưu điểm: <br>
- Đặt logic business ở server tập trung nên dữ liệu được đảm bảo an toàn <br>
- 
Nhược điểm: <br>
- Cần nhiều effort hơn khi tạp ứng dụng 3 lớp vì số điểm liên lạc sẽ tăng
## N-Tier application
# 4. Horizontal hay Vertical Scaling
Nếu ứng dụng chỉ là một tiện ích hoặc công cụ với một số lượng traffic dự kiến ổn định thì đây không phải vấn đề, ví dụ như một công cụ nội bộ của tổ chức. Tại sao phải lưu trữ ở môi trường phân tán? Một server là đủ để quản lý lưu lượng truy cập, bạn nên scale vertical khi ta biết traffic sẽ không tăng đột biến. <br>
![](https://images.viblo.asia/5d7a79ee-403b-4bf5-ae3e-0ed6d187f61f.png)
Nếu ứng dụng là một ứng dụng kiểu như mạng xã hội, fitness, ... thì traffic có thể tăng theo cấp số nhân trong tương lai gần. Với trường hợp này thì tính khả dụng cũng như khả năng scale horizontal là rất quan trọng. <br>
![](https://images.viblo.asia/9a3f2b24-0469-473d-bf5e-95456fd1b214.png)
# 5. Monolith hay Microservice?
![](https://images.viblo.asia/3a6f6336-b951-4f3b-a42f-a5029602197d.png)
## Khi nào dùng kiến trúc monolithic
Ứng dụng monolithic phù hợp với những yêu cầu đơn giản, ứng dụng chỉ xử lý một lượng traffic hữu hạn Ví dụ như công cụ tính toán thuế nội bộ của tổ chức.
Đây là những trường hợp mà business được xác định lưu lượng truy cập sẽ không có tăng trưởng theo cấp số nhân. <br>

Cũng có những trường hợp trong đó các nhóm phát triển quyết định bắt đầu với kiến trúc monolithic và sau đó mở rộng ra kiến trúc microservice phân tán. <br>Điều này giúp họ xử lý được độ phức tạp của ứng dụng từng bước một. <br>

## Khi nào dùng kiến trúc microservice
Kiến trúc microservice phù hợp với những ứng dụng phức tạp với lưu lượng truy cập lớn. <br>
Những ứng dụng kiểu mạng xã hội có nhiều component khác nhau như messaging, real-time chat, LIVE video streaming, image upload, like, share ... <br>

Trong trường hợp này, mỗi component nên là tách biệt, mỗi component là một codebase riêng. <br>
Chúng ta có 3 hướng tiếp cận: <br>
- Chọn kiến trúc monolithic <br>
- Chọn kiến trúc microservice <br>
- Bắt đầu với monolithic và đổi thành microserver sau này <br>
# 6. NoSQL hay SQL?
## Khi nào dùng SQL database?
Nếu ta xây dựng các ứng dụng stock trading, banking hoặc ứng dụng tài chính hoặc cần lưu trữ nhiều mối quan hệ, chẳng hạn các ứng dụng mạng xã hội như Facebook, thì nên chọn cơ sở dữ liệu quan hệ vì một số lý do sau đây: <br>
### Transactions và Data Consistency
- Nếu phần mềm cần làm việc với tiền và các con số thì nó cần transaction, ACID, data consistency. Và cơ sở dữ liệu quan hệ đáp ứng tốt điều đó. <br>
- Lưu trữ relationships: Nếu dữ liệu có nhiều relationship thì không gì tốt hơn cơ sở dữ liệu quan hệ <br>
Một số cơ sở dữ liệu phổ biến gồm: MySQL, Microsoft SQL Server, PostgreSQL <br>
## Khi nào dùng NoSQL?
Một vài lý do nên chọn NoSQL gồm: <br>
### Xử lý read/write nhiều
Khi cần scale nhanh thì nên dùng NoSQL, chẳng hạn khi có một lượng lớn hành vi read/write trên website và cần xử lý dữ liệu lớn, NoSQL sẽ đáp ứng hoàn hảo cho những kịch bản như vậy.
### Phân tích dữ liệu
NoSQL databases cũng phù hợp cho phân tích dữ liệu.
Một số NoSQL database phổ biến: MongoDB, Redis, Cassandra... <br>

Như vậy bài viết đã tìm hiểu một số khái niệm cơ bản trong software architecture với một cái nhìn tổng quan nhất. Hi vọng bài viết giúp ích cho mọi người. See you!
# Reference
https://www.educative.io/blog/how-to-design-a-web-application-software-architecture-101