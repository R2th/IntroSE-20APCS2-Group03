![](https://images.viblo.asia/368e2f9f-4f88-4299-a1ac-f2d5562ccc2a.png)

# 1. Giới thiệu redis:
- Redis là một bộ mã nguồn mở, được sử dụng như một database.
- Redis hỗ trợ các kiểu dữ liệu String, List, Set, Ordered Set và Hash.
- Tham khảo cách download và cài đặt redis tại [đây](https://redis.io/download).


# 2. Redis basic:
- Dữ liệu bên trong redis được tổ chức và quản lý theo kiểu `key-value`.
- Kiểu tố chức dữ liệu này cho phép redis tạo, lưu trữ và quản lý `value` thông qua `key` tương ứng.
- Sau khi đã install redis, chạy command redis-server để start server của redis.
- Sử dụng `redis-cli` để thao tác với dữ liệu được lưu bên trong redis.

## a. Command GET, SET, DEL:
- Ta sử dụng command `SET` để tạo `value` cho `key`.
- Ta sử dụng command `GET` để lấy `value` ứng với `key`.
- Trong trường hợp `key` chưa tồn tại thì redis trả về `nil`.
```
hcm-102-0003@hcm1020003:~$ redis-cli
127.0.0.1:6379> SET key "value"
OK
127.0.0.1:6379> GET key
"value"
127.0.0.1:6379> GET not-exists-key
(nil)
```
- Ta sử dụng command `DEL` để xóa 1 cặp `key-value`.
```
127.0.0.1:6379> DEL key
(integer) 1
127.0.0.1:6379> GET key
(nil)
127.0.0.1:6379> 
```
## b. Command EXPIRE, TLL:
- Ta sử dụng command `EXPIRE` để set thời gian tồn tại bên trong redis của 1 cặp `key-value`
- Sau thời gian này thì cặp `key-value` sẽ bị xóa khỏi redis.
```
127.0.0.1:6379> SET expire-key "value"
OK
127.0.0.1:6379> EXPIRE expire-key 100
(integer) 1
127.0.0.1:6379> SET not-expire-key "value"
OK
```
- Ta sử dụng command `TLL` để lấy thời gian tồn tại còn lại của căp `key-value` bên trong redis.
- `TLL` trả về -1 khi cặp key-value không bao giờ bị xóa trong redis.
- `TLL` trả về -2 khi cặp key-value đã bị xóa khỏi redis.
```
127.0.0.1:6379> TTL expire-key
(integer) 90
127.0.0.1:6379> TTL expire-key
(integer) 89
127.0.0.1:6379> TTL expire-key
(integer) -2
127.0.0.1:6379> TTL not-expire-key
(integer) -1
```

# 3. Redis và các kiểu dữ liệu khác:
Redis hỗ trợ lưu trữ nhiều kiểu dữ liệu khác nhau ngoài `String`.
## a. List:
Đối với kiểu sữ liệu `List`, redis hỗ trợ các command `LPUSH`, `RPUSH`, `LPOP`, `RPOP`, `LLEN`, `LRANGE`.
- Ta sử dụng command `RPUSH` để thêm 1 phần tử vào cuối `List` và `LPUSH` để thêm 1 phần tử vào đầu `List`.
- Khi key chưa tồn tại thì 1 `List` rỗng tương ứng với key sẽ được tạo trước khi thêm phần tử vào `List`.
- Khi key đã tồn tại nhưng value tương ứng với key không phải là `List` thì `RPUSH`, `LPUSH` trả về lỗi.
- `RPUSH`, `LPUSH` trả về số lượng phần tử có trong `List` sau khi phần tử đã được thêm vào `List`.
```
127.0.0.1:6379> SET not-a-list value
OK
127.0.0.1:6379> RPUSH list "value 1"
(integer) 1
127.0.0.1:6379> RPUSH list "value 2"
(integer) 2
127.0.0.1:6379> RPUSH not-a-list "value"
(error) WRONGTYPE Operation against a key holding the wrong kind of value
127.0.0.1:6379> LPUSH list "value 3"
(integer) 3
127.0.0.1:6379> LPUSH list "value 4"
(integer) 4
127.0.0.1:6379> LPUSH not-a-list "value"
(error) WRONGTYPE Operation against a key holding the wrong kind of value
```
- Ta sử dụng command `RPOP` để xóa phần từ cuối cùng của `List`, `LPOP` để xóa phần từ đầu tiên của `List`.
- Khi key không tồn tại hoặc `List` rỗng thì `RPOP`, `LPOP` trả về nil.
- Khi key đã tồn tại nhưng value ứng với key không phải là `List` thì `RPOP`, `LPOP` trả về lỗi.
- `RPOP`, `LPOP` trả về phần tử đã được xóa khỏi list.
```
127.0.0.1:6379> RPOP list
"value 2"
127.0.0.1:6379> RPOP list
"value 1"
127.0.0.1:6379> LPOP list
"value 4"
127.0.0.1:6379> LPOP list
"value 3"
127.0.0.1:6379> RPOP list
(nil)
127.0.0.1:6379> LPOP list
(nil)
127.0.0.1:6379> RPOP not-a-list
(error) WRONGTYPE Operation against a key holding the wrong kind of value
127.0.0.1:6379> LPOP not-a-list
(error) WRONGTYPE Operation against a key holding the wrong kind of value
```
- Ta sử dụng command `LLEN` để biết được số phần tử có trong `List` tương ứng với key.
- Khi key chưa tồn tại hoặc `List` ứng với key rỗng thì `LLEN` trả về 0.
- Khi value tương ứng với key không phải là `List` thì `LLEN` trả về lỗi.
```
127.0.0.1:6379> LLEN list
(integer) 4
127.0.0.1:6379> LLEN not-exists-list
(integer) 0
127.0.0.1:6379> LLEN not-a-list
(error) WRONGTYPE Operation against a key holding the wrong kind of value
```

- Ta sử dụng command `LRANGE` để lấy về những phần tử được lưu trong `List` trong khoảng index xác định.
- Index trong `List` được tính từ 0 tăng dần từ trái sang phải (index của phần tử đầu tiên là 0, của phân tử tiếp theo bên phải là 1, tăng dần cho đến cuối).
- Index trong `List` được tính từ -1 giảm dần từ phải sang trái (index của phần tử cuối cùng là -1, của phần từ tiếp theo bên trái là -2, giảm dần cho đến đầu)
- Để lấy về toàn bộ phần tử của `List` thì ta truyền 0 cho first index và -1 cho last index.
- Khi first index lớn hơn số phần tử của `List` hoặc lớn hơn last index thì `LLANGE` trả về `List` rỗng.
- Khi last index lớn hơn số hoặc bằng phần tử của `List` thì thì `LRANGE` trả về đến phần tử cuối cùng của `List`.
```
127.0.0.1:6379> LRANGE list 0 -1
1) "value 1"
2) "value 2"
3) "value 3"
4) "value 4"
127.0.0.1:6379> LRANGE list 0 2
1) "value 1"
2) "value 2"
3) "value 3"
127.0.0.1:6379> LRANGE list -3 -1
1) "value 2"
2) "value 3"
3) "value 4"
127.0.0.1:6379> LRANGE list 4 6
(empty list or set)
127.0.0.1:6379> LRANGE list 2 0
(empty list or set)
127.0.0.1:6379> LRANGE list 2 5
1) "value 3"
2) "value 4"
```
## b. Set:
`Set` là kiểu dữ liệu tương tự như `List`, tuy nhiên các phần tử trong `SET` không có thứ tự nhất định và phần tử trong `SET` chỉ xuất hiện 1 lần.

Đối với kiểu sữ liệu `Set`, redis hỗ trợ các command `SADD`, `SREM`, `SISMEMBER`, `SMEMBERS`, `SUNION`.
- Ta sử dụng command `SADD` để thêm 1 phần tử vào `Set` tương ứng với key.
- Trong trường hợp value ứng với key không là `Set` thì `SADD` trả về lỗi.
- Trong trường hợp key chưa có value thì `Set` rỗng được tạo trước khi thêm phần từ vào `Set`.
- Trong trường hợp phần tử chưa được thêm vào `Set` thì `SADD` thêm phần từ vào `Set` và trả về 1.
- Trong trường hợp phần tử chưa được thêm vào `Set` thì `SADD` trả về 0.
```
127.0.0.1:6379> SET not-a-set "value"
OK
127.0.0.1:6379> SADD not-a-set "value"
(error) WRONGTYPE Operation against a key holding the wrong kind of value
```
- Ta sử dụng command `SREM` để xóa phần tử khỏi `Set` tương ứng với key.
- Trong trường hợp value ứng với key không là `Set` thì `SREM` trả về lỗi.
- Trong trường hợp phần tử chưa được xóa khỏi `Set` thì `SREM` xóa phần từ khỏi `Set` và trả về 1.
- Trong trường hợp phần tử đã được xóa khỏi `Set` thì `SREM` trả về 0.
```
(integer) 0
127.0.0.1:6379> SREM not-a-set "value"
(error) WRONGTYPE Operation against a key holding the wrong kind of value
127.0.0.1:6379> SREM set "value 1"
(integer) 1
127.0.0.1:6379> SREM set "value 1"
(integer) 0
```
- Ta sử dụng command `SISMEMBER` để kiểm tra phần tử có thuộc `Set` tương ứng với key hay không.
- Trong trường hợp value ứng với key không là `Set` thì `SISMEMBER` trả về lỗi.
- Trong trường hợp phần tử thuộc `Set` thì `SISMEMBER` trả về 1.
- Trong trường hợp phần tử không thuộc `Set` thì `SISMEMBER` trả về 0.
```
127.0.0.1:6379> SISMEMBER not-a-set "value"
(error) WRONGTYPE Operation against a key holding the wrong kind of value
127.0.0.1:6379> SISMEMBER set "value 1"
(integer) 1
127.0.0.1:6379> SISMEMBER set "value 0"
(integer) 0
```
- Ta sử dụng command `SMEMBERS` để trả về tất cả phần tử của `Set`.
- Trong trường hợp value ứng với key không là `Set` thì `SMEMBERS` trả về lỗi.
```
127.0.0.1:6379> SMEMBERS not-a-set
(error) WRONGTYPE Operation against a key holding the wrong kind of value
127.0.0.1:6379> SMEMBERS set
1) "value 2"
2) "value 1"
```
- Ta sử dụng command `SUNION` để trả vế tất cả phần tử của các `Set` ứng với các key truyền vào.
```
127.0.0.1:6379> SUNION set-1 set-2
1) "value 1"
2) "value 2"
3) "value 3"
4) "value 4"
```
## c. Sorted Set:
`Sorted Set` là kiểu dữ liệu tương tự như `Set`, tuy nhiên các phần tử trong `Sorted Set` đi kèm với với 1 value nhất định, các phần tử trong `Sorted Set` được sắp xếp theo thứ tự tăng dần của các value này.
```
127.0.0.1:6379> ZADD sorted-set 1 "value 1"
(integer) 1
127.0.0.1:6379> ZADD sorted-set 0 "value 0"
(integer) 1
127.0.0.1:6379> ZADD sorted-set 2 "value 2"
(integer) 1
127.0.0.1:6379> ZRANGE sorted-set 0 -1
1) "value 0"
2) "value 1"
3) "value 2"
```
## d. Hash:
- `Hash` là kiểu dữ liệu tham chiếu một string field với một string value tương ứng.
```
127.0.0.1:6379> HSET user name "TanThanhLe"
(integer) 1
127.0.0.1:6379> HSET user age "23"
(integer) 1
127.0.0.1:6379> HGETALL user
1) "name"
2) "TanThanhLe"
3) "age"
4) "23"
127.0.0.1:6379> HGET user name
"TanThanhLe"
```

# 4. Link tham khảo:
- Trang chủ redis: https://redis.io/
- Tutorial online: http://try.redis.io/
- Redis Commands: https://redis.io/commands