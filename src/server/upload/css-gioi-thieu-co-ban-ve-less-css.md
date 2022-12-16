![](https://images.viblo.asia/5e09695f-55f7-4e3e-b5c5-22d76aafce33.PNG)

**CSS** là ngôn ngữ đơn giản, không quá nhiều syntax, luật lệ phức tạp, đặc biệt dễ học dù bạn chỉ mới bắt đầu. Cũng vì lý do đó nên CSS không hỗ trợ các tính năng phức tạp về hàm và biến… đó cũng khiến CSS trở nên không linh hoạt trong quá trình viết mã tối ưu, khả năng dùng lại rất hạn chế.

Các điểm yếu của CSS vừa nêu đã trở thành lý do các nhà phát triển website cho ra đời LESS, các thư viện JavaScript hỗ trợ viết CSS như một ngôn ngữ lập trình thực sự.

## LESS là gì ?
**LESS** là một trong các CSS preprocessor, hỗ trợ bạn viết mã CSS thể hiện định dạng giao diện website theo hướng:

– Đơn giản hơn.

– Ngắn gọn hơn.

– Hiệu quả hơn.

– Dễ quản lý hơn qua việc sử dụng các thành phần hỗ trợ từ LESS như biến, mixins, toán tử và hàm.
## Cài đặt
### Client
Trước tiên bạn cần tải về file “less.js” phiên bản mới nhất từ địa chỉ website : http://lesscss.org/#download-options

Sau đó, tạo file mới có phần mở rộng là '.less' chứa mã LESS CSS của bạn và thêm vào mã code HTML:
```
<link rel="stylesheet/less" type="text/css" href="styles.less">
<script src="less.js" type="text/javascript"></script>
```
Phải chắc chắn rằng file `.less` được đặt trước `less.js`.

Để Client - side tự động cập nhật khi style có thay đổi bạn cần thêm tính năng “Watch mode” bằng cách thêm '#!watch' vào cuối URL và refresh lại trang.

Hoặc thêm lệnh javascript 'less.watch()' vào mã code của trang.
### Server
Để sử dụng less trên server-side , chúng ta dùng npm:

`$ npm install less`

Cụ thể , sau khi cài đặt xong bạn có thể gọi trình biên dịch từ npm như sau:

var less = require('less');
 
```
less.render('.class { width: 1 + 1 }', function (e, css) {
    console.log(css);
});
```
Hoặc parse vào trình biên dịch bằng tay 

```
var parser = new(less.Parser);
 
parser.parse('.class { width: 1 + 1 }', function (err, tree) {
    if (err) { return console.error(err) }
    console.log(tree.toCSS());
});
```
Ngoài ra less còn cho phép gọi trực tiếp từ trình biên dịch file như sau :

`$ lessc styles.less`

Css đã biên dịch sẽ ghi ra file stdout, bạn có thể ghi nó ra file tùy chọn:

`$ lessc styles.less > styles.css`

## Sử dụng
Không giống như CSS thông thường, LESS hoạt động như một ngôn ngữ lập trình, nó cũng có khai báo biến, toán tử…
### Khai Báo Biến (Variables)
Trước hết chúng ta cùng xem lại cách mà chúng ta viết câu lệnh CSS bình thường.
```
.class1 {
    background-color: #2d5e8b;
}
.class2 {
    background-color: #fff;
    color: #2d5e8b;
}
.class3 {
    border: 1px solid #2d5e8b;
}
```
Và đây là cách mà LESS làm tương tự :
```
@color-base: #2d5e8b;
.class1 {
    background-color: @color-base;
}
.class2 {
    background-color: #fff;
    color: @color-base;
}
.class3 {
    border: 1px solid @color-base;
}
```
Chúng ta dễ dàng nhận thấy **LESS** khai báo biến `@color-base: #2d5e8b;`   là màu dùng chung cho cả 3 lớp (class). Và với kiểu khai báo thế này, thì chỉ mỗi khi bạn sử dụng , chỉ cần gọi lại biến `@color-base`, đồng thời sau này nếu bạn muốn đổi màu thì chỉ cần thay đổi màu tại biến `@color-base`. Thật tiện lợi và dễ điều chỉnh phải không các bạn.
### Mixins
Mixins cho phép gắn toàn bộ thuộc tính của một class trong CSS vào trong class khác bằng một cách khá đơn giản là thêm tên class này như một thuộc tính của class kia. Bạn có thể hiểu như việc bạn gọi 1 class đã định nghĩa trước đó trong 1 class bất kỳ nào đang định nghĩa để sử dụng lại các giá trị của chúng.

Để hiểu rõ hơn thì chúng ta cùng xem ví dụ:

Giả sử chúng ta khai báo một lớp (class) dùng cho hiển thị màu gradient như sau:
```
.gradients {
    background: #eaeaea;
    background: linear-gradient(top, #eaeaea, #cccccc);
}
```
Và khi bạn muốn áp dụng màu gradient này vào bất cứ khai báo nào khác , thì chỉ cần đặt `.gradients` vào ngay bên trong là được :
```
div {
    .gradients;
    border: 1px solid #555;
    border-radius: 3px;
}
```

Đoạn css trên tương đương với cách mà chúng ta viết CSS thường  ngày thế này:
```
div {
    background: #eaeaea;
    background: linear-gradient(top, #eaeaea, #cccccc);
    border: 1px solid #555;
    border-radius: 3px;
}
```
Với việc sử dụng thế này, **LESS** sẽ giúp file css của bạn ngắn gọn và dễ hiểu hơn rất nhiều. Ngoài ra bạn cũng có thể đặt tham số khi sử dụng LESS.
```
.rounded-corners (@radius: 5px) {
    border-radius: @radius;
}
 
#header {
    .rounded-corners;
}
#footer {
    .rounded-corners(10px);
}
```

Đoạn css trên tương đương với cách viết sau:
```
#header {
    border-radius: 5px;
}
#footer {
    border-radius: 10px;
}
```
### Nested Rules
Thay vì viết các tên selector dài để chỉ ra các quan hệ thừa kế trong CSS, với Less bạn có thể lồng các selector và nhau. Việc này làm cho quan hệ thừa kế trở nên rõ ràng hơn và code stylesheet cũng ngắn gọn hơn. Chúng ta cùng xét ví dụ sau:
```
nav {
    height: 40px;
    width: 100%;
    background: #455868;
    border-bottom: 2px solid #283744;
}
nav li {
    width: 600px;
    height: 40px;
}
nav li a {
    color: #fff;
    line-height: 40px;
    text-shadow: 1px 1px 0px #283744;
}
```
Trong cách viết CSS thông thường này, để áp đặt thuộc tính cho các phần tử con, bạn phải chỉ định phần tử cha đứng trước nó, nhưng với LESS, thì việc này đơn giản và rõ ràng hơn nhiều:
```
nav {
    height: 40px;
    width: 100%;
    background: #455868;
    border-bottom: 2px solid #283744;
    li {
        width: 600px;
        height: 40px;
        a {
            color: #fff;
            line-height: 40px;
            text-shadow: 1px 1px 0px #283744;
        }
    }
}
```
Ngoài ra bạn còn có thể ấn định pseudo-classes, như :hover, vào selector bằng cách sử dụng kí tự `&`. Các bạn có thể tham khảo đoạn css sau:
```
a {
    color: #fff;
    line-height: 40px;
    text-shadow: 1px 1px 0px #283744;
    &:hover {
        background-color: #000;
        color: #fff;
    }
}
```
### Operation (Toán tử)
Với **LESS** bạn có thể thực hiện các phép tính như cộng , trừ , nhân chia. Cùng xem ví dụ sau nhé:
```
@height: 100px
 
.element-A {
    height: @height;
}
.element-B {
    height: @height * 2;
}
```
Như bạn đã thấy ở đoạn css trên, đầu tiên chúng ta lưu trữ giá trị biến `@height`, và rồi ấn định giá trị này cho lớp `element-A.` Và khi đến lớp `element-B`, chúng ta sử dụng biến `@height` một lần nữa, nhưng lần này giá trị của nó đã được nhân đôi.
### Scope
LESS cũng cung cấp thêm một khái niệm là Scope, nơi mà biến sẽ được thừa hưởng trong phạm vi gần nó nhất. Để dễ hiểu hơn , chúng ta cùng xem ví dụ sau:
```
header {
    @color: black;
    background-color: @color;
    nav {
        @color: blue;
        background-color: @color;
        a {
            color: @color;
            
        }
    }
}
```
Trong ví dụ trên,  header sẽ có màu background là màu đen, trong khi màu nav là màu xanh da trời, và màu của a cũng là màu xanh da trời.


-----


**LESS** chỉ là một trong số những giải pháp của CSS pre-processor, bạn có thể sử dụng  SASS hoặc Stylus. Mình hy vọng là với bài viết này, các bạn sẽ có thêm một kiến thức mới về cách sử dụng CSS.

**Chúc các bạn thành công !**

Nguồn tham khảo: http://lesscss.org/