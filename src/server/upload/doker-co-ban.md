# 1. Giới Thiệu Docker 
- Docker là một nền tảng để cung cấp cách để building, deploying và running ứng dụng dễ dàng hơn bằng cách sử dụng các containers (trên nền tảng ảo hóa). Ban đầu viết bằng Python, hiện tại đã chuyển sang Golang.
![1a23.png](https://images.viblo.asia/70f1a080-cadf-4fc5-9871-3a30b1829297.png)
- Open source project
- Giúp đóng gói các ứng dụng  vào trong các thùng chứa (container) để building và run ứng dụng một cách dễ dàng và tiện lợi, không phụ thuộc vào môi trường
- Các lập trình viên trên thế giới đều có một nhận xét chung và tích cực nhất về docker là “nhanh”,“nhẹ” và “gọn”
- Lịch sử ra đời 
    + Solomon Hykes bắt đầu tạo ra Docker khi làm việc ở Pháp trong một dự án nội bộ của dotCloud, (theo wikipedia)
    + Bản Release open source đầu tiên ra mắt vào 03/2013
    + Vào ngày 13 năm 2014, với phiên bản 0.9, Docker bỏ đi LXC và thay thế nó với thư viện của mình là libcontainer được viết bằng ngôn ngữ Go (Golang)
- Repository docker trên Github!
![a2.png](https://images.viblo.asia/dc61e076-3c0b-4d28-a407-3264a17e655a.png)[a1.png](https://images.viblo.asia/1280f9cf-0837-4c22-96a9-39e5e5ff0f3f.png)
- Tốc độ tang trưởng của docker (GMO)
![Đang tải lên a2.png…]()
#  2. Một số khái niệm căn bản của Docker
- Docker Engine: bộ open source mô phỏng hóa container kết hợp với tools để build và run container
- Docker Image: Thành phần cốt lõi của docker là phần cơ bản để build lên container và từ các container sẽ build lên các application, các docker image sẽ được share lên docker hub
- Docker Container: được tạo ra từ docker images 
    + Cách tạo 1 container từ command :
        Docker run ubuntu:18.04
        Ở đây mình chạy 1 container để build hệ điều hành ubuntu phiên bản 18.04 
        Nếu trong máy tính cá nhân thì docker sẽ chạy container và build lên hệ điều hành ubuntu.
        Nếu không có docker sẽ tự pull image ubuntu từ docker hub về và build 
            ![a3.png](https://images.viblo.asia/3b2a406d-3425-481c-ab87-d04631a2157a.png)
- Dockerfile: 
    + Là file config cho Docker để build ra image. Nó dùng một image cơ bản để xây dựng lớp image ban đầu. Một số image cơ bản: python, unbutu and alpine. Sau đó nếu có các lớp bổ sung thì nó được xếp chồng lên lớp cơ bản. Cuối cùng một lớp mỏng có thể được xếp chồng lên nhau trên các lớp khác trước đó.
    + Là một file chứa các thông tin hệ thống để build ra 1 image để chạy container và đóng gói my application
    + Đây là nội dung của 1 file dockerfile
- Docker Hub: Là kho chứa của docker dùng để chứa các image để build container
- Docker Cloud
- Docker orchestration

# 3. Các config trong dockerfile
- FROM — chỉ định image gốc: python, unbutu, alpine…
- LABEL — cung cấp metadata cho image. Có thể sử dụng để add thông tin maintainer. Để xem các label của images, 
- dùng lệnh docker inspect.
- ENV — thiết lập một biến môi trường.
- RUN — Có thể tạo một lệnh khi build image. Được sử dụng để cài đặt các package vào container.
- COPY — Sao chép các file và thư mục vào container.
- ADD — Sao chép các file và thư mục vào container.
- CMD — Cung cấp một lệnh và đối số cho container thực thi. Các tham số có thể được ghi đè và chỉ có một CMD.
- WORKDIR — Thiết lập thư mục đang làm việc cho các chỉ thị khác như: RUN, CMD, ENTRYPOINT, COPY, ADD,…
- ARG — Định nghĩa giá trị biến được dùng trong lúc build image.
- ENTRYPOINT — cung cấp lệnh và đối số cho một container thực thi.
- EXPOSE — khai báo port lắng nghe của image.
- VOLUME — tạo một điểm gắn thư mục để truy cập và lưu trữ data.
# 4. Các lệnh cơ bản trong Docker
- List image/container: $ docker image/container ls 
- Delete image/container: $ docker image/container rm <tên image/container > 
- Delete all image hiện có: $ docker image rm $(docker images –a –q) 
- List all container hiện có: $ docker ps –a 
- Stop a container cụ thể: $ docker stop <tên container> 
- Run container từ image và thay đổi tên container: $ docker run –name <tên container> <tên image> 
- Stop all container: $ docker stop $(docker ps –a –q) 
- Delete all container hiện có: $ docker rm $(docker ps –a –q) 
- Show log a container: $ docker logs <tên container> 
# 5. Cài đặt Docker
- Chạy lệnh sau: Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
- Ta vào trang chủ google và gõ:
![a4.png](https://images.viblo.asia/cd862b60-ac8f-4ed1-b95b-6fcc15caa970.png)
- Và ta sẽ chọn cái đầu tiên và sau khi vào được trang chủ của docker thì ta sẽ click vào:
- Nhớ là đăng nhập hoặc đăng kí nếu chưa có tài khoản nhé:
![a5.png](https://images.viblo.asia/7c902bb3-85ee-4b1d-b850-ee205dec87a9.png)
- Tiếp  là ta đi theo đường dẫn này nhé: https://hub.docker.com/editions/community/docker-ce-desktop-windows và chọn
- Sau khi tải về thì ta click vào để cài đặt nhé cứ next thôi thế là chúng ta đã hoàn thành việc cài đặt docker rồi nhé
![a6.png](https://images.viblo.asia/1688b387-963c-4c23-b727-269f22127e4c.png)

# 6. docker compose 
- Tool để quản lý nhiều container cùng lúc
- Chức năng :
 + Bảo vệ các volumes khi start, stop các containers 
 + Chỉ tạo lại container khi có thay đổi (docker-compose.yml)
 + Thiết lập các biến môi trường   
![a7.png](https://images.viblo.asia/3aaece93-eaf6-4eaa-b33e-fb5d9b6aeacf.png)
Giải thích trong file compose
![vd.png](https://images.viblo.asia/217caa1d-1392-4a36-9676-092bef16cd12.png)