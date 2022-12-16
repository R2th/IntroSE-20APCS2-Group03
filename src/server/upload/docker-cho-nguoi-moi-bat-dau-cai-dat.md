Chào các bạn như vậy là trong [bài trước](https://viblo.asia/p/docker-cho-nguoi-moi-bat-dau-gioi-thieu-gAm5yr9LKdb) mình đã giới thiệu về công nghệ ảo hóa containerlization với công cụ Docker trên hệ điều hành Ubuntu, trong bài viết này mình sẽ đi chi tiết về cách cài đặt và xem cách hoạt động của docker ra sao nhé.

# Cài đặt Docker

Docker có thể cài đặt trên các hệ điều hành như Linux, Windows, Mac. Do Docker cần truy cập vào phần kernel nên cài trên Linux thì không có vấn đề gì do linux là open source, còn đối với Windows và Mac, phần kernel của hệ điều hành này có những thứ private nên ta cần cài 1 máy ảo Linux trên máy thật và Docker hoạt động dựa trên máy ảo Linux đó.

Hiện tại Docker có 2 phiên bản, CE( dành cho nhà phát triển, nhóm nhỏ) và EE (dành cho doanh nghiệp). Dưới đây mình sẽ giới thiệu cài đặt đối với bản CE trên Ubuntu thông qua repository như sau:

Bước 1: Update các package và cài các package cần thiết

```
sudo apt-get update
sudo apt-get install \
apt-transport-https \
ca-certificates \
curl \
gnupg-agent \
software-properties-common
```

Bước 2: Thêm Docker’s official GPG key:
```
curl -fsSL --insecure https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
sau đó xác thực lại key bằng lệnh
```
sudo apt-key fingerprint 0EBFCD88
```
kết quả như này là xác thực xong
![](https://images.viblo.asia/64128de7-cd03-4bf6-9e45-acd65fc0b064.png)

Bước 3: Thêm Docker Repository

```
sudo add-apt-repository \
"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) \
stable"
```
Đợi 1 lát để cài đặt hoàn tất, sau đó tiến hành cài Docker
```
sudo apt-get update
sudo apt-get install docker-ce
```
Xác nhận kết quả cài đặt thành công bằng việc run image hello-world
```
sudo docker run hello-world
```
Và đây là kết quả nếu thành thành công
 ![](https://images.viblo.asia/d310d1de-46c4-4ccd-8348-361714fbf5d4.png)

# Cấu trúc và cách hoạt động của Docker
Docker sử dụng kiến trúc client-server. Docker client sẽ bắt liên lạc với các Docker daemon, các Docker daemon sẽ thực hiện các tác vụ build, run và distribuing các Docker container. Cả Docker client và Docker daemon có thể chạy trên cùng 1 máy vật lí, Docker client sẽ điều khiển các docker daemon thông qua socker hoặc RESTful API.

## Docker Daemon
Docker daemon chạy trên các máy host. Người dùng sẽ không tương tác trực tiếp với các daemon, mà thông qua Docker Client.
## Docker Client
Là giao diện người dùng của Docker, nó cung cấp cho người dùng giao diện dòng lệnh và thực hiện phản hồi với các Docker daemon.

## Docker images
Nếu bạn đã hiểu mối quan hệ giữa Class và Instance trong lập trình hướng đối tượng thì Docker images và Docker container cũng giống như vậy. Docker images là nền tảng của container, nó giống như bộ khuôn đúc ra container, nó sẽ tạo ra container khi thực hiện câu lệnh chạy image và mỗi container sẽ là 1 instance của image đó. Docker images gồm các files và settings được lưu và tái sử dụng trong các container, thường bao gồm hệ điều hành (Windows, CentOS, Ubuntu, …) và các môi trường lập trình được cài sẵn (httpd, mysqld, nginx, python, git, …).  Image là một template chỉ cho phép đọc, nó chỉ được chứa trong docker, ngoài việc tự tạo image dưới local, chúng ta cũng hoàn toàn có thể lưu trữ, download và sử dụng image của người khác trên [Docker hub](https://hub.docker.com/).
## Docker Container
Giống như 1 directory, một Docker container chứa mọi thứ chúng ta cần để chạy một app. Mỗi container được tạo từ Docker image. Tốc độ khởi chạy container nhanh hơn tốc độ khởi chạy máy ảo rất nhiều ( trung bình tạo ra một container với hệ điều hành riêng biệt là 2 giây thay vì với 10 phút cho một máy ảo như công nghệ ảo hoá truyền thống ). Docker container có thể có các trạng thái run, started, stopped, moved và deleted. 

## Docker engine
Docker Engine cung cấp đầy đủ các function để cho người sử dụng có thể làm việc được với Docker image và  Docker container. Để gọi đến các function này, người sử dụng có thể dùng gọi đến REST API của Docker, hoặc thực hiện thông qua giao diện conmand line (CLI – cấp cao hơn REST API). ví dụ: docker run image_name, etc ...
    
## Docker Hub
Là nơi để đẩy các Docker Image lên (nếu bạn muốn sử dụng kiểu phân tán). Là chỗ để push image lên theo đúng quy trình mà người ta sử dụng Docker. Các bạn có thể xem qua qui trình dưới đây :
![](https://images.viblo.asia/cbd2837a-b489-4833-a0e4-e3a20b6d8a77.png)
Có 3 bước chính :
```
Build -> Push -> Pull,Run
```
### Step 1: Build
Đầu tiên chúng ta sẽ tạo một dockerfile, trong dockerfile này chính là code của chúng ta.

Dockerfile này sẽ được Build tại một máy tính đã cài đặt Docker Engine.

Sau khi build ta sẽ thu được Container, trong Container này chứa bộ thư viện và ứng dụng của chúng ta.
### Step 2: Push
Sau khi có được Container, chúng ta thực hiện push Container này lên đám mây và lưu trữ ở đó. Việc push này có thể thực hiện qua môi trường mạng Internet
### Step 3:  Pull, Run
Bây giờ một máy tính muốn sử dụng Container chúng ta đã push lên đám mây (máy đã cài Docker Engine) thì bắt buộc máy phải thực hiện việc Pull container này về máy. Sau đó thực hiện Run Container này. 


Trên đây là những thành phần chính mà các bạn nên nắm được để có thể hiểu cơ bản, ngoài ra thì các bạn có thể tìm hiều về các khái niệm khác như Docker Toolbox, Docker Trusted Registry (DTR), Docker Machine, Docker Swarm, Docker Compose, Docker Registry, Docker Cloud để có thể nâng cao hơn kiến thức về docker.

# Một số câu lệnh cơ bản
- **docker ps**: Liệt kê các container đang chạy
    
    -a/-all: Liệt kê tất cả các container, kể cả đang chạy hay đã kể thúc.
    
    -q/-quiet: chỉ liệt kê ra id của các container.
  
 - **docker pull**


    `
    sudo docker pull image_name
    `

Hầu hết các image sẽ được tạo dựa trên các image cơ sở từ Docker Hub. Docker Hub chứa rất nhiều các image được dựng sẵn, mà ta có thể pull về và dùng mà không cần phải định nghĩa và cấu hình lại từ đầu. Để tải một image cụ thể hoặc một tập hợp image ta dùng docker pull.

- **docker run**

    chạy một container dựa trên một image mà ta có sẵn. Ta có thể thêm vào sau lệnh này một vài câu lệnh khác như -it bash để chạy bash từ container này.
    
    `
    docker run -it image_name /bin/bash
    `
    
    Ví dụ :
```
sudo docker pull ubuntu:16.04

sudo docker run -it ubuntu:16.04 /bin/bash
```

   => như vậy là đã dựng xong 1 môi trường ubuntu ảo, nhanh và đơn giản hơn nhiều so với tự cài ubuntu

- **docker build**

    build một image từ Dockerfile và context. 
    
    `
    docker build -t your_name_container
    `
    
 - **docker start**
 
    khởi động một container
    
    `docker start {new_container_name}`
    
  - **docker exec** 

    truy câp vào container đang chạy
    
    `docker exec -it {container_name} /bin/bash`
    
  - **docker stop**

    stop một hoặc nhiều container
    
    `docker stop <list_container_name_or_id>`

    
- **docker rm**

    để xóa một hoặc nhiều container

    `
    docker rm -f <list_container_name_or_id>
    `

- **docker images**

     liệt kê các images hiện có
 
- **docker rmi**

  Xóa một image
  
  `docker rmi <list_image_id>`
  

Vậy là bài này mình đã giới thiệu cách cài đặt, một số thành phần quan trọng cũng như các câu lệnh cơ bản để làm việc với Docker. Trong phần tiếp theo mình sẽ đi chi tiết vào việc xây dựng một docker file. Hy vọng bài viết này giúp ích cho mn.

Nguồn tham khảo : 
- https://docs.docker.com
- https://www.google.com.vn