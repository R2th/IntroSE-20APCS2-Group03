Mảng đóng vai trò quan trọng trong **PostgreSQL**. Chúng đặc biệt hữu ích trong việc xây dựng các hàm **aggregate**, hình thành các mệnh đề **IN** và **ANY**.  Trong **PostgreSQL**, mọi loại dữ liệu đều có một mảng theo  kiểu. Nếu bạn xác định kiểu dữ liệu của riêng mình, **PostgreQuery** sẽ tạo một mảng tương ứng cho kiểu của bạn .Ví dụ: **integer** có kiểu mảng interger là  **integer[]**, **character** có kiểu mảng **character** là **character[]** .  Bài viết dưới sẽ hướng dẫn bạn cách thao tác với **array** và các hàm thông dụng được **postgresSql** sử dụng thao tác với **array**.

# Array Constructors

Cách đơn giản nhất để tạo một mảng là sử dụng **ARRAY[]** và chỉ định các phần tử muốn tạo như câu lệnh dưới.

`SELECT ARRAY[2019, 2020, 2021] As yrs;`

Câu lệnh phía trên sẽ tạo một mảng **integer** với 3 phần tử :  2019, 2020 và 2021. 

Kết quả : ![](https://images.viblo.asia/2d18596d-6ade-4247-a60b-2868fa96377c.PNG)

Nếu các phần tử của mảng có thể trích xuất từ một câu lệnh  truy vấn,  chúng ta có thể sử dụng hàm array() để thao tác và tạo một mảng từ đó :

```
SELECT array(
SELECT DISTINCT date_part('year', backend_start)
FROM pg_stat_activity
ORDER BY date_part('year', backend_start)
);
```

Câu lệnh trên sử dụng hàm **date_part** để lấy giá trị year từ cột backend_start, kết quả trả về  được sử dụng trong mệnh đề SELECT **array()** để tạo ra một mảng:

![](https://images.viblo.asia/60308d2d-3750-4e53-b7c9-1c68eb1e6b5c.PNG)

Chúng ta có thể **cast** một kiểu chuổi biểu diễn  mảng thành mảng với câu lệnh phía dưới :

`SELECT '{Alex,Sonia}'::text[] As name, '{46,43}'::smallint[] As age;`

Kết quả: 
![](https://images.viblo.asia/28250992-5ec9-4e49-8b8e-fe2108f62442.PNG)

Ngoài ra chúng ta  có thể chuyển đổi các chuỗi được phân tách thành một mảng bằng hàm **string_to_array**

`SELECT string_to_array('CA.MA.TX', '.') As estados;`

Kết quả :
![](https://images.viblo.asia/3cc2426e-f1ae-44dc-a4ae-393ab792a6fa.PNG) 

**Array_agg** là một hàm tổng hợp có thể lấy một tập hợp bất kỳ kiểu dữ liệu nào và chuyển đổi nó thành một mảng. 

```
SELECT array_agg(backend_start ORDER BY backend_start) As arr
FROM pg_stat_activity
WHERE backend_start BETWEEN '2019-01-01'::timestamptz AND '2019-07-21'::timestamptz;
```

Kết quả
`{"2019-07-20 04:25:06.045042+00","2019-07-20 04:25:06.045574+00"}`

**PostgreQuery 9.5** giới thiệu  **array_agg** function hỗ trợ cho mảng.  Trong các phiên bản trước nếu bạn muốn tổng hợp các hàng của mảng với **Array_agg**, bạn sẽ gặp lỗi.
**array_agg**  giúp việc xây dựng các mảng đa chiều dễ dàng hơn nhiều từ mảng một chiều
Example : 

```
SELECT array_agg(f.t)
FROM ( VALUES ('{Alex,Sonia}'::text[]),
('{46,43}'::text[] ) ) As f(t);
```

![](https://images.viblo.asia/29202a9e-0028-496c-9362-f4c69749d924.PNG)

Để sử dụng **array_agg** trong ví dụ trên , chúng phải có cùng kiểu dữ liệu và cùng số lượng. Để thực hiện điều đó, chúng ta thực hiện cast **ages** sang kiểu **text**.  Chúng ta cũng có cùng
số lượng các mục trong mảng được tổng hợp: two people và two age. Mảng với cùng một số phần tử được gọi là mảng cân bằng ( balanced arrays).

# Unnesting Arrays to Rows

Một hàm phổ biến được sử dụng với mảng là unnest, cho phép bạn trích xuất các phần tử của mảng thành một tập hợp các hàng(row).

`SELECT unnest('{A,B,C}'::char(3)[]) As list;`

![](https://images.viblo.asia/e618d884-6699-4341-b2ca-2722deb48749.PNG)

Mặc dù chúng ta có thể thêm nhiều unnest  vào một mệnh đề SELECT, nếu số lượng kết quả các hàng từ mỗi mảng không cân bằng, bạn có thể nhận được một số kết quả không mong muốn. 

Vi dụ với nhiều unnest trong một mệnh đề select : 

```
SELECT
unnest('{three,blind,mice}'::text[]) As t,
unnest('{1,2,3}'::smallint[]) As i;
```

Kết quả :

![](https://images.viblo.asia/9836c782-70a9-4bab-99df-063e168e94cb.PNG)

Nếu chúng ta bỏ phần tử **three** ở mệnh đề unnest thứ nhất, chúng ta sẽ nhận được một kết quả không mong muốn : 

```
    v |i
------+-
blind |1
mouse |2
blind |3
mouse |1
blind |2
mouse |3
```

Đến phiên bản **PostgreSql 9.4**, nếu 2 mảng trong cả 2 mệnh đề unnest không cân bằng(không bằng nhau về số lượng), PostgresSql sẽ thay thế giá trị bị thiếu bằng giá trị null.
Sử dụng lại ví dụ trên, nếu  chúng ta bỏ phần tử **three** ở mệnh đề unnest thứ nhất, kết quả sẽ là :

![](https://images.viblo.asia/bded1b9a-bc34-4a59-8096-87220636afd2.PNG)

# Cắt mảng và nối mảng

 PostgreSQL cũng hỗ trợ cắt mảng bằng cú pháp **start: end**.  PostgresSql sẽ trả về một mảng mới từ một mảng đã cho.

Ví dụ :

`select (array[1,2,3,4,5,6])[2:5];`

Kết quả :
`{2,3,4,5}`

Để thực hiện nối 2 mảng lại với nhau, sử dụng toán tử ||

```
select (array[1,2,3,4,5,6])[2:5] || (array[1,2,3,4,5,6]) [0:1]
```

Kết quả :
`{2,3,4,5,1}`

Ngoài ra có thể thực hiện thêm một số phần tử vào một mảng đã có sẵn bằng toán tử || : 

`SELECT '{1,2,3}'::integer[] || 4 || 5;`

Kết quả :
`{1,2,3,4,5}`

# Kiểm tra các phần tử trong mảng.
**PostgreSQL** có một số toán tử để làm việc với dữ liệu mảng. Chúng ta đã sử dụng toán tử (||) để kết hợp nhiều mảng thành một hoặc thêm một phần tử vào một mảng. Ngoài ra PostgresSql còn hỗ trợ nhiều toán tử thao tác với mảng : =, <>, <, >, @>, <@, và  && . Các toán tử này có đặc điểm chung là yêu cầu cùng kiểu dữ liệu.

Toán tử **&&** trả về true nếu có bất cứ toán tử nào chung trong 2 mảng.

Ví dụ :
`SELECT ARRAY[1,4,3] && ARRAY[2,1];`

Kết quả :
![](https://images.viblo.asia/79ffb9b6-1dde-4a03-bca5-c91ef4acc6e0.PNG)

Toán tử  (=) chỉ trả về true nếu các phần tử trong tất cả các mảng bằng nhau và theo thứ tự tương tự. Nếu bạn không quan tâm đến thứ tự , chỉ cần biết tất cả các phần tử trong một mảng xuất hiện dưới dạng tập hợp con của mảng khác, hãy sử dụng toán tử (@>, <@).

Ví dụ:
`SELECT '{1,2,3}'::int[] @> '{3,2}'::int[] AS contains;`

Kết quả:
![](https://images.viblo.asia/c441ab95-7630-495b-9a8e-191480cd80ad.PNG)


# Kết luận
Mảng đóng một vai trò cực kì quan trọng trong PostgresSql, giúp chúng ta có thể dễ dàng xây dựng các hàm, tính toán và lưu trữ. Hy vọng qua bài viết có thể giúp mọi người hiểu biết thêm về mảng trong PostgresSql.

# Tài liệu tham khảo
https://www.postgresql.org/docs/9.1/arrays.html