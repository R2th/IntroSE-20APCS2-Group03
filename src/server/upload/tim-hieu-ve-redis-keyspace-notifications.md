**Redis Keyspace Notifications**

IMPORTANT Keyspace notifications là một tính năng mới hoạt động từ version 2.8.0

# Tổng quan về tính năng 

Keyspace notifications cho phép client đăng kí tới kênh pub/sub để nhận các sự kiện ảnh hưởng đến bộ dữ liệu  của Redis theo một cách nào đó.
để nhận các sự kiện ảnh hưởng đến bộ dữ liệu Redis theo một cách nào đó.

Ví dụ các sự kiện có thể nhận được như sau:

- Tất cả các commands ảnh hưởng đến key
- Tất cả các key tiếp nhận từ LPUSH  operation 
- Tất cả các khóa hết hạn trong database 0

Các sự kiện được phân phối bằng tầng Pub/Sub của Redis, vì vậy clients triển khai Pub/Sub có thể sử dụng tính năng này mà không cần phải chỉnh sửa

Bởi vì Redis Pub/Sub là bắn và quên hiện tại nên nó không cách nào sử dụng tính năng nếu ứng dụng của bạn yêu cầu notification về các event, nghĩa là nếu client Pub/sub của bạn ngăt kết nối và kết nội lại sau, tất cả các sự kiện được phân phối trong suốt thời gian cliebt bị ngắt kết nối sẽ bị mất

Trong tương lai sẽ có kế hoạch cho phép phân phối các sự kiện đáng tin cậy hơn, nhưng có lẽ điều này sẽ được giải quyết ở cấp độ chung hơn hoặc mang lại độ tin cậy cho chính Pub / Sub hoặc cho phép các Lua scripts chặn các messages Pub / Sub để thực hiện các hoạt động như push các sự kiện vào một danh sách.

# Type of events

Keyspace notifications được triển khai gửi hai loại sự kiện riêng biệt cho mọi hoạt động ảnh hưởng đến không gian dữ liệu của Redis. Ví dụ, một hoạt động DEL với khóa có tên **mykey** trong cơ sở dữ liệu 0 sẽ kích hoạt việc phân phối hai thông báo, tương đương chính xác với hai lệnh PUBLISH sau:

```
PUBLISH __keyspace@0__:mykey del
PUBLISH __keyevent@0__:del mykey
```

Thật dễ dàng để xem làm thế nào một kênh cho phép nghe tất cả các sự kiện nhắm vào khóa mykey và kênh kia cho phép lấy thông tin về tất cả các khóa là mục tiêu của thao tác del.

Loại sự kiện đầu tiên, với tiền tố keyspace  trong kênh được gọi là Key-space notification, trong khi loại thứ hai, với tiền tố là keyevent, được gọi là Key-event notification.

Trong ví dụ trên, một sự kiện del đã được tạo cho khóa mykey. Điều xảy ra là:

- Kênh Key-space nhận thông điệp tên của sự kiện.
- Kênh Key-event nhân thông ddieepje tên của key.

Nó chỉ có thể kích hoạt một loại notification để chỉ cung cấp tập hợp con các sự kiện mà chúng ta quan tâm.

# Configuration

Theo mặc định các keyspace notification bị disable vì tính năng này sư dụng 1 ít CPU. Nó được enable bằng cách sử dụng  notify-keyspace-events của redis.conf hoặc thông qua CONFIG SET.

Đặt tham số cho chuỗi rỗng sẽ disable notifications. Để kích hoạt tính năng, một chuỗi không rỗng được sử dụng, bao gồm nhiều ký tự, trong đó mỗi ký tự có một ý nghĩa đặc biệt theo bảng sau:



| Character | Mean |
| -------- | -------- |
| K     | Các sự kiện Keyspace, published with __keyspace@<db>__ prefix. |
| E     | Các sự kiện Keyevent, published with __keyevent@<db>__ prefix. |
| g     | Các lệnh chung (không phải loại cụ thể) như DEL, EXPIRE, RENAME, ... |
| $     | Các command String |
| l     | Các command List |
| s     | Các command Set |
| h     | Các command Hash |
| z     | Các command Sorted |
| x     | Sự kiện Expired (sự kiện được tạo mỗi khi key hết hạn)  |
| e     | Sự kiện Evicted (các sự kiện được tạo khi khóa bị trục xuất vì maxmemory |
| A     | Bí danh cho g$lshzxe, để chuỗi "AKE" có nghĩa là tất cả các sự kiện.|

Ít nhất K hoặc E phải có mặt trong chuỗi, nếu không sẽ không có sự kiện nào được phân phối bất kể phần còn lại của chuỗi.

Chẳng hạn, để chỉ kích hoạt các sự kiện key-space cho danh sách, tham số cấu hình phải được đặt thành Kl, v.v.

Chuỗi KEA có thể được sử dụng để kích hoạt mọi sự kiện có thể.
# Events generated by different commands

Different commands generate different kind of events according to the following list.

Các lệnh khác nhau tạo ra loại sự kiện khác nhau theo danh sách sau đây.
    
- [DEL](https://redis.io/commands/expire) tạo một sự kiện del cho mọi khóa bị xóa.
- [RENAME](https://redis.io/commands/rename) tạo hai sự kiện, sự kiện rename_from cho khóa nguồn và sự kiện rename_to cho khóa đích.
- [EXPIRE](https://redis.io/commands/expire) tạo sự kiện hết hạn khi hết hạn được đặt cho key, hoặc một sự kiện đã hết hạn mỗi khi thời gian chờ tích cực được đặt trên một khóa dẫn đến khóa bị xóa (xem tài liệu [EXPIRE](https://redis.io/commands/expire) để biết thêm thông tin). 
- [SORT](https://redis.io/commands/sort)  tạo sự kiện sortstore khi STORE được sử dụng để đặt khóa mới. Nếu danh sách kết quả trống và tùy chọn STORE được sử dụng và đã có khóa hiện có tên đó, kết quả là khóa bị xóa, do đó, một sự kiện del được tạo trong điều kiện này
- [SET](https://redis.io/commands/set) và tất cả các biến thể của nó (SETEX, SETNX, GETSET) tạo ra các sự kiện đã đặt. Tuy nhiên, SETEX cũng sẽ tạo ra một sự kiện hết hạn. 
- [MSET](https://redis.io/commands/mset) tạo ra một sự kiện thiết lập riêng biệt cho mọi khóa.
- [SETRANGE](https://redis.io/commands/setrange) tạo ra một sự kiện  setrange.
- [INCR](https://redis.io/commands/incr), [DECR](https://redis.io/commands/decr), [INCRBY](https://redis.io/commands/incrby), [DECRBY](https://redis.io/commands/decrby) tất cả các lệnh tạo ra các sự kiện gia tăng.
- [INCRBYFLOAT](https://redis.io/commands/incrbyfloat) tạo ra một sự kiện  incrbyfloat.
- [APPEND](https://redis.io/commands/append) tạo ra một sự kiện append.
- [LPUSH](https://redis.io/commands/lpush) and [LPUSHX](https://redis.io/commands/lpushx) tạo ra một sự kiện lpush duy nhất, ngay cả trong trường hợp biến đổi.
- [RPUSH](https://redis.io/commands/rpush) and [RPUSHX](https://redis.io/commands/rpushx) tạo ra một sự kiện rpush duy nhất, ngay cả trong trường hợp biến đổi.
- [RPOP](https://redis.io/commands/rpop) tạo ra một sự kiện rpop. Ngoài ra, một sự kiện del được tạo nếu khóa bị xóa vì phần tử cuối cùng trong danh sách đã được bật.
- [LPOP](https://redis.io/commands/lpop) tạo ra một sự kiện lpop. Ngoài ra, một sự kiện del được tạo nếu khóa bị xóa vì phần tử cuối cùng trong danh sách đã được bật.
- [LINSERT](https://redis.io/commands/linsert) tạo ra một sự kiện linsert.
- [LSET](https://redis.io/commands/lset) tạo ra một sự kiện lset.
- [LREM](https://redis.io/commands/lrem) tạo ra một sự kiện lrem và thêm vào đó là một sự kiện del nếu danh sách kết quả trống và khóa bị xóa.
- [LTRIM](https://redis.io/commands/ltrim) tạo ra một sự kiện ltrim và thêm vào đó là một sự kiện del nếu danh sách kết quả trống và khóa bị xóa.
- [RPOPLPUSH](https://redis.io/commands/rpoplpush) and [BRPOPLPUSH](https://redis.io/commands/brpoplpush) tạo ra một sự kiện rpop và một sự kiện lpush. Trong cả hai trường hợp, thứ tự luôn được đảm bảo (sự kiện lpush sẽ luôn được gửi sau sự kiện rpop). Ngoài ra, một sự kiện del sẽ được tạo nếu danh sách kết quả có độ dài bằng không và khóa bị xóa.
- [HSET](https://redis.io/commands/hset), [HSETNX](https://redis.io/commands/hsetnx) and [HMSET](https://redis.io/commands/hmset) tất cả tạo ra một sự kiện hset duy nhất.
- [HINCRBY](https://redis.io/commands/hincrby) tạo ra sự kiện hincrby.
- [HINCRBYFLOAT](https://redis.io/commands/hincrbyfloat) tạo ra một sự kiện hincrbyfloat.
- [HDEL](https://redis.io/commands/hdel) tạo một sự kiện hdel duy nhất và một sự kiện del bổ sung nếu hàm băm kết quả trống và khóa bị xóa.
- [SADD](https://redis.io/commands/sadd) tạo ra một sự kiện sadd duy nhất, ngay cả trong trường hợp biến đổi. 
- [SREM](https://redis.io/commands/srem) tạo một sự kiện srem duy nhất và một sự kiện del bổ sung nếu tập kết quả trống và khóa bị xóa.
- [SMOVE](https://redis.io/commands/smove) tạo một sự kiện srem cho khóa nguồn và một sự kiện sadd cho khóa đích.
- [SPOP](https://redis.io/commands/spop) tạo một sự kiện spop và một sự kiện del bổ sung nếu tập kết quả trống và khóa bị xóa.
- [SINTERSTORE](https://redis.io/commands/sinterstore), [SUNIONSTORE](https://redis.io/commands/sunionstore), [SDIFFSTORE](https://redis.io/commands/sdiffstore) tạo các sự kiện sinterstore, sunionostore, sdiffstore tương ứng. Trong trường hợp đặc biệt, tập kết quả trống và khóa lưu trữ kết quả đã tồn tại, một sự kiện del được tạo kể từ khi khóa được xóa.
- ZINCR tạo ra một sự kiện zincr.
- [ZADD](https://redis.io/commands/zadd) tạo ra một sự kiện zadd duy nhất ngay cả khi nhiều yếu tố được thêm vào.
- [ZREM](https://redis.io/commands/zrem) tạo một sự kiện zrem duy nhất ngay cả khi nhiều phần tử bị xóa. Khi tập hợp được sắp xếp kết quả trống và khóa được tạo, một sự kiện del bổ sung được tạo.
- ZREMBYSCORE tạo ra một sự kiện zrembyscore duy nhất. Khi tập hợp được sắp xếp kết quả trống và khóa được tạo, một sự kiện del bổ sung được tạo.
- ZREMBYRANK tạo ra một sự kiện zrembyrank duy nhất. Khi tập hợp được sắp xếp kết quả trống và khóa được tạo, một sự kiện del bổ sung được tạo.
- [ZINTERSTORE](https://redis.io/commands/zinterstore) and [ZUNIONSTORE](https://redis.io/commands/zunionstore) tương ứng tạo ra các sự kiện zinterstore và zunionstore. Trong trường hợp đặc biệt, tập hợp được sắp xếp kết quả là trống và khóa lưu trữ kết quả đã tồn tại, một sự kiện del được tạo kể từ khi khóa được xóa..
- Mỗi khi một khóa có thời gian tồn tại được liên kết sẽ bị xóa khỏi bộ dữ liệu vì nó đã hết hạn, một sự kiện expired sẽ được tạo.
-Mỗi khi khóa được lấy ra khỏi bộ dữ liệu để giải phóng bộ nhớ do chính sách tối đa, một sự kiện evicted được tạo ra.
    
IMPORTANT all the commands generate events only if the target key is really modified. For instance an SREM deleting a non-existing element from a Set will not actually change the value of the key, so no event will be generated.
    
IMPORTANT tất cả các lệnh tạo sự kiện chỉ khi khóa đích thực sự được sửa đổi. Chẳng hạn, SREM xóa phần tử không tồn tại khỏi Tập sẽ không thực sự thay đổi giá trị của khóa, do đó sẽ không có sự kiện nào được tạo.

Nếu nghi ngờ về cách các sự kiện được tạo cho một lệnh nhất định, điều đơn giản nhất để làm là xem chính bạn:
    
```
$ redis-cli config set notify-keyspace-events KEA
$ redis-cli --csv psubscribe '__key*__:*'
Reading messages... (press Ctrl-C to quit)
"psubscribe","__key*__:*",1
```

Tại thời điểm này, sử dụng redis-cli trong một thiết bị đầu cuối khác để gửi lệnh đến máy chủ Redis và xem các sự kiện được tạo:
    
```
"pmessage","__key*__:*","__keyspace@0__:foo","set"
"pmessage","__key*__:*","__keyevent@0__:set","foo"
...
```
    
# Timing of expired events
    
Các khóa có thời gian sống liên quan đã hết hạn bởi Redis theo hai cách:

-Khi khóa được truy cập bởi command và được tìm thấy là hết hạn.   
- Thông qua một hệ thống nền tìm kiếm các khóa hết hạn trong background, tăng dần, để có thể thu thập các khóa không bao giờ được truy cập.    
    
# Nguồn
    
Bài viêt được lấy từ https://redis.io/topics/notifications