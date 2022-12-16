Tiếp tục series bài viết về docker, phần 1 mình đã giới thiệu những cơ bản về docker, các lệnh để thao tác trong docker và cách deploy 1 ứng dụng đơn giản trong container. Nếu bạn còn đang chưa biết về docker, bạn có thể tham khảo phần 1 để hiểu cơ bản về docker qua bài viết: [Tìm hiểu cơ bản về docker qua ví dụ](https://viblo.asia/p/tim-hieu-co-ban-ve-docker-qua-vi-du-YWOZr6REZQ0)<br>
Trong bài viết tiếp theo này mình sẽ tiếp tục giới thiệu về docker network, cách để các container có thể giao tiếp và liên kết với nhau và sử dụng docker compose để biên tập, xây dựng và triển khai các dịch vụ trong các container. Nào hãy cùng bắt đầu nào, let's go!!!<br>
### Default network
Khi bạn cài đặt docker, nó sẽ tự động tạo ra 3 network tự động, ta có thể xem các network mặc định đó bằng lệnh sau: `docker network ls`
```
~# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
7c62340c2fa9        bridge              bridge              local
f60c58334851        host                host                local
fbd0315gha15        none                null                local
```
Ba network trên được dựng lên trong Docker, khi run container  ta có thêm flag `--network` thể chỉ định container đó kết nối vào mạng nào.<br>
Network `bridge` đại diện cho network `docker0` khi bạn cài đặt docker, trừ khi bạn chỉ định network cho container khi run bằng cách thêm vào `docker run --network=<NETWORK>`  còn không, nó sẽ là network mặc định khi container được run và kết nối vào. Thử kiểm tra các cài đặt IP address, network trên máy ta sẽ thấy 2 network `docker0` là network default:
```
~# ifconfig 
docker0   Link encap:Ethernet  HWaddr 02:42:47:bc:3a:eb  
          inet addr:172.17.0.1  Bcast:0.0.0.0  Mask:255.255.0.0
          inet6 addr: fe80::42:4aff:fe7f:92f5/64 Scope:Link
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:36 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:0 (0.0 B)  TX bytes:5013 (5.0 KB)
```
Xem thông tin network trong docker bằng lệnh `docker network inspect <NETWORK>`<br>
Để dễ dàng tiếp cận hơn, chúng ta cùng tìm hiểu thông qua ví dụ sau: tạo 2 container được run bởi image `busybox` và cùng tìm hiểu network mặc định của các container đó.<br>
Đầu tiên, chúng ta cùng pull image `busybox` về bằng lệnh `docker pull busybox`. Nói qua về image tên `busybox`, nó là một image rất nhỏ gọn, chỉ hơn 1MB, nhưng nó chứa nhiều thứ rất hữu ích.<br>
`busybox` là một software, nó tập hợp nhiều UNIX utilities (các câu lệnh) thành một file duy nhất. Các câu lệnh cung cấp bởi busybox thường tương đương với các câu lệnh cung cấp bởi GNU nhưng có ít option hơn.<br>
Okay, đến đây chúng ta cùng thử tạo 2 container C1 & C2 được run bới busybox:
```
~# docker run -itd --name=C1 busybox
82cc2ba61825b8d24dfb87fe773af7bd65a6ea093d1j7a602a1a1a5h4c905adb
~# docker run -itd --name=C2 busybox
2e1ee5131c2f29b67570720078180c95fce63cc2a45677b2a2ee4f2039ed6255
~# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
2e1ee5131c2f        busybox             "sh"                6 seconds ago       Up 3 seconds                            C2
82cc2ba61825        busybox             "sh"                17 seconds ago      Up 15 seconds                           C1
```
Kiểm tra network `bridge` để xen thông tin các container kết nối vào bằng lệnh `docker network inspect bridge` . Chúng ta sẽ nhận được 1 file json chứa thông tin về bridge network, trong đó có thông tin các container kết nối vào:
```
...
        "Containers": {
            "2e1ee5131c2f29b67570720078180c95fce63cc2a45677b2a2ee4f2039ed6255": {
                "Name": "C2",
                "EndpointID": "4baeadde1e4ba40542e2e71039735dab99bd4d91dd2d1c5d569k88752194ef7a",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "82cc2ba61825b8d24dfb87fe773af7bd65a6ea093d1j7a602a1a1a5h4c905adb": {
                "Name": "C1",
                "EndpointID": "df64cddf8081f9363b1c56891b18b6da534f694348838a81c327cbab581943a7",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
 ...
```
Dễ dàng thấy container C1 và C2 vừa tạo đã được kết nối vào mạng bridge, mạng mặc định của docker khi chúng ta run container.<br>
Bây giờ chúng ta cùng vào trong container C1 kiểm tra thử kết nối tới container C2 xem sao. Sử dụng lệnh `docker exec -it C1 sh` để truy cập vào trong container C1, gõ lệnh `ifconfig` ta sẽ thấy được địa chỉ của container C1. Sau đó chạy lệnh `ping 172.17.0.3` (172.17.0.3 là địa chỉ IP của container C2 lấy được bằng các tương tự) ta sẽ thấy thông báo kết quả ping kết nối được tới container C2.<br>
### User-defined networks
Bạn cũng có thể tự define 1 network riêng và cho phép những container chỉ định được kết nối với nhau thông qua network đó.<br>
Để tạo một network riêng bằng cách sử dụng lệnh sau:<br>
```
~# docker network create --driver bridge my_network
7824916e5e5ef2928a6cfa957256cea7792f4368aed965ce09c64a66f486a537
```
network được tạo ra với tên là `my_network` được sử dụng chung driver bridge giống như network `bridge` mặc định.  Bây giờ chúng ta có thể chạy lệnh start container với network chỉ định của chúng ta:
```
~# docker run -itd --network my_network --name C3 busybox
c90488b76bdca110190428073e7ac45e9bbae6ae01e8f5de98d43b6dd8555677
```
Chúng ta vừa chỉ định container C3 được run kết nối vào mạng `my_network` vừa được tạo. Sử dụng lệnh `docker exec -it C3 sh` để truy cập container C3 và xem địa chỉ IP ta sẽ thấy có địa chỉ thuộc dải mạng khác với dải mạng `bridge` mà container C1, C2 kết nối vào. Thử ping đến địa chỉ container C1, C2 tạo ở trên thì thấy không phản hồi. Như vậy rõ ràng container C3 tạo ra đã kết nối đến network `my_network` riêng mà chúng ta tạo ra hoàn toàn độc lập với container C1, C2 ở trên.<br>
Bạn cũng có thể setting cho container C3 connect đến network `bridge` bằng lệnh `docker network connect bridge C3`. Sau khi chạy lệnh container C3 sẽ được kết nối thêm đến mạng `bridge` mặc định, chúng ta có thể truy cập C3 và ping được đến các container C1, C2.<br>
### Links
Trước khi Docker bao hàm các mạng do user dự định nghĩa, bạn cũng có thể sử dụng `--link` cho phép container có thể giải quyết tên của container khác thành địa chỉ IP. Đồng thời cũng cho nó quyền truy cập vào các biến môi trường của các container khác được liên kết. Nếu có thể bạn cũng nên tránh sử dụng flag `--link`vì khi tạo link, chúng hoạt động khác so với sử dụng `bridge` network hoặc network do user tự định nghĩa.<br>
### Docker Compose
Tiếp theo, mình sẽ chỉ cho các bạn cách sử dụng Docker Compose để tạo và chạy các lệnh dịch vụ trên docker.<br>
Nói qua về docker-compose: Khi phân phối các ứng hoàn thành, từng phần của ứng dụng đó ở dạng sản phẩm gọi nó là các service (dịch vụ). Những thành phần này khi phân phối ứng dụng chúng đều được gọi là các dịch vụ service. Như vậy các service thực chất là các container chạy đáp ứng chức năng thành phần tạo nên ứng dụng. Bạn cần hiểu sơ qua về khái niệm này vì ta sẽ sử dụng nó trong docker-compose giúp tạo ra các service trên một cách tự động<br>
Một phần quan trọng nữa của docker-compose đó chính là file `docker-compose.yml`. File `docker-compose.yml` gần giống ý nghĩa với file `Dockerfile` đã tìm hiểu trong [bài viết](https://viblo.asia/p/tim-hieu-co-ban-ve-docker-qua-vi-du-YWOZr6REZQ0) trước, là một file text, viết với định dạng YAML (Ain’t Markup Language, đọc nhanh định dạng Định dạng YML) là cấu hình để tử đó lệnh docker compose sinh ra và quản lý các service (container), các network, các ổ đĩa ... cho một ứng dụng hoàn chỉnh.
Đầu tiên, bạn phải cài đặt thêm docker-compose, để cài đặt các bạn có thể tham khảo [cách cài đặt docker compose](https://docs.docker.com/compose/install/).<br>
Sau khi cài đặt thành công bạn có thể kiểm tra: 
```
~# docker-compose -v
docker-compose version 1.24.1, build 4667896b
```
Đến đây, sau khi đã hoàn tất việc cài đặt bạn tạo ra file `docker-compose.yml` ở ngay trong thư mục gốc của project. Hãy cùng xem qua file `docker-compose.yml` sau đó mình sẽ giải thích chi tiết nội dung trong file.
```
version: "3"

networks:
  my_network:
    driver: bridge
services:
  my_database:
    container_name: my_database
    image: "mysql:5.7"
    networks:
      - my_network
    restart: always
    ports:
      - 3306:3306
    volumes:
      - ./database:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=my_database
      - MYSQL_USER=my_user
      - MYSQL_PASSWORD=password
  my_app:
    build:
      context: ./my_app
    networks:
      - my_network
    container_name: my_app
    restart: always
    ports:
      - 8080:8080
    depends_on:
      - my_database
    links:
      - my_database
```
**Giải thích:**
* `version`: chọn viết theo phiên bản 3 docs.docker.com/compose/compose-file/
* `services`: Các dịch vụ, container nằm trong services
* `networks`: define một network dùng chung cho các container. Network này có tên là `my_network` sử dụng driver `bridge`
* `my_database`: Dịch vụ đầu tiên có tên là `my_database`, được build từ image `mysql:5.7`, sử dụng mạng `my_network` đã định nghĩa ở trên
* `restart: always`: luôn khởi động lại khi xảy ra lỗi hặc bị stop.
* `ports`: mapping port 3306 trong container với port 3306 ở máy local. (chú ý port đằng trước là port chỉ định máy local, port sau là port trong container)
* `volumes`: mount dữ liệu ra ngoài máy local: mapping thư mục `./database` trên máy local với thư mục `/var/lib/mysql` trong database. Sở dĩ phải mapping như vậy để tránh việc mất dữ liệu khi chúng ta chạy lại docker-compose. Vì khi chạy lại docker-compose thì nó cũng tạo ra 1 container mysql mới, chúng ta lưu trữ dữ liệu trong container ra ngoài máy local để khi start lại, container mới tạo ra vẫn ánh xạ đến thư mục naỳ trên máy local và sử dụng dữ liệu cũ một cách bình thường.
* `environment`: Các biến môi trường setting mặc định trong container.
* `my_app`: Define service thứ 2, là service chứa ứng dụng web app của project.
* `build: context: ./my_app` build service bằng file `Dockerfile` trong thư mục my_app
* `depends_on`, `link`: Thiết lập container `my_app` phụ thuộc vào container `my_database` (khởi động sau khi container `my_database` start thành công) đồng thời link đến container đó.
* Các thông số còn lại tương tự như service `my_database`.
Đến đây chúng ta coi như đã hoàn thành xong việc cấu hình docker-compose và các service của nó. Để run docker-compose bạn sử dụng lệnh `docker-compose up` để run file `docker-compose.yml`  bằng docker compose. Bạn cũng có thể chỉ định docker-compose file để run bằng cách thêm vào `-f <file_name>.yml` trong trường hợp bạn muốn đặt tên file khác tên `docker-compose.yml`. Còn không docker compose sẽ tự động run file `docker-compose.yml`. Sau khi run thành công, chúng ta sẽ có 2 container `my_database` và `my_app` được khởi tạo ra running. Do đã chỉ định port mapping với máy local nên chúng ta có thể dễ  dàng truy cập container `my_database` thông qua `localhost:3306` và container `my_app` thông qua `localhost:8080`.<br>
Để stop các dịch vụ trên, bạn sử dụng lệnh `docker-compose down`. Lệnh này cho phép stop và remove các container được tạo bởi docker-compose.
### Kết luận
Bài viết trên mình đã trình bày về network, cách các container giao tiếp với nhau trong docker và cách sử dụng docker compose để xây dựng, triển khai các lệnh dịch vụ trên docker. Hy vọng bài viết đem lại kiến thức và giúp ích cho các bạn trong học tập và công việc. Mình xin cảm ơn các bạn đã theo dõi.