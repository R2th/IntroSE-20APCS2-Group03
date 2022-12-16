Mục đính chính của bất kỳ cơ chế caching nào cũng là để cải thiện hiệu suất của ứng dụng. Với một lập trình viên ASP.NET bạn có thể biết về web forms, ASP.NET MVC cũng có thể đã sử dụng Cache object để cache dữ liệu của ứng dụng. Đây thường được gọi là dữ liệu caching phía server và nó là tính năng có sẵn trong hệ framework. Mặc dù ASP.NET Core không có Cache object như vậy, nhưng bạn có thể triển khai in-memory caching khá dễ dàng. Bài biết này hướng dẫn bạn làm như thế nào.

Trước khi đi đến các phần khác bạn cần tạo một ứng dụng ASP.NET mới dựa trên template **Web Application project**. Bạn chọn như hình bên dưới:


![](https://images.viblo.asia/543c073a-d864-4f90-b4d5-9f083321ca72.png)


Tiếp đó, các bước bên dưới đề cập từng bước, từng bước một để xây dựng và test các tính năng được đề suất bởi in-momory caching.

# 1. Enable In-memory caching trong class Startup
Không giống như ASP.NET web forms và ASP.NET MVC, ASP.NET Core không có built-in **Cache Object** cái mà bạn có thể trực tiếp sử dụng bên trong **Controller**. Ở đây, in-memory caching làm việc thông qua dependency injection và bước đầu tiên là đăng ký in-memory caching service trong class **Startup**. Như vậy, mở class này và đặt code trong phương thức ```ConfigureServices()```. Chỉnh sửa phương thức ```ConfigureServices()``` như bên dưới:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc();
    services.AddMemoryCache();
}
```

Để có thể sử dụng in-memory caching trong ứng dụng, bạn cần gọi phương thức ```AddMemoryCache()``` trong service collection. Đây là cách triển khai mặc định của một in-memory cache - một ```IMemoryCache``` object - có thể inject tới controllers.

# 2. In-memory caching sử dụng dependency injection để inject cache object

Tiếp theo, mở ```HomeController``` và chỉnh sửa nó như code bên dưới:

```csharp
public class HomeController : Controller
{
    private IMemoryCache cache;

    public HomeController(IMemoryCache cache)
    {
        this.cache = cache;
    }
    ....
}
```

Như bạn có thể thấy, code trên khai báo một biến private của ```ImemoryCache```. Đây là biến được gán trong constructor. Constructor nhận tham số cache thông qua DI, tiếp đó object cache này được lưu trong biến local để sử dụng sau.

# 3. Sử dụng phương thức Set() để lưu một item trong cache
Khi bạn đã có ```IMemoryCache``` object bạn có thể đọc và ghi dữ liệu với nó. Việc thêm một entry vào cache khá là rõ ràng, dễ hiểu.
```csharp
public IActionResult Index()
{
      cache.Set<string>("timestamp", DateTime.Now.ToString());
      return View();
}
```

Code bên trên set một dữ liệu cache trong action ```Index()```.  Điều này được làm bởi việc sử dụng phương thức ```Set<T>()``` của đối tượng ```IMemoryCache```. Tham số đầu tiên của phương thức là một key để định danh cache. Tham số thứ hai là giá trị của key. Trong ví dụ này chúng ta lưu trữ một key và value là một string nhưng bạn cũng có thể lưu với các kiểu dữ liệu khác (kiểu dữ liệu có sẵn và kiểu tự xây dựng).

# 4. Sử dụng phương thức ```Get()``` để nhận một item từ cache
Sau khi bạn thêm dữ liệu vào cache, bạn mong muốn để nhận chúng ở một nơi nào đó trong ứng dụng. Bạn làm điều này bằng cách sử dụng phương thức ```Get()```. Sử dụng như code bên dưới.

```csharp
public IActionResult Show()
{
      string timestamp = cache.Get<string>("timestamp");
      return View("Show",timestamp);
}
```

Code trên nhận dữ liệu từ cache tại một action khác (```Show()```) của ```HomeController```. Phương thức ```Get()``` chỉ định kiểu của item và key của nó. Chúng ta thử hiển thị dữ liệu lấy được từ cache, ở đây nó là một timestamp.

```html
<h1>TimeStamp : @Model</h1>

<h2>@Html.ActionLink("Go back", "Index", "Home")</h2>
```

Thử mở page /Home/Show, thấy kết quả như hình:

![](https://images.viblo.asia/9ceadc9a-cc96-47ea-bcca-d90d069dc8c4.png)

# 5. Sử dụng ```TryGet()``` để kiểm tra sự tồn tại của key
Nếu bạn quan sát ví dụ trước, bạn sẽ tìm ra mọi lần bạn điều hướng tới ```/Home/Index```, một timestamp mới được gán tới cache item. Đấy là bởi vì chúng ta không đưa ra bất kỳ việc kiểm tra key đã tồn tại hay chưa trước khi gán giá trị . Có hai cách để thực hiện điều đó bên trong action ```Index()```. Bạn hãy quan sát cả hai như code bên dưới:

```csharp
//first way
if (string.IsNullOrEmpty
(cache.Get<string>("timestamp")))
{
      cache.Set<string>("timestamp", DateTime.Now.ToString());
}

//second way
if (!cache.TryGetValue<string>
("timestamp", out string timestamp))
{
        cache.Set<string>("timestamp", DateTime.Now.ToString());
}
```

Cách đầu tiên sử dụng giống với phương thức ```Get()``` bạn đã sử dụng trước đó. Tuy nhiên, lần này nó sử dụng tại khối ```if```. 

Cách thứ hai nhìn có vẻ clean hơn. Nó sử dụng phương thức ```TryGet()``` để nhận một item. Phương thức này trả về kiểu boolean . ```True``` nếu key đã tồn tại trong cache, ngược lại trả về ```False```. Ưu điểm của cách này là giá trị của cache được đưa ra một tham số ```out``` nhằm mục đích để sử dụng sau đó. Như vậy vừa có thể check sự tồn tại lại vừa lấy được giá trị trong cùng một phương thức.

# 6. Sử dụng ```GetOrCreate()``` để thêm một item nếu chưa tồn tại

Đôi khi bạn cần nhận một item đã tồn tại từ cache và nếu item đó chưa tồn tại thì bạn muốn thêm nó vào. Điều này giúp code trở nên ngắn gọn hơn. Với cùng một dòng code vừa có thể vừa lấy giá trị vừa có thể thêm mới nếu chưa tồn tại, giúp giảm bới được việc kiểm tra sự tồn tại.

```csharp
public IActionResult Show()
{
      string timestamp = cache.GetOrCreate<string>
      ("timestamp", entry => { 
    return DateTime.Now.ToString(); });
      return View("Show",timestamp);
}
```

# 7. Thiết lập thời gian hết bạn bằng thời gian tuyệt đối và thời gian không sử dụng

Trong ví dụ trước, một item cache khi được thêm vào thì được giữ lại trong cache trừ khi nó được gỡ bỏ bởi việc sử dụng phương thức ```Remove()```. Bạn cũng có thể thiết lập một mốc thời gian tuyệt đối và thời gian tương đối trên một item cache. Một thời gian tuyệt đối nghĩa là item được cache sẽ bị gỡ bỏ tại một thời điểm ngày và giờ rõ ràng. Còn thời gian tương đối ở đây là cache sẽ được gỡ bỏ sau một khoảng thời gian nhất định (không truy cập đến).

Để thiết lập thời gian hết hạn này bạn sử dụng ```MemoryCacheEntryOptions``` object. Code bên dưới là cách để thiết lập:

```csharp
MemoryCacheEntryOptions options = new MemoryCacheEntryOptions();

options.AbsoluteExpiration = DateTime.Now.AddMinutes(2);

options.SlidingExpiration = TimeSpan.FromMinutes(1);

cache.Set<string>("timestamp", DateTime.Now.ToString(), options);
```

```AbsoluteExpiration``` ở trên chỉ ra rằng, cache sẽ hết hạn sau 2 phút kể từ thời điểm hiện tại bất kể cache có được truy cập hay không. Còn ```SlidingExpiration``` sẽ quyết định cache sẽ hết hạn sau 1 phút nếu không được truy cập kể cả nó vẫn còn thời hạn của ```AbsoluteExpiration```

# 8. Có thể sử dụng callback khi item trong cache bị gỡ bỏ
Có thể trong một số thời điểm bạn muốn thông báo bất kì khi nào dữ liệu trong cache bị gỡ bỏ. Cho ví dụ, một item bị gỡ bỏ do gọi phương thức ```Remove()```, cũng có thể bị gỡ bỏ do hết hạn do thiết lập của ```AbsoluteExpiration``` hoặc ```SlidingExpiration```.
Khi đó, chúng ta cần thiết lập thêm  option ```RegisterPostEvictionCallback``` như bên dưới:

```csharp
MemoryCacheEntryOptions options = new MemoryCacheEntryOptions();

options.AbsoluteExpiration = DateTime.Now.AddMinutes(2);

options.SlidingExpiration = TimeSpan.FromMinutes(1);

// Callback when cached item is removed
options.RegisterPostEvictionCallback(MyCallback, this);

cache.Set<string>("timestamp", DateTime.Now.ToString(), options);
```

Trong ví dụ trên, tên function callback là ```MyCallback```. Tham số thứ 2 là một state object, bạn sẽ truyền nó đến functon call back. Ở đây chúng ta truyền instance của ```HomeController```.

Function ```MyCallback``` trông như bên dưới:

```csharp
private static void MyCallback(object key, object value,
EvictionReason reason, object state)
{
    var message = $"Cache entry was removed : {reason}";
    ((HomeController)state).cache.Set("callbackMessage", message);
}
```

Quan sát code này cẩn thận. ```MyCallback()``` là một private static function bên trong ```HomeController```. Nó có 4 tham số. Hai tham số đầu tiên là key và value của item mà vừa được xóa khỏi cache. Tham số thứ ba chỉ ra lý do tại sao item bị gỡ bỏ. ```EvictionReason``` là một enumeration và liệt kê những lý do khác nhau như: **Expired**, **Removed** và **Replaced**.

Bên trong callback chúng ta chỉ đơn giản lưu lại nội dung message nói về nguyên nhân bị gỡ bỏ. Message này cũng được lưu trong cache.

Tiếp theo, chúng ta sẽ hiển thị message này trên UI như code bên dưới:

Action ```Show()```:
```csharp
public IActionResult Show()
{
      string timestamp = cache.Get<string>("timestamp");
      ViewData["callbackMessage"] = 
        cache.Get<string>("callbackMessage");
      return View("Show",timestamp);
}
```

html:
```html
<h1>TimeStamp : @Model</h1>

<h3>@ViewData["callbackMessage"]</h3>

<h2>@Html.ActionLink("Go back", "Index", "Home")</h2>
```

Chạy ứng dụng: 

![](https://images.viblo.asia/52ebcb42-2bfa-407d-9247-5299c4a822e4.png)

# 9. Thiết lập độ ưu tiên cho item được cache
Cũng như bạn có thể set chính sách hết hạn của cache, bạn cũng có thể thiết lập độ ưu tiên cho nó. Nếu server có một bộ nhớ hạn chế thì độ ưu tiên này sẽ quyết định những item sẽ bị xóa để lấy lại bộ nhớ. Để set độ ưu tiên bạn sử dụng ```MemoryCacheEntryOptions``` một lần nữa.

```csharp
MemoryCacheEntryOptions options = new MemoryCacheEntryOptions();

options.Priority = CacheItemPriority.Normal;

cache.Set<string>("timestamp", DateTime.Now.ToString(), options);
```

```CacheItemPriority``` là một enum, nó có 4 mức độ ưu tiên bao gồm:  **Low**, **Normal**, **High** và **NeverRemove**
Dựa vào các mức độ ưu tiên trên thì cache sẽ bị xóa từ item có độ ưu tiên thấp đến cao, riêng ```NeverRemove``` thì sẽ không bị xóa với bất kỳ lý do gì.

# 10. Có thể thiết lập một dependency giữa nhiều item cache

Bạn cũng có thể thiết lập một dependency giữa các item cache điều này nhằm mục đích khi một item bị xóa thì tất cả các item phụ thuộc cũng bị xóa theo nó. Để xem nó hoạt động như thế nào, chỉnh sửa action ```Index()``` như code bên dưới:

```csharp
public IActionResult Index()
{
    var cts = new CancellationTokenSource();
    cache.Set("cts", cts);

    MemoryCacheEntryOptions options = new MemoryCacheEntryOptions();
    options.AddExpirationToken(new CancellationChangeToken(cts.Token));
    options.RegisterPostEvictionCallback(MyCallback, this);
    cache.Set<string>("timestamp", DateTime.Now.ToString(), options);

    cache.Set<string>("key1", "Hello World!", new CancellationChangeToken(cts.Token));
    cache.Set<string>("key2", "Hello Universe!", new CancellationChangeToken(cts.Token));

    return View();
}
```

Code bắt đầu bằng việc tạo một object ```CancellationTokenSource``` và object được lưu trữ như một item cache độc lập ```cts```. Tiếp theo ```MemoryCacheEntryOptions``` được tạo như trước đây. Sau đó, phương thức ```AddExpirationToken()``` được gọi để chỉ định một expiration token. Nếu token là active thì item vẫn ở trong cache còn nếu token bị hủy thì item cũng sẽ bị gỡ bỏ khỏi cache. Sau khi item bị gỡ bỏ từ cache thì ```MyCallback``` sẽ được gọi như đã nói ở phần trước. Tiếp theo code tạo thêm 2 item (key1 và key2). Trong khi tạo 2 item này thì tham số thứ 3 được đưa vào là một ```CancellationChangeToken``` được tạo ở trước đó.

Có nghĩa là chúng ta có 3 key: timestamp là key chính, key1 và key2 là phụ thuộc vào ```timestamp```. Khi ```timestamp``` bị xóa thì ```key1``` và ```key2``` cũng bị xóa theo. Bạn có thể làm điều đó như code bên dưới:

```csharp
public IActionResult Remove()
{
    CancellationTokenSource cts = 
cache.Get<CancellationTokenSource>("cts");
    cts.Cancel();
    return RedirectToAction("Show");
}
```

Để test kết quả, các bạn chạy lần lượt các url sau: ```/Home/Index```, ```/Home/Show```, ```/Home/Remove```

![](https://images.viblo.asia/1c4a76d3-8717-47d1-9a95-ff1a0ea51153.png)

# 11. Kết
Việc sử dụng cache luôn cần thiết đối với bất kì ứng dụng web nào, cũng như ngôn ngữ nào. Vì vậy, với những hướng dẫn chi tiết và rõ ràng trong bài viết hy vọng sẽ giúp các bạn mới bắt đầu làm việc với cache nhanh chóng nắm bắt. Cảm ơn các bạn đã theo dõi bài viết.

**Bài viết được dịch từ nguồn:**

[10 Things To Know About In-Memory Caching In ASP.NET Core](http://www.binaryintellect.net/articles/a7d9edfd-1f86-45f8-a668-64cc86d8e248.aspx)