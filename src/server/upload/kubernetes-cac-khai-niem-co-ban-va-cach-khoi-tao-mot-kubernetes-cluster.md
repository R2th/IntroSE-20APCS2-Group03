Chào mọi người, lại là mình đây. Hôm nay chúng ta cùng tìm hiểu một vài khái niệm về Kubernetes và cách khởi tạo một Kubernetes cluster hoàn chỉnh ở local với VirtualBox, Vagrant và Kubectl (go)

# Tổng quan
## Kubernetes là gì
![](https://images.viblo.asia/fc5580ca-6023-43ff-bbe0-acfb98cb3a8a.png)

Kubernetes (hoặc k8s) là một nền tảng mã nguồn mở, sử dụng để tự động hoá việc quản lý, scaling và triển khai ứng dụng dưới dạng container hay còn gọi là Container orchestration engine. Kubernetes giúp chúng ta loại bỏ rất nhiều các quy trình thủ công liên quan đến việc triển khai và mở rộng các containerized applications.

Kubernetes có thể gọi tắt là k8s - tức là bắt đầu bằng chữ "k", giữa là 8 ký tự và cuối là chữ "s" :))

Kubernetes orchestration cho phép chúng ta xây dựng các dịch vụ ứng dụng mở rộng với nhiều containers. Nó lên lịch các containers đó trên một cụm, mở rộng các containers và quản lý tình trạng của các containers theo thời gian.

Kubernetes là một công cụ mạnh mẽ được phát triển bởi Google, trước khi public thì Google đã sử dụng nó để quản lý hàng tỉ container của mình.


## Một vài định nghĩa

### Clusters
Một Kubernetes cluster là một tập các máy ảo hay máy vật lý được sử dụng bởi Kubernetes dùng để chạy các ứng dụng.
Các máy ảo hay máy vật lý này là các nodes, bao gồm node master và các nodes worker. Các node này cần cài đặt docker và Kubernetes.

![](https://images.viblo.asia/0c2a29f3-0c0d-4720-95fe-834c785d3531.png)

### Nodes

Kubernetes nodes là các máy ảo hay máy vật lý chạy kubernetes. Các node này cần chạy Kubernetes và docker, và mỗi máy này là một docker host.

Node là đơn vị nhỏ nhất của phần cứng máy tính trong Kubernetes. Nó là đại diện của một máy duy nhất trong Kubernetes cluster. Trong hầu hết các hệ thống Kubernetes, một node có thể sẽ là một máy vật lý thật sự hoặc máy ảo của một cloud platform như Google Cloud Platform hay AWS, hoặc đơn giản là một máy ảo được tạo bởi VirtualBox trên một máy đơn.

Chúng ta có thể đơn giản xem mỗi node như một tập hợp tài nguyên CPU và RAM có thể được sử dụng. Bằng cách này, bất kỳ máy nào cũng có thể thay thế bất kỳ máy nào khác trong Kubernetes cluster.

### Pods

Khi một ứng dụng được đóng gói thì ứng dụng đó sẽ có thể chạy trên một container độc lập, tuy chúng ta có thể chạy container độc lập như cách khởi chạy một ứng dụng monolythic, nhưng Kubernetes sẽ không chạy theo cách như vậy, Kubernetes sử dụng khái niệm pod để nhóm các container lại với nhau. Một pod là một nhóm các container, các container này sẽ dùng chung tài nguyên và network, các container trong một pod có thể duy trì giao tiếp với nhau như trên một máy chủ nhưng vẫn giữ được sự độc lập cần thiết.

Với Kubernetes, đơn vị khi scale ứng dụng sẽ là scale các pods, vì vậy nên các pods thường là nhóm các containers có cùng mục đích sử dụng, ví dụ như một pod tập hợp 4 container chạy nginx + backend, và một pod tập hợp 2 container chạy frontend + nginx .v.v.


# Một vài setup cần thiết

Ở phạm vi bài viết này mình sẽ  demo cách khởi tạo một Kubernetes cluster trên một máy vật lý duy nhất, sử dụng các máy ảo chạy trên VirtualBox. Các cài đặt là trên hđh Ubuntu 16.04

### Cài VirtualBox
> Công cụ để quản lý máy ảo khá quen thuộc, hỗ trợ nhiều hệ điều hành phổ biến như Windows, Ubuntu, MacOs ..v.v

```shell
sudo apt-get update
sudo apt-get upgrade
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add -
wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb http://download.virtualbox.org/virtualbox/debian xenial contrib"
sudo apt-get update
sudo apt-get install virtualbox
```


### Cài Minikube
> Một Kubernetes cluster có thể được xây dựng trên các máy tính vật lý hoặc các máy ảo. Để bắt đầu việc phát triển cho Kubernetes, bạn có thể sử dụng Minikube. Minikube là một bộ cài đặt Kubernetes bằng cách tạo ra một máy ảo trên máy tính của bạn và triển khai một cluster đơn giản bên trong máy ảo đó chỉ bao gồm một Node

```shell
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
sudo mkdir -p /usr/local/bin/
sudo install minikube /usr/local/bin/
```
Hãy cài đặt minikube để sử dụng cho việc switch context cuối bài viết nhé :))

### Cài kubectl
> Công cụ kubectl giúp chúng ta điều khiển các Kubernetes cluster. kubectl sử dụng cấu hình trong `$HOME/.kube`

```shell
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
kubectl version
```

### Cài Vagrant
> Vagrant là một sản phẩm phần mềm nguồn mở để xây dựng và duy trì môi trường phát triển phần mềm ảo di động. Nó giúp chúng ta đơn giản hóa việc quản lý cấu hình phần mềm ảo hóa, giúp khởi tạo môi trường ảo hóa một cách nhanh và hiệu suất.

```shell
sudo apt-get install vagrant
```
Các bạn có thể tìm hiểu thêm xem vagrant nó có thể làm được gì, về cơ bản thì nó hỗ trợ chúng ta tạo một máy ảo chỉ thông qua một file là `Vagrantfile`, cấu hình cũng như các thông số về máy ảo nằm gọn trong file này và chúng ta khởi tạo máy ảo chỉ thông qua một câu lệnh là `vagrant up`

# Bắt đầu thôi nào!

*Có rất nhiều cách để khởi tạo một Kubernetes cluster, trong phạm vi bài viết này thì mình sẽ chạy ở mức độ là localhost - trên PC của mình*

### Khởi tạo máy ảo thông qua vagrant

Để khởi tạo một cluster hoàn chỉnh chúng ta cần có các máy ảo, ở demo này mình sẽ khởi tạo 3 máy ảo bao gồm 1 master + 2 worker

```shell
mkdir -p vagrant/master
mkdir -p vagrant/worker1
mkdir -p vagrant/worker2
```
`nano vagrant/master/Vagrantfile`
Dán nội dung sau vào:
```
# -*- mode: ruby -*-
# vi: set ft=ruby :

# Install virtual box centos/7, IP address and hostname, ram + cpus
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.network "private_network", ip: "172.16.10.100"
  config.vm.hostname = "master"

  config.vm.provider "virtualbox" do |vb|
     vb.name = "master"
     vb.cpus = 2
     vb.memory = "2048"
  end
  
  # Install docker + kubernetes in machine
  config.vm.provision "shell", path: "../install-docker-kube.sh"

  config.vm.provision "shell", inline: <<-SHELL
    # Setup password and enable ssh
    echo "123" | passwd --stdin root
    sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
    systemctl reload sshd
    # Add host in cluster to /etc/hosts
    cat >>/etc/hosts<<EOF
    172.16.10.100 master
    172.16.10.101 worker1
    172.16.10.102 worker2
    EOF
  SHELL
end
```

Tương tự với các máy workers, chỉ khác host name và ip cũng như tùy chọn cấu hình

File `vagrant/worker1/Vagrantfile`
```
# -*- mode: ruby -*-
# vi: set ft=ruby :

# Install virtual box centos/7, IP address and hostname, ram + cpus
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.network "private_network", ip: "172.16.10.101"
  config.vm.hostname = "worker1"

  config.vm.provider "virtualbox" do |vb|
     vb.name = "worker1"
     vb.cpus = 1
     vb.memory = "1024"
  end
  
  # Install docker + kubernetes in machine
  config.vm.provision "shell", path: "../install-docker-kube.sh"

  config.vm.provision "shell", inline: <<-SHELL
    # Setup password and enable ssh
    echo "123" | passwd --stdin root
    sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
    systemctl reload sshd
    # Add host in cluster to /etc/hosts
    cat >>/etc/hosts<<EOF
    172.16.10.100 master
    172.16.10.101 worker1
    172.16.10.102 worker2
    EOF
  SHELL
end
```

File `vagrant/worker2/Vagrantfile`

```
# -*- mode: ruby -*-
# vi: set ft=ruby :

# Install virtual box centos/7, IP address and hostname, ram + cpus
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.network "private_network", ip: "172.16.10.102"
  config.vm.hostname = "worker2"

  config.vm.provider "virtualbox" do |vb|
     vb.name = "worker2"
     vb.cpus = 1
     vb.memory = "1024"
  end
  
  # Install docker + kubernetes in machine
  config.vm.provision "shell", path: "../install-docker-kube.sh"

  config.vm.provision "shell", inline: <<-SHELL
    # Setup password and enable ssh
    echo "123" | passwd --stdin root
    sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
    systemctl reload sshd
    # Add host in cluster to /etc/hosts
    cat >>/etc/hosts<<EOF
    172.16.10.100 master
    172.16.10.101 worker1
    172.16.10.102 worker2
    EOF
  SHELL
end
```

File cài đặt docker & kubernetes cho máy ảo centos trên, bao gồm cài docker + kubernetes, và các thiết đặt khác.

File `vagrant/install-docker-kube.sh`
```
#!/bin/bash

# Install Docker
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum update -y && yum install docker-ce-18.06.2.ce -y
usermod -aG docker $(whoami)

## Create /etc/docker directory.
mkdir /etc/docker

# Setup daemon.
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ]
}
EOF

mkdir -p /etc/systemd/system/docker.service.d

# Restart Docker
systemctl enable docker.service
systemctl daemon-reload
systemctl restart docker

# Disable SELinux
setenforce 0
sed -i --follow-symlinks 's/^SELINUX=enforcing/SELINUX=disabled/' /etc/sysconfig/selinux

# Disable Firewall
systemctl disable firewalld >/dev/null 2>&1
systemctl stop firewalld

# sysctl
cat >>/etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system >/dev/null 2>&1

# Turn off swap
sed -i '/swap/d' /etc/fstab
swapoff -a

# Add yum repo file for Kubernetes
cat >>/etc/yum.repos.d/kubernetes.repo<<EOF
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF

yum install -y -q kubeadm kubelet kubectl

systemctl enable kubelet
systemctl start kubelet

# Configure NetworkManager before attempting to use Calico networking.
cat >>/etc/NetworkManager/conf.d/calico.conf<<EOF
[keyfile]
unmanaged-devices=interface-name:cali*;interface-name:tunl*
EOF
```


Lần lượt start các máy ảo master, worker1 và worker2
```SHELL
cd ~/vagrant/master
vagrant up
cd ~/vagrant/worker1
vagrant up
cd ~/vagrant/worker2
vagrant up
```

Sau đó chúng ta có thể kiểm tra trên giao diện VirtualBox xem các máy ảo master, workers đã được tạo hay chưa nhé :
![](https://images.viblo.asia/172728cb-8c75-488d-8157-c138946ee541.png)


### Khởi tạo cluster

Để khởi tạo cluster hoàn chỉnh chúng ta cần ssh vào các máy ảo và khởi tạo qua kubeadm

Ở máy master, lúc ssh hãy nhập mật khẩu ở file config vagrant mà lúc nãy chúng ta cấu hình nhé, ở đây pasword mình để là `123`

Khởi tạo node ở máy master của cluster
```shell
ssh root@172.16.10.100
kubeadm init --apiserver-advertise-address=172.16.10.100 --pod-network-cidr=192.168.0.0/16
```

Sau khi khởi tạo thành công thì kubeadm yêu cầu chúng ta chạy các lệnh sau để có thể copy cấu hình để máy có thể kết nối cluster:
![](https://images.viblo.asia/81f455d8-fec0-4f9d-a31e-f2e69f2c38d9.png)

Vì vậy hãy chạy tiếp các lệnh sau trên máy master:

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Cũng như cần cài đặt một plugin mạng, hãy mở đường link để lựa chọn một addon
```shell
You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/
```

 Ở đây mình sẽ sử dụng addon của calico
```shell
 kubectl apply -f https://docs.projectcalico.org/v3.10/manifests/calico.yaml
```

Sau các bước trên thì chúng ta đã khởi tạo thành công một cluster, tuy nhiên cluster này mới chỉ có một node là master mà thôi
```shell
[root@master ~]# kubectl cluster-info
Kubernetes master is running at https://172.16.10.100:6443
KubeDNS is running at https://172.16.10.100:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
[root@master ~]# kubectl get nodes
NAME     STATUS   ROLES    AGE     VERSION
master   Ready    master   9m29s   v1.18.8
```
Tiếp theo chúng ta sẽ tiến hành join vào cluster trên các máy workers

Ở máy master:
```shell
[root@master ~]# kubeadm token create --print-join-command
W0822 14:53:04.652936   22591 configset.go:202] WARNING: kubeadm cannot validate component configs for API groups [kubelet.config.k8s.io kubeproxy.config.k8s.io]
kubeadm join 172.16.10.100:6443 --token 2tugxy.fq0dmyt2mpeqll1c     --discovery-token-ca-cert-hash sha256:a27b63db02ce8d1db21a02041189bd9ff83e608f115867d5c94faee8955216db 
```
Lần lượt ssh vào các máy worker và sử dụng command đã gen này để join vào cluster
```shell
ssh root@172.16.10.101
kubeadm join 172.16.10.100:6443 --token 2tugxy.fq0dmyt2mpeqll1c     --discovery-token-ca-cert-hash sha256:a27b63db02ce8d1db21a02041189bd9ff83e608f115867d5c94faee8955216db 
```

Sau đó hãy chờ một vài phút và kiểm tra ở máy master, thấy list này tức là các máy worker đã join vào cluster thành công!
```
[root@master ~]# kubectl get nodes
NAME      STATUS   ROLES    AGE   VERSION
master    Ready    master   15m   v1.18.8
worker1   Ready    <none>   92s   v1.18.8
worker2   Ready    <none>   69s   v1.18.8
```

Như vậy chúng ta đã khởi tạo thành công một cluster hoàn chỉnh với 3 nodes sử dụng các máy ảo của VIrtualBox. 

## Sử dụng kubectl với ngữ cảnh context

**Sử dụng các context trong kubectl**

Sau demo trên thì chúng ta đã khởi một cluster hoàn chỉnh, chúng ta có thể tạo thêm một cluster với minikube

Đây là công cụ tạo một cluster ở local, bây giờ mình sẽ start minikube để tạo thêm một cluster, và chúng ta có thể switch giữa minikube và  kubernetes-admin@kubernetes như sau.

```shell
minikube start
```

Các cấu hình cho trình điểu khiển kubectl được đọc ở `$HOME/.kube/config`.

Để chuyển đổi context, chúng ta có thể thay đổi biến môi trường KUBECONFIG để chuyển đổi ngữ cảnh sử dụng khác.

Giả sử chúng ta có cấu hình của một cluster cluster1 ở file `/home/chicken/.kube/config-cluster1`, ở cửa sổ cmd thì export biến môi trường này để đổi cấu hình cho kubectl
`export KUBECONFIG=/home/chicken/.kube/config-cluster1`

Ở máy localhost hãy kiểm tra ngữ cảnh của kubectl đang như nào nhé 
```shell
chicken@chicken-MS-7817 ~ $ kubectl config get-contexts
CURRENT   NAME                          CLUSTER      AUTHINFO           NAMESPACE
*         minikube                      minikube     minikube           
```
minikube này là cluster được tạo sau khi mình start minikube trên máy localhost của mình, và kubectl chỉ điều khiển cluster minikube này thôi. để chuyển đổi context thì mỗi lần mở terminal chúng ta lại phải export biến môi trường như trên, sẽ khá là bất tiện

Bây giờ chúng ta hãy thêm một ngữ cảnh để kubectl có thể đổi qua cluster mà chúng ta khởi tạo hồi nãy nhé:

Copy cấu hình cluster ở node master về localhost, nhớ đổi đường dẫn phù hợp nhé :))
```
scp root@172.16.10.100:/etc/kubernetes/admin.conf /home/chicken/.kube/config-cluster1
export KUBECONFIG=~/.kube/config:~/.kube/config-cluster1
kubectl config view --flatten > ~/.kube/config_temp
mv ~/.kube/config_temp ~/.kube/config
```
Hãy kiểm tra context, bây giờ ở localhost chúng ta đang có 2 ngữ cảnh của kubernetes để có thể chuyển đổi.

```shell
chicken@chicken-MS-7817 ~/vagrant/worker1 $ kubectl config get-contexts
CURRENT   NAME                          CLUSTER      AUTHINFO           NAMESPACE
          kubernetes-admin@kubernetes   kubernetes   kubernetes-admin   
*         minikube                      minikube     minikube           
```

Để có thể chuyển context thì chúng ta chạy
```shell
chicken@chicken-MS-7817 ~ $ kubectl config use-context kubernetes-admin@kubernetes
Switched to context "kubernetes-admin@kubernetes".
chicken@chicken-MS-7817 ~ $ kubectl get nodes
NAME      STATUS   ROLES    AGE   VERSION
master    Ready    master   55m   v1.18.8
worker1   Ready    <none>   40m   v1.18.8
worker2   Ready    <none>   40m   v1.18.8
```

Máy localhost mình có thể dùng kubectl để điểu khiển cluster kubernetes-admin@kubernetes rồi.

Như vậy mình vừa trình bày các khái niệm cơ bản về Kubernetes và cách khởi tạo một Kubernetes cluster hoàn chỉnh. Hy vọng bài viết sẽ có ích cho những ai đang tìm hiểu về k8s
Cảm ơn mọi người đã theo dõi bài viết!

Tham khảo:
- https://medium.com/google-cloud/kubernetes-101-pods-nodes-containers-and-clusters-c1509e409e16
- https://xuanthulab.net