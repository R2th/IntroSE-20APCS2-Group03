## 1. Khái niệm
Để hiểu rõ Middleware là gì, trước tiên ta phải hiểu khái niệm Request Pipeline
**Request pipeline** là một cơ chế **xử lý một request đầu vào và kết thúc với đầu ra là một response**. Pipeline chỉ ra cách mà ứng dụng phản hồi với HTTP Request. 
![](https://images.viblo.asia/d4de0491-220f-4a55-833e-41cfda531038.png)

Request đến từ trình duyệt sẽ đi qua Kestrel web server rồi qua pipeline và quay trở lại khi xử lý xong để trả về client. Các thành phần đơn lẻ tạo nên pipeline này được gọi là middleware.

Các Middleware là thành phần đóng vai trò tác động vào request pipeline và kết nối lại với nhau thành một xích, middleware đầu tiên nhận HTTP Request, xử lý nó và có thể chuyển cho middleware tiếp theo hoặc trả về ngay HTTP Response. **Chuỗi các middleware theo thứ tự như vậy gọi là pipeline.**
## 2. Cách thức hoạt động
Đầu tiên, HTTP Request đến. Kestrel web server nhặt lấy request và tạo một HttpContext và gán nó vào Middleware đầu tiên trong request pipeline.

**Middleware đầu tiên sẽ nhận request, xử lý và gán nó cho middleware tiếp theo**. Quá trình này tiếp diễn cho đến khi đi đến middleware cuối cùng. Tùy thuộc bạn muốn pipeline của bạn có bao nhiêu middleware.

**Middleware cuối cùng sẽ trả request ngược lại cho middleware trước đó**, và sẽ ngắt quá trình trong request pipeline.
![](https://images.viblo.asia/a459e9c2-f455-40ec-a725-d2b20b5d3369.png)

Mỗi Middleware trong pipeline sẽ tuần tự có cơ hội thứ hai để kiểm tra lại request và điểm chỉnh response trước khi được trả lại.

Cuối cùng, response sẽ đến Kestrel nó sẽ trả response về cho client. Bất cứ middleware nào trong request pipeline đều có thể ngắt request pipeline tại chỗ đó với chỉ một bước đơn giản là không gán request đó đi tiếp.
![](https://images.viblo.asia/d8c71c2f-bed0-4f88-a39c-6c2bdbc49ffb.jpg)
## 3. Vai trò của Middleware
![](https://images.viblo.asia/59c8fedf-09e2-4947-bdfd-b3d136a900c0.png)

Middleware là cầu nối giữa tương tác của người dùng và hệ thống. Đóng vai trò trung gian giữa request/response và các xử lý logic bên trong web server, ví dụ:
* Cần xác thực người dùng để quyết định xem họ có được phép truy cập đến route hiện tại hay không.
* Yêu cầu đăng nhập
* Chuyển hướng người dùng
* Thay đổi/chuẩn hoá các tham số
* Xử lý request đầu vào và response được tạo ra,...
## 4. Custom và sử dụng Middleware trong .NET CORE
Muốn sử dụng và custom một middleware cần đảm bảo 2 điều sau:
* Class middleware phải khai báo public constructor và với ít nhất một tham số thuộc kiểu RequestDelegate. Đây chính là tham chiếu đến middelware tiếp theo trong pipeline. Khi bạn gọi RequestDelegate này thực tế là bạn đang gọi middleware kế tiếp trong pipeline.
* Class middleware phải định nghĩa một method public tên là Invoke nhận một HttpContext và trả về một Task. Đây là phương thức được gọi khi request tới middleware.

Tiếp theo, chúng ta tạo một class Middleware
```
public class CustomeMiddleware
    {
        private readonly RequestDelegate _next;
 
        public CustomeMiddleware(RequestDelegate next)
        {
            _next = next;
        }
 
        public async System.Threading.Tasks.Task Invoke(HttpContext context)
        {
            await context.Response.WriteAsync("<div> before - CustomeMiddleware </div>");
            await _next(context);
            await context.Response.WriteAsync("<div> after - CustomeMiddleware </div>");
        }
    }
```
Trong constructor, chúng ta sẽ lấy tham chiếu của middleware tiếp theo trong pipeline. Chúng ta lưu nó trong biến local tên là _next
```
        public CustomeMiddleware(RequestDelegate next)
        {
            _next = next;
        }
```

Tiếp theo chúng ta sẽ khai báo phương thức Invoke, nó sẽ nhận tham chiếu đến HttpContext. Chúng ta sẽ viết ra một vài dòng chữ vào response và sau đó gọi middleware tiếp theo sử dụng await _next(context).
```
        public async System.Threading.Tasks.Task Invoke(HttpContext context)
        {
 
            await context.Response.WriteAsync("<div> Hello from Simple Middleware </div>");
            await _next(context);
            await context.Response.WriteAsync("<div> Bye from Simple Middleware </div>");
 
        }
```
Cuối cùng, chúng ta cần đăng ký middleware trong request pipeline. Chúng ta có thể sử dụng phương thức UseMiddleware trong file **Startup.cs** như dưới đây:
```
app.UseMiddleware<SimpleMiddleware>();
```
### Tài liệu tham khảo
[1]. [Middleware là gì? Topdev](https://topdev.vn/blog/middleware-la-gi/)

[2]. [ASP.NET Core Middleware](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-6.0)