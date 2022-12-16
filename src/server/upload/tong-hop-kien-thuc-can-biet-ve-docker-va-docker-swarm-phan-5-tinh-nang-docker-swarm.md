## I. Tính năng của Docker Swarm
- **Quản lý Cluster được tích hợp với Docker Engine:** Sử dụng Docker CLI để tạo ra swarm để triển khai các dịch vụ. Không cần thiết phải có thêm các phần mềm khác để tạo và quản lý swarm
![](https://images.viblo.asia/9628bf12-3c55-40a0-918c-271d9c57fb9a.png)

![](https://images.viblo.asia/f62219ee-f6aa-4e24-adfd-74e118c3e41a.png)

- **Triển khai phân tán:** Thay vì xử lý các khác biệt giữa vai trò của các node trong thời gian triển khai, Docker Engine sẽ xử lý bất kỳ tác vụ nào đang chạy. Ta có thể triển khai cả hai loại node là manager và workers sử dụng Docker Engine. Điều này có nghĩa ta có thể tạo ra một Docker Swarm hoàn chỉnh chỉ từ một image duy nhất.
![](https://images.viblo.asia/c148e44d-e21d-473c-9926-2e41aa9b09f0.png)

![](https://images.viblo.asia/3a774362-d0e4-4a17-b788-65dda258158b.png)

- **Scaling:** Đối với mỗi dịch vụ triển khai trong Docker Swarm, bạn có thể khai báo số lượng task muốn chạy. Khi bạn mở rộng quy mô hay ngược lại, Docker Swarm sẽ tự động điều chỉnh bằng cách thêm hoặc xóa task để duy trì trạng thái mong muốn - tình trạng hệ thống ta cần đạt được.
- **Đảm bảo tính ổn định:** Docker Swarm sẽ liên tục giám sát trạng thái của cluster và giải quyết bất kỳ sự thay đổi nào giữa trạng thái thực tế và trạng thái mong muốn dựa trên các quyết định của bạn. Ví dụ: Ta thiết lập một dịch vụ với 5 bản sao containers và worker node có lưu trữ 2 bản sao containers. Manager node sẽ tự động tạo ra 2 bản sao containers khác nếu như 2 bản sao containers trong worker node bị lỗi, ... Manager Node sẽ luôn luôn đảm bảo các bản sao containers mới cho worker đang chạy hoặc được cung cấp.
- **Multi-host networking:** Có thể khai báo overlay network cho các dịch vụ trong Swarm. Docker Swarm sẽ tự động quản lý và gán địa chỉ IP cho mỗi container trên overlay network khi nó khởi tạo hoặc update ứng dụng.
- **Service discovery:** Swarm manager node sẽ chỉ định mỗi dịch vụ trong Docker Swarm ứng với một tên DNS duy nhất và cân bằng tải các containers đang chạy. Ta có thể thực hiện truy vấn tất các containers đang chạy trong Swarm thông qua một DNS Server được nhúng vào Swarm.
- **Cân bằng tải:** Bạn có thể expose ports cho các dịch vụ tới một load balancer bên ngoài. Trong Swarm, cho phép bạn chỉ định làm thế nào để phân phối services giữa các node.
    - Swarm manager sử dụng network ingress load balancing để đưa các service ra bên ngoài swarm. Swarm manager có thể tự động đưa các service lên các Port chưa được sử dụng trong khoảng 30000-32767. Hoặc người dùng cũng có thể tự động xác định port mà service sẽ được gán vào.
    - Các ứng dụng bên ngoài có thể truy cập vào service thông qua các Published Port ở bất kỳ node nào trong cluster kể cả node đó có service này hay không. Tất cả các node trong Swarm đều sẽ kết nối đến router ingress để kết nối đến các task đang hoạt động.
    - Bên trong Swarm mode, mỗi một service đều sẽ được gán cho một DNS nội bộ để truy cập. Swarm manager sẽ sử dụng khả năng load balancing nội bộ để gửi các yêu cầu đến các service trong cluster dựa theo DNS của service đó.

- **Rolling Update:** Tại một thời điểm, ta có thể áp dụng việc cập nhật ứng dụng (chủ yếu là phiên bản images). Nếu có lỗi phát sinh xảy ra, ta có thể quay lại phiên bản trước của services. 
- **Tính khả dụng cao, cho phép sao chép trạng thái:** Docker Swarm cho phép nhân bản trạng thái của Docker node trong Swarm. Hãy theo dõi thứ tự các hình ảnh sau để hiểu rõ hơn về tính năng này của Docker.
![](https://images.viblo.asia/4453d251-c1b7-41af-a6c5-33e5e54c8988.png)

Với Docker Swarm, thay vì có một manager và manager node có thể bị lỗi khiến Swarm không được cung cấp thì ta có thể triển khai nhiều manager node cùng một lúc.
![](https://images.viblo.asia/40700515-1e3f-4e61-8235-6aab161e932d.png)

Khi một manager node đang hoạt động bị crash
![](https://images.viblo.asia/0c69f613-cc08-4e45-bc19-cf9993479723.png)

Manager node sẽ được tự động chuyển chức năng quản lý sang một node khác (node backup):
![](https://images.viblo.asia/0fe6c4e6-0ef4-443c-9635-ac7671610fdd.png)

## II. So sánh Docker Swarm với Kubernetes
### 1. Tổng quan Kubernestes
Kubernetes là nền tảng được xây dựng dựa trên nhiều năm kinh nghiệm của Google về việc chạy workload ở quy mô lớn trong quy trình production. Theo định nghĩa tại website của Kubernetes, “Kubernetes là một hệ thống nguồn mở (open-source system) để tự động hóa việc triển khai, thay đổi kích thước và quản lý các ứng dụng được container hoá”.
Tìm hiểu sâu hơn về Kubernetes tại đây.
### 2. So sánh

| Nội dung | Docker Swarm | Kubernetes |
| -------- | -------- | -------- |
| Định nghĩa ứng dụng  | Các ứng dụng có thể được deploy như một service (hoặc micro-service) trong một Swarm cluster. File YAML có thể được dùng để cụ thế hoá multi-container. Hơn nữa, Docker Compose có thể deploy ứng dụng.  | Một ứng dụng có thể được deploy bằng cách sử dụng kết hợp các pod, deployments và services (hoặc micro-services) |
| Install và setup  | Việc cài đặt Docker Swarm rất đơn giản. Với Docker, chỉ cần một bộ công cụ tùy chọn để build theo môi trường và cấu hình. Docker Swarm cũng cung cấp tính linh hoạt bằng cách cho phép tất cả các node mới tham gia vào một cluster hiện có với tư cách là manager hoặc worker.  | Bước install được thực hiện thủ công và cần có kế hoạch cụ thể để Kubernetes hoạt động trơn tru. Hướng dẫn cài đặt thường được không thống nhất giữa các nhà cung cấp. Ngoài ra, cần nắm được cấu hình cluster như địa chỉ IP của một node hoặc nhiệm vụ của mỗi node.  |
| Yêu cầu  | Với lợi thế là một công cụ của Docker, Docker Swarm sử dụng ngôn ngữ chung để điều hướng trong một cấu trúc. Điều này cung cấp tính biến thiên và tốc độ cho công cụ này  | Kubernetes yêu cầu kiến thức về CLI (Command Line Interface) để chạy trên Docker. Cần hiểu về Docker CLI để điều hướng bên trong một cấu trúc, sau đó bổ sung infrastructure ngôn ngữ chung Kubernetes để chạy các program đó.  |
| Logging và giám sát  | Docker Swarm được hỗ trợ để chỉ giám sát với các ứng dụng của bên thứ ba. Lời khuyên là nên sử dụng Docker với Reimann để giám sát, tuy nhiên vì Docker Swarm có API mở, nên việc kết nối với nhiều ứng dụng dễ dàng hơn.  | Kubernetes hỗ trợ nhiều phiên bản logging (ghi nhật ký) và giám sát khi các service được triển khai trong cluster: Các log (nhật ký) Elasticsearch / Kibana (ELK) trong container. Heapster / Grafana / Influx để giám sát trong container. Tích hợp cloud Sysdig |
| Khả năng thay đổi quy mô  | So với Kubernetes, Docker Swarm có thể deploy các container nhanh hơn; điều này cho phép thời gian phản ứng nhanh để thay đổi quy mô theo yêu cầu.   | Kubernetes là một all-in-one framework cho các hệ thống phân tán. Đây là một hệ thống phức tạp vì nó cung cấp một bộ API thống nhất và đảm bảo mạnh mẽ về trạng thái cluster, làm chậm deployment và thay đổi quy mô container.  |
| Tính sẵn sàng, khả dụng  | Docker Swarm cũng cung cấp tính sẵn sàng cao vì các service có thể được nhân bản trong các node Swarm. Trong Docker Swarm, các node quản lý Swarm chịu trách nhiệm cho toàn bộ cluster và quản lý tài nguyên của các node worker  | Tất cả các pod được phân phối giữa các node và điều này cung cấp tính sẵn sàng cao bằng cách chấp nhận lỗi ứng dụng. Hơn nữa, các load-balancing của Kubernetes phát hiện các pod không lành mạnh và loại bỏ chúng, điều này hỗ trợ tính sẵn sàng cao.  |
| Networking  | Một node tham gia một cluster tạo ra một overlay network các service bao trùm tất cả các host trong Swarm và một network cầu nối Docker duy nhất cho các container. Người dùng Docker Swarm có thể tùy chọn mã hóa data traffic (lưu lượng dữ liệu) container khi tự tạo overlay network. | Kubernetes network có tính chất phẳng vì nó cho phép tất cả các pod giao tiếp với nhau. Trong Kubernetes, model yêu cầu 02 CIDR: 01 CIDR để yêu cầu các pod lấy địa chỉ IP, 01 CIDR là cho các service.  |
| Quy mô cộng đồng  | 100+ Contributors, 4.000+ Commits, 500+ Fork | 3.000+ Contributors, 100.000+ Commits, 30.000+ Fork |

### 3. Kết luận
#### a. Kubernestes
**Ưu điểm**
* Được hỗ trợ bởi Tổ chức Cloud Native Computing Foundation (CNCF).
* Xây dựng được một cộng đồng hùng mạnh so với các công cụ điều phối container khác.
* Là một công cụ module và mã nguồn mở hoạt động với mọi hệ điều hành.
* Cung cấp việc tổ chức service dễ dàng với các pod

**Nhược điểm**
* Việc cài đặt Kubernetes có thể khá phức tạp với steep learning curve. Một cách để giải quyết vấn đề này là lựa chọn Kubernetes-as-a-service.
* Trong Kubernetes, cần phải có một bộ công cụ riêng để quản lý, bao gồm cả CLI kubectl.
* Không tương thích với các công cụ Docker CLI và Compose

#### b. Docker Swarm
**Ưu điểm**
* Docker Swarm dễ cài đặt và thiết lập nhanh. Việc deployment đơn giản hơn và chế độ Swarm được bao gồm trong công cụ Docker.
* Có một learning curve dễ dàng hơn.
* Tích hợp trơn tru với Docker Compose và Docker CLI. Điều đó bởi vì đây là những công cụ của Docker. Hầu hết các lệnh CLI Docker sẽ hoạt động với Swarm.

**Nhược điểm**
* Cung cấp chức năng hạn chế.
* Có khả năng chịu lỗi hạn chế.
* Có cộng đồng và dự án nhỏ hơn so với cộng đồng Kubernetes
* Các service có thể phải thay đổi quy mô thủ công, không tự động.

## Tài liệu tham khảo
[1]. [How node works ](https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/)

[2]. [Docker docs](https://docs.docker.com/get-started/overview/)

[3]. [Docker là gì?](https://topdev.vn/blog/docker-la-gi/)

[4]. [Docker - chưa biết gì đến biết dùng](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0)