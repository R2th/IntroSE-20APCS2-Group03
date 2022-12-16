# Giới thiệu
Xin chào các bạn, chúng ta lại tiếp tục với series k8s basic để cùng nhau làm quen với k8s. Các nội dung trước chúng ta đã đi qua:

* [Session 1: Tổng quan các thành phần của kubernetes](https://viblo.asia/p/k8s-basic-tong-quan-cac-thanh-phan-cua-kubernetes-aAY4ql7qVPw)
* [Session 2:  Cài đặt môi trường Lab - Phần 1](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-1-3kY4gWdy4Ae)
* [ Session 2:  Cài đặt môi trường Lab - Phần 2](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-2-bXP4W5yYL7G)
* [Session 3: Làm việc với Node trên K8S](https://viblo.asia/p/k8s-basic-lam-viec-voi-node-tren-k8s-7ymJXKQr4kq)
* [Session 4: Kubernetes Pods](https://viblo.asia/p/k8s-basic-kubernetes-pods-5pPLkG3nLRZ)

**Trong bài hôm nay chúng ta sẽ làm quen và thao tác với Kubernetes Deployment và ReplicaSet :)**
- Tìm hiểu khái niệm về Deployment và ReplicaSet
- Các thành phần của Deployment và ReplicaSet
- Tạo mới Deployment và ReplicaSet
- Quản lý Deployment và ReplicaSet: Lấy danh sách, mô tả, chỉnh sửa, nâng cấp, xóa..
![deployment.png](https://images.viblo.asia/08353e3f-c04d-46c6-899d-33d6eb43ad67.png)

# Kubernetes deployment và ReplicaSet
## Deployment là gì 
Trong phần trước chúng ta đã tìm hiểu về thành phần **Pod** trên kubernetes và các tạo/quản lý nó. Tuy nhiên trong thực tế thì ít khi chúng ta triển khai ứng dụng cách cách tạo Pod trực tiếp như vậy mà các ứng dụng sẽ được triển khai dưới một trong các dạng triển khai như **Deployment**, **StatefulSet**, **DaemonSet** hay **Job/Cronjob**.

Deployment là một tài nguyên trên K8S giúp ta quản lý các **Pod** và **ReplicaSet**. Vậy tại sao phải dùng Deployment mà không phải là Pod? Bởi deloyment giúp chúng ta quản lý nhiều bản sao của Pod, nâng cấp phiên bản phần mềm bên trong Pod và đảm bảo số lượng Pod theo số lượng mà chúng ta mong muốn.

**Ta xem lại cấu trúc của một Pod như sau:**
![image.png](https://images.viblo.asia/f6e7592e-0639-4e65-bc6e-21c32be08781.png)
Trong cấu trúc của Pod thì nó sẽ chứa 1 hoặc nhiều container. Như trong ví dụ ở hình trên, nó chứa 1 container là my-app sử dụng image là myapp:v1.0 sử dụng port 80.

Bây giờ ta muốn triển khai ứng dụng này dưới dạng Deployment để đảm bảo rằng ta sẽ luôn có 3 Pod cùng chạy ứng dụng my-app thì ta khai báo Deployment như sau:

![image.png](https://images.viblo.asia/bd115d0a-8c9d-4a36-a194-9adc58b2e51e.png)

Các bạn có thể nhận thấy phần khai báo Pod đã "nằm gọn" trong tham số "**template"** của cấu hình Deployment. 

Về mặt ý tưởng, khi ta tạo mới deployment như trên, thì kubernetes sẽ tạo ra 1 replicaset và replicaset này sẽ tạo ra 03 Pod (tương ứng với tham số **replicas: 3**) với cấu hình như khai báo trong phần **template**.

Nếu ta update cấu hình của Deployment, ví dụ như thay đổi thông tin image từ **myapp:v1.0** thành **myapp.v2.0** thì lúc này hệ thống sẽ sinh ra 1 replicaset mới, nó cũng sẽ tạo ra 03 Pod mới (tương ứng với tham số **replicas: 3**) với cấu hình như khai báo trong phần **template** nhưng lúc này tham số image đã thay đổi thành **myapp:v2.0**.

## ReplicaSet là gì
ReplicaSet cũng là một tài nguyên trên K8S có mục đích là để duy trì một trạng thái ổn định của một bộ các Pod ở một thời điểm nhất định. ReplicaSet có 2 thành phần quan trọng là "thông tin cấu hình của Pod" (tương ứng với thông tin trong mục **template**) và "số lượng Pod" mong muốn (tương ứng với tham số **replicas**). ReplicaSet Controller sẽ làm nhiệm vụ đảm bảo số lượng Pod được khai báo trong ReplicaSet này luôn đảm bảo đúng bằng số lượng Pod mong muốn.

ReplicaSet có thể được tạo thủ công bằng cách khai báo các file yaml. Nó cũng được tự động tạo ra khi ta tạo hay update Deployment. 


## Các trường hợp ứng dụng của Deployment
Một số trường hợp thường dùng tới deployment:
- Tạo Deployment để triển khai một ReplicaSet
- Khai báo trạng thái mới của Pod. 
- Scale up/down số lượng Pod của một ứng dụng
- Rollout/rollback một ứng dụng..

## Cơ chế quản lý ReplicaSet và Pod của Deployment
Như đã đề cập bên trên, khi ta tạo mới một Deployment thì hệ thống sẽ sinh ra 1 ReplicaSet tương ứng, ReplicaSet này sẽ làm nhiệm vụ tạo ra các Pod. Vậy câu hỏi đặt ra là làm thế nào Deployment quản lý được các ReplicaSet của nó, và làm thế nào ReplicaSet quản lý các Pod của nó?

**Câu trả lời là chúng sử dụng labels để quản lý.**

Khi tạo một Deployment, ta sẽ phải định nghĩa các ReplicaSet/Pod được quản lý bởi Deployment như thế nào.
Như trong ví dụ đang nêu trong bài, thì tất cả các resource được gán nhãn "app=my-app" đều được hiểu là được quản lý bởi Deployment này. Việc này được khai báo trong tham số **selector**:

```
spec:
  selector:
    matchLabels:
      app: "my-app"
```

Đồng thời, với các ReplicaSet/Pod được sinh ra, chúng cũng sẽ được gán một nhãn theo khai báo trong phần **template** của Pod:
```
spec:
  template:
    metadata:
      labels:
        app: "my-app"
```
Như vậy phải luôn lưu ý 2 config này phải match với nhau.

Tiếp theo sau khi Deployment tạo ra ReplicaSet, thì ReplicaSet sẽ làm nhiệm vụ tạo Pod. Lúc này cơ chế mà ReplicaSet quản lý Pod cũng giống như cách Deployment quản lý ReplicaSet.

Trong cấu hình của ReplicaSet sẽ có tham số **selector** để quản lý các Pod của nó theo labels. 
```
spec:
  selector:
    matchLabels:
      app: "my-app"
      pod-template-hash: 754dc5cfb7        
```
Và các Pod nó tạo ra sẽ có thêm một nhãn "**pod-template-hash: [random-hash]**"
```
spec:
  template:
    metadata:
      labels:
        app: "my-app"
        pod-template-hash: 754dc5cfb7
```

# Làm việc với Deployment
Trong phần này mình tập trung demo việc triển khai một ứng dụng bằng deployment, các thành phần như service/ingress các bạn tạm thời chưa cần quan tâm tới với.

## Tạo deployment từ file yaml
Mình tạo một file yaml như sau để định nghĩa deployment (deployment.yaml):
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: my-app
spec:
  replicas: 10
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: node-app
          image: harbor.prod.viettq.com/demo/myapp:v1.0
          imagePullPolicy: IfNotPresent
          resources:
            # Specifying the resourses that we might need for our application
            limits:
              memory: "128Mi"
              cpu: "500m"
          ports:
            - containerPort: 8080
          env:
            - name: MY_NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: MY_POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: MY_POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: MY_POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: MY_POD_SERVICE_ACCOUNT
              valueFrom:
                fieldRef:
                  fieldPath: spec.serviceAccountName
```
Mục đích của deployment này có thể tóm lại là triển khai ứng dụng có tên là **node-app** từ image là **harbor.prod.viettq.com/demo/myapp:v1.0** và mong muốn nó tạo ra 10 Pod chạy ứng dụng này. Và lưu ý ở đây mình đã khai báo phần **selector** và **label** trong **template**  của Pod là matching với nhau rồi. Tất cả sẽ thông qua nhãn là **app: my-app**

**Để tạo deployment từ file yaml trên ta dùng lệnh:**
```
kubectl create ns demo
kubectl -n demo apply -f deployment.yaml
```

Lúc này ta cùng xem kết quả. Trước tiên ta thấy một deployment đã được tạo ra và cột READY đang hiển thị 10/10 tức là nó đang có 10 Pod ready trên tổng số 10 Pod mà nó mong muốn:
```
[sysadmin@vtq-cicd demo]$ k -n demo get deployments.apps
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
myapp-deployment   10/10   10           10          26m
```

## Kiểm tra các replicaset/pod quản lý bởi deployment
Như đã đề cập bên trên, khi tạo deployment, k8s sẽ tự động tạo ra một ReplicaSet để quản lý các Pod trong deployment đó. Ta sẽ kiểm tra bằng cách tìm các replicaset được quản lý bởi deployment theo nhãn "app=my-app":
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo get replicasets.apps -l "app=my-app" -owide
NAME                          DESIRED   CURRENT   READY   AGE   CONTAINERS   IMAGES                                   SELECTOR
myapp-deployment-549fd4bf6c   10        10        10      29m   node-app     harbor.prod.viettq.com/demo/myapp:v1.0   app=my-app,pod-template-hash=549fd4bf6c
```
Ta thấy kết quả trả về có 1 ReplicaSet có tên là **myapp-deployment-549fd4bf6c**. ReplicaSet có số lượng pod mong muốn (DESIRED) là 10, và số lượng Pod hiện tại (CURRENT) là 10. Và nhiệm vụ của ReplicaSet là luôn đảm bảo số lượng Pod (current) sẽ luôn là 10 (bằng với DESIRED).

Tiếp đến ta sẽ kiểm tra cấu hình **selector** của ReplicaSet này xem nó đang quản lý các Pod của nó như thế nào:
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo get replicasets.apps myapp-deployment-549fd4bf6c -oyaml |grep " selector" -A3
  selector:
    matchLabels:
      app: my-app
      pod-template-hash: 549fd4bf6c
```
Như vậy nó quản lý các Pod của nó bằng cách kiểm tra các Pod có 2 nhãn là "app=my-app" và "pod-template-hash=549fd4bf6c". Ta sẽ list các Pod theo 2 nhãn trên để kiểm tra:
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo get pods -l "app=my-app" -l "pod-template-hash=549fd4bf6c" --show-labels
NAME                                READY   STATUS    RESTARTS   AGE   LABELS
myapp-deployment-549fd4bf6c-2fgft   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-2nnw9   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-52x4j   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-6kzpj   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-7pzmg   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-d7br7   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-lfmdp   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-tjmbt   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-vn5dx   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
myapp-deployment-549fd4bf6c-wkv9r   1/1     Running   0          36m   app=my-app,pod-template-hash=549fd4bf6c
```
Nếu để ý, các bạn sẽ thấy tên của ReplicaSet tạo bởi Deployment sẽ có dạng [Deployment-Name]-[random-hash]. Tương tự tên của các Pod tạo bởi ReplicaSet sẽ có dạng [ReplicaSet-Name]-[random-hash].

## Scale up/down một deployment
Vì deployment sinh ra là để chúng ta quản lý ứng dụng, scale nó khi cần thiết. Ta sẽ thử scale down deployment này từ 10 Pod xuống 5 Pod bằng câu lệnh:

```
[sysadmin@vtq-cicd demo]$ kubectl -n demo get pods
NAME                                READY   STATUS        RESTARTS   AGE
myapp-deployment-549fd4bf6c-2fgft   1/1     Running       0          42m
myapp-deployment-549fd4bf6c-2nnw9   1/1     Terminating   0          42m
myapp-deployment-549fd4bf6c-52x4j   1/1     Running       0          42m
myapp-deployment-549fd4bf6c-6kzpj   1/1     Terminating   0          42m
myapp-deployment-549fd4bf6c-7pzmg   1/1     Terminating   0          42m
myapp-deployment-549fd4bf6c-d7br7   1/1     Running       0          42m
myapp-deployment-549fd4bf6c-lfmdp   1/1     Running       0          42m
myapp-deployment-549fd4bf6c-tjmbt   1/1     Terminating   0          42m
myapp-deployment-549fd4bf6c-vn5dx   1/1     Running       0          42m
myapp-deployment-549fd4bf6c-wkv9r   1/1     Terminating   0          42m
[sysadmin@vtq-cicd demo]$ kubectl -n demo get pods
NAME                                READY   STATUS    RESTARTS   AGE
myapp-deployment-549fd4bf6c-2fgft   1/1     Running   0          42m
myapp-deployment-549fd4bf6c-52x4j   1/1     Running   0          42m
myapp-deployment-549fd4bf6c-d7br7   1/1     Running   0          42m
myapp-deployment-549fd4bf6c-lfmdp   1/1     Running   0          42m
myapp-deployment-549fd4bf6c-vn5dx   1/1     Running   0          42m

```
Ta sẽ thấy trong số 10 Pod ban đầu sẽ có 5 Pod bị xóa đi. Tương tự ta sẽ lại scale lên 10 Pod để xem kết quả:
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo scale deployment myapp-deployment --replicas=10
deployment.apps/myapp-deployment scaled
[sysadmin@vtq-cicd demo]$ kubectl -n demo get pods
NAME                                READY   STATUS    RESTARTS   AGE
myapp-deployment-549fd4bf6c-2fgft   1/1     Running   0          43m
myapp-deployment-549fd4bf6c-52x4j   1/1     Running   0          43m
myapp-deployment-549fd4bf6c-5b7kf   1/1     Running   0          3s
myapp-deployment-549fd4bf6c-d7br7   1/1     Running   0          43m
myapp-deployment-549fd4bf6c-gjg4t   1/1     Running   0          3s
myapp-deployment-549fd4bf6c-lfmdp   1/1     Running   0          43m
myapp-deployment-549fd4bf6c-pvq8t   1/1     Running   0          3s
myapp-deployment-549fd4bf6c-rplh9   1/1     Running   0          3s
myapp-deployment-549fd4bf6c-vn5dx   1/1     Running   0          43m
myapp-deployment-549fd4bf6c-vrltd   1/1     Running   0          3s
```
Lúc này 5 Pod mới sẽ lại được tạo ra.

## Upgrade deployment
Khi ta cần thay đổi, nâng cấp ứng dụng và thường gặp nhất là thay đổi version ứng dụng. Lúc này ta sẽ cần thay đổi thông tin image. Trong ví dụ ban đầu mình có dùng images là **harbor.prod.viettq.com/demo/myapp:v1.0** và bây giờ mình cần update nó lên phiên bản **harbor.prod.viettq.com/demo/myapp:v2.0**. 

**Có 2 cách để thực hiện:**
- Edit trực tiếp tham số images trong file deployment.yaml (file mình dùng để tạo deployment lúc đầu) và apply file yaml này
- Dùng lệnh để update trực tiếp tham số

Mình update deployment bằng lệnh như sau:
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo set image deployment myapp-deployment node-app=harbor.prod.viettq.com/demo/myapp:v2.0  -n demo
deployment.apps/myapp-deployment image updated
[sysadmin@vtq-cicd demo]$ kubectl -n demo get pods
NAME                                READY   STATUS              RESTARTS   AGE
myapp-deployment-549fd4bf6c-2fgft   1/1     Running             0          47m
myapp-deployment-549fd4bf6c-52x4j   1/1     Running             0          47m
myapp-deployment-549fd4bf6c-5b7kf   1/1     Terminating         0          4m15s
myapp-deployment-549fd4bf6c-d7br7   1/1     Terminating         0          47m
myapp-deployment-549fd4bf6c-gjg4t   1/1     Terminating         0          4m15s
myapp-deployment-549fd4bf6c-lfmdp   1/1     Terminating         0          47m
myapp-deployment-549fd4bf6c-pvq8t   1/1     Terminating         0          4m15s
myapp-deployment-549fd4bf6c-rplh9   1/1     Terminating         0          4m15s
myapp-deployment-549fd4bf6c-vn5dx   1/1     Running             0          47m
myapp-deployment-549fd4bf6c-vrltd   1/1     Terminating         0          4m15s
myapp-deployment-786d66d8bd-2xvxn   0/1     ContainerCreating   0          1s
myapp-deployment-786d66d8bd-fngwd   1/1     Running             0          3s
myapp-deployment-786d66d8bd-hnrx9   0/1     ContainerCreating   0          0s
myapp-deployment-786d66d8bd-jsfk4   1/1     Running             0          3s
myapp-deployment-786d66d8bd-lxk8c   0/1     ContainerCreating   0          0s
myapp-deployment-786d66d8bd-n9wk7   1/1     Running             0          3s
myapp-deployment-786d66d8bd-v6bjg   0/1     ContainerCreating   0          1s
myapp-deployment-786d66d8bd-wrmnj   1/1     Running             0          3s
myapp-deployment-786d66d8bd-xfb7q   1/1     Running             0          3s
```
Lúc này các bạn sẽ thấy 10 Pod mới (version 2.0) được tạo ra và 10 Pod cũ (version 1.0) sẽ bị terminate đi.

Ban đầu khi ta tạo deployment, hệ thống đã tự sinh ra một ReplicaSet tên là **myapp-deployment-549fd4bf6c**. Lúc này ta nâng cấp deployment và thay đổi cấu hình trong template của Pod (tham số **image**) do đó hệ thống sẽ sinh ra một ReplicaSet mới chứa thông tin cấu hình mới của Pod.
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo get replicasets.apps -l "app=my-app"
NAME                          DESIRED   CURRENT   READY   AGE
myapp-deployment-549fd4bf6c   0         0         0       50m
myapp-deployment-786d66d8bd   10        10        10      3m1s
```
Như vậy ReplicaSet cũ đã bị scale về 0, và ReplicaSet mới sẽ là lên thay để quản lý và duy trì 10 Pod như yêu cầu của Deployment.
Và để lý lúc nào các Pod mới cũng theo format tên của ReplicaSet mới:
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo get pods
NAME                                READY   STATUS    RESTARTS   AGE
myapp-deployment-786d66d8bd-2xvxn   1/1     Running   0          58s
myapp-deployment-786d66d8bd-fngwd   1/1     Running   0          60s
myapp-deployment-786d66d8bd-hnrx9   1/1     Running   0          57s
myapp-deployment-786d66d8bd-jsfk4   1/1     Running   0          60s
myapp-deployment-786d66d8bd-ll22r   1/1     Running   0          57s
myapp-deployment-786d66d8bd-lxk8c   1/1     Running   0          57s
myapp-deployment-786d66d8bd-n9wk7   1/1     Running   0          60s
myapp-deployment-786d66d8bd-v6bjg   1/1     Running   0          58s
myapp-deployment-786d66d8bd-wrmnj   1/1     Running   0          60s
myapp-deployment-786d66d8bd-xfb7q   1/1     Running   0          60s
```
Kết quả rollout của deployment có thể xem bằng lệnh:
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo rollout status deployment myapp-deployment
deployment "myapp-deployment" successfully rolled out
```

## Lịch sử update của deployment
Mỗi lần chúng ta update deployment, hệ thống sẽ ghi lại lịch sử. Ví dụ như bên trên mình có nâng cấp deployment để thay đổi phiên bản cho ứng dụng từ 1.0 lên 2.0, thì hệ thống sẽ ghi lại lịch sử như sau:
```
[sysadmin@vtq-cicd demo]$ kubectl rollout history deployments myapp-deployment  -n demo
deployment.apps/myapp-deployment
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
```
Ta có thể rollback về version cũ (trong trường hợp version mới có issue) bằng cách:
```
[sysadmin@vtq-cicd demo]$ kubectl rollout undo deployment myapp-deployment --to-revision=1 -n demo
deployment.apps/myapp-deployment rolled back
[sysadmin@vtq-cicd demo]$ kubectl -n demo rollout status deployment myapp-deployment
deployment "myapp-deployment" successfully rolled out
[sysadmin@vtq-cicd demo]$ kubectl -n demo get pods
NAME                                READY   STATUS        RESTARTS   AGE
myapp-deployment-549fd4bf6c-c6wxv   1/1     Running       0          11s
myapp-deployment-549fd4bf6c-fn2wk   1/1     Running       0          11s
myapp-deployment-549fd4bf6c-fp45t   1/1     Running       0          12s
myapp-deployment-549fd4bf6c-gclfs   1/1     Running       0          12s
myapp-deployment-549fd4bf6c-gmvsv   1/1     Running       0          10s
myapp-deployment-549fd4bf6c-gzs5c   1/1     Running       0          12s
myapp-deployment-549fd4bf6c-kfn2n   1/1     Running       0          10s
myapp-deployment-549fd4bf6c-q6rvb   1/1     Running       0          12s
myapp-deployment-549fd4bf6c-v7s74   1/1     Running       0          12s
myapp-deployment-549fd4bf6c-wfpcg   1/1     Running       0          10s
myapp-deployment-786d66d8bd-2xvxn   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-fngwd   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-hnrx9   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-jsfk4   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-ll22r   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-lxk8c   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-n9wk7   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-v6bjg   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-wrmnj   1/1     Terminating   0          15m
myapp-deployment-786d66d8bd-xfb7q   1/1     Terminating   0          15m
```
Lúc này thì vì ta chọn rollback về trạng thái trước, nên ReplicaSet mới (hash **786d66d8bd**) sẽ bị scale về 0 và ReplicaSet cũ (hash **549fd4bf6c**) lại trở lại để quản lý Pod cho Deployment.

## Xóa một deployment
Ta có thể xóa deployment bằng lệnh:
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo delete deployments.apps myapp-deployment
deployment.apps "myapp-deployment" deleted
[sysadmin@vtq-cicd demo]$ kubectl -n demo get all
NAME                                    READY   STATUS        RESTARTS   AGE
pod/myapp-deployment-549fd4bf6c-c6wxv   1/1     Terminating   0          3m32s
pod/myapp-deployment-549fd4bf6c-fn2wk   1/1     Terminating   0          3m32s
pod/myapp-deployment-549fd4bf6c-fp45t   1/1     Terminating   0          3m33s
pod/myapp-deployment-549fd4bf6c-gclfs   1/1     Terminating   0          3m33s
pod/myapp-deployment-549fd4bf6c-gmvsv   1/1     Terminating   0          3m31s
pod/myapp-deployment-549fd4bf6c-gzs5c   1/1     Terminating   0          3m33s
pod/myapp-deployment-549fd4bf6c-kfn2n   1/1     Terminating   0          3m31s
pod/myapp-deployment-549fd4bf6c-q6rvb   1/1     Terminating   0          3m33s
pod/myapp-deployment-549fd4bf6c-v7s74   1/1     Terminating   0          3m33s
pod/myapp-deployment-549fd4bf6c-wfpcg   1/1     Terminating   0          3m31s
```
Khi đó hệ thống sẽ xóa deployment và các ReplicaSet/Pod của deployment đó đi.

Hy vọng qua bài này các bạn đã hiểu thêm về khái niệm Deployment và ReplicaSet. Cũng như có thể triển khai ứng dụng của mình lên k8s bằng Deployment.

***Trong phần tiếp theo mình sẽ giới thiệu cách expose ứng dụng trên K8S bằng cách sử dụng Service và Ingress. Mời các bạn đón đọc và ủng hộ. Cảm ơn mọi người.***