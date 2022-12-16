### 1.  Giới thiệu về Entity Framework Core
Entity Framework Core (EF Core) là một framework ánh xạ cơ sở dữ liệu - đối tượng mới cho .NET. Nó hỗ trợ các truy vấn LINQ, theo dõi thay đổi, cập nhật và thay đổi cấu trúc.
EF Core hoạt động với SQL Server/ SQL Azure, SQLite, Azure Cosmos DB, MySQL, PostgreSQL và nhiều cơ sở dữ liệu khác thông qua mô hình plugin của cơ sở dữ liệu.

### 2.  Giới thiệu về Entity Framework 6
Entity Framework 6 (EF6) là một framework ánh xạ quan hệ đối tượng được thiết kế cho .NET Framework nhưng có hỗ trợ .NET Core. 
EF6 là một sản phẩm ổn định, được hỗ trợ, nhưng không còn được phát triển tích cực.

### 3. So sánh Entity Framework Core và Entity Framework 6
EF Core cung cấp các tính năng mới sẽ không được triển khai trong EF6. Tuy nhiên, không phải tất cả các tính năng EF6 hiện đều được triển khai trong EF Core.
Các bảng sau đây so sánh các tính năng có sẵn trong EF Core và EF6. Đây là một phép so sánh cấp cao và không liệt kê mọi tính năng hoặc giải thích sự khác biệt giữa cùng một tính năng trong các phiên bản EF khác nhau.

#### Tạo model

| Tính năng |EF 6.4 | EF Core |
| -------- | -------- | -------- |
| Basic class mapping	    | Yes     | 1.0     |
| Basic class mapping	    | Yes     | 1.0     |
|Constructors with parameters	|	2.1|
|Property value conversions	|	2.1|
|Mapped types with no keys	|	2.1|
|Conventions|	Yes|	1.0|
|Custom conventions|	Yes|	1.0 (partial)|
|Data annotations|	Yes|	1.0|
|Fluent API|	Yes|	1.0|
|Inheritance: Table per hierarchy (TPH)|	Yes|	1.0|
|Inheritance: Table per type (TPT)|	Yes|	Planned for 5.0 |
|Inheritance: Table per concrete class (TPC)|	Yes|	Stretch for 5.0 (1)|
|Shadow state properties|	|	1.0|
|Alternate keys|	|	1.0|
|Many-to-many navigations|	Yes|	Planned for 5.0 |
|Many-to-many without join entity|	Yes|	On the backlog|
|Key generation: Database|	Yes|	1.0|
|Key generation: Client|	|	1.0|
|Complex/owned types|	Yes|	2.0|
|Spatial data|	Yes|	2.2|
|Model format: Code|Yes|	1.0|
|Create model from database: Command line|	Yes|	1.0|
|Update model from database|	Partial|	On the backlog|
|Global query filters|	|	2.0|
|Table splitting|	|Yes	|2.0|
|Entity splitting	|Yes	|Stretch for 5.0 (#620) (1)|
|Database scalar function mapping	|Poor	|2.0|
|Field mapping|		|1.1|
|Nullable reference types (C# 8.0)|		|3.0|
|Graphical visualization of model	|Yes|	No support planned (2)|
|Graphical model editor|	Yes	|No support planned (2)
|Model format: EDMX (XML)|	Yes	|No support planned (2)
|Create model from database: VS wizard|	Yes	|No support planned (2)

#### Truy xuất dữ liệu
| Tính năng |EF 6.4 | EF Core |
| -------- | -------- | -------- |
|LINQ queries|	Yes	|1.0                                           |
|Readable generated SQL|	Poor	|1.0                               |
|GroupBy translation|	Yes	|2.1                                   |
|Loading related data: Eager|	Yes	|1.0                           |
|Loading related data: Eager loading for derived types	|	|2.1   |
|Loading related data: Lazy	|Yes|	2.1                               |
|Loading related data: Explicit	|Yes|	1.1                           |
|Raw SQL queries: Entity types|	Yes	|1.0                           |
|Raw SQL queries: Keyless entity types	|Yes	|2.1                   |
|Raw SQL queries: Composing with LINQ	||	1.0                   |
|Explicitly compiled queries|	Poor	|2.0                       |
|await foreach (C# 8.0)	||	3.0                                   |
|Text-based query language (Entity SQL)	|Yes	|No support planned (2)|

#### Lưu dữ liệu
| Tính năng |EF 6.4 | EF Core |
| -------- | -------- | -------- |
|Change tracking: Snapshot|	Yes	|1.0|
|Change tracking: Notification|	Yes|	1.0|
|Change tracking: Proxies|	Yes|	Merged for 5.0|
|Accessing tracked state|	Yes	|1.0|
|Optimistic concurrency	|Yes|	1.0|
|Transactions	|Yes|	1.0|
|Batching of statements||		1.0|
|Stored procedure mapping|	Yes|	On the backlog |
|Disconnected graph low-level APIs|	Poor	|1.0|
|Disconnected graph End-to-end	|	|1.0 |

#### Tính năng khác
| Tính năng |EF 6.4 | EF Core |
| -------- | -------- | -------- |
|Migrations|	Yes|	1.0|
|Database creation/deletion APIs|	Yes	|1.0|
|Seed data	|Yes|	2.1|
|Connection resiliency	|Yes|	1.1|
|Interceptors	|Yes	|3.0|
|Events	|Yes	|3.0 (partial)|
|Simple Logging (Database.Log)|	Yes	|Merged for 5.0 |
|DbContext pooling	|	|2.0|
#### Các cơ sở dữ liệu được hỗ trợ
| Tính năng |EF 6.4 | EF Core |
| -------- | -------- | -------- |
|SQL Server	|Yes|	1.0|
|MySQL	|Yes|	1.0|
|PostgreSQL	|Yes|	1.0|
|Oracle|Yes	|1.0|
|SQLite|	Yes	|1.0|
|SQL Server Compact|	Yes	|1.0 (4)|
|DB2	|Yes|	1.0|
|Firebird	|Yes	|2.0|
|Jet (Microsoft Access)||		2.0 (4)|
|Azure Cosmos DB	||	3.0|
|In-memory (for testing)	||	1.0|

<br>
Chú thích:<br>
(1):  Chưa có khả năng xuất hiện đối với một bản phát hành nhất định. Tuy nhiên sẽ sớm xuất hiện trong lương lai.<br>
(2): Một số tính năng của EF6 sẽ không được triển khai trong EF Core.<br>
(3): Cơ sở dữ liệu dành cho EF Core do bên thứ ba triển khai có thể bị trì hoãn trong việc cập nhật lên các phiên bản mới của EF Core.<br>
(4): SQL Server Compact và Jet chỉ hoạt động trên .NET Framework (không phải trên .NET Core).

### 4. Nền tảng hỗ trợ

EF Core 3.1 chạy trên .NET Core và .NET Framework, thông qua việc sử dụng .NET Standard 2.0. Tuy nhiên, EF Core 5.0 sẽ không chạy trên .NET Framework.
EF6.4 chạy trên .NET Core và .NET Framework, thông qua gói đa mục tiêu(multi-targeting.).

### 5. Kết luận

Trên đây là một số so sánh giữa EF Core và EF6. Mỗi framwork đều có ưu và nhược điểm. Trong tương lai, dần dần EF Core sẽ có đủ các tính năng của EF6 nhưng tại thời điểm hiện tại EF6 có thể sẽ hoạt động ổn định hơn.
Vậy nên các bạn có thể dựa vào các so sánh và nhu cầu bản thân để lựa chọn framwork hợp lý với project của mình hiện tại và mong bài viết của mình có thể hỗ trợ các bạn một phần để đưa ra quyết định.