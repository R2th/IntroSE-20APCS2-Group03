Trước giờ vẫn quản lý con email server mà chưa nắm rõ hoạt động thực sự của hệ thống email làm việc thế nào, nên bài này là để note lại những kiến thức sau khi loanh quanh trên mạng, đọc các bài viết về cách hoạt động của hệ thống email.

Bài viết này tham khảo qua link: https://www.oasis-open.org/khelp/kmlm/user_help/html/how_email_works.html

Về cơ bản hoạt động của mail được mô tả theo hình sau:  

![](https://images.viblo.asia/ce708afb-7922-4727-98c1-590509abaa57.png)

Mình sẽ tìm hiểu hoạt động của email thông qua quá trình một email được gửi đi và nhận về như thế nào:
Giả sử Sơn muốn gửi email cho Minh .

- Sơn sử dụng email client / Web mail ( MUA ) để soạn email, khi đó mail client sẽ kết nối đến SMTP server ( mail server ).
- Tại SMTP server ( mail server ), ứng dụng MTA ( Mail transfer Agent ) sẽ thực hiện quá trình tra cứu DNS. Hệ thống gửi một request để tìm ra MTA tương ứng của Minh nhờ vào bản ghi MX. Trong DNS zone, sẽ có một bản ghi MX khai báo địa chỉ domain của Minh. Sau khi tra cứu DNS, một bản tin response với thông tin về địa chỉ IP của mail server của Minh.  
    Quá trình chuyển tiếp email giữa 2 MTA:  
    Khi gửi email, MTA gửi sẽ xử lý tất cả các vấn đề liên quan đến việc gửi thư cho đến khi email đã được MTA khác nhận hoặc từ chối. Ngay khi, email được gửi đi, nó sẽ đi qua mạng Internet. Mỗi MTA trong mạng Internet khi nhận email đều sẽ tra cứu địa chỉ nhận từ DNS để xác định MTA tiếp theo là đâu. Và hầu hết các email chọn đường đi dựa vào tính khả dụng của MTA, do đó email từ cùng một mail server gửi và nhận cùng ở một mail server khác có thể đi các đường khác nhau. 
- Tiếp đến email sẽ được gửi đi theo những thông tin vừa lấy được thông qua Internet để đến mail server của Minh. 
- Trong quá trình chuyển email thì email sẽ được kiểm tra spam và virus bởi firewall trước khi đi qua firewall. Nếu email có virus thì sẽ được cách ly và thông báo đến cho người gửi. Nếu email được đánh dấu là spam, nó sẽ bị xóa mà không có thông báo đến người gửi. Tuy nhiên là spam khá khó để phát hiện do đó bộ lọc sẽ kiểm tra trên một loạt các tiêu chí.  
- Khi email đã đến mail server của Minh, Minh sẽ phải đăng nhập vào tài khoản email của mình và khi đó sẽ sử dụng một trong các giao thức POP3 hoặc Imap để lấy mail về.  
    + Nếu sử dụng POP3 thì toàn bộ email trên mail server sẽ được tải về máy cá nhân và xóa toàn bộ email đã tải về trên mail server. Tuy nhiên giờ các mail server đều có thêm lựa chọn giữ lại 1 bản copy chứ không xóa.
    + Nếu sử dụng IMAP thì email sẽ vẫn được lưu trữ trên mail server, tuy nhiên sẽ có bản ảnh xạ ( chắc dạng kiểu shortcut ) trên máy cá nhân, khi mình xem email nào thì click vào và khi đó email sẽ được tải về và lưu ở chế độ tạm thời trên máy cá nhân, khi tắt mail client thì bản tạm đó cũng bị xóa đi.
   
   Ngoài ra, trong quá trình gửi/nhận email sẽ có một phần gọi là mail queue tồn tại trên cả mail server gửi và mail server nhận. Nếu có lỗi xảy ra trong quá trình gửi mail thì email đó sẽ được đẩy vào mail queue và chờ để gửi lại sau một khoảng thời gian, quá trình gửi lại email đó sẽ diễn ra đến khi mail gửi thành công. Và khi có lỗi trong quá trình gửi mail thì người gửi sẽ nhận được 1 mail phản hồi về lỗi. Đây là lý do đôi lúc chúng ta nhận được những email phản hồi lại từ mail server người nhận. Trong email đó sẽ giải thích về lý do lỗi.
   
Hoạt động của Mail List:  
Một mail list khá giống với kiểu alias vì nó hoạt động bằng cách gửi email nó nhận được đến 1 danh sách thành phần bên trong, tuy nhiên vẫn có điểm khác vì Mail list có khả năng áp dụng các quy tắc phức tạp để xác định cách thức forward email nó nhận được, còn alias đơn giản chỉ là forward các email nó nhận được. 
   
To be continued :)