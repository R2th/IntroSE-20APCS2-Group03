# Lời mở đầu

Chào các bạn! Chào các bạn! Chào các bạn!

Hôm nay mình lại tiếp tục viết tiếp về docker. Bài trước mình đã nói tất tần tật về Dockerfile (nếu bạn quan tâm có thể đọc tại [đây](https://viblo.asia/p/dockerfile-don-gian-hon-ban-nghi-jvEla16Dlkw)) và lần này mình sẽ tiếp tục với chủ đề hấp dẫn không kém, đó là docker compose. Và tại sao lại là docker compose? tại sao docker compose lại có mặt trên đời này? Thì câu trả lời không có gì quá bất ngờ, docker compose sẽ giúp bạn làm việc với Docker một cách hiệu quả hơn, đơn giản hóa các thao tác và mang đến một trải nghiệm tuyệt vời. 

Để dễ hình dùng thì chẳng bạn ứng dụng của bạn đang cần tạo docker cho DB, backend và frontend. Với Dockerfile, bạn sẽ có thể tạo được 1 container chứa tất cả mọi thứ vào trong đó. Tuy nhiên, việc nhét quá nhiều thứ vào Dockerfile sẽ gây ra nhiều vấn đề trong việc build image nếu bạn cần chỉnh sửa (tăng thời gian build chẳng hạn), ngoài ra, một Dockerfile đảm nhận nhiều nhiệm vụ thì hoàn toàn không tốt chút nào với các principle KISS, SRP. Nếu bạn tách nó ra thành các Dockerfile riêng biệt để tránh các vấn đề trên thì việc chạy từng Dockerfile một cũng không thích hợp nếu như đó là hàng chục hoặc hàng trăm image. Ngoài ra, nếu bạn có một container cần dùng chung (chẳng hạn như DB) hay đơn giản là có thể hoạt động với mọi môi trường như dev, test, prod... thì Dockerfile không hề dễ để thực hiện. 

Chính vì thế mà docker compose ra đời để giải quyết những vấn đề mà Dockerfile không thể làm tốt và tăng khả năng thần thánh của Docker. Cùng tìm hiểu với nội dung bên dưới nhé.

# Docker compose - nó là gì

> Compose is a tool for defining and running multi-container Docker applications

Định nghĩa của docker compose cũng không có gì đặc biệt, vô cùng ngắn gọn và dễ hiểu. Docker compose là một công cụ vô cùng đơn giản để thực thi nhiều container cùng một lúc cho ứng dụng của bạn. Vâng, cùng một lúc, chỉ cần một lệnh đơn giản bạn có thể khởi chạy hàng loạt các container, điều mà Dockerfile không có làm được. Nếu bạn chú ý trong định nghĩa, nó còn có một phần là định nghĩa các container, tức là bạn không cần dockerfile để build container nữa, rất thành thánh có đúng không nào. 

Vậy về định nghĩa của docker compose có gì khó?  không có gì khó, nó hoàn toàn dễ hiểu.

# Docker compose - dùng thế nào

> With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.
> Using Compose is basically a three-step process:
> 1. Define your app’s environment with a Dockerfile so it can be reproduced anywhere.
> 2. Define the services that make up your app in docker-compose.yml so they can be run together in an isolated environment.
> 3. Run docker-compose up and Compose starts and runs your entire app.

Yeah vô cùng đơn giản phải không nào. Để có thể dùng được docker compose, bạn cần tạo một compose file như `docker-compose.yml` để thiết lập các container cần cho ứng dụng của bạn. Trông nó sẽ như thế này:
```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: "redis:alpine"
```

Và sau đó để build, run và stop các container, các bạn có thể sử dụng các command sau:
```bash
docker-compose build
docker-compose up
docker-compose down
```

Trong đó

[`docker-compose build`](https://docs.docker.com/compose/reference/build/) dùng để build tất cả container được định nghĩa trong compose file. Tuy nhiên, mình hay sử dụng lệnh này để thực hiện build lại service vừa được thay đổi bằng lệnh sau `docker-compose build <servicename>`

[`docker-compose up`](https://docs.docker.com/compose/reference/up/) thực hiện tạo và khởi chạy các container. Các bạn có thể xem ở [đây](https://docs.docker.com/compose/reference/up/) để thêm các options tương ứng với lệnh `up`. Về cơ bản thì bạn chỉ cần 2 option là `-d` và `--force-recreate`

Với  `-d` thì các containers sẽ được chạy dưới dạng background. Chạy background như thế nào thì khi run Dockerfile hẳn là bạn đã biết. Detached mode chắc hẳn là không thể thiếu khi khởi chạy bất cứ service nào. Còn tại sao phải dùng `--force-recreate` . Nếu không có sự thay đổi nào thì cần phải gì tạo lại container. Thì quan điểm của mình như thế này, một là không tái tạo, hai nếu mà đã tái tạo thì tái tạo lại hết các container. Điều này đảm bảo sự thống nhất giữa các container. Nếu các bạn không thích thì cũng không sao cả, cứ việc sử dụng `docker-compose up -d`thế là đủ.

Còn nếu chỉ muốn up một số service thì các bạn cứ đặt các service muốn chạy đằng sau lệnh up là được. Ví dụ như
`docker-compose up -d redis sqlserver`

[`docker-compose down`](https://docs.docker.com/compose/reference/down/) dùng để dừng các container và xóa hết những gì được tạo từ lệnh `up`. Về cơ bản thì nó sẽ xóa bỏ những container và network được định nghĩa trong compose file

Vậy về cách sử dụng docker compose có gì khó? không, dễ như ăn kẹo

# Các bước tạo compose file

Đọc những nội dung phía trên, hẳn các bạn cũng nhận ra tạo compose file là bước quan trong nhất trong việc sử dụng docker compose. Vì vậy cần phải có phương pháp để tạo compose file một cách hợp lý. Và mình cũng xin chia sẽ về cách mà mình đang sử dụng. Nếu có gì không hợp lý thì các bạn cứ đóng góp nhé.

Bước thứ nhất: Thiết kế hệ thống và xây dựng các biến môi trường. 
Đây là bước cần thiết để tạo ra tổng thể cho ứng dụng của bạn. Các service cần sử dụng, các thiết lập về biến môi trường như connect string, local path và port của các service... Về căn bản thì một ứng dụng sẽ được chia thành 2 phần và mình sẽ tạo 2 compose file riêng biệt cho nó là:

* `docker-compose.data.yml` 
* `docker-compose.services.yml`

Bước thứ hai: Tạo dockerfile
Mặc dù docker compose có thể tạo container mà không cần đến Dockerfile. Nhưng như mình đã nói ở bài trước, Dockerfile là trái tim của docker. Thử xem việc sống mà không có trái tim thì có hợp lý không nhỉ. Việc dùng docker mà không sử dụngDockerfile cũng như vậy, hoàn toàn không hợp lý chút nào. Nguyên nhân phải sử dụng Dockerfile là vì nó là lựa chọn tốt nhất để tạo image cho việc build container. Bạn hoàn toàn có thể lấy cái image từ docker hub và sử dụng nó để build container, không cần đến dockerfile như tạo redis container từ image `redis:alpine` trên docker hub

```yaml
version: '3'
services:
  redis:
    image: "redis:alpine"
    ports:
      - "6379:6379"
```

Tuy nhiên không phải image nào cũng theo như mong muốn của bạn, và bạn còn muốn thêm một số config vào container của bạn, thì bạn còn phải thêm option tương ứng trong compose file. Bên cạnh đó, nếu tất cả đều chứa trong compose file thì việc maintain nó cũng chẳng dễ dàng gì. Việc tách ra sẽ khiến cho nhiệm vụ của từng phần được rõ ràng hơn như dockerfile sẽ đảm nhận việc định nghĩa container và docker compose sẽ quản lý các container đó, hợp lý chứ nhỉ. Ví dụ như ta tạo một Dockerfile cho redis là cấu trúc thư mục như thế này:

```bash
app
    |   docker-compose.data.yml
    +---redis
    |       Dockerfile
```

thì compose file chúng ta chỉ cần điều chỉnh 

```yaml
version: '3'
services:
  redis:
    build:
      context: ./redis
      ports:
      - "6379:6379"
```

Bước thứ ba: Viết compose file
Sau khi đã tạo được các Dockerfile cần thiết cho mỗi service, bây giờ ta cần gom chúng vào compose file và tất nhiên là sẽ thêm các setting như port, eviroment... Ví dụ như để tạo data compose file với cấu trúc thư mục như sau

```bash
app
    |   docker-compose.data.yml
    +---redis
    |       Dockerfile
    +---MySql
    |       Dockerfile
```

thì `docker-compose.data.yml` của mình như thế này

```yaml
version: "3.4"

services:
  redis:
    build:
      context: ./redis
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "6379:6379"
    volumes:
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf

  mysql:
    build:
      context: ./MySql
    environment:
      - MYSQL_ROOT_PASSWORD=${ENVIRONMENT_MYSQL_PASSWORD}
      - MYSQL_DATABASE=${ENVIRONMENT_MYSQL_DATABASE}
    volumes:
      - ./mysqldata:/var/lib/mysql
    ports:
      - "3306:3306"
```

Vì chúng ta đã xác định rõ những service database cần dùng là redis và mysql, nên việc tạo Dockerfile tương ứng là khác dễ dàng. Cũng như việc tạo các biến environment để sử dụng trong compose file đã được định nghĩa từ trước nên quá trình viết compose file của mình bớt đi rất nhiều thời gian. Hoàn toàn dễ phải không các bạn.

Chốt về tạo compose file có gì gì?  khó ư, chỗ nào?

# Lời kết

Để trả lời cho tiêu đề bài viết, như các bạn đã đọc thì docker compose chẳng có gì khó để nắm bắt cả. Chính vì thế, mình rất mong các bạn có thể nhanh chóng học và sử dụng thành thạo docker compose cho dự án của mình mà không cần băn khoăn hay sợ hãi các thứ. Chúc các bạn thành công trong việc học và sử dụng docker của mình. Chào tạm biệt và hẹn gặp lại ở bài viết tiếp theo

# Tham khảo

- https://docs.docker.com/compose/
- https://docs.docker.com/compose/gettingstarted/