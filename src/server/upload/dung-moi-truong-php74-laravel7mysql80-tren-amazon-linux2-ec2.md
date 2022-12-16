## Overview
Connect đến instance Amazon Linux2 EC2, install và dựng môi trường php7.4、laravel7、mysql8.0 ở trạng thái ec2-user. 

Có thể install, setting thêm apache, php-fpm, git, bitbucket, phpmyadmin nếu cần (không bắt buộc)

Nếu sau khi connect đến Amazon Linux ec2 mà ko thể run command *yum* thì có thể cần edit lại policy của AWS VPC. Trường hợp này cần allow traffic đến S3 bucket - host Amazon Linux AMI từ VPC.

```
{
"Statement": [
   {
      "Sid": "Amazon Linux AMI Repository Access",
      "Principal": "*",
      "Action": [
         "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": [
         "arn:aws:s3:::packages.*.amazonaws.com/*",
         "arn:aws:s3:::repo.*.amazonaws.com/*"
      ]
   }
]
}
```

## php7.4 install
```
   sudo amazon-linux-extras install epel
   sudo yum install epel-release
   sudo rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
   sudo yum install -y php74 php74-php php74-php-fpm
   sudo ln -s /usr/bin/php74 /usr/bin/php
   php -v
```

## php.ini symbolic link
Trường hợp đã install như trên thì file php.ini sẽ ko nằm dưới thư mục /etc.
Để cải thiện khả năng sử dụng trong tương lai cần setting symbolic link. 

```
   sudo find / -name php.ini
   ln -s /etc/opt/remi/php74/php.ini /etc/php.ini
   sudo ln -s /etc/opt/remi/php74/php.ini /etc/php.ini
```

## apache & php-fpm start
Chỉ setting khi cần dùng php-fpm
```
   sudo systemctl enable httpd.service
   sudo systemctl start httpd.service
   sudo systemctl status httpd.service
   sudo systemctl enable php74-php-fpm.service
   sudo systemctl start php74-php-fpm.service
   sudo systemctl status php74-php-fpm.service
```

## composer install
```
   php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
   php composer-setup.php
   rm composer-setup.php
   mv composer.phar /usr/local/bin/composer
   sudo mv composer.phar /usr/local/bin/composer
   composer 
```

## sshd setting
Chỉ thực hiện khi cần setting ssh

```
   sudo vi /etc/ssh/sshd_config
   sudo chkconfig --list
   sudo service sshd restart
```

## laravel install
```
   sudo yum install php74-php-pecl-zip
   composer global require laravel/installer
```

## git install & ssh-key generate & git clone from bitbucket
Trường hợp sử dụng git thì chạy câu lệnh sau
```
   sudo yum install git
   git --version
```

Nếu sử dụng bitbucket hãy thực hiện setting theo flow sau
```
   ssh-keygen
   eval `ssh-agent`
   ssh-add ~/.ssh/id_rsa
   cat ~/.ssh/id_rsa.pub
   ssh -T git@bitbucket.org
   git clone git@bitbucket.org:xxxxxxx/xxxxxxx.git
```

## laravel project create
```
  cd /var/www/html/xxxx
  sudo yum install php74-php-mbstring
  sudo yum install php74-php-xml
  sudo yum install php74-php-bcmath
  composer create-project --prefer-dist laravel/laravel .
  sudo chmod -R 777 storage
  sudo chmod -R 777 bootstrap/cache
```

## git push
```
  git add .
  git commit -m "laravel7 installed"
  git remote add origin git@bitbucket.org:xxxxxxx/xxxxxxx.git
  git push origin master
  git config --global user.name "xxxxxxx"
  git config --global user.email "xxxxxxx"
```

## apache document root setting
Nếu muốn thay đổi Document Root thì thực hiện flow sau.
```
 sudo vi /etc/httpd/conf/httpd.conf
```

Tại file httpd.conf, edit Document root muốn access đến. Ví dụ muốn access đến laravel thì set root là */var/www/html/xxxx/public*
```
  DocumentRoot "/var/www/html/xxxx/public"
```

Sau đó restart lại
```
 sudo service httpd restart
```

## mysql8.0 install & start
Install mysql8.0.
Repository [ở đây](https://dev.mysql.com/downloads/repo/yum/).
```
  sudo yum localinstall https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm -y
  yum install mysql-community-server
  sudo yum install mysql-community-server
  mysql --version
  sudo systemctl start mysqld.service
  sudo systemctl enable mysqld.service
```

## mysql8.0 setting
```
  sudo grep 'temporary password' /var/log/mysqld.log
  mysql_secure_installation
```

## phpmyadmin install
Nếu cần install phpmyadmin thì chạy câu lệnh như bên dưới.

URL download thì confirm [ở đây](https://www.phpmyadmin.net/).  Phía trên góc phải của site có link download, mọi người copy cái link đó lại để sử dụng. 

```
  cd /var/www/html
  wget https://files.phpmyadmin.net/phpMyAdmin/5.0.2/phpMyAdmin-5.0.2-all-languages.zip
  unzip phpMyAdmin-5.0.2-all-languages.zip
  mv phpMyAdmin-5.0.2-all-languages phpmyadmin #rename cho phù hợp với môi trường của mỗi người
  rm -rf phpMyAdmin-5.0.2-all-languages.zip
  sudo yum install php74-php-mysqlnd
```

## apache setting for phpmyadmin
```
  sudo vi /etc/httpd/conf/httpd.conf #Alias, vitual host,... thì thay đổi tùy theo môi trường của mỗi người
  sudo service httpd configtest
  sudo service httpd restart
```

Sau khi đã thực hiện xong các setting ở trên thì đã có thể sử dụng phpmyadmin, tuy nhiên sẽ xuất hiện warning. Thực hiện setting như dưới đây để tắt warning.
```
  cd /var/www/html/phpmyadmin
  mkdir tmp
  sudo chmod -R 777 tmp
  cp -a config.sample.inc.php config.inc.php
  vi config.inc.php
```

Tại file config.inc.php :
```
  $cfg['blowfish_secret'] = 'ở đây setting string ít nhất 32 ký tự';
```

Sau khi hoàn thành các setting ở trên thì thử access vào phpmyadmin xem thế nào nhé.

## laravel setting for mysql connetion
Edit file.env để có thể connect đến mysql từ laravel
```
/var/www/html/xxxx/.env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=mysqlusername
DB_PASSWORD=mysqlpassword
```

Cuối cùng hãy thử access đến laravel để kiểm tra thành quả nhé.