Hi All

ở 4 phần trước mình đã hướng dẫn các bạn 
 - Tạo projecy .Net core. 
 - Tạo Repository  
 - Tạo Configuration from database

và hôm nay mình sẽ tiếp tục bài viết để hướng dẫn các bạn sử dụng JWT để thực hiện Authorization.


Phần 1: [.Net Core API Project With EF6 code first, Responsitory Design Partern](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-GrLZDw0BKk0)

Phần 2: [.Net Core API Project With EF6 code first, Responsitory Design Partern - P2 - Create Repository](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p2-create-repository-djeZ1V2GlWz)

Phần 3: [Net Core API Project With EF6 code first, Responsitory Design Partern - P3 - Create Configuration from database](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p3-create-configuration-from-database-OeVKBywM5kW)

Phần 4:[Net Core API Project With EF6 code first, Responsitory Design Partern - P4 - Sử dụng JWT để thực hiện Authorization.](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p4-su-dung-jwt-de-thuc-hien-authorization-gGJ59jmDKX2)

Ok trong phần trước chúng ta đã config để sử dụng JWT để check xem User có quyền truy cập lên controller hay ko và sẽ trả về lỗi 401 khi bị AccessToke bị phát hiện ko đúng là do server render.
Tiếp tục hôm nay chúng ta sẽ kiểm tra người dùng thêm 1 bước nữa. Đó là check xem người dùng có quyền truy cập vào controller hay ko.

# Create Database
Việc đầu tiên của phân quyền là chúng ta cần có một database được thiết kế để lưu trữ thông tin về role của user. Ở đây mình sẽ dựng các table sau:
 - User => chứa thông tin người dùng
 - UserType => chứa các role mà hệ thống sẽ sử dụng
 - UserTypeUser = > Mapping giữa User và UserType để biết 1 user có bao nhiêu role.

## Create migration
Chúng ta sẽ tạo thêm 3 model ở Folder "NetCoreAPISample\DataAccess\Model" như sau

User Model

```
    public class User : BaseEntity
    {
        public User()
        {
            UserTypeUser = new HashSet<UserTypeUser>();
        }

        public string Email { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }

        public virtual ICollection<UserTypeUser> UserTypeUser { get; set; }
    }
```

UserType Model

```
    public class UserType : BaseEntity
    {
        public UserType()
        {
            UserTypeUser = new HashSet<UserTypeUser>();
        }

        public string UserTypeName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<UserTypeUser> UserTypeUser { get; set; }
    }
```

UserTypeUser Model

```
    public class UserTypeUser : BaseEntity
    {
        public int UserId { get; set; }
        public int UserTypeId { get; set; }

        public virtual User User { get; set; }

        public virtual UserType UserType { get; set; }
    }
```


Update DBContext

```
using DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.DBContext
{
    public class SampleNetCoreAPIContext : DbContext
    {
        public SampleNetCoreAPIContext(DbContextOptions<SampleNetCoreAPIContext> options)
    : base(options)
        { }

        public virtual DbSet<Blog> Blogs { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<SampleNetCoreConfig> SampleNetCoreConfig { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserTypeUser> UserTypeUser { get; set; }
        public virtual DbSet<UserType> UserType { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
            });

            modelBuilder.Entity<UserTypeUser>(entity =>
            {
                entity.ToTable("user_type_users");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.ToTable("user_types");
            });

            modelBuilder.Entity<Blog>(entity =>
            {
                entity.ToTable("blogs");

                entity.Property(e => e.Id).HasColumnType("int(11)");
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
}

```

Open "Package Manager Console" và input

```
add-migration add_authorization_table
```

EntityFrameWork sẽ render migration như sau:

```
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DataAccess.Migrations
{
    public partial class add_authorization_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user_types",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Active = table.Column<bool>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    UserTypeName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_types", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Active = table.Column<bool>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "user_type_users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Active = table.Column<bool>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    UserTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_type_users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_type_users_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_type_users_user_types_UserTypeId",
                        column: x => x.UserTypeId,
                        principalTable: "user_types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_user_type_users_UserId",
                table: "user_type_users",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_user_type_users_UserTypeId",
                table: "user_type_users",
                column: "UserTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_type_users");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "user_types");
        }
    }
}

```

Open "Package Manager Console" và input

```
update-database
```

kết quả như sau:
```
PM> update-database
Applying migration '20180919090857_add_authorization_table'.
Done.
PM> 
```

## Add Enum
trong 3 table mà chúng ta vừa add sẽ có table **UserType** là master data nên chúng ta sẽ Enum hóa table này bằng cách tạo ra các enum tương ứng với các record trong table **UserType**

Trong Project "NetCoreAPISample\Common" add file "Enum.cs"

```
     public enum UserTypeEnum
    {
        Administrator = 1,
        Staff = 2,
        Manager = 3
    }
```

# Config Policy
Các bạn vui lòng vào link sau: [Microsof Document](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies?view=aspnetcore-2.1) để tìm hiểu cái chúng ta chuẩn bị làm nhé.
Hiện nay thì .Net core có 2 cách để chúng ta thực hiện Authorization:
 - Role
 - Policy

 Role thì nó đang base theo Asp.Net MVC thuần và khá hạn chế trong việc check các thông tin đi kèm.
 
 Policy là một cách mới mà Microsoft đưa ra ở bản .Net core 2.0 cho phép người dùng có thể thực hiện check nhiều cái hơn, nói một cách khác chúng ta có thể custom đc cái chúng ta sẽ check một cách dễ dàng.
 
 
>  In ASP.NET Core authorization comes in two flavors. One is traditional role-based authorization, which works the same way it does in classic ASP.NET MVC, and still has the structural limitation of being rather flat and not ideal for expressing sophisticated authorization logic. Policy-based authentication is a new approach that provides a richer and more expressive model. This is because a policy is a collection of requirements based on claims and custom logic based on any other information that can be injected from the HTTP context or external sources. These requirements are each associated with one or more handlers, which are responsible for the actual evaluation of the requirement.
>  

Do vậy trong bài này mình đang sử dụng Policy để triển khai check Authorization.

Có một vấn đề khi sử dụng Policy để thực hiện authorization là các bạn phải chuẩn bị sẵn các kịch bản cho Policy.

Ví dụ như có UserType = "administration" thì sẽ phải có 1 policy là "administration", như vậy nếu một controller muốn có nhiều Policy thì sẽ phải triển khai như nào?

Và Mục tiêu của config lần này là:
 - 1 controller có thể được access với nhiều Policy và một cách dynamic 
 - Với mỗi UserType chúng ta có thể custom được chúng ta cần check cái gì
 - Thoải mái thêm UserType và mỗi lần thêm chúng ta ko cần care việc tạo policy cho UserType đó

### Tạo policy động
 
Bài toán mình đặt ra ở trên là để sử dụng Policy thì chúng ta cần phải tạo trước các Policy. Vậy chả nhẽ chúng ta tạo bằng tay và lưu ở 1 folder nào đó ?
Và mình đã nãy ra ý nghĩ là vì sao chúng ta ko tạo ra 1 đoạn code để tổ hợp tất cả các trường hợp có thể ghép lại với nhau của 1 list UserType và từ đó tạo 1 template và apply cho toàn bô.

Ví dụ:

```
  Administrator
  Staff
  Manager
```

Với 3 loại UserType này chúng ta cần phải có các Policy sau
 
 ```
 Administrator
 Staff
 Manager
 Administrator,Staff
 Administrator,Manager
 .
 .
 .
 Administrator,Staff,Manager
 ```
Và nếu thêm mới các UserType thì sẽ ko ảnh hưởng và code lại.
May mắn là mình có lượm nhặt được 1 số đoạn code tổ hợp khá là hay và mình chia sẻ với các bạn:

Các bạn vào folder "\NetCoreAPISample\Security\Extension" và view file "PolicyExtension"

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Security.Extension
{
    public static class PolicyExtension
    {
        public static IEnumerable<TSource> Prepend<TSource>(this IEnumerable<TSource> source, TSource item)
        {
            if (source == null)
                throw new ArgumentNullException("source");

            yield return item;

            foreach (var element in source)
                yield return element;
        }

        public static IEnumerable<IEnumerable<TSource>> Permutate<TSource>(this IEnumerable<TSource> source)
        {
            if (source == null)
                throw new ArgumentNullException("source");

            var list = source.ToList();

            if (list.Count > 1)
                return from s in list
                       from p in Permutate(list.Take(list.IndexOf(s)).Concat(list.Skip(list.IndexOf(s) + 1)))
                       select p.Prepend(s);

            return new[] { list };
        }

        public static IEnumerable<IEnumerable<TSource>> Combinate<TSource>(this IEnumerable<TSource> source, int k)
        {
            if (source == null)
                throw new ArgumentNullException("source");

            var list = source.ToList();
            if (k > list.Count)
                throw new ArgumentOutOfRangeException("k");

            if (k == 0)
                yield return Enumerable.Empty<TSource>();

            foreach (var l in list)
                foreach (var c in Combinate(list.Skip(list.Count - k - 2), k - 1))
                    yield return c.Prepend(l);
        }
    }
}

```

Nhìn vào khá là khó hiểu nhưng nôm na là đoạn code trên sẽ giúp chúng ta tổ hợp tất cả các trường hợp thành các chuỗi string 
Đoạn mình ko giải thích nhé hihi.

### Config Statup
Sau khi chúng ta có tổ hợp thì chúng ta sẽ thực hiện add Policy ở Startup.

```
    var userRoleTypes = Enum.GetValues(typeof(UserTypeEnum)).Cast<UserTypeEnum>().ToList();

    for (int i = 1; i <= userRoleTypes.Count(); i++)
    {
        foreach (var policyNames in userRoleTypes.Combinate(i))
        {
            ///Administrator,Customer
            var policyConcat = string.Join(",", policyNames);
            var result = policyNames.GroupBy(c => c).Where(c => c.Count() > 1).Select(c => new { charName = c.Key, charCount = c.Count() });
            if (result.Count() <= 0)
            {
                services.AddAuthorization(options =>
                {
                    options.AddPolicy(policyConcat, policy => policy.Requirements.Add(new CustomAuthoRequire(policyConcat)));
                });
            }
        }
    }
```

ahihi chúng ta vừa tạo ra các Policy add vào hệ thống rồi đấy các bạn

Buổi sau mình sẽ hướng dẫn các bạn handle ở tầng midware nhé :*

[Github](https://github.com/dattx1/NetCoreAPISample)