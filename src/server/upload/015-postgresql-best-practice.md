© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Bài viết cuối cùng trong series sẽ nói về một số lỗi hay gặp với PostgreSQL và các best practice để xử lý.

Let's begin.

## 1) NOT IN

Không nên dùng **NOT IN** hoặc query nào kết hợp **NOT** và **IN** theo kiểu `NOT (x IN (SELECT...))`. Thay vào đó, hãy dùng **NOT EXISTS**.

Có 2 lý do chính cho vấn đề này:
> - **NOT IN** luôn luôn trả về 0 records nếu trong điều kiện tồn tại giá trị NULL. Ví dụ như này:
>     ```sql
>     SELECT * FROM country WHERE id NOT IN (1, NULL);
>     ```
>     Tất nhiên chẳng đứa nào rảnh viết query như thế cả. Thường sẽ là như này:
>     ```sql
>     SELECT * FROM country WHERE id NOT IN (SELECT country_id FROM engineer);
>     ```
>     Nếu column **COUNTRY_ID** trong table **ENGINEER** tồn tại giá trị NULL thì.. hẹo. Chuyển sang query NOT EXISTS chạy lại xem thế nào, nhớ sửa data cho có giá trị NULL nhé:
>     ```sql
>     SELECT * FROM country c WHERE NOT EXISTS (SELECT * FROM engineer e WHERE e.country_id = c.id);
>     ```
>     Đẹp trai luôn kết quả đúng như mong đợi. 
> - Lý do thứ hai, `NOT IN (SELECT...)` không tối ưu cho query plan. Query plan không thể biến nó thành anti-join, tức là bắt buộc phải join để xử lý. Complexity là 0(n2), tốc độ thì chậm khỏi phải bàn :joy:. **EXPLAIN** query để thấy sự khác biệt nhé. 

Tất nhiên vẫn có những case bắt buộc sử dụng **NOT IN**:
> - Khi lượng data không quá lớn.
> - Khi điều kiện NOT IN là danh sách giá trị (1, 2, 3, 4...) và không chứa giá trị NULL.
> - Practical thì viết NOT IN vẫn tự nhiên và dễ hiểu hơn NOT EXISTS.

## 2) TABLE hay table

Với hầu hết các DBMS đều là **case insensitive**, việc đặt tên table/column/index... là **UPPERCASE** hay **lowercase** không có vấn đề gì nghiêm trọng.

PosgreSQL cũng vậy, tất cả các tên từ table, column, index, function... đều được chuyển thành **lowercase**. Nhưng nếu define trong ngoặc kép "như thế này" thì mọi chuyện khác hoàn toàn.

Tạo 2 table Foo và Bar:
```sql
CREATE TABLE FOO();
CREATE TABLE "Bar"();
```

Query với 2 table xem thế nào:
```sql
SELECT * FROM FOO;
SELECT * FROM foo;
SELECT * FROM fOO;

SELECT * FROM bar;
SELECT * FROM Bar;
SELECT * FROM "BAR";
SELECT * FROM "BAr";
SELECT * FROM "bar";
SELECT * FROM "Bar";
```

Table **Foo** không có vấn đề gì. Tuy nhiên tất cả SELECT với table **"Bar"** đều lỗi, ngoại trừ dòng cuối cùng. 

Đã thấy sự khó chịu của nó chưa :joy:. Thực tế chẳng ông nào dở hơi đi viết **"Bar"** thay vì **Bar** cả, tuy nhiên chúng ta sẽ gặp vấn đề với một vài table đặc biệt trùng với system table hoặc keyword. Hoặc một vài tool khi access database sẽ tự động thêm ngoặc kép.

## 3) BETWEEN

**BETWEEN** dùng để lấy dữ liệu trong một đoạn giá trị, tức là bao gồm cả 2 nút đầu và cuối. Tức là query:
```sql
SELECT * FROM engineer WHERE created BETWEEN '2020-01-01' AND '2021-01-01';
```
Cũng có thể viết dưới dạng:
```sql
SELECT * FROM engineer WHERE created >= '2020-01-01' AND created <= '2021-01-01';
```

Nếu không specific giờ phút giây, column dạng datetime sẽ tự động chuyển thành `2021-01-01 00:00:00.000000`. Bạn đã nhận ra vấn đề gì chưa?

Query sẽ trả về toàn bộ kết quả cho đến đúng thời điểm 00:00:00 ngày 2021-01-01. Trừ khi business yêu cầu như vậy, còn đa số các case sẽ tìm các record đến trước thời điểm 00:00:00 ngày 2021-01-01. Những con **bug** sẽ xuất hiện ở đây chứ đâu. 

Vậy nên khi sử dụng BETWEEN với yếu tố datetime cần rất chú ý. Tốt nhất chuyển sang `>`, '>=', `<`, `<=` cho lành.

Với các dữ liệu dạng số nguyên hoặc date (không bao gồm time) thì có thể dùng BETWEEN.

## 4) Sử dụng timestampz thay vì timestamp

Timestamp là timestamp without time zone, timestampz là timestamp with time zone.

Chúng khác nhau một cái có time zone, còn một cái thì không. Nếu chưa nắm rõ time zone là gì, bạn có thể xem thêm [tại đây nhé](https://www.youtube.com/watch?v=vlPNUjE2p1s).

Với timestamp with time zone, internally nó được lưu trữ dưới dạng UTC tính từ thời điểm Jun 01, 2000 cộng thêm time zone. Có nghĩa là nó lưu trữ chính xác thời điểm trên tất cả các khu vực địa lý có múi giờ khác nhau. Ví dụ tại Vietnam là 07:00 AM thì tại UK là 000:00 AM. Việc tính toán chuyển đổi này sẽ nằm ở tầng database và các core API của ngôn ngữ lập trình nên chúng ta không cần bận tâm đến việc đó. Thông tin về datetime tự động được correct về đúng múi giờ trên máy tính khi query. Đơn giản hơn là bạn mang chiếc iPhone từ UK về Việt Nam, nó vẫn chạy đúng giờ (sau khi đồng bộ với giờ quốc tế )

Ngược lại, sử dụng timestamp without time zone giống như việc bạn chụp một bức ảnh với chiếc đồng hồ. Mặc dù có đầy đủ ngày tháng năm giờ phút giây, chụp ở Việt Nam là 07:00 AM, mang sang UK vẫn là 07:00 AM.

Question là khi nào có thể sử dụng timestamp without time zone. Có 2 trường hợp:
> - Toàn bộ hệ thống từ application, database, server... đều dùng chung time zone.
> - Hoặc phải tự handle ở application về các vấn đề liên quan đến lệch time zone. Persist xuống database cần convert và lưu trữ dưới dạng UTC, query lên lại parse về đúng time zone hiện tại. Khá phức tạp.

## 5) No char(n)

Đừng dùng **char(n)**. Mọi string khi lữu trữ với **char(n)** sẽ được thêm **space** cho đủ độ dài. Vừa tốn bộ nhớ, có khi còn khiến logic chạy sai.
> Nếu sử dụng **char(12)** để lưu trữ string **"hello world"**, nó sẽ chuyển thành **"hello world "**.

Vậy khi nào nên dùng **char(n)**? Tốt nhất là không nên dùng.

### 5.2) No varchar(n)

Không dùng **char(n)** thì dùng **varchar(n)** được không? Dù sao cũng có chút cải tiến:
> - Giữ nguyên tính năng giới hạn số lượng kí tự tối đa.
> - Thay vì thêm space cho đủ số lượng thì nó sẽ giữ nguyên. Sử dụng **varchar(100)** để lưu trữ **hello world** thì nó vẫn là **hello world**.

Nghe cũng hợp lý, nhưng nhược điểm của nó là:
> - Nếu một ngày đẹp trời insert giá trị vượt quá length thì.. exception.

Vậy nên nếu thực sự không biết chính xác value's maximum length là bao nhiêu thì tốt nhất hãy để **varchar** hoặc **text**. **Varchar (không có (n))** và **text** là tương tự nhau.

Tuy nhiên một câu hỏi được đặt ra, sử dụng **varchar** hoặc **text** thay vì **varchar(n)** thì performance có ảnh hưởng gì không?

Với PostgreSQL [không có ảnh hưởng gì cả về disk size lẫn performance](https://www.postgresql.org/docs/current/datatype-character.html). Với loại database khác thì... mình không chắc chắn.

Cần lưu ý gì khi sử dụng **varchar(n)**:
> - Khi biết rõ yêu cầu bài toán, max length là một giá trị biết trước.
> - Verify length trên application trước khi persist xuống database.

See you in another series!

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

### After credit

Làm thế nào log query chạy chậm? Có 2 cách để làm việc này:
> - Thứ nhất, thực hiện logging trên application level với idea `total_time = end_time - start_time`. Hoặc sử dụng sẵn hàng của library: Hibernate, MyBatis.. bật tắt log trên application qua config. Cách này khá phổ biến, tuy nhiên cần lưu ý rằng nó là **total_time** chứ không phải **execution_time**. Quá trình thực thi có thể rất nhanh, nhưng chậm có thể do I/O task, slow network... Nếu chỉ nhìn vào **total_time** để quyết định tối ưu thì chưa chắc performance đã được cải thiện.
> - Thứ hai, thực hiện trên PostgreSQL. Dùng hàng có sẵn của PostgreSQL luôn thì chuẩn rồi, nghĩ ngợi gì nữa.

Slow query log mặc định không được active. Do vậy, chúng ta cần một vài việc thủ công để active nó. Có 2 cách tương ứng với 2 level để thực hiện active:
> - Global level
> - Database level

Với **Global level**, ta cần thêm config vào file **postgresql.conf** với đơn vị milliseconds:

```shell
log_min_duration_statement = 10000
```

Thực hiện reload config với statement:

```sql
SELECT pg_reload_conf();
```

Với **Database level**, thực hiện **alter database** theo cách sau:

```sql
ALTER DATABASE database_name SET log_min_duration_statement = 10000;
```

Ngon lành rồi, kể từ giờ những query nào có **execution_time** lớn hơn 10000 ms sẽ được print log.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)