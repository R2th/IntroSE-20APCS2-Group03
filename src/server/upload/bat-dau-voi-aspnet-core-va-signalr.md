Bài viết này hướng dẫn những bước cơ bản xây dựng một ứng dụng real-time sử dụng SignalR. Bạn học làm thế nào để:

- Tạo một project web.
- Thêm thư viện SignalR client.
- Tạo một SignalR hub.
- Cấu hình project để sử dụng SignalR.
- Thêm code gửi message từ bất kì client nào đến tất cả các client đã kết nối.

Cuối cùng, bạn sẽ có một ứng dụng chat làm việc:
![](https://images.viblo.asia/e0ce7707-2b30-46cc-ba88-9b5c657eba0f.png)

# Chuẩn bị môi trường
- Visual Studio 2017  phiên bản 15.9 hoặc mới hơn với ASP.NET và web development.
- .NET Core SDK 2.2 hoặc mới hơn.

# Tạo một project web

- Từ menu, chọn **File** > **New Project**.
- Trong **New Project** dialog, chọn **Installed** > **Visual C#** > **Web** > **ASP.NET Core Web Application** . Tên project là **SignalRChat**.

![](https://images.viblo.asia/7f7745d2-251e-46ff-b59a-353b9f797297.png)

- Chọn Web Application để tạo project sử dụng Razor Pages.
- Chọn target framework là .NET Core, chọn ASP.NET Core 2.2, và click OK.
![](https://images.viblo.asia/833e3f3e-9d51-4209-84ee-484a2b02f1ec.png)

# Thêm thư viện SignalR client
Thư viện SignalR server được đưa vào trong **Microsoft.AspNetCore.App** metapackage. Thư viện JavaScript client không được tự động thêm vào trong project. Trong hướng dẫn này, bạn sử dụng **Library Manager** (LibMan) để nhận thư viện client từ **ubpkg**. **unpkg** là một content delivery network (CDN) cái mà có thể phát hành bất kì cái gì được tìm thấy trong npm (Node.js packge manager).

- Trong **Solution Explorer**, right-click project, và chọn **Add** > **Client-Side Library**.
- Trong cửa sổ **Add Client-Side Library** , mục **Provider** chọn **unpkg**. 
- Về Library, gõ @aspnet/signalr@1, và chọn version mới nhất không phải phiên bản preview.

![](https://images.viblo.asia/403b7fc4-b394-4f31-9eb6-1f42927b64b9.png)

- Chọn **Choose specific files**, mở  thư mục ```dist/browser``` , và chọn signalr.js and signalr.min.js.
- Thiết lập Target Location tới *wwwroot/lib/signalr/*, và chinj **Install**.
![](https://images.viblo.asia/a8d7b65a-e218-4cb6-8dbb-7c73a9f4e310.png)

Libman tạo một thư mục wwwroot/lib/signalr và copy file đã chọn tới nó.

# Tạo một SignalR hub
Một hub là một class mà phục vụ như một high-level pipeline để xử lý giao tiếp client-server.

- Trong thư mục project SignalRChat, tạo một thư mục Hubs.
- Trong thư mục Hubs, tạo một file ChatHub.cs với code bên dưới:

```csharp
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
```
Class ```ChatHub``` kế thừa từ class SignalR ```Hub```. Class ```Hub``` quản lý những kết nối, nhóm và message.
Phương thức ```SendMesssage``` có thể được gọi bởi một client đã kết nối để gửi một message đến tất cả các clients. Code JavaScript gọi phương thức được chỉ ra ở bước sau trong bài hướng dẫn này. Code SignalR là bất đồng bộ để cung cấp tối ta khả năng mở rộng.

# Cấu hình SignalR
SignalR server phải được cấu hình để thông qua SignalR request đến SignalR.
- Thêm code được đánh dấu nổi bật bên dưới tới file ```StartUp.cs
```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SignalRChat.Hubs;

namespace SignalRChat
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>("/chatHub");
            });
            app.UseMvc();
        }
    }
}
```
Những thay đổi này thêm SignalR tới hệ thống ASP.NET Core depandency Injection và middleware pipeline.

# Thêm SignalR client code
Thay thế nội dung trong ```Pages/Index.cshtml``` với code bên dưới:

```html
@page
<div class="container">
    <div class="row">&nbsp;</div>
    <div class="row">
        <div class="col-6">&nbsp;</div>
        <div class="col-6">
            User..........<input type="text" id="userInput" />
            <br />
            Message...<input type="text" id="messageInput" />
            <input type="button" id="sendButton" value="Send Message" />
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <hr />
        </div>
    </div>
    <div class="row">
        <div class="col-6">&nbsp;</div>
        <div class="col-6">
            <ul id="messagesList"></ul>
        </div>
    </div>
</div>
<script src="~/lib/signalr/dist/browser/signalr.js"></script>
<script src="~/js/chat.js"></script>
```

Giải thích code bên trên:

- Tạo các textbox cho name và message cùng với button submit
- Tạo một list với ```id="messageList"``` cho việc hiển thị message được nhận từ SignalR Hub.
- Thêm file script tham chiếu đến SignalR và code ứng dụng chat ```chat.js``` cái mà chúng ta tạo ở bước tiếp theo

- Trong thư mục ```wwwroot/js```, tạo một file ```chat.js``` với code bên dưới:
```js
"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function(){
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
```

Giải thích một chút về code trên:

* Tạo và bắt đầu một kết nối.
* Thêm vào button submit một handler để gửi message tới hub.
* Thêm đối kết nối một handler để nhận message từ hub.

# Chạy ứng dụng
- Nhấn CTRL + F5 để chạy ứng dụng ở chế độ không debug.
- Copy url từ thanh địa chỉ trình duyệt, mở một trình duyệt khác hoặc tab mới và paste url vào thanh địa chỉ.
- Chọn một trình duyệt, gõ một tên và message và click button ```Send Message```.

Ngay lập tức tên và message đồng thời hiện thị ở cả 2 trình duyệt

![](https://images.viblo.asia/e0ce7707-2b30-46cc-ba88-9b5c657eba0f.png)

# Tổng kết

Đây là hướng dẫn cơ bản dành cho các bạn mới bất đầu với SignalR, nhưng đã có kiến thức về ASP.NET core. Các bước thực hiện khá đơn giản và dễ hiểu đúng không các bạn. Hy vọng bài viết mang đến cho các bạn những điều bổ ích.

###
**Bài viết được dịch từ nguồn** [Tutorial: Get started with ASP.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-2.2&tabs=visual-studio)

**Code ví dụ từ Microsoft**: https://github.com/aspnet/Docs/tree/master/aspnetcore/tutorials/signalr/sample