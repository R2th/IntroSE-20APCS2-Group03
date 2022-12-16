Trong mẹo này, tôi trình bày cách kiểm tra đơn vị (Unit Test) đối tượng LINQ to SQL DataContext bằng cách tạo một DataContext giả. Bạn có thể thực hiện các thao tác chèn, cập nhật, xóa và truy vấn LINQ to SQL tiêu chuẩn đối với Fake DataContext.

Tôi đã vật lộn trong vài tháng qua với các phương pháp unit testing MVC controllers trả về và cập nhật dữ liệu cơ sở dữ liệu. Tôi muốn unit test cơ sở dữ liệu truy cập code trong các ứng dụng ASP.NET MVC của mình dễ dàng nhất.

Tôi gần như bỏ cuộc cho đến khi Rob Conery ghé qua văn phòng của tôi và chỉ cho tôi một phương pháp dễ dàng để thực hiện các truy vấn LINQ to SQL dựa trên một tập hợp tiêu chuẩn. Khi tôi đã vượt qua rào cản đó, phần còn lại của quá trình xây dựng lớp FakeDataContext rất đơn giản (cảm ơn Rob!).

Trong mẹo này, tôi chỉ cách bạn có thể tạo một đối tượng LINQ to SQL DataContext có thể kiểm tra được. Đầu tiên, tôi trình bày cách bạn có thể tạo một wrapper cho đối tượng DataContext tiêu chuẩn. Bằng cách tạo một wrapper DataContext, bạn có thể lập trình dựa trên một lớp trừu tượng thay vì một lớp cụ thể.

Tiếp theo, tôi chỉ cho bạn cách bạn có thể giả mạo đối tượng DataContext với độ trung thực gần như đầy đủ. Chúng tôi tạo một FakeDataContext hỗ trợ chèn, xóa và các truy vấn LINQ to SQL tiêu chuẩn (lớp giả mạo của chúng tôi hỗ trợ giao diện IQueryable).

## Wrapping Up lớp DataContext
Bước đầu tiên cần thiết để tạo một đối tượng DataContext có thể kiểm tra là tạo một wrapper class. Đối tượng DataContext tiêu chuẩn không thực thi interface và nó không bắt nguồn từ một base class. Thậm chí tệ hơn, nó trả về các sealed Table classes. Điều này có nghĩa là chúng tôi không thể hoán đổi đối tượng DataContext cho một DataContext giả trong các bài kiểm tra đơn vị của chúng tôi.

Lớp wrapper DataContext có trong Liệt kê 1.

**Liệt kê 1 - DataContextWrapper.cs**
```
using System.Configuration;
using System.Data.Linq;
using System.Data.Linq.Mapping;
using System.Web.Configuration;
using System.Web.Hosting;

namespace MvcFakes
{
    public class DataContextWrapper : IDataContext
    {
        private DataContext _dataContext;

        public DataContextWrapper(string connectionStringName, string xmlMapPath)
        {
            var conSettings = WebConfigurationManager.ConnectionStrings[connectionStringName];
            if (conSettings == null)
                throw new ConfigurationErrorsException("Missing " + connectionStringName + " connection string in web configuration.");

            var map = XmlMappingSource.FromUrl(HostingEnvironment.MapPath(xmlMapPath));

            _dataContext = new DataContext(conSettings.ConnectionString, map);
        }

        public DataContextWrapper(string fileOrServerOrConnection)
        {
            _dataContext = new DataContext(fileOrServerOrConnection);
        }

        public DataContextWrapper(string fileOrServerOrConnection, MappingSource mapping)
        {
            _dataContext = new DataContext(fileOrServerOrConnection, mapping);
        }


        public void SubmitChanges()
        {
            _dataContext.SubmitChanges();
        }

        public ITable<TEntity> GetTable<TEntity>() where TEntity:class
        {
            return new TableWrapper<TEntity>(_dataContext.GetTable<TEntity>());
        }


    }
}
```

Lớp DataContextWrapper trong Liệt kê 1 tạo một DataContext chuẩn trong phương thức khởi tạo của nó. Lớp thực hiện các phương thức giống như đối tượng DataContext tiêu chuẩn. Khi bạn gọi một phương thức của lớp DataContextWrapper, lớp này sẽ ủy quyền lời gọi cho lớp DataContext chuẩn.

Vậy tại sao phải wrap? Việc bao bọc lớp DataContext cho phép chúng ta thêm một giao diện vào lớp DataContext.

Lưu ý rằng DataContextWrapper thực thi một interface được gọi là interface IDataContext. interface này không phải là một phần tiêu chuẩn của .NET framework. interface này có trong Liệt kê 2.
**Liệt kê 2 – IDataContext.cs**

```
namespace MvcFakes
{
    public interface IDataContext
    {
        void SubmitChanges();

        ITable<TEntity> GetTable<TEntity>() where TEntity : class;
    }

}
```
interface trong Liệt kê 2 có hai phương thức: SubmitChanges () và GetTable (). Cả lớp DataContextWrapper và lớp FakeDataContext đều triển khai hai phương thức này.

Pattern được sử dụng ở đây là cùng một mẫu được sử dụng cho các lớp trong namespace System.Web.Abstraction. namespace này chứa các lớp bao bọc cho ASP.NET tiêu chuẩn như HtpContext, HttpResponse và HttpSessionState. Các wrappers thêm interfaces (và base classes)  vào các lớp ASP.NET tiêu chuẩn này.

## Tạo một DataContext giả mạo
Mã cho lớp Fake DataContext quá dài để đăng ở đây
https://docs.microsoft.com/en-us/ef/ef6/fundamentals/testing/mocking

Lớp FakeDataContext cũng triển khai giao diện IDataContext. FakeDataContext không tương tác với cơ sở dữ liệu thực. Thay vào đó, FakeDataContext tương tác với dữ liệu được lưu trữ trong bộ nhớ.

Bạn có thể thực hiện các hành động và truy vấn LINQ to SQL chuẩn đối với đối tượng FakeDataContext. Ví dụ, bài kiểm tra đơn vị trong Liệt kê 3 sử dụng đối tượng FakeDataContext. Đầu tiên, kiểm tra thêm dữ liệu vào FakeDataContext bằng cách sử dụng phương thức DataContext InsertOnSubmit() chuẩn. Tiếp theo, một truy vấn được thực hiện để trả về tất cả các bản ghi mà thuộc tính Title bắt đầu bằng chữ cái “S”. Nếu hai bản ghi được trả về, thì quá trình kiểm tra đã thành công.

**Liệt kê 3 - TestWhere ()**
```
[TestMethod]
public void TestWhere()
{
    // Arrange
    var dataContext = new FakeDataContext();

    // Act
    var table = dataContext.GetTable<Movie>();
    table.InsertOnSubmit(new Movie("Lion King", "Disney"));
    table.InsertOnSubmit(new Movie("King Kong", "Jackson"));
    table.InsertOnSubmit(new Movie("Star Wars", "Lucas"));
    table.InsertOnSubmit(new Movie("Superman", "Spelling"));
    dataContext.SubmitChanges();

    // Assert
    var movies = from m in table where m.Title.StartsWith("S") select m;
    Assert.AreEqual(2, movies.Count());

}
```
## Sử dụng DataContext giả mạo
Hãy xem cách chúng ta có thể sử dụng đối tượng FakeDataContext khi xây dựng một ứng dụng cơ sở dữ liệu Movie đơn giản. Home controller trong Liệt kê 4 chứa các hành động để hiển thị phim, chèn phim mới và cập nhật phim hiện có.

Liệt kê 4 - HomeController.cs
```
using System.Linq;
using System.Web.Mvc;
using MvcFakes;
using Tip33.Models;

namespace Tip33.Controllers
{
    public class HomeController : Controller
    {
        private IDataContext _dataContext;

        public HomeController():this(new DataContextWrapper("dbcon", "~/Models/Movie.xml"))
        {}

        public HomeController(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public ActionResult Index()
        {
            var table = _dataContext.GetTable<Movie>();
            var movies = from m in table select m;
            return View("Index", movies.ToList());
        }

        public ActionResult Create()
        {
            return View("Create");
        }

        public ActionResult Insert(string title, string director)
        {
            var newMovie = new Movie(title, director);
            _dataContext.GetTable<Movie>().InsertOnSubmit(newMovie);
            _dataContext.SubmitChanges();

            return RedirectToAction("Index");
        }

        public ActionResult Edit(int Id)
        {
            var table = _dataContext.GetTable<Movie>();
            var movie = table.SingleOrDefault(m=>m.Id==Id);
            return View("Edit", movie);
        }

        public ActionResult Update(int id, string title, string director)
        {
            var table = _dataContext.GetTable<Movie>();
            var movie = table.SingleOrDefault(m => m.Id == id);
            movie.Title = title;
            movie.Director = director;
            _dataContext.SubmitChanges();
            return RedirectToAction("Index");
        }

    }
}
```
Home controller trong Liệt kê 4 sử dụng Dependency Injection. Nó có hai hàm tạo. Một hàm tạo được sử dụng khi ứng dụng chạy. Một hàm tạo được sử dụng khi tạo controller trong bài kiểm tra đơn vị.

Khi HomeController được sử dụng trong production, hàm tạo không tham số được gọi. Bộ cấu trúc này tạo một thể hiện của lớp DataContextWrapper. Nó tạo một DataContext bằng cách chuyển hai giá trị đến phương thức khởi tạo DataContextWrapper. Giá trị đầu tiên đại diện cho tên chuỗi kết nối cơ sở dữ liệu (tên của một chuỗi kết nối trong tệp cấu hình web). Giá trị thứ hai là đường dẫn đến tệp ánh xạ XML ánh xạ các thuộc tính của lớp Movie tới các cột trong cơ sở dữ liệu.

Lưu ý rằng hàm tạo thứ hai không chấp nhận DataContextWrapper. Thay vào đó, nó chấp nhận bất kỳ lớp nào thực thi interface IDataContext. Ngoài ra, hãy lưu ý rằng chỉ interface IDataContext được sử dụng trong body của Home controller.

Bởi vì cả DataContext thực (DataContextWrapper) và FakeDataContext đều thực thi interface IDataContext, nên Home controller giống hệt nhau có thể được khởi tạo và thực thi với DataContext thật hoặc DataContext giả. Điều này làm cho Home controller rất dễ kiểm tra.

Nguồn: http://stephenwalther.com/archive/2008/08/17/asp-net-mvc-tip-33-unit-test-linq-to-sql