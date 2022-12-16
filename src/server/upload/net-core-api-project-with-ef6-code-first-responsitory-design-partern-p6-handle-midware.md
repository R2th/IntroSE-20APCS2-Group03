Phần 1: [.Net Core API Project With EF6 code first, Responsitory Design Partern](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-GrLZDw0BKk0)

Phần 2: [.Net Core API Project With EF6 code first, Responsitory Design Partern - P2 - Create Repository](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p2-create-repository-djeZ1V2GlWz)

Phần 3: [Net Core API Project With EF6 code first, Responsitory Design Partern - P3 - Create Configuration from database](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p3-create-configuration-from-database-OeVKBywM5kW)

Phần 4:[Net Core API Project With EF6 code first, Responsitory Design Partern - P4 - Sử dụng JWT để thực hiện Authorization.](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p4-su-dung-jwt-de-thuc-hien-authorization-gGJ59jmDKX2)

Phần 5:[Net Core API Project With EF6 code first, Responsitory Design Partern - P5 - Create Dynamic Authorization Policy.](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p5-su-dung-jwt-de-thuc-hien-authorization-part-2-gGJ59jD1KX2)

Như vậy ở phần trước chúng ta đã hoàn thành việc tạo ra các Policy và phần này chúng ta tiếp tục sẽ handle xử lý logic Authorization.

# Create AuthorizationHandler
Đầu tiên chúng ta sẽ tạo 1 class để listen các sự kiện liên quan đến Authorization.
Quy trình như sau:
 - Client Call server
 - Tầng midware check controller xem có yêu cầu gì về Authorization hay ko (nếu mask là AllowAnymous thì sẽ ko check cho lên thẳng server luôn)
 - Nếu midware detect có mask Policy (các bạn có thể xem ở phần 5) sẽ thực hiện check logic Authorization do chúng ta custom và sẽ trả về kết quả là True or False
 - Nếu kết quả là True => lên thẳng server
 - Nếu kết quả là false => trả về lỗi 403 (Fobident)

ở .Net core 2.0 trở lên thì microsoft đã cung câp 1 class khá là thuận tiện để xử lý việc này đó chính là **AuthorizationHandler** và **Requirements**

## Requirements

> An authorization requirement is a collection of data parameters that a policy can use to evaluate the current user principal.
> 

### Add Class CustomAuthoRequire

Add Class CustomAuthoRequire vào Project Security

```
    public class CustomAuthoRequire : IAuthorizationRequirement
    {
        public List<UserTypeEnum> AppceptUserTypes { get; set; }

        public CustomAuthoRequire(string policyName = "")
        {
            this.AppceptUserTypes = new List<UserTypeEnum>() { UserTypeEnum.Administrator };
            AppceptUserTypes.AddRange(RoleHandle.GetRoles(policyName));
        }
    }

    public static class RoleHandle
    {
        public static List<UserTypeEnum> GetRoles(string roleStrings)
        {
            var result = new List<UserTypeEnum>() { };
            try
            {
                if (!string.IsNullOrEmpty(roleStrings))
                {
                    var listRole = roleStrings.Split(",");

                    foreach (var role in listRole.Distinct().ToList())
                    {
                        result.Add((UserTypeEnum)Enum.Parse(typeof(UserTypeEnum), role));
                    }
                }

                return result;
            }
            catch (Exception)
            {
                return result;
            }
        }
    }
```
Như Với mỗi **CustomAuthoRequire** được sinh ra sẽ đi kèm với 1 Policy.
Ví dụ:
- Policy cho "Staff" sẽ sinh ra 1 CustomAuthoRequire có data **AppceptUserTypes**  = [UserTypeEnum.Staff]
- Policy cho "Staff, Manager" sẽ sinh ra 1 CustomAuthoRequire có data **AppceptUserTypes**  = [UserTypeEnum.Staff, UserTypeEnum.Manager]

Như bài trước mình có nói rồi thì ở chế độ validation bằng Policty thì chúng ta cần định nghĩa rõ Policy đó như thế nào, data để check ra làm sao, ở phần 5 chính là phần định nghĩa Tên cho Policy và ở đây chúng ta đang thực hiện cung cấp data cho Policy đó.

việc đăng ký sẽ diễn ra ở Startup nhé mn.

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

Như vậy là chúng ta đã định nghĩ PolicyName, PolicyData và bây giờ chúng ta sẽ sử dụng nó như thế nào

## CustomAuthorizationHandle
Đây sẽ là nơi request sẽ đi qua trước khi được cấp phép lên controller, vậy chúng ta sẽ làm gì ở đây.
Bây giờ chúng ta đã có những gì rồi:
 - Danh sách Policy
 - Data RoleAccepted cho từng Policy

Bây giờ chúng ta cần làm gì:
 - Check AccessToken xem có phù hợp với Policy hay ko.

Add Class **CustomAuthorizationHandle** vào project Security với content như sau:

```
    public class CustomAuthorizationHandle : AuthorizationHandler<CustomAuthoRequire>
    {
        protected IAuthozirationUtility _authozirationUtility;

        public CustomAuthorizationHandle(IAuthozirationUtility authozirationUtility)
        {
            _authozirationUtility = authozirationUtility;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CustomAuthoRequire requirement)
        {
            try
            {
                var jwtToken = _authozirationUtility.GetRequestAccessToken(context);
                var type = jwtToken.GetClaimValue(JwtRegisteredClaimNames.Typ.ToString());
                var userRoles = RoleHandle.GetRoles(type);

                var currentAcceptRoles = userRoles.Select(x => (int)x).FirstOrDefault(y => requirement.AppceptUserTypes.Select(z => (int)z).Contains(y));

                if (currentAcceptRoles > 0)
                    context.Succeed(requirement);
                else
                    context.Fail();

                return Task.FromResult(0);
            }
            catch
            {
                context.Fail();
                return Task.FromResult(0);
            }

        }
    }
```

Chúng ta sẽ làm gì ở đây.
Khi các bạn kế thừa class từ class **AuthorizationHandler** thì sẽ có 1 method đc mặc định đc override lại chính là **HandleRequirementAsync** tất cả các request trước khi lên server sẽ chạy qua method này, nếu chúng ta ko handle gì trong method này thì mặc định sẽ được lên thẳng server. Vì vậy chúng ta sẽ handle Authorization tại đây.

Step như sau:
 - Phân tích AccessToken và lấy ra Role của User đang truy cập
 - Compare với PolicyData của Policy đang được sử dụng xem Role của User có nằm trong danh sách được cho phép bởi Policy hay ko.
 - Trả về 403 nếu ko có role nào được accepted hoặc tiếp tục lên server nếu có tồn tại 1 User Role nằm trong danh sách accept

Ở trong đoạn code phía trên mình đang mặc định là sẽ để Administrator có quyền tối cao truy cập vào bất cứ API nào.

Đến đoạn này có ai thắc mắc làm sao server biết được request nào sẽ apply vào pocily nào ko.

## CustomAuthorization Attribute
Để Midware xác định được nên sử dụng Policy nào cho từng Request thì chúng ta sẽ sử dụng Attribute để làm việc đó

Add Class **CustomAuthorization** vào Project Security

```
using Common;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Security.AuthozirationAttributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class CustomAuthorization : Attribute, IAuthorizeData
    {
        public CustomAuthorization(params object[] Roles)
        {
            if (Roles.Any(p => p.GetType().BaseType != typeof(Enum)))
            {
                this.Policy = Enum.GetName(typeof(UserTypeEnum), UserTypeEnum.Administrator);
            }
            else
            {
                this.Policy = string.Join(",", Roles.Select(p => Enum.GetName(p.GetType(), p)).Distinct().ToList());
            }
        }

        public string Policy { get; set; }
        public string Roles { get; set; }
        public string AuthenticationSchemes { get; set; }
    }
}
```

Và chúng ta sẽ sử dụng nó ở Controller như bên Asp.net

```
    [HttpPost]
    [CustomAuthorization(UserTypeEnum.Staff)]
    [Route("GetAllBlogs")]
    public IActionResult GetAllBlogs()
    {
        var result = _blogService.GetAllBlogs();
        return Json(ApiSecurity.Encode(result));
    }
```

Đấy với việc sử dụng Attributes như này thì chúng ta có thể cho server biết chúng ta đang sử dụng Policy nào để check AccessToken.


Như vậy toàn bộ việc Authorization sẽ diễn ra như sau:
 - Khi app khởi chạy thì chúng ta sẽ định nghĩa toàn bộ các policy và policy data ở Startup.cs
 - Chúng ta sẽ sử dụng Attributes để cho server biết sẽ sử dụng Policy nào để authorization khi đc request
 - Toàn bộ request trước khi lên server sẽ bị chặn ở midware và kiểm tra AccessToken với PolicyData 


ÔK vậy là chúng ta đã hoàn thành việc authorization rồi đó.

[Github](https://github.com/dattx1/NetCoreAPISample)