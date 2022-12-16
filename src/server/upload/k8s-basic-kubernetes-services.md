# Giới thiệu
Xin chào các bạn, chúng ta lại tiếp tục với series k8s basic để cùng nhau làm quen với k8s. Các nội dung trước chúng ta đã đi qua:

* [Session 1: Tổng quan các thành phần của kubernetes](https://viblo.asia/p/k8s-basic-tong-quan-cac-thanh-phan-cua-kubernetes-aAY4ql7qVPw)
* [Session 2:  Cài đặt môi trường Lab - Phần 1](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-1-3kY4gWdy4Ae)
* [ Session 2:  Cài đặt môi trường Lab - Phần 2](https://viblo.asia/p/k8s-basic-cai-dat-lab-kubernetes-phan-2-bXP4W5yYL7G)
* [Session 3: Làm việc với Node trên K8S](https://viblo.asia/p/k8s-basic-lam-viec-voi-node-tren-k8s-7ymJXKQr4kq)
* [Session 4: Kubernetes Pods](https://viblo.asia/p/k8s-basic-kubernetes-pods-5pPLkG3nLRZ)
* [Session 5: Kubernetes Deployment and ReplicaSet](https://viblo.asia/p/k8s-basic-kubernetes-deployments-and-replicaset-obA46Po9LKv)

**Trong bài hôm nay chúng ta sẽ tìm hiểu cách public ứng dụng của chúng ta bằng Service với các nội dung:**
- Service là gì và các thành phần của nó
- Cơ chế hoạt động của Service
- Các loại Service và cách sử dụng
![image.png](https://images.viblo.asia/59dc0986-dc98-424a-963b-d0f806188363.png)

# Kubernetes Service
Khi triển khai ứng dụng, có thể sử dụng Deployment, StatefulSet hay DaemonSet thì khi đó bạn sẽ đều có một bộ các Pod chạy một ứng dụng. Các Pod này có vai trò như nhau và đều được cấp 1 IP dùng trong K8S. Nghĩa là IP này sẽ chỉ được truy cập từ trong K8S. Tuy nhiên các Pod này có thể được tạo hoặc xóa một cách biến động.

Vậy làm sao để chúng ta có thể sử dụng được dịch vụ từ bên ngoài k8s cũng như xử lý câu chuyện Pod bị thay đổi IP liên tục? Câu trả lời là sử dụng **service**, sẽ giúp chúng ta giải quyết các vấn đề sau:
- Expose dịch vụ ra bên ngoài k8s. Client có thể kết nối trực tiếp tới service qua **NodePort** hoặc qua cấu hình **ingress**
- Service sẽ đóng vai trò LoadBalancer cho các Pod ứng dụng mà service quản lý. Khi các Pod có thay đổi (thêm/bớt hoặc Pod bị xóa và tạo lại) thì ở phía client không cần quan tâm tới IP của Pod. Nó chỉ cần quan tới tới duy nhất đối tượng Service. 

Service là một cách định nghĩa một bộ các Pod và cách thức truy cập vào Pod, thường thông qua cấu hình **selector** của Service. Nó giống như cách ReplicaSet quản lý Pod của nó như ở bài trước vậy.

## Thành phần của service
Service là một tài nguyên của K8S và giống với các tài nguyên khác như Pod hay Deployment.. nó đều có 4 thành phần chính là apiVersion, kind, metadata và spec. Ta xem xét một ví dụ mẫu về **Service**:
```
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

Với khai báo trên, ta đã định nghĩa một **service** có tên **my-service**, và nó sẽ chọn tới Port TCP 9376 trên tất cả những Pod nào trong cùng Namespace của service mà có nhãn là "**app.kubernetes.io/name=MyApp**".

Kubernetes sẽ cấp cho đối tượng service này một IP và sẽ được dùng bởi Service Proxies. 

## Endpoint
Ta đã hiểu rằng Server sẽ scan các Pod thõa mãn các nhãn trong cấu hình **selector** của nó. Vậy khi các Pod có thay đổi thì Service sẽ cập nhật thông tin đó như thế nào?

Lúc này ta sẽ cần biết tới khái niệm mới là EndPoint. Với mỗi Pod mà Service scan được và thỏa mãn điều kiện select của nó, thì Kubernetes sẽ cập nhật đối tượng Endpoint có tên giống với Service và nó sẽ chứa danh sách các IP:Port của các Pod thỏa mãn điều kiện selector của Service

**Ví dụ:**
```
[sysadmin@vtq-cicd demo]$ k -n demo get svc
NAME            TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
myapp-service   LoadBalancer   10.233.27.165   <pending>     5000:31123/TCP   19h
[sysadmin@vtq-cicd demo]$ k -n demo get endpoints
NAME            ENDPOINTS                                                           AGE
myapp-service   10.233.67.93:8080,10.233.67.94:8080,10.233.67.95:8080 + 7 more...   19h
```

## Service không dùng selector
Service thông thường giúp việc kết nối tới Pod thông qua Selector. Nhưng khi không sử dụng Selector, thì service có thể giúp khai báo việc kết nối tới nhiều loại tài nguyên hơn ngoài Pod, thậm chí cả các ứng dụng bên ngoài k8s. Một số usecase có thể sử dụng:
- Khai báo Service để kết nối tới một external Data (ngoài k8s)
- Trỏ service tới một service khác không dùng namespace hoặc thậm chí trên một cluster khác

Ta tham khảo cách khai báo một Service không có Selector như sau:
```
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```
Vì Service này không có định nghĩa Selector, đồng nghĩa với việc nó sẽ không có Pod nào để forward tới hay nó sẽ không có EndPoint nào để kết nối tới cả. Lúc này ta sẽ phải tạo EndPoint cho Service một cách thủ công, ví dụ:
```
apiVersion: v1
kind: Endpoints
metadata:
  # the name here should match the name of the Service
  name: my-service
subsets:
  - addresses:
      - ip: 192.0.2.42
    ports:
      - port: 9376
```
**Lưu ý khi tạo EndPoint thủ công cho Service nào thì tên EndPoint phải trùng với Service ấy.**

Theo ví dụ trên khi kết nối tới Service **my-service** port **9376** thì kết nối sẽ được chuyển tới địa chỉ là **192.0.2.42:9376**

## Multi-Port Service
Đôi khi bạn cần tạo Service để Expose nhiều hơn 1 port. K8S hỗ trợ khai báo nhiều cấu hình Port trong Service.
Ví dụ:
```
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 9376
    - name: https
      protocol: TCP
      port: 443
      targetPort: 9377
```

# Các loại service (service types)
Kubernetes cung cấp cho chúng ta 4 loại Kubernetes service, đó là:
- ClusterIP
- NodePort
- Load Balancer
- ExternalName

![image.png](https://images.viblo.asia/dff1d704-4189-42bd-9f9b-674d7eed62a4.png)

Chúng ta sẽ lần lượt tìm hiểu 4 loại Service Type này nhé!
Trước hết ta sẽ tạo 1 pod đơn để phục các demo ở phía sau manifest file **demo-pod.yaml** như sau:
```
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
    apptype: frontend
spec:
  containers:
  - name: nginx-container
    image: nginx
    ports:
    - containerPort:  80
      name:  http
```
Sau đó tạo Pod ở namespace **demo**:
```
kubectl create ns demo
kubectl -n demo apply -f demo-pod.yaml
```

## ClusterIP
ClusterIP service là loại service mặc định trong Kubernetes. Khi tạo Service dạng này, nó sẽ được cấp 1 IP và sẽ chỉ sử dụng được từ bên trong của k8s.
Ta sẽ khai báo một service dạng ClusterIP với manifest file **service-clusterip.yaml** như sau:
```
apiVersion: v1 
kind: Service 
metadata: 
  name: frontend-service 
spec: 
  type: ClusterIP          #Loại service: ClusterIP
  selector:                #Khai báo rule để lọc các Pod mà service sẽ forward connection tới
    app: my-app
    apptype: frontend 
  ports: 
    - targetPort: 80       #Là port của Pod, service sẽ chuyển tiếp kết nối vào đây
      port: 80             #Là port được mở của Service. Client sẽ kết nối với Service qua port này
```
Rồi chúng ta tạo Service qua lệnh:
```
k -n demo apply -f service-clusterip.yaml
```
Lúc này Service có tên **frontend-service** đã được sinh ra có thông tin như sau:
```
[sysadmin@vtq-cicd demo]$ k -n demo  get svc -owide
NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE     SELECTOR
frontend-service   ClusterIP      10.233.2.148    <none>        80/TCP           5m27s   app=my-app,apptype=frontend
```
Ta có thể kết nối từ trong k8s (từ bất cứ node nào trong k8s) tới IP của service nhưng không thể kết nối từ bên ngoài được.
Mình sẽ đứng từ một master node để kết nối tới service:
```
[sysadmin@viettq-master1 ~]$ kubectl -n demo get svc
NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
frontend-service   ClusterIP      10.233.2.148    <none>        80/TCP           6m56s
[sysadmin@viettq-master1 ~]$ curl 10.233.2.148:80
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

ClusterIP service thường được dùng cho các service mà chỉ dùng cho nội bộ K8S. Còn muốn expose những service này ra bên ngoài k8s thì có thể sử dụng ingress, ta sẽ đề cập ở các nội dung sau.

## NodePort
Service kiểu NodePort là một cách đơn giản nhất để có thể truy cập đến service từ phía bên ngoài k8s. Service NodePort service nó sẽ mở một port cụ thể trên tất cả các node trong cụm và lưu lượng truy cập được gửi đến bất kì node nào trong cụm thông qua port được mở sẽ được chuyển tiếp đến dịch vụ bên trong cụm k8s đó.

NodePort được giới hạn sử dụng trong dải port 3000-32767. Bạn có thể trực tiếp chỉ định port này trong file yaml của mình hoặc để Kubernetes tự động chỉ định nếu bạn không set nó.

Tiếp tục demo, mình sẽ tạo NodePort service từ manifest file **service-nodeport.yaml** như sau:
```
apiVersion: v1 
kind: Service 
metadata:
  name: service-nodeport
spec:   
  type: NodePort           #Loại service: NodePort
  selector:                #Khai báo rule để lọc các Pod mà service sẽ forward connection tới
    app: my-app
    apptype: frontend
  ports: 
    - targetPort: 80       #Là port của Pod, service sẽ chuyển tiếp kết nối vào đây
      port: 80             #Là port được mở của Service. Client sẽ kết nối với Service qua port
      nodePort: 30888      #Port được mở trên tất cả các node để nhận request cho service
```
Ta sẽ tạo và kiểm tra service này như sau:
```
[sysadmin@vtq-cicd demo]$ k -n demo apply -f service-nodeport.yaml
service/service-nodeport created
[sysadmin@vtq-cicd demo]$ k -n demo get svc -owide
NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE   SELECTOR
frontend-service   ClusterIP      10.233.2.148    <none>        80/TCP           14m   app=my-app,apptype=frontend
service-nodeport   NodePort       10.233.51.68    <none>        80:30888/TCP     5s    app=my-app,apptype=frontend
```
Lúc này ta có thể truy cập tới service từ bên ngoài k8s bằng [node-ip]:[node-port]
```
[sysadmin@vtq-cicd demo]$ curl 192.168.10.11:30888
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```
Service NodePort thì vẫn hoạt động nhưng một ClusterIP thông thường, nghĩa là bạn có thể đứng bên trong k8s và kết nối qua ServiceIP:Port các ClusterIP service khác:
```
[sysadmin@viettq-master1 ~]$ kubectl -n demo get svc
NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
frontend-service   ClusterIP      10.233.2.148    <none>        80/TCP           17m
service-nodeport   NodePort       10.233.51.68    <none>        80:30888/TCP     3m7s
[sysadmin@viettq-master1 ~]$ curl 10.233.51.68:80
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

## LoadBalancer
LoadBalancer Service được sử dụng khi chúng ta muốn có một địa chỉ Ip duy nhất sẽ chuyển tiếp tất cả các yêu cầu truy cập đến dịch vụ của bạn. Thông thường thì LoadBalancer Service sẽ được sử dụng nhiều hơn trên môi trường Public Cloud, bởi ở đó các Cloud Provider đã cung cấp cho bạn External Load Balancers còn trên các hệ thống k8s onprem thì mặc định sẽ không có (nếu muốn có các bạn phải tự cài đặt riêng).

Khi chạy trên  k8s-onprem thì cơ bản LoadBalancer Service không khác gì NodePort Service.

Ta sẽ tạo một LoadBalancer Service đơn giản từ file manifest **service-lb.yaml** như sau:
```
apiVersion: v1
kind: Service
metadata:
  name: service-lb
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30999
  selector:
    app: my-app
    apptype: frontend
```
Sau đó tạo service và kiểm tra kết quả:
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo get svc
NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
frontend-service   ClusterIP      10.233.2.148    <none>        80/TCP           33m
service-lb         LoadBalancer   10.233.2.184    <pending>     80:30999/TCP     9s
service-nodeport   NodePort       10.233.51.68    <none>        80:30888/TCP     18m
```
Các bạn có thể thấy cột EXTERNAL-IP của service **service-lb** ở trạng thái pending, do lab này đang build onprem nên sẽ không được cấp external loadbalancer.

Tuy nhiên ta sẽ vẫn kết nối được tới service này như qua NodePort service.

**Kết nối qua service ClusterIP:**
```
[sysadmin@viettq-master1 ~]$ kubectl -n demo get svc
NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
frontend-service   ClusterIP      10.233.2.148    <none>        80/TCP           35m
service-lb         LoadBalancer   10.233.2.184    <pending>     80:30999/TCP     2m9s
service-nodeport   NodePort       10.233.51.68    <none>        80:30888/TCP     20m
[sysadmin@viettq-master1 ~]$ curl 10.233.2.184:80
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```
**Kết nối qua NodePort:**
```
[sysadmin@viettq-master1 ~]$ curl 192.168.10.11:30999
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

## ExternalName
ExternalName Service là một trường hợp đặc biệt, nó không sử dụng selector mà thay vào đó sử dụng một DNS name.
Ta sẽ xem một ví dụ khai báo ExternalName Service như sau:
```
apiVersion: v1
kind: Service
metadata:
  name: my-database-svc
  namespace: prod
spec:
  type: ExternalName
  externalName: my.database.example.com
```
Như vạy khi kết nối tới service **my-database-svc** thì DNS của k8s sẽ trả về một bản ghi để kết nối tới **my.database.example.com**. Loại service này có thể ứng dụng để khai báo kết nối tới các dịch vụ bên ngoài k8s.

## Các expose nhanh một deployment
Chúng ta có thể expose một deployment trực tiếp bằng lệnh kubectl expose. Khi không chỉ định tham số "**--type**" thì mặc định kubernetes sẽ tạo ra ClusterIP service. Ta cùng xem ví dụ sau:

```
[sysadmin@vtq-cicd demo]$ kubectl -n demo expose deployment myapp-deployment --port=80 --target-port=80  --name=svc-clusterip
service/svc-clusterip exposed
[sysadmin@vtq-cicd demo]$ kubectl -n demo describe svc svc-clusterip
Name:              svc-clusterip
Namespace:         demo
Labels:            app=my-app
Annotations:       <none>
Selector:          app=my-app
Type:              ClusterIP
IP Families:       <none>
IP:                10.233.4.197
IPs:               10.233.4.197
Port:              <unset>  80/TCP
TargetPort:        80/TCP
Endpoints:         10.233.67.93:80,10.233.67.94:80,10.233.67.95:80 + 8 more...
Session Affinity:  None
Events:            <none>
```

Để exposer một deployment dưới dạng NodePort Service ta cần chỉ định thêm giá trị "**--type=NodePort**":
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo expose deployment myapp-deployment --type=NodePort --port=80 --target-port=80  --name=svc-nodeport
service/svc-nodeport exposed
[sysadmin@vtq-cicd demo]$ kubectl -n demo describe svc svc-nodeport
Name:                     svc-nodeport
Namespace:                demo
Labels:                   app=my-app
Annotations:              field.cattle.io/publicEndpoints:
                            [{"addresses":["192.168.10.14"],"port":31540,"protocol":"TCP","serviceName":"demo:svc-nodeport","allNodes":true}]
Selector:                 app=my-app
Type:                     NodePort
IP Families:              <none>
IP:                       10.233.36.190
IPs:                      10.233.36.190
Port:                     <unset>  80/TCP
TargetPort:               80/TCP
NodePort:                 <unset>  31540/TCP
Endpoints:                10.233.67.93:80,10.233.67.94:80,10.233.67.95:80 + 8 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

Tương tự để exposer dưới dạng LoadBalancer Service ta cần chỉ định thêm giá trị "**--type=LoadBalancer**":
```
[sysadmin@vtq-cicd demo]$ kubectl -n demo expose deployment myapp-deployment --type=LoadBalancer --port=80 --target-port=80  --name=svc-loadbalancer
service/svc-loadbalancer exposed
[sysadmin@vtq-cicd demo]$ kubectl -n demo describe svc svc-loadbalancer
Name:                     svc-loadbalancer
Namespace:                demo
Labels:                   app=my-app
Annotations:              <none>
Selector:                 app=my-app
Type:                     LoadBalancer
IP Families:              <none>
IP:                       10.233.41.137
IPs:                      10.233.41.137
Port:                     <unset>  80/TCP
TargetPort:               80/TCP
NodePort:                 <unset>  31183/TCP
Endpoints:                10.233.67.93:80,10.233.67.94:80,10.233.67.95:80 + 8 more...
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

***Hy vọng qua bài viết này các bạn đã hiểu hơn về Kubernetes Services và cách cách sử dụng của nó. Trong phần tiếp theo mình sẽ giới thiệu cách expose ứng dụng dùng Ingress. Đây là một cách rất phổ biến và thường được áp dụng nhiều trong thực tế. Mời các bạn đón đọc ở phần sau.***