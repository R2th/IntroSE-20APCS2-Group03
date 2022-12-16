# Giới thiệu
Ở bài viết trước, chúng ta đã tìm hiểu về kiểu dữ liệu JSON trong postgres. Có thể đọc lại bài viết trước tại : https://viblo.asia/p/su-dung-kieu-du-lieu-json-trong-postgressql-V3m5WXoxKO7

Kiểu dữ liệu JSON được Postgres đưa vào ở version 9.2 . Nó hỗ trợ rất nhiều trong việc xử lý data nhưng tồn tại vài nhược điểm như : không sử dụng được index và extractor methods. Qua dần các phiên bản Postgres bổ sung dần dần các thay đổi như bổ sung thêm extructor method , tối ưu hoá quá trình query ở version 9.3... Đến phiên bản 9.4 PostgresSql giới thiệu một kiểu dữ liệu phát triễn từ JSON là Binary JSON gọi tắt là JSONB. Kiểu dữ liệu này giải quyết được hạn chế của kiểu dữ liệu JSON : tối ưu hoá quá trình insert  và đặc biệt hỗ trợ index.

# JSONB là gì

Về cơ bản JSONB là kiểu dữ liệu được phát triễn từ json nhưng khác nhau về cách lưu trữ. JSONB lưu trữ theo kiểu bit nhị phân và giải quyết được hạn chế như : tối ưu quá trình insert và hỗ trợ index cho các trường trong column.

# Sử dụng JSONB trong PostgresSql

## Define column 

Về cơ bản sử dụng jsonb tương tự với các kiểu dữ liệu khác. Ví dụ dưới sử dụng kiểu jsonb với tên cột gọi là data

```sql
CREATE TABLE employees (
  id integer NOT NULL,
  job_title  integer NOT NULL,
  data jsonb
);
```

Ví dụ trên chúng ta tạo 1 bảng có tên employees với kiểu jsonb ở cột data

## Inserting JSON data

Để thực hiện insert data chúng ta insert data với kiểu giá trị JSONB như một String như sau

```sql
INSERT INTO employees VALUES (1, 1, '{"name": "Nguyễn Văn A", "address": ["123 example", "123 example"], "status ": true}');
INSERT INTO employees VALUES (1, 1, '{"name": "Trần Văn B", "address": ["456 example", "456 example"], "status": true}');
INSERT INTO employees VALUES (1, 1, '{"name": "Lê Văn C", "address": ["789 address", "111 address"], "status": false}');
```

Kết quả :

![](https://images.viblo.asia/2afc6d90-b1d0-4ebc-8203-3f2894258cef.png)

## Query Data

Để thực hiện truy vấn trong json chúng ta không thể query theo cách trực tiếp. Ví dụ dưới sẽ thực hiện lấy tất cả name của employee ở bảng employees

`SELECT data->>'name' AS name FROM employees e `

Câu lệnh trên sẽ query cột data theo và dấu ->> báo cho postgresSql biết sẽ trích xuất field name theo kiểu json. 

Kết quả :

![](https://images.viblo.asia/11c4d5b3-4404-479f-89ff-b4cfbe3fbe81.png)

## Filtering result

Tính năng filtering ở hệ cơ sở dữ liệu là một tính năng rất quan trọng nếu chúng ta dùng để lấy một kết quả theo điều kiện xác định . Để thực hiện điều này trên Postgres chúng ta làm như sau

`SELECT * FROM employees e WHERE data->>'status' = 'true';`

Kết quả :

![](https://images.viblo.asia/d97b5c39-beab-4939-9dc3-0a7e894b2afa.png)

## Checking for column existence

Chúng ta có thể kiểm tra trong 1 column có tồn tại 1 field nào đó hay không bằng lệnh sau

`SELECT count(*) FROM employees e WHERE data ? 'name';`

Kết quả :

![](https://images.viblo.asia/dce33348-bb42-4d44-adfb-f830116520bd.png)

## Expanding data

Khi chúng ta làm việc với hệ cơ sở dữ liệu , chúng ta đã biết sử dụng các hàm tập hợp như sau : sum,avg,min,max ... Đối với kiểu dữ liệu json , một record tồn tại như một array. Thay vì sử dụng các hàm tập hợp , chúng ta có thể dùng các hàm đối với json để trích xuất dữ liệu

```sql
SELECT
  jsonb_array_elements_text(data->'address') as address
FROM employees e 
WHERE id = 1;
```

Kết quả 

![](https://images.viblo.asia/c9062ea3-7b7e-4152-ad3c-4e4fea9019b9.png)

Ví dụ trên sẽ trả về số hàng tương ứng với dữ liệu của anddress với mỗi row. Con số này bằng với số lượng anddress mà mỗi hàng chứa.

# Indexes

Như đã đề cập sự khác nhau chính giữa JSON và JSONB là index.Index giúp chúng ta sử lý số lượng record khi truy vấn một cách nhanh chóng mà không cần quét toàn bộ bảng giúp tối ưu tối đa peformance.

Để có thể thấy sự khác biết giữa có index và không có index, chúng ta sẽ tạo thêm số lượng record cho bảng là 100000. 

Thực hiện truy vấn khi chưa có index với 10000 record

`SELECT count(*) FROM employees e WHERE data->>'status' = 'true';`

Thời gian thực thi

```sql
Aggregate (cost=335.12..335.13 rows=1 width=0) (actual time=4.421..4.421 rows=1 loops=1) -> Seq Scan on employees (cost=0.00..335.00 rows=50 width=0) (actual time=0.016..3.961 rows=4938 loops=1)
    Filter: ((data ->> 'status'::text) = 'true'::text)
    Rows Removed by Filter: 5062
Planning time: 0.071 ms
Execution time: 4.465 ms
```

Câu lệnh trên khi thực thi count thì thời gian lên đến gần 5s.  Để tối ưu hoá câu lệnh trên chúng ta thực hiện đánh index như sau

`CREATE INDEX idxstatus ON employees ((data->>'true'));`

Khi thực hiện chạy lại kết quả

```sql
Aggregate (cost=118.97..118.98 rows=1 width=0) (actual time=2.122..2.122 rows=1 loops=1) -> Bitmap Heap Scan on employees (cost=4.68..118.84 rows=50 width=0) (actual time=0.711..1.664 rows=4938 loops=1)
    Recheck Cond: ((data ->> 'status'::text) = 'true'::text)
    Heap Blocks: exact=185
    -> Bitmap Index Scan on idxstatus (cost=0.00..4.66 rows=50 width=0) (actual time=0.671..0.671 rows=4938 loops=1)
        Index Cond: ((data ->> 'status'::text) = 'true'::text)
Planning time: 0.084 ms
Execution time: 2.199 ms
```

Khi thực hiện đánh index thời gian thực thi của câu lệnh chỉ còn 2 giây

# Kết luận
Qua bài trên hy vọng sẽ giúp chúng ta hiểu thêm về kiểu dữ liệu jsonb và khi nào nên sử dụng json hoặc jsonb trong hệ cơ sở dữ liệu. Hẹn gặp lại trong bài viết tiếp theo

# Tài liệu tham khảo
- https://www.postgresql.org/docs/10/datatype-json.html
- https://www.postgresql.org/docs/9.5/functions-json.html