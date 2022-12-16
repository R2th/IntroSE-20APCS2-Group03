Các bạn SSH vào các server nhé =))

Trước khi bắt đầu cài Kubernetes thì các bạn cài docker trên tất cả các nodes trước nhé ở đây docker version

```
Client:
 Version:           18.09.7
 API version:       1.39
 Go version:        go1.10.1
 Git commit:        2d0083d
 Built:             Fri Aug 16 14:20:06 2019
 OS/Arch:           linux/amd64
 Experimental:      false

Server:
 Engine:
  Version:          18.09.7
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.10.1
  Git commit:       2d0083d
  Built:            Wed Aug 14 19:41:23 2019
  OS/Arch:          linux/amd64
  Experimental:     false
```

## Install Kubernetes

**On All Node:**
Chạy lệnh sau đây trên tất cả các nodes để thêm Kubernetes package repository key và cài đặt kubeadm, kubectl, kubelet

```
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

bao giờ nó ra kết quả này là ok. Ở series này mình chạy phiên bản kubernetes là 1.17 nhé.
```
kubelet set on hold.
kubeadm set on hold.
kubectl set on hold.
```

## Kubeadm, kubectl, kubelet là gì ?

Theo ý hiểu của mình cho gọn, ném đá thì chịu =))

1. **Kubeadm**
Là tool được tạo ra để tạo cluster `kubeadm init` sẽ tạo ra master node thật sự thay vì cái tags mình định danh, và `kubeadm join ....` sẽ dành cho các worker node `join` vào master
3. **Kubelet**
Dịch vụ này chạy trên các node và đọc các tệp kê khai container và đảm bảo các container đã xác định sẽ bắt đầu hoạt động và chạy.
5. **Kubectl**
là câu lệnh như tạo, logs quản lý các services, pods, deployments,...

Câu hỏi đặt ra các services, pods, deployments là gì thì tham khảo thêm các bài viết khác có tags `kubernetes` để tham khảo rất nhiều

## Tiếp theo

Chúng ta sẽ đến việc khởi tạo mạng, join nodes, chạy ứng dụng đầu tiên trên Private IP.

facebook : facebook.com/quanghung997