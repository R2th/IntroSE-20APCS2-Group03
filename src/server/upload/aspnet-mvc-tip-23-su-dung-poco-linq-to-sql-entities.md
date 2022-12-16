Trong mẹo này, tôi trình bày cách bạn có thể tạo LINQ to SQL entities không chứa bất kỳ thuộc tính đặc biệt nào. Tôi chỉ cho bạn cách có thể sử dụng tệp XML bên ngoài để ánh xạ các LINQ to SQL entities sang các đối tượng cơ sở dữ liệu.

Gần đây tôi đã nói chuyện với một số người, những người vô cùng băn khoăn về các lớp LINQ to SQL được tạo bởi Visual Studio Object Relational Designer chứa các thuộc tính. Họ muốn tận dụng Object Relational Designer để tạo các lớp entity của họ. Tuy nhiên, họ không thích entity là các thực thể được tạo ra  và có một loạt các thuộc tính.

Ví dụ: nếu bạn sử dụng Object Relational Designer để tạo lớp LINQ to SQL tương ứng với bảng cơ sở dữ liệu Movies, thì bạn sẽ nhận được lớp như trong Liệt kê 1. Lớp này được tạo trong tệp Movies.Designer.cs.

Listing 1 – Movie Class (abbreviated)

```
[Table(Name="dbo.Movies")]
public partial class Movie : INotifyPropertyChanging, INotifyPropertyChanged
{
    
    private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
    
    private int _Id;
    
    private string _Title;
    
   
    [Column(Storage="_Id", AutoSync=AutoSync.OnInsert, DbType="Int NOT NULL IDENTITY", IsPrimaryKey=true, IsDbGenerated=true)]
    public int Id
    {
        get
        {
            return this._Id;
        }
        set
        {
            if ((this._Id != value))
            {
                this.OnIdChanging(value);
                this.SendPropertyChanging();
                this._Id = value;
                this.SendPropertyChanged("Id");
                this.OnIdChanged();
            }
        }
    }
    
    
    [Column(Storage="_Title", DbType="NVarChar(100) NOT NULL", CanBeNull=false)]
    public string Title
    {
        get
        {
            return this._Title;
        }
        set
        {
            if ((this._Title != value))
            {
                this.OnTitleChanging(value);
                this.SendPropertyChanging();
                this._Title = value;
                this.SendPropertyChanged("Title");
                this.OnTitleChanged();
            }
        }
    }
    
}
```

Lưu ý rằng lớp trong Liệt kê 1 bao gồm cả hai thuộc tính [Table] và [Column]]. LINQ to SQL sử dụng các thuộc tính này để ánh xạ các lớp và thuộc tính vào các bảng cơ sở dữ liệu và các cột của bảng cơ sở dữ liệu.

Một số người cảm thấy phiền bởi các thuộc tính này. Họ không muốn trộn logic của họ với các entity chính. Họ muốn sử dụng các đối tượng POCO (Đối tượng CLR cũ) cho các entity của họ.

May mắn thay, LINQ to SQL hỗ trợ hai phương thức ánh xạ các lớp tới các đối tượng cơ sở dữ liệu. Thay vì sử dụng AttributionMappingSource mặc định, bạn có thể sử dụng XmlMappingSource. Khi bạn sử dụng XmlMappingSource, bạn sử dụng tệp XML bên ngoài để ánh xạ các lớp tới các đối tượng cơ sở dữ liệu.

Bạn có thể tạo tệp XML bằng tay hoặc bạn có thể sử dụng công cụ command line SqlMetal.exe. Bạn chạy SqlMetal.exe từ Command Prompt  của Visual Studio (Start, All Programs, Microsoft Visual Studio 2008, Visual Studio Tools, Visual Studio 2008 Command Prompt).

Dưới đây là cách bạn sử dụng SqlMetal.exe để tạo tệp ánh xạ XML từ cơ sở dữ liệu RANU SQL Express có tên MoviesDB.mdf:

1. Điều hướng đến thư mục chứa cơ sở dữ liệu MoviesDB.mdf

2. Thực hiện lệnh sau:

`SqlMetal /dbml:movies.dbml MoviesDB.mdf`

3. Thực hiện lệnh sau:

`SqlMetal /code:movies.cs /map:movies.map movies.dbml`

Sau khi bạn thực hiện các lệnh này, bạn sẽ kết thúc với ba tệp:

· Movies.dbml - Tệp markup cơ sở dữ liệu phim

· Movies.cs - Các lớp phim tương ứng với các đối tượng cơ sở dữ liệu

· Movies.map - Tệp XML ánh xạ các lớp tới các đối tượng cơ sở dữ liệu

Sau khi bạn tạo các tệp này, bạn có thể thêm tệp movies.cs và movies.map vào thư mục Models của ứng dụng ASP.NET MVC.

Tệp lớp C # Movie từ movies.cs được chứa trong Liệt kê 2. Tệp trong Liệt kê 2 gần giống hệt như tệp trong Liệt kê 1 ngoại trừ thực tế là tệp không chứa bất kỳ thuộc tính đặc biệt nào. Lớp Movie trong Liệt kê 2 là một đối tượng POCO.

Liệt kê 2 - Movie Class (viết tắt)

```
public partial class Movie : INotifyPropertyChanging, INotifyPropertyChanged
{   
    private int _Id;
    
    private string _Title;
       
    public int Id
    {
        get
        {
            return this._Id;
        }
        set
        {
            if ((this._Id != value))
            {
                this.OnIdChanging(value);
                this.SendPropertyChanging();
                this._Id = value;
                this.SendPropertyChanged("Id");
                this.OnIdChanged();
            }
        }
    }
    
    
 
    public string Title
    {
        get
        {
            return this._Title;
        }
        set
        {
            if ((this._Title != value))
            {
                this.OnTitleChanging(value);
                this.SendPropertyChanging();
                this._Title = value;
                this.SendPropertyChanged("Title");
                this.OnTitleChanged();
            }
        }
    }
} 
```
Tệp trong Liệt kê 3 chứa tệp ánh xạ XML được tạo bởi công cụ SqlMetal.exe. Bạn có thể tạo tập tin này bằng tay.
```
<?xml version="1.0" encoding="utf-8"?>
<Database Name="MoviesDB" xmlns="http://schemas.microsoft.com/linqtosql/mapping/2007">
  <Table Name="dbo.Movies" Member="Movies">
    <Type Name="Movie">
      <Column Name="Id" Member="Id" Storage="_Id" DbType="Int NOT NULL IDENTITY" IsPrimaryKey="true" IsDbGenerated="true" AutoSync="OnInsert" />
      <Column Name="Title" Member="Title" Storage="_Title" DbType="NVarChar(100) NOT NULL" CanBeNull="false" />
    </Type>
  </Table>
</Database>
```
Sau khi bạn tạo tệp ánh xạ XML bên ngoài, bạn phải chuyển tệp ánh xạ tới đối tượng DataContext khi bạn khởi tạo DataContext. Ví dụ, controller  trong Liệt kê 4 sử dụng tệp movies.map trong phương thức Index() của nó.

```
Listing 4 – HomeController.cs

using System.Data.Linq.Mapping;
using System.Linq;
using System.Web.Configuration;
using System.Web.Mvc;
 
namespace Tip23.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // Create data context
            var connectionString = WebConfigurationManager.ConnectionStrings["movies"].ConnectionString;
            var map = XmlMappingSource.FromUrl(Server.MapPath("~/Models/Movies.map"));
            var dataContext = new MoviesDB(connectionString, map);
            
            // Get movies
            var movies = from m in dataContext.Movies select m;
 
            // Return movies in view
            return View(movies.ToList());
        }
 
    
    }
}
```

Index () bắt đầu bằng cách truy xuất connection string từ file Web configuration. Tiếp theo, tệp ánh xạ XML được tải từ thư mục Models. connection string và nguồn ánh xạ được truyền đến hàm tạo DataContext khi DataContext được tạo. Cuối cùng, một danh sách các bộ phim được lấy từ cơ sở dữ liệu và gửi đến View.

Mục đích của mẹo này là chứng minh rằng bạn có thể sử dụng tệp XML bên ngoài thay vì các thuộc tính trong các lớp LINQ to SQL để ánh xạ các lớp tới các đối tượng cơ sở dữ liệu của bạn. Một số người không muốn làm xấu lớp của họ bằng cách viết logic tới cơ sở dữ liệu. LINQ to SQL đủ linh hoạt để làm cho những người này hài lòng.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-tip-23-use-poco-linq-to-sql-entities