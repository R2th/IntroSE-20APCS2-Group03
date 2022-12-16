Nó là phổ biến trong ứng dụng ASP.NET Core để lưu trữ một hoặc nhiều config options trong ```appsettings.json```. Những options này được đọc bên trong MVC controllers hoặc Razor Pages models. Dựa trên một thiết lập config cụ thể bạn mong muốn để thực thi một xử lý nhất định. Mặc dù nghe có vẻ khá đơn giản và rõ ràng nhưng người mới bắt đầu thường kết thúc việc làm này theo cách không được tốt lắm. Để kết thúc điều đó, bài viết này sẽ thảo luận cách tiếp cận mềm dẻo hơn và giúp đỡ bạn giảm thiểu những thay đổi trong tương lai.

####
Hãy hiểu cái gì chúng ta đang nỗ lực để hoàn thành với một ví dụ giả thiết. Giả sử bạn đang xây dựng một ứng dụng ASP.NET Core để lưu trữ dữ liệu trong một vài cơ sở dữ liệu. Bạn muốn hỗ trợ nhiều cơ sở dữ liệu khác nhau và chúng nên có thể config được. Cho ví dụ, bạn muốn chỉ định trong file config rằng bạn muốn sử dụng SQL Server và theo đó ứng dụng nên sử dụng data access code mà được gắn với SQL Server. Nếu bạn quyết định thay đổi cơ sở dữ liệu, như **Cosmos DB**, bạn sẽ đơn giản thay đổi nó trong file config và bây giờ ứng dụng sử dụng xử lý được dự định cho **Cosmos DB** và hơn thế nữa.

####
Bây giờ hãy triển khai yêu cầu này trong một ứng dụng ASP.NET Core MVC đơn giản. Bắt đầu bằng cách tạo một ứng dụng MVC mới và thêm config bên dưới đến file ```appsettings.json```.
```csharp
{
  "AppSettings": {
    "DbType": "SqlServer"
  }
}
```
Mục ```AppSettings``` lưu trữ chỉ một key được đặt tên là ```DbType```nó là một giá trị string giống như ```SqlServer```, hoặc ```CosmosDB```, ```MongoDB```.

# Lệnh ```swith``` đơn giản
Hãy sử dụng cách đơn giản nhất để đọc config và thực thi một vài xử lý dựa trên giá trị của ```DbType```

Đi tới ```HomeController``` và viết code sau:
```csharp
public class HomeController : Controller
{
    private string dbType = "";

    public HomeController(IConfiguration config)
    {
        dbType = config.GetValue<string>("AppSettings:DbType");
    }
}
```
```HomeController``` khai báo một biến string ```dbType```, nó được gán một giá trị trong constructor. Constructor nhận tham số ```IConfiguration``` và đọc key ```DBType``` của ```AppSettings```. Giá trị ```DBType``` được gán tới  biến ```dbType``` .

####
Một khi bạn biết ```dbType``` bạn có thể viết câu lệnh ```switch``` C# để kiểm tra giá trị của nó và thực thi code phụ thuộc vào giá trị riêng biệt. Code bên dưới thể hiện lệnh ```switch``` này cái mà bên trong action ```Index()```:

```csharp
switch(dbType)
{
    case "SqlServer":
        ViewBag.Message = "Using SQL Server";
        break;
    case "CosmosDB":
        ViewBag.Message = "Using Azure CosmosDB";
        break;
    case "MongoDB":
        ViewBag.Message = "Using MongoDB";
        break;
    default:
        ViewBag.Message = "No DbType found";
        break;
}
```
Điều này là khá đơn giản và rõ ràng phải không ?
Nếu bạn xuất kết quả ```ViewBag.Message``` trên view ```Index``` sẽ như bên dưới:
```html
<h1>@ViewBag.Message</h1>
```
Xem kết quả trên trình duyệt:

![](https://images.viblo.asia/0a114519-680a-4e72-bb47-7a976883a550.png)

Mặc dù code này là đơn giản, tuy nhiên nó có một số vấn đề. Đầu tiên, nó sử dụng giá trị string để so sánh trong câu lệnh ```switch```. Ở đó có thể xảy ra lỗi liên quan đến kí tự, khoảng trắng,...Thứ hai. nó sử dụng lệnh ```switch``` để kiểm tra giá trị và thực thi xử lý nhất định. Giả sử ứng dụng của bạn sử dụng lệnh ```switch``` này ở một 100 chỗ trong code base. Một ngày nào đó, một ```DbType``` mới được thêm vào danh sách các cơ sở dữ liệu cần dùng. Bây giờ tất cả chỗ code đó bạn cũng cần thay đổi. Đều tiên, file config và tiếp theo mỗi nơi lệnh ```switch``` được sử dụng để kiểm tra ```dbType``` (có tới 100 nơi trong source code). Điều này sẽ làm mất rất nhiều công sức cũng như khả năng ảnh hưởng đến hoạt động hiện tại của ứng dụng.

# Lệnh ```switch``` sử dụng enum
Đi về phía trước và định nghĩa một enum trong ứng dụng của bạn như bên dưới:
```csharp
public enum DbType
{
    SqlServer = 1,
    CosmosDB = 2,
    MongoDB = 3
}
```
Ở đây, chúng ta có enum ```DbType``` được định nghĩa 3 options: ```SqlServer```, ```CosmosDB``` và ```MongoDB```. Bây giờ bạn có thể đọc config và quyết định giá trị enum nào được chỉ định như bên dưới:
```csharp
private DbType dbType;

public HomeController(IConfiguration config)
{
    this.dbType = Enum.Parse<DbType>
    (config.GetValue<string>("AppSettings:DbType"));
}
```
```HomeController``` có thành viên  ```dbType``` của kiểu enum ```DbType```. Bên trong constructor bạn sử dụng phương thức ```Parse<T>()``` của class ```Enum``` để chuyển đổi giá trị string được lưu trong config đến giá trị enum tương đương của nó. Câu lệnh ```switch``` của bạn bên trong action ```Index()``` sẽ thay đổi như bên dưới:
```csharp
switch (dbType)
{
    case DbType.SqlServer:
        ViewBag.Message = "Using SQL Server";
        break;
    case DbType.CosmosDB:
        ViewBag.Message = "Using Azure CosmosDB";
        break;
    case DbType.MongoDB:
        ViewBag.Message = "Using MongoDB";
        break;
    default:
        ViewBag.Message = "No DbType found";
        break;
}
```
Thay đổi này là tốt hơn cái trước đó bởi vì nó sử dụng giá trị enum trong khối case khác nhau.

####
Nếu một ```DbType``` mới được thêm vào hệ thống thì tất cả các nơi bạn cần thay đổi là gì ? File config, enum ```DbType``` và 100 câu lệnh ```switch``` này. Bây giờ, hãy đánh dấu vấn đề được đề cập bởi 100 câu lệnh ```switch``` này.

# Tránh sử dụng ```switch``` trong code của bạn
Bây giờ bạn phải cảm nhận rằng câu lệnh ```switch``` (giống như khối lệnh if-else-if) là đang tạo ra vấn đề cho khả năng mở rộng và bảo trì của code. Vì nó nằm rải rác trong code, thậm chí một thay đổi nhỏ tới option cũng dẫn đến số lượng lớn công việc làm lại trong code. Như vậy, bước tiếp theo của chúng ta là gỡ bỏ việc sử dụng lệnh ```switch```. Hãy xem làm thế nào.

####
Chúng ta sẽ làm gì để tạo một ánh xạ để liên kết một ```DbType``` với một ```Action``` riêng biệt. Việc ánh xạ này có thể là một dictionary như bên dưới:

```csharp
private Dictionary<DbType, Action> dbTypeLogic = new Dictionary<DbType, Action>();
```
Ở đây, bạn đã khai báo một ```Dictionary``` để lưu trữ một tập hợp keys và action liên quan của ```DbType```. Để triển khai thay đổi này, constructor của ```HomeController``` sẽ theo mẫu sau:

```csharp
public HomeController(IConfiguration config)
{
    this.dbType = Enum.Parse<DbType>
(config.GetValue<string>("AppSettings:DbType"));

    dbTypeLogic.Add(DbType.SqlServer, () => {
        ViewBag.Message = "Using SQL Server";
    });
    dbTypeLogic.Add(DbType.CosmosDB, () => {
        ViewBag.Message = "Using Azure CosmosDB";
    });
    dbTypeLogic.Add(DbType.MongoDB, () => {
        ViewBag.Message = "Using MongoDB";
    });
}
```

Code trên lưu trữ logic xử lý cho mỗi giá trị enum ```DbType``` như một **Action delegate**.

Bây giờ bạn có thể gỡ bỏ câu lệnh ```switch``` toàn bộ và thay vì viết action ```Index()``` như sau:
```csharp
public IActionResult Index()
{
   dbTypeLogic[this.dbType]();
   return View();
}
```
Ở đây, bạn triệu gọi ```Action``` từ ```Dictionary```bởi việc truyền key, value ```DbType```.

Bây giờ nếu một ```DbType``` được thêm thì những nơi nào cần phải thay đổi ? File config, enum ```DbType``` và dictionary ```dbTypeLogic```. Tuy nhiên, tất cả 100 chỗ nơi bạn triệu gọi action từ dictionary ```dbTypeLogic``` không phải thay đổi. Như vậy, thay đổi bây giờ được hạn chế chỉ ở 3 chỗ đã biết.

Các tiếp cận này là tốt hơn rất nhiều cái trước nhưng vẫn có một vấn đề. Ở đây, giá trị ```DbType``` là liên quan với một ```Action```. Sẽ thế nào nếu có hơn một khối của logic xử lý mà bạn muốn để liên kết với một giá trị ```DbType``` ? Một giải pháp rõ ràng là định nghĩa một Dictionary khác để nắm giữ keys và tập hợp action items khác của ```DbType```. Nhưng sớm muộn giải pháp này có thể cũng tạo ra vấn đề nếu bạn giữ việc tạo các dictionary khác nhau cho mỗi tập logic xử lý mới. Hãy loại bỏ nhược điểm đó trong bước thảo luận cuối cùng.

# Sử dụng đối tượng bao bọc các behaviours cho mỗi ```DbType```
Thay vì duy trì một **Dictionary** riêng cho từng **Action**, bạn có thể bao tất cả các behaviors thuộc về một giá trị ```DbType``` trong một đối tượng và tiếp theo cho **Dictionary** trả về đối tượng được yêu cầu cho bạn. Hãy xem làm thế nào có thể làm điều này.

Hãy giả sử rằng có 2 behaviors trên một giá trị ```Dbtype```, ví dụ ```GetMessage()``` và ```GetDetails()```. Phương thức trước trả về string cái mà chỉ ra cơ sở dữ liệu được sử dụng. Phương thức sau trả về trình điều khiển cơ sở dữ liệu chi tiết như .**NET data provider** cho **SQL Server**, **EF Core provider** cho **Comsmos DB** và **MongoDB .NET driver**.

Để thể hiện những phương thức này thêm một interface được gọi là ```IDbTypeLogic```:
```csharp
public interface IDbTypeLogic
{
    string GetMessage();
    string GetDetails();
}
```
Mỗi ```DbTyoe``` mà bạn muốn có sẽ được đại diện bởi class cái mà triển khai interface. Trong ví dụ của chúng ta có 3 ```DbType```: **SqlServer**, **CosmosDB** và **MongoDB**, tương ứng sẽ có 3 class ```SqlServerLogic```, ```ComsmosDBLogic``` và ```MongoDBLogic```. Những class này như sau:

```csharp
public class SqlServerLogic:IDbTypeLogic
{
    public string GetMessage()
    {
        return "Using SQL Server";
    }
    public string GetDetails()
    {
        return ".NET provider for SQL Server";
    }
}

public class CosmosDBLogic : IDbTypeLogic
{
    public string GetMessage()
    {
        return "Using Azure CosmosDB";
    }
    public string GetDetails()
    {
        return "SQL API with EF Core CosmosDB 
Provider";
    }
}

public class MongoDBLogic : IDbTypeLogic
{
    public string GetMessage()
    {
        return "Using MongoDB";
    }
    public string GetDetails()
    {
        return "MongoDB .NET Driver";
    }

}
```

Những class này khá là rõ ràng và do đó không được thảo luận chi tiết ở đây

Tiếp theo, thay đổi định nghĩa **Dictionary** như thế này:

```csharp
private Dictionary<DbType, Func<IDbTypeLogic>> 
dbTypeLogic = new Dictionary<DbType, Func<IDbTypeLogic>>();
```

Như bạn có thể thấy, dictionary ```dbTypeLogic``` bây giờ nắm giá trị ```DBType``` như keys và ```Func<IDbTypeLogic>``` của nó. Khác biệt giữa **Action** và **Func** là **Actiion** không thể trả về giá trị trong khi **Func** có thể trả về giá trị.

Bây giờ thay đổi constructor như sau:

```csharp
public HomeController(IConfiguration config)
{
   this.dbType = Enum.Parse<DbType>(
config.GetValue<string>("AppSettings:DbType"));

    dbTypeLogic.Add(DbType.SqlServer, () => {
        return new SqlServerLogic();
    });
    dbTypeLogic.Add(DbType.CosmosDB, () => {
        return new CosmosDBLogic();
    }); 
    dbTypeLogic.Add(DbType.MongoDB, () => {
        return new MongoDBLogic();
    });
}
```

Chú ý giá trị ```Func``` được thêm vào dictionary. Cơ bản chúng tạo và trả về một đối tượng của ```SqlServerLogic```, ```CosmosDBLogic```, và ```MongoDBLogic```.

Việc gọi code từ action ```Index()``` sẽ thay đổi như thế này:

```csharp
public IActionResult Index()
{
    IDbTypeLogic obj = dbTypeLogic[this.dbType]();
    ViewBag.Message = obj.GetMessage();
    ViewBag.Details = obj.GetDetails();
    return View();
}
```

Như bạn có thể thấy bạn nhận một ```Func``` bằng việc truyền ```dbType``` đến **Dictionary**. Việc triệu gọi function đó trả về một triển khai của ```IDbTypeLogic```. Tiếp theo bạn có thể triệu gọi phương thức được yêu cầu - ```GetMessage()``` hoặc ```GetDetails()```.

Một ví dụ chạy code này khi giá trị config là **CosmosDB** sẽ xuất output như thế này.

![](https://images.viblo.asia/78d45e3e-9bd3-4a66-8e0f-dc8e3b53fb09.png)

Với sự sắp xếp này chỉ một **Dictionary** là hiệu quả không quan trọng bao nhiêu behavios được liên kết với giá trị ```DbType```. Khi một giá trị ```DbType``` được thêm, bạn cần làm thay đổi trong file config, enum ```DbType```. Tiếp đó bạn cần tạo một class triển khai interface ```IDbTypeLogic``` và triển khai hai phương thức. Cuối cùng, bạn cần để thay đổi **Dictionary** để nắm giữ một ```Func``` mới để return một đối tượng cảu class vừa được tạo.

# Tổng kết
Lệnh ```switch``` được dùng rất nhiều trong code dù ở bất kì ngôn ngữ nào. Bài viết này không có ý định tìm ra giải pháp loại bỏ hoàn toàn nó. Trong các trường hợp đơn giản mà logic switch case này chỉ sử dụng một nơi thì nó vẫn là lựa chọn phù hợp. Tuy nhiên, chúng ta cần suy nghĩ đến việc thêm các thành phần mới nhưng lại cần ít nhất sự thay đổi trong code, cũng như tránh ảnh hưởng đến các phần đang hoạt động tốt. Để làm được điều đó, cách tiếp cận hướng đối tượng trong C# là một lựa chọn rất tốt cho việc mở rộng và bảo trì code. Chúng ta nên nhớ một nguyên tắc rất quan trọng trong phát triển phần mềm, đó là "Mở với việc thêm mới và đóng với việc sửa chữa", nghĩa là chúng ta cần thiết kế làm sao để hệ thống khi cần thay đổi chỉ cần thêm một item mới chứ không phải sửa những phần code đã có. Hy vọng bài viết đem đến cho các bạn nhiều điều bổ ích.

**Bài viết được dịch từ nguồn:** http://www.binaryintellect.net/articles/0d98810d-8b23-4f6c-849b-00a1b4ad47d9.aspx