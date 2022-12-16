# So sánh Memcached vs Redis
Cả hai đều mạnh và nhanh, lưu trữ dữ liệu trong bộ nhớ, hữu ích như bộ nhớ đệm. Cả hai đều có thể giúp tăng tốc ứng dụng của bạn bằng cách lưu trữ kết quả cơ sở dữ liệu, các đoạn HTML hoặc bất kỳ thứ gì khác cái mà có thể tốn nhiều chi phí để hoạt động.

Redis giống memcached là memory-mapped, tức là tất cả dữ liệu đc đẩy hết vào RAM (có cách để đẩy vào swap), và cho phép theo một khoảng thời gian thì lưu một bản dump của tất cả dữ liệu vào 1 file.

Redis hơn memcached ở một điểm nữa là cho phép replication. Nhưng kém memcached một điểm là hay bị dùng rất nhiều RAM. Dữ liệu ở file dump tầm khoảng 1GB, nhưng map vào RAM lên tầm 2GB

Memcached thì đơn giản nhất, chỉ có dạng key-value, tất cả dữ liệu lưu trong RAM. Và lưu ý là Memcached chỉ là tầng cache, ko có tính persistent, tức là khó backup dữ liệu, và dữ liệu có thể mất (cái này là tỉ lệ eviction/reclaim xảy ra khi full bộ nhớ, memcached dùng thuật toán đẩy các key ít dùng hoặc key cũ nhất ra). Ngoài ra memcached còn có khái niệm slab, chunk, chunk grow factor, CAS v.v.

Redis thì phức tạp hơn, có nhiều kiểu dữ liệu string, hashes, sets, sorted sets, transaction, pub/sub v.v.. Kiểu string thì giống hết memcached, tức là key-value. Các kiểu kia có đặc trưng khác nhau. Kiểu string cho phép đặt expire time, nếu ko đặt thì key đó sẽ tồn tại mãi mãi.



|    | Memcache |  Redis |
| -------- | -------- |  -------- |
|    | Memcached chỉ caching thông tin. |  Redis cũng thực hiện cache thông tin nhưng có các tính năng bổ sung như persistence and replication     |
|    | Có hỗ trợ chức năng LRU (least recently used) của value     |  Không hỗ trợ chức năng LRU (least recently used) của value     |
|    | Khi tràn bộ nhớ, cái bạn chưa sử dụng gần đây (ít được sử dụng gần đây nhất) sẽ bị xóa     |  Bạn có thể đặt time out cho mọi thứ, khi bộ nhớ đầy, nó sẽ xem xét ba key ngẫu nhiên và xóa khóa gần nhất với thời hạn sử dụng     |
|    | Có hỗ trợ CAS (Check And Set)     |  Redis không hỗ trợ CAS (Check And Set)     |
|    | Trong Memcached, bạn phải serialize các đối tượng hoặc mảng để lưu chúng và để đọc lại chúng, bạn phải un-serialize chúng.|  Redis có cấu trúc dữ liệu mạnh hơn; nó có thể xử lý các chuỗi, hash, list, set, v.v.     |
|    | có độ dài tối đa 250 byte     |  Có độ dài key tối đa 2GB     |
| Sub-millisecond latency | Yes | Yes | 
| Developer ease of use  | Yes | Yes | 
| Data partitioning | Yes | Yes | 
| Support for a broad set of programming languages | Yes | Yes | 
| Advanced data structures | - | Yes | 
| Multithreaded architecture | Yes | - | 
| Snapshots | - | Yes | 
| Replication | - | Yes | 
| Transactions  | - | Yes | 
| Pub/Sub | - | Yes | 
| Lua scripting | - | Yes | 
| Geospatial support | - | Yes | 

**Sub-millisecond latency**

Cả Redis và Memcached đều hỗ trợ thời gian phản hồi dưới một phần nghìn giây. Bằng cách lưu trữ dữ liệu trong bộ nhớ, họ có thể đọc dữ liệu nhanh hơn cơ sở dữ liệu dựa trên disk.

**Developer ease of use**

Cả Redis và Memcached đều dễ sử dụng về mặt cú pháp và yêu cầu một lượng code tối thiểu để tích hợp vào ứng dụng của bạn.

**Data partitioning**

Cả Redis và Memcached đều cho phép bạn phân phối dữ liệu của mình giữa nhiều node. Điều này cho phép bạn mở rộng quy mô để xử lý tốt dữ liệu hơn khi nhu cầu tăng.

**Support for a broad set of programming languages**

Cả Redis và Memcached đều có nhiều ứng dụng client open-source dành cho các developer. Các ngôn ngữ được hỗ trợ bao gồm Java, Python, PHP, C, C ++, C #, JavaScript, Node.js, Ruby, Go và nhiều ngôn ngữ khác. redis hỗ trợ nhiều ngôn ngữ hơn so với memcache

**Advanced data structures**

Ngoài chuỗi, Redis hỗ trợ  lists, sets, sorted sets, hashes, bit arrays, and hyperloglog. Các ứng dụng có thể sử dụng các cấu trúc dữ liệu tiên tiến hơn này để hỗ trợ nhiều trường hợp sử dụng. Ví dụ: bạn có thể sử dụng Redis Sorted Sets để dễ dàng triển khai bảng xếp hạng trò chơi giữ danh sách người chơi được sắp xếp theo thứ hạng của họ.

**Multithreaded architecture**

Vì Memcached là đa luồng, nên nó có thể sử dụng nhiều lõi xử lý. Điều này có nghĩa là bạn có thể xử lý nhiều hoạt động hơn bằng cách tăng công suất tính toán.

**Snapshots**

Với Redis, bạn có thể giữ dữ liệu của mình trên disk với snapshot theo thời gian có thể được sử dụng để lưu trữ hoặc khôi phục.

**Replication**

Redis cho phép bạn tạo nhiều bản sao của chính Redis. Điều này cho phép bạn mở rộng quy mô đọc cơ sở dữ liệu và có các clusters khả dụng cao.

**Transactions**

Redis hỗ trợ các giao dịch cho phép bạn thực hiện một nhóm lệnh dưới dạng hoạt động độc lập và atomic.

**Pub/Sub**

Redis hỗ trợ nhắn tin Pub / Sub  khớp với pattern mà bạn có thể sử dụng cho các phòng trò chuyện hiệu suất cao, real-time comment streams, social media feeds và sever intercommunication.

**Lua scripting**

Redis cho phép bạn thực hiện các transactional Lua script. Các tập lệnh có thể giúp bạn tăng hiệu suất và đơn giản hóa ứng dụng của bạn.

**Geospatial support**

Redis có các lệnh được xây dựng có mục đích để làm việc với dữ liệu không gian địa lý real-time ở quy mô. Bạn có thể thực hiện các thao tác như tìm khoảng cách giữa hai yếu tố (ví dụ: người hoặc địa điểm) và tìm tất cả các yếu tố trong khoảng cách nhất định của một điểm.

## Tốc độ đọc / ghi
 Cả hai đều cực kỳ nhanh. Benchmarks thay đổi theo khối lượng công việc, phiên bản và nhiều yếu tố khác nhưng thường cho thấy redis sẽ nhanh hoặc gần như nhanh bằng memcached. Tôi tiến cử nên dùng redis, nhưng không phải vì memcached chậm. Không phải vậy.
##  Sử dụng bộ nhớ:
Redis tốt hơn.

* **memcached**: Bạn chỉ định kích thước bộ nhớ đệm và khi bạn chèn các item,  tiến trình nền sẽ nhanh chóng tăng lên một chút so với kích thước này. Thực sự không có cách nào để lấy lại bất kỳ không gian nào, thiếu khởi động ở memcached. Tất cả các key của bạn có thể hết hạn, bạn có thể xóa cơ sở dữ liệu và nó vẫn sẽ sử dụng toàn bộ khối RAM mà bạn đã định dạng.

* **redis:** Cài đặt kích thước tối đa là tùy thuộc vào bạn. Redis sẽ không bao giờ sử dụng nhiều hơn nó phải có và sẽ trả lại cho bạn bộ nhớ mà nó không còn sử dụng nữa.

* Tôi đã lưu trữ 100.000 ~ 2KB các chuỗi (~ 200MB) những câu ngẫu nhiên vào cả hai. Sử dụng RAM Memcached tăng lên ~ 225MB. Sử dụng lại RAM đã tăng lên ~ 228 MB. Sau khi xóa cả hai, redis giảm xuống ~ 29MB và memcached vẫn ở mức ~ 225MB. Chúng có hiệu quả tương tự trong cách chúng lưu trữ dữ liệu, nhưng chỉ có một cái có khả năng lấy lại dữ liệu.

## Disk I/O dumping: 
Một chiến thắng rõ ràng cho redis vì nó làm điều này theo mặc định và có persistence cao về cấu hình. Memcached không có cơ chế để dumping to disk mà không có công cụ thứ 3.
## Scaling:
Cả hai cung cấp cho bạn hàng tấn khoảng trống trước khi bạn cần nhiều hơn một instance dưới dạng cache. Redis bao gồm các công cụ để giúp bạn vượt qua điều đó trong khi memcached thì không.

# Nguồn
https://aws.amazon.com/elasticache/redis-vs-memcached/

Và một nguồn khác nữa...