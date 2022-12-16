### 1. Giao tiếp C# với database và các nguồn dữ liệu khác.

- Sử dụng thư viện ADO.NET (ActiveX Data Object) là thư viện được xây dựng sẵn trong .NET cho phép ứng dụng kết nối với các nguồn dữ liệu khác nhau và thực hiện các hành động (Get, Add, Update, Delete) trên nguồn dữ liệu đó.

![image.png](https://images.viblo.asia/69c61d3f-609b-4eba-b00b-671405b083ea.png)

**Ví dụ sử dụng ADO.NET để connect với database và đọc dữ liệu:**
```csharp
public class AdoNetCSharp
    {
        public void Run()
        {
            var connectionString = "Server=127.0.0.1; Initial Catalog=ADONETEXAMPLE; User ID=testado; Password=testado.net; Application Name=Test ADP.NET";
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "Select * From Users";

                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        var sUserId = reader["UserId"].ToString();
                        var username = reader["Username"].ToString();
                        var password = reader["Password"].ToString();
                        var fullName = reader["Fullname"] != null ? reader["Fullname"].ToString() : string.Empty;
                        var sState = reader["State"].ToString();

                        Console.WriteLine("{0}=={1}=={2}=={3}=={4}", sUserId, username, password, fullName, sState);
                    }
                }
            }
        }
    }
```

- Sử dụng các ORM như Entity Framework Core, Dapper... 

### 2. ORM -  Object Relational Mapping
- ORM (Object Relational Mapping) là một kỹ thuật giúp ánh xạ cơ sở dữ liệu sang các đối tượng trong các ngôn ngữ lập trình: Java, C#, PHP....

**Ví dụ:**
- Ánh xạ table Person, các column, kiểu dữ liệu trong database sang Class Person trong C#.
![image.png](https://images.viblo.asia/37b9229f-f30f-4a1e-a1f9-929103bb0874.png)



- Một số ORM phổ biến:
    - C#: Entity Framework core, Dapper,...
    - Java: Hibernate
   - PHP: Propel or Doctrine
    - Python: the Django ORM or SQLAlchemy


![image.png](https://images.viblo.asia/d724d0e6-2a1d-4d8c-908a-5151a135bcaf.png)

### 3. So sánh ADO.NET và ORM

- ADO.NET
    - Công nghệ đầu tiên của microsoft ra đời lâu, hiện nay ít project xài.
    - Khó sử dụng và phải có kiến thức về query database để viết query trong code C#.
    - Tốc độ nhanh do thực thi câu query trực tiếp. (Viết query or store procedure ở code C# => Dùng ADO.NET execute query đó, không cần phải qua tầng trung gian)
- Entity Framework
    - Công nghệ mới, nhiều dự án hiện nay đang sử dụng.
    - Cú pháp dễ sử dụng + anh xạ được các object từ database sang code C# theo OOP nên code clear, đọc dễ hiểu.
    - Tốc độ không nhanh bằng ADO.NET do phải qua các tầng trung gian. (Viết code C# bằng Entity Framework => Tầng trung gian xử lý => Tạo ra câu query => Database thực thi)

**Note:** Để đo tốc độ ta có thể dùng: BenchMark trong .NET

Link: https://benchmarkdotnet.org/articles/overview.html

### 4. Entity framework core là gì?
- **Entity Framework Core** là một **Object Relational Mapping (ORM)** framework giúp dễ dàng truy xuất và lưu trữ dữ liệu trong database thông qua việc ánh xạ database thành các objects tương ứng trong code.
![image.png](https://images.viblo.asia/d724d0e6-2a1d-4d8c-908a-5151a135bcaf.png)

- EF Core on GitHub: https://github.com/aspnet/EntityFrameworkCore
- EF Core Roadmap: docs.microsoft.com/en-us/ef/core/what-is-new/roadmap

### 5. Một số đặc điểm của Entity framework core
- Là một ORM
- Là phiên bản mới của Entity Framework 6.x (https://docs.microsoft.com/en-us/ef/efcore-and-ef6/)
- Open source
- Nhẹ hơn Entity Framework => tốc độ nhanh hơn (performance)

![image.png](https://images.viblo.asia/b3c57e17-cfe0-4b34-b64d-25ae4c9d3746.png)

### 6. Entity framework core hỗ trợ các database nào?
- **Entity framework core** hỗ trợ cho phép làm việc với nhiều loại database. Để làm việc với từng loại ta phải instal các **database provider** qua NuGet packages.
    - SQL Server (Microsoft.EntityFrameworkCore.SqlServer)
    - MySQL (MySql.Data.EntityFrameworkCore)
    - PostgreSQL
    - Oracle
    - SQLite (mobile)
    - SQL Server Compact
    - DB2
    - Firebird
    - Jet (Microsoft Access)
    - Azure Cosmos DB
    - In-memory (for testing) (Microsoft.EntityFrameworkCore.InMemory)

### 7. Install Entity Framework core
**Nuget packet**
- EF Core DB provider (Microsoft.EntityFrameworkCore.SqlServer)
- EF Core tools (https://microsoft.entityframeworkcore.tools/)

### 8. Các hướng tiếp cận trong EntityFramework Core

- Database first vs code first
![image.png](https://images.viblo.asia/5890f299-da38-485b-afc4-fea83e2f7caf.png)

### 9. Sử dụng EF Core theo hướng Database First
1. Install EF Core DB provider (Microsoft.EntityFrameworkCore.SqlServer)
2. Install EF Core tools (https://microsoft.entityframeworkcore.tools/)
3. Create database
4. Get connection string
5. Run command line in package manager console

Install
- 1. EF Core DB provider (Microsoft.EntityFrameworkCore.SqlServer)
- 2. EF Core tools (Microsoft.EntityFrameworkCore.Tools)
![image.png](https://images.viblo.asia/50f4fba9-9f66-471d-ae23-3b42c50957e4.png)

- 3. Create database
![image.png](https://images.viblo.asia/1573fb06-f68f-4c6c-8087-9d6d1596e431.png)

- 4. Get connection string
![image.png](https://images.viblo.asia/55785300-b235-450f-8ede-4992642ebb47.png)

![image.png](https://images.viblo.asia/7f7bc5a9-f3f3-4372-8761-d06d30f9a13a.png)

- 5. Run command line in package manager console

Trong Visual Studio, chọn menu Tools -> NuGet Package Manger -> Package Manger Console. Chạy lệnh bên dưới:
- **Scaffold-DbContext [-Connection] [-Provider] [-OutputDir]**

**Ví dụ:** Scaffold-DbContext "Data Source=LONGNGUYENDH\SQLEXPRESS;Initial Catalog=EFCore;User ID=sa;Password=123;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models

- Kết quả:

![image.png](https://images.viblo.asia/47ee0296-5e11-43ba-8ed7-2ddc4734886c.png)

![image.png](https://images.viblo.asia/7d3ee991-3093-40bf-bf65-7551fd0d9a34.png)

### 10. Ánh xạ kiểu dữ liệu từ c# sang Sql server và ngược lại
![image.png](https://images.viblo.asia/24f6b1db-3831-4aaa-adb9-2eb4057fc4e9.png)

### 11. DBContext class là gì?
- Là một class của EntityFrameworkCore giúp query và quản lý các model (Entity) được ánh xạ từ DB.

     - Quản lý các connection tới Database
    - Quản lý model (entity) và mối quan hệ giữa chúng.
    - Query lấy dữ liệu từ database
    - Save dữ liệu xuống database
    - …..

![image.png](https://images.viblo.asia/0338e2fe-b873-401d-a81c-6243010b4550.png)

Đọc thêm về class DBContext:https://docs.microsoft.com/en-us/ef/core/dbcontext-configuration/

### 12. DBSET là gì?
- DBSet là một class đại diện cho một entity(model) trong database. 
- Ta có thể thực hiện các thao tác với DataSet:
    - Query dữ liệu
    - Thêm, xóa, sửa dữ liệu
![image.png](https://images.viblo.asia/67b87b0b-1b07-42e3-8080-f5512a8f4807.png)

### 13. Get dữ liệu (Sử dụng Linq to entities)
![image.png](https://images.viblo.asia/4a64abaf-01e7-4d4b-b91a-50f60709ae20.png)


### 14. Bài tập về nhà:

1. Thiết kế database cho trang Blog (Gợi ý gồm các table: Post, Category, User...)
2. Thực hành sử dụng Entity Framework Core theo hướng Database First để tạo ra code C#.
3. Viết function lấy danh sách toàn bộ bài viết. Bên ngoài gọi function và sử dụng foreach để in Name của bài post ra màn hình.
4. Viết function lấy bài viết theo Id. Bên ngoài gọi function này và in Name + description ra màn hình.
5. Viết function lấy danh sách toàn bộ bài viết bằng ADO.NET. Sử dụng tool BenchMark để so sánh tốc độ khi sử dụng Entity Framework Core và ADO.NET.
(https://benchmarkdotnet.org/articles/overview.html)

### 15. Tham khảo
- https://xuanthulab.net/ado-net-gioi-thieu-ado-net-va-ket-noi-sql-server-voi-sqlconnection.html
- (https://docs.microsoft.com/en-us/ef/efcore-and-ef6/
-  docs.microsoft.com/en-us/ef/core/what-is-new/roadmap