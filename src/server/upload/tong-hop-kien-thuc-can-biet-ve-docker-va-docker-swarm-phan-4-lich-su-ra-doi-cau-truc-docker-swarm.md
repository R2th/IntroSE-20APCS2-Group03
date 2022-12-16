![](https://images.viblo.asia/d84c72d2-3794-4240-8738-2fdd2f6f5e0f.png)

## I. Khái niệm, lý do ra đời
![](https://images.viblo.asia/f34b24d9-669c-41d9-bd47-1ae1d2303b4e.png)

* Docker compose là công cụ dùng để định nghĩa và run multi-container cho Docker application. Với compose bạn sử dụng file YAML để config các services cho application của bạn. 
* Tuy nhiên, Docker Compose chỉ áp dụng được trên một Docker Host duy nhất, điều này tạo nên sự giới hạn về mặt cấu hình phần cứng mà hệ thống Docker Host đó có thể cung cấp, khiến việc scale up khả năng xử lý dịch vụ và gia tăng số lượng Docker Container tương ứng với dịch vụ đó trở nên khó khăn.

**=> Từ đó ra đời Orchestration**
* Orchestration là một thuật ngữ dùng để chỉ việc lên lịch container, quản lý cụm và khả năng cung cấp các máy chủ bổ sung. 
* Container Orchestration là tất cả những việc quản lý vòng đời của container, đặc biệt trong môi trường lớn, có thể kể đến như:
    - Cung cấp và triển khai container
    - Quản lý Cluster
    - Mở rộng hoặc loại bỏ các containers để phân bố ứng dụng tải đồng đều trên cơ sở hạ tầng máy chủ
    - Di chuyển containers từ máy host này sang máy host khác nếu thiếu tài nguyên trong máy host nào đó, hoặc nếu 1 host nào đó die.
    - Phân bổ resources giữa các container,...

**Vậy Docker Swarm là gì, liên quan gì đến orchestration??**
![](https://images.viblo.asia/dc93f2ac-cda0-458d-aae5-3d8691adc34a.jpg)

* Docker Swarm là một trong những giải pháp orchestration mã nguồn mở bên cạnh Kubernetes, Apache Mesos, ... Nó hỗ trợ việc tạo và quản lý các container hoặc các hệ thống Container Orchestration. Nó là một cluster nơi mà người dùng quản lý các Docker Engines hoặc các node để deploy service và chạy.
* Có thể làm việc trên nhiều nền tảng khác nhau như Windows, Linux, MacOS. Ngoài ra Docker còn hỗ trợ nhiều dịch vụ điện toán đám mây nổi tiếng như Microsoft Azure hay Amazon Web Services.

Trước khi dùng Docker Swarm
![](https://images.viblo.asia/9628bf12-3c55-40a0-918c-271d9c57fb9a.png)

Sau khi dùng Docker Swarm
![](https://images.viblo.asia/40700515-1e3f-4e61-8235-6aab161e932d.png)

## II. Lợi ích của việc sử dụng
Docker Swarm có 3 lợi ích chính:
* **Tận dụng sức mạnh của Containers:** container cho phép developer triển khai các ứng dụng hoặc dịch vụ trong môi trường ảo độc lập, một nhiệm vụ trước đây thuộc về máy ảo.
* **Đảm bảo tính khả dụng của dịch vụ cao:** một Docker Swarm có một trình quản lý có thể phân công nhiệm vụ cho các Worker node. Bằng cách triển khai nhiều trình quản lý, developers đảm bảo rằng hệ thống có thể tiếp tục hoạt động ngay cả khi một trong các Manager node bị lỗi. 
* **Cân bằng tải tự động:** Docker swarm lên lịch các tác vụ bằng nhiều phương pháp khác nhau để đảm bảo rằng có đủ tài nguyên cho tất cả containers, giúp đảm bảo khối lượng công việc container được chỉ định chạy trên máy chủ phù hợp nhất để đạt hiệu quả tối ưu.
## III. Cấu trúc
![](https://images.viblo.asia/87dc19d2-86d0-4003-a630-a75906b88172.png)
Docker Swarm gồm 2 thành phần chính
### 1. Swarm (Cluster)
Một tập hợp các node có ít nhất một node chính và một số node worker có thể là máy ảo hoặc vật lý.
### 2. Node
Mỗi node của một Docker Swarm là một Docker Host / Docker daemon và tất cả các Docker daemons đều sử dụng docker API. Thông thường sẽ sử dụng docker-machine sử dụng máy ảo VirtualBox hoặc HyperV. Node có 2 loại:
* **Manager node:**
Đây là node nắm mọi quyền quản lý và phân phối công việc cho các node còn lại (Worker Node) trong swarm. Thông thường chỉ có 1 Manager Node trong Swarm.
Thực hiện các chức năng như sau:
    - Nó phân phối công việc (dưới dạng nhiệm vụ) cho các node worker,
    - Quản lý trạng thái của swarm mà nó thuộc về.
* **Worker Node**
Là Node thuộc Swarm nhưng không phải Node Manager, thực thi và báo cáo kết quả công việc đến Manager Node(s).
    - Các node worker chạy các tác vụ được phân phối bởi node manager
    - Mỗi node worker chạy một agent (tác nhân) báo cáo lại cho node master về trạng thái của các tác vụ được gán cho nó, vì vậy node manager có thể theo dõi các dịch vụ và tác vụ đang chạy trong swarm.
### 3. Service
* Tương tự như Docker Compose, người dùng sử dụng service definition để khai báo thông tin về Image, số lượng Containers - replicas, network, ports và storages.
* Dựa trên khai báo này, manager nodes chia tách service thành các đơn vị tasks, phân phối đến work nodes. 
* Nếu một worker node không hoạt động vì một lý do nào đó, manager node sẽ điều hướng tasks sang những worker node khác để đảm bảo trạng thái yêu cầu của dịch vụ.
### 4. Task
![](https://images.viblo.asia/2f5b4455-ebde-4613-85b2-5ed189ee4651.png)

* Swarm định nghĩa Task là một container đang thực thi một phần công việc yêu cầu trong swarm service, và đặt dưới sự quản lý của manager node. 
* Các node manager gán các task cho các node worker, và sau khi việc gán này, task không thể chuyển sang một worker khác. Nếu task thất bại trong bộ bản sao, người quản lý sẽ chỉ định một phiên bản mới của tác vụ đó cho một node có sẵn khác trong swarm.
* Swarm định nghĩa Task là một container đang thực thi một phần công việc yêu cầu trong swarm service, và đặt dưới sự quản lý của manager node. 
* Các node manager gán các task cho các node worker, và sau khi việc gán này, task không thể chuyển sang một worker khác. Nếu task thất bại trong bộ bản sao, người quản lý sẽ chỉ định một phiên bản mới của tác vụ đó cho một node có sẵn khác trong swarm.

## Tài liệu tham khảo
[1]. [How node works ](https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/)

[2]. [Docker docs](https://docs.docker.com/get-started/overview/)

[3]. [Docker là gì?](https://topdev.vn/blog/docker-la-gi/)

[4]. [Docker - chưa biết gì đến biết dùng](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0)