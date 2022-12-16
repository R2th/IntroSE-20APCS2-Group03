### Giới thiệu bài viết
Ở bài này mình sẽ hướng dẫn các bạn làm ứng dụng web [CRUD](https://www.codecademy.com/articles/what-is-crud) (Create, Read, Update, Delete) quản lý sản phẩm đơn giản.
### Kiến thức của bài
* Sử dụng Entity Framework 6 code first MVC5 database sử dụng SQL Server 2014.
* Data Migration
* Sử dụng ViewModel để hiển thị thông tin.
### Cần chuẩn bị
1. Visual Studio 2013 trở lên.
2. SQL Server 2012 trở lên.
3. Entity Framework ([EntityFramework NuGet package](https://www.nuget.org/profiles/EntityFramework)).
4. .NET 4.5 trở lên.
### Tạo ứng dụng Web
*    Mở Visual Studio (ở đây mình sử dụng VS 2017) và tạo mới ứng dụng đặt tên là ProductManagement.
    ![](https://images.viblo.asia/15a22b35-d5bd-43e4-80ab-de83a4726ddd.PNG)
*    Tiếp theo màn hình hiển thị lên hộp thoại chọn loại Web Application bạn chọn MVC và chọn OK để tiếp tục
![](https://images.viblo.asia/7ed21f83-5c6d-4969-bff6-76c34dbc3fd4.PNG)
*    Đợi để VS tạo project.
### Cài đặt package Entity Framework 6
Có 2 cách để bạn cài đặt 1 package:
1. Sử dụng Manage NutGet Packages.**
   *  Trên thanh toolbars của VS bạn chọn **Tools** => **NutGet Package Manager** => **Manage NutGet Packages for Solution...**
    ![](https://images.viblo.asia/facf9136-bca9-4012-91c4-0b90586a749e.PNG)
    *  Tiếp theo ở màn hình **Manage NutGet Packages**, ở tab **Installed** quản lý tất cả những **packages** đã cài cho project của bạn.
    ![](https://images.viblo.asia/17d88447-8b9a-4492-83f6-66ab012a28b2.PNG)
    *  Sau đó bạn chuyển qua tab Browse để tìm package Entity Framework cần cài cho project. Ở phần này bạn cần chú ý những cái sau: Version của Entity Framework bạn muốn cài ở đây mình chọn version 6.0.0 và thứ hai là project bạn muốn cài (nên để ý cái này vì sau này trong trường hợp Solution của bạn có nhiều project khác nhau). Sau đó bạn chọn Install để tiến hành cài đặt. Trong trường hợp bạn đã cài nhưng do sai version hoặc lỗi gì đó bạn có thể Uninstall trên đây luôn.
    ![](https://images.viblo.asia/0262dced-fdd6-4547-a908-b0f213c7017d.PNG)
    *  Trên cửa sổ output của VS sẽ hiển thị ra đợi đến khi thông báo cài đặt thành công là được.
    ![](https://images.viblo.asia/5739739f-548a-4a94-9f92-ec3c2521bb16.PNG)
    *  Bạn muốn kiểm tra đã thực sự cài thành công vào đúng project của mình thì mở cửa sổ Solution Explorer ra để kiểm tra, nếu đã cài thành công thì trong References của project sẽ có gói Entity Framework trong đó.
    ![](https://images.viblo.asia/7e425b80-2f9e-4079-a558-a9273b017ef6.PNG)
    
**2. Sử dụng Package manager console.**
*  Trên thanh toolbars của VS bạn chọn **Tools** => **NutGet Package Manager** => **Package Manager Console**.
    ![](https://images.viblo.asia/d8f96880-6fec-4ed7-9b39-9b5c93e41fd0.png)
*  Sau đó VS sẽ hiển thị ra cửa sổ Package Manager Console. Bạn nhập ` Install-Package EntityFramework ` để tiến hành cài đặt Entity Framework cho project.
![](https://images.viblo.asia/a53f5d3b-a5be-43df-b014-0a780be6dff4.png)
*  Ở đây mặc định sẽ cài Entity Framework version mới nhất là 6.2.0 nếu bạn muốn cài version 6.0.0 thì bạn sử dụng ` Install-Package EntityFramework -v 6.0.0`. Và đợi đến khi thông báo cài đặt thành công là được.
### Tạo model
Phân tích qua một chút ở đây mình sẽ tạo 2 model đó là model **Product** và model **CategoryOfProduct**.
Trong **Product** là model thể hiển thông tin sản phẩm sẽ có các thuộc tính sau: ProductID, NameOfProduct, CategoryOfProductID. **CategoryOfProduct** model thể hiện thông tin loại sản phẩm sẽ có các thuộc tính sau: CategoryOfProductID, Description. Quan hệ giữa **Product** và **CategoryOfProduct** là quan hệ 1 - n tức là 1 **CategoryOfProduct** có nhiều **Product** vì vậy phải đặt khóa chính của **CategoryOfProduct** làm khóa ngoại cho **Product**. Mô tả bằng hình ảnh dưới đây:

![](https://images.viblo.asia/807c50b6-eae9-4e9b-baee-da109bf59dea.png)

Trong thư mục **Models** tạo class **Product.cs**, bạn có thể theo dõi code dưới đây:
```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductManagement.Models
{
    public class Product
    {
        public int ProductID { get; set; }

        public string NameOfProduct { get; set; }

        public int CategoryOfProductID { get; set; }
    }
}
```
Cũng trong thư mục **Models** bạn tạo tiếp class **CategoryOfProduct.cs**, bạn có thể theo dõi code dưới đây:
```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductManagement.Models
{
    public class CategoryOfProduct
    {
        public int CategoryOfProductID { get; set; }

        public string Description { get; set; }
    }
}
```
### Kết nối với SQL Server bằng Visual Studio
* Trên thanh toolbars của VS bạn vào **View** => **Server Explorer**.
![](https://images.viblo.asia/2c3d080c-238f-40bf-89c1-6daa449267f1.png)
* Sau đó trên cửa sổ **Server Explorer** bạn chọn vào icon mình đã khoanh đỏ để tạo mới connection đến SQL Server.

![](https://images.viblo.asia/753ac00a-aef7-4a12-9456-68b30128ad51.png)
* Trên cửa sổ **Add Connect**, bạn chọn Server Name của SQL Server với login bạn có thể sử dụng login với Window Authentication hoặc login với tài khoản trên SQL Server của bạn. Để kiểm tra xem kết nối của bạn có đúng chưa bằng **Test Connection** nếu thông báo thành công thì chọn OK để tiếp tục.
![](https://images.viblo.asia/7338661e-70b1-4ba6-b11e-ac561cb72634.png)
* Trên cửa sổ **Server Explorer** bạn chuột phải vào **Server SQL** vừa kết nối chọn **New Query**. Thêm đoạn code này vào để tạo mới database trong SQL Server ``` CREATE DATABASE ProductManagement ```. Chọn nút chạy query để tạo database.
![](https://images.viblo.asia/32cc1d70-88a4-4121-953c-883eed306bb3.png)
### Tạo lớp DatabaseContext
* Trong thư mục Models bạn tạo một lớp DbContext (là lớp đại diện để truy vấn dữ liệu từ cơ sở dữ liệu) như sau:
![](https://images.viblo.asia/b0dee332-fe8f-41b8-835d-8bb2beda9c8b.png)
* Trên cửa sổ **Add New Item** chọn **Installed** => **Visual C#** => **Data** => **ADO.NET Entity Data Model**. Đặt tên cho lớp này: **ProductDBContext**.
![](https://images.viblo.asia/42880320-36d3-437b-b488-8ec6bbe0de56.png)
* Sau đó chọn **Add** để tạo mới lớp này.
* Trên cửa sổ **Entity Data Model Wizard** chọn **Code First from database** sau đó chọn **Next**.
 ![](https://images.viblo.asia/5b23b779-d99e-43c4-a345-c5ffa4be74d0.png)
*  Trên cửa sổ **Choose your Data Connection** chọn **New Connection**, ở cửa sổ **Connection Properties** giờ bạn nhập thông tin Database vừa tạo ở trên vào. Sau đó chọn OK.
![](https://images.viblo.asia/43c7ef88-214c-4f88-8399-2fea8f4f2493.png)
* Sau khi chọn xong Database bạn để ý những chỗ sau: sau khi bạn chọn database xong EF sẽ tự sinh cho 1 chuỗi connectionString để kết nối vào database của bạn, chuỗi này sẽ được lưu trong file **Web.Config** mình có nói ở [phần trước](https://viblo.asia/p/series-aspnet-mvc-part-1-buoc-dau-lam-quen-voi-aspnet-mvc-tao-ung-dung-web-dau-tien-07LKXzdDlV4). Sau khi tạo bạn cũng có thể kiểm tra lại trong file này. Chọn **Next** để tiếp tục.
![](https://images.viblo.asia/e3bd7e91-e80e-4830-aa91-5d3552cb0b93.png)
* **Next** đến khi **Finish**.
* Trong file **Web.config** sẽ có thêm thẻ connectionStrings
![](https://images.viblo.asia/bd2bf7e7-5f55-4c8e-9d34-5a95d53184c0.png)
* Trong file **ProductDBContext.cs** bạn xem code sau:
```
namespace ProductManagement.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ProductDBContext : DbContext
    {
        public ProductDBContext()
            : base("name=ProductDBContext")
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<CategoryOfProduct> CategoryOfProducts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
```
### Tạo mới CategoryOfProductController
* Trước khi tạo Controller mới bạn cần build project để những model bạn mới tạo được bằng cách nhấn tổ hợp **Ctrl** + **Shift** + **B** hoặc trên thanh toolbar chọn **Build** => **Build Solution**.
* Trong thư mục **Controllers** tạo mới controller.
![](https://images.viblo.asia/d7775ef3-5fac-423b-9e2c-f526d68465cc.png)
* Chọn **MVC 5 Controller with views using EntityFramework**.
![](https://images.viblo.asia/67efe2da-eb0a-4d41-8920-d29de798423d.png)
* Sau đó bạn chọn tương tự như hình EF sẽ tự tạo cho bạn **CategoryOfProductController**.
![](https://images.viblo.asia/4e53de7b-3759-47c3-8834-db9fb9a692b7.png)
* Sau khi tạo **Controller** bạn sẽ thấy trong **Views** sẽ tự động được tạo thêm một thư mục **CategoryOfProduct** trong này sẽ chứa **Views** của **CategoryOfProduct**.
![](https://images.viblo.asia/a7828581-fcde-4bbb-a1f8-73b7ba37300a.png)
### Thêm đường dẫn của Views vào Layout
* Trong thư mục **Views** => **Shared** => **_Layout.cshtml** 
* Bạn thêm dòng code này vào 
`<li>@Html.ActionLink("Category Of Product", "Index", "CategoryOfProducts")</li>`
![](https://images.viblo.asia/ebec4fde-7f14-41ff-b11f-101a5d5b7d21.png)
### Tạo mới ProductController
* Làm tương tự như tạo **CategoryOfProductController** 
![](https://images.viblo.asia/b671d53f-b78b-4891-b5fc-5590450cc307.png)
![](https://images.viblo.asia/96a9c743-0321-4fcc-b18a-3baf6cad543e.png)
* Thêm đường dẫn đến Products `<li>@Html.ActionLink("Products", "Index", "Products")</li>` vào **Layout**.
![](https://images.viblo.asia/fe941f5e-2c6b-4593-bbc3-2f1cc55bcdb4.png)
* Và giờ chạy ứng dụng...
![](https://images.viblo.asia/e3bfed60-471a-480a-9e36-a012e346b21a.png)
* Phần hiển thị bạn có thể custom theo 2 cách như sau:
    * Bạn thêm DisplayName cho các fields trong model(recommend).
    ![](https://images.viblo.asia/181da896-f535-40fe-8488-332336c87f36.png)
    ![](https://images.viblo.asia/863f7ac9-43ec-4241-98b5-09ecafa62c24.png)
    * Custom lại phần view.
    Trong file **Products** => **Index.cshtml**
    ![](https://images.viblo.asia/3cd7aab1-e77b-4751-92dc-f39b77277057.png)
### Sử dụng Code first Migrations.
* **Enable Migration**
    * Mở cửa sổ làm việc **Package mangager consoles** nhập đoạn code này `Enable-Migrations` để thực enable migration.
    ![](https://images.viblo.asia/589a309b-9d9f-442a-be01-1c811c9b001a.png)
    * Sau khi enable xong thư mục Migrations sẽ tự động được tạo ra, trong đó có file **Initial Create** và **Configuration**
    
    ![](https://images.viblo.asia/659a65f8-9c92-430c-8144-efc2f14c0d7f.png)
* **Khởi tạo dữ liệu**
    * Trong file **Configuration** insert đoạn code sau vào phướng thức **Seed**
    
            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            context.CategoryOfProducts.AddOrUpdate(c => c.CategoryOfProductID,
                new Models.CategoryOfProduct{ CategoryOfProductID = 1, Description = @"Đồ điện tử" },
                new Models.CategoryOfProduct { CategoryOfProductID = 2, Description = @"Đồ nhà bếp"}
                );
            context.Products.AddOrUpdate(p => p.ProductID,
                new Models.Product { ProductID = 1, NameOfProduct = @"Quạt điện", CategoryOfProductID = 1},
                new Models.Product { ProductID = 2, NameOfProduct = @"Chảo", CategoryOfProductID = 2}
                );

    ![](https://images.viblo.asia/e96f4df1-ac47-4e04-a8ef-b6e02c33a85b.png)
*    Để insert dữ liệu khởi tạo vào database thực hiện UpdateDatabase chèn đoạn code sau vào **Package mangager consoles** `Update-Database`
![](https://images.viblo.asia/c1d65655-1a0b-444e-b34c-5b2d5300a0fb.png)
    * Sau khi update xong vào SQL để xem đã insert được vào cơ sở dữ liệu chưa sử dụng Server Explorer trên VS.
    * Kết nối với CSDL **ProductManagement**
    ![](https://images.viblo.asia/4924b07c-0b51-437a-9c2f-e41d84fea120.png)
    ![](https://images.viblo.asia/bc7fe16a-6b67-42ac-a2c4-f7bea98bdef9.png)
    * Dữ liệu đã được insert vào như thế này
    ![](https://images.viblo.asia/1ba7ad5e-2d75-45d4-8174-14d30aa7c85c.png)
    ![](https://images.viblo.asia/480befbf-32bf-4001-a473-f24d95182492.png)
* Sau khi thêm dữ liệu chạy thử thấy phát sinh vấn đề như dưới đây: thông thường ở cột mã loại sản phẩm sẽ hiển thị ra tên loại sản phẩm chứ không hiển thị sang ID như thế kia. Bài viết hơi dài, vì vậy mình sẽ hướng dẫn tạo ViewModel để hiển thị theo ý muốn ở [**phần sau**](https://viblo.asia/p/series-aspnet-mvc-part-3-su-dung-viewmodel-gDVK2Qa25Lj) nhé.
![](https://images.viblo.asia/b9d0eac7-4ee3-436b-94df-edc8f992c420.png)