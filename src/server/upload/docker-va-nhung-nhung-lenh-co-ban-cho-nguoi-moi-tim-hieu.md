XIn chào các bạn, hôm nay mình sẽ cùng nhau tìm hiểu một chút về docker xem vì sao cần docker, docker gồm những thành phần chính nào, và các lệnh cơ bản với docker. Trong bài viết này mình sẽ chủ yếu nói về các câu lệnh cơ bản cho người mới bắt đầu sử dụng docker. Bắt đầu luôn nhé :D
# Vì sao cần Docker
![ảnh.png](https://images.viblo.asia/6032f39a-c7cc-45b4-9b8d-7df30e366c3d.png)

Về phần docker là gì thì các bạn lên trên [document](https://docs.docker.com/) của `Docker` để tìm hiểu thêm nhé. Vì bài viết này mình chủ yếu hướng đến các lệnh cơ bản của docker nên mình sẽ không đi sâu vào lý thuyết. Vậy tại sao cần sử dụng docker. Các bạn có thể hiểu đơn giản như thế này khi bạn phát triển ứng dụng cùng 1 team, mấy ông giàu giàu thì code trên mac, mấy ông  sinh viên mới đi làm thì code trên win, mấy ông chuyên nghiệp hơn mà chưa giàu thì code trên linux :D. Vấn để đặt ra ở đây là mỗi ông lại code trên một môi trường khác nhau, rồi các package trong dự án mỗi ông lại cài một version khác nhau sẽ dẫn đến trên máy này chạy còn máy kia thì không. Hay đơn giản là có một người mới vào dự án phải mất rất nhiều thời gian để đi cài project setup môi trường, rồi đến các version package...., Vì thế cần có một có một cái để đóng gói ứng dụng của chúng ta khi cần chúng ta chỉ cần lôi nó ra và chạy, chúng ta sẽ chạy được ứng dụng với các package đúng phiên bản và cũng chẳng cần phải cài thêm môi trường gì cho ứng dụng cả. Thì đó docker ra đời để giải quyết được vấn đề trên.
# Các khái niệm cơ bản 
**Docker images**: là file chỉ có thể đọc, images chứa các files  cấu hình để cần thiết để tạo nên hệ điều hành (Windows,  Ubuntu, …) hay các môi trường lập trình được cài sẵn ( mysqld, nginx,  git, …).  Nó được lưu trữ ở trên local hoặc trên docker-hub.

**Docker container**: là một instance của một image, mỗi container được tạo từ image.  Chúng ta  có thể create, start, stop, move, delete container 

**Docker network**: Docker network có nhiệm vụ kết nối mạng giữa các container với nhau, có thể trên một hoặc nhiều host hoặc kết nối giữa container với bên ngoài.

**Docker volume**: Docker volume là một volume được tạo ra cho phép các container mount volume vào trong các container hay dễ hiểu hơn là docker sử dụng Volume đó thay thế cho 1 folder của container. 

**Docker-hub**: Nếu các bạn đã sử dụng git thì chắc chắn là biết đến github rồi. thì `docker-hub` ở đây cũng tương tự, là một dịch vụ do Docker cung cấp, cho phép tìm kiếm và chia sẻ các container images.

# Các lệnh cơ bản 
### Pull image
Để download một image thì chúng ra sử dụng lệnh
```
docker pull image-name
```
vd mình muốn tải image `nginx` xuống thì chỉ cần chạy 
```
docker pull nginx
```
### Chạy Container
Tải image xuống rồi thì phải tạo vào chạy container chứ nhỉ 
```
docker run thamso Image command thamsolenh
```
Ví dụ  chạy container từ image vừa pull xuống ở trên 
```
docker run -it -p 8080:80 nginx
```
**-it**: là `interactive terminal`  nghĩa là nó sẽ chạy trong terminal của chúng ta.
 Tiếp theo sẽ lấy ra một cái port để truy cập vào, ban đầu sẽ là 8080 và port bên trong container `nginx` là 80. cuối cùng là tên image là `nginx`.
 
 Bây giờ mở trình duyệt ra và truy cập vào `http://localhost:8080` xem có gì k nhé. Vậy là chúng ta đã tạo được  1 serve nginx trên máy của chúng ta rồi
 ![Screenshot from 2021-08-19 21-38-34.png](https://images.viblo.asia/b9907abf-e36d-451a-9ba3-d2229c7bce4a.png)
 
 ### Xem các container
 Để xem các container đang chạy, chỉ cần gõ lệnh
 ```
 docker ps
 ```
 ![Screenshot from 2021-08-19 21-44-43.png](https://images.viblo.asia/2c3de401-60ac-4f9a-a3d0-80f163a79665.png)
 
Sẽ có một sô thông tin như, id , name,  thời gian tạo,thời gian chạy, port..

Để xem chúng ta đang có những image nào thì bạn chỉ cần gõ 
```
docker images
```
![Screenshot from 2021-08-19 21-48-42.png](https://images.viblo.asia/2d72c9d6-3763-43d4-8216-2e498dee089e.png)

Bây giờ muốn dừng cái container chỉ cần
```
ctrl + c
```
Nếu các bạn chạy  container với tham số là `-d`  (detach). thì muốn dừng container các bạn cần chạy lệnh 
```
docker stop + id_container
```
có thể thay id bằng `name` của container
Bây giờ chúng ta gõ `docker ps` thì sẽ không thấy container `nginx` nữa.
Để xem tất cả các container đang chạy hay đã dừng thì chỉ cần gõ 
```
docker ps -a
```
Nếu muốn  khởi động lại container vừa stop ở trên bạn chỉ cần gõ 
```
docker start + id_container hoặc + name_container 
```
### Xóa container
để xóa container bạn chỉ cần chạy lệnh + id của container
```
docker rm + id_container
```
* Lưu ý: có thể xóa nhiều container cùng lúc, không thể xóa được các container đang chạy, muốn xóa bạn phải exit contaier đó đi trước khi xóa.

### Xóa image 
Tương tự như xóa container, lệnh xóa  image 
```
docker rmi + id_image
```
Cũng có thể xóa image bằng tên của image 
```
docker rmi + name_image
```
Lưu ý là chúng ta cũng không thể xóa được image khi mà image đó đang được sử dụng để chạy một container nào đó.
### Đặt tên cho container
Ở phần chạy container mình quên mất chưa nói đến phần đặt tên cho container. các bạn chỉ cần thêm tham số ` --name tênmuốnđặt tênimage`
Ví dụ mình muốn có container với tên là myNginx của image nginx thì chỉ cần chạy 
```
docker run -it -p 8082:80 --name myNginx nginx
```
### Vào bên trong 1 container
Để vào bên trong 1 container để xem các file bên trong của nó bạn có thể dùng lệnh 
```
docker exec -it + name_container bash 
```
Ví dụ mình muốn chui vào container myNginx vừa tạo ở trên 
```
docker exec -it myNginx bash 
```
rồi bây giờ các bạn có thể chạy ls -la để xem tất cả các file trong container đó

### Xem log của container
Chúng ta có thể xem log của container bằng lệnh 
```
docker logs + name_container
```
# Kết luận
Vậy là mình đã giới thiệu về docker cũng như những lệnh cơ bản nhất của nó, phần sau mình sẽ cũng tìm hiểu về `docker file`  rồi build một image trên local với dockerfile đó, và làm sao để push image  vừa taọ đó lên Docker Hub. Bài viết của mình đến đây là hết rồi, cảm ơn các bạn đã đọc nếu thây bài viết hữu ích thì hãy cho mình một upvote nhé. Cảm ơn các bạn