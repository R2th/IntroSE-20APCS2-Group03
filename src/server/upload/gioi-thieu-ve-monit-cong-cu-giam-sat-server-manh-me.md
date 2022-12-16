# Monit là gì?
Monit là một công cụ giám sát mã nguồn mở miễn phí cho Unix và Linux. Monit chạy trên localhost. Điểm nổi bật của Monit so với các công cụ monitoring khác là nó có khả năng thực hiện bảo trì tự động, sửa chữa và chạy các hành động nhân quả có ý nghĩa trong các tình huống lỗi. 

Chính nhờ khả năng tác động vào hệ thống, monit được sử dụng khá phổ biến, đặc biệt với cộng đồng Ruby On Rails - khi mà các ứng dụng Ruby on Rails cần quản lí khá nhiều process. Nhiều trang web Rails phổ biến đã sử dụng Monit, như Twitter và scribd.
![](https://images.viblo.asia/6322cc53-e095-4809-be06-583c832fc638.png)

# Đối tượng monitor
**1. Processes**

Monit đặc biệt hữu ịch trong việc theo dõi các process chạy nền. Ví dụ: apache, mysql, nginx,.. Với monit, chúng ta có thể start service nếu nó không chạy, restart service nếu nó không phản hồi, hoặc kill nósử dụng quá nhiều tài nguyên (RAM, CPU).

Cú pháp:
```
    CHECK PROCESS <unique name> <PIDFILE <path> | MATCHING <regex>>
```

**2.Files, Directories, Filesystem**

Monit có giám sát các tệp, thư mục khi có thay dổi, chẳng hạn như thay đổi dấu thời gian hoặc thay đổi kích thước..v..v

Cú pháp:
```
    CHECK FILE <unique name> PATH <path>
    CHECK FILESYSTEM <unique name> PATH <string>
    CHECK DIRECTORY <unique name> PATH <path>
```

**3.Network connections**

Monit  có thể thực hiện Network test ở cấp độ giao thức. Monit được tích hợp giao thức Internet chính, chẳng hạn như HTTP, SMTP, ..v.v. 
Ngay cả khi giao thức không được hỗ trợ, bạn vẫn có thể config Monit để gửi bất kỳ dữ liệu nào và kiểm tra phản hồi từ server

Cú pháp:
```
    CHECK NETWORK <unique name> <ADDRESS <ipaddress> | INTERFACE <name>>
```

**4.Programs**

Monit có thể thực hiện 1 chương trình hoặc chạy một đoạn scripts tại một số thời điểm nhất định giống như một crontab. Ngoài ra, bạn có thể kiểm tra gía trị trả về của chương trình/scripts để thực hiện một hành động nào đấy. Điều này có nghĩa bạn có thể dùng Monit để kiểm tra mọi thứ mà bạn có thể viết scripts. Về cách viết bash scripts bạn có thể tham khảo thêm ở https://viblo.asia/p/tim-hieu-ve-bash-script-co-ban-07LKXNwklV4

Cú pháp:
```
    CHECK PROGRAM <unique name> PATH <executable file> [TIMEOUT <number> SECONDS]
```
**5.System**

Monit cũng có thể giám sát tài nguyên trên máy. Như các thông số về RAM, CPU, System Load, ..v.v

```
    CHECK SYSTEM <unique name>
```
# Monit action
Monit cung cấp cho ta một số hành đông có thể thực hiện đối với mỗi giám sát

* **Alert** Gửi cảnh báo cho người dùng qua email
* **RESTART** Khởi động lại service **VÀ** gửi cảnh báo.
* **START** Khởi động service bằng cách gọi phương thức được khai báo trong config **VÀ** gửi cảnh báo
* **STOP**  Dừng service bằng cách gọi phương thức được khai báo trong config **VÀ** gửi cảnh báo. Nếu monit stop một service, service đó sẽ không được monitor nữa và cũng không được tự khởi động lại. Muốn khởi động lại service, bạn phải khởi động bằng tay
* **EXEC** dùng để thực thi một chương trình **VÀ** gửi cảnh báo. Thường dùng để run một đoạn scripts
* **UNMONITOR** ngừng giám sát **VÀ** gửi cảnh báo
# Cài đặt và sử dụng Monit
Vậy là chúng ta đã có cái nhìn tổng quan về Monit. Bây giờ, hãy thử cài đặt và sử dụng nó.
## Install Monit
**On RedHat/CentOS/Fedora/**
```
yum install monit
```

**On Ubuntu/Debian/Linux Mint**
```
sudo apt-get install monit
```
## Configuring Monit
Monit rất dễ cấu hình, trên thực tế, các file cấu hình  khá dễ đọc vì nó khá sát với ngôn ngữ thông thường.

Mặc định, Monit giám sát các dịch vụ đang chạy trong mỗi 2 phút và ghi lại lịch sử vào file log được đặt tại:  `/var/log/monit.`
Muốn sửa chu kì chạy monit, ta có thể sửa dòng này trong file config `/etc/monit/monitrc`
```
set daemon 120            # check services at 2-minute intervals
```
 
Monit có giao diện web của  chạy trên cổng 2812. Để kích hoạt giao diện web, chúng ta cần thay đổi tệp cấu hình monit. 

File cấu hình chính của monit nằm ở `/etc/monit.conf ` (RedHat / CentOS / Fedora) và `/etc/monit/monitrc`cho (Ubuntu / Debian / Linux Mint). Mở file này lên và thay đổi như sau:
```
sudo vi /etc/monit/monitrc
```
tìm đến dòng config HTTPD
```
set httpd port 2812 and
     use address localhost  # only accept connection from localhost
     allow localhost        # allow localhost to connect to the server and
     allow admin:monit      # require user 'admin' with password 'monit'
     allow @monit           # allow users of group 'monit' to connect (rw)
     allow @users readonly  # allow users of group 'users' to connect readonly
```
Khởi động monit:
```
sudo /etc/init.d/monit start
```
Và vào http://localhost:2812/, nhập usenam`admin` password `monit` và xem kết quả 
![](https://images.viblo.asia/b6258077-19a7-4c6a-8f77-f95a97652259.png)
## Giám sát Service với monit
Muốn giám sát một service, chúng ta cần thêm config vào file `/etc/monit/monitrc` hoặc tạo một file config trong thư mục `/etc/monit/conf.d/` (mặc định thư mục này được include trong config default của monit)

Bên dưới là một ví dụ về monitor Apache 
```
vi /etc/monit/conf.d/apache
```
```
 check process apache with pidfile /var/run/httpd.pid
       start program = "/etc/init.d/httpd start" #khai báo cú pháp start service
       stop program  = "/etc/init.d/httpd stop"  #khai báo cú pháp stop service 
       if total cpu > 60% for 2 cycles then alert
       if total cpu > 80% for 5 cycles then restart
```
Với config này, Monit sẽ 
* gửi một cảnh báo nếu Apache dùng vượt quá 60% CPU trong hai chu kỳ.
*  khởi động lại Apache nếu mức sử dụng CPU trên 80% trong năm chu kỳ.

(Mỗi chu kì là 2 phút theo config `set daemon 120 ` ở trên 

Cú pháp của Monit khá là dễ đọc và dễ hiểu. Về cú pháp monit, bạn có thể tham khảo thêm tại https://mmonit.com/monit/documentation/monit.html#SERVICE-TESTS
## Một số lệnh thường sử dụng
* Kiểm tra cú pháp config Monit 
    ```
    $ sudo monit -t
    
    Control file syntax OK
    ```
* Restart monit 
    ```
    $ sudo /etc/init.d/monit restart
    
    [ ok ] Restarting monit (via systemctl): monit.service.
    ```
* Kiểm tra monit log
    ```
    $ tail -f /var/log/monit.log 
    
    [+07 May 21 07:48:44] error    : 'b121919' cpu system usage of 30.8% matches resource limit [cpu system usage > 30.0%]
    [+07 May 21 07:48:44] info     : 'b121919' exec: '/bin/bash -c /opt/scripts/chatwork.sh'
    [+07 May 21 07:48:44] info     : 'nginx' process is running with pid 1179
    [+07 May 21 07:50:44] info     : 'b121919' cpu system usage check succeeded [current cpu system usage = 8.1%]
    [+07 May 21 12:20:46] info     : Reinitializing monit daemon
    [+07 May 21 12:20:46] info     : Reinitializing Monit -- control file '/etc/monit/monitrc'
    [+07 May 21 12:20:47] info     : 'b121919' Monit reloaded
    [+07 May 21 12:21:58] info     : Reinitializing monit daemon
    [+07 May 21 12:21:58] info     : Reinitializing Monit -- control file '/etc/monit/monitrc'
    [+07 May 21 12:21:59] info     : 'b121919' Monit reloaded
    ```
* Kiểm tra trạng thái monitor 
    ```
    $ sudo monit status
    
    
    Monit 5.25.1 uptime: 0m

    System 'b121919'
      status                       OK
      monitoring status            Monitored
      monitoring mode              active
      on reboot                    start
      load average                 [1.60] [1.57] [1.31]
      cpu                          0.0%us 0.0%sy 0.0%wa
      memory usage                 4.4 GB [57.8%]
      swap usage                   298 MB [30.5%]
      uptime                       5h 1m
      boot time                    Thu, 21 May 2020 07:48:38
      data collected               Thu, 21 May 2020 12:48:59

    Process 'nginx'
      status                       OK
      monitoring status            Monitored
      monitoring mode              active
      on reboot                    start
      pid                          1179
      parent pid                   1
      uid                          0
      effective uid                0
      gid                          0
      uptime                       5h 0m
      threads                      1
      children                     0
      cpu                          -
      cpu total                    -
      memory                       0.0% [1.0 MB]
      memory total                 0.0% [0 B]
      security attribute           unconfined
      data collected               Thu, 21 May 2020 12:48:59
    ```
    # Tổng kết 
    Monit là một công cụ khá hữu ích và mạnh mẽ trong việc giám sát và tự động sửa lỗi.
    
    Trong bài tiếp theo mình sẽ hướng dẫn config gửi mail cảnh báo bằng Monit cũng như gửi cảnh báo qua các kênh Media khác.
    
    Tham khảo Doc: https://mmonit.com/monit/documentation/monit.html