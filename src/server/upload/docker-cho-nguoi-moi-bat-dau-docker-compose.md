Tiếp tục với series bài viết về **Docker** cho người mới bắt đầu,  trong bài này mình sẽ giới thiệu về **Docker-Compose**,  1 công cụ cho phép kết nối các **Container** lại và làm cho chúng có thể tương tác với nhau.

![](https://images.viblo.asia/4dd1360e-cea0-4e1a-a4d0-45bbb5c7c61c.jpg)

### Docker Hub
Trước khi tới với Docker-Compose thì mình sẽ giới thiệu qua chút về [DockerHub](https://hub.docker.com/) nhé.
DockerHub là nơi lưu trữ và chia sẻ các image của Docker, cũng hỗ trợ build image trên server, ...

Mình có tạo mới 1 repo [docker-basic](https://github.com/kienph-2408/docker-basic) trên Github.

![](https://images.viblo.asia/3f834f78-5af1-4c9d-9340-1903ebc95cf7.png)

Và 1 repo mới tên là docker_basic trên  [DockerHub](https://hub.docker.com/). Khuyến khích bạn nâng cấp lên tài khoản Pro để sử dụng tính năng tự động build image và tự động đẩy "built image" vào Docker repositories. Bạn cũng có thể sử dụng gói Free theo [QuickStart](https://docs.docker.com/docker-hub/). Ở đây mình sẽ minh họa theo gói Pro để đơn giản hơn cho mn.


Bước đầu, click Create chọn Create Automated Build, chọn Github rồi trỏ tới docker-basic bạn vừa tạo ở GitHub.

![](https://images.viblo.asia/a061a600-23b8-4e5f-aec2-04a01478f2fd.png)

Sau khi tạo thành công, bạn vào tab Build Settings và chọn branch mong muốn, đặt tên tag phù hợp và nhấn Save Changes để hoàn thành
![](https://images.viblo.asia/4d6a7c6c-7bde-4da3-8a0e-d354c0cad448.png)

Nếu bây giờ bạn push code lên branch nào trên github, mà branch đó bạn đã setting trên DockerHub (đã được chọn như ảnh trên) thì Server DockerHub sẽ tiến hành build images 1 cách tự động. Theo ảnh trên, nếu mà mình merge nhánh init_dockerfile vào nhánh master thì images sẽ được tự động build tiếp trên master branch.

Bạn có thể theo dõi kết quả trong tab Build Detail.
![](https://images.viblo.asia/7d0292e8-0095-4556-91ee-427b4f581531.png)

Ok, vậy là mình đã giới thiệu qua DockerHub, nó sẽ giúp ích rẩt nhiều, mn hãy thử trước khi tiếp tục vào phần tiếp theo nhé.

### Vì sao chúng ta cần Docker Compose ?

Quay trở lại với lý do mà chúng ta sử dụng Docker Composer, khi bắt đầu 1 dự án mới, ta muốn setup Docker cho nó, tất nhiên là sẽ sử dụng Dockerfile, cài đặt tất cả những môi trường cần thiết lên một container duy nhất, rồi chạy Project của chúng ta trên container đó.
Có 1 hướng đi hay hơn trong việc xây dựng image, đó là dùng lại hay kết hợp các image có sẵn để không cần mất thời gian tạo lại từ đầu, ngoài ra nếu ta muốn nhiều Project cùng dùng chung 1 cơ sở dữ liệu thì làm như thế nào.

Khi đó, chúng ta sẽ xây dựng nhiều container, mỗi container sẽ làm 1 nhiệm vụ riêng, khi nào cần tương tác với database thì gọi tới container mysql chẳng hạn, tương tác với redis thì gọi tới container redis, cần cái gì thì gọi tới container làm nhiệm vụ đó.

### Cài đặt

Mình sẽ giới thiệu về cách cài đặt trên Linux, còn với các hệ điều hành khác, các bạn tham khảo tại [đây](https://docs.docker.com/compose/install/) .

B1: Tải phiên bản Docker Compose mới nhất 
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

B2: Cấp quyền thực thi 
```
sudo chmod +x /usr/local/bin/docker-compose
```

Bây giờ thì cùng kiểm tra lại kết quả cài đặt bằng lệnh 
```
docker-compose --version
```
![](https://images.viblo.asia/f92a5869-e2e7-457f-8a2e-04d09004f824.png)

Vậy là xong !:ok_hand:
### Cấu hình
Ta sẽ tạo ra cấu trúc như dưới đây, gồm 3 file chính :
![](https://images.viblo.asia/b23ca46b-bbde-46f6-b58e-69a3ca56d633.png)
1. docker / entrypoint.sh : Liệt kê những câu lệnh cần chạy sau khi bật container
2. Dockerfile:  trong [bài trước](https://viblo.asia/p/docker-cho-nguoi-moi-bat-dau-dockerfile-L4x5xr8YZBM) mình có trinhf bày khá chi tiết rồi
3. docker-compose.yml : Dùng để khai báo và điều phối hoạt động của các container trong project

###  Xây dựng các container

1. mysql - container dùng để kết nối cơ sở dữ liệu

Vào [DockerHub](https://hub.docker.com/) và tìm kiếm với từ khóa mysql như dưới đây 

![](https://images.viblo.asia/fd202e53-d654-4016-88bd-e1c113474bfc.png)

Chúng ta chú ý 1 chút đó là dưới tên **mysql** có cụm từ **Docker Oficial Images**, mang ý nghĩa nó là image chính thức được Docker cung cấp, chúng ta sẽ yên tâm hơn khi sử dụng, và khuyến cáo luôn là nên sử dụng ( ít có khả năng gặp bug hơn hoặc chèn mã độc). Bạn cũng có thể sử dụng những image khác, những images này là do cá nhân, tổ chức khác xây dựng, có thể sẽ có những cải tiến so với bản official tuy nhiên độ tin cậy và chính xác thì khó mà bằng bản chuẩn được.

![](https://images.viblo.asia/08957f7d-60be-41ce-8513-ba304d054a55.png)

2. ruby - container dùng cho web application

![](https://images.viblo.asia/5976dc0f-19ab-4e92-82e3-158c34f6cc8e.png)

Vậy là chúng ta đã xác định được 2 image tương ứng với 2 container sẽ được xây dựng.
### Viết docker-compose
Để nắm được tổng quan về các services trong project, ta sẽ viết docker-compose.yml trước 
```
version: '3.5'  // phiên bản của docker-compose

services:   // liệt kê các services
    mysql:
                image: mysql:5.7    // chỉ định image để  khởi động container
                container_name: mysql   //  tên container có thể tùy chỉnh
                restart: always    // container sẽ khởi động lại nếu mã thoát cho biết lỗi không thành công, mặc định là no
                environment:      // các biến môi trường
                  MYSQL_ROOT_PASSWORD: root
                volumes:           // Chia sẻ dữ liệu giữa container (máy ảo) và host (máy thật) hoặc giữa các container với nhau 
                  - docker/database:/var/lib/mysql  
    app:
                container_name: app
                build: . // Sử dụng khi chúng ta không xây dựng container từ image có sẵn nữa mà xây dựng nó từ Dockerfile
                volumes:
                  - .:/my_app
                ports:  // Cấu hình cổng kết nối
                  - "3000:3000"  
                environment:
                  DATABASE_HOST: mysql  // tên của service mysql
                  DATABASE_USER_NAME: root
                  DATABASE_PASSWORD: root
```

Chi tiết hơn 1 chút với : 
- **volumes** :  Khi container mysql tạo và lưu dữ liệu thì dữ liệu này sẽ lưu ở trong thư mục var/lib/mysql của container. Như vậy nếu như container này bị xóa đi thì chúng ta sẽ mất toàn bộ data. Vậy nên chúng ta sẽ sao lưu dữ liệu đó ra ngoài máy host, như vậy khi container bị xóa, dữ liệu sẽ vẫn được lưu trữ ở máy host. Và ở khi bật lại container, dữ liệu lại được mount từ máy host vào trong container và chúng ta tiếp tục sử dụng nó bình thường. Thư mục lưu trữ data ở ngoài máy host sẽ không được commit vào git, ta đưa nó vào gitignore.
- **build** :  Nếu Dockerfile nằm cùng thư mục với docker-compose.yml thì chỉ cần `build: .` Nếu bạn muốn đặt Dockerfile trong thư mục docker để cùng với entrypoint.sh cho gọn thì sửa thành 

```
build:
       context: ./
       dockerfile: docker/Dockerfile
```

- **ports** : Có thể chỉ định cả 2 cổng (HOST:CONTAINER) tương ứng với (cổng ở máy thật: cổng ở máy ảo) hoặc chỉ định mình cổng cho máy ảo thôi.

Ví dụ: "1111:2222" Khi bạn truy cập vào cổng 1111 ở máy thật thì sẽ được ánh xạ tới cổng 2222 của máy ảo.

### Viết Dockerfile

```
FROM ruby:2.5.1    // image cơ sở

MAINTAINER KienPH<thanhcong@gmail.com>     // tác giả

RUN apt-get update && \
  apt-get install -y nodejs        // cài đặt nodejs
  
ENV TZ=Asia/Ho_Chi_Minh    // cài đặt timezone cho máy ảo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV APP_PATH /my_app
WORKDIR $APP_PATH    // chỉ định thư mục làm việc mặc định (optional)

COPY Gemfile Gemfile.lock $APP_PATH/       // cài đặt framwork cần thiết cho dự án
RUN bundle install --without production --retry 2 \
  --jobs `expr $(cat /proc/cpuinfo | grep -c "cpu cores") - 1`
  
COPY . $APP_PATH   // Copy tất cả dữ liệu tự máy host vào trong container


COPY docker/entrypoint.sh /usr/bin/       // cấu hình file entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]    // thiết lập câu lệnh mặc định sẽ chạy khi khởi động container
```

### Viết entrypoint.sh

```
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /my_app/tmp/pids/server.pid

# Then exec the container's main process use CMD (what"s set as CMD in the Dockerfile).
exec "$@"
```

### Tạo thêm file Gemfile và Gemfile.lock
![](https://images.viblo.asia/f18ac772-4da0-4a13-9b72-6e9a1fcd39f0.png)

Nội dung của file Gemfile khai báo nguồn và phiên bản của framework muốn sử dụng, file này khi chạy container sẽ được copy  từ máy host vào container
```
source "https://rubygems.org"
gem "rails", "~>5"
```
file Gemfile.lock ta sẽ để trống 
```
# This file is empty
```
### Sử dụng docker-compose như thế nào ? 
Khi tạo mới project với Rails trực tiếp trên máy thật, ta sẽ chạy lệnh :
```
rails new . --force --no-deps --database=mysql
```
Khi setup project mới thông qua Docker ta chỉ cần run một container đã cài Rails lên và chạy câu lệnh trên bên trong container đó, rồi mount các file, folder của framework được vừa được tạo ra ngoài máy host.

Cú pháp để chạy một câu lệnh bên trong container như sau:
```
sudo docker-compose run + tên container + Câu lệnh muốn chạy
```
Ví dụ :
```
docker-compose run app rails new . --force --no-deps --database=mysql
```
Trong đó app là tên container mà ta đã viết trong docker-compose.yml

### Cấp lại quyền cho file, folder
Mặc định thì docker chạy với user root nên những file, folder nó tạo ra (sau khi mount từ container ra máy host) cũng ở quyền root. Vậy nên khi bạn dùng editor để chỉnh sửa những file này thì Linux OS sẽ thông báo.
```
Permission denied
```

Lúc này ta cần cấp lại quyền cho nó
```
sudo chown -R $USER:$USER .
```

### Cấu hình để kết nối tới database
Đối với Rails framework thì config này nằm ở file config/database.yml

Sửa từ 
```
default: &default
    adapter: mysql2
    encoding: utf8
    pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
    username: root
    password:
    host: localhost
```

thành 
```
default: &default
      adapter: mysql2
      encoding: utf8
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
      username: <%= ENV.fetch("DATABASE_USER_NAME") || "root" %>
      password: <%= ENV.fetch("DATABASE_PASSWORD") || "root" %>
      host: <%= ENV.fetch("DATABASE_HOST") || "mysql" %>
```

### Run

```
sudo docker-compose build   // Build các image cần thiết
sudo docker-compose up  //  Khởi chạy container
```

Sau đó vào trình duyệt và paste vào url :
```
 http://localhost:3000
```
![](https://images.viblo.asia/98fbcbc8-9802-4b0e-8a3c-dad4d496b077.png)
 
 ==> Vâng, lỗi này là do chúng ta chưa tạo database
 
 Ta cần *mở thêm 1 tab khác* và chạy :
 `
 sudo docker-compose run app rails db:migrate:reset
 `
 để xóa và tạo lại các bảng và quan hệ giữa chúng.
 
 Bây giờ quay lại trình duyệt và reload lại trang
 ![](https://images.viblo.asia/7a3e9144-9147-4419-9b16-7dfa9346de2e.png)


### Tạm kết

Vậy là qua bài viết này, các bạn cũng đã sơ bộ nắm được 1 cách tổng quan về Docker Compose, cách setup 1 project Ruby on Rails thông qua Docker Compose, trong thời gian tới, nếu có thể, mình sẽ tiếp tục viết thêm các bài liên quan ( mình sẽ để link ở phía dưới ), cám ơn mn đã quan tâm.

### Tài liệu tham khảo

1.  https://hub.docker.com/
2.  https://docs.docker.com/