# Giới thiệu
Hôm nay mình sẽ tiếp tục hướng dẫn các bạn cài đặt hoàn thiện cụm kubernetes cluster dùng kubespray nhé!
![image.png](https://images.viblo.asia/406c9848-78c7-4e9a-8a3a-c7cbfe129956.png)

Mình giới thiệu lại mô hình k8s mà mình sẽ hướng dẫn các bạn cài đặt:
![image.png](https://images.viblo.asia/97e99a30-05ba-4b05-b14e-4e623a0f62dd.png)

Thông số các VM dùng cho việc cài đặt như sau:
| Máy ảo | Role | IP | RAM | CPU | HDD | Note|
| -------- | --------  |-------- |-------- |-------- |-------- |-------- |
| master1 | master | 192.168.10.11 (NAT) | 3GB      | 2 core | 30GB |Sẽ cài thêm haproxy|
| worker1 | worker | 192.168.10.12 (NAT) | 4GB      | 2 core | 30GB | Sẽ cài thêm rancher|
| worker2 | worker | 192.168.10.13 (NAT) | 4GB      | 2 core | 30GB + 30GB| Sẽ cài thêm nfs-server|
| kubespray | installation server | 192.168.10.8 (NAT) | 2GB |2 core |30GB |



# Review lại các công việc đã thực hiện
Trong **[phần 1](https://viblo.asia/p/k8s-course-02-cai-dat-lab-kubernetes-phan-1-3kY4gWdy4Ae)** mình đã hướng dẫn các bạn thực hiện cài VMware Workstation và đã tạo được 4 VM theo planning bên trên rồi.

Trong bài này mình tiếp tục hướng dẫn các công việc còn lại để hoàn thiện cài đặt gồm:
- Cài đặt cấu hình máy ảo kubespray để chuẩn bị cài đặt k8s
- Cấu hình tham số cho việc cài đặt + cài đặt k8s bằng kubespray
- Cài đặt & cấu hình kubectl (để giao tiếp và quản lý cụm k8s)
- Cài đặt rancher (lên VM worker1)

**Giờ thì bắt tay vào thôi!**
# Hướng dẫn chi tiết
## Cài đặt cấu hình cho VM kubespray
### Cài đặt docker
Thực hiện cài đặt docker bằng lệnh sau:
```
[sysadmin@kubespray ~]$ sudo yum update -y
<output truncated>
[sysadmin@kubespray ~]$ curl -fsSL https://get.docker.com/ | sh
<output truncated>
[sysadmin@kubespray ~]$ sudo systemctl enable docker.service
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
[sysadmin@kubespray ~]$ sudo systemctl start docker
```
Rồi cấu hình để user của bạn (non-root) có thể chạy lệnh docker không cần sudo, sau đó restart lại session kết nối vào server để user được cập nhật:

```
[sysadmin@kubespray ~]$ sudo usermod -aG docker sysadmin
```
Bạn có thể logout/login lại session để cập nhật quyền trên trước khi tiếp tục thao tác.

Kết quả là cài đặt docker và chạy lệnh docker không cần quyền sudo:
```
[sysadmin@kubespray ~]$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

### Cấu hình file host
Thêm các dòng sau vào file /etc/hosts:
```
192.168.10.11 master1
192.168.10.12 worker1
192.168.10.13 worker2
```
### Tạo thư mục cài đặt kubespray
Tao thư mục chứa các file cài đặt:
```
 cd ~
 mkdir kubernetes_installation/
```

## Cài đặt kubernetes bằng kubespray
### Tải bộ cài kubespray
Vào thư mục cài đặt vào download Kubespray về, lưu ý cần down đúng phiên bản bạn cần. Ở đây mình muốn cài kubernetes version v1.20.7 thì sẽ cần down kuberpay phiên bản release-2.16:
```
cd /home/sysadmin/kubernetes_installation
git clone https://github.com/kubernetes-sigs/kubespray.git --branch release-2.16
```
Lúc này kubespray sẽ được tải về máy tại thư mục /home/sysadmin/kubernetes_installation/kubespray. 

### Update file cấu hình của kubespray
Bạn cần tạo một inventory mới có tên là **viettq-cluster** của riêng bạn từ bộ mẫu của kubespray:
```
cd /home/sysadmin/kubernetes_installation/kubespray
cp -rf inventory/sample inventory/viettq-cluster
```
Tiếp theo là bước quan trọng nhất - cấu hình file **hosts.yaml** trong thư mục inventory của bạn. File này chính là file định nghĩa bạn sẽ cài k8s cluster gồm bao nhiêu node, tên và IP các node là gì...

```
cd /home/sysadmin/kubernetes_installation/kubespray/
cd inventory/viettq-cluster
vi hosts.yaml
```
Bạn cần chỉnh sửa nội dung file này theo đúng hostname/IP của các node bạn sẽ cài Kubernetes. Theo planning bên trên thì mình có 1 master và 2 worker, theo đó ta cần file cấu hình như sau:
```
[all]
master1  ansible_host=192.168.10.11      ip=192.168.10.11
worker1  ansible_host=192.168.10.12      ip=192.168.10.12
worker2  ansible_host=192.168.10.13      ip=192.168.10.13

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
Tiếp đến nếu bạn muốn đổi CNI (network plugin của K8S) thì sửa file config sau:
```
inventory/viettq-cluster/group_vars/k8s_cluster/k8s-cluster.yml
```
Sửa tham số:
```
Từ
kube_network_plugin: calico
Thành
kube_network_plugin: flannel
```
Hoặc có thể dùng lệnh để update cấu hình network plugin như sau (thay vì sửa bằng tay như bên trên):
```
#Change network CNI plugin to flannel
cd /home/sysadmin/kubernetes_installation/kubespray/
sed -i "/kube_network_plugin:/c\kube_network_plugin: flannel" inventory/viettq-cluster/group_vars/k8s_cluster/k8s-cluster.yml
```
**Như vậy là các bước chuẩn bị đã sẵn sàng, ta tiến hành cài đặt thôi!**

### Cài đặt kubernetes cluster
Ta sẽ thực hiện việc cài đặt từ bên trong một docker container của kubespray bằng lệnh sau:
```
docker run --rm -it --mount type=bind,source=/home/sysadmin/kubernetes_installation/kubespray/inventory/viettq-cluster,dst=/inventory quay.io/kubespray/kubespray:v2.16.0 bash
```
Các bạn lưu ý dấu nhắc bây giờ sẽ là "root@..." vì chúng ta đang ở bên trong container.

**Cuối cùng là lệnh để cài đặt:**
```
ansible-playbook -i /inventory/hosts.yaml cluster.yml --user=sysadmin --ask-pass --become --ask-become-pass
```
Bạn sẽ nhập thông tin password của user sysadmin 2 lần và chờ đợi để ansible chạy các task cài đặt lên các node cho bạn.
 
 **Kết quả hoàn thành sẽ như sau:**
 ```
 PLAY RECAP ********************************************************************************************************************************************************
localhost                  : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
master1                    : ok=485  changed=110  unreachable=0    failed=0    skipped=1017 rescued=0    ignored=1
worker1                    : ok=345  changed=76   unreachable=0    failed=0    skipped=649  rescued=0    ignored=0
worker2                    : ok=323  changed=73   unreachable=0    failed=0    skipped=570  rescued=0    ignored=0

Thursday 15 September 2022  07:02:24 +0000 (0:00:00.055)       0:10:34.636 ****
===============================================================================
container-engine/docker : ensure docker packages are installed -------------------------------------------------------------------------------------------- 82.04s
download_file | Download item ----------------------------------------------------------------------------------------------------------------------------- 46.30s
kubernetes/kubeadm : Join to cluster ---------------------------------------------------------------------------------------------------------------------- 35.97s
download_container | Download image if required ----------------------------------------------------------------------------------------------------------- 29.12s
download_container | Download image if required ----------------------------------------------------------------------------------------------------------- 27.70s
download_container | Download image if required ----------------------------------------------------------------------------------------------------------- 26.88s
kubernetes/preinstall : Install packages requirements ----------------------------------------------------------------------------------------------------- 23.07s
download_container | Download image if required ----------------------------------------------------------------------------------------------------------- 20.87s
download_file | Download item ----------------------------------------------------------------------------------------------------------------------------- 18.60s
kubernetes/control-plane : kubeadm | Initialize first master ---------------------------------------------------------------------------------------------- 18.06s
download_container | Download image if required ----------------------------------------------------------------------------------------------------------- 15.45s
download_container | Download image if required ----------------------------------------------------------------------------------------------------------- 15.39s
bootstrap-os : Install libselinux python package ---------------------------------------------------------------------------------------------------------- 14.15s
download_container | Download image if required ----------------------------------------------------------------------------------------------------------- 13.26s
download_file | Download item ----------------------------------------------------------------------------------------------------------------------------- 12.05s
download_container | Download image if required ----------------------------------------------------------------------------------------------------------- 10.18s
wait for etcd up ------------------------------------------------------------------------------------------------------------------------------------------- 8.47s
download_file | Download item ------------------------------------------------------------------------------------------------------------------------------ 7.14s
download_file | Download item ------------------------------------------------------------------------------------------------------------------------------ 7.14s
download_container | Download image if required ------------------------------------------------------------------------------------------------------------ 5.91s
root@5bc3ca5cca25:/kubespray#
```
 
 ## Cài đặt và cấu hình kubectl
 ### Cấu hình kubectl trên master1
  Khi cài đặt xong cụm k8s thì trên master node đã mặc định có cài kubectl rồi nên ta chỉ việc cấu hình cho nó mà ko phải cài lại.
  
  Cấu hình kubectl trên master node như sau:
  ```
mkdir -p $HOME/.kube
sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
  ```
  Sau đó kiểm tra thông tin các node của cluster:
  ```
  [sysadmin@master1 ~]$ kubectl get nodes
NAME      STATUS   ROLES                  AGE     VERSION
master1   Ready    control-plane,master   3m14s   v1.20.7
worker1   Ready    <none>                 2m25s   v1.20.7
worker2   Ready    <none>                 2m25s   v1.20.7
```
***Như vậy là quá trình cài đặt đã hoàn thành rồi.***
  
 ### Cài đặt và cấu hình kubectl trên kubespray
Do phiên bản Kubernetes đang cài trong series LAB này là **v1.20.7** nên mình cũng sẽ cài **kubectl** cùng phiên bản:
```
curl -LO https://dl.k8s.io/release/v1.20.7/bin/linux/amd64/kubectl
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
```

**Cấu hình kubectl để kết nối tới cụm K8S của mình**:
```
mkdir -p $HOME/.kube
scp master1:~/.kube/config  $HOME/.kube/
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
Sửa file config, tham số "server: https://127.0.0.1:6443" thành "server: https://192.168.10.11:6443" và lưu lại. Lưu ý "192.168.10.11" là IP của node master1, 6443 là port mặc định của kube-api-server. 

**Giờ kiểm tra kết nối bằng lệnh "kubect get nodes" xem đã kết nối ok hay chưa**:
```
[sysadmin@kubespray ~]$ kubectl get nodes -owide
NAME      STATUS   ROLES                  AGE     VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE                KERNEL-VERSION                CONTAINER-RUNTIME
master1   Ready    control-plane,master   6m24s   v1.20.7   192.168.10.11   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://19.3.15
worker1   Ready    <none>                 5m35s   v1.20.7   192.168.10.12   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://19.3.15
worker2   Ready    <none>                 5m35s   v1.20.7   192.168.10.13   <none>        CentOS Linux 7 (Core)   3.10.0-1160.76.1.el7.x86_64   docker://19.3.15
```
***Như vậy là chúng ta đã cài đặt và cấu hình kubectl trên node kubespray thành công***.

 ## Cài đặt rancher
Theo planning chúng ta sẽ cài rancher trên node worker1. Kết nối SSH vào woker1 và cài rancher thôi.

**Đầu tiên ta cần cấu hình user sysadmin có quyền chạy lệnh docker không cần sudo**:
```
[sysadmin@worker1 ~]$ sudo usermod -aG docker sysadmin
[sysadmin@worker1 ~]$ sudo su - sysadmin
```

**Tiếp theo ta cài rancher bằng lệnh sau:**
 ```
 docker run --name rancher-server -d --restart=unless-stopped -p 6860:80 -p 6868:443 --privileged rancher/rancher:v2.5.7 
```
Giờ thì rancher container đã chạy xong, ta vào web của nó ở địa chỉ https://[**ip**]:[**https-port**] cụ thể là https://192.168.10.12:6868.

Lúc này bạn chọn đổi password mới để nhập password mới và ấn OK để ra giao diện chính của Rancher như sau. 
 
Tiếp theo chọn vào Add Cluster --> Other Cluster --> Nhập Cluster Name --> Chọn Create. 
    
Tiếp theo copy dòng lệnh dưới cùng để chạy trên K8S Master Node để cài đặt rancher-agent lên K8S.

Chờ vài phút để agent được cài đặt xong thì trên rancher bạn ấn vào tên cluster mới tạo sẽ hiển thị như sau:

![image.png](https://images.viblo.asia/9381fa94-7b81-434f-b30d-ce3e152ccda7.png)

***Bổ sung thêm: Khi trên giao diện Rancher báo Controller Manager unhealthy thì các bạn thực hiện thêm các bước sau trên các node Master nhé!***
```
sudo sed -i 's|- --port=0|#- --port=0|' /etc/kubernetes/manifests/kube-scheduler.yaml
sudo sed -i 's|- --port=0|#- --port=0|' /etc/kubernetes/manifests/kube-controller-manager.yaml
sudo systemctl restart kubelet
```

Như vậy tới đây các bạn đã hoàn thành cài đặt hệ thống lab kubernetes cluster rồi. 

***Trong các bài sau chúng ta sẽ vừa tìm hiểu vừa thực hành về các khái niệm, tài nguyên của k8s như nodes, pods.. trên hệ thống lab này nhé. Rất mong nhận được sự ủng hộ của mọi người bằng cách upvote và bookmark bài viết này. Cảm ơn các bạn!!***


Tags: cai dat kubernetes, viettq, kubespray, kubernetes cluster