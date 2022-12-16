Một số ứng dụng web cần hiển thị dữ hiện thời gian thực (real-time). Trong thời gian sớm nhất có thể dữ liệu mới trên server ngay lập tức cần được hiển thị đến người dùng. Theo truyền thống các lập trình viên thường sử dụng cách thăm dò (polling) server định kì để kiểm tra có dữ liệu mới hay không. Cách tiếp cận này có nhược điểm của riêng nó và có thể chứng minh không phù hợp ở một số trường hợp nhất định. Sẽ không tốt sao nếu server thông báo cho client dữ liệu mới, thay vì client kiểm tra định kỳ với server ? Đó chính là những gì **HTML5 Server Sent Event (SSE)** cho phép bạn làm. Trong bài viết này bạn sẽ tìm hiểu **Server Sent Events** là gì và làm thế nào phát triển một ứng dụng ASP.NET Core nhận dữ liệu real-time từ server.

# Ajax polling và SSEs

Ứng dụng web cần hiển thị dữ liệu real-time thường sử dụng công nghệ "polling" (thăm dò) để lấy dữ liệu mới nhất từ server. Ví dụ, bạn có thể phát triển một ứng dụng ASP.NET web form có dùng Ajax request định kì đến server để kiểm tra liệu có dữ liệu mới hay chưa. Theo đó web form sẽ render chính nó và hiển thị dữ liệu mới nhất. Tuy nhiên, công nghệ này có những nhược điểm sau:

- Công nghệ "polling" tạo ra quá nhiều request đến server nếu như tần suất polling là ngắn. Điều này sẽ gây ra gánh nặng cho server.
- Khi các hoạt động polling được thực hiện thì không có cách nào để nói cho client biết liệu dữ liệu mới đã sẵn sàng trên server chưa. Client có thể giữ việc polling server định kì ngay cả khi không có dữ liễu nào có sẵn. Đây là chi phí không cần thiết trên toàn bộ hệ thống.
- Công nghệ polling ít chính xác hơn. Khi tần suất polling được quyết định bởi client và nó độc lập với sự sẵn có dữ liệu của bên server, nó có thể xảy ra trường hợp mà dữ liệu đã sẵn có trên server nhưng client chỉ có thể hiển thị dữ liệu mới sau một vài lần gián đoạn.

**Server Sent Events (SSEs)** được gửi đi bởi server. Sử dụng SSE bạn có thể thông báo tới ứng dụng client bất kì khi nào có những điều thú vị xảy ra trên server như có dữ liệu mới chẳng hạn. Và client có thể có các hành động thích hợp, như hiển thị dữ liệu mới tới người dùng.

# Ví dụ về việc sử dụng SSE với ASP.NET Core

Để hiểu làm thế nào SSE có thể sử dụng trong ứng dụng ASP.NET Core bạn sẽ phát triển một ứng dụng như bên dưới:


![](https://images.viblo.asia/f376ac80-3133-407d-b09d-f7e688ca9d79.png)

Ứng dụng có một trang với button **Start Listening**. Click button này sẽ mở một kết nối với một **Event Source**  được chỉ định. Event source có trách nhiệm gửi thông báo dữ liệu trở lại trình duyệt. Sau khi event source gửi dữ liệu thì kết nối đến event source sẽ bị đóng lại.

Bắt đầu bằng việc tạo mới ứng dụng web ASP.NET Core và thiết lập nó như bình thường bởi việc thêm các thư mục khác nhau và bắt đầu code.

# NorthwindDbContext và class Customer
Chúng ta cần lấy dữ liệu từ bảng ```Customer``` và cơ sở dữ liệu ```Northwind```. Dữ liệu này tiếp đó sẽ được gửi đến client. Như vậy, thêm các class ```NorthwindDbContext``` và ```Customer``` như sau:

```csharp
[Table("Customers")]
public class Customer
{
    [Key]
    public string CustomerID { get; set; }
    public string CompanyName { get; set; }
    public string ContactName { get; set; }
    public string Country { get; set; }
}
```

```csharp
public class NorthwindDbContext:DbContext
{
    public NorthwindDbContext(
        DbContextOptions<NorthwindDbContext> 
        options) : base(options)
    {

    }

    public DbSet<Customer> Customers { get; set; }

}
```
Class ```Customer bao``` gồm 4 thuộc tính public được đặt tên ```CustomerID```, ```CompanyName```, ```ContactName``` và ```Country```. Class ```NorthwindContext``` quản lý ```Customer DBSet```.

```DbContext``` sẽ inject từ class ```Startup.cs``` như sau:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc();

    services.AddEntityFrameworkSqlServer();

    services.AddDbContext<NorthwindDbContext>
(o => o.UseSqlServer(
"data source=.;initial catalog=Northwind;integrated 
security=true;multipleactiveresultsets=true;"));

}
```

```DbContext``` được nhận trong ```HomeController``` như code bên dưới:

```csharp
public class HomeController : Controller
{
    private NorthwindDbContext db;

    public HomeController(NorthwindDbContext db)
    {
        this.db = db;
    }
}
```

### ```Process()``` action

Ngoài action ```Index()```, ```HomeController``` sẽ có thêm một action để làm việc với event source. Đó là action ```Process()```:

```csharp
public IActionResult Process()
{
    StringBuilder sb = new StringBuilder();
    foreach (Customer obj in db.Customers.
OrderBy(i => i.CustomerID).Take(5))
    {
        string jsonCustomer = 
JsonConvert.SerializeObject(obj);
        sb.AppendFormat("data: {0}\n\n", jsonCustomer);
    }
    return Content(sb.ToString(), "text/event-stream");
}
```

Action ```Process()``` tạo một ```StringBuilder``` dành cho việc lưu trữ dữ liệu cái mà được gửi trở lại trình duyệt. Vòng lặp đơn giản duyệt qua ```Customer DbSet``` và nắm từng đối tượng ```Customer``` riêng biệt. Đối tượng ```Customer``` này được chuyển đổi thành JSON sử dụng ```Json.Net```. Phương thức ```SerializeObject()``` chấp nhận một đối tượng .NET và trả về dữ liệu JSON tương ứng. Do vậy dữ liệu JSON thu được sẽ được đẩy vào đối tượng ```StringBuilder```. Chú ý dữ liệu được đẩy vào ```StringBuilder``` như thế nào.

Cũng vậy chú ý dữ liệu được trả về từ action ```Process()``` như thế nào. Phương thức ```Content()``` của class base Controller có 2 tham số (dữ liệu gửi đến trình duyệt và ```Content-Type``` của nó). Dữ liệu đến từ ```StringBuilder```. ```Content-Type``` được chỉ định như ```text/event-stream```. Content type này là bắt buộc với SSEs. Đến đây chúng ta đã hoàn thành code bên phía server. Hãy chuyển qua phần code cho client.

### Index view

Index view bao gồm một form đơn gian như dưới đây:

```html
<form>
    <input type="button" id="btnListen" 
           value="Start Listening" />
    <br /><br />
    <div id="headerDiv" class="tickerheading"></div>
    <div id="targetDiv" class="ticker"></div>
    <div id="footerDiv" class="tickerfooter"></div>
</form>
```

Form chứa button **Start Listening** và 3 thẻ ```<div>```. ```headerDiv``` hiển thị header message, ```footerDiv``` hiển thị footer message và ```tagerDiv``` hiển thị dữ liệu trả về từ server.

### Jquery sử dụng EventSource

Code Jquery triển khai SSE trong Index view như bên dưới:

```js
$(document).ready(function () {

    $("#btnListen").click(function () {

        var source = new EventSource('/home/process');

        source.addEventListener("open", function (event) {
            $('#headerDiv').append
             ('<h1>Processing started...</h1>');
        }, false);


        source.addEventListener("error", function (event) {
            if (event.eventPhase == EventSource.CLOSED) {
                $('#footerDiv').append
                 ('<h1>Connection Closed!</h1>');
                source.close();
            }
        }, false);

        source.addEventListener("message", function (event) {
            var data = JSON.parse(event.data);
            $("#targetDiv").append
             ("<div>" + data.CustomerID + 
              " - " + data.CompanyName + "</div>");
        }, false);

    });
});
```

Code ở trên bao gồm 4 phần.

- Trong click event handler một ```EventSource``` được tạo để kết nối đến ```/home/process```. Do đó đối tượng ```EventSource``` sẽ nỗ lực để mở kết nối đến tài nguyên được chỉ định này.
- Nếu kết nối được mở thành công, open event sẽ được sinh ra bởi đối tượng ```EventSource```. Open event có thể xử lý  bởi sử dụng phương thức ```addEventListener()```. Open event handler đơn giản là hiển thị message ở ```headerDiv```.
- Nếu có bất kì lỗi trong việc giao tiếp error event sẽ được sinh ra. Phía trong, bạn có thể kiểm tra ```eventPhase``` và có hành động thích hợp. Trong trường hợp này code kiểm tra liệu event source đã được đóng hay chưa. Nếu đã đóng nó hiển thị message trong ```footerDiv``` và cũng gọi phương thức ```close()``` của ```EventSource```. Nếu bạn không gọi phương thức ```close()``` trình duyệt sẽ trigger trở lại source sau 3 giây. Việc gọi ```close()``` đảm bảo rằng trình duyệt không lặp lại việc trigger event source. Tất nhiên, nếu bạn muốn lặp lại việc trigger, bạn không cần đóng event source.
- Khi server gửi event notification đến trình duyệt thì message event được sinh ra. Message event handler nhận dữ liệu bằng việc sử dụng thuộc tính ```event.data```. Trong trường hợp này ```event.data``` sẽ là một đối tượng ```Customer``` đơn trong định dạng JSON. Và message sẽ được sinh ra nhiều lần phụ thuộc vào dữ liệu từ server gửi về. ```CustomerID``` và ```CompanyName``` được thêm vào thẻ ```targetDiv```.

### Giải quyết việc xử lý quá dài bên phía server

Trong ví dụ trên, xử lý phía server là khá đơn giản. Tuy nhiên, tại những thời điểm xử lý phía server có thể khá dài và nhiều dữ liệu cần được gửi đến client. Trong những trường hợp như vậy, thay vì đợi cho việc tính toán của tất cả dữ liệu sẽ là tốt hơn neeus gửi từng phần nhỏ. Với cách này client sẽ nhận một vài thứ từ server ngay cả khi server vẫn còn đang trong quá trình xử lý (chưa hoàn thành). Nếu bạn muốn thành lập như một task bạn có thể sửa action ```Process()``` như bên dưới:

```csharp
public void Process()
{
    Response.ContentType = "text/event-stream";
    foreach (Customer obj in db.Customers)
    {
        string jsonCustomer = JsonConvert.SerializeObject(obj);
        string data = $"data: {jsonCustomer}\n\n";
        System.Threading.Thread.Sleep(5000);
        HttpContext.Response.WriteAsync(data);
        HttpContext.Response.Body.Flush();
    }
    Response.Body.Close();
}
```

Trong trường hợp này thay vì sử dụng phương thức ```Content()``` để trả về ```IActionResult```, code sử dụng đối tượng ```Response```. Thuộc tính  ```ContentType``` của ```Response``` được set tới ```text/event-stream```. Một vòng lặp duyệt qua tất cả các đối tượng ```Customer```. ```Customer``` được chuyển đổi thành JSON như trước và được ghi tới ```Response``` stream sử dụng phương thức ```WriteAsync```. Phương thức ```Flush()``` của ```Response``` body đảm bảo rằng dữ liệu được đẩy đến trình duyệt. Phương thức ```Close()``` đóng ```Response``` stream  do đó kết thúc event source. 

# Thảo luận

Bài viết này giúp bạn hiểu được Server Sent Events là gì và cách sử dụng nó trong ASP.NET Core. Các bạn có thể thấy nó có ưu điểm rất lớn trong các ứng dụng cần cập nhật dữ liệu thời gian thực (real-time), ví dụ như chứng khoán, giá vàng, thời tiết,...Hy vọng các bạn có được những điều hữa ích cho mình qua bài biết này. Cảm ơn các bạn đã theo dõi.

**Bài viết được dịch từ nguồn:**
#####
[Utilize Server Sent Events (SSE) In ASP.NET Core](http://www.binaryintellect.net/articles/1b6d874a-3535-4af2-8e74-de9019d5607d.aspx)