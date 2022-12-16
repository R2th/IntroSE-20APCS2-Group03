### Giới thiệu
Trong phần trước mình đã giới thiệu về CI/CD, lợi ích của nó. Nếu bạn chưa đọc có thể đọc tại đây :D <br>
Mình cũng đã giới thiệu và hướng dẫn cài đặt Jenkins. Phần này mình sẽ hướng dẫn các bạn sử dụng Jenkins để tự động auto deploy code khi có code mới nhất được merged.
### Thực hành

Đầu tiên ta sẽ tạo 1 con server nữa để chạy code của chúng ta.

Cài web server với nginx, php

và chạy thử xem đã cài xong chưa:

```
http://ip

```
![](https://images.viblo.asia/909afc88-f4af-48bc-b131-1806ea27d987.png)

Vậy là đã cài xong web server.

- Tiếp theo chúng ta sẽ tạo 1 user với 1 group  để chuyên phục vụ cho việc deploy
```js
    //create user
    adduser www-user
    // create group
    addgroup nginx
```

- Chúng ta sẽ tạo một thư mục quản lý code cần chạy và add user đó vào group đó:
```bash
    // Di chuyển đến thư mục webserver default
    cd /var/www/html
    //tạo thư mục chứa code
    mkdir sun
    //add quyền cho user của chúng ta vừa tạo có quyền truy cập
    chown -Rf www-user:nginx sun
```

- Cấu hình nginx trỏ vào thư mục chứa code của chúng ta:
```js
    vi /etc/nginx/sites-available/default
```

- Sửa lại thư mục root của chúng ta sẽ trỏ vào thư mục chứa code:
```
    root /var/www/html/sun;
```
- Khi sửa xong chúng ta sẽ cần check lại xem cú pháp của chúng ta đúng chưa:

```
    nginx -t
```
-  Restart lại web server:

```
service nginx restart
```
- Tiếp theo sẽ tạo ssh key để cho con jenkins sử dụng ssh key này để đăng nhập vào github và clone, pull code về.
Trước tiên sẽ đăng nhập vào tài khoản chúng ta vừa tạo www-user:
```
sudo su - www-user
```
- Và generate ssh key:
```
ssh-keygen -t rsa
```
Sẽ xuất hiện một vài thông tin cho chúng ta nhập nhưng chúng ta ko cần nhập gì cả. Vì khi nhập thì jenkins sẽ không thể nhập được như vậy được và không thể deploy code. :D
 Cứ Enter thôi nhé :D
 
![](https://images.viblo.asia/30e3e068-cdb7-48ab-89ce-404b9165f565.png)

- Sau khi tạo xong ssh key nó sẽ như này. 

Các bạn thử vào clone xem được chưa nhé:
```js
cd /var/www/html/sun
// Mình sẽ thử clone repo này của mình
git clone git@github.com:loind-1875/viblo.git
```
![](https://images.viblo.asia/a0f2d113-01ab-470f-be41-f06693d7f421.png)

- Bước tiếp theo chúng ta sẽ tạo webhook trên github: <br>
Chúng ta vào repository cần deploy code và chọn setting

![](https://images.viblo.asia/95c411c1-e112-4cac-8136-b65d5f68af1b.png)
Chúng ta sẽ cần sửa một vài thông tin như sau
   - payload URL: là url Jenkin + `github-webhook/`
   - Content type: Là loại content mà github sẽ gửi về Jenkins
   - Secret: là password. Bạn nhập gì để khỏi bị hack nha :D
   
![](https://images.viblo.asia/97f5d6e5-544d-4e8c-bf3b-555ad13a229e.png)
Vậy là xong.
- Quay trở lại Jenkins và tạo 1 new item:![](https://images.viblo.asia/14ebd9b6-1f57-47ea-ba14-aea3ba888bc4.png)
Mình tạo 1 item mới như thế này <br>
Sau đó chúng ta sẽ chọn phần Source Code và cấu hình git.
   - Nhập repository của chúng ta:
![](https://images.viblo.asia/7d1c723e-16ea-4365-979c-1770969e730c.png)
   - Phần credential chúng ta add tài khoản github của chúng ta:
   - ![](https://images.viblo.asia/fa287ba4-9776-4f06-9ae7-e1e6ef5378bd.png)
- Phần branch to build thì các bạn để nhánh các bạn cần build nhé.
- Tiếp theo phần trigger các bạn để GitHub hook trigger for GITScm polling nhé. Phần này sẽ tạo ra trigger webhook cho chúng ta khi có code đc merged.
- ![](https://images.viblo.asia/1a9e38b5-3f9b-47e2-952c-47e1e90a5b3a.png)
- Đến phần build các bạn chọn execute shell như sau:
- ![](https://images.viblo.asia/d191c22b-1423-4ba6-840c-818c16f00e1b.png)
Phần này chúng ta sẽ nhâp những command mà chúng ta cần chạy:
Ví dụ của mình sẽ như sau:

```
#!bin/bash
- ssh đến server
- cd /var/www/html/viblo
- git pull origin master
```
ví dụ đơn giản vậy nhé. Còn với các bạn sử dụng nodejs hay laravel ... thì tương ứng với các câu của bạn nữa nhé,
Và gần cuối cùng chúng ta chọn Build now xem hoạt động chưa nhé:
![](https://images.viblo.asia/1dcebf7d-bbca-4e04-ad48-ec0ad69dc446.png)
Ok. Khi console output ra màu xanh như này là thành công nhé.
- Và Thử sửa code và push lên github xem sao nào :D