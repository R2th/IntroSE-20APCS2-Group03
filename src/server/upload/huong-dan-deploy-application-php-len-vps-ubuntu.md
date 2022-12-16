**Mở đầu**

- Khi hoàn thành một project thì công việc tiếp theo là deploy nó để mọi người có thể xem app của bạn. Với những project mang tính chất học tập thì các bạn có thể deply nó lên các server miễn phí (ví dụ [Heroku](https://www.heroku.com/)).Tuy nhiên vì nó miễn phí nên nó còn gặp nhiều vấn đề.Chính vì vậy, hôm nay mình sẽ hướng dẫn các bạn deploy một project Laravel sử dụng VPS Ubuntu.

**VPS là gì?**

- VPS (Virtual Private Server) là một dạng máy chủ ảo được tạo ra từ phương pháp phân chia một máy chủ vật lý thành nhiều các máy chủ khác nhau có tính năng tương tự như máy chủ riêng. Và chạy dưới dạng chia sẻ tài nguyên từ máy chủ vật lý ban đầu. Và mỗi VPS sẽ có một phần CPU, dung lượng RAM, dung lượng ổ HDD, địa chỉ IP và hệ điều hành riêng biệt, người dùng có toàn quyền quản lý root và có thể khởi động lại hệ thống bất cứ lúc nào họ muốn.

**Thông số cần biết khi thuê máy chủ ảo VPS là gì?**

- RAM của máy chủ: Để giúp server VPS hoạt động mượt và ổn định, nên chọn sản phẩm có càng nhiều RAM càng tốt. Hầu hết các loại RAM đều có điểm tương đồng về mặt hiệu năng. Khi mua hay thuê VPS, nên hỏi kĩ nhà cung cấp rằng RAM cho server vật lý hay server ảo.
- SWAP máy chủ ảo VPS được hiểu là gì? :SWAP là bộ nhớ ảo lưu lại các hành động xử lý cũ nếu như bộ nhớ RAM bị đầy. Bản thân SWAP là một không gian lưu trữ trên ổ cứng chứ không phải là một bộ nhớ độc lập. Không phải VPS nào cũng hỗ trợ bộ nhớ SWAP mà chỉ có các XEN VPS mới hỗ trợ SWAP.
- Ổ cứng (disk): Là không lưu trữ sẽ được sử dụng để lưu các file cài đặt của hệ điều hành và các file của mã nguồn website bạn lưu trên đó. Ổ đĩa hiện nay được chia làm 2 loại: HDD và SSD. Ổ cứng loại SSD thường giá sẽ đắt hơn loại ổ HDD.
- Băng thông (Band Width): Hãy ví độ lớn của băng thông cũng như độ rộng của đường phố. Phố càng rộng, giao thông càng thuận lợi và ngược lại. Các nhà cung cấp băng thông thường cung cấp lượng băng thông tối thiểu 10 – 20 Mbps.
- Thời gian Up-time của máy chủ ảo VPS là gì?: Một lưu ý nữa bạn cần biết khi chọn mua hoặc thuê server đó là thời gian Up-time của nó. Thời gian up-time của VPS thường được ước lượng từ thời gian hoạt động của nó. Thời gian hoạt động của VPS từ 99.95 đến 99.9% thì bạn đều có thể chấp nhận mua được.
- Hệ điều hành máy chủ ảo VPS là gì?
Máy chủ ảo VPS có 2 hệ điều hành phổ biến gồm: Linux và Window. Linux thân thiện người dùng, hỗ trợ ứng dụng nhiều hơn với chi phí ít hơn so với Window. Tuy nhiên, làm việc với Dot Net hoặc Visual Studio, bạn nên chọn VPS Window.

**VPS lấy ở đâu ?**

- Chính vì xịn xò như thế nên đa phần VPS đều phải mua.Có một số nhà cung cấp nổi tiếng trên thế giới mà mình biết là:

[https://www.vultr.com/](https://www.vultr.com/)

[https://www.digitalocean.com/](https://www.digitalocean.com/)

**Hướng dẫn deploy**

**Đăng nhập**

- Mở Terminal trên Ubuntu lên và gõ lệnh:

```ubuntu
    ssh username@ip
```

(với username và ip là các thông số sau khi đăng ký VPS cung cấp)

Sau đó nhập password (đăng ký VPS cung cấp)
Sau khi đăng nhập xong có giao diện thế này
![](https://images.viblo.asia/97459559-15e0-4cea-9319-b86dfae71036.png)

**Cài đặt các thành phần cần thiết để chạy PHP Application**

*Install nginx*

```ubuntu
sudo apt install nginx
```

*Install PHP + PHP-FPM*

```ubuntu
 sudo add-apt-repository ppa:ondrej/php
 sudo apt install php7.3-fpm php7.3-mbstring php7.3-xmlrpc php7.3-soap php7.3-gd php7.3-xml php7.3-cli php7.3-zip php7.3-mysql
```

*install MySQL*

```ubuntu
sudo apt-get update
sudo apt-get install mysql-server
```

Sau khi đã cài xong các thành phần cần thiết để chạy PHP Application thì ta cần config lại `nginx` cùng với `php-fpm`, các bạn gõ lệnh

```ubuntu
sudo nano /etc/nginx/sites-available/default
```

nó hiện ra như này 

![](https://images.viblo.asia/ea7f7bc9-47f3-489b-822b-19152cd15f97.png)

rồi tìm đến đoạn `location ~ \.php$` và chỉnh sửa lại đoạn đấy lại như sau:

```ubuntu
location ~ \.php$ {
        include snippets/fastcgi-php.conf;

        # With php7.3-cgi alone:
        # fastcgi_pass 127.0.0.1:9000;
        # With php7.3-fpm:
        fastcgi_pass unix:/run/php/php7.3-fpm.sock;
}
```

**Tạo user deploy - Phục vụ auto deploy (Optional)**

- Để thực hiện các tác vụ deploy trên một user chuyên biệt. Cô lập với các tài khoản user khác.
- Cần sinh ra SSH key để có thể pull source code thông qua SSH (phục vụ việc auto deploy)

```ubuntu
sudo adduser deploy

/// cấp quyền sudo cho user deploy
sudo usermod –aG sudo deploy

/// permission cho user deploy
sudo nano /etc/sudoers
/// Thêm đoạn này vào
%deploy ALL=(ALL): ALL

/// Generate ssh key cho user deploy
sudo su deploy  /// switch user deploy
ssh-keygen -t rsa /// generate ssh key
cat .ssh/id_rsa.pub /// lấy public ssh key

```

*Chuyển user chạy tiến trình nginx thành user deploy*

- Để tránh các vấn đề về file/folder permission sau khi deploy. Bởi các tiến trình của Nginx cần có quyền đọc, ghi và thực thi trên các thư mục "storage" và "bootstrap/cache"
```ubuntu
 sudo nano /etc/nginx/ngnix.conf
đổi user www-data thành user deploy
```

*Chuyển user chạy tiến trình php-fpm thành user deploy*

- Để tránh các vấn đề về file/folder permission sau khi deploy. Bởi các tiến trình của php-fpm cần có quyền đọc, ghi và thực thi trên các thư mục "storage" và "bootstrap/cache"
```ubuntu
sudo nano /etc/php/7.3/fpm/pool.d/www.conf
đổi
user = www-data
group = www-data

listen.owner = www-data
listen.group = www-data

thành
user = deploy
group = deploy

listen.owner = deploy
listen.group = deploy

Sau khi config change user thì restart nginx và php-fpm
sudo /etc/init.d/nginx restart
sudo /etc/init.d/php-fpm7.3 restart
```

**Add deploy key vào repository**

- Vào repository trên github add deploy key

**Deployment**

*ssh lên server*

```ubuntu
    ssh username@ip
    su deploy
    sudo apt-get install git
```

*Pull code trên repo github của bạn*

```ubuntu
    git clone <link repo clone with SSH>
```

*Cài đặt thêm các package phục vụ việc setup*

- install `composer`

```ubuntu
sudo apt-get update
sudo apt-get install curl
sudo curl -s https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

- install `node/npm`

```ubuntu
    curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
    sudo apt install nodejs
```

- install `yarrn`

```ubuntu
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt install yarn
```

*Setup các package và config file `.env`*

- Di chuyển vào project

```ubuntu
 cd ~/{project}
 composer install
 yarn install
 cp .env.example .env
 php artisan key:generate
 mysql -u root -p
 create database phpdeploy;
 nano .env
 
 /// Sửa
 DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
/// thành:
DB_DATABASE=phpdeploy
DB_USERNAME=root
DB_PASSWORD={your_password}
```

*Chạy migrate*

```ubuntu
    php artisan migrate
```

*Bước cuối cùng và quan trọng nhất là Setup virtual host để trỏ vào thư mục project*

- Tạo file config deploy trong nginx và config nó

```ubuntu
    sudo touch /etc/nginx/config.d/deploy.conf
    sudo nano /etc/nginx/config.d/deploy.conf
    
    /// Thêm đoạn sau vào
    server{
     listen       80;
     server_name example.com;
     root {path_to_project};
     location /{
         try_files $uri $uri/ /index.php?$query_string;
     }
     location ~ \.php {
            include         snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
            fastcgi_param   SCRIPT_FILENAME $document_root/$fastcgi_script_name;
     }
}
```

- Vì mặc định nginx nó đang đọc `file /etc/nginx/sites-enabled/default` nên cần xóa file `/etc/nginx/sites-enabled/default` rồi symlinks `/etc/nginx/conf.d/deploy.conf` đến  `/etc/nginx/sites-enabled`
để defaul đọc config ở deploy.conf

```ubuntu
    sudo rm -rf /etc/nginx/sites-enabled/default
    sudo ln -s /etc/nginx/conf.d/deploy.conf /etc/nginx/sites-enabled/
```

- Restart nginx, php-fpm: 

```ubuntu
sudo /etc/init.d/nginx restart
sudo /etc/init.d/php7.3-fpm restart
```

Lên trình duyệt gõ địa chỉ ip và xem kết quả nhé :sweat_smile: