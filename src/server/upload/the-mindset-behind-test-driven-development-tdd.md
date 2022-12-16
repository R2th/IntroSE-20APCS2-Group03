TDD - Test Data Driven không phải là một khái niệm mới trong phát triển phần mềm. Tuy nhiên, nhiều kỹ sư phần mềm vẫn còn cảm thấy lạ lẫm. Trong bài viết ngắn gọn này, tôi sẽ cố gắng làm rõ các khái niệm TDD và các bạn cùng tôi bắt đầu TDD từ hôm nay.

**What is TDD?**
TDD không phải là testing process, nó là design process. Nó là một cách thiết kế các component trong phần mềm tương tác với nhau, để đảm bảo hành vi của các component riêng lẻ được chỉ định thông qua các unit test.

Có 3 luật của TDD:
1. Viết một failing unit test cho một feature
2. Viết code để đảm bảo pass đc failing unit test trên, không cần quan tâm chất lượng code ở giai đoạn này.
3. Tái cấu trúc code của bạn nếu có thể

![](https://images.viblo.asia/c0075175-3506-4f59-b631-44e22f9544c9.png)

Đó là cách tiếp cận "phá vỡ trước, xây dựng sau"

**Why TDD?**
Trong TDD, chỉ viết một vài dòng code ngắn để pass được failing unit test. Vì vậy, chu kỳ phát triển phần mềm rất rất ngắn, giúp cho việc debug cực kì đơn giản. Làm sao để dễ dàng debug nếu chúng ta có thể biết code của chúng ta đã ổn sau vài giây?

![](https://images.viblo.asia/e0810b55-59f6-47e7-b6c7-0db8f19ffe78.png)

Developers thường thích học một software bằng cách đọc code. Thậm chí khi chúng ta làm việc với một thư viện thứ 3, chúng ta có xu hướng di chuyển trực tiếp đến những ví dụ code. Unit test giúp cho các developer khác dễ dàng hiểu được tính năng của bạn nên hoạt động như thế nào.

![](https://images.viblo.asia/536d7d09-f6b6-47b1-b2e3-4a02989f5790.jpg)

Viết test sau khi viết code là khó. Vì mã có thể được viết mà không có khả năng kiểm tra, nó có thể không thể kiểm tra được hoặc được tách dời, mô đun hóa. Vì vậy chúng ta cần phải thay đổi lại code để có thể test được.

Viết test sau khi viết code không tốt, vì chúng ta đã biết code đã work. Viết test trước khi viết code có thể thú vị, vì test tại thời điểm fail đầu tiên và sau đó chúng ta viết code để nó pass.

Khi chúng ta viết test sau khi viết code, nó để lại những lỗ hổng trong test suite, vì chúng ta rất có khả năng bỏ lỡ một số trường hợp. Khi chúng ta run một test suite đầy lỗ hổng, pass tất cả các test nghĩa là không có gì cả.

Một trong những lí do chính để thực hiện TDD là refactoring code. Hầu hết thời gian chúng ta tránh fix bad code trong project vì nó có thể phá vỡ hệ thống. Với TDD, chúng ta có thể dũng cảm tái cấu trúc.

**Vượt qua những thách thức trong TDD**
Giống hầu hết những thứ trong cuộc sống, TDD nói dễ hơn làm. Có nhiều thử trách trên con đường của chúng ta. Tuy nhiên, điều tốt là chúng có thể vượt qua

**TDD có vẻ phản trực giác, Làm thế nào để biết những gì cần kiểm tra trước khi viết code**
Nếu bạn nghĩ, có lẽ bạn muốn đi thẳng vào code khi bạn gặp vấn đề. Thật không may đó không phải là phương pháp đúng đắn. Bạn nên bắt đầu giải quyết một vấn đề bằng một số loại thiết kế trên giấy hoặc trong đầu bạn. 

**Phí thời gian**
![](https://images.viblo.asia/30f8f2b2-4cfe-45eb-bd20-d447715b2727.jpg)

Đúng là TDD làm cho việc phát triển code version đầu tiên là một quá trình dài, nhưng không lãng phí. Hơn nữa, nếu bạn xem xét thời gian để debug, refactor và hiểu code thì lượng thời gian bạn tiết kiệm được trong TDD là không thể tin được. Hãy nhớ rằng, không có gì tốt khi lái xe nhanh sai hướng.

**Không có ý tưởng**
Điều đó hoàn toàn bình thường. Bạn có thể chưa quen hoặc bạn cần một số hướng dẫn. Hãy tìm ai đó xung quanh bạn có kiến thức và kinh nghiệm với TDD để họ giúp bạn

**Bạn không biết những gì tôi đang trải qua**
Bất kể bạn đang làm việc với dự án hay công nghệ nào, có một cách để làm TDD trong hầu hết các trường hợp. TDD có thể không áp dụng nếu bạn viết code đơn giản như getters/setters hoặc không có business logic. Ý tưởng là để kiểm tra mọi thức có thể phá vỡ.

**Ví dụ về TDD**
......

Đó là những gì về TDD tôi muốn chia sẻ với các bạn. Hy vọng sẽ giúp ích cho các bạn. Hãy bắt đầu sử dụng TDD trước khi quá muộn thôi nào!!!!!