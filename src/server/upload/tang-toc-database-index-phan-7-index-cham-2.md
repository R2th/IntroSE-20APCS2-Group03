Các bạn có thể xem đầy đủ các phần tại [đây](https://viblo.asia/s/lam-sao-de-trang-web-chay-nhanh-DVK2jDrnKLj) nhé

Nếu các bạn chưa đọc bài trước có thể đọc tại link này [Tăng tốc database index phần 6 -Index kết hợp](https://viblo.asia/p/tang-toc-database-index-phan-6-index-ket-hop-vyDZOBRkKwj)

Trong  phần [trước](https://viblo.asia/p/tang-toc-database-index-phan-6-index-ket-hop-vyDZOBRkKwj) mình đã trình bày về lợi ích đạt được khi đổi vị trí index, tuy nhiên ví dụ chỉ xem xét với 2 câu lệnh SQL. Tuy nhiên việc thay đổi index có thể ảnh hưởng tới tất cả các câu truy vấn trên bảng. Phần này sẽ trình bày về cách database chọn một index và các ảnh hưởng có thể xảy ra khi thay đổi index đã có.

Index EMPLOYEES_PK sẽ làm tăng hiệu năng của tất cả các câu truy vấn chỉ tìm theo công ty con. Nó cũng  dùng trong trường hợp truy vấn theo trường SUBSIDIARY_ID và thêm một vài trường khác nữa trong câu truy vấn, nếu có thêm một số trường khác cũng được đánh index thì sao?. Trong trường hợp này nếu có nhiều phương án thực thi câu truy vấn, trình tối ưu (query optimizer) sẽ chọn phương án thực thi tốt nhất.

> Ngoài lề chút về The Query Optimizer, hay query planner là một thành phần của database chuyển các câu lệnh SQL thành execution plan quá trình này gọi là compiling hoặc parsing. Có hai loại trình tối ưu như sau:
> 
> Cost-based optimizers (CBO)  tạo ra rất nhiều execution plan khác nhau và tính toán chi phí cho mỗi plan, nó được ước tính dựa vào số thao tác cần xử lý và số lượng bản ghi. Chi phí (cost) này được dùng để chọn execution plan tốt nhất.
> 
> Rule-based optimizers (RBO) tạo ra execution plan dựa vào một tập hợp rule cố định,Rule based optimizers kém linh hoạt hơn và hiện tại ít được sử dụng.

Thay đổi index cũng có thể gây ra những ảnh hưởng không tốt. Như trong ví dụ sáp nhập ở bài trước, sau khi sáp nhập ứng dụng danh bạ nội bộ bị chậm. Điều tra ra câu lệnh sau là nguyên nhân gây chậm
## Execution plan 1
```
SELECT first_name, last_name, subsidiary_id, phone_number
  FROM employees
 WHERE last_name  = 'WINAND'
   AND subsidiary_id = 30
```
Execution plan như sau
```
---------------------------------------------------------------
|Id |Operation                   | Name         | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT            |              |    1 |   30 |
|*1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES    |    1 |   30 |
|*2 |  INDEX RANGE SCAN          | EMPLOYEES_PK |   40 |    2 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  1 - filter("LAST_NAME"='WINAND')
  2 - access("SUBSIDIARY_ID"=30)
```

Execution plan sử dụng index và có Cost là 30 nhìn có vẻ ngon, nhưng tại sao nó lại chạy chậm hơn lúc trước. Chúng ta thấy truy vấn này sử dụng index EMPLOYEES_PK vì trong truy vấn có trường SUBSIDIARY_ID, tuy nhiên lúc trước ta để trường EMPLOYEE_ID lên trước, nên có thể đoán rằng lúc trước chạy không bị chậm, không hề dùng index này.

Xa hơn một tý, ta thử xem execution plan trước khi đổi vị trí index. Để xem được execution plan này ta chỉ cần đổi lại index như cũ. Hoặc hầu hết các loại cơ sở dữ liệu đều cho phép truy vấn mà không sử dụng index (WITH (INDEX(0)) hay WITH (INDEX()) gì đó).  Ví dụ sau đây sử dụng  Oracle optimizer hint.

```
SELECT /*+ NO_INDEX(EMPLOYEES EMPLOYEES_PK) */ 
       first_name, last_name, subsidiary_id, phone_number
  FROM employees
 WHERE last_name  = 'WINAND'
   AND subsidiary_id = 30
```

Nhìn exection plan có lẽ trước khi đổi index câu lệnh này không sử dụng index khi truy vấn.
## Execution plan 2
```
----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |    1 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |    1 |  477 |
----------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - filter("LAST_NAME"='WINAND' AND "SUBSIDIARY_ID"=30)
```


Mặc dù TABLE ACCESS FULL phải đọc và duyệt qua toàn bộ bảng nhưng nó lại nhanh hơn là sử dụng index trong trường hợp này. Trường hợp này nhìn có vẻ bất thường vì truy vấn chỉ trả về một kết quả. Sử dụng index để truy vấn một bản ghi đáng ra phải nhanh hơn full table scan nhưng trường hợp này lại không như vậy, index làm nó chậm hơn.

Trong trường hợp này cách tốt nhất là đi qua từng bước của execution plan. Bước đầu là INDEX RANGE SCAN  trên index EMPLOYEES_PK . Vì index này không có cột LAST_NAME nên INDEX RANGE SCAN  chỉ có thể lọc theo trường SUBSIDIARY_ID. Oracle database thể hiện nó trong "Predicate Information" ở sau bảng execution plan. Ở đó bạn có thể thấy được các điều kiện được sử dụng cho mỗi thao tác.

 INDEX RANGE SCAN với Operation ID là 2 chỉ được áp dụng cho phần tìm kiếm theo "SUBSIDIARY_ID=30". Nghĩa là nó duyệt trên cây index để tìm bản ghi đầu tiên có giá trị SUBSIDIARY_ID=30. Sau đó nó duyệt trên Leaf Node để tìm tất cả các bản ghi có giá trị tương đương. Kết quả của  INDEX RANGE SCAN là một danh sách ROWIDs thỏa mã điều kiện tìm kiếm theo SUBSIDIARY_ID. Phụ thuộc vào kích thước của mỗi công ty con nó có thể từ một vài bản ghi tới hàng trăm bản ghi.
 
 Bước tiếp theo là TABLE ACCESS BY INDEX ROWID. Nó sử dụng ROWID từ bước trước để tìm các dòng, tất cả các cột trong bảng, khi đến cột LAST_NAME database mới so sánh tiếp điều kiện thứ hai trong câu truy vấn. Nghĩa là database lấy hết các dòng có SUBSIDIARY_ID=30 trước khi thực hiện lọc theo LAST_NAME.
 
 Thời gian phản hồi của câu lệnh không phụ thuộc vào số lượng bản ghi trả về( 1 hay nhiều) mà phụ thuộc vào số lượng nhân viên của công ty con (SUBSIDIARY). Nếu số lượng nhân viên nhỏ INDEX RANGE SCAN  sẽ có hiệu năng tốt hơn. Ngược lại  TABLE ACCESS FULL   có thể tốt hơn do database có thể đọc số lượng lớn bản ghi 1 lần ( Có thể xem lại bài [trước](https://viblo.asia/p/tang-toc-database-index-phan-6-index-ket-hop-vyDZOBRkKwj) phần TABLE ACCESS FULL)
 
 Câu truy vấn bị chậm do index lookup trả về rất nhiều ROWID, mỗi nhân viên của một công ty con, và database phải lấy dữ liệu từng cái một. Nguyên nhân chậm đến từ hai lý do, đọc trên một số lượng lớn index và  phải lấy dữ liệu trong bảng theo từng dòng một.
 
 Việc chọn execution plan còn phụ thuộc vào cách phân bố dữ liêu của bảng vì vậy trình tối ưu cần sử dụng các số liệu thống kê (statistics) về nội dung của database. Trong ví dụ trên một biểu đồ về sự phân bố của các nhân viên theo từng công ty con được sử dụng để trình tối ưu tính toán số lượng bản ghi được trả về từ index lookup. Kết của được dùng để tính chi phí thực thi.
 
> Nói qua chút về **statistics**:  Một trình tối ưu theo kiểu cost-base sử dụng các số liệu thống kê về bảng, cột và index. Hầu hết các statistics được thu thập ở cấp độ cột, số lượng các  giá trị không trùng lặp, giá trị nhỏ nhất và lớn nhất (data range), số lượng giá trị NULL, và sự phân phối của dữ liệu. Giá trị thống kê quan trọng nhất cho một **bảng** là kích cỡ của bảng ( được tính bằng số dòng hoặc số block)
> 
> Giá trị thống kê quan trọng nhất cho một **index** là độ sâu của tree, số lượng leaf node, số lượng các distinct key và clustering (Phần này mình sẽ viết sau)
> Trình tối ưu sẽ dùng các giá trị này để ước lượng selectivity trong predicates của mệnh đề WHERE
> 
> Selectivity là gì: Nó được tính bằng công thức Selectivity  = cardinality/(tổng số bản ghi) * 100% . cardinality là số lượng bản ghi có giá trị khác nhau (distinct values). Ví dụ nếu một trường giới tính có hai giá trị Nam/Nữ thì cardinality  2. Trong ví dụ của chúng ta có hai công ty sáp nhập thì SUBSIDIARY_ID có hai giá trị công ty mới và công ty cũ nên cardinality cũng bằng 2.

Nếu không có statistics (ví dụ nó bị xóa đi chả hạn) trình tối ưu sẽ sử dụng giá trị mặc định. Mặc định statistics của Oracle sẽ đề xuất một index nhỏ với selectivity trung bình. Nó ước lượng rằng INDEX RANGE SCAN  sẽ trả về 40 dòng. Các bạn có thể xem lại ở phần trên.

> |*2 |  INDEX RANGE SCAN          | EMPLOYEES_PK |   **40** |    2 |

Rõ ràng là nó đã đánh giá quá thấp, trong thực tế có tới 1000 nhân viên trong công ty con này.

Nếu có một statistics đúng, trình tối ưu sẽ hoạt động tốt hơn. Execution plan dưới đây cho bạn thấy ước lượng mới với 1000 dòng với INDEX RANGE SCAN. Kết quả là chi phí (cost) của nó cao hơn cho phần TABLE ACCESS 
## Execution plan 3
```
---------------------------------------------------------------
|Id |Operation                   | Name         | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT            |              |    1 |  680 |
|*1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES    |    1 |  680 |
|*2 |  INDEX RANGE SCAN          | EMPLOYEES_PK | 1000 |    4 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  1 - filter("LAST_NAME"='WINAND')
  2 - access("SUBSIDIARY_ID"=30)
```

Chi phí  là 680 cao hơn với so với execution plan 2 sử dụng FULL TABLE SCAN (477). Lúc này trình tối ưu sẽ chọn phương án FULL TABLE SCAN.

Ví dụ trên về index chậm không hề mâu thuẩn với việc sử dụng một index thích hợp vẫn là cách tốt nhất để tăng hiệu năng, và việc tìm kiếm theo LAST_NAME sẽ nhanh hơn nếu ta thêm một index trên cột này 

`CREATE INDEX emp_name ON employees (last_name)`

Dùng index mới này trình tối ưu sẽ tính toán cost là 3 như bên dưới
## Execution plan 4
```
--------------------------------------------------------------
| Id | Operation                   | Name      | Rows | Cost |
--------------------------------------------------------------
|  0 | SELECT STATEMENT            |           |    1 |    3 |
|* 1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES |    1 |    3 |
|* 2 |   INDEX RANGE SCAN          | EMP_NAME  |    1 |    1 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - filter("SUBSIDIARY_ID"=30)
   2 - access("LAST_NAME"='WINAND')
```

Truy vấn theo index theo ước lượng của trình tối ưu chỉ trả về 1 row, database chỉ cần lấy dữ liệu một dòng này trong bảng. Nó chắc chắn nhanh hơn lấy dữ liệu trong toàn bộ bảng. Việc chọn một index hợp lý vẫn ngon hơn so với việc quét toàn bộ bảng như ban đầu. 

Execution plan 4 và Execution plan 1 hầu như giống hệt nhau, database thực hiện các thao tác giống nhau và trình tối ưu tính toán cost cũng không khác nhau mấy (30 với 3). Tuy nhiên execution plan thứ hai lại chạy tốt hơn. Hiệu quả của  INDEX RANGE SCAN  có thể rất lớn và cũng có thể rất nhỏ (đặc biệt là khi cần lấy thêm dữ liệu trong bảng). Không phải cứ dùng index là câu lệnh tự động chạy nhanh. Quan trọng là phải dùng hợp lý.

Phần sau mình sẽ mô tả về cách sử dụng hàm trong điều kiện WHERE các bạn chờ xem nhé!
Link bài sau [Tăng tốc database index phần 8 - Function- Tìm kiếm không phân biệt chữ Hoa chữ Thường- UPPER và LOWER](https://viblo.asia/p/tang-toc-database-index-phan-8-function-tim-kiem-khong-phan-biet-chu-hoa-chu-thuong-upper-va-lower-aWj53zQpl6m)