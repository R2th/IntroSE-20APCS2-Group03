Chào mừng các bạn đã quay trở lại với series [Học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình 👋👋

Ở bài trước chúng ta đã cùng nhau tìm hiểu về [cách chạy container với non-root user](https://viblo.asia/p/tai-sao-nen-chay-ung-dung-container-voi-non-root-user-jvEla3VNKkw). Từ bài này chúng ta sẽ bắt đầu deploy các ứng dụng Docker chạy trên server thật, cuối cùng là dùng CICD để auto deploy và chúng ta kết thúc series này nhé :)

Ở bài này chúng ta sẽ cùng nhau deploy ứng dụng Docker, NodeJS, MongoDB, Redis trên server thật, cùng với đó là setup domain, HTTPS nhé. Cuối bài ta sẽ cùng so sánh với cách deploy kiểu truyền thống ngày xưa khi không có Docker sẽ như thế nào nhé ;)

# Điều kiện tiên quyết
> Nghe vẫn nom như đám học sinh cấp 3 :rofl::rofl:

Vì bài này ta deploy ở trên server thật nên đương nhiên điều kiện cần có là các bạn có 1 VPS của riêng mình, nhớ là VPS chứ không phải Hosting nhé. Nên chọn Ubuntu nhé các bạn (Centos, Redhat cũng không sao).

# Setup
Đầu tiên các bạn clone source code của mình [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh `master`). Bài này chúng ta chỉ quan tâm tới folder `deploy-docker-node` nhé.

Tổng quan project:
- Về chức năng thì project này vẫn giống các project NodeJS ở các bài trước gồm có: login, logout, thêm sản phẩm, lưu user session,...
- Tất cả các container đều được chạy với non-root user

Tiếp theo các bạn copy folder `deploy-docker-node` này ra 1 nơi riêng biệt nào đó để lát nữa ta push lên Repository nhé

Sau đó các bạn tạo 1 repository trên Gitlab với tên là `deploy-docker-node` để tẹo nữa chạy ở local ngon nghẻ xong ta sẽ push code lên repository, rồi lên server pull về và build image nhé.
# Chạy ở local
Như thường lệ, việc đầu tiên ta cần làm là build Docker image và chạy thử ở local trước để đảm bảo mọi thứ vẫn ổn định trước khi ta lên server nhé.

Bởi vì tất cả các container của ta đều chạy với non-root user nên trước khi chạy ta cần xác định UserID + Group ID của user ở môi trường gốc của ta là gì nhé (nếu các bạn không hiểu tại sạo lại làm thế thì đọc lại bài [Chạy ứng dụng container bằng non-root user](https://viblo.asia/p/tai-sao-nen-chay-ung-dung-container-voi-non-root-user-jvEla3VNKkw) của mình nhé).

Ở môi trường gốc các bạn chạy command sau:
```
id -u
----> 501

id -g
----> 20
```
 Như các bạn thấy User ID ở môi trường gốc của mình là `501` và Group ID là `20`. 

Chú ý quan trọng rằng: nếu UserID + Group ID của các bạn là `1000:1000` thì ở Dockerfile bên dưới có chút khác, vì trùng với user `node` trong container NodeJS ở [bài trước](https://viblo.asia/p/tai-sao-nen-chay-ung-dung-container-voi-non-root-user-jvEla3VNKkw) mình đã nói rất kĩ rồi nhé.

Sau đó các bạn mở `Dockerfile` và ta cùng sửa lại phần user như sau nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .


# ----- Nếu UID:GID là 1000:1000
# USER node
# RUN chown -R node:node /app
# ----- Nếu không thì
RUN addgroup -g 20 appgroup
RUN adduser -D -u 501 appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser
# ---------------------------------------


CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên `UID:GID` của mình là `501:20` nhé.

Sau đó ta tiến hành build image nhé:
```
docker build -t learning-docker:deploy-node .
```
BÙMMMM :boom::boom:, Lỗi @@:

![](https://images.viblo.asia/766f635e-240c-4ca5-977f-04e2b1837b84.png)

Lỗi báo `group với ID là 20` được được sử dụng mất rồi. Khả năng là Group mà ta đang tạo với ID 20 đã bị trùng với 1 group nào đó có sẵn trong container.

Các bạn sửa lại Dockerfile thêm vào cho mình 1 dòng sau để liệt kê ra các group có sẵn trong container nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

# ----- Nếu UID:GID là 1000:1000
# USER node
# RUN chown -R node:node /app
# ----- Nếu không thì
RUN cat /etc/group # +++++++++++++++++ THÊM VÀO DÒNG NÀY
RUN addgroup -g 20 appgroup
RUN adduser -D -u 501 appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser
# ---------------------------------------

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Sau đó ta tiến hành build lại image:
```
docker build -t learning-docker:deploy-node .
```
Xem ở cửa sổ Terminal các bạn sẽ thấy in ra như sau:
```
....

dialout:x:20:root ->>>>>>>>>>>>>> Chú ý dòng này

....
```
Ồ vậy là GroupID 20 đã bị trùng với 1 group tên là `dialout` trong container, vậy thì ở Dockerfile thay vì tạo group mới ta đơn giản là dùng luôn group này, các bạn sửa lại Dockerfile như sau nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

RUN adduser -D -u 501 appuser -G dialout

RUN chown -R appuser:dialout /app

USER appuser

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Sau đó ta tiến hành build lại image và sẽ không thấy bị lỗi nữa nhé:
```
docker build -t learning-docker:deploy-node .
```
Tiếp theo ta cập nhật lại file `docker-compose.yml` để chạy `MongoDB` và `Redis` với cùng `UID:GID` như ở môi trường gốc nhé:
```yaml
...
db:
    image: mongo
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    user: "501:20"
    
redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
    user: "501:20"
```
Cuối cùng là ta tiến hành chạy project lên nhé:
```
docker-compose up -d
```
Sau đó ta mở trình duyệt ở `localhost:3000` thấy như sau là cuộc đời tươi sáng rồi nhé :grinning::grinning::

![](https://images.viblo.asia/18abae24-a190-4fa2-a703-e0fa5d358480.png)

Các bạn thử tạo account, login và thêm mới thử vài sản phẩm xem sao nhé.

**Note cho bạn nào đang dùng Windows**: các bạn xem lại phần chú ý lúc mount volume cho MongoDB mình đã nói ở bài [Dockerize ứng dụng NodeJS, Mongo](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3#_chay-project-11) rồi nhé

Vậy là đã ổn rồi đó, các bạn ta tiến hành push code lên Gitlab repository nhé:
```
git init
git add .
git commit -m "first commit"
git remote add origin https://gitlab.com/maitrungduc1410/deploy-docker-node.git
git push -u origin master
```
Note: Ở trên các bạn thay tên account của các bạn vào nhé (như của mình là `maitrungduc1410`)

Âu cây tiếp theo ta sẽ bước tới công đoạn deploy trên server nhé :)
# Deploy
Đầu tiên các bạn nhớ SSH vào server nhé.

Điểm hay ho và cũng là thứ tuyệt vời nhất khi làm việc với ứng dụng Docker đó là việc ít (hay thậm chí là không) bị ảnh hưởng bởi môi trường ngoài, và 1 khi ta đã Dockerize thành công ở local thì lên server deploy sẽ rất đơn giản. Thứ ta cần chỉ là `Docker` và `Docker Compose` (tất nhiên :joy::joy:).

Bắt đầu thôi nào :D

Đầu tiên các bạn kiểm tra xem trên server đã có Docker và Docker compose chưa nhé:
```
docker --version
docker-compose --version
```
Nếu chưa có các bạn cài đặt bằng hướng dẫn [ở đây](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)(Docker) và [ở đây](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04)(Docker compose) nhé

Sau đó các bạn chuyển tới 1 folder bất kì trước khi bắt đầu nhé, ở đây mình chọn `/var/www/html`
```
cd /var/www/html
```
Sau đó ta clone source code từ Gitlab về nhé:
```
git clone https://gitlab.com/maitrungduc1410/deploy-docker-node
```
Note: ở trên các bạn thay tên account Gitlab của các bạn vào nhé.

Nếu được hỏi username + pass thì các bạn nhập email + pass tài khoản Gitlab.

Và cũng giống như ở local, trước khi chạy ta cần check xem User ID và Groupd ID của user ở môi trường gốc của chúng ta là gì nhé:
```
id -u
--->> 1000

id -g
--->> 1000
```
Ở trên mình có `UID:GID` là `1000:1000` (yeah, lát nữa viết Dockerfile cho nhàn :D)

Các bạn sửa lại Dockerfile với nội dung như sau nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

USER node

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
**Note quan trọng**: vì ở trên UID:GID của mình là 1000:1000 nên mình dùng luôn user `node`, còn không thì các bạn lại làm như ở local vừa nãy nhé.

Tiếp theo ta cần update lại user cho MongoDB và Redis trong `docker-compose.yml` nữa:
```yaml
db:
    image: mongo
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    user: "1000:1000"

redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
    user: "1000:1000"
```
Ổn rồi đó ta tiến hành build image nhé:
```
docker build -t learning-docker:deploy-node .
```
Sau khi build xong thì ta chạy project lên thôi:
```
docker-compose up -d
```
Đợi tầm 1 phút để MongoDB khởi động hoàn toàn, ta mở trình duyệt ở địa chỉ `<server_IP>:3000` nhé.

Và..............BÙM...

![](https://images.viblo.asia/5f3e685b-9a58-4e31-9b72-ba57ecf25ba4.png)

Sao vậy nhỉ?? :thinking::thinking:

Thử kiểm tra xem container đã chạy chưa nhé:
```
docker-compose ps

           Name                         Command               State           Ports         
--------------------------------------------------------------------------------------------
deploy-docker-node_app_1     docker-entrypoint.sh pm2-r ...   Up      0.0.0.0:3000->3000/tcp
deploy-docker-node_db_1      docker-entrypoint.sh mongod      Up      27017/tcp             
deploy-docker-node_redis_1   docker-entrypoint.sh redis ...   Up      6379/tcp 
```
Ổn rồi mà nhỉ :thinking::thinking:

Vấn đề là với các VPS ta mua, thì thường ban đầu sẽ không có port nào được mở để cho traffic từ thế giới bên ngoài đi vào, mà ta phải tự tay mở. Có 2 cách: 1 là ta dùng `UFW` (Firewall) như 1 số tutorial có làm, nhưng cách này không hay, nếu các bạn mua VPS ở các nhà cung cấp lớn (Google, AWS, Azure, Digital Ocean,...) thì họ cho phép ta có thể mở port trên giao diện web quản lý riêng. Mình thấy điều này tốt hơn, ta chỉ cần chỉ định port nào cần mở, việc còn lại thì nhà cung cấp họ lo, cũng đỡ lo các vấn đề bảo mật hơn. Dùng `UFW` không đọc kĩ hướng dẫn lúc `enable` lên khéo lại bị terminate và không SSH lại được :rofl::rofl:

Ví dụ như mình dùng Azure thì giao diện nom như sau:

![](https://images.viblo.asia/f860d014-9ccc-4269-adf2-03e031c64474.png)

Nhưng nếu nơi các bạn mua VPS không hỗ trợ việc này hoặc bạn cứ muốn mở bằng "UFW" thì ta chạy command sau nhé:
```
sudo ufw allow 3000
```
Và ngay sau khi ta mở port để traffic bên ngoài có thể đi vào server, quay trở lại trình duyệt F5 ta sẽ thấy kết quả:

![](https://images.viblo.asia/17d55a9e-bbec-4561-9193-0778939cf7a7.png)

Sau đó ta thử tạo tài khoản, login và thêm mới vài sản phẩm sẽ thấy mọi thứ hoạt động trơn tru như local :D

Quá đơn giản khi deploy ứng dụng Container với Docker phải không nào ;)
# HTTPS
## Trỏ Domain về Server
Khi ta chạy project ở production thường ta sẽ dùng domain để trông cho chuyên nghiệp, có thương hiệu hơn mà còn có những lợi ích to lớn như sau:
- Dùng domain lấy HTTPS rất dễ
- Không phải mở port vô tội vạ khi số project trên server của ta tăng lên nhiều, khi đó mỗi project ta phải chạy ở port khác nhau.
- Dùng domain ta chỉ cần mở duy nhất 2 port: 80 cho HTTP và 443 cho HTTPS, dù số lượng project có nhiều thế nào. ;)

Ở đây mình không khuyến khích các bạn dùng Self-signed certificate để lấy HTTPS cho IP nhé, vì gần như chẳng bao giờ ta dùng cái đó ở production vì các trình duyệt bây giờ đã không cho phép Self-Signed Certificate và sẽ hiển thị màn hình đỏ lòm. :stuck_out_tongue_winking_eye:

Vậy nên điều kiện cần có để lấy HTTPS ở bài này là các bạn cần phải có 1 tên miền (domain name) nhé. Mình khuyến khích các bạn mua ở những nhà cung cấp lớn như Goddady, chọn 1 tên cùi cùi để học tập (loanh quanh 100K VND là cùng :D)

Sau khi các bạn có domain thì các bạn vào trang quản trị của domain đó, sửa lại địa chỉ IP của bản ghi `A` mà được tạo sẵn để trỏ về server IP của chúng ta nhé:

![](https://images.viblo.asia/0f1655ff-af5b-481b-b89c-fe0935d777ff.png)

Ngay sau đó các bạn quay trở lại trình duyệt truy cập lại app của chúng ta bằng domain xem sao nhé, ví dụ như của mình ở đây là `xoixeotv.com:3000`

![](https://images.viblo.asia/343e41a7-fe56-46a9-8531-82e9ad9d980e.png)

Âu cây vậy là giờ app của chúng ta đã có domain rồi, việc tiếp theo là lấy HTTPS nữa thôi :D

> Note: Ở trên các bạn thấy mình có tạo 1 bản ghi `CNAME` là `www` và trỏ về `@` tức là trỏ về cùng IP với bản ghi `A` để lát nữa ta có thể truy cập theo cả 2 kiểu `xoixeotv.com` hoặc `www.xoixeotv.com` nhé

## Cách lấy HTTPS
 Ở production, người ta thường dùng 1 webserver đứng trước app của chúng ta đóng vai trò vừa là tầng bảo mật, load balancing, caching hoặc proxy cho request nhận từ phía user giúp tăng hiệu suất cho ứng dụng của chúng ta.
 
 Và 1 trong những webserver mình thấy người ta dùng nhiều nhất bây giờ là Nginx. Ở bài này ta sẽ dùng nó nhé. Cùng với đó, để lấy chứng chỉ HTTPS free thì ta dùng Certbot nhé.
 
 Từ đây ta có luồng xử lý như sau:
 
![](https://images.viblo.asia/06fe6506-4e02-4fa4-93a0-b76f45b4641f.png)

Nom cũng như deploy kiểu truyền thống trước giờ vẫn làm ấy nhỉ :D

Vậy vấn đề ở đây là: thế Nginx kia ta đặt ở môi trường ngoài hay môi trường bên trong Docker? :thinking::thinking:

Ô hay đang làm Docker, muốn giữ môi trường ngoài "nguyên trinh" mà, tất nhiên đặt Nginx chạy trong container luôn chứ, vậy nên chi tiết design nom sẽ như sau:

![](https://images.viblo.asia/38994ec0-1e0d-46c6-99da-2764944c621b.png)

Với cách design bên trên, khi ta có nhiều project thì trông sẽ như sau:

![](https://images.viblo.asia/a77c30b5-6571-47f1-a15e-de289a14147d.png)

Và với mỗi project thường ta sẽ đặt chúng ở những nơi riêng biệt:
- 1 folder cho project NodeJS + MongoDB + Redis
- Project Laravel + MySQL + Redis đặt ở folder khác
- ... N project khác

Còn riêng container Nginx + Certbot ta sẽ đặt ở 1 nơi khác vì đây là thứ dùng chung cho tất cả project. Và mình nhận thấy là việc chạy Nginx + Certbot trong Docker container này có 1 số nhược điểm như sau:
- Việc lấy HTTPS trong container hơi lằng nhằng hơn 1 chút khi phải map volume, chạy script bằng tay. Các bạn có thể xem [ở đây](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)
- Trong trường hợp ta có 1 số app chạy trong Docker, 1 số app khác lại làm theo kiểu truyền thống không có Docker (cài trực tiếp vào môi trường gốc), và khi lấy HTTPS cho chúng sẽ "hơi bị đau đầu" :D
- Cùng với đó mình hay dùng Wildcard Certificate (dạng kiểu `*.example.com`) thì hơi khó lấy hơn

Do vậy sau 1 thời gian làm mình đã chuyển qua cách khác, đó là đưa Nginx + Certbot ra môi trường ngoài, làm nhiệm vụ chuyên trách như 1 tầng bảo mật chứ không chạy trong container nữa. Design mới nom sẽ như sau:

![](https://images.viblo.asia/3db69cae-5f32-4997-b4c7-d6a8a7484a4b.png)

Và ở bài này mình sẽ hướng dẫn các bạn làm theo kiểu design này nhé. Môi trường ngoài "mất trinh" chút không sao các bạn nhé :joy::joy. 

> Mục đích chính nhất khi mình lựa chọn cách tiếp cận này là vì ta có thể lấy HTTPS rất dễ, dù chúng có chạy trong Docker hay được deploy theo kiểu truyền thống

> Các bạn hoàn toàn có thể chạy cả Nginx + Certbot trong container cũng được nhé, những cái nhược điểm bên trên có thể chỉ với mình, với các bạn lại không sao. Các bạn thử xem và comment cho mình nhé ;)

Bắt đầu thôi nào :rocket::rocket:

Đầu tiên ở môi trường gốc các bạn cài Nginx:
```
sudo apt update
sudo apt install nginx
```
Sau khi cài xong các bạn kiểm tra xem Nginx chạy chưa nhé:
```
sudo service nginx status
```
Sau đó ta sẽ cần mở port 80 cho HTTP và 443 HTTPS cho traffic bên ngoài truy cập vào được nhé. Chú ý rằng dù ta chỉ mong muốn user truy cập bằng HTTPS nhưng port 80 vẫn cần được mở vì khi user gõ trực tiếp vào trình duyệt `http://...` (không có S) mà port 80 ta không được mở là user sẽ không truy cập được đâu nhé. Và để mở port thì các bạn lại dùng 1 trong 2 cách: qua trang quản trị nhà cung cấp VPS (nên dùng) hoặc dùng UFW. Nếu dùng UFW thì các bạn làm như sau:
```
sudo ufw allow 'Nginx Full'
```

Đến đây các bạn quay lại trình duyệt truy cập ở địa chỉ domain của các bạn (cổng 80) thấy như sau là oke nhé:

![](https://images.viblo.asia/65a27a8c-bdd2-447f-bb1d-b68751dc923d.png)


Tiếp theo ta cài Certbot:
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```
Tiếp theo các bạn xoá file cấu hình cho domain mặc định của Nginx đi nhé.
```
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
```
Sau đó ta tạo 1 file cấu hình cho domain của chúng ta như sau (nhớ đổi tên thành tên domain của các bạn cho phù hợp nhé):
```
sudo touch /etc/nginx/sites-available/xoixeotv.com
```
Nội dung thì các bạn để như sau nhé:
```
server {
        listen [::]:80;
        listen 80;
        
        # allow upload file with size upto 500MB
        client_max_body_size 500M;

        server_name xoixeotv.com www.xoixeotv.com;

        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_set_header x-forwarded-for $remote_addr;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_cache_bypass $http_upgrade;
        }
}
```
Ở trên các bạn thấy rằng ta sẽ proxy request vào cổng `3000` nơi mà app NodeJS của chúng ta đang chạy, nhớ là cổng 3000 là cổng mà ta đã map port nhé.

Sau đó các bạn lưu lại, tiếp theo ta cần tạo symbolic link tới folder `/etc/nginx/sites-enabled` nhé:
```
sudo ln -s /etc/nginx/sites-available/xoixeotv.com /etc/nginx/sites-enabled/
```
Note: các bạn thay tên domain của các bạn vào cho phù hợp nhé.

Sau đó ta kiểm tra xem cấu hình Nginx đã đúng hay chưa bằng command:
```
sudo nginx -t

->>>>>
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
Nếu cấu hình đã đúng ta tiến hành khởi động lại Nginx:
```
sudo service nginx restart
```
Ngay sau đó ta quay lại trình duyệt truy cập ở địa chỉ `http://<tên miền>` (không cần nói cổng bao nhiêu nữa nhé):

![](https://images.viblo.asia/76f7fef7-9c64-49aa-b94e-a4d1bfe7446f.png)

Cuối cùng ta lấy HTTPS với 1 command đơn giản như sau:
```
sudo certbot --nginx -d xoixeotv.com -d www.xoixeotv.com 
```
Khi được hỏi có `Redirect HTTP to HTTPS` hay không thì các bạn chọn option 2 (YES), để chuyển hướng toàn bộ HTTP sang HTTPS nhé.

> Các bạn để ý rằng khi lấy chứng chỉ HTTPS ta lấy cho đồng thời 2 `xoixeotv.com` và `www.xoixeotv.com`

Cuối cùng là quay lại trình duyệt F5 và xem kết quả nào:

![](https://images.viblo.asia/f8abbe8c-96c8-4113-993c-89b6d308f8c1.png)

Vậy là chúng ta đã hoàn thành việc lấy HTTPS, các bạn có thể đóng lại cổng 3000, không cho traffic từ thế giới ngoài gọi vào vì giờ ta dùng domain truy cập qua cổng 80 và 443 rồi nhé. Các bạn có thể đóng cổng thông qua giao diện Web của nhà cung cấp như mình đã nói ở trên hoặc bằng `UFW` như sau:
```
sudo ufw delete 3000
```
# So sánh với cách deploy truyền thống
Ta cùng hồi ức lại cách deploy ngày xưa nhé:
- Đầu tiên ta cần cài NodeJS
- Sau đó ta cần cài MongoDB, setup authentication
- Cài Redis

Cứ mỗi khi deploy trên 1 server mới ta đều phải làm lại những bước như vậy, nếu các bạn có xem bài [Deploy ứng dụng chat realtime Laravel](https://viblo.asia/p/deploy-ung-dung-chat-realtime-laravel-vuejs-sockerio-redis-tren-ubuntu-63vKjboRK2R) của mình sẽ thấy rằng ta phải cài mệt nghỉ mới đủ để chạy project lên.

Cùng với đó 1 điều vô cùng đáng sợ đó là khi ta có nhiều project và ta cần update, ví dụ update MySQL chẳng hạn, không may xảy ra lỗi và DB "tắt điện", BÙM, tất cả project xong phim :D.

Thứ nữa là với những project cần cài nhiều thứ, như project realtime chat kia của mình chẳng hạn, việc nhớ cài tất cả mọi thứ lắm lúc là 1 điều khó khăn, đặc biệt những hôm nào cãi nhau với người yêu :rofl::rofl:

Ngoài ra còn N + 1 nỗi sợ nữa :D

Khi các bạn xem lại phần deploy ở bài này, ta thấy rằng rất nhanh đơn giản và tiện lợi, thích thì update phiên bản bằng tên image mới, thích thì xoá, thay mới, vô cùng dễ. Điều mà nếu ta deploy theo kiểu truyền thống khó mà có được. Và đó cũng là điều tuyệt vời nhất mình muốn truyền tải với các bạn trong series này.
# Đóng máy
Qua bài này ta đã hoàn thành deploy hoàn chỉnh 1 ứng dụng NodeJS cùng với đó là lấy HTTPS xịn xò cho app của chúng ta.

Cảm nhận được sự đơn giản khi deploy ứng dụng Docker so với kiểu deploy truyền thống. Bằng cách chạy app trong Docker container, ta đã có thể tự tin hơn trong việc deploy, thêm sửa xoá, update thành phần bất kì mà không còn những lỗi lo "em xoá đi rồi không cài lại được" hay "thôi đừng update, đang chạy ngon update lên chết cả đấy" :rofl::rofl:

Mong rằng các bạn sẽ áp dụng thật tốt vào công việc của riêng mình.

Cám ơn các bạn đã theo dõi, hẹn gặp lại các bạn vào những bài sau ^^