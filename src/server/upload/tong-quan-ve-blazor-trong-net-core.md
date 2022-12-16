Hi anh em,

Hôm nay chúng ta sẽ cùng nhau tìm hiểu về **Blazor**. Hy vọng được thảo luận cùng anh em đang học Blazor. Không để mọi người chờ lâu, bắt đầu nào!

Ở bài này mình sẽ giới thiệu về các phần:
- Blazor là gì?
- Blazor WebAssembly
- Blazor Server
- Tổng kết và so sánh 2 loại model hosting models

### 1. Blazor là gì?
**Ngữ cảnh:** trong dự án thường sẽ sử dụng nhiều ngôn ngữ như c#(.net core) để làm việc ở phía backend và Javascript (các thư viện, framework như reactjs, angular) để làm việc ở phía frontend
Muốn làm việc, tương tác  được với giao diện bắt buộc phải biết kiến thức về ngôn ngữ Javascript. 

**Mong muốn:** Sử dụng ngôn ngữ c# có thể lập trình ở cả backend và frontend. Có thể thực hiện các tương tác UI bằng c# code. Vậy là Blazor ra đời để đáp ứng mong muốn này.

**Blazor** là một web framework cho phép lập trình viên tương tác, làm việc với UI bằng c# code.

Blazor cho phép:
- Tương tác với UI bằng c# code, không yêu cầu Javascript
- Sử dụng Razor Component (razor cho phép trộn code c# và html)
- Tận dụng sức mạnh của thư viện, framework .net trong ứng dụng Blazor
- Có 2 loại ứng dụng Blazor: **Blazor WebAssembly**(client side)  và **Blazor Server**(server side)

Tiếp theo chúng ta sẽ đi vào chi tiết 2 loại này, cách hoạt động, ưu nhược điểm.

### 2. Blazor WebAssembly (client side blazor)
![image.png](https://images.viblo.asia/8257f8a5-ba40-490a-9f97-9fd718fa928c.png)

Đầu tiên để hiểu được Blazor WebAssembly là gì? Ta phải hiểu khái niệm của WebAssembly. Ở đây mình chỉ đề cập ở mức định nghĩa. Bạn nào muốn tìm hiểu thêm có thể google thêm ^^

**WebAssembly** (gọi tắt là **Wasm**) là một dạng mã máy nhị phân (bytecode). Các đoạn mã code viết bằng các ngôn ngữ như (C/C++, Rust, C#...) sẽ biên dịch thành dạng mã nhị phân nhờ vào Wasm mà trình duyệt (browser) có thể hiểu được. Hầu hết các trình duyệt hiện đại đều hỗ trợ Wasm

**Blazor WebAssembly** hay còn gọi là **Client Side Blazor**. Đúng như tên gọi Blazor WebAssembly chạy toàn bộ ứng dụng ở phía client trên trình duyệt dựa trên WebAssembly.

Blazor WebAssembly sẽ download tất cả mọi thứ về trình duyệt(Browse) bao gồm:
- HTML, CSS, Javascript
- Các .NET DLL
- .NET Runtime

**Điểm mạnh của Blazor WebAssembly: (Benefits)**
- Tốc độ ứng dụng web rất nhanh bởi code c# được biên dịch thành các đoạn mã nhị phân nhờ WebAssembly, rất gần với ngôn ngữ máy mà trình duyệt hiểu được.
- Website có thể hoạt động offline bởi toàn bộ mọi thứ đều được tải về trình duyệt
- Hỗ trợ hầu hết các trình duyệt hiện đại (trừ internet explorer) mà không cần cài thêm bất kỳ plugin nào.
- Tận dụng tài nguyên ở client nên không cần server quá mạnh, có thể lấy các file static mà không cần vào server.
- Server không cần cài .net core.

**Điểm yếu của Blazor WebAssembly:(Downsides)**
- Không chạy trên các trình duyệt cũ (internet explorer)
- Yêu cầu WebAssembly ở browse (các trình duyệt hiện đại đều hỗ trợ)
- Quá nhiều file phải download như .net runtime, tốn thời gian tải trang. (Từ lần thứ 2 nhờ có cơ chế cache nên sẽ cải thiện tốc độ hơn lần 1)
- Chưa hỗ trợ full debugging
- Bởi vì mọi thứ đều tải về client side nên vấn đề bảo mật cần cân nhắc. Ví dụ khi bạn có secret key bạn lưu vào file và store nó ở client rất nguy hiểm.
Có thể sử dụng các kỹ thuật để mã hóa(encrypt secret) nhưng vẫn không an toàn.

**1 số file trong cấu trúc của project webAssembly**

- **index.html** chứa **blazor.webassembly.js** javascript file
File này sẽ được download tới browser và chịu trách nhiệm download toàn bộ app assets bao gồm webAssembly byteCode và assembly của chính nó.
```csharp
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>BlazorWebAssembly</title>
    <base href="/" />
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/app.css" rel="stylesheet" />
</head>
<body>
    <app>Loading...</app>

    <div id="blazor-error-ui">
        An unhandled error has occurred.
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>
    <script src="_framework/blazor.webassembly.js"></script>
</body>
</html>

```

- TIếp theo ở folder **Pages** sẽ chưa các **razor component**

![image.png](https://images.viblo.asia/7ce45b85-94e8-4edf-a9ce-b8413101a18b.png)

### 3. Blazor Server

![image.png](https://images.viblo.asia/9888be27-de0f-46cb-b42d-8028f51e2ab1.png)

Đúng như tên gọi **Server-Side Blazor** toàn bộ code của ứng dụng sẽ chạy ở phía Server.

Balzor app xây dựng trên nền ASP.NET core và giao tiếp với browser client qua **SignalR** - hỗ trợ realtime để server gửi request và update thông tin tới client.

Ví dụ: Khi user click thêm khóa học button trên browser sẽ gửi data từ client tới server thông qua SignalR.
Sau khi Server nhận thông tin sẽ xử lý logic nghiệp vụ (ví dụ lưu vào database) và trả về kết quả từ server tới client thông qua signalR, client cập nhật kết quả vào DOM.

- Server application sẽ giữ trong memory mọi lúc. Khi client có tương tác sẽ gửi 1 request để tạo instance cho user đó.
Nhiều user tương tác thì sẽ tạo nhiều instance. Server-side blazor cho phép ứng dụng chạy trên server.

- Server blazor rất tốt cho client có tài nguyên ít, giới hạn(vì chạy toàn bộ trên server) hoặc browse không hỗ trợ WebAssembly.

**Điểm mạnh của Server-Side Blazor: (Benefits)**
- Số lượng file tải về browser rất ít vì toàn bộ chạy ở server
- Tất cả chạy ở server nên có thể tận dụng sức mạnh của server-side api(các framework, library ở server, api của .net)
- Hỗ trợ full debugging
- Hỗ trợ tất cả trình duyệt

**Điểm yếu của Server-Side Blazor:(Downsides)**
- Không hỗ trợ offline vì phải giữ kết nối liên tục giữa client và server qua SignalR
- Nếu network chậm thì sẽ web sẽ chậm do server giao tiếp với client qua signalR
- Tính mở rộng, mặc dù không phải vấn đề lớn. Microsoft đưa ra hướng dẫn blazor server side hỗ trợ đồng thời hàng ngàn user.
 Khi client có tương tác sẽ gửi 1 request để tạo instance cho user đó. Server application sẽ giữ trong memory mọi lúc.
Nhiều user tương tác thì sẽ tạo nhiều instance.

**1 số file trong cấu trúc của project  Server-Side Blazor**

- **_Host.cshtml** sẽ chứa code để render html và thiết lập kết nối giữa client và server (websocket)

![image.png](https://images.viblo.asia/05d05ec3-2794-4b03-afce-95026f08fe1e.png)



- Tương tự như ở WebAssembly ở folder **Pages** sẽ chứa các razor component

![image.png](https://images.viblo.asia/828b96ff-e284-4cdb-a66e-0f0ab89d7a68.png)

- Trong **startup.cs** class
- Chứa service để chạy được blazor server
```csharp
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddServerSideBlazor();
            services.AddSingleton<WeatherForecastService>();
        }
```
-  Tạo SingalR hub để có thể connect giữa server và client (websocket client)
```csharp
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapBlazorHub();
                endpoints.MapFallbackToPage("/_Host");
            });
```

**Tổng kết:** 

Qua bài viết trên ta đã hiểu được định nghĩa **Blazor**, phân biệt 2 loại ứng dụng Blazor: **WebAssembly Blazor** và **Blazor server**, điểm mạnh điểm yếu của từng loại và 1 số file trong cấu trúc project Blazor.

Blazor là 1 web framework cho phép developer tương tác với UI bằng c# code, không yêu cầu Javascript, sử dụng razor components(mix giữa html và c#), 
sử dụng các thư viện của .net trong blazor application. Webassembly hỗ trợ tất cả trình duyệt hiện đại bao gồm web và mobile browse

![image.png](https://images.viblo.asia/636a1862-0063-477d-bb30-4538a3ba824b.png)



Nếu có câu hỏi hay vấn đề muốn thảo luận trao đổi thì hãy comment dưới bài viết nhé. Hy vọng được thảo luận cùng anh em.

Nếu thấy bài viết hay và bổ ích thì cho mình xin 1 vote nhé. Cảm ơn và chúc các anh em một ngày làm việc tuyệt vời!

**Tham khảo:**

https://app.pluralsight.com/library/courses/blazor-big-picture/table-of-contents

https://docs.microsoft.com/en-us/aspnet/core/blazor/?WT.mc_id=dotnet-35129-website&view=aspnetcore-5.0