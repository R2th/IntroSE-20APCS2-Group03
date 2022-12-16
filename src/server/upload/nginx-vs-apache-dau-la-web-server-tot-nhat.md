![](https://images.viblo.asia/5aa3c6f6-69d2-465c-8766-dae22cd95105.png)
Hiện nay, Nginx và Apache đang là hai web server phổ biến nhất. Vậy trong bài viết chúng ta hãy cùng nhau so sánh để tìm hiểu xem đâu là web server phù hợp cho các Developer khi chọn lựa.

Bài viết này sẽ so sánh các điểm chính sau:
* Hiệu năng
* Hệ điều hành hỗ trợ
* Bảo mật
* Tài liệu
* Sự hỗ trợ
## Giới thiệu 
### Nginx 
Nginx là phần mềm nguồn mở làm web server. Ngoài các tính năng của một máy chủ HTTP, Nginx cũng có thể hoạt động như một máy chủ proxy cho email (IMAP, POP3 và SMTP) và một trình cân bằng tải (load balancer) và proxy ngược (reverse proxy) cho các máy chủ HTTP, TCP và UDP.

Nginx được tạo ra bởi Igor Sysoev và phát hành lần đầu tiên vào năm 2004. Vì khả năng mạnh mẽ, và để có thể xử lý hàng ngàn kết nối cùng lúc, nhiều website có traffic lớn đã sử dụng dịch vụ NGINX. Một vài trong số những ông lớn công nghệ dùng nó là Google, Netflix, Adobe, Cloudflare, WordPress và còn nhiều hơn nữa. Theo W3techs, Nginx được nhiều người sử dụng làm Web server chiếm tỉ lệ 42,1% tổng số lượng Web server trên thế giới.

### Apache

Cũng giống như Nginx, Apache là chương trình máy chủ HTTP là một chương trình dành cho máy chủ đối thoại qua giao thức HTTP. Apache chạy trên các hệ điều hành tương tự như Unix, Microsoft Windows, Novell Netware và các hệ điều hành khác.

Khi được phát hành lần đầu, Apache là chương trình máy chủ mã nguồn mở duy nhất có khả năng cạnh tranh với chương trình máy chủ tương tự của Sun Java System Web Server. Từ đó trở đi, Apache đã không ngừng tiến triển và trở thành một phần mềm có sức cạnh tranh mạnh so với các chương trình máy chủ khác về mặt hiệu suất và tính năng phong phú.

Từ tháng 4 năm 1996, Apache trở thành một chương trình máy chủ HTTP thông dụng nhất. Hơn nữa, Apache thường được dùng để so sánh với các phần mềm khác có chức năng tương tự. Tính đến tháng 1 năm 2007 thì Apache chiếm đến 60% thị trường các chương trình phân phối trang web. 

### Hiệu năng
Ở phần này, chúng ta sẽ so sánh hiệu năng của chúng khi xử lý web tĩnh và web động

**1. Web tĩnh**

- Nginx nhanh hơn 2,5 lần Apache dựa trên một thử nghiệm kiểm chuẩn chạy tới 1000 kết nối đồng thời
- Trong một thử nghiệm khác với 512 kết nối đồng thời, Nginx nhanh hơn khoảng 2 lần và và tiêu thụ ít bộ nhớ hơn (4%)
> Như vậy trong vòng đối đầu đầu tiên :sweat_smile::sweat_smile:, Nginx đã áp đảo Apache khi xử lý web tĩnh nhanh vượt trội. Vì vậy, nếu cần xử lý nhiều nội dung tĩnh thì Nginx là sự lựa chọn hoàn hảo dành cho bạn
>

**2. Web động**

Năm 2015, một thử nghiệm so sánh các nội dung động được phân phối bởi Apache và Nginx đã tiết lộ thấy rằng Apache event MPM khi ghép nối với các module PHP-FPM, có thể xử lý đồng thời giống như Nginx với PHP. Một cuộc thử nghiệm web server khác cũng cho ra kết quả tương tự.

Nguyên nhân là vì thời gian xử lý request chủ yếu là ở môi trường PHP thay vì phần cốt lõi của web server. Còn thời gian chạy trên môi trường PHP cho ra kết quả không mấy khác biệt.

Điểm chấm kiểm nghiệm trên Speedemy cũng cho thấy tình huống tương tự khi cùng sử dụng Apache và Nginx để xử lý nội dung động. Về PHP (và các ngôn ngữ khác), hiệu suất server động trên thực tế tương đương với một thiết lập Apache module thích hợp (PHP-FPM + FastCGI).

Nếu cần tăng tốc độ web động thì chúng ta có thể thêm một lớp bộ nhớ đệm Varnish hoặc Memcached caching.

> Sau vòng đấu này tỉ số hiện tại của Nginx vs Apache đang là: 2 - 1

### Hệ điều hành hỗ trợ
Apache hoạt động trên tất cả các loại hệ thống Unix-like (Linux hoặc BSD) và hỗ trợ đầy đủ cho Microsoft Windows. Nginx cũng chạy trên một vài hệ thống trong số chúng và cũng hỗ trợ Window tuy nhiên hiệu suất không được mạnh bằng.

> Hiện tại Apache đã vươn lên và tỉ số đã là 2 - 2 :wink::wink:

### Bảo mật
Cả 2 ứng viên của chúng ta đều đã có những thành tích được ghi nhận về độ bảo mật mã nguỗn của mình. Mã nguồn của Nginx được nhận xác nhận là không lớn.

Apache được báo cáo là có lỗ hổng bảo mật ở phiên bản 2.2 và 2.4. Nginx đang có một danh sách tư vấn về các vấn đề bảo mật gần đây.

Apache cung cấp các hướng dẫn cấu hình để xử lý cuộc tấn công DDoS, cũng như các mod_evasive để ứng phó với HTTP DoS, DDoS, hoặc brute force attacks. Ngoài ra, Nginx cũng cung cấp các chủ đề để đối phó các mối đe dọa DDoS trên blog của mình.

> Vậy vòng đấu này hai bên vẫn đang hòa 3 - 3
> 
### Tài liệu
Tài liệu của Apache và Nginx đều rất đầy đủ bao gồm cả wike Nginx.

Ngoài ra, Nginx còn cung cấp các khóa đào tạo trực tiếp và trực tuyến, thậm chí họ còn tổ chức thi chứng chỉ.

> 4 - 3 nghiêng về Nginx :roll_eyes:
### Sự hỗ trợ
Apache hỗ trợ người dùng thông qua: email, IRC, Stack Overflow. Còn có các bên thứ 3 hỗ trợ tính phí như OpenLogic.

Nginx cũng tương tự Apache về cách thức hỗ trợ. Công ty đứng sau Nginx cung cấp một sản phẩm thương mại được gọi là Nginx Plus hỗ trợ một bộ các tính năng bổ sung: load-balancing, media streaming, và monitoring.

> 5 - 4
### Kết luận
Mặc dù tỉ số nghiêng về bên Nginx nhưng sự thực Nginx với Apache vẫn đang là 49 đọ với 50 có thể cạnh tranh được với nhau trong hầu hết các tình huống.

Nginx tốt hơn Apache với nội dung tĩnh, nhưng hiệu năng thấp hơn với nội dung động. Và Nginx nổi bật với một số tính năng nâng cao(media streaming, reverse proxying for non-HTTP protocols).

Apache có rất nhiều dynamic module (module động), Nginx gần đây mới cung cấp. Nginx được sử dụng chủ yếu cho VPS hosting, dedicated hosting, hoặc container cluster. Với các website có lượt truy cập cao có nhu cầu phục vụ rất nhiều nội dung tĩnh hoặc streaming media sẽ hướng tới Nginx.

### Tài liệu tham khảo
https://serverguy.com/comparison/apache-vs-nginx/

https://duongtiendat.com/?p=1549