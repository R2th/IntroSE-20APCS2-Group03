Trong [Part 1](https://viblo.asia/p/su-dung-mongodb-trong-aspnet-core-part-1-L4x5xEybKBM) của bài viết này chúng ta đã thảo luận làm thế nào thực hiện các xử lý CRUD sử dụng MongoDB console client. Trong phần này chúng ta sẽ học để thực hiện các xử lý CRUD sử dụng ASP.NET Core và MongoDB driver cho .NET Core.

Ok. Hãy bắt đầu nào.

Ứng dụng ASP.NET Core của chúng ta cái mà chúng ta đang đi đến phát triển trong bài biết trông giống như thế này:

![](https://images.viblo.asia/4dc4897a-b3a5-4098-951d-2f31c75465c2.png)

View **Index** chỉ ra ở trên renders một danh sách của employers trong một cơ sở dữ liệu MongoDB (**FirstDatabase** cái mà chúng ta đã tạo trong [Part 1](https://viblo.asia/p/su-dung-mongodb-trong-aspnet-core-part-1-L4x5xEybKBM)). Bạn có thể thêm employees mới, sửa employees đã tồn tại, hoặc xóa một employee.

Bắt đầu bằng việc tạo một ứng dụng ASP.NET Core MVC mới. Để làm việc với cơ sở dữ liệu MongoDB chúng ta cần thêm một **Nuget package** - ```MongoDB.Driver```. Hình bên dưới chỉ ra package này trong **Manage Nuget Packages dialog.**

![](https://images.viblo.asia/d719d8e6-09bb-4105-b7d9-ce8701aeab0c.png)

Package này cung cấp một MongoDB driver cái mà bạn có thể kết nối với cơ sở dữ liệu và thực hiện các xử lý cơ sở dữ liệu.

# Tạo Employee model
Tiếp theo, thêm một class model đặt tên là **Employee** trong thư mục Models. Lớp này trình diễn document cái mà bạn muốn để lưu trữ trong MongoDB collection.
```csharp
public class Employee
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement]
    public int EmployeeID { get; set; }

    [BsonElement]
    public string FirstName { get; set; }

    [BsonElement]
    public string LastName { get; set; }
}
```

Class **Employee** bao gồm bốn thuộc tính về tên như ```Id```, ```EmployeeID```, ```FirstName``` và ```LastName```. Thuộc tính ```Id``` là giá trị *_id* được gán bởi MongoDB và khi đó nó được đánh dấu với thuộc tính [BsonId]. Các thuộc tính ```FirstName``` và ```LastName``` được đánh dấu với thuộc tính [BsonElement] chỉ ra rằng chúng là các phần tử BSON(binary repsentation of JSON data).

Bây giờ mở ```HomeController``` và thêm code bên dưới:

```csharp
public class HomeController : Controller
{
    private IMongoCollection<Employee> collection;

    public HomeController()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        IMongoDatabase db = client.GetDatabase("FirstDatabase");
        this.collection = db.GetCollection<Employee>("Employees");
    }
}
```

 Code khai báo một biến cấp classs của ```IMongoCollection<Employee>```. Interface ```IMongoCollection``` biểu diễn một MongoDB collection.
 
 ###
 Contructor tạo một thể hiện của ```MongoClient```. Như tên đề xuất classs ```MongoClient``` hành động như một client đến MongoDB database server. Chúng truyền một URI cái mà chỉ định một port nơi MongoDB server đang lắng nghe. Port mặc định là 27017 và bạn cũng có thể thấy nó trên cửa sổ Mongod console (đọc Part-1 để thêm chi tiết).
 
###
Tiếp theo chúng ta gọi phương thức ```GetDatabase()``` trên ```MongoClient``` và chỉ định tên cơ sở dữ liệu để kết nối (**FirstDatabase** trong trường hợp này). ```GetDatabase``` trả về đối tượng .```IMongoDatabase```.  Tiếp theo **Employees** collection được truy suất sử dụng phương thức ```GetCollection``` của ```IMongoDatabase```.

###
Bây giờ chúng ta đã truy cập đến Employees collection, chúng ta có thể sử dụng nó để thực hiện các xử lý CRUD.

# Hiển thị một danh sách Employee
Chỉnh sửa action ```Index()``` của ```HomeController``` như bên dưới:
```csharp
public IActionResult Index()
{
    var model = collection.Find
(FilterDefinition<Employee>.Empty).ToList();

    return View(model);
}
```

Code bên trên gọi phương thức ```Find()``` trên **Employees** collection để nhận một danh sách của tất cả các employees. Phương thức ```Find()``` chấp nhận một đối tượng ```FilterDefinition``` trình diễn một tiêu chí tìm kiếm. Từ đó chúng ta muốn để lấy tất cả các bản ghi chúng ta sẽ truyền rỗng ở đó. Danh sách của các đối tượng Employees tiếp theo được truyền tới view **Index**.

```html
@model List<MongoDBDemo.Models.Employee>


<h1>List of Employees</h1>

<h2>@TempData["Message"]</h2>

<a asp-controller="Home" asp-action="Insert">
Add New Employee</a>

<br /><br />


<table border="1" cellpadding="10">
    @foreach(var item in Model)
    {
    <tr>
        <td>@item.EmployeeID</td>
        <td>@item.FirstName</td>
        <td>@item.LastName</td>
        <td>
            <a asp-controller="Home" asp-action="Update" 
asp-route-id="@item.Id">Edit</a>
        </td>
        <td>
            <a asp-controller="Home" asp-action="ConfirmDelete" 
asp-route-id="@item.Id">Delete</a>
        </td>

    </tr>
    }
</table>
```
View **Index** là khá đơn giản ở đây và từ đó tôi không muốn đi đến quá nhiều chi tiết. Chú ý rằng ```ObjectId``` của **Employees** được truyền trong tham số route ở link Edit và Delete.

# Thêm mới một Employee
Khi bạn click link **Add New Employee** trên view **Index**, bạn đã đưa đến chế độ Insert view:
![](https://images.viblo.asia/72466632-5b21-4dac-9a9c-3ae177da1fa5.png)

Ở đây bạn có thể gõ vào một **Employee** chi tiết giống như ```EmployeeID```, ```FIrstName``` và ```LastName``` và click button **Save** để thêm mới **Employee**.

Code html bên dưới chỉ ra ```Insert.cshtml``` làm công việc của nó như thế nào:
```html
@model MongoDBDemo.Models.Employee


<h1>Insert Employee</h1>

<h2>@ViewBag.Message</h2>

<form asp-controller="Home" asp-action="Insert" 
method="post">
<table border="1" cellpadding="10">
    <tr>
        <td>Employee ID :</td>
        <td><input asp-for="EmployeeID" /></td>
    </tr>
    <tr>
        <td>First Name :</td>
        <td><input asp-for="FirstName" /></td>
    </tr>
    <tr>
        <td>Last Name :</td>
        <td><input asp-for="LastName" /></td>
    </tr>
    <tr>
        <td colspan="2">
            <button type="submit">Save</button>
        </td>
    </tr>
</table>
</form>
```
Chú ý rằng ```<form>``` POSTs để ```Insert()``` action.
Hai action ```Insert()``` có trách nhiệm cho việc thêm mới **Employee** được trình bày như bên dưới:
```csharp
public IActionResult Insert()
{
    return View();
}

[HttpPost]
public IActionResult Insert(Employee emp)
{
    collection.InsertOne(emp);
    ViewBag.Message = "Employee added successfully!";
    return View();
}
```
Chú ý phần code chỉ ra trong phần bôi đậm. Chúng ta gọi phương thức ```InsertOne()``` trên **Employees** collection để thêm mới một employee. Một success mesage cũng được hiển thị trên view **Insert**.

# Sửa một Employee đã tồn tại
Khi bạn click trên link Edit của employee riêng biệt từ danh sách, bạn sẽ có được view **Update** trình bày như bên dưới:
![](https://images.viblo.asia/0bdc04df-6f44-4f95-bf4c-6a598cd6bcb2.png)

View **Update** nhìn tương tự như view **Insert** nhưng trình bày một **Employee** chi tiết đã tồn tại cho việc sửa dữ liệu
Code html của ```Update.cshtml``` được trình bày như dưới đây:
```csharp
@model MongoDBDemo.Models.Employee


<h1>Update Employee</h1>

<h2>@ViewBag.Message</h2>

<form asp-controller="Home" asp-action="Update" method="post">

    <input type="hidden" name="Id" value="@Model.Id.ToString()" />

    <table border="1" cellpadding="10">
        <tr>
            <td>Employee ID :</td>
            <td><input asp-for="EmployeeID" 
readonly="readonly" /></td>
        </tr>
        <tr>
            <td>First Name :</td>
            <td><input asp-for="FirstName" /></td>
        </tr>
        <tr>
            <td>Last Name :</td>
            <td><input asp-for="LastName" /></td>
        </tr>
        <tr>
            <td colspan="2">
                <button type="submit">Save</button>
            </td>
        </tr>
    </table>
</form>
```

Chú ý code được đánh dấu trong phần bôi đậm. Chúng ta lưu trữ thuộc tính ```Id``` của **Employee** đang được chỉnh sửa thành một hidden form field. Điều này là bắt buộc cho model binding để làm việc như mong đợi. Chúng ta cần ```Id``` trong khi update và từ đó chúng ta lưu trữ nó theo cách này.
###
Cũng chú ý rằng **EmployeeID** textbox được đánh dấu như readonly khi đó chúng không muốn để sửa trường này.
```csharp
public IActionResult Update(string id)
{
    ObjectId oId = new ObjectId(id);
    Employee emp = collection.Find(e => e.Id 
== oId).FirstOrDefault();

    return View(emp);
}

[HttpPost]
public IActionResult Update(string id,Employee emp)
{
    emp.Id = new ObjectId(id);
    var filter = Builders<Employee>.
Filter.Eq("Id", emp.Id);
    var updateDef = Builders<Employee>.Update.
Set("FirstName", emp.FirstName);
    updateDef = updateDef.Set("LastName", emp.LastName);
    var result = collection.UpdateOne(filter, updateDef);

    if (result.IsAcknowledged)
    {
        ViewBag.Message = "Employee updated successfully!";
    }
    else
    {
        ViewBag.Message = "Error while updating Employee!";
    }
    return View(emp);
}
```

Action GET ```Update()``` chuyển đổi chuỗi id thành một ```ObjectId``` và tiếp theo truyền tới phương thức ```Find()```. Bằng cách này chúng ta truy suất một **Employee** có ```Id``` khớp với cái gì được chuyền trong tham số route id.

###
Action POST ```Update()``` cập nhật employee đã chỉnh sửa đến cơ sở dữ liệu. Để hoàn thành công việc này chúng ta chuẩn bị một ```FilterDefinition``` và ```UpdateDefinition```. ```FilterDefinition``` chỉ định một điều kiện tìm kiếm được sử dụng trong khi cập nhật một document. Trong trường hợp của chúng ta điều kiện tìm kiếm chỉ định thuộc tính ```Id``` nên khớp với giá trị Id của **Employee** được chỉ định. ```UpdateDefinition``` chỉ định thuộc tính được chỉnh sửa và giá trị mới của chúng.

###
Tiếp theo chúng ta gọi phương thức ```UpdateOne()``` trên **Employees** collection và truyền các đối tượng ```FilterDefinition``` và ```UpdateDefinition``` chúng ta vừa xây dựng
###
Thuộc tính ```result.IsAcknowledged``` nói cho chúng ta liệu xử lý cập nhật là thành công hoặc không

# Xóa Employee đã tồn tại
Khi bạn click trên link Delete trên view **Index**, bạn được đưa đến chế độ view **ConfirmDelete**. View này trình bày như bên dưới:

![](https://images.viblo.asia/2d8450bf-642d-4eb1-b83f-aba6b58e2745.png)

Click button **Delete** action ```Delete()``` được gọi và Employee được gõ bot khỏi cơ sở dữ liệu. Code html của ```ConfirmDelete.cshtml``` được biểu diễn như bên dưới:
```html
@model MongoDBDemo.Models.Employee


<h2>Do you want to delete this employee?</h2>

<form asp-controller="Home" asp-action="Delete" method="post">

    <input type="hidden" name="Id" 
value="@Model.Id.ToString()" />

    <table border="1" cellpadding="10">
        <tr>
            <td>Employee ID :</td>
            <td>@Model.EmployeeID</td>
        </tr>
        <tr>
            <td>First Name :</td>
            <td>@Model.FirstName</td>
        </tr>
        <tr>
            <td>Last Name :</td>
            <td>@Model.LastName</td>
        </tr>
        <tr>
            <td colspan="2">
                <button type="submit">Delete</button>
            </td>
        </tr>
    </table>
</form>
```

View **ConfirmDelete** cũng lưu trữ ```ObjectId``` thành một hidden form field. Action ```ConfirmDelete()``` và action ```Delete()``` được trình bày nhu sau:
```csharp
public IActionResult ConfirmDelete(string id)
{
    ObjectId oId = new ObjectId(id);
    Employee emp = collection.Find(e => 
e.Id == oId).FirstOrDefault();
    return View(emp);
}


[HttpPost]
public IActionResult Delete(string id)
{
    ObjectId oId = new ObjectId(id);
    var result = collection.DeleteOne<Employee>
(e => e.Id == oId);

    if (result.IsAcknowledged)
    {
        TempData["Message"] = "Employee deleted successfully!";
    }
    else
    {
        TempData["Message"] = "Error while deleting Employee!";
    }
    return RedirectToAction("Index");
}
```

Action ```ConfirmDelete()``` là khá tương tự với action GET ```Update```. Action ```Delete()``` chấp nhận ```Id``` của **Employee** đã xóa và chuyển đổi thành một ```ObjectId```. Phương thức ```DeleteOne``` của Employees collection chỉ định  điều kiện xóa để khớp với giá trị Id.

# Kết
Bài biết đã trình bày chi tiết cách sử dụng MongoDB trong ASP.NET Core, với các thao tác cơ bản get, create, update và delete. Với cách diễn đạt rõ ràng và dễ hiểu của tác giả hy vọng sẽ giúp các bạn nhanh chóng nắm bắt được cách triển khai MongoDB trên ASP.NET Core. Chúc các bạn thành công.

Bài viết được dịch từ bài viết gốc: [Use MongoDB In ASP.NET Core (Part - 2, CRUD Operations)](http://www.binaryintellect.net/articles/b6f251ee-0dd9-4741-8928-107a62b63e74.aspx)