**Seri Redis của chúng ta gồm những phần sau:**
```
Phần 1: Cài đặt redis cơ bản + Turning redis.
Phần 2: Lệnh quản trị redis cơ bản
Phần 3: Bảo mật cho redis. (redis security)
Phần 4: Access List Redis (tính năng mới từ bản 6)
Phần 5: Các mô hình Redis replication, Ưu và nhược điểm
Phần 6: Redis Master-Salve sử dụng ACL
Phần 7: Redis Sentinel sử dụng ACL
Phần 8: Cài đặt Redis Cluster
Phần 9: Di chuyển data từ redis đơn sang cluster và ngược lại.
Phần 10: Data type trong Redis, một vài ví dụ sử dụng (String/hash/sort/list/queue/pub-sub....).
Phần 11: Một số lỗi thường gặp khi quản trị hệ thống Redis.
Phần 12: Continue...
```


# Phần 4: Access List Redis (ACL tính năng mới ở bản 6 + 7)
ACL trong Redis giống với gán Role quyền trong Database vậy. Đôi khi 1 client kết nối mà chọc được toàn bộ dữ liệu redis vẫn là quá rủi ro về bảo mật (nhẹ thì bị xóa trắng, mà nặng thì public data ngoài internet). Để enable ACL, nếu hệ thống mới ta sẽ extend quyền dần, nhưng hệ thống cũ đã chạy - bạn cần nắm rõ code đang chạy loại dữ liệu gì để giới hạn quyền thật chuẩn, tránh việc làm lỗi hệ thống. (sử dụng lệnh MONITOR đến giám sát code đang gọi redis như nào và nên trao đổi với DEV Team).

Mặc định redis luôn có user là default và không có mật khẩu:
```
127.0.0.1:6379> ACL LIST
1) "user default on nopass ~* &* +@all"
```
Để đặt password cho user default này ta làm như sau:
```
127.0.0.1:6379> ACL SETUSER default on >matkhau_default
OK
127.0.0.1:6379> ACL LIST
1) "user default on #231d539d073fe5d91a24a56df3196aab2ace130b905d39011840923f9a893ddb ~* &* +@all"
127.0.0.1:6379> CONFIG REWRITE
OK
```
Để đăng nhập lại vào redis-cli ta cần gõ thêm mật khẩu và user để vào đc:
```
[root@master-node conf]# redis-cli --user default --pass matkhau_default
hoặc
[root@master-node conf]# redis-cli 
127.0.0.1:6379> AUTH default matkhau_default
OK
```

**Cấu trúc cơ bản của 1 lệnh ACL redis bao gồm**
```
ACL SETUSER <username> on ... acl rules ...
ACL SETUSER <username> on >password +<quyền> ~<key> &<channel>
--------------------
Quyền sẽ được load từ trái sang phải, chi tiết như sau:
1) on / off : khóa user
2) >matkhau :đặt mật khẩu cho user. (Ví dụ >5ppW3IDwzKcS)
3) +/- : Command redis được phép chạy, ví dụ +get, +set, +info, hoặc +@<nhóm quyền>.
4) ~ : phạm vi key được áp dụng (để mở toàn bộ bằng ~* , )
5) & : Liên quan đến pub/sub channel của redis (để mở toàn bộ &*).
>
```

Để kiểm tra redis đang có user mặc định nào, và có những quyền gì bằng lệnh ACL LIST
```
[root@master-node conf]# redis-cli 
127.0.0.1:6379> ACL LIST
1) "user default on nopass ~* &* +@all"
Giải thích: User default, trạng thái enable ON, không cần pass đăng nhập nopass, full quyền với các key ~*, full quyền với channel &*, full câu lệnh được sử dụng +@all
```
Để biết redis có những nhóm quyền nào +@<nhóm quyền> , để dễ gán nhóm quyền cho user. Ta dùng lệnh ACL CAT
```
127.0.0.1:6379> ACL CAT
 1) "keyspace"
...
...
...
...
4) "set"
18) "dangerous"
```
### Bài Toán 1: 
```
- Tôi muốn phân quyền cho developer1 có mk là matkhau1. 
- Có quyền trên cho toàn bộ data type redis và channel: 
- Quyền sử dụng toàn bộ lệnh của redis.
- bỏ quyền hệ thống admin.
- bỏ quyền sử dụng câu lệnh nguy hiểm. 
```


```
1) Để xem nhóm quyền admin, dangerous có những lệnh nào
127.0.0.1:6379> ACL CAT admin
127.0.0.1:6379> ACL CAT dangerous

2) Xử lý bài toán
127.0.0.1:6379> ACL SETUSER developer1 on >matkhau1  ~* &* +@all -@admin -@dangerous -@admin
127.0.0.1:6379> CONFIG REWRITE
```

### Bài Toán 2:
```
Redis của tôi chỉ có 2 loại dữ liệu là String và Hash (bao gồm GET/HGET/HGETALL). 
Tôi muốn bạn developer2 mới vào , đăng nhập bằng matkhau2, 
chỉ đọc được dữ liệu string và hash. 
Ngoài ra không được chạy lệnh nào khác.
```

```
1) Đặt quyền
127.0.0.1:6379> ACL SETUSER developer2 on >matkhau2 ~* &* -@all +get +hget +hgetall
127.0.0.1:6379> CONFIG REWRITE

2 )Thử đăng nhập vào user developer2. Có quyền get nhưng ko cho set.
127.0.0.1:6379> AUTH developer2 matkhau2
127.0.0.1:6379> get tuanda
"111"
127.0.0.1:6379> set tuanda newvalue
(error) NOPERM this user has no permissions to run the 'set' command or its subcommand

3) kiểm tra với Hash:
127.0.0.1:6379> hgetall user:tuanda
1) "id"
2) "100"
```

### Bài Toán 3:
```
Tôi muốn developer3 đăng nhập bằng matkhau3 (accout này sẽ cho code chạy). 
Phạm vi quyền là set/get theo các key "user:XXXXXXXXXXXXX"
không có quyền can thiệp vào các key value khác.
```

```
127.0.0.1:6379> ACL SETUSER developer3 on >matkhau3 ~user:* -@all +get +set 
127.0.0.1:6379> CONFIG REWRITE
127.0.0.1:6379> AUTH developer3 matkhau3
127.0.0.1:6379> get user:tuanda
"9999"
127.0.0.1:6379> get category:tuanda
(error) NOPERM this user has no permissions to access one of the keys used as arguments
127.0.0.1:6379> get test
(error) NOPERM this user has no permissions to access one of the keys used as arguments
127.0.0.1:6379> set user:newuser2 8888
OK
```


### Chú ý cách đặt thứ tự quyền:
```
Lệnh 1_ 127.0.0.1:6379> ACL SETUSER developer4 on >matkhau4 ~* -set +@all
Lệnh 2_127.0.0.1:6379> ACL SETUSER developer4 on >matkhau4 ~* +@all -set
```
hai lệnh này sẽ khác nhau. Vì redis load ACL từ trái qua phải:
- Với lệnh 1 khi -set xong ta lại +all thế hóa ra cuối cùng là Full quyền bao gồm cả set. 
- Với lệnh 2 ta đã cho all quyền, nhưng lại -set > nên cuối cùng không có quyền SET.






### Chi tiết thêm về nhiều ví dụ về ACL, mời các bạn đọc

https://redis.io/topics/acl

https://redis.io/commands#server