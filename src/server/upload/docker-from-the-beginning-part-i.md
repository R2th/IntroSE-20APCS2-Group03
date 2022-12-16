Xin chào các bạn!
Như tiêu đề thì nội dung bài viết này mình muốn nói về Docker. Bài viết này là phần đầu tiên trong series Docker- basics mà mình sẽ viết trong thời gian tới.
Mình vào thẳng vấn đề lun nhé.
## Why Docker.
Docker giúp bạn tái tạo lại một môi trường, bạn có thể chỉ định OS, phiên bản khác nhau của các thư viện và các biến môi trường. Điều quan trọng nhất khi dùng docker là ứng dụng của bạn sẽ chạy độc lập bên trong môi trường được chỉ định trong docker.
Một câu hỏi lớn là tại sao ta phải dùng docker, để trả lời cho câu hỏi đó chúng ta có 2 lý do sau:
- Giả sử các bạn join vào project đã start được một thời gian, nếu dự án code trên môi trường máy thực thì bạn sẽ phải cài một số thứ như: SDKs, databases, permissions và một số thứ khác nữa. Công việc này có thể mất từ vài giờ cho đến vài ngày tùy vào độ phức tạp của project.
- Environments looks the same: Sử dụng docker bạn có thể tạo 3 môi trường dev, stagin và production giống nhau hoàn toàn, tránh các bug phát sinh do sai khác môi trường giữa production và dev.
- Works on my machine: Docker tạo những container chạy độc lập trong máy thực, nơi mà chúng ta có thể chỉ định chính xác những gì chúng ta muốn cài. Chúng ta có thể gửi những containers cho khách hàng hoặc member mới join dự án và họ có thể chạy project trong môi trường giống như chúng ta.
## What is it.
Docker tạo những packages độc lập, gọi là container - nơi chứa  tất cả những thứ mà chúng ta cần để chạy ứng dụng, bao gồm source code mà chúng ta viết. Mỗi container có tài nguyên CPU, bộ nhớ và các kết nối riêng và không phụ thuộc vào hệ điều hành hoặc kernel cụ thể. Nói đến đây chắc hẳn các bạn nghĩ đến Máy ảo, nhưng Docker khác biệt ở cách nó chia sẻ hoặc dành tài nguyên. Docker sử dụng một thứ gọi là layered file system cho phép các thùng chứa chia sẻ các phần chung và kết quả cuối cùng là các thùng chứa ít tài nguyên hơn so với máy ảo.
## Docker in action.
Ở trên tôi đã nói về lợi ích khi sử dụng docker và giải thích qua về container trong docker. Ở phần này chúng ta sẽ bắt đầu với một description file, gọi là Dockerfile. Trong Docker file chúng ta sẽ chỉ định OS, biến môi trường và những gì app của bạn cần để chạy.
Chúng ta sẽ tạo một application và Dockerize. Và sau đó sẽ chạy app của chúng ta bên trong container, độc lập với bên ngoài nhưng có thể truy cập thông qua port mà chúng ta mở.
Chúng ta sẽ thực hiện theo các step sau:
+ Tạo một application : Chúng ta sẽ tạo một app Nodejs Express, hoạt động như  REST API.
+ Tạo Dockerfile: Một file text nói cho Docker build application của chúng ta như thế nào.
+ Build an image: Bước đầu tiên để ứng dụng của chung ta chay được là phải tạo một cái gọi là Docker image.
+ Create a container: Đây là bước  cuối cùng để app của chúng ta chạy được. Chúng tả sẽ create Docker container từ Docker image.
### Creating our app:
Bây giờ chúng tôi sẽ tạo project Express Node.js và nó sẽ bao gồm các file sau:
**app.js**, đây là file chứa code để chạy server Nodejs.
**package.json**, Đây là file quản lý package cần thiết để chạy được app của chúng ta.
**Dockerfile**, Như đã nói ở trên file này nói cho docker build containers như thế nào.
Tạo một thư mục chưa code project, ở đây tôi đặt tên thư mục là 'docker_basic', cd vào thư mục 'docker_basic'.
Để sinh file package.js bằng lệnh:
```
npm init -y
```
Cài express
```
npm install express —-save
```
Tạo một file app.js với nội dung như sau:
```
const express = require('express')

const app = express()

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```
Thử khởi chạy server node:
```
node app.js
```
Mở browser và truy cập vào đường link http://localhost:3000 sẽ thấy:
![](https://images.viblo.asia/3b31c366-2f55-46d9-b145-a379abc0b28a.png)
OK! App của chúng ta chạy được trên máy thực.
### Creating a Dockerfile.
Tạo file đặt tên 'Dockerfile' và update nội file thành:
```
FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "app.js"]
```
Các câu lệnh trên có chức năng sau: 
**FROM**: Chọn OS image từ Docker Hub. Trong trường hợp trên ta chọn OS Ubuntu đã cài nodejs. Tag 'latest' chỉ định phiên bản mới nhất của OS Image trên Docker Hub. 
**WORKDIR** Chỉ định thư mục chứa source code trong docker container.
**COPY** Ở đây, Chúng ta copy các file ở thư mục đang đứng vào thư mục app được chỉ định trong lệnh 'WORKDIR'.
**RUN** Chạy những lệnh trong terminal, ở đây sẽ chạy lệnh 'npm install'.
**EXPOSE** Mở port, thông qua port này chúng ta có thể giao tiếp với bên ngoài.
**ENTRYPOINT** Ở đây chúng ta nêu cách khởi động app của chúng ta. Ở đây ["node", "app.js"] sẽ được dịch thành là 'node app.js'.

OK! Bây giờ chúng ta đã có tất cả các file cần thiết để chạy project trong docker.
## Building an image.
Chúng ta cần thực hiện hai step để application có thể up và run bên trong docker.
**creating an image**, với sự giúp đở của Dockerfile và câu lệnh docker build chúng ta sẽ tạo một image.
**start the container**, Bây giờ chúng ta đã có một image được tạo từ step trên và giờ chúng ta cần tạo một container.
Trước tiên tạo một image với câu lệnh bên dưới:
```
docker build -t chrisnoring/node:latest .
```
Dấu ' .' ở cuối câu lệnh nói cho docker biết là file Dockerfile của bạn nằm ở đâu. Trong trường hợp này thì file Dockerfile nằm ở thư một mà chúng ta đang đứng. Khi chạy câu lệnh trên thì các bạn sẽ thấy như thế này:
![](https://images.viblo.asia/e3a82df9-1b3e-40a5-8bce-ae46a2a44cc6.png)
Các bạn thấy những câu lệnh ta định nghĩa trong file Dockerfile sẽ được dùng để tạo image của chúng ta. Giờ hãy xem image của chúng ta mới được tạo bằng câu lệnh sau:
```
docker images
```
thì sẽ thấy được image chúng ta mới tạo như sau:
![](https://images.viblo.asia/069a2917-cdb0-4015-b026-cdf7529d3b8e.png)
## Creating a container.
Tiếp theo chúng ta sẽ build một container với lệnh:
```
docker run chrisnoring/node
```
Tuy nhiên chúng ta cần ánh xạ cổng bên trong của ứng dụng sang bên ngoài trên, để trình duyệt có thể truy cập vào app bên trong docker thông qua port máy thực. Chúng tôi thực hiện ánh xạ bằng cách sử dụng cờ -p như sau;
```
-p [port của máy thực]:[port bên trong docker]
```
Bây giờ command đầy đủ là:
```
docker run -p 8000:3000 chrisnoring/node
```
Sau khi chạy command line thì chúng ta có thể truy cập vào app của chúng ta với link: http://localhost:8000 . Ở đây port 8000 của máy thực sẽ ánh xạ vào port 3000 của docker. Mở trình duyệt với link http://localhost:8000 sẽ thấy như sau:
![](https://images.viblo.asia/d053152c-0ce4-44df-8378-c5b9fb25e2db.png)
OK. Vậy là chúng ta đã chạy được app bên trong container.
## Quản lý container của chúng ta.
Sau đây là một số câu lệnh làm việc với container docker:
```
docker ps // show tất cả các container đang chạy.
docker stop [container id] // stop contaner theo container theo id được chỉ định.
docker exec -it [container id] bash // khi chạy lệnh này thì command line bạn chạy tiếp theo sẽ được thực hiện bên trong OS của docker.
```
Trên đây Mình đã giới thiệu những nội dung cơ bản để bắt đầu làm việc với docker và kèm theo ví dụ, Mình hi vọng bài viết sẽ giúp cho các bạn có hình dung cơ bản về docker. Nếu có bất cứ thắc mắt nào các bạn cứ comment bên dưới, Mình sẽ trả lời ngay khi có thể.