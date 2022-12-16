Trong mẹo này, tôi chỉ cho bạn cách tạo một view engine ASP.NET MVC tùy chỉnh hỗ trợ các điều khiển khai báo lightweight. Tôi chỉ cho bạn cách tạo cả controls đơn giản và controls thị dữ liệu cơ sở dữ liệu. Tôi cũng chỉ cho bạn cách kiểm tra đầu ra được kết xuất của các lightweight controls.

Một trong những cái hay về ASP.NET MVC framework là một view có thể trông giống như bất cứ thứ gì bạn muốn. Không thích inline scripts? Bạn có thể xây dựng một view engine mới. Không thích bất cứ thứ gì giống như tag trong views của bạn? Xây dựng view engine của riêng bạn. Bạn luôn có thể thay thế Web Forms view engine mặc định bằng view engine tùy chỉnh của riêng bạn.

Trong hướng dẫn này, tôi giải thích cách bạn có thể thay thế ASP.NET MVC Web Forms view engine mặc định bằng view engine tùy chỉnh hỗ trợ lightweight, declarative controls. Tôi trình bày Control View Engine và chỉ cho bạn cách tạo các lightweight controls hoạt động với view engine tùy chỉnh này.

## Sử dụng Control View Engine
Hãy để tôi bắt đầu bằng cách cung cấp cho bạn thông tin về cách thức hoạt động của Control View Engine. Để sử dụng Control View Engine, bạn phải đặt thuộc tính ViewEngine của controller. HomeContoder trong Liệt kê 1 được cấu hình để sử dụng Control View Engine (hãy xem hàm tạo của nó).
Listing 1 – HomeController.cs

```
using System.Web.Mvc;
using MvcViewEngines;
 
namespace Tip26.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public HomeController()
        {
            this.ViewEngine = new ControlViewEngine();
        }
 
        public ActionResult Index()
        {
            return View("Index");
        }
 
    }
}
```
Thay vì đặt ViewEngine trên control cơ sở, bạn cũng có thể tạo một ControlFactory mới và tự động đặt ViewEngine cho mọi control. Để tìm hiểu cách thực hiện việc này, hãy xem ASP.NET MVC Tip # 19:

http://weblogs.asp.net/stephenwalther/archive/2008/07/14/asp-net-mvc-tip-19-use-the-nvelocity-view-engine.aspx

Control View Engine trả về các tệp .htm cho các views của nó. View Index.htm được chứa trong Liệt kê 2.
Listing 2 – Index.htm

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:my="Tip26.Controls" >
<head>
    <title>Lightweight Control View Engine</title>
</head>
<body>
 
<h1>The SimpleControl says:</h1>
 
<my:SimpleControl />
 
 
<h1>The ColorControl displays:</h1>
 
<my:ColorControl color="red">
    Here is some text
</my:ColorControl>
 
 
<hr />
<a href="/Data">Grid Control</a>
 
</body>
</html>
```
Lưu ý rằng tài liệu HTML trong Liệt kê 2 không chứa bất kỳ inline script nào. Thay vào đó, nó chứa hai controls khai báo có tên SimpleControl và ColorControl. Khi HomeContoder trả về view Index, bạn sẽ nhận được trang trong Hình 1.
Figure 1 – The Index view
	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip26CreateaLightweightControl_F10D/clip_image002_thumb.jpg)
## .NET Namespace = XHTML Namespace
Nếu bạn nhìn kỹ vào view Index trong Liệt kê 2 thì bạn sẽ thấy rằng một  XML namespace tùy chỉnh được khai báo trên thẻ <html> mở. Thẻ <html> mở trông như thế này:

<html xmlns = "http://www.w3.org/1999/xhtml" xmlns: my = "Tip26.Controls">

Namespace mặc định là XHTML namespace tiêu chuẩn cho các tài liệu XHTML. Namespace thứ hai tương ứng với một namespace  .NET. Thuộc tính xmlns thứ hai liên kết các điều khiển SimpleControl và ColorControl với namespace Tip26.Controls. Khi trang được phân tích cú pháp, lớp Tip26.Controls.SimpleControl và lớp Tip26.Controls.ColorColor sẽ tự động được khởi tạo. Không có cấu hình khác cho các điều khiển tùy chỉnh.

## Tạo Lightweight Controls
Control View Engine sử dụng các  lightweight controls. SimpleControl được chứa trong Liệt kê 3.

Listing 3 – SimpleControl.cs

```
using System;
using System.Web.Mvc;
using MvcViewEngines;
using System.Xml;
 
namespace Tip26.Controls
{
    public class SimpleControl : IControl
    {
 
        public XmlNode Render(ViewContext context, XmlDocument document, XmlElement controlElement)
        {
            return document.CreateTextNode("Hello from SimpleControl!");
        }
 
    }
}
```
SimpleControl thực thi IControl interface. Interface này yêu cầu bạn thực hiện một phương thức duy nhất: Render(). Trong Liệt kê 3, phương thức Render() chỉ đơn giản trả về XmlElement mới hiển thị "Hello from SimpleControl!". Thẻ <my: Simple> được thay thế trong  Index view bằng text được render này.

Lưu ý rằng SimpleControl không xuất phát từ lớp base System.Web.UI.Control hoặc lớp System.Web.UI.WebControls.WebControl. Lightweight control này không sử dụng view state. Nó không có thuộc tính, phương thức và sự kiện tiêu chuẩn nào của WebForm control.

Lightweight control này không tham gia vào vòng đời của trang ASP.NET. Điều đó là không thể vì SimpleControl được khởi tạo trong một trang HTML thay vì trang ASP.NET. Điều duy nhất mà SimpleControl làm là tạo một node XML mới.

Một lightweight control có thể có các thuộc tính. Ví dụ, ColorControl có thuộc tính **color** . Dưới đây là cách ColorControl được khai báo trong view Index.htm:
    ```
<my:ColorControl color="red">
    Here is some text
</my:ColorControl>
```
    Mã cho ColorControl được chứa trong Liệt kê 4.
   ```
 Listing 4 – ColorControl.cs

using System;
using System.Web.Mvc;
using MvcViewEngines;
using System.Xml;
 
namespace Tip26.Controls
{
    public class ColorControl : IControl
    {
 
        public XmlNode Render(ViewContext context, XmlDocument document, XmlElement controlElement)
        {
            // Get color attribute
            var color = controlElement.GetAttribute("color");
 
            // Get inner text
            var text = controlElement.InnerText;
 
            // Create div node
            var div = document.CreateElement("div");
            div.InnerText = text;
            div.SetAttribute("style", "background-color:" + color);
 
            // Return replacement node
            return div;
        }
 
    }
}
```
    ColorControl trong Liệt kê 4 trước tiên lấy giá trị của thuộc tính **color** .control sau đó nhận được  inner text củacontrol. Cuối cùng, control xây dựng một phần tử XML mới hiển thị div XHTML .

## Hiển thị Database Data
Thêm một mẫu của lightweight control. View trong Liệt kê 5 chứa một lightweight control có tên là Grid control. Control này hiển thị bảng HTML cơ sở dữ liệu (xem Hình 2).
    Figure 2 – Rendered by the Grid Control
    	![alt](https://aspblogs.blob.core.windows.net/media/stephenwalther/WindowsLiveWriter/ASP.NETMVCTip26CreateaLightweightControl_F10D/clip_image004_thumb.jpg)
    Listing 5 – Index.htm

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:custom="Tip26.Controls" >
<head>
    <title>Show Grid Control</title>
    <style type="text/css">
    
    table
    {
        border-collapse:collapse;    
    }
    
    table td 
    {
        padding: 10px;
        border: black solid 1px;
    }
    
    </style>
</head>
<body>
 
  <custom:Grid controller="Tip26.Controllers.MovieController" action="ListAll" />
 
</body>
</html>
```
    Lưu ý, một lần nữa, trang HTML trong Liệt kê 5 không chứa bất inline script nào. Đây là trang XHTML hợp lệ không có nội dung ngoại trừ các yếu tố XHTML.

View chứa Grid render bảng HTML của cơ sở dữ liệu. Lưu ý rằng phần tử có hai thuộc tính: controller và action. Control Grid sử dụng các thuộc tính này để chỉ ra chỗ cần lấy dữ liệu.

Lightweight Grid control được chứa trong Liệt kê 6.

```
Listing 6 – Grid.cs

using System;
using System.Collections;
using System.Reflection;
using System.Web.Mvc;
using System.Xml;
using MvcViewEngines;
 
namespace Tip26.Controls
{
    public class Grid : IControl
    {
 
        public XmlNode Render(ViewContext context, XmlDocument document, XmlElement controlElement)
        {
            // Check for required control attributes
            string controllerName = controlElement.GetAttribute("controller");
            if (String.IsNullOrEmpty(controllerName))
                throw new Exception("Grid is missing controller attribute.");
            
            string actionName = controlElement.GetAttribute("action");
            if (String.IsNullOrEmpty(actionName))
                throw new Exception("Grid is missing action attribute.");
 
            // Instantiate controller
            Type controllerType = Type.GetType(controllerName, true, true);
            var controller = (IController)Activator.CreateInstance(controllerType);
            
            // Call action (not using Action Invoker)
            MethodInfo method = controllerType.GetMethod(actionName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            IEnumerable data = (IEnumerable)method.Invoke(controller, null); 
 
 
            // Create table
            XmlElement table = document.CreateElement("table");
            foreach (object item in data)
            {
                var row = document.CreateElement("tr");
                var props = item.GetType().GetProperties();
                foreach (PropertyInfo prop in props)
                {
                    var cell = document.CreateElement("td");
                    cell.InnerText = prop.GetValue(item, null).ToString();
                    row.AppendChild(cell);
                }
                table.AppendChild(row);
            }
            return table;
        }
 
    }
}
```
    
Nguồn: https://weblogs.asp.net/stephenwalther/asp-net-mvc-tip-26-create-a-lightweight-control-view-engine