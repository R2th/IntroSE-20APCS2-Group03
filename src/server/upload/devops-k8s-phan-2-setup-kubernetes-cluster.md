# Xin chào các mọi người. Hy vọng các bài viết có thể giúp ích cho mọi người. Bài viết này là Phần 2 - Setup Kubernetes Cluster
## I. Cài đặt một Kubernetes cluster
### 1.1. Cài đặt Kubernetes cluster cơ bản
Đây sẽ là hướng dẫn cài đặt Kubernetes cluster với 2 node: master node và worker node. Trong trường hợp sử dụng nhiều node thì làm tương tự các bước trên worker node dưới đây.

**1.1.1. Master node**\
Hostname: masternode\
OS VMware: Ubuntu 20.04\
IP: 192.168.12.13\
Container runtimer: containerd\
Plugin network: calico

Bước 1: Update hệ thống và cài các gói cần thiết\
`sudo apt -y update && sudo apt -y upgrade`\
`sudo apt -y install curl apt-transport-https vim git wget gnupg2 software-properties-common ca-certificates`

Bước 2: Cài đặt kubelet, kubeadm và kubectl\
`curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -`\
`echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list`

`sudo apt -y update`\
`sudo apt -y install kubelet kubeadm kubectl`\
`sudo apt-mark hold kubelet kubeadm kubectl`

`kubectl version --client && kubeadm version`

Bước 3: Tắt Swap\
`sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab`\
`sudo nano /etc/fstab`

`sudo swapoff -a`\
`sudo mount -a`\
`free -h`

`sudo modprobe overlay`\
`sudo modprobe br_netfilter`

```
sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
```
`sudo sysctl --system`

Bước 4: Cài đặt container runtime
```
sudo tee /etc/modules-load.d/containerd.conf <<EOF
overlay
br_netfilter
EOF
```
`sudo modprobe overlay`\
`sudo modprobe br_netfilter`

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`\
`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`

`sudo apt update`\
`sudo apt install -y containerd.io`

`sudo su -`\
`mkdir -p /etc/containerd`\
`containerd config default>/etc/containerd/config.toml`

`sudo systemctl restart containerd`\
`sudo systemctl enable containerd`\
`systemctl status  containerd`

Bước 5: Cài đặt master node\
`lsmod | grep br_netfilter`\
`sudo systemctl enable kubelet`\
`sudo kubeadm config images pull`

```
sudo kubeadm init \
  --pod-network-cidr=192.168.0.0/16 \
  --cri-socket unix:///run/containerd/containerd.sock \
  --apiserver-advertise-address=192.168.12.13
```
`mkdir -p $HOME/.kube`\
`sudo cp -f /etc/kubernetes/admin.conf $HOME/.kube/config`\
`sudo chown $(id -u):$(id -g) $HOME/.kube/config`

`kubectl cluster-info`

Bước 6: Cài network plugin trên master node\
`kubectl create -f https://docs.projectcalico.org/manifests/tigera-operator.yaml `\
`kubectl create -f https://docs.projectcalico.org/manifests/custom-resources.yaml`

`watch kubectl get pods --all-namespaces`

Cho phép Pod có thể chạy trên master node\
`kubectl taint nodes --all node-role.kubernetes.io/control-plane-`

**1.1.2. Worker node**\
Hostname: workernode \
OS VMware: Ubuntu 20.04\
IP: 192.168.12.14\
Container runtimer: containerd\

Bước 1 -> Bước 4: Thực hiện tương tự như master node ở trên.

Bước 5: Join vào một cluster\
`kubeadm join 192.168.12.13:6443 --token 28tobh.qjp2ib31yr6cekzi --discovery-token-ca-cert-hash sha256:cb9cf4668ffd694c2a29dae9bf6996b88d8db981e05b4de824a4c0187d01a51c`

### 1.2. Cài đặt cluster đặc biệt - Minikube
Cần cài đặt docker ce trước khi thực hiện các bước tiếp theo.

Hostname: host02\
OS: Ubuntu 20.04 live\
IP: 192.168.31.126

Bước 1: Update hệ thống\
`sudo apt -y update && apt -y upgrade`

Bước 2: Tải gói minikube\
`wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64`
![image.png](https://images.viblo.asia/ea3458c5-b4b6-4816-8f0f-63dc7babb496.png)

`sudo cp minikube-linux-amd64 /usr/local/bin/minikube`\
`sudo chmod 755 /usr/local/bin/minikube`\
![image.png](https://images.viblo.asia/60989d31-6167-48c8-92a1-2505c2a1fbc9.png)

Kiểm tra minikube\
`minikube version`\
![image.png](https://images.viblo.asia/296f8f84-a225-46ce-bc97-3142c0bd67e6.png)

Bước 3: Cài đặt plugin kubectl\
Việc giao tiếp trong cluster sừ dụng plugin kubectl.\
`curl -LO https://storage.googleapis.com/kubernetes-release/release/' curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt' /bin/linux/amd64/kubectl`

![image.png](https://images.viblo.asia/4c5945e8-5fc0-41a0-8e58-feaaf43dae40.png)
`sudo chmod +x ./kubectl`\
`sudo mv ./kubectl /usr/local/bin/kubectl`\
![image.png](https://images.viblo.asia/59b10544-1185-4070-8ccf-1624cbf0ef18.png)

Kiểm tra kubectl\
`kubectl version -o json`\
![image.png](https://images.viblo.asia/a892026f-b67d-479e-a963-6adae1ed86da.png)

**Quản lý minikube**\
`minikube start/status/stop`
![image.png](https://images.viblo.asia/e1810df5-a7d7-4541-a0a2-ecd7cdc718dd.png)

`minikube delete`

`minikube ssh`

`minikube addons list`

`minikube dashboard`

`minikube dashboard --url`

### 1.3. Quản lý cluster đã triển khai
`kubectl get nodes`\
`kubectl get nodes -o wide`\
`kubectl config view`\
`kubectl cluster-info`\
`kubectl get nodes`\
`kubectl get pod`

## II. Cài đặt Dashboard
Cài đặt giao diện quản lý cho cluster là một tùy chọn có thể sử dụng hoặc không. Việc theo tác trên giao diện hoàn toàn có thế thực hiện bằng các CLI. Vì vậy nếu muốn học sâu thì sử dụng CLI sẽ là phương án tốt nhất.

Trong bài viết này sẽ hướng dẫn cài đặt dashboard bằng Nodeport\
Bước 1: \
`wget https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/recommended.yaml`\
`kubectl apply -f recommended.yaml`

`kubectl get svc -n kubernetes-dashboard`\
`kubectl --namespace kubernetes-dashboard patch svc kubernetes-dashboard -p '{"spec": {"type": "NodePort"}}'`

`kubectl get svc -n kubernetes-dashboard kubernetes-dashboard -o yaml`

`vim nodeport_dashboard_patch.yaml`\
```
spec:
  ports:
  - nodePort: 32000
    port: 443
    protocol: TCP
    targetPort: 8443
```
`kubectl -n kubernetes-dashboard patch svc kubernetes-dashboard --patch "$(cat nodeport_dashboard_patch.yaml)"`

`kubectl get deployments -n kubernetes-dashboard`\
`kubectl get pods -n kubernetes-dashboard`\
`kubectl get service -n kubernetes-dashboard`

Bước 2: Truy cập link dashboard và tạo token login\
Truy cập vào link https://ip:32000

***Mình rất xin lỗi khi chưa thể update thêm các bài viết mới trong series về K8S vì khoảng thời gian gần đây mình khá bận do mình đã bắt đầu công việc mới với vị trí chuyên viên DevOps. Mặc dù mình đã có 4 5 bản nháp cho các bài tiếp theo trong series này.  Mình  chắc chắn sẽ quay lại làm tiếp series này trong thời gian sắp tới. Và để bù lại thì mình sẽ ra các bài tiếp theo liên quan đến Ansible, Terraform, AWS với góc nhìn là một chuyên viên DevOps. Mình xin cám ơn.***