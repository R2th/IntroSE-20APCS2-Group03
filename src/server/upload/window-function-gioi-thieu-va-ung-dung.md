# Table of Contents

1.  [Introduction](#_introduction-1)
    1.  [Window function là gì?](#_window-function-la-gi-2)
    2.  [Partition](#_partition-3)
    3.  [Enter Window frame](#_enter-window-frame-4)
2.  [Applications - Bài viết này giúp tôi tăng lương như thế nào?](#_applications---bai-viet-nay-giup-toi-tang-luong-nhu-the-nao-5)
    1.  [ROW_NUMBER](#_row_number-6)
    2.  [RANK() và DENSE_RANK()](#_rank-va-dense_rank-7)
    3.  [LAG và LEAD](#_lag-va-lead-8)
    4.  [Movable window frames](#_movable-window-frames-9)
3.  [References](#_references-10)


# Introduction

## Window function là gì?

> A window function perform a calculation across a set of table rows that
> are somehow related to the current row. &#x2013; PostgreSQL documentation

Từ định nghĩa trên chúng ta có thể thấy `window function` gần giống như là
`aggregate function` (SUM, AVG). Điểm khác biệt chính là khi dùng `window function`
các row sẽ không bị gộp lại thành một như khi dùng `aggregate function`.

Ví dụ:
```sql
    mysql> CREATE TABLE t(i INT);
    mysql> INSERT INTO t VALUES (1),(2),(3),(4);
    
    mysql> SELECT SUM(i) AS sum FROM t;
    +------+
    | sum  |
    +------+
    |   10 |
    +------+
    
    mysql> SELECT i, SUM(i) OVER () AS sum FROM t;
    +------|------+
    | i    | sum  |
    +------|------+
    |    1 |   10 |
    |    2 |   10 |
    |    3 |   10 |
    |    4 |   10 |
    +------|------+
```
2 câu query trên đều sử dụng hàm `SUM` nhưng lại trả về 2 kết quả khác
nhau. Ai tinh mắt thì có thể nhận ra ngay điểm khác biệt giữa 2 câu này
chính là key word `OVER ()` ngay sau `SUM(i)`. Đây chính là thứ giúp SQL
phân biệt `window function` và `aggregate function`. Hiểu đơn giản thì
`SELECT SUM(i) OVER () FROM t` khá giống `SELECT (SELECT SUM(i) FROM t) FROM t`.
`()` trong `OVER ()` chính là 1 **window** cho phép `SUM` chạy trên
tất cả các row trong t.


## Partition

Như đã nói thì `window function` rất là giống `aggregate function`, khi dùng
`aggregate function` nếu muốn giới hạn số row nó nhận vào thì ta phải dùng `GROUP BY`.
`window function` cũng có 1 thứ na na như vậy là `partition`.
Ví dụ:

    CREATE TABLE sales(employee VARCHAR(50), `date` DATE, sale INT);
    
    INSERT INTO sales VALUES ('odin', '2017-03-01', 200),
    ('odin', '2017-04-01', 300),
    ('odin', '2017-05-01', 400),
    ('thor', '2017-03-01', 400),
    ('thor', '2017-04-01', 300),
    ('thor', '2017-05-01', 500);
    
    mysql> SELECT employee, SUM(sale) FROM sales GROUP BY employee;
    +----------|-----------+
    | employee | SUM(sale) |
    +----------|-----------+
    | odin     |       900 |
    | thor     |      1200 |
    +----------|-----------+
    
    mysql> SELECT employee, date, sale, SUM(sale) OVER (PARTITION BY employee) AS sum FROM sales;
    +----------|------------|------|------+
    | employee | date       | sale | sum  |
    +----------|------------|------|------+
    | odin     | 2017-03-01 |  200 |  900 |
    | odin     | 2017-04-01 |  300 |  900 |
    | odin     | 2017-05-01 |  400 |  900 |
    | thor     | 2017-03-01 |  400 | 1200 |
    | thor     | 2017-04-01 |  300 | 1200 |
    | thor     | 2017-05-01 |  500 | 1200 |
    +----------|------------|------|------+

Với mỗi row `window function` sẽ chỉ có thể nhìn thấy những row nằm trong `partition` tương
ứng với row hiện tại. Cho tới hiện tại thì bạn chắc cũng đã hiểu sơ qua về `window function`,
nhưng có thể bạn sẽ nghĩ trong đầu rằng: "Như vậy thì nó có gì hơn so với `aggregate function`?".


## Enter Window frame

    /* cumulative sale of each employee */
    SELECT employee, sale, date,
      SUM(sale) OVER (
        ORDER BY date ROWS
        BETWEEN UNBOUNDED PRECEDING
        AND CURRENT ROW
      ) AS cum_sales
    FROM sales;
    +----------|------|------------|-----------+
    | employee | sale | date       | cum_sales |
    +----------|------|------------|-----------+
    | odin     |  200 | 2017-03-01 |       200 |
    | odin     |  300 | 2017-04-01 |       500 |
    | odin     |  400 | 2017-05-01 |       900 |
    | thor     |  400 | 2017-03-01 |       400 |
    | thor     |  300 | 2017-04-01 |       700 |
    | thor     |  500 | 2017-05-01 |      1200 |
    +----------|------|------------|-----------+

`window frame` cho phép bạn gọi `window function` trên 1 khoảng range thay vì tất cả các row trong partition.
Nó có thể đc viết dưới dạng `ORDER BY sth frame_unit frame_start` hoặc `ORDER BY sth frame_unit BETWEEN frame_start AND frame_end`
với `frame_unit` bằng `ROWS` (row thực tế) hoặc `RANGE` (row logic - 1 row là 1 giá trị ví dụ 100 200 200 thì có 2 row)
còn `frame_start` và `frame_end` có thể là `CURRENT ROW` (row hiện tại), `UNBOUNDED PRECEDING` (tất cả row trước),
`UNBOUNDED FOLLOWING` (tất cả row sau), `n PRECEDING` (n row trước), `n FOLLOWING` (n row sau).

**Chú ý**: bắt buộc phải kèm theo `ORDER BY` khi dùng window frame nếu không SQL ko có cách nào biết row nào trước,
row nào sau để tạo ra frame.


# Applications - Bài viết này giúp tôi tăng lương như thế nào?

Mình sẽ giới thiệu một số `window function` thông dụng, hi vọng có thể giúp bạn đọc áp dụng để tăng lương laughing:


## ROW_NUMBER

Đúng như tên gọi hàm này cho phép bạn đánh số thứ tự của row dựa trên order của partition. Ngoài dùng
hàm này ra thì chả có cách nào để thực hiện việc này cho nó chắc đc cả, bạn có thể đọc bài **Row numbering ranking and
how to use less user variables** ở dưới References để hiểu rõ hơn về vấn để này.

    SELECT ROW_NUMBER() OVER (ORDER BY birthdate) AS num, name, birthdate
    FROM people;
    
    +--------|------------------|------------+
    | num    | name             | birthdate  |
    +--------|------------------|------------+
    |      1 | Georges Danton   | 1759-10-26 |
    |      2 | Herbert G Wells  | 1759-10-26 |
    |      3 | Jimmy Hendrix    | 1942-11-27 |
    |      4 | Angela Merkel    | 1954-07-17 |
    |      5 | Rigoberta Menchu | 1959-01-09 |
    |      6 | Tracy Chapman    | 1964-03-30 |
    +--------|------------------|------------+


## RANK() và DENSE_RANK()

`RANK` khá là tương tự như `ROW_NUMBER` nhưng trong khi `ROW_NUMBER` sẽ luôn trả về STT của row mặc kệ giá trị của row,
thì `RANK` sẽ trả về cùng 1 rank nếu giá trị của row bằng nhau. `DENSE_RANK` thì giống `RANK` nhưng nếu với `RANK`
nếu có 2 row cùng 1 rank 3 thì rank tiếp theo sẽ là rank 5, còn với `DENSE_RANK` thì là rank 4

    SELECT RANK() OVER (ORDER BY birthdate) AS num, name, birthdate
    FROM people;
    
    +--------|------------------|------------+
    | num    | name             | birthdate  |
    +--------|------------------|------------+
    |      1 | Georges Danton   | 1759-10-26 |
    |      1 | Herbert G Wells  | 1759-10-26 |
    |      3 | Jimmy Hendrix    | 1942-11-27 |
    +--------|------------------|------------+
    
    SELECT DENSE_RANK() OVER (ORDER BY birthdate) AS num, name, birthdate
    FROM people;
    
    +--------|------------------|------------+
    | num    | name             | birthdate  |
    +--------|------------------|------------+
    |      1 | Georges Danton   | 1759-10-26 |
    |      1 | Herbert G Wells  | 1759-10-26 |
    |      2 | Jimmy Hendrix    | 1942-11-27 |
    +--------|------------------|------------+


## LAG và LEAD

`LAG` và `LEAD` cho phép việc đọc dữ liệu của row trước (LAG) hoặc sau (LEAD). 2 hàm này cực kì hữu dụng để so sánh
row với nhau. VD: Tính thay đổi sale của từng nhân viên theo ngày.

    SELECT employee, sale, date,
    sale - COALESCE(LAG(sale, 1), sale) OVER (PARTITION BY employee ORDER BY date) AS diff_sale
    FROM sales ORDER BY employee;
    
    +----------|------|------------|-----------+
    | employee | sale | date       | diff_sale |
    +----------|------|------------|-----------+
    | odin     |  200 | 2017-03-01 |         0 |
    | odin     |  300 | 2017-04-01 |       100 |
    | odin     |  400 | 2017-05-01 |       100 |
    | thor     |  400 | 2017-03-01 |         0 |
    | thor     |  300 | 2017-04-01 |      -100 |
    | thor     |  500 | 2017-05-01 |       200 |
    +----------|------|------------|-----------+


## Movable window frames

Một trong những ứng dụng thường gặp nhất của `window function` chính là để tạo [moving average](https://en.wikipedia.org/wiki/Moving_average) thường gặp trong các
biểu đồ tài chính.

    SELECT MONTH(date), SUM(sale),
    AVG(SUM(sale)) OVER (ORDER BY MONTH(date)
    RANGE BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS sliding_avg
    FROM sales GROUP BY MONTH(date);
    
    +-------------|-----------|-------------+
    | month(date) | SUM(sale) | sliding_avg |
    +-------------|-----------|-------------+
    |           3 |       600 |    600.0000 |
    |           4 |       600 |    700.0000 |
    |           5 |       900 |    700.0000 |
    |           6 |       600 |    900.0000 |
    |           7 |      1200 |    683.3333 |
    |           8 |       250 |    725.0000 |
    +-------------|-----------|-------------+


# References

-   <https://community.modeanalytics.com/sql/tutorial/sql-window-functions/>
-   <https://mysqlserverteam.com/row-numbering-ranking-how-to-use-less-user-variables-in-mysql-queries/>
-   <https://www.postgresql.org/docs/9.1/static/tutorial-window.html>
-   <http://mysqlserverteam.com/mysql-8-0-2-introducing-window-functions/>