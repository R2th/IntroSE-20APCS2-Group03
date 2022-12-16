Chào mừng các bạn đã quay trở lại với series [học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình.

Ở bài trước chúng ta đã tìm hiểu về [Docker Network và HEALTHCHECK](https://viblo.asia/p/gioi-thieu-docker-network-va-healthcheck-2-cong-cu-huu-ich-tu-docker-bJzKmxXY59N) ở bài này chúng ta sẽ áp dụng nó cùng với một số thứ nữa như thiết lập authentication cho MongoDB, redis và chạy app với non-root user để tăng tính bảo mật cho ứng dụng của chúng ta nhé.

Ùi dào....project có vài ba chục cùng lắm vài trăm user, lìu tìu ai rảnh mà đi phá xem app của mình bảo mật có tốt hay không đâu mà? :smirk::smirk:

Security theo cá nhân mình dù ở bất kì project nào cũng cần được quan tâm, giúp bảo vệ hệ thống của chúng ta và dữ liệu người dùng, tất nhiên sẽ rất khó để có app hoàn hảo không có lỗ hổng, nhưng ta càng "bịt" được nhiều chỗ thì càng tốt phải không nào.

> Những phần mình nói trong bài này là những thứ mình đã áp dụng vào project công việc, đã đang chạy ở production và mình thấy nó khả ổn và cũng gọi là có "best pratice" (tự sướng tí vậy :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:)

Bắt đầu thôi nhé
# Setup
Đầu tiên các bạn clone code của mình [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) nhé. Ở bài này ta chỉ quan tâm tới folder **secure-docker-node-mongo-redis**  nhé.

Ở folder này mình đã setup sẵn cho các bạn một project nodejs với mongo và redis có thể chạy được, và mình đã dockerize nó luôn. Đây chính là kết quả cuối cùng của bài [Dockerize Project NodeJS, MongoDB, Redis, Passport](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3).

Đầu tiên chúng ta sẽ cùng build image chạy thử để đảm bảo mọi thứ hoạt động tốt trước đã nhé. ;)

Chúng ta chạy command sau để build image:
```
docker build -t learning-docker:node .
```
Sau đó ta chạy thử lên và test xem oke chưa nhé:
```
docker-compose up -d
```
Tiếp theo mở trình duyệt ở `http://localhost:3000`, thử tạo account sau đó login và thêm vài sản phẩm xem nhé:

![](https://images.viblo.asia/526f89ec-2616-44a8-aaec-df37e6740977.png)

Đảm bảo là app chạy ngon nhe các bạn ;). Xong đoạn đầu này là oke ta bắt đầu vào tiết mục chính cho ngày hôm nay nhé. ;)

**Note cho bạn nào đang dùng Windows**: các bạn xem lại phần chú ý lúc mount volume cho MongoDB mình đã nói ở bài [Dockerize ứng dụng NodeJS, Mongo](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3#_chay-project-11) rồi nhé
# Security
## Thêm Docker network
Đầu tiên chúng ta setup để các container chạy trong các network cụ thể, nhằm giới hạn khả năng truy cập giữa chúng, các container chỉ có thể giao tiếp với những container mà nó thực sự cần thiết, nếu chẳng may 1 container nào đó bị hổng thì kẻ xấu cũng ko có quyền truy cập vào tất cả các container khác ;).

Ta sử lại file `docker-compose.yml` với nội dung như sau:
```yaml
version: "3.4"

services:
  app:
    image: learning-docker:node
    volumes:
      - ./public/images:/app/public/images
    environment:
      - DB_HOST=${DB_HOST}
      - DB_NAME=${DB_NAME}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
      - PORT=${PORT}
    ports:
      - "${PORT}:${PORT}"
    restart: unless-stopped
    depends_on:
        - redis
        - db
    networks: // -----------Note here
      - db-network
      - cache-network
  
  db:
    image: mongo:4.4
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    networks: // ---------------Note here
      - db-network
  
  redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
    networks: // --------------Note here
      - cache-network

networks: // --------------Note here
  cache-network:
    driver: bridge
  db-network:
    driver: bridge
```
Các bạn chú ý vào những đoạn mình `Note here` nhé, ở trên ta tạo 2 networks là `cache-network` dùng để lưu trữ user session cho NodeJS Passport, và `db-network` cho Mongo. Sau đó với từng service ta sẽ cho nó join vào từng network cụ thể. Phần cấu hình bên trên cũng không có gì khó hiểu lắm, nếu các bạn muốn giải thích kĩ thì xem lại bài [Docker network](https://viblo.asia/p/gioi-thieu-docker-network-va-healthcheck-2-cong-cu-huu-ich-tu-docker-bJzKmxXY59N) của mình nhé.

Sau đó chúng ta khởi động lại project nhé:
```
docker-compose down
docker-compose up -d
```
Và để test xem kết quả thế nào thì ta cũng chui vào container xem nhé. Đầu tiên ta thử vào service `app` nhé, vì service này được join vào cả 2 network nên điều ta mong đợi là nó có thể gọi tới cả 2 servicce `db` và `redis` nhé:
```
docker-compose exec app sh
apk add curl # thêm curl vào debug cho dễ

# test connect đến Mongo
curl db:27017

->>>: It looks like you are trying to access MongoDB over HTTP on the native driver port

# test connect đến redis
curl redis:6379
curl: (1) Received HTTP/0.9 when not allowed
```
Như các bạn thấy ở trên ta đã nhận response trả về từ mongo và redis. Message not allow là do redis không chấp nhận kết nối bằng HTTP ta không cần quan tâm nhé, cái chính là ta đã connect được với nhau.

Tiếp theo ta thử vào service `db` xem có thể connect tới `redis` được không nhé, điều ta mong đợi là không connect được với nhau vì chúng ở khác network:
```
docker-compose exec db sh

# thêm curl vào debug cho dễ (image này build với Ubuntu nên ta dùng apt nhé)
apt update
apt install curl

curl redis:6379
curl: (6) Could not resolve host: redis
```
Ở trên các bạn có thể thấy thông báo in ra là "không thể tìm thấy host redis". Vậy là oke rồi nhé ;)

Tiếp theo test từ `redis` gọi sang `db` thì các bạn tự test xem thế nào nhé ;). `redis` build với Alpine nên cài curl các bạn chạy `apk add curl` nhé.

Vậy là setup network đã xong giờ đây security project của chúng ta cũng có vẻ "cưng cứng" hơn rồi ấy nhỉ. Cùng làm nó "cứng" hơn nữa nhé :rofl::rofl:
## Authentication cho Mongo và Redis
### Mongo
Bình thường dù ta dùng MongoDB hay MySQL thì khi chạy production ta luôn được khuyến khích là không tạo database bằng user root mà ta sẽ dùng các user riêng cho từng database riêng tránh việc 1 user có quyền đọc ghi vào toàn bộ CSDL hoặc nếu DB bị hổng  thì khả năng lộ hết dữ liệu khá cao.

Bây giờ ta sẽ cùng setup authentication cho Mongo DB trong Docker nhé.

Ở folder `.docker` các bạn tạo cho mình file `db-entrypoint.sh` với nội dung như sau nhé:
```bash
echo 'Creating application user and db'

mongo ${DB_NAME} \
  --host localhost \
  --port ${DB_PORT} \
  -u ${MONGO_INITDB_ROOT_USERNAME} \
  -p ${MONGO_INITDB_ROOT_PASSWORD} \
  --authenticationDatabase admin \
  --eval "db.createUser({user: '${DB_USER}', pwd: '${DB_PASSWORD}', roles:[{role:'dbOwner', db: '${DB_NAME}'}]});"
```
Nội dung của file này là tạo user với password là xxx sau đó tạo database tên là yyy và gán nó với user vừa tạo. Khi service `db` được chạy lên thì file này sẽ được đọc và thực thi.

Như các bạn thấy ở trên ta dùng tới một số biến môi trường (env), ta sẽ cần phải thêm các biến đó vào file `.env` sau đó truyền vào `docker-compose.yml` để tại thời điểm chạy thì bên trong container chúng có giá trị nhé.

Các bạn sửa lại file `.env` như sau:
```
PORT=3000

DB_HOST=db
DB_PORT=27017
DB_NAME=my_db
DB_ROOT_USER=rootuser
DB_ROOT_PASS=rootuserpass
DB_USER=myuser
DB_PASSWORD=myuserpass

REDIS_HOST=redis
REDIS_PORT=6379
```
Ở trên chúng ta có thông tin của `rootuser` và `myuser`, `rootuser` sẽ được dùng trong `db-entrypoint.sh` để tạo `myuser` tại thời điểm ban đầu.

Sau đó ở file `docker-compose.yml` chúng ta sửa lại service `app` và `db` như sau nhé:
```yaml
...
app:
    image: learning-docker:node
    volumes:
      - ./public/images:/app/public/images
    environment:
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
      - PORT=${PORT}
    ports:
      - "${PORT}:${PORT}" # phần này ta định nghĩa ở file .env nhé
    restart: unless-stopped
    depends_on:
        - redis
        - db
    networks:
      - db-network
      - cache-network
      
db:
    image: mongo:4.4
    volumes:
      - .docker/data/db:/data/db
      - .docker/db-entrypoint.sh:/docker-entrypoint-initdb.d/db-entrypoint.sh
    restart: unless-stopped
    networks:
      - db-network
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${DB_ROOT_USER}
      - MONGO_INITDB_ROOT_PASSWORD=${DB_ROOT_PASS}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      
...
```
Như các bạn thấy ở trên đầu tiên service `app` thì mình chỉ sửa lại mỗi phần `environment`. Tiếp theo service `db` phần mình thêm vào là mount file `db-entrypoint.sh` vào trong folder `docker-entrypoint-initdb.d` bên trong container, thì image `mongo` đã được setup để tại thời điểm chạy nó sẽ chạy tất cả các file `.sh` mà nó thấy ở trong folder đó lên.

Tiếp theo bên dưới ta truyền vào các biến môi trường, chú ý 2 biến đầu dành cho user root là đặc biệt, tên của nó **phải** được đặt như mình viết ở trên nhé (`MONGO_INITDB_ROOT_...`), vì đây là tên cho user root của chính image `mongo` người ta đã định nghĩa sẵn, còn các biến bên dưới thì là tuỳ chọn, nhưng phải khớp với những gì ở trong file `db-entrypoint.sh` của chúng ta nhé.

Tiếp theo chúng ta cần sửa lại code NodeJS ở phần kết nối tới Mongo nhé. Các bạn mở file `app.js` và sửa lại như sau:
```js
...
const dbHost = process.env.DB_HOST || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const dbName = process.env.DB_NAME || 'my_db_name'
const dbUser = process.env.DB_USER
const dbUserPassword = process.env.DB_PASSWORD
const mongoUrl = `mongodb://${dbUser}:${dbUserPassword}@${dbHost}:${dbPort}/${dbName}`
...
```

Bởi vì chúng ta sửa lại code NodeJS nên ta cần build lại image nhé:
```
docker build -t learning-docker:node .
```
Tiếp theo ta nhớ `down` project trước nhé:
```
docker-compose down
```
**Tiếp theo (Note quan trọng)**: Trước khi khởi động lại project thì ta cần xoá database cũ đi vì nếu không mongo sẽ báo `unauthorized` vì DB mới có trùng tên với DB cũ mà DB cũ ta không có authentication gì cả. 
- Với các bạn Mac, Linux thì đơn giản là ta xóa folder `.docker/data/db` đi là được:
- Nhưng với các bạn Windows mà đang dùng `standalone volume` như mình hướng dẫn từ các bài trước, thì để xóa volume của MongoDB ta làm như sau nhé:
```
# tìm tên chính xác của volume MongoDB
docker volume ls

--->>>>
......
local               secure-docker-node-mongo-redis_mongodata

# xóa volume, kiểm tra đúng tên project trước khi xóa nhé ;)
docker volume rm secure-docker-node-mongo-redis_mongodata
```

Sau đó ta khởi động lại project nhé:
```
docker-compose up
```
> Ở trên lúc `up` mình không để `-d` để lát nữa ta theo dõi trực tiếp log nhé

Vì tại thời điểm chạy ta cần chờ container `db` được chạy lên, sau đó mongo đọc file entrypoint nên để ta test được thì sẽ mất một lúc (tầm 1 phút) nhé. Các bạn sẽ thấy log ban đầu in ra khá nhiều lỗi, đó là lỗi thông báo bên NodeJS ở hàm `connectWithRetry` trong file `app.js` vì cố gắng kết nối tới Mongo mỗi 5 giây tới khi nào `succcess` thì thôi.

Chờ tầm 1' khi nào không thấy báo lỗi kết nối và log in ra thế này là ổn nhé:

![](https://images.viblo.asia/81f209bd-ecfa-4339-85d4-85a8258b0e11.png)

Đến đây thì chúng ta có thể test được rồi, các bạn quay trở lại trình duyệt, tạo account mới login và thêm thử vài sản phẩm xem sao nhé ;) Phần này các bạn tự sướng nhé :D

Một trong những điều mà chúng ta đôi khi muốn làm là chui trực tiếp vào trong database để xem data lưu ở trong database có đúng hay không, có chính xác không tại sao ở client lại không hiển thị gì thế này,.... :joy::joy:. Vì là giờ ta có authentication nên việc xem trực tiếp database sẽ khác đi chút, mà ngày trước lúc đầu mình search google mãi không tìm đc ông bạn nào chỉ cho cách chính xác để xem database trong docker lúc có authentication, vậy nên mình không muốn bạn đọc blog của mình phải khổ nữa mà mình sẽ nói luôn ở đây (đã cute lại còn biết quan tâm người khác, ahihi :heart_eyes:).

Giờ chúng ta sẽ cùng thử chui vào container `db` để xem trong database có gì nhé:
```
docker-compose exec db sh

mongo

use my_db # tên database của chúng ta

db.auth("myuser", "myuserpass") # chạy command này thấy in ra "1" là OK nhé

# Từ đây thì chúng ta có thể chạy mọi command khác với MongoDB như bình thường. Ví dụ:

show collections
->>products
->>users
```

Vậy là setup authentication cho MongoDB ổn rồi đó, giờ chúng ta chuyển tới Redis nhé
### Redis
Đầu tiên các bạn sửa lại file `.env` một chút phần redis như sau:
```
...

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=redispass
```
Ở trên mình chỉ thêm duy nhất biên `REDIS_PASSWORD` là password dành cho redis nhé.

Sau đó ở file `docker-compose.yml` các bạn sửa lại service `app` và `redis` như sau nhé:
```yaml
...
app:
    ...
    environment:
     ...
      - REDIS_PASSWORD=${REDIS_PASSWORD} # thêm vào biến này
      
redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    command: redis-server --requirepass ${REDIS_PASSWORD} # thêm vào duy nhất dòng này
    restart: unless-stopped
    networks:
      - cache-network
```
Các bạn có thể thấy ở trên mình chỉ thêm vào biến `REDIS_PASSWORD` cho service `app` và dòng `command...`. 

> trường `command` ở cho service ở trong `docker-compose` dùng để chạy 1 command ngay tại thời điểm mà service được khởi động lên. 

Ở đây sau khi `redis` được chạy lên thì ta chạy `command` để setup password cho nó

Tiếp theo ta cần sửa lại code NodeJS vì giờ đây redis đã có password rồi. Các bạn mở file `/modules/session.js`, ở phần đầu ta sửa lại 1 chút như sau nhé:
```js
...

const client = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1', // this must match the container name of redis image
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD // -->>>>thêm vào duy nhất chỗ này
})

...
```
Vì ta đã sửa code NodeJS nên giờ ta cần build lại image nhé:
```
docker build -t learning-docker:node .
```
Sau đó chúng ta khởi động lại project nhé:
```
docker-compose down
docker-compose up
```
Cuối cùng là ta lại mở trình duyệt thử F5 lại và test xem nhé. Phần này các bạn lại tự sướng nhe :D

Đên bước  này app của chúng ta cũng khá "cứng" rồi đấy, ở phần tiếp theo chúng ta làm cho nó "cứng" và "chắc" hơn nữa nhé.

## Chạy app với non-root  user
Trong môi trường server, có rất nhiều resource (tài nguyên) mà ta chỉ muốn user root có quyền thao tác, và với mỗi app chạy trên server ta muốn nó chỉ có vừa đủ permission để chạy được, không ban phát quyền `sudo` vô tội vạ tránh việc user có nhiều quyền và làm nhiều hơn những thứ được làm :joy: :joy:

Ở phần này ta sẽ cấu hình để app của chúng ta chạy dưới một user cụ thể chứ không mặc định cho chạy dưới `root` nữa nhé.

Đầu tiên chúng ta sửa lại `Dockerfile` với nội dung như sau:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g pm2

# Create a group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown -R appuser:appgroup /app

# Tell docker that all future commands should run as the appuser user
USER appuser

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên các bạn có thể thấy:
- Chúng ta thêm vào user group với tên là `appgroup` và user với tên là `appuser:appgroup`
- Sau đó chúng ta đổi permission của đường dẫn `/app` nơi chứa app của chúng ta thuộc về `appuser:appgroup` (option -R - recursive áp dụng cho tất cả các file/folder bên trong `/app`)
- Cuối cùng là ta đổi user hiện tại thành `appuser`. Kể từ đây tất cả các command sẽ được chạy dưới danh nghĩa `appuser`.

Tiếp theo chúng ta tiến hành build lại image nhé:
```
docker build -t learning-docker:node .
```
Sau đó ta khởi động lại project nhé:
```
docker-compose down

docker-compose up
```
Tiếp theo ta mở lại trình duyệt và test để đảm bảo mọi thứ vẫn chạy ổn định. Thử thêm mới vài product có ảnh xem nhé.

Sau đó ta chui vào container `app` và check xem nhé:
```
docker-compose exec app sh
```
Đầu tiên ta xem ta đang ở vai trò user nào nhé:
```
whoami
->> appuser
```
Tiếp theo ta xem các file trong folder `/app` có quyền gì nhé:
```
ls -l
```
Ta sẽ thấy in ra như sau:

![](https://images.viblo.asia/527dec9e-46ee-4268-aeeb-91120fe2ebce.png)

Các bạn thử vào folder `public/images` và cũng sẽ thấy bất kì file ảnh nào ta upload lên cũng sẽ được set permission về của `appuser` nhé.

À, ta thử cài cái gì đó xem `appuser` có quyền không nhé, điều ta mong muốn là `appuser` không có quyền vì không phải `root`:
```
apk add curl
```
Ta sẽ thấy in ra như sau:

![](https://images.viblo.asia/5814c409-50bd-465f-9b5d-acca104f3f9f.png)

Tuyệt vời :fireworks::fireworks:

Đến bước này app của chúng ta cũng "cứng" lắm rồi, ta làm thêm 1 bước nữa để theo dõi sức khoẻ  để đảm bảo em ý luôn "cứng" nhé.
# Healthcheck
Ở bước cuối cùng này ta sẽ thêm vào Docker Healthcheck như 1 vị bác sĩ định kì kiểm tra sức khoẻ cho app của chúng ta nhé.

Các bạn sửa lại file `docker-compose.yml` như sau:
```yaml
version: "3.4"

services:
  app:
    image: learning-docker:node
    volumes:
      - ./public/images:/app/public/images
    environment: # phần này ta định nghĩa ở file .env nhé
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
      - REDIS_PASSWORD=${REDIS_PASSWORD}
      - PORT=${PORT}
    ports:
      - "${PORT}:${PORT}" # phần này ta định nghĩa ở file .env nhé
    restart: unless-stopped
    depends_on:
        - redis
        - db
    networks:
      - db-network
      - cache-network
    healthcheck:
      test: wget --quiet --tries=1 --spider http://localhost:${PORT} || exit 1z
      interval: 30s
      timeout: 10s
      retries: 5
  
  db:
    image: mongo:4.4
    volumes:
      - .docker/data/db:/data/db
      - .docker/db-entrypoint.sh:/docker-entrypoint-initdb.d/db-entrypoint.sh
    restart: unless-stopped
    networks:
      - db-network
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${DB_ROOT_USER}
      - MONGO_INITDB_ROOT_PASSWORD=${DB_ROOT_PASS}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo mongodb://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/?authSource=${DB_NAME} --quiet
      interval: 30s
      timeout: 10s
      retries: 5
  
  redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    command: redis-server --requirepass ${REDIS_PASSWORD}
    restart: unless-stopped
    networks:
      - cache-network
    healthcheck:
      test: ["CMD", "redis-cli","ping"]
      interval: 30s
      timeout: 10s
      retries: 5

networks:
  cache-network:
    driver: bridge
  db-network:
    driver: bridge
```
Phần bên trên thì mình đã giải thích kĩ ở bài [Giới thiệu Docker Network và HEALTHCHECK - 2 công cụ hữu ích từ Docker](https://viblo.asia/p/gioi-thieu-docker-network-va-healthcheck-2-cong-cu-huu-ich-tu-docker-bJzKmxXY59N) rồi nhé. Cơ bản là ta command `test` để kiểm tra độ "khoẻ mạnh" của từng service mỗi 1 `interval`, ở đây ta đặt 30 giây.

Các bạn chú ý cho mình service `db` healthcheck có hơi khác ở bài trước vì giờ đây ta có authentication rồi nhé.

Giờ ta chạy lại project xem thế nào nhé ;)

Từ, dừnggggg, service `app` biến môi trường nhiều quá, sau này có 100 biến môi trường viết cả vào đây à  :hushed::hushed:

Thì ta nhận thấy rằng service `app` dùng tới tất cả các biến môi trường trong `.env`, thì ta sửa lại chút ở service `app`như sau nhé:
```yaml
...

app:
    image: learning-docker:node
    volumes:
      - ./public/images:/app/public/images
    env_file: .env # ------------>>>>>> Note dòng này
    ports:
      - "${PORT}:${PORT}"
    restart: unless-stopped
    depends_on:
        - redis
        - db
    networks:
      - db-network
      - cache-network
    healthcheck:
      test: wget --quiet --tries=1 --spider http://localhost:${PORT} || exit 1z
      interval: 30s
      timeout: 10s
      retries: 5
      
...
```
Như các bạn thấy ở trên ta đã thay `environment` bằng `env_file: .env` ý bảo "ê anh bạn Compose, load toàn bộ file `.env` làm biến môi trường cho tôi nhé" ;)

> Các service `db` và `redis` ta dùng env_file cũng được, nhưng không cần thiết vì chúng chỉ dùng 1 vài biến môi trường, việc này tuỳ vào các bạn nhé :D

Cuối cùng ta chạy lại project thôi:
```
docker-compose down
docker-compose up -d
```
Để test xem các service có khoẻ không chúng ta chạy command:
```
docker-compose ps

# hoặc 
docker container ls
```
Ban đầu thì chúng ta sẽ thấy trạng thái là `Starting`:

![](https://images.viblo.asia/57cf1c7a-2c2d-41c0-971f-f5c9ae6d4bfb.png)

Bởi vì sau 30 giây thì mới bắt đầu check lần đầu tiên, chờ một lúc và check lại các bạn thấy tất cả `healthy` là oke nhé:

![](https://images.viblo.asia/59ec2c96-6158-4406-886b-c188b8b71796.png)


Các bạn chú ý là service `db` khởi động hơi lâu (tầm 1-2 phút) nên có thể tại thời điểm đầu tiên - sau 30 giây các bạn check sẽ in ra `unhealthy`nhé

# Kết bài
Qua bài này mình đã hướng dẫn các bạn một số các để làm cho project chạy với Docker của chúng ta "cứng" và "khoẻ", các bạn có thể tuỳ cơ ứng biến cho phù hợp với project của riêng mình nhé.

Toàn bộ source code bài này mình để [ở đây](https://gitlab.com/maitrungduc1410/learning-docker/-/tree/complete-tutorial) nhé (nhánh **complete-tutorial**).

Nếu có gì thắc mắc các bạn để lại comment cho mình nhé. Hẹn gặp lại các bạn ở những bài sau ^^.