# Giới Thiệu
RESTful API là một tiêu chuẩn được sử dụng trong việc thiết kế API cho các phần mềm, ứng dụng và dịch vụ web để tạo sự thuận tiện cho việc quản lý các resource. Các tài nguyên hệ thống như tệp văn bản, ảnh, video, âm thanh hay dữ liệu di động là mục tiêu mà nó hướng tới, bao gồm các trạng thái tài nguyên được định dạng và truyền tải qua HTTP.
- Hay có thể nói theo cách khác, nó sẽ là 1 cây cầy để bắc qua nếu các trang web thống nhất với nhau về việc trả lại dữ liệu tương ứng.
Nhưng mà trăm nghe không bằng mắt thấy nên ở bài viết này mình sẽ không đi sâu về mặt lý thuyết, chỉ nêu tổng quát cách hoạt động của RESTful => từ đó đưa ra demo để có thể quan sát tốt hơn.
# I/ Tổng quan về Restful API
## 1. Các dạng Request của Restful API
Http Method gồm có 9 loại nhưng RESTful chỉ sử dụng 4 loại phổ biến
- GET (SELECT): Trả về một Resource hoặc một danh sách Resource.
- POST (CREATE): Tạo mới một Resource.
- PUT (UPDATE): Cập nhật thông tin cho Resource.
- DELETE (DELETE): Xoá một Resource.
    - => Tương ứng với cái tên thường gọi là CRUD (Create, Read, Update, Delete)
## 2. Nguyên tắc thiết kế Restful
Khi chúng ta gửi 1 request tới 1 API nào đó thì sẽ có vài status code để nhận biết như sau:
> - 200 OK – Trả về thành công cho tất cả phương thức
> - 201 Created – Trả về khi một Resource được tạo thành công.
> - 204 No Content – Trả về khi Resource xoá thành công.
> - 304 Not Modified – Client có thể sử dụng dữ liệu cache.
> - 400 Bad Request – Request không hợp lệ
> - 401 Unauthorized – Request cần có auth.
> - 403 Forbidden – bị từ chối không cho phép.
> - 404 Not Found – Không tìm thấy resource từ URI.
> - 405 Method Not Allowed – Phương thức không cho phép với user hiện tại.
> - 410 Gone – Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.
> - 415 Unsupported Media Type – Không hỗ trợ kiểu Resource này.
> - 422 Unprocessable Entity – Dữ liệu không được xác thực.
> - 429 Too Many Requests – Request bị từ chối do bị giới hạn.
- ***API được thiết kế phải rõ ràng, nhìn vào phải biết được API thực hiện cái gì***
## 3. Ưu điểm
- Giúp cho ứng dụng trở nên rõ ràng hơn.
- REST URL đại diện cho resource chứ không phải là hành động.
- Dữ liệu được trả về với nhiều định dạng khác nhau như: xml, html, rss, json …
- Code đơn giản và ngắn gọn.
- REST chú trọng vào tài nguyên hệ thống.
# II/ DEMO Thiết kế Resfult API đơn giản
Mình sẽ tạo 1 project Web API và Demo thử cách mà Restful được gọi tới

![](https://images.viblo.asia/d46b413b-ddfe-452d-8f87-d99726b69c7f.PNG)
Ý tưởng là mình sẽ tạo 1 class Model để xử lý trong phần API rồi được Controller gọi lên để hiển thị ra View
(nếu bạn nào còn mập mờ về phần này thì mọi người nên xem trước mô hình MVC nha)

![](https://images.viblo.asia/20d16fe1-82f2-4c94-8c45-59c2f5a23afe.PNG)

-----
## 1. Phần SETUP
Mình sẽ tạo ra class gọi là **Users** ở trong Folder Model để sử dụng suốt quá trình test API nhé!!
- **Class Users** sẽ như thế này
```csharp
public class Users
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Fullname { get; set; }
    public bool IsActive { get; set; }
}
```

Tạo phần Controller của WebAPI
- Tạo ra 1 Controller Web API => mình sẽ đặt tên là **UserController**

![](https://images.viblo.asia/11687ddc-ba47-47c4-a337-ddc707a355b7.PNG)
![](https://images.viblo.asia/23bd7868-9ea9-418f-a0af-0ab823291cbe.PNG)

- Thay vì sử dụng cơ sở dữ liệu để dễ dàng stored và tương tác  với dữ liệu NHƯNG vì mình lười tạo thêm cái database rồi kết nối dữ liệu các kiểu nên mình sẽ add trực tiếp trong code cho nhanh gọn nhé!!
- Thêm 1 hàm **AllUser** để tạo ra 1 **Danh sách User** để test
```csharp
private List<Users> AllUser()
{
    List<Users> list = new List<Users>();
    for (int i = 1; i < 6; i++)   // Tạo ra 6 User
    {
        Users u = new Users()   // Tạo ra user mới
        {
            Username = $"user {i}",
            Password = $"password {i}",
            Fullname = $"fullname {i}",
            IsActive = true
        };
        list.Add(u);   // Thêm vào danh sách User
    }
    return list;
}
```
- Chúng ta sẽ setup lại Uri của API bằng cách vào Folder ***AppStart/WebApiConfig.cs*** và sửa lại đường **routeTemplate** là ***"api/{controller}/{action}/{id}"***
- Thêm vào đoạn code ***Json Formatter*** bên dưới để định dạng dữ liệu trả về là dạng **json**.
 ```csharp
public static void Register(HttpConfiguration config)
{
    // Web API configuration and services

    // Web API routes
    config.MapHttpAttributeRoutes();

    config.Routes.MapHttpRoute(
    name: "DefaultApi",
    routeTemplate: "api/{controller}/{action}/{id}",
    defaults: new { id = RouteParameter.Optional }
    );

    config.Formatters.JsonFormatter.SupportedMediaTypes   // Thêm vào
    .Add(new MediaTypeHeaderValue("text/html"));
}
```
## 2. Phần tạo API
- Thực hiện trả về là **HttpResponseMessage** để xác định được **StatusCode** trả về là bao nhiêu (thực hiện trả về **StatusCode** như phần **Nguyên tắc thiết kế RESTful** mà mình đã đề cập ở phần 2)
- Hoặc có thể trả về kèm với **Json** báo lỗi bên trong **Content** của **HttpClient**
### 2.1. GET METHOD
- **PHẦN USERCONTROLER**
    - Thêm đoạn code thực hiện phương thức **GET** để lấy tất cả User
```csharp
// GET api/User/GetAllUser
[HttpGet] // Cho phép truy cập với phương thức là GET
public HttpResponseMessage GetAllUser()
{
    var list = AllUser();
    if (list != null)
    return Request.CreateResponse(HttpStatusCode.OK, list);
    else return Request.CreateResponse(HttpStatusCode.NotFound);
}
```
- Uri của website sẽ là phần ***host:port + /api/{tên controller}/{action của controller}/{tham số nếu có}*** như phần cấu hình ở file Config.
- Khi truy cập vào địa chỉ ***/api/User/GetAllUser*** chúng ta sẽ thu được 5 User đã tạo dưới dạng **Json**

![](https://images.viblo.asia/b5a5cd6f-ecea-4aa7-9d8e-9f6d6427b980.PNG)
### 2.2 POST METHOD
Ở các phần Post, Put và Delete về sau sẽ phải dùng 1 công cụ hỗ trợ để gửi request mới có thể xác định được dữ liệu thu được là gì, vì request gửi đi sẽ ở dạng gửi ngầm không thể nhìn thấy.
- Ở đây mình sẽ sử dụng **[POSTMAN](https://www.postman.com/downloads/)** test thử, hoặc có thể vào ***[https://reqbin.com/](https://reqbin.com/)*** để trực tiếp sử dụng trên web không cần tải về
> - **Lưu ý**:  Nhằm bảo mật dữ liệu truyền đi, hạn chế cho params truyền thẳng phía sau url
> - **Ví dụ:** *https://test.com?data=blabla&data1=blabla*
- **PHẦN USERCONTROLER**
    - Thêm đoạn code dùng để POST dữ liệu tải lên
    - Function này dùng để tạo thêm 1 user và trả về danh sách user đã được thêm vào phần **Content** của **HttpresponseMessage**
```csharp
// POST api/Users/CreateNew
[HttpPost]
public HttpResponseMessage CreateNew(Users u)
{
    try
    {
        var list = AllUser();
        list.Add(u);   // Thêm User đã được truyền ở tham số User u
        return Request.CreateResponse(HttpStatusCode.OK, list);
    }
    catch (Exception)
    {
        return Request.CreateResponse(HttpStatusCode.BadRequest);
    }
}
```
- **TIẾN HÀNH GỬI POST REQUEST**
    - Có thể gửi post ở dạng **json** hoặc **urlencoded**
    - Dữ liệu trả về đã thêm **user le ngoc son** vào danh sách
>    Để có thể tùy chỉnh chỉ nhận Request gửi đi ở Uri hay chỉ ở Body chúng ta có thể sửa đổi tham số của hàm.
>    Ví dụ: 
>    - **public HttpResponseMessage CreateNew([FromBody] Users u)** // Nhận tham số ở phía Body gửi lên.
>    - **public HttpResponseMessage CreateNew([FromUri] Users u)** // Nhận tham số ở phía Uri

![](https://images.viblo.asia/5d970b41-6390-4f15-b01b-3f6d30bf4a19.PNG)
### 2.3. PUT METHOD
Tương tự như Post, chúng ta sẽ thêm 1 hàm để Update thông tin user
- **PHẦN USERCONTROLER**
    - Thêm 1 hàm dùng để **update** thông tin user dùng Method là **PUT**
```csharp
// PUT api/Users/UpdateUser
[HttpPut]
public HttpResponseMessage UpdateUser(Users u)
{
    try
    {
        var list = AllUser();
        // Lấy index của User thông qua username
        int index = list.FindIndex(p => p.Username == u.Username);   
        list[index] = u;   // Update user
        return Request.CreateResponse(HttpStatusCode.OK, list);
    }
    catch (Exception)
    {
        return Request.CreateResponse(HttpStatusCode.BadRequest);
    }
}
```
- **TIẾN HÀNH GỬI PUT REQUEST**
    - Cập nhật thông tin của user 1 bằng cách nhập đúng username cần update, dữ liệu update sẽ là các thông tin còn lại.
    - Dữ liệu trả về user 1 đã được cập nhật password, fullname và isactive

![](https://images.viblo.asia/9f6da7cf-52d7-4278-9ebb-97651095fbf7.PNG)
### 2.3. DELETE METHOD
- **PHẦN USERCONTROLER**
- Thêm vào hàm **DeleteUser** bằng cách truyền vào **User** và so sánh **username**  *(thường thì update hay delete sẽ dùng thuộc tính Id riêng để xác định User cần thực hiện nhé, nhưng tạm thời cứ demo trước đã :))*
```csharp
// DELETE api/Users/DeleteUser
[HttpDelete]
public HttpResponseMessage DeleteUser(Users u)
{
    try
    {
        var list = AllUser();
        int index = list.FindIndex(p => p.Username == u.Username);
        list.RemoveAt(index);
        return Request.CreateResponse(HttpStatusCode.OK, list);
    }
    catch (Exception)
    {
        return Request.CreateResponse(HttpStatusCode.BadRequest);
    }
}
```
- **TIẾN HÀNH GỬI DELETE REQUEST**
    - Dữ liệu trả về **user 2** đã bị Delete ra khỏi danh sách

![](https://images.viblo.asia/1658b0b6-610a-4e85-b144-42dcd3c84c0d.PNG)
## 3. Gọi API Lên Controller
- Sau khi đã tạo xong 1 API đơn giản, chúng ta sẽ gọi API lên controller để hiển thị lên View giao diện
- Ở đây, chúng ta phải sử dụng 1 class gọi Request để có thể gọi API lên được, mình sẽ demo với **HttpClient**
    -  Mượn tạm **HomeController** để hiển thị trên trang Home :)
    - Chúng ta sẽ sử dụng phương thức ***async/await*** để có thể xử lý bất đồng bộ cho **HttpClient**
 ```csharp
public class HomeController : Controller
{
    public async Task<ActionResult> Index(Users user)
    {
        ViewBag.Title = "Home Page";
        var list = await GetAllUser();
        if (list != null) // Nếu list user khác null thì trả về View có chứa list
            return View(list);
        return View(null);
    }

    private async Task<List<Users>> GetAllUser()   // Hàm Gọi API trả về list user
    {
        string baseUrl = Request.Url.Scheme + "://" + Request.Url.Authority +
            Request.ApplicationPath.TrimEnd('/') + "/";   // Lấy base uri của website
        using (var httpClient = new HttpClient())
        {
            HttpResponseMessage res = await httpClient.GetAsync(baseUrl + "api/User/GetAllUser");
            if (res.StatusCode == System.Net.HttpStatusCode.OK)
            {
                List<Users> list = new List<Users>();
                list = res.Content.ReadAsAsync<List<Users>>().Result;
                return list;
            }
            return null;
        }
    }
}
```
- Trong View của **HomeController** Mình sẽ sửa lại như sau:
```csharp
@{
    ViewBag.Title = "All User";
}
@model IEnumerable<Writeup_WebAPI.Models.Users>

<div class="container">
    <h1>ViewBag.Title</h1>
    @{
        int i = 1;
        foreach (var item in Model)
        {
            <h4>User @i</h4>
            <h5>@item.Username</h5>
            <h5>@item.Password</h5>
            <h5>@item.Fullname</h5>
            <h5>@item.IsActive</h5>
            i++;
        }
    }
</div>
```
- Chạy Code và kiểm tra kết quả

![](https://images.viblo.asia/e256ad07-7437-4816-a86d-3c61fc989a83.PNG)

> Vậy là phần dữ liệu thô Json đã được chuyển thành List User và hiển thị ra giao diện như chúng ta đang mong muốn.
> - Phần Post, Put, Delete cũng sẽ thực hiện tương tự như thế, chỉ thay đổi ở cú pháp sử dụng của HttpClient hoặc có thể tạo riêng ra một **static class** chỉ dùng để gửi Request và trả về dữ liệu để kiểm tra.
> - Có thể tham khảo thêm cách gửi các request trong HttpClient tại https://www.c-sharpcorner.com/article/calling-web-api-using-httpclient/

> Chắc đọc đến đây mọi người thiết nghĩ là đã xong rồi đúng không :)
> - NHƯNG MÀ có 1 vấn đề phát sinh là chã lẽ ai cũng có thể gọi API khơi khơi như vậy
> - KHÔNG, Ở ĐÂY CHÚNG TÔI KHÔNG LÀM THẾ :v
> - Cách khắc phục ở đây là sẽ sử dụng Authorize để phân quyền sử dụng API (có thể sử dụng JWT) => Có lẽ trong bài viết sau mình sẽ làm tiếp về series này nhưng là về phần security và ràng buộc dữ liệu, mọi người nhớ đón xem nhé !!
# III/ Kết Bài
- Qua bài viết này mình đã demo được cách tạo và gọi Restful API để xử lý + đưa lên giao diện.
- Bài viết sẽ có nhiều sai sót, các bạn có thể đóng góp ý kiến thêm để các bài viết sau tốt hơn ạ. 
- Chúc các bạn thành công!!!
# Tài liệu tham khảo
- Tổng quát về Restful: https://topdev.vn/blog/restful-api-la-gi/
- Using Web API: https://www.c-sharpcorner.com/article/create-simple-web-api-in-asp-net-mvc/
- Using HttpClient: https://zetcode.com/csharp/httpclient/