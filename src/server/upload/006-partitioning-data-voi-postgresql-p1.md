© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Một hướng tiếp cận khác có thể tăng query performance là áp dụng **partitioning**: thay đổi data model implementation. Let's begin.

## 1) Horizontal & Vertical partitioning
Bản chất của việc thực hiện các câu query đều là scan table. Do đó, table càng lớn thì càng ảnh hưởng đến performance của query cho dù có được index hay không.

### 1.1) Horizontal partitioning

Vậy có cách nào làm cho query hiệu quả hơn ngoài việc index? Ý tưởng khá đơn giản dựa trên nguyên tắc chia để trị. Hãy tưởng tượng lớp học có 40 học sinh trong đó 12 nam và 8 nữ. Nếu cần tìm một bạn nữ tên Jane, thay vì scan từng học sinh, ta sẽ chia sẵn lớp học thành 2 dãy nam và nữ sao đó thực hiện scan trên dãy học sinh nữ.

![](https://i.imgur.com/hffknZ3.png)

Nếu có thêm học sinh vào lớp, chỉ cần sắp xếp bạn đó vào đúng nhóm là ok. Trên thực tế, việc thay đổi giới tính gần như không xảy ra :joy:, tuy nhiên nếu xảy ra thì việc cần làm là sắp xếp bạn đó về đúng nhóm của mình là xong.

**Partitioning** table chính là ví dụ phía trên. Chúng ta chia table lớn thành nhiều table nhỏ hơn, các table nhỏ hơn gọi là **partition table**, kế thừa toàn bộ cấu trúc của parent table, từ column cho đến kiểu dữ liệu. Việc chia nhỏ này được gọi là **horizontal partitioning**.

![](https://i.imgur.com/jVSX3Yo.png)

**Horizontal partitioning** có những ưu điểm sau:
> - Giới hạn vùng dữ liệu phải scan trên table trong một vài trường hợp. Nếu ta cần tìm một học sinh tên John Doe không phân biệt giới tính thì việc partition như ví dụ trên không đem lại hiểu quả.
> - **Partition table** cũng giống như một table thường nên ta có thể thực hiện index cho nó. Dẫn đến việc tốn ít cost hơn để maintain index table, do số lượng record ít hơn.
> - Ngoài ra, việc xóa các dữ liệu trên **partition table** sẽ nhanh hơn và không ảnh hưởng đến các **partition** khác.

Với những ưu điểm trên, ta cần lưu ý khi thực hiện **horizontal partitioning** để đạt hiệu quả tối đa:
> - Áp dụng với các table rất lớn. Thường là quá size của memory.
> - Việc partition trên điều kiện nào phải dựa vào tính chất và tần suất của các query.

### 1.2) Vertical partitioning

**Vertical partitioning** cũng là việc chia một table ra thành nhiều **partition table** nhưng theo chiều.. dọc. Ví dụ một table 100 columns được partition thành 4 table mỗi table 25 columns. Về cơ bản sẽ không có một tiêu chuẩn hay công thức cụ thể nào cho việc **vertical partitioning**. Ta chỉ cần chú ý đến việc nhóm các columns có tần suất query cùng nhau thành một partition.

Ngoài ra, với **vertical partitioning**, best practice là sử dụng chung một PK cho toàn bộ các partition table.

![](https://i.imgur.com/6vtWvlt.png)

Vậy lợi ích của **vertical partitioning** là gì?

Trước tiên cần hiểu về cách data được lưu trữ xuống disk (HDD/SSD). Về cơ bản, các records được lưu thành một khối dữ liệu có độ lớn gần tương tự như nhau được gọi là block. Do đó, nếu một table chứa số lượng column ít đồng nghĩa với việc tăng đương số lượng records lưu trữ trên một block. Như vậy nếu query các column trong cùng block, các xử lý tính toán I/O sẽ giảm đi phần nào dẫn tới việc tăng performance. Mình có giải thích kĩ hơn về block và page trong [bài này](https://viblo.asia/p/012-postgresql-vacuum-la-gi-ByEZkrRWKQ0#_11-clear-dead-tuple-1).

Trong thực tế, **vertical partitioning** nên được chú ý ngay từ khi design database vì việc này ảnh hưởng trực tiếp đến cách query và vận hành hệ thống do phải chia thành các table thực. **Horizontal partitioning** đơn giản hơn một chút tuy nhiên vẫn cần dừng hệ thống trong 1 khoảng thời gian để làm các thao tác sau:
> - Back-up data cũ.
> - Tạo partition table.
> - Insert data vào table mới.

## 2) Horizontal partitioning by range
Bản chất của **partitioning** là phân chia ra các **partition table** dựa trên điều kiện phân vùng **partition key**. Với **partition by range**, điều kiện partition có thể là:
> - Phân chia theo thời gian.
> - Phân chia theo numeric từ 1 đến 5, 6 đến 10...
> - Phân chia theo bảng chứ cái A, B, C; D, E, F...

Khi thực hiện **range partition** ta quan tâm đến giá trị min và max của mỗi **partition** để thực hiện việc phân chia. Ví dụ table **ENGINEER** có thông tin về ngày bắt đầu làm việc (start_date), ta có thể dựa trên column này để phân chia **partition** theo từng quý. Như đã nói ở trên, ta cần back-up data và tạo lại table mới nhé:

```sql
DROP TABLE ENGINEER;
CREATE TABLE ENGINEER
(
    id bigserial NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    gender smallint NOT NULL,
    country_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    started_date date,
    created timestamp without time zone NOT NULL
) PARTITION BY RANGE(started_date);

CREATE TABLE ENGINEER_Q1_2020 PARTITION OF ENGINEER FOR VALUES
    FROM ('2020-01-01') TO ('2020-04-01');
    
CREATE TABLE ENGINEER_Q2_2020 PARTITION OF ENGINEER FOR VALUES
    FROM ('2020-04-01') TO ('2020-07-01');
    
CREATE TABLE ENGINEER_Q3_2020 PARTITION OF ENGINEER FOR VALUES
    FROM ('2020-07-01') TO ('2020-10-01');
    
CREATE TABLE ENGINEER_Q4_2020 PARTITION OF ENGINEER FOR VALUES
    FROM ('2020-10-01') TO ('2020-12-31');
```

Thay vì back-up, mình sẽ insert [data mới](https://drive.google.com/file/d/19JXghNjMOjZ66PpmvDjQoPawwlNTgIl5/view?usp=sharing) luôn.

![](https://i.imgur.com/vnLdj77.png)

Explain query một engineer với id = 10:

```sql=
EXPLAIN SELECT * FROM ENGINEER WHERE id = 10;
```

![](https://i.imgur.com/2PYMDss.png)

Sau khi thực hiện **partition**, một table **ENGINEER** sẽ bao gồm 4 **table partition**. Lúc này, query plan phải sequence scan trên toàn bộ partition để tìm ra record thỏa mãn điều kiện id = 10. 

Chưa thấy có gì đặc biệt, thử tìm kiếm các engineer bắt đầu làm việc từ Apr 01, 2020:

```sql
EXPLAIN SELECT * FROM ENGINEER WHERE started_date = '2020-04-01';
```

![](https://i.imgur.com/mp7o45f.png)

Lúc này, query plan chỉ scan trên partition **engineer_q2_2020**. Đã thấy sự lợi hại của partition. Mặc dù ta không specific chỉ định partition **engineer_q2_2020** nhưng PostgreSQL biết điều đó và tối ưu luôn cho chúng ta. Câu query trên tương tự với:

```sql
EXPLAIN SELECT * FROM ENGINEER_Q2_2020 WHERE started_date = '2020-04-01';
```

Mỗi **partition** được coi là một table riêng biệt và kế thừa các đặc tính của table. Ta hoàn toàn có thể thêm index cho từng partition để tăng performance cho query, được gọi là **local index**. Hoặc thêm index cho parent table, được gọi là **global index**.

Quick question, bạn có nhận ra điều gì đặc biệt khi tạo **partition table** không? Đó là nó không có PK, hay nói cách khác, không thể tạo constraint PK hay unique trên các column (riêng lẻ, không combine với partition column) của table. Thử nhé:

```sql
CREATE TABLE TEST_PK
(
    id bigserial NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    gender smallint NOT NULL,
    country_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    started_date date,
    created timestamp without time zone NOT NULL,
    PRIMARY KEY (id)
) PARTITION BY RANGE(started_date);

CREATE TABLE TEST_UNQ
(
    id bigserial UNIQUE NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    gender smallint NOT NULL,
    country_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    started_date date,
    created timestamp without time zone NOT NULL
) PARTITION BY RANGE(started_date);
```

Bạn có biết vì sao không? Nếu chưa thì chờ câu trả lời ở cuối bài.

Với ví dụ trên, ta có tổng cộng 4 partitions cho 4 quý của năm 2020. Nếu insert hoặc update một record không thuộc năm 2020 thì sao nhỉ:

```sql
UPDATE ENGINEER SET started_date = '2021-01-01';

INSERT INTO ENGINEER(first_name, last_name, gender, country_id, title, started_date, created) 
    VALUES('Hermina', 'Kuhlman', 3, 229, 'Backend Engineer', '2021-09-23', current_timestamp);
```

Cả 2 query đều báo lỗi vì.. không biết nhét chúng vào partition table nào. Do đó, nếu không chắc chắn về tập data của mình, ta cần tạo một table default partition để chứa các record không biết phân loại vào đâu :joy:.

```sql
CREATE TABLE ENGINEER_DEFAULT_PARTITION PARTITION OF ENGINEER DEFAULT;
```

PostgreSQL version 11 trở xuống không support default partition, các vesion từ 11 trở lên mới thực hiện được nhé. Bây giờ chạy lại query insert trên sẽ ngon ngay.

Vài câu hỏi khác được đặt ra:
> - Có thể tạo một partition mới trong quá trình runtime không? Có thể có nhiều hơn 1 partition chứa cùng một khoảng thời gian không? Ví dụ partition: 2020-01-01:2020-04-01 và partition: 2020-02-01:2020-05-01.
> - Có thể drop một partition trong quá trình runtime mà giữ nguyên data của partition đó không?

Với câu đầu tiên, ta hoàn toàn có thể tạo một partition mới, ví dụ là default partition ở trên. Với ý thứ hai, bản chất của partition là phân chia tập data ra thành các partition độc lập với nhau dựa trên các điều kiện cho trước. Vậy nên để không vi phạm quy tắc đó, ta không thể tạo 2 partition với **overlapping key**. Nôm na là một record không thể thuộc nhiều hơn một partition, các **partition key** không được trùng nhau hoặc chứa một phần trùng nhau.

Câu thứ hai, có hai trường hợp:
> - Không có **default partition**: tất nhiên rồi, muốn giữ lại các record ta cần một partition phù hợp để chứa record đó. Trong trường hợp không có **default partition**, không có cách nào có thể giữ lại các record sau khi drop partition table.
> - Có **default partition**: thực ra đây là trick question, nếu không hiểu bản chất rất dễ bị.. ăn cú lừa thế kỉ :joy:. Không cần quan tâm đến partition hay không partition, có **default partition table** hay không có **default partition table**, **DROP** table vẫn là **DROP** table, xóa toàn bộ tất cả các data, index, trigger, constraint.. và định nghĩa của table.

Bài tiếp theo cùng tìm hiểu về 2 loại partition còn lại là:
> - Partition by list.
> - Partition by hash.

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

### After credit

Vì sao không thể tạo constraint PK hoặc unique (single column without partition column combination) với parent partition table? Cần tìm hiểu kĩ lại partition table là gì?

Bản chất của **partition** là chia một **logical table** ra thành nhiều **small physical pieces**. Lúc này table ENGINEER ban đầu mà ta định nghĩa chỉ là abstract table, định nghĩa ra các partition bao gồm những column nào, trường dữ liệu gì. Việc quyết định constraint unique sẽ apply cho toàn bộ các **partition**, điều đó khiến cho các **partition** phải liên hệ với nhau để check một value có là unique hay không, nó làm phá vỡ đi ý nghĩa **partition** ban đầu.

P/S: có thể tạo constraint PK/Unique trong trường hợp constraint đó phải bao gồm các partition columns. Tuy nhiên nó không thỏa mãn yêu cầu mong muốn ban đầu. Mình có mô tả kĩ hơn ở phần comment nhé.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)