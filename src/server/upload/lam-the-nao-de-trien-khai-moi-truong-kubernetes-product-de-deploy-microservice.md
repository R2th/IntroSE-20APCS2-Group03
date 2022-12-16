## Chào các bạn hôm nay mình xin chia sẻ nhanh với các bạn các bước tạo kubernetes cluster trên máy Ubuntu 16.04  để deploy microservice

### Yêu cầu trước khi cài đặt  Kubernetes
Vì chúng  ta đang làm với  VMs (máy ảo), tôi đề nghị các bạn làm theo cài đặt cho máy ảo như sau :<br>
*Master:<br>
   4 GB RAM <br>
   2 Cores of CPU
<br>
*Slave/ Node: <br>
  2 GB RAM<br>
  1 Core of CPU


## Bước 1: cài đặt  kubeadm, kubelet, kubectl, docker for master, node



```
$ sudo su

# apt-get update && apt-get install -y apt-transport-https curl
# curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
# cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
# apt-get update
# apt-get install -y kubelet kubeadm kubectl docker.io

```
Các bạn có thể đọc thêm ở [đây!](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
## Bước 2: Bây giờ chúng ta sẽ khởi chạy kubernetes cluster trên máy chủ (master)
Sử dụng root để chạy : 
```
$ sudo -i 
# kubeadm init --apiserver-advertise-address=192.168.7.40 --pod-network-cidr=10.244.0.0/16
```
Ở đây 192.168.7.40 là địa chỉ ip của máy chủ master, 10.244.0.0/16 là dải mạng mạc định
![](https://images.viblo.asia/c949f69b-5835-441e-a785-914152d346fa.png)


Như đề cập ở trên hình trên , chúng ta sẽ chay các lệnh sau đây ở vai trò user bình thường 

```
$ mkdir -p $HOME/.kube 
$ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
$ sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Để kiểm tra xem kubenete cluster đã hoạt động hay chưa chạy lệnh :
```
$ kubectl get pods -o wide --all-namespaces
```
![](https://images.viblo.asia/5d2b88a9-6d94-44b1-84fe-36a2743ddb3e.png)

Như bạn có thể thấy coredsn của cùng tra vẫn đang ở trạng thái pending, điều này là do chúng ta đang thiếu một mạng cho pods (pods network)

## Bước 3:Cài đặt mạng cho pods , ở đây chúng ta sẽ dử dụng mạng flannel  
Tạo một thư mực kube, trong đó ta tạo file kube-flannel.yaml 

{@embed: https://gist.github.com/hoangnt-2197/776d53de2b03e300e6ead2d6d069677b}

Chạy cài đặt mạng :
```
$ kubectl apply -f kube-flannel.yaml
```
![](https://images.viblo.asia/7bf76b1f-b398-4b38-815e-b20762c40ed5.png)
```
$ kubectl get pods -o wide --all-namespaces
```
![](https://images.viblo.asia/fa2d194b-9775-4442-8e5d-02b4a226fb9a.png)

Có thể sau khi cài đặt xong bạn bị lỗi ở crashloopbackoff coredns như ở trên. Làm theo dưới đây : 
```
$ kubectl edit cm coredns -n kube-system
comment loop: loop -> #loop
```

![](https://images.viblo.asia/bf3d4481-3d56-458d-a33e-e46d12476c5c.png)

Chạy :
```
$ kubectl get pods -o wide --all-namespaces
```

![](https://images.viblo.asia/2a535301-5d86-4e6e-afa5-eb62fc6c7782.png)
Coredns đã hoạt động

## Bước 4: thêm Node Machine vào cluster
Chạy  câu lệnh dưới đây để lấy câu lệnh join  :<br>
```
$ kubeadm token create --print-join-command
```

![](https://images.viblo.asia/3346cbaf-2f18-4b53-b45e-c20b03da4d8e.png)


Thực hiện join máy node, chạy câu lệnh dưới đây trên Node Machine <br>
```
# kubeadm join 192.168.7.40:6443 --token 7yfzj7.geq97e65aceekdhk --discovery-token-ca-cert-hash sha256:da83c706547d4555a4a8c71ec230698fba32839384346e77a2b6c60ea44f7ba8
```
![](https://images.viblo.asia/e98e7380-6896-4e48-bfcc-a03de15f43f7.png)


Kiểm tra lại : 
```
$ kubectl get nodes
```

![](https://images.viblo.asia/c7dd6953-5614-4f2b-878e-1e4cf2614fd3.png)

```
$ kubectl get pods -o wide --all-namespaces
```

![](https://images.viblo.asia/b1b080ce-19ca-40cc-8d6c-05cc914558d2.png)

Như bạn có thể thấy ở trên,chúng ta có kube-proxy và  flannel network ở máy node  knote1
## Bước 5 deploy thử một service 
1. Clone microservice sock shop trên git repo:  <br>
```
$ git clone https://github.com/microservices-demo/microservices-demo.git
```

2. Tạo namspace <br>

```
$ kubectl create namespace sock-shop
```
 
3. Chạy demo <br>
```
kubectl apply -f complete-demo.yaml
```
![](https://images.viblo.asia/1453c534-6964-4c31-9312-5370b7100edd.png)
```
$ kubectl get pods -o wide --all-namespaces
```
![](https://images.viblo.asia/8f3028e3-6ff3-47da-9826-0e3b8c911a24.png)

Ghé thăm trang http://192.168.7.40:30001/  (192.168.7.40 là địa chỉ ip của master ) để kiểm tra <br>

![](https://images.viblo.asia/6df4b0eb-816a-4834-95fa-2867f1b19524.png)

Vậy là ở trên mình đã hướng dẫn các bạn từng bước để xây dựng môi trường kubenetes cho deploy microservice. Vì tập trung vào các bước
mà bỏ qua giải thích các kiến thức liên quan. Vì vậy các bạn có câu hỏi gì thì có thể comment bên dưới!

Chúc các bạn thành công !
--------
Tài liệu tham khảo : <br>
https://www.edureka.co/blog/install-kubernetes-on-ubuntu<br>
https://www.gremlin.com/community/tutorials/how-to-create-a-kubernetes-cluster-on-ubuntu-16-04-with-kubeadm-and-weave-net/