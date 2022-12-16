# Recap
Trong phần trước tớ đã giới thiệu cho các bạn về kiến trúc cũng như các thành phần cơ bản của một cụm K8S, hôm nay chúng ta sẽ bắt đầu setup một cụm cluster nhé.
# Prepare.

Ở đây mình dùng máy host chạy ubuntu và tạo các máy ảo, các bạn có thể dùng vmware, vitualbox, multipass... để tạo các  máy ảo này và cài trên đó [docker](https://docs.docker.com/engine/install/ubuntu/), 

ở đây để thuận tiện mình sẽ setup nhanh các node bằng multipass với các command như sau.

(Để chi tiết về cách sử dụng multipass mời bạn ghé thăm series linux, bài viết về [multipass](https://multipass.run/install) để biết cách sử dụng cơ bản nhé.)


### Các bạn cần chạy ```multipass networks``` để chỉ định đúng network của mình tạo cho các máy ảo nhé,
```
➜  ~ multipass networks
Name             Type      Description
br-enp4s0        bridge    Network bridge
br-enx00e04c867  bridge    Network bridge with enx00e04c867ae3
docker0          bridge    Network bridge
docker_gwbridge  bridge    Network bridge
enp4s0           ethernet  Ethernet device
enx00e04c867ae3  ethernet  Ethernet device
mpbr0            bridge    Network bridge for Multipass
```
1. Master Node: 
    Ram: 4GB,
    CPU: 2,
    Disk: 40GB
2. Worker Node: 
    Ram: 4GB,
    CPU: 2,
    Disk: 40GB
```
multipass launch docker --n master --network br-enp4s0
multipass launch docker --n worker --network br-enp4s0
```
 
###  Thêm user ssh youngcoder (Chúng ta sẽ cài đặt cụm cluster k8s thông qua user này.):
```
multipass shell master ## command ssh vào root, khi dùng comman này chúng ta sẽ vào tài khoản mặc định là ubuntu
sudo -i
adduser youngcoder ## ở phần này các bạn sẽ điền các thông tin của các bạn muốn tạo user vào nhé
adduser youngcoder sudo
adduser youngcoder docker ## mặc định với image docker của multipass, chúng ta sẽ có sẵn docker, việc này khá thuận tiện cho việc lab
```

Chuyển sang tài khoản mới tạo: su youngcoder
tạo ssh key:
```
mkdir .ssh
cd .ssh
vi authorized_keys
=> copy public key của bạn vào file này.
```

chỉnh sửa các thông tin trong file: vi /etc/ssh/sshd_config
```
PermitRootLogin yes
PubkeyAuthentication yes
AuthorizedKeysFile      .ssh/authorized_keys .ssh/authorized_keys2
```
Để xem các thông tin node các bạn dùng lệnh, multipass info master (hoặc ```ip a``` nếu ở trong )

master: 10.235.223.148

worker: 10.235.223.11

###  RKE: 
 Ở đây mình sử dụng [rke](https://rancher.com/docs/rke/latest/en/installation/) version: v1.3.13-rc4 (Các bạn cũng có thể sử dụng các version khác tại đây: https://github.com/rancher/rke/releases/tag/v1.3.13-rc4)
 ```
 mv rke_linux-amd64 rke
 chmod +x rke
 rke --version
 ```

# Install
Sau khi bước chuẩn bị hoàn thành, các bạn đổi tên file rke file trên thành rke và kiểm tra version của rancher đã đúng chưa nhé.

Các setup của mình như sau.
```
➜  rancher ./rke config --name cluster.yml
WARN[0000] This is not an officially supported version (v1.3.13-rc4) of RKE. Please download the latest official release at https://github.com/rancher/rke/releases 
[+] Cluster Level SSH Private Key Path [~/.ssh/id_rsa]: /home/youngcoder/.ssh/key
[+] Number of Hosts [1]: 2
[+] SSH Address of host (1) [none]: 10.235.223.148
[+] SSH Port of host (1) [22]: 
[+] SSH Private Key Path of host (10.235.223.148) [none]: /home/youngcoder/.ssh/key
[+] SSH User of host (10.235.223.148) [ubuntu]: youngcoder
[+] Is host (10.235.223.148) a Control Plane host (y/n)? [y]: y
[+] Is host (10.235.223.148) a Worker host (y/n)? [n]: y
[+] Is host (10.235.223.148) an etcd host (y/n)? [n]: y
[+] Override Hostname of host (10.235.223.148) [none]: 
[+] Internal IP of host (10.235.223.148) [none]: 
[+] Docker socket path on host (10.235.223.148) [/var/run/docker.sock]: 
[+] SSH Address of host (2) [none]: 10.235.223.11
[+] SSH Port of host (2) [22]: 
[+] SSH Private Key Path of host (10.235.223.11) [none]: /home/youngcoder/.ssh/key
[+] SSH User of host (10.235.223.11) [ubuntu]: youngcoder
[+] Is host (10.235.223.11) a Control Plane host (y/n)? [y]: n
[+] Is host (10.235.223.11) a Worker host (y/n)? [n]: y
[+] Is host (10.235.223.11) an etcd host (y/n)? [n]: n
[+] Override Hostname of host (10.235.223.11) [none]: 
[+] Internal IP of host (10.235.223.11) [none]: 
[+] Docker socket path on host (10.235.223.11) [/var/run/docker.sock]: 
[+] Network Plugin Type (flannel, calico, weave, canal, aci) [canal]: calico
[+] Authentication Strategy [x509]: 
[+] Authorization Mode (rbac, none) [rbac]: 
[+] Kubernetes Docker image [rancher/hyperkube:v1.23.8-rancher1]: 
[+] Cluster domain [cluster.local]: 
[+] Service Cluster IP Range [10.43.0.0/16]: 
[+] Enable PodSecurityPolicy [n]: 
[+] Cluster Network CIDR [10.42.0.0/16]: 
[+] Cluster DNS Service IP [10.43.0.10]: 
[+] Add addon manifest URLs or YAML files [no]:
```

khi tạo xong các lệnh này các bạn sẽ nhận đk 1 file cluster.yml chứa toàn bộ config mà chúng ta setup ở phía trên.

Nhiều bạn thắc mắc là khi chúng ta tạo với số lượng note lớn thì việc nhập tay từng node sẽ ko khả thi => đúng vậy, khi đó chúng ta hoàn toàn có thể triển khai một file cluster.yml dựa theo template sẵn có.

Việc còn lại rất đơn giản, bạn chỉ cần chạy ./rke up thôi.

Quá trình cài đặt cụm cluster sẽ diễn ra một cách hoàn toàn tự động, lúc này bạn hãy dành chút thời gian like, cmt và share bài viết này để tớ có thêm chút động lực cho những phần tiếp theo nhé ^.^

Quá trình setup hoàn thành, bạn sẽ nhậ được thông báo ```INFO[0229] Finished building Kubernetes cluster successfully``` và một file kube_config_cluster.yml để connect tới cụm cluster của mình.

# Connect

Để connect tới cụm K8S vừa cài đặt, chúng ta dùng [kubectl](https://kubernetes.io/vi/docs/tasks/tools/install-kubectl/), các bạn tìm kiếm phiên bản phù hợp với hệ điều hành của mình nhé (bạn cũng có thể cài đặt kubectl trên master node).

Mình dùng ubuntu nên sẽ setup như sau.
```
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```
sau đó các bạn copy toàn bộ file kube_config_cluster.yml vào file .kube/config

Kiểm tra version : kubectl version
```
➜  ~ kubectl version

Client Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.4", GitCommit:"b695d79d4f967c403a96986f1750a35eb75e75f1", GitTreeState:"clean", BuildDate:"2021-11-17T15:48:33Z", GoVersion:"go1.16.10", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.8", GitCommit:"a12b886b1da059e0190c54d09c5eab5219dd7acf", GitTreeState:"clean", BuildDate:"2022-06-16T05:51:36Z", GoVersion:"go1.17.11", Compiler:"gc", Platform:"linux/amd64"}
➜  rancher kubectl get ns    
NAME              STATUS   AGE
default           Active   16m
ingress-nginx     Active   15m
kube-node-lease   Active   16m
kube-public       Active   16m
kube-system       Active   16m

```

# Summary
Vậy là mình đã hướng dẫn các bạn tạo 1 cụm cluster cơ bản, nếu có bất kỳ vấn đề gì, các bạn hãy cmt tớ sẽ hỗ trợ các bạn nhé.

Trong bài tiếp theo tớ sẽ hướng dẫn các bạn setup một application cơ bản và loadbalance các application này. 

Hẹn gặp lại các bạn ở bài viết tiếp theo.