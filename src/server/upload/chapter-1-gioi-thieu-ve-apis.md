APIs (application programming interfaces) là một phần quan trọng của web hiện tại. Trong năm 2013, có hơn 10.000 API được công bố rộng rãi bởi các công ty nhằm mục đích sử dụng. Số lượng này gấp bốn lần số lượng có sẵn trong năm 2010.

Với rất nhiều công ty đầu tư vào lĩnh vực kinh doanh mới này, vì vậy sự hiểu biết sâu sắc về API trở nên ngày càng cần thiết với công việc  trong ngành công nghiệp phần mềm. Thông qua khóa học này, chúng tôi hy vọng sẽ cung cấp cho bạn những kiến thức đó bằng cách xây dựng từ những điều cơ bản nhất. Trong chương này, chúng ta bắt đầu bằng cách xem xét một số khái niệm cơ bản xung quanh API. Chúng ta sẽ xác định API là gì, vòng đời của nó như thế nào và đưa ra một bức tranh tổng thể hơn về cách sử dụng API.

## Một số khái niệm trước khi đi vào Apis

Khi nói về API, rất nhiều cuộc tranh luận tập trung vào các khái niệm trừu tượng mà không để ý tới những điều khác. Trong bài viết này, chúng ta hãy bắt đầu với một cái gì đó là vật lý: máy chủ. Một máy chủ không có gì hơn một máy tính lớn. Nó có tất cả các bộ phận giống như máy tính xách tay hoặc máy tính để bàn mà bạn sử dụng cho công việc, nó chỉ nhanh hơn và mạnh hơn. Thông thường, các máy chủ không có màn hình, bàn phím hoặc chuột, khiến chúng trông rất khó sử dụng. Thực tế là dân IT kết nối với máy chủ từ xa - giống như kiểu máy tính để bàn từ xa - để làm việc với chúng.

Máy chủ được sử dụng cho nhiều mục đích khác nhau. Một số dữ liệu lưu trữ; số khác thì dùng để gửi email. Những thứ mà người dùng tương tác trên web hầu hết là các web servers. Đây là những máy chủ cung cấp cho bạn một web page khi bạn truy cập một trang web.

*Theo cùng một cách mà một chương trình như Solitaire chờ bạn nhấp vào thẻ để làm một cái gì đó, một web servers sẽ chạy một chương trình chờ đợi người dùng yêu cầu nó trả về một trang web.
*

Thực sự không có gì kỳ diệu hay ngoạn mục về nó. Một nhà phát triển phần mềm viết chương trình, sao chép nó vào máy chủ và máy chủ có nhiệm vụ chạy chương trình đó liên tục.

## API là gì và tại sao nó có giá trị

Trang web được thiết kế để phục vụ cho thế mạnh của mọi người. Con người có một khả năng đáng kinh ngạc để lấy thông tin hình ảnh, kết hợp nó với kinh nghiệm của chúng ta để rút ra ý nghĩa, và sau đó hành động theo ý nghĩa đó. Đó là lý do tại sao bạn có thể nhìn vào một biểu mẫu trên một trang web và biết rằng hộp nhỏ có cụm từ "Tên" bên trên có nghĩa là bạn phải tên của bạn vào đó.

Tuy nhiên, điều gì xảy ra khi bạn phải đối mặt với một nhiệm vụ rất tốn thời gian, như sao chép thông tin liên hệ của hàng ngàn khách hàng từ trang này sang trang khác? Bạn sẽ thích giao công việc này cho máy tính để có thể thực hiện nhanh chóng và chính xác. Thật không may, các đặc điểm làm cho trang web tối ưu cho con người khiến chúng khó sử dụng được trên máy tính.

Giải pháp là sử dụng API. API là công cụ giúp dữ liệu của trang web có thể sử dụng được cho máy tính. Qua đó, một máy tính có thể xem và chỉnh sửa dữ liệu, giống như một người có thể tải trang và gửi biểu mẫu.

![](https://images.viblo.asia/12ac3c61-0416-4e2f-8d4f-bd3019382a96.jpeg)

Dữ liệu dễ dàng để làm việc hơn là tốt bởi vì nó có nghĩa là mọi người có thể viết phần mềm để tự động hóa các công việc tẻ nhạt và tốn nhiều công sức. Những gì có thể mất một giờ của con người để hoàn thành có thể mất vài giây máy tính thông qua API.

## Cách sử dụng API

Khi hai hệ thống (trang web, máy tính để bàn, điện thoại thông minh) liên kết với nhau thông qua API, chúng ta có thể nói rằng chúng được "tích hợp". Trong một tích hợp, bạn có hai mặt, mỗi mặt có một tên đặc biệt. Một bên chúng ta đã nói ở phía trên: máy chủ. Đây là phía thực sự cung cấp API. Hãy nhớ rằng API chỉ đơn giản là một chương trình khác đang chạy trên máy chủ. Nó có thể là một phần của cùng một chương trình xử lý lưu lượng truy cập web hoặc nó có thể là một chương trình hoàn toàn riêng biệt. Trong cả hai trường hợp, nó đang ngồi, chờ người khác hỏi nó về dữ liệu.

Phía bên kia là "khách hàng." Đây là một chương trình riêng biệt để biết dữ liệu nào có sẵn thông qua API và có thể thao tác với nó, thường là theo yêu cầu của người dùng. Một ví dụ tuyệt vời là một ứng dụng điện thoại thông minh đồng bộ với một trang web. Khi bạn nhấn nút refresh trong ứng dụng của mình, nó sẽ nói chuyện với máy chủ thông qua API và tìm nạp thông tin mới nhất.

Nguyên tắc tương tự áp dụng cho các trang web được tích hợp. Khi một trang web lấy dữ liệu từ trang kia, trang web cung cấp dữ liệu sẽ đóng vai trò là máy chủ và trang web tìm nạp dữ liệu là máy khách.

## Chapter 1 Recap

Chương này tập trung vào việc cung cấp một số thuật ngữ nền tảng và mô hình và API là gì và cách sử dụng.
Các thuật ngữ chính chúng ta đã học là:
* Máy chủ: Một máy tính mạnh mẽ chạy API
* API: Phần "ẩn" của trang web dành cho  máy tính sử dụng
* Máy khách: Chương trình trao đổi dữ liệu với máy chủ thông qua API

## Kế tiếp
Trong chương tiếp theo, chúng ta sẽ đi sâu vào cơ chế về cách máy khách nói chuyện với API.

[*Chuyển đến Chương 2!*](https://viblo.asia/p/chapter-2-protocols-XL6lAkvBKek)

## Tài liệu tham khảo:
https://zapier.com/learn/apis/chapter-1-introduction-to-apis/

1. David Berlind, ProgrammableWeb’s Directory Hits 10,000 APIs. And Counting. ProgrammableWeb. September 23, 2013.

2. Adam DuVander, API Growth Doubles in 2010, Social and Mobile are Trends. ProgrammableWeb. January 3, 2011.

3. Technically, an API is just a set of rules (interface) that the two sides agree to follow. The company publishing the API then implements their side by writing a program and putting it on a server. In practice, lumping the interface in with the implementation is an easier way to think about it.