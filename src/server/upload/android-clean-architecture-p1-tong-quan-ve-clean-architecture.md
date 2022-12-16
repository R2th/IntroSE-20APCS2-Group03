**Tiêu đều bài viết là Android Clean Architecture nhưng P1 mình chưa nói gì đến cả. P2 mình sẽ chia sẻ  về Android Clean Architecture và các triển khai sau. Do nội dung tương đối dài nên bài viết này mình chỉ trình bày sơ qua khái niệm Clean Architecture và các layer nhé.**
## Clean Architecture là gì?

Clean Architecture hay còn gọi là kiến trúc sạch được đề xuất vào năm 2012 bởi Robert C. Martin. Các bạn có thể tham khảo chi tiết ở [The Clean Code Blog by Robert C. Martin (Uncle Bob)](http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

Trong đó mô tả một kiến trúc Clean là một kiến trúc đáp ứng những tiêu chí sau:
- Independent of Frameworks (Độc lập với framework): mỗi framework luôn có những điểm mạnh lẫn điểm yếu của nó, các Frameworks có sẳn sinh ra nhằm giúp chúng ta một phần nào đó trong việc tổ chức hệ thống chứ không nhất nhất là chúng ta cần gì cũng kéo Framework vào để rồi phải nhồi nhét nhiều thứ quy tắc rối rắm mà mỗi Framework yêu cầu
- Testable: Việc thiết kế business rules có thể test được mà không cần đến UI, Database, Web-Server hoặc các yếu tố bên ngoài khác..
- Independent of UI (Độc lập với UI hay bất cứ interface nào): Việc thay đổi giao diện sẽ xảy ra rất thường xuyên nhưng điều này không ảnh hưởng đến việc thay đổi business rules.
- Independent of Database (Độc lập với Database): cho dù ứng dụng của bạn có thể thay đổi từ MySql sang Mongo hay PostgreSQL thì business rules vẫn không bị ảnh hưởng
- Independent of any external agency (Độc lập với các thành phần third-party): cho dù thế giới bên ngoài có thay đổi như thế nào, đại loại như những libraries khác có thay đổi thì sẽ không ảnh hưởng đến business rules

Clean Architecture chia thành 4 layer với một quy tắc phụ thuộc. Các layer bên trong không nên biết bất kỳ điều gì về các layer bên ngoài. 
Về cơ bản, quy tắc này nói rằng dù định dạng dữ liệu của layer ngoài cùng như thế nào thì sẽ không ảnh hưởng đến layer bên trong, hay việc thay đổi business rule ở layer bên trong cũng không ảnh hưởng đến việc hiển thị ở layer bên ngoài.

Độ phức tạp của các layer cũng tăng dần từ trong ra ngoài. Càng ở trong thì độ phức tạp càng nhỏ (Độ phức tạp ở đây có chỉ khối lượng framework, library sử dụng => Layer càng ở trong thì sử dụng càng ít)

Như hình bên dưới thì chúng ta có thể thấy 4 layers của Clean Architecture:

- Entities
- Use cases
- Interface Adapters
- Frameworks & Drivers

![](https://images.viblo.asia/be378ba0-1360-4b10-8665-0568b2740400.jpg)

### 1. Entities
Entity sẽ chứa những business rules. Một Entity có thể là một object với những methods căn bản hoặc là cấu trúc của object này và miễn là nó có thể được sử dụng bởi nhiều ứng dụng khác nhau trong toàn bộ phần mềm.

Ví dụ: Với bài toán xây dựng ứng dụng To do list cho phép tạo các task. Thì entity ở đây sẽ là Task.

### 2. Use cases
Application Business Rules : Đây là các use case của hệ thống. Các yêu cầu đặt ra (vd requirement của 1 chức năng). Với các dự án outsource thì thường sẽ là khách hàng đặt ra business rule, còn với những sản phẩm product thì thường sẽ là người chịu trách nhiệm chính cho sản phẩm, chủ sở hữu của sản phẩm.
- Use cases sử dụng các entity bên trong để giải quyết bài toán.  
- Use case không liên quan gì đến UI or database
- Đây là tầng quan trọng, khi làm các ứng dụng lớn, thì có thể chia sẻ tầng này với các ứng dụng khác. Ví dụ: xây dựng 1 ứng dụng trên nhiều loại thiết bị khác nhau, có thể là trên smartphone và smartwatch. Cách hiển thị có thể khác nhau nhưng về cơ bản thì chức năng, use case của chương trình hầu như là giống nhau => có thể share và cùng sử dụng
- Nếu nói về sự thay đổi thì Use cases là tầng thay đổi ít nhất (tức code ít bị modify nhất)

### 3. Interface Adapters
Một thành phần không kém phần quan trọng trong hệ thống phần mềm của chúng ta đó là Interface Adapters. Đây là một bộ các adapters có nhiệm vụ chuyển dữ liệu từ đầng này sang tầng khác. Ví dụ như adapter chuyển đổi dữ liệu từ các use cases và Entities/Domain Model thành dữ liệu cho Database(Database Model) và ngược lại(Data Mapper).

Các bạn đừng nhầm lẫn giữa tầng Adapters này với Apdater Reyclerview hay ListView nhé. Có thể Adapter trong recyclerview/list view có thể là 1 phần của Adapter nhưng ngược lại thì không

### 4. Frameworks & Drivers 
Layer ngoài cùng này chứa code liên quan đến framework, DB, UI,… những cái không liên quan gì đến logic chính của hệ thống.

Đây là một số thành phần có thể nằm trong các vòng tròn ngoài cùng, nói chung bạn không viết nhiều code trong layer này ngoại trừ code để connect với các vòng tròn ở bên trong. Layer này là nơi tập trung của các chi tiết. Chúng ta sẻ giữ những thứ này ở bên ngoài, nơi chúng khó có thể gây ảnh hưởng đến các phần ở vòng tròn bên trong.

### 5. Vậy tại sao nên sử dụng Clean Architecture ?
Lợi ích của việc sử dụng Clean Architecture: 
- Tách biệt hoàn toàn các tầng (layer) với nhau với nhiệm vụ riêng biệt giúp cho việc chỉnh sửa dễ dàng hơn.
- Tăng tính trừu tượng
- Tránh ràng buộc
- Dễ dàng kiểm thử

Tuân theo các quy tắc đơn giản trên không phải là một việc quá khó khăn nhưng nó sẻ giúp chúng ta tiết kiệm được nhiều thời gian trong tương lai. Bằng việc tách hệ thống thành các layer, đồng thời tuân theo Dependency Rule, chúng ta sẽ xây dựng được một hệ thống dễ test, cùng với những lợi ích kèm theo như đã đề cập ở trên. Khi bất kỳ bộ phận bên ngoài của hệ thống trở nên lỗi thời, chẳng hạn như database, hoặc web framework, bạn hoàn toàn có thể thay thế chúng với một effort tối thiểu.
### 6. Hạn chế
Màu mè một hồi thì cũng không thể không kể đến những hạn chế của Clean Architecture.

- Một điều mà ai cũng nhân ra rằng việc triển khai Clean Architecture khá là phức tạp và cồng kềnh
- Về trình độ của team khi áp dụng Clean Architecture cũng đáng quan tâm vì nó đòi hỏi khá là nhiều kiến thức.

Việc triển khai các layer khá là mất thời gian và phức tạp. Như vậy có phải lúc nào chúng ta cũng cần phải triển khai đầy đủ 4 layers không? Theo mình là câu trả lời là không, tùy theo từng hệ thống mà sẽ có số lượng các lớp khác nhau, không nhất thiết phải tách biệt  entities và use case.

## End P1
Nội dung bài viết cũng tương đối dài rồi và còn nhiều nên mình xin để dành cho P2 và dừng lại tại đây.  P2 các bạn xem [tại đây](https://viblo.asia/p/android-clean-architecture-p2-clean-architecture-trong-android-va-vi-du-gAm5ybjOKdb)

Bài chia sẻ này là theo ý hiểu của cá nhân mình nên không thể tránh được việc thiếu sót và những điểm chưa đúng. Rất mong nhận được nhận xét và giúp đỡ từ mọi người.
Cảm ơn các bạn đã đọc.