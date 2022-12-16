## Mở đầu :
Chào anh em, chắc rằng việc Deploy một ứng dụng web lên cloud trở nên dễ dàng hơn khi càng ngày càng có nhiều công cụ hỗ trợ chúng ta phải không nào. AWS cung cấp khá nhiều Service từ A->Z, tận răng cho chúng ta thoải mái lựa chọn để phát triển và maintain ứng dụng web của mình. Hôm nay mình sẽ làm một bài lab cũng như Deploy luôn cái [Product](https://savenote.online/viblo) nho nhỏ dùng để lưu note online một cách tiện lợi trên AWS. Một số Service mà mình sẽ sử dụng là :
- Elastic Beanstalk
- CodeCommit
- Code Pipeline
- RDS ( Mysql)

![](https://images.viblo.asia/c5b504e1-9e50-46f7-909f-be7f4166b0c0.png)

## Get Started :
### 1.  Chuẩn bị :
-  Có tài khoản AWS để sử dụng nhá.
-  Tạo một tài khoản IAM trên AWS và đăng nhập trên tài khoản này (nhớ cấp quyền những service sẽ sử dụng) ( IAM là một trình console web giúp quản lý tài khoản AWS cùng quyền hạn truy xuất tài nguyên/dịch vụ của các user AWS). Làm theo [hướng dẫn này ](https://vinasupport.com/aws-huong-dan-tao-va-quan-ly-tai-khoan-iam/) nhá.

- Tạo SSH Key ở dưới local:
```shell
ssh-keygen -t rsa
```
- Sau khi tạo xong lấy public key luôn nhé:
```rust
cat ~/.ssh/id_rsa.pub
```

- Dùng SSH Public Key để thêm vào tài khoản IAM.
![](https://images.viblo.asia/e0d1882e-c708-4fd0-99e3-4cb49f180b4d.png)

- Oke tiếp theo copy IAM-SSH-Key-ID trên IAM để sau dùng cho CodeCommit nhé nhé.  

### 2. Sử dụng Elastic Beanstalk:
-  **Elastic Beanstalk**  là một service của AWS, giúp bạn có thể dễ dàng triển khai và quản lý các ứng dụng trên AWS mà không cần quan tâm quá nhiều đến các cơ sở hạ tầng của server, bạn chỉ cần tải lên ứng dụng của mình và Elastic Beanstalk tự động xử lý các vấn đề về cung cấp dung lượng, cân bằng tải, mở rộng và theo dõi sức khỏe của ứng dụng web nhá (khá tiện lợi). 
- **Elastic Beanstalk** sử dụng: 

-Để dễ dàng tạo một ứng dụng web như PHP, Python, .Net, static web có thể tích hợp sử dụng DB ở trong này.

-Cung cấp khả năng cân bằng tải cho website.

-Hoạt động một cách xuyên suốt 24/7

-Có thể được sử dụng để triển khai các Docker containers.

- Đăng ký BeanStalk Service trên AWS nhé ( ở đây mình chọn phiên bản PHP 7.2 ).
![](https://images.viblo.asia/88381ddc-9743-441d-84cc-632df670c79c.png)

- Sau khi đăng ký thành công chúng ta sẽ có một sample app cùng domain như thế này đây.
![](https://images.viblo.asia/c2234adf-323f-4c5f-b547-5a2666b4e113.png)

- À chỉnh lại config cho nginx root để match với laravel, vào Beantalk Service đã đăng ký -> Configuration -> Software -> Edit :
![](https://images.viblo.asia/35fa2e17-0158-4c57-b646-dd2e5f5acead.png)

Sau khi tạo xong BeanStalk Service cho ứng dụng PHP chúng ta tiếp tục build CI CD cho project Laravel của chúng ta nhé.

### 3. Sử dụng CodeCommit:
- CodeCommit là một service dùng để quản lý, lưu trữ các phiên bản source code dự án của chúng ta tương tự như Github một cách bảo mật, an toàn, độ khả dụng cao và khả năng mở rộng với các service mà chúng ta đang sử dụng trên AWS.

* Đăng ký CodeCommit Service để lưu trữ source code: 
![](https://images.viblo.asia/7b20d8e5-cd21-4fcd-ac00-714fe7c63ef2.png)

* Sau khi đăng ký kho lưu trữ trên AWS thì chúng ta config SSH để push code lên nhé :

* Tạo file tên config theo đường dẫn :
```go
mkdir ~/.ssh/config

chmod 600 config
```

* Lấy IAM-SSH-Key-ID đã tạo ở trên đưa vào config với nội dung: 
```shell
Host git-codecommit.*.amazonaws.com
User IAM-SSH-Key-ID
IdentityFile ~/.ssh/id-rsa
```

*  Vào thư mục chứa source code để push code lên Repository trong kho CodeCommit:
```markdown
git remote add origin ssh://IAM-SSH-Key-ID@git-codecommit.us-east-2.amazonaws.com/v1/repos/savenote

git add -A

git commit -m "init project"

git push origin master

// ok đã push code thành công
Counting objects: 214, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (189/189), done.
Writing objects: 100% (214/214), 212.37 KiB | 6.64 MiB/s, done.
Total 214 (delta 57), reused 0 (delta 0)
To ssh://git-codecommit.us-east-2.amazonaws.com/v1/repos/savenote
 * [new branch]      master -> master
```

- Vậy là đã push code thành công lên repo trên code Commit rồi nhé:
![](https://images.viblo.asia/27e8009b-3aeb-4fe5-aa81-171edffa847b.png)

### 4. Sử dụng CodePipeline:
-  CodePipeline là một dịch vụ sử dụng để phân phối liên tục ( Continous Delivery) giúp chúng ta tự động hóa việc build, test, triển khai ứng dụng mỗi khi code có sự thay đổi, chúng ta có thể tích hợp với Github hoặc ngay cả service của Amazone như CodeCommit.

- Sau khi tạo repo lưu trữ code trên CodeCommit thì chúng ta tiến hành tạo CodePipeline nhé :
![](https://images.viblo.asia/180f3379-e257-41e9-9377-b00e610928bf.png)

![](https://images.viblo.asia/40c0e985-11bd-41e8-b65b-0c308e080270.png)

![](https://images.viblo.asia/43a1b70a-08ce-4d05-84ab-db92fa6910c7.png)

![](https://images.viblo.asia/b4cce1a5-4ddf-44c3-9306-e1cca618a238.png)

- Ok next để hoàn tất quá trình nhé :

- Sau khi tạo xong CodePipeline thì quá trình build sẽ diễn ra như này ( build thành công rồi nhé)
![](https://images.viblo.asia/2e821f7d-4808-478f-b3ea-e0d71e0a2877.png)

### 5. Tạo RDS :
- Tiếp theo chúng ta sẽ sử dụng cơ sở dữ liệu Mysql trên AWS để init DB cho project nhé.
- Vào Beantalk Service đã đăng ký -> Configuration -> Database -> Edit :
![](https://images.viblo.asia/62f259ee-8a47-4d76-8613-b5b809a8ac2d.png)

- Chỉnh lại Inbound rules để có thể connect được dưới local nhé, bạn cũng có thể config chỉ cho phép mỗi ip của bạn đến RDS: 
![](https://images.viblo.asia/96f53266-261d-4815-b269-131f9500b807.png)

- Connect đến DB và tạo một database nhé :
```shell
mysql --host=DB_HOST --port=DB_PORT --user=DB_USER -pDB_PASSWORD

create database DB_NAME;
```

Ok điền đầy đủ và đẩy .env file lên Codecommit hoặc bạn có thể config những ENV này ở Beanstalk :
![](https://images.viblo.asia/8eac4b41-5a67-4397-944a-a6ef51f20bc6.png)

- Để bắt được những ENV này thì mình phải custom lại ở những file config bắt env :
```php
// database.php
 'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => array_key_exists('DB_HOST', $_SERVER['DB_HOST']) ? $_SERVER['DB_HOST'] : env('DB_HOST', '127.0.0.1'),
            'port' => array_key_exists('DB_PORT', $_SERVER['DB_PORT']) ? $_SERVER['DB_PORT'] : env('DB_PORT', '3306'),
            'database' => array_key_exists('DB_DATABASE', $_SERVER['DB_DATABASE']) ? $_SERVER['DB_DATABASE'] : env('DB_DATABASE', 'forge'),
            'username' => array_key_exists('DB_USERNAME', $_SERVER['DB_USERNAME']) ? $_SERVER['DB_USERNAME'] : env('DB_USERNAME', 'forge'),
            'password' => array_key_exists('DB_PASSWORD', $_SERVER['DB_PASSWORD']) ? $_SERVER['DB_PASSWORD'] : env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
```

- Để chạy một số comand line trước khi deploy thì chúng ta sẽ tạo một file script như sau :

```shell
.ebextensions/
    my-scripts.config
app/
artisan
bootstrap
...
```
Chúng ta sẽ chạy lệnh migrate ở trong file my-scripts.config

```cpp
container_commands:
    01-migration:
        command: "php /var/www/html/artisan migrate"
        leader_only: true
```

- OK cơ bản thì chúng ta đã Deploy được một ứng dụng Laravel lên AWS sử dụng Elastic Beanstalk một cách dễ dàng và thành quả, bài viết cũng khá dài rồi, nếu có thể bài sau mình sẽ hướng dẫn mọi người cách trỏ domain, lấy SSL Certificate và config một số Service như Database Backup, Crons, CloudWatch Log, Email,  Domain Registration, SSL Certificate.

- Sau khi Deploy các kiểu con đà điểu xong thì giới thiệu tới mọi người cái product nho nhỏ để lưu note, mình thấy rất tiện lợi nên làm 1 con để lưu trữ dữ liệu cá nhân custom theo link demo mọi người dùng thử nhé nhé :  https://savenote.online/viblo  

![](https://images.viblo.asia/a382fff5-595d-4b4d-8042-003443481592.png)