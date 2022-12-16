Đối với các lập trình viên .Net thì có lẽ là đã quá quen thuộc với các thư viện làm việc với **MS SQL SERVER** như là **ADO.NET** hoặc **Entity Framwork**.

Cùng điểm lại một vài nét khác nhau giữa 2 cái này.

**ADO.NET**:  Để access đên database ta phải sử dụng  dataset, datatable, datareader, datatables, command, và  connection objects.
Sử dụng SQL queries hoặc store procedure để thao tác với dữ liệu. 

**Entity Framwork**:   Là một object relational mapping, sử dụng LinQ để access đến database và query SQL sẽ được tự động sinh ra theo  LinQ query.

**Sự khác nhau cơ bản nhất chính là:**

**ADO.NET**  thao tác bằng các SQL Queries vì vậy có thể dễ dàng chỉnh sửa, tunning câu sql theo ý muốn để nâng cao performance. 
Tuy nhiên data trả về của ADO.NET là DataTable hoặc là DataReader, để convert thành các object model thì cần phải
có thêm 1 lớp helper trung gian.

**Entity framework** làm việc với Database thông qua LINQ. LinQ queries sẽ tự động biên dịch thành các câu SQL Squery. Vì vậy việc sửa đổi cũng như chỉnh sửa trực tiếp SQL là khó khăn so với ADO.NET.  Tuy nhiên vì là ORM nên dữ liệu trả về sẽ tự mộng
mapping vào các entity object. 

Qua phân tích ở trên có thể thấy được điểm lợi và hại. ADO.NET cho performance nhanh hơn. Dễ dàng chỉnh sửa SQL query tuy nhiên lại mất thời gian để mapping, convert dữ liệu trả về.
Entity framework  tự động mapping dữ liệu tuy nhiên chỉnh sửa,  tunning sql cải thiện performace thì lại khó khăn hơn.

Vậy làm cách nào để có thể vừa thao tác với Database bằng các câu sql queries trực tiếp vừa có thể tự động mapping. Câu trả lời đó là Dapper ORM

**Dapper là gì ?**

Dapper là một Object Relational Mapper, nó là một thư viện xây dựng trên nền ADO.NET data reader. Nói một cách khác Dapper là một thư viện mở rộng của ADO.NET (extend của lớp IDbConnection) tuy nhiên lại được bổ sung thêm các tính năng của ORM.

Khi sử dụng ADO.NET để để convert datareader thành một object model chúng ta thường sử dụng các delegate để thao tác. Dapper đã xây dựng các method library để tự động thực hiện các việc này cho chúng ta thông qua các lớp metadata.
 

**Dapper làm việc như thế nào**: 

Gồm 3 bước (Về cơ bản khi làm việc với Dapper nó sẽ hoàn toàn giống với mọi khái niệm ở ADO.NET )

>           1/ Khởi tạo một IDbConnection object với tham số là 1 connection String
> 
>           2/ Viết SQL query thực hiện các thao tác CRUD
> 
>           3/Truyền SQL query như là một tham số vào method của dapper,  (Execute, Query)
>           

**Một số Dapper Features** 
  
* Dapper - Execute
  
      Thực thị câu lệnh 1 hoặc thể nhiều lần.Giá trị trả về là affected rows khi execute thành công.
      
    Các câu lệnh có thể truyền vào Method Execute như bên dưới :
    ```

         Stored Procedure
         
         INSERT statement
         
         UPDATE statement
         
         DELETE statement
         

* Dapper - Query

        Thực thi 1 câu lệnh Select và Mapping kết quả trả về với object
    
    Giống như Entity Framework Dapper hỗ trợ các hàm sau để thực thi truy vấn

    ```
    QueryFirst

    QueryFirstOrDefault

    QuerySingle

    QuerySingleOrDefault

    QueryMultiple
    ```


*  Dapper - Parameters
    
    Để truyền parameter cho SQL Queries. Dapper sử dụng 4 cách sau 
    
        Anonymous : Anonymous object
         
         Dynamic: dùng DynamicParameters. tương tự SQL Parameter của ADO.NET
         
         List: Truyền vào 1 mảng các giá trị. Dùng cho Select với IN
         
         String: Dùng DbString  để truyền vào dạng text.
 
     Đầu vào param của Dapper type là object nên ngoài việc truyền vào 1 strong type cụ thể chúng ta có thể truyền và 1 anonymous object
     Điều này khá là thuận và nhanh chóng khi pass params mà không cần phải tạo 1 object type cụ thể.

* Dapper - Result

    Dapper sẽ trả về các kiểu dữ liệu như bên dưới 
    
        Anonymous: Nếu không quy định (ép kiểu) về 1 object cụ thể nào. Dapper sẽ trả về 1 anonymous object

         Strongly Typed: Chỉ định object cần được mapping. Dữ liệu trả về sẽ tự động mapping vào object

         Multi-Mapping: Sử dụng để mapping kết quả trả với với các object model có relation ship

         Multi-Result: Dapper hỗ trợ việc chạy nhiều select queries cùng 1 câu lệnh. Sử dụng Read để bóc tách dữ liệu cho từng object

         Multi-Type: Dapper hỗ trợ chỉ định object model nào sẽ được mapping với kết quả. 
         
         
> 1 số ví dụ :
 
```
 string sql = "INSERT INTO Customers (CustomerName) Values (@CustomerName);";

using (var connection = new SqlConnection(FiddleHelper.GetConnectionStringSqlServerW3Schools()))
{
	connection.Open();

	var affectedRows = connection.Execute(sql,
	new[]
	{
	new {CustomerName = "John"},
	new {CustomerName = "Andy"},
	new {CustomerName = "Allan"}
	}
);

Console.WriteLine(affectedRows);
```

```
string sql = "SELECT TOP 10 * FROM OrderDetails";

using (var connection = new SqlConnection(FiddleHelper.GetConnectionStringSqlServerW3Schools()))
{			
	var orderDetails = connection.Query<OrderDetail>(sql).ToList();

	Console.WriteLine(orderDetails.Count);

	FiddleHelper.WriteTable(orderDetails);
}
    
```

   
Ngoài các tính năng ở trên Dapper xây dựng thêm 1 thực viện khác là Dapper Plus
Thư viện này xây dựng tương đối giống với cách mà entity framework làm việc.
Thêm vào đó Dapper hỗ trợ các method Async. Giúp phát triển các chương trình bất đồng bộ 1 cách dễ dàng.


Các bạn có thể tham khảo toàn bộ tài liệu ở đây: https://dapper-tutorial.net/