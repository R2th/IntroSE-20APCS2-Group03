Trong bài viết trước mình có giới thiệu đến các bạn làm thế nào để xây dựng một ứng dụng Blazor đơn giản. Các bạn có thể theo dõi tại [Xây dựng ứng dụng Todo với Blazor](https://viblo.asia/p/xay-dung-ung-dung-todo-voi-blazor-Eb85opB0K2G). Trong bài viết này, chúng ta sẽ cùng tìm hiểu sâu hơn về các thành phần của Blazor. Đó là khái niệm về components. Nó có vẻ khá quen thuộc với các client framework như angular, reactjs,.. đúng không.

Ứng dụng Blazor được xây dựng bởi việc sử dụng các components. Một component là một phần của giao diện người dùng (UI) độc lập như: page, dialog hoặc form. Một component bao gồm cả code HTML để hiển thị cùng với logic xử lý cần thiết để hiển thị dữ liệu hoặc phản hồi các sự kiện giao diện người dùng. Component rất mềm dẻo và gọn nhẹ, nó có thể lồng nhau, tái sử dụng và chia sẻ giữa các projects với nhau. 

# 1. Component classes
Component trong Blazor thông thường được triển khai trong  file *.cshtml*, sử dụng kết hợp của C# và HTML. UI cho một component được định nghĩa sử dụng HTML. Những logic render động (loops, conditionals, expressions) sử dụng cú pháp C# nhúng được gọi là Razor. Khi ứng dụng được biên dịch, HTML và C# rendering logic được chuyển đổi đến một component class. Tên của class đã được generate khớp với tên của file.

Member của component class được định nghĩa trong block ```@function```. Trong block ```@function```, trạng thái của component (properties, fields) được chỉ định cùng với các methods cho các xử lý sự kiện hoặc cho việc định nghĩa các logic component khác.

Member của component có thể tiếp tục được sử dụng như một phần logic rendering của component đó bằng việc sử dụng C# expressions cái mà bắt đầu với ```@```. Cho ví dụ, một trường C# được render bởi tiền tố @ trước tên của trường. Ví dụ bên dưới khai báo và render:

- ```_headingFontStyle``` đến giá trị thuộc tính ```font-size``` của CSS.
- ```_headingText``` đến nội dung của thẻ ```<h1>```.

```html
<h1 style="font-style:@_headingFontStyle">@_headingText</h1>

@functions {
    private string _headingFontStyle = "italic";
    private string _headingText = "Put on your new Blazor!";
}
```

Sau khi component khởi tạo hiển thị, component generate lại cây render của nó trong response tới event. Blazor tiếp tục so sánh cây render mới với cái trước đó và áp dụng bất kì sự sửa đổi nào đến DOM của trình duyệt.

# 2. Sử dụng components
Một component có thể bao gồm các components khác bởi việc khai báo sử dụng cú pháp của phần tử HTML. Code cho việc sử dụng một component giống một thẻ HTML nơi tên của thẻ là một kiểu component.

Code bên dưới render một thể hiện của ```HeadingComponent```(```HeadingComponent.cshtml):
```
<HeadingComponent />
```

# 3. Tham số component
Các component có thể có nhiều tham số, cái mà được định nghĩa bởi việc sử dụng thuộc tính non-public trên component class với đánh dấu thuộc tính ```[Parameter]```. Sử dụng các thuộc tính để chỉ định đối số cho component trong code html.

Trong ví dụ bên dưới, ```ParentComponent``` thiết lập giá trị của thuộc tính ```Title``` của ```ChildComponent```:

```ParentComponent.cshtml```:
```
@page "/ParentComponent"

<h1>Parent-child example</h1>

<ChildComponent Title="Panel Title from Parent">
    Child content of the child component is supplied by the parent component.
</ChildComponent>
```

```ChildComponent.cshtml:```
```
<div class="panel panel-success">
    <div class="panel-heading">@Title</div>
    <div class="panel-body">@ChildContent</div>
</div>

@functions {
    [Parameter]
    private string Title { get; set; }

    [Parameter]
    private RenderFragment ChildContent { get; set; }
}
```

# Child content
    
Component có thể thiết lập nội dung trong component khác. Ví dụ, ```ParentComponent``` có thể cung cấp nội dung cái mà để render bởi ```ChildComponent``` bởi việc đặt nội dung bên trong thẻ ```<ChildComponent>```

```ParentComponent.cshtml```:
```html
@page "/ParentComponent"

<h1>Parent-child example</h1>

<ChildComponent Title="Panel Title from Parent">
    Child content of the child component is supplied by the parent component.
</ChildComponent>
```

Child component có một thuộc tính ```ChildContent``` để biểu diễn một ```RenderFragment```. Giá trị của ```ChildContent``` được định vị trong html của child component nơi mà nội dung nên được hiển thị. Trong ví dụ bên dưới, giá trị của ```ChildContent``` được nhận từ parent component và hiển thị bên trong ```panel-body``` của Bootstrap.

```html
<div class="panel panel-success">
    <div class="panel-heading">@Title</div>
    <div class="panel-body">@ChildContent</div>
</div>

@functions {
    [Parameter]
    private string Title { get; set; }

    [Parameter]
    private RenderFragment ChildContent { get; set; }
}
```

# 4. Data binding trong component
Data binding cho cả component và phần tử DOM được hoàn thành với thuộc tính ```bind```. Ví dụ bên dưới bind thuộc tính ```ItalicsCheck``` tới trạng thái checked của checkbox:
```html
<input type="checkbox" class="form-check-input" id="italicsCheck" bind="@_italicsCheck" />
```

Khi checkbox được chọn và bỏ chọn, giá trị của thuộc tính được cập nhật thành ```true``` và ```false``` tương ứng.

Checkbox được cập nhật trong UI chỉ khi component được hiển thị xong, không có phản hồi trong khi thay đổi giá trị thuộc tính. Vì components tự render chính nó sau khi code xử lý event thực thi, các cập nhật thuộc tính thường được phản ánh trên UI ngay lập tức.

Việc sử dụng ```bind``` với thuộc tính ```CurrentValue``` (```<input bind="@CurrentValue" />```) cơ bản tương đương với bên dưới
```html
<input value="@CurrentValue" 
    onchange="@((UIValueEventArgs __e) => CurrentValue = __e.Value)" />
```

Khi component được hiển thị, giá trị của phần tử input đến từ thuộc tính ```CurrentValue```. Khi người dùng gõ trong textbox, sự kiện ```onchanges``` được bắn ra và thuộc tính ```CurrentValue``` được gán với giá trị đã được thay đổi. Thực tế, việc tạo code phức tạp hơn một chút bởi vì ```bind``` giải quyết với một vài trường hợp nơi mà việc chuyển đổi kiểu được thực hiện. Về nguyên tắc, ```bind``` liên kết giá trị hiện tại của một expression với thuộc tính ```value``` và xử lý các thay đổi bằng cách sử dụng ```handler``` đã đăng ký.

### Format strings
Data binding làm việc với định dạng ```DateTime``` (nhưng không làm việc với các định dạng khác ở thời điểm hiện tại, như tiền tệ hoặc số):
```
<input bind="@StartDate" format-value="yyyy-MM-dd" />

@functions {
    [Parameter]
    private DateTime StartDate { get; set; } = new DateTime(2020, 1, 1);
}
```

Thuộc tính ```format-value``` chỉ định định dạng ```date``` để áp dụng đến giá trị của phần tử ```input```. Định dạng cũng được dụng để chuyển đổi giá trị khi sự kiện ```onchange``` xảy ra.

### Tham số component

Binding cũng nhận ra các tham số component, nơi mà ```bind-{property}``` có thể ```bind``` một giá trị thuộc tính qua components.

Component bên dưới sử dụng ```ChildComponent``` và bind tham số ```ParentYear``` từ cha của nó đến tham số ```Year``` trên component con:

**Parent component:**
```html
@page "/ParentComponent"

<h1>Parent Component</h1>

<p>ParentYear: @ParentYear</p>

<ChildComponent bind-Year="@ParentYear" />

<button class="btn btn-primary" onclick="@ChangeTheYear">Change Year to 1986</button>

@functions {
    [Parameter]
    private int ParentYear { get; set; } = 1978;

    void ChangeTheYear()
    {
        ParentYear = 1986;
    }
}
```

**Child component:**
```html
<h2>Child Component</h2>

<p>Year: @Year</p>

@functions {
    [Parameter]
    private int Year { get; set; }

    [Parameter]
    private Action<int> YearChanged { get; set; }
}
```

Tham số ```Year``` có thể bind bởi vì nó có một sự kiện ```YearChanged``` đồng hành cái mà khớp nối với kiểu của tham số ```Year```.

```ParentComponent``` tạo bởi code html bên dưới:

```html
<h1>Parent Component</h1>

<p>ParentYear: 1978</p>

<h2>Child Component</h2>

<p>Year: 1978</p>
```

Nếu giá trị của thuộc tính ```ParentYear``` được thay đổi bởi việc chọn buton trong ```ParentComponent```, thuộc tính ```Year``` của ```ChildComponent``` được cập nhật. Giá trị mới của ```Year``` được hiển thị trên UI khi ```ParentComponent``` được hiển thị:

```html
<h1>Parent Component</h1>

<p>ParentYear: 1986</p>

<h2>Child Component</h2>

<p>Year: 1986</p>
```

# 5. Tổng kết
Bài viết được tham khảo và lược dịch từ bài viết gốc [Blazor components](https://blazor.net/docs/components/index.html). Trong đó tìm hiểu một số khái niệm và thành phần cơ bản về Component trong Blazor. Trong các bài viết sau mình sẽ tìm hiểu sâu hơn về các event handler của component. Hy vọng sẽ mang đến các cho các bạn những điều bổ ích. Blazor là mới, nó chưa áp dụng cho sản phẩm vào thực tế, nhưng theo mình nó có trể một lựa chọn tốt cho những lập trình viên .Net để đi theo hướng FullStack sau này.