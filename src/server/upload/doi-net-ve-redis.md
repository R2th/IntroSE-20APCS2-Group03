![](https://images.viblo.asia/11370fe5-84a7-48de-99de-8bdb17903dd9.png)
## Giới thiệu
Redis là 1 trong số các hệ quản trị cơ sở dữ liệu phát triển mang phong cách NoSQL. Redis là hệ thống lưu trữ key-value với rất nhiều tính năng và được sử dụng rộng rãi. Redis nổi bật bởi việc hỗ trợ nhiều cấu trúc dữ liệu cơ bản (hash, list, set, sorted set, string...). Vậy để đơn giản, chúng ta hãy xem Redis như là một công cụ cấu trúc dữ liệu.
## Các lệnh cơ bản và quản lý dữ liệu trong Redis

| Lệnh | Ý nghĩa| 
| -------- | -------- | 
|   DEL key   |  Xóa key nếu nó tồn tại    | 
|   EXISTS key   |  Kiểm tra key có tồn tại không    | 
|   EXPIRE key n   |  Đặt expire time cho key sau n giây    | 
|   KEYS pattern   |  Tìm các key theo pattern    | 
|   PERSIST key	  |  Xóa expire time của key    | 
|   TTL key   |  Lấy thời gian sống của key (giây)    | 
|   RENAME key newkey   |  Đổi tên key sang newkey, nếu newkey đã tồn tại giá trị của nó sẽ bị ghi đè bởi giá trị của key    | 
|   RENAMENX key newkey   |  Đổi tên key sang newkey nếu newkey chưa tồn tại    | 
|   TYPE key   |  Lấy loại dữ liệu được lưu trữ bởi key    | 

### Các loại dữ liêụ
Bây giờ hãy lướt qua các loại dữ liệu có thể lưu trữ trên Redis nhé.
#### Strings
String là loại dữ liệu đơn giản nhất trong các loại dữ liệu được lưu trữ trên Redis. Giống như key, giá trị kiểu string có thể là bất kỳ mảng byte nào.Bạn có thể lưu trữ một biến đếm dạng integer tăng dần, một chuỗi thực, hoặc một đối tượng nhị phân. Về cơ bản, phương thức chuỗi phổ biến nhất trên String là `SET` và `GET`:
```
SET pages:about "about us"
GET pages:about
about us
```
Bạn có thể làm nhiều thứ hơn với String thông qua bảng các lệnh sau:


| Lệnh | Ý nghĩa |
| -------- | -------- |
|  SET key value    |  Đặt giá trị value cho key    |
|  GET key    |  Lấy giá trị lưu trữ bởi key    |
|  GETRANGE key start end    |  Lấy giá trị lưu trữ bởi key từ (start) đến (end)    |
|  GETSET key value   | Lấy ra giá trị cũ và đặt giá trị mới cho key |
|  MGET key1 key2 ..    |  Lấy giá trị của nhiều key theo thứ tựy    |
|  SETEX key (seconds) value    |  Đặt giá trị và thời gian expire cho key    |
|  SETNX key value    |  Đặt giá trị cho key nếu key chưa tồn tại    |
|  RENAMENX key newkey   |  Đổi tên key sang newkey nếu newkey chưa tồn tại   |
|  STRLEN key    |  Lấy độ dài giá trị lưu trữ bởi key    |
|  APPEND key value    |  Thêm vào sau giá trị lưu trữ bởi key là value   |
|  INCR key    |  Tăng giá trị lưu trữ của key (số nguyên) 1 đơn vị    |
|  INCRBY key n    |  Tăng giá trị lưu trữ của key (số nguyên) n đơn vị    |
|  DECR key    |  Giảm giá trị lưu trữ của key (số nguyên) 1 đơn vị    |
|  DECRBY key n    |  Giảm giá trị lưu trữ của key (số nguyên) n đơn vị    |
#### Hashes
Cấu trúc dữ liệu Hashes là chính xác những gì bạn đang nghĩ (a hash/dictionary). VD:
```
SET users:goku {race: 'sayan', power: 9001}
HSET users:goku race sayan
HSET users:goku power 9001
```
Các lệnh cơ bản:
|Lệnh | Ý nghĩa | 
| -------- | -------- |
| HSET key field value     | Đặt giá trị cho field là value trong hash     |
| HGET key field     | Lấy giá trị của field trong hash     |
| HDEL key field1 field2 ...     | xóa field1, field2 ... trong hash     |
| HEXISTS key field	     | Kiểm tra file có tồn tại trong hash không     |
| HGETALL key     | Lấy tất cả các field và value của nó trong hash     |
| HINCRBY key field n	     | Tăng giá trị của field (số nguyên) lên n đơn vị     |
| HDECRBY key field n     | Giảm giá trị của field (số nguyên) lên n đơn vị     |
| HINCRBYFLOAT key field f     | Tăng giá trị của field (số thực) lên f     |
| HDECRBYFLOAT key field n     | Giảm giá trị của field (số thực) f     |
| HKEYS key     | Lấy tất cả các field của hash     |
| HVALS key     | Lấy tất cả các value của hash    |
| HLEN key     | 	Đặt giá trị cho các field1 giá trị value1 field2 giá trị value2 ...     |
| HMSET key field1 value1 field2 value2 ...     | Đặt giá trị cho field là value trong hash     |
| HMGET key field1 field2 ...     | Lấy giá trị của các field1 field2 ...     |
#### List
Kiểu dữ liệu List cho phép lưu trữ danh sách các giá trị với một biến duy nhất. Trong thực tế, bạn có thể nghĩ dữ liệu List trên redis là một array động. Bạn có thể thực hiện các thao tác insert, append, pop, push, trim...trên List.
```
length = redis.lpush('users:newest', 'user:goku')
if length > 100
  #trim is to we only keep 100 "newest" users
  redis.rpop('users:newest')
end
```

Các lệnh cơ bản:
|Lệnh | Ý nghĩa | 
| -------- | -------- |
| LINDEX key index    | 	Lấy giá trị từ danh sách (list) ở vị trí index (index bắt đầu từ 0)     |
| LLEN key     | Đặt giá trị cho field là value trong hash     |
| LPOP key	     | Lấy phần tử ở đầu danh sách     |
| LPUSH key value1 value2 ...	     | Thêm value1 value2... vào đầu danh sách     |
| LRANGE key start stop     | Lấy các phần tử trong list từ vị trí start đến vị trí stop     |
| LSET key index value     | Đặt lại giá trị tại index bằng value     |
| RPOP key     | Lấy giá trị ở cuối danh sách     |
| RPUSH key value1 value2 ...     | Thêm phần tử value1 value2 ... vào cuối danh sách     |
| LINSERT key BEFORE value1 value2     | Thêm phần tử value2 vào trước phần tử value1 trong danh sác    |
| LINSERT key AFTER value1 value2     | Thêm phần tử value2 vào sau phần tử value1 trong danh sách     |

Tài liệu tham khảo:

[https://www.openmymind.net/2011/11/8/Redis-Zero-To-Master-In-30-Minutes-Part-1/](https://www.openmymind.net/2011/11/8/Redis-Zero-To-Master-In-30-Minutes-Part-1/)
[https://www.tutorialspoint.com/redis/redis_keys.htm](https://www.tutorialspoint.com/redis/redis_keys.htm)