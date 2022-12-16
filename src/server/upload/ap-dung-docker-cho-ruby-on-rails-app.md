Trong bài viết này, chúng ta sẽ cùng xây dựng 1 ứng dụng Rails hoàn chỉnh bằng docker. Ứng dụng sẽ bao gồm Postgresql, Redis và Sidekiq.

Đồng thời, chúng ta cũng sẽ cài đặt thêm Unicorn và Nginx cho production.

After reading this article:
Các kiến thức sử dụng bao gồm:

- Kiến thức cơ bản về Docker 
- Cách Docker hỗ trợ quá trình phát triển 
- Cách bạn sử dụng CI/CD để build và test 

# Docker là gì?

Docker cho phép chúng ta đóng gói một ứng dụng hay service với tất cả các thư viện hoặc công cụ phụ thuộc thành một đơn vị tiêu chuẩn. Đó gọi là một `Docker image`.

Docker image sẽ chứa toàn bộ code, các thư viện runtime, hay thư viện hệ thống để giúp server hoạt động. 

## Docker khác gì so với Virtual Machine

Ta có các tool như Vagrant, VirtualBox hay VMWare đều là virtual machine _ công nghệ ảo hoá, cho phép bạn cô lập các service, nhưng có nhiều điểm bất tiện. 

Đó là bạn cần có toàn bộ một hệ điều hành cho mỗi ứng dụng mà muốn cô lập. Điều này tiêu tốn khá lâu để khởi động một máy ảo, và mỗi máy ảo cần vài GB bộ nhớ.

Docker container có cách tiếp cận khác, đó là chia sẻ kernel, và việc cô lập được thực hiện thông qua các thư viện linux kernel và cgroups. Nhờ vậy, Docker rất nhẹ, và chỉ mất vài giây để một container bắt đầu và quá trình chạy không mất nhiều dung lượng.

Vậy làm thế nào để bạn có thể phát triển Rails app trong một môi trường cô lập mà không cần dùng RVM hay việc thay đổi Ruby version dễ dàng hơn?

Hoặc giả sử bạn là một freelancer có 10 project, bạn muốn cài đặt hay chuyển qua lại giữa các project mà không cần lãng phí dung lượng ổ đĩa?

Hoặc bạn muốn chia sẻ project trên Github và những dev khác có thể tải về và chạy mọi thứ trong vài phút thôi?

## Lợi ích của Docker

Nếu bạn mong muốn cải thiện năng suất và giúp cho kinh nghiệm lập trình tốt hơn, thì Docker phù hợp với các yêu cầu đó, với các lợi ích như:

### 1. Giữ cho thông số môi trường được toàn vẹn 

Docker cho phép bạn đóng gói ứng dụng và dễ dàng chuyển đổi qua các môi trường. Nó hoạt động hiệu quả cho mọi môi trường và trên tất cả các thiết bị mà chạy được Docker.

### 2. Mở rộng team phát triển nhanh chóng 

Trước kia, bạn có thể cần tới 30 trang tài liệu cho các dev mới để chỉ cách cài đặt trên local. Việc này có thể mất nhiều thời gian, và với các dev mới thì hoàn toàn có thể phát sinh sai sót.

Với Docker, tất cả các dev trong team có thể cài đặt các ứng dụng hoặc nhiều service chạy một cách tự động, hiệu quả, chỉ với vài lệnh và vài phút.

### 3. Sử dụng bất cứ công nghệ nào phù hợp 

Nếu bạn chỉ sử dụng một ngôn ngữ, bạn đã tự đẩy bản thân vào bất lợi và kỹ năng lập trình tụt hậu. Nhưng nhờ việc cô lập ứng dụng trong Docker container, ta có thể mở rộng kiến thức lập trình theo chiều dọc bằng cách thử nghiệm các ngôn ngữ và framework mới.

Bạn không cần lo lắng đến cách các dev khác cài đặt công nghệ. Bạn có thể đóng gói hết vào trong một Docker image và họ chỉ việc chạy Docker container là xong. 

### 4. Tạo image một lần và sử dụng nhiều lần

Bởi vì ứng dụng của bạn nằm trong một Docker image đã được dựng sẵn, ta có thể chạy trong vài giây, rất dễ để scale.

Thời gian cho các công việc thêm các thư viện phụ thuộc chỉ cần build lại là được. Khi image đã được build, bạn có thể sử dụng ở nhiều host.

Điều này không chỉ giúp quá trình scale nhanh chóng, mà còn giúp việc deploy dễ đoán và thống nhất.

### 5. Các nhà phát triển và quản lý vận hành có thể làm việc cùng nhau 

Các công cụ của Docker cho phép nhà phát triển và quản lý vận hành làm việc cùng nhau hướng đến mục tiêu chung là deploy một ứng dụng. 

Docker hoạt động như một lớp trừu tượng. Bạn có thể phân phát ứng dụng cho các member khác, và họ không cần biết các cấu hình chi tiết của môi trường.

## Cài đặt Docker

Cách cài đặt dựa theo hệ điều hành:

Linux: https://docs.docker.com/get-started/ 

Windows và Mac: https://www.docker.com/products/docker-desktop

# Tạo Rails app 

Chúng ta sẽ tạo một project Rails mà không cần cài đặt Ruby trên máy bằng cách sử dụng phiên bản Ruby Docker image chính thức  

## Tạo Rails Image

Để tạo một app Rails trong một Docker container, bạn cần một `Dockerfile`. Dockerfile chứa tất cả lệnh bạn cần để tạo chương trình và thư viện. 

Tạo file `Dockerfile.rails`:

```
# Dockerfile.rails

FROM ruby:2.7

ARG USER_ID
ARG GROUP_ID

RUN addgroup --gid $GROUP_ID user
RUN adduser --uid $USER_ID --gid $GROUP_ID user

ENV INSTALL_PATH /opt/app
RUN mkdir -p $INSTALL_PATH

RUN gem install rails bundler
RUN chown -R user:user /opt/app
WORKDIR /opt/app

USER $USER_ID
CMD ["/bin/sh"]
```

Các lệnh cơ bản Dockerfile là:

- `FROM`: chỉ định image để bắt đầu. Chúng ta sẽ sử dụng Ruby image phiên bản chính thức.
- `ARG`: chỉ định các biến tham số trong thời gian build. Nếu bạn chạy trong Linux, thì user và group id cần giống nhau giữa host và docker container.
- `RUN`: chạy các lệnh trong container. VD, bạn dùng nó để tạo một user và group và cài đặt các gem Rails.
- `ENV`: định nghĩa các biến môi trường 
- `WORKDIR`: chỉ định thư mục hiện tại trong container.
- `USER`: thay đổi user hoạt động trong container.
- `CMD`: chạy chương trình khi container bắt đầu 

Để build image, ta chạy lệnh:

```
$  docker build -t rails-toolbox \
       --build-arg USER_ID=$(id -u)  \
       --build-arg GROUP_ID=$(id -g) \
       -f Dockerfile.rails .
```

## Tạo Project 

Chúng ta sẽ dùng Rails image để tạo project:

```
$ docker run -it \
    -v $PWD:/opt/app \
    rails-toolbox rails new --skip-bundle rails_demo
```

Docker chạy một container mới và chạy lệnh rails new trong đó:

- `-it`: gán tiến trình terminal của bạn với container.
- `-v $PWD:/opt/app`: gán thư mục hiện tại của host trên máy của bạn với container, để map các file được tạo trong container copy tương ứng ra máy local của bạn.
- `rails new --skip-bundle rails_demo`: Lệnh này được truyền vào trong Rails image, để tạo một project mới là rails_demo 

Sau khi chạy lệnh trên, bạn sẽ thấy một folder Rails mới.

### Cài đặt một vài thư viện chính

**Sửa Gemfile**

```
gem 'unicorn', '~> 5.5.2'
gem 'pg', '~> 1.2.2'
gem 'sidekiq', '~> 6.0.4'
gem 'redis-rails', '~> 5.0.2'
```

**Sửa cấu hình Database**

Ta sửa file `config/database.yml`:

```
---

development:
  url: <%= ENV['DATABASE_URL'].gsub('?', '_development?') %>

test:
  url: <%= ENV['DATABASE_URL'].gsub('?', '_test?') %>

staging:
  url: <%= ENV['DATABASE_URL'].gsub('?', '_staging?') %>

production:
  url: <%= ENV['DATABASE_URL'].gsub('?', '_production?') %>
```

Chúng ta dùng các biến môi trường cho cấu hình app. 

Thêm một vài config trong file `config/application.rb`:

```
module RailsDemo 
  class Application < Rails::Application
    # Since we're using Redis for Sidekiq, we might as well use Redis to back
    # our cache store. This keeps our application stateless as well.
    config.cache_store = :redis_store, ENV['CACHE_URL'],
                         { namespace: 'rails_demo::cache' }

    # If you've never dealt with background workers before, this is the Rails
    # way to use them through Active Job. We just need to tell it to use Sidekiq.
    config.active_job.queue_adapter = :sidekiq
    # ...
  end
end
```

### Tạo Unicorn Config

Thêm file `config/unicorn.rb`:

```
# Heavily inspired by GitLab:
# https://github.com/gitlabhq/gitlabhq/blob/master/config/unicorn.rb.example

# Go with at least 1 per CPU core, a higher amount will usually help for fast
# responses such as reading from a cache.
worker_processes ENV['WORKER_PROCESSES'].to_i

# Listen on a tcp port or unix socket.
listen ENV['LISTEN_ON']

# Use a shorter timeout instead of the 60s default. If you are handling large
# uploads you may want to increase this.
timeout 30

# Combine Ruby 2.0.0dev or REE with "preload_app true" for memory savings:
# http://rubyenterpriseedition.com/faq.html#adapt_apps_for_cow
preload_app true
GC.respond_to?(:copy_on_write_friendly=) && GC.copy_on_write_friendly = true

# Enable this flag to have unicorn test client connections by writing the
# beginning of the HTTP headers before calling the application. This
# prevents calling the application for connections that have disconnected
# while queued. This is only guaranteed to detect clients on the same
# host unicorn runs on, and unlikely to detect disconnects even on a
# fast LAN.
check_client_connection false

before_fork do |server, worker|
  # Don't bother having the master process hang onto older connections.
  defined?(ActiveRecord::Base) && ActiveRecord::Base.connection.disconnect!

  # The following is only recommended for memory/DB-constrained
  # installations. It is not needed if your system can house
  # twice as many worker_processes as you have configured.
  #
  # This allows a new master process to incrementally
  # phase out the old master process with SIGTTOU to avoid a
  # thundering herd (especially in the "preload_app false" case)
  # when doing a transparent upgrade. The last worker spawned
  # will then kill off the old master process with a SIGQUIT.
  old_pid = "#{server.config[:pid]}.oldbin"
  if old_pid != server.pid
    begin
      sig = (worker.nr + 1) >= server.worker_processes ? :QUIT : :TTOU
      Process.kill(sig, File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end

  # Throttle the master from forking too quickly by sleeping. Due
  # to the implementation of standard Unix signal handlers, this
  # helps (but does not completely) prevent identical, repeated signals
  # from being lost when the receiving process is busy.
  # sleep 1
end

after_fork do |server, worker|
  # Per-process listener ports for debugging, admin, migrations, etc..
  # addr = "127.0.0.1:#{9293 + worker.nr}"
  # server.listen(addr, tries: -1, delay: 5, tcp_nopush: true)

  defined?(ActiveRecord::Base) && ActiveRecord::Base.establish_connection

  # If preload_app is true, then you may also want to check and
  # restart any other shared sockets/descriptors such as Memcached,
  # and Redis. TokyoCabinet file handles are safe to reuse
  # between any number of forked children (assuming your kernel
  # correctly implements pread()/pwrite() system calls).
end
```

### Tạo file cài đặt Sidekiq

Ta thêm file `config/initializers/sidekiq.rb`:

```
sidekiq_config = { url: ENV['JOB_WORKER_URL'] }

Sidekiq.configure_server do |config|
  config.redis = sidekiq_config
end

Sidekiq.configure_client do |config|
  config.redis = sidekiq_config
end
```

**Whitelist Docker Host**

Rails có một tính năng bảo mật đó là chặn các truy cập từ các nguồn không định nghĩa. Tôi muốn các docker container khác giao tiếp với nhau, vì vậy cần thêm rails_demo containter vào danh sách trắng 

Ta sửa file `config/environment/development.rb`:

```
config.hosts << "rails_demo"
```

**Tạo File biến Environment**

Tạo file env chứa các biến môi trường ngang cấp với file `Dockerfile.rails`

```
$ cd ..
$ touch env-example
```

Nôi dung file biến môi trường có thể là:

```
# Docker user và group ids
# Trong Linux thì 2 giá này phải map với host 
USER_ID=1000 # bạn có thể lấy được bằng lệnh id -u
GROUP_ID=1000 # bạn có thể lấy được bằng lệnh id -g

WORKER_PROCESSES=1
LISTEN_ON=0.0.0.0:8010
DATABASE_URL=postgresql://user:test_db_password@postgres:5432/user?encoding=utf8&pool=5&timeout=5000

CACHE_URL=redis://redis:6379/0
JOB_WORKER_URL=redis://redis:6379/0
```

Copy file sang `.env` và cần bỏ .env khỏi git control:

```
$ cp env-example .env
$ echo ".env" >> .gitignore
```

## Dockerizing Rails Application

Tạo file `Dockerfile`:

```
# Dockerfile - Development environment
FROM ruby:2.7 

ARG USER_ID
ARG GROUP_ID

RUN addgroup --gid $GROUP_ID user
RUN adduser --uid $USER_ID --gid $GROUP_ID user

ENV INSTALL_PATH /opt/app
RUN mkdir -p $INSTALL_PATH

# nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg -o /root/yarn-pubkey.gpg && apt-key add /root/yarn-pubkey.gpg
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y --no-install-recommends nodejs yarn

# rails
RUN gem install rails bundler
COPY rails_demo/Gemfile Gemfile
WORKDIR /opt/app/rails_demo
RUN bundle install

RUN chown -R user:user /opt/app
USER $USER_ID
VOLUME ["$INSTALL_PATH/public"]
CMD bundle exec unicorn -c config/unicorn.rb
```

File này đã tạo Docker image với:

- NodeJS và Yarn
- Rails
- Các Gems trong Gemfile

Dòng cuối của Dockerfile đã chỉ định user, thêm permission cho file và khởi chạy unicorn HTTP server.

### Cấu hình Ngnix

Trong khi unicorn là đủ để hỗ trợ cho ứng dụng, nhưng với mục tiêu hiệu năng và bảo mật tốt hơn, thì bạn nên đặt thêm một server HTTP ở trước nữa. Một server HTTP cấu hình như một proxy reverse để bảo vệ ứng dụng khỏi các request chậm và tăng tốc kết nối thông qua cache.

Chúng ta sẽ dùng Nginx, và tạo file cấu hình _ reverse-proxy.conf _ đặt ngang cấp với Dockerfiles:

```
# reverse-proxy.conf

server {
    listen 8020;
    server_name example.org;

    location / {
        proxy_pass http://drkiq:8010;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Tạo file mới là `Dockerfile.nginx` để tạo Nginx image tuỳ chỉnh:

```
# Dockerfile.nginx

FROM nginx:latest
COPY reverse-proxy.conf /etc/nginx/conf.d/reverse-proxy.conf
EXPOSE 8020
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
```

### Tạo file dockerignore

Tạo file `.dockerignore` với nội dung sau:

```
.git
.dockerignore
.env
```

File này tương tự .gitignore, mục đích là bỏ qua các file hay folder khỏi quá trình build Docker image

# Docker Compose là gì?

Docker Compose cho phép bạn chạy 1 hay nhiều Docker container một cách dễ dàng. Bạn có thể định nghĩa mọi thứ trong file YAML và các dev khác chỉ cần chạy lệnh `docker-compose up` và mọi thứ sẽ chạy đồng thời.

## Tạo Docker Compose Configuration File

Ta tạo file `docker-compose.yml`:

```
version: "3.7"

services:

  postgres:
    image: postgres:12.1
    environment:
      POSTGRES_USER: user 
      POSTGRES_PASSWORD: test_db_password
    ports: 
      - '5432:5432'
    volumes:
      - user-postgres:/var/lib/postgresql/data

  redis:
    image: redis:5.0.7
    ports:
      - '6379:6379'
    volumes:
      - user-redis:/var/lib/redis/data

  rails_demo:
    build:
      context: .
      args:
        USER_ID: "${USER_ID:-1000}"
        GROUP_ID: "${GROUP_ID:-1000}"
    depends_on:
      - postgres
      - redis
    volumes:
      - type: bind
        source: ./drkiq
        target: /opt/app/rails_demo
    ports:
      - '8010:8010'
    env_file:
      - .env

  sidekiq:
    build:
      context: .
      args:
        USER_ID: "${USER_ID:-1000}"
        GROUP_ID: "${GROUP_ID:-1000}"
    command: bundle exec sidekiq 
    depends_on:
      - postgres
      - redis
    volumes:
      - type: bind
        source: ./rails_demo
        target: /opt/app/rails_demo 
    env_file:
      - .env

  nginx:
    build:
      context: .
      dockerfile: ./Dockerfile.nginx
    depends_on:
      - rails_demo 
    ports:
      - '8020:8020'

volumes:
  user-postgres:
  user-redis:
```

Từ file trên, ta có:

- Postgres và Redis sử dụng Docker volumes lưu lại data cho về sau.
- Postgres, Redis và rails_demo cùng expose một port 
- RailsDemo và Sidekiq cùng sử dụng volumes để mount app code cho việc edit trực tiếp 
- RailsDemo và Sidekiq cùng link đến Postgres và Redis và cùng đọc các biến môi trường từ .env 
- Sidekiq ghi đè lệnh CMD mặc định để chạy Sidekiq thay vì Unicorn 

![](https://images.viblo.asia/65d7f600-6be1-4621-9c2e-dd4b4c3fdee8.png)

## Tạo Volumes

Trong file docker-compose.yml, chúng ta cùng sử dụng các volume chưa tồn tại, ta có thể tạo ra bằng các lệnh:

```
$ docker volume create --name user-postgres
$ docker volume create --name user-redis
```

Khi dữ liệu được lưu trong PostgreSQL hay Redis, nó sẽ được lưu trong các volumes trên máy local của mình. Bằng cách này, bạn không cần phải lo lắng việc dữ liệu mất khi restart service, bởi vì Docker container là không có state.

## Chạy mọi thứ 

Chúng ta cùng chạy mọi thứ bằng lệnh:

```
$ docker-compose up
```

Lệnh trên chạy lần đầu sẽ mất nhiều thời gian bởi vì nó cần tải tất cả các Docker images mà ứng dụng yêu cầu.

Quá trình này nhanh chậm phụ thuộc vào tốc độ mạng

Khi đấy trên terminal sẽ hiện:

```
postgres_1       | ...
redis_1          | ...
rails_demo_1     | ...
sidekiq_1        | ...
nginx_1          | ...
```

Tuy nhiên container rails_demo_1 báo một lỗi là database không tồn tại. Đó là bởi vì chúng ta chưa khởi tạo database khi chạy Rails app.

### Khởi tạo Database

Ấn CTRL+C trong terminal để dừng lệnh up và chạy các lệnh sau để tạo database.

```
$ docker-compose run --user "$(id -u):$(id -g)" rails_demo rake db:reset
$ docker-compose run --user "$(id -u):$(id -g)" rails_demo rake db:migrate
```

Ta chạy lại lệnh up để khởi tạo tất cả:

```
$ docker-compose up
```

## Kiểm tra service 
Cùng check lại trong link: http://localhost:8020

## Làm việc với Rails app

Hiện tại source code ở trên máy của mình, và source code đã được mount vào Docker container trực tiếp thông qua volume. Nghĩa là mỗi khi bạn edit một file, thì sự thay đổi sẽ được phản ánh ngay lập tức.

VD: 

**Tạo một Controller**

Chạy lệnh sau để tạo Page controller:

```
docker-compose run --user "$(id -u):$(id -g)" rails_demo rails g controller Pages home
```

**Biên dịch lại Assets**

Để dịch lại CSS và JavaScript code hay dùng webpack để tối ưu, chúng ta dùng lệnh:

```
$ docker-compose run --user "$(id -u):$(id -g)" rails_demo rails webpacker:install
$ docker-compose run --user "$(id -u):$(id -g)" rails_demo rails assets:precompile
```

Trong phần này, chúng ta đã cùng xây dựng ứng dụng Rails khá đầy đủ các stack công nghệ bằng Docker 

Mọi người có thể xem code trên Github: https://github.com/sonlh-0262/docker-rails

Trong phần sau, chúng ta sẽ cùng tìm hiểu cách sử dụng Docker với CI/CD