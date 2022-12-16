Chào các bạn, trong mấy hôm gần đây, mình bắt đầu tìm hiểu về docker để dùng trong project sắp tới của mình, vậy nên nhân tiện mình cũng viết luôn 1 bài chia sẻ về docker cho những ai mới bắt đầu tìm hiểu như mình,hoặc đơn giản hơn là chia sẻ góc nhìn của 1 người mới tìm hiểu về docker.

# Docker là gì ?
Cái lúc mà mình lần đầu tiên nghe từ docker, thì cái đầu tiên xuất hiện trong đầu mình là cái này
![](https://images.viblo.asia/4a8a20df-25da-47e2-9d07-c49e7d511454.png)
> chính nó, chính là thanh dock =))

Sau một hồi tìm hiểu thì mình nhận ra docker chính là con cá này
![](https://images.viblo.asia/5d41d34d-079a-43d7-a925-213ce617ecc4.png)

Trước khi nói tiếp về docker là gì thì mình lại muốn nói về vấn đề tại sao lại phải dùng docker ?. Lúc mà mình tìm hiểu về docker mình cũng đặt ra câu hỏi này. Tại sao phải tìm hiểu nó khi mà chưa biết nó giúp ích gì cho mình.

## Vì sao lại dùng docker ?
* Đợt trước làm project nhóm thì nhóm mình bị 1 cái là các yêu cầu cần cài đặt trước khi bắt đầu làm thì rất nhiều và mỗi người khi đó lại đang cài các phiên bản khác nhau dẫn đến việc khi kéo code về thì người này lại không chạy được code của người kia. Vậy nên tất cả lại phải cài lại cho cùng 1 version.
* Hay 1 lần khác thì mình làm bài tập lớn, phải cài thêm khá nhiều thứ chỉ để làm bài tập, xong thì thôi không cần, chưa kể đến việc mình đã phải cài lại ubuntu khá nhiều lần do trong khi cài lại bị conflict tùm lum.

> **Bên trên là 2 lí do mà cá nhân mình nhận thấy việc dùng docker là có ích và giúp công việc dễ dàng, đỡ rắc rối hơn.**
## Docker.
Lại quay trở lại giới thiều về docker sau khi biết được nó dùng làm gì.

Theo wiki thì: 
    "*Docker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows vào trong các container ảo hóa. Docker cung cấp một lớp trừu tượng và tự động ảo hóa dựa trên Linux. Docker sử dụng những tài nguyên cô lập của Linux như cgroups, kernel, quản lý tệp để cho phép các container chạy độc lập bên trong một thực thể Linux*"

Cái này mình đọc cũng không hiểu gì lắm, lại mất một hồi tìm hiểu thì mình nhận ra docker nó hoạt động gần giống như máy ảo ấy (**virtual machine**), chắc các bạn ai cũng biết rồi , ví dụ như Vitualbox hay VMware ấy, hồi trước mình hay chạy ubuntu trên vitualbox. Vậy thay vì cài trên máy thật thì mình chạy các máy con đã cài sẵn lên rồi dùng thôi, khỏi cần mất công tìm cách cài đặt các thứ, phức tạp.

**Các nhược điểm của công nghệ ảo hóa này là gì:**
* Thường thì trước mình nhớ là khi thiết lập môi trường cho máy ảo thì phải share RAM hay core của CPU từ máy thật sang. Và kể cả khi máy ảo không dùng hết những tài nguyên đó thì trên máy thật vẫn mất từng ấy tài nguyên để cấp phát cho nó, như thế là bị lãng phí.
* Và thời gian bật tắt máy cũng khá chậm nữa.

**Vậy nên công nghệ container hóa =)) (containerization), docker xuất hiện.**
* Nếu như virtualization là mô phỏng lại phần cứng, thì container mô phỏng lại OS.
* Ở đây thì các máy con tận dụng tài nguyên tối ưu hơn, chia sẻ tài nguyên với máy thật, cần bao nhiêu thì sẽ được cấp bấy nhiêu.
* Điểm đáng chú ý là nó sử dụng các container (mấy cái ở trên lưng con cá ấy)

![](https://images.viblo.asia/4d5d0999-2265-4bf3-a3ea-d2fc4831c185.jpg)

### Docker Container, Docker image, Dockerfile
* **Dockerfile** là một tệp chứa một tập hợp các hướng dẫn mô tả cấu hình môi trường. Ví dụ, nếu chúng ta muốn một môi trường chạy Ubuntu 18.04, đã cài đặt vim và có cổng 80 mở, Dockerfile sẽ trông giống như sau:

```
FROM ubuntu:18.04

RUN apt-get install -y vim

EXPOSE 80
```
* **Docker Image** là một pre-build Dockerfile. Nó đã sẵn sàng để chạy và có thể chạy trên bất kỳ máy chủ nào đã cài đặt Docker. Docker Image là một template chỉ cho phép đọc, ví dụ một image có thể chứa hệ điều hành Ubuntu và app. Docker Image được dùng để tạo container. Docker cho phép chúng ta build và cập nhật các image có sẵn một cách cơ bản nhất, hoặc bạn có thể download Docker image của người khác.
* **Docker container** là một thể hiện của một Docker image, tương tự như 1 máy ảo, xuất hiển khi chạy image. Container là nơi lưu giữ mọi thứ chúng ta cần để chạy một app. Mỗi container được tạo từ image, chúng ta có thể tạo nhiều container từ chỉ 1 image. Container có thể started, running, restarted, and stopped.

# Cài đặt docker.
Docker có 2 phiên bản, CE(dành cho nhà phát triển) và EE (dành cho doanh nghiệp).

Sau đây là cách cài Docker CE
```
OS requirements
    Bionic 18.04 (LTS) 64-bit
    Xenial 16.04 (LTS) 64-bit
    Trusty 14.04 (LTS) 64-bit

$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
    
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

$ sudo apt-get update

$ sudo apt-get install docker-ce

Xong.
```

# Docker Hub
Nếu các bạn đã dùng github thì [docker hub](https://hub.docker.com/) cũng tương tự thế, nó là 1 image repository cho các Docker Image
Các bạn có thể đẩy các image của mình lên hay tìm và download các image của những người khác về chạy.

# Dockerize một rails app
Những thứ cần chuẩn bị: Docker, và 1 rails app, giả sử đặt trong folder /myapp
```
$ cd myapp
$ ls
app  bin  config  config.ru  db  Gemfile  Gemfile.lock  lib  log  public  Rakefile  README.rdoc  test  tmp  vendor
```
Tạo Dockerfile trong folder /myapp chứa nội dung sau:
```
FROM ruby:2.3

# throw errors if Gemfile has been modified since Gemfile.lock
# RUN bundle config --global frozen 1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]

RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y mysql-client postgresql-client sqlite3 --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY Gemfile /usr/src/app/

# Uncomment the line below if Gemfile.lock is maintained outside of build process
# COPY Gemfile.lock /usr/src/app/


RUN bundle install

COPY . /usr/src/app
```
Đến đây mình cũng giới thiệu thêm về một số các câu lệnh trong Dockerfile

* **FROM:** đây là câu lệnh bắt buộc có. Dùng để khai báo base Image mà chúng ta sẽ build.
* **MAINTAINER:** câu lệnh này dùng để khai báo người tạo ra Image.
* **RUN:** chúng ta sử dụng lệnh này để chạy một command cho việc cài đặt các công cụ cần thiết cho Image của chúng ta.
* **CMD:** 1 Dockerfile thì chỉ có duy nhất 1 câu lệnh CMD, dùng để thực thi của các câu lệnh khi chúng ta tạo mới Image.

    ............... 

Xong thì chạy lệnh sau để tạo image
```
docker build -t demo .
```
Cuối cùng là chạy container từ cái image vừa build:
```
docker run -p 3000:3000 demo
```

# Kết luận
Vậy là xong rồi, mình cũng vừa chia sẻ xong một số thứ mà mình tìm hiểu được về docker, từ khái niệm đến cách dùng.

Nếu các bạn đã đọc đến đây thì rất có thể các bạn đã phí 5-10p cuộc đời =))

Trên đây cũng là những kiến thức mình tìm hiểu được, mặc dù còn nhiều hạn chế và thiếu sót, để hiểu hết và làm được những thứ chất lượng hơn thì mình cần thời gian tìm hiểu thêm, tiện đây mình cũng chia sẻ luôn các nguồn tài liệu mình đã đọc:

https://runnable.com/docker/

https://docs.docker.com/

https://viblo.asia

Vậy thôi, cảm ơn các bạn đã đọc. :grin: :ok_hand:

Chào thân ái và ko hẹn gặp lại △.