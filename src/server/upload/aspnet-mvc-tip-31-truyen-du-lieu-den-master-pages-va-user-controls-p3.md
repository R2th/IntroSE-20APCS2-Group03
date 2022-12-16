Trong mẹo này, tôi đề xuất một phương pháp truyền dữ liệu đến các master pages và user controls. Tuy nhiên, trước khi tôi đưa ra khuyến nghị, trước tiên tôi khảo sát một số giải pháp thay thế cho cùng một vấn đề.
Phần 1: https://viblo.asia/p/aspnet-mvc-tip-31-truyen-du-lieu-den-master-pages-va-user-controls-p1-3P0lPYpv5ox
Phần 2: https://viblo.asia/p/aspnet-mvc-tip-31-truyen-du-lieu-den-master-pages-va-user-controls-p2-bJzKmx1B59N
**Gọi trực tiếp Partial Methods**
Hãy chuyển sang giải pháp số ba trong nhiệm vụ của chúng tôi để giải quyết vấn đề nàyi. Trong phần này, chúng tôi cố gắng giải quyết vấn đề chuyển dữ liệu đến master page hoặc user control bằng cách mã hóa rõ ràng logic để truy xuất dữ liệu vào các controller action. HomeContoder đã sửa đổi của chúng ta được chứa trong Liệt kê 6.
Listing 6 – HomeController.cs (with partials logic)

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Solution3.Models;
using Solution3.Partials;

namespace Solution3.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
            Master.AddViewData(this.ViewData);
        }


        public ActionResult Index()
        {
            Featured.AddViewData(this.ViewData);
            return View();
        }

        public ActionResult Category(int id)
        {
            var dataContext = new MovieDataContext();
            var movies = from m in dataContext.Movies where m.CategoryId == id select m;
            return View("Category", movies);
        }
    }
}
```

Lưu ý rằng HomeContoder trong Liệt kê 6 bây giờ có một hàm tạo. Phương thức Master.AddViewData() được gọi trong hàm tạo để sửa đổi view data được trả về bởi bất kỳ controller action nào. Phương pháp này thêm view data được hiển thị trong master page.

Action  Index() cũng đã được sửa đổi. Trong action Index(), phương thức Featured.AddViewData() được gọi. Phương pháp này thêm view data cần thiết cho FeaturedMovies user control. Vì FeaturedMovies user control được chứa trong Index view chứ không phải Category view, nên việc gọi phương thứcFeatured.AddViewData() trong hàm tạo sẽ không có nghĩa gì.

Ưu điểm của giải pháp này là rất dễ kiểm tra. Khi bạn gọi phương thức Index(), view data được sửa đổi bằng cả hai phương thức Master  và Featured partial. Nói cách khác, bạn có thể dễ dàng kiểm tra xem view data của mình có chứa dữ liệu phù hợp cho master page và FeaturedMovies user control hay không.

Vì vậy, có gì sai với giải pháp này? Tất cả logic để thêm view data được chứa trong các lớp controller. Giải pháp này tốt hơn nhiều so với hai giải pháp trước. Vấn đề duy nhất với giải pháp này là nó vi phạm Single Responsibility Principle.

Theo Single Responsibility Principle, code chỉ nên có một lý do duy nhất để thay đổi. Tuy nhiên, chúng tôi có nhiều lý do để thay đổi phương thức Index() trong Liệt kê 8. Nếu chúng tôi quyết định thêm user control mới vào Index view và user control mới hiển thị một bộ dữ liệu mới, thì chúng tôi sẽ cần thay đổi Index() action.

Mục đích đằng sau Single Responsibility Principle là bạn không bao giờ nên thay đổi mã hoạt động. Thay đổi mã luôn có khả năng tạo lỗi trong ứng dụng của bạn. Chúng ta cần tìm một số cách để thêm view data mới vào view data được trả về bởi một hcontroller action mà không cần sửa đổi các controller action.

**Sử dụng Abstract Base Classes**
Đây là giải pháp cuối cùng của tôi cho vấn đề chuyển dữ liệu đến các master pages và user controls: Chúng tôi sẽ sử dụng các abstract base classe để sửa đổi view data được trả về bởi các controller action. Tôi sẽ cảnh báo bạn ngay bây giờ rằng nó sẽ phức tạp. Chúng tôi được yêu cầu xây dựng rất nhiều lớp. Tuy nhiên, mỗi lớp có một trách nhiệm duy nhất. Mỗi lớp chịu trách nhiệm cho chỉ một view data (xem Hình 2).

Figure 2 – Class Hierarchy
	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip31PassingDatatoMasterPagesa_97A8/clip_image004_thumb.jpg)
    
    Chúng ta sẽ tạo một lớp abstract base, được đặt tên là ApplicationContoder để sửa đổi view data dictionary bằng cách thêm tất cả view data cần thiết cho master page của chúng ta (xem Liệt kê 7). ApplicationContoder được sử dụng làm lớp cơ sở cho mọi controller  trong ứng dụng của chúng tôi chứ không chỉ HomeContoder.

Liệt kê 7 - ApplicationContoder

```
using System.Web.Mvc;
using Solution4.Partials;

namespace Solution4.Controllers
{
    public abstract class ApplicationController : Controller
    {
        public ApplicationController()
        {
            Master.AddViewData(this.ViewData);
        }
    }
}
```
Tiếp theo, chúng ta sẽ tạo một lớp abstract base có tên HomeControllBase (xem Liệt kê 8). Lớp này chứa tất cả logic ứng dụng thường xuất hiện trong lớp HomeContoder. Chúng tôi sẽ ghi đè các action methods trong lớp này để thêm dữ liệu xem bổ sung mà chúng tôi cần cho các  user controls cụ thể.

Listing 8 – HomeControllerBase.cs

```
using System.Linq;
using System.Web.Mvc;
using Solution4.Models;

namespace Solution4.Controllers.Home
{
    public abstract class HomeControllerBase : ApplicationController
    {
        public virtual ActionResult Index()
        {
            return View("Index");
        }

        public virtual ActionResult Category(int id)
        {
            var dataContext = new MovieDataContext();
            var movies = from m in dataContext.Movies where m.CategoryId == id select m;
            
            return View("Category", movies);
        }
    }
}
```

Đối với mỗi user control, chúng ta sẽ cần tạo một abstract class bổ sung. Đối với FeaturedMovies user control, chúng tôi sẽ tạo một lớp HomeContoderFeatured (xem Liệt kê 9). Đối với PopularMovies user control, chúng tôi sẽ tạo một HomeControllerPopular class (xem Liệt kê 10).

Listing 9 – HomeControllerFeatured.cs

```
using System.Web.Mvc;

namespace Solution4.Controllers.Home
{
    public abstract class HomeControllerFeatured : HomeControllerBase
    {

        public override ActionResult Index()
        {
            var result = (ViewResult)base.Index();
            Partials.Featured.AddViewData(result.ViewData);
            return result;
        }
    
    }
}
```
Listing 10 – HomeControllerPopular.cs

```
using System.Web.Mvc;

namespace Solution4.Controllers.Home
{
    public abstract class HomeControllerPopular : HomeControllerFeatured
    {
        public override System.Web.Mvc.ActionResult Category(int id)
        {
            var result = (ViewResult)base.Category(id);
            Partials.Popular.AddViewData(result.ViewData);
            return result;
        }


    }
}
```
Cuối cùng, chúng ta cần đặt một lớp cuối cùng ở trên cùng của layer cake này. Chúng ta sẽ tự tạo lớp HomeContoder. Lớp này chỉ đơn giản là kế thừa từ một trong các lớp base (xem Liệt kê 11). Nó không chứa logic ứng dụng của chính nó. Nó chỉ đóng vai trò là công khai của tất cả các lớp khác.

Lớp HomeControll là lớp duy nhất trong hệ thống phân cấp này không phải là một lớp trừu tượng. Bởi vì nó không phải là một lớp trừu tượng, các controller action của nó có thể được gọi ra.

Listing 11 – HomeController.cs

```
namespace Solution4.Controllers.Home
{
    public class HomeController : HomeControllerPopular
    {
    }
}
```

Ngay bây giờ, bạn có thể cảm thấy choáng ngợp về số lượng lớp. Tuy nhiên, ưu điểm của phương pháp này là chúng tôi đã tách biệt logic để tạo view data. Mỗi lớp trừu tượng có một trách nhiệm duy nhất. Code của chúng tôi không dễ bị phá vỡ.

**Tóm lược**
Tôi không hoàn toàn bị thuyết phục bởi mẹo này. Tôi vẫn muốn sử dụng các action filter để thêm view data cho các master pages và user controls. Giải pháp được mô tả trong phần cuối cùng, sử dụng các lớp cơ sở trừu tượng, có vẻ như cần làm rất nhiều việc. Và tôi sẽ tò mò về cách những người khác đã giải quyết vấn đề này.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-31-passing-data-to-master-pages-and-user-controls