Trong mẹo này, tôi trình bày cách bạn có thể viết các unit tests cho các MVC controller action truy cập cơ sở dữ liệu. Tôi chỉ cho bạn cách tạo các unit tests cho LINQ to SQL controller action của bạn.

Hầu hết các ứng dụng ASP.NET MVC mà tôi viết có chứa một lượng đáng kể code truy cập dữ liệu. Thông thường, tôi sử dụng Microsoft LINQ to SQL để thực hiện các thao tác với cơ sở dữ liệu. Làm cách nào để bạn kiểm tra mã truy cập dữ liệu này?

Có một số cách tiếp cận khác nhau mà bạn có thể thực hiện đối với vấn đề này:

(1) Không có code unit test cho truy cập dữ liệu.

(2) Tạo một cơ sở dữ liệu thử nghiệm khi unit test truy cập dữ liệu

(3) Giả mạo DataContext khi unit test truy cập dữ liệu.

Nhiều thành viên của cộng đồng Test-Driven Development sẽ cho rằng bạn không bao giờ nên unit test truy cập dữ liệu. Ví dụ, Michael Feathers trong cuốn sách xuất sắc của ông Working Workingively with Legacy Code cho rằng bạn không bao giờ nên unit test truy cập dữ liệu khi thực hành TDD. Theo Feathers, một bài unit test cần thực hiện trong vòng chưa đầy 1/10 giây. Vì mã truy cập dữ liệu quá chậm nên bạn không nên kiểm tra đơn vị đó.

Tùy chọn thứ hai là tạo cơ sở dữ liệu thử nghiệm mới mỗi khi bạn chạy unit test. Đây là cách tiếp cận mà tôi sẽ thực hiện trong mẹo này. Trong mẹo này, tôi sẽ chỉ cho bạn cách tạo cơ sở dữ liệu thử nghiệm từ một DataContext tự động.

Cuối cùng, bạn có thể giả mạo DataContext bằng một cơ sở dữ liệu trong bộ nhớ. Tôi thực sự nghĩ rằng cách tiếp cận này là cách tiếp cận tốt nhất. Cách tiếp cận này sẽ giữ cho Michael Feathers thỏa mãn vì nó cho phép bạn viết các bài unit test thực thi rất nhanh. Tôi dự định khám phá cách tiếp cận thứ ba này tại một mẹo trong tương lai.

## Ứng dụng web MVC truy cập dữ liệu đơn giản
Khi làm TDD, bạn nên viết các bài kiểm tra của mình trước và sau đó viết code lại với các bài kiểm tra. Cách tiếp cận này để xây dựng các ứng dụng buộc bạn viết mã của bạn từ góc độ của người sử dụng mã của bạn.

Bởi vì, trong mẹo này, tôi quan tâm đến việc chứng tỏ làm thế nào bạn có thể unit test code truy cập dữ liệu trong một ứng dụng ASP.NET MVC, tôi sẽ vi phạm điều khoản viết TDD tốt vì viết code của tôi trước tiên. Xin hãy tha thứ cho tôi vì sự vi phạm này.

HomeController trong Listing 1 cho thấy hai actions. action đầu tiên, có tên là Index(), trả về một tập hợp các bản ghi cơ sở dữ liệu về phim. action thứ hai, có tên là InsertMovie(), thêm một bộ phim mới vào cơ sở dữ liệu. Cả hai phương thức Index() và InsertMovie() đều sử dụng LINQ to SQL để truy cập cơ sở dữ liệu.

Lưu ý rằng lớp HomeController có hai hàm tạo. Hàm khởi tạo đầu tiên chấp nhận một LINQ to SQL DataContext như một tham số. Phương thức khởi tạo thứ hai là một hàm tạo tham số. Phương thức khởi tạo thứ hai này tạo ra một DataContext và chuyển nó tới hàm tạo đầu tiên.

Ý tưởng là hàm tạo parameterless sẽ được gọi trên lớp HomeController khi ứng dụng MVC đang chạy. Unit test sẽ tận dụng lợi thế của hàm khởi tạo lấy tham số DataContext. Bằng cách đó, một Unit test có thể vượt qua một DataContext thử nghiệm thay vì DataContext thực tế.

Listing 1 – HomeController.vb (VB.NET)

```
Imports Tip20
Public Class HomeController
    Inherits System.Web.Mvc.Controller
    Private _dataContext As MovieDataContext
    Public Sub New(ByVal dataContext As MovieDataContext)
        _dataContext = dataContext
    End Sub
    Public Sub New()
        Me.New(New MovieDataContext())
    End Sub
    Public Function Index() As ActionResult
        Dim movies = _dataContext.Movies.OrderByDescending(Function(m) m.Id)
        Return View(movies)
    End Function
    Public Function InsertMovie(ByVal title As String, ByVal director As String) As ActionResult
        Dim newMovie = New Movie()
        newMovie.Title = title
        newMovie.Director = director
        newMovie.DateReleased = DateTime.Parse("12/25/1966")
        _dataContext.Movies.InsertOnSubmit(newMovie)
        _dataContext.SubmitChanges()
        Return RedirectToAction("Index")
    End Function
End Class
```

Listing 1 – HomeController.cs (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tip20.Models;
namespace Tip20.Controllers
{
    public class HomeController : Controller
    {
        private MovieDataContext _dataContext;
        public HomeController(MovieDataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public HomeController()
            : this(new MovieDataContext())
        { }
        public ActionResult Index()
        {
            var movies = _dataContext.Movies.OrderByDescending(m => m.Id);
            return View(movies);
        }
        public ActionResult InsertMovie(string title, string director)
        {
            var newMovie = new Movie();
            newMovie.Title = title;
            newMovie.Director = director;
            newMovie.DateReleased = DateTime.Parse("12/25/1966");
            _dataContext.Movies.InsertOnSubmit(newMovie);
            _dataContext.SubmitChanges();
            return RedirectToAction("Index");
        }
    }
}
```

## Tạo một DataContext Unit Test Base Class
Vậy làm thế nào để bạn tạo các unit test cho lớp HomeController? Trong phần này, tôi giải thích cách bạn có thể tạo một lớp DataContextUnitTest cơ bản mà bạn có thể sử dụng làm lớp base cho unit testing controller action sử dụng LINQ to SQL.

Lớp DataContextUnitTest được chứa trong Liệt kê 2.
Listing 2 – DataContextUnitTest.vb (VB.NET)

```
Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Text
Imports System.Data.Linq
Imports Microsoft.VisualStudio.TestTools.UnitTesting
Imports System.Data.SqlClient
Imports System.Reflection
Imports System.IO
Public MustInherit Class DataContextUnitTest(Of T As DataContext)
    Private Const TestDBPath As String = "C:UsersswaltherDocumentsCommon ContentBlogTip20 Linq to SQL CreateDatabaseVBTip20TestsApp_DataTest.mdf"
    Private privateTestDataContext As T
    Protected Property TestDataContext() As T
        Get
            Return privateTestDataContext
        End Get
        Set(ByVal value As T)
            privateTestDataContext = value
        End Set
    End Property
    <TestInitialize()> _
    Public Sub Initialize()
        Me.CreateTestDB()
    End Sub
    Public Sub CreateTestDB()
        Dim testConnectionString = GetTestConnectionString()
        ' Need to use reflection here since you 
        ' cannot use Generics with a contructors that require params
        Dim types() As Type = {GetType(String)}
        Dim typeValues() As Object = {testConnectionString}
        Me.TestDataContext = CType(GetType(T).GetConstructor(types).Invoke(typeValues), T)
        Me.RemoveTestDB()
        Me.TestDataContext.CreateDatabase()
    End Sub
    <TestCleanup()> _
    Public Sub Cleanup()
        Me.RemoveTestDB()
    End Sub
    Protected Sub RemoveTestDB()
        If Me.TestDataContext.DatabaseExists() Then
            Me.TestDataContext.DeleteDatabase()
        End If
    End Sub
    Private Shared Function GetTestConnectionString() As String
        Dim conBuilder = New SqlConnectionStringBuilder()
        conBuilder.AttachDBFilename = TestDBPath
        conBuilder.DataSource = ".SQLExpress"
        conBuilder.IntegratedSecurity = True
        conBuilder.UserInstance = True
        Return conBuilder.ConnectionString
    End Function
End Class
```

Listing 2 – DataContextUnitTest.cs (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Data.SqlClient;
using System.Reflection;
using System.IO;
public abstract class DataContextUnitTest<T> where T: DataContext
{
    const string TestDBPath = @"C:UsersswaltherDocumentsCommon ContentBlogTip20 Linq to SQL CreateDatabaseCSTip20TestsApp_DataTest.mdf";
    protected T TestDataContext { get; set; }
    [TestInitialize]
    public void Initialize()
    {
        this.CreateTestDB();
    }
    public void CreateTestDB()
    {
        var testConnectionString = GetTestConnectionString();
        // Need to use reflection here since you 
        // cannot use Generics with a contructors that require params
        Type[] types = {typeof(string)};
        Object[] typeValues = { testConnectionString };
        this.TestDataContext = (T)typeof(T).GetConstructor(types).Invoke(typeValues);
        this.RemoveTestDB();
        this.TestDataContext.CreateDatabase();
    }
    [TestCleanup]
    public void Cleanup()
    {
        this.RemoveTestDB();
    }
    protected void RemoveTestDB()
    {
        if (this.TestDataContext.DatabaseExists())
            this.TestDataContext.DeleteDatabase();
    }
    private static string GetTestConnectionString()
    {
        var conBuilder = new SqlConnectionStringBuilder();
        conBuilder.AttachDBFilename = TestDBPath;
        conBuilder.DataSource = @".SQLExpress";
        conBuilder.IntegratedSecurity = true;
        conBuilder.UserInstance = true;
        return conBuilder.ConnectionString;
    }
}
```

Trước khi bạn có thể sử dụng lớp DataContextUnitTest, bạn cần thêm references đến các phiên bản System.Data.Linq và System.Data vào dự án thử nghiệm của bạn.

Lưu ý rằng lớp DataContextUnitTest là một lớp chung. Khi tạo một thể hiện của lớp, bạn phải chỉ định kiểu DataContext mà lớp đó đại diện. Biến T đại diện cho một loại DataContext.

Lưu ý nữa, lớp DataContextUnitTest bao gồm một hằng số có tên TestDBPath. Bạn đặt hằng số này thành đường dẫn nơi bạn muốn tạo cơ sở dữ liệu thử nghiệm của mình. Hãy nhớ sửa đổi hằng số này nếu bạn tải xuống code cho mẹo này và muốn sử dụng lớp DataContextUnitTest trong các dự án của riêng bạn.

Lớp DataContextUnitTest bao gồm một phương thức, có tên là Initialize(), với thuộc tính TestInitialize. Thuộc tính này làm cho phương thức được thực thi trước mỗi unit test. Phương thức Initialize() tạo ra một DataContext thử nghiệm mới và tạo ra một cơ sở dữ liệu mới. Cơ sở dữ liệu mới được tạo ra bằng cách gọi phương thức CreateDatabase() của lớp DataContext.

Lớp DataContextUnitTest cũng bao gồm một phương thức Cleanup() với thuộc tính TestCleanup. Sau khi unit test được thực hiện, cơ sở dữ liệu thử nghiệm sẽ bị hủy. Phương thức DataContext.DeleteDatabase() được sử dụng để hủy file cơ sở dữ liệu.

Bạn có thể sử dụng lớp DataContextUnitTest làm lớp cơ sở cho bất kỳ unit test nào cái mà kiểm tra truy cập dữ liệu của controller. Ví dụ, lớp trong Liệt kê 3 chứa hai bài unit test cho lớp HomeController. Các phương thức unit test, có tên là IndexMovieCount() và IndexInsertMovie(), với thuộc tính TestMethod.

Listing 3 – HomeControllerTest.vb (VB.NET)

```
Imports System
Imports System.Collections.Generic
Imports System.Text
Imports System.Web.Mvc
Imports Microsoft.VisualStudio.TestTools.UnitTesting
Imports Tip20
<TestClass()> Public Class HomeControllerTest
    Inherits DataContextUnitTest(Of MovieDataContext)
    Public Function CreateTestMovie(ByVal title As String, ByVal director As String) As Movie
        Dim newMovie = New Movie()
        newMovie.Title = title
        newMovie.Director = director
        newMovie.DateReleased = DateTime.Parse("12/25/1966")
        Return newMovie
    End Function
    Public Sub AddTestData()
        Dim newMovie1 = Me.CreateTestMovie("Star Wars", "George Lucas")
        Me.TestDataContext.Movies.InsertOnSubmit(newMovie1)
        Dim newMovie2 = Me.CreateTestMovie("Ghost Busters", "Ivan Reitman")
        Me.TestDataContext.Movies.InsertOnSubmit(newMovie2)
        Me.TestDataContext.SubmitChanges()
    End Sub
    <TestMethod()> _
    Public Sub IndexMovieCount()
        ' Arrange
        Me.AddTestData()
        Dim controller As New HomeController(Me.TestDataContext)
        ' Act
        Dim result As ViewResult = TryCast(controller.Index(), ViewResult)
        ' Assert
        Dim model = CType(result.ViewData.Model, IQueryable(Of Movie))
        Assert.AreEqual(2, model.Count())
    End Sub
    <TestMethod()> _
    Public Sub IndexInsertMovie()
        ' Arrange
        Dim controller As New HomeController(Me.TestDataContext)
        ' Act
        Dim title = "King Kong"
        Dim director = "Peter Jackson"
        controller.InsertMovie(title, director)
        ' Assert
        Dim results = From m In Me.TestDataContext.Movies _
                      Where m.Title = title AndAlso m.Director Is director _
                      Select m
        Assert.AreEqual(1, results.Count())
    End Sub
End Class
```

Listing 3 – HomeControllerTest.cs (C#)

```
using System;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tip20.Controllers;
using Tip20.Models;
using System.Data.Linq;
using System.Linq;
namespace Tip20Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest : DataContextUnitTest<MovieDataContext>
    {
        public Movie CreateTestMovie(string title, string director)
        {
            var newMovie = new Movie();
            newMovie.Title = title;
            newMovie.Director = director;
            newMovie.DateReleased = DateTime.Parse("12/25/1966");
            return newMovie;
        }
        public void AddTestData()
        {
            var newMovie1 = this.CreateTestMovie("Star Wars", "George Lucas");
            this.TestDataContext.Movies.InsertOnSubmit(newMovie1);
            var newMovie2 = this.CreateTestMovie("Ghost Busters", "Ivan Reitman");
            this.TestDataContext.Movies.InsertOnSubmit(newMovie2);
            this.TestDataContext.SubmitChanges();
        }
        [TestMethod]
        public void IndexMovieCount()
        {
            // Arrange
            this.AddTestData();
            HomeController controller = new HomeController(this.TestDataContext);
            // Act
            ViewResult result = controller.Index() as ViewResult;
            // Assert
            var model = (IQueryable<Movie>)result.ViewData.Model;
            Assert.AreEqual(2, model.Count());
        }
        [TestMethod]
        public void IndexInsertMovie()
        {
            // Arrange
            HomeController controller = new HomeController(this.TestDataContext);
            // Act
            var title = "King Kong";
            var director = "Peter Jackson";
            controller.InsertMovie(title, director);
            // Assert
            var results = from m in this.TestDataContext.Movies
                          where m.Title == title && m.Director == director select m;
            Assert.AreEqual(1, results.Count());
        }
    }
}
```

Lưu ý rằng lớp HomeControllerTest xuất phát từ lớp base DataContextUnitTest. Kiểu MovieDataContext được chuyển đến lớp base chung.

Phương thức unit test đầu tiên, IndexMovieCount(), xác minh rằng controller action Index() trả về một tập hợp các bản ghi phim từ cơ sở dữ liệu một cách chính xác. Đầu tiên, phương thức thử nghiệm chèn hai phim vào cơ sở dữ liệu. Tiếp theo, phương thức HomeController.Index() được gọi. Số lượng bản ghi được trả về bởi phương thức Index() được xác minh. Nếu hai bản ghi được trả về, thử nghiệm là một thành công.

Phương thức unit test thứ hai, IndexInsertMovie(), kiểm tra xem một bản ghi phim mới có được chèn chính xác vào cơ sở dữ liệu hay không. Phương thức này gọi  HomeController.InsertMovie() để thêm một bộ phim mới. Tiếp theo, phương thức test sẽ cố gắng lấy lại chính xác cùng một bản ghi từ cơ sở dữ liệu thử nghiệm.

## Tóm lược
Trong mẹo này, tôi đã trình diễn một cách tiếp cận cho các unit test cho MVC controller action truy cập cơ sở dữ liệu. Tôi đã chứng minh làm thế nào bạn có thể tạo ra một cơ sở dữ liệu thử nghiệm từ một LINQ to SQL DataContext tự động. Tôi đã chỉ cho bạn cách bạn có thể tạo một lớp base chuẩn cho các unit testing controller action thực hiện các truy vấn LINQ to SQL.

Nguồn: http://stephenwalther.com/archive/2008/07/15/asp-net-mvc-tip-20-how-to-unit-test-data-access