**Domain Events** có điểm chung gì với **Event Sourcing** ? Chắc chắn từ "event" trong tên của chúng. Nhưng ngoài ra, khi nói về kiến trúc và nhà nhà phát triển trong các dự án, tại các hội nghị hoặc đào tạo, tôi thường nghe rằng domain event rất phù hợp với event sourcing và rằng event sourcing là một ý tưởng nguồn của domain events. Trong bài viết này tôi mong muốn tóm lược tại sao cá nhân tôi không đồng tình với quan điểm này.

Trước tiên tôi sẽ tranh luận tại sao tôi không chia sẻ cách nhìn này, tôi muốn đảm bảo một cách hiểu đầy đủ về domain events và event sourcing.

# Domain Events
Trong thiết kế domain-driven, domain events được mô tả như một số việc xảy ra trong domain và là quan trọng với domain experts. Thông thường events xảy ra bất kể domain được triển khai trong hệ thống phần mềm ở cấp độ nào. Chúng cũng độc lập với các công nghệ. Theo đó, domain event về mặt ngữ nghĩa giá trị cao, chúng được thể hiện trong ngôn ngữ nói bởi domain experts. Ví dụ như:

- Một người dùng đã được đăng kí.
- Một hóa đơn đã nhận.
- Hạn thanh toán đã hết hạn.

Domain events có liên quan cả bên trong  một bounded context và chạy qua các bounded contenxt cho việc triển khai các processes bên trong domain. 

# Event Sourcing
Martin Fowler miêu tả đặc điểm chính của event sourcing trong [bài viết](https://martinfowler.com/eaaDev/EventSourcing.html) của ông như sau:

> Event Sourcing ensures that all changes to application state are stored as a sequence of events.

Thay vì lưu trạng thái hiện tại bên trong ứng dụng một cách trực tiếp, bằng các trường trong bảng cơ sở dữ liệu thì sẽ thực hiện lưu một danh sách các events, sau khi thực hiện chạy lần lượt các event này chúng ta sẽ có được trạng thái hiện tại của đối tượng. Nó sẽ bị ghi đè bởi các thay đổi sau đó.

Event sourcing là một khái niệm chung, nhưng thường được thảo luận trong bối cảnh của thiết kế domain-driven trong việc kết nối với aggregates. Vì thế tôi sử dụng sự bền vững của aggregates như một ví dụ cho việc sử dụng event sourcing.

Sự tiếp nối bên dưới chỉ ra các bước liên quan khi sử dụng event sourcing cho lưu trữ lâu dài trạng thái của một aggregate:

![](https://images.viblo.asia/084990ce-42bb-4a13-94f7-5708b0ed6531.png)

Một hành động liên quan đến business sẽ được gọi trên một aggregate hiện có. Hai events trước đã được duy trì cho aggregate này

![](https://images.viblo.asia/f1a1847a-cbf5-4220-b59f-3945cc2162ed.png)

Trước khi yêu cầu được xử lý, một instance rỗng của aggregate được tạo ra và các events được lưu trữ trước đó chạy lại trên aggregate. Aggregate chỉ đọc trạng thái các event tương ứng và không có business nào được thực thi. Khi hoàn thành, aggregate chứa trạng thái hiện tại của nó trong bộ nhớ.


![](https://images.viblo.asia/c1758dc5-5f27-4f38-a08f-8b837ef2e49a.png)

Yêu cầu được chấp nhận bởi aggregate, xác nhận trạng thái hiện tại và xử lý,..Domain logic tương ứng được thực thi. Tại thời điểm đó, chưa có trạng thái nội bộ nào của aggregate bị thay đổi, điều này chỉ được thực hiện sau khi việc xử lý event tạo ra trong quá trình triệu gọi.

![](https://images.viblo.asia/ea652f46-5490-496e-a204-c52477d13204.png)

Như một kết quả của quá trình xử lý yêu cầu, aggregate sản sinh một event (hoặc một vài event), bao gồm trạng thái được yêu cầu cho việc tái xây dựng trạng thái trong aggregate. Event được duy trì như vậy, nó có thể được sử dụng cho việc gọi trong tương lai.

Những ưu điểm chính được liệt kê bên dưới khi sử dụng event sourcing:

- Event được lưu trữ không chỉ mô tả trạng thái hiện tại của đối tượng mà còn cho thấy lịch sử của quá trình tạo ra nó.
- Nó có thể tái xây dựng lại trong bất kì thời điểm nào cho bất kì trạng thái nào trong quá khứ bởi việc chạy lại các event với một mốc thời gian nhất định.
- Có thể hiểu được việc sử dụng event sourcing để xử lý processing lỗi của các event trước đó hoặc các event bị trì hoãn.

Việc triển khai event sourcing cũng đòi hỏi một khái niệm và công nghệ phức tạp nhất định. Các event không được phép thay đổi một khi vẫn tồn tại, trong khi domain logic thường phát triển theo thời gian. Vì vậy code phải có khả năng xử lý các event thậm chí là rất cũ. 
Snapshots cần thiết để có thể xây dựng lại trạng thái dựa trên lượng lớn lịch sử của các event theo cách thức nào đó.

# Events ở Event Sourcing khác Domain Events

Vậy tại sao tôi nghĩ rằng 2 khái niệm này không thực sự khớp nhau như vậy ?

Hãy xem xét ví dụ bên dưới: Trong một domain cho việc chia sẻ xe đạp, một người dùng muốn đăng kí để thuê một chiếc xe đạp. Tất nhiên một chiếc thì cũng phải thanh toán cho nó, cái mà được làm thông qua cách tiếp cận tiền thanh toán là sử dụng ví điện tử.

Các phần liên quan của bản đồ bối cảnh cho domain này trông như bên dưới:

![](https://images.viblo.asia/1ec97214-cba2-4a17-a868-2319dd160647.png)

Xử lý đăng kí làm việc như bên dưới:

- Người dùng nhập số điện thoại của mình thông qua ứng dụng mobile.
- Người dùng nhận một mã từ SMS để xác nhận số điện thoại.
- Người dùng nhập mã xác nhận.
- Người dùng nhập thêm các thông tin chi tiết như tên, địa chỉ,.. và hoàn thành việc đăng kí.

Xử lý này được triển khai trong aggregate ```UserRegistration``` trong bounded context ```Registration```. Người dùng tương tác với instance của aggregate ```UserRegistration``` một vài lần trong quá trình đăng kí. Trạng thái của ```UserRegistration``` được xây dựng từng bước cho đến khi việc đăng kí hoàn thành. Sau khi hoàn thành, người dùng có thể trả phí ví điện tử và thuê xe đạp.

Bây giờ, nếu event sourcing được sử dụng để quản lý trạng thái của aggregate ```UserRegistration```, những event theo sau (chứa trạng thái liên quan tương ứng) được tạo và duy trì theo thời gian:

1. ```MobileNumberProvided```(```MobileNumber```)
2. `VerificationCodeGenerated` (`VerificationCode`)
3. `MobileNumberValidated` (không thêm trạng thái)
4. `UserDetailsProvided` (`FullName`, `Addresss`,...)

Những event này là đầy đủ để tái xây dựng trạng thái hiện tại của aggregate  `UserRegistration` tại bất kì thời điểm nào. Việc thêm event là không cần thiết, đặc biệt không có event nào thể hiện việc đăng kí đã hoàn thành. Thực tế này được biết với aggregate ```UserRegistration``` domain logic nội bộ của nó ngay khi event `UserDetailsProvided` được xử lý. Theo đó, một instance của một `UserRegistration` có thể trả lời tại bất kì thời điểm nào liệu việc đăng kí đã hoàn thành hay chưa.

Ngoài ra, mỗi event chỉ chứa trạng thái cái mà cần thiết để có thể tái xây dựng trạng thái của aggregate trong khi chạy lại. Thông thường đây chỉ là các trạng thái bị ảnh hưởng bởi việc triệu gọi event. Từ cách tiếp cận của event sourcing, sẽ không có ý nghĩa để lưu thêm trạng thái trên event mà không bị ảnh hưởng của việc triệu gọi. Như vậy, nếu event `UserRegistration` đã được duy trì, nó sẽ không chứa thêm bất kì trạng thái nào.

Aggregate `UserRegistration` cũng có thể publish tới các phần khác bên trong hoặc bên ngoài bounded context và do đó có thể kích hoạt thêm domain logic hoặc cập nhật một số trạng thái khác. Trong ví dụ của chúng ta, đó là 2 bounded context `Accounting` (cho việc khởi tạo ví điện tử) và `Rental` (dành cho việc tạo người dùng đã đăng kí).


# Thảo luận
Trong bài viết, tác giả đã giải thích sự khác nhau giữ Domain events và Event sourcing, những yêu điểm của event sourcing. Đồng thời làm rõ khi nào sử dụng chúng.
Hy vọng sẽ mang lại cho các bạn một số điểm hữu ích.

**Bài viết được lược dịch từ nguồn:**

https://www.innoq.com/en/blog/domain-events-versus-event-sourcing/