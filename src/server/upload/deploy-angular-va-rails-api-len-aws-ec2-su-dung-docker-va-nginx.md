Như tiêu đề bài viết, bài viết này mình sẽ hướng dẫn các bước để deploy đồng thời ứng dụng Angular và Rails API lên AWS EC2.
Nếu các bạn đã có cho mình ứng dụng angular và api chạy riêng nhưng chưa biết làm cách nào để deploy nó lên môi trường internet thì bài viết này có thể giúp ích cho bạn.

Bài viết mình sẽ demo một ứng dụng gọi api để tạo và view list sản phẩm đơn giản, mục đích nhằm mọi người có thể hiểu các bước cơ bản cũng như config để deploy ứng dụng của mình lên Aws ec2.

Trong bài viết sử dụng những công nghệ sau:
- Free hosting
- AWS EC2
- Angular 8
- Rails 5 API
- Docker and Docker compose
- NGINX

![](https://images.viblo.asia/81673aa5-996b-4e83-a00c-86e4c75972d5.png)

GIới thiệu vậy đủ rồi, cùng đi vào nội dung chính nào!

# Chuẩn bị

- 1 con server Aws ec2
Để có thể deploy lên ec2 thì nhất đinh các bạn phải có một con server ec2 nhé, mình thì đăng ký tài khoản free tier có thời gian 1 năm, cần có thẻ visa tối thiểu 1$ nhé (tốt nhất là kiếm cái visa nào ít tiền mà đăng ký cho dễ vọc =)) ) về khoản đăng ký thì có nhiều hướng dẫn trên mạng, các bạn có thể tham khảo [bài hướng dẫn này](https://cuongquach.com/aws-dang-ky-tai-khoan-aws-free-tier-mien-phi.html)

- 1 tên miền, ở bài viết này mình dùng tên miền free của freenom.
- SPA application (Angular 8).
- Api application (Rails 5 api).

Như vậy là đủ, bây giờ đến các bước cụ thể nhé.

# Aws ec2 instance

Như đã nói ở trên thì điều kiện cần là có một instance ubuntu của ec2.
Sau khi đã đăng ký tài khoản thành công thì các bạn vào https://console.aws.amazon.com/ec2/v2/home.

Chọn Launch instance và search từ khóa cho ubuntu và chọn ubuntu 16.04 nhé.

![](https://images.viblo.asia/ed63c1ec-0e95-48f7-bcca-b7e86a91e015.png)


*Lưu ý: Lúc cài cắm bạn cần tải cái file xxx.pem mà nó gen cho mình về, file này quan trọng nên bạn lưu giữ cẩn thận nhé không là không ssh vào server được đâu.* 

Các setup thì mình chọn default, Volumn thì default được aws suggest là 8GB nhưng các bạn có thể chọn tối đa 30GB (free tier limit)

Ở setting cho Security group lưu ý là config Http cần chọn thêm anywhere để có thể truy cập từ bất kỳ ip nào. Ssh cũng vậy.

![](https://images.viblo.asia/97336c3e-00aa-4984-9101-0b87041a9bf5.png)

Sau đó bấm xác nhận, chờ lúc nào instance state là running tức là chúng ta có thể tiến hành ssh vào server rồi đấy.
Ở màn quản lý instances, các bạn cần để ý ip của server để ssh vào nhé.

![](https://images.viblo.asia/49173594-68b2-4398-b487-d97d253da214.png)

Bây giờ trở về máy tính của bạn, trỏ cmd đến thư mục chứa file xxx.pem đã download lúc nãy.

```
chmod 400 xxx.pem
ssh -i xxx.pem ubuntu@<your server ip>
```

Như vậy là chúng ta đã có một con server ubuntu ngon lành với 30 GB ssd,  1GB ram (yes) free để test tẹt ga rồi =)).

Nếu chưa ssh được thì các bạn tham khảo thêm ở đây nhé [https://cuongquach.com/dang-nhap-ssh-vao-may-chu-ec2-instance-linux-aws.html](https://cuongquach.com/dang-nhap-ssh-vao-may-chu-ec2-instance-linux-aws.html)

# Đăng ký tên miền

Việc đăng ký này khá đơn giản, các bạn vào trang này [freenom](https://www.freenom.com/vi/index.html?lang=vi) tìm cho mình một tên miền và đăng ký thôi.
Tiếp theo hãy tạo thêm subdomain để sau này sẽ dùng cho việc call api.


![](https://images.viblo.asia/ef82bfa4-b406-4d48-820f-2f00c7b210cd.png)

Sau khi có tên miền thì các bạn cần tạo thêm một subdomain để dùng riêng cho call api
Chọn services -> My domains
Chọn manage domain -> Manage freenom DNS

Trỏ đến ip của ec2 như hình dưới, trong đó ip và dns amazon là địa chỉ tương ứng của instance ec2 của bạn. 

![](https://images.viblo.asia/4daf115d-d8af-4242-819d-e4fa1229ecb0.png)

Xong bước này thì mình cần có một domain chính là yourdomain.com/ và một subdomain api.yourdomain.com/
Chúng ta cần có 2 url như vậy nhé. Trong bài viết mình sẽ dùng tên miền dạng ```yourdomain.com``` để ví dụ.

2 url này mình sẽ sử dụng trong config web-server ở gần cuối bài viết. Bước tiếp theo sẽ là build app frontend.

# Build Angular app
Đầu tiên chúng ta cần build một SPA đơn giản, bài viết này mình sẽ dùng Angular 8.

```
ng new frontend
```

Mình sẽ tập trung vào đoạn config, còn phần tạo app cơ bản nên mình không đề cập ở đây nhé.

Bình thường chúng ta chạy app để call api thì cần url chính xác đến api cần gọi, vì url này của development và production khác nhau nên mình sẽ sử dụng biến môi trường để config

file environment.ts

```
export const environment = {
  production: false,
  backendURL: "http://localhost:3000/api/v1/"
};
```

file environment.prod.ts (file này sẽ dùng lúc chúng ta build on production)

```
export const environment = {
  production: true,
  backendURL: "https://api.yourdomain.com/api/v1/"
};
```

Ở đây chúng ta cần trỏ đúng url đến api của app khi đã deploy, ở đây các bạn thay bằng url api.<tên miền đã đăng ký>/api/v1/.

Và những thứ khác vẫn như bình thường, lúc sử dụng url backend thì các bạn cần import environment và dùng thôi:

``` typescript
import { environment } from '../../environments/environment';
BACKEND_URL = environment.backendURL;
```

Như vậy đến đây chúng ta đã có một app frontend để call api, các bạn có thể tham khảo source demo của mình ở đây: [https://github.com/at-uytran/frontend](https://github.com/at-uytran/frontend)

Tiếp theo sẽ là bước build Rails api nhé.

# Build Rails api app

``` shell
rails new api --d mysql --api
```

Config rack-cor để angular app có thể call api

Add các gem cần thiết cho server vào gemfile sau đó chạy bundle
``` ruby
gem 'rack-cors'
gem 'config'
```

```  shell
bundle install
rails g config:install
```

Sau đó các bạn tạo một file example để trên ec2 copy ra file mới dùng cho host đó luôn.
Config settings local để có thể setting tùy môi trường host.

File settings.local.example.yml

``` yaml
origins_sites: 
 - "https://yourdomain.com"
 - "http://yourdomain.com"
```

Ở file application.rb add thêm dòng sau

```ruby 
config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins Settings.origins_sites
        resource "*",
          headers: :any,
          expose: ["Authorization"],
          methods: %i[get post options put patch delete]
      end
    end
```

Các bạn có thể thêm settings cho môi trường production nhưng trong phạm vi bài viết này mình sẽ chỉ sử dụng gem config để Settings local tùy biến với từng host.

Và gen một api cho products:

``` shell
rails g model product name:string price:integer category_id:integer
rails g controller api/v1/products
```

``` ruby
def index
  render json {products: Product.all.as_json}
end

def create
  Product.create(product_params)
end

private
def product_params
  params.require(:product).permit(:name, :category_id, :price)
end
```

Chỉ cần config routes.rb nữa là chúng ta đã có api response. Tiếp đến chúng ta cần viết Dockerfile và docker-compose.yml để có thể đóng gói ứng dụng này.

Đến đây hẳn nhiều bạn có thể thắc mắc đóng gói ứng dụng như thế nào thì các bạn có thể đọc bài viết sau của mình về các bước cụ thể để dockerize Rails app nhé.

[https://viblo.asia/p/dockerize-rails-app-using-docker-and-docker-compose-924lJW765PM](https://viblo.asia/p/dockerize-rails-app-using-docker-and-docker-compose-924lJW765PM)

- Dockerfile

``` Dockerfile
FROM ruby:2.5.3

# set app name is api-product:dev

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV RAILS_ENV='development'
ENV RAKE_ENV='development'

COPY . /usr/src/app
RUN bundle install
EXPOSE 3000
```

- docker-compose.yml
``` yaml
version: "3"

services:
  db:
    image: "mysql:5.7"
    restart: unless-stopped
    ports:
      - "3307:3306"
    environment:
      MYSQL_PASSWORD: 'toor'
      MYSQL_ROOT_PASSWORD: 'toor'
    volumes:
      - /var/lib/mysql57-data:/var/lib/mysql
  api:
    image: api-product:dev
    command: bash -c "bundle install && rake db:create db:migrate && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/usr/src/app
    ports:
      - "3000:3000"
    depends_on:
    - db
```

# Config EC2
Ở app thì sơ sơ như vậy đã, lúc này là lúc cần config cho ec2 có thể điều hướng app frontend sẽ truy cập đến đâu, còn gọi api sẽ đến đâu.

Để config con ec2 này, sẽ cần cài cắm thêm các phần mềm sau:

-  Nginx cho phần web-server
-  Git để clone và pull code từ github
-  Docker và  Docker-compose để run api

## Cài đặt NGINX

```shell
sudo apt-get update
sudo apt-get install nginx
```

Kiểm tra status xem nginx đã chạy chưa:
```shell
sudo systemctl status nginx
```
Nếu status inactive thì hãy thử restart nó xem sao nhé:
```shell
sudo systemctl restart nginx
# hoặc start
sudo systemctl start nginx
```

## Cài đặt Docker & Docker compose
Các bạn có thể cài đặt theo hướng dẫn của trang digitalocean theo link sau:
[https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)

[https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04)

- Docker
```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y docker-ce
sudo systemctl start docker
```

- Docker compose
```shell
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

Sau khi cài cắm các thứ hãy kiểm tra xem docker đã start hay chưa nhé

```shell
sudo systemctl status docker
```

## Cài đặt git

```shellshell
sudo apt-get update
sudo apt-get install git-core
```

Trường hợp project các bạn public thì việc clone & pull chỉ đơn giản cần cài đặt git là được, nên nếu project git của các bạn cần đăng nhập mới clone được thì sẽ cần cài đặt thêm
Các bạn tham khảo [link này](https://askubuntu.com/questions/527551/how-to-access-a-git-repository-using-ssh) nhé.

Lúc nginx và docker đã running là lúc chúng ta có thể đến bước tiếp theo:

# Config NGINX

> Nginx là một ứng dụng web server mã nguồn mở. Nginx thường được sử dụng làm máy chủ proxy (reverse proxy), máy chủ cân bằng tải (load balancing), HTTP caching ...
> Nginx sử dụng kiến trúc đơn luồng và hướng sự kiện vì thế nên nó có khả năng xử lý đồng thời cao.

> Nginx cung cấp hiệu năng cao nhưng sử dụng ít tài nguyên để có thể hoạt động.
> Với nhiều ưu điểm nên Nginx đang là một trong hai ứng dụng web-server được sử dụng phổ biến nhất hiện nay.

Giới thiệu vậy đủ rồi, bây giờ là lúc config cho nginx để có thể điều hướng request đến frontend và backend.

## FRONT END

> Như bình thường, angular ở môi trường development chúng ta sẽ dùng angular-cli để run app dưới port 4200, việc chạy app để xem log khá rõ ràng, tuy vậy thì ở môi trường deployment thì chúng ta cần build app ra file html, css, js ... như là web tĩnh vậy, và tất cả sau khi build sẽ nằm gọn trong thư mục dist/.

> Việc chúng ta cần làm là build app ra dist, sau đó config cho nginx trỏ đến file index.html và bây giờ sẽ không run app bằng lệnh ng serve nữa mà là chạy bằng nginx.

Vì con ec2 của mình dùng free tier nên ram chỉ có 1GB (sad) nên mình không build app trên này, mình build sẵn sau đó chỉ việc lên đây pull về thôi =))

Cho lúc đầu thì clone app về.
```shell
git clone <github project link>
```

Sau này thì chỉ pull code mới về thôi:
```shell
git pull origin master
```

Các bạn có thể lấy đường dẫn chính xác đến frontend/dist này hoặc copy nguyên xi nó vào www folder
Mình thì copy nó vào www folder luôn.

```shell
cd /var/www
sudo mkdir frontend
cd
cd frontend
sudo cp -r ./dist /var/www/frontend/dist
```
Lúc này đường dẫn đến app sẽ là:
```shell
/var/www/frontend/dist/frontend/
```

Lúc này cần config cho nginx trỏ đến đường dẫn này:

NOTE: 
Các config cho nginx sẽ nằm trong file /etc/nginx/nginx.conf

Trong file này có include thư mục dành cho các config là ```/etc/nginx/conf.d```, vì vậy nếu thêm file config cho site chỉ cần thêm file <site_name>.conf rồi bỏ vào thư mục này là xong.

Tạo file config cho frontend  ```frontend.conf```

```shell
cd
cd /etc/nginx/conf.d
sudo nano frontend.conf
```

Dán đoạn config sau vào sau đó Ctrl + x để lưu lại.

```nginx
upstream frontend {
  server yourdomain.com;
}

server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/frontend/dist/frontend/;
    server_tokens off;
    index index.html index.htm;

    location / {
        # mặc định request đến yourdomain.com sẽ hiện thị file index.html này
        try_files $uri $uri/ /index.html;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Lúc này hãy thử restart nginx và thử vào web check xem app đã lên chưa, nếu ứng dụng load ok thì chúng ta đến bước config api.

## API
Tương tự như frontend nhưng khác với frontend là load nội dung tĩnh. Api sẽ run bằng docker-compose và chạy ở cổng 3000.


```shell
git clone <git repository link>
```

Lúc này cần tạo setting local cho project, các bạn tạo file mới copy nội dung file settings.local.example.yml và lưu tên là settings.local.yml nhé.
Đến đây cũng cần tạo file database cho app nữa.

Ở file database.yml các bạn thêm config để database mapping với container mysql mà dockerfile sẽ build.
Hãy để config giống như sau:

```yaml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: root
  password: toor
  socket: /var/run/mysqld/mysqld.sock
  host: db
  port: 3306
```

Sau đó build app bằng docker & docker-compose

```shell
cd api
docker build -t api-product:dev . 
docker-compose up -d
```

```shell
docker ps
```

```shell
docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                              NAMES
92c035186447        api-product:dev     "bash -c 'bundle ins…"   44 hours ago        Up 44 hours         0.0.0.0:3000->3000/tcp             api_api_1
85db26d65677        mysql:dev           "docker-entrypoint.s…"   44 hours ago        Up 44 hours         33060/tcp, 0.0.0.0:330->3306/tcp   api_db_1
```

Kiểm tra nếu api-product status là up tức là app đã chạy rồi đấy. Cuối cùng là config nginx cho api.

Vì api chạy cổng 3000 , chúng ta cần dùng nginx để reverse proxy trỏ đến 127.0.0.1:3000

```shell
cd
cd /etc/nginx/conf.d
sudo nano api.conf
```

Dán đoạn code sau:
```nginx
upstream api {
  server api.yourdomain.com;
}

server {
    listen 80;
    listen [::]:80;
    server_name api.yourdomain.com www.api.yourdomain.com;
    server_tokens off;

location / {
        # điều hướng truy cập từ api.yourdomain.com đến 127.0.0.1:3000
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Và bấm Ctrl + x lưu lại là xong.

Ok như vậy là đã xong toàn bộ các bước, restart nginx và tận hưởng thành quả thôi.
```shell
sudo systemctl restart nginx
```

Và đây là thành quả của mình http://uytran.cf . Chúc các bạn deploy thành công, nếu có đoạn nào thắc mắc hãy để lại comment nhé :)

Source demo:
- Api: https://github.com/at-uytran/api
- Frontend: https://github.com/at-uytran/frontend