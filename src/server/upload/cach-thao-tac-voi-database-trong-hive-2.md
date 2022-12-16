Ở bài viết này mình sẽ trình bài tiếp về cách thao tác với các tables trong database của Hive như là tạo table và load data vào table, các bạn cùng theo dõi nhé ^^

# 1. Tạo table
Các quy ước tạo bảng trong HIVE khá giống với việc tạo bảng bằng SQL.
Cú pháp để tạo table trong HIVE như sau: 

**Cú pháp:**

```
CREATE [TEMPORARY] [EXTERNAL] TABLE [IF NOT EXISTS] [db_name.] table_name

[(col_name data_type [COMMENT col_comment], ...)]
[COMMENT table_comment]
[ROW FORMAT row_format]
[STORED AS file_format]
```

**Ví dụ:**

Giả sử bạn cần tạo một bảng có tên là employee bằng cách sử dụng câu lệnh CREATE TABLE. Bảng sau liệt kê các trường và loại dữ liệu của chúng trong bảng employee:
![](https://images.viblo.asia/4413a277-f706-4f05-b67e-7c8ee8be6610.png)

Sau đây là dữ liệu:
```
COMMENT ‘Employee details’
FIELDS TERMINATED BY ‘\t’
LINES TERMINATED BY ‘\n’
STORED IN TEXT FILE
```

Câu query sau đây tạo một table trên là employee sử dụng dữ liệu ở trên 

```
hive> CREATE TABLE IF NOT EXISTS employee ( eid int, name String,
salary String, destination String)
COMMENT ‘Employee details’
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ‘\t’
LINES TERMINATED BY ‘\n’
STORED AS TEXTFILE;
```

Nếu bạn thêm option ```IF NOT EXISTS``` Hive sẽ bỏ qua câu lệnh tạo trong trường hợp table đã tồn tại.
Nếu tạo thành công, bạn sẽ thấy 
```
OK
Time taken: 5.905 seconds
hive>
```

### JDBC Program 
JDBC program sau sẽ tạo table được cho trong ví dụ 

```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveCreateTable {
   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);
      
      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");
      
      // create statement
      Statement stmt = con.createStatement();
      
      // execute statement
      stmt.executeQuery("CREATE TABLE IF NOT EXISTS "
         +" employee ( eid int, name String, "
         +" salary String, destignation String)"
         +" COMMENT ‘Employee details’"
         +" ROW FORMAT DELIMITED"
         +" FIELDS TERMINATED BY ‘\t’"
         +" LINES TERMINATED BY ‘\n’"
         +" STORED AS TEXTFILE;");
         
      System.out.println(“ Table employee created.”);
      con.close();
   }
}
```

Lưu chương trình với tên HiveCreateDb.java, Câu lệnh sau sẽ compile và execute chương trình:
```
$ javac HiveCreateDb.java
$ java HiveCreateDb
```

**Output**
```
Table employee created.
```

# 2. Load dữ liệu 
Nói chung, sau khi tạo bảng trong SQL, chúng ta có thể chèn dữ liệu bằng cách sử dụng câu lệnh INSERT. Nhưng trong Hive, chúng ta có thể chèn dữ liệu bằng cách sử dụng câu lệnh LOAD DATA.
Trong khi chèn dữ liệu vào Hive, tốt hơn là sử dụng LOAD DATA để lưu trữ các bản ghi hàng loạt. Có hai cách để tải dữ liệu: một là từ hệ thống tệp cục bộ và thứ hai là từ hệ thống tệp Hadoop.

**Cú pháp:**
Cú pháp để load dữ liệu như sau: 
```
LOAD DATA [LOCAL] INPATH 'filepath' [OVERWRITE] INTO TABLE tablename 
[PARTITION (partcol1=val1, partcol2=val2 ...)]
```

Trong đó:
* LOCAL là định danh để chỉ định đường dẫn cục bộ. Nó là optional.
* OVERWRITE là optional để overwrite dữ liệu trong bảng.
* PARTITION là optional .

**Ví dụ:**
Chúng ta sẽ insert dữ liệu sau vào bảng. Nó là một file text tên là sample.txt trong thư mục /home/user 
```
1201  Gopal       45000    Technical manager
1202  Manisha     45000    Proof reader
1203  Masthanvali 40000    Technical writer
1204  Kiran       40000    Hr Admin
1205  Kranthi     30000    Op Admin
```

Câu lệnh sau load text đã cho vào bảng.

```
hive> LOAD DATA LOCAL INPATH '/home/user/sample.txt'
OVERWRITE INTO TABLE employee;
```

Nếu thành công, bạn sẽ thấy:

```
OK
Time taken: 15.905 seconds
hive>
```

### JDBC Program 
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveLoadData {

   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);
      
      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");
      
      // create statement
      Statement stmt = con.createStatement();
      
      // execute statement
      stmt.executeQuery("LOAD DATA LOCAL INPATH '/home/user/sample.txt'" + "OVERWRITE INTO TABLE employee;");
      System.out.println("Load Data into employee successful");
      
      con.close();
   }
}
```

Lưu chương trình với tên HiveLoadData.java, sử dụng câu lệnh command sau để compile và execute chương trình 
```
$ javac HiveLoadData.java
$ java HiveLoadData
```

**Output:**
```
Load Data into employee successful
```