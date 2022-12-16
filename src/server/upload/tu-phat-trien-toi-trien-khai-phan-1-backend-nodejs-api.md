Làm thế nào để tạo ra một môi trường phát triển hoàn chỉnh và sẵn sàng cho việc triển khai?

Đó chính là thứ mà series [**Từ phát triển tới triển khai**](https://viblo.asia/s/tu-phat-trien-toi-trien-khai-dbZN7QzylYM) của mình sẽ đem lại cho bạn.

![Từ phát triển tới triển khai](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/a55cfi8k2a_docker-from-dev-to-prod%281%29.png)

*Bài viết gốc được mình đăng tải trên Kipalog [tại đây](https://kipalog.com/posts/Tu-phat-trien-toi-trien-khai-phan-1--Backend--NodeJS--API)*

## First things first

Vâng, lại là mình, **Minh Monmen** đã trở lại với series tiếp theo về việc phát triển và triển khai ứng dụng bằng docker. Và như thường lệ, tiếp sau đây sẽ là 1 phút dành cho quảng cáo.

> Tôi là ***Minh Monmen***, tôi là người dân tộc đa số, tốt nghiệp NEU ở tuổi 22. Nhưng tôi nói không. Tôi chọn theo con đường cài win dạo. Tôi đã đến được đây. Tôi làm được, bạn cũng làm được!

Đây là bài viết mở đầu series nên mình sẽ lại hơi dông dài 1 chút, mong các bạn thông cảm nhé. Việc đầu tiên là điểm qua các bài viết mà mình sẽ đăng đàn trong series **Từ phát triển tới triển khai** lần này:
- ***Từ phát triển tới triển khai P1: Backend, NodeJS, API***
- ***Từ phát triển tới triển khai P2: Frontend, VueJS, SPA - SSR***
- ***Từ phát triển tới triển khai P3: PHP Laravel***

Nội dung chính của series này là cho các bạn một cái nhìn thực tế, người thực việc thực của việc phát triển web với các stack công nghệ mình đã từng trải qua là **NodeJS**, **VueJS** và **PHP**. 

Thật may mắn vì 3 stack này chính là đại diện cho 3... cái gì đó của việc phát triển web (cái gì đó thì mình cũng chưa biết gọi là gì):
- **API Backend với NodeJS**, đây là kiến trúc để bạn phát triển 1 service API thuần.
- **Frontend với VueJS**, các bạn sẽ được xem mình phát triển 1 ứng dụng thuần frontend theo cả 2 kiểu SPA, SSR như thế nào.
- Cuối cùng là bài viết về **PHP Laravel**, chứa đựng việc phát triển app dựa trên 1 framework rất phổ biến của PHP, cũng chính là phần phức tạp hơn với việc xuất hiện nhiều service liên quan hơn.

Tất cả đều có mindset về việc triển khai ứng dụng **qua docker image**. Tức là tìm cách để sau khi dev rồi sẽ cho ra được **docker image** chứa ứng dụng hoàn chỉnh. Điều này sẽ có lợi với các hệ thống triển khai bằng Kubernetes, Docker swarm hay tích hợp với quá trình CI/CD.

Còn đây là những thứ mà series này **không chứa**:
- Tối ưu docker image
- CI/CD
- Triển khai ứng dụng trên server, VPS,...

Đây là những thứ sẽ được nói ở những bài viết riêng vì độ phức tạp của nó.

***Take a deep breath, and dive.***

## Kiến thức cần có

Để hiểu trọn vẹn ý nghĩa của bài viết này, mình cần các bạn hiểu được các khái niệm sau:
- `stateless` và `stateful` stack.
- Docker cơ bản: image, container, port mapping, volume, network.
- Docker compose: command, syntax,...

Nói kỹ hơn 1 chút, **stateful** và **stateless** ở đây mình đề cập là ở tầng triển khai, **stateless** tức là **container** chứa code của bạn sau này sẽ không chứa thông tin, file,... gì liên quan tới các request riêng lẻ hết. Mọi thứ như db, log, cache, file,... sẽ được đẩy hoàn toàn ra các service bên ngoài.

Mình recommend các bạn chạy docker cho các ứng dụng **stateless**, còn với các **stateful stack** như **database, file**,... thì nên triển khai trên các cụm server riêng (và có thể hạn chế docker). Do môi trường deploy của mình sử dụng **kubernetes cho application** và **toàn bộ database, cache, queue được đẩy ra ngoài**, do đó mình mô phỏng trên môi trường dev cũng là application trên docker riêng và database, cache, queue,... tách ra riêng.

## Tiếp nối câu chuyện kỳ trước

Chúng ta quay trở lại với môi trường dev ứng dụng NodeJS kỳ trước. Đây cũng là một ứng dụng NodeJS thuần API điển hình. Đây là những vấn đề mà nó đang gặp phải:

- Docker image **không có code**, do đó không thể triển khai một cách độc lập
- Để phản ánh sự thay đổi của code thì cần stop và chạy lại `docker-compose up`
- Chưa chạy được nhiều môi trường (dev, test, prod)

Chúng ta hãy giải quyết từng vấn đề một.

### Thêm code vào docker image

Có 2 cách để docker container chạy được code của bạn. 

**Một là** bạn mount code từ ngoài host vào container qua **volume**, giống như trong bài viết trước mình đã làm. Cách này có ưu điểm là quãng đường để code từ IDE tới chạy rất nhanh, gần như không phải mất thời gian chờ build image lâu la, phản ánh luôn sự thay đổi của code trên trình duyệt,...

Cách làm này phù hợp với **môi trường phát triển**, khi bạn cần nhanh chóng thấy được tác dụng của việc thay đổi code.

**Hai là** bạn copy code từ ngoài host vào image qua **Dockerfile**. Như vậy với mỗi image được build ra sẽ chứa toàn bộ code của bạn, và hoàn toàn có thể chạy một cách độc lập trên các môi trường khác như staging, production,... Cách này thì ưu điểm chính là **sự độc lập** và **sẵn sàng triển khai**. 

Còn mặt trái của sự thật, thì chính là việc vì nó **chứa luôn code của bạn**, nên sẽ rất mất thời gian để bạn nhìn thấy được sự thay đổi dù là nhỏ nhất. Tưởng tượng trong quá trình dev bạn thêm 1 dòng code `echo 'test';` và ngồi chờ build image mất mấy phút chỉ để thấy dòng `test` nhỏ này trên màn hình thì sẽ thốn cỡ nào.

#### Tạo Dockerfile cho việc triển khai

Vậy tại sao mình không *kết hợp cả 2 cách trên*? Cách 1 thì cho môi trường dev còn cách 2 thì cho môi trường production? Rất đơn giản, mình sửa `Dockerfile` từ lần trước để sẵn sàng cho việc triển khai Nodejs với đủ 5 phần như sau (có chú thích các step thường phải làm khi viết `Dockerfile` cho việc triển khai):

```Dockerfile
FROM node:8-alpine

# 1. Expose port and set work dir
EXPOSE 3000
WORKDIR /app

# 2. Sometime you need to install os package here to build dependencies

# 3. Copy and install node dependencies
ADD src/package.json src/yarn.lock /app/
RUN yarn --pure-lockfile

# 4. Copy source code
ADD ./src /app

# 5. Start my application
CMD ["yarn", "start"]
```

Như các bạn đã thấy, mình đã có ngay 1 `Dockerfile` có thể tạo ra 1 docker image có khả năng deploy độc lập với đủ môi trường, dependencies, code,... Để **build, deploy trên server**, mình sẽ chỉ cần dùng duy nhất `Dockerfile` này để tạo ra image. Tất cả phần về  `docker-compose` bên dưới đều là phục vụ cho việc phát triển của mình trên localhost.

***Chú ý:*** các bạn còn nhớ file `.dockerignore` mà mình đã tạo ra ở bài trước chứ? Nhiệm vụ của nó đã thể hiện rồi đây. nó sẽ tránh việc copy folder `node_modules` từ ngoài host vào image. Thay vào đó mình muốn `node_modules` phải được tạo ra **trong quá trình build image** để đảm bảo dependencies được cài đặt đầy đủ và phù hợp.

#### Tạo docker-compose.yml

Tiếp theo mình sẽ tạo 1 file `docker-compose.yml` để mount thư mục code vào bên trong container khi mình phát triển trên localhost

```yaml
# docker-compose.yml
version: "2"
services:
    docker-node-api:
        container_name: docker_node_api
        build: .
        volumes:
            - ./src:/app
        user: "1000:1000"
        ports:
            - "3000:3000"
        environment:
            - NODE_ENV=production
            - PORT=3000
            - MONGO_URI=mongodb://mongo:27017/docker-node-api 
        networks:
            - persistentstack_common
networks:
    persistentstack_common:
        external: true
```

***Chú ý:*** File `.dockerignore` trong thư mục giúp mình không `ADD` thư mục `node_modules` vào image **trong quá trình build**, tuy nhiên lại không thể ngăn mình mount volume toàn bộ thư mục `src/` vào thư mục `/app` trong container có chứa `node_modules`. Do đó sẽ có trường hợp trong image thì có `node_modules`, nhưng ngoài host thì chưa có (do bạn chưa cài bằng việc dùng `docker-compose run`) nên khi chạy file `docker-compose.yml` này lên ứng dụng của bạn sẽ lỗi. 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/u1qzkjhk89_Screenshot%20from%202019-01-12%2016-44-36.png)

Cách để chạy dc trường hợp này thì có 2 cách. 

**Cách 1** là sử dụng `node_modules` từ ngoài host, và bạn chạy như bài viết trước mình hướng dẫn (dùng `docker-compose run` để chạy `yarn`). 

**Cách 2** là giữ lại thư mục `node_modules` đó từ image khi mount ra container, để cho đơn giản thì mình khuyên các bạn dùng cách trên cho nhanh và đỡ rối. 

#### Và chạy

Tới đây vấn đề đầu tiên về việc cho code vào container đã được giải quyết, cho cả môi trường dev và môi trường deploy. Để chạy phiên bản dev của ứng dụng dạng `mount volume`, ta chạy lệnh sau:

```bash
$ docker-compose up
```

Để `build image` dùng cho production, ta chạy lệnh sau:

```bash
$ docker build -t docker-node-api .
```

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/2emdt39bzb_Screenshot%20from%202019-01-12%2001-08-57.png)

### Hot reloading

Vậy là ở trên mình đã đưa được file code của mình vào container đang chạy **ngay sau khi nó thay đổi**, nhưng như thế vẫn chưa đủ, bởi vì ứng dụng của mình cần **restart để thấy được sự thay đổi** đó. Nếu không mình chỉ còn cách stop và bắt đầu chạy lại từ đầu.

Như các bạn đều biết là **hot reloading** chỉ cần thiết đối với môi trường phát triển, khi bạn sửa đổi 1 file và muốn thấy ngay sự thay đổi của mình. Còn với môi trường production thì việc này là không cần thiết (để đảm bảo tính ổn định). Do đó phần này phát sinh dựa trên tính chất khác biệt của các môi trường. Vì thế mình sẽ kết hợp việc tạo config để chạy được nhiều môi trường bằng `docker-compose`.

Để phục vụ cho **hot reloading** thì mình thêm vào dự án 1 package tên là `nodemon`. Đây là package cho phép **theo dõi sự thay đổi của source code** và **reload ứng dụng** (chỉ phục vụ môi trường dev).

```bash
$ docker-compose run --rm docker-node-api yarn add nodemon --dev
# hoặc rút ngắn với bạn nào sử dụng github project có script hỗ trợ của mình
$ script/compose_run.sh yarn add nodemon --dev
```

Với các ngôn ngữ khác thì tùy vào ngôn ngữ mà sẽ có cách hot reloading phù hợp, bài viết này về nodejs api nên mình sẽ nói kỹ về nodemon 1 chút. 

**Lưu ý:** Nếu các bạn chạy nodemon trực tiếp trên host thì không có vấn đề gì, tuy nhiên khi chạy nodemon bằng cách chúng ta đang làm (tức là **theo dõi file thay đổi trong mounted volume**) thì phải **đặc biệt lưu ý** tới vấn đề số lượng file được theo dõi, và nhớ phải **ignore** những thư mục không cần thiết như *document*, *temp*,... để tránh docker báo lỗi limit số lượng file theo dõi qua mount volume.

Tiếp theo mình định nghĩa các `command` khác nhau để khởi động ứng dụng của mình cho các môi trường khác nhau trong `package.json` như sau: 

```json
...
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "some test command goes here",
    },
...
```

Vậy là hòm hòm phần **hot reloading** rồi, tiếp tục tới phần **multiple environment** nào.

### Multiple environment

Tới đây mình muốn chạy 3 môi trường khác nhau bằng `docker-compose`. Cách dễ dàng nhất chính là viết 3 file `docker-compose.yml` riêng biệt và chạy. Nhưng thế thì thật là nông dân đúng không nào? Cứ mỗi lần mình phải thay đổi gì đó như port, environment mình lại phải sửa cả 3 file lận. Nhưng thật may, **docker-compose** có chức năng kết hợp nhiều file `docker-compose.yml` với tính năng ghi đè, do đó mình sẽ tận dụng file cũ và mở rộng thêm với 2 file cho môi trường `dev` và `test` như sau đây:

```yaml
# docker-compose.dev.yml
version: "2"
services:
    docker-node-api:
        environment:
            - NODE_ENV=development        
        # --L is an option for nodemon when tracking file in mounted volume
        command: yarn dev --L 
```

```yaml
# docker-compose.test.yml
version: "2"
services:
    docker-node-api:
        environment:
            - NODE_ENV=test
            # Use different db for testing
            - MONGO_URI=mongodb://mongo:27017/docker-node-api-test 
        command: yarn test
```

Bây giờ mình sẽ giải thích kỹ hơn về 3 file config trên:

- `docker-compose.yml` là file chứa các config ban đầu, chạy được luôn tương tự môi trường production (không có **hot reloading**)
- `docker-compose.dev.yml` là file mở rộng và ghi đè config mặc định, với việc thay **biến môi trường**, **command** để chạy app. (do đó có **hot reloading**)
- `docker-compose.test.yml` tương tự file với môi trường dev, mình cho vào làm ví dụ cho sinh động ấy mà =))

## Kết hợp lại và chạy

Giờ mình có thể chạy ứng dụng của mình với 3 command cho 3 mục đích khác nhau:

```bash
# Run with environment production, NO hot-reloading
$ docker-compose -f docker-compose.yml up

# Run with dev environment, hot-reloading
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Run with test environment, same as dev environment, stop on complete
$ docker-compose -f docker-compose.yml -f docker-compose.test.yml up --abort-on-container-exit
```

Để cho ngắn gọn thì mình đưa hết 3 command trên vào 1 file `script/compose_start.sh`. Các bạn có thể tham khảo trong github cuối bài viết.

```bash
# Run with environment production, NO hot-reloading
$ script/compose_start.sh

# Run with dev environment, hot-reloading
$ script/compose_start.sh dev

# Run with test environment, same as dev environment, stop on complete
$ script/compose_start.sh test
```

Kết quả:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/w2lb92vezt_Screenshot%20from%202019-01-12%2015-37-18.png)

## Tổng kết

Sau bài viết này, mình đã cùng các bạn giải quyết 3 vấn đề mà bài viết trước của mình còn tồn tại (với demo trên nodejs api app):

- **Thêm code vào image**
- **Hot reloading**
- **Multiple environment**

Các bạn có thể vào github repo sau để có toàn bộ source code của bài viết, cũng như 1 số các tinh chỉnh mình tạo ra (nhưng không nói kỹ ở đây). Đây có thể là một template đơn giản cho việc phát triển ứng dụng Nodejs của các bạn. 

Link github: [https://github.com/minhpq331/docker-node-api](https://github.com/minhpq331/docker-node-api)

Trong bài viết tiếp theo, mình sẽ cùng các bạn tiếp tục con đường phát triển web với 1 lĩnh vực không kém phần quan trọng là frontend. Cụ thể là **VueJS** với cả phần SPA và SSR. Hãy xem với việc phát triển **VueJS** thì các vấn đề như **environment variable**,... sẽ được giải quyết ra sao nhé.

Xin chào và hẹn gặp lại.