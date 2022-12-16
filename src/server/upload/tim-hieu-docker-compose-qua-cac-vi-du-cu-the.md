# Lời mở đầu

Chào mọi người. Vẫn là mình và những bài viết về docker đây. Đợt vừa rồi mình có giới thiệu một bài về [docker compose](https://viblo.asia/p/docker-compose-co-gi-kho-RQqKLLGOK7z) thì có bạn bảo mình giải thích các setting trong docker compose. Thì hôm nay, mình sẽ viết về vấn đề này để các bạn có cái nhìn rõ hơn cũng như có thể tự tin hơn khi tạo docker compose nhé. Note nhẹ là bài viết sẽ là những ví dụ cụ thể những gì mình làm trong quá trình sử dụng docker, vì mình cũng không phải là một devops thực sự nên có thể những option mình sử dụng sẽ rất rất là cơ bản nên nếu thiếu sót chỗ nào thì mong các bạn góp ý nhé.

Bắt đầu thôi nào.


# Ví dụ về docker compose cho database

Mình có thói quen khi tạo docker compose là chia nó ra thành 2 file - một cho database và 1 cho service frontend và bacjend. Ngoài ra còn một số file compose dùng để migration data nhưng mà nó cũng tùy thuộc vào từng dự án nên mình không nhắc ra ở đây, Thì mình sẽ chia ra làm 2 file như thế này 
```
docker-compose.data.yml
docker-compose.services.yml
```


Điều này với một số người hơi dư thừa nhưng với mình thì việc chia thế này dễ quản lý hơn. Với lại mình dùng database trong docker thay vì cài ở máy nên là mình chia như thế này để dùng chung database cho tiện :smile: 

Với file docker compose cho data thì mình sẽ cho ví dụ về các db hay sử dụng như redis, dynamodb và mysql. Có lẽ 3 ví dụ này cũng là quá đủ rồi :D

## redis

```
  redis:
    build:
      context: ./redis
    command: redis-server /usr/local/etc/redis/redis.conf
    ports:
      - "6379:6379"
    volumes:
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf
```

Nhìn vào ví dụ trên thì các bạn thấy mình dùng 4 option là build, command, ports là volumes. 


Các option này có ý nghĩa như sau

`build`: chỉ định dockerfile sẽ được tạo trong build time.  Như các bạn cũng biết thì một container được tạo trên 1 image và 1 image được định nghĩa từ 1 dockerfile. Nên rõ ràng `build` là option đầu tiên mà chúng ta cần quan tâm. `build` có thể là một path chỉ định dockerfile hoặc có thể config path đó với các option như context, dockerfile, arg.  `build` có thể config đơn giản như thế này

```
build: ./redis
```

Tuy nhiên phần path ở ví dụ trên thì sẽ là chỉ định ở context. Điều này giúp cho việc config trông rõ ràng hơn.

* `context`: chỉ định đường dẫn chứa dockerfile (hoặc đường đẫn đến git repository chứa dockerfile chẳng hạn). Nó có thể là đường dẫn tương đối hoặc tuyệt đối. Điều này giúp docker compose dễ dàng quản lí các dockerfile rải rác trong các bộ source của các bạn. 

`command`: tương tự với option CMD trong dockerfile. Chỉ định những gì cần thực thi khi container được khởi chạy. Ví dụ ở trên là khởi chạy redis server. Command này hoàn toàn có thể đặc trong dockerfile, nhưng vì là ví dụ nên mình để ra compose cho các bạn có một cái nhìn cụ thể hơn về những gì docker compose có thể làm

`ports`: thiết lập port cho container. Đây là một option rất quan trọng để chúng ta có thể sử dụng được các service. Ở đây có 2 khái niệm là host port và container port. Các container giao tiếp với nhau qua docker networks và hiển nhiên nếu các container này dùng chung một networks thì chúng phải sử dụng các port khác nhau. Tuy nhiên, để từ phía bên ngoài sử dụng được các service ở docker, chúng ta cần thiết lập các địa chỉ host tương ứng để mapping với các service trong docker networks. 


Có 2 syntax thưởng sử dụng là 

1.  sort syntax :  chỉ định cả 2 port (HOST:CONTAINER), hoặc chỉ mỗi CONTAINER port 
   
```
ports:
    - "3000"
```
  chỉ định port của container, port của host sẽ được lựa chọn ngẫu nhiên. Cách này thì mình ít sử dụng do chả biết port host là port nào. Cái này chỉ dành cho các container nội bộ không cần phải truy cập từ phía bên ngoài.
  
```
ports:
    - "6379:6379"
```

chỉ định port theo format HOST:CONTAINER nhé. Bên trái là port của host (máy chủ hệ thống) còn bên phải là của container (sử dụng trong docker network). Các bạn lưu ý là các port config phải chưa được dùng. Với redis, nếu bạn đã cài ở máy của mình thì port 6379 (port mặc định của redis) đã được dùng, các bạn cần thay nó bằng một port khác. Còn với mình, mình sử dụng các port mặc định của các database, thứ nhất là vì mình không cài chúng trên máy và thứ hai là dễ nhớ, chẳng cần thiết phải nhớ thêm bất cứ port nào cho redis.

2.  long syntax : thêm một số config mà không thể chỉ định với sort syntax. Tuy nhiên thì mình cũng không dùng long syntax nhiều nên là cũng không tiện đề cập đến. Sợ lại múa rìu qua mắt thợ. Các bạn muốn tìm hiểu thì cứ xem ở [đây](https://docs.docker.com/compose/compose-file/#long-syntax-1) nhé 

```
ports:
  - target: 80
    published: 8080
    protocol: tcp
    mode: host
```


`volumes`: đây là option mà theo mình là bắt buộc phải có với các data container.  Option này cho phép docker mount thư mục từ máy với container, điều này giúp cho việc bạn không phải mất đi data đã lưu khi stop container. Nếu không xài volumes thì coi như stop container là mất hết nên bắt buộc phải dùng rồi he. Với option volumes chúng ta cũng có 2 dạng config là short syntax và long syntax và tất nhiên mình vẫn lựa chọn short syntax, ngắn ngọn dễ xài

1. short syntax: format sử dụng là` [SOURCE:]TARGET[:MODE] `

* `source`: chỉ định host path. Với host path bạn có thể setting với đường dẫn tương đối (bắt đầu bằng `.` hoặc `..`)
* `target`: chỉ định container path
* `mode`: mặc định là read-write (rw). Mode còn lại là read-only (ro). Cơ mà tạo database read-only thì cũng chả làm gì nên là mình luôn để mặc định


```
volumes:
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf
```


2. long syntax: hỗ trợ thêm một số option, được thêm ở version 3.2. Chi tiết tham khảo tại [đây](https://docs.docker.com/compose/compose-file/#short-syntax-3)


```
volumes:
      - type: volume
        source: mydata
        target: /data
        volume:
          nocopy: true
```


Như vậy các bạn cũng thấy quá trình này cũng như ta cài đặt một phần mềm. Đầu tiên là cài đặt, set port, set vùng nhớ. Sau đó là khởi chạy phần mềm đó. Thì tạo container cũng sẽ có những thao tác tương tự. Chắc các bạn cũng đã hiểu sơ sơ về cách mình tạo các services trong docker compose rồi he. Nào cùng đến với ví dụ tiếp theo để hiểu rõ hơn nhé


## dynamodb

```
  dynamodb:
    build:
      context: ./Dynamodb
      dockerfile: Dockerfile
    image: dynamodb
    ports:
      - "8000:8000"
    volumes:
      - ${hostdynamopath}:/var/dynamodb_local/db
```

Nếu so sánh với ví dụ trên thì cũng không có quá nhiều khác biệt. Phần đáng lưu ý ở ví dụ này chính là option `image`

`image`: chỉ định image để khởi tạo container. 

Như các bạn đã biết thì một container khởi chạy dựa trên một image. Vì vậy khi có image và chỉ định nó trong docker compose, ta hoàn toàn có thể tạo container từ nó. Vậy phần setup trên có phải là dư. Như thế này là đủ rồi

```
  dynamodb:
    image: dynamodb
    ports:
      - "8000:8000"
    volumes:
      - ${hostdynamopath}:/var/dynamodb_local/db
```

à như vầy cũng đủ, cũng đúng. Vậy việc gì xảy ra nếu image bạn chỉ định không tồn tại. Compose có thể pull image về nếu bạn chỉ định một repository tuy nhiên nếu chỉ là name thì lúc này bạn cần phải chỉ định cho việc build image. Đó là lí do ví dụ của mình có cả `build` lẫn `image`. Sự kết hợp này với mục đích sẽ build một image có tên là dynamodb (tên chỉ định ở image) với dockerfile chỉ định ở context. Và lần chạy sau này, nó sẽ load image đã tạo ở lần trước chứ không cần phải build một image mới. Trường hợp bạn có lỡ xóa image thì cũng không sao cả, compose sẽ build nó lại cho bạn.

Thêm một chút giải thích cho những ai tinh ý là mình có thêm một config nhỏ trong option build đó chính là dockerfile. Mặc định compose sẽ build image từ dockerfile nằm trong path chỉ định ở `context`. Tuy nhiên nếu trong path đó bạn có một vài dockerfile và cần chỉ định rõ file nào thì lúc này bạn cần sử dụng đến option `dockerfile`. Ví dụ như

```
build:
  context: .
  dockerfile: Dockerfile-backup
```


Ở ví dụ này các bạn có thể thấy mình không sử dụng option `command`. Như đã nói ở trên, mình có thể config nó ở dockerfile nên là không cần phải có trong compose file. Ngoài ra thì mình cũng có một vài dockerfile khác nhau với dynamodb nên là việc dùng một command cho tất cả các file nó không có đúng lắm nên mình bỏ vào trong dockerfile luôn. Cho nên ở ví dụ này, các bạn có thể hiểu được lí do vì sao mình dùng option `dockerfile` và không dùng option `command`



## mysql

```
  mysql:
    build:
      context: ./MySql
    environment:
      - MYSQL_ROOT_PASSWORD=yourpassword
      - MYSQL_DATABASE=yourdatabase
    volumes:
      - ./mysqldata:/var/lib/mysql
    ports:
      - "3306:3306"
    sysctls:
      net.ipv4.ip_local_port_range: 49152 65535
```


Với MySQL thì mình cần có thêm option là `environment`. Khác với redis và dynamodb thì MySQL cần thêm một số thông tin như DB name và password trong quá trình cài đặt. Chính vì thế docker compose cung cấp option `enviroment` để tạo các biến môi trường. Các biến này giúp cho việc cài đặt MySQL trong container (tương tự như những gì bạn đã cài bằng thủ công trên máy của bạn), thiết lập tên database và root password. Tất nhiên là sẽ có thêm một số option như user và user password tuy nhiên mình cũng chỉ dùng cho một số trường hợp nên các bạn có thể tự tìm kiếm thêm ha, cũng khá là đơn giản thôi.

Một chút lưu ý với việc settine enviroment trong docker compose đó chính là vấn đề bảo mật. Việc setting trong compose file rõ ràng là rất khó che đậy và dễ dàng bị đánh cắp nến bạn không quản lý tốt source của mình. Mọi thông tin đều không có mã hóa nên đôi khi việc thiết lập như thế này ở compose file là khác mạo hiểm. Lúc này chúng ta cần một thứ gì đó như

```
environment:
      - MYSQL_ROOT_PASSWORD=${mysqlpassword}
      - MYSQL_DATABASE=${mysqldatabase}
```

Bạn có thể thấy lúc này thông tin về pasword sẽ được lấy từ một nguồn khác. Và tất nhiên sẽ làm tăng tính bảo mật. Mình sẽ giới thiệu chi tiết việc config env cho docker ở một bài viết khác nên bài này chỉ giới thiệu nhiêu đây thôi. 

Ngoài ra mình còn sử dụng đến option `sysctls` để thay đổi một số param mặc định của container kernel. Ở đây mình hay set `net.ipv4.ip_local_port_range` để thay đổi dãy port mặc định được dùng bởi giao thức TCP (hay UDP) . Các này cũng không cần thiết lắm bên bạn cũng có thể bỏ qua.


Tổng thể compose file với 3 database trên trông sẽ như thế này

```
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
    sysctls:
      net.ipv4.ip_local_port_range: 49152 65535

  dynamodb:
    build:
      context: ./Dynamodb
      dockerfile: Dockerfile
    image: rs/dynamodb
    ports:
      - "8000:8000"
    volumes:
      - ${hostdynamopath}:/var/dynamodb_local/db
    sysctls:
      net.ipv4.ip_local_port_range: 49152 65535

  mysql:
    build:
      context: ./MySql
    environment:
      - MYSQL_ROOT_PASSWORD=${mysqlpassword}
      - MYSQL_DATABASE=${mysqldatabase}
    volumes:
      - ./mysqldata:/var/lib/mysql
    ports:
      - "3306:3306"
    sysctls:
      net.ipv4.ip_local_port_range: 49152 65535

networks:
  default:
    external:
      name: nat

```

Lưu ý: 

- phiên bản compose file mình sử dụng là 3.4. Các bạn nên lưu ý đến `version` vì mỗi version đều có một số điểm khác nhau, có hỗ trợ một số option. Đặc biệt là có sự khác nhau rất lớn giữa version 2 và version 3 (dễ hiểu mà ha, tăng cả một version như thế thì hẳn là big change rồi)
- các database cần được khai báo trong `services`
- networks có thể được setting trong mỗi service. Tuy nhiên ở đây mình config tất cả các service đều dùng chung 1 networks. Mình cũng định giới thiệu một bài riêng về docker network cho nên là phần này mình cũng sẽ không giải thích nhiều. Tiện câu view cho mấy bài sau ý mà.

Xong phần tạo container cho các database. Vậy đối với container cho các service chính như frontend, backend thì có gì khác biệt. Chắc hẳn các bạn cũng sẽ rất tò mò. Thì mình xin được note nhẹ là nó chẳng có gì khác biệt cả. Docker compose cung cấp các option để bạn có thể tạo container một cách dễ dàng nhất nên việc sử dụng chung một bộ option là điều hiển nhiên. Việc bạn cần quan tâm đó chính là container cần phải tạo từ image định nghĩa ở dockerfile nào hay những setting cụ thể vể port, các biến môi trường cần thiết phải được cung cấp ở enviroment,..

Chẳng hạn sau đây là một số ví dụ về các service UI của mình


```
  adminui:
    build:
      context: ./Services/AdminUI
      dockerfile: Dockerfile
    image: proj/admin-ui
    ports:
      - "3001:80"
    sysctls:
      net.ipv4.ip_local_port_range: 49152 65535
      
  customerui:
    build:
      context: ./Services/CustomerUI
      dockerfile: Dockerfile
    image: proj/customer-ui
    ports:
      - "3002:80"
    sysctls:
      net.ipv4.ip_local_port_range: 49152 65535
```

Đấy, chẳng có khác nhau gì luôn. Bởi vì phần khác nhau lớn nhất nó lại nằm ở dockerfile rồi. Mà đây là bài viết về docker compose nên là ... các bạn hiểu ý mình rồi đấy :smirk: 


# Lời kết

Qua bài viết này, mình cũng chỉ muốn nhắn gửi đến các bạn rằng là docker compose đúng như mình khẳng định ở bài viết trước là không có gì khó cả. Mọi option đều có thể config một cách dễ dàng, không có gì quá rối rắm, khác biệt giữa các service. Một service về cơ bản được định nghĩa ở compose file bao gồm 2 phần quan trọng là

- Nó được build từ đâu. Bạn có thể chỉ định dockerfile trong build context hoặc nếu đã có sẵn image thì chỉ cần dùng nó thôi
- Nó giao tiếp với thế giới như thế nào. Bạn lưu ý ở dockerfile cũng có setting port với option `EXPOSE`. Thì option này chính là port được dùng trong docker networks. Và bạn cần map nó với host port để có thể sử dụng bên ngoài docker. Chính vì thế, option `ports` ỏ compose file là một phần không thể thiếu

Đối với các database thì bạn cần setting thêm volumes để có thể mount tới folder thật. Điều này giúp cho data không bị mất đi khi stop các container (docker-compose down)

Cảm ơn các bạn đã đọc đến đây. Chào và hẹn gặp lại ở các bài viết sau.

# Tham khảo


https://docs.docker.com/compose/compose-file