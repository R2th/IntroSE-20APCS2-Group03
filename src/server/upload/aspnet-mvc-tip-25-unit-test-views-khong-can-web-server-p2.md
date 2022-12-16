## Tạo Fake Controller Context
Phương thức SimpleViewEngine.RenderView() không trả về giá trị. Thay vào đó, phương thức RenderView() ghi trực tiếp vào đối tượng HttpContext.Response (đối tượng HttpResponse). Do đó, để kiểm tra các view của mình, chúng tôi phải có thể giả mạo đối tượng HttpContext để chúng tôi có thể theo dõi các giá trị ghi vào đối tượng này.

Trong số những bài trước đây của tôi, tôi đã trình bày cách giả mạo các đối tượng ControllerContext và HttpContext:

http://weblogs.asp.net/stephenwalther/archive/2008/06/30/asp-net-mvc-tip-12-faking-the-controller-context.aspx

http://weblogs.asp.net/stephenwalther/archive/2008/07/02/asp-net-mvc-tip-13-unit-test-your-custom-routes.aspx

Trong các mẹo trước đây, tôi đã trình bày cách giả mạo các đối tượng ControllerContext và HttpContext thật hữu ích khi bạn cần xây dựng các bài unit test như Session State, Cookies, Form fields và Route Tables.

Mã tải xuống ở cuối mẹo này bao gồm một dự án có tên MvcFakes. Tôi đã thêm một đối tượng HttpResponse giả vào tập hợp các đối tượng giả mạo mà bạn có thể sử dụng trong các bài unit test của mình.

## Tạo Unit Test cho View
Bây giờ chúng tôi đã tạo một View Engine tùy chỉnh và chúng tôi đã tạo một bộ giả mạo, chúng ta có thể unit test view của mình. Lớp test trong Liệt kê 4 kiểm tra  Index view được trả về bởi hành động HomeContoder.Index().
Listing 4 – HomeControllerTest.vb (VB.NET)

```
Imports System
Imports System.Collections.Generic
Imports System.Text
Imports System.Web.Mvc
Imports Microsoft.VisualStudio.TestTools.UnitTesting
Imports MvcFakes
Imports System.Web.Routing
Imports Tip25
Imports Tip25.Tip25
 
<TestClass()> Public Class HomeControllerTest
 
    Private Const viewsPath As String = "C:\Users\swalther\Documents\Common Content\Blog\Tip25 Custom View Engine\CS\Tip25\Tip25\Views"
 
    <TestMethod()> _
    Public Sub Index()
        ' Setup controller
        Dim controller As New HomeController()
        controller.ViewEngine = New SimpleViewEngine(viewsPath)
 
        ' Setup fake controller context
        Dim rd = New RouteData()
        rd.Values.Add("controller", "home")
        Dim fakeContext = New FakeControllerContext(controller, rd)
 
        ' Execute
        Dim result As ViewResult = TryCast(controller.Index(), ViewResult)
        result.ExecuteResult(fakeContext)
        Dim page As String = fakeContext.HttpContext.Response.ToString()
 
        ' Verify
        StringAssert.Contains(page, "<title>Tip 25</title>")
        StringAssert.Contains(page, "Welcome to ASP.NET MVC!", "Missing Message")
        StringAssert.Contains(page, "<b>Using a custom View Engine</b>", "Missing Message2 with bold")
    End Sub
End Class
```
Listing 4 – HomeControllerTest.cs (C#)

```
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MvcFakes;
using Tip25;
using Tip25.Controllers;
using System.Web.Routing;
 
namespace Tip25Tests.Controllers
{
    
    [TestClass]
    public class HomeControllerTest
    {
        private const string viewsPath =
            @"C:\Users\swalther\Documents\Common Content\Blog\Tip25 Custom View Engine\CS\Tip25\Tip25\Views";
 
        [TestMethod]
        public void Index()
        {
            // Setup controller
            HomeController controller = new HomeController();
            controller.ViewEngine = new SimpleViewEngine(viewsPath);
 
            // Setup fake controller context
            var routeData = new RouteData();
            routeData.Values.Add("controller", "home");
            var fakeContext = new FakeControllerContext(controller, routeData);
 
            // Execute
            ViewResult result = controller.Index() as ViewResult;
            result.ExecuteResult(fakeContext);
            string page = fakeContext.HttpContext.Response.ToString();
 
            // Verify
            StringAssert.Contains(page, "<title>Tip 25</title>");
            StringAssert.Contains(page, "Welcome to ASP.NET MVC!", "Missing Message");
            StringAssert.Contains(page, "<b>Using a custom View Engine</b>", "Missing Message2 with bold");
        }
 
    }
}
```

Bài kiểm tra trong Liệt kê 4 chứa bốn phần. Phần đầu tiên chuẩn bị lớp HomeContoder bằng cách liên kết SimpleViewEngine tùy chỉnh của chúng ta với lớp. Lưu ý rằng bạn phải cung cấp đường dẫn được hard code vào thư mục view cho hàm khởi tạo của SimpleViewEngine. (Bạn sẽ cần sửa đường dẫn này khi sử dụng mã tải xuống ở cuối mẹo này)

Phần thứ hai chuẩn bị đối tượng ControllerContext giả. Lưu ý rằng bạn phải truyền tên controller cho hàm khởi tạo cho lớp FakeHttpContext.

Tiếp theo, hành động HomeControll.Index() được gọi. Action này trả về một ViewResult. ViewResult sau đó được thực thi với HTTPContext giả. Cuối cùng, phương thức HttpResponse.ToString() được gọi để truy xuất nội dung được ghi vào đối tượng HttpResponse bởi SimpleViewEngine.

Phần cuối cùng xác minh rằng trang được hiển thị bởi view chứa ba chuỗi string. Đầu tiên, tiêu đề của trang HTML được xác minh. Tiếp theo, sự tồn tại của hai thông báo từ ViewData được xác minh. Lưu ý rằng kiểm tra kiểm tra view thông báo thứ hai có thực sự được in đậm hay không.

## Tóm lược
Trong mẹo này, tôi đã chỉ ra cách bạn có thể mở rộng các bài unit test của mình để bao quát view của mình. Bằng cách tận dụng View Engine tùy chỉnh, bạn xây dựng các bài unit test cho các models, controllers, và view của mình.

[Download Code](https://aspblogs.blob.core.windows.net/media/stephenwalther/Downloads/Tip25/Tip25.zip)

Nguồn https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-25-unit-test-your-views-without-a-web-server