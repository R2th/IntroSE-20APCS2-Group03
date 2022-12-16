### Tại sao có Docker rồi mà còn đẻ ra Docker Compose
Như bài viết [Unserstand basic docker](https://gist.github.com/qt91/035195fc589b0368e23ce4eeca6a7aa1), việc sử dụng Docker bằng cách gõ lệnh, mới nhìn thì có vẻ chuyên nghiệp, nhưng dùng lâu thì sẽ rất mỏi tay và tốn nhiều thời gian. 
Thử tưởng tượng, nếu bạn cần setup một hệ thống có sử dụng 4 docker **nginx**, **phpfpm**, **mysql**, **redis**. Mỗi khi bạn muốn nó chạy các bạn sẽ phải gõ 4 dòng lệnh dài **loàn ngoằn**, chưa kể buồn buồn nó khởi động lại máy lại gõ lại.... có thể sẽ phải dành cả thanh xuân để đi gõ tới gõ lui các dòng lệnh nhàm chán.
Bởi vậy, các con người chán chán cảnh gõ đi gõ lại đã tạo ra một công cụ mới có tên là **Docker Compose**.

![enter image description here](https://i.imgur.com/BaQ6Las.png)

### Vậy Docker Compose là gì, liệu dùng nó có quên mất cách dùng Docker không?
**Docker composer** là một công cụ cho phép chúng ta có thể định nghĩa và khởi chạy nhiều **Docker Container**.
Với **Docker composer** bạn có thể định nghĩa một file có cấu trúc dưới dạng file YAML, và khởi chạy nó sẽ tạo ra các môi trường mà bạn cần

Việc sử dụng **Docker Compose** quá nhiều có thể dẫn đến việc bạn sẽ dần quên các **Command line** của **Docker**, còn việc có **quên mất** hay không thì **!KHÔNG** các bạn nhé. Khi nào các bạn cần dùng thì xem lại, làm gì mà phải sợ quên =)).

![enter image description here](https://i.imgur.com/JpRoihy.png)

### Cài đặt Docker Compose
Các bạn có thể cài đặt theo hướng dẫn tại [đây](https://docs.docker.com/docker-for-mac/install/).

### Giới thiệu về cấu trúc file YML của Docker Compose

#### Thử phần tích file docker-compose đơn giản đầu tiền
```
docker-compose.yml
```
```
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: "redis:alpine"
```
> Trong đó:
> **version**: Khai báo phiên bản dùng trong Docker Compose.
> 
> **services**: Bắt đầu danh sách các service ( tạm hiểu là các Container sẽ được tạo ) .
> 
> **web**: Đặt tên cho service đầu tiền là "web.
> 
> **build**: Build từ file **Dockerfile**, "." có nghĩa là sẽ tìm trong thư mục hiện tại, nếu các bạn để ở vị trí khác, cần cũng cấp đường dẫn tới file **Dockerfile**.
> 
> **ports**: Định nghĩa port sẽ được mapping từ Host vào Container .
> 
> **"5000:5000"**: Bên ngoài truy cập 5000 thì sẽ gọi 5000 vào bên trong, chúng ta có thể mapping nhiều cổng bằng cách thêm nhiều dòng bên dưới "5000:5000".
> 
> **redis**: Đặt tên cho service thứ hai.
> 
> **image: "redis:alpine"**: Khai báo này định nghĩa service hiện tại sẽ kéo **image** từ **Docker Hub** về để tiến hành chạy.

Như vậy nếu chúng ta chạy file trên, **Docker compose** sẽ tạo ra 2 service, một là **web**, hai là **redis**, ngoài ra chúng ta có thể truy cập vào **web** trực tiếp tự máy đang chạy **Docker** thông qua cổng 5000
Đường sẽ có dạng như dưới:
```
localhost:5000
```

#### Tăng độ khó bằng file docker-compose với nhiều tùy chọn hơn
```
version: '3'  
services:  
  nginx:  
    image: nginx:1.14-alpine  
    volumes:  
      - ./nginx/conf.d/:/etc/nginx/conf.d/  
      - ./src/public:/var/www/laravel/public  
    ports:  
      - 8000:80  
    links:  
      - phpfpm  
    depends_on:  
      - phpfpm  
  phpfpm:  
    build:  
      context: .  
      dockerfile: ./php/Dockerfile  
    volumes:  
      - ./src:/var/www/laravel  
    links:  
      - mysql  
    depends_on:  
      - mysql  
    environment:  
      - DB_HOST=mysql  
      - DB_DATABASE=sample  
      - DB_USERNAME=root  
      - DB_PASSWORD=root  
      - DB_TEST_HOST=mysql_test  
  mysql:  
    image: mysql:5.7  
    ports:  
      - "3406:3306"  
  volumes:  
      - ./db:/var/lib/mysql  
    environment:  
      - MYSQL_ROOT_PASSWORD=root  
      - MYSQL_DATABASE=root  
```
Ngoài trừ những từ khóa đã nhắc bên trên, chúng ta tiếp tục phân tích 
> **volumes**:  Khai báo mapping thư mục bên trong ra bên ngoài. Khi cần điều chỉnh các file bên trong **Docker** chung ta có thể sử dụng **valumes** để có thể tạo ra liên kết thúc giữa hai thư mục ngoài và trong. Khi đó, chúng tả chỉ cẩn mở và điều chỉnh ở thư mục bên ngoài (Host) thì bên trong cũng sẽ được update
>
>**links**: Cho phép đang ký một cái tên ( Bí Danh) để cho các Server khác có thể gọi nó. Điều đặt biệt là nó có thể đem lại một cái tên "Hợp vệ sinh", chúng ta không cần phải nhớ truy cập trên cổng nào như trên host. Chỉ cần sử dụng tên là có thể kết nói với service mong muốn.
>
>**depends_on**: Khai báo danh sách các service phụ thuộc, nếu ta khai bao một service không tồn tại trong file thì nó sẽ báo lỗi. Việc xác định này cũng giúp cho nó đảm bảo sẽ chạy các dịch vụ phụ thuộc trước khi chạy bản thân mình.
>VD: Như file trên, tuy chạy từ trên chạy xuống, nhưng nếu chúng ta khai báo như vậy, thì **service mysql** sẽ được chạy đầu tiên
>
>**context**: Xác định thư mục chứa gốc, dự vào thư mục này chúng ta sẽ khai bao tiếp đường dẫn **dockerfile**
>
>**environment**: Các biến môi trường, trong quá trình build lên một **Service** nó sẽ đăng ký luôn các biến môi trường mà mình khai báo tại đây

Hy vọng qua hai file **docker-compose.yml** và giải thích ý nghĩa từng khái niệm đã giúp các bạn hiểu phần nào về cách tạo một **docker-compose.yml**

### Các lệnh cơ bản trong Docker Composer

```bash
$ docker-compose up
```
> **Docker Compose** sẽ thực thư file **docker-compose.yaml** ở thư mục hiện tai, bao gồm các công việc như Build Image, Kéo Image xuống nếu chưa có dưới local...
>
>![enter image description here](https://i.imgur.com/a966vns.png)
>Ngoài ra bạn có thể thêm thuộc tính "-d" (detached) để nó sẽ luôn chạy không chiếm **terminal**

```bash
$ docker-compose down
```
> Khi thực hiện lệnh này, **Docker Compose** sẽ dựa vào các service được chạy trong file **docker-compose.yaml** và tắt nó
>
>![enter image description here](https://i.imgur.com/zDOEC17.png)

### Tổng kết
Qua bài viết trên, tôi đã giới thiệu cho bạn góc nhìn cơ bản về **Docker Compose**, hy vọng nó sẽ đem lại kiến thức bổ ích cho các bạn.
Đoán chờ phần tiếp theo, tôi sẽ giới thiệu tiếp tục cho các bạn về chủ đề **Docker** các bạn nhé.