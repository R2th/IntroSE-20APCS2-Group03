Đối với lập trình viên ASP.NET, việc triển khai ứng dụng web trên IIS là khá quen thuộc và dễ dàng. Từ khi ASP.NET Core ra đời mang đến nhiều thay đổi về tính năng cho lập trình viên, đi kèm với đó cũng có một số sự khác biệt trong việc triển khai nó trên IIS. Bài viết này tôi muốn giới thiệu tới các bạn từng bước để thực hiện việc này.

### Yêu cầu môi trường
- Visual studio 2017 community edition
- .Net Core 2.0 SDK 
- Đảm bảo rằng bạn đã cho phép **Web Server (IIS)** role và thiết lập các role services.

# 1. Cài đặt .NET Core Windows Server Hosting Bundle
Ở thời điểm .Net Core ra đời thì IIS không biết làm thế nào để chạy những ứng dụng .Net Core. Như vậy bạn cần thông báo cho IIS để cài đặt môi trường cho ứng dụng .NET Core.
Về điều này, ta cần cài đặt **.Net Core Windows Server Hosting bundle** nó sẽ cài đặt .NET Core runtime, libraries và ASP.NET Core module cho IIS.
Các bạn vui lòng chú ý điều này là một bước rất quan trọng và bạn phải cài đặt bundle trước khi publish ứng dụng trên IIS.

Bạn có thể download theo link sau [.NET Core Windows Server Hosting bundle](https://aka.ms/dotnetcore-2-windowshosting).

Tiếp theo đó cài đặt nó và đợi cho đến khi hoàn thành

![](https://images.viblo.asia/aa2a07e5-0df3-4a50-bfae-01422e0ea658.png)

Khi cài đặt hoàn thành, hoặc là khởi động lại hệ thống hoặc là chạy tuần tự các lệnh bên dưới trong CMD:
```
net stop was /y
net start w3svc
```

Lệnh đầu tiên sẽ dừng dịch vụ World Wide Web publishing và lệnh thứ hai sẽ bắt đầu dịch vụ này trở lại.

# 2. Tạo ứng dụng web sử dụng .Net Core 2.0 template trong VS 2017

Khi bạn đã có tất cả những cài đặt cần thiết, mở Visual Studio 2017 -> Create New Project -> Chọn Core Web application:

![](https://images.viblo.asia/abe21785-59e9-457d-ab8a-7e2157c0859f.png)

Click chọn **Web Application** trong cửa sổ tiếp theo và click OK:

![](https://images.viblo.asia/eee85864-e9c2-4e2e-95fa-788bd7142c70.png)

Visual Studio sẽ tự tạo cấu trúc dự án mà có thể chạy ngay lực tức cho bạn

Click chuột phải trên Solution và click **Publish**:

![](https://images.viblo.asia/ee02c180-8ecb-4f99-8e44-6c28dde5f07c.png)

Trong cửa sổ tiếp theo, click trên Folders và đưa ra đường dẫn folder. Giả sử ta tạo thư mục Publish trong wwwroot:

![](https://images.viblo.asia/e0eb42d2-0470-4912-ace9-b519af0f702a.png)

Nó sẽ publish code theo đường dẫn đã chọn, dưới đây là code sau khi publish:

![](https://images.viblo.asia/a35a5140-160e-41f1-8373-41a770ac4914.png)

# 3. Tạo Website trên IIS
Mở **IIS Manager** và thêm mới website:

![](https://images.viblo.asia/cd0a0a1f-b833-4db9-ad1d-f9cf85f2aec1.png)

Bây giờ đi đến **Application Pools**, mở cửa sổ **Edit Application Pool** bằng click chuột phải trên app pool của website và chọn Basic Setting và đặt **.NET CLR version** là **No Managed Code**:

![](https://images.viblo.asia/b1f3ff73-1f04-468f-a01a-34bd7e3a1524.png)

# 4. Kiểm tra .Net Core Windows Server Hosting bundle đã được cài đặt chưa
Bước tiếp theo là kiểm tra liệu hosting bundle chúng ta đã cài đặt trước đó đã có chưa.
Để làm điều này, click trên Modules (trong **IIS Manager**) của trang web ta vừa tạo và tìm **AspNetCoreModule**. Nếu nó được tìm thấy có nghĩa là IIS bây giờ đã biết làm thế nào để chạy ứng dụng .Net Core.

![](https://images.viblo.asia/fbd74936-7601-47f3-8522-4f7ebee5f795.png)

Chúng ta có thể thắc mắc về **AspNetCoreModule**, nó là gì vậy ?

-  **ASP.NET Core Module**  cho bạn chạy ứng dụng ASP.NET Core trên IIS vì điều đó tốt cho bảo mật, khả năng quản lý và rất nhiều thứ khác.
- Mặt khác, **ASP.NET Core Module** cho bạn chạy ứng dụng ASP.NET Core sử dụng **Kestrel** cái mà tốt về mặt tốc độ, hiệu năng.
- Vì vậy, nó mang lại lợi ích cho cả hai công nghệ cùng một lúc.
- ASP.NET Core xử lý tất cả lưu lương từ bên ngoài tới IIS và hành động như một **reverse proxy** cái mà biết làm thế nào giao lưu lượng tới ứng dụng ASP.NET Core.

Bạn chú ý rằng khi chúng ta đã phát hành code tới một thư mục cụ thể, web.config đã được tạo, bạn có thể thấy aspNetCorre dưới **Handler** section như bên dưới. Điều này chỉ được sử dụng khi việc triển khai ứng dụng tới IIS và nó đăng kí **AspNetCoreModule** như một HTTTP handler.

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <system.webServer>
        <handlers>
            <strong><add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModule" resourceType="Unspecified" /></strong>
        </handlers>
        <aspNetCore processPath="dotnet" arguments=".\NeelCorePublishIIIS.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" />
    </system.webServer>
</configuration>
```

Mọi thứ đã ổn, giờ bạn có thể nhìn thấy thành quả:

![](https://images.viblo.asia/a1e48571-fc54-4998-9e00-fcd9b2f460be.png)

Hy vọng bài viết sẽ giúp ích được các bạn.

Link gốc của tác giả: [Deploy .Net Core application to IIS: Step by step guide](https://neelbhatt.com/2018/01/30/deploy-net-core-application-to-iis-step-by-step-guide/)