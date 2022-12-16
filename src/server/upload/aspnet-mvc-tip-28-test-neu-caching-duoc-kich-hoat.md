Trong mẹo này, tôi trình bày cách bạn có thể kiểm tra xem thuộc tính OutputCache có trên controller action. Tôi cũng trình bày cách bạn có thể kiểm tra nếu thuộc tính OutputCache được đặt với thời lượng cụ thể.

Caching là cách hiệu quả nhất để cải thiện hiệu năng của ứng dụng ASP.NET MVC. Hoạt động chậm nhất mà bạn có thể thực hiện trong một ứng dụng web là truy cập cơ sở dữ liệu. Cách tốt nhất để cải thiện hiệu suất truy cập cơ sở dữ liệu là hoàn toàn không truy cập cơ sở dữ liệu. Bộ nhớ đệm cho phép bạn tránh phải truy cập cơ sở dữ liệu với mỗi yêu cầu.

Bạn có thể cache view (hoặc bất kỳ  Action Result nào) được trả về bởi controller action bằng cách thêm thuộc tính OutputCache vào controller action. Ví dụ, controller trong Liệt kê 1 được cấu hình để cache view do action Index() trả về trong 10 giây.

Listing 1 – HomeController.vb (VB.NET)

```
<HandleError()> _
Public Class HomeController
    Inherits System.Web.Mvc.Controller
 
    <OutputCache(Duration:=10)> _
    Function Index()
        Return View()
    End Function
 
End Class
```
Listing 1 – HomeController.cs (C#)

```
using System.Web.Mvc;
 
namespace Tip27.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        [OutputCache(Duration=10)]
        public ActionResult Index()
        {
            return View();
        }
 
    }
}
```
Action Index () trong Liệt kê 1 trả về view trong Liệt kê 2. Lưu ý rằng view này chỉ hiển thị thời gian hiện tại (xem Hình 1).

Figure 1 – A view cached for 10 seconds
![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip28TestIfCachingIsEnabled_B948/clip_image002_thumb.jpg)
Listing 2 – Index.aspx

```
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Tip27.Views.Home.Index" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <div>
    
    The current time is: <%= DateTime.Now.ToString("T") %>
    
    
    </div>
</body>
</html>
```
(Nhân tiện, đừng bao giờ đặt thuộc tính OutputCache trong View. Bạn chỉ nên cấu hình caching trong controller).

Nếu bạn gọi action Index(), thì bạn sẽ có View Index. Nếu bạn liên tục nhấn refresh trong trình duyệt của mình, thì thời gian hiển thị trong View sẽ cập nhật cứ sau 10 giây.

Vì vậy, làm thế nào để bạn kiểm tra bộ nhớ đệm? Tôi không có nghĩa là làm thế nào để bạn kiểm tra xem bộ nhớ đệm hoạt động hay không. Đây là một vấn đề framework mà Microsoft đã thử nghiệm cho bạn. Ý tôi là làm thế nào để bạn kiểm tra xem caching  có được kích hoạt trên một controller action cụ thể trong một ứng dụng MVC mà bạn viết không?

Nó chỉ ra rằng việc kiểm tra xem một controller action cụ thể có thuộc tính OutputCache có thực sự dễ dàng hay không. Hãy xem thử nghiệm trong Liệt kê 3.
Listing 3 – HomeControllerTest.vb (VB.NET)

```
Imports System
Imports System.Collections.Generic
Imports System.Text
Imports System.Web.Mvc
Imports Microsoft.VisualStudio.TestTools.UnitTesting
Imports Tip28
 
<TestClass()> Public Class HomeControllerTest
 
 
    <TestMethod()> Public Sub IndexIsCachedFor10Seconds()
        ' Arrange
        Dim indexMethod = GetType(HomeController).GetMethod("Index")
        Dim outputCacheAttributes = indexMethod.GetCustomAttributes(GetType(OutputCacheAttribute), True)
 
        ' Assert
        Assert.IsTrue(outputCacheAttributes.Length > 0)
        For Each outputCache As OutputCacheAttribute In outputCacheAttributes
            Assert.IsTrue(outputCache.Duration = 10)
        Next
    End Sub
 
 
End Class
```
Listing 3 – HomeControllerTest.cs (C#)

```
using System.Reflection;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tip27.Controllers;
 
namespace Tip27Tests.Controllers
{
    /// <summary>
    /// Summary description for HomeControllerTest
    /// </summary>
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void IndexIsCachedFor10Seconds()
        {
            // Arrange
            MethodInfo indexMethod = typeof(HomeController).GetMethod("Index");
            var outputCacheAttributes = indexMethod.GetCustomAttributes(typeof(OutputCacheAttribute), true);
 
            // Assert
            Assert.IsTrue(outputCacheAttributes.Length > 0);
            foreach (OutputCacheAttribute outputCache in outputCacheAttributes)
            {
                Assert.IsTrue(outputCache.Duration == 10);
            }
        }
 
  
    }
}
```
Thử nghiệm trong Liệt kê 3 lấy tất cả các thuộc tính OutputCache từ phương thức Index (có thể có nhiều hơn một). Nếu phương thức Index() không bao gồm ít nhất một thuộc tính OutputCache thì thử nghiệm thất bại. Nếu mỗi thuộc tính OutputCache không có thuộc tính Thời lượng được đặt thành giá trị 10 giây, thì thử nghiệm thất bại.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-28-test-if-caching-is-enabled