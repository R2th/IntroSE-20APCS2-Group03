SCP (secure copy) là một tiện ích dòng lệnh cho phép bạn sao chép an toàn các tệp và thư mục giữa hai vị trí.
Với SCP bạn có thể copy file hoặc thư mục:
+ From your local system to a remote system.
+ From a remote system to your local system.
+ Between two remote systems from your local system
Khi truyền dữ liệu bằng scp, cả tệp và mật khẩu đều được mã hóa để bất kỳ ai theo dõi lưu lượng truy cập đều không nhận được bất kỳ thông tin nhạy cảm nào.
Trong bài viết này, tôi sẽ chỉ cho bạn cách sử dụng lệnh scp thông qua các ví dụ thực tế và giải thích chi tiết về các tùy chọn scp phổ biến nhất.
## SCP Command Syntax
Cú pháp lệnh scp có dạng sau:
```
scp [OPTION] [user@]SRC_HOST:]file1 [user@]DEST_HOST:]file2
```
+ OPTION: các tùy chọn scp như mật mã, cấu hình ssh, cổng ssh, giới hạn… v.v. Xem chi tiết [tại đây](https://linux.die.net/man/1/scp)
+ [user@]SRC_HOST:]file1 - Source file
+ [user@]DEST_HOST:]file2 - Destination file
Local files phải được chỉ định bằng đường dẫn tuyệt đối hoặc tương đối, trong khi remote file phải bao gồm thông số kỹ thuật của người dùng và máy chủ.
- SCP cung cấp một số tùy chọn kiểm soát mọi khía cạnh của hành vi của nó. Các tùy chọn được sử dụng rộng rãi nhất là:
+ -P : Chỉ định cổng ssh máy chủ từ xa.
+ -p : Duy trì thời gian sửa đổi và truy cập file
+ -q : Sử dụng tùy chọn này nếu bạn muốn loại bỏ đo lường tiến trình và thông báo không lỗi.
+ -C : Tùy chọn này buộc scp nén dữ liệu khi nó được gửi đến máy đích
+ -r : Tùy chọn này yêu cầu scp sao chép các thư mục một cách đệ quy.
## Before you Begin
Lệnh scp dựa vào ssh để truyền dữ liệu, vì vậy nó yêu cầu khóa ssh hoặc mật khẩu để xác thực trên hệ thống từ xa.
Dấu hai chấm (:) là cách scp phân biệt giữa các vị trí cục bộ và từ xa.
Để có thể sao chép tệp, ít nhất bạn phải có quyền đọc trên tệp nguồn và quyền ghi trên hệ thống đích.
Hãy cẩn thận khi sao chép các tệp có cùng tên và vị trí trên cả hai hệ thống, scp sẽ ghi đè tệp mà không có cảnh báo
Khi chuyển các tệp lớn, bạn nên chạy lệnh scp bên phiên tmux.
## Copy Files and Directories Between Two Systems with scp 
### Copy a Local File to a Remote System with the scp Command
Để sao chép tệp từ cục bộ sang hệ thống từ xa, hãy chạy lệnh sau:
```
scp file.txt remote_username@10.10.0.2:/remote/directory
```
Trong đó file.txt là tên của tệp chúng ta muốn sao chép, remote_username là người dùng trên máy chủ từ xa, 10.10.0.2 là địa chỉ IP của máy chủ. Thư mục / remote / là đường dẫn đến thư mục bạn muốn sao chép tệp vào. Nếu bạn không chỉ định thư mục từ xa, tệp sẽ được sao chép vào thư mục chính của người dùng từ xa
Bạn sẽ được nhắc nhập mật khẩu người dùng và quá trình chuyển sẽ bắt đầu.
```
remote_username@10.10.0.2's password:
file.txt                             100%    0     0.0KB/s   00:00
```
Bỏ qua tên tệp khỏi vị trí đích sẽ sao chép tệp với tên gốc. Nếu bạn muốn lưu tệp dưới một tên khác, bạn cần chỉ định tên tệp mới:
```
scp file.txt remote_username@10.10.0.2:/remote/directory/newfilename.txt
```
Nếu SSH trên máy chủ từ xa đang lắng nghe trên một cổng khác với cổng 22 mặc định thì bạn có thể chỉ định cổng bằng cách sử dụng đối số -P:
```
scp -P 2322 file.txt remote_username@10.10.0.2:/remote/directory
```
Lệnh sao chép một thư mục cũng giống như khi sao chép tệp. Sự khác biệt duy nhất là bạn cần sử dụng cờ -r cho đệ quy.
Để sao chép thư mục từ hệ thống cục bộ sang hệ thống từ xa, hãy sử dụng tùy chọn -r:
```
scp -r /local/directory remote_username@10.10.0.2:/remote/directory
```
### Copy a Remote File to a Local System using the scp Command
Để sao chép tệp từ điều khiển từ xa vào hệ thống cục bộ, hãy sử dụng vị trí từ xa làm nguồn và vị trí cục bộ làm đích.
Ví dụ: để sao chép tệp có tên file.txt từ máy chủ từ xa có IP 10.10.0.2, hãy chạy lệnh sau:
```
scp remote_username@10.10.0.2:/remote/file.txt /local/directory
```
### Copy a File Between Two Remote Systems using the scp Command
Không giống như rsync, khi sử dụng scp, bạn không phải đăng nhập vào một trong các máy chủ để chuyển tệp từ máy này sang máy khác từ xa.
Lệnh sau sẽ sao chép tệp /files/file.txt từ máy chủ lưu trữ từ xa host1.com vào thư mục / tệp trên máy chủ lưu trữ từ xa host2.com.
```
scp user1@host1.com:/files/file.txt user2@host2.com:/files
```
Bạn sẽ được nhắc nhập mật khẩu cho cả hai tài khoản từ xa. Dữ liệu sẽ được chuyển trực tiếp từ máy chủ từ xa này sang máy chủ khác.

Trong hướng dẫn này, bạn đã học cách sử dụng lệnh scp để sao chép tệp và thư mục. Hy vọng có thể giúp mọi người.
Happy coding!
Link tham khảo: https://linuxize.com/post/how-to-use-scp-command-to-securely-transfer-files/