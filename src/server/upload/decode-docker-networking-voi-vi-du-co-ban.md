![](https://images.viblo.asia/83689115-fb3a-45ec-859b-f13342cf14a7.png)

Như đã nói ở **[phần 1](https://viblo.asia/p/docker-la-gi-kien-thuc-co-ban-ve-docker-maGK7qeelj2)** việc container bao bọc application với filesystem hoàn chỉnh chứa mọi thứ cần cho việc run: code, runtime, system tools, system libraries, bất cứ thứ gì có thể được cài đặt trên server.

Điều này sẽ đảm bảo việc application luôn chạy như nhau trên mọi môi trường khác nhau. Các container này sẽ được tách biệt với nhau và tách biệt với cơ sở hạ tầng bên dưới. Đồng thời được cung cấp thêm một lớp bảo vệ cho application.

Vậy làm thế nào các container này có thể kết nối được với nhau trên cùng một host hoặc nhiều host ? Đó chính là việc sử dụng Networking trong Docker.

**Mô hình Container Networking**

![](https://images.viblo.asia/95843207-3f84-4625-a551-59f8575cb9c9.jpeg)

**Sandbox**: chứa các config của một container network stack. Điều này bao gồm việc quản lý container interface, bảng định tuyến (routing table) và cài đặt DNS. Việc triển khai Sandbox có thể trên không gian mạng Linux, một FreeBSD Jail,… Sandbox có thể có nhiều endpoint vào từ nhiều network.

**Endpoint**: kết nối giữa Sandbox với network

**Network**: là tập hợp các endpoint và chúng được kết nối với nhau. implement của network có thể là Linux bridge, VLAN,…

![](https://images.viblo.asia/6d21f22c-a054-4b95-9d18-70eb10db1982.png)

Container Network Model (CNM) cung cấp cho ta hai kiểu interface để có thể nối và mở nhằm thêm chức năng, hiển thị hoặc kiểm soát network.

**1. Network Drivers**: Docker Network Drivers cung cấp implement giúp cho network hoạt động. Nhiều Network Drivers có thể được sử dụng đồng thời trên Docker Engine hoặc Cluster cụ thể. Nhưng chỉ có thể khởi tạo thông qua một Network Drivers duy nhất. Và chúng được chia làm hai loại :
* **Native Drivers**: là phần native của Docker Engine và được cung cấp bởi Docker.

* **Remote Drivers**: được tạo bởi cộng đồng và các nhà cung cấp khác. Drivers này có thể được sử dụng để cung cấp tích hợp với phần mềm và phần cứng đương nhiệm. Người dùng cũng có thể tạo drivers riêng trong trường hợp họ muốn chức năng cụ thể mà drivers hiện tại không hỗ trợ.

**2. IPAM Drivers**: là drivers quản lý địa chỉ IP gốc cung cấp subnet hoặc địa chỉ IP mặc định cho network và endpoint. Địa chỉ IP cũng có thể được gán thủ công thông qua các lệnh tạo network, container và service. IPAM Drivers cũng tồn tại và cung cấp tích hợp cho các công cụ IPAM hiện có.

**Các kiểu Native Driver của Docker Networking**

![](https://images.viblo.asia/372d7845-fe14-4d7a-b312-1dc094aecc23.png)

* **bridge**: Các bridge driver tạo một Linux bridge trên host và được quản lý bởi Docker. Theo mặc định các container trên một bridge có thể giao tiếp với nhau. Truy cập bên ngoài vào container cũng có thể được cấu hình thông qua bridge driver. Người dùng có thể tự định nghĩa trong lúc tạo ra networking. Ngược lại sẽ mặc định là **docker0**
* **host**: một container sử dụng network stack của host và không có sự phân tách namespace. Các container có thể sử dụng tất cả các interface trên host.
* **none**: none driver cung cấp cho một container networking stack và không gian mạng riêng của nó nhưng không config các interface bên trong container. Không có config bổ sung, các container hoàn toàn cách ly với networking stack của host.
* **overlay**: Tạo một overlay network hỗ trợ các mạng nhiều máy chủ(host). Sử dụng kết hợp các Linux bridge local và VXLAN để overlay các giao tiếp giữa container sang container trên cơ sở hạ tầng mạng vật lý (physical network infrastructure).

Để xem danh sách networking này ta dùng lệnh:
```
$ docker network ls
```

![](https://images.viblo.asia/0c33b95e-5b65-40c6-9ba3-5d6586598936.png)

Lúc này overlay đã được show ra cùng với đó Docker tạo ra thêm cho chúng ta thằng docker_gwbridge. Vậy Docker swarm là gì ? Nó hoạt động ra sao thì trong phạm vi bài viết này tạm thời mình không đề cập đến.

Bây giờ ta thử inspect network bridge và docker-compose-demo_default xem trong đó có những thông tin gì nhé !
```
$ docker inspect bridge
```

![](https://images.viblo.asia/423532d9-48ae-4a23-a06c-6400f755092f.png)

```
$ docker inspect docker-compose-demo_default
```

![](https://images.viblo.asia/867a15c3-a6d3-4574-9db8-eddd040546e6.png)

Dễ thấy rằng trong docker-compose-demo_default có chứa thêm thông tin về hai container mà ta đã build và run bằng docker-compose ở **[phần 2](https://viblo.asia/p/docker-compose-la-gi-kien-thuc-co-ban-ve-docker-compose-1VgZv8d75Aw)** .

Tiến hành ping tới IP container trên xem thế nào nhé ?

![](https://images.viblo.asia/ec65213e-b4a6-487e-9256-7be84ed7792a.png)

Điều gì đã xảy ra ở đây. Tại sao lại không ping được tới container thế :)). Phải chăng container ta đã bị tắt ? Kiểm tra list container xem nào @@

![](https://images.viblo.asia/2d90822c-5a00-4851-be3a-3f635a9b1eb7.png)

Rõ ràng là vẫn đang hoạt động mà sao không ping tới được nhỉ ? :)). Thì xin trả lời bạn là bản **Docker Desktop for Mac** không thể mở luồng định tuyến đến container được. Và cũng sẽ không thấy được **docker0** như đã nói ở trên vì host interface chỉ thực sự nằm trong máy ảo (VM).

Để tạo một network ta dùng lệnh sau:
```
$ docker network create <tên network>
```

Hoặc có thể config driver và subnet như sau:
```
$ docker network create -d <tên driver> --subnet <chuỗi subnet> <tên network>
```

VD:
```
$ docker network create -d bridge --subnet 127.21.0.0/16 my-net
```

Ví dụ ở đây ta sẽ tạo một network có tên là my-net

Sau khi tạo xong Docker sẽ nhả về cho ta id của network đó. Và bridge driver sẽ là mặc định.

![](https://images.viblo.asia/5684422b-2704-4753-a211-2dafcafe9349.png)

![](https://images.viblo.asia/5ad7e333-516d-4cfe-a0a6-e1999458471b.png)

Bây giờ ta thử connect network my-net mà ta vừa tạo ra cho container bằng lệnh sau:
```
$ docker network connect <tên network> <ID || name container>
```

Ở đây :

<tên network> = my-net

<ID || name container> = 87656295f470 || docker-compose-demo_servergo_1

Chúng ta có thể kết nối động các container tới một hoặc nhiều networks. Các networks có thể cùng giống hoặc khác network drivers.

**Kết quả:**
![](https://images.viblo.asia/9a1907b2-9b0e-4165-ac0a-7f1c0073292c.png)

Tiếp theo cùng xem điều gì sẽ xảy ra khi ta disconnect một container docker-compose-demo_servergo_1 trong network demo-compose-demo_default do Docker Engine đã tạo ra cho chúng ta. Liệu rằng khi một container bị disconnect chúng có còn giao tiếp với nhau được nữa hay không nhé ? :))

Để disconnect tới container từ một network ta dùng lệnh sau:
```
$ docker network disconnect <tên network> <ID || name container>
```

**Ở đây:**
<tên network> = docker-compose-demo_default

<ID || name container> = 87656295f470 || docker-compose-demo_servergo_1

**Kết quả:** chỉ còn lại một container docker_compose_demo_webreactjs_1
![](https://images.viblo.asia/88c15178-094d-4a30-af91-e3330cf2ef42.png)

Chạy lại demo ở **[phần 2](https://viblo.asia/p/docker-compose-la-gi-kien-thuc-co-ban-ve-docker-compose-1VgZv8d75Aw)**  bạn sẽ thấy điều bất ngờ :D
![](https://images.viblo.asia/64613ca7-57ce-4c6f-af1e-409dd53426bf.png)

Wow chúng vẫn hoạt động và giao tiếp với nhau như chưa hề có cuộc chia ly :)). Vậy phải chăng toàn bộ những điều nãy giờ bạn đọc trong bài viết này là vô ích. Câu trả lời là không vô ích chút nào cả, nó vô cùng hữu ích cho bạn đấy chỉ là bạn không để ý một chút thôi tại ở trên ta có tạo thêm network my-net và connect my-net với container docker-compose-demo_servergo_1 và hai network my-net và docker-compose-demo_default cùng thuộc bridge driver nên chúng hoàn toàn có thể giao tiếp được với nhau.

Chứng minh:
```
$ docker network disconnect my-net docker-compose-demo_servergo_1
```

![](https://images.viblo.asia/401210bc-5ac5-4778-9eab-686459d5892e.png)

Lúc này hiển nhiên đã xảy ra cuộc chia ly nhau mà ta mong muốn rồi đó :)).

Trong phần 2 về Docker compose ( cho bạn nào muốn tìm hiểu về Docker compose) ta đã run hai container và Docker đã mặc định tạo cho ta network docker-compose-demo_default nhưng giờ đây ta có thể tự config network riêng của chúng ta rồi ! OK vào vấn đề thôi nào.

Chỉnh sửa một chút trong **docker-compose.yml**:
```
version: '2.1'

services:
  webreactjs:
    image: 6fb2a1a097d0
    build: .
    ports:
      - 3000:3000
    restart: always
    networks:
      - my-net
  servergo:
    image: 49e3ba993dd2
    build: .
    ports:
      - 8080:8080
    restart: always
    networks:
      - my-net
networks: 
  my-net:
    driver: bridge
```

Trong file ta thiết lập network có tên là my-net thuộc driver bridge.

Run lại lệnh sau:
```
$ docker-compose up
```

Kiểm tra danh sách network

![](https://images.viblo.asia/a225803f-280b-46df-b49b-12e652263071.png)

![](https://images.viblo.asia/3163d869-abe7-472d-972e-520657506c1b.png)

Ta thấy Docker Engine đã tạo cho ta một network mới có tên docker-compose-demo_my-net thuộc driver bridge như ta đã config. Nếu bạn sử dụng docker-compose version ≥ 3.5 thì bạn có thể custome lại name của network cho ngắn hơn, đẹp hơn thông qua trường name: <tên muốn đặt> ( phía trên trường driver).

Ngoài ra bạn cũng có thể config connect tới một network có sẵn chỉ cần thêm trường `external: true` ( ngay dưới trường driver). Ví dụ ở đây network my-net là một network có sẵn (do ta đã tạo trước đó). Chú ý phải thực sự có tồn tại network đó nhé nếu không Docker sẽ báo lỗi.

Xoá một network :
```
$ docker network rm <tên network>
```

**Lưu ý**: Bạn không thể xoá một network trong khi network đó đang active endpoint ( tức là đang còn attach một hoặc nhiều container ở trạng thái Up).

Xoá tất cả network không còn được sử dụng:
```
$ docker network prume
```

**Bonus**: Đôi khi bạn sẽ gặp trường hợp bạn muốn xoá một network nhưng network này có endpoints đang active nên Docker báo lỗi và bạn sẽ đi stop các container đang connect với network này. Sau đó bạn xoá thành công network không có vấn đề gì cả. Nhưng điều bất ngờ là khi bạn lại muốn start lại những container đó để làm điều gì đó thì giông tố ập tới ( Docker báo lỗi) như hình dưới:

![](https://images.viblo.asia/22d2080d-23c3-42d7-bd2a-e7d001c56868.png)

Đừng lo cách giải quyết vô cùng đơn giản. Mặc dù bạn không thấy network bạn vừa xoá trong list network nhưng bạn vẫn có thể disconnect tới container đã bị stop. Và sau đó bạn chỉ cần start lại container vừa stop như ở phần 1 . Lúc đó thì sau cơn mưa trời lại sáng ngay thôi !

Nếu bạn muốn xem được những bài viết chất lượng, hay thảo luận những kiến thức, chia sẻ hiểu biết của bạn đến mọi người, hãy tham gia group của bọn mình trên [Facebook](https://www.facebook.com/groups/2753546238005745/) nhé: ^^