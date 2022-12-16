# Process trong Unix/Linux là gì?

Một trong những đặc điểm nổi bật của Unix/Linux là khả năng chạy đồng thời nhiều chương trình. *Hệ Điều Hành xem mỗi đơn thể mã lệnh mà nó điều khiển là tiến trình (process)*. Một chương trình có thể bao gồm nhiều tiến trình kết hợp với nhau. Đối với Hệ Điều Hành, các tiến trình cùng hoạt động chia sẻ tốc độ xử lý của CPU, cùng dùng chung vùng nhớ và tài nguyên hệ thống khác. Các tiến trình được điều phối xoay vòng bởi Hệ Điều Hành.

Và là một kỹ sư lập trình hệ thống, một system admin hay một DevOps…  thì phần lớn thời gian bạn sẽ phải làm việc trên hệ thống Unix/Linux. Để làm việc trên Unix/Linux, chúng ta tương tác với hệ điều hành thông qua các lệnh (command). Mỗi lệnh trên Unix/Linux khi thực thi sẽ run một process hoặc một group các processes. Chính vì vậy, những hiểu về tiến trình và kỹ năng quản lý và sử dụng tiến trình trên hệ thống Unix/Linux là hết sức cần thiết. Trong bài viết này, mình sẽ giới thiệu đến các bạn những kiến thức và kỹ năng cơ bản để quản lý các tiến trình trên hệ thống Unix/Linux nhé :)))

![](https://images.viblo.asia/e7c46a92-54f0-404c-83ce-decf96267cf1.png)

# Các thuật ngữ cơ bản
- **PID**

Mỗi tiến trình có một định danh PID (Process Identify) duy nhất trong toàn bộ hệ thống vào thời điểm tiến trình đang chạy
-  **PPID**

Mỗi tiến trình đều có một tiến trình cha (parent process) với định danh là PPID (Parent process identify). Các tiến trình con (child process) thường được start bởi tiến trình cha (parent process). Một parents process có thể có nhiều child process nhưng một child process chỉ có một parents process.
-  **init** 

Init process là tiến trình đầu tiên được khởi động sau khi bạn lựa chọn hệ điều hành trong boot loader. Trong cây tiến trình, init process là tiến trình cha của các tiến trình khác. Init process có đặc điểm sau:
    + PID = 1
    + Không thể kill init process
-  **kill** 

Khi một tiến trình dừng chạy, tiến trình đó sẽ chết. Khi bạn muốn muốn 1 tiến trình chết, bạn sẽ phải kill nó đi.
-  **daemon**

Một daemon process là một tiến trình chạy  nền (background). Các tiến trình này được bắt đầu khi khởi động hệ thống và sẽ tiếp tục được chạy mãi.
-  **zombie**

Zombie thực chất là một phần còn sót lại của một tiến trình đã ngừng hoạt động nhưng chưa được xử lý sạch. Và, đúng vậy, zombie nghĩa là thây ma tức là tiến trình đó đã chết và bạn không thể “kill” nó thêm 1 lần nữa :D Những chương trình sau khi thoát để lại tiến trình Zombie thì điều đó đồng nghĩa với việc chương trình đó được lập trình không tốt.
# Quản lý tiến trình trong linux cơ bản
- **$$ và $PPID**

Một số biến môi trường shell chứa thông tin về các tiến trình. Biến `$$` sẽ giữ ID tiến trình hiện tại của bạn và `$ PPID` chứa PID chính. Thực ra `$$` là một shell parameter và không phải là một biến, bạn không thể gán giá trị cho nó.
Dưới đây, mình sử dụng lệnh echo để hiển thị các giá trị của `$$` và `$ PPID`.
```
thanhthu ~  $ echo $$ $PPID
15029 15014
```
- **pidof**

Với lệnh `pidopf`, bạn có thể tìm kiếm tất cả các process id theo tên.
```
thanhthu  ~  $ pidof caddy
17490 8361
```
- **parent and child**

Các tiến trình có mối quan hệ cha-con. Mọi tiến trình đều có tiến trình cha (parent process). Khi bắt đầu một bash mới, bạn có thể sử dụng echo để xác minh rằng pid trước đó có phải là ppid của shell mới. Tiến trình con từ phía trên bây giờ là tiến trình cha.
```
thanhthu ~  $ bash
thanhthu ~  $ echo $$ $PPID
16150 15029
```
Nhập `exit` để kết thúc tiến trình hiện tại và xem giá trị của `$$` và `$PPID`
```
thanhthu ~  $ bash
thanhthu ~  $ echo $$ $PPID
16150 15029
thanhthu ~  $ exit
thanhthu ~  $ echo $$ $PPID
15029 15014
```
- **fork và exec**

Một tiến trình bắt đầu một tiến trình khác theo hai giai đoạn. Đầu tiên, tiến trình tạo ra một nhánh (fork) của chính nó, sao y hệt. Sau đó, tiến trình được phân nhánh thực hiện một trình thực thi (exec) để thay thế tiến trình được phân nhánh bằng
tiến trình con.
```
thanhthu ~  $ echo $$
15029
thanhthu ~  $ bash
thanhthu ~  $ echo $$ $PPID
7437 15029
thanhthu ~  $
```
- **exec**
Với lệnh exec, bạn có thể thực hiện một tiến trình mà không cần tạo tiến trình mới. Trong ví dụ bên dưới, Korn shell (ksh) được khởi động và đang được thay thế bằng một  bash shell bằng cách sử dụng lệnh exec. Pid của bash shell cũng giống như pid của Korn
shell. Thoát khỏi bash shell con sẽ đưa tôi trở lại bash shell cha, không quay lại Korn shell (không tồn tại nữa).
```
thanhthu ~  $ echo $$
15029 # PID of bash
thanhthu ~  $ ksh
$ echo $$ $PPID
5343 15029 # PID of ksh and bash
$ exec bash
thanhthu ~  $ echo $$ $PPID
5343 15029 # PID of bash and bash
thanhthu ~  $ exit
exit
thanhthu ~  $ echo $$
15029
```
- **ps**

Một trong những công cụ phổ biến nhất trên Linux để xem các tiến trình là ps. Ví dụ sau sẽ cho thấy mối quan hệ cha con giữa ba tiến trình bash.
```
thanhthu ~  $ echo $$ $PPID
4224 4223
thanhthu ~  $ bash
thanhthu ~  $ echo $$ $PPID
4866 4224
thanhthu ~  $ bash
thanhthu ~  $ echo $$ $PPID
4884 4866
thanhthu ~  $ ps fx
 PID TTY STAT TIME COMMAND
 4223 ? S 0:01 sshd: paul@pts/0
 4224 pts/0 Ss 0:00 \_ -bash
 4866 pts/0 S 0:00 \_ bash
 4884 pts/0 S 0:00 \_ bash
 4902 pts/0 R+ 0:00 \_ ps fx
thanhthu ~  $ exit
exit
thanhthu ~  $ ps fx
 PID TTY STAT TIME COMMAND
 4223 ? S 0:01 sshd: paul@pts/0
 4224 pts/0 Ss 0:00 \_ -bash
 4866 pts/0 S 0:00 \_ bash
 4903 pts/0 R+ 0:00 \_ ps fx
thanhthu ~  $ exit
exit
thanhthu ~  $ ps fx
 PID TTY STAT TIME COMMAND
 4223 ? S 0:01 sshd: paul@pts/0
 4224 pts/0 Ss 0:00 \_ -bash
 4904 pts/0 R+ 0:00 \_ ps fx
thanhthu ~  $ 
```

Trên Linux, `ps fax` là command  thường được sử dụng. Trên Solaris `ps -ef` (cũng hoạt động trên Linux) là command phổ biến hơn cả. Đây là một phần đầu ra từ command `ps fax`
```
thanhthu ~  $ ps fax
PID TTY STAT TIME COMMAND
1 ? S 0:00 init [5]
...
3713 ? Ss 0:00 /usr/sbin/sshd
5042 ? Ss 0:00 \_ sshd: paul [priv]
5044 ? S 0:00 \_ sshd: paul@pts/1
5045 pts/1 Ss 0:00 \_ -bash
5077 pts/1 R+ 0:00 \_ ps fax
```
- **pgrep**

Tương tự như `ps -C`, bạn cũng có thể sử dụng pgrep để tìm kiếm một tiến trình theo command name của nó
```
thanhthu ~  $ sleep 1000 &
[1] 32558
thanhthu ~  $ pgrep sleep
32558
thanhthu ~  $ ps -C sleep
 PID TTY TIME CMD
32558 pts/3 00:00:00 sleep
```

Bạn cũng có thể liệt kê command name của tiến trình với pgrep
```
thanhthu ~  $ pgrep -l sleep
9661 sleep
```
- **top**

Một công cụ phổ biến và có lẽ rất quen thuộc đối với người dùng Linux là `top`. `top` có thể  thể hiển thị cho ta một bảng realtime (thời gian thực) các tiến trình đang chạy, bên cạnh tiến trình thì bạn còn có thể theo dõi cả tính trạng CPU, memory của hệ thống. `top` cũng cung cấp  nhiều các option khác nhau giúp bạn có thể sắp xếp các tiến trình theo cpu, cách sử dụng hoặc các thuộc tính khác. Ngoài ra, bạn cũng có thể kill các tiến trình với `top`. Nhìn chung, theo mình thấy đây là một công cụ quan trọng vừa trực quan, vừa dễ hiểu, dễ sử dụng cho các admin quản trị hệ thống linux nói chung. 

![](https://images.viblo.asia/9d281851-075d-4812-bab6-f53e39d9e3f7.png)

 Các tham số chính cho lệnh top
   + -h - Hiển thị phiên bản hiện tại
   + -c - Tham số này chuyển đổi trạng thái cột lệnh từ hiển thị lệnh sang hiển thị tên chương trình và ngược lại
   + -d - Chỉ định thời gian trễ khi refresh màn hình
   + -o - Sắp xếp theo trường được đặt tên
   + -p - Chỉ hiển thị các tiến trình với ID được chỉ định
   + -u - Chỉ hiển thị những tiến trình của người dùng được chỉ định
   + -i - Không hiển thị các idle task

Ngoài ra, trong khi lệnh top đang chạy, bạn có thể bật và tắt nhiều tính năng, thay đổi hiển thị bằng cách nhấn các phím có liên quan. Còn có nhiều tham số hơn dành cho lệnh top. Bạn có thể đọc thêm về chúng bằng cách sử dụng command `man top` trên cửa sổ dòng lệnh.
# Tạm kết

Trên đây, mình vừa chia sẻ những kỹ năng cơ bản, những command thường được sử dụng để quản lý các process trên hệ điều hành Unix/Linux. Ở phần tiếp theo, mình sẽ cùng với các bạn tiếp tục tìm về [giao  tiếp giữa các tiến trình trên Linux](https://viblo.asia/p/giao-tiep-giua-cac-tien-trinh-trong-linux-phan-1-su-dung-signal-va-pipe-Qpmlejxr5rd).

Mong các bạn hãy tiếp tục theo dõi, góp ý và ủng hộ mình nhé!