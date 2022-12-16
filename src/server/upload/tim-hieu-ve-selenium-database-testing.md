**Tạo test data trong Database**

Đầu tiên hãy download và cài đặt database bằng cách truy cập link – “http://dev.mysql.com/downloads/”

Sau khi cơ sở dữ liệu được cài đặt thành công, người dùng có thể chạy MySQL Command Line Prompt như ảnh chụp màn hình sau đây. 

![](https://images.viblo.asia/bfd98278-fad2-42bb-a91f-186dcf3e2f76.jpg)

Ứng dụng có thể yêu cầu người dùng nhập Password. Password mặc định là root.

Bước tiếp theo là tạo test database với một vài bảng và bản ghi được lưu trữ trong các bảng đó để tạo kết nối với cơ sở dữ liệu và thực hiện các truy vấn.

Bước 1: Gõ "show databases" để xem tất cả các cơ sở dữ liệu đã có sẵn

![](https://images.viblo.asia/0769e2e5-0a6d-4588-88fc-7faa4dceb0c5.jpg)

Bước 2: Gõ "create database user;” tạo 1 database có tên là "user".

![](https://images.viblo.asia/0813b259-7ae5-4533-8368-fbb9ef41241c.jpg)

Bước 3: Gõ "use user;" để chọn cơ sở dữ liệu mới được tạo sau đó gõ "show tables;" để xem tất cả các bảng có sẵn trong cơ sở dữ liệu.

![](https://images.viblo.asia/bd3fa3eb-6eef-412f-ac0b-faae97fc684f.jpg)

Bước 4: Nhập lệnh sau để tạo 1 bảng có 4 cột (userId, userName, userAge, userAddress).

```
create table userinfo
(
userId int,
userName varchar(255),
userAge int,
userAddress varchar(255)
);
```

![](https://images.viblo.asia/f5958ef1-55d1-418f-80cd-6835a1e6b2e8.jpg)

Bước 5: Nhập lệnh sau để insert dữ liệu cho tất cả bốn trường cột (userId, userName, userAge, userAddress).

![](https://images.viblo.asia/714df1ea-a716-4478-85ab-7478e412aa62.jpg)

Tương tự, bạn có thể thêm nhiều dữ liệu vào bảng của mình và cũng có thể tạo các bảng khác. 

Như các bạn đã biết, Selenium WebDriver là một tool UI Automation. Do đó, một mình Selenium WebDriver không đủ điều kiện để thực hiện kiểm tra cơ sở dữ liệu nhưng điều này có thể được thực hiện bằng cách sử dụng Java Database Connectivity API (JDBC). API cho phép người dùng kết nối và tương tác với nguồn dữ liệu và tìm nạp dữ liệu với sự trợ giúp của automated queries. Để có thể khai thác API JDBC, bắt buộc phải có Java Virtual Machine (JVM) chạy trên hệ thống.

 JDBC Workflow

![](https://images.viblo.asia/9bad3cd5-0a71-43f2-b9d3-0aa634f0a8de.jpg)

Để thực hiện được việc kiểm thử CSDL, ta cần phải triển khai theo ba bước sau đây:

1. Tạo kết nối tới CSDL.
2. Thực hiện các câu truy vấn tới CSDL.
3. Xử lí kết quả.
4. Ngắt kết nối cơ sở dữ liệu.

Bây giờ chúng ta hãy kiểm tra test scenario manually sử dụng “MySQL command line”.

**Scenario:**

1) Mở Database server và kết nối với “user” database.

2) List down tất cả các bản ghi từ “userinfo” table.

![](https://images.viblo.asia/60549347-e88c-45eb-8d66-17cbf3b349b9.jpg)

3) Đóng Database connection.

Lưu ý rằng read query sẽ liệt kê tất cả dữ liệu người dùng có trong bảng userinfo. Bảng bao gồm các cột sau.

userId
username
userAge
userAddress

Kết quả cũng cho thấy chỉ có một tập dữ liệu duy nhất có trong bảng.

Bây giờ, chúng ta hãy thực hiện cùng một scenario bằng cách sử dụng Java Class.

Bước 1: Bước đầu tiên và quan trọng nhất là configure the project’s build path và thêm tệp “mysql-connector-java-3.1.13-bin.jar” vào thư viện bên ngoài.

Bước 2: Tạo một java class có tên là “DatabaseTesingDemo”.

Bước 3: Sao chép và dán mã dưới đây vào class được tạo ở bước trên.

```
1
import org.junit.After;
2
import org.junit.Before;
3
import org.junit.Test;
4
import java.sql.Connection;
5
import java.sql.DriverManager;
6
import java.sql.ResultSet;
7
import java.sql.Statement;
8
 
9
public class DatabaseTesingDemo {
10
       // Connection object
11
       static Connection con = null;
12
       // Statement object
13
       private static Statement stmt;
14
       // Constant for Database URL
15
       public static String DB_URL = "jdbc:mysql://localhost:3306/user";   
16
       // Constant for Database Username
17
       public static String DB_USER = "root";
18
       // Constant for Database Password
19
       public static String DB_PASSWORD = "root";
20
 
21
       @Before
22
       public void setUp() throws Exception {
23
              try{
24
                     // Make the database connection
25
                     String dbClass = "com.mysql.jdbc.Driver";
26
                     Class.forName(dbClass).newInstance();
27
                     // Get connection to DB
28
                     Connection con = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
29
                     // Statement object to send the SQL statement to the Database
30
                     stmt = con.createStatement();
31
                     }
32
                     catch (Exception e)
33
                     {
34
                           e.printStackTrace();
35
                     }
36
       }
37
 
38
       @Test
39
       public void test() {
40
              try{
41
              String query = "select * from userinfo";
42
              // Get the contents of userinfo table from DB
43
              ResultSet res = stmt.executeQuery(query);
44
              // Print the result untill all the records are printed
45
              // res.next() returns true if there is any next record else returns false
46
              while (res.next())
47
              {
48
                     System.out.print(res.getString(1));
49
              System.out.print("\t" + res.getString(2));
50
              System.out.print("\t" + res.getString(3));
51
              System.out.println("\t" + res.getString(4));
52
              }
53
              }
54
              catch(Exception e)
55
              {
56
                     e.printStackTrace();
57
              }     
58
       }
59
 
60
       @After
61
       public void tearDown() throws Exception {
62
              // Close DB connection
63
              if (con != null) {
64
              con.close();
65
              }
66
       }
67
}
```

Output của đoạn code trên là:

```
1      shruti 25     Noida
2      shrivastava   55     Mumbai
```

Trường hợp mệnh đề với điều kiện duy nhất

```
String query = “select * from userinfo where userId='” + 1 + “‘”;
ResultSet res = stmt.executeQuery(query);
```

Output:  

`1      shruti 25     Noida`

Trường hợp mệnh đề có nhiều điều kiện

```
String Address =”Mumbai”;
String query = “select * from userinfo where userId='” + 2 + “‘ and userAddress='”+Address+”‘”;
ResultSet res = stmt.executeQuery(query);
```

Output:

`2      shrivastava   55     Mumbai`

Theo cùng một cách người dùng có thể thực hiện các truy vấn khác nhau trên cơ sở dữ liệu.

Dưới đây là một số các phương thức người dùng có thể sử dụng:

***String getString():*** Phương thức dùng để lấy ra dữ liệu kiểu chuỗi từ tập kết quả

***int getInt()***	Phương thức dùng để lấy ra dữ liệu kiểu số nguyên từ tập kết quả

***float getFloat()***	Phương thức dùng để lấy ra dữ liệu kiểu float từ tập kết quả

***long getLong()***	Phương thức dùng để lấy ra dữ liệu kiểu long từ tập kết quả

***short getShort()***	Phương thức dùng để lấy ra dữ liệu kiểu short từ tập kết quả

***double getDouble()***	Phương thức dùng để lấy ra dữ liệu kiểu double từ tập kết quả

***Date getDate()***	Phương thức dùng để lấy ra dữ liệu kiểu date từ tập kết quả

***boolean next()***	Phương thức dùng để di chuyển tới bản ghi tiếp theo trong tập kết quả

***boolean previous()***	Phương thức dùng để di chuyển tới bản ghi trước đó trong tập kết quả

***boolean first()***	Phương thức dùng để di chuyển tới bản ghi đầu tiên trong tập kết quả

***boolean last()***	Phương thức dùng để di chuyển tới bản ghi cuối cùng trong tập kết quả

***boolean absolute(int rowNumber)***	Phương thức dùng để di chuyển tới một bản ghi nhất định trong tập kết quả

Link tham khảo: 

https://techblog.vn/kiem-thu-co-so-du-lieu-voi-selenium

Trên đây là chia sẻ của mình về Selenium Database Testing. Cám ơn các bạn đã đọc, rất mong bài viết của mình có thể giúp đỡ phần nào những vướng mắc của các bạn!