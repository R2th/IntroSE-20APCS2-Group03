## Caching là gì?

**Caching** là một kỹ thuật tăng độ truy xuất dữ liệu và giảm tải cho hệ thống. Cache là nơi lưu tập hợp các dữ liệu, thường có tính chất nhất thời, cho phép sử dụng lại dữ liệu đã lấy hoặc tính toán trước đó, nên sẽ giúp tăng tốc cho việc truy xuất dữ liệu ở những lần sau.

## Caching hoạt động như thế nào?

Dữ liệu trong cache (bộ đệm) thường được lưu trữ trong **RAM** (Random-access memory). Mục đích chính của cache là tăng hiệu suất truy xuất dữ liệu. Cache thường lưu trữ một tập hợp con dữ liệu tạm thời. 

### RAM và In-Memory Engines

Do tốc độ request cao hoặc IOPS (Input/Output operations per second) được hỗ trợ bởi **RAM** và **In-Memory engines**, cache giúp cải thiện hiệu suất truy xuất dữ liệu và giảm chi phí scale. Để scale với hệ thống database và phần cứng truyền thống, cần khá nhiều tài nguyên. Và điều này có thể đội giá chi phí lên mà vẫn không thể đạt được hiệu suất nhanh chóng (ít độ trễ khi lấy data) như việc dùng In-Memory cache.


### Applications: 
Cache có thể được áp dụng và triển khai trong các tầng khác nhau bao gồm: Operating Systems, Networking chứa Content Delivery Networks (CDN) và DNS, web applications, và Databases. Sử dụng cache giảm đáng kể độ trể và cải thiện IOPS cho các ứng dụng có workload nhiều như: Q&A portals, gaming, phương tiện chia sẻ, và mạng xã hội. Thông tin được lưu trong cache có thể là kết quả truy vấn cơ sở dữ liệu, API requests/responses và HTML, JavaScript, và các file ảnh của trang web. Tính toán workloads thao tác với data set, chẳng hạn như tính toán performance cao cũng được hưởng lợi từ tầng In-Memory data tương tự như cache. Trong các ứng dụng này, các data set rất lớn phải được truy cập theo thời gian thực trên các máy có thể scan với hàng trăm nodes. Do tốc độ của phần cứng còn chậm nên việc thao tác với data trong disk-based store là một yếu tố hết sức quan trọng cho các ứng dụng này.

### Design Patterns

Trong môi trường điện toán phân tán DCE (distributed computing environment), caching cho phép các hệ thống và ứng dụng chạy độc lập và không ảnh hưởng tới cache. Cache đóng vai trò là lớp trung gian có thể được truy cập từ các hệ thống khác nhau với cấu trúc liên kết vòng đời và cấu trúc riêng của nó. Điều đặt biệt này có liên quan đến các node có thể tự động scales trong một hệ thống. Nếu cache cùng nằm trên 1 node với ứng dụng hoặc hệ thống sử dụng nó, việc scale có thể ảnh hưởng tới tính toàn vẹn của cache. Khi local cache được sử dụng, chúng chỉ có ích cho local application truy xuất dữ liệu. Trong môi trường điện toán phân tán, data có thể sử dụng trên nhiều cache servers và được lưu trữ ở vị trí trung tâm vì sẽ có ích cho tất cả những nơi dùng dữ liệu đó. 

### Caching Best Practices

Khi thực thi một lớp cache, điều quan trọng để hiểu được tính hợp lệ của data được lưu trữ. Kết quả cache successful dẫn đến tỷ lệ hợp lệ cao, có nghĩa là data đã tồn tại trước khi được fetch. Cache xảy ra lỗi khi data fetched không có trong cache. Các điều khiển như TTLs (Time to live) có thể thiết lập thời gian tồn tại cho data tương ứng. Liệu cache environment cần phải có tính có sẵn cao hay không, điều này có thể được thỏa mãn bởi các  In-Memory engines như Redis. Trong một số trường hợp, lớp In-memory có thể được dùng như lớp lưu trữ data độc lập, trái ngược với data được lưu trữ ở một vị trí chính. Trong phần này, điều quan trọng là xác định RTO (Recovery Time Objective) - thời gian cần thiết để khôi phục sau khi ngưng hoạt động, và RPO (Recovery Point Objective) - điểm cuối cùng hoặc giao dịch được ghi lại trong quá trình khôi phục, dữ liệu trong In-Memory engine để xác định xem có phù hợp hay không. Việc thiết kế và đặc điểm của các In-Memory engine khác nhau có thể được áp dụng để đáp ứng hầu hết các yêu cầu của RTO và RPO.

![](https://images.viblo.asia/d838c5ca-42a6-4904-9cab-9ba1e3ec0690.png)


| Layer | Client-Side | DNS | Web | App | Database |
| -------- | -------- | -------- | -------- | -------- | -------- |
| Use Case | Tăng tốc độ truy xuất nội dung web từ các trang web (browser hoặc device) | Độ phân giải tên miền đến IP | Tăng tốc độ truy xuất nội dung web từ  web / app servers. Quản lý web sessions (phía server) |  Tăng hiệu suất ứng dụng và truy cập dữ liệu | Giảm độ trể khi truy vấn cơ sở dữ liệu |
| Technologies | HTTP Cache Headers, Browsers | DNS Servers | HTTP Cache Headers, CDNs, Reverse Proxies, Web Accelerators, Key/Value Stores | Key/Value data stores, Local caches | Database buffers, Key/Value data stores |
| Solutions |  Browser cụ thể | [Amazon Route 53](https://aws.amazon.com/vi/route53/) | [Amazon CloudFront](https://aws.amazon.com/vi/cloudfront/), [ElastiCache for Redis](https://aws.amazon.com/vi/elasticache/redis/), [ElastiCache for Memcached](https://aws.amazon.com/vi/elasticache/memcached/), [Partner Solutions](https://aws.amazon.com/marketplace/) | Application Frameworks, [ElastiCache for Redis](https://aws.amazon.com/vi/elasticache/redis/), [ElastiCache for Memcached](https://aws.amazon.com/vi/elasticache/memcached/), [Partner Solutions](https://aws.amazon.com/marketplace/) | [ElastiCache for Redis](https://aws.amazon.com/vi/elasticache/redis/), [ElastiCache for Memcached](https://aws.amazon.com/vi/elasticache/memcached/)
 |
 
##  Caching với Amazon ElastiCache

[Amazon ElastiCache](https://aws.amazon.com/vi/elasticache/) là web service làm dễ dàng hơn cho việc deploy, vận hành, và mở rộng data lưu ở In-memory hoặc bộ nhớ cache trong clond. Dịch vụ này cải thiện performance của web applications bằng cách cho phép bạn truy xuất thông tin từ các in-memory data stores nhanh hơn, thay vì dựa hoàn toàn vào cơ sở dữ liệu trên disk-based.

## Lợi ích của caching

* Cải thiện hiệu suất của ứng dụng
* Giảm chi phí cho việc thiết lập cơ sở dữ liệu
* Cải thiện khi thời gian xử lý tăng đột biến trong lúc dùng ứng dụng
* Giảm tải cho backend
* Tăng thông lượng đọc (IOPS)