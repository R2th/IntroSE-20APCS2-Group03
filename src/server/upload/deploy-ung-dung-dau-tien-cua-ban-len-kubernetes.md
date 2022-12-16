Chào mọi người, lại là mình đây. Tiếp tục series về Kubernetes, bài viết hôm nay chúng ta cùng tìm hiểu các khái niệm về deployment trong Kubernetes cũng như việc deploy một ứng dụng lên Kubernetes sẽ như thế nào nhé!

![](https://images.viblo.asia/fc5580ca-6023-43ff-bbe0-acfb98cb3a8a.png)

Còn rất nhiều khái niệm mới mẻ về Kubernetes mà mình chưa hình dung hết, tuy nhiên quan điểm của mình là cứ tìm hiểu dần và vọc đến khi nào làm được thì thôi, mục đích của bài viết hôm nay là *Chạy một ứng dụng Rails API trên Kubernetes*.

Bài viết trước chúng ta đã có thể tạo được một Kubernetes Cluster hoàn chỉnh ([link](https://viblo.asia/p/kubernetes-cac-khai-niem-co-ban-va-cach-khoi-tao-mot-kubernetes-cluster-Az45bD0NZxY)), và hôm nay hãy cùng mình tìm hiểu các bước để deploy một ứng dụng lên K8s nhé (go)

Bài viết chúng ta sẽ tìm hiểu các nội dung sau:

- **Kubernetes dashboad**
- **Kubernetes Sercet**
- **Kubernetes Deployment**
- **Kubernetes Service**

Để deploy được một ứng dụng lên Kubernetes thì cần tìm hiểu trước về Docker, cách tạo image và chạy ứng dụng dưới dạng container, một ít kiến thức về networking.

Bước đầu tiên và cơ bản nhất, chúng ta cần cài đặt một giao diện để quản lý Kubernetes cluster - Cần cài đặt công cụ quản lý `kubernetes dashboad`

Tiếp theo sẽ có ít nhất là 3 bước cần làm để chạy được một ứng dụng trên Kubernetes:
- **Tạo Kubernetes Secret** - Nơi lưu các biến môi trường
- **Tạo Kubernetes Deployment** - Cách triển khai các pods chạy ứng dụng của chúng ta
- **Tạo Kubernetes Service** - Service để có thể expose các port, giúp access ứng dụng từ bên ngoài Cluster

Bắt đầu thôi nào! (go)

## Các khái niệm

### Kubernetes dashboard

Với những ai mới tìm hiểu về K8s thì chắc hẳn sẽ rất thích thú với công cụ này. Nó giúp chúng ta có một cái nhìn rất trực quan về hệ thống. Kubernetes dashboard mang lại giao diện web sinh động với toàn bộ các chức năng để một người quản trị K8s có thể tổng hợp và điều khiển được hệ thống của mình.

https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/

Để cài đặt Kubernetes dashboard hãy chạy các bước sau
```shell
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
```

hoặc tải file đặc tả về và apply
```shell
$ wget https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
$ kubectl apply -f recommended.yaml
```
Sau khi khởi tạo thành công resource này thì hãy chạy các lệnh sau
```shell
$ kubectl create serviceaccount dashboard-admin-sa
$ kubectl create clusterrolebinding dashboard-admin-sa --clusterrole=cluster-admin --serviceaccount=default:dashboard-admin-sa
```

Hãy chạy lệnh sau để list ra các secrets
```shell
$ kubectl get secrets
NAME                             TYPE                                  DATA   AGE
dashboard-admin-sa-token-9gr22   kubernetes.io/service-account-token   3      8h
default-token-hhkcb              kubernetes.io/service-account-token   3      8h
railsapp-secrets                 Opaque                                6      7h16m
```

Tiếp theo hãy chạy lệnh describe secret để xem mô tả của secret dashboard token, lệnh này sẽ trả về một token, sử dụng token này để đăng nhập vào kubernetes dashboard
```shell
$ kubectl describe secret dashboard-admin-sa-token-9gr22
```
Chạy lệnh kubectl proxy để kết nối đến cluster, và truy cập qua localhost:8001
```shell
$ kubectl proxy
Starting to serve on 127.0.0.1:8001
```

Hãy vào trang login qua đường link sau, dùng token trả về ở trên trên để đăng nhập nhé
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login

![](https://images.viblo.asia/67b079b5-2300-4635-a875-f884934fabd9.png)

Ta thấy giao diện Kubernetes Dashboard khá quen thuộc với style của Google, giao diện cực kỳ đơn giản, trực quan và rất nhiều chức năng.

### Kubernetes Secret

> Kubernetes Secret là nơi ta lưu trữ và quản lý thông tin nhạy cảm, chẳng hạn như mật khẩu, các key bí mật, các biến môi trường ...
> Lưu trữ biến môi trường trong Kubernetes Secrets linh hoạt hơn so với việc đưa nguyên văn biến môi trường đó vào đặc tả Pod hoặc trong Docker images...
> 
> https://kubernetes.io/docs/concepts/configuration/secret/

Một file đặc tả secret sẽ như sau:
```yaml
#railsapp_secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: railsapp-secrets
type: Opaque
data:
  database-host: <base64 encoded value>
  ...
```
*Như mình đọc từ document của kubernetes thì việc share file secret này sẽ tiềm ẩn risk bởi việc encode base64 như vậy không khác sử dụng plaintext là mấy, vì vậy hãy giữ bảo mật cho file secret này nhé*

Để encode base64 giá trị của database-host, sử dụng lệnh sau:

`echo -n < database-host-name > | base64`
Giả sử database host name là `abc.com` thì value trả về sẽ là `YWJjLmNvbQ==`

```shell
$ echo -n abc.com | base64
YWJjLmNvbQ==
```

Hãy làm tương tự với các biến môi trường cần thiết khác nhé

### Kubernetes Deployment
Deployment cung cấp các bản cập nhật khai báo cho các Pods. 
> 
> Chúng ta cần mô tả trạng thái mong muốn trong Deployment, Deployment Controller sẽ điều khiển để thay đổi trạng thái thực tế thành trạng thái mong muốn với các mức độ được kiểm soát khác nhau. Bạn có thể khai báo các Deployments để tạo mới các bản ReplicaSets, hoặc xóa các Deployments và sử dụng tài nguyên đó cho các Deployments mới này.
>

Có nhiều kịch bản sử dụng Deployment
- Phát hành các bản cập nhật mới.
- Khai báo các trạng thái mới của các Pods bằng cách update PodTemplateSpec của Deployment.
- Rollback về bản phát hành trước đó nếu bản mới xảy ra vấn đề.
- Scale Deployment để đáp ứng tải nhiều hơn.
- Tạm dừng Deployment để áp dụng các bản vá PodTemplateSpec, sau đó tiếp tục triển khai để phát hành bản mới.
- Sử dụng status của Deployment để xác định được khi nào thì một phát hành bị dừng lại/xảy ra lỗi.
- Dọn dẹp các bản ReplicaSets cũ mà không còn sử dụng.


https://kubernetes.io/docs/concepts/workloads/controllers/deployment/

Đây là một bản đặc tả của Deployment

```yaml
#railsapp_deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: railsapp-deployment
  labels:
    app: railsapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: railsapp
  template:
    metadata:
      labels:
        app: railsapp
    spec:
      imagePullSecrets:
        - name: docker-registry
      containers:
      - name: railsapp
        image: uytran12/demo-k8s:dev
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        env:
          - name: RAILS_LOG_TO_STDOUT
            value: 'true'
          - name: SECRET_KEY_BASE
            valueFrom:
              secretKeyRef:
                name: railsapp-secrets
                key: secret-key-base
          ...
```

Ở file này, hãy quan tâm đến các field như `.metadata.labels`, `.spec.selector.matchLabels`,  `.spec.template.metadata.labels`, và khai báo `.spec.template.spec.containers` nhé.

Ở file Deployment trên thì:
- Một Deployment có tên là `railsapp-deployment` được tạo, bởi khai báo của `.metadata.name`
- Deployment tạo 3 bản replicated Pods, qua khai báo bởi `.spec.replicas`
- `.spec.selector` khai báo cách mà Deployment tìm kiếm Pods nào để quản lý. Trong ví dụ thì chúng ta chỉ khai báo một nhãn phù hợp là `app: railsapp`
- Trường `template` chứa các sub-fields sau:
1. Các Pods được gắn nhãn `app: railsapp`, sử dụng trường `.metadata.labels`
2. Đặc tả của Template dành cho Pod, rằng các pods sẽ chạy 1 container là `railsapp`, chạy bởi image `uytran12/demo-k8s:dev`, được pull về từ `docker-registry` https://hub.docker.com/r/uytran12/demo-k8s.
- Ở `.spec.template.spec.containers.env` sẽ là nơi khai báo các environment variable. Có thể gán trực tiếp value như biến `RAILS_LOG_TO_STDOUT`, hoặc lấy value từ Kubernetes Secret mà chúng ta đã khai báo phía trên.

### Kubernetes Service
> Kubernetes cấp cho chúng ta địa chỉ IP và một DNS name cho các pods, và có thể tự động cân bằng tải giữa chúng. Sử dụng Service để có thể expose ứng dụng đang chạy trên các pods ra ngoài Kubernetes, như là một dịch vụ mạng.
>

Kubernetes pod có vòng đời của riêng nó, mỗi khi chúng ta sử dụng Deployment để chạy ứng dụng, các pod có thể tự khởi tạo hoặc bị dừng.

Hãy hình dung chúng ta có một vấn đề sẽ có thể xảy ra. Giả sử chúng ta có các pods chạy backend và các pods chạy frontend, làm cách nào để frontends tìm kiếm và định danh được địa chỉ IP nào để connect đến backends ?

Đây chính là lúc chúng ta cần sử dụng Kubernetes Service.
 
> Trong Kubernetes, Service là một khái niệm trừu tượng, khai báo các cài đặt về mặt logical của các pods, và quy định cách để truy cập các pods đó.
> 
https://kubernetes.io/docs/concepts/services-networking/service/

Để bắt đầu, hãy thực hành một service đơn giản

```yaml
#railsapp_service.yaml
apiVersion: v1
kind: Service
metadata:
  name: railsapp-service
spec:
  selector:
    app: railsapp
  type: NodePort
  ports:
  - name: http
    protocol: TCP
    port: 3000
    targetPort: 3000
    nodePort: 30080
```

Các đặc tả này sẽ tạo một service `NodePort` khai báo qua `.spec.type`, với tên là `railsapp-service` qua `.metadata.name`. 

Các request đến node cần đến `nodePort` là 30080, `targetPort` là port mà các pods đang chạy đã expose ra với nhãn là `app=railsapp`. Ở ports list thì port và targetPort thường được set giống nhau theo default.

NodePort sẽ expose Service ở tất cả các IP của các Nodes qua các port. Chúng ta có thể kết nối đến Service NodePort Service từ bên ngoài Cluster, thông qua request đến `<NodeIP>:<NodePort>`

Như vậy là đủ cho một cuộc tình =)), bây giờ hãy tiến hành step by step để Deploy ứng dụng lên Kubernetes nào

## Deploy
### Bước 1: Apply Kubernetes Secret
```shell
$ kubectl create -f railsapp_secrets.yaml
```
Chạy xong chúng ta có thể sử dụng Dashboard UI để kiểm tra

![](https://images.viblo.asia/825e56a3-30b0-4ca9-8788-aa8b3a7d4451.png)


### Bước 2: Apply Kubernetes Deployment
```shell
$ kubectl create -f railsapp_deployment.yaml
```

![](https://images.viblo.asia/62a8a55f-3a75-4ad9-94c3-2f25f7112c70.png)

### Bước 3: Apply Kubernetes Service
```shell
$ kubectl create -f railsapp_service.yaml
```

![](https://images.viblo.asia/2cb588b1-d396-4ef3-83aa-32c131e994f6.png)
### Kiểm tra các pods
Chúng ta có thể kiểm tra các pods đang chạy qua `kubectl get pods -A` hoặc kiểm tra qua Dashboard UI 
![](https://images.viblo.asia/590e28f4-2ac0-4da3-af0f-b0959b888c09.png)

### Truy cập ứng dụng qua NodePort Service

```
$ kubectl get services
NAME               TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes         ClusterIP   10.96.0.1      <none>        443/TCP        13h
railsapp-service   NodePort    10.106.99.20   <none>        80:30080/TCP   108m
```
Với NodePort Service thì hãy truy cập vào port 30080 qua IP của các nodes, chẳng hạn http://172.16.10.100:30080 để xem thành quả xem sao nhé mọi người (len)

![](https://images.viblo.asia/95736e93-9d8f-4503-9316-715d8ca118b8.png)

Như vậy là ứng dụng Rails api của mình đã được deploy lên Kubernetes thành công!

Với việc chạy 1 service thì có vẻ hơi lãng phí sức mạnh của Kubernetes, các bài viết sau mình sẽ tiếp tục series này với việc chạy nhiều service frontend và backend giao tiếp với nhau.

Cảm ơn mọi người đã theo dõi bài viết!

Tham khảo:
- https://kubernetes.io/docs
- https://blog.engineyard.com/kubernetes-tutorial-running-a-rails-app-in-kubernetes