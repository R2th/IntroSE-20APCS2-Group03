Để giải quyết câu hỏi ở phần title, thật ra, đối với các bạn mới ra trường, thì dễ dàng phát ngôn rằng câu query với phép JOIN sẽ nhanh hơn, bởi vì JOIN được hỗ trợ bởi INDEX. Trong khi index là một kỹ thuật được nhắc đến với câu nói hoa mỹ là "**giúp tăng tốc độ truy vấn dữ liệu**".<br><br>

*Vậy có thật, trong mọi trường hợp, Join luôn nhanh hơn Subquery không? Nếu thế, vậy Subquery không thể có "đất dụng võ" sao?*


Để giải quyết các thắc mắc trên, chúng ta thử đi qua bài toán bên dưới.


## Ngoài lề
Trước khi đi qua các bài toán, mình xin giới thiệu lại một số kiến thức về kỹ thuật Index mà chúng ta có lẽ đã quên thì cố gắng nhớ lại:
Index là cấu trúc dữ liệu hỗ trợ việc truy xuất dữ liệu, tăng hiệu quả tìm kiếm dữ liệu
Khi tạo index nó chả ảnh hưởng gì đến các bảng cả, mà nó tạo hẳn ra 1 cấu trúc dữ liệu riêng và trỏ đến bảng
Tại sao nhanh hơn? đơn giản khi đánh index dữ liệu sẽ được sắp xếp, việc tìm kiếm trong 1 tập dữ liệu đã được sắp xếp đương nhiên nhanh rồi :D<br><br>

Các trường hợp như table nào hay thực hiện các lệnh insert, update, delete thì không nên đánh index vì cấu trúc index là cây B-tree khi thêm 1 phần tử hay xóa bỏ đi thì phải cập nhât lại toàn bộ cây kiểu như sắp xếp lại => chậm<br>
(Mình xin nói sơ qua 1 tý về hình thù cái vây B-tree) nó gồm có root node, branch node, leaf node trong đó các leaf node sẽ liên kết với nhau bằng danh sách liên kết đôi. Như vậy, trong cấu trúc của index sử dụng 2 cấu trúc dữ liệu là danh sách liên kết đôi và cây tìm kiếm.<br>Còn cơ chế nó tìm giá trị thế nào thì Bác Google nhé.<br><br>
Index cũng được lưu trữ như data nên nó cũng được lưu trữ trên ổ đĩa(disk) nhé.<br>
Index được lưu trữ trên khác khối khác nhau trên disk, yêu cầu nhiều thao tác di chuyển đầu đọc trên đĩa cứng<br>
table scan là đọc liên tục.

Chúng ta qua ví dụ về Index:
```
Ta có table Employee(id,name,dept)

Và có 2 bài toán như sau:
Bài tập 1:
* 30 nhân viên trên 1 page
* có 50 phòng ban, mỗi nhân viên thuộc 1 phòng ban

Bài tập 2:
* 30 nhân viên trên 1 page
* 5000 phòng ban, mỗi nhân viên thuộc 1 phòng ban

Và ta có câu query như sau:
Select * from Employee Where dept="IT"
```
=> Ta đánh index cho trường dept.<br>
Dễ thấy bài toán 1 phải di chuyển đầu đọc nhiều => chậm hơn so với việc table scan<br>
Giả sử mỗi 1 page có 1 thằng dept="IT" di chuyển đầu đọc qua tất cả các page đương nhiên chậm rồi.<br>
Ngược lại bài toán 2, table scan sẽ chậm hơn vì dữ liệu phòng ban giờ tăng lên rất nhiều.<br>
Tùy bài toán nên hay không nên đánh index, cơ bản đây là những gì tìm hiểu, còn đi vào sâu việc cơ chế lưu trữ với duyệt đầu đọc thì đọc thêm.

## 1. Bài toán 1
Giả sử mình có 2 table A và B có các column như sau:
```
A(col_a1, col_a2, col_a3)
B(col_b1, col_b2, col_a1)

A và B quan hệ nhau qua col_a1. 
Giả lập là có đánh index cho field col_a1 ở 2 table nhé

Câu hỏi của bài này là: Tìm các giá trị ở bảng A không có trong B
```

Giải pháp đề xuất:
```sql
// Câu SQL 1 - dùng sub query, bình thường sẽ viết như sau: 
Select *
    from A
    where col_a1 not in (Select col_a1 from B)


// Câu SQL 2: Sử dụng join
Select A.*
    from A
    left join B on B.col_a1=A.col_a1
    where B.col_a1 is null 
```
**Chúng ta cùng phân tích bài toán:** => Kết luận:
* *Luồng xử lý của câu truy vấn thứ nhất*<br>
Đầu tiên nó sẽ chạy sub query trước, tức là nó sẽ SELECT ra tất cả col_a1 từ tabel B.<br>
Sau đó, chạy lần lượt các eow trong table A, lấy ta A.col_a1 nếu như A.col_a1 không nằm trong những giá trị trả về của col_a1 từ table B

Vậy: sử dụng NOT IN, thì INDEX dẽ không hoạt động, cho dùng có đánh indexn trên cột col_a1. vì sử dụng mệnh đề NOT, nên SQL không thể biết nó có thỏa mãn hay không nên phải đi so sánh từng giá trong NOT IN (). Việc này giống như duyệt lần lượt các row trong table á, => **phá hủy lợi ích index, vì có dùng dc mô...nên data càng lớn thì tỉ  lệ thuận là truy vấn càng lâu**...


* *Luồng xử lý của câu truy vấn thứ hai*<br>
Đầu tiên, LEFT JOIN 2 table (đánh index cho col_a1 sẽ nhanh hơn các field khác á...vì primarikkey _PK _ khóa chính)

Sau đó, lấy ta những dòng KHÔNG NULL.
Khi đánh index cho 1 cột, ở đây dùng INDEX cho B.col_a1 phép so sánh IS NOT NULL cũng không thể sử dụng được INDEX. Do đó nó phải tìm qua tất cả các giá trị trong bảng, xem có NULL hay không. Điều này cũng tạo ra 1 table scan. Khi sử dụng được index, thì thay thế cho table scan sẽ là index seek. => Nghĩ thì có lợi mà nhìn lại thì hại nhiều hơn cái SQL 1 nữa.. (sad)

**NOTE 1:**
* INDEX kiểu như một cây nhị phân, trên đó các nút đều có giá trị => SQL không thể xếp được giá trị NULL ở đâu, vì so sánh với NULL là vô nghĩa nhé...
* Khi sử dụng Join, ( ẩn chứa 1 phép tìm kiếm bên trong ), đánh index cho khóa chính và khóa ngoại khi JOIN là giúp tăng tốc độ truy vấn...

**=> Kết luận:**
Cứ nghĩ là giải pháp 2 đã ngon cơm rồi, nhưng mà nó lại ăn hại hơn giải pháp 1 nữa! Vậy mình phải làm sao, chọn 1 hay 2...!?

## 2. Giải pháp cho Bài toán 1
Đối với mình, mình sẽ chọn câu truy vấn với subquery, vì ít nhất, subquery với bài toán này sẽ nhanh hơn join.
```sql
SELECT A.*
    FROM A 
    WHERE NOT EXISTS
       (SELECT col_a1 FROM B WHERE B.col_a1 = A.col_a1 )
```

**NOTE 2:**
[NOT]IN và [NOT]EXISTS thì hầu hết trong những trường hợp sẽ trả lại kết quả giống nhau nhưng cả 2 bên nếu *tạo subquery thì EXISTS thao tác nhanh hơn rất nhiều.*<br>
=> Nguyên nhân thì hỏi thí chủ chịu khó hỏi Bác Google nhé..!

## 3. Query với Join sẽ nhanh hơn khi nào?
Như bài toán 1, có phải subquery sẽ nhanh hơn join, thì chẳng khác gì mình tự tát vào mặt mình kỷ yếu về Index cả nhỉ. Vậy, trường hợp nào, Join sẽ nhanh hơn, chúng ta cùng xem 2 ví dụ bên dưới thì truy vấn có phép Join sẽ nhanh hơn nhé:<br>
**Ví dụ 1:**
```sql
// SQL1:
Select E.Id, E.Name from Employee E
     join Dept D on E.DeptId=D.Id

// SQL2:
Select E.Id, E.Name from Employee
     Where DeptId in (Select Id from Dept)
```

**Ví dụ 2:**
```sql
// SQL 1:
SELECT cus.name, cus.address,
        (select com.name from company
            where ID = cus.company_id) as company_name
    from customer cus;

// SQL 2:
SELECT cus.name, cus.address, com.name
       from customer cus
       join company com on cus.company_id = com.id
```

## 4. Note cuối cần nhớ
Tùy vào số lượng data và data muốn lấy ra, mà chúng ta sẽ biết là lúc nào câu query chứa Join hay subquery sẽ nhanh hơn. Từ đó, chúng ta sẽ có những câu query sáng suốt hơn, ít tốn performance hơn.
```
* Nếu data ít hơn khoảng 20k record, thì lựa chọn với JOIN sẽ hoạt động tốt hơn.
* Nếu data nhiều hơn như 100k+ records thì ựa chọn với IN sẽ hoạt động tốt hơn.
* Ngoài ra, nếu bạn không cần dữ liệu từ bảng khác, thì dùng phép IN là ổn, nhưng tốt hơn hết là bạn nên dùng EXISTS.
```

## Tài liệu được nạp từ kiến thức bản thân và nhiều nguồn khác nhau :D. Nên có gì sai sót thì mong mọi người thông cảm