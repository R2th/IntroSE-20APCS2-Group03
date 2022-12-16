Một trong những tính năng cơ bản của các libraries và framework hiện đại là data binding. Tính năng data binding được cung cấp bởi chúng giữ đồng bộ giữa model và view. Bạn đã từng tự hỏi làm thế nào những cái tưng tự như vậy có thể được triển khai trong JavaScript thuần? Nếu vậy bài viết này chỉ ra cho bạn một triển khai đơn giản như vậy nhưng có thể hoạt động. Mặc dù vậy bài viết này không có dự định để thay thế những gì mà các libraries và frameworks đã cung cấp, nó chắc chắn sẽ mang đến cho một bạn một cái nhìn thoáng qua làm thế nào data binding được triển khai nếu cần.

# Ví dụ một Data binding
Bây giờ, hãy xem những gì chúng ta sẽ phát triển. Vui lòng quan sát hình bên dưới:

![](https://images.viblo.asia/61f2632b-b315-45e9-b078-21225289c842.png)


Hình trên trình diễn hai textboxes và một thẻ ```<div>``` hiển thị một message 'Hello World!'. Message này thực tế đến từ thuộc tính **Message** của một đối tượng JavaScript. Bất kì khi nào bạn thay đổi gia trị trong textboxes thì ```data binding impementation``` của chúng ta sẽ đẩy những thay đổi đến các đối tượng ngầm định (model). Trên cùng một dòng bất kì khi nào bạn thay đổi thuộc tính **Message** những thay đổi được ánh xạ trên giao diện người dùng. Với cách này thuộc tính **Message** và tất cả các phần tử UI được giữ đồng bộ với nhau.

# Code HTML
Trang ở trên sử dụng code HTML bên dưới:
```html
<input type=text id="textBox1">
<br /><br />
<input type=text id="textBox2">
<br /><br />
<div id="divMessage"></div>
```

Trang bao gồm hai textboxes với ID là 'textbox1' và 'textBox2' tương ứng. Có một thẻ ```<div>``` với ID là 'divMessage'. Bạn có thể đặt code html này trong một file html bất kì hoặc bên trong file view trong các framewok (ví dụ .cshtml trong ASP.NET MVC).    

# Code JavaScript code thực hiện data binding
Trước khi chúng ta tiếp tục và làm sáng tỏ code cái mà triển khai data binding, hãy nhìn việc sử dụng của cái gì chúng ta sẽ phát triển. Bằng cách đó bạn sẽ có được ý tưởng tốt hơn về các tính năng đang được triển khai. Xem xét code JavaScript bên dưới:

```javascript
var obj = {};
obj.Message = "Hello World!";

var dataBinder = new DataBinder({
    "model": obj,
    "property": "Message"
});

dataBinder.addDataBinding("textBox1", "value", "keyup");
dataBinder.addDataBinding("textBox2", "value", "keyup");
dataBinder.addDataBinding("divMessage", "innerHTML");

obj.Message = "Hello Universe!";
```

Code JavaScript ở trên có thể đặt bên trong một thẻ ```<script>``` tại cuối file HTML. Hãy nhìn cái gì code đang làm.
Code tạo một đối tượng JavaScript mới 'obj' và gán text 'Hello World!' tới thuộc tính **Message** của nó.
Tiếp theo nó xử lý để tạo một đối tượng ```DataBinder``` mới. ```DataBinder``` là gì? Nó là một function JavaScript chúng ta sẽ tạo sau. Function ```DataBinder``` là trái tim của việc triển khai data binding. Nếu bạn thấy cú pháp, chúng ta đang tạo một **function object** sử dụng từ khóa ```new```. Chúng ta cũng truyền đối tượng khác đến contructor cái mà chứa một vài settings.

###
Settings object được truyền trong contructor có hai thuộc tính:

- Model: Nắm giữ object trên cái mà data binding được triển khai.
- Property: Nắm giữ tên của thuộc tính object cái mà sẽ tham gia databinding

###
Ba dòng tiếp theo định nghĩa data binding giữa đối tượng model và phần tử UI. Đối tượng ```DataBinder``` trình bày một phương thức ```addDataBinding()``` có 2 tham số:
- ID của phần tử UI đang tham gia trong data binding
- Thuộc tính DOM của phần tử UI sẽ tham gia trong quá trình data binding. Đối với textboxes, chúng ta muốn để data bind thuộc tính ```value``` trong khi với thẻ ```<div>``` chúng ta muốn để data liên kết thuộc tính ```innerHTML```
- Tham số tùy chọn thứ 3 là tên của sự kiện mà sẽ trigger sự đồng bộ giữa model và UI. Nó có thể áp dụng tới textboxes khi chúng có khả năng của việc thay đổi giá trị khi user nhập dữ liệu. Chúng ta sử dụng sự kiện```keyup``` cho mục đính này. Mặt khác thẻ ```<div>``` hiển nhiên là không có tham số này.

###
Cuối cùng, chúng ta set thuộc tính **Message** của đối tượng model với 'Hello Universe!' (nhớ rằng giá trị mặc định là 'Hello World!'). Điều này chỉ kiểm tra liệu data binding của chúng ta làm việc như mong đợi hay không khi trang được load trên trình duyệt.

# Triển khai của DataBinder
Thêm một file JavaScript dưới thư mục wwwroot và viết bộ khung của function ```DataBinder``` như bên dưới đây:
```js
function DataBinder(settings) {
   ...
}
```
####
Function ```DataBinder``` có một đối tượng ```settings``` là tham số

####
Bây giờ, hãy hoàn thành function này từng bước một.

####
Thêm code bên dưới bên trong function ```DataBinder()```
```js
 _this = this;
this.dataBindings = [];
this.value = settings.model[settings.property];
```

Lưu trữ ở trên tham chiếu ```this``` trong một biến local được gọi là ```_this```. Chúng ta làm điều này để ```_this``` có thể sử dụng một cách an toàn bên trong những block code khác của ```DataBinder()```. Tiếp theo chúng ta khai báo một mảng ```dataBindings```. Mảng ```dataBindings``` nắm giữ một danh sách 'binding objects'. Một 'binding objects' về cơ bản là một cặp của phần tử HTML và thuộc tính DOM của nó cái mà để dữ liệu ràng buộc. Mảng ```dataBinding``` được sinh ra bởi function ```addDataBinding()``` được thảo luận sau.

####
Tiếp theo code thiết lập  'value member' của ```DataBinder``` đến giá trị thuộc tính của model. Lưu ý các lấy giá trị thuộc tính model thu được bằng sử dụng cú pháp dictionary. Trong ví dụ cụ thể của chúng ta, model sẽ là ```obj``` và thuộc tính sẽ là ```Message```.

####
Tiếp theo, thêm đoạn code sau bên dưới phần code phía trên:
```js
this.propertyGet = function () {
    return _this.value;
};


this.propertySet = function (value) {
    _this.value = value;
    for (var i = 0; i < _this.dataBindings.length; i++) {
        var binding = _this.dataBindings[i];
        binding.element[binding.attribute] = value;
    }
};

Object.defineProperty(settings.model, settings.property, {
    get: this.propertyGet,
    set: this.propertySet
});
```

Đây có thể nói là phần quan trọng nhất của function ```DataBinder```. Ở đây, chúng ta định nghĩa 2 function tên là ```propertyGet()``` và ```propertySet()```. Function ```propertyGet()``` trả về giá trị đến nơi gọi nó. Function ```propertySet()``` thiết lập giá trị và thiết lập thuộc tính DOM của tất cả các phần tử HTML tham gia quá trình data binding. Điều này được làm bởi việc lặp thông qua mảng ```dataBindings``` và thiết lập giá trị đến các thuộc tính của phần tử DOM.

####
JavaScript cho phép bạn chỉ định các function tùy chỉnh ```getter``` và ```setter``` cái mà được sử dụng khi thuộc tính của đối tượng được truy cập.

``` Object.defineProperty() ``` có 3 tham số:

- Đối tượng có thuộc tính cần tùy chỉnh ```getter``` và ```setter``` - Trong trường hợp này là ```obj```.
- Thuộc tính của đối tượng có quyền truy cập được cấp thông qua tùy chỉnh ```getter``` và ```setter``` - Trong trường hợp này là ```Message```.
- Function tùy chỉnh **set** và **get** được bao trong một object.

###
Bây giờ chúng ta sẽ thêm phương thức ```addDataBinding()``` như bên dưới:
```js
this.addDataBinding = function (element, property, event) {

    var domElement = document.getElementById(element);

    var binding = {
        element: domElement,
        property: property
    };

    if (event) {
        domElement.addEventListener(event, function () {
            _this.propertySet(domElement[property]);
        });
        binding.event = event;
    }
    this.dataBindings.push(binding);
    domElement[property] = _this.value;
    return _this;
};
```
###
Phương thúc ```addDataBinding()``` có 3 tham số. Bên trong, chúng ta lấy phần tử HTML đích bằng việc sử dụng ```getElementById()``` và lưu trữ tham chiếu của nó trong biến ```domElement```.

####
Tiếp đến code tạo một đối tượng định nghĩa binding chứa hai thuộc tính tên là ```element``` và ```property```. Đối tượng 'binding definition' cũng có thể có thuộc tính ```event``` tùy chọn. Thuộc tính ```event``` được gán chỉ cho những phần tử này nơi một sự kiện HTML(giống như ```keyup```) được chỉ định trong khi việc thêm một data binding. Đó là tại sao chúng ta kiểm tra tham số ```event``` và nếu trình diễn một ```event handler``` sử dụng phương thức ```addEventListener```. ```event handler``` đơn giản gọi thuộc tính tùy chỉnh ```setter``` bởi việc truyền giá trị phần tử DOM. Cách này thuộc tính của model được đồng bộ với giá trị của phần tử UI.

####
Đối tượng ```binding definition``` tiếp theo được đẩy tới mảng ```databindings``` sử dụng phương thức ```push()```. Cuối cùng, thuộc tính của phần tử DOM được đồng bộ với ```value member```. Chúng ta cần làm điều này để khi thêm một binding mới phần tử UI sẽ ánh xạ tới giá trị của thuộc tính của model.

####
Cuối cùng, hoàn thành ```DataBinder``` với dòng này:
```js
settings.model[settings.property] = this.value;
```
Bây giờ thêm một tham chiếu  ```<script>``` đến file DataBinder.js bạn vừa tạo trong Index.
```html
<script src="DataBinder.js"></script>
```

Chạy trang Index và thử thay đổi giá trị trong textboxes. Nếu tất cả hoạt động tốt bạn nên thấy tất cả 3 phần tử DOM đồng bộ giá trị với nhau. Sau đây là hình ảnh kết quả chạy:
![](https://images.viblo.asia/7cb42573-9c2b-4cfd-9c8c-fd66f52d4dab.png)

# Tổng kết
Có lẽ các bạn đã quen thuộc với data binding trong các libraries và framework JavaScript hiện đại như Angular, React, Vuejs,.. Nhưng trong trường hợp không sử dụng thư viện nào chúng ta vẫn hoàn toàn có thực hiện data binding với JavaScript thuần. Biết đâu đó bài này có thể giúp các bạn hiểu sâu hơn về cơ chế data binding của các thư viện đang dùng. Hy vọng mang bài viết đến cho các bạn những điều thú vị.

###
Bài viết được dịch từ nguồn: [Implement Two-Way Data Binding In JavaScript](http://www.binaryintellect.net/articles/e86f1949-dad7-434f-b086-387b9f0c4f7b.aspx)