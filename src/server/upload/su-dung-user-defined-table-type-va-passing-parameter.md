### 1. Mở đầu:
Thông thường trong các funtion chúng ta thường insert 1 record vào database 1 lần. Nhưng có những trường hợp chúng ta cần insert nhiều record vào database. Khi đó chả lẽ chúng ta sẽ thực hiện vòng lặp để insert từng record hay sao. Rõ ràng là không rồi. Ở đây tôi xin giới thiệu 1 cách để thực hiện bài toàn trên. Đó là xử dụng user defined table type. Cụ thể tôi sẽ dùng SQL Server và C# trong bài viết này. 

### 2. Tạo một Table và một User Defined Table Type :

 ```SQL
 CREATE TABLE STUDENT
(
      StudentId INT NOT NULL,
      StudentName VARCHAR(100),
      Isdeleted BIT,
      PRIMARY KEY (StudentId)
)

GO

CREATE TYPE udtStudentType AS TABLE
(
      StudentId INT NOT NULL,
      StudentName VARCHAR(100),
      PRIMARY KEY (StudentId)
)
 ```
 
Và khi đó user defined table type sẽ được thấy như hình bên dưới

![](https://images.viblo.asia/c376c5df-bbd6-4703-aae6-9a68310e9b69.png)

 
 ### 3. Tạo một store procedure để thực hiện insert cho nhiều record:
 
 ```SQL
CREATE PROC uspInsertStudents
(@TempTable AS udtStudentType READONLY)
AS
BEGIN
      INSERT INTO STUDENT (StudentId,StudentName ,Isdeleted )
      SELECT StudentId, StudentName, 0 AS Isdeleted FROM @TempTable
END
```


 ### 4. Tạo Datatable trong C#:
 
 Tạo a DataTable giống với cấu trúc với user defined table type mà bạn đã định nghĩa ở trên. Và tất cả columns của the DataTable phải tương đồng với user defined table type
 
 ```C
 public static DataTable StudentTable()
{
    DataTable dt = new DataTable();
    dt.Columns.Add("StudentId", typeof(Int32));
    dt.Columns.Add("StudentName", typeof(string));
    return dt;
}
 ```

 ### 5. Passing parameter vào store procedure:
 
 ```C
 //Create Table
DataTable myTable = StudentTable(); 

// Add New Row to table
myTable.Rows.Add(1, "NamNV1");
myTable.Rows.Add(2, "NamNV2");
myTable.Rows.Add(3, "NamNV3");

SqlConnection connection = new SqlConnection("Data Source= DatabaseName;Initial Catalog=AdventureWorks;User Id=sa;Password=123456;");
connection.Open();
SqlCommand cmd = new SqlCommand("uspInsertStudents", connection);
cmd.CommandType = CommandType.StoredProcedure;

//Passing parameter to Store Procedure
SqlParameter sqlParam = cmd.Parameters.AddWithValue("@TempTable", myTable);
sqlParam.SqlDbType = SqlDbType.Structured; 
cmd.ExecuteNonQuery();
connection.Close();
 ```
 
  ### 6. Lời kết :
 Với cách thực hiện như trên ta đã cải thiện được performance cho bài toán cần insert nhiều record vào database. Vì nó vừa giúp bạn không cần phải mở kết nối nhiều lần trong vòng lặp và câu lệnh insert ... select ... from cũng sẽ có performance nhanh hơn nhiều so với insert từng record. Bạn cũng có thể thực hiện tương tự với các CSDL khác và ngôn ngữ khác như MySQL và Nodejs chẳng hạn. Chúc bạn thành công