Trong mẹo này, tôi trình bày cách bạn có thể truy cập 1 view từ bất kỳ thư mục nào trong ứng dụng ASP.NET MVC. Tôi chỉ cho bạn cách sử dụng cả đường dẫn cụ thể và và đường dẫn tương đối.

Cho đến hôm nay, tôi nghĩ rằng một controller action có thể trả về một view từ một trong hai nơi:

· Views\controller name

· Views\Shared

Ví dụ: nếu bạn đang làm việc với ProductContoder, thì tôi tin rằng bạn chỉ có thể trả về một view từ thư mục Views\Product hoặc thư mục Views\Shared. Khi xem qua mã nguồn của lớp ViewLocator, tôi phát hiện ra rằng mình đã sai. Nếu bạn cung cấp một đường dẫn cụ thể của view, bạn có thể truy xuất một view từ bất kỳ vị trí nào trong ứng dụng ASP.NET MVC.

ProductControll.Index ) trong Liệt kê 1 trả về một view từ đường dẫn cụ thể ~\Confusing\ButWorks.aspx.

Listing 1 – ProductController.vb (VB.NET)
```
Public Class ProductController
    Inherits Controller
 
      Public Function Index() As ActionResult
       Return View("~\Confusing\ButWorks.aspx")
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
 
namespace Tip24.Controllers
{
    public class ProductController : Controller
    {
        public ActionResult Index()
        {
            return View( @"~\Confusing\ButWorks.aspx");
        }
    }
}
 
```
Đường dẫn cụ thể là đường dẫn bắt đầu bằng ký tự ~ hoặc /. Bất kỳ đường dẫn nào khác thì được xử lý khác nhau.

Bạn cũng có thể sử dụng các đường dẫn tương đối như SubProduct\Details hoặc SubProduct/Details. Đường dẫn tương đối sẽ trả về view được đặt tại LViews\Product\SubProduct\Details.aspx. Liệt kê 2 chứa một danh sách mã hoàn chỉnh minh họa bằng các đường dẫn tương đối.

Listing 2 – ProductController.vb (VB.NET)
```
Public Class ProductController
    Inherits Controller
  
      Public Function Index() As ActionResult
       Return View("SubProduct\Details")
      End Function
 
End Class
```

Listing 2 – ProductController.cs (C#)
```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
 
namespace Tip24.Controllers
{
    public class ProductController : Controller
    {
        public ActionResult Index()
        {
            return View(@"SubProduct\Details");
        }
 
    }
}
```
Bây giờ, tôi muốn là người đầu tiên cảnh báo bạn rằng bạn không bao giờ, không bao giờ, không bao giờ sử dụng mẹo này :). Có một lý do chính đáng để tuân theo các quy ước vốn có trong một ứng dụng MVC. Đặt các tệp của bạn ở các vị trí đã biết giúp mọi người hiểu ứng dụng của bạn dễ dàng hơn.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-24-retrieve-views-from-different-folders