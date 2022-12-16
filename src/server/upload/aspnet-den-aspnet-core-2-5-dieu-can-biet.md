# Xin chào ASP.NET Core 2
ASP.NET Core 1 có khoảng 14 đến 16 nghìn APIs được xây dựng sẵn. Với ASP.NET Core 2 con số hiện tại lên tới 36 nghìn.
Với điều đó tôi đã bắt đầu chuyển một số dự án cá nhân và muốn ghi lại những thay đổi lớn nhất từ ASP.NET.

# Dependency injection được đưa vào
Khi xây dựng bất kì ứng dụng có khả năng mở rộng lớn, dependency injection (DI) nên được áp dụng. Với ASP.NET Core, Microsoft đã loại bỏ nỗi đau của việc lựa chọn và cấu hình DI. Nhưng đừng lo lắng, bạn vẫn có thể đưa thêm và cấu hình third-party khác.
Cái gì tôi cần làm để sử dụng những tính năng tuyệt vời này ? Tôi nghe bạn khóc. Kiểm tra đoạn code bên dưới:
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddTransient<ITransientService, TransientService>();
    services.AddScoped<IScopedService, ScopedService>();
    services.AddSingleton<ISingletonService, SingletonService>();
}
```
Đấy là nó !

Chỉ là nỗ lực trong việc chọn ```lifetime``` cho service được đăng kí.
Điều này đạt được bởi việc sử dụng các phương thức ```AddTransient```, ```AddScoped``` hoặc ```AddSingleton```

- ```AddTransient```  - Một thể hiện của service sẽ được cung cấp đến mỗi class request nó.
- ```AddScoped``` - Một thể hiện của service sẽ được tạo trên mỗi request.
- ```AddSingleton``` - Một thể hiện của service sẽ được tạo cho vòng đời của ứng dụng.

# File CSPROJ mới
File  .csproj đã được đại tu trong ASP.NET Core 2. Nó đã đơn giản một cách tuyệt vời từ file .csproj mà tất cả chúng ta đều từng sử dụng trong các dự án ASP.NET.
Khác biệt lớn nhất đã đến từ những thay đổi của cấu trúc thư mục dự án. Files bây giờ không còn phải bắt buộc đưa vào solution. Tôi thực sự thích điều này như tôi đã ghét để biết số lượng của việc merge conflict. Tôi phải resolve do những file mới được thêm vào dự án.

Microsoft đã gỡ bỏ GUID-based tham thiếu đến các dự án khác trong solution. Điều này làm file dễ đọc hơn nhiều. Bây giờ bạn có thể sửa file project một cách nhanh chóng, và không cần phải unload project và relead lại nó.

# RAZOR PAGES
Suy nghĩ MVC view nhưng không một controller

Để định nghĩa một razor page sử dụng ```@page``` directive trên đầu của page.
```html
@page

<h1>Page Title</h1>

<div>
 ...
</div>
```

Ở đây tôi đã định nghĩa một razor page sử dụng ```@page``` directive mà tôi đã đề cập ở trên. Directive này mở page đến một MVC action. Một lần điều này xảy ra razor page sẽ xử lý request trực tiếp mà không cần đến controller.
Nó là quan trọng để chú ý rằng ```@page``` directive phải là cái đầu tiên được khai báo trên page. Một lần được khai báo nó sẽ ảnh hưởng đến bất kì xây dựng razor được sử dụng trên page này.

### Bước xa hơn

Ví dụ trên là rất đơn giản sử dụng trường hợp cho razor pages. Một bước xa hơn là để sử dụng code bên trong file

Tôi chắc chắn trong số các bạn đang nghĩ cái tôi đã làm ... WebForms!!
Nhưng đừng lo lắng, không có ```ViewState``` xấu xí. Hãy để tôi chỉ ra cho bạn một ví dụ.
```csharp
(pages/HelloWorld.cshtml.cs)

using System;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreExamples.RazorPages
{
    public class HelloWorldModel : PageModel
    {
        public string Heading { get; private set; } = "Hello World";
    }
}
```
```csharp
(pages/HelloWorld.cshtml)

@page
@using RazorPages
@model HelloWorldModel

<h1>@Model.Heading</h1>
```
Có một cuộc hội thoại mang tên cái mà tôi đã demo ở trên. File  ```PageModel```  có tên giống như Razor page nhưng với .cs ở phần cuối.

### ROUTING
Mặc định runtime sẽ tìm kiếm Razor Pages trong một folder được gọi là ```pages```. Từ đó điểm bắt đầu của URLs sẽ ánh xạ cấu trúc folder.
```/pages/index.cshtml``` được trả về khi request đến ```/``` hoặc ```/index```.
```/pages/hello-world/index.cshtml``` được trả về khi request ```/hello-world``` hoặc ```/hello-world/index```.
Bạn có được ý tưởng
Có nhiều hơn về Razor Pages cái mà tôi sẽ trình bày trong các bài viết tương lai nhưng bây giờ tôi sẽ rời bỏ tại đây.

# GLOBAL.ASAX đã chết

Ứng dụng ASP.NET được khởi động bằng việc sử dụng ```Global.asax```. Trong file định tuyến này, filters và bundles là một số common items được đăng kí. Tiếp theo đến ```OWIN``` cái mà đã thay đổi cách một ứng dụng khởi động. Nó giới thiệu ```startup.cs``` nơi middleware có thể cắm thêm và được cấu hình. Đây là một nỗ lực để tách ứng dụng khỏi máy chủ.

Trong ASP.NET Core thì ```global.asax``` bây giờ được gõ bỏ hoàn toàn. Và trong khi đó vẫn có một file ```startup.cs```. Sự phụ thuộc trên ```OWIN``` cũng được gõ bỏ. Bây giờ việc khởi động là trách nhiệm của file ```program.cs```. Vừa như một ứng dụng console ```program.cs``` chứa phương thức ```Main```. Nó bây giờ là cái được sử dụng để load ```startup.cs```.
```csharp
public class Program
{
    public static void Main(string[] args)
    {
        var host = new WebHostBuilder()
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseIISIntegration()
            .UseStartup<Startup>()
            .Build();

        host.Run();
    }
}
```
# Việc lưu trữ APP SETTINGS

Trong ASP.NET nó là phổ biến để đặt các settings nhất định trong mục ```<appSettings>```của ```web.config```. Điều này không còn nữa trong ASP.NET Core.
ASP.NET Core có thể load data từ bất kì file nào. Mặc định một ứng dụng mới được cài đặt để sử dụng một file gọi là ```appsettings.json```.  Khởi tạo file này có một vài thứ như bên dưới.
```csharp
{
  "Logging": {
    "IncludeScopes": false,
    "LogLevel": {
      "Default": "Warning"
    }
  }
}
```
Để thêm thông tin setting của riêng bạn đến file bạn đơn giản tạo một object mới.
```csharp
{
  "Logging": {
    "IncludeScopes": false,
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "Api" {
    "BaseUrl": "http://domain.com/api"
  }
}
```

Ngoài ra sử dụng một setting đã thêm trong file setting bạn cần load nó trong file ```Startup.cs```.
```csharp
public Startup(IHostingEnvironment env)
{
    var builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddEnvironmentVariables();
    Configuration = builder.Build();
}

public IConfigurationRoot Configuration { get; }
```

Bạn có thể truy cập bất kì setting nào bên trong bởi việc làm như bên dưới:
```csharp
var baseUrl = Configuration.GetSection("Api")["BaseUrl"];
```

# Thảo luận
Việc chuyển từ một framework cũ sang framework mới dù thế nào cũng đem lại những bỡ ngỡ nhất định. Ở bài viết này tác giả đã liệt kê ra những khác biệt chính của ASP.Core so với phiên bản cũ.
Nó là hữa ích để chúng ta nhận biết những điểm nhấn chính, giúp chúng ta tiếp cận framework mới nhanh chóng và hiệu quả hơn. Hy vọng bài biết đem lại những điều bổ ích cho các bạn.

Bài viết được dịch từ bài viết gốc: [ASP.NET TO ASP.NET CORE 2 - 5 THINGS TO KNOW](https://codedaze.io/asp-net-to-asp-net-core-2-5-things/)