Trong bài viết này mình sẽ không để cập đến việc Docker là gì , nội dung sẽ chỉ tập trung vào các bước để build được một ứng dụng Rails sử dụng Docker , nếu các bạn chưa hiểu Docker và các thuật ngữ liên quan là gì , các bạn có thể tìm hiểu về Docker [tại đây](https://docs.docker.com/get-started)

# Cài đặt
## Tạo một project Rails
Okay, để tạo một ứng dụng rails với docker thì đầu tiên chắc hẳn ta phải có một ứng dụng Rails rồi
Ở đây mình sẽ tạo một project đơn giản
```
 rails new docker_rails
```

Sau khi có project Rails rồi , mình thử dùng một lệnh docker xem sao
```
docker run 
```
Nó báo lỗi docker not found, đương nhiên rồi , muốn xài được docker thì bạn phải cài đặt nó cái đã , mình sẽ tiến hành bước tiếp theo bên dưới.

## Cài đặt docker
Để cài đặt docker, mình sẽ gõ lệnh sau vào terminal
```
 sudo apt install docker.io
```
Mình đang sử dụng hệ điều hành ubuntu , các bạn nếu sử dụng hệ điều hành khác có thể xem hướng dẫn cài đặt ở [đây ](https://docs.docker.com/get-started/#download-and-install-docker)

# Tiến hành xây dựng project
Sau khi cài đặt docker xong, các bạn có thể xem các lệnh có thể sử dụng với docker bằng cách gõ
```
docker build --help

```

Đến đây mình sẽ trình bày cách để đóng gói một ứng dụng Rails sử dụng Docker.
Để có thể dockerize một ứng dụng, đầu tiên chúng ta cần một file Dockerfile, chúng ta build một image từ Dockerfile đó, sau đó chạy image đó trong một container .
Đầu tiền , chúng ta sẽ tạo một file là tên Dockerfile như sau:
```
FROM ruby:3.0.2

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV RAILS_ENV='development'
ENV RAKE_ENV='development'

COPY . /usr/src/app
RUN bundle install
CMD ["rails", "s"]
EXPOSE 3000
```
Giải thích về các câu lệnh như sau: 
* **FROM ruby:3.0.2**
     Dòng này thực hiện pull image ruby:3.0.2 từ [dockerhub](https://hub.docker.com/) về, nó sẽ chứa những thứ cần thiết như các thư viện lõi cho một ứng dụng ruby. 
* **RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs**
     Dòng này sẽ cài đặt một vài thiết lập môi trường cần thiết
* **RUN mkdir -p /usr/src/app và WORKDIR /usr/src/app**
     Tạo một thư mục cho riêng app sẽ chạy, và khai báo thư mục này vào WORKDIR
* **ENV RAILS_ENV='development' và ENV RAKE_ENV='development**
     Khai báo ENV cho ứng dụng
* **COPY . /usr/src/app**
     Copy source code vào thư mục usr/src/app của image
* **RUN bundle install và CMD ["rails", "s"]**
    Các câu lệnh cần thiết để chạy ứng dụng rails
* **EXPOSE 3000**
    Cổng giao tiếp với container

Sau đó ta chạy lệnh 
```
 docker build -t docker_rails .
```
Lưu ý phải có dấu chấm cuối câu lệnh, nó có ý nghĩa là sẽ run file DockerFile trong thư mục local
Nếu build thành công nó sẽ hiện thông báo sau: 
```
Successfully built 1b4875e76f8a
Successfully tagged docker_rails:latest
```
Chúng ta có thể kiểm tra image ta vừa build thông qua lệnh
```
docker image
```

Bây giờ chúng ta sẽ chạy image bằng container 
```
docker run -dp  3000:3000 docker_rails
```
Sau khi chạy lệnh trên ta có thể kiểm tra container đang run bằng cách: 
```
docker ps
```
Nếu status là up thì nó đang chạy

Mở localhost:3000 lên và xem kết quả nào

# Tài liệu tham khảo
* [Dockeriize app](https://viblo.asia/p/dockerize-rails-app-using-docker-and-docker-compose-924lJW765PM)
* [Docker Docs ](https://docs.docker.com/)