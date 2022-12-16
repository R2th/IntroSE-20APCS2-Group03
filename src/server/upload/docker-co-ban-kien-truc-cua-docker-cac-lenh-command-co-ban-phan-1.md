## 1. Vì sao chúng ta cần Docker?

![](https://images.viblo.asia/86f699f3-bd01-4faa-9181-84b2eb69a2f7.png)

**- Traditional Deployment:**
Ngày xưa, cách cơ bản nhất để triển khai ứng dụng, ta có 1 máy chủ vật lý, đã được cài đặt hệ điều hành, chúng ta deploy các ứng dụng vào đây. Việc triển khai như vậy có thể dẫn đến một vấn đề đó chính là ví dụ app 1 chiếm và sử dụng nhiều tài nguyên thì có thể ảnh hưởng đến performance của cả app 2 và app 3.

**- Virtualized Deployment:**
Chính vì vậy, nên người ta mới nghĩ ra một cách, cô lập các app này, người ta đã triển khai theo mô hình ảo hóa.
Phía trên của hệ điều hành được cài đặt các máy ảo. Các máy ảo này sẽ có hệ điều hành độc lập của riêng nó, độc lập so với HĐH của máy host, và ta sẽ deploy các ứng dụng vào những máy ảo này. Tuy nhiên, khi sử dụng các máy ảo này, chúng sử dụng HĐH độc lập, vì vậy rất là nặng nề và chiếm nhiều tài nguyên. 

**- Container Deployment:**
Thế nên, sau này mới có cách triển khai ứng dụng dưới dạng container, trên tầng HĐH người ta có tầng Container Runtime, giúp các bạn triển khai container, các container này nó không phải là một máy ảo, chúng không có HĐH, và chúng sử dụng chung HĐH với máy host. Như vậy, các container được coi rất là nhẹ, chúng ta dễ dàng tích hợp vào việc đó là triển khai các ứng dụng tự động.

### Vậy Docker là gì?
- Là một platform giúp triển khai ứng dụng dưới dạng container.
- Giúp cài đặt mọi thứ cần thiết cho ứng dụng của bạn.
- Khi join 1 dự án có các công nghệ cũ thì docker giúp cài đặt các công nghệ cũ mà không gặp khó khăn.

### Cài đặt Docker
- https://docs.docker.com/get-docker/
- Bạn cài đặt theo HĐH mình đang dùng nhé.

## 2. Kiến trúc của Docker?
### Kiến trúc hoạt động
![](https://images.viblo.asia/764ae11c-c2c3-4de4-bea1-794f4d9669e3.png)
- Docker hoạt động theo kiến trúc Client - server
- Server của docker là docker deamon, docker deamon sẽ public ra các API để client thông qua command line giao tiếp với server.
- Server tạo và quản lý các objects trong Docker: **images**, **containers**, networks, and volumes.

### Các object cơ bản
***Tóm tắt:***
- **images**: đóng gói các tài nguyên cần thiết cho dự án
- **container**: sinh ra khi chạy các images
- **volume**: duy trì trạng thái dữ liệu của container
- **network**: duy trì trạng thái dữ liệu của container
<br><br>

***Chi tiết:*** là phần mình có các lệnh thực hành kèm theo nha!
- **images**: đóng gói các tài nguyên cần thiết cho dự án
```
docker images
```
Kết quả khi chạy ở máy mình
![](https://images.viblo.asia/635c9af1-3dc0-4280-aaa7-092655194408.png)
Có thể thấy mysql 5.5 đã được cài ở docker và đóng gói lại, public ra để mọi người có thể tải về và sử dụng.

- **container**: sinh ra khi chạy các images
```
docker container ls
```
có nghĩa là mình bảo docker demon trả về các container đang chạy trong máy mình
![](https://images.viblo.asia/ccb77fe4-c539-4635-90b8-ff8aefb524a2.png)

```
docker run -it --name mysql -p 3307:3306 -d mysql
```
- **docker run**: là yêu cầu khởi chạy 1 image.
- **--name mysql**: container name khi được khởi tạo ra sẽ có tên mysql.
- **-p 3307:3306**: mapping port 3307 của máy host với port 3306 của container được sinh ra.
- **-d**: --detach yêu cầu chạy container dưới dạng ngầm
- **mysql**: image mysql

Ví dụ kết quả hiển thị như sau:
![](https://images.viblo.asia/25174fa8-734f-4ae3-8995-f4ecdb39f69f.png)

- **volume**: duy trì trạng thái dữ liệu của container
Ví dụ nếu bạn stop và remove image, (*docker stop mysql && docker rm mysql*)
và chạy lại image, ta thấy id thay đổi, và cả dữ liệu DB trong mysql cũng biến mất
Như vậy chúng ta có thể duy trì được dữ liệu đã được tạo trong container hay không?

Chúng ta sẽ sử dụng volume như sau: (đã stop và remove image)

-> Bước 1: mkdir test

-> Bước 2: 
```
docker run -it --name mysql -p 3307:3306 -d -v $(pwd)/test:/data/db mysql
```
Thêm options -v và mount dữ liệu sang thư mục test/data/db

-> Bước 3: Tạo DB và lặp lại thao tác xóa

-> Bước 4: run lại image ở bước 2 và kiểm tra DB còn tồn tại hem nha :D

Bạn hãy thử kiểm tra xem folder test có gì
=> Bản chất là nó mount data từ  folder /test ở máy host vào /data/db.

- **network**: giao tiếp các container với nhau

Các container có thể giao tiếp với nhau thông qua network. Có thể ping từ container này sang container kia.
```
docker network ls
```
show ra các network trong máy của mình
<br><br>

```
docker network create network_1
```
tạo ra 1 docker network
<br><br>

```
docker run -it -d --name mysql --network network_1 mysql
```
thêm option --network
<br><br>

```
docker run -it -d --name alpine --network network_1 alpine sh
```
alpine là image thường đc sử dụng trong docker<br><br>
```
docker exec -it alpine sh
```
```
ping mysql
```
để kiểm tra alpine connect đc đến mysql

Đây là KQ khi mình ping tới mongo
![](https://images.viblo.asia/0146b480-5eb1-4223-be22-565a9784aaca.png)

Ngoài ra, còn khái niệm ***registry*** : lưu trữ các image
như Docker Hub, AWS lưu trữ các ***image***

## 3. Các lệnh command cơ bản?
```
docker image
```
show ra các lệnh với docker image 
![](https://images.viblo.asia/2e9cc931-86fb-4de0-aabe-2156f40db5c4.png)
<br><br>

```
docker history mysql
```
chúng ta sẽ nhìn thấy đc cái lịch sử của image từ khí nó thực hiện đóng gói ra sao (đi từ dưới lên)
command cuối cùng thường gắn với đuôi -d, ví dụ [mysqld] là command start 1 server mysql.
<br><br>

```
docker inspect mysql
```
xem thông tin chi tiết về các image<br><br>
```
docker image ls
```
cũng giống như 
```
docker images
```
hiển thị các images đang có <br><br>

```
docker pull ruby:2.7.1-alpine3.10
```
pull image ruby:2.7.1, hệ điều hành alpine3.10 từ docker hub
Kết quả: 
![](https://images.viblo.asia/62fe0c6c-4a16-4261-986f-e87920558854.png)
![](https://images.viblo.asia/3a5112bf-7929-44d5-a919-25a260a81ee8.png)

Tương tự lệnh push.

Ở bài viết tới, mình sẽ giới thiệu thêm các command line trong Docker, các bạn tham khảo trước ở đây nhé!
https://docs.docker.com/engine/reference/commandline/version/

Hy vọng qua bài viết, bạn có thể nắm các kiến thức cơ bản nhất về Docker, kiến trúc hoạt động, ứng dụng các lệnh vào sử dụng các objects.

Tham khảo: 
https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/
https://docs.docker.com/engine/reference/commandline/version/
https://docs.docker.com/engine/reference/commandline/version/