### Mối quan hệ giữa Controller và View
* Tại sao đối với các action Create, Edit, Delete đều có 2 action: 
![](https://images.viblo.asia/full/d7111da3-d50b-4cbb-8015-467f3bf10cb4.PNG)
* Ở đây có các khái niệm [Request Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods): HttpPost, HttpGet:
    * HttpPost: Hiểu đơn giản là đưa dữ liệu được gửi từ **Client** về **Server** để xử lý.
    * HttpGet: Truy xuất dữ liệu từ **Server** trả về cho **Client** để hiển thị.
* Đối với bài này sử dụng 2 method trên HttpGet để sử dụng việc hiển thị ra trang Create Product. Còn HttpPost sẽ sử dụng cho việc bạn submit dữ liệu lên để lưu xuống database.
![](https://images.viblo.asia/full/e56bca9c-34fb-4cc6-b586-10e216735f13.PNG)
* Khi bạn Create new tương ứng với việc bạn gọi đến Request Method HttpGet.
![](https://images.viblo.asia/full/8d0c29b4-b38c-4f3a-8dd1-75e5904c5cc8.PNG)
* Khi bạn Submit tương ứng với việc bạn gọi đến Request Method HttpPost để lưu lại dữ liệu.
### Tạo ViewModel để sử dụng cho hiển thị.
* Tạo thư mục **ViewModels**:
![](https://images.viblo.asia/full/97139aa4-b3e0-4cc5-b57a-5a33547dc227.png)
* Trong thư mục **ViewModels** tạo class **ProductViewModel.cs** (Theo dõi dưới code bên dưới mình có update - trên hình bị thiếu).
![](https://images.viblo.asia/full/8908c36b-6a18-44da-b1e0-f6c9a9154bb1.png)
``` CSharp
using ProductManagement.Models;
using System.ComponentModel;

namespace ProductManagement.ViewModels
{
    public class ProductViewModel
    {
        public ProductViewModel(){
            GetCategory();
        }
        public ProductViewModel(int productID, string nameOfProduct, int categoryOfProductID)
        {
            ProductID = productID;
            NameOfProduct = nameOfProduct;
            CategoryOfProductID = categoryOfProductID;
            GetCategory();
        }
        [DisplayName("Mã sản phẩm")]
        public int ProductID { get; set; }

        [DisplayName("Tên sản phẩm")]
        public string NameOfProduct { get; set; }

        public int CategoryOfProductID { get; set; }

        [DisplayName("Tên loại sản phẩm")]
        public string CategoryName { get; set; }

        public void GetCategory()
        {
            if (CategoryOfProductID > 0)
            {
                using (ProductDBContext db = new ProductDBContext())
                {
                    this.CategoryName = db.CategoryOfProducts.Find(this.CategoryOfProductID) != null ?
                        db.CategoryOfProducts.Find(this.CategoryOfProductID).Description : string.Empty;
                }
            }
        }
    }
}
```
* Trong controller **ProductController** bạn cần sửa như sau: 
![](https://images.viblo.asia/full/cce434a6-88ca-4205-a521-760875dba87b.PNG)
``` CSharp
public ActionResult Index()
        {
            var lsProducts = new List<ProductViewModel>();
            db.Products.ToList().ForEach(product =>
            {
                lsProducts.Add(new ProductViewModel(product.ProductID, product.NameOfProduct, product.CategoryOfProductID));
            });
            return View(lsProducts);
        }
```
* Trong view Index của Product bạn cũng cần sử như sau:
![](https://images.viblo.asia/full/e849f988-b46e-4344-b849-14313210c382.PNG)
* Kết quả sau khi sử dụng ViewModel
![](https://images.viblo.asia/full/23904ff0-b959-4964-822e-b3551d85cbdb.PNG)
* Tương tự đối với trang Details cũng cần sửa lại như sau:
![](https://images.viblo.asia/full/4620f442-eb87-4673-901b-b282ecda4ea3.PNG)
* Và trong View Details
![](https://images.viblo.asia/full/b016bfb0-ac40-4d5c-b2af-476eed0a3bd2.PNG)
* Kết quả
![](https://images.viblo.asia/full/ab580422-54be-4b88-af8f-7dba7456b4f1.PNG)
### Customize lại trang Create, Edit và Delete Product.
* Thông thường ở trường mã loại sản phẩm sẽ được thay bằng dạng **Dropdownlist** để chọn loại sản phẩm chứ không phải nhập mã loại sản phẩm như thế này.
![](https://images.viblo.asia/full/6ebe3bc1-4009-4c7e-ae92-c0c3dfd72b5f.PNG)
* Trong thư mục **ViewModels** tạo view model **EditProductViewModel.cs**
![](https://images.viblo.asia/full/07cd0042-2e70-4116-a9d6-1fff1a27920b.PNG)
```csharp:CSharp
using ProductManagement.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace ProductManagement.ViewModels
{
    public class EditProductViewModel
    {
        public EditProductViewModel(int productID, string nameOfProduct, int categoryOfProductID)
        {
            ProductID = productID;
            NameOfProduct = nameOfProduct;
            CategoryOfProductID = categoryOfProductID;
            GetCategories();
        }

        public int ProductID { get; set; }

        [DisplayName("Tên sản phẩm")]
        public string NameOfProduct { get; set; }

        public int CategoryOfProductID { get; set; }

        public IEnumerable<CategoryOfProduct> CategoryOfProducts { get; set; }

        public void GetCategories()
        {
            using (ProductDBContext db = new ProductDBContext())
            {
                CategoryOfProducts = db.CategoryOfProducts.ToList().AsEnumerable();
            }
        }
    }
}
```
* Ở đây tại sao trong ViewModel này mình lại tạo thêm 1 dạng **IEnumerable<CategoryOfProduct>** mục đích để sử dụng cho việc hiển thị ra danh sách các **Category** của **DropdownList**.
* Trong Action Create với Request Method Get:
![](https://images.viblo.asia/full/3304f50e-dc5d-464f-96a8-3ea3ab6ac1ae.PNG)
```cpp:CSharp
public ActionResult Create()
{
    EditProductViewModel editViewModel = new EditProductViewModel();
    return View(editViewModel);
}
```
* Trong **Views** => **Products** => **Create.cshtml**:
![](https://images.viblo.asia/full/bf247f03-136d-47df-934b-b6f370f0cc7a.PNG)
* Trong Action Edit với Request Method Get bạn cũng cần sửa lại như sau:
![](https://images.viblo.asia/full/8d795c4f-7d99-41af-8831-1907492b5c74.PNG)
```csharp:CSharp
public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            EditProductViewModel editModel = new EditProductViewModel(product.ProductID, product.NameOfProduct, product.CategoryOfProductID);
            return View(editModel);
        }
```
* Trong **Views** => **Products** => **Edit.cshtml**:
![](https://images.viblo.asia/full/8331b7f5-d3f0-4d9c-a979-27909107acbf.PNG)
* Tương tự với Action Delete với **Request Method Get**
![](https://images.viblo.asia/full/06ae1088-1357-4883-8d2e-0e5e622581bf.PNG)
```csharp:CSharp
// GET: Products/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            ProductViewModel delModel = new ProductViewModel(product.ProductID, product.NameOfProduct, product.CategoryOfProductID);
            return View(delModel);
        }
```
* Trong **Views** => **Products** => **Delete.cshtml**
![](https://images.viblo.asia/full/0c6a656a-1fe1-47d2-bcbd-ad0637e48953.PNG)
### Kết quả
* Index
![](https://images.viblo.asia/full/51c52563-dc93-4296-ae08-1635918a9dda.PNG)
* Create
![](https://images.viblo.asia/full/dad01cb3-cb9b-49ba-a027-ad20636258b2.PNG)
* Details
![](https://images.viblo.asia/full/0ba19803-9a1f-4889-9990-4e0f2fc7801c.PNG)
* Edit
![](https://images.viblo.asia/full/24bbfdf9-5a69-458e-bad0-fab199cf38b8.PNG)
* Delete
![](https://images.viblo.asia/full/2091eb0f-64bd-4548-86c5-8b4e64ed2962.PNG)
### Phần kế tiếp
Ờ [phần sau](https://viblo.asia/p/series-aspnet-mvc-part-4-su-dung-migration-de-thay-doi-cau-truc-cua-du-lieu-trong-qua-trinh-development-QpmleEnNlrd) mình sẽ hướng dẫn các bạn sử dụng **Migration Data** để thay đổi cấu trúc dữ liệu.