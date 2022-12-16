Trong bài biết này chúng ta sẽ tìm hiểu về Policy-Based Authorization trong ASP .NET Core. Ở bài viết trước chúng ta đã tìm hiểu [Claims-Based Authorization trong ASP .NET Core]([https://viblo.asia/p/claims-based-authorization-trong-asp-net-YWOZrGLRlQ0](https://viblo.asia/p/claims-based-authorization-trong-asp-net-YWOZrGLRlQ0)). Chúng  ta có thể tạo ra những Policies đơn giản đủ để xác thực người dùng trong hầu hết các trường hợp. Nhưng đôi lúc có những tình huống đòi hỏi việc xác thực có đôi chút phức tạp hơn, điều kiện yêu cầu nhiều hơn thì hãy nghĩ ngay đến việc dùng Policy-Based Authorization.

![maxresdefault.jpg](https://images.viblo.asia/129b7591-b676-41f1-a029-f8cdc830fe5e.jpg)

# Authorization Policy
Authorization Policy chính là cốt lõi của ASP.NET Core Authorization Framework. Kể cả khi bạn sử dụng [Claims-Based](https://viblo.asia/p/claims-based-authorization-trong-asp-net-YWOZrGLRlQ0) hoặc role-based authorization, thì bạn cũng đang sử dụng  Policy-Based Authorization.

Policy là tập hợp các yêu cầu mà người dùng cần phải thoải mãn để được xác thực quyền truy cập tài nguyên. Người dùng cần phải mãn tất cả yêu cầu của Policy.

Chúng ta thêm Policy bằng cách gọi hàm `AddAuthorization` trong `ConfigureServices`ở lớp startup class

```
services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));
 
});
```

Policies có thể đơn giản như việc gọi hàm `RequireClaim` của policy builder. Bạn có thể tạo những Policies phức tạp hơn trình bày phía dưới.

# Policy đơn giản
Ví dụ dưới đây là Authorization Policies đơn giản sử dụng claims và roles.
```
options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));
```

# Policy với nhiều Claims
Bạn có thể nối nhiều Claims với nhau như dưới. SuperIT policy yêu cầu người dùng phải có `Permission` claim với giá trị `IT` claim. Người dùng phải thoải mãn cả 2 yêu cầu trên.

```
options.AddPolicy("SuperIT", 
        policy => policy.RequireClaim("Permission", "IT")
                        .RequireClaim("IT"));
```

# Policy chỉ dành cho người dùng đã xác thực
Policy này giống với cách sử dụng thằng `Authorize` attribute
```
options.AddPolicy("AuthUsers", policy => policy.RequireAuthenticatedUser());
```

# Policy sử dụng Role
Policy này yêu cầu Role người dùng có giá trị `AdminRole`
```
options.AddPolicy("AdminRole", policy => policy.RequireRole("AdminRole"));
```

# Policy sử dụng User Name
Giống với Role thì người dùng phải có giá trị UserName là `Bob`
```
options.AddPolicy("BobOnly", policy => policy.RequireUserName("Bob"));
```

# Áp dụng Authorization Policy
Chúng ta áp dụng Policy bằng cách gắn thằng `Authorize` attribute vào nơi bạn cần xác thực. Ví dụ ở dưới mình gắn `AdminOnly` policy vào thằng `SomeSecureAction`
```
[Authorize(Policy = "AdminOnly")]
public IActionResult SomeSecureAction()
{
    return View();
}
``` 

# Tùy chỉnh Policy sử dụng Function
Những Policies ở trên khá là đơn giản nhưng nếu chúng ta có yêu cầu việc xác thực phức tạp hơn thì chúng ta cần tạo ra 1 function và sử dụng nó trong `RequireAssertion`

Custom lamda function này cần phải trả về `true` nếu Policy thoải mãn.

```
options.AddPolicy(
        "SuperUser",
        policyBuilder => policyBuilder.RequireAssertion(
            context => context.User.HasClaim(claim => claim.Type == "Admin")
                || context.User.HasClaim(claim => claim.Type == "IT")
                || context.User.IsInRole("CEO"))
    );
```

# Tùy chỉnh Policy sử dụng requirements và handlers

Chúng ta có thể tùy chỉnh Policy bằng cách sử dụng **Authorization Requirement** và **Authorization Handler**
### Authorization Requirement
Authorization Requirement định nghĩa một tập hợp các yêu cầu để Policy đánh giá. Để xác thực thành công nó cần phải thoải mãn tất cả yêu cầu trên. Hình dung thì nó giống AND condition. Nếu 1 trong những yêu cầu sai thì sai hết vậy đó.
Hình bên dưới minh họa minh họa cấu trúc Policy sử dụng Requirements.

![Authorization-Policy-Using-Requirement-and-Handler-in-ASP.NET-Core.png](https://images.viblo.asia/2e91ed80-39b5-4812-8526-8243bff60c9a.png)
### Authorization Handler
Authorization Handler là nơi chưa những logic, những phép tính toán để kiểm tra xem các yêu cầu nó có hợp lệ hay không. Như hình phía trên thì 1 yêu cầu nó có thể có nhiều hơn 1 handler.
Authorization Handler có thể trả về 1 trong các giá trị sau: 
1. Fail
2. Succeced
3. Do Nothing

Nếu một trong những handlers trả về `Fail` thì yêu cầu đó sai ngay lập tức. Còn nếu không có handler nào trả về `Fail` nhưng có ít nhất 1 handler trả về `Success` thì yêu cầu đó thoải mãn. 
Nếu như không có handler nào trả kết quả về thì cũng coi như yêu cầu đó sai luôn.

Bây giờ thì  chúng ta cùng làm cái ví dụ cho dễ hiểu

# Ví dụ Requirement & Requirement handler
Khi sếp yêu cầu 1 chức năng là thêm quyền tạo sản phẩm cho những người dùng thỏa mãn như yêu cầu sau đây
1. Người dùng là nhân viên công ty mình. Có nghĩa là phải có Employee Claim
2. Người dùng là một khác hàng VIP. Có nghĩa mang VIP Claim
3. Nhưng người dùng này không được cấp phép nữa nếu có những đánh giá xấu. Có nghĩa mang  Disable Claim

Những yêu cầu trên tạo thành 1 Policy. Chúng ta gọi nó là `canManageProduct` Policy
Vì có 3 yêu cầu thì mình tạo ra 3 handler cho tụi nó.
1. IsEmployeeHandler
2. IsVIPCustomerHandler
3. IsAccountNotDisabledHandler

Thật ra chúng ta có thể tạo 1 handler và dùng nó để kiểm tra cho các yêu cầu trên luôn nhưng trong dự án thực tế thì tốt nhất chia ra vậy cho dễ quản lí cũng như có thể tái sử dụng cho những yêu cầu khác.

Có thể thấy rằng nếu `IsEmployeeHandler` hoặc `IsVIPCustomerHandler` trả về `true` thì người dùng sẽ được cấp quyền. Nhưng một khi `IsAccountNotDisabledHandler` trả về `true` thì người dùng coi như mấy quyền và hiển nhiên điều kiện trả về `false` luôn
* `IsAllowedToManageProductRequirement`
    * `IsEmployeeHandler` returns `sucess` else nothing 
    * `IsVIPCustomerHandler` returns `sucess` else nothing
    * `IsAccountNotDisabledHandler` returns fail else nothing
   
Một cách nữa để biểu diễn điều kiện này là tạo ra 2 yêu cầu
* `IsAllowedToManageProductRequirement`
    * `IsEmployeeHandler` returns `sucess` else nothing
    * `IsVIPCustomerHandler` returns `sucess` else nothing
* `IsAccountEnabledRequirement`
    * `IsAccountNotDisabledHandler` returns `true` else nothing

Trong yêu cầu thứ hai, chúng ta có thể tạo Policy khác dành riêng cho nó. Chúng ta tạo ra 1 dự án sử dụng identity, ASP .NET cung cấp sẵn tất cả những thứ cần thiết cho việc xác thực ban đầu rồi.

## Authorization Requirement
Tạo 1 folder `Authorization` ngay dưới solution, ngay dưới nó tạo ra lớp `IsAllowedToEditProductRequirement`

Tất cả những Requirement cần phải implement thằng `IAuthorizationRequirement` trong `Microsoft.AspNetCore.Authorization` namespace. `IAuthorizationRequirement` không chứa bất cứ hàm hay thuộc tính nào nên chúng ta không cần phải implement gì hết.
```
using Microsoft.AspNetCore.Authorization;
 
namespace AuthzExample.Authorization
{
    public class IsAccountEnabledRequirement : IAuthorizationRequirement
    {
    }
}
```

Nếu Requirement cần nhận input nào thì chỉ việc truyền nó qua constructor là được.

Làm tương tự với lớp` IsAccountEnabledRequirement`
```
using Microsoft.AspNetCore.Authorization;
 
namespace AuthzExample.Authorization
{
    public class IsAllowedToManageProductRequirement : IAuthorizationRequirement
    {
    }
}
```
## Tạo Authorization Handlers
Giống với Requirements thì mọi Handlers cần được implement từ `AuthorizationHandler`. Nó có 1 hàm là `HandleRequirementAsync` mà chúng ta sẽ phải implement.

Chúng ta sẽ nhận 1 object Context và 1 Requirement cần được xử lí. Context này nó có chứa lớp User(ClaimPrincipal), chúng ta dùng nó để làm việc với Claim
```
protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, 
                                                IsAllowedToEditProductRequirement requirement)
{
    throw new System.NotImplementedException();
}
```

Nếu người dùng thỏa mãn yêu cầu thì handler sẽ gọi hàm `context.Succeed` trước khỉ trả về, còn nếu người dùng không thỏa mãn thì sẽ gọi `context.Fail()`.

Tất cả Handlers giống nhau về bản chất. Chúng có thể truy cập lớp `User` từ lớp `Context` và check các Claim
```
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
 
namespace AuthzExample.Authorization
{
    public class IsEmployeeHandler : AuthorizationHandler<IsAllowedToManageProductRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       IsAllowedToManageProductRequirement requirement)
        {
            if (context.User.HasClaim(f => f.Type == "Employee")) 
            { 
                context.Succeed(requirement); 
            }
            return Task.CompletedTask;
        }
    }
}
```

```
 
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
 
namespace AuthzExample.Authorization
{
    public class IsVIPCustomerHandler : AuthorizationHandler<IsAllowedToManageProductRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       IsAllowedToManageProductRequirement requirement)
        {
            if (context.User.HasClaim(f => f.Type == "VIP"))
            {
                context.Succeed(requirement);
            }
 
            return Task.CompletedTask;
        }
    }
}
```
```
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
 
namespace AuthzExample.Authorization
{
    public class IsAccountNotDisabledHandler : AuthorizationHandler<IsAccountEnabledRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       IsAccountEnabledRequirement requirement)
        {
            if (context.User.HasClaim(f => f.Type == "Disabled"))
            {
                context.Fail(); 
            } else
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
```
## Inject các Handler
Bước tiếp theo chúng ta inject các handlers vào trong DI.
```
services.AddSingleton<IAuthorizationHandler, IsAccountNotDisabledHandler>();
services.AddSingleton<IAuthorizationHandler, IsEmployeeHandler>();
services.AddSingleton<IAuthorizationHandler, IsVIPCustomerHandler>();
```

## Tạo Policy theo Requirement
Cuối cùng tạo policy `canManageProduct` sử dụng Requirement
```
services.AddAuthorization(options =>
{
    options.AddPolicy("canManageProduct", 
        policyBuilder => 
            policyBuilder.AddRequirements(
                new IsAccountEnabledRequirement(), 
                new IsAllowedToManageProductRequirement()
            ));
});
```

## Áp dụng Policy
Áp dụng Policy này vào bất cứ Controller hay nơi nào cần xác thực bằng cách sử dụng `Authorize` atttribute 
```
namespace AuthzExample.Controllers
{
    [Authorize(Policy = "canManageProduct")]
    public class MVCProductsController : Controller
```

# Kiểm tra hoạt động
Thử tạo product mới, bạn sẽ thấy trang bị từ chối Quyền truy cập.

Thêm Yêu cầu của Nhân viên, đăng xuất và đăng nhập. Bây giờ bạn sẽ có thể tạo một sản phẩm mới

Thêm Xác nhận quyền sở hữu, đăng xuất và đăng nhập bị vô hiệu hóa. Bây giờ, bạn sẽ thấy trang bị từ chối Quyền truy cập trong khi tạo product mới

<img loading="lazy" width="1169" height="463" src="https://www.tektutorialshub.com/wp-content/uploads/2021/04/Policy-based-Authorization-example-in-ASP.NET-Core.gif" alt="Policy based Authorization example in ASP.NET Core" class="wp-image-25071">