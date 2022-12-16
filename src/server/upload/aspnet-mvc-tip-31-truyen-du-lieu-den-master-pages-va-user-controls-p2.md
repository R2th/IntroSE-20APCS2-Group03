Trong mẹo này, tôi đề xuất một phương pháp truyền dữ liệu đến các master pages và user controls. Tuy nhiên, trước khi tôi đưa ra khuyến nghị, trước tiên tôi khảo sát một số giải pháp thay thế cho cùng một vấn đề.
Phần 1: https://viblo.asia/p/aspnet-mvc-tip-31-truyen-du-lieu-den-master-pages-va-user-controls-p1-3P0lPYpv5ox

**Sử dụng Action Filter**
Vì vậy, hãy cố gắng giải quyết vấn đề truyền dữ liệu đến master page hoặc view theo cách khác. Trong phần này, chúng tôi tạo action filter để thay view data được chuyển sang view. Ý tưởng là bạn có thể hướng các controller action của mình bằng một hoặc nhiều action filter để kiểm soát dữ liệu xem được truyền từ bộ controller sang view nào.

Action filter, được đặt tên [Partial] được chứa trong Liệt kê 3.
Listing 3 – ActionFilters\PartialAttribute.cs

```
using System;
using System.Reflection;
using System.Web.Mvc;

namespace Solution2.ActionFilters
{
    public class PartialAttribute : ActionFilterAttribute
    {
        private string _partialClassName;

        public PartialAttribute(string partialClassName)
        {
            _partialClassName = partialClassName;
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var viewData = (filterContext.Controller as Controller).ViewData;
            ExecutePartial(_partialClassName, viewData);
        }

        private void ExecutePartial(string partialName, ViewDataDictionary viewData)
        {
            // Get partial type
            var partialType = Type.GetType(partialName, true, true);
            var partial = Activator.CreateInstance(partialType);

            // Execute all public methods
            var methods = partialType.GetMethods();
            foreach (MethodInfo method in methods)
            {
                var pams = method.GetParameters();
                if (pams.Length > 0 && pams[0].ParameterType == typeof(ViewDataDictionary))
                    method.Invoke(partial, new object[] { viewData });

            }
        }

    }
}
```
Khi bạn thêm action filter [Partial] vào controller action, action filter sẽ thêm dữ liệu bổ sung vào view data. Ví dụ: bạn có thể sử dụng thuộc tính [Partial] để thêm các thể loại phim vào view data để các danh mục có giá trị trong master page. Bạn cũng có thể sử dụng thuộc tính [Partials] để thêm phim nổi bật vào view data để dữ liệu này có giá trị trong FeaturedMovie user control.

Thuộc tính [Partial] nhận một tên lớp, khởi tạo lớp và thực thi tất cả các phương thức công khai của lớp (mỗi phương thức lấy tham số ViewDataDipedia). Controller trong Liệt kê 4 minh họa cách bạn có thể sử dụng action filter [Partial] để sửa view data được trả về bởi các controller action khác nhau.

Listing 4 – HomeController.cs

```
using System.Linq;
using System.Web.Mvc;
using Solution2.ActionFilters;
using Solution2.Models;

namespace Solution2.Controllers
{
    [Partial("Solution2.Partials.Master")]
    public class HomeController : Controller
    {

        [Partial("Solution2.Partials.Featured")]
        public ActionResult Index()
        {
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

Lưu ý rằng chính lớp HomeContoder được hướng bằng  [Partial] action filter. Vì  [Partial] action filter được áp dụng cho lớp, action filter sẽ thực thi bất cứ khi nào bất kỳ action method HomeContoder nào được gọi. Áp dụng thuộc tính [Partial] ở cấp độ có ý nghĩa khi cung cấp view data cho master page.

Thuộc tính [Partial] thêm các thể loại phim đến view data.  [Partial] thực thi các phương thức của lớp Solution2.Partials.Master được chứa trong Liệt kê 5.

Listing 5 – Master.cs

```
using System.Linq;
using System.Web.Mvc;
using Solution2.Models;

namespace Solution2.Partials
{
    public class Master
    {
        public void AddViewData(ViewDataDictionary viewData)
        {
            var dataContext = new MovieDataContext();
            var categories = from c in dataContext.MovieCategories select c;
            viewData["master"] = categories; 
        }
    }
}
```
Phương thức AddViewData () thêm các danh mục vào khóa có tên master trong view data dictionary. Các danh mục được lấy từview data trong master page và được hiển thị.

Thuộc tính [Partial] chỉ có thể được áp dụng cho các action method nhất định và không áp dụng cho các action method khác. Ví dụ, phương thức Index() trong Liệt kê 4 bao gồm một thuộc tính [Partial] thực thi lớp Solution2.Partials.Featured. Lớp này thêm dữ liệu cho FeatureMovies user control.

Vì vậy, có gì đó sai với giải pháp này cho vấn đề truyền dữ liệu từ controller đến master page hoặc user control? Ưu điểm của phương pháp này so với cách tiếp cận trước đó là chúng tôi đã cố gắng đẩy logic truy cập dữ liệu cơ sở dữ liệu trở lại controller. View data được sửa đổi khi một controller action được gọi.

Ngoài ra, giải pháp này là độc đáo. Bằng cách sử dụng thuộc tính [Partial], bạn có thể đặt nhiều lớp view data vào view data dictionary. Ví dụ: nếu bạn phát hiện ra rằng bạn cần thêm user control mới vào một số trang nhất định và user control mới cần một bộ dữ liệu khác, bạn có thể chỉ cần thêm thuộc tính [Partial] mới cho các controller action đúng hơn và thêm mới dữ liệu cho view data dictionary.

Thật không may, giải pháp này không thể kiểm chứng được. Các action filter không được thực thi khi bạn gọi các action method trong unit test. Do đó, chúng ta cần tìm kiếm một chiến lược khác.
(Còn tiếp)

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-31-passing-data-to-master-pages-and-user-controls