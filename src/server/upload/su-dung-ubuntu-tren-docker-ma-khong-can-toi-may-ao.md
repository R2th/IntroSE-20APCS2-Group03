Trước khi đi vào nội dung chính của bài viết ngày hôm này mình sẽ nói sơ qua đôi nét về Docker - nền tảng để *build* - *deploy* - *run* các ứng dụng vô cùng đơn giản (trên virtualization).

# I. Khái quát về Docker
![](https://images.viblo.asia/b4facff8-514c-4cd0-8087-6a6f58ccc183.png)

Có thể khi bạn phát triển sản phẩm ứng dụng chạy rất ngon lành trên môi trường dev nhưng khi deploy lên môi trường production nó lại phát sinh ra những lỗi vô cùng khó hiểu, vậy thì làm thế nào để đảm bảo dự án của ta luôn chạy "ngon" trên nhiều môi trường🤔.

![](https://images.viblo.asia/b8da2967-19ef-4ccb-b975-648ac7f8215d.jpg)

Đừng lo **Docker** ra đời để giúp bạn khắc phục những hạn chế này. Docker cung cấp khả năng đóng gói và chạy một ứng dụng trong một môi trường tách biệt lỏng lẻo gọi là container. Docker giúp cách ly và bảo mật, cho phép bạn chạy nhiều containers đồng thời trên một máy chủ nhất định.

## 1. Bạn có thể sử dụng Docker cho những gì?

### 1. Phân phối nhanh các ứng dụng của bạn
Docker hợp lý hóa vòng đời phát triển bằng cách cho phép các nhà phát triển làm việc trong các môi trường chuẩn hóa sử dụng các bộ chứa cục bộ cung cấp các ứng dụng và dịch vụ của bạn. Các containers rất lý tưởng cho việc tích hợp liên tục và quá trình phát triển liên tục (CI / CD).

### 2. Môi trường chạy và khả năng mở rộng
Docker platform cho phép giải quyết khối lượng công việc 1 cách rất portable. Docker contains có thể chạy trên laptop, trên các máy ảo hoặc ảo trong trung tâm dữ liệu, các nhà cung cấp đám mây hoặc trong một hỗn hợp các môi trường.

Docker rất portable và light weight làm cho việc quản lý khối lượng công việc linh động, dễ dàng scaling tùy theo tính chất các ứng dụng và dịch vụ của sản phẩm.

## 2. Kiến trúc Docker

![](https://images.viblo.asia/b4f23dff-fd3b-460b-935e-458b1e4b408c.png)

* **Docker Engine** là phần core của Docker dùng để tạo, vận chuyển và chạy Docker Container. Docker Engine cung cấp kiến trúc ứng dụng client-server trong đó có một tiến trình chạy ngầm giúp server chạy liên tục đây chính là điểm mấu chốt mình sẽ nói tới ở bài viết này.
* **Dockerfile** là một bản "công thức" các nguyên liệu còn thiếu của project.
* **Images** là một khuôn mẫu để *đúc* ra các từ các công thức và nguyên liệu cần thiết config,...
* **Container** là 1 instance của *Images*
...

Hinh như là mình lan man hơi dài về docker rồi nhỉ😂, không để các bạn phải chờ lâu mình sẽ đi vào phần chính.

Docker cung cấp platform vô cùng mạnh mẽ, mình sẽ dựa vào đó để xây dựng 1 con Ubuntu vô cùng đơn giản (cụ thể là trên Windows 10 Pro)

# II. Setup
Đầu tiên cần ta cần download và setup Docker phiên bản mới nhất trên trang chủ: https://www.docker.com/products/docker-desktop

Sau khi setup hoàn tất ta tiến hành tạo folder bao gồm những thứ cần thiết cho 1 image:

![](https://images.viblo.asia/7e548a8b-4146-478a-9b18-7d4926bf0b16.png)

Setup file Dockerfile để chế biến:

```Dockerfile
FROM ubuntu:18.04

WORKDIR /home

RUN apt update -y --fix-missing && apt install wget -y

RUN wget https://raw.githubusercontent.com/hypnguyen1209/always-run/main/autorun -P /app

COPY install.sh /

RUN chmod a+x /app/autorun

RUN chmod a+x /install.sh

RUN /install.sh

# EXPOSE 5051 5052 5053 5054 5055

CMD ["/app/autorun"]
```
Mấu chốt của container là phải tạo ra tiến trình chạy liên tục cho service, ở đây thì mình đã compiler 1 file code C thực hiện vòng lặp vô hạn.

File `install.sh` là file chứa những command mà các bạn muốn thực hiện khi build image.

```sh
apt install curl -y 
```

Tiếp theo, chạy terminal để build images:

```
docker build -t udocker .
```
Chạy container dưới nền:
```
docker run -it -d --name udocker udocker:latest
```

Đặt tên cho container để dễ dàng quản lý hơn, sau đó mình sẽ tiến hành các bước để tự động khởi chạy và execute bash vào container:
```
docker exec -it udocker /bin/bash
```
Yeah vậy là ta đã exec được vào bên trong container của images mới tạo, đây chính là thứ chúng ta cần:

![](https://images.viblo.asia/c59106d0-cb8d-4353-9353-a7843955dc23.png)

Tiếp đó, mình compile 3 file thực thi trên trên Windows (bằng C++) và set environment:

1. Bật container
```cpp
// on_udocker.cpp
#include<iostream>
using namespace std;

int main(){
	system("docker run -it -d --name udocker udocker:latest");
	return 0;
}
```

2. Tắt container
```cpp
// off_udocker.cpp
#include<iostream>
using namespace std;

int main(){
	system("docker rm -f udocker");
	return 0;
}
```

3. Exec vào container
```cpp
// udocker.cpp
#include<iostream>
using namespace std;

int main(){
	system("docker exec -it udocker /bin/bash");
	return 0;
}
```

Compile ra file PE32+

![](https://images.viblo.asia/04c9e1ec-031c-4a55-a004-e17f2ba1052a.png)

Set environment:
Bật windows search tìm kiếm:

![](https://images.viblo.asia/d081bc45-e9fa-47de-9421-bf894e0e0f7a.png)

Kết quả như trong hình:

![](https://images.viblo.asia/378f1d8d-ca4f-40cf-bbee-fd8d14b8aeaa.png)

Add đường dẫn đến các file compiled:

Đường dẫn của mình là `E:\ubuntu-docker\bin`:

![](https://images.viblo.asia/160e945f-db91-4ff4-b320-3f9deed5fa4e.png)


Done thế là xong bây h hưởng thụ kết quả:

Bật cmd hay bất kì command line tools nào:

![](https://images.viblo.asia/8037b9ea-a379-4475-adc0-36656534b1d8.png)

# III. Tổng kết
Link repo github: https://github.com/hypnguyen1209/udocker