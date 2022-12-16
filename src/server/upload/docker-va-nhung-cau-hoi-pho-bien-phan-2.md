# 1. Mở đầu
Chào các bạn, như phần [trước](https://viblo.asia/p/docker-va-nhung-cau-hoi-pho-bien-YWOZr8vy5Q0) mình đã đưa ra một số câu hỏi thông dụng về Docker Image, Container, Dockerfile .
Hôm nay chúng ta cùng tìm hiểu thêm về Docker exec, start, Docker Volume,Docker-compose và một số câu hỏi phổ biến liên quan nhé. :smile:

# 2. Sự khác biệt giữa Docker exec và Docker run là gì?
## Docker run 
Đây là câu lệnh dùng để  khởi tạo một container dựa vào Image có sẵn, cú pháp: 

`docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]`

Ví dụ với Image mình đã tạo ở phần [trước](https://viblo.asia/p/docker-va-nhung-cau-hoi-pho-bien-YWOZr8vy5Q0) , câu lệnh sẽ là :

`docker run --name tuanpl -it ubuntu-nginx:latest /bin/bash`


Option `--name` cho phép bạn đặt tên container.

Option `-t` cung cấp một `giao diện` để gõ command bên trong container, còn `-i` cung cấp một " con đường" giúp cho các chương trình bên trong container nhận được những command đã viết.

Túm váy lại là khi bạn viết option `-it` và `/bin/bash`  thì docker sẽ `run image` đó thành một container và cho phép bạn truy cập vào shell `bash` của container đó thay vì thoát ra bash của máy host. :sweat_smile:

![](https://images.viblo.asia/56df5788-5355-4c4a-a601-0319d8fef0e3.png)

Tại đây bạn có thể thao tác với những môi trường bên trong container, ví dụ như kiểm tra phiên bản nginx chả hạn :
![](https://images.viblo.asia/234acaef-2fb3-4bce-8221-84580ccdbb26.png)



## Docker exec
`Docker exec` là câu lệnh  sử dụng để chạy một command bên trong một container đang hoạt động.

Sau khi tạo được container như phần trên, kiểm tra danh sách container đang hoạt động :

![](https://images.viblo.asia/5bf4ab73-dc84-45e6-ae0e-d1515153b5fa.png)

`docker exec -d tuanpl touch /tmp/execWorks`

Câu lệnh tạo 1 file tên execWorks bên trong thư mục tmp ( Lưu ý là sau khi `run image` ở trên, thì chuyển qua một tab terminal mới chạy `exec` nhé, đừng `exit` và chạy `exec` rồi kêu giời kêu đất tại sao không được.:sweat_smile: . Nhớ là `Docker exec` chỉ dùng trên container **đang hoạt động** thôi nhé. :3 

Kiểm tra xem có file đó chưa nào :
![](https://images.viblo.asia/bcc54ef3-cb37-445e-8362-52c3e68bd06c.png)

## Sự khác nhau giữa exec và run
Có lẽ điểm khác nhau quá rõ ràng rồi nhỉ . :sweat_smile: Một thằng để chạy một `image` để khởi tạo container, một thằng để thực thi những câu lệnh bên trong container đang hoạt động đó... :smile:
# 3. Khác nhau giữa Docker run và Docker start
Điểm khác biệt lớn nhất đó là :

* `run`  : run một `image`
* `start`: start một `container`

* `run` :  tạo một container từ image có sẵn, và thực thi nó
* `start` :  chạy một container đã stop

Có thể hiểu một cách đơn giản, đó là `run` = `create container` + `start container` . :smile:

# Thế nào là Docker Volume ?
Mặc định, những files, dữ liệu bạn tạo ra bên trong container, giả sử các bảng cơ sở dữ liệu MySQL chả hạn, sẽ được lưu trữ ở thư mục nào đó của container. Vậy sẽ ra sao, khi mà container bị xóa, không lẽ bạn phải xây dựng lại từ đầu dữ liệu đó. :thinking:

No, giải pháp chính là Docker Volume.Nó có tác dụng :
* Lưu trữ, back up dữ liệu trong trường hợp container stop hoặc bị xóa
* Dùng để chia sẻ dữ liệu giữa container và máy host
* Dùng để chia sẻ dữ liệu với các container khác

Có 2 lựa chọn cho container để lưu trữ file, dữ liệu trên máy host trong trường hợp container stop hoặc bị xóa, đó là bind mounts và volumes.
## Bind mounts
Thư mục, tập tin...bind mounts có thể được lưu trữ ở bất cứ đâu trong máy host, có thể được chỉnh sửa bất cứ lúc nào.
Ví dụ :

` docker run -it --name Container1 -v ~/Desktop/backup:/data ubuntu-nginx bash `

Câu lệnh trên sẽ `run image` `ubuntu-nginx`, đặt tên container đó là `Container1` và  thư mục `Desktop/backup` được "mount" vào thư mục `/data` ở trong container. Bằng cách này, 2 thư mục `~/Desktop/backup` trên máy host và `data` trên container sẽ được đồng bộ.

Bạn có thể thử tạo 1 file  `test.txt` trên container với nội dung ` this is a test data` :

`root@d553648e5751:/data# echo "this is a test data" > test.txt`

Sau đó quay về thư mục `backup` kiểm tra xem có không nhé. :3 
## Volumes
Volumes được lưu trữ ở trong hệ thống máy host (`/var/lib/docker/volumes/`) và đặt dưới sự quản lý của Docker, những tiến trình không phải của Docker ( thao tác người dùng chả hạn ) không được khuyến khích thao tác vào phần này của file system.

Bạn có thể tạo một volume bằng câu lệnh

 `docker volume create <volume-name>`
 
 Hoặc trực tiếp sử dụng option `-v`  khi `run image` :
 
 `docker run -it -v name-of-volume:/data ubuntu-nginx bash`
 
 Docker thật vi diệu khi sử dụng option `-v`, nếu tham số đầu tiên của bạn có sử dụng ` ~/` hoặc `/`, nó sẽ hiểu bạn đang `bind mounts` một thư mục với thư mục trong container, ngược lại, bỏ các kí tự đó đi , nó sẽ tìm xem đã có volume nào tên như vậy chưa, nếu chưa sẽ tạo 1 volume với tên đó. 
 
 `-v /path:/data` : trường hợp này sẽ bind mounts thư mục `/path` của máy host với `/data` của container
 
 `-v path:/data`: trường hợp này sẽ tạo một volume với tên là `path` nếu chưa tồn tại;
 
 Giờ muốn kiểm tra volume chỉ cần gõ câu lệnh :  `docker volume inspect <tên volume>` là xong. :3
 
 Việc chia sẻ dữ liệu giữa các container giờ trở lên thật dễ dàng, bạn chỉ cần `run image` tạo một container khác và thêm option `-v` với  tham số là volume bạn muốn là được. Easy phải không. :smile:
 
#  4. Docker Compose là gì?
Như các bạn đã biết , container có thể được cài đặt một hoặc nhiều môi trường, nhưng giả dụ gặp trường hợp container đó gặp vấn đề thì sao, liệu cài đặt tất cả các môi trường trong một container có phải là phương án khả thi không. Chắc chắn là không rồi, vậy làm sao để có thể cài đặt các môi trường ở những container khác nhau mà vẫn có thể sử dụng được tất cả.
`-> Docker-compose sinh ra để làm việc này, nó có tác dụng giúp liên kết những container riêng lẻ`

## Cài đặt Docker Compose
 Lần lượt chạy các câu lệnh sau để cài đặt Docker Compose :
 
 Bước 1 : Download phiên bản mới nhất của Docker Compose
 
 `sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
 
 Bước 2 : Phân quyền cho thư mục
 
 `sudo chmod +x /usr/local/bin/docker-compose`
 
 Bước 3: Kiểm tra phiên bản 
 
 `docker-compose --version`
 
 Xong, khá dễ dàng để cài đặt đúng hăm, cùng tìm hiểu tiếp nhé :grimacing:
 
##  Ví dụ về Docker-compose file
Docker sử dụng 1 file docker-compose.yml thao tác với các môi trường.

`docker-compose.yml`
```

version: '2'

services:
    application:
        container_name: some_application
        image: debian
        volumes:
            - ./:/var/www/laravel
    php-fpm:
        container_name: some_php-fpm
        restart: always
        image: framgia/laravel-php-fpm
    nginx:
        container_name: some_nginx
        restart: always
        image: framgia/laravel-nginx
        ports:
            - "8000:80"
        links:
            - php-fpm

```
 
 Trên đây là một ví dụ điển hình của file `docker-compose.yml`.
 
 Trong đó :
 
 `version: '2'` : cho biết phiên bản của `docker-compose`
 
 `services` : danh sách các service ( ở đây là application, php-fpm, nginx )
 
 `container_name` : tên của container sau khi chạy docker-compose , nó tương đương với tham số của  option `--name` mình đã nhắc đến ở trên khi `run image` đó đó :smile:
 
 `image` : tên của image  trên Dockerhub ( nếu Docker quét trong máy chưa có sẽ tự động pull trên Dockerhub về )
  
  Trong trường hợp muốn tạo image từ Dockerfile , ta sử dụng option `build` 
  Nếu Dockerfile nằm cùng thư mục với file `docker-compose` ta chỉ cần :
```
build: .
```

hoặc  chỉ rõ đường dẫn tới Dockerfile :
```
build: 
    context: ./dir
    dockerfile: dir/Dockerfile
```

`volume` : tương đương với việc sử dụng option `-v` với tham số đầu tiên là đường dẫn thư mục ở máy host, và tham số thứ 2 là thư mục trong container;

`restart` : Có 4 giá trị cho option này đó là `no, always, on-failure, unless-stopped`
* `no` là giá trị được set mặc định, nó không restart container trong mọi hoàn cảnh.
* `always` luôn luôn restart container
* `on-failure` restart container khi gặp lỗi
* `unless-stopped` chỉ restart container khi nó đã dừng.

`ports` : Cấu hình cổng kết nối `(host:container)` . Như ví dụ trên, khi bạn truy cập vào cổng `8000` ở máy host, nó sẽ chỏ tới cổng `80` ở container.

`link` : link tới container của những service khác

# Tổng kết

Mình xin phép tạm dừng ở đây, bài viết trên được viết dựa trên ý hiểu cũng như tham khảo một số nguồn, nếu bài viết có sai xót mong mọi người góp ý. Cảm ơn vì đã đọc. :nerd_face: (bow)

Nguồn :

https://docs.docker.com/