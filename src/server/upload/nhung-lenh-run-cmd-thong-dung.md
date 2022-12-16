Để thực hiện truy cập một thư mục nào đó trên máy tính, hoặc thực hiện một số những câu lệnh trên Windows, chúng ta thường sử dụng tới hộp thoại Run và nhập đường dẫn hoặc lệnh. Điều này sẽ giúp người dùng có thể truy cập và thao tác nhanh hơn. Hoặc một số những truy cập trên Windows bắt buộc phải sử dụng giao diện dòng lệnh này. Vì vậy, khi có trong tay những câu lệnh Run CMD thông dụng và thường xuyên sử dụng sẽ giúp chúng ta có được kết quả nhanh hơn.

**1. Lệnh PING:**

Dòng lệnh: ping ip/host/[/t][/a][/l][/n]

Trong đó:

ip: địa chỉ IP của máy tính cần kiểm tra, host là tên của máy tính cần kiểm tra kết nối mạng. Người dùng có thể sử dụng địa chỉ IP hoặc tên của máy tính đều được.

/t: yêu cầu gửi gói tin liên tục đến máy đích cho đến khi bạn bấm Ctrl + C để kết thúc.

/a: nhận địa chỉ IP từ tên máy tính.

/l: xác định độ rộng của gói tin gửi đi kiểm tra.

/n: xác định số gói tin gửi đi.

Cách dùng lệnh PING: chúng ta có thể sử dụng dòng lệnh PING khi muốn kiểm tra máy tính có kết nối Internet hay không. Khi thực hiện lệnh PING, các gói tin từ máy tính muốn kiểm tra được gửi tới máy tính đích, từ đó người dùng có thể kiểm tra đường truyền hoặc xác định máy tính có kết nối mạng hay không.

**2. Lệnh Tracert:**

Dòng lệnh: tracert ip/host

Trong đó: ip/host là địa chỉ IP hoặc tên máy tính cần kiểm tra.

Cách dùng lệnh Tracert: lệnh Tracert dùng để hiển thị đường đi của các gói tin từ máy tính kiểm tra đến máy tính đích, thông qua server hoặc router nào.
![](https://images.viblo.asia/46bbee0c-add1-4e9c-8f95-1cceb0436214.png)

**3. Lệnh Netstat:**

Dòng lệnh: Netstat [/a][/e][/n]

Trong đó:

/a: hiển thị tất cả kết nối và các cổng đang được mở.

/e: thông tin số liệu thống kê Ethernet.

/n: hiển thị các địa chỉ và các số cổng kết nối.

Cách dùng lệnh Netstat: giúp người dùng biết được các kết nối ra vào máy tính muốn kiểm tra.

**4. Lệnh Ipconfig:**

Dòng lệnh: ipconfig /all

Cách dùng lệnh ipconfig /all: hiển thị các thông tin của máy tính đang kiểm tra gồm tên host, địa chỉ IP, DNS,...

![](https://images.viblo.asia/01b8d9f6-1a31-437d-b271-ff95174763b3.jpg)

**5. Lệnh Shutdown:**

Dòng lệnh:

Shutdown -s -t [a]: tắt máy (trên Windows 7).

Shutdown -r -t [a]: khởi động máy.

Trong đó: a là thời gian tắt hoặc mở máy được tính theo đơn vị giây.

![](https://images.viblo.asia/2e80f6fe-c3ff-42d9-b788-5329867b3866.jpg)

**6. Lệnh DIR:**

Dòng lệnh: DIR [drive:] [path][filename]

Trong đó:

Path: đường dẫn tới file hay thư mục.

Filename: tên file.

Công dụng lệnh DIR: giúp người dùng có thể tìm kiếm và kiểm tra file cũng như thư mục trong máy tính.

**7. Lệnh DEL:**

Dòng lệnh: DEL [/p][/f][/s][/q][/a[[:]attributes]] "tên file cần xóa"

Trong đó:

/p: hiển thị thông tin file trước khi xóa.

/f: xóa các file có thuộc tính chỉ đọc (read-only).

/s: xóa toàn bộ file đó xuất hiện ở bất cứ thư mục nào.

/q: xóa không cần hỏi.

/a[[:]attributes]: xóa theo thuộc tính của file (R: Read-only files, S: System files, H: Hidden files).

Công dụng lệnh DEL: xóa file trên máy tính.

**8. Lệnh COPY:**

Dòng lệnh: COPY "địa chỉ file cần copy" "địa chỉ lưu file copy" /y

Trong đó: /y là sao chép file không cần hỏi.

Cách dùng lệnh COPY: dùng trong trường hợp muốn chuyển file từ thư mục này sang thư mục khác trong máy tính.
![](https://images.viblo.asia/0c5842b2-905b-43d3-bab7-46ddc1a0d561.png)


**9. Lệnh RD:**

Dòng lệnh: RD /s /q "thư mục cần xóa"

Trong đó:

/s: xóa toàn bộ thư mục.

/q: xóa thư mục không cần hỏi.

Cách dùng lệnh RD: trong trường hợp chúng ta muốn xóa nhanh thư mục nào đó trên máy tính thì có thể áp dụng lệnh này.

**10. Lệnh MD:**

Dòng lệnh: MD "đường dẫn lưu file cần tạo"\"tên thư mục cần tạo"

Cách dùng lệnh MD: sử dụng trong trường hợp tạo thư mục mới trong ổ đĩa.

Ví du như: MD "D:\Amnhac" để tạo thư mục Amnhac trong ổ D máy tính.

**11. Lệnh TASKKILL:**

Dòng lệnh: taskkill /f /im "tên ứng dụng".exe

Cách dùng lệnh TASKKILL: tắt phần mềm đang chạy trong trường hợp phần mềm gặp vấn đề, không thể thoát trực tiếp.

**12. Lệnh REG ADD:**

Dòng lệnh: REG ADD KeyName [/v ValueName] [/t Type] [/s Separator] [/d Data] [/f]

Trong đó:

KeyName: đường dẫn tới khóa.

/v ValueName: tên giá trị cần tạo trong Registry.

/t Type: kiểu dữ liệu.

/d Data: dữ liệu khởi tạo cho giá trị vừa tạo.

Cách dùng lệnh REG ADD: sử dụng lệnh để tạo và chỉnh sửa Registry.

**13. Lệnh REG DELETE:**

Dòng lệnh: REG DELETE KeyName [/v ValueName] [/f]

Trong đó: [/v ValueName] là tên giá trị cần xóa.

Cách dùng lệnh REG DELETE: dùng trong trường hợp muốn xóa một giá trị nào đó trong Registry.

**14. Lệnh REGEDIT.EXE:**

Dòng lệnh: Regedit.exe /s "nơi chứa file .reg"

Trong đó: /s không cần hỏi.

Cách dùng: dùng trong trường hợp chạy file .reg.

**15. Lệnh ATTRIB:**

Dòng lệnh: ATTRIB -a -s -h -r "file, thư mục" /s /d hoặc ATTRIB +a +s +h +r "file, thư mục" /s /d

Trong đó:

Dấu +: thêm vào thuộc tính.

Dấu -: loại bỏ thuộc tính.

a: archive là thuộc tính lưu trữ.

s: system là thuộc tính hệ thống.

h: hidden là thuộc tính ẩn.

r: read- only là thuộc tính chỉ đọc.

/s: thực hiện với tất cả các file nằm trong thư mục và các thư mục con.

/d: đặt thuộc tính cho thư mục và thư mục con.

Cách dùng: dùng để đặt thuộc tính cho file hoặc thư mục.

**16. Tài liệu tham khảo:**

https://www.lifewire.com/copy-command-2625842

https://www.lifewire.com/windows-4781566