Xin chào các bạn, chắc hẳn không ít thì nhiều các bạn cũng đã nghe qua các cụm từ như nguyên tắc SOLID, SOLID Principles, rất nhiều các bài viết liên quan đến chủ đề trên. Tuy nhiên SOLID Principles chỉ là một trong rất nhiều các nguyên tắc khác trong phát triển phần mềm, trong bài viết này chúng ta sẽ cùng tìm hiểu thêm về một số nguyên tắc khác nhé :D. 

Trong lập trình và thiết kế phần mềm, **Nguyên tắc thiết kế (Design Principles)** là một tập những quy tắc, quy chuẩn để giúp bạn có thể xây dựng và thiết kế hệ thống một cách tốt nhất, dễ dàng phát triển, bảo trì và vận hành tốt. Giữa Design Principles và Design Patterns (Mẫu thiết kế) có những điểm khác nhau như Design Principles là các nguyên tắc, nguyên lý trong thiết kế, còn Design Patterns là các khuôn mẫu thiết kế. Có thể hiểu đơn giản như sau Design Principles sẽ đưa ra cho bạn những gợi ý để giải quyết một vấn đề, còn Design Patterns sẽ đưa ra cho bạn chi tiết cách để giải quyết vấn đề đó.

### Một số Design Principles

### 1 DRY
DRY Principle được định nghĩa như sau 
> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

Mình tạm dịch là: Mỗi phần kiến thức phải có một đại diện duy nhất, rõ ràng, có thẩm quyền trong một hệ thống. Nhưng bạn có tự hỏi "Mỗi phần kiến thức" hay "Every piece of knowledge" ở đây là gì?.  

Mình có một ví dụ như sau: bạn cần gửi đồ cho một người khác, bạn sẽ cần xử lý công việc mỗi khi gửi đồ rất nhiều lần, ở nhiều nơi, ví dụ bạn gửi cho 10 người thì sẽ sẽ phải xử lý logic cho công việc gửi là 10 lần. Rồi khi có yêu cầu thay đổi xử lý khi gửi đồ đi, thì bạn sẽ phải mất thời gian để thay đổi logic gửi đồ đó 10 lần. Có một giải pháp đó là đặt công việc xử lý việc gửi đồ ở một nơi "Every piece of knowledge must have a single, unambiguous", và sau đó sử dụng lại đại diện của nó ở bất kì chỗ nào, giống như việc bạn định nghĩa riêng một class cho việc xử lý logic và gọi các instance của class đó ở những vị trí cần thiết vậy.

Tóm tắt:
- Lặp lại logic, tri thức (knowledge) chắc chắn sẽ vi phạm DRY.
- Lặp lại code không có nghĩa là vi phạm DRY.
:P

### 2 KISS
KISS là viết tắt của cụm từ **Keep It Simple, Stupid**. Mình tạm dịch là: Giữ nó đơn giản đi, đồ ngốc :D KISS nghĩ là hãy làm cho mọi thứ (source code) trở nên đơn giản, nguyên tắc này đề cao tính đơn giản trong việc giải quyết vấn đề. Mình có thể ví dụ như sau: trong một chức năng của bạn phải giải quyết nhiều bài toán con, thay vì bạn viết hết tất cả các cách giải quyết từng bài toán con trong một hàm thì bạn nên chia thành các hàm nhỏ để giải quyết từng bài toán con đó, đừng nên để một hàm giải quyết hàng trăm dòng lệnh. Việc chia thành các hàm nhỏ để giải quyết từng bài toán con giúp bạn và những người khác có thể dễ dàng nhìn ra được để chức năng đó hoạt động thì phải thực hiện những công việc nào. 

Lợi ích của việc áp dụng KISS đó là: giúp bạn cải thiện khả năng giải quyết nhiều vấn đề hơn với tốt độ nhanh hơn, có thể giúp xây dựng những hệ thống lớn nhưng không quá khó hiểu, và có thể giúp bạn giải tỏa tâm lý ức chế khi xây dựng chức năng phức tạp :D đồng thời cũng giúp những người khác dễ dàng đọc được flow trong source code của bạn :P.

### 3 YAGNI
YAGNI là viết tắt của cụm từ **You aren't gonna need it** nghĩa là bạn sẽ không bao giờ nên code các chức năng mà sau này bạn mới cần. Việc đó rất tốn thời gian vì bạn sẽ phải suy nghĩ những thay đổi của hệ thống để thực hiện chức năng đó, thay đổi database, không chỉ vậy, source code của bạn còn trở nên phức tạp một cách không cần thiết. Bạn có thể xem đây là một ứng dụng của thể của nguyên tắc KISS phía trên.

Nếu bạn vi phạm nguyên tắc YAGNI, thì có khả năng sẽ xảy ra các vấn đề sau:

![](https://images.viblo.asia/6496cb05-a858-47cc-9fe0-d6be22b72f30.png)

- Cost of building: bạn thực hiện các chức năng mà cuối cùng không cần đến nó. Điều này sẽ khiến bạn tốn công sức trong việc thiết kế, code, test,..
- Cost of repair: khi chức năng bạn dự định phát triển là cần thiết, nhưng lại cài đặt một cách không hợp lý, có thể là do xung đột với các chức năng hiện đang có, điều này sẽ khiến bạn tốn công sức để lên lại kế hoạch, cài đặt lại, test lại các chức năng cũ, đây là những điều thực sự không cần thiết.
- Cost of delay: bạn sẽ mất thời gian vào việc suy nghĩ các chức năng mình dự định phát triển mặc dù chưa cần thiết vào thời điểm hiện tại, việc này kéo theo sự chậm trễ cho các chức năng đang được phát triển.
- Cost of carry: khi bạn thêm những chức năng chưa cần thiết thì bạn sẽ tốn công sức cho việc bảo trì, chỉnh sửa cả code mới lẫn code cũ của bạn.

### 4 Boy Scout Rule
Boy Scout Rule là một nguyên lý có nội dung dựa trên quy tắc có thật của hội hướng đạo sinh Mỹ (Boy Scouts of America). Quy tắc đó có nội dung là "Leave the campground cleaner than you found it", tức hãy giữ cho khu cắm trại sạch sẽ hơn lúc bạn đến. Nếu bạn áp dụng quy tắc này cho code thì sẽ là: "Luôn làm cho code sạch sẽ hơn khi bạn mở chúng ra". Chúng ta nên cố gắng cải thiện một dòng module bất kể tác giả là ai, ví dụ như những dòng code thừa, không sử dụng chúng ta có thể loại bỏ đi. Nếu bạn tuân theo nguyên tắc này, bạn sẽ thấy hệ thống ngày một tốt lên, bạn sẽ quan tâm đến phần mã của người khác, cũng như họ quan tâm đến phần mã của bạn vậy. 

Quan tâm đến code của bạn là một việc, quan tâm tới code của cả team là một việc khác. Team giúp lẫn nhau và cùng nhau dọn dẹp. Chúng ta tuân theo BSR bởi nó tốt cho tất cả mọi người .

### Tổng kết
Trên đây là một vài Design Principles mình thấy có thể áp dụng nhiều và dễ dàng, hy vọng những tìm hiểu và chia sẻ của mình sẽ giúp ích cho các bạn :D. Xin chào và hẹn gặp lại các bạn vào bài viết sau xD.
### Tài liệu tham khảo.
- https://en.wikipedia.org/wiki/Principle_of_least_privilege
- https://en.wikipedia.org/wiki/Don't_repeat_yourself
- https://en.wikipedia.org/wiki/KISS_principle
- https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it