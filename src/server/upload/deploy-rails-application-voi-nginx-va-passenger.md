Trong bài viết ngày hôm nay, mình sẽ làm một tutorial đơn giản, hướng dẫn các bạn từng bước hoàn chỉnh để deploy một chiếc rails application lên một máy server.
Để làm theo tutorial các bạn cần chuẩn bị 2 thứ :

* Một thư mục sourecode của một rails app đơn giản. 
* Một máy tính để làm server.

### 1. Hiểu cơ bản về quá trình deploy một web application.
Deploy là quá trình triển khai phần mềm để đưa vào trạng thái sẵn sàng phục vụ khách hàng. Với một web application, sau khi chúng ta đã code và test cẩn thận trên máy local (môi trường development), quá trình deploy sản phẩm lên một môi trường khác sẽ diễn ra (có thể là staging hoặc production). Môi trường khác ở đây là một máy server - khác với máy local mà chúng ta dùng để code. Chúng khác nhau ở một điểm cơ bản: máy server là nơi mà tất cả người dùng sẽ truy cập đến nên nó thường có cấu hình tốt hơn, đủ để chịu được khối lượng request lớn từ phía người dùng. 
Và quá trình deploy lên server có thể hiểu đơn giản gồm các bước:
* Copy thư mục code từ máy local lên máy server
* Cài đặt các package và kết nối internet cho máy server , để máy có thể chạy được phần code .
* Bật đúng port của máy server để có thể xử lý các HTTP request.
* Gán domain trỏ đến máy server

Để có thể làm theo tutorial này, các bạn cần có một máy PC có cài hệ điều hành Ubuntu để làm máy server (nó nên khác với máy mà các bạn dùng để coding). Nếu không có máy thật, các bạn có thể thuê các máy remote server với dịch vụ của [AWS EC2](https://aws.amazon.com/vi/ec2/), [Azure,](https://azure.microsoft.com/en-us/services/virtual-machines/) , [Google cloud computing](https://cloud.google.com/compute/)

### 2. Cài đặt các package để có thể chạy rails application
Đầu tiên, để có thể chạy được rails app trên máy server , chúng ta phải cài đặt một số package cơ bản:
Đầu tiên là cài ruby và **một trình quản lý phiên bản** ruby. Ở đây, mình chọn bộ đôi `rvm` và `ruby 2.5.1`. 
Cài rvm :
```
sudo gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | sudo bash -s stable
sudo usermod -a -G rvm `thaodp`
```
Trong hệ thống, mỗi khi ta dùng lệnh `sudo` với cờ `secure_path`, cần có một biến môi trường như thế này được setup `set rvmsudo_secure_path=1` . Ta sẽ chạy câu lệnh dưới đây để cài đặt`set rvmsudo_secure_path=1` ở những môi trường cần thiết:
```
if sudo grep -q secure_path /etc/sudoers; then sudo sh -c "echo export rvmsudo_secure_path=1 >> /etc/profile.d/rvm_secure_path.sh" && echo Environment variable installed; fi
```
**Quan trọng**,  sau khi chạy xong lệnh trên, tắt terminal đi và đăng nhập lại server của bạn, hoặc nếu bạn đang đăng nhập remote từ một máy chủ khác, hãy cũng tạo một ssh session mới để đăng nhập lại server. Nếu bạn không làm vậy, rvm sẽ không chạy. 

Sau đó cài `ruby 2.5.1` thông qua rvm:
```
rvm install ruby 2.5.1
rvm --default use ruby 2.5.1
```
Cài `rails`:
```
gem install rails
```
Cài `bundler` :
```
gem install bundler --no-rdoc --no-ri
```

Vì mình dùng rails, nên mình sẽ cần cả `nodejs package` nữa . Vì asset pipeline của rails yêu cầu một môi trường `Javascript runtime` . Chúng ta sẽ cài `nodejs` :
```
sudo apt-get install -y nodejs &&
sudo ln -sf /usr/bin/nodejs /usr/local/bin/node
```

### 3. Cài đặt passenger và nginx
Hiểu đơn giản, Nginx là `web-server` (giống như Apache), Passenger là một `app-server `(giống như Puma) .
Vậy web-server và app-server khác nhau như thế nào, chúng liên gì đến một rails app? 
Câu trả lời là:
* Khi một người dùng thực hiện một hành động trên ứng dụng web của bạn, tức là họ sẽ gửi một request từ máy client của họ lên server. Web-server sẽ trực tiếp xử lý các request đó trước tiên, sau đó sẽ chuyển request đó cho Rails app. Trong trường hợp request đó chỉ cần trả lại các file tĩnh (như HTML, CSS, JS, ảnh,... ) thì web-server sẽ lưu sẵn các file tĩnh ấy và thực hiện trả về response ngay mà không cần đẩy request sang phía Rails app.

* App-server là một phần của Rails app (app server mặc định của Rails là Puma , được tích hợp qua `gem 'puma'` ). App server tải code của app lên và giữ app đó trong bộ nhớ. Khi app server nhận được request từ web server, nó sẽ báo lại cho Rails app. Sau khi app xử lý xong request đó, app server sẽ gửi response lại cho web server (và cuối cùng là cho người dùng) .
Vậy tại sao mình lựa chọn bộ đôi passenger và nginx cho quá trình deploy? Vì passenger được tích hợp bên trong module nginx , nên việc cài đặt và tìm hiểu các hướng dẫn để sử dụng bộ đôi này khá đơn giản. 
Bây giờ chúng ta sẽ cài đặt Nginx:
```
sudo apt update
sudo apt install nginx
```
Kiểm tra xem server nginx đã chạy chưa bằng lệnh sau:
```
systemctl status nginx
```
Nếu trong terminal hiện ra như sau, có nghĩa là web-server của bạn đang chạy:
```
Output
● nginx.service - A high performance web server and a reverse proxy server
Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
Docs: man:nginx(8)
Main PID: 2369 (nginx)
Tasks: 2 (limit: 1153)
CGroup: /system.slice/nginx.service
├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
└─2380 nginx: worker process
```
Bạn cũng có thể bật trình duyệt và truy cập vào ip ứng với máy chủ của bạn. Nếu web-server đang chạy, trình duyệt sẽ hiện như sau:
![](https://images.viblo.asia/fa88acf3-2bcc-4138-950c-6a5681dc48f3.png)

Tiếp tục, ta sẽ cài đặt `passenger`:

```
# Install PGP key and add HTTPS support for APT
sudo apt-get install -y dirmngr gnupg
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo apt-get install -y apt-transport-https ca-certificates

# Add APT repository
sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update

# Install Passenger + Nginx
sudo apt-get install -y nginx-extras passenger
```

Ta sẽ `include` `module passenger + nginx` tích hợp sẵn trong `nginx` , bằng cách sửa file `/etc/nginx/nginx.conf`  ở dòng sau:
```
# include /etc/nginx/passenger.conf;
```
Ta bỏ dấu comment ở dòng đó đi:
```
include /etc/nginx/passenger.conf;
```

Nếu ta không tìm thấy dòng bên trên trong file `/etc/nginx/nginx.conf` , ta sẽ phải tự thêm nó vào trong `block http` như sau:
```
http {
    include /etc/nginx/passenger.conf;
    ...
}
```

Sau đó, ta restart lại `nginx`:
```
sudo service nginx restart
```

Sau khi cài đặt, chúng ta sẽ xác nhận lại quá trình cài đặt bằng lệnh sau:

```
sudo /usr/bin/passenger-config validate-install
```

Và các bước xác nhận sẽ hiện ra dấu tích `passed` như sau:
```
* Checking whether this Phusion Passenger install is in PATH... ✓
* Checking whether there are no other Phusion Passenger installations... ✓
....
```
Nếu có một số dấu passed không hiện ra, hãy làm theo chỉ dẫn trên terminal. 

Cuối cùng, chúng ta sẽ check các process của Nginx và Passenger bằng lệnh:
```
sudo /usr/sbin/passenger-memory-stats
```
Và chúng ta sẽ thấy trên màn hình như sau:
```
---------- Nginx processes ----------
PID    PPID   VMSize   Private  Name
-------------------------------------
12443  4814   60.8 MB  0.2 MB   nginx: master process /usr/sbin/nginx
12538  12443  64.9 MB  5.0 MB   nginx: worker process
### Processes: 3
### Total private dirty RSS: 5.56 MB

----- Passenger processes ------
PID    VMSize    Private   Name
--------------------------------
12517  83.2 MB   0.6 MB    PassengerAgent watchdog
12520  266.0 MB  3.4 MB    PassengerAgent server
12531  149.5 MB  1.4 MB    PassengerAgent logger
...
```
Nếu bạn không thấy được dòng `"Nginx processes"` hoặc `"Passenger processes"` , có nghĩa là bạn nên kiểm tra lại quá trình cài đặt từ bước đầu tiên. 
Sau khi đã cài đặt hoàn chỉnh các package, chúng ta sẽ đi vào quá trình deploy phần code của rails app.

###  4. Cài đặt sourecode của Rails app
Bước đầu tiên, chúng ta cần copy thư mục sourecode của máy local lên máy server. Trong tutorial này, thì mình sử dụng máy server là 1 máy PC ở gần, sử dụng cùng hệ thống mạng với máy local nên mình có thể dễ dàng share sourecode từ máy local sang máy server. Tuy nhiên, với các máy remote server trong thực tế, cách phổ biến nhất để làm điều này là sử dụng các version source control như git + github để clone code về. 
Để chắc chắn đã đẩy hết các thay đổi của code ở máy local lên nhánh chính, ta thực hiện push code:
```
git push
```
Tiếp theo, mình sẽ đăng nhập máy server từ máy local bằng lệnh SSH:
```
ssh adminuser@yourserver.com
```
Thay `adminuser` bằng tên account có quyền trên máy server của bạn. 
Vì một vài lý do bảo mật, bạn nên tạo một user mới - là user duy nhất có quyền chạy ứng dụng web của bạn. User này là người duy nhất có quyền truy cập vào các thư mục liên quan đến việc cài đặt , vận hành và phần sourecode của ứng dụng. Đây là một ý tưởng tốt nhằm hạn chế các lỗ hổng bảo mật có thể xảy ra. Bạn nên đặt tên của user giống với tên của web application để thuận tiện cho việc ghi nhớ. Ở đây mình sẽ đặt nó là `myappuser` :
```
sudo adduser myappuser
```
Và hãy cài đặt SSH keys cho user này:
```
sudo mkdir -p ~myappuser/.ssh
touch $HOME/.ssh/authorized_keys
sudo sh -c "cat $HOME/.ssh/authorized_keys >> ~myappuser/.ssh/authorized_keys"
sudo chown -R myappuser: ~myappuser/.ssh
sudo chmod 700 ~myappuser/.ssh
sudo sh -c "chmod 600 ~myappuser/.ssh/*"
```

Bây giờ ta sẽ cài đặt `git` ở trên máy server :
```
sudo apt-get install -y git
```
Mình sẽ pull thư mục sourecode về máy server, và đặt nó vào một thư mục với đường dẫn là `/var/www/APP_NAME` . (Hãy đặt đường dẫn theo cách mà bạn muốn)
```
sudo mkdir -p /var/www/myapp
sudo chown myappuser: /var/www/myapp
cd /var/www/myapp
sudo -u myappuser -H git clone git://github.com/username/myapp.git code
```
Đăng nhập vào `myappuser`
```
sudo -u myappuser -H bash -l
```

Bây giờ, chúng ta cần cài đặt các `dependencies` của rails app . Các dependencies này là các gem, các thư viện được quản lý bởi `Gemfile` . Bạn có thể cài đặt nó bằng cách chạy lệnh dưới đây:
```
cd /var/www/myapp/code
bundle install --deployment --without development test
```
Cờ `----deployment --without development test` ở đây nghĩa là bạn đang cài đặt các dependencies cho môi trường production . Rails app của bạn có thể còn phụ thuộc vào các services như PostgreSQL, Redis, ... Chúng không được cài thông qua lệnh `bundle`.  Bạn cần tìm cách tự cài chúng để rails app có thể chạy được. 

Bây giờ, chúng ta sẽ config các file `database.yml` và `secrets.yml` . Các file này thường bị để trong `.gitignore`, nên khi pull code về sẽ không có chúng ở trên máy server. Với file `database.yml` bạn cần copy chúng từ máy local của bạn. Nó sẽ trông như thế này:
```
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  host: <%= ENV["DATABASE_HOSTNAME"] %>
  database: <%= ENV["DATABASE_NAME"] %>
  username: <%= ENV["DATABASE_USERNAME"] %>
  password: <%= ENV["DATABASE_PASSWORD"] %>
  socket: /var/run/mysqld/mysqld.sock

test:
  <<: *default
  database: test<%= ENV["TEST_ENV_NUMBER"] %>

production:
  <<: *default
  database: <%= ENV["DATABASE_NAME"] %>
  username: <%= ENV["DATABASE_USERNAME"] %>
  password: <%= ENV["DATABASE_PASSWORD"] %>
```
File `secrets.yml` sẽ như thế này:
```
production:
  secret_key_base: <%=ENV["SECRET_KEY_BASE"]%>
```

Vì đây là các file rất quan trọng và cần được bảo mật nên bạn cần phân quyền cho `myappuser` - trở thành user duy nhất có thể thay đổi và chỉnh sửa 2 file này:
```
chmod 700 config db
chmod 600 config/database.yml config/secrets.yml
```

Bây giờ bạn đã có thể, chạy `database migrations` và complile cho `asset pipeline` của rails:
```
bundle exec rake assets:precompile db:migrate RAILS_ENV=production
```

### 5.  Cấu hình để Passenger + Nginx  để chạy rails app

Sau khi bạn đã hoàn tất việc pull code rails app về, bạn cần phải chỉ cho Passenger + Nginx biết cách để có thể chạy rails app của bạn . Nếu trên máy server của bạn có nhiều phiên bản Ruby đang được cài đặt, bạn cần cho Passenger biết, nó nên dùng trình thông dịch ruby nào? 
Đầu tiên, chạy lệnh:
```
$ passenger-config about ruby-command
```
Trong terminal sẽ hiện ra giống như thế này:
```
passenger-config was invoked through the following Ruby interpreter:
  Command: /usr/local/rvm/gems/ruby-2.3.3/wrappers/ruby
  Version: ruby 2.3.3p85 (2015-02-26 revision 49769) [x86_64-linux]
  ...
```
Hãy lưu đường dẫn đằng sau `key Command` vào đâu đó:
```
 Command: /usr/local/rvm/gems/ruby-2.3.3/wrappers/ruby
```
Bây giờ, hãy thoát khỏi `myappuser` account và trở lại với `admin` acount
```
myappuser$ exit
admin$
```

Chúng ta cần tạo một file config và thiết lập một máy ảo trỏ đến rails app của chúng ta. Máy ảo này sẽ nói cho Passenger + Nginx biết app của chúng ta nằm ở đâu:
```
sudo nano /etc/nginx/sites-enabled/myapp.conf
```
Copy nội dung sau đây vào file nói trên:
```
server {
    listen 80;
    server_name yourserver.com;

    # Tell Nginx and Passenger where your app's 'public' directory is
    root /var/www/myapp/code/public;

    # Turn on Passenger
    passenger_enabled on;
    passenger_ruby /path-to-ruby;
}
```
Bạn hãy thay các dòng:
* `yourserver.com` thay bằng domain trỏ đến máy chủ của bạn (có thể là địa chỉ ip của máy chủ) 
* `/var/www/myapp/code/` thay bằng đường dẫn trỏ đến thư mục sourecode của rails app
* `/path-to-ruby` thay bằng đường dẫn đã lưu ở sau key Command phía bên trên.

Xong rồi, bây giờ bạn có thể restart lại `Nginx` 
```
sudo service nginx restart
```

Bây giờ bạn có thể truy cập vào domain máy chủ của bạn bằng trình duyệt , để xem web-app của bạn đã chạy chưa:
![](https://images.viblo.asia/031254a0-e364-405d-b2db-dc3d6c6ba62f.png)

Đó là toàn bộ tutorial mà mình muốn trình bày. 



-----
References:

https://www.phusionpassenger.com/library/walkthroughs/deploy/ruby/ownserver/nginx/oss/trusty/deploy_app.html

https://www.javaworld.com/article/2077354/app-server-web-server-what-s-the-difference.html

https://medium.freecodecamp.org/lessons-learned-from-deploying-my-first-full-stack-web-application-34f94ec0a286