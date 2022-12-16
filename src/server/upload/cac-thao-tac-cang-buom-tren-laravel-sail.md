Ở bài trước thì chúng ta đã học cách [Cài đặt môi trường dev Laravel sử dụng Docker, một cách dễ dàng với Sail](https://viblo.asia/p/cai-dat-moi-truong-dev-laravel-su-dung-docker-mot-cach-de-dang-voi-sail-QpmlebxM5rd), thì ở bài này chúng ta cùng đi sâu hơn vào sử dụng Sail nào :kissing::kissing:

# Cấu hình Alias cho Sail

Mặc định thì, Sail gọi script `vendor/bin/sail` để khởi động dòng lệnh, ví dụ

```bash
./vendor/bin/sail up
```

Tuy nhiên, như các bạn thấy thì nó khá cồng kềnh. Chúng ta sẽ tạo alias cho nó bằng cách gõ dòng lệnh này vô terminal
```bash
alias sail='bash vendor/bin/sail'
```
Như vậy thì command `sail` là cả cái cụm trên và chúng ta có thể gõ nhanh `sail up` :grin:
Để tránh việc phải gõ cái alias mỗi lần khởi động thì chúng ta nên nhét luôn nó vô profile. Như mình xài zsh thì mình nhét nó vào `~/.zshrc`


![](https://images.viblo.asia/966176de-915b-45c0-86a1-7ad455f25f0f.png)

# Khởi động và tắt Sail

File `docker-compose.yml` của Laravel Sail xác định Docker container hoạt động cùng nhau để giúp bạn xây dựng các ứng dụng Laravel. Mỗi container này là một mục trong cấu hình `services` bên trong `docker-compose.yml` của bạn.

Trước khi bắt đầu Sail, bạn nên đảm bảo rằng không có webserver (Nginx, Apache,...) hoặc cơ sở dữ liệu (MariaDB, MongoDB,...) nào khác đang chạy trên local của bạn. Để khởi động tất cả các Docker container được khai báo trong tệp `docker-compose.yml`, bạn chỉ cần thực hiện lệnh up:
```bash
sail up
```
lệnh này hoạt động gần như `php artisan serve` vậy, nhưng mang theo nhiều thứ hơn, ví dụ như `redis`, `php8`, `mysql8`, ...

Mình thích nó chạy background hơn, nên mình dùng lệnh
```bash
sail up -d
```
Sau khi project đã được khởi động, chúng ta có thể truy cập trang web sản phẩm của chúng ta ngay tại http://localhost

Cũng giống như `php artisan serve`, để dừng Sail, chúng ta chỉ cần ấn tổ hợp Ctrl + C, còn nếu bạn giống mình, chạy ở background thì cần dùng command
```bash
sail down
```

# Giao diện dòng lệnh (CLI) với Sail
Khi chúng ta  sử dụng Laravel Sail, ứng dụng của chúng ta được thực thi ở bên trong một Docker container riêng, một hệ điều hành ảo riêng, độc lập với hệ điều hành của chúng ta. Nhưng không sao, việc nào khó cứ để Laravel lo :innocent: Laravel Sail cung cấp các shortcut để thực thi các lệnh trực tiếp trên project của bạn, mà không cần phải chạy vào trong Docker container.

Xuyên suốt [Documentation](https://laravel.com/docs/8.x) của mình, các bạn sẽ thấy hầu hết các ví dụ thao tác với dòng lệnh, là cần phải thao tác với Composer, Artisan, Node/NPM. Và Sail cung cấp sẵn luôn cho các bạn shortcut để thực hiện các thao tác như này. Thay vì `composer`, `php artisan`, `npm` thì giờ chúng ta có `sail composer`, `sail artisan`, `sail npm` tương ứng. 

![](https://i.imgur.com/kNry13C.gif)

# Container CLI
Đôi khi chúng ta vẫn cần phải vào trong Docker container, chỉ cần gõ:
```bash
sail shell
```

muốn mở Tinker để thao tác thì chúng ta có
```bash
sail artisan tinker

# hoặc

sail tinker
```



-----

Trên đây là vài thao tác cơ bản với Sail, ở bài tiếp theo mình sẽ giới thiệu thêm về các file config của Docker. Hẹn gặp lại :sunglasses::sunglasses: