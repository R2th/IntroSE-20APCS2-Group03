Trong bài [trước](https://viblo.asia/p/thuc-hanh-kubernetes-k8s-bang-cach-su-dung-lenh-command-XL6lADqJZek), mình có giới thiệu chạy các câu lệnh K8S bằng Command Line 
Để tạo 1 deloyment đơn giản chỉ cần chạy lệnh 
```
kubectl create deployment hello-app --image=nginx:latest
```
Trong câu lệnh trên đã lược bỏ hầu như hết các thuộc tính không bắt buộc, nó chạy được, nhưng muốn mở rộng thì khó hơn nhiều. Khi đó phải truyền thêm các điều kiện vào command line khiến nó rất rồi mắt.

Chính vì vậy deployment sinh ra để giải quyết vấn đề này, nó cũng giống như việc chạy Docker trên command line và sử dụng docker-compose  vậy.
# 1. K8S deployment là gì
Theo định nghĩa nó là 1 Object để quản lý resource của K8S giúp khai báo và update thông tin cho ứng dụng: Image sử dụng để chạy, số lượng Pods ... 
Và giúp việc cập nhật ứng dụng nhanh chóng và hiệu quả hơn.

```
A Kubernetes deployment is a resource object in Kubernetes that provides declarative updates to applications. A deployment allows you to describe an application’s life cycle, such as which images to use for the app, the number of pods there should be, and the way in which they should be updated. 
```
# 2. Ưu điểm của deployment 
* Giảm thiểu nhàm chán khi phải updating 1 ứng dụng một cách thủ công (stop ứng dụng cũ, chạy câu lệnh chạy ứng dụng với version mới, chờ và kiểm tra version mới chạy thành công, hay rollback nếu có lỗi ...).
* Thao tác thủ công dễ dấn đến nhầm lẫn khi số lượng pod nhiều.

Tóm lại K8S deployment object giúp bạn làm những việc sau:
* Deploy cho **replica set** hay **pod**
* Update replica sets hay pods
* Rollback vesion cũ nếu có lỗi
* Scale deployment
* Dừng chạy hay tiếp tục 1 deployment
# 3. Những thuộc tính quan trọng của deployment
```
apiVersion: apps/v1 #  for k8s versions before 1.9.0 use apps/v1beta2  and before 1.8.0 use extensions/v1beta1
kind: Deployment
metadata:
  name: deployment-name
spec:
  selector:
    matchLabels:
      app: app-labels
      tier: frontend
  replicas: 2
  template:
    metadata:
      labels:
        app: app-labels
        tier: frontend
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
        - name: GET_HOSTS_FROM
          value: dns
        ports:
        - containerPort: 80

```

File deployment được lưu dưới định dạng *.yaml
* **kind**: Vì mình đang tạo deployment nên giá trị là **Deployment**
* **metadata.name**: Tên của deployment dùng để tương tác với deployment.
ví dụ khi delete deployment.
```
kubectl delete deployment deployment-name
```
* **spec.replicas**: Số lượng replicated pods. trong ví dụ này mình tạo ra 2 replicated pods.
* **.spec.selector**: Định nghĩa cash Deployment tìm Pods để quản lý (scale up, scale down, delete ...) 
trong trường hơp này giá trị nó bằng giá trị trong **spec.template.metadata**. Có 2 cặp {key, value} dùng để lựa chọn (**app:app-labels**) và (**tier: frontend**). 

* **template**: Chứa thông tin của container sẽ chạy trên pod.
*template.metadata.labels* giúp deployment match với pod để quản lý
các thông số còn lại tương tự như thông tin của container. 
**name**: Tên của container.
**image**: Image của container 
**resources**: maximum resource cho mỗi container
.....
# 4. Ví dụ thực tế
Tạo 1 file test-deployment.yaml
```
apiVersion: apps/v1 #  for k8s versions before 1.9.0 use apps/v1beta2  and before 1.8.0 use extensions/v1beta1
kind: Deployment
metadata:
  name: deployment-name
spec:
  selector:
    matchLabels:
      app: app-labels
      tier: frontend
  replicas: 2
  template:
    metadata:
      labels:
        app: app-labels
        tier: frontend
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
        env:
        - name: GET_HOSTS_FROM
          value: dns
        ports:
        - containerPort: 80
```

## Chạy deployment
```
kubectl apply -f test-deployment.yaml
```
kết quả
```
deployment.apps/deployment-name created
```

## Kiểm tra thông tin Deployment mới tạo
```
kubectl get deployments
```
-> 
```
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
deployment-name   1/1     1            1           84s
```

Ở bài viết tiếp theo mình sẽ giải thích thi tiết về service trong k8s, tác dụng của nó và cách publish ra bên ngoài.

# 5. Tài liệu tham khảo
* https://www.redhat.com/en/topics/containers/what-is-kubernetes-deployment#:~:text=A%20Kubernetes%20deployment%20is%20a,which%20they%20should%20be%20updated.
* https://kubernetes.io/docs/concepts/workloads/controllers/deployment/