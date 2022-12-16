![](https://images.viblo.asia/0c23ba65-a5ce-4ffb-b8be-c1d379f96ff3.jpg)

Tiếp nối những kiến thức đã tìm hiểu xong ở [P1](https://viblo.asia/p/linux-hardening-and-system-auditing-p1-bJzKm4G659N) . Hôm nay chúng ta sẽ cùng nhau điểm thêm những hướng dẫn quan trọng - giúp nâng cao bảo mật cho các máy chủ Linux. 

**9. Set Password Expiration Days**

Tham số **PASS_MAX_DAYS** trong /etc/login.defs cho phép người quản trị bắt buộc mật khẩu phải hết hạn sau một khoảng thời gian nhất định. 

Điều này sẽ làm giảm việc kẻ tấn công có thể sử dụng thông tin đăng nhập chiếm được, đăng nhập trái phép vào hệ thống và sử dụng một cách lâu dài.
> Đề nghị tham số **PASS_MAX_DAYS** được thiết lập nhỏ hơn hoặc bằng 90 ngày.

Kiểm tra tham số:
```bash
grep PASS_MAX_DAYS /etc/login.defs
# PASS_MAX_DAYS 90**
```

Kiểm tra tham số với người dùng cụ thể:
```bash
chage --list <user>
```

Sửa tệp tin /etc/login.defs và thiết lập tham số:
```
# Maximum number of days between password change: 90
PASS_MAX_DAYS 90
```
Sửa tham số trực tiếp với người dùng cụ thể:
```bash
chage --maxdays 90 <user>
```

**10. Set Password Change Minimum Number of Days**

Tham số **PASS_MIN_DAYS** trong /etc/login.defs cho phép người quản trị ngăn chặn người dùng thay đổi mật khẩu của họ kể từ lần thay mật khẩu gần nhất. 

> Đề nghị tham số **PASS_MIN_DAYS** được đặt thành 7 hoặc nhiều hơn. 
>
Bằng cách hạn chế tần suất thay đổi mật khẩu, người quản trị có thể ngăn chặn người dùng liên tục thay đổi mật khẩu, dẫn đến tái sử dụng mật khẩu cũ 

```bash
grep PASS_MIN_DAYS /etc/login.defs
# PASS_MIN_DAYS 7
```
Kiểm tra tham số trên người dùng cụ thể:
```bash
chage --list <user>
#Maximum number of days between password change: 90
```
Sửa tệp tin /etc/login.defs và thiết lập tham số:
**PASS_MIN_DAYS 90**

Sửa tham số trực tiếp với người dùng cụ thể:

```bash
chage --mindays 90 <user>
```
**11. Set Password Expiring Warning Days**

Tham số **PASS_WARN_AGE** trong etc/login.defs cho phép người quản trị  thông báo cho người sử dụng, mật khẩu của họ sẽ hết hạn trước một số ngày nhất định. 

> Khuyến nghị tham số **PASSWARNAGE** được đặt thành 7 hoặc nhiều hơn.

Kiểm tra tham số:

```bash
grep PASS_WARN_AGE /etc/login.defs
PASS_WARN_AGE 7
```
Kiểm tra tham số với người dùng cụ thể:

```bash
chage --list <user>
# Number of days of warning before password expires: 7
```
Sửa tệp tin /etc/login.defs và thiết lập tham số: **PASS_WARN_AGE 7**. 

```bash
chage --warndays 7 <user>
```
**12. Disable System Accounts**

Có một số tài khoản được cung cấp sử dụng để quản lý ứng dụng nhưng không được cấu hình để cung cấp tương tác với shell.
Việc này là quan trọng để đảm bảo tài khoản không được dùng bởi người dùng thông thường. 

Theo mặc định, Ubuntu thiết lập mật khẩu cho những tài khoản này là một chuỗi không hợp lệ, nhưng nó cũng được khuyến khích đặt đường dẫn shell là /usr/sbin/nologin. Điều này ngăn cản các tài khoản thực thi bất cứ lệnh nào.

```bash
egrep -v "^\+" /etc/passwd | awk -F: '($1!="root" && $1!="sync" && $1!="shutdown" && $1!="halt" && $3<500 && $7!="/usr/sbin/nologin" && $7!="/bin/false") {print}'
```
*Lệnh này phải không trả về kết quả nào.*

Các tài khoản bị khóa đều bị cấm thực hiện lệnh trên hệ thống, không thể đăng nhập cũng như không sử dụng được Crontab.
Để chắc chắn, sử dụng script sau:

```bash 
#!/bin/bash
for user in `awk -F: '($3 < 500) {print $1 }' /etc/passwd`; do
if [ $user != "root" ]
then
/usr/sbin/usermod -L $user
if [ $user != "sync" ] && [ $user != "shutdown" ] && [ $user != "halt" ]
then
/usr/sbin/usermod -s /usr/sbin/nologin $user
fi
fi
done
```
**13. Set Default Group for root Account**

Lệnh usermod có thể được sử dụng để xác định nhóm người dùng. Điều này ảnh hưởng đến quyền truy cập vào tập tin và được tạo bởi người dùng root.

Sử dụng GID 0 cho tài khoản root, giúp ngăn chặn tệp tin do root làm chủ sở hữu có thể bị truy cập bởi người dùng không có đặc quyền.

Thực hiện lệnh: 
```bash
grep "^root:" /etc/passwd | cut -f4 -d:
# usermod -g 0 root
```
**14. Set Default umask for Users**

Umask mặc định xác định các quyền hạn của tập tin được tạo bởi người dùng. Người dùng tạo ra các tập tin và làm cho tập tin và thư mục của họ có thể đọc được bởi những người khác thông qua lệnh chmod. 

Người sử dụng muốn cho phép các tập tin và thư mục để có khả năng đọc bởi những người khác theo mặc định của họ có thể chọn một umask khác nhau mặc định bằng cách chèn lệnh umask vào shell (.profile, .bashrc) trong thư mục chính của họ.

> Lưu ý: Cấu hình này áp dụng cho Bash Shell. Nếu Shell khác được hỗ trợ trên hệ thống, khuyến nghị rằng các tập tin cấu hình cũng cần phải được kiểm tra.

```bash
grep "^UMASK" /etc/login.defs
UMASK 077
# Mở tệp tin /etc/login.defs và thiết lập tham số UMASK
UMASK 077
```
**15. Lock Inactive User Accounts**

Tài khoản người dùng không hoạt động trong một khoảng thời gian nhất định có thể được tự động vô hiệu hóa. 

> Khuyến nghị là nếu tài khoản đó không hoạt động trong vòng 35 ngày hoặc hơn, sẽ bị vô hiệu hóa.

```bash
# useradd -D | grep INACTIVE
INACTIVE=35
# Thiết lập lại số ngày không hoạt động:
useradd -D -f 35
```

**16. Verify Permissions on /etc/passwd**

Tệp tin /etc/passwd chứa thông tin tài khoản người dùng, được sử dụng bởi nhiều chương trình trong hệ thống, do đó tệp tin này phải cho phép đọc thì các chương trình mới hoạt động được.

Mặc dù nó được bảo vệ theo mặc định, quyền hạn của tập tin có thể được thay đổi hoặc vô tình hoặc thông qua các hành động độc hại.

Kiểm tra quyền hạn của tệp tin /etc/passwd
```bash
/bin/ls -l /etc/passwd
-rw-r--r-- 1 root root 2055 Jan 30 16:30 /etc/passwd
```
Thiết lập lại quyền hạn:
```
/bin/chmod 644 /etc/passwd

```
**17. Verify Permissions on /etc/shadow**

Tệp tin /etc/shadow được sử dụng để lưu trữ thông tin về tài khoản người dùng, nó rất quan trọng đối với sự an toàn của các account, chẳng hạn như mật khẩu đã được hash và các thông tin bảo mật khác.

Nếu kẻ tấn công có thể  truy cập vào /etc/shadow, sau đó chạy một chương trình dò mật khẩu thông qua các mã băm. Thông tin bảo mật được lưu trữ trong các tập tin /etc/shadow (ví dụ như  ngày hết hạn) cũng có thể hữu ích để phá hoại tài khoản người dùng.

```bash
/bin/ls -l /etc/shadow
-rw-r----- 1 root shadow 712 Jul 22 21:33 shadow
```
Thiết lập lại quyền hạn:
```bash
/bin/chmod o-rwx,g-rw /etc/shadow
```

**18. Verify Permissions on /etc/group**

Tệp tin /etc/group chứa danh sách tất cả các nhóm hợp lệ được xác định trong hệ thống. 



Kiểm tra quyền hạn của tệp tin /etc/group
```bash
/bin/ls -l /etc/group
-rw-r--r-- 1 root root 762 Sep 23 002 /etc/group
```

Thiết lập lại quyền hạn:
```bash
/bin/chmod 644 /etc/group
```
**19. Verify User/Group Ownership on /etc/passwd**

Tệp tin /etc/passwd chứa một danh sách tất cả các userIDs hợp lệ được xác định trong hệ thống, nhưng không có mật khẩu. Tập tin /etc/passwd cần phải được bảo vệ khỏi sự thay đổi trái phép từ người dùng không có đặc quyền, nhưng cần phải có quyền đọc để đáp ứng cho những chương trình không có đặc quyền.

Kiểm tra người dùng và nhóm sở hữu tệp tin /etc/passwd:
```bash
/bin/ls -l /etc/passwd
-rw-r--r-- 1 root root 762 Sep 23 002 /etc/passwd
```
Thiết lập lại quyền hạn:
```bash
/bin/chown root:root /etc/passwd
```

**20. Verify User/Group Ownership on /etc/group**

Tệp tin /etc/group chứa một danh sách tất cả các nhóm hợp lệ được xác định trong hệ thống.
Các tập tin /etc/group cần phải được bảo vệ thay đổi trái phép từ người dùng không có đặc quyền, nhưng cần phải có quyền đọc để đáp ứng cho những chương trình không có đặc quyền.

Kiểm tra quyền hạn cho tệp tin /etc/group:
```bash
/bin/ls -l /etc/group
-rw-r--r-- 1 root root 762 Sep 23 002 /etc/group
```
Thiết lập lại quyền hạn:
```bash
/bin/chown root:root /etc/group
Review User and Group Settings
Ensure Password Fields are Not Empty
```
>Một tài khoản không có mật khẩu có nghĩa là bất cứ ai cũng có thể đăng nhập như người dùng đó mà không cần mật khẩu.
Tất cả tài khoản phải có mật khẩu hay bị khóa để ngăn chặn các tài khoản được sử dụng bởi một người sử dụng trái phép.

Thực hiện lệnh sau và đảm bảo không có kết quả trả về:

```bash 
/bin/cat /etc/shadow | /usr/bin/awk -F: '($2 == "" ) { print $1 " does not have a password "}'
```
Nếu tài khoản không có mật khẩu, thực hiện lệnh sau để khóa tài khoản đó:
```bash
/usr/bin/passwd -l <username>

```
**21. Verify No UID 0 Accounts Exist Other Than root**

Bất kỳ tài khoản nào với UID 0 đều có đặc quyền cao nhất trên hệ thống. Truy cập này phải được hạn chế để chỉ tài khoản mặc định root và chỉ từ system console. Quyền truy cập quản trị phải thông qua một tài khoản không có đặc quyền.

Thực hiện lệnh sau và chắc chắn rằng kết quả trả về là root:
```bash
/bin/cat /etc/passwd | /usr/bin/awk -F: '($3 == 0) { print $1 }'
Root
```
**22. Check User Home Directory Ownership**

Kiểm tra chủ sở hữu thư mục home của người dùng.
> Nếu không có kết quả trả về thì quyền hạn đang được thiết lập đúng cho người dùng hiện tại. 
> 
> Nếu có kết quả trả về thì thư mục home của người dùng hiện tại đang được sở hữu bởi một người dùng khác.
```bash

#!/bin/bash
cat /etc/passwd | awk -F: '{ print $1 " " $3 " " $6 }' | while read user uid dir; do
	if [ $uid -ge 500 -a -d "$dir" -a $user != "nfsnobody" ]; then
		owner=$(stat -L -c "%U" "$dir")
		if [ "$owner" != "$user" ]; then
			echo "The home directory ($dir) of user $user is owned by $owner."
		fi
	fi
done
```