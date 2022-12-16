# Lời nói đầu
Mình thường thấy NGINX dùng trong các dự án, và dự án hiện tại của mình cũng đang dùng. Sau khi được các anh em bro support config các thứ thì cũng dùng được dù chưa hiểu lắm. Cho nên mình quyết định tự tìm hiểu về NGINX và chia sẽ trong bài viết này.
Trong bài viết này sẽ chỉ giới thiệu NGINX và nói về NGINX server và so sánh nó với Apache server.

Mình cũng tham khảo từ nhiều nguồn tổng hợp lại, nếu có gì sai sót mong mọi người thông cảm :D


# NGINX là gì?
![](https://images.viblo.asia/feecc775-82fb-4bec-9e83-0239e45d8b1b.jpg)

NGINX, đọc là “engine-ex”  là một phần mềm web server mã nguồn mở nỗi tiếng. Ban đầu nó dùng để phục vụ web HTTP. Tuy nhiên, ngày nay nó cũng được dùng làm reverse proxy, HTTP load balancer và email proxy như IMAP, POP3, và SMTP.

NGINX xuất bản chính thức vào tháng 10 năm 2004. Nhà sáng lập của phần mềm này là Igor Sysoev, triển khai dự án từ năm 2002 để giải quyết vấn đề C10k. C10k là giới hạn của việc xử lý 10 ngàn kết nối cùng lúc. Ngày nay, có nhiều web server còn phải chịu nhiều kết nối hơn vậy để xử lý. NGINX sử dụng kiến trúc hướng sự kiện (event-driven) không đồng bộ (asynchronous). Tính năng này khiến NGINX server trở nên đáng tin cậy, tốc độ và khả năng mở rộng lớn nhất.

Vì khả năng mạnh mẽ, và để có thể xử lý hàng ngàn kết nối cùng lúc, nhiều website có traffic lớn đã sử dụng dịch vụ NGINX. Một vài trong số những ông lớn công nghệ dùng nó là Google, Netflix, Adobe, Cloudflare, WordPress, và còn nhiều hơn nữa.

# NGINX server hoạt động như thế nào?
Trước khi học về NGINX, chúng ta cần biết cách web server hoạt động thế nào đã. Ví dụ như, khi ai đó gửi một yêu cầu để mở một trang web. Trình duyệt sẽ liên lạc với server chứa website đó. Sau đó, server sẽ tìm kiếm đúng file yêu cầu của trang đó và gửi ngược về cho server. Đây là một loại truy vấn đơn giản nhất.

Ví dụ trên được xem như là một single thread – một bộ các bước xử lý dữ liệu được thực thi theo 1 trình tự duy nhất. Web server truyền thống tạo một thread cho mỗi yêu cầu (request). NGINX thì hoạt động theo một cách khác. Nó hoạt động theo kiến trúc bất đồng bộ (asynchronous), hướng sự kiện (event driven). Kiến trúc này có thể hiểu là những threads tương đồng nhau sẽ được quản lý trong một tiến trình (process), và mỗi tiến trình hoạt động chưa các thực thể nhỏ hơn gọi là worker connections. Cả bộ đơn vị này chịu trách nhiệm xử lý các threads.

Worker connections sẽ gửi các truy vấn cho một worker process, worker process sẽ gửi nó tới process cha (master process). Cuối cùng, master process sẽ trả kết quả cho những yêu cầu đó.

Điều này có vẻ đơn giản, một worker connection có thể xử lý đến 1024 yêu cầu tương tự nhau. Vì vậy, NGINX có thể xử lý hàng ngàn yêu cầu mà không gặp rắc rối gì. Đây cũng là lý do vì sao NGINX tỏ ra hiệu quả hơn khi hoạt động trên môi trường thương mại điện tử, trình tìm kiếm, và cloud storage.

# NGINX Server vs Apache Server
Bên cạnh các web server phổ biến, Apache là một trong những đối thủ chính của NGINX. Nó đã tồn tại lâu từ thập niên 90 và có cộng đồng người dùng rất lớn. 

![](https://images.viblo.asia/a8d92d71-faff-4538-8e4a-bd4dbfbc9217.png)


So sánh cơ bản giữa NGINX server và Apache server

- Hệ điều hành hỗ trợ: Tương thích là một trong số ít các vấn đề bạn nên xem trong khi chọn phần mềm. Cả NGINX và Apache đều có thể chạy trên nhiều hệ điều hành khác nhau của hệ thống Unix. Nhưng không may là, hiệu năng của NGINX trên Windows lại tỏ ra kém hiệu quả hơn khi hoạt động trên các platform khác.

- Hỗ trợ người dùng: Người dùng, từ người mới bắt đầu đến chuyên gia, đều cần một nơi tốt, một cộng đồng ổn để cùng nhau hợp tác xử lý vấn đề phát sinh. Mặc dù cả NGINX và Apache đều có hệ thống mailing hỗ trợ và diễn đàn Stack Overflow, nhưng Apache lại thiếu hỗ trợ từ chính công ty của nó, Apache Foundation.

- Hiệu năng: NGINX xử lý cùng lúc 1000 kết nối tới nội dung tĩnh nhanh hơn 2 lần so với Apache và dùng ít bộ nhớ hơn. Khi so về hiệu năng trên nội dung động, cả 2 nền tảng cho tốc độ giống nhau. NGINX là lựa chọn tốt hơn cho những ai có website tĩnh nhiều hơn.

# Lời kết
Cuối cùng, cảm ơn mọi người đã đọc!!