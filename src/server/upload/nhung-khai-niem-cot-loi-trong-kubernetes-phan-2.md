![](https://images.viblo.asia/50a6be9f-5d8e-4aaa-9be8-6a72cac4b0fd.png)

## 1. ReplicaSets 

Ở phần 1, chúng ta đã cùng đề cập đến khái niệm [ReplicationControllers](https://viblo.asia/p/nhung-khai-niem-cot-loi-trong-kubernetes-phan-1-RQqKL9wzZ7z#_2-replicationcontrollers-4) là một thành phần của hệ thống Kubernetes giúp quản lý trạng thái của các [Pods](https://viblo.asia/p/nhung-khai-niem-cot-loi-trong-kubernetes-phan-1-RQqKL9wzZ7z#_1-pods-noi-ma-cac-container-duoc-chay-len-0) cũng như các node luôn sẵn sàng.

**ReplicaSets** trong Kubernetes cũng có vai trò tương tự như **ReplicationControllers**, nói chính xác hơn thì **ReplicaSets** được giới thiệu nhằm thay thế  **ReplicationControllers**.


### So sánh tương quan giữa ReplicaSets và ReplicationControllers

- **ReplicationControllers** chỉ có thể được tạo trực tiếp bằng cách cấu hình file `yaml` hay dùng trực tiếp bằng command line với `kubectl`. Với **ReplicaSets**, ngoài cách khởi tạo thông thường giống như **ReplicationControllers**  thì còn có thể được tạo ra tự động khi chúng ta khởi tạo một đối tượng **Deployment** (chúng ta sẽ tìm hiểu Deployment ở phần sau).
- **ReplicaSets** có thể được cấu hình để áp dụng cho nhiều giá trị labels trong cùng một trường. **ReplicationControllers** thì chỉ có thể áp dụng cho các Pods có một giá trị cho mỗi trường labels. Ví dụ **ReplicaSets** có thể áp dụng cho các Pods có labels `env=production`, `env=development`, v.v còn  **ReplicationControllers** chỉ áp dụng cho các Pods có labels là  `env=development` chẳng hạn.

## 2. Volumes

Như chúng ta đã biết, hệ thống Kubermetes sẽ tạo ra Pods mới thay thế khi một Pods bị lỗi, chết hay crash. Vậy còn dữ liệu được lưu trong Pods cũ sẽ đi đâu ? Pods mới có lấy lại được dữ liệu của Pods cũ đã mất để tiếp tục sử dụng không ? Khái niệm **Voulumes** sẽ giúp giải quyết các vấn đề trên.

**Volumes** là thành phần trực thuộc Pods. **Volumes** được định nghĩa trong cấu hình file `yaml` khi khởi tạo các Pods. Các container có thể thực hiện **mount** dữ liệu bên trong container đến đối tượng volumes thuộc cùng Pods.

![](https://images.viblo.asia/27422723-9966-42d5-878b-d204396ba905.png)

*Các Container trong Pods mount đến 2 voumes để chia sẻ dữ liệu với nhau*

### Các loại volumes

- emptyDir
- hostPath
- gitRepo
- nfs
- Cloud volumes: gcePersistentDisk (Google Compute Engine Persistent Disk), awsElasticBlockStore (Amazon Web Services Elastic Block Store Volume), azureDisk
(Microsoft Azure Disk Volume). 
- cinder, cephfs, iscsi, flocker, glusterfs, quobyte, rbd, flexVolume, vsphereVolume, photonPersistentDisk, scaleIO: 
- configMap, secret, downwardAPI: 
- persistentVolumeClaim:

Như đã thấy, có rất nhiều loại volumes khác nhau, trong khuôn khổ bài viết không cho phép đi tìm hiểu hết các loại volumes. Chúng ta sẽ chỉ điểm qua một vài loại volumes.

#### EmptyDir Volumes

là loại volumes đơn giản nhất. Ban đầu chỉ là một folder trống, các container có thể sử dụng emptyDir volumes để đọc, ghi dữ liệu và chia sẻ cho các container khác cùng Pods. Khi Pods bị crash hay bị xóa thì emptyDir volumes cũng mất luôn cùng với dữ liệu trong nó.

**Tạo một EmptyDir volumes* (Trong file cấu hình của Pods)**

`fortune-pod.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
 name: fortune
spec:
 containers:
 - image: luksa/fortune
     name: html-generator
     volumeMounts:
         - name: html
             mountPath: /var/htdocs
 - image: nginx:alpine
     name: web-server
     volumeMounts:
         - name: html
             mountPath: /usr/share/nginx/html
             readOnly: true
     ports:
         - containerPort: 80
           protocol: TCP
     volumes:
     - name: html
         emptyDir: {} 
```

Nhìn vào file cấu hình trên, ta cos:
- Pods gồm có 2 container là: `html-generator`, `web-server`.
- Thư mục của container `html-generator` được mount với volumes là `/var/htdocs`
- Thư mục của container `web-server` được mount với volumes  là `/usr/share/nginx/html` ở cế độ `readOnly` (chỉ đọc dữ liệu từ volumes vào container).

Ở ví dụ này, container `html-generator` sẽ thay đổi file `index.html` trong folder `/var/htdocs` 10 giây 1 lần. Khi file html mới được hình thành, nó sẽ được cập nhật ở volumes và container `web-server` có thể đọc chúng. Khi người dùng gửi request chẳng hạn đến container `web-server` nginx, dữ liệu được trả về là file `index.html` mới nhất.

- 3 Dòng cuối chứa thông tin về tên volumes và kiểu volumes là `emptyDir`. Mặc định, `emptyDir` sẽ dùng tài nguyên ổ cứng của `worker nodes` để lưu trữ. Chúng ta có thể có một lựa chọn khác là sử dụng bộ nhớ RAM của `worker nodes` như sau:

```yaml
volumes:
     - name: html
     emptyDir:
         medium: Memory
```

#### hostPath volume

Như chúng ta đã biết, với `empty volume`, dữ liệu sẽ mất khi Pods bị lỗi, xóa hay crash vì `empty volume` là một thành phần thuộc Pods. Với `hosPath` volume, dữ liệu được lưu trong volumes sẽ không bị mất khi Pods bị lỗi vì nó vốn được nằm ngoài Pods (trong hệ thống file của worker node). Khi Pods mới được tạo thành để thay thế Pods cũ, nó sẽ mount đến `hostPath volume` để làm việc tiếp với các dữ liệu ở Pods cũ.

![](https://images.viblo.asia/26c81744-115e-4d1d-a7ae-a74c305ba83b.png)

#### ConfigMap và Secret

Thông thường khi lập trình các ứng dụng, chúng ta đều cho các biến quan trọng (như mật khẩu url DB, secret key, tên DB v.v.) vào file `.env` dưới dạng biến môi trường để bảo đảm tính bí mật. Trong hệ thống Kubernetes, **Config Map** và **Secret** là 2 loại volumes giúp lưu trữ biến môi trường để dùng cho các container thuộc các Pods khác nhau. **Config Map** sẽ dùng với các biến môi trường không chứa thông tin quá nhạy cảm, cần bí mật. **Secret**, như đúng với cái tên gọi của nó sẽ được dùng để lưu trữ các biến môi trường quan trọng, nhạy cảm. Khác với các loại volume khác,  **Config Map** và **Secret** sẽ được định nghĩa riêng với file `yaml` thay vì cấu hình ở trong file `yaml` khởi tạo Pods.

```js
apiVersion: v1
kind: ConfigMap
metadata:
  creationTimestamp: 2017-12-27T18:36:28Z
  name: game-config-env-file
  namespace: default
  resourceVersion: "809965"
  uid: d9d1ca5b-eb34-11e7-887b-42010a8002b8
data:
  allowed: '"true"'
  enemies: aliens
  lives: "3"
```


```js
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm
```

![](https://images.viblo.asia/2880276d-517f-4a63-b9c2-eada5a54a469.png)

### 3. Deployments

Từ trước đến nay, thành phần đầu tiên cần phải khởi tạo trong một hệ thống Kubernetes không gì khác là  **Pods**. Và như chúng ta đã biết, để quản lý trạng thái của các **Pods** thì lại cần tạo thêm các **Replication Controller** để quản lý các Pods đó, thao tác khá là cồng kềnh. Và hãy tưởng tượng ở một hệ thống lớn đến rất lớn có hàng trăm, hàng ngàn hay hàng vạn Pods thì lại cứ mất công đi tạo thêm các **Replication Controller** để quản lý các Pods hay nhóm Pods theo labels đó hay sao ?

Kubernetes dã giới thiệu khái niệm **Deployments** giúp đơn giản hóa hơn quá trình bên trên. Với **Deployments** , chúng ta sẽ chỉ cần định nghĩa cấu hình và tạo 1 **Deployments** thì hệ thống sẽ tự động tạo ra 1 hay nhiều **Pods** tương ứng và **ReplicaSet** để quản lý trạng thái của các Pods đó. Ngoài ra, **Deployments** còn có cơ chế giúp người quản lý hệ thống dễ dàng cập nhật, rollback phiên bản của ứng dụng (phiên bản container chạy trong các Pods).

![](https://images.viblo.asia/db1d0783-0c88-42a6-8d80-26acc5123712.png)


```js
apiVersion: apps/v1beta1
kind: Deployment
metadata:
    name: kubia
spec:
 replicas: 3
 template:
     metadata:
     name: kubia
     labels:
         app: kubia
     spec:
         containers:
         - image: luksa/kubia:v1
         name: nodejs
```

Ở file yaml trên, chúng ta định nghĩa 1 deployment tên là kubia. Cấu hình cho Replicas luôn duy trì số lượng 3 Pods, các Pods chạy sẽ có labels `app=kubia` và container chạy trong Pods sẽ được build từ image `luksa/kubia:v1`


### Tài liệu tham khảo
[Kubernetes in Action](https://www.manning.com/books/kubernetes-in-action)

[Kubernetes Docs](https://kubernetes.io/docs/concepts)