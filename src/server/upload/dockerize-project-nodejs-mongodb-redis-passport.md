Xin chào các bạn quay trở lại với Series học Docker và.... "Rồi rồi biết rồi bài nào cũng có mỗi 1 câu chào" :joy::joy:

Ở bài trước chúng ta đã cùng nhau [dockerize ứng dụng Laravel](https://viblo.asia/p/dockerize-ung-dung-laravel-vyDZOao75wj), hiểu được EXPOSE là gì, sự khác nhau giữa EXPOSE và MAPPING PORT, cách các container giao tiếp với nhau, cùng với đó là chút chút kiến thức về Linux và webserver(nginx)

Và ta sẽ tiếp tục series với việc Dockerize ứng dụng NodeJS, MongoDB, Redis, Passport nhé ;).

Lí do mình tách bài này ra thành một bài riêng so với bài [Dockerize ứng dụng NodeJS](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG) vì mình không muốn các bạn bị bội thực ngay từ ban đầu (mình thương người lắm :-D :-D)

Bắt đầu từ bài này chúng ta sẽ thực hành nâng cao hơn chút đó là ta sẽ dockerize những project giống như lúc ta làm thật, đầy đủ các thứ như databse, redis, cấu hình cho môi trường dev và deploy, và ta sẽ thử deploy trực tiếp project nodejs ở server thật xem sao nhé ;)

Bắt đầu thôi nào

# Tiền Setup
Lại tiền setup, bài nào cũng thấy tiền setup :-D :-D. Vì có thể có nhiều bạn đọc trực tiếp bài này của mình mà không đọc các bài trước dẫn tới việc các bạn ấy chưa chuẩn bị sẵn "đạn dược" ;)

Nhớ check là các bạn đã cài Docker và Docker-compose rồi nhé. Nếu chưa thì nhớ check lại [phần cuối bài trước](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_setup-docker-va-docker-compose-14) của mình để biết cách cài đặt nhé.
# Setup project
## Clone source
Vì trong series này ta tập trung vào học Docker nên với mỗi bài mình sẽ chuẩn bị sẵn cho các bạn các project, có thể chạy được không cần đến Docker, và việc của ta là dockerize các project đó.

Ở bài này các bạn clone source code [ở đây nhé](https://gitlab.com/maitrungduc1410/learning-docker)(nhánh **master** nhé các bạn)

Code cho bài này được để ở thư mục **docker-node-mongo-redis**, cả bài này ta chỉ làm việc với thư mục này thôi nhé

## Tổng quan project

![Docker node](https://images.viblo.asia/2194b865-48b9-4fc4-9794-03e7550206e3.png)

Project này có chức năng gì:
- Trang đăng nhập, đăng kí
- Bên trong có thêm mới sản phẩm, liệt kê danh sách sản phẩm ứng với user đăng nhập

Project này kiến trúc có những gì:
- Ta chỉ có 2 model là User và Product
- Dùng MongoDB để lưu trữ dữ liệu
- Dùng Redis để lưu trữ session của user đăng nhập
- Để xử lý Login/Logout ta dùng PassportJS
- Để xử lý upload file ta dùng Multer
 
Khá đơn giản phải không ;)
# Build docker image
Và lại như thường lệ như bao bài khác, để dockerize project ta sẽ tiến hành cấu hình Dockerfile cho project và build image nhé các bạn

## Lắc não trước khi sử dụng
Trước khi bắt đầu cấu hình Dockerfile ta sẽ phân tích một chút để biết ta sẽ cần cấu hình những gì nhé

Để dockerize project này ta có thể "đút" tất cả mọi thứ vào trong 1 file Dockerfile và lát nữa sẽ có 1 container chưa môi trường có tất cả mọi thứ (từ nodejs, mongo, redis,....). Nhưng như thế sẽ không tốt, 1 container đảm nhận quá nhiều nhiệm vụ, thay vào đó ta sẽ chia nhỏ ra thành nhiều container đảm nhận các nhiệm vụ khác nhau nhé ;)

Dựa vào phần kiến trúc ta đã phân tích bên trên, ta sẽ chia project thành các phần như sau, mỗi phần sẽ tương ứng với một service ta định nghĩa ở **docker-compose.yml**:
- Có MongoDB là database -> ta có service **db**, dùng image mongo được build sẵn
- Có redis để lưu session của user -> ta có serivce **redis**, dùng image redis được build sẵn
- Phần còn lại là serivce để chạy project nodejs của chúng ta và kết nối tới 2 service bên trên -> ta chỉ cần cấu hình dockerfile cho service này, ta gọi là **app**

## Cấu hình Dockerfile
Lại vẫn như thường lệ, ở folder gốc ta tạo 1 file tên là Dockerfile với nội dung như sau:
```dockerfile
FROM node:13-alpine

WORKDIR /app

COPY . .

RUN npm install

# Development
CMD ["npm", "run", "dev"]

# Production
# RUN npm install -g pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Những gì có ở trên mình đã giải thích rất kĩ ở các bài trước rồi các bạn có thể xem lại mình sẽ không nói nhiều nữa nhé, chỉ có một chút khác biệt ở đây là ta sẽ chia Dockerfile thành 2 phần: 1 cho môi trường dev (lúc ta code), 1 cho phần chạy production, vì khi code ta sẽ cần code được cập nhật liên tục mỗi khi ta thay đổi từ bên ngoài, còn khi production thì không (ở bài này ta dùng **nodemon** để cập nhật code mỗi khi có thay đổi từ bên ngoài)

Ở trên mặc định ta build image này là ta build cho môi trường dev, cuối bài khi deploy production thì ta sẽ dùng đoạn comment bên dưới nhé ;)

## Build image
Và lại vẫn như thường lệ ta dùng command sau để build image nhé:
```
docker build -t learning-docker/docker-node-mongo-redis:v1 .
```
# Chạy project
## Data persistent
Ở bài này ta có databse là MongoDB để lưu trữ dữ liệu, ta có Redis để lưu trữ session của user.

Khi ta chạy project bên trong docker container, khi container khởi động lại thì **mọi thứ sẽ mất và reset lại như ban đầu**, tức là data trong database sẽ mất, session của những user đang đăng nhập cũng sẽ mất.

Do đó ở bài này ta sẽ tạo ra những folder để lưu lại dữ liệu để khi container có khởi động lại thì dữ liệu của ta vẫn sẽ được lưu lại nhé (việc này tiếng anh gọi là **persist data**), để làm được việc đó thì ta **mount** những folder chứa dữ liệu này vào trong container dùng **volumes** nhé :)

Ở folder gốc, các bạn tạo cho mình folder **.docker** (để ý dấu chấm ở đầu nhé). Trong **.docker** ta tạo folder **data**, trong **data** ta tạo 2 folder tên là **db** (cho mongodb) và **redis** cho redis

## Cấu hình docker-compose
Và lại vẫn cứ như cái thường lệ để chạy project ta sẽ tạo file **docker-compose.yml** với nội dung như sau nhé:
```yaml
version: "3.4"

services:
  app:
    image: learning-docker/docker-node-mongo-redis:v1
    volumes:
      - ./:/app # mount từ môi trường gốc vào trong để nếu các bạn thay đổi code thì bên trong sẽ tự động cập nhật
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
  
  db:
    image: mongo:4.4
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
  
  redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
```

Nếu các bạn đã làm qua các bài trước thì đến bài này nhìn vào bên trên các bạn sẽ thấy hiểu  đúng không nào, còn không thì mình khuyến khích bạn xem lại các bài trước trong series này nhé.

Giải thích một số chỗ mới như sau
- Ở service **db** cho mongodb ta dùng image tên **mongo** (bản chính thức, các bạn search google là ra nhé)
- Tiếp đó ta mount volume từ folder **.docker/data/db** ta tạo ở phần trước vào bên trong container ở đường dẫn **data/db** và lát nữa khi khởi chạy Mongo sẽ tự tìm đến **/data/db** và load những dữ liệu vào trong database nhé
- Sao mình lại biết được đường dẫn **/data/db** ở trong container mà viết ở đây, thì ở phần mô tả của image [ở đây](https://hub.docker.com/_/mongo) họ đã nói rõ rồi nhé
- Điều tương tự cho service redis các bạn xem ở bên dưới nhé

Có 1 điều các bạn để ý là ờ service **app** chúng ta có để một trường tên là **depends_on** (phụ thuộc vào), ý bảo là service **app** sẽ phụ thuộc vào 2 service **db** và **redis**, điều này thực tế sẽ xảy ra như sau:
- Khi chạy **docker-compose up** thì service **db** và **redis** sẽ khởi động trước service **app**
- Khi chạy **docker-compose up app** thì đồng thời sẽ tạo ra 2 service **db** và **redis** (dù khi khởi động ta chỉ nói là "khởi động mỗi service app")
- Khi chạy **docker-compose stop** thì service **app** sẽ bị stop trước 2 service kia

Note: mặc dù service **app** khởi động sau service **db** nhưng sẽ không đảm bảo service **db** sẵn sàng ngay thời điểm service **app** khởi động và kết nối tới nhé, vì service **db** tốn 1 khoảng thời gian nhỏ từ lúc khởi động đến lúc sẵn sàng cho kết nối. Đó là lí do vì sao ở file **app.js** mình lại phải có đoạn code **connectionRetry** để thử kết nối từ NodeJS tới MongoDB cho tới khi nào thành công

Note tiếp: 
Vì bản chính thức image của Mongo không có cho Alpine (các bạn có thể tự cấu hình rồi build) nhưng ở đây mình dùng luôn image được build sẵn, image này được build dựa trên môi trường hệ điều hành Ubuntu (lát nữa khi chạy các bạn exec vào trong chạy **cat /etc/os-release** sẽ thấy).

Chắc bạn sẽ thắc mắc: có service thì chạy trên môi trường HĐH Alpine có service chạy trên HĐH Ubuntu, có được hay không? Thì câu trả lời là chạy bình thường như cân đường hộp sữa nhé, các bạn tưởng tượng chúng giống như kiểu API, API viết bằng NODEJS vẫn sẽ gọi được API viết bằng Python như thường, miễn là trả ra cái gì đó chung kiểu như dữ liệu JSON là được (đó là mình ví dụ thế ;))

# Chạy Project
Ổn rồi đó các bạn, bây giờ chúng ta cùng chạy project lên thôi nào. Các bạn chạy command sau:
```
docker-compose up
```

Và....... BÙM :boom:, terminal in ra như sau:

![MacOS terminal](https://images.viblo.asia/2bfc4137-1906-48bf-a3ad-fc0b54f7728b.png)

Mở trình duyệt cũng không thấy có gì cả :sob::sob:

Lỗi ở terminal báo là **không tìm thấy nodemon**, ta thử **chui** vào container và xem tại sao nhé. Các bạn chạy command sau :
```
docker-compose exec app sh
```

Nhưng cũng không vào được @@, container reset liên tục.

Vấn đề của chúng ta ở đây là, khi chạy thì không có thư mục **node_modules** bên trong container dẫn tới việc project lỗi không chạy được và PM2 liên tục reset project của chúng ta.

Ồ, really?? Ta đã chạy **npm install** ở trong Dockerfile rồi cơ mà???

Giải thích: bởi vì trong quá trình dev, ta muốn sửa đổi code thì bên trong container sẽ tự động cập nhật lại, do đó ở **docker-compose.yml** chúng ta mount volume của service **app** điều này dẫn tới việc toàn bộ file từ môi trường ngoài sẽ thay thế cho toàn bộ file bên trong container, mà ở môi trường ngoài ta không hề có **node_modules**.

Giải pháp: yêu cầu ở đây là môi trường ngoài ta phải chạy **npm install**, nhưng bởi vì môi trường ngoài của ta có cài cái gì ngoài Docker đâu, ta chỉ quan tâm mỗi Docker, vậy làm thế nào có thể chạy được **npm install** khi không có NodeJS. Các bạn chạy cho mình command sau là được nhé:
```
docker run --rm -v $(pwd):/app -w /app node:13-alpine npm install

# Note trên windows thì command trên chạy như sau:
docker run --rm -v "/$(pwd)":/app -w //app node:13-alpine npm install
```
Command trên sẽ tạo ra 1 **container tạm thời** từ image **node:13-alpine**, chạy **npm install** và mount trực tiếp file ra môi trường ngoài, kết qủa là khi command kia chạy xong thì môi trường ngoài của ta sẽ có **node_modules**. Các bạn có thể hiểu đơn giản là nó cũng như việc ta chạy **npm install** thông thường vậy, nhưng giờ ta dùng sự hỗ trợ của Docker để chạy, như thế ở môi trường ngoài ta không cần cài thêm NodeJS để chạy **npm**

Ok rồi đó, các bạn restart lại project bằng cách chạy command sau:
```
docker-compose down
docker-compose up

# lúc khởi động Mongo DB cần vài giây để chạy nên nếu bạn quay lại trình duyệt F5 ngay lập tức thì có thể không thấy gì nhé 
```

Sau đó chúng ta mở trình duyệt ở địa chỉ **localhost:3000** (cổng 3000 ta khai báo ở file **.env** nhé), nếu thấy như sau là oke rồi đó ;)

![Docker node](https://images.viblo.asia/08e175fd-5c2e-4d6d-8300-159b508f5116.png)

Các bạn tự nghịch xem sao nhé, thử quay lại code sửa một chỗ nào đó (sửa HTML là nhanh nhất) và F5 lại trình duyệt là các bạn sẽ thấy thay đôi ngay nhé ;)

**Note cho bạn nào dùng Windows**: khi `up` lên sẽ bị lỗi MongoDB không thể mount `volume` vào môi trường gốc được, đây là 1 issue với MongoDB và Docker đã được giải thích [ở đây](https://github.com/docker-library/mongo/issues/232#issuecomment-355423692). Giải pháp cũng khá đơn giản, ta tạo 1 `Docker volume` - volume riêng biệt được quản lý bởi Docker, volume mà ta dùng đường dẫn (như mình vẫn làm) là dạng `local volume`. Ta cập nhật lại `docker-compose.yml` một chút như sau:
```yaml
version: "3.4"

services:
  ....
  
  db:
    image: mongo:4.4
    volumes:
      - mongodata:/data/db
    restart: unless-stopped
 
volumes:
  mongodata:
```

# Vọc vạch
Các bạn thử tạo cho mình 1 account rồi login vào tạo vài ba sản phẩm.

Sau đó các bạn thử shutdown project này đi sau đó khởi động lại bằng cách chạy command sau:
```
docker-compose down
docker-compose up
```
Sau đó thử login lại  bằng tài khoản cũ và ta sẽ vẫn thấy data được giữ nguyên nhé.

Thử mở folder **.docker/data/db**, trong đó các bạn sẽ thấy rất nhiều file, đó là những thứ cần thiết để lưu lại data cho MongoDB, tương tự các bạn mở folder **.docker/data/redis** cũng thế nhé.

Tiếp theo ta lại thử shutdown project đi bằng command:
```
docker-compose down
```
Sau đó ở file **docker-compose.yml** ta thử không mount dữ liệu của mongo vào và xem thế này nhé, ở service **db** các bạn sửa lại như sau:
```yaml
db:
    image: mongo:4.4
    #volumes: # comment đoạn này lại
     # - .docker/data/db:/data/db
    restart: unless-stopped
```

Sau đó ta khởi động lại project bằng command:
```

docker-compose up
```
Thử login lại thì sẽ không được nữa nhé, vì khi container được khởi tạo lại thì mọi thứ lại trống trơn, data của ta ko được mount nên cũng sẽ không còn nữa

Tương tự ở service **app** nếu ta không mount volume thì khi sửa code và F5 trìnhd duyệt sẽ không có gì thay đổi cả, hoặc khi bạn tạo sản phẩm upload ảnh check ở folder **/public/images** thì cũng không  thấy ảnh đâu nữa cả
# Deploy
Ở phần này chúng ta sẽ cùng nhau chạy project này như một project lúc chạy thật (production) xem sao nhé.

Vì có thể có nhiều bạn không có điều kiện để thuê một server (VPS) riêng, nên chúng ta sẽ làm "mô phỏng" bằng cách tạo một folder bất kì ở trên máy và thực hành nhé
## Build Image cho production
Giả sử các bạn thấy code của mình dev đã ngon, mọi thứ ổn và giờ chúng ta sẽ build image để chạy thật

Ở file Dockerfile các bạn sửa lại như sau:
```dockerfile
FROM node:13-alpine

WORKDIR /app

COPY . .

RUN npm install

# Development
# CMD ["npm", "run", "dev"]

# Production
RUN npm install -g pm2
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên điều khác biệt duy nhất là ta dùng PM2 để chạy project.

PM2 (process manager) là một tool để ta chạy và quản lý ứng dụng NodeJS (có cả python nữa), dùng PM2 ta có thể thiết lập nhiều cấu hình chi tiết cho việc chạy project, đồng thời điều hay ho của PM2 là sẽ tự động restart project nếu như quá trình chạy có lỗi xảy ra, ví dụ như các lỗi mà ta không bắt Exception chẳng hạn

Ở trên ta dùng PM2 chạy project với những cấu hình ta đặt ở file **ecosystem.config.js**

Nếu các bạn muốn tìm hiểu thêm về PM2 thì có thể search google rất nhiều nhé ;)

Nhưng trước khi build ta sẽ tạo file **.dockerignore** để bỏ qua một số file/folder không cần thiết cho quá trình build nhé, các bạn tạo file **.dockerignore** với nội dung như sau:
```
# Bỏ qua node_modules vì lát nữa ở Dockerfile sẽ chạy npm install
node_modules

# Bỏ qua folder .docker vì folder này chỉ có service db và redis mới cần (ta đang build image cho service app)
.docker

# Bỏ qua ảnh mà chúng ta đã upload lên trong quá trình test
public/images/*

# Bỏ qua file .env, file này dùng cho docker-compose khi chạy nên không cần đưa vào image
.env

# Bỏ qua Dockerfile không đưa vào image vì file này chỉ dùng tại thời điểm build image
Dockerfile

# Bỏ qua file docker-compose vì file này chỉ dùng tại thời điểm khởi chạy project
docker-compose.yml
```

Sau đó ta build lại image bằng command:
```
docker build -t learning-docker/docker-node-mongo-redis:production .
```
## Push image lên registry
Như ở bài [dockerize ứng dụng Python](https://viblo.asia/p/dockerize-ung-dung-python-flask-bWrZnxbY5xw#_push-image-len-registry-10) mình đã hướng dẫn các bạn cách đẩy image lên registry (nơi lưu Docker image, giống như Github lưu code), và cùng với đó là cách pull về và chạy rồi nhé

Ở bài này ta lại làm tương tự, yêu cầu là các bạn đã có tài khoản Gitlab và có tạo sẵn 1 repository  nhé

Để đẩy image lên registry thì việc đầu tiên ta cần làm là đổi lại tên image cho đúng với chuẩn của Gitlab. Các bạn chạy command sau:
```
docker tag learning-docker/docker-node-mongo-redis:production registry.gitlab.com/<username>/<tên repo>:node_mongo_redis_production

# Ví dụ của mình
docker tag learning-docker/docker-node-mongo-redis:production registry.gitlab.com/maitrungduc1410/learning-docker:node_mongo_redis_production
```
Command hơi dài tí nhưng mình muốn làm rõ để các bạn được rõ

Sau khi command chạy xong chúng ta lên Gitlab, chọn Repository và mở Packages->Container Registry ta sẽ thấy image của ta ở đó nhé:

![Gitlab](https://images.viblo.asia/c0d24ef6-a565-41f1-83e9-950b57752ec5.png)

## Bắt đầu deploy
Như ở đầu mình đã nói là chúng ta sẽ "mô phỏng" deploy vì khả năng cao rất nhiều bạn không có điều kiện để có server thật để test, nhưng nếu các bạn có server (VPS) xịn thì cứ follow những bước mình hướng dẫn vẫn chạy bình thường nhé.

Chúng ta tạo riêng một folder tên **test-deploy** ở bất kì đâu các bạn muốn nhé.

Ở trong folder đó ta tạo file **docker-compose.yml** với nội dung như sau:
```yaml
version: "3.4"

services:
  app:
    image: registry.gitlab.com/maitrungduc1410/learning-docker:node_mongo_redis_production
    volumes:
      - ./public/images:/app/public/images # ta chỉ cần mount mỗi folder image thôi nhé
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
  
  db:
    image: mongo:4.4
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
  
  redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
```
Sau đó ta tạo file **.env** với nội dung như sau:
```
PORT=3000
DB_HOST=db
DB_PORT=27017
DB_NAME=my_db
REDIS_HOST=redis
REDIS_PORT=6379
```

Và cuối cùng là chạy project thôi :-D :-D , giờ phút của sự thật đến rồi, ta chạy command sau:
```
docker-compose up
```
Khi chạy lên, docker-compose sẽ check những volume mà ta mount nếu ở bên ngoài chưa tạo folder thì docker-compose sẽ tự tạo cho ta nhé. Các bạn sẽ thấy như sau:

![VsCode](https://images.viblo.asia/5cac79ef-8c88-428d-a4ea-c9c97b7714b3.png)

Và ta lại truy cập trình duyệt ở địa chỉ **localhost:3000** (nếu bạn nào có server VPS riêng thì thay localhost bằng IP server của các bạn là được)  và sẽ lại có được điều tương tự.

Vậy là ta đã hoàn thành việc deploy project như chạy thật rồi đó.

# Điều hay ho của Docker
Như ở bài đầu tiên [giới thiệu về Docker](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n) mình đã "quảng cáo" về độ tiện lợi của Docker khi ta chuyển môi trường, chuyển server.

Thì ở đây giả sử sau khi bạn đã deploy thành công project chạy thật ngon lành rồi, mà có lí do nào đó bạn cần phải chuyển sang server khác, Thì việc bạn cần làm là copy nguyên cái "đống" :) bên trên, tức folder **test-deploy** mà ta làm ở phần trên, và copy sang server mới, sau đó dùng 1 command:
```
docker-compose up
```

Và Bùm :boom: mọi thứ lại chạy y như ở server cũ, không cần phải config gì thêm ;) (nếu không có gì đặc biệt). Các bạn thử test bằng việc chạy ở một máy khác xem nhé ;)

Đây là 1 trong những điều tuyệt vời nhất mình yêu ở Docker <3 <3

# Kết bài

Vậy là lại một bài nữa qua đi :-D

Hi vọng qua bài này các bạn đã hiểu được cách setup Docker cho project khi dev và khi deploy chạy thật sẽ như thế nào

Nếu có gì thắc mắc thì các bạn để lại comment bên dưới cho mình nhé

Toàn bộ source code cho bài này các bạn xem [ở đây nhé](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh **complete-tutorial** nhé)

Cám ơn các bạn đã theo dõi và hẹn gặp lại các bạn ở những bài sau^^