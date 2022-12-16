# Mở đầu
Có 2 cách để bắt đầu:
- Sử dụng [elastic beanstalk cli](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html?icmpid=docs_elasticbeanstalk_console)
- Sử dụng [aws console](https://ap-northeast-1.console.aws.amazon.com/elasticbeanstalk/home)
# Dùng EB cli
## Chuẩn bị
### Cài đặt Python
Mọi người lên Google search cách cài đặt [Python](https://www.google.com/search?ei=FKXKW9eiONLQ8wXFq5vgCw&q=python+install+pip&oq=python+install&gs_l=psy-ab.3.0.0l10.13828761.13832007.0.13833375.20.13.4.3.3.0.149.1143.0j9.9.0....0...1c.1j4.64.psy-ab..4.15.1013...0i67k1.0.o9iny_qsPmw) đối với mỗi môi trường, máy mình có rồi nên upgrade thôi.

![](https://images.viblo.asia/caad201e-4ab1-4eea-a097-687d22294ec0.png)

### Cài đặt awscli

Sau đó thì install awscli
```
pip3 install awscli
```

![](https://images.viblo.asia/5a71860b-5309-4fd4-8346-d2d55231d6cd.png)

### Cài đặt awsebcli

Và cuối cùng là awsebcli

```
pip3 install awsebcli
```

![](https://images.viblo.asia/b6b739ea-e33f-4620-8d2f-ab1acc9be120.png)

Đọc thêm tại đây [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)

### Chuẩn bị project
Tất nhiên là không phải deploy 1 project vớ vẩn lên rồi. Mọi người di chuyển terminal vào thư mục project muốn deploy bằng eb và thực hiện các bước tiếp theo.

## Elastic Beanstalk Deploy

### Khởi tạo application
Dùng lệnh

```
eb init
```

![](https://i.imgur.com/gonG5dc.jpg)

(Bực mình ghê, ko hiểu sao cái ảnh này ko upload đc mà cũng méo báo lỗi về cho người dùng là sao??? Làm t phải up lên imgur)

Ở đây, nó sẽ bắt mình nhập aws key với secrect, thế nên là phải mở tab mới chrome, thực hiện bước tiếp theo.

### Tạo IAM user

Vào [IAM](https://console.aws.amazon.com/iam/home), tạo một user mới.

![](https://images.viblo.asia/5a8ffd0e-8074-49d5-90c6-deed42f10daf.png)

Sau đó chọn permissions cho hợp lý, còn mình thì cứ full access cho đỡ mệt người.

Sau khi tạo xong user, chọn user vừa tạo, chuyển sang tab `Security credentials` để thêm mới access key bằng cách ấn vào `Create access key`. Lưu file chứa key lại cho chắc, mình vừa vào lại thì chả biết làm thế nào để xem lại cái secret key cả T.T

![](https://images.viblo.asia/403d4b77-1766-4c52-9a67-3b597188c5d5.png)

Quay lại màn hình terminal lúc nãy, điền key vào và làm tiếp các bước mà nó yêu cầu. Sau khi xong sẽ thấy file `gitignore` có thay đổi và có thêm 1 thư mục mới tên là `.elasticbeanstalk` là có vẻ đúng rồi đó.

### Khởi tạo môi trường

Đoạn này là đoạn tạo 1 instance ec2 để chạy code của mình đó. Tức là 1 Application có nhiều Environment đó, kiểu thế này này:
![](https://images.viblo.asia/458ee37b-7ef8-4166-9755-022af3d097fe.png)

Dùng lệnh
```
eb create
```

![](https://images.viblo.asia/52af2816-a917-4d37-a96c-fee179c3a559.png)

Đợi vài phút, chúng ta sẽ được phiên bản đầu tiên của project được deploy lên elastic beanstalk. Chúng ta có thể thấy cái CNAME kia hoặc vào aws console, chọn ElasticBeanstalk, chọn environment mà vừa được tạo, sẽ có link để chạy.

### Deploy cho những lần sau

Sau khi chúng ta sửa code, fix bugs, hoặc đơn giản là chả làm gì, chúng ta muốn deploy thì dùng lệnh:

```
eb deploy
```

![](https://images.viblo.asia/8e406223-6805-4a17-84b1-3627f08f9a54.png)

Chú ý 1 tý là cần commit code đã rồi mới deploy. Và thỉnh thoảng nó báo `This branch does not have a default environment... bla bla` là vì mình init ở develop, muốn deploy thì thêm tên của environment vào sau:

```
eb deploy environment-name-blabla
```

Cơ bản là đã xong, nhưng mà mình deploy Laravel mà, làm như thế này thì vẫn chưa chạy được. Còn phải config composer rồi npm, suppervisord các kiểu nữa cơ mà.

### Cấu hình môi trường

- Vào aws console, chọn ElasticBeanstalk, chọn môi trường mình đang sử dụng.
- Chọn `Configuration` > Chọn ô `Software`
- Sửa: Document Root thành `/public`
- Thêm: `Environment properties` là các key trong file `.env.example` của chúng ta

![](https://images.viblo.asia/039d22f4-6968-487c-a637-515dec3a74c7.png)

Thật ra thì thằng ElasticBeastalk này cung cấp cho chúng ta các biến môi trường về RDS, Cache,... nọ kia rồi nhưng mà nêu dùng của nó thì mình lại phải sửa code, sửa config .env trong project của mình, thế nên là mình nghĩ ra làm theo cách này, hơi dài với thủ công tý nhưng mà chắc chắn, đọc mấy tutorial khác ngta toàn bảo dùng key `RDS_DB_NAME` bla bla gì gì đó hay thêm define vào, thôi nghỉ =))

## EB extensions

Tạo thư mục `.ebextensions` trong folder project. Cái này để chưa file config chạy các lệnh mà chúng ta vẫn hay làm khi deploy project ấy: `migrate, seed, npm dev,...`

### Biến môi trường
Như đã nói ở trên, chúng ta có thể config biến môi trường như mình làm, hoặc dùng các biến có sẵn của EB, hoặc config trong ebextensions.

Tạo file `00environmentVariables.config`:
```
option_settings:
   - namespace: aws:elasticbeanstalk:application:environment
     option_name: DB_HOST
     value: mysqldbname.product-app.us-east-1.rds.amazonaws.com
   - option_name: DB_PORT
     value: 3306
   - option_name: DB_NAME
     value: dbname
   - option_name: DB_USER
     value: username
   - option_name: DB_PASS
     value: password
```

Sau đó sửa file `config\database.php` của chúng ta:
```
		'mysql' => [
			'driver'    => 'mysql',
			'host'      => $_ENV['DB_HOST'],
			‘port’	    => $_ENV['DB_PORT’],
			'database'  => $_ENV['DB_NAME'],
			'username'  => $_ENV['DB_USER'],
			'password'  => $_ENV['DB_PASS'],
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
		],

```

Nếu mà làm bằng tay như mình đã chỉ rồi thì thôi không cần có file này cũng được.

### Composer Commands

Tạo file `01composer.config`:

```
commands:
   01updateComposer:
      command: export COMPOSER_HOME=/root && /usr/bin/composer.phar self-update

option_settings:
   - namespace: aws:elasticbeanstalk:application:environment
     option_name: COMPOSER_HOME
     value: /root

container_commands:
   01optimize:
      command: "/usr/bin/composer.phar dump-autoload --optimize"
```

### Artisan Commands

Tạo file `02artisan.config`:

```
container_commands:
   01migrateSeed:
      command: "php artisan migrate"
   02seed:
      command: "php artisan db:seed"
```

### Config Suppervisord

Khi mà dùng queue để gửi mail hay chạy job gì đó thì cần dùng suppervisord. Đây là phần config cái đó.

Tạo file `03supervisor.config`:

```
files:
  "/tmp/new_supervisord_conf":
     mode: "000644"
     owner: root
     group: root
     content: |
       ; Sample supervisor config file.
       ;
       ; For more information on the config file, please see:
       ; http://supervisord.org/configuration.html

       [unix_http_server]
       file=/tmp/supervisor.sock   ; (the path to the socket file)

       [supervisord]
       logfile=/tmp/supervisord.log ; (main log file;default $CWD/supervisord.log)
       logfile_maxbytes=50MB        ; (max main logfile bytes b4 rotation;default 50MB)
       logfile_backups=10           ; (num of main logfile rotation backups;default 10)
       loglevel=info                ; (log level;default info; others: debug,warn,trace)
       pidfile=/tmp/supervisord.pid ; (supervisord pidfile;default supervisord.pid)
       nodaemon=false               ; (start in foreground if true;default false)
       minfds=1024                  ; (min. avail startup file descriptors;default 1024)
       minprocs=200                 ; (min. avail process descriptors;default 200)

       [rpcinterface:supervisor]
       supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

       [supervisorctl]
       serverurl=unix:///tmp/supervisor.sock ; use a unix:// URL  for a unix socket

       [program:queue]
       command=php artisan queue:listen --sleep=10
       directory=/var/app/current
       stdout_logfile=/var/app/current/storage/logs/supervisor.log
       redirect_stderr=true

  "/opt/elasticbeanstalk/hooks/appdeploy/post/99_supervisor":
     mode: "000777"
     owner: root
     group: root
     content: |
       #!/usr/bin/env bash
       #sudo easy_install supervisor==3.1.3
       #supervisord -c /tmp/new_supervisord_conf
```

Ngoài ra trong project khác nhau thì cần thêm các setup khác nữa tùy vào dự án, như các set up về npm, về nodejs hay bla bla gì đó, có thể tạo thêm file config và xử lý như trên. Chúng ta có thể tìm hiểu thêm ở đây: [Advanced Environment Customization with Configuration Files (.ebextensions)
](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html)

### Hoàn thành

Xong xuôi tất cả, chúng ta commit lại code và deploy. Thành quả:

![](https://images.viblo.asia/5ea18a85-0f86-49a1-a988-4ab516c11be3.png)

# Dùng aws console

Ngoài cách trên chúng ta còn có thể dùng [aws console](https://ap-northeast-1.console.aws.amazon.com/elasticbeanstalk).

### Mở aws console, chọn ElasticBeanstalk

- Chọn `Create a web server environment`

![](https://images.viblo.asia/faa8d298-0a91-42e8-97bf-4d516be31214.png)

Ở đây mình đã save lại config env của 1 env khác rồi, và đã deploy được nhiều lần rồi, nên mình chọn load lại `existing version`.

### Cấu hình

- Chọn `Configure more options` ở bước trên, ta có:

![](https://images.viblo.asia/02e77933-424b-4b46-a308-44384d26807f.png)

- Chọn modify Software để sửa lại cấu hình cho project như doc root, env variables,...
- Chọn Instances để sửa lại cấu hình server.
- Chọn Database để sửa lại cấu hình cho thằng RDS.
- Những thứ còn lại mình chưa tìm hiểu :D

### Hoàn thành

- Chọn `Create Environment` để bắt đầu, sau đó làm ván war guild chờ nó chạy xong:

![](https://images.viblo.asia/1f5bd70e-2561-42d4-83ec-36a4284aad14.png)

# Kết luận
- Chúng ta có thể ssh lên server eb bằng cách:

```
eb ssh
```

nếu mà nó báo lỗi xác thực gì gì đó thì hãy tạo 1 cái Key pair:

Vào Ec2 > Chọn `Key pairs` ở trong menu `NETWORK & SECURITY` > Chọn `Create key pair`

Có file pem rồi copy vào thư mục `.ssh` trên máy mình là ok.

- Gõ `eb` để biết thêm các lệnh khác.
- Các cách xử lý đối với EB có thể dùng command ebcli và đều có thể thao tác được bằng chuột ở trên aws console.
- Ngoài ra còn cần phải tạo RDB để chạy DB nữa, các bạn tự mò vì nó nằm ở chỗ `Configuration` hết rồi.
- Làm theo hướng dẫn trên có thể sẽ không chạy đc 100% vì 1 vài lý do nào đó =)) mình cũng làm theo hướng dẫn của người ta nhưng cũng không suôn sẻ được, phải mày mò khá nhiều chỗ khác nhau và mới thành công để viết được cái bài này.