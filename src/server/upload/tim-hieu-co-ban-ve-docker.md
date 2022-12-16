# 1.Virtual Machine(VMs)
Trước khi chúng ta đi tìm hiểu docker là gì thì chúng mình sẽ lướt qua xem VMs nó là cái gì nhé. `VMs` dịch ra là máy ảo hay nó là một giả lập của một máy tính để thực thi các ứng dụng giống như một máy tính thật. Ngày xưa khi còn học môn Linux ở trường thì mình hay sử dụng phần mềm Virtual Box để cài Ubuntu trên đấy để thực hành câu lệnh :). VMs chạy trên một máy vật lý sử dụng một thứ gọi là "hypervisor" - nó có chức năng là cho nhiều máy ảo chạy trên nó. Máy thật của chúng ta sẽ cung cấp cho VMs những tài nguyên như RAM, CPU theo cách mà chúng ta phân bố cho nó. VMs chạy trên hệ điều hành của máy thật (tức là chúng ta cài hệ điều hành Window thì hệ điều hành đó là máy thật) và nó không thể truy cập trực tiếp đến phần cứng mà phải thông qua hệ điều hành.

![](https://images.viblo.asia/6c38f261-4edc-4d6f-b0e6-7867481ba9cf.png)

# 2.Docker là gì ?
**Docker** là nền tảng cung cấp cho các công cụ, service để các developers, adminsystems có thể phát triển, thực thi, chạy các ứng dụng với `containers`. Hay nói một cách khác nó là một nền tảng để cung cấp cách để building, deploy và chạy các ứng dụng một cách dễ dàng trên nền tảng ảo hóa - "Build once, run anywhere". Hay nói một cách dễ hiểu như sau: Khi chúng ta muốn chạy app thì chúng ta phải thiết lập môi trường chạy cho nó. Thay vì chúng ta sẽ đi cài môi trường chạy cho nó thì chúng ta sẽ chạy docker.

Một số lợi ích khi dùng docker:
1. `Flexible`: Hầu hết những ứng dụng phức tạp đều có thể container được.
2. `Lightweight`: Docker Container rất nhẹ và nhanh, chúng ta có thể tạo và chạy docker container trong vài giây, nhanh hơn rất nhiều so với VMs.
3. `Interchangeable`: Chúng ta có thể triển khai các bản cập nhật, nâng cấp một cách nhanh chóng.
4. `Portable`: Chúng ta có thể tạo `Container` dưới local, triển khai nó trên cloud và chạy nó ở mọi nơi.
5. `Scalable`: Chúng ta có thể tăng số lượng và tự động phát hành những bản sao container.
6. `Stackable`: Chúng ta có thể stack các service nhanh chóng.

![](https://images.viblo.asia/e6a43af0-a101-446b-b7d4-907ca151ad4b.png)

## Sự khác biệt giữa Docker và Hypervisors.
`Docker`: Chạy độc lập trên Host OS và có thể chạy trên bất cứ hệ điều hành nào. Thời gian khởi động và làm trong cho ứng dụng chạy được tương đối nhanh. Các container chạy như một tiến trình độc lập, chiếm ít tài nguyên của Host Machine.

`Hypervisor`: Là các máy ảo, chạy hoàn toàn trên một hệ điều hành của host machine, không thể truy cập trực tiếp đến phần cúng mà phải thông qua hệ điều hành. Tốn tài nguyên và làm chậm máy khi sử dụng(Các bạn cứ thử cài Virtual Box sử dụng nhé). 
## Sự khác biệt giữa Docker Image và Docker Container.
`Docker Image`: là một package bao gồm nhiều thứ cần thiết để chạy một ứng dụng như mã nguồn, thư viện, các biến môi trường và các file cấu hình. Các bạn cứ hiểu nó như là một template, thường thì chúng ta hay lên Hub Docker để sử dụng image trên đó hoặc có thể tự build một image riêng cho mình. Một image được build lên sẽ dựa vào những tập câu lệnh trong file `Dockerfile` mình sẽ đề cập sau.

`Docker Container`: Nếu như `Docker Image` được coi như là `class` thì `Docker Container` được coi là instance của Image. Chúng ta có thể create, start, stop,... container.

## Làm thế nào để tạp ra một Docker Image từ Dockerfile.
Trước hết chúng mình cần xem `Dockerfile` nó là cái gì? Thì thực chất nó là một tập tin chứa các câu lệnh liên tiếp để tạo ra một `Docker Image`. Đâyl à một ví dụ về Dockerfile.
```Javascript
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Name author
MAINTAINER NguyenHoang

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```
* Trước hết bao giờ mở đầu Dockerfile bao giờ cũng có câu lệnh `FROM<base_image>:<version>`. Đây là câu lệnh bắt buộc trong bất kỳ Dockerfile nào. Nó dùng để khai báo base Image nào mà chúng ta sẽ dựa vào đó để build mới Image của chúng ta. Ví dụ như trong ví dụ trên thì chúng ta sử dụng Image trên Hub Docker là `python:2.7-slim`
* `MAINTAINER<name_author>`: syntax này dùng để khai báo tên tác giả tạo ra Image, nó có hoặc không có cũng không sao.
* `WORKDIR<src>`: syntac này dùng để di chuyển vào thư mục làm việc
* `ADD<src><destination>`: syntax này dùng để copy một tập tin ở local hoặc remote nào đó vào một vị trí nào đó trên Container.
* `ENV<variable>`: syntax này định nghĩa biến môi trường trong Container.
* `CMD<command>`: trong một Dockerfile chỉ có duy nhất một câu lệnh CMD này, nó dùng để xác định quyền thực thi của các câu lệnh khi chúng ta tạo mới Image.
* `RUN<command>`: syntax này dùng để chạy một command cho việc cài đặt các công cụ cần thiết cho Image của chúng ta.

Bây giờ chúng mình sẽ thử cùng tạo một Dockerfile rồi chạy nhé. Trước hết các bạn nhớ cài docker trên máy mình nhé. Các bạn có thể tham khảo tại đây: https://docs.docker.com/install/#reporting-security-issues. Ví dụ dưới đây mình sẽ cài trên Ubuntu.
```Javascript
mkdir image-test
cd image-test
```
Sau đó các bạn sẽ tạo 1 file text với nội dung như sau:
```Javascript
FROM alpine

CMD ["echo", "Hello world!"]
```
Sau đó chúng ta sẽ chạy lệnh `docker build .` thì nó sẽ hiện ra đoạn lệnh này thì build thành công
```Javascipt
Sending build context to Docker daemon  2.048kB
Step 1/2 : FROM alpine
latest: Pulling from library/alpine
4fe2ade4980c: Pull complete 
Digest: sha256:621c2f39f8133acb8e64023a94dbdf0d5ca81896102b9e57c0dc184cadaf5528
Status: Downloaded newer image for alpine:latest
 ---> 196d12cf6ab1
Step 2/2 : CMD echo hello world
 ---> Running in 2585a7f34043
 ---> ccb0e8f3f904
Removing intermediate container 2585a7f34043
Successfully built ccb0e8f3f904

```

Sau đó chạy lệnh sau `docker run --name test ccb0e8f3f904` và trên terminal in ra `Hello world` thì bạn đã thành công rồi nhé.
# 3.Kết luận
Vậy qua những phần mình tím hiểu rất cơ bản về Docker ở trên cũng mong rằng có ích cho các bạn. Cảm ơn các bạn đã đọc bài viết của mình.
# 4.Tham khảo
https://docs.docker.com/get-started/