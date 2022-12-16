[Ở phần trước](https://viblo.asia/p/tim-hieu-ve-docker-maGK7vrb5j2), chúng ta đã tìm hiểu về các khái niệm của Docker. Chắc hẳn mọi người cũng đã hiểu thế nào là Docker, và tại sao chúng ta lại sử dụng nó. Vậy hôm nay, chúng ta sẽ cùng bắt tay vào thực hành ngay nào!!!
## 1. Orientation and setup
Ở bài viết này, mình sẽ hướng dẫn các bạn từng bước để bắt đầu với `Docker`, ở bài viết này chúng ta sẽ tìm hiểu:

* Build và run image của một container
* Chia sẻ image bằng Docker Hub
* Triển khai ứng dụng Docker bằng nhiều container với cùng một database
* Running ứng dụng bằng Docker Compose

## 2. **Download and install Docker**
Hướng dẫn này giả định là máy của bạn đã được cài đặt Docker. Nếu bạn chưa cài Docker, bạn có thể tải xuống ở đường link bên dưới (nhớ chọn đúng hệ điều hành của mình nhé):

* [Window](https://docs.docker.com/desktop/windows/install/)
* [Mac](https://docs.docker.com/desktop/mac/install/) 
* [Linux](https://docs.docker.com/engine/install/)

## 3. Start the tutorial
Bạn có thể khởi động Docker bằng lệnh dưới đây:
```
docker run -dp 80:80 docker-overview
```

Câu lệnh trên sẽ có một số cờ(flag) được sử dụng, sau đây là những chi tiết về nó:

* `-d` run container với chế độ `detached mode` (chế độ này giúp bạn có thể thao tác với chính terminal đang khởi chạy Docker)
* `-p 80:80` Ánh xạ port 80 của máy chủ trong container
* `docker-overview` image sẽ được sử dụng

> Bạn cũng có thể kết hợp các cờ(flag) lại với nhau để rút gọn câu lệnh. Ví dụ câu lệnh trên bạn có thể viết lại như sau:
> 
> `docker run -dp 80:80 docker-overview`

### 3.1. Container là gì?
Bây giờ, chúng ta đã khởi chạy `container`. Vậy `container` là cái gì? Nói một cách đơn giản, `container` chính là 1 quá trình xử lý khác ở trên máy của bạn mà đã được cách ly hoàn toàn với các quá trình xử lý khác.  Sự cô lập đó thúc đẩy `kernel namespaces` và `cgroups`, những tính năng này đã có sẵn trong Linux từ lâu. Docker đã là việc này để cho nó trở nên dễ tiếp cận và dễ dàng sử dụng hơn.
### 3.2. Container image là gì?
Khi khởi chạy một container, nó sử dụng một hệ thống file riêng biệt. Mà những file này được cung cấp bởi `container image`. Bởi vì `container image` ch
ứa các file của container, chính vì thế nó phải chứa mọi thứ cần thiết để khởi chạy ứng dụng của bạn, tất cả các thành phần phụ thuộc, cấu hình, scripts... Image cũng chứa một số cấu hình khác cho container như: `biến môi trường`, `default command` và `metadata`.

## 4. Ví dụ
Nãy giờ mình đã điểm qua một số khái niệm cơ bản, bây giờ sẽ đi vào ví dụ cụ thể để các bạn có thể hình dung rõ hơn.
Đầu tiên bạn phải tải ứng dụng vào máy chủ của bạn. Mình có zip ví dụ [tại đây](https://drive.google.com/file/d/1fmtc-hFS3ROCjUwHSYS1ZEOIyukoZrEp/view?usp=sharing), bạn có thể down xuống và giải nén nó ra.

Để có thể build được ứng dụng, chúng ta cần sử dụng `Dockerfile`. Dockerfile chỉ đơn giản là một file được sử dụng để tạo một `container image`. Trong ứng dụng của tôi đã tạo sẵn một file Dockerfile. Nếu ứng dụng của bạn chưa từng tạo nó trước đây, đừng lo lắng, chúng ta sẽ tạo ngay bây giờ.

1. Tạo một file với tên là `Dockerfile` ngay trong folder ứng dụng của bạn với nội dung như bên dưới:
```
FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
```

* `FROM`: chỉ định base image. Image này thường được lấy từ Docker hub - nơi lưu trữ và chia sẽ các image tùy chỉnh.
* `RUN`: dùng để thực thi một command trong quá trình build.
* `WORKDIR`: Thiết lập thư mục làm việc chính trong container.
* `COPY`: sao chép file và thư mục vào trong container.
* `CMD`: Thực thi command trong quá trình run container.
> Lưu ý: Dockerfile không có phần mở rộng như `.txt`. Một số người có thể tự động thêm phần mở rộng cho file này, điều này sẽ dẫn đến lỗi cho các bước tiếp theo.

2. Tiếp theo chúng ta sẽ build `container image` bằng cách sử dụng `docker build`. Mở terminal dự án của bạn (di chuyển đến folder chứa Dockerfile) và chạy lệnh như bến dưới
```
docker build -t docker-overview .
```

Command này sẽ sử dụng Dockerfile để xây dựng một `container image` mới. Ở đây, mình sẽ build 1 image `node:12-alpine`, nếu máy bạn chưa từng build image này trước đó thì nó sẽ tự động tải image từ Docker hub xuống máy chủ của bạn.
* Flag `-t`: dùng để gắn cờ cho image, nói một cách khác là tên của image mà có thể đọc được. Ở đây, mình đặt tên cho image là `docker-overview` nên mình có thể tham chiếu đến image đó khi khởi chạy container.
* `.`: sẽ tìm kiếm `Dockerfile` ở thư mục hiện tại để tiến hành build.

3. Khởi chạy container.

Khi chúng ta đã có image, hãy tiến hành khởi chạy container bằng lệnh `docker run` như đã giới thiệu ở trên.
```
docker run -dp 3000:3000 docker-overview
```

Hãy đợi chờ một lát để container được khởi chạy. Sau khi thành công, hãy truy cập vào http://localhost:3000/ trên browser của bạn để thấy thành quả nhé!!!

![image.png](https://images.viblo.asia/d152d246-28e2-4975-a22c-4d854e6cb0fd.png)

## 5. Kết luận
Viết đến đây cũng hơi khá dài rồi. Hẹn các bạn vào bài viết chia sẽ lần sau nhé. Hy vọng qua bài viết này, các bạn có thể tự tay build docker cho một dự án cơ bản của mình. Cảm ơn các bạn đã lắng nghe!!!