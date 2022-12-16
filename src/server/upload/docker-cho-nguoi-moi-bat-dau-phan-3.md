Mình thấy đa số các sự án đều sử dụng docker-compose và không ngoại lệ dự án mình đang làm cũng vậy. Để tiếp tục chuỗi [series](https://viblo.asia/s/docker-cho-nguoi-moi-bat-dau-bq5QL8qElD8) tự mò mẫm về Docker cho người mới bắt đầu của mình thì hôm nay mình sẽ giới thiệu đến các bạn về docker-compose.
![](https://images.viblo.asia/991eccbc-57d4-4ddf-8b39-7c4b93b8590b.png)
Qua hai bài trước của series chắc hẳn các bạn cũng có suy nghĩ giống mình, tại sao chúng ta có thể cài đặt, cấu hình tất cả các môi trường cần thiết bằng cách sử dụng DockerFile. Vậy tại sao lại sinh ra Docker Compose làm gì nhỉ?
Mn cùng tìm hiểu với mình nha, trước tiên mình sẽ tìm hiểu về khái niệm Docker Compose cumming cumming nào. :running::running::running:
# 1. Docker Compose là gì?
Docker Compose là công cụ giúp định nghĩa và khởi chạy multi-container Docker applications. Chỉ với một câu lệnh, lập trình viên có thể dễ dàng create và start toàn bộ các services phục vụ cho việc chạy ứng dụng.
Với compose bạn sử dụng file YAML để config các services cho application của bạn. Sau đó dùng command để create và run từ những config đó.
Sử dụng cũng khá đơn giản chỉ với ba bước:
* Khai báo app’s environment trong Dockerfile.
* Khai báo các services cần thiết để chạy application trong file docker-compose.yml.
* Run docker-compose up để start và run app.

# 2. Cách cài đặt
B1: Run this command to download the current stable release of Docker Compose:
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
B2: Apply executable permissions to the binary:
```
sudo chmod +x /usr/local/bin/docker-compose
```
B3: Test the installation
```
docker-compose --version
```
Để chắc chắn mình đã cài đặt thành công docker-compose thì các bạn kiểm tra trên máy mình, nếu nó hiện kết quả tương tự như bên dưới là oki r đó ạ.
![](https://images.viblo.asia/7b3205b1-3439-4ba6-899b-052ea002409b.png)
# 3. Cấu trúc file docker-compose.yml
docker-compose.yml là file cấu hình cho các docker-container trong ứng dụng. Và một file docker-compose.yml sẽ có cấu trúc như sau:
```
version: '3'

services:
    container_1:
        ...
        ...
        ...
    container_2:
        ...
        ...
        ...
```
Trong đó:
* **versiton**: là phiên bản của docker-compose
* **services**: là nơi khai báo và định nghia các container

VD mình có khai báo một container như sau:

```
    mysql:
        container_name: compose_mysql
        restart: always
        image: mysql
        port:
            - "16000:3306"
        environment:
            MYSQL_DATABASE: compose_mysql
            MYSQL_USER: root
            MYSQL_PASSWORD: secret
            MYSQL_ROOT_PASSWORD: root
```

Trong đó:
* **container_name**: Tên của container, tên này mình có thể tùy chỉnh.
* **restart**: Giá trị mặc định là no, còn nếu bạn đặt là always thì container sẽ khởi động lại nếu mã thoát cho biết lỗi không thành công.
* **image**: Tên image sẽ dùng để build container. Image này được chỉ định khi build một image trên máy host hoặc download từ Docker Hub. Ở đây mình sẽ dùng image mysql trên DockerHub.
* **port**: Cổng kết nối, kết nối port của máy host đến port của container. Như VD bên tên nghĩa là mình truy cập vào cổng 16000 ở máy thật thì sẽ được trỏ tới truy cập ở cổng 3306 của máy ảo
* **environment**: Thêm các biến môi trường.
* **volumes**: Chia sẻ dữ liệu giữa container (máy ảo) và host (máy thật) hoặc giữa các container với nhau.
Ngoài ra còn có **build** : Vị trí đường dẫn của file DockerFile. Sử dụng khi chúng ta không xây dựng container từ image có sẵn nữa mà xây dựng nó từ Dockerfile. Nếu Dockerfile nằm cùng thư mục với docker-compose.yml thì chỉ cần
`build: .`

# 4. Các câu lệnh thường dùng
- Build các images (nếu cần tạo):

    `docker-compose build`

- Hoặc bạn có thể Khởi chạy các container và build image (có show log) bằng câu lệnh sau:

    `docker-compose up`
    
    Nó sẽ tự tạo và lấy các image trên Docker Hub cho bạn chỉ bằng một câu lệnh đơn giản. Đơn giản hơn rất nhiều là chạy từng container như Docker.
    
- Khởi chạy các containers k show log:

    `docker-compose up -d`

- Build một contailner. Câu lệnh này nhằm mục đích khi ta có thay đổi config ở một container nào đó -> build lại.

    `docker-compose up -d --no-deps --build <container_name>`

- Chạy container và build image

    ` docker-compose up --build -d`

- Help

    `docker-compose --help`

- Dừng các container

    `docker-compose down`
        
Ngoài ra có một mẹo nhỏ dành cho các bạn dùng Visual Studio Code đó là trên Visual Studio Code bạn cài thêm extendsion Docker.
![](https://images.viblo.asia/09caaed4-6352-45f6-b8ae-a5d0eb7b8fcf.png)
Bạn có thể tạo nhanh các config cho Dockerfile và docker-compose.yml chỉ bằng một vài thao tác nhỏ, nó còn suggest các câu lệnh cho chúng ta nữa bằng cách:
Sau khi cài xong extendsion nhấn F1 => gõ docker: add => chọn temp có sẵn Visual Studio Code sẽ tự động generate các fileDockerfile, docker-compose.yml, docker-compose.debug.yml, và.dockerignore cho bạn.
![](https://images.viblo.asia/dbad1ea0-ed42-4718-843a-b96de1f85491.png)

# 5. Kết luận
Quay lại bài toàn ở đầu bài một chút ạ. Như ở trên mình đã nói chúng ta hoàn toàn có thể sử dụng docker để cài đặt môi trường cho dự án của mình. Tuy nhiên, nếu bạn cần thiết lập môi trường của 1 project với nhiều container thì việc đó sẽ trở nên rất mất thời gian để đi qua tất cả các bước thủ công. Vì câu lệnh nó khá dài và lằng nhằng -> tốn time.  Thì giờ đây nếu ta sử dụng docker-compose chỉ bằng 1 câu lệnh ngắn gọn đã có thể run tất cả các container một lúc.

Trên đây là bài viết chia sẻ về docker-compose của mình, rất mong mọi người ủng hộ ạ hì. Cảm ơn mn đã đọc bài viết của mình ạ :kissing_heart:
# 6. Tài liệu tham khảo
https://docs.docker.com/compose/

https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-3-docker-compose-3P0lPm6p5ox