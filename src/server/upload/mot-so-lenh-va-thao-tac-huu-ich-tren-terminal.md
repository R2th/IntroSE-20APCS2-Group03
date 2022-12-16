# 1. Xem log realtime
Thông thường ta hay dùng lệnh 
`tail -f /var/log/nginx/access.log để xem realtime log.`
Nhưng ta có thể không cần dùng option -f mà dùng trực tiếp lệnh 
`tailf /var/log/nginx/access.log `
cũng có chức năng tương tự.

Đỡ mỏi tay hơn 1 chút :smile:

# 2. Xem cấu trúc cây thư mục bằng lệnh tree
Lệnh tree cho phép ta xem cấu trúc và cấp thư mục của một thư mục, kiểu như thế này

`~$ tree t`
```
t
├── a
│   ├── x
│   ├── y
│   └── z
├── b
│   ├── x
│   ├── y
│   └── z
└── c
    ├── x
    ├── y
    └── z
```
Với t là tên thư mục của mình

# 3. Tạo nhiều thư mục cùng lúc
Như ở trên ta thấy có thư mục cha là t, trong đó có 3 thư mục con tương ứng là a, b và c trong mỗi thư mục con lại có x, y và z.

Để có thể tạo liền một lúc cấu trúc thư mục trên ta có thể dùng lệnh

```
~$ mkdir -pv t/{a,b,c}/{x,y,z}
mkdir: created directory 't'
mkdir: created directory 't/a'
mkdir: created directory 't/a/x'
mkdir: created directory 't/a/y'
mkdir: created directory 't/a/z'
mkdir: created directory 't/b'
mkdir: created directory 't/b/x'
mkdir: created directory 't/b/y'
mkdir: created directory 't/b/z'
mkdir: created directory 't/c'
mkdir: created directory 't/c/x'
mkdir: created directory 't/c/y'
mkdir: created directory 't/c/z
```
Lưu ý là giữa các dấu phẩy trong {} không có khoảng trắng.

# 4. Trở về thư mục trước đó
Ví dụ ta cd tới một đường dẫn rất là dài, sau đó lại cd đi chỗ khác. Nếu quay lại thư mục trước thì phải gõ rất dài, có thể dùng lệnh

`~$ cd -`
Thực chất là sử dụng biến môi trường OLDPWD

```
~$ env | grep -i pwd
PWD=/root
OLDPWD=/var/log/nginx
```
# 5. Copy public-key lên server tự động
Ta cần ssh lên server bằng key. Cách thủ công thường làm là

```
~$ mkdir ~/.ssh
~$ touch ~/.ssh/authorized_keys
~$ # copy public-key to authorized_keys
~$ chmod 700 ~/.ssh
~$ chmod 600  ~/.ssh/authorized_keys
```
Rất phiền phức nên ta có thể sử dụng lệnh 
`ssh-copy-id user@ip_address`, 
sau đó nhập password của user thì public-key sẽ tự được copy lên server. Thư mục .ssh và tập tin authorized_keys cũng sẽ được tạo đúng quyền chúng ta cần.

# 6. Thực thi định kì một lệnh và xuất ra màn hình
Ví dụ mình chuyển 1 file 10GB qua một server khác, mình có thói quen kiểm tra xem kích thước của file đó bên server kia tới đâu rồi nên hay phải ls -lh 10GB.txt lặp đi lặp lại.

Có một cách khác để tự động thực thi lệnh trên mỗi 2s (mặc định) bằng lệnh watch như sau

`~$ watch 'ls -lh 10GB.txt'`
# 7. Sử dụng vim tới một dòng xác định
Khi cấu hình nginx, ta có option nginx -t để check config có đúng syntax hay không. Ví dụ nginx báo lỗi syntax ở dòng 19. Ta có thể mở file config tới trực tiếp dòng 19 như sau

`~$ vim /etc/nginx/nginx.conf +19`
# 8. Xem các file log mới nhất
Trong thư mục /var/log/nginx có rất nhiều file, có khi cả vài trăm file. Một mẹo ta có thể dùng lệnh ls với các tùy chọn sau để hiển thị file được thay đổi mới nhất nằm ở dưới cùng.

`~$ ls -larht`
Giải thích

* -l: để long list
* -a: để hiển thị file ẩn
* -h: để hiển thị size dễ đọc
* -t: để sort theo modify time
* -r: để đảo ngược, nghĩa là file được sửa gần nhất ở cuối
# 9. Thao tác với các tập tin nén
Trên server thường có một dịch vụ logrotate để nén log định kì. Nếu ta muốn điều tra log của những ngày trước thì ta sẽ cần giải nén các tập tin log này trước khi dùng grep, awk ...

Ta cũng có thể sử dụng các lệnh như zcat, zgrep, zless để đọc hay lọc các tập tin này mà không cần giải nén.

# 10. Kiểm tra process
Ta hay kiểm tra xem một process có được chạy hay không bằng lệnh

```
~$ ps -ef | grep nginx
root       944     1  0 Jun13 ?        00:00:00 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
nginx      945   944  0 Jun13 ?        00:22:14 nginx: worker process                   
nginx      946   944  0 Jun13 ?        00:20:37 nginx: worker proces
```
Hoặc

```
~$ ps -ef | grep nginx | grep -v grep
root       803     1  0 Jun14 ?        00:00:00 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
nginx      806   803  0 Jun14 ?        00:00:20 nginx: worker process
nginx      807   803  0 Jun14 ?        00:00:07 nginx: worker proces
```
Để loại bỏ chính lệnh kiểm tra. Nhưng ta cũng có thể dùng lệnh sau mà không cần grep -v

`~$ ps -ef | grep [n]ginx`
# 11. Dùng httpie thay curl
httpie cho phép hiển thị kết quả đẹp và màu sắc hơn, bớt nhàm chán hơn

# 12. Dùng ncdu thay cho du
Lệnh ncdu giúp kiểm tra kích thước của từng thư mục, tập tin trong một thư mục nào đó. Ngoài ra có thể xóa trực tiếp bằng key-binding

ncdu

# 13. Một số thao tác trên terminal
Ví dụ ta gõ một lệnh khá dài như sau

```
~$ grep '200' /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -sb
Ta có thể dùng
```

* **Ctrl + w:** để xóa từng từ từ vị trí con trỏ thay vì xài backspace để xóa từng kí tự
* **Ctrl + u:** để xóa từ vị trí con trỏ về đầu dòng
* **Alt + f:** để di chuyển tới từng từ
* **Alt + b:** để di chuyển lùi từng từ
...
# 14. Một số alias hữu ích
Có nhiều repo dotfiles trên github chia sẻ về vấn đề này. Cá nhân mình thì hay dùng 2 alias mình tự định nghĩa là lệnh p để lấy public ip và r để random password

```
~$ alias p
alias p='curl httpbin.org/ip'
~ $ p
{
  "origin": "17.33.190.22"
}
~$ alias r
alias r='openssl rand -base64 15'
~$ r
e1LhFM+Qo+Wm7OKivvZT
```
Ngoài ra thì mình rất hay có thói quen gõ nhầm lệnh ll thành l hoặc lll nên mình cũng alias 2 lệnh này luôn

# 15. chown/chgrp
Ví dụ ta muốn chown các file thuộc về user và group nginx. Bình thường ta sẽ làm vầy

`~$ chown -R nginx:nginx /var/log/nginx`
Ta cũng có thể không cần chỉ định group, mà sẽ lấy group mặc định của user đó bằng lệnh

`~$ chown -R nginx: /var/log/nginx`
hoặc
`~$ chown -R nginx. /var/log/nginx`
Sử dụng dấu hai chấm : và dấu chấm . ngay sau user

# 16. vimdifff
Có một thói quen khi vận hành hệ thống đó là backup file config trước khi có 1 edit thay đổi nhiều thứ.

`~$ cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.org`
Và sẽ cần diff để kiểm tra ta đã thayđổi cái gì hoặc làm gì mà nó có lỗi, một mẹo để ta không cần gõ full path

`~$ vimdiff /etc/nginx/{nginx.conf,nginx.conf.org}`
Tất nhiên bạn cũng có thể cd vào cũng được, mẹo này áp dụng cho cả 2 lệnh cp và mv nhưng cơ bản mình thấy vimdiff là tiện nhất

# Tóm lại
Nói chung là còn rất nhiều mẹo hữu ích giúp tăng productivity khi thao tác lệnh nữa, nhưng phía trên là những thứ mà mình dùng hằng ngày, Hi vọng nó sẽ hữu ích với ai đó. Nếu mọi người có mẹo gì hay ho có thể chia sẻ thêm nhé :satisfied:

Cheer!!!

[Nguồn: Sưu tầm](https://kipalog.com/posts/Mot-so-lenh-va-thao-tac-huu-ich-tren-terminal)