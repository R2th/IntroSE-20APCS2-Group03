© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Phần trước đã tìm hiểu về một mớ lý thuyết của **Vacuum**, phần này sẽ xem qua về **reindex** và tập trung vào practice với **vacuum** để kiểm nghiệm thực tế thế nào. Let's begin.

## 1) Reindex

**REINDEX**, nghe phát hiểu luôn ý nghĩa, đó là thực hiện build lại index cho index/table/database...

```sql
REINDEX INDEX index_name;

REINDEX TABLE table_name;

REINDEX SCHEMA schema_name;

REINDEX DATABASE database_name;
```

Về cơ bản, **reindex** build lại index table từ đầu, giống kết quả của việc **drop** và **create** index. Tuy nhiên cơ chế locking giữa hai cách thực thi có đôi chút khác biệt.

Trước khi tìm hiểu kĩ hơn, cùng trả lời câu hỏi vì sao cần **reindex**. Có 3 lý do chính ta cần thực hiện **reindex**:
> - Thứ nhất, không có gì là hoàn hảo. Index table hoàn toàn có khả năng bị lỗi do hardware failure hoặc... PostgreSQL bugs :joy:. **Reindex** như một cách recovery hệ thống trong trường hợp này.
> - Thứ hai, index cũng là table, cũng sẽ có **dead tuple**. Nếu quá nhiều **dead tuple** thì quá trình scan cũng ảnh hưởng đến performance và tốn disk space.
> - Cuối cùng, khi thực hiện **alter index**, ví dụ từ một column thành hai column.

Vậy sự khác biệt giữa **reindex** và **drop** & **create** index là gì?

Với **reindex**:
> - Hệ thống sẽ tạo lại **index table** sử dụng **shared lock**. Có thể concurrent read nhưng không thể concurrent write.

Với **drop** & **create**:
> - **DROP** thực hiện exclusive lock trên table, đảm bảo không thể concurrent read/write tránh inconsistence data.
> - Sau đó **CREATE** thực hiện **shared lock** trên table, đảm bảo không có concurrent write để thực hiện build index table.

Như vậy, **reindex** đâu đó sẽ cho performance tốt hơn so với việc xóa đi và tạo lại, tuy nhiên cost cho nó khá lớn. Do vậy chỉ khi không nghĩ ra cách nào khác thì thực hiện **reindex**. 

## 2) Practice

Sử dụng data từ [bài trước](https://viblo.asia/p/002-hieu-ve-index-de-tang-performance-voi-postgresql-p1-3Q75wV3elWb).

Trước tiên cần install extension pgstattuple để theo dõi các thông số liên quan đến **dead tuple**:

```sql
CREATE EXTENSION pgstattuple;
```

Kiểm tra thông tin **tuple** của table **ENGINEER**:

```sql
SELECT * FROM pgstattuple('engineer');
```

| table_len | tuple_count | dead_tuple_count | free_space | free_percent |
| --------- | ----------- | ---------------- | ---------- | ------------ |
|9150464|100000|0|44572|0.49|

Còn một vài column khác tuy nhiên chỉ cần quan tâm đến những column sau:
> - **table_len**: dung lượng table.
> - **tuple_count**: tổng số lượng record hiện có trong table, bằng số lượng record insert vào table.
> - **dead_tuple_count**: số lượng **dead tuple**. Do chưa thực hiện DELTE/UPDATE nên giá trị = 0.
> - **free_space**: dung lượng còn trống trong các page của table. 
> - **free_percent**: tỉ lệ **free_space**/**table_len**.

Tiến hành delete 100 record trong table **ENGINEER**:

```sql
DELETE FROM engineer WHERE id IN (SELECT id FROM engineer ORDER BY id LIMIT 100);
```

Query lại statistic của table **ENGINEER**:

```sql
SELECT * FROM pgstattuple('engineer');
```

| table_len | tuple_count | dead_tuple_count | free_space | free_percent |
| --------- | ----------- | ---------------- | ---------- | ------------ |
|9150464|99900|100|44572|0.49|

Như vậy đã có 100 dead tuple, vẫn nằm trong table. **Free space** không có gì thay đổi.

Thực hiện **vacuum** và kiểm tra lại xem thế nào:

```sql
VACUUM engineer;

SELECT * FROM pgstattuple('engineer');
```

| table_len | tuple_count | dead_tuple_count | free_space | free_percent |
| --------- | ----------- | ---------------- | ---------- | ------------ |
|9150464|99900|0|53168|0.58|

Ta biết rằng **vacuum** không thực sự giải phóng disk space, mà chỉ clear **dead tuple**, dự trữ space cho **future tuple**. Như vậy, **table len** không đổi, **dead tuple** clear về 0 và **free space** đã tăng.

Nếu lý thuyết đúng như trên, khi thực hiện insert thêm record thì expect **table len** không đổi, **tuple count** tăng và **free space** giảm:

```sql
INSERT INTO engineer(first_name, last_name, gender, country_id, created)
	VALUES('Vacuum', 'Test', 1, 1, CURRENT_TIMESTAMP);
    
SELECT * FROM pgstattuple('engineer');
```

| table_len | tuple_count | dead_tuple_count | free_space | free_percent |
| --------- | ----------- | ---------------- | ---------- | ------------ |
|9150464|99901|0|53104|0.58|

Cuối cùng, tiến hành **vacuum full** để giải phóng disk space. Expect **table len** giảm do đã xóa 100 records, **free space** cũng giảm xuống xung quanh giá trị khi insert ban đầu là 44572:

```sql
VACUUM FULL engineer;

SELECT * FROM pgstattuple('engineer');
```

| table_len | tuple_count | dead_tuple_count | free_space | free_percent |
| --------- | ----------- | ---------------- | ---------- | ------------ |
|9142272|99901|0|45344|0.5|

## 3) Khi nào nên sử dụng **vacuum full**?

Câu trả lời sẽ dựa trên mục đích của câu lệnh và mục đích mà bạn cần.

Cả 2 đều giải phóng unused disk space, giảm thiểu phân mảnh, giúp quá trình scan table/index table mượt mà hơn, đem lại performance tốt hơn. Tuy nhiên cost để xử lý là khá cao.

Do vậy, có một vài lưu ý khi quyết định sử dụng hay không:
> - **Vacuum full** với table có số lượng record nhỏ không đem lại nhiều hiệu quả.
> - Do vậy, chỉ thực sự cần thiết khi table có tần suất UPDATE/DELETE cực nhiều và số lượng record cực lớn. Mặc định PostgreSQL đã enable autovacuum nên với những table bình thường không cần quá lo lắng.
> - Đồng nghĩ với việc đó, quá trình **vacuum full** có thể diễn ra trong một khoảng thời gian dài, ảnh hưởng đến business. Do vậy nếu có thực hiện thì nên lựa lúc nửa đêm hoặc giờ thấp điểm.
> - Đừng sử dụng quá thường xuyên, nó không đem lại hiệu quả nhiều. Kinh nghiệm thực tế **once per month** là đủ. Lưu ý rằng đó là những table có tần suất modify data cực lớn mới cần sử dụng.
> - Cố gắng tránh **vacuum full**. Thay vì thế hãy tunning các thông số **autovacuum** và thực hiện **vacuum** là đủ.
> - Chỉ nên dùng khi.. hết cách. Hoặc bạn muốn nghịch hệ thống.. cũng không có vấn đề gì với mình :joy:.

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)