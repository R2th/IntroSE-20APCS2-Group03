Xin chào mn, cảm ơn các bạn đã đọc bài **[Docker cho người mới bắt đầu (Phần 1)](https://viblo.asia/p/docker-cho-nguoi-moi-bat-dau-phan-1-4P856Lk1ZY3)** của mình ạ (love2). Trong phần trước mình chủ yếu giới thiệu về mặt lý thuyết các khái niệm của Docker và trong bài nì mình sẽ giới thiệu kĩ hơn về Dockerfile và cách pull/build 1 Image trên DockerHub nhé! 
# Dockerfile
![](https://images.viblo.asia/4d0e89df-757c-43fc-bf10-c20f9286235d.png)

## Cấu hình một file Dockerfile
Trước khi viết được Dockerfile thì chúng ta tìm hiểu qua các chỉ thị (instruction) trong Dockerfile đã nhé:

Một Dockerfile phải bắt đầu bằng chỉ thị **FROM** để khai báo parent image nào sẽ được sử dụng để làm nền tảng xây dựng image của riêng bạn.
* **FROM**: Dùng để chỉ ra image được build từ đâu (từ image gốc nào), chỉ thị này phải được đặt trên cùng của Dockerfile. Ví dụ:
    ```
    FROM ubuntu:16.04
    ```

    Khi Docker đọc tới câu lệnh này, nó sẽ tự động tìm xem image ubuntu:16.04 này đã tồn tại trong máy chưa, nếu chưa thì Docker sẽ tự động pull image này từ DockerHub về.
    Như mn cũng biết DockerHub là một thư viện chứa rất nhiều các docker images, trong đó  có các images gốc. Từ các images gốc này chúng ta có thể chỉnh sửa, thêm bớt, cấu hình,.... tạo ra các images riêng cho bản thân.

* **MAINTAINER**: Chỉ thị này là tùy chọn, bạn có thể đưa vào hoặc không. Nó dùng để khai báo thông tin của tác giả xây dựng lên images. Ví dụ như mình có khai báo sau
    ```
    MAINTAINER NguyenNgoc <nguyenngoc.hust.97@gmail.com>
    ```

*  **RUN**: Chỉ thị này dùng để thực thi một số câu lệnh trong quá trình build image. Ví dụ:
    ```
    RUN apt-get update
    ```
* **ENV**: Định nghĩa các biến môi trường
*  **CMD**: Khác với **RUN** chỉ thị này cũng dùng để chạy một số câu lệnh, tuy nhiên nó sẽ được thực thi trong quá trình build container.
    ```
    CMD [service nginx start]
    ```
* **ENTRYPOINT**: Thực thi một số câu lệnh trong quá trình start container, những câu lệnh này sẽ được viết trong file .sh. 
*  **WORKDIR**: Thiết lập thư mục làm việc hiện tại cho các chỉ thị CMD, ENTRYPOINT, ADD thi hành.
*  **VOLUME**: Chỉ thi tạo một ổ đĩa chia sẻ được giữa các container.
    ```
    VOLUME /docker_demo
    ```
* **EXPOSE**: Thông báo cho Docker rằng image sẽ lắng nghe trên các cổng được chỉ định khi chạy. Lưu ý là cái này chỉ để khai báo, chứ ko có chức năng nat port từ máy host vào container. Muốn nat port, thì phải sử dụng cờ -p (nat một vài port) hoặc -P (nat tất cả các port được khai báo trong EXPOSE) trong quá trình khởi tạo contrainer.
* **ADD** : Copy file, thư mục, remote file thêm chúng vào filesystem của image.
* **COPY** : Copy file, thư mục từ host machine vào image. Có thể sử dụng url cho tập tin cần copy.
## Cách viết một Dockerfile
![](https://images.viblo.asia/e3e5313b-99ae-49cf-958e-e5ec10dea2dc.png)

Mình sẽ demo một ví dụ cài nginx, thiết lập trên môi trường ubuntu:16.04 ạ. Ngoài ra các bạn có thể cài php, mysql,....
### B1: Chuẩn bị
* MÌnh tạo 1 file Dockerfile để thiết lập cấu trúc cho docker image
* Tạo 1 file start.sh chứa các câu lệnh khi khởi chạy container VD (start nginx, mysql, apache ,....) file này có thể có hoặc không.
* 1 thư mục project demo (docker_test), ở đây đơn giản bên trong project mình chỉ tạo 1 file hello.html. Các bạn có thể tạo 1 project laravel, ruby,..... File có nội dung như sau:
    ```
    <h2>Hello , My name is Ngoc Nguyen</h2>
    ```
### B2: Chi tiết
- Giả sử mình có 1 file Dockerfile  cài ngixn trên môi trường ubuntu:16.04 như sau:

 ![](https://images.viblo.asia/ae31e340-3e54-4c95-960b-cdcb53b1fe8c.PNG)

   Bạn có thể cài nginx, php, python, ruby, java ... phụ thuộc vào nhu cầu của bạn, sử dụng.

- Và có 1 file start.sh thực thi trong quá trình chạy container:

![](https://images.viblo.asia/12891653-0325-4aef-9cf7-3c8a0da1eb09.PNG)

- Xong gòy, giờ mình sẽ build image này nhé, để build 1 docker images bạn chạy lệnh
    ```
    sudo docker build -t ubuntu-nginx . 
    ```
Và để xem các list các images đang có bạn chạy câu lệnh này:
    ```
    sudo docker images
    ```
Đợi một xíu, khi nó chạy xong, sau đó bạn kiểm tra báo như mình thì oki nha
![](https://images.viblo.asia/3326d67b-ab13-4ab8-bee4-562bcb100aa1.png)

- Tạo container từ image
    ```
    sudo docker run -p 9000:80 -it ubuntu-nginx /bin/bash
    ```
Kiểm tra log trên terminal:
![](https://images.viblo.asia/4598937a-bc3f-41f0-8320-a5902e91139b.png)

Trên trình duyệt
![](https://images.viblo.asia/ba05d4bf-07b0-41b4-b8bf-f6928a53d2e0.png)

Như vậy là chúng ta đã build thành công container từ file Dockerfile rồi đó ạ :D :D :D
Tiếp theo bạn vào thư mục project nãy mình tạo và chạy lệnh sau:
    ```
    sudo docker run -v /home/framgia/Desktop/docker_test:/var/www/html -p 9000:80 -it ubuntu-nginx /bin/bash
    ```

Trong đó:
* -p 9000:80 : container chạy trên cổng 9000 của host machine
* -v /home/framgia/Desktop/docker_test:/var/www/html : Thư mục project ở trên host machine sẽ được rewrite vào thư mục /var/www/html ở trong container. 
Sau đó bạn mở trình duyệt lên http://localhost:9000/hello.html và thu được kết quả::joy::joy::joy:

![](https://images.viblo.asia/7320a5e0-e2c9-4a11-a9ce-07b09375d4a2.png)

# DockerHub
DockerHub là một thư viện chứa rất nhiều các images bao gồm các images gốc như ubuntu:16.04 khi nãy mình sử dụng nè. DockerHub hỗ trợ chúng ta build images trên server, ở đây chúng ta cũng có thể pull/push 1 image.
Vì nó là một thư viện rất lớn, thông thường đa số mình hay pull các images về hơn hì hì :D
## Cách build một imgae trên DockerHub
1. Tạo 1 repo trên Github cá nhân, ví dụ ở đây mình có tạo một repository demo-docker như sau:

![](https://images.viblo.asia/73ca0f7b-9fe5-4dcb-b750-11644544be67.PNG)

2. Sau đó mình vào trang chủ [dockerHub](https://hub.docker.com/) đăng ký một account cá nhân. Và cũng tạo 1 Repositories trên nì nha

![](https://images.viblo.asia/ee3b02fd-4705-4db6-b0a4-35f510841cae.PNG)

Giờ đây ta có một Repositories như sau:

![](https://images.viblo.asia/c8e88365-e165-4cb7-92a8-40238e02dfb8.PNG)

4. Build images online

Dockerhub sẽ hỗ trợ bạn build docker image online, sau đó bạn có thể pull nó về để sử dụng.

Vào tab Build và setting cho nó, ở đây bạn chọn map với repository demo-docker trên Github khi này mình create nha.

Quá trình build sẽ mất một ít time, đôi khi build ở dưới local pass nhưng lên DockerHub bị fail (yaoming). Và đây là kết quả nè mn ting ting

![](https://images.viblo.asia/4bcf87d4-bdf9-45a6-b47b-b9c50cb919ec.png)

À giờ đây mỗi khi bạn thay đổi file Dockerfile và đẩy lên repository (demo-docker) trên GitHub thì images sẽ auto build lại trên DockerHub ạ hihi

 Để sử dụng các images khác các bạn có thể tìm và pull nó về nhé
     ````
     docker pull <name_image>
     ````
 
 ![](https://images.viblo.asia/bbb7749e-042c-40ab-a3e1-1efeee7c2589.PNG)
 
 # Kết luận
 Trên đây là bài viết chia sẻ cách viết 1 file Dockerfile và cách build/pull một image từ Dockerhub, cảm ơn mọi người đã đọc ạ :heart_eyes::heart_eyes::heart_eyes::heart_eyes:
 Và để tiếp tục series Docker thì bài sau mình sẽ cùng nhau tìm hiểu về tại sao nên dùng **docker-compose** và cách sử dụng nó nhé ạ!