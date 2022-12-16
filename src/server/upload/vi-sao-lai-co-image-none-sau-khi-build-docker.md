### Mở đầu

Xin chào tất cả các bạn, lại là mình đây hôm nay mình đã quay trở lại và lần này chủ đề sẽ là build image với docker. Khi mình mới bắt đầu sử dụng docker để build image thì nó lại tạo ra khá nhiều image *`<none>`* mình cũng không biết tại sao lại như vậy, có cái xóa được cái lại không xóa được. 

Vậy còn các bạn có biết vì sao sau khi build image thì docker lại tạo ra một số image *`<none>`* như vậy không?

Nó ở đâu ra và có bị vấn đề gì nếu chúng ta xóa những image đó đi? Nếu bạn chưa rõ thì trong bài viết này mình sẽ giải thích vì sao lại như vậy nha. Bắt đầu thôi.

### Cài đặt docker

Ở trang chủ của docker đã có hướng dẫn chi tiết các bạn vào đấy là làm theo nha https://docs.docker.com/get-docker/

### Pull image từ docker hub

Sau khi đã cài thành công docker, chúng ta chạy lệnh

```shell
docker images
REPOSITORY   TAG   IMAGE   ID   CREATED   SIZE
```

Như vậy tức là trong máy chưa có image nào cả. Hãy thử pull image về xem sao.

```shell
$ docker pull nginx:1.19.0
```

Và sau đó kiểm tra lại 

```shell
$ docker image
REPOSITORY  TAG          IMAGE ID      CREATED       SIZE
nginx       1.19.0       2622e6cca7eb  5 months ago  132MB
```

Vậy chúng ta đã pull thành công 1 image rồi đó.

#### Tự build image

Giả sử mình có 1 app express như sau.

```Javascript
// main.js
var express = require('express');
var util = require('util');
var app = express();
app.get('/', function(req, res) {
  res.send('Hello World');
});
app.listen(process.env.PORT || 80);
```

```JSON
// package.json
{
  "name": "hello-world-express",
  "version": "0.0.1",
  "main": "main.js",
  "scripts": {
    "start": "node main.js"
  },
  "dependencies": {
    "express": "^4.14.0"
  }
}
```

Và chúng ta tạo thêm file `Dockerfile` để build image cho app.

```shell
FROM node:15.2.1-alpine3.10
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ .
EXPOSE 80
CMD ["npm", "start"]
```

Đã chuẩn bị xong, bây giờ chúng ta sẽ build image này. 
```shell
$ docker build -t myapp:1.0 . 
Sending build context to Docker daemon  4.096kB
Step 1/7 : FROM node:15.2.1-alpine3.10
15.2.1-alpine3.10: Pulling from library/node
21c83c524219: Pull complete 
df6578baf25c: Pull complete 
0bf5b53d9b01: Pull complete 
6805356279ee: Pull complete 
Digest: sha256:c3bdce7cf8883746a16ac4f7c610eda328a44fc5a077d9af858e542c1dc47c09
Status: Downloaded newer image for node:15.2.1-alpine3.10
 ---> 3e01c37e4558
Step 2/7 : WORKDIR /app
 ---> Running in 05eed84217a7
Removing intermediate container 05eed84217a7
 ---> 0bac4bad2b99
Step 3/7 : COPY package.json ./
 ---> 60f4a2fd29ee
Step 4/7 : RUN npm install
 ---> Running in 800919ad55a9

added 50 packages, and audited 50 packages in 3s

found 0 vulnerabilities
npm notice 
npm notice New patch version of npm available! 7.0.8 -> 7.0.12
npm notice Changelog: <https://github.com/npm/cli/releases/tag/v7.0.12>
npm notice Run `npm install -g npm@7.0.12` to update!
npm notice 
Removing intermediate container 800919ad55a9
 ---> 5582c1729b98
Step 5/7 : COPY ./ .
 ---> afe3964319df
Step 6/7 : EXPOSE 80
 ---> Running in cadbb2f9411f
Removing intermediate container cadbb2f9411f
 ---> 48bbd38382b3
Step 7/7 : CMD ["npm", "start"]
 ---> Running in e17ad1338a0f
Removing intermediate container e17ad1338a0f
 ---> b55361fd33ac
Successfully built b55361fd33ac
Successfully tagged myapp:1.0
```

Phía trên đây là log khi chúng ta build 1 image. Mỗi dòng command trong file Dockerfile sẽ là từng Step (Mình có 7 lệnh nên có 7 Step).  Các bạn có để ý đoạn

```
---> Running in xxxxxxxxxxxx
Removing intermediate container xxxxxxxxxxxx

---> yyyyyyyyyyyy
````

ở trên không.

- Đây là container **xxxxxxxxxxxx** tạo ra để chạy các command và sau đó container đó được remove đi.
- Còn **yyyyyyyyyyyy** chính là image được tạo ra sau khi chạy command trên.

Có một vài điều xảy ra nữa ở đây:
- Ở image đầu tiên được tạo ra nó có tag là *node:15.2.1-alpine3.10*
- Image cuối cùng có tag là *myapp:1.0*
- Nhưng trong quá trình build nó có 5 step sẽ tạo ra image không có đánh tag.

Thử check lại các image có trong máy nào.
```shell
$ docker images
REPOSITORY                                 TAG                 IMAGE ID            CREATED             SIZE
myapp                                      1.0                 b55361fd33ac        9 minutes ago       113MB
nginx                                      1.19.0              2622e6cca7eb        5 months ago        132MB
node                                       15.2.1-alpine3.10   3e01c37e4558        35 hours ago        109MB
```

Đã có thêm 2 image mới chính là
- *myapp:1.0*: Image mà chúng ta build được từ app express.
- *node:15.2.1-alpine3.10*: Image được pull về trong file Dockerfile.

Nhưng khi bạn gõ lệnh `docker images -a` (hiển thị tất cả image) thì bạn sẽ thấy thêm 5 image `<none>` mới. Nó tương ứng với 5 image trung gian (*intermediate images*) mà mình đã nói ở trên.

```shell
$ docker images -a
REPOSITORY                                 TAG                 IMAGE ID            CREATED              SIZE
myapp                                      1.0                 8ae31a9c3466        About a minute ago   113MB
<none>                                     <none>              47cb451b88d3        About a minute ago   113MB
<none>                                     <none>              3179cf4d7514        About a minute ago   113MB
<none>                                     <none>              7ea8dcf99d95        About a minute ago   113MB
<none>                                     <none>              8ef78ac11d3e        About a minute ago   109MB
<none>                                     <none>              b83d00d084ba        About a minute ago   109MB
nginx                                      1.19.0              2622e6cca7eb        5 months ago         132MB
node                                       15.2.1-alpine3.10   3e01c37e4558        35 hours ago         109MB
```

Và tiếp theo chúng ta sẽ gõ lệnh `docker images dangling=true`  đễ show danh sách image mà không có tag và không được sử dụng ở đâu cả. Hay còn gọi là *dangling images*

```
docker images --filter dangling=true
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
```

Chúng ta sẽ không thấy image nào.

**Lưu ý**: *intermediate images* khác với *dangling images* nha các bạn. *intermediate images* cũng không có tag (`<none>`) nhưng nó được sử dụng trong images *myapp:1.0*. Và có thể các step cũng tạo ra *dangling images* tùy vào command trong file Dockerfile nha.

### Build image tạo ra các image dangling

Hãy thử thay đổi 1 chút code trong app express của chúng ta.

```
var express = require('express');
var util = require('util');
var app = express();
app.get('/', function(req, res) {
  res.send('Hello World!!!');
});
app.listen(process.env.PORT || 80);
```

Sau đó build lại image 
```
docker build -t myapp:1.0 .
```

Tương tự như log ở trên, bây giờ gõ lại lệnh `docker images --filter dangling=true` chúng ta sẽ thấy có 1 dangling image.

```
docker images --filter dangling=true
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
<none>              <none>              8ae31a9c3466        15 hours ago        113MB
```

Các bạn để ý Image ID **8ae31a9c3466** chính là image của *myapp:1.0* mà chúng ta đã build trước đó, nhưng giờ nó đã trở thành image *`<none>`*.
Vì chúng ta đã thay đổi code và build lại image *myapp:1.0* nên image cũ bị gỡ tag đi. Giờ đây nó đã thành dangling image rồi.
Vậy có nghĩa là nếu chúng ta build lại image mà đánh tag giống nhau thì image cũ sẽ thành danling image.

### Vậy gỡ nó đi có được không?

Giả sử lâu nay bạn đã sử dụng rất nhiều lệnh build như trên nhưng lại không biết nó tạo ra dangling image như vậy. Giờ chúng ta xóa nó đi thì có bị ảnh hưởng gì không?
Câu trả lời là không ảnh hưởng đến image mới nhất bạn đã build, nếu cần thiết chúng ta nên remove các dangling image này đi để giải phóng dung lượng ổ cứng.

```
$ docker image prune
WARNING! This will remove all dangling images.
Are you sure you want to continue? [y/N] y
Deleted Images:
deleted: sha256:8ae31a9c34...2c0e67f07c
deleted: sha256:3179cf4d75...4dc6c7491e
deleted: sha256:47cb451b88...12fab14396
deleted: sha256:cea5d4e6f9...da71b620af

Total reclaimed space: 480B
```

Nếu đã lâu bạn chưa gỡ những image này đi thì chắc sẽ có kha khá dung lượng ổ cứng được giải phóng đấy.
Lưu ý: Lệnh này chỉ gỡ được *dangling images* thôi. Còn các *intermediate images* sẽ không xóa được nha. Trừ khi bạn xóa image *myapp:1.0* thì các images này sẽ bị xóa theo.

### Tổng kết

Khi build docker thì nó sẽ tự tạo ra các image `<none>` tag. Đó là *dangling images* và *intermediate images* nhưng giữa chúng có sự khác biệt:
-  *intermediate images*: image tạo ra để mỗi khi build mà không có thay đổi gì thì nó sẽ sử dụng lại cache từ image cũ, điều đó làm tăng tốc độ build image lên. 
-  *dangling images*: image bị dư ra mỗi khi build và không còn dùng nữa. 

Cám ơn các bạn đã đọc bài viết này của mình, nếu có sai sót gì thì các bạn hãy góp ý cho mình nhé. Chúc các bạn làm việc và học tập hiệu quả nha :)))))