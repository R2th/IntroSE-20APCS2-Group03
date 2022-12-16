Hello các bạn lại là mình đâyyyyyyyyyy 👋👋👋

Nhân tiện đợt này có thời gian, nên lại ngồi xuống chia sẻ tiếp cùng với các bạn thêm những thứ mới, cùng nhau cải thiện skill kiếm job mới...... (đùa thế, chứ gắng mà đóng cho công ty hiện tại thật nhiều đã các bạn nhé)

Từ khi series [Học Docker, CICD](https://viblo.asia/s/jeZ103QgKWz) của mình lên sóng 2 năm trước thì được rất nhiều bạn hưởng ứng và học theo, tự thẩm du tinh thần mình thấy khá sướng 🤣🤣, các bạn làm theo từng bài, comment rằng bạn đã làm được, nhưng cũng có rất nhiều bạn gặp lỗi trong quá trình thực hành, rồi các bạn comment hỏi mình hoặc nhắn tin trực tiếp cho mình. Và mình nhận ra phần debug ứng dụng Docker của nhiều bạn chưa đc tốt, nhiều sự "ngây thơ" và học chưa sâu. Cùng với đó khi đi làm, bản thân mình và đồng nghiệp làm cùng mình cũng thấy những lỗi tương tự, nên mới có bài này, mình sẽ liệt kê ra các lỗi mình thấy trong quá trình làm việc với Docker ta hay gặp phải và cách xử lý.

> Bài này có thể được cập nhật thêm nhiều lỗi phổ biến hơn theo thời gian (nếu có)

Bắt đầu thôi nhé 🚀🚀🚀

# Các lỗi về Networking
Đây là các lỗi mà mình vô cùnggggggg hay gặp khi deploy app Docker, liên quan tới việc connect giữa các app với nhau không thành công, có thể là do sai sót, không biết hay mập mờ về cấu hình của từng app,...

Cá nhân mình thấy khi làm việc với Docker (và sau này là Kubernetes) thì một khi đã hiểu về vấn đề này thì nó rấtttttttt là dễ dàng trong việc debug khi gặp lỗi, hứa luôn 🤪🤪🤪

## Quên chưa map port
Giả sử ta có file `docker-compose.yml` như sau:
```go:yml
version: "3.4"

services:
  app:
    image: vad1mo/hello-world-rest
```
Nhìn vào đây các bạn thấy ta có 1 service `app`, khi start lên sẽ tạo 1 container từ image `vad1mo/hello-world-rest`, thử start app lên nhé: 
```objectivec
docker compose up -d
```
> để ý bên trên ta dùng `docker compose` chứ không còn là `docker-compose` nữa nhé các bạn, ở các phiên bản mới thì compose đã được tích hợp vào docker luôn rồi 👏👏

Sau đó ta chui vào container:
```
docker compose exec app sh
apk update && apk add curl

curl localhost:5050

>>> Hello World!
```
Ở trên các bạn thấy rằng bên trong container ta có app chạy ở cổng 5050, curl vào thì thấy trả về message Hello World ngon lành cành đào rồi.

Thế nhưng nếu quay lại môi trường gốc thì hiện tại chưa có cách nào để ta có thể gọi được vào app kia, bởi vì app của chúng ta chưa có được "mở" cho thế giới bên ngoài gọi vào.

Cách fix thì rất đơn giản đó là ta chỉ việc map port, chọn 1 port từ môi trường ngoài và map (ánh xạ) vào port đang chạy trong container (5050), ta sửa lại `docker-compose.yml` như sau:
```yaml
version: "3.4"

services:
  app:
    image: vad1mo/hello-world-rest
    ports:
      - 3000:5050
```
Sau đó restart lại project:
```markdown
docker compose down
docker compose up -d
```
Sau đó mở Chrome truy cập ở địa chỉ `localhost:3000` là ta thấy app chạy oke rồi:

![Screenshot 2022-10-01 at 11.35.34 AM.png](https://images.viblo.asia/1d025f4b-78b6-4d10-9df7-09e9b7e80f66.png)

Như các bạn thấy, đây là 1 vấn đề nhìn thì đơn giản, nhưng không hiểu sao rất nhiều bạn lại hay quên, nhắn tin hỏi mình thì câu đầu tiên mình trả lời luôn là "bạn đã map port hay chưa?", xong các bạn rép lại "map port là gì ạ???!!!"........Mình kiểu: 😵‍💫😵‍💫😵‍💫😵‍💫😵‍💫😵‍💫

## Không biết đâu ở trong đâu là ngoài container
Hầu như trong lúc làm việc, để tiện thì mình thường chọn map port bên ngoài giống như trong container luôn, giả sử nếu là thực tế thì ví dụ bên trên mình sẽ viết là:
```go:yml
version: "3.4"

services:
  app:
    image: vad1mo/hello-world-rest
    ports:
      - 5050:5050 # ----> ở đây
```
Ở trên mình map luôn port 5050 bên ngoài vào port 5050 trong container.

Xong nhiều bạn cũng làm theo như vậy, không biết 5050 của cái nào là bên ngoài, cái nào bên trong, thôi thì cứ giống nhau cho chắc cú 😂😂😂

Các bạn chú ý cho mình là Docker nó theo 1 pattern đó là khi map port hoặc mount volume thì vế trái của dấu hai chấm ":" là môi trường ngoài, vế phải là bên trong container nhé. 

Do vậy khi viết blog, để làm rõ ràng nhất cho các bạn mình thường chọn map port trong ngoài khác nhau (thi thoảng quen tay vẫn chọn giống nhau 🤣🤣):
```go:yml
version: "3.4"

services:
  app:
    image: vad1mo/hello-world-rest
    ports:
      - 3000:5050 # ngoài 3000 : trong 5050
```

## Không rõ là đang ở trong network nào
Mình khuyến khích các bạn định nghĩa các network riêng biệt, sau đó cho các app(services) cần connect với nhau join chung 1 network, cái nào không cần thì tách biệt ra network khác.

Nhưng chỉ dùng nếu thật sự các bạn hiểu được mình đang làm gì, còn không thì các bạn để mặc định Docker sẽ cho tất cả các services join chung vào 1 network luôn.

Đôi khi các bạn toàn tự làm khó vấn đề lên, chưa xem kĩ bài [Docker Network](https://viblo.asia/p/gioi-thieu-docker-network-va-healthcheck-2-cong-cu-huu-ich-tu-docker-bJzKmxXY59N) của mình đã phang luôn vào project thật, nên hỏi mình nhiều câu rất ối dồi ôi 🥲🥲🥲

Ta quay lại Gitlab ví dụ bài Docker Network (nhánh `complete-tutorial`), kết quả cuối cùng ta có [như sau](https://gitlab.com/maitrungduc1410/learning-docker/-/blob/complete-tutorial/docker-network-healthcheck/docker-compose.yml):
```shell:yml
version: "3.4"

services:
  app:
    image: learning-docker/docker-node-mongo-redis:production
    volumes:
      - ./public/images:/app/public/images
    environment: # phần này ta định nghĩa ở file .env nhé
      - DB_HOST=${DB_HOST}
      - DB_NAME=${DB_NAME}
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
      - redis-network
    healthcheck:
      test: wget --quiet --tries=1 --spider http://localhost:${PORT} || exit 1z
      interval: 30s
      timeout: 10s
      retries: 5
  db:
    image: mongo
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    networks:
      - db-network
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo db:27017/speech-api --quiet
      interval: 30s
      timeout: 10s
      retries: 5

  redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
    networks:
      - redis-network
    healthcheck:
      test: ["CMD", "redis-cli","ping"]
      interval: 30s
      timeout: 10s
      retries: 5

#Docker Networks
networks:
  db-network:
    driver: bridge
  redis-network:
    driver: bridge
```

Các bạn để ý, ở tận cùng file, mình định nghĩa 2 networks:
- db-network: cho các app cần connect tới database
- redis-network: cho các thành phần cần connect tới redis

Mô tả cho network của chúng ta như hình dưới:

![App (4).png](https://images.viblo.asia/848c434e-5af8-4a80-b02d-5ff4b09ed4df.png)

Như các bạn thấy ở trên, service `app` ở trong cả 2 network nên nó có thể gọi vào cả `redis` và `db`, thế nhưng từ `redis` lại không gọi sang được `db`, và ngược lại.

Thử chạy app lên và debug ta thấy như sau:
```css
docker build -t learning-docker/docker-node-mongo-redis:production .
docker compose up -d
```
Sau đó ta chui vào `app`:
```shell
docker compose exec app sh
apk update & apk add curl
curl db:27017
curl redis:6379
```
Ta được như sau:

![Screenshot 2022-10-01 at 12.20.14 PM.png](https://images.viblo.asia/4fb93133-748a-4031-b632-ec756da53c3b.png)

Như các bạn thấy, từ `app` khi `curl` sang `db` và `redis` ta đều nhận được response bình thường. 

Giờ ta thử chui vào redis và curl sang db xem nhé:
```shell
docker compose exec redis sh
apk update & apk add curl
curl db:27017
```

![Screenshot 2022-10-01 at 12.22.20 PM.png](https://images.viblo.asia/225c75f5-d3ae-416e-9739-41460ddefd99.png)

Ta thấy rằng câu lệnh bị treo 1 lúc sau đó bị timeout và lỗi in ra là không thể tìm thấy host `db` trong network hiện tại, bởi vì redis và db không có chung 1 network.

Điều tương tự xảy ra khi ta chui vào db:
```shell
docker compose exec db sh
apt update & apt -y install curl
curl redis:6379
```
> chú ý image mongodb ta dùng là bản Debian, và nó dùng **apt** thay vì **apk** như trên Alpine để quản lý system packages nhé

![Screenshot 2022-10-01 at 12.25.13 PM.png](https://images.viblo.asia/c8c62683-e4ed-495d-8b2a-dbcf2b5da95e.png)

Như các bạn thấy, không khó lắm để ta xác định được rõ ràng service nào ở trong network nào, và liệu rằng 2 service A và B có trong cùng 1 network hay không.

Luyện được kĩ năng này sẽ cựcccccccccccc kì hữu ích cho sau này, nó sẽ giúp các bạn tiết kiệm được rất nhiều thời gian, hiểu được flow traffic đi ra vào từng thành phần trong kiến trúc của mình như thế nào, và nâng trình lên rất nhiều ;),  đặc biệt là khi ta làm vào dự án thật, khi mà các app nằm trên các network khác nhau, ví dụ thực tế là ở các VPC khác nhau (Virtual private cloud)

> Phần này mình nghĩ là quan trọng nhất trong việc deploy thành công được 1 kiến trúc trong dự án thật, là skill "ăn tiền" :D, vì hầu hết các vấn đề mình gặp phải là liên quan tới vấn đề này

# Các lỗi về volume
## Permission Denied
Vâng, đúng rồi đó các bạn, lỗi kinh điển nhất trong mọi lỗi khi deploy app, kinh điển đến mức mình thấy phải cho nó vào sách giáo khoa 💁‍♂️💁‍♂️💁‍♂️ Một lỗi vô cùng phổ biến, xảy ra liên tục, hàng ngày.

Lỗi này xảy ra khi thực thể nào đó không có quyền đọc/ghi vào 1 file/đường dẫn nào đó. 

Vấn đề là việc xác định được cái "thực thể" kia nó là cái nào thì lại phụ thuộc vào bối cảnh app của các bạn đang được setup như thế nào. 

Ta lấy ví dụ bài [Docker app chat realtime Laravel](https://viblo.asia/p/dockerize-ung-dung-chat-realtime-voi-laravel-nginx-vuejs-laravel-echo-redis-socketio-bJzKmxgY59N#_cau-hinh-dockerfile-9) nhé.

Ở trong Dockerfile ở bài đó:
- ta có đoạn `RUN chown -R www-data:www-data .` để đổi quyền folder hiện tại về của user/group `www-data`
- Ta không có chỉ định container chạy với user nào, nên mặc định nó được chạy bằng user `root`

Ở phần [cấu hình Supervisor cho Horizon](https://viblo.asia/p/dockerize-ung-dung-chat-realtime-voi-laravel-nginx-vuejs-laravel-echo-redis-socketio-bJzKmxgY59N#_cau-hinh-supervisor-8), ta có đoạn:
```objectivec
process_name=%(program_name)s
command=php /var/www/html/artisan horizon;
user=www-data
```
Ở trên ta có chỉ định là process horizon sẽ chạy với user www-data, do vậy nếu process đó trong lúc chạy có muốn đọc ghi vào phần source project thì nó sẽ có đủ quyền, vì ở trong Dockerfile mình đã set quyền cho folder về dưới user www-data rồi.

Vậy nên nếu ta chạy Horizon với user khác mà chẳng may nó cần ghi cái gì đó thì sẽ bị báo Permission Denied

Tương tự, ở bài [Chạy container với non-root user](https://viblo.asia/p/tai-sao-nen-chay-ung-dung-container-voi-non-root-user-jvEla3VNKkw), mình rất khuyến khích các bạn chạy tất cả các container bằng non-root user (nếu có thể), mình cũng làm vậy ở các project thật.

Thế nhưng nếu không hiểu rõ và sử dụng thì sẽ vô cùng đau đầu, và ta sẽ chỉ làm vấn đề thêm phức tạp. Vậy nên khi gặp lỗi Permission Denied thì các bạn hãy tự đặt câu hỏi:
- Cái gì đang bị lỗi Permission Denied, thực thể đang cần đọc ghi là gì?
- Nó đang được chạy bởi user nào: root, user1, user2, hay user3,.... user đó có quyền là gì? (uid/gid là gì, xác định bằng cách chạy `id -u` và `id -g`)
- Lỗi đó đang bị ở file/folder nào? file/folder đó hiện tại đang nằm dưới uid/gid là gì? (chạy `ls -la` các bạn sẽ thấy)

![Screenshot 2022-10-01 at 12.52.36 PM.png](https://images.viblo.asia/0de77f17-58af-4f9c-a869-92967b108385.png)
> ở trên thì folder hiện tại của mình nằm dưới `uid=ductrungmai, gid=staff`

## Mất data do quên chưa mount volume
Bị quả lỗi này thì thật sự là ối dồi ôi, thánh cứu 🤣🤣. Phần này không có gì để mình trình bày nhiều.

Các bạn luôn nhớ mount volume cho các service mà cần lưu lại data giữ các lần restart app nhé, ví dụ DB, Redis,...
## Mount volume không đúng format
Các bạn chú ý rằng giống như khi map port, format của mount volume là: phía trái của dấu hai chấm ":" là môi trường ngoài, phía tay phải là môi trường trong container

![Screenshot 2022-10-01 at 12.55.40 PM.png](https://images.viblo.asia/02ce2d55-f883-4bc5-82cd-664456e37baf.png)

- đường dẫn môi trường ngoài có thể là relative hoặc absolute, nhưng đường dần bên trong container phải là absolute
- nếu khi mount volume mà folder ta đang mount không tồn tại thì nó sẽ được tự động tạo dưới quyền `root`, cái đó mình đã trình bày ở bài [Docker non-root user](https://viblo.asia/p/tai-sao-nen-chay-ung-dung-container-voi-non-root-user-jvEla3VNKkw#_co-mot-su-hay-ho-khong-he-nhe-10) rồi nhé
- Docker support 2 kiểu đó là docker volume (volume được quản lý bởi Docker) và local volume (volume ta tự quản, ví dụ chạy mongo trên windows thì sẽ bị lỗi khi dùng local volume, khi đó ta đơn giản là chuyển qua dùng Docker volume, phần này các bạn nên thử các cách khác nhau trước khi ping hỏi mình nhé, cái nào được là mình đều thấy nó oke cả 🤣🤣:
```python:yml
version: "3.4"

services:
  ....

  db:
    image: mongo
    volumes:
      - mongodata:/data/db
    restart: unless-stopped

volumes:
  mongodata:
```

Xong có những bạn hỏi mình, "anh ơi relative path à đường dẫn kiểu gì", mình lại kiểu "??????!!!!!!$@%^!$#^$%&!^$%&!%$"

Thực tế là có nhiều bạn chưa rõ về cái đó, thì tiện đây mình giải thích:
- relative path: đường dẫn tương đối, tương đối theo đường dẫn nơi bạn đang đứng, dạng **../../a/b/c** -- > như ví dụ kia thì là: đi lên 2 cấp cha, sau đó tìm vào folder a -> trong đó tìm b -> trong b tìm c
- absolute path: đường dẫn tuyệt đối, tức là dù ta đứng ở đâu thì đường dẫn này cũng trỏ về 1 file/folder. Dạng **/a/b/c** (để ý dấu xoạc ở đầu)

## Volume bị thay đổi theo cấu hình
Với các service dạng stateful kiểu (mysql, mongodb,...), thì khi 1 số cấu hình thay đổi nó kèm theo volume có thể bị thay đổi và lỗi theo.

Ví dụ mình setup mongodb ban đầu không có authentication, chạy lên ngon nghẻ, từ app gọi vào db bình thường, nhưng lát nữa mình shutdown các app đi, set password cho mongodb, sau đó lại chạy lên rồi từ app mình connect sang db, có password rồi, nhưng liên tục báo connect không thành công.

Trong trường hợp đó thường mình phải xoá luôn cả volume đi chạy lại, nhưng nhớ lưu lại data của db trước khi xoá volume nhé ;) (dump db ra trước nhé)

## Mount volume vào các đường dẫn "nhạy cảm"
Trong container có rất nhiều đường dẫn của hệ điều hành (OS) trong đó mà ta không nên ghi đè hoặc mount volume vào, ví dụ **/var**, **/etc**,... Nếu hạn chế được thì các bạn né những nơi đó ra nhé vì nhiều process của OS dùng các đường dẫn đó, và hầu hết chúng nằm dưới user root, nên nếu các bạn mà chạy container với non-root user thì còn dễ bị dính lỗi hơn nữa
## Note cho app Javascript
Gỉa sử ta có app như sau:
```markdown:dockerfile
# Dockerfile
FROM node:16-alpine
....
RUN npm install
```

```css:yml
# docker-compose.yml
app:
    image: my-nodejs-image
    volumes:
      - .:/app
```
- Trong Dockerfile ta cấu hình build image, và như thường lệ, ta sẽ chạy `npm install` để cài dependencies
- Trong file compose ta map toàn bộ code ở folder môi trường ngoài vào trong đường dẫn `/app` trong container

Khi chạy app lên,  nếu trước đó bên ngoài ta đã có folder node_modules thì folder node_modules bên ngoài sẽ ghi đè lên node_modules bên trong và ta sẽ gặp lỗi. Trường hợp này dễ dàng xảy ra khi trước đó bên ngoài ta đã chạy npm install trước rồi, sau đó ta mới Dockerize project

Vậy nên để tránh điều này thì ta làm như sau:
```markdown:yml
# docker-compose.yml
app:
    image: my-nodejs-image
    volumes:
      - .:/app
      - /app/node_modules # -> thêm phần này vào
```

# Các lỗi khác
## Copy từ stage không tồn tại
Khi build các app frontend (React, Vue, Angular,...) như các bài mình hướng dẫn thì ta nên chia quá trình build thành nhiều stages để có thể tối ưu image size, vậy nhưng khi implement thật thì nó lạ lắm 😅:
```shell:dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts

FROM node:16-alpine as builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
```
Ở đoạn code bên trên, khi chạy tới bước `COPY --from=deps /app/n...` thì ta thấy Docker nó treo mãi và cuối cùng báo lỗi vì không tìm được `deps`.

Vấn đề là ở dòng đầu tiên ta FROM, ta quên chưa set tên cho stage đó "as" cái gì, nên tới bước `COPY --from=deps /app/n....` thì Docker nó sẽ tìm trên Dockerhub xem có image nào tên là `deps` hay không, và bởi vì không tìm được nên nó báo lỗi

Do vậy luôn để ý tên của stage khi COPY làm sao cho đúng các bạn nhé

## Chưa build image đã dùng
Sau khi xem bài Docker nodejs, có bạn hỏi mình sao chạy `docker compose up` mà nó cứ báo không tìm thấy image, code và cấu hình docker-compose đúng hết rồi:
```python:yml
version: "3.4"

services:
  app:
    image: learning-docker/docker-node-mongo-redis:production
```
Mình bảo "không tìm thấy image đơn giản vì image không tồn tại ở local và trên dockerhub, bạn đã build image chưa?", các bạn ngây thơ "phải build image mới dùng được à?????!!!!!!!". Hết nước chấm 🥲🥲🥲🥲
## Map cả 1 dải port dài dẫn tới máy bị treo
Các bạn nên cẩn thận khi map 1 dải nhiều port một lúc, vì Docker sẽ tạo ra 1 process để xử lý 1 port khi ta map, vậy nên map càng nhiều thì càng nhiều process và RAM sẽ bị ăn nhiều hơn
```go:yml
version: "3.4"

services:
  app:
    image: learning-docker/docker-node-mongo-redis:production
    ports:
      - "3000"
      - "3000-3005"
      - "8000:8000"
      - "9000-9090:9000-9090"
```

# Thân ái
Lại hết 1 bài nữa rồi, 🥲🥲🥲

Hi vọng là qua bài này các bạn có thể hiểu hơn về một số lỗi hay gặp phải khi làm việc với Docker và cách xử lý chúng, từ đó nâng cao skill, và đặc biệt là hiểu được cách hệ thống của các bạn đang hoạt động như thế nào, các services kết nối với nhau ra sao. 

Việc cải thiện skill debug cũng sẽ giúp các bạn làm việc độc lập hơn nữa đó, ít phải search google hay ping hỏi đồng đội / leader mỗi khi có lỗi xảy ra ;)

Thân ái và quyết thắng, hẹn gặp lại các bạn ở những bài sau 👋👋