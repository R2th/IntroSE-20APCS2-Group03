# Desing Pattern

## 1. Giới thiệu
Xin chào các bạn, sắp tới mình sẽ làm môt series về design pattern để chia sẻ cũng như cùng mọi người thảo luận về nội dung này. Ở bài viết này mình sẽ giới thiệu đến các bạn sơ lượt về design pattern, những nội dung cơ bản và tổng quát nhất, để mọi người có cái nhìn tổng quan về design pattern. Sau khi có những khái niệm cơ bản về design pattern thì mình sẽ đi sâu vào từng design pattern.  những cái nhìn chi tiết nhất để có hiểu được và sử dụng một thuần thục mỗi phương pháp design mà mình chia sẻ. Và mình cũng rất mong nhận được những ý đóng góp cho nội dụng của mình, để những bài sau mình có thể làm tốt hơn và mang đến cho các bạn những nội dung đầy đủ nhất và dễ hiểu nhất.

Định nghĩa: design pattern (mẫu thiết kế) là một kĩ thuật trong lập trình hướng đối tượng. Nó cung cấp các mẫu thiết kết, giải pháp để giải quyết các vấn đề thường gặp trong lập trình. Các vấn đề mà nếu bạn ngồi nghĩ cách giải quyết sẽ mất nhiều thời gian mà không tối ưu. Thì design pattern sẽ giúp bạn giải quyết vấn đề này một cách tối ưu nhất, cung cấp cho bạn các giải pháp trong lập trình OOP. Desing pattern được sử dụng thường xuyên trong các ngôn ngữ OOP.

Sẽ có nhiều bạn hiểu nhầm design pattern là một ngôn ngữ lập trình cụ thể! :D. Desing pattern không phải là một ngôn ngữ lập trình nhé. Nó là một giải pháp được xây dựng sẵn để xử lý cho một vấn đề cụ thể và được áp dụng cho tất cả các ngôn ngữ lập trình như C++, Java, C#, ... .

**"Mỗi pattern mô tả một vấn đề xảy ra lặp đi lặp lại, và trình bày trọng tâm của giải pháp cho vấn đề đó, theo cách mà bạn có thể dùng đi dùng lại hàng triệu lần mà không cần phải suy nghĩ"** 

-- Christopher Alexander --

## 2. Tại sao - Khi nào cần sử dụng design pattern
**Desing pattern có những ưu điểm vô cùng quan trọng với một lập trình viên, cụ thể như sau:**

+ Nó giúp bạn tái sử dụng và dễ dàng mở rộng source code của mình.

+ Trong một dự án mà các thành viên đều sử dụng design pattern, thì việc đọc hiểu code cũng như giao tiếp giữa các thành viên trở nên dễ dàng hơn rất nhiều, không những thế việc sử dụng design pattern trong dự án sẽ giúp cho việc tối ưu code và tổ chức code một cách khoa học sẽ dễ dàng hơn rất nhiều. 

+ Sử dụng design pattern sẽ giúp bạn giải quyết các vấn đề của lập trình một các đơn giản, dễ dàng và chuyên nghiệp hơn.


**Khi nào cần sử dụng design pattern:**
   - Khi bạn cần xử lý một vấn đề cũng như là xây dựng những dự án từ nhỏ đến lớn theo một cách tối ưu thì đều nên áp dụng design pattern, bởi lẽ nó giống như một công cụ vô cùng tiện dụng trong lập trình nếu chúng ta nắm giữ được nó.

   Tuy nhiên cũng có những điểm cần chú ý: 
   + Đầu tiên, design pattern là một  khi muốn sử dụng design pattern thì việc hiểu rõ về design pattern là một vô cùng quan trọng. Do đó luyện tập để sử dụng và hiểu rõ các design pattern là một việc không thể thiếu.
   + Việc sử dụng design pattern là vô cùng thuật tiện, tuy nhiên nếu sử dụng không đúng cách hay việc lạm dụng design pattern sẽ dàng xảy ra những tác dụng không mong muốn thậm trí có tác dụng ngược lại: làm code rối, không khoa học, xử lý vấn đề trở nên phức tạp hơn, ...

## 3. Phân loại

   Năm 1994, bốn tác giả Erich Gamma, Richard Helm, Ralph Johnson và John Vlissides đã cho xuất bản một cuốn sách với tiêu đề Design Patterns – Elements of Reusable Object-Oriented Software, đây là khởi nguồn của khái niệm design pattern trong lập trình phần mềm.

   Hệ thống các mẫu Design pattern hiện có 23 mẫu được định nghĩa trong cuốn “Design patterns Elements of Reusable Object Oriented Software” và được chia thành 3 nhóm:

   **Creational Pattern (nhóm khởi tạo – 5 mẫu) gồm:** 
   
   ![](https://images.viblo.asia/07c0d513-47d3-4bd7-a967-97d22161bd69.png)

   + Factory Method
   + Abstract Factory
   + Builder
   + Prototype
   + Singleton
   
   -> Những Design pattern loại này cung cấp một giải pháp để tạo ra các object và che giấu được logic của việc tạo ra nó, thay vì tạo ra object một cách trực tiếp bằng cách sử dụng method new. Điều này giúp cho chương trình trở nên mềm dẻo hơn trong việc quyết định object nào cần được tạo ra trong những tình huống được đưa ra.

   **Structural Pattern (nhóm cấu trúc – 7 mẫu) gồm:**
   
   ![](https://images.viblo.asia/45e9f4c6-ff4f-4b6d-a399-ba87d5cad4bc.png)

   + Adapter
   + Bridge
   + Composite
   + Decorator
   + Facade
   + Flyweight
   + Proxy

   -> Những Design pattern loại này liên quan tới class và các thành phần của object. Nó dùng để thiết lập, định nghĩa quan hệ giữa các đối tượng.


   **Behavioral Pattern (nhóm tương tác/ hành vi – 11 mẫu) gồm:**
   
   ![](https://images.viblo.asia/e0b51aae-e5e4-444b-8f24-116d54869da7.png)
   
   + Interpreter
   + Template Method
   + Chain of Responsibility
   + Command
   + Iterator
   + Mediator
   + Memento
   + Observer
   + State
   + Strategy
   + Visitor
   
   -> Nhóm này dùng trong thực hiện các hành vi của đối tượng, sự giao tiếp giữa các object với nhau.


   **Mối quan hệ giữa 23 design patterncơ bản:**
   ![](https://images.viblo.asia/7a8c2896-7de8-424b-8007-1e8932c38cc8.png)

   # Hình ảnh

## 4. Lời kết
   - Để học tốt design pattern bạn cầm nắm vững các kiến thức của OOP, đặc biệt là 4 đặc tính: Đa hình, Kế thừa, Trừa tượng, Đóng gói.
   - Không học design pattern có được không? - Được, kể cả khi bạn không tìm hiểu design pattern bạn vẫn có thể đọc hiểu code và giao tiếp với những thành viên khác. Nhưng nó sẽ khó khăn và mất thời gian hơn rất nhiều. 
   - Một câu hỏi đặt ra là không học cách sử dung design pattern có trở thành một lập trình viên giỏi được không? Câu trả lời sẽ có có và không phải cứ biết design pattern là sẽ trở thành một lập trình viên giỏi, bởi lẽ công việc lập trình là vô vàn kiến thức và nếu lập là một lập trình viên giỏi bạn vẫn sẽ làm được những điều mà design pattern giúp đỡ bạn. Tuy nhiên đây giống như một công cụ vô cùng quan trọng với mỗi lập trình viên, và là một kiến thức mà hầu hết các lập trình viên đều mong muốn sử dụng thành thạo. Vì vậy mình nghĩ không có lý do gì để bạn từ chối một món quà như vậy.

   Ở đây mình muốn giới thiệu đến các bạn cuốn: "**Design patterns Elements of Reusable Object Oriented Software**" của 4 tác giả **Erich Gamma**, **Richard Helm**, **Ralph Johnson** và **John Vlissides** hay còn được biết đến với tên "**Gang of Four**” (**GoF**).