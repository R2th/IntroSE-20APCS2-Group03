# Giới thiệu
Chào mừng các bạn trở lại series **kubernetes basic** với nội dung về Kubernetes StatefulSet.

Trong bài này mình sẽ giới thiệu về StatefulSet là gì, được ứng dụng như thế nào và cách triển khai một ứng dụng dưới dạng statefulset. Nào hãy cùng bắt đầu nhé!
![image.png](https://images.viblo.asia/dbd8c1cb-be0f-4b5a-96f6-3f0051497eab.png)

# Statefulset là gì
## Stateful và stateless 
Các ứng dụng có thể được chia thành 2 loại là **stateful application** và **stateless application**. Điểm khác nhau cơ bản và rõ ràng nhất đó là các ứng dụng **stateless** không lưu trạng thái xử lý trước đó, mọi request tới đều được xử lý như một yêu cầu hoàn toàn mới, không liên quan gì tới các xử lý trước đó. 

Các ứng dụng **stateful** thường thấy như các loại database (MySQL, ElasticSearch...) là các ứng dụng mà lưu trữ dữ liệu mà nó xử lý để theo dõi. Các dữ liệu này thường được lưu ở các hệ thống lưu trữ ([**Persistent Storage**](https://viblo.asia/p/k8s-basic-kubernetes-storage-qPoL7X6mVvk) như đề cập ở bài trước).

Ví dụ về stateless và stateful app:
![image.png](https://images.viblo.asia/56aad0d0-a177-4621-801c-f84025942b6d.png)

Như trong ví dụ trên, ta có một ứng dụng nodejs xử lý yêu cầu của client. Mỗi khi có request tới, nó thực hiện các nghiệp vụ của nó và lưu trạng thái vào Database. Khi có yêu cầu sửa/xóa dữ liệu thì nó đơn giản là forward yêu cầu đó để xử lý trên database, bản thân nó không lưu dữ liệu. Bản thân nó không quan tâm tới các xử lý trước đó của nó ==> Đây là **stateless app**.

Database xử lý thêm/sửa/xóa dữ liệu thì các thay đổi đó được lưu lại. Ví dụ một bản ghi đã bị xóa thì lần xử lý sau sẽ không còn bản ghi đó nữa ==> Đây là **stateful app**.

## Triển khai ứng dụng stateful và stateless
Các ứng dụng stateless thường triển khai dưới dạng **Deployment**. Do các yêu cầu xử lý là độc lập nhau, ta có thể dễ dàng scale ứng dụng lên (tăng số lượng Pod) để xử lý request. 

Các ứng dụng stateful được triển khai dưới dạng **StatefulSet**. Ví dụ các database như mysql, mongodb, elastich-search đều được triển khai dưới dạng statefulset trên kubernetes. 

# Sự khác nhau giữa statefulset và deployment
## Deployment

- Các Pod của Deployment là hoàn toàn giống nhau (Identical) và có thể thay thế lẫn nhau về chức năng. Nghĩa là một Pod bị lỗi thì hoàn toàn có thể thay thế bằng một Pod mới để tiếp tục xử lý.
- Deployment trước tiên sẽ sinh ra các Replicaset, sau đó ReplicaSet sẽ tạo ra các Pod theo thứ tự ngẫu nhiên. Tên Pod cũng theo format tên của Replicaset + mã hash random gán vào đuôi mỗi Pod. 
- Có thể tạo một Service để Load balancing tới tất cả các Pod cho các request tới ứng dụng
- Các Pod của Deployment cũng có thể bị xóa theo thứ tự bất kỳ, hoặc xóa đồng thời nhiều Pod (trong trường hợp scale down deployment)


## Statefulset
- Các Pod của Statefulset không thể được tạo hay xóa cùng lúc. Nó sẽ được tạo tuần tự. 
- Các Pod của Statefuleset **không hoàn toàn giống nhau**. Trên thực tế nó đều có các định dang riêng. Có dạng pod-0, pod-1.. của statefulset
- Các Pod được tạo với các mô tả giống nhau (specification) nhưng không thể thay thế lẫn nhau (not interchangeable)
- Khi một Pod bị lỗi nó sẽ được thay thế bằng một Pod mới cùng định danh (ví dụ pod-1 bị lỗi sẽ được thay bằng Pod mới nhưng tên vẫn là pod-1).

***Vậy tại sao chúng ta cần duy trì thông tin định danh cho các Pod mà không thể tạo random như với Deployment? Hãy xem xét tiếp ví dụ với việc scale một stateful app là mysql database.***

## Mở rộng ứng dụng database
Để giải thích cho việc sử dụng StatefulSet, ta xem xét bài toàn cần mở rộng một ứng dụng database như sau.
Ta đang có 1 Pod mysql-0 cho ứng dụng database. Pod này làm đồng thời nhiệm vụ Read/Write dữ liệu vào DB, dữ liệu này được lưu trên disk thông qua Persistent Volume.
![image.png](https://images.viblo.asia/dbc95d23-c020-42c6-9b78-8f67ba9be021.png)

Lúc này ta mong muốn add thêm một Pod cho ứng dụng này, thì ta không thể làm theo cách trên được vì lúc đó cả 2 Pod sẽ cùng đọc ghi chung một dữ liệu và dẫn tới vấn đề không đồng nhất dữ liệu (data inconsistency):
![image.png](https://images.viblo.asia/f9f1644e-0ae7-4b1c-a916-2bc7af4a5452.png)

Và để giải quyết vấn đề trên thì sẽ chỉ có 1 Pod được phép đọc/ghi dữ liệu (read/write), Pod còn lại sẽ chỉ có quyền đọc (read) để giúp toàn vẹn dữ liệu:
![image.png](https://images.viblo.asia/dcf78b97-6546-4cf6-b595-03b6a98e91a0.png)

Tương tự như vậy, ta có thể scale ứng dụng thêm các Pod mới để tăng khả năng đọc vào DB. Theo đó Pod có quyền read/write sẽ được gọi là Master, các Pod có quyền đọc gọi là Slave:
![image.png](https://images.viblo.asia/f39ed78a-4eb3-439f-b353-6718c830da3f.png)

Một điều quan trọng nữa với Statefulset là các Pod của nó không sử dụng chung phần lưu trữ. Mỗi Pod sẽ có phân vùng lưu trữ khác nhau dù dữ liệu chúng lưu trữ là như nhau (cùng được replicate từ bản chính ra):
![image.png](https://images.viblo.asia/ac968a19-617f-4f94-beea-e9786c5cc6a7.png)

Mỗi Pod sẽ có phân vùng lưu trữ riêng của nó để lưu trữ dữ liệu. Dữ liệu của mỗi Pod được liên tục đồng bộ để đảm bảo dữ liệu lưu trên mỗi Pod là luôn giống hệt nhau.

Một lưu ý nữa là khi Pod bị xóa hay crash, dữ liệu của nó sẽ không bị mất đi mà vẫn được lưu trên các Volume của nó (tạo bởi PV/PVC). 

## Trạng thái Pod trong Statefulset
Mỗi Pod đều có trạng thái của nó: Master hay Slave. Thông tin trạng thái của Pod được lưu trên PV của Pod và do đó trường hợp Pod bị crash thì dữ liệu đó không bị ảnh hưởng. 

Lấy ví dụ Pod mysql-o bị crash thì hệ thống sẽ tạo ra một Pod mới vẫn lấy tên là mysql-0 để thay thế Pod cũ và nó sẽ lấy thông tin trạng thái của nó (đang là Master) và tiếp tục xử lý dữ liệu:

![image.png](https://images.viblo.asia/037c1d7f-1c27-410c-b05c-fd1b7c3f1ad4.png)

Để đảm bảo được việc giữ trạng thái của Pod trong quá trình này thì phải đảm bảo các storage sử dụng cho các Pod là có thể truy cập được từ mọi worker node. Do đó khi Pod có thể được gán vào node khác so với ban đầu thì nó vẫn attach được PV cũ của nó.

![image.png](https://images.viblo.asia/8b11ae09-7ac9-4a35-b6c6-f11ee1497ce0.png)

*Ví dụng dùng NFS storage class là một loại remote storage để sử dụng được trong trường hợp này.*

## Định danh Pod trong Statefulset
Tên Pod trong deployment được tạo với random hash trong khi Pod của Statefulset được tạo với thứ tự cố định, tạo bởi format **statefulset-(số thứ tự Pod)**. 
Như ví dụ bên trên ta tạo một Statefulset cho ứng dụng mysql với replicas=3 ta có các Pod lần lượt là mysql-0 (Master), mysql-1 (Slave) và mysql-2 (Slave).

**Thứ tự tạo Pod của Statefulset**
Các Pod của Statefulset sẽ được tạo theo đúng thứ tự tên của nó. Pod sau sẽ không được tạo cho tới khi Pod trước đó đã up và running. Nếu việc Pod trước đó bị failed hay ở trạng thái Pending, thì các Pod sau đó của Statefulset sẽ không được tạo.

**Thứ tự xóa Pod của Statefuleset**
Việc xóa Pod của Statefulset cũng phải được thực hiện theo thứ tự, nhưng là ngược lại so với thứ tự khi tạo Pod. Việc xóa Pod có thể xảy ra khi bạn xóa Statefulset hay thực hiện Scale để giảm số lượng Pod xuống.

Cũng tương tự như trên, nếu Pod trước đó chưa được xóa thành công thì Pod sau đó sẽ không bị xóa. Cơ này xóa này giúp bảo vệ dữ liệu và trạng thái của ứng dụng, tránh việc bị mất đồng bộ hay conflict dữ liệu.

## Pod Endpoint
Khi tạo Statefulset và có định nghĩa ServiceName trong cấu hình của Statefulset thì Kubernetes sẽ tạo cho chúng ta các bản ghi DNS cho từng Pod tương ứng theo format như sau:
`(PodName).(ServiceName).(NameSpace).svc.(CluserName)`
Ngoài ra ta cũng có thể tạo service dạng ClusterIP nhưng set giá trị `clusterIP: none` để tạo ra một headless service cho ứng dụng.

***Trong phần thực hành bên dưới mình sẽ làm rõ hơn phần này cho các bạn.***

![image.png](https://images.viblo.asia/9fb31297-65bc-484f-8887-8cef5e6e8ee8.png)
# Thực hành cài đặt một cụm Database MySQL bằng statefulset
Mình sẽ cài đặt một cụm DB MySQL bằng Statefulset trên K8S. Phần lưu trữ sẽ dùng PV/PVC để mount vào các Pod. Các bạn cần cài đặt sẵn storage class để sử dụng. Nếu chưa có thì có thể tham khảo [**hướng dẫn cài Storage Class dùng NFS Storage**](https://viblo.asia/p/k8s-phan-4-cai-dat-storage-cho-k8s-dung-longhorn-1Je5EAv45nL) hoặc [**cài Storage Class dùng Longhorn Storage**](https://viblo.asia/p/k8s-phan-3-cai-dat-storage-cho-k8s-dung-nfs-RnB5pAw7KPG) nhé!

Mình sẽ cài đặt trên một namespace có tên là db, nếu chưa có thì cần tạo trước namespace trước khi thực hiện các bước cài đặt, hoặc các bạn có thể chọn namespace nào tùy ý:
```
kubectl create ns db
```

## Tạo secret để cấu hình password cho database
Các bạn tạo một file manifest `mysql-secret.yaml` để cấu hình secret với nội dung như sau:
```
apiVersion: v1
kind: Secret
metadata:
  name: mysql-password
type: opaque
stringData:
  MYSQL_ROOT_PASSWORD: Admin_1234
```
*Trong đó password có thể set tùy mong muốn của các bạn, và ghi nhớ để sử dụng về sau khi connect tới DB nhé!*

Tạo secret từ file yaml trên bằng lệnh sau `kubectl -n db apply -f mysql-secret.yaml`

## Cài đặt và cấu hình Storage Class
Mình đã có sẵn storage class trên hệ thống và sẽ sử dụng storage class `viettq-nfs-retain` cho phần cài đặt này:
```
[sysadmin@vtq-cicd statefulset]$ kubectl get sc
NAME                PROVISIONER                             RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
viettq-nfs-delete   viettq-nfs-storage-delete-provisioner   Delete          Immediate           true                   57d
viettq-nfs-retain   viettq-nfs-storage-retain-provisioner   Delete          Immediate           true                   57d
```

## Cấu hình Statefulset để cài MySQL
Các bạn tạo file manifest `mysql-sts.yaml` để khai báo cấu hình statefulset như sau:
```
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql-sts
spec:
  selector:
    matchLabels:
      app: mysql
  serviceName: "mysql-svc"
  replicas: 3
  template:
    metadata:
      labels:
        app: mysql
    spec:
      terminationGracePeriodSeconds: 10
      containers:
      - name: mysql
        image: mysql:5.7
        ports:
        - containerPort: 3306
        volumeMounts:
        - name: mysql-pvc
          mountPath: /var/lib/mysql
        env:
          - name: MYSQL_ROOT_PASSWORD
            valueFrom:
              secretKeyRef:
                name: mysql-password
                key: MYSQL_ROOT_PASSWORD
  volumeClaimTemplates:
  - metadata:
      name: mysql-pvc
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "viettq-nfs-retain"
      resources:
        requests:
          storage: 1Gi
```          
**Ở đây có một số tham số các bạn cần lưu ý:**
- `name: mysql-sts`: Pod được tạo ra sẽ có format là **mysql-sts-(index)**. Trong ví dụ này mình tạo 3 replicas nên sẽ có 3 Pod được tạo ra là **mysql-sts-0**, **mysql-sts-1** và **mysql-sts-2**
- `serviceName: "mysql-svc"`: Việc khai báo serviceName này sẽ tạo ra các bản ghi DNS riêng cho từng Pod theo format `(PodName).(ServiceName).(NameSpace).svc.(CluserName)`. Cụ thể gồm:
    - mysql-sts-0.mysql-svc.db.svc.cluster.local
    - mysql-sts-1.mysql-svc.db.svc.cluster.local
    - mysql-sts-2.mysql-svc.db.svc.cluster.local
- Phần cấu hình storage mình sử dụng storage class `viettq-nfs-retain` với dung lượng yêu cầu cho mỗi PVC là 1Gi và mode là `RWO`
- Cơ bản các giá trị khác cũng tương tự khi khai báo Deployment.

**Tạo Statefuleset từ file manifest trên bằng lệnh:**
```
[sysadmin@vtq-cicd statefulset]$ k -n db apply -f mysql-sts.yaml
statefulset.apps/mysql-sts created
```
**Lúc này có Pod sẽ được tạo tuần tự:**
```
[sysadmin@vtq-cicd statefulset]$ k -n db get pod
NAME          READY   STATUS              RESTARTS   AGE
mysql-sts-0   1/1     Running             0          49s
mysql-sts-1   0/1     ContainerCreating   0          7s
[sysadmin@vtq-cicd statefulset]$ k -n db get pod
NAME          READY   STATUS    RESTARTS   AGE
mysql-sts-0   1/1     Running   0          95s
mysql-sts-1   1/1     Running   0          53s
mysql-sts-2   1/1     Running   0          8s
```
**Mỗi Pod đều được gán với một PVC:**
```
[sysadmin@vtq-cicd statefulset]$ kubectl -n db get pvc
NAME                    STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS        AGE
mysql-pvc-mysql-sts-0   Bound    pvc-3296c023-14a1-4383-8066-700e5cfc0db1   1Gi        RWO            viettq-nfs-retain   40m
mysql-pvc-mysql-sts-1   Bound    pvc-17084bf5-a1c6-4b7c-bf5e-b15f28a17e37   1Gi        RWO            viettq-nfs-retain   38m
mysql-pvc-mysql-sts-2   Bound    pvc-dc503741-4ce7-4c3e-b358-311440a53b0e   1Gi        RWO            viettq-nfs-retain   37m
```

Lưu ý dù ta có khai báo tham số `serviceName: "mysql-svc"` nhưng việc này chỉ giúp tạo cho ta bản ghi DNS chứ không tạo ra service có tên là `mysql-svc`.

## Tạo service cho ứng dụng
Lưu ý không tạo service Load Balancer cho ứng dụng mà sử dụng loại `headless service` bằng cách chỉ định giá trị `clusterIP: None`. Ta sẽ tạo file manifest `mysql-service-headless.yaml` định nghĩa service như sau:
```
apiVersion: v1
kind: Service
metadata:
  name: mysql-svc
  labels:
    app: mysql
spec:
  ports:
  - port: 3306
  clusterIP: None
  selector:
    app: mysql
```
**Sau đó apply vào hệ thống:**
```
[sysadmin@vtq-cicd statefulset]$ kubectl -n db apply -f mysql-service-headless.yaml
service/mysql-svc created
```

## Cài đặt MySQL Client để test kết nối
Tạo file manifest `mysql-client.yaml` để khai báo mysql-client với nội dung như sau:
```
apiVersion: v1
kind: Pod
metadata:
  name: mysql-client
spec:
  containers:
  - name: mysql-container
    image: alpine
    command: ['sh','-c', "sleep infinitively"]
    imagePullPolicy: IfNotPresent
```
**Tạo Pod trên bằng câu lệnh:**
```
[sysadmin@vtq-cicd statefulset]$ k -n db apply -f mysql-client.yaml
pod/mysql-client created
```
**Sau khi tạo xong Pod ta kết nối vào trong Pod để cài đặt MySQL client:**
```
[sysadmin@vtq-cicd statefulset]$ kubectl -n db  exec --stdin --tty mysql-client -- sh
/ # apk add mysql-client
fetch https://dl-cdn.alpinelinux.org/alpine/v3.16/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.16/community/x86_64/APKINDEX.tar.gz
(1/7) Installing mariadb-common (10.6.10-r0)
(2/7) Installing libgcc (11.2.1_git20220219-r2)
(3/7) Installing ncurses-terminfo-base (6.3_p20220521-r0)
(4/7) Installing ncurses-libs (6.3_p20220521-r0)
(5/7) Installing libstdc++ (11.2.1_git20220219-r2)
(6/7) Installing mariadb-client (10.6.10-r0)
(7/7) Installing mysql-client (10.6.10-r0)
Executing busybox-1.35.0-r17.trigger
OK: 39 MiB in 21 packages
```

Đứng từ Pod MySQL Client này ta sẽ kết nối tới mysql db bằng format lệnh `mysql -u root -p -h host-server-name` trong đó `host-server-name` là tên của mysql. Với cấu hình cài đặt bên trên thì cú pháp như sau:
```
stateful_name-ordinal_number.(serviceName).(namespace).svc.(clusterName)

#Trong ví dụ này
mysql-sts-0.mysql-svc.db.svc.cluster.local
```

**Như vậy ta sẽ connect vào db và tạo một database mới:**
```
/ # mysql -u root -p -h mysql-sts-0.mysql-svc.db.svc.cluster.local
Enter password:
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.40 MySQL Community Server (GPL)
Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MySQL [(none)]> create database mydb;
Query OK, 1 row affected (0.005 sec)
```

**Câu lệnh bên trên chúng ta đã kết nối tới Pod để tạo database. Ta sẽ thực hiện tương tự cho 2 Pod còn lại:**
```
/ # mysql -u root -p -h mysql-sts-1.mysql-svc.db.svc.cluster.local
Enter password:
[output-truncated]
MySQL [(none)]> create database mydb;
Query OK, 1 row affected (0.005 sec)
MySQL [(none)]> Bye
/ # mysql -u root -p -h mysql-sts-2.mysql-svc.db.svc.cluster.local
Enter password:
[output-truncated]
MySQL [(none)]> create database mydb;
Query OK, 1 row affected (0.005 sec)
```

Như vậy dữ liệu của 3 Pod này là không hề được đồng bộ với nhau.

***Theo ví dụ này bạn  đã dựng được một stateful application tuy nhiên việc sao chép và đồng bộ dữ liệu giữa các Pod là việc của bạn phải tự setup, statefulset không thực hiện việc này thay bạn được.***