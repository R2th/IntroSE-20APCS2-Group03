# Giới thiệu

Khái niệm về middleware đã có từ khi ASP.NET MVC (trước khi có .NET Core) và [OWIN](https://viblo.asia/p/tong-quan-ve-owin-open-web-server-interface-for-net-qm6RWQmqGeJE). Về cơ bản, một middleware component ở trong một đường ống (pipeline) xử lý các requests và hoạt động như một chuỗi các công việc, đồng thời giao phó đến bất kì middleware componennt tiếp theo được đăng kí trong đường ống  (pipeline) ngay sau nó. Hình ảnh bên dưới (lấy từ trang web của Microsoft) chỉ ra điều này.

![](https://images.viblo.asia/061273fd-7425-4c62-a6a0-c4606adedf22.png)

MVC chính nó được triển khai (implement) như một middleware component, như việc chuyển hướng (redirection), xử lý lỗi (exception handling), buffering,..

Một middleware component có thể được thêm vào theo một số cách, nhưng trong ASP.NET Core, tất cả đều qua phương thức ```Use```  trong ```IApplicationBuilder```. Rất nhiều phương thức dành riêng cho API dựa vào nó để thêm middleware component. 

Hiện tại, chúng ta sẽ sử dụng ```IMiddleware``` interface đi cùng với ASP.NET Core. Nó cung cấp một hợp đồng đơn giản mà không có phụ thuộc (dependencies) nào khác ngoài HTTP abstractions.

Một request phổ biến có thể tải và inject middleware component một cách tự động vào đường ống (pipeline). Hãy xem làm thế nào chúng ta có thể làm thế.


# Managed Extensibility Framework
.NET Core có Managed Extensibility Framework (MEF), bạn có thể tìm hiểu ở bài viết trước của tôi [Using MEF in .NET Core](https://weblogs.asp.net/ricardoperes/using-mef-in-net-core). MEF đề xuất một API để có thể sử dụng tìm và khởi tạo plugins từ assemblies, chính điều này đã làm nó trở thành ứng viên thú vị cho việc khám phá và cài đặt middleware component.

![](https://images.viblo.asia/707f3117-9214-421a-9e3f-d980cf5f496b.png)

Chúng ta sẽ sử dụng ```System.Composition``` Nuget package. Như bài viết trước, chúng tôi sẽ lặp qua tất cả assemblies trong các đường dẫn được cung cấp (thông thường là thư mục bin của ASP.NET Core) và thử tìm tất các implementation của các interface. Sau đó chúng ta sẽ đăng kí tất cả chúng với MEF configuration.

# Triển khai
   Interface của chúng ta sẽ được gọi là ```IPlugin``` và thực tế nó thừa kế từ ```IMiddleware```. Nếu chúng ta mong muốn, chúng ta có thể thêm nhiều members tới nó, bây giờ nó thực sự không quan trọng:
   
   ```csharp
   public interface IPlugin : IMiddleware
  {
  }
   ```

```IMiddleware``` đề xuất một phương thức ```InvonkeAsync``` có thể được gọi là bất đồng bộ và nắm giữ context hiện tại và một con trỏ đến delegate tiếp theo (hoặc middleware component).

Tôi đã viết extension method bên dưới cho ```IApplicationBuilder```:

```csharp
public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UsePlugins(this IApplicationBuilder app, string path = null)        {

         var conventions = new ConventionBuilder();
         conventions
               .ForTypesDerivedFrom<IPlugin>()
               .Export<IPlugin>()
               .Shared();

         path = path ?? AppContext.BaseDirectory;

         var configuration = new ContainerConfiguration()
                .WithAssembliesInPath(path, conventions);

         using (var container = configuration.CreateContainer())
         {
            var plugins = container
              .GetExports<IPlugin>()
              .OrderBy(p => p.GetType().GetCustomAttributes<ExportMetadataAttribute>(true)
              .SingleOrDefault(x => x.Name == "Order")?.Value as IComparable ?? int.MaxValue);

            foreach (var plugin in plugins)
             {
                 app.Use(async (ctx, next) =>
                 {
                     await plugin.InvokeAsync(ctx, null);
                     await next();
                 });
            }
         }

         return app;
    }
}
```

Chúng ta đã định nghĩa một ```convention``` trong đó mỗi kiểu được tìm thấy mà triển khai (implement) ```Iplugin``` chúng ta sẽ đăng kí dưới dạng chia sẻ (share), có nghĩa là một dạng ```singleton```

Như bạn có thể thấy, nếu tham số đường dẫn (path) không được cung cấp, nó mặc định sẽ là ```AppContext.BaseDirectory```.

Chúng ta có thể thêm vào **plugin/middleware** implementation một ```ExportMetadataAttribute``` với một giá trị **Order**  chỉ định thứ tự bởi những plugins sẽ được load, tôi sẽ giải thích chi tiết điều này trong giây lát.

Với phương thức extionsion ```WithAssembliesInPath``` đến từ bài biết trước của tôi nhưng tôi sẽ thêm nó ở đây cho bạn tin tưởng:

```csharp
public static class ContainerConfigurationExtensions
{
    public static ContainerConfiguration WithAssembliesInPath(
        this ContainerConfiguration configuration,
        string path,
        SearchOption searchOption = SearchOption.TopDirectoryOnly)
    {
        return WithAssembliesInPath(configuration, path, null, searchOption);     
    }
    
    public static ContainerConfiguration WithAssembliesInPath(
        this ContainerConfiguration configuration,
        string path,
        AttributedModelProvider conventions,
        SearchOption searchOption = SearchOption.TopDirectoryOnly)
    {
        var assemblyFiles = Directory.GetFiles(path, "*.dll", searchOption);
        var assemblies = assemblyFiles.Select(AssemblyLoadContext.Default.LoadFromAssemblyPath);
        configuration = configuration.WithAssemblies(assemblies, conventions);
        
        return configuration;
    }
}
```

Nếu bạn muốn tìm tất cả các assemblies trong các thư mục lồng, bạn cần truyền ```SearchOption.AllDirectories``` như tham số ```searchOption```, nhưng tất nhiên điều này sẽ có đánh đổi về hiệu suất nếu bạn có cấu trúc nhiều thư mục con.

# Để tất cả chúng cùng nhau

Như vậy, hãy viết một vài class mà triển khai ```Iplugin``` interface và do đó thích hợp để sử dụng middleware components:

```csharp
[Export(typeof(IPlugin))] [ExportMetadata("Order", 1)] 
public class MyPlugin1 : IPlugin 
{     
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)     
    {         
        //do something here

        //this is needed because this can be the last middleware in the pipeline (next = null)
        if (next != null)         
        {             
            await next(context);         
        }

        //do something here     
    } 
}
```

Chú ý làm thế nào chúng ta áp dụng một ```ExportMetadataAttribute``` đến một class với một giá trị **Order**; điều này không cần thiết và nếu không được cung cấp, nó sẽ mặc định với giá trị lớn nhất của kiểu integer (```int.MaxValue```), có nghĩa là nó sẽ được load sau tất cả các plugins khác. Nhưng class này cần để public và có một public parameters contructor. Bạn có thể nhận bất kì services nào được đăng kí từ thuộc tính ```RequestServices``` của ```HttpContext```.

Bây giờ, tất cả những gì chúng ta cần làm là thêm một cặp assemblies tới thư mục bin của ứng dụng web (hoặc một số đường dẫn khác mà được truyền đến ```UsePlugins```) và gọi phương thức extension này bên trong ```Configue```:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    //rest goes here

    app.UsePlugins(/*path: “some path”*/);

    //rest goes here
}
```

Và ở đây bạn có nó: ASP.NET Core sẽ tìm middleware từ bất kì assemblies nào mà nó có thể tìm trên đường dẫn được cung cấp

# Kết
Middleware không phải là một khái niệm mới lạ, nó đã có ở các phiên bản ASP.NET MVC trước đây, cũng như các ngôn ngữ lập trình web khác. Ở đây tác giả muốn giới thiệu đến chúng ta cachs đăng kí middleware thông qua các assemplies (file dll) trong ASP.NET Core. Cách thức này hoàn toàn được load động với sự hỗ trợ của ASP.NET Core. Nó rất phù hợp khi chúng ta gắn các plugin bên ngoài vào ứng dụng của mình. Rất hy vọng sẽ giúp ích cho các bạn cần đến nó.

**Bài biết được dịch từ nguồn:**

https://weblogs.asp.net/ricardoperes/dynamically-loading-middleware-in-asp-net-core