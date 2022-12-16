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
* [Session 8: Kubernetes Namespace](https://viblo.asia/p/k8s-basic-kubernetes-namespaces-oK9VyKnXJQR)

**Trong bài hôm nay chúng ta sẽ tìm hiểu về lưu trữ trên k8s qua các khái niệm:**
- Volume
- PersistentVolume
- PersistentVolumeClaim
- StorageClass
- Provisioner
![image.png](https://images.viblo.asia/95f0caab-ac5e-49bf-bff5-d7d8a57b89cd.png)
# Volume là gì
Khi làm việc với docker các bạn có thể đã quen với khái niệm docker volume. Hiểu một cách đơn giản thì Pod hay Server đều cần có resource để chạy gồm Memory/CPU, ngoài ra cần thêm ổ cứng nữa. Vì với server sẽ là disk còn với container sẽ là Volume.  Volume là một thư mục để các container của Pod có thể truy cập và sử dụng để lưu trữ dữ liệu được.

## Làm sao để sử dụng Volume cho pod
Quay lại với nội dung về [**Kubernetes Pod**](https://viblo.asia/p/k8s-basic-kubernetes-pods-5pPLkG3nLRZ) thì mình đã có ví dụ về sử dụng Volume trong Pod rồi. Để khai báo volume cho Pod thì cần khai báo trong tham số ```.spec.volumes``` và định nghĩa Volume đó được mount vào đâu trong container ở tham số ```.spec.containers[*].volumeMounts```

**Ví dụ sử dụng Volume cho Pod:**
```
apiVersion: v1
kind: Pod
metadata:
  name: "mypod"  
  labels:
    app: "mypod"
spec:  
  containers:
  - name: mycontainer
    image: "busybox:latest"    
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
```
Trong ví dụ trên, ta đã khai báo một Volume có tên là **localtime** cho Pod **mypod**. Sau đó trong cấu hình của Pod này, ta khai báo để mount volume **localtime** vào đường dẫn trong container **mycontainer** là **/etc/localtime**.

Bản chất của việc mount này đó là khi nào ứng dụng trong container **mycontainer** cần truy cập tới đường dẫn **/etc/localtime** trong container thì bản chất nó sẽ truy cập tới đường dẫn **/usr/share/zoneinfo/Asia/Ho_Chi_Minh** trên node mà Pod đó đang chạy.

## Các loại Volume mà Kubernetes hỗ trợ
Kubernetes hỗ trợ khá nhiều loại Volume, cho cả Public cloud và Onpremis, có thể kể đến như sau:
- persistentvolumeclaim
- configMap
- secret
- hostPath
- emptyDir
- local
- nfs
- cephfs
- ...

Trong số các loại Volume kể trên thì chúng sẽ làm việc nhiều với các loại Volume như persistentvolumeclaim, configMap và secret. Ví dụ bên trên chúng ta dùng chính là Volume loại **hostPath**

Riêng về **configMap** và **secret** thì mình sẽ có bài riêng giới thiệu và cách sử dụng của 2 đối tượng này. Trong bài hôm nay chúng ta sẽ chủ yếu tập trung tìm hiểu về loại Volume là **PersistentVolumeClaim**.

# Persistent Storage 
Các loại Ephemeral Storage  (lưu trữ tạm thời) có thời gian tồn tại song song với vòng đời của Pod. Nghĩa là khi Pod bị xóa đi hoặc bị tắt thì các dữ liệu tạm thời này cũng bị mất đi.

Ngược lại với nó, thì **Persistent Storage** vẫn còn tồn tại độc lập với Pod mà không bị xóa đi khi Pod bị xóa. Persistent Storage được sử dụng rất phổ biến trong thực tế với các ứng dụng cần lưu trữ trên K8S (statefull app).

Để tạo Persistent Storage cho các Pod/Deployment.. trên kubernetes thì ta sẽ làm việc với 2 loại tài nguyên là **PersistentVolume** (PV) and **PersistentVolumeClaim** (PVC). 

## Persistent Volumes (PV)
PersistentVolume (PV) là một phần phân vùng lưu trữ dữ liệu được cấp phát trên một hệ thống lưu trữ nhất định được thực hiện thủ công với admin hoặc tự động thông qua **Storage Class**. PV là tài nguyên của K8S Cluster giống như node cũng là tài nguyên của cluser vậy (các bạn nhớ lại tài nguyên mức cluster và tài nguyên mức namespace nhé). PV được sử dụng như Volume Plugins nhưng vòng đời của nó độc lập với Pod sử dụng PV, nghĩa là Pod có thể đã bị xóa nhưng PV thì vẫn tiếp tục tồn tại.

## PersistentVolumeClaim (PVC) 
PVC là một yêu cầu về việc cấp phát một phân vùng lưu trữ bởi một user. PVC sẽ sử dụng tài nguyên PV giống như Pod sử dụng tài nguyên của Node vậy. Pod có thể yêu cầu một tài nguyên nhất định (về CPU/Memory) mà Node cần cấp phát cho nó. Thì tương tự PVC sẽ yêu cầu một phân vùng lưu trữ có dung lượng và phương thức truy cập (access mode) nhất định (ví dụ ReadWriteOnce hay ReadWriteMany..)

## Access Mode
Các loại **access mode** gồm:
- **ReadWriteOnce (RWO)**

    Volume có thể được mount bởi một node. Và Volume này có thể được truy cập bởi nhiều Pod với điều kiện các Pod này cùng chạy trên node đó.     
- **ReadOnlyMany (ROX)**
    
    Volume có thể được mount dưới dạng ReadOnly bởi nhiều node.
    
- **ReadWriteMany (RWX)**

    Volume có thể được mount dưới dạng Read-Write bởi nhiều node.

- **ReadWriteOncePod (RWOP):**

    Volume có thể được mount dạng read-write bởi một Pod. Sử dụng trong trường hợp bạn muốn đảm bảo chỉ có duy nhất 1 Pod trong cluster có thể read-write vào volume này.

## Cách tạo PV
PV có thể được tạo bởi 2 cách: Thủ công (Static) và tự động (Dynamic):
- Static: Cluster Admin sẽ tạo thủ công trước một số PV. Sau đó khi tạo thì các PV này sẽ sẵn sàng cho user/app sử dụng. User khai báo các PVC và PV nào match với các yêu cầu trong PVC đó thì sẽ được sử dụng.

![PVC static.png](https://images.viblo.asia/c03aeac1-5d38-428e-b2c8-70e3079180bd.png)
- Dynamic: Khi không có static PV nào thỏa mãn điều kiện của PVC, thì Cluster sẽ tìm cách để tạo các PVs theo yêu của PVC. Cách tạo này dựa trên **storage class**: PVC phải yêu cầu một storage class và storage class đó phải được cấu hình sẵn việc tạo PV tự động. Các PVC set không chỉ định storage class nghĩa là disable việc tạo tự động PV cho nó.

![PVC auto.png](https://images.viblo.asia/d35875a7-d06a-4d2d-ab4f-23cb775cc0fe.png)
## Gán PV cho PVC (Binding)
Khi PVC được tạo ra với yêu cầu về một dung lượng storage nhất định cùng với access mode, thành phần controller của cluster sẽ theo dõi PVC mới tạo và tìm các PV nào "match" với yêu cầu của PVC này, và "gán" (bind) chúng lại với nhau. Khi đó PVC sẽ ở trạng thái "**Bound**". Nếu một PV được tạo động (dynamically) cho một PVC mới, thì controller sẽ luôn gán PV đó cho PVC. 

Việc gán PV vào PVC là ánh xạ **1-1**. PVC sẽ ở trạng thái **Unbound** mãi nếu như không có PV nào thỏa mãn điều kiện cho nó. Và nó sẽ chuyển trạng thái **Bound** khi có PV match với yêu cầu của nó. 

Ví dụ bạn tạo một PVC yêu cầu cấp dung lượng 100Gi, và cluster dù có sẵn rất nhiều PV có dung lượng 50Gi thì vẫn không có PV nào match với yêu cầu của PVC trên. PVC này sẽ chỉ được **Bound** nếu có PV có dung lượng 100Gi được add vào cluster.

## Sử dụng PVC
Pod sử dụng PVC (hay gọi là claim) như là Volumes (như giới thiệu bên trên). Cluster sẽ phân tích thông tin từ claim để tìm Volume được Bound và mount Volume đó cho Pod. 

## Cơ chế Reclaiming
Khi người dùng không còn sử dụng tới Volume nữa (trường hợp Pod cần xóa khi không còn sử dụng chẳng hạn), thì họ có thể xóa đối tượng PVC để cho phép lấy lại tài nguyên đã sử dụng. Cơ chế để một PersistentVolume báo với Cluster về hành động cần thực hiện với Volume sau khi nó đã được release gọi claim (PVC) gọi là **Reclaim Policy**. Volume có thể được giữ lại (**Retained**) hoặc xóa bỏ (**Deleted**).
- **Retain**:
    - Khi PVC bị xóa, PV sẽ vẫn tồn tại và Volume sẽ ở trạng thái **release**. Tuy nhiên PV này sẽ vẫn chưa ready cho PVC khác sử dụng vì dữ liệu trên Volume vẫn còn giữ nguyên. 
    - Người quản trị có thể thu lại dung lượng lưu trữ của Volume trên bằng cách xóa PV. Khi đó phần Volume trên thiết bị lưu trữ tương ứng cũng sẽ vẫn còn. Người quản trị phải xóa thủ công phần dữ liệu này
- **Delete**:
    - Với các Volume Plugin hỗ trợ Reclaim Policy dạng **delete** thì khi xóa PVC sẽ đồng thời xóa luôn PV và phần lưu trữ trên thiết bị lưu trữ.
    - Các Volume được tạo ra có cấu hình **Reclaim Policy** thì cấu hình của **storage class**
    - Người quản trị thường sẽ tạo ra các storage class khác nhau ứng với các **Reclaim Policy** khác nhau

# Storage Class
Storage Class cung cấp một phương thức cho người quản trị mô tả các "hạng" lưu trữ mà hệ thống cung cấp. Các "hạng" khác nhau sẽ tương ứng với các chất lượng lưu trữ khác nhau, hoặc tương ứng với các cơ chế backup/Reclaim Policy khác nhau.. 

## Tài nguyên Storage class
Storage Class là một tài nguyên của Cluster, tương ứng với Node hay PV vậy. Một Storage Class gồm 3 phần chính gồm: ```provisioner```, ```parameter``` và ```relaimPolicy``` và được sử dụng khi một PVC thuộc một "hạng" nào đó cần được tạo động một PV.

Tên của storage class là cực kỳ quan trọng, đó là thông tin để người dùng yêu cầu một "hạng" lưu trữ trên hệ thống. Người quản trị có thể cấu hình tên và các tham số của Storage Class khi tạo, và không thể thay đổi sau khi tạo xong.

**Ví dụ về các storage class:**
Nếu trên hệ thống của bạn cài cả storage class dùng nfs và longhorn thì bạn có thể tạo ra các storage class tương ứng với loại storage nêu trên như: 
- **nfs-storageclass**: Sẽ sử dụng nfs làm storage system và tạo các volume trên đó
- **longhorn-storageclass**: Sẽ sử dụng longhorn làm storage system và tạo các volume trên đó.
Cụ thể hơn, với longhorn thì bạn có thể chỉ định được cấu hình replicas với volume, do đó các bạn có thể  tạo nhiều storage class ứng với số lượng  replicas như sau:
    - **longhorn-single-storageclass**: Chỉ định storage class dùng longhorn storage với cấu hình volume replicas=1
    - **longhorn-ha-storageclass**: Chỉ định storage class dùng longhorn storage với cấu hình volume replicas=3 để đảo bảm high availibility

Người quản trị cũng thế tạo một Storage Class mặc định của hệ thống, khi đó các PVC không khai báo Storage Class cụ thể nào sẽ được dùng Storage Class mặc định này.

**Ví dụ khai báo storage class sử dụng nfs server:**
```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: example-nfs
provisioner: example.com/external-nfs
parameters:
  server: nfs-server.example.com
  path: /share
  readOnly: "false"
  ```
  
## Provisioner
Mỗi Storage Class có một **Provisioner** định nghĩa Plugin nào sẽ được sử dụng để tạo ra các PersistentVolume tương ứng với các phân vùng trên các hệ thống lưu trữ.
Trong cấu hình của mỗi storage class đều phải khai báo thông tin Provisioner cụ thể mà nó sử dụng để tạo ra các PV.

# Thực hành
## Cài đặt NFS storage
Các bạn tham khảo [**hướng dẫn cài đặt NFS storage ở đây**](https://viblo.asia/p/k8s-phan-3-cai-dat-storage-cho-k8s-dung-nfs-RnB5pAw7KPG).
## Tạo storage class sử dụng NFS storage
Các bạn tham khảo [**hướng dẫn tạo các Storage Class sử dụng NFS Storage ở đây**](https://viblo.asia/p/k8s-phan-3-cai-dat-storage-cho-k8s-dung-nfs-RnB5pAw7KPG)

## Tạo Pod sử dụng PVC
Tạo PVC mới sử dụng storage class đã tạo bên trên và kiểm tra trạng thái Bound/Unbound của nó:
```
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: test-pvc-delete
spec:
  storageClassName: [storage-class-name]
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Mi
```