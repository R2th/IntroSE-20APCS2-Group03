# Giới thiệu
Xin chào các bạn, chúng ta lại tiếp tục với series k8s basic. Các nội dung đã có trong series:

* [Session 1: Tổng quan các thành phần của kubernetes](https://viblo.asia/p/k8s-basic-tong-quan-cac-thanh-phan-cua-kubernetes-aAY4ql7qVPw)
* [Session 2 P1:  Cài đặt môi trường Lab - Phần 1](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-1-3kY4gWdy4Ae)
* [ Session 2 P2:  Cài đặt môi trường Lab - Phần 2](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-2-bXP4W5yYL7G)
* [Session 3: Làm việc với Node trên K8S](https://viblo.asia/p/k8s-basic-lam-viec-voi-node-tren-k8s-7ymJXKQr4kq)
* [Session 4: Kubernetes Pods](https://viblo.asia/p/k8s-basic-kubernetes-pods-5pPLkG3nLRZ)
* [Session 5: Kubernetes Deployment and ReplicaSet](https://viblo.asia/p/k8s-basic-kubernetes-deployments-and-replicaset-obA46Po9LKv)
* [Session 6: Kubernetes Service](https://viblo.asia/p/k8s-basic-kubernetes-services-7ymJXKZa4kq)
* [Session 7: Kubernetes Ingress](https://viblo.asia/p/k8s-basic-kubernetes-ingress-pgjLNb39L32)

**Trong bài hôm nay chúng ta sẽ tìm hiểu về khái niệm rất quan trọng trong K8S đó là Namespace**

![image.png](https://images.viblo.asia/3ae2684d-14b0-4d03-a979-ec292300ac54.png)

# Kubernetes Namespace là gì
## Khái niệm về Namespace
Trong Kubernetes, Namespace là cơ chế để chúng ta có thể tách biệt các nhóm tài nguyên (như Pod, Deployment hay Service...) trong cùng một cluster. Tên của các tài nguyên này là duy nhất trong Namespace đó, nhưng có thể được sử dụng ở một Namespace khác. 

Ví dụ nếu ta đã tạo Pod tên là **nginx1** trong Namespace **demo1** thì ta không thể tạo thêm Pod **nginx1** trong Namespace **demo1** này nữa vì đã tồn tại rồi. Tuy nhiên ta vẫn có thể tạo Pod **nginx1** trong Namespace **demo2** mà không sợ trùng với Pod **nginx1** ở Namespace **demo1** vì chúng ở 2 Namespace khác nhau. 

Các Namespace khác nhau được phân biệt bởi tên Namespace. Namespace có cấu trúc phẳng, tức là ta không thể tạo Namespace bên trong Namespace được.

**Các tài nguyên (resource) trên k8s chia làm 2 loại:** 
- Tài nguyên mức Namespace: Tức là thuộc quản lý của 1 Namespace nào đó. Ví dụ Pods, Deployments, Services...
- Tài nguyên mức Cluster: Không thuộc một Namespace cụ thể nào mà thuộc quản lý của Cluster như Nodes, StorageClass, Persistent Volumes...

Hình sau sẽ giúp bạn hình dung được rõ hơn về Namespace và thành phần bên trong nó:
![namespaces.png](https://images.viblo.asia/8ecceb34-1a7a-4fd0-9cc3-db7d4f372943.png)
























































































































## Phân biệt tài nguyên mức Namespace và mức Cluster
Các loại tài nguyên trên K8S có thể được liệt kê bằng lệnh sau:
```
kubectl api-resources
```

Từ đó các bạn có thể tự kiểm tra được đâu là tài nguyên mức Namespace giá trị ở cột "**NAMESPACED**" bằng **true**. Các bạn có thể liệt kê ra bằng lệnh sau:
```
[sysadmin@vtq-cicd example]$ kubectl api-resources -owide --namespaced=true
NAME                        SHORTNAMES   APIVERSION                     NAMESPACED   KIND                       VERBS
configmaps                  cm           v1                             true         ConfigMap                  [create delete deletecollection get list patch update watch]
endpoints                   ep           v1                             true         Endpoints                  [create delete deletecollection get list patch update watch]
pods                        po           v1                             true         Pod                        [create delete deletecollection get list patch update watch]
replicationcontrollers      rc           v1                             true         ReplicationController      [create delete deletecollection get list patch update watch]
serviceaccounts             sa           v1                             true         ServiceAccount             [create delete deletecollection get list patch update watch]
services                    svc          v1                             true         Service                    [create delete get list patch update watch]
deployments                 deploy       apps/v1                        true         Deployment                 [create delete deletecollection get list patch update watch]
replicasets                 rs           apps/v1                        true         ReplicaSet                 [create delete deletecollection get list patch update watch]
<output truncated>
```

Tương tự, các tài nguyên mức Cluster giá trị ở cột "**NAMESPACED**" bằng **false**. Các bạn có thể liệt kê ra bằng lệnh sau:
```
[sysadmin@vtq-cicd example]$ kubectl api-resources -owide --namespaced=false
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND                             VERBS
namespaces                        ns           v1                                     false        Namespace                        [create delete get list patch update watch]
nodes                             no           v1                                     false        Node                             [create delete deletecollection get list patch update watch]
clusters                                       management.cattle.io/v3                false        Cluster                          [delete deletecollection get list patch create update watch]
nodes                                          metrics.k8s.io/v1beta1                 false        NodeMetrics                      [get list]
ingressclasses                                 networking.k8s.io/v1                   false        IngressClass                     [create delete deletecollection get list patch update watch]
clusterrolebindings                            rbac.authorization.k8s.io/v1           false        ClusterRoleBinding               [create delete deletecollection get list patch update watch]
clusterroles                                   rbac.authorization.k8s.io/v1           false        ClusterRole                      [create delete deletecollection get list patch update watch]
storageclasses                    sc           storage.k8s.io/v1                      false        StorageClass                     [create delete deletecollection get list patch update watch]
<output truncated>
```

NOTE: Các bạn để ý một số resource có tên viết tắt thì có thể sử dụng tên viết tắt cho ngắn gọn. Ví dụ thay vì bạn phải gõ "**kubectl get deployments**" thì có thể viết gọn là "**kubectl get dp**"

## Khi nào nên sử dụng Namespace
Namespace thường được sử dụng trong trường hợp trên một K8S Cluster mà có nhiều team khác nhau cùng sử dụng, hoặc triển khai nhiều Project khác nhau. Lúc này việc tạo Namespace sẽ giúp tách biệt các tài nguyên của các team/project với nhau.

Chúng ta cũng có thể cấu hình giới hạn tài nguyên của các Namespace tùy vào nhu cầu của từng  team/project khác nhau.

# Làm việc với  Namespace
## Các namespace mặc định của K8S
Mặc định, sau khi chúng ta cài đặt một cụm Kubernetes đã có sẵn 4 namespace được tạo sẵn, đó là default, kube-public, kube-system và kube-node-lease:
- **default**: Khi thao tác với các tài nguyên ở mức namespace mà không chỉ định cụ thể Namespace nào thì mặc định hiểu là thao tác trên Namespace **default** này.
- **kube-system**: Các thành phần Control Plane của K8S được triển khai ở namespace này. Thường thì chúng ta không triển khai các ứng dụng hay workload gì vào namespace này.
- **kube-public**: Các tài nguyên được triển khai ở Namespace **kube-public** có thể được truy cập công khai trong toàn bộ cụm Kubernetes này.
- **kube-node-lease**: Cái này mình ít thấy sử dụng nên các bạn có nếu muốn thì tham khảo thêm trên trang chủ của kubernetes nhé!

## Thao tác với Namespace
### Xem danh sách Namespace có trong K8S Cluster:
```
kubectl get namespace
```
Kết quả sẽ như thế này:
```
NAME              STATUS   AGE
default           Active   1d
kube-node-lease   Active   1d
kube-public       Active   1d
kube-system       Active   1d
```

**Các bạn có thể tạo mới namespace bằng câu lệnh sau:**
```
kubectl create namespace [namespace-name]
```

**Các bạn có thể xóa namespace bằng câu lệnh sau:**
```
kubectl delete namespace [namespace-name]
```
Lúc này mọi tài nguyên trong namespace trên sẽ đều bị xóa khỏi hệ thống.

### Chỉ định Namespace trong các câu lệnh kubectl
Khi chúng ta thực hiện các câu lệnh kubectl để thao tác với các tài nguyên mức namespace trong k8s thì ta cần set thông tin namespace mà chúng ta muốn thao tác bằng cách thêm tham số sau vào lệnh gọi kubectl: "**--namespace=[namespace-name]**" hoặc ngắn gọn hơn "**-n [namespace-name]**".

Nếu không set thì mặc định hệ thống sẽ hiểu là chúng ta đang thao tác trên namespace **default**.

Ví dụ các bạn muốn liệt kê sanh sách Pods ở namespace **kube-system**:
```
[sysadmin@vtq-cicd example]$ kubectl -n kube-system get pods
NAME                                            READY   STATUS    RESTARTS   AGE
coredns-657959df74-75j98                        1/1     Running   1          43d
coredns-657959df74-7hn8f                        1/1     Running   1          43d
dns-autoscaler-b5c786945-vgnpj                  1/1     Running   1          43d
kube-apiserver-viettq-master1                   1/1     Running   1          42d
kube-apiserver-viettq-master2                   1/1     Running   1          42d
kube-apiserver-viettq-master3                   1/1     Running   1          42d
kube-controller-manager-viettq-master1          1/1     Running   7          42d
kube-controller-manager-viettq-master2          1/1     Running   10         42d
kube-controller-manager-viettq-master3          1/1     Running   8          42d
[output-truncated]
```

## Namespace và DNS
Trong [bài về Service](https://viblo.asia/p/k8s-basic-kubernetes-services-7ymJXKZa4kq) chúng ta đã biết cách expose ứng dụng ra bên ngoài k8s bằng Service. Tuy nhiên không phải ứng dụng nào cũng cần expose ra ngoài k8s, ví dụ như DB, hay các message queue sử dụng cho internal.

Lúc này các ứng dụng sẽ chỉ cần expose bằng Service dạng ClusterIP. Mỗi Service khi được tạo ra thì hệ thống cũng tạo ra một bản ghi DNS để lưu thông tin ánh xạ từ **server name** về **service ClusterIP**. Bản tin DNS này có dạng như sau:
```
[service-name].[namespace-name].svc.cluster.local
```
Có nghĩa là nếu một Container trong k8s kết nối tới **service-name** thì nó service-name này sẽ được phân giải theo tên service của cùng namespace với Container đó. 

Trong trường hợp muốn kết nối tới service ở namespace khác thì bạn phải sử dụng tên đầy đủ (FQDN) của service đó theo format bên trên. 

**Ví dụ:**
- ContainerA ở namespace **db** muốn kết nối tới service **postgres** ở namespace **db** thì nó chỉ cần kết nối tới địa chỉ là "**postgres**" vì đây là service trong cùng namespace do đó chỉ cần service name là đủ.
- ContainerB ở namespace **dev** muốn kết nối tới service **postgres** ở namespace **db** thì nó phải thực hiện kết nối tới địa chỉ là "**postgres.db.svc.cluster.local**".

# Thực hành
## Thao tác với namespace
**Task01:**
```
Liệt kê danh sách các namespace trên hệ thống
Liệt kê danh sách Pod có trong namespace **kube-system**
Liệt kê danh sách daemonsets có trong namespace **kube-system**
Liệt kê danh sách deployments có trong namespace **kube-system**
```

**Task02:**
```
Tạo mới 2 namespace là **demo1** và **demo2**
Tạo mới một Pod trong namespace "demo1" tên là "mynginx" sử dụng image là "nginx" sử dụng port 80
Tạo mới một Pod trong namespace "demo2" tên là "mynginx" sử dụng image là "nginx" sử dụng port 80
Kiểm tra trạng thái của các Pod mới tạo ở mỗi namespace
```

**Task03:**
```
Ở namesapce "demo1" tạo service "mynginx-service" dạng ClusterIP sử dụng Port 8081 để expose Pod "mynginx".
Ở namesapce "demo2" tạo service "mynginx-service" dạng ClusterIP sử dụng Port 8082 để expose Pod "mynginx".
Kiểm tra kết quả thực hiện tạo các service (kiểm tra endpoint của service)
```

**Task04:**

Kết nối vào bên trong Pod "mynginx" ở namespace "demo1" bằng lệnh
```
k -n demo1 exec -it mynginx -- bash
```
Sau đó đứng từ bên trong Pod "mynginx" thực hiện và kiểm tra kết quả các yêu cầu sau:
```
Gọi service "nginx-service" ở namespace "demo1" bằng lênh curl
Gọi service "nginx-service" ở namespace "demo2" bằng lênh curl
```

Các task basic này sẽ giúp các bạn hiểu và nhớ được các lệnh thao tác với hệ thống. Nếu có vướng mắc gì các bạn comment bên dưới mình sẽ giải đáp.


***Rất cảm ơn các bạn đã theo dõi và rất mong nhận được sự ủng hộ của các bạn bằng cách cho mình 1 UPVOTE vào các bài viết để thêm động lực ra thêm nhiều bài nữa nhé!***