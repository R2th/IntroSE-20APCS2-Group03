# 1. Docker là gì?
Docker là một nền tảng để cung cấp cách để building, deploying và running ứng dụng dễ dàng hơn bằng cách sử dụng các containers (trên nền tảng ảo hóa) để đóng gói ứng dụng.
# 2. Các thành phần chính của Docker
**. Docker images:** nó là cấu trúc chính của Docker Container. Nó bao gồm tất cả những thứ cần thiết để dự án của bạn có thể chạy được như một hệ điều hành hay các dependencies. Các Image được chia sẻ công khai ở Docker Hub để tất cả mọi người có thể cùng nhau sử dụng và phát triển.

**. Docker container:** là đơn vị phần mềm cung cấp cơ chế đóng gói ứng dụng, mã nguồn, thiết lập, thư viện... vào một đối tượng duy nhất. Nó là một môi trường hoàn hảo cung cấp mọi thứ để chương trình có thể hoạt động được, không chịu sự tác động từ môi trường của hệ thống cũng như không làm ảnh hưởng ngược lại về phía hệ thống chứa nó.

**. Dockerfile:** Là một file dạng text không có phần đuôi mở rộng, chứa các đặc tả về môi trường thực thi phần mềm, cấu trúc cho Docker image. Docker image có thể được tạo ra tự động bằng cách đọc các chỉ dẫn trong Dockerfile. Từ những câu lệnh đó, Docker sẽ build ra Docker image

**. Dockerhub:** là dịch vụ cloud lưu trữ các image của các cá nhân hoặc công ty. Nó cho phép người dùng sử dụng và phát triển
# 3.Lợi ích của Docker
**.** Trước đây, việc setup và deploy application lên một hoặc nhiều server rất vất vả từ việc phải cài đặt các công cụ, môi trường cần cho application đến việc chạy được ứng dụng chưa kể việc không đồng nhất giữa các môi trường trên nhiều server khác nhau.

**.** Docker cho phép các developers tạo các môi trường độc lập và tách biệt để khởi chạy và phát triển ứng dụng và môi trường này được gọi là container. Khi cần deploy lên bất kỳ server nào chỉ cần run container của Docker thì application của bạn sẽ được khởi chạy ngay lập tức.

# 4.Cách tạo Docker Image từ Dockerfile 
Một số câu lệnh trong Dockerfile

**. FROM <base_image>:<phiên_bản>:** đây là câu lệnh bắt buộc phải có trong bất kỳ Dockerfile nào. Nó dùng để khai báo base Image mà chúng ta sẽ build mới Image của chúng ta.

**.MAINTAINER <tên_tác_giả>:** câu lệnh này dùng để khai báo trên tác giả tạo ra Image, chúng ta có thể khai báo nó hoặc không.

**. RUN <câu_lệnh>:** chúng ta sử dụng lệnh này để chạy một command cho việc cài đặt các công cụ cần thiết cho Image của chúng ta.

**.CMD <câu_lệnh>:** trong một Dockerfile thì chúng ta chỉ có duy nhất một câu lệnh CMD, câu lệnh này dùng để xác định quyền thực thi của các câu lệnh khi chúng ta tạo mới Image.

**.ENTRYPOINT <câu_lệnh>:**  định nghĩa những command mặc định, cái mà sẽ được chạy khi container running.

Để tạo ra một image từ Dockerfile, chúng ta tạo một thư mục rỗng. Tạo một file tên Dockerfile nội dung như sau:
![](https://images.viblo.asia/03c6ec35-6bc0-4124-9ec9-6d01baacfd09.png)
Build image từ Dockerfile đã tạo :

Với Dockerfile đã tạo ở trên, chúng ta có thể tiến hành build một image. Các bạn trỏ đường dẫn đến thư mục lưu Dockerfile và gõ lệnh: **docker build -t ubuntu:v1 -f Dockerfile .**

Sau khi build thành công, thực hiện run image bằng lệnh:**docker run --name ubuntu-v1 93b103068d3f**
# 5.Cách tạo Docker Image trên Docker Hub
1. Tạo tài khoản và đăng nhập vào trang hub.docker.com
1. Tìm và click Create Repository
1. Điền các thông tin cần thiết và chọn public
1. Đăng nhập Docker Hub bằng command line:
    
    **docker login --username=<your_docker_hub_username>**
3. Kiểm tra ID của image cần sử dụng:

    **docker images**
    
    Nếu image chưa được gắn tag thì hãy gắn tag cho nó bằng câu lệnh:
    
    **docker tag <image_id> <your_hub_username>/<your_repository>:<tag>**
5. Để đưa Image lên Docker Hub bạn cần sử dụng câu lệnh:
     
    **docker push <your_hub_username>/<your_repository>:tag_name**

# Tổng kết:
    
   Trong bài viết này mình đã giới thiệu cơ bản về docker cùng một số khái niệm quan trọng như Dockerfile, Docker Images, Docker Container... Mình rất mong nhận được sự góp ý từ mọi người.