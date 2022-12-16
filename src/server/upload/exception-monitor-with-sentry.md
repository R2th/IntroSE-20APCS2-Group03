Trước đây mình có 2 bài viết liên quan đến log management là:

* [**Quản lý log ứng dụng với ELK Stack (Elasticsearch, Logstash và Kibana)**](https://viblo.asia/p/quan-ly-log-ung-dung-voi-elk-stack-elasticsearch-logstash-va-kibana-Qbq5QJzmKD8)
* [**Quản lý log ứng dụng với GrayLog 2**](https://viblo.asia/p/quan-ly-log-ung-dung-voi-graylog-2-924lJOGY5PM)

Nay, mình xin phép giới thiệu tiếp một thể loại nữa là exception monitoring - Sentry.

Trong thực tế, khi chúng ta đưa ứng dụng lên môi trường beta (hay testing) để cho Q.A kiểm thử. Sẽ có những lúc phát sinh ra lỗi trong quá trình vận hành. Lúc đó, chúng ta rất mất công phải access vào server và đọc file log để tìm lỗi. Hoặc nhanh hơn chút thì nhờ Q.A tái hiện lại và thực hiện đọc log trực tiếp để xem nó là lỗi gì. Phát sinh ở file nào, dữ liệu ra làm sao. Thằng **Sentry** được sinh ra để giúp chúng ta việc này, nó sẽ giám sát ứng dụng và thực hiện lưu lại các lỗi (nếu phát sinh) giúp chúng ta chủ động phát hiện lỗi hay đơn giản chỉ là giúp chúng ta đọc lỗi nhanh, chi tiết.

Sentry hỗ trợ chúng ta hai phương thức cài đó là sử dụng luôn Docker image và cài đặt thông qua Python PIP. Nhưng trong bài viết này, mình sẽ hướng dẫn mọi người cài đặt bằng tay (từ đầu đến cuối) trên Docker thay vì dùng Docker image. Cảm giác cài cắm từ đầu đến cuối nó vẫn sướng hơn là dùng sẵn có (dùng cho mục đích học tập). Và chúng ta sẽ sử dụng image Ubuntu 16.04 để cài đặt và sử dụng Sentry. Mặc định bạn đã cài và biết cơ bản về Docker rồi nhé. Giờ chúng ta bắt đầu thôi.

## Cài đặt Sentry

Đầu tiên, chúng ta khởi tạo một container từ image Ubuntu 16.04 (nếu chưa có image này cũng không sao, vì Docker nó tự pull về):

```
sudo docker run --name sentry_server -it ubuntu:16.04 /bin/bash
```

Sau khi thực hiện lệnh trên xong, bây giờ chúng ta đang ở trong Docker container rồi. Và mặc định cũng đã ở quyền root. Nên chúng ta sẽ làm mọi lệnh mà không cần đến prefix `sudo`.

Việc đầu tiên sau khi vào Docker container là chúng ta update lại APT cache và cài cắm một số package thiết yếu (nếu chưa có - vì có thể image này là bản minimal để giảm dung lượng image).

```
apt-get update
```

Sau khi update xong, cài các packages cần thiết:

```
apt-get install -y wget curl apt-transport-https vim python-software-properties software-properties-common sudo
```

Sau đó, chúng ta cài PostgreSQL để lưu dữ liệu. Do trong doc của Sentry có giới thiệu đến image `postgre:9.5` nên chúng ta dùng bản 9.5 thay vì bản mới nhất là 10.4 trên trang chủ cho an toàn. Và do Ubuntu 16.04 có repository của PostgreSQL 9.5 rồi nên chúng ta cài rất đơn giản:

```
apt-get install -y postgresql-9.5
```

Sau khi cài đặt xong, chúng ta sửa lại config cho PostgreSQL một chút để cho phép chúng ta kết nối vào database postgres mà không có password. Sửa file `pg_hba.conf`:

```
vi /etc/postgresql/9.5/main/pg_hba.conf
```

và sửa dòng:

```
local   all             postgres                                peer
```

sang:

```
local   all             postgres                                trust
```

Sau đó, khởi động PostgreSQL bằng lệnh:

```
service postgresql start
```

Tiếp theo, chúng ta cài Redis server. Do Redis version trong APT thấp hơn so với yêu cầu của Sentry (là 3.2 trở lên) nên chúng ta thêm PPA repository [chris-lea/redis-server](https://launchpad.net/~chris-lea/+archive/ubuntu/redis-server) để cài bản mình cần. Đầu tiên là thêm APT repository và update lại APT cache

```
add-apt-repository -y ppa:chris-lea/redis-server && apt-get update
```

Cài đặt Redis server:

```
apt-get install -y redis-server
```

Sau khi cài đặt xong, chúng ta start Redis server lên:

```
service redis-server start
```

Sau đó, test thử một lệnh xem Redis server có hoạt động không:

```
redis-cli ping
```

Nếu chúng ta nhận được message `PONG` là :ok: rồi đó :D! Tiếp theo, cài đặt Node.JS. Do Node.JS trong APT cache bản thấp quá (4.2) nên chúng ta cài đặt theo hướng dẫn từ trang chủ với bản 8.x. Đầu tiên là tải file setup cho bản 8.x:

```
curl -sL https://deb.nodesource.com/setup_8.x | bash -
```

Sau đó, cài đặt Node.JS và NPM:

```
apt-get install -y nodejs
```

Vậy là xong phần phụ trợ bên ngoài, giờ chúng ta bắt đầu phần chính là cài đặt Sentry. Đầu tiên là cài các packages cần thiết để có thể cài đặt và chạy được Sentry:

```
apt-get install -y build-essential autoconf libtool pkg-config python-opengl python-imaging python-pyrex python-pyside.qtopengl idle-python2.7 qt4-dev-tools qt4-designer libqtgui4 libqtcore4 libqt4-xml libqt4-test libqt4-script libqt4-network libqt4-dbus python-qt4 python-qt4-gl libgle3  libssl-dev python-setuptools python-dev libxslt1-dev gcc libffi-dev libjpeg-dev libxml2-dev libxslt-dev libyaml-dev libpq-dev
```

Tiếp đó, cài đặt PIP thông qua `easy_install` (về bản chất, cái gì cài qua PIP cũng có thể cài qua `easy_install`, nhưng doc nó yêu cầu PIP thì chúng ta dùng PIP :D và cài qua PIP cũng có nhiều thứ hay hơn, bạn có thể tham khảo [**tại đây**](https://packaging.python.org/discussions/pip-vs-easy-install/)):

```
easy_install pip
```

Sau khi cài xong PIP, chúng ta cài VirtualEnv để chạy Sentry (tránh việc cài nhiều Python packages có thể ảnh hưởng đến hệ thống thật - trong trường hợp không dùng Docker):

```
pip install -U virtualenv
```

Sau khi cài đặt VirtualEnv xong, chúng ta dùng VirtualEnv tạo một môi trường để cài đặt Sentry:

```
virtualenv /www/sentry/
```

Sau khi đợi nó tạo xong, chúng ta truy cập vào môi trường của VirtualEnv nhé:

```
cd /www/sentry && source bin/activate
```

OK, vậy là bây giờ bạn cài bất cứ một Python package nào cũng không sợ nó ảnh hưởng ở môi trường thật nữa rồi. Chúng ta cài Sentry luôn nào:

```
pip install -U sentry
```

Quá trình cài Sentry khá lâu. Chúng ta cần kiên nhẫn :D. Sau khi cài đặt xong, chúng ta bước vào phần cấu hình Sentry. Đầu tiên là khởi tạo thư mục chứa các cài đặt cho nó:

```
sentry init /etc/sentry
```

Khi thực hiện lệnh trên, chúng ta sẽ có hai file `config.yml` và `sentry.conf.py` trong thư mục `/etc/sentry`. Để cấu hình kết nối tới PostgreSQL thì bạn có thể sửa file `sentry.conf.py`, còn cấu hình về Redis hay email thì bạn sửa file `config.yml`. Mặc định chúng ta không cần sửa gì cả do chúng ta dùng mặc định của PostgreSQL và Redis rồi. Nên chúng ta sang bước tạo database và migration dữ liệu luôn. Đầu tiên là tạo locale UTF-8 để sử dụng trong PostgreSQL (do Docker image này chưa có locale này):

```
locale-gen en_US.UTF-8 
```

Sau đó khởi động lại PostgreSQL:

```
service postgresql restart
```

Sau đó, chuyển sang user `postgres`:

```
su - postgres
```

Và thực hiện tạo database cho Sentry:

```
createdb -E UTF8 -T template0 --locale=en_US.utf8 sentry
```

Sau khi tạo xong database, chúng ta logout khỏi user `postgres` để quay về user `root` trên Docker và thực hiện tạo database schema:

```
SENTRY_CONF=/etc/sentry sentry upgrade
```

Trong quá trình tạo schema, Sentry sẽ hỏi chúng ta có muốn tạo user luôn hay không. Bạn có thể nhập `Y` để tạo luôn hoặc `n` để tạo sau. Mình nghĩ chúng ta sẽ tạo sau khi nó thực hiện migration xong. Sau khi chạy xong, chúng ta thực hiện tạo user:

```
SENTRY_CONF=/etc/sentry sentry createuser
```

Chúng ta thực hiện nhập Email, Password và Confirm password. Ở phần _Should this user be a superuser_ chúng ta nên chọn `yes` nhé.

Vậy là xong, giờ chúng ta sang phần chạy Sentry dưới dạng service bằng Supervisor. Đầu tiên là cài đặt `supervisor`:

```
apt-get install -y supervisor
```

Sau khi cài xong, chúng ta tạo Supervisor config cho Sentry:

```
vi /etc/supervisor/conf.d/sentry.conf
```

Rồi nhập nội dung sau:

```
[program:sentry-web]
directory=/www/sentry/
environment=SENTRY_CONF="/etc/sentry"
command=/www/sentry/bin/python /www/sentry/bin/sentry start
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=syslog
stderr_logfile=syslog

[program:sentry-worker]
directory=/www/sentry/
environment=SENTRY_CONF="/etc/sentry",C_FORCE_ROOT=true
command=/www/sentry/bin/python /www/sentry/bin/sentry run worker
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=syslog
stderr_logfile=syslog

[program:sentry-cron]
directory=/www/sentry/
environment=SENTRY_CONF="/etc/sentry"
command=/www/sentry/bin/python /www/sentry/bin/sentry run cron
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=syslog
stderr_logfile=syslog
```

Khởi động Supervisor bằng lệnh:

```
service supervisor start
```

Sau đó, bạn có thể kiểm tra xem các service đã chạy chưa bằng lệnh:

```
supervisorctl
```

Và nếu nhận được kết quả dạng như sau là thành công:

```
sentry-cron                      RUNNING   pid 11961, uptime 0:00:52
sentry-web                       RUNNING   pid 11960, uptime 0:00:52
sentry-worker                    RUNNING   pid 12115, uptime 0:00:01
```

Mặc định Sentry sẽ chạy ở cổng 9000. Nhưng do đang dùng Docker nên chúng ta sẽ cho nó về cổng 80 để truy cập thẳng vào IP của Docker mà không cần dùng port cho đỡ xấu xí nhá :D. Mở file `/etc/sentry/sentry.conf.py` và tìm đến đoạn `SENTRY_WEB_PORT` và sửa từ `9000` sang `80` rồi thực hiện khởi động lại Supervisor là xong. Giờ chúng ta có thể truy cập vào Sentry thông qua IP của Docker rồi đó. Để lấy được IP của Docker container bạn thực hiện lệnh sau:

```
hostname -i
```

Vậy là xong. Giờ chúng ta vào Sentry và đăng nhập với thông tin tài khoản mà chúng ta vừa tạo ở trước để thực hiện cài đặt nốt thôi nào :D!

Sau khi login xong, bạn sẽ được chuyển đến trang Setup Sentry. Tại đây, chúng ta quan tâm phần **Root URL**, bạn cần nhập đúng địa chỉ IP của Docker, ví dụ: `http://172.17.0.2` sau đó nhập nốt một số thông tin khác và bấm Continue.

Vậy là bây giờ bạn có thể khám phá thằng Sentry rồi đấy :D. Bây giờ bạn có thể tạo project để test được rồi. Thằng Sentry này hỗ trợ rất nhiều ngôn ngữ và framework nên bạn có thể thoải mái lựa chọn. Chúng ta thử phát nhé. Mình chọn Ruby on Rails để test.

Đầu tiên, bạn chọn **Add new...** => **Project** rồi chọn **Rails** và nhập tên project. Sau khi bấm create, nó sẽ hướng dẫn chúng ta cần phải làm gì. OK, cứ để đó, quay lại host. Tạo một project Rails để test thôi.

Bây giờ chúng ta lại làm việc ở host chứ không phải trong Docker container nữa. Tạo Rails project:

```
rails new test-sentry
```

Sau khi tạo xong, chúng ta thêm gem `sentry-raven` vào `Gemfile`:

```ruby
gem "sentry-raven"
```

Chạy lại bundle để cài:

```
bundle install
```

Sau đó, mở file `config/application.rb` và thêm dòng sau:

```ruby
    Raven.configure do |config|
      config.dsn = '<DSN URL>'
      config.async = lambda {|event|
        Thread.new{Raven.send_event event}
      }
    end
```

Phần DSN URL bạn lấy từ phần config trong giao diện của Sentry nhé. Xong, chúng ta tạo **home** controller với method **index**:

```
rails g controller home index
```

Và thêm vào file `config/routes.rb` với nội dung sau:

```ruby
  root to: "home#index"
```

Rồi tiếp tục mở file `app/controlles/home_controller.rb` và thêm `1 / 0` vào method index để cho phát sinh lỗi. Tiếp, chạy Rails server rồi truy cập vào http://localhost:3000. Sau khi thấy lỗi, bạn quay lại Sentry page để xem kết quả nhé :D!

{@youtube:https://youtu.be/gZZZW4nHlcI}

# Lời kết

Đến đây là bài kết thúc bài viết hướng dẫn cài đặt cơ bản Sentry từ A-Z. Sentry hỗ trợ rất nhiều ngôn ngữ và framework để bạn có thể sử dụng. Mọi người có thể đọc thêm documentation của nó [**tại đây**](https://docs.sentry.io/). Nếu trong quá trình cài đặt có vấn đề gì hoặc mình sai sót gì thì mọi người hãy để lại comment cho mình nhé. Chào thân ái và quyết thắng :wave:!

> Original post: https://namnv609.cf/posts/exception-monitor-with-sentry.html