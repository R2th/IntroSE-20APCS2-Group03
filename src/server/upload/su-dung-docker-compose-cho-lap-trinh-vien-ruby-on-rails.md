# Sử dụng Docker Compose cho lập trình viên Ruby on Rails

Chào các bạn hôm nay mình muốn giới thiệu cho các bạn một cách sử dụng môi trường mà mình mới tìm hiểu trong quá trình lập trình. và đây là lý do mình viết bài này
 + Bạn là một dev và đa số mình phát triển trên môi trường Linux khi làm việc ở công ty.
 +  Máy ở nhà của bạn lại sử dụng window do có sở thích chơi game Liên Minh.
 +  Máy ở nhà không muốn cài đặt song song 2 hệ điều hành vì một lý do nào đó (máy mình yêu không cài được song song, hoặc không muốn chuyển đổi 2 hệ điều hành vì gây bất tiện....).

Vì vậy bài này mình muốn giới thiệu với các bạn một môi trường làm việc là Docker Compose(tuy nhiên vì mình là dev RoR nên cũng chỉ mới tìm hiểu về cách cài đặt một ứng dung và cách sử dụng cơ bản bằng ứng dụng Rails mong các bạn thông cảm).

### Cài đặt Compose trên window
Để cài đặt docker-compose trên window bạn vào trang chủ của docker phần cài đặt: [docker](https://docs.docker.com/compose/install/#install-compose).

Theo mình cài đặt trên máy thì bạn cần cài đặt 2 phần:
+ [Get Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
+ [Get Docker Toolbox (for older systems)](https://docs.docker.com/toolbox/overview/).

Sau khi cài xong docker trên máy bạn sẽ thấy có một số biểu tượng hình con cá heo ở dưới góc phải và trạng thái là `Docker is running` như hình
![](https://images.viblo.asia/7dea4e26-db49-412c-bfd8-a9dc9b7f0177.png)

Lưu ý khi bạn dùng trên win là docker phải đang ở trạng thái như trên thì mọi thao tác của bạn mới có thể thực thi, ngược lại thì sẽ luôn báo lỗi.

Đặc biệt trên win-10 mình sử dụng thỉnh thoảng khi khởi động máy lại hoặc mới bật máy thì docker bị tắt hoặc treo dẫn tới các câu lệnh mình thực hiện bị lỗi.

### Định nghĩa ứng dụng Rails app 

Sau khi cài đặt xong Docker thì bạn đã sẵn sàng với một môi trường làm việc mới mà không bị phụ thuộc vào hệ điều hành bạn đang sử dụng là gì, nó có hỗ trợ hết tất cả thư viện của project hay không hoặc với mỗi lần cài lại máy bạn mất bao nhiêu thời gian để settup lại môi trường làm việc.....
Rất nhiều thứ gây mất thời gian cho bạn tuy nhiên với docker thì mọi thứ sẽ ổn hơn...

Chúng ta bắt đầu tìm hiểu  và cài đặt docker với rails. Mình có đọc tham khảo ở trang chủ [Docker](https://docs.docker.com/compose/rails/#define-the-project) và nhiều bài viết trên viblo về docker để config phần này.
Phần này chúng ta chỉ cần quan tâm tới 2 file `Dockerfile` & `docker-compose.yml`

1. Tạo hai file  `Dockerfile` & `docker-compose.ym`

với `Dockerfile` có nội dung

```
FROM ruby:2.3.3 #version của ruby
RUN apt-get update -qq 
RUN apt-get install -y -y git-core curl  build-essential libpq-dev nodejs 
RUN gem install mailcatcher -v 0.6.5 --no-rdoc #cài này là một gem liên quan đến mail SMTP  hỗ trợ rails
RUN gem install rails --version 5.1.4 --no-rdoc # rails version
RUN mkdir /project # tạo thư mục dự án
WORKDIR /project # chọn thư mục làm việc
COPY . /project-origin # copy thư mục bạn đang code vào thư mục  project của docker.(phần này khi bạn vào docker sẽ thấy rõ hơn)
```
`docker-compose.ym` sẽ có

```docker
version: '3' # version hiện tại của docker-compose
services:
  db: #tên service
    image: mysql # sử dụng mysql
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --init-connect='SET NAMES UTF8; SET CHARACTER SET utf8mb4;'
    ports: #port khi sử dụng là 3406 thay vì 3306 như mọi khi
      - "3406:3306"
    container_name: db
    environment:
      MYSQL_ROOT_PASSWORD: root # biến môi trường trong db
  web:
    build:
      context: .
      dockerfile: Dockerfile #yêu cầu với môi trường web  thì sử dụng file Dockerfile đê build
    command: bundle exec rails s -p 3000 -b '0.0.0.0' # lệnh sau khi build xong docker-file
    container_name: web
    volumes:
      - .:/project-origin # thư mục được map sang trực tiếp với docker
    ports:
      - "3000:3000"
    depends_on:
      - db # khi khởi tạo web thì sẽ có thêm db được connect với nhau
```

2. Chạy ứng dụng của bạn với docker-compose

Chúng ta dùng 2 câu lệnh 
+ `docker-compose build`: để chạy lần đầu khi project được chạy với `docker-compose` phần này sẽ chạy vào file Dockerfile của bạn để thực thi các cấu lệnh bạn đã viết trong file đó.
chúng ta sẽ có hình sau:
![running](https://images.viblo.asia/085cbc75-b50c-4931-aaac-0401786d10cd.png)
![](https://images.viblo.asia/e0298ef4-f772-4f60-a94f-57d3481fd001.png)
Như các bạn thấy thì với mỗi dòng trong file Dockerfile đều sẽ sinh ra một `Step`  và ta có 8 Step tất cả.(lần đâu tiên cũng khá tốn thời gian thường mình mất khoảng 5-10 phút)
+ `docker-compose up`: để bật project của bạn 

và khi chúng ta bật được môi trường docker cho project của mình thì có thể vào địa chỉ: [localhost:3000](http://localhost:3000/) để xem kết quả.
Như bạn thấy do chúng ta để lệnh `rails s -p 3000 -b '0.0.0.0'` trong phần command của file `docker-compose.yml` thế nên rails app đã được chạy. để không bật đồng thời rails app chúng ta có thể command lại và sử dụng lệnh

`docker exec -it container_name bash` để vào docker với `container_name` là tên service chúng ta khai báo bên trên.
Sau đó bạn có thể sử dụng các lệnh như trên linux chúng ta thường sử dụng.


### Kết thúc 
Chúc các bạn thành công khi settup môi trường Rails app trên window và hoàn thành công việc sau đó làm ván game rồi nghỉ ngơi ^^

![](https://images.viblo.asia/518070aa-d7df-4973-9d37-30962bb0c9fd.png)