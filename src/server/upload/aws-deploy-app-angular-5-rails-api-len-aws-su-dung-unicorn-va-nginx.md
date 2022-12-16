Chào các bạn, hẳn trong rất nhiều người khi vào đọc bài viết của mình đã từng hoặc rất nhiều lần deploy thành công ứng dụng Ruby on Rails lên AWS. Tuy nhiên khi các bạn deploy ứng dụng Angular version 2 trở đi, kết hợp với server gọi API nào đó, ví dụ ở đây là Rails API, nhiều bạn sẽ thắc mắc giống như mình là Angular 2 khác Angular 1 là nó sẽ chạy 1 cổng riêng biệt (`localhost:4200`), còn rails API sẽ chạy 1 cổng là `localhost:3000`. Vậy khi deploy lên thì 2 server này sẽ gọi nhau như thế nào nhỉ. Và việc deploy Angular 2 + Rails API sẽ khác gì so với việc bạn chỉ deploy app chỉ sử dụng Ruby on Rails. Hôm nay mình sẽ hướng dẫn các bạn cách deploy cũng như cách kết hợp Angular 5 và Rails.

# 1. Khúc dạo đầu
Trước mắt để có thể lên đỉnh từ A-Z cho việc deploy 1 ứng dụng Angular 5 kết hợp với Rails thì bạn phải chuẩn bị một số kiến thức cho một số vấn đề sau:
 ### 1.1 Nắm được phân quyền truy cập file: 
Tại sao mình nói các bạn cần phải lưu ý vấn đề này, vì khi deploy bạn sẽ rất thường xuyên phải gặp trường hợp không thể truy cập vào một số thư mục cũng như file. Dưới đây mình sẽ liệt kê một số quyền truy cập file thường gặp:
 + `chmod 777 filename`: Cấp quyền truy cập đầy đủ cho mọi đối tượng người dùng.
 + `chmod 775 filename`: Cấp quyền truy cập đầy đủ cho chủ hệ thống và nhóm quản trị, đối tượng người dùng chỉ có quyền đọc (read) và chạy (execute) file.
 + `chmod 755 dirname` : Cấp quyền truy cập đầy đủ cho chủ hệ thống, chỉ cho phép nhóm quản trị và đối tượng người dùng đọc và chạy các file trong thư mục.
 + `chmod 700 filename`: Chỉ cấp quyền truy cập đầy đủ cho chủ hệ thống và chặn truy cập với mọi đối tượng khác.
 + `chmod 660 filename` : Cho phép chủ hệ thống và nhóm quản trị đọc, sửa, xóa và ghi dữ liệu vào file, nhưng không phân quyền truy cập cho những người dùng khác.
 ### 1.2 Có tài khoản AWS
 https://aws.amazon.com/vi/
 Chỉ link là đủ :) Nhớ bạn phải có thẻ visa để có thể sử dụng một số dịch vụ free của AWS nhé.
 
 ***Lưu ý***: khi tạo tài khoản thành công bạn sẽ mất phí 1$
 ### 1.3 Nginx
 Tài liệu về Nginx khá nhiều, mình sẽ không giải thích kĩ, cụ thể Nginx là một **Web Server**, nhiệm vụ của Nginx trong việc này sẽ chạy các file `html, js, css` được build từ Angular. Cụ thể nó sẽ nằm trong thư mục `/dist`
 ### 1.4 Unicorn
 Unicorn thì cách sử dụng khá giống Puma, cái này do thói quen sử dụng nên mình chọn Unicorn, các bạn cũng có thể dùng Puma hoặc Passenger cho việc deploy. Khi sử dụng Unicorn nó sẽ là 1 app server. Bạn cứ tưởng tượng khi ở local khi chạy rails thì bạn sẽ cần phải **rails server**, giờ thì cả thế giới cứ để Unicorn nhé.
 
Khúc dạo đầu đã xong, giờ mình sẽ hướng dẫn chi tiết việc tạo tài khoản cũng như deploy nhé.

# 2. Đi vào chuyên 'sâu'
### 2.1 Tạo EC2 Instance trên AWS
- Click vào EC2
 ![](https://images.viblo.asia/6748b9d0-ba6e-4849-b148-aea2b5ed0c34.png)
- Bấm vào `Launch Instance`
- Chọn cái này
 ![](https://images.viblo.asia/6639f415-27c5-486c-bcec-16c7951d98d1.png)
- Tiếp tục bấm `Review and Launch`
- Click vào `Launch` sẽ hiển thị modal như dưới:
 ![](https://images.viblo.asia/d6f4c741-1874-47f5-a6e7-66c73be889e6.png)
 
Bạn chọn mục `Create new key pair` vào bấm Download. **Chú ý key này chỉ down được một lần duy nhất, tuyệt đối không được làm mất và giữ bảo mật cho key này**
- sau khi hoàn thành nó sẽ hiển thị như dưới 
 ![](https://images.viblo.asia/c85a7387-8c92-4ef1-ac0f-0fd93194fec6.png)
### 2.2 Kết nối với EC2
- Sau khi đã tạo thành công EC instance, nó sẽ cấp cho bạn một cái key, như mình đã nói key này chỉ sử download được 1 lần duy nhất, nên bạn phải chú ý giữ cái key này. Tiếp theo để kết nối vào EC2, khi bạn bấm connect ở trên trang aws chứa instance bạn vừa tạo, nó sẽ hiển thị 2 dòng lệnh là:
 ```
 chmod 400 ***key.pem
 ssh -i "***key.pem" ubuntu@ec2-**-**-***-**.us-east-2.compute.amazonaws.com
 ```
Bạn đi vào thư mục chứa key vừa download rồi copy y chang rồi chạy nhé. Nếu thành công nó sẽ hiển thị như hình ảnh bên dưới. Ở bước này tỉ lệ thất bại rất ít, nếu lỡ có lỗi bạn xem lại các bước trên xem mình làm sai ở đâu ko nhé.
![](https://images.viblo.asia/9d7e19f8-76d4-4757-b1bf-e969819bb407.png)
### 2.3 Tạo user - ssh key authentication
- Vì sao mình phải tạo user mới ? mặc định khi kết nối vào EC2, user sẽ là `ubuntu`, nếu mình không tạo user mới để deploy, thì có một ngày trong xanh ngát xanh nào đó, bạn lỡ tay xóa mất đi file chứa ssh-key, hoặc bạn thay đổi mất sss-key thì bạn sẽ không thể nào kết nối được lại vào server ubuntu. Hãy ghi nhớ điều này nhé, luôn tạo ra user mới khi lần đầu tiên kết nối vào EC2. Ở đây mình sẽ tạo ra user là `deploy`
- Tiếp theo mình phải cấp quyền sudo cho user này, mở file `/etc/sudoers`, thêm đoạn này vào 
```
%deploy ALL=(ALL) ALL
```
![](https://images.viblo.asia/1e184e17-acc2-48ee-b083-4171869626be.png)
- Tiếp theo để kết nối trực tiếp từ máy local, Đầu tiên mình sẽ tạo ra ssh-key trên máy local ở của bạn, nhớ mở 1 terminal mới nhé:  
```
ssh-keygen -t rsa -C <local_name> #local_name là tên gì mà bạn thích
```
Sau khi chạy lệnh trên xong nó sẽ sinh ra ssh-key cho bạn. Gõ `cat ~/.ssh/id_rsa.pub` để lấy nội dung của ssh public_key, copy key đó và vứt vào file `authorized_keys`. Tạo file `authorized_keys` như sau (server `deploy` bạn vừa tạo)

```
mkdir .ssh
sudo chmod 700 .ssh
nano ~/.ssh/authorized_keys
sudo chmod 600 ~/.ssh/authorized_keys
``` 

Khi bạn có key này, bạn có thể truy cập vào user `deploy` thông qua câu lệnh:
```
ssh deploy@18.**.**.** # ở đây chính là ip của server user **deploy** nhé.
```
### 2.4 Cài đặt môi trường trên Server
- Về cơ bản server này cũng giống y chang như server trên local của bạn. Bạn code Ruby, Angular, bạn cần thư viện gì thì cứ đưa hết vào trong đó. Cài đặt thì như bình thường thôi, các bạn tham khảo bài viết này:
 
https://viblo.asia/p/series-huong-dan-lap-trinh-ruby-on-rails-phan-1-mrDkMrrNvzL

- Cài đặt thêm GIT
```
sudo apt-get install git
```
- Cài đặt Nginx
```
sudo apt-get install nginx
```

# 3. 'Sâu' hơn tí nữa
Sau khi đã cài đặt xong xuôi ở phần 2, bây giờ mình sẽ hướng dẫn bạn cấu hình nginx cho Angular, unicorn cho Rails nhé. Ở đây mình sẽ nói qua cấu trúc thư mục như sau:
```
 --app/
      src
      node_module
      server
      package.json
      ...
      ...
```
Trong thư mục app sẽ chưa toàn bộ thư mục của dự án Angular, và mình sẽ tạo thư mục server ở trong thư mục app này, nó sẽ chưa toàn bộ code Rails ở trong đó.
### 3.1 Tạo project
Mình đã tạo sẵn một project trên github, các bạn clone nó về nhé: https://github.com/Huyliver6793/app-test 
Khi lấy project về bạn nhớ chạy `npm install` và `bundle install`, `rake db:create db:migrate db:seed`
Ok giờ đã xong phần tạo project, chúng ta đi vào việc cấu hình nginx và unicorn.
### 3.1 Unicorn
Đầu tiên bạn sẽ cần phải cd/ vào thư mục app-test mà tạo ra folder `config` chưa file `unicorn.rb`
```
 cd/app-test
 mkdir config
 sudo nano config/unicorn.rb
```

Trong file `unicorn.rb` bạn copy đoạn code sau vứt vào

```
#đây là thư mực app của bạn
root = "/home/deploy/app-test/server"
working_directory root
#pid của unicorn khi chạy
pid "#{root}/tmp/pids/unicorn.pid"
#log
stderr_path "#{root}/log/unicorn.error.log"
stdout_path "#{root}/log/unicorn.access.log"

#chạy với sock
listen "#{root}/shared/sockets/unicorn.sock"
preload_app true

worker_processes 2
timeout 30
```

Ở đây bạn sẽ tạo ra một số file, phục vụ cho file `unicorn.rb` ở trên. Tạo folder `pids` trong thư mục `tmp`

```
 cd app-test/server/tmp
 mkdir pids
```

Tạo thư mục chứa file `unicorn.sock`

```
 cd app-test/server
 mkdir -p shared/sockets
```

Tiếp tục để bạn có thể `start/stop/restart` unicorn, bạn cần phải tạo ra 1 file để thực hiện điều này. Và chúng ta sẽ tạo file đó như sau:
```
    sudo nano /etc/init.d/unicorn_app #bạn đặt tên gì cũng được nhé, tốt nhất là unicorn_(tên dự án)
```

Copy đoạn bên dưới vứt vào fiel ở trên:
```
#!/bin/sh

### BEGIN INIT INFO
# Provides:          unicorn
# Required-Start:    $all
# Required-Stop:     $all
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: starts the unicorn app server
# Description:       starts unicorn using start-stop-daemon
### END INIT INFO

set -e

USAGE="Usage: $0 <start|stop|restart|upgrade|rotate|force-stop>"

# app settings
USER="deploy" # tên user server của bạn
APP_ROOT="/home/deploy/app-test" # đường dẫn chứa dự án 
ENV="production"

# environment settings
PATH="/home/$USER/.rbenv/shims:/home/$USER/.rbenv/bin:$PATH"
CMD="cd $APP_ROOT/server && bundle exec unicorn -D -c $APP_ROOT/config/unicorn.rb -E production"
PID=$APP_ROOT/server/tmp/pids/unicorn.pid
OLD_PID="$PID.oldbin"

# make sure the app exists
cd $APP_ROOT || exit 1

sig () {
  test -s "$PID" && kill -$1 `cat $PID`
}

oldsig () {
  test -s $OLD_PID && kill -$1 `cat $OLD_PID`
}

case $1 in
  start)
    sig 0 && echo >&2 "Already running" && exit 0
    echo "Starting $APP_NAME"
    su - $USER -c "$CMD"
    ;;
  stop)
    echo "Stopping $APP_NAME"
    sig QUIT && exit 0
    echo >&2 "Not running"
    ;;
  force-stop)
   echo "Force stopping $APP_NAME"
    sig TERM && exit 0
    echo >&2 "Not running"
    ;;
  restart|reload|upgrade)
    sig USR2 && echo "reloaded $APP_NAME" && exit 0
    echo >&2 "Couldn't reload, starting '$CMD' instead"
    $CMD
    ;;
  rotate)
    sig USR1 && echo rotated logs OK && exit 0
    echo >&2 "Couldn't rotate logs" && exit 1
    ;;
  *)
    echo >&2 $USAGE
    exit 1
    ;;
esac
```
Tiếp theo ta cần thay đổi quyền truy nhập của script và cho phép Unicorn tự khởi động khi boot hệ điều hành.
```
sudo chmod 755 /etc/init.d/unicorn_app
sudo update-rc.d unicorn_appname defaults
```
Và lúc này khi khởi động unicorn bạn chỉ cần `sudo service unicorn_app start` . Khi start nó sẽ chạy file `config/unicorn.rb` sinh ra 2 file là `unicorn.pid` và `unicorn.sock`

### 3.4 Nginx
Sau khi cài đặt nginx, thì nó đã có sẵn file thực hiện việc start, stop nên mình không cần phải tạo như file unicorn. Bây giờ mình sẽ phải thiết lập việc nginx sẽ lắng nghe socket nào, cũng như thiết lập url chứa thư mục các file html, js, css sau khi build dự án.
Trước hết bạn vào đường dẫn sau `cd ../../etc/nginx`, bạn bấm `ls` để hiển thị tất cả các file trong này, tìm đến 2 thư mục là `sites-enable` và `site-available`, trong 2 thư mục đó có file `default` bạn xóa hết đi nhé. Sau khi xóa bạn tạo file sau:
```
sudo nano /etc/nginx/sites-enabled/app-test  
```

Copy đoạn code sau vứt vào thư mục trên:

```
upstream unicorn {
  server unix:/home/deploy/app-test/server/shared/sockets/unicorn.sock fail_timeout=0;
}

server {
  listen 80 default deferred;
  server_name localhost;
  root /home/deploy/app-test/dist;

  location / {
    try_files $uri /index.html;
  }

  try_files $uri/index.html $uri @unicorn;
  location /api {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_pass http://unicorn;
  } 
  
  error_page 500 502 503 504 /500.html;
  client_max_body_size 4G;
  keepalive_timeout 10;
}
```
Ở đây nhiều bạn sẽ thắc mắc file /dist ở đâu ra, đó chính là khi bạn sử dụng `ng build --prod` nó sẽ tự tạo ra thư mục này, chứa tất cả trang html, js, css dự án của bạn. 
Ngoài ra vì sẽ có thể có nhiều dự án sử dụng nginx, nên bạn phải để ý thay đổi ở `listen 80` nhé, nếu đã có thằng khác dùng rồi, thì đổi nó qua port khác. 
Tiếp theo mình đang đặt tên cho `upstream` là unicorn, khi mà bạn đang sử dụng 1 nginx cổng khác, và đang dùng upstream để lắng nge socket từ server thì nên đổi tên nhé. Tránh việc trùng tên của upstream
Sau khi cấu hình xong bạn có thể dùng lệnh `sudo nginx -t` để kiểm tra xem cấu hình chạy đúng không, nếu đúng sẽ hiển thị như sau:

![](https://images.viblo.asia/61203a25-1636-4109-b217-2817c9c0c6b8.png)

**LƯU Ý**
Và sẽ có câu hỏi đặt ra là, khi cả angular lẫn rails đều chạy chung một server, thì sẽ bị conflic router, vì rails sẽ có router riêng của nó, angular cũng có router riêng của nó, ví dụ, khi bạn sử dụng url của angular `/user_test/1`, bạn tiếp tục reload trang sẽ hiển thị lỗi không tìm thấy router này, bởi vì Rails làm gì có router đó đâu. Vì nó đang chạy chung 1 server của EC2 nên lỗi đó hiển nhiên xảy ra. Việc của chúng ta sẽ phải yêu cầu server dùng router của Angular, và ở file trên mình đã tạo ra 2 `location`. ở location đầu tiên nó sẽ luôn chạy file index html, ở location thứ 2, là chỉ nhận tất cả các router với định dạng là `/api`. Như vậy vấn đề trên đã được giải quyết được vấn đề trên.

### 3.5 Một số lỗi thường gặp
Sau khi start nginx và unicorn nếu cả 2 server này chạy ngon lành thì bạn thử test xem đã chạy ok chưa nhé. Đây là thành quả của mình http://18.222.125.176:81/ . Nếu hiển thị ra dữ liệu và F12 lên không bị bất cứ lỗi gì là ngon lành cành đào. Còn không bạn hay check log unicorn ở trong thư mục `server/log/unicorn.error.log` hoặc `server/log/production.log` và `/etc/nginx/error.log`. Ngoài ra mình sẽ liệt kê một số lỗi thường gặp sau:
- *Local workspace file ('angular.json') could not be found.* : bạn quên chạy `npm install`
- */home/demo/.rvm/gems/ruby-2.3.1/gems/unicorn-5.4.1/lib/unicorn/configurator.rb:84:in read': No such file or directory @ rbsysopen - config/unicorn.rb (Errno::ENOENT)*
Lỗi trên có thể đường dẫn của bạn đến thư mục unicorn.rb đang bị sai hoặc bạn chưa tạo 2 folder `pids` `shared/sockets`
- *master failed to start, check stderr log for details* : Ý nó là mày vào log của unicorn mà coi
- *FATAL ERROR: NewSpace::Rebalance Allocation failed - process out of memory` thường cái này xảy ra khi bạn dùng lệnh* `ng build --prod`, mình cũng đã mất rất lâu cho lỗi này cho đến khi mình restart lại EC instance của mình
- *can't cd unicorn* lỗi này là khi bạn chạy unicorn, nó không thể cd vào thư mục của bạn. Nếu gặp trường hợp này bạn hãy copy paste file đó ra 1 file khác, rồi restart unicorn lại thử
```
cd /etc/init.d/
sudo cp unicorn unicorn_appname
sudo service unicorn_appname start
```
- ```/home/demo/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/fileutils.rb:253:in `mkdir': Permission denied @ dir_s_mkdir - /run/user/1000/spring-1002 (Errno::EACCES)``` : Lỗi này khi bạn chạy `rails c`, cách giải quyết là bạn chạy câu lệnh sau: `unset XDG_RUNTIME_DIR`
- Còn lại lỗi gì khó quá, fix mãi không xong cứ rebot lại instance của bạn nhé

# 4 Lên đỉnh
Sau khi đã cấu hình hoàn chỉnh ác bước bạn chạy `ng build --prod` để build dự án vào thư mục `app-test/dist/`. sau khi build thành công sẽ hiển thị như sau: 

![](https://images.viblo.asia/07b84946-3d07-4300-b993-bfaf2ed4791b.png)

Tiếp theo bạn nhở mở port mà bạn đã cài đặt trong phần nginx, ở đây mình đang đặt cổng 80 nên bạn mở cổng 80 nhé, bạn mở cổng bằng cách sau. Trên trang Ec2 instance của bạn, phía bên trái click vào `Security Group` sẽ hiển thị như bên dưới 

![](https://images.viblo.asia/037d431b-32eb-4699-8b7c-2329560104c3.png)

Click vào `Edit` chọn `HTTP` mặc định nó sẽ là cổng 80 hoặc `Custom TCP Rule` bạn có thể tự chọn cổng cho mình
Để chạy dự án của mình bạn vào trang web trên aws để lấy ip, thường nó sẽ nằm ở đây

![](https://images.viblo.asia/083d0c82-2195-4825-985c-cdb6f6874232.png)

Và đây là thành quả của mình http://18.222.125.176:81/ Khi deploy cho Rail như thường lệ sẽ có gem Caspitrano. Hiện tại mình chỉ deploy thủ công là chạy từng dòng lệnh một, chứ chưa có deploy tự động giống như Capistrano, nhưng sẽ có cách deploy tự động khác, mình sẽ giới thiệu sau.

Chúc các bạn thành công! Nếu có lỗi gì cứ comment bên dưới nhé