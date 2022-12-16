***Docker Swarm*** là một giải pháp Orchestration phổ biến.

## Container Orchestration là gì?
**Orchestration** là một thuật ngữ khá rộng dùng để chỉ việc lên lịch container, quản lý cụm và khả năng cung cấp các máy chủ bổ sung.

**Container Orchestration** là tất cả việc quản lý vòng đời của container, đặc biệt là trong môi trường lớn, năng động. Trách nhiệm chính của việc container orchestrations là:
```
1. Cung cấp và triển khai container
2. Dự phòng và sẵn có của container
3. Quản lý Cluster
4. Mở rộng hoặc loại bỏ các containers để phân bố ứng dụng tải đồng đều trên cơ sở hạ tầng máy chủ
5. Di chuyển containers từ máy host này sang máy host khác nếu thiếu tài nguyên trong máy host nào đó, hoặc nếu 1 host nào đó die.
6. Phân bổ resources giữa các container
7. Tiếp xúc bên ngoài của các dịch vụ đang chạy trong một container với thế giới bên ngoài
8. Cân bằng tải của khám phá dịch vụ giữa các containers
9. Theo dõi sức khỏe của container và máy host
10. Cấu hình ứng dụng liên quan đến container chạy nó
```

Một số giải pháp orchestration mã nguồn mở như: Docker Swarm, Kubernetes, Apache Mesos, OPENSHIFT, Nomad etc.
!["Container Ecosystem Layers"](https://images.viblo.asia/1bbdc949-87bf-4e80-a69d-445a0bcaa55e.png)
Container Ecosystem Layers

Trong lĩnh vực điều phối container (container orchestration) đang ngày một phát triển, Kubernetes và Docker Swarm có thể được xem như các “tay chơi” có tiếng. Cả hai đều là các công cụ quan trọng được sử dụng để deploy container bên trong một cluster. Bằng những tính năng vượt trội của mình, chúng dần củng cố vị trí vững chắc của mình trong hệ sinh thái Docker.

![](https://images.viblo.asia/7101b6cd-76e8-4856-97ea-40e6d13ce809.jpeg)

## Docker Swarm là gì ?
Là một công cụ giúp chúng ta tạo ra một clustering Docker. Nó giúp chúng ta gom nhiều Docker Engine lại với nhau và ta có thể “nhìn” nó như duy nhất một virtual Docker Engine.

Tất nhiên là bất cứ công cụ nào có thể giao tiếp với Docker Engine thì cũng sẽ giao tiếp với Docker Swarm bình thường theo đúng chuẩn Docker API, và tất nhiên là trong suốt. Một cụm Swarm có thể được cấu hình và deploy thông qua Docker-Machine.

## Kiến trúc Docker Swarm ?
**Các thành phần kiến trúc chính của Swarm bao gồm:**

### **Swarm:**

Một tập hợp các node có ít nhất một nút chính và một số node worker có thể là máy ảo hoặc vật lý.

### **Service:**
1. Các tasks được xác định bởi người quản trị swarm mà người quản lý hoặc các node agent(đại lý) phải thực hiện.
Nó xác định hình ảnh container nào mà bầy đàn nên sử dụng và lệnh nào bầy đàn sẽ chạy trong mỗi container.
2. Nó xác định container images nào mà swarm nên sử dụng và lệnh nào swarm sẽ chạy trong mỗi container.

### **Manager Node:**
Node **manager** cung cấp một số chức năng sau khi bạn deploy một ứng dụng, chẳng hạn như:
1. Nó phân phối công việc (dưới dạng nhiệm vụ) cho các node worker,
2. Quản lý trạng thái của swarm mà nó thuộc về.

### **Worker Node:**
1. Các node **worker** chạy các tác vụ được phân phối bởi node **manager** trong swarm.
2. Mỗi node **worker** chạy một agent (tác nhân) báo cáo lại cho node **master** về trạng thái của các tác vụ được gán cho nó, vì vậy node **manager** có thể theo dõi các dịch vụ và tác vụ đang chạy trong swarm.

### **Task:**
1. **Tasks** là các Docker containers thực thi các lệnh bạn đã định nghĩa trong service.
2. Các node **manager** gán các task cho các node **worker**, và sau khi việc gán này, task không thể chuyển sang một worker khác. Nếu task thất bại trong bộ bản sao, người quản lý sẽ chỉ định một phiên bản mới của tác vụ đó cho một node có sẵn khác trong swarm.

!["Docker Swarm Architecture"](https://images.viblo.asia/731e9cd4-5d04-48bc-b900-337a45a8e3b9.png)

## Khởi tạo Docker Swarm ?
### Step 1|| Install Docker Machine
```
$ base=https://github.com/docker/machine/releases/download/v0.16.0 && curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine && sudo install /tmp/docker-machine /usr/local/bin/docker-machine
```

### Step 2|| Create Docker machine to act as nodes for docker swarm
Create ```manager``` node:
```
$ sudo docker-machine create --driver virtualbox manager1
```

Create two ```worker``` nodes:
```
1. $ sudo docker-machine create --driver virtualbox worker1
2. $ sudo docker-machine create --driver virtualbox worker2
```

Check created machine list:
```
$ sudo docker-machine ls
```

To check ip address of a specific machine run:
```
$ sudo docker-machine ip manager1
```

### Step 3|| Connect manager and worker machine from terminal by ssh
Open 3 terminal windows:

```
# connect to manager1 node
1. $ sudo docker-machine ssh manager1
# connect to worker1 node
2. $ sudo docker-machine ssh worker1
# connect to manager1 node
3. $ sudo docker-machine ssh worker2
```

### Step 4|| Initialize Docker swarm
Khởi tạo docker swarm trên node manager bằng địa chỉ IP manager1 chạy theo lệnh:

>** Note:** điều này nó chỉ work trong swarm manager, không work trên worker machine.

```
# check manager1 IP_address
1. $ sudo docker-machine ip manager1

# initialize docker swarm on manager1
2. $ docker swarm init --advertise-addr manager1_ip_address

output will be something like this:

Swarm initialized: current node (vq7xx5j4dpe04rgwwm5ur63ce) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-50qba7hmo5exuapkmrj6jki8knfvinceo68xjmh322y7c8f0pj-87mjqjho30uue43oqbhhthjui 10.0.120.3:2377
    
To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```
> Lệnh `docker swarm init` sinh ra 1 join token. Mã token đảm bảo rằng không có node độc hại nào tham gia vào swarm. Bạn cần sử dụng token này để join các nodes khác tới swarm.

Giờ mình tạm dừng ở đây, hẹn gặp các bạn ở seri này vào tháng sau nahaaa!