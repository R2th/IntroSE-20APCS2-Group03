# Lời tựa
Hello mọi người đã trở lại với series về Kubernetes của mình. Qua loạt bài trước mình đã chia sẻ quá trình dựng lab kubernetes và cài đặt khá đầy đủ các thành phần cho nó rồi.

Có một bạn có ib mình hỏi vậy trong trường hợp muốn thêm hay xóa một node ra khỏi cụm k8s thì phải làm thế nào?

Trong bài hôm nay mình sẽ hướng dẫn mọi người cách thêm node hay xóa node khỏi Kubernetes Cluster sử dụng Kubespray nhé!

**Ý tưởng có nó rất đơn giản:**
- Bổ sung thông tin node muốn add vào cấu hình cài cluster (file **hosts.yaml**)
- Cập nhật file **/etc/hosts** bổ sung node mới
- Chạy lại lệnh cài đặt cluster bằng kubespray --> Node mới sẽ được add vào cluster
# Cài đặt Kubernetes Cluster
Muốn thực hành add thêm node vào K8S Cluster thì trước hết các bạn phải có 1 cụm Kubernetes Cluster đã. Như mình đã hướng dẫn ở bài viết [**cài đặt kubernets cluster ở đây**](https://viblo.asia/p/k8s-phan-2-cai-dat-kubernetes-cluster-va-rancher-m68Z0BL95kG#_noi-nhieu-qua-gio-bat-tay-vao-cai-dat-thoi-6), mình dùng kubespray để cài đặt.

## Cấu hình kubespray

**Cấu hình hosts.yaml của kubespray:**
```
[all]
master1  ansible_host=192.168.30.10      ip=192.168.30.10
worker1  ansible_host=192.168.30.11      ip=192.168.30.11
worker2  ansible_host=192.168.30.12      ip=192.168.30.12

[kube-master]
master1

[kube-node]
worker1
worker2

[etcd]
master1

[k8s-cluster:children]
kube-node
kube-master

[calico-rr]

[vault]
master1
worker1
worker2
```

**Cấu hình file /etc/hosts (khai báo trên tất cả các node):**
```
192.168.30.10 master1
192.168.30.11 worker1
192.168.30.12 worker2
```

## Kết quả cài đặt
**Kết quả chạy ansible:**
```
PLAY RECAP **********************************************************************************************************************************************************************************************
localhost                  : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
master1                    : ok=500  changed=31   unreachable=0    failed=0    skipped=1084 rescued=0    ignored=1
worker1                    : ok=368  changed=20   unreachable=0    failed=0    skipped=716  rescued=0    ignored=0
worker2                    : ok=343  changed=17   unreachable=0    failed=0    skipped=632  rescued=0    ignored=0
```

**Kiểm tra trạng thái cluster:**
```
[sysadmin@master1 ~]$ kubectl get nodes -owide
NAME      STATUS   ROLES                  AGE     VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE                KERNEL-VERSION                CONTAINER-RUNTIME
master1   Ready    control-plane,master   17m     v1.20.7   192.168.30.10   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker1   Ready    <none>                 3m23s   v1.20.7   192.168.30.11   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker2   Ready    <none>                 3m24s   v1.20.7   192.168.30.12   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
```

**Như vậy mình đã có 1 cụm k8s với 1 master và 2 worker.**

# Add node vào cluster
Mình sẽ add một node mới là **worker3** với IP **192.168.30.13** vào K8S cluster trên. Việc trước tiên là cài đặt OS và cấu hình cho node này giống như khi thực hiện với các node ta đã cài trong cụm k8s.

***Lưu ý Account/Password của node này cũng set giống các node trước đó nhé!***

## Cập nhật cấu hình hosts
Cập nhật file /etc/hosts trên tất cả các node để thêm thông tin node mới:
```
192.168.30.10 master1
192.168.30.11 worker1
192.168.30.12 worker2
192.168.30.13 worker3
```

## Cập nhật cấu hình kubespray
Bổ sung thên node **worker3** vào file **hosts.yaml**:
```
[all]
master1  ansible_host=192.168.30.10      ip=192.168.30.10
worker1  ansible_host=192.168.30.11      ip=192.168.30.11
worker2  ansible_host=192.168.30.12      ip=192.168.30.12
worker3  ansible_host=192.168.30.13      ip=192.168.30.13

[kube-master]
master1

[kube-node]
worker1
worker2
worker3

[etcd]
master1

[k8s-cluster:children]
kube-node
kube-master

[calico-rr]

[vault]
master1
worker1
worker2
worker3
```

## Add node vào cluster bằng cách chạy lại kubespray
Bạn chỉ việc chạy lại như khi cài đặt cluster ban đầu, chỉ khác là nội dung file **hosts.yaml** đã được update thêm node mới là **worker3**:
```
docker run --rm -it --mount type=bind,source=/home/sysadmin/kubespray/inventory/viettq-cluster,dst=/inventory quay.io/kubespray/kubespray:v2.16.0 bash 
```
**Thực hiện chạy ansible task:**
```
ansible-playbook -i /inventory/hosts.yaml cluster.yml --user=sysadmin --ask-pass --become --ask-become-pass 
```
**Note: Với việc thêm worker node thì cũng có thể thực hiện bằng cách sau:**
```
ansible-playbook -i /inventory/hosts.yaml scale.yml  --user=sysadmin --ask-pass --become --ask-become-pass -l "master1,worker3"
```

**Kết quả chạy ansible playbook cluster.yaml:**
```
PLAY RECAP **********************************************************************************************************************************************************************************************
localhost                  : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
master1                    : ok=489  changed=12   unreachable=0    failed=0    skipped=1080 rescued=0    ignored=0
worker1                    : ok=364  changed=11   unreachable=0    failed=0    skipped=715  rescued=0    ignored=0
worker2                    : ok=339  changed=8    unreachable=0    failed=0    skipped=631  rescued=0    ignored=0
worker3                    : ok=363  changed=74   unreachable=0    failed=0    skipped=621  rescued=0    ignored=0
```

**Kiểm tra danh sách node:**
```
[sysadmin@master1 ~]$ kubectl get nodes -owide
NAME      STATUS   ROLES                  AGE    VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE                KERNEL-VERSION                CONTAINER-RUNTIME
master1   Ready    control-plane,master   46m    v1.20.7   192.168.30.10   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker1   Ready    <none>                 32m    v1.20.7   192.168.30.11   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker2   Ready    <none>                 32m    v1.20.7   192.168.30.12   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker3   Ready    <none>                 3m7s   v1.20.7   192.168.30.13   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
```
Như vậy là node **worker3** đã được add thành công vào cluster rồi. 

# Remove node khỏi cluster
Khi remove một node ra khỏi Cluster thì vấn đề đầu tiên đặt ra là nó sẽ có nguy cơ ảnh hưởng tới các dịch vụ đang chạy trên node đó. Nên ý tưởng của việc remove node là phải đảm bảo các workload trên node đó phải được migrate qua các node khác trước khi thực hiện remove node.

Và để demo cho việc này mình sẽ tạo một số workload là các Pod chạy trên node cần remove.

## Tạo workload trên các worker node
**Trước tiên mình sẽ deploy một số workload lên cụm k8s để cho các node có tải cho giống thực tế đã nhé!**
```
[sysadmin@master1 ~]$ kubectl create ns demo
[sysadmin@master1 ~]$ kubectl -n demo create deployment deployment2 --image=nginx --replicas=5
```

**Kết quả các workload được sinh ra như sau:**
```
[sysadmin@master1 ~]$ kubectl -n demo get all -owide
NAME                               READY   STATUS    RESTARTS   AGE     IP             NODE      NOMINATED NODE   READINESS GATES
pod/deployment2-69bd97b4d9-4wjdc   1/1     Running   0          5m13s   10.233.110.2   worker1   <none>           <none>
pod/deployment2-69bd97b4d9-59dhd   1/1     Running   0          5m13s   10.233.103.3   worker2   <none>           <none>
pod/deployment2-69bd97b4d9-9f9ph   1/1     Running   0          5m13s   10.233.116.2   worker3   <none>           <none>
pod/deployment2-69bd97b4d9-fr6rq   1/1     Running   0          5m13s   10.233.116.3   worker3   <none>           <none>
pod/deployment2-69bd97b4d9-s6kxz   1/1     Running   0          5m13s   10.233.116.1   worker3   <none>           <none>

NAME                          READY   UP-TO-DATE   AVAILABLE   AGE     CONTAINERS   IMAGES   SELECTOR
deployment.apps/deployment2   5/5     5            5           5m13s   nginx        nginx    app=deployment2

NAME                                     DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES   SELECTOR
replicaset.apps/deployment2-69bd97b4d9   5         5         5       5m13s   nginx        nginx    app=deployment2,pod-template-hash=69bd97b4d9
```

**Trong đó riêng node worker3 có các Pod sau đang chạy:**
```
[sysadmin@master1 ~]$ kubectl get pods -A -owide |egrep "NAME|worker3"
NAMESPACE     NAME                                       READY   STATUS    RESTARTS   AGE     IP              NODE      NOMINATED NODE   READINESS GATES
demo          deployment2-69bd97b4d9-9f9ph               1/1     Running   0          4m22s   10.233.116.2    worker3   <none>           <none>
demo          deployment2-69bd97b4d9-fr6rq               1/1     Running   0          4m22s   10.233.116.3    worker3   <none>           <none>
demo          deployment2-69bd97b4d9-s6kxz               1/1     Running   0          4m22s   10.233.116.1    worker3   <none>           <none>
kube-system   calico-node-6qlxv                          1/1     Running   0          11m     192.168.30.13   worker3   <none>           <none>
kube-system   kube-proxy-9fg6k                           1/1     Running   0          11m     192.168.30.13   worker3   <none>           <none>
kube-system   nginx-proxy-worker3                        1/1     Running   0          11m     192.168.30.13   worker3   <none>           <none>
kube-system   nodelocaldns-twhpc                         1/1     Running   0          11m     192.168.30.13   worker3   <none>           <none>
```

## Thực hiện remove node khỏi cluster bằng lệnh kubectl
Đầu tiên ta thực hiện drain node để hệ thống sẽ migrate các Pod trên worker node này sang node khác:
```
[sysadmin@master1 ~]$ kubectl drain worker3 --ignore-daemonsets --delete-emptydir-data
node/worker3 cordoned
WARNING: ignoring DaemonSet-managed Pods: kube-system/calico-node-6qlxv, kube-system/kube-proxy-9fg6k, kube-system/nodelocaldns-twhpc
evicting pod demo/deployment2-69bd97b4d9-s6kxz
evicting pod demo/deployment2-69bd97b4d9-9f9ph
evicting pod demo/deployment2-69bd97b4d9-fr6rq
pod/deployment2-69bd97b4d9-fr6rq evicted
pod/deployment2-69bd97b4d9-s6kxz evicted
pod/deployment2-69bd97b4d9-9f9ph evicted
node/worker3 evicted
```

**Kiểm tra sẽ thấy lúc này các Pod trên node worker3 đã chuyển sang chạy trên 2 node còn lại:**
```
[sysadmin@master1 ~]$ kubectl -n demo get all -owide
NAME                               READY   STATUS    RESTARTS   AGE     IP             NODE      NOMINATED NODE   READINESS GATES
pod/deployment2-69bd97b4d9-4wjdc   1/1     Running   0          7m26s   10.233.110.2   worker1   <none>           <none>
pod/deployment2-69bd97b4d9-59dhd   1/1     Running   0          7m26s   10.233.103.3   worker2   <none>           <none>
pod/deployment2-69bd97b4d9-j8f99   1/1     Running   0          37s     10.233.110.3   worker1   <none>           <none>
pod/deployment2-69bd97b4d9-jgc9q   1/1     Running   0          37s     10.233.103.4   worker2   <none>           <none>
pod/deployment2-69bd97b4d9-tfqtn   1/1     Running   0          37s     10.233.103.5   worker2   <none>           <none>
pod/mydep-6c9b5989cc-5frjj         1/1     Running   0          31m     10.233.110.1   worker1   <none>           <none>
pod/mydep-6c9b5989cc-bjcx5         1/1     Running   0          31m     10.233.103.2   worker2   <none>           <none>

NAME                          READY   UP-TO-DATE   AVAILABLE   AGE     CONTAINERS   IMAGES   SELECTOR
deployment.apps/deployment2   5/5     5            5           7m26s   nginx        nginx    app=deployment2
deployment.apps/mydep         2/2     2            2           31m     nginx        nginx    app=mydep

NAME                                     DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES   SELECTOR
replicaset.apps/deployment2-69bd97b4d9   5         5         5       7m26s   nginx        nginx    app=deployment2,pod-template-hash=69bd97b4d9
replicaset.apps/mydep-6c9b5989cc         2         2         2       31m     nginx        nginx    app=mydep,pod-template-hash=6c9b5989cc
```

**Node worker3 sẽ có trạng thái là "Ready,SchedulingDisabled" nghĩa là không cho phép tạo thêm Pod vào node đó nữa:**
```
[sysadmin@master1 ~]$ kubectl get nodes -owide
NAME      STATUS                     ROLES                  AGE   VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE                KERNEL-VERSION                CONTAINER-RUNTIME
master1   Ready                      control-plane,master   58m   v1.20.7   192.168.30.10   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker1   Ready                      <none>                 44m   v1.20.7   192.168.30.11   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker2   Ready                      <none>                 44m   v1.20.7   192.168.30.12   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker3   Ready,SchedulingDisabled   <none>                 15m   v1.20.7   192.168.30.13   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
```

**Lúc này ta có thể xóa node khỏi cluster:**
```
[sysadmin@master1 ~]$ kubectl delete node worker3
node "worker3" deleted
[sysadmin@master1 ~]$ kubectl get nodes -owide
NAME      STATUS   ROLES                  AGE   VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE                KERNEL-VERSION                CONTAINER-RUNTIME
master1   Ready    control-plane,master   59m   v1.20.7   192.168.30.10   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker1   Ready    <none>                 45m   v1.20.7   192.168.30.11   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
worker2   Ready    <none>                 45m   v1.20.7   192.168.30.12   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://20.10.21
```

**Tới đây thì node worker3 đã được remove khỏi cluster. Bạn có thể thực hiện reset với node vừa xóa bằng lệnh (cái này không bắt buộc):**
```
kubeadm reset
```
Đến đây node **worker3** đã được remove ra khỏi cluster.

## Thực hiện remove node bằng kubespray:
Thay vì thao tác bằng kubectl để xóa node thì bạn cũng có thể dùng kubespray để thực hiện việc remove node ra khỏi cluster.

Mình cũng sẽ thực hiện tạo workload trước khi thực hiện remove node bằng cách tạo một deployment:
```
[sysadmin@master1 ~]$ k create ns workload
namespace/workload created
[sysadmin@master1 ~]$ k -n workload create deployment mydeployment --image=nginx --replicas=8
deployment.apps/mydeployment created
```
**Các Pods được tạo ra như sau:**
```
[sysadmin@master1 ~]$ k -n workload get pods -owide
NAME                            READY   STATUS    RESTARTS   AGE   IP             NODE             NOMINATED NODE   READINESS GATES
mydeployment-5b48c6bff4-4pxth   1/1     Running   0          19s   10.233.70.4    worker3   <none>           <none>
mydeployment-5b48c6bff4-b6zzx   1/1     Running   0          19s   10.233.70.3    worker3   <none>           <none>
mydeployment-5b48c6bff4-bt6mm   1/1     Running   0          19s   10.233.70.2    worker3   <none>           <none>
mydeployment-5b48c6bff4-hl5vd   1/1     Running   0          16s   10.233.68.28   worker2   <none>           <none>
mydeployment-5b48c6bff4-htghh   1/1     Running   0          16s   10.233.70.6    worker3   <none>           <none>
mydeployment-5b48c6bff4-mwpvm   1/1     Running   0          16s   10.233.69.51   worker1   <none>           <none>
mydeployment-5b48c6bff4-vqj8w   1/1     Running   0          19s   10.233.70.5    worker3   <none>           <none>
mydeployment-5b48c6bff4-xf287   1/1     Running   0          16s   10.233.67.49   worker1   <none>           <none>

```
**Các Pod chạy trên node worker3:**
```
[sysadmin@master1 ~]$ k get pods -A -owide |grep worker3
kube-system            kube-flannel-9r6sp                                           1/1     Running            0          98m    192.168.10.17   worker3   <none>           <none>
kube-system            kube-proxy-qhc79                                             1/1     Running            0          98m    192.168.10.17   worker3   <none>           <none>
kube-system            nginx-proxy-worker3                                          1/1     Running            0          98m    192.168.10.17   worker3   <none>           <none>
kube-system            nodelocaldns-6w5cw                                           1/1     Running            0          98m    192.168.10.17   worker3   <none>           <none>
workload               mydeployment-5b48c6bff4-4pxth                                1/1     Running            0          68s    10.233.70.4     worker3   <none>           <none>
workload               mydeployment-5b48c6bff4-b6zzx                                1/1     Running            0          68s    10.233.70.3     worker3   <none>           <none>
workload               mydeployment-5b48c6bff4-bt6mm                                1/1     Running            0          68s    10.233.70.2     worker3   <none>           <none>
workload               mydeployment-5b48c6bff4-htghh                                1/1     Running            0          65s    10.233.70.6     worker3   <none>           <none>
workload               mydeployment-5b48c6bff4-vqj8w                                1/1     Running            0          68s    10.233.70.5     worker3   <none>           <none>
```

Câu lệnh thực hiện remove node **worker3**:
```
ansible-playbook -i /inventory/hosts.yaml remove-node.yml  --user=sysadmin --ask-pass --become --ask-become-pass -e "node=worker3"
```
**Bận cần confirm việc remove node trước khi thực hiện:**
```
PLAY [Add no-floating nodes to no_floating] **********************************************************************************************************************************************
skipping: no hosts matched
Are you sure you want to delete nodes state? Type 'yes' to delete nodes. [no]: yes
```

Lúc này theo dõi trạng thái các Pod ta sẽ thấy các Pod chạy trên node **worker3** sẽ được terminate và tạo lại trên các node khác:
```
mydeployment-5b48c6bff4-b6zzx   1/1     Terminating   0          3m36s   10.233.70.3    worker3   <none>           <none>
mydeployment-5b48c6bff4-vqj8w   1/1     Terminating   0          3m36s   10.233.70.5    worker3   <none>           <none>
mydeployment-5b48c6bff4-htghh   1/1     Terminating   0          3m33s   10.233.70.6    worker3   <none>           <none>
mydeployment-5b48c6bff4-4pxth   1/1     Terminating   0          3m36s   10.233.70.4    worker3   <none>           <none>
mydeployment-5b48c6bff4-bt6mm   1/1     Terminating   0          3m36s   10.233.70.2    worker3   <none>           <none>
mydeployment-5b48c6bff4-frk2l   0/1     Pending       0          0s      <none>         <none>           <none>           <none>
mydeployment-5b48c6bff4-fsckv   0/1     Pending       0          0s      <none>         <none>           <none>           <none>
mydeployment-5b48c6bff4-frk2l   0/1     Pending       0          0s      <none>         worker2   <none>           <none>
mydeployment-5b48c6bff4-hmp6c   0/1     Pending       0          0s      <none>         <none>           <none>           <none>
mydeployment-5b48c6bff4-fsckv   0/1     Pending       0          0s      <none>         worker1   <none>           <none>
mydeployment-5b48c6bff4-9qtnr   0/1     Pending       0          0s      <none>         <none>           <none>           <none>
mydeployment-5b48c6bff4-f27vj   0/1     Pending       0          0s      <none>         <none>           <none>           <none>
mydeployment-5b48c6bff4-9qtnr   0/1     Pending       0          0s      <none>         worker2   <none>           <none>
mydeployment-5b48c6bff4-hmp6c   0/1     Pending       0          0s      <none>         worker1   <none>           <none>
mydeployment-5b48c6bff4-f27vj   0/1     Pending       0          0s      <none>         worker1   <none>           <none>
mydeployment-5b48c6bff4-frk2l   0/1     ContainerCreating   0          0s      <none>         worker2   <none>           <none>
mydeployment-5b48c6bff4-hmp6c   0/1     ContainerCreating   0          0s      <none>         worker1   <none>           <none>
mydeployment-5b48c6bff4-fsckv   0/1     ContainerCreating   0          0s      <none>         worker1   <none>           <none>
mydeployment-5b48c6bff4-9qtnr   0/1     ContainerCreating   0          0s      <none>         worker2   <none>           <none>
mydeployment-5b48c6bff4-f27vj   0/1     ContainerCreating   0          0s      <none>         worker1   <none>           <none>
mydeployment-5b48c6bff4-vqj8w   0/1     Terminating         0          3m37s   10.233.70.5    worker3   <none>           <none>
mydeployment-5b48c6bff4-htghh   0/1     Terminating         0          3m34s   10.233.70.6    worker3   <none>           <none>
mydeployment-5b48c6bff4-bt6mm   0/1     Terminating         0          3m37s   10.233.70.2    worker3   <none>           <none>
mydeployment-5b48c6bff4-4pxth   0/1     Terminating         0          3m37s   10.233.70.4    worker3   <none>           <none>
mydeployment-5b48c6bff4-b6zzx   0/1     Terminating         0          3m37s   10.233.70.3    worker3   <none>           <none>
mydeployment-5b48c6bff4-fsckv   1/1     Running             0          2s      10.233.67.51   worker1   <none>           <none>
mydeployment-5b48c6bff4-f27vj   1/1     Running             0          2s      10.233.67.50   worker1   <none>           <none>
mydeployment-5b48c6bff4-hmp6c   1/1     Running             0          2s      10.233.69.52   worker1   <none>           <none>
mydeployment-5b48c6bff4-frk2l   1/1     Running             0          2s      10.233.68.29   worker2   <none>           <none>
mydeployment-5b48c6bff4-9qtnr   1/1     Running             0          2s      10.233.68.30   worker2   <none>           <none>
```
**Và kết quả là các Pod đã được migrate hết sang node khác:**
```
[sysadmin@master1 ~]$ k -n workload get pods -owide
NAME                            READY   STATUS    RESTARTS   AGE     IP             NODE             NOMINATED NODE   READINESS GATES
mydeployment-5b48c6bff4-9qtnr   1/1     Running   0          49s     10.233.68.30   worker2   <none>           <none>
mydeployment-5b48c6bff4-f27vj   1/1     Running   0          49s     10.233.67.50   worker1   <none>           <none>
mydeployment-5b48c6bff4-frk2l   1/1     Running   0          49s     10.233.68.29   worker2   <none>           <none>
mydeployment-5b48c6bff4-fsckv   1/1     Running   0          49s     10.233.67.51   worker1   <none>           <none>
mydeployment-5b48c6bff4-hmp6c   1/1     Running   0          49s     10.233.69.52   worker1   <none>           <none>
mydeployment-5b48c6bff4-hl5vd   1/1     Running   0          4m22s   10.233.68.28   worker2   <none>           <none>
mydeployment-5b48c6bff4-mwpvm   1/1     Running   0          4m22s   10.233.69.51   worker1   <none>           <none>
mydeployment-5b48c6bff4-xf287   1/1     Running   0          4m22s   10.233.67.49   worker1   <none>           <none>
```
**Kết quả chạy ansbile remove node thành công:**
```
TASK [remove-node/post-remove : Delete node] *********************************************************************************************************************************************
changed: [worker3 -> 192.168.10.11]

PLAY RECAP *******************************************************************************************************************************************************************************
localhost                  : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
master1             : ok=16   changed=3    unreachable=0    failed=0    skipped=36   rescued=0    ignored=0
worker1             : ok=2    changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
worker2             : ok=2    changed=2    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
worker3             : ok=53   changed=19   unreachable=0    failed=0    skipped=84   rescued=0    ignored=0
```
**Kiểm tra danh sách node:**
```
NAME             STATUS   ROLES                  AGE   VERSION
master1   Ready    control-plane,master   1h   v1.20.7
worker1   Ready    <none>                 1h   v1.20.7
worker2   Ready    <none>                 1h   v1.20.7
```
**Như vậy node worker3 đã được remove khỏi cluster.**

***Như vậy mình đã hướng dẫn các bạn cách thêm/xóa node khỏi K8S Cluster. Việc tác động ở mức node này các bạn nên chủ động làm LAB để hiểu kỹ và đánh giá những rủi ro trước khi nghĩ tới chuyện apply vào production nhé!***