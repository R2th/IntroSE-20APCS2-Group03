# Xin chào các mọi người. Phần này là một trong các phần quan trọng khi tìm hiểu về Docker - Docker Compose
## I. Docker compose là gì
Khi sử dụng contaier để chạy một project thì thường sẽ phải dùng tới nhiều contaienr, từ đó phát sinh vấn đề quản lý, cài đặt, cấu hình từng container sẽ khó khăn.
Docker compose sinh ra để xử lý vấn đề trên. Docker compose cho phép build and run multi-container đồng thời chỉ bằng một file thần thành. Đó là file docker-compose.yml.

Kiểm tra docker compose đã được cài trên máy chưa. Nếu đã được cài đặt thì sẽ hiển thị lên version đang được cài đặt hiện tại.

`docker compose version`                                                                                                                                 
![image.png](https://images.viblo.asia/473aa92c-5065-4175-8126-00fda2a4217d.png)

Trong trường hợp host chưa được cài đặt docker compose, bạn có thể tham khảo thêm phần cài đọc docker trong series về docker của mình **[DEVOPS] [Docker] Phần 1: Docker là gì?** ***VI. Cài đặt Docker*** trong **bước 7** có cài đặt gói docker-compose-plugin.

## II. Xây dựng một Docker compose
Để xây dựng một docker compose cần cho một project sẽ có các bước chính sau:
1. Chuẩn bị môi trường thực thi, xác định image sử dụng
2. Tạo file docker-compose.yml để định nghĩa các service
3. Chạy file docker-compose.yml

### 2.1. Chuẩn bị môi trường
Trong một project sẽ cần chạy một hoặc nhiều dịch vụ. Mỗi dịch vụ sẽ chạy trên một container riêng và sử dụng image tương ứng. Việc bạn cần làm là xác định chính xác tên image cũng như version bạn sẽ sử dụng. Bạn có thể tham khảo image trên trang hub.docker.com. Bạn sẽ thấy rất nhiều version cũng như hướng dẫn sử dụng image, license, environment.

Ví dụ như bạn muốn xây dựng một website bạn sẽ cần sử dụng 2 container cho wordpress và DB. Trong trường hợp bạn muốn thay đổi hoặc thêm các biến hoặc thay đổi gì đó. Bạn cần viết một dockerfile để mô tả các thay đổi và thực hiện build trong docker compose.

Trong bài này mình sẽ triển khai một ví dụ đơn giản là dựng 2 container server và client. Container server sẽ được build bằng dockfile để cài thêm ssh trên đó.

Bước 1: Tải image centos trừ trên Docker hub.\
`docker search centos`
![image.png](https://images.viblo.asia/772f09b7-2502-4309-88bd-019f2d79f2ca.png)
`docker pull centos:latest`
![image.png](https://images.viblo.asia/9e33fa2d-2b97-4d00-aa8c-730724b42853.png)

Bước 2: Tạo dockerfile cho container server.\
`touch dockerfile`
> FROM centos:v7.2\
> RUN yum -y update && yum -y upgrade && ping -c 4 8.8.8.8 && yum install -y openssh-server\
> RUN echo 'ssh installed!'\
> LABEL version="1.0"\
> USER root\
> CMD ["/usr/sbin/init"]
### 2.2. Cấu trúc file docker-compose.yaml
File docker-compose.yaml bao gồm 4 key chính (việc sử dụng đuôi file là .yml hoặc yaml là như nhau ). Trong đó version và services là key bắt buộc. Networks và Volumes có thể được định nghĩa hoặc không.

Bước 3: Tạo file docker-compose.yml

**Version**\
Có các loại version 1, 2, 3. Hiện tại thường sử dụng version mới nhất là 3.
![image.png](https://images.viblo.asia/94575865-7c0d-4f2c-b2d1-6de9149ce459.png)

**Services**\
Định nghĩa các service sẽ dùng tới. Mỗi service được định nghĩa và sau khi chạy Docker compose mỗi services sẽ chạy trên một container riêng biệt.
![image.png](https://images.viblo.asia/8b84d03f-1099-4663-a0a0-c1ab6a5d73ac.png)

Thiết lập các tham số trong services
1. Chỉ định image: bắt đầu bằng từ khóa **image** hoặc **build**. Đối với container server sử dụng dockerfile để build nên sử dụng thêm tham số *dockefile* để chỉ tên file build và *context* để chỉ đường link tới file build , container client sẽ sử dụng image gốc của ubuntu và version mặc định là latest.
2. Chỉ định volumes: bắt đầu bằng từ khóa **volumes**. Cấu hình volume *sharingtype1* đã được chỉ định trong phần **volumes**. Và chỉ có container server sử dụng volume, container client sẽ không sử dụng.
3. Chỉ định network: bắt đầu bằng từ khóa **networks**. Để lại giá trị tên network *mang90* đã được cấu hình trong phần **networks**. Cả 2 container đều sử dụng chung network.
4. Chỉ định environments: bắt đầu bằng từ khóa **environments**. Trong ví dụ đơn giản này sẽ chưa sử dụng tới.
5. Chỉ định ports: bắt đầu bằng từ khóa **ports**. Trong ví dụ đơn giản này sẽ chưa sử dụng tới.

**Networks**\
Định nghĩa các networks để các container sử dụng. Mỗi project cần định nghĩa một mạng sử dụng cho các container của một project đó. Điều này là cần thiết. Nếu không định nghĩa và hệ thống sẽ sử dụng mạng mặc định là bridge, đôi khi sẽ bị tình trạng conflict IP do khi docker compose down và chạy up lại sẽ sử dụng lại cùng một IP đã cấp cho các container đã bị remove khi thực hiện donw. Và bạn không thể remote từ xa vào container mới khi chạy up lại.

Cấu hình một mạng cho container server và client. Tên network *mang90* sẽ được nhắc lại trong phần services và là một tham số.         
![image.png](https://images.viblo.asia/8c1fcc50-0b92-4495-b033-71aa44e5b6ba.png)

**Volumes**\
Định nghĩa các volumes để các container sử dụng. Định nghĩa theo loại nào thì trong phần services các tham số volume sẽ trỏ theo loại định nghĩa đó.
Có 2 loại volume thường được sử dụng là:
1. Volume giữa host và container.                 
![image.png](https://images.viblo.asia/a37486bb-6084-407a-9056-6c7391a89c72.png)

3. Volume giữa container và container.     
![image.png](https://images.viblo.asia/8b335afb-995e-47f7-8c70-b9e9b9e03a9d.png)
Sẽ cần tạo trước volume trước khi chạy docker compose up. Nếu như chưa rõ bước tạo như thế nào các bạn có thể xem lại 
**[DEVOPS] [Docker] Phần 5: Docker Volume** trong series về Docker của mình.
### 2.3. Chạy Docker compose
Sau khi đã hoàn thành file docker-compose.yml ta sẽ có:             
![image.png](https://images.viblo.asia/f28b8153-bc7a-42f5-98e7-f18a86b0bb4f.png)

**Chạy bằng lệnh**\
`docker compose up`\
`docker compose up -d`\
![image.png](https://images.viblo.asia/12cb9316-374b-483c-8aa2-bd47f264c60e.png)\
Lệnh thêm cờ *-d* để các container sẽ chạy nền sau khi lệnh docker compose up chạy xong.

**Thêm cờ -f để chạy file docker compose khác với tên mặc định**\
`docker compose -f docker.yaml up -d`

**Khi các container được chạy nền với cờ -d và bạn muốn dừng các container**\
`docker compose stop`

 **Khởi động sau khi dừng các container**\
` docker compose start`

 **Khởi động lại các container**\
` docker compose restart`
 
 **Liệt kê các container đang chạy**\
`docker compose ls`\
`docker compose ps --service`\
`docker ps`
![image.png](https://images.viblo.asia/9cce130a-02cb-40ad-b9db-f197214dc362.png)

**Kiểm tra cú pháp file cấu hình docker-compose.yml**\
`docker compose config -q`\
![image.png](https://images.viblo.asia/b280f1e9-2da1-4ded-b19c-5d6f923956cf.png)\
Trong trường hợp có lỗi thì màn hình sẽ hiển thị lỗi cú pháp. Nếu không có lỗi màn hình sẽ không hiển thị gì.

**Khi muốn kết nối tới một container đang chạy**\
`docker exec -ti server bash`                              
![image.png](https://images.viblo.asia/69a6ae56-5db9-4046-9c25-1ebe063215a9.png)

**Xóa docker compose**\
`docker compose -f docker.yaml down`

**Kiểm tra logs**\
`docker compose logs`

***Xin lỗi các mọi người vì mất kha khá thời gian mình mới ra bài này. Và bài cuối cùng trong series về Docker của mình chắc chắn sẽ sớm ra mắt*** \
***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***