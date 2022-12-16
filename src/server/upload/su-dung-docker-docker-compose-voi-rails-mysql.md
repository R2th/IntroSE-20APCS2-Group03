Chào các bạn, hôm nay mình sẽ giới thiệu cách sử dụng Docker, Docker Compose với Rails app và MySQL.
# Đối tượng áp dụng
- Cần sử dụng Docker với Rails app (đã có sẵn hoặc maintain) với MySQL.
- Muốn chạy Rails app và MySQL trên Docker Container chứ không chạy dưới local nữa.
- Đặc biệt dành cho những bạn chưa biết Docker, Docker Compose là gì và cần setup nhanh để làm việc trong dự án.
#  Cài đặt
Hện tại đã có rất nhiều bài viết trên mạng nên mình nghĩ chỉ cần follow thôi chứ trình bày ra đây làm gì dài dòng.
- Đối với các bạn sử dụng Ubuntu thì truy cập vào link này: (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04#step-7-%E2%80%94-listing-docker-containers)
Làm từ step 1 -> hết step 3 thôi là đã đủ dùng rồi. Đến dòng gõ ```docker info``` mà ra như trong bài viết thì OK, đã cài đặt xong Docker.

- Đối với các bạn sử dụng MacOS thì vào link này và down Docker về máy rồi xài thôi: https://store.docker.com/editions/community/docker-ce-desktop-mac

Sau khi đã cài đặt xong Docker thì mình cài đặt Docker Compose:
- Đối với các bạn sử dụng Ubuntu thì truy cập vào link này: (https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04). Làm 2 step đầu thôi là đã cài đặt xong Docker Compose rồi.
-  Đối với các bạn sử dụng MacOS thì khỏi cần làm gì, chỉ cần chạy file vừa down trên là có cả Docker, Docker Compos rồi.

# Bước đầu tiên
Giả sử bạn có một dự án Rails đã có sẵn tên ```test-docker``` nhé. Vào trong folder của dự án và tạo 2 file sau ở trong đó luôn:

File đầu tiên với URL sau: `test-docker/Dockerfile`
```
# Tùy vào dự án của bạn sẽ thay đổi Ruby version của mình
FROM ruby:2.5.0

# Install các package cần thiết
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs ntp yarn

# Tạo app mới trên Container và sử dụng app đó
RUN mkdir /test-docker
WORKDIR /test-docker

# Coppy các Gemfile, Gemfile.lock, package.json, yarn.lock vào thư mục test-docker mới tạo trên
COPY Gemfile Gemfile.lock package.json yarn.lock ./

# Chạy bundler, tạo volume cho nó
RUN bundle install
VOLUME /user/local/bundle

ADD . /gpc-app
```
File thứ hai với URL sau: `test-docker/docker-compose.yml` (Khi coppy vào bạn xoá comment đi nhé)
```
# Có nhiều version của docker-compose, ở đây mình chọn version 3. Cũng còn tuỳ vào dự án nên bạn tuỳ biến version nhé, lưu ý mỗi version sẽ có cú pháp khác nhau.
version: '3'
# Tạo một service với tên là test-db để lưu trữ MySQL trên container thay vì sử dụng dưới local
services:
  test-db:
    image: mysql:5.5
    container_name: test-db
    ports:
      - "3307:3307"
    volumes:
      - db_data:/var/lib/mysql
      - .:/test-app
    environment:
    # Các thông số này thay đổi theo password mysql trên máy bạn nhé.
      MYSQL_ROOT_PASSWORD: password # 
      MYSQL_DATABASE: testdb
      MYSQL_USER: user_testdb
      MYSQL_PASSWORD: password

  test-web:
    build: .
    container_name: test-app
    command: bundle exec rails s -p 5050 -b '0.0.0.0'
    volumes:
      - .:/test-app
      - web_rubygems:/usr/local/bundle # Sử dụng cái volume mới tạo bằng file DockerFile trên
    ports:
      - "5050:5050"
    depends_on:
      - test-db
    # Debug binding.pry trên Docker
    tty: true 
    stdin_open: true
# Tạo volume để lần sau có build lại cũng nhanh hơn
volumes:
  db_data:
  web_rubygems:
```

Đã xong 2 file quan trọng, tiếp theo bạn vào `database.yml` của Rails app để chuyển đổi phần host của nó nhé (chỉ lưu ý mỗi phần host là quan trọng, còn lại để như mặc định các bạn vẫn thường chạy là được):
```
default: &default
  adapter: mysql2
  pool: 5
  username: root
  password: password
  host: localhost
  port: 3306
  timeout: 5000

development:
  <<: *default
  database: test_app_development
test:
  <<: *default
  database: test_app_test
production:
  <<: *default
  database: test_app_prod
```

Tiếp theo, nếu trong Workbench chưa có `test_app_development` và `test_app_test` thì chạy lệnh dưới:
```
bundle exec rake db:create
```

Xong giai đoạn `Cài đặt` đầu tiên.
# Bước thứ hai

Chỉ sau khi hoàn thành bước 1 thì mới đến đây nhé các bạn. Bây giờ mở Terminal lên và chạy các câu lệnh sau:
```
cd test-docker
# Đợi khá lâu khi chạy câu dưới nhé các bạn
sudo docker-compose build 
```
Sau khi đợi nó build xong thì bạn vào file `database.yml` của Rails app chuyển phần host ban nãy lại như sau:
```
default: &default
  adapter: mysql2
  pool: 5
  username: root
  password: password
  host: test-db # Mở file docker-compose.yml lên xem phần service của mysql tên gì và điền giống vậy, ở đây là test-db nên chuyển lại là test-db
  port: 3306
  timeout: 5000

development:
  <<: *default
  database: test_app_development
test:
  <<: *default
  database: test_app_test
production:
  <<: *default
  database: test_app_prod
```
Bảo đảm là chuyển xong rồi thì xuống câu lệnh dưới đây nhé:
```
sudo docker-compose up
```

Sau khi chạy lệnh trên rồi thì bật 1 Terminal khác lên chạy tiếp lệnh sau:
```
sudo docker-compose run test-web rake db:create
sudo docker-compose run test-web rake db:migrate
sudo docker-compose run test-web rake db:seed # Nếu có
```

Rồi, sau khi đã chạy xong các lệnh trên thì giờ bạn có thể chạy Rails app với MySQL bằng Docker rồi đó. Vào trang `http://localhost:5050/` để kiểm tra nhé.

# Bước cuối

Ở bước trên thì cơ bản đã hoàn thành việc chạy Rails app với MySQL trên Docker rồi, tuy nhiên vẫn không thuận tiện cho việc debug.
Để debug bằng `binding.pry` hay `debugger` trên Rails thì làm các lệnh sau:

1. Tắt hết các Container đang chạy trước đó, cụ thể ở trên mình có chạy bằng câu lệnh `sudo docker-compose up`
```
sudo docker stop $(sudo docker ps -a -q)
```
2. Kiểm tra lại có gì đang chạy không
```
sudo docker ps # Ra trống rỗng, chỉ mỗi cái Header mặc định của Docker thì OK.
```
3. Chạy các câu lệnh sau
```
sudo docker-compose up -d
sudo docker ps # Lúc này sẽ xuất hiện 2 dòng tương ứng cho test-web và test-db
sudo docker attach CONTAINER_ID # Phần CONTAINER_ID dựa trên máy bạn raise ra, coppy nó bỏ vào đó là ok. VD: sudo docker attach abcdef123123
```
Mở `http://localhost:5050/` và thử `binding.pry` ngay nhé :v: 

# Tổng kết
Đối với người chưa biết sử dụng Docker, Docker Compose sẽ khá khó khăn để setup với dự án Maintain, do đó bài viết này với hy vọng giúp các bạn chạy được nó, còn phần lý giải những điều như Docker, Docker Compose là gì, Container là gì, hoạt động ra sao thì bài viết sẽ không đề cập. 
Thống kê lại các câu lệnh cần dùng:
> - `sudo docker-compose up -d` : Chạy ngầm các thành phần của file docker-compose.yml: có gì chạy nấy, ở đây là test-db và test-web.
> - `sudo docker-compose up`: Chạy trực tiếp trên Terminal, có thể xem log được. Tưởng tượng như chạy `rails s` vậy.
> - `sudo docker-compose run test-web rake db:create VÀ sudo docker-compose exec test-web rake db:create`: Hai lệnh này khác nhau ở `run` và `exec`, run dùng khi chưa chạy container đó, exec dùng khi đã chạy container đó trước rồi. (Khá quan trọng vì nếu chưa chạy container mà gõ exec thì sẽ báo lỗi)
> - Nếu muốn sử dụng các lệnh rails trong docker chỉ cần sử dụng 1 trong 2 lệnh trên và thay cụm `rake db:create` thành lệnh rails như bình thường. VD: `sudo docker-compose run test-web rails c` hoặc `sudo docker-compose run test-db mysql -u root -p`
> - `sudo docker ps` : List ra các container đang chạy.
> - `sudo docker ps -a` : List ra các container đang chạy và không chạy.
> - `sudo docker images` : List ra các images đang chạy.
> - `sudo docker images -a` : List ra các images đang chạy và không chạy.
> - `sudo docker stop $(sudo docker ps -a -q)` : Stop tất cả container.
> - `sudo docker system prune -a` : Xoá tất cả Container và Images. Thường sử dụng khi bạn muốn build lại app.


Hy vọng bài viết giúp ích được cho các bạn mới tìm hiểu Docker và Rails app, MySQL. Cảm ơn các bạn đã theo dõi!