# Xin chào các mọi người. Và đây sẽ là phần 3 nối tiếp trong series về Docker của mình, sẽ nói về Docker Network
## I. Docker network là gì?
Doker network được hiểu là mạng sử dụng cho các container có thể kết nối và giao tiếp với nhau. Mỗi container là một vùng chưa riêng biệt cho nên mỗi container cũng sẽ có mạng, port, IP riêng để phân biệt các container với nhau.

Docker cung cấp sẵn một số mạng mặc định cho các container, những mạng có sẵn này hoàn toàn được tách riêng với mạng Internet của host. Bạn có thể gom một nhóm container mong muốn vào một mạng chung với nhau. Ngoài ra cũng có thể tự tạo một mạng riêng với các cấu hình mong muốn theo ý người dùng.

Docker có thể kiểm soát sự liên kết giữa container này với container khác bằng cách sử dụng phương thức expose và link container. Để expose port cần xác định port bên trong và port bên ngoài container. Số lượng port có thể sử dụng trên một container là không giới hạn.

### 1.1. Các loại network trong Docker
**Bridge network**
* Mạng Bridge cho phép kết nối giữa các container cùng mạng và sử dụng một dải ip được cấp ngẫu nhiên hoặc tự thiết lập. Mạng Bridge đáp ứng hầu hết các usecase nếu triển khai các container trên cùng một host. Nhưng nếu bạn đang chạy một môi trường đa host được thiết kế cho HA, bạn cần có khả năng định tuyến lưu lượng liên tục giữa các vùng chứa trên các host khác nhau. Mạng Bridge sẽ không làm được điều này, đây sẽ là nhược điểm của mạng Bridge.
* Driver của mạng Bridge là bridge.

**Host network**
* Host network cho phép mạng container kết nối với  host. Và sử dụng IP có cùng dải mạng với host.
* Driver của mạng Host là host.

**None network**
* Tắt tất cả kết nối mạng.
* Driver của mạng None là null.

**Overlay network**
* Nhược điểm của mạng Bridge được Overlay network và Macvlan khắc phục.
* Overlay network thực hiện kết nối nhiều Docker daemon với nhau để tạo một mạng ảo trên các máy chủ. Nơi có thể thiết lập kêt nối giữa swarm service và container độc lặp hoặc hai container trên các host khác nhau.
* Driver của mạng Overlay là overlay.

**Macvlan netwrok**
* Mạng Macvlan cho phép bạn gán địa chỉ MAC cho một container, biến container như một thiết bị vật lý trên mạng.
* Driver của mạng Macvlan là macvlan.

Phạm vi hoạt động của mạng hay scope có 3 loại là local, global và swarm. Mạng mặc định có phạm vi là local và sẽ không thể định tuyến trực tiếp lưu lượng truy cập giữa các container chạy trên các host khác nhau. Swarm manager không hỗ trợ phạm vi mạng local và global.

Bạn có thể kiểm tra trạng thái mạng\
`docker network ls`                                                                                                                           
![image.png](https://images.viblo.asia/35dc0b72-e2c3-4e3f-8247-f48520513898.png)

### 1.2. Port container
Container như một ngôi nhà và port container chính là cổng của một ngôi nhà. Mọi thứ đi ra đi vào ngôi nhà thì đều đi qua cổng. Một ngôi nhà thì cũng có thể có nhiều cổng: cổng chính, cổng chính 1, cổng chính 2, cổng phụ 1, cổng phụ 2, ...

**Tạo container với port xác định trước**\
Các container giao tiếp với nhau qua các port. Vì vậy ngay từ thời điểm ban đầu cần xác định và quy hoạch trước các port sẽ gắn cho các container để đảm bảo đưa vào sử dụng dễ dàng và không bị trùng.\
`docker run -ti --rm -p 111:222 --name server ubuntu:latest bash`\
`docker port server`
![image.png](https://images.viblo.asia/aa304b70-e45d-4095-af4d-38afe14354e1.png)   
Lệnh sử dụng cờ *-p or --publish* để mở port bên trong container 111 và ánh xạ ra bên ngoài dưới cổng 222. Và đây tôi thêm cờ *--rm* để có thể xóa container này sau khi exit.
> Lưu ý: Đối với lệnh **docker port server** thì port sẽ được hiểu tử phải qua trái. Nghĩa là serer lắng nghe trên port 111 và mapping sang port 222 khi có dữ liệu.

Docker có lệnh hỗ trợ tìm port kết nối để tránh conflict bằng cách cố định port bên trong và bên ngoài sẽ lựa chọn port  ngẫu nhiên.\
`docker run -ti --rm -p 111 --name server ubuntu:latest bash`\
`docker port server`
![image.png](https://images.viblo.asia/aa16c39e-c42a-4826-8279-7306867531b9.png)\
Docker cho phép nhiều container chạy các chương trình hoặc dịch vụ với một cổng cố định.

Có hai giao thức vận chuyển qua port là TCP và UDP. Một dịch vụ có thể sử dụng một trong hai giao thức TCP/UDP để kết nối.\
`docker run -ti --rm -p 111:222/udp --name server ubuntu:latest bash`
![image.png](https://images.viblo.asia/0db59e5b-b2c4-41e9-be52-c45aa4164a56.png)   
Lệnh thêm giao thức kết nối vào sau số port. Giá trị mặc định sẽ là TCP.

**Cơ chế quản lý port trong Docker**
* Docker cung cấp 2 giải pháp quản lý port là Expose port và Mapping port.
* Expose port được xử lý trong Dockerfile với từ khóa **EXPOSE 80**. Điều này cho biết rằng container triển khai sẽ lắng nghe qua port 80. Nếu muốn sử dụng nhiều cổng bạn hoàn toàn có thể liệt kê các EXPOSE trong Dockerfile.
* Mapping port với cờ *-p or publish* sẽ thực hiện ánh xạ từ một port này sang một port khác.
* Từ đó sinh ra các usecase khác nhau:

    1. **Không sử dụng Expose hay -p** thì dịch vụ bên trong container chỉ có thể kết nối từ chính bên trong container đó.
    2. **Chỉ sử dụng Expose** thì dịch vụ không thể kết nối từ bên ngoài Docker, nhưng có thể kết nối từ các container trong docker khác.
    3. **Sử dụng cả -p và Expose** thì dịch vụ có thể kết nối từ bất kỳ đâu, ngay cả ngoài Docker. Nếu chỉ sử dụng -p, nhưng không Expose, Docker không thể tự ngầm hiểu Expose. Điều này là do nếu một port mở cho một container, nó cũng tự động mở cho các container khác. Do đó -p vẫn phải dùng Expose. Đó là lý do tại sao không có usercase thứ tư.
### 1.3. IP container
Mỗi container sẽ có một IP động riêng theo mạng của nó.\
Để nhận nhiều connect vào 1 host, cần chỉnh bind address thành 0.0.0.0. Đây cũng là giá trị mặc định khi triển khai một container.
Từ đó có thể giới hạn quyền truy cập bằng cách chỉ định IP có thể truy cập vào dịch vụ.\
`docker run -p 10.10.0.10:111:222/tcp`
## II. Kết nối các container
Khi triển khai một hệ thống, mỗi ứng dụng chúng ta sẽ chạy trên một container khác nhau. Vậy làm thế nào để các container có thể kết nối với nhau để chạy cùng nhau. Zú vị như việc bạn triển khai web trên một container và DB trên một container khác thì làm như thế nào để website chạy bằng 2 container kia. Lời giải sẽ có ở ngay phía dưới đây, tiếp tục đọc bạn nhé.
### 2.1. Kết nối các container cùng network
**Kết nối thông qua host**

Đây là cách kết nối các container với nhau thông qua ip của card mạng docker0 trên host khi cài đặt docker sẽ sinh ra card mạng này.     
![image.png](https://images.viblo.asia/0a456c5d-a927-4074-95b7-163ae40f4b26.png)

Container server sẽ cấu hình để lắng nghe trên cổng 111\
`docker run -ti --rm -p 111:222 --name server ubuntu:latest bash`\
`nc -l 111`

Container client sẽ cấu hình\
`docker run -ti --rm --name client ubuntu:latest bash`\
`nc 172.17.0.1 111`

**Kết nối trực tiếp giữa các container**

Loại kết nối này dùng để kiểm tra là chính. Vì khi container client kết nối container server thì chỉ phía container client biết trạng thái có đang kết nối hay là ngắt kết nối, container server hoàn toàn không biết trạng thái kết nối từ client. Nên có thể gọi là kết nối 1 chiều.

Container server sẽ cấu hình\
`docker run -ti --rm --name server ubuntu:latest bash`

Container client sẽ cấu hình\
`docker run -ti --rm --link server --name client ubuntu:latest bash`\
Câu lệnh sử dụng cờ *--link* để thực hiện kết nối trực tiếp tới container có name là server

Hệ thống sẽ tự động gán hostname cho ip container khi chạy. Khi ip thay đổi kết nối sẽ bị đứt. Đây cũng là nhược điểm lớn khi liên kết trực tiếp giữa các container.

**Kết nối động**

Cách kết nối này khắc phục được các nhược điểm của kết nối thông qua host và kết nối trực tiếp. Kết nối động tạo ra một mạng network riêng với cấu hình mạng riêng để đáp ứng cho các dịch vụ khác nhau. Cần phải thực hiện tạo network trước khi triển khai container chạy trên mạng đó.
Đây cũng là loại kết nối hay được sử dụng nhất khi kết nối các container.

Container server sẽ cấu hình\
`docker network create network_connect`\
`docker run -ti --rm --name server --network=network_connect ubuntu:latest bash`\
Câu lệnh sử dụng cờ *--network* để thực hiện thêm container server vào mạng network_connect.

Container client sẽ cấu hình\
`docker run -ti --rm --link server --network=network_connect  --name client ubuntu:latest bash`\
`docker network inspect network_connect`
![image.png](https://images.viblo.asia/c950783d-5de2-4bcb-a823-660df8452591.png)

Với một thiết lập cấu hình đầy đủ cho network có thêm thêm các tham số khác như\
`docker network create --driver bridge --label project=docker --scope local --subnet 10.20.0.0/24 --ip-range 10.20.0.128/24 network_connect`
### 2.2. Kết nối giữa hai network khác nhau
Tạo 2 network riêng vào thêm các container vào các mạng đó.

Mạng 1:\
`docker network create --driver bridge --label project=docker --scope local --subnet 10.10.0.0/24 --ip-range 10.10.0.128/24 network_01`\
`docker run -ti --rm --network=network_01 --name box01 busybox sh`\
`docker run -ti --rm --network=network_01 --name box02 busybox sh`

Mạng 2:\
`docker network create --driver bridge --label project=docker --scope local --subnet 10.20.0.0/24 --ip-range 10.20.0.128/24 network_02`\
`docker run -ti --rm --network=network_02 --name box03 busybox sh`\
`docker run -ti --rm --network=network_02 --name box04 busybox sh`

Output mong muốn là có thể kết nối chỉ box03 với box01 và box02 cũng như các box khác có trong mạng 1. Mà box04 vẫn không kết nối được  với box01 và box02 cũng như các box khác có trong mạng 1.\
`docker network connect network_01 box03`
## III. Kết nối internet cho các container
Thông thường khi mới cài đặt docker trên máy tính của các bạn. Bạn run một container lên và ping 8.8.8.8 sẽ không thể thông internet. 
```
pkill docker
iptables -t nat -F
ifconfig docker0 down
brctl delbr docker0
service docker restart
```
Run lại container và ping lại tới 8.8.8.8\
Enjoy cái moment này thôi.

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***