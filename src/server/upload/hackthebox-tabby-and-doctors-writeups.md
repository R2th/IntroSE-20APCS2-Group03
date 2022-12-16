Tiếp tục là series về các bài writeups hackthebox mà mình làm được. Vì 2 bài này thuộc loại dễ và ngắn nên mình quyết định sẽ gộp chung vào 1 bài luôn.
## A. Tabby
### I. Thông tin chung về box

![](https://images.viblo.asia/c688647f-e3b7-45cb-b771-247ba5fe5210.png)

![](https://images.viblo.asia/9d875130-d69f-437e-80b7-90a4d871d9c7.png)




### II. Reconnaissance
#### 1. Quét dịch vụ với nmap

![](https://images.viblo.asia/65b7b892-0ebd-4c43-a3a7-be222a0e74e1.png)


#### 2. User Flag
##### Khai thác lỗ hổng "Path traversal" tại cổng 80
Khi tới cổng web 80, chúng ta có thể thấy một trang megahosting và rất nhiều request được gửi tới 1 tên miền megahosting.htb. 

![](https://images.viblo.asia/3455bc88-e1a3-4e78-8a5c-5b9df631e0ef.png)


Sau khi thêm tên miền trên và địa chỉ của box vào file */etc/hosts*, chúng ta có thể sử dụng các dịch vụ của trang web. Ở phần news, mình để ý tới 1 pattern **file=statement** rất dễ có lỗi path traversal. Thế là thử tiêm một payload đơn giản như là  **../../../../../../../../../etc/passwd**, thì quả nhiên là có lỗ hổng này.

![](https://images.viblo.asia/49a8ea06-54b4-4e74-9e50-f5433f7ac6d2.png)

Tiếp đó, tại web cổng 8080, chúng ta có thể đọc được cấu hình đường dẫn của server tomcat:
 
 ![](https://images.viblo.asia/b708f544-d46b-4290-8a50-c1816a6ac0d5.png)


Dựa vào đó, ta có thể đọc được file *tomcat_users.txt*, chúng ta có thể có được tài khoản manager với quyền manager script

![](https://images.viblo.asia/f0ec90c4-097b-4d4e-bf5b-5809749ae222.png)

##### Khai thác quyền manager script của tomcat
Quyền manager script của tomcat cho phép người dùng sử dụng các lệnh tại /manager/text:

![](https://images.viblo.asia/93ae8160-54eb-48d5-bdd1-e4706ed7cc68.png)

Trong số các lệnh có thể dùng, lệnh nguy hiểm nhất có thể khai thác là *deploy*. Lệnh này cho phép manager có thể deploy file lên server. Thế nên giờ chúng ta có thể tạo một file war shell và deploy lên để lấy được reverse shell

![](https://images.viblo.asia/498d47fc-3e90-4c01-86c6-54fc5f5ba366.png)

![](https://images.viblo.asia/3e9b43b5-c9da-4f9c-ad78-373d1814420d.png)

![](https://images.viblo.asia/b343fe19-fa48-44a1-85cb-ea7ef59edffa.png)

##### Lấy thông tin đăng nhập tài khoản user
Sau khi có shell, lục lọi trong box này mình tìm được 1 file tên backup khả nghi là

![](https://images.viblo.asia/26c6e997-e553-4042-bf57-0c34bfcdad49.png)

Tải file này xuống tại  http://10.10.10.194/files/16162020_backup.zip 

![](https://images.viblo.asia/18d7c973-8d3a-4e0a-91ff-67ed27efe4d6.png)

Sau đó bruteforce mật khẩu file này :

![](https://images.viblo.asia/8777ca5b-0690-4e2a-a9d5-8ec25d18c1cf.png)

Tuy nhiên trong thư mục giải nén ra không có gì khai thác được. Thông thường, người dùng sẽ dùng chung một mật khẩu ở nhiều nơi khác nhau, nên thử dùng mật khẩu này đăng nhập vào tài khoản ash:

![](https://images.viblo.asia/07b15bf8-19f4-4c3a-bf86-9e981f8f3e26.png)

Thế là ta có user flag

![](https://images.viblo.asia/2afba257-e868-43c2-9a0a-4da2654897f2.png)

##### Root Flag

User ash thuộc group lxd. Lxd tồn tại 1 lỗ hổng cho phép leo quyền. Có thể xem cách khai thác trong  [bài viết hackingarticle](https://www.hackingarticles.in/lxd-privilege-escalation/).

Sau khi follow theo bài trên, mình đã mount được 1 image lên target:

![](https://images.viblo.asia/ddf1ceed-43c7-47d6-99bc-316b03bb2c02.png)

Giờ sử dụng image đó và lấy root thôi.

![](https://images.viblo.asia/57df386b-1a2e-4b94-996f-3ffe60ecba8e.png)


## B. Doctors
### I. Thông tin chung về box

![](https://images.viblo.asia/963117b6-4dea-4827-9a5d-92f1f0c72d89.png)

![](https://images.viblo.asia/62be70aa-4011-4bbb-bb53-20275df607f7.png)

### II. Reconnaissance

![](https://images.viblo.asia/b1207840-d1f3-402a-a56b-4ca1da9b538f.png)


### III. User Flag
Đầu tiên là truy cập vào cổng web 80 của machine. Ở đây, chú ý email *info@doctors.htb*, thử truy cập tới machine theo domain name (doctors.htb) thì ta sẽ nhận được 1 trang đăng nhập

![](https://images.viblo.asia/e4cbcfce-84eb-4223-9038-cbd85372b474.png)


Sau khi tạo tài khoản và đăng nhập vào hệ thống, ta sẽ có 1 trang và có phần tạo message như hình

![](https://images.viblo.asia/153e7f8d-25d4-4af9-9c3c-b8f66977f434.png)


Chú ý trong source html của trang web có 1 phần comment:

![](https://images.viblo.asia/c776a330-5d74-40f3-bf15-31acad151675.png)


Tại đường dẫn /archive, trang web sẽ render lại title của message. Thử vài loại payload thì ta sẽ thấy trang này có lỗi Server Side Template Injection.

![](https://images.viblo.asia/3503b4a8-954b-45cf-aa84-acce98fbc14d.png)

![](https://images.viblo.asia/a57f5b75-426f-40ed-bee5-8f7a4570571e.png)

Giờ thì sử dụng lỗi này để lên shell thôi

![](https://images.viblo.asia/2b1c0752-6b19-42ad-b94e-3110de27d26b.png)

![](https://images.viblo.asia/50750452-1124-4f74-b976-0e60ae655370.png)

Sau khi lục lọi trong machine chán chê thì trong /var/log có 1 file backup đáng ngờ. Đọc file này sẽ thấy 1 request reset password duy nhất với email Guitar123.



### IV. Root Flag
Thử dùng luôn email đó làm password cho người dùng shaun thì được luôn :)))). Tiếp theo, sau 1 hồi tìm kiếm thì tài khoản này không có gì đặc sắc lắm. Tuy nhiên trong các tiến trình đang chạy thì có 1 dịch vụ khá đáng chú ý (cổng 8089).

![](https://images.viblo.asia/bb499878-395f-4987-b144-63c864b13730.png)

Splunk forwarder có 1 lỗ hổng cho phép người dùng leo quyền nếu cấu hình không đúng. Ở đây, ta có thể sử dụng công cụ SplunkWhisperer2 để khai thác lỗ hổng này

![](https://images.viblo.asia/a0c1cfe5-de4b-4041-b643-bc249b3b2e7d.png)

![](https://images.viblo.asia/f7665e75-5979-4c55-8592-01c4a366ce23.png)