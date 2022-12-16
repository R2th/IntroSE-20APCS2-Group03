## Giới thiệu
Việc triển khai hệ thống microservices lên trên server luôn luôn là một thử thách lớn, và khi Kubernetes được sinh ra thì nó đã giúp ta dễ dàng hơn phần nào trong việc triển khai hệ thống microservices lên trên server. Nhưng ta sẽ đối mặc với thách thức tiếp theo là cách giao tiếp giữa các services bên trong Kubernetes, vì Kubernetes không được sinh ra như một giải pháp về networking, do đó Istio đã được ra đời, Istio được phát triển dựa trên Service Mesh.

![](https://images.viblo.asia/b51798a3-f3b3-4b1a-8090-e9cdd83ae1d4.png)

Với K8S thì ta sẽ dùng Pod để triển khai services, trước khi tìm hiểu về Service Mesh thì ta sẽ xem cách giao tiếp mặc định giữa các Pod bên trong K8S như thế nào và nó bị hạn chế gì?

## Internal Pod Communication
Trong K8S để các Pod nằm ở các worker node khác nhau có thể giao tiếp được với nhau thì K8S sử dụng *Container Network Interface (CNI)*, và ở bên trong một worker node để các Pod có thể giao tiếp được với nhau thì K8S sử dụng *kube-proxy*.

![](https://images.viblo.asia/4ee09221-be25-4f63-8c3b-b55098a8561d.png)

Khi ta tạo một Pod hay Service thì kube-proxy sẽ thực hiện cập nhật *iptables rules* để các Pod có thể giao tiếp được với nhau, ví dụ như sau.

![](https://images.viblo.asia/2a2bff72-6341-47fe-bffd-2febaadb97fc.png)
*<div align="center">Image from Kubernetes in Action</div>*

Khi ta tạo Service tên là B thì Kubernetes API Server sẽ thông báo cho kube-proxy ở worker node cập nhật lại iptables rules thêm vào *rule* cho Service B, sau đó nếu có một Pod nào đó gọi tới Service B thì request của nó đầu tiên sẽ đi qua iptables, lúc này iptables sẽ xem thằng Service B này IP thật sự của nó sẽ bao gồm những thằng nào, tiếp theo iptables sẽ gửi request tới một trong những IP nó kiếm được theo cách random.

Đây là cách kube-proxy làm việc, nhưng nó sẽ có những hạn chế như sau:
+ Request nó gửi đi tới các Pod là random.
+ Không thể chia traffic theo kiểu phần trăm.
+ Không thể thực hiện canary releases hoặc blue-green releases.
+ Khó để giám sát và bắt lỗi.

Đặt biệt là trong hệ thống microservices thì việc giao tiếp giữa các services cần phải có bảo mật, có thể giám sát và truy lỗi, đo được thời gian của từng request, và để thực hiện được những chức năng này thì ta phải tự cài thư viện bên trong ứng dụng của ta, ví dụ như sau.

![](https://images.viblo.asia/d205ac68-28e0-43f8-bfec-3d59779c6360.png)

Việc này tuy không có gì sai, nhưng những tiến trình này rõ ràng đang chiếm tài nguyên của ứng dụng chính, và khi một developer viết code thì cũng cần viết thêm code cho phần này, trong khi thường thì ta chỉ muốn developer tập trung vào logic của ứng dụng.

**Do đó service mesh đã được sinh ra.**

## Service Mesh
Service Mesh là một công cụ sẽ thêm một lớp mạng riêng biệt *(dedicated network layer)* đứng trước ứng dụng, phần network layer này sẽ cung cấp thêm các tính năng như bảo mật, giám sát tầng network cho ứng dụng thay vì ta phải thực hiện nó ở trong ứng dụng, hình minh họa.

![](https://images.viblo.asia/bdfa695d-efdf-4a4a-966f-7d4ec42df53e.png)

Service Mesh gồm có hai thành phần chính là *control plane* và *data plane*:
+ Control plane sẽ thực hiện vài trò là quản lý toàn bộ các services.
+ Data plane sẽ đóng vai trò xử lý giao tiếp giữa các services.

Khi ta triển khai service mesh lên trên K8S thì lúc này data plane sẽ là phần sidecar container proxy được triển chung với application container, còn control plane sẽ được triển khai như một Pod riêng biệt.

![](https://images.viblo.asia/7b6fdae2-f078-410b-a137-c9dfff2c0d59.png)

Lúc này thay vì quản lý việc giao tiếp với nhau thông qua kube-proxy, thì ứng dụng của ta sẽ giao tiếp với container proxy, và container proxy sẽ thực hiện việc giao tiếp giữa các Pod với nhau. Tất cả các chức năng như bảo mật, giám sát, đo lường thì container proxy sẽ thực hiện hết, còn ứng dụng của ta chỉ cần tập trung vào phần *application logic*.

Thì hai công cụ service mesh phổ biến nhất ở thời điểm mình viết bài là Istio và Consul, và chúng ta sẽ nói về Istio.

## Istio
![](https://images.viblo.asia/e1135f5b-4a3e-4873-a21d-db3b54530049.png)

Istio là một công cụ service mesh được xây dựng để chạy trên Kubernetes, Istio cũng gồm hai phần chính là *control plane* và *data plane*. Với control plane sử dụng *Istiod* container và data plane sẽ được triển khai tới Pod như một sidecar proxy dùng *Envoy* container.

![](https://images.viblo.asia/a4910fcf-9cee-4989-9423-626f930dc017.png)

**Istiod** sẽ quản lý và cấu hình sidecar container proxy, đóng vai trò như một service discovery cho toàn bộ proxy. Istiod sẽ chuyển toàn bộ cấu hình *routing rules* sang dạng cấu hình của Envoy và chuyển nó tới toàn bộ Envoy container.

**Envoy container** sẽ thực hiện việc giao tiếp giữa các Pod với nhau, các tính năng nổi bật của Envoy:
+ Dynamic service discovery
+ Load balancing
+ TLS termination
+ HTTP/2 and gRPC proxies
+ Circuit breakers
+ Health checks
+ Staged rollouts with %-based traffic split
+ Fault injection
+ Rich metrics

Khi ta cài Istio lên trên Kubernetes thì lúc ta tạo Pod thì Envoy container sẽ tự động được thêm vào Pod của ta, nên ta không cần phải tự khai báo thêm Envoy container khi viết file manifest cho Pod.

Hiện tại thì Istio đã được chấp nhận như là một dự án của Cloud Native Computing Foundation (CNCF), đây là tổ chức phát triển Kubernetes nên Istio sẽ còn phát triển nhiều trong tương lai và sẽ không bị bỏ ngang nên các bạn cứ thoải mái sử dụng 😁.

Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé 😁.

## Kết luận
Vậy là ta đã tìm hiểu tại sao ta lại nên sử dụng *Service Mesh* trong hệ thống microservices và Istio là gì. Bài tiếp theo ta sẽ tìm hiểu về cách cài đặt Istio và cách làm một số thứ cơ bản.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).

Đồng đội [Junior Backend Engineer](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067).

Đồng đội [Junior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068).

Đồng đội [Onsite Merchandising (Web Admin)](https://tuyendung.hoang-phuc.com/careers/job/945)