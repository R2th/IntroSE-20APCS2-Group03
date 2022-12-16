### Tạo Route Debugger Controller
Bây giờ chúng tôi đã đặt lại tên cho các routes của mình, chúng tôi có thể tạo class RouteDebugger controller. Lớp controller này được chứa trong Liệt kê 3.

Listing 3 – RouteDebuggerController.cs

```
using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;
using System.Web.Routing;
using MvcFakes;
 
namespace RouteDebugger.Controllers
{
    public class RouteDebuggerController : Controller
    {
        public string Index(string url, string httpMethod)
        {
 
            url = MakeAppRelative(url);
            httpMethod = httpMethod ?? "GET";
 
            var fakeContext = new FakeHttpContext(url, httpMethod);
            var httpMethodOptions = formatOptions(httpMethod, new string[]{"GET","POST","PUT","DELETE","HEAD"} );
            var routeDataText = GetRoutesText(fakeContext);
            return string.Format(htmlFormat, url, httpMethodOptions, routeDataText);
        }
 
        private string GetRoutesText(FakeHttpContext fakeContext)
        {
            var sb = new StringBuilder();
            foreach (NamedRoute route in RouteTable.Routes)
            {
                var rd = route.GetRouteData(fakeContext);
                // Get match
                var isMatch = false;
                var match = rd == null ? "No Match" : "Match";
 
                // Get values
                var values = "N/A";
                if (rd != null)
                {
                    isMatch = true;
                    values = formatValues(rd.Values);
                }
 
                // Get defaults
                var defaults = formatValues(route.Defaults);
 
                // Get constraints
                var constraints = formatValues(route.Constraints);
 
                // Get dataTokens
                var dataTokens = formatValues(route.DataTokens);
 
                // Create table row
                var row = formatRow(isMatch, match, route.Name, route.Url, defaults, constraints, dataTokens, values);
                sb.Append(row);
            }
            return sb.ToString();
        }
 
        private string formatValues(RouteValueDictionary values)
        {
            if (values == null)
                return "N/A";
            var col = new List<String>();
            foreach (string key in values.Keys)
            {
                object value = values[key] ?? "[null]";
                col.Add(key + "=" + value.ToString());
            }
            return String.Join(", ", col.ToArray());
        }
 
        private string formatOptions(string selected, string[] values)
        {
            var sb = new StringBuilder();
            foreach (string value in values)
            {
                var showSelected = String.Empty;
                if (value == selected)
                    showSelected = "selected='selected'";
                sb.AppendFormat("<option value='{0}' {1}>{0}</option>", value, showSelected);
            }
            return sb.ToString();
        }
 
 
        private string formatRow(bool hilite, params string[] cells)
        {
            var sb = new StringBuilder();
            sb.Append(hilite ? "<tr class='hilite'>":"<tr>");
            foreach (string cell in cells)
                sb.AppendFormat("<td>{0}</td>", cell);
            sb.Append("</tr>");
            return sb.ToString();
        }
 
        private string MakeAppRelative(string url)
        {
            if (!url.StartsWith("~"))
            {
                if (!url.StartsWith("/"))
                    url = "~/" + url;
                else
                    url = "~" + url;
            }
            return url;
        }
 
 
        const string htmlFormat = @"
            <html>
            <head>
                <title>Route Debugger</title>
                <style type='text/css'>
                table {{ border-collapse:collapse }}
                td
                {{
                    font:10pt Arial;
                    border: solid 1px black;
                    padding:3px; 
                }}
                .hilite {{background-color:lightgreen}}
                </style>
            </head>
            <body>
            
            <form action=''>
            <label for='url'>URL:</label>
            <input name='url' size='60' value='{0}' />
            <select name='httpMethod'>
            {1}
            </select>
            <input type='submit' value='Debug' />
            </form>
 
            <table>
            <caption>Routes</caption>
            <tr>
                <th>Matches</th>
                <th>Name</th>
                <th>Url</th>
                <th>Defaults</th>
                <th>Constraints</th>
                <th>DataTokens</th>
                <th>Values</th>
            </tr>
            {2}
            </table>
 
            </body>
            </html>
 
            ";
 
    }
}
```

Có bốn điều đặc biệt về controller RouteDebugger. Đầu tiên, nó tận dụng một lớp có tên là lớp FakeHttpContext từ một dự án có tên là MvcFakes. Tôi đã sử dụng dự án MvcFakes trong một số lời khuyên trước đây của mình để giả mạo ASP.NET MVC instrincis như là HTTPContext, ControllerContext và ViewContext.

Thứ hai, lưu ý rằng controller RouteDebugger tận dụng lớp NamedRoute mà tôi đã mô tả trong phần trước. RouteTable.Routes đại diện cho một tập hợp NamedRoutes thay vì Routes.

Thứ ba, lưu ý rằng RouteDebugger cho phép bạn chọn một phương thức HTTP khi kiểm tra một route (xem Hình 2). Ví dụ: bạn có thể debug các routes được gọi khi thực hiện thao tác GET so với thao tác POST.

Figure 2 -- Selecting an HTTP Method
![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/022eb2db50ff_8E75/image_thumb.png)

Cuối cùng, lưu ý rằng RouteDebugger không phụ thuộc vào view bên ngoài. Phương thức Index() chỉ đơn giản trả về một chuỗi. Theo cách đó, bạn không cần thêm view đặc biệt vào ứng dụng ASP.NET MVC hiện có để sử dụng controller RouteDebugger. Một lợi ích nữa là Route Debugger là View Engine agnostic. Tôi có ý tưởng này từ việc xem mã cho RouteDebugger của Phil Haack.

Sau khi bạn thêm một tham chiếu vào assembly RouteDebugger, bạn có thể gọi RouteDebugger bằng cách nhập URL sau vào trình duyệt của bạn:

`/RouteDebugger`

(Tất nhiên, điều này sẽ chỉ hoạt động nếu ứng dụng MVC của bạn bao gồm route mặc định hoặc custom route trỏ đến RouteDebugger).

Nếu bạn nhập URL vào URL input và nhấn nút Debug, RouteDebugger sẽ hiển thị danh sách tất cả các routes được cấu hình trong ứng dụng hiện tại. RouteDebugger chỉ ra các routes mà URL (và Phương thức HTTP) trùng hợp. Route đầu tiên phù hợp sẽ là route thực sự được sử dụng.

### Unit Testing Routes by Name
Bây giờ chúng ta cung cấp cho các routes tùy chỉnh tên của nó trở lại, chúng ta có thể xây dựng các unit test để kiểm tra các routes theo tên. Ví dụ, lớp unit test trong Liệt kê 4 chứa hai unit test.

Listing 4 – RouteTest.cs

```
using System.Web.Routing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MvcFakes;
using RouteDebugger;
using Tip29;
 
namespace Tip29Tests.Routes
{
    /// <summary>
    /// Summary description for RouteTest
    /// </summary>
    [TestClass]
    public class RouteTest
    {
        [TestMethod]
        public void TestInsertRoutePOST()
        {
            // Arrange
            var routes = new RouteCollection();
            GlobalApplication.RegisterRoutes(routes);
            
            // Act
            var fakeContext = new FakeHttpContext("~/Movie/Insert", "POST");
            var routeData = routes.GetRouteData(fakeContext);
 
            // Assert
            NamedRoute matchedRoute = (NamedRoute)routeData.Route;
            Assert.AreEqual("Insert", matchedRoute.Name);
        }
 
        [TestMethod]
        public void TestInsertRouteGET()
        {
            // Arrange
            var routes = new RouteCollection();
            GlobalApplication.RegisterRoutes(routes);
 
            // Act
            var fakeContext = new FakeHttpContext("~/Movie/Insert", "GET");
            var routeData = routes.GetRouteData(fakeContext);
 
            // Assert
            NamedRoute matchedRoute = (NamedRoute)routeData.Route;
            Assert.AreNotEqual("Insert", matchedRoute.Name);
        }
 
 
 
    
    }
}
```

Unit test đầu tiên, được đặt tên TestInsertRoutePost, kiểm tra custom route có tên là "Insert" khi thực hiện thao tác POST. Nó xác minh rằng Insert route là route được gọi khi bạn post URL ~/Movie/insert.

Thử nghiệm unit test thứ hai, được đặt tên TestInsertRouteGET, xác minh rằng Insert route không được gọi khi thao tác GET được thực hiện với cùng một URL ~/Movie/Insert. Cùng với nhau, các unit tests xác minh rằng Insert route chỉ có thể được gọi trong cả hoạt động POST.

### Tóm lược
Trong mẹo này, tôi đã trình bày cách tạo Route Debugger mà bạn có thể sử dụng để debug các routes trong bất kỳ ứng dụng ASP.NET MVC nào của mình. Chỉ cần thêm một tham chiếu đến assembly RouteDebugger.dll đi kèm với mã tải xuống. Tôi cũng đã giải thích làm thế nào để thay thế một cách kỳ diệu các routes ẩn danh trong bảng routes bằng các troutes được đặt tên. Cuối cùng, tôi đã cung cấp các unit tests mẫu để kiểm tra các routes tùy chỉnh của bạn theo tên.

[Download the Code](https://aspblogs.blob.core.windows.net/media/stephenwalther/Downloads/Tip29/Tip29.zip)

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-29-build-a-controller-to-debug-your-custom-routes