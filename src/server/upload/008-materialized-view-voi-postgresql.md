© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Chắc hẳn anh em dev đã quen thuộc với **view** trong sql. Về cơ bản nó là kết quả của query được viết sẵn, mỗi khi select view nó sẽ execute query đó đồng thời thực hiện thêm các condition nếu có. Do đó có thể coi nó là **virtual table**. Thay vì phải nhớ query, lưu vào đâu đó thì ta tạo luôn **view**. 

Vậy **Materialized view** có gì khác biệt so với **view** thông thường?

## 1) Materialized view là gì?

Bài toán của chúng ta cần join rất nhiều bảng với nhau để các thông tin cần thiết, ví dụ:

```sql
SELECT ... FROM X x
    JOIN Y y ON x.a = y.a
    JOIN Z z ON x.b = z.b
    JOIN T t ON x.c = t.c
    ...
WHERE ...;
```

Với [bài trước](https://viblo.asia/p/005-hieu-ve-join-de-tang-performance-voi-postgresql-924lJjpXlPM), ta đã biết **computation cost** cho JOIN rất tốn, ảnh hưởng trực tiếp đến query performance. Thay vì mỗi lần truy vấn lại phải khai báo câu query dài như kia, ta sử dụng **view** để đơn giản hóa. Tuy nhiên, **view** thông thường không giải quyết được bài toán performance do mỗi lần query ta đều cần thực hiện lại quá trình execute query.

**Materialized view** ra đời nhằm giải quyết bài toán trên với idea không thể đơn giản hơn: **caching**. Nếu **view** là **virtual table** thì **materialized view** là **physical table**. **Materialized view** cần thêm không gian bộ nhớ để lưu trữ data là kết quả của query. Do đó với mỗi lần truy vấn, data sẽ được trả về ngay lập tức mà không thông qua quá trình **query plan** và **query execution**. 

Nếu data được lưu trữ lại với **materialized view**, chuyện gì sẽ xảy ra nếu các table thay đổi dữ liệu? Well, vì bản chất nó giống với **cache** nên sẽ xảy ra **invalid cache**, dữ liệu của **materialized view** không còn chính xác.

> Như vậy, chúng ta cần hy sinh **space** và chấp nhận **invalid data** để tăng **query performance**. Có thể tạm hiểu là move cache từ **application layer** xuống **database layer** :joy:.

Như vậy, **materialized view** phù hợp trong một vài trường hợp sau:
> - Vấn đề về **time** quan trọng hơn **space**. Chấp nhận đánh đổi bộ nhớ để tăng performance.
> - Ngoài ra, chấp nhận việc dữ liệu có thể có sai số trong một khoảng thời gian.
> - Nếu muốn không xảy ra invalid data, cần có cơ chế kiểm soát được sự thay đổi trên table để update lại **marterialized view**.

## 2) Cách tạo ra Materialized view

Idea khá đơn giản, cùng bắt tay vào tạo một **materialized view** với query sau:

```sql
CREATE MATERIALIZED VIEW ENGINEER_MVIEW AS
    SELECT e.first_name, e.last_name, c.country_name
	    FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id;
```

Explain query sau:

```sql
SELECT e.first_name, e.last_name, c.country_name
FROM ENGINEER e JOIN COUNTRY c ON e.country_id = c.id
WHERE e.first_name = 'Will'; 
```

![](https://i.imgur.com/ECSvq6g.png)

**Query plan** khá.. bự, **cost** rơi vào khoảng 0.14 đến 2398. Thử với **materialized view** xem có khá khẩm hơn không.

```sql
EXPLAIN SELECT * FROM ENGINEER_MVIEW e
WHERE e.first_name = 'Will';
```

![](https://i.imgur.com/NxTWwPb.png)

Khá hơn hẳn, về bản chất **materialized view** là physical table nên chỉ cần seq scan để tìm kiếm kết quả. **Cost** thấp hơn khá nhiều lần chỉ còn khoảng 0 đến 757. 


## 3) Refresh Materialized view

Phần cuối cùng tương tự với **refresh cache**, đó là **refresh materialized view** để update data mới với query sau:

```sql
REFRESH MATERIALIZED VIEW ENGINEER_MVIEW;
```

Phần này khá ngắn gọn và không có gì đặc biệt. Đón chờ bài cuối cùng trong series về một vài kĩ thuật khác để thực hiện query optimization với PostgreSQL nhé.


### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

### After credit

Ở các bài trước, ta thấy lợi ích khá tuyệt vời của **index**. Tuy nhiên nó có 2 bất lợi:
> - Tăng disk space.
> - Re-balance index table.

Chúng ta chấp nhận nhược điểm để đổi lấy query performance với những query có condition phù hợp. Tuy nhiên có những giá trị của column chẳng bao giờ query đến. 

Ví dụ bài toán chỉ làm việc với những Engineer có `title` không phải `Backend Engineer`, nếu đánh index cho cả column `title` thì xảy ra tình huống những `Back Engineer` tiêu tốn cả 2 bất lợi về disk space và write time nhưng không đem lại hiệu quả gì. 

Để giải quyết vấn đề trên, PostgreSQL cung cấp một tính năng đặc biệt là **Partial index** - index một phần.

Ta có thể thực hiện chỉ **index** cho column `title` với những Engineer không phải là `Backend Engineer` như sau:

```sql
CREATE INDEX idx_engineer_title_not_be ON ENGINEER(title) 
    WHERE title != 'Backend Engineer';
```

Như vậy đánh **index** không chỉ đúng chỗ mà còn phải đúng cách sẽ đem lại hiệu quả tuyệt vời.

**Note**: cho đến thời điểm hiện tại MySQL mới nhất version 8.0 vẫn chưa support **partial index**.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)