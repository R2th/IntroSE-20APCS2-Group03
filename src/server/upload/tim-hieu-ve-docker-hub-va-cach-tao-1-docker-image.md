![](https://images.viblo.asia/c0004cd9-86e7-468d-a9af-a5c33309db60.jpg)

Github chắc anh em chẳng lạ gì rồi, vậy Docker Hub là gì? liệu Hub trong "Docker Hub" và "hub" trong "github" có giống nhau không? Cùng mình tìm hiểu nhé :) 

### 1. Docker Hub

**Docker Hub** là một dịch vụ do Docker cung cấp, cho phép tìm kiếm và chia sẻ các container images. Các tính năng chính của Docker Hub là:

* ***Repositories***: Push và pull container images.
* ***Teams & Organizations***: Quản lý quyền truy cập vào private repositories của container images.
* ***Official Images***: Pull sử dụng container images chất lượng cao của Docker.
* ***Publisher Images***: Pull và sử dụng container images được cung cấp bởi vendors khác.
* ***Builds***: Tự động tạo container images từ GitHub và Bitbucket. Push chúng lên Docker Hub.
* ***Webhooks***: Kích hoạt các actions sau khi push thành công một repository lên Docker Hub với các dịch vụ khác.

Để sử dụng Docker Hub, bạn hãy đăng ký một tài khoản tại [đây](https://hub.docker.com/).

Nếu máy tính của bạn chưa cài đặt docker thì có thể cài đặt bằng cách xem hướng dẫn tại [đây](https://www.docker.com/get-started), hoặc đọc[ bài viết này](https://viblo.asia/p/bJzKmXeE59N) của mình :)

Còn nếu mãy tính của bạn đã cài docker, bạn hãy mở terminal và chạy lệnh:
```
docker login
```
sau đó nhập username và passwork.
Nếu kết quả bạn nhận được là 
```
Login Succeeded
```
thì oke đó. Giờ chúng ta có thể tạo các docker images rồi.

### 2. Tạo một Docker Image
Đầu tiên, chúng ta cần tạo 1 repository trên Docker Hub, đây sẽ là nơi lưu trữ image của chúng ta.

Để tạo repository, bạn hãy đăng nhập Docker Hub và truy cập trang: https://hub.docker.com/repository/create 

Ví dụ ở đây mình đã tạo 1 repository có tên là **2020-09-test**

![](https://images.viblo.asia/746395b8-a444-4ba8-813e-ea3caa016c60.png)

Giờ mình sẽ hướng dẫn các bạn cách để tạo 1 image dưới local và push nó lên repository. Cực ký đơn giản thôi.

Trước hết, chúng ta sẽ tạo 1 Dockerfile
```
cat > Dockerfile <<EOF
FROM busybox
CMD echo "Hello world! This is 2020-09-test."
EOF
```
Một file Dockerfile sẽ được tạo ra như vậy
```php
-rw-r--r--  1 user   68 Th09 11 14:29 Dockerfile
```
Thử build nào
```
$ docker build - < Dockerfile
Sending build context to Docker daemon  3.072kB
Step 1/2 : FROM busybox
latest: Pulling from library/busybox
df8698476c65: Pull complete 
Digest: sha256:d366a4665ab44f0648d7a00ae3fae139d55e32f9712c67accd604bb55df9d05a
Status: Downloaded newer image for busybox:latest
 ---> 6858809bf669
Step 2/2 : CMD echo "Hello world! This is 2020-09-test."
 ---> Running in 9df65757d429
Removing intermediate container 9df65757d429
 ---> 9736d7eb35b9
Successfully built 9736d7eb35b9
```
Vậy là chúng ta đã tạo được 1 image trên local có id là `9736d7eb35b9`. Thử run image nha:
```
$ docker run 9736d7eb35b9
Hello world! This is 2020-09-test.
```
Vậy là image của chúng ta đã chạy với CONTAINER ID là `c2c4f119039a`.  
```
docker ps -a.
CONTAINER ID        IMAGE               COMMAND                   CREATED             STATUS                     PORTS               NAMES
c2c4f119039a        9736d7eb35b9        "/bin/sh -c 'echo \"H…"   2 minutes ago       Exited (0) 2 minutes ago                       epic_dhawan
```
Giờ thì commit và push image lên Docker Hub thôi nào :)
```
$ docker commit c2c4f119039a latest
$ docker tag latest:latest haihachan/2020-09-test
$ docker push haihachan/2020-09-test:latest
```

Kết quả sau khi push xong thì chúng ta đã có 1 image với tagname là **latest**

![](https://images.viblo.asia/7563c7df-a323-45cc-99ff-8816de664db0.png)

Giờ thì pull về và dùng thử xem sao ha :)
```
$ docker pull haihachan/2020-09-test:latest 
latest: Pulling from haihachan/2020-09-test
Digest: sha256:4a6173ad3154afd5eeb54916173acbb8d1dad04296a21d7d44f5f4b077c60f12
Status: Image is up to date for haihachan/2020-09-test:latest
```
```
$ docker images
REPOSITORY                            TAG                 IMAGE ID            CREATED             SIZE
haihachan/2020-09-test                latest              721106855c17        20 minutes ago      1.23MB
```

Ngon rôì nhé, thử chạy image nào:
```
$ docker run haihachan/2020-09-test
Hello world! This is 2020-09-test.
```

Có vẻ đơn giản ha. Nhưng mà để tìm hiểu sâu hơn thì bạn hãy tìm hiểu ở [đây](https://docs.docker.com/engine/reference/commandline/push/) nhé. [Document](https://docs.docker.com/docker-hub/) của Docker Hub thực sự rất lừa người dùng :joy::joy::joy:
### 3. Tạo một Docker Image với repo Github
Ngoài cách push như mục 2, chúng ta cũng có thể connect repository của Docker Hub với Github. Sau đó, thay vì push image lên Docker Hub, chúng ta có thể push code lên github,  và build image trên giao diện của Docker Hub. 

Đầu tiên, bạn cần connect tài khoản Github trên Docker Hub tại đây:
https://hub.docker.com/settings/linked-accounts

Sau khi đã connected, bạn vào repository, chọn tag Builds:

![](https://images.viblo.asia/f7f85b32-a373-496b-a85a-5022ccc6a796.png)

Sau khi click vào biểu tượng của Github, bạn hãy chọn repo muốn lưu source code cho image của bạn:

![](https://images.viblo.asia/ddad19b4-118e-4a91-b0e9-46cd421b3719.png)

Click Save and Build, vậy là source code trên Github của bạn sẽ được build thành image. Quá dễ đúng không nào.

Hi vọng là bài viết này có ích với bạn, mình sẽ tìm hiểu và chia sẻ thêm với các bạn về các command docker cần biết trong bài sau nhé (vì nhiều lệnh quá). Hẹn gặp lại bạn trong những bài viết tiếp theo.

Tài liệu tham khảo:

https://docs.docker.com/docker-hub/

https://docs.docker.com/engine/reference/commandline