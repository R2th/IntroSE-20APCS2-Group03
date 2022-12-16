**Redis** không đơn giản là lưu trữ key/value thông thường (cả key value đều là string), thực sự nó là một máy chủ dữ liệu có cấu trúc (data structures server) hỗ trợ nhiều loại dữ liệu có cấu trúc phức tạp như danh sách (List), tập hợp (Set), tập hợp được sắp xếp (Sorted Set), bảng băm (Hash) ...

Hôm nay mình sẽ giới thiệu qua một số lệnh cơ bản của Redis và cách quản lý dữ liệu trên CSDL cực nhanh này.
![](https://images.viblo.asia/e6f937f0-1c75-4acc-8d3e-f12aa00ddc32.png)

# Redis Key
Redis key là các lệnh sử dụng để quản lý các key trong redis. Với cú pháp như sau:
```
COMMAND KEY_NAME [VALUE]
```
Các lệnh thường dùng


| STT | Command | Ý nghĩa |
| -------- | -------- | -------- |
| 1     | DEL key     | Xóa key nếu nó tồn tại     |
| 2     | EXISTS key	     | Kiểm tra key có tồn tại không  |
| 3     | EXPIRE key n	     | Đặt expire time cho key sau n giây |
| 4     | KEYS pattern	     | Tìm các key theo pattern |
| 5     | PERSIST key	     | Xóa expire time của key |
| 6     | TTL key	     | Lấy thời gian sống của key (giây) |
| 7     | RENAME key newkey	     | Đổi tên key sang newkey, nếu newkey đã tồn tại giá trị của nó sẽ bị ghi đè bởi giá trị của key |
| 8     | RENAMENX key newkey	     | Đổi tên key sang newkey nếu newkey chưa tồn tại |
| 9     | TYPE key	     | Lấy loại dữ liệu được lưu trữ bởi key |

# Redis String
Redis string là lệnh sử dụng để quản lý các key/value trong đó value có giá trị string trong redis
Ví dụ:
```
redis 127.0.0.1:6379> SET test redis
OK
redis 127.0.0.1:6379> GET test
"redis"
```
Các lệnh thường dùng
| STT | Command | Ý nghĩa |
| -------- | -------- | -------- |
| 1     | SET key value	    | Đặt giá trị value cho key     |
| 2     | GET key	    | Lấy giá trị lưu trữ bởi key     |
| 3     | GETRANGE key start end	    | Lấy giá trị lưu trữ bởi key từ (start) đến (end)      |
| 4     | GETSET key value	    | Lấy ra giá trị cũ và đặt giá trị mới cho keY     |
| 5     | MGET key1 key2 ..	    | Lấy giá trị của nhiều key theo thứ tự     |
| 6     | SETEX key seconds value	    | Đặt giá trị và thời gian expire cho key    |
| 7     | SETNX key value	 |   Đặt giá trị cho key nếu key chưa tồn tại    |
| 8    | RENAMENX key newkey	    | Đổi tên key sang newkey nếu newkey chưa tồn tại    |
| 9     | STRLEN key	    | Lấy độ dài giá trị lưu trữ bởi key    |
| 10     | APPEND key value	    | Thêm vào sau giá trị lưu trữ bởi key là value     |
| 11     | INCR key			    |Tăng giá trị lưu trữ của key (số nguyên) 1 đơn vị     |
| 12     | INCRBY key n		    | Tăng giá trị lưu trữ của key (số nguyên) n đơn vị    |
| 13     | DECR key	    | Giảm giá trị lưu trữ của key (số nguyên) 1 đơn vị     |
| 14     | DECRBY key n	    | Giảm giá trị lưu trữ của key (số nguyên) n đơn vị     |

# Redis Hash
Redis hash là lệnh sử dụng để quản lý các key/value trong đó value có giá trị là hash. Hash là kiểu dữ liệu khá phổ biến, thường được dùng để lưu trữ các object.
```
HSET user:1 name "name 1"
(integer) 1
HGET user:1 name
"name 1"
```
Các lệnh thường dùng
| STT | Command | Ý nghĩa |
| -------- | -------- | -------- |
| 1     | HSET key field value		    | Đặt giá trị cho field là value trong hash     |
| 2     | HGET key field		    | Lấy giá trị của field trong hash     |
| 3     | HDEL key field1 field2 ...		    | xóa field1, field2 ... trong hash     |
| 4     | HEXISTS key field		    | Kiểm tra file có tồn tại trong hash không     |
| 5     | HGETALL key		    | Lấy tất cả các field và value của nó trong hash     |
| 6     | HINCRBY key field n		    | Tăng giá trị của field (số nguyên) lên n đơn vị     |
| 7     | HDECRBY key field n		    | Giảm giá trị của field (số nguyên) lên n đơn vị     |
| 8     | HINCRBYFLOAT key field f		    | Tăng giá trị của field (số thực) lên f     |
| 9     | HDECRBYFLOAT key field n		    | Giảm giá trị của field (số thực) f     |
| 10     | HKEYS key		    | Lấy tất cả các field của hash     |
| 11     | HVALS key		    | Lấy tất cả các value của hash     |
| 12     | HLEN key		    | Lấy số lượng field của hash     |
| 13     | HMSET key field1 value1 field2 value2 ...		    | Đặt giá trị cho các field1 giá trị value1 field2 giá trị value2 ...     |
| 14     | HMGET key field1 field2 ...		    | Lấy giá trị của các field1 field2 ...     |