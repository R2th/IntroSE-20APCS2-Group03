# Design pattern là gì?
- Trong công nghệ phần mềm, một mẫu thiết kế `design pattern`  là một giải pháp tổng thể cho các vấn đề chung trong thiết kế phần mềm. Một mẫu thiết kế không phải là một thiết kế hoàn thiện để mà có thể được chuyển đổi trực tiếp thành mã; nó chỉ là một mô tả hay là sườn (template) mô tả cách giải quyết một vấn đề mà có thể được dùng trong nhiều tình huống khác nhau. Các mẫu thiết kế hướng đối tượng thường cho thấy mối quan hệ và sự tương tác giữa các lớp hay các đối tượng, mà không cần chỉ rõ các lớp hay đối tượng của từng ứng dụng cụ thể. Các giải thuật không được xem là các mẫu thiết kế, vì chúng giải quyết các vấn đề về tính toán hơn là các vấn đề về thiết kế.

- Design pattern có thể giúp thiết kế của chúng ta linh hoạt, dễ dàng thay đổi và bảo trì hơn.
# Tại sao cần học design pattern
## Việc phát triển phần mềm trở nên dễ dàng hơn

- Có một điều bất biến trong phát triển phần mềm, đó là sự thay đổi. Các thay đổi này xảy ra khi requirements thay đổi, hệ thống phình to, các tính năng mới được thêm vào;  khi performance cần được tối ưu. 

- Câu hỏi được đặt ra là? Làm thế nào để xây dựng phần mềm mà ảnh hưởng của những thay đổi này là nhỏ nhất. Suy cho cùng, điểm khó khăn nhất trong phát triển phần mềm là hiểu code đã có (có thể được viết bởi người khác) và thay đổi code cũ mà không phát sinh các lỗi mới hoặc các bugs ko mong muốn.

- Vậy câu trả lời là gì? Không có một kĩ thuật thần kì nào, nhưng sẽ có một số nguyên lý mà bạn có thể sử dụng để giúp thiết kế hướng đối tượng dễ dàng thay đổi. Các kĩ thuật này đã được phát triển thông qua  kinh nghiệm của các chuyên gia, và đã được tập hợp thành một danh mục. Các thiết kế này được gọi là `design pattern`. Chúng cung cấp các mẫu thiết kế có thể áp dụng vào thiết kế của bạn và giải quyết các vấn đề chung. Chúng không phải thư viện hay module. Chúng là những guidelines để bạn tích hợp vào core của thiết kế để tạo nên các hệ thống hướng đối tượng  linh hoạt và dễ bảo trì.

## Cải thiện các kĩ năng lập trình hướng đối tượng

- Chúng ta được dạy rằng nền tảng của lập trình hướng đối tượng là tính trìu tượng, tính kế thừa, tính đa hình và tính đóng gói.  Nhưng thiết kế các hệ thống hướng đối tượng không dừng lại ở đây. Thực thế,  việc ứng dụng thường xuyên các nguyên lý cơ bản này có thể nhanh chóng dẫn tới các vấn đề như lặp code, thiết kế không chặt chẽ và nhiều nguy cơ tiềm ẩn trong một số class mà bạn sử dụng.

- Học nền tảng cơ bản của `design pattern` bạn sẽ tìm thấy tập hợp các nguyên tắc thiết kế khác vượt qua cơ sở của hướng đối tượng. Những nguyên lý thiết kế này có thể áp dụng khi bạn tạo lớp (classes) hoặc đối tượng (object). Biết được những nguyên lý bổ sung này và hiểu cách chúng kết hợp vào các mẫu thiết kế (design pattern), bạn sẽ  kiến trúc và thiết kế hướng đối tượng tốt hơn.

## Nhận ra các mẫu (pattern) trong các thư viện và ngôn ngữ
Design pattern là các giải pháp chung để giải quyết các vấn đề chung của thiết kế hướng đối tượng. Đó cũng là các giải pháp cho các vấn đề trong thiết kế của bạn. Bạn không download hoặc cài đặt một `design pattern module` để thêm vào thế kế mà là bạn thực thi một design pattern trong hệ thống.  Ban thường xuyên bắt gặp các mẫu thiết kế trong thư viện, packages, và module mà bạn sử dụng.  Lấy một ví dụ như thư viện file I/O của Java. Java sử dụng `decorator pattern` cho phép bạn lấy được đối tượng file I/O chính, và sau đó thay đổi phù hợp tùy theo nhu cầu của bạn. Đây là một cách tuyệt vời để tiếp cận một thiết kế hệ thống file I/O. Nếu bạn đã quen thuộc với design pattern bạn sẽ ngay lập tức hiểu được cách mà các thiết kế đối tượng tương tác lẫn nhau và cách chúng hoạt động . 
## Tìm kiếm sự thật và cái đẹp
Trong khi dành nhiều công sức học để tạo và xây dựng các hệ thống hướng đối tượng trong dự án. Bạn có thể thu được lợi ích từ sự khôn ngoan đến từ việc nghiên cứu và sử dụng `design pattern`.  Như đã đề cập, design pattern không tự nghĩ ra hay phát mình mà chúng xuất hiện từ cái nhìn sâu sắc thông qua chăm chỉ và trải nghiệm từ việc build nhiều hệ thống. Khi học design pattern, bạn có thể cảm thấy giống như nhìn qua vai của một kiến trúc sư đầy kinh nghiệm, hướng tới việc xây dựng phầm mềm tốt hơn và dễ bảo trì hơn.

# Cần gì để học design patterns.
- Điều đầu tiên mình muốn nói là design pattern không dành cho nhưng bạn mới bắt đầu tìm hiểu về lập trình.

- Muốn tìm hiểu và học được design pattern thì bạn phải nắm chắc được kiến thức OOP đặc biệt là về abstract class, interface và static.

# Các loại design patterns.
- Về cơ bản thì design pattern sẽ được chia làm 3 dạng chính và mỗi dạng chính và có tổng cộng 32 mẫu design:

## Creational Pattern ( nhóm khởi tạo): 
Nhóm này sẽ giúp bạn rất nhiều trong việc khởi tạo đối tượng, mà bạn khó có thể nhận ra (nó sẽ không dùng từ khóa new như bình thường). Nhóm này gồm 9 mẫu design là:
- Abstract Factory.
- Builder.
- Factory Method.
- Multiton.
- Pool.
- Prototype.
- Simple Factory.
- Singleton.
- Static Factory.
## Structural (nhóm cấu trúc): 
Nhóm này sẽ giúp chúng ta thiết lập, định nghĩa quan hệ giữa các đối tượng. Nhóm này gồm có 11 mẫu design là:
- Adapter/ Wrapper.
- Bridge.
- Composite.
- Data Mapper.
- Decorator.
- Dependency Injection.
- Facade.
- Fluent Interface.
- Flyweight.
- Registry.
- Proxy
## Behavioral patterns (nhóm ứng xử): 
Nhóm này sẽ tập trung thực hiện các hành vi của đối tượng. Gồm 12 mẫu design là:
- Chain Of Responsibilities.
- Command.
- Iterator.
- Mediator.
- Memento.
- Null Object.
- Observer.
- Specification.
- State.
- Strategy.
- Template Method.
- Visitor.
Ngoài ra thì trong thời gian gần đây đã xuất hiện thêm 4 mẫu design nữa đó là:

- Delegation.
- Service Locator.
- Repository.
- Entity-Attribute-Value (EAV).

# Tham khảo
- https://en.wikipedia.org/wiki/Software_design_pattern
- https://www.oreilly.com/ideas/5-reasons-to-finally-learn-design-patterns
- https://toidicodedao.com/2016/03/01/nhap-mon-design-pattern-phong-cach-kiem-hiep/
- https://toidicode.com/designe-patterns-la-gi-130.html