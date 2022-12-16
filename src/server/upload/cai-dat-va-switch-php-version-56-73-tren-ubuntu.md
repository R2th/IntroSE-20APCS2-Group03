Chào mọi người :grin:,  chắc hẳn là 1 developer php thì các bạn sẽ làm nhiều project tại 1 thời điểm và với nhiều php version khác nhau đúng không? Nhận thấy việc cài đặt và switch php version cần đưa vào 1 guide nào đó để sau mình có thể sử dụng lại 1 cách nhanh chóng, hôm này mình sẽ viết về chủ đề cài đặt và switch multi php version trên ubuntu để ae có thể lưu lại và sử dụng nhé.

Nào mình cùng bắt đầu thôi.

## 1. Install php 5.6 & 7.3
Đầu tiên mình sẽ cài đặt các phiên bản PHP trên ubuntu. 

Mở terminal của các bạn lên và chạy các lệnh:
```
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update

sudo apt-get install -y php5.6
sudo apt-get install -y php7.3

echo "* Installing PHP 5.6 extensions..."
sudo apt-get install -y php5.6-common php5.6-cli php5.6-curl php5.6-mcrypt php5.6-soap php5.6-bz2 php5.6-gd php5.6-mysql php5.6-sqlite3 php5.6-json php5.6-opcache php5.6-xml php5.6-mbstring php5.6-readline php5.6-xmlrpc php5.6-zip

echo "* Installing PHP 7.3 extensions..."
sudo apt-get install -y php7.3-common php7.3-cli php7.3-curl php7.3-mcrypt php7.3-soap php7.3-bz2 php7.3-gd php7.3-mysql php7.3-sqlite3 php7.3-json php7.3-opcache php7.3-xml php7.3-mbstring php7.3-readline php7.3-xmlrpc php7.3-zip
```

Như vậy đã cài đặt xong 2 phiên bản php 5.6 và 7.3 cùng các extentions trên 2 phiên bản.

**Note:** Ở đây mình cài đặt php cho apache nhé.

Tiếp theo sẽ đến phần switch php verssion.
## 2. Command switch php version 5.6 => 7.3
Để switch version các bạn cần dismod php version hiện tại và enmod php version mong muốn lên và restart lại apache:

```
sudo a2dismod php5.6
sudo a2enmod php7.3
sudo service apache2 restart

sudo update-alternatives --set php /usr/bin/php7.3
sudo update-alternatives --set phpize /usr/bin/phpize7.3
sudo update-alternatives --set php-config /usr/bin/php-config7.3
```

## 3. Command switch PHP version 7.3 => 5.6
Tương tự đối với php 5.6 => 7.3 các bạn sử dụng các lệnh:

```
sudo a2dismod php7.3
sudo a2enmod php5.6
sudo service apache2 restart

sudo update-alternatives --set php /usr/bin/php5.6
sudo update-alternatives --set phpize /usr/bin/phpize5.6
sudo update-alternatives --set php-config /usr/bin/php-config5.6
```

## 4. Tạo file shell script để switch version
Ngoài ra các bạn có thể tạo 1 file shell script để swith version cho tiện:

- Tạo file `swith_php.sh`:
```
#!/bin/sh

if [ "$1" = "73" ]
then
        echo "Swith to php 7.3"
        sudo a2dismod php5.6
        sudo a2enmod php7.3
        sudo service apache2 restart

        sudo update-alternatives --set php /usr/bin/php7.3
        sudo update-alternatives --set phpize /usr/bin/phpize7.3
        sudo update-alternatives --set php-config /usr/bin/php-config7.3
        echo "* Switch to PHP 7.3 complete."
else
        echo "Swith to php 5.6"
        sudo a2dismod php7.3
        sudo a2enmod php5.6
        sudo service apache2 restart

        sudo update-alternatives --set php /usr/bin/php5.6
        sudo update-alternatives --set phpize /usr/bin/phpize5.6
        sudo update-alternatives --set php-config /usr/bin/php-config5.6
        echo "* Switch to PHP 5.6 complete."
fi
```

- Thêm quyền thực thi cho file shell script:

```
chmod +x switch_php.sh
```

- Chuyển đổi PHP version bằng command:

```
//Chuyển đổi sang PHP 7.3
./switch_php.sh 73

//Chuyển đổi sang PHP 5.6
./switch_php.sh 56
```

**Note: Các bạn có thể làm tương tự với các php version khác nhé**

### Tham khảo
1. [https://www.tecmint.com/install-different-php-versions-in-ubuntu/](https://www.tecmint.com/install-different-php-versions-in-ubuntu/)
2. [https://vitux.com/how-to-install-php5-and-php7-on-ubuntu-18-04-lts/](https://vitux.com/how-to-install-php5-and-php7-on-ubuntu-18-04-lts/)

Cảm ơn mọi người đã theo dõi bài viết của mình, hẹn mọi người bài viết tiếp theo nhé :D