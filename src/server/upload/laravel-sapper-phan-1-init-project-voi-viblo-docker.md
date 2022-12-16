### 1. Svelte và Sapper

**Svelte** là một thư viện (? framework ? maybe - theo docs của Svelte) hỗ trợ xây dựng UI - component framework, tương tự như Vue và React. So với các framework UI truyền thống, thường sử dụng Virtual DOM để render web thay vì thao tác trực tiếp với DOM, **Svelte** chạy tại thời điểm `build time` và convert các components thành mã mệnh lệnh tối ưu giúp cập nhật DOM một cách nhanh hơn.

**Svelte** là một cách tiếp cận mới xây dựng UI. Trong khi các khung công tác truyền thống như React và Vue thực hiện phần lớn công việc bởi trình duyệt, thì Svelte thực hiện biên dịch khi bạn build ứng dụng. Có thể đây sẽ là một hướng tiếp cận tối ưu hơn, băng cách tối ưu việc cập nhật DOM trực tiếp khi state thay đổi thay vì phải render DOM từ VIrtual DOM.

**Sapper** là một framework kiểu Next.js được xây dựng bởi Svelte. Sapper hứa hẹn sẽ làm việc xây dựng các ứng dụng web có hiệu suất cực cao trở nên dễ dàng hơn nhờ
- Code-splitting, dynamic imports và thay thế module, được hỗ trợ bởi webpack
- Server-side rendering (SSR) với client-side hydration
- Hỗ trợ dịch vụ ngoại tuyến và PWA
- Mang lại trải nghiệm phát triển tuyệt vời nhất cho bạn

**So sánh Sapper và Next**
- Sapper được cung cấp bởi Svelte thay vì React, nó nhanh hơn và hỗ trợ hiệu quả các ứng dụng nhỏ
- Thay vì phải định nghĩa route, chúng ta có thể mã hóa route bằng cách đặt tên tệp (filenames). Ví dụ, page của bạn sẽ có path kiểu src/routes/blog/[slug].svelte
- Bạn cũng có thể tạo server routes trong thư mục routes
- Sử dụng thẻ <a> thay vì dùng component <Link>
### 2. Clone Docker
Viblo có một open source docker khá hay ho là [docker-php-development](https://github.com/sun-asterisk-research/docker-php-development). OS này tập hợp các composers, định nghĩa sẵn một số services cần thiết cho việc phát triển web như laravel, mysql, redit,...vv

Giờ để init project này, chúng ta sẽ clone OS này và sử dụng nó để tạo môi trường run project của chúng ta.

```bash
$ git clone git@github.com:sun-asterisk-research/docker-php-development.git
```

Sau khi cài đặt, chúng ta cần config `.env` và `services`

Đầu tiên là khai báo danh sách services cần sử dụng

services
```bash
$ cp services.example services
```
Như trong ví dụn này, mình sẽ chỉ dử dụng 3 services là mysql, php và web
```:services
mysql
php
web
```

Tiếp theo là config environment
```bash
$ cp .env.example .env
```
Bạn có thể tham khảo file `.env` của mình:
```php
#-------------------------------------------------------------------------------
# Code paths
#-------------------------------------------------------------------------------

PATH_PHP=../api
PATH_WEB=../web

#-------------------------------------------------------------------------------
# Data paths
#-------------------------------------------------------------------------------

PATH_DATA=./data
PATH_LOGS=./logs

#-------------------------------------------------------------------------------
# Traefik domain and ports
# DOMAIN, PORT defines public domain for your application
# DOMAIN_SECONDARY is the domain used for other services e.g traefik, mailhog, phpmyadmin .etc
#-------------------------------------------------------------------------------

DOMAIN=localhost
PORT=8000

DOMAIN_SECONDARY=backend.localhost

#-------------------------------------------------------------------------------
# Databases
# DB_DATABASE, DB_USERNAME and DB_PASSWORD are mandatory
# You can leave the others empty for default values
#-------------------------------------------------------------------------------

DB_DATABASE=svelte

DB_USERNAME=svelte
DB_PASSWORD=123456

# Published port for connecting with database from localhost.
# Leave empty to use default port (5432 for Postgres, 3306 for MySQL/MariaDB)
DB_PORT=
DB_TEST_POST=

#-------------------------------------------------------------------------------
# Other things
#-------------------------------------------------------------------------------

COMPOSE_PROJECT_NAME=svelte
HOSTS_FILE=/etc/hosts

```

Trong đó, mốt số biến môi trường bạn cần quan tâm đó là
- PATH_PHP: đường dẫn tới thư mục backend
- PATH_WEB= đường dẫn tới thư mục frontend
- DB_DATABASE: tên db cho backend
- DB_USERNAME: tên user để đăng nhập dbms
- DB_PASSWORD: password để đăng nhập dbms
- DB_PORT, DB_PORT_TEST: port của dbms, bạn nên đặt cổng để tránh trùng với các service khác trên máy.

### 2. Init Laravel
```bash
$ composer create-project --prefer-dist laravel/laravel api
```
Sau khi cài đăt tiến hành config .env
```bash
$ cp .env.example .env
$ php artisan key:gen
```

Theo như config `docker` ở phần 1, thông tin config mysql là
```
DB_DATABASE=svelte

DB_USERNAME=svelte
DB_PASSWORD=123456
```
nên chúng ta cần config db cho phía backend tương tự như vậy
```:/api/.env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=svelte
DB_USERNAME=svelte
DB_PASSWORD=123456
```
### 3. Init Svelte
```bash
$ npx degit "sveltejs/sapper-template#rollup" web
```
Giờ bạn đặt 3 folder này ngang hàng như đã config docker
```
PATH_PHP=../api
PATH_WEB=../web
```
chúng ta sẽ có thể chạy thử hệ thống rồi
```bash
$ cd /docker
$ ./project up
```
Nếu các bạn nhận được kết quả, như vậy thì oke.
```bash
Creating network "svelte_default" with the default driver
Creating svelte_php_1     ... done
Creating svelte_web_1     ... done
Creating svelte_traefik_1 ... done
Creating svelte_mysql_1   ... done
Creating svelte_caddy_1   ... done
```

Giờ các container đều đã chạy, chúng ta thử chạy project của chúng ta nào
```bash
$ docker exec -it svelte_web_1 yarn dev
```

Truy cập [http://localhost:8000](http://localhost:8000), nếu kết quả bạn nhận được là như vậy thì oke rồi nhé

![](https://images.viblo.asia/58ba0a72-c3bb-4f63-bd16-213a95ec5bb7.png)

Bài viết này mới chỉ dừng lại ở việc giới thiệu Svelte, Sapper và Init project. Trong bài tiếp theo mình sẽ hướng dẫn mọi người làm một số chức năng cho trang web và tìm hiểu khả năng tối ưu của Svelte.

Tạm biệt và hẹn gặp lại ở các bài viết tiếp theo.

Tài liệu tham khảo:

[Svelte Document](https://svelte.dev/)

[Sapper Document](https://sapper.svelte.dev/docs/)