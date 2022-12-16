Chuyện là nếu bạn bị lỗi khi cài đặt môi trường thì lời khuyên của 500 anh em thân thiết sẽ luôn là:
1. Reset lại máy
2. Cài lại ubuntu
3. Mua máy mới

Nhưng nay khác xưa rồi , anh em troll nhau như vậy là không được nhé. Hãy cùng tìm hiểu docker để có cách thứ 0 cho 500 anh em lố mắt nào!!! :D
![](https://images.viblo.asia/f9e95ae1-9d3a-435f-9e65-39c26f333d28.png)
### 1. Phân biệt containers và virtual machines
* **1. Virtual machines:**

Chắc các bạn cũng không lạ gì VMWare hay Virtual Box,... đó là máy ảo giúp bạn deploy ứng dụng trên nhiều hệ điều hành cùng một lúc. Nhưng máy ảo có 2 vấn đề:
   1. Bạn cần phải chia một phần tài nguyên phần cứng của hệ điều hành hiện tại cho hệ điều hành ảo. Điều này sẽ làm tiêu tốn kha khá tài nguyên của hệ điều hành chủ (host system).  
    2. Bạn sẽ mất thời gian để khởi động hệ điều hành ảo
* **2. Containers**

Để khắc phục nhược điểm của visualization thì containerlization ra đời. Ở đây, containerlization sẽ không ảo hóa phần cứng mà chỉ ảo hóa môi trường ứng dụng trong các container. Và các container vẫn chạy chung hệ điều hành ở phía dưới, chung kernel, vì vậy không phải chia sẻ tài nguyên phần cứng.

Thuật ngữ "Container" ở đây được hiểu là khái niệm đóng gói. Một Container chứa đầy đủ application và tất các các thành phần phụ thuộc như: các file Bins, các thư viện kèm theo để đảm bảo các ứng dụng có thể chạy độc lập trong container đó. Như vậy mỗi Container ở đây được coi như một "máy ảo" mini.

Nói chung là sử dụng container sẽ cho hiệu năng cao hơn và tiêu tốn ít tài nguyên hơn nên nó được ưa chuộng hơn. Và đây cũng là lý do tại sao bạn nên tìm hiểu và sử dụng Docker ngay và luôn đó ;)

### 2. Docker là gì?
Docker là một nền tảng để triển khai, đóng gọi và chạy các ứng dụng trong các container.
Điều này giúp bạn có thể đóng gói các môi trường lập trình gọn gàng hơn, dễ quản lý hơn. Nhờ vậy bạn dễ dàng kiểm soát từng môi trường lập trình (container) cho mỗi ứng dụng của bạn.

Có một ví dụ rất đơn giản như này:

Nếu coi máy tính của chúng ta lúc mới cài hệ điều hành là một căn phòng trống:

![](https://images.viblo.asia/1eee70ce-1319-415a-8cc2-e8038b2038b5.jpg)

thì sau khi chúng ta cài đặt các app, package,... thì nó sẽ trông như vầy - vô cùng bừa bộn:

![](https://images.viblo.asia/22bd8eef-37d6-41b1-97fe-89098a61f640.jpg)

Nhưng nếu có Docker thì căn phòng của bạn sẽ không bừa bộn như thế đâu:
![](https://images.viblo.asia/094bda8d-9661-4a4c-b5c6-6d557919e3da.jpg)

Khi đó việc cài đặt, gỡ bỏ cũng như đồng bộ môi trường ứng dụng sẽ dễ dàng hơn, nhất là khi bạn làm việc theo nhóm.

### 3. Một số khái niệm cần biết
- Image: là một gói thực thi bao gồm mọi thứ cần thiết để chạy một ứng dụng (code, a runtime, libraries, environment variables, và configuration files).
- Container: là một instance của image khi image được thực thi.

Bạn sẽ nắm rõ hơn các khái niệm này khi thực hành sử dụng chúng.

### 4. Hướng dẫn cài đặt
1. Update package
```php
sudo apt-get update
```
2. Cài đặt các gói cho phép apt sử dụng giao thức HTTPS.
```php
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```
3. Thêm docker vào GPG key:
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
4. Thêm docker vào kho APT source:
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
5. Update lại package trên máy:
```
sudo apt-get update
```
6. Cài đặt docker phiên bản mới nhất:
```
sudo apt-get install docker-ce
```
>> Docker CE (Docker Community Edition) là phiên bản miễn phí dành cho cá nhân, hoặc các team nhỏ. <br>
>> Docker EE (Docker Enterprise Edition) là phiên bản trả phí dành cho các doanh nghiệp được cung cấp thêm một số tính năng hơn. <br>

Kiểm tra phiên bản đã cài đặt, chạy lệnh:
```
docker -v
```
Giờ thì chạy thử nào:
```
sudo docker run hello-world
```
Nếu kết quả là
![](https://images.viblo.asia/ae6eac53-905f-4f0b-8cb0-986aa365a905.png)
thì bạn đã cài đặt docker thành công.
### 5. Demo
Ví dụ, mình muốn chạy một project laravel 
1. Search image cần tìm trên docker hub
```
sudo docker search <nội dung tìm kiếm>
```
Ví dụ:
```
sudo docker search apache-php
```
Kết quả sẽ là:
![](https://images.viblo.asia/a902d8c0-0251-4e6d-92d9-dac93161cb63.png)
>> Docker Hub là nơi để mọi người upload, chia sẽ các images Docker của mình
2. Chọn image bạn cần và download

Ở đây mình sẽ download [tutum/apache-php](https://hub.docker.com/r/tutum/apache-php/) và [mysql](https://hub.docker.com/_/mysql/)
```
sudo docker pull tutum/apache-php
docker pull mysql
```
Kiểm tra image đã pull về bằng lệnh:
```
docker images
```
3.  Clone project từ repo về máy:
Mình sẽ clone một project laravel về máy:
```
git clone https://github.com/HaiHaChan/blog.git ~/Documents/blog
```
4. Tạo môi trường liên kết với thư mục vừa clone về
```
docker run -tid -p 9000:80 -v ~/Documents/blog:/var/www/html tutum/apache-php
```
Trong đó, 
* **docker run** : lệnh tạo một container cho Docker
* tham số **-v  ~/Documents/blog:/var/www/html** để liên kết thư mục ~/Documents/blog ở máy tính hiện tại, vào thư mục /var/www/html của container.
* tham số **-p 9000:80** để map dịch vụ mạng port 80 trong container đến port 9000.
Bây giờ thì truy cập [http://127.0.0.1:9000/](http://127.0.0.1:9000/) và xem kết quả nào:
![](https://images.viblo.asia/a5d6fa31-8a0d-4a77-8d7c-cbe7151c1498.png)

### 6. Một số lệnh docker khác:
* Liệt kê containers:
    - đang chạy: `sudo docker ps`
    - tất cả (đang chạy và đã tắt): `sudo docker ps -a`
* Khởi động và truy cập một container đã tắt:
```
docker start <ID hoặc NAME>
docker exec -it <ID hoặc NAME> /bin/bash
```
* Dừng một container:
```
docker stop <ID hoặc NAME>
```
* Xóa một container:
```
docker rm <ID hoặc NAME>
```
Xóa container đang chạy thì bạn thêm option `-f`
```
docker rm -f <ID hoặc NAME>
```
* Xóa một image:
```
docker rmi <ID hoặc NAME>
```
Xóa image đang chạy thì bạn thêm option `-f`
```
docker rmi -f <ID hoặc NAME>
```
### 7. Tài liệu tham khảo:
https://docs.docker.com/get-started/

http://namluu.com/backend/lac-hau-neu-chua-su-dung-docker/

https://toidicode.com/cai-dat-docker-385.html

https://viblo.asia/p/docker-va-nhung-kien-thuc-co-ban-YWOZrp075Q0

https://kipalog.com/posts/Toi-da-dung-Docker-nhu-the-nao

https://viblo.asia/p/docker-doi-voi-lap-trinh-vien-web-PDOkqLAKejx

Trên đây là một số nội dung mà mình đã tìm hiểu được. Vì mình mới tìm hiểu nên cũng không tránh khỏi có sai sót. Mong được mọi người góp ý (ahihi)!