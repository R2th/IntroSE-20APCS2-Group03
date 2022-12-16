![](https://images.viblo.asia/bb87b1ab-e5c0-4cf5-9c50-2509db1dd2fc.jpeg)
### Lời mở đầu
Tình hình là thế này các bạn ạ, đợt này mình cũng tập tọe tìm hiểu về DevOps nhằm tối ưu hóa và vận hành dự án được tốt hơn.

Nếu bạn chưa biết thì cụ thể, DevOps là viết tắt của Development (Dev) và Operations (Ops). DevOps là một văn hóa làm việc kết hợp giữa kỹ sư phát triển phần mềm (dev) với bộ phận operator nhằm mục đích rút ngắn vòng đời phát triển sản phẩm.

Khi tìm hiểu về DevOps để áp dụng cho dự án thì hai nền tảng ta cần quan tâm và tìm hiểu đó chính là Kubernetes và Docker. Về docker thì mình có viết khá nhiều bài tìm hiểu và giới thiệu về nó. Các bạn có thể [Tìm hiểu về docker](https://viblo.asia/s/2018-cung-nhau-hoc-docker-Wj53Omjb56m) và sau đó quay trở lại đọc bài viết này của mình.
### Kubernetes và Docker Swarm
![](https://images.viblo.asia/84f394c3-e587-4e5e-9543-159cef3a94c0.png)

**Kubernetes là gì?**

Kubernetes là một nền tảng nguồn mở, khả chuyển, có thể mở rộng để quản lý các ứng dụng được đóng gói và các service, giúp thuận lợi trong việc cấu hình và tự động hoá việc triển khai ứng dụng.

Nếu các bạn đã tìm hiểu về docker và hiểu rõ về khái niệm docker container. Thì Kubernetes cũng tương tự như thế, nó cũng nhân rộng và quản lý các ứng dụng container.

**Tại sao nên dùng Kubernetes?**

Như mình vừa nói ở trên, Kubernetes quản lý và vận hành ứng dụng trên các container. Và để các ứng dụng được chạy trên môi trường production không bị downtime và nếu một container bị tắt đi, một container khác cần phải khởi động lên. Trong docker thì các bạn có thể sử dụng docker swarm cho trường hợp này. Và Kubernetes cũng giải quyết bài toán như vậy.

Kubernetes cung cấp cho bạn một framework để chạy các hệ phân tán một cách mạnh mẽ. Nó đảm nhiệm việc nhân rộng và chuyển đổi dự phòng cho ứng dụng của bạn, cung cấp các mẫu deployment và hơn thế nữa. 

Kubernetes cung cấp cho chúng ta rất nhiều feature tiêu biểu như:

* Việc quản lý hàng loạt docket host
* Container Scheduling
* Rolling update
* Scaling/Auto Scaling
* Monitor vòng đời và tình trạng sống chết của container.
* Self-hearing trong trường hợp có lỗi xãy ra. (Có khả năng phát hiện và tự correct lỗi)
* Service discovery
* Load balancing
* Quản lý data
* Quản lý work node
* Quản lý log
* Infrastructure as Code
* Sự liên kết và mở rộng với các hệ thống khác

**Kubernetes và Docker Swarm:**

Khi tìm hiểu và đọc các tài liệu về Kubernetes mình luôn thấy mọi người đề cập và so sánh giữa Kubernetes và Docker Swarm
Mình cũng có viết 1 bài về tìm hiểu docker swarm, các bạn có thể đọc ở đây:
[Docker Swarm](https://viblo.asia/p/tim-hieu-doi-chut-ve-docker-swarm-gAm5y1Pq5db)

**Docker Swarm:** là một service cho phép người dùng có thể tạo, quản lý tập chung cho Docker nodes và lịch trình cho các containers

"Mỗi node của một Docker Swarm là một Docker daemon và tất cả các Docker daemons đều sử dụng docker API"

"Các services có thể được deploy và có thể truy cập vào các nodes như nhau"

Khi sử dụng Docker Swarm các containers sẽ được quản lý bằng một Docker CLI chung.

**Kubernetes:** là dịch vụ điều phối container. Được phát triển bởi Google và tặng lại cho Tổ chức Điện toán đám mây CNCF. Kubernetes hiện là nguồn mở. Có lợi thế là tận dụng nhiều năm kinh nghiệm trong quản lý container của Google. Đó là một hệ thống toàn diện để tự động hóa việc triển khai, lập lịch và nhân rộng các ứng dụng được đóng gói và hỗ trợ nhiều công cụ container hóa như Docker.
### Kubernetes Architecture
![](https://images.viblo.asia/aad2e1cf-e2f2-4b15-91dc-a365d15606c9.PNG)

**Kubernetes master:** nó như bộ não của chúng ta vậy, nó là trung tâm điều khiển. Đây là nơi quản lý, lên kế hoạch, lập lịch và theo dõi các node.

**Image Registry:** Nơi quản lý các images của ứng dụng.

**Node:** Host Application as container (các ứng dụng sẽ được tạo ra trong các container chứa các image tương ứng)

**API:** UI hoặc các CLI sẽ tương tác qua api để điều phối các action tương ứng.

Trong Kubernetes cần nắm rõ hai khái niệm:

**Node**

Là một máy ảo hoặc máy vật lý chạy Kubernetes. Nodes hay còn gọi là docker host.

Các nút (node) tạo nên sức mạnh tính toán tập thể của cụm Kubernetes. Đây là nơi container thực sự được triển khai để chạy. Các node là cơ sở hạ tầng vật lý mà ứng dụng của bạn chạy trên đó, máy chủ của VM trong môi trường của bạn.

**Pods**

Pods là tài nguyên cấp thấp nhất trong cụm Kubernetes. Một pod được tạo thành từ một hoặc nhiều container, nhưng phổ biến nhất là một container. Khi xác định cụm, có giới hạn được đặt ra cho các pod như: xác định tài nguyên, CPU và bộ nhớ nào cần chạy. Bộ lập lịch sử dụng định nghĩa này để quyết định các nút nào sẽ đặt các nhóm. Nếu có nhiều hơn một container trong một nhóm, rất khó để ước tính các tài nguyên cần thiết và bộ lập lịch sẽ không thể đặt các pod một cách thích hợp.

**Kubernetes  cluster**

Kubernetes kết nối và điều phối các máy tính trong một cluster để chúng có thể hoạt động như một đơn vị thống nhất (unit). Nó cho phép bạn triển khai các ứng dụng trên Container mà không cần phải bận tâm chúng sẽ được khởi chạy trên chiếc máy tính cụ thể nào trong cluster. Để sử dụng mô hình triển khai của Kubernetes, các ứng dụng cần được đóng gói theo một cách linh động và không phụ thuộc vào từng máy tính cụ thể (host): tức là các ứng dụng được Container hóa.

### Tạm kết
Hãy làm ứng dụng của bạn ngày càng tối ưu với Kubernetes và DevOps. Rất mongđược ý kiến đóng góp và trao đổi từ các bạn.
![](https://images.viblo.asia/b67bf6ec-fa7f-475b-8173-6e09f9e5d848.gif)