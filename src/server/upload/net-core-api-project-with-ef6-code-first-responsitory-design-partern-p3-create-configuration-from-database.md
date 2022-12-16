Hi All


ở 2 phần trước mình đã hướng dẫn các bạn tạo projecy .Net core và tạo Repository, và hôm nay mình sẽ tiếp tục bài viết để hướng dẫn các bạn quản lý các Config key bằng Database.


Phần 1: [.Net Core API Project With EF6 code first, Responsitory Design Partern](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-GrLZDw0BKk0)

Phần 2: [.Net Core API Project With EF6 code first, Responsitory Design Partern - P2 - Create Repository](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p2-create-repository-djeZ1V2GlWz)

# Giới thiệu
- khi chúng ta làm việc với các project của .Net thì việc sử dụng file configuration là rất thường xuyên, và một câu hỏi đặt ra là các key mang tính chất private sẽ được quản lý như thế nào để đảm bảo tính bảo mật. Và trong một lần mày mò trên Google thì mình có đọc được 1 bài viết hướng dẫn việc add các key config từ database vào file Configuaration thì hôm nay mình xin hướng dẫn lại cho các bạn dựa trên những gì mà mình hiểu.

# Create Table Config
- Do mình sửa dụng code first nên để tạo table mình sẽ bắt đầu tạo từ Model và tạo migration
- Mình tiền hành add Class SampleNetCoreConfig.cs vào folder "DataAccess/Model/" và có content như sau
```
  public class SampleNetCoreConfig: BaseEntity
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
```

Table này có 2 column chính là Key và Value sử dụng giống như là Key và Value trong file config, sau này nếu muốn thêm 1 key mới hoặc sửa value của config thì chỉ cần vào table này sửa là xong.

- Tiếp theo mình sử dụng migration với cú pháp 
```
add-migration add_config_table
```

Migration sẽ được render vào folder "DataAccess/Migrations/"

```
    public partial class add_config_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SampleNetCoreConfig",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Active = table.Column<bool>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    Key = table.Column<string>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SampleNetCoreConfig", x => x.Id);
                });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SampleNetCoreConfig");
        }
    }
```

Vậy là chúng ta đã có được table để lưu các giá trị của config rồi, nôm na là các config của chúng ta đã được bảo mật hơn một tí, còn nếu hacker mà vào được database rồi thì mình bó tay nhé :D

# Action
Việc add Config từ database vào sẽ được diễn ra theo quy trình sau, các step sẽ liên tiếp nhau theo thứ tự như sau:

- API khởi tạo lần đầu tiên
- API chạy startup.cs
- Configuration bắt đầu được khởi tạo
- Configuration gọi Extension mà chúng ta tạo ra, chỗ này chúng ta sẽ khởi tạo DBContext và chọc xuống DB lấy danh sách các Config và nạp vào Configuration của API

Nhiệm vụ của chúng ta bây giờ là sẽ đi tạo Extesion và sẽ được sử dụng như đoạn code phía dưới.

```
   var config = new ConfigurationBuilder()
                .AddEntityFrameworkConfig(options =>
                    options.UseMySQL(connectionStringConfig.GetConnectionString("MySqlConnection"))
                 );
   Configuration = config.Build();
```

## Create Extension manager

Mình tạo folder ConfigurationManager ở Project "DataAccess" và có cấu trúc gồm 3 file như sau:
- EntityFrameworkExtensions.cs => File này sẽ đóng vai trò là tạo ra Extension method cho "IConfigurationBuilder"
- EFConfigSource.cs => File này sẽ thực hiện config DBContext
- EFConfigProvider.cs => File này sẽ được gọi trong "EFConfigSource.cs" có nhiệm vụ sử dụng DBContext đã được khởi tạo và xuống DB lấy data lên

### EntityFrameworkExtensions.cs

```
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.ConfigurationManage
{
    public static class EntityFrameworkExtensions
    {
        public static IConfigurationBuilder AddEntityFrameworkConfig(
            this IConfigurationBuilder builder, Action<DbContextOptionsBuilder> setup)
        {
            return builder.Add(new EFConfigSource(setup));
        }
    }
}
```

- Extension này cho phép chúng ta add thêm các key vào IConfigurationBuilder.
- Class này hiểu nôm na là chúng ta sẽ truyền vào các option của DBContext giúp chúng ta có thể khởi tạo DBContext, rồi sử dụng DBContext get data và add vào Configuration.
- Chúng ta ko sử dụng Dependency Injection cho giai đoạn này vì khởi tạo Config nó sẽ chạy đầu tiên nên DBContext chưa được khởi tạo và chưa được add vào Dependency Injection.

### EFConfigSource.cs

Như đã nói ở trên thì class này sẽ thực hiện việc tạo các option của DBContext, và trong trường hợp này chúng ta chỉ sử dụng "ConectionString" để connect đến DB nên ko cần phải code nhiều.

```
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace DataAccess.ConfigurationManage
{
    public class EFConfigSource : IConfigurationSource
    {
        private readonly Action<DbContextOptionsBuilder> _optionsAction;

        public EFConfigSource(Action<DbContextOptionsBuilder> optionsAction)
        {
            _optionsAction = optionsAction;
        }

        public IConfigurationProvider Build(IConfigurationBuilder builder)
        {
            return new EFConfigProvider(_optionsAction);
        }
    }
}
```

### EFConfigProvider.cs

- Tại đây chúng ta sử dụng các option truyền xuống, khởi tạo DBContext và gán vào "Data" property.
- để add dữ liệu vào "Data" Property thì chúng ta phải sử dụng Dictionary<string,string>, nhưng bên EF đã cung câp method "ToDictionary" rồi nên các bạn ko cần phải care đoạn này lắm

```
using DataAccess.DBContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.ConfigurationManage
{
    public class EFConfigProvider : ConfigurationProvider
    {
        Action<DbContextOptionsBuilder> OptionsAction { get; }

        public EFConfigProvider(Action<DbContextOptionsBuilder> optionsAction) => OptionsAction = optionsAction;

        public override void Load()
        {
            var builder = new DbContextOptionsBuilder<SampleNetCoreAPIContext>();
            OptionsAction(builder);

            using (var dbContext = new SampleNetCoreAPIContext(builder.Options))
            {
                dbContext.Database.EnsureCreated();
                Data = dbContext.SampleNetCoreConfig.ToDictionary(c => c.Key, c => c.Value);
            }
        }
    }
}
```


# Config Startup.cs
### Add Config From Database
- Vậy là các bước chuẩn bị đã xong công việc còn lại của chúng ta là sử dụng như thế nào.
- Để khởi tạo Configuration từ database chúng ta sẽ thực hiện trong function Constructor của class Startup.cs

```
public Startup(IHostingEnvironment env)
{
    var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json");

    var connectionStringConfig = builder.Build();

    ///ADd Config From Database
    var config = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: false)
        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
        .AddEnvironmentVariables()
        .AddEntityFrameworkConfig(options =>
            options.UseMySQL(connectionStringConfig.GetConnectionString("MySqlConnection"))
         );

    Configuration = config.Build();
}
```

- Ở đoạn code này các bạn có thể thấy có tới tận 2 Configuration được khởi tạo, mình xin giới thiệu lần lượt như sau

```
    var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json");

    var connectionStringConfig = builder.Build();
```

đoạn code này với mục đích để khởi tạo Configuration từ file appSettings.json với mục đích là get ConnectionString

```
///ADd Config From Database
var config = new ConfigurationBuilder()
    .SetBasePath(env.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: false)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables()
    .AddEntityFrameworkConfig(options =>
        options.UseMySQL(connectionStringConfig.GetConnectionString("MySqlConnection"))
     );

Configuration = config.Build();
```

- Đoạn code này sử dụng Configuration thứ nhất để lấy connection string và xuống DB get data lên và add vào Configuration của API

### Add Configuration to DependencyInjection

Rồi xong các bạn đã nạp Configuration từ Database và việc nữa là add nó vào DependencyInjection để chúng ta sử dụng ở các project khác thôi

```
 public IConfiguration Configuration { get; }

// This method gets called by the runtime. Use this method to add services to the container.
public void ConfigureServices(IServiceCollection services)
{
    #region ADd Configuration to dependency injection

    services.AddSingleton<IConfiguration>(Configuration);

    #endregion
}
```

### Sử dụng

Configuration đã được add vào DependencyInjection, chúng ta chỉ cần khởi tạo nó ở function Constructor và sử dụng thôi.
![](https://images.viblo.asia/b9f4404e-5c74-4312-9ba5-ac85de2fb452.PNG)
```
using AutoMapper;
using BusinessAccess.DataContract;
using BusinessAccess.Repository;
using BusinessAccess.Services.Interface;
using DataAccess.Model;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BusinessAccess.Services.Implement
{
    public class BlogService: IBlogService
    {
        private readonly IRepository<Blog> _blogRepository;
        private readonly IMapper _mapper;
        private readonly ILog _logger;
        private readonly IConfiguration _configuration;

        public BlogService(IRepository<Blog> blogRepository, IMapper mapper,  IConfiguration configuration)
        {
            _blogRepository = blogRepository;
            _logger = LogManager.GetLogger(typeof(BlogService));
            _configuration = configuration;
        }

        public List<BlogContract> GetAllBlogs()
        {
            var myName = _configuration["MyName"]
            var result = _blogRepository.GetAll().ToList();
            return _mapper.Map<List<Blog>, List<BlogContract>>(result);
        }
    }
}
```

# LƯU Ý SỬ DỤNG
 - DO VIỆC NẠP DATA CHO CONFIGURATION ĐƯỢC CHẠY ĐẦU TIÊN NÊN BẮT BUỘC DATABASE VÀ TABLE CONFIG PHẢI TỒN TẠI NÊN KHI CÁC BẠN THỰC HIỆN MIGRATION KHỞI TẠO DATABASE THÌ NÊN COMMENT ĐOẠN CODE ĐÓ LẠI.
 
 ```
  public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            var connectionStringConfig = builder.Build();

            /////ADd Config From Database
            //var config = new ConfigurationBuilder()
            //    .SetBasePath(env.ContentRootPath)
            //    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: false)
            //    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
            //    .AddEnvironmentVariables()
            //    .AddEntityFrameworkConfig(options =>
            //        options.UseMySQL(connectionStringConfig.GetConnectionString("MySqlConnection"))
            //     );

            Configuration = builder.Build();
        }
 ```
 
Cám ơn các bạn đã theo dõi ở lần sau mình hướng dẫn sử dụng JWT để thực hiện Authorization. tạm biệt và hẹn gặp lại