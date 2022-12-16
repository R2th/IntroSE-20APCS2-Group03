# Xin chào các mọi người. Đây sẽ là phần cuối cho series này rồi. Phần 7 - Docker Swarm.
Các nhà phát triển và vận hành ứng dụng thường xuyên triển khai các dịch vụ trên nhiều máy chủ để đạt được tính khả dụng và khả năng mở rộng cao hơn. Khi một ứng dụng được triển khai trên nhiều máy chủ, khả năng dự phòng trong việc triển khai ứng dụng sẽ cung cấp dung lượng có thể phục vụ các yêu cầu khi máy chủ bị lỗi hoặc bị xóa dịch vụ.

Docker swarm là một phần rất lớn nên trong một bài viết này chắc chẵn sẽ không thể cập nhật toàn bộ kiến thức được. Trong phần này mình sẽ giới thiệu những thứ cần thiết và cơ bản trước để mọi người có thể hình dung ra được Docker swarm là gì và có thể làm được những gì. Nhưng bài viết cũng sẽ khá dài nên mọi người cố gắng xem hết nha.

Khi tìm hiểu về Docker swarm bạn nên nắm được:
* Cách triển khai ứng dụng Docker hoạt động cùng các tùy chọn
* Triển khai một ứng dụng trên Docker Swarm
* Cách Docker Swarm quản lý trạng thái các woker
* Cách Docker Swarm đảm bảo tính sẵn sàng cao
* Định tuyến lưu lượng truy cập trên Network của Docker swarm
* Kiểm soát Volume cũng như tài nguyên các container sử dụng 
## I. Docker Swarm là gì
![1.drawio.png](https://images.viblo.asia/429d56bb-34a0-4e0d-93d9-d8dcedf39aa8.png)
Docker Swarm là một công nghệ phân cụm kết nối một tập hợp các máy chủ chạy Docker và cho phép bạn triển khai các ứng dụng trên các máy đó. Docker Swarm điều phối việc triển khai, vận hành các dịch vụ, lên lịch các tác vụ theo yêu cầu tài nguyên của ứng dụng cũng như khả năng mà máy chủ cung cấp.

Docker swarm do chính công ty Docker phát triển. Docker swarm thuộc Container Orchestration. Hiểu đơn giản docker swarm là một trong các tool quản lý và phân phối container. 

Swarm Clustering bao gồm Docker Engine và commandline tool. Bạn có thể bật chế độ Swarm và bắt đầu sử dụng Swarm mà không cần cài đặt thêm bất kỳ thành phần nào. 

Khi bạn tham gia Docker Engine vào một Swarm cluster, bạn chỉ định máy đó nên là manager hay worker. Manager sẽ nhận chỉ thị từ  để tạo, thay đổi hoặc xóa định nghĩa cho các thực thể như dịch vụ Docker, cấu hình và bảo mật. Manager hướng dẫn các worker tạo container và volume triển khai các phiên bản dịch vụ Docker. 

Các Swarm cluster có thể mở rộng quy mô đến hàng trăm worker. Docker swarm cho phép tùy chọn triển khai ứng dụng theo cluster gốc do Docker cung cấp, hỗ trợ tốt mô hình ứng dụng Docker. Nhiều người sẽ thấy Swarm triển khai, sử dụng và quản lý đơn giản hơn các công nghệ phân cụm vùng chứa khác. Bạn có thể thấy hữu ích khi triển khai các cụm Swarm nhỏ cho một nhóm hoặc dự án riêng lẻ. Bạn hoàn toàn có thể chia Docker swarm thành các cluster khác nhau bằng có nhãn để triển khai nhiều ứng dụng cùng lúc.

**Giao tiếp mạng trong Docker swarm**\
![1-Page-2.drawio.png](https://images.viblo.asia/bdfb53f4-ddd4-497b-bf3a-a178c0d67672.png)\
Trong Docker hỗ trợ nhiều loại mạng và phạm vi của từng loại mạng là khác nhau. Nếu bạn chưa biết hoặc đã quên có thêm xem lại phần **[DEVOPS] [Docker] Phần 3: Docker Network** trong series này. Và trong Docker swarm sử dụng mạng Overlay để kết nối giữa các container trên các host khác nhau. Chỉ các container được đính vào mạng Overlay mới có thể giao tiếp được với nhau. Khi cài đặt Swarm mạng ingress network được mặc định tạo ra. Mạng này thực hiện định tuyến lưu lượng truy cập từ các máy khách bên ngoài được kết nối với các cổng do dịch vụ Docker xuất bản trong Cluster. Mạng này do Swarm quản lý và chỉ Swarm mới có thể gắn các container vào mạng.

**Nói thêm một chút về Container Orchestration**\
Với việc container hóa bùng nổ trong triển khai, sử dụng cho các ựng dụng thì vấn đề phát sinh thêm là bài toàn về việc quản lý các container đó. Việc quản lý có thể lên tới hàng trăm hàng ngàn container, nếu bạn quản lý thủ công thì tập xác định bằng rỗng rồi đó. Chính vì vậy giải pháp theo kèm chính là Container Orchestration. Container Orchestration là các tool hỗ trợ việc quản lý các container.

Container Orchestration phổ biến hiện nay như là: Docker swarm, Kubernetes, Apache Mesos, Rancher, Openshift, ...
## II. Triển khai Docker swarm
Với một project ta sẽ trên khai chúng trên một Cluster được quản lý bới Cluster Manager riêng để đảm bảo dịch vụ dễ dàng được triển khai cũng như người quản lý dễ dàng quản trị hệ thống. Một hệ thống Docker swarm có thể tồn tại đồng thời nhiều Cluster.
### 2.1. Docker swarm mode
**2.1.1. Kiến trúc**
![image.png](https://images.viblo.asia/0f1a8412-532b-4bc2-af85-2832e9c51904.png)

**2.1.2. Tính năng lợi ích**
1. Khả năng deploy, bảo trì nhanh chóng
2. Khả năng schedule
3. Khả năng mở rộng lên/ xuống
4. Khả năng quản lý networking
5. Khả năng phục hồi dịch vụ
6. Khả năng quản lý tài nguyên
7. Khả năng giám sát trạng thái hoạt động của nodes.

**2.1.3. Thao tác với Cluster**\
**Khởi tạo Cluster ban đầu** \
Để khởi tạo được một Cluster Manager sẽ cần nhiều hơn một host đã được cài đặt Docker. \
![1-Page-3.drawio.png](https://images.viblo.asia/3c7e0e42-ff40-4ead-9186-014f8e2ed1d7.png)

Trong phần này tôi sẽ sử dụng 3 VMwares với topology trên thay cho 3 hosts trong thực tế triển khai.\
![image.png](https://images.viblo.asia/39d0f2cc-89be-4f0d-ad8c-66672e1aed20.png)

Trên Host1_31.182 chạy lệnh khởi tạo một manager:\
`docker swarm init --advertise-addr=192.168.31.182`
![image.png](https://images.viblo.asia/2e46f990-d78b-43c9-b4db-f4d0adea0a84.png)
Lệnh sử dụng cờ *--advertise-addr* để chỉ định IP *192.168.31.182* của host làm manager.

**Thêm một worker vào Cluster**\
Sau khi đã khởi tạo được manager của Cluster, trên màn hình cũng sẽ show lệnh cho phép thêm một host khác vào trong cluster đó. Ta thực hiện chạy lệnh thêm worker trên host muốn thêm vào cluster.\
`docker swarm join --token `
> docker swarm join --token SWMTKN-1-4xuw07sc902cn4s5l0v4ljhqaobq7hpjtar4a742lzslkk7owu-0ri4o94hgmydgfk3nj49dq8im 192.168.31.182:2377

Trên Host2_31.127 và Host3_31.129 thực hiện lệnh để thêm vào cluster:\
![image.png](https://images.viblo.asia/7009efff-ebf9-4b8d-98b0-418b0745c5f9.png)\
![image.png](https://images.viblo.asia/3dee1549-40c8-4248-ad33-6cdadc80e7d0.png)

Hiển thị lại lệnh thêm worker vào trong cluster trên host manager.\
`docker swarm join-token worker`\
![image.png](https://images.viblo.asia/e4e59fc3-05ea-451c-b1ce-519e722d80ca.png)

**Xóa một worker khỏi Cluster**\
Trong trường hợp muốn xóa một worker ra khỏi cluster thì ta thực hiện lệnh trên host đó.\
`docker swarm leave`\
Lệnh này chỉ thực hiện dừng worker trong cluster. Để xóa hoàn toàn có thể sử dụng thêm lệnh. Trong trường hợp muốn xóa worker thì nên thực hiện thêm lệnh này bởi vì khi kiểm tra trạng thái đều hiển thị trạng thái DOWN khi worker rời khởi cluster và host đó shutdown, tránh nhầm lẫn.\
Trên host manager thực hiện:\
`docker node rm id`

**Kiểm tra trạng thái Cluster**\
Kiểm tra trạng thái của Cluster đã triển khai\
`docker info`\
`docker node ls`\
![image.png](https://images.viblo.asia/a32ab4e3-1d1b-4ce3-a509-e1a400ff6610.png)

### 2.2. Triển khai dịch vụ trên Docker swarm
**2.2.1. Các bước triển khai một dịch vụ**\
Trong thực tế để triển khai một dịch vụ trên Docker swarm sẽ cần nhiều bước và khá phức tạp. Nhưng tối thiểu là bạn sẽ cần có image đã chứa dịch vụ cần chạy, cách tạo image này bạn có thể xem thêm trong series này phần **[DEVOPS] [Docker] Phần 4: Docker Image**. 

Trong phần này cung cấp kiến thức cơ bản và bài viết cũng khá dài nên mình sẽ triển khai bằng image nginx gốc luôn. Khi có đủ trải nghiệm mình sẽ viết thêm các bài advance về triển khai dịch vụ trên Docker swarm sát với thực tế.\
Triển khai ứng dụng trên Host1_31.182 chạy:\
`docker service create --replicas 5 -t -p 80:8080 --name server nginx`
![image.png](https://images.viblo.asia/bb97606a-16ce-4eb5-852c-94f3df67f093.png)
Lệnh sử dụng cờ *--replicas* để quyết định số lượng container tạo ra trên cluster, cờ *-p* chỉ thị port  host là 80 và port container là 8080, cờ *--name* để đặt tên. Ngoài ra việc sử dụng cờ *-t* là cần thiết để yêu cầu Docker phân bổ một thiết bị đầu cuối ảo cho container, điều này sẽ cho phép bạn chuyển các tín hiệu đến container.

Nếu không có cờ *-t* đối với một số image như busybox, ubuntu, centos,... khi thực hiện chạy các image này container có thể sẽ rơi vào vòng lặp liên tục: preparing - ready - starting - preparing.\
![image.png](https://images.viblo.asia/c45aba61-809f-42fc-8ba9-fac38c49c574.png)

Docker swarm sẽ tự tính toán và quyết định số lượng container trên từng host khác nhau. Trên Host1 chạy 2 container, Host2 chạy 1 container và Host3 chạy 2 container. 

**2.2.2. Quản lý các dịch vụ sau khi triển khai**\
**Kiểm tra dịch vụ đã tạo trên cluster:**\
`docker service ls`\
`docker service ps web`\
![image.png](https://images.viblo.asia/661f657e-748f-4e4d-939f-97a595fe74e5.png)

**Mở rộng dịch vụ**\
`docker service scale server=10`\
Lệnh sử dụng tham số *scale* để mở rộng số lượng container chạy trên cluster. Nếu số lượng scale tăng thì Docker swarm sẽ tạo thêm các container và phân phối trên các host trong cluster đó. Ngược lại số lượng scale giảm thì Docker swarm sẽ tự động xóa bớt container trong cluster.

**Cập nhật cấu hình cluster**\
`docker service update --image=nginx:latest server`\
Lệnh sử dụng tham số *update* và cờ *--image* để cập nhật image cho toàn bộ cluster. Bạn có thể cập nhật rất nhiều các tham số khác và tham khảo link docs.docker.com/engine/reference/commandline/service_update/

**Xóa một cluster**\
`docker service rm server`

**Lệnh theo dõi màn hình**\
Lệnh này thường hữu ích khi giám giám trên các host, nó có thể thay đổi realtime trên host.\
`docker stats`

**Kiểm tra network trên các host trong Cluster**\
Mặc định với lệnh triển khai dịch vụ thông thường khi không sử dụng cờ *-p* hoặc cờ *--network* các container sẽ sử dụng mạng Bridge. Mạng Bridge có phạm vi là local. Điều đó có nghĩa là mỗi host sẽ tạo riêng một mạng bridge cho các container trong host đó. Và giữa các container khác host không thể giao tiếp được với nhau. Như hình mô tả trong phần **I. Docker Swarm là gì**.\
`docker network ls`\
`docker inspect [id_container]`

Để các container có thể giao tiếp được với nhau chúng ta có thể chạy lệnh thêm cờ *-p* hoặc cờ *--network ingress* khi khởi tạo. Mạng *ingress* là mạng mặc định được tạo ra khi khởi tạo một cluster và có phạm vi là swarm.\
`docker service create --replicas 5 -t -p 22:22 --network ingress --name server busybox`

### 2.3. Triển khai dịch vụ với Docker stack

**2.3.1. Ưu điểm**
* Khi triển khai dịch vụ với Docker stack, bạn có thể theo dõi, quản lý gần như là chi tiết toàn bộ các dịch vụ thông qua file dockercompoes. 
* Triển khai cùng lúc nhiều dịch vụ.
* Dễ dàng tạo network giao tiếp chung giữa các container trên các host khác nhau.

**2.3.2. Các bước triển khai dịch vụ với Docker stack**\
**Bước 1:** Tạo file docker compose\
Cấu trúc file tương như như docker compose của phần trước. Bao gồm: **version**, **services**, **networks**, **volumes**. Các bạn có thể xem thêm **[DEVOPS] [Docker] Phần 6: Docker Compose**\
`touch docker.yaml`\
![image.png](https://images.viblo.asia/785d0f95-81ea-4325-8606-d1469b672e5a.png)\
![image.png](https://images.viblo.asia/712023a8-7552-4e19-829c-675b9fdb008e.png)

**Bước 2:** Triển khai dịch vụ\
`docker stack deploy --compose-file docker.yaml test`\
![image.png](https://images.viblo.asia/44f56fc4-b6ec-4fe4-8ba3-f43ff0ae6e15.png)\
Lệnh sử dụng cờ *--compose-file* hoặc cờ *-c* để chỉ định tên file chạy.

**2.3.3. Quản lý sau khi triển khai Docker stack**\
**Kiểm tra trạng thái Docker stack**\
`docker stack ls`\
`docker stack services test`\
![image.png](https://images.viblo.asia/db02b4f8-6b5e-4e18-bcea-c7eac5c17eda.png)

**Thay đổi cấu hình**\
Khi muốn thay đổi cấu hình chung hoặc thay đổi cho một dịch vụ, bạn sẽ vào thay đổi trực tiếp trên file docker compose. Khi chạy lại hệ thống sẽ đọc lại file docker compose và cập nhật lại theo cấu hình mới.\

**Xóa Docker stack**\
`docker stack rm test`\
![image.png](https://images.viblo.asia/d33ffe32-0929-4f86-8956-cf2b8e6d5234.png)

> **Lưu ý:** Khi bạn scale lại các dịch vụ hoặc thay đổi cấu hình thì các container sẽ được thêm, sửa, xóa thì dịch vụ vẫn sẽ hoạt động bình thường, đảm bảo thời gian donwtime là nhỏ nhất.

### 2.4. Xây dựng cluster

**2.4.2. Xây dựng về network**\
**Xây dựng network cơ bản**\
Tạo một mạng riêng có phạm vi swarm\
`docker network create -d overlay network_overlay`\
`docker network create -d overlay --attachable network_overlay_alone`\
Lệnh có sử dụng cờ *--attachable* cho phép gắn một container đơn lẻ vào mạng overlay. Mặc định phạm vi của mạng overlay là swarm, sử dụng cho nhiều hơn một container nên không thể gắn vào một container đơn lẻ nếu không sử dùng thêm cờ.

Kiểm tra mạng mới được tạo ra\
`docker network ls`

Sử dụng mạng overlay\
`docker service create --replicas 3 -t -p 22:22 --network network_overlay --name server busybox`

**Xây dựng network trong Docker stack**\
Tương tự như khi sử dụng docker compose ở phần trước đó. Việc xây dựng network cho cluster cũng được thực hiện trong file docker compose trong từ khóa **networks** kết hợp tham số *networks* trong **services**\
![image.png](https://images.viblo.asia/95637daa-101e-4674-841c-f4cb783da441.png)

**2.4.3 Xây dựng về volume**\
Việc xây dựng volume cho cluster được thực hiện trong file docker compose trong từ khóa **volumes** kết hợp tham số *volumes* trong **services**\
![image.png](https://images.viblo.asia/15ac69aa-daee-4c90-a792-88532ceb108f.png)

Vì phạm vi chia sẻ của volume là local. Điều đó có nghĩa là chỉ các container trên cùng một host thì mới có thể chia sẻ với nhau.
Chính vì vậy nếu bạn muốn chia sẻ giữa các host khác nhau thì các bạn có thể triển khai một dịch vụ storage trong docker compose đóng vai trò làm vùng chia sẻ dữ liệu chung giữa các host khác nhau. Phần này cũng sẽ nằm trong series advance về Docker của mình sau này sẽ triển khai.\
Các giao thức có thể sử dụng để cấu hình một storage chung như là: SMB, SSH, NFS.

> **Lưu ý:** 
> 1. Khi chạy các dịch vụ phải mở cổng dịch vụ bắt buộc tương ứng để đảm bảo container có thể hoạt động. Hãy sử dụng key PORTS trong docker compose.
> 2. Mỗi version của docker compose sẽ cho phép sử dụng những tham số, thuộc tính khác nhau.

## III. So sánh Docker swarm với Kubernetes
Vì sao mình lại so sánh Docker swarm với Kubernetes trong khi có rất nhiều platform tương đương ư? Bởi vì Kubernetes được sử dụng rộng rãi và series tiếp theo của mình cũng là tìm hiểu về Kubernetes.

Hiện tại trên thế giới đang tồn tại một người anh em cùng cha khác ông nội của Docker swarm, đó chính là Kubernetes. Và Kubernetes thì lại được con dân sủng ái hơn. Chúng ta sẽ so sánh chúng để tìm ra lý do vì sao Kubernetes lại được con dân sủng ái đến vậy.
### 3.1. Ưu nhược điểm Docker swarm
**Ưu điểm**
* Docker Swam dễ cài đặt, đặc biệt đối với những người mới bắt đầu tìm hiểu container. Nó nhẹ và dễ sử dụng. Ngoài ra, Docker Swarm mất ít thời gian để hiểu hơn các công cụ điều phối phức tạp hơn. Nó cung cấp khả năng cân bằng tải tự động trong các vùng chứa Docker, trong khi các Container Orchestration khác phải thực hiện thủ công.
* Docker Swarm hoạt động với Docker CLI, vì vậy không cần phải chạy hoặc cài đặt toàn bộ CLI mới. Thêm vào đó, nó hoạt động liền mạch với các công cụ Docker hiện có như Docker Compose.
* Docker Swarm không yêu cầu thay đổi cấu hình nếu hệ thống của bạn đã chạy bên trong Docker.

**Nhược điểm**
* Do Docker swarm nhẹ và gắn liền với API Docker, điều này giới hạn chức năng trong Docker Swarm, so với Kubernetes. Tương tự như vậy, khả năng tự động hóa của Docker Swarm không mạnh mẽ như những gì Kubernetes cung cấp.
### 3.2. Ưu nhược điểm Kubernetes
**Ưu điểm**\
Kubernetes cung cấp nhiều lợi ích cho các nhóm đang tìm kiếm một công cụ điều phối vùng chứa mạnh mẽ:
* Nó có một cộng đồng lớn và được Google phát triển.
* Nó hỗ trợ mọi hệ điều hành.
* Nó có thể duy trì và quản lý các kiến trúc lớn và khối lượng công việc phức tạp.
* Nó được tự động hóa và có khả năng tự phục hồi, hỗ trợ mở rộng quy mô tự động.
* Nó có tính năng giám sát tích hợp và một loạt các tích hợp có sẵn.
* Nó được cung cấp bởi cả ba nhà cung cấp đám mây chính: Google, Azure và AWS.

**Nhược điểm**\
Mặc dù có bộ tính năng toàn diện, Kubernetes cũng có một số nhược điểm:
* Việc cài đặt phức tạp và quản lý khó khăn.
* Nó yêu cầu bạn cài đặt các công cụ CLI riêng biệt và tìm hiểu từng công cụ trong số chúng.
* Quá trình chuyển đổi từ Docker Swarm sang Kubernetes có thể phức tạp và khó quản lý.
* Trong một số tình huống, Kubernetes có thể quá phức tạp và dẫn đến giảm năng suất.

### 3.3. Sự khác biệt giữa Docker swarm và Kubernetes
|   | Docker Swarm |  Kubernetes |
| --------        | --------   | -------- |
| Cài đặt và sử dụng     |  Thực sự dễ dàng cho những người mới bắt đầu tìm hiểu với CLI được tích hợp sẵn trong Docker  |  Khá phức tạp khi người dùng phải tìm hiểu CLI dùng riêng cho K8S, sẽ mất thời gian để làm quen     |
| Triển khai ứng dụng     | Triển khai bằng cách sử dụng file YAML hoặc Docker Compose     | Kubernetes cung cấp nhiều tùy chọn triển khai như  namespace, nhóm,..      |
| Tính khả dụng và mở rộng    |  Cung cấp tính khả dụng cao vì bạn có thể dễ dàng nhân bản các microservices trong Docker Swarm, có thời gian triển khai nhanh hơn. Nhưng phải thực mở rộng thủ công. | K8S có tính khả dụng cao, có khả năng chịu lỗi và tự phục hồi. Nó cung cấp khả năng mở rộng tự động dựa trên lưu lượng truy cập ở các thời điểm khác nhau  |
| Giám sát     | Hỗ trợ giám sát thông qua các ứng dụng của bên thứ ba     | Tích hợp sẵn tính năng giám sát và hỗ trợ tích hợp với các công cụ giám sát của bên thứ ba     |
| Bảo mật     | Bảo mật lớp truyền tải (TLS) để thực hiện các tác vụ liên quan đến bảo mật và kiểm soát truy cập.     | Hỗ trợ nhiều giao thức bảo mật như RBAC, SSL/ TLS, quản lý bảo mật, chính sách,...     |
| Cân bằng tải     | Hỗ trợ cân bằng tải tự động và sử dụng DNS ẩn     | Không có cơ chế cân bằng tải tự động. Tuy nhiên, Nginx Ingress có thể đóng vai trò là bộ cân bằng tải cho từng dịch vụ trong cụm     |

***Sau khi kết thúc series về Docker mình sẽ bắt đầu làm series về Kubernetes - K8S, hy vọng các bạn sẽ thấy thú vị với series này cũng như mong chờ ở series sau. Đồng thời mình cũng sẽ gom 7 bài viết thành một series để các mọi người dễ xem hơn.*** \
***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***