Bài viết sau sẽ hướng dẫn những bước đơn giản để triển khai một ứng dụng Laravel trên Shared Hosting
# Requirements
Trước khi cài đặt một ứng dụng Laravel on shared hosting, bạn cần phải đảm bảo chắc chắn rằng hosting services cung cấp đầy đủ những yêu cầu tối thiểu của Laravel. Về cơ bản hosting services phải đáp ứng được những yêu cầu dưới đây:

```
* PHP >= 7.0
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* Tokenizer PHP Extension
```

Đôi khi những yêu cầu trên cũng phụ thuộc vào phiên bản Laravel mà bạn cài đặt,  vì vậy hãy kiểm tra lại document trên trang chủ của Laravel trước khi tiến hành cài đặt

Bước tiếp theo, bạn cần có SSH access permission trên tài khoản hosting để tiếp tục các bước dưới đây

Bên cạnh PHP và những extension bắt buộc, bạn có thể cần thêm một số thư viện để việc cài đặt có thể tiến hành dễ dàng hơn như: 

* Git 
* Composer
# Instruction
Dưới đây là cấu trúc thư mục của Shared Hosting

Thông thường fornt-end code sẽ nằm ở thư mục **public_html** or **www.**  Nếu chúng ta không muốn để lộ những file hệ thống của Laravel (như .env ...)  chúng ta sẽ giấu chúng đi.

```
.bash_history
.bash_logout
.bash_profile
.bashrc
.cache
.cpanel
.htpasswds
logs
mail
public_ftp
public_html
.ssh
tmp
etc
www -> public_html
...
```

Tạo một thư mục chứa toàn bộ source code.

```
$ mkdir projects
$ cd projects
```

Tại đây chúng ta sẽ dùng **git command** để kéo toàn bộ source code về thư mục.  Chúng ta có đặt tên nó tuỳ ý. Như ở đây mình đặt tên là **awesome-app**

```
$ git clone http://[GIT_SERVER]/awesome-app.git
$ cd awesome-app
```

Bước tiếp theo là chúng ta sẽ map thư mục **awesome-app/public** với thư mục **www** bằng cách sử dụng symbol link,  tuy nhiên chúng ta cần phải backup thư mục **public** đầu tiên.

```
$ mv public public_bak
$ ln -s ~/www public
$ cp -a public_bak/* public/
$ cp public_bak/.htaccess public/
```

Bởi vì chúng ta đã tạo một symbol link từ thư mục **www** để biến nó trở thành 1 virtual public trong project, nên chúng ta phải update lại **~/www/index.php** để thay thế cho path cũ

```
- require __DIR__.’/../bootstrap/autoload.php’;
+ require __DIR__.'/../projects/awesome-app/bootstrap/autoload.php';

- $app = require_once __DIR__.’/../bootstrap/app.php’;
+ $app = require_once __DIR__.'/../projects/awesome-app/bootstrap/app.php';
```

Chúng ta sẽ sửa lại thành như sau

```
require __DIR__.'/../projects/awesome-app/bootstrap/autoload.php';

$app = require_once __DIR__.'/../projects/awesome-app/bootstrap/app.php';
```

Phần khó nhất đã xong,  còn lại là một số thiết lập cơ bản của Laravel và cấp quyền truy cập vào thư mục storage

`$ chmod -R o+w storage`

Đừng quên sửa file **.env **

Cuối cùng update packages cho Laravel bằng composer và add thêm các caches cần thiết,

```
$ php composer install
$ php composer dumpautoload -o
$ php artisan config:cache
$ php artisan route:cache
```

XIn chúc mừng, bạn đã cài đặt thành công ứng dụng Laravel trên Shared Hosting Service.