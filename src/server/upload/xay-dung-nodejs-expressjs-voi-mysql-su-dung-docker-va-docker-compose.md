Hí anh em. Bài viết này là kết quả của việc học tập sử dụng Docker sau bao ngày nghịch ngợm của mình.

Nếu anh em chưa biết docker là gì có thể xem qua một số bài viết để hiểu thêm docker nhé.

[Tìm hiểu về Docker](https://viblo.asia/p/tim-hieu-ve-docker-m68Z08RzZkG)

[Link Docs](https://docs.docker.com/)

**Hiểu sơ sơ thì nó là cái giúp chúng ta rút ngắn thời gian để cài đặt và cấu hình dự án**

# Cài đặt
## Cài đặt docker và docker-compose
Ở [Trang chủ](https://docs.docker.com/get-docker/) của docker có nhiều sự lựa chọn cho chúng ta sử dụng và vì mình sử dụng ubuntu lên mình chỉ cài đặt câu lệnh thôi nhé.
Cùng chạy câu lệnh dưới đây hoặc có thể vào trang chủ cài đặt trực tiếp để lấy bản mới nhất nhé !
```
sudo apt-get remove docker docker-engine docker.io containerd runc // xóa docker phiên bản cũ
```
Cài đặt kho lưu trữ cho docker
```
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
Cài đặt docker và docker-compose
```
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

=> Đấy lấy từ [docs](https://docs.docker.com/engine/install/ubuntu/) đấy. anh em vào docs đọc cho tăng khả năng dịch ing lịch nhé :D.


## Cài đặt và setup ExpressJS và mysql package
Đây là kết quả sau khi chúng ta cài đặt nhé.
![image.png](https://images.viblo.asia/d3de2877-05f9-474d-87a6-5c8753be2341.png)

+ `Dockerfile` là dùng để tạo ra image nhé
+ docker-compose.yml là file giúp chúng ta định nghĩa và chạy chương trình
+ Ngoài ra mình có cài một số package như : `Sequelize, sequelize-cli, dotenv, nodemon, mysql2`.

#### Cài đặt ExpressJS
tạo thư mục `myapp` và truy cập vào file đó chạy câu lệnh.

```
npm init
npm install express
npx express-generator
```
sau khi chạy thành công thì chúng ta sẽ được thư mục có dạng như thế này nè .
![image.png](https://images.viblo.asia/d9dc3c2e-cf02-49f8-8739-4dd188e090c8.png)
### Cài đặt package liên quan
Tiếp tục cài đặt các package nhé.
```
npm install --save sequelize
npm install --save mysql2
npm install --save-dev sequelize-cli
npx sequelize-cli init
npm install --save nodemon
npm install --save dotenv
```
**Sequelize** là package giúp chúng ta thao tác với cơ sở dữ liệu một cách nhanh chóng thuận tiện và dễ sử dụng, ngoài ra chúng còn có hỗ trợ kết nối với rất nhiều cơ sở dữ liệu nếu bạn thích có thể đọc qua [docs](https://sequelize.org/docs/v6/getting-started/) nhé.

**Mysql** là package hỗ trợ kết nối tới mysql nhé.

**Sequelize-cli** giúp chúng ta tạo model, migrate, seed , giống như Laravel ý.

**dotenv**: Giúp chúng ta tạo ra biến môi trường và sử dụng nó ở mọi nơi. tạo file .env để sử dụng thôi nhé

**nodemon**: package này sẽ lắng nghe sự thay đổi của file và cập nhập chúng thay vì phải chạy lại ứng dụng bằng cơm .

`chạy bằng cơm` nghĩa là nếu bạn thay đổi file nào đó thì sẽ phải chạy server thì mới có sửa đổi mới nhất.

thêm đoạn dưới đây vào `package.json` nhé
```
  "scripts": {
    "start": "nodemon --inspect ./bin/www"
  },
```

Mở file routes/index.js: 
```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('le dac khoan 3');
});

module.exports = router;

```

và kết quả cuối tùng sẽ là như thế này nè: 

![image.png](https://images.viblo.asia/b9267253-a253-4df9-8fd3-2b9cb2f76ea4.png)

## Cài đặt và cấu hình với docker nhé.

Ở phần này chúng ta cùng tìm hiểu qua `dockerfile` và `docker-compose.yml`.

- `dockerfile` giúp chúng ta tạo image sau đó chạy
- `docker-compose.yml` được dùng để các service chạy cùng một môi trường đó (cụ thể là web và mysql)

### Tạo dockerfile
tạo file docker ở trong thư mục myapp nhé.
```
FROM node:14
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install

CMD npm start
```

- FROM là mình sẽ pull image của node có sẵn trên hub (cái này tuỳ thuộc bạn dùng phiên bản node nào nhé), bạn có thể tham khoả node ở [đây](https://hub.docker.com/_/node).
- WORKDIR là tạo thư mục để chúng ta thiết lập các câu lệnh.
- COPY là chúng ta copy những thư mục vào thư mục ảo trong docker
- RUN câu lệnh này sẽ chạy trong lúc build image
- CMD là câu lệnh chạy sau khi build image thành công

**Bạn có thể loại bỏ một số file không mong muốn khi chạy tiến trình copy thư mục bằng cách tạo file .dockerignore**

### Tạo docker-compose.yml
```
version: '3.7'

services:
  mysql:
    platform: linux/x86_64
    image: mysql:5.7
    container_name: mysql-nodejs
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: nodejs
    ports:
     - "3308:3306"  
    volumes:
    # Mysql
    - db:/var/lib/mysql
    networks: 
      - nodejss

  web:
    depends_on:
      - mysql
    build: ./myapp
    ports: 
     - "3000:3000"
    volumes:
    - ./myapp/:/app
    restart: unless-stopped
    container_name: nodejs
    stdin_open: true
    tty: true
    networks: 
      - nodejss

volumes:
  db:

networks:
  nodejss:
```

- services được hiểu là các container mà bạn muốn cài đặt và ở đây mình khai báo mysql và web
- image chỉ ra image bạn muốn cài đặt
- container_name: tên con tainer
- platform: do dùng chip ARM nên bắt buộc phải dùng thì mới pull được image mysql
- volumes: giúp chúng ta lắng nghe sự thay đổi local để thay đổi docker.
- ports: mapping port docker và local
- depends_on : thiết lập sự phụ thuộc giữa các container với nhau
- build: chỉ ra chúng sẽ đi tìm file dockerfile để thực thi
Các bạn có thể tham khảo docs của [docker-compose](https://docs.docker.com/compose/) để tham khảo nhiều option nhé :v

Giờ chạy terminal để xem nào anh em
```
docker-compose up
```
![image.png](https://images.viblo.asia/735db766-4178-408d-8f19-b3312126bb69.png)
Cùng xem kết quả nào.
![image.png](https://images.viblo.asia/37c83b50-5dd9-4371-8dd7-886e212c0df4.png)

### Tạo model migrate 
để kiểm tra mysql đã hoạt động được chưa bằng cách tạo model và migrate nhé.
1. Mở file config/config.json
```
{
  "development": {
    "username": "root",
    "password": "123456",
    "database": "nodejs",
    "host": "mysql",
    "dialect": "mysql",
    "port": "3306"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3307"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
     "port": "3307"
  }
}
```
Ở đây có 3 môi trường và môi trường mình sử dụng là development, chúng ta chỉ cần điền những gì chúng ta khai báo `mysql` ở docker-compose.yml.

2. Tạo model và migrate
```
docker-exec -it nodejs sh
npx sequelize-cli model:generate --name Student --attributes firstName:string,lastName:string,email:string
npx sequelize-cli db:migrate
```
- docker-exec: Đây là câu lệnh chạy  command trong container
- npx sequelize-cli model:genarate dùng để tạo model migrate
- npx sequelize-cli db:migrate dùng để chạy các file ở trên.

**Và kết quả là :**

![image.png](https://images.viblo.asia/1078e6d0-f4ee-4a14-9e9d-79d26f19154c.png)

# Lời kết
- Bài viết này là quá trình mình tìm hiểu docker và cũng là sản phẩm đầu tay do mình tự nghịch có thể còn nhiều sai sót 
- Cảm ơn mọi người đã xem hết bài viết này của mình, mình luôn đón nhận những comment từ các bạn :3
- Bài viết này mình chưa sử dụng nginx để cân bằng tải :v. Mình sẽ sửa trong thời gian ngắn nhất :D
- link [github](https://github.com/khoanld-98/node-docker).