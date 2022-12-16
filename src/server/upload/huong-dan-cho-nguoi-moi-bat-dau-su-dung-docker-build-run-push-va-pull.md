*) Docker là gì?
Docker là một công cụ được thiết kế để giúp create, deloy and run các ứng dụng một cách dễ dàng hơn bằng cách sử dụng các containers. Container cho phép dev đóng gói một ứng dụng với tất cả các phần cần thiết, ví dụ như thư viện và các phần phụ thuộc khác, rồi gửi tất cả chúng dưới dạng một gói.

*) Bắt đầu nào!

## Cài đặt
- Với Mac:
Các bạn download file ở đây: https://download.docker.com/mac/stable/Docker.dmg
rồi thực hiện như trong bài viết này: https://medium.com/@deepakshakya/beginners-guide-to-use-docker-build-run-push-and-pull-4a132c094d75

- Còn với Ubuntu:
Các bạn thực hiện theo hướng dẫn dưới đây: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

## Build Docker
### 1. Tạo docker file
Tạo 1 file có tên Dockerfile

```
#mkdir mydockerbuild (create a directory named mydockerbuild)
#cd mydockerbuild (go to directory created above)
#vi Dockerfile (create a new docker file using vi editor)
```

Sau đó copy nội dung dưới đây vào file

```
FROM docker/whalesay:latest
RUN apt-get -y update && apt-get install -y fortunes
CMD /usr/games/fortune -a | cowsay
```

### 2. Build docker image
Build docker image có tên `docker-whale`

```
#docker build -t docker-whale .
```

![](https://images.viblo.asia/d0a56a50-05b2-4407-9093-814de515fba2.png)

Nếu bạn thấy lỗi "no permission", hãy thư đặt `sudo` ở phía trước giống ảnh bên trên.

### 3. Kiểm tra image

```
#docker images
```

![](https://images.viblo.asia/c375736f-e072-45ab-af54-d47affd5d531.png)

### 4. Run docker của bạn

```
#docker run docker-whale
```

![](https://images.viblo.asia/a285d6fc-3244-4301-8b8e-91f81ab06f48.png)

## Docker Hub

### 1. DockerHub là gì?
Là nơi lưu trữ Docker image của tất cả mọi người. Từ các cá nhân như bạn, đến các tổ chức lớn như RedHat, IBM, Google, Microsoft...

### 2. Tạo tài khoản Docker Hub 
- Tạo tài khoản trên trang chủ của họ: https://hub.docker.com/
- Xác nhận email của bạn và thêm repo mới:
![](https://images.viblo.asia/bab7e3a9-8a23-46fb-86c6-9cac73a53367.png)

### 3. Đẩy image của bạn vào tài khoản Docker Hub
- Run `docker images` để kiểm tra các image của bạn
 ![](https://images.viblo.asia/59576dc9-5ae0-4758-b7a5-9b6553185a9d.png)
Cột thứ 3 hiển thị docker Image ID của bạn. 

- Chúng ta sẽ dùng ID này để gắn tag cho image

```
#docker tag <image-id of docker-whale> <your dockerhub username>/docker-whale:latest
```

![](https://images.viblo.asia/8b819361-9f21-4e6a-87a6-9cc9e78b7f6b.png)

- Đẩy image đã được gắn tag vào docker hub
![](https://images.viblo.asia/8e11ac1d-1eb6-4548-88ae-8287e9dde322.png)

- Run docker
![](https://images.viblo.asia/177237b5-2a2c-4bba-b2cf-c6b3513372aa.png)

## Kết luận

Here’s summary about what we covered:
1. Docker là gì?
2. Download và cài đặt Docker trên máy của bạn
3. Ví dụ một docker image đơn giản.
4. Cách đê build docker image mới?
5. Các để run docker image mới?
6. Cách để tag, push và pull docker image?