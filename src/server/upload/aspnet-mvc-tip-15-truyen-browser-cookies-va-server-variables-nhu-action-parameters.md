Trong mẹo này, tôi trình bày cách bạn có thể truyền cookie trình duyệt và các biến HTTP server đến controller action methods theo cách tương tự như bạn có thể truyền các tham số form và query string.

Hãy tưởng tượng rằng bạn thực hiện yêu cầu sau đối với một ứng dụng web ASP.NET MVC:

http://localhost/Product/Index

Khi bạn thực hiện yêu cầu này, theo mặc định, framework ASP.NET MVC sẽ gọi một action có tên là Index() trong một lớp có tên là ProductController. Có một lớp trong framework ASP.NET MVC, có tên là lớp ControllerActionInvoker, có trách nhiệm gọi controller action để trả lời một yêu cầu tới trình duyệt.

Lớp ControllerActionInvoker có khả năng response. Lớp này phải tìm một phương thức phù hợp với phương thức được gọi. Hơn nữa, ControllerActionInvoker chịu trách nhiệm xây dựng danh sách các tham số được truyền cho phương thức được invoke.

Hãy tưởng tượng, cho ví dụ, controller action Details() trong Liệt kê 1 đang được gọi:

Liệt kê 1 - ProductController.vb (VB.NET)
```
Public Class ProductController
    Inherits System.Web.Mvc.Controller
 
    Function Details(ByVal productId As Integer)
        Return View()
    End Function
End Class
```

Listing 1 – ProductController.cs (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
 
namespace Tip15.Controllers
{
    public class ProductController : Controller
    {
        public ActionResult Details(int productId)
        {
            return View();
        }
    }
}
```

Controller action Details() có một tham số duy nhất có tên productId. ControllerActionInvoker cố gắng lấy giá trị của tham số này từ 3 vị trí:

1. Explicit Extra Parameters truyền tới InvokeAction()

2. Giá trị từ Route Data

3. Giá trị yêu cầu

Đầu tiên, để thực hiện lấy giá trị của tham số productId từ các tham số được truyền cho phương thức ControllerActionInvoker.InvokeAction(). Phương thức này được gọi bởi phương thức Controller.Execute(). Controller mặc định không truyền qua bất kỳ tham số bổ sung nào. Nếu bạn tạo controller riêng của mình, thì bạn có thể truyền bất kỳ tham số nào bạn muốn.

Thứ hai, để nhận giá trị của tham số productId từ dữ liệu route. Dữ liệu route có thể chứa giá trị mặc định cho productId. Hoặc, route table của bạn có thể ánh xạ một phần URL đến productId. Bảng route mặc định không ánh xạ bất kỳ thứ gì đến thông số productId.

Cuối cùng, một nỗ lực được thực hiện để lấy giá trị của productId từ đối tượng HttpRequest (HttpContext.Request). Đối tượng HttpRequest đại diện cho các mục Query String, Form, Cookie và Server Variable (theo thứ tự đó). Điều này có nghĩa lấy giá trị của productId từ tất cả các nguồn này.

Nếu ControllerActionInvoker không thể lấy giá trị của một tham số từ ba vị trí này thì ControllerActionInvoker sẽ kiểm tra xem tham số có thể là null hay không. Nếu tham số có thể là null, thì ActionInvoker sẽ chuyển một giá trị null. Nếu không, ControllerActionInvoker sẽ văng raInvalidOperationException (xem Hình 1).

Hình 1 - Các tham số không khớp

![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip15PassBrowserCookiesandServ_A1ED/clip_image002_thumb.jpg)

Cho đến khi tôi điều tra lớp ControllerActionInvoker, tôi đã không nhận ra rằng các tham số controller action có thể được lấy ra từ các cookie trình duyệt và các biến HTTP server. Xem xét action Index() được hiển thị bởi HomeController trong Liệt kê 2.

Listing 2 – HomeController.vb (VB.NET)

```
Public Class HomeController
    Inherits System.Web.Mvc.Controller
 
    Public Function Index(ByVal HTTP_USER_AGENT As String, ByVal myCookie As String)
        ViewData("HTTP_USER_AGENT") = HTTP_USER_AGENT
        ViewData("myCookie") = myCookie
        Return View()
    End Function
 
    Public Function CreateCookie(ByVal cookieValue As String)
        Dim newCookie As New HttpCookie("myCookie", cookieValue)
        newCookie.Expires = DateTime.Now.AddDays(10)
        Response.AppendCookie(newCookie)
        Return RedirectToAction("Index")
    End Function
 
 
 
End Class
```

Listing 2 – HomeController.cs (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
 
namespace Tip15.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string HTTP_USER_AGENT, string myCookie)
        {
            ViewData["HTTP_USER_AGENT"] = HTTP_USER_AGENT;
            ViewData["myCookie"] = myCookie; 
            return View();
        }
 
        public ActionResult CreateCookie(string cookieValue)
        {
            var newCookie = new HttpCookie("myCookie", cookieValue);
            newCookie.Expires = DateTime.Now.AddDays(10);
            Response.AppendCookie(newCookie);
            return RedirectToAction("Index");
        }
 
 
    }
}
```

Phương thức Index ()chấp nhận hai tham số có tên là HTTP_USER_AGENT và myCookie. Vì tên tham số HTTP_USER_AGENT tương ứng với biến server, tham số này sẽ tự động nhận giá trị. Vì myCookie tương ứng với cookie của trình duyệt, thông số này cũng có giá trị (nếu cookie được đặt). Khi phương thức Index () được gọi, bạn sẽ thấy view trong Hình 2.

Figure 2 – The Index View
![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip15PassBrowserCookiesandServ_A1ED/clip_image004_thumb.jpg)

Thực tế là bạn có thể truyền các biến server và cookie đến các controller action có thể hữu ích trong nhiều tình huống khác nhau. Ví dụ: bạn có thể muốn trả lại nội dung khác nhau tùy thuộc vào loại trình duyệt đang được sử dụng để thực hiện yêu cầu. Bạn có thể tận dụng biến server HTTP_USER_AGENT trong controller action của mình để phát hiện loại trình duyệt và trả về nội dung khác nhau. Hoặc, bạn có thể muốn trả lại tin nhắn bằng các ngôn ngữ khác nhau tùy thuộc vào cài đặt ngôn ngữ trình duyệt của người dùng.

Việc truyền tham số cookie cũng có thể hữu ích. Bạn có thể lưu trữ tùy chọn của người dùng trong cookie và truy xuất các tùy chọn đó trong một controller action. Ví dụ: bạn có thể lưu trữ biệt hiệu của người dùng trong cookie của trình duyệt và tự động truy xuất tên biệt hiệu đó trong mọi controller action.

[Download the Code](https://aspblogs.blob.core.windows.net/media/stephenwalther/Downloads/Tip15/Tip15.zip)
    
Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-15-pass-browser-cookies-and-server-variables-as-action-parameters