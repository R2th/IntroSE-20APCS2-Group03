# 1. Docker
## 1.1 Giới thiệu
Docker là một platform cung cấp cho cho chúng ta những công cụ và service để có thể  building, deploying và running program của mình một cách dễ dàng và nhanh chóng bằng các container. Việc sử dụng các container để triển khai các ứng dụng được gọi là containerization. 

## 1.2 Docker engine

**Docker Engine** là một ứng dụng **client-server**.

Các thành phần chính của Docker Engine gồm có:

* **Server** hay còn được gọi là **docker daemon (dockerd)**: Có nhiệm vụ khởi tạo, quản lý các **Docker object** như: **image**, **container**, **network**, **volume**.

* **REST API**: cung cấp các Interface để các chương trình sử dụng để gọi tới **docker daemon** và hướng dẫn nó sẽ làm gì.

* **CLI (Command Line Interface) client**: là một tập hợp các câu lệnh để sử dụng api để Client thao tác với Docker. 

![](https://images.viblo.asia/602c17e4-642c-4682-aeb7-cc27e28ff82d.png)

## 1.2 Một số khái niệm
* **Docker Client:** khi bạn tương tác với docker thông qua câu lệnh command trên terminal thì `docker client` sẽ sử dụng `API` và gửi lệnh tới `Docker Daemon`.

* **Docker Deamon:** đây là server của Docker sẽ cho yêu cầu từ Docker API, có nhiệm vụ khởi tạo, quản lý các **Docker object** như: **image**, **container**, **network**, **volume**

* **Docker Registry:** đây là nơi lưu trữ riêng của Docker Images. Thông dụng nhất là **Docker Hub** hoặc bạn có thể build Registry của riêng mình.

* **Docker Hub:** Hiểu nôm na thì nó giống như github, đó là nơi chứa các `docker image`, bạn có thể tìm kiếm image bạn cần hoặc lưu trữ image của riêng bạn trên Docer Hub.

* **Docker Repository:** đây là tập hợp các Docker images có cùng tên nhưng lại khác tag.

* **Docker Networking:** Có chức năng kết nối với các container lại với nhau. Chúng có thể kết nối trên 1 host hay nhiều host khác nhau.

* **Docker Compose:** là công cụ cho phép bạn chạy ứng dụng với nhiều Docker containers 1 cách nhanh chóng và dễ dàng.

* **Docker Services:** đây là các containers có trong production, và chỉ với 1 service bạn chỉ có thể chạy 1 image nhưng nó lại mã hoá cách thức để chạy image. 

# 2. Cài đặt docker
Hướng dẫn cài đặt tại: [đây](https://docs.docker.com/get-docker/)

# 3. Thao tác với Docker
Có lẽ bạn đã biết, muốn biết thằng nào thì mình cứ dùng thằng `--help` 

Ví dụ: muốn xem sử dụng thằng docker thì `docker --help` nó sẽ show ra cho các bạn các lệnh của thằng này. và hướng dẫn sử dụng.  
## 3.1 Docker Image
### 3.1.1 Khái niệm
Docker image là phầm mềm, service được đóng gói. Nó có thể là Hệ điều hành, môi trường hệ thống hay ngôn ngữ lập trình như: ubuntu, MacOS, centos, nginx , mysql, ruby, php, python...

Trong docker thì các image chỉ có thể đọc mà ko thể chỉnh sửa.

Khi Image được Docker khởi chạy thì phiên bản thực thi của nó được gọi là container.

### 3.1.2 Các lệnh thường dùng
* Có lẽ bạn đã biết, muốn biết thằng nào thì mình cứ dùng thằng `--help` .

`docker image --help` nó sẽ show ra cho các lệnh docker thao tác với image. 
Còn muốn cụ thể hơn lệnh đó làm gì thì gõ lệnh đó thì cũng tương tự như vậy. ví dụ: `docker image tag --help`. 

**1. Liệt kê các images hiện có**
```
docker images
```

**2. Pull một image từ Docker Hub**
```
docker pull {image_name}:{tag}
```
* **Note:**
    *  Mặc định khi ko có `{tag}` thì nó sẽ tải bản `lasted`
    *  Lên docker hub để tìm những image mình cần có sẵn: https://hub.docker.com/

**3. Xóa một image**
```
docker rmi {image_id/name}
docker image rm {image_id/name}
```
+ **Note:** 
    + Bạn không cần viết hết image_id, chỉ cần những ký tự đầu của image_id là bạn có thể xóa nó rồi ví dụ: image_id là `77be327e4b63` thì bạn chỉ cần `docker rmi 77` là đủ. nhưng nhớ đảm bảo là mấy ký tự đầu nó uniq  nhé. ko lại xóa nhầm image thì khổ =))

    * Đôi lúc image nào đó đang tham chiếu tới nó thì thêm option `-f` vào để force xóa luôn

## 3.2 Docker Container
### 3.2.1 Khái niệm
Container là một phiên bản thực thi của image. Nếu hiểu theo OOP thì image là class còn container là instance của class đó. Và từ 1 image ta cũng có thể tạo ra được 1 hoặc nhiều container hoàn toàn giống nhau.

Bạn có thể hiểu những phần mềm như ruby, rails, mysql ... được bỏ vào từng thùng (container) riêng biệt. hoặc gói tất cả những phần mềm mà ứng dụng của bạn cần vào 1 cái thùng, và ứng dụng của bạn có thể chạy trong cái thùng đó,  vì nó đã có sẵn mọi thứ cần thiết để ứng dụng của bạn hoạt động. Cái thùng đó không bị ảnh hưởng từ bên ngoài và ngược lại, nó cũng không gây ảnh hưởng ra ngoài.

Vì thế container có những ưu điểm sau:
* **Linh hoạt:** Bất kì ứng dụng nào cũng có thể container hóa. 1 phần mềm cũng có thể đóng gói vào 1 container, nhiều phầm mềm cùng phục vụ cho 1 ứng dụng cũng có thể đóng gói vào 1 container...
* **Nhẹ:** Container cũng sử dụng chung các images nên cũng không tốn nhiều bộ nhớ.
* **Di động:** Bạn có thể xây dựng tại local và đem nó đi triển khai lên các máy, server khác.
* **Đồng nhất:** Khi nhiều người cùng phát triển trong cùng một dự án sẽ không bị sự sai khác về mặt môi trường.
* **Nhanh:** Do chia sẻ host OS nên container có thể được tạo gần như một cách tức thì. Điều này khác với vagrant - tạo môi trường ảo ở level phần cứng, nên khi khởi động mất nhiều thời gian hơn.
### 3.2.2 Các lệnh thường dùng
**1. Build container từ image**
```
docker run --name {container_name} -it {image_id/name:tag} /bin/bash
```
* Note: Một số option
    * `-it` để cho phép container vừa tạo ra có thể nhận tương tác (`-i`), và kết nối với terminal (`-t`).
    * `--name` container_name của container mà bạn muốn sau khi khởi chạy. mặc định khi không có thì nó sẽ tự đặt tên cho container là 1 tên j đấy. nên tốt nhất mình tự đặt cho dễ nhớ :v
    * `-p {host_port}:{container_port}` , `-h {container_host}` optional
    * Còn nhiều option khác khi nào dùng đến thì mình note lại sau

**2.  start/stop một container**
Khởi chạy container đã build ta có
```
docker start {container_id/name} # Khởi động lại container
docker attach {container_id/name} # access vào container đang start
docker exec -it {container_id/name} /bin/bash #khởi động container và access vào container đó luôn

docker start {container_id/name}
```
* Note:  có thể dùng `docker exec` để đứng từ host và chỉ định cho container thực thi lệnh. 

    VD: Đứng từ host, và liệt kê tất cả các file có trong container_1 thì ta có lệnh: `docker exec container_1 ls`

**3. Thoát khỏi container đang access**
```
exit  # thoát và stop luôn container  
ctrl + d # thoát và stop luôn container 
ctrl + p, ctrl + q # dùng cả 2 tỏ hợp phím này để thoát contraner mà vẫn giữ cho container chạy
```

**4. Liệt kê các container**
```
docker ps # Liệt kê các container đang chaỵ
docker ps -a #Liệt kê tất các container bao gồm container đã tắt
```

**5. Xóa một container**
```
docker rm -f {container_id/name}
```

**6. Đổi tên một container**
```
docker rename {old_container_name} {new_container_name}
```

**7. Xem các thay đổi trên container**
```
docker diff {container_name}
```
**8. Lưu container thành image**

Trong trường hợp bạn muốn lưu container của bạn thành image để thuận tiện share cho ng khác hoặc đem đi cài trên máy khác thì bạn dùng lệnh sau
```
docker commit {container_id/name} {image_name}:{tag}
```
* Note:
    * Phải stop container trước khi bạn lưu.
    * `{image_name}:{tag}` đặt tên image và version cho container sau khi lưu.

Lưu image thành file để tiện đi share
```
docker save --output filename.tar {image_id/name}
```
* Note:
    *  filename.tar sẽ được lưu ở vị trí bạn đang đứng trong terminal
    
Load image từ file ra để sử dụng
```
docker load -i filename.tar
```
* Note:
    * Khi load image từ file thì image_name và image_tag sẽ là rỗng để đặt tên và tag cho image ta dùng lệnh 
    ```
    docker tag {image_id} {new_name:new_version} 
    ```

## 3.3 Data Volume
### 3.3.1 Khái niệm
Data volume dùng để chia sẻ dữ liệu, thông thường ta sẽ dùng cho những trường hợp sau:
* Để giữ lai dữ liệu của container 
* Để chia sẻ dữ liệu giữa host và doker container
* Để chia sẻ dữ liệu giữa các container khác nhau

### 3.3.2 Chia sẻ dữ liệu thông qua thư mục
**1. Giữa host và container**
```
docker run -it -v {host path}:{container path} --name {container name} {image_id/name}
```
ví dụ:
```
docker run -it -v /home/tran.thanh.tam/Desktop/share_data:/home/share_data --name C1 ubuntu:16.04 
```
**2. Giữa containter với nhau:**
  
 Để tạo ra một container có tên là C2 và cũng cùng chia sẻ giữ liệu của C1 (/home/share_data) ta dùng lệnh
```
docker run -it --name C2 --volumes-from C1 ubuntu:16.04
```
### 3.3.2 Chia sẻ dữ liệu thông qua ổ đĩa
**1. Kiểm tra ổ đĩa hiện có**
```
docker volume ls
```
**2. Tạo mới ổ đĩa Volume**
```
docker volume create {volume name}
```
**3. Kiểm tra thông tin ổ đĩa Volume**
```
docker volume inspect {volume name}
```
**4. Xóa ổ đĩa Volume**
```
docker volume rm {volume name}
```

**5. Chia sẻ dữ liệu thông qua ổ đĩa Volume**
```
docker run -it --name C1 --mount source=Disk_1,target=/home/disk_1 ubuntu:16.04
```
* Note:
    *  `--mount` tham số để gán ổ đĩa vào
    *  `source=Disk_1` tên ổ đĩa mà mình muốn gán
    *  `target=/home/disk_1` vị trí mà ổ đĩa Disk_1 ánh xạ vào thư mục /home/disk_1 của container
 
 **6. Chia sẻ dữ liệu ổ đĩa Volume với host  và containter**
 
 Tạo ổ đĩa ánh xạ với host
 ```
 docker volume create --opt device={host path} --opt type=none --opt o=bind {volume name}
 ```
 Gán ổ đĩa cho container
 ```
 docker run -it --name C2 -v Disk_2:/home/disk_2 ubuntu:16.04 
 ```
 
 * Note: Khi đã ánh xạ ổ đĩa với host thì mình sẽ ko sử dụng `--mount` mà dùng `-v`

## Tài liệu tham khảo
https://docs.docker.com/get-started/

https://www.youtube.com/playlist?list=PLwJr0JSP7i8At14UIC-JR4r73G4hQ1CXO

https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0

https://kienthuclinux.com/linux-tool/tim-hieu-ve-docker-phan-3-kien-truc-va-thanh-phan-cua-docker/

https://theanhgroup.com/docker-la-gi-dac-diem-cua-docker-nhu-the-nao.html#loi-ich-cua-docker-mang-lai