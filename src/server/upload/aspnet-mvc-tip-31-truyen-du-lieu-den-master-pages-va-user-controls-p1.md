Trong mẹo này, tôi đề xuất một phương pháp truyền dữ liệu đến các master pages và user controls. Tuy nhiên, trước khi tôi đưa ra khuyến nghị, trước tiên tôi khảo sát một số giải pháp thay thế cho cùng một vấn đề.

**Vấn đề**
Hãy tưởng tượng rằng bạn đang xây dựng một ứng dụng cơ sở dữ liệu phim ảnh với ASP.NET MVC framework. Bạn quyết định rằng bạn muốn hiển thị danh sách các liên kết của thể loại phim với mọi trang trong ứng dụng của bạn. Bằng cách đó, người dùng ứng dụng có thể nhanh chóng điều hướng đến thể loại phim yêu thích của họ. Vì bạn muốn các danh mục phim xuất hiện trên mỗi trang, nên hiển thị các danh mục trong master page của ứng dụng là điều hợp lý.

Bạn cũng quyết định hiển thị một danh sách các bộ phim nổi bật trên một số trang, nhưng không phải tất cả các trang. Danh sách các phim nổi bật được lấy ngẫu nhiên từ cơ sở dữ liệu. Bạn quyết định triển khai các phim nổi bật với user control: FeaturedMovies control (xem Hình 1).
Figure 1 – The Movie Database Application
	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip31PassingDatatoMasterPagesa_97A8/clip_image002_thumb.jpg)

Đây là vấn đề. Bạn cần chuyển danh sách các thể loại phim vào master page của mình cho mỗi trang trong ứng dụng của bạn. Bạn cần chuyển danh sách các phim nổi bật tới user control cho các trang nhất định trong ứng dụng của bạn. Bạn làm nó như thế nào?

**Sử dụng Code-Behind Class**
Giải pháp có vẻ hấp dẫn nhất, nhưng sai lầm nhất cho vấn đề này là truy xuất dữ liệu trong Code-Behind Class của master page và FeaturedMovies user control. Trang master page trong Liệt kê 1 hiển thị tất cả các thể loại phim bằng cách truy xuất danh sách các danh mục từ một thuộc tính của lớp code-behind có tên Categories.
Listing 1 – Site.Master
```
<%@ Master Language="C#" AutoEventWireup="true" CodeBehind="Site.master.cs" Inherits="Solution1.Views.Shared.Site" %>
<%@ Import Namespace="Solution1.Models" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Movies</title>
    <link href="../../Content/Site.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="page">

    <div id="header">
        <h1>Movie Database Application</h1>
    </div>

    <div id="main">
 
        <div class="leftColumn">
        <ul>
        <% foreach (MovieCategory c in this.Categories)
           { %>
            <li> <%= Html.ActionLink(c.Name, "Category", new {id=c.Id} )%></li>
        <% } %>
        </ul>
        </div>
                
        <div class="rightColumn">
        <asp:ContentPlaceHolder ID="MainContent" runat="server" />
        </div>

        <br style="clear:both" />
        <div id="footer">
            Movie Database Application &copy; Copyright 2008
        </div>
    </div>
</div>
</body>
</html>
```

Lớp code-behind cho master pageh được chứa trong Liệt kê 2. Lưu ý rằng lớp code-behind truy cập trực tiếp MovieDataContext. Tất cả các thể loại phim được truy xuất bằng cách thực hiện truy vấn LINQ to SQL đối với MovieDataContext.
Listing 2 – Site.Master.cs

```
using System.Collections.Generic;
using System.Linq;
using Solution1.Models;

namespace Solution1.Views.Shared
{
    public partial class Site : System.Web.Mvc.ViewMasterPage
    {
        protected IEnumerable<MovieCategory> Categories
        {
            get
            {
                var dataContext = new MovieDataContext();
                return from c in dataContext.MovieCategories select c;
            }
        }
    }

}
```
Bạn có thể thực hiện chính xác điều tương tự với FeaturedMovies user control. Sử dụng lớp FeaturedMovies code-behind để truy cập trực tiếp vào DataContext và lấy danh sách các phim nổi bật từ cơ sở dữ liệu.

Vì vậy, tại sao điều này là sai? Đây chắc chắn là một giải pháp đơn giản. Nó hoạt động, tại sao còn băn khoăn?

Vấn đề với giải pháp này là mã trongmaster page code-behind không thể kiểm tra được. Bạn không thể dễ dàng viết các  unit tests cho lớp Site vì lớp Site kế thừa từ lớp ViewMasterPage, từ lớp Page. Lớp Page dựa vào đối tượng HTTP Context và hy vọng cô lập mã của bạn để nó có thể được kiểm tra.

Bạn nên cố gắng tránh sử dụng lớp code-behind cho logic ứng dụng của mình khi viết ứng dụng ASP.NET MVC. Cố gắng đẩy mọi thứ trở lại vào controllers của bạn. Controllers được thiết kế để có thể kiểm tra.
(Còn tiếp)

Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-31-passing-data-to-master-pages-and-user-controls