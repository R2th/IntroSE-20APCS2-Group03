## Giới thiệu
### Kubernetes là gì?
* Kubernetes là một bộ công cụ mã nguồn mở, đáp ứng tiêu chuẩn triển khai thực tế, làm nhiệm vụ điều phối và khởi chạy các ứng dụng dạng Container (hay còn gọi là Container orchestration engine) bên trong một cluster hoặc thậm chí xuyên suốt nhiều cluster.
* Kubernetes được triển khai bởi google.
### Tại sao bạn cần Kubernetes và nó có thể làm những gì?
*  Cân bằng tải: Kubernetes có thể expose một container sử dụng DNS hoặc địa chỉ IP của riêng nó. Nếu lượng traffic truy cập đến một container cao, Kubernetes có thể cân bằng tải và phân phối lưu lượng mạng (network traffic) để việc triển khai được ổn định.
*  Điều phối bộ nhớ: Kubernetes cho phép bạn tự động mount một hệ thống lưu trữ mà bạn chọn, như local storages, public cloud providers, v.v.
*  Tự động rollouts và rollbacks: Bạn có thể mô tả trạng thái mong muốn cho các container được triển khai dùng Kubernetes và nó có thể thay đổi trạng thái thực tế sang trạng thái mong muốn với tần suất được kiểm soát. Ví dụ, bạn có thể tự động hoá Kubernetes để tạo mới các container cho việc triển khai của bạn, xoá các container hiện có và áp dụng tất cả các resource của chúng vào container mới.
*  Đóng gói tự động: Bạn cung cấp cho Kubernetes một cluster gồm các node mà nó có thể sử dụng để chạy các tác vụ được đóng gói (containerized task). Bạn cho Kubernetes biết mỗi container cần bao nhiêu CPU và bộ nhớ (RAM). Kubernetes có thể điều phối các container đến các node để tận dụng tốt nhất các resource của bạn.
*  Tự phục hồi: Kubernetes khởi động lại các containers bị lỗi, thay thế các container, xoá các container không phản hồi lại cấu hình health check do người dùng xác định và không cho các client biết đến chúng cho đến khi chúng sẵn sàng hoạt động.
*  Quản lý cấu hình và bảo mật: Kubernetes cho phép bạn lưu trữ và quản lý các thông tin nhạy cảm như: password, OAuth token và SSH key. Bạn có thể triển khai và cập nhật lại secret và cấu hình ứng dụng mà không cần build lại các container image và không để lộ secret trong cấu hình stack của bạn.
## Kiến trúc Kubernetes và các khái niệm khác
Từ một cấp độ cao, kiến trúc của kubernetes gồm **control plane**(**master node**), một hệ thống lưu trữ phân tán để giữ trạng thái của cluster (**etcd**), và một số **worker node**(**Kubelets**).
![Tổng quan về kiến trúc của kubernetes](https://images.viblo.asia/4c445286-cbc1-4451-a743-b8c76e349221.jpg)

### Kubernetes control plane (master node)

![Kubernetes control plane](https://images.viblo.asia/f02bb4d0-71e0-41ee-a7ef-5c0e7da6b79f.jpg)

Control plane là hệ thống duy trì bản ghi của tất cả các đối tượng Kubernetes. Control plane liên tục quản lý các trạng thái objects, phản hồi lại các thay đổi trong cluster, cũng hoạt động để làm cho trạng thái thực tế của các object hệ thống phù hợp với trạng thái mong muốn. Như hình minh họa trên cho thấy **control plane** gồm 3 thành phần chính:  **kube-apiserver**, **kube-controller-manager** và **kube-scheduler**. Tất cả đều có thể chạy trên một **master node**, hoặc có thể được **replicated** qua nhiều **master node** để tăng tính khả dụng (high avilability).

**API server** cung cấp các API để hỗ trợ điều phối vòng đời (scaling, updates, v.v.) cho các loại ứng dụng khác nhau. Nó cũng hoạt động như một cổng vào (**gateway**) của cluster, vì vậy **API server**  có thể truy cập được bởi các client bên ngoài cluster. Clients xác thực thông qua **API server**, và nó cũng như là một proxy/tunel đến các nodes và pods (và services).

Hầu hết các tài nguyên đều chưa metadata, như labels và annotations, desired state (trạng thái mong muốn) và observed state(trạng thái thực tế). Controllers hoạt động để điều khiển trạng thái thực tế về trạng thái mong muốn.

Có nhiều controllers khác nhau để điều khiển trạng thái của các nodes, replication (autoscaling), endpoint (services và pods), service accounts và tokens (namespaces). **Controller Manager** là một daemon chạy các vòng điều khiển cốt lõi, theo dõi trạng thái của cluster, và thực hiện các thay đổi để điều khiển trạng thái về trạng thái mong muốn. **Cloud Controller Manager** tích hợp vào các public cloud để hỗ trợ tối ưu cho các availability zones, VM instances, storage services, network services, routing và load balancing.

**The scheduler**  chịu trách nhiệm lên lịch cho các containers trên các nodes trong cluster, nó có các tính ràng buộc khác nhau, như giới hạn hoặc đảm bảo tài nguyên và các thông số kỹ thuật.

### Cluster nodes (worker)
![Cluster nodes (worker)](https://images.viblo.asia/54cedc88-5901-4c7b-a089-8b1169a07746.jpg)

Cluster nodes là các machine chạy các containers và được quản lý bới master nodes. **Kubelet** là controller chính và quan trọng trong kubernetes. Nó chịu trách nhiệm điều khiển các lớp thực thi container, thường là Docker.

### Pods

Pods là một trong những khái niệm quan trọng trong kubernetes, vì nó là cấu trúc chính mà các developer tương tác. Các khái niệm trước đây là tập trung vào cơ sở hạ tầng và kiến trúc nội bộ.

Cấu trúc logic này đóng gói một ứng dụng, có có chứa nhiều containers và nhiều storage volumes. Thông thường một container duy nhất (đôi khi có một số chương trình trợ giúp chạy trong container bổ sung) chạy trong cấu hình này.

![Pods](https://images.viblo.asia/326314c1-cfbe-4fc2-b04b-bbf7c432b6b3.jpg)

Ngoài ra, pods có thể được sử dụng để lưu trữ các ngăn xếp ứng dụng được tích hợp theo chiều dọc, như WordPress LAMP (Linux, Apache, MySQL, PHP). Một pod đại diện cho một process trên một cluster.

Pods có tuổi thọ hạn chế. khi bị thu nhỏ hay nâng cấp lên phiên bản mới các pods sẽ bị chết. Pods có thể scale tự động theo chiều ngang (tức là có thể tăng hoặc giảm số lượng instance), và thực hiện cập nhập liên tục.

Có nhiều loại pods khác nhau:

* **ReplicaSet**, măc định, là một loại tương đối đơn giản. Nó đảm bảo số lượng pods đang chạy.
* **Deployment**, là một cách khai báo để quản lý các pods thông qua ReplicaSets. Bao gồm cơ chế rollback và rolling update.
* **Daemonset** là cách để đảm bảo mỗi node sẽ run một instance của của pods. Được dùng cho các cluster services, như health monitoring và log forwarding.
* **StatefulSet** được điều chỉnh để quản lý các pods phải tồn tại hoặc duy trì trạng thái.
* **Job** và **CronJob** thực hiện các công việc ngắn hạn như một lần duy nhất hoặc theo lịch trình.

### Services

Services là cách kubernetes định cấu hình proxy để chuyển tiếp traffic truy cập tới một nhóm các pods. Thay vì chỉ định dựa trên địa chỉ static IP, service dùng selectors (hoặc labels) để xác định pod nào sử dụng service nào. Các nhiệm vụ động này giúp việc phát hành phiên bản mới hoặc thêm pods vào service thực sự dễ dàng. Bất cứ khi nào một Pod có cùng labels với một service được tạo ra, nó sẽ được gán cho service.

Theo mặc định, các services chỉ có thể truy cập bên trong cluster bằng cách sử dụng loại dịch vụ clusterIP. Các loại services khác không cho phép truy cập bên ngoài, **LoadBalancer type** loại phổ biến nhất trong triển khai trên cloud, nó sẽ tạo ra một bộ cân bằng tải cho mỗi service trên môi trường cloud, điều này tốn kém và với nhiều dịch vụ, nó cũng có thể trở nên rất phức tạp.

Để giải quyết sự phức tạp và chi phí đó, kubernetes hỗ trợ **Ingress** điều chỉnh cách người dùng bên ngoài truy cập các services đang chạy trong kubernetes cluster bằng cách sử dụng các quy tắc định tuyến HTTP dựa trên máy chủ hoặc URL.

Có nhiều bộ điều khiển Ingress khác nhau (Nginx, Ambassador), và có hỗ trợ cho các công cụ cân bằng tải cloud (Google, Amazon, microsoft).  Ingress controllers cho phép bạn expose nhiều services dưới cùng một địa chỉ IP, sử dụng cùng một load balancers.

Chức năng Ingress cũng vượt ra ngoài các quy tắc định tuyến cơ bản. Ingress cho phép cấu hình khả năng phục hồi (time-outs, rate limiting), định tuyến dựa trên nội dung, xác thực và hơn thế nữa.

### Kubernetes Networking
Networking kubernetes có một mô hình mạng đặt biệt cho toàn cluster, podto-pod networking. Trong hầu hết các trường hợp, **Container Network Interface (CNI)**  sử dụng một overlay network đơn giản (như Flannel) để che khuất network bên dưới khỏi pod bằng cách sử dụng đóng gói lưu lượng (như VXLAN), nó cũng có thể sử dụng một giải pháp được định tuyến đầy đủ như Calico, các pods giao tiếp qua cluster-wide pod network, được quản lý bởi nhà cung cấp CNI như Flannel hoặc Calico.

Trong một pod, các container có thể giao tiếp mà không có bất kỳ hạn chế nào. Containers trong pod tồn tại trong cùng một không gian tên mạng và chia sẻ một IP. Điều này có nghĩa là các containers có thể giao tiếp qua localhost. Pods có thể giao tiếp với nhau bằng địa chỉ pod IP, có thể truy cập được trên toàn bộ cluster.

Chuyển từ pods sang services hoặc từ các external sources sang services, yêu cầu thông qua kube-proxy.

### Persistent Storage trong Kubernetes
![Persistent Storage trong Kubernetes](https://images.viblo.asia/d8d9829d-c9de-40b9-a70d-0a1378be05f6.jpg)

Kubernetes sử dụng khái niệm volumes, về cốt lỗi một volume chỉ là một thư mục có thể có một số dữ liệu trong đó, có thể truy cập được vào pod. Thư mục đó ra sao, phương tiện hỗ trợ nó và nội dung của nó được xác định bởi loại volume cụ thể được sử dụng.

Kubernetes có một số loại lưu trữ, và những thứ này có thể được trộn và kết hợp trong một pod (như hình minh họa ở trên). Bất kỳ container nào trong pod cũng có thể tiêu thụ hết dung lượng lưu trữ trong pod. Bộ nhớ vẫn tồn tại khi pod khởi động lại, nhưng điều gì xảy ra sau khi xóa pod phụ thuộc vào loại bộ nhớ cụ thể.

Có nhiều tùy chọn để gắn cả file và block storage vào một pod. Những cái phổ biến nhất là các dịch vụ lưu trữ đám mây như Aws EBS và gcePersistentDisk hoặc các loại kết nối với cơ sở hạ tầng lưu trữ vật lý, như CephFS, Fibre Channel, iSCSI, NFS, Flocker hoặc glusterFS.

Có một số loại đặc biệt, như configMap và Secrets, được sử dụng để đưa thông tin được lưu trữ trong Kubernetes vào pod hoặc emptyDir, thường được sử dụng như scratch space.

**PersistentVolumes (PVs)**  liên kết với một tài nguyên lưu trữ hiện có và thường được cấp phép bởi quản trị viên. Chúng là các đối tượng toàn cluster được liên kết với nhà cung cấp bộ nhớ hỗ trợ để cung cấp các tài nguyên để sử dụng.

Đối với mỗi pod, một PersistentVolumeClaim thực hiện một yêu cầu sử dụng bộ nhờ trong một namspace, tùy thuộc vào việc sử dụng PV hiện tại, nó có thể có các giai đoạn hoặc trạng thái khác nhau: available, bound (không khả dụng với người khác), released (cần can thiệp thủ công) và failed (Kubernetes không thể lấy lại PV).

Cuối cùng, StorageClasses là một lớp trừu tượng để phân biệt chất lượng của lưu trữ bên dưới. Chúng có thể được sử dụng để phân biệt các đặc điểm khác nhau, như performance. StorageClasses không giống như labels, các nhà khai thác sử dụng chúng để mô tả các loại lưu trữ khác nhau, để bộ nhớ có thể được cấp phép động dựa trên các xác nhận quyền sở hữu đến từ pods. Chúng được sử dụng cùng với PersentlyVolumeClaims, đây là cách các pods yêu cầu động bộ nhớ mới. Loại phân bổ lưu trữ động này thường được sử dụng khi lưu trữ là service, như trong các nhà cung cấp đám mây hoặc hệ thống lưu trữ như CEPH.

### Discovering và Publishing services trong kubernetes


![Discovering và Publishing services trong kubernetes](https://images.viblo.asia/fb650ac3-df06-40ad-bd5f-fbb3451fc308.jpg)

Discovering services là một phần quan trọng cho một kubernetes lành mạnh, và kubernetes chủ yếu dựa vào dịch vụ DNS tích hợp của nó (hoặc Kube-DNS hoặc CoreDNS, tùy thuộc vào phiên bản cluster) để thực hiện việc này. Kube-DNS và CoreDNS tạo, cập nhật và xóa các bản ghi DNS cho các services và pods liên quan, như hình trên. Điều này cho phép các ứng dụng nhắm đến các services hoặc pods khác trong cluster thông qua một sơ đồ đặt tên đơn giản và nhất quán.

Ví dụ về bản ghi DNS cho kubernetes service:

```
service.namespace.svc.cluster.local
```
Một pod sẽ có một bản ghi DNS như:

```
10.32.0.125.namespace.pod.cluster.local
```

Có 4 loại service khác nhau, mỗi loại sẽ có hành vi khác nhau:

* ClusterIP chỉ expose service trên một internal IP. Điều này làm cho service chỉ có thể truy cập được từ trong cluster, đây là kiểu mặc định.

* NodePort  expose service trên IP của mỗi node tại một port cụ thể. Điều này cho phép các nhà phát triển tự do thiết lập bộ cân bằng tải của riêng họ.
* LoadBalancer expose service ra bên ngoài bằng cách sử dụng bộ cân bằng tải của nhà cung cấp dịch vụ đám mây. Điều này thường được sử dụng khi bộ cân bằng tải của nhà cung cấp đám mây được kubernetes hỗ trợ vì nó tự động hóa cấu hình.
* ExternalName sẽ chỉ ánh xạ bản ghi CNAME trong DNS, không có bất kỳ hình thức ủy thác nào được thiết lập. Điều này thường được sử dụng để tạo một service bên trong Kubernetes để đại diện cho một kho dữ liệu bên ngoài giống như một cơ sở dữ liệu chạy bên ngoài Kubernetes. Một trường hợp sử dụng tiềm năng sẽ là sử dụng AWS RDS làm cơ sở dữ liệu sản xuất và một  MySQL container cho môi trường testing.

### Namespaces, Labels, và Annotations

Namespaces như là một virtual cluster trong một physical cluster, chúng có nghĩa là cung cấp cho nhiều nhóm, người dùng và dự án một môi trường gần như tách biệt để làm việc, và ngăn các nhóm cản đường nhau bằng cách giới hạn những gì mà nhóm đối tượng kubernetes có thể xem và truy cập.

labels phân biệt các tài nguyên trong một không gian tên duy nhất. Chúng là các cặp key/value mô tả các thuộc tính và có thể được sử dụng để tổ chức và chọn các subsets của các đối tượng. labels cho phép thực hiện các truy vấn, theo dõi hiệu quả và lý tưởng để sử dụng trong các giao diện hướng người dùng để ánh xạ cấu trúc tổ chức lên các đối tượng kubernetes.

Annotations thường được sử dụng cho công cụ declarative configuration, build, release hoặc thông tin image, hoặc thông tin liên hệ cho những người có trách nhiệm.

## Các Kubernetes tools

[Kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) khởi động một cluster. Nó được thiết kế để đơn giản để người dùng mới xây dựng các cluster

[Kubectl](https://kubernetes.io/docs/reference/kubectl/) là công cụ để thao tác với cluster hiện có của bạn.

[minikube](https://minikube.sigs.k8s.io/docs/start/) là một công cụ giúp bạn dễ dàng chạy Kubernetes ở local. Đối với người dùng Mac, HomeBrew làm cho việc sử dụng Minikube trở nên đơn giản hơn.