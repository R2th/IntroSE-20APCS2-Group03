Trong mẹo này, tôi trình bày cách bạn có thể sử dụng view engine nVelocity, thay vì view engine Web Form bình thường, khi hiển thị các views từ một ứng dụng ASP.NET MVC.

Theo mặc định, bạn xây dựng các View cho một ứng dụng ASP.NET MVC bằng cách tạo các trang ASP.NET Web Form (các tệp .aspx). Bạn không cần phải làm điều này. Nếu muốn, bạn có thể hoán đổi Web Forms view engine và sử dụng view engine thay thế. Trong mẹo này, tôi trình bày cách bạn có thể sử dụng view engine nVelocity.

Tại sao bạn muốn sử dụng view engine nVelocity thay vì view engine Web Forms thông thường? Bạn có thể thấy vì một vài lý do khác nhau. Đầu tiên, nVelocity là một cổng của dự án Java Rapid Foundation Foundation Velocity với .NET framework. Nếu bạn đang migrate một ứng dụng Java hiện có sang .NET và ứng dụng hiện có được viết bằng template engine Velocity, thì việc sử dụng view engine nVelocity có thể làm cho quá trình migrate mượt mà hơn nhiều.

Thứ hai, bạn có thể thích cú pháp mẫu của nVelocity hơn cú pháp được sử dụng trong trang ASP.NET Web Forms bình thường. Ngôn ngữ Velocity Template được thiết kế đặc biệt để xây dựng các trang HTML. Velocity cung cấp cho bạn một cú pháp rất rõ ràng để thực hiện các thao tác phổ biến như tương tác với một tập hợp các bản ghi cơ sở dữ liệu và hiển thị từng bản ghi trong một trang HTML (think Domain Specific Language for HTML).

## Cấu hình nVelocity cho ASP.NET MVC
Tôi mất khá nhiều thời gian để tìm ra cách để có được nVelocity cấu hình để làm việc với ASP.NET MVC. Vấn đề là bạn phải lấy các tập tin từ hai dự án khác nhau để có được tất cả mọi thứ chạy được (và một số các assemblies đang ẩn trong thư mục lồng nhau).

Dưới đây là các bước mà tôi làm để nVelocity hoạt động:
**
Bước 1:**

Tải xuống và giải nén các tệp nhị phân MvcContrib từ trang web sau:

http://www.CodePlex.com/MvcContrib

**Bước 2:**

Tải xuống và giải nén Castle Project từ trang web sau:

http://www.castleproject.org/castle/download.html

**Bước 3:**

Sau khi bạn giải nén archive từ bước 2, điều hướng đến thư mục bin và giải nén archive external-dependencies.zip. Bản lưu trữ này chứa assembly nVelocity.dll.

**Bước 4:**

Tạo một ứng dụng Visual Studio 2008 ASP.NET MVC mới

**Bước 5:**

Thêm một reference đến assembly MvcContrib.Castle mà bạn có thể tìm thấy trong archive mà bạn đã tải xuống ở Bước 1 (assembly MvcContrib.Castle là một phần của Project MvcContrib và không phải là Castle Project).

**Bước 6**

Thêm một reference đến assembly NVelocity mà bạn đã giải nén trong Bước 3.

Có 2 cảnh báo: Đầu tiên, không sử dụng assembly nVelocity tại http://nvelocity.sourceforge.net . Nếu bạn thực hiện tìm kiếm nVelocity bằng công cụ tìm kiếm, đây là mục đầu tiên xuất hiện. Thật không may, dự án này đã không được cập nhật từ năm 2003 và assembly nVelocity là lỗi thời. Sử dụng assembly nVelocity từ Castle Project thay vào đó.

Thứ hai, hãy chắc chắn rằng bạn Bỏ chặn bất kỳ tệp nào bạn tải xuống trước khi giải nén chúng. Bạn có thể bỏ chặn một tệp bằng cách bấm chuột phải vào tệp, chọn Properties và bấm vào Unblock. Nếu bạn không bỏ chặn một archive, thì bạn sẽ gặp phải các vấn đề bảo mật khi bạn cố gắng sử dụng các tệp từ karchive trong Visual Studio.

## Sử dụng View Engine nVelocity
Sau khi bạn hoàn tất các bước trong phần trước, bạn đã sẵn sàng bắt đầu sử dụng View Engine nVelocity. Có hai cách mà bạn có thể chỉ ra cho ASP.NET MVC framework  mà bạn muốn sử dụng nVelocity thay vì Web Forms view engine bình thường.

Đầu tiên, bạn có thể sửa đổi thuộc tính ViewEngine của một controller trong một action controller trước khi trả về một view. Ví dụ, HomeController trong Liệt kê 1 sử dụng nVelocity cho action Index() của nó.

Listing 1 – HomeController.vb (VB.NET)

```
Imports System.Web.Mvc
 
Namespace Tip19.Controllers
    Public Class HomeController
        Inherits Controller
 
        Private _dataContext As New MovieDataContext()
 
        Public Function Index() As ActionResult
            Me.ViewEngine = New MvcContrib.Castle.NVelocityViewFactory()
 
            Return View(_dataContext.Movies)
        End Function
 
    End Class
End Namespace
```

Listing 1 – HomeController.cs (C#)

```
using System.Web.Mvc;
using Tip19.Models;
 
namespace Tip19.Controllers
{
    public class HomeController : Controller
    {
        private MovieDataContext _dataContext = new MovieDataContext();
 
        public ActionResult Index()
        {
            this.ViewEngine = new MvcContrib.Castle.NVelocityViewFactory();
 
            return View(_dataContext.Movies);
        }
 
    }
}
```

Nếu bạn muốn sử dụng nVelocity chỉ cho một số trang nhất định trong ứng dụng web của bạn, thì việc thiết lập thuộc tính ViewEngine rất dễ dàng để chuyển đổi các view engine. Tuy nhiên, nếu bạn muốn sử dụng nVelocity cho tất cả các view của mình, thì bạn nên xem xét việc tạo một NController Factory tùy chỉnh. Controller Factory tùy chỉnh trong Liệt kê 2 thay đổi view engine mặc định thành nVelocity.

Listing 2 – VelocityControllerFactory.vb (VB.NET)

```
Imports System
Imports System.Web.Mvc
 
Public Class VelocityControllerFactory
    Inherits DefaultControllerFactory
 
    Protected Overrides Function GetControllerInstance(ByVal controllerType As Type) As IController
        Dim controller As IController = MyBase.GetControllerInstance(controllerType)
        Dim velocityController As Controller = TryCast(controller, Controller)
        If velocityController IsNot Nothing Then
            Dim context = New ControllerContext(Me.RequestContext, velocityController)
            velocityController.ViewEngine = New MvcContrib.Castle.NVelocityViewFactory()
        End If
        Return controller
    End Function
 
End Class
```

Listing 2 – VelocityControllerFactory.cs (C#)

```
using System;
using System.Web.Mvc;
 
namespace Tip19.Controllers 
{ 
    public class VelocityControllerFactory : DefaultControllerFactory 
    { 
        protected override IController GetControllerInstance(Type controllerType) 
        { 
            IController controller = base.GetControllerInstance(controllerType); 
            Controller velocityController = controller as Controller;
            if (velocityController != null) 
            {
                var context = new ControllerContext(this.RequestContext, velocityController);
                velocityController.ViewEngine = new MvcContrib.Castle.NVelocityViewFactory();
            } 
            return controller; 
        } 
    } 
}
```

Để sử dụng Controller Factory tùy chỉnh, bạn phải đăng ký Factory trong tệp Global.asax của ứng dụng. Tệp Global.asax đã sửa đổi trong Liệt kê 3 chứa một lời gọi đến phương thức SetControllerFactory() trong phương thức Application_Start() của nó.

Listing 3 – Global.asax.vb (VB.NET)

```
Imports Tip19
 
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
        ControllerBuilder.Current.SetControllerFactory(GetType(VelocityControllerFactory))
        RegisterRoutes(RouteTable.Routes)
    End Sub
End Class
```

Listing 3 – Global.asax.cs (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Tip19.Controllers;
 
namespace Tip19
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
            ControllerBuilder.Current.SetControllerFactory(typeof(VelocityControllerFactory));
            RegisterRoutes(RouteTable.Routes);
        }
    }
}
```

Sau khi bạn đăng ký VelocityControllerFactory, tất cả các controllers trong ứng dụng MVC của bạn sẽ sử dụng view engine nVelocity theo mặc định. Bạn không còn cần sửa đổi thuộc tính ViewEngine trong mỗi phương thức controller action .

## Tạo một nVelocity View
Bạn tạo một nVelocity view bằng cách tạo tệp .vm. Visual Studio không chứa mẫu cho Velocity view. Bạn có thể tạo một Velocity view bằng cách tạo một trang HTML và thay đổi phần mở rộng của nó từ .htm thành .vm.

Ví dụ, view trong Liệt kê 4 chứa một mẫu Velocity hiển thị tất cả các phim được truyền từ HomeController từ Liệt kê 1.

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml" >
 
<head>
 
<title>Untitled Page</title>
 
</head>
 
<body>
 
#foreach( $movie in $Viewdata.Model )
 
<li><a href="/Home/Edit/$movie.Id">$movie.Title</a></li>
 
#end
 
</body>
 
</html>
 
```

View trong Liệt kê 4 tận dụng mẫu Velocity để hiển thị các bộ phim. Lưu ý rằng mỗi khối được tạo ra bằng cách sử dụng các directives Velocity #foreach và #end. Bạn sử dụng $ để đánh dấu một thứ gì đó dưới dạng biến. Do đó, bạn có thể tham khảo ViewData.Model với biểu thức $Viewdata.Model. Velocity không phân biệt chữ hoa chữ thường.

Có một tham khảo đầy đủ về ngôn ngữ Velocity nằm tại Apache Software Foundation website. Trang web này cũng có hướng dẫn nhanh về Velocity. Xem:

http://velocity.apache.org/engine/releases/velocity-1.5/vtl-reference-guide.html

http://velocity.apache.org/engine/releases/velocity-1.5/user-guide.html

## Tóm lược
Trong mẹo này, tôi đã giới thiệu cách bạn có thể sử dụng template engine nVelocity với một ứng dụng ASP.NET MVC. Tôi đã cho thấy hai phương pháp hoán đổi Web Forms view engine mặc định. Tôi đã chỉ ra cách bạn có thể chỉ định một  view engine cụ thể cho một controller action cụ thể và chỉ định một view engine cụ thể cho tất cả các controller action.

Tôi chắc chắn không khuyến khích bạn từ bỏ Web Forms view engine để ủng hộ nVelocity view engine. Mục đích thực sự của mẹo này là để chứng minh tính linh hoạt của ASP.NET MVC. Nếu bạn không thích bất cứ điều gì về framework ASP.NET MVC, bạn luôn có tùy chọn thay đổi nó.

[Download the Code](https://aspblogs.blob.core.windows.net/media/stephenwalther/Downloads/Tip19/Tip19.zip)

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-19-use-the-nvelocity-view-engine