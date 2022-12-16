Bài viết này mình hướng dẫn các bạn cài đặt kubernetes cluster trên môi trường Ubuntu với 2 servers : 1 Master và 1 slave.

I. Yêu cầu cầu hình server ubuntu trước khi cài đặt kubernetes.

Yêu cầu tối thiểu cho server chạy Ubuntu là : 

 ```
Master:
    2 GB RAM
    2 Cores of CPU
```
```
Slave/ Node:
    1 GB RAM
    1 Core of CPU 
```

Trên 2 ubuntu server ta update repository cho 2 server để cập nhật danh sách các gói để cho việc nâng cấp cần thiết. 

```
        apt-get update
```
Kubernetes yêu cầu tắt tính năng swap cho server. Kubernetes không chạy trên vùng swap nên ta tắt tính năng đó bằng cách chạy lệnh: 

```
    swapoff -a
```
Để tắt triệt để vùng swap khi server reboot lại ta chỉnh sửa file : 
```
    nano /etc/fstab
```

Comment out dòng khởi động swap khi server khởi động:
![](https://images.viblo.asia/8ef40d5f-2742-4aa4-a8c8-964e06212c59.png)

Cập nhật hostname phù hợp cho việc cài đặt kubernetes cluster. 
```
    nano /etc/hostname
```
![](https://images.viblo.asia/ba92f3dc-692c-4073-b410-dd524c777d42.png)
Trong bài này ta đặt master server tên là kmaste
Tiếp theo ta cập nhật file hosts cho cả master và slave đúng theo địa chỉ ip address cho từng server. 
![](https://images.viblo.asia/9792a969-e585-402b-8845-fdf80f1200e5.png)

Tiếp theo chúng ta cài đặt openSSH-server cho master và slave server : 
```
    sudo apt-get install openssh-server
```
Kubernetes chạy trên nền tảng docker, nên tiếp theo chúng ta cài đặt docker cho cả master và slave server. 
```
sudo su
apt-get update 
apt-get install -y docker.io
```
Cài đặt repo cho việc chuẩn bị cài đặt kubernetes : 
```
apt-get update && apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
apt-get update
```
Sau đó cài đặt từng thành phần của kubernetes : bao gồm kubeadm, Kubelet And Kubectl
```
apt-get install -y kubelet kubeadm kubectl 
```
Cập nhật cấu hình kubernetes : 
Thêm vào : 
```
    Environment=”cgroup-driver=systemd/cgroup-driver=cgroupfs”
```
![](https://images.viblo.asia/2ba6e5a5-3365-4ad0-baad-8a15d9560fe5.png)

OK ! Như vậy bạn đã cài đặt xong Kubernetes trên cả master và slave server .

Để tiếp tục thiết lập cluster cho kubernetes cho cả 2 server này , mình sẽ tiếp tục viết trong bài thứ 2.