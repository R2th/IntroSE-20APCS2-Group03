Chủ đề chính của bài viết này là mô tả làm thế nào để chúng ta có thể tích hợp một kiến trúc event-driven với microservices sử dụng **Event sourcing** và **CQRS**.

Microservices là độc lập, mô-đun services có kiến trúc lớp riêng của chúng.

# Microservices với cùng một cơ sở dữ liệu
Khi microservices chia sẻ chung cơ sở dữ liệu, data model ở giữa các services có thể theo mối quan hệ giữa các tables được liên kết với các microservices.

Cho ví dụ, có hai microservices đang chạy trong các containers của riêng chúng: **Order** và **Customer**.

**Order** service sẽ phụ trách việc tạo, xóa, cập nhật và nhận dữ liệu order. **Customer** service sẽ làm việc với dữ liệu customer.

Một customer có thể có nhiều orders, cái mà chúng ta gọi là quan hệ one-to-many. Cả hai tables nằm trong cùng một cơ sơ dữ liệu. Vì vậy, quan hệ one-to-many có thể được thành lập.

**Order** service và **Customer** service, mặc dù chạy trong những containers riêng biệt, có thể truy cập các tables từ cùng một cơ sở dữ liệu. Điều này sẽ tận dụng các transactions thích hợp với các thuộc tính ACID, nơi dữ liệu customer được cập nhật. Dữ liệu Order cũng có thể được cập nhật để đảm bảo sự toàn vẹn của dữ liệu.

![](https://images.viblo.asia/8867fbfb-dc9f-48c2-8bb5-31cc0f50645e.png)

Tuy nhiên, có một số giới hạn trong các tiếp cận này. Một cơ sở dữ liệu dùng chung không được khuyến khích trong kiến trúc dựa trên microservices bởi vì nếu có một thay đổi trong một data model, dẫn đến các services khác cũng bị ảnh hưởng theo.

# Microservices với các cơ sở dữ liệu riêng rẽ
Như một phần của việc thực hành tốt nhất của microservices thì mỗi microservice nên có một cơ sở dữ liệu của riêng nó.

**Order** microservice truy cập cơ sở dữ liệu **Order** và **Customer** microservice truy cập cơ sở dữ liệu **Customer**.

Trong kịch bản này, mối quan hệ giữa các tables không được thành lập, cả hai tables được tách biệt ở các cơ sở dữ liệu khác nhau.

Nếu **Customer** microservice muốn cập nhật dữ liệu **Order**, nó có thể truyền customer id như một tham số HTTP service của **Order** microservice để cập nhật dữ liệu **Order** cho customer id tương ứng, các bạn có thể hình dung như bên dưới.

![](https://images.viblo.asia/9b361e9d-9f0c-41f5-b864-1079e4604684.png)


Hạn chế của cách tiếp cận này là việc quản lý transaction đó không thể xử lý đúng cách. Nếu dữ liệu customer bị xóa thì order tương ứng với customer tương ứng cũng phải xóa.

Mặc dù điều này thì vẫn có thể thực hiện được với cách giải quyết giống như việc gọi một service xóa trong Order service, nhưng như vậy thì tính độc lập sẽ không đạt được một cách rõ ràng, rành mạch. Điều này cần được xử lý với việc tùy chỉnh.

Để vượt qua hạn chế này, chúng ta có thể tích hợp một kiến trúc event-driven với các thành phần microservices của chúng ta.

Như mô hình bên dưới, bất kì thay đổi nào trong dữ liệu của customer cũng sẽ publish một event đến messaging system, như vậy event sẽ tiêu thụ dữ liệu customer và cập nhật dữ liệu order.

![](https://images.viblo.asia/162c7d7f-6aac-47c0-8cd9-2f727ab6b20f.png)

Giới hạn của cách tiếp cận này là tính đơn nhất (độc lập) cập nhật giữa cơ sở dữ liệu và publish event đến message queue không thể xử lý dễ dàng. Mặc dù những kiểu transactions này có thể xử lý bởi quản lý transaction phân tán, điều này không được khuyến khích trong kiến trúc microservice, ở đó có lẽ không hỗ trợ XA transactions trong tất cả các kịch bản.

Để tránh những giới hạn này, event-sourcing có thể được giới thiệu trong kiến trúc microservices.

Trong event-sourcing, bất kì sự kiện trigger nào cũng được lưu trong một event store. Không có các hoạt động cập nhật hoặc xóa trên dữ liệu và mọi event được sản sinh ra sẽ được lưu trữ như một bản ghi trong cơ sở dữ liệu. Nếu có một thất bại trong transaction, event thất bại được thêm như một bản ghi trong cơ sở dữ liệu. Mỗi thực thể bản ghi sẽ là một hoạt động đơn nhất.

**Những ưu điểm của event-sourcing như sau:**

- Giải quyết được vấn đề đơn nhất (tính độc lập về kiến trúc).
- Bảo trì lịch sử và giám sát các bản ghi.
- Có thể tích hợp với phân tích dữ liệu và hồ sơ lịch sử được bảo trì.

**Nhược điểm:**

- Các truy vấn trên dữ liệu mới nhất hoặc các phần cụ thể của dữ liệu trong event store liên quan đến các xử lý phức tạp.
- Để làm dữ liệu thống nhất cuối cùng, điều này liên quan đến các xử lý bất đồng bộ  bởi vì luồng dữ liệu tích hợp với messaging system.
- Model liên quan đến việc thêm mới, truy vấn dữ liệu là giống nhau và có lẽ dẫn đến sự phức tạp trong model cho việc ánh xạ với event store.
- Dung lượng event store phải lớn hơn trong việc lưu trữ tất cả lịch sử của các bản ghi.

# Microservices với CQRS và Event Sourcing
Bây giờ chúng ta tích hợp **CQRS (Command Query Responsibility Segregation)** với event sourcing để vượt qua các giới hạn trên.

![](https://images.viblo.asia/fb0ae606-f75d-4f22-8fb2-efa224d36488.png)

CQRS là một design pattern khác sử dụng kiến trúc microservices, cái mà sẽ chia tách service, model và cơ sở dữ liệu cho hoạt động đọc và ghi dữ liệu trong cơ sở dữ liệu.

Cơ sở dữ liệu đọc có thể lưu trữ một model không chuẩn hóa nơi mà database giống như NoSQL (nó mở rộng theo chiêu ngang) có thể tận dụng.

Command layer được sử dụng cho việc thêm dữ liệu đến nơi lưu trữ. Query layer được sử dụng cho việc truy vấn dữ liệu từ nơi lưu trữ.

Trong Customer microservice,  khi được sử dụng như một command model, bất kì event thay đổi trong dữ liệu customer, giống như customer name được thêm vào hoặc địa chỉ được cập nhật sẽ sản sinh ra events và publish đến messaging queue. Điều này cũng ghi event vào cơ sở dữ liệu song song.

Event được publish trong message queue sẽ được tiêu thụ bởi event consumer và cập nhật dữ liệu trong read store.

Tương tự, events được publish qua microservices cũng phải truyền thông qua message queue.

**Ưu điểm của CQRS tích hợp với event sourcing và microservice:**

- Tận dụng microservice cho mô-dun với chia tách cơ sở dữ liệu.
- Tận dụng event sourcing cho việc xử lý các hoạt động đơn nhất.
- Bảo trì hồ sơ lịch sử, giám sát dữ liệu cho việc phân tích với việc triển khai event sourcing.
- CQRS chia các models và services cho hoạt động đọc và ghi dữ liệu.
- Yêu cầu tải có thể phân tán giữa hoạt động đọc và ghi.
- Hoạt động đọc dữ liệu có thể nhanh hơn vì được phân tán tải với hoạt động ghi.
- Model đọc và DTO không cần có tất cả các trường như model ghi và model này có thể chỉ yêu cầu các trường mà client hiển thị như vậy sẽ tiết kiệm được dung lượng của kho lưu trữ dữ liệu đọc.

**Nhược điểm:**

- Thêm bảo trì của cơ sở hạ tầng, như chia tách cơ sở dữ liệu đọc và ghi.
- Models phải được thiết kế theo cách tối ưu, điều này dẫn đến sự phức tạp trong xử lý sự cố.

# Tổng kết
Trong bài viết này, tác giả đã phân tích các vấn đề khi thiết kế kiến trúc của **Microservices** và từng bước mô tả lý do sự kết hợp giữ microservices, **CQRS** và event sourcing mang đến nhiều ưu điểm, đồng thời giải quyết được nhiều giới hạn chế ở các kiến trúc khác.
Hy vọng, bài viết sẽ giúp ích được gì đó trong các bài toán của các bạn đang sử dụng Microservice.

**- Bài viết được dịch từ nguồn:**

https://dzone.com/articles/microservices-with-cqrs-and-event-sourcing