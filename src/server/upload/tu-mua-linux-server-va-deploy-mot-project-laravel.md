<div align="center"> <h3>Mở đầu</h3> </div>

Đợt trước mình có viết một bài về việc [Deploy một docker app](https://viblo.asia/p/deploy-docker-app-len-vps-hosting-YWOZrdXN5Q0) lên VPS/Cloud hosting. Nay mình xin phép chia sẽ việc deploy một project PHP/Laravel theo cách thông thường không sử dụng Docker nhé

   ![](https://i.imgur.com/NMPBo9W.gif)

<div align="center"> <h3>Digitalocean</h3> </div> 
Một nhà cung cấp cloud server mà mình ưu thích hơn cả. Nói ưa thích hơn cả thì cũng chả đúng lắm. Vì mình có dùng dịch vụ của bên nào khác ngoài DO bao giờ đâu. <br/>

Nhớ lần đầu dùng [Digitalocean](https://m.do.co/c/8e91bc167cbc) cảm giác nó xịn dã man. Nhất là khi bạn từng phải ngồi nén source code rồi upload lên share host thông thường. Hay dùng filezilla rồi ngồi đợi mắc mệt...

![](https://i.imgur.com/Km4WijT.gif?1)

Thì với cloud server hay [Digitalocean](https://m.do.co/c/8e91bc167cbc) nói riêng tất các những gì mình làm là tạo một server theo kiểu `one click app` đã được cài sẵn nhiều thứ, tùy stack mình chọn. Và rồi ssh vào chạy git clone, git pull rồi settup thêm một tí là được. Nhất là khi xài docker thì còn thuận tiện hơn nhiều nữa (yaoming) <br/>
Và cái cảm giác mình kiểm soát hoàn toàn một cái server như thể nó là cái laptop của mình ở nhà cũng rất an tâm.
Với cả nếu project của bạn tích hợp với một dịch vụ `CI/CD` nào đó có hỗ trợ auto deploy nữa thì từ viết code, test đến deploy cảm giác rất nhẹ nhàng và chuyên nghiệp...

<div align="center"> <h3> Mua server</h3> </div>

* Tạo một tài khoản
Việc đầu tiên là bạn cần phải tạo một tài khoản của [Digitalocean](https://m.do.co/c/8e91bc167cbc) nếu bạn chưa có. Sau đó bắt buộc bạn phải xác nhận tài khoản bằng cách nhập thông tin thẻ Visa hoặc nếu xác minh bằng Paypal thì bạn phải chuyển vào tài khoản [Digitalocean](https://m.do.co/c/8e91bc167cbc) của mình 5usd. Sau khi hoàn tất bước xác minh tài khoản. Ta hãy bắt đầu tạo một "droplet" để nghịch phá:
Trên góc màn hình có một nút `Create` mà xanh lá. Bạn click vào đó và chọn Droplets như hình dưới đây:

![](https://images.viblo.asia/443f3a6f-0058-4e3e-b021-ea504a03af00.png)

Với mục đích như ở tiêu đề bài viết. Chúng ta sẽ settup một project laravel. Vậy nên ta hãy chọn tạo mới một droplet có cài sẵn `LEMP stack` nhé. ( Đã cài sẵn Linux, Nginx , MySQL và PHP) như hình dưới đây:
![](https://images.viblo.asia/b78afd86-12f5-4def-8622-4afe7e4f4d09.png)

Bạn click vào `LEMP on 18.04` để tạo một droplet có sẵn `LEMP stack on Ubuntu 18.4` như vừa nói.
Ngoài ra bạn cũng có thể thấy rừng có rất nhiều one click app cài sẵn khách nhau. Như Rails, Docker, Wordpress...vv..
Tiếp theo, kéo xuống và xem qua một số tùy chọn cần thiết.
* Choose a size - tùy chọn cấu hình và mức giá
Đây là phần mà chúng ta sẽ lực chọn cấu hình, cũng như mức giá cho server mới cũng chúng ta. Có rất nhiều lựa chọn cũng như giá thành khác nhau. Bạn có thể chọn tùy mục đinh sử dụng cũng như khả năng chi trả. Ngoải a chúng ta vẫn có thể resize lại cấu hình nếu trường hợp server không còn đáp ứng đủ nhu cầu cấu hình - khi lượng resuet ngày càng nhiều lên chẳng hạn

![](https://images.viblo.asia/039b1a2e-a771-4206-93c0-88367c78304a.png)
* Choose a datacenter region
Phần này nếu chủ yếu traffic cũng chúng ta đến từ Việt Name thì nên chọn máy chủ đặt ở Singapore

![](https://images.viblo.asia/adef1711-4c94-4445-b771-f265bd8794e0.png)
* Add your SSH keys
Thêm `ssh public key` của bạn vào đây để còn ssh vào server mới nhé. Nếu chưa biết cách sinh `ssh-key` bạn có thể xem qua ở [đây](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) 
* Finalize and create
Rồi, bước cuối cùng. Đặt lại tên cho droplet nếu muốn - nên đặt lại cho gọn nhá ^^ Và rồi nhấn nút create là chúng ta đã có một em server để phá phách cho sướng

![](https://images.viblo.asia/6f73c436-3adc-48de-9b42-c8b83305e3dd.png)

<div align="center"> <h3>Tạo user và phân quyền</h3> </div>

Sau khi qua các bước trên bạn sẽ có được một droplet như sau
![](https://images.viblo.asia/34a523f2-e82b-49b7-b741-7041fa88c545.png)

Chắc chắn rằng bạn đã add ssh-public key của bạn ở bước trên nhé. Ta ssh vào server và settup một chút:

```
ssh root@104.248.155.74 // Thay bằng IP server của bạn. Yên tâm sau khi viết bài này mình sẽ xóa cái server này đi =))
```

Sau khi đã ssh vào server. Ta hãy tạo thêm user bằng các lệnh như dưới đây ( combo này mình được anh [DoanhPV](https://viblo.asia/u/) truyền lại cho mình `qua chatwork`(yaoming)). Cũng là người khuyến khích mình tự settup cho biết (dance)

```
adduser username
usermod -aG sudo username
sudo useradd -d /home/username -m username
sudo usermod -s /bin/bash username
```

Bạn sẽ nhận được mốt số câu hỏi nhỏ như dưới đây
![](https://images.viblo.asia/e3404f80-ff9f-4b31-a15f-4d39bacf6c30.png)

Sau đó bạn đã có thể sang sử dụng dưới tài khoản user mới thay vì tiếp tục tuy cập dưới quyền root, và cũng là để chắc là tạo user thành công
```
su - username
```
<div align="center"> <h3>Settup SSH key</h3> </div>

Sau khi đã tạo tài khoản hành công và chuyển sang dưới quyền user mới này. Ta hãy settup qua ssh một chút để từ sau có thể ssh luôn vào server bừng user vừa tạo
```
mkdir .ssh
cd .ssh/
touch authorized_keys
vim authorized_keys // Paste public key của bạn vào file này rồi lưu lại
$ chmod 644 authorized_keys
$ chmod 700 ~/.ssh
```

Rồi, từ nay chúng ta sẽ ssh vào server bằng user vưà tạo

```
ssh username@104.248.155.74 // Thay bằng IP server của bạn. Nhắc lại, sau khi viết bài này mình sẽ xóa cái server này đi =))
```

<div align="center"> <h3>Clone project</h3> </div> 

Mình sẽ clone project vào `/var/www/` nhé. Phần này chỉ lưu ý, nếu project của bạn là private project trên github. Thì thêm ssh-public key bạn vừa sinh ở trên vào tài khoản github. Hoặc chỉ thêm vào phần deploy key của project cho an toàn hơn chút xíu. Sau khi clone project thì chúng ta chạy composer install, chmod storage, php artisan storage:link.. và các thứ cần thiết như dưới local thôi.  
Trong quá trình chạy composer install nếu thiếu extension nào thì bạn cài thêm nhé. Và nếu cài đủ extension rồi mà nó vẫn báo thì có thể bạn vẫn thiết extension `php7.2-xml` đấy:

```
sudo apt-get install php7.2-xml
sudo apt-get install php-mbstring
```

<div align="center"> <h3>Cấu hình nginx</h3> </div> 

Bạn cd vào `cd /etc/nginx/conf.d/` và tạo một file tên gì cũng được với đuôi là `.conf` 
```
sudo touch your_site.conf
vim your_site.conf // paste nội dung như bên dưới vào
```
với nội dung như dưới đây. Bạn nhớ thay đổi các thông tin tương ứng nhé:

```json
server {
        listen 80;
        root /var/www/your_project_name/public; # Thay bằng đường đến project của bạn
        index index.php index.html index.htm index.nginx-debian.html;
        server_name your_domain.com; # Thay bằng domain hoặc IP của droplet

        location / {
                #try_files $uri $uri/ =404;
                try_files $uri $uri/ /index.php$is_args$args;
        }

        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        }

        location ~ /\.ht {
                deny all;
        }
}

```

Sau đó kiểm tra xem file cấu hình vừa xong đã hợp lệ chưa:
```
sudo nginx -t
```
Nếu success như dưới đây

![](https://images.viblo.asia/bafae6fa-c7e8-4fd3-af00-f4eea6938234.png)

thì reload lại nginx để cập nhật config
```
sudo service nginx reload
sudo service nginx restart
```

<div align="center"> <h3> Tạo database</h3> </div> 

Nếu bạn tạo droplet bằng one click app như trên. Nên bạn sẽ được cài sẵn mysql. Mỗi lần bạn ssh vào server, nếu để ý sẽ thấy thông báo về các thông tin cần thiết. Cụ thể ở đây bạn có thể thấy thông tin đương dẫn file chứ password mysql root `/root/.digitalocean_password`:

![](https://images.viblo.asia/8a5a97b6-9653-4121-a149-9ab0cb0fa315.png)

Bạn vào đường dẫn trên và cat file ấy ra để xem thông tin  password root mysql nhé. Thực tế thì mình toàn 
`sudo mysql` cho khỏe. Đỡ mắc công tìm nhập password (yaoming)

Dưới đây là combo tạo DB
```
CREATE DATABASE dbname; // tạo database mới
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'new_password'; // Tạo một mysql user mới
GRANT ALL ON dbname.* TO 'new_user'@'localhost'; // Phân quyền user vừa tạo cho DB
FLUSH PRIVILEGES; // Reload
```
Sau đó cập nhật lại phần thông tin connect DB trong file .env với thông tin tương ứng mà bạn vừa tạo nữa là được. Đến đây cũng xong hết rồi. Nếu mọi việc suôn sẻ thì bạn đã có thể truy cập đến trang của mình thông qua IP của droplet vừa tạo...

![](https://i.imgur.com/xcHofKJ.gif)

<div align="center"> <h3>Trỏ domain về Digitalocean</h3> </div>

Mình mua domain của namecheap nên mình sẽ hướng dẫn trỏ domain của namecheap nhé. Truy cập vào trang quản trị của namecheap -> click vào nút `Manage` của domain tương ứng, để đi đên trang settup cho domain đó.
Đổi phần `Nameservers` và đổi thành `Custom DNS` rồi điền 3 DNS của Digitalocean dưới đây rồi lưu lại:
1. ns1.digitalocean.com
2. ns2.digitalocean.com
3. ns3.digitalocean.com

Hết phần settup phía namecheap, ta chuyển qua settup phía Digitalocean. Truy cập vào trang quản trị của DO. Bạn có thể thấy một danh sách các droplet của mình. Click vào nút như hình dưới (nút `...` tương ứng của droplet mà bạn muốn trỏ domain đến ý)

![](https://images.viblo.asia/97528394-5905-4a65-89b1-f9f2112b5a49.png)

Sau đó click vào nút `Add Domain` bạn sẽ được chuyến đến trang add domain. Sau đó điền domain của bạn vào đấy nữa là xong
![](https://images.viblo.asia/92192114-7a6e-4a01-83d5-b51e196903de.png)

Trường hợp bạn mua domain của một nhà cung cấp từ Việt Name chẳng hạn. Thì việc trỏ cũng không có gì khác biệt. Bạn vào trang quản trị domain và trỏ nó sang IP server của bạn. Xong cũng sang phía DO thêm domain như bên trên nhé.

<div align="center"> <h3>Settup ssl </h3> </div> 

Đến đây là xong rồi, Bạn đã có thể truy cập đến trang của mình qua domain và mọi thứ ngon lành rồi, chỉ là chưa có https nữa thôi. Chúng ta settup nốt ssl với cerbot nhé.
Cài certbot trước đã
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt update
sudo apt install python-certbot-nginx
```

Kiểm tra xem nginx của bạn có bị chặn bới `ufw firewal` không bằng lệnh
```
sudo ufw status
```
![](https://images.viblo.asia/eee8459c-e01d-4fc9-bc53-224f48cf8917.png)

Nếu không có Nginx trong kết quả như hình trên. Chúng ta phải cho phép `HTTPS traffic` bằng lệnh:
```
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```
Check lại nào
```
sudo ufw status
```
![](https://images.viblo.asia/1d405c80-1a65-4ae2-93c1-32e47faff2e1.png)

Sang bước tiếp theo, gửi yêu cầu verify domain
```
sudo certbot --nginx -d your_domain.com // dangminhtruong.com
```
Lần đầu chạy sẽ mất xíu thời gian để verify, nếu verify thành công bạn phải trả lời một số thông tin cần thiết. Điền hết các câu hỏi hiện ra ở terminal nữa là được. Còn lại việc tự động cập nhật cấu hình nginx và reload cerbot sẽ tự động là cho chúng ta. Ngoài ra, bạn thêm lệnh sau vào cronjob để tự động `renew ssl` sau khoảng thời gian nhất định kẻo nó hết hạn nhé
```
certbot renew --dry-run
```
<div align="center"> <h3>Hoàn thành</h3> </div> 

Ôi bài dài quá. Mình định hướng dẫn thêm việc tích hợp thêm `rocketeer` vào dự án nữa, để đỡ mỗi lần deploy lại phải ssh vào server mà chỉ cần chạy deploy trên máy mình thôi. Nhưng nhắm chừng dài quá, để hẹn lần sau vậy...

Vậy là vừa xong mình mạn phép hướng dẫn settup server và deploy một project Laravel lên cloud server của [Digitalocean](https://m.do.co/c/8e91bc167cbc). Từ mua server, trỏ doamain đến settupp ssl. Mình hướng dẫn nhắm đến các bạn settup lần đầu, hy vọng có ích chút cho bạn nào cần đến. Cám ơn bạn nhiều vì đã dành thời gian xem bài viết của mình....

![](https://i.imgur.com/RP21KqO.gif?1)