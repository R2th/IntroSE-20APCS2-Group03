Khi bạn cần sao lưu dữ liệu form trong edit form, hiển thị cả giá trị hợp lệ và không hợp lệ, hãy sử dụng ViewData.Eval() để truy xuất các giá trị cả từ view data dictionary và view data Model.

Bạn sử dụng view data trong ứng dụng ASP.NET MVC để truyền dữ liệu từ action củacontroller sang view. Bạn gán view data cho thuộc tính ViewData của controller và bạn đọc view data từ thuộc tính ViewData của view.

Lớp MVC ViewData là sự kết hợp của hai lớp. Một mặt, lớp ViewData kế thừa từ lớp base Dictionary (Dictionary<string,object>). Do đó, nó hoạt động giống như một bộ Dictionary chung tiêu chuẩn. Bạn thêm một cặp khóa và giá trị vào ViewData như thế này:
`ViewData[“message”] = “Hello World!”;`
Trong một view, bạn hiển thị một mục từ dictionary như thế này:
`<%= ViewData[“message”] %>`
Mặt khác, lớp ViewData trưng ra một thuộc tính Model. Thuộc tính Model rất hữu ích khi bạn muốn truyền đối tượng được nhập vào view. Trong controller, bạn gán giá trị cho thuộc tính Model như thế này:
```
var someMovie = new Movie();

someMovie.Title = “Star Wars”;

ViewData.Model = someMovie;
```
Trong view (giả sử rằng bạn đã tạo kiểu view), bạn có thể truy cập vào một thuộc tính của Model như thế này:
`<%= ViewData.Model.Title %>`

Một typed view sinh ra một lớp typed ViewData. Trong ví dụ này, giá trị của thuộc tính ViewData.Model được chuyển sang loại Movie được nhập tự động.

Vì vậy, đối tượng ViewData đại diện cho cả dữ liệu typed và untyped. Bạn truy cập dữ liệu untyped  thông qua thuộc tính index của ViewData. Bạn truy cập dữ liệu typed thông qua thuộc tính Model của ViewData.

Thông thường, dữ liệu typed và untyped không bao giờ gặp nhau. Tuy nhiên, lớp ViewData hỗ trợ một phương thức đặc biệt, có tên Eval(), tìm kiếm cả dữ liệu typed và untyped của nó.

Tại sao điều này hữu ích? Tôi thực sự không hiểu tại sao phương thức Eval() lại hữu ích cho đến khi tôi đọc bài đăng trên diễn đàn sau:

[http://forums.asp.net/p/1292726/2505476.aspx](http://forums.asp.net/p/1292726/2505476.aspx)

Khi xác thực dữ liệu form, bạn có thể sử dụng untyped dictionary để bảo toàn các giá trị form không hợp lệ và typed Model để thể hiện dữ liệu form gốc. Ví dụ, controller trong Liệt kê 1 chứa ba actions có tên Index(), Edit() và Update(). Action Index() hiển thị danh sách các liên kết phim. Action Edit() trả về một form HTML có thể được sử dụng để chỉnh sửa phim. Action Update() cập nhật bản ghi phim trong cơ sở dữ liệu.

Listing 1 – MovieController.cs

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tip32.Models;

namespace Tip32.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        private MovieDataContext _dataContext;

        public HomeController()
        {
            _dataContext = new MovieDataContext();
        }

        public ActionResult Index()
        {
            var movies = from m in _dataContext.Movies select m;
            ViewData.Model = movies.ToList();
            return View("Index");
        }

        public ActionResult Edit(int id)
        {
            // Retrieve matching movie
            var movieToEdit = _dataContext.Movies.SingleOrDefault(m => m.Id == id);
            this.ViewData.Model = movieToEdit;

            // Transfer properties from TempData to Model
            foreach (var prop in TempData)
                this.ViewData[prop.Key] = prop.Value;

            // Return view
            return View("Edit");
        }

        public ActionResult Update(int id, string title, string dateReleased)
        {
            // Validate date released
            DateTime parsedDateReleased;
            DateTime.TryParse(dateReleased, out parsedDateReleased);
            
            // Errors? Redisplay Edit view
            if (parsedDateReleased == DateTime.MinValue)
            {
                TempData["dateReleased"] = dateReleased;
                return RedirectToAction("Edit", new {id = id });
            }

            // Update movie in database
            var movieToEdit = _dataContext.Movies.SingleOrDefault(m => m.Id == id);
            movieToEdit.Title = title;
            movieToEdit.DateReleased = parsedDateReleased;
            _dataContext.SubmitChanges();

            return RedirectToAction("Index");
        }
    }
}
```
Action Edit() chuyển một bộ phim sang Edit form như typed object. Khi người dùng submit form Edit đến action Update(), action Update() xác thực dữ liệu form đã sửa đổi. Nếu không có lỗi xác thực, thì phim được cập nhật trong cơ sở dữ liệu và người dùng được điều hướng đến Index view.

Tuy nhiên, nếu có lỗi xác thực, thì người dùng sẽ được chuyển hướng trở lại action Edit(). Các giá trị không hợp lệ được chuyển đến action Edit() thông qua TempData dictionary.

Đây là điểm quan trọng. Action Edit() thêm các giá trị form không hợp lệ vào untyped view data dictionary và không phải typed view data Model object. Hãy tưởng tượng rằng người dùng đã nhập giá trị “apple” cho trường Date Released. Trong trường hợp đó, bạn không thể gán giá trị không hợp lệ này cho Model vì thuộc tính DateRelazed là thuộc tính DateTime (bạn không thể gán chuỗi chuỗi “apple” cho thuộc tính DateTime).

Untyped dictionary cho phép bạn hiển thị các giá trị không hợp lệ. Typed Model chỉ cho phép bạn hiển thị các giá trị hợp lệ. Đó là lý do tại sao bạn cần cả hai.

Edit view được chứa trong Liệt kê 2. Lưu ý rằng view data được hiển thị bằng cách gọi ViewData.Eval(). Phương thức ViewData.Eval() trước tiên cố gắng truy xuất một giá trị từ untyped dictionary. Tiếp theo, phương thức Eval() cố gắng lấy giá trị từ một thuộc tính của Model.

Listing 2 – Edit.aspx

```
<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" AutoEventWireup="true" CodeBehind="Edit.aspx.cs" Inherits="Tip32.Views.Home.Edit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<h1>Edit Movie</h1>

<form method="post" action="/Home/Update/<%= ViewData.Model.Id %>">
    <label for="title">Title:</label>
    <br />
    <input name="title" value="<%= ViewData.Eval("title") %>" />

    <br /><br />

    <label for="dateReleased">Date Released:</label>
    <br />
    <input name="dateReleased" value="<%= ViewData.Eval("dateReleased") %>" />

    <br /><br />

    <input type="submit" value="Edit Movie" />
</form>

</asp:Content>
```
Phương thức ViewData.Eval() được sử dụng trong HTML helpers. Điều đó có nghĩa là bạn cũng có thể tạo view như trong Liệt kê 3.

Listing 3 – Edit2.aspx

```
<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" AutoEventWireup="true" CodeBehind="Edit2.aspx.cs" Inherits="Tip32.Views.Home.Edit2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<h1>Edit Movie</h1>

<form method="post" action="/Home/Update/<%= ViewData.Model.Id %>">
    <label for="title">Title:</label>
    <br />
    <%= Html.TextBox("title")  %>

    <br /><br />

    <label for="dateReleased">Date Released:</label>
    <br />
    <%= Html.TextBox("dateReleased") %>

    <br /><br />

    <input type="submit" value="Edit Movie" />
</form>
</asp:Content>
```
View trong Liệt kê 3 thực hiện chính xác giống như view trong Liệt kê 2. Ví dụ, Html.TextBox() helper sẽ sinh một text input field. Giá trị của text field được truy xuất bằng cách gọi ViewData.Eval().  Việc thực hiện để lấy giá trị từ view data dictionary. Nếu thất bại, việc thực hiện sẽ lấy giá trị từ Model.

### Tóm lược
Nếu bạn cần xác thực form data và bạn cần repopulate form có cả dữ liệu hợp lệ và không hợp lệ mà người dùng đã gửi, sau đó sử dụng phương thức ViewData.Eval(). Phương thức ViewData.Eval() tìm kiếm chính xác cả untyped và typed view data.

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-32-repopulate-form-fields-with-viewdata-eval