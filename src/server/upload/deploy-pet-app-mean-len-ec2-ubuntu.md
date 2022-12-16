Xin chào các bạn, vậy là mình đã xong 2 bài viết về việc sử dụng MEAN stack để tạo PET app. Các bạn có thể xem lại 2 bài viết này ở link bên dưới :

Backend : https://viblo.asia/p/pet-project-use-mean-stack-part1-backend-WAyK8enoZxX

Frontend : https://viblo.asia/p/pet-project-use-mean-stack-part2-frontend-Ljy5Vp6yZra

Trong bài viết này, mình sẽ trình bày về cách deploy của riêng mình đã tìm hiểu và nhờ sự trợ giúp của một vài anh em trong công ty.

> :warning: **Do bài viết chỉ mang tính chất tham khảo, các bạn nên cân nhắc trước khi áp dụng vào dự án thực tế.**

> ### Nội dung
> 1. Cài đặt EC2 ubuntu
> 2. Cài đặt Angular trên EC2
> 3. Cài đặt Nodejs trên EC2
> 4. Cài đặt Mongdb trên EC2
> 5. Cài đặt Nginx trên EC25. 
> 6. Cài đặt PM2 trên EC2
> 7. Clone code
> 8. Config Angular và Nodejs trên Nginx
> 9. Hoàn thành và test

### 1. Cài đặt EC2 ubuntu
Trên mạng có rất nhiều bài viết về việc tạo và ssh đến EC2 ubuntu, các bạn có thể tham khảo tại [bài viết này](https://www.cloudbooklet.com/create-an-ec2-instance-on-aws-with-ubuntu-18-04/). 

Mình xin lưu ý chút:
Tại **Step 8: Create PEM key and launch Instance**, sau khi các bạn đã tải một file .pem về, hãy mở terminal trong thư mục chứa file .pem đó lên và gõ lệnh sau.
```php
chmod 400 /path_to_key/my_key.pem
```

file .pem này các bạn hiểu đơn giản như một cái key để mở khóa thôi. Và cuối cùng các bạn có thể connect đến EC2 thông qua terminal, sử dụng lệnh sau :
```php
ssh -i /path_to_key/my_key.pem user_name@public_dns_name
```
Hoặc có thể xem các bước thực hiện kết nối như sau :

> B1: Trên wev aws, vào phần **ec2**
> 
> B2: Tại menu bên trái, chọn **Instances**
> 
> B3: Chọn instance mà bạn vừa tạo
> 
> B4: Nhấn connect, sẽ hiển thị ra modal hướng dẫn các bạn cách kết nối 

![](https://images.viblo.asia/cd3adc1b-e731-4829-907e-a457407d03a0.png)


### 2. Cài đặt Angular trên EC2
Cần phải cài npm trước nhé :
```php
sudo apt-get update
sudo apt-get upgrade -y
sudo apt install npm
```
**Cài đặt Angular CLI**
```php
sudo npm install -g @angular/cli
```

### 3. Cài đặt Nodejs trên EC2
```php
sudo apt-get install -y nodejs
```
### 4. Cài đặt Mongdb trên EC2
```php
sudo apt install -y mongodb
```
Sau đó check xem đã chạy chưa 
```php
sudo systemctl status mongodb
```

Do mình sẽ kết nối trực tiếp server với db trên ec2 nên sẽ ko cần thêm cấu hình gì ở đây. Và cũng không cần tạo thêm user để connect. Nếu cần thì các bạn có tham khảo [bài viết này.](https://medium.com/@kn.maragatham09/mongodb-installation-on-aws-ec2-4140f6ea3a8e) hoặc [bài này](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04)

### 5. Cài đặt Nginx trên EC2
```php
sudo apt-get install -y nginx
```

### 6. Cài đặt PM2 trên EC2
```php
sudo npm install pm2@latest -g
```
[PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) là một trình quản lý các process dành cho các ứng dụng Nodejs. Có thể có nhiều tác dụng nhưng cái mình cần ở đây là PM2 nó có thể giữ cho các process của server còn sống. Do trên local thì các bạn luôn chạy npm start thì ở đây đã có pm2.

### 7. Clone code
Trước khi pull code về EC mình sẽ cần điều chỉnh lại một số thứ trong code trên **Local** (ngầm hiểu là trên máy tính) như sau.
Nhớ checkout sang nhánh deploy nhé :v:.

Trong thư mục của Frontend, file `/src/app/service/api.service.ts`, các bạn hãy thay url để call api thành như bên dưới. 
```php
baseUri:string = 'http://<_Public_DNS_>:443/api';
```

Các bạn nhớ thay <_Public_DNS_> thành của mình nhé. Do khi chọn Security Group mình đã chọn 2 cổng có thể public là 80 cho angular và 443 cho Nodejs nên cần set port = 443 như trên. 
Các bạn có thể tham khảo [bài viết sau](https://xluffy.github.io/post/vpc-architecture/) về việc set VPC.

Sau đó build thôi :
```php
ng build --prod
```
Sau khi build xong thì push lên github nhé.

Bây giờ hãy quay lại terminal đang ssh đến EC2 (mình gọi là Server), chúng ta sẽ clone code trên đó. Lưu ý nếu bạn clone code sử dụng ssh thì cần tạo và thêm ssh key vào repo đó nhé. Có thể tham khảo tại [bài viết này](https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html)

Các bạn thực hiện các bước sau:
> :warning: Lưu ý: các bạn cần clone code cả backend và frontend về folder /var/www/html
```
B1. Clone code vào thư mục /var/www/html/
B2. Checkout sang nhánh deploy
B3. Move thư mục dist từ trong folder pj ra thư mục /var/www/html/ (cái này để chút config trên nginx cho đường dẫn nó ngắn thôi ấy mà)
B4. Vào thư mục của Backend chạy : npm install
```

### 8. Config Angular và Nodejs trên Nginx
Các bạn nên cấu hình thử trên Local đến khi run ok trước. Mình xin bỏ qua bước này và đến luôn phần setup trên Serer. Sau 1 tuần mò mẫm, cuối cùng mình cũng đã config dc. Các bạn tạo 2 file mới (đặt tên tùy ý) để config FE và BE:

cd vào thư mục sau:
```php
cd /etc/nginx/sites-enabled/
```
Tạo 2 file :
```php
sudo touch /etc/nginx/sites-enabled/frontend.config
sudo touch /etc/nginx/sites-enabled/backend.config
```
Đây là nội dung của 2 file

*frontend.config*
```
server {
      listen 80; 
      server_name <_Public_DNS_>;
      listen [::]:80;
      root /var/www/html/dist/mean-stack-crud-app;
      server_tokens off;
      index index.html index.htm;
      
      location / {
           try_files $uri $uri/ /index.html;
      }
}
```

và *backend.config*
```php
server {
	listen 443;
    server_name <_Public_DNS_>;
	listen [::]:443 ;
	location /api {		
		proxy_pass http://localhost:4000/api;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
```

Các bạn cần tự cấu hình theo máy của bạn ở các mục `<_Public_DNS_>`, `root`. Mình mất nhiều thời gian ở phần này nhất. Nếu không dc thì có các bạn có thể comment bên dưới nhé. Do trong setting của angular mình set output 

### 9. Hoàn thành và test
Để chạy code Nodejs, các bạn sẽ chạy bằng pm2. Đầu tiên hãy cd vào trong thư mục của backend (giả định các bạn đã pull code của backend về rồi nhé):
```php
sudo pm2 start server.js --name <tên của server tùy bạn>
```
nếu như hình bên dưới thì ok. ở đây tên server của mình là mean-server.
![](https://images.viblo.asia/d63c63f8-b6c3-4634-92a7-a751edd89505.png)
Sau đó các bạn hãy restart lại nginx.
```php
sudo service nginx restart
```
Mỗi khi bạn thay đổi gì trong nginx thì nhớ hãy restart lại nhé.

Để chắc chắn, các bạn check lại hết các trạng thái của mongodb, nginx:
```php
sudo service nginx status
sudo service mongodb status
```

OK, vậy là đã xong, bây giờ chúng ta hãy cùng xem sản phẩm của mình nào. Vào đường dẫn: <_Public_DNS_> trên trình duyệt và test thôi.

Trên thực tế, mình nghĩ sẽ cần config IP, Authen,...cẩn thận hơn, nên mình xin nhắc lại bài viết này chỉ để các bạn có cái nhìn tổng quát về các mục cần làm để deploy một sản phẩm MEAN. Rất mong nhận được sự đóng góp ý kiến từ các bạn. Mình xin cảm ơn các bạn và những người anh em đã giúp mình hoàn thành bài viết này.

[Phần 1: PET project use MEAN Stack [Part1_Backend]](https://viblo.asia/p/pet-project-use-mean-stack-part1-backend-WAyK8enoZxX)

[Phần 2: PET project use MEAN Stack [Part2_Frontend]](https://viblo.asia/p/pet-project-use-mean-stack-part2-frontend-Ljy5Vp6yZra)