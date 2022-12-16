# Redis là gì
Redis được viết tắt từ  **Re**mote **Di**ctionary **S**erver là hệ thống lưu trữ dữ liệu in-memory dưới dạng key-value với tốc độ nhanh, mã nguồn mở, được sử dụng để lưu trữ dữ liệu, cache, message broker và queue. Redis hỗ trợ nhiều cấu trúc dữ liệu cơ bản như string, hash, list, set, sorted set. Bên cạnh lưu trữ key-value trên RAM với hiệu năng cao, redis còn hỗ trợ lưu trữ dữ liệu trên đĩa cứng  cho phép phục hồi dữ liệu khi gặp sự cố. Redis hiện cung cấp thời gian phản hồi dưới một phần nghìn giây cho phép hàng triệu yêu cầu mỗi giây cho các ứng dụng real time trong Gaming, Ad-Tech, Dịch vụ tài chính, Chăm sóc sức khỏe và IoT. Redis là một lựa chọn phổ biến cho caching, session management, gaming, leaderboards, hệ thống real-time.
# Các kiểu dữ liệu trong Redis
**1. STRINGS**

String là kiểu dữ liệu cơ bản nhất của Redis. Redis string được lưu dưới dạng nhị phân nên có thể chứa bất kì loại dữ liệu nào như ảnh dạng JPEG hay Ruby object.
Độ dài giá trị của 1 string tối đa là 512MB.

```markdown
127.0.0.1:6379> set myname DuongThao
OK
127.0.0.1:6379> get myname
"DuongThao"
```
Bằng cách sử dụng lệnh SET và lệnh GET chúng ta sẽ đặt gía trị và truy xuất giá trị của key. Lưu ý rằng SET sẽ thay thế bất kỳ giá trị hiện có nào đã được lưu trữ trong key, trong trường hợp key đó đã tồn tại, ngay cả khi key được liên kết với giá trị không phải là string. Xem thêm các câu lệnh command với string tại [đây](https://redis.io/commands/#string).

**2. LISTS**

Kiểu dữ liệu list trong redis chỉ đơn giản là danh sách các string được sắp xếp theo thứ tự chèn vào. Ta có thể thêm các phần tử vào đầu hoặc cuối 1 list sử dụng LPUSH hoặc RPUSH. Một list được tạo ra khi chúng ta thực hiện thao tác LPUSH hoặc RPUSH với một key rỗng. Tương tự, key sẽ được xóa khỏi key space khi các thao tác trên biến danh sách trở về rỗng. 
Ví dụ:
```markdown
127.0.0.1:6379> KEYS *
(empty list or set)
127.0.0.1:6379> lpush users user_1      //thêm phần tử vào đầu trái danh sách
(integer) 1
127.0.0.1:6379> KEYS *
1) "users"
127.0.0.1:6379> lpush users user_2
(integer) 2
127.0.0.1:6379> rpush users user_3     //thêm phần tử vào đầu phải danh sách
(integer) 3
127.0.0.1:6379> lrange users 0 10      //xem các phần tử có trong list
1) "user_2"
2) "user_1"
3) "user_3"
127.0.0.1:6379> lpop users            //remove và get phần tử ở đầu trái của list
"user_2"
127.0.0.1:6379> rpop users            //remove và get phần tử ở đầu phải của list
"user_3"
127.0.0.1:6379> lpop users
"user_1"
127.0.0.1:6379> KEYS *
(empty list or set)
```
Xem thêm các câu lệnh command với list tại [đây](https://redis.io/commands#list).

**3. SETS**

Set là tập hợp các string không được sắp xếp. Set hỗ trợ các thao tác thêm phần tử, đọc, xóa từng phần tử, kiểm tra sự xuất hiện của phần tử trong tập hợp với thời gian mặc định là O(1) bất kể số lượng phần tử của set đó là bao nhiêu. Ngoài ra Redis còn hỗ trợ các phép toán tập hợp, gồm intersect/union/difference. Số lượng phần tử tối đa trong 1 set là 2^32 - 1 (4294967295, nhiều hơn 4 tỉ phần tử trong mỗi set).
Ví dụ: 
```markdown
127.0.0.1:6379> sadd users user_1
(integer) 1
127.0.0.1:6379> sadd users user_2
(integer) 1
127.0.0.1:6379> sadd users user_3
(integer) 1
127.0.0.1:6379> smembers users
1) "user_3"
2) "user_2"
3) "user_1"
127.0.0.1:6379> spop users
"user_1"
127.0.0.1:6379> smembers users
1) "user_3"
2) "user_2"
127.0.0.1:6379> 
```
Tham khảo thêm các câu lệnh command của set tại [đây](https://redis.io/commands#set).

**4. HASHES**

Hash là kiểu dữ liệu lưu trữ hash table của các cặp key-value, trong đó, key được sắp xếp ngẫu nhiên, không theo thứ tự nào cả. Hash thường được sử dụng để lưu các object (user có các trường name, age, address,...). Mỗi hash có thể lưu trữ 2^32 - 1 cặp key-value. Redis hỗ trợ các thao tác thêm, đọc, xóa từng phần tử, cũng như đọc tất cả giá trị trong hash.
Ví dụ:
```markdown
127.0.0.1:6379> hmset user:1 name Thao email duongthao@gmail.com age 23
OK
127.0.0.1:6379> hgetall user:1
1) "name"
2) "Thao"
3) "email"
4) "duongthao@gmail.com"
5) "age"
6) "23"
127.0.0.1:6379> hset user:1 age 20
(integer) 0
127.0.0.1:6379> hgetall user:1
1) "name"
2) "Thao"
3) "email"
4) "duongthao@gmail.com"
5) "age"
6) "20"
```
Tham khảo thêm một số câu lệnh command với hash tại [đây](https://redis.io/commands#hash).

**5. SORTED SET (ZSET)**

Là 1 tập hợp các string không lặp lại, trong đó mỗi phần tử là map của 1 string (member) và 1 floating-point number (score), danh sách được sắp xếp theo score này, các phần tử là duy nhất, các score có thể lặp lại. Với Zset thì ta có thể thao tác thêm, sửa, xóa phần tử một cách rất nhanh (thời gian tỉ lệ với logarit của số phần tử).
Ví dụ:
```markdown
127.0.0.1:6379> zadd myzset 10 element_1
(integer) 1
127.0.0.1:6379> zadd myzset 2 element_2
(integer) 1
127.0.0.1:6379> zadd myzset 6 element_3
(integer) 1
127.0.0.1:6379> zrangebyscore myzset 0 100
1) "element_2"
2) "element_3"
3) "element_1"
```
Tham khảo thêm các câu lệnh command với ZSET tại [đây](https://redis.io/commands#sorted_set).
# Lợi ích của việc sử dụng Redis
**IN-MEMORY DATA STORE**

Tất cả dữ liệu Redis nằm trong bộ nhớ chính của máy chủ, trái ngược với các cơ sở dữ liệu như PostgreSQL, Cassandra, MongoDB và các CSDL khác lưu trữ hầu hết dữ liệu trên đĩa hoặc trên SSD. So với các cơ sở dữ liệu dựa trên đĩa truyền thống thì hầu hết các thao tác với DB yêu cầu roundtrip tới đĩa, lưu trữ dữ liệu in-memory như Redis không yêu cầu như vậy. Do đó, nó có thể hỗ trợ số lượng lớn các phép thực thi và thời gian phản hồi nhanh hơn. Kết quả là Redis cho hiệu suất nhanh hơn với các hoạt động đọc hoặc ghi trung bình mất ít hơn một phần nghìn giây và hỗ trợ cho hàng triệu thao tác mỗi giây.

**CẤU TRÚC DỮ LIỆU LINH HOẠT**

Không giống như các kiểu lưu trữ key-value đơn giản khác cung cấp các cấu trúc dữ liệu hạn chế, Redis có rất nhiều cấu trúc dữ liệu để đáp ứng nhu cầu ứng dụng của bạn gồm: Strings, lists, sets, sorted sets, hashes.

**ĐƠN GIẢN VÀ DỄ SỬ DỤNG**

Redis đơn giản hóa code của bạn bằng cách cho phép bạn viết ít dòng code hơn để lưu trữ, truy cập và sử dụng dữ liệu trong các ứng dụng của mình.  Ví dụ: nếu ứng dụng của bạn có dữ liệu được lưu dạng hashmap và bạn muốn lưu trữ dữ liệu đó trong DB thì bạn chỉ cần sử dụng cấu trúc dữ liệu hashes để lưu chúng. Thao tác tương tự trên DB không có cấu trúc dữ liệu hashes sẽ yêu cầu nhiều dòng code để chuyển đổi từ định dạng này sang định dạng khác. Với mỗi kiểu dữ liệu thì Redis thêm nhiều tùy chọn để thao tác và tương tác với dữ liệu của bạn.

**REPLICATION VÀ PERSISTENCE**

Redis sử dụng kiến trúc primary-replica và hỗ trợ sao chép không đồng bộ, dữ liệu có thể được sao chép sang nhiều máy chủ khác nhau. Điều này giúp hiệu suất đọc được cải thiện (vì các yêu cầu có thể được phân chia giữa các máy chủ) và phục hồi nhanh hơn khi máy chủ chính gặp sự cố ngừng hoạt động. Để duy trì, Redis hỗ trợ sao lưu point-in-time backups (sao chép dữ liệu Redis vào đĩa).
# Một số ứng dụng của Redis
**CACHING**

Redis là một lựa chọn tuyệt vời để triển khai in-memory cache để giảm độ trễ truy cập dữ liệu, tăng thông lượng và giảm tải khỏi cơ sở dữ liệu quan hệ trong chương trình của bạn. Redis có thể phục vụ các dữ liệu được yêu cầu thường xuyên ở thời gian phản hồi dưới một phần nghìn giây. Và cho phép bạn dễ dàng mở rộng quy mô cho các tải cao hơn mà không cần tăng phụ trợ tốn kém. Persistent session caching, web page caching và caching của các đối tượng được sử dụng thường xuyên như hình ảnh, tệp và siêu dữ liệu là các ví dụ phổ biến về caching với Redis.

**SESSION STORE**

Redis như một kho lưu trữ dữ liệu trong bộ nhớ với tính sẵn sàng cao và bền bỉ là lựa chọn phổ biến của các nhà phát triển ứng dụng để lưu trữ và quản lý dữ liệu session cho các ứng dụng của mình. Redis cung cấp độ trễ dưới một phần nghìn giây và khả năng phục hồi cần thiết để quản lý dữ liệu session như hồ sơ người dùng, thông tin đăng nhập, trạng thái phiên và cá nhân hóa cụ thể của người dùng.

**REAL-TIME ANALYTICS**

Redis có thể được sử dụng với các giải pháp streaming như Apache Kafka và Amazon Kinesis như một in-memory data store để nhập, xử lý và phân tích dữ liệu real-time với độ trễ nhỏ hơn một phần nghìn giây. Redis là một lựa chọn lý tưởng cho các hệ thống [ real-time analytics](https://aws.amazon.com/elasticache/redis/#Real-time_Analytics) như truyền thông xã hội, quảng cáo và IoT.
# Kết luận
Bài viết trên đây đã đưa ra khái niệm, những kiểu dữ liệu của Redis, cũng như các lợi ích khi sử dụng redis, các ứng dụng trong thực tế. Hi vọng rằngqua đây các bạn sẽ có thêm cho mình những lựa chọn phù hợp khi cần giải quyết các bài toán về lưu trữ dữ liệu.
# Tài liệu tham khảo
1. Khái niệm Redis: https://redis.io/

2. Các kiểu dữ liệu: https://redis.io/topics/data-types

3. Lợi ích sử dụng, ứng dụng thực tế: https://aws.amazon.com/redis/