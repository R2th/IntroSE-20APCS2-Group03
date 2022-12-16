![](http://i.giphy.com/ZVik7pBtu9dNS.gif)

Trong này này: ([LINK BÀI VỀ REGEX](https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-Az45bnoO5xY)). Mình đã hướng dẫn các bạn cách học Regex từ cơ bản đến nâng cao. Giờ thì các bạn đã `cắt chuỗi` thành thần rồi đúng không? Nếu bạn chưa dùng ngon Regex, mình khuyên bạn hãy đọc lại bài đó trước rồi hãy đọc bài này.

Giờ để nâng tầm cao của Regex lên một chút, ta hãy dùng nó để làm thứ gì đó `hay ho` và `nguy hiểm` xem sao. Tại sao ta không tận dụng hết sức mạnh của Regex và làm hẳn một `Bộ Gen Code Tự Động` nhỉ?

Nghe đã thấy sướng rồi đúng không?

# Bộ gen code tự động (Scaffolding)
Nếu các bạn từng code C# Asp.Net MVC 5. Khi sử dụng Visual Studio để tạo mới một màn hình ta sẽ gặp màn hình này. 

![](https://i.stack.imgur.com/Jufhq.png)

Ta gõ tên màn hình muốn tạo (ControllerName). Rồi chọn một Model class (bảng dữ liệu) đã được định nghĩa gồm các trường A,B,C. Và Visual Studio sẽ tự động tạo ra các file gồm Controller, Views cho chúng ta. 

Quá tiện lợi phải không? Đó chính là công nghệ gọi là Scaffolding (tạo code và tạo file tự động).

Để tạo được file tự động thì hẳn là Visual Studio phải có một cái mẫu viết sẵn để gen ra được đống code kia. Nhưng bạn sẽ khó có thể chỉnh sửa được template đó theo ý muốn của mình. Thay vào đó, sao ta không tự tạo ra bộ gen code của mình nhỉ? bạn sẽ tùy thích tạo file có mẫu viết theo ý của mình, trong đó có các hàm được tạo sẵn theo mục đích bạn muốn.

# Chúng ta cần những gì?

Rất đơn giản, chúng ta cần làm những bước sau đây:

1. Đầu vào cho hàm Regex cắt chuỗi, đó là một đoạn Text mô tả các trường bạn cần lấy ra (các cột của bảng dữ liệu). Nếu bạn có 1 file class Model (định nghĩa bảng) bạn cũng hoàn toàn dùng string bên trong đó để cắt ra `Tên Trường` để đưa vào template code.
1. Chuỗi template để gắn `tên trường` cắt được bên trên vào
1. Tạo ra các file tương ứng và download về thư mục code để bắt đầu dùng.
 
 ## Cắt chuỗi từ Model và lấy ra mảng các tên cột
 Chúng ta luôn thiết kế DB trước khi code. Và hiển nhiên là sẽ có được một clas Model trước. Do đó việc cần làm bây giờ là đi cắt các tên cột đã tạo ra để đưa vào một List, phục vụ cho việc nối chuỗi template sau này.
 
 Hãy sử dụng http://regex101.com như bình thường:
 
 
 ![](https://github.com/chungminhtu/ToolGenCode/blob/master/Regex_Field.gif?raw=true)
 
 
 Như vậy là đã xong. Sử dụng trang regex101 ta đã copy đc cả một đoạn code Javascript có sẵn hàm lấy ra các trường. Ta sửa sang lại đoạn code đó một chút như sau:
 
 ```js
 /*-- Hàm RegEx để cắt và lấy ra các trường --*/
function GetFields(){
    ListField = [];
    const regex = /public .* (\w+) { get; set; }/g;
    var str= $("#InputModel").val(); //Chuỗi Model dùng để cắt các trường, được lấy từ một html input tự nhập.
    let m;
    while ((m = regex.exec(str)) !== null) {  //Lặp lại quá trình so khớp chuỗi regex với chuỗi str để tìm group phù hợp
        var matches = [];
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            matches.push(`${match}`); //Tìm được các Group match thì lưu lại vào mảng
        });
        ListField.push(matches[1]); //Ở đây ta cần lấy Group1 (Tương đương $1) để lưu lại vào mảng ListField
    }
}
 ```
 
 Lúc này ta thấy là cần phải tạo một file html, trong đó có chứa một input box để nhập vào chuỗi text Model string. Ta hãy tạo một file html đơn giản như sau:
 
 ```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TOOL GEN CODE TỰ ĐỘNG v1.0</title>

    <!--Sử dụng Bootstrap và Jquery để thao tác với input html-->
    <link rel="stylesheet" href="css_js/bootstrap.min.css">
    <script src="css_js/jquery.min.js"></script>
    <script src="css_js/bootstrap.min.js"></script>

    <!--Sử dụng hightlight.js để format code có màu cho đẹp-->
    <link rel="stylesheet" href="css_js/vs.min.css">
    <script src="css_js/highlight.min.js"></script>
    <script>
        hljs.initHighlightingOnLoad();
    </script>
</head>

<body>
    <!--Dùng Bootstrap tạo Panel cho dễ nhìn-->
    <div class="panel panel-default">
        <div class="panel-heading">TOOL GEN CODE TỰ ĐỘNG v1.0</div>
        <div class="panel-body">
            <div class="form-group">
                <label>Nhập tên màn hình</label>  
                <!-- Chúng ta cần nhập tên màn hình (tên bảng) cần tạo ở đây -->
                <input id="ScreenName" style="width:100%;" value="Product"/> 
            </div>
            <div class="form-group">
                <label>Nhập các trường (Data Model)</label>
                <!-- Chúng ta cần nhập chuỗi mô tả bảng Model ở đây-->
                <textarea id="InputModel" rows="8" style="width:100%;">
                </textarea>
            </div>
            <button class="btn btn-primary" onclick="Preview()">Xem Trước</button>
            <button class="btn btn-info" onclick="DownloadAll()">Download về</button>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">Kết quả sau khi Gen Code</div>
        <div class="panel-body">
            <!--Ở đây có dùng highlight.js để hiển thị code gen ra có màu mè cho đẹp và dễ nhìn-->
            <label>GenCode_Controller</label>
            <pre><code class="csharp" id="resultController"></code></pre>
            <label>GenCode_Repository</label>
            <pre><code class="csharp" id="resultRepository"></code></pre>
            <label>GenCode_Interface</label>
            <pre><code class="csharp" id="resultInterface"></code></pre>
            <label>GenCode_View_Index</label>
            <pre><code class="csharp" id="resultView_Index"></code></pre>
            <label>GenCode_View_Detail</label>
            <pre><code class="csharp" id="resultView_Detail"></code></pre> 
        </div>
    </div>
```

## Bắt đầu viết template để tạo nội dung code

Ở ví dụ lần này mình muốn viết một trang MVC5, code có sử dụng Repository. Do đó ta cần tạo ra các file sau đây:

![](https://images.viblo.asia/f91089a4-be7c-4ff8-bc5f-4cf76f843dc6.jpg)

Đối với  file `Controller.cs` thì ta cần truyền chuỗi tên màn hình `(Screen)` vào cho controller để Gen code. Ta viết hàm như sau:

```cs
function GenCode_Controller(){
var strController = 'using System.Data;\n' +
                    'using System.Linq;\n' +
                    'using System.Web.Mvc;\n' +
                    'using ExampleStore.DAL;\n' +
                    'using ExampleStore.Models;\n' +
                    '\n' +
                    'namespace ExampleStore.Controllers\n' +
                    '{\n' +
                    '    public class ' + Screen + 'Controller : Controller\n' +
                    '    {\n' +
                    '         private I' + Screen + 'Repository _' + Screen + 'Repository;\n' +
                    '\n' +
                    '         public ' + Screen + 'Controller()\n' +
                    '        {\n' +
                    '            this._' + Screen + 'Repository = new ' + Screen + 'Repository(new ' + Screen + 'Context());\n' +
                    '        }\n' +
                    '\n' +
                    '       public ActionResult Index()\n' +
                    '        {\n' +
                    '            var ' + Screen + 's = from ' + Screen + ' in _' + Screen + 'Repository.Get' + Screen + 's()\n' +
                    '                             select ' + Screen + ';\n' +
                    '            return View(' + Screen + 's);\n' +
                    '        }\n' +
                    '\n' +
                    '       public ViewResult Details(int id)\n' +
                    '       {\n' +
                    '           ' + Screen + ' student = _' + Screen + 'Repository.Get' + Screen + 'ByID(id);\n' +
                    '           return View(student);\n' +
                    '       }\n' +
                    '\n';
return strController;
}
```

Rất đơn giản chỉ là một chuỗi text nối với Screen. Chỗ nào cần thay tên màn hình thì ta nối vào.  

> Để đỡ vất vả khi tạo template text này các bạn hãy nhớ áp dụng Regex và Notepad++ thần thánh nhé:
> 
>
> ![](https://github.com/chungminhtu/regex_practices/blob/master/Nodepad++KepChuoi.gif?raw=true)
 
 Chỗ này chưa có sử dụng đến các trường (cột). Ta hãy viết tiếp code gen file cshtml như sau:
 
 ```cs
 function GenCode_View_Index(){
var template = '';
ListField.forEach(function(item){  //Lấy các trường trong mảng ra để nối lại thành chuỗi template cần thiết
    template += '         <th>\n '+
                '             @Html.DisplayNameFor(model => model.'+item+')\n '+
                '         </th>\n '
    });
var strView_Index = ' @model IEnumerable<ExampleStore.Models.' + Screen + '>\n '+
                    ' @{\n '+
                    '     ViewBag.Title = "Index";\n '+
                    ' }\n '+
                    ' <h2>Index</h2>\n '+
                    ' <p>\n '+
                    '     @Html.ActionLink("Create New", "Create")\n '+
                    ' </p>\n '+
                    ' <table>\n '+
                    '     <tr>\n '+
                    template +  //Nối chuỗi template vào chuỗi cần ở Index.cshtml
                    '         <th></th>\n '+
                    '     </tr>\n '+
                    ' @foreach (var item in Model) {\n '+
                    '     <tr>\n '+
                    template +
                    '         <td>\n '+
                    '             @Html.ActionLink("Edit", "Edit", new { id=item.Id }) |\n '+
                    '             @Html.ActionLink("Details", "Details", new { id=item.Id }) |\n '+
                    '             @Html.ActionLink("Delete", "Delete", new { id=item.Id })\n '+
                    '         </td>\n '+
                    '     </tr>\n '+
                    ' }\n '+
                    ' </table>\n ';
return strView_Index;
}
 ```
 
Hàm cuối cùng chúng ta cần là một hàm để download các file sau khi đã tạo

 ```js
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}
 ```
 
 Thêm chút mắm muối và ta được file hoàn chỉnh như sau:  [DEMO](https://chungminhtu.github.io/ToolGenCode/)
 
 Link source trong bài:  [SOURCE](https://github.com/chungminhtu/ToolGenCode/blob/master/index.html)
 
 # Kết luận
 
 Dĩ nhiên bài viết demo lần này chỉ lấy ví dụ đơn giản và giúp các bạn tự tạo cho mình một tool gen code đơn giản. Nó chưa có gì cao siêu nhưng mình tin là nó sẽ giúp ích rất nhiều cho các bạn trong công việc hàng ngày. Ít nhất là việc coding lỗi do copy paste nhầm sẽ giảm thiểu.

Điểm hay nữa của template này là nó chạy online được. Bạn là team lead có thể tạo template phức tạp cho các màn hình, để các bạn khác dùng gen ra code có chung cấu trúc, tránh đặt tên file, tên biến linh tinh không theo quy tắc. Sau này có sửa thì code cũng đã code base chung nên sẽ dễ debug. Nói chung làm việc nhóm có cái này rất tiện.
 
Bạn có thể sửa và nâng cấp thêm source này để có nhiều tính năng hay ho hơn nữa. Nếu bạn có ý tưởng gì hay ho hơn hoặc bạn đã từng làm tool để sử dụng cho mình, hãy chia sẻ kinh nghiệm ở phần comment nhé.
 
Cảm ơn các bạn đã đọc bài! Đừng quên Share và Upvote nhé X-)