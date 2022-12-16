[Secure Coding](https://viblo.asia/p/secure-coding-part-1-la-developer-can-lam-gi-de-ung-dung-cua-minh-an-toan-va-bao-mat-hon-bJzKmPqD59N), Middleware, Police, SQL Injection,... có lẽ là những cụm từ vô cùng quen thuộc với anh em lập trình web. Nhưng liệu Secure coding có đủ an toàn cho ứng dụng của chúng ta? Câu trả lời rẩt tiếc lại là KHÔNG. Vì thực tế chỉ 20% các trang web bị hack do vấn đề về **Secure Coding**, còn 80% còn lại là **Secure Infra**.

![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/5c3a36fa04286304a71e2661/images/5c3c90a92c7d3a31944ffdb9/img-26322-1547472967-1909028268.png)

Bạn hãy thử tưởng tượng, nếu **Secure Infra** là được ví như một căn nhà thì **Secure Coding** sẽ là cái két sắt. Nếu kẻ trộm ngay cả nhà còn không vào được thì làm sao có khả năng động tới két sắt? Và đó là lý do tại sao chúng ta cần quan tâm đến **Secure Infra**

Và trong bài viết ngày hôm nay, mình sẽ tìm hiểu về **CIS Benchmark cho Linux**, một số tiêu chuẩn cấu hình bảo mật được công nhận bởi nhiều tổ chức, chính phủ, doanh nghiệp trên thế giới, cụ thể là tiêu chuẩn để cấu hình Linux.
>>  **CIS Benchmark cho Linux** bao gồm các iêu chuẩn này hướng dẫn Audit:
>>  - Cấu hình theo hệ điều hành: Unix/Linux, Windows, MacOS,..
>>  - Cơ sở dữ liệu: MySQL, MS-SQL,…
>>  - Các dịch vụ khác: IIS, Apache, Bind, Directory Service…

### 1. Filesystem Configuration

- Hãy disable các cramfs, freevxfs, jffs2, hfs, hfsplus, udf, FAT filesystems nếu nó không cần thiết

    Audit
    ```html
    $ modprobe -n -v <filesystem_name> 
    install /bin/true 
    $ lsmod | grep <filesystem_name>
    <No output>
    ```
    Remediation
    ```
    $ install <filesystem_name> /bin/true
    ```
- Phân vùng cho /tmp, /var, /var/tmp, /var/log, /var/log/audit ,/home

    Audit
    ```
    $ mount | grep <path>
    ```
    Ví dụ:
    ```
    $ mount | grep /tmp
    tmpfs on /tmp type tmpfs (rw,nosuid,nodev,noexec,relatime)
    ```
    Remediation
    - Trường hợp cài đặt mới, bạn hãy tạo 1 phân vùng riêng cho những folder trên.
    - Trường hợp hệ thống đã cài đặt, bạn hãy tạo 1 phân vùng mới và config `/etc/fstab`.
- Set nodev, nosuid set on cho /tmp
    
    Audit
    ```
    $ mount | grep /tmp 
    tmpfs on /tmp type tmpfs (rw,nosuid,nodev,noexec,relatime)
    ```
    Remediation
    ```
    $ mount -o remount,nodev /tmp
    ```
- Set nodev, nosuid, noexec cho /var/tmp

    Audit
    ```
    $ mount | grep /var/tmp 
    tmpfs on var/tmp type tmpfs (rw,nosuid,nodev,noexec,relatime)
    ```
    Remediation
    ```
    $ mount -o remount,nodev /var/tmp
    $ mount -o remount,nosuid /var/tmp
    $ mount -o remount,noexec /var/tmp
    ```
- Set nodev cho /home

    Audit
    ```
    $ mount | grep /home 
    /dev/xvdf1 on /home type ext4 (rw,nodev,relatime,data=ordered)
    ```
    Remediation
    ```
    $ mount -o remount,nodev /home
    ```
- Set nodev, nosuid, noexec cho /dev/shm

    Audit
    ```
    $ mount | grep /dev/shm 
    tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev,noexec,relatime)
    ```
    Remediation
    ```
    $ mount -o remount,nodev /dev/shm
    $ mount -o remount,nosuid /dev/shm
    $ mount -o remount,noexec /dev/shm
    ```
- Set sticky bit cho tất cả các world-writable directories (chmod +t)

    **Sticky bit** là một quyền đặc biệt, được thiết lập trên một thư mục cấp quyền ghi cho toàn bộ nhóm. Bit này đảm bảo rằng tất cả các thành viên của nhóm có thể ghi vào thư mục, nhưng chỉ người tạo file, hay chủ sở hữu file, mới có thể xóa nó.
 
    Lệnh sau `chmod` với flag `-t` sẽ set sticky bit cho thư mục

    Audit
    ```
    $  df --local -P | awk {'if (NR!=1) print $6'} | xargs -I '{}' find '{}' -xdev -type   d \( -perm -0002 -a ! -perm -1000 \) 2>/dev/null
    ```
    Remediation
    ```
   $ df --local -P | awk {'if (NR!=1) print $6'} | xargs -I '{}' find '{}' -xdev -type   d -perm -0002 2>/dev/null | chmod a+t
    ```
- Disable Automounting

  autofs cho phép tự động gắn các thiết bị. Nếu bật autofs, bất kỳ ai có quyền truy cập vật lý đều có thể đính kèm ổ USB hoặc đĩa và có sẵn nội dung vào hệ thống ngay cả khi họ không có quyền gắn nó.
  
  Audit
  ```
  $ systemctl is-enabled autofs 
  disabled
  ```
  Remediation
  ```
  $ systemctl disable autofs
  ```

### 2. Filesystem Integrity Checking
- Cài đặt **AIDE**

    **AIDE** dùng để kiểm tra trạng thái hệ thống file, bao gồm thời gian sửa đổi, quyền và băm tệp, sau đó có thể được sử dụng để so sánh trạng thái hiện tại của hệ thống, nhằm nhanh chóng phát hiện các sửa đổi bất hợp pháp nếu có.

    Audit
    ```
    $ dpkg -s aide
    ```
    Remediation
    ```
    $ apt-get install aide
    ```
- Đảm bảo việc kiểm soát tính toàn vẹn của hệ thống

    Cần kiểm tra định kỳ tính toàn vẹn của hệ thống file nhắm phát hiện các thay đổi của hệ thống.
    
    Audit
    
    Bạn hãy chạy 2 lệnh sau để kiểm tra việc đặt lịch kiểm tra của AIDE
    ```
    $ crontab -u root -l | grep aide 
    $ grep -r aide /etc/cron.* /etc/crontab
    ```
    Remediation
    
    Mở file crontab
    ```
    $ crontab -u root -e
    ```
    sau đó thêm dòng này vào cuối file
    ```
    0 5 * * * /usr/bin/aide --check
    ```
    việc này sẽ đảm bảo AIDE luôn check thay đổi của hệ thống vào 5 giờ sáng mỗi ngày.
### 3. Secure Boot Settings
- Config permissions cho bootloader

    Tệp `/boot/grub.grub.cfg` chứa thông tin về cài đặt boot và password unlocking các boot options. Việc config permitssion sẽ đảm bào việc non-root (người dùng không có quyền root) nhìn thấy hoặc thay đổi các boot parameters. Các parameters này có thể giúp hacker xác định các điểm yếu về bảo mật khi khởi động hệ thống, từ đó có thể khai thác chúng.
    
    Audit
    ```
    $ stat /boot/grub/grub.cfg 
    Access: (0600/-rw-------) Uid: ( 0/ root) Gid: ( 0/ root)
    ```
    Remediation
    ```
    $ chown root:root /boot/grub/grub.cfg 
    $ chmod og-rwx /boot/grub/grub.cfg
    ```
- Set password cho bootloader

   Việc set password sẽ đảm bảo luôn yêu cầu bất kỳ ai khởi động lại hệ thống đều phải nhập mật khẩu, trước khi họ có thể thiết lập các boot parameters.
   
   Audit
   ```
   $ grep "^set superusers" /boot/grub/grub.cfg 
   set superusers="<username>" 
   $ grep "^password" /boot/grub/grub.cfg 
   password_pbkdf2 <username> <encrypted-password>
   ```
   Remediation
   
   Tạo một mật khẩu được mã hóa bằng grub-mkpasswd-pbkdf2:
   ```
   grub-mkpasswd-pbkdf2 
   Enter password: <password> 
   Reenter password: <password> 
   Your PBKDF2 is <encrypted-password>
   ```
   Sau đó thêm đoạn sau vào file `/etc/grub.d/00header` hoặc `/etc/grub.d`
   ```
   cat <<EOF 
  set superusers="<username>" 
  password_pbkdf2 <username> <encrypted-password> 
  EOF
   ```
   Cuối cùng là chạy lệnh update grup config
   ```
   $ update-grub
   ```
- Yêu cầu xác thực với single user mode

   Chế độ **single user mode** được sử dụng để khôi phục hệ thống khi phát hiện ra có sự cố trong quá trình khởi động hoặc là selection từ bootloader
   
   Yêu cầu xác thực trong chế độ người dùng duy nhất ngăn người dùng trái phép khởi động lại hệ thống thành người dùng duy nhất để có được đặc quyền root mà không cần thông tin đăng nhập.
   
   Audit
   
   Kiểm tra mật khẩu có được yêu cầu với quyền root hay không
   ```
   $ grep ^root:[*\!]: /etc/shadow
   ```
   Remediation
   ```
   $ passwd root
   ```
### 4. Additional Process Hardening
-  Ensure core dumps are restricted

    Audit
    ```
    $ grep "hard core" /etc/security/limits.conf /etc/security/limits.d/*
    * hard core 0
    $ sysctl fs.suid_dumpable
    fs.suid_dumpable = 0
    ```
    Remediation
    
    Thêm vào file `/etc/security/limits.conf` hoặc `/etc/security/limits.d/*` dòng sau:
     ```
    * hard core 0 
     ```
    Set biến sau trong file `/etc/sysctl.conf`:
    ```
    fs.suid_dumpable = 0
    ```
    Cuối cùng, chạy lệnh sau để active các kernel parameter:
    ```
     $ sysctl -w fs.suid_dumpable=0
    ```

-  Bật ASLR ( Address Space Layout Randomization)

    Audit
    ```
    $ sysctl kernel.randomize_va_space
    kernel.randomize_va_space = 2
    ```
    Remediation
    
    Bạn hãy sửa tham số sau:
    ```:/etc/sysctl.conf 
    kernel.randomize_va_space = 2
    ```
    Sau đó chạy lệnh
    ```
    $ sysctl -w kernel.randomize_va_space=2
    ```
-  Gỡ prelink (nếu có)

    Audit
    Kiểm tra xem prelink có được cài đặt hay không
    ```
    $ dpkg -s prelink
    ```
    Remediation
    
    Nếu hệ thống của bạn có prelink, hãy gỡ nó khỏi hệ thống của bạn
    ```
    $ apt-get remove prelink
    ```
### 5. Warning Banners
Đảm bảo GDM login banner được config

GDM hay GNOME Display Manager là giao diện login.

Audit

Nếu hệ thống có cài đặt GDM, tồn tại `/etc/dconf/profile/gdm` chứa:
```
user-db:user 
system-db:gdm 
file-db:/usr/share/gdm/greeter-dconf-defaults
```
thì hãy verify `banner-message-enable` and `banner-message-text` option được config trong `/etc/dconf/db/gdm.d/01-banner-message`:
```
banner-message-enable=true 
banner-message-text='<banner message>'
```
Remediation

Tạo file `/etc/dconf/profile/gdm`:
```:/etc/dconf/profile/gdm
user-db:user
system-db:gdm
file-db:/usr/share/gdm/greeter-dconf-defaults
```
Tạo hoặc edit `banner-message-enable` và `banner-message-text` options
trong `/etc/dconf/db/gdm.d/01-banner-message`:
```/etc/dconf/db/gdm.d/01-banner-message
[org/gnome/login-screen]
banner-message-enable=true
banner-message-text='Authorized uses only. All activity may be monitored and
reported.'
```
Cuối cùng, chạy lệnh sau để update hệ thống
```
$ dconf update
```

Trên đây là một số tiêu chuẩn Initial Setup cho hệ thống mình tìm hiểu được, có thể vẫn còn nhiều thiếu sót, comment góp ý cho mình nhé!

Hi vọng bài viết có ích với bạn. Cảm ơn và hẹn gặp lại bạn ở những bài viết tiếp theo.

Tài liệu tham khảo

[CIS Ubuntu Linux 16.04 LTS Benchmark](https://secscan.acron.pl/_media/ubuntu1604/cis_ubuntu_linux_16.04_lts_benchmark_v1.0.0.pdf)