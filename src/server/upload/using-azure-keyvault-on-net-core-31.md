Một ngày đẹp trời bạn có một dự án .NET Core 3.1 cần chạy Keyvault. Nhưng bạn đọc mãi tài liệu không hiểu thì đọc bài này nhé.

## Azure Keyvault là gì
Azure Keyvault là một dịch vụ lưu trữ các khóa, config cho website. Để tăng độ bảo mật, thường thì chỉ những khóa nào có mã khóa hay mật khẩu mới được sử dụng, và chi phí của nó thì không hề rẻ. Để sử dụng thì cũng rất đơn giản nếu bạn hiểu cách nó hoạt động.

Azure Keyvault không có config để bạn tích hợp trực tiếp vào project, muốn sử dụng bạn phải tạo một App Registration, và trong Azure Keyvault bạn tiến hành cấp quyền cho App Registration sử dụng. Bạn dùng config của App Registration để cấu hình vào project.

Nội dung bài viết mình chỉ đưa ra cách nó hoạt động, còn về chi tiết và hình ảnh, mọi người click vào link gốc ở cuối bài dùm.

## Đăng ký Azure Keyvault
Trong Azure Portable --> Tìm **Azure key vault**  tiến hành điền các thông tin cần thiết để khởi tạo.

## Đăng ký app cho keyvault
Tìm "**App Registration**" trong danh sách các app dành cho Azure. Tiến hành tạo tên App, sau khi thành công bạn sẽ có được Application (client) ID (**Đây chính là Client ID dùng cho keyvault sau này**)
Vào **Certificates & secrets** để tạo **Client secret** dùng cho keyvault.

## Tạo các secrect key cho Azure Keyvault
Trong **Azure Keyvault** vào **tab Secrets** , tiến hành tạo các secrect key bạn mong muốn, lưu ý nếu như phân cấp kiểu 
```
  "RedisCache": {
    "ConnectionString": "localhost:6379,password=Abc@@123,ssl=false,abortConnect=False"
  },
```
Bạn tạo key theo: **RedisCache--ConnectionString** , với mỗi cấp lồng vào, bạn thêm -- trước mỗi config name. Khi cần bạn có thể vào đây update config mới.
## Gắn Azure Keyvault cho App
Thông thường Azure Keyvault không có config để bạn cấu hình vào project của bạn, mà bạn phải gắn quyền cho một App khác sử dụng Keyvault và dùng Client Id, và Secrect key từ app đó để mà cấu hình vào dự án.
Trên **Azure Keyvault** --> **Access policies**  --> **Add Access Policy**
1. Tiến hành thêm các quyền cho App
Thường được set là: get, set, list, delete
Trong **principal** tiến hành chọn App bạn đã tạo ở **App Registration** ở trên. 

## Cấu hình Azure Keyvault trên .NET Core 3.1
### Tiến hành cài cac package cho project .NET Core 3.1 
Tiến hành cài các package trên để cho phép Project load Azure keyvault
* Microsoft.Azure.KeyVault
* Microsoft.Extensions.Configuration.AzureKeyVault
### Tạo config trên appsettings.json
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Data source=bookstore.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },

  "KeyVault": {
    "Vault": "keyvault-dd",
    "ClientId": "4d1a3g60-dt7d-429w-a4p7-zbc4d2838d5e",
    "ClientSecret": "n1nrHDk4-ik_2L-vLvTVrd_7_shnd~BYP3"
  },

  "AllowedHosts": "*"
}
```
Nhìn config của keyvault có các thông tin:
* Vault: Tên của Keyvault name trong Azure Keyvault
* ClientID: Client Id của ứng dụng liên kết với keyvault (**App Registration**)
* ClientID: Client secrect của ứng dụng liên kết với keyvault (**App Registration**)

### Viết phần load data từ key vault cho project
```
public class Program
    {
        public static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            //Create the Serilog logger, and configure the sinks
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            // Wrap creating and running the host in a try-catch block
            try
            {
                Log.Information("Starting host");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    var root = config.Build();
                    config.AddAzureKeyVault($"https://{root["KeyVault:Vault"]}.vault.azure.net/", root["KeyVault:ClientId"], root["KeyVault:ClientSecret"]);
                })
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
```

Chú ý đoạn: 

```
.ConfigureAppConfiguration((context, config) =>
{
    var root = config.Build();
    config.AddAzureKeyVault($"https://{root["KeyVault:Vault"]}.vault.azure.net/", root["KeyVault:ClientId"], root["KeyVault:ClientSecret"]);
})
```

Đoạn này sẽ load config của Azure Keyvault cho bạn sử dụng. Khi cần gọi một key config sửa dụng thì hệ thống sẽ kiểm tra keyvault có chưa sẽ trả về, nếu không hệ thống sẽ load từ appsettings.json cho bạn. 
```
private readonly IConfiguration _config;

public UserRepositories(IConfiguration config)
{
_config = config;

string mainUrl = _config["Links:Website"];
}
```

Mỗi khi gọi config dùng IConfiguration để lấy key tương ứng.

## Kết luận
- Sử dụng Azure Keyvault không khó, khó ở chỗ bạn chưa hình dung ra các cấu hình để lấy được Client ID , Client Secrect cho hệ thống như thế nào. 
- Không phải key nào bạn cũng sử dụng keyvault, việc đó sẽ làm quá nhiều key không cần thiết, khó nhớ. Chỉ sử dụng cho những key liên quan đến mã hóa, mật khẩu, token quan trọng.
- Azure Keyvault tốn phí, với một người dùng cá nhân mình khuyên không nên xài vì chi phí. Nếu bạn dùng thử thì đừng quên xóa project nếu test xong, nếu không sẽ bị charge phí.

Link tham khảo: Mình có đọc qua nhiều bài hướng dẫn hay video, mình thấy link bên dưới là đầy đủ thông tin và dễ hiểu cho bạn config nhất. Mình có sử dụng nội dung ở link dưới

https://dotnetdetail.net/key-vault-secrets-in-asp-net-core-3-1/