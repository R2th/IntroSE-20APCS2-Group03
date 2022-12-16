Ở bài viết này mình sẽ trình bài tiếp về cách thao tác thay đổi trong database của Hive như là thay đổi tên table và thay đổi cột trong table, các bạn cùng theo dõi nhé ^^

# 1. Alter table Statement - Câu lệnh thay đổi table 
Được sử dụng thể thay đổi một table trong Hive

**Cú pháp:** 
Sử dụng các cú pháp sau tùy vào thuộc tính bạn muốn thay đổi trong bảng.
```
ALTER TABLE name RENAME TO new_name
ALTER TABLE name ADD COLUMNS (col_spec[, col_spec ...])
ALTER TABLE name DROP [COLUMN] column_name
ALTER TABLE name CHANGE column_name new_name new_type
ALTER TABLE name REPLACE COLUMNS (col_spec[, col_spec ...])
```

# 2. Câu lệnh rename
Truy vấn sau đây đổi tên bảng từ employee thành emp 
```
hive> ALTER TABLE employee RENAME TO emp;
```

### JDBC Program
 JDBC program sau sẽ đổi tên table như trên 
 
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet; 
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveAlterRenameTo {
   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);
      
      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");
      
      // create statement
      Statement stmt = con.createStatement();
      
      // execute statement
      stmt.executeQuery("ALTER TABLE employee RENAME TO emp;");
      System.out.println("Table Renamed Successfully");
      con.close();
   }
}
```

Lưu tên chương trình là HiveAlterRenameTo.java. Và ta chạy câu lệnh sau để compile và execute chương trình
```
$ javac HiveAlterRenameTo.java
$ java HiveAlterRenameTo
```
**Output:**
```
Table renamed successfully.
```

# 3. Câu lệnh thay đổi 
Bảng sau bao gồm các trường của table employee, những trường được thay đổi sẽ được in đậm 
![](https://images.viblo.asia/12df7d85-2a08-4b49-83fa-cbfb0e8b6d9b.png)
Hai câu truy vấn sau sẽ thực hiện sự thay đổi trên
```
hive> ALTER TABLE employee CHANGE name ename String;
hive> ALTER TABLE employee CHANGE salary salary Double;
```

### JDBC Program 
JDBC Program sau sẽ thực hiện thay đổi trên 
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveAlterChangeColumn {
   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);
      
      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");
      
      // create statement
      Statement stmt = con.createStatement();
      
      // execute statement
      stmt.executeQuery("ALTER TABLE employee CHANGE name ename String;");
      stmt.executeQuery("ALTER TABLE employee CHANGE salary salary Double;");
      
      System.out.println("Change column successful.");
      con.close();
   }
}
```

Lưu chương trình trong file tên là HiveAlterChangeColumn.java. Sử dụng lệnh command sau:
```
$ javac HiveAlterChangeColumn.java
$ java HiveAlterChangeColumn
```

**Output:**
```
Change column successful.
```

# 4. Câu lệnh thêm cột 
Câu truy vấn sau thêm cột dept vào bảng employee 
```
hive> ALTER TABLE employee ADD COLUMNS ( 
dept STRING COMMENT 'Department name');
```
### JDBC Program 
JDBC Program thêm cột vào bảng như sau :
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveAlterAddColumn {
   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);

      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");

      // create statement
      Statement stmt = con.createStatement();
      
      // execute statement
      stmt.executeQuery("ALTER TABLE employee ADD COLUMNS " + " (dept STRING COMMENT 'Department name');");
      System.out.prinln("Add column successful.");
      
      con.close();
   }
}
```

Lưu chương trình trong file tên là HiveAlterAddColumn.java. Sử dụng lệnh command sau để compile và execute:
```
$ javac HiveAlterAddColumn.java
$ java HiveAlterAddColumn
```

**Output:**
```
Add column successful.
```

# 5. Câu lệnh thay thế 
Câu truy vấn sau sẽ xóa hết các cột trong table employee và thay thế chúng với cột emp và name:\
```
hive> ALTER TABLE employee REPLACE COLUMNS ( 
eid INT empid Int, 
ename STRING name String);
```

### JDBC Program
Chương trình JDBC bên dưới thay thế cột eid bằng cột empid và ename bằng cột name 
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveAlterReplaceColumn {

   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);
      
      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");
      
      // create statement
      Statement stmt = con.createStatement();
      
      // execute statement
      stmt.executeQuery("ALTER TABLE employee REPLACE COLUMNS "
         +" (eid INT empid Int,"
         +" ename STRING name String);");
         
      System.out.println(" Replace column successful");
      con.close();
   }
}
```

Lưu chương trình với tên HiveAlterReplaceColumn.java. Sử dụng câu lệnh command để compile và execute:
```
$ javac HiveAlterReplaceColumn.java
$ java HiveAlterReplaceColumn
```

**Output:**
```
Replace column successful.
```

# 6. Drop table - Xoá table 
Cú pháp:
```
DROP TABLE [IF EXISTS] table_name;
```

Response khi thành công:

```
OK
Time taken: 5.3 seconds
hive>
```

### JDBC Program

Xoá bảng employee:
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveDropTable {

   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);

      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");

      // create statement
      Statement stmt = con.createStatement();

      // execute statement
      stmt.executeQuery("DROP TABLE IF EXISTS employee;");
      System.out.println("Drop table successful.");
      
      con.close();
   }
}
```

Lưu chương trình dưới tên HiveDropTable.java 

```
$ javac HiveDropTable.java
$ java HiveDropTable
```

**Output**:

```
Drop table successful
```

Xác nhận list table:

```
hive> SHOW TABLES;
emp
ok
Time taken: 2.1 seconds
hive>
```