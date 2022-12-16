# Chứng thực theo Claims trong ASP.NET Core
Trong [bài việc trước](https://viblo.asia/p/ap-dung-cookie-authentication-trong-asp-net-core-khong-dung-identity-gDVK2oojZLj) chúng ta đã tìm hiểu chứng thức bằng Cookie, các bạn nên đọc nó trước khi đọc bài viết này nhé. Trong bài viết này chúng ta sẽ tìm hiểu cách áp dụng chứng thực theo Claims (Claims-Based Authentication) trong dự án ASP .NET nhé![maxresdefault.jpg](https://images.viblo.asia/6d89b10a-70fe-43a8-b8d0-2f0ec1c75e30.jpg)

## Chứng thực theo Claims hoạt động ra sao!
Claims-Based Authentication thực hiện bằng cách kiểm tra thông tin người dùng có các Claim cần có để truy cập vào trang Web hay không (Claim đại loại là thông tin về người dùng sau khi xác thực thành công).

Trong ASP.NET Core chúng ta sẽ tạo ra các policies (Chính sách) để thực hiện việc chứng thực bằng Claims.  Chính sách này định nghĩa những Claims nào mà người dùng cần có để thỏa mãn yêu cầu xác thực cho người dùng đó. Chúng ta có thể áp dụng Policy trên Controller, action method hay Razor Pages, etc.

Chỉ những người dùng nào mang đủ những Claims mà Policy yêu cầu mới có thể được quyền truy cập tài nguyên. Nếu không thì sẽ bị chặn quyền truy cập.

## Cách chỉ định Claims cho người dùng
Claims là những thông tin về người dùng. Nó chứa thông tin dưới dạng Key-Value pairs, trong đó Key là loại Type và Value là giá trị của loại Type đó. Claim có thể là bất cứ thứ gì ví dụ Name Claim, Email Claim, Role Claim, Phone Claim, etc.
### Lưu trữ Claims
Người dùng có thể có nhiều Claims. Identity API chứa những Claims đó trong bảng AspNetUserClaims. Bạn có thể tham khỏa bài viết này để tìm hiểu về cách thêm Claims nhé [Link](https://www.tektutorialshub.com/asp-net-core/adding-managing-claims-in-asp-net-core-identity/)
### Người dùng đăng nhập
Claims được thêm vào trong Authentication Cookies hoặc JWT Bearer Token (Tùy thuộc vào bạn chọn cách nào) khi người dùng đăng nhập thành công. Bạn có thể đọc thêm về [Cookie Authentiocation trong ASP.NET Core](https://viblo.asia/p/ap-dung-cookie-authentication-trong-asp-net-core-khong-dung-identity-gDVK2oojZLj). The ASP.NET Core Identity sử dụng Cookie Authentication. 

Cookies hoặc Tokens sau đó sẽ được gửi đến Client và người dùng sẽ gửi lại những thông tin đó vào những lần request tiếp theo đến server.

Authentication Cookie cũng chỉ là Cookie. Trình duyệt sẽ tự động lưu trữ và gửi hết cho chúng ta. Nhưng JWT Token cần được lưu trữ an toàn đâu đó ở phía. Nó phải được thêm vào Authorization Header ở mỗi lần Request đến Server.

## Xây dựng Authentication Policy theo Claims
Trong ASP .NET Core, chúng ta không thể sử dụng Claims trực tiếp trong *Authorize* attribute. Thay vì đó chúng ta sẽ định nghĩa một Policy. Chúng ta kết nối Claim đến Policy bằng cách sử dụng hàm *RequireClaim*

Một Policy định nghĩa 1 tập hợp các yêu cầu (Requirements) mà người dùng cần phải thoải mãn. Chúng ta định nghĩa Policy trong hàm *ConfigureServices* nằm trong lớp Startup bằng cách gọi đến hàm mở rộng *AddAuthorization*

Dưới đây là code mẫu để tạo 1 Policy có tên là AdminOnly. 
```
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllersWithView();
    services.AddRazorPages();
    
    services.AddAuthorization(options => 
    {
        options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));
    })
}
```
### Policy với 1 Claim
Policy trên quy định những người dùng nó có có Admin Claim thì mới được phép truy cập. Giá trị Claim này thì chưa cần quan tâm lắm.
```
options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));
```

### Policy với Claim có giá trị
Ví dụ dưới đây sẽ tạo ra 1 Policy có tên ITOnly yêu cầu người dùng có Permission Claim với giá trị là IT. Những người dùng có Permission Claim nhưng giá trị khác IT thì vẫn sẽ không được cho phép truy cập.
```
options.AddPolicy("ITOnly", policy => policy.RequireClaim("Permission", "IT"));
```
### Policy với nhiều giá trị Claims
Chúng ta có thể nối nhiều chuỗi Claim khác nhau trên cùng 1 Policy. SuperIT Policy yêu cầu người dùng có Permission Claim với giá trị IT và một IT Claim. Người dùng phải thoải mãn có 2 yêu cầu trên.
```
options.AddPolicy("SuperIT", 
        policy => policy.RequireClaim("Permission", "IT")
                        .RequireClaim("IT"));
```
## Bảo mật End Points với Claims
Để bảo mật end points, chúng ta sẽ áp dụng Policy bằng cách sử dụng *Authorize* attribute. Ví dụ mình sẽ sử dụng Policy để bảo mật *SomeSecureAction*
```
[Authorize(Policy = "AdminOnly")]
public IActionResult SomeSecureAction()
{
    return View();
}
```
# Ví dụ Claim-Based Authorization 
Đầu tiền chúng ta tạo một dự án có sử dụng Identity, các bạn có thể tham khảo[ bài viết này](https://www.tektutorialshub.com/asp-net-core/adding-managing-claims-in-asp-net-core-identity/) để xem cách tạo, cũng như quản lí Claim. Tiếp theo chúng ta sẽ tạo Policy như mình hướng dẫn ở trên, đặt tên là AdminOnly và yêu cầu người dùng mang Admin Claim
```
services.AddAuthorization(options =>
{
     options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));
});
```
 Đặt *Authorize* attribute trước bất cứ đâu mà bạn muốn quyền chứng thực. Ví dụ mình đặt trước *MVCProductsController* trong project của mình
```
namespace AuthzExample.Controllers
{
    [Authorize(Policy = "AdminOnly")]
    public class MVCProductsController : Controller
    {
        private readonly ApplicationDbContext _context;
 
        public MVCProductsController(ApplicationDbContext context)
        {
            _context = context;
        }
 
        // GET: MVCProducts
        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            return View(await _context.Products.ToListAsync());
        }
        ```
        <img loading="lazy" width="1047" height="467" src="https://www.tektutorialshub.com/wp-content/uploads/2021/04/Claim-based-Authorization-example-in-ASP.NET-Core.gif" alt="Claim based Authorization example in ASP.NET Core" class="wp-image-25051">
```
Thử ngay trên ứng dụng của bạn. Trong ví dụ của mình, mình đăng kí tài khoản, vì chưa có Admin Claim nên mình không thể truy cập và thực hiện do chúng ta đã gắn *Authorize* attribute. Sau đó mình thêm Admin Claim vào tài khoản thì cuối cùng tài khoản chúng ta đã có quyền truy cập được rồi. 

<img loading="lazy" width="1047" height="467" src="https://www.tektutorialshub.com/wp-content/uploads/2021/04/Claim-based-Authorization-example-in-ASP.NET-Core.gif" alt="Claim based Authorization example in ASP.NET Core" class="wp-image-25051">

# Reference
* https://www.tektutorialshub.com/asp-net-core/claims-based-authorization-in-asp-net-core/
* https://docs.microsoft.com/en-us/aspnet/core/security/authorization/claims?view=aspnetcore-6.0