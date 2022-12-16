# Giới thiệu
Xin chào các bạn, chúng ta lại tiếp tục với series k8s basic. Các nội dung đã có trong series:

* [Session 1: Tổng quan các thành phần của kubernetes](https://viblo.asia/p/k8s-basic-tong-quan-cac-thanh-phan-cua-kubernetes-aAY4ql7qVPw)
* [Session 2:  Cài đặt môi trường Lab - Phần 1](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-1-3kY4gWdy4Ae)
* [ Session 2:  Cài đặt môi trường Lab - Phần 2](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-2-bXP4W5yYL7G)
* [Session 3: Làm việc với Node trên K8S](https://viblo.asia/p/k8s-basic-lam-viec-voi-node-tren-k8s-7ymJXKQr4kq)
* [Session 4: Kubernetes Pods](https://viblo.asia/p/k8s-basic-kubernetes-pods-5pPLkG3nLRZ)
* [Session 5: Kubernetes Deployment and ReplicaSet](https://viblo.asia/p/k8s-basic-kubernetes-deployments-and-replicaset-obA46Po9LKv)
* [Session 6: Kubernetes Service](https://viblo.asia/p/k8s-basic-kubernetes-services-7ymJXKZa4kq)

**Trong bài hôm nay chúng ta sẽ tìm hiểu thêm một cách public ứng dụng của chúng ta bằng Ingress kết hợp với một external LoadBalancer với ví dụ cụ thể.**

![image.png](https://images.viblo.asia/5ad1d21b-322c-4ac0-a2c5-607ecb4a3ac3.png)

# Tại sao cần dùng Kubernetes Ingress
Trong bài trước về [**Kubernetes Service**](https://viblo.asia/p/k8s-basic-kubernetes-services-7ymJXKZa4kq) chúng ta đã biết 4 loại service type và cách sử dụng chúng.
Trong đó để expose ứng dụng ra bên ngoài thì chỉ có NodePort và LoadBalancer (trên onprem thì 2 loại này coi như 1). 

**Sử dụng NodePort có một số hạn chế:**
- Service được expose hoàn toàn ra bên ngoài 
- Phải sử dụng qua port NodePort (thay vì sử dụng port http/https cho các ứng dụng web thì phải thêm cái đuôi NodePort vào sau domainname --> Nhìn nó kém chuyên nghiệp thật sự :D)
- Số lượng Port sử dụng cho NodePort hạn chế (mặc định range NodePort từ 30000-32767)

**Và Kubernetes Ingress sẽ giúp giải quyết vấn đề nêu trên:**
- Các service ứng dụng sẽ được expose dưới dạng ClusterIP và sau đó được expose ra bên ngoài qua Ingress --> Service thực sự trong suốt với người dùng. Người dùng chỉ thực sự kết nối tới Ingress Controller
- Có thể dùng thêm external LoadBalancer bên ngoài để trỏ tới IngressController --> Có thể sử dụng port http/https để kết nối tới domain tương ứng của service thay vì phải chỉ định thêm NodePort, nhìn nó chuyên nghiệp hơn hẳn
- Không bị hạn chế bởi số lượng Port mà NodePort có thể cung cấp.

# Kubernetes Ingress là gì

Ingress mở và phân luồng các kết nối HTTP và HTTPS từ bên ngoài k8s cluster vào các services bên trong cluster. Việc phân luồng dữ liệu này được quản lý bởi các "rule" được định nghĩa ở các tài nguyên Ingress trên k8s. Việc thực thi phân luồng dữ liệu được thực hiện bởi Ingress Controller, là một opensource cài đặt trên K8S. Nhiệm vụ của Ingress Controller là nạp các thông tin của các Ingress Resource để thực hiện phân luồng.

![image.png](https://images.viblo.asia/db352ad1-da8d-4135-b05d-82199006de9b.png)

## Cơ chế hoạt động của Ingress
Cơ chế hoạt động của Ingress gồm 2 thành phần chính:
- **Ingress Controller**: Là thành phần điều khiển chính làm nhiệm vụ điều hướng các request tới các service bên trong k8s. Thường thì Ingress Controller được cài đặt trên K8S và được expose ra ngoài dưới dạng NodePort.
- **Ingress Rule**: Là một tài nguyên trên K8S. Nó chứa nội dung khai báo rule để điều hướng từ một request tới một service cụ thể trên trong K8S.

**NOTE**: Có nhiều Ingress Controller từ các nhà phát triển khác bạn có thể lựa chọn để cài đặt. Ngoài ra trên k8s cũng hỗ trợ cài đặt nhiều Ingress Controller tùy nhu cầu sử dụng. Trong giới hạn bài viết này mình sẽ chỉ dùng 1 Ingress Controller.

## Cấu trúc của Ingress Resource 
Ingress là một tài nguyên ở mức Namespace trên K8S. Và giống như các tài nguyên khác như Pod, Deployment hay Service, ta có  thể định nghĩa nó bằng cách sử dụng file manifest dạng yaml.

**Ví dụ nội dung một file định nghĩa Ingress như sau:**
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minimal-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx-example
  rules:
  - http:
      paths:
      - path: /testpath
        pathType: Prefix
        backend:
          service:
            name: test
            port:
              number: 80
```
Ý nghĩa của khai báo trên là mọi request tới mà có Path chứa Prefix là **/testpath** thì sẽ được forward tới servcie **test** ở port **80**.














## Ingress Rules
Mỗi HTTP rule sẽ bao gồm các thông tin sau:
- Thông tin host (không bắt buộc). Nếu có khai báo host cụ thể, rule sẽ chỉ apply cho host đó. Nếu host không được khai báo, thì rule được áp dụng cho mọi http đến.
- Danh sách **paths** (ví dụ /testpath như bên trên), mỗi path sẽ có thông tin pathType và một backend (service) tương ứng với port của nó. 
- Một backend là một bộ gồm service và port. HTTP (HTTPS) request mà thỏa mãn điều kiện về host và path sẽ được chuyển tới backend đã khai báo

## Path types
Mỗi cấu hình **path** trong ingress đều yêu cầu phải có **path type** tương ứng. Có 3 loại **path type** đang được k8s support gồm:
- **ImplementationSpecific**
- **Exact**
- **Prefix** 

Về các cấu hình và sử dụng rule của Ingress thì các bạn có thể [**tham khảo thêm ở đây**](https://kubernetes.io/docs/concepts/services-networking/ingress/).

## Ví dụ về một kiến trúc triển khai sử dụng Ingress và LoadBalancer
Thông thường để expose các service của dịch vụ HTTP/HTTPS qua Ingress, người ta sử dụng thêm một External Loadblancer bên ngoài. LB này sẽ làm nhiệm vụ forward request HTTP/HTTPS từ client tới NodePort của Ingress Controller. 

Lúc này Ingress Controller sẽ phân tích domain của request và các Ingress Rule mà nó đang quản lý để forward request tới service tương ứng trên k8s.

**Đây là một ví dụ về kiến trúc triển khai ứng dụng web http/https sử dụng Ingress và Load Balancer:**

![image.png](https://images.viblo.asia/4797c0ea-a6bc-485c-b8cc-eab07518814b.png)

# Hướng dẫn cài đặt Ingress Controller và Load Balancer
Mình đã có hướng dẫn chi tiết cách [***cài đặt Ingress Controller và Load Balancer ở đây***](https://viblo.asia/p/k8s-phan-6-load-balancing-tren-kubernetes-dung-haproxy-va-nginx-ingress-4dbZNRpaZYM), mọi người có thể tham khảo chi tiết. 
Mình đã cài đặt Ingress Controller ready ở namespace **ingress** để sử dụng như sau:
```
[sysadmin@vtq-cicd example]$ kubectl -n ingress get service ingress-nginx-ingress-controller
NAME                               TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-ingress-controller   NodePort   10.233.63.81   <none>        80:30080/TCP,443:30443/TCP   41d
```

**Chi tiết cấu hình NodePort:**
```
ports:
  - name: http
    nodePort: 30080
    port: 80
    protocol: TCP
    targetPort: http
  - name: https
    nodePort: 30443
    port: 443
    protocol: TCP
    targetPort: https
```

Và để Ingress Class mặc định là **nginx**:
```
[sysadmin@vtq-cicd nginx-ingress]$ k get ingressclasses.networking.k8s.io
NAME    CONTROLLER             PARAMETERS   AGE
nginx   k8s.io/ingress-nginx   <none>       41d
```

Load Balancer mình sử dụng là Haproxy và nó sẽ làm nhiệm vụ forward request từ port http/https về NodePort của Ingress Controller Service. Mình đã cài đặt haproxy lên node **viettq-master1** ở IP **192.168.10.11**

**Các bạn có thể tham khảo cấu hình routing trên haproxy như bên dưới:**
```
frontend frontend_ssl_443
        bind :80
        bind *:443 ssl crt /etc/haproxy/ssl/viettq_app.pem
        mode http
        option httpclose
        option forwardfor
        reqadd X-Forwarded-Proto:\ https
        #http-request set-header X-Forwarded-Proto:\ https
        cookie  SRVNAME insert indirect nocache
        default_backend backend_ingress
backend backend_ingress
        mode    http
        stats   enable
        stats   auth username:password
        balance roundrobin
        server  viettq-worker1 192.168.10.14:30080 cookie p1 weight 1 check inter 2000
        server  viettq-worker2 192.168.10.15:30080 cookie p1 weight 1 check inter 2000
        server  viettq-worker3 192.168.10.16:30080 cookie p1 weight 1 check inter 2000
```
Trong đó 192.168.10.14-16 là IP của các Worker Node, 30080 là NodePort http của Ingress Controller. 
NOTE: Ở đây mình dùng Self-Sign Cert và cấu hình SSL Termination ở phía Haproxy, do đó kết nối từ Haproxy về Ingres Controller sẽ dùng http. Còn từ Client --> Haproxy sẽ dùng https.

Các bạn có thể tham khảo cách tạo Self-Sign Cert dùng OpenSSL và cấu hình tích xanh cho nó trên client [***theo hướng dẫn ở đây***](https://viblo.asia/p/k8s-phan-7-huong-dan-tao-tich-xanh-cho-ung-dung-tren-k8s-dung-openssl-djeZ1EP8ZWz).

# Hướng dẫn expose ứng dụng sử dụng Ingress

## Ta sẽ tạo 1 pod ứng dụng và expose nó dưới dạng ClusterIP
Các bạn tạo file manifest **apple.yaml** với thông tin như sau để tạo Pod **apple** và expose ra service **apple-service** dạng ClusterIP:
```
kind: Pod
apiVersion: v1
metadata:
  name: apple-app
  labels:
    app: apple
spec:
  containers:
    - name: apple-app
      image: hashicorp/http-echo
      args:
        - "-text=THIS_IS_APPLE"
---

kind: Service
apiVersion: v1
metadata:
  name: apple-service
spec:
  selector:
    app: apple
  ports:
    - port: 5678 # Default port for image
```
Sau đó apply vào cùng namespace **ingress**:
```
[sysadmin@vtq-cicd example]$ k -n ingress apply -f apple.yaml
pod/apple-app created
service/apple-service created
```

## Tạo ingress rule để kết nối ứng dụng
Các bạn tạo file **apple.ingress.yaml** có nội dung như sau:
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
  name: apple.prod.viettq.com
spec:
  #ingressClassName: nginx
  rules:
  - host: apple.prod.viettq.com
    http:
      paths:
      - backend:
          service:
            name: apple-service
            port:
              number: 5678
        path: /
        pathType: Prefix
```
Ingress bên trên khai báo một rule là các request tới domain **apple.prod.viettq.com/** sẽ được forward tới service **apple-service** ở Port **5678**.

**Ta apply file manifest trên để tạo Ingress trên hệ thống:**
```
[sysadmin@vtq-cicd example]$ k -n ingress apply -f apple.ingress.yaml
ingress.networking.k8s.io/apple.prod.viettq.com created
```

## Kiểm tra truy cập vào ứng dụng
Ta sẽ lần lượt truy cập tới ứng dụng như sau:

### Truy cập qua IP của Pod
Cách truy cập này chỉ thực hiện được từ bên trong k8s, do Pod được cấp IP nội bộ:
```
[sysadmin@viettq-master1 ~]$ k -n ingress get pods -owide
NAME                                               READY   STATUS    RESTARTS   AGE   IP             NODE             NOMINATED NODE   READINESS GATES
apple-app                                          1/1     Running   0          76m   10.233.67.33   viettq-worker3   <none>           <none>
ingress-nginx-ingress-controller-546fb6d5f-cn9dr   1/1     Running   1          41d   10.233.68.7    viettq-worker2   <none>           <none>
[sysadmin@viettq-master1 ~]$ curl 10.233.67.33:5678
THIS_IS_APPLE
```

### Truy cập qua ClusterIP của Service
Cách truy cập này chỉ thực hiện được từ bên trong k8s, do service dạng ClusterIP cũng chỉ được cấp IP nội bộ của K8S:
```
[sysadmin@viettq-master1 ~]$ k -n ingress get svc -owide
NAME                               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE   SELECTOR
apple-service                      ClusterIP   10.233.11.90    <none>        5678/TCP                     41d   app=apple
ingress-nginx-ingress-controller   NodePort    10.233.63.81    <none>        80:30080/TCP,443:30443/TCP   41d   app.kubernetes.io/component=controller,app.kubernetes.io/instance=ingress,app.kubernetes.io/name=nginx-ingress-controller
[sysadmin@viettq-master1 ~]$ curl 10.233.11.90:5678
THIS_IS_APPLE
```

### Truy cập qua Ingress Controller bằng  domainame
2 cách truy cập qua Pod-IP và Service ClusterIP là mặc định trên K8S hỗ trợ. Tuy nhiên thực tế ta sẽ chủ yếu sử dụng qua Ingress.
Ta có thể thực hiện kết nối tới Ingress Controller qua NodePort của service **ingress-nginx-ingress-controller**, đây là service của Ingress Controller mà mình đã cài đặt (tùy cách đặt tên mà trên hệ thống của các bạn có thể sẽ có tên khác).

Cách kết nối này cho phép chúng ta thực hiện từ bên ngoài K8S, sử dụng Node-IP và NodePort của Ingress Controller Service:
```
[sysadmin@vtq-cicd example]$ curl -H "host: apple.prod.viettq.com"  192.168.10.11:30080
THIS_IS_APPLE
```
**Ở đây:** 
- 192.168.10.11: Là IP của K8S Node (master1). Có thể sử dụng IP của Node bất kỳ trong cluster
- 30080: Là http NodePort của service ta đã cài đặt cho Ingress Controller

### Truy cập qua Load Balancer bằng domainname
Như bên trên mình đã cấu hình LB để thực hiện forward request từ LB tới backend là Ingress Controller. Do đó ta có thể kết nối tới ứng dụng thông qua IP của LB ở port http/https như sau.

Với  lab của mình, IP của LB là **192.168.10.11** và port là **80/443**.

**Dùng console:**
```
[sysadmin@vtq-cicd example]$ curl -H "host: apple.prod.viettq.com"  192.168.10.11:80
THIS_IS_APPLE
```

**Dùng web browser:**
![image.png](https://images.viblo.asia/5c48edbb-26db-4ae5-812a-a42497a46849.png)


**Như vậy là các bạn đã có thể truy cập vào ứng dụng của mình thông qua cấu hình Ingress rồi.**