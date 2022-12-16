Chào các bạn, Docker, Images và Containers có lẽ là những keyword không còn quá xa lạ nữa rồi.

Việc deploy 1 ứng dụng run container có quá nhiều ưu điểm so với việc deploy ứng dụng lên 1 con instance mà bạn sẽ phải setup tất cả.

Bài viết hôm nay mình xin giới thiệu với các bạn cách để containerized 1 Rails app sử dụng Docker.

### Đề bài

Hãy tưởng tượng bạn đang xây dựng một Rails app sử dụng Puma làm web server để nhận các request và phản hồi response. 

Ngoài ra app của bạn cũng cài đặt sidekiq để xử lý các công việc bất đồng bộ hoặc chạy các cron job.

Hệ thống của bạn sẽ được deploy lên ECS của AWS.

Khá rõ ràng, application của bạn nên được build thành 2 service chạy độc lập, ví dụ đặt tên là con `BE` (sẽ run puma và xử lý các request/response thông thường) và con `worker` (xử lý các job bất đồng bộ và các cron job)

### Let's started

Trước khi build image, các bạn phải nhớ các câu khẩu quyết:

* Image của bạn được build bằng lệnh `docker build` và image này có thể được run được ở bất cứ môi trường nào bằng lệnh `docker run`. Đây là 2 câu lệnh dĩ nhiên của Docker nhưng vì sao mình lại đề cập ở đây. Mình muốn nhấn mạnh cho các bạn đã quá quen tay với `docker-compose`, bởi vì chính bản thân mình cũng đã từng dùng `docker-compose` đến nổi quá phụ thuộc vào nó mà quên mất cốt lõi của docker khi build image là `build, ship and run everywhere`. Với lại trên ECS sẽ không có cài docker-compose đâu nhé, các bạn build dựa vào compose là toang ngay :v
* Sử dụng `dockerignore` để remove bớt những file, folder không cần thiết khi build image
* Đảm bảo log application được xuất ra STDOUT, thay vì file log. Xuất vào stdout có thể lấy được rồi push vào CloudWatch, còn xuất vào file, phải xử lý rotate log, tính toán không cẩn thận lúc scale nó remove container 1 cái thì log trong đó cũng đi theo luôn. Để check log đã được xuất đúng ra STDOUT chưa có thể chạy lệnh `docker logs <CONTAINER_ID> -f`
* Nên hạn chế các script nặng ở trong entrypoint, để giảm thiểu thời gian run container lúc scale. Tại mình đã từng nhét `bundle install` vào entrypoint, chắc không ít bạn cũng có build kiểu này :D

Hãy bắt đầu với việc build image cho con Backend, con này sẽ chạy Puma ở port 3000 và xử lý các request/response bình thường:

```dockerfile
# docker/api/Dockerfile

# Build image dựa vào base ruby 3.0.0 bản alpine cho nhẹ, mình suggest nên dùng bản alpine, thiếu gì thì cài thêm
# Nếu bạn không quen, hoặc đơn giản không thích thì có thể dùng bản đầy đủ ruby:3.0.0
FROM ruby:3.0.0-alpine3.13

# update các dependencies và cài đặt những package cần thiết để app của bạn có thể work
RUN apk add --no-cache --update build-base mariadb-dev tzdata imagemagick

# Định nghĩa path mà code của app sẽ lưu ở đó
ENV APP_DIR /usr/local/my_app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Copy Gemfile và Gemfile.lock vào image
COPY Gemfile $APP_DIR/Gemfile
COPY Gemfile.lock $APP_DIR/Gemfile.lock
# Cài đặt bundler với version tương thích nếu bị lỗi
RUN gem install bundler:2.2.4
RUN bundle install

# Copy toàn bộ source code ở context hiện tại vào image (sẽ ignore những file, folder ở .dockerignore)
COPY . $APP_DIR

# Copy file entrypoint vào /usr/bin và cấp quyền thực thi để chạy các script lúc run container
COPY docker/api/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Expose ra port 3000 trong container
EXPOSE 3000
# Start container bằng command rails server -b 0.0.0.0
CMD ["rails", "server", "-b", "0.0.0.0"]
```

Entrypoint mình chỉ là 1 việc là migrate database
```bash
# docker/api/entrypoint.sh
#!/bin/sh
set -e

rails db:migrate

# Remove a potentially pre-existing server.pid for Rails.
rm -f /usr/local/my_app/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```

Tới đây bạn đã có thể chạy `docker build -t your_app -f docker/api/Dockerfile` để build image và `docker run your_app -e ENV1=value1 ...` để run app của bạn rồi đó.

Vậy hãy cùng đọc lại và làm rõ thêm một số điểm:

1. Tại sao đã copy toàn bộ source code mà trước đó phải copy Gemfile và Gemfile.lock?
    
    => Chắc các bạn cũng biết docker nó có tính năng cache layer, mỗi line trong Dockerfile sẽ là 1 layer, khi build image nó sẽ build từ trên xuống dưới từng layer một, layer nào không thay đổi trước  đó thì docker sẽ sử dụng cache, khi có sự thay đổi ở 1 layer thì layer đó và toàn bộ layer sau đó sẽ được build lại. Chính vì vậy, khi bạn sửa code và build lại thì layer `COPY . $APP_DIR` chắc chắn sẽ thay đổi, và để tốn thời gian chờ bundle install thì hãy đặt những layer này lên trước

2. Tại sao không migrate DB lúc build image luôn mà phải đưa vào entrypoint?

    => Cái này khá đơn giản, lúc build image mình chưa có thông tin database để run migrate, entrypoint được chạy lúc run container tức là lúc này đã có thể đọc được cái env truyền vào từ docker run rồi
    
3. Có thể truyền ENV vào lúc build image luôn được không?

    => Câu trả lời là có thể. Mặc dù lúc build image, docker không hỗ trợ truyền env vào nhưng docker cho phép bạn truyền tham số bằng option `--build-arg ARG1=value1 ...`, trong image nhận giá trị này bằng layer `ARG ARG1` và có thể gán vào env tương ứng `ENV ENV1 $ARG1`. Và tất nhiên là sẽ không ai làm như vậy cả, vì list ENV thì không biết dài tới bao nhiêu mà khai báo trong Dockerfile cho đủ, thứ 2 nữa bạn sẽ không thể cầm cái image này từ staging sang production dùng được
    
4. Xuất log ra STDOUT như thế nào?

    => Nếu là development thì mặc định log sẽ được lưu trong `log/development.log` và đồng thời push thẳng ra stdout luôn. Nhưng production thì không như vậy. Có 2 cách, và bạn chỉ nên chọn 1 trong 2 cách, symbolic link file log/production ra stdout bằng cách thêm 1layer trong Docker file `RUN ln -sf /dev/stdout $APP_DIR/log/$RAILS_ENV.log` hoặc setting `ENV["RAILS_LOG_TO_STDOUT"]` bằng 1 giá trị bất kỳ nào đó (cái này bạn có thể vào `config/environments/production.rb` để xem vì sao set cái env này thì được nhé)
    
Vậy là xong con `api`, build nốt con `worker` là có thể tự tin deploy lên ECS. Khi bạn đã hiểu con `api` được build như thế nào thì con `worker` cũng sẽ tương tự như vậy, sẽ khác một số điểm như: command start container ko còn là bật puma nữa mà có thể là sidekiq, không cần phải expose port nữa vì con này nó chả cần public ra làm gì cả:

```dockerfile
# docker/worker/Dockerfile

FROM ruby:3.0.0-alpine3.13

RUN apk add --no-cache --update build-base mariadb-dev tzdata imagemagick

ENV APP_DIR /usr/local/my_app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY Gemfile $APP_DIR/Gemfile
COPY Gemfile.lock $APP_DIR/Gemfile.lock
RUN gem install bundler:2.2.4
RUN bundle install

COPY . $APP_DIR

COPY docker/api/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["bundle", "exec", "sidekiq"]
```

Entrypoint sẽ update lại crontab
```bash
# docker/worker/entrypoint.sh
#!/bin/sh
set -e

whenever --update-crontab
service cron start

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```

Tất nhiên, đây chỉ là những gì đơn giản nhất để nó work. Còn tùy vào yêu cầu của application các bạn sẽ phải xác định được: cần cài thêm những package gì? Lệnh nào nên run lúc build image? Lệnh nào phải run lúc start container? Dockerfile bạn viết ra có thể build, ship and run everywhere không?

Bài viết trên mình đã hướng dẫn các bạn containerized một Rails application đơn giản sử dụng docker với 2 service `api` và `worker`. Việc build image để run container nó sẽ có nhiều cách chứ không phải như mình viết là chuẩn. Hi vọng từ cách build của mình các bạn có thể run được application của các bạn và tìm cách để tối ưu hơn. Thank for your reading!!!