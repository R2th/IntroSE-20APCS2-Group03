Chào các bạn!
Hôm nay của mình xin được chia sẻ về View và Materialized View. Trong khuôn khổ bài viết này, mình sử dụng PostgreSQL để thực hiện các ví dụ demo cho các bạn dễ hiểu.

# 0. Chuẩn bị dữ liệu
Ví dụ, mình xây dựng cơ sở dữ liệu cho 1 website bán hàng, trong đó, có 1 bảng Người Dùng (User), 1 bảng Sản Phẩm (Product), và 1 bảng Người dùng đánh giá sản phẩm (User_Product_Rate) như sau 
Lần lượt nhé

**Bảng User**
```sql
CREATE TABLE public."user"
(
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(32) NOT NULL,
    password TEXT NOT NULL,
    user_email VARCHAR(256) NOT NULL,
    created_date TIMESTAMP DEFAULT now() NOT NULL,
    updated_date TIMESTAMP DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX user_user_id_uindex ON public."user" (user_id);
CREATE UNIQUE INDEX user_user_name_uindex ON public."user" (user_name);
CREATE UNIQUE INDEX user_user_email_uindex ON public."user" (user_email);
```

**Bảng Product**
```sql
CREATE TABLE public.product
(
    product_id SERIAL NOT NULL,
    product_name VARCHAR(32) NOT NULL,
    product_type VARCHAR(16) NOT NULL,
   price NUMERIC NOT NULL,
    created_date TIMESTAMP DEFAULT now() NOT NULL,
    updated_date TIMESTAMP DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX product_product_id_uindex ON public.product (product_id);
```

**Bảng Order**

```sql
CREATE TABLE public.user_product_rate
(
    user_product_rate_id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    score INT NOT NULL,
    comment TEXT,
    created_date TIMESTAMP DEFAULT now() NOT NULL,
    updated_date TIMESTAMP DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX user_product_rate_user_product_rate_id_uindex ON public.user_product_rate (user_product_rate_id);
```

Giờ thì ta bắt đầu khởi tạo 1 số dữ liệu ban đầu để phục vụ cho việc demo nhé

```sql
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 1', 'input your pwd', 'nhs3108@gmail.com');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 2', 'input your pwd', 'nhs3108@gmail.com2');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 3', 'input your pwd', 'nhs3108@gmail.com3');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 4', 'input your pwd', 'nhs3108@gmail.com4');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 5', 'input your pwd', 'nhs3108@gmail.com5');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 6', 'input your pwd', 'nhs3108@gmail.com6');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 7', 'input your pwd', 'nhs3108@gmail.com7');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 8', 'input your pwd', 'nhs3108@gmail.com8');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 9', 'input your pwd', 'nhs3108@gmail.com9');
INSERT INTO public."user"(user_name, password, user_email) VALUES('User 10', 'input your pwd', 'nhs3108@gmail.com10');
```


```sql

INSERT INTO public.product(product_name, product_type, price) VALUES ('Product A', 'Food', '100');
INSERT INTO public.product(product_name, product_type, price) VALUES ('Product B', 'Drink', '300');
INSERT INTO public.product(product_name, product_type, price) VALUES ('Product C', 'Moto', '900');
INSERT INTO public.product(product_name, product_type, price) VALUES ('Product D', 'Auto', '950');
```

```

INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (1, 1, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (2, 1, 50, 'Normal');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (3, 1, 10, 'Bad');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (4, 1, 10, 'Bad');

INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (1, 2, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (2, 2, 50, 'Normal');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (3, 2, 10, 'Bad');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (4, 2, 10, 'Bad');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (5, 2, 10, 'Bad');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (6, 2, 10, 'Bad');

INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (1, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (2, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (3, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (4, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (5, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (6, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (7, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (8, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (9, 3, 100, 'Good');
INSERT INTO public.user_product_rate(user_id, product_id, score, comment) VALUES (10, 3, 100, 'Good');
```


OK. Giả sử ta có 1 yêu cầu thống kê điểm số trung bình mà người dùng xếp hạng cho mỗi sản phẩm. Ta sẽ cần dùng câu query như sau

```sql
SELECT
  round(coalesce(avg(upr.score), 0), 2) AS avg_score, /* [[avg(upr.score]]equals to [[sum(CAST(upr.score AS NUMERIC)) / count(upr.score)]] */
  p.product_id,
  p.product_name,
  p.price,
  p.product_type
FROM public.product p
  LEFT JOIN public.user_product_rate upr ON p.product_id = upr.product_id
  LEFT JOIN public."user" u ON upr.user_id = u.user_id
GROUP BY p.product_id, p.product_name, p.price, p.product_type
ORDER BY avg_score DESC;
```


Và kết quả mình thu được với dữ liệu trên như sau
```
 avg_score | product_id | product_name | price | product_type 
-----------+------------+--------------+-------+--------------
    100.00 |          3 | Product C    |   900 | Moto
     42.50 |          1 | Product A    |   100 | Food
     31.67 |          2 | Product B    |   300 | Drink
      0.00 |          4 | Product D    |   950 | Auto
```
# 1. View
Câu hỏi đặt ra ở đây là, thế mỗi lần ta muốn xem thống kê điểm số trung bình mà người dùng xếp hạng cho mỗi sản phẩm, ta lại phải đi gõ lại cái query dài ngoằng kia hay sao? Ở ví dụ của mình còn là 1 query khá đơn giản và chưa quá dài, nhưng cũng đủ ta phải ngán ngẩm khi gõ lại hoặc lôi nó vào trong code đúng ko nào?

PostgreSQL, MySQL, Oracle cho chúng ta 1 khái niệm "View" mà người ta hay gọi là "Khung nhìn" hay "Bảng tạm". Chỉ cần google từ khóa "View trong SQL là gì?", bạn có thể thấy vô vàng các kết quả. Một trong số đó tại http://viettuts.vn/sql/su-dung-view-trong-sql, họ đính nghĩa như sau

![](https://images.viblo.asia/83b741ad-70a3-45e7-9966-2f15a9706666.png)

Có lẽ họ dịch google nên mới có chữ "Lượt xem" (views) như vậy. Tuy nhiên, phần nào đó cũng giúp các bạn hiểu sơ sơ View là gì. Đừng cố dịch View thành "khung nhìn", nghe nó cứ điêu điêu thế nào ý. Tại https://www.postgresql.org/docs/9.2/static/sql-createview.html, họ định nghĩa rằng
>CREATE VIEW defines a view of a query. The view is not physically materialized. Instead, the query is run every time the view is referenced in a query.

Bạn có thể hiểu một cách cực kỳ đơn giản, việc tạo 1 View có thể hiểu nôm na là tạo 1 Alias cho 1 câu query, tạo nên 1 "bảng tạm" . Khi bạn gọi đến view, đồng nghĩa với việc bạn gọi câu query mà bạn gán khi tạo VIEW. "Ở phần định nghĩa bên trên, họ nói rằng, VIEW thì không được lưu trữ vật lý, nó giống như một bảng ảo, Thay vào đó, câu query sẽ được chạy mỗi lần gọi tới VIEW."

**Cú pháp tạo VIEW**
```
CREATE [ OR REPLACE ] [ TEMP | TEMPORARY ] VIEW name [ ( column_name [, ...] ) ]
    [ WITH ( view_option_name [= view_option_value] [, ... ] ) ]
    AS query
```
Vì mục đích của bài viết này chủ yếu là để các bạn biết tới 2 khái niệm View và Materialized View, cũng như hiểu về cách nó hoạt động, nên mình sẽ không không đi sâu quá nhé. Các bạn có thể tham khảo tại 

https://www.postgresql.org/docs/9.2/static/sql-createview.html

https://www.postgresql.org/docs/9.3/static/sql-creatematerializedview.html

OK. Giờ với cú pháp như trên, ta đi tạo view cho phần thống kê mà ta đề cập ban đầu nhé,

```
CREATE VIEW product_rate_statistic AS
  SELECT
    round(coalesce(avg(upr.score), 0), 2) AS avg_score,
    p.product_id,
    p.product_name,
    p.price,
    p.product_type
  FROM public.product p
    LEFT JOIN public.user_product_rate upr ON p.product_id = upr.product_id
    LEFT JOIN public."user" u ON upr.user_id = u.user_id
  GROUP BY p.product_id, p.product_name, p.price, p.product_type
  ORDER BY avg_score DESC;
  ```
  
  Rất đơn giản phải không nào. Giờ ta test 
  ```
  view_tutorial=# SELECT * FROM public.product_rate_statistic;
 avg_score | product_id | product_name | price | product_type 
-----------+------------+--------------+-------+--------------
    100.00 |          3 | Product C    |   900 | Moto
     42.50 |          1 | Product A    |   100 | Food
     31.67 |          2 | Product B    |   300 | Drink
      0.00 |          4 | Product D    |   950 | Auto

```


Dùng EXPLAIN để xem xem câu lệnh `SELECT * FROM public.product_rate_statistic;` ngắn ngủi kia thực chất là làm những gì nhé
```
view_tutorial=# explain SELECT * FROM public.product_rate_statistic;
                                        QUERY PLAN                                         
-------------------------------------------------------------------------------------------
 Sort  (cost=81.35..82.30 rows=380 width=172)
   Sort Key: (round(COALESCE(avg(upr.score), '0'::numeric), 2)) DESC
   ->  HashAggregate  (cost=59.36..65.06 rows=380 width=172)
         Group Key: p.product_id, p.product_name, p.price, p.product_type
         ->  Hash Right Join  (cost=18.55..48.74 rows=850 width=172)
               Hash Cond: (upr.product_id = p.product_id)
               ->  Seq Scan on user_product_rate upr  (cost=0.00..18.50 rows=850 width=12)
               ->  Hash  (cost=13.80..13.80 rows=380 width=168)
                     ->  Seq Scan on product p  (cost=0.00..13.80 rows=380 width=168)
(9 rows)

```

Như vậy, việc gọi `SELECT * FROM public.product_rate_statistic;` tuơng đương với
```sql

SELECT *
FROM (SELECT
        round(coalesce(avg(upr.score), 0), 2) AS avg_score,
        p.product_id,
        p.product_name,
        p.price,
        p.product_type
      FROM public.product p
        LEFT JOIN public.user_product_rate upr ON p.product_id = upr.product_id
        LEFT JOIN public."user" u ON upr.user_id = u.user_id
      GROUP BY p.product_id, p.product_name, p.price, p.product_type
      ORDER BY avg_score DESC) t;
```


Giờ mình có 1 ví dụ để bạn hiểu về đặc điểm của View nhé

-----


`Tại thời điểm chưa insert product mới`
 ```
  view_tutorial=# SELECT * FROM public.product_rate_statistic;
 avg_score | product_id | product_name | price | product_type 
-----------+------------+--------------+-------+--------------
    100.00 |          3 | Product C    |   900 | Moto
     42.50 |          1 | Product A    |   100 | Food
     31.67 |          2 | Product B    |   300 | Drink
      0.00 |          4 | Product D    |   950 | Auto
(4 rows)
```

Và sau khi insert `INSERT INTO public.product(product_name, product_type, price) VALUES ('Product E', 'Draft', '10');` thì khi gọi lại View, ta được
```
view_tutorial=# SELECT * FROM public.product_rate_statistic;
 avg_score | product_id | product_name | price | product_type 
-----------+------------+--------------+-------+--------------
    100.00 |          3 | Product C    |   900 | Moto
     42.50 |          1 | Product A    |   100 | Food
     31.67 |          2 | Product B    |   300 | Drink
      0.00 |          4 | Product D    |   950 | Auto
      0.00 |          5 | Product E    |    10 | Draft
(5 rows)
```


-----



Vì đặc điểm của View là không lưu trữ vật lý, do đó, mỗi lần gọi tới View, câu query đều được chạy lại. Đặc điểm đó cho ta 1 lưu thế, nghĩa là dữ liệu của View hiển thị là dữ liệu realtime (có thể mình dùng từ chưa được chuẩn), hay dữ liệu chính xác tại bất cứ thời điểm nào khi tham chiếu tới view.

Nhưng hãy thử hình dung ở 1 bài toán khác ở phần 2 nhé. 
# 2. MATERIALIZED VIEW

Giả khả việc thống kê của bạn còn phụ thuộc tới hàng trăm nghìn các yếu tố khác, và mỗi lần query 

```sql
SELECT
  round(coalesce(avg(upr.score), 0), 2) AS avg_score, /* [[avg(upr.score]]equals to [[sum(CAST(upr.score AS NUMERIC)) / count(upr.score)]] */
  p.product_id,
  p.product_name,
  p.price,
  p.product_type
FROM public.product p
  LEFT JOIN public.user_product_rate upr ON p.product_id = upr.product_id
  LEFT JOIN public."user" u ON upr.user_id = u.user_id
GROUP BY p.product_id, p.product_name, p.price, p.product_type
ORDER BY avg_score DESC;
```


mất tới vài giây. Vậy khi user load 1 sản phẩm để xem thông tin, user sẽ phải chờ đợi vài giây. Trong khi đó, yêu cầu hệ thống của bạn chỉ là : "Điểm của sản phẩm là điểm được thống kê và chốt từ quá khứ tớ thời điểm 24h ngày hôm trước". Vậy thì ưu điểm của VIEW lúc này lại trở thành bất lợi khi mỗi lần gọi nó đều phải dựng lại kết quả trong khi điều đó không cần thiết. Lúc này, ta cần đến `MATERIALIZED VIEW`

MATERIALIZED VIEW cũng gần giống như VIEW, chỉ khác ở chỗ là nó được lưu trữ vật lý. Do đó khi bạn tham chiếu tới MATERIALIZED VIEW, CSDL của bạn sẽ không phải dựng lại kết quả của câu lệnh truy vấn ứng với view, mà chỉ là đi lôi `KẾT QUẢ ĐANG LƯU TRỮ` ra, giống như khi lôi 1 TABLE bình thường.

Vậy, `KẾT QUẢ ĐANG LƯU TRỮ` ở đây là gì? Nó sẽ là kết quả của câu truy vấn tại thời điểm tạo MATERIALIZED VIEW, hoặc kết quả của câu truy vấn tại thời điểm REFRESH MATERIALIZED VIEW gần nhất (hay cưới cùng tính tới thời điểm xét). Như vậy, với bài toán thống kê bên trên, ta sẽ refresh lại MATERIALIZED VIEW vào mỗi 24h hằng ngày là OK.

Cú pháp tạo 
```
CREATE MATERIALIZED VIEW table_name
    [ (column_name [, ...] ) ]
    [ WITH ( storage_parameter [= value] [, ... ] ) ]
    [ TABLESPACE tablespace_name ]
    AS query
    [ WITH [ NO ] DATA ]
```

Cú pháp làm mới dữ liệu
```sql
REFRESH MATERIALIZED VIEW tableName.
```

Ta tạo thử nhé
```
CREATE MATERIALIZED VIEW public.product_rate_statistic_at_24h AS
  SELECT
    round(coalesce(avg(upr.score), 0), 2) AS avg_score,
    p.product_id,
    p.product_name,
    p.price,
    p.product_type
  FROM public.product p
    LEFT JOIN public.user_product_rate upr ON p.product_id = upr.product_id
    LEFT JOIN public."user" u ON upr.user_id = u.user_id
  GROUP BY p.product_id, p.product_name, p.price, p.product_type
  ORDER BY avg_score DESC;
```


-----


Giờ ta thử so sánh 1 chút với phần ví dụ bên trên nhé, 

`Trước khi thêm dữ liệu product mới`
```
view_tutorial=# SELECT * FROM public.product_rate_statistic_at_24h;
 avg_score | product_id | product_name | price | product_type 
-----------+------------+--------------+-------+--------------
    100.00 |          3 | Product C    |   900 | Moto
     42.50 |          1 | Product A    |   100 | Food
     31.67 |          2 | Product B    |   300 | Drink
      0.00 |          4 | Product D    |   950 | Auto
      0.00 |          5 | Product E    |    10 | Draft
(5 rows)
```
Sau khi thêm dữ liệu product mới. `
INSERT INTO public.product(product_name, product_type, price) VALUES ('Product F', 'XXX', '10');` . Kết quả khi gọi MATERIALIZED VIEW không có gì thay đổi.
```
view_tutorial=# SELECT * FROM public.product_rate_statistic_at_24h;
 avg_score | product_id | product_name | price | product_type 
-----------+------------+--------------+-------+--------------
    100.00 |          3 | Product C    |   900 | Moto
     42.50 |          1 | Product A    |   100 | Food
     31.67 |          2 | Product B    |   300 | Drink
      0.00 |          4 | Product D    |   950 | Auto
      0.00 |          5 | Product E    |    10 | Draft
(5 rows)

```

Giờ ta REFRESH và gọi lại nhé
```
view_tutorial=# SELECT * FROM public.product_rate_statistic_at_24h;
 avg_score | product_id | product_name | price | product_type 
-----------+------------+--------------+-------+--------------
    100.00 |          3 | Product C    |   900 | Moto
     42.50 |          1 | Product A    |   100 | Food
     31.67 |          2 | Product B    |   300 | Drink
      0.00 |          4 | Product D    |   950 | Auto
      0.00 |          5 | Product E    |    10 | Draft
(5 rows)

view_tutorial=# REFRESH MATERIALIZED VIEW public.product_rate_statistic_at_24h;
REFRESH MATERIALIZED VIEW
view_tutorial=# SELECT * FROM public.product_rate_statistic_at_24h;
 avg_score | product_id | product_name | price | product_type 
-----------+------------+--------------+-------+--------------
    100.00 |          3 | Product C    |   900 | Moto
     42.50 |          1 | Product A    |   100 | Food
     31.67 |          2 | Product B    |   300 | Drink
      0.00 |          4 | Product D    |   950 | Auto
      0.00 |          6 | Product F    |    10 | XXX
      0.00 |          5 | Product E    |    10 | Draft
(6 rows)
````
Đã có sự khác biệt đúng ko. Giờ các bạn đã hiểu rồi chứ.


# 3. Tổng kết
Vài chia sẻ nho nhỏ của mình bên trên tuy không đi sâu quá nhiều vào 2 khái niệm VIEW cũng như MATERIALIZED VIEW, nhưng ví dụ của mình chắc hẳn sẽ giúp các bạn có 1 cái nhìn chân thực nhất về 2 khái niệm này trong các hệ quản trị cơ sở dữ liệu quan hệ như PostgreSQL, MySQL, Orcale. Về ưu nhược điểm khi sử dụng VIEW và  MATERIALIZED VIEW, các bạn hãy tự google và đúc rút ra cho bản thân nhé.Hy vọng giúp ích được các bạn trong công việc. Cảm ơn các bạn đã chú ý lắng nghe.
Để hiểu được nhiều hơn, vui lòng tham khảo thêm tại

https://www.postgresql.org/docs/9.2/static/sql-createview.html

https://www.postgresql.org/docs/9.3/static/sql-creatematerializedview.html

https://freetuts.net/database-view-la-gi-database-view-trong-mysql-239.html