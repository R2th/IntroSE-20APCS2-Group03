### Giới thiệu:
.htaccess là một tệp cấu hình web sử dụng trên các Apache Web Server. Khi tệp .htaccess được đặt trong thư mục lần lượt được tải Apache Web Server, thì tệp .htaccess được phát hiện và thực thi bởi  Apache Web Server. Các tệp .htaccess này có thể được sử dụng để thay đổi cấu hình của phần mềm Apache Web Server để on/off  các chức năng và tính năng bổ sung mà Apache Web Server phải cung cấp. Các phương tiện này bao gồm chức năng chuyển hướng, ví dụ nếu không tìm thấy tệp 404 hoặc cho các chức năng nâng cao hơn như bảo vệ mật khẩu nội dung hoặc ngăn chặn liên kết hình ảnh...

### Bạn có thể làm được những gì với .htaccess:
.htaccess có thể làm được rất nhiều thứ như: Bảo vệ thư mục mật khẩu, chuyển hướng người dùng 1 cách tự động, tùy chỉnh trang lỗi, thay đổi file extensions. Cấm người dùng bởi IP, Cho phép ip nhất định truy cập vào ứng dụng. dừng danh sách thư mục và sử dụng một tập tin khác như tập tin chỉ mục.
### Tùy chỉnh error page:
Việc tùy chỉnh này cho phép bạn tùy chỉnh các lỗi của mình.(ví dụ file not found) thay vì sử dụng các trang lỗi của máy chủ hoặc không có trang. Nó cũng cho phép bạn tạo tập lệnh để thông báo cho bạn khi có lỗi. ví dụ: (sử dụng tập lệnh PHP trên Trợ giúp quản trị trang web miễn phí để tự động gửi email khi không tìm thấy trang).
Bạn có thể sử dụng các trang lỗi tùy chỉnh cho bất kỳ lỗi nào miễn là bạn trạng thái lỗi của nó là số nào. vd: 404 cho trang không tìm thấy... bằng cách thêm các mục sau vào tệp .htaccess của bạn:
```
ErrorDocument errornumber /file.html
```
### Ví dụ bán muốn chuyển đến trang notfound.html khi mà có lỗi 404 xảy ra:
```
ErrorDocument 404 /notfound.html
```
### Nếu tập tin không nằm tại folder root của ứng dụng bạn có thể chỉ rõ đường dẫn đến thư mục đó như sau:
```
ErrorDocument 500 /errorpages/500.html
```
### Bạn có thể thấy chúng ta thường có 1 vài mã lỗi cơ bản như sau:
```
401 - Authorization Required
400 - Bad request
403 - Forbidden
500 - Internal Server Error
404 - Page not found
```
Tiếp theo những gì mà bạn cần làm là tạo file .htaccess để quản lý khi có lỗi ngoại lệ xảy ra.

### Dừng một thư mục Index được hiển thị
Đôi khi, vì một số lý do nào đó bạn sẽ ko có tệp trong thư mục được chỉ định. Mà bạn không muốn có ai đó nhập thư mục vào trình duyệt sẽ hiển thị ra 1 danh sách đầy đủ các tệp thư mục trong thư mục đó. Điều này có thể là 1 rủi do bảo mật đối với trang web của bạn. Để ngăn chặn điều này .htaccess cung cấp cho bạn 1 tùy chỉnh là:
```
Options -Indexes
```
### Từ chối/Cho phép các địa chỉ ip truy cập vào ứng dụng của bạn:
Trong 1 vài trường hợp, bạn có thể chỉ muốn cho phép những người dùng có địa chỉ ip cụ thể mới có thể truy cập vào trang web cuả bạn.
Tuy nhiên, điều này sẽ chỉ hoạt động nếu không biết địa chỉ ip động, vì vậy đây không phải là cách tốt để hạn chế sử dụng ứng dụng của bạn.
Bạn có thể block 1 địa chỉ ip cụ thể theo cú pháp như sau:
```
deny from 000.000.000.000
```
Bạn có thể cho phép 1 địa chỉ ip sử dụng.
```
allow from 000.000.000.000
```
Nếu bạn muốn từ chối tất cả các truy cập đến thư mục.
```
deny from all
```
Nhưng nó vẫn cho phép các tập lệnh được sử dụng tập tin của bạn.

### Thay thế Index Files
Bạn không hẳn lúc nào cũng muốn sử dụng file index.html làm file index cho 1 một thư mục. Ví dụ: nếu bạn đang sử dụng tệp PHP trong trang web của mình tệp php  trong trang web của mình, bạn có thể muốn index.php chứu không phải là index.html là chỉ mục. Sử dụng file .htaccess sẽ cho phép bạn làm điều này. Bạn có thể đặt bất cứ file nào thành chỉ mục nếu bạn muốn. Vd: faggeroo.blah :)
Các tệp chỉ mục thay thế được nhập vào một danh sách. Máy chủ sẽ hoạt động từ trái qua phải để kiểm tra xem mỗi tệp có tồn tài hay không? Nếu khôn tồn tại sẽ hiển thị danh sách trong thư mục này.( Nếu bạn không tắt tính năng này.)
```
DirectoryIndex index.php index.php3 messagebrd.pl index.html index.htm
```  
### Chuyển hướng
Một trong những tính hữu ích của .htaccess là chuyển hướng yêu cầu đến 1 tệp khác trên cùng một máy chủ hoặc trên 1 trang web hoàn toàn khác. Nó có thể cực kỳ hữu ích nếu bạn thay đổi tê của các tệp của mình nhưng cho phép người dùng vẫn tìm thấy nó. Một cách sử dụng khác. là chuyển hướng đến 1 url khác.Sau đây bạn có  thể được thực hiện để chuyển hướng một tập tin cụ thể:
```
Redirect /location/from/root/file.ext http://www.othersite.com/new/file/location.xyz
```

Bạn cũng có thể chuyển hướng toàn bộ trực tiếp trang web của mình bằng tệp .htaccess, ví dụ: nếu bạn có một thư mục có tên là olddirectory trên trang web của mình và bạn đã thiết lập cùng một tệp trên một trang web mới tại: http://www.newsite.com/newdirectory/ bạn có thể chuyển hướng tất cả các tệp trong thư mục đó mà không phải chỉ định từng tệp lếnh sau đây sẽ cho phép bạn làm điều đó:
```
Redirect /olddirectory http://www.newsite.com/newdirectory
```
Sau đó, mọi yêu cầu đến trang web của bạn dưới đây /olddirectory sẽ được chuyển hướng đến trang web mới, với
thông tin bổ sung trong URL được thêm vào, ví dụ: nếu ai đó nhập vào:
```
http://www.youroldsite.com/olddirecotry/oldfiles/images/image.gif
```
Thì nó sẽ được tự động chuyển đến:
```
http://www.newsite.com/newdirectory/oldfiles/images/image.gif
```
Điều này có thể chứng mình là .htaccess là cực kỳ mạnh  mẽ nếu được sử dụng đúng cách.
### Password Protection
Việc này có thể hiểu là bảo mậ,  mật khẩu trên các trang web. Mặc dù javascript, css .. cũng có thể được bảo mật nhưng .htaccess có thể bảo mật toàn diện vì chỉ ai có mật khẩu mới có thể truy cập vào.
### File .htaccess
Thêm mật khẩu bảo vệ vào một thư mục bằng cách sử dụng .htaccess mất hai bước.
Bước 1: Là thêm các dòng thích hợp vào tệp .htaccess của bạn trong thư mục bạn muốn bảo vệ. Mọi thứ bên dưới thư mục này sẽ được bảo vệ bằng mật khẩu:
```
AuthName "Section Name"
AuthType Basic
AuthUserFile /full/path/to/.htpasswd
Require valid-user

```
The .htpasswd File
Mật khẩu bảo vệ thư mục tốn lỗ lực để cài  đặthơn bất kỳ chức năng .htaccess nào khác bởi vì bạn cũng phải tạo một tệp để chứa tên người dùng và mật khẩu được phép truy cập trang web. Chúng nên được đặt trong một tệp (theo mặc định) nên được gọi là .htpasswd. Giống như tệp .htaccess, đây là một tệp không có tên và phần mở rộng 8 chữ cái. Điều này có thể được đặt ở bất cứ đâu trong trang web của bạn (vì mật khẩu được mã hóa) nhưng nên lưu trữ bên ngoài web root để không thể truy cập nó từ web.
### Nhập tên người dùng và mật khẩu
Khi bạn đã tạo tệp .htpasswd của mình (bạn có thể thực hiện việc này trong trình chỉnh sửa văn bản tiêu chuẩn), bạn phải nhập tên người dùng và mật khẩu để truy cập trang web. Chúng được nhập như sau:
```
username:password
```
Trong đó mật khẩu là định dạng được mã hóa của mật khẩu. Để mã hóa bạn cần sử dụng 1 tập lênh có sẵn trên web hoặc bạn tự viết.  
Bạn có thể nên đây để tạo mật khẩu theo chuẩn KxS Password Encrypter:
```
https://www.htaccesstools.com/htpasswd-generator/
```
Đối với trường hơp có nhiều người dùng bạn chỉ cần thêm các dòng bổ xung:
```
username:password
username1:password1
```
### Truy cập vào ứng dụng.
Khi bạn cố gắng truy cập một trang web đã được bảo vệ bởi .htaccess, trình duyệt của bạn sẽ bật lên hộp thoại yêu cầu nhập username/password. Nếu bạn không thích điều này, có một số tập lệnh nhất định có sẵn cho phép bạn nhúng username/password vào trang web để thực hiện xác thực. Bạn cũng có thể gửi username/password (không được mã hóa) trong URL như sau:
```
http://username:password@www.website.com/directory/
```
Tổng kết lại:

.htaccess là một trong những tệp hữu ích nhất mà quản trị viên web có thể sử dụng. Có rất nhiều cách sử dụng khác nhau cho nó có thể tiết kiệm thời gian và tăng tính bảo mật trên trang web của bạn.

Bài viết của mình đến đây là hết. :) Hẹn gặp lại các bạn trong bài viết tới. :D

Tài liệu tham khảo:

http://www.freewebmasterhelp.com/tutorials/htaccess/1
http://www.freewebmasterhelp.com/tutorials/htaccess/2
http://www.freewebmasterhelp.com/tutorials/htaccess/3