Hi mọi người.
Hôm nay mình sẽ hướng dẫn mọi người tạo 1 project API với .Net Core.

Với xu hướng phát triển của mã nguồn mở thì microsoft đã cho ra đời 1 phiên bản .Net có thể chạy trên các môi trường linux, và hiện tại thì đã cho ra đời 2 version và tương lại sẽ còn nhiều update thêm nữa.

Giới thiệu về .Net core thì mn tìm đọc một số bài giới thiệu nhé, hôm nay mình sẽ chỉ hướng dẫn cách tạo API project như thế nào thôi

# Mô tả API
  - API Call theo kiểu Rest API
  - 1 số nuget
      -  EF6
      -  Automapper
      -  MySql.Data.EntityFrameworkCore 
      -  Pomelo.EntityFrameworkCore.MySql
      -  log4net
  -  Hệ quản trị dữ liệu
      -  MySQL
  - Server deploy
      - Centos 7
  - Code tool:
      - Visual Studio 2017
      - Workbench + .net connector
# Khởi tạo Project
 - Mình sẽ đặt tên là SampleNetCoreAPI project nhé.
 - 
 ![](https://images.viblo.asia/3663703f-b9e3-4f26-bff8-0e2adea8e1a5.PNG)

 ![](https://images.viblo.asia/d94e3ec5-a8db-4758-983e-4c31bca033a8.PNG)

 ![](https://images.viblo.asia/ca8c28b4-28fb-48a9-ba51-0002477fa6df.PNG)

##  Mô tả các Prjoject

- SampleNetCoreAPI: đây sẽ là nơi chúng ta code API, phân luồng API theo đúng mục đích sử dụng
- BusinessAccess: sẽ xử lý các business logic tại đây
- DataAccess: chứa model, migration, initial data,  etc...

Mô hình hoạt động sẽ như sau:
![](https://images.viblo.asia/d544e578-bfe2-4f63-be00-b5b508405449.png)

Step 1 request như sau:
 - SampleNetCoreAPI Nhận request
 - SampleNetCoreAPI call BusinessAccess
 - BusinessAccess xử lý các logic hệ thống, sau khi xử lý xong thì call DataAccess
 - DataAccess sẽ thực hiện add, update, delete, select theo yêu cầu và trả kết quả về cho BusinessAccess
 - BusinessAccess sẽ thực hiện tạo response format và gửi lại cho SampleNetCoreAPI
 - SampleNetCoreAPI mã hóa và gửi lại cho client

## Install Nuget
Do mình đang ko muôn sử dụng windows server để deploy database nên việc sử dụng EntityFrameWork gặp 1 số issue và cần phải có một số nuget để hỗ trợ

và đây là những Nuget mà mình đang sử dụng để có thể kết hợp MySQL và EntityFrameWork

API Project Nuget và Business Project Nuget

![API Project Nuget và Business Project Nuget](https://images.viblo.asia/80643619-b99a-4c26-b1fc-52c87cd70902.PNG)

DataAccess Project Nuget

![DataAccess Project Nuget](https://images.viblo.asia/ca556258-9b0d-4a5c-814a-4fcce09e22cb.PNG)

### Nuget Version
Vì có một số chức năng giữa MySQL và EntityFrameWork còn đang bị conflict nên các bạn cần chú ý đoạn này để tránh bị lỗi

| Nuget| Version | 
| -------- | -------- | 
| Microsoft.EntityFrameworkCore.Design     | 2.0.2     | 
| Microsoft.EntityFrameworkCore.Tools     | 2.0.2     | 
| Microsoft.Extensions.Configuration     | 2.0.2     | 
| Microsoft.NETCore.App     | 2.0.0    | 
| MySql.Data.EntityFrameworkCore     | 6.10.7    | 
| MySql.Data.EntityFrameworkCore     | 2.0.1    | 

## Create Database with code first
bây giờ chúng ta sẽ đi tạo Database bằng cách sử dụng Entity Framework

### Create Config
 - Add Connection String vào *appsetting.json*
 ```
 {
  "Logging": {
    "IncludeScopes": false,
    "Debug": {
      "LogLevel": {
        "Default": "Warning"
      }
    },
    "Console": {
      "LogLevel": {
        "Default": "Warning"
      }
    }
  },
  "ConnectionStrings": {
    "MySqlConnection": "server=localhost;port=3306;user=root;password=123456;database=samplenetcoredb;"
  }
}

 ```
###  Create Model
```csharp
    public class Blog
    {
        public int BlogId { get; set; }
        public string Name { get; set; }

        public virtual List<Post> Posts { get; set; }
    }

    public class Post
    {
        public int PostId { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }

        public int BlogId { get; set; }
        public Blog Blog { get; set; }
    }
```

Thông tin của model chính là thông tin của các table sau này mình sử dụng
### Create Context
- Context sẽ là nơi thể hiện sự liên kết giữa các model (relation ship)
- Context sẽ là nơi để EF dựa vào đó để update cho database
- Context sẽ là nơi chúng ta config cho database

```csharp
 public class SampleNetCoreAPIContext : DbContext
    {
        public SampleNetCoreAPIContext(DbContextOptions<SampleNetCoreAPIContext> options)
    : base(options)
        { }

        public virtual DbSet<Blog> Blogs { get; set; }
        public virtual DbSet<Post> Posts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>(entity =>
            {
                entity.ToTable("blogs");

                entity.Property(e => e.BlogId).HasColumnType("int(11)");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("posts");

                entity.HasIndex(e => e.BlogId)
                    .HasName("FK_Post_Blog_BlogId_idx");

                entity.HasOne(d => d.Blog)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.BlogId)
                    .HasConstraintName("FK_Post_Blog_BlogId");
            });
        }
    }
```

Một số điểm cần chú ý khi tạo Context:
- Context phải luôn có constructor để khởi tạo, với mục đích chúng ta sẽ truyền các option khi khởi tạo app
- từ khóa "DbSet" được dùng để định nghĩa model được sử dụng để liên kết với table, nếu các bạn định nghĩa 1 model mà ko set "DbSet" thì model đó sẽ ko được liên kết với table
- function "OnModelCreating" đây là nơi thực hiện định nghĩa các mối quan hệ giữa các table

### Update Startup.cs
- Startup.cs là nơi chúng ta thực hiện config cho app
- Startup.cs sẽ chạy khi khởi động app, khi chạy migration
-
thực hiện khởi tạo Context khi khởi động APP, điều này chỉ xảy ra 1 lần khi chúng ta "start app", muốn apply các thay đổi thì chúng ta cần phải khởi động lại server.

```csharp
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var sqlConnectionString = Configuration.GetConnectionString("MySqlConnection");
            services.AddDbContext<SampleNetCoreAPIContext>(options =>
              options.UseMySQL(sqlConnectionString)
          );
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
```

Khi chúng ta thực hiện migration thì Startup.cs sẽ được khởi tạo, đồng nghĩa với DBContext được khởi tạo và dựa vào đó EF sẽ update database khi có sự thay đổi

### Create Migration
- Open the PMC:
    -  Tools –> NuGet Package Manager –> Package Manager Console

- Run Add-Migration InitialCreate
- Run Update-Database

EF sẽ render ra folder Migration với cấu trúc như sau:

![](https://images.viblo.asia/3d25ab72-e1e5-4f98-ad7f-4c7ca10edcbb.PNG)

```go
 public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "blogs",
                columns: table => new
                {
                    BlogId = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_blogs", x => x.BlogId);
                });

            migrationBuilder.CreateTable(
                name: "posts",
                columns: table => new
                {
                    PostId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    BlogId = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    Title = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_posts", x => x.PostId);
                    table.ForeignKey(
                        name: "FK_Post_Blog_BlogId",
                        column: x => x.BlogId,
                        principalTable: "blogs",
                        principalColumn: "BlogId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "FK_Post_Blog_BlogId_idx",
                table: "posts",
                column: "BlogId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "posts");

            migrationBuilder.DropTable(
                name: "blogs");
        }
    }
```

![](https://images.viblo.asia/e7f8ad99-a429-467d-a7c9-9a259ccb5ad7.PNG)

DB sẽ được tạo sau khi chúng ta chạy lệnh Run Update-Database

Vậy là hôm nay chúng ta đã khởi tạo được project với database, buổi tiếp theo mình sẽ hướng dẫn các bạn tạo Responsitory để tạo tác với database cũng như code business