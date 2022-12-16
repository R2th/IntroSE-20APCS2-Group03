Như các bạn đã biết, NodePort, LoadBalancer và Ingress là các cách thức khác nhau để đưa các request từ bên ngoài vào trong hệ thống cluster của bạn. Trong bài viết này, chúng ta sẽ tìm hiểu cách thực hiện của chúng, và khi nào sử dụng từng loại.
![](https://images.viblo.asia/f4136c15-7795-4e47-b002-3bb37f7ba792.jpg)

# ClusterIP
ClusterIP là service mặc định của Kubernetes. Nó sẽ tạo ra một service trong cluster mà các ứng dụng khác trong cluster đều có thể kết nối. Không có kết nối ngoài.

FIle YAML của một ClusterIP trông giống như thế này:
```yaml
apiVersion: v1
kind: Service
metadata:  
  name: my-internal-service
spec:
  selector:    
    app: my-app
  type: ClusterIP
  ports:  
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP
```

Nếu bạn không thể kết nối với ClusterIP service từ Internet tại sao tôi lại nói về nó? Rõ ràng bạn có thể kết nối nó từ proxy của Kubernetes. 
![](https://images.viblo.asia/1848b937-c615-44d3-b716-e35fad762962.png)

Cách để khởi động 1 Proxy trong Kubernetes:

`$ kubectl proxy --port=8080`
Bây giờ bạn có thể điều hướng các Kubernetes API để sử dụng service này:

`http://localhost:8080/api/v1/proxy/namespaces/<NAMESPACE>/services/<SERVICE-NAME>:<PORT-NAME>`

Do đó để kết nối với service trên ta sử dụng địa chỉ sau:
 
http://localhost:8080/api/v1/proxy/namespaces/default/services/my-internal-service:http/
 
 **Khi nào bạn nên sử dụng ClusterIP?**
    
Có vài trường hợp bạn có thể sử dụng Kubernetes Proxy để kết nối service của bạn :
1. Debug service, hoặc kết nối chúng trực tiếp từ laptop vì một vài lí do nào đó
2. Cho phép các internal traffic, etc

# NodePort
NodePort Service là một trong những cách nguyên thủy nhất đễ kết nối external traffic trực tiếp tới service của bạn. NodePort như cái tên đã ngụ ý, sẽ mở một port trên tất cả các Nodes(VMs), băt cứ traffic nào tới các node này sẽ được chuyển tiếp đến service.

![](https://images.viblo.asia/95d7871b-ba3d-46db-90ed-74ac498a148b.png)

YAML cho 1 NodePort Service trông sẽ như thế này :
```yaml
apiVersion: v1
kind: Service
metadata:  
  name: my-nodeport-service
spec:
  selector:    
    app: my-app
  type: NodePort
  ports:  
  - name: http
    port: 80
    targetPort: 80
    nodePort: 30036
    protocol: TCP
```

Về cơ bản, một NodePort service có 2 điểm khác nhau so với ClusterIP. Đầu tiên đó là "NodePort". Cũng có thêm một trường gọi là **nodePort** chỉ ra port để mở trong node. Nếu bạn không chỉ port cụ thể, nó sẽ lấy ngẫu nhiên 1 port. 

 **Khi nào bạn nên sử dụng NodePort?**
 Có một vài điềm trừ ở phương pháp này:
1.  Bạn chỉ có thể có một service với mỗi port
2.  Bạn chỉ có thể sử dụng port từ 30000–32767
3.  Nếu địa chỉ IP của Node, VM thay đổi, bạn sẽ phải xử lí điều đó. 

Với những lí do đó, mình khuyên các bạn không nên sử dụng phương pháp này trong môi trường production để lấy traffic từ bên ngoài. Nếu bạn chạy một service không luôn có sẵn, phương pháp này sẽ phù hợp cho bạn. Một ví dụ điển hình là các ứng dụng demo, hoặc tạm thời. 

# Load Balancer
Một LoadBalancer Service là cách thức chuẩn đễ expose service với Internet. 
![](https://images.viblo.asia/209c5916-1c6c-4f0b-82ee-d2212085fcb2.png)

Nếu bạn muốn trực tiếp expose một service, đây là phương thức mặc định. Tất các các traffic trên port bạn đã chỉ định sẽ được chuyển tiếp tới service. Sẽ không có filter, routing, etc. Do đó bạn có thể gửi hầu hết các loại traffic đến nó, như HTTP, TCP, UDP, WebSockets, gRPC.

 **Khi nào bạn nên sử dụng LoadBalancer?**
Một điểm trừ lớn đó là mỗi service bạn expose với một LoadBalancer sẽ lấy luốn IP address của nó, và bạn sẽ phải chi trả cho LoadBalancer với mỗi service được exposed. Điều đó rất đắt đỏ. 

# Ingress
Không giống các ví dụ trên, Ingress không thực sự là một loại service. Thay vào đó, nó đứng trước nhiều services, và hoạt động như một smart router hoặc entry point tới cluster của bạn. 

Bạn có thể làm nhiều thứ với Ingress, và có nhiều loại Ingress.

Ví dụ: bạn có thể gửi mọi thứ trên foo.yourdomain.com đến service foo và mọi thứ theo đường dẫn yourdomain.com/bar/ tới service bar.
![](https://images.viblo.asia/4f353428-45a5-45ae-bb0d-e91b0d6bef99.png)


YAML cho 1 Ingress Object có thể như thế này :

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: my-ingress
spec:
  backend:
    serviceName: other
    servicePort: 8080
  rules:
  - host: foo.mydomain.com
    http:
      paths:
      - backend:
          serviceName: foo
          servicePort: 8080
  - host: mydomain.com
    http:
      paths:
      - path: /bar/*
        backend:
          serviceName: bar
          servicePort: 8080
```

 **Khi nào bạn nên sử dụng Ingress?**
 Ingress có lẽ là cách hiệu quả nhất để expose các service của bạn, nhưng cũng có thể là cách phức tạp nhất. Có nhiều loại  controllers Ingress, từ Google Cloud Load Balancer, Nginx, Contour, Istio, v.v. Ngoài ra còn có các plugin dành cho controllers Ingress, như trình quản lý chứng chỉ, có thể tự động cung cấp chứng chỉ SSL cho các dịch vụ của bạn.
Ingress là component hữu ích nhất nếu bạn muốn hiển thị nhiều dịch vụ dưới cùng một địa chỉ IP và các dịch vụ này đều sử dụng cùng một giao thức L7 (thường là HTTP). Bạn chỉ trả tiền cho một load-balancer nếu bạn đang sử dụng tích hợp GCP gốc và bởi vì Ingress “thông minh” nên bạn có thể nhận được rất nhiều tính năng ngay lập tức (như SSL, Auth, Định tuyến, v.v.)


# Tham khảo:
https://medium.com/google-cloud/kubernetes-101-pods-nodes-containers-and-clusters-c1509e409e16

https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0