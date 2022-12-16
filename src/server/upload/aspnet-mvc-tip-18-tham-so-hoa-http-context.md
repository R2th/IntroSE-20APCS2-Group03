Một controller action với các tham số được truyền vào rất dễ để test. Ví dụ, hãy xem xét controller action đơn giản sau đây:

VB.NET Version
```
Public Function InsertCustomer(ByVal firstName As String, ByVal lastName As String, ByVal favoriteColor As String) As ActionResult
    CustomerRepository.CreateCustomer(firstName, lastName, favoriteColor)
    Return View()
End Function
```

C# Version

```
public ActionResult InsertCustomer(string firstName, string lastName, string favoriteColor)
{
    CustomerRepository.CreateCustomer(firstName, lastName, favoriteColor);          
    
    return View();
}
```

controller action này tạo ra một khách hàng mới. Các thuộc tính của khách hàng mới được chuyển thành các tham số cho action. Bạn có thể tưởng tượng rằng source của các tham số này là một form HTML. Vì các thuộc tính được truyền như các tham số, controller action này rất dễ kiểm tra.

Ví dụ, các unit test sau kiểm tra những gì xảy ra khi các giá trị không mong muốn khác nhau được truyền cho controller action

VB.NET Version

```
<TestMethod> _
Public Sub InsertCustomerEmptyValues()
    ' Arrange
    Dim controller As New HomeController()
 
    ' Act
    Dim result As ActionResult = controller.InsertCustomer(String.Empty, String.Empty, String.Empty)
 
    ' Assert
    Assert.IsNotNull(TryCast(result, ViewResult))
End Sub
 
 
 
<TestMethod> _
Public Sub InsertCustomerLongValues()
    ' Arrange
    Dim controller As New HomeController()
 
    ' Act
    Dim longValue As String = "ThisIsAReallyLongValueForThisProperty"
    Dim result As ActionResult = controller.InsertCustomer(longValue, longValue, longValue)
 
    ' Assert
    Assert.IsNotNull(TryCast(result, ViewResult))
End Sub
```
 
C# Version

```
[TestMethod]
public void InsertCustomerEmptyValues()
{
    // Arrange
    HomeController controller = new HomeController();
 
    // Act
    ActionResult result = controller.InsertCustomer(String.Empty, String.Empty, String.Empty); 
 
    // Assert
    Assert.IsNotNull(result as ViewResult);
}
 
 
 
[TestMethod]
public void InsertCustomerLongValues()
{
    // Arrange
    HomeController controller = new HomeController();
 
    // Act
    string longValue = "ThisIsAReallyLongValueForThisProperty";
    ActionResult result = controller.InsertCustomer(longValue, longValue, longValue);
 
    // Assert
    Assert.IsNotNull(result as ViewResult);
}
```

Việc tạo ra các loại unit test này dễ dàng khi mọi thứ trong action method được truyền như một tham số. Tuy nhiên, các tham số truyền là bất tiện khi làm việc với các form HTML lớn. Hãy tưởng tượng rằng một khách hàng có 57 thuộc tính. Bạn không muốn liệt kê tất cả 57 thuộc tính làm tham số cho một controller action. Thay vào đó, bạn sẽ tạo controller action như thế này:

VB.NET Version

```
Public Function InsertCustomer2() As ActionResult
    CustomerRepository.CreateCustomer(Request.Form)
 
    Return View()
End Function
```
C# Version

```
public ActionResult InsertCustomer2()
{
    CustomerRepository.CreateCustomer(Request.Form);
 
    return View();
}
```
Trong phiên bản sửa đổi này của controller action InsertCustomer, các giá trị form HTML không được chuyển thành tham số. Thay vào đó, đối tượng HTTP Context Request.Form được sử dụng trong phần body của controller action để truy xuất các giá trị form HTML. Action InsertCustomer sửa đổi này rất dễ viết vì bạn không cần liệt kê rõ ràng từng trường trong các form. Thật không may, nó khó khăn hơn nhiều để test. Để test phiên bản mới này của InserCustomer() , bạn phải giả mạo hoặc giả lập đối tượng HTTP Context.

Điều chúng ta thực sự muốn làm ở đây là truyền vào các giá trị của form dưới dạng một tham số duy nhất cho controller action InsertCustomer như sau:
VB.NET Version

```
Public Function InsertCustomer3(ByVal formParams As NameValueCollection) As ActionResult
    CustomerRepository.CreateCustomer(formParams)
 
    Return View()
End Function
```
C# Version

```
public ActionResult InsertCustomer3(NameValueCollection formParams)
{
    CustomerRepository.CreateCustomer(formParams);
 
    return View();
}
```
Phiên bản thứ ba của method InsertCustomer có tất cả các ưu điểm và không có bất lợi nào trong hai phiên bản trước đó. Giống như phiên bản đầu tiên của method  InsertCustomer, phiên bản thứ ba này có thể dễ dàng test được. Trong unit test, bạn chỉ có thể tạo một NameValueCollection mới và truyền nó vào method InsertCustomer() để test.

Giống như phiên bản thứ hai của method InsertCustomer, phiên bản thứ ba này giúp dễ dàng làm việc với các form HTML lớn với một số lượng lớn các trường input. Bạn không cần liệt kê từng tham số form. Thay vào đó, các tham số được truyền như một tập hợp.

Trong phần còn lại của mẹo này, tôi chỉ cho bạn cách triển khai loại controller action thứ ba này bằng cách tạo ra Action Invoker và một Controller Factory.

## Tạo ra Custom Action Invoker
Nếu chúng ta muốn thay đổi các tham số được truyền đến controller action thì chúng ta cần phải tạo ra ControllerActionInvoker. ControllerActionInvoker chịu trách nhiệm tạo các tham số được truyền cho một controller action.

Action Invoker trong Listing 1.
Listing 1 – ContextActionInvoker.vb (VB.NET)

```
Public Class ContextActionInvoker
    Inherits ControllerActionInvoker
 
    Public Sub New(ByVal controllerContext As ControllerContext)
        MyBase.New(controllerContext)
    End Sub
 
 
    Public Overrides Function InvokeAction(ByVal actionName As String, ByVal values As System.Collections.Generic.IDictionary(Of String, Object)) As Boolean
        Dim context As HttpContextBase = Me.ControllerContext.HttpContext
 
        ' Add Forms Collection
        values.Add("formParams", context.Request.Form)
 
        ' Add User 
        values.Add("isAuthenticated", context.User.Identity.IsAuthenticated)
        values.Add("userName", context.User.Identity.Name)
 
        Return MyBase.InvokeAction(actionName, values)
    End Function
End Class
```
Listing 1 – ContextActionInvoker.cs (C#)

```
using System.Web;
using System.Web.Mvc;
 
namespace Tip18.Controllers
{
    public class ContextActionInvoker : ControllerActionInvoker
    {
 
        public ContextActionInvoker(ControllerContext controllerContext):base(controllerContext) {}
 
 
        public override bool InvokeAction(string actionName, System.Collections.Generic.IDictionary<string, object> values)
        {
            HttpContextBase context = this.ControllerContext.HttpContext;
 
            // Add Forms Collection
            values.Add("formParams", context.Request.Form);
            
            // Add User 
            values.Add("isAuthenticated", context.User.Identity.IsAuthenticated);
            values.Add("userName", context.User.Identity.Name);
            
            return base.InvokeAction(actionName, values);
        }
    }
 
}
```
custom action invoker của chúng ta xuất phát từ ControllerActionInvoker mặc định. Chúng ta ghi đè method InvokeAction() để thay đổi cách mà các controller actions được gọi.

method InvokeAction() tùy chỉnh của chúng ta ngầm bổ sung các giá trị vào Dictionary các giá trị được truyền cho method InvokeAction() base. Chúng ta thêm một giá trị thể hiện cho Request.Form, một giá trị thể hiện khi người dùng hiện tại được xác thực và một giá trị thể hiện cho tên người dùng.

Nếu một controller action bao gồm một tham số trùng với formParams, isAuthenticated, hoặc userName thì tham số đó sẽ tự động nhận giá trị. Bạn có thể thêm các tham số khác bằng cách sử dụng kỹ thuật này. Ví dụ: bạn có thể thêm tham số vai trò luôn đại diện cho role của người dùng hiện tại.

Sau khi bạn tạo một Action Invoker tùy chỉnh, bạn cần tạo một Factory Controller mới để bạn có thể kết hợp Action Invoker tùy chỉnh đó với tất cả các controller trong ứng dụng của bạn.

## Tạo ra Custom Controller Factory
Custom Controller Factory của chúng ta show trong Listing 2. Một lần nữa, chúng ta giảm thiểu công việc bằng cách kế thừa Controller Factory từ lớp DefaultControllerFactory mặc định. Chúng ta chỉ cần ghi đè method GetControllerInstance().

Listing 2 – ContextControllerFactory.vb (VB.NET)

```
Imports System
Imports System.Web.Mvc
 
Public Class ContextControllerFactory
    Inherits DefaultControllerFactory
 
    Protected Overrides Function GetControllerInstance(ByVal controllerType As Type) As IController
        Dim controller As IController = MyBase.GetControllerInstance(controllerType)
        Dim contextController As Controller = TryCast(controller, Controller)
        If contextController IsNot Nothing Then
            Dim context = New ControllerContext(Me.RequestContext, contextController)
            contextController.ActionInvoker = New ContextActionInvoker(context)
        End If
        Return controller
    End Function
 
End Class
```
Listing 2 – ContextControllerFactory.cs (C#)

```
using System;
using System.Web.Mvc;
 
namespace Tip18.Controllers
{
    public class ContextControllerFactory : DefaultControllerFactory
    {
        protected override IController GetControllerInstance(Type controllerType)
        {
            IController controller = base.GetControllerInstance(controllerType);
            Controller contextController = controller as Controller;
            if (contextController != null)
            {
                var context = new ControllerContext(this.RequestContext, contextController);
                contextController.ActionInvoker = new ContextActionInvoker(context);
            }
            return controller;
        }
    }
}
```
 custom Controller Factory của chúng ta chỉ làm một điều. Nó liên kết custom Action Invoker với mỗi controller được tạo bởi Controller Factory. Mỗi khi Factory tạo ra một Controller mới, lớp custom ContextActionInvoker được gán cho thuộc tính ActionInvoker của controller mới.

Để sử dụng một Controller Factory mới với ứng dụng ASP.NET MVC, bạn phải đăng ký Controller Factory trong tệp Global.asax. Tệp Global.asax đã chỉnh sửa trong Listing 3 để gọi method SetControllerFactory() trong phương thức Application_Start().

Listing 3 – Global.asax.vb (VB.NET)

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
        ControllerBuilder.Current.SetControllerFactory(GetType(ContextControllerFactory))
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
using Tip18.Controllers;
 
namespace Tip18
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
            ControllerBuilder.Current.SetControllerFactory(typeof(ContextControllerFactory));
            RegisterRoutes(RouteTable.Routes);
        }
    }
}
```

## Sử dụng Parameterized Context
Sau khi bạn tạo ra custom Action Invoker và Controller Factory, tập hợp Request.Forms và thông tin người dùng được chuyển đến từng controller action một cách tự động. Ví dụ, HomeController đã chỉnh sửa trong Listing 4 chứa hai action sử dụng các tham số ma thuật này.

Listing 4 – HomeController.vb (VB.NET)

```
Public Class HomeController
    Inherits Controller
 
    Public Function InsertCustomer3(ByVal formParams As NameValueCollection) As ActionResult
        CustomerRepository.CreateCustomer(formParams)
        ViewData("FirstName") = formParams("firstName")
        Return View()
    End Function
 
    Public Function TestUserName(ByVal userName As String, ByVal other As String) As ActionResult
        ViewData("UserName") = userName
        Return View()
    End Function
 
End Class
```
 
Listing 4 – HomeController.cs (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tip18.Models;
using System.Collections.Specialized;
 
namespace Tip18.Controllers
{
    public class HomeController : Controller
    {
 
        public ActionResult InsertCustomer3(NameValueCollection formParams)
        {
            CustomerRepository.CreateCustomer(formParams);
            ViewData["FirstName"] = formParams["firstName"];
            return View();
        }
 
        public ActionResult TestUserName(string userName, string other)
        {
            ViewData["UserName"] = userName;
            return View();
        }
 
    }
}
```
method InsertCustomer3() có một tham số có tên là formParams. Do tên của tham số này, nó thể hiện cho tập Request.Form tự động.

method TestUserName() bao gồm hai tham số có tên là "userName" và "other" . Vì tham số tên người dùng có tên "userName" , tham số này tự động nhận tên người dùng hiện tại. Tham số "other" là một tham số thông thường. Nếu bạn có query string, form field hoặc cookie trong request có tên "other", thì tham số này sẽ có giá trị.

Điều gì xảy ra khi bạn truyền một form field hoặc query string có tên là "userName" đến action TestUserName()? Giá trị magic kia sẽ được ưu tiên. Do đó, ai đó không thể giả mạo tên người dùng được xác thực.

## Tóm lược
Trong mẹo này, tôi đã giải thích cách bạn có thể chuyển HTTP Context thành một tập hợp các tham số được truyền cho mọi controller action. Động lực để thực hiện sửa đổi này là tạo ra các controller action methods có thể test được nhiều hơn.

Rõ ràng, kỹ thuật được mô tả trong mẹo này cũng có thể được áp dụng cho các loại tham số khác. Bạn có thể truyền bất kỳ giá trị magic nào mà bạn muốn cho một controller action đơn giản bằng cách tạo một Action Invoker và Controller Factory mới.