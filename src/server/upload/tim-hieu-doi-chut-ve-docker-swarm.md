![](https://images.viblo.asia/bfbf5212-4dfb-44f8-9bcd-6b55a0290162.png)
### Lời mở đầu
Như mình cũng đã giới thiệu rất nhiều trong các bài viết thuộc series [Cùng nhau học docker]( https://viblo.asia/s/2018-cung-nhau-hoc-docker-Wj53Omjb56m). Dần dần docker hay (devops) ngày càng trở thành một công nghệ cần thiết và không thể thiếu trong các dự án. Khi mà trước đây mọi người chỉ quan tâm đến khái niệm Backend hay Frontend. Những năm gần đây thực sự là thời điểm của devops và mọi người thực sự đã chú trọng hơn về nó. Nếu bạn là newbie và đang quan tâm đến docker cũng như các khái niệm của nó. Bạn có thể tham khảo:
- [Docker - những kiến thức cơ bản phần 1](https://viblo.asia/p/docker-nhung-kien-thuc-co-ban-phan-1-bJzKmM1kK9N)
- [Docker - những kiến thức cơ bản phần 2](https://viblo.asia/p/docker-nhung-kien-thuc-co-ban-phan-2-V3m5WyEvZO7)
- [Docker - những kiến thức cơ bản phần 3](https://viblo.asia/p/docker-nhung-kien-thuc-co-ban-phan-3-4dbZNoovlYM)
- [Sử dụng Portainer để quản lý Docker apps](https://viblo.asia/p/su-dung-portainer-de-quan-ly-docker-apps-Eb85oGa852G)

Đọc lại bài viết này [Sử dụng Portainer để quản lý Docker apps](https://viblo.asia/p/su-dung-portainer-de-quan-ly-docker-apps-Eb85oGa852G), các bạn có thể thấy mình có có nói đến việc sử dụng và cài đặt docker swarm để quản lý Docker apps với Portainer. Việc cài đặt docker swarm chỉ có vài command đơn giản đúng không. Nhưng nó là gì và ý nghĩa các hoạt động của nó như thế nào thì xin mạn phép trong bài này mình xin chia sẻ đôi chút về nó.

### Docker và Docker Container là gì ?
**1. Docker là gì ?**

Ở bài này mình xin định nghĩa lại khái niệm docker như sau:

*"Docker là một open platform cung cấp cho người sử dụng những công cụ và service để người sử dụng có thể đóng gói và chạy chương trình của mình trên các môi trường khác nhau một cách nhanh nhất."*

**2. Docker Container là gì ?**

Docker Container được hiểu đơn giản: là một dạng runtime của các Docker Image, dùng để làm môi trường chạy ứng dụng.

Docker container có nét giống với các directory. Một Docker container giữ mọi thứ chúng ta cần để chạy một app. Mỗi container được tạo từ Docker image. Docker container có thể có các trạng thái run, started, stopped, moved và deleted.

![](https://images.viblo.asia/3855649b-dcd1-4e49-9eef-c3a44bce6b95.png)

*Example: Chúng ta build một Image mysql version 8 thì sẽ tạo ra một Docker Container có thể có tên là viblo_mysql chẳng hạn, container này có thể run, started, stopped, moved và deleted.*

![](https://images.viblo.asia/07154361-8334-42c9-989d-dcdff8a39e9c.png)
Việc chúng ta tạo ra các docker file rồi tạo các Docker Containers ví dụ như Viblo_mysql từ image Mysql Version 8, Viblo_php-fpm từ image php 7.3,... rồi chạy chúng. Việc chạy độc lập các Containers đó chính là một solution đơn giản nhất của Docker Swarm và tất nhiên như vậy không làm ảnh hưởng đến hoạt động của dự án chút nào cả. Tuy nhiên trong một số trường hợp việc hoạt động độc lập của các container lại trở thành khó khăn cho một số bài toán.

Người ta đặt ra một câu hỏi là: *"Làm thế nào để docker làm việc trên nhiều node khác nhau mà vẫn có thể chia sẻ được với nhau ?"*

### Docker Swarm là gì ?
Có thể hiểu một cách đơn giản:
![](https://images.viblo.asia/248491c2-1955-4613-954a-322de74e0e26.png)

*"Docker Swarm: là một service cho phép người dùng có thể tạo, quản lý tập chung cho Docker nodes và lịch trình cho các containers"*

*"Mỗi node của một Docker Swarm là một Docker daemon và tất cả các Docker daemons đều sử dụng docker API"*

![](https://images.viblo.asia/caae9665-68f2-41fd-a2df-55a3b3c32c0d.png)

*"Các services có thể được deploy và có thể truy cập vào các nodes như nhau"*
![](https://images.viblo.asia/b5dd65d9-82ca-43fc-be27-2588ab933abe.png)

Với việc quản lý bằng docker cơ bản, mỗi container sẽ được quản lý bằng các Docker CLI riêng biệt.

![](https://images.viblo.asia/90beb86d-58c7-4ce2-ba57-42d85253f4d9.png)

Tuy nhiên khi sử dụng Docker Swarm các containers sẽ được quản lý bằng một Docker CLI chung.

![](https://images.viblo.asia/cfb97cca-2506-407c-a46f-34cb40c01744.png)

Khi một container bị build lỗi, thì với một backup folder sẵn có trong node ta có thể sử dụng để restore data  trên một swarm mới.
Nếu bạn nào đã từng deploy và sử dụng docker trong dự án chắc chắn đã từng bị chết container. Và đơn giản với docker swarm chúng ta có thể rollback bản build trước một cách dễ dàng với Swarm.
### Các tính năng của Docker Swarm
**Docker Swarm có một số tính năng cơ bản như sau:**
- Truy cập phi tập trung
- Tính bảo mật cao
- Auto load balancing
- Khả năng mở rộng cao
- Có khả năng rollback tiến trình 
### Kiến trúc của Docker Swarm

![](https://images.viblo.asia/6347835a-8fd0-43f8-a47c-6245de35f52c.png)

**Kiển trúc của Docker Swarm bao gồm :**
- Manage Node
- Worker node
- Docker daemon
- Container

Các container được quản lý bởi các Docker daemon trong các Worker node đã được chia nhỏ và quản lý tập trung bởi Manage node.
### Docker Swarm hoạt động như thế nào?

![](https://images.viblo.asia/3b55c33a-689e-46e1-b08d-ceb71c8fd4fe.png)

- Manage node được hiểu là trạng thái của tất cả các Worker node trong cụm.
- Worker node chấp nhận các task được gửi từ Manage node.
- Mọi Worker node như một agent, tự động báo cáo trạnh thái task của node đến Manage node.
- Tất cả các Worker node giao tiếp với Manager node sử dụng API qua HTTP.

Các Manager node cũng được phân quyền theo từng cấp độ.
![](https://images.viblo.asia/26a9d007-fc23-46a2-8e78-d034414eab94.png)

### Demo
Join docker swarm với Ip Server của bạn
```bash
$ docker swarm init --advertise-addr 192.168.1.34
Swarm initialized: current node (bvz81updecsj6wjz393c09vti) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-3pu6hszjas19xyp7ghgosyx9k8atbfcr8p2is99znpy26u2lkl-1awxwuwd3z9j1z3puu7rcgdbx \
    172.17.0.2:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```
Tham khảo thêm ví dụ  [Sử dụng Portainer để quản lý Docker apps](https://viblo.asia/p/su-dung-portainer-de-quan-ly-docker-apps-Eb85oGa852G)
### Tạm kết
Chắc hẳn qua bài viết các bạn cũng đôi chút hiểu hơn về Docker Swarm và có thể áp dụng nó vào dự án của mình. Hy vọng được sự đóng góp của các bạn để chúng ta có thể trau dồi thêm kiến thức về Docker.
![](https://images.viblo.asia/c9a98922-9b9c-4ceb-9516-6c6b67a3cb01.gif)