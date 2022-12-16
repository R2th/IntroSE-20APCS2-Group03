Nếu bạn có đọc qua [bài viết trước](https://viblo.asia/p/so-luoc-qua-ve-kien-truc-he-thong-cua-docker-07LKX2vplV4) của mình, bạn sẽ hiểu qua được concept của Docker, các tool cần thiết và phần quan trọng nhất của bài viết đó là *Container Networking* (đây là cái mà không phải ai dùng docker cũng biết). Bài viết đó được dịch từ quyển Docker Up & Running. 

Mình có đọc lướt qua cuốn đó, điều mình nhận thấy là nó ở những phiên bản tương đối cũ (2015) và với công nghệ thay đổi, rất nhiều những hoạt động của docker cũng thay đổi theo, một số câu lệnh và dẫn giải trong cuốn đó đã không còn hoạt động (hay nói cách khác là bị thay thế). *Gần mực thì đen mà gần đèn thì rạng*, các cụ nói không sai, do đó mình tìm đến 1 cuốn khác có vẻ mới mẻ hơn đó là Docker In Practice của **Ian Miell** và **Aidan Hobson Sayers**. 

Trong bài viết này sẽ giới thiệu về concept của docker, 2 khái niệm image và container kèm đó là hướng dẫn các bạn build 1 ứng dụng đơn giản sử dụng docker. Nội dung mình sẽ dịch cũng sẽ chỉ là Part1-> Chapter1 của cuốn này. Mình sẽ đi từ phần Key concepts (có 2 đoạn trước đoạn này nhưng nó tương đối giống với mình giới thiệu ở bài trước nên mình ko đưa vào).

## 1. Key concepts
Phần này ta sẽ bao quát 1 vài key concepts của Docker, được miêu tả như hình sau: 

![Docker concept](https://images.viblo.asia/f72e1c50-f33c-4987-aba4-c84c8d9d7f8c.png)

Ta dễ dàng thấy được concept của các image, container, hay layer như được giải thích trong hình vẽ. Nói ngắn gọn, *containers* chạy các hệ thống được định nghĩa bởi *images*. Các images được cấu thành 1 hoặc nhiều lớp cộng với vài metadata cho Docker.

>**Nó tè 1**: Anh em sẽ thắc mắc là metadata là gì, đại khái nó là 1 loại dữ liệu để lưu trữ thông tin về 1 loại dữ liệu khác, kiểu như khi cài đặt 1 package trên ubuntu nó sẽ cho chúng ta biết cần phải cài thêm những gì, tương thích phiên bản nào ... Định nghĩa chi tiết anhem có thể xem ở đây => [Metadata](https://en.wikipedia.org/wiki/Metadata).

Tiếp theo chúng ta sẽ xem 1 vài Docker commands.
### Key Docker commands
Docker được sinh ra để build, ship, và run phần mềm ở bất kỳ đâu có cài docker. Với end user (tức là chúng ta), Docker là 1 command-line program mà chúng ta có thể chạy nó. Giống git, chương trình này có những subcommands thực hiện các biểu thức khác nhau. Các subcommand chính của Docker bao gồm: 


| Command | Tác dụng |
| -------- | -------- |
| docker build| Khởi chạy 1 docker image.| 
| docker run     | Chạy 1 docker image như 1 container     | 
| docker commit    | Commit 1 docker container như 1 image    | 
| docker tag     | Tag 1 docker image     | 

### Image và Container
Nãy giờ chúng ta cứ đá qua đá lại 2 khái niệm này mà chưa hiểu rõ lắm, giờ chúng ta sẽ tìm hiểu qua chút về nó. 
![Image and container](https://images.viblo.asia/279255ee-cd61-42f6-bb64-8b37780c7a7e.png)

Hình vẽ giải thích khá rõ về Image và Container.

Nếu bạn đã quen với hướng đối tượng, chúng ta có thể hiểu images như những class còn cointaner là những object. Tương tự như việc các object được khởi tạo từ những class, container cũng được khởi tạo từ image. Bạn có thể tạo ra nhiều container từ 1 image, và chúng đều bị cô lập như cách các object khởi tạo. Bất kỳ thay đổi  nào trên object, nó sẽ không ảnh hưởng đến định nghĩa và function của class. 
## 2. Xây dựng 1 ứng dụng docker.
Phần này bắt đầu hấp dẫn vì ta sẽ đi vào xây dựng 1 cái gì đó hay ho. Chúng ta sẽ xây dựng 1 ứng dụng đơn giản qua image với Docker.  Trong quá trình này, ta cũng sẽ thấy 1 vài keyword như Dockerfiles, image re-use(tái sử dụng), port exposure (đoạn này mình chưa hiểu lắm chắc là export ra cổng nào đó) và build automation (tự động build). Chúng ta sẽ học những thứ sau:
* Tạo 1 image sử dụng Dockerfile.
* Tag 1 Docker image để dễ dàng trỏ đến
* Chạy mới Docker image.

Nội dung app không quan trọng lắm, chúng ta có thể lấy ngẫu nhiên 1 ứng dụng nào đó, giả sử 1 web nhỏ bằng PHP hoặc nodejs. Chúng ta sẽ từ 1 Dockerfile mà có thể build, run, stop, start 1 ứng dụng trên bất kỳ host nào mà không cần lo lắng về cách cài đặt nó. Đây chính là thứ mà Docker tạo ra cho chúng ta: độ tin cậy khi xây dựng và dễ dàng quản lý và chia sẻ môi trường phát triển.

### 2.1 Cách để tạo 1 Docker image.
Có 4 cách cơ bản để tạo Docker image:


| Phương thức | Mô tả |
| -------- | -------- |
| Docker commands / "By hand"     | Tạo 1 container với `docker run` và `input`. Tạo 1 image qua `docker commit` . |
| Dockerfile     | Xây dựng từ 1 image cơ bản, với build xác định cùng với số lượng command nhất định (recommend) .    |
| Dockerfile và configuration management (CM) tool     | Giống Dockerfile, nhưng kiểm soát để build thêm qua cộng cụ CM tool .  |
| Scratch image và import 1 vài file | Từ 1 image rỗng, import 1 **tar** file với 1 vài file bắt buộc .|

Cách thứ 1 sẽ tốt nếu ta đang thực hiện quá trình xem cách image của chúng ta được cài đặt đúng hay không. Ta cũng nên ghi lại các bước thực hiện để có thể thực hiện lại.

Cách thứ 2 sử dụng khi bạn đã biết trước cần cài những gì và muốn đặt ra thứ tự thực hiện để tạo ra image.

Cách thứ 3 là khi ta muốn cài thêm 1 số package mà cảm thấy khó có thể cài qua Dockerfile. (not recommend) Cài này yêu cầu phải am hiểu 1 tẹo.

Cách cuối cùng mình xin không đề cập (mình cũng chả hiểu cách này lắm).

Nghe hấp dẫn phết rồi nhỉ, bây giờ ta sẽ thực hành cách số 2.

### 2.2 Viết 1 dockerfile

Dockerfile là 1 text file với một loạt các command bên trong nó. Ta sẽ xem 1 ví dụ dưới đây: 
```dockerfile
FROM node
MAINTAINER nonaem@gmail.com
RUN git clone -q https://github.com/docker-in-practice/todo.git
WORKDIR todo
RUN npm install > /dev/null
EXPOSE 8000
CMD ["npm","start"]
```
* Chúng ta bắt đầu file bằng xác định 1 image cùng với command : *FROM*. Ví dụ này ta sử dụng Nodejs image có tên là node.
* Tiếp theo ta định nghĩa ra người sẽ bảo trì file với command: *MAINTAINER*. Chúng ta có thể để tên hoặc email hay bất kỳ cái gì có thể tượng trưng cho bạn. (cái này ko yêu cầu, có hay không đều được.
* Tiếp đó, chúng ta clone todoapp với command: *RUN*. Đại khái command này sẽ chạy lệnh ngay phía sau nó cho chúng ta. (nên nhớ rằng git đã có sẵn trong image node, do đó ta có thể sử dụng, nếu bạn lấy từ image chưa cài đặt git lệnh sẽ không thực hiện được và sẽ xảy ra lỗi, ta sẽ bàn điều này ở các phần khác :v).
* Tiếp theo ta sẽ trỏ vào thư mục *todo* bằng command: *WORKDIR*. Lệnh này chỉ có tác dụng là trỏ vào thư mục ta  muốn đi vào để cài đặt hay thoát ra ...
* Kế tiếp là 1 lệnh cực kỳ quen thuộc được hiện bởi command *RUN* : npm install. Như đã nói, sau khi trỏ được vào thư mục todo đã chứa app của chúng ta, ta sẽ cài đặt các package qua lệnh npm install (mình định làm bài về laravel nhưng đoạn cài đặt sẽ hơi dài dòng rắc rối gây khó hiểu nên mình vẫn giữ nguyên của tác giả, chắc mình sẽ làm 1 bài về nó sau, thực tế mình cũng ko biết gì về nodejs hihihe).
* Command EXPOSE sẽ xác định cổng ra mà bạn muốn container của bạn được lắng nghe bởi Docker. (Lệnh này không nhất thiết phải có trong trường hợp bạn build nhưng không muốn bất kỳ cổng nào lắng nghe). 
* Cuối cùng, CMD command sẽ cho Docker biết lệnh nào sẽ được chạy khi container bắt đầu được chạy (khác với build image nhé, lệnh này chỉ chạy khi bạn build container -> khá ổn).
### 2.3 Build a Docker Image
Nãy giờ chỉ nói mà chẳng làm, oke anhem chạy nào :v 

Ta sẽ build image qua lệnh: 

`$ docker build path/to/your/dockerfile` . 

Nếu bạn đã ở trong thư mục chứa dockerfile thì chỉ cần chạy: `docker build .`  . Oke chạy 1 lúc (khá lâu) sẽ ra một đống kết quả ta sẽ thấy rằng thứ tự thực hiện sẽ từ trước đến sau như định nghĩa trong dockerfile. 

```bash
Sending build context to Docker daemon  2.048kB
Step 1/7 : FROM node
latest: Pulling from library/node
22dbe790f715: Pull complete 
0250231711a0: Pull complete 
6fba9447437b: Pull complete 
c2b4d327b352: Pull complete 
270e1baa5299: Pull complete 
08ba2f9dd763: Pull complete 
edf54285ab13: Pull complete 
4d751c169397: Pull complete 
Digest: sha256:065610e9b9567dfecf10f45677f4d372a864a74a67a7b2089f5f513606e28ede
Status: Downloaded newer image for node:latest
 ---> 9ff38e3a6d9d
Step 2/7 : MAINTAINER nonaem@gmail.com
 ---> Running in eac19ce0398b
Removing intermediate container eac19ce0398b
 ---> 91e40220da2c
Step 3/7 : RUN git clone -q https://github.com/docker-in-practice/todo.git
 ---> Running in 27b7af3f1098
Removing intermediate container 27b7af3f1098
 ---> 7d55fde175bf
Step 4/7 : WORKDIR todo
 ---> Running in 253ddbd819c6
Removing intermediate container 253ddbd819c6
 ---> c6d60b19725c
Step 5/7 : RUN npm install > /dev/null
 ---> Running in e02a256c7894
Removing intermediate container e02a256c7894
 ---> 89f29f3b9204
Step 6/7 : EXPOSE 8000
 ---> Running in f7e50e2982cd
Removing intermediate container f7e50e2982cd
 ---> bd67da47b1c3
Step 7/7 : CMD ["npm","start"]
 ---> Running in 38a158bcfa0a
Removing intermediate container 38a158bcfa0a
 ---> db5e771f7120
Successfully built db5e771f7120
```

Bây giờ ta đã có Docker image với IMAGE ID = db5e771f7120 (mỗi lần build mã này ra khác nhau nên đừng ông nào ý kiến rằng id khác của tôi nhé), ta có thể kiểm tra qua lệnh `docker images` sẽ thấy:
```bash
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
<none>              <none>              db5e771f7120        2 minutes ago       954MB
```

Chính nó và đồng bọn, nhưng nó không có tên cũng chưa có phiên bản(tag). Lúc nãy ta có nhắc đến tag 1 image, nhiều anhem chắc chưa hiểu lắm thì đây là cách để tag nó: `docker tag IMAGE_ID name`, ví dụ tôi muốn đặt tên cho image này là ngocapp thì tôi sẽ run: `docker tag db5e771f7120 ngocapp`.
Bây giờ thì thử kiểm tra: 
```bash
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ngocapp             latest              db5e771f7120        10 minutes ago      954MB
```
khá ổn :v giờ nó có tên là ngocapp rồi. 
>**Nó tè 2**: Cái tag này khác với cái TAG hiển thị ở trên terminal nhé, TAG kia là chỉ phiên bản, còn tag trong lệnh của chúng ta là đặt tên cho image , các bạn đừng bị nhầm nhé.

### 2.4 Build docker container.

Bây giờ ta sẽ chạy lệnh để build container: 
`docker run -p 8000:8000 --name ngoc_container ngocapp `

Cú pháp nhìn có vẻ hơi loằng ngoặc nhưng thực ra là chả có gì cả: 
* `-p <port1>:<port2>`: ở đây port1 sẽ là port của container (nãy ta đã setup là 8000) và port2 sẽ là port trên máy bạn đang cài đặt.
* `--name <container_name>`: đây là tên của container.
* `ngocapp` chính là cái tên của image mà ta vừa tag vào lúc nãy :v: 

Chạy xong nó sẽ hiện ra 1 đống: 
```bash
$ docker run -p 8000:8000 --name ngoc_container ngocapp
> todomvc-swarm@0.0.1 prestart /todo
> make all
npm install
npm WARN todomvc-swarm@0.0.1 No repository field.
npm WARN todomvc-swarm@0.0.1 license should be a valid SPDX license expression
audited 853 packages in 3.085s
...
> todomvc-swarm@0.0.1 start /todo
> node TodoAppServer.js

Swarm server started port 8000
```

Đoạn hơi dài ở giữa mình để ... cho dễ nhìn. Giờ anhem sẽ bật 1 terminal khác lên để kiểm tra (Ctrl Shift T để bật tab như chrome). Ta kiểm tra các container đang chạy bằng : `docker ps`.
```bash
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
887dd5572038        ngocapp             "npm start"         5 minutes ago       Up 5 minutes        0.0.0.0:8000->8000/tcp   ngoc_container
```
Đấy container của bạn đang được hoạt động , chạy trên cổng 8000 và có name như yêu cầu. Để dừng container ta chạy phím Ctrl C hoặc tắt terminal (force quit) thì container sẽ ngừng hoạt động, lúc này ta sẽ kiểm tra bằng lệnh hiển thị tất cả các container `docker ps -a`:
```bash
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS                                              NAMES
887dd5572038        ngocapp             "npm start"              9 minutes ago       Exited (0) 5 seconds ago                                                      ngoc_container
```
Tắt rồi nên status sẽ là tồn tại mấy giây trước hay bao lâu trước đó, ta sẽ thấy cột port rỗng vì lúc này container của ta đã tạm dừng. 

Để chạy lại nó ta sẽ chạy lệnh `docker restart ngoc_container`. Lúc này container của chúng ta sẽ sống trở lại (nếu container của bạn dựng lên 1 lúc rồi lại tắt thì có thể nó đã bị lỗi khi khởi tạo lại - đen thôi, đỏ vẫn vậy). Hoặc có thể chạy `docker start ngoc_container` cũng tương tự, ta có thể thêm option để hiển thị quá trình khởi tạo lại container ra terminal với option `docker start ngoc_container -i` .
## 3. Tổng kết
Qua vài ví dụ đơn giản ta cũng biết được cách docker hoạt động, tự build 1 dockerfile đơn giản, giải thích về cách hoạt động bên trong, và 1 số command mà thường hay phải sử dụng. Chúng ta cũng hiểu về Image và Container, 2 khái niệm cực kỳ quan trọng. Mình sẽ cố gắng làm thêm 1 bài nữa về chủ đề này, có thể là config docker cho 1 web laravel cùng với 1 vài tool hỗ trợ như docker-compose và cách scale 1 project web với docker. Cảm ơn các bạn đã theo dõi, thắc mắc hoặc thấy có gì không đúng các bạn có thể comment dưới bài cho mình nhé.
## Nguồn tham khảo: 
- **Docker In Practice** - **Ian Miell and Aidan Hobson Sayers**.