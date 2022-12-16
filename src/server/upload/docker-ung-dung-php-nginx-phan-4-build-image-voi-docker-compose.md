<div align="justify">

docker-compose là 1 file có chức năng build các Image thàn Container, sau đó kết nối các Container lại với nhau qua dải mạng. 
Ở bài viết này, ta sẽ chỉ viết file docker-compose để chạy ứng dụng PHP, Nginx mà thôi.

### 1. docker-compose
```
version: '3.8'
services:

  #PHP Service
  web:
    privileged: true
    build: 
        context: ./docker
    image: strawberry:v1
    container_name: strawberry
    restart: unless-stopped
    ports: 
        - "80:80"
        - "443:443"
```
Giải thích:
1. tên của service gồm PHP, Nginx của ta sẽ có tên là `web`
2. khi build nó sẽ tìm Image là `strawberry:v1` để tạo Container, nếu mà chưa có Image này nó sẽ lấy Dockerfile ở thư mục `context: ./docker` để tạo Image trước, rồi sau đó mới run Image.
3. `restart: unless-stopped` container sẽ chỉ dừng lại khi ta cố tình down nó thôi, nếu có lỗi gì khiến container dừng lại khác nó sẽ tự động restart.
4. `ports` mapping port từ môi trường gốc vào container, ở đây ta map port 80 để sử dụng Nginx.
5. `privileged: true` cấp quyền cho thằng root của container có quyền thao tác trên cả máy host. (minh hỏa ở ảnh dưới)

![image.png](https://images.viblo.asia/8e129420-fe04-4e5f-a43a-ecc8ef7c5bbd.png)

### 2. config virtual host và build Container
* truy cập đường dẫn `C:\Windows\System32\drivers\etc`.
* edit file host với quyền admin.
* thêm dòng sau để tạo virtual host: 
    `127.0.0.1 strawberry.local www.strawberry.local` tương ứng với file config của Nginx.
* chạy lệnh `docker-compose up -d`
* mở browser và truy cập đường dẫn: http://www.strawberry.local/info.php

Kết quả:
![image.png](https://images.viblo.asia/a0d80153-7a81-434a-a857-499638bd2a51.png)
    
</div>