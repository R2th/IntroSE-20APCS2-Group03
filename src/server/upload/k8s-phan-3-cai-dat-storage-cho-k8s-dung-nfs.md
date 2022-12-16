# Lời tựa
Mình sẽ không dành thời gian giới thiệu lại về Storage trên K8S mà sẽ tập trung vào hướng dẫn cài đặt nó. Các bạn có thể tìm hiểu kỹ hơn ở đây: https://kubernetes.io/docs/concepts/storage/storage-classes/
Trong nội dung bài viết này mình sẽ hướng dẫn các bài cài đặt cấu hình storage class sử dụng NFS.

# Giới thiệu
Như đã trình bày trong các phần trước, mình sẽ cài NFS-Server lên node vtq-rancher (để đỡ phải tạo một node riêng cho NFS vì node rancher tải khá thấp). Và mình cũng đã tạo sẵn phân vùng /data2 để dành cho NFS-Server rồi.

![image.png](https://images.viblo.asia/7c3ae5e9-f92b-4593-b0c4-7e73c7d99928.png)

Thêm một ý nữa, về reclaim policy có 2 loại là delete và retain, hiểu đơn giản đó là cấu hình chính sách xử lý các phân vùng lưu trữ khi xóa PVC.
- "delete": Khi bạn xóa một Persistent Volume Claim (PVC) trên K8S thì hệ thống cũng tự động xóa Persistent Volume (PV) tương ứng và đồng thời hỗ trợ xóa luôn phân vùng lưu trên thiết bị lưu trữ mà gán với PV đó
- "retain": Khi bạn xóa PVC trên K8S thì phân vùng lữu trữ trên thiết bị lưu trữ sẽ không tự động bị xóa đi.

## Các bước cài đặt trong bài lab này có tóm tắt lại như sau:
- Cài đặt NFS Server (trên node vtq-rancher)
- Cài đặt NFS Client (trên các Worker Node)
- Cài đặt kubect/helm3 (trên node vtq-rancher)
- Cài đặt storage class
- Tạo PVC để test
# Cài đặt NFS storage cho K8S
Trong môi trường production thì một số loại storage đã hỗ trợ sẵn NFS Server, nghĩa là có thể output ra cho bạn một phân vùng share để sử dụng. Việc quản lý lỗi, quản lý tính sẵn sàng sẽ được thực hiện trên thiết bị Storage này. Nhưng nếu bạn cài đặt NFS Server để share cho K8S sử dụng thì lúc đó nó sẽ là một node chạy single sẽ được coi là điểm chết (dead-point) vì khi NFS Server này down thì gây ảnh hưởng dịch vụ.
Trong phạm vi bài lab này do không có thiết bị Storage chuyên dụng do đó mình sẽ cài một NFS Server để sử dụng.
## Cài đặt NFS-Server

Việc cài đặt này khá đơn giản, mình sẽ cài trên OS là Centos. Đầu tiên cần tạo thư mục để share và cài NFS Server:
```bash
#NFS Server installation
sudo -s
yum install nfs-utils -y

#Create shared folder
mkdir -p /data2/delete
mkdir -p /data2/retain

#Change folder
chmod -R 755 /data2
chown -R nfsnobody:nfsnobody /data2
 
systemctl enable rpcbind
systemctl enable nfs-server
systemctl enable nfs-lock
systemctl enable nfs-idmap

systemctl start rpcbind
systemctl start nfs-server
systemctl start nfs-lock
systemctl start nfs-idmap 
#stat service
systemctl restart nfs-server
```
Cấu hình file export để share quyền cho các node theo format sau mục đích là để cho phép các node trong dải ip 192.168.10.0/24 có quyền vào 2 thư mục /data2/delete và /data2/retain:
```yaml
/data2/retain    192.168.10.0/24(rw,sync,no_root_squash,no_all_squash)
/data2/delete    192.168.10.0/24(rw,sync,no_root_squash,no_all_squash)
```

Restart lại NFS server để update cấu hình mới:
```bash
systemctl restart nfs-server
```
Kiểm tra lại xem 2 thư mục trên đã được share bằng lệnh sau:
```bash
[root@vtq-rancher sysadmin]# showmount -e 192.168.10.19
Export list for 192.168.10.19:
/data2/delete 192.168.10.0/24
/data2/retain 192.168.10.0/24
```
## Cài đặt NFS Client trên K8S Node
Cần phải cài đặt NFS Client trên tất cả các worker node để khi tạo Pod trên node đó có sử dụng NFS Storage Class thì node đó có thể mount được phân vùng NFS đã được share bởi NFS Server.

Cài NFS Client như sau:
```bash
sudo yum install nfs-utils -y
```
Sau đó cũng check lại từ node này đã thấy được các folder được share chưa:
```bash
[sysadmin@vtq-master1 ~]$ showmount -e 192.168.10.19
Export list for 192.168.10.19:
/data2/delete 192.168.10.0/24
/data2/retain 192.168.10.0/24
```

## Cài đặt NFS Storage Class trên K8S
***Chỗ này có một chú ý là ban đầu mình đã đứng từ node vtq-cicd để cài đặt Kubernetes Cluster bằng Kubespray. Toàn bộ phần cài đặt khác cho cụm K8S mình sẽ thực hiện từ node này để quản lý phần cấu hình cài đặt dễ dàng hơn (quản lý tập trung).
Mình sẽ cài đặt NFS Storage Class qua helm chart, do đó cần phải cài helm lên node này trước.***

### Cài đặt kubectl và helm 
Do phiên bản Kubernetes đang cài trong series LAB này là v1.20.7 nên mình cũng sẽ cài kubectl cùng phiên bản:
```bash
curl -LO https://dl.k8s.io/release/v1.20.7/bin/linux/amd64/kubectl
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
```
Cấu hình kubectl để kết nối tới cụm K8S của mình:
```bash
mkdir -p $HOME/.kube
scp viettq-master1:~/.kube/config  $HOME/.kube/
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
Sửa file config, tham số "server: https://127.0.0.1:6443" thành "server: https://192.168.10.11:6443" và lưu lại.
Giờ thử kiếm tra kết nối bằng lệnh kubect get node xem đã kết nối ok hay chưa:
```bash
[sysadmin@vtq-cicd .kube]$ kubectl get node
NAME             STATUS   ROLES                  AGE   VERSION
viettq-master1   Ready    control-plane,master   19h   v1.20.7
viettq-master2   Ready    control-plane,master   19h   v1.20.7
viettq-master3   Ready    control-plane,master   19h   v1.20.7
viettq-worker1   Ready    <none>                 19h   v1.20.7
viettq-worker2   Ready    <none>                 19h   v1.20.7
viettq-worker3   Ready    <none>                 19h   v1.20.7
```
OK như này là mượt rồi. Giờ tiêp tục cài helm thôi.
```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
sudo chmod 700 get_helm.sh
./get_helm.sh
```
Do helm sẽ mặc định dùng chung config của kubectl nếu có, nên ở bước này không cần cấu hình gì thêm cả. Giờ chạy thử xem đã thông chưa nào:
```bash
[sysadmin@vtq-cicd k8s_tools]$ helm list
NAME    NAMESPACE       REVISION        UPDATED STATUS  CHART   APP VERSION
```
Kết quả như trên là helm kết nối K8S ok rồi nhé!
### Cài đặt NFS Storage
Tạo thư mục cài đặt để lưu helm-chart và các file config sau này:
```bash
cd /home/sysadmin/kubernetes_installation
mkdir nfs-storage
cd nfs-storage
```
Download helm chart nfs-client-provisioner về để cài offline:
```bash
helm repo add stable https://charts.helm.sh/stable
helm search repo nfs-client-provisioner
helm pull stable/nfs-client-provisioner --version 1.2.11
tar -xzf nfs-client-provisioner-1.2.11.tgz
```
Trước khi cài đặt cần thay đổi tham số mặc định của helm chart này. Mình sẽ tạo 2 storage class khác nhau tương ứng với reclaim policy là delete và retain --> Cần 2 file value tương ứng để cài đặt 2 storage class này.
Tạo file value cho storage class có reclaim policy là "delete" và "retain":
```bash
cp nfs-client-provisioner/values.yaml values-nfs-delete.yaml
cp nfs-client-provisioner/values.yaml values-nfs-retain.yaml
```
Thay đổi các tham số trong file **values-nfs-delete.yaml** như sau:
```yaml
replicaCount: 3
server: 192.168.10.19
path: /data2/delete
provisionerName: viettq-nfs-storage-delete-provisioner
name: viettq-nfs-delete
reclaimPolicy: Delete
archiveOnDelete: false
```
Thay đổi các tham số trong file **values-nfs-retain.yaml** như sau:
```yaml
replicaCount: 3
server: 192.168.10.19
path: /data2/retain
provisionerName: viettq-nfs-storage-retain-provisioner
name: viettq-nfs-retain
reclaimPolicy: Retain
archiveOnDelete: true
```
Giờ  thì cài đặt 2 storage class này thôi, nhưng nhớ tạo một namespace riêng cho phần storage để dễ bề quản lý nhé:
```bash
[sysadmin@vtq-cicd nfs-storage]$ kubectl create namespace "storage"
namespace/storage created
[sysadmin@vtq-cicd nfs-storage]$ helm install nfs-storage-retain --namespace storage -f values-nfs-retain.yaml nfs-client-provisioner
[sysadmin@vtq-cicd nfs-storage]$ helm install nfs-storage-delete --namespace storage -f values-nfs-delete.yaml nfs-client-provisioner
```
Kết quả cài đặt sẽ như thế này:
```bash
[sysadmin@vtq-cicd nfs-storage]$ kubectl get pods -n storage
NAME                                                         READY   STATUS    RESTARTS   AGE
nfs-storage-delete-nfs-client-provisioner-74b99ddd9b-bg7jm   1/1     Running   0          69s
nfs-storage-delete-nfs-client-provisioner-74b99ddd9b-g9zsw   1/1     Running   0          69s
nfs-storage-delete-nfs-client-provisioner-74b99ddd9b-tzhxg   1/1     Running   0          69s
nfs-storage-retain-nfs-client-provisioner-99cdf9f5d-dp6zc    1/1     Running   0          90s
nfs-storage-retain-nfs-client-provisioner-99cdf9f5d-fh668    1/1     Running   0          90s
nfs-storage-retain-nfs-client-provisioner-99cdf9f5d-v5n8v    1/1     Running   0          90s
[sysadmin@vtq-cicd nfs-storage]$ kubectl get sc
NAME                PROVISIONER                      RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
viettq-nfs-delete   viettq-nfs-storage-provisioner   Delete          Immediate           true                   84s
viettq-nfs-retain   viettq-nfs-storage-provisioner   Retain          Immediate           true                   105s
```
### Kiểm tra nfs-storageclass bằng cách tạo thử pvc
Giờ tạo một PVC xem thằng nfs-storageclass nó có tự động sinh ra PV cho mình không nhé!
Tạo file config cho PVC có reclaim policy là delete như sau, lưu ý tham số **storageClassName: viettq-nfs-delete** được gán đúng với tên storage class mình đã tạo ở bước trước:
```yaml
[sysadmin@vtq-cicd nfs-storage]$ cat test-pvc-delete.yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: test-pvc-delete
spec:
  storageClassName: viettq-nfs-delete
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Mi
```
Tạo PVC bằng lệnh kubectl:
```bash
[sysadmin@vtq-cicd nfs-storage]$ kubectl apply -f test-pod-pvc-delete.yaml
pod/test-pod created
[sysadmin@vtq-cicd nfs-storage]$ kubectl get pvc
NAME              STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS        AGE
test-pvc-delete   Pending                                      viettq-nfs-delete   6s
```

Rồi tới đây bắt đầu có vấn đề, mọi thứ đã làm đúng hết thì thằng PVC này phải được gán PV cho nó chứ, tức là phải ở trạng thái "Bound" chứ sao lại pending mãi vậy?? 

Đây là một known-issue của Kubernetes phiên bản **v1.20.7** này, và để khỏi mất thời gian của các bạn thì mình hướng dẫn luôn cách xử lý nhé.
Thực hiện update lại file  **/etc/kubernetes/manifests/kube-apiserver.yaml** trên tất cả các Master Node, thêm một config như sau **- --feature-gates=RemoveSelfLink=false**, nhìn nó sẽ kiểu ntn:
```yaml
    - --tls-cert-file=/etc/kubernetes/ssl/apiserver.crt
    - --tls-private-key-file=/etc/kubernetes/ssl/apiserver.key
    #fix nfs-storageclass issue
    - --feature-gates=RemoveSelfLink=false
    image: k8s.gcr.io/kube-apiserver:v1.20.7
    imagePullPolicy: IfNotPresent
```
Sau đó thì ngồi chơi xơi nước cho hạ hỏa trong lúc chờ thằng kube-api nó tự động restart để update config mới:
```bash
[sysadmin@vtq-master1 kubernetes]$ kubectl get pods -A
NAMESPACE       NAME                                                         READY   STATUS      RESTARTS   AGE
kube-system     coredns-657959df74-929nv                                     1/1     Running     0          21h
kube-system     coredns-657959df74-v5fns                                     1/1     Running     0          21h
kube-system     dns-autoscaler-b5c786945-wlnl2                               1/1     Running     0          21h
kube-system     kube-apiserver-viettq-master1                                1/1     Running     0          88s
kube-system     kube-apiserver-viettq-master2                                1/1     Running     0          68s
kube-system     kube-apiserver-viettq-master3                                1/1     Running     0          48s
```
Rồi tụi nó lên lại rồi đấy. Giờ thì check lại thằng PVC đã được gán PV chưa nhé:
```bash
[sysadmin@vtq-cicd nfs-storage]$ kubectl get pvc
NAME              STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS        AGE
test-pvc-delete   Bound    pvc-e0f829ee-1436-4787-9ae3-00d53871acb5   10Mi       RWO            viettq-nfs-delete   78m
```
Bây giờ chắc các bạn cũng nóng lòng muốn biết khi tạo PVC có reclaim policy là delete hay retain thì khác nhau ntn rồi nhỉ. Ok, xóa hết cờ đi làm lại, sau khi test storage class đã hoạt động ok.
Xóa PVC bên trên đi:
```bash
[sysadmin@vtq-cicd nfs-storage]$ kubectl delete pvc test-pvc-delete
persistentvolumeclaim "test-pvc-delete" deleted
```
Tạo thêm một file config cho PVC có relaim policy là retain:
```yaml
[sysadmin@vtq-cicd nfs-storage]$ cat test-pvc-retain.yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: test-pvc-retain
spec:
  storageClassName: viettq-nfs-retain
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Mi
```
Giờ tạo 2 PVC, một qua storage class có relaim policy là delete, một là retain:
```bash
[sysadmin@vtq-cicd nfs-storage]$ kubectl apply -f test-pvc-delete.yaml
persistentvolumeclaim/test-pvc-delete created
[sysadmin@vtq-cicd nfs-storage]$ kubectl apply -f test-pvc-retain.yaml
persistentvolumeclaim/test-pvc-retain created
[sysadmin@vtq-cicd nfs-storage]$ kubectl get pvc
NAME              STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS        AGE
test-pvc-delete   Bound    pvc-96f5330a-c141-4623-b8c6-e56e05ff1832   10Mi       RWO            viettq-nfs-delete   6m5s
test-pvc-retain   Bound    pvc-228aa21d-a480-4d4c-aa90-1329026ee8fe   10Mi       RWO            viettq-nfs-retain   6s
```
Như vậy PVC **test-pvc-delete** được assign một PV có tên **pvc-96f5330a-c141-4623-b8c6-e56e05ff1832**, PVC **test-pvc-retain** được assign PV có tên **pvc-228aa21d-a480-4d4c-aa90-1329026ee8fe**.

2 PV này tương ứng là 2 phân vùng được tạo trên NFS-Server. Ta sẽ kiểm tra phân vùng tạo trên NFS-Server xem sao:
```bash
[sysadmin@vtq-rancher data2]$ tree
.
├── delete
│   └── default-test-pvc-delete-pvc-96f5330a-c141-4623-b8c6-e56e05ff1832
└── retain
    └── default-test-pvc-retain-pvc-228aa21d-a480-4d4c-aa90-1329026ee8fe
```
Như vậy ta thấy các phân vùng được tạo ở đúng các thư mục như cấu hình storage class. Giờ xóa cả 2 PVC xem chuyện gì xảy ra:
```bash
[sysadmin@vtq-cicd nfs-storage]$ kubectl delete pvc test-pvc-delete
persistentvolumeclaim "test-pvc-delete" deleted
[sysadmin@vtq-cicd nfs-storage]$ kubectl delete pvc test-pvc-retain
persistentvolumeclaim "test-pvc-retain" deleted
[sysadmin@vtq-cicd nfs-storage]$ clear;kubectl get pv,pvc
No resources found
```
Quay trở lại NFS-Server để kiểm tra:
```bash
[sysadmin@vtq-rancher data2]$ tree
.
├── delete
└── retain
    └── default-test-pvc-retain-pvc-228aa21d-a480-4d4c-aa90-1329026ee8fe
```
Đó, giờ thì các bạn đã rõ sự khác biệt. Khi xóa PVC, PV cũng sẽ bị xóa. Nếu reclaim policy là delete --> Phân vùng lưu trữ trên thiết bị storage cũng sẽ bị xóa luôn. Và ngược lại nếu reclaim policy là retain thì phân vùng sẽ vẫn còn lưu trên thiết bị lưu trữ.

***Cài đặt thằng nfs storage cho Kubernetes Cluster tưởng đơn giản nhưng cũng mất nhiều bước. Trong bài sau mình sẽ tiếp tục hướng dẫn cài đặt longhorn storage cho K8S. Các bạn chú ý theo dõi nhé! Thank you!***