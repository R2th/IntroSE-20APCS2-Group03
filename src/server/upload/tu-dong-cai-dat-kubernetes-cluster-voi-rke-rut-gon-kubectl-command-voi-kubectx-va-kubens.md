RKE viết tắt của cụm danh từ *Rancher Kubernetes Engine*. Bài viết này sẽ thực hiện setup Kubernetes cluster với RKE CLI - tự động hóa và đơn giản hóa việc setup Kubernetes cluster. Tránh gặp phải các lỗi phổ biến trong quá trình cài đặt. Phiên bản RKE sử dụng trong bài là v1.2.8.

> Warning: Nếu bạn thấy chủ đề này hay, bạn hãy clip lại bài này để khi nào rảnh thì ngồi thực hành chơi cho vui nhé. :D

## Cài đặt RKE

Bạn download file binary mới nhất về dùng nha: https://github.com/rancher/rke/releases.

## Chuẩn bị K8s node

Mình sẽ thiết lập K8s cluster có 4 node. Trong đó, 1 node master và 3 node còn lại là worker. Mình sử dụng máy ảo để dựng các node. Bạn có thể tham khảo bài viết [Hướng dẫn dựng máy ảo Debian 10 trong Hyper-V trên Windows 10](https://viblo.asia/p/924lJGL85PM) và [Hướng dẫn cách sử dụng ssh-copy-id để copy public key lên server](https://viblo.asia/p/bJzKmVjDZ9N) của mình.

Như bạn biết, với các node chạy K8s, chúng ta được khuyến nghị tắt swap đi để đảm bảo tính ổn định. Bài viết này vẫn sử dụng K8s với Docker nhé. Do đó, chúng ta sẽ thực hiện các việc trên với tất cả các node.

***Lưu ý:** Chi tiết các requirement xem tại đây https://rancher.com/docs/rke/latest/en/os.*

> Tip: Nếu bạn dùng Tmux như mình thì có thể mở 4 pane, mỗi pane SSH tới một node rồi sau đó bật chế độ `synchoronize-panes` để gõ lệnh trên nhiều pane cùng một lúc nhé. Kiểu như multi-cursor khi code ấy. 
> ```bash
> # Bật
> setw synchronize-panes on
> # Tắt
> setw synchronize-panes off
> ```

Giống như này nè:

![](https://cloud.githubusercontent.com/assets/553208/9890858/ee3c0ca6-5c02-11e5-890e-05d825a46c92.gif)

*(Nguồn ảnh: https://github.com/gpakosz/.tmux)*

1. Tắt swap trên các node

```bash
sudo swapoff -a \
    && sudo cp -f /etc/fstab /etc/fstab.bak \
    && sudo sed -e '/swap/ s/^#*/#/' -i /etc/fstab
```

> Lưu ý: `fstab.bak` là file backup lại của `/etc/fstab`, các dòng lệnh khai báo bộ nhớ swap được comment lại để nếu restart lại node thì swap không bị bật trở lại.

2. Cài đặt Docker trên các node

Mình cài Docker cho các máy ảo Debian 10 của mình theo [hướng dẫn của Docker](https://docs.docker.com/engine/install/debian/). Các bạn lưu ý nếu các node của bạn không dùng Debian thì đọc doc của Docker để chạy cho đúng lệnh nha.

```bash:install-docker-on-debian-10
sudo apt-get update

sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

```

3. Một requirement nữa đó các cài đặt `sysctl` cần được apply:

```bash
net.bridge.bridge-nf-call-ip6tables=1
net.bridge.bridge-nf-call-iptables=1
```

Mở vim lên điền nội dung vào file (nếu dùng Tmux thì bạn nhớ bật `synchronize-panes=on` để tiết kiệm thời gian).

```bash
echo "net.bridge.bridge-nf-call-ip6tables=1" | sudo tee -a /etc/sysctl.conf
echo "net.bridge.bridge-nf-call-iptables=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Chuẩn bị file cấu hình RKE Cluster

Nhớ lại phần trước chút nhé, trong bài viết này mình chuẩn bị 4 node. Trong đó sẽ có:
- 1 node master, với vai trò `control-plane`, `etcd`. Cấu hình tối thiểu cho master: 2 cores - 4GB RAM
- 3 node worker, với vai trò `worker`

Sử dụng RKE CLI với lệnh sau để bắt đầu tạo file cấu hình cho RKE Cluster. RKE CLI sẽ tạo ra một file có `cluster.yml` với các options để cấu hình K8s node: Cấu hình đăng nhập qua SSH, k8s network plugin gì, vai trò của các node là gì...

RKE sẽ dùng file này để SSH vào các node rồi tự động setup Kubernetes cluster cho chúng ta. Bạn không cần phải lên server cài kubectl, kubeadm... nữa.

Chi tiết về các options trong file `cluster.yml`, chúng ta có thể đọc thêm tại tài liệu của Rancher tại đường dẫn https://rancher.com/docs/rke/latest/en/config-options.

```bash:lenh-tao-file-cluster.yml
rke config --name mycluster.yml
```

> Tham số: `--name=mycluster.yml` để chỉ định tên file YAML output thay vì dùng tên mặc định là `cluster.yml`.

Sau đó bạn trả lời các câu hỏi để hoàn tất việc cấu hình. Dưới đâu là mẫu mà mình dùng cho bài viết này.

```bash
[+] Cluster Level SSH Private Key Path [~/.ssh/id_rsa]: ~/.ssh/kimnguyen.ict
[+] Number of Hosts [1]: 4
[+] SSH Address of host (1) [none]: 192.168.137.10
[+] SSH Port of host (1) [22]:
[+] SSH Private Key Path of host (192.168.137.10) [none]: ~/.ssh/kimnguyen.ict
[+] SSH User of host (192.168.137.10) [ubuntu]: clouduser
[+] Is host (192.168.137.10) a Control Plane host (y/n)? [y]: y
[+] Is host (192.168.137.10) a Worker host (y/n)? [n]: n
[+] Is host (192.168.137.10) an etcd host (y/n)? [n]: y
[+] Override Hostname of host (192.168.137.10) [none]: master
[+] Internal IP of host (192.168.137.10) [none]: 192.168.137.10
[+] Docker socket path on host (192.168.137.10) [/var/run/docker.sock]:
[+] SSH Address of host (2) [none]: 192.168.137.11
[+] SSH Port of host (2) [22]:
[+] SSH Private Key Path of host (192.168.137.11) [none]: ~/.ssh/kimnguyen.ict
[+] SSH User of host (192.168.137.11) [ubuntu]: clouduser
[+] Is host (192.168.137.11) a Control Plane host (y/n)? [y]: n
[+] Is host (192.168.137.11) a Worker host (y/n)? [n]: y
[+] Is host (192.168.137.11) an etcd host (y/n)? [n]: n
[+] Override Hostname of host (192.168.137.11) [none]: worker1
[+] Internal IP of host (192.168.137.11) [none]: 192.168.137.11
[+] Docker socket path on host (192.168.137.11) [/var/run/docker.sock]:
[+] SSH Address of host (3) [none]: 192.168.137.12
[+] SSH Port of host (3) [22]:
[+] SSH Private Key Path of host (192.168.137.12) [none]: ~/.ssh/kimnguyen.ict
[+] SSH User of host (192.168.137.12) [ubuntu]: clouduser
[+] Is host (192.168.137.12) a Control Plane host (y/n)? [y]: n
[+] Is host (192.168.137.12) a Worker host (y/n)? [n]: y
[+] Is host (192.168.137.12) an etcd host (y/n)? [n]: n
[+] Override Hostname of host (192.168.137.12) [none]: worker2
[+] Internal IP of host (192.168.137.12) [none]: 192.168.137.12
[+] Docker socket path on host (192.168.137.12) [/var/run/docker.sock]:
[+] SSH Address of host (4) [none]: 192.168.137.13
[+] SSH Port of host (4) [22]:
[+] SSH Private Key Path of host (192.168.137.13) [none]: ~/.ssh/kimnguyen.ict
[+] SSH User of host (192.168.137.13) [ubuntu]: clouduser
[+] Is host (192.168.137.13) a Control Plane host (y/n)? [y]: n
[+] Is host (192.168.137.13) a Worker host (y/n)? [n]: y
[+] Is host (192.168.137.13) an etcd host (y/n)? [n]: n
[+] Override Hostname of host (192.168.137.13) [none]: worker3
[+] Internal IP of host (192.168.137.13) [none]: 192.168.137.13
[+] Docker socket path on host (192.168.137.13) [/var/run/docker.sock]:
[+] Network Plugin Type (flannel, calico, weave, canal, aci) [canal]: calico
[+] Authentication Strategy [x509]:
[+] Authorization Mode (rbac, none) [rbac]:
[+] Kubernetes Docker image [rancher/hyperkube:v1.20.6-rancher1]:
[+] Cluster domain [cluster.local]: mycluster.local
[+] Service Cluster IP Range [10.43.0.0/16]:
[+] Enable PodSecurityPolicy [n]:
[+] Cluster Network CIDR [10.42.0.0/16]:
[+] Cluster DNS Service IP [10.43.0.10]:
[+] Add addon manifest URLs or YAML files [no]: yes
[+] Enter the Path or URL for the manifest [none]: https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
[+] Add another addon [no]: yes
[+] Enter the Path or URL for the manifest [none]: https://gist.githubusercontent.com/superseb/499f2caa2637c404af41cfb7e5f4a938/raw/930841ac00653fdff8beca61dab9a20bb8983782/k8s-dashboard-user.yml
[+] Add another addon [no]: n
```

## Bắt đầu cài đặt RKE cluster

Sau khi có file `mycluster.yml` ở phần trên, chúng ta sẽ tiếp tục dùng RKE CLI để quá trình cài đặt chính thức bắt đầu.

```bash
rke up --config mycluster.yml
```

- Nếu trong quá trình cài đặt gặp lỗi bạn cứ thử chạy lại lệnh `rke up` ở trên nhé, các bước nào đã thực hiện thì sau đó sẽ được skip.
- Nếu muốn gỡ bỏ RKE cluster khỏi các node trên bạn chạy lệnh sau:

```bash
rke remove --config mycluster.yml
```

```bash
INFO[0000] Running RKE version: v1.2.8
INFO[0000] Initiating Kubernetes cluster
INFO[0000] [dialer] Setup tunnel for host [192.168.137.13]
INFO[0000] [dialer] Setup tunnel for host [192.168.137.11]
INFO[0000] [dialer] Setup tunnel for host [192.168.137.10]
INFO[0000] [dialer] Setup tunnel for host [192.168.137.12]
INFO[0001] Checking if container [cluster-state-deployer] is running on host [192.168.137.10], try #1
INFO[0001] Image [rancher/rke-tools:v0.1.74] exists on host [192.168.137.10]
INFO[0001] Starting container [cluster-state-deployer] on host [192.168.137.10], try #1
INFO[0001] [state] Successfully started [cluster-state-deployer] container on host [192.168.137.10]
INFO[0001] Checking if container [cluster-state-deployer] is running on host [192.168.137.11], try #1
INFO[0001] Image [rancher/rke-tools:v0.1.74] exists on host [192.168.137.11]
INFO[0002] Starting container [cluster-state-deployer] on host [192.168.137.11], try #1
INFO[0002] [state] Successfully started [cluster-state-deployer] container on host [192.168.137.11]
INFO[0002] Checking if container [cluster-state-deployer] is running on host [192.168.137.12], try #1
INFO[0002] Image [rancher/rke-tools:v0.1.74] exists on host [192.168.137.12]
INFO[0002] Starting container [cluster-state-deployer] on host [192.168.137.12], try #1
INFO[0002] [state] Successfully started [cluster-state-deployer] container on host [192.168.137.12]
INFO[0003] Checking if container [cluster-state-deployer] is running on host [192.168.137.13], try #1
INFO[0003] Image [rancher/rke-tools:v0.1.74] exists on host [192.168.137.13]
INFO[0003] Starting container [cluster-state-deployer] on host [192.168.137.13], try #1
INFO[0003] [state] Successfully started [cluster-state-deployer] container on host [192.168.137.13]
INFO[0003] [certificates] Generating CA kubernetes certificates
...
INFO[0154] Finished building Kubernetes cluster successfully
```

Trong quá trình setup, một file `mycluster.rkestate` sẽ được tạo ra. File này chính là file lưu trữ trạng thái hiện tại và cấu hình hiện tại của RKE cluster sau khi chạy lệnh cài đặt bên trên. File này chứa cả những thông tin quan trọng như các `certificate` được dùng trong cluster. Do đó, chúng ta cần lữu giữ và bảo mật file này để có thể sử dụng nó trong các lần sửa đổi cluster sau này bằng RKE.

## Tương tác với RKE cluster

### kube_config_cluster.yml

Cuối cùng, chúng ta sẽ cần kiểm tra lại xem có đúng là RKE đã setup Kubernetes cluster hoàn chỉnh và đúng cho chúng ta chưa. Check nhanh bằng cách SSH và chạy thử lệnh:

```bash
docker ps
```

```bash:output
CONTAINER ID   IMAGE                                COMMAND                  CREATED              STATUS                  PORTS     NAMES
3a86e7c6d0ff   rancher/mirrored-pause:3.2           "/pause"                 1 second ago         Up Less than a second             k8s_POD_calico-kube-controllers-7ddcfb748f-rf5w2_kube-system_c93539ae-4870-4c69-8673-7bace5e9dd87_87
19f6b34a4048   rancher/nginx-ingress-controller     "/usr/bin/dumb-init …"   53 seconds ago       Up 52 seconds                     k8s_nginx-ingress-controller_nginx-ingress-controller-zf9sp_ingress-nginx_4554b4be-8156-4094-93c6-39de2677674b_0
1da451d4e161   rancher/mirrored-pause:3.2           "/pause"                 About a minute ago   Up About a minute                 k8s_POD_calico-node-tjxc5_kube-system_28e61807-1f03-44b2-887b-0dce08c44042_1
21a6680cf1e1   rancher/mirrored-pause:3.2           "/pause"                 About a minute ago   Up About a minute                 k8s_POD_nginx-ingress-controller-zf9sp_ingress-nginx_4554b4be-8156-4094-93c6-39de2677674b_0
a21eaa67a7eb   rancher/hyperkube:v1.20.6-rancher1   "/opt/rke-tools/entr…"   47 minutes ago       Up About a minute                 kube-proxy
c906664b9ff8   rancher/hyperkube:v1.20.6-rancher1   "/opt/rke-tools/entr…"   47 minutes ago       Up About a minute                 kubelet
30ae6c174dff   rancher/rke-tools:v0.1.74            "nginx-proxy CP_HOST…"   47 minutes ago       Up About a minute                 nginx-proxy
```

Một điểm yếu mà Docker gặp phải đó chính là Docker chỉ chạy và quản lý được các container trên một node. Swarm mode giúp chúng ta có thể triển khai các container trên nhiều node dưới dạng cluster, các công việc deploy ứng dụng chúng ta đã hoàn toàn chỉ cần thực hiện trên master node. Nhưng khi muốn thao tác với một container chạy trong worker node từ master node thì lại không thể. Và đó là điểm trí tử đầu tiên.

Đối với Kubernetes, mỗi cluster sẽ có những cấu hình và context riêng. Dù bạn setup Kubernetes cluster thủ công hay bằng RKE thì luôn có một file config mô tả về cluster, các tài khoản có thể truy cập và thao tác trong cluster... Chúng được lưu trữ tại thư mục `~/.kube`. Mặc định thì chúng ta sẽ có một file `~/.kube/config` sẽ là file cấu hình của cluster.

Các file config sẽ được `kubectl` sử dụng để có thể truy cập lên server và tương tác với cluster như deploy chẳng hạn. Nếu bạn để ý, thì từ đầu bài đến giờ, chúng ta chưa hề cài đặt `kubectl` trên bất kỳ một node nào cả. RKE cũng không thực hiện việc đó. Bạn có thể check bằng lệnh:

```bash
which kubectl
```

Với RKE, sau khi cài đặt xong cluster thì ngoài file `.rkestate` ra sẽ có thêm một file nữa có tên là `kube_config_cluster.yml`. Trong bài này thì file sinh ra có tên là `kube_config_mycluster.yml`. Đây chính là file config của RKE cluster mà chúng ta vừa dựng. Chúng ta có thể sử dụng file config cluster này để tương tác với Kubernetes bằng `kubectl` được cài đặt trên máy local của bạn, truy cập được tới bất kỳ pod trên node bất kỳ mà chúng không phải SSH vào bất kỳ server nào cả.

Check thử bằng cách chạy lệnh sau:

```bash
kubectl --kubeconfig kube_config_mycluster.yml get nodes
```

Như bạn thấy, output của mình:

```bash:output
NAME      STATUS   ROLES               AGE   VERSION   INTERNAL-IP      EXTERNAL-IP   OS-IMAGE                       KERNEL-VERSION    CONTAINER-RUNTIME
master    Ready    controlplane,etcd   10h   v1.20.6   192.168.137.10   <none>        Debian GNU/Linux 10 (buster)   4.19.0-16-amd64   docker://20.10.6
worker1   Ready    worker              10h   v1.20.6   192.168.137.11   <none>        Debian GNU/Linux 10 (buster)   4.19.0-16-amd64   docker://20.10.6
worker2   Ready    worker              10h   v1.20.6   192.168.137.12   <none>        Debian GNU/Linux 10 (buster)   4.19.0-16-amd64   docker://20.10.6
worker3   Ready    worker              10h   v1.20.6   192.168.137.13   <none>        Debian GNU/Linux 10 (buster)   4.19.0-16-amd64   docker://20.10.6
```

###  Ngắn gọn hơn với --context

`kubectl` hỗ trợ tương tác được với nhiều Kubernetes cluster vời nhiều file config như trên. Mặc định thì nó chỉ đọc file config cluster là `~/.kube/config`. Nếu mỗi lần chạy command mà thêm cái path như kia thì toang quá.

Nếu không muốn merge các file config này lại thì bạn chỉ cần thiết lập biến môi trường `KUBECONFIG` để chỉ đường cho `kubectl`.  Thêm biến môi trường này vào trong file `.bashrc` hoặc `.zshrc` hoặc `.config/fish/config.fish` để mỗi lần đăng nhập là biến này đã được tạo, theo mẫu sau:

```bash:.bashrc|.zshrc
export KUBECONFIG='~/.kube/config:~/.kube/kube_config_mycluster.yml:~/.kube/webee_staging.yml:~/.kube/webee_production.yml'
```

```bash:~/.config/fish/config.fish
set KUBECONFIG $HOME/.kube/config:$HOME/.kube/kube_config_mycluster.yml:$HOME/.kube/webee_staging.yml:$HOME/.kube/webee_production.yml
```

Dùng option `--context` thay `--kubeconfig`:
```bash
kubectl --context local
```

```bash:output
NAME      STATUS   ROLES               AGE   VERSION
master    Ready    controlplane,etcd   10h   v1.20.6
worker1   Ready    worker              10h   v1.20.6
worker2   Ready    worker              10h   v1.20.6
worker3   Ready    worker              10h   v1.20.6
```

### Ngắn hơn nữa với kubectx + kubens

Theo như trên, mỗi lần chúng ta chạy lệnh sẽ phải thêm option `--context`, mỗi khi tương tác với namespace khác nhau lại phải thêm `--namespace` sẽ rất bất tiện. Mình sẽ giới thiệu thêm một cách khác ngắn gọn hơn đó là dùng `kubectx` - https://github.com/ahmetb/kubectx/releases.

Bạn download file binary là `kubectx` và `kubens` về và copy vào thưc mục `/usr/local/bin` (Linux). Trong đó thì:
- `kubectx`: Xem và thay đổi context mặc định khi không gõ command mà không có `--context`
- `kubens`: Liệt kê và thay đổi namespace mặc định khi gõ command mà không có `--namespace`

#### Cách dùng kubectx

- Liệt kê các context:
```bash
kubectx
```

- Đổi context mặc định sang cái khác:
```bash
kubectx <context-name>
```

#### Cách dùng kubens

- Liệt kê các namespace:
```bash
kubens
```

- Đổi namespace mặc định sang một cái khác:
```bash
kubens <namespace-name>
```

## Tổng kết

Trên đây là bài chia sẻ của mình tới các bạn, nó mang đến một số kiến thức:
- Cách để setup Kubernetes cluster tự động với RKE CLI
- Cách sử dụng multi-clusters kubectl ngắn gọn với lệnh `kubectx` và `kubens`
- Mẹo sử dụng `synchronize-panes` với Tmux

Nếu bạn thấy bài viết này hay và hữu ích, nhớ upvote và clip bài này để ủng hộ mình nhé. Comment nếu bạn gặp vấn đề khi thực hiện hoặc muốn biết request thêm những bài viết về chủ đề mới. Chúc các bạn sẽ học tập thêm nhiều kiến thức mới trên Viblo.

Follow mình trên Viblo nhé! Cảm ơn các bạn đã theo dõi. :wave::wave::wave:

## Tài liệu tham khảo thêm

- https://github.com/rancher/rke/releases
- [Hướng dẫn dựng máy ảo Debian 10 trong Hyper-V trên Windows 10](https://viblo.asia/p/924lJGL85PM)
- [Hướng dẫn cách sử dụng ssh-copy-id để copy public key lên server](https://viblo.asia/p/bJzKmVjDZ9N)
- [RKE OS Requirements](https://rancher.com/docs/rke/latest/en/os)
- https://github.com/gpakosz/.tmux
- https://docs.docker.com/engine/install/debian/
- https://docs.docker.com/engine/install/ubuntu
- https://rancher.com/docs/rke/latest/en/installation/
- https://rancher.com/docs/rke/latest/en/config-options
- https://rancher.com/docs/rancher/v2.x/en/installation/resources/k8s-tutorials/ha-rke/

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***