Chào mừng các bạn đã quay trở lại với [series học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình. 😊😊

Ở bài trước mình đã hướng dẫn các bạn cách [deploy ứng dụng Docker, Laravel](https://viblo.asia/p/deploy-ung-dung-docker-laravel-realtime-chat-aWj53WJ156m), qua đó ta thấy được sự tối giản trong quá trình deploy đi rất là nhiều. Nếu so sánh với bài [Deploy không dùng Docker](https://viblo.asia/p/deploy-ung-dung-chat-realtime-laravel-vuejs-sockerio-redis-tren-ubuntu-63vKjboRK2R), thì ta thấy được sự nhàn nhã khi dùng Docker như thế nào. Đó cũng là 1 trong những điều tuyệt vời nhất mà mình muốn gửi tới các bạn trong series này ;)

Ở bài này chúng ta sẽ đi tới bước cuối cùng đó là kết hợp với CICD để auto deploy project Docker. Ta chỉ cần commit code, tất cả mọi việc còn lại sẽ được thực hiện tự động. :rocket::rocket:

# Lắc não trước khi sử dụng
Ở 2 bài trước [Deploy ứng dụng Docker NodeJS](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw) và [deploy ứng dụng Docker, Laravel Realtime chat](https://viblo.asia/p/deploy-ung-dung-docker-laravel-realtime-chat-aWj53WJ156m). Ta thấy rằng mỗi khi code cập nhật mà muốn deploy lại thì ta phải lên server pull code mới về, build image sau đó `docker-compose down` và `up` lại. 

Sau này nếu có thêm [Automation test với GitlabCI](https://viblo.asia/p/automation-test-voi-docker-va-gitlab-ci-yMnKMv2DZ7P) thì ta lại phải chờ cho test chạy xong để đảm bảo code không lỗi lầm gì, sau đó mới deploy.

Việc cứ phải làm đi làm lại những thao tác thừa này gây mất thời gian và đôi khi khá là chán, cuộc đời developer đã vất vả lắm rồi :rofl::rofl:

Do vậy ở bài này ta sẽ cùng nhau tận dụng Gitlab CI để auto deploy ứng dụng Docker, mỗi khi code xong ta chỉ gõ commit, và tất cả mọi thứ còn lại như build image, chạy test, deploy lên server sẽ được làm tự động. Ta chỉ cần tập trung vào code, tăng năng suất làm việc và code của ta có thể deploy ra production càng sớm càng tốt. Pằng pằng chíu chíu :muscle::muscle:
# Điều kiện cần
Do ở bài này ta sẽ thực hành auto deploy với Gitlab CI nên các bạn cần phải có:
- 1 server riêng (VPS), chú ý là VPS chứ không phải Hosting nhé các bạn. Nên dùng của: AWS, Google, Azure, Digital Ocean
- 1 tài khoản Gitlab. Các bạn tự tạo trên trang gitlab.com nhé
> Các bạn nhớ đảm bảo là đã cài Docker và Docker-compose trên server nhé

Mình khuyến khích các bạn xem bài [Deploy ứng dụng Docker, NodeJS](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw) trước khi xem bài này. Để có thể hiểu được 1 số vấn đề về `UID:GID` khi viết Dockerfile nhé.

Bắt đầu thôi nào ;)
# Setup
Đầu tiên các bạn clone code của mình [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) về nhé (nhánh `master`). 

Sau khi clone về các bạn copy folder `cicd-auto-deploy` ra một nơi nào đó riêng biệt trên máy của các bạn, để lát nữa các bạn sẽ push code lên repository riêng của các bạn nhé.
## Tổng quan project
Ở bài này ta có 1 project Nodejs (Express) khá đơn giản với 3 routes: `/login`, `/register`, `/` (home). Database dùng MongoDB như thường lệ nhé :)

Cùng với đó mình đã setup test với Jest, để ta có thể test được 3 routes bên trên. Code test đặt ở folder `__tests__` nhé. Command chạy test là :`npm run test`

Nếu các bạn để ý sẽ thấy rằng ở bài này mình không dùng project CRUD sản phẩm như các bài trước, lí do vì project đó là dạng stateful application, ban đầu cần login, sau đó mỗi user sẽ có 1 session riêng để thao tác, nhưng vì `supertest` (hiện tại) không support lưu lại session, nên việc test API sẽ khá là khoai. Và khi demo với GitlabCI sẽ không được trực quan lắm.

Mình đã setup sẵn cho các bạn 1 CICD pipeline, được định nghĩa ở file `.gitlab-ci.yaml`với 3 stages:
- `build`: chỉ có 1 job, để build Docker image và push lên Registry
- `tests`: có 2 job là `linting` để check cú pháp, style bằng Eslint và `jest` để chạy test API dùng Jest
- `release`: chạy 1 trong 2 job `release-tag` hoặc `release-latest`, tuỳ thuộc vào chúng ta đang push code lên nhánh nào.

Về CICD thì mình đã giải thích ở bài [Automation test với Docker và GitlabCI](https://viblo.asia/p/automation-test-voi-docker-va-gitlab-ci-yMnKMv2DZ7P) rồi, nếu các bạn không hiểu thì xem lại ở bài đó nhé.

## Chạy thử ở local
Như thường lệ, để chắc chắn code hoạt động ta cùng chạy thử ở local trước nhé.

Và lại vẫn như thường lệ :joy:. Mục tiêu chạy ứng dụng Docker ở production là ta dùng non-root user, do vậy điều đầu tiên ta cần nhớ là luôn check xem user ở môi trường gốc của ta là gì nhé:
```
id -u
--->>> 501

id -g
--->>> 20
```
Như các bạn thấy ở trên user của mình có `UID:GID` là `501:20`

Do đó ta sửa lại Dockerfile với nội dung như sau:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

COPY . .

RUN adduser -D -u 501 appuser -G dialout

RUN chown -R appuser:dialout /app

USER appuser

CMD ["pm2-runtime", "ecosystem.config.js"]
```
Như ở trên các bạn thấy mình tạo 1 user với `UID` là `501` và thêm user đó vào group tên là `dialout`

`dialout` là group gì? lấy ở đâu ra vậy ???? :thinking::thinking:

Như mình đã giải thích rất kĩ về điều này ở bài [Deploy ứng dụng Docker, NodeJS](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw). Lí do là ở môi trường ngoài user của mình có `UID:GID` là `501:20`, và cái `GID=20`, trùng với 1 group tên là `dialout` trong container.

Tiếp theo ta tiến hành build image:
```
docker build -t cicd-auto-deploy .
```
Sau đó các bạn cập nhật lại tên image của service `app` trong `docker-compose.yml` thành `cicd-auto-deploy` nhé, cùng với đó là các bạn sửa lại  `user` ở service `db` để khớp với `UID:GID` ở môi trường gốc nhé:
```yaml
db:
    image: mongo
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    user: "501:20"
```
Sau đó chúng ta tiến hành khởi động project lên:
```
docker-compose up -d
```
Mở Postman và thử tạo vài Request để kiểm tra ứng dụng của chúng ta hoạt động ổn định:

![](https://images.viblo.asia/f75ef7a7-d4d8-45aa-8bb6-af6e84eff170.png)

Các bạn thử cả `/login` và thử truy cập vào `/` xem có trả về `Hello World` không nhé ;)

Sau bước này là ta đã đảm bảo là code vẫn hoạt động bình thường, chuyển tới phần kế tiếp nhé.

**Note cho bạn nào đang dùng Windows**: các bạn xem lại phần chú ý lúc mount volume cho MongoDB mình đã nói ở bài [Dockerize ứng dụng NodeJS, Mongo](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3#_chay-project-11) rồi nhé

## Kiểm tra user trên server
Bởi vì lát nữa code của chúng ta sẽ được tự động deploy trên server, vì vậy ta cần update lại phần tạo user ở Dockerfile để có `UID:GID` trùng với user mà ta sẽ chạy ở trên server thật.

Đầu tiên các bạn SSH vào server nhé. Sau đó ta lần lượt chạy các command sau để kiểm tra `UID:GID` của user hiện tại (là user lát nữa chạy command `docker-compose up`):

![](https://images.viblo.asia/f7fbd634-2b7c-4a6a-9648-c3087bf10ade.png)

Như ở trên các bạn thấy user trên server của mình có `UID:GID` là `1000:1000`

Tiếp theo ta quay trở lại local, sửa lại Dockerfile với nội dung như sau cho khớp với User trên server:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

COPY . .

RUN chown -R node:node /app

USER node

CMD ["pm2-runtime", "ecosystem.config.js"]
```
> Note: lí do ta dùng user `node` thì như các bài trước mình đã nói rất kĩ rồi nhé, vì là user `1000:1000` trùng với user `node` trong container.


Ta cũng cần sửa lại `user` ở service `db` trong `docker-compose.yml` nữa:
```yaml
db:
    image: mongo
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    user: "1000:1000"
```

Âu cây, ổn rồi đó, vậy là code của chúng ta đã sẵn sàng để deploy trên server, phần setup Docker cũng oke để chạy với user trên server rồi
## Chạy CICD pipeline
Tiếp theo ta sẽ tiến hành tạo repository, push code lên để chạy CICD nhé.

Các bạn quay trở lại Gitlab, tạo 1 project với tên là `cicd-auto-deploy`.

Sau đó các bạn cập nhật lại `docker-compose.yml` đoạn service `app`, sửa tên image lại cho khớp với tên repository của các bạn nhé, ví dụ của mình là:
```yaml
app:
    image: registry.gitlab.com/maitrungduc1410/cicd-auto-deploy:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
    env_file: .env
    volumes: 
      - ./coverage:/app/coverage
```
Ổn rồi đó, chúng ta tiến hành commit code lên Gitlab và xem kết quả nhé:
```
git init
git add .
git commit -m "first commit"
git remote add origin https://gitlab.com/maitrungduc1410/cicd-auto-deploy.git
git push -u origin master
```
Note: nhớ đổi lại tên username cho khớp với account của các bạn nhé ;)

Và ngay lập tức sau khi ta push code thì CICD pipeline sẽ được chạy, ta quay trở lại Gitlab để check nhé:

![](https://images.viblo.asia/62b40304-95e1-4a33-aa51-ab62b57afdbf.png)

Thử click vào ô đỏ như trong hình, ta sẽ thấy thông tin chi tiết pipeline của chúng ta như sau:

![](https://images.viblo.asia/40811c14-0a2e-4a0b-bd76-224591f07393.png)

Trong khi chờ pipeline hoàn tất (sẽ mất một lúc đấy :)), ta xem nhà có gì ăn thì lấy ra tóp tép chút trước khi quay trở lại chiến tiếp nhé :joy::joy:

Sau một hồi mò mẫm nhưng nhà chả có gì thì ta lại đành quay trở lại làm việc :D.

Các bạn F5 lại Gitlab, sẽ thấy pipeline của chúng ta đã hoàn tất:

![](https://images.viblo.asia/241c7b98-ac4a-4d6a-8ef0-5e6de4da44ff.png)


Ta kiểm tra ở `Packages & Registries` cũng sẽ thấy image của chúng ta đã được build và push vào registry trên Gitlab:

![](https://images.viblo.asia/bffdc983-d185-498a-9cb4-6c4a48c48b12.png)


Đến đây mọi thứ đã đầy đủ và sẵn sàng để ta có thể deploy trên server.

## Deploy lên server
Ta quay trở lại server, chọn một bất kì một nơi nào đó để bắt đầu làm việc, ở đây mình chọn `/var/www/html`:
```
cd /var/www/html
```
Tiếp theo ta tạo folder với tên là `cicd-auto-deploy`:
```
mkdir cicd-auto-deploy
```
Không như 2 bài deploy trước là ta phải lên server pull code về, build image rồi chạy. Thì ở bài này image ta đã được build sẵn ở CICD pipeline rồi, nên ở trên server ta chỉ cần pull image về và chạy.

Do vậy ở trong folder `cicd-auto-deploy` các bạn tạo cho mình những thứ như sau

Đầu tiên các bạn `cd` vào folder đã nhé:
```
cd cicd-auto-deploy
```
Tiếp theo ta tạo folder để mount volume cho service `db`
```
mkdir -p .docker/data/db
```
Sau đó ta tạo file `.env`:
```
nano .env
```
Nội dung file `.env` sẽ như sau:
```
DB_HOST=db
DB_PORT=27017
DB_NAME=cicd_automation_test
```
Tiếp sau đó ta tạo `docker-compose.yml`:
```
nano docker-compose.yml
```
Nội dung `docker-compose.yml` sẽ như sau:
```yaml
version: "3.4"

services:
  app:
    image: registry.gitlab.com/maitrungduc1410/cicd-auto-deploy:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
    env_file: .env
    volumes: 
      - ./coverage:/app/coverage

  db:
    image: mongo
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    user: "1000:1000"
```
Ổn rồi đó, ta tiến hành khởi động project lên nhé:
```
docker-compose up -d
```
Nếu các bạn thấy bị lỗi như sau:

![](https://images.viblo.asia/60664132-9dfd-440c-b65a-c282ebf32988.png)

Thì vì do image của chúng ta được lưu ở private registry trên Gitlab nên ta cần login vào registry nhé:
```
docker login registry.gitlab.com
```
Sau đó các bạn nhập email + password của account Gitlab của các bạn là được, và ta `docker-compose up -d` lại nhé

Đến đây app của chúng ta đã được chạy ở cổng `3000`. Nhưng nếu ta mở trình duyệt ở địa chỉ `<server_ip>:3000` thì sẽ không truy cập được vì như các bài trước mình đã nói. VPS ta mua mặc định sẽ không cho phép traffic từ thế giới bên ngoài đi vào, mà ta phải chỉ đích danh ta muốn cho phép traffic đi vào cổng nào.

Và để làm điều đó ta có 2 cách: 1 là làm thông qua trang web quản trị (nơi ta mua VPS, nên dùng cách này), 2 là dùng `UFW` (Firewall trên Ubuntu). Nếu làm qua trang web quản trị VPS thì nom sẽ như sau nhé (của mình là bên Azure):

![](https://images.viblo.asia/79f68f7c-dd20-4c8e-8530-83de152c29f1.png)

Còn nếu dùng UFW thì các bạn chạy command sau:
```
sudo ufw allow 3000
```
Ngay sau khi ta cho phép traffic đi vào cổng `3000` ta quay lại trình duyệt truy cập ở địa chỉ `<server_ip>:3000` , thấy trả về message Hello World là ổn rồi nhé:

![](https://images.viblo.asia/3d941aec-319b-4159-8036-d9aec44fb781.png)

Ta mở thử Postman, thử Register và Login xem mọi thứ đã ok chưa đã nhé:

![](https://images.viblo.asia/1663109d-246c-4b83-a95a-5f53f18db201.png)

![](https://images.viblo.asia/c0854e57-f6a5-4db4-8224-c904494b8a05.png)

Đến đây app của chúng ta đã được deploy thành công. Tiếp theo chúng ta sẽ bước vào tiết mục chính đó là tận dụng CICD để auto deploy, ta chỉ cần code ở local, commit, mọi thứ còn lại sẽ được tự động và code sẽ được deployed ở server thật ;)

> Fact: cho bạn nào muốn biết thêm, lí do ở trên ta phải mở allow cho traffic đi vào từng port cụ thể là vì VM (hay cũng gọi là VPS) của ta được deploy ở trong 1 Virtual Network (Azure gọi là Virtual Network - VNet, còn bên Google/AWS gọi là Virtual Private Cloud - VPC), trong virtual network đó mặc định Azure (Aws, Google cloud) tạo sẵn 1 subnet (hoặc do ta tự tạo), và VM của chúng ta thực tế nằm ở trong subnet này. Ở subnet đó sẽ được áp dụng Network Security Group (NSG), và việc ta mở traffic cho đi vào 1 port như ở trên thực tế là ta đang tạo 1 Inbound Port Rule ở trong Network Security Group - dịch ra đại loại là 1 rule cho traffic đi vào VM (inbound). Hiện tại hầu hết các nhà cung cấp cloud lớn bây giờ đều dùng kiểu kiến trúc này, vừa có thêm 1 lớp bảo mật (NSG) mà người dùng lại vừa dễ hơn trong việc thao tác với network (thêm các rules) chứ ta không cần trực tiếp cấu hình `Firewall` hay `Iptables` ở trong VM (đây sẽ là 1 ác mộng nếu nghịch linh tinh đó - mình đã thử rồi :rofl::rofl::rofl:)
# Auto deploy
Như các bạn thấy ở trên, khi deploy trên server, ta cần SSH vào server, sau đó pull image về (login vào registry nếu cần thiết), chạy `docker-compose down/up`. Các thao tác này tự ta phải trực tiếp làm.

Như ở bài [nhập môn CICD với Gitlab](https://viblo.asia/p/nhap-mon-cicd-voi-gitlab-07LKX9WPZV4) ta đã biết rằng pipeline của chúng ta được thực hiện bởi 1 thực thể có tên là Gitlab Runner. Và bây giờ, để thực hiện auto deploy thì ta sẽ setup trực tiếp ở pipeline, và người thực hiện deploy sẽ là Gitlab Runner, thay vì chúng ta phải trực tiếp làm như ở trên. Thực ra ở đây bản chất ta setup để Gitlab Runner cũng thực hiện những công việc như ta làm ở trên: SSH vào server, pull image, sau đó `down` và `up`

Việc SSH vào server ta thường dùng 2 cách: dùng SSH Key (khuyên dùng), hoặc dùng password (như ngày xưa ta thường làm). Nhưng vì nếu ở đây ta dùng password thì Gitlab Runner chỉ là máy sẽ không hiểu và không biết để tự nhập password vào được. Do vậy ta phải dùng SSH Key nhé

Thông thường để SSH vào server bằng SSH Key thì ta sẽ làm như sau (chi tiết cách làm [ở đây](https://serverpilot.io/docs/how-to-use-ssh-public-key-authentication/)):
- Ở local ta tạo SSH Key Pair, ta được cặp Public Key và Private Key
- Sau đó ta cần copy Public Key lên server
- Cuối cùng là thực hiện SSH từ local lên server như bình thường

> Note nhỏ nhưng quan trọng: ở lần đầu SSH ta sẽ được hỏi là có chấp nhận thêm IP của server vào file `known_hosts` ở local (ý hỏi lại cho chắc chắn có đúng là chúng ta biết rõ về cái IP đó là IP nào hay không ;)), ta phải đồng ý thì SSH mới được thực hiện. Các bạn nhớ điều này lát nữa bên dưới mình nói tới nhé

Và giờ mục đích của ta là thực hiện SSH trực tiếp khi chạy CICD pipeline, thì ta cũng sẽ cần phải làm những điều bên trên để từ trong pipeline, để Gitlab Runner có thể có quyền SSH vào server và thực hiện deploy:
- Tạo SSH Key pair mới dành riêng cho Gitlab Runner
- Copy Public key nào lên server
- Setup CICD pipeline để Gitlab Runner có thể login vào server

Ta bắt đầu nhé :rocket::rocket:

## Setup SSH Key cho Gitlab Runner
Đầu tiên, ở local các bạn chuyển tới 1 folder bất kì để ta lưu SSH Key nhé.

Tiếp đó các bạn mở Terminal tại folder ta vừa chuyển tới và chạy command sau để generate public và private key:
```
ssh-keygen
```
Khi được hỏi lưu key ở đâu các bạn nhập vào như sau:
```
./id_rsa
```
Tiếp theo nếu được hỏi có muốn nhập passphrase cho key hay không (dạng như kiểu password cho key) thì các bạn nhớ là ta **không** nhập nhé, cứ gõ Enter để cho qua. Lí do vì nếu ta nhập, đến khi Gitlab Runner thực hiện SSH thì sẽ bị yêu cầu nhập passphrase, và đương nhiên Gitlab Runner là máy chứ không phải người nên sẽ không làm được điều này do đó pipeline của chúng ta sẽ bị treo dẫn tới Failed

Cuối cùng ta sẽ thấy có 2 file sau được sinh ra:

![](https://images.viblo.asia/285946ae-1f50-4a87-ba00-3e586edb3547.png)

File có đuôi `.pub` là public key, file còn lại là private key nhé các bạn. 

Tiếp theo ta quay trở lại server, đảm bảo là ta vẫn đang là user - người mà chạy command `docker-compose up`
```
whoami
--->>james

id -u
--->> 1000

id -g
--->> 1000
```
Các bạn mở file sau lên:
```
nano ~/.ssh/authorized_keys
```
Sau đó ta copy nội dung file Public Key ở local và thêm vào ở dòng mới của file `authorized_keys`. Ví dụ của mình nom sẽ như sau:

![](https://images.viblo.asia/075cc19b-b74b-46b5-91f4-868e90fe954f.png)

Như các bạn thấy ở trên, server của mình hiện có 4 public key, mỗi public key trên 1 dòng

Oke vậy là xong nửa chặng đường, phùuuuuu, mệt quá :sob::sob:

**Note cho những bạn dùng Windows**: vì trên windows không có `ssh-keygen`, thì bạn có thể làm điều này ở máy nào đó là Linux hoặc đơn giản là lên luôn server để làm cũng được.

## Setup Gitlab CI
Tiếp theo các bạn quay lại repository trên Gitlab, chọn `Settings->CICD` và Expand phần `Variables` ra:

![](https://images.viblo.asia/92ba576c-da0d-4d40-a77d-4b3d289d7376.png)

Phần này sẽ định nghĩa những biến môi trường mà ta có thể truyền vào khi chạy pipeline, tức là ta có thể truy cập vào biến đó ở file `.gitlab-ci.yml`, lí do là bởi vì ta cần phải thiết lập một số thứ, ví dụ như Private key cho Gitlab Runner, ta không nên để cả nội dung dài dòng của file Private key ở file `.gitlab-ci.yml` mà nên dùng biến môi trường nhé :)

Ở đây ta sẽ cần thêm vào các biến môi trường như sau:
- `PATH_TO_PROJECT`: đường dẫn tới project ở trên server
- `SSH_PRIVATE_KEY`: Private Key mà ta vừa tạo ở trên
- `SSH_SERVER_IP`: địa chỉ IP của server
- `SSH_USER`: tên user dùng để truy cập server

Ta sẽ "xử" từng biến bên trên và tìm giá trị cho chúng nhé :muscle::muscle:

Đầu tiên với `PATH_TO_PROJECT` - đường dẫn tới project trên server, thì xác định khá đơn giản như sau, trên Server, ở folder project các bạn chạy command:
```
pwd

--->> /var/www/html/cicd-auto-deploy
```
Tiếp theo tới biến `SSH_PRIVATE_KEY` thì đơn giản là ta copy paste nội dung của file `id_rsa` (file Private key) mà ta tạo ở bên trên

Tiếp đó tới 2 biến `SSH_SERVER_IP` và `SSH_USER` thì các bạn tự xác định tuỳ vào user (dùng để SSH) và IP server của các bạn nhé

Cuối cùng thì ta sẽ có các biến môi trường trông như sau nhé:

![](https://images.viblo.asia/6360773c-c253-41fa-8fa5-95cd5ba5edc3.png)


tiếp theo ta quay trở lại local, mở lại project NodeJS chúng ta đang làm việc, mở file `.gitlab-ci.yml`, ta sẽ thêm vào 1 stage nữa với tên là `deploy` và ta tạo tương ứng 1 job tên là `deploy` với nội dung như sau nhé
```yaml
...

stages:
  - build
  - test
  - release
  - deploy
  
...

deploy:
  stage: deploy
  variables:
    GIT_STRATEGY: none
  only:
    - master
  before_script:
    - apk update && apk add openssh-client bash
  script:
    # chạy ssh-agent tương ứng với Gitlab Runner hiện tại
    - eval $(ssh-agent -s)

    # thêm nội dung của biến SSH_PRIVATE_KEY vào agent store
    - bash -c 'ssh-add <(echo "$SSH_PRIVATE_KEY")'
    
    # tạo folder ~/.ssh
    - mkdir -p ~/.ssh
    
    # Scan lấy SSH Host key cho địa chỉ IP server
    # Được kết quả bao nhiêu thì thêm vào file known_hosts
    - ssh-keyscan -H $SSH_SERVER_IP >> ~/.ssh/known_hosts
    
    # Sửa lại quyền của file known_hosts
    - chmod 644 ~/.ssh/known_hosts
    
    # Thực hiện SSH vào server, login vào Registry, chuyển tới folder project
    # Down project, pull image về, up project và xoá đi image cũ
    - >
      ssh $SSH_USER@$SSH_SERVER_IP
      "docker login -u ${CI_REGISTRY_USER} -p ${CI_REGISTRY_PASSWORD} ${CI_REGISTRY};
      cd ${PATH_TO_PROJECT};
      docker-compose down;
      docker pull ${CI_REGISTRY_IMAGE}:latest;
      docker-compose up -d;
      docker image prune -f;"
```
Giải thích về những thứ có trong job `deploy`:
- Đầu tiên ta khai báo job `deloy` thuộc stage `deloy`
- Tiếp theo ta khai báo 1 biến môi trường là `GIT_STRATEGY: none`, ý bảo là "Gitlab Runner ơi, chú không cần phải tốn thời gian clone code về làm gì đâu, vì giờ anh chỉ chơi với Docker image thôi". Vì mặc định nếu ta không nói gì thì ban đầu Gitlab Runner sẽ clone code về và setup 1 số thứ liên quan tới Git.
- Tiếp theo ta có `only: master` ý bảo job này chỉ thực hiện khi commit vào branch `master`. Suy ra sau này ta có thể có nhiều job deploy, kiểu `deploy-dev`, `deploy-staging` và thiết lập `only: dev` thì sẽ chỉ deploy khi commit vào nhánh `dev` chẳng hạn ;)
- Tiếp theo ở `before_script` ta cài `openssh-client` và `bash` để thực hiện các command liên quan
- Sau đó ở mục `script` chi tiết mình đã viết comment hết ở trên rồi bạn nào có thắc mắc thì để lại comment bên dứoi cho mình nhé ;)

Giải thích ở dòng `ssh-keyscan ...`, như ở đầu phần này mình đã nói, tại thời điểm đầu tiên khi SSH vào server ta sẽ bị hỏi là có muốn thêm server này vào danh sách những host được biết tới (known_hosts) - ý bảo là "chú có chắc là server này chú biết rõ hay không :D", và ta sẽ phải nhập Yes/No. Nhưng vì Gitlab Runner là máy không phải người nên sẽ không biết mà nhập yes, và dẫn tới Pipeline bị treo và Failed. Do vậy ta cần phải thêm sẵn thông tin server vào `known_hosts` để không bị hỏi khi ssh nữa nhé.

Nếu các bạn có để ý thì ngoài các biến môi trường ta định nghĩa thì có 1 số biến môi trường khác `CI_REGISTRY_USER`, `CI_REGISTRY_PASSWORD`, thì ở các bài trước mình đã nói chúng là gì rồi nhé, đây là các biến được định nghĩa sẵn bởi Gitlab. Các bạn có thể xem danh sách các biến đó [ở đây](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

Âu cây vậy là CICD của chúng ta được được setup để auto deploy, tiếp theo ta sửa lại code 1 chút, để in ra cái gì đó để lát nữa còn xem trực tiếp có đúng là app được deploy lại hay không chứ nhỉ. Các bạn mở file `routes/index.js`, ở route `/` ta sửa lại message như sau:
```js
router.get('/', (req, res, next) => {
  return res.json({
    message: 'Hello World - I\'m developer'
  })
})
```
Sau đó ta lưu lại nhé

Mục tiêu là lát nữa CICD chạy xong, app được deploy lại và truy cập trình duyệt ở địa chỉ `<serveR_ip>:3000` ta phải thấy được message mới này nhé

Cuối cùng giờ phút của sự thật đã tới, chúng ta tiến hành commit code :fearful::fearful::
```
git add .
git commit -m "setup auto deploy"
git push origin master
```
Sau đó ta quay lại repository trên Gitlab sẽ thấy CICD pipeline của chúng ta đã được kích hoạt:

![](https://images.viblo.asia/abe35807-962a-425f-b010-4a0195dff67b.png)

Sẽ mất một lúc để pipeline hoàn thành, trong thời gian đó ta tập dăm chục cái Squat, đi lại lòng vòng cho đỡ bị trĩ vì ngồi lâu :joy::joy:, hoặc làm cốc nước mở Schannel hít hà xem hôm nay showbiz có drama gì nhé ;)

Sau một lúc, chừng 10 phút, quay trở lại Gitlab, F5 thấy Pipeline toàn tích xanh :white_check_mark: là cuộc đời tươi đẹp rồi nhé các bạn:

![](https://images.viblo.asia/c2629b73-4745-4609-9742-8185c31248ec.png)


Sau đó ta mở trình duyệt ở địa chỉ `<server_IP>:3000` sẽ thấy rằng app của chúng ta đã được deploy lại:

![](https://images.viblo.asia/d3f1255d-9d7c-4794-859d-ee569580541b.png)


Đến đây chúng ta đã hoàn thành việc setup Auto Deploy cho Project Docker, việc của ta từ giờ chỉ là code và commit, tất cả mọi thứ còn lại: test style/api, build image, push lên registry, deploy lại trên server đều đã có Gitlab lo :kissing_heart::kissing_heart:

# Note về biến môi trường trên Gitlab
Nếu các bạn để ý khi tạo biến môi trường trên GItlab, ta thấy có option `Protect variable` và `Mask variable`, mỗi option lại có những lợi ích riêng ta cùng tìm hiểu nhé

Đầu tiên là option `Protect variable`, nếu ta chọn option này thì biến môi trường này sẽ chỉ được truy cập khi pipeline được chạy ở những branch hoặc tag được `protect`, mặc định thì branch `master` sẽ được protect, branch được protect thì sẽ không thể trực tiếp làm 1 số thao tác như xoá branch chẳng hạn (ối dồi ôi xoá `master` thì khốn nạn phết đớiiii :joy::joy:)

Để setup protected branch hoặc tag thì các bạn xem hình sau nhé:

![](https://images.viblo.asia/eae841d0-e94d-4092-aba6-a897c6392d8d.png)

Tiếp theo là option `Mask variable`, nếu ta chọn option này thì biến này sẽ được ẩn đi ở trong log khi chạy job. Trông sẽ như sau:

![](https://images.viblo.asia/85870537-e7b4-4dac-a6f7-19ac16a9c84d.png)

Sử dụng option này nếu trong trường hợp bạn cần in ra giá trị của biến nào đó  có nội dung nhạy cảm, và không muốn để lộ, nhưng chú ý là option này yêu cầu biến của ta phải đạt 1 số yêu cầu (đủ độ dài, nằm trên cùng 1 dòng, ... chi tiết các bạn xem [ở đây](https://gitlab.com/help/ci/variables/README#masked-variable-requirements))
# Lời kết series và hướng đi tiếp
Phùuuuuuuuuuuuuuuuuuu, viết xong bài này nom lại cũng dài vỡ mặt thớt :joy:

Qua bài này chúng ta đã cùng nhau đi tới level cuối của CICD là auto deploy, đúng với ý nghĩa của chứ CICD - Continuous Integration/Continuous Delivery (tích hợp/triển khai liên tục).

Việc kết hợp project với Docker, rồi CICD đã giảm thiểu cho chúng ta rất nhiều thời gian, tập trung hơn vào việc code. Chỉ cần commit, mọi thứ về sau sẽ được chạy tự động. Đây là điều mình muốn truyền tải tới các bạn trong cả series này.

Đây chắc cũng là bài cuối cùng mình viết về CICD (nhưng về Docker thì vẫn có thể có thêm :D). Vì mình thấy đến đây là đủ, các bạn muốn tìm hiểu sâu hơn thì tự vọc vạch, có gì thì có thể comment cho mình nhé. Vì mỗi project với mỗi ngôn ngữ, kiến trúc khác nhau sẽ có những pipeline rất khác, do vậy nếu đi sâu sẽ rất lan man :)

Qua series này mong rằng mình đã truyền tải được cho các bạn về Docker - một công cụ rất tuyệt vời trong việc ảo hoá môi trường tạo ra các môi trường mục tiêu để ta có thể chạy các project mà không cần quan tâm máy gốc của ta là gì, tận dụng CICD để tự động hoá tất cả các công đoạn lặp đi lặp lại. Các bạn cũng có thể thấy rằng ở thế giới DevOps deploy và maintain 1 project không hề đơn giản, có vô vàn lỗi, đọc blog của mình là 1 chuyện, khi làm vào project thật sẽ còn nhiều thứ khác phát sinh nữa mà các bạn phải tự tìm hiểu.

MÌnh thấy việc dùng tới Docker để deploy và CICD để tự động hoá đã rất là tốt rồi, nhưng ở các dự án thật (của công ty), thì người ta dùng tới 1 thứ nữa ở level cao hơn mà hiện nay rất hot đó là Kubernetes. Đây là 1 container orchestrator - người điều phối các ứng dụng container mà nó sinh ra để chạy production (production-ready). Mình cũng đã làm việc với nó một thời gian và thấy mọi thứ nó mang còn vi diệu hơn so với việc chỉ dùng Docker nữa, rất rất là tiện tiện luôn. Nhưng đương nhiên cần thêm rất nhiều kiến thức. Mình hi vọng nếu có thời gian mình cũng có thể viết 1 series về Kubernetes để chia sẻ những điều thú vị mình học được với mọi người.

Cám ơn các bạn đã theo dõi, hẹn gặp lại các bạn vào những bài sau ^^. Thân ái :hugs: