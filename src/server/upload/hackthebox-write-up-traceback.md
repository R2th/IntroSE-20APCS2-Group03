## 0. Mở đầu

Chúng ta tiếp tục đến với một bài Linux được đánh giá là Easy (nhưng khá thú vị):

![](https://images.viblo.asia/5264e318-bdc0-46cf-ae19-8aa6efee74f1.png)

Machine mới được release vào 14/3/2020 (khoảng hơn 1 tuần) và có IP **10.10.10.181**.

Nhìn vào matrix-rate:

![](https://images.viblo.asia/25c30e2b-e6c9-49ee-8f93-e6cb1986279c.png)

Có vẻ sẽ phải lần mò nhiều hơn là search tên service, ra CVE rồi 1 phát ăn ngay như các Machine khác.

Let's start

## 1. User Flag

Như bao bài khác, cần ngay Nmap

```
Nmap scan report for 10.10.10.181
Host is up (0.24s latency).
Not shown: 65533 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 96:25:51:8e:6c:83:07:48:ce:11:4b:1f:e5:6d:8a:28 (RSA)
|   256 54:bd:46:71:14:bd:b2:42:a1:b6:b0:2d:94:14:3b:0d (ECDSA)
|_  256 4d:c3:f8:52:b8:85:ec:9c:3e:4d:57:2c:4a:82:fd:86 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-methods: 
|_  Supported Methods: GET POST OPTIONS HEAD
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Help us
```


Không có gì khả quan lắm, nhìn vào giao diện Web, có vẻ như Web đã bị Hack và **Xh4H** đã để lại 1 backdoor trên này.

![](https://images.viblo.asia/699f4b6c-12b8-4179-8fa8-6455e60f4df3.png)

Một Web shell for sure !

![](https://images.viblo.asia/26b72638-1338-42f3-857b-8fc80bd18d72.png)


Vâng nhờ một người bạn có được User Flag của bài này trước đó, đã "hint" là phải OSINT thanh niên **Xh4H** mà cụ thể là Github của owner: https://github.com/Xh4H/Web-Shells

Copy tên shell và fuzz trên URL, chúng ta có kết quả **10.10.10.181/smevk.php**. Truy cập mặc định với username / password là admin.

![](https://images.viblo.asia/8f3f9ae9-1f4b-435c-94b3-833f245c5f63.png)


Đây là một Webshell chạy dưới quyền **webadmin**.

![](https://images.viblo.asia/5aafcf78-c688-4bfc-bb72-b64b76263c84.png)

Và không có flag:

![](https://images.viblo.asia/8c8472df-6de5-4e04-a69f-5df80c6ceb40.png)

Để shell ngon lành cành đào dễ chọc ngoáy hơn, chúng ta có thể dùng reverse shell, bind shell hoặc ssh. Mình thì dùng ssh cho tiện:

![](https://images.viblo.asia/f8cf91af-a810-4734-aeec-4abfce125d3e.png)

Từ đây có thể đường hoàng ssh vào dưới tên **webadmin**.

![](https://images.viblo.asia/cb16d4fa-20f3-48de-9e3b-b67c427d2846.png)

Tại đây chúng ta leo quyền lần 1 để lấy flag của sysadmin, phương thức mà Owner chủ định là sử dụng Sudo Rights, các bạn có thể đọc bài viết chi tiết  tại [đây](https://viblo.asia/p/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-0-using-sudo-rights-3Q75w8x2KWb).

![](https://images.viblo.asia/53f26b99-32c1-443d-a396-aea6f1dfaabb.png)

Leo quyền với luvit bằng cách execute command và thêm public key để ssh tới **sysadmin**.

![](https://images.viblo.asia/3b1cffbf-d774-46a5-8d26-d2d0221ea438.png)

Tại đây chúng ta dễ dàng ssh tới **sysadmin** và có flag:

![](https://images.viblo.asia/b4018778-7a7c-4cbc-b5d0-42c9b81f5c02.png)

## 2. Root Flag

Bài này để leo Root chúng ta phải thông qua việc exploit các Cron jobs. Đây là các công việc được lập lịch.

![](https://images.viblo.asia/87800e05-ce65-4f86-ac2c-4ed4de23209a.png)

Để monitor các process đang chạy trong Machine, chúng ta sử dụng  [pspy](https://github.com/DominicBreuker/pspy).

Để biết machine là 32 bit hay 64bit, gõ command: **uname -m**. Nếu là x86_64 thì là 64bit. Ở trường hợp machine này là 64 bit.

Tải về máy thật, rồi từ Machine chúng ta kéo file về, cấp quyền và chạy:

![](https://images.viblo.asia/5efdc22e-a6b6-4a7d-8408-279a7a589e2c.png)

Tại đây chúng ta quan sát kết quả trả về, có một tiến trình (process) đặc biệt được sử dụng nhiều:

![](https://images.viblo.asia/bd11d4a1-9467-4cd6-995a-236230ef728f.png)

Chúng ta có thể thấy cứ mỗi 30s thì nội dung các file ở **/etc/update-motd.d/** sẽ được ghi đè bởi câu lệnh copy phía trước. Hãy xem nó là gì ?

![](https://images.viblo.asia/3fea1dcf-e2a5-4123-a4f9-7c7c6c689522.png)

Trong các file trên có một file đặc biệt là **00-header**, bởi nó chạy dưới quyền Root và được gọi để in ra dòng chữ **Welcome to Xh4H Land** mỗi khi có user ssh tới.

Ghi đè thêm vào đó một reverse shell với nano:

![](https://images.viblo.asia/d6007322-d61e-4e50-acbd-2c18a60899d6.png)

Vấn đề mấu chốt ở đây là phải **NHANH TAY** vì cứ mỗi 30s thì nội dung của file lại được renew.

SSH tới với user **sysadmin**, song song với đó là lắng nghe trên máy thật ở cổng 4444 kia, sau vài lần **CỐ NHANH TAY** thì reverse shell đã run thành công dưới quyền Root:

![](https://images.viblo.asia/f258ae70-c10f-446e-8fc0-c7a2776dc250.png)

 Và có Root Flag:
 
 ![](https://images.viblo.asia/cf3c626e-eaff-45ca-a9a8-9b8f848107df.png)


## 3. Kết luận

Một bài hay với nhiều phương thức leo quyền thú vị, cùng với đó là tác giả cũng hint rất tinh tế và yêu cầu kết hợp với recon bên ngoài Machine. Là một bài rất đáng chơi và tìm hiểu.