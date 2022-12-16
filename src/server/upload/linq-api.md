chúng ta có thể viết các truy vấn cho các class mà thực hiện thông qua các interface IEnumerable<T> hoặc Iqueryable<T>.  trong namespace System.Linq có chứa các class và interfaces dưới đây được yêu cầu cho truy vấn LINQ .
    
![](https://images.viblo.asia/2aab9244-d482-4502-a03d-352ff90459ce.png)
    
    
   Các truy vấn LINQ sử dụng các extension method cho các class mà thực hiện IEnumerable hoặc   IQueryable .  IEnumerable và  IQueryable là 2 class tĩnh mà chứa các phương thúc mở rộng để viết truy vấn LINQ.

# Enumeralbe:

Lớp Enumerable bao gồm các phương thức mở rộng cho các lớp thực hiện IEnumerable<T> interface, ví dụ như tất cả các lớp bộ sưu tập tích hợp thực hiện  IEnumerable <T> interface và do đó chúng ta có thể viết các truy vấn LINQ để lấy dữ liệu từ các collections.

Hình dưới đây cho thấy các phương thức mở rộng được bao gồm trong lớp Enumerable có thể được sử dụng với các bộ sưu tập chung trong C # hoặc VB.Net.
    
![](https://images.viblo.asia/674be77b-cc98-4c4e-9477-534a31d461f3.png)

    
    
Dưới đây là tập hợp tất cả các phương thức mở rộng có sẵn trong lớp Enumerable.
    
![](https://images.viblo.asia/e42cd373-3639-4e25-b1e0-38465689370d.png)


    
# Queryable
  
Lớp Queryable bao gồm các phương thức mở rộng cho các lớp thực hiện IQueryable<T> interface. IQueryable<T> interface được sử dụng để cung cấp các khả năng truy vấn đối với một nguồn dữ liệu cụ thể trong đó loại dữ liệu được biết đến. Ví dụ, API Entity Framework triển khai IQueryable<T> interface để hỗ trợ các truy vấn LINQ với cơ sở dữ liệu lót như MS SQL Server.

Ngoài ra, có các API có sẵn để truy cập dữ liệu của bên thứ ba; ví dụ: LINQ to Amazon cung cấp khả năng sử dụng LINQ với các dịch vụ web của Amazon để tìm kiếm sách và các mặt hàng khác. Điều này có thể đạt được bằng cách triển khai giao diện IQueryable cho Amazon.

Hình dưới đây cho thấy các phương thức mở rộng có sẵn trong lớp Truy vấn có thể được sử dụng với các nhà cung cấp dữ liệu gốc hoặc bên thứ ba khác nhau.
    
![](https://images.viblo.asia/59c152bb-c4a8-4175-9667-390f9db691bf.png)

    
 Hình dưới đây cho thấy các phương thức mở rộng có sẵn trong lớp Truy vấn.
    ![](https://images.viblo.asia/c83bbe70-2afd-44da-a3d7-af399cb09ba4.png)