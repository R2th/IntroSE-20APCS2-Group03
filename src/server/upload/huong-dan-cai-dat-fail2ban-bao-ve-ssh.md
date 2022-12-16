Nếu bạn đã từng làm việc với `LINUX SERVER` thì chắc chắn bạn sẽ biết `SSH` để truy cập vào server. Thường thì sẽ `SSH` sẽ sử dụng port `22` để kết nối. Đây là 1 trong những cách truy cập vào server phải gọi là phổ biến nhất, vi nó phổ biến nên rất dễ được các **HACKER** để ý tới để dò password của bạn.

Mình cũng đã sử dụng biện phát đổi port 22 sang port khác nhưng điều này không khả thi. Tuy nhiên, việc này chỉ hạn chế một chút thôi vì nếu muốn, hacker có thể scan open port để biết được bạn đang sử dụng port nào để tấn công tiếp.

Giải pháp để chúng ta chấm dứt vấn đề này đó là sử dụng một công cụ tự động block IP khi VPS bị tấn công, đó là **Fail2Ban**. Hôm nay, mình sẽ giới thiệu cách hướng dẫn và cài đặt trong bài này.

**Fail2Ban** là một ứng dụng chạy nền theo dõi log file để phát hiện những địa chỉ IP đăng nhập sai password SSH nhiều lần. Sau đó, **Fail2Ban** sử dụng iptable firewall rules để block ngay địa chỉ IP với một khoảng thời gian định trước.

# Cài đặt Fail2Ban
Ở đây mình dùng `Ubuntu 16.04` nhé:
```
sudo apt-get update
sudo apt-get install fail2ban -y
```

# Cấu hình Fail2Ban

Sau khi cài đặt xong, bạn mở file cấu hình của **Fail2Ban** lên sẽ thấy một số thông số như sau:

```
vi /etc/fail2ban/jail.conf
```

```
...

[DEFAULT]

#
# MISCELLANEOUS OPTIONS
#

# "ignoreip" can be an IP address, a CIDR mask or a DNS host. Fail2ban will not
# ban a host which matches an address in this list. Several addresses can be
# defined using space separator.
ignoreip = 127.0.0.1/8

# External command that will take an tagged arguments to ignore, e.g. <ip>,
# and return true if the IP is to be ignored. False otherwise.
#
# ignorecommand = /path/to/command <ip>
#ignorecommand =

# "bantime" is the number of seconds that a host is banned.
bantime  = 600

# A host is banned if it has generated "maxretry" during the last "findtime"
# seconds.
findtime  = 600

# "maxretry" is the number of failures before a host get banned.
maxretry = 5

....
```

Trong đó

1. **ignoreip**: không block những địa chỉ này, thường địa chỉ IP ở VN là địa chỉ động, nên chúng ta không sử dụng được option này.
1. **bantime**: khoảng thời gian (giây) block IP
1. **findtime**: khoảng thời gian (giây) một IP phải login thành công
1. **maxretry**: số lần login false tối đa


Khi cấu hình mặc định của **Fail2Ban** khá là ổn rồi, chúng ta đến bước tiếp theo.

# Cấu hình Fail2Ban bảo vệ SSH
Tạo file cấu hình
```
vi /etc/fail2ban/jail.local
```

Và sử dụng nội dung sau:

```
[sshd]

enabled  = true
filter   = sshd
action   = iptables[name=SSH, port=ssh, protocol=tcp]
logpath  = /var/log/secure.log
maxretry = 3
bantime = 3600
```

Trong đó

* **enabled**: kích hoạt bảo vệ, nếu muốn tắt bạn hãy chuyển thành false
* **filter**: giữ mặc định để sử dụng file cấu hình `/etc/fail2ban/filter.d/sshd.conf`
* **action**: fail2ban sẽ ban địa chỉ IP nếu match filter `/etc/fail2ban/action.d/iptables.conf`. Nếu bạn đã thay đổi port ssh, sửa đoạn port=ssh bằng port mới, ví dụ `port=2222`
* **logpath**: đường dẫn file log **fail2ban** sử dụng để theo dõi
* **maxretry**: số lần login false tối đa
* **bantime**: thời gian ban IP 3600 giây = 1 giờ, bạn có thể điều chỉnh lại nếu muốn.

# Khởi động Fail2Ban

Các bạn chạy lệnh sau để khởi động Fail2Ban

```
sudo service fail2ban start
```


Sau đó check lại iptables xem đã có rule của **Fail2Ban** chưa:

```
sudo iptables -S
```
Kết quả trả về có nội dung như sau là OK: 
```
...
-N fail2ban-ssh
-A INPUT -p tcp -m multiport --dports 22 -j fail2ban-ssh
...
-A fail2ban-ssh -j RETURN
```

# Theo dõi SSH login

Bạn có thể sử dụng lệnh sau để biết được `VPS/Server` đã từng bị tấn công SSH chưa:

```
cat /var/log/secure.log | grep 'Failed password' | sort | uniq -c
```

Kết quả thường sẽ là như bên dưới:

```
root@nova-ubuntu-s-1vcpu-2gb-sgp1-01:~# cat /var/log/secure.log | grep 'Failed password' | sort | uniq -c
      1 Feb 18 14:11:31 nova-ubuntu-s-1vcpu-2gb-sgp1-01 sshd[11982]: Failed password for root from 27.79.212.199 port 41406 ssh2
      1 Feb 18 14:11:34 nova-ubuntu-s-1vcpu-2gb-sgp1-01 sshd[11982]: Failed password for root from 27.79.212.199 port 41406 ssh2
      1 Feb 18 14:19:56 nova-ubuntu-s-1vcpu-2gb-sgp1-01 sshd[12668]: Failed password for root from 27.79.212.199 port 41618 ssh2
      1 Feb 18 14:28:07 nova-ubuntu-s-1vcpu-2gb-sgp1-01 sshd[13529]: Failed password for root from 27.79.212.199 port 41656 ssh2
      1 Feb 18 14:30:14 nova-ubuntu-s-1vcpu-2gb-sgp1-01 sshd[13649]: Failed password for root from 27.79.212.199 port 41662 ssh2
      1 Feb 18 14:30:19 nova-ubuntu-s-1vcpu-2gb-sgp1-01 sshd[13649]: message repeated 2 times: [ Failed password for root from 27.79.212.199 port 41662 ssh2]
```

Để xem IP đã bị banned bởi **Fail2Ban** bạn sử dụng lệnh:

```
fail2ban-client status sshd
```

Kết quả sẽ trả về dạng như sau:
```
|- Filter
|  |- Currently failed:	0
|  |- Total failed:	0
|  `- File list:	/var/log/secure.log
`- Actions
   |- Currently banned:	0
   |- Total banned:	0
   `- Banned IP list:	
```

Để xóa IP khỏi danh sách banned, bạn sử dụng lệnh sau:

```
fail2ban-client set sshd unbanip IP
```

Mọi thông tin chi tiết, hãy tham khảo thêm trên trang chủ của [Fail2Ban](http://www.fail2ban.org/wiki/index.php/Main_Page). 

Chúc bạn thành công.