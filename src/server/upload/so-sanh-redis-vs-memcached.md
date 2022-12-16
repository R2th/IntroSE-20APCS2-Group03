Bộ nhớ đệm là một bước quan trọng trong việc tăng hiệu năng của nhiều ứng dụng. Khó có thể nói bộ nhớ đệm nào là tốt nhất nhưng ta có thể thấy hai ứng cử viên có khả năng thường xuyên xuất hiện trong quá trình tìm kiếm câu trả lời là **Redis** vs **Memcached**. Hãy cùng xem chúng khác biệt gì nhé.

## Redis là cái gì ?
Redis = Remote Dictionary Server

Dịch nôm na nó là 1 máy chủ lưu trữ dạng từ điển. Dạng từ điển là như nào ? Nó là kiểu bạn muốn tìm nghĩa của từ "abc" thì bạn sẽ tìm trong từ điển từ đó ứng với nghĩa gì. 
VD: abc: ăn bánh cuốn. (cách ly mãi thèm bánh cuốn zl :( )

Giải thích theo tech thì nó là 1 thứ dùng RAM để lưu trữ dữ liệu theo kiểu cặp key - value. Mỗi key sẽ trỏ đến 1 giá trị tương ứng. Hiểu đơn giản là vậy. Redis có nhiều kiểu data như là: List, Sets và Hashes, ... ( [tìm hiểu thêm tại đây](https://www.w3resource.com/redis/redis-data-types.php) )

Chính vì redis dùng RAM để lưu trữ nên nó có tốc độ truy xuất rất nhanh. Ấy nên nó luôn là một trong những sự lựa chọn hàng đầu khi ứng dụng của chúng ta cần truy xuất và nhận về data với tốc độ cao.

## Memcached là cái gì ?
[Memcached’s website](https://memcached.org/) miêu tả Memcached như một mã nguồn mở miễn phí về hệ thống bộ nhớ đệm đối tượng phân tán. Tương tự như Redis, Memcached cũng lưu trữ dưới dạng cặp key - value trong bộ nhớ RAM nên cũng có tốc độ truy xuất cực kỳ nhanh. Điều này khiến cho Memcached là một lựa chọn khác cho phép trả về data với tốc độ cao. Memcached cũng là đa luồng, nghĩa là hiệu năng có thể được cải thiện đáng kể khi ứng dụng chạy trên nhiều cores.

## Redis Vs Memcached

### 1. Điểm chung

Về mặt giá trị thì chúng khá giống nhau. chúng đều:

- Lưu trữ ở bộ nhớ đệm, nên có tốc độ truy xuất cực kỳ nhanh => phù hợp với mục tiêu để cache.
- Là dạng lưu trữ NoSQL, lưu trữ data với cặp key - value
- Là mã nguồn mở, với các hướng dẫn đầy đủ.

Tuy nhiên, nếu chúng ta tìm hiểu sâu hơn thì sẽ phải cân nhắc để quyết định xem chúng có những tính năng nào phù hợp với nhu cầu của mình.

### 2. Điểm khác biệt

Có một số điểm khác biệt chính giữa Redis và Memcached cần được đề cập. Những khác biệt này rất cụ thể về cách Redis và Memcached xử lý dữ liệu mà chúng lưu vào bộ nhớ đệm và cách chúng có thể xử lý nó trên quy mô lớn.

#### **Data Types**

Khi lưu trữ data, Redis lưu trữ data với các kiểu [data đặc thù](https://redis.io/topics/data-types). Ngược lại thì **Memcached** lại chỉ lưu trữ data dưới dạng **String** (chuỗi) mà thôi. Chính vì điều này, **Redis** có thể thay đổi data ngay tại nơi chúng lưu trữ thay vì tải lên lại và lưu 1 cái mới. Điều này sẽ giảm tại cho hệ thống mạng rất nhiều nếu dữ liệu lớn và nhiều. 

####  **Persistence**

Redis cho phép duy trì ổn định trên ổ đĩa, có nghĩa là dữ liệu trong cơ sở dữ liệu của **Redis** có thể được lưu trữ và phục hồi trong trường hợp máy chủ Redis gặp sự cố hoặc được khởi động lại. Trong khi bộ nhớ với tốc độ rất nhanh, nó có cảnh báo rằng nếu máy chủ gặp sự cố, dữ liệu trên bộ nhớ sẽ bị mất. Độ ổn định của Redis không giữ an toàn cho dữ liệu 100%, tùy thuộc vào loại persistence được sử dụng, có thể có từ vài giây đến vài phút dữ liệu bị thay đổi, nhưng có vẫn tốt hơn là không có. **Memcached** không có khả năng lưu trữ nguyên bản trên đĩa. **[Instacluster](https://www.instaclustr.com/support/documentation/redis/using-redis/)** cho phép hoạt động bền bỉ như mặc định, đảm bảo rằng ngay cả một cụm mới cũng có thể phục hồi sau sự cố ngừng hoạt động, với các nút khởi động lại bằng “warm cache” (cache nóng hổi hay hiểu là cache mới được lưu trữ ngay trước lúc đó). Có hai cách khác nhau để duy trì dữ liệu trong **Redis**: 

- **AOF Log** - Append Only File: hoạt động bằng cách thêm tất cả các hoạt động ghi mà máy chủ nhận được. AOF Log lưu trữ tất cả các lệnh này ở cùng một định dạng mà Redis nhận được, có nghĩa là chúng có thể được phát lại trở lại phiên bản lúc khởi động để tạo lại trạng thái hiện tại. AOF Log có thể được cấu hình để ghi vào ổ đĩa theo một số cách khác nhau, tất cả đều có những ưu và nhược điểm riêng. AOF có thể được định cấu hình để tuôn ra (nghĩa là ghi bộ đệm vào ổ đĩa) mọi hoạt động Redis nhận được, cứ sau một giây, hoặc thường xuyên như được định cấu hình trong hệ điều hành chủ — thường là khoảng 30 giây đối với Linux. Redis khuyên nên ghi một lần mỗi giây, vì đây là sự cân bằng tốt giữa ghi đĩa (tốc độ chậm) và bảo mật dữ liệu (lượng dữ liệu có thể bị mất trong trường hợp toang).

- **RDB Snapshot**: RDB là viết tắt của Redis Database Backup file, là một cách để chụp lại 1 bản snapshot toàn bộ trạng thái Redis hiện tại. RDB là một cách nhỏ gọn để lưu trữ trạng thái Redis hiện tại trong một tệp có thể được chuyển đi nơi khác (nghĩa là ngoại vi để khôi phục). RDB hoạt động bằng cách tạo một tiến trình con của cá thể Redis và để tiến trình con hoàn thành việc sao lưu. Có nghĩa là quy trình Redis chính không bị mất việc tạo tệp RDB và ghi vào đĩa, để nó tự do thực hiện công việc Redis bình thường. RDB cũng hoạt động tốt với các tập dữ liệu lớn qua AOF Log, vì nó không phải chạy lại từng dòng từng dòng một.

#### **Data Length**

Dữ liệu keys và string trong **Redis** có thể lên đến 512 MB (megabytes) mặc dù không khuyến cáo lưu string dài đến mức này :v 
Nhưng vì chúng là kiểu binary nên bạn có thể lưu trữ bất kỳ loại data nào, kể cả ảnh JPEG. 

**Memcached** chỉ hỗ trợ  với keys là 250 bytes và values được cấp phát giới hạn là 1 MB (default) (có thể thay đổi bằng setting). 

Như vậy nếu data object lớn thì **Redis** sẽ là lựa chọn tốt hơn so với **Memcached**

#### Data Eviction Policies - chính sách thu hồi dữ liệu

Vì bộ nhớ là hữu hạn trên máy chủ, dữ liệu cũ trong bộ nhớ cache phải được tự động 'loại bỏ' khỏi bộ nhớ để nhường chỗ cho dữ liệu mới. Điều này được xử lý thông qua một quá trình gọi là loại bỏ dữ liệu. Cả Redis và Memcached đều có cách xử lý vấn đề này, tuy nhiên không phải lúc nào chúng cũng giống nhau. Một cách phổ biến để loại bỏ dữ liệu được gọi là Ít được sử dụng gần đây — loại bỏ dữ liệu gần đây không được sử dụng. Nếu dữ liệu bị tấn công, nó được ghi nhận, có nghĩa là nó sẽ không phải là ứng cử viên để loại bỏ. Đây là cách duy nhất mà Memcached hoạt động. Tuy nhiên, Redis đưa ra một số cách khác để giải quyết việc loại bỏ dữ liệu, chẳng hạn như No Eviction trong đó Redis chỉ để bộ nhớ đầy và sau đó không lấy bất kỳ phím nào nữa và Volatile TTL (Time to Live), nơi Redis sẽ cố gắng xóa các khóa có bộ TTL trước, trong nỗ lực bảo toàn dữ liệu không được chú thích bằng TTL được dùng để tồn tại lâu hơn.

#### Replication - bản sao

Bản mô phỏng là một cách để sao chép dữ liệu từ instance này sang instance khác tạo ra một bản sao. Mục đích là để đảm bảo một bản sao dữ liệu trùng lặp được giữ trong một phiên bản khác, trong trường hợp phiên bản chính gặp sự cố. Redis hỗ trợ sao chép nguyên bản và có thể sao chép trong bản chính để theo kịp. Các phiên bản Redis cũng có thể có nhiều hơn một bản sao để bổ sung dự phòng. Memcached không hỗ trợ sao chép mà không có phần mềm của bên thứ ba.

#### Clustering - phân cụm

Phân cụm là một cách đảm bảo tính sẵn sàng cao của một service bằng cách tạo ra một số instances và kết nối chúng với nhau để tạo thành một cụm. Việc tạo các cụm đôi khi có thể khó thiết lập và quản lý khi phần mềm không được thiết kế cho nó. Là một giải pháp cho bộ nhớ đệm có thể mở rộng, Redis cung cấp Redis Cluster, cho phép các tính năng phân cụm cho Redis.

Có nhiều lợi ích khi sử dụng Redis trong một cụm thay vì chỉ là một instance độc lập:

- **Performance - hiệu năng**: Redis sẽ được cải thiện hiệu suất khi tải từ clients được trải rộng trên nhiều cụm. Trình điều khiển nhận biết cụm hiểu dữ liệu đang ở trên nút nào và kết nối trực tiếp với nút đó.
- **Availability - độ khả dụng**: Sử dụng kết hợp replication cùng với clustering cho phép tính sẵn sàng cao cho các ứng dụng. Redis Cluster có thể được thiết lập với một loạt các instance chính và các bản sao được kết nối. Nếu một bản chính duy nhất ngoại tuyến trong cụm, nó có thể chuyển đổi dự phòng và bản sao sẽ tự động được thăng cấp thành bản chính trong cụm. Khi bản sao bị lỗi trực tuyến trở lại, nó sẽ tự động đồng bộ hóa dưới dạng bản sao cho bản chính mới. Bản sao có thể được giữ trong các ngăn chứa riêng biệt để dự phòng.
- **Pricing and Scalability - chi phí và độ khả năng mở rộng**: Vì Redis chuyên sâu về bộ nhớ, phân cụm cho phép khả năng mở rộng theo chiều ngang, trong đó tải được dàn trải trên nhiều phiên bản có dấu chân bộ nhớ nhỏ hơn, thay vì một phiên bản duy nhất có nhiều bộ nhớ. Trong một phiên bản ứng dụng máy chủ truyền thống, để có được hiệu suất tốt hơn từ ứng dụng, bạn có thể tăng tài nguyên hệ thống thông qua mở rộng theo chiều dọc. Tại một số thời điểm, mặc dù hệ thống sẽ bị giới hạn bởi sự sẵn có của công nghệ để tăng kích thước của máy chủ hoặc, trong trường hợp có khả năng hơn, việc tăng tài nguyên máy không còn hiệu quả về chi phí nữa. Giải pháp thay thế chính cho điều này được gọi là chia tỷ lệ ngang, trong đó các máy chủ có tài nguyên nhỏ hơn được nhóm lại với nhau trong một cụm. Cụm sẽ có hiệu suất tương tự hoặc tốt hơn như mở rộng theo chiều dọc với chi phí nhỏ hơn. Chia tỷ lệ theo chiều ngang có thể đặc biệt quan trọng đối với Redis, vì bộ nhớ rất tốn kém khi kích thước tăng lên.

#### Multithreading

Memcached trước đây có lợi thế hơn Redis ở tốc độ đa luồng. Điều này có nghĩa là trong một số tình huống nhất định, Memcached có thể làm tốt hơn Redis. Tuy nhiên, kể từ Redis 6, đa luồng được hỗ trợ trong Redis và do đó, khối lượng công việc đa luồng sẽ được cải thiện.

Memcached vs Redis – So sánh các tính năng:
![](https://images.viblo.asia/35a76a99-eb2f-4dbc-bb43-ed5b372b5df7.jpg)

#### Dùng Memcached khi nào

Theo thiết kế, Memcached rất đơn giản để thiết lập và sử dụng. Nếu bạn có một ứng dụng cực kỳ đơn giản chỉ trên một vài máy chủ và chỉ yêu cầu diễn giải chuỗi đơn giản cho ứng dụng của mình, thì Memcached có thể là lựa chọn chính xác cho bạn. Tuy nhiên, ngay cả với khối lượng công việc nhỏ, việc thiết lập Redis có thể đáng hơn một xíu, vì nó có tùy chọn cho khả năng mở rộng sau này.

#### Dùng Redis khi nào

Redis là một sản phẩm hoàn thiện rất tốt, với sự phát triển tích cực liên tục. Nó có một loạt các tính năng và thực sự cung cấp tùy chọn cho khả năng mở rộng trong tương lai. Bạn nên sử dụng Redis khi:

- Bạn cần quyền truy cập vào các cấu trúc dữ liệu khác nhau và khả năng xử lý luồng.
- Khả năng sửa đổi và thay đổi các khóa và giá trị tại chỗ là bắt buộc.
Chính sách loại bỏ dữ liệu tùy chỉnh là bắt buộc (ví dụ: cần giữ key có thời gian tồn tại lâu hơn, ngay cả khi hệ thống hết bộ nhớ).
- Cần bảo toàn data vào ổ đĩa cho việc backup và cần khởi động lại hệ thống.
- Cần sự khả dụng cao và mở rộng tốt.

## Tổng kết

Memcached là một trong những giải pháp bộ nhớ đệm mã nguồn mở phổ biến đầu tiên và hoạt động tốt cho các khối lượng công việc có key - value cơ bản. Tuy nhiên, nếu bạn đang làm việc trong doanh nghiệp, hoặc chỉ đang tìm kiếm một sản phẩm hiện đại hơn, giàu tính năng và được phát triển tích cực, Redis là giải pháp tốt nhất. 

#### Source: https://www.instaclustr.com/redis-vs-memcached/