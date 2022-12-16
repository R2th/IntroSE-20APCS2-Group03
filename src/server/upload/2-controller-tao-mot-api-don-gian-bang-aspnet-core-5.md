# Tổng quan
Bài trước mình đã khởi tạo một project ASP.NET Core 5 API trên Visual Studio 2019. Trong bài này, chúng ta hãy cùng nhau tìm hiểu về controller trong ASP.NET Core 5 API.

# Nội dung
Ok, hãy mở project đã tạo ở phần 1 nào. Giờ hãy tạo một controller: click chuột phải vào folder `Controllers > Add > Controller...`. Khi cửa sổ Scaffolded hiện ra, chọn **API** trong thanh navbar bên trái, sau đó chọn **API Controller - Empty**
![image.png](https://images.viblo.asia/edb0b614-323a-48b2-8f28-b57922fba2b1.png)

Đặt tên cho Controller với cú pháp `{Name}Controller`, ở đây mình sẽ đặt là **DemoController** sau đó click **Add**
![image.png](https://images.viblo.asia/77ef0262-91e5-4da5-9da5-cdd954fd6c67.png)

Khi đã tạo xong, mở controller vừa tạo ra, bạn sẽ thấy
![image.png](https://images.viblo.asia/bcd74ea6-fafe-488a-84bf-e050eb296c1c.png)
Controller API trong ASP.NET Core 5 mặc định sẽ có 2 annonation mà mình đã highlight màu vàng ở hình trên
* Route("api/[controller]") - annonation cấu hình router của controller [controller] sẽ được thay thế bằng tên của controlller. Ví dụ: **DemoController** thì controller sẽ là **Demo**
* ApiController - annonation đánh dấu cho biết đây là Api controller trong ASP.NET Core 5

Giờ hãy thử tạo ra một router
```csharp
    [Route("api/[controller]")]
    [ApiController]
    public class DemoController : ControllerBase
    {
        /// <summary>
        /// GET: /
        /// Endpoint trả về chữ: Thành công
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string Get()
        {
            return "Thành công";
        }
    }
```

Để tạo một endpoint ta chỉ cần tạo một phương thức trong ApiController với sau đó thêm một annonation method và đầu phương thức đó. Ở ví dụ trên mình dùng [HttpGet] cho biết đây là một endpoint với method là `GET`. Khi đó đường dẫn của endpoint vừa tạo sẽ là `api/Demo`
Bạn có thể cấu hình lại đường dẫn của endpoint trên bằng cách truyền một string vào annonation trên `[HttpGet("test")]`. Khi đó đường dẫn của endpoint sẽ là `api/Demo/test`.
> Lưu ý: Đường dẫn của endpoint trong một ApiController sẽ là **đường dẫn router của controller/đường dẫn endpoint**

Ngoài ra còn có các annonation method khác như **HttpPost**, **HttpPut**, **HttpDelete**. Bạn có thể tham khảo tại: https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-5.0#http-verb-templates

Đối với response trả về, ngoài các kiểu dữ liệu nguyên thủy, List, IEnumrable, chúng ta có **IActionResult**. **IActionResult**  là một interface định nghĩa các phương thức trả về kết quả của các HttpStatus

Ví dụ: cùng là trả về một chuỗi `Thành công` nhưng với cách dùng **IActionResult**
```csharp
    [Route("api/[controller]")]
    [ApiController]
    public class DemoController : ControllerBase
    {
        /// <summary>
        /// GET: /
        /// Endpoint trả về chữ: Thành công
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            // Ok là phương thức trả về response với HttpStatus là 200
            return Ok("Thành công");
        }
    }
```
Bên cạnh hàm Ok, ASP.NET Core cung cấp rất nhiều hàm khác: 
* Created: 201
* NoContent: 204
* NotFound: 404
* ...

# Tổng kết
Như vậy mình đã giới thiệu cho các bạn cách tạo ra controller đơn giản trong ASP.NET Core.