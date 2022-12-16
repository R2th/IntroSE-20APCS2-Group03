© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Với bài trước, ta đã biết các loại **index** phổ biến trong Relational Database:
> - B-Tree index.
> - Bitmap index.
> - Hash index.

Và một số loại **index** đặc biệt trong PostgreSQL:
> - GiST.
> - SP-GiST.
> - GIN.
> - BRIN.

Om hơi lâu suốt từ bài 1 :joy:, bài viết hôm nay sẽ tìm hiểu về **B-Tree index**.

## 1) B-Tree index (Balanced Tree index)

### 1.1) What
Binary Tree và Binary Search Tree, rất quen thuộc và phổ biến. **B-Tree index** sử dụng cấu trúc dữ liệu Binary Tree để lưu trữ và BST thực hiện việc tìm kiếm. Nó có các tính chất sau:
> - Phổ biến và được dùng nhiều nhất trong các loại index.
> - Sử dụng khi số lượng các giá trị không lặp lại của cột nhiều (high cardinality). Ví dụ như tên, tuổi, 1000 người thì số lượng dữ liệu trùng không nhiều. 
> - Tự cân bằng khi dữ liệu column index thay đổi.
> - Độ phức tạp bằng chiều cao của cây. Complexity O(logn).
> - Các node của cây có link trước tiếp đến nhau nên phù hợp với ORDER BY.

Một điều cần chú ý ở tính chất thứ hai, vì sao nên áp dụng khi **high cardinality**? Nếu áp dụng với column low cardinality như **gender** có 2 - 4 giá trị. BST gần như không thu được nhiều lợi ích so với **seq scan**, tốn thêm disk space mà còn mất 2 lần scan (1 lần scan index table và 1 lần scan disk để fetch data).

> Lưu ý rằng B-Tree index là Balanced Tree index, nó không phải Binary Tree vì nó chỉ tập trung vào yếu tố cân bằng cây và mỗi node có thể có nhiều hơn 2 node con.

### 1.2) How

Quay lại bài trước, ta có thể index cho nhiều column với nhau, gọi là **composite index**. Đa số các bài toán sẽ tìm kiếm dựa trên cả họ và tên, hoặc kết hợp với những điều kiện khác như tuổi, địa chỉ... Thử một query trước:
```sql
EXPLAIN ANALYZE SELECT * FROM ENGINEER WHERE first_name = 'Dominique' AND last_name = 'Rice';
```

![](https://i.imgur.com/yRqGyir.png)

Chắc chắn vẫn là **seq scan** với bộ filter cho where condition. Bài trước chúng ta đã làm quen với cách đọc explain nên không có gì khó hiểu.

Tiếp theo, tiến hành tạo **index** cho 2 column `first_name` và `last_name` sau đó chạy lại query:
```sql
CREATE INDEX idx_engineer_firstname_lastname ON ENGINEER(first_name, last_name);

EXPLAIN ANALYZE SELECT * FROM ENGINEER WHERE first_name = 'Dominique' AND last_name = 'Rice';
```

![](https://i.imgur.com/IDWmW05.png)

Nhìn vào thông số **execution time**, khác bọt được thể hiện rõ. Tốc độ query sau khi index tăng chóng mặt khoảng... 90 lần.

Thử một query khác, bài toán thực tế thường tìm kiếm với điều kiện `LIKE`. Tìm kiếm các engineer có `first_name` là `Dominique` và `last_name` chứa `a`:

```sql
EXPLAIN ANALYZE SELECT * FROM ENGINEER WHERE first_name = 'Dominique' AND last_name LIKE '%a%';
```

![](https://i.imgur.com/vwmm7jk.png)

Plan có vẻ rắc rối hơn nhưng có **index scan**, **execution time** vẫn ổn. Đi qua **plan** chút xem nó hoạt động thế nào. **Chú ý cách đọc plan sẽ đi từ trong ra ngoài, không phải từ trên xuống dưới**:
> - Step đầu tiên dễ dàng nhận thấy là **index scan** với điều kiện `first_name = Dominique` trước, lọc ra đc 58 rows.
> - Sau đó thực hiện filter với cả 2 điều kiện `first_name = Dominique` và `last_name LIKE %a%`, loại bỏ được 43 rows.
> - Kết quả thu được 15 rows với thời gian chưa đến 1 ms.
> 
Tiếp tục, tìm các engineer có `last_name` là `Parker` và `first_name` chứa `v`:

```sql
EXPLAIN ANALYZE SELECT * FROM ENGINEER WHERE first_name LIKE '%v%' AND last_name = 'Parker';
```

Đọc **plan** xem có gì khác thường không.

![](https://i.imgur.com/vCtN0zC.png)

Đù, các **Senior** lại bịp bợm, **execution time** tăng bất thường, không có **index scan** mà là **seq scan**? Tìm hiểu lại cơ chế của **B-Tree index** xem thế nào.

Bản chất của việc **index** là tạo ra table mới lưu các giá trị không trùng nhau của tất cả các giá trị trong một hoặc nhiều column. Sau đó, scan trên **index table** (cơ chế BST) với các condition để tìm kết quả. Do vậy, nó phù hợp với các truy vấn:
> - **Match full value**:
>     - Tìm kiếm với giá trị chính xác. Sử dụng với các điều kiện so sánh equal (=).
> - **Match a column prefix**:
>     - **Composite index** với nhiều column. Ví dụ như trên `idx_engineer_firstname_lastname` trên 2 column `first_name` và `last_name`. Khi thực hiện tìm kiếm, **index scan** chỉ được sử dụng khi điều kiện cho column đầu tiên là **match value**, ngược lại sẽ không áp dụng được. Giải thích: tất cả các tên đều được sắp xếp theo `first_name` sau đó là `last_name`. Nếu có trước `first_name`, dễ dàng thu nhỏ được tập tìm kiếm và tiếp tục scan trên đó để tìm `last_name`. Ngược lại, nếu cho `last_name` và một phần của `first_name` (không có prefix) thì bó tay, phải **seq scan** là đúng rồi. Hóa ra **Senior** không bịp :joy_cat:.
> - **Match a range of full values**:
>     - Tìm kiếm với.. rất nhiều giá trị chính xác. Cụ thể là điều kiện IN hoặc các điều kiện so sánh (`>`, `<`, `>=`, `<=`).

Từ đó, rút ra vài chú ý khi sử dụng **B-Tree index**:
> - Không có tác dụng khi tìm kiếm text sử dụng điều kiện LIKE '%%'. Index nữa index mãi thì tốc độ tìm kiếm.. không thay đổi mà tốc độ insert còn tăng lên.
> - Với **composite index**, WHERE condition cần **match full value** hoặc **match mostleft column** để đạt hiệu quả tối đa.

## 2) Bitmap index

### 2.1) What?
Có một câu ứng viên hay được hỏi: **Theo em, có nên đánh index cho các cột có ít giá trị (low cardinality), ví dụ như cột giới tính?**

Dạ không nên vì bảng đó có ít giá trị, **indexing** vừa tốn mà không cải thiện nhiều tốc tộ. Mình thấy đa số các bạn trả lời như vậy, search google cũng nhiều lời khuyên như vậy? 

Trả lời như trên cũng được nhưng chưa gãi đúng chỗ ngứa lắm. 

Câu trả lời của mình như sau:
> - Bản chất của việc **indexing** vẫn là **seq scan** (dựa vào BST) nhưng trên **table index**. Mục đích giảm không gian tìm kiếm từ **table chính** xuống **table index**, từ đó cải thiện tốc độ query.
> - Do đó, nếu chỉ **indexing** cho column gender thì không gian tìm kiếm giảm không đáng kể. Ví dụ gender có 2 giá trị, giảm từ N xuống N/2, complexity vẫn là O(N). Ngoài ra còn thời gian truy cập vào **main table** để fetch data. Nên trên lý thuyết **indexing** vẫn có khả năng giảm thời gian tìm kiếm.
> - Tuy nhiên cần dựa trên nhu cầu thực tế, có query nào dùng điều kiện với column đó không để tạo **index** kết hợp với **index** khác hoặc **composite index**.

Vòng vo dài dòng quá, con số nói lên tất cả, đã có **analyze** và **explain**. Bắt đầu với query sau:

```sql
EXPLAIN ANALYZE SELECT * FROM Engineer WHERE gender = 2;
```

![](https://i.imgur.com/1Ioo4I8.png)

Chưa cần xem **query plan** đã biết sử dụng **seq scan**. **Cost** trong khoảng 0..2367 và **actual time** là 0.019..339. Thêm index trên column gender và chạy lại xem thế nào:

```sql
CREATE INDEX idx_engineer_gender ON ENGINEER(gender);

EXPLAIN ANALYZE SELECT * FROM Engineer WHERE gender = 2;
```

![](https://i.imgur.com/0BCwQ9r.png)

Với index, **cost** giảm từ 2367 xuống 1712, tuy nhiên **actual time** giảm không nhiều, đúng như dự đoán. Anw, **cost** giảm tức là các step liên quan đến computation đã giảm, từ đó giảm stress cho CPU, không tệ.

Chú ý một chút, **plan** lúc này không sử dụng **index scan** mà đã chuyển sang **bitmap index scan**. PostgreSQL khá thông minh, nó phụ thuộc vào tính chất của column để quyết định **index** trên column đó là gì. Với **gender** do là low cardinality column nên nó lựa chọn **bitmap index**.

Bản chất của **bitmap index** vẫn sử dụng cấu trúc B-Tree, tuy nhiên nó lưu trữ thông tin khác với B-Tree index. **B-Tree index** mapping index với một hoặc nhiều rowId. **Bitmap index** mapping index với giá trị bit tương ứng của column. Ví dụ có 3 giá trị của gender: Male, Female, Unknown. Tạo ra 3 bit tương ứng 0, 1, 2 cho 3 giá trị đó và mapping với column trong table chính.

![](https://i.imgur.com/XCRVV6X.png)


### 2.2) How

Chốt lại, **bitmap index** có các tính chất:
> - Phù hợp với các column **low cardinality**.
> - Lưu bit cho mỗi giá trị nên giảm dung lượng lưu trữ cần dùng.
> - Chỉ hiệu quả với tìm kiếm **full match value**. 
> - Kết hợp với nhiều index khác để tăng tốc độ với OR, AND.

Tuy nhiên, nó cũng có hạn chế:
> - Nếu thêm hoặc bớt một giá trị cần build lại toàn bộ **index table**. Với B-Tree index chỉ cần re-balance tree.
> - Riêng với PostgreSQL, **bitmap index** được lưu trên memory vì size của nó khá nhỏ, từ đó tăng tốc độ truy vấn. Vì vậy khi restart nó cần build lại toàn bộ **bitmap index**. Để tránh nhược điểm này, trong thực tế sẽ sử dụng kết hợp với column khác tạo thành **composite index**.

PostgreSQL dựa trên các tính chất của column để quyết định sử dụng loại index nào. Thậm chí có thể chuyển đổi qua lại giữa các index type (dựa trên tính chất column) để tối ưu tốc độ truy vấn. Tất nhiên cost để chuyển đổi là rất lớn, cực kì lớn.

Dài quá khó tiêu, tạm thời kết thúc tại đây, bài tiếp theo mình sẽ bàn luận về các loại index còn lại nhé :nerd_face:.

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)