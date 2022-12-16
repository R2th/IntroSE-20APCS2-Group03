# NGINX là gì?

![](https://images.viblo.asia/d9aa0271-5faa-41ba-b3c5-aed89fed40ee.png)


Nginx, phát âm là "engine-ex" nhé các bạn, là một phần mềm mã nguồn mở dùng để phục vụ web, reverse proxy, caching, cân bằng tải, và nhiều hơn nữa. Ban đầu được phát hành và sử dụng như một web server được thiết kế hướng đến mục đích cải thiện tối đa hiệu năng và sự ổn định. Bên cạnh đó, nhờ vào các khả năng của máy chủ HTTP mà NGINX còn có thể hoạt dộng như một proxy server cho email (IMAP, POP3, và SMTP), reverse proxy, và trung gian để cân bằng tải cho các máy chủ HTTP, TCP, và UDP.

Hãy thử hình dung bạn vừa viết ra được một web app cực lớn và đang tìm cho mình một web server đủ có thể host em nó lên cho anh em cùng trầm trồ. Và ứng dụng của bạn chứa rất nhiều các file tĩnh - HTML, CSS, JS, một backend service hoặc một mớ webservice. Đó là lúc NGINX bước vào cuộc chơi. Tại sao nên dùng NGINX, bởi vì nó là một web server khá bá với khả năng xử lý hàng ngàn kết nối cùng lúc, bên cạnh đó còn sử dụng kiến trúc non-threaded và event-driven khiến cho NGINX có thể vượt mặt Apache (một webserver cực kỳ phổ biến khác) nếu chúng ta cài đặt và tinh chỉnh nó hợp lý. Ngoài ra thì còn đi kèm theo 1 số tính năng như mình có kể trên.

Một vài ông lớn trên thị trường công nghệ ngày này có các website sỡ hữu lượng traffic khổng lồ cũng đang sử dụng NGINX như là Google, Netflix, Cloudflare, v.v. Đủ để hiểu độ tín dụng của NGINX rồi nhé :grin:

# NGINX hoạt động thế nào?

Ở đây, chắc mọi người đã không còn lạ với cách web server hoạt động nhỉ? Đơn giản là, khi ai đó gửi một yêu cầu để mở một trang web. Browser sẽ gọi lên server chứa website. Sau đó, server sẽ tìm kiếm đúng file yêu cầu của website đó và gửi ngược về cho browser.

NGINX được xây dựng để sử dụng ít bộ nhớ và tăng sự đồng thời. Thay vì tạo các tiến trình mới cho mỗi web request, NGINX sử dụng một hướng xử lý theo kiểu bất đồng bộ (asynchronous) và hướng sự kiện (event-driven) mà mình có đề cập ở trên, đó là các request sẽ được xử lý trong một luồng đơn và được quản lý theo worker process và mỗi worker process đồng thời cũng chưa một đơn vị nhỏ hơn đó là work connection.

Toàn bộ các đơn vị này sẽ có trách nhiệm xử lý các luồng yêu cầu, worker connection cung cấp các yêu cầu cho worker process. Và sau cùng là master process, quản lý và cung cấp kết quả của các yêu cầu đó. Một điều thú vị nữa là mỗi worker connection có thể xử lý đến 1024 yêu cầu tương tự nhau đấy. Do đó, NGINX có thể xử lý cả ngàn yêu cầu mà không gặp bất kỳ trở ngại nào luôn. Đó cũng là lý do NGINX trở thành công cụ tuyệt vời cho các trang web có nhiều những yêu cầu như e-commerce, search engines hay clound storage.

![Vị trí cũng như vai trò cơ bản của NGINX trong hệ thống](https://images.viblo.asia/171584c1-d33f-4010-b031-7737ce4b1373.png)

*Vị trí cũng như vai trò cơ bản của NGINX trong hệ thống*


# NGINX vs Apache, đâu là nhà vô địch?

Bên trên mình có đề cập đến việc nếu config NGINX hợp lý thì có thể outrun được Apache. Vì vậy chúng ta sẽ cùng so sánh một tí 2 web servers phổ biến bậc nhất hiện nay và nên chọn cái nào nhé. 

First thing first, khác biệt chính và lớn nhất giữa NGINX và Apache đến từ kiến trúc thiết kết của 2 web servers. Apache thì sử dụng hướng tiến trình (post-driven) và sẽ tạo một thread mới mỗi có request. Trong khi NGINX thì khác ở chỗ, nó sử dụng hướng sự kiến (event-driven) tạo ra đặc tính có thể xử lý nhiều requests chỉ trong một thread. Ngoài ra, chúng ta cũng sẽ có những khác biệt nhỏ nhưng cũng có thể ảnh hưởng tới quyết định của mọi người khi lựa chọn web server phù hợp cho dự án của mình, cùng tham khảo infographic mà mình đã tìm được bên dưới nhé:


![Source: serverguy.com](https://images.viblo.asia/e6b873c4-1db6-4c01-af75-d04b9e157d1d.png)

*Source: serverguy.com*

Như mọi người thấy, ngoài khác biệt về kiến trúc cơ bản, chúng ta còn nhận thấy các khác nhau về hiệu năng, hệ điều hành hỗ trợ, cấu hình tập trung, thông dịch request, các module tính năng, độ uyển chuyển, bảo mật cũng như độ support của cộng đồng cho web server đó. Từ đây, nhìn vào mọi người có thể chọn lọc ra các tiêu chí và quyết định sử dụng web server nào tùy vào dự án của mình nhé, nhưng có độ ảnh hưởng cao nhất thì các bạn nên cân nhắc về mặt hệ điều hành hỗ trợ, độ hỗ trợ người dùng (vì nếu là người mới đang phân vân thì việc có một cộng đồng lớn sau lưng hỗ trợ khi cần là rất quan trọng), sau cùng là hiệu năng. Hoặc có thể lựa chọn sử dụng cả 2 cũng được, NGINX sẽ đứng trước Apache và đóng vai trò như một server proxy, tận dụng được lợi thế của NGINX với tốc độ xử lý nhanh và khả năng thiết lập lượng lớn các kết nối đồng thời, các bạn tham khảo cấu trúc dưới nếu muồn kết hợp 2 web servers nhé.

![Source: serverguy.com](https://images.viblo.asia/69d27cb4-7a90-4979-a421-9c93cea702f3.png)

*Cấu trúc khi kết hợp NGINX và Apache. Source: serverguy.com*

Cuối cùng, để kết luận xem ai là nhà vô địch thì cũng khá là khó, vì mỗi bên đều có điểm lợi hơn so với bên còn lại. Nhưng công bằng mà nói, xét trên các tiêu chí thì NGINX sẽ nhỉnh hơn Apache một tí nhé mọi người :grin:


# Lời kết

Bên trên, mình vừa tổng hợp lại các điểm tổng quan về NGINX, là web server có thể hoạt động như là email proxy, reverse proxy và load balancer, khả năng mở rộng cũng dễ dàng hơn.

Bên cạnh đó là một so sánh nhỏ NGINX và Apache để mọi người tiện lựa chọn cho việc tìm hiểu sắp tới, cũng như quyết định sử dụng web server nào cũng rất là quan trọng đó nhé mọi người.

Mong là bài viết có thể giúp ích cho mọi người, bên cạnh đó, mình cũng mới tìm hiểu về NGINX đây thôi nên bài viết khả năng còn nhiều thiếu sót, mọi người nếu có thắc mắc hoặc vấn đề gì cứ comment vào nhé. Cảm ơn mọi người đã dành thời gian đọc bài viết.


# Link tham khảo

https://www.nginx.com/

https://www.hostinger.vn/huong-dan/nginx-la-gi-no-hoat-dong-nhu-the-nao

https://serverguy.com/comparison/apache-vs-nginx/#3