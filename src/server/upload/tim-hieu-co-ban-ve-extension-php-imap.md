## Mở Đầu
Với sự phát triển chóng mặt và sự tiện lợi của các framework hiện nay thì việc tìm ra được một thư viện để hỗ trợ việc lấy mail từ Google, Yahoo... là không quá khó. Tuy nhiên, số nhiều chúng ta thường chỉ quan tâm vào việc các thư viên đó dùng như nào và hỗ trợ tốt cho các chức năng mình cần mà không hề quan tâm đến sâu bên trong các thư viện đó đang hoạt động như nào (ngay cả mình cũng thế :D). Tuy nhiên khi nói đến đây, mình đoán nhiều bạn sẽ bảo: "Tại sao phải cần đi sâu vào core của các thư viện ?. Thư viên sinh ra thì mình cứ dùng thôi".  Và đến một ngày, dự án yêu cầu chức năng lấy mail từ Google, Yahoo... về hệ thống, với một thư viện thì việc đó đã được hỗ trợ tận răng, tuy nhiên đời không như là mơ khi vấn đề xảy ra với một số lượng mail lớn, thư viện dùng rất chậm và đôi khi time-out. Lúc này yêu cầu là phải cải thiện lại tốc độ lấy mail, không còn cách nào khác mình đã phải nhảy vào đọc core của thư viện đó và phát hiện ra nó dùng một extension của PHP để lấy mail từ hệ thống. Đó chính là **php-imap**.

## Định Nghĩa và Các Hàm Cơ Bản Trong php-imap
**php-imap** là một extension cho phép bạn hoạt động với giao thức IMAP, cũng như các phương thức truy cập hộp thư cục bộ NNTP, POP3 và cục bộ.

- **imap_open**: mở một kết nối đến hòm thư. Chức năng này cũng có thể được sử dụng để mở luồng đến máy chủ POP3 và NNTP, nhưng một số chức năng và tính năng chỉ khả dụng trên máy chủ IMAP.
Kết nối sẽ trả về kết nối IMAP khi kết nối thành công và FALSE khi thất bại.
```
imap_open ( string $mailbox , string $username , string $password [, int $options = 0 [, int $n_retries = 0 [, array $params = array() ]]] ) : resource
```
```$mailbox``` là đường link dẫn đến hòm thư bạn muốn lấy dữ liệu.
VD: {localhost:993/imap/ssl}INBOX

```$username``` là tên đăng nhập của tài khoản mail của bạn.

```$password``` là mật khẩu của tài khoản mail của bạn.

- **imap_check** kiểm tra thông tin của hòm mail bạn đang kết nối
```
imap_check ( resource $imap_stream ) : object
```
```$imap_stream``` chính là kết quả trả về sau khi bạn connect đến hòm mail bởi ```imap_open```.
Hàm sẽ trả về thông tin như: 

```Date```: thời gian hệ thống hiện tại được định dạng theo »RFC2822

```Driver```: giao thức được sử dụng để truy cập hộp thư này: POP3, IMAP, NNTP

```Mailbox```:  Tên hòm thư

```Nmsgs```: Số lượng mail đang có trong hòm thư

```Recent```: số lượng mail gần đây trong hòm thư

- **imap_fetch_overview**: Đọc tổng quan về thông tin trong các tiêu đề của tin nhắn đã cho.
Sau khi đã kết nối và kiểm tra hòm thư, tiếp đến ta bắt đầu lấy thông tin tổng quát của các mail trong hòm thư của bạn.
```
imap_fetch_overview ( resource $imap_stream , string $sequence [, int $options = 0 ] ) : array
```
```$imap_stream``` chính là kết quả trả về sau khi bạn connect đến hòm mail bởi ```imap_open```.

```$sequence``` Một mô tả trình tự tin nhắn. Bạn có thể liệt kê các tin nhắn mong muốn bằng cú pháp X, Y hoặc truy xuất tất cả các tin nhắn trong một khoảng thời gian với cú pháp X: Y (X và Y là số tin nhắn)
ví dụ: Sequence: 1:10 nghĩa là bạn sẽ lấy mail có số tin nhắn 1 đến mail có số tin nhắn 10

```$options``` squence sẽ chứa một chuỗi các chỉ số thông báo hoặc UID, nếu tham số này được đặt thành FT_UID.
- **imap_headerinfo**: lấy thông tin header của mail 
```
imap_headerinfo ( resource $imap_stream , int $msg_number [, int $fromlength = 0 [, int $subjectlength = 0 [, string $defaulthost = NULL ]]] ) : object
```
```$imap_stream```: hính là kết quả trả về sau khi bạn connect đến hòm mail bởi ```imap_open```.

```$msg_number```: số tin nhắn
- **imap_fetchbody**: Lấy một phần cụ thể của phần thân của các thông báo đã chỉ định. Các bộ phận cơ thể không được giải mã bởi chức năng này.
```
imap_fetchbody ( resource $imap_stream , int $msg_number , string $section [, int $options = 0 ] ) : string
```

```$imap_stream```: hính là kết quả trả về sau khi bạn connect đến hòm mail bởi ```imap_open```.

```$msg_number```: số tin nhắn

``$section```: Số phần. Đó là một chuỗi các số nguyên được phân tách theo khoảng thời gian chỉ mục vào danh sách bộ phận cơ thể theo thông số kỹ thuật của IMAP4

```$options```: squence sẽ chứa một chuỗi các chỉ số thông báo hoặc UID, nếu tham số này được đặt thành FT_UID.

- **imap_close**: đóng kết nối IMAP 
```
imap_close ( resource $imap_stream [, int $flag = 0 ] ) : bool
```

Trên là các hàm cơ bản mình đã tìm hiểu áp dụng để lấy được thông tin mail từ Gmail, Yahoo.... Còn rất nhiều hàm hỗ trợ của php-imap extension. Các bạn có thể tìm hiểu thêm qua link tham khảo dưới: 

[https://www.php.net/manual/en/book.imap.php](https://www.php.net/manual/en/book.imap.php)