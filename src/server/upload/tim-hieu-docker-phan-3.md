Xin chào các bạn lâu lắm rồi mình mới lại viết bài để chia sẻ những kiến thức mình đã tìm hiểu được. Thì các bạn thấy đấy thường thì chúng ta sẽ sử dụng image pull từ Docker Hub về. Vậy làm cách nào để custom lại những image đã có sẵn và cũng chia sẻ lên Docker Hub để cho mọi người có thể dùng được image của mình. Có hai cách để tạo ra các mirror container
* Cách đầu tiên tạo một container chạy các câu lệnh cần thiết và sử dụng lệnh `docker commit` để tạo image mới. Cách này thì không được khuyến cáo sử dụng
* Cách thứ hai: Viết một file `Dockerfile` và thực thi để tạo ra một images. Thường mọi người dùng cách này để tạo ra image. Bây giờ chúng mình bắt tay vào việc tìm hiểu nhé. :)
# Dockerfile
Dockerfile là gì ? Dockerfile nó là 1 file text ghi những instruction để khi ta dùng lệnh "docker build" thì nó đọc những instruction này và nó sinh ra layer file system. Từ đó image được sinh ra và  chúng ta sử dụng Docker image để tạo ra container. ==> Túm lại nó là file được sử dụng để build Docker Images, bao gồm chứa các instruction.

![](https://images.viblo.asia/d78b4c36-6d24-49d4-986a-eed694c04da3.png)
Đây là một hình ảnh ví dụ về dockerfile

![](https://images.viblo.asia/c47af41b-e133-4ea7-894b-50db1b72d6c7.png)

Chúng ta sẽ cùng nhau đi giải thích một chút về các key trong dockerfile nhé


| Keyword | Explain |
| -------- | -------- |
| FROM     | Thiết lập base image cho các instruction tiếp theo viết ở dưới.    |
|MAINTAINER| Chỗ này bạn có thể ghi ai là người viết dockerfile này.|
|RUN |Đây là chỗ để bạn có thể viết những command mà bạn muốn chạy ở trong container khi build image.|
|COPY|Copy file mới hoặc thư mục từ <src> và add chúng vào filesystem của container ở <dest> |
|CMD|Để thực thi một câu lệnh trong quá trình bật container. Nếu như có nhiều hơn một câu lệnh được đặt ở đây thì nó sẽ thực thi câu lệnh cuối cùng|
|ENTRYPOINT|Cho phép chúng ta config container , nó sẽ chạy giống như một trình thực thi. Thực thi một số câu lệnh trong quá trình container start|
|RUN| Nói với Docker rằng container sẽ lắng nghe các cổng mạng được chỉ định khi chạy|
|VOLUMES| Mount thư mục từ máy host vào trong container|
    
# Build a custom NodeJS Dockerfile 
Ví dụ chúng ta có một project express js, tạo một file `Dockerfile` có nội dung như sau 
```Javascript
FROM node:latest

MAINTAINER Hoang Ken

ENV NODE_ENV=production
ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

VOLUME ("/var/www")

RUN npm install

EXPOSE $PORT

ENTRYPOINT {"npm","start"}

```
Mình sẽ giải thích một chút file Dockerfile này nhé
* Đầu tiên cần chỉ định image là `node`  được sử dụng trong quá trình tạo image mới bằng dockerfile. `FROM node:latest`
* Bổ sung thông tin người tạo ra dockerfile này `MAINTAINER Hoang Ken`
* Chạy các lệnh sẽ cài đặt bổ sung gói cho image `RUN npm install`
* Chỉ định một số cấu hình biến môi trường để node chạy trong container `ENV NODE_ENV=production
ENV PORT=3000`
* Cung cấp cổng dịch vụ mà node trong container kết nối ra ngoài `EXPOSE $PORT`
* Lệnh mà ứng dụng trong container sẽ được thực thi `ENTRYPOINT {"npm","start"}`

# Buid a custom NodeJS Image and Container
```Javascript
    docker build -t <username>/node .
```
    
Đây chính là câu lệnh để build một image
* `-t` viết tắt của `--tag`
*  `<username>` là tên image của chúng ta muốn đặt hay còn được gọi là tag name
*  `.` Build Context.

Chúng ta sẽ sử dụng Dockerfile ở mục trên mình đã đề cập để tạo ra một image mới , nó được custom từ chúng ta theo follow trong Dockerfile.
Chúng ta sẽ viết Dockerfile trong một project express js như sau:
![](https://images.viblo.asia/5ab2ad80-3a0e-4552-bf27-8915a7639b0d.png)
```
    docker build -f Dockerfile -t kenhoang/node .
```
Sau khi chạy lệnh thì chúng ta đã build được 1 image mới custom từ `node`
![](https://images.viblo.asia/2a73ea90-f324-436e-861e-4fbd34c0440e.png)
Để kiêm tra chúng ta sử dụng câu lệnh `docker images`
![](https://images.viblo.asia/ac385417-4828-44e5-971d-b0af866b5ba3.png)
Ta sẽ tạo ra một container sử dụng image `kenhoang/node` vừa được tạo ra bằng câu lệnh sau
```
    docker run -d -p 8080:3000 kenhoang/node .
```
Đây là câu lệnh sẽ start container chạy ngầm, cổng 8080 của máy host chúng ta sẽ lắng nghe cổng 3000 của container Và sau đó chúng ta mở trình duyệt lên gõ `localhost:8080`thì project đã được start

# Publishing an Image to Docker Hub
 Docker Hub là gì ? Thì nó là nơi lưu trữ các image , bạn có thể push image của bạn lên đây hoặc có thể pull image của người khác về máy của mình để dùng , tùy theo nhu cầu sử dụng của bạn. Bạn nào đã từng xài github rồi thì nó cũng na ná như Github.
    
 Đầu tiên bạn phải lên `Docker Hub` để tạo tài khoản thì mới có thể push hoặc pull image về được. Sau đó chúng ta sẽ login như sau
 ```
    docker login
 ```
 Bạn nhập username và password vào để login nhé.
Ví dụ như các mục ở trên mình có custom ra một image NodeJS `kenhoang/node`. Bây giờ mình sẽ push nó lên Docker Hub nhé. Bạn phải tạo một`Repository` trên Docker Hub thì mới có thể push nó lên được.
```
    docker push kenhoang/node
```
Sau đó mình sẽ thử remove image `kenhoang/node` đi và sẽ pull nó từ Docker Hub về
```
    docker pull kenhoang/node
```
# Conclusion
Qua những gì mình viết ở trên mong rằng cũng chia sẻ được cho các bạn những điều bổ ích. Mình cũng trong đang quá trình tìm hiểu về `Docker` nên cũng hiểu sai hoặc thiếu sót một số ý. Cảm ơn các bạn đã đọc bài chia sẻ của mình.