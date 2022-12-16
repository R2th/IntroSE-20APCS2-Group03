Trong SQL Server, View là đoạn lệnh truy vấn đã được viết sẵn và lưu bên trong cơ sở dữ liệu. Một View thì bao gồm 1 câu lệnh SELECT và khi bạn chạy View thì bạn sẽ thấy kết quả giống như khi bạn mở 1 Table. Các bạn có thể tưởng tượng nó giống như một Table ảo. Bởi vì nó có thể tổng hợp dữ liệu từ nhiều Table để tạo thành 1 Table ảo.

# Lợi ích của Views
View rất hữu dụng khi bạn muốn cho nhiều người người truy cập ở các permission khác nhau. Cụ thể là:

-  Hạn chế truy cập tới các Table cụ thể. Chỉ cho phép được xem qua View.
-  Hạn chế truy cập vào vào Column của Table. Khi truy cập thông qua View bạn không thể biết được tên Column mà View đó truy cập vào.
- Liên kết các Column từ rất nhiều Table vào thành Table mới được thể hiện qua View.
- Trình bày các thông tin tổng hợp(VD: sử dụng funtion như COUNT, SUM, ...) 

# Cú pháp View
Để tạo 1 View bạn có thể sử câu lệnh "CREATE VIEW". Cụ thể như sau:

```sql
CREATE VIEW ViewName AS
SELECT ...
```

# Tạo View
Chúng ta hãy thử tạo 1 View có tên là "ToDoList" và lưu nó vào cơ sở dữ liệu nhé. Cơ bản thì tất cả những gì chúng ta làm là sử dụng lệnh "CREATE VIEW ToDoList AS" trước câu lệnh truy vấn, như sau:

```sql
CREATE VIEW ToDoList AS
SELECT	Tasks.TaskName, Tasks.Description
FROM	Status INNER JOIN
			Tasks ON Status.StatusId = Tasks.StatusId
WHERE	(Status.StatusId = 1)
```

Khi bạn đã chạy xong đoạn lệnh trên. Hãy làm mới lại thư mục Views. Để thấy được kết quả:

![](https://images.viblo.asia/4f4badd5-d698-428d-8214-165519b47311.png)

# Mở View

Vì bây giờ bạn đã tạo xong View, bạn có thể xem kết quả giống như khi mở 1 Table. Và thay vì phải làm các câu lệnh INNER JOIN loằng ngoằng như phần trên thì bạn chỉ cần phải gọi câu lệnh:

```sql
select * from todolist
```

để có thể nhận được kết quả tượng tự như khi làm INNER JOIN.

![](https://images.viblo.asia/da7fd8ea-98a3-479f-8280-2d2d4d57044c.png)

# Dữ liệu được cập nhật

Vì View lấy dữ liệu từ các Table của cơ sở dữ liệu nên khi dữ liệu bên trong các Table thay đổi thì khi thực hiện mở lại các View dữ liệu sẽ cũng thay đổi theo. Cho nên sau khi cập nhật dữ liệu mới cho các Table thì chỉ cần mở lại View và các bạn sẽ có được những bản ghi mới nhất.

# Chỉnh sửa View

Bạn có thể chỉnh sữa View đã tồn tại bằng cách sử dụng "ALTER" thay vì "CREATE".

Chẳng hạn như với câu lệnh truy vấn đã sử dụng "CREATE" ở trên. Nếu muốn thay đổi điều kiện từ "StatusId" thành "StatusName" thì sẽ như sau:

```sql
ALTER VIEW ToDoList AS
SELECT	Tasks.TaskName, Tasks.Description
FROM	Status INNER JOIN
			Tasks ON Status.StatusId = Tasks.StatusId
WHERE	(Status.StatusName = 'To Do')
```

Như bạn có thể thấy, các View cho phép bạn lưu các lệnh truy vấn của bạn để có thể chạy lại chúng chỉ bằng cách thực hiện qua lệnh SELECT. Thật đơn giản phải không?