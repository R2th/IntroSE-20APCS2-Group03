Trong bài viết trước mình đã giới thiệu đến các bạn công nghệ Blazor trong .NET. Đây là một công nghệ khá mới và thú vị dành cho các bạn lập trình viên. Nó giúp cho một người không quen thuộc với client side vẫn có thể trở thành một full stack từ backend tới frontend với ngôn ngữ C#. Các bạn có thể theo dõi chi tiết tại bài viết [Blazor là gì](https://viblo.asia/p/blazor-la-gi-yMnKMJkjZ7P). Tiếp nối để tìm hiểu về công nghệ mới mẻ này, mình sẽ giới thiệu với các bạn làm thể nào để xây dựng một ứng dụng Todo list với Blazor. Bài viết lược dịch từ bài viết [Build your first Blazor app](https://blazor.net/docs/tutorials/build-your-first-blazor-app.html). Lưu ý rằng, tại thời điểm hiện tại Blazor vẫn đang trong quá trình phát triển và thử nghiệm chưa sẵn sàng để phát hành phiên bản dùng cho production.

# 1. Tạo ứng dụng Blazor mới với Visual Studio

Trước tiên, chúng ta cần cài đặt .NET Core SDK 2.0 hoặc mới hơn, Visual Studio 2017 (15.7) hoặc mới hơn.

1.1 Chọn File > New > Project. Chọn Web > ASP.NET Core Web Application. Đặt tên project là"BlazorFirstApp" trong trường Name. Chọn OK.

![](https://images.viblo.asia/11ad327e-4591-4080-85b8-e712047590fc.jpg)

1.2 New ASP.NET Core Web Application dialog xuất hiện. Chắc chắn rằng .Net Core là được chọn trên dropdown chọn framework. Chọn hoặc ASP.NET Core 2.0 hoặc ASP.NET Core 2.1. Chọn Blazor template và click OK.

![](https://images.viblo.asia/7eff00c1-aa8f-4904-ab05-b06f683f225d.jpg)

1.3 Khi project được tạo, nhấn Ctrl-F5 để chạy ứng dụng ở chế độ không debug. Chạy với debugger (F5) chưa được hỗ trợ ở thời điểm hiện tại.

**Chú ý**:

Các bạn có thể dùng command line để tạo mới project Blazor

```
dotnet new blazor -o BlazorFirstApp
cd BlazorFirstApp
dotnet run
```

Và đây là hình ảnh kết quả sau khi chạy web

![](https://images.viblo.asia/80d907aa-91f8-46f4-aabf-d3666e5d2ae4.jpg)

# 2. Xây dựng component
1. Duyệt qua mỗi trang: Home, Counter và Fetch data của ứng dụng.
Ba trang này được xây dựng bởi 3 file razor trong thư mục Pages: Index.cshtml, Counter.cshtml và FetchData.cshtml. Mỗi một file trong 3 file này được xây dựng một Blazor component cái mà được biên dịch và thực thi phía client trong trình duyệt.
2. Chọn button trên trang Counter.
![](https://images.viblo.asia/9e9568a7-4c25-48ad-9c5a-4d18ba387d6d.jpg)
3. Các bạn có thể xem việc triển khai Counter component trong file COunter.cshtml như bên dưới:
```csharp
@page "/counter"

<h1>Counter</h1>

<p>Current count: @currentCount</p>

<button class="btn btn-primary" onclick="@IncrementCount">Click me</button>

@functions {
    int currentCount = 0;

    void IncrementCount()
    {
        currentCount++;
    }
}
```
UI cho Counter component được định nghĩa sử dụng HTML thông thường. Logic render động (ví dụ: loop, conditional, expressions) được thêm với việc sử dụng nhúng cú pháp C# được gọi là Razor. Code html và logic render C# được chuyển đổi thành component class tại thời điểm build. Tên của class .NET được generate ứng với tên của file.

Member của component class được định nghĩa trong khối @function. Trong khối @function, trạng thái component (properties, fields) và phương thức có thể chỉ định cho event xử lý hoặc cho việc định nghĩa component logic khác. Những members này có thể tiếp theo được sử dụng như một phần của render logic của component và cho việc xử lý các events.

Khi buttot được click, onlick handler đã đăng kí của Counter component được gọi (phương thức ```IncrementCount```) và Counter component generate lại render tree của nó. Blazor so sánh với render tree trước đó và áp dụng bất kì sự thay đổi nào đến DOM. Số đếm hiển thị trên màn hình được cập nhật.

4. Cập nhật html cho Counter component để làm cho header thú vị hơn.

```html
@page "/counter"
<h1><em>Counter!!</em></h1>
```
5.  Sửa đổi C# logic của Counter component để số đếm tăng thêm 2 thay vì 1.

```csharp
@functions {
    int currentCount = 0;

    void IncrementCount()
    {
        currentCount += 2;
    }

```
6. Refresh trang counter để thấy những thay đổi trên trình duyệt.

![](https://images.viblo.asia/9aa8e3ac-c8b3-4bb8-8375-4412342ce606.jpg)

# 3. Xây dựng Todo list
Thêm một trang mới vào ứng dụng để triển khai một todo list đơn giản.
1. Thêm một file text đến thư mục Pages đặt tên là Todo.cshtml.
2. Cung cấp html khởi tạo cho page.
```html
@page "/todo"

<h1>Todo</h1>
```
3. Thêm Todo page vào thanh điều hướng bằng việc cập nhật file ```Shared/NavMenu.cshtml```. Thêm ```NavLink``` cho Todo page bằng việc thêm html như bên dưới.
```html
<li class="nav-item px-3">
    <NavLink class="nav-link" href="todo">
        <span class="oi oi-list-rich" aria-hidden="true"></span> Todo
    </NavLink>
</li>
```
4. Refesh ứng dụng. Thấy trang Todo mới
![](https://images.viblo.asia/51efbebf-11d3-41eb-8298-80028e077b91.png)
5. Thêm file ```TodoItem.cs``` vào thư mục gốc của project để thao tác với todo items.
6. Sử dụng code C# bên dưới cho class ```ToDoItem```.
```cscharp
public class TodoItem
{
    public string Title { get; set; }
    public bool IsDone { get; set; }
}
```
7. Quay trở lại Todo component trong ```Todo.cshtml``` và thêm một trường cho todos trong một khối ```@function```. Todo component sử dụng field này để maintain trạng thái của todo list.
```cscharp
@functions {
    IList<TodoItem> todos = new List<TodoItem>();
}
```
8. Thêm một list html chưa được sắp xếp và một vòng lặp để render từng todo item như một list item.
```html
@page "/todo"

<h1>Todo</h1>

<ul>
    @foreach (var todo in todos)
    {
        <li>@todo.Title</li>
    }
</ul>
```
9. Ứng dụng yêu cầu các phần tử UI cho việc thêm todos vào list. Thêm một text input và một button bên dưới list.
```html
@page "/todo"

<h1>Todo</h1>

<ul>
    @foreach (var todo in todos)
    {
        <li>@todo.Title</li>
    }
</ul>

<input placeholder="Something todo" />
<button>Add todo</button>

@functions {
    IList<TodoItem> todos = new List<TodoItem>();
}
```
10. Refresh trình duyệt.
![](https://images.viblo.asia/c69eaa96-761b-4044-bdf4-aa5abe97c779.jpg)
11. Thêm phương thức ```AddToDo``` đến Todo component và đăng kí nó cho sự kiện click button sử dụng thuộc tính ```onclick```
```html
<input placeholder="Something todo" />
<button onclick="@AddTodo">Add todo</button>

@functions {
    IList<TodoItem> todos = new List<TodoItem>();

    void AddTodo()
    {
        // Todo: Add the todo
    }
}
```
12. Để lấy title của todo item mới, thêm một trường ```newTdo``` và bind nó tới value của text input sử dụng thuộc tính ```bind```
```cscharp
IList<TodoItem> todos = new List<TodoItem>();
string newTodo;
```
```
<input placeholder="Something todo" bind="@newTodo" />
```
13.  Cập nhật phương thức ```AddTodo``` để thêm ```Todo``` với title đã chỉ định. Không quên clear giá trị của text input bằng việc thiết lập ```newTodo``` về chuỗi rỗng.
```html
@page "/todo"

<h1>Todo</h1>

<ul>
    @foreach (var todo in todos)
    {
        <li>@todo.Title</li>
    }
</ul>

<input placeholder="Something todo" bind="@newTodo" />
<button onclick="@AddTodo">Add todo</button>

@functions {
    IList<TodoItem> todos = new List<TodoItem>();
    string newTodo;

    void AddTodo()
    {
        if (!string.IsNullOrWhiteSpace(newTodo))
        {
            todos.Add(new TodoItem { Title = newTodo });
            newTodo = string.Empty;
        }
    }
}
```
14. Refresh trình duyệt. Thêm một vài todo tới todo list.
![](https://images.viblo.asia/bade75c0-6599-4178-abab-4ba3d7068534.jpg)
15. Sau cùng, todo list là gì với không checkbox ? Title text cho mỗi todo item có thể được làm để sửa được. Thêm một checkbox và input text cho mỗi todo item và bind giá trị của chúng tới những thuộc tính ```Title``` và ```IsDone`` tương ứng.
```html
<ul>
    @foreach (var todo in todos)
    {
        <li>
            <input type="checkbox" bind="@todo.IsDone" />
            <input bind="@todo.Title" />
        </li>
    }
</ul>
```
16. Để xác nhận rằng những giá trị này đã được bind, cập nhật h1 ở header để hiển thị số todo items chưa hoàn thành (```IsDone``` là ```false```).
```
<h1>Todo (@todos.Where(todo => !todo.IsDone).Count())</h1>
```
17. Todo component hoàn chỉnh sẽ như code bên dưới:
```html
@page "/todo"

<h1>Todo (@todos.Where(todo => !todo.IsDone).Count())</h1>

<ul>
    @foreach (var todo in todos)
    {
        <li>
            <input type="checkbox" bind="@todo.IsDone" />
            <input bind="@todo.Title" />
        </li>
    }
</ul>

<input placeholder="Something todo" bind="@newTodo" />
<button onclick="@AddTodo">Add todo</button>

@functions {
    IList<TodoItem> todos = new List<TodoItem>();
    string newTodo;

    void AddTodo()
    {
        if (!string.IsNullOrWhiteSpace(newTodo))
        {
            todos.Add(new TodoItem { Title = newTodo });
            newTodo = string.Empty;
        }
    }
}
```

Refresh ứng dụng trên trình duyệt. Thử thêm một số todo items.

![](https://images.viblo.asia/b6fa78d2-1f78-4e22-ab40-bd440b04061d.jpg)

# 4. Tổng kết
Bài viết này giới thiệu một cách chi tiết các thành phần một ứng dụng Blazor và các bước để xây dựng một ứng dụng todo list đơn giản. Các bạn trông có đơn giản và quen thuộc không ? Sử dụng C# để code như javascript, thật thú vị.

- Các bạn có thể xem thêm tại bài viết gốc: [Build your first Blazor app](https://blazor.net/docs/tutorials/build-your-first-blazor-app.html).

- Link code demo: [https://github.com/quanghiepth86/blazor_first_app](https://github.com/quanghiepth86/blazor_first_app)