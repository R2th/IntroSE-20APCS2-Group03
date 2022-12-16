Chào các bạn, trong bài viết hôm nay mình xin nói về một chủ đề không hề mới mẻ mà chắc hẳn hầu hết mọi người đã từng nghe hoặc được học ở trường, đó là SQL. Có thể chủ đề này quá cũ nhưng phải nhắc lại là sau một vài năm ra trường đi làm, với sự phát triển và ra đời của rất nhiều framework, ví dụ PHP Laravel bằng sự hộ trợ nhiệt tình của query Buider, Eloquent thì gần như chúng ta không còn phải tự viết các câu query như trước nữa, và rõ ràng dần dần nó làm chúng ta bị quên đi sức mạnh vốn có của query thuần. Dù cho query Buider hay Eloquent có chạy chậm hơn query thuần đi chăng nữa thì chúng ta vẫn chấp nhận vì nó tiện và tiện. 
![](https://images.viblo.asia/0b8c7181-b3b3-40bb-b39a-c9382cdf9e10.jpg)

Thì rõ ràng là nó `tiện` thật. Mình đã có may mắn được làm việc trong một vài dự án đủ lớn và đủ già (vài năm tuổi) , số lượng records hàng chục triệu, và khi thực hiện tối ưu lại vì quá chậm, mọi người đều chọn cách viêt Raw SQL. Rõ ràng chúng ta chỉ thực sự nhận ra sự chậm chạp của query Buider và Eloquent so với Raw query (query thuần) khi mà lượng dữ liệu đã phình quá lớn. Dưới đây là biểu đồ so sánh thời gian trung bình thực thi query của Query Buider và Raw Sql khi số lượng record tăng lên trong việc insert và update dữ liệu.

![](https://images.viblo.asia/546d1baf-1a17-4710-bb00-ece0e23fe20c.PNG)

![](https://images.viblo.asia/9c1f7532-9a88-404b-88ae-cccab76f1f1d.PNG)

Bằng việc so sánh trên, chúng ta càng nhận thấy rằng việc củng cố kiến thức về SQL không hề thừa mà thậm chí chúng ta cần tự nhìn nhận tương lại của một dự án để lựa chọn cách viết query một cách hợp lý ngay từ ban đầu nếu không sau một thời gian lượng data trở lên quá lớn có thể chúng ta sẽ cần đập đi xây lại là điều không thể tránh khỏi.

Dưới đây là một số kỹ thuật chúng ta thường hay không để ý hoặc quên áp dụng khi thực hiện viết query.
# Thứ tự thực hiện các mệnh đề trong một câu query
Hầu như chúng ta đã đều có kiến thức nền tảng về `SQL` như ý nghĩa của các mệnh đề `Select, from, where, join ...` Tuy nhiên với nhiều người thứ tự thực hiện của chúng như nào thì vẫn còn mơ hồ và đôi khi chỉ là lắp ghép sao cho câu query có thể chạy được.

| # | Mệnh đề | Ý nghĩ |
| -------- | -------- | -------- |
|   1     | From và join     | Chỉ định nơi (table) mà chúng ta cần query dữ liệu     |
|   2     | Where              |Lọc theo từng row trong tập hợp dữ liệu đã chỉ định từ From hoặc join |
|   3     |Group By         | Tổng hợp dữ liệu theo cột nào đó     |
|   4     | Having            |Lọc dữ liệu đã được `group by` ở trên|
|   5     |Select               |Lựa chọn những dữ liệu nào cần lấy|
|   6     |Distinct            |Trong tất cả dữ liệu đã `select` những dữ liệu trùng lặp sẽ bị loại bỏ|
|    6    |Order By        | Sắp xếp các dữ liệu đã `select` theo một thứ tự mong muốn|
|     7   |Limit              |Giới hạn số lượng record|

Nhìn vào bảng trên và so sánh với câu query chúng ta thường viết `select * from table where ...` Thứ tự mà database thực hiện lại không như chúng ta đã viết, Hoặc để sử dụng `HAVING` chúng ta phải `Group by` dữ liệu trước vì having sẽ trả về dữ liệu đã được grouped.

# SQL Index
`Index` là con trỏ tới dữ liệu trong một bảng, nó được sử dụng như việc chúng ta sử dụng mục lục trong một cuốn sách vậy. `Index` giúp cho `Database Search Engine` tăng nhanh thời gian truy vấn dữ liệu hơn. Việc đánh index đơn giản là việc sắp xếp các bản ghi theo một thứ tự nào đó cho dễ tìm kiếm.
Dưới đây là ví dụ cho một table không được đánh index cho cột company_id, việc tìm kiếm sẽ tuần tự từ trên xuống dưới để trả về những record nào có company_id = 18.

![](https://images.viblo.asia/6d8ab41e-ee31-4bf6-a2ff-1972b2256cf5.png)

Còn khi được đánh index, các record sẽ được sắp xếp lại, khi query đến record có company_id = 20, quá trình tìm kiếm sẽ kết thúc vì biết rằng sau đó không còn giá trị company_id = 18 nào nữa.
Một số câu lệnh trong việc thao tác với `index`
### Tạo Index
```
CREATE INDEX ten_chi_muc ON ten_bang;
``` 

## Tạo Unique index
```
CREATE UNIQUE INDEX index_name
ON table_name (column1, column2, ...);
```

### Tạo Index cho một cột trong bảng
```
CREATE INDEX ten_chi_muc ON ten_bang (ten_cot);
```

### Index cho 2 hoặc nhiều cột trong bảng
```
CREATE INDEX ten_chi_muc on ten_bang (cot1, cot2);
```

### Xóa Index
```
DROP INDEX ten_chi_muc;
```

## Khi nào tránh sử dụng Index
* Tuy `Index` giúp cho việc query (select) dữ liệu nhanh hơn nhưng lại làm giảm hiệu năng của các lệnh `Insert` hoặc `Update` dữ liệu vì khi isert trong một table đã được đánh index, database phải tìm kiếm vị trí để đặt record mới, còn trong trường hợp chưa đánh Index, dữ liệu chỉ cần thêm vào bất kì vị trí trống nào.
* Với những bảng nhỏ và ít dữ liệu việc đánh index là không cần thiết
* Các chỉ mục không nên được sử dụng trên các cột mà chứa một số lượng lớn giá trị NULL.
# SQL View
Một kỹ thuật khi thao tác với database rất hữu ích đó là `View` table, `view` là một table ảo, là nơi lưu trữ dữ liệu là kết quả của một câu query. Một `view` chứa các hàng và cột giống như một table thực sự.
Một khi dữ liệu trong các bảng được cập nhật, dữ liệu trong view sẽ tự động update giúp chúng ta thuận tiện trong việc truy vấn để lấy kết quả mong muốn.
### Tạo một view 
```
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

Sau khi đã có bảng view tên là `view_name` chúng ta hoàn toàn có thể sử dụng query như bình thường để lấy dữ liệu từ bảng này.

### Update một view
Chúng ta hoàn toàn có thể thêm fields cho view, hoặc edit lại kết quả mong muốn trong view.
```
CREATE OR REPLACE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```
### Drop view
Khi không sử dụng, chúng ta cũng hoàn toàn có thể drop một view rất đơn giản.
```
DROP VIEW view_name;
```
Ví dụ về trường hợp sử dụng `view`: Ví dụ chúng ta cần phải report hàng tuần, dữ liệu của report được lấy tổng hợp từ nhiều bảng trong database, có rất nhiều cách để thực hiện
Cách 1: Hàng tuần vào đúng thời gian mong muốn, chúng ta chạy 1 query , join các bảng và lấy dữ liệu report ra luốn
Cách 2: Mỗi khi có sự thay đổi trong các bảng, dữ liệu sẽ được tổng hợp và lưu vào bảng `view` chúng ta chỉ cần query từ bảng đó và report.
Rõ ràng với cách thứ 2 sẽ hoạt động tốt trong trường hợp dữ liệu của chúng ta khá lớn, mỗi lần report sẽ không phải mất thời gian đợi query trả về kết quả mà chỉ cần lấy từ bảng `view`.
# Kết luận
Trên đây là lý do và một số kiến thức SQL quan trọng mà chúng ta thường xuyên bỏ qua trong quá trình làm việc, hy vọng sẽ giúp ích được các bạn trong quá trình tối ưu lại source code, có thể trong quá trình làm việc chúng ta mong muốn sự tiện lợi nhưng vẫn cần xem xét tương lai lâu dài và những vấn đề có thể gặp phải của project. Cảm ơn các bạn đã đón đọc .

# Tham khảo
https://vietjack.com/index.jsp

http://www.sqlviet.com/blog/

https://www.w3schools.com/