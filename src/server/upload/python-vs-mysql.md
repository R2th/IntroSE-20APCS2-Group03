# Lời nói đầu.
Xin chào mọi người  đã quay trở lại seria bài viết về python của mình :D . Ai cần đọc về bài viết về python phần 1, 2 và 3 của mình thì click vào link bên dưới nhé :D
- [Getting started Python - P1](https://viblo.asia/p/getting-started-python-V3m5WBWWlO7)
-  [Getting started Python - P2](https://viblo.asia/p/getting-started-python-p2-3Q75wkz25Wb)
-  [Getting started Python - P3](https://viblo.asia/p/getting-started-python-p3-maGK7mOAlj2)
-  [Getting started Python - Handle File](https://viblo.asia/p/getting-started-python-handle-file-1VgZvo2rlAw)


Khi một lập trình viên tiếp xúc với một ngôn ngữ mới thì điều đầu tiên cần biết đó là các khái niệm cơ bản , các hàm , biến và quy tắc chung ngôn ngữ đó . Khi đã hiểu chúng thì việc rất thiết yếu cho việc tiếp tục đó là tìm hiểu cách mà ngôn ngữ đó làm việc với các cơ sở dữ liệu :D . Vì vậy nên trong bài viết ngày hôm nay mình xin phép trình bày về Python vs Mysql

# Nội dung.
## I : Install MySQL Driver

Đâu tiên , để có thể truy cập tời Mysql database  thì Python cần một MYSQL Driver để kết nối. Trong bài viết này , mình sẽ giời thiệu cho các bạn sử dung `MySQL Connector`

 `MySQL Connector` là một driver được nhiều người sử dụng khi sử dung Python. Nào hay cài đặt package này bằng cách chạy câu lệnh này nhé :
 ```
python -m  pip install mysql-connector
```

Ok, khi bạn đã cài đặt xong package thì thử kết nối đến database xem sao nhé . 

```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword"
)

print(mydb) // =======> print : <mysql.connector.connection.MySQLConnection object ar 0x016645F0>
```
 
Nếu ra được kết quả như thế này tức bạn đã có bước khởi đầu thành công rồi đấy , còn nếu có lỗi gì thì thửu check xem package `mysql-connector` đã được cài thành công chưa .... Mysql cài chưa hay tài khoản đúng chưa nhé :D

## II : Các thao tác căn bản 

### 1 : Create Database.
Để tạo 1 database chúng ta cần phải chạy đoạn "CREATE DATABASE" statement. Cụ thể như sau :
```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword"
)

mycursor = mydb.cursor()

mycursor.execute("CREATE DATABASE mydatabase")
```

Trong một số trường hợp bạn cần phải check xem database có tồn tại hay không rồi mới khởi tạo. Chúng ta hoàn toàn có thể làm được việc này bằng cách show ra các database đã tồn tại và check dần dần . Cụ thể như sau :

```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword"
)

mycursor = mydb.cursor()

mycursor.execute("SHOW DATABASES")

for x in mycursor:
  print(x)
```

Trong đại đa số trường hợp, thì mình thường tạo database bằng tay sau đó là tạo connection vơi database hiện có. Đây là cách phổ thông và được rất nhiều người sử dụng . Cu thể như sau :

```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)
```
Tất nhiên với cách này, nếu bạn nhập sai tên database hoặc database không tôn tại thì Puthon sẽ báo về cho bạn 1 lỗi . Hiển nhiên là vậy


### 2 : Create / Drop Table.

Cũng giống như việc tạo database, chúng ta cũng có thể dễ dàng tạo ra 1 bảng dữ liệu bằng cách sử dụng  "CREATE TABLE" statement. Cụ thể như sau :

```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")
```

Hiển nhiên là chũng ta cũng có thể check table có tồn tại không bằng cách run "SHOW TABLES" statement. Cụ thể như sau :

```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

mycursor.execute("SHOW TABLES")

for x in mycursor:
  print(x)
```

Thông thường để định nghĩa và phân biệt sự khác nhau giữa các line dữ liệu chúng ta sẽ có các `PRIMARY KEY` . Để tạo được các key này chúng ta có thể làm như sau :

```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

mycursor.execute("CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))") // Tạo bảng mới 

mycursor.execute("ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY") // Update thông tin cho bảng đã tồn tại

```

Hiển nhiên rồi, có tạo thì hiển nhiên là có xóa ... Việc này cũng đơn giản thôi, bạn có thể follow theo cú pháp sau :

```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

sql = "DROP TABLE IF EXISTS customers"

mycursor.execute(sql)
```

### 3 : Insert  / Update  .

**3.1 : Insert** 

Để Insert dữ liệu vao trong bảng ta có thể sử dụng "INSERT INTO" statement.

   ```
   import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
val = ("John", "Highway 21")
mycursor.execute(sql, val)

mydb.commit()

print(mycursor.rowcount, "record inserted.")
   ```
   
   Tuy nhiên cũng có những lúc chúng ta cần inseart nhiều bản ghi cũng 1 lúc vào database , điều này hoàn toàn có thể làm được với python bằng cách sử dụng phương thức `executemany()` . Cụ thể như sau :
   
   ```
   import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
val = [
  ('Peter', 'Lowstreet 4'),
  ('Amy', 'Apple st 652'),
  ('Hannah', 'Mountain 21'),
  ('Michael', 'Valley 345'),
  ('Sandy', 'Ocean blvd 2'),
  ('Betty', 'Green Grass 1'),
  ('Richard', 'Sky st 331'),
  ('Susan', 'One way 98'),
  ('Vicky', 'Yellow Garden 2'),
  ('Ben', 'Park Lane 38'),
  ('William', 'Central st 954'),
  ('Chuck', 'Main Road 989'),
  ('Viola', 'Sideway 1633')
]

mycursor.executemany(sql, val)

mydb.commit()

print("1 record inserted, ID:", mycursor.lastrowid)
   ```
   
   Như ví dụ ở trên, với method `executemany()` chúng ta cần truyền vào 2 đối số ... Đối số đầu tiên là cú pháp sql query và đối số thứ 2 là 1 list của các `tuples`.
   
   Cúng trong ví dụ kể trên , ở phần cuối mình có dùng `lastrowid` ===> lấy ra id cuối cùng được inseart vào từ câu command (Có thể dùng cả cho khi inseart 1 hay nhiều bản ghi nhé )
   
   
>    `mydb.commit()` ===> Hàm này là hàm bắt buộc phải có để tạo ra 1 điều gì đó thay đổi trong database . Nếu không sử dụng nó thì sẽ không có gì thay đổi cả
   
   **3.2 : Update - Delete** 
   
   Thực tế thì việc update/delete 1 record cũng khá giống việc ta add thêm dữ liệu vào table duy khác chỉ có việc sử dụng query  . Cụ thể như sau :
   
   ```
   import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"

mycursor.execute(sql)

mydb.commit()

print(mycursor.rowcount, "record(s) affected")
   ```
   
   ```
   import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

sql = "DELETE FROM customers WHERE address = 'Mountain 21'"

mycursor.execute(sql)

mydb.commit()

print(mycursor.rowcount, "record(s) deleted")
   ```
   
   ### 3 : Select data
   Để select dữ liệu chúng ta có theer sử dụng "SELECT" statement:
   
   ```
   import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM customers")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)
   ```
   
>    `fetchall()` : Hàm này sẽ lấy toàn bộ các bản ghi tìm được 
>    
>    `fetchone()` : Hàm này sẽ lấy phần tử đầu tiên trong các bản ghi tìm được
>    


Ok, vậy là mình đã nói xong về các công việc cơ bản để kết nối cũng như sử dụng Mysql với python . Cám ơn các bạn đã theo dõi.  :D
# Tài liệu tham khảo
[https://www.w3schools.com/python/default.asp](https://www.w3schools.com/python/default.asp)