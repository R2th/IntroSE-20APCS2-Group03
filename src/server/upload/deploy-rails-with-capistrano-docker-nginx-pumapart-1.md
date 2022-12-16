### 1. Chuẩn bị server bằng Docker Container
#### a. Tạo server
Server áp dụng cho bài viết này thực chất là một container chạy trên image ubuntu thôi nhé, còn bạn nào mua server clound thì có thể bỏ qua bước này.
- Đầu tiên chúng ta phải cài được docker
```
$ sudo apt-get update

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

$ sudo apt-key fingerprint 0EBFCD88

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io

# check version
$ docker -v
```

- Khởi tại một container với image là ubuntu:
```
docker run -it --name cap_server ubuntu
```

- Kiểm tra xem container đã khởi tạo thành công chưa bằng câu lệnh phía dưới:
```
docker ps
```
=> Nếu như thấy có tên container vừa tạo là chúng ta đã xong bước tạo server bằng docker rồi nhé :D

#### b. Tạo tài khoản deploy trên server
- Ở bài viết này mình tạo 1 user với tên là deploy, mn có thể tạo tên khác tùy ý
```
adduser deploy
```
![](https://images.viblo.asia/ccb1039d-4ce1-4b70-806a-96b0c13358ff.png)

- Thêm user vừa tạo `deploy` vào `sudo` group
```
usermod -aG sudo deploy
```

- Truy cập vào user `deploy`
```
    su - deploy
```

=> Đến đây là đã tạo xong user `deploy`

#### c. SSH từ local lên server
a) Setup SSH
- Ở phía `local`: 
    ```
    cat ~/ssh/ir_rsa.pub
    ```
- Ở phía `cap_server`
    - Cài đặt `openssh-server`: 
    ```bash
    $ apt-get update
        
    # cài đặt openssh-server
    $ apt-get install -y openssh-server
    $ service ssh restart    
    ```
    - Tạo folder `./ssh` và `~/.ssh/authorized_keys`:
    ```bash
    $ mkdir ~/.ssh
    $ touch ~/.ssh/authorized_keys
    $ chmod 600 ~/.ssh/authorized_keys
    ```
-  Thêm public key chúng ta vừa `cat` ở trên vào server `cap_server`:
    -  Mở file `~/.ssh/authorized_keys`
    ``` bash
    # Cài editor nano
    $ apt-get install nano
    $ nano ~/.ssh/authorized_keys
    ```
    - Copy paste public key vào file `~/.ssh/authorized_keys`
    - Save và thoát file

b) Kết nối với `cap_server` bằng ssh
- Để kết nối được với `cap_server` chúng ta phải biết được địa chỉ IP của server đó, bài viết này chúng ta dùng container để tạo server thì cách lấy thông tin IP của server mn làm như dưới nhé:
    ```bash
    docker inspect cap_server | grep IPAddress
    ```
    ![](https://images.viblo.asia/a050bbee-cf8c-40f6-ad60-861d5bcf4d58.png)

Và địa chỉ IP server của mình là `172.17.0.2`, các bạn nhớ địa chỉ IP server của máy mình để phục vụ cho việc deploy phía dưới nhé
- Thử ssh vào `cap_server`
```bash
ssh deploy@172.17.0.2
```
-> Trường hợp mà bạn dùng public key khác thì có thể thêm option `-i` vào nhé:
```bash
ssh deploy@172.17.0.2 -i ~/.ssh/id_rsa_another
```

#### d. Setup môi trường chạy project trên server
 * Để server có thể run project như ở máy local thì chúng ta phải cài đặt `ruby`, `rails`, `bundler` và `mysql`,...

   *  :point_right: Một điểm lưu ý khi cài đặt môi trường trên server đó là các version của `ruby`, `rails`, `bundler`, `mysql` và một số package khác phải tương thích với version ở môi trường phát triển, Ví dụ ở local bạn đang dùng `rails 6` nhưng trên server bạn cài `rails 4` thì sẽ không run project được.

    * Có một trang web hướng dẫn việc setup môi trường cho `rails` khá là đầy đủ và ngon lành. Mn setup theo [gorails.com](https://gorails.com/setup/ubuntu/18.04) này nhé :thumbsup: .

* Sau khi cài thành công `mysql` rồi thì mn tiếp tục add một user mysql dùng cho project nhé: Ở đây mình sẽ tạo một user với name `deploy`, mật khẩu `123456`
    ```
    sudo mysql -u root -p
    CREATE USER 'deploy'@'localhost' IDENTIFIED BY '123456';
    SELECT User, Host, plugin FROM mysql.user;
    GRANT ALL PRIVILEGES ON *.* TO 'deploy'@'localhost';
    use mysql;
    UPDATE user SET plugin='auth_socket' WHERE User='deploy';
    FLUSH PRIVILEGES;
    exit;
    ```
    
    * Tạo xong thì thử `mysql -u deploy -p123456` xem đã vào được mysql chưa nhé :D.

* Cài đặt Nginx:
    ```
    sudo apt update
    sudo apt install nginx
    sudo service nginx restart
    ```
    * Truy cập ip server xem nginx đã hoạt động chưa nhé, ở bài viết của mình thì ip server là 172.17.0.3
   
        ![](https://images.viblo.asia/05f110be-fe4b-4d11-8a4a-db031705da20.png)

    * Config nginx:
        * Tạo file config `/etc/nginx/sites-available/cap_app`:
            ```bash
            upstream app {
                # Path to Puma SOCK file, as defined previously
                server unix:/home/deploy/cap_app/shared/tmp/sockets/puma.sock fail_timeout=0;
            }

            server {
                listen 80;
                server_name 172.17.0.3;

                # root /home/deploy/cap_app/current/public;

                # try_files $uri/index.html $uri @app;
                access_log /home/deploy/cap_app/current/log/nginx_access.log;
                error_log /home/deploy/cap_app/current/log/nginx_error.log;
                location / {
                    proxy_pass http://app;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Host $http_host;
                    proxy_redirect off;
                }

                error_page 500 502 503 504 /500.html;
                client_max_body_size 4G;
                keepalive_timeout 10;
            }
            ```

        * Link file vừa tạo tới `/etc/nginx/sites-enabled/cap_app`:
            ```bash
            ln -s /etc/nginx/sites-available/cap_app  /etc/nginx/sites-enabled/cap_app
            ```
        * Khởi động lại `nginx`: `sudo service nginx restart`
        * Kiểm tra xem cấu hình `nginx` có bị lỗi syntax không: `sudo nginx -t`

        ![](https://images.viblo.asia/22f80e6b-7c25-49da-86f8-a181fd6af9eb.png)


:point_right: Đến đây thì cơ bản mn đã setup xong những thứ cần thiết cho một server rồi nhé :D :D



:scream::scream: Hôm nay mình dừng lại ở đây nhé. Bài sau mình sẽ tiếp tục phần deploy bằng capistrano.
Mn có vấn đề gì trong các bước ở trên thì cmt vào để cùng thảo luận nhé.
Happy coding!