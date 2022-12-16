Dạo gần đây mình có nghe qua về docker, nghe yang hồ đồn có vẻ "ơ mây zing gút chóp" thế là mình cũng nghiên cứu tìm hiểu thì thấy nó  "ve ri  ơ mây zing gút chóp" thật =)).
Thôi dạo qua cái nó là cái quái gì mà yang hồ đồn nhiều đến vậy.
![](https://images.viblo.asia/14e7f64d-fb38-4339-99d2-e104f5b3b318.png)
# Vậy docker là gì?
Docker là một nền tảng cho developers và sysadmin để develop, deploy và run application với container. Nó cho phép tạo các môi trường độc lập và tách biệt để khởi chạy và phát triển ứng dụng và môi trường này được gọi là container. Khi cần deploy lên bất kỳ server nào chỉ cần run container của Docker thì application của bạn sẽ được khởi chạy ngay lập tức.

**Là sao ta??**

Giả sử mình có code một app mình sử dụng Rails, MySQL, nginx... khi code xong thì mình muốn deploy cho người dùng sử dụng. Để mà chạy trên server thì chúng ta cũng phải cài Ruby, Rails, MySQL... có thể version chúng ta cài khác trên local hoặc cài thiếu một số thư viện khiến app của chúng ta không chạy được. Đấy là lý do tại sao có câu "máy em vẫn chạy bình thường mà". Với điều nữa là việc cài đặt cũng tốn nhiều thời gian. Hay giả sử chúng ta muốn đưa app cho thằng bạn khoe mà máy nó lại không cài các thư viện cần dùng để chương trình chạy vậy làm thế nào để chạy ??. Đó cũng chính là lý do mà docker ra đời.
# Lợi ích của Docker
* Không như máy ảo Docker start và stop chỉ trong vài giây.
* Bạn có thể khởi chạy container trên mỗi hệ thống mà bạn muốn.
* Container có thể build và loại bỏ nhanh hơn máy ảo.
* Dễ dàng thiết lập môi trường làm việc. Chỉ cần config 1 lần duy nhất và không bao giờ phải cài đặt lại các dependencies. Nếu bạn thay đổi máy hoặc có người mới tham gia vào project thì bạn chỉ cần lấy config đó và đưa cho họ.
* Nó giữ cho word-space của bạn sạch sẽ hơn khi bạn xóa môi trường mà ảnh hưởng đến các phần khác.

# Cài đặt
Bạn có thể cài đặt theo đây:  [link download](https://docs.docker.com/get-docker/)
Chọn bản cài đặt tương ứng với hệ điều hành của bạn và tiến hành cài đặt theo hướng dẫn đối với Linux còn Windows và MacOS thì bạn chỉ cần tải bản cài về và cài đặt như mọi application khác.
Sau khi cài đặt xong để kiểm tra xem cài đặt thành công hay không ?
Mở command line:
```
$ docker version
$ docker info
$ docker run hello-world
```
# Một số khái niệm
![](https://images.viblo.asia/ab0449ae-d443-4951-ac4e-9204e30f573b.png)
* **Docker Client**: là cách mà bạn tương tác với docker thông qua command trong terminal. Docker Client sẽ sử dụng API gửi lệnh tới Docker Daemon.
* **Docker Daemon**: là server Docker cho yêu cầu từ Docker API. Nó quản lý images, containers, networks và volume.
* **Docker Volumes**: là cách tốt nhất để lưu trữ dữ liệu liên tục cho việc sử dụng và tạo apps.
* **Docker Registry**: là nơi lưu trữ riêng của Docker Images. Images được push vào registry và client sẽ pull images từ registry. Có thể sử dụng registry của riêng bạn hoặc registry của nhà cung cấp như : AWS, Google Cloud, Microsoft Azure.
* **Docker Hub**: là Registry lớn nhất của Docker Images ( mặc định). Có thể tìm thấy images và lưu trữ images của riêng bạn trên Docker Hub ( miễn phí).
* **Docker Repository**: là tập hợp các Docker Images cùng tên nhưng khác tags. VD: golang:1.11-alpine.
* **Docker Networking**: cho phép kết nối các container lại với nhau. Kết nối này có thể trên 1 host hoặc nhiều host.
* **Docker Compose**: là công cụ cho phép run app với nhiều Docker containers 1 cách dễ dàng hơn. Docker Compose cho phép bạn config các command trong file docker-compose.yml để sử dụng lại. Có sẵn khi cài Docker.
* **Docker Swarm**: để phối hợp triển khai container.
* **Docker Services**: là các containers trong production. 1 service chỉ run 1 image nhưng nó mã hoá cách thức để run image — sử dụng port nào, bao nhiêu bản sao container run để service có hiệu năng cần thiết và ngay lập tức.

#  Các thành phần cơ bản của docker
**Docker có 4 thành phần cơ bản:**
* Image
* Container
* Docker Engine
* Docker Hub
* **
1. **Image** Là file ảnh, file nền của một hệ điều hành, một nền tảng, một ngôn ngữ (vd: ubuntu image, ruby image, rails image, mysql image…)

    Từ các image này, bạn sẽ dùng nó để tạo ra các container.

    Các image là dạng file-chỉ-đọc (read only file).

    Tự bạn cũng có thể tạo image cho riêng mình.

    Một image có thể được tạo từ nhiều image khác (vd: bạn tạo 1 image chạy ubuntu, có cài sẵn ruby 2.3 và rails 5, image này của bạn được tạo nên bởi 3 image khác).

2. **Container** Là một máy ảo, được cấu thành từ 1 image và được đắp thêm 1 lớp “trang trí” writable-file-layer. Các thay đổi trong máy ảo này (cài thêm phần mềm, tạo thêm file…) sẽ được lưu ở lớp trang trí này.

    Các container này sẽ dùng chung tài nguyên của hệ thống (RAM, Disk, Network…), chính nhờ vậy, những container của bạn sẽ rất nhẹ, việc khởi động, kết nối, tương tác sẽ rất nhanh gọn.

    Nếu ánh xạ sang hướng đối tượng, thì image chính là class, còn container chính là instance-1 thể hiện của class đó. Từ 1 class ta có thể tạo ra nhiều instance, tương tự, từ 1 image ta cũng có thể tạo ra được nhiều container hoàn toàn giống nhau.

3. **Docker Engine** quản lý việc bạn tạo image, chạy container, dùng image có sẵn hay tải image chưa có về, kết nối vào container, thêm, sửa, xóa image và container, ....., vô vàn vô vàn

4. **Docker Hub** Là 1 trang chia sẻ các image, nó như kiểu github hay bitbucket vậy.

# Dockerfile
- Dockerfile là file config cho Docker để build ra image. Nó dùng một image cơ bản để xây dựng lớp image ban đầu. Một số image cơ bản: python, unbutu and alpine. Sau đó nếu có các lớp bổ sung thì nó được xếp chồng lên lớp cơ bản. Cuối cùng một lớp mỏng có thể được xếp chồng lên nhau trên các lớp khác trước đó.
- Các config :
    * FROM — chỉ định image gốc: ruby, unbutu, alpine…
    * LABEL — cung cấp metadata cho image. Có thể sử dụng để add thông tin maintainer. Để xem các label của images, dùng lệnh docker inspect.
    * ENV — thiết lập một biến môi trường.
    * RUN — Có thể tạo một lệnh khi build image. Được sử dụng để cài đặt các package vào container.
    * COPY — Sao chép các file và thư mục vào container.
    * ADD — Sao chép các file và thư mục vào container.
    * CMD — Cung cấp một lệnh và đối số cho container thực thi. Các tham số có thể được ghi đè và chỉ có một CMD.
    * WORKDIR — Thiết lập thư mục đang làm việc cho các chỉ thị khác như: RUN, CMD, ENTRYPOINT, COPY, ADD,…
    * ARG — Định nghĩa giá trị biến được dùng trong lúc build image.
    * ENTRYPOINT — cung cấp lệnh và đối số cho một container thực thi.
    * EXPOSE — khai báo port lắng nghe của image.
    * VOLUME — tạo một điểm gắn thư mục để truy cập và lưu trữ data.
# Demo
Tạo dockerfile:
```
FROM ruby:2.7.1

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV RAILS_ENV='development'
ENV RAKE_ENV='development'

COPY . /usr/src/app
RUN bundle install
CMD ["rails", "s"]
EXPOSE 3000
```

Ở Dockerfile dành cho ứng dụng rails, mình cần một image cơ bản từ Dockerhub Bạn cần tìm kiếm cho mình một image cơ bản phù hợp ở dockerhub, bạn có thể tìm kiếm với từ khóa như rails hoặc ruby, sẽ có nhiều hướng dẫn để viết một file Dockerfile phù hợp.

`FROM ruby:2.7.1`

Dòng này thực hiện pull image ruby2.7.1 từ dockerhub về, nó sẽ chứa những thứ cần thiết như các thư viện lõi cho một ứng dụng ruby. Nếu trên host có image thì nó sẽ sử dụng image trên host hiện tại, ví dụ FROM my_image

`RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs`

Tác dụng: Chạy những command trong quá trình build, ở đây mình cần cài đặt một vài thiết lập môi trường cần thiết

`RUN mkdir -p /usr/src/app`
Và tạo một thư mục cho riêng app sẽ chạy, và khai báo thư mục này vào WORKDIR

`ENV RAILS_ENV='development'`
ENV là nơi khai báo các biến môi trường cho ứng dụng.

`COPY . /usr/src/app`
Câu này sẽ copy toàn bộ code vào thư mục /usr/src/app của image

Chừng đó là chúng ta có toàn bộ code của ứng dụng rails trong image. Tiếp theo sẽ build app rails thông qua các command cần thiết.

`RUN bundle install`
Chạy main process

`CMD ["rails", "s"]`
Và expose sẽ xác định cổng giao tiếp với container

`EXPOSE 3000`

Như vậy chúng ta đã có một Dockerfile, tiếp theo cần build image, chạy lệnh theo format sau để build image:

`docker build [OPTIONS] PATH | URL | -`

run

`docker build -t notification-api:dev .`

Bao giờ thấy thông báo như sau là bạn đã build thành công.

```
Successfully built dab0ce26ab25
Successfully tagged notification-api:dev
```

# Các lênh cơ bản trong docker
* List image/container:

     ` $ docker image/container ls`
     
* Delete image/container:

    `$ docker image/container rm <tên image/container >`
    
* Delete all image hiện có:

    `  $ docker image rm $(docker images –a –q)`
* List all container hiện có:
   
     ` $ docker ps –a`
       
* Stop a container cụ thể:
       
     ` $ docker stop <tên container>`

* Run container từ image và thay đổi tên container:
    
    `$ docker run –name <tên container> <tên image>`

* Stop all container:
    
    `$ docker stop $(docker ps –a –q)`

* Delete all container hiện có:
    
    `$ docker rm $(docker ps –a –q)`

* Show log a container:
    
    `$ docker logs <tên container>`

* Build một image từ container:
    
    $ docker build -t <tên container> .

* Tạo một container chạy ngầm:`
    
    $ docker run -d <tên image>

* Tải một image trên docker hub:
    
    `$ docker pull <tên image>`

* Start một container:
    
    `$ docker start <tên container>`

# Kết luận:
Do em mới tìm hiểu nên còn sơ khai mong mọi người góp ý.

Tài liệu tham khảo:

https://docs.docker.com

https://medium.com/swlh/what-exactly-is-docker-1dd62e1fde38