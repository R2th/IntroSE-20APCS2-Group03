# Lời tựa
Hello mọi người đã trở lại với series về Kubernetes của mình. Qua loạt bài trước mình đã chia sẻ quá trình dựng lab kubernetes và cài đặt đủ thứ cho nó rồi.

Đến đây có một vấn đề rất quan trọng các bạn cần lưu ý, đó là phải backup lại hệ thống định kỳ. Nếu không may một ngày đẹp trời mà hệ thống nó sập thì còn có cọc để mà bám vào :D 

Mô hình cài đặt của mình đang có 3 master node (tương ứng với cụm etcd cluster có 3 node) và 3 worker node.
Một node CICD bên ngoài k8s để lưu trữ tập trung các file cài đặt lên k8s.

Trong bài hôm nay mình sẽ chia sẻ với các bạn về cách backup hệ thống kubernetes bằng cách snapshot ETCD để dễ dàng khôi phục hệ thống khi có sự cố nhé!

![image.png](https://images.viblo.asia/f0d7454a-0fe2-41ae-9c5c-e94c7fccac69.png)

# ETCD là gì
Etcd là một CSDL dạng key-value được dùng để lưu dữ liệu về hệ thống, tài nguyên và cấu hình của kubenetes cluster. Khi bạn tạo mới các ứng dụng bao gồm những deployment, pod, service.. thì những thông tin định nghĩa này sẽ được lưu vào etcd. 

Etcd được chạy dưới dạng cluster và số lượng member trong cluster là lẻ. Theo tài liệu của etcd thì recommand cho production là nên cài 5 node etcd để đảm bảo tính sẵn sàng (availability). Trong ví dụ sử dụng hôm nay mình có etcd gồm 3 member.

Để thao tác với etcd thì mình recommand sử dụng **etcdctl**, nó tương tự như chúng ta dùng kubectl để giao tiếp với k8s vậy. Để sử dụng thì ta cần cài đặt và cấu hình certificate cho nó có thể kết nối được tới etcd cluster. 

**Cú pháp sử dụng etcdctl như sau:**
```
ETCDCTL_API=3 etcdctl <etcd-command> \
--endpoints=https://127.0.0.1:2379 \
--cacert=<trusted-ca-file> \
--cert=<cert-file> \
--key=<key-file>
```
# Cài đặt và sử dụng etcdctl
## Cài đặt etcdctl
Ở đây do toàn bộ các node của mình đều cài centos7 nên mình cũng hướng dẫn cài etcdctl trên centos7. Với các OS khác các bạn hoàn toàn có thể tự cài được tương tự.

***Ở đây mình thao tác trên node CICD nhé, để tách biệt với các máy chủ cài k8s.***

Trước hết ta tạo thư mục cài đặt:
```
[sysadmin@vtq-cicd ~]$ mkdir -p /home/sysadmin/kubernetes_installation/etcd_backup
[sysadmin@vtq-cicd ~]$ cd /home/sysadmin/kubernetes_installation/etcd_backup
[sysadmin@vtq-cicd etcd_backup]$
```
Cài đặt một số gói phần mềm phụ trợ như curl, wget..
```
[sysadmin@vtq-cicd etcd_backup]$ sudo yum -y install wget curl
```

Download gói cài đặt của etcd trên centos:
```
curl -s https://api.github.com/repos/etcd-io/etcd/releases/latest \
  | grep browser_download_url \
  | grep linux-amd64 \
  | cut -d '"' -f 4 \
  | wget -i -
  ```
  
**Copy các file binary vào thư mục chứa file thực thi của hệ điều hành:**
```
cd /home/sysadmin/kubernetes_installation/etcd_backup
tar xvf etcd-v*.tar.gz
cd etcd-*/
sudo cp etcd* /usr/local/bin/
sudo cp etcd* /usr/bin/
cd ..
rm -rf etcd*
```

**Kiểm tra phiên bản của etcdctl:**
```
[sysadmin@vtq-cicd etcd_backup]$ etcdctl version
etcdctl version: 3.5.5
API version: 3.5
```
***Như vậy là ta đã cài đặt xong etcdctl lên node cicd rồi. Việc tiếp theo là cấu hình cho nó kết nối được etcd cluster của cụm k8s của chúng ta.***

## Cấu hình etcdctl
Để kết nối tới etcd cluster ta cần các thông tin như: IP/Port của etcd endpoints, các file cert sử dụng để kết nối.

Để lấy các thông tin này, ta có thể lấy từ mô tả của pod **kube-api-server**, vì nó là thành phần kết nối trực tiếp với etcd trong k8s cluster.

**Thực hiện lệnh sau để lấy các tham số command của kube-api-server (lưu ý tên pod đúng với cluster của bạn nhé):**
```
kubectl -n kube-system get pod kube-apiserver-viettq-master1 -o=jsonpath='{.spec.containers[0].command}' |jq |grep etcd
```
**Kết quả thu được:**
```
  "--etcd-cafile=/etc/ssl/etcd/ssl/ca.pem",
  "--etcd-certfile=/etc/ssl/etcd/ssl/node-viettq-master1.pem",
  "--etcd-keyfile=/etc/ssl/etcd/ssl/node-viettq-master1-key.pem",
  "--etcd-servers=https://192.168.10.11:2379,https://192.168.10.12:2379,https://192.168.10.13:2379",
  "--storage-backend=etcd3",
```

Như vậy ta đã có thông tin các etcd endpoints và đường dẫn tới các file cert trên node master1.
Giờ trên node cicd này, ở thư mục chúng ta từ tạo (/home/sysadmin/kubernetes_installation/etcd_backup) ta lần lượt tạo ra 3 file:
- File **ca.pem** và copy nội dung cho nó từ file **/etc/ssl/etcd/ssl/ca.pem** trên node **viettq-master1**
- File **cert.pem** và copy nội dung cho nó từ file **/etc/ssl/etcd/ssl/node-viettq-master1.pem** trên node **viettq-master1**
- File **key.pem** và copy nội dung cho nó từ file **/etc/ssl/etcd/ssl/node-viettq-master1-key.pem** trên node **viettq-master1**

**Kết quả sẽ như sau (lưu ý quyền và owner của các file này nhé):**
```
[sysadmin@vtq-cicd etcd_backup]$ ls -lrt
total 12
-rw-rw-r-- 1 sysadmin sysadmin 1679 Sep 22 23:37 ca.pem
-rw-rw-r-- 1 sysadmin sysadmin 1444 Sep 22 23:37 cert.pem
-rw-rw-r-- 1 sysadmin sysadmin 1090 Sep 22 23:49 key.pem
```
**Giờ thì ta có thể bắt đầu thao tác với etcdctl với thông số như sau:**
```
ETCDCTL_API=3 etcdctl [some-command] \
--endpoints=https://192.168.10.11:2379 \
--cacert=/home/sysadmin/kubernetes_installation/etcd_backup/ca.pem \
--cert=/home/sysadmin/kubernetes_installation/etcd_backup/cert.pem \
--key=/home/sysadmin/kubernetes_installation/etcd_backup/key.pem
```

**Hoặc chạy cách sau cũng tương tự:**
```
export ETCDCTL_CACERT=/home/sysadmin/kubernetes_installation/etcd_backup/ca.pem
export ETCDCTL_CERT=/home/sysadmin/kubernetes_installation/etcd_backup/cert.pem
export ETCDCTL_KEY=/home/sysadmin/kubernetes_installation/etcd_backup/key.pem
export ETCDCTL_API=3
etcdctl [some-command]
```

**Trước hết, ta kiểm tra danh sách node trong etcd cluster bằng lệnh "member list" như sau:**
```
ETCDCTL_API=3 etcdctl member list --endpoints=https://192.168.10.11:2379 \
--cacert=/home/sysadmin/kubernetes_installation/etcd_backup/ca.pem \
--cert=/home/sysadmin/kubernetes_installation/etcd_backup/cert.pem \
--key=/home/sysadmin/kubernetes_installation/etcd_backup/key.pem
```



**Kết quả:**
```
8b0ca30665374b0, started, etcd3, https://192.168.10.13:2380, https://192.168.10.13:2379, false
2106626b12a4099f, started, etcd2, https://192.168.10.12:2380, https://192.168.10.12:2379, false
c6702130d82d740f, started, etcd1, https://192.168.10.11:2380, https://192.168.10.11:2379, false
```

**Lấy danh sách key của etcd:**
```
ETCDCTL_API=3 etcdctl get / --prefix --keys-only --endpoints=https://192.168.10.11:2379 \
--cacert=/home/sysadmin/kubernetes_installation/etcd_backup/ca.pem \
--cert=/home/sysadmin/kubernetes_installation/etcd_backup/cert.pem \
--key=/home/sysadmin/kubernetes_installation/etcd_backup/key.pem
```

**Một số resource được lưu trong etcd như sau:**
```
/registry/daemonsets/kube-system/kube-proxy
/registry/daemonsets/kube-system/nodelocaldns

/registry/deployments/cattle-system/cattle-cluster-agent
/registry/deployments/ingress/ingress-nginx-ingress-controller
/registry/deployments/storage/nfs-storage-delete-nfs-client-provisioner

/registry/endpointslices/ingress/apple-service-kx9dv
/registry/endpointslices/ingress/ingress-nginx-ingress-controller-7b4hw

/registry/ingress/ingress/apple.dev.viettq.com
/registry/ingress/ingress/apple.prod.viettq.com
/registry/ingress/ingress/banana.prod.viettq.com

/registry/ingressclasses/nginx

/registry/masterleases/192.168.10.11
/registry/masterleases/192.168.10.12
/registry/masterleases/192.168.10.13

/registry/minions/viettq-master1
/registry/minions/viettq-master2
/registry/minions/viettq-master3
/registry/minions/viettq-worker1
/registry/minions/viettq-worker2
/registry/minions/viettq-worker3

/registry/namespaces/cattle-system
/registry/namespaces/default
/registry/namespaces/fleet-system
/registry/namespaces/ingress
/registry/namespaces/kube-node-lease
/registry/namespaces/kube-public

/registry/persistentvolumeclaims/storage/test-pvc-delete
/registry/persistentvolumes/pvc-d8c24be8-0449-4e2d-907e-b50c6c2d9ff3

/registry/pods/ingress/apple-app
/registry/pods/ingress/banana-app
/registry/pods/ingress/ingress-nginx-ingress-controller-546fb6d5f-cn9dr
/registry/pods/storage/nfs-storage-delete-nfs-client-provisioner-5b7c76bb6-lpvlm
/registry/pods/storage/nfs-storage-delete-nfs-client-provisioner-5b7c76bb6-r49k6
/registry/pods/storage/nfs-storage-delete-nfs-client-provisioner-5b7c76bb6-w28cz

/registry/replicasets/ingress/ingress-nginx-ingress-controller-546fb6d5f
/registry/replicasets/storage/nfs-storage-delete-nfs-client-provisioner-5b7c76bb6
/registry/replicasets/storage/nfs-storage-retain-nfs-client-provisioner-5f8d88b89d

/registry/rolebindings/cattle-system/clusterrolebinding-2bsqr
/registry/rolebindings/cattle-system/clusterrolebinding-4rx84

/registry/roles/ingress/ingress-nginx-ingress-controller

/registry/secrets/cattle-system/cattle-credentials-001603a

/registry/serviceaccounts/ingress/default
/registry/serviceaccounts/storage/nfs-storage-delete-nfs-client-provisioner
/registry/serviceaccounts/storage/nfs-storage-retain-nfs-client-provisioner

/registry/services/endpoints/default/kubernetes
/registry/services/endpoints/ingress/apple-service
/registry/services/endpoints/ingress/banana-service
/registry/services/endpoints/ingress/ingress-nginx-ingress-controller

/registry/services/specs/default/kubernetes
/registry/services/specs/ingress/apple-service
/registry/services/specs/ingress/banana-service
/registry/services/specs/ingress/ingress-nginx-ingress-controller

/registry/storageclasses/viettq-nfs-delete
/registry/storageclasses/viettq-nfs-retain

/registry/clusterrolebindings/clusterrolebinding-62tv2
/registry/clusterrolebindings/clusterrolebinding-9dgc7
/registry/clusterrolebindings/clusterrolebinding-9fqxd

/registry/clusterroles/admin
/registry/clusterroles/cattle-admin
/registry/clusterroles/cluster-admin

/registry/configmaps/cattle-system/kube-root-ca.crt
/registry/configmaps/cattle-system/rancher-charts-fjf2r
/registry/configmaps/cattle-system/rancher-partner-charts-dvxgd

```

**Ta lấy value của một key ta thực hiện lệnh get:**
```
ETCDCTL_API=3 etcdctl get /registry/deployments/storage/nfs-storage-delete-nfs-client-provisioner \
--endpoints=https://192.168.10.11:2379 \
--cacert=/home/sysadmin/kubernetes_installation/etcd_backup/ca.pem \
--cert=/home/sysadmin/kubernetes_installation/etcd_backup/cert.pem \
--key=/home/sysadmin/kubernetes_installation/etcd_backup/key.pem
```

***Như vậy chúng ta đã cài đặt/cấu hình etcdctl và thực hiện các thao tác cơ bản với etcd cluster trên k8s rồi. Tiếp theo ta sẽ thực hiện backup/restore cho etcd.***

# Backup và restore etcd
Kịch bản test chức năng backup/restore như sau:
- Trước khi backup, ta sẽ cài một vài ứng dụng lên
- Thực hiện backup
- Sửa/xóa ứng dụng đã cài ở bước trên
- Thực hiện restore ==> Expect ứng dụng trở lại cấu hình như ban đầu trước khi sửa/xóa

## Cài đặt ứng dụng
Mình sẽ tạo một namespace mới là **demo-backup-restore**
```
[sysadmin@vtq-cicd apps]$ kubectl create ns demo-backup-restore
namespace/demo-backup-restore created
```
Sau đó cài đặt một ứng dụng nodejs lên đó như sau:
```
[sysadmin@vtq-cicd apps]$ kubectl -n demo-backup-restore apply -f deployment.yaml
deployment.apps/node-app-deployment created
[sysadmin@vtq-cicd apps]$ kubectl -n demo-backup-restore get pods
NAME                                   READY   STATUS    RESTARTS   AGE
node-app-deployment-75c7c88b58-6sksd   1/1     Running   0          13m
node-app-deployment-75c7c88b58-9d2c9   1/1     Running   0          13m
node-app-deployment-75c7c88b58-sglrc   1/1     Running   0          13m
```

***Ở đây các bạn tạo ựng dụng bất kỳ nhé, có thể là deployment hay pod hay service.. Vì mục tiêu của mình là tạo xong sẽ backup lại etcd và xóa các ứng dụng đó đi. Sau đó restore lại etcd thì các ứng dụng đó cũng sẽ được restore.***

## Backup etcd dùng snapshot
**Thực hiện backup etcd:**
```
ETCDCTL_API=3 etcdctl snapshot save /home/sysadmin/kubernetes_installation/etcd_backup/etcd_snapshot \
--endpoints=https://192.168.10.11:2379 \
--cacert=/home/sysadmin/kubernetes_installation/etcd_backup/ca.pem \
--cert=/home/sysadmin/kubernetes_installation/etcd_backup/cert.pem \
--key=/home/sysadmin/kubernetes_installation/etcd_backup/key.pem
```

**Kết quả của lệnh backup trên là lưu snapshot của etcd ra file /home/sysadmin/kubernetes_installation/etcd_backup/etcd_snapshot:**
```
{"level":"info","ts":"2022-09-22T23:57:32.300-0400","caller":"snapshot/v3_snapshot.go:65","msg":"created temporary db file","path":"/home/sysadmin/kubernetes_installation/etcd_backup/etcd_snapshot.part"}
{"level":"info","ts":"2022-09-22T23:57:32.308-0400","logger":"client","caller":"v3/maintenance.go:211","msg":"opened snapshot stream; downloading"}
{"level":"info","ts":"2022-09-22T23:57:32.309-0400","caller":"snapshot/v3_snapshot.go:73","msg":"fetching snapshot","endpoint":"https://192.168.10.11:2379"}
{"level":"info","ts":"2022-09-22T23:57:32.785-0400","logger":"client","caller":"v3/maintenance.go:219","msg":"completed snapshot read; closing"}
{"level":"info","ts":"2022-09-22T23:57:32.942-0400","caller":"snapshot/v3_snapshot.go:88","msg":"fetched snapshot","endpoint":"https://192.168.10.11:2379","size":"50 MB","took":"now"}
{"level":"info","ts":"2022-09-22T23:57:32.942-0400","caller":"snapshot/v3_snapshot.go:97","msg":"saved","path":"/home/sysadmin/kubernetes_installation/etcd_backup/etcd_snapshot"}
Snapshot saved at /home/sysadmin/kubernetes_installation/etcd_backup/etcd_snapshot
```

**Verify lại kết quả backup:**
```
ETCDCTL_API=3 etcdctl --write-out=table snapshot status /home/sysadmin/kubernetes_installation/etcd_backup/etcd_snapshot \
--endpoints=https://192.168.10.11:2379 \
--cacert=/home/sysadmin/kubernetes_installation/etcd_backup/ca.pem \
--cert=/home/sysadmin/kubernetes_installation/etcd_backup/cert.pem \
--key=/home/sysadmin/kubernetes_installation/etcd_backup/key.pem
```
**Thông tin của bản snapshot được hiển thị như sau:**
```
Deprecated: Use `etcdutl snapshot status` instead.

+----------+----------+------------+------------+
|   HASH   | REVISION | TOTAL KEYS | TOTAL SIZE |
+----------+----------+------------+------------+
| 9bd9b496 |  1071549 |       2370 |      50 MB |
+----------+----------+------------+------------+
```
***Như vậy là ta đã backup etcd thành công!***

## Sửa/xóa ứng dụng sau khi backup
**Vì trong bài lab này mình có tạo một deployment có 3 pod, giờ mình sẽ xóa nó đi để lát nữa thử restore lại xem được không nhé:**
```
[sysadmin@vtq-cicd apps]$ kubectl -n demo-backup-restore delete -f deployment.yaml
deployment.apps "node-app-deployment" deleted
[sysadmin@vtq-cicd apps]$ kubectl -n demo-backup-restore get pods
NAME                                   READY   STATUS        RESTARTS   AGE
node-app-deployment-75c7c88b58-6sksd   1/1     Terminating   0          17m
node-app-deployment-75c7c88b58-9d2c9   1/1     Terminating   0          17m
node-app-deployment-75c7c88b58-sglrc   1/1     Terminating   0          17m
[sysadmin@vtq-cicd apps]$ kubectl -n demo-backup-restore get pods
No resources found in demo-backup-restore namespace.
```
Sau bước này mình kiểm tra không còn pod nào của deployment này nữa.

## Restore etcd từ bản backup
**Rồi, giả sử bước xóa bên trên là "tai nạn", giờ ta cần "chữa cháy" bằng cách restore thì thực hiện như sau:**
- Dùng etcdctl để restore etcd-data từ file snapshot ta đã backup ở bước trên
- Stop tất cả các instance của kube-api-server trên k8s cluster
- Thay thế etcd-data hiện tại bằng data từ bản backup
- Restart các service của k8s
- Verify lại kết quả thực hiện

Như ban đầu chúng ta có tạo ra một deployment có 3 pod sau đó backup lại etcd. Sau đó chúng ta đã "lỡ tay" xóa mất deployment này. Vậy mục tiêu khi chúng ta restore etcd xong thì deployment này phải được tạo lại tự động cho chúng ta.

### Restore etcd data
Chúng ta sẽ dùng file snapshot ở bước trước để restore, nhưng có điểm khác là sẽ restore ra local chứ không phải restore thẳng vào etcd cluster.

**Câu lệnh để restore như sau:**
```
export ETCDCTL_CACERT=/home/sysadmin/kubernetes_installation/etcd_backup/ca.pem
export ETCDCTL_CERT=/home/sysadmin/kubernetes_installation/etcd_backup/cert.pem
export ETCDCTL_KEY=/home/sysadmin/kubernetes_installation/etcd_backup/key.pem
export ETCDCTL_API=3
cd /home/sysadmin/kubernetes_installation/etcd_backup/
etcdctl snapshot restore etcd_snapshot
```
**Kết quả thư mục default.etcd được sinh ra ở thư mục hiện tại:**
```
[sysadmin@vtq-cicd etcd_backup]$ pwd
/home/sysadmin/kubernetes_installation/etcd_backup
[sysadmin@vtq-cicd etcd_backup]$ ls -lrt
total 49000
-rw-rw-r-- 1 sysadmin sysadmin     1679 Sep 22 23:37 key.pem
-rw-rw-r-- 1 sysadmin sysadmin     1444 Sep 22 23:37 cert.pem
-rw-rw-r-- 1 sysadmin sysadmin     1090 Sep 22 23:49 ca.pem
drwxrwxr-x 3 sysadmin sysadmin       89 Sep 23 02:38 apps
-rw------- 1 sysadmin sysadmin 50159648 Sep 23 04:19 etcd_snapshot
drwx------ 3 sysadmin sysadmin       20 Sep 23 05:14 default.etcd
```
***NOTE: Lưu ý ở đây chúng ta thực hiện trên local (node CICD) nên không cần tham số endpoint cho câu lệnh restore nhé!***

### Stop các control plane instance
Việc restore lại etcd hơi phức tạp hơn backup một chút, và các bạn phải hết sức cẩn thận!

***NOTE: Để restore etcd thì một điều chú ý là phải stop tất cả các instance của kube-api-server, restore etcd ở tất cả các etcd instance sau đó start lại tất cả instance của kube-api-server!***

Nếu các bạn nghĩ có thể dùng lệnh kubectl để stop các pod này thì các bạn sai rồi đấy :D. Các thành phần control plane đều được triển khai dưới dạng **Static Pods**. Chúng không được quản lý bởi bất kỳ loại triển khai nào như Deployment, Statefulset hay Daemonset, mà được định nghĩa dạng "tĩnh" trong các file cấu hình dạng yaml nằm ở thư mục **/etc/kubernetes/manifests/** trên các **master node**:
```
[root@viettq-master1 member]# ll /etc/kubernetes/manifests/
total 16
-rw-------. 1 root root 4330 Sep 12 02:00 kube-apiserver.yaml
-rw-------. 1 root root 3037 Sep 12 01:25 kube-controller-manager.yaml
-rw-------. 1 root root 1619 Sep 12 01:25 kube-scheduler.yaml
```
Các file cấu hình này được đọc và xử lý bởi **kubelet** chạy trên các master node. Do đó để stop/delete các static pod này ta đơn giản chỉ cần move chúng ra khỏi thư mục mặc định. **Kubelet** sẽ scan định kỳ để tìm kiếm sự thay đổi và apply nó. Khi ta remove file khỏi thư mục thì tương ứng kubelet sẽ remove pod đi và ngược lại.

**Ta sẽ tạo thư mục /k8s-backup để move các file yaml ra đó, sau khi restore etcd xong ta sẽ move lại để restore service:**
```
[sysadmin@viettq-master1 ~]$ sudo -s
[root@viettq-master1 member]# mkdir /k8s-backup
[root@viettq-master1 sysadmin]# mv /etc/kubernetes/manifests/*.yaml /k8s-backup/
[root@viettq-master1 sysadmin]# ll /k8s-backup/
total 16
-rw-------. 1 root root 4330 Sep 12 02:00 kube-apiserver.yaml
-rw-------. 1 root root 3037 Sep 12 01:25 kube-controller-manager.yaml
-rw-------. 1 root root 1619 Sep 12 01:25 kube-scheduler.yaml
[root@viettq-master1 sysadmin]# ll /etc/kubernetes/manifests/
total 0
```
Lặp lại bước trên cho 2 node master còn lại trong cluster.

***Lưu ý: Sau khi thực hiện bước này thì lệnh kubectl cũng sẽ không hoạt động nữa do ta đã stop hết kube-api-server rồi.***

Các bạn có thể verify lại bằng cách kiểm tra các container của api, controller và scheduler đều đã không còn:
```
[root@viettq-master1 sysadmin]# docker ps -a |egrep "api|schedule|control"
```

### Restore etcd-data từ bản backup
Trước tiên ta cần chuẩn bị sẵn file backup lên các node master. Dữ liệu backup đang được lưu ở trên cicd node ở đường dẫn:
```
/home/sysadmin/kubernetes_installation/etcd_backup/default.etcd/member
```
Ta sẽ copy nó sang các master node ở đường dẫn **/k8s-backup**:
```
[sysadmin@vtq-cicd member]$ sudo scp -r /home/sysadmin/kubernetes_installation/etcd_backup/default.etcd/member root@viettq-master1:/k8s-backup/
root@viettq-master1's password:
db                                                                                                       100%   48MB  98.0MB/s   00:00
0000000000000001-0000000000000001.snap                                                                   100% 6490    11.1MB/s   00:00
0000000000000000-0000000000000000.wal                                                                    100%   61MB  61.7MB/s   00:00
```
Lặp lại bước copy này sang 2 node master còn lại. Tới đây thì trên mỗi master node ta đều có ở thư mục **/k8s-backup** có nội dung như sau:
```
[root@viettq-master3 sysadmin]# ll /k8s-backup/
total 16
-rw-------. 1 root root 4330 Sep 12 02:01 kube-apiserver.yaml
-rw-------. 1 root root 3037 Sep 12 01:26 kube-controller-manager.yaml
-rw-------. 1 root root 1619 Sep 12 01:25 kube-scheduler.yaml
drwx------. 4 root root   29 Sep 23 05:49 member
```

**Tiếp theo ta sẽ thay thế dữ liệu của etcd hiện tại với dữ liệu từ bản backup (thực hiện trên tất cả master node):**
```
[root@viettq-master3 sysadmin]# mv /var/lib/etcd/member/ /var/lib/etcd/member.bak
[root@viettq-master3 sysadmin]# mv /k8s-backup/member /var/lib/etcd/
[root@viettq-master3 sysadmin]# ll /var/lib/etcd/
total 0
drwx------. 4 root root 29 Sep 23 05:49 member
drwx------. 4 root root 29 Sep 22 06:17 member.bak
```

###  Start các control plane instance
Chúng ta chỉ đơn giản move lại các file yaml đã backup ở thư mục **/k8s-backup** về lại thư mục **/etc/kubernetes/manifests/**. 

**Thực hiện các bước dưới đây trên tất cả các master node:**
```
[root@viettq-master1 k8s-backup]# ll /k8s-backup/*.yaml
-rw-------. 1 root root 4330 Sep 12 02:00 /k8s-backup/kube-apiserver.yaml
-rw-------. 1 root root 3037 Sep 12 01:25 /k8s-backup/kube-controller-manager.yaml
-rw-------. 1 root root 1619 Sep 12 01:25 /k8s-backup/kube-scheduler.yaml
[root@viettq-master1 k8s-backup]# mv /k8s-backup/*.yaml /etc/kubernetes/manifests/
[root@viettq-master1 k8s-backup]# systemctl restart docker
```

```
[root@viettq-master2 sysadmin]# mv /k8s-backup/*.yaml /etc/kubernetes/manifests/
[root@viettq-master2 sysadmin]# systemctl restart docker
```

```
[root@viettq-master3 sysadmin]#  mv /k8s-backup/*.yaml /etc/kubernetes/manifests/
[root@viettq-master3 sysadmin]# systemctl restart docker
```

**Lúc này kiểm tra các bạn sẽ thấy các container của control plane được start lên:**
```
[root@viettq-master1 k8s-backup]# docker ps |egrep "api|schedule|control"
b76c9e8968eb   22d1a2072ec7           "kube-controller-man…"   18 seconds ago   Up 17 seconds             k8s_kube-controller-manager_kube-controller-manager-viettq-master1_kube-system_bc7c0e53757217105c35af4da0e7a233_2
1db1c7cc2cb6   38f903b54010           "kube-scheduler --au…"   20 seconds ago   Up 19 seconds             k8s_kube-scheduler_kube-scheduler-viettq-master1_kube-system_653aeb278187902c4e7f9b0a6eb92385_2
41e32f5cff81   034671b24f0f           "kube-apiserver --ad…"   28 seconds ago   Up 27 seconds             k8s_kube-apiserver_kube-apiserver-viettq-master1_kube-system_7e5cf782ae8a158e0288f1c0e854ded2_2
a2a2de672684   k8s.gcr.io/pause:3.3   "/pause"                 28 seconds ago   Up 27 seconds             k8s_POD_kube-controller-manager-viettq-master1_kube-system_bc7c0e53757217105c35af4da0e7a233_2
0db025948970   k8s.gcr.io/pause:3.3   "/pause"                 28 seconds ago   Up 27 seconds             k8s_POD_kube-scheduler-viettq-master1_kube-system_653aeb278187902c4e7f9b0a6eb92385_2
a7c25c0a8316   k8s.gcr.io/pause:3.3   "/pause"                 28 seconds ago   Up 27 seconds             k8s_POD_kube-apiserver-viettq-master1_kube-system_7e5cf782ae8a158e0288f1c0e854ded2_2
```

**Lúc này k8s đã up trở lại và ta có thể sử dụng kubectl được. Ta kiểm tra các node đã ok hết hay chưa:**
```
[sysadmin@vtq-cicd member]$ kubectl get nodes
NAME             STATUS   ROLES                  AGE   VERSION
viettq-master1   Ready    control-plane,master   11d   v1.20.7
viettq-master2   Ready    control-plane,master   11d   v1.20.7
viettq-master3   Ready    control-plane,master   11d   v1.20.7
viettq-worker1   Ready    <none>                 11d   v1.20.7
viettq-worker2   Ready    <none>                 11d   v1.20.7
viettq-worker3   Ready    <none>                 11d   v1.20.7
```

Như vậy là hệ thống không bị die, thế là mừng rồi :D. Nhưng vấn đề quan trọng nhất là cái deployment của chúng ta liệu có được restore hay không thì phải check:

```
[sysadmin@vtq-cicd member]$ k -n demo-backup-restore get pods
NAME                                   READY   STATUS    RESTARTS   AGE
node-app-deployment-75c7c88b58-glb9r   1/1     Running   0          99m
node-app-deployment-75c7c88b58-ls5f2   1/1     Running   0          99m
node-app-deployment-75c7c88b58-r6pmr   1/1     Running   0          99m
```

***Oh yeah, như vậy là công sức nãy giờ cũng được đền đáp. Etcd đã được restore về trước thời điểm chúng ta "lỡ tay" xóa vài thứ.***

Đối với bất cứ hệ thống nào dù to hay nhỏ thì backup DB cho nó luôn là một điều phải ưu tiên hàng đầu. Hy vọng qua bài này các bạn sẽ hiểu rõ hơn về cơ chế quản lý dữ liệu của k8s và nên thực hiện backup etcd định kỳ cho an toàn nhé!

***Nếu thấy bài viết hữu ích thì các bạn cho mình một upvote và bookmark bài viết để tạo động lực cho mình tiếp tục có nhiều bài chia sẻ hơn nữa nhé! Cảm ơn các bạn rất nhiều!***