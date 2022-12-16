Đã là bài viết thứ tư trong series về Hive rồi, bài viết này chúng mình hãy dùng tìm hiểu về cách thao tác với cơ sở dữ liệu trong Hive nhé ^^

# 1. Tạo database
Hive là một công nghệ cơ sở dữ liệu có thể xác định cơ sở dữ liệu và bảng để phân tích dữ liệu có cấu trúc. Chủ đề cho phân tích dữ liệu có cấu trúc là lưu trữ dữ liệu theo cách thức bảng và chuyển các truy vấn để phân tích dữ liệu. Hive chứa một cơ sở dữ liệu mặc định có tên là default.

Một cơ sở dữ liệu trong Hive là một namespace hoặc một tập hợp các bảng. Cú pháp tạo như sau:
```
CREATE DATABASE|SCHEMA [IF NOT EXISTS] <database name>
```

Ở đây, IF NOT EXISTS là một mệnh đề tùy chọn, thông báo cho người dùng rằng cơ sở dữ liệu có cùng tên đã tồn tại. Chúng ta có thể sử dụng SCHEMA thay cho DATABASE trong lệnh này. Truy vấn sau đây được thực thi để tạo cơ sở dữ liệu có tên userdb:

```
hive> CREATE DATABASE [IF NOT EXISTS] userdb;
```

hoặc

```
hive> CREATE SCHEMA userdb;
```

Truy vấn sau đây được sử dụng để xác minh danh sách cơ sở dữ liệu:

```
hive> SHOW DATABASES;
default
userdb
```

#### JDBC Program
JDBC để tạo cơ sở dữ liệu được đưa ra dưới đây.

```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveCreateDb {
   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
      // Register driver and create driver instance
   
      Class.forName(driverName);
      // get connection
      
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/default", "", "");
      Statement stmt = con.createStatement();
      
      stmt.executeQuery("CREATE DATABASE userdb");
      System.out.println(“Database userdb created successfully.”);
      
      con.close();
   }
}
```

Lưu chương trình trong một tệp có tên HiveCreateDb.java. Các lệnh sau được sử dụng để biên dịch và thực hiện chương trình này.

```
$ javac HiveCreateDb.java
$ java HiveCreateDb
```

### Output:

```
Database userdb created successfully.
```

# 2. Xoá database 
Drop Database là một câu lệnh loại bỏ tất cả các bảng và xóa cơ sở dữ liệu. Cú pháp của nó là như sau:

```
DROP DATABASE StatementDROP (DATABASE|SCHEMA) [IF EXISTS] database_name 
[RESTRICT|CASCADE];
```

Các truy vấn sau đây được sử dụng để xoá cơ sở dữ liệu. Chúng ta hãy giả sử rằng tên cơ sở dữ liệu là userdb.

```
hive> DROP DATABASE IF EXISTS userdb;
```

Các truy vấn sau đây loại bỏ cơ sở dữ liệu bằng cách sử dụng CASCADE. Nó có nghĩa là bỏ các bảng tương ứng trước khi bỏ cơ sở dữ liệu.

```
hive> DROP DATABASE IF EXISTS userdb CASCADE;
```

Các truy vấn sau đây loại bỏ cơ sở dữ liệu bằng cách sử dụng SCHEMA.

```
hive> DROP SCHEMA userdb;
```
Câu lệnh này đã được thêm vào trong Hive 0.6.

#### JDBC Program
Chương trình JDBC để loại bỏ cơ sở dữ liệu được đưa ra dưới đây.
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveDropDb {
   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);
      
      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/default", "", "");
      Statement stmt = con.createStatement();
      stmt.executeQuery("DROP DATABASE userdb");
      
      System.out.println(“Drop userdb database successful.”);
      
      con.close();
   }
}
```

Lưu chương trình trong một tệp có tên HiveDropDb.java. Đưa ra dưới đây là các lệnh để biên dịch và thực hiện chương trình này.
```
$ javac HiveDropDb.java
$ java HiveDropDb
```

### Output:
```
Drop userdb database successful.
```


# Kết luận 
Cách thao tác với Database trong Hive cũng đơn giản thôi phải không nào, ở bài viết tiếp theo, mình sẽ trình bài tiếp về cách thao tác với các tables trong database của Hive nhé, see ya!!