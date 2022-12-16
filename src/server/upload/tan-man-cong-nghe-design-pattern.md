Mình dự định sẽ viết tiếp phần 3 của ''Làm ứng dụng học toán đơn giản với React Native - Phần 3" nhưng lại bệnh mất mấy ngày, cộng thêm bận bịu với công việc, vẫn chưa kịp update cái app nhỏ nhỏ xinh xinh được thêm miếng nào. Nên hôm nay sẽ dành thời để đọc lại về design pattern, tóm gọn và vắn tắt chúng để chia sẻ cùng với mọi người. 

**Bắt đầu nào !!!**

## 1) Design pattern

Mình xin định nghĩa 1 cách ngắn gọn theo cách hiểu của mình, design pattern chính là 1 kỹ thuât, nó cho bạn hướng giải quyết, giải pháp để quyết các vấn đề thường gặp trong lập trình. Còn các trang nước ngoài và wiki thì người ta ghi vầy:

> a design pattern is a general repeatable solution to a commonly occurring problem in software design. A design pattern isn't a finished design that can be transformed directly into code. It is a description or template for how to solve a problem that can be used in many different situations.

Đồng đạo: "Ờ... Nghe cũng hay ho đấy,nhưng sao ta phải dùng cái đó đạo hữu?"

Me: "Đạo hữu bình tĩnh, tiếp đây bần đạo sẽ đề cập ngay đây"

## 2) Dùng Design pattern có lợi ích gì

Trong quá trình làm dự án,  có 1 điều chắc chắn luôn xảy ra, đó là sự thay đổi về yêu cầu từ khách hàng. Lúc này đương nhiên dự án của chúng ta sẽ phình to hơn về mọi mặt, thêm chức năng, thêm component, thêm ti tỉ thứ nhưng vẫn phải đảm bảo về mặt performance. ==> Và đây là lúc, Design pattern tỏa sáng , nó cung cấp cho ta những giải pháp đã được tối ưu hóa, đã được kiểm chứng để giải quyết các vấn đề trong software engineering. Nó đóng góp vai trò như 1 kim chỉ nam cho bạn, các giải pháp luôn ở dạng tổng quát, giúp tăng tốc độ phát triển phần mềm bằng cách đưa ra các mô hình test, mô hình phát triển đã qua kiểm nghiệm.

Hơn nữa, dùng lại các design pattern đã được các đồng đạo khác công nhận, cũng giúp ta tránh được các vấn đề tiềm ẩn có thể gây ra những lỗi lớn, dễ dàng nâng cấp, bảo trì về sau.

Giúp cho các lập trình viên có thể hiểu code của người khác 1 cách nhanh chóng, vì người ta có thể biết bạn đang áp dụng theo cách nào khi đọc code. Mọi thành viên trong team có thể dễ dàng trao đổi với nhau để cùng xây dựng dự án mà không mất quá nhiều thời gian.

Đồng đạo: "Ồ. Nghe hay vậy, vậy giờ học nó sao đây?"

Me: "Khoan đã đạo hữu, dục tốc thì bốc :poop:, trước tiên muốn học, phải xem có đủ nội lực không đã."

## 3) Để học Design pattern, bạn cần ...

+ Vì Design Pattern sử dụng nền tảng của lập trình hướng đối tượng nên nó sẽ áp dụng 4 đặc tính của OOP: Kế Thừa , Đa Hình, Trừu Tượng, Bao Đóng. => Bạn phải nắm kỹ 4 khái niệm đó không chỉ về lý thuyết

+ Hiểu và áp dụng các khái niệm đặc biệt là về abstract class,interface và static vì nó rất cần thiết.

+ Tư duy hoàn toàn theo OOP, loại bỏ tư duy theo lối cấu trúc.

Đồng đạo: "Nghe căng nhỉ, dám chắc là nó không dành cho người mới rồi."

Me:"Chắc chắn là vậy rồi đạo hữu"

Đồng đạo: "Nhưng với tại hạ thì miễn cưỡng vẫn có thể tiếp thu được. không biết công pháp này có nhiều lắm không?"

Me:"Cũng không nhiều lắm đâu"

## 4) Phân loại

Về công pháp thì design pattern sẽ được chia ra làm 3 loại lớn, bao gồm:

**Creational Pattern** ( loại khởi tạo): loại này sẽ giúp bạn trong việc khởi tạo đối tượng, gồm 9 mẫu design là:

+ Abstract Factory.

+ Builder.

+ Factory Method.

+ Multiton.

+ Pool.

+ Prototype.

+ Simple Factory.

+ Singleton.

+ Static Factory.

**Structural** (loại cấu trúc): Loại này sẽ giúp chúng ta thiết lập, định nghĩa quan hệ giữa các đối tượng, gồm 11 mẫu design là:

+ Adapter/ Wrapper.

+ Bridge.

+ Composite.

+ Data Mapper.

+ Decorator.

+ Dependency Injection.

+ Facade.

+ Fluent Interface.

+ Flyweight.

+ Registry.

+ Proxy.

**Behavioral patterns** (loại ứng xử): loại này sẽ tập trung thực hiện các hành vi của đối tượng, Gồm 12 mẫu design là:

+ Chain Of Responsibilities.

+ Command.

+ Iterator.

+ Mediator.

+ Memento.

+ Null Object.

+ Observer.

+ Specification.

+ State.

+ Strategy.

+ Template Method.

+ Visitor.

Đồng đạo: "wow, nhiều dữ vậy, chắc ở đâu cũng phải xài nó rồi nhỉ? đa dạng vậy mà"

Me: "Tại hạ không nghĩ vậy đâu, còn phải xem có phù hợp không nữa đã"

## 5) Khi nào nên dùng Design pattern

+ Khi bạn muốn giảm được thời gian và công sức suy nghĩ ra các cách giải quyết cho những vấn đề đã có lời giải => xài design pattern.

+ Khi bạn muốn chương trình chạy uyển chuyển hơn, dễ dàng quản lý tiến trình hoạt động, dễ nâng cấp bảo trì khi dự án phình to => xài design pattern

+ Tuy nhiên, vì design pattern là 1 giải pháp chung nên nó khá là trừu tượng và khó nhằn => không dễ gì mà áp dụng vào 1 dự án đã có sẵn mà bạn không nắm rõ hoặc code và dự án khá phức tạp và nhiều.

## 6) Lời kết
Hy vọng qua bài viết này, mình đã có thể giúp các bạn hiểu hơn về design pattern, về tài liệu để xem thêm về design pattern, mình có đi lượn 1 vài chỗ thì được gợi ý vài cuốn thế này:

Design Patterns: Elements of Reusable Object-Oriented Software.

Head First Design Patterns.

Pattern Hatching: Design Patterns Applied.

Refactoring to Patterns.

Patterns of Enterprise Application Architecture.

Cảm ơn các bạn đã bỏ thời gian để đọc bài viết của mình, hẹn gặp lại các bạn vào bài viết sau