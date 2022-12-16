Bây giờ chúng ta đã biết mọi thứ cần biết về API ... ở mức độ cơ bản nhất. Vì vậy, với tất cả những kiến thức có được này, làm thế nào chúng ta có thể sử dụng nó tốt? Trong chương này, chúng ta sẽ cùng khám phá cách biến kiến thức thành phần mềm thực tế.

## Từ kế hoạch đến sản phẩm

Như chúng ta đã thấy trong suốt khóa học này, một tương tác API liên quan đến hai mặt. Tuy nhiên, khi chúng ta đang nói ở cấp độ mã, điều chúng ta thực sự đề cập đến là chúng ta cần hai chương trình để thực hiện API. Một chương trình thực hiện API khi nó tuân theo các quy tắc của API. Trong ví dụ về cửa hàng pizza của chúng ta, một client có thể đưa ra yêu cầu đến */orders*, điểm cuối đơn hàng bằng cách sử dụng các tiêu đề và định dạng dữ liệu chính xác và client sẽ thực hiện API của cửa hàng pizza.

Chương trình máy chủ của công ty có trách nhiệm xuất bản API. Quay lại [Chương 6](https://viblo.asia/p/chapter-6-thiet-ke-api-RQqKL2Lzl7z), chúng ta đã xem xét quá trình thiết kế API. Sau khi lập kế hoạch, bước tiếp theo công ty sẽ thực hiện công việc của họ bằng cách viết phần mềm theo thiết kế. Và cuối cùng là đưa chương trình lên máy chủ.

Cùng với phần mềm máy chủ, công ty xuất bản tài liệu cho API. Tài liệu này là một hoặc nhiều tài liệu - thường là các trang web hoặc tệp PDF - giải thích cách sử dụng API. Nó bao gồm thông tin như sử dụng lược đồ xác thực nào, điểm cuối nào khả dụng và cách dữ liệu được định dạng. Nó cũng có thể bao gồm các câu trả lời mẫu, đoạn mã và bảng điều khiển tương tác để tương tác với các điểm cuối có sẵn. Tài liệu rất quan trọng vì nó là một hướng dẫn để khách hàng có thể sử dụng. Đó là nơi ai đó quan tâm đến việc sử dụng API sẽ tìm hiểu cách thức hoạt động của API.

Với tài liệu trong tay, có một số cách bạn có thể bắt đầu sử dụng API với tư cách là khách hàng. Bây giờ chúng ta hãy kiểm tra ba trong số chúng.

## HTTP Clients

Một cách dễ dàng để bắt đầu sử dụng API là với Máy khách HTTP, một chương trình chung cho phép bạn nhanh chóng xây dựng các yêu cầu HTTP để kiểm tra. Bạn chỉ định URL, tiêu đề và nội dung và chương trình sẽ gửi nó đến máy chủ được định dạng chính xác. Các loại chương trình này có đủ loại hương vị, bao gồm ứng dụng web, ứng dụng máy tính để bàn, tiện ích mở rộng trình duyệt web, v.v.

![Figure 1. Screenshot of Dev HTTP Client, a Google Chrome Extensio](https://images.zapier.com/storage/photos/ca706b287d6a70eef71ab75aeebc4a42.png?format=jpg)

Điều thú vị về các máy khách HTTP nói chung là bạn không cần phải biết cách lập trình để sử dụng một máy khách. Với các kỹ năng bạn đã đạt được trong khóa học này, giờ đây bạn có khả năng đọc tài liệu API của một công ty và tìm ra request bạn cần thực hiện để có được dữ liệu bạn muốn. Bài học nhỏ này giúp cho khách hàng tuyệt vời để khám phá và thực hiện nhanh chóng các yêu cầu.

Tuy nhiên, có một vài nhược điểm của phương pháp này. Đầu tiên, bạn thường không lưu lại công việc của mình. Sau khi bạn đóng chương trình, các yêu cầu bạn thực hiện sẽ hay bị quên và bạn phải xây dựng lại chúng vào lần tiếp theo nếu bạn cần chúng. Một nhược điểm khác là bạn thường không thể làm gì nhiều với dữ liệu bạn nhận được, ngoài việc nhìn vào nó. Tốt nhất, bạn có khả năng lưu dữ liệu vào một tệp, sau đó bạn phải làm điều gì đó thú vị với nó.

## Writing Code

Để thực sự khai thác sức mạnh của API, cuối cùng bạn sẽ cần phần mềm tùy chỉnh. Đây là nơi chương trình xuất hiện. Chúng ta sẽ không cố gắng bao quát mọi thứ về phát triển phần mềm, nhưng chúng ta có thể sử dụng một số hướng dẫn cho việc viết một ứng dụng API liên quan.

Yêu cầu đầu tiên là phải làm quen với ngôn ngữ lập trình. Có một số lượng lớn các ngôn ngữ ngoài kia, mỗi cái đều có điểm mạnh và điểm yếu. Để đơn giản, vì lợi ích, có lẽ tốt hơn là bạn nên sử dụng ngôn ngữ script (JavaScript, Python, PHP, Ruby hoặc tương tự) thay vì ngôn ngữ được biên dịch (C hoặc C ++).

Nếu bạn không chắc chắn nên chọn ngôn ngữ nào, một cách tuyệt vời để thu hẹp lựa chọn có thể là tìm một API bạn muốn triển khai và xem liệu công ty có cung cấp thư viện máy khách không. Thư viện là mã nguồn mà chủ sở hữu API xuất bản đã triển khai phía máy khách API của họ. Đôi khi thư viện sẽ có sẵn để tải xuống hoặc nó sẽ được gói trong SDK (Bộ phát triển phần mềm). Sử dụng thư viện giúp bạn tiết kiệm thời gian vì thay vì đọc tài liệu API và hình thành các yêu cầu HTTP thô, bạn chỉ cần sao chép và dán một vài dòng mã và đã có một máy khách hoạt động.

Sau khi bạn giải quyết việc chọn ngôn ngữ nào, bạn cần quyết định nơi mã sẽ được chạy. Nếu bạn đang tự động hóa các tác vụ của riêng mình, việc chạy phần mềm từ máy tính làm việc của bạn có thể được chấp nhận. Thường xuyên hơn, bạn sẽ muốn chạy mã trên máy tính phù hợp hơn để hoạt động như một máy chủ web. Có khá nhiều giải pháp khả dụng, bao gồm chạy mã của bạn trên môi trường lưu trữ được chia sẻ, dịch vụ đám mây (như Amazon Web Services) hoặc thậm chí trên các máy chủ vật lý của riêng bạn tại một trung tâm dữ liệu.

Một quyết định quan trọng thứ ba là tìm ra những gì bạn sẽ làm với dữ liệu. Lưu kết quả vào một tệp là khá dễ dàng, nhưng nếu bạn muốn lưu trữ dữ liệu trong cơ sở dữ liệu hoặc gửi nó đến một ứng dụng khác, mọi thứ trở nên phức tạp hơn. Việc kéo dữ liệu ra khỏi cơ sở dữ liệu để gửi tới API cũng có thể là một thách thức.

Tại thời điểm này, chúng tôi có thể tạm dừng và nhắc nhở bạn không quá sợ hãi bởi tất cả các thông tin mới này. Bạn không nên mong đợi biết mọi thứ về việc triển khai API trong lần thử đầu tiên. Hãy an ủi khi biết rằng có những người có thể giúp đỡ (cộng đồng nguồn mở, nhà phát triển cho thuê và cộng tác viên dự án tiềm năng) và rất nhiều tài nguyên có sẵn trực tuyến để tạo điều kiện học tập.

Khi bạn nắm vững những điều cơ bản, có rất nhiều chủ đề để tìm hiểu về lĩnh vực phát triển phần mềm phong phú. Hiện tại, nếu bạn thành công trong việc học ngôn ngữ lập trình và mở thư viện, bạn nên ăn mừng. Bạn sẽ tiếp tục tận dụng được tối đa các API!

## Hãy dùng thử Zapier

Nếu code nằm ngoài khả năng của bạn hoặc bạn bị hạn chế về thời gian, có một công cụ tiện lợi mà chúng tôi biết về việc cho phép bạn dễ dàng tương tác với các API. OK, bạn có thể thấy điều này sắp tới: đó là Zapier! Nền tảng nhà phát triển của chúng tôi cung cấp một cách để bạn triển khai API mà sau đó bạn tương tác với tư cách là một ứng dụng trên Zapier. Thông qua các lần nhấp vào nút và gửi biểu mẫu, bạn có thể triển khai gần như bất kỳ API nào bạn muốn.
![](https://images.zapier.com/storage/photos/f17cec831c2002533c1609bcc3dc448f.png?format=jpg)
Điều làm cho việc sử dụng Nền tảng nhà phát triển trở nên dễ dàng là chúng tôi đã thực hiện rất nhiều chương trình cho bạn. Zapier có mã tại chỗ để thực hiện các yêu cầu, tất cả những gì bạn phải làm là điền vào các chi tiết. Hãy nghĩ đến việc sử dụng nền tảng một chút giống như sử dụng Máy khách HTTP chung; bạn cho chúng tôi biết một chút về các điểm cuối và chúng tôi sẽ làm phần còn lại. Lợi ích bổ sung là một khi bạn có Zapier nói chuyện với API, bạn có rất nhiều tùy chọn để làm gì với dữ liệu bạn nhận được. Ngoài ra, nếu bạn gặp khó khăn, bạn có thể liên hệ với nhóm hỗ trợ thân thiện, nơi bạn có các chuyên gia API sẵn sàng giúp đỡ bạn.

## Kết luận

Chúng tôi đã đi một chặng đường dài trong khóa học này. Chúng tôi bắt đầu với những câu hỏi như "Client là gì?" và kết thúc với những ý tưởng về cách xây dựng chúng. Ngay cả khi bạn quyết định không thử thực hiện API, chúng tôi hy vọng bạn cảm thấy thoải mái khi được bắt chuyện về API. Bây giờ bạn có ý thức về API là gì, nó làm gì và làm thế nào bạn có thể tận dụng một API để mang lại lợi ích cho doanh nghiệp của bạn.

Có thể bạn điều hành một công ty và thấy giá trị trong việc cung cấp API cho khách hàng của mình. Hoặc có lẽ bạn thường xuyên làm những công việc phiền phức, tốn thời gian mà bạn rất hào hứng khi tự động hóa. Dù thế nào đi chăng nữa, chúng tôi hy vọng bạn tìm thấy kiến thức bạn có được có giá trị. Vui lòng chia sẻ khóa học này với bất kỳ ai mà bạn nghĩ có thể hưởng lợi từ nó và truyền bá rằng API rất tuyệt vời!

## Chapter 8 Recap

Trong chương này, chúng ta đã thảo luận về cách thiết kế API trở thành phần mềm hoạt động. Chúng tôi đã nói về những cách mà bạn có thể bắt đầu sử dụng API.

* Triển khai: Viết phần mềm tuân theo các quy tắc của API
* Tài liệu: Các trang web, PDF, v.v ... giải thích các quy tắc của API
* Thư viện: Mã được phát hành bởi nhà xuất bản API thực hiện phần máy khách của API của họ


## Kết thúc

"Giới thiệu về API" là một khóa học miễn phí do Zapier mang đến cho bạn. Chúng tôi hy vọng bạn thích đọc nó. Nếu bạn nghĩ rằng người khác có thể được hưởng lợi từ tài liệu này, xin vui lòng chia sẻ.

## Tài liệu tham khảo
https://zapier.com/learn/apis/chapter-8-implementation/