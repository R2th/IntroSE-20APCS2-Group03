Security Testing là một phần quan trọng trong phát triển phần mềm, nhằm đảm bảo các hệ thống và ứng dụng không có bất kỳ lỗ hổng nào có thể gây ra các tổn thất về bảo mật-an toàn thông tin.

Mục đích của Kiểm thử bảo mật là xác định các mối đe dọa, điểm yếu và các lỗ hổng trong hệ thống mà dẫn đến rò rỉ thông tin. Nó giúp xác định tất cả các rủi ro về an toàn bảo mật trong hệ thống và giúp các nhóm phát triển phần mềm trong việc khắc phục các vấn đề này.

Tìm hiểu về các kĩ thuật tấn công trong Security Testing, phổ biến nhất hiện nay có: SQL Injection, Cross-Site Scripting (XSS), Security Misconfiguration,...Trong bài viết này, tôi sẽ ghi lại những hiểu biết của mình về SQL Injection.

### 1. SQL Injection là gì?
SQL Injection là kỹ thuật tấn công làm biến đổi câu lệnh truy vấn ban đầu, bằng cách inject các mã SQL query/command vào giá trị input trước khi chuyển cho ứng dụng web xử lí. Hậu quả là có thể khai thác dữ liệu từ database, phá hủy database, hoặc gây ra các lỗ hổng bảo mật: bạn có thể login mà không cần username và password, remote execution...Công cụ dùng để tấn công là một trình duyệt web bất kì.

### 2. Cơ chế tấn công của SQL Injection
2.1 SQL Injection Based on 1=1 is Always True
* Giả sử: Lỗi SQL Injection ở trang Login, có 2 fields input

    username: (textbox)
    
    password: (textbox)
    ![](https://images.viblo.asia/e287b49b-26b4-4710-b273-573c3f85c534.png)
* Source code

    ```
    uName = getRequestString("username");
    uPass = getRequestString("password");
    sql = 'SELECT * FROM Users WHERE Name ="' + uName + '" AND Pass ="' + uPass + '"'
    ```

    Result: `SELECT * FROM Users WHERE Name ="myUserName" AND Pass ="myPass"`

* Input SQL Injection
    username nhập " OR 1=1
    password nhập " OR 1=1
    ![](https://images.viblo.asia/ccda923a-fb8e-4ca6-94f9-da6190ae0ed1.png)
    Câu lệnh truy vấn sẽ là: 
    
    `SELECT * FROM Users WHERE Name ="" OR 1=1 AND Pass ="" OR 1=1`
    
 Như vậy, câu lệnh trên là hợp lệ vì **OR 1 = 1 luôn là TRUE** và người dùng đăng nhập bất hợp pháp (không cần UserName và Password) sẽ được coi như người dùng hợp lệ.
 
2.2 SQL Injection Based on ""="" is Always True
*  Giả sử truy vấn để lấy thông tin của người dùng từ userID
    Có 1 field input là userID: (textbox)
    ![](https://images.viblo.asia/1017bc77-cae8-4674-9dd2-793627e28bcb.png)
*  Source code
    ```
    userid = getRequestString("userID");
    sql = "SELECT * FROM Users WHERE UserId = " + userid;
    ```
    
    Result: `SELECT * FROM Users WHERE UserId = 2018`
*  Input SQL Injection
      UserId nhập 2018 OR ""="
      ![](https://images.viblo.asia/b47672d9-d465-4100-8a0d-8a1e6dafe70f.png)
      Câu lệnh truy vấn sẽ biến dạng thành:
      
      `SELECT * FROM Users WHERE UserId = 2018 OR ""="";`
      
Câu lệnh trên sẽ trả ra tất cả các hàng từ bảng "Users" vì OR ""="" luôn là TRUE,và hacker có thể truy cập lấy cắp thông tin của tất cả user khác.

2.3 SQL Injection Based on Batched SQL Statements

Hầu hết các database đều cho phép batched SQL statement. Một batch là nhóm gồm hai hoặc nhiều câu lệnh SQL, được phân tách bằng dấu chấm phẩy. 

Example:

```
SELECT * FROM Users; DROP TABLE Suppliers
userid = getRequestString("userID");
sql = "SELECT * FROM Users WHERE UserId = " + userid;
```
   
Giả sử, input SQL Injection như sau:

![](https://images.viblo.asia/6a3f895c-1e60-447e-954f-d342212bb0f9.png)

Câu lệnh SQL sẽ trả ra thông tin User có UserId = 2018 từ bảng Users, và vấn đề nguy hiểm là xóa luôn cả bảng Suppliers

    SELECT * FROM Users WHERE UserId = 2018; DROP TABLE Suppliers;
    
### 3. Sử dụng SQL Parameters để ngăn chặn SQL Injection
Để bảo vệ một trang web khỏi tấn công của SQL Injection, có thể sử dụng các SQL Parameters.Các SQL Parameters là các giá trị được thêm vào câu lệnh truy vấn SQL tại thời gian thực hiện, theo cách được kiểm soát. Các tham số này được biểu diễn là @0, @1, @2,... như một thư viện đã được hỗ trợ sẵn. 

Example 1:

```
txtUserId = getRequestString("UserId");
txtSQL = "SELECT * FROM Users WHERE UserId = @0";
db.Execute(txtSQL,txtUserId);
```

Công cụ SQL kiểm tra từng tham số để đảm bảo rằng nó là chính xác cho giá trị của mỗi trường và được xử lý theo nghĩa đen, và không phải là các câu lệnh đã bị biến đổi như trên.

Example 2: 

```
txtNam = getRequestString("CustomerName");
txtAdd = getRequestString("Address");
txtCit = getRequestString("City");
txtSQL = "INSERT INTO Customers (CustomerName,Address,City) Values(@0,@1,@2)";
db.Execute(txtSQL,txtNam,txtAdd,txtCit);
```