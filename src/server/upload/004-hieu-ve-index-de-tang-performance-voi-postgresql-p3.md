© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Bài thứ 4 trong series tiếp tục bàn luận về **Hash index** còn dở dang ở bài trước.

![](https://i.imgur.com/GQxQnz8.png)

## 1) What
Trước khi đi vào chi tiết, cùng xem lại nhiệm vụ, tính chất của **hash function**:
> - Biến input có độ bài bất kì thành output có độ dài cố định.
> - Độ dài cố định là bao nhiêu phụ thuộc vào thuật toán sử dụng.
> - Với cùng input luôn hash ra cùng output.
> - Khả năng để nhiều input hash ra một output là rất rất thấp.
> - Khi input thay đổi dù một giá trị nhỏ nhất thì output cũng thay đổi.
> - Từ output không thể truy ngược lại input.

![](https://i.imgur.com/EpcLEn6.png)

**Hash index** sử dụng **hash function** để tạo **index table**. Dựa vào tính chất của **hash function**, **hash index** chỉ phát huy tác dụng với điều kiện so sánh bằng (=).

Một vài tính chất của **hash index** như sau:
> - Tốn ít dung lượng để lưu trữ hơn so với B-Tree index.
> - Tốc độ read/write nhanh hơn so với B-Tree index.
> - Không phù hợp với **ORDER BY** vì giá trị hash là không xác định.
> - Không phù hợp tìm kiếm theo khoảng giá trị.
> - Không thể tạo **composite index** với **hash index**.

Với các version cũ từ 9.x trở xuống, **Hash index** chưa hỗ trợ persistent nên khi server crash hoặc restart, nó cần được tạo lại với keywork **REINDEX**. Ngoài ra nếu sử dụng replicas, **Hash index** chưa được duy trì tốt. Do đó, nó không được khuyến khích sử dụng.

Tuy nhiên nó đã được khắc phục ở các phiên bản 10.x về sau nên không cần bận tâm về vấn đề này.

## 2) How
Để tạo **hash index** với PostgreSQL, sử dụng câu lệnh:
```sql
CREATE INDEX idx_engineer_firstname ON ENGINEER USING HASH(first_name);
```

Cùng đi tìm hiểu kĩ hơn cơ chế hoạt động của **Hash index** để làm rõ hơn các tính chất đã nêu phía trên. 

### 2.1) Read faster

**Hash index** tổ chức dữ liệu dưới cấu trúc hash table, ví dụ với Java là HashTable hoặc HashMap.

![](https://i.imgur.com/TGqzjn7.png)

Ý tưởng chung của hash map được thực hiện như sau:
> - Hash key ra một giá trị bất kì.
> - Từ giá trị hash đó sẽ tìm ra bucket phù hợp, đơn giản nhất là sử dụng phép toán module (chia lấy dư). Ví dụ bên trên có 5 buckets, các bucket được lưu trữ dưới dạng array nên tốc độ truy cập là O(1).
> - Có thể có nhiều giá trị hash thuộc cùng buckets (**hash collision**). Các giá trị này được lưu dưới dạng linked list hoặc tree tùy thuộc vào mục đích và cách implement. Với BTS, tốc độ truy cập trung bình O(logn).

Từ đó, dễ dàng nhận thấy tốc độ read của **Hash index** nhanh hơn so với **B-Tree index** vì từ một big tree đã được chia ra nhiều tree nhỏ hơn và tốc độ truy cập vào các tree nhỏ hơn là O(1).

Nhưng vẫn còn 1 lỗ hổng đó là khả năng có hot bucket bao gồm rất nhiều giá trị, trong khi các bucket còn lại chứa ít hơn. PostgreSQL có cơ chế đặc biệt là **index split** nhằm chia một bucket thành hai bucket nhỏ hơn với mục đích là cân bằng số lượng giá trị ở các bucket. PostgreSQL sẽ quyết định khi nào nên làm điều đó, và số lượng bucket là bao nhiêu. Nếu muốn tìm hiểu kĩ hơn, các bạn có thể [tham khảo tại đây](https://github.com/postgres/postgres/blob/master/src/backend/access/hash/README).

### 2.2) Write faster
Với **B-Tree index**, ở [bài trước](https://viblo.asia/p/m68Z049MZkG) ta đã biết các index được tổ chức với cấu trúc dữ liệu BT và sắp xếp để thực hiện BST. Do đó việc write (insert/delete/update) cần thêm vài công đoạn:
> - Cân bằng cây.
> - Tổ chức lại các reference từ các node của cây (đây là lý do vì sao **B-Tree index** support ORDER BY mà **hash index** thì không).

Với **Hash index**, sau khi được hash sẽ đẩy vào bucket tương ứng O(1). Độ phức tạp được thu nhỏ xuống với bucket tương ứng nên việc **write sẽ nhanh hơn** và ít bao gồm các công đoạn phụ so với **B-Tree index**.

### 2.3) Size smaller
PostgreSQL hash giá trị ra một số nguyên integer 32-bit (hơn 4 tỉ giá trị), và sử dụng nó để map vào các bucket tương ứng. Vì vậy, **Hash index** chỉ cần lưu các số nguyên và các mapping tương ứng tới row của table, trực tiếp giảm nhiều tài nguyên lưu trữ. Key point là cần một thuật toán hash đủ tốt để không ảnh hưởng đến performance khi read/write và PostgreSQL đã lo phần này.

### 2.4) Practice
Lý thuyết đã có, bước tiếp theo là thực hành để kiểm chứng mớ lý thuyết trên.

Để đảm bảo kết quả chính xác và tin tưởng được, thực hiện remove index **idx_engineer_firstname_lastname** đã tạo ở [bài trước](https://viblo.asia/p/3Q75wV3elWb):

```sql
DROP INDEX IF EXISTS idx_engineer_firstname_lastname;
```

Run query sau để kiểm tra các lại index của table [Engineer](https://viblo.asia/p/002-hieu-ve-index-de-tang-performance-voi-postgresql-p1-3Q75wV3elWb):

```sql
SELECT cls.relname, am.amname, idxes.indexdef
FROM pg_index idx
JOIN pg_class cls ON cls.oid=idx.indexrelid
JOIN pg_class tab ON tab.oid=idx.indrelid
JOIN pg_am am ON am.oid=cls.relam
JOIN pg_indexes idxes ON cls.relname = idxes.indexname
WHERE lower(tab.relname) = 'engineer';
```

![](https://i.imgur.com/MmFlrok.png)


Thực hiện analyze query với điều kiện trên column first_name và xem kết quả:

```sql
EXPLAIN ANALYZE SELECT * FROM engineer WHERE first_name = 'Akiko';
```

![](https://i.imgur.com/VSmKtEI.png)

Các thông số cần chú ý khi query sử dụng **Hash index**:
> - Cost = 4.15 .. 72.95
> - Actual time = 0.013 .. 0.022
> - Execution time: 0.034 ms

Tiếp theo, drop **Hash index** cũ và tạo index mới sử dụng **B-Tree index**. Có thể chạy lại query check index phía trên để kiểm tra. Sau đó tiến hành analyze lại query và kiểm tra kết quả, hồi hộp phết:

```sql
DROP INDEX IF EXISTS idx_engineer_firstname;
CREATE INDEX idx_engineer_firstname ON engineer USING BTREE(first_name);

EXPLAIN ANALYZE SELECT * FROM engineer WHERE first_name = 'Akiko';
```

![](https://i.imgur.com/TSp4efu.png)

Các thông số khi query sử dụng **B-Tree index**:
> - Cost = 4.44 .. 73.24
> - Actual time = 0.016 .. 0.024
> - Execution time: 0.034 ms

Như vậy, cả 2 thông số **cost** và **actual time** khi sử dụng **Hash index** đều nhỏ hơn so với **B-Tree index**. Lý thuyết đã được chứng minh.

Một chú ý nhỏ, **execution time** không thay đổi. Con số 100k records quá nhỏ so với khả năng của DB hoặc con máy của mình, nếu thay đổi lên 500k hoặc 1000k records sẽ có sự khác biệt. Tuy nhiên dung lượng lưu trữ và cost CPU computation đã giảm.

### 2.5) Hash index với nhiều column (composite index)
Phần trên có kết luận sau:
> - Không thể tạo **composite index** với **hash index**.

Ta đã thấy điểm mạnh của **Hash index** so với **B-Tree index**, vì sao không thể áp dụng cho nhiều column? 

Có 2 nguyên nhân chính:
> - Thứ nhất, **Hash index** chỉ phù hợp với các điều kiện so sánh bằng, chỉ tận dụng được khi toàn bộ các điều kiện của các column cùng là so sánh bằng. 
> - Thứ hai, phần trên mình đề cập đến việc PostgreSQL sử dụng integer 32-bit để lưu các giá trị hash, tối đa hơn 4 tỉ. Việc một column hơn 4 tỉ giá trị unique gần như rất rất hiếm. Tuy nhiên với 2 column có số lượng giá trị là **m** và **n** thì tổng giá trị của hash value là **m * n**. Như vậy số lượng giá trị unique tối đa của column đã giảm xuống. Càng nhiều column số lượng giá trị tối đa càng giảm. Vậy nên hoàn toàn không phù hợp với **hash index**.

## 3) Kết luận
Phần này chỉ tổng hợp lại một vài chú ý khi sử dụng **hash index** đã nêu ở đầu :joy::
> - Tốn ít dung lượng để lưu trữ hơn so với B-Tree index.
> - Tốc độ read/write nhanh hơn so với B-Tree index.
> - Không phù hợp với **ORDER BY**.
> - Chỉ hiệu quả khi tìm kiếm với điều kiện so sánh bằng (=). Không phù hợp tìm kiếm theo khoảng giá trị.
> - Không thể tạo **composite index**.

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)