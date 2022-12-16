Nếu bạn đang bắt đầu học CSS, thì `display` là thuộc tính cơ bản cần phải nắm được vì bạn có thể sẽ mất rất nhiều thời gian để sửa lỗi CSS nếu không hiểu rõ cách hoạt động của thuộc này. Tin tôi đi - Tôi đã viết rất nhiều CSS mà không biết chính xác mình đang làm gì và tôi đã học được rằng tốt hơn hết là hãy hiểu các quy tắc hoạt động của CSS thay vì chỉ sửa đổi nó. Trong bài viết này, tôi sẽ giải thích cách hoạt động của thuộc tính `display` trong CSS, trình bày những cách sử dụng phổ biến nhất của thuộc tính này cùng với các ví dụ trực quan.

### Thuộc tính display là gì?
Thuộc tính hiển thị cho phép bạn xác định sự xuất hiện của các phần tử trang một cách khác đi so với cài đặt mặc định của chúng. Đây là một khả năng mạnh mẽ và hầu hết các trang web hiện đại - bao gồm cả những trang web được xây dựng bằng Bootstrap CSS - tận dụng nó ở một mức độ nào đó.

Mọi phần tử HTML được đại diện bởi một box chứa nội dung và xác định khoảng cách xung quanh nội dung. Thuộc tính display trong CSS chỉ định cách hộp này xuất hiện trên trang web so với các phần tử khác, cũng như hành vi của các phần tử con của nó (tức là các phần tử bên trong nó).

Trong CSS có hai “cấp độ” mà box này có thể áp dụng: `block` và `inline`:

* Các phần tử cấp `block` tồn tại trên dòng riêng của chúng và kéo dài toàn bộ chiều rộng của trang (hoặc chiều rộng được chỉ định của `block` đó). `<div>` và `<p>` là các ví dụ về các phần tử cấp `block`.
* Các phần tử cấp `inline` thì ngược lại, chúng có thể tồn tại trên cùng một dòng. `<span>`, `<b>` và `<a>` là các phần tử cấp `inline`.

Bây giờ chúng ta sẽ cùng xem xét các giá trị phổ biến nhất của thuộc tính `display`.

### Các giá trị của thuộc tính `display` trong CSS
Theo mặc định, các trình duyệt hiển thị các phần tử nhất định ở các cấp độ khác nhau. Ví dụ: các phần tử `<div>` được hiển thị dưới dạng `block` trong khi các phần tử `<span>` xuất hiện hiển thị dưới dạng `inline`, như được minh họa bên dưới:

```html
<body>

<div id="div-0"> This is my first div.</div>

<div id="div-1"> This is my second div.</div>

<div id="div-2"> This is my third div.</div>

<br>

<span id="span-0">This is my first span.</span>

<span id="span-1">This is my second span.</span>

<span id="span-2">This is my third span.</span>

</body>

<style type="text/css">

body { font-family: "Avenir Heavy"; }

div, span {

background-color: #2e3f50;

padding: 10px;

border-radius: 5px;

}

div { color: #fd8f59; }

span { color: #1ebda5; }

</style>
```

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property-4.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property-4.png)

Ở đây, ba phần tử `<div>` đầu tiên là các `block` - mỗi `block` kéo dài theo chiều rộng của trang và bắt đầu trên một dòng mới. Ngược lại, ba phần tử `<span>` tồn tại trên cùng một dòng và chiều rộng và chiều cao của chúng được xác định bởi văn bản bên trong chúng (và một số `padding` mà tôi đã thêm).

Thuộc tính `display` có thể ghi đè các kiểu hiển thị mặc định này. Vì vậy, hãy xem có gì thay đổi khi chúng ta áp dụng các quy tắc `display` khác nhau.

#### CSS display: inline
Giá trị `inline` của thuộc tính `display` sẽ biến bất kỳ phần tử nào thành phần tử `inline`. Các phần tử này sẽ xuất hiện trên cùng một dòng mà không có dấu ngắt, giống như cách hoạt động của các phần tử `<span>`.

```html
<body>

<div id="div-0"> This is my first div.</div>

<div id="div-1"> This is my second div.</div>

<div id="div-2"> This is my third div.</div>

<br>

<span id="span-0">This is my first span.</span>

<span id="span-1">This is my second span.</span>

<span id="span-2">This is my third span.</span>

</body>

<style type="text/css">

body { font-family: "Avenir Heavy"; }

div, span {

background-color: #2e3f50;

border-radius: 5px;

display: inline;

}

div { color: #fd8f59; }

span { color: #1ebda5; }

</style>
```

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property-Nov-23-2020-03-15-29-81-PM.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property-Nov-23-2020-03-15-29-81-PM.png)

**Lưu ý:** tôi đã bỏ qua các `padding` để minh họa rõ hơn tác dụng của `inline`. Ngoài ra, chiều rộng và chiều cao của các phần tử `inline` được xác định bởi nội dung chúng chứa. Bạn không thể đặt chiều rộng và chiều cao của chúng bằng CSS:

Nếu chúng tôi thêm văn bản vào giữa các phần tử `<div>` của mình, chúng tôi sẽ thấy rõ ràng cách chúng phù hợp trong một dòng:

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property-1.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property-1.png)

#### CSS Display: block
Giá trị `block` của thuộc tính display làm cho một phần tử trở thành một phần tử `block`. Các phần tử `block` bắt đầu một dòng mới và kéo dài toàn bộ chiều rộng của màn hình, giống như cách các phần tử `<div>` hoạt động. Ngoài ra còn có các dấu ngắt dòng trước và sau các phần tử này.

```html
<body>

<div id="div-0"> This is my first div.</div>

<div id="div-1"> This is my second div.</div>

<div id="div-2"> This is my third div.</div>

<br>

<span id="span-0">This is my first span.</span>

<span id="span-1">This is my second span.</span>

<span id="span-2">This is my third span.</span>

</body>

<style>

body { font-family: "Avenir Heavy"; }

div, span {

background-color: #2e3f50;

padding: 10px;

border-radius: 5px;

display: block;

}

div { color: #fd8f59; }

span { color: #1ebda5; }

</style>
```

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property-2.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property-2.png)

#### CSS Display: inline-block
Giá trị `inline-block` của thuộc tính `display` là sự kết hợp của `inline` và `block`. Kiểu `display: inline-block` sẽ được sắp xếp giống với kiểu `display: inline`, nghĩa là các items sẽ được xếp cùng nhau trên một dòng. Tuy nhiên, các phần tử này cũng giống như các phần tử `block` ở chỗ bạn có thể thay đổi chiều rộng và chiều cao của chúng bằng CSS.

```html

<body>

<div id="div-0"> This is my first div.</div>

<div id="div-1"> This is my second div.</div>

<div id="div-2"> This is my third div.</div>

<br>

<span id="span-0">This is my first span.</span>

<span id="span-1">This is my second span.</span>

<span id="span-2">This is my third span.</span>

</body>

<style>

body { font-family: "Avenir Heavy"; }

div, span {

background-color: #2e3f50;

padding: 10px;

border-radius: 5px;

display: inline-block;

width: 200px;

height: 50px;

}

div { color: #fd8f59; }

span { color: #1ebda5; }

</style>
```

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property-Nov-23-2020-03-15-29-55-PM.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property-Nov-23-2020-03-15-29-55-PM.png)

#### CSS Display: list-item
Phần tử `display: list-item` hoạt động giống như phần tử `<li>`. Toàn bộ phần tử trở thành phần tử cấp `block`, văn bản bên trong trở thành phần tử `inline` và một dấu đầu dòng được thêm vào bên trái:

```html
<body>

<div id="div-0"> This is my first div.</div>

<div id="div-1"> This is my second div.</div>

<div id="div-2"> This is my third div.</div>

<br>

<span id="span-0">This is my first span.</span>

<span id="span-1">This is my second span.</span>

<span id="span-2">This is my third span.</span>

</body>

<style>

body { font-family: "Avenir Heavy"; }

div, span {

background-color: #2e3f50;

padding: 10px;

border-radius: 5px;

display: list-item;

margin-left: 30px;

}

div { color: #fd8f59; }

span { color: #1ebda5; }

</style>
```

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property-3.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property-3.png)

Thêm `list-style-position: inside;` để đặt các dấu đầu dòng bên trong phần tử `list-item`:

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property.png)

#### CSS Display: none
`display: none` xóa phần tử và tất cả các con của nó khỏi trang. Trong ví dụ này, `display: none` được áp dụng cho phần tử `<div>` và `<span>` thứ hai:

```html

<body>

<div id="div-0"> This is my first div.</div>

<div id="div-1"> This is my second div.</div>

<div id="div-2"> This is my third div.</div>

<br>

<span id="span-0">This is my first span.</span>

<span id="span-1">This is my second span.</span>

<span id="span-2">This is my third span.</span>

</body>

<style>

body { font-family: "Avenir Heavy"; }

div, span {

background-color: #2e3f50;

padding: 10px;

border-radius: 5px;

}

div { color: #fd8f59; }

span { color: #1ebda5; }

#div-1, #span-1 {

display: none;

}

</style>
```

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property-Nov-23-2020-03-15-29-42-PM.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property-Nov-23-2020-03-15-29-42-PM.png)

Để ẩn một phần tử mà không ảnh hưởng đến bố cục trang, hãy sử dụng thuộc tính `visibility` CSS:

```css
/* display: none; */

visibility: hidden;
```

![](https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/An%20Introduction%20To%20the%20CSS%20Display%20Property-Nov-23-2020-03-15-29-68-PM.png?width=1500&name=An%20Introduction%20To%20the%20CSS%20Display%20Property-Nov-23-2020-03-15-29-68-PM.png)

#### CSS Display: grid
Giá trị `display: grid` làm cho phần tử được chỉ định trở thành vùng chứa `grid` và các phần tử con của nó hoạt động như các mục grid. Xem thêm về grid trong CSS [tại đây.](https://blog.hubspot.com/website/css-grid)

#### CSS Display: flex
Cuối cùng, giá trị `display: flex` đặt một phần tử làm vùng chứa flex, một cách khác để tạo trang các phần tử động và `responsive`. Bạn tìm hiểu thêm về mô-đun CSS này trong bài đăng trên [blog này](https://blog.hubspot.com/website/css-grid-vs-flexbox).

**Nguồn tham khảo:** [**tại đây**](https://blog.hubspot.com/website/css-display-property)