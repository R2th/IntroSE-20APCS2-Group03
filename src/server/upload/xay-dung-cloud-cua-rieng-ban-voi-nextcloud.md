![](https://images.viblo.asia/12b4af21-61a5-4a6b-8962-3c6c12c459a5.png)

# Tổng Quan
Trong thời đại phát triển mạnh mẽ về công nghệ thông tin như hiện nay, Cloud Computing có lẽ đã không còn là thuật ngữ gì mới mẻ. Người ta tìm hiểu về nó nhiều hơn, tiếp cận và sử dụng nó cũng nhiều hơn. Ở mức độ người dùng cá nhân, chúng ta đã quen thuộc với Google Drive, IOS Cloud hay Dropbox. Ở mức độ doanh nghiệp, ta nghe nói nhiều hơn đến Amazon Web Service , Google Cloud hay Azure.. Chỉ 4,5 năm về trước, khi muốn tải một file dung lượng cao, có lẽ điều ta mong chờ nhất là Server lưu trữ đó nằm ở Việt Nam. Nhưng hiện tại điều mong đợi có lẽ là tệp tin đó nằm "chềnh ềnh" trên Google Drive :grinning:. Theo bản thân mình đó là biển hiện rõ nhất cho sự phát triển này.


Quay trở lại với tiêu đề bài viết, Nextcloud đơn giản là một chương trình mã nguồn mở, giúp tạo ra một "Cloud Mini" để bạn có thể lưu trữ và chia sẻ dữ liệu. Với Nextcloud bạn có thể xây dựng cho cá nhân hay doanh nghiệp một nền tảng lưu trữ và đồng bộ dữ liệu giống như Google Drive, Dropbox, One Drive,..

Vậy tại sao lại không dùng Google Drive, Dropbox hay One Drive mà lại phải dùng NextCloud  ?

- Câu hỏi này mình đã suy nghĩ nhiều, nhưng chưa tìm ra câu trả lời. Theo nhìn nhận chủ quan của mình, Next Cloud có lẽ không ưu việt hơn những thứ kể trên, rủi ro mất dữ liệu cao, khả năng bảo mật thấp hơn, đồng thời khó tiếp cận và khá rắc rối trong các bước cấu hình. Nhưng hiện tại bản thân mình vẫn đang sử dụng nền tảng này cho việc lưu trữ dữ liệu của bản thân, đơn giản vì mình thích những thứ "Handmade", và có lẽ đó cũng là lý do bạn nên thử trải nghiệm với nền tảng này 


# Cài đặt
Môi trường : Trong bài hướng dẫn sau đây, mình demo cài đặt trên Ubuntu 20.04 (RAM 4G)

*Tâm sự : Trong quá trình sử dụng NextCloud, mình thường cài đặt và sử dụng trên các Instance của Google hay EC2 AWS để làm tăng yếu tố Cloud. Việc cài đặt trên một VPS và gọi đó là Cloud, bản thân mình cảm thấy hơi "điêu điêu"*

Cài đặt Apache
```bash
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get install apache2 -y
```

Cài đặt mariadb-server
```bash
sudo apt-get install mariadb-server -y 
```

Cài đặt php và các thư viện cần thiết

```bash
sudo apt-get install libapache2-mod-php7.4
sudo apt install imagemagick php-imagick libapache2-mod-php7.4 php7.4-common php7.4-mysql php7.4-fpm php7.4-gd php7.4-json php7.4-curl php7.4-zip php7.4-xml php7.4-mbstring php7.4-bz2 php7.4-intl php7.4-bcmath php7.4-gmp
```

Khởi động mysql
```bash
sudo /etc/init.d/mysql start
```

Cấu hình MySQL
```
sudo mysql -uroot -p

CREATE USER 'cloudtest'@'localhost' IDENTIFIED BY 'password@123A';
CREATE DATABASE IF NOT EXISTS nextcloud CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
GRANT ALL PRIVILEGES ON nextcloud.* TO 'cloudtest'@'localhost';
FLUSH PRIVILEGES;
quit;

```

![](https://images.viblo.asia/9e0d6fe6-bfa5-4d96-af3c-08ecd50346e7.png)

Tiến hành Download NextCloud với đường dẫn sau  : https://nextcloud.com/install/# 

```bash
wget https://download.nextcloud.com/server/releases/nextcloud-22.1.0.zip
unzip nextcloud-22.1.0.zip
```
tiếp đó di chuyển thư mục vừa giải nén vào Document Root ( /var/www với Apache) . Sửa file cấu hình Apache và lưu lại

```bash
cp -r nextcloud /var/www
sudo chown -R www-data:www-data /var/www/nextcloud/
```

![](https://images.viblo.asia/e2552207-8359-4793-97b1-e78c0e44dd01.png)

Quá trình ban đầu cài đặt nếu thành công, khi truy cập vào Domain ta sẽ nhận được giao diện sau

![](https://images.viblo.asia/20df6473-4e9f-40d5-a3a9-75903baf6c51.png)


![](https://images.viblo.asia/b06ec4e9-1e52-4e75-a398-6fd60788218e.png)

# Cấu hình thêm
Tiến hành trỏ Domain về IP. Ở đây mình sử dụng tên miền sẵn có trên GoDaddy
![](https://images.viblo.asia/502334c0-3839-47be-82dc-4bc98fd65c15.png)

Trỏ domain thành công, chúng ta sẽ gặp một thông báo lỗi như sau

![](https://images.viblo.asia/3c5cc3d6-d06a-4a39-b911-bcfb152b8ca3.png)

Để sửa lỗi này, chúng ta tiến hành trust domain trong /config/config.php

![](https://images.viblo.asia/aa45ca3d-2806-46da-bf88-0e77a3d9a746.png)

Cài đặt SSL sử dụng Let's Encrypt

![](https://images.viblo.asia/f16f61ad-c2b5-417a-bc38-d392add3f8cd.png)

# Lưu ý từ kinh nghiệm bản thân
*Phần này các bạn có thể cân nhắc để áp dụng hoặc không*

Chẳng là trong quá trình sử dụng NextCloud, bản thân mình nhận thấy tất cả các file sẽ được lưu trữ tập trung tại **/var/ww/nextcloud/data**. Điều này làm cho mình khá lo ngại tới rủi ro đầy ổ cứng. Với một máy chủ Linux, đầy ổ cứng tương đương với chết. Nên mình đã tìm hiểu cách giới hạn dung lượng cho thư mục này theo hướng dẫn sau.  https://stackoverflow.com/questions/8148715/how-to-set-limit-on-directory-size-in-linux .
Đã áp dụng và rất thành công
# Các plugin "hay ho"
Giống như mọi nền tảng mã nguồn mở khác. NextCloud cũng có vô số các puglin thú vị đi kèm mà chúng ta có thể trải nghiệm qua

* **OnlyOffice** : đây là plugin mình sẽ cài đặt đầu tiên trên NextCloud. Nó cho phép bạn viết, chỉnh sửa, chia sẻ tài liệu trong thời gian thực ngay trên chính Cloud của mình

```bash
cd /var/www/nextcloud/apps
git clone https://github.com/ONLYOFFICE/onlyoffice-nextcloud.git onlyoffice
chown -R www-data:www-data onlyoffice
```
![](https://images.viblo.asia/d08847d0-3b93-43b9-b748-e9d7a01f213b.png)

* **News**:  Đây là plugin cung cấp cho bạn các thông tin , xu hướng mới nhất trong cộng đồng công nghệ và mã nguồn mở

![](https://images.viblo.asia/13c159db-e439-45e9-856e-6570edc20d93.png)

* **Reader** : Plugin giúp bạn đọc file pdf dễ dàng trên NextCloud

* **Unsplash**: Đây là một plugin rất thú vị để thay đổi giao diện NextCloud nhàm chán ban đầu
* **Music** : Plugin này giúp bạn nghe nhạc ngay trên NextCloud của bạn 
# Tổng Kết
NextCloud nghe chừng cũng thú vị đấy chứ :grinning: