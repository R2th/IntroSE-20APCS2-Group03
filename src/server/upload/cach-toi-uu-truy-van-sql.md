Với một số lượng lớn record trong DB trong các phần mềm liên quan đến nhiều nghiệp vụ thì phương pháp cần thiết để tốc độ của hệ thống được đảm bảo là phải tối ưu hóa từng dòng lệnh SQL.
Sau đây mình xin giới thiệu một vài thủ thuật để tối ưu câu lệnh SQL
#     1. Thử không sử dụng select * để truy vấn SQL, nhưng ta sẽ dùng select các trường cụ thể
 

Thông thường
```sql
select * from employee;
```
Cách tốt hơn
```sql
select id，name from employee;
```
Bằng cách chỉ sử dụng các trường bắt buộc, chúng ta có thể tiết kiệm tài nguyên của mình 

#     2. Nếu bạn biết rằng chỉ có một kết quả truy vấn, nên sử dụng limit 1
Thông thường
```sql
select id，name from employee where name='jay
```
Cách tốt hơn
```sql
select id，name from employee where name='jay' limit 1;
```
Sau khi thêm limit 1, khi một bản ghi tương ứng được tìm thấy, nó sẽ không tiếp tục quét xuống, và hiệu quả sẽ được cải thiện rất nhiều
#     3. Hạn chế sử dụng or trong mệnh đề where truy vấn có điều kiện
Thông thường
```sql
select * from user where userid = 1 or age = 18
```
Cách tốt hơn
```sql
//sử dụng union all
select * from user where userid=1
union all
select * from user where age = 18
```

Việc sử dụng or có thể làm mất hiệu lực index và do đó nó yêu cầu quét toàn bộ bảng.
# 4, Tối ưu limit với chỉ số offset
Thông thường
```sql
select id，name，age from employee limit 10000，10;
lấy từ thứ tự thứ 10000 của tập kết quả , lấy 10 phần tử
```
Cách tốt hơn
```sql
//Cách 1:
select id，name from employee where id>10000 limit 10.

//Cách 2: order by + index
select id，name from employee order by id  limit 10000，10
```

Nếu bạn sử dụng giải pháp1, nó sẽ trả về bản ghi truy vấn cuối cùng (offset), để bạn có thể bỏ qua offset, hiệu quả đã được cải thiện rất nhiều.
Tùy chọn hai sử dụng thứ tự theo + index, cũng có thể cải thiện hiệu quả truy vấn.
# 5 Tối ưu lệnh like
Thông thường
```sql
select userId，name from user where userId like '%123';
```
Cách tốt hơn
```sql
select userId，name from user where userId like '123%';
```
Trường hợp %123 sẽ quét toàn bộ bảng trong trường hợp 123%, trình tối ưu hóa đang sử dụng chỉ mục chúng ta đã tạo và thực hiện tìm kiếm thay vì quét
# 6. Sử dụng điều kiện where để giới hạn dữ liệu được truy vấn để tránh trả lại các row thừa
Thông thường
```sql
List<Long> userIds = sqlMap.queryList("select userId from user where isVip=1");boolean isVip = userIds.contains(userId);
```
Cách tốt hơn
```sql
Long userId = sqlMap.queryObject("select userId from user where userId='userId' and isVip='1' ")boolean isVip = userId！=null;
```
Kiểm tra dữ liệu nào là cần thiết, tránh trả lại dữ liệu không cần thiết và tiết kiệm chi phí
# 7, Bạn nên tránh sử dụng toán tử! = Hoặc <> trong mệnh đề where càng nhiều càng tốt
Thông thường
```sql
select age,name  from user where age <>18;
```
Cách tốt hơn
```sql
//Bạn có thể sử dụng hai câu sql
select age,name  from user where age <18;
select age,name  from user where age >18;
```
Sử dụng! = Và <> có khả năng làm mất hiệu lực của index
# 8. Sử dụng distinct một cách cẩn trọng
Từ khóa distinct thường được sử dụng để lọc các bản ghi trùng lặp để trả về các bản ghi duy nhất. Khi được sử dụng trong trường hợp truy vấn một trường hoặc một vài trường, nó mang lại hiệu quả tối ưu hóa cho truy vấn.
Tuy nhiên, khi có nhiều trường, nó sẽ làm giảm đáng kể hiệu quả truy vấn
Thông thường
```sql
SELECT DISTINCT * from  user;
```
Cách tốt hơn
```sql
select DISTINCT name from user;
```
Thời gian CPU và thời gian chiếm dụng của câu lệnh với distinct cao hơn câu lệnh không distinct
# 9. Loại bỏ index dư thừa và trùng lặp
Thông thường
```sql
KEY `idx_userId` (`userId`)  
KEY `idx_userId_age` (`userId`,`age`)
```
Cách tốt hơn
```sql
// Xóa index userId, vì index kết hợp (A, B) tương đương với việc tạo các index(A) và (A, B) 
KEY `idx_userId_age` (`userId`,`age`)
```
Các index trùng lặp cần được duy trì và trình tối ưu hóa cũng cần xem xét từng cái một khi tối ưu hóa các truy vấn, điều này sẽ ảnh hưởng đến hiệu suất
# 10 Xem xét sử dụng các giá trị mặc định thay vì null trong mệnh đề where
Thông thường
```sql
select * from user where age is not null;
```
Cách tốt hơn
```sql
select * from user where age>0; //Set 0 as default
```

Trên đây là một vài cách để bạn có thể tối ưu truy vấn của mình, các bạn có thể có thêm nhiều ý tưởng khác việc tối ưu hóa cũng như tăng tốc độ truy vấn SQL của mình.
# Nguồn tham khảo:
https://towardsdatascience.com/how-to-optimize-sql-queries-742177cd5cc6?gi=a4b2e25af429