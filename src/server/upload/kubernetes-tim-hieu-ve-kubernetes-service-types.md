Như chúng ta đã biết, **Service** là một trong những khái niệm cốt lõi của Kubernetes. **Kubernetes service** là một tài nguyên xác định ra một pod hoặc một nhóm các pod cung cấp cùng một dịch vụ và chính sách truy cập đến các pod đó. Đối với service, Kubernetes cũng cung cấp cho chúng ta nhiều kiểu service khác nhau để phù hợp với nhiều yêu cầu khác nhau. Vì vậy, trong phạm vi bài viết này, mình sẽ cùng các bạn tìm hiểu chi tiết về các loại service khác nhau được cung cấp trong Kubernetes, sự khác biệt giữa chúng cũng như những lưu ý khi sử dụng chúng nhé. 

# Kubernetes service types
Hiện tại, Kubernetes cung cấp cho chúng ta 4 loại Kubernetes service, đó là:
- ClusterIP
-  NodePort
-  Load Balancer
-  ExternalName
![](https://images.viblo.asia/6e9d8522-9e16-445c-890c-03e52bc561f5.png)

### ClusterIP
ClusterIP service là loại service mặc định trong Kubernetes. Service loại ClusterIP này sẽ có thể được truy cập bởi các ứng dụng khác chỉ khi các ứng dụng đó cũng nằm trong cụm của bạn. Các ứng dụng bên ngoài cụm sẽ không thể truy cập đến service.

Bây giờ chúng ta sẽ cùng xem xét một ví dụ. Trước khi tạo một service, chúng ta sẽ tạo một pod đơn giản với manifest file `example-pod.yaml` như sau:
```
apiVersion: v1 
kind: Pod 
metadata: 
  name: myapp-pod 
  labels: 
    app: myapp 
    type: front-end
spec: 
  containers: 
    - name: nginx-container 
      image: nginx
```
Và sau đó tạo một pod với lệnh: `kubectl create -f example-pod.yaml`. Chúng ta sẽ thấy một pod được tạo ra chỉ đơn giản với 1 container là Nginx web server.  Pod cũng được thêm các label là *app: myapp* và *type: front-end*. Tiếp đến chúng ta sẽ tạo một service loại ClusterIP với manifest file `example-service-clusterip.yaml` như sau:

```
apiVersion: v1 
kind: Service 
metadata: 
  name: front-end-service 
spec: 
  type: ClusterIP 
  selector: 
    app: myapp 
    type: front-end 
  ports: 
    - targetPort: 80
      port: 80
```

Loại service ở đây được chỉ định là ClusterIP. Tuy nhiên, nếu bạn không chỉ định thì loại service mặc định được tạo vẫn sẽ là ClusterIP. Service trên cũng sử dụng `selector` để liên kết service với pod vừa được tạo thông qua các `label`. Ngoài ra, ta còn có **targetPort** và **port**:
- **targetPort:** là cổng trên pod, nơi máy chủ web thực đang chạy, service sẽ chuyển tiếp lưu lượng truy cập đến cổng này. Nếu không có cổng nào được chỉ định, nó sẽ mặc định là 80.
- **port:** là port được mở của chính service. cũng giống như tất cả các đối tượng Kubernetes khác, service cũng là một máy chủ ảo trong node, nó cũng sẽ có địa chỉ ip riêng và port là nơi tiếp nhận kết nối đến dịch vụ. Giá trị này là bắt buộc.

Bây giờ, sau khi tạo service qua lệnh: `kubectl create -f example-service-clusterip.yml`. Chúng ta có thể kiểm tra service  vừa được tạo.

```
➜  ~ kubectl get service                             
NAME                TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
kubernetes          ClusterIP   10.43.0.1      <none>        443/TCP   39d
front-end-service   ClusterIP   10.43.92.184   <none>        80/TCP    10s
```

Chúng ta có thể thấy rằng ngoài service Kubernetes mặc định, một service ClusterIP mới tên *front-end-service* được tạo với một địa chỉ IP. Tên của service có thể được các pod khác trong cụm sử dụng để truy cập nó. Ngoài ra thì bạn cũng không thể truy cập đến pod từ bên ngoài cụm.

### NodePort
Service kiểu NodePort là một cách đơn giản nhất để có thể truy cập đến service của bạn từ phía bên ngoài cụm. Mình cũng hay sử dụng nó cho mục đích gỡ lỗi, khi mình muốn có thể dễ dàng kiểm tra dịch vụ của mình từ phía bên ngoài cụm. Service NodePort, giống như tên của nó, nó sẽ mở một port cụ thể trên tất cả các node trong cụm và lưu lượng truy cập được gửi đến bất kì node nào trong cụm thông qua port được mở sẽ được chuyển tiếp đến dịch vụ bên trong cụm.

Phạm vi của các port được mở cho service NodePort nằm trong khoảng 30000-32767. Bạn có thể trực tiếp chỉ định port này trong file yaml của mình hoặc để Kubernetes tự động chỉ định.  Tiếp tục với ví dụ ở trên, mình sẽ tạo một service NodePort để có thể truy cập đến pod đã tạo.

Ta có file `example-service-nodeport.yml` như sau:

```
apiVersion: v1 
kind: Service 
metadata:
  name: myapp-service 
spec: 
  type: NodePort 
  selector: 
    app: myapp 
    type: front-end 
  ports: 
    - targetPort: 80 
      port: 80 
      nodePort: 32593
```

Ở đây bên cạnh **targetPort** và **port** tương tự service ClusterIP, ta có thêm giá trị **nodePort**. Đây chính là cổng được mở trên node và tiếp nhận các lưu lượng truy cập đến từ bên ngoài cụm và chuyển tiếp đến service bên trong cụm. Trong nội bộ service NodePort vẫn hoạt động như service ClusterIP.

Sau khi tạo service, chúng ta hãy kiểm tra lại:
```
➜  ~ kubectl get service
NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.43.0.1      <none>        443/TCP        39d
myapp-service   NodePort    10.43.221.31   <none>        80:32593/TCP   16s
```

Bây giờ chúng ta kiểm tra kết nối từ mạng bên ngoài đến service bên trong cụm nhé. Đầu tiên, mình sẽ kiểm tra xem có đúng port 32593 được mở trên node của cụm hay không:
```
➜  ~ netstat -lntu | grep 32593
tcp        0      0 0.0.0.0:32593           0.0.0.0:*               LISTEN
```

Tiếp đến, mình sẽ sử dụng lệnh curl để kiểm tra với ip của node và cổng 32593:
```
➜  ~ curl 192.168.64.1:32593
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
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

Vậy là chúng ta đã nhận lại được phản hồi từ phía web server phải không nào :)))

- ***Một vài lưu ý nho nhỏ khi sử dụng service NodePort***

Loại service này tuy là một cách rất thuận tiện để bạn có thể dễ dàng truy cập ứng dụng bên trong cụm của bạn từ mạng bên ngoài, thế nhưng có một số điểm cần lưu ý như là: bạn chỉ có thể sử dụng một dịch vụ cho mỗi cổng, số cổng cũng phải nằm trong phạm vi 30000–32767, địa chỉ ip node cụm của bạn cũng có thể thay đổi và bạn có thể sẽ cần có cách giải quyết cho những vấn đề này khi sử dụng. Bởi vậy, theo mình thì các bạn chỉ nên sử dụng service NodePort trong những trường hợp thử nghiệm tạm thời, gỡ lỗi dịch vụ mà không nên sử dụng trên môi trường production.

### LoadBalancer
Service LoadBalancer được sử dụng khi chúng ta muốn có một địa chỉ Ip duy nhất sẽ chuyển tiếp tất cả các yêu cầu truy cập đến dịch vụ của bạn (cân bằng tải). Để thực hiện được điều này, tất cả những gì service LoadBalancer làm là nó sẽ tạo ra service NodePort. Cùng với đó, nó sẽ gửi một thông báo tới nhà cung cấp lưu trữ cụm Kubernetes yêu cầu loadbalancer được thiết lập trỏ đến tất cả các node IP bên ngoài và nodePort cụ thể. Điều này cũng có nghĩa là, service LoadBalancer sẽ khả dụng khi nhà cung cấp lưu trữ cụm Kubernetes của bạn có hỗ trợ thiết lập bộ cân bằng tải bên ngoài (external load balancers), nếu không thì không có gì xảy ra và LoadBalancer sẽ tương tự như NodePort.

Để xác định một service LoadBalancer, ta có một file `example-service-loadbalancer.yml` đơn giản như sau:
```
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 9376
      nodePort: 31000
  selector:
    app: myapp
```

Sau khi bạn tạo một service LoadBalancer, bạn có thể sẽ thấy:
```
➜  ~ kubectl get service
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP      10.43.0.1      <none>        443/TCP        39d
my-service   LoadBalancer   10.43.137.12   <pending>     80:31000/TCP   12s
```

Bạn có thể thấy, bởi vì mình đang thực hiện ví dụ này trên một cụm K3s single node và không có hỗ trợ thiết lập bộ cân bằng tải bên ngoài, nên **EXTERNAL-IP** luôn ở trạng thái **\<pending>** . Tuy nhiên, trong thực tế, địa chỉ IP sẽ được tạo và chúng ta có thể dử dụng để truy cập dịch vụ. Còn ở đây, địa chỉ IP không được tạo thì bạn vẫn có thể truy cập đến service tương tự như là servicer NodePort ở trên mà thôi :D

Service LoadBalancer là một cách tiêu chuẩn để truy cập rộng rãi dịch vụ của bạn trên internet. Tất cả traffic trên port bạn chỉ định sẽ được chuyển tiếp đến service trong kuberentes, không có filtering, không có routing,... Điều này có nghĩa là bạn có thể gửi hầu hết mọi loại lưu lượng đến nó, như HTTP, TCP, UDP, Websockets, gRPC,... hoặc bất cứ thứ gì. Tuy nhiên, nhược điểm lớn nhất của service này là nó gần như chỉ khả dụng với các nhà cung cấp lưu trữ cụm Kubernetes là các nền tảng Cloud. Trên các nền tảng này, bạn phải trả phí cho việc sử dụng load blancer cho các dịch vụ của mình, bạn chỉ có một ip cho mỗi dịch vụ và nó sẽ có chi phí không hề rẻ chút nào :D

### ExternalName
Và cuối cùng là service ExternalName, đây là loại service có cơ chế tách biệt một chút so với 3 loại service phía trên. Loại service này không sử dụng selectors mà thay vào đó lại sử dụng tên DNS. Nó ánh xạ một service với một tên DNS là nội dung của trường `externalName` (Ví dụ: app.test.com). Khi bạn muốn truy cập vào tên service đó, thay vì trả về cluster-ip của service này, nó sẽ trả về bản ghi CNAME với giá trị được đề cập trong `externalName`

Mình có một ví dụ về một service ExternalName ánh xạ tới tên miền `google.com` như sau:

```
apiVersion: v1
kind: Service
metadata:
  name: "google-service"
spec:
  ports:
    - port: 80
  type: ExternalName
  externalName: google.com
```

Kiểm tra sau khi service được tạo:
```
➜  ~ kubectl get service                 
NAME             TYPE           CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes       ClusterIP      10.43.0.1    <none>        443/TCP   39d
google-service   ExternalName   <none>       google.com    80/TCP    37s
```

Và để kiểm tra xem nó hoạt động như thế nào, mình sẽ truy cập vào pod đã tạo ban đầu, sử dụng lệnh `dig` để kiểm tra.

```
➜  ~ kubectl exec -it myapp-pod -- bash
root@myapp-pod:/# dig google-service.default.svc.cluster.local +short
google.com.
142.250.66.142
root@myapp-pod:/# 
```

Ở đây, mình đang yêu cầu tên DNS local của service *google-service*, tên này đã được phân giải thành địa chỉ ip của tên miền *google.com* được đặt trong trường `externalName`.

# Tạm kết
Như vậy, mình vừa giới thiệu đến các bạn 4 loại Service được cung cấp trong Kubernets. Hy vọng, qua bài viết này, các bạn sẽ nắm được chi tiết về từng loại service và sử dụng chúng cho nhu cầu của mình một cách phù hợp. Cảm ơn các bạn đã theo dõi bài viết của mình và mong rằng các bạn sẽ tiếp tục ủng hộ những bài viết tiếp theo của mình nhé!
# Nguồn tham khảo
- https://kubernetes.io/docs/concepts/services-networking/service/
- https://kubernetes.io/docs/tutorials/services/source-ip/