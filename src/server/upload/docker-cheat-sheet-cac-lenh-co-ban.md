Với Docker, Developer có thể xây dựng bất kỳ ứng dụng nào bằng bất kỳ ngôn ngữ nào bằng bất kỳ công cụ nào. Các ứng dụng "Dockerized" có thể chạy ở trên các hệ điều hành. Các Developer có thể bắt đầu nhanh chóng bằng cách bắt đầu với một trong số hơn 13.000 ứng dụng có sẵn trên Docker Hub. Docker quản lý và theo dõi các thay đổi và dependencies, giúp hệ thống dễ dàng hiểu cách các ứng dụng mà developer xây dựng và hoạt động. Và với Docker Hub, các developer có thể tự động build và chia sẻ các sản phẩm thông qua các repository public hoặc private. Docker giúp các developer xây dựng và vận chuyển các ứng dụng chất lượng cao hơn, nhanh hơn. Các kiến thức cơ bản về docker các bản có thể tham khảo bài viết này của mình https://viblo.asia/p/docker-va-nhung-kien-thuc-co-ban-YWOZrp075Q0. Vậy để làm sao để xây dựng các ứng dụng với docker thì trong bài viết lần này mình sẽ giới thiệu với các bạn các lệnh cơ bản với docker
<br>
![](https://images.viblo.asia/6e121d8b-49c8-4e60-a352-f23efa9e544d.png)
## General usage
- Tìm kiếm một images:
```
docker search mysql
```
- Chạy một container trong nền:
```
docker run -d jenkins
```
- Chạy một container và tương tác với container:
```
docker run -it ubuntu bash
```
- Chạy một container tự động remove khi container dừng:
```
docker run --rm ubuntu bash
```
- Publishn hoặc exposr cổng từ một container:
```
docker run -p 80:80 -d nginx
```
```
docker run --expose 80 ubuntu bash
```
- Chạy một container và đặt lại tên cho container đó:
```
docker run --name mydb mysql
```
- Khởi động lại một container đã dừng:
```
docker start mydb
```
- Dừng một container:
```
docker stop mydb
```
- Thêm metadata vào container:
Một `label` là cặp key=value thêm metadata vào một `container`. Để gắn `label` một thùng chứa có hai `label`:
```
docker run -l my-label --label com.example.foo=bar ubuntu bash
```
Key `my-label` không chỉ định một giá trị để `label` mặc định thành một chuỗi trống (""). Để thêm nhiều `label`, lặp lại `label flag` (-l hoặc --label)
<br>
key = value phải là duy nhất để tránh ghi đè giá trị `label`. Nếu bạn chỉ định `label` có khóa giống hệt nhau nhưng giá trị khác nhau, mỗi giá trị tiếp theo sẽ ghi đè lên trước đó. Docker sử dụng khóa key = value cuối cùng mà bạn cung cấp.
## images
- Build một images từ Dockerfile trong thư mục hiện tại:
```
docker build --tag myimage
```
- Force rebuild của Docker image:
```
docker build --no-cache .
```
- Biến đổi một container sang image:
```
docker commit 1075d442207f myimage
```
- Xóa tất cả các image không được sử dụng:
```
docker image prune -a
```
## Volumes
- Tạo một local volume:
```
docker volume create --name myvolume
```
- Mounting một volume khi chạy một container:
```
docker run -v myvolume:/data mysql
```
- Destroy một volume:
```
docker volume rm myvolume
```
- Xem danh sách volume:
```
docker volume ls
```
## Network
- Tạo một local network:
```
docker network create mynetwork
```
- Đính kèm một container vào network khi chạy container:
```
docker run -d --net mynetwork redis
```
- Kết nối một container đang chạy từ một network:
```
docker network connect mynetwork 1075d442207f
```
- Ngắt kết nối một container tới một network:
```
docker network disconnect mynetwork 1075d442207f
```
## Debug
- Chạy một tiến trình khác trong container đang chạy:
```
docker exec -it 1075d442207f bash
```
- Hiển thị logs trực tiếp của daemon container đang chạy:
```
docker logs -f 1075d442207f 
```
- Hiển thị port đã expose của một container:
```
docker port 1075d442207f
```
## Manage container
- Danh sách các container đang chạy:
```
docker ps
```
- Danh sách tất cả các container:
```
docker ps -a
```
- Inspect metadata của một container:
```
docker inspect 1075d442207f
```
- Hiển thị danh sách tất cả các images có sẵn trong máy của bạn:
```
docker images
```
- Xóa các tất cả các container đã dừng:
```
docker rm $(sudo docker ps --filter status=exited -q)
```
## Notes
- Image name: mysql, jenkins, redis, nginx
- Container name hoặc id: mydb, 1075d442207f
## Kết luận
Trong bài viết lần này mình đã giới thiệu tới các bạn các lệnh cơ bản khi chúng ta làm việc với docker, mong rằng bài viết sẽ giúp đỡ được các trong quá trình làm việc với docker. Cảm ơn các bạn đã theo dõi bài viết <3