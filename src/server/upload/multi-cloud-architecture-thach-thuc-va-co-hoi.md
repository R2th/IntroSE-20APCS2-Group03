Heylooo, lâu lắm mới lại có hứng viết blog. Nay gặp được câu hỏi nho nhỏ về multi-cloud của một ngừi anh phương xa, tiện đây note luôn 1 bài về chủ đề này về sau còn có cái lục lại khi cần.

Cloud thì không ai lạ lùng gì nữa, đây là xu hướng công nghệ không mới nhưng sẽ là xu thế chuyển dịch của các doanh nghiệp. Theo đó, với các tính năng mạnh mẽ mà Cloud đem lại, các doanh nghiệp đang chuyển dịch dần từ `on-premise DC` sang `Cloud DC`.
Hiện nay, có khá nhiều `Cloud Provider` trong đó nổi bật phải kể đến AWS, Google Cloud, Microsoft Azure, Alibaba, IBM, Oracle, Digital Ocean...

Việc triển khai ứng dụng trên một `Cloud Platform` duy nhất có thể đem đến một số rủi ro cho các công ty, tổ chức với quy mô toàn cầu. Do đó, việc triển khai `Multi-Cloud` xuất hiện như một tất yếu.

# Tại sao phải sử dụng kiến trúc Multi-Cloud
`Multi-Cloud` hiểu đơn giản là việc sử dụng nhiều `Cloud Platform` cùng lúc. Một số lý do cơ bản mà các tổ chức quy mô toàn cầu cần phải thiết kế ứng dụng theo kiến trúc `Multi-Cloud` như sau:
- Khách hàng phân bố trên toàn cầu và tập khách hàng phân bố trên nhiều khu vực mà ở đó chỉ có một số ít Cloud DC của một số `Cloud Provider`.
- Tổ chức đối mặt với các quy định ràng buộc trên các khu vực khác nhau trên thế giới. Ví dụ: GDPR - EU...
- Tổ chức yêu cầu nghiêm ngặt về kiến trúc multi-DC, multi-vendor nhằm tránh rủi ro phụ thuộc vào vendor duy nhất.
- Tối ưu hóa chi phí sử dụng
- Một số yêu cầu đặc thù của Business hoặc của hệ thống ứng dụng (low latency...)

Ngoài những lý do cơ bản trên, mỗi tổ chức sẽ có những yêu cầu đặc thù; theo đó sẽ phát sinh nhiều lý do khác để tổ chức cân nhắc việc triển khai theo kiến trúc `Multi-Cloud`.
# Pros & Cons
|                     |                                                        Điểm mạnh                                                        |                             Điểm yếu                            |
|---------------------|:-----------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------:|
| **Lợi   ích tính năng** | Tận dụng những tính năng tốt nhất của mỗi `Cloud Platform` đáp   ứng nhu cầu của tổ chức                                | Việc thiết kế ứng dụng phức tạp hơn                             |
|**Tính   toàn vẹn**     | Giảm thiểu rủi ro `supply   chain` nếu chỉ phụ thuộc vào một `Cloud Platform` duy nhất                                 | Rủi ro về bảo mật do `attack surface` bị mở rộng                |
| **Tính   kinh tế**      | Tối ưu chi phí dựa trên   việc cân nhắc sử dụng dịch vụ của các `Cloud Platform` khác nhau với các mức   giá tối thiểu | Công tác quản lý chi phí, tối ưu hóa trở nên vô cùng quan trọng |
| **Tính   hiệu quả**     | Tận dụng sự phân bố về   mặt địa lý của `Cloud Platform` để đem đến dịch vụ với độ trễ thấp cải thiện   trải nghiệm    | Khó khăn trong việc quản trị hạ tầng đa nền tảng                |
| **Tính   Sẵn sàng**     | Cải thiện khả năng phục hồi thảm họa                                                                                    |                                                                 |

# Multi-Cloud Connectivity
Với kiến trúc Multi-Cloud, yêu cầu về việc giảm thiểu độ trễ cũng như quản lý kết nối một cách linh hoạt là một vấn đề quan trọng.

Hình dưới mô tả tổng quan về các kết nối trong kiến trúc Multi-Cloud đối với các doanh nghiệp đã có sẵn hạ tầng on-premise và trong quá trình chuyển dịch:
- Site-to-site
- Site-to-cloud
- Cloud-to-cloud

<p align="center">
  <img src="https://images.viblo.asia/4a56a991-27d0-4cdd-be32-7ba97b711ae4.jpg">
</p>

Mỗi nền tảng Cloud đều cung cấp kết nối `dedicated connection` riêng biệt phục vụ kết nối trực tiếp từ on-premise  đến `Cloud Provider`:
- **Amazon AWS Direct Connect**
- **Google Cloud Dedicated Interconnect**
- **Microsoft Azure ExpressRoute**

Trên thực tế, khi triển khai `Multi-Cloud` các doanh nghiệp thường không `prefer` phương án triển khai riêng biệt các kết nối đến từng `Cloud Provider` mà sẽ sử dụng các giải pháp phục vụ thiết lập, quản lý tập trung tại một điểm duy nhất.

## Site-to-site và Site-to-cloud
Giải pháp phục vụ cho 2 kết nối này được biết đến với cái tên `Software-Defined Cloud Interconnect (SDCI)` với sự kết hợp giữa 2 thành phần chính:
- Mạng lưới SASE (Secure Access Service Edge) POPs
- SD-WAN (Software-Defined WAN)

Theo đó, SASE sẽ cung cấp nền tảng Security cho phép quản trị các tính năng Security bao gồm:
- Access Control
- IPS/IDS
- DLP
- Web Filtering

SD-WAN cung cấp các tính năng cho phép tối ưu hóa việc lựa chọn đường truyền đảm bảo các kết nối ở trạng thái tốt nhất.

<p align="center">
  <img src="https://images.viblo.asia/8255d891-4bf7-4df1-8326-4c5346a94581.jpg">
</p>

## Cloud-to-cloud
Đối với các kết nối Cloud-to-cloud, có thể có 2 sự lựa chọn:
- Khởi tạo VPN Site-to-Site giữa các `Cloud Provider`, tuy nhiên điểm yếu là sự linh hoạt.
- Sử dụng giải pháp Cloud-to-cloud thương mại. Ví dụ: [BSO](https://www.bso.co/bso-network/low-latency-cloud-to-cloud)

<p align="center">
  <img src="https://images.viblo.asia/c3c4cdbd-3afd-40b9-8389-5e5c42c6135a.png">
</p>

# Kiến trúc ứng dụng Multi-Cloud
Việc xây dựng, thiết kế kiến trúc ứng dụng `Multi-Cloud` dựa vào các yêu cầu Business và yêu cầu kỹ thuật. Ta có thể nhìn vào một kiến trúc đơn giản nhất của một ứng dụng:

<p align="center">
  <img src="https://user-images.githubusercontent.com/44463004/157612958-1fc2b6ce-2174-4bde-9aac-3dbc769cba3f.jpg">
</p>

Về cơ bản, sẽ có một số hướng thiết kế như sau:
- Phân tách theo chiều ngang trên các `Cloud Platform` khác nhau.
- Phân tách theo chiều dọc trên các `Cloud Platform` khác nhau.
- Phân tách theo nghiệp vụ Business

## Phân tách theo chiều ngang
<p align="center">
  <img src="https://user-images.githubusercontent.com/44463004/157620219-d52fbc21-c146-4251-98f9-4c72ac5c26a3.jpg">
</p>
Với mô hình này, mỗi Tier ứng dụng được deploy trên các `Cloud Platform` khác nhau.
Việc lựa chọn `Cloud Platform` cho mô hình này thường dựa vào 2 yếu tố:

- Chi phí sử dụng
- Tính năng dịch vụ: tính năng ở đây có thể hiểu là các tính năng vượt trội như cung cấp API phục vụ automation; cung cấp khả năng mã hóa mạnh....

## Phân tách theo chiều dọc
<p align="center">
  <img src="https://user-images.githubusercontent.com/44463004/157627122-bb59fc16-8e76-4902-aa04-a6564d5be80c.jpg">
</p>
Với mô hình này, tính sẵn sàng được đề cao do đó các yếu tố về chi phí và tính năng dịch vụ thường sẽ không xem xét đến.
Ngoài ra, cơ chế cân bằng tải cần đảm bảo đủ thông minh phục vụ giảm thiểu downtime dịch vụ.

## Phân tách theo nghiệp vụ Business
Một số tổ chức đặc thù có những yêu cầu đặc biệt, điều này sẽ ảnh hưởng trực tiếp đến thiết kế hệ thống ứng dụng.
Một số ví dụ cụ thể:
- Các tổ chức tài chính ngân hàng cần phải tuân thủ PCI-DSS, tuân thủ luật pháp của các khu vực trên thế giới.
- Đáp ứng yêu cầu dịch vụ có độ trễ thấp
- Đáp ứng yêu cầu một số yêu cầu kỹ thuật cụ thể như toàn vẹn dữ liệu...

Mô hình dưới là một ví dụ về `cold backup` sang một `Cloud Platform` khác phục vụ khắc phục thảm họa.

<p align="center">
  <img src="https://docs.rightscale.com/img/cm-system-architecture-8.png">
</p>

Mô hình dưới là ví dụ về việc xây dựng ứng dụng có độ trễ thấp dựa trên việc xây dựng theo kiến trúc Cloud Edge trong đó, mỗi node edge được build trên các `Cloud Platform` khác nhau.

Mỗi node edge được phân bố trên toàn thế giới đảm bảo gần khách hàng nhất nhằm cung cấp độ trễ thấp nhất khi khách hàng sử dụng dịch vụ. (VD: Netflix, Youtube...)

<p align="center">
  <img src="https://www.researchgate.net/profile/Sumit-Maheshwari-6/publication/328096627/figure/fig4/AS:728228301905923@1550634565988/Edge-Cloud-Network-Topology-Processing-speed-s-p-Processor-speed-in-GIPS-RAM-m.ppm">
</p>

# Thách thức
Với kiến trúc `Multi-Cloud` kèm thêm đó là những nền tảng hạ tầng mới như `Container Infrastructure` `Container Orchestration` thì độ phức tạp của hạ tầng ngày càng tăng cao.

Việc này đặt ra một số vấn đề cần phải giải quyết như sau:

## Automation phải được đề cao
Theo đó việc tự động hóa các công việc vận hành, phát triển phải được triển khai một cách triệt để vận dụng các quy trình:
- DevOps
- GitOps
- CloudOps

## Kiểm soát, quản lý tài nguyên một cách hiệu quả
Cloud cung cấp các tính năng `auto-scaling` `auto-provisioning` mạnh mẽ cho phép co dãn ứng dụng đảm bảo hiệu năng, tính sẵn sàng cho ứng dụng.

Tuy nhiên, việc quản lý tài nguyên được tạo ra hay hủy bỏ trên Cloud trở nên rất quan trọng nhằm tối ưu chi phí cho tổ chức. Vấn đề này được mô tả bằng khái niệm `Cloud Sprawl` đề cập đến vấn đề `out-of-control` việc `provision` và `de-provision` tài nguyên trên Cloud.

Việc này đặt ra một bài toán `auto-discovery` nhằm thu thập toàn bộ tài nguyên đang sử dụng trên Cloud.
Giải pháp có thể giải quyết được vấn đề này đó là `Configuration Management Database (CMDB)` với các tính năng cho phép quản lý toàn bộ tài sản của tổ chức và quan trọng nhất là `auto-discovery` tài nguyên IT bao gồm: IP, VM, Container....

<p align="center">
  <img src="https://docs.servicenow.com/bundle/sandiego-it-operations-management/page/product/discovery/image/DiscoveryCommunicationsDiagram.png">
</p>

## Kiến trúc phức tạp
Ứng dụng xây dựng theo kiến trúc `Multi-Cloud` dẫn đến sự phức tạp về flow dịch vụ, kèm theo đó sự phát triển của `microservice` dẫn đến sự phân tán rất lớn về components, flow.

Bài toán đặt ra cần một công cụ cho phép `Visualize` toàn bộ network, application, flow dịch vụ cung cấp cái nhìn toàn cảnh dịch vụ.
`CMDB` cũng cung cấp tính năng này dựa trên `auto-discovery` cho phép `visualize`:
- Tài nguyên trên Cloud Platform
- Tài nguyên Container Kubernetes
- Application Topology
- Network Topology
- Hypervisor Topology

<p align="center">
  <img src="https://blog.opsramp.com/hs-fs/hubfs/Blog_images/Topology%20Blog/Blog_App_Topology.jpg?width=974&name=Blog_App_Topology.jpg">
  <img src="https://blog.opsramp.com/hs-fs/hubfs/Blog_images/Topology%20Blog/Blog_Network_Topology.jpg?width=974&name=Blog_Network_Topology.jpg">
  <img src="https://blog.opsramp.com/hs-fs/hubfs/Blog_images/Topology%20Blog/AWS%20topology_blog.jpg?width=934&name=AWS%20topology_blog.jpg">
</p>

## Compliance & Security
Việc xây dựng ứng dụng trên nhiều `Cloud Platform` đặt ra bài toán về việc xây dựng chính sách cho mỗi nền tảng. 

Tuy nhiên, việc xây dựng và kiểm soát các chính sách trên nhiều nền tảng có thể gây ra tình trạng `out-of-control`. Thêm vào đó việc kiểm soát cả chính sách cho hạ tầng `on-premise` (nếu có) sẽ làm gia tăng sự phân tán chính sách gây khó khăn cho việc quản trị, audit, tối ưu.

Để giải quyết vấn đề này có 2 việc cần được chú ý:
- Xây dựng chính sách chung cho tất cả `Cloud Platform`.
- Sử dụng công cụ tập trung cho phép quản lý, tối ưu trên một giao diện duy nhất.

Việc xây dựng chính sách chung tùy theo từng tổ chức và kiến trúc đang sử dụng thường sẽ có các chính sách sau:
- Access Control
- Detecttive Control
- Preventive Control
- Corrective Control
- Legal, regulatory and compliance control

Sau khi xây dựng chính sách, cần một công cụ quản lý tập trung. Một số công cụ cho phép thực hiện việc đó bao gồm:
- Cloud Access Security Broker - CASB: hướng đến kiểm soát việc truy cập vào Cloud
- Cloud management platform - CPMs: hướng đến kiểm soát automation, lifecycle, deployment
- Cloud Service Broker - CSBs: hướng đến kiểm soát việc trao đổi dữ liệu giữa các Cloud và giữa Cloud với các External Services.

# Kết luận
Việc chuyển dịch `Multi-Cloud` cần một chiến lược dài hạn để xây dựng môi trường đảm bảo:
- Hiệu quả chi phí
- Hiệu quả hoạt động
- Hiệu quả vận hành
- Đảm bảo an toàn dữ liệu

Với những lợi ích `Multi-Cloud` có thể đem lại việc chuyển dịch sẽ là tất yếu và `Cloud Provider` cũng đang hướng đến xây dựng các `Cloud Platform` với độ linh hoạt cao nhằm đáp ứng các yêu cầu của doanh nghiệp.

Phần chém bão đến đây là hết, mong anh/chị/em đi qua đi lại cho một vài góp ý để tôi có thể hoàn thiện hơn trong các bài viết sau.

Chân thành cảm ơn!