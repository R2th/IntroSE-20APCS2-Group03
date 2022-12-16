Kubernetes là một Platform dùng để tự động hóa việc quản lý, scaling và triển khai ứng dụng dưới dạng container hóa bằng cách sử dụng docker. Việc chạy docker trên môi trường production ngày càng phổ biến hiện nay. Để quản lý tốt hệ thông chỉ chạy bằng container khi sử dụng docker sẽ khó khăn. Và Kubernetes sinh ra để giải quyết vấn đề đó. Ngoài Kubernetes ra còn có docker swarm, có thể mình sẽ viết docker swarm tương lai gần.

## Kubernetes Architecture
![](https://images.viblo.asia/3ef29c54-6a6e-4c15-8e1a-281497c471fc.png)
Sơ qua thì chúng ta thấy kubernetes có các cụm Nodes được kết nối tới Kubernetes 
Vậy các Nodes ở đây là như thế nào?

Dưới đây là mô hình minh họa về các Nodes
![](https://images.viblo.asia/ad8a0555-1c8c-4d3d-b1ce-dc4c105893cd.jpg)

### Nodes
Một node ở đây có thể hiểu là một máy ảo hoặc máy vật lý chạy Kubernetes.

Bạn hãy tưởng tượng khi bạn có ứng dụng với nhiều microservices khác nhau. Để tránh trường hợp tất cả services đều chết, hoặc scale về CPU và RAM thì bạn phải kết hợp rất nhiều máy ảo hay các máy vật lý với các host khác nhau. Điều này gây khó khăn việc quản lý, khi làm việc chỉ với một máy, sẽ gặp các vấn đề như không đủ tài nguyên, không thể backup khi sự cố xảy ra chẳng hạn. CHúng ta sẽ nghĩ ngay tới join các host, máy ảo ... với nhau để phục vụ được mục đích của chúng ta.


### Pod
**Pod** ở đây là tập hợp các container xử lý với mục đích nào đó, chia sẻ không gian lưu trữ, địa chỉ IP với nhau.
Một Node có thể có nhiều Pods.

Để dễ hiểu hơn mình có ví dụ sau:
* backend: Flask, Nginx, uwsgi 
* frontend: Node:10 alpine, nginx

Vậy chúng ta có 2 pods độc lập có thể trên các máy ảo khác nhau dẫn đến địa chỉ IP khác nhau.

### Replica Set
![](https://images.viblo.asia/b9e98b02-2e14-4586-af39-659532548418.png)

Như hình ví dụ minh họa, mình đoán các bạn thấy được phần nào tác dụng của **Replica**. 

**Replica Set** đảm nhận vai trò tạo ra số lượng Pods giống nhau dựa vào yêu cầu và luôn luôn duy trì số lượng đó.
Ở đây `Replica Set = 3`

Nếu lỡ 1 Node bị down thì Kubernetes sẽ tự tạo 1 pod ở Node nào đó và phân phối chúng đảm bảo khôi phục trở về `Status: Ready`

## Kubernetes liệu có cần thiết ?
### Các vấn đề
Nếu bạn chỉ sử dụng 1 host tạo ra nhiều container để làm môi trường production thì chắc chắn rằng các vấn đề liên quan gặp phải rất nhiều như:
* Quản lý hàng loạt các docker host
* Auto Scaling
* Monitor container, measure status container
* Load Balancing
* Log manager
* khả năng mở rộng
* Khả năng tích hợp

Bằng cách thực hiện replicas làm cho hệ thống có sức chịu lỗi cao và tự động thực hiện load balance
Ngoài ra việc Scheduling tự động hợp lý tùy vào tình trang CPU, memory của docker, thì việc auto scaling diễn ra tự động mà không phải tốn nhiều công sức để quản lý.

### Khả năng tích hợp
Khả năng tích hợp với các hệ sinh thái bên ngoài của Kubernetes rất mạnh
* Ansible: Deploy container tới Kubernetes
* Fluentd: gửi log của container trong Kubernetes
* Jenkins: Deploy container đến Kubernetes
* Prometheus: Monitor Kubernetes
* Spark: Thực thi native job trên Kubernetes
* Spinnaker：Deploy container đến Kubernetes
* OpenStack：Cấu trúc k8s liên kết với Cloud
* ....

## Kết luận
Bài viết mang tính chất giới thiệu platform đang thành trend hiện nay từ khi docker ra đời. 

Hi vọng thông qua bài viết của mình chúng ta có thể cân nhắc sử dụng Kubernetes cho hệ thống ứng dụng sau này.

Các bài viết tiếp theo, chúng ta sẽ cùng nhau tìm hiểu sâu hơn về Kubernetes này.