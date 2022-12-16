![](https://images.viblo.asia/20fa5474-4e44-469e-ba8e-5f14c6cd0aaf.jpeg)


### Tại sao cần Docker Swarm ?

Trong quá trình phát triển, quản lý, scale cũng như deploy project của bạn với việc dùng lệnh của Docker để deploy thì ban đầu project nhỏ chỉ cần chạy một host(vps) nên không có vấn đề gì cả. Tuy nhiên khi project đó vì một số yêu cầu hoặc lý do gì đó phải cần thêm nhiều host hoặc rất nhiều host(vps). Lúc này bạn khó có thể quản lý, scale và cũng không thể nào dùng lệnh để đi deploy lên từng con host(vps) điều đó rất vật vã. Biết được nỗi lòng đó Docker đã phát triển thêm cho ta cái gọi là **Docker Swarm**.

### Docker Swarm là gì ?
Docker Swarm là công cụ native clustering cho Docker. Cho phép ta có thể gom một số Docker host lại với nhau thành dạng cụm (cluster) và ta có xem nó như một máy chủ Docker ảo (virtual Docker host) duy nhất. Và một Swarm là một cluster của một hoặc nhiều Docker Engine đang chạy. Và Swarm mode cung cấp cho ta các tính năng để quản lý và điều phối cluster.

### Tính năng Docker Swarm
* **Cluster management integrated with Docker Engine**: Quản lý cluster với Docker Engine bằng việc sử dụng Docker CLI để tạo swarm.
* **Decentralized design:** Docker Swarm được thiết kế dạng phân cấp. Thay vì xử lý sự khác biệt giữa các roles của node tại thời điểm triển khai, Docker Engine xử lý bất kỳ chuyên môn hoá nào khi runtime. Bạn có thể triển khai cả hai loại node: managers và worker bằng Docker Engine.
* **Declarative service model:** Docker Engine sử dụng phương thức khai báo để cho phép bạn define trạng thái mong muốn của các dịch vụ khác nhau trong stack ứng dụng của bạn. VD: Bạn có thể mô tả ứng dụng bao gồm: web front-end với service message queueing và database back-end.
* **Scaling:** Đối với mỗi service bạn có thể khai báo số lượng task mà bạn muốn run. Khi bạn scale up hoặc down thì swarm manager sẽ tự động thêm hoặc xoá task để duy trì trạng thái mong muốn.
* **Desired state reconciliation:** Hãy hình dung bạn thiết lập một service run 10 replicas của một container và một worker machine (host/vps) đang giữ 2 trong số 10 replicas đó gặp sự cố bị crash, lúc này swarm manager sẽ tiến hành tạo thêm 2 replicas mới để thay để cho 2 replicas đã bị crash đó và tiến hành chuyển 2 replicas mới này cho các worker đang run.
* **Multi-host networking:** Bạn có thể chỉ định một overlay network cho các services của mình. Swarm manager sẽ tự động gán địa chỉ IP cho các container trên overlay network khi nó khởi tạo và cập nhật application.
* **Service discovery:** Swarm manager node gán mỗi service trong swarm một DNS duy nhất và bạn có thể truy vấn được thông qua DNS này.
* **Load balancing**: Có thể expose các port cho các services tới load balance để giao tiếp với bên ngoài.
* **Secure by default:** Các service giao tiếp với nhau thông qua giao thức bảo mật TLS. Bạn có thể tuỳ chỉnh sử dụng chứng chỉ ký tự root hoặc chứng chỉ từ một custom root CA.
* **Rolling updates:** Swarm giúp bạn update image của service một cách hoàn toàn tự động. Swarm manager giúp bạn kiểm soát độ trễ giữa service deploy tới các node khác nhau và bạn có thể rolling back bất cứ lúc nào.

### Kiến trúc Swarm

![](https://images.viblo.asia/b4c24624-c19a-4706-a3ac-189ad61e7fe9.png)

Bao gồm các **Manager** và các **Worker**. Người dùng có thể khai báo trạng thái mong muốn của nhiều service để chạy trong Swarm sử dụng YAML files.

![](https://images.viblo.asia/86ed6879-df58-4c13-8802-3ef98a0e4295.png)

* **Swarm:** là một cluster của một hoặc nhiều Docker Engine đang run (cụ thể ở đây là các node) trong chế độ Swarm, thay vì phải chạy các container bằng câu lệnh thì ta sẽ thiết lập các services để phân bổ các bản replicas tới các node.
* **Node:** Một node là một máy vật lý hay máy ảo đang run phiên bản Docker Engine trong chế độ Swarm. Node sẽ gồm hai loại: **Manager Node** và **Worker Node**.
* **Manager Node:** Là node nhận các define service từ user, nó quản lý và điều phối các task đến các node Worker. Theo mặc định node Manager cũng được coi là node Worker.
* **Worker Node:** là node nhận và thực thi các task từ node Manager.
* **Service:** Một service xác định image của container và số lượng các replicas (bản sao) mong muốn khởi chạy trong swarm.
* **Task:** là một tác vụ mà node worker phải thực hiện. Tác vụ này sẽ do node Manager phân bổ xuống. Một task mang một Docker Container và các lệnh để chạy bên container.

### Làm việc với Docker Swarm
Trong phần này ta sẽ tiến hành thực hành với Docker Swarm thông qua demo nhỏ.
Đầu tiên ta cần 4 máy ảo (vps ảo) để tạo các máy ảo ta sử dụng câu lệnh sau:
```
$ docker-machine create <machine-name>
```

Trong đó:
* <machine-name>: tên máy ảo bạn muốn đặt.

Tạo machine(máy ảo) cho swarm manager:
```
$ docker-machine create manager
```
Tiếp đến là các machine cho swarm worker lần lượt là : worker1, worker2, worker3.
```
$ docker-machine create worker1
$ docker-machine create worker2
$ docker-machine create worker3
```
Sau khi tạo xong ta kiểm tra list machine:
```
$ docker-machine ls
```
 ![](https://images.viblo.asia/fa4b4570-5c2c-4283-b3f1-f5ac6acf6dd1.png)

 Bây giờ ta sử dụng lệnh inspect thử xem thông tin của một machine
```
 $ docker-machine inspect manager
```
![](https://images.viblo.asia/d761b258-4116-4cab-83d7-687a406a1997.png)

  Dễ thấy một số thông tin cơ bản về machine như: địa chỉ IP, MachineName (tên do ta đặt), SSHKey để có thể truy cập vào machine thông qua SSHKey này, thông tin về CPU ( 1 CPU), Memory ( 1GB), ….
    
Việc setup các machine đã hoàn tất giờ ta tiến hành khởi tạo swarm trên con manager nhé và để truy cập vào con manager hay các con worker thì ta sử dụng thông qua SSH cụ thể như sau:
```
$ docker-machine ssh <name-machine>
```
 
Ở đây:    
* <name-machine> = manager

Và để quay lại host local:
```
$ exit
```
    
 **Khởi tạo swarm**
```
$ docker swarm init --advertise-addr <IP Machine>
```
    
 Nếu bạn đang sử dụng **Docker Desktop for Mac** hoặc **Docker Desktop for Windows** thì chỉ cần **docker swarm init** . Nhưng ở đây **Operating System** là **Boot2Docker** nên buộc phải có flag **--advertise-addr.**
    
  ![](https://images.viblo.asia/38340652-d2b2-4f5d-a854-551769c1ec02.png)

Kiểm tra list node hiện đang có trong swarm
```
$ docker node ls
```
 ![](https://images.viblo.asia/93e5484c-a8a9-4938-937d-3f50acf9ddfa.png)

 Những node (machine/vps) là manager thì mới có xem list này và dấu * cho biết bạn đang ở node manager nào trong swarm. Ở đây ta chỉ có một node manager và node này đang ở status **Ready**. OK ! vậy là xong nhiệm vụ ở con manager.
    
Giờ ta chuyển qua làm việc trên con **worker1** nhé. Tại worker1 ta tiến hành join nó vào swarm như một worker:
```
$ docker swarm join --token <token> <host>:<port>
```
 Trong đó:
* host: Địa chỉ ip của con manager.
* port: Cổng port của con manager.

Để lấy thông tin về token thì trên con manager của swarm đó ta sử dụng lệnh
```
$ docker swarm join-token <worker|manager>
```
 ![](https://images.viblo.asia/692ad857-66cd-4ff9-b425-6f2117e012b9.png)

Trên hai con **worker2** và **worker3** ta cũng làm tương tự
    
Lưu ý: một node worker chỉ có thể join vào một swarm.
    
Trên node manager ta kiểm tra lại list node
    ![](https://images.viblo.asia/5e7718fc-6f6c-45e6-b22f-c3e66850aef1.png)
Dễ thấy 3 node worker kia có chung 1 status là rỗng tại cột **MANAGER STATUS**. Điều này cho ta biết chúng là node worker.
    
Vậy là ta đã tạo thành công 3 con worker và 1 con manager và gom chúng thành một swarm (cluster).
    
Một câu hỏi được đặt ra ở đây là tại sao ở đây ta không tận dụng cái swarm mà ta đã tạo ra ở [**Phần 3**](https://viblo.asia/p/decode-docker-networking-voi-vi-du-co-ban-ByEZkxkYlQ0) tại máy host local (**Docker Desktop for Mac**) và coi nó như một node manager để join các node khác vào swarm này mà lại tạo ra thêm một machine để làm node manager chi cho phí tài nguyên như thế ? Thì câu trả lời nằm ở [**Phần 3**](https://viblo.asia/p/decode-docker-networking-voi-vi-du-co-ban-ByEZkxkYlQ0) (đã có nói rất rõ) trên phiên bản **Docker Desktop for Mac** không thể mở luồng định tuyến tới các machine nên việc ta cố gắng join các node (machine/vps) vào swarm với manager swarm là host local là vô tác dụng. Đây cũng chính là điểm yếu khi triển khai networking trên OSX.
    
Bây giờ ta tiếp tục tạo ra service và các replicas cũng như deploy trên node manager.
    
Để làm được điều này ta cần config file docker-compose.yml:
```
version: '3'

services:
  webreactjs:
    image: quanphamptit/docker-swarm-demo:webreactjs_1
    build: .
    ports:
      - 3000:3000
    restart: always
    networks:
      - my-net
    deploy: 
      mode: replicated
      replicas: 3
  servergo:
    image: quanphamptit/docker-swarm-demo:servergo_1
    build: .
    ports:
      - 8080:8080
    restart: always
    networks:
      - my-net
    deploy: 
      mode: replicated
      replicas: 3
networks: 
  my-net:
    driver: overlay
```

và copy file docker-compose.yml mà ta đã config qua bên con manager:
```
$ docker-machine scp filesource name-machine:/path-docker-machine/
```
 Trong demo này:
```
$ docker-machine scp ~/Workspace/gocode/docker-swarm-demo/docker-compose.yml manager:/home/docker/docker-compose.yml
```
Tiếp theo ta cần push 2 image mà ở [**Phần 2**](https://viblo.asia/p/docker-compose-la-gi-kien-thuc-co-ban-ve-docker-compose-1VgZv8d75Aw) ta đã sử dụng lên repository trên hub.docker nhé:
```
$ docker tag <image> <username>/<repository-name>:<tag-name>
$ docker push <username>/<repository-name>
```
 Trong đó:
    
* <image> : Id image bạn muốn push
* <username>: là username trên hub.docker của bạn.
* <repository-name>: tên repository bạn muốn đặt.
* <tag-name>: tên tag bạn muốn đặt cho image được push lên đó.

    ![](https://images.viblo.asia/88cb9ac6-a2be-4647-8a4f-cb93ab5a1579.png)

Trên Docker Hub
![](https://images.viblo.asia/c9110205-0663-4286-b97e-4e948fbcec1d.png)

Vậy là ta đã push thành công 2 image và giờ ta cần deploy stack :
```
$ docker stack deploy -c /home/docker/docker-compose.yml swarm-demo-app
```
Kiểm tra list services:
![](https://images.viblo.asia/cb24f33d-d3d2-4d4c-8eb9-0752ad907f91.png)

 Ta thử xem các bản replicas này đang chạy trên những node nào nhé:
![](https://images.viblo.asia/84ca0943-8f5e-46d7-851f-a8f9c5b83069.png)

Ngoài ra bạn có thể tạo service dùng lệnh với cú pháp như sau:
```
$ docker service create --replicas <task-number> --name <service-name> <ID-Image> <command>
```
Trong đó:
    
* <task-number>: số task bạn muốn tạo ra ( hay nói cách khác là số bản sao của image/container).
* <service-name>: tên service bạn muốn đặt.
* <ID-Image>: ID của image/container.
* <command>: lệnh muốn chạy.

Và ta có thể thay đổi số container của cluster một cách nhanh chóng bằng câu lệnh sau:
```
$ docker service scale <service-name>=<number>
```
Trong đó :
* <service-name>: tên service mà ta muốn đổi số container.
* <number>: Số container mong muốn.

Tiếp theo ta sẽ xem thử liệu tính năng load balancing hoạt động thế nào nhé ?
    
Ta thấy trên con node **worker3** không có giữ replicas của service **servergo_1** nào cả. Ta tiến hành gửi request thử tới service **servergo_1** trên con **worker3** này xem sao nhé !
```
$ curl http://192.168.99.103:8080/api/v1/foods?id=2
```
![](https://images.viblo.asia/cbacf22d-e274-4d0f-bc09-27c0b1158869.png)

Điều này có nghĩa là khi ta gửi các request đến các node trong swarm. Các node này có thể chứa một hoặc nhiều replicas của các service hoặc không hề chứa cái replicas nào cả thì Routing mesh của swarm sẽ chuyển tiếp các request đó đi qua ingress network tới Swarm Load Balancer, bộ balancer này sẽ phân bổ request tới các container của các service ở các machine( host/vps của manager và worker) cùng chung một mạng swarm. Bạn có thể xem hình sau để hiểu rõ hơn:
![](https://images.viblo.asia/e92b90b2-d927-475a-81f0-21c75236c658.png)

Thử lại với các request khác:
![](https://images.viblo.asia/b1ab9930-844a-413f-885d-e28d5ea7cf1a.png)

Bây giờ ta thử shutdown con machine worker1 ( như trên thực tế khi 1 server bị die ) xem có điều mới lạ gì không nhé !
```
$ docker-machine stop <machine-name>
```
 Ở đây :
* <machine-name> = worker1

![](https://images.viblo.asia/e5661f82-16e9-4d90-9e07-4b38d64a3d52.png)

Kiểm tra lại list node và service trên node manager
![](https://images.viblo.asia/cdefd312-1e9b-48ac-b744-955c454c8b4b.png)
Chưa thấy gì mới lạ ngoài việc worker1 bị Down :D
    
Tiếp tục kiểm tra trên từng service
![](https://images.viblo.asia/bbc3ebf2-fad2-491f-a1ac-8047a469de87.png)

Tại đây ta đã thấy điều mới lạ đó. Khi worker1 bị **Shutdown** thì lúc này swarm manager sẽ tiến hành tạo thêm 1 replicas mới để thay để cho 1 replicas đã bị **Shutdown** đó và tiến hành chuyển 1 replicas mới này cho các worker đang run (cụ thể là worker3). Đây cũng chính là tính năng **Desired state reconciliation**, **Scaling** đã được nói rõ trong phần **Tính năng Docker Swarm**.
    
Vậy vấn đề nảy sinh ở đây khi toàn bộ node worker bị die thì điều gì sẽ xảy ra sau đó ?
    
Trong trường hợp này node manager cũng sẽ tiến hành thêm các replicas để đảm bảo đủ số replicas mà ta đã config (mong muốn) và chạy trên chính con manager này ( nghĩa là node manager sẽ đóng vai trò là node worker luôn). Và nếu con manager này die luôn thì mọi chuyện coi như chấm hết !!.
    
Trường hợp ngược lại nếu các node worker đang run nhưng con node manager bị die thì external storage sẽ ghi nhận điều đó và thông báo đến các manager node còn lại trong cluster. Và external storage sẽ chọn một node manager bất kỳ để làm Leader tiếp theo của cluster.
![](https://images.viblo.asia/6d9a02eb-9614-460b-a74e-febdbaa8c87a.png)
Hiện nay song hành với **Docker Swarm** ta còn có thêm một người bạn khác đó là **Kubernetes (K8S)**. Và nó được triển khai rộng rãi hơn Docker Swarm. Trong phần sau ta sẽ khám phá những điều thú vị về nó nhé !!
    
Nếu bạn muốn xem được những bài viết chất lượng, hay thảo luận những kiến thức, chia sẻ hiểu biết của bạn đến mọi người, hãy tham gia group của bọn mình trên [Facebook](https://www.facebook.com/groups/2753546238005745/) nhé: ^^