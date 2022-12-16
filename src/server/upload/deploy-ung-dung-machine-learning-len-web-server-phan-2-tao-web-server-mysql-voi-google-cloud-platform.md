## Tại sao lại là Google Cloud Platform
Đơn giản là vì Google Cloud Platform cho miễn phí 300\$ sử dụng trong vòng 1 năm. 

Nếu các bạn dư giả thì có thể thuê 1 server riêng với cấu hình khủng để chạy :D.

Việc đăng ký cần có thẻ Visa/Master Card nhé.
## Create instance
Việc tạo instance cũng khá đơn giản.
1. Vào console.cloud.google.com tạo 1 Project bất kì.
2. Bào **Compute Engine** -> **VM instances**.
3. Bấm  **Create instance** để tạo instance
4. Đối với mình thì mình chọn cấu hình như sau:
    * Name: MyVM
    * Region: chọn us-central1 (Iowa) cho rẻ.
    * 2 Cores với 2GB RAM (đối với mình thì nhu cầu vậy là đủ không cần hơn :D).
    * CPU platform: Intel Skylake or later
    * GPUs: Nếu có nhu cầu chạy mô hình khủng thì chọn nhưng giá khá là chát.
    * Boot disk: Ubuntu 18.04 LTS, 10GB SSD mới nhất mà chiến thôi.
    * Tích chọn Allow HTTP traffic, Allow HTTPS traffic
Tiếp theo bấm Create và đợi 1 lát google tạo cho bạn 1 instance mới.

5. Thêm SSH Keys
    * Oke sau khi tạo xong để dễ quản lý thì mình dùng 1 ứng dụng khác cho dễ upload file là **WinSCP** nên cần nhập SSH Keys. Cách thêm như sau:
    * Bấm vào tên instance vừa tạo như của mình là: **MyVM** -> **Edit** -> **SSH Keys** -> **Add item** -> Paste SSH Key vô -> **Save**
    * Dùng WinSCP đăng nhập thử xem được hay chưa.

## Create MySQL Server
Các bạn có thể install mysql luôn trên instance vừa tạo tuy nhiên thì Google không mở được port khác ngoài 2 port là 80 và 443 nên mình tạo MySQL trên SQL của Google Cloud cho tiện quản lý. Việc tạo Mysql cũng tương tự như việc tạo instance thôi:
1. **SQL** -> **Create instance** -> **Next** (mặc định là MySQL nên next luôn nếu bạn muốn dùng PostgreSQL thì tích chọn rồi hãy bấm).
2. Tiếp theo thì mình chọn **MySQL Second Generation** và đặt cấu hình như sau:
    * Instance ID: MySQL-Server
    * Root password: password
    * Region: us-central1 (nên đặt cùng region với instance tạo ở trên)

    -> **Create** đợi 1 lúc Google sẽ tạo cho bạn 1 instance MySQL của bạn.

    Ngoài ra thì bạn cũng có thể chọn 1 số option như version MySQL 5.6, dung lượng ổ cứng, CPU, RAM ở phần **Show configuration options**

3. Connections: ể kết nối tới MySQL server thì bạn cần thêm địa chỉ ip của mình và instance vừa tạo
    * Lấy public IP của mạng: www.checkip.org
    * Instance: **Compute Engine** -> **VM instances**, bạn sẽ thấy **External IP** của instance vừa mới tạo
    
    Tiếp theo vào instance MySQL vừa mới tạo chọn 
    
    **Connections** -> tích chọn **Pulicb IP** -> **Add network** -> Paste public IP vừa lấy về vào mục **Network** -> **Save**
## Install Web Server Apache2, PHP 7
### Install Apache2
Đăng nhập **WinSCP** và sử dụng **PuTTY** chạy những lệnh sau:
> sudo apt update
> 
> sudo apt install apache2
> 
> sudo ufw allow in "Apache Full"
> 
Vào chrome check đã được hay chưa: **External_IP**. Nếu hiện như hình sau là oke rồi :D

![](https://images.viblo.asia/c5739ec0-d747-4646-9b51-f0735304a352.png)


Install **curl**
> sudo apt install curl
### Install PHP7
> sudo apt install php libapache2-mod-php php-mysql
> sudo apt-get install php-curl
> sudo a2enmod rewrite # use .htaccess
Tiếp theo
> sudo nano /etc/apache2/mods-enabled/dir.conf
Bạn sẽ thấy như sau
```
<IfModule mod_dir.c>
    DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
</IfModule>
```
Sửa thành
```
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```
**CTRL+X** -> **Y** -> Enter
> sudo systemctl restart apache2
> 
> sudo chmod 777 /var/www/html

Done! :D

Nguồn: [Digitalocean](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04)