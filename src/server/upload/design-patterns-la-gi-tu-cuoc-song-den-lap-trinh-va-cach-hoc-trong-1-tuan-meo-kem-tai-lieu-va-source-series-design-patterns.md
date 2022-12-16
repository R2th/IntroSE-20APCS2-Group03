Design patterns là gì? Design patterns chính là một gã khổng lồ, nếu bạn đứng được trên vai thì bạn sẽ nhìn xa hơn. Làm sao bạn đứng được trên vai hãy theo cách của bài viết này, từ CUỘC SỐNG đến PHẦN MỀM.

## Đọc ở đây nếu bạn là người không có nhiều thời gian

Nếu bạn là một người không có thời gian hoặc bạn muốn nhanh chóng tự suy nghĩ không cần đến các giới thiệu khác vui lòng truy cập [Cách học Design patterns trong 1 tuần với 23 patterns](https://youtu.be/l84-JRQ95V4).

Nếu bạn là người thích đọc tài liệu hơn video thì có lẽ bài viết này sẽ không làm bạn phải hụt hẫng và không cần thiết phải đi tìm hiểu một nơi khác.

Nếu bạn muốn những tài liệu liên quan đến cách học **Design patterns** vui lòng kéo xuống phần cuối nhận documents và những tài nguyên nên học. Nhớ kéo xuống

## Series học Design patterns
Tôi có thể khẳng định luôn 1 câu vì các bạn sẽ đặt câu hỏi "Design patterns nó cần thiết trong lập trình hay không ? " là CÓ. **Series Design Patterns** sẽ đúc kết những mẹo học từ thực tế đến các code trong dự án của mỗi cá nhân. 

1 - [DESIGN PATTERNS | Bạn có dám chắc trả lời được 5 Câu hỏi này không? | Hướng dẫn cách học 23 patterns](https://youtu.be/l84-JRQ95V4) Bạn đang ở đây.
2 - ...

## Giới thiệu về Design patterns

Trước tiên chúng ta có thể hiểu mỗi ngôn ngữ lập trình đều có những sai sót vốn có của nó nên những lập trình viên phải tìm kiếm và đúc kết ra một giải pháp chung. Do vậy, nhiều kỹ sư phần mềm đã sáng tạo ra những thiết kế chung cho mỗi dự án và tình huống. 

Và nhóm lập trình đầu tiên đưa ý tưởng về các **Design Patterns** vào phương pháp kỹ thuật phần mềm là bốn lập trình nổi tiếng là **Gang of Four (gọi tắt là GoF , đó là Erich Gamma, Richard Helm, Ralph Johnson và John Vlissides )** vào năm 1991-1992 . Các kỹ sư, họ đã tổng kết và công bố 23 Design Patterns thường được sử dụng trong phát triển phần mềm vào năm 1994 , nhằm mục đích sử dụng các mẫu để thống nhất khoảng cách giữa phân tích, thiết kế và thực hiện các phương pháp hướng đối tượng.

Kể từ năm 1995 , các Design Patterns đã được chấp nhận trong việc phát triển các API hoặc các framework lớn (như JDK , .net Framework , v.v.), các framework tương đối nhẹ nhàng (như Struts , Spring , Hibernate , JUnit , v.v.)

Trong số 23 Design Patterns  được giới thiệu trong GoF , có 5 Design Patterns sáng tạo (Creational Pattern), 7 Design Patterns cấu trúc (Structural Pattern) và 11 mẫu hành vi (Behavioral Pattern).

##  Tôi không học các Design Patterns có được không?
Đó là quyền của bạn, là tương lai của bạn. Chỉ có bạn quyết định được. NHƯNG để trả lời cho câu hỏi này thì tôi sẽ đi từ phủ định của câu hỏi, có nghĩa là tôi sẽ đưa ra những điều hữu ích khi bạn học chúng.

-  Các mẫu thiết kế này đến từ kinh nghiệm và trí tuệ của nhiều chuyên gia lập trình. 

Họ đã đúc kết tất cả các tình huống và các dự án, nhằm giúp chúng ta có thể dựa vào đó để đi xa hơn, nhanh hơn và ở đâu bạn cũng tiếp cận được. Chúng là những phương án thiết kế thành công có thể đạt được khả năng bảo trì và tái sử dụng từ nhiều hệ thống phần mềm xuất sắc. Sử dụng những **Patterns** này sẽ cho phép tôi và bạn tránh một số lần lặp lại khi triển khai code.

 -  **Design Patterns**  cung cấp một tập hợp các từ chuyên môn trong lập trình. 

Bạn đã bao giờ nghe về [Pluck javascript](https://anonystick.com/blog-developer/pluck-javascript-array-2019121866886771) chưa? Nó là một thuật ngữ để trao đổi trong lập trình. Cũng giống như vậy trong Design Patterns có những biểu mẫu chung để tạo điều kiện giao tiếp và trao đổi giữa các nhà phát triển, làm cho đề án thiết kế dễ hiểu hơn. Có nghĩa nói một phát là biết ý đồ ngay!

-  Sử dụng hợp lý các mẫu thiết kế và tài liệu hướng dẫn sử dụng các mẫu thiết kế sẽ giúp những người khác hiểu hệ thống nhanh hơn. 

Nếu một ngày nào đó ai đó tiếp quản dự án của bạn vì lý do thăng chức hoặc nhảy việc và các lý do khác, miễn là anh ta cũng hiểu các mẫu thiết kế, tôi nghĩ anh ta sẽ có thể nhanh chóng hiểu ý tưởng thiết kế và kế hoạch thực hiện của bạn, để bạn có thể thăng tiến không lo thay đổi công việc dễ dàng, vậy tại sao không làm?

-  Điểm cuối cùng rất quan trọng đối với người mới bắt đầu. 

Học các mẫu thiết kế sẽ giúp người mới bắt đầu hiểu sâu hơn về tư duy hướng đối tượng, và cho bạn biết: Làm thế nào để code trong nhiều lớp khác nhau? Tại sao có một "giao diện"? Lập trình trừu tượng là gì? Khi nào thì không nên sử dụng kế thừa một class? Nếu bạn không sửa đổi mã nguồn để thêm các chức năng mới?

## Phần quan trọng - Mã nguồn - cách học - tài liệu nên đọc

- Về sách thì các bạn nên đọc:

  - JavaScript: The Definitive Guide_ by David Flanagan
  - Eloquent JavaScript_ by Marijn Haverbeke
  - JavaScript Patterns_ by Stoyan Stefanov
  - Writing Maintainable JavaScript_ by Nicholas Zakas
  - JavaScript: The Good Parts_ by Douglas Crockford

- Về cách học thì bạn theo dõi bảng thiết kế mà tôi đã tạo dựa vào GoF.

<img src="https://res.cloudinary.com/anonystick/image/upload/v1661912922/javascript/design-patterns.png" alt="Cách học design patterns">

- Về source thì bạn truy cập vào link dưới đây + kèm theo sách limited của GoF, tôi chia sẻ luôn. 

Link books + Design Pattern Tips: [Books + tips](https://bit.ly/3wHQ2tv)