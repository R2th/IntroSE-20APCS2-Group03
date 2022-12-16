### Docker là gì?
**Docker** là một công cụ cho phép các nhà phát triển, sys-admin... có thể dễ dàng triển khai ứng dụng của mình lên chạy một môi trường phát triển
Lợi ích chính mà **Docker** đem lại là cho phép người dùng có thể đóng gọi một ứng dụng với đầy đủ các thành phần liên quan
Các **Container** của **Docker** sử dụng ít tài nguyên hơn các giải pháp sử dụng "Máy ảo" như "VMWare, VirtualBox..."
<p align="center"> <img width="400" src="https://image.prntscr.com/image/QS1JWgViQMqFpY92iIUmPg.png"></p>

### Docker Container là gì?
Trước khi nói về **Container** chúng ta sẽ chém gió đôi chút về VMs ( Virtual Machines ).
Trước khi **Docker** ra đời, thì VMs vẫn thống trị trong việc triển khai các ứng dụng vì nhanh-gon-lẹ.
Người dùng cần phải cài trên máy chính (**Host**) và nó sẽ tạo ra các máy ảo để chúng ta có thể cài đặt hệ điều hành cho hệ thống.
Điểm đáng tiết của nó là việc chạy các máy Ảo nhử vậy sẽ tốn rất rất nhiều tài nguyên trên (**Host**), làm tăng chi phí phần cứng cho các hệ thống ứng dụng nó.
Vì vậy **Container** ra đời để giải quyết bài toán trên. **Container** không tạo ra máy Ảo, nó chia sẽ tài nguyên trực tiếp từ máy chủ (**Host**)
<p align="center"><img width="400"  src="https://i.imgur.com/xKsn6tM.png(https://i.imgur.com/xKsn6tM.png)"></p>

### Docker Image là gì?
Nếu bạn đã trải qua giai đoạn "Cài win dạo" thì chắc hẵn sẽ không lạ lẵm gì về khái niệm "**Image**". 
Một ngày đẹp trời cô em cùng lớp đem Laptop tới và nhờ cài lại Win. Với túi tiền của sinh viên ít ỏi, thì không thể ra tiệm mua đĩa **Windows** về cài được, cuối cùng thì cũng tìm ra được cách, đó là tải bản **Image** (IOS) của **Windows** về cài đặt.
Vậy có thể hiểu **Docker Image** là  một file, bao gồm nhiều thành phần có thể thực thi tạo ra **Docker Container**
<p align="center"><img width="400"  src="https://i.imgur.com/PzpHXGk.png"></p>

### Cài đặt Docker
Đối với các bạn dùng Mac thực hiên theo hướng dẫn [tại đây](https://docs.docker.com/docker-for-mac/install/)

Sau khi cài đặt thành công chúng ta sẽ thử kiểm tra lại bằng cách thực hiện lệnh bên dưới

> docker -v
>  
>  ![enter image description here](https://i.imgur.com/0nlfuyG.png)


Nếu thực thi được như trong hình thì xem như các bạn đã cài đặt **Docker** thành công
#### Hãy cùng `Hello world `
> docker run hello-world
> 
> ![enter image description here](https://i.imgur.com/8q8TOb1.png)

Như vậy, theo một cách suy nghĩ phóng khoáng thì chúng ta đã **Master** được Docker 

### Các lệnh phổ biến khi dùng Docker
```bash
$ docker images
```
>Trả về danh sách các images
>
>![enter image description here](https://i.imgur.com/0LDNi2v.png)

```bash
$ docker pull {image_name}
```
> Tải về một image từ **Docker Hub**, đảm bảo rằng tên image đó phải tồn tại trên **Docker Hub**
> **VD:**  docker pull hello-world
> 
> ![enter image description here](https://i.imgur.com/TXdi4H8.png)

```bash
docker rmi {image_id/name}
```
> Xóa một image đang tồn tại bằng Image ID hoặc tên Image
> **VD:** docker rmi -f hello-world
> 
> ![enter image description here](https://i.imgur.com/VveffX5.png)

```bash
$ docker ps
```
> Hiển thị ra danh sách các Container đang chạy
> Chúng ta có thể thêm tham số "-a" để  hiển thị ra đầy đủ các Container ( bao gồm cả Container không chạy )
> 
> $ docker ps![enter image description here](https://i.imgur.com/DpMrsPM.png)
> 
> $ docker ps -a
> ![enter image description here](https://i.imgur.com/zYfWoyJ.png)

```bash
$ docker rm {container_id/name}
```
> Xóa một Container đang tồn tại bằng Container ID hoặc tên Container 
> Nếu gặp vấn đề trong quá trình xóa Container, các bạn có thể thêm tùy còn "-f" đại loại như xóa cưởng bức @@...
> 
> $ docker rm -f bf9724add126![enter image description here](https://i.imgur.com/r6CDGXn.png)

```bash
$ docker rename {old_container_name} {new_container_name}
```
> Đổi tên một container

```bash
$ docker start {new_container_name}
```
> Khởi chạy một container, với điều kiện container đã được khởi tạo trước đó

```bash
$ docker run --name {container_name} -p {host_port}:{container_port} -v {/host_path}:{/container_path} -it {image_name} /bin/bash
```
> Tạo mới container và khởi chạy với các tùy chọn ban đầu
> **container_name**: Tên container name
> **host_port**: Port truy cập từ Host
> **container_port**: Port được mapping trong docker
> **host_path**: Đường dẫn thư mục bên ngoài máy Host sẽ được Mapping với **container_path**
> **container_path**: Đường dẫn thư mục được đưa ra ngoài

```bash
$ docker commit -m "message" {container_name} {image_name}
```
> Commit các thay đổi từ **container** vào **image**

```bash
$ docker save {image_name} > {/host_path/new_image.tar}
```
> Lưu xuống một **image** thành **file.tar**
> Lợi ích của việc này là mình không cần đẩy lên Docker hub, mà có thể copy nó vào usb hoặc ổ cứng di chuyển cho nhanh
> 

```bash
$ cat file.tar | docker import - {new_image_name}:latest
```
> Tạo mới một image từ **file.tar**


### Các tuyệt chiêu hay dùng
1. Xóa bỏ tất cả làm lại
```bash
$ docker rm $(docker ps -a -q)
$ docker rmi $(docker images -q)
```
> 2 lệnh trên sẽ cho ra đi tất cả các **Container** và **Image** mà bạn đang có
> lệnh này rất phù hợp cho các bạn đang nghiên cứu, có nhu cầu "Xã bàn lập lại", nhưng thận trọng, mọi thứ ra đi thì không có cớ hội tìm lại đâu đó @@-
> Trong vài trường hợp nếu gặp các thành phần cứng đầu chúng ta có thể thêm các thuộc tính "Cưỡng bức" **--force**
> 
```bash
$ docker rmi $(docker images -q) --force
```