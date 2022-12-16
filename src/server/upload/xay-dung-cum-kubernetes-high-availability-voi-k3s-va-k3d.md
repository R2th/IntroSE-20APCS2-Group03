# Giới thiệu
Khi bạn là một Dev hoặc Ops làm việc với Kubernetes, có rất nhiều lý do để bạn cần thiết lập môi trường Kubernetes chạy trên một máy cục bộ, có thể là PC, laptop cá nhân,... Như mình đã giới thiệu và chia sẻ ở [bài viết trước](https://viblo.asia/p/kubernetes-review-mot-so-giai-phap-trien-khai-kubernetes-o-local-vyDZO6yQKwj), có khá nhiều giải pháp cho vấn đề này. 

Thế nhưng, để đáp ứng được nhu cầu xây dựng môi trường thử nghiệm và phát triển gần với môi trường production nhất, bạn đã bao giờ muốn thiết lập một chế độ cụm khả dụng cao (High Availability) của Kubernetes trong khi bạn lại không có 3 node dự phòng tối thiểu hoặc không có đủ thời gian hay tài nguyên cần thiết để thiết lập các máy ảo chưa? 

Để thực hiện được mục đích này, mình xin giới thiếu đến các bạn một công cụ nữa là K3D, sự kết hợp giữa K3D và K3S sẽ đem lại một phương pháp khá đơn giản, dễ dàng để thiết lập một cụm Kubernetes nhiều node với tính khả dụng cao, hoàn hảo cho dev và test. Trong bài viết này, mình sẽ hướng dẫn các bạn cách sử dụng K3D + K3S xây dựng một cụm Kubernetes như vậy.
![](https://images.viblo.asia/5683410b-c8e4-447e-b8d7-a536df7a1535.png)

# K3D/K3S?
Trước hết, chúng ta cùng giới thiệu qua một chút vể K3D và K3S nhé!
### K3S
K3S là bản phân phối Kubernetes nhẹ, dễ vận hành, được phát triển bởi Rancher Labs. K3S được thiết kế cho các môi trường có tài nguyên thấp, có thể chạy trên cơ sở hạ tầng x86 và ARM mà không cần sử dụng bộ nhớ hơn 512 MB. 

Gần đây K3S cũng đã tham gia Cloud Native Computing Foundation (CNCF) và trở thành một [Sandbox projects](https://www.cncf.io/sandbox-projects/) với tư cách là Kubernetes Distribution đầu tiên ( điều này đã làm dấy lên nhiều tranh luận về việc liệu K3S có nên là một dự án con của Kubernetes hay không ). Mình cũng đã từng có một bài viết riêng giới thiệu và hướng dẫn sử dụng K3S, các bạn có thể tham khảo thêm chi tiết về K3S tại [đây](https://viblo.asia/p/k3s-la-gi-cai-dat-mot-cum-kubernetes-cluster-voi-k3s-gAm5yD7Xldb).

### K3D
[K3D](https://k3d.io/v4.4.8/) là một tiện ích được thiết kế để dễ dàng chạy k3s trong Docker, nó cung cấp một CLI đơn giản để tạo, chạy, xóa một cụm Kubernetes tuân thủ đầy đủ quy chuẩn công nghệ với 1 đến n node.

K3D sử dụng Docker image được lấy từ K3s repository để tạo ra nhiều node K3s chạy trong container Docker trên bất kỳ máy nào đã cài đặt Docker. Bằng cách đó, một máy vật lý (hoặc máy ảo) duy nhất (chúng ta hãy gọi nó là Máy chủ Docker) có thể chạy nhiều cụm K3s, với nhiều master node và agent node chạy đồng thời.

# Cài đặt và xây dựng cụm Kubernetes.
### Điều kiện tiên quyết
Bạn có thể cài đặt K3D + K3S trên cả Linux, MacOS, Windows. Ngoài ra bạn cũng cần Docker và cli kubectl.
- [Docker](https://docs.docker.com/get-docker/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

### Cài đặt K3D
K3D có thể được cài đặt rất dễ dàng và có sẵn thông qua nhiều [trình cài đặt](https://k3d.io/v4.4.8/#installation) như wget, curl, Homebrew, Aur,... và hỗ trợ nhiều các hệ điều hành phổ biến (Linux, Darwin, Windows, MacOs) và kiến trúc bộ vi xử lý (386, amd64).

Trong hướng dẫn này, mình đang sử dụng Ubuntu 20.04 và sẽ sử dụng `curl` để cài đặt K3D:
```
curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
```

Sau khi cài đặt hoàn tất, bạn có thể kiếm tra lại version đã cài đặt:
```
➜  ~ k3d --version
k3d version v4.4.3
k3s version latest (default)
```

Ngoài ra, bạn cũng có thể xem các lệnh được sử dụng với k3d bằng `k3d --help`

### Xây dựng cụm một node đơn giản
- Trước khi bắt đầu với một cụm nhiều node, chúng ta hãy bắt đầu với một cụm single node đơn giản, không thêm tuỳ chọn, để xem những gì K3D sẽ triển khai K3S theo mặc định nhé.

```
➜  ~ k3d cluster create
INFO[0000] Prep: Network                                
INFO[0000] Created network 'k3d-k3s-default' (4d2a146e22de5c468498be130e5af28c3ab3f8fd90778724c65e7b5f03fde9c1) 
INFO[0000] Created volume 'k3d-k3s-default-images'      
INFO[0001] Creating node 'k3d-k3s-default-server-0'     
INFO[0001] Creating LoadBalancer 'k3d-k3s-default-serverlb' 
INFO[0001] Starting cluster 'k3s-default'               
INFO[0001] Starting servers...                          
INFO[0001] Starting Node 'k3d-k3s-default-server-0'     
INFO[0005] Starting agents...                           
INFO[0005] Starting helpers...                          
INFO[0005] Starting Node 'k3d-k3s-default-serverlb'     
INFO[0005] (Optional) Trying to get IP of the docker host and inject it into the cluster as 'host.k3d.internal' for easy access 
INFO[0007] Successfully added host record to /etc/hosts in 2/2 nodes 
INFO[0007] Cluster 'k3s-default' created successfully!  
INFO[0007] --kubeconfig-update-default=false --> sets --kubeconfig-switch-context=false 
INFO[0007] You can now use it like this:                
kubectl config use-context k3d-k3s-default
kubectl cluster-info
```

Bạn có thể liệt kê các cụm đã tạo với:
```
➜  ~ k3d cluster list       
NAME          SERVERS   AGENTS   LOADBALANCER
k3s-default   1/1       0/0      true
```

Bây giờ, chúng ta có thể thấy một cụm được tạo với tên mặc định k3s-default. Theo mặc định, lệnh tạo cụm `k3d cluster create` cũng sẽ định cấu hình kube config file trong  `~ /.kube/config` và lệnh `docker ps` sẽ cho thấy các container được tạo ra bởi lệnh tạo cụm.
```
➜  ~ docker ps
CONTAINER ID   IMAGE                      COMMAND                  CREATED         STATUS          PORTS                                                                                                    NAMES
c4debe8400a7   rancher/k3d-proxy:v4.4.3   "/bin/sh -c nginx-pr…"   8 minutes ago   Up 8 minutes    80/tcp, 0.0.0.0:59051->6443/tcp                                                                          k3d-k3s-default-serverlb
ad1c3cc6c083   rancher/k3s:latest         "/bin/k3s server --t…"   8 minutes ago   Up 8 minutes   
```

Sau đó, bạn có thể sử dụng `kubectl command` để thực hiện một số kiểm tra cơ bản với cụm Kubernetes single node bạn vừa tạo được, chẳng hạn như:
```
kubectl get all --all-namespaces
```

Để xoá một cụm K3s, bạn cũng chỉ cần thực hiện một lệnh đơn giản, cụm đã được xoá và các tài nguyên đã tạo đều được dọn dẹp:
```
➜  ~ k3d cluster delete k3s-default 
INFO[0000] Deleting cluster ‘k3s-default’ 
INFO[0000] Deleted k3d-k3s-default-serverlb 
INFO[0001] Deleted k3d-k3s-default-server-0 
INFO[0001] Deleting cluster network ‘k3d-k3s-default’ 
INFO[0001] Deleting image volume ‘k3d-k3s-default-images’ 
INFO[0001] Removing cluster details from default kubeconfig… 
INFO[0001] Removing standalone kubeconfig file (if there is one)… 
INFO[0001] Successfully deleted cluster k3s-default!
```

- Tiếp theo, chúng ta sẽ tạo một cụm một node duy nhất với một số tuỳ chọn thêm vào như sau:
    + Tên cụm được đặt là k3s-dev
    + Mapping port 8080 ở máy local với port 80 của container loadbalancer (có nhiệm vụ phân phối lưu lượng truy cập đến port 80 trên tất cả các agent node)
    + Mapping port 8443 ở máy local với port 443 của container loadbalancer (có nhiệm vụ phân phối lưu lượng truy cập đến port 443 trên tất cả các agent node)
```
k3d cluster create k3s-dev --port 8080:80@loadbalancer --port 8443:443@loadbalancer
```

Để kiểm tra triển khai cụm vừa cài đặt, ta sẽ triển khai một ứng dụng nginx đơn giản:
```
➜  ~ kubectl create deployment nginx --image=nginx

deployment.apps/nginx created

➜  ~ kubectl create service clusterip nginx --tcp=80:80

service/nginx created
```

Sử dụng ingress để có thể truy cập dịch vụ từ phía bên ngoài cụm:
```
➜  ~ cat <<EOF | kubectl apply -f -
 apiVersion: networking.k8s.io/v1beta1
 kind: Ingress
 metadata:
   name: nginx
   annotations:
     ingress.kubernetes.io/ssl-redirect: "false"
 spec:
   rules:
   - http:
       paths:
       - path: /
         backend:
           serviceName: nginx
           servicePort: 80
 EOF

ingress.networking.k8s.io/nginx created
```

Vậy là, bạn đã có thể truy cập ứng dụng nginx từ máy cục bộ của mình với http://localhost:8080

### Xây dựng cụm nhiều node
 Sau khi đã thực hiện triển khai với một node duy nhất, chúng ta đã hiểu rõ hơn về các lệnh cũng như cách K3D triển khai cá tài nguyên cụm K3S rồi. Bây giờ, hãy triển khai một cụm Kubernetes nhiều node, có tính khả dụng cao nào! Mình sẽ triển khai một cụm với một vài tuỳ chọn mình muốn như sau:
 - Tên cụm: k3s-rancher
 - Cụm gồm có 1 node master và 3 node agent
 - Mapping port 8080 ở máy local với port 80 của container loadbalancer
 - Mapping port 8443 ở máy local với port 443 của container loadbalancer
 - Mapping port 6443 ở máy local với port 6443 của container loadbalancer để loadbalancer sẽ là điểm truy cập API Kubernetes duy nhất, loadbalancer sẽ là nơi xử lý các yêu cầu truy cập API Kubernetes đến node master thích hợp (trong trường hợp bạn muốn có nhiều hơn một node master).
 - Thêm tuỳ chọn `disable traefik`. Theo mặc định, K3S sẽ sử dụng Traefik là trình điều khiển Ingress. Trong cụm của mình, mình không muốn dùng traefik mà thay vào đó là một Ingress Controller khác, có thể là Nginx Ingress Controller mà mình sẽ cài đặt sau này, vậy nên mình sẽ tắt nó đi thông qua tuỳ chọn `--k3s-server-arg`

Ngoài ra còn có rất nhiều tuỳ chọn tạo cụm khác mà bạn có thể sử dụng tuỳ theo nhu cầu của mình, bạn có thể xem thêm tại [đây](https://k3d.io/v4.4.8/usage/commands/k3d_cluster_create/).

```
➜  ~ k3d cluster create k3s-rancher --port 8080:80@loadbalancer \
--port 8443:443@loadbalancer --api-port 6443 \
--servers 1 --agents 3 \
--k3s-server-arg '--no-deploy=traefik'
```

Sau đó, mình có thể xác nhận các node đã tạo thông qua:
```
➜  ~ k3d node list
NAME                       ROLE           CLUSTER       STATUS
k3d-k3s-rancher-agent-0    agent          k3s-rancher   running
k3d-k3s-rancher-agent-1    agent          k3s-rancher   running
k3d-k3s-rancher-agent-2    agent          k3s-rancher   running
k3d-k3s-rancher-server-0   server         k3s-rancher   running
k3d-k3s-rancher-serverlb   loadbalancer   k3s-rancher   running
```

Xác minh thông tin cụm và chi tiết từng node:
```
➜  ~ kubectl cluster-info
Kubernetes control plane is running at https://0.0.0.0:6443
CoreDNS is running at https://0.0.0.0:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
Metrics-server is running at https://0.0.0.0:6443/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
➜  ~ kubectl get nodes
NAME                       STATUS   ROLES                  AGE   VERSION
k3d-k3s-rancher-server-0   Ready    control-plane,master   9d    v1.20.10+k3s1
k3d-k3s-rancher-agent-1    Ready    <none>                 9d    v1.20.10+k3s1
k3d-k3s-rancher-agent-2    Ready    <none>                 9d    v1.20.10+k3s1
k3d-k3s-rancher-agent-0    Ready    <none>                 9d    v1.20.10+k3s1
```
# Tạm kết
Có thể nói, K3D đã giúp ích rất nhiều về mặt quản lý cụm K3S, cung cấp một cách xây dựng cụm Kubernetes nhanh chóng, nhỏ, không tốn nhiều chi phí. Nó còn tạo ra một bộ cân bằng tải theo mặc định cho phép kết nối lâu dài với cụm K3S trong khi trừu tượng hóa tất cả các tác vụ mà bạn sẽ phải thực hiện theo cách thủ công nếu nó được triển khai bên ngoài container. 

Trong bài đăng này, mình đã hướng dẫn các bạn cơ bản về cách sử dụng của K3S kết hợp cùng K3S để tạo và quản cụm Kubernetes khả dụng, chúng ta đã thấy việc thiết lập các cụm có tính khả dụng cao bằng K3D dễ dàng như thế nào. Hy vọng các bạn sẽ có thêm được một phương pháp hay nữa khi làm việc với Kubernetes. Cảm ơn các bạn đã theo dõi bài viết của mình! :-* :-*

# Reference
- https://k3d.io/v4.4.8/#installation
- https://en.sokube.ch/post/k3s-k3d-k8s-a-new-perfect-match-for-dev-and-test-1