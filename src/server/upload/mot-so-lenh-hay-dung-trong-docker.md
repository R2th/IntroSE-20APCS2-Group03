Chào các bạn, như các bạn đã biết thời gian gần đây docker càng ngày càng trở lên hot và được áp dụng và triển khai vào các dự án rất nhiều.
Nhưng nói đến lệnh trong docker thì thực sự rất nhiều chả khác gì linux cả :) . Chính vì thế hôm nay mình sẽ liệt kê các lệnh hay được sử dụng trong docker nhất .

Bắt đầu nào ! 
### Kiểm tra phiên bản
```
docker --version
```

### Liệt kê các container đang chạy
```
docker ps 
#Liệt kê các container đang chạy
docker ps -a 
#Liệt kê các container đã tắt
```
### Tắt tất cả các container đang chạy
```
 docker kill $(docker ps -q)
```
### Liệt kê các images hiện có
```
docker images
```
###  Xóa một hoặc nhiều image
```
docker rmi <image_id1/name1 image_id2/name2 ....>
```
### Xóa một hoặc nhiều container
```
docker rm <container_id1/name1 container_id1/name2 container_id3/name3 ...>
```
### Pull một image từ Docker Hub
```
docker pull <image_name>
```
### Stop 1 hoặc nhiều container đang chạy
```
docker stop <container_id1/name1 container_id1/name2 container_id3/name3 ...>
``` 
### Build DockerFile 
```
docker build -t your_name_container
```
### Xem lịch sử các commit trên image
```
docker history <image_name>
```
### Xem các thay đổi trên container
```
docker diff <container_name>
```
### Khởi động  và truy cập một container
```
docker start <new_container_name>
docker exec -it <new_container_name> /bin/bash (hoặc sh)
```
### Tạo mới một container, đồng thời khởi động với các tùy chọn cổng và volume
```
docker run --name <container_name> -p <host_port>:<container_port> -v </host_path>:</container_path> -it <image_name> /bin/bash
```
### Copy file từ host vào container
```
docker cp test.txt mycontainer:/test.txt
```
### Thoát termial vẫn giữ container đang chạy
```
Nhấn tổ hợp phím CTRL +P + Q
```
### Vào termial container đang chạy
```
docker container attach containerid
```
### Chạy một lệnh trên container đang chạy
```
docker exec -it containerid command
```
### Lưu 1 container thành image
```
docker stop mycontainer #stop mycontainer
docker commit mycontainer image:version1 
# tạo ra image:version1 từ mycontainer
```
### Lưu Image ra file
```
docker save --output myimage.tar myimage
#lưu ra file, có thể chỉ ra đường dẫn đầy đủ nơi lưu file
```
### Nạp file vào docker
```
docker load -i myimage.tar
```
### Hiển thị list mạng
```
docker network ls
```
### Tạo ra một mạng với Driver là bridge
```
docker network create --driver bridge net-new 
# mạng mới sẽ là net-new
```
### Kiểm tra thông tin của một mạng
```
docker network inspect net-new 
#Kiểm tra thông tin mạng net-new nó sẽ ra các thông tin ví dụ mạng có container nào đang kết nối, status, ....
```
### Connect 1 container vào mạng bridge
```
docker network connect <network_name> <container_name>
```

Trên đó là những câu lệnh mình hay dùng mong rằng sẽ giúp ích được cho các bạn. <br>
Tài liệu tham khảo: <br>
https://docs.docker.com/engine/reference/commandline/docker/ <br>