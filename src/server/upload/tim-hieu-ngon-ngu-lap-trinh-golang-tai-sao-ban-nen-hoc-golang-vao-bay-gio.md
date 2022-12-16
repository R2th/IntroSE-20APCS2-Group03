![](https://images.viblo.asia/d866feaf-057e-44e1-80e9-54f90ef5df79.jpg)
## Golang là gì?
> Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.
> 
> Nguồn: trang chủ ngôn ngữ Go.

Tạm dịch: Go là ngôn ngữ lập trình mã nguồn mở giúp xây dựng phần mềm dễ dành, tin cậy và hiệu quả.

Go (tên gọi khác: Golang) còn được biết đến là một ngôn ngữ static typed, có thể hiểu rằng mọi thứ trong Go đều phải có kiểu dữ liệu, trái với các ngôn ngữ dynamic typed như Javascript hoặc Python. Bản thân nó cũng là một Compile Programming Language, ngôn ngữ lập trình có trình biên dịch để ra được file thực thi.

Các lập trình viên sử dụng Go thường được gọi là gopher.

Trong bài viết này, mình sẽ dùng qua lại Golang và Go, thật ra chúng là một.

## Lịch sử Golang: Những cột mốc lớn
Khởi nguồn từ năm 2007, Golang được thai nghén bởi 3 kỹ sư nổi tiếng ở Google là:  Ken Thompson, Robert Griesemer, và Rob Pike. 
![](https://images.viblo.asia/1fb0eba8-7950-4c4d-a36d-4a0ec2f06971.jpg)

Năm 2009, Golang chính thức được công bố dưới dạng mã nguồn mở.

Đến tận 3 năm sau, tháng 03/2012, Golang mới phát hành phiên bản 1.0 chính thức. Tức là phiên bản ổn định để dùng cho dự án thực tế (production ready).

Cũng trong năm 2013, Golang update một lượt lên v1.1 rồi v1.2:

* Hỗ trợ kiến trúc 64 bits.
* Cho phép thiết lập tổng số lượng threads mà chương trình có thể có. Mặc định là 10,000 threads.
* Dung lượng của 1 stack được sinh ra bởi Goroutine được thay đổi từ 4K lên 8K. Theo tác giả bài viết: đây vẫn là con số rất bé.

Năm 2015, Golang update lên v1.5. Lúc này các tác giả Golang đã tự viết luôn compiler (trình biên dịch) với Golang, không dùng qua C nữa. Garbage Collector trong Golang cũng được cải tiến rất đáng kể.

Năm 2017, Golang v1.9 cho phép compiler xử lý song song, tận dụng lợi thế trên các máy tính chạy đa nhân. Có thể hiểu rằng Golang đã build nhanh nay lại càng nhanh hơn.

Năm 2018, Golang v1.11 là một cột mốc rất đáng ghi nhận đối với bản thân mình vì:

* Golang trước version 1.11 sử dụng khái niệm GOPATH và không hề có bộ quản lý các modules. Và nay, v1.11, Golang đã support và đưa hẳn vào built-in (tức không cần cài thêm gì cả).
* Golang bắt đầu hỗ trợ Web Assembly.

Cũng trong năm 2018, Robert Griesemer có thông báo về Golang 2. Đại khái tác giả thông báo bắt đầu tổng hợp và thu thập các feeback/proposal cần thiết. Golang 2 sẽ do cộng đồng cùng phát triển chứ thay vì là một team nhỏ như v1. Cho tới thời điểm mình viết bài này thì Golang 2 vẫn chưa chính thức ra mắt. Nhưng chúng ta hãy cùng chờ xem ngôn ngữ này sẽ còn phát triển đến đâu nhé.

## Các đặc tính của Golang
Golang ra đời vì một sứ mệnh giúp tăng năng suất phần mềm, đặc biệt là ở lĩnh vực multicore processing (xử lý đa nhân), network (mạng) và những dự án có source code rất lớn. Và dưới đây là 1 một số đặc tính làm nên một ngôn ngữ rất mạnh và ưu chuộng hiện nay:

### Golang là static typed
Mọi thứ trong Golang đều phải có Type (kiểu). Mặc dù cú pháp golang có hỗ trợ không cần khai báo kiểu, nhưng nó cũng chỉ hoạt động khi bạn đã có value cần gán vào. Từ value này, compiler sẽ hiểu biến đó thuộc kiểu gì. Một khi biến đã được khai báo, nó sẽ không thể thay đổi kiểu dữ liệu được nữa.

Điều này sẽ giúp ích rất nhiều cho việc giảm lỗi khi chương trình thực thi. Vì nếu sai kiểu, compiler sẽ không thể build thành công. Các kỹ sư luôn đọc và hiểu được code nhanh chóng.

### Golang build/compile rất nhanh
Một trong những điểm yếu của các Static Typed Language trước khi có Golang là thời gian build rất lâu. Với Golang thì việc này chỉ mất vỏn vẹn vài giây đến vài phút. Sẽ không còn cảnh bấm build project sau đó đi pha ly cafe uống từ từ chờ đợi nữa.
![](https://images.viblo.asia/2650f49f-fb1e-43f2-a932-8ae399888bea.jpg)

### Hỗ trợ lập trình concurrent (đồng thời) rất dễ dàng với Goroutine
Lập trình concurrent, xử lý nhiều tác vụ một lúc, luôn là chủ đề hot trong giới kỹ sư phần mềm. Rất nhiều ngôn ngữ hỗ trợ kỹ thuật này. Điều đó không ngoại lệ Golang, thậm chí các tác giả Golang đã làm chúng đơn giản hơn bao giờ hết. Đơn cử rằng chỉ với từ khoá “go” đặt ngay trước nơi gọi hàm, từ khoá này là first-class (từ khóa chính, không cần cài đặt hay import gì thêm). Kỹ thuật này được gọi là Goroutine.
![](https://images.viblo.asia/0e5e6bd7-1af6-4be8-9816-76e117145aaa.png)
Thêm vào đó, Golang có hỗ trợ một phương thức giao tiếp giữa các Goroutines rất đặc biệt với từ khoá “channel” (vẫn là first-class). Có câu nói rất nổi tiếng về Channel:

“Do not communicate by sharing memory; instead, share memory by communicating” (Tạm dịch: Đừng giao tiếp bằng việc chia sẻ bộ nhớ, thay vào đó, hãy dùng giao tiếp để chia sẻ bộ nhớ). Đại khái rằng chúng ta sẽ dùng Channel (kênh giao tiếp) để chia sẻ thông tin (bộ nhớ) giữa các Goroutines.
![](https://images.viblo.asia/3be80ed6-cb54-446d-89fe-5671cfd34714.jpg)
### Cân bằng giữa hiệu năng và thời gian phát triển
Hẳn là anh em kỹ sư phần mềm đều biết rằng một ngôn ngữ với syntax (cú pháp) nhanh gọn, dynamic type (kiểu dữ liệu động) sẽ giúp chúng ta code nhanh hơn, hay còn gọi là develop time ít hơn. NHƯNG đánh đổi bù lại là thời gian thực thi (performance) giảm. Điều này thực không khó hiểu khi mà ngôn ngữ lập trình phải làm phần việc khó còn lại. Nó sẽ mất thêm thời gian để “hiểu” được đoạn code vào thời điểm thực thi (runtime). Ví dụ điển hình như PHP, Javascript trong trường hợp này.

Ngược lại nếu chúng ta chọn hiệu năng cao thì cần hy sinh tốc độ phát triển (tốc độ code phần mềm). Khi đó mã nguồn sẽ dài hơn, xử lý phức tạp hơn đáng kể. Ví dụ ta có C, C++ trong trường hợp này.

Còn với Golang, cả 2 yếu tố trên sẽ khá cân bằng. Golang vẫn giữa được hiệu năng cận C, tức chạy nhanh gần như C, mà source code vẫn khá đơn giản, không phức tạp như C/C++. Đây là một điều rất tuyệt vời cho các anh em kỹ sư fan cứng của hiệu năng và không muốn đánh đổi quá nhiều.

## Khi nào nên dùng Go? Go phù hợp với những project nào?
![](https://images.viblo.asia/29303520-d321-4b04-ae7b-9cf5882c813c.jpg)
Không có một ngôn ngữ nào hoàn hảo và có thể làm tốt mọi việc. Golang cũng không phải ngoại lệ. Về bản chất, Golang là một system language (ngôn ngữ dành cho hệ thống). Vì thế nó sẽ đặc biệt phù hợp cho các dự án về system như Network, Proxy, Distributed Computing (xử lý phân tán), Cloud Native,… Dưới đây là những dự án rất nổi tiếng được viết bởi Go:

* Docker: là một nền tảng để cung cấp cách để dựng (build), kiểm thử (testing) và triển khai (deploy) ứng dụng (hoặc service) nhanh chóng bằng cách sử dụng container.
* Kubernetes: là một hệ thống mã nguồn mở để giúp việc triển khai, nhân rộng (scale) dễ dàng và tự động thông qua việc sử dụng các container Docker.
* Istio: là hệ thống hạ tầng giúp quản lý và kết nối các thành phần trong microservices.
* NATS: là một message system, một thành phần quan trọng trong các hệ thống pub/sub, event-driven.
* Consul: là một service (phần mềm / dịch vụ) giúp thiết lập network trong microservices một cách dễ dàng.
* Và còn rất nhiều ứng dụng khác được viết bởi Go. Xem thêm tại https://github.com/topics/golang

Nếu các bạn đang có nhu cầu phát triển service theo tiêu chuẩn Cloud Native, các bạn có thể cân nhắc Go. Vì hầu hết các dự án viết bởi Go được liệt kê phía trên đều đã được chứng nhận đạt Cloud Native.

Chúng ta hoàn toàn có thể sử dụng Go cho những công việc phổ biến hơn như: viết REST API service, Web Service và các ứng dụng chạy dưới dạng câu lệnh terminal (CLI).

## Dành cho developer muốn học Golang
Golang thực sự là một ngôn ngữ rất đơn giản và dễ học. Một minh chứng rằng trong Golang chỉ có 25 keywords (là những từ khoá bạn không được sử dụng để đặt tên biến và hàm).
![](https://images.viblo.asia/9f355be0-cc80-4f17-b7be-9cd8a97a0b45.png)
Để lập trình Go, chúng ta chỉ cần cài đặt mỗi Go là đủ, không còn gì thêm nữa.

Ngoài ra thì Golang cũng không hề có OOP (Object-oriented Programming), đồng nghĩa với nếu bạn vẫn là một người hoàn toàn mới, lượng kiến thức các bạn cần tìm hiểu giảm đi rất đáng kể. Hãy tin mình, khi có OOP, chúng ta sẽ cần tìm hiểu thêm rất nhiều thứ liên quan như các kiến trúc và design pattern của OPP.

Hiện các bạn có thể học Golang thông qua trang web chính chủ của Google là Golang Tour, mỗi hạn mục đều có hướng dẫn rõ ràng chi tiết. Đặc biệt là có cả editor online cho các bạn chạy code luôn trên web, quá tiện.

Ngoài ra 200Lab cũng có Khoá học Golang – Food Delivery Backend dành cho các bạn muốn tìm hiểu cách xây dựng backend tải cao.

Kết
Mình nghĩ qua bài viết này, các bạn sẽ hiểu rõ hơn về Go, hiểu được vì sao Go ra đời và đã phát triển như thế nào cho đến ngày hôm nay.

Hiện tại Go đang dần trở nên phổ biến trên thế giới, rất nhiều nơi đã chuyển đổi hệ thống về Go.

Việt Nam dù có muộn hơn nhưng cũng không nằm ngoài xu thế này, trong khoảng 3 năm trở lại đây, kỹ sư Go đang ngày càng được các công ty công nghệ săn đón. Startup có thể dùng Go để làm hệ thống từ đầu. Các công ty lớn và lâu năm có thể dùng Go để xây dựng các service nhỏ gọn hơn, hoặc chuyển đổi hẳn về Go.

Từ đó các bạn có thể thấy rằng đây cũng đồng thời là một cơ hội mới. Vì nếu các bạn học Go, các bạn sẽ cạnh tranh với ít người hơn, nhà tuyển dụng cũng chỉ tuyển tối đa Go 2 đến 3 năm thôi. Hãy bắt đầu vào cuộc đua ngay các bạn nhé.

Với cá nhân mình, một người đã làm việc với Go 3 hơn năm, hy vọng rẳng Go sẽ còn phát triển và được cộng đồng đón nhận hơn nữa.

Nguồn: https://edu.200lab.io/blog/tim-hieu-ngon-ngu-lap-trinh-golang