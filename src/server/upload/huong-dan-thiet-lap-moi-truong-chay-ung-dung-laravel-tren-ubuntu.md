**1. Giới thiệu**

Để chạy một project Laravel chúng ta cần một web server. Giống như trên Windows, khi phát triển một ứng dụng Web sẽ sử dụng XAMPP, thì ở trên Ubuntu sẽ có một Web Server tương tự đó là LAMP. Tiếp theo, cần cài đặt Composer để cài đặt Laravel. Trong bài viết này, mình sẽ hướng dẫn các bạn cài đặt LAMP, Composer  trên Ubuntu 18.04, các phiên bản khác cũng tương tự, nhưng mình khuyên mọi người nên sử dụng bản Ubuntu mới nhất để có những trải nghiệm người dùng tốt nhất.

**2. LAMP**

LAMP gồm 4 thành phần chính Linux, Apache, MySQL, và PHP hoặc Python hoặc Perl.

* **Linux**: Linux là tên của một hệ điều hành mở và cũng là tên hạt nhân của hệ điều hành. Được ra đời lần đầu tiên vào năm 1994 bởi Linus Torvalds. Ubuntu là hệ điều hành mã nguồn mở dựa trên GNU Debian/Linux. Hiện nay, Ubuntu rất phổ biến và được sử dụng nhiều trong những công ty IT bởi vì đây là hệ điều hành miễn phí (yaoming). Bởi vì mình cài LAMP trên Ubuntu 18.04, chính hệ điều hành cũng là một thành phần của LAMP nên sẽ không cần cài đặt nữa.
*  **Apache**: Apache là phần mềm web server miễn phí mã nguồn mở. Nó đang chiếm đến khoảng 46% thị phần websites trên toàn thế giới. Tên chính thức của Apache là Apache HTTP Server, được điều hành và phát triển bởi Apache Software Foundation. Sau đây là cách cài đặt Apache trên Ubuntu:
    
    * Chạy câu lệnh sau: `$ sudo apt-get install apache2`
    
    ![](https://images.viblo.asia/6311e160-ec62-48b1-b618-d69291cfe8cd.png)

    * Sau đó bấm Y để tiếp tục cài đặt. Tiếp theo, mở trình duyệt gõ 127.0.0.1 để kiểm tra Apache đã hoạt động chưa.

    ![](https://images.viblo.asia/83d5bbb6-3612-457e-be93-67c7ea8b21ed.png)

    * Khi trình duyệt hiện ra như trên, đã cài đặt Apache thành công. Tiếp theo sẽ cài đặt MySQL.

* **MySQL**: MySQL là hệ quản trị cơ sở dữ liệu mã nguồn mở, được sử dụng phổ biến rộng rãi trên thế giới. 
    * Sau đây là câu lệnh cài đặt MySQL:  `$ sudo apt-get install mysql-server`

    ![](https://images.viblo.asia/a956d888-98cd-4d2f-80f9-dbadaa4e3ceb.png)
    
    * Bấm chọn Y để tiếp tục cài đặt.
    * Sau khi cài đặt xong, tiếp tục chạy câu lệnh sau: `$ sudo mysql_secure_installation.`
    
    ![](https://images.viblo.asia/b10c44ac-aae4-49e4-a790-154d8f562d0e.png)
    
    * Ở đây có 2 lựa chọn, nếu chọn Y sẽ sử dụng VALIDATE PASSWORD PLUGIN có nghĩa là bạn phải sử dụng mất khẩu mạnh cho cơ sở dữ liệu, như là độ dài mật khẩu phải trên 8 kí tự, in hoa, in thường, kí tự đặt biệt, etc... Còn nếu chọn N sẽ không sử dụng VALIDATE PASSWORD PLUGIN. Và ở đây cài đặt trên máy cá nhân nên cũng không cần sử VALIDATE PASSWORD PLUGIN. Nên ở đây mình sẽ chọn N để tiện cho việc cài đặt.
    * Sau khi chọn N, sẽ yêu cầu bạn thiết lập mật khẩu cho MySQL. Ở đây để dễ nhớ mình sẽ đặt là: 123456
    
    ![](https://images.viblo.asia/54afc2ba-22a8-4546-b29a-d24fe4d17b83.png)

     * Gõ lại mật khẩu lần nữa. Và ấn Enter.
     
    ![](https://images.viblo.asia/22822362-cada-479a-943a-b107939116f7.png)
    
     * Tiếp theo chọn Y và ấn Enter.

    ![](https://images.viblo.asia/6d74f186-dc4b-4477-bed5-455a4f9ab2bc.png)
    
    * Tiếp theo chọn N và ấn Enter.
    
    ![](https://images.viblo.asia/bffea3e6-f422-4af2-ab50-4823d3e15897.png)

    * Tiếp theo chọn Y và Enter.

    ![](https://images.viblo.asia/56a1f210-fa55-4a72-a748-3898ae56f785.png)
    
    * Tiếp theo chọn Y và Enter.

    ![](https://images.viblo.asia/306705b4-5a61-41e9-94f4-c697affa1a82.png)

    * Vậy là đã cài đặt xong MySQL. Tiếp theo chạy cậu lệnh sau:`$ mysql -u root -p` để truy cập vào MySQL, root ở đây là username mặc định khi cài đặt MySQL. Bạn cũng thể tự tạo một tài khoản khác để truy cập vào MySQL.

    ![](https://images.viblo.asia/675e629f-4fa2-4ae0-9be9-1dc9daecd0c2.png)
    
    * Nhập mật khẩu đã thiết lập trước đó, nếu như hiện thông tin như ảnh trên. Thì chạy câu lệnh sau: `$ sudo mysql`. Để truy cập vào MySQL với quyền root mà không cần mật khẩu cho tài khoản có username là root.

    ![](https://images.viblo.asia/f58af39c-2da9-47bb-bf79-0264427e9c68.png)

    *  Sau khi đăng nhập vào MySQL với quyền root, chạy câu lệnh sau:
        *   `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`. Trường password là để thiết lập lại mật khẩu cho tài khoản root. Ở đây mình sẽ đặt giá trị password là 123456.
        
        ![](https://images.viblo.asia/7d737a84-1d22-4fae-ba76-3b0fd66c0589.png)
        
        * Tiếp theo chạy câu lệnh:` FLUSH PRIVILEGES;` Mục đích là để reload lại và apply những thay đổi.

        ![](https://images.viblo.asia/199a8a5c-06d3-49bf-8dab-88a2edd064f3.png)

        * Sau đó thoát ra và đăng nhập lại MySQL để kiểm tra thiết lập mật khẩu thành công hay không.

        ![](https://images.viblo.asia/1d3ab55c-7604-48f3-9cc4-3e97835e6b62.png)

        ![](https://images.viblo.asia/04204f28-22bf-4ccd-9367-25acb420fd83.png)
        
    * **Vậy là đã cài xong MySQL. Tiếp đến sẽ cài đặt PHP.**
    
* **PHP**: Để cài đặt PHP, chạy câu lệnh sau: `$ sudo apt-get install php libapache2-mod-php php-mysql`

    ![](https://images.viblo.asia/704b0875-10bd-4030-9924-b4df690ed6c5.png)
    
    * Để kiểm tra PHP đã cài đặt thành công hay chưa, sử dụng câu lệnh: `php -v`.

    ![](https://images.viblo.asia/5a127b0e-2460-40b7-bce4-6ae53caa4ce1.png)
    
    * Tiếp cần phải cài đặt một số thư viện cần thiết cho PHP. Ở đây mình cài thư viện mcrypt.
    * Chạy câu lệnh sau:  `sudo apt install php-dev libmcrypt-dev php-pear`
    * Sau đó chạy tiếp 2 câu lệnh sau:  `sudo pecl channel-update pecl.php.net` và `sudo pecl install mcrypt-1.0.1`
    * Sau khi cài đặt xong, chạy câu lệnh sau: `sudo nano /etc/php/7.2/cli/php.ini` và thêm vào file php.ini dòng sau: `extension=mcrypt.so`
                                                                   
    ![](https://images.viblo.asia/b7dd1b24-9fc3-406c-865f-39959129bb70.png)
    
    * Sau đó `Ctrl + S` và `Ctrl + X` để lưu lại. Để kiểm tra cài đặt thành công hay chưa, sử dụng câu lệnh sau: `php -m | grep mcrypt`. Nếu thành công sẽ hiện ra như sau:
    
    ![](https://images.viblo.asia/7747abbf-420f-4f8d-bf47-27d0acb23638.png)
    
* **Vậy là đã thiết lập LAMP thành công.**

**3. Composer**

Tóm tắt: Composer là công cụ để quả lý package hay library PHP. Composer sẽ cài đặt những libraries vào một thư mục nào đó nằm bên trong project bạn đang làm việc.

* Để tải composer, chạy những câu lệnh sau:
```
     php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
     php -r "if (hash_file('sha384', 'composer-setup.php') === 'c5b9b6d368201a9db6f74e2611495f369991b72d9c8cbd3ffbc63edff210eb73d46ffbfce88669ad33695ef77dc76976') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
     php composer-setup.php
     php -r "unlink('composer-setup.php');"
```

* Kiểm tra Composer đã được cài đặt chưa, chạy câu lệnh sau: `php composer.phar`. Nếu cài đặt thành công, sẽ hiển thị như sau:

![](https://images.viblo.asia/4adb9be1-e83f-4112-b86f-77783dd99ec1.png)

* Để có thể ở bất cứ đâu cũng có thể sử dụng Composer, sử dụng câu lệnh sau: `sudo mv composer.phar /usr/local/bin/composer`. Sau đó chạy câu lệnh: `composer`. Để kiểm tra config đã thành công chưa.

![](https://images.viblo.asia/582b4495-9998-4a9f-8c4e-935cecf0346f.png)

**Vậy là đã cài đặt xong Composer**

**4. Laravel**

* Để cài đặt được Laravel, theo tài liệu trang chủ hướng dẫn `https://laravel.com/docs/6.x`, cần có những extension sau:

```
    PHP >= 7.2.0
    BCMath PHP Extension
    Ctype PHP Extension
    JSON PHP Extension
    Mbstring PHP Extension
    OpenSSL PHP Extension
    PDO PHP Extension
    Tokenizer PHP Extension
    XML PHP Extension
```

* Để kiểm tra xem những extension nào đã được cài rồi, sử dụng câu lệnh sau: `php -m | grep tên extension`. Ví dụ, kiểm tra xem extension BCmath đã có chưa: `php -m | grep bcmath`

![](https://images.viblo.asia/dd73bd6d-d611-445d-a635-1a453dfbfd64.png)

* Nếu chạy xong câu lệnh mà thông báo như trên có nghĩa là extension BCMath chưa được cài đặt. Để cài đặt một extension của php, sử dụng câu lệnh sau: `sudo apt-get install php-bcmath`. Cụ thể, để cài đặt extension BCMath, sử dụng câu lệnh sau: `sudo apt-get install php-bcmath`. Sau đó, chạy lại câu lệnh `php -m | grep bcmath` để kiểm tra xem cài đặt thành công hay chưa.

![](https://images.viblo.asia/3a97e9ce-936a-4496-bfe4-27bd6364b611.png)
 
 * Như vậy, đã cài đặt tthành công extension BCMath. Những extension còn lại, làm theo tương tự.
 * Tiếp theo, cài đặt Laravel thông qua Composer. Chạy câu lệnh sau: `composer global require laravel/installer`
 * Sau khi chạy xong. Chạy câu lệnh: `laravel`, nếu như ở command line hiện nên là: laravel: `command not found`, sẽ cần phải làm theo những bước sau:
     * Chạy câu lệnh: `sudo nano ~/.bashrc `
     * Tiếp theo: Thêm dòng sau vào cuối file `export PATH="~/.config/composer/vendor/bin:$PATH"`
     * `Ctrl + S và Ctrl + X` để lưu lại.
     * Cuối cùng, chạy câu lệnh: `source ~/.bashrc`
* Khi thực hiện xong những bước trên, chạy lại câu lệnh `laravel` để kiểm tra.

![](https://images.viblo.asia/8d15d604-e731-4f52-85f4-acf268fd7f2d.png)

* Vậy là đã thiết lập thành công.

**4. Lời kết**

Hy vọng bài hướng dẫn này sẽ giúp mọi người có thể thiết lập môi trường thành công và bắt tay vào việc làm quen với `Laravel`. Happy Coding!!!