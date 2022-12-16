### 1.       Có thể thêm file `_ViewImports.cshtml` để add một số nội dung dùng chung

```csharp
@using PuLog

@using PuLog.Models

@using PuLog.Areas.Admin

@using PuLog.Areas.Admin.Models

@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

### 2.       Cài nuget BuildBundlerMinifier để nén code
### 
### 3.       Các lệnh cập nhật db

```shell
add-migration m1
update-datebase
```

### 4.       Set route

```csharp
app.UseMvc(routes =>
           {
               routes.MapRoute(
                  name: "default_route",
                  template: "{controller}/{slug}",
                  defaults: new { controller = "Posts", action = "Index" });
           });
```

### 5.       Connect db

```csharp
private readonly ApplicationDbContext _context;

   public ArticlesController(ApplicationDbContext context)
   {
       _context = context;
   }
```
### 6.       Thiết lập biến môi trường

`ASPNETCORE_ENVIRONMENT: Production, Development, Staging`

### 7.       Thêm role

```csharp
// tạo biến đăng ký
private readonly UserManager<ApplicationUser> _userManager;
private readonly RoleManager<IdentityRole> _roleManager;

public Startup(IConfiguration configuration,
RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
{
    Configuration = configuration;
    _userManager = userManager;
    _roleManager = roleManager;
}

// đăng ký
private async Task createRolesandUsers()
{
    bool x = await _roleManager.RoleExistsAsync("Admin");
    if (!x)
    {
        // first we create Admin rool    
        var role = new IdentityRole();
        role.Name = "Admin";
        await _roleManager.CreateAsync(role);

        //Here we create a Admin super user who will maintain the website                   

        var user = new ApplicationUser();
        user.UserName = "admin";
        user.Email = "admin@gmail.com";

        string userPWD = "admin213";
        IdentityResult chkUser = await _userManager.CreateAsync(user, userPWD);

        //Add default User to Role Admin    
        if (chkUser.Succeeded)
        {
            var result1 = await _userManager.AddToRoleAsync(user, "Admin");
        }
    }

    // creating Creating Manager role     
    x = await _roleManager.RoleExistsAsync("Manager");
    if (!x)
    {
        var role = new IdentityRole();
        role.Name = "Manager";
        await _roleManager.CreateAsync(role);
    }

    // creating Creating Employee role     
    x = await _roleManager.RoleExistsAsync("Employee");
    if (!x)
    {
        var role = new IdentityRole();
        role.Name = "Employee";
        await _roleManager.CreateAsync(role);
    }
}

//Password Strength Setting
services.Configure<IdentityOptions>(options =>
{
   // Password settings
   options.Password.RequireDigit = true;
   options.Password.RequiredLength = 8;
   options.Password.RequireNonAlphanumeric = false;
   options.Password.RequireUppercase = true;
   options.Password.RequireLowercase = false;
   options.Password.RequiredUniqueChars = 6;

   // Lockout settings
   options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
   options.Lockout.MaxFailedAccessAttempts = 10;
   options.Lockout.AllowedForNewUsers = true;

   // User settings
   options.User.RequireUniqueEmail = true;
});

//Setting the Account Login page
services.ConfigureApplicationCookie(options =>
{
   // Cookie settings
   options.Cookie.HttpOnly = true;
   options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
   options.LoginPath = "/Account/Login"; // If the LoginPath is not set here,
                                         // ASP.NET Core will default to /Account/Login
   options.LogoutPath = "/Account/Logout"; // If the LogoutPath is not set here,
                                           // ASP.NET Core will default to /Account/Logout
   options.AccessDeniedPath = "/Account/AccessDenied"; // If the AccessDeniedPath is
                                                       // not set here, ASP.NET Core 
                                                       // will default to 
                                                       // /Account/AccessDenied
   options.SlidingExpiration = true;
});
```

### 9. Sữa mã lỗi 0x8007000d, khi public web

1 cài đặt

DotNetCore.2.0.0-WindowsHosting.exe

https://github.com/dotnet/core/blob/master/release-notes/download-archives/2.0.0-download.md#windows-server-hosting

> Data Source=MINHPHUC\SQLEXPRESS;Initial Catalog=Pokemon;Integrated Security=True

### 10. Chú ý, khi tiêm phụ thuộc
### 
```csharp
public readonly UserManager<IdentityUser> _userManager;
public readonly RoleManager<IdentityRole> _roleManager;
```
trong controller cần có quyền [Authorize]
```csharp
[Area("Admin")]
[Authorize]
public class ArticlesController : Controller
```