Chào các bạn, ở bài viết [Cảm ngộ ban đầu về Kubernetes](https://viblo.asia/p/cam-ngo-ban-dau-ve-kubernetes-aWj53LyeK6m) trước, chúng ta đã tìm hiểu sơ lược, tổng quan về Kubernetes cũng như có một chút thực hành với Kubernetes trên local. Hôm nay, ở bài viết này, chúng ta sẽ cùng tìm hiểu sâu hơn một chút về các khái niệm cốt lõi (Core concept) trong Kubernetes.

![](https://images.viblo.asia/0b267d81-2389-4c23-96d5-08f85cb421a8.png)

## 1. Pods: Nơi mà các container được chạy lên

**Pods** là thành phần cơ bản nhất trong một hệ thống **Kubernetes**. **Pods** nằm trong các **woker nodes** là nơi chứa các container (một hay nhiều). Mỗi **pods** giống như một logic machine riêng biệt (có IP, hostname, tiếng trình riêng).

![](https://images.viblo.asia/eaab70cc-fb2a-4c98-b821-e1aa285019fe.png)


### Tại sao chúng ta lại cần Pods ?

Tại sao lại cần có **Pods**, sao không chạy trực tiếp các **container** trong worker nodes đi ?

Thực ra **Pods** là một cấp độ cao hơn của container, nó có thể chứa nhiều container cùng xử lý một loại công việc. Các container sẽ có chung một địa chỉ IP, chia sẻ cùng 1 volume.


### Cấu hình một Pods đơn giản

Để tạo một pods đơn giản trên cluster Kubernetes, chúng ta sẽ cấu hình các thông số của pods với file `yml` hoặc `json` tùy thích. Hãy chắc chắn bạn đã có 1 cluster Kubernetes (Trên local sử dụng minikube, chi tiết có trong phần demo của [bài trước](https://viblo.asia/p/cam-ngo-ban-dau-ve-kubernetes-aWj53LyeK6m#_4-demo-kubernetes-tren-local-7)) 

`kubia-manual.yaml`

```json
apiVersion: v1
kind: Pod
metadata:
 name: kubia-manual
spec:
 containers:
 - image: luksa/kubia
 name: kubia
 ports:
 - containerPort: 8080
 protocol: TCP
```

- apiVersion: version của Kubernetes API
- kind: Chỉ định thành phần cần tạo (ở đây là Pod)
- metadata: Tên của Pod
- spec: Mô tả về các thông số kỹ thuật của Pod
- container: chưa tên image của container cần chạy trong pod
- name: Tên container
- containerPort: Cổng đầu ra ứng dụng của container

Để tạo pods, chúng ta dùng lệnh `kubectl create`

```bash
kubectl create -f kubia-manual.yaml
```

Thông báo sẽ hiện ra ngay sau khi chạy lệnh

`pod "kubia-manual" created`

Kiểm tra pods: 

```bash
kubectl get pods

NAME         READY  STATUS   RESTARTS AGE
kubia-manual 1/1    Running    0      32s
```

### Tổ chức pods với labels

Ở các hệ thống trung bình đến lớn, số lượng **Pods** được triển khai trên cluster **Kubernetes** lên đến hàng chục, thậm chi hàng trăm... Nếu không có cơ chế, giải pháp tổ chức tốt các pods với số lượng lớn như thế, chúng sẽ thành mớ bòng bong, hỗn độn dẫn đến mất rất nhiều công sức để quản lý. Với **Labels**, chúng ta có thể các pods thành các nhóm nhỏ hơn, giúp phần nào giải quyết vấn đề nêu trên.

**Lưu ý**: Labels có thể được đánh cho các node, chứ không chỉ dành riêng cho các pods.

![](https://images.viblo.asia/88af72b9-bbff-4da0-b239-9305fa0033e0.png)

Với các pods ở hình trên, chúng ta có thể tổ chức với việc gán 2 nhãn (labels) cho mỗi pods:
- app: Để chỉ ra pods thuộc phần nào trong ứng dụng như UI hay Order Service, ...
- rel: Để chỉ ra pods được dùng cho phiên bản nào của ứng dụng (stable, beta hay là canary).

![](https://images.viblo.asia/f5f2c1ab-1098-410d-80ca-bcd2e29acd60.png)

#### Cấu hình pods với labels

```json
apiVersion: v1
kind: Pod
metadata:
 name: kubia-manual-v2
 labels:
 app: ui
 rel: stable
spec:
 containers:
 - image: luksa/kubia
 name: kubia
 ports:
 - containerPort: 8080
 protocol: TCP
```

Khác với file yml cấu hình pods ở phần trên một chút. Ở phần `metadata` chúng ta đã thêm vào phần labels cho pods.

Sau khi create pods bằng lệnh `kubectl create -f`, chúng ta dùng lệnh:

```bash
 kubectl get po --show-labels
```

Console sẽ hiển thị các pods với label tương ứng.

## 2. ReplicationControllers

Trong thực tế, các **Pods** khi được chạy trên các cluster **Kubernetes** hoàn toàn có thể bị lỗi, chết ngoắc một cách bất ngờ bởi nhiều lý do khác nhau. Với **ReplicationControllers**, nó sẽ đảm bảo sẽ tạo lại Pods mới thay thế khi Pods cũ bị lỗi (hay các node bị lỗi). Một cách đầy đủ hơn, **ReplicationControllers** sẽ duy trì số Pods đang chạy với số lượng được chỉ định trước (ít hơn thì tạo thêm pods mới, thừa thì xóa bớt pods đi).

### Cấu trúc của ReplicationControllers

![](https://images.viblo.asia/f03449ef-0f91-40de-ab2b-8990ff478d0d.png)

- **label selector**: Xác định pods mà Controller quản lý (theo labels)
- **replica count**: Số lượng pods cần duy trì
- **pod template**: Được hiểu là khuôn mẫu của pods để Controller sử dụng để tạo Pods mới khi cần.

### Tạo một ReplicationControllers

Vẫn là cách quen thuộc, viết file `yml` (hoặc `json`) để cấu hình.

`kubia-rc.yaml`

```json
apiVersion: v1
kind: ReplicationController
metadata:
 name: kubia
spec:
  replicas: 3
  selector:
  app: kubia 
 template:
   metadata:
     labels:
       app: kubia
      spec:
       containers:
          - name: kubia
             image: luksa/kubia
             ports:
         - containerPort: 8080 
```

- kind: là kiểu ReplicationController
- replicas: 3 là số lượng pods cần duy trì
- app: kubia có nghĩa là áp dụng cho các Pods có labels `app: kubia`
- template: là phần pod template, mô tả tên images, port để có thể chạy container trong pods lên.

Cuối cùng tạo **ReplicationController** với lệnh

```bash
$ kubectl create -f kubia-rc.yaml
replicationcontroller "kubia" created
```

Ok, giờ chúng ta sẽ xóa 1 Pods với lệnh

```bash
kubectl delete pod [tên-pod]
```

Gần như ngay lập tức sẽ có 1 Pods mới được tạo thành thay thế Pods vừa bị xóa.

![](https://images.viblo.asia/1230c5f1-6ea9-4169-bf7d-e4ccb1ee2629.png)

## 3. Service: Cầu nối để các thành phần trong hệ thống Kubernetes tương tác với nhau

Như chúng ta đã biết, cách **Pods** có IP, hostname riêng chứa các container của ứng dụng. Client có thể kết nối đến các Pods để tương tác bằng IP hay hostname tương ứng. Tuy nhiên, có một vấn đề là các Pods có thể bị crash hay lỗi bất ngờ, khi **ReplicationController** tạo lại Pods mới thay thế thì các thông số như địa chỉ IP, hostname cũng thay đổi. Hơn nữa, một ứng dụng triển khai trên Kubernetes có nhiều Pods chạy cùng một lúc, client không nên và cũng không cần thiết lưu trữ 1 tá các địa chỉ IP, hostname của các Pods.

Và đây là lúc chúng ta cần đến **Service**

**Kubernetes Service** là một tài nguyên cho phép tạo một điểm truy cập duy nhất đến các **Pods** cung cấp cùng một dịch vụ. Mỗi Service có địa chỉ IP và port không đổi. Client có thể mở các kết nối đến IP và port của service, sau đó chúng sẽ được điều hướng đến các **Pods** để xử lý.

![](https://images.viblo.asia/ca651b76-80dc-4cac-9bf5-204ff5769b5f.png)

### Tạo Service bằng cách cấu hình file yml

File `kubia-svc.yaml`

```json
apiVersion: v1
kind: Service
metadata:
 name: kubia
spec:
 ports:
 - port: 80
 targetPort: 8080
 selector:
 app: kubia 
```

- kind: Service thể hiển rằng thành phần cần tạo là Service
- port: 80 thể hiện rằng cổng tương tác với Service là cổng 80
- targetPort: 8080 là cổng của các container trong pods mà service sẽ điều hướng kết nối đến
- app: kubia (thuộc phần selector) thể hiển rằng service tương tác với các pods có labels là `app=kubia`

Ở phần `spec` chúng ta có thể thêm 1 trường nữa là `type` biểu thể kiểu service cần dùng (mặc định là ClusterIP). Các loại Service bao goomf:
- ClusterIP: Service chỉ có địa chỉ IP cục bộ và chỉ có thể truy cập được từ các thành phần trong cluster Kubernetes.
- NodePort: Service có thể tương tác qua Port của các worker nodes trong cluster (sẽ giải thích kỹ hơn ở phần sau)
- LoadBlancer: Service có địa chỉ IP public, có thể tương tác ở bất cứ đâu.
- ExternalName: Ánh xạ service với 1 DNS Name

Tạo Service

```bash
kubectl create -f kubia-svc.yaml
```

Kiểm tra các service với lệnh

```bash
$ kubectl get svc
NAME        CLUSTER-IP    EXTERNAL-IP  PORT(S) AGE
kubernetes  10.111.240.1    <none>      443/TCP 30d
kubia       10.111.249.153  <none>      80/TCP 6m 
```

Chúng ta hoàn toàn có thể config cho Service nhiều hơn 1 cổng, ở file dưới chúng ta config cổng tương tác của service cho giao thức http và https ứng với 2 cổng 8080 và 8443 trong container.

```json
apiVersion: v1
kind: Service
metadata:
 name: kubia 
spec:
 ports:
 - name: http
 port: 80
 targetPort: 8080
 - name: https
 port: 443
 targetPort: 8443
 selector:
 app: kubia 
```

### Service NodePort

Như ở trên, sau khi tạo **Service** và dùng lệnh `kubectl get svc` để kiểm tra service vừa tạo thì chúng ta thấy rõ ràng có 2 thống số IP là `CLUSTER_IP` và `EXTERNAL_IP` có giá trị `<none>`.
- CLUSTER_IP: Là địa chỉ IP cục bộ trong Cluster Kubernetes, với địa chỉ IP này thì các `Pods` hay `Services` có thể tương tác với nhau nhưng bên ngoài sẽ không thể tác tương tác với `Service` thông qua nó được.
- EXTERNAL_IP: IP public, có thể dùng để client bên ngoài (hoặc bất cứ đâu) tương tác với Service.

Type NodePort giúp Service có thể tương tác được từ bên ngoài thông qua port của worker node.

Khởi tạo file config ` kubia-svc-nodeport.yaml`

```json
apiVersion: v1
kind: Service
metadata:
 name: kubia-nodeport
spec:
 type: NodePort
 ports:
 - port: 80
 targetPort: 8080
 nodePort: 30123
 selector:
 app: kubia
```

- nodePort: số hiệu cổng của node worker được mở để bên ngoài tương tác với service

Kiểm tra thông tin service:

```bash
$ kubectl get svc kubia-nodeport
NAME           CLUSTER-IP      EXTERNAL-IP   PORT(S) AGE
kubia-nodeport 10.111.254.223   <nodes>      80:30123/TCP 2m
```

Khi tương tác với service, client sẽ truy cập qua `<Địa chỉ Ip public của Node>:Port`

![](https://images.viblo.asia/82c45b8f-9c1b-41d5-a8ab-e67b4725084a.png)

### Service load balancer

Tạo một `Service` kiểu `Loadblancer` sẽ cung cấp thêm địa chỉ IP public để client bên ngoài có thể gửi request đến.

![](https://images.viblo.asia/fe58cece-06bc-4ec1-b3f0-f835ac7a5c92.png)


File ` kubia-svc-loadbalancer.yaml`

```json
apiVersion: v1
kind: Service
metadata:
 name: kubia-loadbalancer
spec:
 type: LoadBalancer
 ports:
 - port: 80
 targetPort: 8080
 selector:
 app: kubia
```

Tạo Service: 

```bash
kubectl create -f kubia-svc-loadbalancer.yaml
```

Kết quả:

```bash
$ kubectl get svc kubia-loadbalancer
NAME               CLUSTER-IP      EXTERNAL-IP     PORT(S) AGE
kubia-loadbalancer 10.111.241.153  130.211.53.173  80:32143/TCP 1m
```





## Tài liệu tham khảo

- [Kubernetes In Action](https://www.manning.com/books/kubernetes-in-action)
- https://kubernetes.io/docs/concepts/services-networking/service/