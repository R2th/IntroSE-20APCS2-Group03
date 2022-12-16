# Xin chào các mọi người. Lại là mình đây. Hôm nay sẽ là phần 4 nhớ. Nội dung phần 4 sẽ là Docker Image.
## I. Docker Image là gì?
Docker image là một nhân tố cơ bản và là một thành phần quan trọng trong Docker.
Docker image có thể hiểu là một bản ghi của cá nhân hay tổ chức tạo ra. Nếu ai đã từng làm việc với VM rồi thì có thể hiểu Docker image tương tự như một bản snapshoot. Nhưng nhờ công nghệ của docker thì Docker image có các cơ chế quản lý và lưu trữ đặc biệt giúp tối ưu hệ thống.

Vậy từ đâu mà có docker image? Docker image kéo về từ Docker registry. Ngoài ra, Docker image cũng có thể được tạo ra bởi người dùng tại các thời điểm khác nhau.

**Nói thêm một chút về Docker registry**\
Docker registry là các dịch vụ tạo ra các kho lưu trữ có thể truy cập được đối với các lệnh pull trong Docker. Docker registry làm nhiệm vụ phân phối các image giữa người dùng với người dùng nhanh chóng, cực kỳ thuận tiện. \
Chính tổ chức Docker cũng  tạo ra một Docker registry miễn phí chung là Docker hub. Trên Docker hub hiện nay cung cấp rất nhiều các image của các tổ chức lớn đã được xác thực và cả người dùng đẩy lên. Bạn có thể tìm kiếm image mà bạn cần trên trang hub.docker.com
![image.png](https://images.viblo.asia/7ad22226-3cd3-47e1-9fe5-9b0d36aa13a1.png)

Ngoài ra cũng có thể dùng CLI\
`docker search ubuntu`
![image.png](https://images.viblo.asia/da658ee9-d3a4-4ebe-ab1a-ff667bd8bfc9.png)

Docker image được tổ chức hoặc người dùng tạo ra bằng 2 cách:
1. Commit từ image ban đầu.
2. Build tự động với Dockerfile.
### 1.1. Cơ chế hoạt động, lưu trữ của image
Container lưu trữ bằng công nghệ Union Filesystems (UFS ). Đây là một dịch vụ file system được phát triển cho Linux để cho phép các hệ thống file khác nhau được xếp chồng lên nhau (hay gọi là overlaid) để tạo ra một tổ hợp hoặc union của các file khác nhau qua đó tạo ra một đại diện hợp nhất duy nhất của nội dung. Mỗi thay đổi được ghi lại trên một lớp mới và được xếp trên cùng, trên tất cả các lớp khác trước đó.

Hiểu đơn giản hơn thì với những ai đã từng làm việc với Photoshop cũng quen với khái niệm Layer. Khi muốn làm mất một con vật trong bức ảnh, ta chỉ cần thêm một layer đen mới đè lên layer bức ảnh ban đầu. Về phía enduser sẽ nhận được một bước ảnh đại diện hợp nhất duy nhất đã mất hình con vật cần xóa trong ảnh. Về phía người quản lý thao tác thay đổi đó được làm hoàn toàn trên một layer khác với layer bức ảnh gốc ban đầu.

Về cơ bản, đây là UFS hoạt động và đó là một trong những lý do chính khiến filesystem rất hiệu quả trong việc lưu trữ. Mỗi layer chỉ bao gồm những gì mới và không có gì được sao chép từ một layer trước đó. Sẽ có nhiều các layer được read-only được xếp phía dưới. Có một layer read/ write nằm trên cùng mà bạn có thể sử dụng để tương tác với filesystem. Khi bạn đọc file từ union filesystem, file này sẽ được tìm và đọc từ layer cao nhất. Nó sẽ được xuống các layer tiếp theo cho đến khi tìm thấy.

Bạn sẽ không thể thay đổi với image gốc. Nếu bạn muốn thực hiện các thay đổi của mình bạn phải đặt một layer khác lên trên union filesystem, nó cũng tương đương với việc bạn commit và tạo ra một image mới. Điều này được gọi là cơ chế copy-on-write. 

Lệnh show thay đổi gần nhất\
`docker container diff ubuntu`

Lệnh xem toàn bộ các layer\
`docker history ubuntu`
## II. Commit từ image ban đầu
###  2.1. Tạo image mới
Để tạo một image mới lưu lại các thay đổi mới với container đó.\
`Docker commit alpine aline:v1.0`
![image.png](https://images.viblo.asia/ceffcc96-9ad9-4a01-9d56-29a143c97825.png)

> Dùng tổ hợp phím **Ctrl P** rồi **Ctrl Q** để thoát bash container mà vẫn giữ container chạy.

###  2.2. Quản lý các image local
**Liệt kê các image**\
`docker images`                 
![image.png](https://images.viblo.asia/61099078-078e-4b60-8ed9-59afee95cb49.png)

**Tag image**\
Cơ bản khi bạn thực hiện commit mà không có thêm option phía sau. Hệ thống sẽ tạo ra một image mới mà không có tên và tag của image đó. Chính vì vậy cần cần thực hiện thêm lệnh docker tag.\
`docker tag 5aa951fd5198 alpine:v1.0`
![image.png](https://images.viblo.asia/64d0d93e-327b-416c-8bef-6967d21d58ab.png)\
Thông thường bạn nên thêm tên và tag cho image luôn trong lệnh commit. Đây là ví dụ để giải thích thêm quy trình tạo ra của image.

**Tải image**\
Đối với các image chưa tồn tại trên máy local. Bạn có thể dùng lệnh docker pull để tải các phiên bản của images về máy trước để sử dụng trong các trường hợp bạn cần di chuyển mà không có internet.\
`docker pull nginx`
![image.png](https://images.viblo.asia/2eae05d0-9c69-4cab-a7f7-3fe8eeaf6174.png)

**Upload image local lên Docker Hub**\
Bạn có thể chia sẻ các image cá nhân bằng cách upload image của mình lên Docker hub sau khi bạn build một image.\
`docker push daihv/hello_dockerfile:v1.0`\
Phần này sẽ có ví dụ rõ ràng hơn trong mục **3.2. Build image từ Dockerfile**

**Xóa image**\
Với các image rác không cần dùng tới bạn có thể xóa bỏ.\
`docker rmi demo:v1.0`     
![image.png](https://images.viblo.asia/2d27a1f1-9cc1-447f-90ef-70e589bc3109.png) 

### 2.3. Export và Import images
**Export images**\
Cho phép sao lưu một hoặc nhiều image thành một file có thể dùng lưu trữ hoặc gửi đi. Thường được sử dụng để mang image tới khách hàng. \
`docker save -o backup.tar.gz alpine:v1.0 busybox:latest`
![image.png](https://images.viblo.asia/a94369db-a06f-43ad-bb11-ac6f8dd24e2e.png)

**Import images**\
Cho phép phục hồi lại các image đã được sao lưu trước đó.\
`docker load -i backup.tar.gz`
![image.png](https://images.viblo.asia/be039b5a-397c-4beb-b790-d7e6fe7806ad.png)
## III. Build tự động với Dockerfile 
### 3.1. Dockerfile là gì?
Dockerfile là một tệp văn bản chứa các hướng dẫn để build một image. Trình tạo image Docker thực thi Dockerfile từ trên xuống dưới và các hướng dẫn có thể định cấu hình hoặc thay đổi bất kỳ điều gì về image. Dockerfiles là cách phổ biến nhất để mô tả cách xây dựng image. Dockerfile có thể hiểu như một shell script. trong đó có các dòng lệnh, thực hiện chạy các bước để tạo ra một image.

### 3.2. Build image từ Dockerfile
Trong cú pháp của Dockerfile luôn luôn bắt đầu bằng từ khóa FROM.
> FROM alpine:latest\
> EXPOSE 8080\
> RUN ip add\
> LABEL version="1.0"\
> USER daihv\
> ADD ./ebook1.txt /tmp\
> WORKDIR /home/daihv/app\
> ENV APP_HOME=/wildfly\
> COPY ./ebook2.txt /tmp\
> VOLUME /var/log\
> ENTRYPOINT ["ls","-a"]\
> CMD echo "oke oke"

Trong đó:
* **FROM** chỉ định thực thi từ image gốc nào.
* **EXPOSE** chỉ định cổng lắng nghe.
* **RUN** thi hành lệnh bất kỳ.
* **LABEL** thêm nhãn mô tả.
* **USER** chỉ định user thực thi.
* **ADD** copy file từ host vào trong container cũng có thể là một URL
* **WORKDIR** chỉ thị thư mục làm việc mặc định.
* **ENV** thiết lập các biến môi trường nếu có.
* **COPY** tương tự như ADD nhưng không thể sử dụng đối với URL
* **VOLUME** chỉ thị thư mục lưu trữ trên host.
* **ENTRYPOINT** giống CMD đều dùng để chạy khi khởi tạo container, nhưng ENTRYPOINT không thể ghi đè từ dòng lệnh khi khởi tại container.
* **CMD** thực hiện lệnh mặc định khi chúng ta khởi tạo container từ image, lệnh mặc định này có thể được ghi đè từ dòng lệnh khi khởi tại container.

**Bước 1:** Tạo một file với tên dockerfile\
`touch dockerfile`
![image.png](https://images.viblo.asia/c74189f0-571d-48bb-a921-3e2dac8d4d62.png)

**Bước 2:** Viết các bước triển khai một image\
`nano dockerfile`   
![image.png](https://images.viblo.asia/98275501-44a7-4e62-b2a0-5637271ddeeb.png)

**Bước 3:** Thực hiện build

`docker build -t new_alpine:v1.0 -f dockerfile .`      
![image.png](https://images.viblo.asia/842aef05-76ba-4418-baa8-ed3ab0f5fa44.png)\
Lệnh sử dùng cờ * -t * để đặt tên mới cho image. Và sử dụng cờ *-f* để chị định file build trong trường hợp tại một thư mục có nhiều file dockefile.

**Bước 4:** Upload image mới lên Docker hub\
Bạn cần có tài khoản Docker Hub và tạo một kho lưu trữ trước.
![image.png](https://images.viblo.asia/b9354827-b9ce-403d-a7aa-e0147fc4855d.png)

Gắn tag lại images đã build xong khớp với kho lưu trữ trên Docker hub.\
`docker tag new_alpine:v1.0 daihv/demo:v1.0`
![image.png](https://images.viblo.asia/0e765ecd-e64f-4ad7-960e-5e1ac24b3a98.png)

Login tài khoản Docker hub\
`docker login --username=daihv`
![image.png](https://images.viblo.asia/038ba300-8cc6-4b71-958b-5ba25b37ccb1.png)

Upload lên kho lưu trữ\
`docker push daihv/demo:v1.0`                 
![image.png](https://images.viblo.asia/e8fee20b-524f-496a-aec6-984f143198c9.png)

Kiểm tra lại trên Docker hub
![image.png](https://images.viblo.asia/1609b23d-3c45-440f-a9c2-8b2b715b3eb1.png)

### 3.3. Best tips với Dockerfile
   1. Tìm kiếm ứng dụng muốn chạy thay vì dùng os từ FORM rồi thực hiện cài ứng dụng đó trên os.
    2. Để version ứng dụng để phân biệt các phiên bản là thực sự cần thiết.
    3. Sử dụng Alpine, giảm dung lượng lưu trữ so với sử dụng os.
    4. Một lệnh RUN chạy tương ứng với 1 layer sinh ra. Vì vậy nếu có thể hãy gộp các lệnh vào một lệnh RUN bằng các sử dụng &&
    5. Với Instruction ít thay đổi nên để ở trên, nhiều thay đổi ở dưới để khi Docker thực hiện build nhanh hơn vì có thể nạp lại cache đã build trước đó.
    6. Sử dụng .dockerignore 
    7. Một Dockerfile có thể sử dụng để chạy multi build.
    8. Sử dụng chính sách user chạy để đảm bảo bảo mật.
    9. Nên sử dụng docker scan hoặc CICD để quét các lỗ hổng.

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***