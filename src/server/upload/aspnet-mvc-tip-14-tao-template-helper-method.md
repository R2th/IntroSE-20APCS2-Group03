Trong mẹo này, bạn sẽ tìm hiểu cách tạo và sử dụng các mẫu trong framework MVC mà bạn có thể sử dụng để hiển thị dữ liệu trong cơ sở dữ liệu. Tôi sẽ chỉ cho bạn cách tạo một method\ MVC Helper mới có tên là method RenderTemplate().

Trong khi tôi trở về nhà ở California trong 4 ngày của cuối tuần tháng bảy, tôi đã nói chuyện với anh trai tôi, 1 người thông minh hơn tôi về sự khác biệt giữa việc xây dựng các ứng dụng web với ASP.NET Web Forms, ASP.NET MVC, và Ruby on Rails. Thực tế là tôi thực sự bị mất khả năng kiểm soát khi xây dựng một ứng dụng ASP.NET MVC. Đặc biệt, tôi đã phàn nàn rằng tôi đã bỏ lỡ sự tách biệt giữa HTML và UI logic được cung cấp bởi các mẫu mà bạn nhận được với ASP.NET Web Forms control. 

Anh tôi nói với tôi 1 điều đáng ngạc nhiên. Anh ta nói “Các mẫu, Ruby on Rails có các khuôn mẫu, chúng được gọi là partials.” Lúc đầu, tôi không hiểu. Tôi nghĩ partials trong thế giới Ruby on Rails ít nhiều giống với user control trong thế giới ASP.NET MVC. Tuy nhiên, anh tôi đã giải thích rằng khi bạn tạo một phần trong ứng dụng Ruby on Rails, bạn có thể chuyển một tập hợp các item. Mỗi mục trong collection được hiển thị với một partial.

OK. Bạn có thể sử dụng phương pháp tương tự để tạo mẫu trong ứng dụng ASP.NET MVC. Tạo một helper method mới chấp nhận một IEnumerable và một đường dẫn đến một user control. helper method có thể sử dụng  user control làm mẫu cho mỗi item từ IEnumerable. Liệt kê 1 chứa mã cho một helper method mới có tên là phương thức RenderTemplate ().

Listing 1 – TemplateExtensions.vb (VB.NET)

```
Imports System
Imports System.Text
Imports System.Collections
Imports System.Web.Mvc
 
Public Module TemplateExtensions
 
    <System.Runtime.CompilerServices.Extension()> _
    Public Function RenderTemplate(ByVal helper As HtmlHelper, ByVal items As IEnumerable, ByVal virtualPath As String) As String
        Dim sb = New StringBuilder()
        For Each item As Object In items
            sb.Append(helper.RenderUserControl(virtualPath, item))
        Next item
        Return sb.ToString()
    End Function
 
 
End Module
```

Listing 1 – TemplateExtensions.cs (C#)
```

using System;
using System.Text;
using System.Collections;
using System.Web.Mvc;
 
namespace Helpers
{
    public static class TemplateExtensions
    {
 
        public static string RenderTemplate(this HtmlHelper helper, IEnumerable items, string virtualPath)
        {
            var sb = new StringBuilder();
            foreach (object item in items)
            {
                sb.Append( helper.RenderUserControl(virtualPath, item));
                
            }
            return sb.ToString();
        }
 
 
    }
}
```
Hãy tưởng tượng, ví dụ, bạn muốn hiển thị một danh sách các bộ phim. Bạn có thể sử dụng HomeController trong Liệt kê 2 để trả về một tập hợp các thực thể Movie. Hành động Index() thực thi truy vấn LINQ to SQL và chuyển kết quả truy vấn tới view Index.
Listing 2 – HomeController.vb (VB.NET)

```
Public Class HomeController
    Inherits System.Web.Mvc.Controller
 
 
    Private _dataContext As New MovieDataContext()
 
 
    Public Function Index() As ActionResult
        Dim movies = _dataContext.Movies
        Return View(movies)
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
using Tip14.Models;
 
namespace Tip14.Controllers
{
    public class HomeController : Controller
    {
        private MovieDataContext _dataContext = new MovieDataContext();
 
 
        public ActionResult Index()
        {
            var movies = _dataContext.Movies;
            return View(movies);
        }
 
    
    }
}
```

View trong Liệt kê 3 đơn giản gọi phương thức RenderTemplate () truyền phương thức ViewData.Model và đường dẫn đến một  User Control MVC có chứa mẫu cho mỗi bộ phim.

Listing 3 -- Index.aspx (VB.NET)

```
<%@ Page Language="VB" AutoEventWireup="false" CodeBehind="Index.aspx.vb" Inherits="Tip14.Index" %>
<%@ Import Namespace="Tip14" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <div>
    
    <%= Html.RenderTemplate(ViewData.Model, "~/Views/Home/MovieTemplate.ascx") %>
    
    </div>
</body>
</html>
```
Listing 3 -- Index.aspx (C#)

```
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Tip14.Views.Home.Index" %>
<%@ Import Namespace="Helpers" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
</head>
<body>
    <div>
    
    <%= Html.RenderTemplate(ViewData.Model, "~/Views/Home/MovieTemplate.ascx") %>
    
    </div>
</body>
</html>
```

MovieTemplate.ascx MVC User Control là strongly typed. Tệp mã-đằng sau cho user control này được chứa trong Liệt kê 4. Lưu ý rằng user control là strongly typed để đại diện cho một thực thể Phim.

Listing 4 – MovieTemplate.ascx.vb (VB.NET)

```
Public Partial Class MovieTemplate
    Inherits System.Web.Mvc.ViewUserControl(Of Movie)
 
End Class
```
Listing 4 – MovieTemplate.ascx.cs (C#)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tip14.Models;
 
namespace Tip14.Views.Home
{
    public partial class MovieTemplate : System.Web.Mvc.ViewUserControl<Movie>
    {
    }
}
```
Cuối cùng, phần view của user control MVC được chứa trong Liệt kê 5. Lưu ý rằng bạn có thể sử dụng các biểu thức như ViewData.Model.Title và ViewData.Model.Director để hiển thị tiêu đề phim và đạo diễn phim. Các biểu thức này hoạt động vì bạn đang sử dụng một user control MVC strongly typed  đại diện cho một thực thể phim.

Listing 5 – MovieTemplate.ascx (VB.NET)

```
<%@ Control Language="VB" AutoEventWireup="false" CodeBehind="MovieTemplate.ascx.vb" Inherits="Tip14.MovieTemplate" %>
 
<b><%= ViewData.Model.Title %></b>
<br />
Director: <%= ViewData.Model.Director %>
 
<hr />
```
Listing 5 – MovieTemplate.ascx (C#)

```
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MovieTemplate.ascx.cs" Inherits="Tip14.Views.Home.MovieTemplate" %>
 
<b><%= ViewData.Model.Title %></b>
<br />
Director: <%= ViewData.Model.Director %>
 
<hr />
```

Khi bạn request Index view, bạn sẽ thấy trang được hiển thị trong Hình 1. Lưu ý rằng ĐUser Control MVC đã được rendered cho mỗi bộ phim.

Hình 1 - Các bản ghi phim được rendered với một mẫu
![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip14CreateaTemplateHelperMeth_A7D7/clip_image002_thumb.jpg)

Tóm lược
Trong mẹo này, tôi đã giải thích cách bạn có thể tạo và sử dụng các mẫu trong một ứng dụng ASP.NET MVC. Tôi đã giải thích cách bạn có thể tạo một khuôn mẫu bằng cách tạo một User Control MVC và sử dụng mẫu để kiểm soát cách một tập bản ghi cơ sở dữ liệu được rendered. Bây giờ, không có lý do gì để sử dụng Repeater control trong ứng dụng ASP.NET MVC.

Bạn có thể tải xuống TemplateExtensions (bao gồm phương thức RenderTemplate ()) bằng cách nhấp vào liên kết sau:
	[Download the Code](https://aspblogs.blob.core.windows.net/media/stephenwalther/Downloads/Tip14/Tip14.zip)
    
    Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-14-create-a-template-helper-method