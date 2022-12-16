Lâu rồi không viết bài trên viblo nên để cái tiêu đề hơi công nghiệp =)) Xin chào các bạn, đợt rồi mình mới được làm vài task cải thiện thiện tốc độ truy vấn `mysql` nên hôm nay xin phép chia sẻ lại chút kinh nghiệm cải thiện. Bài viết hơi nhiều chữ nhưng chứa khá khá hàm lượng kiến thức nên khuyến cáo các bạn đọc lúc không buồn ngủ nhé ^^

Nói qua một chút thì thì project sử dụng `Laravel` và `mysql`, hệ thống trả về cái response tương ứng với những đầu API.

Mình nhảy vào `support` vài màn hình mà `tester` và phía khách hàng feedback là chậm. Quy trình của mình để nhanh chóng tìm ra vấn đề như sau.

*  Đồng bộ lại cơ sở dữ liệu ở môi trường `staging`, `production` về `local` bằng các sử dụng chức năng `import`, `export` trên các hệ quản trị cơ sở dữ liệu. Mục đích của việc này để đảm bảo lượng dữ liệu trong quá trình làm việc trên local đủ lớn. Thường thì **hệ thống sẽ chỉ chậm như rùa khi có dữ liệu lớn.**

*  Sử dụng một số package như **debugbar**, **telescope** phục vụ quá trình điều tra **request**, **response**, **dump mysql** để nhanh chóng xác định những câu truy vấn chậm.

Vì hệ thống chỉ viết API nên mình sử dụng **[telescope](https://github.com/laravel/telescope)** trong trường hợp này. Cách cài đặt `package` vào dự án vui lòng xem tại những tài liệu chính thống.

# 1. Explain SQL
Sau khi điều tra với telescope mình xác định được một vài câu truy vấn có thời gian thực thi khá lâu (khoảng **2s, 3s**)

```mysql
mysql> explain select SUM(duration) as duration, MINUTE(start_time) div 15 as quarterly, `window_title_hash`, `application_name` from `logs`
    -> where `user_id` = 53 and `start_time` LIKE '2021-04-06 13%' 
    -> group by `quarterly`, `window_title_hash`, `application_name`\G;
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: logs
   partitions: NULL
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 584684
     filtered: 1.11
        Extra: Using where; Using temporary; Using filesort
```
Trên đây là câu truy vấn gây chậm hệ thống sau khi đã được `explain`. Một tips khi làm việc với explain của mình là sẽ quan tâm đến yếu tố đầu tiên là **rows**. Ở đây bạn có thể nhìn thấy con số khá lớn **584684**

**Rows** cho ta biết số lượng bản ghi đã được duyệt để trả về kết quả, nói cách khác khi duyệt qua càng ít rows thì câu truy vấn của bạn càng tối ưu.

**Type** cũng là một thuộc tính mình hay quan tâm khi `explain`. Trong thực tế với một truy vấn có khá nhiều `type` nhưng mình hay để ý nhất khi type là `ALL`. Điều này đồng nghĩa với việc câu truy vấn của bạn đang thao tác với bảng chưa được đánh `index`.

Trên viblo có những bài viết rất hay về **[Indexing](https://viblo.asia/p/mysql-indexing-PDOkqWxAGjx)** và **[Explain](https://viblo.asia/p/su-dung-explain-de-toi-uu-cau-lenh-mysql-BYjv44gmvxpV)**, các bạn có thể vui lòng đọc lại. Trong khuôn khổ bài viết này mình sẽ không giới thiệu về chúng cũng như cách hoạt động nữa. Mình sẽ chỉ ra với trường hợp thực tế việc đánh `index` có hiệu quả như thế nào.

Okay, vấn đề tiếp theo là giải quyết bài toán làm sao để truy vấn càng scan qua ít row càng tốt, ở trường hợp này mình lựa chọn phương án đánh index cho ***start_time***, ***user_id***.

# 2. Where like with index
Đáng ra bài viết sẽ chẳng có gì khi đánh index là xong, nhưng mà trong quá trình đánh **index** gặp vài vấn đề nên mình sẽ trao đổi tiếp.

Theo bản năng mách của thanh niên chưa trải sự đời mình lao vào đánh `index` cho trường ***start_time***, ***user_id***

Sau khi đánh **index** xong mình **explain** lại thì kết quả **không được như mong muốn**.
```mysql
mysql> explain select SUM(duration) as duration, MINUTE(start_time) div 15 as quarterly, `window_title_hash`, `application_name` from `logs`
    -> where `user_id` = 53 and `start_time` LIKE '2021-04-06 13%' 
    -> group by `quarterly`, `window_title_hash`, `application_name`\G;
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: logs
   partitions: NULL
         type: ref
possible_keys: start_time_idx,user_id_idx
          key: user_id_idx
      key_len: 4
          ref: const
         rows: 292342
     filtered: 11.11
        Extra: Using index condition; Using where; Using temporary; Using filesort

```
Mình nhận ra có 2 vấn đề sau khi đã đánh **index** với câu `query` này 

* Trường **start_time** mặc dù đã được đánh **index** nhưng không sử dụng được trong trường hơp này. Sau khi tìm hiểu thì do mình sử dụng **WHERE LIKE**. Còn tại sao dùng **WHERE LIKE** không hoạt động với **index** thì lại phải tìm hiểu về cách hoạt động của **index**, **B-Tree** nên mình sẽ nợ các bạn trong bài viết này.

* Số lượng bản ghi đang scan quá vẫn **quá lớn**, ***lí do là trong bảng logs của mình đang có quá nhiều userid = 53***. Vì vậy mặc dù đã được đánh index nhưng vẫn không làm giảm được nhiều số lượng bản ghi được scan.

# 3.  Index Hints and something new
Đầu tiên ý tưởng của mình thử tìm các để `start_time` hoạt động được với `index`. Nhìn lại câu truy vấn một chút chỗ `WHERE LIKE`
```sql
WHERE `start_time` LIKE '2021-04-06 13%'
// Refactor thành
WHERE `start_time` >= '2021-04-06 13:00:00' and `start_time` < '2021-04-06 14:00:00'
```

Check lại với **explain**  thì **Amazing good job**

```mysql
mysql> explain select SUM(duration) as duration, MINUTE(start_time) div 15 as quarterly, `window_title_hash`, `application_name` from `logs` where `user_id` = 53 and `start_time` >= '2021-04-06 13:00:00' and `start_time` <= '2021-04-06 14:00:00' group by `quarterly`, `window_title_hash`, `application_name`\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: logs
   partitions: NULL
         type: range
possible_keys: user_id_idx,start_time_idx
          key: start_time_idx
      key_len: 5
          ref: NULL
         rows: 2598
     filtered: 50.00
        Extra: Using index condition; Using where; Using temporary; Using filesort
1 row in set, 1 warning (0.00 sec)

```
Chúng ta có thấy ở cột **rows** thì số lượng bản ghi phải scan qua đã giảm đi rất nhiều từ khoảng **292342 xuống 2598**.

Đừng vội vui mừng trước thành quả mà hãy nhìn lại một chút tại sao mysql lại hoạt động như vậy, ý mình là việc `index` đang hoạt động.


Trong trường hợp này mình đang đánh **index** cho cả 2 trường **user_id**, **start_time**. Chúng ta có thể thấy nó được thể hiện ở thuộc tính `possible_keys`. Nhưng tại sao chỉ có `start_time` được chọn làm `index` thay vì `user_id`. Mặc dù mình đã cố gắng **thay đổi vị trí where của user_id lên đầu** nhưng giá trị **key** được chọn vẫn là **start_time**  ???


**Index Hints** là keyword cho bạn tìm hiểu !!!

**Index Hints** cung cấp cho **query optimizer**  về cách chọn index trong quá trình xử lí truy vấn. Tức là mysql luôn cố gắng tìm index tối ưu nhất cho truy vấn. Trong ví dụ trên chúng ta có thể thấy 
* Nếu sử dụng `user_id` làm **index** thì truy vấn phải scan qua 292342 bản ghi

* Nếu dùng `start_time` làm **index** thì truy vấn chỉ scan qua 2598 bản thi thôi.

Ngoài ra, trong nhiều trường hợp, các bạn vẫn muốn sử dụng `user_id` làm **index** thì có thể xem xét đến các phương án như **USE INDEX**, **IGNORE INDEX** hay **FORCE INDEX** trong các câu truy vấn của mình.


Quay lại câu truy vấn ban đầu, nếu như trong một số **trường hợp chỉ lọc theo user_id và k có start_time thì sao**.
```mysql
mysql> explain select SUM(duration) as duration, MINUTE(start_time) div 15 as quarterly, `window_title_hash`, `application_name` from `logs` where `user_id` = 53  group by `quarterly`, `window_title_hash`, `application_name`\G 
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: logs
   partitions: NULL
         type: ref
possible_keys: user_id_idx
          key: user_id_idx
      key_len: 4
          ref: const
         rows: 292342
     filtered: 100.00
        Extra: Using index condition; Using temporary; Using filesort
1 row in set, 1 warning (0.00 sec)
```
Các bạn có thể thấy trong trường hợp này, **user_id** vẫn mặc dù được đánh index nhưng vẫn phải scan qua nhiều bản ghi. Lúc này tùy thuộc vào bài toán mà chúng ta có thể tiến hành **tách ra làm bảng riêng cho dễ truy vấn**. Ví dụ trong trường hợp này bạn hoàn toàn có thể tạo thêm bảng **log_duration** 


| id | total_duration |  user_id |
| -------- | -------- | -------- |
| 1     | 100     | 53     |

Lúc này truy vấn của chúng ta có thể vẫn đạt được kết quả như mong muốn mà không phải sử dụng truy vấn tốn nhiều thời gian.


# 4. Tổng kết

Trên đây là một số ghi chép của mình trong quá trình làm task lại mà chúng ta có thể tổng kết lại như sau 
1. Để nhanh chóng xác định những câu truy vấn chậm trong các màn hình phức tạp, chưa rõ spec hãy sử dụng những package dump các truy vấn raw sql khi mà thời người người nhà nhà sử dụng ORM
2. Sử dụng **explain** để điều tra truy vấn, theo dõi trường **type** xem đã sử dụng index trong các truy vấn WHERE hay chưa ? theo dõi trường **rows** xem đang scan qua bao nhiêu bản ghi, có thể đánh index nhưng vẫn chưa giải quyết được vẫn đề
3. Theo dõi trường **possible_keys** để check đang có bao nhiêu trường được đánh **index**, theo dõi trường **key** để chắc chắn **index** nào đang được sử dụng. 
4. Trong một số trường hợp, hãy nghĩ đến việc tạo thêm bảng mới lưu trữ data thay vì cố gắng lưu vào một bảng 


Cảm ơn các bạn theo dõi bài viết, nếu thấy bài viết bổ ích vui lòng **upvote** và **theo dõi** mình để có động lực ra nhiều bài viết hơn nhé ^^