Một vài năm trở lại đây, khái niệm kiến trúc **[Microservices](https://www.nginx.com/blog/introduction-to-microservices/)** hiện là chủ đề rất hot trong cộng động lập trình viên. Thật không khó để có thể tìm thấy một bài viết, một bản báo cáo hay một bài thuyết trình về chủ đề này. Vậy **[Microservices](https://www.nginx.com/blog/introduction-to-microservices/)** là gì? Ưu điểm và nhược điểm của kiến trúc **[Microservices](https://www.nginx.com/blog/introduction-to-microservices/)** ra sao? 

### 1 : Microservices là gì.

Trong tiếng anh, micro có nghĩa là nhỏ, vi mô. Vậy Microservice, như tên của nó, đó chính là chia một khối phần mềm thành các service nhỏ hơn, có thể triển khai trên các server khác nhau. Mỗi service sẽ xử lý từng phần công việc và được kết nối với nhau thông qua các các giao thức khác nhau, như http, SOA, socket, Message queue (Active MQ, Kafka)... để truyền tải dữ liệu.

Trước khi Microservices xuất hiện, các ứng dụng thường phát triển theo mô hình Monolithic architecture (Kiến trúc một khối). Có nghĩa là tất cả các module (view, business, database) đều được gộp trong một project, một ứng dụng được phát triển theo mô hình kiến trúc một khối thường được phân chia làm nhiều module. Nhưng khi được đóng gói và cài đặt sẽ thành một khối (monolithic). Lợi ích của mô hình kiến trúc một khối đó là dễ dàng phát triển và triển khai. Nhưng bên cạnh đó nó cũng có nhiều hạn chế ví dụ như khó khăn trong việc bảo trì, tính linh hoạt và khả năng mở rộng kém, đặc biệt với những ứng dụng doanh nghiệp có quy mô lớn. Đó chính là lí do ra đời của kiến trúc Microservices.

**Những đặc điểm của microservice**
* **Decoupling** - Các service trong một hệ thống phần lớn được tách rời. Vì vậy, toàn bộ ứng dụng có thể dễ dàng được xây dựng, thay đổi và thu nhỏ.
* **Componentization** - Microservices được coi là các thành phần độc lập có thể dễ dàng thay thế và nâng cấp.
* **Business Capabilities** - mỗi một thành phần trong kiến trúc microservice rất đơn giản và tập trung vào một nhiệm vụ duy nhất.
* **Autonomy** - các lập trình viên hay các nhóm có thể làm việc độc lập với nhau trong quá trình phát triển.
* **Continous Deliver**y -  Cho phép phát hành phần mềm thường xuyên, liên tục.
* **Responsibility** .
* **Decentralized Governance** - không có mẫu chuẩn hóa hoặc bất kỳ mẫu công nghệ nào. Được tự do lựa chọn các công cụ hữu ích tốt nhất để có thể giải quyết vấn đề.
* **Agility** -  microservice hỗ trợ phát triển theo mô hình Agile.

### 2 : Ưu điểm.

Kiến trúc Microservices được sinh ra để khắc phục những hạn chế của kiến trúc một khối.
* Independent Development - Tất cả các service có thể được phát triển dễ dàng dựa trên chức năng cá nhân của từng service. Có thể chia nhỏ để phát triển độc lập.
* Independent Deployment - Có thể được triển khai riêng lẻ trong bất kỳ ứng dụng nào.
* Fault Isolation - khi một service của ứng dụng không hoạt động, hệ thống vẫn tiếp tục hoạt động.
* Mixed Technology Stack - Các ngôn ngữ và công nghệ khác nhau có thể được sử dụng để xây dựng các service khác nhau của cùng một ứng dụng.
* Granular Scaling 

Kiến trúc Microservices giúp đơn giản hóa hệ thống, chia nhỏ hệ thống ra làm nhiều service nhỏ lẽ dể dàng quản lý và triển khai từng phần so với kiến trúc nguyên khối. Phân tách rõ ràng giữa các service nhỏ. Cho phép việc mỗi service được phát triển độc lập. Cũng như cho phép lập trình viên có thể tự do chọn lựa technology stack cho mỗi service mình phát triển. mỗi service có thể được triển khai một cách độc lập (VD: Mỗi service có thể được đóng gói vào một docker container độc lập, giúp giảm tối đa thời gian deploy). Nó cũng cho phép mỗi service có thể được scale một cách độc lập với nhau. Việc scale có thể được thực hiện dễ dàng bằng cách tăng số instance cho mỗi service rồi phân tải bằng load balancer.

### 3 : Hạn chế.

Kiến trúc Microservices đang là một xu hướng, nhưng nó cũng có nhược điểm của nó.
Microservice khuyến khích làm nhỏ gọn các service, nhưng khi chia nhỏ sẽ dẫn đến những thứ vụn vặt, khó kiểm soát. Hơn nữa chính từ đặc tính phân tán khiến cho các lập trình viên phải lựa chọn cách thức giao tiếp phù hợp khi xử lí request giữa các service. 

Hơn nữa việc quản lí nhiều database, và transaction giữa các service trong một hệ thống phân tán cũng là một khó khăn không nhỏ. Hay khi thực hiện test một service, bạn cũng cần test các service có liên quan. 

Triển khai microservice cũng sẽ phức tạp hơn so với ứng dụng kiến trúc một khối, cần sự phối hợp giữa nhiều service, điều này không đơn giản như việc triển khai WAR trong một ứng dụng kiến trúc một khối.

-----
Bài viết có tham khảo và sử dụng tài nguyên từ các nguồn:
https://devskill.org/gioi-thieu-ve-microservice

https://www.nginx.com/blog/introduction-to-microservices/

https://www.edureka.co/blog/what-is-microservices/

https://codeaholicguy.com/2015/11/16/gioi-thieu-ve-microservices-phan-3-nhung-uu-nhuoc-diem-cua-microservices/