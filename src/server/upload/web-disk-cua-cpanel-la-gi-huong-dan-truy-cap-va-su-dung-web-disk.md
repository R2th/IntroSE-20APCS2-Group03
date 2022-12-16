### **Web Disk cPanel là gì?**

Web Disk (tạm dịch là: đĩa web) là ổ đĩa có dung lượng lớn để lưu giữ thông tin/dữ liệu của một website.

[Web Disk cPanel](https://documentation.cpanel.net/display/74Docs/Web+Disk) là đĩa web dùng trên giao diện cPanel với những tính năng vượt trội nhất định.

### Người dùng được gì khi sử dụng Web Disk?

Trong thời đại công nghệ 4.0, thông tin và tốc độ/hiệu suất luôn được đánh giá hàng đầu, nhất là trong lĩnh vực kinh doanh. Do đó, việc ra đời của Web Disk là một giải pháp hữu hiệu để đơn giản hoá quá trình, nhanh gọn hoá thao tác, tiết kiệm thời gian mà hiệu quả rất cao, đặc biệt là với lượng lớn người dùng phổ thông.

Thông thường, khi bạn muốn upload một file lên hosting, bạn phải:

* Bật trình duyêt web, đăng nhập tên miền hoặc địa chỉ IP thông qua cổng 2083.
* Sau đó, bạn ấn vào File Manager và tìm đến thư mục cần up, chọn file.
* Tìm file trong máy tính
* Cuối cùng mới upload.

Công nghệ phát triển luôn đi đôi với sự đồng bộ hóa và cả 4 bước sẽ “bỗng chốc thu bé lại”, vừa bằng vài thao tác đơn giản:

Bật thư mục đã kết nối sẵn khi tải từ [host](https://tinohost.com/) cPanel về, đăng nhập.
Tìm file, Copy => Paste.
Vậy là bạn đã upload thành công một file trong Web Disk cPanel rồi đấy!

## Hướng dẫn truy cập và sử dụng Web Disk trong cPanel

### Các bước truy câp Web Disk trong cPanel:

Bước 1: Sau khi đã đăng nhập thành công Cpanel, bạn click chọn Web Disk.

![](https://images.viblo.asia/5acae0f0-0405-47fc-840a-4bda4ef599e7.png)

Bước 2: Một giao diện mới sẽ hiện ra, bạn click chọn Access Web Disk
![](https://images.viblo.asia/6eead2a8-7569-4b65-a5fa-93b4c110c3e4.png)

Bước 3:  Ở bước này, bạn chọn hệ điều hành mà bạn đang dùng (Apple, Windows, Linux). Trong bài viết, Tinohost chọn hệ điều hành Windows XP. Sau chọn xong hệ điều hành, bạn click chọn Go.

![](https://images.viblo.asia/2c993df0-4ffb-4258-875a-6078a78ac138.png)

Bước 4: Sau khi bạn hoàn thành thao tác, một bảng thông báo hiện ra hỏi bạn có muốn mở hay lưu file không? Bạn click chọn Save.

![](https://images.viblo.asia/f6eb20e2-57e3-43e4-9f11-f8aa6fb96ef7.png)

Tiếp theo bạn chọn thư mục để lưu file. Thông thường, cPanel mặc định, bạn click chọn Save -> Open -> Run.

### Hướng dẫn sử dụng Web Disk trong cPanel:

Login : Tên đăng nhập của tài khoản Web Disk.
Directory :
– Chọn  đường dẫn tới thư mục để tới thư mục đó.
– Chọn  biểu tượng cái bút để sửa đường dẫn của thư mục mà tài khoản trên .
– Chọn  hình ổ khóa để tới trang cài đặt mật khẩu cho thư mục web (Directory Privacy) tạo hoặc xóa tài khoản truy cập thư mục web.
Chú ý: Mật khẩu này là đặt mật khẩu cho truy cập từ phía người dùng truy cập trang web, chứ nó không liên quan gì tới quyền truy cập của tài khoản Web Disk cả.

Các thao tác: 
– Chọn   Enable Digest Authentication để bật mã hóa Digest Authentication như đã nói ở phần trên. Bạn phải nhập mật khẩu để làm điều này.
– Chọn  Change Password để đổi mật khẩu tài khoản Web Disk .
– Chọn  Delete và xác nhận để xóa tài khoản Web Disk.
– Chọn  Biểu tượng bánh răng để thay đổi quyền của tài khoản Web Disk. Gồm 2 quyền sau thay đổi qua lại sau mỗi lần ấn.
Read-Write — Cho phép toàn quyền truy cập dữ liệu trong các thư mục.
Read-Only — Chỉ cho phép đọc, tải, và liệt kê danh sách các tập tin trong thư mục.

### Quản lý tài khoản Web Disk trong cPanel:

CPanel bảo mật Web Disk bằng tài khoản xác thực Web Disk Digest.  Khi bạn thay đổi tên người dùng/tài khoản Web Disk, bạn phải kích hoạt lại tài khoản xác thực Digest.  Những file lưu hoặc digestshadow sẽ lưu trữ tên người dùng của tài khoản xác thực, nếu bạn thay đổi tên người dùng, hệ thống sẽ xoá mật khẩu ra khỏi file lưu.

Lưu ý:  Các bản cập nhật cho miền liên kết của tài khoản Web Disk cũng thay đổi theo  tên người dùng và vô hiệu hóa Xác thực Digest.

### Khi nào cần Xác thực Digest?

**Bạn phải bật Xác thực Digest nếu:**

* Bạn sử dụng Windows® Vista, Windows® 7 hoặc Windows® 8 hoặc Windows® 10
* Bạn truy cập Đĩa Web qua một văn bản mà kết nối không được mã hóa.

**Bạn không cần bật Xác thực Digest nếu bạn đáp ứng các điều kiện sau:**

* Tên miền có chứng chỉ [SSL](https://tinohost.com/ssl/) mà cơ quan chứng nhận được công nhận đã ký.
* Bạn có thể kết nối với Đĩa Web bằng SSL qua cổng 2078.
* Nếu bạn sử dụng Windows XP hoặc Vista, bạn có thể cần tải xuống một bản patch từ trang web của Microsoft để sử dụng Web Disk mà không gặp lỗi.
* Nếu bạn sử dụng Windows 7, dung lượng ổ đĩa mà hệ thống báo cáo và dung lượng ổ đĩa thực đôi khi có sự khác biệt vì lúc đó, giao thức WebDAV mà Web Disk sử dụng không thể truy vấn dung lượng đĩa của máy chủ.