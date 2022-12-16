# I. Giới thiệu
Ở phần trước chúng ta đã được tìm hiểu về các công cụ như: nmap, sqlmap, zphisher, vv... Các bạn có thể đọc lại phần 1 tại [đây](https://viblo.asia/p/tim-hieu-ve-cac-cong-cu-khai-thac-bao-mat-trong-kali-linux-phan-1-63vKjAJx52R). Tiếp tục đến với series `tìm hiểu về các công cụ khai thác bảo mật trong kali linux` thì hôm nay chúng ta sẽ đến với các công cụ cũng vô cùng hữu ích khác. Bắt đầu thôi!
# II. Các công cụ khai thác
## 1. Password Attacks – John the ripper
Được phát hành lần đầu vào năm 1996, John the Ripper (JtR) là một công cụ bẻ khóa mật khẩu ban đầu được sản xuất cho các hệ thống dựa trên UNIX. John the Ripper hỗ trợ một danh sách khổng lồ các loại mật mã và hàm băm. Nó được thiết kế rất dễ sử dụng và có tích hợp cả tính năng tự động nhận diện thuật toán hash, thế nên chúng ta không cần phải xác định thuật toán rồi mới crack giống như Hashcat.

Giao diện john the ripper:
![](https://images.viblo.asia/d4ed14a8-c56e-4000-b9ea-6e338891aabe.png)

**Bẻ khóa hàm băm md5.** Hash dữ liệu 123 với MD5:
![](https://images.viblo.asia/fe222f35-fe18-446e-9073-36f78b8c1f74.png)

Thực hiện tạo 1 file là md5.hash để lưu dữ liệu vừa hash.  Để thực hiển bẻ khóa mã hash MD5 trên với  John the Ripper, ta thực hiện lệnh: 
`john --format=raw-md5 md5.hash` với `--format=raw-md5` là định dạng file cần hash ở dạng md5.
 ![](https://images.viblo.asia/152010d5-cec2-430d-a127-c48a08e55b0f.png)

**Sử dụng wordlist để bẻ khoá mật khẩu.** Chạy lệnh: `john --wordlist=/usr/share/wordlists/rockyou.txt --format-raw-md5 crack.hash `
với `/usr/share/wordlists/rockyou.txt` là đường dẫn tới file chứa một danh sách các mật 
khẩu thường dùng.
![](https://images.viblo.asia/dfa49149-13c7-4666-9e6f-f15ed1e41f0e.png)

**Lưu ý :** Cần giải nén tệp `rockyou.txt` từ đường dẫn: `/usr/share/wordlists/rockyou.txt.gz` nếu 
gặp lỗi không tìm thấy file `rockyou.txt`

**Bẻ khoá mật khẩu file ZIP.** Trong trường hợp này, ta có file `password.txt.zip` được mã hóa với mật khẩu không biết trước
![](https://images.viblo.asia/197b829e-1596-401d-b306-d66f8b721ad8.png)

Đầu tiên, ta sử dụng lệnh `zip2john password.txt.zip > hashZip.txt` để lưu mã 
băm của file password.txt.zip ra file hashZip.txt.
![](https://images.viblo.asia/7340a253-d767-4b56-86ae-98f5776a2b40.png)

Bẻ khóa băm, gõ lệnh: `john --format=zip hashZip.txt` trong đó `zip` là định 
dạng file mã hóa, `hashZip.txt` là tên file chứa mã băm cần giải mã.
![](https://images.viblo.asia/cd139b3c-3ef6-4181-90ce-80d28754843c.png)

## 2. Wireless Attacks – Wifite
Wifite là một công cụ tự động để tấn công nhiều mạng không dây được mã hóa bằng WEP / WPA / WPA2 và WPS. Khi khởi động Wifite yêu cầu một vài tham số để làm việc và Wifite sẽ tự động tấn công vào Wifi được chỉ định bao gồm: bắt tay WPA, tự động khử xác thực các máy khách được kết nối, giả mạo địa chỉ MAC của bạn và bảo vệ mật khẩu bị bẻ khóa.
Các options wifite cho ta sử dụng
 ![](https://images.viblo.asia/26082f76-c7f9-43b1-a149-032a2dc89112.png)

Thực hiện chạy wifite để kiểm tra wifi xung quanh. Tuy nhiên ở đây ta thấy thông báo không có wifi nào được tìm thấy (cái này do mình chạy máy ảo kết nối vào máy thật nên ko có wifi). 
![](https://images.viblo.asia/7d267d01-b82a-4389-9d5f-4e9d4f389294.png)
 
Ta có thể sử dụng `wifite` để tấn công brute force vào wifi để lấy được mật khẩu
Chạy đoạn lệnh `wifite -mac -aircrack -dict /usr/share/wordlists/rockyou.txt`
Trong đó:
- mac để ẩn danh địa chỉ MAC của bạn
- aircrack cho wifite làm 1 aircrack tấn công
- dict là danh sách các password mà ta sử dụng để tấn công brute force
## 3. Reverse Engineering – Radare2
Radare2 là công cụ dùng để reverse engineering cho tất cả những ai làm việc với hệ điều hành Unix, Linux. Nền tảng radare2 được hình thành bởi nhiều công cụ nhỏ như r2, Rabin, rasm hoặc rax. Với radare2 bạn có thể kiểm tra shellcodes, reverse engineer mã nguồn nhị phân từ các nền tảng khác nhau như pe, elf, match0 và dex hoặc các lớp java, phân tích ảnh đĩa để thực hiện điều tra số (forensics), tìm kiếm các gadget để xây dựng payload ROP (Return Oriented Programming ), debug mã nguồn nhị phân, so sánh sự khác biệt giữa các tập tin nhị phân (bindiffing) hay patch binaries.

Ở đây ta sẽ sử dụng radare2 để reverse 1 file hello. Thực hiện gõ `aa` để kiểm tra cờ
![](https://images.viblo.asia/9b987a20-f48b-4ff0-8ea6-d20990b05f4d.png)
 
Gõ `V` để xem file dưới dạng HEX
 ![](https://images.viblo.asia/6a81ef02-0c05-43bf-aea8-154113e1a2b3.png)

Bên cạnh đó ta có thể sử dụng `–d` để chạy radare2 dưới dạng debug.
 ![](https://images.viblo.asia/e777bc1c-32b5-4f92-be3e-6dcad145387f.png)

## 4. Sniffing & Spoofing – Wire shark
Wireshark là một công cụ phân tích gói tin. Công cụ phân tích gói tin sẽ bắt các gói tin sao cho dữ liệu trong gói tin càng chi tiết càng tốt. Trong quá khứ, những công cụ như vậy hoặc rất đắt tiền, độc quyền hoặc cả hai. Tuy nhiên, với sự ra đời của của Wireshark, điều đó đã thay đổi. Wireshark được cung cấp miễn phí, là mã nguồn mở và là một trong những công cụ phân tích gói tin tốt nhất hiện nay.

Giao diện Wireshark
 ![](https://images.viblo.asia/4dca8ad8-35b4-4a19-98e0-a6f3829a1af3.png)
 
Cửa sổ chính của Wireshark bao gồm:
- Menu được sử dụng để bắt đầu các hành động.
- Thanh công cụ chính cung cấp khả năng truy cập nhanh vào các mục thường dùng từ menu.
- Thanh công cụ bộ lọc cho phép người dùng đặt bộ lọc hiển thị để lọc gói nào được hiển thị.
- The packet list pane: hiển thị bản tóm tắt của mỗi gói được chụp. Bằng cách nhấp vào các gói trong ngăn này, bạn kiểm soát những gì được hiển thị trong hai ngăn còn lại.
- The packet details pane: hiển thị chi tiết hơn về gói được chọn trong ngăn danh sách gói.
- The packet bytes pane: hiển thị dữ liệu từ gói được chọn trong ngăn danh sách gói và đánh dấu trường được chọn trong ngăn chi tiết gói.
- Thanh trạng thái hiển thị một số thông tin chi tiết về trạng thái chương trình hiện tại và dữ liệu đã thu thập

Thực hiện bắt 1 lưu lượng bất kỳ.
 ![](https://images.viblo.asia/0745d0c4-e889-4805-b3c5-e10d767cb9f6.png)
 
 Ta có thể follow theo giao thức UDP, TCP. Như hình ở dưới ta có thể bắt được request gửi tới địa chỉ của 1 trang wordpress.
![](https://images.viblo.asia/98e5e49d-48ba-44dd-8069-0beaeb7bf325.png)
 
## 5. Exploitation Tools - Metasploit
Metasploit hay còn có thể gọi là Metasploit Project là một dự án liên quan đến bảo mật máy tính, cung cấp những thông tin về các lỗ hổng bảo mật. Mục tiêu nhắm đến của Metasploit chính là những quá trình tấn công xâm nhập kiểm thử (Penetration Testing) và phát triển các hệ thống phát hiện xâm nhập (IDS – Intrusion Detection System). 

Metasploit Framework có mã nguồn mở, sử dụng các shellcode (payload) để tấn công máy mục tiêu có lỗ hổng. Cùng với một số bộ công cụ bảo mật khác, Metasploit có cơ sở dữ liệu chứa hàng ngàn shellcode, exploit của các
hệ điều hành, các chương trình hay dịch vụ. Trong quá trình phát triển, Metasploit liên tục cập nhật các exploit vào cơ sở dữ liệu nên càng ngày nó càng trở thành một bộ công cụ mạnh mẽ trong kiểm thử an ninh hệ thống. 

Sử dụng các lệnh cơ bản trong Metasploit: Tại giao diện cửa sổ terminal, sử dụng câu lệnh msfconsole để khởi tạo Metasploit Framework. 
![](https://images.viblo.asia/aeb26dfe-ba66-4bc7-b949-b043178c7419.png)

`msf> show options `
![](https://images.viblo.asia/7412f64b-7aa4-472b-8961-b284989e8ca6.png)

Với tham số options thì câu lệnh trên sẽ tương đối đặc biệt hơn một chút. Các options kiểm soát các cài đặt cần thiết cho các chức năng riêng biệt trong từng module. Chạy lệnh show options trong khi module được chọn, Metasploit sẽ chỉ hiển thị các options áp dụng được với một module riêng biệt. Khi show options không ở trong một module sẽ hiển thị những options toàn cục có sẵn. 

`msf> search `
![](https://images.viblo.asia/79fcf5bd-bb7c-47a1-8985-148c7de56e91.png)

Câu lệnh này giúp cho chúng ta tìm kiếm một tấn công cụ thể, module phụ trợ hay payload dựa trên những keywords có sẵn như: aka, author, arch, ... và mỗi keyword đều được giải thích chi tiết ngay bên cạnh. 
Ví dụ, nếu chúng ta muốn tìm kiếm tất cả các thông tin liên quan về hình thức tấn công bruteforce, ta sử dụng lệnh: `msf> search bruteforce`. 

Sau đây là một ví dụ khai thác lỗ hổng Microsoft Security Bulletin - MS06-001 (Lỗ hổng trong Công cụ kết xuất đồ họa cho phép RCE). Setup môi trường cần 1 máy attacker chạy kali linux có metasploit, 1 máy victim chạy hệ điều hành windows XP phiên bản chưa được cập nhật trước 2006 (ở đây mình sử dụng Windows XP Professional 5.1.2600, SP2 bản chưa update).

Thực hiện kiểm tra ping 2 máy trước khi khai thác, địa chỉ ip của máy Windows là 192.168.71.194.
![](https://images.viblo.asia/1526660a-90d4-449c-b688-500e347032d4.png)

Nhập `msf> search ms06_001` để tìm module khai thác:
![](https://images.viblo.asia/9709f195-189e-45da-bd56-c05043ada65c.png)

Sử dụng lệnh use để load được module mong muốn. Thực hiện vào metasploit và setting như trong hình:
![](https://images.viblo.asia/f4db960f-33d4-48fc-b878-f36edcdbee47.png)

Giải thích thêm 1 chút về khai thác. Ta thực hiện khai thác reverse shell thông qua 1 url gửi đến victim nhằm chiếm quyền điều khiển của máy nạn nhân. Reverse payload là một payload để kết nối ngược trở lại đối với máy tính của  hacker hoặc người kiểm thử trên một địa chỉ IP và số cổng cụ thể. Tùy vào loại tấn công khai thác mà ở đây sẽ xuất hiện các tham số mà chúng ta cần phải lưu ý như:
- RHOST: Địa chỉ IP của máy nạn nhân mà ta muốn khai thác. 
- RPORT: Địa chỉ cổng dịch vụ SMB của máy nạn nhân. Một giao thức quan trọng được sử dụng để giao tiếp giữa các ứng dụng, tiến trình với nhau trong một hệ thống mạng.
- LHOST: Địa chỉ IP local của máy thực hiện khai thác. 
- LPORT: Địa chỉ cổng dịch vụ SMB của máy đi khai thác. 
Trong reverse payloads, kết nối thực sự được kích hoạt bởi máy mục tiêu và nó kết nối với kẻ tấn công. Sử dụng kỹ thuật này khi muốn phá vỡ tường lửa hoặc cài đặt mạng NAT. Hai tham số như RPORT và LPORT thì có thể để nguyên số cổng mặc định mà không cần chỉnh sửa cấu hình thêm. 

Thực hiện exploit, metasploit sẽ tạo ra 1 URL
![](https://images.viblo.asia/8d3877b3-16ac-46fc-b276-3bc4d56c479a.png)

Gửi URL cho máy victim. Khi máy victim truy cập vào URL trên thì shell sẽ được kích hoạt:
![](https://images.viblo.asia/dfdb0c30-21c8-4201-b5cf-d5c1581aaae0.png)

**Lưu ý:** 1 số máy win XP thực hiện chặn việc run DLL trên app để đảm bảo an toàn. Ta cần config để cho phép run DLL thì mới khai thác được. 

Kiểm tra máy attacker xác nhận bắt được kết nối ngược trở lại từ máy Windows XP. Thực hiện truy cập vào phiên kết nối (sessions -i 1) và chạy `ipconfig` kiểm tra địa chỉ ip của máy đang chiếm quyền, xác nhận địa chỉ ip là của máy victim. Vậy là khai thác thành công.
![](https://images.viblo.asia/4ec009b6-ff51-4b7a-9f90-3b462da0c672.png)

# III. Kết luận
Trên đây là 5 công cụ nữa mà mình hay sử dụng để khai thác bảo mật. Kali linux có rất nhiều công cụ ngon - bổ - free, nếu có công cụ nào mà bạn yêu thích nhưng mình chưa liệt kê trên đây thì các bạn có thể comment ở dưới để cho mình biết nhé!