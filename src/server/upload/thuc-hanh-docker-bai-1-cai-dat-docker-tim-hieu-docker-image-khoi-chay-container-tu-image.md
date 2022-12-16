Xin chào mọi người, bài viết này mình xin giới thiệu và hướng dẫn thực hành căn bản về cài đặt docker, tìm hiểu image và khởi chạy container từ image.
Các bạn có thể đọc qua các khái niệm cơ bản từ các bài khác, ở đây mình bắt tay vào thực  hành luôn.
# Cài Docker trên ubuntu
Vì phần cái đặt cũng không có nhiều điều để nói các bạn cứ chạy các lệnh như bên dưới là được
```
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
```
như vậy là đã cài xong rồi, bạn có  thể xem trạng thái docker bằng lệnh
```
sudo systemctl status docker
```
![](https://images.viblo.asia/218502c1-b099-4f65-be19-796e334fa7e9.png)
Hoặc xem version và info bằng lệnh
```
docker --version
docker info
```
![](https://images.viblo.asia/157e87a4-583e-496a-acb3-6f5c00898dab.png)
Cơ bản là xong phần cài đặt rồi, giờ chuyển sang phần tìm hiểu image nào
# Tìm hiểu về image
Khái niệm: Image trong docker là những phần mềm được đóng gói và quản lý bởi docker 

* ví dụ: 

    image đóng gói hệ điều hành ubuntu => ta có image ubuntu

    image đóng gói hệ quản trị cơ sở dữ liệu mysql => ta có image mysql

* Các image chỉ có thể đọc, không thể sửa đổi

    Khi image được docker khởi chạy thì các phiên bản thực thi của các image được gọi là các container, các container có thể ghi các dữ liệu vào trong đó.
*   Để có các container chạy các ứng dung thì ta cần có các image trước.
*   Để kiểm tra xem docker đang có các image nào thì ta chạy lệnh “docker images”
![](https://images.viblo.asia/4da2a34e-780a-4ba3-89e1-36bcc7bb0d4b.png)

Cột repository là tên image, cột tag là phiên bản, phiên bản latest là phiên bàn cuối
    
Những image này được lấy từ kho chứa docker hub : https://hub.docker.com/

có thể tìm kiếm các image có trên hub bằng lệnh `docker search name_image`
* Tải image từ docker Hub

Tải image về bằng lệnh
`docker pull name_image:tag`

ví dụ cần tải image ubuntu phiên bản 16.04

dùng lệnh:  `docker pull ubuntu:16.04`


kiểm tra: docker images sẽ thấy image ubuntu

* xóa image bằng lệnh

`docker image rm ubuntu:16.04`

hoặc xóa theo ID image

`docker image rm id_image`


# Chạy một container
ví dụ: chạy container từ image ubuntu

`docker run -it ubuntu:latest `

-it là tham số, ở đây tham số i có nghĩa là container có thể nhận tương tác, tham số t là có thể kết nối với terminal

ubuntu:lastest : là images ta dùng để tạo ra container

sau khi chạy lệnh `docker run -it ubuntu:latest` terminal của ta đã chuyển đến container được tạo từ image ubuntu với tài khoản root

![](https://images.viblo.asia/c40f3107-3345-41ff-b680-6cff81b8ca9c.png)

Kiêm tra thông tin container ubuntu này bằng lệnh
`cat /etc/*release`

![](https://images.viblo.asia/cd41ae0c-b302-44df-b0a2-ee13d6a36954.png)

* Ta mở một terminal khác để kiểm tra xem docker đang có những container nào đang chạy

![](https://images.viblo.asia/e0da3f7b-9c8c-49b5-b0e7-322dfbab459f.png)

ta thấy container ubuntu mới tạo ở trên đang chạy:
thông tin trên cho ta thấy container có Id 0a46... được tạo ra từ image ubuntu:latest 

* Quay lại với terminal trong container ta thử thoát container này ra bằng lệnh `exit`

![](https://images.viblo.asia/d63f1afc-8f72-44f4-88b3-f2064c269501.png)

như vậy ta đã tắt container vừa tạo và trở về terminal trên máy hiện tại, dùng lệnh ` docker ps` để kiểm tra nhưng container đang chạy sẽ không còn thấy container vừa tạo nữa.

để khởi chạy lại container đó thì trước hết ta dùng lệnh `docker ps -a` để xem tất cả các container đang dừng

![](https://images.viblo.asia/f89a9b88-4cbb-43c5-9b3a-f45f581e984e.png)

Có thể khởi chạy lại container bằng lệnh

`docker start id_container`

! id_container ta có thể viết vài ký tự đầu đủ để phân biệt với các id khác là được.
sau đó chạy lệnh `docker ps` để xem các container đang chạy

![](https://images.viblo.asia/6d0e11c6-f9d9-4079-8b23-9d35294dc492.png)

* để quay lại dòng lệnh của container ta đang chạy ta dùng lệnh
docker attach id_container

# Kết bài
Trên đây là khái niệm cơ bản về image, cách khởi tạo container, bài sau chúng ta sẽ tìm hiểu thêm những kiến thức khác về docker. Cảm ơn mn