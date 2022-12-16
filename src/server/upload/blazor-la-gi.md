# 1. WebAssembly thay đổi cuộc chơi
Trong quá khứ, JavaScript là độc quyền trong việc phát triển web phía client-side. Với những lập trình viên, chúng ta có những lựa chọn các frameworks (ví dụ như Angualar, React,..) nhưng cuối cùng chúng luôn được build thành JavaScript. WebAssembly thay đổi điều đó.

Nó là low-level giống như ngôn ngữ assembly với thư viện nhỏ ngọn cái mà cung cấp một cách chạy code được viết trong nhiều ngôn ngữ khác nhau trên web gần với tốc độ native.

Trong phạm vi bài viêt này chính ta không đi vào chi tiết tìm hiểu về WebAssembly. Nếu bạn muốn học thêm về nó, dưới đây là những tài liệu quan trọng cần phải tìm hiểu:
- [webassembly.org](https://webassembly.org)
- [WebAssembly on MDN](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly on GitHub](https://github.com/webassembly)
- [WebAssembly Web API](https://www.w3.org/TR/wasm-web-api-1/)

# 2. WebAssembly và C#

JavaScript là một ngôn ngữ mạnh mẽ nhưng nó có những nhược điểm, ví dụ bản thân nó khó khăn để lập trình hướng đối dẫn đến việc tốn kém trong bảo trì, fix bug. Điều này có thể được khắc phục bởi TypeScript. Tuy nhiên, sử dụng C# cho client side trong phát triển web đang thuyết phục được nhiều người bởi vì những lý do bên dưới:
- C# là một ngôn ngữ rất mạnh và nhiều tính năng cái mà đã chứng minh được thành công cho nhiều projects và teams lớn nhỏ khác nhau. 
- Code C# là dễ bảo trì và sử dụng lại.
- ASP.NET Core is a powerful programming framework for server-side web development. Enabling C# on the client would allow teams to use a common technology stack on server and client.
- ASP.NET Core là một framework mạnh mẽ cho phát triển web phía server. Việc cho phép C# trên client sẽ cho phép teams sử dụng công nghệ phổ biến trên server và client.

Mono là một open source của Microsoft .NET Framework dựa trên chuẩn ECMA cho C# và Common Language Runtime (CRL).Trong năm 2017, team Mono đã phát hành những kết quả đầu tiên với nỗ lực của họ để mang Mono với C#, CLR và .Net Framework tới WebAssembly.


Hình ảnh dưới đây để hình dùng tổng quan kiến trúc của Blazor:

![](https://images.viblo.asia/3dfc4842-5d94-43b1-98e6-0be51be39e0c.jpg)

Hình ảnh bên dưới minh họa process khởi động của ứng dụng Blazor trong Chrome. Ứng dụng bao gồm JavaScript của Blazor (blazor.js). Nó sử dụng thư viện JavaScript của Mono (mono.js) để khởi động Mono runtime (modo.wasm) trong WebAssembly. Tiếp theo nó tải dll của app (WebApplication1.dll) và các dll của .NET Framework.

![](https://images.viblo.asia/6d14395d-f2e0-474b-a952-75080e92b52a.png)

# 3. Razor

Razor là một template engine cái mà biên dịch C# với HTML để tạo một nội dung web động.
Razor có root của nó trên server nơi mà thông thường được sử dụng để tạo HTML động. Trong Blazor, Razor được sử dụng phía client. Cụ thể hơn, Razor engine chạy trong khi việc biện dịch để tạo code C# từ Razor templates.

Hình ảnh bên dưới minh họa processs. Bên phải, bạn thấy Razor template. Bên trái, bạn thấy code C# cái mà được tạo từ template này.

![](https://images.viblo.asia/095edf3b-edca-40fd-a162-ca4648341dba.png)

# 4. HTML Output
### 4.1 Tổng quan

Không giống như các nên tảng cũ như Silverlight, nó không đem đến rendering engine của riêng nó để vẽ các pixels trên màn hình. Blazor sử dụng DOM của trình duyệt để hiển thị dữ liệu.
Tuy nhiên, code C# đang chạy trên WebAssembly không thể truy cập trực tiếp đến DOM. Nó phải đi qua JavaScript. Tại thời điểm của bài viết, process làm việc giống như thế này:

![](https://images.viblo.asia/093acaee-6ffd-457e-92d2-4566f8321f92.png)


- Phần C# của Blazor tạo một Render Tree cái mà là một cây của UI items.
- Render tree được truyền từ WebAssembly đến Rendering trong phần JavaScript của Blazor. Nó thực thi những thay đổi DOM tương ứng.
- Bất kì khi nào người dùng tương tác với DOM (ví dụ click chuột, enter text,..), phần JavaScript của Blazor sẽ gửi một event tới C#.
- Event là được xử lý bởi code C# của ứng dụng web.
- Nếu DOM thay đổi, một Render Batch với tất cả UI tree khác nhau (không phải thực thể UI tree) được built trong C# và đưa tới phương thức JavaScript Blazor cái mà áp dụng DOM thay đổi.

Bởi vì Blazor là đang sử dụng DOM tiêu chuẩn của trình duyệt, tất cả các cơ chế DOM thông thường bao gồm CSS vẫn tiếp tục làm việc.

### 4.2 Renderer

Trong Blazor, renders (class dẫn xuất từ abtract class ```Microsoft.AspNetCore.Blazor.Rendering.Renderer```, xem source trên [Github](https://github.com/aspnet/Blazor/blob/release/0.1.0/src/Microsoft.AspNetCore.Blazor/Rendering/Renderer.cs)) cung cấp cơ chế cho việc render kế thừa những components (các class implement ```Microsoft.AspNetCore.Blazor.Components.IComponent```, xem source code trên [Github](https://github.com/aspnet/Blazor/blob/release/0.1.0/src/Microsoft.AspNetCore.Blazor/Components/IComponent.cs)), việc gửi các event tới chúng và việc thông báo khi giao diện người dùng được cập nhật.

Cho việc chạy trên trình duyệt, Blazor đến với một browser renderer (Microsoft.AspNetCore.Blazor.Browser.Rendering.BrowserRenderer, xem source code trên [Githib](https://github.com/aspnet/Blazor/blob/release/0.1.0/src/Microsoft.AspNetCore.Blazor.Browser/Rendering/BrowserRenderer.cs))

# 5. Bắt đầu với Blazor
Tại thời điểm của bài viết, bản phát hành đầu tiên của Blazor là preview 0.1.0. Để sử dụng nó:
- Cài đặt [.NET Core 2.1 SDK](https://www.microsoft.com/net/download)
- Cài đặt phiên bản mới nhất của của [Visual Studio 2017 (15.7 hoặc mới hơn)](https://www.visualstudio.com/vs/preview) với web development.
- Cài đặt [ASP.NET Core Blazor Language Services](https://marketplace.visualstudio.com/items?itemName=aspnet.blazor) extention từ **Visual Studio Marketplace**.

**Mở visual studio 2017 mới nhất, chọn New -> Project**

![](https://images.viblo.asia/df62795a-3a0b-4b56-9b4a-56934deca241.png)

**Tiếp theo, chọn Blazor**

![](https://images.viblo.asia/14b048ca-8a3e-4272-a3a5-d9ef910d3714.png)

Ok, như vậy chúng ta đã tạo mới một ứng dụng web sử dụng Blazor. Mở file FetchData.cshtml ta có thể thấy code sau:

```csharp
@functions {
    WeatherForecast[] forecasts;

    protected override async Task OnInitAsync()
    {
        forecasts = await Http.GetJsonAsync<WeatherForecast[]>("sample-data/weather.json");
    }

    class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureC { get; set; }
        public int TemperatureF { get; set; }
        public string Summary { get; set; }
    }
}
```

Điểm đặc biệt ở đây chính là code C# lại được sử dụng như code client và được sử dụng như code JavaScript.

Cuối ta chạy web để xem kết quả như thế nào, các bạn mở command line và gõ các lệnh sau:
```
dotnet build
dotnet run
```

Gõ trên thanh địa chỉ trình duyệt, ví dụ http://localhost:54549 tùy thuộc cổng mà server cung cấp. Dưới đây là kết quả:

![](https://images.viblo.asia/5b7318e5-e3f7-44cc-a299-07778836f5aa.png)

# 6.Kết luận
JavaScript có lẽ đã quá quen thuộc và không thể thiếu đối với lĩnh vực phát triển ứng dụng web. Tuy nhiên Blazor ra đời trên công nghệ WebAssembly với rất điều thú vị và ưu điểm đáng để các lập trình viên tìm hiểu về nó. Rất có thể trong tương lai nó sẽ là một lựa chọn bên cạnh JavaScript trong việc phát triển client-side. Hy vọng bài viết mang đến cho các bạn những điều thú vị.

Bài viết tham khảo và lược dịch từ các bài viết dưới đây, các bạn có thể tham khảo thêm tại bài viết gốc:

- [WHAT IS BLAZOR ?](https://learn-blazor.com/getting-started/what-is-blazor/)
- [Getting the Blazor Bits](https://learn-blazor.com/getting-started/getting-blazor/)