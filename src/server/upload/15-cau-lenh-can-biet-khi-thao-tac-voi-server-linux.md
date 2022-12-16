Trong một thế giới bùng nổ với các công cụ mới và môi trường phát triển đa dạng, việc học một số lệnh sysadmin cơ bản là điều cần thiết đối với bất kỳ nhà phát triển hoặc kỹ sư nào. Các lệnh và gói cụ thể có thể giúp các nhà phát triển tổ chức, khắc phục sự cố và tối ưu hóa các ứng dụng của họ và — khi có sự cố — cung cấp thông tin bộ ba có giá trị cho các nhà khai thác và hệ thống.

Trong bài viết này mình muốn chia sẻ một số lệnh command hữu ích mà mình hay dùng khi thao tác với server Linux.

### 1. **history**

Hãy tưởng tượng khi bạn thao tác, sử dụng rất nhiều command và khiến cho server xảy ra lỗi và lúc này bạn không biết mình đã sử dụng nhầm câu lệnh nào dẫn đến lỗi thì **history** chính là câu lệnh sẽ cứu giúp bạn. Câu lệnh **history** sẽ liệt kê ra danh sách các câu lệnh mà bạn đã sử dụng. 
```
$ history
    1  clear
    2  df -h
    3  du
```

Ngoài ra khi bạn muốn sử dụng lại một câu lệnh nào đó mà không muốn phải gõ lại hay sử dụng **!number** . ví dụng bạn muốn sử dụng lại câu lệnh `df -h`, hãy gõ **!2** .

### 2. **chmod**

Không giống với các hệ điều hành khác như Windows.. khi bạn thao tác với một tệp file nào đó trên Linux chắc nhiều lần các bạn đã bị báo lỗi **permission denied** điều đó chứng tỏ bạn đang không có quyền thực thi với file or tệp đó. Hãy dùng câu lệnh **chmod**
```
chmod + w test.sh
```
w : chính là quyền mà bạn muốn gắn cho file (ví dụ: w là quyền write, r: quyền read ..) 

### 3. **du**

Để truy xuất thông tin chi tiết hơn về tệp nào sử dụng không gian đĩa trong thư mục, bạn có thể sử dụng lệnh du . Ví dụ: nếu bạn muốn tìm ra nhật ký nào chiếm nhiều dung lượng nhất trong thư mục / var / log , bạn có thể sử dụng du với tùy chọn -h (người có thể đọc được) và tùy chọn -s cho tổng kích thước.

```
$ du -sh / var / log / *
1.8M   / var / log / anaconda
384K   / var / log / Audit
4.0K   / var / log / boot.log
0 / var / log / chrony
4.0K   / var / log / cron
4.0K   / var / log / maillog
64K / var /nhật ký / tin nhắn
```

Ví dụ trên cho thấy thư mục lớn nhất trong / var / log  là / var / log / Audit

### 4. **df**

Bạn có thể sử dụng df (hiển thị không gian đĩa trống) để khắc phục sự cố về dung lượng đĩa. Khi bạn chạy ứng dụng của mình trên bộ điều phối vùng chứa, bạn có thể nhận được thông báo lỗi báo hiệu thiếu dung lượng trống trên máy chủ vùng chứa. Mặc dù không gian đĩa phải được quản lý và tối ưu hóa bởi sysadmin, bạn có thể sử dụng df để tìm ra dung lượng hiện có trong thư mục và xác nhận xem bạn có thực sự hết dung lượng hay không.
```
$ df -h
Kích thước hệ thống tệp đã sử dụng Thời gian sử dụng % Được gắn trên
devtmpfs 7.7G     0  7.7G   0 % / dev
/ dev / mapper / RHEL-Root 50G 16G 35G   31 % /
/ dev / nvme0n1p2 3.0G 246M 2.8G   9 % / boot
/ dev / mapper / RHEL-Home 100G 88G 13G   88 % / home
/ dev /nvme0n1p1 200M 9,4M 191M   5 % / boot / efi
/ dev / sdb1 114G 55G 54G   51 % / run / media / tux / red
```

Các **-h** tùy chọn in ra thông tin trong định dạng con người có thể đọc được. Theo mặc định, như trong ví dụ, **df** cung cấp kết quả cho mọi thứ trong thư mục gốc, nhưng bạn cũng có thể giới hạn kết quả bằng cách cung cấp một thư mục như một phần của lệnh của bạn (chẳng hạn như df -h / home ). 

### 5. **ip**
 Địa chỉ lệnh con (hay gọi tắt là ip a ) hiển thị các giao diện và địa chỉ IP của máy chủ ứng dụng của bạn. Bạn sử dụng địa chỉ ip để xác minh vùng chứa hoặc địa chỉ IP của máy chủ lưu trữ. Ví dụ: khi vùng chứa của bạn được gắn vào hai mạng, địa chỉ ip có thể hiển thị giao diện nào kết nối với mạng nào. Để kiểm tra đơn giản, bạn luôn có thể sử dụng lệnh ip address để lấy địa chỉ IP của máy chủ. Ví dụ dưới đây cho thấy rằng vùng chứa tầng web có địa chỉ IP là 172.17.0.2 trên giao diện eth0.
```
$ ip address show eth0
3 : eth0: < BROADCAST, MULTICAST, UP, LOWER_UP > mtu 1500 qdisc noqueue state UP group default qlen 1000
    link / ether d4: 3b: 04: 9e: b2: c2 brd ff: ff: ff: ff : ff: ff
    inet 10.1.1.3 / 27 brd 10.1.1.31 phạm vi động toàn cầu noprefixroute eth0
       valid_lft 52072 giây ưu tiên_lft 52072 giây
```

### 6. **tail** 

Với các dev việc phải debug, xem log của một file không có gì là lạ lẫm. Tuy nhiên chúng ta không thể ngồi để đọc từng dòng trong log được. Đôi khi chỉ muốn xem log mới nhất được ghi vào trong file. Câu lệnh **tail - f** sẽ giúp chúng ta làm việc này. 

![](https://images.viblo.asia/90edca53-3443-4c68-9da7-c36fcf432599.png)

Các -f tùy chọn chỉ ra "follow" tùy chọn, trong đó kết quả đầu ra các dòng log khi chúng được ghi vào tập tin. Ví dụ có một tập lệnh nền truy cập điểm cuối sau mỗi vài giây và nhật ký ghi lại yêu cầu. Thay vì theo dõi nhật ký trong thời gian thực, bạn cũng có thể sử dụng đuôi để xem 100 dòng cuối cùng của tệp với tùy chọn -n .


### 7. **ls**
Một câu lệnh huyền thoại mà chắc hẳn ai dùng Linux cũng đã từng dùng qua. **ls** liệt kê các tập tin trong một thư mục. Sysadmins và các nhà phát triển phát hành lệnh này khá thường xuyên. Trong không gian vùng chứa, lệnh này có thể giúp xác định thư mục và tệp hình ảnh vùng chứa của bạn. Bên cạnh việc tra cứu các tệp của bạn, **ls** có thể giúp bạn kiểm tra các quyền của mình. Trong ví dụ dưới đây, bạn không thể chạy myapp do vấn đề về quyền. Khi bạn kiểm tra các quyền sử dụng **ls -l** , bạn nhận ra rằng các quyền không có "x" trong -rw-r - r-- , chỉ được đọc và ghi.
```
$. / myapp
bash:. / myapp: Quyền bị từ chối
$ ls -l myapp
-rw-r - r--. 1 root root 33 Jul 21 18 : 36 myapp
```

### 8. **curl**

Câu lệnh này cực kì hữu ích khi chúng ta muốn kiểm tra thử xem mình có thể kết nối đến một url (end-point) khác không .
Ví dụ: hãy tưởng tượng ứng dụng của bạn gặp lỗi HTTP 500 cho biết nó không thể truy cập cơ sở dữ liệu MongoDB:

```
$ curl -I -s myapplication: 5000
HTTP / 1.0 500 LỖI MÁY CHỦ NỘI BỘ
```

```
$ curl -I -s https: // opensource.com
HTTP / 1.1 200 OK
```

### 9. **grep**
Lệnh **grep** được sử dụng để tìm kiếm văn bản. Nó tìm kiếm tệp nhất định cho các dòng có chứa kết quả khớp với các chuỗi hoặc từ đã cho. Đây là một trong những lệnh hữu ích nhất trên Linux và hệ thống giống Unix. Hãy để chúng tôi xem cách sử dụng grep trên hệ thống tương tự như Linux hoặc Unix.
```
Tìm kiếm bất kỳ dòng nào có chứa từ trong tên tệp trên Linux: grep 'word' filename
Thực hiện tìm kiếm không phân biệt chữ hoa chữ thường cho từ 'bar' trong Linux và Unix: grep -i 'bar' file1
Tìm kiếm tất cả các tệp trong thư mục hiện tại và trong tất cả các thư mục con của nó trong Linux để tìm từ 'httpd'grep -R 'httpd' .
Tìm kiếm và hiển thị tổng số lần chuỗi 'nixcraft' xuất hiện trong tệp có tên frontpage.md: grep -c 'nixcraft' frontpage.md
```

### 10. **ps**

Lệnh **ps** , một phần của gói procps-ng cung cấp các lệnh hữu ích để điều tra ID quy trình, hiển thị trạng thái của một quy trình đang chạy. Sử dụng lệnh này để xác định một ứng dụng đang chạy hoặc xác nhận một quy trình dự kiến. Ví dụ: nếu bạn muốn kiểm tra một máy chủ web Tomcat đang chạy, bạn sử dụng **ps** với các tùy chọn của nó để lấy ID tiến trình của Tomcat.
```
$ ps -ef
UID PID PPID C STIME TTY TIME CMD
root         1     0  2 18 : 55 ? 00:00:02 / docker-java-home / jre / bi
root         59     0  0 18 : 55 pts / 0    00:00:00 / bin / sh
root         75    59  0 18 : 57 pts / 0    00:00:00 ps -ef
```

### 11. **pwd**
Khi bạn muốn kiểm tra đường dẫn hiện tại ở folder bạn đang làm việc, hãy sữ dụng câu lệnh **pwd** .
Sử dụng lệnh **pwd** để tìm ra đường dẫn của thư mục làm việc hiện tại (thư mục) mà bạn đang ở. Lệnh này sẽ trả về một đường dẫn tuyệt đối (đầy đủ), về cơ bản là đường dẫn của tất cả các thư mục bắt đầu bằng dấu gạch chéo lên (/ ) . Ví dụ về đường dẫn tuyệt đối là / home / username .
```
$ pwd
/home/nguyen.thanh.tungm
```
### 12. **cat**

**cat** là một trong những lệnh được sử dụng thường xuyên nhất trong Linux. Nó được sử dụng để liệt kê nội dung của một tệp trên đầu ra chuẩn (sdout). Để chạy lệnh này, hãy nhập cat, theo sau là tên tệp và phần mở rộng của nó. Ví dụ: cat file.txt .
```
cat test.txt
```

### 13. **kill**
Nếu bạn có một chương trình không phản hồi, bạn có thể kết thúc chương trình đó theo cách thủ công bằng cách sử dụng lệnh **kill** . Nó sẽ gửi một tín hiệu nhất định đến ứng dụng hoạt động sai và hướng dẫn ứng dụng tự kết thúc.

Có tổng cộng sáu mươi bốn tín hiệu mà bạn có thể sử dụng, nhưng mọi người thường chỉ sử dụng hai tín hiệu:

SIGTERM (15) - yêu cầu một chương trình ngừng chạy và cho nó một thời gian để lưu tất cả tiến trình của nó. Nếu bạn không chỉ định tín hiệu khi nhập lệnh giết, tín hiệu này sẽ được sử dụng.
SIGKILL (9) - buộc các chương trình phải dừng ngay lập tức. Tiến trình chưa được lưu sẽ bị mất.
Bên cạnh đó biết các tín hiệu, bạn cũng cần phải biết mã số quá trình (PID) của chương trình bạn muốn giết . Nếu bạn không biết PID, chỉ cần chạy lệnh ps ux .

Sau khi biết tín hiệu bạn muốn sử dụng và PID của chương trình, hãy nhập cú pháp sau:
```
kill 9 PID
```
### 14. **top**

Là một thiết bị đầu cuối tương đương với Trình quản lý tác vụ trong Windows, lệnh **top** cùng sẽ hiển thị danh sách các tiến trình đang chạy và lượng CPU mà mỗi tiến trình sử dụng. Nó rất hữu ích để theo dõi việc sử dụng tài nguyên hệ thống, đặc biệt là biết tiến trình nào cần được kết thúc vì nó tiêu tốn quá nhiều tài nguyên.

![](https://images.viblo.asia/199dee29-4ed4-43a0-ba1e-2f14b34d79f5.png)

### 15. **cp**

Sử dụng lệnh cp để sao chép tệp từ thư mục hiện tại sang một thư mục khác. Ví dụ: lệnh cp scenery.jpg /home/username/Pictures sẽ tạo một bản sao của scenery.jpg (từ thư mục hiện tại của bạn) vào thư mục Pictures .

### Tóm lại
Các lệnh cơ bản của Linux giúp người dùng thực thi các tác vụ một cách dễ dàng và hiệu quả. Có thể mất một lúc để nhớ một số lệnh cơ bản, nhưng không gì là không thể nếu bạn thực hành nhiều.

Bài viết được thảm khảo từ : 

https://opensource.com/article/17/7/20-sysadmin-commands

https://www.hostinger.com/tutorials/linux-commands