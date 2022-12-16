# Giới thiệu
Xin chào, trong bài viết này mình sẽ nêu ra một số câu lệnh thường được sử dụng để monitor và debug khi làm việc với linux, hy vọng sẽ hữu ích cho bạn

# Top – Linux Process Monitoring
`Top` dùng để monitor perform của Linux. Lệnh này cũng được sử dụng để hiển thị tất cả các quy trình thời gian thực đang chạy và hoạt động trong danh sách có thứ tự và cập nhật nó thường xuyên. Nó hiển thị `CPU usage`, `Memory usage`, `Swap Memory`, `Cache Size`, `Buffer Size`, `Process PID`, `User`, `Commands` và nhiều hơn nữa... Lệnh top rất hữu ích để theo dõi hệ thống.
```
# top
```

![](https://images.viblo.asia/05be7e4e-f5af-4ebb-a830-26d545ab831c.png)

Bạn có thể tìm hiểu thêm về lệnh này tại [đây](https://www.tecmint.com/12-top-command-examples-in-linux/).

# VmStat – Virtual Memory Statistics
Lệnh VmStat của Linux được sử dụng để hiển thị số liệu thống kê về  `virtual memory`, `kernerl threads`, `disks`, `system processes`, `I/O blocks`, `interrupts`, `CPU activity` và hơn thế nữa. Theo mặc định, lệnh vmstat không khả dụng trong hệ thống Linux, bạn cần cài đặt một gói có tên `sysstat` có bao gồm `vmstat`.

```
# vmstat

procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu-----
 r  b   swpd   free  inact active   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 810420  97380  70628    0    0   115     4   89   79  1  6 90  3  0
 ```
 
 Bạn có thể tìm hiểu thêm về lệnh này tại [đây](https://www.tecmint.com/linux-performance-monitoring-with-vmstat-and-iostat-commands/).
 
 # Lsof – List Open Files
 Lệnh `Lsof` được sử dụng để hiển thị danh sách tất cả các tệp đang mở và các processes. Các tệp mở bao gồm `disk files`, `network sockets`, `pipes`, `devices` và `processes`. Với lệnh này, bạn có thể dễ dàng xác định tệp nào đang được sử dụng. Định dạng phổ biến nhất cho lệnh này là.
 
 ```
 # lsof

COMMAND     PID      USER   FD      TYPE     DEVICE     SIZE       NODE NAME
init          1      root  cwd       DIR      104,2     4096          2 /
init          1      root  rtd       DIR      104,2     4096          2 /
init          1      root  txt       REG      104,2    38652   17710339 /sbin/init
init          1      root  mem       REG      104,2   129900     196453 /lib/ld-2.5.so
init          1      root  mem       REG      104,2  1693812     196454 /lib/libc-2.5.so
init          1      root  mem       REG      104,2    20668     196479 /lib/libdl-2.5.so
init          1      root  mem       REG      104,2   245376     196419 /lib/libsepol.so.1
init          1      root  mem       REG      104,2    93508     196431 /lib/libselinux.so.1
init          1      root   10u     FIFO       0,17                 953 /dev/initctl
```

Bạn có thể tìm hiểu thêm về lệnh này tại [đây](https://www.tecmint.com/10-lsof-command-examples-in-linux/).
 
# Tcpdump – Network Packet Analyzer
`Tcpdump` là một trong những câu lệnh cho `network packet analyzer` hoặc `packets sniffer` được sử dụng để capture hoặc filter các gói `TCP / IP` đã nhận hoặc chuyển trên một interface cụ thể qua network. Nó cũng cung cấp một tùy chọn để lưu các gói captured vào một tệp để phân tích sau này.
 
 ```
 # tcpdump -i eth0

tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 96 bytes
22:08:59.617628 IP tecmint.com.ssh > 115.113.134.3.static-mumbai.vsnl.net.in.28472: P 2532133365:2532133481(116) ack 3561562349 win 9648
22:09:07.653466 IP tecmint.com.ssh > 115.113.134.3.static-mumbai.vsnl.net.in.28472: P 116:232(116) ack 1 win 9648
22:08:59.617916 IP 115.113.134.3.static-mumbai.vsnl.net.in.28472 > tecmint.com.ssh: . ack 116 win 64347
```

Bạn có thể tìm hiểu thêm về lệnh này tại [đây](https://www.tecmint.com/12-tcpdump-commands-a-network-sniffer-tool/).
 
 # Netstat – Network Statistics
`Netstat` dùng để theo dõi số liệu thống kê gói tin nhận và truyền đi của network và thống kê chúng. Nó là công cụ rất hữu ích cho mọi quản trị viên hệ thống để theo dõi hiệu suất mạng và khắc phục sự cố liên quan đến mạng.

```
# netstat -a | more

Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address               Foreign Address             State
tcp        0      0 *:mysql                     *:*                         LISTEN
tcp        0      0 *:sunrpc                    *:*                         LISTEN
tcp        0      0 *:realm-rusd                *:*                         LISTEN
tcp        0      0 *:ftp                       *:*                         LISTEN
tcp        0      0 localhost.localdomain:ipp   *:*                         LISTEN
tcp        0      0 localhost.localdomain:smtp  *:*                         LISTEN
tcp        0      0 localhost.localdomain:smtp  localhost.localdomain:42709 TIME_WAIT
tcp        0      0 localhost.localdomain:smtp  localhost.localdomain:42710 TIME_WAIT
tcp        0      0 *:http                      *:*                         LISTEN
tcp        0      0 *:ssh                       *:*                         LISTEN
tcp        0      0 *:https                     *:*                         LISTEN
```

Bạn có thể tìm hiểu thêm về lệnh này tại [đây](https://www.tecmint.com/20-netstat-commands-for-linux-network-management/).
 
 # Htop – Linux Process Monitoring
`Htop` dùng để giám sát Linux thời gian thực và tương tác tiên tiến hơn nhiều. Điều này gần giống với lệnh `top` nhưng nó có một số tính năng phong phú như giao diện thân thiện với người dùng để quản lý quy trình, các phím tắt, chế độ xem dọc và ngang của các quy trình và hơn thế nữa. `Htop` là một công cụ của bên thứ ba và không có trong hệ thống Linux, bạn cần cài đặt nó bằng công cụ trình quản lý gói `YUM`.

```
# htop
```

![](https://images.viblo.asia/b48f26d0-1bc6-4651-ba43-76579e558913.png)

Bạn có thể tìm hiểu thêm về lệnh này tại [đây](https://www.tecmint.com/install-htop-linux-process-monitoring-for-rhel-centos-fedora/).

# Iotop – Monitor Linux Disk I/O
`Iotop` cũng tương tự như lệnh `top` và `Htop`, nhưng nó có tính năng accounting để theo dõi và hiển thị thời gian thực `Disk I / O` và các `processes`. Công cụ này rất hữu ích cho việc tìm kiếm processes và đọc / ghi các processes trên disk.

```
# iotop
```

![](https://images.viblo.asia/1c700de0-0505-42f0-8e4f-74ff293130b2.png)

Bạn có thể tìm hiểu thêm về lệnh này tại [đây](https://www.tecmint.com/iotop-monitor-linux-disk-io-activity-per-process/).

# Iostat – Input/Output Statistics
`IoStat` là tool thu thập và hiển thị số liệu thống kê thiết bị lưu trữ đầu vào và đầu ra của hệ thống. Tool này thường được sử dụng để theo dõi các vấn đề về hiệu suất của thiết bị lưu trữ bao gồm  devices, local disks, remote disks như NFS.

```
# iostat

Linux 2.6.18-238.9.1.el5 (tecmint.com)         09/13/2012

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           2.60    3.65    1.04    4.29    0.00   88.42

Device:            tps   Blk_read/s   Blk_wrtn/s   Blk_read   Blk_wrtn
cciss/c0d0       17.79       545.80       256.52  855159769  401914750
cciss/c0d0p1      0.00         0.00         0.00       5459       3518
cciss/c0d0p2     16.45       533.97       245.18  836631746  384153384
cciss/c0d0p3      0.63         5.58         3.97    8737650    6215544
cciss/c0d0p4      0.00         0.00         0.00          8          0
cciss/c0d0p5      0.63         3.79         5.03    5936778    7882528
cciss/c0d0p6      0.08         2.46         2.34    3847771    3659776
```

Bạn có thể tìm hiểu thêm về lệnh này tại [đây](https://www.tecmint.com/linux-performance-monitoring-with-vmstat-and-iostat-commands/).

# Monit – Linux Process and Services Monitoring
`Monit` là một mã nguồn mở miễn phí và tiện ích giám sát và quản lý system processes, programs, files, directories, permissions, checksums và filesystems.

Nó giám sát các dịch vụ như Apache, MySQL, Mail, FTP, ProFTP, Nginx, SSH, v.v. Trạng thái hệ thống có thể được xem từ dòng lệnh hoặc sử dụng giao diện web của chính nó.

![](https://images.viblo.asia/3a7dc7a6-64ef-4dc7-87c7-9b8a35b95c0f.jpg)

Bạn có thể tìm hiểu thêm tại [đây](https://www.tecmint.com/how-to-install-and-setup-monit-linux-process-and-services-monitoring-program/).

# Tổng kết
Trên đây là một số câu lệnh và tool khi làm việc với linux, nếu thấy hữu ích thì đừng tiếc 1 upvote và share nhé :))

Happy coding !!! <3 <3 <3

Nguồn tham khảo: [www.tecmint.com](https://www.tecmint.com/)