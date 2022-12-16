# Từ phát triển tới triển khai phần 2: Frontend, VueJS, SPA - SSR

- Code xong web chưa? Sao anh vào chưa thấy gì?
- Để em push lên.

3 minutes later...

- Trang web đã lên, a truy cập vào địa chỉ này `https://myawesomeproject.com` là thấy.

Vậy là chỉ sau 1 cái push, không cần động tới server, không cần hì hụi cài cắm nào `nodejs` nào `build tool` nào `nginx`, sau 3 phút dự án mới của bọn mình đã online với domain được tự trỏ, ssl được tự tạo, và code thì chạy ngon lành (hy vọng thế).

Đây là một đoạn trích trong tiểu thuyết nổi tiếng **"Devops phiêu lưu ký"** của mình. Bạn nào không biết cuốn tiểu thuyết này thì cũng không sao, vì mình chưa có xuất bản, mà cũng chưa có viết luôn. 

Đoạn trích tuy không thấy có dấu hiệu nào của một **devops**, tuy nhiên chỉ nhìn việc sau khi push code lên lần đầu **3 phút** mà dự án đã chạy cũng sẽ đủ hiểu đã có bao nhiêu công sức của devops ở đây. 

Làm thế nào để mọi thứ tự động? Làm sao để domain tự nó biết mà trỏ tới đâu, làm sao để website có **cái dấu tick xanh trên thanh địa chỉ** một cách tự động, làm sao mà code chạy được mà chẳng cần động gì vào server? Đây là những câu hỏi mà bài viết này sẽ **không trả lời**, rất tiếc.

**NHƯNG,** làm thế nào để code của bạn **sẵn sàng** cho một chu trình tự động như vậy, thì hãy cố gắng đọc tới hết bài nhé.

## First things first

Vâng và xin thưa các bạn, lại là mình đây - **Minh Monmen** sẽ trở lại trong bài viết tiếp theo về những developer hiện đại với những sản phẩm hiện đại.

Tiếp tục chặng đường còn dang dở **Từ phát triển tới triển khai**, bài viết này mình sẽ mang đến cho các bạn 1 số vấn đề liên quan tới việc chuẩn bị sản phẩm của mình sao cho tốt để sẵn sàng tích hợp với những hệ thống triển khai tự động. Cụ thể hơn là với 1 stack frontend xoay quanh **VueJS**, một js framework thuộc top 3 những thằng js đáng học nhất trong quá trình trở thành **Frontend developer**.

Lét sờ bi gin.

## Yêu cầu kiến thức

Để lĩnh hội đầy đủ tinh hoa (hoặc mấy thứ vớ vẩn) trong bài viết này thì mình đề nghị các bạn có cho mình trước những kiến thức sau:

- **Docker và docker-compose (như những bài trước thôi)**
- **Multistage build (cái này có thể hơi khó hiểu, các bạn xem các tut trên mạng kỹ nhé)**
- **Single Page Application, Server Side Rendering**
- **VueJS (hoặc bất kỳ thằng js nào trong họ 3 thằng React, Angular, VueJS)**

Check đủ cả rồi chứ? Ô kê tiến thôi.

## Vấn đề 

Vậy thì vấn đề của stack này nằm ở đâu? Có khác gì so với việc xây dựng API?

- **Dev image:** Trong trường hợp các bạn sử dụng dev tool của framework (chạy trên node) thì image để chạy dev sẽ khác gì production?
- **Biến môi trường:** Làm cách nào để sử dụng được biến môi trường trong 1 ứng dụng SPA chạy bằng nginx?

Chúng ta sẽ cùng đi sâu vào giải quyết từng vấn đề một:

### Dev image:

#### Ứng dụng chạy SSR với server Nodejs

Để có thể demo cho các bạn được đầy đủ sự khác biệt của 2 ứng dụng SPA và SSR thì mình sẽ sử dụng 1 framework của VueJS gọi là **NuxtJS**. Đây là framework tương tự **NextJS** rất nổi tiếng của hệ sinh thái **React**, cho phép chúng ta tạo ra ứng dụng **SPA** hay **Universal** một cách nhanh chóng và dễ dàng. Hãy bắt đầu với `Dockerfile` và `docker-compose.yml` cơ bản sau:

```Dockerfile
FROM node:alpine

# 1. Expose port and set work dir
EXPOSE 3000
WORKDIR /app
```

```yaml
version: "3.4"
services:
    docker-vue-frontend:
        container_name: docker_vue_frontend
        build: .
        user: "${UID_GID}"
        volumes:
            - ./src:/app
        ports:
            - "3000:3000"
        environment:
            - NODE_ENV=production
            - PORT=3000
            - HOST=0.0.0.0
```

> Các bạn nếu tinh ý thì có thể phát hiện ra file docker-compose.yml mình dùng trong bài viết lần này sử dụng **version 3.4**. Việc sử dụng phiên bản mới này để hỗ trợ tính năng **multistage build** mình sẽ đề cập trong phần sau.

Về cơ bản thì 2 file này tương tự những file mình đã setup cho môi trường **NodeJS** lần trước thôi, không có gì phải nói ở đây cả.

Tiếp theo mình khởi tạo nuxt project bằng việc chạy `yarn create nuxt-app .` trong container (được hỗ trợ bằng file `compose_run.sh` mà mình đã viết)

```bash
$ script/compose_run.sh yarn create nuxt-app .
yarn create v1.13.0
[1/4] Resolving packages...
...
? Project name docker-vue-frontend
? Project description Frontend app with vue
? Use a custom server framework express
? Choose features to install (Press <space> to select, <a> to toggle all, <i> to invert
 selection)
? Use a custom UI framework none
? Use a custom test framework none
? Choose rendering mode Universal
? Author name Minh Monmen
? Choose a package manager yarn
...
Done in 88.82s.
```

Đây là kết quả khởi tạo project. Giờ là lúc sửa đổi `Dockerfile` một chút và thêm vào môi trường phát triển bằng file `docker-compose.dev.yml`. Các bạn nhớ thêm thư mục `.nuxt` vào file `.dockerignore` nhé, để docker không copy phần code đã build của các bạn vào image mà build lại từ đầu

```Dockerfile
FROM node:alpine

# Expose port and set work dir
EXPOSE 3000
WORKDIR /app

# Copy and install node dependencies
ADD src/package.json src/yarn.lock /app/
RUN yarn --pure-lockfile

# Copy source code
ADD ./src /app

# Build code
RUN yarn build

# Start my application
CMD ["yarn", "start"]
```

```yaml
# docker-compose.dev.yml
version: "3.4"
services:
    docker-vue-frontend:
        container_name: docker_vue_frontend
        tty: true
        build: .
        user: "${UID_GID}"
        volumes:
            - ./src:/app
        ports:
            - "3000:3000"
        environment:
            - NODE_ENV=development
            - PORT=3000
            - HOST=0.0.0.0
        command: yarn dev --L
```

Các bạn vẫn theo kịp mình đấy chứ? ở trên mình có định nghĩa thêm `tty: true` để các bạn có thể theo dõi được % build trên terminal, và chạy môi trường dev bằng lệnh `yarn dev --L` với `--L` là param báo cho `nodemon` biết nó đang chạy trong hệ thống file của docker.

Và hãy thử start môi trường dev lên xem thế nào:

```bash
$ script/compose_start.sh dev

Recreating docker_vue_frontend ... 
Recreating docker_vue_frontend ... done
Attaching to docker_vue_frontend
yarn run v1.13.0
$ cross-env NODE_ENV=development nodemon server/index.js --watch server --L
docker_vue_frontend    | events.js:173
docker_vue_frontend    |       throw er; // Unhandled 'error' event
docker_vue_frontend    | Error: spawn nodemon ENOENT
docker_vue_frontend    |     at Process.ChildProcess._handle.onexit (internal/child_process.js:246:19)
...
```

Opps! Có gì đó không đúng ở đây rồi. Mình đã gặp cái lỗi này và loằng ngoằng hết cả buổi tối chỉ để tìm ra một cách fix rất đơn giản đó chính là upgrade `nodemon` mặc định của project lên:

```bash
$ script/compose_run.sh yarn upgrade nodemon

yarn upgrade v1.13.0
[1/4] Resolving packages...
...
└─ yallist@3.0.3
Done in 30.34s.
```

Và viola, project của mình đã chạy được một cách **thần kỳ** trên môi trường dev:

```bash
$ script/compose_start.sh dev                                                                                

Starting docker_vue_frontend ... 
Starting docker_vue_frontend ... done
Attaching to docker_vue_frontend
yarn run v1.13.0
$ cross-env NODE_ENV=development nodemon server/index.js --watch server --L
docker_vue_frontend    | [nodemon] 1.18.10
...
docker_vue_frontend    | 15:08:01  READY  Server listening on http://0.0.0.0:3000
```

Với môi trường production sử dụng SSR với phần server chạy bằng **NodeJS**, thì tới đây coi như hoàn tất việc cấu hình cả 2 môi trường. Các bạn có thể thử chạy ứng dụng này với cấu hình production bằng lệnh:

```bash
# Phải build trước rồi mới chạy là vì docker-compose vẫn đang mount toàn bộ thư mục code 
# từ bên ngoài, tức là cần phải có cả thư mục kết quả build nữa. Còn image build bằng Dockerfile
# phía trên đã có sẵn lệnh build rồi
$ script/compose_run.sh yarn build

yarn run v1.13.0
ℹ Production build                          15:09:20
✔ Builder initialized                       15:09:20
✔ Nuxt files generated                      15:09:20
✔ Client
  Compiled successfully in 7.34s
✔ Server
  Compiled successfully in 1.69s
...
Done in 13.27s.

$ script/compose_start.sh 

Recreating docker_vue_frontend ... 
Recreating docker_vue_frontend ... done
Attaching to docker_vue_frontend
docker_vue_frontend    | yarn run v1.13.0
docker_vue_frontend    | $ cross-env NODE_ENV=production node server/index.js
docker_vue_frontend    | 15:11:18  READY  Server listening on http://0.0.0.0:3000
```

#### Ứng dụng SPA với server nginx

Dù kết quả của việc xây dựng này là mình đã tạo ra được môi trường dev hoàn chỉnh, cộng với image để deploy production khá chuẩn bài rồi, tuy nhiên nếu mình xây dựng một ứng dụng SPA thì việc chạy container bằng server nodejs có thể sẽ không hiệu quả bằng việc chạy với nginx. Làm cách nào để thay đổi được nhỉ?

Vốn là một người lười, vậy nên mình đã tìm cách tích hợp mọi thứ vào duy nhất 1 file `Dockerfile` để phục vụ cho cả 2 mục đích trên. Và thật may làm sao, kiểu mình làm còn tối ưu được cho cả quá trình **CI/CD** về sau này nữa. Nhờ việc tìm ra một khái niệm rất hay của docker đó là **multistage build** mà mình không những tạo được image đáp ứng nhiều môi trường mà còn phục vụ tốt cho quá trình build tự động sau này nữa.

Đầu tiên hãy sửa lại file `src/nuxt.config.js` để chuyển nuxt sang chế độ SPA nào:

```js
...
module.exports = {
  mode: 'spa',
  ...
}
```

Tiếp đến hãy sửa lại `Dockerfile` để phù hợp với multistage build:

```Dockerfile
##### builder image #####
FROM node:alpine AS builder

EXPOSE 3000
WORKDIR /app

ADD src/package.json src/yarn.lock /app/
RUN yarn --pure-lockfile

ADD ./src /app

RUN yarn build
##### end builder image #####

##### runtime image #####
FROM nginx:stable-alpine

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
##### end runtime image #####
```

> `config/nginx.conf` là file config cho nginx mình đã để trong project mẫu cuối bài viết các bạn có thể tham khảo.

Ta có thể thấy `Dockerfile` này gồm có 2 phần, phần `builder` là phần chạy nodejs dùng để build code và phần phía sau chạy nginx mới là image kết quả cuối cùng. Để chạy được `Dockerfile` này, ta phải sửa lại các file `docker-compose.yml` một chút:

```yaml
# docker-compose.yml
version: "3.4"
services:
    docker-vue-frontend:
        container_name: docker_vue_frontend
        # add image name and tag 
        image: docker-vue-frontend
        build: .
        user: "${UID_GID}"
        # change volume and port
        volumes:
            - ./src/dist:/usr/share/nginx/html
        ports:
            - "8080:80"
        environment:
            - NODE_ENV=production
```

```yaml
# docker-compose.dev.yml
version: "3.4"
services:
    docker-vue-frontend:
        container_name: docker_vue_frontend
        # add image name and tag 
        image: docker-vue-frontend:dev
        # add build target
        build: 
            context: .
            target: builder
        user: "${UID_GID}"
        volumes:
            - ./src:/app
        ports:
            - "3000:3000"
        environment:
            - NODE_ENV=development
            - PORT=3000
            - HOST=0.0.0.0
        command: yarn dev --L
```

Các bạn sẽ thấy trong chỉ định `build` của mình ngoài `context` là đường dẫn tới Dockerfile ra thì còn có thêm `target`, nghĩa là docker-compose sẽ sử dụng phần image được đánh dấu với tên gọi **builder** chứ không phải là image cuối cùng. Và bởi vì phần **builder** không chứa lệnh `CMD`, do đó ta phải add command vào docker-compose.yml để có thể chạy được container.

Giờ thử build lại image và chạy xem thế nào?

```bash
# Build cho dev
$ script/compose_build.sh dev

Building docker-vue-frontend
Step 1/7 : FROM node:alpine AS builder
 ---> ebbf98230a82
...
Step 7/7 : RUN yarn build
 ---> Using cache
 ---> 775395132ac0

Successfully built 775395132ac0
Successfully tagged docker-vue-frontend:dev
```

```bash
# Build cho prodution trên local
$ script/compose_build.sh

Building docker-vue-frontend
Step 1/11 : FROM node:alpine AS builder
 ---> ebbf98230a82
...
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Using cache
 ---> f92eee0aab62

Successfully built f92eee0aab62
Successfully tagged docker-vue-frontend:latest
```

Và giờ là chạy thử với 2 môi trường, `dev` trên node server và `production` trên nginx. Lưu ý khi chạy với `docker-compose` dưới local, mình có nói đi nói lại 1 điều là vì `docker-compose` sẽ mount thư mục kết quả cuối cùng của các bạn nên các bạn sẽ phải tự chạy các tiến trình build code rồi mới có thể start nhé.

```bash 
# Chạy dev với node server
$ script/compose_start.sh dev

Recreating docker_vue_frontend ... 
Recreating docker_vue_frontend ... done
...
docker_vue_frontend    | 16:15:44  READY  Server listening on http://0.0.0.0:3000
```

```bash
# Build code ra static file
$ script/compose_run.sh yarn build

yarn run v1.13.0
...
Done in 9.30s.

# Chạy production với nginx server
$ script/compose_start.sh

Recreating docker_vue_frontend ... 
Recreating docker_vue_frontend ... done
Attaching to docker_vue_frontend

docker_vue_frontend    | 172.22.0.1 - - [20/Mar/2019:16:33:37 +0000] "GET / HTTP/1.1" 200 919 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0" "-"
```

Tèn ten ten ten, vậy là mình đã chạy được ứng dụng dạng **SPA trên server nginx**, hoặc chạy **dev với hot-reload trên server nodejs**, tất cả chỉ cần 1 `Dockerfile` với cấu trúc multistage build. Các bạn có thể build ra image production bằng cách chạy `docker build` và đẩy nó lên server là có thể chạy được.

### Biến môi trường

Như các bạn đã biết, biến môi trường biến image của chúng ta thành 1 **blackbox**, tức là bên trong image không hề có bất kỳ thông tin gì về việc code của bạn được deploy ở đâu, chạy ở server dev hay production. Điều này khiến chúng ta liên tưởng tới 1 hàm được viết chuẩn: chỉ cần thay đổi đầu vào và đầu ra sẽ thay đổi, không tạo ra **phản ứng phụ**. Với các ứng dụng chạy bằng php hay node thì đều này có thể đạt được tương đối dễ dàng nhờ các thư viện load biến môi trường từ server. Tuy nhiên với một ứng dụng SPA, hay nói cách khác là chỉ **thuần static file html, css, js** thì để sử dụng được biến môi trường trên server **lúc runtime** lại khá khó khăn.

Hãy ví dụ với một trường hợp đơn giản. Từ ứng dụng mình vừa tạo mẫu phía trên, làm cách nào để in ra màn hình một biến nào đó từ môi trường, ví dụ biến `NODE_ENV` mà mình truyền vào các container đi.

```yaml
# docker-compose.yml
services:
    docker-vue-frontend:
        environment:
            - NODE_ENV=production
```

```html 
<!-- pages/index.vue -->
<h2 class="subtitle">
        Frontend app with vue running on {{ NODE_ENV goes here }}
</h2>
```

Đối với ứng dụng chạy SSR với server nodejs như phần đầu mình đã làm thì việc này khá dễ dàng, bạn chỉ cần lấy giá trị biến môi trường từ `process.env.NODE_ENV` và đút nó vào file `nuxt.config.js` như [docs của NuxtJS](https://nuxtjs.org/api/configuration-env/)

```js
export default {
  ...
  env: {
    nodeEnv: process.env.NODE_ENV
  }
}
```

Sau đó có thể gọi ra trong view một cách bình thường

```html 
<!-- pages/index.vue -->
<h2 class="subtitle">
    Frontend app with vue running on {{ nodeEnv }}
</h2>
```

```js 
// pages/index.vue
export default {
  asyncData(ctx) {
    return {
      nodeEnv: ctx.env.nodeEnv
    }
  }
}
```

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/dis0c0jgi8_Screenshot%20from%202019-03-21%2010-03-32.png)

Tuy nhiên khi triển khai SPA trên nginx thì điều này khó đạt được hơn nhiều, do `env` được setup trong `nuxt.config.js` chỉ được load **trong quá trình build**. Điều này có nghĩa là bạn cần phải truyền environment variable trong quá trình build, và **giá trị của env** sẽ **nằm trong image** được build ra. Cũng giống như 1 hàm đã được truyền sẵn giá trị từ lúc tạo ra vậy:

```js
// what we want
a = 1;
b = 2;
function add(x, y) {
    return x + y;
}
c = add(a, b); // = 3

// what actually is
a = 1;
b = 2;
function add(x, y) {
    return 1 + 2; // x, y is replaced with 1, 2
}
c = add(a, b); // = 3
```

Các bạn đã hiểu vấn đề chưa? Chúng ta cần truyền được environment vào thời điểm **runtime**, chứ không phải là truyền khi **build**. Sau một hồi lâu research mình đã thấy khá nhiều cách thực hiện điều này, như load biến môi trường vào nginx config rồi truyền xuống client qua cookie, gọi API để lấy biến từ một server khác,... Tuy nhiên không có cách nào mình thật sự hài lòng, cho tới khi gặp một giải pháp khá *nông dân* nhưng lại rất hiệu quả và đáp ứng đầy đủ yêu cầu của bài toán này. Đó chính là **replace biến môi trường bằng giá trị thật bằng hàm envsubst khi khởi chạy container**

Để thực hiện điều này, các bạn tạo 1 file `start.sh` với nội dung sau:

```bash 
#!/bin/sh

# Replace env vars in JavaScript files
echo "Replacing env vars in JS"
for file in /usr/share/nginx/html/_nuxt/*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst "$ENV_VARIABLES" < $file.tmpl.js > $file

  rm -f $file.tmpl.js
done

echo "Starting Nginx"
nginx -g 'daemon off;'
```

File `start.sh` này sẽ làm nhiệm vụ khởi chạy container thông qua `CMD` trong `Dockerfile`. Các bạn sẽ thấy biến `ENV_VARIABLES` là một biến để mình lưu **tên của các variable** được thay thế với hàm envsubst.

> Tại sao mình lại làm điều này trong `CMD` mà không phải `ENTRYPOINT`, đó là bởi vì ghi đè `CMD` thì dễ dàng và đơn giản hơn rất nhiều so với `ENTRYPOINT`, do `ENTRYPOINT` thường tạo nên từ 1 file sh khá dài để tạo lập môi trường khi khởi chạy container, và `ENTRYPOINT` sẽ khác nhau đối với mỗi image. 

Các bạn thay thế `CMD` trong `Dockerfile` như sau:

```Dockerfile
##### builder image #####
...
##### end builder image #####

##### runtime image #####
FROM nginx:stable-alpine

COPY ./start.sh /
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["/start.sh"]
##### end runtime image #####
```

Kế đó sửa environment trong `nuxt.config.js`

```js
export default {
  ...
  env: {
    nodeEnv: process.env.NODE_ENV || '$NODE_ENV'
  }
}
```

> Để không xuất hiện conflict giữa môi trường build, môi trường dev và môi trường production khi xử dụng environment variables, mình đã tách file `docker-compose.dev.yml` thành 2 file là file `docker-compose.builder.yml` và `docker-compose.dev.yml` để khi các bạn chạy `script/compose_run.sh yarn build` thì sẽ không bị lẫn environment.

Cuối cùng là set giá trị cho biến `ENV_VARIABLES` mình đã đề cập ở trên:

```yaml 
# docker-compose.yml
version: "3.4"
services:
    docker-vue-frontend:
        environment:
            - NODE_ENV=production
            - BASE_URL=http://api.example.com
            # Use $$ to escape "$" character
            - ENV_VARIABLES=$$NODE_ENV,$$BASE_URL 
```

Chạy thử production phát nào:

```bash
$ script/compose_run.sh yarn build

yarn run v1.13.0
...
Done in 10.48s.

$ script/compose_start.sh

Recreating docker_vue_frontend ... 
Recreating docker_vue_frontend ... done
Attaching to docker_vue_frontend
docker_vue_frontend    | Replacing env vars in JS
docker_vue_frontend    | Processing /usr/share/nginx/html/_nuxt/769befa5e2d49c7f5894.js 
...
docker_vue_frontend    | Starting Nginx
docker_vue_frontend    | 172.22.0.1 - - [21/Mar/2019:05:05:39 +0000] "GET / HTTP/1.1" 200 918 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0" "-"
```

Và đây là thành quả khi chạy production:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/zq4prfehi9_Screenshot%20from%202019-03-22%2009-46-25.png)

Đây là khi chạy dev:

```bash
$ script/compose_start.sh dev
Recreating docker_vue_frontend ... 
Recreating docker_vue_frontend ... done
Attaching to docker_vue_frontend
docker_vue_frontend    | yarn run v1.13.0
docker_vue_frontend    | $ cross-env NODE_ENV=development nodemon server/index.js --watch server --L
...
docker_vue_frontend    | 03:05:38  READY  Server listening on http://0.0.0.0:3000
```

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/dis0c0jgi8_Screenshot%20from%202019-03-21%2010-03-32.png)

## Tóm tắt

Túm cái váy lại là sau bài viết này mình đã giải quyết được điều gì cho các bạn? 

- **Tạo được một docker image chuẩn chỉ để chạy frontend cho cả 2 trường hợp SSR và SPA.**
- **Tạo được môi trường phát triển trên local cho cả 2 trường hợp SSR, SPA với 2 môi trường dev, production.**
- **Xử lý được 1 vấn đề nhức nhối của stack thuần frontend là biến môi trường.**

Bài viết tới đây là kết thúc, toàn bộ source code demo cho bài viết này nằm trong project github sau: [https://github.com/minhpq331/docker-vue-frontend](https://github.com/minhpq331/docker-vue-frontend). 

Xin cám ơn các bạn đã quan tâm theo dõi. Mọi câu hỏi về bài viết này vui lòng comment nhé.