# Mở đầu
**Kubernetes** cung cấp cho bạn một framework để chạy các hệ phân tán một cách mạnh mẽ. Nó đảm nhiệm việc nhân rộng và chuyển đổi dự phòng cho ứng dụng của bạn, cung cấp các mẫu deployment và hơn thế nữa. Các ứng dụng vận hành theo hướng cloud-native và thường được thiết kế để sử dụng kiến trúc microservice nơi mà mỗi thành phần được đóng gói trong một container. Cùng với kiến trúc hệ thống như vậy, thì việc đảm bảo ứng dụng của bạn có tính sẵn sãng cao, độ tin cậy và khả năng phục hồi là một yếu tố hết sức quan trọng. Bạn chỉ có thể khẳng định tình trạng của hệ thống nếu tất cả các thành phần của nó đang hoạt động. Trong Kubernetes, có một cơ chế giúp ta kiểm tra và đảm bảo tình trạng hoạt động ổn định của hệ thống, đó là cơ chế là **Health checks** (kiểm tra sức khỏe).

Trong phạm vi bài viết này, mình sẽ cùng các bạn tìm hiểu về các cơ chế Healthcheck trong Kubernetes cũng như cách sử dụng chúng nhé :)))

# Health checks là gì?
*Sử dụng Health checks là một trong những best practices trong Kubernetes.*

Health check là một cách đơn giản để cho hệ thống biết một ứng dụng có đang hoạt động không? Từ đó, các dịch vụ khác sẽ không truy cập hoặc không gửi yêu cầu đến ứng dụng không hoạt động cho đến khi nó sẵn sàng và Kubernetes cũng có các cơ chế tự động để cố gắng đưa ứng dụng của bạn hoạt động trở lại.

Theo mặc định, Kubernetes sẽ bắt đầu gửi lưu lượng truy cập đến một Pod, khi tất cả các Container bên trong một Pod bắt đầu và khởi động lại container khi chúng bị hỏng. Tất cả các hành vi này trong cấu hình mặc định của Kubernetes hoạt động tốt, tuy nhiên bạn cũng có thể làm cho việc triển khai của mình đảm bảo và phù hợp hơn với yêu cầu riêng biệt của từng ứng dụng khác nhau bằng các cấu hình tùy chỉnh.

Kubernetes cung cấp cho chúng ta hai loại health checks là Liveness check và Readiness check, điều quan trọng là ta phải hiểu được công dụng, sự khác biệt giữa 2 loại health checks này để có thể sử dụng chúng một cách có hiệu quả. Hình dưới đây cho thấy vị trí hoạt động của các Healtcheck Probes trong pod lifcyle

<img src="https://images.viblo.asia/c03b62b8-6997-4843-b5f8-c97690b3f94e.png" alt="Kitten"
	title="Vị trí hoạt động của các Healtcheck Probes trong pod lifcyle" width="150" height="100" />

*(url: https://blog.francium.tech/lifecycle-of-a-kubernetes-pod-1214199ddd2c)*
# Liveness checks

Cơ chế liveness probe được sử dụng để kiểm tra xem khi nào thì nên khởi động lại một pods. Tức là nó sẽ kiểm tra xem ứng dụng của bạn còn sống hay đã chết  hoặc không hoạt động đúng chức năng (Ví dụ, liveness probe có thể phát hiện deadlock, nơi một ứng dụng đang chạy, nhưng không có kết quả). Nếu ứng dụng của bạn còn đang hoạt động, thì Kubernetes sẽ không đụng gì đến nó cả. Nhưng nếu ứng dụng của bạn đã chết, Kubernetes sẽ loại bỏ pod đó và bắt đầu một pod mới để thay thế nó.

# Readiness checks

Kubernetes sử dụng cơ chế readiness probe để xác định mức độ sẵn sàng cho ứng dụng của bạn. Nó sẽ kiểm tra và đảm bảo khi nào ứng dụng sẵn sàng đón nhận lưu lượng truy cập trước khi cho phép một dịch vụ gửi lưu lượng truy cập đến pods đó. Nếu một sự thăm dò và kiểm tra không thành công nó sẽ ngừng gửi lưu lượng truy cập cho đến khi ứng dụng vượt qua được sự kiểm tra.

# Các loại Probes

Kubernetes cung cấp 3 loại probs! Bạn có thể sử dụng bất kỳ ai trong số các loại probs này để thực hiện liveness check và readiness check.

### HTTP probe

HTTP là loại probs tùy chỉnh phổ biến nhất. Ngay cả khi ứng dụng của bạn không phải là một máy chủ HTTP. Bạn hoàn toàn có thể tạo một ightweight HTTP server bên trong  ứng dụng của bạn để phản hồi liveness probe. Kubernetes sẽ thực hiện ping tới một đường dẫn và nếu nó nhận lại được  HTTP response trong phạm vi 200 hoặc 300 thì nó sẽ coi pod của bạn là đang healthy (khỏe mạnh và đang ngon ^^), còn nếu không pod đó sẽ được đánh dấu là unhealthy (đang hỏng rồi :().

Cách để xác định một HTTP probe:

```
httpGet:
  path: /healthz
  port: 8080
  httpHeaders:
  - name: Host
      value: www.example.local
```

Một ví dụ đầy đủ hơn về HTTP probe:
```
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-http
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/liveness
    args:
    - /server
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
```

### Command probe

Đối với Command probe, Kubernetes sẽ chạy một command bên trong một container của bạn. Nếu command được chạy trả về bằng 0, container của  bạn sẽ được đánh dấu là healthy, ngược lại, nó sẽ được đánh dấu là healthy. Loại probe này thường được sử dụng khi bạn không thể hoặc không muốn chạy một HTTP server nhưng bạn muốn chạy một lệnh và để kiểm tra xem ứng dụng của mình có tốt hay không.

Cách để xác định một Command probe:
```
  exec:
    command:
      - mycommand
```

Một ví dụ khác đầy đủ hơn về Command probe:
```
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-exec
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -rf /tmp/healthy; sleep 600
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 5
      periodSeconds: 5
```

### TCP probe

 Khi cả HTTP probe hoặc Command probe không hoạt động, ta sẽ nghĩ đến việc sử dụng TCP probe. Với TCP probe, kubernetes sẽ cố gắng thiết lập một kết nối TCP trên port được chỉ định. Nếu nó có thể thiết lập kết nối, thì Pod được coi là healthy, ngược lại sẽ là một pod unhealthy. TCP probe được sử dụng rất hữu ích trong các dịch vụ gRPC và FTP.
 
 Cách để xác định một TCP probe:
 ```
 tcpSocket:
  port: 6379
 ```
 
 Một ví dụ đầy đủ hơn về TCP probe:
 ```
 apiVersion: v1
kind: Pod
metadata:
  name: goproxy
  labels:
    app: goproxy
spec:
  containers:
  - name: goproxy
    image: k8s.gcr.io/goproxy:0.1
    ports:
    - containerPort: 8080
    readinessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 10
    livenessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 15
      periodSeconds: 20
 ```
# Định cấu hình Probes

Để kiểm soát một cách chính xác hơn các hành vi của của liveness và readiness checks, phù hợp với yêu cầu riêng của từng ứng dụng, Kubernetes cho phép bạn tùy chỉnh các tham số sau:
- **initalDelaySeconds:** Đây là một thông số cấu hình cực kì quan trọng khi bạn cài đặt liveness probe. Đây là độ trễ ban đầu tính bằng giây trước khi thực hiện các hành động healthcheck. Tức là sau khi container của start được bao nhiêu giây thì mới tiến hành liveness check hay probe check. Như chúng ta đã biết, nếu liveness check và unhealthy, nó sẽ restart lại pod của bạn. Vì vậy, bạn cần đặt thông số này một cách chính xác, đảm bảo một pod của bạn đã hoàn toàn khởi động xong mới thực hiện healthcheck. Nếu không, pod của bạn sẽ liên tục restart và không bao giờ sẵn sàng cả. 
- **periodSeconds:** Là tần suất thực hiện probes và được tính bằng giây. Mặc định là 10 giây. Giá trị tối thiểu là 1.
- **timeoutSeconds:** Là thời gian times out (tính bằng giây) của các hành vi probe. Mặc định là 1 giây. Giá trị tối thiểu là 1.
- **successThreshold:** Số lần success liên tiếp của probes sau khi failed, nếu nó đạt con số này sẽ được coi là thành công, không thì sẽ thực hiện check tiếp. Mặc định là 1. Phải là 1 cho liveness. Giá trị tối thiểu là 1.
- **failureThreshold:** Khi một Pod start và probe thất bại, Kubernetes sẽ thử một số lần failureThreshold trước khi bỏ cuộc. Từ bỏ trong trường hợp liveness probe có nghĩa là khởi động lại container. Trong trường hợp readiness probe, Pod sẽ được đánh dấu Unready. Mặc định là 3. Giá trị tối thiểu là 1.

# Tạm kết

Thực sự, việc thực hiện health check là cần thiết đối với bất kỳ hệ thống phân tán nào và kubernetes cũng không ngoại lệ. Health check sẽ mang lại cho các ứng dụng của bạn độ tin cậy cao hơn cũng như sự hiệu quả về higher uptime. Tính năng health check được cung cấp sẵn trong Kubernetes là một giải pháp vô cùng hữu ích, dễ dàng sử dụng giúp chúng ta đạt được điều đó.

# References
- https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-setting-up-health-checks-with-readiness-and-liveness-probes
- https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-http-request