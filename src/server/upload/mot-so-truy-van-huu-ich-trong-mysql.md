Trước khi thực hiện, ta sẽ chuẩn bị một số dữ liệu để thực hiện truy vấn trong toàn bộ bài viết này.

Current Records
![](https://images.viblo.asia/5ea71136-616e-4300-ae2f-e24c8dc18090.png)

![](https://images.viblo.asia/5eb4776c-f9a3-4a2c-bd3f-cb31be1df151.png)

![](https://images.viblo.asia/3287fa21-4e66-414a-98a5-61ee471e03ce.png)

![](https://images.viblo.asia/dbea7a30-cad3-448b-aeaa-6943bd3a7f1f.png)

### **1. SQL Group by**
Mục đích: Gom các dữ liệu có tính đồng nhất vào 1 nhóm.

Ví dụ: thực hiện tính điểm trung bình của từng sinh viên (với mã sinh viên là duy nhất)

`select masv, avg(score) diemtb from students group by masv order by diemtb;`

result:

![](https://images.viblo.asia/fbb9d201-f410-43ed-951d-b60884054486.png)

### **2. SQL Having**
Mục đích: Hạn chế kết quả truy vấn trả về theo yêu cầu.

Ví dụ: hiển thị danh sách sinh viên có điểm trung bình > 8

`select masv, avg(score) diemtb from students group by masv having diemtb > 8;`

result:

![](https://images.viblo.asia/c5d0c56e-def0-4c17-a754-4334b0186e9f.png)

### **3. SQL  Join**
Có một số loại join trong mysql, phổ biến như: `inner join`,` left join`, `right join`.

**SQL Inner join**

Mục đích: hiển thị những bản ghi mà được so khớp giữa 2 bảng dữ liệu.

Ví dụ: hiển thị tên khoa của sinh viên

`select s.name tensv , f.name tenkhoa from students s inner join faculties f on s.faculty_id = f.faculty_id;`

result:

![](https://images.viblo.asia/e5bd0f9c-d6af-48c7-a5c1-8705a288d90c.png)

**SQL Left join**

Mục đích: hiển thị đủ tất cả các bản ghi ở bảng bên trái, dữ liệu của bảng bên phải sẽ được map với bảng bên trái, nếu không khớp thì sẽ nhận kết quả là NULL.

Ví dụ: hiển thị sinh viên cùng với khoa mà sinh viên đang học

`select s.name tensv , f.name tenkhoa from students s left join faculties f on s.faculty_id = f.faculty_id order by tenkhoa limit 3;`

result:

![](https://images.viblo.asia/2aa88611-648d-40f7-8e96-16a509c34566.png)

**SQL Right join**

Mục đích: hiển thị đủ tất cả dữ liệu ở bảng bên phải, dữ liệu ở bảng bên trái sẽ được map vào nếu khớp, còn không thì mặc định sẽ là NULL.

Ví dụ: hiển thị sinh viên cùng với khoa mà sinh viên đang học

`select s.name tensv , f.name tenkhoa from students s right join faculties f on s.faculty_id = f.faculty_id order by tenkhoa limit 7;`

 result:
 
![](https://images.viblo.asia/961ff3ef-1efc-45aa-b849-f4b3761a94cb.png)

Ngoài ra còn có một số loại join như: `SQL Cross join`, `SQL Self join`

Và có thể thay vì dùng `join`, ta có thể sử dụng `subquery` để thực hiện truy vấn dữ liệu. Tuy nhiên cần phải cân nhắc về mặt hiệu năng để lựa chọn sử dụng loại truy vấn nào hiệu quả hơn.

Ví dụ: Tìm các cuộc thi chạy mà có người chơi có id = 1 tham gia.

Nếu sử dụng `subquery`:

`select * from races where id in (select race_id from items where runner_id = 1);`

result:

![](https://images.viblo.asia/6c3da21d-06d2-45f4-8cf0-cecdd7cef333.png)

Sử dung `Explain` để xác định sự phụ thuộc của truy vấn:

`explain select * from races where id in (select race_id from items where runner_id = 1);`

Câu `subquery` ở trong không chạy độc lập mà chạy phụ thuộc vào query chính ngoài.

Sử dụng `show warnings;` để kiểm tra.

Nếu sử dụng `join`:

`select * from races join items on races.id = items.race_id where runner_id = 1;`

result:

![](https://images.viblo.asia/419c7f91-3073-4a9e-a2ef-0614d5135b1f.png)

Vì Join cho phép sự trùng lặp của các bản ghi nên ta cần dùng từ khóa `distinct` để loại bỏ các bản ghi trùng nhau và do đó MySQL phải tạo thực hiện sort lại các bản ghi và tiến hành loại trừ các bản ghi trùng lặp đó.

### **4. SQL Union**
Mục đích: kết hợp các bản ghi của 2 hoặc nhiều bảng mà không tạo ra bản sao.

Điều kiện để thực hiện union:

 - 2 câu select phải cho ra cùng số column.
 
 - Các column ở 2 câu select phải tương ứng với nhau, và phải tương ứng với nhau về kiểu dữ liệu.
 
Union: loại bỏ các bản ghi trùng lặp trước khi trả về kết quả.

Union all: giữ lại tất cả các bản ghi kể cả bị trùng.

-> Vậy nên nếu biết trước kết quả trả về không có bản ghi nào bị trùng lặp hoặc kết quả trùng lặp không gây ảnh hưởng thì nên dùng Union all vì sử dụng Union thì hệ quản trị Mysql sẽ mất thêm thời gian để sort lại các bản ghi rồi thực hiện loại bỏ các kết quả trùng lặp trước khi trả lại kết quả cho câu truy vấn.

`select * from students left join faculties on students.faculty_id = faculties.faculty_id union select * from students right join faculties on students.faculty_id = faculties.faculty_id;`

result:

![](https://images.viblo.asia/f80e941c-f42a-47c5-9119-e8f8bc1927b7.png)

### **5. SQL Exists**
Mục đích: kiểm tra sự tồn tại của 1 bản ghi dựa vào dữ liệu của câu lệnh inner sql query sau từ khóa `exists`.

Toán tử exists trả về `true`/`false`:

 - true : khi truy vấn sau `exists` trả về 1 hoặc nhiều bản ghi.
 
 - false : khi truy vấn sau `exists` không trả về bản ghi nào.
 
Cách thức hoạt động: sau khi tìm ra được 1 bản ghi trong truy vấn con thì thực hiện so sánh với câu truy vấn chính. Nếu kết quả không khớp thì loại ngay. Không thực hiện lần lượt xong truy vấn con rồi mới đến truy vấn chính.

Ví dụ: hiển thị những khoa đang có sinh viên học:

`select * from faculties where exists  (select student_id from students where students.faculty_id = faculties.faculty_id);`

result:

![](https://images.viblo.asia/6e76a325-91cf-4e1c-b0fb-41b8472532ba.png)

### **6. SQL In**
Mục đích: kiểm tra 1 field trong truy vấn chính có nằm trong 1 tập hợp hay không hoặc là kết quả của 1 câu truy vấn con.

Cách thức hoạt động: tìm ra các bộ dữ liệu phù hợp ở trong câu truy vấn con, sau đó mới dùng bộ dữ liệu đó so sánh với truy vấn chính.

Ví dụ: hiển thị những khoa có sinh viên đang học

`select * from faculties where faculty_id in (select students.faculty_id from students where faculties.faculty_id = students.faculty_id);`

result:

![](https://images.viblo.asia/a3bd4abb-9139-413e-b43c-208b6425682f.png)

### **7. Một số lưu ý khi sử dụng câu truy vấn**
**SQL Not in**

Nếu `subquery` của `Not in` trả về kết quả chứa bất kỳ 1 giá trị nào là NULL thì truy vấn chính sẽ luôn trả về kết quả là 1 tập rỗng.

`SELECT * FROM runners WHERE id NOT IN (SELECT winner_id FROM races)`

result: EMPTY

**SQL Self join, Having, Group by**

Tìm các người chơi thắng 2 lần trong bảng races

Sử dụng `Self join`:

`select a.event, a.winner_id from races as a, races as b where a.winner_id = b.winner_id and a.id <> b.id;`

Sử dụng `Having`, `Group by`:

`select winner_id, count(winner_id) from races group by (winner_id) having count(winner_id) > 1;`

-> Tìm các người chơi thắng 3, 4, 5 ....... lần trong bảng races thì ta không thể dùng Self join nhưng ngược lại với cặp lệnh Having và Group by thì có thể.

### **Tài liệu tham khảo**
- [https://sqlwithmanoj.com/2010/12/30/why-union-all-is-faster-than-union](https://sqlwithmanoj.com/2010/12/30/why-union-all-is-faster-than-union/)
- [https://www.guru99.com/joins.html](https://www.guru99.com/joins.html)