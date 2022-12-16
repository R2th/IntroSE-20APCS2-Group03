# Grep command
Grep command là lệnh được dùng để tìm kiếm file phù hợp với text chỉ định. Đây là một lệnh cực kì mạnh mẽ với nhiều tùy chọn.
Cú pháp:
```
grep [options] pattern [files]
```
### 1. Làm thế nào để tìm tất cả các dòng phù hợp với một từ khóa trong một file?
Trong ví dụ này, lệnh grep tìm kiếm từ  khóa framgia bên trong file /etc/passwd và hiển thị tất cả những dòng phù hợp.
```
~$ grep framgia  etc/passwd
framgia:x:1000:1000:framgia,,,:/home/framgia:/bin/bash
```
option -v sẽ hiển thị tất cả các dòng mà không mong muốn có từ khóa framgia.
Chú ý: chỉ có dòng đầu tiên của đầu ra được hiển thị bên dưới:
```
~$ grep -v framgia  etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
...
```
### 2. Có bao nhiêu dòng khớp với một văn bản mẫu cụ thể.
Trong ví dụ dưới đây sẽ hiển thị tổng số của dòng mà nó chứa text framgia trong file /etc/passwd
```
~$ grep -c framgia /etc/passwd
1
```
Bạn cũng có thể lấy tổng số dòng không phù hợp với từ khóa trên:
```
~$ grep -cv framgia /etc/passwd
46
```
### 3. Làm sao để tìm kiếm từ khóa bằng cách loại bỏ chữ hoa?
Dùng option -i thì nó sẽ loại bỏ các chữ in hoa:
```
~$ grep -i Framgia /etc/passwd
framgia:x:1000:1000:framgia,,,:/home/framgia:/bin/bash
```
### 4. Làm sao để tìm kiếm tất cả các thư mục con cho một văn bản cụ thể ?
Sử dụng option -r để tìm kiếm đệ quy cho mục đích này. Trong ví dụ bên dưới, nó sẽ tìm kiếm văn bản "framgia" bằng cách bỏ đi chữ in hoa bên trong tất cả các thư mục con /home/users.
```
  ~$ grep -ri john /home
   /home/nguyen.thai.son/.bashrc:#framgia
   /home/nguyen.thai.son/.bashrc:alias gpfd="git pull framgia develop"
   /home/nguyen.thai.son/.bashrc:alias gffd="git fetch framgia develop"
   ...
 ```
 
#  Regular Expression in Grep
Biểu thức chính quy được sử dụng để tìm kiếm và thao tác văn bản, dựa trên các mẫu. Hầu hết các lệnh và ngôn ngữ lập trình Linux đều sử dụng cụm từ thông dụng.
### 1. Bắt đầu của một dòng ( ^ )
Trong lệnh grep thì biểu tượng dấu mũ (^) để khớp với biểu  thức đầu dòng.
Trong ví dụ dưới nó hiển thị tất cả các dòng cái mà bắt đầuu với Nov 10. 
```
$ grep "^Nov 10" messages.1
Nov 10 01:12:55 gs123 ntpd[2241]: time reset +0.177479 s
Nov 10 01:17:17 gs123 ntpd[2241]: synchronized to
LOCAL(0), stratum 10
Nov 10 01:18:49 gs123 ntpd[2241]: synchronized to
15.1.13.13, stratum 3
Nov 10 13:21:26 gs123 ntpd[2241]: time reset +0.146664 s
```
### 2. Kết thúc của một dòng 
kí tự $ sẽ khớp với biểu thức ở cuối dòng. Trong ví dươi sẽ lấy ra tất cả những dòng mà có kết  thúc là “terminating”.
```
$ grep "terminating.$" messages
Jul 12 17:01:09 cloneme kernel: Kernel log daemon
terminating.
Oct 28 06:29:54 cloneme kernel: Kernel log daemon
terminating.
```
### 3. Đếm số lượng dòng trống
sử dụng kí tự ^ kết hợp với $ để có thể tìm tất cả nhưng dòng trống trong file.
```
$ grep -c
"^$" messages anaconda.log
messages:0
anaconda.log:3
```
### 4. Kí tự đơn (.)
Kí tự (.) sẽ khớp với bất kì  kí tự nào ngoại trừ cuối của dòng.
ví dụ ta có 1 file:
```
$ cat input
1. first line
2. hi hello
3. hi zello how are you
4. cello
5. aello
6. eello
7. last line
```
Giờ ta dùng (.) để tìm kiếm
```
$ grep ".ello" input
2. hi hello
3. hi zello how are you
4. cello
5. aello
6. eello
```
Bài viết xin được tạm dừng tại đây. Hẹn các bạn ở bài viết tiếp theo.

Nguồn: linux 101 hack.