# Giới thiệu
Xin chào các bạn, như vậy trong series Kubernetes Basic chúng ta đã tìm hiểu các khái niệm của Kubernetes và các thành phần cơ bản nhất như Pod, Deployment/ReplicaSet và Service:

* [Session 1: Tổng quan các thành phần của kubernetes](https://viblo.asia/p/k8s-basic-tong-quan-cac-thanh-phan-cua-kubernetes-aAY4ql7qVPw)
* [Session 2:  Cài đặt môi trường Lab - Phần 1](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-1-3kY4gWdy4Ae)
* [ Session 2:  Cài đặt môi trường Lab - Phần 2](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-2-bXP4W5yYL7G)
* [Session 3: Làm việc với Node trên K8S](https://viblo.asia/p/k8s-basic-lam-viec-voi-node-tren-k8s-7ymJXKQr4kq)
* [Session 4: Kubernetes Pods](https://viblo.asia/p/k8s-basic-kubernetes-pods-5pPLkG3nLRZ)
* [Session 5: Kubernetes Deployment and ReplicaSet](https://viblo.asia/p/k8s-basic-kubernetes-deployments-and-replicaset-obA46Po9LKv)
* [Session 6: Kubernetes Services](https://viblo.asia/p/k8s-basic-kubernetes-services-7ymJXKZa4kq)

**Trong bài hôm nay chúng ta sẽ làm cac bài tập thực hành để củng cố lại những kiến thức bên nhé!**
Các file tài liệu mẫu mình sẽ để ở thư mục "**PracticeTest 01**" ở repo tài liệu sau: **https://github.com/rockman88v/kubernetes_basic_course.git**

Các bài thực hành sẽ thực hiện trên namespace **practice**. Trước khi bắt đầu bài thực hành các bạn cần tạo trước namespace này:
```
kubectl create ns "practice"
```
# Thực hành với Pod
Trước hết các bạn apply file manifest sau vào hệ thống **pod-sample1.yaml** bằng lệnh:
```
kubectl -n practice apply -f pod-sample1.yaml
```

**Pod_Task_01:**
```
Pod vừa được tạo có tên là gì?
Pod vừa được tạo có những container nào, tên container và image tương ứng?
Pod vừa được tạo đang có trạng thái là gì, được chạy trên node nào?
Kiểm tra log của init container trong Pod vừa tạo bên trên? 
```



**Pod_Task_02:**
```
Tạo Pod mới trong namespace practice có tên mynginx sử dụng image là mynginx sử dụng lệnh kubectl.
Pod trên có chạy được không? Nếu không thì lý do là gì?
Đổi lại image cho Pod trên thành nginx và kiểm tra lại kết quả tạo Pod (có thể xóa pod cũ rồi tạo lại theo image mới)
```

# Thực hành với ReplicaSet
Trước hết các bạn apply các file manifest từ repo vào hệ thống bằng lệnh:
```
kubectl -n practice apply -f replicaset-sample1.yaml
kubectl -n practice apply -f replicaset-sample2.yaml
kubectl -n practice apply -f replicaset-sample3.yaml
```

**ReplicaSet_Task_01**
```
Việc tạo ReplicaSet từ file manifest replicaset-sample1.yaml có thành công không? 
Nếu không thì hãy fix lỗi cho nó
```

**ReplicaSet_Task_02**
```
Việc tạo ReplicaSet từ file manifest replicaset-sample2.yaml có thành công không? 
Nếu không thì hãy fix lỗi cho nó
```

**ReplicaSet_Task_03**
```
Trạng thái các Pod của ReplicaSet "replicaset-sample3" là gì?
Hãy update ReplicaSet "replicaset-sample3" đổi image thành busybox
Xóa hết các Pod hiện tại để xem các Pod mới sinh ra có running không?
```

# Thực hành với Deployment
Trước hết các bạn apply các file manifest từ repo vào hệ thống bằng lệnh:
```
kubectl -n practice apply -f deployment-sample1.yaml
kubectl -n practice apply -f deployment-sample2.yaml
```

**Deployment_Task_01**
```
Việc tạo Deployment từ file manifest deployment-sample1.yaml có thành công không? 
Nếu không thì hãy fix lỗi cho nó
```
**Deployment_Task_02**
```
Trong namespace "practice" có bao nhiêu Deployment?
Bao nhiêu Deployment ở trạng thái ready?
```

**Deployment_Task_03**

Thực hiện sửa file "**deployment-sample1.yaml**" cập nhật tham số spec.resource.requests.memory từ **20Mi** lên **30Mi** và apply lại:
```
kubectl -n practice apply -f deployment-sample1.yaml
```

```
Liệt kê các ReplicaSet của Deployment "deployment-sample1" ?
Liệt kê các Pod của Deployment "deployment-sample1" ?
Các Pod này đang có cấu hình request memory bằng bao nhiêu?
```

**Deployment_Task_04**
```
Thực hiện rollback Deployment "deployment-sample1" về phiên bản đầu tiên
Liệt kê các Pod của Deployment "deployment-sample1" ?
Các Pod này đang có cấu hình request memory bằng bao nhiêu?
Tăng số lượng Pod cho Deployment này thành 5 Pod
```

# Thực hành với Service
Trước hết các bạn apply các file manifest từ repo vào hệ thống bằng lệnh:
```
kubectl -n practice apply -f service-clusterip.yaml
kubectl -n practice apply -f service-nodeport.yaml
```

**Service_Task_01**
```
Việc tạo Service từ file manifest service-clusterip.yaml để expose Deployment "deployment-sample2" có thành công không? 
Nếu không hãy fix nó
Liệt kê các endpoints của service này?
```

**Service_Task_02**
```
File manifest "service-nodeport.yaml" nhằm mục tiêu expose Deployment "deployment-sample2" ra dưới dạng NodePort.
Service này apply có thành công hay không?
Nếu không hãy fix lỗi để có thể truy cập được ứng dụng ở NodePort 30888
```

***Các bạn hãy vận dụng các lý thuyết và tập lệnh mẫu ở các bài học trước để giải quyết các yêu cầu trên ! Nếu có vướng mắc chỗ nào thì để lại comment để mình giải đáp nhé!***