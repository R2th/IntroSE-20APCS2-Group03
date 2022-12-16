# Một số commands trong redis
1. Redis là gì ?
2. Các commands trong redis
3. Kết 
## 1. Redis là gì ?
- Redis là open source, nó lưu trữ cấu trúc dữ liệu trong bộ nhớ và được sử dụng làm cơ sở dữ liệu, bộ đệm.
- Redis hỗ trợ các cấu trúc dữ liệu như: Strings, Hashes, Lists, sets với các truy vấn
- Ngoài ra để đạt được hiệu suất cao, redis làm việc với bộ dữ liệu trong bộ nhớ tuỳ thuộc vào trường hợp sử dụng của bạn.
## 2. Các commands trong redis
### Strings 
Strings là loại giá trị cơ bản nhất của Redis,  nó có thể chưa bất kì loại dữ liệu nào, ví dụ như hình ảnh JPEG hoặc ruby object, giá trị chuỗi có thể dài tối đa 512MB

**Một số command với Strings trong redis :**

**SET:** dùng để cài đặt giá trị cho 1 key, nếu nó đã tồn tại thì giá trị sẽ bị ghi đè. Nó trả về OK nếu SET được thực thi thành công

ví dụ:
```
> $redis.set "set_key",1
 => "OK"
```

**GET:** lấy giá trị của key, nếu key không tồn tại thì trả về giá trị nil

ví dụ:
```
> $redis.get "get_key"
 => "1" 
> $redis.get "get_key"
 => nil
```

**INCR:** Tăng giá trị của key thêm 1 đơn vị, nếu nó không tồn tại sẽ tự động tạo key mới và trả về giá trị là 1

ví dụ:
```
> $redis.incr "inc_key"
 => 1 
> $redis.get "inc_key"
 => "1" 
```

 **INCRBY:** Tăng giá trị của key với giá trị nhập vào, nếu nó không tồn tại sẽ tự động tạo key mới và trả về giá trị là đã nhập

ví dụ:
```
> $redis.incrby "incrby_key", 100
 => 100
> $redis.get "incrby_key"
 => "100" 
```

 **DECR:** Giảm giá trị của key thêm 1 đơn vị, nếu nó không tồn tại sẽ tự động tạo key mới và trả về giá trị là -1

ví dụ:
```
> $redis.decr "decr_key"
 => -1 
> $redis.get "decr_key"
 => "-1" 
```

**APPEND:** Dùng để nối chuỗi, nếu key đã tồn tại và có giá trị thì nối chuỗi được thực hiện, nếu không một key và value mới được tạo ra

ví dụ:
```
> $redis.append "append_key", "hello"
 => 5 
> $redis.get "append_key"
 => "hello"
 > $redis.append "append_key", " world"
 => 11
 > $redis.get "append_key"
 => "hello world"
```

Ngoài ra còn có các commands hữu ích khác như: GETRANGE, SETRANGE, GETBIT và SETBIT 

### Hashes 
Được sử dụng để lưu dữ liệu dạng hash, chúng là kiểu dữ liệu khá hoàn hảo để biểu diễn các đối tượng, ví dụ như chiếc xe có màu săc, kích thước,...

Một hash với một vài trường được lưu trữ với ít không gian, do đó có thể lưu trữ hàng triệu đối tượng.

Mỗi hash có thể lưu tới tối đa 2^32 -1 cặp giá trị

**Một số command với Hashes trong redis :**

**HGET:** Trả về giá trị của hash đã được lưu trữ trong key, trả về nil nếu giá trị không tồn tại

**HSET:** Cài đặt giá trị cho hash với cặp key-value

**HEXISTS:** Trả về true nếu giá trị tồn tại và false nếu giá trị không tồn tại

ví dụ:
```
> $redis.hset "hash_test", "color", "red"
 => true 
> $redis.hget "hash_test", "color"
 => "red" 
> $redis.hget "hash_test", "type"
 => nil
> $redis.hexists "hash_test", "color"
 => true
> $redis.hexists "hash_test", "type"
 => false
```

Ngoài ra còn có các commands hữu ích khác như: HGETALL, HINCRBY, HINCRBYFLOAT, HKEYS, HLEN, HMGET, HMSET, HSCAN, HSETNX, HSTRLEN và HVALS.


### Sets
Cho phép lưu trữ dữ liệu dạng key-value, key-value là duy nhất và không lăp lại.

**Một số command với Sets trong redis :**

**SADD:** Thêm các giá trị vào tập hợp đã được lưu trữ trong key

**SMEMBERS:** Trả về tất cả các giá trị của tập hợp đã được lưu trữ trong key

ví dụ:
```
> $redis.sadd "sets_test", "hello"
 => true 
> $redis.sadd "sets_test", "world"
 => true 
> $redis.smembers "sets_test"
 => ["hello", "world"]
```

Ngoài ra còn có các command hữu ích khác như: SCARD, SDIFF, SDIFFSTORE, SINTER, SINTERSTORE, SISMEMBER, SMOVE, SPOP, SRANDMEMBER, SREM, SSCAN, SUNION và SUNIONSTORE.

### Lists
Là danh sách các chuỗi được sắp xếp theo thứ tự chèn. 

**Một số command với Lists trong redis :**

**LPUSH:** Chèn tất cả giá trị được chỉ định vào đầu danh sách đã được lưu trữ tại key

**LRANGE:** Trả về các phần tử được chỉ định của danh sách đã được lưu trữ tại key

ví dụ:
```
> $redis.lpush "lists_test", "world"
 => 1 
> $redis.lpush "lists_test", "hello"
 => 2 
> $redis.lrange "lists_test", 0, -1
 => ["hello", "world"]
```

Ngoài ra còn có các commands hữu ích khác như: BLPOP, BRPOP, BRPOPLPUSH, LINDEX, LINSERT, LLEN, LPOP, LPUSHX, LREM, LSET, LTRIM, RPOP, RPOPLPUSH, RPUSH và RPUSHX

## 3. Kết
Đây là những kiến thức mình tìm hiểu được về redis command, ngoài ra các bạn có thể tham khảo thêm link dưới đây:
https://redis.io/commands