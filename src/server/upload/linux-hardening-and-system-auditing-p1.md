![](https://images.viblo.asia/0c23ba65-a5ce-4ffb-b8be-c1d379f96ff3.jpg)

Ngày nay, các hệ thống Linux được sử dụng trong suốt quá trình tính toán, từ các hệ thống nhúng đến hầu như tất cả các siêu máy tính, đồng thời đảm bảo một vị trí quan trọng trong các hệ thống máy chủ trên toàn thế giới. Linux đem lại cho người dùng khả năng tùy biến cao, sự ổn định và độ tin cậy rất lớn. Tuy vậy nếu được sử dụng không đúng cách, Linux cũng tiềm ẩn những nguy cơ mất an toàn về bảo mật. Việc cấu hình cho một hệ thống Linux về  mức độ nào đó có vẻ khó khăn hơn so với các máy chủ Windows. Có lẽ vì vậy mà trong quá trình tham gia đánh giá hệ thống Server cho các đơn vị mình ít thấy các Server được cấu hình đúng cách. 

Các gạch đầu dòng dưới đây là do mình cóp nhặt lại từ những kiến thức ở trên mạng, cộng với chút ít kinh nghiệm của bản thân. Hi vọng nó sẽ giúp mọi người bảo mật cho máy chủ Linux của mình một cách tốt hơn.


### Kiểm tra các bảng cập nhật, vá lỗi và các phần mềm bảo mật.

Điều này hầu như không nằm trong bất kỳ hướng dẫn bảo mật chính quy nào. Nhưng theo mình cách bảo mật tốt nhất cho hệ thống Linux của bạn là chăm chỉ update nó thường xuyên. Các bản update sẽ bổ sung các chức năng mới, cập nhập các bản vá tự động , nâng cao hiệu suất sử dụng và luôn mang lại cảm giác dễ chịu lớn. 

![](https://images.viblo.asia/8c9e2024-5d60-452c-944c-78f0b5369ce6.jpg)

Việc update trên Linux thực sự là một món quà tuyệt vời.

```bash
sudo apt-get update
```

### Filesystem Configuration

**1. Create Separate Partition for /tmp**

/tmp thư mục lưu trữ tạm thời của người sử dụng. Do đặc thù cho phép bất kỳ người dùng nào có thể tạo file. Vì vậy đây là thư mục Hacker luôn nhắm tới
trong quá trình tấn công hệ thống - leo thang đặc quyền

**Hardening:**

- Đối với hệ thống cài đặt mới, thiết lập một phân vùng dành riêng cho /tmp
- Đối với hệ thống đang chạy, sử dụng Logical Volume Manager (LVM) để tạo phân vùng /tmp


**2. Set nodev option for /tmp Partition**

Tùy chọn **nodev** quy định rằng hệ thống tệp tin không thể chứa các thiết bị cụ thể.

```bash
grep /tmp /etc/fstab | grep nodev
mount | grep /tmp | grep nodev
```

Nếu các lệnh trên không cho ra kết quả thì hệ thống chưa cấu hình nội dung này.

Sửa file `/etc/fstab` và thêm **nodev** vào dòng thứ 4 (**mounting options**)

Sau đó thực hiện lệnh : 
```bash
mount -o remount,nodev /tmp
```

### Secure Boot Settings

**1. Set User/Group Owner on bootloader config**

Thiết lập chủ sở hữu bootloader cho Root. Mặc định GRUB được lưu tại` /boot/grub/grub.cfg`

Kiểm tra chủ sở hữu tệp tin grub.cfg 
```bash
stat -c "%u %g" /boot/grub/grub.cfg | egrep "^0 0"
```
**Hardening:** 

```bash
chown root:root /boot/grub/grub.cfg
```
        
**2. Set Permissions on bootloader config**

Thiết lập chỉ cho phép root cấu hình bootloader.
Kiểm tra quyền của tệp tin grub.cfg 

```bash
stat -L -c "%a" /boot/grub/grub.cfg | egrep ".00"
```
**Hardening:**

```bash
chmod og-rwx /boot/grub/grub.cfg
```

**3. Set Boot Loader Password**

Thiết lập này bắt buộc mọi người dùng muốn khởi động lại hệ thống phải nhập mật khẩu trước khi thực hiện lệnh khởi động lại.

```bash
grep "^set superusers" /boot/grub/grub.cfg
set superusers="<user-list>"
```

```bash
grep "^password" /boot/grub/grub.cfg
password_pbkdf2 <user> <encrypted password>
```

**Hardening:**

Tạo mật khẩu với mã hóa md5

```bash
grub-mkpasswd-pbkdf2
Enter password: <password>
Reenter password: <password>
Your PBKDF2 is <encrypted-password>
```
Thêm dòng sau vào `/etc/grub.d/00_header`
```bash
cat <<EOF
set superusers="<user-list>"
password_pbkdf2 <user> <encrypted-password>
EOF
```
Thực hiện cập nhật grub
```bash
update-grub
```
	
**4. Require Authentication for Single-User Mode**		

Thiết lập mật khẩu cho tài khoản root, sẽ bắt buộc phải xác thực trong chế độ  single user mode.

Thực hiện lệnh:

```bash
grep ^root:[*\!]: /etc/shadow
```
Nếu không có kết quả trả về thì tài khoản root đã được đặt mật khẩu.

**Hardening:**
```bash
passwd root
```

### Network Configuration and Firewalls

**1. Disable IP Forwarding**

Flag **net.ipv4.ip_forward** được sử dụng để báo cho máy chủ có thể chuyển tiếp gói tin hay không. Nếu máy chủ không dùng để định tuyến thì nên thiết lập giá trị cờ này là 0.

Kiểm tra giá trị của flag **net.ipv4.ip_forward**
```bash
/sbin/sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 0
```

**Hardening:**

Thiết lập thông số cờ net.ipv4.ip_forward trong `/etc/sysctl.conf`

```bash
net.ipv4.ip_forward=0
```
Sửa đổi thông số cho phù hợp với Kernel:

```bash
 /sbin/sysctl -w net.ipv4.ip_forward=0
 /sbin/sysctl -w net.ipv4.route.flush=1
```

**2. Disable Send Packet Redirects**

ICMP Redirects được sử dụng để gửi thông tin định tuyến tới một host khác. Khi máy chủ không sử dụng như một bộ định tuyến thì không có nhu cầu chuyển hướng.

Kẻ tấn công có thể sử dụng một máy chủ chiếm được, gửi gói ICMP không hợp lệ để tìm ra mô hình hệ thống mạng của nạn nhân.

Kiểm tra gói tin chuyển hướng có bị vô hiệu hóa:

```bash
/sbin/sysctl net.ipv4.conf.all.send_redirects
net.ipv4.conf.all.send_redirects = 0
```

```bash
/sbin/sysctl net.ipv4.conf.default.send_redirects
net.ipv4.conf.default.send_redirects = 0
```

Nếu các kết quả bằng 0 thì các flag đã được vô hiệu. Nếu các flag khác 0, sửa đổi thông số trong tệp tin sau` /etc/sysctl.conf`

```bash
net.ipv4.conf.all.send_redirects=0

net.ipv4.conf.default.send_redirects=0
```

Sửa đổi thông số cho phù hợp với Kernel:

```bash
 /sbin/sysctl -w net.ipv4.conf.all.send_redirects=0
 /sbin/sysctl -w net.ipv4.conf.default.send_redirects=0
 /sbin/sysctl -w net.ipv4.route.flush=1
```
### Modify Network Parameters (Host and Router)

**1. Disable Source Routed Packet Acceptance**

Trong mạng, dữ liệu định tuyến cho phép người gửi xác định đường đi của gói tin trong mạng.

Falg **net.ipv4.conf.all.accept_source_route** và  **net.ipv4.conf.default.accept_source_route** phải có giá trị là 0 để vô hiệu hóa hệ thống trong việc chấp nhận nguồn định tuyến gói tin.

Kiêm tra giá trị các flag:
```bash
/sbin/sysctl net.ipv4.conf.all.accept_source_route
net.ipv4.conf.all.accept_source_route = 0
```

```bash
/sbin/sysctl net.ipv4.conf.default.accept_source_route
net.ipv4.conf.default.accept_source_route = 0
```

Nếu các kết quả bằng 0 thì các flag đã được vô hiệu. Nếu các flag khác 0, sửa đổi thông số trong tệp tin sau` /etc/sysctl.conf`

```bash
net.ipv4.conf.all.accept_source_route=0

net.ipv4.conf.default.accept_source_route=0
```

Sửa đổi thông số cho phù hợp với Kernel:

```bash
 /sbin/sysctl -w net.ipv4.conf.all.accept_source_route=0
 /sbin/sysctl -w net.ipv4.conf.default.accept_source_route=0
 /sbin/sysctl -w net.ipv4.route.flush=1
 ```

**2. Disable ICMP Redirect Acceptance**

Thông điệp ICMP Redirect truyền tải các gói tin định tuyến, giao tiếp với máy chủ (đóng vai trò như bộ định tuyến) để gửi gói dữ liệu thông qua một đường dẫn khác, nó cho phép thiết bị định tuyến bên ngoài cập nhật bảng định tuyến của bạn. 

Kẻ tấn công có thể sử dụng ICMP giả mạo để chuyển các email độc hại, làm thay đổi bảng định tuyến…

Thiết lập cờ **net.ipv4.conf.all.accept_redirects** là 0

Kiểm tra giá trị flag:
```
/sbin/sysctl net.ipv4.conf.all.accept_redirects
net.ipv4.conf.all.accept_redirects = 0
```

```bash
/sbin/sysctl net.ipv4.conf.default.accept_redirects
net.ipv4.conf.default.accept_redirects = 0
```
Nếu các kết quả bằng 0, thì flag đã được vô hiệu. Nếu các flag khác 0, sửa đổi thông số trong tệp tin sau `/etc/sysctl.conf`

```bash
net.ipv4.conf.all.accept_redirects=0
net.ipv4.conf.default.accept_redirects=0
```
Sửa đổi thông số cho phù hợp với Kernel:

```bash
/sbin/sysctl -w net.ipv4.conf.all.accept_redirects=0
/sbin/sysctl -w net.ipv4.conf.default.accept_redirects=0
/sbin/sysctl -w net.ipv4.route.flush=1
```
**3. Disable Secure ICMP Redirect Acceptance**

Secure ICMP Redirect tương tự với ICMP Redirect, khác là nó đến từ danh sách các gateway trong danh sách default gateway.

Thiết lập flag **net.ipv4.conf.all.secure_redirects** là 0. 

Kiểm tra giá trị flag:
```bash
/sbin/sysctl net.ipv4.conf.all.secure_redirects
net.ipv4.conf.all.secure_redirects = 0
```

```bash
/sbin/sysctl net.ipv4.conf.default.secure_redirects
net.ipv4.conf.default.secure_redirects = 0
```
nếu các kết quả bằng 0 thì flag đã được vô hiệu hóa. Nếu các flag khác 0, sửa đổi thông số trong tệp tin sau /etc/sysctl.conf
```bash
net.ipv4.conf.all.secure_redirects=0
net.ipv4.conf.default.secure_redirects=0
```

Sửa đổi thông số cho phù hợp với Kernel:

```bash
/sbin/sysctl -w net.ipv4.conf.all.secure_redirects=0
/sbin/sysctl -w net.ipv4.conf.default.secure_redirects=0
/sbin/sysctl -w net.ipv4.route.flush=1
```
**4. Enable Ignore Broadcast Requests**

Việc chấp nhận ICMP echo và yêu cầu timestamp với đích đến là broadcast hoặc multicast cho mạng của bạn có thể sử dụng để đánh lừa máy chủ tham gia một cuộc tấn công Smurt. 

Với cuộc tấn công Smurt, kẻ tấn công sẽ gửi một lượng lớn gói tin ICMP tới địa chỉ nguồn giả mạo, các host nhận được, sẽ gửi lại echo-reply cho địa chỉ giả mạo, làm lưu lượng mạng tăng lên dẫn tới nghẽn hệ thống.

Kiểm tra giá trị flags:
```bash
/sbin/sysctl net.ipv4.icmp_echo_ignore_broadcasts
net.ipv4.icmp_echo_ignore_broadcasts = 1
```

Nếu kết quả trả về bằng 1 thì flag đã được bật. Nếu flag khác 1, sửa đổi thông số trong tệp tin sau `/etc/syscrl.conf`

```
net.ipv4.icmp_echo_ignore_broadcasts=1
```

Sửa đổi thông số phù hợp với Kernel:
```bash
/sbin/sysctl -w net.ipv4.icmp_echo_ignore_broadcasts=1
/sbin/sysctl -w net.ipv4.route.flush=1
```
**5. Enable TCP SYN Cookies**

Khi **flag tcp_syncookies** được thiết lập, kernel sẽ xử lý gói tin TCP SYN bình thường, cho đến khi kết nối half-open bị đầy, chức năng SYN cookie bị dừng lại. SYN cookies làm việc bằng cách không sử dụng hàng đợi SYN, thay vào đó, kernel sẽ trả lời SYN với một SYN|ACK nhưng sẽ bao gồm một chuỗi TCP đặc biệt mã hóa địa chỉ nguồn, đích, cổng và thời gian gói tin được gửi. 

Một kết nối hợp pháp, gửi gói tin ACK bắt tay 3 bước với số thứ tự đặc biệt, điều này cho phép các máy chủ xác minh nó đã nhận được 1 phản hồi hợp lệ và cho phép kết nối mặc dùng không có SYN tương ứng trong hàng đợi.

Kẻ tấn công có thể sử dụng SYN flood để thực hiện DdoS bằng cách gửi nhiều gói SYN mà không thực hiện bắt tay 3 bước. SYN cookie cho phép giữ kết nối hợp lệ kể cả khi bị tấn công DdoS.

Kiểm tra TCP SYN Cookie đã được bật chưa

```bash
/sbin/sysctl net.ipv4.tcp_syncookies
net.ipv4.tcp_syncookies = 1
```
Kết quả trả về là 1, flag đã được bật. Nếu flag khác 1, sửa thông số trong tệp tin sau `/etc/sysctl.conf`

```bash
net.ipv4.tcp_syncookies=1
```

Sửa đổi thông số phù hợp với Kernel:
```bash
/sbin/sysctl -w net.ipv4.tcp_syncookies=1
/sbin/sysctl -w net.ipv4.route.flush=1
```

**6. Disable ipv6**

Ipv6 có nhiều ưu điểm so với ipv4. Nếu ipv6 chưa được sử dụng tại tổ chức, tắt chúng đi để giảm thiểu việc bị tấn công vào bề mặt hệ thống.

Kiểm tra ipv6 có được bật

```bash
ip addr | grep inet6
```

Nếu không có kết quả trả về, ipv6 đã tắt.
Để tắt ipv6, sửa tệp tin `/etc/sysclt.conf`

```bash
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.lo.disable_ipv6=1
```
Chạy lệnh sau để áp dụng thay đổi:
```
sysctl -p
```

### System Access, Authentication and Authorization

**1. Enable cron Daemon**

Cron được sử dụng để thực hiện hàng loạt các công việc tự động trên hệ thống.

Để khởi chạy Cron ta sử dụng lệnh sau: 

```bash
/sbin/initctl show-config cron
cron
start on runlevel [2345]
stop on runlevel [!2345]
```

**2. Set User/Group Owner and Permission on /etc/crontab**

Tệp tin `/etc/crontab` được sử dụng bởi cron để điều khiển các công việc. các lệnh trong mục này đảm bảo root là người sử dụng và chủ sở hữu nhóm, và chỉ chủ sở hữu mới được truy cập vào tệp tin này.

Thực hiện lệnh sau để đảm bảo đúng quyền cho tệp tin /etc/crontab
```bash
stat -c "%a %u %g" /etc/crontab | egrep ".00 0 0"
```
Nếu lệnh trên không trả về kết quả, hệ thống đang được cấu hình sai.

**Hardening:**

```bash
chown root:root /etc/crontab
chmod og-rwx /etc/crontab
```

**3. Set User/Group Owner and Permission on /etc/cron.hourly**

Thực hiện lệnh sau để đảm bảo đúng quyền cho tệp tin /etc/cron.hourly

```bash
stat -c "%a %u %g" /etc/cron.hourly | egrep ".00 0 0"
```
Nếu lệnh trên không trả về kết quả, hệ thống đang được cấu hình sai.

**Hardening:**

```bash
chown root:root /etc/cron.hourly
chmod og-rwx /etc/cron.hourly
```
**4. Set User/Group Owner and Permission on /etc/cron.daily**

Thực hiện lệnh sau để đảm bảo đúng quyền cho tệp tin /etc/cron.daily

```bash
stat -c "%a %u %g" /etc/cron.daily | egrep ".00 0 0"
```

Nếu lệnh trên không trả về kết quả, hệ thống đang được cấu hình sai.

**Hardening:**

```bash
chown root:root /etc/cron.daily
chmod og-rwx /etc/cron.daily
```

**5. Set User/Group Owner and Permission on /etc/cron.weekly**

Thực hiện lệnh sau để đảm bảo đúng quyền cho tệp tin /etc/cron.weekly

```bash
stat -c "%a %u %g" /etc/cron.weekly | egrep ".00 0 0"
```
Nếu lệnh trên không trả về kết quả, hệ thống đang được cấu hình sai.

**Hardening:**

```bash
chown root:root /etc/cron.weekly
chmod og-rwx /etc/cron.weekly
```
**6. Set User/Group Owner and Permission on /etc/cron.monthly**


Thực hiện lệnh sau để đảm bảo đúng quyền cho tệp tin /etc/cron.monthly

```bash 
stat -c "%a %u %g" /etc/cron.monthly | egrep ".00 0 0"
```
Nếu lệnh trên không trả về kết quả, hệ thống đang được cấu hình sai.
Hardening:
```
chown root:root /etc/cron.monthly
chmod og-rwx /etc/cron.monthly
```

### Configure SSH

**1. Set SSH Protocol to 2**

SSH hỗ trợ 2 giao thức khác nhau và không tương thích với nhau: SSH1, SSH2. SSH1 không còn an toàn. Khuyến nghị sử dụng SSH2.

Xác minh cài đặt SSH chính xác, thực hiện lệnh sau, đầu ra phải là `Protocol 2`
```bas

grep "^Protocol" /etc/ssh/sshd_config
```
**Hardening:**

Sửa tệp tin `/etc/ssh/sshd_config`, bỏ  # cho tham số Protocol 2

**2. Set Permissions on /etc/ssh/sshd_config**

Tệp tin `/etc/ssh/sshd_config `chứa cấu hình cho sshd. Tệp này cần được bảo vệ khỏi người dùng không có đặc quyền, nhưng cần cho phép đọc vì nó được sử dụng với nhiều chương trình không có đặc quyền.

Thực hiện lệnh sau để xác định người sử dụng và chủ sở hữu tệp tin sshd_config

```bash
/bin/ls -l /etc/ssh/sshd_config
-rw------- 1 root root 762 Sep 23 002 /etc/ssh/sshd_config
```
Hardening:
Nếu người sử dụng và chủ sở hữu không phải root, thực hiện lệnh sau:

```bash
chown root:root /etc/ssh/sshd_config
```
Thiết lập lại quyền:

```bash
chmod 600 /etc/ssh/sshd_config
```

**3. Set SSH MaxAuthTries to 4 or Less**

Tham số **MaxAuthTries** xác định số lần được phép xác thực không thành công cho một kết nối. Đặt tham số **MaxAuthTries** thấp để giảm thiểu tấn công brute-force vào máy chủ SSH. Khuyến nghị cho tham số MaxAuthTries là 4.

Kiểm tra tham số:
```bash
grep "^MaxAuthTries" /etc/ssh/sshd_config
```
MaxAuthTries 4
Sửa tệp tin `/etc/ssh/sshd_config `và thiết lập tham số: MaxAuthTries 4

**4. Set SSH IgnoreRhosts to Yes**

Tham số **IgnoreRhosts** xác định tệp tin .rhosts và .shosts sẽ không được sử dụng trong **RhostRSAAuthentication** hoặc **HostbasedAuthenticiation**. Đặt tham số này để bắt buộc người dùng phải nhập mật khẩu khi xác thực với SSH.

Kiểm tra tham số:
```bash 
grep "^IgnoreRhosts" /etc/ssh/sshd_config
IgnoreRhosts yes
```
Sửa tệp tin /etc/ssh/sshd_config và thiết lập tham số: 

```
IgnoreRhosts yes
```
**5.Disable SSH Root Login**

Tham số **PermitRootLogin** cho phép người dùng đăng nhập SSH với tài khoản root. Mặc định là không cho phép, điều này bắt buộc quản trị viên phải xác thực bằng tài khoản của họ rồi mới được sang quyền root giúp tránh việc thoái thác trách nhiệm khi xảy ra sự cố.

Kiểm tra tham số:
```bash
grep "^PermitRootLogin" /etc/ssh/sshd_config
PermitRootLogin no
```
Sửa tệp tin /etc/ssh/sshd_config và thiết lập tham số:

```bash
PermitRootLogin no
```
**6. Set SSH PermitEmptyPasswords to N**o

Tham số **PermitEmptyPasswords** chỉ định máy chủ cho phép đăng nhập tải khoản với mật khẩu trống.
Tắt chức năng này sẽ làm giảm xác suất truy cập trái phép vào hệ thống.

Kiểm tra tham số:
```bash
grep "^PermitEmptyPasswords" /etc/ssh/sshd_config
PermitEmptyPasswords no
```

Sửa tệp tin `/etc/ssh/sshd_config `và thiết lập tham số: 
```
PermitEmptyPasswords no
```

**7. Set Idle Timeout Interval for User Login**

Hai tùy chọn **ClientAliveInterval** và **ClientAliveCountMax** kiểm soát thời gian chờ của ssh phiên. Các hoạt động sẽ chấm dứt trong một khoảng thời gian nhất định. Khi biến ClientAliveCountMax được thiết lập, sshd sẽ gửi thông điệp tại mỗi khoảng thời gian ClientAliveInterval. Khi số lượng thông điệp được gửi với không có phản ứng từ máy khác, các phiên ssh sẽ chấm dứt.

Kiểm tra tham số:
```bash
grep "^ClientAliveInterval" /etc/ssh/sshd_config
ClientAliveInterval 300
```
```bash
grep "^ClientAliveCountMax" /etc/ssh/sshd_config
ClientAliveCountMax 0
```

Sửa tệp tin /etc/ssh/sshd_config và thiết lập tham số:
```bash
ClientAliveInterval 300
ClientAliveCountMax 0
```
**8. Limit Access via SSH**

Có một số tùy chọn có sẵn để giới hạn mà người dùng và nhóm có thể truy cập hệ thống thông qua SSH. Khuyến nghị rằng ít nhất một trong các tùy chọn sau đây được thừa hưởng:

**AllowUsers**

Biến AllowUsers cung cấp cho các quản trị viên hệ thống tùy chọn cho phép người dùng cụ thể ssh vào hệ thống. Danh sách bao gồm tên người dùng dấu phẩy ngăn cách. Số userIDs không sử dụng được.

**AllowGroups**

Biến AllowGroups cung cấp cho các quản trị viên hệ thống tùy chọn cho phép nhóm cụ thể được phép ssh vào hệ thống. Danh sách bao gồm tên người dùng dấu phẩy ngăn cách. Số groupIDs không sử dụng được.

**DenyUsers**

Biến DenyUsers cung cấp cho các quản trị viên hệ thống tùy chọn từ chối người sử dụng cụ thể ssh vào hệ thống. Danh sách bao gồm tên người dùng dấu phẩy ngăn cách. Số userIDs không sử dụng được.

**DenyGroups**

Biến DenyGroups cung cấp cho các quản trị viên hệ thống tùy chọn từ chối nhóm cụ thể của người sử dụng ssh vào hệ thống. Danh sách bao gồm dấu phẩy ngăn cách tên nhóm. Số groupIDs không sử dụng được.

Các hạn chế này chỉ cho phép người dùng được ủy quyền mới được truy cập vào hệ thống.

Kiểm tra tham số:
```bash
grep "^AllowUsers" /etc/ssh/sshd_config
AllowUsers <userlist>
``` grep "^AllowGroups" /etc/ssh/sshd_config
AllowGroups <grouplist>
``` grep "^DenyUsers" /etc/ssh/sshd_config
DenyUsers <userlist>
``` grep "^DenyGroups" /etc/ssh/sshd_config
DenyGroups <grouplist>
Sửa tệp tin /etc/ssh/sshd_config và thiết lập tham số:
AllowUsers <userlist>
AllowGroups <grouplist>
DenyUsers <userlist>
DenyGroups <grouplist>
```