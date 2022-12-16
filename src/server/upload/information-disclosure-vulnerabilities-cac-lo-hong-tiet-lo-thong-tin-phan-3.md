## III. Phân tích và khai thác các lỗ hổng tiết lộ thông tin - Information disclosure vulnerabilities
### 6. Thông tin tiết lộ qua các phương thức giao tiếp HTTP

Khi truy cập và trao đổi dữ liệu với một trang web, hai phương thức chúng ta thường sử dụng là **GET** và **POST**. Bên cạnh đó, nếu trang web cho phép sử dụng các phương thức khác, có thể chứa nguy cơ tiết lộ một số thông tin nhạy cảm.

- Phương thức **OPTIONS** được sử dụng để mô tả các tùy chọn giao tiếp (phương thức HTTP) có sẵn cho tài nguyên đích.

- Phương thức **TRACE** nhằm mục đích kiểm tra và gỡ lỗi, hướng dẫn máy chủ web phản ánh thông báo đã nhận và trả lại máy khách. Phương thức này dường như vô hại nhưng có thể được tận dụng thành công trong một số trường hợp để lấy cắp thông tin đăng nhập của người dùng.

Bên cạnh đó, có một số header (tiêu đề) cho phép ghi đè phương thức HTTP như: **X-HTTP-Method**, **X-HTTP-Method-Override**, **X-Method-Override**, ...

#### Phân tích lab [Authentication bypass via information disclosure](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-authentication-bypass)

![](https://i.imgur.com/0aOtcGg.png)

**Miêu tả:** Giao diện administrator của trang web chứa lỗ hỏng xác thực và có thể khai thác bằng các lỗ hổng qua phương thức HTTP. Chúng ta cần truy cập vào trang admin panel từ đó xóa tài khoản người dùng `carlos`. Chúng ta được cung cấp một tài khoản hợp lệ `wiener:peter` cho mục đích kiểm thử.

Trước hết, đăng nhập với tài khoản `wiener:peter`:

![](https://i.imgur.com/HTLZfDx.png)

Chúng ta cần tìm kiếm đường dẫn tới trang admin panel. Vào **Target**, trong mục **Site map**, click chuột phải vào URL trang web đang sử dụng, chọn **Engagement tools** và chọn **Discover content** - đây là tính năng quét thư mục của **Burp Suite**.

![](https://i.imgur.com/gZ3NGh5.png)

Click chọn **Session is not running**

![](https://i.imgur.com/XeuJrfK.png)

Phát hiện đường dẫn tới admin panel là `admin`

![](https://i.imgur.com/wmaRHso.png)

Truy cập tới admin panel nhận được thông báo:

![](https://i.imgur.com/yXiZN9g.png)

Giao diện admin chỉ cho phép người dùng local. Xét request truy cập tới `/admin`:

![](https://i.imgur.com/uSIDHiJ.png)

Status code trả về là **401 Unauthorized**. Đổi phương thức sang **TRACE**, thu được response:

![](https://i.imgur.com/1rMbaGw.png)

Chú ý header **X-Custom-IP-Authorization: 183.81.120.97**

![](https://i.imgur.com/OTkCliq.png)

Đây là header xác định IP người dùng. Bởi vậy, để trở thành local user, có thể sử dụng header này với IP 127.0.0.1 giả mạo local user.

![](https://i.imgur.com/TdF0z84.png)

Truy cập tới admin panel thành công. Thực hiện xóa tài khoản người dùng `carlos`:

![](https://i.imgur.com/9AeAFZn.png)

Thử thách hoàn thành:

![](https://i.imgur.com/3WXV7Mf.png)

### 7. Thông tin tiết lộ qua lịch sử phiên bản mã nguồn

Khi các nhà phát triển sử dụng git làm công cụ kiểm soát các phiên bản mã nguồn, sau khi khởi tạo mã nguồn lưu trong một thư mục, sẽ xuất hiện một thư mục ẩn có tên `.git` trong thư mục đó. Thư mục này lưu trữ một loạt các thông tin chẳng hạn như: tất cả các phiên bản của toàn bộ mã nguồn. Nếu máy chủ đặt thư mục `.git` trong thư mục web, nó có thể khiến kẻ tấn công đọc được các thông tin từ đó lấy được tất cả mã nguồn của ứng dụng.

Chúng ta có thể phát hiện các ứng dụng tiết lộ tệp git bằng cách thêm `/.git` hoặc `/.git/HEAD` vào sau URL. Ngoài ra cũng có thể sử dụng các công cụ quét thư mục.

#### Phân tích lab [Information disclosure in version control history](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-in-version-control-history)

![](https://i.imgur.com/onaP8gW.png)

**Miêu tả:** Trang web tiết lộ một số thông tin nhạy cảm qua các công nghệ kiểm soát phiên bản lịch sử mã nguồn. Chúng ta cần khai thác, tìm kiếm mật khẩu người dùng `administrator`, từ đó xóa tài khoản người dùng `carlos`.

Thêm `/.git` vào sau URL trang web, giao diện trả về các chỉ mục file:

![](https://i.imgur.com/SzDpSVG.png)

Đây là dấu hiệu cho thấy trang web sử dụng công nghệ git quản lý mã nguồn và đang bị lộ thông tin tại thư mục `/.git`.

Ở đây, tôi sử dụng hệ điều hành Linux để khai thác lỗ hổng này. Sử dụng lệnh `wget -r https://example-website/.git` để crawl toàn bộ dữ liệu về:

![](https://i.imgur.com/dLA1wOY.png)

Di chuyển vào thư mục `.git`:

![](https://i.imgur.com/nLZgxr5.png)

Di chuyển vào thư mục `logs`, đọc file `HEAD`:

![](https://i.imgur.com/y9K94vQ.png)

Nội dung cho thấy hai commit:

- Commit ban đầu có nội dung: Add skeleton admin panel.
- Commit cuối cùng có nội dụng: Remove admin password from config.

Hai commit này có giá trị hash khác nhau, điều đó chứng tỏ có sự biến động trong nội dung file. Qua nội dung commit chúng ta biết mật khẩu administrator đã bị xóa mất, chúng ta cần tìm cách khôi phục lại mật khẩu này. Ở đây chúng ta chỉ cần chú ý tới commit đầu tiên (chứa mật khẩu administrator).

Sử dụng lệnh `git cat-file` để xem chi tiết nội dung, kiểu, thông tin:

![](https://i.imgur.com/AAeGz2u.png)

Sử dụng lệnh `git ls-tree` để liệt kê các nội dung của đối tượng tree:

![](https://i.imgur.com/ykkOO3n.png)

Sử dụng lệnh `git cat-file` để đọc nội dung:

![](https://i.imgur.com/RTwywW0.png)

Ở đây, chúng ta đọc được nội dung từ tệp gốc `admin.conf` và thu được mật khẩu administrator là **76w0xq627nrmpgmlscq5**.

Đăng nhập với tài khoản `administrator:76w0xq627nrmpgmlscq5`:

![](https://i.imgur.com/TSzWhTu.png)

Xóa người dùng `carlos`:

![](https://i.imgur.com/TZn9lTX.png)

Thử thách hoàn thành:

![](https://i.imgur.com/CAnuU5V.png)

Bên cạnh công nghệ Git quản lý mã nguồn, chúng ta còn có một số công nghệ khác như: Hệ thống quản lý version Subversion (SVN - được giới thiệu vào năm 2000 bởi công ty CollabNet) cùng với một số công nghệ khác có thể nhận biết dựa vào các dấu hiệu trong mỗi trường hợp cụ thể, ...

### 8. Thông tin tiết lộ qua giá trị các tham số

Một số trang web hiển thi giao diện tương ứng với từng người dùng dựa vào các tham số truyền tới hệ thống. Chẳng hạn giao diện hồ sơ của người dùng `peter` được xác nhận qua tham số `user` với URL như sau:

`https://example-website/user/profile?user=peter`

Điều này cũng có thể coi là một dạng lổ hổng tiết lộ thông tin, bởi nếu hệ thống không thực hiện phân quyền chặt chẽ, người dùng hoàn toàn có thể thay đổi giá trị tham số `user` thành tên người dùng khác:

`https://example-website/user/profile?user=victim_username`

từ đó có thể truy cập giao diện của người dùng khác - trường hợp này còn được gọi là lỗ hổng kiểm soát truy cập (Access control vulnerability).

- [https://portswigger.net/web-security/information-disclosure](https://portswigger.net/web-security/information-disclosure)
- [https://en.wikipedia.org/wiki/List_of_HTTP_header_fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)
- [https://www.w3schools.com/tags/ref_httpmethods.asp](https://www.w3schools.com/tags/ref_httpmethods.asp)
- [https://git-scm.com/docs/git](https://git-scm.com/docs/git)