Loạt bài về HiveQL đã là phần cuối trong series Hive rồi, có lẽ sau khi xong HiveQL thì mình sẽ làm thêm 1 vài bài về Hive để giải đáp một số câu hỏi và thắc mắc thường gặp về Hive, một số hướng dẫn và nguồn hữu ích.... nữa. Cùng đón chờ nhé!
# 1. Select-Where
Ngôn ngữ truy vấn Hive - Hive Query Language (HiveQL) - là một ngôn ngữ truy vấn dành cho Hive để tiến hành và phân tích dữ liệu có cấu trúc trong một Metastore. Phần này sẽ giải thích cách để sử dụng câu lệnh SELECT với mệnh đề WHERE.
Câu lệnh SELECT thường được dùng để lấy dữ liệu từ một bảng. Mệnh đề WHERE làm việc tương tự một điều kiện. Nó lọc dữ liệu sử dụng điều kiện và trả lại cho bạn một kết quả có giới hạn. Toán tử và hàm có sẵn tạo ra một biểu thức đáp ứng điều kiện.

## Syntax
Cho bên dưới đây là cú pháp của câu truy vấn SELECT:
```
SELECT [ALL | DISTINCT] select_expr, select_expr, ... 
FROM table_reference 
[WHERE where_condition] 
[GROUP BY col_list] 
[HAVING having_condition] 
[CLUSTER BY col_list | [DISTRIBUTE BY col_list] [SORT BY col_list]] 
[LIMIT number];
```

## Example

Chúng ta sẽ lấy một ví dụ cho mệnh đề SELECT...WHERE. Giả sử rằng chúng ta có bảng employee như bên dưới, cùng với các trường: Id, Name, Salary, Designation, và Dept. Tạo ra một câu truy vấn để lấy chi tiết về nhân viên có lương nhiều hơn 3000Rs. 
```
+------+--------------+-------------+-------------------+--------+
| ID   | Name         | Salary      | Designation       | Dept   |
+------+--------------+-------------+-------------------+--------+
|1201  | Gopal        | 45000       | Technical manager | TP     |
|1202  | Manisha      | 45000       | Proofreader       | PR     |
|1203  | Masthanvali  | 40000       | Technical writer  | TP     |
|1204  | Krian        | 40000       | Hr Admin          | HR     |
|1205  | Kranthi      | 30000       | Op Admin          | Admin  | 
+------+--------------+-------------+-------------------+--------+
```
Câu truy vấn sau lấy chi tiết của nhân viên sử dụng điều kiện bên dưới:
```
hive> SELECT * FROM employee WHERE salary>30000;
```
Khi thực thi thành công câu truy vấn, bạn sẽ nhận được response sau đây:
```
+------+--------------+-------------+-------------------+--------+
| ID   | Name         | Salary      | Designation       | Dept   |
+------+--------------+-------------+-------------------+--------+
|1201  | Gopal        | 45000       | Technical manager | TP     |
|1202  | Manisha      | 45000       | Proofreader       | PR     |
|1203  | Masthanvali  | 40000       | Technical writer  | TP     |
|1204  | Krian        | 40000       | Hr Admin          | HR     |
+------+--------------+-------------+-------------------+--------+
```

**JDBC Program**
JDBC Program để áp dụng mệnh đề where cho ví dụ đã cho như sau:
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveQLWhere {
   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);
      
      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");
      
      // create statement
      Statement stmt = con.createStatement();
      
      // execute statement
      Resultset res = stmt.executeQuery("SELECT * FROM employee WHERE salary>30000;");
      
      System.out.println("Result:");
      System.out.println(" ID \t Name \t Salary \t Designation \t Dept ");
      
      while (res.next()) {
         System.out.println(res.getInt(1) + " " + res.getString(2) + " " + res.getDouble(3) + " " + res.getString(4) + " " + res.getString(5));
      }
      con.close();
   }
}
```
Lưu chương trình trong một file có tên HiveQLWhere.java. Sử dụng câu lệnh sau để compile và thực thi chương trình:
```
$ javac HiveQLWhere.java
$ java HiveQLWhere
```

**Output:**

```
ID       Name           Salary      Designation          Dept
1201     Gopal          45000       Technical manager    TP
1202     Manisha        45000       Proofreader          PR
1203     Masthanvali    40000       Technical writer     TP
1204     Krian          40000       Hr Admin             HR
```

# 2. SELECT - Order by 
ORDER BY được sử dụng để lấy chi tiết dựa trên một cột và sắp xếp kết quả với thứ tự tăng dần hoặc giảm dần.
## Syntax 
Dưới đây là cú pháp của ORDER BY:

```
SELECT [ALL | DISTINCT] select_expr, select_expr, ... 
FROM table_reference 
[WHERE where_condition] 
[GROUP BY col_list] 
[HAVING having_condition] 
[ORDER BY col_list]] 
[LIMIT number];
```

## Example 
Chúng ra sẽ lấy một ví dụ cho SELECT...ORDER BY. Giả sử bảng employee được cho như bên dưới, với các trường Id, Name, Salary, Designation và Dept. Tạo một câu truy vấn để lấy chi tiết của nhân viên được sắp xếp dựa trên tên Department.
```
+------+--------------+-------------+-------------------+--------+
| ID   | Name         | Salary      | Designation       | Dept   |
+------+--------------+-------------+-------------------+--------+
|1201  | Gopal        | 45000       | Technical manager | TP     |
|1202  | Manisha      | 45000       | Proofreader       | PR     |
|1203  | Masthanvali  | 40000       | Technical writer  | TP     |
|1204  | Krian        | 40000       | Hr Admin          | HR     |
|1205  | Kranthi      | 30000       | Op Admin          | Admin  |
+------+--------------+-------------+-------------------+--------+
```

Câu truy vấn lấy chi tiết của employee với ý định như đã đề cập bên trên:
```
hive> SELECT Id, Name, Dept FROM employee ORDER BY DEPT;
```

Khi thực thi thành công câu truy vấn, bạn sẽ thấy response như sau:
```
+------+--------------+-------------+-------------------+--------+
| ID   | Name         | Salary      | Designation       | Dept   |
+------+--------------+-------------+-------------------+--------+
|1205  | Kranthi      | 30000       | Op Admin          | Admin  |
|1204  | Krian        | 40000       | Hr Admin          | HR     |
|1202  | Manisha      | 45000       | Proofreader       | PR     |
|1201  | Gopal        | 45000       | Technical manager | TP     |
|1203  | Masthanvali  | 40000       | Technical writer  | TP     |
+------+--------------+-------------+-------------------+--------+
```

**JDBC Program**

Đây là chương trình JDBC áp dụng ORDER BY cho ví dụ bên trên.
```
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.DriverManager;

public class HiveQLOrderBy {
   private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";
   
   public static void main(String[] args) throws SQLException {
   
      // Register driver and create driver instance
      Class.forName(driverName);
      
      // get connection
      Connection con = DriverManager.getConnection("jdbc:hive://localhost:10000/userdb", "", "");
      
      // create statement 
      Statement stmt = con.createStatement();
      
      // execute statement
      Resultset res = stmt.executeQuery("SELECT * FROM employee ORDER BY DEPT;");
      System.out.println(" ID \t Name \t Salary \t Designation \t Dept ");
      
      while (res.next()) {
         System.out.println(res.getInt(1) + " " + res.getString(2) + " " + res.getDouble(3) + " " + res.getString(4) + " " + res.getString(5));
      }
      
      con.close();
   }
}
```

Lưu chương trình trong một file tên là HiveQLOrderBy.java. Sử dụng câu lệnh sau để biên dịch và thực thi chương trình này:
```
$ javac HiveQLOrderBy.java
$ java HiveQLOrderBy
```

**Output**

```
ID       Name           Salary      Designation          Dept
1205     Kranthi        30000       Op Admin             Admin
1204     Krian          40000       Hr Admin             HR
1202     Manisha        45000       Proofreader          PR
1201     Gopal          45000       Technical manager    TP
1203     Masthanvali    40000       Technical writer     TP
1204     Krian          40000       Hr Admin             HR
```

Vậy là đã kết thúc nội dung phần 1 về HiveQL, phần 2 mình sẽ trình bày nốt về GROUP BY và JOINS, cùng đón xem nhé!