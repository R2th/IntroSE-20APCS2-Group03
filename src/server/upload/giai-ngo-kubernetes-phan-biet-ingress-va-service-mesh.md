# Lời đầu
Networking trong Kubernetes là một chủ đề khá khó nhằn. Nó đã khiến mình bao phen phải vò đầu bứt tai, không chỉ vì tầng tầng lớp lớp các kiểu kết nối cần thiết lập (kết nối giữa các node trong cluster, kết nối giữa các control plane, giữa các service, các pod, ... ) mà còn là do đống thuật ngữ khó hiểu, dễ gây nhầm lẫn: Load balancer, Ingress, service mesh, ... 

Việc nắm rõ các thuật ngữ này sẽ giúp bạn tiết kiệm khá nhiều thời gian khi tìm hiểu về hệ thống, từ đó có thể lựa chọn được giải pháp hợp lý cho từng vấn đề gặp phải. 

Trong bài viết này mình muốn chia sẽ với mọi người về **Ingress** với **Service Mesh** (đây là hai khái niệm rất hay bị nhầm lẫn), cũng như cách sử dụng chúng ra sao trong hệ thống Kubernetes.

So, let's go!
# Phân biệt Ingress với Service mesh

## Ingress

Trước khi tìm hiểu về Ingress, ta cần biết về Load balancer trước đã.

### Load balancer

Đối với các website có lưu lượng truy cập lớn, việc chạy ứng dụng trên một server là điều không tưởng do giới hạn về băng thông, tài nguyên, cũng như khả năng xử lý đồng thời các tác vụ. 

Giải pháp cho trường hợp này là triển khai ứng dụng trên nhiều server, và điều phối request tới các server này thông qua một công cụ load balancing (load balancer).

> Load balancing là một thuật ngữ chỉ việc phân tán network traffic, request tới các server nhằm đảm bảo hiệu năng cho hệ thống.

![](https://images.viblo.asia/ac37db10-76be-471b-a6bf-78a8386f394a.png)

Như ví dụ ở trên, request sẽ được phân chia cho 3 server xử lý, tận dụng được tài nguyên của cả 3 server. 

***Cần lưu ý là LB chỉ điều phối request được cho một ứng dụng (ứng dụng này được nhân bản, chạy trên nhiều server).***

Trong trường hợp hệ thống có nhiều ứng dụng, hoặc ứng dụng có dạng microservices, ta có thể nghĩ đến việc sử dụng nhiều load balancer, như kiểu:

![](https://images.viblo.asia/c6ff13c1-159f-4022-b954-70bfe548d3b1.png)

Tuy nhiên cách này có một vài vấn đề:

* Chi chí cao, nhất là khi bạn sử dụng LB của cloud provider như AWS, GCP, ...
* Khó quản lý nhiều LB

Và đó là lý do mà Ingress ra đời.

### Kubernetes Ingress là gì?

> Kubernetes Ingress là một *giải pháp* để quản lý, điều phối các truy cập (đa phần là HTTP, HTTPS) từ bên ngoài vào các services trong cụm kubernetes.

Ingress gồm 2 thành phần chính:

* Ingress Resource: định nghĩa các routing rule. Rule này dựa vào đặc tính của request gửi đến và quyết định request sẽ được điều phối tới service nào.

Ví dụ về một path-based routing rule:

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
      - path: /app1
        pathType: Prefix
        backend:
          service:
            name: app1
            port:
              number: 80
```


* Ingress Controller: đây là thành phần cốt lõi của Ingress, có chức năng hiện thực hóa các rule được định nghĩa trong Ingress Resource. Nếu không có Ingress Controller, các rule bạn định nghĩa với Ingress Resource không có tác dụng. Ingress Controller không có sẵn trong bộ cài Kubernetes, nên bạn cần tự cài đặt phần mềm của bên thứ ba (Xem danh sách các phần mềm implement Ingress Controller tại [đây](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)).

Trả lời cho câu hỏi phía trên, Ingress khắc phục nhược điểm của Load Balancer kiểu gì? Với Ingress Resource, ta có thể định nghĩa được route rules tới hàng loạt các app|service, thay vì phải sử dụng nhiều Load Balancer.

![](https://images.viblo.asia/4c9c4669-3bd8-421b-9549-1ac027bdb5b9.png)

## Service mesh

Hiểu nôm na, nếu Ingress là giải pháp điều phối kết nối từ bên ngoài vào trong cụm kubernetes, thì Service mesh là giải pháp để giao tiếp nội bộ giữa các thành phần trong cụm kubernetes.

Trong k8s có hai cách thức chính để các ứng dụng có thể giao tiếp với nhau:

- Pod to Pod: các pod trao đổi trực tiếp với nhau. Cách làm này không được khuyến khích, do mỗi lần pod restart, nó sẽ được gán IP mới
dẫn đến việc mất kết nối tới các pod khác.

- Service: pod trao đổi với nhau thông qua Service. Service là đối tượng chỉ mất đi khi bạn chủ ý xóa, nó vẫn sẽ giữ được kết nối tới pod nếu pod
restart (với label/selector).

Vấn đề nằm ở chỗ, cả hai kiểu giao tiếp này đều không được mã hóa, gây nguy cơ mất an toàn thông tin cho hệ thống. Giải pháp cho vấn đề này
chính là Service mesh.

> Service mesh là một *giải pháp* tăng cường khả năng giao tiếp giữa các thành phần trong hệ thống, cụ thể ở đây là các service trong cụm kubernetes. 

Kubernetes service mesh cung cấp các chức năng chính:

- Kết nối các service trong cụm kubernetes
- Mã hóa gói tin liên lạc
- Theo dõi, quan sát việc giao tiếp giữa các service, từ đó người dùng có thể troubleshoot, maintain hoặc đưa ra quyết định tối ưu hệ thống.

Để làm được đều này thì service mesh cần có cấu trúc khá đặc biệt:

![Service mesh.png](https://images.viblo.asia/a17ccda0-cccb-4a12-8ef1-97e25b74822a.png)

Nó gồm hai thành phần chính:

* Proxy: với mỗi service của Kubernetes, một proxy tương ứng sẽ được tạo ra, proxy này có thể can thiệp tất cả các request vào/ra service (encrypt, decrypt message, thêm request header, forward request, drop request, ...). Đây chính là cách thức để Service mesh thiết lập kết nối bảo mật và mã hóa gói tin truyền đạt giữa các service trong cụm kubernetes - thông qua proxy.

* Control plane: thành phần cốt lõi của service mesh, generate proxy dựa trên cấu hình của người quản trị.

##  Vậy khi nào sử dụng giải pháp nào?

Về cơ bản thì hai giải pháp này có các chức năng khác nhau, giải quyết các vấn đề khác nhau nên việc chọn lựa cũng khá đơn giản.

Ingress sẽ là lựa chọn hàng đầu nếu bạn cần điều phối các truy cập từ bên ngoài tới một hệ thống gồm nhiều ứng dụng, hoặc ứng dụng dạng microservices gồm nhiều components.

Service mesh lại là giải pháp tuyệt vời để tăng cường bảo mật cũng như kiểm soát việc giao tiếp giữa các thành phần nội bộ trong hệ thống.
# Lời kết
Trong bài viết này, mình đã chia sẻ về cách phân biệt Ingress và Service mesh trong Kubernetes cũng như cách sử dụng chúng trong từng trường hợp cụ thể.

Hy vọng nó sẽ có ích cho bạn, cảm ơn đã dành thời gian theo dõi!
# Tham khảo
https://dev.to/thenjdevopsguy/kubernetes-ingress-vs-service-mesh-2ee2

https://codilime.com/blog/service-mesh-vs-kubernetes-ingress-difference/