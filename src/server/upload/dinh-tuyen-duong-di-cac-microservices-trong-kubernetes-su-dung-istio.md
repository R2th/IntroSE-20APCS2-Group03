**1. Bối cảnh**

Trong kiến ​​trúc nguyên khối, chúng ta có một dịch vụ khổng lồ duy nhất với tất cả logic nghiệp vụ để xử lý tất cả các yêu cầu từ người dùng, nhưng trong kiến ​​trúc microservices, chúng ta có nhiều dịch vụ tập trung vào logic nghiệp vụ cụ thể. Một yêu cầu của người dùng duy nhất có thể trở thành nhiều yêu cầu cho các dịch vụ phụ thuộc.
![](https://images.viblo.asia/14edf1cf-cd86-4a2a-b75c-6b688e859252.png)
Như thể hiện trong sơ đồ trên, một yêu cầu của người dùng tới microservice-A được gửi đến microservice-B, microservice-C và microservice-D. Cuối cùng, một phản hồi được gửi đến người dùng.
Bây giờ, giả sử microservice-B có một tính năng mới, cần được phát triển và thử nghiệm trên một nhóm user được chọn cụ thể ở đây là User1. Thông thường, chúng ta sẽ phát triển và triển khai microservice-B mới và định tuyến lưu lượng sẽ giống các cách hiện có được kubernetes hỗ trợ. Nếu làm vậy thì mọi thứ có vẻ ổn, nhưng không, chúng ta sẽ đối mặt với vấn đề sau:
* Giả sử có một nhóm người dùng khác khác sử dụng các tính năng cho User2 . Nếu có lỗi trong microservice-B mới, yêu cầu R2 của User2 cũng sẽ không thành công, điều này không ổn. User2 R2 sẽ không bị ảnh hưởng vì bất kỳ thay đổi dịch vụ không liên quan nào khác. Phải có một phiên bản microservice-B khác, chỉ có thể được sử dụng bởi các yêu cầu R1 trước khi chuyển các thay đổi sang phiên bản chính.


**2. Giải pháp**

Để giải quyết vấn đề trên có một cách là có nhiều phiên bản của mỗi microservice. Giả sử microservice-A phụ thuộc vào microservice-B. Sau đó, bất cứ khi nào chúng ta thực hiện bất kỳ thay đổi nào đối với microservice-B, trước tiên chúng ta tạo các phiên bản microservice A và B riêng biệt để kiểm tra các thay đổi mới trong microservice-B không vi phạm bất kỳ điều gì. Như vậy, chúng ta có thể kiểm tra các thay đổi mà không ảnh hưởng đến các dịch vụ khác.
![Screen Shot 2022-06-22 at 20.14.12.png](https://images.viblo.asia/37b26bf8-a305-42ad-af9e-e21293aaec37.png)
Như trong hình trên, chúng ta sao chép một vài dịch vụ phụ thuộc để kiểm tra các chức năng mới của microservice-B. Sau khi kiểm tra hoàn tất, chúng ta sẽ thay thế microservice-B ban đầu và xóa các microservice đã sao chép.
Đối với dev chúng ta có thể khởi tạo các microservices tạm thời và kiểm tra các thay đổi nhưng các thành viên QA, họ không thể sao chép và kiểm tra một microservice duy nhất. QA cần kiểm tra toàn bộ quy trình làm việc bất cứ khi nào có bất kỳ thay đổi nào. Vì vậy, trong trường hợp trên, nếu có nhiều microservice hơn phụ thuộc vào microservice-B, chúng ta cũng cần phải nhân rộng chúng. Đối với kiến trúc microservice có thể có hàng trăm dịch vụ được phát triển và thử nghiệm song song. Do đó, không thể tái tạo các microservices phụ thuộc cho mọi sự phát triển tính năng.
Để khắc phục vấn đề này, chúng ta cần thêm cơ chế định tuyến động được hỗ trợ bởi Istio . Sử dụng Istio kết hợp với Kubernetes, chúng ta có thể tự động chuyển hướng lưu lượng và thử nghiệm bất kỳ tính năng nào. Chúng ta chỉ cần sao chép dịch vụ mục tiêu và không cần sao chép các dịch vụ phụ thuộc như hình dưới đây.
![Screen Shot 2022-06-22 at 20.14.59.png](https://images.viblo.asia/fc9937fc-bbb9-4de8-bb59-6e80fe3252d0.png)
Chỉ các yêu cầu từ User1 sẽ chuyển đến dịch vụ sao chép microservice-B-v2 và lưu lượng còn lại sẽ diễn ra như trước.

**3. Chi tiết kỹ thuật**

Trong phần này, mình sẽ nói về cách hoạt động của định tuyến động và định tuyến lưu lượng giữa nhiều phiên bản của microservices.
Định tuyến động là một tính năng dựa trên Istio traffic shifting bằng cách sử dụng header. Mình sẽ giải thích ngắn gọn cách thức hoạt động của Istio traffic shifting. Để tìm hiểu thêm, bạn có thể tham khảo tài liệu Istio traffic shifting.
Kỹ thuật này chủ yếu sử dụng các tài nguyên sau để định tuyến lưu lượng giữa nhiều phiên bản triển khai:
* Service Kubernetes (Là một service riêng biệt trỏ đến từng phiên bản deployment)
* Deployment (Quản lí nhiều phiên bản pod)
* Istio VirtualService (Đây là định tuyến các yêu cầu đến các service kubernetes cụ thể)


Cấu hình của VirtualService trông giống như bên dưới
```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: test
  namespace: default
spec:
  hosts:
  - "*"
  gateways:
  - test-gateway
  http:
  - match:
    - headers:
        feature:
          exact: v1
    route:
    - destination:
        host: microservice-a-new
        port:
          number: 80
  - name: default
    route:
    - destination:
        host: microservice-a
        port:
          number: 80
```

Có hai route trong VirtualService ở trên dưới khối http. Trường hợp đầu tiên là định tuyến dựa trên header phù hợp với header có trong request và định tuyến các yêu cầu đến một máy chủ cụ thể. Tiếp theo là một route mặc định  không khớp với bất kỳ thứ gì và định tuyến trực tiếp các yêu cầu đến một máy chủ khác.

**4. Cấu hình mẫu**

*Note: Để có thể hiểu các config dưới đây bạn cần tìm hiểu một tí về Kubenetes*
*  Service

```
apiVersion: v1
kind: Service
metadata:
  name: microservice-a
  labels:
    app: microservice-a
    service: microservice-a
spec:
  ports:
  - port: 80
    name: http
  selector:
    app: microservice-a
```

* Deployment

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: microservice-a
spec:
  selector:
    matchLabels:
      app: microservice-a
  replicas: 1
  template:
    metadata:
      labels:
        app: microservice-a
    spec:
      containers:
      - name: microservice-a
        image: nginx
        ports:
        - containerPort: 80
        volumeMounts:
            - name: nginx-conf
              mountPath: /etc/nginx/nginx.conf
              subPath: nginx.conf
              readOnly: true
      volumes:
      - name: nginx-conf
        configMap:
          name: nginx-conf
          items:
            - key: nginx.conf
              path: nginx.conf
```

* Visual service

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: test
  namespace: default
spec:
  hosts:
  - "*"
  gateways:
  - test-gateway
  http:
  - match:
    - headers:
        feature:
          exact: v1
    route:
    - destination:
        host: microservice-a-new
        port:
          number: 80
  - name: default
    route:
    - destination:
        host: microservice-a
        port:
          number: 80
```

**5. Kết quả**

* Deployment

![Screen Shot 2022-06-23 at 21.20.23.png](https://images.viblo.asia/356bfd59-7444-46b6-b938-2ef990501622.png)

Ở đây mình đã cấu hình để microservice-a sẽ trả về đoạn text là Service A và microservice-a-new sẽ trả về đoạn text là Service A new feature

* Service & VirtualService
 
![Screen Shot 2022-06-23 at 21.21.06.png](https://images.viblo.asia/2a788ba0-c85a-4e2d-b384-25760f839de8.png)

Như đã config ở visual service trên nếu request có header là v1 thì sẽ trỏ vào microservice-a-new, còn lại sẽ mặc định là microservice-a

Mặc định
![Screen Shot 2022-06-23 at 21.21.55.png](https://images.viblo.asia/08876052-599b-488f-bab9-20516433df42.png)

Truyền header với feature có value v1
![Screen Shot 2022-06-23 at 21.22.21.png](https://images.viblo.asia/c367f404-921e-4b64-ab23-0209a4bafa0c.png)

Đây chỉ là một demo nhỏ được gói gọn trong 1 service để đễ hình dung về kỹ thuật này. Nó sẽ rất hữu ích đối với kiến trúc microservice và kubenetes , nơi mà tất cả các loại thử nghiệm được thực hiện trước khi triển khai bất kỳ microservice nào vào môi trường sản xuất.  Mô hình dưới đây là một ví dụ về “lưu lượng truy cập” và “bố cục các service” để dễ dàng kiểm tra cho  Dev và QA.
![Screen Shot 2022-06-23 at 21.22.51.png](https://images.viblo.asia/c6cdb6f7-1f07-4530-a64b-4b19ab5e0e70.png)

Thông tin chi tiết về mô hình trên:

* Nhóm SRE đang giám sát các dịch vụ ban đầu
* Nhóm QA đang thử nghiệm một tính năng mới được giới thiệu trong svcA
* Nhóm DEV đang phát triển một tính năng mới cho svcB


Nếu không dùng Định tuyến động, chúng ta phải sao chép các nhóm dịch vụ Gateway cho mỗi nhóm người dùng để kiểm tra các dịch vụ mục tiêu của họ mà không gây rắc rối cho người dùng và dịch vụ khác. Với sự trợ giúp của istio, chúng ta chỉ sao chép các dịch vụ đích và tiết kiệm rất nhiều chi phí tài nguyên và cấu hình.


Tool:
* Minikube(dùng để chạy một cluster ở local)
* Kubectl(dùng để connect và làm việc với cluster)
* Docker(Dùng để chạy Kubernetes API và các node, Docker cũng hỗ trợ chạy Kubernetes mà không cần dùng minikube)
* Helm(quản lý gói ứng dụng cho Kubernetes)