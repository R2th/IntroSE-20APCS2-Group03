# Extension PHP V8Js là gì ?
Source: https://github.com/phpv8/v8js
> V8Js is a PHP extension for Google's V8 Javascript engine. The extension allows you to execute Javascript code in a secure sandbox from PHP. The executed code can be restricted using a time limit and/or memory limit. This provides the possibility to execute untrusted code wit confidence.

V8js là 1 PHP extension cho Google V8 Javascript engine. Điều này cho phép chạy code javascript bên trong đoạn mã của PHP. 

Vậy tại sao người ta làm như vậy ??? :thinking::thinking::thinking:

Để hiểu được điều này chúng ta cùng học lịch sử :disappointed_relieved:

## Javascript engine là gì ?

Javascript engine là một chương trình hoặc trình thông dịch thực thi mã javascript.

Dưới đây là một số các Javascript engine nổi tiếng:

* SpiderMonkey  - Ông tổ của Javascript engine, được dùng trên trình duyệt web đầu tiên trên thế giới - Netscape Navigator, hiện tại đang được sử dụng trên Firefox, viết bằng C và C++.
* Chakra - Là một Javascript engine cũng khá lâu đời, ban đầu được sử dụng trên Internet Explorer và biên dịch JScript, nay được dùng cho Microsoft Edge, viết bằng C++.
* Rhino - Một Engine viết hoàn toàn bằng Java, cũng có lịch sử phát triển lâu đời từ Netscape Navigator, hiện tại được phát triển bởi Mozilla Foundation.
* V8 - Như mình đã giới thiệu ở trên.

## Tổng quan về V8
Nếu so sánh về thời điểm ra mắt thì V8 là engine cực trẻ. Engine này được thiết kế tối ưu hóa cho dự án javascript lớn và sự ra đời của Node.js là 1 minh chứng nổi trội.
![](https://images.viblo.asia/9b9347c8-6be1-41c3-9585-e5b92e6bfa65.png)
![](https://images.viblo.asia/45ae0609-e47e-4607-9fd8-4847ea2cc3d4.png)

Qua 2 hình ảnh trên chúng ta có thể nắm bắt được phần nào engine hoạt động đoạn nào.

## Câu hỏi đặt ra tại sao V8 lại nổi trội hơn engine khác ?
Các Javascript engine khác đều sử dụng cấu trúc dictionary-like để tìm kiếm vị trí của các property trong bộ nhớ. V8 hơn ở chỗ sẽ tự động tạo class ẩn mỗi khi property thêm vào object để có 1 đường đi tìm kiếm nhanh nhất. Ngoài ra còn có kiểu quan sát các method có xu hướng dùng đi dùng lại nhiều lần, khi đó nó sẽ lưu lại cache để tiện tái sử dụng nếu cùng tham số đầu vào đỡ phải mất công truy tìm property. Bên cạnh đó, V8 có cơ chế gom rác thông minh, các method, biến, object .. được tạo ra nằm trong bộ nhớ `heap`. V8 chia `heap` thành nhiều phần  để dễ quản lý, tương ứng mỗi phần có loại đối tượng nhỏ và to sẽ sử dụng cơ chế 'gom rác' khác nhau để tránh bị memory leaks. Tham khảo thêm cơ chế Garbage Collection (GC) hay gom rác https://v8.dev/blog/trash-talk

![](https://images.viblo.asia/28f54993-8fca-452e-86d5-3637e78955c0.png)

V8 còn có cách để thiết kế sao cho tối ưu hóa compiler như hình trên. Hiểu rõ hơn về các cơ chế như Ignition và TurboFan thì có link tham khảo https://v8.dev/blog/launching-ignition-and-turbofan

Mình cũng không muốn đi chi tiết quá sâu về engine và cách nó hoạt động. Mình mà theo cái mà trình biên dịch các thứ thì chắc chả phải là con người mà là máy lun :cold_sweat: . Đọc qua cho biết chứ thèm khát gì đâu. :rofl:
# Cách cài đặt V8Js trên docker.
https://hub.docker.com/r/stesie/v8js/ các bạn có thể tham khảo dockerhub do Stesie viết.

```docker
FROM phusion/baseimage:latest
MAINTAINER Stefan Siegl <stesie@brokenpipe.de>

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        git subversion make g++ python2.7 curl php7.0-cli php7.0-dev chrpath wget bzip2 && \
    ln -s /usr/bin/python2.7 /usr/bin/python && \
    \
    git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git /tmp/depot_tools && \
    export PATH="$PATH:/tmp/depot_tools" && \
    \
    cd /usr/local/src && fetch v8 && cd v8 && \
    git checkout 5.4.500.40 && gclient sync && \
    export GYPFLAGS="-Dv8_use_external_startup_data=0" && \
    export GYPFLAGS="${GYPFLAGS} -Dlinux_use_bundled_gold=0" && \
    make native library=shared snapshot=on -j4 && \
    \
    mkdir -p /usr/local/lib && \
    cp /usr/local/src/v8/out/native/lib.target/lib*.so /usr/local/lib && \
    echo "create /usr/local/lib/libv8_libplatform.a\naddlib out/native/obj.target/src/libv8_libplatform.a\nsave\nend" | ar -M && \
    cp -R /usr/local/src/v8/include /usr/local && \
    chrpath -r '$ORIGIN' /usr/local/lib/libv8.so && \
    \
    git clone https://github.com/phpv8/v8js.git /usr/local/src/v8js && \
    cd /usr/local/src/v8js && phpize && ./configure --with-v8js=/usr/local && \
    export NO_INTERACTION=1 && make all -j4 && make test install && \
    \
    echo extension=v8js.so > /etc/php/7.0/cli/conf.d/99-v8js.ini && \
    \
    cd /tmp && \
    rm -rf /tmp/depot_tools /usr/local/src/v8 /usr/local/src/v8js && \
    apt-get remove -y subversion make g++ python2.7 curl php7.0-dev chrpath wget bzip2 && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```
Ngoài ra các bạn có thể tham khảo sử dụng laradock kết hợp sau đây.
## Cài đặt laradock và sử dụng V8js cho php-fpm
Require: Cài đặt docker, docker-compose trước, cái này mình bỏ qua vì trên mạng khá nhiều.

Tổng quan, ta cần những bước sau để triển khai 1 dự án laravel với laradock

* Pull code laradock
* Chỉnh sửa cấu hình cho các container (nếu cần)
* Pull code laravel
* Cho các container start lên
* Vào workspace và chạy các câu lệnh cần thiết

Đầu tiên, pull code của laradock về:

`git clone https://github.com/laradock/laradock.git`

Chúng ta sẽ tổng hợp các project vào 1 chỗ là thư mục `web`
gõ `cp env-example .env`
Vào file .env, chỉnh biến `APP_CODE_PATH_HOST=../web`

Chúng ta chỉ sử dụng thứ cần thiết là Nginx, Workspace, php-fpm, mysql
trong `.env` kiểm tra các phiên bản để sử dụng cho chắc

```
### NGINX #################################################

NGINX_HOST_HTTP_PORT=80
NGINX_HOST_HTTPS_PORT=443
NGINX_HOST_LOG_PATH=./logs/nginx/
NGINX_SITES_PATH=./nginx/sites/
NGINX_PHP_UPSTREAM_CONTAINER=php-fpm
NGINX_PHP_UPSTREAM_PORT=9000
NGINX_SSL_PATH=./nginx/ssl/
```
```
### WORKSPACE #############################################

WORKSPACE_COMPOSER_GLOBAL_INSTALL=true
WORKSPACE_COMPOSER_REPO_PACKAGIST=
WORKSPACE_INSTALL_NODE=true
WORKSPACE_NODE_VERSION=10.15.3
WORKSPACE_NPM_REGISTRY=
WORKSPACE_INSTALL_YARN=true
WORKSPACE_YARN_VERSION=latest
WORKSPACE_INSTALL_NPM_GULP=true
WORKSPACE_INSTALL_NPM_BOWER=false
WORKSPACE_INSTALL_NPM_VUE_CLI=true
WORKSPACE_INSTALL_NPM_ANGULAR_CLI=false
WORKSPACE_INSTALL_PHPREDIS=true
WORKSPACE_INSTALL_WORKSPACE_SSH=false
WORKSPACE_INSTALL_SUBVERSION=false
WORKSPACE_INSTALL_XDEBUG=false
WORKSPACE_INSTALL_PHPDBG=false
WORKSPACE_INSTALL_SSH2=false
WORKSPACE_INSTALL_LDAP=false
WORKSPACE_INSTALL_GMP=false
WORKSPACE_INSTALL_SOAP=false
WORKSPACE_INSTALL_XSL=false
WORKSPACE_INSTALL_IMAP=false
WORKSPACE_INSTALL_MONGO=false
WORKSPACE_INSTALL_AMQP=false
WORKSPACE_INSTALL_MSSQL=false
WORKSPACE_INSTALL_DRUSH=false
WORKSPACE_DRUSH_VERSION=8.1.17
WORKSPACE_INSTALL_DRUPAL_CONSOLE=false
WORKSPACE_INSTALL_WP_CLI=false
WORKSPACE_INSTALL_AEROSPIKE=false
### V8js đoạn này trong môi trường dev bên trong workspace để xài v8js cần thì dùng không thì false
WORKSPACE_INSTALL_V8JS=true
WORKSPACE_INSTALL_LARAVEL_ENVOY=false
WORKSPACE_INSTALL_LARAVEL_INSTALLER=false
WORKSPACE_INSTALL_DEPLOYER=false
WORKSPACE_INSTALL_PRESTISSIMO=false
WORKSPACE_INSTALL_LINUXBREW=false
WORKSPACE_INSTALL_MC=false
WORKSPACE_INSTALL_SYMFONY=false
WORKSPACE_INSTALL_PYTHON=false
WORKSPACE_INSTALL_IMAGE_OPTIMIZERS=false
WORKSPACE_INSTALL_IMAGEMAGICK=false
WORKSPACE_INSTALL_TERRAFORM=false
WORKSPACE_INSTALL_DUSK_DEPS=false
WORKSPACE_INSTALL_PG_CLIENT=false
WORKSPACE_INSTALL_PHALCON=false
WORKSPACE_INSTALL_SWOOLE=false
WORKSPACE_INSTALL_LIBPNG=false
WORKSPACE_INSTALL_IONCUBE=false
WORKSPACE_INSTALL_MYSQL_CLIENT=false
WORKSPACE_PUID=1000
WORKSPACE_PGID=1000
WORKSPACE_CHROME_DRIVER_VERSION=2.42
WORKSPACE_TIMEZONE=ICT
WORKSPACE_SSH_PORT=2222
```
```
### MYSQL #################################################
### ở đây dùng phiên bản mysql 5.7
MYSQL_VERSION=5.7
MYSQL_DATABASE=default
MYSQL_USER=default
MYSQL_PASSWORD=secret
MYSQL_PORT=3306
MYSQL_ROOT_PASSWORD=root
MYSQL_ENTRYPOINT_INITDB=./mysql/docker-entrypoint-initdb.d
```

Laradock của chúng ta sẽ có 2 container đều sử dụng PHP là `workspace` chạy trên dev, terminal,...  và `php-fpm` chạy cần thiết trên thực tế web với nginx. Điều đó chúng ta cũng cần cài đặt V8js trên php-fpm, mà laradock lại không có extension để enable thành `true` trên `php-fpm`. Tự config bằng tay, các bạn có thể tham khảo https://github.com/quanghung97/laradock/blob/master/php-fpm/Dockerfile

Tại `/php-fpm/php7.2.ini` chúng ta sẽ thêm `extension=v8js.so` để hoạt động

Mọi thứ ok rồi đó: 
`docker-compose up -d nginx mysql php-fpm workspace`

Khoảng thời gian nay làm vài ván **auto chess** hay đọc mấy bài báo về tạp chí **Phụ nữ** hoặc **Phong thủy và đời sống** 

Xem tình trạng container `docker-compose ps` để kiểm tra chạy được không

Chúng ta sẽ gõ terminal

/laradock: $ `docker-compose exec php-fpm bash`

để vào môi trường của php-fpm:
```
php -ini | grep v8js
```

kết quả thu được là thành công
```
v8js
v8js.flags => no value => no value
v8js.icudtl_dat_path => no value => no value
v8js.use_array_access => 0 => 0
v8js.use_date => 0 => 0
```
hoặc các bạn có thể tạo 1 file có nội dung như sau
```php
// web/xyz.php
<?php
class Foo {
  var $bar = null;
}
$v8 = new V8Js();
$v8->foo = new Foo;
// This prints "no"
$v8->executeString('print( "bar" in PHP.foo ? "yes" : "no" );');
?>
```

sau đó chạy `php xyz.php` trong môi trường php-fpm để xem kết quả. Nếu error thì cài v8js chưa thành công.

# Triển khai laravel trên laradock
Trong `laradock/nginx/sites/laravel-vue-ssr.conf`
```config
server {

    # listen 80 default_server;
    # listen [::]:80 default_server ipv6only=on;

    # For https
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate /etc/nginx/ssl/laravel1.crt;
    ssl_certificate_key /etc/nginx/ssl/laravel1.key;

    server_name laravel-vue-ssr.test;
    root /var/www/laravel-vue-ssr/public;
    index index.php index.html index.htm;

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass php-upstream;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }
    
    error_log /var/log/nginx/laravel5_error.log;
    access_log /var/log/nginx/laravel5_access.log;
}

server {
    listen 80;
    server_name laravel-vue-ssr.test;
    return 301 https://$host$uri;
}
```
Tạo ssl cho nginx muốn enable https

Trong `laradock/nginx/ssl/laravel1.crt` và `laravel1.key`

https://github.com/quanghung97/laradock/blob/master/nginx/ssl/laravel1.crt
https://github.com/quanghung97/laradock/blob/master/nginx/ssl/laravel1.key

Chúng ta sẽ thay đổi tên miền ảo ở file `/etc/hosts` đối với linux, còn ở window ở file: `C:\Windows\System32\Drivers\etc\hosts`
thêm đoạn `127.0.0.1       laravel-vue-ssr.test`.

Tiếp theo chúng ta cài đặt laravel 
* `docker-compose exec --user=laradock workspace bash`
* `composer create-project --prefer-dist laravel/laravel laravel-ssr-vue`

Cúng ta sẽ restart lại nginx để load lại đường dẫn `docker-compose restart nginx`

truy cập https://laravel-ssr-vue.test để xem laravel chạy được chưa.

#  Ứng dụng V8js để sử dụng sever-side-rendering cho Vuejs
## Tại sao lại là SSR
Vấn đề này mình cũng giải thích qua:
Thông thường các framework frontend javascript đặc biệt dùng Js để render dữ liệu. Giả dụ chúng ta có 1 project viết bằng vuejs. viewpage source chỉ có mỗi thế này

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="https://laravel-vue-ssr.test/css/app.css">
    </head>
    <body>
        <div id="app">
        </div>
        <script src="https://laravel-vue-ssr.test/js/client.js"></script>
    </body>
</html>
```

![](https://images.viblo.asia/af6e9d72-0c13-42f5-bd8c-285d66e9f4af.jpg)

SEO xiếc kiểu gì khi chả có nội dung thế này, mặc dù Google crawler bằng bot cũng đã support việc SEO cho những trường hợp này nhưng cũng ko đảm bảo được Bing hay facebook cũng làm được thế tốt nhất vẫn phải có base HTML nội dung cần thiết sẵn nhét vào tốt hơn

## Giải pháp

Đây là giải pháp chính chủ Vue phát triển gần đây https://ssr.vuejs.org/guide/non-node.html
> The default build of vue-server-renderer assumes a Node.js environment, which makes it unusable in alternative JavaScript environments such as PHP V8Js or Oracle Nashorn. In 2.5+ we have shipped a build in vue-server-renderer/basic.js that is largely environment-agnostic, which makes it usable in the environments mentioned above.

Đọc được đoạn này mừng rơi nước mắt cho fan của Vuejs lẫn Laravel

## Triển khai
Hiện tại mình đã viết 1 package support đoạn này các bạn chỉ việc xài khi đã cài đặt V8js rồi 
https://packagist.org/packages/quanghung97/laravel-v8js-ssr-vue
github: https://github.com/quanghung97/laravel-v8js-ssr-vue

Làm theo các bước cài đặt và bùm 1 cái

![](https://images.viblo.asia/07af50c3-336f-4b9c-be9e-180dac50e929.png)

view page source:
```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="https://laravel-vue-ssr.test/css/app.css">
    </head>
    <body>
        <div id="app">
            <div data-server-rendered="true" class="container"><div class="row justify-content-center"><div class="col-md-8"><div class="card"><div class="card-header">Example SSR Vue</div> <div class="card-body">
                    I'm an example Vuejs Component have content after view page source
                </div></div></div></div></div>
        </div>
        <script src="https://laravel-vue-ssr.test/js/client.js"></script>
    </body>
</html>
```

Chúng ta đã có nội dung bên trong mà Server biên dịch và client được nhận lấy chứ không như trước nữa.

# Kết luận
Qua đây chúng ta tổng kết được nhiều thứ hay ho giải pháp SSR. Trên thị trường hiện tại có Nuxt support SSR cho Vuejs nhưng điều đó phải sử dụng máy chủ Node.js mớI đạt được hiệu quả cao nhất về hiệu năng. Nếu Nuxt.js và Laravel thì sẽ dẫn đến 2 servercall API nhưng đánh đổi lại được sự `easy to code` trên Nuxt vì đã có base code sẵn ngon lành cành đào. Tùy vào sự lựa chọn chúng ta sẽ quyết định dùng kiểu nào: Vuejs trong laravel hay tách riêng Nuxt+ Laravel.
Tới đây mình sẽ nghiên cứu thêm các core project base cho Laravel  + Vuejs để cho lập trình viên dễ thở hơn :grinning: hoặc support SSR cho ReactJS tương tự. :thinking:

facebook: https://www.facebook.com/quanghung997