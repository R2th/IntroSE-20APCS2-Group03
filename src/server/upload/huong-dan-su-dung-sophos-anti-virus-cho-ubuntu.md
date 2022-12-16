## Mở đầu
Phần mềm diệt virus Sophos cho Linux là một giải pháp miễn phí tuyệt vời. Máy quét virus, Trojan và phần mềm độc hại có tính năng phát hiện dựa trên heuristics mạnh mẽ, có cả quét theo yêu cầu và thời gian thực. Sophos cũng ngăn chặn và loại bỏ phần mềm độc hại trên Android, Windows và Mac.<br>
Điều làm cho Sophos trở thành một trong những lựa chọn hàng đầu cho việc diệt virus là hiệu suất của nó. Ứng dụng chống virus miễn phí có trọng lượng nhẹ này thậm chí có cập nhật tương đối nhỏ, chỉ chiếm 50 KB.<br>
Tính năng, đặc điểm:
* Nhẹ
* Miễn phí
* Hiệu suất cao
* Khả năng tương thích với nhiều tảng rộng
* Chặn và loại bỏ phần mềm độc hại không phải Linux
## I. Hướng cài đặt
Truy cập trang web Sophos và tải xuống bản cài đặt mới nhất của Sophos Antivirus cho Ubuntu. Bạn có thể phải chấp nhận các điều khoản của họ và cung cấp email trong quá trình đăng ký miễn phí. <br>
Đường dẫn tải miễn phí bộ cài: <br>
https://www.sophos.com/en-us/products/free-tools/sophos-antivirus-for-linux.aspx<br>
Truy cập vào thư mục mới download file cài đặt về và giải nén:<br>
- Giải nén:   ` tar -xvzf sav-linux-free-9.tgz`
- Cài đặt:      `sudo ./sophos-av/install.sh`
<br>Sau khi chạy lệnh cài đặt, sẽ hiện lên điều khoản sử  dụng của Sophos, chúng ta có thể bỏ qua bằng cách giữ phím Space để lướt qua.
<br>Khi được hỏi:
* Do you accept the licence? Yes(Y)/No(N) => Chọn Y và Enter.
* Where do you want to install Sophos Anti-Virus? [/opt/sophos-av] => Enter
* Do you want to enable on-access scanning? Yes(Y)/No(N) [Y] => Enter
* Which type of auto-updating do you want? From Sophos(s)/From own server(o)/None(n) [s] => Enter
* Do you wish to install the Free (f) or Supported (s) version of SAV for Linux? [s] => Chọn f và Enter
* Do you need a proxy to access Sophos updates? Yes(Y)/No(N) [N] => Enter
Sau đó chờ cho Sophos cài đặt tới khi báo hoàn tất.
<br><div align="center">![alt](https://images.viblo.asia/ba826e96-8412-4355-ab8c-c0c269476abc.PNG)</div>
## II. Hướng dẫn quét
### 1. Lưu ý trước khi quét
- Đăng nhập vào máy tính với quyền root để sử dụng tất cả các lệnh savscan.
- Đường dẫn mặc định cài đặt Sophos Antivirus là:
   <br>` /opt/sophos-av/`
- Mặc định Sophos antivirus chỉ quét các tệp thực thi.
### 2. Các lệnh quét
- Quét toàn bộ máy tính sử dụng lệnh:
   <br>`savscan /`
- Quét thư mục hoặc tệp tin cụ thể: Chỉ định đường dẫn tới thư mục hoặc tập tin cần quét.
<br>Ví dụ:
    <br>`savscan /usr/mydirectory/myfile` 
- Quét tập tin hệ thống:
    <br>`savscan /home/`
- Quét tất cả các file:
	<br>`savscan path -all ` 
    <br>Trong đó: `path` là đường dẫn tới thư mục cần quét.
- Quét với định dạng file cụ thể, ví dụ với file .txt
	<br>`savscan path -ext=txt `
- Quét bên trong file nén:
    <br>`savscan path -archive`
- Quét dạng file nén cụ thể, ví dụ: tar, zip:
	<br>`savscan path -tar -zip`
## III. Phát hiện và xóa bỏ virus
### 1. Phát hiện virus
- On-access scanning (Real-time Protected): Nếu phát hiện virus, Sophos từ chối truy cập tệp theo mặc định và hiển thị cảnh báo bên dưới:
<br><div align="center">![alt](https://images.viblo.asia/070d521a-67b1-4a2f-80b1-c9d96b7a68a8.PNG)</div>
- On-demand scans (Quét theo yêu cầu): Khi người dùng tùy chọn quét theo yêu cầu, Sophos sẽ phát hiện file nhiễm virus và cảnh báo như bên dưới:
<br><div align="center">![alt](https://images.viblo.asia/b5063780-aa6a-421f-8f18-479183887b07.PNG)</div>
### 2. Xóa virus
- Mặc định, Sophos Antivirus chỉ quét và phát hiện file bị nhiễm virus, để tùy chọn xóa file bị nhiễm sử dụng lệnh:
	<br>`savscan path -remove`
- Sophos Anti virus sẽ yêu cầu xác nhận trước khi xóa file bị nhiễm.
<br><div align="center">![alt](https://images.viblo.asia/fb452695-99da-406e-8023-ceb89dda9048.png)</div>
### 3. Xem nhật ký (logs) 
<br>Sophos Anti-Virus ghi lại chi tiết hoạt động quét trong nhật ký và syslog của Sophos Anti-Virus. Ngoài ra, các sự kiện virus và lỗi được ghi vào nhật ký Sophos Anti-Virus.
<br>Sử dụng lệnh savlog để xem nhật kí, ví dụ: Xem nhật kí trong 24h qua ở định dạng UTC, hãy nhập:
	<br>`/opt/sophos-av/bin/savlog --today --utc`
<br>Để xem thêm về các tùy chọn khác, nhập:
	<br>`man savlog`
## IV. Một số lưu ý khác
### 1. Bỏ qua thư mục khi quét.
<br>Ví dụ: Quét thư mục usr, media, bỏ qua thư mục boot, sys:
	<br>`savscan usr media -exclude boot sys`
###  2. Stop on-access scanning 
<br>Trong một số trường hợp antivirus làm chậm máy (ví dụ build docker), chúng ta có thể tạm thời disable tính năng on-access scanning bằng lệnh:
	<br>`/opt/sophos-av/bin/savdctl disable`
    
#### Tham khảo:
https://www.sophos.com/en-us/products/free-tools/sophos-antivirus-for-linux.aspx
<br>https://www.sophos.com/en-us/support/knowledgebase/121214.aspx
<br>Sophos Anti-Virus for Linux startup guide
<br>Sophos Anti-Virus for Linux configuration guide