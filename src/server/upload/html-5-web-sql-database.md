# HTML 5 - Web SQL Database

### 1. Giới thiệu:
Web SQL Database là một công nghệ kết hợp giữa trình duyệt và SQLite  để hỗ trợ việc tạo và quản lý database ở phía client. Việc sử dụng chúng cũng vô cùng đơn giản nếu bạn có một chút kiến thức về database (SQL, MySQL,...) và kiến thức về javascript.

Hiện tại Web SQL Database được hỗ trợ trong các trình duyệt Google Chrome, Opera và Safari.

### 2. Các phương thức cơ bản:

* **openDatabase** − Mở một database có sẵn hoặc tạo mới nếu nó chưa tồn tại.
* **transaction** − Đây là phương thức hỗ trợ điều khiển các transaction, commit hoặc rollback nếu xảy ra lỗi.
* **executeSql** − Thực thi câu lệnh SQL.


### 3. Open Database

Phương thức này có nhiệm vụ mở một database có sẵn hoặc tạo mới nếu nó chưa tồn tại. 


Cấu trúc như sau:

```
Database openDatabase(
	in DOMString name,
	in DOMString version,
	in DOMString displayName,
	in unsigned long estimatedSize,
	in optional DatabaseCallback creationCallback
);
```

Trong đó:


+ **name**: tên của database.
+ **version**: phiên bản. Hai database trùng tên nhưng khác phiên bản thì khác nhau.
+ **displayname**: mô tả.
+ **estimatedSize**: dung lượng được tính theo đơn vị byte.
+ **creationCallback**: phương thức callback được thực thi sau khi database mở/tạo.

Ví dụ tạo một database với tên “mydb” và dung lượng là 5 MB:

`var db = openDatabase('mydb', '1.0', 'Demo for sqlite web', 5 * 1024 * 1024);`

### 4. Transaction

Khi thực thi các câu SQL, bạn cần thực hiện chúng trong ngữ cảnh của một transaction. Một transaction cung cấp khả năng rollback khi một trong những câu lệnh bên trong nó thực thi thất bại. Nghĩa là nếu bất kì một lệnh SQL nào thất bại, mọi thao tác thực hiện trước đó trong transaction sẽ bị hủy bỏ và database không bị ảnh hưởng gì cả.
<br>
<br>
Interface Database hỗ trợ hai phương thức giúp thực hiện điều này là **transaction()** và **readTransaction()**. Điểm khác biệt giữa chúng là **transaction()** hỗ trợ read/write, còn **readTransaction()** là read-only. Như vậy sử dụng readTransaction() sẽ cho hiệu suất cao hơn nếu như bạn chỉ cần đọc dữ liệu.
<br>
<br>
Cấu trúc như sau:
<br>
```
void transaction(
	in SQLTransactionCallback callback,
	in optional SQLTransactionErrorCallback errorCallback,
	in optional SQLVoidCallback successCallback
);
```

Ví dụ:


```
var db = openDatabase('mydb', '1.0', 'Demo for sqlite web', 5 * 1024 * 1024);
db.transaction(function (tx) {
   // Using tx object to execute SQL Statements
});
```

### 5. Execute SQL


**executeSql()** là phương thức duy nhất để thực thi một câu lệnh SQL trong Web SQL. Nó được sử dụng cho cả mục đích đọc và ghi dữ liệu
<br>
<br>
Cấu trúc như sau:
<br>

```
void executeSql(
	in DOMString sqlStatement,
	in optional ObjectArray arguments,
	in optional SQLStatementCallback callback,
	in optional SQLStatementErrorCallback errorCallback
);
```

Ví dụ 1: Tạo bảng User và thêm hai dòng dữ liệu vào bảng này.


```
db.transaction(function (tx) {
   tx.executeSql("CREATE TABLE IF NOT EXISTS USER(id unique, name)");
   tx.executeSql("INSERT INTO USER (id, name) VALUES (1, 'peter')");
   tx.executeSql("INSERT INTO USER (id, name) VALUES (2, 'paul')");
});
```


Hoặc ta có thể viết như sau để đảm bảo bảo mật tốt hơn (tránh SQL injection)

```
tx.executeSql("INSERT INTO USER (id, name) VALUES (?,?)", [1, "peter"]);
tx.executeSql("INSERT INTO USER (id, name) VALUES (?,?)", [2, "paul"]);
```



Ví dụ 2: Hiển thị dữ liệu của bảng User:

```
 tx.executeSql("SELECT * FROM USER", [], (transaction, result) => {
       console.log(result.rows.item(0));
       console.log(result.rows.item(1));
   },
   (transaction, error) => {

   }
);
```

### 6. Ví dụ hoàn chỉnh

```
<!DOCTYPE html>
<html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Test Web database SQLite</title>
   </head>
   <body>
       <script>
           var db = openDatabase('mydb', '1.0', 'Demo for sqlite web', 5 * 1024 * 1024);
           db.transaction(function (tx) {
               tx.executeSql("CREATE TABLE IF NOT EXISTS USER(id unique, name)");
               tx.executeSql("INSERT INTO USER (id, name) VALUES (?,?)", [1, "peter"]);
               tx.executeSql("INSERT INTO USER (id, name) VALUES (?,?)", [2, "paul"]);

               tx.executeSql("SELECT * FROM USER", [], (transaction, result) => {
                       console.log(result.rows.item(0));
                       console.log(result.rows.item(1));
                   },
                   (transaction, error) => {

                   }
               );

           });
       </script>
   </body>
</html>
```

### 7. Tool debug của chrome

Bạn có thể ấn Ctrl+Shift+I để view dữ liệu

![](https://images.viblo.asia/2be584f6-2b27-4726-9464-5995b26cb7d4.png)