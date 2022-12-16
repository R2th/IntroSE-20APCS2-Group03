# Đây là những bài viết về các dự án & kinh nghiệm tối ưu cơ sở dữ liệu của tôi tại Wecommit. Những giá trị mà bạn sẽ nhận được
* Tư duy về tối ưu cơ sở dữ liệu
* Kinh nghiệm thực tế
* Ví dụ đời sống cực dễ hiểu
* Phân tích chi tiết dưới góc độ của người trực tiếp xử lý trong dự án

**Ghi chú:**
-** Nếu bạn muốn đọc toàn bộ các bài viết về tối ưu của tôi từ trước đến nay**, bạn có thể tham gia nhóm Zalo Tư Duy - Tối Ưu - Khác Biệt (phí tham gia là lời cảm ơn và chia sẻ tới những người cần các tri thức này giống bạn). **[Click vào đây để tham gia]**(https://zalo.me/g/spohzm074)

# 1. Một hiểu lầm kinh điển của rất nhiều anh em lập trình
* Rất nhiều lập trình viên coi rằng: nếu một Table có số lượng bản ghi ít thì chắc chắn việc tương tác sẽ nhanh.
* Trên thực tế tôi đã trực tiếp xử lý rất nhiều bài toán hệ thống cơ sở dữ liệu có số lượng bản ghi rất ít, tuy nhiên khi làm việc vẫn gặp vấn đề trầm trọng liên quan đến hiệu năng.
* Trong bài viết này tôi sẽ chia sẻ 1 trường hợp thực tế để anh em có thể hiểu rõ hơn về sai lầm này.
* Bài viết cũng lấy 1 demo: Table có số lượng bản ghi dưới 10 nhưng thực hiện câu lệnh vẫn bị treo.

# 2. Một trường hợp tối ưu cơ sở dữ liệu thực tế mà chúng tôi đã triển khai
Cơ sở dữ liệu tại một bệnh viện gặp vấn đề treo cứng, các chức năng gần như tê liệt. Các bệnh nhân phản ánh dữ dội, và chúng tôi (Wecommit) được mời vào kiểm tra tình hình.

Bước đầu tiên trong việc ứng cứu các sự cố về hiệu năng không phải là kiểm tra các câu lệnh TOP SQL, kiểm tra CPU, RAM, theo kinh nghiệm của mình, tôi kiểm tra ngay các WAIT trong Cơ sở dữ liệu.

Lưu ý:

* Hoạt động của Cơ sở dữ liệu cũng giống như hoạt động giao thông trên một đường phố.
* Các tài nguyên mà bạn cấp cho cơ sở dữ liệu giống như cơ sở hạ tầng của con phố đó
* Các tiến trình làm việc với cơ sở dữ liệu giống như những chiếc xe đang di chuyển trên con đường. Chúng ta có thể có xe tải, xe buýt, xe đạp…., việc này cúng giống với trong cơ sở dữ liệu có thể có các tiến trình khác nhau, có tiến trình thực hiện các câu lệnh phức tạp, có tiến trình thực hiện các câu lệnh đơn giản vậy.
* Khi một cơ sở dữ liệu gặp sự cố về hiệu năng, bạn có thể thấy rất giống với hiện trạng một con đường bị tắc nghẽn giao thông, các xe bị kẹt cứng.
* Phương pháp xem xét WAIT của tôi giống với việc: bạn đứng ở trên một tòa nhà cao tầng và nhìn xuống toàn cảnh của con đường đang kẹt xe, bạn sẽ tìm ra chính xác thì các xe trên con đường đó đang CHỜ cái gì mà không đi tiếp (đó chính là WAIT).
* Trong thực tế có rất nhiều loại WAIT khác nhau, cũng giống như trong thực tế các xe có thể bị “CHỜ” rất nhiều tình huống khác nhau (ví dụ: có xe bị tai nạn, hoặc chờ vì lòng đường quá nhỏ…)
Tại thời điểm kiểm tra, tôi phát hiện cơ sở dữ liệu có một số lượng Wait cực lớn với với tên là : **enq: TM – contention.**
Đây wait liên quan đến việc thiết kế Cơ sở dữ liệu đã bỏ quên việc đánh Index trên các cột đang là Foreign Key của bảng.
Ngay sau khi phát hiện được gốc của vấn đề và tinh chỉnh lại thiết kế, hệ thống đã hoạt động trơn tru.

# 3. Vậy tại sao nếu không đánh Index trên các cột đang là Foreign Key thì sẽ gây ra hiện tượng treo bên trên?
## 3.1. Demo sự cố hiệu năng
Tạo bảng hai bảng có mối quan hệ CHA – CON như sau:

Bước 1. Tạo một bảng vô cùng đơn giản tên là PARENT, bảng này chỉ có một cột PID và cột này chính là khóa chính của bảng
```
CREATE TABLE PARENT
(
PID INTEGER
);

ALTER TABLE PARENT
ADD (PRIMARY KEY (PID));
```
Bước 2. Tạo bảng con tên là CHILD. Bảng này cũng chỉ có một cột duy nhất tên là CID. Cột này chính là Foreign key, tham chiếu tới cột PID của bảng PARENT vừa tạo bên trên.
```
CREATE TABLE CHILD
(
CID INTEGER
);

ALTER TABLE CHILD ADD (
FOREIGN KEY (CID)
REFERENCES PARENT (PID);
```
Bước 3: Thêm dữ liệu phục vụ cho demo

```
INSERT INTO PARENT VALUES(1) ;
INSERT INTO PARENT VALUES(2) ;
INSERT INTO PARENT VALUES(3) ;

COMMIT;

INSERT INTO CHILD VALUES (3);

COMMIT;
```
Bước 4: Kiểm tra dữ liệu trên 2 bảng
```
SQL> select * from parent;
 PID
———-
1
2
3
SQL> select * from child;
 CID
———-
```
`3`

Như vậy chúng ta đã có 2 bảng có mối quan hệ CHA – CON với nhau, và cả 2 bảng này đều có SỐ LƯỢNG BẢN GHI RẤT ÍT.
Ta sẽ giả lập có 2 session đồng thời cùng vào thực hiện trong cơ sở dữ liệu
```
Session 1:  Thực hiện thêm mới dữ liệu vào bảng CHILD
SQL> insert into child values(1);
1 row created.
Session 2: Thực hiện xóa dữ liệu ở bảng PARENT
SQL> delete parent where pid=2;
**<<TREO>>**
```
Câu lệnh ở Session 2 mặc dù cực kỳ đơn giản, bảng PARENT cũng có số lượng bản ghi rất nhỏ, tuy nhiên câu lệnh này bị “TREO” tại đây.
Các bạn đăng nhập vào user quản trị của cơ sở dữ liệu và kiểm tra WAIT trong lúc này thì sẽ thấy kết quả như sau.
Câu lệnh kiểm tra WAIT:
```
SELECT EVENT, COUNT (*)
FROM GV$SESSION
WHERE BLOCKING_SESSION IS NOT NULL
GROUP BY EVENT
ORDER BY 2 DESC
```

![image.png](https://images.viblo.asia/770fe68c-fe27-4982-a532-0b3407781565.png)

Bạn đang thấy chính xác sự kiện WAIT mà tôi đã gặp trong dự án thực tế đã nói bên trên.

Bạn thấy một điều thú vị ở đây là:
* Session thứ 2 thực hiện DELETE dữ liệu từ bảng PARENT ở bản ghi có giá trị bằng 2 (hoàn toàn không liên quan tới các bản ghi đang được làm việc – có giá trị bằng 1 tại bảng CHILD), tuy nhiên session vẫn bị LOCK.
* Session số 2 này sẽ treo VÔ TẬN, cho đến thời điểm Session số 1 kết thúc transaction (khi COMMIT hoặc ROLLBACK)
 
Bây giờ tôi sẽ thực hiện tạo Index trên cột đang là Foreign Key (cột CID của bảng CHILD) và thực hiện lại quá trình trên, chúng ta sẽ cùng chờ đợt kết quả sau khi sửa đổi nhé.
Thực hiện tạo index
```
SQL> CREATE INDEX IDX_CID ON CHILD(CID);
Index created.
```
Thực hiện lại tình huống thay đổi dữ liệu bị treo bên trên
```
Session 1:  Thực hiện thêm mới dữ liệu vào bảng CHILD
SQL> insert into child values(1);
1 row created.
Session 2: Thực hiện xóa dữ liệu ở bảng PARENT
SQL> delete parent where pid=2;
1 row deleted.
```

Session thứ 2 lúc này trả ra kết quả ngay lập tức . **Từ một tiến trình BỊ TREO CỨNG, bây giờ ĐÃ TRẢ RA KẾT QUẢ gần như NGAY LẬP TỨC. Thật tuyệt vời.**

## 3.2. Nghiên cứu sâu hơn về cách Cơ sở dữ liệu hoạt động khi chúng ta không đánh Index trên cột Foreign Key
Bước 1: Thực hiện Insert nhiều dữ liệu hơn vào bảng PARENT
```
SQL>  begin
for i in 4..1000000
loop
insert into parent values(i);
end loop;
commit;
end;
/
PL/SQL procedure successfully completed.
```

Bước 2: Thực hiện Insert nhiều dữ liệu hơn nữa vào bảng CHILD
```
SQL> begin
for i in 4..1000000
loop
insert into child values(i);
end loop;
commit;
end;
/
```
`PL/SQL procedure successfully completed.`

Bước 3: Thực hiện cập nhật thông tin về số lượng bản ghi cho Cơ sở dữ liệu biết (thuật ngữ gọi là gather statistics).
```
SQL> exec dbms_stats.gather_table_stats(ownname=>’HUYTQ’, tabname=>’PARENT’);
PL/SQL procedure successfully completed.
SQL>  exec dbms_stats.gather_table_stats(ownname=>’HUYTQ’, tabname=>’CHILD’);
PL/SQL procedure successfully completed.
```
Ghi chú: Thời điểm hiện tại chúng ta đã có INDEX trên FK của bảng CHILD
Bây giờ tôi sẽ thực hiện phân tích hiệu năng của câu chỉnh sửa dữ liệu trên bảng PARENT

```
SQL> delete parent where pid=2;
0 rows deleted.
Elapsed: 00:00:00.00
———————————————————-
Plan hash value: 1460050403
| Id  | Operation    | Name   | Rows  | Bytes | Cost (%CPU)| Time
  |
|   0 | DELETE STATEMENT   |   | 1 | 5 | 2   (0)| 00:00:0
1 |
|   1 |  DELETE    | PARENT   |   |   |        |
  |
|*  2 |   INDEX UNIQUE SCAN| SYS_C0011149 | 1 | 5 | 2   (0)| 00:00:0
1 |
Predicate Information (identified by operation id):
—————————————————
   2 – access(“PID”=2)
Statistics
———————————————————-
  0  recursive calls
  0  db block gets
  3  consistent gets
  0  physical reads
  0  redo size
842  bytes sent via SQL*Net to client
781  bytes received via SQL*Net from client
  3  SQL*Net roundtrips to/from client
  1  sorts (memory)
  0  sorts (disk)
  0  rows processed
```
Giải thích:
–  Câu lệnh thực hiện với thời gian cực kỳ nhanh (chỉ vài ms, hệ thống đánh giá là thời gian gần như tức thì 00:00:00)
–  Câu lệnh thực thi rất nhanh vì Oracle thực hiện chiến lược là quét INDEX UNIQUE SCAN
– Để thực hiện câu lệnh này, Cơ sở dữ liệu chỉ cần thực hiện khối lượng công việc là** 3 consitent gets**
Bây giờ chúng ta thử DROP INDEX trên bảng CHILD và thực hiện lại câu lệnh xem thế nào nhé

```
SQL> drop index IDX_CID;
Index dropped.
SQL> delete parent where pid=2;
0 rows deleted.
Elapsed: 00:00:00.01
Execution Plan
———————————————————-
Plan hash value: 1460050403
| Id  | Operation    | Name   | Rows  | Bytes | Cost (%CPU)| Time
  |
|   0 | DELETE STATEMENT   |   | 1 | 5 | 2   (0)| 00:00:0
1 |
|   1 |  DELETE    | PARENT   |   |   |        |
  |
|*  2 |   INDEX UNIQUE SCAN| SYS_C0011149 | 1 | 5 | 2   (0)| 00:00:0
1 |
Predicate Information (identified by operation id):
—————————————————
   2 – access(“PID”=2)
Statistics
———————————————————-
28  recursive calls
  0  db block gets
23  consistent gets
  0  physical reads
  0  redo size
843  bytes sent via SQL*Net to client
781  bytes received via SQL*Net from client
  3  SQL*Net roundtrips to/from client
  4  sorts (memory)
  0  sorts (disk)
  0  rows processed
```
  
  Tại đây ta có thể nhật thấy rằng:
– Thứ nhất: Trong demo hiện tại, câu lệnh cũng thực hiện cùng chiến lược thực thi là quét qua INDEX UNIQUE SCAN (giống với trước khi drop index)
– Thức hai: Thời gian chạy lúc này đã chậm hơn (cụ thể là đã thấy nổi lên: 00:00:01)
– Thứ ba: Khối lượng block cần duyệt lúc này đã tăng lên: từ 3 consitent gets trở thành 23 consistent gets (tăng 7.6 lần). Việc này cũng logic với kết quả thời gian của câu lệnh thực thi tăng lên
– Thức tư: Rõ ràng ở đây chúng ta chỉ làm việc với bảng PARENT, không hề có session nào động chạm tới bảng CHILD, nhưng kết quả khác biệt hoàn toàn giữa hai thời điểm: có INDEX và không có INDEX trên cột FK
Bản chất của sự KHÁC BIỆT rất lớn này là:
– Khi chúng ta muốn xóa dữ liệu ở bảng PARENT, Oracle sẽ có 1 suy nghĩ là “nhỡ chẳng may tồn tại giá trị đó ở bảng CHILD thì sao nhỉ, trường hợp này sẽ không được phép xóa giá trị ở bảng PARENT”. Như vậy Oracle sẽ cần tìm xem ở bảng CHILD có giá trị mà chúng ta đang xóa hay không (giá trị 2).
– Nếu không có Index trên FK, Oracle sẽ thực hiện quét toàn bộ bảng CHILD để tìm kết quả bên trên.
– Trong trường hợp có Index thì kết quả này sẽ nhanh hơn rất nhiều lần.

# 4. Làm thế nào để phát hiện toàn bộ những Foreign Key chưa được đánh Index trong Cơ sở dữ liệu.

Scripts sau sẽ giúp các bạn nhanh chóng rà soát toàn bộ các Tables có FK và chỉ ra chi tiết thông tin các tables chứa FK chưa được đánh Index

```
WITH
ref_int_constraints AS (
SELECT
col.owner,
col.table_name,
col.constraint_name,
con.status,
con.r_owner,
con.r_constraint_name,
COUNT(*) col_cnt,
MAX(CASE col.position WHEN 01 THEN col.column_name END) col_01,
MAX(CASE col.position WHEN 02 THEN col.column_name END) col_02,
MAX(CASE col.position WHEN 03 THEN col.column_name END) col_03,
MAX(CASE col.position WHEN 04 THEN col.column_name END) col_04,
MAX(CASE col.position WHEN 05 THEN col.column_name END) col_05,
MAX(CASE col.position WHEN 06 THEN col.column_name END) col_06,
MAX(CASE col.position WHEN 07 THEN col.column_name END) col_07,
MAX(CASE col.position WHEN 08 THEN col.column_name END) col_08,
MAX(CASE col.position WHEN 09 THEN col.column_name END) col_09,
MAX(CASE col.position WHEN 10 THEN col.column_name END) col_10,
MAX(CASE col.position WHEN 11 THEN col.column_name END) col_11,
MAX(CASE col.position WHEN 12 THEN col.column_name END) col_12,
MAX(CASE col.position WHEN 13 THEN col.column_name END) col_13,
MAX(CASE col.position WHEN 14 THEN col.column_name END) col_14,
MAX(CASE col.position WHEN 15 THEN col.column_name END) col_15,
MAX(CASE col.position WHEN 16 THEN col.column_name END) col_16,
par.owner parent_owner,
par.table_name parent_table_name,
par.constraint_name parent_constraint_name
FROM dba_constraints con,
dba_cons_columns col,
dba_constraints par
WHERE con.constraint_type = ‘R’
AND con.owner NOT IN (‘ANONYMOUS’,’APEX_030200′,’APEX_040000′,’APEX_SSO’,’APPQOSSYS’,’CTXSYS’,’DBSNMP’,’DIP’,’EXFSYS’,’FLOWS_FILES’,’MDSYS’,’OLAPSYS’,’ORACLE_OCM’,’ORDDATA’,’ORDPLUGINS’,’ORDSYS’,’OUTLN’,’OWBSYS’)
AND con.owner NOT IN (‘SI_INFORMTN_SCHEMA’,’SQLTXADMIN’,’SQLTXPLAIN’,’SYS’,’SYSMAN’,’SYSTEM’,’TRCANLZR’,’WMSYS’,’XDB’,’XS$NULL’,’PERFSTAT’,’STDBYPERF’,’MGDSYS’,’OJVMSYS’)
AND col.owner = con.owner
AND col.constraint_name = con.constraint_name
AND col.table_name = con.table_name
AND par.owner(+) = con.r_owner
AND par.constraint_name(+) = con.r_constraint_name
GROUP BY
col.owner,
col.constraint_name,
col.table_name,
con.status,
con.r_owner,
con.r_constraint_name,
par.owner,
par.constraint_name,
par.table_name
),
ref_int_indexes AS (
SELECT /*+ MATERIALIZE NO_MERGE */
r.owner,
r.constraint_name,
c.table_owner,
c.table_name,
c.index_owner,
c.index_name,
r.col_cnt
FROM ref_int_constraints r,
dba_ind_columns c,
dba_indexes i
WHERE c.table_owner = r.owner
AND c.table_name = r.table_name
AND c.column_position <= r.col_cnt
AND c.column_name IN (r.col_01, r.col_02, r.col_03, r.col_04, r.col_05, r.col_06, r.col_07, r.col_08,
r.col_09, r.col_10, r.col_11, r.col_12, r.col_13, r.col_14, r.col_15, r.col_16)
AND i.owner = c.index_owner
AND i.index_name = c.index_name
AND i.table_owner = c.table_owner
AND i.table_name = c.table_name
AND i.index_type != ‘BITMAP’
GROUP BY
r.owner,
r.constraint_name,
c.table_owner,
c.table_name,
c.index_owner,
c.index_name,
r.col_cnt
HAVING COUNT(*) = r.col_cnt
)
SELECT
*
FROM ref_int_constraints c
WHERE NOT EXISTS (
SELECT NULL
FROM ref_int_indexes i
WHERE i.owner = c.owner
AND i.constraint_name = c.constraint_name
)
ORDER BY
1, 2, 3;
```

# 5. Nếu bạn muốn đọc toàn bộ những bài viết về kinh nghiệm tối ưu cơ sở dữ liệu của tôi
Link tổng hợp các bài viết tối ưu của tôi:[ Click vào đây ](https://wecommit.com.vn/tong-hop-link-cac-bai-viet-hay-tren-trang-wecommit-com-vn/)

# 6. Link bài viết gốc 
Link gốc: [https://wecommit.com.vn/foreign-key-no-index/](https://wecommit.com.vn/foreign-key-no-index/)

# 7. Tổng hơp toàn bộ các bài viết của tôi về tối ưu.
Tổng hợp các bài viết hay về tối ưu của tôi: https://wecommit.com.vn/tong-hop-link-cac-bai-viet-hay-tren-trang-wecommit-com-vn/
# 8.Nếu bạn muốn liên hệ với tôi
Youtube: [https://www.youtube.com/channel/UCtsYzL7iN7rBCPnkjYp4XYw](https://www.youtube.com/channel/UCtsYzL7iN7rBCPnkjYp4XYw)

Zalo: 0888549190

Facebook:[ https://www.facebook.com/tran.q.huy.71]( https://www.facebook.com/tran.q.huy.71)



Email: huy.tranquoc@wecommit.com.vn