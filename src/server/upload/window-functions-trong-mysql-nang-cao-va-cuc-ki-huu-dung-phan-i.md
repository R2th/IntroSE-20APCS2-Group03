Chào mọi người, mình mới tìm hiểu đc topic `Window Functions` cá nhân mình cảm thấy khá là hay và mình đánh giá nó là phần nâng cao. Vì ít người biết nên `Window Functions` thấy rất ít khi sử dụng, thay vì đó là những câu subquery **dài dằng dặc như tin nhắn nhắn cho crush**, và người khác đọc hiểu được câu query đó ngắn như câu trả lời của crush **"Ừ"**.
Nay mình sẽ giới thiệu cho mọi người biết `Window Functions` là gì, ứng dụng những bài toán nào.

## I. Window Functions là gì?
Mysql hỗ trợ window functions, tức là đối với mỗi hàng từ câu truy vấn, thực hiện phép tính bằng cách sử sụng các hàng liên quan đến hàng đó. 
Hầu hết các `Aggregate Functions`(các hàm chúng ta vẫn hay sử dụng như COUNT, SUM, MAX, MIN, . . .) cũng có thể sử dụng như các `Window Functions`khi kết hợp với `OVER()`
Hừm... vẫn hơi khó hiểu nhỉ, đi vào 1 ví dụ đơn giản để hình dung mặt mũi của `Window Functions` như thế nào nhé. 

Giả sử có 1 table `products`:

![](https://images.viblo.asia/dd29dd41-05f8-4dd9-912d-a2448367e76e.png)

Sử dụng `Aggregate Functions` - SUM như thông thường, để lấy ra tổng số lượng sản phẩm trong kho theo từng `category`
```python
(Query1)
--------
select category, sum(quantity_warehouse) as total_warehouse
from products
group by category
```
![](https://images.viblo.asia/1a65cdaf-ca20-4777-badf-d0f5507dee88.png)

Nhưng nếu tôi muốn lấy chi tiết các sản phẩm kèm theo tổng số lượng sản phẩm trong kho theo từng `category` thì sao. Bình thường thì có phải chúng ta sẽ làm một subquery rồi join là xong đúng không? 
```python
(Query2)
--------
select p.*, tmp.total_warehouse
from products as p
join (
	select category, sum(quantity_warehouse) as total_warehouse
    from products
    group by category
) as tmp on p.category = tmp.category
order by category
```
Khá dài dòng, nhưng thử nếu sử dụng **`Window Functions`** xem như thế nào nhé.
```python
(Query3)
--------
select *, sum(quantity_warehouse) over(partition by category) as total_warehouse
from products
```
![](https://images.viblo.asia/afb44fbe-3928-4d2e-bf33-27589c2ea53a.png)

> Nếu bạn để ý thì sẽ thấy Query1 và Query3 chỉ khác nhau OVER() - nó là gì thì các bạn cứ bình tĩnh nhé.
> Nhưng chính nó giúp MYSQL phân biệt `Window functions` và `Aggregate Functions`, 
> nó sẽ tạo ra  cửa sổ làm việc(window) bao gồm các hàng liên quan đến nó dựa vào `partititon`  để SUM.

Cả 2 cách sẽ cho cùng 1 kết quả, nhưng bạn thấy đấy sử dụng `Window Functions` tiện gọn hơn đúng không. Nếu bạn hiểu đc ý nghĩa và cách dùng của `Window Function` thì tôi cá là các bạn sẽ chọn nó thay vì viết `subquery` dài như cái bơm.

**Chú ý: MySQL hiện chỉ hỗ trợ sử dụng Window Functions từ version 8.0**

## II. Phân tích thành phần Window Functions
Một Window Function được định nghĩa khi có mệnh đề `OVER()` đi kèm sau lệnh gọi hàm.
```python
OVER([partition_clause] [order_clause] [frame_clause])
ví dụ: 
OVER (
	PARTITION BY category 
    ORDER BY id 
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
)
```
- partiiton_clause: Đối với `Aggregate Functions` khi muốn nhóm các row liên quan lại với nhau thì chúng ta sử dụng **GROUP BY**, thì ở `Window Functions` cũng có, đó chính là **PARTITION BY** , partition sẽ nhóm các rows liên quan đến *row hiện tại* thành 1 cửa sổ làm việc(window) để thực hiện tính toán. Như ví dụ ở Query3 mình có sử dụng **[partition by  category]**
- order_clause: cũng giống như ORDER BY bình thường, sắp xếp các rows trong cửa sổ làm việc
- frame_clouse: sử dụng trong trường hợp bạn muốn giới hạn các rows trong partition --> **Window Frame**

	```python
    frame_clause:
        frame_units frame_extent

    frame_units:
        {ROWS | RANGE}
    - ROWS: Giá trị chênh lệch là sự khác biệt về số hàng so với số hàng hiện tại.
    - RANGE: Giá trị chênh lệch là sự khác biệt về giá trị hàng so với giá trị hàng hiện tại.

    frame_extent:
        {frame_start | frame_between}
    frame_between:
        BETWEEN frame_start AND frame_end
    frame_start, frame_end: {
        CURRENT ROW
      | UNBOUNDED PRECEDING
      | UNBOUNDED FOLLOWING
      | expr PRECEDING
      | expr FOLLOWING
    }

	- CURRENT ROW: row hiện tại
	- UNBOUNDED PRECEDING: tất cả các row trước, tính cả row hiện tại
	- UNBOUNDED FOLLOWING: tất cả các row sau, tính cả row hiện tại
	- expr PRECEDING|FOLLOWING : expr row trước|sau, tính cả row hiện tại
    ```

>  Chú ý: khi đã sử dụng frame_clouse thì bắt buộc phải sử dụng order_clause nếu không 
>  MYSQL sẽ không biết vị trị thứ tự các row để tạo ra Frame

Trường hợp OVER empty thì sao: OVER( ) --> toàn bộ dữ liệu của bảng được coi là 1 khối - window
Đoạn này mình tìm hiểu mất khá nhiều thời gian để hiểu được cách hoạt động của nó. Nên mình sẽ demo 1 ví dụ cho mọi người dễ nắm bắt. Chi tiết thì mọi người có thể xem doc  [tại đây](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html).
```python
select *, 
  sum(quantity_warehouse) OVER(
      ORDER BY quantity_warehouse DESC
      ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING
  ) as total
from products
```
![](https://images.viblo.asia/db1f45f4-1114-4dff-b9e1-7b2ea50943f3.png)


 Tại column `total`, mỗi row kết quả sẽ là tổng của row hiện tại, 2 rows trc đó và 2 row sau đó. 
 Ngược lại, nếu thay `ROWS` bằng `RANGE` thì mỗi row kết quả sẽ là  tổng của row hiện tại với tất cả các rows có quantity_warehouse +/- 2
 ```python
select *, 
  sum(quantity_warehouse) OVER(
      ORDER BY quantity_warehouse DESC
      RANGE BETWEEN 2 PRECEDING AND 2 FOLLOWING
  ) as total
from products
```
![](https://images.viblo.asia/ebae2bfe-3e28-4ebe-b516-8732b87d7189.png)


## III. Một số Window Functions nâng cao và cực kì hữu ích.
Function name|Description |
--- | --- 
|cume_dist()| (Số bản ghi trong  window <= hàng hiện tại) / tổng bản ghi|
|dense_rank()|Xếp rank của hàng hiện tại, không có khoảng trống|
|rank()|Xếp rank của hàng hiện tại trong window dựa vào order by, có khoảng trống|
|row_number()|Đánh số thứ tự trong window|
|first_value(expr)|Lấy giá trị đầu trong window|
|last_value(expr)|Lấy giá trị cuối trong window|
|nth_value(expr, n)|Lấy giá trị n trong window|
|lag(exp, n, default)|Lấy giá trị trước đó n đơn vị (n, default: option nullable) |
|lead(exp, n, default)|Lấy giá trị sau đó n đơn vị (n, default: option nullable)|
|ntile()|Chia window ra làm n group --> trả về số thự tự group |
|percent_rank()|(rank - 1) / (rows - 1) |
<br>

**Nhắc lại**: partiiton_clause nhóm các rows liên quan đến **row hiện tại** thành 1 khối - cửa sổ làm việc(window).
Ngoài ra còn có các  `Aggregate Functions` khi kết hợp sử dụng với OVER().
Để tìm hiểu chi tiết các thức hoạt động của `Window Functions` hẹn các bạn ở bài viết phần II nha (Sớm thôi ^^). 
<br>
Phần sau chỉ có thực hành thôi nha, nên mọi người cố nắm vững kiến thức để không bị ăn hành phần sau nha, phần sau mình sẽ có cả 1 số 
bài toán cực gắt, giải được sau đi phỏng vấn x10 lương =)))
Chờ nhé!...
<br>
[Window Functions trong MySQL, Nâng cao và cực kì hữu dụng (Phần II)](https://viblo.asia/p/window-functions-trong-mysql-nang-cao-va-cuc-ki-huu-dung-phan-ii-QpmleNGD5rd)
<br>
Cám ơn mọi người đã theo dõi bài viết của mình! Chúc mọi người một ngày làm việc vui vẻ!.
### Tài liệu liên quan
[https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html).

[https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).

[https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html).