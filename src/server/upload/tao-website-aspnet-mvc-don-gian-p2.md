Ở [bài viết trước](https://viblo.asia/p/tao-website-aspnet-mvc-don-gian-p1-1VgZvVD2ZAw), mình đã giới thiệu cách tạo một project ASP.NET bằng Visual Studio 2019 và giới thiệu qua về cấu trúc Solution Explorer. Bài viết này, mình sẽ viết về cách **Tạo mới Controller và View** theo mô hình MVC nhé.
 # Tạo mới Controller
 Controller là một trong các thành phần chính trong mô hình MVC, xử lý bất kỳ các yêu cầu nào từ URL.
 
 Để thêm 1 controller mới, ở cửa sổ *Solution Explorer*, ta click chuột phải lên thư mục *Controllers* và sau đó chọn **Add** -> **Controller**.
 Bạn có thể đặt tên Controller của mình tùy ý. Mình đặt tên Controller của mình là *BookController*.
 Ở bước này, trong thư mục *Controllers*, class *BookController.cs* được tạo ra với nội dung mặc định như trong hình. Class này được kế thừa từ từ lớp cơ sở *Microsoft.AspNetCore.Mvc.Controller*.
 ![](https://images.viblo.asia/94f3473d-e014-442b-9f1a-55f98cf827aa.PNG)

 
Trước tiên, mình xây dựng class *BookController.cs* như sau:
 ```
 using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
 
namespace MyBook.Controllers
{
    public class BookController : Controller
    {
        public string Index()
        {
            return "This is Index Method";
        }
 
        public string AboutUs()
        {
            return "This is AboutUs method";
        } 
    }
}
```
 
Từ đoạn code trên có thể dễ thấy trong *BookController* có 2 method:
* Phương thức `Index()` trả về một chuỗi kí tự với giá trị là `This is Index Method`. `Index()` chính là phương thức mặc định của 1 Controller bất kỳ.
* Phương thức `AboutUs()` cũng trả về chuỗi kí tự.
Bạn có thể tạo nhiều phương thức thực thi ở tập tin *BookController.cs* tùy ý. Để thực thi ứng dụng, bạn nhấn F5 hoặc Ctrl + F5 (chế độ không cần Debug) để xem kết quả.
Kết quả sẽ hiển thị khi bạn nhập địa chỉ với dạng `http://localhost:xxxx/ControllerName/ActionName/Parameters`. Trong đó 
* `xxxx` là số cổng tự động gieo bởi server IIS Express của Visual Studio.
* `ControllerName` là tên Controller. 
* `ActionName` là tên phương thức của Controller
* `Parameters` là các tham số đầu vào của các phương thức. Những phương thức không chứa tham số đầu vào như trong ví dụ trên thì sẽ không có phần Parameters.
Ví dụ:
* Khi nhập địa chỉ `http://localhost:xxxx/Book/` thì sẽ trả về kết quả của method `Index()` mặc định.
* Khi nhập địa chỉ `http://localhost:xxxx/Book/AboutUs` thì sẽ trả về kết quả của method `AboutUs()`.

Để sử dụng parameters trên đường dẫn URL, bạn hãy sửa nội dung phương thức  như sau:
```
public string AboutUs(string name, int age)
{
            return HttpUtility.HtmlEncode("Hello, I am " + name + ".  I am " + age + " years old.");
}
```
Khi đó URL gọi đến phương thức này là `http://localhost:xxxx/Book/AboutUs?name=Cress&age=16`

# Tạo mới View
View là một thành phần trong mô hình MVC, chịu trách nhiệm về việc hiển thị nội dung trên giao diện Web và tiếp nhận các tương tác từ client để gửi đến server.

Để thêm view thì việc trước tiên, bạn phải chỉnh sửa các phương thức trong class *BookController.cs*. Ví dụ ta phải thay đổi phương thức `Index()` như sau:
```
public ActionResult Index()
{
      return View(); 
}
```

Trong ví dụ trên, phương thức Index sẽ trả về một `ActionResult` hoặc một lớp kế thừa từ lớp `ActionResult` bằng câu lệnh `return View();`. 
`View()` ở đây chính là View tương ứng với Controller. Để tạo một View mới, ứng với Method trong Controller thì ta có thể nhấn chuột phải vào Method rồi chọn Add ->View. Ta sẽ thấy hiển thị cửa sổ như trong hình:
![](https://images.viblo.asia/8f5fed6c-ae41-4015-89dd-b76df05ecc77.PNG)

Bạn hãy chọn **Razor View - Empty** nếu muốn chọn một file view trống và mới hoàn toàn. Razor View là gì, nó hoạt động như thế nào thì mình sẽ viết kĩ hơn trong bài viết sau. Nhưng trước hết, để tạo một view đơn giản, bạn hãy lựa chọn **Razor View - Empty** rồi chọn **Add**, đặt tên cho file View nhé. Trong .NET MVC project, view của mình sẽ có đuôi là *cshtml*. Mình đã tạo một file *Index.cshtml* tương ứng với method Index trong Controller. File *Index.cshtml* mình để đơn giản như sau:
```
<h1>MyBook</h1>
<p>This is Index Page</p>
```
Cùng chạy để xem kết quả nào  (Nên nhớ để truy cập được vào file Index này, mình phải nhập link `http://localhost:xxxx/Book/Index` nhé :ok_hand:)
![](https://images.viblo.asia/73a8529b-1d96-4c95-8469-ab7001e543e8.PNG)

Đơn giản quá phải không các bạn. 
Ở bài viết tới, mình sẽ giới thiệu cách Tạo mới Model, các bạn nhớ đọc nha :kissing_heart: