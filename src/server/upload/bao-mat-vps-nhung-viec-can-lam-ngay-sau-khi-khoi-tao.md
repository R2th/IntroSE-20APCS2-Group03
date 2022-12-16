Hôm rồi con VPS của mình bị thanh niên rãnh nào hack để tấn công một server khác, sau đó mình nhận được một mớ email từ bọn VPS provider doạ xoá account. Quá bực mới search Google “How to protect VPS”, hôm nay tổng hợp lại tại đây. Hi vọng không ai đạp shit sau mình.

Dưới đây là những bước vô cùng cơ bản, sơ đẳng và rất dễ thực hiện, bạn phải làm ngay sau khi tạo VPS.
Mình ví dụ trên VPS của Vultr, OS: Ubuntu
## 1. Đăng nhập bằng tài khoản non-root
* *Có bạn hỏi: Tại sao phải dùng non-root? Sao không dùng luôn root cho khoẻ? Tạo account khác chi cho lằng nhằng?
* Xin hỏi lại tại sao phải dùng root? Có phải tất cả chương trình đều cần dùng root đâu? Một chương trình không cần dùng root mà chạy với quyền root thì có tốt không?
* Sau khi trả lời những câu hỏi trên thì hãy tạo ngay một account non-root.
* Hãy đặt mọi thứ vào đúng vị trí của nó, cuộc đời bạn tự nhiên tươi đẹp :))
```
root@appconus_test:~# adduser appconus
Adding user `appconus' ...
Adding new group `appconus' (1000) ...
Adding new user `appconus' (1000) with group `appconus' ...
Creating home directory `/home/appconus' ...
Copying files from `/etc/skel' ...
Enter new UNIX password: 
Retype new UNIX password: 
passwd: password updated successfully
Changing the user information for appconus
Enter the new value, or press ENTER for the default
    Full Name []: Appconus
    Room Number []: 
    Work Phone []: 
    Home Phone []: 
    Other []: 
Is the information correct? [Y/n] y
root@appconus_test:~#
```
* Thêm user vào sudo group
```
root@appconus_test:~# adduser appconus sudo
Adding user `appconus' to group `sudo' ...
Adding user appconus to group sudo
Done.
root@appconus_test:~#
```
* Account mới tạo nên chưa có thông tin pub key nên khi connect yêu cầu nhập password.
```
hieuvos-Mac-Pro:~ hieuvo$ ssh appconus@45.32.39.20
...
appconus@45.32.39.20's password:
```
* Hỏi: Phải làm sao để không cần nhập password khi ssh connect?
* Trả lời: Tất nhiên là phải upload pub key từ localhost lên.
* Cài ssh-copy-id trên localhost
```
hieuvos-Mac-Pro:~ hieuvo$ brew install ssh-copy-id
Warning: ssh-copy-id-6.8p1 already installed
hieuvos-Mac-Pro:~ hieuvo$
```
* Đưa pub key lên VPS
```
hieuvos-Mac-Pro:~ hieuvo$ ssh-copy-id -i ~/.ssh/appconus_test.pub appconus@45.32.39.20
/usr/local/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/local/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
...
appconus@45.32.39.20's password:
Number of key(s) added:        1
Now try logging into the machine, with:   "ssh 'appconus@45.32.39.20'"
and check to make sure that only the key(s) you wanted were added.
hieuvos-Mac-Pro:~ hieuvo$
```
## 2. Đổi default ssh port
```
appconus@appconus_test:~$ sudo nano /etc/ssh/sshd_config
 
# What ports, IPs and protocols we listen for
Port 22
 # What ports, IPs and protocols we listen for
Port 4111
```
* Port này bạn tự chọn, mình chọn 4111 để ví dụ.
* Xong reload ssh
```
appconus@appconus_test:~$ sudo service ssh restart
ssh stop/waiting
ssh start/running, process 1958
appconus@appconus_test:~$
```
* Connect lại thử bằng port mặc định
```
hieuvos-Mac-Pro:~ hieuvo$ ssh 'appconus@45.32.39.20'
ssh: connect to host 45.32.39.20 port 22: Connection refused
hieuvos-Mac-Pro:~ hieuvo$
 ```
* Tất nhiên là không được, port đổi rồi mà. nên đổi port  mới
```
hieuvos-Mac-Pro:~ hieuvo$ ssh 'appconus@45.32.39.20' -p 4111
...
Welcome to Ubuntu 14.04.4 LTS (GNU/Linux 3.13.0-85-generic x86_64)
 
 * Documentation:  https://help.ubuntu.com/
Last login: Thu May 12 23:56:33 2016 from 113.189.43.59
appconus@appconus_test:~$
```
## 3. Bật firewall
* Trước khi bật firewall thì nhớ phải thêm rule để mở port ssh 4111 đã nhé.
```
appconus@appconus_test:~$ sudo ufw allow 4111/tcp
Rules updated
Rules updated (v6)
appconus@appconus_test:~$
```
* Xong enable firewall
```
appconus@appconus_test:~$ sudo ufw enable 
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup
appconus@appconus_test:~$
```
## 4. Không cho phép ping
* Ping thử cái chơi
```
hieuvos-Mac-Pro:~ hieuvo$ ping 45.32.39.20
PING 45.32.39.20 (45.32.39.20): 56 data bytes
64 bytes from 45.32.39.20: icmp_seq=0 ttl=48 time=316.044 ms
64 bytes from 45.32.39.20: icmp_seq=1 ttl=48 time=315.351 ms
```
* Giờ không cho ping nữa, mở file rule
```
appconus@appconus_test:~$ sudo nano /etc/ufw/before.rules
//tìm dòng
-A ufw-before-input -p icmp --icmp-type echo-request -j ACCEPT
//sửa thành
-A ufw-before-input -p icmp --icmp-type echo-request -j DROP
//Reload firewall
appconus@appconus_test:~$ sudo ufw reload
Firewall reloaded
```
* Ping lại bằng niềm tin thử :))
```
hieuvos-Mac-Pro:~ hieuvo$ ping 45.32.39.20
PING 45.32.39.20 (45.32.39.20): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
Request timeout for icmp_seq 3
```
## 5. Khoá tài khoản root, không cho login bằng password
* Có non-root account rồi, khoá ngay root. Làm thêm một bước nữa là disable login bằng password, dùng ssh key bảo mật hơn mà.
```
appconus@appconus_test:~$ sudo nano /etc/ssh/sshd_config
//Khoá root, tìm
PermitRootLogin yes
//sửa thành
PermitRootLogin no
//Disable passwork login, tìm
#PasswordAuthentication yes
//đổi thành và uncomment
PasswordAuthentication no
```
* Reload ssh service
```
appconus@appconus_test:~$ sudo service ssh restart
ssh stop/waiting
ssh start/running, process 17707
appconus@appconus_test:~$
```
## 5.  Rút gọn lệnh ssh
* Khi connect tới remote host, dùng lệnh như này:
```
hieuvos-Mac-Pro:~ hieuvo$ ssh appconus@45.32.39.20 -i ~/.ssh/appconus_test -p 4111
```
* Dài lê thê, gõ mệt, chừ phải rút gọn lại thành
```
hieuvos-Mac-Pro:~ hieuvo$ ssh 45.32.39.20
 ```
* Phê chưa?! Thằng nào đi ngang liếc màn hình cũng không biết bạn đang connect tới ssh bằng port nào, dùng account nào. Config ngay nào. À cái này config trên localhost nhé.
```
nano .ssh/config
\\Thêm vào một bộ
VisualHostKey=yes
...
Host 45.32.39.20
Port 4111
User appconus
IdentityFile ~/.ssh/appconus_test
```
* Quá dễ đúng không? Thử connect phát nào
```
hieuvos-Mac-Pro:~ hieuvo$ ssh 45.32.39.20
...
Welcome to Ubuntu 14.04.4 LTS (GNU/Linux 3.13.0-85-generic x86_64)
 * Documentation:  https://help.ubuntu.com/
Last login: Fri May 13 16:18:20 2016 from 113.189.40.75
appconus@appconus_test:~$
```
## 6. Bật ngay bảo mật 2 lớp Two Factor Auth
* Cái này ngoài lề tí, nó liên quan tới account VPS của bạn. Nhiều bạn không thích dùng vì lằng nhằng, mất thời gian nhập code. Bảo mật quan trọng hơn bạn ơi. Hầu như thằng VPS provider nào cũng có chức năng bảo mật này, có nhiều phương thức để lấy mã login như SMS hoặc ứng dụng sinh mã ngẫu nhiên như Authy hoặc Authenticator của Google.
> Tham khảo:
> https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04
> https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-an-ubuntu-14-04-vps
> http://www.thegeekstuff.com/2008/11/3-steps-to-perform-ssh-login-without-password-using-ssh-keygen-ssh-copy-id/
> https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server
### nguồn: appconus.com