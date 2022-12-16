*Trong team mình có rất nhiều cao thủ, không ai biết họ giỏi đến đâu, nhưng hầu hết mọi người đều biết, có một thằng ngốc viết một series về Deploy suốt mấy tháng trời, cuối cùng kết cục là chẳng đâu vào đâu.*

Tiếp nối chuỗi "chẳng đâu vào đâu", mình xin viết tiếp phần 3 về cấu hình Github và các bước deploy thông thường, các bạn có thể xem lại phần 2 của mình [tại đây](https://viblo.asia/p/deploy-voi-ubuntu-vps-phan-2-cai-dat-cac-thanh-phan-can-thiet-de-chay-php-application-bJzKmqgYK9N). Cảm ơn các bạn đã đọc!

# 1. Lấy ssh-key và config Github
Đầu tiên mình sẽ ssh bằng tài khoản `ha.cong.thanh` lên server mà mình đã cài đặt ở phần trước:
```
ssh ha.cong.thanh@45.76.190.30
```

### 1.1: Tạo user `deploy` và generate ssh-key
- Tạo user có tên deploy
    ```
    sudo adduser deploy
    ```

- Cấp quyền sudo cho user deploy
    ```
    sudo usermod -aG sudo deploy
    ```

- Generate ssh-key cho user deploy
    1. Chuyển sang user deploy: `sudo su deploy`
    2. Tạo ssh-key: `ssh-keygen -t rsa`
    3. Lấy public ssh-key: `cat /home/deploy/.ssh/id_rsa.pub`
    4. Lấy private ssh-key (nếu cần): `cat /home/deploy/.ssh/id_rsa`

Sau khi lấy được `public ssh-key`, các bạn lưu lại key này để tí nữa dùng nhé.

### 1.2: Chuyển user chạy tiến trình Nginx thành `deploy`
- Vào file config của nginx
    ```
    sudo vi /etc/nginx/nginx.conf
    ```

- Sửa config như sau: Sửa `user www-data;` thành `user deploy;`

- Restart lại nginx
    ```
    sudo /etc/init.d/nginx restart
    ```
    ![](https://images.viblo.asia/3ba3aba4-b380-4b82-9eed-442bb9d36e02.png)

### 1.3: Chuyển user chạy tiến trình PHP-FPM thành `deploy`
- Vào file config của FPM
    ```
    sudo vi /etc/php/7.2/fpm/pool.d/www.conf
    ```

- Sửa config:
    ```
    user = www-data => user = deploy
    group = www-data => group = deploy
    listen.owner = www-data => listen.owner = deploy
    listen.group = www-data => listen.group = deploy
    ```

- Chuyển owner của php7.2-fpm.sock thành deploy
    ```
    sudo chown deploy /run/php/php7.2-fpm.sock
    ```

- Restart PHP-FPM
    ```
    sudo /etc/init.d/php7.2-fpm restart
    ```
    
*Vì sao phải làm việc này? - Nếu các bạn muốn tìm hiểu thì trả lời thử dưới comment cho mình với nhé :blush:*

### 1.4: Add key của user `deploy` vào "Deploy Keys" trong repository
Để user `deploy` có thể truy cập được vào repo thông qua ssh-key, chúng ta cần phải add key của user vào repo này.

1. Truy cập vào repo của bạn trên Github
2. Vào Settings
3. Chọn mục SSH and GPG keys
4. Chọn New SSH key
5. Điền title và public ssh-key của user `deploy` vừa lấy được ở trên
6. Submit

### 1.5: SSH lên server và kiểm tra kết nối với repo trên Github đã thông chưa
```
ssh -T git@github.com
```
![](https://images.viblo.asia/d83d71f6-be67-403f-9ea5-98f4e5c9e0cf.png)

### 1.6: Tạo thư mục và kéo code vào đó
- Tạo thư mục `code` trong `/home/deploy`
    ```
    cd /home/deploy/
    mkdir code
    ```
    
- Kéo code bằng git về thư mục `code` vừa tạo
    ```
    cd code
    git clone git@github.com:thanhhc-1638/game-from-avengers-with-love.git
    ```

# 2. Manually Deployment
### 2.1: Cài đặt thêm các packages phục vụ việc setup
```
cd <thư mục project của bạn>
Ex: cd game-from-avengers-with-love
```

- Cài Composer
    1. `sudo apt update`
    2. `sudo apt install curl`
    3. `sudo curl -s https://getcomposer.org/installer | php`
    4. `sudo mv composer.phar /usr/local/bin/composer` hoặc `curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer`

- Cài NodeJS
    1. `sudo apt update`
    2. `curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -`
    3. `sudo apt-get install -y nodejs` hoặc `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - && sudo apt-get install -y nodejs`

- Cài Yarn
    1. `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
    2. `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
    3. `sudo apt-get update && sudo apt-get install yarn`

### 2.2: Setup các package từ Composer và Yarn, setup `.env` và tạo database
- Cài đặt các package cần thiết qua Composer và Yarn
    1. `composer install`
    2. `yarn install`
    3. `yarn dev`

- Tạo `.env`: `cp .env.example .env`

- Generate key: `php artisan key:generate`

- Cấp quyền ghi cho thư mục `storage` và `cache`
    1. `chmod -R 755 storage/`
    2. `chmod -R 755 bootstrap/cache/`

- Tạo database
    1. `mysql -u root -p`
    2. `create database game_from_avengers_prod;`
    3. `exit`

- Sửa file `.env`
    1. `vi .env`
    2. Sửa thành
        ```
        DB_DATABASE=game_from_avengers_prod
        DB_USERNAME=root
        DB_PASSWORD=<password của user root trong mysql được cài ở Phần 2>
        ```

### 2.3: Chạy Migration và các Seeder liên quan
```
php artisan migrate --seed
```

### 2.4: Restart `php-fpm`
```
systemctl restart php7.2-fpm
```

### 2.5: Setup virtual host để trỏ vào thư mục project
- Tạo file config: `deploy.conf`: `sudo touch /etc/nginx/conf.d/deploy.conf`

- Vào file `deploy.conf` và sửa: `sudo vi /etc/nginx/conf.d/deploy.conf`

- Sửa config như sau:
    ```
    server {
        listen 80;
        server_name <Dia chi IP server cua ban>;
        root /home/deploy/code/<ten-project-cua-ban>/public;
        index index.php;
        location /{
            try_files $uri $uri/ /index.php?$query_string;
        }
        location ~ \.php {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $document_root/$fastcgi_script_name;
        }
    }
    ```

- Symlinks `/etc/nginx/conf.d/deploy.conf` đến `/etc/nginx/sites-enabled` để đọc config ở `deploy.conf`
    ```
    sudo ln -s /etc/nginx/conf.d/deploy.conf /etc/nginx/sites-enabled/
    ```
    
- Restart nginx: `service nginx restart`

- Restart PHP-FPM: `service php7.2-fpm restart`

Và cuối cùng là lên hình website trên server: http://45.76.190.30/ :heart_eyes::heart_eyes::heart_eyes:
![](https://images.viblo.asia/761dda21-64b3-4bfb-9663-88a06b13e8d5.png)

*Liệu các bạn có đặt ra câu hỏi rằng: Với cách deploy này, khi có phát sinh yêu cầu deploy 1 version mới của ứng dụng thì ta phải làm như thế nào? - Lại lặp lại các bước trên sao? :joy:*

# 3. Kết luận
- Với cách deploy này, chúng ta cần phải tự tay thực hiện rất nhiều bước:

    1. Lên server pull code mới nhất
    2. Chạy lại tất cả các setup: composer install, yarn install, yarn prod (dev), migrate, ...

- Nếu tần suất deploy nhiều, sẽ tốn khá nhiều effort để làm việc này. Chưa kể nếu lỗi, hoặc viết sai 1 command nào đó nhưng không để ý, cứ thế tiếp tục chạy sẽ gây ra các lỗi khác.

- Với hệ thống nhiều người dùng, có khả năng kiếm tiền liên tục, khi bị lỗi và dừng hoạt động sẽ gây ra thiệt hại cho KH.

Vậy nên ở [phần tiếp theo](https://viblo.asia/p/deploy-voi-ubuntu-vps-phan-4-zero-downtime-deployment-GrLZD0oBZk0), mình sẽ viết về ***Zero-downtime Deployment*** nhé. Một lần nữa cảm ơn các bạn đã đọc!