Xin chào mọi người, tiếp tục với chủ để tìm hiểu Docker thì hôm nay chúng ta cùng tìm hiểu về Docker Swarm nhé, trong bài này chúng ta sẽ tìm hiểu xem Docker Swarm là gì, khi nào cần dùng, tính năng nổi bật, kiến trúc  và cách khởi tạo.
#  Docker Swarm là gì, Khi nào cần dùng ?
Docker Swarm là công cụ tạo ra một clustering Docker. Cho phép ta có thể kết nối các docker host với nhau tạo thành một cụm các máy, khi tạo được hệ thống Docker Swarm thì chúng ta có thể quản lý và chạy các dịch vụ trên hệ thống này một cách dẽ dàng.
Giả sử ta có các hệ thống docker chạy trên các vps khác nhau thì ta có kể kết nối chúng tạo thành một cụm docker

Chúng ta cần dùng Docker Swarm khi project của bạn cần phát triển, quản lý, deploy  trên nhiều nhiều host thì đó là lúc cần dùng đến Docker Swarm.

# Tính năng nổi bật
(Phần này các bạn có thể đọc trực tiếp trên docs của docker  [tại đây](https://docs.docker.com/engine/swarm/)

**Cluster management integrated with Docker Engine** : Sử dụng bộ Docker Engine CLI để tạo swarm một cách dễ dàng

**Decentralized design:**  Docker Swarm được thiết kế dạng phân cấp. Thay vì xử lý sự khác biệt giữa các roles của node tại thời điểm triển khai, Docker  xử lý bất kỳ tác vụ nào khi runtime. Ta có thể triển khai  node managers và worker bằng Docker Engine.

**Declarative service model:**  Docker Engine sử dụng phương thức khai báo để cho phép bạn define trạng thái mong muốn của các dịch vụ khác nhau trong stack ứng dụng của bạn

**Scaling:** với mỗi service có thể khai báo số lượng task mà ta muốn chạy, Scale up, down replicas của 1 service một cách dễ dàng

**Desired state reconciliation:** Swarm đảm bảo 1 service hoạt động ổn định bằng cách tự động thay 1 replicas crash bằng 1 replicas mới cho các worker đang run

**Multi-host networking:**  Swarm manager có thể tự động gán IP cho mỗi service khi nó khởi tạo và cập nhật application.

**Service discovery:** Swarm manager node gán mỗi service trong swarm một DNS server riêng. Do đó bạn có thể truy xuất thông qua DNS này

**Load balancing:** Có thể expose các port cho các services tới load balance.  tích hợp cân bằng tải sử dujgn thuật toán thuật toán Round-robin

**Secure by default:** Các service giao tiếp với nhau sử dụng giao thức bảo mật TLS

**Rolling updates:** ASwarm giúp update image của service một cách hoàn toàn tự động. Swarm manager giúp bạn kiểm soát độ trễ giữa service deploy tới các node khác nhau và bạn có thể rolling back bất cứ lúc nào.


# Kiến trúc của Docker Swarm

![](https://images.viblo.asia/77af38ad-b1ef-49c0-8df4-d245541c31ec.jpg)


Kiến trúc Swarm bao gồm một tập hợp các node có ít nhất một nút chính (Manager-Leader) và một số node worker có thể là máy ảo hoặc vật lý.

**Swarm:** là một cluster của một node trong chế độ Swarm, thay vì phải chạy các container bằng câu lệnh thì ta sẽ thiết lập các services để phân bổ các bản replicas tới các node.

**Manager Node:** Là node nhận các define service từ user, quản lý theo dõi các service và tác vụ đang chạy trong Swarm, điều phối và chỉ định các node worker làm việc

**Worker Node:** là một máy vật lý hay máy ảo chạy các tác vụ được chỉ định bới node manager

**Task:**  là các Docker containers thực thi các lệnh bạn đã định nghĩa trong service. Tác vụ này sẽ do node Manager phân bổ xuống, và sau khi việc phân bổ này task không thể chuyển sang một worker khác. Nếu task thất bại, node Manager sẽ chỉ định một phiên bản mới của tác vụ đó cho một node có sẵn khác trong Swarm.

**Service:**  Một service xác định image của container và số lượng các replicas (bản sao) mong muốn khởi chạy trong Swarm.

# khởi tạo Docker Swarm
Phần này chúng ta sẽ tạo một cụm docker với 2 máy host làm node worker và 1 host làm node manager
1.  Tạo máy ảo cho Swarm manager bằng lệnh

    `$ docker-machine create manager`
2.  Tạo 2 máy ảo cho Swarm node worker bằng lệnh

    `$ docker-machine create worker1`

    `$ docker-machine create worker2`
3.  Kiểm tra danh sách máy ảo

    `$ docker-machine ls`
    
    Ta thấy các máy ảo cần thiết đã được tạo thành công.

![](https://images.viblo.asia/69124e81-8dbd-4e96-ae59-aad7b154845c.png)


4. Cần kiểm tra thông tin 1 máy ảo thì ta có thể dùng lệnh
    
    `$ docker-machine inspect manager`
    
    ![](https://images.viblo.asia/74125ee6-4b38-4539-b503-d87de83121d7.png)
    Cài đặt  các máy ảo cần thiết đã xong.
 5. Khời tạo Swarn trên máy ảo manager
    
    Để truy cập vào máy manager thì ta SSH vào bằng lệnh
    
       ` $ docker-machine ssh manager`
   
       Truy cập vào các máy khác tương tự, ở đây manager là tên của máy mà mình muốn truy cập vào.
   
       ![](https://images.viblo.asia/245fa047-ff4b-4cf8-8758-d6581c6224b0.png)
6. Quay trở lại local host

    `$ exit`
    
7. Ở local host khởi tạo Swarm với node manager là IP máy chọn làm manager,
    
    `$ docker swarm init --advertise-addr <IP Machine>`
    
    Ở đây `<IP Machine>` là IP máy mình chọn làm node manager , IP này mình có thể lấy ở lệnh  `$ docker-machine ls` hoặc `$ docker-machine inspect manager`
    
    Tạo xong thì sẽ như này, dòng bôi trắng là lệnh dùng để các worker jorn vào Swarm này, lệnh này để dùng vào phần sau
    
    ![](https://images.viblo.asia/ea9a605b-87ee-4fd0-85ff-4817eef5afbd.png)

 8. Kiểm tra list node hiện tại đang có trong Swarm 
     
     `docker node ls`
     
9. Join một máy áo khác vào Swarm vừa tạo

    Bật một terminal mới và ssh vào worker1, và sử dụng lệnh jorn ở trên khi khởi tạo Swarm
    giải thích 1 chút về lệnh jorn 
    
    `$ docker swarm join --token <token> <host>:<port>`
    
        <host>: Địa chỉ ip của con manager
         <port>: Cổng port của con manager
    
    ![](https://images.viblo.asia/2271b067-c89c-443b-ac2a-552b1034567d.png)
    
    jorn worker2 vào cũng tương tự.
10. Quay về terminal của manager và kiểm tra xem có những node nào trong Swarm
    ![](https://images.viblo.asia/b7fd916b-abc5-47a4-8aad-4a92c3521e61.png)
    
    
***Vậy là chúng ta đã tạo thành công một Swarm với 2 node là 1 node manager và 1 node worker, bài sau chúng ta sẽ tiếp tục tìm hiểu về Swarm nhé, cảm ơn mọi người.***