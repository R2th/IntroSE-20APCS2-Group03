Trong mẹo này, tôi trình bày cách bạn có thể loại bỏ các controller method đơn giản là trả về các view. Tôi chỉ cho bạn cách sử dụng phương thức HandleUnknownAction.

Tôi phát hiện ra rằng tôi viết rất nhiều controller action không làm gì hơn là trả về một view. Ví dụ, hãy xem xét CustomerController trong Liệt kê 1.

Listing 1 – CustomerController.vb
```
Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
 
Namespace Tip22.Controllers
    Public Class CustomerController
        Inherits Controller
 
        Public Function Index() As ActionResult
            Return View()
        End Function
 
        Public Function Details() As ActionResult
            Return View()
        End Function
 
        Public Function Help() As ActionResult
            Return View()
        End Function
 
    End Class
End Namespace
```


Listing 1 – CustomerController.cs

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
 
namespace Tip22.Controllers
{
    public class CustomerController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
 
        public ActionResult Details()
        {
            return View();
        }
        public ActionResult Help()
        {
            return View();
        }
     
    }
}
```
Controller  này bao gồm ba actions trả về ba views khác nhau. Mỗi action này chứa một dòng mã. Trong thực tế, mỗi action này chứa chính xác cùng một dòng mã. Mã này thực sự không làm điều cần thiết. Làm thế nào chúng ta có thể sửa chữa nó?

Lớp Controller bao gồm một action, có tên là phương thức HandleUnknownAction(), thực hiện bất cứ khi nào bạn cố gắng gọi một action trên một Controller không tồn tại. Controller trong Liệt kê 2 tận dụng phương thức HandleUnknownAction() để render các views ngay cả khi một controller method tương ứng không tồn tại.

Listing 2 – HomeController.vb

```
Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
 
Namespace Tip22.Controllers
    <HandleError> _
    Public Class HomeController
        Inherits Controller
 
        Public Function Details() As ActionResult
            ViewData("message") = "Hello from controller action!"
            Return View()
        End Function
 
        Protected Overrides Sub HandleUnknownAction(ByVal actionName As String)
            Me.View(actionName).ExecuteResult(Me.ControllerContext)
        End Sub
 
    End Class
End Namespace
```
 
 

Listing 2 – HomeController.cs

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
 
namespace Tip22.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ActionResult Details()
        {
            ViewData["message"] = "Hello from controller action!";
            return View();
        }
 
        protected override void HandleUnknownAction(string actionName)
        {
            this.View(actionName).ExecuteResult(this.ControllerContext);
        }
 
    }
}
```
Khi bạn sử dụng controller trong Liệt kê 2, bạn có thể gọi bất kỳ action nào và controller sẽ cố gắng trả về một view tương ứng với hành động đó. Bạn không cần phải code rõ ràng action method cho mỗi view.

Lưu ý rằng bộ controllerbao gồm một action Details(). Khi bạn cần truyền ViewData, thì bạn cần phải code một cách rõ ràng action method.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-22-return-a-view-without-creating-a-controller-action