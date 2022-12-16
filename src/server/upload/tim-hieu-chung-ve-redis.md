![](https://images.viblo.asia/2a451245-3e33-415a-9ae2-93339784df41.png)
### Redis là gì?
`Redis` ***(Remote Dictionary Server)*** là một mã nguồn mở (BSD licensed), lưu trữ cấu trúc dữ liệu trong bộ nhớ dưới dạng `key - value` cho tốc độ truy cập nhanh (không phải chờ ổ đĩa cứng truyền thống tìm kiếm và đọc nhiều lần) nên thường được sử dụng làm cơ sở dữ liệu, bộ nhớ đệm, trình chuyển tiếp tin nhắn hay danh sách tác vụ chờ xử lý. 

Nó hỗ trợ nhiều cấu trúc dữ liệu như ***strings, hashes, lists, sets, sorted sets*** với ***truy vấn phạm vi***, ***bitmaps, hyperloglogs, geospatial indexes*** với ***radius queries*** và ***streams***, cùng với ***scripting*** bằng ngôn ngữ ***Lua***. <br>
Ngoài lưu trữ `key - value` trên RAM với hiệu năng cao, `Redis` còn hỗ trợ lưu trữ dữ liệu trên ổ đĩa cứng (Redis persistent) cho phép phục hồi lại dữ liệu khi hệ thống gặp sự cố. Hỗ trợ `replication` ***(master-slave)*** cho phép sao chép, đồng bộ giữa 2 cơ sở dữ liệu Redis cùng đồng bộ nhanh `non-blocking` đầu tiên, tự động kết nối lại cùng đồng bộ hóa một phần khi tách mạng. Thêm vào đó, tính năng `cluster` (sao lưu ***master-master***) cũng đang được phát triển cho phép cân bằng tải (load balancing).

`Redis` được phát triển theo phong cách ***NoSQL*** bởi `Salvatore Sanfilippo`, hiện cung cấp thời gian phản hồi với tốc độ chưa đến ***1ms***, giúp thực hiện ***hàng triệu request mỗi giây*** cho các ứng dụng thời gian thực trong lĩnh vực game, quảng cáo, dịch vụ tài chính, chăm sóc sức khỏe và `IoT`.
### Tại sao nên sử dụng Redis?
1. Là cơ sở dữ liệu ***NoSQL***.
2. Thực sự rất nhanh, bởi tất cả, nó được viết bằng ***ANSI C***. 
3. Đang được sử dụng bởi các ông lớn công nghệ như ***GitHub, Weibo, Pinterest, Snapchat, Craigslist, Digg, StackOverflow, Flickr***.
4. Dùng để lưu trữ các ***call*** cơ sở dữ liệu ***cloud*** và tiết kiệm chi phí. Ngoài ra, có thể chọn lưu vào bộ đệm ẩn của Redis.
5. Thân thiện với các nhà phát triển và hỗ trợ nhiều ngôn ngữ như ***Python, Java, PHP, Perl, Go, Ruby, C/C#/C++, JavaScript, Node.js, …***
6. Là mã nguồn mở và ổn định.
### Cách thức hoạt động?
`Redis` lưu trữ dữ liệu trong bộ nhớ, khác với các cơ sở dữ liệu khác thường lưu dữ liệu trên ổ đĩa cứng. Điều này giúp loại bỏ việc cần phải truy cập vào ổ đĩa, tăng khả năng truy xuất dữ liệu trong vài ***micro giây*** do không tốn thời gian tìm kiếm. 
### Modules của Redis
Các modules của Redis bao gồm:
1. ***Framework hỗ trợ xử lý bất đồng bộ, networking:*** ae, anet
2. ***Mô tả dữ liệu:*** sds.c, t_hash.c, t_list.c, t_string.c, t_zset.c, object.c, notify.c (pub-sub)
3. ***Lưu trữ dữ liệu, cơ sở dữ liệu:*** db.c, dict.c, ziplist.c, zipmap.c, adlist.c
4. ***Hỗ trợ IO/redis persistent:*** rdb.c, aof.c, bio.c, rio.c
5. ***Utilities:*** crc16.c, crc64.c, pqsort.c, lzf_c.c, lzf_d.c
### Ưu điểm của Redis
Có cấu trúc dữ liệu linh hoạt, độ khả dụng cao, dữ liệu không gian địa lý, ***Lua scripting***, ***transactions***, lưu trữ lâu dài trên ổ đĩa và hỗ trợ ***cluster***, giúp xây dựng các ứng dụng thời gian thực quy mô lớn dễ dàng hơn.
1. Hỗ trợ thêm mới, cập nhật hay xoá dữ liệu một cách nhanh chóng. Và có thể cấu hình cho key ***tự động xoá*** trong khoảng thời gian nhất định (***expire time***).
2. Lưu trữ dữ liệu dưới dạng key - value trên bộ nhớ chính của server, tránh phải truy cập qua lại ổ đĩa giống các cơ sở dữ liệu như ***PostgreSQL, Cassandra, MongoDB, ...*** Do vậy, có thể hỗ trợ được thêm hàng triệu tác vụ (như đọc/ghi) truy xuất dữ liệu, thời gian phản hồi nhanh chưa tới 1ms. <br>Nhưng chúng ta vẫn có thể cấu hình Redis để lưu dữ liệu trên ổ cứng.
3. Cấu trúc dữ liệu linh hoạt giúp tương tác và đáp ứng được nhiều yêu cầu của nhiều ứng dụng.
    * ***STRING:*** string, integer, hoặc float có kích thước tới 512MB.
    * ***LIST:*** tập hợp liên kết các strings được sắp xếp như khi thêm vào (hỗ trợ các phương thức push, pop, trim theo offset, duyệt, search và delete giá trị).
    * ***SET:*** tập hợp các strings chưa được sắp xếp, có hỗ trợ thêm các phép toán tập hợp.
    * ***ZSET (sorted set):*** tập hợp được sắp xếp theo giá trị. Mỗi phần tử là map của 1 string member và 1 floating-point number (score), tập hợp sẽ được sắp xếp theo score này. <br>Redis hỗ trợ thao tác thêm, đọc, xóa từng phần tử, lấy ra các phần tử dựa theo khoảng của score hoặc của string.
    * ***HASH:*** lưu hash table của các cặp key-value, key được xếp random.
    * ***Bitmap:*** kiểu dữ liệu cho việc thực hiện các tác vụ phạm vi bit. Thích hợp khi tiết kiệm không gian lưu trữ thông tin.
    * ***HyperLogLogs:*** cấu trúc dữ liệu xác suất ước tính các key duy nhất trong một tập dữ liệu.
4. Đơn giản dễ sử dụng: `Redis` đơn giản hóa bằng cách viết ít dòng lệnh hơn để lưu trữ, truy xuất và sử dụng.
5. Khả năng sao chép: sử dụng kiến trúc bản sao-chủ, hỗ trợ sao chép không đồng bộ, sao chép dữ liệu sang nhiều bản sao máy chủ. Đem lại hiệu suất đọc cao do có thể chia tách các yêu cầu giữa các máy chủ với nhau, tốc độ khôi phục nhanh khi máy chủ chính gặp sự cố.
6. Bền vững: hỗ trợ sao lưu tại một thời điểm bất kỳ, sao chép dữ liệu Redis sang ổ đĩa cứng.
7. Độ khả dụng cao, đảm bảo hiệu suất ổn định và tin cậy, và có thể điều chỉnh kích thước các cụm (***cluster***) tùy chọn tăng tính linh hoạt.
8. Khả năng mở rộng: là mã nguồn mở được phát triển bởi một cộng đồng đông đảo, có tính mở, hỗ trợ nhiều định dạng dữ liệu phong phú nên không giới hạn công nghệ và vendor.
### Ứng dụng phổ biến của Redis
`Redis` thường được chọn để sử dụng cho các hoạt động lưu trữ bộ nhớ đệm (***caching***), quản lý phiên, game, bảng xếp hạng, phân tích thời gian thực, dữ liệu không gian địa lý, ứng dụng đặt xe, trò chuyện/nhắn tin, streams và pub/sub, Machine Learning.
> ***Caching*** là quá trình lưu trữ một số dữ liệu trong ***Cache***. Bộ nhớ ***Cache*** là khu vực thành phần lưu trữ tạm thời, nơi dữ liệu được lưu trữ để dùng trong tương lai giúp dữ liệu có thể được phục vụ nhanh hơn.
### Cài đặt Redis trên Ubuntu
Thêm repository mới:
```r
$ sudo add-apt-repository ppa:chris-lea/redis-server
```
Cập nhật lại system:
```r
$ sudo apt-get update
```
Cài đặt máy chủ Redis:
```r
$ sudo apt-get install -y redis-server 
```
Sẽ thành công nếu chạy được lệnh:
```r
$ redis-cli
```
Redis sử dụng cổng mặc định là ***6379***.

![](https://images.viblo.asia/6599c3f5-2429-4633-bb79-2055f1c739f3.png)
### Một số lệnh Redis cơ bản
* Setting key: **SET [key] [value] [expiration time]**

![](https://images.viblo.asia/6c2fca46-67ba-403b-b4b8-02d397ddd3db.png)

* Setting key với expiry: **SETEX [key] [seconds] [value]**

![](https://images.viblo.asia/a95dc8b2-858c-4157-8f48-ad2cef75e867.png)

* Getting key: **GET [key]**

![](https://images.viblo.asia/5c86a61c-e82c-48bd-bda4-1cdd4d91021f.png)

* Deleting key: **DEL [key] [key ...]**

![](https://images.viblo.asia/be0b6af0-ef80-4ee7-9df4-aaf3110f25eb.png)

* Total Time còn lại cho key có timeout: **TTL [key]**

![](https://images.viblo.asia/06716b85-f283-4d25-a33b-087a5e8ea95b.png)

* Xóa timeout khỏi key: **PERSIST [key]**

![](https://images.viblo.asia/3a8443ee-2968-4c2b-84f2-9ae153b301fc.png)

* Đổi tên của key hiện tại: **RENAME [key] [newkey]**

![](https://images.viblo.asia/09329b8d-91aa-43b1-bedf-26e3234d055c.png)

* Flush mọi thứ được lưu từ trước: **FLUSHALL [ASYNC]**

![](https://images.viblo.asia/83b9a1b6-b1d5-4c48-a12a-6eefb96c7591.png)

Ngoài ra, còn một số lệnh với list, hash, set, ... mình sẽ tìm hiểu sâu hơn ở những bài sau về Redis như:
* **LPUSH [list] [value] [value ...]**
* **SADD [key] [member] [member ...]**
* **HMSET [key] [field] [value] [field value ...]**
* **ZADD [set] [score] [value]**
* **SETBIT [key] [offset] [value]**

### Kết luận
Bài viết trên mình đã trình bày một số thông tin cơ bản về Redis. Trong các bài viết tiếp theo về Redis, chúng ta sẽ cùng tìm hiểu sâu hơn và thực hành các lệnh, chức năng của mã nguồn mở này.
### Tham khảo
* [Redis: What and Why?](https://codeburst.io/redis-what-and-why-d52b6829813)