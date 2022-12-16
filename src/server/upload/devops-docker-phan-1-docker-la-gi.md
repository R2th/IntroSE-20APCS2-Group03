# Mình đang tìm hiểu để có thể trở thành một Devops Engineer. Mọi người cùng theo chân mình xem mình đang và đã học những nhiều gì để có thể trở thành một Devops Engineer nha.
## Trong toàn bộ series về Docker mình sẽ tập trung làm rõ và chia ra thành 7 phần lớn như sau:
**1. Cái nhìn chung về Docker**\
**2. Hoạt động của Container**\
**3. Docker Network**\
**4. Docker Image**\
**5. Docker Volume**\
**6. Docker Compose**\
**7. Docker Swarm**

## Đây là phần 1 mình sẽ giới thiệu chung về Docker
### I. Docker là gì?
Docker đã tạo nên một cuộc cách mạng cho công nghệ ảo hóa và Docker là một dự án mã nguồn mở trên Github.

Docker cũng có thể được hiểu là tên công ty được tạo ra Docker (tên cũ là dotCloud cung cấp dịch vụ đám mây nhưng hiện tại tập trung vào container). Mọi người có thể vào trang chủ của Docker là docker.com

Docker có thể tạo ra các container cho các ứng dụng phần mềm.

Docker được viết bằng ngôn ngữ Go.

Docker quản lý các đặc tính của kernel (nhân linux)
* "cgoup": nhóm các tiến trình trong 1 không gian ảo riêng, nên các container không ảnh hưởng tới nhau
* "namespace": chia tách các tầng network khác nhau để nhóm các container có chung dải mạng với nhau, có thể tạo ra nhiều dải mạng như thế
* "copy and write": định nghĩa một image

Docker đơn giản hóa cho script cho hệ thống phân tán.

### II. Khẩu quyết của Docker
**2.1. Build, ship and deploy any application, anywhere**
* Build: đóng gói ứng dụng trong một container
* Ship: vận chuyển container
* Deploy: triển khai, chạy container
* Bất cứ ứng dụng nào chạy trên Linux
* Bất kỳ thiết bị nào: laptop, máy chủ, máy ảo, cloud instance ...

**2.2. Batteries included but replaceable**
* Một component có thể thay thế bằng các implement cùng một interface có sẵn
* Docker framework được chia thành các module có khả năng mở rộng cao

### III. Lợi ích
* Tính đóng gói ứng dụng dễ dàng 
* Deploy nhanh chóng
* Không cần cấu hình và cài đặt môi trường trước
* Tránh conflict môi trường triển khai hoặc khi thay đổi môi trường
* Chụp ảnh snapshoot: có thể lưu trạng thái, gắn tag cho một container hay tạo một container mới bằng container đã snapshoot trước đó
* Kiểm soát sử dụng tài nguyên phần cứng như memory, CPU, bộ nhớ, ...
* Đơn giản hóa sự phụ thuộc giữa các ứng dụng: mỗi ứng dụng sẽ sử dụng một dockerfile riêng 
* Thuận tiện cho việc chia sẻ sử dụng docker hub hoặc sử dụng dockerfile cùng image được cung cấp để sử dụng

### IV. Cách kết nối để sử dụng docker
Docker gồm 2 thành phần: client and server

**4.1. Client và server chạy trên cùng 1 host**

Docker server nhận lệnh qua socket nếu client và server chạy trên cùng 1 host
![image.png](https://images.viblo.asia/32b0627f-8d5c-4868-add8-dac242bd7953.png)
**4.2. Client chạy trong container**
![image.png](https://images.viblo.asia/8d74a186-f1bc-4f4a-a1d8-d2c5c49d130a.png)

### V. Kiến trúc docker
![image.png](https://images.viblo.asia/1df33f52-8fef-4c96-b281-d904a3e715fd.png)
Docker gồm 3 thành phần chính: Client, Host, Registry (Hub)

**Docker client**\
Docker client kết nối tới docker host qua CLI hoặc REST API. Docker client có thể tồn tại trên cùng host hoặc bất cứ host nào.

**Docker host**\
Docker host chứa docker deamon và container. Docker deamon chịu trách nhiệm quản lý vào thao tác với các container theo quy trình sau **docker client ==> docker deamon ==> container**\
Nhiều container kết hợp với nhau có thể tạo ra kiến trúc đa tầng. Và một chú ý quan trọng là khi đóng container mà chưa commit thì mọi thay đổi sẽ bị xóa

**Docker Registry (Hub)**\
Image là hạt nhân cơ bản trong docker. Và sử dụng các image để tạo ra các container mong muốn.\
Docker Registry là nơi tập hợp và lưu trữ các image có thể là public hoặc private.

### VI. Cài đặt Docker
Chia ra làm 2 loại: máy đạt yêu cầu theo khuyến nghị trên trang chủ docker và máy không đạt yêu cầu 
với các máy không đạt yêu cầu muốn cài đặt docker, với các máy không đạt yêu cầu thì sẽ sử dụng docker toolbox, thường là các máy windows hoặc MacOS đời quá cũ.

Docker toolbox bao gồm các thành phần đầy đủ để các máy không đạt yêu cầu có thể sử dụng docker như: docker machine, docker engine, docker compose, kiematic, shell, oracle virtualbox.

Trong bài viết này mình sẽ tập trung vào hướng dẫn cài đặt docker trên các máy tiêu chuẩn. Với các máy đạt yêu cầu phân biệt được bản cài docker desktop và docker engine tùy theo như cầu sử dụng của người dùng.

Hướng dẫn cụ thể cài docker engine trên ubuntu 20.04 theo hướng dẫn trên trang chủ Docker https://docs.docker.com/engine/install/ubuntu/

**Bước 1: Kiểm tra version hệ điều hành có đáp ứng 4 version phía dưới**
* Ubuntu Jammy 22.04 (LTS)
* Ubuntu Impish 21.10
* Ubuntu Focal 20.04 (LTS)
* Ubuntu Bionic 18.04 (LTS)

`lsb_release -a`                
![image.png](https://images.viblo.asia/340a8563-10b6-4d29-a6a5-472ee73c80b5.png)

**Bước 2: Update**

`sudo apt-get update`

**Bước 3: Cho phép chương trình quản lý cài đặt các gói bảo mật**

`sudo apt-get -y install ca-certificates curl gnupg lsb-release apt-transport-https`

**Bước 4: Cho phép tin tưởng các ứng dụng đăng ký bởi docker**

` sudo mkdir -p /etc/apt/keyrings`

` curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`

**Bước 5: Cấu hình để tải Docker**
    
`echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`

**Bước 6: Cập nhật lại thư viện tải gói tin**
  
`  sudo apt-get update`
  ![image.png](https://images.viblo.asia/4a69b39e-e05e-4289-bf25-d594cf3c4f5e.png)
`  sudo chmod a+r /etc/apt/keyrings/docker.gpg`
  
**Bước 7: Cài đặt Docker**

  `sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-compose-plugin`

**Bước 8: Kiểm tra**

`  sudo docker run hello-world`
  ![image.png](https://images.viblo.asia/29eca631-7ff7-477d-a0aa-dbecaaf69a32.png)
  
**Bước 9: Thêm user vào group docker**

Mỗi khi chạy lệnh liên quan đến Docker chúng ta thường phải thêm lệnh sudo khá bất tiện. Thay vào đó bạn có thể thêm user hiện tại vào group docker để sử dụng docker mà không cần thêm sudo.\
`sudo usermod -aG docker daihv`

Logout và login lại user để nhận lại chính sách mới rồi thử lại lệnh docker mà không cần dùng sudo\
`gnome-session-quit --no-prompt`      
![image.png](https://images.viblo.asia/76be3bc7-52bd-4af9-b122-79654d7dd346.png)
  
***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Mình xin cám ơn.***