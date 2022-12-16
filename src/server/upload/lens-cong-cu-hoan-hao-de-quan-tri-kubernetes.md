# Mở đầu
Hôm nay mình muốn giới thiệu đến các bạn một công cụ theo mình là khá hoàn hảo giúp chúng ta quản trị, giám sát cụm K8s, công cụ này có tên là [Lens](https://k8slens.dev/) . Trước đây chúng ta có các công cụ để quản trị như: K9s, kubectl,.. tuy nhiên các công cụ này thường không có giao diện không trực quan hoặc không đầy đủ tính năng cần thiết thì ở Lens đã khác. Công cụ này cung cấp cho chúng ta khá đầy đủ các tính năng giúp ta chỉ cần click chứ không phải gõ lệnh trên terminal dài và mỏi tay. Cùng bắt đầu khám phá xem công cụ này vì sao mà đang được rất nhiều người sử dụng nhé.

![image.png](https://images.viblo.asia/bd6eafd5-6bea-46d3-8327-90030f0453eb.png)
# Hỗ trợ đầy đủ các môi trường
Một điều giúp cho Lens được sử dụng rất nhiều bởi mọi người là do Lens có thể chạy trên hầu hết các môi trường khác nhau như Linux, Windows, Mac,.. Không thiết các anh em sử dụng windows là môi trường chính để dev hay làm việc, tuy nhiên các công cụ manage K8s lại thường chỉ support Linux nên Lens sinh ra phiên bản Desktop như là cứu cánh cho anh em sử dụng windows.

![image.png](https://images.viblo.asia/b09a6f38-2f18-407f-b3c5-d86fbdf88155.png)

# Tự động cài đặt metric server 
Để có thể kết nối đến K8s Lens sẽ sử dụng Kubeconfig của cụm đó, việc này khá đơn giản nên mình không hướng dẫn.

Môt tính năng khá hay của Lens về mặt Cluster là nó cho phép tự động cài metric server để ta có thể giám sát các thông tin về cụm chỉ qua vài nút click. Để enable tính năng này ta **nhấp chuột phải vào tên của cụm => Settings => Lens Metrics => Enable các metrics mong muốn => Apply**

Sau khi kích hoạt Lens sẽ tự động cài các ứng dụng ở namespace Lens-metrics.

![image.png](https://images.viblo.asia/79f6b580-1872-4f6c-a407-04158c2cded9.png)

Sau khi cài ta sẽ có các metrics được hiện thị lên như hình Thông tin CPU, Memory usage, requests, limits,.. khá trực quan đúng không :)

![image.png](https://images.viblo.asia/f81ff820-06fb-4ffb-ae0b-6ae7f1f60b28.png)

# Các chức năng với Nodes
Trong thanh menu của Lens được chia thành các mục tương ứng với các thành phần trong K8s. Tại mục node là thông tin về các node trong cụm K8s của chúng ta. Ở đây ngoài giám sát các thông tin cơ bản về CPU, Ram, Disk của nodes ta có thể thực hiện exec vào node, Cordon, Drain, Edit hay là Delete node 
![image.png](https://images.viblo.asia/e5cf4176-0ab4-4643-8650-fc80fdab91e6.png)

Điểm đáng giá ở đây là tính năng chạy Shell trong node dù cho bạn không có ssh-key để ssh vào node. Lens sẽ tạo một node-shell để người dùng có thể inject và chạy command trong node đó với quyền root luôn 😳😳😳

# Các chức năng với Workloads
Tiếp theo ta đến với mục Workloads, ở đây sẽ là các tài nguyên chính của hệ thống chịu trách nhiệm chạy các dịch vụ đó là: pods, Deployment, DaemonSets, StatefulSets, ReplicaSets, Jobs, CronJobs. Không biết các bạn thế nào chứ mình thấy thiết kế giao diện của thg Lens này rất trực quan, nhìn phát biết hệ thống đang có vấn đề gì ở đâu
![image.png](https://images.viblo.asia/bd6be736-06d5-4e26-a224-b45098374d7e.png)

Đối với pod ta có thể chỉnh sửa, xóa, chạy shell trong pod và đặc biệt là tính năng xem log của từng container trong pod rất hữu ích trong việc debug
![image.png](https://images.viblo.asia/d1f78478-74b6-4b4f-b759-5331707b8db1.png)

Đối với các tài nguyên Deployment, DaemonSets, StatefulSets, ReplicaSets ta đều có thể sửa, xóa hay scale thủ công lên số pod mong muốn. Tuy nhiên có một điều không rõ sao nhưng tính năng restart mới chỉ có cho Deployment chứ chưa có cho các Resoure còn lại mặc dù có hỗ trợ, hy vọng sẽ được bổ sung trong các bản cập nhật kế tiếp.

![image.png](https://images.viblo.asia/55f47ae8-9a05-4306-b2bf-9732cc241c37.png)

# Quản lý Config siêu dễ
Mục Config sẽ là nơi lưu trữ Config, Secret và những cấu hình auto scale cho những ứng dụng mà ta đang chạy. Khi chọn vào một resoure thì các data trong resource đó được liệt kê ra ngay bên cạnh theo Key - Value và ta có thể update ngay lập tức, hoặc để thấy phiên bản raw của resoure này ta chọn nút hình bút chì ở góc trên bên phải.
![image.png](https://images.viblo.asia/67595786-0fc5-4136-bae2-c55a6e3cfaae.png) 

# Network K8s không còn là ác mộng
Tiếp theo đến với mục Network, đây là mục quản lý các resoure về network trong K8s gồm có Services, Endpoints, Ingresses, Network policies, Port Forwarding,...

Trong thực tế khi chạy các ứng dụng kết hợp service với Ingress rất hay gặp các lỗi Ingress không match service, service không match app,... tuy nhiên khi có giao diện như này ta dễ dàng kiểm tra được Ingress, service có đang match với nhau chuẩn xác hay không trong thông số, ví dụ như hình dưới là Endpoint. Nếu có Endpoint tức là app đã trỏ đúng, còn không thì là chưa có ứng dụng nào đứng sau xử lý requests.

![image.png](https://images.viblo.asia/00cd47ee-19d6-439c-8d28-392b4eaad586.png)

Một tính năng khá hay đó là Forward Port, chỉ với một nút bấm chúng ta đã có thể forward port service này về máy local. Tính năng này siêu hữu dụng trong quá trình debug ứng dụng.

# Storage quản lý lưu trữ data
Tại mục này ta sẽ có các thông tin về PVs PVCs, Storage Classes. Ta có thể chỉnh sửa và scale volume một các dễ dàng.
![image.png](https://images.viblo.asia/8014e8e5-8a75-419a-8fc9-e851ef70af5f.png)

# Các tính năng khác

Ngoài ra thì Lens cũng hỗ trợ chúng ta nhiều các tính năng khác kể đến như:
- Quản lý Namespace
- Xem các Events (Kubectl get events)
- Cài Helm chart có sẵn với 1 click
- Quản lý quyền truy cập (Access Control)
- Quản lý Custom Resource - CRD
- Hỗ trợ quản lý K8s theo team
- ...

Ngoài ra Lens vẫn đang được tiếp tục phát triển nên sẽ còn nhiều tính năng mới nữa được reslease.
# Kết
Công cụ này sẽ là một "IDE" rất hữu ích cho các bạn mới bắt đầu vọc vạch K8s hoặc cho các Dev không có kiến thức chuyên sâu về K8s có thể quản trị một các dễ dàng. Hy vọng bài viết này giúp bạn xử lý công việc dễ dàng hơn. Có bất cứ thắc mắc nào có thể comment ở dưới, nếu có thể giải đáp mình sẽ trả lời. 😁😁😁

[*Buy me a Coffee](https://www.buymeacoffee.com/hoangviet)