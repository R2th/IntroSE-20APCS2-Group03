Việc gộp các index trong việc tìm kiếm kết quả là việc gộp các kết quả của nhiều điều kiện lọc với việc sử dụng các index khác nhau. Cách làm này chỉ quét từ 1 bảng đơn, không sử dụng với nhiều bảng. Việc gộp có thể tạo ra phép nối, giao hoặc là nối các giao kết quả của các lần lọc.
Ví dụ dưới đây cho thấy việc gộp index có thể áp dụng được:
```sql
SELECT * FROM tbl_name WHERE key1 = 10 OR key2 = 20;

SELECT * FROM tbl_name
  WHERE (key1 = 10 OR key2 = 20) AND non_key = 30;

SELECT * FROM t1, t2
  WHERE (t1.key1 IN (1,2) OR t1.key2 LIKE 'value%')
  AND t2.key1 = t1.some_col;

SELECT * FROM t1, t2
  WHERE t1.key1 = 1
  AND (t2.key1 = t1.some_col OR t2.key2 = t1.some_col2);
```

> Chú ý
> Thuật toán tối ưu việc gộp index có 1 vài giới hạn dưới đây:

> Nếu truy vấn có 1 mệnh đề WHERE phức tạp với các toán tử AND/OR nhiều lớp và MySQL không chọn được cách tối ưu, hãy thử 1 vài cách biến đổi logic sau: 

> `(x AND y) OR z => (x OR z) AND (y OR z)
(x OR y) AND z => (x AND z) OR (y AND z)`

> Việc gộp index không áp dụng cho index full-text 

Ta sẽ thấy ở kết quả của EXPLAIN, phương thức gộp sẽ xuất hiện index_merge ở cột type. Trong trường hợp này, cột key sẽ chứa danh sách các index được sử dụng và key_len sẽ cho thấy danh sách các key dài nhất cho index đó
Phương thức gộp index có 1 vài thuật toán, thuật toán này sẽ xuất hiện ở cột Extra của kết quả EXPLAIN:
> Sử dụng intersect(...)

> Sử dụng union(...) 

> Sử dụng sort_union(...)

Các phần dưới đây sẽ mô tả chi tiết hơn về các thuật toán. Trình tối ưu sẽ chọn giữa các index khác nhau có thể được cho thuật toán gộp và các các phương thức khác  dựa trên việc ước lượng tối ưu  của các lựa chọn có thể thực hiện.
Để lựa chọn thuật toán thực hiện, sẽ có các giá trị index_merge, index_merge_intersection, index_merge_union, and index_merge_sort_union được thiết lập ở biến hệ thống optimizer_switch. Mặc định tất cả các thuật toán được chọn, để chỉ chọn 1 thuật toán bạn có thể tắt index_merge sang off và bật chỉ 1 giá trị thuật toán sang on.