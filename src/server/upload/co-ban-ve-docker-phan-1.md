Chào mọi người,Hôm nay mình xin viết một bài trình bày một cách khái quát nhất về docker để mọi người có cái nhìn tổng quan trước khi bắt tay vào việc thực hành
# Docker là gì
Docker là một nền tảng dành cho developer và systemadmin dùng để build, run và share ứng dụng với một khái niệm gọi là Containers.  Việc sử dụng các Container để triển khai ứng dụng được gọi là Containerization. Docker ngày càng được sử dụng rộng rãi và phổ biến, bởi vì:

Linh hoạt : Ngay cả những ứng dụng phức tạp nhất cũng có thể được đóng gói.

Nhẹ : Không giống như máy ảo, Docker tận dụng và chia sẻ nhân máy chủ, làm cho chúng hiệu quả hơn nhiều hơn về tài nguyên.

Portable: Bạn có thể xây dựng ứng dụng và các dependency từ local, sau đó deploy lên cloud và chạy ở bất kỳ đâu...
# Slogan của Docker
## Build ship and deploy any application, any where
- Đóng gói phần mềm dễ dàng
- Deploy nhanh
- Không cần cấu hình và cài đặt môi trường rườm rà
# Kiến Trúc
Bức ảnh bên dưới minh họa kiến trúc của docker
![](https://images.viblo.asia/8367076c-e21c-4b13-9b92-a708b02bfb1b.png)
Docker được xây dụng dựa trên 3 thành phần chính:
- Docker daemon: daemon (server) nhận lệnh từ docker client thông qua CLI hoặc RestAPI
- Docker client: Có thể ở trên cùng một host hoặc khác host với docker daemen
- Docker registry (hub):  là một dịch vụ máy chủ cho phép lưu trữ các docker image của cá nhân, công ty, team,… Dịch vụ Docker Registry có thể được cung cấp bởi tổ chức thứ 3 hoặc là dịch vụ nội bộ được xây dựng riêng nếu bạn muốn. Một số dịch vụ Docker Registry phổ biến như : Azure Container Registry, Docker Hub...
# Image
Image là hạt nhân cơ bản của docker, được cấu hình với các ứng dụng cần thiết chạy bên trong của nó và là một template để tạo ra container. Nếu liên tưởng đến OOP, thì ta có thể xem docker image là class, còn docker container là object / instance của class đó!

Vì vậy nếu ta có 1 docker image trên máy, ta có thể tạo một hoặc nhiều container có môi trường bên trong chúng giống hệt nhau.
Nếu đã cài đặt thành công docker, chạy câu lệnh sau để xem các image hiện tại mình đang có:
```
docker images
```
![](https://images.viblo.asia/165d5d24-c079-4619-807e-174efad6b6c9.png)

Mình sẽ thấy một list các image hiện có kèm theo một số thông tin như:

Repository: nơi image được tạo ra, ở đây cũng có thể hiểu là tên của iamge

Tag: version của image

Image ID: ID của image
# Container
Một dạng runtime của các Docker image, dùng để làm môi trường chạy ứng dụng.
Để chạy một container từ image: 
```
docker run [tên image:version]
```

Tên image được lấy lấy từ trong list image mà mình lấy ở trên, nếu mình chỉ gõ tên image mà không truyền vào version thì mặc định nó sẽ chạy container với version mới nhất.
# Vòng đời
Ở hai phần trên mình đã nói về image và container, hai thành phần rất cơ bản của của docker và quy trình, vòng đời cũng sẽ xoay quanh 2 thành phần này.

Quy trình cơ bản của docker
![](https://images.viblo.asia/b0ee0818-3660-4054-b8b7-d94e8f69757d.png)

Từ dockerfile(cái này mình sẽ trình bày trong một bài khác) mình sẽ tạo ra image thông qua câu lệnh build, sau khi tạo ra được image, mình sẽ run được container thông qua lệnh run truyền vào tên image như đã giới thiệu ở phần trên.

Chặng thứ 2 trong vòng đời của docker, container sau khi được tạo ra từ image ban đầu, mình tiến hành thao tác trên container đó như cài thêm các phần mềm dependency chẳng hạn lúc này mình sẽ có một container có tất cả những thứ để mình chạy được một ứng dụng. 

Bước tiếp theo là sử dụng lệnh
```
docker image [container_id]
```
Lệnh này sẽ chuyển hóa một container thành  một image với nội dung y hệt như container lúc chạy câu lệnh commit, lưu ý là chuyển hóa từ container thành image chứ không phải là xóa bỏ hoàn toàn container đó.

Vậy mình có thể thấy hai lệnh **docker run** và **docker commit** đang bổ sung cho nhau.

- **Lệnh docker run truyền vào một image để tạo ta một container**
- **Lệnh docker commit thì ngược lại, truyền vào một container ID để chuyển hóa thành một image**

Để tóm tắt lại, mình có vòng đời của docker như sau:
![](https://images.viblo.asia/8d655a38-6215-4277-8432-16c239e19643.png)


# Cơ chế lưu trữ
   Docker sử dụng cơ chớ lưu trữ coppy on write. Thay vì nói là *tôi cần tạo một container*. thì sẽ nói là *tôi muốn tạo một bản sao từ khuôn mẫu có sẵn*. Bởi vì bản chất là mình tạo ta một container với một image có sẵn. Container được tạo ra ở một vùng lưu trữ riêng để thực thi việc ghi lại những thay đổi đó, vùng lưu trữ này độc lập với vùng lưu trữ image ban đầu, điều này lý giải vì sao thời gian khởi động một container lại nhanh đến như vậy.
# Một số lệnh docker thường dùng
```
docker create
```

Lệnh docker create tạo ra một container giống như lệnh docker run, tuy nhiên điểm khác biệt là nó không chạy container ngay từ đầu. Mà nếu muốn chạy thì mình sử dụng docker start như bênh dưới
```
docker start
```

3 lệnh tiếp theo

```
docker start/stop/restart
```
Những lệnh này thay đổi trạng thái của container bao gồm chuyển từ running sang stop và restart lại container.

```
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
```
Lệnh này dùng để coppy file hoặc folder từ local machine sang container và ngược lại. Áp dụng cho cả container đã stop hoặc đang running đều được.
```
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```
Lệnh này dùng để xóa một hoặc nhiều container theo name hoặc ID
Lưu ý là trước khi xóa bạn cần chắc chắn rằng container đó đã được dừng.

```
docker logs [OPTIONS] CONTAINER
```
Lệnh này để xem ouput của container sau khi container đã chạy xong.
# Export và import image
Docker cũng có hỗ trợ sao lưu và phục hồi image ở máy local mà không cần phải tương tác với registry. Điều này rất thuận tiện khi mình muốn đưa image đến khách hàng  mà không muốn upload lên registry thông qua 2 lệnh
```
docker save [OPTIONS] IMAGE [IMAGE...]
```

Lệnh này sẽ export một hoặc nhều image và nén lại thành một file duy nhất, ví dụ:

```
docker save -0 backup-image.tar.gz ubuntu:lastest
```
Nó có nghĩa là mình export một image  ubuntu với version mới nhất vào trong file nén có tên là  backup-image.tar.gz

sau khi gửi file nén này cho người khác hoặc lưu trữ trên máy local, muốn load nó ra để sử dụng thì chạy lệnh:
```
docker load [OPTIONS]
```
ví dụ:
```
docker load backup-image.tar.gz
```

Lúc này các bạn sẽ thấy image ubutu với version mới nhất mà mình đã export ở trên.
# Tóm tắt
Ở scope bài này mình chỉ focus vào hai cái nền tảng  quan trọng của docker là Image và Container, thao tác thành thạo với 2 thành phần này là nền tảng để tiếp cận với những phần nâng cao mà mình sẽ trình bày trong bài sau. Trong bài sau mình sẽ nói về dockerfile, docker composer và cách push một image lên Registry. Nếu bài viết còn thiếu xót mong các bạn góp ý, cảm ơn mọi người đã đọc!
# Tài liệu tham khảo
https://docs.docker.com/get-started/overview/

https://www.youtube.com/watch?v=4UlA4MX9LUo&list=PLaAY5r3iMVfmyz21DmPNuc8Pnab6wl_do&index=1