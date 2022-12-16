Chào các bạn! Tiếp theo phần [Docker from the beginning — part III](https://viblo.asia/p/docker-from-the-beginning-part-iii-3P0lP48blox), trong part IV này mình sẽ giới thiệu về docker compose. Docker compose được sử dụng để quản lý nhiều service độc lập với nhau. Ví dụ như trong một project bạn dùng cả service mysql và service redis chạy ở hai container độc lập với nhau.
### Những tính năng của docker compose.
Docker cho phép chúng ta dễ dàng build nhiều image, start nhiều container cùng một lúc và nhiều thứ khác nữa. Những tính năng mà docker compose cung cấp như sau:

   **Manages**: Quản lý toàn bộ vòng đợi của ứng dụng.
   
   **Start, stop and rebuild**: start, stop và rebuild các service.
   
   **View**: Xem status của các service.
   
   **Stream**: Log output của các service đang chạy.
   
   **Run**:  Chạy một command trong một service.
### Khi plain docker không còn đủ.
Để chạy được một service thông thường chúng ta sẽ qua các bước sau:
   
   **Define a Dockerfile**: chỉ định OS image, cài đặt những thư viện, thiết lập biến môi trường và mở port cho service khi khởi chạy.
   
   **Build an image**: pull image tồn tại trên Docker Hub về máy.
   
   **Create**: tạo và chạy container.
Giả sử chúng ta đã tạo file Dockerfile, để chạy service từ Dockerfile bằng Docker chúng ta phải chạy các lệnh sau:
> docker build -t some-image-name .

> docker run -d -p 8000:3000 --name some-container-name some-image-name

Nếu bạn chỉ cần chạy một service thì sẽ đơn giản với hai câu lệnh trên. Tuy nhiên hãy tưởng tượng bạn cần chạy 3 services thì bạn cần chạy 6 câu lệnh. Thông thường trong một dự án chúng ta có thể dùng nhiều service hơn thế nữa lúc đó sẽ không hề dễ chịu khi khi làm việc với Docker.
![](https://images.viblo.asia/daef3d4a-9ba6-4f38-baef-fdc9f93d1ed4.gif)
Đến lúc này Docker compose và giúp bạn dễ chịu hơn khi làm viêc với Docker. Khi dùng Docker compose bạn vẫn phải làm việc với Dockerfile tuy nhiên nó sẽ giúp bạn build các image và quản lý các container.
### docker-compose.yaml
Trong file docker-compose.yaml là nới Docker compose thực sự tỏa sáng. Thay vì phải chạy hai lệnh cho mỗi service thì bây giờ bạn có thể định nghĩa tất cả các service trong project của bạn trong một file, file này gọi là docker-compose.yaml. Bạn có thể định nghĩa một service trong file docker-compose.yaml bằng các lệnh sau:
    **Build**: Chỉ định context và name của Dockerfile khi Dockerfile được đặt tên khác 'Dockerfile'
    
    **Environment**: Định nghĩa và gán giá trị  giống như các biến môi trường mà chúng ta cần.
    
    **Image**: Thay vì build image từ Dockerfile, chúng ta có thể pull image đã tồn tại Docker Hub.
    
    **Networks**: Có thể tạo các networks và có thể chỉ định mỗi service thuộc về network nào.
    
    **Port**: Có thể chỉ định cổng chuyển tiếp(chỉ định cổng nào máy thực map với cổng nào trong container)
    
    **Volumes**: Định nghĩa volumes của container.
### Demo use Docker compose
Tạo thư mục demo_docker_compose có cấu trúc như sau;
```
docker-compose.yaml
/product-service
  app.js
  package.json
  Dockerfile
/inventory-service
  app.js
  package.json
  Dockerfile
```
Các bạn thấy là file docker-compose.yaml được tạo ở thư mục gốc của project.
Mở docker file docker-compose.yaml thêm vào dòng đầu tiên:
```
version: '3'
```
Hiện tại Docker hỗ trợ 3 phiên bản chính, giữa các phiên bản có một số khác nhau về cú pháp nên ở đây chúng ta chỉ định version phù hợp với cú pháp của chúng  ta.
Tiếp theo định nghĩa  service của chúng ta:
```
version: '3'
services:
  product-service:
    build:
      context: ./product-service
    ports:
      - "8000:3000"
```
**services**: Chứa các service chúng ta muốn định nghĩa.

**product-service**: Chỉ định tên service của chúng ta, ở đây service chúng ta định nghĩa sẽ có tên là product-service.

**build**: Hướng dẫn Docker compose build một image như thế nào. Nếu chúng ta có sẳn một image thì chúng ta không cần chỉ định lệnh build ở đây mà thay vào đó là lệnh image.

**context**:  Nói cho Docker compose file Docker file ở đây.

**Port**: Chỉ định port chuyển tiếp giữa máy thực và container, ở đây port 8000 của máy thực sẽ map với port 3000 của service product-service.

Tất cả các config ở trên tương ứng với hai câu lệnh:
> docker build -t [default name]/product-service .

> docker run -p 8000:3000 --name [default name]/product-service

Tuy nhiên dùng Docker compose chúng ta chỉ cần chạy một lệnh:
> docker-compose build

Câu lệnh trên sẽ build service product-service mà chúng ta đã chỉ định trong file docker-compose.yaml. Output của câu lệnh trên như sau:
![](https://images.viblo.asia/a830a79b-db53-4c9c-a42e-1b93172899c0.png)

Sau khi build xong ta chạy lệnh sau để chạy container product-service:
> docker-compose up

Lệnh trên sẽ đọc file docker-compose.yaml một lần nữa nhưng lần này nó sẽ tạo và run container. 
Để chạy các container của chúng ta ở background bằng lệnh:
> docker-compose up -d

Sau khi chạy lệnh trên để xem trạng thái của container mới được tạo:
> docker ps

Để dừng các service đang chạy bằng cách chạy lệnh:
> docker-compose down

### Liên hệ giữa các lệnh Docker và Docker compose
* docker build => docker-compose build
* docker build + docker run => docker-compose up
* docker stop => docker-compose stop
* docker stop && docker rm => docker-compose down
### Định nghĩa thêm một service vào file docker-compose.yaml
Chúng ta edit lại file docker-compose.yaml thành nội dung như sau:
```
version: '3'
services:
  product-service:
    build:
      context: ./product-service
    ports:
      - "8000:3000"
  inventory-service:
    build:
      context: ./inventory-service
    ports:
        - "8001:3000"
```
Sau đó chúng ta chạy lệnh:
> docker-compose up -d

Như vậy là chúng ta đã tạo và chạy được hai service mà chỉ cần chạy một lệnh thay vì 4 câu lệnh như khi dùng Docker.

Trên đây tôi đã giới thiệu về Docker compose và những tiện lợi mà nó mang lại cho chúng ta so với plain Docker. Hị vọng qua bài viết này các bạn có thể hiểu và vận dụng được Docker compose vào thực thế.