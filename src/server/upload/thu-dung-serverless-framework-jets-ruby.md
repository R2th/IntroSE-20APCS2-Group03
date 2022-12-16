Xin chào tất cả các anh em! Chúc anh em của cộng đồng Viblo năm mới dồi dào sức khỏe và lương tăng đều đều =)))

Vâng ngắn gọn là khai bút năm mới đang không có ý tưởng nên mình xin phép dịch bài.

Bài viết gốc do tác giả Nakamura viết ở trang tech.actindi.net tại [đây](https://tech.actindi.net/2019/02/01/184018).

Khi nhắc tới serverless framework, tác giả trong bài cũng khá là mông lung không biết nên bắt đầu từ đâu cho tới khi bất ngờ gặp được framework Jets viết từ Ruby này. Và sau đó anh ấy đã thử mày mò thí nghiệm ở Docker để nhanh chóng nghiên cứu nó. Giới thiệu thêm thì Jets là framework viết bằng Ruby, do 1 tác giả người Việt là Tung Nguyen đang ở San Francisco dựng.

![](https://images.viblo.asia/a12bc546-f263-4b72-97c2-10ecd8245a93.jpg)

Và tác giả giới thiệu khá vui nhộn như trên rằng AWS và Ruby đã "khởi nghiệp" với nhau cho ra đứa bé tên Jets :point_right::ok_hand:

# Cài đặt Jets trên môi trường Docker
Đầu tiên phải có vài câu lệnh con con dưới đây ở môi trường local
```bash
$ mkdir src
$ cd src
```
Sau đó, tạo container Ruby 2.6 trên Docker
```bash
$ docker run -it --rm -v ${PWD}:/usr/src/app ruby:2.6 bash
```
Lập xong container thì cài yarn ở đó luôn
```
root@4aac8522c43b:/# apt-get update -qq && apt-get install -y build-essential
root@4aac8522c43b:/# curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
root@4aac8522c43b:/# echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
root@4aac8522c43b:/# apt-get update && apt-get install yarn
```
Sau đó là cài Jets
```
root@3883f5341486:# cd /usr/src/app
root@3883f5341486:/usr/src/app# gem install jets
```
Và giờ chúng ta thoát khỏi container
```
root@3883f5341486:/usr/src/app# exit
```
# Chuẩn bị docker-compose
(OK, tới đây cho xin bình luận cá nhân. Bác này viết bài qua loa quá :'( Đành là hướng dẫn cài ở docker nhưng chả có cái project nào cả. Và lần đầu tiên mình dịch 1 bài blog IT tiếng Nhật mà không phải dùng app hay google translate hỗ trợ. Tháng này đành dịch thêm bài nữa chứ bài này chả luyện tập được tiếng Nhật tẹo nào cả)

Đầu tiên chúng ta sẽ tạo và sửa 1 dockerfile trống.
```docker
FROM ruby:2.6

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY Gemfile* /usr/src/app/
RUN bundle install
COPY . /usr/src/app/
```

Tiếp đó chúng ta sẽ sửa lại docker-compose.yml như sau
```docker
version: '3'
services:
  db:
    image: mysql:5.7.17
    ports:
      - "3306:3306"
    volumes:
      - db-data:/var/lib/mysql
    env_file:
      - .env.development

  web:
    build: .
    command: /bin/sh -c "bundle exec jets server --host '0.0.0.0'"
    ports:
      - "8888:8888"
    volumes:
      - .:/usr/src/app
    environment:
      RAILS_ENV: development
    env_file:
      - .env.development
    depends_on:
      - db

volumes:
  db-data:
```
Đổi password tại database.yml nhe các bạn
```
password: <%= ENV['MYSQL_ROOT_PASSWORD'] %>
```
Sửa MYSQL_ROOT_PASSWORD và DB_HOST tại env.development
```
MYSQL_ROOT_PASSWORD=(Cái password gì nó dài dài 1 tí. Càng dài càng sướng)
DB_HOST=db
```
Khi chạy `docker-compose up`, trang welcome của Jets sẽ hiện ra.
# Khởi tạo ứng dụng
Đầu tiên là tạo 1 model bằng scaffold
```
$ docker-compose exec web jets generate scaffold Post title:string
```
Sau đó chúng ta sẽ có các file có cấu trúc như trong Rails
```
      invoke  active_record
      create    db/migrate/20190201085745_create_posts.rb
      create    app/models/post.rb
      invoke  resource_route
       route    resources :posts
      invoke  scaffold_controller
      create    app/controllers/posts_controller.rb
      invoke    erb
      create      app/views/posts
      create      app/views/posts/index.html.erb
      create      app/views/posts/edit.html.erb
      create      app/views/posts/show.html.erb
      create      app/views/posts/new.html.erb
      create      app/views/posts/_form.html.erb
      invoke    helper
      create      app/helpers/posts_helper.rb
```
Chúng ta sẽ migrate dữ liệu 
```
$ docker-compose exec web jets db:create db:migrate
```
Và khi truy cập http://localhost:8888/posts, chúng ta sẽ thấy 1 cái CMS quen thuộc.
# Lời bình của tác giả
Với ai đó đã quen Rails thì việc học Jets sẽ tốn khá ít thời gian. Và tác giả đang tìm cách để deploy lên AWS.
# Tham khảo
- Trang chính của Jets Ruby: http://rubyonjets.com/
- Link hướng dẫn chi tiết làm project đơn giản với Jets: https://qiita.com/gotchane/items/fd3c1e54f7bdaa4ab813 (ôi xin hẹn các bạn chậm nhất là tháng sau mình sẽ dịch bài ở qiita kia. Bài ấy hay vãi. Hoặc bạn nào đó dịch luôn cho mình dùng thử cũng ok. Dịch xong nhớ inbox mình để mình upvote+ghim+follow+comment nâng đỡ. Địa chỉ fb của mình tìm dễ ấy mà)