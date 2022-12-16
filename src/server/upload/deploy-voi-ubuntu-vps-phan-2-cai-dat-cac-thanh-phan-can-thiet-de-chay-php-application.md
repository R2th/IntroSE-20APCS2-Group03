Chào các bạn, mình xin public bài viết tiếp theo về deploy một web PHP application trong series này.

Xin lỗi các bạn vì thời gian public bài này của mình hơi lâu, vì công việc đợt vừa rồi của mình khá bận, chưa sắp xếp tốt thời gian bản thân cho hợp lý.

Ở bài viết phần 1, mình đã chia sẻ cách để có một VPS cho riêng mình, các bạn có thể xem lại bài viết đó [ở đây](https://viblo.asia/p/deploy-voi-ubuntu-vps-phan-1-lam-the-nao-de-co-vps-cho-rieng-minh-oOVlYM4ol8W).
Sau khi các bạn đã có 1 con server của riêng mình, bước tiếp theo chúng ta cần phải làm đó chính là *cài đặt các thành phần cần thiết để chạy PHP application*, đó chính là mục đích ở bài viết tiếp theo này của mình.

> Mỗi người chúng ta đều có một khoảng thời gian yên lặng, trong khoảng thời gian đó nỗ lực rất nhiều đều không có kết quả, chúng ta gọi đó là sự khởi đầu.

# 1. Tạo user riêng cho mỗi cá nhân
![](https://images.viblo.asia/e90d9fd8-85bb-4c49-bb82-3b27e16eb47c.png)
Đây là thông tin server của mình, từ thông tin trên có thể thao tác với server thông qua tài khoản `root`.

Tuy nhiên nếu server có nhiều người truy cập thì chỉ người có quyền quản trị cao nhất mới truy cập được bằng tài khoản `root`, còn những user khác sẽ được cấp những tài khoản tương ứng.

- Ở đây mình đang đứng với vai trò là người quản trị cao nhất của server, từ tài khoản `root`, tạo ra user `ha.cong.thanh`:
```
sudo adduser --force-badname ha.cong.thanh
```
Các bạn nhập mật khẩu mới, điền thêm thông tin của user khi server hỏi (có thể enter luôn để bỏ qua cũng được).

- Tiếp theo, cấp quyền `sudo` cho user mới được tạo:
```
sudo usermod -aG sudo ha.cong.thanh
```

- Từ folder root cd vào ha.cong.thanh
```
cd /home/ha.cong.thanh/
```

- Tạo file .ssh trong folder ha.cong.thanh
```
mkdir .ssh
```

- Chuyển quyền cho folder .ssh từ root qua ha.cong.thanh
```
sudo chown ha.cong.thanh:ha.cong.thanh .ssh/
```

- cd vào .ssh và tạo file authorized_keys
```
touch authorized_keys
```

- Cấp quyền 600 cho file authorized_keys
```
chmod 600 authorized_keys
```

- Chuyển quyền cho file authorized_keys từ root qua ha.cong.thanh
```
sudo chown ha.cong.thanh:ha.cong.thanh authorized_keys
```

- Sửa file authorized_keys, thêm ssh-key public vào file này
```
vi authorized_keys
```

- ssh bằng ha.cong.thanh thử, nếu yêu cầu password, thì vào file sshd_config để sửa
```
vi /etc/ssh/sshd_config
```

- Bỏ comment và sửa thành no
```
PasswordAuthentication no
```

- ssh lên và bắt đầu cài cắm server
```
ssh ha.cong.thanh@45.76.190.30
```

# 2. Cài đặt nginx
1. `sudo apt update`
2. `sudo apt install nginx`

# 3. Cài PHP, PHP-FPM, extensions
1. `sudo apt-get install software-properties-common`
2. `sudo add-apt-repository ppa:ondrej/php`
3. `sudo apt-get update`
4. `sudo apt-get upgrade`
5. `sudo apt install php7.2-fpm php7.2-mbstring php7.2-xmlrpc php7.2-soap php7.2-gd php7.2-xml php7.2-cli php7.2-zip php7.2-mysql`
6. `sudo service php7.2-fpm restart`

# 4. Sửa config mặc định
1. `sudo vi /etc/nginx/sites-available/default`
2. Sửa config như sau:
    ```
    server {
        listen 80;
        listen [::]:80;

        root /var/www/html;
        index index.php index.html index.htm index.nginx-debian.html;

        server_name __;

        location / {
            try_files $uri $uri/ =404;
        }

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php7.2-fpm.sock;
        }
    }
    ```
3. `sudo service nginx restart`

# 5. Cài MySQL
1. `sudo apt update`
2. `sudo apt install mysql-server`

# 6. Tạo file info.php
```
echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
```

# 7. Kiểm tra
1. http://45.76.190.30
    ![](https://images.viblo.asia/d0ea24f1-502a-4631-9f9f-7d0fa964206e.png)
2. http://45.76.190.30/info.php
    ![](https://images.viblo.asia/7edc4bd9-60cd-4c47-93c5-9eb796d92363.png)

# 8. Túm váy
Ở bài viết thứ 2 này, mình muốn chia sẻ với các bạn các bước chuẩn bị để sắp tới có thể chạy được bộ source code của mình trên server.

Bài chia sẻ này của mình cũng không có gì quá đặc biệt, đều là những kiến thức cơ bản, có gì các bạn cứ góp ý nhé. Cái hay còn ở những bài tiếp theo, cảm ơn các bạn đã đọc. (bow)

[Deploy với Ubuntu VPS (Phần 3): Cấu hình Github và Deploy bằng cơm](https://viblo.asia/p/deploy-voi-ubuntu-vps-phan-3-cau-hinh-github-va-deploy-bang-com-3Q75w1q3ZWb)