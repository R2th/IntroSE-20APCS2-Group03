Trong mẹo này, tôi trình bày cách bạn có thể tạo một controller tùy chỉnh mà bạn có thể sử dụng để debug các custom routes mà bạn thêm vào các ứng dụng ASP.NET MVC (xem Hình 1). Tôi cũng giải thích cách bạn có thể tạo các unit test để kiểm tra các custom route theo tên.
Figure 1 – Using the RouteDebugger Controller
	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/022eb2db50ff_8E75/clip_image002_thumb.jpg)

Tôi đã được truyền cảm hứng để thực hiện dự án này bởi Phil Haack’s ASP.NET Routing Debugger:

http://haacked.com/archive/2008/03/13/url-routing-debugger.aspx

Tuy nhiên, có một số khác biệt quan trọng giữa Route Debugger mà tôi mô tả trong mẹo này và Route Debugger của Phil 'Haack. Đầu tiên, tôi muốn có thể kiểm tra các custom routes theo tên . Ví dụ: nếu bạn tạo hai routes mới có tên MyCustomRoute1 và MyCustomRoute2, tôi muốn Route Debugger của tôi có thể cho tôi biết route nào trong hai routes này thực sự được gọi.

Thứ hai, tôi muốn có thể kiểm tra các tcustom route của mình khi thực hiện các loại HTTP khác nhau. Ví dụ: tôi muốn kiểm tra route nào được gọi khi bạn thực hiện thao tác GET so với thao tác POST. Và, có khả năng, tôi muốn có thể kiểm tra các route với các loại thay đổi khác trong HttpContext.

Cuối cùng, tôi muốn triển khai Route Debugger của mình như một controller mà tôi có thể thêm vào bất kỳ ứng dụng ASP.NET MVC nào chỉ bằng cách thêm một tham chiếu đến assembly RouteDebugger. Sau khi bạn thêm một reference đến assembly RouteDebugger, bạn có thể gọi RouteDebugger bằng URL sau:

`/RouteDebugger`

### Để Route về với tên
Một thách thức mà bạn nhanh chóng gặp phải khi sử dụng URL Routing liên quan đến tên route. Khi bạn tạo một route mới, bạn có thể cung cấp tên cho route mới. Thật không may, tuy nhiên, không có cách nào để lấy lại tên route. Bản thân lớp Route không có thuộc tính Tên. Hơn nữa, lớp RouteCollection không cho phép bạn truy xuất danh sách tên route.

Vì bạn không thể lấy lại tên route từ các lớp Route hoặc RouteCollection, nên bạn không thể dễ dàng gỡ lỗi hoặc kiểm tra routes theo tên. Tôi muốn Route Debugger của tôi có thể cho tôi biết routes nào được sử dụng theo tên. Hơn nữa, tôi muốn tạo các unit test để kiểm tra xem một route cụ thể có tên cụ thể đã được sử dụng hay chưa. Do đó, trước khi chúng tôi làm bất cứ điều gì khác, chúng tôi cần cung cấp cho route của mình tên của nó trở lại.

Lớp NamedRoute trong Liệt kê 1 kế thừa từ lớp Route. Lớp NamedRoute chỉ cần thêm một thuộc tính Tên mới vào lớp Route base.
Listing 1 – NamedRoute.cs

```
using System.Web.Routing;
 
namespace RouteDebugger
{
    public class NamedRoute : Route
    {
        private string _name;
 
        public NamedRoute(string name, string url, IRouteHandler routeHandler):base(url, routeHandler)
        {
            _name = name;
        }
 
        public NamedRoute(string name, string url, RouteValueDictionary defaults, RouteValueDictionary constraints, IRouteHandler routeHandler)
            : base(url, defaults, constraints, routeHandler)
        {
            _name = name;
        }
 
        public NamedRoute(string name, string url, RouteValueDictionary defaults, RouteValueDictionary constraints, RouteValueDictionary dataTokens, IRouteHandler routeHandler)
            : base(url, defaults, constraints, dataTokens, routeHandler)
        {
            _name = name;
        }
 
        public string Name
        {
            get { return _name; }
        }
 
    }
 
 
}
```
Bạn không cần thực hiện bất kỳ thay đổi nào đối với các bảng route hiện tại trong tệp Global.asax của mình để sử dụng lớp NamedRoute thay vì lớp Route. Project RouteDebugger bao gồm một tập hợp cRouteCollection extension method mới thay thế các RouteCollection extension method đi kèm với ASP.NET MVC framework. Xem Liệt kê 2.

Listing 2 – RouteCollectionExtensions.cs

```
using System.Web.Routing;
using System.Web.Mvc;
 
 
public static class RouteCollectionExtensions
{
    public static void IgnoreRoute(this RouteCollection routes, string url)
    {
        routes.IgnoreRoute(string.Empty, url, null);
    }
    
    public static void IgnoreRoute(this RouteCollection routes, string name, string url)
    {
        routes.IgnoreRoute(name, url, null);
    }
 
 
    public static void IgnoreRoute(this RouteCollection routes, string name, string url, object constraints)
    {
        var newRoute = new RouteDebugger.NamedRoute(name, url, new StopRoutingHandler());
        routes.Add(name, newRoute);
    }
 
    public static void MapRoute(this RouteCollection routes, string name, string url)
    {
        routes.MapRoute(name, url, null, null);
    }
 
    public static void MapRoute(this RouteCollection routes, string name, string url, object defaults)
    {
        routes.MapRoute(name, url, defaults, null);
    }
 
    public static void MapRoute(this RouteCollection routes, string name, string url, object defaults, object constraints)
    {
        var newRoute = new RouteDebugger.NamedRoute(name, url, new MvcRouteHandler());
        newRoute.Defaults = new RouteValueDictionary(defaults);
        newRoute.Constraints = new RouteValueDictionary(constraints);
        routes.Add(name, newRoute);
    }
}
```
Project RouteDebugger (mà bạn có thể ở cuối mẹo này) bao gồm cả các lớp NamedRoute và RouteCollectionExtension. Nếu bạn thêm một tham chiếu đến assembly RouteDebugger vào dự án ASP.NET MVC, thì các routes trong dự án sẽ được tự động chuyển thành các thể hiện của lớp NamedRoute.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-29-build-a-controller-to-debug-your-custom-routes