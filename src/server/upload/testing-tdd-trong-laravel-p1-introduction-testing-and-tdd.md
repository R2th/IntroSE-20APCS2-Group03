Xin chào các bạn ! 

Ở bài viết này mình sẽ chia sẻ với các bạn về **Testing** và **TDD** trong Laravel. TDD là gì ? Tại sao sử dụng và những ích lợi mà TDD mang lại cũng như cách ứng dụng TDD vào Laravel Framework.
Mình sẽ giải thích theo cách hiểu của bản thân, hi vọng sẽ giúp ích cho các bạn có cái nhìn tổng thể về Testing và TDD :) 

# Now, Let's start

Như chúng ta đã biết, để đảm bảo chất lượng đầu ra của một ứng dụng hay một sản phẩm thì Testing là một yếu tố rất quan trọng và bắt buộc.

Chúng ta có thể Test ứng dụng bằng nhiều cách khác nhau:  

1. Có thể là lập ra một danh sách tất cả các Test case, xây dựng một ứng dụng có các features, functions dựa trên tất cả các test case đó, sau đó dựa vào danh sách các test case mà chúng ta đã lập ở trên, từng bước test tất cả các tính năng của ứng dụng.
2. Hoặc cũng có thể dựa trên tất cả các requirement, viết test cho các tính năng mà chúng ra sẽ làm, sau đó điều chỉnh lại mã nguồn sao cho phù hợp với những requirement mà chúng ta đã đặt ra ban đầu.

# Warm Up 

Trước khi vào với chủ đề thì mình xin kể cho các bạn một câu chuyện như sau:

Thời còn chân ướt chân ráo bước vào ngành lập trình,  cũng như rất nhiều Beginner Developer khác, khi đó khái **TDD** chưa có trong suy nghĩ của mình. Mình làm một ứng dụng quản lý thư viện, có các chức năng cơ bản **Login**, **Logout**, **Register**. Thêm vào đó **Create**, **Read**, **Update** và **Delete** (**CRUD** Operators) book. Ngoài ra còn có các tính năng **Tìm kiếm** (Search), **Mượn/Trả** (Borrow, Return book) book.

Mình đã làm theo Flow như sau:
1. Thiết kế và tạo DB, đồng thời cũng add một số dữ liệu mẫu vào DB để tiện cho việc Test cho các function mình làm sau này.
2. Code chức năng.
3. Test
4. Sau khi code và test xong một chức năng. Tiếp tục lặp lại 2 bước Code => Test .... chức năng mới. :D

Quá trình khởi tạo dữ liệu mẫu vào DB và testing mình hoàn toàn làm bằng cách thủ công 😄. Sau một thời gian code thì cuối cùng cũng xong, mình rất hài lòng với ứng dụng mà mình đã tự tay tạo ra 😄
Với đầy đủ các requirement mà mình đã lập ra trước đó. 

Một thời gian sau thì mình có ý tưởng nâng cấp ứng dụng của mình lên cho nó hoạt động tốt hơn bằng cách phát triển những tính năng cũ và thêm một số tính năng mới vào ứng dụng của mình.

Việc bảo trì, nâng cấp tính năng cũ thì cũng đồng nghĩa với việc ứng dụng của mình sẽ bị fail các tính năng đó. Xui xẻo hơn thì có thể gây ảnh hưởng đến các tính năng khác 😞 . 

Mặc dù biết là vậy nhưng mình vẫn làm. Và kết quả đúng như mình đã dự đoán trước đó. Mình sửa một tính năng và fail khoảng 2-3 tính năng khác liên quan. Lúc này mình lại cần cù ngồi fix lại đống bug sau đó test lại. 

Đó là cả một quá trình dài, nhàm chán và mình đoán là các bạn đã từng làm điều đó như mình trong quá khứ 😄 .

Mình nhận thấy quá trình này tiêu tốn của mình rất nhiều thời gian. Mà nhiều khi test thủ công còn sai 😞  (Vì mình là con người chứ không phải là cái máy). Sau đó mình đã tìm hiểu một hướng tiếp cận khác.

Sau khi tìm hiểu thì mình nhận ra là **TDD**(một phương thức làm việc) là một hướng tiếp cận có thể giải quyết mọi vấn đề mà mình đang gặp phải, **TDD** giúp bạn tiết kiểm được rất nhiều thời gian. Và một điều quan trọng, nó đảm bảo chất lượng sản phẩm tốt hơn, giúp bạn tránh được các vấn đề trong tương lai.

Đó cũng chính là chủ đề mà mình muốn chia sẻ chi tiết với các bạn ở bài viết này.

# What's TDD ?


> According Wiki: "Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. This is opposed to software development that allows software to be added that is not proven to meet requirements."

Theo cách hiểu của mình thì TDD là một phương pháp tiếp cận cải tiến để phát triển ứng dụng. Trong đó kết hợp phương pháp kiểm thử trước (**Test First Development**) và phương pháp điều chỉnh lại mã nguồn (**Refactoring**) sao cho phù hợp với requirement và tăng performance của ứng dụng . 

Key của TDD là hãy nghĩ về thiết kế của bạn trước khi viết code cho chức năng.

Nghĩa là, ví dụ bạn code chức Create một sản phẩm thì hãy hình dung xem bạn phải làm những bước gì để xây dựng chức năng đó.

Lập trình viên sẽ thực hiện các bước nhỏ và tiến độ được đảm bảo liên tục bằng các bài test tự động. Quá trình cụ thể như sau:
1. Trước khi bạn viết code cho một tính năng, bạn viết test cho tính năng đó trước. Hình dung bạn suy nghĩ ra một tính năng mới và viết nó lên giấy. Đại loại như "Tôi muốn gửi 1 Request POST tới /blog/create để tạo một bài đăng mới", hoặc có thể chi tiết hơn. 
2. Tiếp theo, bạn đã có test, hãy chạy nó. Tất nhiên là nó fail vì bạn chưa viết logic cho hàm test đó 😄.  Sau đó, bạn dần dần triển khai logic cho hàm test đó làm sao để cho test pass. Chỉ cần pass là được, không cần phải tốt nhất. 
3. Sau khi đã pass test thì bạn bắt đầu refactoring. Sau mỗi lần refactoring nên nhớ chạy lại test và đảm bảo nó vẫn pass. Bạn có thể dừng lại khi đã hài lòng với đoạn code đó 😄.


# TDD Process
![](https://images.viblo.asia/b77836d7-a40c-456f-813e-ab8aa031e80c.PNG)


# The Advantages of TDD

Chúng ta đã nói rất nhiều về TDD, quá trình nó hoạt động nhưng vẫn chưa thấy rõ được những ích lợi cụ thể nào của TDD. Chúng ta hãy cùng nhau đi xem xét nhé.

Có thể bạn sẽ cảm thấy lười biếng cho việc ngồi viết test cho một chức năng mà dường như nó đã hoạt động tốt. Nhưng bạn tôi ơi, với TDD, bạn đang viết những dòng code, nhưng dòng logic đầu tiên của chức năng. Nghĩa là hầu hết các code logic của bạn đều được thực hiện trong function Test rồi đó :D. Và chắc chắn là nó sẽ cover tốt hơn, bởi vì bạn thực hiện tính năng dựa trên test. 

Toàn bộ mã nguồn của bạn được bao phủ bởi các function test. Mỗi khi bạn run test, toàn bộ dòng code trong ứng dụng của bạn sẽ được chạy. Còn gì tuyệt vời hơn nào ^^. 

Khi bạn thay đổi một dòng hay một đoạn code ở một nơi nào đó. Và sau đó một số đoạn code khác sẽ fail cũng tại một nơi nào đó mà dường như chúng không liên quan đến nhau. Và bạn lại mất công tìm ra những lỗi đó qua vài giờ/ngày/tuần hoặc vài tháng sau đó :(.  Ngược lại với TDD, tất cả những gì bạn phải làm là chạy loại toàn bộ test sau khi sửa code và mọi bug sẽ hiển thị ngay lập tức. 


# Conclusion

Nhìn chung TDD không thay thế phương pháp kiểm thử truyền thống, thay vào đó nó định nghĩa một cách thức để đảm bảo việc thực hiện các unit test một cách hiệu quả. Hiệu ứng phụ của TDD là các kiểm thử cung cấp một đặc tả hoạt động cho mã nguồn. TDD được đánh giá tin cậy trong thực tế và được nhiều lập trình viên phần mềm quan tâm và lựa chọn.




-----


Bài viết có vẻ khá khô khan, dài dòng. Nhưng đó là trải nghiệm thực tế của mình. Hi vọng bài chia sẻ này sẽ làm thay đổi suy nghĩ hoặc ít nhất cũng giúp bạn trong công việc. Ở P2 mình sẽ chia sẻ về cách implement TDD sử dụng Laravel Framework with PHPUnit Test.

*Happy Coding !!*