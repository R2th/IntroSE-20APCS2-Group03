Xin chào tất cả các bạn, nhắc đến Docker chắc cũng không còn xa lạ gì đối với dân IT chúng ta đúng không ạ. Nhưng đối với một đứa dev cừu non như mình thì thực sự lúc mới nghe tới Docker kiểu WHAT nó là cái gì vại =))). 

Sau một số ngày tìm hiểu thì hôm nay mình xin chia sẻ một chút kiến thức về Docker. Bài viết còn khá basic, dựa trên kiến thức mình mới mày mò ra, có gì ace supper góp ý giúp mình nhé! Thanks ạ
![](https://images.viblo.asia/eee9d3f5-fc63-42b1-8fa2-765cd62605bc.png)
# Vì sao nên sử dụng Docker?
Thông thường để setup một dự án mới thôi đã phải cài rất nhiều thứ, chưa kể đến những dự án lâu năm. Rồi cài đặt môi trường lại phải để ý đến các version bao nhiêu bao nhiêu, config đủ thứ,.... dẫn đến rất mất time và có khi lỗi tùm lum. Nhưng bạn không phải lo vì giờ đây Docker sẽ giúp việc setup môi trường, cài cắm project một cách nhanh, chỉ một vài dòng lệnh là oki rồi.
- Dễ sử dụng, bạn có thể khởi chạy container trên mỗi hệ thống mà bạn muốn. ngoài ra còn có [DockerHub](https://hub.docker.com/) (giống như một thư viện lưu trữ rất nhiều images public), bạn chỉ cần pull image về và config lại một chút là có thể sự dụng ngay.
- Tốc độ: Vì Docker container rất nhẹ và nhanh, bạn có thể tạo và chạy docker container trong vài giây.
- Đối tượng sử dụng: tất cả mọi người.

Do chị Covid19 vừa rồi, mà nhiều cty cho nhân viên làm việc remote ở nhà, khá xui cho mình trong quá trình remote đó máy mình bị hỏng, phải cài cắm lại mọi thứ (yaoming). Thôi xong, nếu k dùng Docker thì mình dễ toang thực sự huhu. Điều này khiến mình rất thích.

# Docker là gì?
Trên [trang chủ](https://docs.docker.com/get-started/overview/) Docker có định nghĩa:
> Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production
> 
Hay có thể hiểu đơn giản Docker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows vào trong các container ảo hóa. Docker là một nền tảng cho phép bạn đóng gói, triển khai và chạy các ứng dụng một cách nhanh chóng. 

Hiện tại Docker đã hỗ trợ trên nhiều nền tảng hệ điều hành khác nhau bao gồm Linux, Windows và cả Mac. Và Docker có 2 phiên bản, CE( dành cho nhà phát triển, nhóm nhỏ, coder như chúng ta) và EE (dành cho doanh nghiệp). Để cài đặt Docker bạn truy cập và [trang chủ](https://docs.docker.com/get-docker/) Docker và làm theo hướng dẫn.

# Docker container, Docker image, DockerFile
![](https://images.viblo.asia/4d0e89df-757c-43fc-bf10-c20f9286235d.png)

## Thành phần:
* **Docker Engine**: dùng để tạo ra Docker image và chạy Docker container.
* **Docker Hub**: dịch vụ lưu trữ giúp chứa các Docker image.
* **Docker Machine**: tạo ra các Docker engine trên máy chủ.
* **Docker Compose**: chạy ứng dụng bằng cách định nghĩa cấu hình các Docker container thông qua tệp cấu hình
* **Docker image**: một dạng tập hợp các tệp của ứng dụng, được tạo ra bởi Docker engine. Nội dung của các Docker image sẽ không bị thay đổi khi di chuyển. Docker image được dùng để chạy các Docker container.
* **Docker container**: một dạng runtime của các Docker image, dùng để làm môi trường chạy ứng dụng.
## DockerFile
Là một tệp chứa một tập hợp các hướng dẫn mô tả cấu hình môi trường. Nó như một script dùng để build các image trong container. Dockerfile bao gồm các câu lệnh liên tiếp nhau được thực hiện tự động trên một image gốc để tạo ra một image mới. Dockerfile giúp đơn giản hóa tiến trình từ lúc bắt đầu đến khi kết thúc.
Dockerfile sẽ quy định Docker image được khởi tạo từ đâu, gồm những gì trong đó. Ta build Dockerfile để tạo ra docker image (docker image thường có dung lượng nhỏ từ vài MB đến lớn vài GB).
## Docker image
File nền của container. Từ các image này, bạn sẽ dùng nó để tạo ra các container.
Chúng ta có thể tự tạo image riêng cho mình hoặc pull từ DockerHub về.

Một image có thể được tạo từ nhiều image khác (vd: bạn tạo 1 image chạy ubuntu, có cài sẵn ruby 2.3 và rails 5, image này của bạn được tạo nên bởi 3 image khác).
## Docker Container
Nó tương tự như một máy ảo, xuất hiện khi mình khởi chạy image. Tốc độ khởi chạy container nhanh hơn tốc độ khởi chạy máy ảo rất nhiều và bạn có thể thoải mái chạy 4,5 container mà không sợ treo máy.

Các files và settings được sử dụng trong container được lưu, sử dụng lại, gọi chung là images của docker. Chúng ta có thể tạo nhiều container từ chỉ 1 image. Container có thể started, running, restarted, and stopped.

# Một số câu lệnh hay sử dụng
* List container đang chạy:
```
 $ docker container ls
```

* List all container hiện có (kể cả đang chạy hay đã stop):
 ```
$ docker ps –a
```

* Pull một image trên docker hub:
```
$ docker pull <tên image>
```

* Start một container:
 ```
$ docker start <tên container>
```

* Run một container chạy ngầm:
 ```
$ docker run -d <tên image>
```
 
* Delete image/container:
```
$ docker image/container rm <tên image/container >
```

* Stop a container cụ thể:
 ```
$ docker stop <tên container>
```

* Stop all container:
 ```
$ docker stop -a
```
 
* Show log a container:
```
$ docker logs <tên container>
```

* Truy cập vào một container đang chạy:
 ```
docker exec -it {container_name} bash
```
 

# Kết luận
Hì hì quên mất cả kết luận (dull) phần sau mình xin giới thiệu các bạn cách build một Docker Image trên Docker Hub nha nha! Bài viết dựa trên những gì mình tìm hiểu đc nên còn khá base, có gì hay hơn mn share lại kiến thức cho mình nhé ạ!