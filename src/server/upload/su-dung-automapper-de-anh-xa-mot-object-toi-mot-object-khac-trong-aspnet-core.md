Trong quá trình phát triển một ứng dụng web ASP.NET Core bạn thường cần chuyển đổi dữ liệu từ một object sang một object khác. Bạn có thể hoàn thành nhiệm vụ này thủ công bởi việc thiết lập những thuộc tính của object đích với những giá trị từ object nguồn. Nhưng sẽ là tốt hơn nếu công việc này có thể làm một cách tự động. Đó chính là cái mà thư viện ```AutoMapper``` có thể làm.

Trước khi bạn đi đến chi tiết của ```AutoMapper```, hãy có một cái hiểu nhanh, ```AutoMapper``` có ích như thế nào với một ví dụ.

Xem xét trang đăng kí người dùng được phát triển với ASP.NET Core MVC như hình bên dưới:

![](https://images.viblo.asia/bc5f4b75-32cf-4839-a75c-db6ca6ab91ac.png)

Như bạn có thể thấy, có 5 trường trong form được đặt tên lần lượt là: **User Name**, **Password**, **Confirm Password** và **Full Name**. Thông thường bạn sẽ lấy dữ liệu được nhập bởi người dùng trong trang này bằng cách sử dụng model binding. Và khi đó bạn sẽ tạo một class view model như bên dưới:

```csharp
public class UserViewModel
{
    public string UserName { get; set; }

    public string Password { get; set; }

    public string ConfirmPassword { get; set; }

    public string Email { get; set; }

    public string FullName { get; set; }
}
```

Bây giờ, trong class ```UserViewModel``` đang có thuộc tính ```Password``` và ```ConfirmPassword``` là cần thiết bởi vì hệ thống validate của bạn cần chúng trong cách đó. Nhưng class **Entity Framework Core** không có thuộc tính ```ConfirmPassword``` được lưu trong bảng cơ sở dữ liệu. Tuy nhiên, class entity phải có thể thêm một thuộc tính khác như ```UserId```, chúng không được nắm bắt bởi view model. Như vậy, class entity sẽ có định nghĩa như sau:

```csharp
public class AppUser
{
    public int UserId { get; set; }

    public string UserName { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string FullName { get; set; }
}
```

Bây giờ bạn đã thấy rõ rằng dữ liệu của bạn được ghi lại vào object ```UserViewModel``` và bạn cần làm thế nào đó chuyển nó vào object ```AppUser```.

Một cách tiếp cận đơn giản là bằng cách thủ công tạo object ```AppUser``` và thiết lập thuộc tính của nó với giá trị nhận được từ ```UserViewModel```.

```csharp
public IActionResult Register
(UserViewModel model)
{
    if (ModelState.IsValid)
    {
        AppUser user = new AppUser()
        {
            UserName = model.UserName,
            Password = model.Password,
            Email = model.Email,
            FullName = model.FullName
        };
        db.Users.Add(user);
        db.SaveChanges();
    }
    return View();
}
```

Bạn có thể thấy, code trên gán một cách thủ công những giá trị tới object ```AppUsser```.

Đây chỉ là một tình huống đơn giản nơi mà việc ánh xạ (mapping) object tới object trong ví dụ trên.

Theo thứ tự để sử dụng ```AutoMapper``` trong ứng dụng web ASP.NET Core, bạn cần thêm **Nuget package** cho ```AutoMapper.Extensions.Microsoft.DependencyInjection```

![](https://images.viblo.asia/27a784d2-4ed3-4f77-b109-901c999d5995.png)

Tiếp theo, bạn cần thêm dòng code sau vào phương thức ```ConfigureServices()``` để đăng kí services yêu cầu bởi ```AutoMapper``` với ASP.NET Core container.

```csharp
public void ConfigureServices
(IServiceCollection services)
{
    services.AddControllersWithViews();
    services.AddAutoMapper
(typeof(AutoMapperProfile).Assembly);
}
```

Phương thức ```AddAutoMapper()``` đăng kí services. Nó chấp nhận một ```Assembly``` (hoặc nhiều assembly) chứa ```AutoMapper profiles```.

Bây giờ, bạn cần tạo một ```AutoMapper``` profile . Một profile là một class chứa thông tin ánh xạ cho object. Ví dụ, bạn cần ánh xạ ```UserMapper``` đến ```AppUser```, vì thế bạn cần một class profile chỉ định thông tin metadata. Class ```AutoMapperProfile``` ở bên dưới chỉ ra cách làm thế nào thông tin này được chỉ định.

```csharp
public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<UserViewModel, AppUser>();
    }
}
```

Như bạn có thể thấy, class ```AutoMapperProfile``` thừa kế từ class base ```Profile```. Constructor gọi phương thức ```CreateMap()``` nó chỉ định kiểu nguồn và đích để ánh xạ với nhau. Trong trường hợp này ```UserViewMapper``` là nguồn và ```AppUser``` là đích.

Khi ```AutoMapper``` profile sẵn sàng thì bạn có thể xử lý hàm ```Register``` được đề cập ở trước đó và thay đổi code như bên dưới:

```csharp
private readonly IMapper mapper;

public HomeController(IMapper mapper)
{
    this.mapper = mapper;
}

public IActionResult Register
(UserViewModel model)
{
    if (ModelState.IsValid)
    {
        AppUser user = mapper.Map<AppUser>(model);
        db.Users.Add(user);
        db.SaveChanges();
    }
    return View();
}
```

Code ở trên bao gồm 2 phần - Object ```IMapper``` được inject đến hàm constructor và ```Register()```.

Object ```IMapper``` được inject bởi ```AutoMapper``` và được sử dụng cho việc ánh xạ các object như được minh họa trong hàm ```Register()```.

Hàm ```Register``` sử dụng phương thức ```Map()``` của ```IMapper``` nó chỉ định kiểu đích và một object nguồn. Trong trường hợp này object ```UserViewModel``` nhận thông qua model binding, hành động như nguồn và tiếp theo nó được ánh xạ đến object ```AppUser```.

Một ví dụ chạy ứng dụng chỉ ra ```AppUser``` trong cửa sổ xem nhanh giống như thế này:

![](https://images.viblo.asia/b57595dc-762f-449b-8c70-e28df92b1d0d.png)


Trong ví dụ bạn vừa thấy, những thuộc tính của object nguồn và đích đã đang khớp với nhau. Sẽ thế nào nếu chúng khác nhau ? May mắn, ```AutoMapper``` có thể xử lý nhiều tình huống với một ít config.

Hãy giả sử rằng class ```UserViewModel``` có một thuộc tính được đặt tên là ```DisplayedName``` (thay vì ```FullName```) nó cần để ánh xạ đến ```FullName``` của ```AppUser```. Bạn có thể hoàn thành việc ánh xạ này được chỉ dẫn như bên dưới:

```csharp
public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<UserViewModel, AppUser>()
            .ForMember(destination => destination.FullName, 
options => options.MapFrom(source => source.DisplayName));
    }
}
```

Phương thức ```ForMember()``` chỉ định thuộc tính ```DisplayName``` của nguồn được ánh xạ đến thuộc tính ```FullName``` của đích.

Có lúc bạn cần ánh xạ các thuộc tính có điều kiện. Cho ví dụ, bạn có thể muốn ánh xạ ```DisplayName``` đến ```FullName``` chỉ nếu nó khác với ```UserName```. Bạn có thể thực hiện giống như điều kiện ánh xạ bên dưới:

```csharp
public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<UserViewModel, AppUser>()
            .ForMember(destination => destination.FullName, 
options => options.MapFrom(source => source.DisplayName))
            .ForMember(destination => destination.FullName, 
options => options.Condition(source => source.DisplayName 
!= source.UserName));
    }

```

Nó sử dụng phương thức ```Condition()``` để chỉ định điều kiện ánh xạ. Một ví dụ chạy của ứng dụng khi ```UserName``` và ```DisplayName``` là giống hệt các kết quả ở hình bên dưới:

![](https://images.viblo.asia/2cae5226-8d86-48e6-aab3-80b69b292d74.png)


Như bạn có thể thấy ```FullName``` chú một giá trị ```null``` bở vì ```DisplayName``` và ```UserName``` đều được thiết lập là **User1**

# Kết

Trong thực thế khi phát triển ứng dụng rất nhiều trường hợp các bạn cần chuyển đổi qua lại giữa object binding trên UI người dùng và object định nghĩa trong cơ sở dữ liệu. Ứng dụng càng mở rộng thì việc chuyển đổi thủ công sẽ không còn thích hợp, chính vì vậy việc tự động hóa công việc này mang lại nhiều lợi ích cho việc phát triển vào bảo trì. ```AutoMapper``` trong ASP.NET Core là một lựa chọn hợp lý cho trường hợp này. Hy vọng bài viết sẽ mang lại cho các bạn những điều bổ ích. Cảm ơn các bạn đã theo dõi.

Bài viết được dịch từ nguồn:

[Use AutoMapper To Map One Object To Another In ASP.NET Core](http://www.binaryintellect.net/articles/f1fdc9fd-91be-435c-8ace-b74e848db914.aspx)