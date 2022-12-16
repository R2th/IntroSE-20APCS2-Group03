# Mở đầu

**Kubectl** là công cụ quản trị Kubernetes thông qua giao diện dòng lệnh, cho phép bạn thực thi các câu lệnh trong Kubernetes cluster. Kubectl sử dụng Kubernetes API để tương tác với Kubernetes cluster. Để có thể sử dụng kubectl trong cluster, bạn sẽ cần phải thực hiện một số bước cài đặt và cấu hình cho nó, hãy xem thêm tại [đây](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Thông qua các lệnh kubectl, bạn có thể triển khai các ứng dụng, theo dõi và quản lý tài nguyên của cluster. Trong bài viết này, mình sẽ cùng các bạn tìm hiểu các câu lệnh cơ bản nhất của kubectl, rất cần thiết cho việc quản trị các hệ thống Kubernetes.

![](https://images.viblo.asia/8a48bec6-3b27-4bf2-8d25-4461e9cec043.png)

# Tạo và quản lý tài nguyên trong cluster
### Kubectl create

Giả sử bạn đã có một Kubernetes cluster đang hoạt động, giờ đây bạn có thể triển khai ứng dụng của mình lên trên cluster. Để triển khai một ứng dụng lên cluster của mình, bạn cần tạo ra nhiều các loại tài nguyên khác nhau. Và với kubectl, bạn có thể tạo gần như bất cứ loại tài nguyên nào trong 1 cụm. Tài nguyên bạn tạo ra có thể bao gồm: namespace (ns), deployment, service, cronjob (cj), job. Bạn có thể quan sát một số ví dụ dưới đây:

*Tạo một namespace mới*
```
thanhthu ~ kubectl create namespace hello
 namespace/hello created
```

*Tạo một deployment redis, sử dụng image redis*
```
thanhthu ~ kubectl create deployment redis --image=redis 
deployment.apps/redis created
```

*Tạo một job in ra "Hi, thanhthu"*
```
thanhthu ~ kubectl create job hi --image=busybox -- echo "Hi, thanhthu"
job.batch/hi created
```

### Kubectl edit

Sau khi đã tạo ra các tài nguyên cần thiết cho ứng dụng của mình, rất có thể trong quá trình test, vận hành sau đó bạn sẽ cần phải cập nhật và chỉnh sửa lại chúng. Khi đó, chúng ta có thể nghĩ đến việc sử dụng lệnh `kubectl edit`. Với lệnh này, bạn có thể chỉnh sửa bất cứ tài nguyên nào đang chạy trên cụm của mình. 

Ví dụ, khi bạn muốn chỉnh sửa job vừa tạo ở trên, bạn có thể sử dụng lệnh `Kubectl edit deployment/edit`. Sau đó, file config của job này sẽ được mở với trình soạn thảo văn bản mặc định của bạn như sau:
```
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "1"
  creationTimestamp: "2020-12-17T02:20:22Z"
  generation: 1
  labels:
    app: redis
  managedFields:
  - apiVersion: apps/v1
    fieldsType: FieldsV1
    fieldsV1:
      f:metadata:
        f:annotations:
          .: {}
          f:deployment.kubernetes.io/revision: {}
      f:status:
        f:availableReplicas: {}
        f:conditions:
          .: {}
          k:{"type":"Available"}:
            .: {}
            f:lastTransitionTime: {}
            f:lastUpdateTime: {}
            f:message: {}           
```

Sau đó bạn có thể chỉnh sửa những config cần thiết rồi lưu chúng lại:
```
thanhthu ~ kubectl edit deployment/redis
deployment.apps/redis edited
```

### Kubectl delete

Khi bạn không còn cần dùng đến một tài nguyên nào đó, hãy sử dụng kubectl để xóa chúng đi để tránh lãng phí tài nguyên của cụm. Ví dụ:
```
thanhthu ~ kubectl delete job hi   
job.batch "hi" deleted
thanhthu ~ kubectl delete namespace hello            
namespace "hello" deleted
```

*Lưu ý:* Một lưu ý nho nhỏ là sau khi một tài nguyên bị xóa đi thì nó sẽ không thể khôi phục lại được mà bạn buộc phải tạo lại nó. Vậy nên trước khi xóa một tài nguyên nào đó, bạn hãy chắc chắn hiểu về tài nguyên đó và biết mình đang làm gì nhé :))) 
# Kubectl apply
Ngoài các cách tạo và chỉnh sửa tài nguyên kubernetes cluster đã nêu ở trên thì chúng ta còn có lệnh `kubectl apply`. So với việc sử dụng `kubectl create` hay `kubectl edit` thì `kubectl apply` mang lại nhiều sự linh hoạt hơn.  `kubectl apply`  quản lý các ứng dụng thông qua các tệp định nghĩa tài nguyên Kubernetes. Các tệp định nghĩa tài nguyên trong Kubernetes được gọi là các manifest file và có thể được viết bằng `yaml` hoặc `json`. Nó tạo và cập nhật các tài nguyên trong một cluster thông qua việc chạy `kubectl apply`. Đây là phương pháp tạo và sử dụng tài nguyên thường được áp dụng trong thực tế.

Ví dụ, tôi có một manifest file yaml có tên là deployment-nginx.yaml định nghĩa một deployment đơn giản như sau:
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

Sau đó, để tạo deployment trên, tôi chỉ cần thực hiện lệnh với cấu trúc `kubectl apply (-f FILENAME | -k DIRECTORY)`. 
```
thanhthu ~ kubectl apply -f deployment-nginx.yaml            
deployment.apps/nginx-deployment created
```

Để cập nhật các tài nguyên, ta chỉ cần chỉnh sửa các manifest file và thực hiện apply lại chúng.

# Theo dõi, giám sát và khắc phục lỗi

Khi các ứng dụng triển khai trên cluster của bạn gặp lỗi hoặc khi vấn đề xuất phát từ chính cluster của bạn thì làm thế nào để bạn có thể tìm ra lỗi và khắc phục chúng? Trong những tình huống như vậy, người quản trị cluster thường sẽ nghĩ ngay đến việc sử dụng các lệnh kubectl để tìm ra nguyên nhân cũng như tìm ra cách giải quyết. Kubectl cung cấp nhiều các lệnh rất hữu ích giúp ta thực hiện điều đó. 

### Kubectl get

Câu lệnh `kubectl get` dùng để lấy danh sách về một đối tượng tài nguyên trong cluster, cùng với các thông tin cơ bản. Ví dụ:
```
thanhthu ~ kubectl get pods                            
NAME                                READY   STATUS    RESTARTS   AGE
redis-85d47694f4-tqp9d              1/1     Running   0          3h49m
nginx-deployment-6b474476c4-gkcbb   1/1     Running   0          122m
thanhthu ~ kubectl get namespaces  
NAME              STATUS   AGE
kube-system       Active   139d
default           Active   139d
kube-public       Active   139d
kube-node-lease   Active   139d
ingress-nginx     Active   138d
cert-manager      Active   138d
thanhthu  ~  kubectl get node         
NAME         STATUS   ROLES    AGE    VERSION
i121035-lt   Ready    master   139d   v1.18.6+k3s1
thanhthu ~ kubectl get secret             
NAME                  TYPE                                  DATA   AGE
default-token-5xdxb   kubernetes.io/service-account-token   3      139d
```

Ngoài ra, để lấy thông tin của một đối tượng với các thông số đầu đủ hơn, ta có thể sử dụng thêm tùy chọn `-o wide`, hoặc sử dụng tùy chọn `-o yaml` để lấy thông tin dưới dạng yaml  như sau:
```
thanhthu ~ kubectl get pod -o wide    
NAME                                READY   STATUS    RESTARTS   AGE     IP            NODE         NOMINATED NODE   READINESS GATES
redis-85d47694f4-tqp9d              1/1     Running   0          3h58m   10.42.0.165   i121035-lt   <none>           <none>
nginx-deployment-6b474476c4-gkcbb   1/1     Running   0          131m    10.42.0.169   i121035-lt   <none>           <none>
thanhthu ~ kubectl get pod -o yaml       
apiVersion: v1
items:
- apiVersion: v1
  kind: Pod
  metadata:
    creationTimestamp: "2020-12-17T02:20:22Z"
    generateName: redis-85d47694f4-
    labels:
      app: redis
      pod-template-hash: 85d47694f4
    managedFields:
    - apiVersion: v1
      fieldsType: FieldsV1
      fieldsV1:
        f:metadata:
          f:generateName: {}
          f:labels:
            .: {}
            f:app: {}
```
Khi xảy ra lỗi, sử dụng `kubectl get` sẽ giúp ta có thể xác định được lỗi đang nằm ở đối tượng nào trong cluster.
### Kubectl describe

Với `kubectl describe`, ta có thể lấy được thông tin mô tả chi tiết  về một loại đối tượng. Trường hợp sử dụng phổ biến nhất của câu lệnh này là xem thông tin mô tả của một pod hay một node trong cụm để xem có lỗi được mô tả trong phần `Events` hay không hoặc tài nguyên có bị hạn chế hay không.
```
thanhthu ~ kubectl describe pods redis-85d47694f4-tqp9d                                       
Name:         redis-85d47694f4-tqp9d
Namespace:    default
Priority:     0
Node:         i121035-lt/192.168.19.38
Start Time:   Thu, 17 Dec 2020 09:20:22 +0700
Labels:       app=redis
              pod-template-hash=85d47694f4
Annotations:  <none>
Status:       Running
IP:           10.42.0.165
IPs:
  IP:           10.42.0.165
Controlled By:  ReplicaSet/redis-85d47694f4
Containers:
  redis:
    Container ID:   docker://38aedd80a7b28383b7512c26def6acd02727ba31d3d61b4a3adbf2d4672cfea2
    Image:          redis
    Image ID:       docker-pullable://redis@sha256:0f724af268d0d3f5fb1d6b33fc22127ba5cbca2d58523b286ed3122db0dc5381
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Thu, 17 Dec 2020 09:20:34 +0700
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-5xdxb (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  default-token-5xdxb:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-5xdxb
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:          <none>
```
### Kubectl logs

Trong khi `kubectl describe` chủ yếu cho bạn biết thông tin về các sự khiện xảy ra với các ứng dụng đang chạy trong các pods của mình thì `kubectl logs` cung cấp chi tiết về tất cả những gì đang diễn ra trong kubernetes cluster của bạn liên quan đến một pod cụ thể. Bạn cũng cần hiểu được sự khác biệt này để xác định được lỗi xảy ra nằm bên trong ứng dụng của bạn hay nằm ở phía Kubernetes.

```
 thanhthu  ~  kubectl logs redis-85d47694f4-tqp9d                                       
1:C 17 Dec 2020 02:20:34.518 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 17 Dec 2020 02:20:34.518 # Redis version=6.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 17 Dec 2020 02:20:34.518 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 17 Dec 2020 02:20:34.519 * Running mode=standalone, port=6379.
1:M 17 Dec 2020 02:20:34.519 # Server initialized
1:M 17 Dec 2020 02:20:34.520 * Ready to accept connections
```
### Kubectl exec

Để khắc phục lỗi hoặc khi các lệnh đã nêu ở trên đều không mang lại cho bạn các thông tin cần thiết để tìm ra lỗi, rất có thể bạn sẽ phải truy cập vào một container cụ thể trong pod để khắc phục sự cố trực tiếp từ trong container. Cấu trúc của lệnh `kubectl exec` như sau:

`kubectl exec (POD | TYPE/NAME) [-c CONTAINER] [flags] -- COMMAND [args...]`

Ví dụ:
```
 thanhthu ~ kubectl exec -it redis-85d47694f4-tqp9d -c redis -- /bin/bash
root@redis-85d47694f4-tqp9d:/data# 
```

*Lưu ý*: Với pod chỉ chứa 1 container thì bạn không cần chỉ định thêm tên container trong pod. Tuy nhiên với pod chứa nhiều container thì bạn cần sử dụng thêm tùy chọn `-c` để chỉ định tên của một container cụ thể. Ngoài ra, lệnh `kubectl exec` phải luôn đi kèm với shell mà bạn đang sử dụng trong pod.
# Tạm kết

Trên đây là những câu lệnh cơ bản nhất mình thường sử dụng để quản trị một cụm Kubernetes cluster. Ngoài ra, còn rất nhiều các lệnh cùng nhiều tùy chọn khác nhau. Kubectl là một công cụ mạnh mẽ và rất hữu ích cho công việc quản trị cụm, bạn có thể tham khảo thêm một số lệnh khác từ [Kubectl Cheat sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/) này nhé. Cảm ơn các bạn đã theo dõi bài viết của mình!  
# Nguồn tham khảo

- https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- https://opensource.com/article/20/5/kubectl-cheat-sheet