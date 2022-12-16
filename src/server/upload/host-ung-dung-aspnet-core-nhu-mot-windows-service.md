# Giới thiệu

Một ứng dụng ASP.NET Core có thể host với nhiều môi trường khác nhau bao gồm IIS và HTTP.sys server. Bài viết này sẽ giới thiệu với các bạn việc host ứng dụng ASP.NET Core như một Windows Service. Tính năng Windows Service là có sẵn chỉ trên nền tảng hệ điều hành Windows. Đây là một trong những cách để host ứng dụng ASP.NET Core trên nển tảng Windows với  việc không sử dụng IIS.

Việc triển khai host một ứng dụng ASP.NET Core như một Windows service không liên quan đến .NET Core. Khi một ứng dụng được host như một Windows service nó có thể start/stop một cách tự động nếu serivice là start/stop.

Khi ứng dụng ASP.NET Core host trên Windows service, ứng dụng phải chạy trên .NET Framework, như vậy chúng ta cần chỉ định giá trị thích hợp cho setting ```TagetFramework``` trong file project .csproj, để demo ví dụ, chúng ta chạy ứng dụng trên .NET 4.6.1.

```csharp
<PropertyGroup>  
  <TargetFramework>net461</TargetFramework>  
</PropertyGroup> 
```
# Triển khai
Bước đầu tiên là cài đặt ```Microsoft.AspNetCore.Hosting.WindowsServices``` package từ NuGet. Package này có thể được cài đặt bằng việc sử dụng NuGet Package Manager hoặc .NET Core CLI.

### Sử dụng NuGet Package Manager
```
PM > Install-Package Microsoft.AspNetCore.Hosting.WindowsServices 
```

### Sử dụng .NET Core CLI
```
> dotnet add package Microsoft.AspNetCore.Hosting.WindowsServices
```

Package này chứa extension method tên là "RunAsService" cho IWebHost. Extension method này chạy ứng dụng web được chỉ định như một Windows Service và port được khóa cho đến khi service dừng lại. Ở đây, chúng ta muốn chạy ứng dụng như một service, như vậy chúng ta cần gọi phương thức ```IWebHost.RunAsService()```thay vì sử dụng ```IWebHost.Run()``` trong phương thức main của Program class. Cũng vậy, chúng ta cần chỉ định đường dẫn cho thư mục content root đến nơi publish code của ứng dụng.

### Program Class
```csharp
using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System.Diagnostics;

namespace WebHostServiceDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var pathToExe = Process.GetCurrentProcess().MainModule.FileName;  
            var pathToContentRoot = Path.GetDirectoryName(pathToExe);  
  
            var host = WebHost.CreateDefaultBuilder(args)  
                .UseContentRoot(pathToContentRoot)  
                .UseStartup<Startup>()  
                .Build();  
  
            host.RunAsService();  
        }
    }
}

```

Bước tiếp theo là publish ứng dụng và đăng kí nó như một Windows Service. Các bạn sử dụng lệnh sau, với việc chỉ định đường dẫn thư mục publish:
```
>dotnet publish --output "D:\Projects\WebHostServiceDemo\Publish"
```
Để đăng kí một Windows Service, mở command line với quyền administrative và sử dụng công cụ command-line sc.exe để tạo và start một service. Lệnh bên dưới thì binPath là đường dẫn đến file thực thi ứng dụng nằm trong thư mục mà bạn đã publish code.
```
>sc create DemoWebHostService binPath="D:\Projects\WebHostServiceDemo\Publish\WebHostServiceDemo.exe"  
>sc start DemoWebHostService
```
![](https://images.viblo.asia/59257fa6-8231-49d8-bfcc-9615665289f4.png)

Khi lệnh trên được thực thi thành công và Windows Service đã được start, chúng ta có thể duyệt web giống như đường dẫn khi chạy ứng dụng web thông thường (ví dụ url mặc định là http://localhost:5000)

![](https://images.viblo.asia/b996ab53-ebd7-4ae4-985c-c973d524f72b.png)

Để xóa service, đơn giản chúng ta dùng lệnh sau:
```
>sc delete <SERVICE-NAME>
```

### Cung cấp thêm một lựa chọn để host ứng dụng ngoài service trong Program Class
Khi chạy và host ứng dụng như một Windows service, nó là rất khó để debug. Như vậy chúng ta cần thêm một điều kiện để chạy dứng dụng với cách thông thường như code bên dưới:
```csharp
public static void Main(string[] args)
{
    var pathToExe = Process.GetCurrentProcess().MainModule.FileName;
    var pathToContentRoot = Path.GetDirectoryName(pathToExe);

    IWebHost host;

    if (Debugger.IsAttached || args.Contains("console"))
    {
        host = WebHost.CreateDefaultBuilder()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();
        host.Run();
    }
    else
    {
        host = WebHost.CreateDefaultBuilder(args)
                .UseContentRoot(pathToContentRoot)
                .UseStartup<Startup>()
                .Build();
        host.RunAsCustomService();
    }
}
```
Bây giờ, ta đang chạy ứng dụng sử dụng lệnh dotnet run và truyền string "console" như một đối số, như vậy .NET Framework host ứng dụng chúng ta trên một port được cấu hình trong file launchSettings.json.
```
> dotnet run console  
```

### Xử lý sự kiện starting và stopping của Windows service 
Để handle các sự kiện OnStarting, Onstarted và OnStopping, chúng ta cần tạo ta custom class như ```CustomWebHostService``` kế thừa class ```WebHostService```. Dưới đây là code ví dụ:
```csharp
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.WindowsServices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace WebHostServiceDemo
{
    public class CustomWebHostService: WebHostService
    {
        private ILogger _logger;

        public CustomWebHostService(IWebHost host) : base(host)
        {
            _logger = host.Services.GetRequiredService<ILogger<CustomWebHostService>>();
        }

        protected override void OnStarting(string[] args)
        {
            System.Diagnostics.Debugger.Launch();
            base.OnStarting(args);
        }

        protected override void OnStarted()
        {
            base.OnStarted();
        }

        protected override void OnStopping()
        {
            base.OnStopping();
        }
    }
}

```

Bước tiếp theo là để tạo một extension method cho ```IWebHost``` cái mà sẽ đăng kí class custom ```WebHostService``` và truyền tới phương thức ```ServiceBse.Run(..)```

```csharp
public static class WebHostServiceExtensions
{
    public static void RunAsCustomService(this IWebHost host)
    {
        var webHostService = new CustomWebHostService(host);
        ServiceBase.Run(webHostService);
    }
}
```
Bây giờ, chúng ta cần gọi extension method ```RunAsCustomService``` thay vì ```RunAsService``` trong phương thức main của class Program.
```csharp
public static void Main(string[] args)  
{  
    var pathToExe = Process.GetCurrentProcess().MainModule.FileName;  
    var pathToContentRoot = Path.GetDirectoryName(pathToExe);  
  
    var host = WebHost.CreateDefaultBuilder(args)  
        .UseContentRoot(pathToContentRoot)  
        .UseStartup<Startup>()  
        .Build();  
  
    host.RunAsCustomService();  
}  
```

# Tổng kết
Bài viết này được dịch và tham khảo từ bài viết gốc [Host An ASP.NET Core Application As A Windows Service](https://www.c-sharpcorner.com/article/host-an-asp-net-core-application-as-a-windows-service/). Nó giới thiệu từng bước để có thể host một ứng dụng ASP.NET Core trên Windows Service, cung cấp thêm một lựa chọn khi deploy ứng dụng ASP.NET Core. Hy vọng bài viết sẽ cung cấp cho các bạn những điều bổ ích.

Link code demo:
https://github.com/quanghiepth86/WebHostServiceDemo