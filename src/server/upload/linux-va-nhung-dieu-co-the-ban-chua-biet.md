Nếu bạn cũng là một lập trình viên, hẳn bạn chẳng còn xa lạ gì với hệ điều hành Linux. 
Vậy bạn có thích cửa sổ dòng lệnh terminal không? Mình rất thích vì cảm giác dùng terminal rất cool :rofl::rofl::rofl:
Từ sự yêu thích đó, mình đã nảy ra ý tưởng cho bài viết này. Không có gì quá cao siêu đâu, nhưng mình nghĩ khá là cần thiết.
Cùng mình tìm hiểu nhé :)

### 1. Quản lý tệp

Đây là cấu trúc thư mục căn bản của Linux, anh em hẳn quá quen thuộc rồi.

![](https://images.viblo.asia/76043af3-eb8c-4def-8fcd-1efd0d3e81da.png)

Vậy bạn có biết chúng dùng để làm gì không?
- root: thư mục gốc
- home: thư mục chứa dữ liệu của người dùng.
- boot: thư mục chứa hạt nhân của hệ điều hành
- bin: thư mục tệp chương trình cơ bản
- usr: thư mục ứng dụng
- var: thư mục dữ liệu cập nhật
- dev: thư mục chứa các tệp thiết bị
- etc: thư mục chứa các tệp cấu hình

Biết rõ cấu trúc thư mục sẽ giúp bạn biết cần phải truy cập thư mục nào khi gặp vấn đề. Ví dụ, nếu muốn cấu hình DNS, hosts, thì chúng ta sẽ phải config trong `etc`.

Một số lệnh quản lý tệp cần biết:
- `cat <path>`: đọc tệp
- `more <path>`: đọc từng dòng
- `tail -<n> <path>`: xem n dòng cuối tệp
- `head -<n> <path>`: xem n dòng đầu tệp
- `touch <path>`: tạo tệp mới, cập nhật tệp cũ

**Lệnh find**

`find <folder> <expressions>`

Các expresssions được hỗ trợ bao gồm:
- Tên file: -name <query>
- Quyền: -perm <query>
- Kiểu: -type <query>
- Kích thước: -size <query>
- Thời gian: -atime N, -mtime N, -ctime N
- Để kết hợp nhiều điều kiện, chúng ta có các toán tử: -not, -and, -or.
       
Ví du:
    
![](https://images.viblo.asia/1a12a4ab-f1ce-423e-9666-0ba5201e016a.png)
    
#### **Phân quyền sử dụng tệp**
Đầu tiên, chúng ta cần xác định, đối tượng phân quyền ở đây bao gồm 3 loại:
- u: chủ sở hữu tệp
- g: Những users khác thuộc nhóm chứa file
- o: Những người sử dụng khác

    
Cú pháp:
```
chomd <mode> <files/folder>
```
Trong đó, mode bao gồm 3 số, tương ứng với quyền cho 3 loại đối tượng đã nêu trên.
![](https://images.viblo.asia/a5530eac-1bd5-4fae-805e-c9a86dd257fb.png)

Các số có gồm 3 bit, có giá trị từ 0 đến 7 và có ý nghĩa tương ứng như sau:
* 0: Không được phép thực hiện bất kỳ quyền nào
* 1: Thực thi
* 2: Viết
* 3: Viết và thực thi
* 4: Đọc
* 5: Đọc và thực thi
* 6: Đọc và viết
* 7: Đọc, viết và thực thi

Các mode hay được sử dụng bao gồm: 555, 644, 755, 777

Các bạn có thể tìm hiểu thêm tại [đây](https://quantrimang.com/phan-quyen-truy-cap-file-bang-lenh-chmod-59672)

Không biết anh em có hay auto dùng mode 777 không nhỉ? Nếu có thì nên chắc chắn là đoạn này sẽ cần thiết với anh em đấy.

### 2. Quản lý tiến trình

Tiến trình là những chương trình đang được thực thi trên hệ điều hành. Các tiến trình sẽ sắp xếp để chia sẻ thời gian sử dụng CPU.

#### 2.1 Một số lệnh quản lý tiến trình
- ps : 
    - Hiển thị các tiến trình của người dùng
    - Tùy chọn aux sẽ cho phép bạn hiển thị tất cả các tiến trình đang chạy.
- kill <process_id>: 
    - Kết thúc tiến trình được chỉ định
    - Bạn cũng có thể sử dụng `killall` để kết thúc tất cả các tiến trình.
    - >> Lệnh này chỉ được thực hiện bởi người sở hữu tiến trình.
- top -<d> delay
    - Hiển thị % tài nguyên tiến trình đang sử dụng (gồm CPU và bộ nhớ trong). Trong đó, d là số giây lệnh cập nhật thông tin.

#### 2.2 Các kiểu thực thi lệnh
- command_1 **;** command_2
    - Sử dụng ký tự `;` giữa các lệnh thì các lệnh sẽ được thực thi liên tiếp và độc lập với nhau. Có nghĩa là kết quả thực hiện lệnh trước không làm ảnh hưởng đến việc thực thi lệnh tiếp theo.
- command_1 **&&** command_2
    - Sử dụng `&&` giữa các lệnh thì các lệnh sẽ được thực thi liên tiếp và phụ thuộc nhau. Lệnh sau sẽ được thực thi nếu lệnh trước không gặp lỗi.
- command_1 **|** command_2
    - Ký tự `|` sẽ cho phép định hướng đầu ra của lệnh trước thành đầu vào của lệnh tiếp theo. Cơ chế này được gọi là cơ chế đường ống. 
- command_1 **<** <file_input>
    - Thay vì sử dụng đầu vào chuẩn là bàn phím, bạn có thể định nghĩa đầu vào cho lệnh trong file và dùng `<` để chuyển hướng đầu vào.
- command_1 **>>** <filte_output>
    - Thay vì sử dụng đầu ra chuẩn là terminal, bạn có thể định nghĩa đầu ra cho lệnh vào file chỉ định bằng cách sử dụng `>>`.

### 3. Cấu hình mạng
Bạn có thể làm rất nhiều việc như:
- Cấu hình kết nối mạng: NIC, IP, Gateway
- Cấu hình DNS, host,...

<br>
Một số tệp cấu hình cần quan tâm


| Path | Ý nghĩa |
| -------- | -------- |
| /etc/init.d/network     | Start/stop/restart dịch vụ mạng |
| /etc/resolv.conf     | Tệp cấu hình DNS, cấu hình các máy chủ DNS phân giải tên miền. |
| /etc/sysconfig/network  | Cấu hình chung về mạng |
| /etc/sysconfig/network-script  | Cấu hình NIC |
| /ect/hosts     | Cấu hình ánh xạ host name-ip |
<br>    

Các lệnh kiểm tra cấu hình mạng:

| Thao tác | Ý nghĩa |
| -------- | -------- |
| ping <host-ip>    | Kiểm tra kết nối của máy với ip chỉ định  |
|ifconfig|Kiểm tra cấu hình mạng|
|cat /etc/resolve.conf|Xem cấu hình DNS|
|hostname|Tên máy|
 
    
Một số lệnh cấu hình
| Thao tác | Ý nghĩa |
| -------- | -------- |
|ifconfig eth0 down hoặc ifdown eth0| Tắt NIC|
|ifconfig eth0 up hoặc ifdown eth0| Bật NIC|
|/etc/init.d/network stop|Tắt dịch vụ mạng|
|/etc/init.d/network restart| Khởi động lại dịch vụ mạng|
|ifconfig <NIC-name> <IP> netmark <mark>|Đặt địa chỉ IP|
    
 Mình mới tìm hiểu được như vậy. Hi vọng bài viết tiếp theo, mình có thể cung cấp nhiều thôn tin hữu ích hơn. Hi vọng bài viết này cũng có ích với bạn. Cảm ơn và hẹn gặp lại bạn trong các bài viết tiếp theo.