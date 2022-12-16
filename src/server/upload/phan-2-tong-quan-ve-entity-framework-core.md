Tiếp nối phần 1: https://viblo.asia/p/phan-1-tong-quan-ve-entity-framework-core-4dbZNQNaKYM


### 1. Nhắc lại kiến thức phần 1

-  Entity Framework Core là một Object Relational Mapping (ORM) framework giúp dễ dàng truy xuất và lưu trữ dữ liệu trong database thông qua việc ánh xạ database thành các objects tương ứng trong code.

![image.png](https://images.viblo.asia/a5b0a02f-2a09-4bcc-a38d-cbde39d4f5e8.png)

-  Các hướng tiếp cận trong EntityFramework Core:
![image.png](https://images.viblo.asia/0d2ab987-c938-40d1-8ee7-47c9bed9788a.png)

### 2. Sử dụng EF Core theo hướng Code First

- Code first là cách tiếp cận dựa vào việc tạo các đối tượng (domain classes) bằng code C# trước. Sau đó Entity Framework sẽ tạo cơ sở dữ liệu từ code c#.
![image.png](https://images.viblo.asia/743c6cce-81b9-44a0-9a97-45d24ff2ebef.png)

- Các bước tạo database bằng EF Core code first: 
1.  Install EF Core DB provider (Microsoft.EntityFrameworkCore.SqlServer)
1.  Install EF Core tools (Entity Framework Core Tools)
1.  Create models and DBContext class
1.  Run command line in package manager console để tạo database từ code c#.

**Chi tiết**
- Create models and DBContext class.
![image.png](https://images.viblo.asia/7efda5a9-81c5-4a7b-b9e4-9dd0062d5ab0.png)

![image.png](https://images.viblo.asia/9c65b48f-872f-409a-8712-855f9c8734ab.png)

![image.png](https://images.viblo.asia/ca60970a-5759-44a4-acfb-33a9f668e89e.png)

- Run command line in package manager console để generate database.
Trong Visual Studio, chọn menu Tools -> NuGet Package Manger -> Package Manger Console. Chạy lệnh bên dưới:
- Tạo script: add-migration migrationScriptName
- Chạy script để update vào database: update-database –verbose
- Ví dụ:
     - add-migration EFCoreCodeFirstDB
    - update-database –verbose

### 3.  Ánh xạ kiểu dữ liệu từ c# sang Sql server 
![image.png](https://images.viblo.asia/bb1cdacf-868f-4c96-9c17-babf0f5c473c.png)

### 4. Sử dụng Data Annotation Attributes để chú thích dữ liệu

- Dùng để set các thuộc tính liên quan đến database như key, column name, table name, length, type… khi tạo database
https://www.entityframeworktutorial.net/code-first/dataannotation-in-code-first.aspx

![image.png](https://images.viblo.asia/33e080e7-71e3-4d23-9332-fba2b845f908.png)

### 5. Update database
- Sau khi chỉnh sửa model hoặc dbcontext để update database ta chạy lệnh dưới:
- Tạo script: add-migration migrationScriptName
- Chạy script để update vào database: update-database –verbose
- Ví dụ:
     - add-migration editLengthOfColumn
    - update-database –verbose

### 6. Tạo các table có mối quan hệ 

* Mối quan hệ một - một
* Mối quan hệ nhiều - nhiều (tạo table trung gian)
* Mối quan hệ một - nhiều

Ví dụ mối quan hệ một - nhiều giữa 2 table

![image.png](https://images.viblo.asia/85b7e4a2-2d12-4771-8b65-235434489ea7.png)

![image.png](https://images.viblo.asia/a7fc2250-213c-41b8-96c0-4feed793f838.png)

![image.png](https://images.viblo.asia/0b543c9f-d684-4a52-84c4-070bcd3ec4ad.png)

### 7. Linq to entities

- Sử dụng Linq to entities để truy vấn dữ liệu.
![image.png](https://images.viblo.asia/82934f3e-de84-4738-b55d-7c275273a086.png)

- Sử dụng sql profiler để xem câu query chạy bên dưới khi dùng linq to entities
![image.png](https://images.viblo.asia/a2bcc910-c423-4b7d-9e51-31e87d3f0267.png)

### 8. Eager loading trong EF core
- Eager loading cho phép khi query dữ liệu từ một Entity và ta có thể tải các entity liên quan như một phần của câu query, mà không phải thực hiện một câu query riêng.
- EF Core cung cấp phương thức InClude()
![image.png](https://images.viblo.asia/5523ece1-d123-43cd-a8c9-d8e554ea7ec5.png)

### 9. Lazy loading trong EF core

- Lazy loading cho phép trì hoãn việc tải các dữ liệu liên quan, cho đến khi bạn yêu cầu.
- Lazy loading đối lập hoàn toàn với Eager loading (tải toàn bộ).

- Có 2 cách sử dụng lazy loading:
    - Sử dụng Proxies (package Microsoft.EntityFrameworkCore.Proxies)
    - Sử dụng interface ILazyLoader (https://docs.microsoft.com/en-us/ef/core/querying/related-data/lazy )


Sử dụng Proxies (package Microsoft.EntityFrameworkCore.Proxies)
1.  Cài đặt package Microsoft.EntityFrameworkCore.Proxies
1.  Config add lazy loading
1. Sử dụng thuộc tính Virtual cho các thuộc tính dữ liệu có quan hệ.

![image.png](https://images.viblo.asia/92f8e607-be4d-49e4-a0ea-ec1fb6269a02.png)

![image.png](https://images.viblo.asia/c45bc5d4-1297-40f4-b829-819205e09bd9.png)

### 10. Proxy design pattern (đọc thêm)
![image.png](https://images.viblo.asia/ba0312c3-c7ff-4dc9-9c22-0f36ace43e47.png)

https://refactoring.guru/design-patterns/proxy

![image.png](https://images.viblo.asia/9b095484-cc52-4ab7-b464-563c2067190a.png)

### 11. Explicit loading EF Core

- Explicit loading là cơ chế tải dữ liệu liên quan trong EF core. Hoạt động giống lazy loading, dữ liệu liên quan được tải riêng biệt sau khi tải dữ liệu chính. Tuy nhiên quá trình này không diễn ra tự động mà phải gọi phương thức tải dữ liệu.
- Sử dụng phương thức Load() để tải các entity liên quan.
- Sử dụng phương thức Query() để viết linq to entities lọc các đối tượng liên quan.


![image.png](https://images.viblo.asia/573732a7-f76a-4441-9a7f-b133e79007a8.png)

![image.png](https://images.viblo.asia/a276fedf-9dc6-476b-bec9-81693763f270.png)


### 12. Câu hỏi
* Entity framework core là gì? Phiên bản hiện tại mới nhất là bao nhiêu?
* Ưu điểm của entity framework core là gì?
* So sánh entity framework core với entity framework?
* Phân biệt code first và database first trong EF core?
* Phân biệt eager loading, lazy loading và explicit loading?

### 12. Bài tập về nhà

* Tạo database Blog gồm 2 table Post và Category có quan hệ 1-n.
* Cấu hình Lazy Loading sử dụng Proxy package.
* Xem lại và thực hành truy vấn dữ liệu bằng linq và các thao tác chỉnh sửa dữ liệu vào db (add, update, delete)


**Tham khảo:**
- https://xuanthulab.net/ado-net-gioi-thieu-ado-net-va-ket-noi-sql-server-voi-sqlconnection.html
- https://docs.microsoft.com/en-us/ef/efcore-and-ef6/
- docs.microsoft.com/en-us/ef/core/what-is-new/roadmap
- https://www.entityframeworktutorial.net/code-first/dataannotation-in-code-first.aspx
- https://docs.microsoft.com/en-us/ef/core/querying/related-data/lazy
- https://refactoring.guru/design-patterns/proxy
- https://code-maze.com/entity-framework-core-series
- https://www.learnentityframeworkcore.com/migrations/seeding