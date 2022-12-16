## Giới thiệu

**Wget** được phát triển bởi [GNU](https://www.gnu.org/) hỗ trợ bạn tải nội dung của một trang web hay tải các file. Nó có thể tải thông qua **FTP, SFTP, HTTP, và HTTPS**, nó có thể dùng trên bất cứ nền tảng nào như Linux, Windows, MacOS.

## Cài đặt

Nếu bạn chưa có **wget** hãy tiến hành cài đặt nó bằng lệnh:

```bash
sudo apt install wget
```

Kiểm tra xem version hay việc cài đặt đã thành công hay chưa:
```bash
wget --version
```

## Wget command
Để xem tất cả các options của wget:
```bash
wget -h
```

### Tải xuống một file duy nhất

```bash
wget <url>
```
Ví dụ mình muốn tải xuống file .iso của kali

Example:
```bash
$ wget https://cdimage.kali.org/kali-2020.2/kali-linux-2020.2-installer-amd64.iso
--2020-05-31 10:35:14--  https://cdimage.kali.org/kali-2020.2/kali-linux-2020.2-installer-amd64.iso
Resolving cdimage.kali.org (cdimage.kali.org)... 192.99.200.113
Connecting to cdimage.kali.org (cdimage.kali.org)|192.99.200.113|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://hlzmel.fsmg.org.nz/kali-images/kali-2020.2/kali-linux-2020.2-installer-amd64.iso [following]
--2020-05-31 10:35:15--  https://hlzmel.fsmg.org.nz/kali-images/kali-2020.2/kali-linux-2020.2-installer-amd64.iso
Resolving hlzmel.fsmg.org.nz (hlzmel.fsmg.org.nz)... 163.7.134.121, 2404:138:134:120::2
Connecting to hlzmel.fsmg.org.nz (hlzmel.fsmg.org.nz)|163.7.134.121|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 3860398080 (3.6G) [application/x-iso9660-image]
Saving to: ‘kali-linux-2020.2-installer-amd64.iso’

kali-linux-2020.2-installer-amd64.iso                        0%[                                                                                                                                        ]   5.46M   103KB/s    eta 10h 54m
```
Trong quá trình tải có một số thong tin như tốc độ tải, phần trăm, thời giản tải xuống.

### Tải xuống nhiều file
​
Hãy tạo một file chứa tất cả các url bạn cần download
​
```bash
$ cat lists.txt
http://www.example1/examplefile.zip
http://www.example2/examplefile.zip
http://www.example3/examplefile.zip
http://www.example4/examplefile.zip
http://www.example5/examplefile.zip
http://www.example6/examplefile.zip
```
​
Sử dụng options **-i** để có thể tải nhiều file với url được nằm trong một file mà bạn đã lưu trước đó
​

Example:
```bash
wget -i lists.txt
```

Hoặc bạn cũng có thể tải cùng lúc file qua giao thức http và ftp như sau:

```bash
wget http://example/http-example.zip ftp://example/ftp-example.zip
```
### Tải xuống và lưu với một tên khác

wget sẽ lấy từ dấu "/" cuối cùng của đường dẫn đến hết đường dẫn làm tên file được tải về, nhiều khi làm cho tên file không được phù hơp nên mình có thể đổi tên sao cho phù hợp với option **-O**.
Ví dụ mình muốn tải một file zip từ trang ``wget http://www.example/examplefile?id=123`` thì sau khi tải xong nó được lưu với tên là
`examplefile?id=123` và nó đang bị sai về phần đuôi mở rộng.
Để khắc phục nó mình có thể dùng options **-O** với tác dụng đổi tên file lưu trữ.

```bash
$ wget -O example.zip http://www.example/examplefile?id=123
```
### Thay đổi tốc độ tải xuống

Trong khi wget được gọi với chế độ mặc định thì nó sẽ chiếm bằng thông lớn nhất có thể. Điều này có thể ảnh hưởng tới một số công việc khác liên quan tới băng thông của bạn. Để tránh được việc này chúng ta có thể giới hạn tốc độ tải bằng option --limit-Rate của wget.

```bash
wget --litmit-Rate = 150k example.zip http://www.example/examplefile.zip
```

Như vậy là tốc độ đã được giới hạn ở mức 150k rồi.

### Tiếp tục tải sau khi tạm dừng

Wget hỗ trợ một option rất hữu ích giúp bạn có thể tiếp tục tải lại các file bị gián đoạn ở giữa do một sự cố không mong muốn nào đó. Nếu đó là một file lớn đang tải thì nó bị gián đoạn, thay vì tải lại từ đầu thì ta có thể bắt đầu tải lại từ vị trí nó bị gián đoạn với option **-c** trong wget.

```bash
wget -c example.zip http://www.example/examplefile.zip
```

### Thay đổi user-agent

Một số trang web chỉ chấp thuận những `user-agent` nhất định mới có thể làm việc với nó. Vì vậy để có thể thay đổi `user-agent`
để có thể tải được file từ trang web đó bằng cách sử dụng option **--user-agent**

Example:
```bash
wget --user-agent = "user-agent" example.zip http://www.example/examplefile.zip
```

### Thử lại nhiều lần

Kết nối của bạn không ổn định dẫn đến gây ra lỗi hay quá trình file được tải quá lơn có thể xảy ra lỗi trong quá trình tải xuống. Nếu cần thiết phải thử lại nhiều lần bạn có thể sử dụng option **--tries**.

Example:
```bash
wget --tries = 50 example.zip http://www.example/examplefile.zip
```

### Tải xuống cần xác thức
Khi bạn tải file nào đó mà phía server bắt xác thực mới cho tải bạn cũng có thể ử dụng nó như sau với **username** và **password** dùng để xác thực yêu cầu.
+ HTTP
    ```bash
    wget --http-user=username --http-password=password http://example/example.zip
    ```
+ FTP
    ```
    wget --ftp-user=username --ftp-password=password ftp://example/example.zip
    ```
### Loại bỏ, chấp thuận các file
+ Chấp thuận: bạn có thể dùng options **-A** hoặc **--accept** để chấp thuận các lists phần đuôi mở rộng mà bạn muốn tải.
    ```bash
    wget -r -A .png http://example/
    ```
+ Loại bỏ: bạn có thể dùng options **-R** hoặc **--reject** để loại bỏ các lists phần đuôi mở rộng mà bạn không muốn tải.
    ```bash
    wget --reject=png http://example/
    ```

## Tham khảo
Ngoài ra còn một số options các bạn có thể tự tìm hiểu thêm để phù hợp với nhu cầu của bạn
https://www.gnu.org/software/wget/manual/wget.html

https://neverendingsecurity.wordpress.com/2015/04/13/wget-commands-cheatsheet/