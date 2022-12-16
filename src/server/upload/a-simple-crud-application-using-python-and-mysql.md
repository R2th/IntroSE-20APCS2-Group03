Chào tất cả mọi người! Vậy là mình đã tiếp tục come back với chuỗi bài học về Python sau 1 khoảng thời gian dài dăng dẳng đây ạ. :)<br>
Ở bài viết [trước](https://viblo.asia/p/module-trong-python-gDVK2GBXZLj) thì mình đã giới thiệu với các bạn về module trong python cũng như cách sử dụng nó. Hôm nay, mình sẽ tổng hợp các kiến thức mà chúng ta đã học từ bấy lâu nay để tạo nên một application CRUD(Create - Read - Update - Delete) đơn giản, sử dụng python và cơ sở dữ liệu MySQL :).<br>
Và không để các bạn phải chờ lâu nữa, chúng ta hãy cùng bắt đầu thôi nào, let's go!
# Application detai
Ứng dụng mà mình chọn để làm demo ở đây là một ứng dụng quản lý sinh viên đơn giản có các chức năng như: xem danh sách sinh viên, thêm mới sinh viên, tìm kiếm sinh viên, cập nhật thông tin sinh viên và xóa sinh viên.<br>
Và để cho các bạn đỡ phải hoang mang khi đọc code của mình thì mình xin giới thiệu sơ qua về những files có trong app của mình nhé:<br>
* constant.py: Đây là file để mình thiết lập cấu hình database của mình bao gồm các thông tin như host, username, password, database.
* database.py: File này sẽ chứa hàm khởi tạo connection cũng như các hàm xử lý các việc create, update, find, ...
* util.py: File này mình sẽ định nghĩa một số hàm tiện ích được sử dụng.
* student.py: Trong này mình sẽ khai báo một class Student để tiện cho việc transform dữ liệu khi xuất ra terminal :)
* main.py: Và đây là file gì thì mình không cần giới thiệu lại nha.<br>

Cấu trúc thư mục của mình sẽ như thế này:<br>
```
root
----constant.py
----database.py
----util.py
----student.py
----main.py
```
Và như đã đề cập, thì chúng ta sẽ sử dụng cơ sở dữ liệu MySQL để quản lý dữ liệu. Vậy làm thế nào để sử dụng MySQL trong python đây, chúng ta hãy cùng đến với phần tiếp theo nào.
# How to use MySQL in Python
## Cài đặt MySQL Connector
Python cần một MySQL driver để truy cập vào MySQL, do vậy việc đầu tiên chúng ta cần phải làm đó là cài đặt nó. Ở đây mình sử dụng driver "MySQL Connector" và may mắn thay chúng ta chỉ cần 1 câu lệnh terminal để cài đặt nó. Hãy mở terminal lên và gõ lệnh này vào nhé:<br>
```
python -m pip install mysql-connector
```
Note: đôi khi các bạn cần phải sử dụng quyền sudo để cài đặt nếu bị báo lỗi permission denied nhé.<br>
## Khởi tạo kết nối đến database
Sau khi đã cài đặt driver thành công thì chúng ta chỉ cần import mysql.connector vào file xxx.py và sau đó sử dụng cú pháp sau để khởi tạo kết nối: <br>
```
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="yourdatabase"
)

cursor = mydb.cursor()
#Khởi tạo đối tượng cursor để thực thi các câu lệnh sql sau này.
```
OK, vậy là chúng ta đã khởi tạo xong kết nối đến database, giờ thì cùng nhau chiến đấu tiếp nào.
# Xây dựng ứng dụng
Đầu tiên các bạn cần tạo một bảng students có các trường sau: id, code, name, class.<br>
## Tạo class Student
Tạo class Student để tiện cho việc transform dữ liệu lấy được từ database.<br>
```python
class Student():

	def __init__(self, code, name, className):
		self.code = code
		self.name = name
		self.className = className

	def getCode(self):
		return self.code

	def getName(self):
		return self.name

	def getClassName(self):
		return self.className

	def getStudentInfor(self):
		print('Code: ' + self.code)
		print('Name: ' + self.name)
		print('Class: ' + self.className)
		print('-------------')
```
Trong class này mình có define một hàm `getStudentInfor` để in dữ liệu của mỗi sinh viên có được ra màn hình.<br>
## Tạo file util
```python
from student import Student

def transformData(data):
	return Student(data[1], data[2], data[3])

def enterData():
	return raw_input('Enter data seperated by comma: ').split(',')

def printListStudents(students):
	if len(students):
		for student in students:
		  	st = transformData(student)
		  	st.getStudentInfor()
  	else:
  		print('No data')
```
File util này mình define các hàm như `transformData` để chuyển đổi dữ liệu từ kiểu Tuples sang Student để dễ hiển thị (các bạn phải import class Student vào mới sử dụng được nhé), `enterData` dùng để nhập dữ liệu  cho việc update hoặc create. Hàm `raw_input(...).split(',')` có tác dụng tách chuỗi chúng ta nhập vào thành các giá trị riêng biệt và trả về một List các dữ liệu cần thiết. Cuối cùng `printListStudents` để in danh sách các sinh viên hiện có ra màn hình.<br>
## Tạo file database
```python
import mysql.connector
import constant

def connectDb():
	return mysql.connector.connect(
		host=constant.dbInfor["host"], 
		user=constant.dbInfor["user"], 
		passwd=constant.dbInfor["passwd"], 
		database=constant.dbInfor["database"]
	)

def getListStudents(cursor):
	cursor.execute("SELECT * FROM students")
	results = cursor.fetchall()

	return results if len(results) else []

def addNewStudent(mydb, cursor, data):
	sql = "INSERT INTO students (code, name, class) VALUES (%s, %s, %s)"
	cursor.execute(sql, data)
	mydb.commit()
	print(cursor.rowcount, "student inserted.")

def findStudents(cursor, code):
	sql = "SELECT * FROM students WHERE code = %s"
	cursor.execute(sql, code)
	results = cursor.fetchall()

	return results if len(results) else []

def updateStudents(mydb, cursor, data):
	sql = "UPDATE students SET name = %s, class = %s WHERE code = %s"
	cursor.execute(sql, data)
	mydb.commit()
	print(cursor.rowcount, "student(s) affected.")

def deleteStudents(mydb, cursor, code):
	sql = "DELETE FROM students WHERE code = %s"
	cursor.execute(sql, code)
	mydb.commit()
	print(cursor.rowcount, "student(s) deleted")

```
Ở đây các bạn cần lưu ý những điểm sau:
* Để thực thi câu lệnh sql thì chúng ta cần sử dụng hàm `execute(sqlStatement)` thông qua đối tượng cursor đã có được từ connection lúc đầu.
* Dùng hàm `fetchall()` để lấy ra tất cả những bản ghi có được từ lúc thực thi câu sql cuối cùng.
* Hàm `commit()` được sử dụng để yêu cầu cập nhật sự thay đổi của table, nếu chúng ta không sử dụng hàm này thì những thay đổi đã tác động vào table sẽ không được lưu lại.
* Có thể sử dụng thuộc tính `rowcount` của đối tượng cursor để xem số bản ghi bị tác động bởi câu lệnh sql.<br>

## Chạy ứng dụng
Sau khi đã xong việc, chúng ta tiến hành viết file main.py và chạy nó.<br>
Sau đây là một số kết quả mà mình đã chạy thử:<br>
List:<br>
![](https://images.viblo.asia/64d25b3a-6481-433b-91ea-ca96b37b3650.png)
<br>
Search:<br>
![](https://images.viblo.asia/82fdc8a3-fa40-4011-b00a-1e9fa8541271.png)
<br>
Create:<br>
![](https://images.viblo.asia/6c3891df-e865-47e7-8181-a14c96df8d23.png)
# Tổng kết
Như vậy là chúng ta đã cùng nhau tạo nên một ứng dụng CRUD đơn giản kết hợp python và MySQL với một kết quả tương đối thành công. <br>
Mình hy vọng thông qua bài viết này sẽ giúp ích cho các bạn một phần nào về python cũng như cách sử dụng mysql trong python. Hiểu rõ hơn về cách tạo một class hay một module trong python. Và đặc biệt hơn nữa là góp phần củng cố thêm kiến thức về python cho các bạn đã theo dõi loạt bài viết về python của mình. Xin cảm ơn các bạn.<br>
Đây là toàn bộ mã nguồn của ứng dụng này, các bạn có thể clone về tham khảo nếu chưa hiểu nhé: https://github.com/phanvantan73/python_mysql