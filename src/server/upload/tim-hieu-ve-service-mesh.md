# Mở đầu

Kiến trúc Microservice ngày càng trở nên phổ biến và trở thành lựa chọn hàng đầu trong quá trình phát triển phần mềm. Trong kiến trúc microservice, ứng dụng monolithic truyền thống được chia nhỏ ra thành các thành phần có thể deploy độc lập. Một ứng dụng dần trở thành một nhóm các service, khi bạn có hàng trăm, hàng ngàn các service nhỏ cùng hoạt động, một bài toán mới về vấn đề giao tiếp giữa các service cần được giải quyết.

Giả sử chúng ta có website bán hàng online được triển khai theo kiến trúc microservice, chúng ta sẽ có

- Web server service: xử lý các request về UI
- Payment service: xử lý các request về thanh toán
- Shopping cart service: xử lý các request về giỏ hàng
- Product inventory service: xử lý các request về kho hàng
- Database service
- ..., rất nhiều các microservice xử lý các vấn đề khác nữa

Khi chúng ta deploy website trong Kubernetes cluster, để website hoạt động ổn định, trước tiên các service cần hoạt động chính xác, **web server** cần xử lý chính xác business logic, database cần lưu đầy đủ thông tin,... hơn hết các service cần giao tiếp thông suốt với nhau. Khi user gửi 1 request thêm sản phẩm vào giỏ hàng lên **web server**,  **web server** cần thông báo sang cho **shopping cart service,** rồi lưu thông tin đó vào **database**. Vì vậy, các service cần phải biết làm thế nào để giao tiếp với các service khác, đâu là đích đến tiếp theo của request, địa chỉ endpoint của từng service, để web server biết phải giao tiếp với endpoint nào chúng ta cần cấu hình cho nó. Khi ta scale ứng dụng lên và có nhiều thêm các microservice, chúng ta lại config endpoint cho tất cả các service đã hoạt động trước đó. Cấu hình địa chỉ endpoint trở thành 1 phần không thể tách rời của các service. 

Nói về vấn đề security,  ứng dụng dùng kiến trúc microservice trông sẽ như này
![image.png](https://images.viblo.asia/bf081545-1757-459a-9f88-6f3435ebe033.png)

Chúng ta có firewall hoặc proxy để tránh Kubernetes cluster được truy cập trực tiếp, bảo vệ cho các service bên trong cluster. Tuy nhiên ngay khi request đi vào bên trong cluster, các service giao tiếp với nhau 1 cách kém bảo mật, chúng giao tiếp với nhau thông qua http hoặc protocol kém bảo mật hơn, các service giao tiếp tự do với nhau bên trong cluster - nơi không được bảo mật nữa. Khi ai đó tấn công vào ứng dụng, vượt qua firewall / proxy để vào bên trong cluster, họ thoải mái làm mọi thứ, có thể lấy các thông tin nhạy cảm của user. Vì vậy chúng ta bổ sung thêm các security logic cho service để đảm bảo việc giao tiếp giữa các service bên trong cluster được an toàn. 

Mỗi service cũng cần được implement retry logic để khi service không thể truy cập, hoặc các service khác mất kết nối, tự nó có thể khởi động lại, để đảm bảo giao tiếp thông suốt.

Ngoài ra, bạn cũng cần monitor cách hoạt động của service, cần nắm được các thông số về thời gian service xử lý 1 request, số lượng request/response của service. Cuối cùng mỗi service sẽ được implement thêm rất nhiều các logic bên cạnh business logic của service
![image.png](https://images.viblo.asia/234c3d18-ad5b-48aa-97f2-666cbc537aab.png)
rồi các developer sẽ không còn tập trung vào phát triển logic cho service mà còn phải xử lý cả các logic về network cho metrics, security, communication,... Điều này khiến các service trở nên phức tạp và không còn đơn giản, gọn nhẹ như mục tiêu của microservice nữa.

# Giải pháp: Service Mesh

Để giải quyết vấn đề này, chúng ta cần tách biệt các non-business logic với business logic  khỏi service bằng solution được gọi là `Service Mesh`.

`Service Mesh` sử dụng các sidecar application để xử lý những network logic, đưa các logic này hoạt động tương tự như Proxy, trở thành third-party application và giúp người vận hành cluster có thể cấu hình chúng dễ dàng hơn. Hơn nữa developer không cần đưa chúng vào config deploy của microservice, bởi `Service Mesh` có 1 **control plane**  giúp truyền các Sidecar Proxy nào vào tất cả các service, và rồi các service giao tiếp với nhau thông qua proxy trong nó. Network Layer bao gồm control plane và các proxy chính là 1 `Service Mesh`.
 
 ## Ưu nhược điểm 
 
 Ưu điểm: 
 - Đơn giản hóa việc giao tiếp giữa các services trong mô hình microservices. Sidecar proxy được đặt cạnh container services, kiểm soát toàn bộ các giao tiếp mạng, sẽ rất tiện ích cho việc quản lý network.
 - Dễ dàng cho việc điều tra, phân tích những lỗi liên quan đến network khi xảy ra ở tầng infrastructure.
 - Mã hoá, bảo mật, xác thực các kết nối, giao tiếp giữa các service
 - Giúp developer tập trung vào business logic, không cần quan tâm tới các network logic

Nhược điểm:
- `Service Mesh` mang lại những tiện ích về mặt Network, nhưng lại tăng độ trễ cho thời gian thực thi và giao tiếp, do request phải đi qua những Sidecar Proxy.

## Traffic split

Một trong những tính năng chính của Service Mesh là traffic split.

Giả sử **Payment service** mới được deploy version 3.0 lên production, bạn muốn thực hiện 1 A/B Testing để nghiên cứu phản hồi của người dùng trên version mới này nhằm so sánh phiên bản cũ chẳng hạn.

![image.png](https://images.viblo.asia/59fbce30-5822-4a5c-b77a-dad15412dfe7.png)

 Vì thế giờ **Web server service** cần chuyển 1 phần traffic sang version 3.0 trong 1 khoảng thời gian đủ để bạn đưa ra được quyết định nên upgrade version mới hay không ? 
 
 ![image.png](https://images.viblo.asia/40020095-556b-444a-ab4f-1b40b4abc3df.png)
 
 Với `Service Mesh` bạn có thể làm điều này dễ dàng cấu hình 1 phần traffic sang service version 3.0 và phần lớn traffic về version 2.0.
 # Istio 
 ![](https://images.viblo.asia/50a04d34-a653-4356-8e8f-b7526c07539d.png)

 `Service Mesh` là 1 pattern và [`Istio`](https://istio.io/) là một trong những ứng dụng implement pattern này. `Istio` là service mesh độc lập, mã nguồn mở được viết bằng go-lang, một ngôn ngữ khá phổ biến để xây dựng những ứng dụng cloud-native (docker, kubernetes…), cung cấp các nguyên tắc cơ bản, giảm sự phức tạp trong việc quản lý microservice bằng cách cung cấp một cách thống nhất để bảo mật, kết nối và giám sát microservice với nhau. `Istio` có các API cho phép nó tích hợp vào bất kỳ nền tảng logging nào.
 
 ## Kiến trúc của Istio

 ![](https://images.viblo.asia/97155f54-d1b1-44ec-9db0-3c8be533049f.png)

 Kiến trúc của **Istio** gồm: 
 
 - **Data Plane**: Istio sử dụng [**Envoy proxy**](https://www.envoyproxy.io/), chịu trách nhiệm 
   - Service Discovery
   - Load Balancing
   - Authentication and Authorization
   - Request Tracing
   - Traffic Management
   - Fault Injection
   - Rate Limiting
   - Observability

- **Control Plane** của `Istio` là `istiod` tiếp nhận các tương tác của **DevOps/SysAdmin** thông qua Command Line Interface — CLI, chịu trách nhiệm quản lý và truyền các **envoy proxy** vào service.

# Tạm kết

Trên đây là những khái niệm tổng quan về `Service Mesh`, `Istio`.
Các vấn đề kỹ thuật sâu hơn về việc tích hợp `Istio` & `Kubernetes`, sẽ được ở đề cập ở những bài viết tiếp theo.