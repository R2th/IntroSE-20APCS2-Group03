Đây là một bài toán tối ưu thực tế , tôi đã áp dụng kỹ thuật tối ưu này cho rất nhiều doanh nghiệp lớn: hệ thống Core chứng khoán, cơ sở dữ liệu core billing của đơn vị viễn thông lớn, hệ thống của ngân hàng... Bạn có thể xem danh sách các dự án tôi thực hiện tại đây:[https://wecommit.com.vn/du-an/](https://wecommit.com.vn/du-an/ ) 

Với bộ dữ liệu giả lập trong bài viết, bạn có thể thấy hiệu năng cải thiện hàng trăm nghìn lần. Trong những bài toán thực thế khi dữ liệu rất lớn (ví dụ hàng trăm triệu bản ghi, hàng tỷ bản ghi...), bạn sẽ thấy hiệu năng còn cải thiện KHỦNG KHIẾP hơn RẤT NHIỀU lần.
# 1. Mô tả bài toán

Giả sử chúng ta có 1 bảng tên là HIST để lưu trữ lịch sử giao dịch của khách hàng.
Bảng HIST có 90 cột, tổng số bản ghi hiện tại của bảng là hơn 24 triệu bản ghi.

```
SQL> select count(*) from hist;   
COUNT(*) 
24665111
```

Người dùng thường xuyên tìm kiếm trên bảng HIST theo yêu cầu như sau:
* Tìm kiếm giao dịch vào một ngày hoặc một khoảng ngày (từ ngày đến ngày).
* Khoảng thời gian tìm kiếm thường diễn ra trong 1 tháng (ví dụ: tối đa từ ngày đầu tháng đến ngày cuối tháng của một tháng nào đó).
* Tìm kiếm có thể kết hợp giữa ngày giao dịch (cột TXDATE) và một cột liên quan đến giá trị của giao dịch (AMOUNT).
Câu lệnh tìm kiếm như sau
`select * from hist where txdate=to_date('01-05-2022','dd-mm-yyyy') and amount = 4000;`
Tại đây tôi sẽ chia sẻ 1 phương án thiết kế để đảm bảo hiệu năng của ứng dụng cực kỳ nhanh và ổn định.

# 2. Phân tích hiệu năng khi chưa thiết kế PARTITION và INDEX
Để đánh giá hiệu năng của câu lệnh, chúng ta sẽ xem chiến lược thực thi của câu lệnh như thế nào.

```
select * from hist where txdate=to_date('01-05-2022','dd-mm-yyyy') and amount = 4000;

| Id | Operation | Name | Rows | Bytes | Cost (%CPU)| Time |
| 0 | SELECT STATEMENT | | 1 | 83 | 152K (1)| 00:30:29 |
|* 1 | TABLE ACCESS FULL| HIST | 1 | 83 | 152K (1)| 00:30:29 |
```

Hiện tại, khi chưa có bất kỳ kỹ thuật tối ưu nào; để tìm được dữ liệu trả ra cho người dùng, câu lệnh cần phải thực hiện quét toàn bộ các block dữ liệu của bảng HIST (TABLE ACCESS FULL). Thời gian để thực hiện câu lệnh trên là 30 phút 29s, chi phí thực hiện của câu lệnh là 152K.

# 3. Thực hiện thiết kế bảng theo chiến lược Partition

Do người dùng thường xuyên tìm kiếm theo cột TXDATE, nên tôi sẽ lựa chọn tiêu chí PARTITON là TXDATE.
Giá trị tìm kiếm thường diễn ra trong 1 tháng, do đó tra sẽ chia bảng theo các PARTITION từng tháng.
Để làm việc này tôi tạo một bảng mới tên là HIST_PARTITION với cấu trúc (các cột, định nghĩa cột trong bảng) giống hệt với bảng HIST ban đầu.
Điều khác biệt là bảng HIST_PARTITION tôi sẽ lựa chọn tham số cấu hình dạng PARTITION BY RANGE (chia những dữ liệu theo từng khoảng thời gian).
![](https://images.viblo.asia/9e6bed33-bcb2-4b2c-bf11-a7809c48b99f.PNG)

Thực hiện đổ dữ liệu từ bảng HIST sang bảng HIST_PARTITION, để đảm bảo dữ liệu 2 bảng giống hệt nhau.
Sau khi chuyển dữ liệu, trên bảng HIST_PARTITION đã có cùng số lượng bản ghi với bảng HIST
```
SQL> select count(*) from hist_partition; COUNT(*)    
24665111
```

Để mô phỏng lài bài toán đánh giá hiệu năng khi kết hợp giữa kỹ thuật PARTITION và INDEX, chúng ta thực hiện tạo dữ liệu như sau
Bảng HIST và HIST_PARTITION có cùng số lượng bản ghi, cùng thiết kế các cột.
Cả 2 bảng đều có 90 column
Bảng `HIST` và `HIST_PARTITION` đều có 24.665.111 bản ghi

```
SQL> select count(*) from hist_partition; 
COUNT(*)
24665111
SQL> select count(*) from hist;   
COUNT(*)  
24665111
```

# 4. Đánh giá hiệu năng sau khi đã thực hiện PARTITION

Tôi sẽ thực hiện câu lệnh với cùng điều kiện và giá trị tìm kiếm trên bảng HIST_PARTITION. Thông số lúc này chỉ ra như sau

```
select * from hist_partition where txdate=to_date('01-05-2022','dd-mm-yyyy') and amount = 4000;

| Id | Operation | Name | Rows | Bytes | Cost (%CPU)| Time | Pstart| Pstop |
| 0 | SELECT STATEMENT | | 1 | 152 | 3022 (1)| 00:00:37 | | |
| 1 | PARTITION RANGE SINGLE| | 1 | 152 | 3022 (1)| 00:00:37 | 18 | 18 |
|* 2 | TABLE ACCESS FULL | HIST_PARTITION | 1 | 152 | 3022 (1)| 00:00:37 | 18 | 18 |
```

Chỉ với động tác thực hiện Partition theo cột TXDATE, câu lệnh đã cải thiệt** TỤT HUYẾT ÁP (WOW)**
**Thời gian thực thi của câu lệnh lúc này chỉ còn 37s (lúc đầu là 30 phút 29s!!!)**
Chi phí để hệ thống thực hiện xong câu lệnh là 3022 (lúc đầu là 152K)
Bây giờ tuy câu lệnh đã được cải thiện rất nhiều về hiệu năng, nhưng tôi vẫn chưa bằng lòng lắm. Thời gian thực thi 37s chưa phải là điều tôi mong muốn. Do đó tôi tiếp tục thực hiện thêm 1 phương án tối ưu nữa: sử dụng Index trên bảng đã partition.

# 5. Thực hiện kết hợp Partition và Index và xem kết quả cải thiện hàng nghìn lần
## 5.1. Sử dụng Local Index trên bảng Partition

Tôi thực hiện tạo index trên Amount (do điều kiện tìm kiếm của câu lệnh).
Thực hiện tại Index như sau:

```
create index idx_amount_partition hist_partition(amount)  nologging local tablespace DATA;
```

Có 1 lưu ý tại đây: tôi sử dụng option LOCAL
Câu lệnh thực hiện lúc này sẽ thế nào, chúng ta cùng kiểm tra nhé
```

select * from hist_partition where txdate=to_date('01-05-2022','dd-mm-yyyy') and amount = 4000;

| Id | Operation | Name | Rows | Bytes | Cost (%CPU)| Time | Pstart| Pstop |
| 0 | SELECT STATEMENT | | 1 | 152 | 10 (0)| 00:00:01 | | |
| 1 | PARTITION RANGE SINGLE | | 1 | 152 | 10 (0)| 00:00:01 | 18 | 18 |
|* 2 | TABLE ACCESS BY LOCAL INDEX ROWID| HIST_PARTITION | 1 | 152 | 10 (0)| 00:00:01 | 18 | 18 |
|* 3 | INDEX RANGE SCAN | IDX_AMOUNT_P_PARTITION | 7 | | 3 (0)| 00:00:01 | 18 | 18 |
```


**Thời gian thực thi của câu lệnh đã chỉ còn ~1s**
Chi phí mà hệ thống phải thực hiện là 10.
Nếu đo lường một cách chính xác khi thực thi câu lệnh, kết quả chi tiết sẽ như sau

```
SQL> select * from hist_partition where txdate=to_date('01-05-2022','dd-mm-yyyy') and amount = 4000;
Elapsed: 00:00:00.36

Statistics
1 recursive calls
0 db block gets
31 consistent gets
0 physical reads
0 redo size
6871 bytes sent via SQL*Net to client
524 bytes received via SQL*Net from client
2 SQL*Net roundtrips to/from client
0 sorts (memory)
0 sorts (disk)
2 rows processed
```


**Thời gian thực tế khi thưc thi là 0.36s**
Để thực hiện được câu lệnh này, cơ sở dữ liệu sẽ cần lấy dữ liệu từ 31 block

## 5.2. Nếu tôi vẫn muốn TỐI ƯU hơn nữa thì sao?

Phương án chi tiết này dành riêng cho những anh em tham gia nhóm [Zalo Tư Duy - Tối Ưu - Đặc Biệt.](https://zalo.me/g/spohzm074) 
Trong nhóm anh em sẽ được nhận mật khẩu để đọc toàn bộ bài viết (nhóm đặc quyền).
Bài viết đặc quyền:[ https://wecommit.com.vn/tuning-with-partition-and-index/](https://wecommit.com.vn/tuning-with-partition-and-index/)

Sau khi áp dụng giải pháp, thông số như sau

```
---------------------------------------------------------
0 recursive calls
0 db block gets
6 consistent gets
0 physical reads
0 redo size
6871 bytes sent via SQL*Net to client
524 bytes received via SQL*Net from client
2 SQL*Net roundtrips to/from client
0 sorts (memory)
0 sorts (disk)
2 rows processed
```

Thời gian thực thi lúc này chỉ còn 0.01s
Số block dữ liệu cần thực hiện bây giờ là 6 block

# 6. Tổng kết.

Khi kết hợp chuẩn xác giữa kỹ thuật PARTITION và INDEX, câu lệnh đã được tối ưu cực kỳ SHOCK
* Thời gian thực thi ban đầu 30 phút 27s xuống chỉ còn 0.01s (NHANH NHƯ ĐIỆN)
* Chi phí để hệ thống thực hiện câu lệnh giảm hơn 30K lần (từ 152K xuống còn 5).

# 7. Tôi đã từng chia sẻ rất nhiều bài viết về kinh nghiệm tối ưu trong các dự án của ngân hàng, chứng khoán. Bạn có thể xem toàn bộ những bài viết này tại đây
[Click vào đây để xem toàn bộ những bài viết về kinh nghiệm tối ưu của tôi](https://wecommit.com.vn/tong-hop-link-cac-bai-viet-hay-tren-trang-wecommit-com-vn/)

# 8. Link bài viết gốc
Bài viết gốc: [https://wecommit.com.vn/tuning-partition-index-wecommit/](https://wecommit.com.vn/tuning-partition-index-wecommit/)
# 9. Thông tin tác giả

Tác giả: Trần Quốc Huy - Founder & CEO Wecommit
Facebook: https://www.facebook.com/tran.q.huy.71[](https://www.facebook.com/tran.q.huy.71)
Email: huy.tranquoc@wecommit.com.vn
Youtube: Trần Quốc Huy
Số điện thoại: 0888549190