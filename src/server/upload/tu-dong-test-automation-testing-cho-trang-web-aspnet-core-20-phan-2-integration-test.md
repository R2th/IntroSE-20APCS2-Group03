![](http://www.dotnetcurry.com/images/aspnet-core/integration/testing-pyramid1.png)

Đây là bài thứ thứ hai trong một loạt các bài viết về test ứng dụng ASP.NET Core.

Trong phần trước, chúng ta đã thảo luận về một chiến lược test liên quan đến test unit, test integration và test end-to-end. Chúng ta đã thảo luận cách Unit Test đưa đến một thiết kế tốt hơn và cho phép bạn code mà không phải chạy debug.

Chúng ta đã thêm các bài Unit Test vào một dự án làm bằng ASP.NET Core cung cấp một API rất đơn giản để quản lý các bài đăng trên blog.

Trong bài viết này, chúng ta sẽ sử dụng cùng một dự án ASP.NET Core đã xây dựng ở phần 1 và xem xét sâu hơn về Integration Tests trong ngữ cảnh của các ứng dụng ASP.NET Core, xử lý các yếu tố như đọc ghi Database, Authentication (login) hoặc Anti-Forgery (bảo mật).

# Tại sao cần phải test tích hợp?

Unit Test tìm cách cách ly các đoạn code cần test, bằng việc tạo ra class interface, nhưng nhiều phần code của ứng dụng vẫn rất khó test bằng Unit Test ví dụ như cơ sở dữ liệu, thư viện bên thứ 3, liên quan đến mạng...

Bạn sẽ không thể lường trước được các lỗi về Database nếu bạn cứ dùng mock để giả lập cở sở dữ liệu trong RAM. Đến khi dùng đến DB thật thì mới gặp lỗi. Ví dụ lỗi store procedure, tranh trấp transaction trong SQL...

Rõ ràng Unit Test không hề là liều thuốc tiên cho toàn bộ Code code của bạn.

Bây giờ chúng ta sẽ bắt đầu học viết các bài test tích hợp, mà sẽ:

* Khởi động ứng dụng bằng cách sử dụng một TestHost giả lập https://www.nuget.org/packages/Microsoft.AspNetCore.TestHost (thay vì một máy chủ web thực như Kestrel hoặc IIS Express)
* Khởi tạo cơ sở dữ liệu được sử dụng bởi Entity Framework bằng cách giả lập một đối tượng cơ sở dữ liệu InMemory (nằm trong bộ nhớ RAM) có thể dễ dàng khởi tạo và nhập lại dữ liệu một cách an toàn.
* Gửi request HTTP thực bằng cách sử dụng class HttpClient tiêu chuẩn
* Tiếp tục sử dụng xUnit làm framework test, mọi kiểm thử tích hợp được viết và chạy dưới dạng bài test xUnit.


Hãy bắt tạo thêm một dự án test xUnit mới có tên là `BlogPlayground.IntegrationTest` vào solution. Sau khi được thêm vào, hãy đảm bảo thêm một reference đến project `BlogPlayground` vì các bài test tích hợp sẽ cần phải sử dụng class Startup và context Entity Framework.

Còn một điều nữa cần làm trước khi chúng ta sẵn sàng viết bài test đầu tiên. Thêm gói NuGet vào project vừa tạo: `Microsoft.AspNetCore.TestHost`

# Viết Test tích hợp cho các ứng dụng ASP.NET Core với TestHost

Đầu tiên là viết test truy cập trang index trỏ đến url "/" sẽ sử dụng TestHost để test như sau:

```
public class HomeTest
{
    private readonly TestServer _server;
    private readonly HttpClient _client;

    public IndexTest()
    {
        _server = new TestServer(WebHost.CreateDefaultBuilder()
           .UseStartup<Startup>()
           .UseEnvironment("Development"));
        _client = _server.CreateClient();    }

    public void Dispose()
    {
        _client.Dispose();
        _server.Dispose();
    }

    [Fact]
    public async Task Index_Get_ReturnsIndexHtmlPage()
    {
        // Act
        var response = await _client.GetAsync("/");

        // Assert
        response.EnsureSuccessStatusCode();        
        var responseString = await response.Content.ReadAsStringAsync();
        Assert.Contains("<title>Home Page - BlogPlayground</title>", responseString);
    }
}
```
Bạn có thể chạy nó như cách chạy Unit Test ở bài trước, vì chúng ta đang sử dụng cùng một framework test xUnit. Hoặc chạy nó từ Visual Studio hoặc từ dòng lệnh `dotnet test`.

Tuy nhiên, test vừa viết chạy sẽ fail vì nó gặp phải một vài vấn đề!

Vấn đề đầu tiên là các views sẽ không được tìm thấy vì thư mục Root được TestHost sử dụng lúc này là `BlogPlayground.IntegrationTest`. Chúng ta cần trỏ TestHost vào project `BlogPlayground`. Cách giải quyết như sau:

```
public IndexTest()
{
    var integrationTestsPath = PlatformServices.Default.Application.ApplicationBasePath;
    var applicationPath = Path.GetFullPath(Path.Combine(integrationTestsPath, "../../../../BlogPlayground"));

    _server = new TestServer(WebHost.CreateDefaultBuilder()
       .UseStartup<Startup>()
       .UseContentRoot(applicationPath)
       .UseEnvironment("Development"));
    _client = _server.CreateClient();
}
```
Sau khi bạn giải quyết được vấn đề về tìm thấy views, bạn sẽ gặp phải vấn đề biên dịch các views đó. Để giải quyết, cần phải cập nhật file `BlogPlayground.IntegrationTest.csproj` thêm thuộc tính `PreserveCompilationContext` và một mục Target mới sẽ sao chép file `.deps.json` cần thiết như trong đoạn Code sau:

```
<PropertyGroup>
  <TargetFramework>netcoreapp2.0</TargetFramework>

  <IsPackable>false</IsPackable>
  <PreserveCompilationContext>true</PreserveCompilationContext>
</PropertyGroup>
…
<!--
  Work around https://github.com/NuGet/Home/issues/4412.
  MVC uses DependencyContext.Load() which looks next to a.dll
  for a.deps.json. Information isn't available elsewhere.
  Need the.deps.json file for all web site applications.
-->
<Target Name="CopyDepsFiles" AfterTargets="Build" Condition="'$(TargetFramework)'!=''">
  <ItemGroup>
    <DepsFilePaths Include="$([System.IO.Path]::ChangeExtension('%(_ResolvedProjectReferencePaths.FullPath)', '.deps.json'))" />
  </ItemGroup>
  <Copy SourceFiles="%(DepsFilePaths.FullPath)" DestinationFolder="$(OutputPath)" Condition="Exists('%(DepsFilePaths.FullPath)')" />
</Target>
```
Khi bạn đã hoàn tất các thay đổi này, bạn có thể tiếp tục và chạy lại test. Bạn đã hoàn thành bài test tích hợp đầu tiên.

![](http://www.dotnetcurry.com/images/aspnet-core/integration/first-integration-test-aspnet-core.png)

Hình 2, chạy bài test tích hợp đầu tiên

# Xử lý test DB và Entity Framework

Chúng ta đã hoàn thành bài test tích hợp đầu tiên bằng cách kiểm tra rằng web app của ta có thể khởi động lên và trả về một trang index html. Tuy nhiên, nếu chúng ta viết các bài test liên quan đến bài viết Article, đối tượng dbContext sẽ sử dụng một SQL Server DB thực sự.

Điều này gây khó khăn vì mỗi lần test là chúng ta sẽ thêm sửa xóa DB, có thể là cần xóa toàn bộ DB và tạo lại dữ liệu chuẩn để test (trùng với các case test). Chúng ta cần một cách nhanh chóng và dễ dàng để start một cơ sở dữ liệu cho mỗi bài test và xóa nó đi sau đó!

May mắn cho chúng ta, khi sử dụng Entity Framework, bây giờ đã có một tùy chọn để giả lập một DB trong bộ nhớ RAM để có thể dễ dàng bật lên và xóa đi sau mỗi lần test (và cũng có thể khởi tạo giá trị ban đầu cho DB).

Bây giờ, `ConfigureServices` của class `Startup.cs` trông như sau:

```
services.AddDbContext<ApplicationDbContext>(options =>
  options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
```
Thay thế chữ `UseSqlServer` bằng chữ `UseInMemoryDatabase`:

```
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("blogplayground_test_db"));
```
Vì chúng ta không muốn thay đổi vĩnh viễn web app, chúng ta chỉ muốn thay thế cơ sở dữ liệu cho bài test mà không ảnh hưởng đến việc khởi động ứng dụng bình thường. Nên ở đây ta sẽ đặt tên DB là `blogplayground_test_db`. Sau đó chúng ta có thể di chuyển Code khởi tạo vào một hàm ảo trong class Startup:

```
public void ConfigureServices(IServiceCollection services)
{    
    ConfigureDatabase(services);
    // Same configuration as before except for services.AddDbContext
    …
}

public virtual void ConfigureDatabase(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
}
```
Sau đó tạo một class mới tên là `TestStartup` trong dự án `IntegrationTest`, và ghi đè hàm đó bằng cách thiết lập một cơ sở dữ liệu trong bộ nhớ:

```
public class TestStartup : Startup
{
    public TestStartup(IConfiguration configuration) : base(configuration)
    {
    }

    public override void ConfigureDatabase(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseInMemoryDatabase("blogplayground_test_db"));

    }
}
```
Cuối cùng thay đổi class `IndexTest` để sử dụng class `Startup` mới:

```
_server = new TestServer(WebHost.CreateDefaultBuilder()
   .UseStartup<TestStartup>()
   .UseContentRoot(applicationPath)
   .UseEnvironment("Development"));
_client = _server.CreateClient();
```
Bây giờ các bài test tích hợp sẽ luôn sử dụng cơ sở dữ liệu trong bộ nhớ do Entity Framework Core cung cấp mà chúng ta có thể khởi tạo một cách an toàn ở mọi lần test.

Lưu ý: Theo các tài liệu chính thức, cơ sở dữ liệu trong bộ nhớ không phải là một cơ sở dữ liệu quan hệ đầy đủ và một số tính năng sẽ không có sẵn như test các ràng buộc toàn vẹn reference khi lưu các bản ghi mới.

Nếu bạn không thích các hạn chế của DB Entity dạng InMemory như vừa nói, và vẫn muốn sử dụng DB trong bộ nhớ với các bài test tích hợp, bạn có thể thử chế độ trong bộ nhớ RAM của SQLite. Nếu bạn làm như vậy, hãy lưu ý rằng bạn sẽ cần phải tự mở kết nối SQL và đảm bảo rằng bạn không đóng nó cho đến khi kết thúc test.Hãy đọc qua tài liệu chuẩn chính thức này https://docs.microsoft.com/en-us/ef/core/miscellaneous/testing/sqlite để biết thêm thông tin.

# Tạo cơ sở dữ liệu với người dùng được nhập trước và bài đăng trên blog

Cho đến thời điểm này, chúng ta đã tạo một bài test tích hợp sử dụng DB trong bộ nhớ được khởi tạo cho mỗi bài test. Sẽ rất thú vị khi khởi tạo DB đó cùng với một số dữ liệu nhập sẵn trước để có thể bắt đầu bài test luôn.

Chúng ta có thể thêm một cầu nối vào class Startup bằng cách làm cho hàm Configure của nó chuyển thành `virtual`, để chúng ta có thể ghi đè nó trong class `TestStartup`. Sau đó, chúng ta chỉ cần thêm đoạn code khởi tạo cơ sở dữ liệu vào hàm `override` ở `TestStartup`.

Hãy bắt đầu bằng cách tạo một thư mục mới có tên là `Data` bên trong project test tích hợp và thêm một file mới `PredefinedData.cs`, ​​nơi chúng ta sẽ định nghĩa các bài viết và danh mục người dùng nhập sẵn đợi các bài test:

```
public static class PredefinedData
{
    public static string Password = @"!Covfefe123";

    public static ApplicationUser[] Profiles = new[] {
        new ApplicationUser { Email = "tester@test.com", UserName = " tester@test.com", FullName = "Tester" },
        new ApplicationUser { Email = "author@test.com", UserName = " author@test.com", FullName = "Tester" }
    };

    public static Article[] Articles = new[] {
        new Article { ArticleId = 111, Title = "Test Article 1", Abstract = "Abstract 1", Contents = "Contents 1", CreatedDate = DateTime.Now.Subtract(TimeSpan.FromMinutes(60)) },
        new Article { ArticleId = 222, Title = "Test Article 2", Abstract = "Abstract 2", Contents = "Contents 2", CreatedDate = DateTime.Now }
    };
}
```
Tiếp theo chúng ta hãy thêm một class mới có tên `DatabaseSeeder` bên trong cùng một thư mục. Đây là nơi chúng ta sẽ thêm Code EF thực sự chèn dữ liệu được nhập trước vào cơ sở dữ liệu:

```
public class DatabaseSeeder
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public DatabaseSeeder(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task Seed()
    {
        // Add all the predefined profiles using the predefined password
        foreach (var profile in PredefinedData.Profiles)
        {
            await _userManager.CreateAsync(profile, PredefinedData.Password);
            // Set the AuthorId navigation property
            if (profile.Email == "author@test.com")
            {
                PredefinedData.Articles.ToList().ForEach(a => a.AuthorId = profile.Id);
            }           
        }

        // Add all the predefined articles
        _context.Article.AddRange(PredefinedData.Articles);
        _context.SaveChanges();
    }
}
```
Cuối cùng, chúng ta hãy sửa `Startup.Configure` thành hàm `virtual` để có thể ghi đè trong `TestStartup` với định nghĩa như sau:

```
public override void ConfigureDatabase(IServiceCollection services)
{
    // Replace default database connection with In-Memory database
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseInMemoryDatabase("blogplayground_test_db"));

    // Register the database seeder
    services.AddTransient<DatabaseSeeder>();

}

public override void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    // Perform all the configuration in the base class
    base.Configure(app, env, loggerFactory);

    // Now seed the database
    using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
    {
        var seeder = serviceScope.ServiceProvider.GetService<DatabaseSeeder>();
        seeder.Seed();
    }
}
```
Với những thay đổi này, chúng ta đã sẵn sàng để bắt đầu viết các bài test để kiểm tra các Bài viết.

# Viết các bài test bằng cách sử dụng cơ sở dữ liệu trong bộ nhớ được tải sẵn

Hãy bắt đầu bằng cách thêm một test tích hợp mới sẽ gọi đến hàm Index của `ArticleController`. Vì controller trả về một view, và view Index hiện tại rất khó để kiểm tra html trả về có chứa đủ các bài viết từ cơ sở dữ liệu hay không.

Chúng ta cần sửa html ở danh sách bài viết được hiển thị của Index view, để khi test có thể kiểm tra xem response có Code thành công hay không. Và chuỗi html có chứa thuộc tính data-articleid cho mọi bài viết được nhập trước hay không.

Cập nhật file `Views/Articles/Index.cshtml` để danh sách bài viết được hiển thị dưới dạng như sau:

```
<ul class="col-md-8 list-unstyled article-list">
@foreach (var article in Model)
{
    <li data-articleid="@article.ArticleId">
        @Html.Partial("_ArticleSummary", article)
    </li>
}
</ul>
```
Bây giờ chúng ta có thể thêm một class test tích hợp mới vào dự án với code test sau đây:

```
public class ArticlesTest
{
    private readonly TestServer _server;
    private readonly HttpClient _client;

    public ArticlesTest()
    {
        var integrationTestsPath = PlatformServices.Default.Application.ApplicationBasePath;
        var applicationPath = Path.GetFullPath(Path.Combine(integrationTestsPath, "../../../../BlogPlayground"));

        _server = new TestServer(WebHost.CreateDefaultBuilder()
           .UseStartup<TestStartup>()
           .UseContentRoot(applicationPath)
           .UseEnvironment("Development"));
        _client = _server.CreateClient();
    }

    public void Dispose()
    {
        _client.Dispose();
        _server.Dispose();
    }

    [Fact]
    public async Task Index_Get_ReturnsIndexHtmlPage_ListingEveryArticle()
    {
        // Act
        var response = await _client.GetAsync("/Articles");

        // Assert
        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        foreach (var article in PredefinedData.Articles)
        {
            Assert.Contains($"<li data-articleid=\"{ article.ArticleId }\">", responseString);
        }
    }
}
```
Chạy test và bạn sẽ thấy một kết quả màu xanh, tức là code và code test hoạt động quá OK!

![](http://www.dotnetcurry.com/images/aspnet-core/integration/running-articles-index-integration-test.png)

Hình 3, Chạy bài test để kiếm tra danh sách bài viết ở trang Index

Trước khi chúng ta tiếp tục và thử viết các bài test cho các hàm POST/ DELETE, chúng ta hãy cấu trúc lại các test tích hợp một chút vì chúng ta đang lặp lại Code khởi tạo và dọn dẹp trên cả `HomeTest` và `ArticlesTest`. chúng ta có thể tạo class `TestFixture` cơ bản như sau:

```
public class TestFixture: IDisposable
{
    protected readonly TestServer _server;
    protected readonly HttpClient _client;

    public TestFixture()
    {
        var integrationTestsPath = PlatformServices.Default.Application.ApplicationBasePath;
        var applicationPath = Path.GetFullPath(Path.Combine(integrationTestsPath, "../../../../BlogPlayground"));

        _server = new TestServer(WebHost.CreateDefaultBuilder()
           .UseStartup<TestStartup>()
           .UseContentRoot(applicationPath)
           .UseEnvironment("Development"));
        _client = _server.CreateClient();
    }

    public void Dispose()
    {
        _client.Dispose();
        _server.Dispose();
    }        
}
```
Sau đó cập nhật các bài test để kế thừa từ nó:

```
public class ArticlesTest: TestFixture
{    
    [Fact]
    public async Task Index_Get_ReturnsIndexHtmlPage_ListingEveryArticle()
    {
        // Act
        var response = await _client.GetAsync("/Articles");

        // Assert
        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        foreach (var article in PredefinedData.Articles)
        {
            Assert.Contains($"<li data-articleid=\"{ article.ArticleId }\">", responseString);
        }
    }
}
```
Bây giờ chúng ta đã sẵn sàng để giải quyết các vấn đề viết các bài test tích hợp cho các hàm request một Code chống giả mạo User (anti-forgery) và một người dùng đã xác thực. Nếu không giả lập được 2 tham số này, bạn sẽ không thể gửi request POST đến server để tạo hoặc xóa bài viết vì các hàm này đã được gắn với thuộc tính [Authorize] và [ValidateAntiForgeryToken] (Nghĩa là người dùng chưa đăng nhập chưa có cookie session trên server sẽ không được phép thêm sửa xóa DB).

# Xử lý xác thực và chống giả mạo
Mục tiêu tiếp theo là hàm POST `Create`. Chúng ta viết một bài test tương tự như bài test trước, trong đó chúng ta POST một form được Code hóa url với các thuộc tính của bài viết mới như sau:

```
[Fact]
public async Task Create_Post_RedirectsToList_AfterCreatingArticle()
{
    // Arrange
    var formData = new Dictionary<string, string>
    {
        { "Title", "mock title" },
        { "Abstract", "mock abstract" },
        { "Contents", "mock contents" }
    };

    // Act
    var response = await _client.PostAsync("/Articles/Create", new FormUrlEncodedContent(formData));

    // Assert
    Assert.Equal(HttpStatusCode.Found, response.StatusCode);
    Assert.Equal("/Articles", response.Headers.Location.ToString());
}
```
Đoạn Code này tạm gọi là đủ trong trường hợp hàm POST không request người dùng đăng nhập.

Nhưng vì chúng ta đang sử dụng thuộc tính [ValidateAntiForgeryToken] và [Authorize] nên test ở trên sẽ không thành công cho đến khi chúng ta có thể bao gồm các thông tin sau trong request:

* Cookie xác thực hợp lệ (Cookie ở client trùng với Cookie trên server là user đã đăng nhập thành công)
* Một cookie và token Anti-Forgery hợp lệ trong form (Chống giả mạo bằng js các thông tin trên form gửi về server)

Có một số chiến lược có thể làm theo để cho phép test bên trên chạy thành công. Tôi thường hay làm như sau:

* Gửi một GET request đến url /Account/Login để lấy ra cookie anti-forgery và token chống giả mạo từ response trả về.
* Tiếp theo là gửi một POST request đến url /Account/Login bằng một trong các user được định nghĩa trước, và lấy ra các cookie xác thực từ response.

Khi dữ liệu xác thực authentication và anti-forgery data chống giả mạo từ response đã được lấy ra, chúng ta sẽ đưa nó vào mọi request trong các bài test để tránh failed.

Hãy bắt đầu bằng cách lấy ra cookie và token giả mạo bằng cách sử dụng các hàm mới được thêm vào class `TestFixture`. Code sau sử dụng các giá trị mặc định của trường form cookie và token chống giả mạo. Nếu bạn đã thay đổi chúng trong `class Startup` với `services.AddAntiforgery (opts =>…)`, bạn sẽ cần phải chắc chắn rằng bạn sử dụng đúng tên ở đây:

```
protected SetCookieHeaderValue _antiforgeryCookie;
protected string _antiforgeryToken;

protected static Regex AntiforgeryFormFieldRegex = new Regex(@"\<input name=""__RequestVerificationToken"" type=""hidden"" value=""([^""]+)"" \/\>");

protected async Task<string> EnsureAntiforgeryToken()
{
    if (_antiforgeryToken != null) return _antiforgeryToken;

    var response = await _client.GetAsync("/Account/Login");
    response.EnsureSuccessStatusCode();
    if (response.Headers.TryGetValues("Set-Cookie", out IEnumerable<string> values))
    {
        _antiforgeryCookie = SetCookieHeaderValue.ParseList(values.ToList()).SingleOrDefault(c => c.Name.StartsWith(".AspNetCore.AntiForgery.", StringComparison.InvariantCultureIgnoreCase));
    }
    Assert.NotNull(_antiforgeryCookie);
    _client.DefaultRequestHeaders.Add("Cookie", new CookieHeaderValue(_antiforgeryCookie.Name, _antiforgeryCookie.Value).ToString());

    var responseHtml = await response.Content.ReadAsStringAsync();
    var match = AntiforgeryFormFieldRegex.Match(responseHtml);
    _antiforgeryToken = match.Success ? match.Groups[1].Captures[0].Value : null;
    Assert.NotNull(_antiforgeryToken);

    return _antiforgeryToken;
}
```
Code này gửi request GET đến /Account/Login và sau đó lấy ra cả anti-forgery cookie từ header response và token Code được nhúng dưới dạng form trong html response.

Lưu ý cách chúng ta gọi `_client.DefaultRequestHeaders.Add (…)` để anti-forgery cookie được tự động thêm vào bất kỳ request tiếp theo nào (token cần phải được thêm thủ công dạng một data trong form).

Bây giờ chúng ta có thể viết một hàm tương tự để kiểm tra chúng ta đã đăng nhập với một người dùng định nghĩa trước trong DB và tóm lấy cookie xác thực từ response. Chúng ta sẽ phải sử dụng data lấy được bao gồm cookie và token chống giả mạo với mọi request cần test, vì  hàm nào trong Controller cũng sử dụng thuộc tính [ValidateAntiForgery].

```
protected SetCookieHeaderValue _authenticationCookie;

protected async Task<Dictionary<string, string>> EnsureAntiforgeryTokenForm(Dictionary<string, string> formData = null)
{
    if (formData == null) formData = new Dictionary<string, string>();

    formData.Add("__RequestVerificationToken", await EnsureAntiforgeryToken());
    return formData;
}

public async Task EnsureAuthenticationCookie()
{
    if (_authenticationCookie != null) return;

    var formData = await EnsureAntiforgeryTokenForm(new Dictionary<string, string>
    {
        { "Email", PredefinedData.Profiles[0].Email },
        { "Password", PredefinedData.Password }
    });
    var response = await _client.PostAsync("/Account/Login", new FormUrlEncodedContent(formData));
    Assert.Equal(HttpStatusCode.Redirect, response.StatusCode);

    if (response.Headers.TryGetValues("Set-Cookie", out IEnumerable<string> values))
    {
        _authenticationCookie = SetCookieHeaderValue.ParseList(values.ToList()).SingleOrDefault(c => c.Name.StartsWith(AUTHENTICATION_COOKIE, StringComparison.InvariantCultureIgnoreCase));
    }
    Assert.NotNull(_authenticationCookie);
    _client.DefaultRequestHeaders.Add("Cookie", new CookieHeaderValue(_authenticationCookie.Name, _authenticationCookie.Value).ToString());

    // The current pair of antiforgery cookie-token is not valid anymore
    // Since the tokens are generated based on the authenticated user!
    // We need a new token after authentication (The cookie can stay the same)
    _antiforgeryToken = null;
}
```
Code này rất giống nhau, ngoại trừ việc chúng ta gửi request POST với form được Code mã hóa url. Form này có tên người dùng và mật khẩu được lất từ User nhập trước ở class `DatabaseSeeder` và token chống giả mạo lấy ra từ class vừa tạo.

Một điểm quan trọng cần lưu ý là token chống giả mạo được tính là hợp lệ cho người dùng hiện đã được login. Vì vậy, sau khi login xong thì token trước đó không còn hợp lệ nữa, chúng ta sẽ cần lấy lại token mới để đưa vào hàm test và chạy.

Bây giờ chúng ta đã có đủ các công cụ cần thiết, chúng ta bắt đầu test một request POST tới hàm /Articles/Create:

```
[Fact]
public async Task Create_Post_RedirectsToList_AfterCreatingArticle()
{
    // Arrange
    await EnsureAuthenticationCookie();
    var formData = await EnsureAntiforgeryTokenForm(new Dictionary<string, string>
    {
        { "Title", "mock title" },
        { "Abstract", "mock abstract" },
        { "Contents", "mock contents" }
    });

    // Act
    var response = await _client.PostAsync("/Articles/Create", new FormUrlEncodedContent(formData));

    // Assert
    Assert.Equal(HttpStatusCode.Found, response.StatusCode);
    Assert.Equal("/Articles", response.Headers.Location.ToString());
}
```
Lưu ý cách test phải có cả chờ đợi hàm EnsureAuthenticationToken() chạy xong để lấy được token và chờ đợi EnsureAntiforgeryTokenForm() để lấy được các dữ liệu cần thiết trong request.

Sau khi có công cụ này, sẽ dễ dàng test các hàm khác trong controller, ví dụ như `DeleteConfirmation`:

```
[Fact]
public async Task DeleteConfirmation_RedirectsToList_AfterDeletingArticle()
{
    // Arrange
    await EnsureAuthenticationCookie();
    var formData = await EnsureAntiforgeryTokenForm();

    // Act
    var response = await _client.PostAsync($"/Articles/Delete/{PredefinedData.Articles[0].ArticleId}", new FormUrlEncodedContent(formData));

    // Assert
    Assert.Equal(HttpStatusCode.Found, response.StatusCode);
    Assert.Equal("/Articles", response.Headers.Location.ToString());
}
```
![](http://www.dotnetcurry.com/images/aspnet-core/integration/integration-test-authorization-antiforgery.png)

Hình 4, chạy test tích hợp với xác thực và chống giả mạo

Bạn có thể thử viết tiếp các hàm ở controller khác trước khi đọc tiếp sang phần test controller API. Vẫn như mọi khi, hãy tham khảo code ở GitHub https://github.com/DaniJG/BlogPlayground nếu bạn cần.

# Test controller API

Trước khi chúng ta kết thúc với bài test tích hợp, hãy chờ một giây cũng xem xét controller API mà chúng ta đã giới thiệu trong bài trước. Nó sử dụng dạng API REST gửi và nhận JSON.

Có hai điểm khác biệt chính với các bài unit test controller API trước đây:

* Chúng ta vẫn phải thiết lập chống giả mạo và xem xét việc đọc token từ header vì không thể đọc được giá trị form được mã hóa từ url trong api. Sau đó, chúng ta sẽ POST một data JSON chứa một bài viết và chứa cả tiêu đề với token chống giả mạo.
* Chúng ta sẽ cần sử dụng thư viện `Newtonsoft.Json` để chuyển đổi serialize/deserialize các request và response tới dưới dạng object JSON.


Hãy xử lý chống giả mạo trước. Trong class `Startup` của bạn, hãy thêm vào dòng sau trước dòng gọi đến `AddMvc()` :

```
services.AddAntiforgery(opts => opts.HeaderName = "XSRF-TOKEN");

```

Chúng ta cũng cần một hàm khác trong `class fixture` để thiết lập token trong header request mỗi khi test:
```
public async Task EnsureAntiforgeryTokenHeader()

{
    _client.DefaultRequestHeaders.Add(
        "XSRF-TOKEN",
        await EnsureAntiforgeryToken()
    );
}
```
Sau đó chúng ta có thể viết một bài test sử dụng `JsonConverter` của `Newtonsoft.Json` để serialize/deserialize một bài viết thành JSON. Hàm test sẽ như sau:

```
[Fact]
public async Task AddArticle_ReturnsAddedArticle()
{
    // Arrange
    await EnsureAuthenticationCookie();
    await EnsureAntiforgeryTokenHeader();
    var article = new Article { Title = "mock title", Abstract = "mock abstract", Contents = "mock contents" };

    // Act
    var contents = new StringContent(JsonConvert.SerializeObject(article), Encoding.UTF8, "application/json");
    var response = await _client.PostAsync("/api/articles", contents);

    // Assert
    response.EnsureSuccessStatusCode();
    var responseString = await response.Content.ReadAsStringAsync();
    var addedArticle = JsonConvert.DeserializeObject<Article>(responseString);
    Assert.True(addedArticle.ArticleId > 0, "Expected added article to have a valid id");
}
```
Các bạn có thể thấy cách chúng ta có thể convert Bài viết thành một object JSON là StringContent với đoạn code:

```
new StringContent(JsonConvert.SerializeObject(article), Encoding.UTF8, "application/json");
```
Tương tự như vậy, chúng ta deserialize các response dạng JSON thành một bài viết (từ JSON thành class Object Article) với đoạn code:

```
var addedArticle = JsonConvert.DeserializeObject<Article>(responseString);
```


Và giờ thì việc test các hàm khác của controller API sẽ quá đơn giản khi mà chúng ta đã biết cách xử lý JSON, cookie xác thực và token chống giả mạo!

# Kết luận
Chúng ta đã thấy cách Integration Tests bổ sung Unit Tests bằng các phần bổ sung test hệ thống như test truy cập cơ sở dữ liệu hoặc test bảo mật.

Các bài test này thực sự có giá trị, thậm chí giá trị hơn so với các bài Unit Test trong các ứng dụng có ít logic hoặc ứng dụng đơn giản. Nếu ứng dụng chỉ đơn giản là cung cấp các API CRUD (THÊM SỬA XÓA ĐỌC), bạn sẽ đầu tư thời gian nhiều hơn trong việc code các bài test tích hợp, và sử dụng Unit Test cho các khu vực khác sẽ hưởng lợi được từ cả 2.

Tuy nhiên, tương tự như Unit Tests, Các bài test tích hợp cũng không phải không có nhược điểm!

Chúng khó thiết lập hơn khi so sánh với các bài Unit Test, chạy request ở test tích hợp sẽ tốn kha khá thời gian cần để xử lý các tính năng của ứng dụng ví dụ như bảo mật và rõ ràng bài integration Test chậm hơn đáng kể so với các bài Unit Test.

Hãy đảm bảo bạn có tỷ lệ  unit test và test tích hợp trong dự án một cách khoa học, tối đa hóa sự hữu ích đối với chi phí viết code test và bảo trì mỗi bài test!

Cũng chú ý rằng chúng ta vẫn còn chưa test hết số phần của ứng dụng. Ví dụ, cơ sở dữ liệu không phải là một cơ sở dữ liệu thực sự, nó vẫn là giả lập trong bộ nhớ. Tương tự như vậy, các bài test gửi request đến server mà không thông qua một trình duyệt, mặc dù chúng ta đang xây dựng một ứng dụng web có phía client đàng hoàng. Điều này có nghĩa là chúng ta chưa hoàn thành và chúng ta cần xem xét các bài test cấp cao hơn nữa.

Bài tiếp theo sắp tới sẽ xem xét các bài test End-to-End, Test toàn bộ giao diện, nơi chúng ta có thể đảm bảo một hệ thống triển khai thực sự đang chạy đúng như mong đợi. Từ Client đến Server.

Hãy đón đọc phần 3 của loạt bài này nhé bạn!

Bài này là bài dịch, hãy xem bài gốc ở đây nhé bạn: http://www.dotnetcurry.com/aspnet-core/1420/integration-testing-aspnet-core