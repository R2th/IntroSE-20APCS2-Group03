Trong phần này chúng tôi sẽ giới thiệu cách bạn có thể tạo các unit testị cho các routes trong các ứng dụng ASP.NET MVC của bạn. Tôi chỉ ra làm thế nào để kiểm tra liệu một URL đang được ánh xạ tới đúngcontroller, action controller, và các tham số action.

Nếu bạn đang có hướng thử nghiệm khi xây dựng một ứng dụng ASP.NET MVC, sau đó bạn nên viết unit tests cho tất cả mọi thứ. Viết unit tests đầu tiên sau đó viết mã đáp ứng được bài kiểm tra. Lặp lại, lặp lại, lặp lại, buồn tẻ.

Routes là một phần rất quan trọng của một ứng dụng MVC. Một Route xác định cách một URL được ánh xạ tới một bộ controller và controller action cụ thể. Vì các Route là một phần quan trọng của một ứng dụng MVC, bạn cần viết các unit test cho các routes của bạn. Trong mẹo này, tôi chỉ cho bạn cách viết unit test cho các routes bằng cách giả mạo HTTP Context.

## Tạo Route Table
Bạn tạo các routes cho một ứng dụng MVC trong tệp Global.asax. Nói cách khác, chúng được định nghĩa trong lớp GlobalApplication. Tệp Global.asax mặc định được chứa trong Liệt kê 1.

Liệt kê 1 - Global.asax (VB.NET)

```
Public Class GlobalApplication
    Inherits System.Web.HttpApplication
    Shared Sub RegisterRoutes(ByVal routes As RouteCollection)
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}")
        ' MapRoute takes the following parameters, in order:
        ' (1) Route name
        ' (2) URL with parameters
        ' (3) Parameter defaults
        routes.MapRoute( _
            "Default", _
            "{controller}/{action}/{id}", _
            New With {.controller = "Home", .action = "Index", .id = ""} _
        )
    End Sub
    Sub Application_Start()
        RegisterRoutes(RouteTable.Routes)
    End Sub
End Class
```

Listing 1 — Global.asax (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
namespace DefaultOne
{
    public class GlobalApplication : System.Web.HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                "Default",                                              // Route name
                "{controller}/{action}/{id}",                           // URL with parameters
                new { controller = "Home", action = "Index", id = "" }  // Parameter defaults
            );
        }
        protected void Application_Start()
        {
            RegisterRoutes(RouteTable.Routes);
        }
    }
}
```

Theo mặc định, bạn sẽ có được một route được đặt tên, một cách thích hợp, route Mặc định. Tuyến này có URL và ánh xạ các đoạn khác nhau của URL tới một controller, controller action và thông số được truyền đến action như sau:

```
/Customer/Details/23

· Controller = Customer

· Action = Details

· Id = 24
```

Đoạn đầu tiên của URL được ánh xạ tới tên bộ controller, phân đoạn thứ hai của URL được ánh xạ tới controller action, và phân đoạn cuối cùng của URL được ánh xạ tới một tham số có tên Id.

Route Mặc định bao gồm các giá trị mặc định. Nếu bạn không chỉ định controller,controller Home sẽ được sử dụng. Nếu bạn không chỉ định một action, action Index được gọi. Nếu bạn không chỉ định một Id, một chuỗi rỗng được thông qua. Do đó, URL sau được giải thích như sau:

```
/

· Controller = Home

· Action = Index

· Id = “”
```

Đối với nhiều loại ứng dụng MVC, route mặc định này là duy nhất mà bạn sẽ cần. Tuy nhiên, bạn có tùy chọn tạo các route tùy chỉnh. Ví dụ: tệp Global.asax trong Liệt kê 2 bao gồm hai route tùy chỉnh.

Listing 2 – Global.asax (VB.NET)

```
Public Class GlobalApplication
    Inherits System.Web.HttpApplication
    Shared Sub RegisterRoutes(ByVal routes As RouteCollection)
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}")
        ' Route for blog archive
        routes.MapRoute("Archive", _
                        "Archive/{entryDate}", _
                        New With {Key .controller = "Blog", Key .action = "Details"}, _
                        New With {Key .entryDate = "d{2}-d{2}-d{4}"})
        ' Default route
        routes.MapRoute("Default", _
                        "{controller}/{action}/{id}", _
                        New With {Key .controller = "Home", Key .action = "Index", Key .id = ""})
        ' Catch all route
        routes.MapRoute("CatchIt", _
                        "Product/{*values}", _
                        New With {Key .controller = "Product", Key .action = "Index"})
    End Sub
    Sub Application_Start()
        RegisterRoutes(RouteTable.Routes)
    End Sub
End Class
```

Listing 2 – Global.asax (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
namespace Tip13
{
    public class GlobalApplication : System.Web.HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            // Route for blog archive
            routes.MapRoute(
                 "Archive", // Name 
                 "Archive/{entryDate}", // URL
                 new { controller = "Blog", action = "Details" }, // Defaults
                 new { entryDate = @"d{2}-d{2}-d{4}" } // Constraints
             );
            // Default route
            routes.MapRoute(
                "Default", // Name
                "{controller}/{action}/{id}",  // URL 
                new { controller = "Home", action = "Index", id = "" }  // Defaults
            );
            // Catch all route
            routes.MapRoute(
               "CatchIt", // Name
               "Product/{*values}",  // URL
               new { controller = "Product", action = "Index" } // Defaults
            );
        }
        protected void Application_Start()
        {
            RegisterRoutes(RouteTable.Routes);
        }
    }
}
```

Global.asax đã sửa đổi trong Liệt kê 2 chứa một route mới có tên Archive để xử lý các yêu cầu cho các mục blog giống như sau:

/archive/12-25-1966

route tùy chỉnh này sẽ ánh xạ URL này tới controller tên là Blog và gọi action Details (). Ngày được chuyển tới action Details() dưới dạng một tham số có tên entryDate.

Global.asax cũng định nghĩa một route catchell. Một route catchell là một route có thể chứa bất kỳ segments nào. Ví dụ, route catchall sẽ khớp:

```
/Product/a

/Product/a/b

/Product/a/b/c
```

Và cứ như vậy với bất kỳ segments nào.

## Unit Testing Custom Routes

Vậy làm cách nào để bạn kiểm tra các routes tùy chỉnh? Tôi không thể hiểu làm thế nào để làm điều đó cho đến khi tôi thấy một mẫu trong các unit tests MVC đi kèm với xUnit ( http://www.CodePlex.com/xUnit ). Để kiểm tra các routes tùy chỉnh, bạn cần phải giả mạo HTTP Context của mình.

Trong mẹo trước, tôi đã chỉ cho bạn cách sử dụng các đối tượng giả mạo giả khi kiểm tra đơn vị ASP.NET cơ bản như tsession, các tham số form, và các đặc tính và vai trò người dùng. Nếu bạn chưa đọc bài viết blog này, vui lòng điều hướng tới trang sau:

http://stephenwalther.com/blog/archive/2008/06/30/asp-net-mvc-tip-12-faking-the-controller-context.aspx

Sau khi xem xét mẫu xUnit, tôi đã sửa đổi các đối tượng context giả mạo để chúng có thể được sử dụng khi unit testing routes. Các unit testing trong Liệt kê 3 chứng tỏ làm thế nào để kiểm tra các routes tùy chỉnh chứa trong tệp Global.asax trong Liệt kê 2.

Listing 3 – RouteTests.vb (VB.NET)

```
Imports System
Imports System.Text
Imports System.Collections.Generic
Imports Microsoft.VisualStudio.TestTools.UnitTesting
Imports System.Web.Routing
Imports MvcFakes
Imports Tip13
<TestClass()> Public Class RouteTests
    <TestMethod()> _
    Public Sub TestDefaultRoute()
        ' Arrange
        Dim routes = New RouteCollection()
        GlobalApplication.RegisterRoutes(routes)
        ' Act
        Dim context = New FakeHttpContext("~/")
        Dim routeData = routes.GetRouteData(context)
        ' Assert
        Assert.AreEqual("Home", routeData.Values("controller"), "Default controller is HomeController")
        Assert.AreEqual("Index", routeData.Values("action"), "Default action is Index")
        Assert.AreEqual(String.Empty, routeData.Values("id"), "Default Id is empty string")
    End Sub
    <TestMethod()> _
    Public Sub TestGoodArchiveRoute()
        ' Arrange
        Dim routes = New RouteCollection()
        GlobalApplication.RegisterRoutes(routes)
        ' Act
        Dim context = New FakeHttpContext("~/Archive/12-25-1966")
        Dim routeData = routes.GetRouteData(context)
        ' Assert
        Assert.AreEqual("Blog", routeData.Values("controller"), "Controller is Blog")
        Assert.AreEqual("Details", routeData.Values("action"), "Action is Details")
        Assert.AreEqual("12-25-1966", routeData.Values("entryDate"), "EntryDate is date passed")
    End Sub
    <TestMethod()> _
    Public Sub TestBadArchiveRoute()
        ' Arrange
        Dim routes = New RouteCollection()
        GlobalApplication.RegisterRoutes(routes)
        ' Act
        Dim context = New FakeHttpContext("~/Archive/something")
        Dim routeData = routes.GetRouteData(context)
        ' Assert
        Assert.AreNotEqual("Blog", routeData.Values("controller"), "Controller is not Blog")
    End Sub
    <TestMethod()> _
    Public Sub TestCatchAllRoute()
        ' Arrange
        Dim routes = New RouteCollection()
        GlobalApplication.RegisterRoutes(routes)
        ' Act
        Dim context = New FakeHttpContext("~/Product/a/b/c/d")
        Dim routeData = routes.GetRouteData(context)
        ' Assert
        Assert.AreEqual("a/b/c/d", routeData.Values("values"), "Got catchall values")
    End Sub
End Class
```


Listing 3 – RouteTests.cs (C#)

```
using System;
using System.Web.Routing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MvcFakes;
using Tip13;
namespace Tip13Tests.Routes
{
    [TestClass]
    public class RoutesTest
    {
        [TestMethod]
        public void TestDefaultRoute()
        {
            // Arrange
            var routes = new RouteCollection();
            GlobalApplication.RegisterRoutes(routes);
            // Act
            var context = new FakeHttpContext("~/");
            var routeData = routes.GetRouteData(context);
            // Assert
            Assert.AreEqual("Home", routeData.Values["controller"], "Default controller is HomeController");
            Assert.AreEqual("Index", routeData.Values["action"], "Default action is Index");
            Assert.AreEqual(String.Empty, routeData.Values["id"], "Default Id is empty string");
        }
        [TestMethod]
        public void TestGoodArchiveRoute()
        {
            // Arrange
            var routes = new RouteCollection();
            GlobalApplication.RegisterRoutes(routes);
            // Act
            var context = new FakeHttpContext("~/Archive/12-25-1966");
            var routeData = routes.GetRouteData(context);
            // Assert
            Assert.AreEqual("Blog", routeData.Values["controller"], "Controller is Blog");
            Assert.AreEqual("Details", routeData.Values["action"], "Action is Details");
            Assert.AreEqual("12-25-1966", routeData.Values["entryDate"], "EntryDate is date passed");
        }
        [TestMethod]
        public void TestBadArchiveRoute()
        {
            // Arrange
            var routes = new RouteCollection();
            GlobalApplication.RegisterRoutes(routes);
            // Act
            var context = new FakeHttpContext("~/Archive/something");
            var routeData = routes.GetRouteData(context);
            // Assert
            Assert.AreNotEqual("Blog", routeData.Values["controller"], "Controller is not Blog");
        }
        [TestMethod]
        public void TestCatchAllRoute()
        {
            // Arrange
            var routes = new RouteCollection();
            GlobalApplication.RegisterRoutes(routes);
            // Act
            var context = new FakeHttpContext("~/Product/a/b/c/d");
            var routeData = routes.GetRouteData(context);
            // Assert
            Assert.AreEqual("a/b/c/d", routeData.Values["values"], "Got catchall values");
        }
    }
}
```

Đây là những  unit tests của Visual Studio Test (MS Test). Bạn có thể, tất nhiên, sử dụng một framework thử nghiệm khác nhau như NUnit hoặc xUnit. Đây là cách các unit test hoạt động.

Đầu tiên, một bộ sưu tập route mới được tạo ra và truyền cho phương thức RegisterRoutes () được định nghĩa trong tệp Global.asax. Tệp Global.asax tương ứng với một lớp có tên lớp GlobalApplication.

Tiếp theo, một HTTP Context giả mạo được tạo ra có chứa URL đang được thử nghiệm. Ví dụ: trong bài kiểm tra đầu tiên, URL ~/Archive/12-25-1966 được chuyển tới nhà xây dựng đối tượng HTTP Context giả mạo. Đối tượng HTTP Context giả mạo là một phiên bản được sửa đổi của các đối tượng MVC giả mạo mà tôi đã tạo trong Tip # 12. Những objects giả này được bao gồm trong project MvcFakes (tải xuống ở cuối bài viết này).

Tiếp theo, phương thức GetRouteData () được gọi với context giả mạo và dữ liệu route được trả về. Dữ liệu route đại diện cho kết quả được giải thích là truyền một URL tới bảng route của ứng dụng. Nói cách khác, dữ liệu route là những gì bạn nhận được sau khi URL được so sánh với các route trong bảng route.

Cuối cùng, bài kiểm tra khẳng định rằng các giá trị nhất định được chứa trong dữ liệu route. Trong trường hợp thử nghiệm đầu tiên, tên controller, controller action, và giá trị Id được xác minh. Theo bài kiểm tra này, URL trống ~/ nên được ánh xạ tới controller tên là Home, một action mang tên Index, và một Id có giá trị String.Empty.

Thử nghiệm thứ hai kiểm tra xem yêu cầu có giống như ~/Archive/12-25-1966 được ánh xạ tới controller có tên Blog, một action mang tên Details, và rằng một tham số tên là entryDate được tạo ra.

Thử nghiệm thứ ba kiểm tra xem yêu cầu có giống như ~/Archive/something không được ánh xạ tới controller Blog. Vì URL này không có ngày nhập hợp lệ, nên không được quản lý bởi controller Blog.

Thử nghiệm cuối cùng xác minh rằng catch-all route chính xác. Kiểm tra này kiểm tra rằng URL ~/Product/a/b/c/d được phân tích cú pháp để các giá trị tham số bằng a/b/c/d. Nói cách khác, nó kiểm tra toàn bộ phần catch-all route.

## Tóm lược
Trong mẹo này, tôi đã giới thiệu cho bạn một cách dễ dàng để kiểm tra các route ASP.NET MVC tùy chỉnh của bạn. Tôi khuyên bạn nên kiểm tra các route của bạn mỗi khi bạn sửa đổi đường dẫn mặc định được định nghĩa trong tệp Global.asax.

Bạn có thể tải về mã cho mẹo này, bao gồm dự án MvcFakes, bằng cách nhấp vào URL sau. Mã được bao gồm trong cả hai phiên bản VB.NET và C #.

http://stephenwalther.com/Downloads/Tips/Tip13/Tip13.zip

Nguồn: http://stephenwalther.com/archive/2008/07/02/asp-net-mvc-tip-13-unit-test-your-custom-routes