Chào mừng các bạn đã trở lại với series hay nói đúng hơn là cheatsheet về các câu lệnh Linux mình tổng hợp lại sau quá trình tự học. Như đã giới thiệu ở phần trước thì nội dung bài viết nằm trong cuốn [The Linux Command Line: A Complete Introduction - William E. Shotts Jr.](https://www.amazon.com/Linux-Command-Line-Complete-Introduction/dp/1593273894), nên bạn nào muốn tìm hiểu sâu hơn, có lời giải thích kỹ hơn thì hãy tìm đọc theo cuốn sách đó.

Ở phần trước chúng ta đã tìm hiểu về permission và các câu lệnh liên quan, ở phần này, chúng ta sẽ đi tìm hiểu về Processes và cách quản lý process bằng lệnh trong Linux. Ở phần này chúng ta sẽ được tìm hiểu về các lệnh sau:

```
- ps
- top
- jobs
- bg
- fg
- kill, killall
- shutdown
```

### Một process hoạt động thế nào?

Khi hệ thống khởi động, kernel sẽ khởi tạo một vài hành vi của riêng nó dưới một process và khởi động một chương trình gọi là `init`. `init` theo đó sẽ khởi chạy một loạt các shell script (nằm ở `/etc`) được gọi là init script, sẽ khởi động tất cả các service hệ thống. 

Rất nhiều service này được implement dưới dạng daemon program, chương trình chạy background mà không can thiệp tới giao diện người dùng. Vì thế kể cả khi chúng ta không đăng nhập thì hệ thống cũng ở trạng thái busy một lúc để khởi chạy.

Chương trình có thể khởi chạy một chương trình khác được diễn giải trong cơ chế process gọi là process cha sinh ra process con.

Kernel sẽ duy trì thông tin về mỗi một process. Ví dụ: mỗi process được gán cho một giá trị là PID (process ID). PID được gán theo thứ tự tăng dần và `init` luôn có PID là `1`. Kernel cũng theo dõi thông tin bộ nhớ gán cho mỗi process, cũng như tính sẵn sàng của process để có thể tiếp tục thực thi. 

Cũng như file thì process cũng có owner và user ID, ...

#### Theo dõi process

Câu lệnh phổ biến để theo dõi các process là `ps`. `ps` có rất nhiều tùy chọn, cách dùng cơ bản nhất là:

```
➜  ~ ps
  PID TTY          TIME CMD
 4486 pts/1    00:00:00 zsh
 4845 pts/1    00:00:00 ps
```

Chúng ta có thể thấy là mặc định thì `ps` sẽ không show quá nhiều thông tin, chỉ show thông tin của terminal session hiện tại. 

- Kết quả list ra 2 processes cùng với thông tin PID.
- `TTY` là viết tắt của teletype, để chỉ terminal đang chạy process đó.
- `TIME` đế chỉ thời gian chiếm CPU của process tương ứng.

Với thêm options `x`, chúng ta sẽ nhìn thấy tất cả các tiến trình bất kể terminal nào.

```
  PID TTY      STAT   TIME COMMAND
 2058 ?        Ss     0:00 /lib/systemd/systemd --user
 2059 ?        S      0:00 (sd-pam)
 2064 ?        SLl    0:00 /usr/bin/gnome-keyring-daemon --daemonize --login
 2066 ?        Ss     0:00 /sbin/upstart --user
 2144 ?        S      0:00 upstart-udev-bridge --daemon --user
 2154 ?        Ss     0:00 dbus-daemon --fork --session --address=unix:abstract=
 2166 ?        Ss     0:00 /usr/lib/x86_64-linux-gnu/hud/window-stack-bridge
 2193 ?        Ssl    0:11 /usr/bin/ibus-daemon --daemonize --xim --address unix
 2199 ?        Sl     0:00 /usr/lib/gvfs/gvfsd
...
```

Chúng ta có thể thấy cột `STAT` mới xuất hiện, viết tắt của state để chỉ trạng thái của process tương ứng, chúng ta có các dạng state sau:

| Trạng thái | Ý nghĩa | 
| -------- | -------- | 
| R     | Running. Process đang chạy hoặc sẵn sàng để chạy     | 
|S | Sleeping. Process đang đợi một event để tiếp tục chạy |
|D|Process đang đợi I/O|
|T| Stopped. Process đang trong quá trình dừng chạy|
|Z|Zombie process. Đây là các tiến trình con đã bị chấm dứt nhưng chưa được giải phóng bởi process cha|
|<|Process có độ ưu tiên cao, có thể có nhiều thời gian CPU hơn|
|N|Process có độ ưu tiên thấp, chỉ có thể chiếm CPU khi các process khác có độ ưu tiên cao hơn hết thời gian CPU|

Một set option phổ biến khác là `aux`

```
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0 185380  6036 ?        Ss   20:28   0:02 /sbin/init spla
root         2  0.0  0.0      0     0 ?        S    20:28   0:00 [kthreadd]
root         4  0.0  0.0      0     0 ?        I<   20:28   0:00 [kworker/0:0H]
root         6  0.0  0.0      0     0 ?        I<   20:28   0:00 [mm_percpu_wq]
root         7  0.0  0.0      0     0 ?        S    20:28   0:00 [ksoftirqd/0]
root         8  0.1  0.0      0     0 ?        I    20:28   0:05 [rcu_sched]
root         9  0.0  0.0      0     0 ?        I    20:28   0:00 [rcu_bh]
root        10  0.0  0.0      0     0 ?        S    20:28   0:00 [migration/0]
root        11  0.0  0.0      0     0 ?        S    20:28   0:00 [watchdog/0]
root        12  0.0  0.0      0     0 ?        S    20:28   0:00 [cpuhp/0]
root        13  0.0  0.0      0     0 ?        S    20:28   0:00 [cpuhp/1]
root        14  0.0  0.0      0     0 ?        S    20:28   0:00 [watchdog/1]
root        15  0.0  0.0      0     0 ?        S    20:28   0:00 [migration/1]
root        16  0.0  0.0      0     0 ?        S    20:28   0:00 [ksoftirqd/1]
root        18  0.0  0.0      0     0 ?        I<   20:28   0:00 [kworker/1:0H]
...
```

Khi chạy `ps` với option này sẽ hiển thị process thuộc về mọi user. 

#### Theo dõi process với `top`

`ps` sẽ cung cấp một bản snapshot của các tiến trình trong hệ thống tại thời điểm mà chúng ta chạy nó. Trong khi đó `top` cung cấp một chế độ theo dõi `động` hơn:

```
top - 21:55:13 up  1:26,  1 user,  load average: 0,80, 0,98, 0,98
Tasks: 238 total,   1 running, 187 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0,9 us,  1,1 sy,  0,0 ni, 97,8 id,  0,2 wa,  0,0 hi,  0,0 si,  0,0 st
KiB Mem :  8079612 total,  2684732 free,  1807524 used,  3587356 buff/cache
KiB Swap:        0 total,        0 free,        0 used.  5774920 avail Mem 

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 2771 hunguyen  20   0 1212200 225688 133960 S   2,0  2,8   2:17.17 chrome
 3245 hunguyen  20   0 1572620 658884 173076 S   1,7  8,2  10:29.73 chrome
 4326 root      20   0       0      0      0 I   1,3  0,0   5:33.17 kworker/u8:1
 1119 root      20   0  539328 107400  62392 S   0,7  1,3   5:50.52 Xorg
 2458 hunguyen  20   0 1685296 182716  75100 S   0,7  2,3   3:47.08 compiz
 2944 hunguyen  20   0  646812 147476 101644 S   0,7  1,8   6:41.47 chrome
  937 syslog    20   0  256392   3352   2748 S   0,3  0,0   0:00.67 rsyslogd
 1074 root      20   0   19536   2264   2000 S   0,3  0,0   0:00.41 irqbalance                                             ...
```

Sau đây là bảng giải thích ý nghĩa output của lệnh `top`:

|Dòng|Trường|Ý nghĩa|
| -------- | -------- | -------- | 
|1|top|Tên của chương trình|
||21:55:13|Thời gian hiện tại|
||up 6:30|uptime. Thời gian hệ thống bắt đầu chạy|
||1 users|Có 1 user đã log in|
||load average:|Chỉ ra con số ở trạng thái có thể chạy và đang share CPU. Giá trị dưới `1.0` chỉ ra là hệ thống đang không busy|
|2|Tasks:|Tổng kết số lương process và số lương process theo trạng thái|
|3|Cpu(s):|Dòng này miêu tả đặc điểm của những tác vụ CPU đang thực thi|
||0,9 us|0,9% CPU đang được dùng cho user process|
||1,0 us|1,0% CPU đang được dùng cho system process|
||0,0 ni|0,0% CPU đang được dùng cho process có độ ưu tiên thấp|
||97,8 id|97,8% của CPU đang nhàn rỗi |
||0,0 wa|97,8% của CPU đang chờ I/O |
|4|Mem:|Chỉ ra có bao nhiêu RAM đang được dùng|
|5|Swap:|Chỉ ra có bao nhiêu Swap space đang được dùng|

### Kiểm soát process

Khi chúng ta gõ một lệnh và chạy nó, terminal sẽ ở trạng thái không dùng được cho đến chương trình chạy xong, chắc hẳn chúng ta đã quá quen thuộc với việc sử dụng `ctrl-c` để kết thúc một chương trình đang được thực thi, trong phần này chúng ta sẽ tìm hiểu về các cách để kiểm soát một process như vây.

Trong phần này chúng ta sẽ lấy ví dụ với chương trình `xlogo` thực thi một việc đơn giản đó là show ra cửa sổ có hình logo hệ thống. Đặc điểm của chương trình này là nó sẽ chiếm terminal cho đến khi chúng ta tắt cửa sổ logo đó đi.

Vậy làm sao để chạy một chương trình mà nó không chiếm terminal của chúng ta, chúng ta có thể thêm `&` vào cuối câu lệnh muốn chạy.
Việc làm này gọi là chạy background job.

```
➜  ~ xlogo &  
[1] 7929
➜  ~ ps
  PID TTY          TIME CMD
 4486 pts/1    00:00:00 zsh
 7929 pts/1    00:00:00 xlogo
 7936 pts/1    00:00:00 ps
```

Sau khi chạy lệnh trên, terminal thông báo cho chúng ta biết là chúng ta đã bắt đầu chạy background job đầu tiên với PID là `7929`. Chúng ta có thể kiểm tra lại bằng lệnh `ps` như trên.

Ngoài ra còn một lệnh khác cũng có thể list các background job đó là `jobs`

```
➜  ~ xlogo &
[1] 8075
➜  ~ jobs
[1]  + running    xlogo
```


Để trả một process đang chạy background về foreground thì chúng ta có thể sử dụng lệnh `fg` là viết tắt của foreground.

```
➜  ~ jobs
➜  ~ xlogo &
[1] 8122
➜  ~ jobs
[1]  + running    xlogo
➜  ~ fg %1
[1]  + 8122 running    xlogo

```

Chúng ta truyền vào lệnh `fg` số thứ tự của `jobs`, chương trình sẽ lại chiếm terminal như khi chúng ta chạy nó bình thường.

Để stop một process (khác với terminate process sử dụng ctrl-c) ta sử dụng ctrl-z

```
➜  ~ xlogo 
^Z
[1]  + 8177 suspended  xlogo
```

khi đó, đối với `xlogo` chúng ta không thể resize cửa sổ chương trình được. Để tiếp tục thực thi chương trình, chúng ta có thể sử dụng lệnh `fg` như trên với tham số là số hiệu của jobs. Hoặc chúng ta cũng có thể sử dụng lệnh `bg`, tiếp tục chạy chương trình ở background

```
➜  ~ bg %1
[1]  + 8177 continued  xlogo
➜  ~ 
```

### Signals

Chúng ta có thể sử dụng lệnh `kill` để dừng process. 

```
➜  ~ xlogo &
[1] 8276
➜  ~ kill 8276
[1]  + 8276 terminated  xlogo                                                                            
➜  ~ ps
  PID TTY          TIME CMD
 4486 pts/1    00:00:00 zsh
 8291 pts/1    00:00:00 ps
```

Thực ra lệnh `kill` không thực sự *kill* process mà nó gửi đến process một signal. Signals là cách mà OS giao tiếp với chương trình. Việc chúng ta sử dụng ctrl-c và ctrl-z cũng chính là gửi tín hiệu INT và TSTP đến cho chương trình.

Để gửi signal đến một chương trình, chúng ta có thể sửa dụng lệnh `kill` kết hợp với số/tên của signal. Sau đây là một số signal phổ biến:

|Số hiệu|Tên|Ý nghĩa|
| -------- | -------- | -------- | 
|2|INT| Giống với ctrl-c. Thường là terminate chương trình |
|9|KILL|Thực sự là signal này không thực sự gửi đến chương trình mà kernel sẽ ngay lập tức terminate chương trình mà không có một hành động `clean up` nào|
|15|TERM|Terminate. Đây là tín hiệu mặc định mà lệnh `kill` gửi đến chương trình.|
|18| CONT| continue. Restore trạng thái của process sau khi nhận tín hiệu STOP|
|...|...|...|

```
➜  ~ kill -STOP 8525 
[1]  + 8525 suspended (signal)  xlogo                                                                    
➜  ~ kill -CONT 8525
➜  ~ ps
  PID TTY          TIME CMD
 4486 pts/1    00:00:00 zsh
 8525 pts/1    00:00:00 xlogo
 8551 pts/1    00:00:00 ps
➜  ~ kill -INT 8525
[1]  + 8525 interrupt  xlogo
```

Các bạn có thể tham khảo thêm về các signal khác tại [đây](https://www.linux.org/threads/kill-signals-and-commands-revised.11625/).

Ngoài ra chúng ta có thể chạy lệnh `kill -l` để list ra các signal khả dụng của hệ thống

```
➜  ~ kill -l
HUP INT QUIT ILL TRAP ABRT BUS FPE KILL USR1 SEGV USR2 PIPE ALRM TERM STKFLT CHLD CONT STOP TSTP TTIN TTOU URG XCPU XFSZ VTALRM PROF WINCH POLL PWR SYS
```

Ngoài ra chúng ta có thể gửi kill signal đến nhiều tiến trình chạy cùng một chương trình bằng cách sử dụng `killall`

```
➜  ~ xlogo &
[1] 8906
➜  ~ xlogo &
[2] 8914
➜  ~ xlogo &
[3] 8939
➜  ~ ps
  PID TTY          TIME CMD
 4486 pts/1    00:00:00 zsh
 8906 pts/1    00:00:00 xlogo
 8914 pts/1    00:00:00 xlogo
 8939 pts/1    00:00:00 xlogo
 8951 pts/1    00:00:00 ps
➜  ~ killall xlogo
[1]    8906 terminated  xlogo                                                                       
[3]  + 8939 terminated  xlogo
[2]  + 8914 terminated  xlogo
➜  ~ ps
  PID TTY          TIME CMD
 4486 pts/1    00:00:00 zsh
 8962 pts/1    00:00:00 ps
```


-----

Sắp tới những bài viết của mình sắp tới sẽ được cập nhật thường xuyên trên blog cá nhân [chiase.tech](https://chiase.tech). Series câu lệnh Linux sẽ được mình update những nội dung mới hơn tại [đây](https://chiase.tech/chu-de/linux/). Mong các bạn giành thời gian ủng hộ và góp ý nhé 😁

Tham khảo: 
- https://chiase.tech/cac-cau-lenh-linux-co-ban-phan-6-processes/