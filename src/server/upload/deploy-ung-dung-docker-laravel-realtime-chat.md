Chào mừng các bạn đã quay trở lại với [series học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình.  👋👋

Ở bài trước chúng ta đã cùng nhau [deploy ứng dụng NodeJS với Docker](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw), setup domain name, HTTPS cùng với đó là hoài niệm so sánh với cách deploy truyền thống ngày xưa để thấy được sự đơn giản và nhanh gọn hơn rất nhiều.

Bài này chúng ta sẽ tiếp tục cùng nhau thử deploy project Laravel Realtime Chat App bằng Docker xem thế nào nhé

Bắt đầu thôi nào :rocket::rocket:
# Tổng quan
Ở bài này ta sẽ deploy 1 app chat y hệt như của mình:https://realtime-chat.jamesisme.com. Dùng chính source code mà mình đang deploy.

![](https://images.viblo.asia/5666c1d2-639d-467e-8009-7cbaeb466da6.png)

Mình khuyến khích các bạn xem lại bài mình viết về [deploy app chat](https://viblo.asia/p/deploy-ung-dung-chat-realtime-laravel-vuejs-sockerio-redis-tren-ubuntu-63vKjboRK2R) này nhưng là phiên bản không có Docker (làm theo kiểu truyền thống). Từ đó ta có cái nhìn rõ nét nhất về sự tuyệt vời mà Docker mang lại ;)

App chat này có khá đầy đủ các component như bất kì 1 app Laravel nào mà thường đi làm các bạn sẽ gặp:
- Laravel, PHP (đương nhiên :D)
- Horizon + Worker
- Redis queue
- Laravel Echo, SocketIO
- Task Scheduling
- MySQL + Adminer (trình quản trị CSDL trên web)
- Nginx + HTTPS

Và tất cả các container trong bài này sẽ đều được chạy bằng non-root user nhé :muscle::muscle:
# Điều kiện tiên quyết
Vì bài này ta demo deploy trên server nên đương nhiên các bạn sẽ cần có server của riêng mình (VPS), nhớ là VPS chứ không phải Hosting thông thường nhé. (nên mua của các nhà cung cấp lớn như Google, AWS, Azure, Digital Ocean)

Cùng với đó ta sẽ setup HTTPS nên ta sẽ cần 1 tên miền (domain name), các bạn lên Godaddy mua 1 tên miền cùi cùi về để học tập nhé (~ 100K VND là cùng :D)
# Setup
## Clone source
Đầu tiên các bạn clone source code của mình [ở đây](https://github.com/maitrungduc1410/realtime-chatapp-laravelecho-socketio).

Sau đó các bạn checkout ra nhánh `docker-non-root` nhé:
```
git checkout docker-non-root
```
## Tổng quan
Và như thường lệ trước khi deploy lên server ta cần test trước để đảm bảo là code của chúng ta hoạt động ổn nhé ;)

Cùng điểm qua file `docker-compose.yml` xem ứng dụng của ta có những thành phần nào nhé:
- service `app`: ở đây ta sẽ cài PHP, chạy PHP-FPM, chạy Laravel Horizon, Task Scheduling, WorkerWorker
- service `webserver`: ở đây ta có 1 container Nginx, nhận request từ bên ngoài và chuyển vào service App, cùng với đó là phần kết nối realtime thì sẽ chuyển vào service Laravel echo server (bên dưới). Cấu hình của service này nằm ở `.dockerdocker/nginx`. Cách mình chạy Nginx với non-root user đã được mô tả chi tiết [ở đây](https://hub.docker.com/_/nginx)
- service `db`: chạy MySQL
- service `adminer`: trình quản trị CSDL trên web
- service `redis`: để dùng làm queue cho Laravel
- service `laravel_echo_server`: để broadcast realtime

Các service được join vào từng network cụ thể, để đảm bảo chúng chỉ giao tiếp với các thành phần thật sự cần thiết. Trừ service `app`, các service còn lại đều được setup `HEALTHCHECK` để định kì kiểm tra sức khoẻ nhé :D (service `app` khi mình tìm ra cách thích hợp mình sẽ update)

Xem qua Dockerfile chút nhé, như các bạn thấy ở đây mình đã không còn dùng tới `ENTRYPOINT`như ở bài [Dockerize ứng dụng chat Realtime](https://viblo.asia/p/dockerize-ung-dung-chat-realtime-voi-laravel-nginx-vuejs-laravel-echo-redis-socketio-bJzKmxgY59N), ở bài đó ta dùng user `root` nên đơn giản hơn (nhưng mình không khuyến khích chạy `root` cho production). Lí do mình phải bỏ `ENTRYPOINT` bởi vì container `app` này sẽ được chạy với non-root user, trong khi những setup ở ENTRYPOINT cần phải được chạy với user `root`. Mà ENTRYPOINT chỉ được chạy khi container khởi động, nhưng khi container khởi động thì user của mình đã chuyển về `non-root` mất rồi. Do vậy mình đã bỏ `ENTRYPOINT` và viết trực tiếp các setup cho Horizon, CronJob (Task scheduling), worker vào trong Dockerfile
## Test ở local
Tiếp theo ta sẽ tiến hành build image và test ở local xem nhé :D

Như thường lệ vì ta chạy với non-root user nên ta cần check xem user ở môi trường gốc của ta là gì:
```
id -u
--->> 501

id -g
--->> 20
```
Như các bạn thấy ở trên user ở môi trường gốc của mình có UserID:GroupID là `501:20`, do vậy ở Dockerfile ta cần sửa lại chút nhé. À chú ý rằng ở GroupID là 20 thì trùng với 1 group có sẵn trong container tên là `dialout`, mình đã nói ở [bài trước](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw#_chay-o-local-2) rồi nhé. Do vậy Dockerfile của chúng ta nom sẽ như sau:
```Dockerfile
...

#----------ADD USER------------
# RUN addgroup -g 1000 www
RUN adduser -D -u 501 www -G dialout

# Copy existing application directory permissions
COPY . .

RUN chown -R www:dialout .

...
```
> Tuỳ vào UID:GID ở môi trường gốc của các bạn là gì mà ta sửa lại cho đúng nhé ;)

Tương tự ở Dockerfile cho Laravel Echo Server ta cũng cần sửa lại phần user tương ứng nhé, các bạn mở `.docker/laravel-echo/Dockerfile`và sửa lại như sau nhé:
```Dockerfile
FROM node:12.13-alpine

LABEL maintainer="Mai Trung Duc (maitrungduc1410@gmail.com)"

WORKDIR /app

RUN npm install -g pm2 laravel-echo-server

COPY echo.json /app/echo.json
COPY laravel-echo-server.json /app/laravel-echo-server.json

RUN adduser -D -u 501 www -G dialout

RUN chown -R www:www /app

EXPOSE 6001

USER www

CMD ["pm2-runtime", "echo.json"]
```
> Ở trên mình EXPOSE port 6001 vì bên service `webserver` cần gọi tới service này

Sau đó ta cập nhật lại cả file `docker-compose.yml` cho các service khác chạy với user `501:20` nữa nhé:
```yaml
db:
    user: "501:20"
    
redis:
    user: "501:20"
```
Ơ, vậy còn 2 service `adminer` và `Webserver` thì sao? :thinking::thinking:

Với service `adminer` ta nhận thấy rằng không có map volume gì cả, tức không bị ảnh hưởng bởi user ở môi trường ngoài, do vậy ta dùng luôn user được cung cấp sẵn bởi image, tên là `adminer`

Với service `webserver` ta để ý rằng dù có map volume, nhưng ở đây mình đã chỉ định volume chỉ là `readonly` vì có `:ro` ở cuối, do vậy container này sẽ không ghi file ở những nơi được map volume, do vậy không ảnh hưởng tới môi trường ngoài vì thế ta cũng không cần thiết phải chạy với `UID:GID` bằng với môi trường ngoài (`501:20`) mà ta sử dụng luôn user `nginx` được cung cấp sẵn bởi image

Ổn rồi đó, ta tiến hành khởi động build và khởi động project luôn nhé:
```
docker-compose up -d --build
```
Chờ một lúc cho các container khởi động xong, ta mở trình duyệt, truy cập ở địa chỉ `localhost:4000` tạo 2 account và thử chat xem nhé. Phần này mình để các bạn tự sướng

> Note rằng Docker + Laravel trên MacOS có thể sẽ bị cảm giác lag, đây là vấn đề rất nhiều người đã gặp phải. Người ta lí giải là do Kernel bên MacOS khác với Linux, mà container ta chạy là Linux. Mình chưa tìm ra được lí do cụ thể cho việc này, nhưng khi deploy trên server thật (ubuntu) thì mọi thứ lại mượt mà ngay nhé ;)
## Note với Task Scheduling
Nếu các bạn để ý có thể thấy rằng hiện tại CronJob (Task Scheduling) chưa chạy, không thấy thông báo của Bot trong Chatroom.

Lí do là vì container của ta chạy bằng non-root user, nhưng master process của `crond` (thứ để chạy cronjob) thì cần được chạy bằng `root` user.

Do vậy ta phải tự tay khởi động `crond` bằng command:
```
docker-compose exec -u root app sh
crond -b
```
Ngay sau đó ta sẽ thấy Task Scheduling hoạt động bình thường. Các bạn yên tâm là Master process của Crond chạy bằng `root` nhưng Cronjob của chúng ta thì vẫn đảm bảo được chạy bằng `non-root` user nhé
# Deploy
Sau khi ta đã đảm bảo là source code của mình chạy ổn định, thì ta tiến hành deploy trên server nhé.

Đầu tiên các bạn cần SSH vào server của các bạn trước.

Sau đó ta sẽ chuyển tới một folder nào đó để làm việc nhé, ở đây mình chọn `var/www/html`:
```
cd /var/www/html
```
Sau đó ta tiến hành clone code về và checkout ra nhánh `docker-non-root`:
```
git clone https://github.com/maitrungduc1410/realtime-chatapp-laravelecho-socketio

cd realtime-chatapp-laravelecho-socketio

git checkout docker-non-root
```
Sau đó các bạn tạo file `.env`:
```
cp .env.example .env
```
Sau đó ta cần chạy `composer install` và `npm install`, ta sẽ dùng container tạm thời để chạy nhé.

Đầu tiên ta chạy `composer install` nhé:
```
docker run --rm -v $(pwd):/app -w /app composer install --ignore-platform-reqs --no-autoloader --no-dev --no-interaction --no-progress --no-suggest --no-scripts --prefer-dist

docker run --rm -v $(pwd):/app -w /app composer dump-autoload --classmap-authoritative --no-dev --optimize
```
Tiếp theo ta chạy `npm` và build production cho phần code VueJS nhé:
```
docker run --rm -v $(pwd):/app -w /app node npm install --production
docker run --rm -v $(pwd):/app -w /app node npm run prod
```
Vì các command trên thì container được chạy đều bằng `root` user nên files mà chúng tạo ra cũng được sở hữu bởi `root` vậy nên ta đổi quyền toàn bộ folder project lại cho bằng với user hiện tại nhé:
```
sudo chown -R $USER:$USER .
```
Ôn ổn rồi đó, ta chuẩn bị build image nhé. 

À trước khi build và chạy thì như  thường lệ vì ta chạy container với non-root user nên ta cần check trước xem user ở môi trường gốc có UserID và Groupd ID là gì nhé:
```
id -u
--->> 1000

id -g
--->> 1000
```
Như các bạn thấy ở trên UserID và GroupID của user môi trường ngoài của mình là `1000:1000`. Vậy nên ta không cần sửa gì nữa cả, source code của mình setup sẵn để user `1000:1000` có thể chạy được luôn :rocket::rocket:

Nếu `UID:GID` của các bạn là khác thì ta lại sửa lại như khi nãy ở local nhé.

Đến đây ta build image và chạy project lên thôi nhé:
```
docker-compose up -d --build
```
Sau khi project khởi động thì ta cần generate key và migrade database nhé:
```
docker-compose exec app php artisan key:generate

docker-compose exec app php artisan migrate --seed
```
Và nếu bây giờ các bạn quay lại trình duyệt truy cập ở địa chỉ `server_ip:4000` thì sẽ chưa được đâu vì như các bài deploy trước mình đã nói là VPS của ta mặc định ban đầu không cho phép traffic từ bên ngoài vào bất kì port nào mà ta phải mở bằng tay, chỉ định cụ thể port nào muốn mở. Có 2 cách để mở: 1 là làm trên trang quản trị nhà cung cấp nơi các bạn mua VPS (nên dùng cách này), 2 là mở bằng UFW (Firewall).

Ví dụ như mình dùng Azure thì nom sẽ như sau:

![](https://images.viblo.asia/2feccfeb-4398-4e9b-b4e1-6a4025341cd5.png)

Còn nếu các bạn dùng UFW thì chạy command sau nhé:
```
sudo ufw allow 4000
```
Ngay sau đó ta quay lại trình duyệt, truy cập ở địa chỉ `server_ip:4000` sẽ thấy kết quả ngay nhé:

![](https://images.viblo.asia/825761e1-28c6-481d-974d-024a07a3a307.png)

Các bạn thử tạo 2 account và có thể thấy rằng đến đây ta đã có thể chat realtime ngon nghẻ rồi nhé:

![](https://images.viblo.asia/37f67c26-9b4a-45e3-8842-17118f065051.png)

Và ta vẫn chú ý rằng hiện tại Task Scheduling chưa được chạy, khi nãy mình đã nói lí do vì sao khi ta chạy ở local, giờ ta cần chạy nó lên nhé:
```
docker-compose exec -u root app sh

crond -b
```
Sau đó quay trở lại trình duyệt, đợi 1 lát là ta sẽ thấy thông báo từ Bot được gửi đều đặn 1 phút 1 lần rồi nhé ;)
# HTTPS
Phần này thì làm y hệt như phần lấy HTTPS ở bài [deploy NodeJS](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw#_cach-lay-https-6), các bạn mở lại bài đó xem và làm theo là được nhé. Ý tưởng vẫn là chạy riêng 1 con Nginx ở môi trường ngoài đóng vai trò như 1 Security layer, HTTPS sẽ được lấy ở đây, cho tất cả các project phía sau (giả sử sau này chúng ta có nhiều project Docker chẳng hạn). Các bạn đừng nhầm con Nginx ở môi trường ngoài này với Nginx trong ở service `webserver` nhé.

Note: Sau khi các bạn lấy HTTPS thành công ta làm thêm 2 bước như sau:
- Sửa `APP_ENV` ở `.env` thành `production`, nếu không là bị lỗi CSS không load được và web trông xấu òm nhé :D
- Sửa tiếp `MIX_FRONTEND_PORT` ở `.env` thành `443`, đây là port để trình duyệt gọi tới Laravel echo server nhé. Sau đó thì các bạn cần build lại phần code VueJS:
```
docker run --rm -v $(pwd):/app -w /app node npm run prod
```
# So sánh với cách deploy truyền thống
Đến đây ta đã hoàn thành việc deploy ứng dụng Laravel chat realtime. :metal::metal:

Và nếu nhìn lại bài [Deploy app chat realtime trên Ubuntu](https://viblo.asia/p/deploy-ung-dung-chat-realtime-laravel-vuejs-sockerio-redis-tren-ubuntu-63vKjboRK2R), ở bài đó ta cũng deploy app y hệt như thế này, chỉ là làm theo kiểu truyền thống, không có Docker. Ta sẽ thấy rằng ở cách cũ ta phải cài mệt nghỉ, setup vỡ mặt thớt.

Còn với Docker, ta chỉ cần Dockerize 1 lần, local chạy ngon thì ra server làm nhoắng 1 cái là lên luôn. Không cần phải setup đi setup lại nữa 

# Kết bài
Qua bài này ta đã deploy thành công một project Laravel với đầy đủ các thành phần gần giống như khi đi làm thường gặp.

Ta thấy được rằng deploy với Docker đã giúp ta rút ngắt được rất rất nhiều thời gian :D, cùng với đó an toàn hơn nhiều so với cách truyền thống, vì với project Laravel này nếu làm theo cách truyền thống ta phải cài 1 lố vào trong môi trường gốc, và đây chính là cội nguồn của vô vàn vấn đề :joy::joy:

Cũng có nhiều người có hỏi mình là "nghe bảo Laravel + Docker" chạy chậm ở production. Nếu ai nói như vậy thì các bạn có thể show kết quả các bạn làm trong bài này cho họ, hoặc [demo của mình](https://realtime-chat.jamesisme.com/) cho họ thấy nhé ;)

Cám ơn các bạn đã theo dõi, hẹn gặp lại các bạn vào những bài sau^^