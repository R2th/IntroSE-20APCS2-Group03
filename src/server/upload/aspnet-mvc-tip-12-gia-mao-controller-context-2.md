Chúng ta hãy xem các ví dụ cụ thể về việc sử dụng lớp FakeControllerContext để mô phỏng các hàm cơ bản của ASP.NET khác nhau.

## Testing Form Parameters
Hãy tưởng tượng rằng bạn muốn kiểm tra hành vi của một controller action khi bạn truyền các tham số form khác nhau cho action. Hơn nữa, hãy tưởng tượng rằng controller action truy cập bộ Request.Form trực tiếp như sau:

VB.NET Version

```
Public Function Insert() As ActionResult
  ViewData("firstname") = Request.Form("firstName")
  ViewData("lastName") = Request.Form("lastName")
 
  Return View()
End Function
```

C# Version

```
public ActionResult Insert()
{
  ViewData["firstname"] = Request.Form["firstName"];
  ViewData["lastName"] = Request.Form["lastName"];
 
  return View();
}
```

Làm thế nào để bạn kiểm tra controller action này? Trong trường hợp này, bạn có thể tận dụng lợi thế của hàm tạo FakeControllerContext mà lấy một bộ các tham số form. Đây là một kiểm tra để kiểm tra xem các tham số mẫu firstName và lastName có được vào View không:

VB.NET Version

```
<TestMethod()> _
Public Sub TestFakeFormParams()
    ' Create controller
    Dim controller = New HomeController()
 
    ' Create fake controller context
    Dim formParams = New NameValueCollection()
    formParams.Add("firstName", "Stephen")
    formParams.Add("lastName", "Walther")
    controller.ControllerContext = New FakeControllerContext(controller, formParams)
 
    ' Act
    Dim result = TryCast(controller.Insert(), ViewResult)
    Assert.AreEqual("Stephen", result.ViewData("firstName"))
    Assert.AreEqual("Walther", result.ViewData("lastName"))
End Sub
```

C# Version

```
[TestMethod]
public void TestFakeFormParams()
{
    // Create controller
    var controller = new HomeController();
 
    // Create fake controller context
    var formParams = new NameValueCollection { { "firstName", "Stephen" }, {"lastName", "Walther"} };
    controller.ControllerContext = new FakeControllerContext(controller, formParams);
 
    // Act
    var result = controller.Insert() as ViewResult;
    Assert.AreEqual("Stephen", result.ViewData["firstName"]);
    Assert.AreEqual("Walther", result.ViewData["lastName"]); 
}
```

Các tham số mẫu cho FakeControllerContext được tạo ra với NameValueCollection. Bộ dữ liệu mẫu này giả định được chuyển đến constructor cho FakeControllerContext.

## Thử nghiệm các tham số Query String
Hãy tưởng tượng rằng bạn cần phải kiểm tra xem các tham số query string có được chuyển đến View hay không. Các tham số query string được truy cập trực tiếp từ Request.QueryString. Ví dụ, controller action có thể trông như thế này:

VB Version

```
Public Function Details() As ViewResult
    ViewData("key1") = Request.QueryString("key1")
    ViewData("key2") = Request.QueryString("key2")
    ViewData("count") = Request.QueryString.Count
 
    Return View()
End Function
```

C# Version

```
public ViewResult Details()
{
  ViewData["key1"] = Request.QueryString["key1"];
  ViewData["key2"] = Request.QueryString["key2"];
  ViewData["count"] = Request.QueryString.Count;
            
  return View();
}
```
Trong trường hợp này, bạn có thể giả mạo các tham số query string bằng cách truyền một NameValueCollection tới lớp FakeControllerContext như sau:
VB Version

```
<TestMethod()> _
Public Sub TestFakeQueryStringParams()
    ' Create controller
    Dim controller = New HomeController()
 
    ' Create fake controller context
    Dim queryStringParams = New NameValueCollection()
    queryStringParams.Add("key1", "a")
    queryStringParams.Add("key2", "b")
    controller.ControllerContext = New FakeControllerContext(controller, Nothing, queryStringParams)
 
    ' Act
    Dim result = TryCast(controller.Details(), ViewResult)
    Assert.AreEqual("a", result.ViewData("key1"))
    Assert.AreEqual("b", result.ViewData("key2"))
    Assert.AreEqual(queryStringParams.Count, result.ViewData("count"))
End Sub
```

C# Version

```
[TestMethod]
public void TestFakeQueryStringParams()
{
    // Create controller
    var controller = new HomeController();
 
    // Create fake controller context
    var queryStringParams = new NameValueCollection { { "key1", "a" }, { "key2", "b" } };
    controller.ControllerContext = new FakeControllerContext(controller, null, queryStringParams);
 
    // Act
    var result = controller.Details() as ViewResult;
    Assert.AreEqual("a", result.ViewData["key1"]);
    Assert.AreEqual("b", result.ViewData["key2"]);
    Assert.AreEqual(queryStringParams.Count, result.ViewData["count"]);
}
```
Lưu ý rằng các tham số query string được truyền như là tham số thứ hai của hàm tạo của FakeControllerContext.

##  Thử nghiệm người dùng
Bạn có thể cần phải kiểm tra tính bảo mật của các controller action của bạn. Ví dụ: bạn có thể muốn hiển thị một View cho một người dùng xác thực cụ thể. Controller action sau đây sẽ hiển thị một chế độ Secret đối với người dùng đã được chứng thực và chuyển hướng mọi người sang chế độ view Index:

VB Version

```
Public Function Secret() As ActionResult
    If User.Identity.IsAuthenticated Then
        ViewData("userName") = User.Identity.Name
        Return View("Secret")
    Else
        Return RedirectToAction("Index")
    End If
End Function
```

C# Version

```
public ActionResult Secret()
{
    if (User.Identity.IsAuthenticated)
    {
        ViewData["userName"] = User.Identity.Name;
        return View("Secret");
    }
    else
    {
        return RedirectToAction("Index");
    }
}
```
Bạn có thể sử dụng FakeController để kiểm tra xem hành động này có hoạt động như bạn mong đợi như sau:

VB Version

```
<TestMethod()> _
Public Sub TestFakeUser()
    ' Create controller
    Dim controller = New HomeController()
 
    ' Check what happens for authenticated user
    controller.ControllerContext = New FakeControllerContext(controller, "Stephen")
    Dim result = TryCast(controller.Secret(), ActionResult)
    Assert.IsInstanceOfType(result, GetType(ViewResult))
    Dim viewData As ViewDataDictionary = (CType(result, ViewResult)).ViewData
    Assert.AreEqual("Stephen", viewData("userName"))
 
    ' Check what happens for anonymous user
    controller.ControllerContext = New FakeControllerContext(controller)
    result = TryCast(controller.Secret(), ActionResult)
    Assert.IsInstanceOfType(result, GetType(RedirectToRouteResult))
End Sub
```

C# Version

```
[TestMethod]
public void TestFakeUser()
{
    // Create controller
    var controller = new HomeController();
 
    // Check what happens for authenticated user
    controller.ControllerContext = new FakeControllerContext(controller, "Stephen");
    var result = controller.Secret() as ActionResult;
    Assert.IsInstanceOfType(result, typeof(ViewResult));
    ViewDataDictionary viewData = ((ViewResult) result).ViewData;
    Assert.AreEqual("Stephen", viewData["userName"]);
 
    // Check what happens for anonymous user
    controller.ControllerContext = new FakeControllerContext(controller);            
    result = controller.Secret() as ActionResult;
    Assert.IsInstanceOfType(result, typeof(RedirectToRouteResult));
}
```
Thử nghiệm này thực sự kiểm tra ba điều (có thể nó sẽ được chia thành nhiều bài kiểm tra). Trước tiên, nó kiểm tra xem một người dùng đã được chứng thực có được View lại từ controller action. Hơn nữa, nó kiểm tra xem liệu tên người dùng đã được chứng thực có được thêm vào View data thành công hay không. Cuối cùng, nó kiểm tra rằng người dùng ẩn danh được chuyển hướng khi controller action được thực hiện.

## Kiểm tra vai trò người dùng
Bạn có thể muốn hiển thị nội dung khác nhau cho người dùng khác nhau tùy thuộc vào vai trò của họ. Ví dụ: các quản trị viên (Admins) cho một trang web chỉ có thể xem được nội dung nhất định. Hãy tưởng tượng rằng bạn có controller action giống như sau:

VB Version

```
Public Function Admin() As ActionResult
    If User.IsInRole("Admin") Then
        Return View("Secret")
    Else
        Return RedirectToAction("Index")
    End If
End Function
```

C# Version

```
public ActionResult Admin()
{
    if (User.IsInRole("Admin"))
    {
        return View("Secret");
    }
    else
    {
        return RedirectToAction("Index");
    }
}
```
Controller action này trả về chế độ Secret chỉ khi bạn là một thành viên của vai trò Quản trị viên.

Bạn có thể kiểm tra controller action này bằng phương pháp kiểm tra sau:

VB Version

```
<TestMethod()> _
Public Sub TestFakeUserRoles()
    ' Create controller
    Dim controller = New HomeController()
 
    ' Check what happens for Admin user
    controller.ControllerContext = New FakeControllerContext(controller, "Stephen", New String() {"Admin"})
    Dim result = TryCast(controller.Admin(), ActionResult)
    Assert.IsInstanceOfType(result, GetType(ViewResult))
 
    ' Check what happens for anonymous user
    controller.ControllerContext = New FakeControllerContext(controller)
    result = TryCast(controller.Admin(), ActionResult)
    Assert.IsInstanceOfType(result, GetType(RedirectToRouteResult))
End Sub
```

C# Version

```
[TestMethod]
public void TestFakeUserRoles()
{
    // Create controller
    var controller = new HomeController();
 
    // Check what happens for Admin user
    controller.ControllerContext = new FakeControllerContext(controller, "Stephen", new string[] {"Admin"});
    var result = controller.Admin() as ActionResult;
    Assert.IsInstanceOfType(result, typeof(ViewResult));
 
    // Check what happens for anonymous user
    controller.ControllerContext = new FakeControllerContext(controller);
    result = controller.Admin() as ActionResult;
    Assert.IsInstanceOfType(result, typeof(RedirectToRouteResult));
}
```
Thử nghiệm này xác minh rằng chỉ các thành viên của vai trò Quản trị viên mới có thể xem chế độ xem Bí mật. Kiểm tra cũng chỉ rằng người dùng ẩn danh được chuyển hướng đến một trang khác.

## Kiểm tra Cookies Trình duyệt
Hãy tưởng tượng rằng bạn cần phải kiểm tra các hành động truy cập cookie của trình duyệt. Ví dụ: bạn có thể chuyển id khách hàng xung quanh trong một cookie của trình duyệt. Làm thế nào để kiểm tra loại hành động này?

Controller action sau chỉ cần thêm một cookie của trình duyệt để xem dữ liệu:

VB Version
```
Public Function TestCookie() As ViewResult
    ViewData("key") = Request.Cookies("key").Value
    Return View()
End Function
```

C# Version

```
public ViewResult TestCookie()
{
    ViewData["key"] = Request.Cookies["key"].Value;
    return View();
}
```
Bạn có thể kiểm tra controller action này bằng cách tạo ra một SessionItemCollection và chuyển sang FakeControllerContext như sau:
VB Version

```
<TestMethod()> _
Public Sub TestCookies()
    ' Create controller
    Dim controller = New HomeController()
 
    ' Create fake Controller Context
    Dim cookies = New HttpCookieCollection()
    cookies.Add(New HttpCookie("key", "a"))
    controller.ControllerContext = New FakeControllerContext(controller, cookies)
    Dim result = TryCast(controller.TestCookie(), ViewResult)
 
    ' Assert
    Assert.AreEqual("a", result.ViewData("key"))
End Sub
```

C# Version

```
[TestMethod]
public void TestCookies()
{
    // Create controller
    var controller = new HomeController();
 
    // Create fake Controller Context
    var cookies = new HttpCookieCollection();
    cookies.Add( new HttpCookie("key", "a"));
    controller.ControllerContext = new FakeControllerContext(controller, cookies);
    var result = controller.TestCookie() as ViewResult;
 
    // Assert
    Assert.AreEqual("a", result.ViewData["key"]);
}
```
Thử nghiệm này xác minh rằng controller action trên thực tế thêm một cookie có tên là chìa khóa để xem dữ liệu.

## Kiểm tra trạng thái phiên
Mẫu cuối cùng. Hãy nhìn vào cách chúng ta có thể kiểm tra một controller action truy cập vào session state:
VB Version

```
Public Function TestSession() As ViewResult
    ViewData("item1") = Session("item1")
    Session("item2") = "cool!"
    Return View()
End Function
```

C# Version

```
public ViewResult TestSession()
{
    ViewData["item1"] = Session["item1"];
    Session["item2"] = "cool!";
    return View();
}
```

Controller action này đọc và ghi vào session state. Một mục có tên item1 được lấy từ session state và được thêm vào View data. Controller action cũng tạo ra một session state mới có tên là item2.

Chúng ta có thể kiểm tra Controller action này với các unit test sau đây:

VB Version

```
<TestMethod()> _
Public Sub TestSessionState()
    ' Create controller
    Dim controller = New HomeController()
 
    ' Create fake Controller Context
    Dim sessionItems = New SessionStateItemCollection()
    sessionItems("item1") = "wow!"
    controller.ControllerContext = New FakeControllerContext(controller, sessionItems)
    Dim result = TryCast(controller.TestSession(), ViewResult)
 
    ' Assert
    Assert.AreEqual("wow!", result.ViewData("item1"))
 
    ' Assert
    Assert.AreEqual("cool!", controller.HttpContext.Session("item2"))
End Sub
```

C# Version

```
[TestMethod]
public void TestSessionState()
{
    // Create controller
    var controller = new HomeController();
 
    // Create fake Controller Context
    var sessionItems = new SessionStateItemCollection();
    sessionItems["item1"] = "wow!";
    controller.ControllerContext = new FakeControllerContext(controller, sessionItems);
    var result = controller.TestSession() as ViewResult;
 
    // Assert
    Assert.AreEqual("wow!", result.ViewData["item1"]);
 
    // Assert
    Assert.AreEqual("cool!", controller.HttpContext.Session["item2"]);
}
```
Lưu ý rằng một SessionStateItemCollection được tạo ra và truyền cho hàm tạo của FakeControllerContext. SessionStateItemCollection đại diện cho tất cả các mục trong session state.

## Phần kết luận
Trong phần này, chúng tôi đã giới thiệu cho các bạn về cách bạn có thể thử nghiệm ASP.NET intrinsics - như các tham số dạng, các tham số chuỗi truy vấn, nhận dạng người dùng, vai trò người dùng, cookies và session state - bằng cách sử dụng một bộ các lớp giả mạo. Bạn có thể tải về nguồn hoàn chỉnh cho các lớp giả này (cả C # và VB.NET) bằng cách nhấp vào liên kết sau:

[Download the Code](https://aspblogs.blob.core.windows.net/media/stephenwalther/Downloads/Tip12/Tip12.zip)

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-12-faking-the-controller-context