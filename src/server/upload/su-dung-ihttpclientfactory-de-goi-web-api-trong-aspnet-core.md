Nếu bạn đã làm việc với ASP.NET Core Web API trước đây, rất có thể các bạn đã sử dụng ```HttpClient``` để gọi chúng. Mặc dù việc khởi tạo trực tiếp ```HttpClient``` là cách sử dụng phổ biến, nhưng có một cách khác tốt hơn để thay thế. Thay vì khởi tạo ```HttpClient```, bạn sử dụng ```IHttpClientFactory``` để lấy bản sao của ```HttpClient```.Do đó, đối tượng ```HttpClient``` thu được có thể sử dụng để gọi Web API. Trong bài biết này tôi sẽ thảo luận 3 cách để lấy instance của ```HttpClient```  sử dụng ```IHttpClientFactory```.

Những ví dụ được thảo luận trong bài viết giả sử bạn có một Web API như bên dưới:

```csharp
[Route("api/[controller]")]
public class ValuesController : Controller
{
    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "Hello World!", 
                              "Hello Galaxy!", 
                              "Hello Universe!" };
    }
}
```

```ValuesController``` (một Web API) chứa action ```Get()```, hàm này trả về một mảng string - **Hello World!**, **Hello Galazy!**, và **Hello Universe!**
Web API này được triệu gọi ở ```HomeController```. Như vậy, bạn sẽ cần đối tượng ```HttpClient``` để hoàn thành nhiệm vụ của mình.

Hãy xem những cách khác nhau để lấy được một ```HttpClient``` instance với việc sử dụng ```IHttpClientFactory```.

# Kĩ thuật cơ bản để lấy được ```HttpClient```
Trong kĩ thuật này bạn sử dụng phương thức ```AddHttpClient()``` với ```IServiceCollection``` bên trong phương thức  ```ConfigureServices()``` như code bên dưới:
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services.AddControllersWithViews();
    services.AddHttpClient();
}
```

Tiếp theo bạn có thể inject ```IHttpClientFactory``` vào ```HomeController```:
```csharp
private IHttpClientFactory factory;

public HomeController(IHttpClientFactory factory)
{
  this.factory = factory;
}
```

Tiếp đến, bạn có thể lấy được instance của ```HttpClient``` như thế này:
```csharp
public IActionResult Index()
{
  HttpClient client = factory.CreateClient();
  
  client.BaseAddress = new Uri("https://localhost:44393");
  var response = client.GetAsync("/api/values").Result;
  string jsonData = response.Content.ReadAsStringAsync().Result;
  List<string> data = JsonSerializer.Deserialize<List<string>>(jsonData);
  
  return View(data);
}
```

Chú ý rằng làm thế nào phương thức ```CreateClient()``` của ```IHttpClientFactory``` được sử dụng để lấy được instance của ```HttpClient``` ? Làm thế nào để tạo ra instance đó là công việc của ```CreateClient()```. Khi đã lấy được rồi, bạn có thể cấu hình nó theo yêu cầu của bạn. Ví dụ, ở đây bạn thiết lập thuộc tính ```BaseAddress``` để tạo ra base address của Web API. Tiếp đó bạn xử lý để gọi ```GetAsync()``` chính là triệu gọi action ```Get()``` của Web API.

Dữ liệu JSON được trả về từ action ```Get()``` được deserialized sử dụng class ```JsonSerializer``` của ```System.Text.Json``` . Tiếp theo dữ liệu được gửi đến view ```Index``` trên trang.

![](https://images.viblo.asia/8aa2aaea-46a8-4ef5-b6c1-2fa09ebebf50.png)

# Lấy được từ cấu hình trước và tên Client
Đôi khi bạn cần các instances của ```HttpClient``` mỗi cái có một cấu hình riêng biệt. Trong khi gọi phương thức ```AddHttpClient()``` bạn cũng có thể chỉ định thông tin cấu hình và tên như code dưới đây:

```csharp
services.AddHttpClient("myclient", client =>
{
    client.BaseAddress = new Uri("https://localhost:44393");
});
```

Ở đây, bạn đã tạo một client có tên là '**myclient**' có cấu hình nhất định (ở trường hợp này là ```BaseAddress```). Bất kì khi nào bạn cần instance này bạn có thể nhận nó giống như sau:

```csharp
public IActionResult Index()
{
  HttpClient client = factory.CreateClient("myclient");
  
  var response = client.GetAsync("/api/values").Result;
  string jsonData = response.Content.ReadAsStringAsync().Result;
  List<string> data = JsonSerializer.Deserialize<List<string>>(jsonData);
   
  return View(client.GetData());
}
```

Chú ý rằng phương thức ```CreateClient()``` bây giờ chỉ định tên của client. Khi đó '**myclient**' đã có ```BaseAddress``` được cấu hình ở class **Startup**, code trên không set thuộc tính ```BaseAddress``` nữa và xử lý gọi phương thức ```GetAsync()```.

# Lấy được một typed client
Một typed client là một đóng gói cấu hình được yêu cầu và Web API gọi thông qua một tập các phương thức. Class bên dưới triển khai một typed client:

```csharp
public class MyTypedClient
{
    public HttpClient Client { get; set; }

    public MyTypedClient(HttpClient client)
    {
        client.BaseAddress = new Uri("https://localhost:44393");
        this.Client = client;
    }
    
    public List<string> GetData()
    {
        var response = this.Client.GetAsync("/api/values").Result;
        string jsonData = response.Content.ReadAsStringAsync().Result;
        List<string> data = JsonSerializer.Deserialize<List<string>>(jsonData);
        
        return data;
    }
}
```

Như bạn có thể thấy, class ```MyTypedClient``` có một thuộc tính public được đặt tên là Client, nó là type của ```HttpClient``` . Thuộc tính này được gán một giá trị trong constructor thông qua dependency injection. Phương thức ```GetData()``` thực hiện tất cả cấu hình gọi Web API và trả về dữ liệu được yêu cầu tới client.

Do đó, các phần khác của ứng dụng không cần biết API được gọi như thế nào hoặc cấu hình nào là cần thiết. Các phần khác của hệ thống chỉ cần sử dụng đối tượng ```MyTypedClient``` để hoàn thành công việc của mình.

Khi ```MyTypedClient``` sẵn sàng đăng kí trong ```ConfigureServices()``` như code bên dưới:
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services.AddControllersWithViews();
    services.AddHttpClient<MyTypedClient>();
}
```

Để inject đối tượng ```MyTypedClient``` trong ```HomeController``` bạn sẽ viết như sau:
```csharp
private MyTypedClient client;

public HomeController(MyTypedClient client)
{
    this.client = client;
}
```

Tiếp theo, bạn có thể sử dụng đối tượng typed client trong action ```Index()``` như bên dưới:
```csharp
public IActionResult Index()
{
  return View(client.GetData());
}
```
# Tổng kết
Bài viết đã trình bày 3 cách để tạo một instance của ```HttpClient``` thông qua ```IHttpClientFactory```. ```HttpClient``` là phổ biến và dễ sử dụng, tuy nhiên nó có những vấn đề mà chúng ta cần cân nhắc khi sử dụng. Về ```IHttpClientFactory``` cho ta thêm nhiều lựa chọn cấu hình sử dụng và tính năng, trong khi vẫn đảm bảo thay thế những gì ```HttpClient``` có thể làm. Các bạn có thể tìm hiểu thêm ưu nhược điểm của chúng ở bài viết [Use HttpClientFactory to implement resilient HTTP requests](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests). Hy vọng mang đến cho các bạn những điều bổ ích.

**Bài viết được dịch từ nguồn:**
http://www.binaryintellect.net/articles/1ec182b1-6d47-42da-92b6-c38279b28b20.aspx