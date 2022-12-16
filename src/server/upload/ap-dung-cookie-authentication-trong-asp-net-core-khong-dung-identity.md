Cookie là một tệp văn bản chứa dữ liệu mà các trình duyệt web có thể truy cập, thông thường là những dữ liệu thời gian ngắn. Cookie Authentication là một khái niệm trong đó một số ngữ cảnh đã được xác thực trong trình duyệt máy khách và sử dụng nó để quản lý các phiên người dùng trong ứng dụng. Hiểu đơn giản là cookie sẽ chứa đoạn mã (chìa khóa), đoạn mã sẽ được gửi lên server (ổ khóa) từ trình duyệt rồi sẽ được kiểm tra có hợp lệ hay không (chìa khớp ổ), nếu hợp lệ sẽ cho ban quyền cho người dùng truy cập vào trang (mở cửa 😚).
![](https://images.viblo.asia/4a1629d3-4968-42be-90ff-9e830bf2d218.png)

Trong bài viết này, chúng ta sẽ tìm hiểu chi tiết làm sao có thể sử dụng Cookie Authentication trong ASP .NET Core MVC. Let's go !!!
# 1. Tạo ứng dụng .NET
Mở Visual Studio và tạo một ứng dụng .Net Core đầu tiên, hiện tại mình đang xài phiên bản 3.1. 
![image.png](https://images.viblo.asia/e58b7447-2b90-4143-8993-a2f690ae1faa.png)

Sau khi tạo thành công, chúng ta đã có sẵn những setup cơ bản để có thể chạy được trang web đầu tiên.

Hàm ConfigureServices trong Startup.css, chúng ta thêm Authentication service, sau đó gọi hàm AddCookie() để có thể dùng được chứng thực bằng Cookie, nó sẽ thêm Authentication Scheme vào cấu hình cho ứng dụng của chúng ta ([Authentication Scheme](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-6.0#authentication-scheme) là cái tên dùng để chỉ cho ứng dụng nên thực hiện việc xác thực ra sao).

Ví dụ cho dễ hiểu bạn vào thư viện, thẻ thư viện dùng để xác thực (Authenticate) bạn là ai, bạn có thể vào thư viện hay không. Nhưng nếu bạn vào phòng gym thì bạn cần phải có thẻ gym. Có thể có rất nhiều cách để xác thực, cho nên mỗi khi cấu hình phương thức xác thực, bạn đều cần nêu và chỉ tên ra Authentication Scheme mà bạn chọn. Trong ví dụ của mình, mình không đặt tên cho nó vì theo mặc định tên sẽ là Cookies.
![image.png](https://images.viblo.asia/0bc9d7ba-8912-4d8b-97a8-180da72e9f27.png)

Còn nữa chúng ta phải cần chỉ ra Authentication Scheme mặc định cho ứng dụng trong việc xác thực sau này, bạn truyền kiểu string vào tham số đầu tiên của hàm AddAuthentication() là tên Authentication Scheme bạn chọn. Ở đây mình truyền 1 constant được cung cấp sẵn có giá trị là Cookies.
![image.png](https://images.viblo.asia/a301aa3f-188e-4317-bff7-4d11d8c80244.png)

Vậy là bạn đã cấu hình xong, bước tiếp theo sẽ thêm nó vào pipeline của ứng dụng. Thứ tự thêm vào trong pipeline rất quan trọng, cho nó hãy đảm bảo đặt Authentication chính giữa UseRouting và UseEnpoints Middlewares để nó biết endpoints nào nên được truy cập, à mà hiển nhiên phải đặt trước UseAuthorization nha, vô được nhà rồi mới vô được phòng chứ hehe 😂
![image.png](https://images.viblo.asia/f6fb8d28-10e9-4216-bc74-32291421a5c1.png)

Vậy việc cấu hình đã xong, chúng ta có thể thử bằng cách thêm thuộc tính [Authorize] trước HomeController và khởi động lại. Ứng dụng không cho chúng ta truy cập vào vì mình chưa xác thực cho nó và việc này sẽ thực hiện ngày phần tiếp theo 🤘
![image.png](https://images.viblo.asia/12edde8f-253b-4a93-ab5b-51201f5c5c6f.png)

# 2. Đăng nhập, đăng xuất
Khi chưa được xác thực, ứng dụng tự redirect chúng ta về account/login kèm thèm query returnUrl. Bây giờ chúng ta sẽ tạo Model, Controller và View cho nó nhé.
```

namespace CookieAuthentication.Models
{
    public class LoginModel
    {
        [Required]
        [Display(Name = "Username")]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public bool RememberLogin { get; set; }
        public string ReturnUrl { get; set; }
    }
}
```
```
namespace CookieAuthentication.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        public IActionResult Login(string ReturnUrl = "")
        {
            
            LoginModel objLoginModel = new LoginModel();
            objLoginModel.ReturnUrl = ReturnUrl;
            return View(objLoginModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}

```
```
@model CookieAuthentication.Models.LoginModel    
@{    
    ViewData["Title"] = "Login";    
    Layout = "~/Views/Shared/_Layout.cshtml";    
}    
<h2>Login</h2>    
<hr />    
<div class="row">    
    <div class="col-md-4">    
        <form asp-action="Login">    
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>    
            @if (!string.IsNullOrEmpty(ViewBag.Message))    
            {    
                <span class="text-danger">    
                    @ViewBag.Message    
                </span>    
            }    
            @Html.HiddenFor(x => x.ReturnUrl)    
            <div class="form-group">    
                <label asp-for="UserName" class="control-label"></label>    
                <input asp-for="UserName" class="form-control" />    
                <span asp-validation-for="UserName" class="text-danger"></span>    
            </div>    
            <div class="form-group">    
                <label asp-for="Password" class="control-label"></label>    
                <input asp-for="Password" class="form-control" />    
                <span asp-validation-for="Password" class="text-danger"></span>    
            </div>    
            <div class="form-group">    
                <div class="checkbox">    
                    <label>    
                        <input asp-for="RememberLogin" /> @Html.DisplayNameFor(model => model.RememberLogin)    
                    </label>    
                </div>    
            </div>    
            <div class="form-group">    
                <input type="submit" value="Login" class="btn btn-primary" />    
            </div>    
        </form>    
    </div>    
</div>     
```

Kết quả chúng ta có được trang sau đây:
![image.png](https://images.viblo.asia/f6e8cf7c-21d1-434b-b4d0-47dae0c3b044.png)

Sau khi nhập thông tin và ấn login, bước xử lí tiếp theo sẽ được xử lý qua action Login với method POST truyền thêm LoginModel. 

```
[HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginModel objLoginModel)
        {
            if (ModelState.IsValid)
            {
                var user = users.Where(x => x.Username == objLoginModel.UserName && x.Password == objLoginModel.Password).FirstOrDefault();
                if (user != null)
                {
                    //A claim is a statement about a subject by an issuer and    
                    //represent attributes of the subject that are useful in the context of authentication and authorization operations.
                    var claims = new List<Claim>() {
                        new Claim(ClaimTypes.Name, user.Username),
                        new Claim(ClaimTypes.Role, user.Role),
                    };
                    //Initialize a new instance of the ClaimsIdentity with the claims and authentication scheme    
                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    //Initialize a new instance of the ClaimsPrincipal with ClaimsIdentity    
                    var principal = new ClaimsPrincipal(identity);
                    //SignInAsync is a Extension method for Sign in a principal for the specified scheme.    
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties()
                    {
                        IsPersistent = objLoginModel.RememberLogin
                    });
                    return LocalRedirect(objLoginModel.ReturnUrl);
                }
                else
                {
                    ViewBag.Message = "Invalid Credential";
                    return View(user);
                }
            }
            return View(objLoginModel);
        }
```

Trong ví dụ này mình sử dụng in-memory cho ngắn gọn để lấy danh sách user, trong thực tế bạn có thể inject database hoặc một số cách khác:
![image.png](https://images.viblo.asia/57d51a11-0db8-4e6b-8597-84e9afb249c8.png)

Sau khi xác thực thông tin nhập tồn tại trong danh sách user chúng ta có, mình sẽ tạo ra danh sách các Claim, Claim là một đối tượng có các thuộc tính loại (Type) và giá trị (Value) chứa thông tin về User đó. Sau khi tạo list các Claim, mình sẽ tạo đối tượng ClaimIdentity từ List Claim đó và chuỗi Scheme mà identity này thuộc về, và cuối cùng mình sẽ tạo ra ClaimsPrincipal từ các ClaimIdentity vừa tạo. Nghe có vẻ hơi phức tạp xíu đúng không, để mình giải thích kĩ hơn 😅 

Nó nghe khá phức tạp nhưng cũng đơn giản như sau:
1. Tạo Claims dựa trên thông tin xác thực người dùng
2. Tạo ClaimsIdentity dựa theo các Claims
3. Tạo ClaimsPrincipal cho Identity này
4. Truyền ClaimPricipal đến hàm HttpContext.SignIn cùng với AuthenticationScheme, trong ví dụ của mình nó là "Cookies"

Trong ASP .NET Core, Đối tượng đại diện cho User là ClaimsPricipal, một ClaimsPrincipal có thể có nhiều ClaimsIdentity chứa các đối tượng Identity cho Authetication Scheme. Nếu ứng dụng có 1 Scheme thì ClaimsPrincipal sẽ có 1 đối tượng ClaimsIdentity nhưng nếu chúng ta có thêm nhưng Scheme khác như xác thực bằng Google (phần này mình sẽ trình bày trong phần tiếp theo) thì sẽ chứa thêm nữa.

![image.png](https://images.viblo.asia/670d908a-7028-40e9-bc75-5fcdaac8a4cd.png)

Khi xác thực thành công, ứng dụng sẽ redirect chúng ta về trang mà chúng ta đặt default cho ReturnUrl trong LoginModel:
![image.png](https://images.viblo.asia/af8cbe4b-8eca-48d0-9563-4890394c189f.png)
![image.png](https://images.viblo.asia/13ef5771-aa24-443e-8b16-d8086c4d6ed0.png)

Vậy là chúng ta được phép truy cập vào ứng dụng rồi 😁 Để đăng xuất thì chỉ cần gọi hàm SignOutAsync(), ASP .NET sẽ lo những phần khác cho chúng ta:
```
public async Task < IActionResult > LogOut() {  
        //SignOutAsync is Extension method for SignOut    
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);  
        //Redirect to home page    
        return LocalRedirect("/");  
    }  
```
![image.png](https://images.viblo.asia/e8bb79a3-9bc7-4db5-98ce-f3a400d7abc0.png)

Đây là giá trị Cookie được lưu trữ trên trình duyệt, khi chúng ta logout ra khỏi ứng dụng Cookie cũng sẽ tự động bị xóa ra khỏi trình duyệt 
![image.png](https://images.viblo.asia/aa9da1ad-315c-4d86-bbf9-a41294b6fef1.png)

Ngoài ra mình muốn show cho các bạn xem thêm về những thông tin Cookie này đang giữ cho chúng ta, mình sẽ để nó trang Home để có bạn có thấy giá trị được trữ trong Cookie
![image.png](https://images.viblo.asia/f4720174-d377-461e-91ad-1e3d70640a08.png)

Và đây là kết quả, các bạn có thể đây là những giá trị chúng ta thêm vào Claims ở phần trên, bạn cũng có thể thêm bất cứ thông tin nào nếu muốn 😉
![image.png](https://images.viblo.asia/78b1b0e0-1fb7-4118-8381-9821ad4f3233.png)

Vậy phần này mình đã hướng dẫn khá chi tiết về cách xác thực bằng Cookie bằng thông tin người dùng được nhập, phần tiếp theo mình sẽ hướng dẫn cách đăng nhập bằng Google và cách kết hợp cả 2 cách vào dự án này nhè. Cảm ơn các bạn đã quan tâm.

# Link tham khảo 
* https://referbruv.com/blog/posts/implementing-cookie-authentication-in-aspnet-core-without-identity
* https://www.c-sharpcorner.com/article/cookie-authentication-in-asp-net-core/
* https://docs.microsoft.com/en-us/aspnet/core/security/authentication/cookie?view=aspnetcore-6.0
* https://www.freecodespot.com/blog/cookie-authentication-in-dotnet-core/