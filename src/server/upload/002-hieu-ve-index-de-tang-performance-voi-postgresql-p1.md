© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Bài trước chúng ta đã biết về các phương pháp giúp tăng performance của SQL query. Bài hôm nay sẽ giới thiệu về một trong các phương pháp đó, **indexing** thần thánh.

Từ bài này sẽ liên quan nhiều đến practice nên cần chuẩn bị env và data trước. Mình sử dụng Docker cho nhanh.

Start PostgreSQL và pgAdmin4:
```shell
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres

docker run -d -p 8888:80 -e PGADMIN_DEFAULT_EMAIL=admin@postgres.com -e PGADMIN_DEFAULT_PASSWORD=1 dpage/pgadmin4
```

Tạo mới table:
```sql
CREATE TABLE IF NOT EXISTS country
(
    id bigserial NOT NULL,
    country_name character varying(255),
    created timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS engineer
(
    id bigserial NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    gender smallint NOT NULL,
    country_id bigint,
    title character varying(255),
    created timestamp without time zone,
    PRIMARY KEY (id)
);
```
[Insert data 100k records tại đây](https://drive.google.com/file/d/1UB5g_lexnkIPrd4us_S57CaA0_yTezur/view?usp=sharing).

## 1) Explain & Explain analyze
### 1.1) Explain
Trước khi **optimize query**, ta **cần hiểu query đó** thực hiện nhiệm vụ gì, có thể optimize phần nào, không thể ào ào thêm index hay chia partition theo kinh nghiệm dân gian và mong nó chạy nhanh hơn được.  
> Xin lưu ý, chúng ta là các kĩ sư chuyên ngành :joy:. Chúng ta làm việc với các con số, không làm việc với cách.. truyền miệng (nhất là thời đại Covid hiện nay).

**Explain** là công cụ đắc lực để thực hiện việc đó. Nó giúp giải thích các bước thực hiện trong câu query là gì với các thông số về cost, rows, widths... Việc còn lại của các kĩ sư là nhìn vào đó để biết vấn đề đang nằm ở đâu và xử lý ra sao.


**Explain** keywork giải thích từng bước câu query được thực hiện, bắt đầu với query sau:
```sql
EXPLAIN SELECT * FROM ENGINEER;
```
![](https://i.imgur.com/IBAfNs4.png)

Với query trên, chỉ 1 step cần thực thi là **sequence scan** table, rất dễ hiểu. Điều chúng ta quan tâm là các con số đằng sau:
- **cost**: cái giá phải trả là bao nhiều, hiểu đơn giản là số lượng tính toán cần thiết để hoàn thành, giá trị từ 0 đến 2117. Tức là sao? Con số đầu tiên thể hiện **cost** cần tiêu tốt để khởi động nhiệm vụ. Con số phía sau là các đơn vị tính toán cần thiết để hoàn thành nhiệm vụ. Lưu ý nó là một thông số đánh giá, không phản ánh thời gian thực tế và nó **không có giá trị thời gian đo cụ thể**.
- **rows**: số lượng row mà Postgres nghĩ rằng nó cần scan để thực thi query.
- **width**: độ rộng trung bình của mỗi row sau khi thực thi query (tổng số lượng byte của tất cả selected columns), đơn vị bytes. Nếu chỉ `SELECT GENDER` thì giá trị **width** là 2 bytes (smallint).

### 1.2) Explain analyze

**Explain** chỉ đưa ta con số áng chừng về cost computation. Để có con số cụ thể hơn về execution time, thêm option **analyze** vào sau **explain**.
```sql
EXPLAIN ANALYZE SELECT * FROM ENGINEER;
```

> **Lưu ý**: **analyze** option sẽ thực thi các statement chứ không đơn thuần là plan nữa. Vì vậy cần rất cẩn thận khi thêm option này trong quá trình **explain**. 
> Ví dụ với các DML statement (INSERT/DELETE/UPDATE):
> - Nếu chỉ thực hiện **explain** thì không có vấn đề gì xảy ra.
> - Nếu thực hiện **explain analyze** thì.. còn cái nịt :joy:.
> 
> Do vậy, nếu muốn thực thi các DML statement với **explain analyze** cần sử dụng với transaction:
> ```sql
> BEGIN;
> EXPLAIN ANALYZE DELETE FROM engineer;
> ROLLBACK;
> ```

![](https://i.imgur.com/aUGAfMh.png)

Một vài thông số mới đã xuất hiện:
- Với dòng đầu tiên, không có gì thay đổi nhiều ngoại trừ việc có thêm **actual time**. Giống như **cost**, con số đầu tiên thể hiện thời gian cần để khởi động, con số thứ hai là thời gian để hoàn thành.
- **loops**: đơn giản rồi, số lượng vòng lặp. 
- **planning time**: thời gian lên kế hoạch cho query, rất nhanh chỉ 0,053 ms.
- **execution time**: 2418 ms. Vì sao lại có sự chênh lệch giữa **execution time** và **actual time**? **Actual time** là thời gian tính toán cho nhiệm vụ **seq scan table**. còn một nhiệm vụ quan trọng nữa là fetch data để hiển thị.

Thử với query có điều kiện WHERE:
```sql
EXPLAIN SELECT * FROM ENGINEER WHERE COUNTRY_ID >= 100;
```

![](https://i.imgur.com/gEUpJMW.png)

Vẫn là **seq scan table**, tuy nhiên có thêm bước **filter** để lọc các row có giá trị `national_id` >= 100. Không có gì khó hiểu.

Bước phân tích tính toán query đã xong. Ta nhận thấy một vài vấn đề, trong đó có **seq scan**. Đã có bằng chứng trong tay, xử lý thôi.

## 2) Indexes
Như đã giới thiệu trong bài trước, sử dụng **index** để tránh **full table scan**, tăng performance cho query.

Thực hành trước, câu query trên sử dụng điều kiện với **country_id**, đánh index cho cột này trước:
```sql
CREATE INDEX idx_engineer_country_id ON ENGINEER(country_id);
```

Sau khi thêm **index**, chạy lại câu lệnh `EXPLAIN ANALYZE SELECT * FROM ENGINEER`, kết quả không có gì thay đổi vì chẳng dính dáng gì tới **country_id**. Chạy với điều kiện `WHERE` sử dụng **country_id** xem thế nào:

```sql
EXPLAIN ANALYZE SELECT * FROM ENGINEER WHERE COUNTRY_ID >= 100;
```

![](https://i.imgur.com/LmpxHGu.png)

WTF, vẫn **seq scan**, chả có nhẽ các **Senior** bịp bợp :neutral_face:. Đổi điều kiện WHERE xem sao:

```sql
EXPLAIN ANALYZE SELECT * FROM ENGINEER WHERE COUNTRY_ID >= 150;
```

![](https://i.imgur.com/DL3bs8s.png)

Đã có sự thay đổi, **query plan** sử dụng **bitmap heap scan** chính là **bitmap index**. **Execution time** giảm ~ 30% từ 1500 xuống 1000 ms. Nhưng vì sao điều kiện `>= 100` không sử dụng index mà `>= 150` lại xuất hiện index?

Với điều kiện >= 100, có rất nhiều records phù hợp. Do đó **query execution** xác định rằng **seq scan** trên table chính còn nhanh hơn việc **scan index** trên **table index** rồi sau đó mất công look-up sang table chính. Tuyệt vời, hóa ra các **Senior** lương chục ngàn không bịp bợm :joy:.

> Bài trước ta đã biết việc sử dụng index là việc **scan** trên 2 table. Tức là **scan index table** trước, sau đó ánh xạ kết quả sang table chính.

Như vậy với mỗi điều kiện khác nhau DB System sẽ biết cách thực hiện các **query** nhanh nhất có thể dựa trên những gì chúng ta cung cấp cho nó, cụ thể ở đây là **index**. Ngoài ra, ta thấy một **lesson learn** khác là đôi khi **index** không đem lại tác dụng gì. Đừng dại mà **index** vô tội vạ, không những không tăng tốc độ read mà còn làm chậm tốc độ write.

Đa số các Relational Database có 3 loại **index** phổ biến:
> - B-Tree index.
> - Hash index.
> - Bitmap index.

Ngoài ra PostgreSQL đẹp trai hơn, có một số loại **index** đặc biệt:
> - GIST.
> - SP-GIST.
> - GIN.
> - BRIN.

Viết dài dễ quên, mình sẽ đi cụ thể từng loại index và ứng dụng thực tế trong bài viết sau. Tổng kết bài viết rút ra 2 kết luận:
> - Sử dụng **explain** và **analyze** option để phân tích query, tìm bottle neck.
> - Sử dụng **index** để tăng tốc độ truy vấn.. và chỉ hữu ích trong một vài tình huống cụ thể.


### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)