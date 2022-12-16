Control Grid khởi tạo bộ điều khiển được khai báo bởi thuộc tính **controller** của nó . Tiếp theo, nó gọi action trên controller được gọi bởi thuộc tính **action** của nó . control Grid giả định rằng controller action trả về IEnumerable. control  liệt kê dữ liệu và hiển thị dữ liệu trong bảng HTML.

Listing 7 – MovieController.cs

```
using System.Linq;
using System.Web.Mvc;
using Tip26.Models;
 
namespace Tip26.Controllers
{
    public class MovieController : Controller
    {
 
        public object ListAll()
        {
            var dataContext = new MovieDataContext();
            return dataContext.Movies.ToList();
        }
 
    }
}
```
    MovieControll.ListAll() sử dụng LINQ to SQL DataContext để lấy tất cả các movie từ bảng cơ sở dữ liệu movie. Không có gì lạ ở đây.

## Control View Engine hoạt động như thế nào
Bạn thực thi View Engine tùy chỉnh bằng cách triển khai interface IViewEngine. interface này có một phương thức bắt buộc: RenderView().

Phương thức RenderView () của Control View Engine được chứa trong Liệt kê 8.
    Listing 8 – ControlViewEngine.RenderView().

```
public void RenderView(ViewContext viewContext)
{
    // Get path of view
    string viewPath = ViewLocator.GetViewLocation(viewContext, viewContext.ViewName);
 
    // Get XHTML Document
    var document = GetDOMFromViewPath(viewPath);
 
    // Find all non-XHTML elements
    var controlElements = GetControlElements(document);
 
    // Instantiate controls
    foreach (XmlElement controlElement in controlElements)
        RenderControl(viewContext, document, controlElement);
 
    // Write XHTML to response
    document.Save(viewContext.HttpContext.Response.Output);
}
```
    Phương thức RenderView() trong Liệt kê 8 giả định rằng view là một view tương thích XML (XHTML). view được tải với sự trợ giúp của lớp XmlDocument. Tiếp theo, tất cả các non-xhtml được lấy từ view. Bất cứ gì có trong view không phải là phần tử XHTML đều được coi là một control tiềm năng. Phương thức RenderControl() được sử dụng để render contol (xem Liệt kê 9).
    Listing 9 – ControlViewEngine.RenderControl()

```
protected virtual void RenderControl(ViewContext context, XmlDocument document, XmlElement element)
{
    var controlName = String.Format("{0}.{1}", element.NamespaceURI, element.LocalName);
    var controlType = _applicationAssembly.GetType(controlName, false, true);
    if (controlType != null)
    {
        var control = (IControl)Activator.CreateInstance(controlType);
        XmlNode resultNode = control.Render(context, document, element);
        element.ParentNode.ReplaceChild(resultNode, element);
    }
}
```
    Phương thức RenderControl() sử dụng phương thức .NET framework Activator.CreateInstance() để tạo một thể hiện của một lớp tương ứng với control. Tiếp theo, phương thức Render() được gọi trên lớp khởi tạo để lấy phần tử XML. Cuối cùng, phần tử ban đầu được hoán đổi cho phần tử XML mới.

Bạn có thể xem toàn bộ mã nguồn của Control View Engine bằng cách nhấp vào liên kết tải xuống ở cuối mẹo này.

## Điều gì tốt về Control View Engine
Control View Engine rất nhẹ. Nó không về view state, postback hoặc bất kỳ framework nào. Control View Engine chỉ đơn giản là hiển thị text.

Một số người thấy làm việc với các view tự nhiên hơn làm việc với inline scripts. Nếu bạn thích inline scripts thì Control View Engine sẽ không mang lại nhiều giá trị cho bạn. Mặt khác, nếu bạn muốn xây dựng các views của mình bằng các declarative controls, thì view engine như Control View Engine có thể là một thay thế hấp dẫn cho Web Forms view engine mặc định.

Một điều thú vị khác về Control View Engine là nó rất dễ để test. Ví dụ, Liệt kê 10 chứa mã test cho action HomeControll.Index().
    Listing 10 – HomeControllerTest.cs

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MvcViewEngines;
using Tip26;
using Tip26.Controllers;
using MvcFakes;
using System.Web.Routing;
 
namespace Tip26Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest
    /// </summary>
    [TestClass]
    public class HomeControllerTest
    {
        private const string appFolder = @"C:\Users\swalther\Documents\Common Content\Blog\Tip26 Create Lightweight Control View Engine\CS\Tip26\Tip26\";
 
        [TestMethod]
        public void Index()
        {
            // Setup Controller
            HomeController controller = new HomeController();
            
            // Setup View Engine
            var appAssembly = Assembly.GetAssembly(typeof (HomeController));
            controller.ViewEngine = new ControlViewEngine(appFolder, appAssembly);
            
            // Fake the Controller Context
            var context = new FakeControllerContext(controller);
            context.RouteData.Values["controller"] = "home";
            context.RouteData.Values["action"] = "index";
 
            // Execute
            ViewResult result = controller.Index() as ViewResult;
            result.ExecuteResult(context);
 
            // Verify
            var page = context.HttpContext.Response.ToString();
            StringAssert.Contains(page, "Hello from SimpleControl!");
        }
 
    
    }
}
```
    
    Test trong Liệt kê 10 kiểm tra xem view được trả về bởi phương thức HomeContoder.Index() có chứa text hay không. “Hello from SimpleControl!”. text này được hiển thị bởi SimpleControl. Khi bạn sử dụng Control View Engine, bạn có thể kiểm tra view cho các chuỗi cụ thể được hiển thị bằng controls.

## Điều gì là xấu về Control View Engine
Hiệu suất của Control View Engine rất tệ. Tôi không chắc là nó tệ đến mức nào, nhưng tôi nghi ngờ rằng nó rất, rất tệ. Mỗi lần bạn hiển thị view bằng Control View Engine,  View Engine sẽ thực hiện lại phương thức Render()  của mỗi lớp Control.

Tôi đã thực hiện một chút caching. view được lưu trong bộ nhớ sau request đầu tiên (với sự phụ thuộc tệp vào tệp view). Bạn sẽ nhận thấy rằng lần đầu tiên bạn request một view cụ thể, phải mất một thời gian rất dài để view xuất hiện trong trình duyệt web của bạn.

## Tóm lược
Mục tiêu thực sự của bài này là để thuyết phục bạn rằng inline scripts không phải là một phần thiết yếu của ASP.NET MVC framework. Nếu bạn thấy các view ASP.NET MVC khó đọc (tag soup) thì thật tốt khi biết rằng bạn luôn có tùy chọn hoán đổi view engine mặc định bằng một view engine chỉnh. Trong mẹo này, tôi đã chỉ cho bạn cách theo hướng ngược lại của inline script. Tôi đã trình bày cách bạn có thể tạo một declarative view engine  thay vì inline script view engine.
[Download the Code](https://aspblogs.blob.core.windows.net/media/stephenwalther/Downloads/Tip26/Tip26.zip)

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-26-create-a-lightweight-control-view-engine