Hiện nay Docker đã quá phổ biến trong lĩnh vực lập trình, nó được ứng dụng rất nhiều trong phá trình phát triển và phát hành.
Để bắt đầu với Docker, viết một dockerfile thì có vẻ đơn giản, nhưng viết 1 dockerfile hiệu quả thì ko đơn giản.
Bài viết này tôi sẽ giới thiệu về một trong những cách tốt nhất để viết [Dockerfiles](https://docs.docker.com/engine/reference/builder/) đó là sử dụng **multi-stage**.
Tôi sẽ bỏ qua các khái niệm cơ bản về docker nhưng trong bài viết tôi vẫn sẽ gắn link với những khái niệm cần thiết.

# 1. **Vấn đề gặp phải khi sử dụng single-stage**

Theo như [tài liệu chính thức](https://docs.docker.com/develop/develop-images/multistage-build/#before-multi-stage-builds) của docker viết thì 
một trong nhưng thách thức lớn nhất của việc giảm kích thước của một image docker là điều khó khăn nhất. Mỗi chỉ dẫn([instructions](https://docs.docker.com/engine/reference/builder/#onbuild)) trong docker file sẽ tạo ra một layer, mỗi layer sẽ làm cho kích thước của image tăng lên. Điều này sẽ làm cho việc maintain, và tạo ra các [container](https://www.docker.com/resources/what-container) cái mà sẽ thực thi các hình ảnh này trở nên khó khăn.

Để giữ cho kích thước của image nhỏ nhất có thể thì chúng ta cần sử dụng những thủ thuật shell và những logic cần thiết để giữ cho image nhỏ nhất có thể. Tôi sẽ lấy luôn ví dụ trong tài liệu của docker về multi-stage và giải thích lại.

Tôi sẽ có 2 file docker: `Dockerfile.build` và `Dockerfile`.

**Dockerfile.build**
```
# syntax=docker/dockerfile:1
FROM golang:1.16
WORKDIR /go/src/github.com/alexellis/href-counter/
COPY app.go ./
RUN go get -d -v golang.org/x/net/html \
  && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .
```

Như tôi đã nói ở trên thì mỗi chỉ dẫn(instruction) sẽ tạo ra một layer, để giảm thiều điều đó thì trong file trên đã sử dụng toán tử && trong Bash để rút ngăn từ 2 câu lệnh Run xuống 1 câu lệnh Run. Nhưng điều này lại có 1 nhược điểm là sẽ không sử dụng được [layer caching](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).
Mỗi khi 1 chỉ dẫn thay đổi sẽ build lại toàn bộ chỉ dẫn đó, điều này sẽ làm cho quá trình build image trở nên lâu hơn. Nhưng không sao, mục tiêu cuối cùng là giữ cho kích thước hình ảnh nhỏ nhất, còn việc build bao lâu thì kệ mấy ông dev.

Nếu 1 chỉ dẫn dài quá thì chúng ta có thể sử dụng `\` để xuống dòng.

**Dockerfile**
```
# syntax=docker/dockerfile:1
FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY app ./
CMD ["./app"]  
```

**build.sh**
```
#!/bin/sh
docker build --build-arg https_proxy=$https_proxy --build-arg http_proxy=$http_proxy \  
    -t alexellis2/href-counter:build . -f Dockerfile.build
docker container create --name extract alexellis2/href-counter:build  
docker container cp extract:/go/src/github.com/alexellis/href-counter/app ./app  
docker container rm -f extract
docker build --no-cache -t alexellis2/href-counter:latest .
rm ./app
```
Khi chạy file `build.sh`, ý nghĩa các câu lệnh sẽ như sau:

1. câu lệnh đầu tiên sẽ tạo 1 image
2. câu lệnh thứ 2 sẽ tạo ra 1 container từ image của câu lệnh đầu tiên
3. câu lệnh số 3 sẽ copy file artifacrt từ container ra ngoài host
4. câu lệnh số 4 sẽ xoá container mới được chạy
5. câu lệnh sỗ 5 là tạo image mà chúng ta cần
6. câu lệnh sỗ 5 sẽ xóa file copy từ container lúc trước ra host.

Chúng ta có thể thấy quá trình tạo được image mà chúng ta cần tốn rất nhiều công sức. Multi-stage build có thể giải quyết được những tình huống này.
    
# 2. **Cách sử dụng multi-stage.**
  Với multi-stage thì chúng ta có thể sử dụng nhiều chỉ dẫn `FROM` trong 1 Dockerfile. Và như chúng ta có thể thấy thì mỗi Dockerfile phải bắt đầu bằng chỉ dẫn `FROM`. Điều này có nghĩ chúng ta chỉ càn sử dụng thêm 1 chỉ dẫn `FROM` nữa là đã gọi là multi-stage rồi.

  Mỗi `FROM` thì có thể kế thừa từ một base image khác nhau, và mỗi lệnh bắt đầu một giai đoạn mới của quá trình build. Khi sử dụng multi-stage chúng ta có thể copy có chọn lọc nhưng đồ tạo tác từ một stage này qua một stage khác, bỏ lại những thứ không cần thiết. Việc này sẽ giảm bớt image size sau khi build.

 Từ ví dụ từ phần 1, khi sử dụng multi-stage thì chúng ta sẽ không phải sử dụng tới 2 Dockerfile. Chúng ta có thể gộp lại thành 1, và nó chỉ chứa những thứ thật sự cần thiết để chạy chương trình của chúng ta. Thiết kế này dựa trên lý thuyết về [Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern).
 ```
 # syntax=docker/dockerfile:1
FROM golang:1.16
WORKDIR /go/src/github.com/alexellis/href-counter/
RUN go get -d -v golang.org/x/net/html  
COPY app.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=0 /go/src/github.com/alexellis/href-counter/app ./
CMD ["./app"]  
```

Giờ chỉ cần dùng duy nhất 1 command để build image mà ko cần sử dụng tới file script.
```
docker build -t alexellis2/href-counter:latest .
```
Với việc sử dụng multi-stage thì không cần phải tạo hình ảnh trung gian nào cả. Và cũng không cần mất công copy đi copy lại bất cứ thứ gì giữa máy ảo và hệ thống cục bộ. 

Về cách thức hoạt động thì các bạn chú ý ở lệnh `FROM` thứ 2 nó đã tạo ra một stage hoàn toàn mới. Với việc chỉ rõ parent image là `alpine`, thì đây cũng là 1 bước làm giảm kích thước của image. Alpine là một bàn linux distribute với image size vào khoảng 5-6MB nhưng vẫn là một bản Linux hoàn chỉnh. Và đó là một base image tuyệt vời.

Câu lệnh `COPY --from=0 /go/src/github.com/alexellis/href-counter/app ./` sẽ copy toàn bộ thư mục `/go/src/github.com/alexellis/href-counter/` của stage trước vào stage hiện tại, còn lại tất cả các thứ viện được cài đặt ở stage trước bị bỏ lại.
    
# 3. **Tên của build stage.**
Trong ví dụ ở phần 2 các bạn có chú ý tới câu lệnh `COPY --from=0 /go/src/github.com/alexellis/href-counter/app ./`
có gì đặc biết không. Vâng, đó chính là `COPY --from=0`. Trong 1 dockerfile sử dụng multi-stage thì khi chúng ta không gán định danh cho các stage thì nó sẽ mặc định đánh số theo thứ tự từ trên xuống bắt đầu từ 0.

Tuy nhiên để dễ dàng sử dụng thì chúng ta nên gán tên cho từng stage với cú pháp:
```
FROM [--platform=<platform>] <image> [AS <name>]
or
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
or
FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
```
Khi sử dụng thì chúng ta  chỉ cần trỏ đúng tên của nó sẽ đỡ bị nhầm lẫn.

Tôi có 1 ví dụ khác:
```
FROM alpine:3.10 as intermediate
WORKDIR /app
ARG SSH_KEY
RUN apk add --no-cache git openssh-client build-base git-lfs \
  && mkdir -p /root/.ssh/ \
  && echo "$SSH_KEY" > /root/.ssh/id_rsa \
  && chmod -R 600 /root/.ssh \
  && ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
RUN git clone git@github.com:docker/docker.git && git lfs pull

FROM ubuntu:18.04
COPY --from=intermediate /app/ .
CMD ["echo", "Hello world"]
```
Trong ví dụ này tôi tạo ra 1 stage với tên là `intermediate`. Nhiệm vụ trong stage này chỉ là clone repo từ github. Nhưng để clone được từ github sử dụng SSH thì cần có private key. Tạo tạo ra file `/root/.ssh/id_rsa` rồi lưu key trong đó.
Đến stage thứ 2 thì tôi copy toàn bộ project được clone về trong thư mục app của stage 1 vào stage 2.
```
COPY --from=intermediate /app/ .
```
Tôi đã chỉ định rõ tên của stage 1 trong câu lệnh trên. Có 1 chú ý là khi tôi copy từ stage 1 sang stage 2 thì tôi bỏ lại toàn bộ những thứ khác không liên quan. Do đó tôi không sợ bị lộ private key được lưu trong stage 1. Điều này khác là an toàn so với việc bạn sử dụng 1 stage mà quên không xóa đi file `id_rsa`. Đây chỉ là 1 lưu ý nhỏ mà tôi muốn nhắc nhở các bạn.

Một tính năng mà có thể rất hữu ích trong quá trình phát triển đó là có thể dừng ở bất kì một stage cụ thế nảo trong quá trình build. Điều này sẽ giúp cho quá trình debug đối với stage dễ đàng hơn mà không phải build toàn bộ cả Dockerfile. Sẽ rất tiết kiệm thời gian với cú phát build như sau:
```
docker build --target builder -t alexellis2/href-counter:latest .
```
    
# 4. **Sử dụng một image bên ngoài giống như một stage.**

Khi sử dụng multi-stage thì chúng ta không bị giới hạn việc sao chép từ các stage trước. Chúng ta hoàn toàn có thể sử sao chép từ 1 hình ảnh cục bộ, hoặc đã tồn tại trên [docker registry](https://docs.docker.com/registry/) bằng cách sử dụng câu lệnh 
```
COPY --from
```
ví dụ:
```
COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf
```
Điều này hữu ích trong trường hợp bạn có 2 ứng dụng nhưng chúng có chung một core xử lý.
Như vậy chúng ta sẽ có 2 Dockerfile cho 2 ứng dụng đó. Nhưng thay vì trong mỗi dockerfile chúng ta phải viết lại quá trình build core xử lý thì chúng ta sẽ tạo ra 1 image riêng cho phần core xử lý đó và trong mỗi Dockerfile ứng dụng thì sẽ dùng nó như 1 stage.
    
**Dockerfile.core**
```
FROM ubuntu:18.04 as core
WORKDIR /app
RUN apt-get install -y software-properties-common \
  && add-apt-repository ppa:deadsnakes/ppa \
  && apt-get update \
  && apt-get install -y build-essential python3.6 python3.6-dev python3-pip python3.6-venv \
  && update-alternatives --install /usr/bin/python python /usr/bin/python3.6 10
```
*build image core with command:*
```
docker build -t sonnt/core:latest .
```

**Dockerfile.app1**
```
FROM alpine:3.10 as intermediate
WORKDIR /app
ARG SSH_KEY
RUN apk add --no-cache git openssh-client build-base git-lfs \
  && mkdir -p /root/.ssh/ \
  && echo "$SSH_KEY" > /root/.ssh/id_rsa \
  && chmod -R 600 /root/.ssh \
  && ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

FROM sonnt/core:latest
COPY --from=intermediate /app/ /home/deploy/
# thêm những logic xử lý cho app 1

CMD ["echo", "Hello world"]
```
    
**Dockerfile.app2**
   
```
FROM alpine:3.10 as intermediate
WORKDIR /app
ARG SSH_KEY
RUN apk add --no-cache git openssh-client build-base git-lfs \
  && mkdir -p /root/.ssh/ \
  && echo "$SSH_KEY" > /root/.ssh/id_rsa \
  && chmod -R 600 /root/.ssh \
  && ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

FROM sonnt/core:latest
COPY --from=intermediate /app/ /home/deploy/
#thêm những logic xử lý cho app 2

CMD ["echo", "Hello world"]
```
   
# 5. **Tổng kết**
Ở trên là một số ví dụ và vấn đề mà bạn có thể giải quyết khi sử dụng multi-stage build. Nhưng không phải lúc nào chúng ta cũng nên dùng, chúng ta cần linh hoạt trong xử lý để có thể tối ưu chương trình cũng như sức lực của chúng ta. Có một số trường hợp chúng ta sẽ cân nhắc có thể không cần sử dụng tới multi-stage:
- Đối với những ứng dụng không quá phức tạp và chúng ta muốn giữ sự dễ hiểu cho những người maintain về sau, vì rằng họ có thể không quen với việc sử dụng multi-stage. Điều này sẽ trở nên khó khăn với họ.
- Việc sử dụng multi-stage với việc tạo ra một external image sẽ làm tăng kích thước bộ nhớ với việc phải lưu trữ chúng.

Tôi xin kết thúc bài viết của mình ở đây. Nếu có bất kì sai xót nào xin các bạn hãy để lại comment để tôi có thể cải thiện tốt hơn. 

Cảm ơn đã đọc đến dòng này!

**Tài liệu tham khảo**

- https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
- https://en.wikipedia.org/wiki/Builder_pattern
- https://codefresh.io/events/multi-stage-docker-builds/