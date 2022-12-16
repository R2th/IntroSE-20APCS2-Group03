Filter trong ASP.NET Core MVC cho phép bạn thực thi code trước hoặc sau giai đoạn nhất định trong request processing pipeline.

Những filters được xây dựng sẵn trong ASP.NET Core MVC xử lý các tác vụ như:
- Authorization (ngăn chặn truy cập tới tài nguyên của một user chưa được xác thực).
- Đảm bảo rằng tất cả các requests sử dụng HTTPS.
- Response caching (Trả về response đã được cache trước đó).

Custom filter có thể được tạo ra để xử nhiều vấn đề cụ thể khác. Filter có thể tránh việc trùng lặp code trong nhiều actions. Ví dụ, filter cho việc xử lý lỗi (error handling exception) là một trong những trường hợp như thế. Thay vì việc phải handle trong từng action của controller, bạn có thể làm điều đó tại một nơi duy nhất là Filter.

# 1. Filter làm việc như thế nào
Các bạn có thể theo dõi hình bên dưới để thấy được một chuỗi công việc được thực hiện tuần tự trong một request và xác định được filter sẽ nằm ở vị trí nào trong đó.

![](https://images.viblo.asia/169914a1-4863-4f2a-bf5c-64130e03804e.png)

# 2. Filter types
Mỗi một loại filter thực thi ở một giai đoạn nhất định trong filter pipeline.
- **Authorization filters** thực thi đầu tiên và được sử dụng để xác định liệu user hiện tại đã được xác thực hay chưa trong request hiện tại. Chúng có thể cắt ngắn mạch pipeline request nếu request chưa được xác thực.
- **Resource filters** thực thi đầu tiên để xử lý một request sau authorization. Chúng có thể thực thi code trước phần còn lại của filter pipeline và sau phần còn lại của pipeline đã hoàn thành. Chúng hữa dụng để triển khai caching hoặc mặt khác rút ngắn mạch của filter pipeline cho lý do performance. Chúng chạy trước model binding, như vậy chúng có thể ảnh hưởng đến model binding.
-** Action filters** có thể thực thi code một cách trực tiếp trước và sau một action riêng biệt được gọi. Chúng có thể sử dụng để nắm bắt các đối số được truyền đến một action và kết quả trả về từ action.
- **Exception filters** được sử dụng để áp dụng các chính sách toàn cục tới các exceptions chưa được xử lý cái mà xảy ra trước bất kì thứ gì được ghi vào body của response.
- **Result filter** có thể thực thi code một cách trực tiếp trước và sau việc thực thi của action results riêng biệt. Chúng chỉ chạy khi action method đã thực thi thành công. Chúng rất hữa ích cho logic liên quan đến view hoặc formatter.

Biểu đồ dưới đây biểu diễn những filter types tương tác như thế nào trong filter pipeline.

![](https://images.viblo.asia/a1fc0d68-b131-471d-97ab-53dd75aeb57c.png)

# 3. Implementation

Filters hỗ trợ cả synchrobous và asynchronous thông qua những interface definitions khác nhau.
Sysncronous filters cái mà chạy code cả trước và sau giai đoạn pipeline của chúng, định nghĩa phương thức ```OnStageExecuting``` và ```OnStageExecuted```. Ví dụ, ```OnActionExecuting``` được gọi trước khi action method được gọi và ```OnActionExecuted``` được gọi saui khi action method trả về kết quả.

```
using FiltersSample.Helper;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FiltersSample.Filters
{
    public class SampleActionFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            // do something before the action executes
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // do something after the action executes
        }
    }
}
```

Asynchronous filters định nghĩa một single ```OnStageExecutionAsync``` method. Method này nắm giữ một ```FilterTypeExecutionDelegate``` delegate cái mà thực thi pipeline stage của filter. Cho ví dụ, ```ActionExecutionDelegate``` gọi action method và bạn có thể thực thi code trước hoặc sau khi bạn gọi nó.

```
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FiltersSample.Filters
{
    public class SampleAsyncActionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(
            ActionExecutingContext context,
            ActionExecutionDelegate next)
        {
            // do something before the action executes
            var resultContext = await next();
            // do something after the action executes; resultContext.Result will be set
        }
    }
}
```

Bạn có thể triển khai interfacters cho nhiều giai đoạn filter trong một single class. Ví dụ, class  ```ActionFilterAttribute`` triển khai ```IActionFilter```, ```IResultFilter``` và những loại tương đương async của chúng.

# 4. Built-in filter attributes

Framework đã xây dựng sẵn một số attributes dựa trên filters cái mà bạn có thể kế thừa và tùy biến. Ví dụ, kết quả của filter bên dưới thêm mới một header tới response.

```
using Microsoft.AspNetCore.Mvc.Filters;

namespace FiltersSample.Filters
{
    public class AddHeaderAttribute : ResultFilterAttribute
    {
        private readonly string _name;
        private readonly string _value;

        public AddHeaderAttribute(string name, string value)
        {
            _name = name;
            _value = value;
        }

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            context.HttpContext.Response.Headers.Add(
                _name, new string[] { _value });
            base.OnResultExecuting(context);
        }
    }
}
```

Attributes cho phép filters cấp nhận các đối số như đã chỉ ra trong ví dụ trên. Bạn phải thêm attribute này tới controller hoặc action method và chỉ định name và value của HTTP header.
```
[AddHeader("Author", "Steve Smith @ardalis")]
public class SampleController : Controller
{
    public IActionResult Index()
    {
        return Content("Examine the headers using developer tools.");
    }

    [ShortCircuitingResourceFilter]
    public IActionResult SomeResource()
    {
        return Content("Successful access to resource - header should be set.");
    }
 }
```

Nếu bạn nhìn thấy kết quả như hình bên dưới, mọi thứ là OK.

![](https://images.viblo.asia/d08fdbd5-0c64-4827-8c76-be43db06b841.png)

Một vài filter interfaces có attributes tương ứng cái mà có thể được sử dụng như base clases cho những tùy biến implentations.

Filter attributes:

- ```ActionFilterAttribute```
- ```ExceptionFilterAttribute```
- ```ResultFilterAttribute```
- ```FormatFilterAttribute```
- ```ServiceFilterAttribute```
- ```TypeFilterAttribute```

# 5. Phạm vi và thứ tự thực thi của filter

Một filter có thể được thêm vào pipeline tại một trong ba phạm vi. Bạn có thể thêm filter tới một action method riêng biệt hoặc tới một class của controller bởi sử dụng một attribute. Hoặc bạn có thể đăng kí một filter toàn cục cho tất cả các controllers và actions. Filters được thêm bằng việc thêm nó tới collection ```MvcOptions.Filters``` trong ```ConfigureServices```:

```
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options =>
    {
        options.Filters.Add(new AddHeaderAttribute("GlobalAddHeader", 
            "Result filter added to MvcOptions.Filters")); // an instance
        options.Filters.Add(typeof(SampleActionFilter)); // by type
        options.Filters.Add(new SampleGlobalActionFilter()); // an instance
    });

    services.AddScoped<AddHeaderFilterWithDi>();
}
```

### Thứ tự thực thi mặc định

Khi có nhiều filters cho một giai đoạn cụ thể của pipeline, phạm vi sẽ xác định thứ tự mặc định của việc thực thi filter. Đễ dễ hiểu tuần tự thực thi sẽ như bên dưới:

- Trước khi code của các filters được áp dụng toàn cục
    + Trước khi code của các filters được áp dụng tới controllers<br>
          *  Trước khi code của các filters được áp dụng tới actions<br>
          *  Sau khi code của các filters được áp dụng tới actions
     + Sau khi code của các filters được áp dụng tới các controllers
- Sau khi code của các filters được áp dụng toàn cục

Các bạn có thể thấy thứ tự này khá giống với cấu trúc của các thẻ htm lồng nhau, theo nguyên tắc mở trước đóng sau. 
Bảng dưới đây là một ví dụ để hình dung thứ tự các filter methods được gọi synchronous.



| Thứ tự | Filter scope | Filter method |
| -------- | -------- | -------- |
| 1     | Global     | ```OnActionExecuting```     |
| 2     | Controller     | ```OnActionExecuting```     |
| 3     | Method     | ```OnActionExecuting```     |
| 4    | Method     | ```OnActionExecuted```     |
| 5    | Controller     | ```OnActionExecuted```     |
| 6    | Global     | ```OnActionExecuted```     |

Thứ tự này biểu thị:
- Method filter được lồng trong controller filter.
- Controller filter được lồng trong global filter.

### Ghi đè thứ tự thực thi mặc định

Bạn có thể ghi đè trình tự mặc định của việc thực thi filters bởi việc triển khai interface ```IOrderedFilter```. Interface này có thuộc tính ```Order``` cái mà có độ ưu tiên cao hơn phạm vi (scope) để xác định thứ tự thực thi filter.
Bạn có thể set giá trị cho thuộc tính Order bằng cách sử dụng tham số constructor, ví dụ:
```
[MyFilter(Name = "Product", Order=1)]
```
Chúng ta có thể hiểu đơn giản là Filter có Order càng nhỏ sẽ càng được thực thi sớm. Nếu các filters cùng Order thì tiếp đến sẽ xác định độ ưu tiên dựa trên phạm vi (scope: global, controller, action). Dưới đây là bảng thể hiện thứ tự thực thi dựa trên Order

| Thứ tự | Filter scope | ```Order``` property | Filter method |
| -------- | -------- | -------- | -------- |
| 1     | Method     | 0 |  ```OnActionExecuting```     |
| 2     | Controller     | 1 |   ```OnActionExecuting```     |
| 3     | Global     | 2 |  ```OnActionExecuting```     |
| 4    | Global     | 2 |  ```OnActionExecuted```     |
| 5    | Controller     | 1 |   ```OnActionExecuted```     |
| 6    | Method     | 0 |  ```OnActionExecuted```     |

# 6. Thảo luận
Bài viết này tôi đã lược dịch một số khái niệm chính về Filter trong ASP.NET Core. Hy vọng sẽ cung cấp cho các bạn những kiến thức cần thiết về Filter để triển khai trong ứng dụng của mình. Chúc các bạn thành công.  Các bạn có thể đọc thêm trong bài viết gốc: [Filters in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/filters?view=aspnetcore-2.0)