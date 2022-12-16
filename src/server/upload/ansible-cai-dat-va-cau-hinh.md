# Cài đặt Ansible là công cụ quản lý cấu hình.

Ansible đang là công cụ Configuration Management mà nó đang được dùng khá nổi bật hiện nay. Đặc biệt là trong công việc của một DevOps Engineer thì càng nên học và phải biết để con đường nghề nghiệp được phát triển hơn cho sau này.
## Đặc điểm của Ansible
Không cần cài đặt phần mềm lên các agent, chỉ cần cài đặt tại master.
Không service, daemon, chỉ thực thi khi được gọi
Bảo mật cao ( do sử dụng giao thức SSH để kết nối )
Cú pháp dễ đọc, dễ học, dễ hiểu
### Yêu cầu cài đặt
Hệ điều hành: Linux (Redhat, Debian, Ubuntu, Centos, ...), Windows<br>
Thư viện Jinja2: dùng để xây dựng template cấu hình<br>
Thư viện PyYAML: hỗ trợ cấu trúc YAML<br>
Python 2.4 trở lên
### Cài đặt Ansible
Trên CentOS:<br>
Cài đặt EPEL repo<br>
Cài đặt thông qua yum<br>
***OpenSSH : Password Authentication***
<br>[1] Bắt đầu dịch vụ SSH trên tất cả các máy khách mà bạn muốn quản lý bằng Ansible. <br>
Cấu hình Máy chủ SSH để vận hành máy chủ từ máy tính từ xa.<br>
[1.1] OpenSSH đã được cài đặt theo mặc định ngay cả khi bạn đã cài đặt CentOS Stream với [Minimal] Install, vì vậy nó không cần phải cài đặt các gói mới. Bạn có thể đăng nhập bằng Xác thực mật khẩu theo mặc định. Tuy nhiên, theo mặc định, tài khoản người dùng root được phép đăng nhập, vì vậy tốt hơn là bạn nên thay đổi cài đặt.<br>
```
[root@node ~]# vi /etc/ssh/sshd_config
# line 43: change ( prohibit root login )
# for other options, there are [prohibit-password], [forced-commands-only]
PermitRootLogin no
[root@node ~]# systemctl restart sshd
```
[1.2] Nếu Firewalld đang chạy, hãy cho phép dịch vụ SSH. SSH sử dụng [22 / TCP].<br>
```
[root@node ~]# firewall-cmd --add-service=ssh --permanent
success
[root@node ~]# firewall-cmd --reload
success
```
***SSH Client : CentOS Stream***<br>
Định cấu hình Máy khách SSH cho CentOS.<br>
[1.3] Cài đặt SSH Client.<br>
```
[root@node1 ~]# dnf -y install openssh-clients
```
[1.4] Kết nối với máy chủ SSH với bất kỳ người dùng thông thường nào.<br>
```
# ssh [username@(hostname or IP address)]
[cent@node1 ~]$ ssh cent@node.srv.
The authenticity of host 'dlp.srv (10.0.0.30)' can't be established.
ECDSA key fingerprint is SHA256:bm8HoSi5APr9Ux0WHiuVDBh9OdvdUGnPagD7fK4xyis.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'dlp.srv.world,10.0.0.30' (ECDSA) to the list of known hosts.
cent@node.srv password:
Activate the web console with: systemctl enable --now cockpit.socket
[cent@node ~]$   # logined
```
[1.5] Có thể thực hiện các lệnh trên Máy chủ từ xa với SSH như sau.<br>
```
# for example, run [cat /etc/passwd]
[cent@node1 ~]$ ssh cent@dlp.srv "cat /etc/passwd"
cent@node.srv password:
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
.....
.....
rngd:x:989:985:Random Number Generator Daemon:/var/lib/rngd:/sbin/nologin
tcpdump:x:72:72::/:/sbin/nologin
cent:x:1000:1000::/home/cent:/bin/bash
```
***SSH Client : Windows #1***<br>
Định cấu hình Máy khách SSH cho Windows.<br>
[1.6]Tải xuống phần mềm SSH Client dành cho Windows.<br>
Trong ví dụ này, nó sử dụng Putty (www.chiark.greenend.org.uk/~sgtatham/putty/).<br>
Cài đặt và khởi động Putty, sau đó Nhập Tên máy chủ hoặc địa chỉ IP của máy chủ của bạn vào trường [Tên máy chủ] và Nhấp vào nút [Mở] để kết nối.<br>
![](https://images.viblo.asia/f14ef3e0-7965-4956-9483-04b1799627d4.png)
[1.7] Sau khi xác thực thành công, bạn có thể đăng nhập và vận hành máy chủ CentOS từ máy tính từ xa.<br>
![](https://images.viblo.asia/dee485fd-8259-4e96-8ed9-8d180d88ebdb.png)
***SSH Client : Windows #2***<br>
[1.8] Nếu bạn đang sử dụng Windows 10 phiên bản 1803 trở lên, OpenSSH Client đã được triển khai dưới dạng một tính năng của Windows, vì vậy bạn có thể sử dụng lệnh [ssh] trên PowerShell hoặc Command Prompt mà không cần Putty hoặc phần mềm SSH của bên thứ ba khác.<br>
![](https://images.viblo.asia/504c6e5e-db22-447a-84e1-c7845413501a.png)