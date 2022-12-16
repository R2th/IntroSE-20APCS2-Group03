# Lời mở đầu

Docker hẳn là không còn mấy xa lạ đối với anh em dev chúng ta nhỉ. Ý tưởng của Docker là tạo ra các container chứa các môi trường độc lập để khởi chạy và phát triển ứng dụng, hiểu đơn giản thì là nó chứa mọi thứ để ứng dụng có thể chạy được. Và để tạo được các container đó, chúng ta cần một Docker image. Tạo Docker container từ Docker image cũng tương tự như cài win từ file ghost, bung file ghost là có tất tần tật mọi thứ mình cần. Vậy làm sao để tạo ra 1 Docker image? ye, đó chính là viết Dockerfile và đây cũng là nội dung mình muốn đề cập đến trong bài viết này :smile:

Dockerfile chính là trái tim của Docker. Nó định nghĩ chi tiết image bao gồm những gì để từ đó Docker có thể xác định build image đó như thế nào. Dockerfile thực chất là một file text có tên là Dockerfile, không có phần mở rộng. Nó chứa các command cần thiết được sắp xếp theo thứ tự để xây dựng một image (các command sẽ được thực thi từ trên xuống). Để hiểu hơn về Dockerfile, chúng ta sẽ đi tới phần tiếp theo, những thành phần cơ bản của Dockerfile

# Các thành phần cơ bản của Dockerfile
Trong tài liệu chính thức trên trang chủ Docker thì Dockerfile sẽ gồm những lệnh sau:

`FROM` - chỉ định base image.  Base image thông thường sẽ được lấy từ Docker Hub - nơi lưu trữ và chia sẻ các image mà từ đó bạn có thể lấy về và tùy chỉnh

`RUN` - dùng để thực thi một command bất kỳ trong quá trình build image, thường thì nó được dùng để build các package trong image

`CMD` - dùng để thực thi một command bất kỳ trong quá trình chạy container. CMD sẽ không thực thi bất cứ thứ gì trong quá trính build image và mỗi Dockerfile chỉ chứa duy nhất một lệnh CMD

`LABEL` - dùng để cung cấp metadata cho image, nơi tốt để chứa các thông tin về tác giả, các lưu ý... 

`EXPOSE` - thiết lập port để truy cập tới container sau khi đã khởi chạy

`ENV` - thiết lập các biến môi trường để sử dụng cho các câu lệnh trong quá trình build

`ADD` và `COPY`- sao chép file, thư mục vào container

`ENTRYPOINT` - cung cấp một số lệnh mặc định cùng tham số khi thực thi container

`VOLUME` - tạo một folder dùng để truy cập và lưu trữ dữ liệu, folder được liên kết từ máy host và container

`USER` - dùng để chỉ định username hoặc UID được sử dụng trong quá trình tạo image cho các lệnh `RUN`, `CMD` và `ENTRYPOINT`

`WORKDIR` - Thiết lập thư mục làm việc trong container cho các lệnh `COPY`, `ADD`, `RUN`, `CMD`, và `ENTRYPOINT`

`ARG` - Định nghĩa các biến để sử dụng trong build-time.

`ONBUILD` - tạo một trigger cho image để thực thi khi nó được sử dụng làm base image cho việc build một image khác

`STOPSIGNAL`- chỉ định kí hiệu hệ thống dùng để stop container.

`HEALTHCHECK` - cung cấp phương thức cho Docker để kiểm tra container có hoạt động bình thường hay không.

`SHELL` - dùng để thay đổi các lệnh shell mặc định

Về định nghĩa và cách dùng của mỗi lệnh thì các bạn có thể xem tại [đây](https://viblo.asia/p/dockerfile-references-3P0lPkmpZox)  ([English version](https://kapeli.com/cheat_sheets/Dockerfile.docset/Contents/Resources/Documents/index)). Mình sẽ không viết phần định nghĩ cho mỗi lệnh vì đã có người làm rồi. Bên cạnh đó sẽ làm bài viết trở nên quá dài và thực sự là vì mình thấy không thực sự cần thiết.

Các thành phần cần quan tâm và được dùng nhiều nhất là: `FROM`, `WORKDIR`, `RUN`, `COPY` (cũng như `ADD`), `EXPOSE`, `ENTRYPOINT` và `HEALTHCHECK`.  Vì sao lại không cần chú ý tới `VOLUME`? Việc mount thư mục cũng quan trọng mà. Nguyên nhân là vì ta hoàn toàn có thể setting nó ở docker compose. Mình hay làm như thế để thống nhất việc setting thư mục. Việc sering rời rạc trong mỗi Dockerfile thì khi cần tìm hoặc có lỗi gì thì mở từng file cũng là cả 1 vấn đề.

Với những lệnh này, chúng ta cần chú ý đến một chi tiết rất quan trọng đó là lệnh nào tạo layer và lệnh nào không. Từ đã, layer là gì? có thấy đoạn nào nói về cái này đâu. yeah thì đây, mình sẽ đề cập ngay sau đây layer là gì. Đối với một số bạn đã biết thì mình cũng xin phép được nhắc lại là quá trình build một container từ image sẽ dựa trên một chuỗi layer. Các layer này tất nhiên là được tạo từ các lệnh ở Dockerfile. Chính Dockerfile sẽ định nghĩa cho Docker biết những layer đó và thứ tự tạo ra chúng. Và cái cần chú ý ở đây là Docker có một cơ chế layer caching để không phải thực hiện việc build lại layer nếu nó không có sự thay đổi so với lần build trước đó. Điều này rất quan trọng và là một trong những điều cơ bản đầu tiên khi thực hiện tối ưu Docker. Những lệnh sẽ tạo ra layer trong quá trình build là: `RUN`, `COPY` và `ADD`. 
Có thể bạn không thấy rõ cái layer này được tạo ra thế nào khi thực hiện docker build. Chẳng hạn như với một Dockerfile tạo một web app bằng nodejs

```
FROM node:argon
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
EXPOSE 8080
CMD [ "npm", "start" ]
```

khi thực hiện build thì nó sẽ như thế này

```
$ docker build -t expressweb .
Step 1 : FROM node:argon
argon: Pulling from library/node...
...
Status: Downloaded newer image for node:argon
 ---> 530c750a346e
Step 2 : RUN mkdir -p /usr/src/app
 ---> Running in 5090fde23e44
 ---> 7184cc184ef8
Removing intermediate container 5090fde23e44
Step 3 : WORKDIR /usr/src/app
 ---> Running in 2987746b5fba
 ---> 86c81d89b023
Removing intermediate container 2987746b5fba
Step 4 : COPY package.json /usr/src/app/
 ---> 334d93a151ee
Removing intermediate container a678c817e467
Step 5 : RUN npm install
 ---> Running in 31ee9721cccb
 ---> ecf7275feff3
Removing intermediate container 31ee9721cccb
Step 6 : COPY . /usr/src/app
 ---> 995a21532fce
Removing intermediate container a3b7591bf46d
Step 7 : EXPOSE 8080
 ---> Running in fddb8afb98d7
 ---> e9539311a23e
Removing intermediate container fddb8afb98d7
Step 8 : CMD npm start
 ---> Running in a262fd016da6
 ---> fdd93d9c2c60
Removing intermediate container a262fd016da6
Successfully built fdd93d9c2c60
```

Các layer nằm ở đâu trong cái đống này. Thì là cuối mỗi step các bạn sẽ thấy một dòng như thế này `---> 530c750a346e` đó chính là layer được tạo ra ở step đó với một ID ngẫu nhiên. Ơ thế step nào cũng tạo ra layer mà nhỉ, có phải mỗi  `RUN`, `COPY` và `ADD` đâu. Thì đây mình sẽ giải thích. Chúng ta thực thi lệnh history để xem tất cả các layer được tạo ra.

```
docker history <image>
$ docker history expressweb
IMAGE         CREATED    CREATED BY                       SIZE      
fdd93d9c2c60  2 days ago /bin/sh -c CMD ["npm" "start"]   0 B
e9539311a23e  2 days ago /bin/sh -c EXPOSE 8080/tcp       0 B
995a21532fce  2 days ago /bin/sh -c COPY dir:50ab47bff7   760 B
ecf7275feff3  2 days ago /bin/sh -c npm install           3.439 MB
334d93a151ee  2 days ago /bin/sh -c COPY file:551095e67   265 B
86c81d89b023  2 days ago /bin/sh -c WORKDIR /usr/src/app  0 B
7184cc184ef8  2 days ago /bin/sh -c mkdir -p /usr/src/app 0 B
530c750a346e  2 days ago /bin/sh -c CMD ["node"]          0 B
```

Ở cột IMAGE các bạn có thể thấy nó liệt kê hết các layer ID được tạo ở mỗi step nhưng hãy chú ý đến phần SIZE. Bạn đã thấy sự khác biệt chưa. Các lệnh tạo layer đều có size > 0 và về nguyên tắc khi build image, nếu có sự thay đổi so với layer trước thì một layer mới sẽ được tạo và với các lệnh có size > 0 nó làm thay đổi layer hiện tại nên dĩ nhiên nó sẽ tạo ra một layer mới.

# Cách viết Dockerfile
Sau khi đã nắm được các thành phần của Dockerfile, việc tiếp theo là làm thế nào để viết Dockerfile từ các thành phần đó. Xem lại ví dụ ở trên thì có thể định hình được cấu trúc của 1 Dockerfile sẽ gồm các phần chính:

* FROM: xác định base image. Lệnh đầu tiên của bất cứ Dockerfile nào.
* Thiết lập workdir: chỉ rõ thư mục làm việc để copy source và cài ứng dụng chẳng hạn. Việc này rất cần thiết để tách biệt các ứng dụng với nhau
* Cài đặt ứng dụng: Sau khi đã có source code thì hẳn là run build và start application đúng không nhỉ
* Tùy chỉnh cấu hình: Đây là bước cuối để chốt lại cái mà bạn sẽ public với container được tạo ra từ image được định nghĩa với Dockerfile. Nào là port, cần chạy thêm command nào. Đây chính là nơi mà các bạn sẽ sử dụng những lệnh như `EXPOSE`, `CMD` hay `ENTRYPOINT`. Và một điều lưu ý là đừng quên `HEALTHCHECK` đối với một số container quan trọng.

Lưu ý khi viết Dockerfile, bạn cũng nên thiết lập .dockerignore để loại bỏ những file ko cần thiết ra khỏi quá trình build. Điều này giúp cho việc bạn không phải build lại image khi có những thay đổi nhỏ như update README.md... 

Thêm một ví dụ viết theo cấu trúc trên cho các bạn dễ hình dùng

```
FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY . .
WORKDIR /src/DemoService
RUN dotnet restore
RUN dotnet build

FROM build AS publish
RUN dotnet publish -c Debug -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
EXPOSE 20016
ENTRYPOINT ["dotnet", "DemoService.dll", "--debug"]
```

Ở ví dụ trên, mình có sử dụng  multi-stage build để tối ưu hóa quá trình build image. Bạn có thể tham khảo bài viết [này](https://viblo.asia/p/docker-image-in-production-cau-chuyen-1gb-hay-100mb-LzD5dXyE5jY) để biết thêm những cách tinh chỉnh Dockerfile hoặc tham khảo [best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#create-ephemeral-containers) từ chính trang chủ docker


# Cách sử dụng Dockerfile

Dockerfile thì dùng để build image chứ còn gì nữa. Để build image chúng ta thực thi lệnh sau:

```
docker build [OPTIONS] PATH | URL | -
```

Thông thường chúng ta thực thi lệnh này ngay tại folder chứa Dockerfile nên về `PATH` hoặc `URL` thì mình thường không khuyến cáo các bạn sử dụng. Theo mình đối với docker build, chúng ta chỉ nên quan tâm tới option là `-t` (hay `--tag`) để gán tên và tag cho image. Ví dụ như:

`docker build -t demoapp:latest`

lệnh trên sẽ thực hiện build image với tên là `demoapp` và tag là `latest`. Lưu ý format là `name:tag` nhé. Sau khi build image, chúng ra thực hiện `docker run` để start container từ image đó. Easy phải không?
Doc cho [docker build](https://docs.docker.com/engine/reference/commandline/build/) và [docker run](https://docs.docker.com/engine/reference/commandline/run/)

Ngoài ra bạn cũng có thể sử dụng Dockerfile trong docker compose, nơi để gom các Dockerfile riêng lẻ để chúng chạy chung với nhau. Chẳng hạn như:

```
version: '3.4'

services:

  demoapp:
    build: 
      context: .
      dockerfile: demoapp/Dockerfile
    image: demo/demoapp
    environment:
      - ASPNETCORE_ENVIRONMENT=${ASPNETCORE_ENVIRONMENT}
    ports:
      - "11223:11223"
      
  demoapp-worker:
    build:
      context: .
      dockerfile: worker/Dockerfile
    image: demo/demoapp-worker
    environment:
      - ASPNETCORE_ENVIRONMENT=${ASPNETCORE_ENVIRONMENT}
```

Các Dockerfile sẽ được thực thi khi chạy `docker-compose build` với hoặc `docker-compose up` với option là `--build` (thực hiện build image trước khi start container). Mình dự dịnh sẽ viết thêm 1 bài về docker compose sau khi đã nghiên cứu thêm, chứ giờ thì trình còn còi nên không dám viết sợ mấy bạn chê :sweat_smile: 


# Lời kết

Dockerfile là thành phần chủ chốt, trái tim của docker nên hi vọng qua bài viết này, bạn có cái nhìn rõ hơn về Dockerfile và thêm tự tin khi bắt đầu làm việc với nó. Nếu có bất cứ thắc mắc hoặc có ý kiến đóng góp gì, xin hãy cứ để lại comment. Nếu thấy hay mình sẽ tổng hợp và đưa nó vào serial những câu hỏi về docker của mình. Rất cảm ơn các bạn đã dành thời gian đọc hết bài này. Cheers.

À sau đây mình cũng xin note nhẹ một số bài viết hay về Dockerfile mà mình đã tham khảo được khi viết bài này. Rất đáng để đọc nhé.

Phần 2 - Dockerfile trong serial Docker: Chưa biết gì đến biết dùng của tác giả Hoàn Kỳ: [link](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-2-dockerfile-RQqKLzeOl7z)

Docker image in production - câu chuyện 1GB hay 100MB của tác giả Minh Momen: [link](https://viblo.asia/p/docker-image-in-production-cau-chuyen-1gb-hay-100mb-LzD5dXyE5jY)
# Tham khảo
* https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-2-dockerfile-RQqKLzeOl7z
* https://viblo.asia/p/docker-image-in-production-cau-chuyen-1gb-hay-100mb-LzD5dXyE5jY
* https://docs.docker.com/engine/reference/builder/
* https://kapeli.com/cheat_sheets/Dockerfile.docset/Contents/Resources/Documents/index
* https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#create-ephemeral-containers