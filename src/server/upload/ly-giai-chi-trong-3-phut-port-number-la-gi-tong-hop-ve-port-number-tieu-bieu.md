***Dịch từ bài viết “【3分で把握】ポート番号とは？と代表的なポート番号まとめ” đăng tải trên trang web eng-entrance ngày 12/10/2016 (link bài viết: https://eng-entrance.com/network-port)***

Hãy tưởng tượng port giống như một cánh cửa dùng để truyền gửi Data trên Internet vậy. Port number chính là số hiệu của cánh cửa đó.

Với mỗi loại chương trình khác nhau, port - cánh cửa ta sử dụng cũng sẽ khác nhau. Ví dụ, có cánh cửa sẽ được sử dụng khi gửi mail, khi nhận mail ta lại dùng một cánh cửa khác, khi xem một trang web ta lại lựa chọn cánh cửa khác nữa, v.v.

Trong bài viết này, tôi sẽ giới thiệu một cách đơn giản về port và port number để ngay cả những người mới bắt đầu cũng có thể dễ dàng hiểu được.

# 1.Port là gì?
Trên thực tế, khi truyền gửi thông tin bằng TCP và UDP, thông tin được truyền tải không phải dưới đơn vị là một máy tính, mà thực hiện dưới đơn vị là Chương trình (program), nói cách khác, việc truyền tải thông tin được thực hiện dưới đơn vị Process và Thread. Vì vậy, cần phải có sự chính xác trong việc truyền tải thông tin giữa các process.

Khi đó, các process đang thực hiện truyền tải thông tin sẽ được cấp port number. Các process và Thread sẽ dựa vào port number này để phân biệt các chương trình nào đang thực hiện việc truyền tin.
## Port number
Nếu nhìn nhận IP address giống như địa chỉ của tòa nhà, vậy port number sẽ chứa thông tin “phòng số bao nhiêu?”. Trong mạng máy tính, bằng việc tổng hợp protocol, IP address và Port number, ta có thể biết được việc truyền tin đang thực hiện bằng phương thức nào, ở đâu và số phòng là bao nhiêu. 

Đối với việc truyền tin, port number có vai trò rất quan trọng. Việc mở một port đồng nghĩa với việc mở một cánh cửa, vì vậy, trên cơ bản, cần phải cài đặt để không mở các port không cần thiết.
# 2.Các port number tiêu biểu và Protocol
Bảng dưới đây liệt kê các ví dụ tiêu biểu của việc Protocol nào sử dụng port number nào.

* TCP 20 : FTP (Data)
* TCP 21 : FTP (Control)
* TCP 22 : SSH
* TCP 23 : Telnet
* TCP 25 : SMTP
* UDP 53 : DNS
* UDP 67 : DHCP（Server）
* UDP 68 : DHCP（Client）
* TCP 80 : HTTP
* TCP 110 : POP3
* UDP 123 : NTP
* TCP 443 : HTTPS
* WELL KNOWN PORT NUMBERS 0~1023

Web server là một ví dụ tiêu biểu về Port, IP address và Protocol.

Trên IP address được công khai trên một server cụ thể, một application dựa trên giao thức HTTP, Apache v.v thực hiện việc truyền tin tới Client thông qua port 80, thông tin trang web được trả về ứng với yêu cầu nhận được.

Các service khác cũng hoạt động tương tự, trên một server định sẵn, application thực hiện theo giao thức nào đó, thông qua port number tùy chọn, hoặc thông qua Well-known port number để cung cấp dịch vụ của mình.
# 3.Well-known Port number
Thực tế, tồn tại các port number từ 0 đến 65535, tuy nhiên, trong số đó, các port number từ 0 đến 1023 được gọi là “Well-known Port Number” và chúng được quản lý bởi tổ chức có tên IANA.

Tên gọi này nghĩa là “Các port number được biết đến rộng rãi”.

Trong số các port number được sử dụng khi truyền tin bằng TCP/IP và UDP, các well-known port number là các số được đặt trước cho việc sử dụng các protocol và service chính.

Các service chính đã định sẵn các port number, ví dụ: HTTP là 80, SSH là 22.

Về mặt bảo mật, đôi khi có trường hợp thay đổi port number, tuy nhiên, trên cơ bản, các service chính này đều sử dụng well-known port number.
# 4.Registered port number
Các port number từ 1024-49151 cũng do IANA quản lý.

Nhóm gồm các port number được sử dụng bởi các application đặc định. IANA tiếp nhận đăng ký và công khai cái port number này.
# 5.Các port number khác
Người dùng có thể tự do sử dụng các port number từ 49152 đến 65535 mà không cần đăng ký với IANA.

Không tồn tại quy tắc “Service nào sử dụng port nào”, do vậy, các port number này có thể tùy ý quản lý và sử dụng.

# 6.Mở port và Security:
Hiện nay, tốc độ xử lý của máy tính rất cao, đồng thời, ngày càng có nhiều các ứng dụng hoạt động như một server có thể chạy được trên máy tính cá nhân.

Với đa phần trường hợp của các ứng dụng có chức năng như một server, máy tính sẽ không chỉ cần đáp lại các thông tin bên trong local mà còn cần xử lý các thông tin từ bên ngoài. Với các ứng dụng server như vậy, việc mở port là yêu cầu tất yếu để có thể cung cấp được dịch vụ.

Tuy nhiên, trường hợp các server application có lỗ hổng bảo mật, tình huống xấu nhất có thể xảy ra là server bị hack hay không thể tiếp tục cung cấp dịch vụ. Do vậy, cần phải thận trọng xem xét các ứng dụng với chức năng sử dụng như server.

Ngoài ra, với các máy tính hoạt động như một server, cần phải xác minh các câu hỏi “Port nào hiện đang được mở?”, “Liệu có port nào bị mở một cách không chủ định hay không?”, v.v.Cần phải tiến hành penetration test, đóng các port, nắm bắt tình hình trước khi đưa vào hoạt động thực tế. 
# 7.Tổng kết
Trong bài viết vừa rồi, tôi đã tổng hợp về port number.

Việc sử dụng well-known port number đôi khi sẽ dẫn đến sự giảm thiểu tính bảo mật, nhưng thông thường, chúng vẫn được ứng dụng rộng rãi.

Chắc hẳn với việc nắm được các khai niệm thường dùng, việc giao tiếp giữa bạn và các engineer sẽ diễn ra thuận lợi hơn đúng không nào?