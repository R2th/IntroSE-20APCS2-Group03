Hôm nay có người nói với mình: "*Thật ra để chạy một ứng dụng bằng docker rất đơn giản, ví dụ như node, chỉ cần vài dòng cài thêm pm2, forever rồi mount volume code vào và thế là chạy. Cũng chả bao giờ cần build lại image làm gì nên thời gian build không quan trọng lắm, cứ build rồi đẩy lên docker hub rồi sau cứ lấy về dùng thôi.*"

Mình đồng ý. Nhưng vốn thấy có cái gì đó sai sai ở đây, nên đã về ngồi suy nghĩ một lúc lâu, cuối cùng cũng đặt bút xuống viết bài viết này để hệ thống lại tất cả những việc mình đã làm từ xưa tới nay với docker để sử dụng và tối ưu được nó trên hệ thống production. **Chốt lại một điều là: để nó chạy được là chuyện dễ, còn để nó chạy "ngon" thì chưa bao giờ là dễ cả.**
## First things first

Thật ra mình viết bài này vì đang viết dở series authentication nhưng hơi nản nên kiếm chút gió thay đổi không khí thôi. Có điều gì sơ sót thì mong các bạn bỏ qua nha.

Bài viết này sẽ đề cập tới câu chuyện mình optimize docker image phục vụ cho quá trình triển khai trên hệ thống production, optimize quá trình build khi CI/CD các ứng dụng của mình, kèm theo đó là việc mình hệ thống thế nào để 20 microservice cùng sử dụng được 1 Dockerfile.

**Let's begin!**

## Tại sao phải tối ưu?

Okay, vậy thì câu hỏi đầu tiên được đặt ra là: Tại sao chúng ta phải tốn công mệt óc để ngồi tối ưu cái docker này làm gì? Trong khi phần đông mọi người đều thấy chạy được ứng dụng là tốt rồi?

Câu trả lời rất đơn giản: **để cho tiết kiệm.**

Tiết kiệm cái gì? Bất cứ cái gì gọi là tài nguyên và có thể tiết kiệm được thì chúng ta sẽ tiết kiệm. Ví dụ:

- **Thời gian**
- **Dung lượng lưu trữ**
- **Tài nguyên chạy (CPU, RAM)**
- **Băng thông**

Bây giờ 1 image bạn build ra, bạn phải mất thời gian build nó, mất dung lượng lưu trữ để chứa nó, tài nguyên để chạy nó, và băng thông để phân phối nó tới các máy chủ. Vậy tối ưu tức là tiết kiệm những thứ kể trên.

Nói thì nói vậy, tuy nhiên hầu hết chúng ta đều chả quan tâm đếch gì đến mấy cái thứ đó, vì nó không thực tế và gần gũi với những thứ chúng ta làm hàng ngày. Nhưng nếu bạn ở vào hoàn cảnh phải chờ đợi mòn mỏi 10 phút để đẩy hotfix lên server, bạn sẽ biết quý trọng thời gian, hay quản lý một hệ thống khoảng 50 container đang chạy, thì số tiền bạn bỏ ra cho việc phung phí tài nguyên là sẽ không nhỏ.

### Hiện trạng

Hãy bắt đầu với với hiện trạng của mình trước đây bằng 1 Dockerfile chạy NodeJS đơn giản.

```Dockerfile
FROM node:10

WORKDIR /app

RUN apt-get update 
RUN apt-get install -y git

RUN yarn global add node-gyp

# ADD source code
ADD . /app
RUN yarn --pure-lockfile
RUN yarn build

# Expose port and set work dir
EXPOSE 3000

# Start my application
CMD ["yarn", "docker:start"]
```

```bash
$ docker image ls -a | grep app
app   lattest         c9bbbeb45eca        13 minutes ago      1.25GB
```

Image này build mất **4 phút** và nặng tới **1.25GB**. Thật không thể tin được. Có gì đó sai sai ở đây rồi, ứng dụng của mình chỉ là một ứng dụng API chạy bằng expressjs hết sức nhẹ mà. 

Chưa hết, mình thử thay đổi 1 file `README.md` trong project, sau đó thử build lại thì vẫn mất **3 phút** (do không phải download lại base image). Image của mình được build lại toàn bộ, bắt nguồn từ dòng `ADD . /app`, bao gồm cả việc install dependencies, build app,... Trong khi `README.md` thì liên quan gì tới ứng dụng của mình đâu để phải mất bao nhiêu thời gian và tài nguyên build lại image như thế?

Hệ thống của mình còn chạy CI/CD nên với việc setup Dockerfile phía trên, mỗi lần chạy mình mất **15 phút** để code có thể chạy được trên server. WTF?

### Kết quả

Sau 1 hồi tìm tòi học hỏi và tối ưu, giờ đây image app của mình chỉ nặng vỏn vẹn **150MB** thay vì 1.25GB như trước, mất **1p30s** để build lần đầu tiên, và chỉ **10s** để build mỗi khi mình thay đổi code chút ít. Quá trình CI/CD cũng từ đó rút ngắn xuống **8 phút** cho lần đầu tiên và chỉ **3 phút** cho các thay đổi code sau này thay vì cứ đều như vắt chanh **15 phút** 1 lần như trước.

Muốn biết mình làm thế nào ư? Đọc tiếp nhá.

## Tối ưu thế nào?

Giờ khi đã hiểu tại sao phải tối ưu, ta bước đến bước khó khăn hơn là tối ưu thế nào. Đây là một số bước chính mình đã làm để có thể tối ưu được quá trình build này. Ngoài ra còn 1 vài cái lặt vặt nữa như remove file tạm,... thì tạm không nhắc tới.

### Thay đổi base image 

Đây là bước đầu tiên và quan trọng nhất, trừ khi hoàn cảnh không cho phép hoặc image không có sẵn, nếu không hãy luôn sử dụng image được dựng trên `alpine`. Đây là những base image nhẹ nhất, tối ưu nhất cho việc lưu trữ mà vẫn đủ điều kiện để app của chúng ta chạy ngon lành.

Thay vì sử dụng `FROM node:10`, mình đã chuyển qua sử dụng `FROM node:10-alpine`

Các image dựng trên `alpine` có dung lượng rất nhẹ, với nodejs là giảm từ **900MB** của bản mặc định xuống chỉ còn **70MB** của alpine.

Điểm trừ duy nhất của `alpine` đó là việc nó quá nhỏ gọn nên bạn phải tự túc cài thêm những thư viện bạn cần dùng. Và việc này với những người mới là khá rắc rối đó nha. :D

### Tận dụng layer caching

Layer caching là một tính năng rất quan trọng giúp giảm thời gian của quá trình build bằng cách tận dụng những layer đã được build từ lần trước đó (với điều kiện không có thay đổi trong chỉ định build). Để có thể tận dụng tối đa tính năng này, ta cần **sắp xếp lại và tách lệnh build** sao cho phần lệnh ít thay đổi sẽ ở trên, phần thay đổi thường xuyên sẽ ở dưới.

Đây là điều mình đã làm với Dockerfile trên:

```Dockerfile
WORKDIR /app

RUN apt-get update 
RUN apt-get install -y git

RUN yarn global add node-gyp

ADD . /app
RUN yarn --pure-lockfile
RUN yarn build

EXPOSE 3000

# become
EXPOSE 3000
WORKDIR /app

RUN apt-get update 
RUN apt-get install -y git

RUN yarn global add node-gyp

ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile

ADD . /app
RUN yarn build
```

Mình đã chuyển `EXPOSE 3000` lên trên cùng với `WORKDIR /app`, tách phần `ADD . /app` ra để thêm 1 chỉ định `ADD package.json yarn.lock /app/`. Do 2 file `package.json` và `yarn.lock` chứa thông tin về những package mình dùng nhưng lại ít thay đổi, do đó đẩy nó lên trên sẽ giúp việc cài đặt dependencies từ npm có thể sử dụng lại từ image đã build từ trước.

> Tips: Sắp xếp các lệnh build theo **sự thay đổi thường xuyên tăng dần**

### Giảm bớt số lượng layer

Như chúng ta đều đã biết, docker image được dựng nên từ những layer xếp chồng lên nhau, mỗi layer được tạo ra từ các câu lệnh chúng ta viết trong Dockerfile. Càng nhiều layer thì image của chúng ta càng nặng nề. Chính vì vậy việc giảm thiểu tối đa số lượng layer chính là cách để tối ưu dung lượng image. 

Có 3 câu lệnh sẽ tạo ra các layer mới là `RUN`, `COPY` và `ADD`, nên việc gộp lệnh này chỉ có tác dụng với 3 lệnh này nhé. Trong ví dụ trên, mình đã gộp những câu lệnh sau thành 1 lệnh, do đó chỉ tạo ra 1 layer duy nhất:

```Dockerfile
RUN apt-get update
RUN apt-get install -y git
RUN yarn global add node-gyp

# become
RUN apt-get update \
    && apt-get install -y git \
    && yarn global add node-gyp
```

Một lưu ý khi các bạn ứng dụng biện pháp này, đó chính là việc gộp lại thành 1 dòng sẽ làm mất đi ưu thế của caching layer khi build. Bạn đâu muốn chỉ vì một thay đổi nhỏ mà dẫn tới image bị build lại từ những bước đầu chả liên quan đúng không? Do vậy trước ghi gộp, hãy tính tới những thay đổi bạn có thể tạo ra cho ứng dụng, và tối ưu việc caching layer cần được ưu tiên hơn.

### Tối ưu `.dockerignore`

Như mình đã nói trong 1 số bài viết khác, file `.dockerignore` sinh ra với mục đích báo cho docker biết để loại trừ những file này ra khỏi **build context**, tức là loại ra khỏi những file mà docker định dùng để build image.

Để tránh việc bạn sửa 1 file `README.md` chả liên quan mà cũng khiến image của bạn phải build lại, hãy thêm nó vào `.dockerignore`. Sau đây là 1 số loại file nên đưa vào `.dockerignore`

```bash
# Environment variables
.env

# Logs
logs
*.log
npm-debug.log*

# Documentation
docs
*.md

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# node-waf configuration
.lock-wscript

# Dependency directories
node_modules
jspm_packages

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Dist folder (code after build)
dist

# Project file
*.sublime-project
*.sublime-workspace

# Git file
.git

# Docker file
*Dockerfile*
*docker-compose*

# Deploy folder and file
deploy
.gitlab-ci.yml
```

### Sử dụng multi-stage build

Đây là phương pháp cuối cùng mình đề cập trong bài viết này. Multi-stage build được giới thiệu từ docker v17.05, là một cách rất mới để các bạn tối ưu được **runtime image** của mình bằng việc loại bỏ đi toàn bộ những thứ được sinh ra trong quá trình install, build code,... nhưng lại không cần thiết cho quá trình chạy ứng dụng. Trở lại với ví dụ trong bài, mình sẽ tách image cũ thành 2 image trên một `Dockerfile` như sau:

```Dockerfile
FROM node:10-alpine AS builder

WORKDIR /app

RUN apk --no-cache add \
    g++ make python git \
    && yarn global add node-gyp \
    && rm -rf /var/cache/apk/*

ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile

# Runtime image from here
FROM node:10-alpine

EXPOSE 3000

WORKDIR /app

# Copy node_modules from builder image
COPY --from=builder /app .
ADD . /app
RUN yarn build

CMD ["yarn", "docker:start"]
```

Với việc tách image như thế này. Image runtime của mình chỉ nặng **160MB** mà không phải là **400MB** như việc chỉ sử dụng 1 image.

Tuy nhiên cái lợi nào cũng đi cùng cái giá của nó. Chúng ta có thể giảm được dung lượng **runtime image**, nhưng lại mất đi 1 tính năng hết sức quan trọng là layer caching. Việc docker chỉ lưu lại **image kết quả cuối cùng** mà **không lưu builder image** làm toàn bộ công tách rồi ghép lệnh của chúng ta đổ sông đổ bể =))

Nhưng các bạn đừng vội lộn cái bàn bảo mình tại sao lại xúi bạn tách ghép lệnh làm gì. Việc gì khó cũng có cách giải quyết, chỉ là nó hơi mất công 1 chút. Chúng ta hoàn toàn có thể lưu lại được builder image và dùng nó làm cache cho lần build sau bằng 1 lệnh build kèm `--target` như sau:

```bash
$ docker build -t app:builder --target=builder .
```

Chỉ định `--target` sẽ giúp quá trình build dừng lại ở bước builder, từ đó chúng ta sẽ có 1 image builder ngon nghẻ để cache cho lần sau rồi.

> Tips: Multi stage build giúp tiết kiệm tài nguyên cho quá trình **runtime**, nhưng lại tốn thêm tài nguyên lưu trữ thời gian trong quá trình **build**. Tuy nhiên từ kinh nghiệm cá nhân của mình thì việc này hoàn toàn xứng đáng đánh đổi.

## Ngoài lề về cách quản lý microservice image

Đến đây coi như mình đã nói xong với các bạn về cách optimize docker image phục vụ cả quá trình build và runtime. Tiện thể mình sẽ chia sẻ luôn về cách mình quản lý mấy chục image hiện tại của sản phẩm.

Các bạn nếu đã làm microservice, nhất là với số lượng lớn đều sẽ nhận thấy một vấn đề đó chính là việc quản lý image của toàn bộ các microservice là rất mất thời gian và vất vả. Với khoảng 20 microservice, trong đó có 17 service backend và 3 service frontend thì số lượng image na ná nhau là rất nhiều. 

Giả sử bạn muốn thêm vào toàn bộ các image backend một file chứa thời gian image đó được build chẳng hạn. Khi đó bạn sẽ phải sửa lại **17 project backend** chỉ để copy paste lại **đúng 1 dòng**. Nghe nản không?

Rất may là docker có giới thiệu một chỉ thị có tên là `ONBUILD`. Doc của nó [tại đây](https://docs.docker.com/engine/reference/builder/#onbuild). Vậy `ONBUILD` có tác dụng gì trong trường hợp này?

`ONBUILD` là chỉ thị tạo ra 1 trigger, nôm na là 1 điểm chờ. Khi mình build image X có chứa chỉ thị `ONBUILD` thì lệnh phía sau `ONBUILD` sẽ không được thực thi mà sẽ chờ đợi. Cho đến khi image X được dùng làm **base image** cho 1 image khác thì lệnh sau `ONBUILD` mới được thực thi.

Ví dụ:

```Dockerfile
FROM node:10-alpine 

WORKDIR /app

ONBUILD ADD package.json yarn.lock /app/
ONBUILD RUN yarn --pure-lockfile
```

```bash
$ docker build -t test .
Sending build context to Docker daemon  2.048kB
Step 1/3 : FROM node:10-alpine
 ---> df48b68da02a
Step 2/3 : ONBUILD ADD package.json yarn.lock /app/
 ---> Running in 91fb4e71156f
Removing intermediate container 91fb4e71156f
 ---> efb9bf8fe2a9
Step 3/3 : ONBUILD RUN yarn --pure-lockfile
 ---> Running in 22441a427546
Removing intermediate container 22441a427546
 ---> 9a57cb7773e0
Successfully built 9a57cb7773e0
Successfully tagged test:latest
```

Như các bạn thấy, trong image **test** mình vừa build không hề có file `package.json` hay `yarn.lock` nào cả, chỉ là một lệnh chờ đợi được tạo ra mà thôi.

Giờ trong project code của mình thì `Dockerfile` mình sẽ viết:

```Dockerfile
FROM test
```

Và đây là kết quả khi build

```bash
$ docker build -t app .
Sending build context to Docker daemon  513.5kB
Step 1/1 : FROM builder
# Executing 2 build triggers
 ---> Running in 775275b026e1
yarn install v1.9.4
Done in 29.47s.
Removing intermediate container 775275b026e1
 ---> 1903e4902d84
Successfully built 1903e4902d84
Successfully tagged app:latest
```

Và cho tới lúc này, 2 lệnh mà mình cần là `ADD package.json yarn.lock /app/` và `RUN yarn --pure-lockfile` mới thật sự được thực thi. Vậy là trong project của mình không cần phải định nghĩa lại `Dockerfile` nữa, chỉ việc sử dụng 1 template do mình tạo ra cho toàn bộ các service là được. Điều này giúp tiết kiệm thời gian maintain toàn bộ mấy chục service image, cũng giúp mình tiết kiệm thời gian build, do những thứ lặp đi lặp lại như việc cài đặt môi trường đã được lưu trong image template rồi.

Dưới đây là builder template, runtime template và project Dockerfile của mình các bạn có thể tham khảo:

```Dockerfile
# Builder image minhpq331/node:10-builder
FROM node:10-alpine

WORKDIR /app

RUN apk --no-cache add \
    g++ make python git \
    && yarn global add node-gyp \
    && rm -rf /var/cache/apk/*

ONBUILD ADD package.json yarn.lock /app/
ONBUILD RUN yarn --pure-lockfile
```

```Dockerfile
# Runtime image minhpq331/node:10-runtime
FROM node:10-alpine

EXPOSE 3000
WORKDIR /app

ONBUILD COPY --from=builder /app .
ONBUILD ADD . /app
ONBUILD RUN yarn build

CMD ["yarn", "docker:start"]
```

```Dockerfile
# Project image
FROM minhpq331/node:10-builder AS builder

FROM minhpq331/node:10-runtime
```

## Kết luận

Qua bài viết này, mình rút ra 3 điều. À 6 điều nhé:

- Chọn base image trên nền `alpine` để dung lượng tối ưu nhất
- Sắp xếp Dockerfile để tận dụng layer caching giúp giảm thời gian build
- Gộp các câu lệnh `RUN`, `ADD`, `COPY` có liên quan với nhau để giảm số layer mới
- Tối ưu `.dockerignore` file để loại bỏ những file không cần thiết trong quá trình build image
- Sử dụng multi-stage build để giảm dung lượng **runtime image**
- Sử dụng chung image template bằng việc sử dụng `ONBUILD` cho base image giúp tiết kiệm công sức quản lý và thời gian build.

Cám ơn các bạn đã theo dõi và hẹn gặp lại và những bài viết sau. Mọi ý kiến thắc mắc vui lòng comment.