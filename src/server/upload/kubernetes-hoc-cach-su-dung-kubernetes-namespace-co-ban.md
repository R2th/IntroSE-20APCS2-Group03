# Namespace trong Kubernetes là gì?
Namespace trong Kubernetes được thiết kế để sử dụng trong môi trường có nhiều người dùng trải rộng trên nhiều team hoặc nhiều project khác nhau. Namespace cung cấp một phạm vi cho các đối tượng tài nguyên Kubernetes. Mỗi tài nguyên Kubernetes chỉ có thể nằm trong một namespace. Tên của các tài nguyên Kubernetes chỉ cần là duy nhất trong một namespace duy nhất. Các namespace khác nhau có thể có các tài nguyên có cùng tên. Tên của các namespace phải khác nhau và chúng không thể được lồng vào nhau. 
# Tại sao nên sử dụng namespace?

Kubernetes namespace được sử dụng để phân vùng các cụm lớn thành các nhóm nhỏ hơn, dễ quản lý và nhận dạng. Namespace cho phép bạn tách biệt môi trường staging, QA, production hoặc developement riêng biệt và phân bổ tài nguyên đầy đủ trong một namespace duy nhất.

Nếu nhiều người dùng có quyền truy cập vào cùng một cụm, bạn có thể giới hạn người dùng và cho phép họ hoạt động trong giới hạn của một namespace cụ thể. Tách biệt người dùng là một cách tuyệt vời để phân định tài nguyên và tránh xung đột từ cách đặt tên gọi các tài nguyên hoặc version.

Namespace cũng là một loại tài nguyên Kubernetes và rất dễ dàng khởi tạo. Sau đó, bạn có thể sử dụng namespace để quản lý việc triển khai các tài nguyên bổ sung vào namespace cụ thể.
# Sử dụng và quản lý namespace

### Namespace "default"

Mặc định, sau khi chúng ta cài đặt một cụm Kubernetes đã có sẵn 4 namespace được tạo sẵn, đó là `default`, `kube-public`, `kube-system` và `kube-node-lease`:
- `default`:  là namespace mặc định được sử dụng cho các tài nguyên Kubenetes được deploy mà không chỉ định một namespace cụ thể nào khác. 
- `kube-system`: là namespace chứa các tài nguyên là các thành phần chính của một cụm Kubernetes cluster, được tạo bởi Kubernetes system. Namespace này chứa các tài nguyên hệ thống quan trọng, vì vậy, khi sử dụng cụm, nên giữ cho namespace này chạy độc, tách biệt với các service và ứng dụng riêng của chúng ta.
- `kube-public`: Namespace này được tạo tự động khi cài đặt cụm và được Kubernetes quy ước là một namespace chứa các tài nguyên public có thể truy cập công khai trong toàn bộ cụm. Thực tế, thông thường, kube-public không được sử dụng nhiều. 
- `kube-node-lease`: Kể từ Kubernetes version 1.13, tính năng *cho thuê node* được giới thiệu là một tính năng alpha (`NodeLease`). Khi tính năng `NodeLease` được bật, mỗi node sẽ có một đối tượng `Lease` được liên kết trong namespace `kube-node-lease`, namespace được làm mới định kì, *node lease* được coi như tín hiệu từ node. Các node lease được làm mới thường xuyên và node lease nhẹ hơn nhiều so với `NodeStatus` (được sử dụng ở các version trước 1.13) nên tính năng này làm cho tín hiệu của node trở nên rẻ hơn đáng kể từ cả hai khía cạnh là khả năng mở rộng và hiệu suất.

### Tạo namespace

Một điều quan trọng mình phải nói với các bạn là, đừng ngại việc tạo các namespace vì điều này không làm giảm hiệu suất cụm của bạn mà trong nhiều trường hợp còn giúp cải thiện hiệu suất khi phân chia các đối tượng tài nguyên vào các namespace vì việc hoạt động với từng nhóm đối tượng giúp Kubernetes API hoạt động hiệu quả hơn. 

Chúng ta có thể tạo các namespace theo hai cách
- Sử dụng `kubectl` command, rất đơn giản, chỉ cần thực hiện:

`kubectl create namespace [Tên namespace]`

- Hoặc tạo manifest file với Yaml rồi sử dụng `kubectl apply` để thực thi file này, ví dụ với file `test-namespace.yaml` đơn giản như sau:
```
kind: Namespace
apiVersion: v1
metadata:
  name: viblo
  labels:
    name: viblo
````
`kubectl apply -f test-namespace.yaml`
### Kiểm tra namespace

Để kiểm tra các namespace  có trong cụm, ta có thực hiện các lệnh `kubectl get namespace`  để liệt kê các namespace có trong cụm và các thông tin cơ bản.
```
thanhthu ~ kubectl get namespace                             
NAME              STATUS   AGE
kube-system       Active   168d
default           Active   168d
kube-public       Active   168d
kube-node-lease   Active   168d
ingress-nginx     Active   168d
cert-manager      Active   168d
test              Active   115d
harbor            Active   78d
test-resources    Active   67d
viblo             Active   2m17s
```

Hoặc lấy thông tin mô tả về các namespace với `kubectl describe`
```
thanhthu ~ kubectl describe namespace kube-system
Name:         kube-system
Labels:       <none>
Annotations:  <none>
Status:       Active

No resource quota.

No LimitRange resource.
```
### Tạo tài nguyên Kubernetes trong một namespace

Để tạo các đối tượng tài nguyên Kubernetes vào các namespace cụ thể, ta sẽ viết các manifest file yaml define các đối tượng tài nguyên và sử dụng `kubectl apply` để cài đặt chúng.
Ví dụ, ta có 1 file yaml define một deployment như sau:
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: test
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
`kubectl apply -f  test/deployment-nginx.yaml`

Ngoài ra, nếu bạn chỉ định 1 namespace trong file yaml thì khi thực thi file yaml đối tượng của bạn sẽ luôn được triển khai vào namespace đó. Nếu bạn muốn sử dụng lại cùng 1 file yaml để triển khai cùng 1 đổi tượng tài nguyên lên nhiều namespace khác nhau, để thuận tiện hơn, thay vì xác định namespace ngay trong file yaml, bạn cũng có thể sử dụng cờ `--namespace` hoặc `-n` để xác định namespace cho đối tượng tài nguyên được triên khai.

`kubectl apply -f  test/deployment-nginx.yaml --namespace test`

### Kiểm tra các tài nguyên được tạo trong một namespace

Để tìm và xem thông tin các tài nguyên trong một namespace cụ thể, chúng ta cũng sử dụng các command `kubectl get` và `kubectl describe` và thêm cờ `--namespace` hoặc `-n`. Ví dụ:

```
thanhthu ~ kubectl get deployment -n test
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   1/1     1            1           71s
thanhthu ~ kubectl get pods -n test      
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-6b474476c4-tvgsk   1/1     Running   0          18m
thanhthu ~ kubectl describe pods nginx-deployment-6b474476c4-tvgsk -n test
Name:         nginx-deployment-6b474476c4-tvgsk
Namespace:    test
Priority:     0
Node:         i121035-lt/192.168.19.60
Start Time:   Fri, 15 Jan 2021 15:57:19 +0700
Labels:       app=nginx
              pod-template-hash=6b474476c4
Annotations:  <none>
Status:       Running
IP:           10.42.0.221
IPs:
  IP:           10.42.0.221
Controlled By:  ReplicaSet/nginx-deployment-6b474476c4
Containers:
  nginx:
[...]
```

# Truy cập giữa các service khác namespace

Trong Kubernetes, namespace được sử dụng để isolate tài nguyên. Tuy nhiên, trong nhiều trường hợp, tùy theo yêu cầu của ứng dụng mà bạn cần truy cập đến các service thuộc các namespace khác nhau. Để thực hiện được điều này, bạn sẽ có 2 cách.
- Cách thứ nhất, bạn có thể sử dụng trực tiếp địa chỉ IP được cấp phát cho service sau khi tạo. Xem thêm tại [Kubernetes documents - Discovering services](https://kubernetes.io/docs/concepts/services-networking/service/#discovering-services)
- Cách thứ hai, thay vì sử dụng địa chỉ IP, bạn có thể truy cập đến một service khác namespace dựa trên tên DNS của chúng theo dạng `<your-service-name>.<your-namespace>.svc.cluster.local`. Xem thêm tại [Kubernetes documents - DNS pod service](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#services)

# Tạm kết
Qua bài viết này, mình đã giới thiệu đến các bạn những khái niệm và cách sử dụng cơ bản của Kubernetes namespace, hi vọng các bạn sẽ cảm thấy hữu ích và tiếp tục ủng hộ mình ở các bài viết sau nhé!
# Nguồn tham khảo
- https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
- https://kubernetes.io/docs/concepts/services-networking/service/#discovering-services
- https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#services