Đây là bài viết đầu tiên trong loạt bài *Deploy dự án Ruby on Rails trên Amazon ECS*. Trong bài viết này, mình sẽ nói về các ý tưởng cần thiết để bắt đầu 1 dự án trên ECS.

## ECS là gì và tại sao sử dụng ECS

ECS (Elastic container service) là 1 dịch vụ điều phối container hiệu suất cao có hỗ trợ Docker. Nó cho phép lập trình viên chạy các ứng dụng được đóng gói trên AWS. ECS được biết đến như là 1 đối thủ cạnh tranh với Kubernetes của Google. AWS tích hợp ECS cùng với rất nhiều các dịch vụ khác đi kèm, khiến nó trở thành 1 lựa chọn số 1 khi chạy phần lớn khối lượng dự án trên nền tảng AWS.

**Tại sao lại cần 1 dịch vụ điều phối?**

Trên thực tế, các ứng dụng được đóng gói (containerized) đơn giản thường dễ xử lý. Nếu bạn có 1 container cho ứng dụng của mình, đó là tất cả những gì bạn phải quản lý.

Tuy nhiên, khối lượng công việc trên môi trường production không đơn giản như vậy. Dung lượng cơ bản cho 1 khối lượng công việc vừa phải cần đến ít nhất 5 container, và phải đảm bảo 5 container này chạy cùng lúc, mọi lúc. Đôi khi, các containers này lại không nằm trên cùng 1 instance, mà rải rác trên 2, cho tới 3 instance. Với cách setup như vậy, việc deploy là cực kì đau khổ. Bạn phải làm việc với từng instance, chạy n bản copies của phiên bản mới, rồi cho test thủ công.

![](https://images.viblo.asia/9dc432ba-d6fe-49ba-bd2c-970cf82726a3.png)

Bên cạnh đó, bạn cũng cần quản lý thêm vấn đề có nhiều hơn 1 container trên 1 instance. Với cách deploy truyền thống, bạn có 1 application server trên 1 instance, và trỏ server đó đến port 80, và vậy là xong, nó có thể được truy cập thông qua giao thức HTTP. Vậy trong trường hợp có hai container trên nhiều instance thì sao? Chúng ta không thể trỏ trực tiếp 2 container tới cùng 1 cổng 80 được. Do đó, phương án ở đây là sử dụng 1 server để cân bằng tải lưu lượng giữa các container nằm trên nhiều instance. Tuy nhiên, bạn vẫn phải thực hiện register và deregister thủ công từng container tới máy chủ.
![](https://images.viblo.asia/fc77b85e-489e-4408-8ecf-5fc9fc2ade6f.png)

Với cách tiếp cận như vậy, công việc bảo trì cần thiết sẽ cực kì phức tạp, đến nỗi chúng ta thực sự mong muốn quay về với cách deploy truyền thống, hơn là sử dụng Docker.

Và với sự ra đời của ECS là 1 dịch vụ điều phối, ngần đó effort là không còn cần thiết nữa:
* ECS quy định các instance cho người dùng. Các instance đã được triển khai và sẵn sàng đưa vào sử dụng, chỉ cần quy định số lượng instance và loại instance.
* ECS xử lý cách thức deploy container xuyên suốt các EC2 instance.
* ECS được tích hợp với bộ cân bằng tải của AWS, do đó lập trình viên sẽ không còn phải lo lắng về việc quản lý bộ cân bằng tải. Bên cạnh đó các instance "healthy" cũng sẽ được đăng ký đến các bộ cân bằng tải để lưu lượng có thể được chuyển tới từng container. Và đối với các instance "unhealthy" sẽ được hủy đăng ký để lưu lượng truy cập sẽ không di chuyển tới các container lỗi này.
* ECS hỗ trợ việc thực hiện deploy, và chắc chắn rằng phiên bản mới sẽ thông qua một số loại thử nghiệm trước khi lưu lượng truy cập được chuyển tới. 
* ECS hoàn toàn miễn phí. Người dùng chỉ cần thanh toán các tài nguyên mà ứng dụng sử dụng.

## Ý tưởng
### Docker Registry 
Việc đầu tiên bạn cần làm là đưa 1 Docker image lên Docker registry. Docker registry cũng tương tự như Github, nhưng đối tượng ở đây là Docker image. Người dùng có thể push, pull, gắn tag các image. Tag được hiểu như tên được đặt cho các phiên bản khác nhau của image. Bạn có thể push lên bao nhiêu phiên bản của image cũng được, miễn sao chúng có các tag khác nhau (ví dụ: v0.0.1, v0.0.2). Nếu như đẩy lên với tag giống nhau, phiên bản sau sẽ ghi đè lên phiên bản trước đó.

Docker registry phổ biến nhất hiện nay là Docker Hub. AWS cũng cung cấp riêng 1 kho lưu trữ image private, là ECR (Elastic Container Registry) với mức phí là $0.1/GB/month. Amazon cũng tính phí lưu lượng đi ra khỏi ECR vào trong các instance. Trong bài viết này, đối tượng Docker Registry mình muốn hướng tới là ECR.

### Task Defination
Task defination là 1 file JSON định nghĩa các task và các container. Task được hiểu là logical groupings của các container (ví dụ như 1 "*image processing task*" có thể có 1 Sidekiq container, 1 web container và 1 Redis container). Các container trong 1 task phải chạy cùng nhau. Trong ví dụ về "*image processing task*", việc mở rộng web container yêu cầu cả việc mở rộng Sidekiq container và Redis container.

Best practice ở đây là chúng ta chỉ nên có 1 container tương ứng với 1 task, để giúp cho việc scale từng phần của hệ thống 1 cách độc lập.

Task defination bao gồm các thông tin sau:
* Cần bao nhiêu CPU và bộ nhớ cho 1 task?
* Định nghĩa 1 container trong 1 task:
    * Container tiêu thụ bao nhiêu CPU và memory? Nó không được vượt quá con số được phân bổ ban đầu đối với 1 task. Nếu có nhiều hơn 1 container trong 1 task thì tổng số lượng tiêu thụ CPU và memory không được vượt quá con số phân bổ ban đầu.
    * Bạn quản lý các log ra sao?
    * Docker image nào sẽ được sử dụng?
    * Biến môi trường nào sẽ khả dụng cho container?
    * Câu lệnh nào sẽ được sử dụng để start container?

Vì cấu hình này thay đổi xuyên suốt vòng đời của 1 ứng dụng, do đó task definations có thể có nhiều phiên bản, được gọi là *revision*.

### ECS Service
1 service sẽ đảm bảo luôn có 1 số lượng n task chạy tại 1 thời điểm. Khi 1 container chết, nó sẽ sinh ra 1 phiên bản để back up. Service này cũng chịu trách nhiệm instance nào sẽ được deploy.

Khi sinh ra 1 container, ECS service sẽ đảm bảo container đó được đăng ký lên ALB (Application Elastic Load Balancer) găn với nó. 1 ALB thực thi việc điều hướng lưu lượng trên các container trong hệ thống. 1 khi container được đăng ký với ALB, lưu lượng có thể được chuyển qua container đó.

Có 2 loại service là **ECS-EC2** và **ECS-Fargate**.

ECS-EC2 service triển khai các container trên EC2 instance mà ta có quyền truy cập đến. ECS-Fargate thì chạy container trên EC2 instance được quản lý bởi AWS, do đó ta sẽ không có quyền truy cập đến các instance này.

### ECS Cluster
1 cụm (cluster) là tổ hợp các service và task. Khi ta chạy service ECS-EC2, 1 cụm còn được hiểu là 1 nhóm các EC2 instance. Bạn có thể thiết lập số lượng và loại EC2 instance mà bạn muốn sử dụng. Tổng số đơn vị CPU và đơn vị bộ nhớ của từng instance này xác định số lượng container có thể thiết lập trong 1 cluster.

Lấy ví dụ: ta tạo ra 1 cluster cho ứng dụng *Image processing*. Nó có 2 service ECS-EC2: 1 web service thực hiện render website, và 1 service xử lý ảnh thực hiện việc resize. Cụm cũng bao gồm 3 c5.large instance, mỗi cái có 1 2vCPU (2.048 đơn vị CPU) và 4 GiB bộ nhớ. Cách setup này cho chúng ta 6.144 đơn vị CPU và 12GiB bộ nhớ. Dung lượng này được chia sẻ giữa tất cả các ECS-EC2 service trong cụm.

Giả sử web service của chúng ta cần 1.024 CPU units và 2GB RAM đối với 1 task, và service xử lý ảnh cần tới 2.048 CPU units và 4GB RAM cho 1 task, thì chúng ta có thể đưa vào 2 image processing tasks và 2 web service tasks vào trong 3 c5.large instance này. Nếu chúng ta muốn đưa thềm vào 1 web service task nữa, điều này là không thể vì toàn bộ tài nguyên của 3 c5.large instance đã được phân bố đầy đủ cho 4 task trước đó.
![](https://images.viblo.asia/8f3f9341-9bb0-4480-8860-435b645c6a25.png)

**Trong phần tiếp theo, chúng ta sẽ thực hiện setup tài khoản AWS và push image lên AWS's image registry.**



-----
*Bài viết được dịch từ [Deploy Rails in Amazon ECS: Part 1 - Concepts](https://dev.to/jamby1100/deploy-rails-in-amazon-ecs-part-1-concepts-26nl)*