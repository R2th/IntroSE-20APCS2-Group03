Khi bạn tạo một route MVC, bạn có thể thêm các ràng buộc cho một route. Ví dụ: route sau đây sẽ hướng các request của trình duyệt tới controller có tên Blog và action có tên Archive:

```
routes.MapRoute(
  "BlogArchive",
  "Archive/{entryDate}",
  new { controller = "Blog", action = "Archive" } 
);
```

Route này được đặt tên là BlogArchive, ánh xạ ba tham số. Tham số của controller được gán giá trị Blog và tham số action được gán giá trị Archive. Cuối cùng, tham số entryDate lấy giá trị của nó từ tham số entryDate trong URL.

Thật không may, Route này phù hợp với quá nhiều requests. Nó phù hợp:
```
· /Archive/12-25-1966
· /Archive/12
· /Archive/apple
```
Bạn không muốn entryDate nhận các giá trị như 12 hoặc apple. Những giá trị này không thể được chuyển đổi thành ngày tháng.
Bạn có thể khắc phục sự cố này với route BlogArchive bằng cách thêm một ràng buộc cho tham số entryDate như thế này:
```
routes.MapRoute(
  "BlogArchive",
  "Archive/{entryDate}",
  new { controller = "Blog", action = "Archive" },
  new { entryDate = @"\d{2}-\d{2}-\d{4}" }
);
```

Phiên bản mới này của route BlogArchive bao gồm một ràng buộc đối với tham số entryDate. Ràng buộc yêu cầu tham số entryDate khớp với mẫu pattern ngày tháng như 12-25-1966. Một URL như  /Archive/apple sẽ không thỏa mãn ràng buộc này và route sẽ không trùng khớp.

### Hai loại ràng buộc route
URL Routing framework  nhận ra hai loại ràng buộc khác nhau. Khi bạn cung cấp một ràng buộc, bạn có thể cung cấp một chuỗi hoặc bạn có thể cung cấp một lớp thực thi interface IRouteConstraint.

Nếu bạn cung cấp một chuỗi cho một ràng buộc thì chuỗi đó được hiểu là một biểu thức thông thường. Ví dụ, ràng buộc entryDate mà chúng ta đã thảo luận trong phần trước là một ví dụ về ràng buộc regular expression.

Tùy chọn khác là tạo một ràng buộc tùy chỉnh bằng cách tạo một thể hiện của một lớp thực thi interface IRouteConstraint. URL Routing framework bao gồm một ràng buộc tùy chỉnh: ràng buộc httpMethod.

### Sử dụng HttpMethod Constraint
Bạn có thể tận dụng HttpMethod Constraint để ngăn controller action được gọi trừ khi action được gọi bằng một phương thức HTTP cụ thể. Ví dụ: bạn có thể muốn một action của bộ controller có tên là Insert() chỉ được gọi khi thực hiện thao tác POST HTTP chứ không phải khi thực hiện thao tác HTTP GET.

Đây là cách bạn có thể sử dụng ràng buộc httpMethod:
```
routes.MapRoute(
  "Product",
  "Product/Insert",
  new { controller = "Product", action = "Insert"}, 
  new { httpMethod = new HttpMethodConstraint("POST") }
);
```
Tham số cuối cùng được truyền cho phương thức MapRoute() đại diện cho một ràng buộc httpMethod mới có tên httpMethod. Nếu bạn đăng một form HTML lên /Product/Insert URL, thì controller action Product.Insert() sẽ được gọi. Tuy nhiên, nếu bạn chỉ yêu cầu /Product/Insert  bằng HTTP GET, thì route này sẽ không trùng khớp.

Nhân tiện, tên của ràng buộc không quan trọng. Chỉ có giá trị là quan trọng. Ví dụ: code sau hoạt động giống như code trước đó:

```
routes.MapRoute(
  "Product",
  "Product/Insert",
  new { controller = "Product", action = "Insert"}, 
  new { Grendal = new HttpMethodConstraint("POST") }
);
```

Trong code này, HttpMethodConstraint được đặt tên là Grendal. Bạn có thể đặt tên cho ràng buộc bất cứ cái gì mà bạn muốn và ràng buộc sẽ vẫn hoạt động.

### Tạo một Authenticated Constraint
Bạn tạo các ràng buộc tùy chỉnh bằng cách thực thi interface IRouteConstraint. Interface này có một phương thức mà bạn phải thực hiện: phương thức Match().

Ví dụ, mã trong Liệt kê 1 biểu thị một ràng buộc tùy chỉnh ngăn chặn truy cập không được xác thực vào một URL:

Listing 1 – AuthenticatedConstraint.cs

```
using System.Web;
using System.Web.Routing;
public class AuthenticatedConstraint : IRouteConstraint
{
  public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
  {
    return httpContext.Request.IsAuthenticated;
  }
}
```

Lưu ý rằng Liệt kê 1 chứa một lớp thực thi interface IRouteConstraint. Phương thức Match() kiểm tra xem người dùng hiện tại có được xác thực hay không và trả về True hoặc False.

Đây là cách bạn có thể sử dụng AuthenticatedConstraint khi tạo route:
```
routes.MapRoute(
  "Admin",
  "Admin/{action}",
  new { controller = "Admin", action = "Index" },
  new { authenticated= new AuthenticatedConstraint()}
);
```

Ràng buộc này ngăn các request từ người dùng ẩn danh truy cập đến Admin route.

Điều quan trọng là phải hiểu rằng mặc dù người dùng ẩn danh này không thể truy cập route cụ thể, route sau này có thể ánh xạ người dùng ẩn danh đến cùng một controller và controller action. Ví dụ: nếu route Admin làm theo route Default, thì người dùng có thể truy cập các trang Admin:
```
routes.MapRoute(
  "Default",
  "{controller}/{action}/{id}",
  new { controller = "Home", action = "Index", id = "" }
);
```

Vì lý do này, bạn nên loại trừ rõ ràng các trang Admin khỏi Default route với một ràng buộc rõ ràng.

### Tạo NotEqual Constraint
Cách dễ nhất để loại trừ một tập hợp các trang phù hợp với route cụ thể, là tận dụng custom route constraint.

Listing 2 – NotEqualConstraint.cs

```
using System;
using System.Web;
using System.Web.Routing;

public class NotEqual : IRouteConstraint
{
  private string _match = String.Empty;

  public NotEqual(string match)
  {
    _match = match;
  }

  public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
  {
    return String.Compare(values[parameterName].ToString(), _match, true) != 0;
  }
}
```
Tuyến này sẽ không khớp với bất kỳ request nào khi tham số controller nhận giá trị Admin. Ví dụ: route này sẽ không khớp với URLs /Admin/DeleteAll hoặc /Admin/Index.

### Tạo Local Constraint
Bạn cũng có thể tạo một ràng buộc tùy chỉnh để ngăn yêu cầu khớp với URL trừ khi yêu cầu được thực hiện từ máy local. Loại ràng buộc này có thể hữu ích cho việc hạn chế quyền truy cập vào các trang quản trị web.

Liệt kê 3 chứa mã cho lớp LocalConstraint.
Listing 3 – LocalConstaint.cs

```
using System.Web;
using System.Web.Routing;

public class LocalConstraint : IRouteConstraint
{

  public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
  {
    return httpContext.Request.IsLocal;
  }
}
```

LocalConstraint chỉ cần kiểm tra xem yêu cầu hiện tại có phải là yêu cầu ở local hay không bằng cách tận dụng thuộc tính Request.IsLocal. Thuộc tính này trả về giá trị True khi máy chủ bằng với localhost hoặc 127.0.0.1 .

### Kiểm tra Route Constraints
Vì vậy, làm thế nào để bạn kiểm tra các route constraints? Thật Dễ dàng, đó là giả mạo các HTTPContext. Thử nghiệm trong Liệt kê 4 có thể được sử dụng để xác minh rằng Product route bao gồm một ràng buộc HTTPMethod.

Liệt kê 4 - Một bài kiểm tra đơn vị cho ràng buộc httpMethod
Listing 4 – A Unit Test for the HttpMethod Constraint

```
[TestMethod]
public void TestInsertIsPost()

{
  // Arrange
  var routes = new RouteCollection();
  GlobalApplication.RegisterRoutes(routes);

  // Act with POST request
  var fakeContext1 = new FakeHttpContext("~/Product/Insert", "POST");
  var routeData1 = routes.GetRouteData(fakeContext1);

  // Assert
  NamedRoute matchedRoute1 = (NamedRoute)routeData1.Route;
  Assert.AreEqual("Product", matchedRoute1.Name);

  // Act with GET request
  var fakeContext2 = new FakeHttpContext("~/Product/Insert");
  var routeData2 = routes.GetRouteData(fakeContext2);

  // Assert
  NamedRoute matchedRoute2 = (NamedRoute)routeData2.Route;
  Assert.AreNotEqual("Product", matchedRoute2.Name);

}
```
Unit test trong Liệt kê 4 bao gồm hai thử nghiệm. Đầu tiên, URL /Product/Insert được yêu cầu bằng cách thực hiện thao tác POST. Product route phải được trùng khớp trong bảng route. Tiếp theo, cùng một URL được yêu cầu trong khi thực hiện thao tác GET. Product route sẽ không trùng khớp khi thực hiện GET.

Unit Test trong Liệt kê 5 cho thấy cách bạn có thể kiểm tra AuthenticatedConstraint.
Listing 5 – Unit Test for AuthenticatedConstraint

```
[TestMethod]
public void TestAdminRouteIsAuthenticated()
{
  // Arrange
  var routes = new RouteCollection();
  GlobalApplication.RegisterRoutes(routes);

  // Act with authenticated request
  var fakeUser = new FakePrincipal(new FakeIdentity("Bob"), null);
  var fakeContext1 = new FakeHttpContext(new Uri("http://localhost/Admin/Index"), "~/Admin/Index", fakeUser);
  var routeData1 = routes.GetRouteData(fakeContext1);

  // Assert
  NamedRoute matchedRoute1 = (NamedRoute)routeData1.Route;
  Assert.AreEqual("Admin", matchedRoute1.Name);

  // Act with anonymous request
  var fakeContext2 = new FakeHttpContext(new Uri("http://localhost/Admin/Index"), "~/Admin/Index");
  var routeData2 = routes.GetRouteData(fakeContext2);

  // Assert
  Assert.IsNull(routeData2);
}
```

Unit test này cũng bao gồm hai bài kiểm tra. Đầu tiên, một người dùng giả mạo được tạo ra với sự trợ giúp của lớp FakeIdentity. Khi URL /Admin/Index được yêu cầu với danh tính giả trong context, Admin route sẽ trùng khớp. Khi cùng một URL được yêu cầu ẩn danh, không có route nào trùng khớp.

### Tóm lược
Trong mẹo này, bạn đã học cách tạo các custom route constraints. Chúng tôi đã tạo ba ràng buộc route tùy chỉnh: AuthenticatedConstraint, NotEqualConstraint và LocalConstraint. Tôi cũng chỉ cho bạn cách bạn có thể xây dựng các unit tests cho các route bao gồm các ràng buộc tùy chỉnh.


Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-30-create-custom-route-constraints