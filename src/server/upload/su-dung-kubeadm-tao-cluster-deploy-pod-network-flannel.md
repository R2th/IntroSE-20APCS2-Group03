## Sử dụng kubeadm tạo cluster
Trước hết có 1 số bài viết có dùng minikube, vậy tại sao mình lại ko dùng `minikube`. Ở series này mình có hẳn server môi trường `production` chứ không phải môi trường `learning, local`.

Đầu tiên chúng ta sẽ khởi tạo master Node bằng kubeadm

**Master Node**
```
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

Tiếp theo chúng ta sẽ chạy câu lệnh sau, follow recommend của `kubeadm init`

```
mkdir -p $HOME/.kube 
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config 
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

**Tại worker Node**

Follow câu lệnh dòng cuối cùng sau khi `kubeadm init` chúng ta sang các worker node copy và chạy câu lệnh tương tự dưới đây.

```
sudo kubeadm join <ip_v4_private>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<chuỗi hash>
```

**Master Node**

chạy câu lệnh sau
```
sudo kubectl get nodes
```

Kết quả:
```
framgia1c.mylabserver.com   NotReady    master   2m   v1.17.0
framgia2c.mylabserver.com   NotReady    <none>   1m   v1.17.0
framgia3c.mylabserver.com   NotReady    <none>   1m   v1.17.0
```

![](https://images.viblo.asia/c9a7aed9-7437-4d2d-8431-5c244e7cb068.png)

## Deploy Pod Network – Flannel

**Vậy pods là gì, pod network là gì ?**

Tất cả các pods đều có địa chỉ IP riêng của nó, chúng ta không thể tạo kết nối giữa chúng. Container được nối với chúng thông qua các port trên Pod network và có quyền kiểm soát như service, load balancing, config của ứng dụng. Pod Network có thể kết nối với tất cả các nodes mà không cần NAT (Network Address Translation)

Tham khảo thêm
https://medium.com/google-cloud/understanding-kubernetes-networking-pods-7117dd28727

**Overlays và Underlays**

Overlays là một phần mềm components tách rời cơ sở hạ tầng vật lý (decouple the physical infrastructure) trong tất cả các network services

Overlays sẽ đóng gói các gói tin và truyền đạt chúng trong routing, Một overlay là một virtual network được serving trên underlay network. Underlays là một cơ sở hạ tầng vật lý hỗ trợ việc kết nối.

**Vậy flannel là gì ?**

*Đầu tiên chúng ta có một định nghĩa: Agents (deamons, kuberlets) là node có thể giao tiếp với tất cả các pods trên node đó.*

Flannel là một virtual network được thiết kế bới chính kubernetes. Mỗi host trong flannel cluster chạy một agent được gọi là `flannelID`. Chúng được cấp phép cho mỗi host một subnet trên địa chỉ IP trên container được chạy mỗi host. Containers có thể giao tiếp với các containers khác thông qua sử dụng địa chỉ IP. Flannel hỗ trợ multiple backend để đóng gói cá gói tin. Về sự lựa chọn thông thường thì là Virtual Extensible LAN  (VXLAN), chúng chạy một layer có 2 network trên một kiến trúc của Layer 3. Flannel cũng hỗ trợ `host-gw`, chúng sẽ map chính xác các routes trong host được dùng bên trong `Calico` được miêu tả thêm ở link dưới.

Tham khảo thêm
https://kubernetes.io/docs/concepts/cluster-administration/networking/#flannel

> Đối với flannel để hoạt động chính xác, bạn phải chạy kubeadm init --pod-network-cidr=10.244.0.0/16 trước đó  .

> Chạy sysctl net.bridge.bridge-nf-call-iptables=1 để chuyển lưu lượng truy cập IPv4 được bắc cầu sang chuỗi iptables. Đây là một yêu cầu để một số plugin CNI hoạt động, để biết thêm thông tin vui lòng xem [tại đây](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/#network-plugin-requirements)  và [tại đây](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)

```
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/2140ac876ef134e0ed5af15c65e414cf26827915/Documentation/kube-flannel.yml
```

Kết quả:
```
framgia1c.mylabserver.com   Ready    master   3m   v1.17.0
framgia2c.mylabserver.com   Ready    <none>   2m   v1.17.0
framgia3c.mylabserver.com   Ready    <none>   2m   v1.17.0
```

## Tiếp theo 

Chúng ta sẽ deploy, tạo service ứng dụng dễ nhất quả đất `nginx`

facebook: facebook.com/quanghung997