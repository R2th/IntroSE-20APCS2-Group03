Link bài viết gốc - [Xây dựng hạ tầng phục vụ hàng triệu người dùng trên AWS](https://devopsvn.tech/xay-dung-ha-tang-phuc-vu-hang-trieu-nguoi-dung-tren-aws/bai-0-chuan-bi)

## Giới thiệu
Ban đầu mình chỉ tính viết 1 bài nói về thiết kế hệ thống, nhưng sau khi dạo vòng quanh thấy toàn bài về lý thuyết mà chả ai chỉ làm thực hành nên mình quyết định viết 1 series vừa thiết kế vừa thực hành làm trên AWS để xây dựng hệ thống phục vụ cho hàng triệu người dùng. Series bao gồm:

+ Bài 0 - Chuẩn bị: Cài đặt WordPress trên EC2, tạo RDS và S3
+ Bài 1 - 1k người dùng: đóng gói EC2, thiết lập Load Balancer và Autoscaling Group
+ Bài 2 - 10k người dùng: tạo database replica, kết nối master - replica
+ Bài 3 - 100k người dùng: cache system, tạo elasticache và kết nối
+ Bài 4 - Hơn 500k người dùng: http cache system

Loạt bài này mình sẽ sử dụng WordPress và các plugin có sẵn của nó thay vì phải code, các bạn sẽ được hướng dẫn cách làm từng bước để xây dựng hệ thống trên AWS. Các bạn cần có tài khoản trên AWS và biết cơ bản về AWS nếu muốn thực hành nhé.

**Vì để tiện nên các vấn đề về bảo mật trong hệ thống mình sẽ bỏ qua**.

## Chuẩn bị
Ở bài đầu tiên ta sẽ bắt đầu với hệ thống cơ bản nhất.

![](https://images.viblo.asia/6f2d3862-038e-4170-a23e-5024cb9ee6b2.png)

Hệ thống bao gồm một con máy ảo chạy WordPress, một con AWS RDS Database MySQL và S3 bucket. Hệ thống này của ta có thể chịu tải được khoảng vài trăm người dùng, và ở các bài sau ta sẽ xem làm sao ta có thể mở rộng hệ thống này ra để phục vụ được hàng triệu người dùng.

Các bước ta sẽ làm ở bài này:
+ Tạo máy ảo trên AWS
+ Cài WordPress trên máy ảo
+ Tạo Database trên AWS
+ Kết nối WordPress với Database của AWS
+ Tạo S3 bucket
+ Kết nối WordPress với S3 bucket

## Tạo máy ảo trên AWS

![](https://images.viblo.asia/fd7f0db1-2595-4730-b541-d9be2d9ba545.png)

AWS cung cấp cho ta một dịch vụ để tạo máy ảo là Amazon Elastic Compute Cloud (EC2), ta tạo máy ảo như sau (nếu các bạn đã biết cách tạo thì nhảy qua bước tiếp theo nhé).

1. Truy cập [AWS EC2 Console](https://console.aws.amazon.com/ec2/)
2. Ở EC2 Dashboard, tìm mục **Launch instance** và bấm vào nút **Launch instance**, ta sẽ được dẫn qua trang tạo EC2
3. Phần **Name** ở mục **Name and tags** điền vào tên của EC2
4. Mục **Application and OS Images (Amazon Machine Image)**, các bạn chọn **Quick Start** và chọn Amazon Linux, phần **Amazon Machine Image (AMI)** các bạn để mặc định
5. Mục **Instance type** các bạn chọn `t3.micro`
6. Mục **Key pair** các bạn bấm *Create new key pair*, nó sẽ hiển thị lên một popup, nhập vào tên **Key pair** của bạn, *Key pair type* chọn RSA, *Private key file format* chọn PEM, bấm tạo và sẽ có một file được tải xuống, các bạn lưu lại file này vì ta sẽ dùng nó để truy cập EC2
7. Mục **Network settings**, phần **Firewall (security groups)** các bạn chọn cả 3 mục *Allow SSH traffic from, Allow HTTPS traffic from the internet, Allow HTTP traffic from the internet*.
8. Mục **Configure storage** các bạn để mặc định
9. Bấm nút **Launch instance** và đợi EC2 khởi tạo thành công

Tiếp theo ta sẽ tiến hành cài đặt WordPress ở trên EC2.

## Cài WordPress trên máy ảo
Ở EC2 Dashboard các bạn chọn phần **Instances** ta sẽ thấy EC2 ta vừa tạo, bấm vào nó và xem Public IP của nó, ta sẽ truy cập tới EC2 với Public IP và Key pair ta đã tạo ở trên. Ví dụ EC2 của bạn có IP và Key pair là  `13.214.192.207` và `devopsvn.pem`.

```
ssh -i devopsvn.pem ec2-user@13.214.192.207
```

```

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
13 package(s) needed for security, out of 16 available
Run "sudo yum update" to apply all updates.
[ec2-user@ip-172-31-44-93 ~]$
```

Trước khi cài WordPress thì EC2 cần phải có Apache và PHP thì WordPress mới chạy được, với Amazon Linux 2 thì công việc cài đặt Apache và PHP server rất đơn giản, ta làm như sau.

```
sudo yum update -y
```

Cài Apache.

```
sudo yum install -y wget httpd
sudo systemctl start httpd
sudo systemctl enable httpd
```

Cài PHP.

```
sudo amazon-linux-extras install -y php7.2
```

```
sudo systemctl restart php-fpm
```

Tải WordPress.

```
wget https://wordpress.org/latest.tar.gz
```

```
...
2022-10-25 06:27:26 (6.02 MB/s) - ‘latest.tar.gz’ saved [21172651/21172651]
```

Giải nén.

```
tar -xzf latest.tar.gz
```

Di chuyển toàn bộ source của WordPress tới thư mục `/var/www/html/`.

```
sudo cp -r wordpress/* /var/www/html/
```

Cập nhật lại cấu hình Apache.

```
sudo vim /etc/httpd/conf/httpd.conf
```

Kiếm phần `<Directory "/var/www/html">`.

```httpd.conf
<Directory "/var/www/html">
    #
    # Possible values for the Options directive are "None", "All",
    # or any combination of:
    #   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
    #
    # Note that "MultiViews" must be named *explicitly* --- "Options All"
    # doesn't give it to you.
    #
    # The Options directive is both complicated and important.  Please see
    # http://httpd.apache.org/docs/2.4/mod/core.html#options
    # for more information.
    #
    Options Indexes FollowSymLinks

    #
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   Options FileInfo AuthConfig Limit
    #
    AllowOverride None

    #
    # Controls who can get stuff from this server.
    #
    Require all granted
</Directory>
```

Ta sửa  `AllowOverride None` thành  `AllowOverride All`, tiếp theo ta cấp quyền để apache có thể truy cập được toàn bộ file của thư mục `/var/www`.

```
sudo chown -R apache /var/www
sudo chgrp -R apache /var/www
```

```
sudo chmod 2775 /var/www
find /var/www -type d -exec sudo chmod 2775 {} \;
```

```
find /var/www -type f -exec sudo chmod 0644 {} \;
```

Restart lại Apache server.

```
sudo systemctl restart httpd
```

Oke, giờ các bạn mở browser lên gõ vào IP của EC2 ta sẽ thấy WordPress đã chạy, với mình là IP `13.214.192.207`.

![](https://images.viblo.asia/1e4d2854-d856-4858-aad4-04689a28903d.png)

Nhưng hiện tại ta chưa có Database nên ta không thể tiếp tục cấu hình WordPress được, nếu các bạn hay cài server thì sẽ thấy các bài hướng dẫn khác thường chỉ cài MySQL Database ở trên cùng server chạy WordPress luôn, nhưng ta không thể mở rộng hệ thống với kiến trúc như thế, nên ta sẽ sử dụng Database riêng. 

## Tạo Database trên AWS

![](https://images.viblo.asia/dc089616-0405-45df-acb1-3b3aedaa8b21.png)

AWS có cung cấp dịch vụ để ta tạo Database là AWS Relational Database Service (RDS), ta sẽ sử dụng RDS để tạo MySQL như sau (nếu các bạn đã biết cách tạo thì nhảy qua bước tiếp theo nhé).

1. Truy cập [AWS RDS Console](https://console.aws.amazon.com/rds/)
2. Bấm vào nút **Create database**, ta sẽ được dẫn qua trang tạo RDS
3. Mục **Choose a database creation method** chọn *Standard create*
4. Mục **Configuration**, phần *Engine type* chọn Amazon Aurora và *Version* ta chọn Aurora MySQL bản 5.x

![](https://images.viblo.asia/5672f962-03b3-47af-bbb2-7846bb0b8753.png)

6. Mục **Templates** chọn *Dev/Test*, bài tiếp theo ta sẽ sửa lại sau.
7. Mục **Settings** tất cả các phần các bạn điền vào là `devopsvn` cho dễ

![](https://images.viblo.asia/e004985a-f751-4562-ada7-7a5a37912f66.png)

8. Mục **Instance configuration** các bạn chọn `db.t3.small`

![](https://images.viblo.asia/4a09b408-c223-4341-a0d5-a87b8eb141e7.png)

9. Mục **Connectivity** các bạn để như hình bên dưới, còn ở phần **VPC security group (firewall)** các bạn chọn **Create new** và điền vào tên bạn muốn, mình điền là `access-mysql`.

![](https://images.viblo.asia/d677c4be-5ca0-4e2d-a5e9-0c19812eb707.png)

10. Mục **Database authentication** chọn *Password authentication*
11. Kéo xuống mục **Additional configuration** ở dưới mục **Monitoring**, các bạn mở ra, phần Initial database name các bạn nhập vào `devopsvn`
12. Bấm **Create database**

Trong khi đợi RDS tạo, ta cần cập nhật lại Security Group ta đã tạo ở trên để từ EC2 ta có thể truy cập được RDS, nó tên là access-mysql. Ở EC2 Dashboard các bạn bấm vào mục **Security Groups**, bấm vào access-mysql và chọn **Edit inbound rules**.

![](https://images.viblo.asia/361f5074-1251-4acd-b393-620b9a518f2b.png)

Mục **Source** các bạn sửa lại thành 0.0.0.0/0 và bấm **Save rules**. Oke, quay lại RDS Console, bấm vào RDS ta đã tạo.

![](https://images.viblo.asia/032b37b4-a354-4f4c-a114-45e7c3dab196.png)

Ở phần Endpoints các bạn sao chép địa chỉ của Writer instance, ta sẽ dùng nó để cấu hình Database cho WordPress.

Truy cập vào lại EC2.

```
ssh -i devopsvn.pem ec2-user@13.214.192.207
```

Sao chép `wp-config-sample.php` thành `wp-config.php`, đây là file mà WordPress sẽ lấy làm cấu hình.

```
sudo cp /var/www/html/wp-config-sample.php /var/www/html/wp-config.php
```

Cập nhật lại file.

```
sudo nano /var/www/html/wp-config.php
```

Ở đoạn.

```php
/** The name of the database for WordPress */
define( 'DB_NAME', 'database_name_here' );

/** Database username */
define( 'DB_USER', 'username_here' );

/** Database password */
define( 'DB_PASSWORD', 'password_here' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );
```

Ta sửa thành cấu hình của RDS.

```php
define( 'DB_NAME', 'devopsvn' );

/** Database username */
define( 'DB_USER', 'devopsvn' );

/** Database password */
define( 'DB_PASSWORD', 'devopsvn' );

/** Database hostname */
define( 'DB_HOST', 'devopsvn.cluster-cz2tvtl6lcep.ap-southeast-1.rds.amazonaws.com' );
```

Các bạn kéo xuống ở mục *Authentication unique keys and salts*, cập nhật cấu hình bảo mật với key của bạn. 

```php
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );
```

Để tạo được mấy key này đơn giản nhất thì các bạn truy cập trang này https://api.wordpress.org/secret-key/1.1/salt/

```php
define('AUTH_KEY',         ',8{,r=!A,/+gvP:;JMS<xVK<mpdv2tqZ-.W4-+Dl}_Z6k4Vxz!K}Yp6i.X*_&iMq');
define('SECURE_AUTH_KEY',  '|.>sT)f+t%Z;b8[dOC_[k6PjLmZbiiocY67;_#&z-$!%(8~Ao).EMLSE!-Rs=0,+');
define('LOGGED_IN_KEY',    'aN#rk2eB40`h[],ptfX=~Y)ZJq?tl`Y[I2s,85Q37tMP[YNHRXFdwm021WI<7])T');
define('NONCE_KEY',        'jNTm;C(+Zm0DI+7awCb378{:o)e9iX:}M9;+t:(R),qznM&[*w~w{fH/,d6N{*ti');
define('AUTH_SALT',        '$%(xhTC7Y|ET,@P+&0.L0|2Jdot|Xmm6GVhIu:x|{ }M3Pn8uRbBUk)dIT9#RQZt');
define('SECURE_AUTH_SALT', 'BLnjpxrkbU#RgMDK=-Efq-Uhgqe7>`=t]god?.5 Li<O?}{=SmT}pXd)x==)SAxw');
define('LOGGED_IN_SALT',   '>|FEk6rsa~KaKItKXmk@b9TPHVD?M`# ZEfs 3)/A]j{lN)dF/gWYeGzlW-z+$$:');
define('NONCE_SALT',       'p1^;XSz,V@+~Qzy-z(z(UX8t2=^wF{g#L:,o-nVDc:N%^+Y+7JbI7@(({Lxv0Ifj');
```

Ta save lại file, giờ thì WordPress của ta đã chạy rồi. Mở bowser lên truy cập WordPress bằng IP của EC2, tiếp tục các hướng dẫn ở trên bowser.

![](https://images.viblo.asia/9a989122-136a-4e6d-bbec-e504253d3c63.png)

Hoàn thành, nếu bạn thích màu mè thì cài theme và plugin thêm =)).

![](https://images.viblo.asia/4744cafb-f55a-4173-8898-7567f748e27f.png)

## Tạo S3 bucket để lưu hình ảnh
Với WordPress thì các dữ liệu như hình ảnh và video sẽ được lưu dưới ổ đĩa của server, nhưng ta đang xây dựng hệ thống cần mở rộng nên sẽ có rất nhiều server khác nhau, lúc này ta sẽ gặp một vấn đề là nếu ta upload hình lên trên WordPress và nó được lưu vào ổ đĩa của một server, khi ta truy cập WordPress ở một server khác thì ta sẽ không thấy được tấm hình đó.

Nên ta cần có một chỗ lưu trữ hình chung cho toàn bộ các server khác nhau khi ta mở rộng hệ thống, ta sẽ sử dụng AWS Simple Storage Service (S3) để làm nơi lưu trữ hình.

![](https://images.viblo.asia/e6173980-213c-4159-942c-3ea70a89b9e8.png)

Để tạo S3 bucket ta làm như sau.

1. Truy cập [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Chọn **Create bucket**
3. Mục **General configuration**, phần **Bucket name** bạn điền vào tên bucket, mình điền là devopsvn, **lưu ý là tên của bucket phải là unique tên toàn bộ hệ thống của AWS**
4. Các mục còn lại để mặc định và bấm **Create bucket**

## Kết nối WordPress với S3 bucket
Để kết nối với S3, ở WordPress ta cài thêm plugin **WP Offload Media Lite for Amazon S3**.

![](https://images.viblo.asia/0e034c25-5e07-4429-a8bb-923948cd4d34.png)

Khi cài xong thì các bạn Active nó lên, sau đó bấm vào phần cài đặt plugin

![](https://images.viblo.asia/ae164846-30ed-40e8-9a5b-133da3f08fb4.png)

Ở mục **Add Credentials** ta sẽ thấy đoạn code.

```php
define( 'AS3CF_SETTINGS', serialize(array(
	'provider' => 'aws',
	'access-key-id' => '********************',
	'secret-access-key' => '**************************************',
) ) );
```

Ta thêm đoạn code trên với `access-key-id` và `secret-access-key` vào `wp-config.php`. Các bạn xem cách tạo AWS Credentials ở đây [Creating your first IAM admin user and user group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html).

Sau khi thêm xong bạn F5 lại trang ta sẽ thấy plugin đã được cài thành công, tiếp theo ta điền vào tên của S3 bucket ta đã tạo ở trên và bấm **Save**.

![](https://images.viblo.asia/b45cce7b-6a6a-420e-aaae-def2c9ad7980.png)

Thử upload hình bất kì ta sẽ thấy nó được sao chép lên trên S3 bucket.

![](https://images.viblo.asia/1507c839-a268-4d21-9681-293c049973db.png)

Xong bài 0 😁.

## Tiếp tục
Bài tiếp theo ta sẽ tìm hiểu cách đóng gói EC2 ở bài này thành Amazon Machine Image, sau đó ta sẽ thiết lập Autoscaling Group và Load Balancer với AMI ta đã đóng gói để thiết kế hệ thống phục vụ hàng ngàn người dùng.

Các bạn đón xem bài tiếp theo ở đây [1k người dùng](https://devopsvn.tech/xay-dung-ha-tang-phuc-vu-hang-trieu-nguoi-dung-tren-aws/bai-1-1k-nguoi-dung/).

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).

Đồng đội [Junior Backend Engineer](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067).

Đồng đội [Junior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068).

Đồng đội [Onsite Merchandising (Web Admin)](https://tuyendung.hoang-phuc.com/careers/job/945)