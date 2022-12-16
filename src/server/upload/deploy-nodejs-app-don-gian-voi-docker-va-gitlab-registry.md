## I. Lời mở đầu
![](https://images.viblo.asia/4762f16a-fc33-43d8-939d-f9d2bd45b2f9.png)

Tình hình là thời gian vừa rồi mình có code một trang web bán hàng. Sau khi code xong mình muốn sử dụng nó trên website mà vẫn chưa biết làm thế nào. Vậy là mình có đi tìm hiểu và được biết là phải deploy code đó lên hosting hoặc server thì mới sử dụng được. Vậy là mình quyết định thuê 1 server của Linux có giá là 200$/year. Sau vài ngày lang thang trên viblo cuối cùng mình cũng tìm hiểu được một số cách deploy code của mình lên server này. Mình có đọc được một bài có tâm và rất là hay: [Cái nhìn tổng quan về một dự án web](https://viblo.asia/p/cai-nhin-tong-quan-ve-mot-du-an-web-oOVlYzaz58W)

 Trong bài biết gợi ý sử dụng một số các cách deploy sau:
1. Deploy bằng cơm: Bạn SSH thẳng lên server và pull code mới từ github hoặc gitlap về đó.
2. Deploy bằng rockerteer: https://github.com/rocketeers/rocketeer
3. Deploy bằng deployer: https://deployer.org/
4. Deploy bằng docker.

Nếu các bạn từng theo dõi các bài viết viblo của tác giả trên, chắc hẳn các bạn có thấy bạn đó có rất nhiều các bài viết về Docker trong series [Tìm hiểu về Docker](https://viblo.asia/s/2018-cung-nhau-hoc-docker-Wj53Omjb56m). Mình đã tìm hiểu theo series và đã deploy web bán hàng của mình bằng docker thành công. Trong bài viết này thì mình sẽ đi sâu vào phần ứng dụng docker vào dự án. Cụ thể là deploy Node.js app đơn giản bằng việc sử dụng Docker và Gitlab Registry.
## II. Nội dung chính

![](https://images.viblo.asia/ef9420d5-6aa2-4299-8d05-5864e124d18e.jpg)

Hãy đảm bảo rằng khi đọc đến đây các bạn đã có kiến thức cơ bản về docker: Docker Container, Docker Image, Docker Registry... và một số docker CLI: build, push, pull, login, ...

**Source code:** https://github.com/vanquynguyen/node-server

### 1. Tạo group, repository cho dự án trên gitlab
- Như bạn đã biết một trang web sẽ gồm rất nhiều thành phần: Api project, Frontend project, ... và vô vàn services đi kèm nữa. Với dự án của mình thì mình tạo 1 group có tên là web-sale và chứa một số project nhỏ trong đó.

![](https://images.viblo.asia/29ba1e9c-9013-46b0-9048-65fa1742bcb1.png)

Sau khi tạo xong group như trên, bạn hãy tạo các project liên quan. Ở bài viết này mình chỉ hướng dẫn deploy node.js app. Còn các project khác mình sẽ chia sẻ ở các bài viết sắp tới.

![](https://images.viblo.asia/f9c3ab36-ec23-4129-b7e0-d5686073ed1b.png)

Để có thể thao tác lên registry gitlab bạn click vào project và chọn Container Registry như bên dưới.

![](https://images.viblo.asia/f9c55059-1dbb-4fb4-be52-805956ade329.png)

Đừng quên vào tạo một token để máy có bạn có thể login vào gitlab registry để sử dụng các docker CLI.

![](https://images.viblo.asia/5cc94948-42d9-40df-8aca-6a0af5c44a6b.png)

### 2. Tạo Node.js app và viết Dockerfile
#### Tạo Node.js app
- Bạn mở command line lên vào gõ:
```cmd
    mkdir node-server
```
- Sau đó tạo liên kết đến npm
```cmd
    npm init
```
- Tạo file index.js, .env.example
```cmd
    touch index.js env.example
```
Và đây là nội dung của file index.js
```js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors')
const app = express();
app.use(cors());

app.get('/', async (req, res) => {
   console.log('Hello world');
});

app.listen(process.env.PORT);
```
Tạo file .env
```cmd
    cp .env.example .env
```
Các bạn chạy thử app sẽ thấy:

![](https://images.viblo.asia/a5d4635e-5841-4f00-8f6e-bce5ece16fd4.png)

Một dự án sẽ gồm rất nhiều yếu tố ở đây thì mình không thể show hết code ra được. Nên đây là một app basic và tượng trưng.

#### Viết Dockerfile
Bạn tạo một folder có tên là docker
```cmd
    mkdir docker
```
Tạo Dockerfile
```cmd
    cd docker
    touch Dockerfile
```
Và trong Dockerfile:
```docker
FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-freefont-ttf \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN  yarn install

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]
```
#### Thao tác đến Registry Gitlab
Để deploy bạn chạy lần lượt command bên dưới:
+ Login vào gitlab để sử dụng CLI:
```js
    docker login registry.gitlab.com -u USERNAME -p TOKEN
```
![](https://images.viblo.asia/a4ff8d2a-08eb-44b2-9e89-364b8ab847bc.png)

+ Build image từ Dockerfile:
```js
    docker build . -f docker/Dockerfile -t IMAGE:CHANNEL
```

![](https://images.viblo.asia/7f71bcd3-a30d-41ea-b4ad-39102c961037.png)

![](https://images.viblo.asia/c6965387-1868-4822-a95c-da9b8e58a40e.png)

+ Push image đã build lên gitlab registry:
```js
    docker tag IMAGE:CHANNEL IMAGE:TAG
	docker push IMAGE:TAG
	docker push IMAGE:CHANNEL
```
![](https://images.viblo.asia/da029f79-ce15-429c-94d5-f26ccb7df2ce.png)

Kiểm tra trong container đã có image thì bạn đã push thành công rồi đó.

![](https://images.viblo.asia/2c337dbc-3638-41cb-a42d-9c1210794501.png)

+ Deploy image lên server và update lại image cho app:
```js
    ssh -t DEPLOYER@SERVER "docker pull IMAGE:TAG && docker pull IMAGE:CHANNEL"
	ssh -t DEPLOYER@SERVER "docker service update node-server --image IMAGE:TAG --with-registry-auth --force --detach"
```

Tổng kết
```js
login:
    docker login registry.gitlab.com -u USERNAME -p TOKEN
build:
    docker build . -f docker/Dockerfile -t IMAGE:CHANNEL
push:
    docker tag IMAGE:CHANNEL IMAGE:TAG
	docker push IMAGE:TAG
	docker push IMAGE:CHANNEL
deploy:
    ssh -t DEPLOYER@SERVER "docker pull IMAGE:TAG && docker pull IMAGE:CHANNEL"
	ssh -t DEPLOYER@SERVER "docker service update node-server --image IMAGE:TAG --with-registry-auth --force --detach"
```
- USERNAME: username của bạn trên gitlab
- TOKEN: deploy_token mà bạn tạo trên gitlab
- IMAGE: registry.gitlab.com/web-sale/node-server
- CHANNEL: Branch hiện tại của bạn
- TAG: tag name của pull
- DEPLOYER: username ssh server
- SERVER: IP server

## III. Tạm kết
Vậy là các bạn đã biết cách deploy Node.js app đơn giản bằng docker rồi đúng không nhỉ. Tuy nhiên khi dự án càng lớn, sử dụng nhiều package, Dockerfile sẽ phải thêm bớt khá nhiều. Hy vọng bài viết hữu ích giúp cách bạn có thể deploy bằng docker dễ dàng hơn. Rất mong được sự góp ý của mọi người.

![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)