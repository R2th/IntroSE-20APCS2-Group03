## Mở đầu
Trên Viblo cũng như gg đã có quá nhiều bậc tiền bối giải thích rõ ràng về kỹ thuật, khái niệm, cách thức hoạt động cũng như công dụng của Docker rồi nên mình sẽ không đi sâu vào nữa. Có thể hiểu đơn giản thì Docker là một nền tảng phần mềm cho phép bạn dựng, kiểm thử và triển khai ứng dụng một cách nhanh chóng. Docker đóng gói phần mềm vào các đơn vị được gọi là container có mọi thứ mà phần mềm cần để chạy, trong đó có thư viện, công cụ hệ thống, mã và thời gian chạy. Bằng cách này, ta có thể nhanh chóng triển khai và thay đổi quy mô ứng dụng vào bất kỳ môi trường nào và biết chắc rằng mã của mình sẽ chạy tốt. Nghe xịn quá đúng không nào? Vậy thì đã có docker rồi lại còn sinh ra docker-compose để làm gì và tại sao nên sử dụng nó? Tại sao đã cài docker rồi lại cần cài thêm docker-compose?
![image.png](https://images.viblo.asia/58bff4de-5068-482c-b8ff-e04e3c2ac6f9.png)

*Note:Trước khi tìm hiểu về docker-compose, bạn nên tìm hiểu trước về các khái niệm: images, container, các lệnh xem image, container, tạo + xóa images, xóa + tạo container.* 
## Định nghĩa docker-compose
Việc sử dụng dụng docker bằng cách gõ lệnh có vẻ khá là ngầu nhưng dùng lâu thì sẽ khá mỏi tay và tốn thời gian. Ví dụ chúng ta cần setup một hệ thống setup sử dụng nhiều docker cho cả DB, backend và frontend và mỗi khi chạy các bạn sẽ phải dành cả thanh xuân để gõ một mớ các dòng lệnh dài loằng ngoằng. 
Vậy tại sao chúng ta không nhét tất cả mọi thứ vào một chỗ. Với Dockerfile, chúng ta có thể tạo được một container chứa tất cả mọi thứ trong đó mà? Okay. Việc này có vẻ khả thi đấy nhưng vấn đề gặp phải là nếu làm vậy thì sẽ gây ra nhiều vấn đề trong việc build image nếu ta cần chính sửa, ngoài ra việc Dockerfile đảm nhận nhiều nhiệm vụ thì không tốt chút nào và vi phạm các nguyên tắc lập trình => Vậy là docker-compose ra đời để giải quyết các vấn đề nêu trên. :D

Định nghĩa Docker-compose rất đơn giản và dễ hiểu. Docker-compose là một công cụ cho phép chúng ta có thể định nghĩa và khởi chạy nhiều Docker container cùng một lúc. Chỉ với một câu lệnh đơn giản chúng ta có thể khởi tạo và chạy toàn bộ các services phục vụ cho việc chạy ứng dụng, điều mà Dockerfile không làm được. Rất tuyệt vời đúng không nào :v: 

![image.png](https://images.viblo.asia/cd08b731-7677-4605-ab20-1565903b7ff6.png)

## Cách sử dụng
Với Docker-compose chúng ta sẽ sử dụng file YAML để config các services cho ứng dụng. Việc sử dụng Docker Compose được tóm lược trong 3 bước cơ bản sau:
* Khai báo app’s environment với Dockerfile.
* Khai báo các services cần thiết để chạy app trong docker-compose.yml.
* Run docker-compose up và Docker-compose sẽ start và run app.

**Cấu trúc một file YML đơn giản của Docker Compose:**
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
**Trong đó:**

```version``` : Khai báo phiên bản sử dụng Docker-compose. 

```services``` : Bắt đầu danh sách các service (tạm hiểu là các Container sẽ được tạo). 

```web``` : Service đầu tiên.

```build``` : Build từ file Dockerfile, "." có nghĩa là sẽ tìm trong thư mục hiện tại, nếu các bạn để ở vị trí khác, cần cũng cấp đường dẫn tới file Dockerfile.

```ports``` : Định nghĩa port sẽ được mapping từ Host vào Container.

```5000:5000``` : Định nghĩa port sử dụng.

```redis``` : Service thứ hai.

```image: "redis:alpine"``` : Chỉ ra image sẽ được dùng để build container. Ở đây định nghĩa service hiện tại sẽ kéo image từ Docker Hub về để tiến hành chạy.

*Note*: Tìm hiểu thêm về Docker Hub ở [đây](https://docs.docker.com/docker-hub/#:~:text=Docker%20Hub%20is%20a%20service,container%20images%20with%20your%20team.&text=Docker%20Hub%20provides%20the%20following,private%20repositories%20of%20container%20images.)

Như vậy nếu chúng ta chạy file trên, Docker-compose sẽ tạo ra hai service, một là web, hai là redis, ngoài ra chúng ta có thể truy cập vào web trực tiếp trên máy đang chạy Docker thông qua port 5000 như sau:
```
localhost:5000
```
## Demo
Chúng ta cùng thử build và chạy thử một ứng dụng bằng docker-compose để hiểu rõ hơn nhé. Mình có một ứng dụng web đơn giản sử dụng react-java-mysql. File docker-compose.yml được khai báo như sau:
```
version: "3.7"
services:
  backend:
    build: backend
    restart: always
    secrets:
      - db-password
    environment:
      MYSQL_HOST: db
    networks:
      - react-spring
      - spring-mysql
    depends_on:
      db:
        condition: service_healthy
  db:
    environment:
      MYSQL_DATABASE: example
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db-password
    image: mysql:8.0.19
    restart: always
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "--silent"]
      interval: 3s
      retries: 5
      start_period: 30s
    secrets:
      - db-password
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - spring-mysql
  frontend:
    build:
      context: frontend
      target: development
    ports:
      - 3000:3000
    volumes:
      - ./frontend/src:/code/src
      - /project/node_modules
    networks:
      - react-spring
    depends_on:
      - backend
    expose:
      - 3306
      - 33060
volumes:
  db-data: {}
secrets:
  db-password:
    file: db/password.txt
networks:
  react-spring: {}
  spring-mysql: {}
```

**Ngoại trừ những từ khóa đã nói tới bên trên, chúng ta tiếp tục phân tích ý nghĩa các từ khóa mới:**

```build``` : Chỉ ra vị trị đường dẫn đặt Dockerfile của service.

```volumes``` : Khai báo mapping thư mục bên trong ra bên ngoài. Khi cần điều chỉnh các file bên trong Docker chung ta có thể sử dụng volumes để có thể tạo ra liên kết giữa hai thư mục ngoài và trong. Khi đó, chúng tảachỉ cẩn mở và điều chỉnh ở thư mục bên ngoài (Host) thì bên trong cũng sẽ được update.

```depends_on``` : Khai báo danh sách service phụ thuộc, nếu ta khai báo một service không tồn tại trong file thì nó sẽ báo lỗi. Việc xác định này cũng giúp đảm bảo sẽ chạy các service phụ thuộc trước khi chạy bản thân service đó. VD: Như file trên thì backend sẽ được chạy trước khi chạy frontend bởi vì frontend phụ thuộc backend.

```environment``` : environmentCác biến môi trường, trong quá trình build lên một Service nó sẽ đăng ký luôn các biến môi trường mà mình khai báo tại đây.

```networks``` :	Sử dụng để cấu hình network cho ứng dụng.

```secrets``` : Định nghĩa các thông tin nhạy cảm không public. Ở đây là mật khẩu db.

Okay. Để thực thi file ```docker-compose.yml``` ở thư mục hiện hành ta sử dụng câu lệnh
```
docker-compose up -d
```
Tùy chọn -d để các containers sẽ được chạy dưới dạng background. Lần đầu khởi chạy có lẽ sẽ tốn kha khá thời gian bởi vì docker-compose sẽ tự động build Image, kéo Image về nếu chưa có dưới local. 

*Note:* Nếu chạy câu lệnh trên mà gặp lỗi "Permission denied" các bạn thử chạy lại với 
```
sudo docker-compose up -d
```
![image.png](https://images.viblo.asia/32ee3b37-7dd4-4fea-94a7-1da4144d57d7.png)

Bây giờ ta đã có thể xem ứng dụng của mình ở port 3000 như đã định nghĩa ở trên. Rất đơn giản đúng ko nào :D
```
http://localhost:3000/
```
![image.png](https://images.viblo.asia/2d8aaeff-7e8e-4126-b326-dfaa64054c51.png)
### Các command thường sử dụng
```docker ps``` liệt kê các container.

```docker-compose up``` như đã nói ở trên.

```docker-compose build``` dùng để build tất cả container được định nghĩa trong compose file.

```docker-compose down``` dùng để dừng các container và xóa hết những gì được tạo từ lệnh up.

![image.png](https://images.viblo.asia/e803eace-a86c-4c74-b5df-2749c717b050.png)

Ngoài ra còn một mớ các câu lệnh khác các bạn có thể tìm hiểu thêm ở  ```docker-compose --help``` nhá :v: 
## Tạm kết

Qua bài viết mong rằng các bạn đã có cái nhìn rõ nét hơn về docker, docker-compose và trả lời được các câu hỏi đặt ra từ đầu bài. Kiến thức về docker khá là rộng nên nếu có thời gian thì mình sẽ tiếp tục tìm hiểu về chủ đề này. Hẹn gặp lại các bạn ở các bài viết sau nhé. :D :D
## Tài liệu tham khảo
https://viblo.asia/p/tai-sao-co-docker-roi-ma-con-de-ra-docker-compose-Qpmleo2mKrd