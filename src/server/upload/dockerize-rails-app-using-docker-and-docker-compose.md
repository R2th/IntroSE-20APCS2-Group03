Chào các bạn, như tiêu đề thì bài viết này mình sẽ trình bày cách đóng gói một ứng dụng Rails sử dụng Docker and Docker Compose.

Bài viết này gồm các nội dung chính sau:
- Docker là gì
- Dockerize Rails app
- Docker Compose là gì
- Docker Compose a Rails app

# 1. Docker là gì

Như mình tìm hiểu thì Docker được định nghĩa như sau:

> Docker là một công cụ được thiết kế để giúp cho việc khởi tạo, deploy, và chạy các ứng dụng được dễ dàng hơn thông qua việc sử dụng containers.

> Container cho phép lập trình viên có thể đóng gói một ứng dụng với tất cả các thành phần cần thiết của ứng dụng, bao gồm cả các libraries, dependencies ... nói chung là toàn bộ những thứ cần thiết để ứng dụng có thể chạy được.

> Bằng cách đóng gói ứng dụng trong container thì việc chạy ứng dụng sẽ dễ dàng hơn vì không phải bận tâm về sự khác nhau về môi trường local của mỗi lập trình viên.
> 

Docker có thể giống với một máy ảo virtual machine, nhưng cụ thể hơn thì nó lại không phải là một virtual machine. Thay vì tạo ra toàn bộ một hệ điều hành ảo, docker cho phép ứng dụng sử dụng chung một nhân Linux với máy tính mà chúng ta đang chạy. Điều này giúp tăng đáng kể hiệu suất cũng như giảm thiểu kích thước của ứng dụng.

Và điều quan trọng là Docker là dự án open source, vì vậy ai cũng có thể đóng góp cải thiện Docker cũng như có thể tùy biến để phù hợp cho mục đích sử dụng của họ.

### Docker image

> Docker image là một file, sử dụng để execute code trong một docker container.

![](https://images.viblo.asia/0034877b-28f3-4be8-af7f-df2a9997e31e.png)


### Dockerfile

> Docker image có thể được build từ một file text chứa cấu hình cũng như những câu lệnh cần thiết để build nên image.
> Nó là một tập hợp các câu lệnh sẽ chạy trong quá trình build image, các cấu hình cho image này, một hàng trong file sẽ là một câu lệnh hoặc một cấu hình cho việc build image.

Các bạn có thể cài đặt docker qua hướng dẫn ở đây: [link](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)

``` shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y docker-ce
sudo systemctl start docker
```

Đến đây mình sẽ trình bày cách để đóng gói một ứng dụng Rails sử dụng Docker.

*Để có thể dockerize một ứng dụng, đầu tiên chúng ta cần một file Dockerfile, chúng ta build một image từ Dockerfile đó, sau đó chạy image đó trong một container .*

Đầu tiên là Dockerfile:
```
FROM ruby:2.5.3

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

Ở Dockerfile dành cho ứng dụng rails, mình cần một image cơ bản từ [Dockerhub](https://hub.docker.com/)
Bạn cần tìm kiếm cho mình một image cơ bản phù hợp ở dockerhub, bạn có thể tìm kiếm với từ khóa như rails hoặc ruby, sẽ có nhiều hướng dẫn để viết một file Dockerfile phù hợp.

 ```
 FROM ruby:2.5.3
 ```
 
 Dòng này thực hiện pull image ruby:2.5.3 từ dockerhub về, nó sẽ chứa những thứ cần thiết như các thư viện lõi cho một ứng dụng ruby.
 Nếu trên host có image thì nó sẽ sử dụng image trên host hiện tại, ví dụ ```FROM my_image```
 
```
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
```

Tác dụng: Chạy những command trong quá trình build, ở đây mình cần cài đặt một vài thiết lập môi trường cần thiết

```
RUN mkdir -p /usr/src/app
```

Và tạo một thư mục cho riêng app sẽ chạy, và khai báo thư mục này vào ```WORKDIR```

```
ENV RAILS_ENV='development'
```

ENV là nơi khai báo các biến môi trường cho ứng dụng.

```
COPY . /usr/src/app
```

Câu này sẽ copy toàn bộ code vào thư mục ```/usr/src/app``` của image

Chừng đó là chúng ta có toàn bộ code của ứng dụng rails trong image. Tiếp theo sẽ build app rails thông qua các command cần thiết.

```
RUN bundle install
```

Chạy main process
```
CMD ["rails", "s"]
```

Và expose sẽ xác định cổng giao tiếp với container
```
EXPOSE 3000
```

# 2. Dockerize Rails app

Như vậy chúng ta đã có một Dockerfile, tiếp theo cần build image, chạy lệnh theo format sau để build image:

```docker build [OPTIONS] PATH | URL | -```

run

```shell
docker build -t notification-api:dev .
```

Bao giờ thấy thông báo như sau là bạn đã build thành công.
```shell
Successfully built dab0ce26ab25
Successfully tagged notification-api:dev
```

Kiểm tra images hiện có bằng lệnh ```docker images```
```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
notification-api    dev                 dab0ce26ab25        16 minutes ago      1.02GB
<none>              <none>              ca174f7482f3        25 minutes ago      1.02GB
<none>              <none>              fd44886b3688        49 minutes ago      1.02GB
<none>              <none>              66023411bea2        13 days ago         1.02GB
<none>              <none>              af255225455c        13 days ago         1.02GB
notification-app    dev                 22a7b7055719        2 weeks ago         1.3GB
mysql               5.7                 f6509bac4980        3 weeks ago         373MB
mysql               dev                 f6509bac4980        3 weeks ago         373MB
mysql               latest              f6509bac4980        3 weeks ago         373MB
mysql               <none>              2151acc12881        3 weeks ago         445MB
node                6                   ab290b853066        3 months ago        884MB
ruby                2.5.3               72aaaee1eea4        5 months ago        873MB
```

Như vậy chúng ta đã build thành công, chạy lệnh sau để chạy image này trong một container.

```docker run -d --name notification-api -p 3000:3000 notification-api:dev```

Kiểm tra các container đang chạy bằng lệnh ```docker ps```
```
CONTAINER ID        IMAGE                  COMMAND             CREATED             STATUS              PORTS                    NAMES
584e052335e7        notification-api:dev   "rails s"           17 minutes ago      Up 17 minutes       0.0.0.0:3000->3000/tcp   notification-api
```

Nếu status là up tức là container đã chạy bình thường và chúng ta có thể sử dụng app như bình thường thông qua localhost:3000. tuy nhiên đến đây vẫn còn thiếu config db để app có thể sử dụng được, các bạn hãy đọc tiếp phần dưới nhé.
 
#  3. Docker compose là gì

Như định nghĩa mình tìm hiểu được ở document của docker thì Docker compose được định nghĩa như sau:

> Docker compose là một công cụ để định nghĩa và khởi chạy multiple docker containers.

Trường hợp chúng ta có một số lượng containers cần chạy cho một ứng dụng, docker compose là công cụ tuyệt vời để chạy và quản lý chúng.

Docker compose được định nghĩa và cấu hình thông qua file ```docker-compose.yml```, chúng ta sẽ cấu hình thông qua file này.

Bạn có thể cài đặt Docker Compose qua link này: [link](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04)

```shell
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

Kiểm tra docker status bằng lệnh sau

# 4. Docker compose a rails app and mysql

Để chạy rails app sẽ cần có database nên cần có image cho db, ở đây mình sẽ dùng mysql. Trước tiên cần tạo một image cho mysql

File Dockerfile này mình sẽ để ở thư mục riêng nhé, mục đích để build riêng một image mysql, bạn cũng có thể dùng image khác mà không cần build riêng.

```Dockerfile
FROM mysql:5.7
```
run ```docker build -t mysql:dev .```

Kiểm tra image bằng lệnh ```docker images```

Nội dung file ```docker-compose.yml```

```
version: "3"

services:
  db:
    image: "mysql:dev"
    restart: unless-stopped
    ports:
      - "330:3306"
    environment:
      MYSQL_PASSWORD: 'toor'
      MYSQL_ROOT_PASSWORD: 'toor'
    volumes:
      - /var/lib/mysql57-data:/var/lib/mysql
  api:
    image: notification-api:dev
    command: bash -c "bundle install && rake db:create db:migrate && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/usr/src/app
    ports:
      - "3000:3000"
    depends_on:
    - db
```

File này dùng cú pháp của file yaml khá quen thuộc:

- Dòng đầu tiên là khai báo version
- Các scope tiếp theo theo thứ tự là services -> <service_name> -> các config cho container
- ```image:``` khai báo tên image
- ```port:``` khai báo port (```<port host>:<port container>```)
- ```environment:``` để khai báo biến môi trường
- ```volumes:``` khai báo vùng nhớ cho container, mount vùng nhớ cho container để sau khi dừng container sẽ không bị mất data.

Cấu hình cho file ```config/database.yml``` sử dụng host db là service đã khai báo trong docker-compose.yml

```host: db```

Cuối chạy lệnh 

``` shell
docker-compose up
```

Nếu thấy thông báo ```api_1  | * Listening on tcp://0.0.0.0:3000``` tức là app đã được chạy, bây giờ chúng ta có thể truy cập app qua localhost:3000
 
 Như vậy mình vừa trình bày các bước để dockerrize rails app bằng Docker và Docker compose.
 
 Cảm ơn mọi người đã theo dõi bài viết, nếu có thắc mắc gì hãy comment phía dưới để cùng giải đáp nhé.