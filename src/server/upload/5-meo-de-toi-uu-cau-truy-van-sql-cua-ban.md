Là một lập trình viên, chắc chắn bạn sẽ phải làm việc với Database. Mặc dùng các framework ORM (Object Relation Mapping) hiện nay cũng cấp rất nhiều hàm thực hiện việc thao tác với DB. Tuy nhiên không phải lúc nào nó cũng được tối ưu. Và điều đó vẫn phụ thuộc vào chính cách sử dụng của bạn nữa. 

Bài hôm nay của mình sẽ cho bạn 5 mẹo để tối ưu câu truy vấn, giúp cải thiện performace, nâng cao hiệu quả của ứng dụng

# 1. Học cách đánh Index hợp lý

Học cách làm sao để đánh index cho hợp lý là các tốt nhất là để tăng perfomance của câu truy vấn. Index cho phép truy cập một cách nhanh hơn tới db trong những trường hợp điển hình. Những người mới làm việc với db thường cảm thấy việc đánh index này cao siêu hoặc rất khó. Họ hoặc là chẳng đánh index cho bất cứ cái gì, hoặc là cố gắng để đánh index cho mọi thứ. Dĩ nhiên, không có phuơng án nào trong đó là đúng cả. Với việc không đánh index cho bất cứ thứ gì, câu truy vấn của bạn sẽ có khả năng bị chậm. Còn nếu đánh index cho tất cả mọi thứ, việc update hay insert sẽ bị chậm lại. 

Nếu bạn không chắc chắn rằng mình đủ hiểu về index, hãy tìm hiểu nhiều hơn về nó. Chú trọng vào việc cân nhắc xem trường nào nên đánh index, trường nào không, và đánh index theo kiểu nào, B-tree hay BitMap .v.v.v


# 2. Chỉ lấy ra những dữ liệu cần thiết

Một trong những sai lầm mà mình thấy nhiều bạn mới hay gặp phaỉ, đó là lúc nào cũng  sử dụng SELECT `*` cho dù các rất nhiều trường (cột) các bạn không cần thông tin của chúng.

Nếu bảng nhỏ, việc lấy thêm các trường này không gây ra quá nhiều khác biệt. Nhưng với tập dữ liệu lớn hơn, việc chỉ định những cột mà bạn muốn lấy sẽ giảm rất nhiều thời gian truy vấn.

Vì thế, ví dụ nếu bạn chỉ cần lấy những thông tin: tên, ngày sinh, giới tính của các USER, thay vì sử dụng
```sql
SELECT * FROM USER ...
```
thì hãy sử dụng
```sql
SELECT NAME, DATE_OF_BIRTH, GENDER FROM USER ...
```
để câu truy vấn của mình có tốt độ lý tưởng hơn nhé

Cũng tương tự như thế, nếu bạn chỉ cần một số lượng gới hạn các record trả về, thì hãy sử dụng LIMIT (hay tuơng tự thế ở các DB khác).
```sql
SELECT * FROM USER;
```
Vis dụ, nếu bạn chỉ cần hiển thị 10 record đầu tiên trong 50.000 record của bảng USER, thì câu truy vấn này sẽ báo với DB của bạn để hạn chế lượng dữ liệu cần tìm hiếu. Bằng cách này, DB sẽ dừng lại việc tìm kiếm sau khi đã tìm được 10 record thay vì sẽ phải scan toàn bộ bảng USER

```sql
SELECT * FROM USER LIMIT 10;
```

# 3. Tránh sử dụng function bên tay toán tử so sánh (hay đúng hơn là tránh sử dụng hàm đối với cột của bảng)

Function là một cách thuận tiện để xử lý các task phúc tạp mà bạn có thể sử dụng nó cả ở mệnh đề SELECT hay WHERE. Tuy nhiên,ứng dụng chúng trong mệnh đề WHERE có thể gây ra những vấn đề ko tốt về performance. Hãy ngó qua ví dụ dưới đây
```SQL
SELECT nickname FROM users WHERE DATEDIFF(MONTH, appointment_date, '2015-04-28') < 0;
```
Thậm chí nếu bạn đã đánh indẽ cho cột `appointment_date` trong bảng users, câu truy vấn vẫn phải scan toàn bộ bảng. Đó là bởi vì bạn sử dụng hàm `DATEDIFF` cho cột mà bạn đang xét(`appointment_date). Giá trị tính toán được của hàm này sẽ được tính lúc runtime, như vậy, nó sẽ phải kiểm tra từng record trong bảng, lấy ra trị output và đem so sánh với 0.
Để cải thiện performace, nó ta có thể đổi câu truy vấn như sau
```SQL
SELECT nickname FROM users WHERE appointment_date > '2015-04-30';
```

Dĩ nhiên trong nhiều trường hợp, ta ko thể có được 1 câu truy vấn tuơng tự như vậy, như nếu có thể, hãy biến câu truy vấn ban đầu mà ở đó, ta đang sử dụng hàm đối với cột (đc đánh index) của bảng  trở thành 1 câu truy vấn tối ưu hơn như ví dụ ngay trên.


# 4. Cân nhắc việc loại bỏ các câu truy vấn con tuơng quan

Câu truy vấn con tuơng quan là những câu truy vấn con phục thuộc vào câu truy vấn ngoài. Nó sử dụng dữ liệu lấy được từ câu truy vấn ngoài trong mệnh đề WHERE. Ví dụ bạn muốn lấy danh sách tất cả những us mà đã ủng hộ. Bạn có thể sử dụng câu truy vấn 
```SQL
SELECT user_id, last_name FROM users 
    WHERE EXISTS (SELECT * FROM donationuser WHERE donationuser.user_id = users.user_id);
```
Trong trường hợp này, câu truy vấn con sẽ chạy 1 lần với mỗi record của câu truy vấn chính. Cụ thể là mỗi lần xét tới 1 record của câu truy vấn chính, câu truy vấn con lại được chạy với điều kiện WHERE trong đó là giá trị user_id của record đang đc xét của câu truy vấn chính. Do đó nó câu truy vấn chưa hiệu quả

Thay vào đó, ta có thể sử dụng 
```SQL
SELECT DISTINCT users.user_id FROM users 
    INNER JOIN donationuser ON users.user_id = donationuser.user_id;
```

Nếu có hàng triệu user trong DB, câu lệnh với câu truy vấn con tuơng quan sẽ hầu như có thể gây kém hiệu quả hơn sử dụng INNER JOIN bởi vì ta cần chạy câu truy vấn con hàng triệu lần. Nhưng nếu bạn đang tìm kiếm những người donations được tạo bởi 1 user chỉ định, thì sử dụng nó lại là 1 ý tưởng k tồi. Theo quy tắc chung, nếu bạn tìm kiếm nhiều hoặc hầu hết các hàng, hãy cố gắng tránh sử dụng các truy vấn con tương quan. Tuy nhiên, hãy nhớ rằng việc sử dụng các truy vấn con tương quan có thể là không thể tránh khỏi trong một số trường hợp.

# 5. Tránh sử dụng ký tự %, _ ở đầu giá trị tìm kiếm LIKE

Bất cứ khi nào có thể, tránh sử dụng LIKE theo cách này
```SQL
SELECT * FROM users WHERE name LIKE '%bar%';
```
Sử dụng % ở đầu sẽ ngăn việc db sử dụng index (nếu có) của cột name. Do đó sẽ làm giảm tốc độ truuy vấn. Vì thế, nếu có thể (spec cho phép), hãy tránh
```SQL
SELECT * FROM users WHERE name LIKE 'bar%';
```


Bài viết của mình được dịch từ nguồn
http://www.vertabelo.com/blog/technical-articles/5-tips-to-optimize-your-sql-queries

Cảm ơn các bạn đã quan tâm theo dõi. Hẹn gặp lại ở các bài chia sẻ lần sau.