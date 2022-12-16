![](https://images.viblo.asia/6b2ebff5-5b0f-4e48-97e3-5bfee1fa9ee9.png)
Tranh luận về Docker và Kubernetes thường bị gắn với câu hỏi "or-either". Chúng ta nên sử dụng Docker hay Kubernetes? Nhưng ta cần trả lời câu hỏi "and-both" trước để hiểu sự khác biệt giữa chúng. Thực chất, chúng ta không cần phải chọn. Chúng là những công nghệ hoàn toàn khác nhau nhưng có thể kết hợp với nhau hoàn hảo.
# 1. Tại sao bạn cần containers ?
Nhiều hệ thống yêu cầu tính sẵn sàng buộc dev phải có giải pháp để bảo trì mà hệ thống vẫn hoạt động tốt. Và thế là container ra đời, mang lại môi trường tách biệt để hệ thống hoạt động, trong khi dev vẫn có thể nâng cấp bảo trì.
Ngoài ra, container mang đến nhiều lợi thế so với công nghệ ảo hoá. Mỗi container chỉ cần bins và libs, không như các máy ảo cần bản sao của hệ điều hành. Ngoài ra, các container cũng có thể dùng chung bins và libs,  nhằm tiết kiệm không gian và thời gian triển khai.
![](https://images.viblo.asia/62fbf94a-4ebc-487e-af5f-7be5081ab661.png)

# 2. Docker và sự phát triển của container.
Docker là công nghệ mã nguồn mở, đã phát triển đến mức có thể coi là nền tảng container tiêu chuẩn những năm gần đây với lý do:
* Dễ sử dụng.
* Nhẹ và nhanh.
* Dễ dành Module hoá và mở rộng các thành phần.

Nhắc đến Docker đồng nghĩa là nói đến Docker Engine, là một runtime environment, có chức năng build và run các container.  
Tuy nhiên, việc triển khai nhiều container cùng lúc cũng  mang đến những thách thức phức tạp. Làm thể nào để điều phối và schedule các app?  Các app giao tiếp thể nào? Và việc scale up các container sẽ ra sao? Tất cả những điều đó đã dẫn đến một giải pháp khác, Kubernetes.

# 3. Kubernetes là gì?
Kubernetes là nền tảng quản lý, mở rộng và triển khai ứng dụng chạy chạy trên các container được phát triển bởi Google. Với sự linh hoạt và mạnh mẽ, nó có thể giải quyết những vấn đề phức tạp khi scaling hệ thống với nhiều container.
Với các production trong thực tế yêu cầu mở rộng containers và triển khai trên nhiều sever, Kubernetes cung cấp khả năng điều phối bằng cách tự động scaling và quản lý vòng đời các container để giữ cho app hoạt động mượt mà.

# 4. Khác biệt giữa Kubernetes và Docker.
So sánh này đồng nghĩa với so sánh Kubernetes vs. Docker Swarm - một công nghệ điều phối container của chính Docker. Sự khác biệt cơ bản là Docker chỉ quản lý 1 node (nhiều container trong 1 node) duy nhất trong khi Kubernetes quản lý 1 cụm các node.
=> Kubernetes có khả năng triển khai rộng rãi hơn, phục vụ cho các sản phẩm thực thế hiệu quả hơn.
Thực tế đã chỉ ra rằng Kubernetes dẫn đầu mọi chỉ số khi so sánh với Docker Swarm:
![](https://images.viblo.asia/18937df8-9694-4e20-a6a8-07d6bbef09a3.png)

# 5. Kubernetes kết hợp với Docker?
Có thể thấy rõ, về cơ bản Kubernetes và Docker hoàn toàn khác biệt. 
- Docker là nền tảng xây dựng, phân phối và chạy cá container.
- Kubernetes là hệ thống điều hành, phối hợp các container để hoạt động hiệu quả trong môi trường thực tế. 

=> Nếu Kết hợp 2 công cụ này với nhau thì sẽ thế nào? Hệ thống mạnh mẽ và tính sẵn sàng cao hơn, vẫn sẽ online ngay cả khi 1 vài nodes đã off. Đồng thời dễ dàng mở rộng khi cần thiết bằng cách kích hoạt nhiều container hơn.

# Kết luận
Kubernetes và Docker đều là những công nghệ khác nhau về cơ bản. Nhưng cả hai lại phối hợp rất tốt với nhau. Tạo điều kiện thuận lợi cho việc quản lý và triển khai các container trong một kiến trúc phân tán.

# Tài liệu tham khảo
* https://azure.microsoft.com/en-us/topic/kubernetes-vs-docker/
* https://www.sumologic.com/blog/kubernetes-vs-docker/