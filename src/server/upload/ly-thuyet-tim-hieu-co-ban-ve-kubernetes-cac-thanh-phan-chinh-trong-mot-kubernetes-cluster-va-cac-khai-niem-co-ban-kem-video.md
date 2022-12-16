![](https://images.viblo.asia/b9822d03-8a1f-4ff8-b435-2686c5303b82.jpg)

**Video đầu tay mong các bạn ủng hộ :laughing:**

{@youtube: https://www.youtube.com/embed/xRj22tG4J9w}

-----

# Kubernetes là gì?
Kubernetes là một platform để deploy, scaling và manage (quản lý) các ứng dụng hoạt động dựa trên Container. Các ứng dụng có thể khác nhau về kích thước: từ 1 cho đến hàng nghìn server. 
Với Kubernetes chúng ta có thể phát triển application một cách linh hoạt và đáng tin cậy.

![](https://images.viblo.asia/940844d1-cc43-4f31-857c-8cf2e1417778.png)

Trách nhiệm chính của Kubernetes là container orchestration (dịch ra có nghĩa điều phối container). Kubernetes  đảm bảo rằng tất cả container được lên lịch chạy trên các server (server ở đây có thể là physical machine hoặc virtual machine). 
Ngoài ra, Kubernetes còn có chức năng theo dõi hoạt động của từng container và khi một container nào đó gặp trục trặc, dừng hoạt động thì Kubernetes sẽ thay thế container đó.

Ban đầu, Kubernetes được phát triển bởi Google vào năm 2014, sau đó vào năm 2016 Google cùng với Linux Foundation thành lập một tổ chức có tên là Cloud Native Computing Foundation (CNCF) và Kubernetes dã trở thành một project của tổ chức này cho đến thời điểm hiện tại. 
Năm 2018, Kubernetes Project đạt vị trí thứ 9 về số lượt commit trên Github.

## Môi trường cài đặt Kubernetes

Bạn có thể cài đặt Kubernetes on-premises hoặc sử dụng các  Kubernetes Service được quản lý bởi Cloud Provider như:
* Google: Google Kubernetes Engine (GKE)
* Amazon: Elastic Kubernetes Service (EKS)
* Microsoft: Azure Kubernetes Service (AKS)

![](https://images.viblo.asia/4dc6d948-0e51-429c-a756-d79406cc3b33.png)

Ở trong một bài viết khác, mình sẽ hướng dẫn cài đặt một Kubernetes Cluster trên máy tính của mình bằng Minikube, và trên AWS, Google Cloud Platform, Microsoft Azure.

## Lợi ích khi sử dụng Kubernetes

Kubernetes được thiết kế để cung cấp developer những lợi ích sau:

* Kubernetes cung cấp các công cụ mà bạn cần để phát triển application nhanh chóng trong khi vẫn duy trì sử ổn định. Kubernetes sử dụng Container Image mà trong đó application được đóng gói. Khi bạn thêm chức năng mới,  tương đương với việc tạo một Container Image mới. Khi deploy, bạn chỉ cần thay thế Image cũ bằng Image mới. Nếu có lỗi, bạn có thể roll-back ngay lập tức bằng cách deploy lại Image cũ.
* Application sẽ được chia nhỏ thành nhiều Service mà mỗi Service sẽ chỉ thực hiện một chức năng duy nhất (còn được gọi là microservice). Mỗi Service sẽ được duy trì bởi một nhóm và có thể scale dễ dàng hơn rất nhiều so với trong hệ thống thông thường.
* Kubernetes tự động khôi phục nếu có sự cố. Khi một Container dừng hoạt động, Kubernetes sẽ tự động lên lịch để chạy một Container khác.
* Nhiều application có thể chạy trên cùng một máy mà không ảnh hưởng đến nhau. Developer có thể tập trung vào việc tạo thay vì nghĩ về vị trí các ứng dụng chạy.
* Tự động hóa việc phân phối các ứng dụng trên toàn cụm, đảm bảo mức độ sử dụng cao hơn so với công cụ truyền thống.Kubernetes API giúp ứng dụng của bạn có thể di động trên nhiều môi trường khác nhau. Ví dụ, Kubernetes Services biết cách tạo bộ cân bằng tải trên tất cả các đám mây công cộng chính.

-----

# Các thành phần chính trong cấu trúc của Kubernetes

Cluster là một tập hợp nhiều Node mà trong đó các Node sẽ cung cấp các tài nguyên như là computing, memory, storage và networking. Một hệ thống ở quy mô to có thể bao gồm nhiều Cluster.
Node mà mình nói ở đây có thể là một physical machine (máy vật lý) hoặc virtual machine. Trong một số tài liệu cũ về Kubernetes, Node còn được gọi là minion. 

![](https://images.viblo.asia/fa6a3a8c-4ef1-4f11-ac54-f49073a42263.jpeg)


Có hai loại Node trong Kubernetes Cluster mà mỗi loại sẽ bao gồm các thành phần khác nhau. 
Thứ nhất, chúng ta có

## Master (Hay còn gọi là Control Plane)

Đối với cluster nhỏ , Master có thể chạy trên một Node, nhưng trong một cluster lớn, để đảm bảo tính khả dụng (trong tiếng anh là High-Availability) thì Master có thể được chạy trên nhiều Node.
(Tính khả dụng có nghĩa là Khi mà một Node trong cluster dừng hoạt động thì hệ thống vẫn duy trì như không có gì xảy ra). 
Master sẽ bao gồm 5 thành phần chính sau

### api-server
Cung cấp REST API cho Kubernetes Cluster dùng để xác thực và thiết lập configuration data cho các objects như Pods, Services.
Etcd: Là Key-value Storage có tính khả dụng cao được sử dụng để lưu trữ toàn bộ cấu hình, trạng thái và metadata của Kubernetes Cluster. Trong các cluster nhỏ, etcd có thể chạy trên cùng một Node với các thành phần khác. Nhưng trong các cluster lớn, etcd có thể chạy dự phòng trên nhiều Node để đảm bảo tính khả dụng của toàn hệ thống.

### Etcd
Là Key-value Storage  được sử dụng để lưu trữ toàn bộ cấu hình, trạng thái và metadata của Kubernetes Cluster. Trong các cluster nhỏ, etcd có thể chạy trên cùng một Node với các thành phần khác. Nhưng trong các cluster lớn, etcd có thể chạy dự phòng trên nhiều Node để đảm bảo tính khả dụng của toàn hệ thống.

### Kube Controller Manage
Là một tập hợp các controller khác nhau để theo dõi các cập nhật trạng thái của Kubernetes Cluster thông qua API và thực hiện các thay đổi đối với Cluster sao cho phù hợp.

### Cloud Controller Manager
Là một tập hợp các logic dành riêng cho Cloud Provider (GCP, AWS, Azure) cho phép bạn liên kết Kubernetes Cluster với API của Cloud Provider. 
Nếu bạn đang chạy Kubernetes on-premises hoặc môi trường dev trên máy tính của bạn, thì mặc định Cluster sẽ không có Cloud Controller Manager.

### Scheduler
Sử dụng Kubernetes API để tìm các Pod chưa được lên lịch. Sau đó, scheduler sẽ đặt các Pod này vào các Node dựa trên tài nguyên và các ràng buộc khác được định nghĩa trong manifest file của Pod. 
Scheduler sẽ cố gắng đảm bảo rằng các Pod của cùng một application sẽ được phân phối trên các Node khác nhau để đảm bảo tính khả dụng.


## Worker
Có nhiệm vụ xử lý workload của application trong cluster. Worker sẽ bao gồm 3 thành phần chính sau:

### kube-proxy
Chạy trên tất cả các Node trong cluster. kube-proxy có trách nhiệm quản lý network policy trên mỗi Node và chuyển tiếp hoặc lọc traffic tới Node dựa trên các policy này.

### kubelet
Kubelet là một agent chạy trên mỗi Worker Node. kubelet có trách nhiệm giám sát giao tiếp với master node và quản lý các Pod. 
Kubelet sử dụng **CRI** (Container Runtime Interface) để giao tiếp với container runtime trên cùng một Node đó.

### Container Runtime
Phần mềm chịu trách nhiệm chạy các container. Mình sẽ giải thích kĩ hơn về CRI trong một video khác


-----


# Những khái niệm cơ bản quan trọng trong Kubernetes
## Pods
Trong Kubernetes, Pod là đơn vị nhỏ nhất để schedule, deploy và cô lập runtime của một hoặc nhiều container liên quan tới nhau.
Các container trong cùng một Pod sẽ luôn được schedule trên cùng một Node và cùng nhau chia sẻ tài nguyên, chẳng hạn như filesystem, và networking. Nếu Node đó đột nhiên dừng hoạt động,  các Pod nằm trên Node đó sẽ được schedule lại trên một Node khác trong Cluster.
Application của bạn sẽ chạy trong Pod, nhưng thực tế bạn sẽ không truy cập trực tiếp vào Pod  – mà thay vào đó chúng ta sẽ sử dụng một object khác gọi là Service.

## Services
Trong trường hợp phổ biến nhất, Services đại diện cho một điểm vào (hay còn gọi là entry-point) để truy cập application của bạn. Services được sử dụng để khám phá và thực hiện chức năng load-balancing cho một nhóm đối tượng các Pods bằng nhãn (hay còn gọi là Labels mà mình sẽ giải thích ngay sau đây). Service giúp bạn scale application mà không ảnh hưởng đến end-user.
Ngoài ra, bạn cũng có thể có Services cung cấp quyền truy cập tới các resources bên ngoài Kubernetes Cluster của bạn.

## Labels
Labels (Nhãn) cung cấp metadata nhận dạng cho các object trong Kubernetes. Labels cho phép người dùng tổ chức và nhóm các object trong Cluster. Một object có thể có nhiều Label và mỗi Label có thể được gán cho nhiều object khác nhau — đây là mối quan hệ MxN.
Người dùng có thể sử dụng Label để lọc các đối tượng trong Cluster một cách dễ dàng

## Annotations
Annotations (dịch ra có nghĩa là chú thích) khá giống với Label. Nhưng, Annotations nhằm mục đích cung cấp metadata để máy tính sử dụng chứ không phải con người. Annotations không dùng để truy vấn cũng như đối sánh các object.
Ví dụ: Chúng ta có thể sử dụng Annotations để bổ sung các thông tin như là timestamp, Git branch, Build IDs, Release IDs v.v.

## ReplicaSets
ReplicaSet đảm bảo rằng application sẽ luôn chạy đúng loại và số lượng Pod trong cluster.  Lấy ví dụ rất đơn giản là, trong thực tế, khi bạn webserver, thay vì chỉ chạy 1 instance, bạn sẽ muốn chạy 4 instance để load balancing.
Trong Kubernetes bạn có thể sử dụng ReplicaSet để làm việc đó.
ReplicaSets được thiết kế cho stateless application (ví dụ như Web Server).

## StatefulSets
Nhìn chung, StatefulSets tương tự như ReplicaSets nhưng sở hữu một số thuộc tính đặc biệt sau: 
* Mỗi bản sao của Pod có một tên cố định và không thay đổi
* Mỗi bản sao của Pod được tạo theo thứ tự từ index thấp nhất đến cao nhất. Ví dụ, mình tạo một StatefulSets chạy 4 replica của mongodb container, khi chạy thành công thì mình sẽ có 4 Pod có tên lần lượt là mongo-01, mong-02, mongo-03, mongo-04, trong quá trình khởi tạo thì mongo-02 sẽ bị block cho đến khi mongo-01 đi vào hoạt động . Quy tắc này  cũng sẽ được áp dụng khi bạn scale up application.
* Khi bạn xóa StatefulSet, các Pod mà StatefulSet đó quản lý sẽ bị xóa theo thứ tự từ  index cao nhất về index thấp nhất. Quy tắc này cũng sẽ được áp dụng khi bạn scale down application.

Chúng ta sẽ sử dụng StatefulSets cho stateful application (stateful có nghĩa là dữ liệu của application  sẽ được lưu lại trong mỗi session)

## ConfigMaps
ConfigMap cung cấp dữ liệu dưới dạng các cặp key-value để truyền vào container tại runtime.
Sau khi bạn tạo một ConfigMap, thì bạn có thể sử dụng ConfigMap theo hai cách sau:
* Một là tham chiếu tới các environment variable, trong đó các key trong ConfigMap trở thành tên của environment variable.
* Hai là các key trong Configmap sẽ được ánh xạ thành các file trên một ổ đĩa của  Pod. key sẽ tương ứng là tên của file.

## Secrets
Secrets tương tự như ConfigMap nhưng được sử dụng để cung cấp thông tin nhạy cảm cho container. 
Ví dụ: MySQL DB Password, API token, v.v.
Sử dụng Secrets cho phép bạn tạo container mà không cần đóng gói dữ liệu nhạy cảm trong container.

Configmap và Secrets có thể  được truyền vào Pod thông qua Manifest file và Kubernetes API.

## Namespaces
Tất cả các object trong  Kubernetes được deploy vào các namespaces. 
Kubernetes sử dụng Namespace để quản lý  các object trong Cluster. 

Mình sẽ sử dụng command.Mình sẽ lấy một ví dụ cực kì dễ hiểu: 
Giả sử bạn cần 2 môi trường là staging và production cho application của bạn, thì bạn có thể tạo2 namespace tương ứng là staging và production để sử dụng.

Có một điểm cần lưu ý ở đây là:
Mặc định, các Pods trong một Namespace có thể truy cập các Pods và Services trong một Namespace khác. 
Vì vậy khi bạn sử dụng Namespace, bạn sẽ cần thiết lập Network Policy trong Kubernetes Cluster để kiểm soát truy cập giữa các resources.

# Kết thúc
Okay, vậy là chúng ta đã cùng nhau tìm hiểu sơ bộ về Kubernetes.
Trong bài này, chúng ta đã tìm hiểu khái quát về Kubernetes.
* Kubernetes là gì,  lợi ích khi sử dụng Kubernetes
* Cấu trúc của một Kubernetes Cluster.
* Kiến thức cơ bản về các khái niệm quan trọng trong Kubernetes.

Nếu bạn có câu hỏi hoặc góp ý hãy để lại comment hoặc liên lạc trực tiếp nhé.

![](https://images.viblo.asia/9cbf7567-01e6-4dbe-9312-4dfd1035970c.jpg)
![](https://images.viblo.asia/5d618271-ff1e-4a72-b4c9-34526713502a.jpg)
![](https://images.viblo.asia/7665fb18-905b-40bd-a1d2-51ee0a1cf20a.jpg)

-----
* [Youtube](https://www.youtube.com/c/FullstacKAGE)