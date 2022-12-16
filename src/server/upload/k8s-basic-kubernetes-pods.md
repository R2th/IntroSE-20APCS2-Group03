# Giới thiệu
Xin chào các bạn, chúng ta lại tiếp tục với series k8s basic để cùng nhau làm quen với k8s. Các nội dung trước chúng ta đã đi qua:

* [Session 1: Tổng quan các thành phần của kubernetes](https://viblo.asia/p/k8s-basic-tong-quan-cac-thanh-phan-cua-kubernetes-aAY4ql7qVPw)
* [Session 2:  Cài đặt môi trường Lab - Phần 1](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-1-3kY4gWdy4Ae)

* [ Session 2:  Cài đặt môi trường Lab - Phần 2](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-2-bXP4W5yYL7G)
* [Session 3: Làm việc với Node trên K8S](https://viblo.asia/p/k8s-basic-lam-viec-voi-node-tren-k8s-7ymJXKQr4kq)

**Trong bài hôm nay chúng ta sẽ làm quen và thao tác với Pod trên Kubernetes :)**
- Tìm hiểu khái niệm về Pod
- Các thành phần của Pod
- Cách tạo Pod bằng lệnh kubectl 
- Cách tạo Pod bằng file manifest (yaml file)
- Quản lý Pod trong kubernetes
- Xem log của Pod, xóa Pod..

# Pods trong kubernetes
## Pods là gì 
Để bắt đầu với kubernetes chắc chắn các bạn sẽ phải làm quen với khái niệm Pod đầu tiên. Vậy nó là gì?

Pod là thành phần đơn vị (nhỏ nhất) để Kubernetes thực hiện việc nhân bản (replication). Kubernetes có thể thực hiện nhân bản ra nhiều pod có chức năng giống nhau để tránh quá tải hoặc để đảm bảo tính sẵn sàng (high availability).

Pod có thể có nhiều container, tùy vào chức năng của nó được thiết kế. Pod chạy nhiều container trong đó thường là đóng gọi một ứng dụng xây dựng với sự phối hợp chặt chẽ từ nhiều container, chúng chia sẻ tài nguyên ổ đĩa, mạng cho nhau. 
![image.png](https://images.viblo.asia/b94d53fd-4c77-456d-b8b5-60fd914bfa4c.png)
## Thành phần cơ bản của Pod
Pod có thể được tạo trực tiếp bằng lệnh kubect gọi tới api của k8s, hoặc có thể định nghĩa dưới dạng file yaml và được apply vào k8s. 

**Ta sẽ cùng xem một ví dụ mẫu thông tin khai báo Pod dưới dạng yaml như sau:**
```
apiVersion: v1
kind: Pod
metadata:
  name: "MYAPP"
  namespace: default
  labels:
    app: "MYAPP"
spec:
  hostAliases:
    - ip: "127.0.0.1"
      hostnames:
        - "mylocalhost"
  
  initContainers:
    - name: init-container-init-container
      image: busybox
      command: ['sh', '-c', "some-command-here"]
  containers:
  - name: MYAPP
    image: "busybox:latest"
    resources:
      limits:
        cpu: 200m
        memory: 500Mi
      requests:
        cpu: 100m
        memory: 200Mi
    env:
    - name: DB_HOST
      valueFrom:
        configMapKeyRef:
          name: MYAPP
          key: DB_HOST
    ports:
    - containerPort:  80
      name:  http
    volumeMounts:
    - name: localtime
      mountPath: /etc/localtime
  volumes:
    - name: localtime
      hostPath:
        path: /usr/share/zoneinfo/Asia/Ho_Chi_Minh
  restartPolicy: Always  
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: kubernetes.io/hostname
                operator: Exists
```

Có thể thấy rằng với người mới mà nhìn vài cái file này đúng là ù tai hoa mắt. Nhưng bóc tách nó ra thì cũng không quá phức tạp. Cơ bản nó gồm 4 thành phần chính, ở root level (tức là tham số không có khoảng trắng nào):
```
apiVersion: v1
kind: Pod
metadata:

spec:
```
Các thành phần con của chúng sẽ lần lượt có indent là 2 khoảng trắng. 

**Trong đó:**
- "**kind**": Để phân loại loại tài nguyên, như chúng ta biết ngoài Pod thì có Deployment, Service...

- **metadata**: Chứa thông tin metadata của Pod, có thể kể tới một số tham số chính như tên pod, label... 

```
metadata:
  creationTimestamp: null
  labels:
    appname: http
    apptype: webapp
  name: http-pod
```
- **spec**: Đây là phần quan trọng nhất, nơi chứa các thông tin khai báo cho Pod và cho các Container trong Pod. Chúng ta điểm qua một số tham số chính của phần **spec** như sau:
```
spec:
  hostAliases:
  initContainers:
  containers:
  volumes:
  restartPolicy:
  affinity:
```
**Ta sẽ điểm qua các tham số này:**
- **hostAliases**: Giống như ta khai báo host trong file /etc/hosts của máy chủ vậy. Nhưng ở đây ta khai báo cho Pod
- **initContainers**: Khai báo thông tin của initContainer (nếu có)
- **container**: Định nghĩa thông tin chi tiết cho các container của Pod.
- **volumes**: Khai báo Volume cho Pod. Volume có thể lấy từ configmap, từ PVC.. Các phần này sẽ được đề cập sau khi ta làm quen với PV/PVC
- **restartPolicy**: Có 3 giá trị là Always, OnFailure, và Never. 
- **affinity**: Là đối tượng khai báo các thuộc tính liên quan tới schedule Pod. Ta sẽ tìm hiểu kỹ hơn khi tới bài về Scheduling. 
    - NodeAffinity/NodeAntiaffinity: Định nghĩa việc lựa chọn/không lựa chọn triển khai Pod trên một Node theo tiêu chí nào đó. 
    - PodAffinity/PodAntiaffinity: Định nghĩa việc lựa chọn/không lựa chọn triển khai Pod trên một Node phụ thuộc vào một Pod nào đó.

Lưu ý rằng thông tin **container name**, **image** là **bắt buộc** còn lại là optional.

**Tiếp đến ta sẽ đi sâu vào phần quan trọng nhất của Pod là khai báo Container, nó sẽ có cấu trúc như sau:**
```
spec:
  containers:
  - name: container1
    image: busybox:latest
    env:
    - name: DB_HOST
      valueFrom:
        configMapKeyRef:
          name: MYAPP
          key: DB_HOST
    ports:
    - containerPort: 80
      name: http
    volumeMounts:
    - name: localtime
      mountPath: /etc/localtime
```
**Mình sẽ giải thích cách khai báo container bên trên:**
- Khai báo container có tên là **container1** từ image là **busybox:latest**
- Khai báo biến môi trường tên là **DB_HOST** cho container được lấy giá trị từ một configmap tên là **MYAPP** và ở key có tên là **DB_HOST**
- Khai báo port của container là **80**, port này được đặt tên là **http**
- Khai báo một phân vùng mount từ phân vùng **localtime** vào thư mục trong container là **/etc/localtime**

## Tạo Pod bằng lệnh kubectl
Giờ thì ta đã có hình dung về Pod có những gì rồi. Ta sẽ tạo một Pod thật đơn giản bằng lệnh kubectl như sau:
```
kubectl run nginx-pod --image=nginx --port=80
```
Câu lệnh trên mục đích để tạo một Pod có tên "nginx-pod" từ image là "nginx" và listen ở port 80.

Nhưng trước khi chạy nó, ta có thể xem được từ câu lệnh trên nó sẽ gen ra yaml file như thế nào trước khi apply vào hệ thống. 

**Thêm cấu hình "--dry-run=client -oyaml" để xem trước cấu hình được gen ra chứ không apply vào hệ thống ngay:**
```
kubectl run nginx-pod --image=nginx --port=80 --dry-run=client -oyaml
```
**Kết quả sinh ra file yaml:**
```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx-pod
  name: nginx-pod
spec:
  containers:
  - image: nginx
    name: nginx-pod
    ports:
    - containerPort: 80
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```
Với cách này ta có thể thử câu lệnh để kiểm tra cú pháp, có thể thêm các tham số mới thoải mái. Mỗi lần chạy lệnh sẽ gen ra file yaml, tới khi nào ta thấy ok rồi  thì mới tạo lên hệ thống bằng cú pháp:
```
kubect apply -f [pod-yaml-file]
```
**Vẫn với ví dụ trên, mình tạo một pod có gán vài label cho nó, và chạy dry-run ra file yaml:**
```
[sysadmin@vtq-cicd ~]$  kubectl run nginx-pod --image=nginx --port=80 --labels="appname=nginx,apptype=web" --dry-run=client -oyaml > nginx-pod.yaml
[sysadmin@vtq-cicd ~]$ cat nginx-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    appname: nginx
    apptype: web
  name: nginx-pod
spec:
  containers:
  - image: nginx
    name: nginx-pod
    ports:
    - containerPort: 80
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}

```
**Lúc này mình với apply nó vào k8s:**
```
[sysadmin@vtq-cicd ~]$ kubectl apply -f nginx-pod.yaml
pod/nginx-pod created
[sysadmin@vtq-cicd ~]$ kubectl get pod nginx-pod -owide
NAME        READY   STATUS    RESTARTS   AGE   IP             NODE             NOMINATED NODE   READINESS GATES
nginx-pod   1/1     Running   0          18s   10.233.68.26   viettq-worker2   <none>           <none>
```
Như vậy là đã tạo Pod thành công, Pod ở trạng thái Running và được chạy trên node viettq-worker2 .

## Thao tác với Pod
### Một số lệnh cơ bản 
**Lấy danh sách Pod, nếu không chỉ định namesapce thì mặc định sẽ lấy ở default namespace:**
```
# Liệt kê các pod ở namespace mặc định
kubectl get pods

# Hiện thị nhiều thông tin hơn
kubectl get pod -o wide

# Hiện thị thông tin pod kèm label
kubectl get pod -o wide --show-labels

# Pod ở namepace: kubernetes-dashboard
kubectl get pod -o wide -n namespace-name

# Liệt kê các Pod có nhãn "app:pod-name"
kubectl get pod -l "app=pod-name"

# Pod ở tất cả các namespace
kubectl get pod -A
```

**Xem thông tin mô tả chi tiết của Pod:**
```
kubectl describe pod/namepod
```
**Theo dõi log của Pod:**
```
#Log của pod tên là pod-name
kubectl logs pod/pod-name
#Log tất cả các Pod có label là app=pod-name
kubectl logs -l "app=pod-name"
```
**Exec vào trong Pod để chạy lệnh, nếu có nhiều container trong Pod thì chỉ định container bằng tham số -c:**
```
kubectl exec pod-name command
kubectl exec pod-name -c container-name command
```
**Chạy lệnh bash của container trong POD pod-name và gắn terminal:**
```
kubectl exec -it pod-name bash
```
**Xóa Pod:**
```
#Xóa pod theo tên
kubectl delete pod/pod-name

#Xóa pod bằng chính file khai báo pod
kubectl delete -f pod-name.yaml
```

**Vậy là chúng ta đã tìm hiểu qua về Pod. Nó sẽ là phần rất basic để ta tiếp tục tìm hiểu về các tài nguyên như Deployment, Statefulset hay DaemonSet vì chúng sẽ đều chứa các Pod nhưng nguyên lý hoạt động của từng loại lại khác nhau.**

## Bổ sung sau buổi học
***Qua buổi đào tạo thực tế thì các bạn có nhiều câu hỏi rất hay và mình cập nhật vào đây để mọi người cùng nắm nhé!***

**Q: Pod được cấp IP như thế nào, ta có thể set IP cho Pod được không?**

A: Về cơ bản khi Pod đưuọc tạo ra thì K8S sẽ cấp phát IP cho nó trong kubernetes Network. IP này có thể được truy cập từ Kubernetes Network bao gồm các Node và Pod. Nó sẽ không truy cập được từ bên ngoài K8S

**Q: Trong Pod có nhiều container thì các container được cấp IP như thế nào?**

A: IP được cấp cho Pod chứ không được cấp cho Container. Các container bên trong Pod sẽ được truy cập thông qua IP của Pod và port của Container bên trong Pod.

**Q: Cột Ready 1/1 hay 2/2 lúc liệt kê Pod có ý nghĩa gì?**

A: Nó thể hiện tổng số container đang running (ready) trên tổng số container có trong Pod


***Cảm ơn các bạn đã theo dõi. Nếu thấy hay và bổ ích thì cho mình một Upvote vào bài viết nhé!***