Developers Are Not Good Testers. What You Say? Bạn nghĩ sao?

![](https://images.viblo.asia/b448b765-6e79-4d4d-bf90-bde42cfbee6f.jpg)

Đây có thể là một cuộc tranh luận lớn. Developter tự kiểm thử mã code của họ viết ra - thế kết quả đầu ra của kiểm thử sẽ là gì? Tất cả sẽ đều là một câu chuyện kết thúc có hậu! Vâng, câu trả lời là đúng, những developer viết ra mã code sẽ chỉ nhìn thấy các happy paths của sản phẩm của họ thôi và tất nhiên là sẽ không muốn quá đi sâu vào chi tiết.

Mối lo ngại chính khi mà các deverloper kiểm thử là - hiểu sai về các yêu cầu. Nếu các yêu cầu bị hiểu lầm bởi developer thì cho dù developer kiểm thử ứng dụng ở độ sâu nào, anh ta sẽ không bao giờ tìm thấy lỗi. Bởi dev luôn coi đó là tính năng nên bug ở màn hình hay chức năng nào sẽ vẫn luôn ở đó mà thôi.

Các deverloper lạc quan sẽ luôn nói với mọi người trong dự án là - Có, tôi đã viết code cho phần đó và tôi tin rằng nó chạy tốt. Không cần kiểm tra đường dẫn này, không cần kiểm tra đường dẫn đó, vì tôi biết nó hoạt động tốt. Và ngay tại đây các developer đã bỏ qua các lỗi.
.
Nhà phát triển so với Người kiểm tra: Nhà phát triển luôn muốn thấy mã của mình hoạt động đúng. Vì vậy, anh ta sẽ kiểm tra nó để kiểm tra xem nó có hoạt động chính xác không. Nhưng bạn có biết tại sao người kiểm tra sẽ kiểm tra lại ứng dụng? Để làm cho nó ra bug theo rất nhiều cách khác nhau, và người kiểm tra chắc chắn sẽ kiểm tra xem làm thế nào một ứng dụng lại không hoạt động chính xác theo yêu cầu đề ra. Đây chính là sự khác nhau giữa dev và tester.

Các developer so với các tester: Các developer luôn muôn thấy code của mình hoạt động đúng. Vì vậy họ sẽ kiểm thử nó để xem nó có hoạt động đúng hay không một cách qua qua hoặc sơ sài. Nhưng bạn có biết vì sao các kiểm thử viên lại kiểm thử các ứng dụng? Để làm cho nó hoạt động sai theo bất kì cách nào, và người kiểm thử chắc chắn sẽ có các case kiểm thử cho những trường hợp ứng dụng hoạt động không đúng. Đó là điểm khác biệt chính trong cách kiểm thử của developer và tester.

Câu hỏi đặt ra là các developer có nên tự kiểm thử code của họ không?



Cá nhân tôi không ngại các developer tự kiểm thử code của họ. Rốt cuộc, đó là con của họ 😉 Họ biết code của họ rất rõ. Họ biết những cái bẫy trong code của họ là gì. Nơi nào có thể nhiều lỗi, nơi tập trung hơn, đó là con đường quan trọng của ứng dụng. Developer có thể thực hiện unit testing rất tốt và có thể xác định hiệu quả các trường hợp biên.

Hầu hết các developer coi kiểm thử là một công việc đầy nhàm chán, thậm chí họ biết rõ hệ thống, do sơ suất của họ, họ có xu hướng bỏ qua nhiều con đường kiểm thử, vì đó là một trải nghiệm không vui vẻ gì đối với họ. Nếu các developer tìm thấy bất kỳ lỗi nào trong code của họ khi thực hiện unit testing thì việc sửa lỗi tương đối dễ dàng, vì code này mới đối với họ, thay vì nhận lỗi từ người kiểm thử sau hai ba ngày. Nhưng điều này chỉ có thể nếu developer quan tâm đến việc thực hiện nhiều kiểm thử đó.

Người kiểm thử có trách nhiệm đảm bảo rằng mọi path đều được kiểm tra hay không. Người kiểm thử lý tưởng nên coi trọng tất cả các chi tiết nhỏ có thể để xác minh ứng dụng không bị lỗi ở bất cứ đâu.

Các developer có thể sẽ bỏ qua các vấn đề trong code của họ. Vì vậy, nên đưa nó cho người khác để kiểm thử lại.

Mỗi người đều có chuyên môn trong công việc cụ thể của họ. Các developer thường nghĩ làm thế nào để phát triển ứng dụng, mặt khác, những người kiểm thử nghĩ rằng người dùng cuối sẽ sử dụng ứng dụng như thế nào.
![](https://images.viblo.asia/2f07e413-0117-4fff-b1da-f754735da0ff.png)


Kết luận

Vì vậy không có vấn đề gì nếu các developer thực hiện unit testing và kiểm thử cơ bản. Các developer có thể kiểm thử một vài điều kiện đặc biệt mà họ biết là rất quan trọng và không nên bỏ qua. Nhưng thành công của bất kỳ dự án nào, cần có nhóm kiểm thử độc lập xác nhận các ứng dụng của bạn. Rốt cuộc, trách nhiệm của chúng tôi là (người kiểm thử) để làm cho sản phẩm thông minh và dễ sử dụng nhất cho những người dùng cuối.
Baì được dịch từ 
Nguồn tham khảo: https://www.softwaretestinghelp.com/developers-are-not-good-testers/