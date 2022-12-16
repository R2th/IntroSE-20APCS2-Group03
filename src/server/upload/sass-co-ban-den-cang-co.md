**SASS là một cách viết CSS kiểu mới, giúp bạn quản lí code CSS một cách khoa học, dễ quản lí, nâng cấp, thích hợp khi làm các dự án lớn. Nhờ các tính năng như variables, functions, mixins... các đoạn mã CSS sẽ trở nên có tổ chức cho phép developer làm việc nhanh và ít gặp lỗi hơn.**

Trang chủ: http://sass-lang.com/

SASS là một CSS Processor có đuôi file là `.scss` khác với CSS thuần là `.css`

File scss thì trình duyệt không hiểu được nên bạn phải dùng cách nào đó để chuyển sang file css, có nhiều cách để làm ở đây mình sẽ hướng dẫn các bạn dùng phần mềm Koala hoàn toàn miễn phí để biên dịch nó.

## 1. Cài đặt Koala để biên dịch scss
Mình đã có bài hướng dẫn các bạn có thể xem cách cài đặt tại [đây](https://kentrung256.blogspot.com/2018/01/huong-dan-cai-dat-phan-mem-koala.html)

## 2. Sử dụng Koala
Đầu tiên để giúp các bạn dễ theo dõi mình sẽ tạo 1 folder Sass_P1 ở ngay desktop, bên trong sẽ có các folder css, images và file index.html như hình bên dưới
![](https://images.viblo.asia/e8032473-4d7b-4da5-aa28-be6a728543ae.png)

Bên trong folder css ta sẽ tạo ra 1 file tên là `style.scss`

Code file `index.html`
```html:index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sass_P1</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Hello <span>World!</span></h1>
</body>
</html>
```

Ta thấy trong `index.html` thì link tới file `style.css` mà trong khi file đó ta chưa hề tạo. Bây giờ chúng ta nên nhớ là viết code css trong file `style.scss` sau đó dùng phần mềm Koala biên dịch nó ra file css nhé.

Mở phần mềm Koala nên, click vào dấu + và tìm đến desktop » Sass_P1 » css

![](https://images.viblo.asia/933d8b77-f5e8-4b01-b86b-8a6365c10dee.png)

Sau khi tìm đến folder css, Koala sẽ tự động tìm thấy file `style.scss`, bạn click chuột vào file đó sẽ hiện ra giao diện như thế này
![](https://images.viblo.asia/b03c8e30-a57e-4558-a6a0-25bba072378e.png)
- Auto Compile: tự động biên dịch mỗi khi ta nhấn Ctrl + S
- Source Map: tạo ra 1 file style.css.map (file này giúp chúng ta debug tìm được code scss)
- Autoprefix: thêm các prefix cho các thuộc tính css3
- Mặc định file css được biên dịch sẽ nằm ngay cạnh file scss

## 3. Output style
Có 4 kiểu định dạng khi xuất ra file css, để hiểu rõ output như nào thì ta viết code scss rồi xem nhé

```css:style.scss
h1 {
  text-align: center;
  box-shadow: 0 0 5px blue;
  span {
    color: green;
  }
}
```

### 3-1. Kiểu nested
```css:style.css
h1 {
  text-align: center;
  -webkit-box-shadow: 0 0 5px blue;
          box-shadow: 0 0 5px blue; }
  h1 span {
      color: green; }

/*# sourceMappingURL=style.css.map */
```
### 3-2. Kiểu expanded
```css:style.css
h1 {
  text-align: center;
  -webkit-box-shadow: 0 0 5px blue;
          box-shadow: 0 0 5px blue;
}
h1 span {
  color: green;
}

/*# sourceMappingURL=style.css.map */
```

### 3-3. Kiểu compact
```css:style.css
h1 { text-align: center; -webkit-box-shadow: 0 0 5px blue; box-shadow: 0 0 5px blue; }
h1 span { color: green; }

/*# sourceMappingURL=style.css.map */
```

### 3-4. Kiểu compressed
```css:style.css
h1{text-align:center;-webkit-box-shadow:0 0 5px blue;box-shadow:0 0 5px blue}h1 span{color:green}

/*# sourceMappingURL=style.css.map */
```



## 4. Nested Rules
Quy tắc này cho phép viết các CSS lồng vào nhau. Khi biên dịch, Sass sẽ cho ra tập tin CSS với đầy đủ các selector theo đúng chuẩn. Kiểu viết này giống với kiểu phân cấp trong HTML

Ta có HTML như sau
```index.html
<ul class="menu">
  <li><a href="#">Home</a></li>
  <li><a href="#">Feature</a></li>
  <li><a href="#">Product</a></li>
  <li><a href="#">Contact</a></li>
</ul>
```
Đây là cách viết CSS thông thường mà mình hay viết
```css:css
ul.menu {
  list-style: none;
}
ul.menu li {
  float: left;
}
ul.menu li a {
  color: #696969;
}
```
Còn đây là cách viết theo kiểu Nested Rules
```css:scss
ul.menu {
  list-style: none;
  li {
    float: left;
    a {
      color: #696969;
    }
  }
}
```

## 5. Referencing Parent Selectors
Sử dụng kí hiệu `&` đứng trước hiệu ứng, trạng thái mà chúng ta muốn. Ví dụ ta muốn khi hover vào thẻ a thì có gạch chân và đổi màu chữ
```css:scss
ul.menu {
  list-style: none;
  li {
    float: left;
    a {
      color: #696969;
      &:hover {
        color: #999;
      }
    }
  }
}
```

## 6. Nested Properties
Kiểu viết này sẽ gom các thuộc tính có cùng namespaces giống nhau, ví dụ như margin-left, margin-right, margin-top, margin-bottom...
```css:scss
ul.menu {
  list-style: none;
  li {
    float: left;
    a {
      color: #696969;
      margin: {
        top: 0;
        bottom: 0;
        left: 9px;
        right: 9px;
      }
    }
  }
}
```
Còn đây là lúc khi đã Compile ra file CSS
```css:scss
ul.menu {
  list-style: none;
}
ul.menu li {
  float: left;
}
ul.menu li a {
  color: #696969;
  margin: 0px 9px;
}
```


## 7. Variables
Giống với các ngôn ngữ lập trình ta khai báo biến để lưu trữ một giá trị được sử dụng nhiều lần. Để khai báo một biến ta sử dụng kí tự `$` đằng trước tên biến

```scss
$text-success: #3c763d;

h1.big-title { color: $text-success; }


// Kết quả
h1.big-title { color: #3c763d; }
```

## 8. Global Variables
Ở ví dụ trên nếu ta khai báo biến `$text-success` ở bên ngoài không nằm trong bất kì bộ chọn nào thì ở chỗ nào ta cũng có thể gọi được đến biến đó. Nhưng nếu bạn khai báo biến ở bên trong 1 bộ chọn thì phạm vi của biến sẽ chỉ nằm trong bộ chọn đấy.
```scss
h2 {
  $text-success: #3c763d;
  span {
    color: $text-success;
  }
}
h3 {
  color: $text-success;
}
```
Ở ví dụ trên biến `$text-success` được khai báo bên trong h2 nên thẻ span có thế sử dụng được nhưng h3 thì không.

Để h3 sử dụng được biến trên thì ta thêm `!global`
```scss
h2 {
  $text-success: #3c763d !global;
  span {
    color: $text-success;
  }
}
h3 {
  color: $text-success;
}
```
## 9. Data Types
Sass hỗ trợ 8 kiểu dữ liệu khác nhau:
- Numbers: `1.2, 13, 10px`
- Strings of text, có hoặc không có dấu nháy: `"foo", 'foo', foo`
- Colors: `blue, green, #04a3f9, rgba(255, 0, 0, 0.5)`
- Booleans: `true, false`
- nNulls: `null`
- Lists of values ngăn cách nhau bởi dấu cách hoặc dấu phẩy: `1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- Maps from one value to another: `(key1: value1, key2: value2)`
- Function references

## 10. Operations
Sass hỗ trợ các kiểu toán tử so sánh, tính toán cộng, trừ, nhân, chia, lấy dư. Ngoài ra còn dùng được khi nối chuỗi.

### 10-1. Number Operations

Các kiểu hỗ trợ tính toán so sánh áp dụng với Data Types là Number. Xem ví dụ dưới đây để hiểu cách làm việc của Sass (lưu ý đặc biệt giữa kí hiệu slash `/` và phép chia `/`)

```scss
p {
  font: 10px / 8px;                // CSS thuần, không tính chia
  $width: 1000px;                  // Khai báo biến
  width: $width / 2;               // Sử dụng biến, thực hiện phép chia
  height: (500px / 2);             // Sử dụng dấu ngoặc tròn, thực hiện phép chia
  line-height: round(1.5) / 2;     // Sử dụng function làm tròn 1.5 thành 2, thực hiện phép chia
  margin-left: 5px + 8px / 2px;    // Thực hiện phép chia trước, sau đó cộng giá trị
  font: (italic bold 10px / 8px);  // In a list, parentheses don't count
}


// Kết quả
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  line-height: 1;
  margin-left: 9px;
  font: italic bold 10px/8px;
}
```
### 10-2. Color Operations
Sass hỗ trợ việc tính toán các giá trị màu sắc lần lượt dựa trên 3 màu chính red, green, blue
```scss
.ex1 { color: #010203 + #040506; }
.ex2 { color: #010203 * 2; }
.ex3 { color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75); }


// Kết quả
.ex1 { color: #050709; }
.ex2 { color: #020406; }
.ex3 { color: rgba(255, 255, 0, 0.75); }
```
- Với ex1: 01 + 04 = 05, 02 + 05 = 07, 03 + 06 = 09
- Với ex2: 01 * 2 = 02, 02 * 2 = 04, 03 * 2 = 06
- Với ex3: cộng giá trị tương ứng với mỗi phần tử

### 10-3. String Operations
Nối chuỗi lại với nhau sử dụng dấu `+`, lưu ý chỉ áp dụng với Data Types là String
```scss
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
  margin: 3px + 4px auto;
}


// Kết quả
p:before {
  content: "Foo Bar";
  font-family: "san-serif";
  margin: 7px auto;
}
```
### 10-4. Interpolation
Sử dụng để lấy giá trị của một biến gán vào bộ chọn selector hoặc tên của thuộc tính sử dụng kí tự `#{ }`
```scss
$name: foo;
$attr: border;
$font-size: 12px;
$line-height: 30px;

p.#{$name} {
  #{$attr}-color: blue;
  font: #{$font-size}/#{$line-height};
}


// Kết quả
p.foo {
  border-color: blue; 
  font: 12px/30px;
}
```


## 11. Import & Partial
Trong thực tế khi code scss ta thường chia nhỏ ra các file đảm nhiệm các chức năng khác nhau như `_colors.scss` hay` _variables.scss` rồi dùng từ khóa `@import` để gọi vào.
```scss:_colors.scss
$primary-300: #64B5F6;
$primary-400: #42A5F5;
$primary-600: #1E88E5;
```

```scss:_variables.scss
$font-size-base : 14px;
$font-size-large: ceil(($font-size-base * 1.25)); // ~18px
$font-size-small: ceil(($font-size-base * 0.85)); // ~12px
```

File `style.scss` để import 2 file ở trên ta viết code như sau

```scss:style.scss
@import "variables";
@import "colors";

.title {
  font-size: $font-size-small;
  color: $primary-300;
}


// Kết quả
.title {
  font-size: 12px;
  color: #64B5F6;
}
```
Lưu ý
- 3 file ở trên nằm cùng cấp ngang hàng với nhau
- Khi import việc ghi cả đuôi file scss là không cần thiết
- Ta thấy 2 file `_colors.scss` và ` _variables.scss` có gạch dưới ở phía trước, đó là cách dùng của Partial, điều này có nghĩa SASS sẽ không biên dịch các file đó ra file css








## 12. Media
Cách viết `@media` tương tự như viết của CSS, thường dùng khi responsive website
```css
@media (min-width: 1200px) {
  .col-lg-6 {
    width: 50%;
  }
}
```



















































## 13. Extend
Kế thừa các thuộc tính của một selector khác. Sử dụng từ khóa `@extend`

```scss
.btn {
  border: 1px solid transparent;
  padding: 7px 12px;
  font-size: 13px;
}
.btn-primary {
  @extend .btn;
  color: #fff;
  background-color: #2196F3;
  border-color: #2196F3;
}
```
Kết quả
```css
.btn, .btn-primary {
  border: 1px solid transparent;
  padding: 7px 12px;
  font-size: 13px;
}
.btn-primary {
  color: #fff;
  background-color: #2196F3;
  border-color: #2196F3; 
}
```


Vùng chọn `%extend` sẽ chỉ kế thừa các thuộc tính mà không compile.
```scss
%btn {
  border: 1px solid transparent;
  padding: 7px 12px;
  font-size: 13px;
}
.btn-primary {
  @extend %btn;
  color: #fff;
  background-color: #2196F3;
  border-color: #2196F3;
}
```
Kết quả
```css
.btn-primary {
  border: 1px solid transparent;
  padding: 7px 12px;
  font-size: 13px;
}
.btn-primary {
  color: #fff;
  background-color: #2196F3;
  border-color: #2196F3; 
}
```

## 14. if
Kiểm tra một câu lệnh điều kiện và trả về một giá trị tương ứng
```scss
p {
  @if 1 + 1 == 2    { border: 1px solid; }
  @if 5 < 3         { border: 2px dotted; }
  @if null          { border: 3px double; }
}

$type: monster;
h3 {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}


// Kết quả
p { border: 1px solid; }
h3 { color: green; }
```
## 15. for
Sử dụng vòng lặp `@for` cho các trường hợp biết trước số lần lặp lại khối lệnh.
```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}


// Kết quả
.item-1 { width: 2em; }
.item-2 { width: 4em; }
.item-3 { width: 6em; }
```

## 16. each
Vòng lặp `@each` dùng để lặp dữ liệu trong list hoặc map. Lưu ý trong SASS không có kiểu dữ liệu là mảng nhé
```scss
@each $name, $color in (item1, red), (item2, green), (item3, blue) {
  .#{$name} {
    background: url(../images/#{$name}.png);
    color: #{$color};
  }
}


// Kết quả
.item1 { 
  background: url(../images/item1.png); 
  color: red; 
}
.item2 { 
  background: url(../images/item2.png); 
  color: green; 
}
.item3 { 
  background: url(../images/item3.png); 
  color: blue; 
}
```
## 17. while
Vòng lặp `@while` sẽ thực hiện lặp đi lặp lại một khối công việc đến khi nào điều kiện đã cho còn là đúng.
```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}


// Kết quả
.item-6 { width: 12em; }
.item-4 { width: 8em; }
.item-2 { width: 4em; }
```


## 18. Mixin không tham số
Mixin cho phép bạn định nghĩa các thuộc tính CSS lại với nhau, về cơ bản nó mạnh hơn so với việc dùng biến chỉ lưu được một giá trị, cũng giống với extend kế thừa các thuộc tính nhưng mixin còn hỗ trợ thêm cả tham số không khác gì một function.

Sử dụng `@mixin mixinName` để khai báo mixin

Sử dụng `@include mixinName` để sử dụng

```scss
@mixin BorderRadius {
  border-radius: 50%;
}
div.avatar {
  width: 150px;
  height: 150px;
  @include BorderRadius;
}


// Kết quả
div.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
```

## 19. Mixin có tham số
Sử dụng `@mixin mixinName($params)` để khai báo mixin

Trong đó `$params` là các tham số truyền vào

Sử dụng `@include name($params)` để sử dụng

```scss
@mixin BorderRadius($value) {
  border-radius: $value;
}
div.avatar {
  width: 150px;
  height: 150px;
  @include BorderRadius(10px);
}


// Kết quả
div.avatar {
  width: 150px;
  height: 150px;
  border-radius: 10px;
}
```

## 20. Mixin có tham số giá trị mặc định
Sử dụng mixin với tham số mặc định
```scss
@mixin BorderRadius($value: 50%) {
  border-radius: $value;
}
div.avatar {
  width: 150px;
  
  // Không có tham số, lấy giá trị mặc định 50%
  @include BorderRadius;
  
  // Có tham số truyền vào 15px
  @include BorderRadius(15px);
}


// Kết quả
div.avatar {
  width: 150px;
  // Không có tham số, lấy giá trị mặc định 50%
  border-radius: 50%;
  // Có tham số truyền vào 15px
  border-radius: 15px;
}
```
## 21. Function
Sử dụng  `@function functionName($params)` để khai báo một function

Trong đó `$params` là các tham số truyền vào

Sử dụng `functionName($params)` để gọi function

```scss
@function grid-width($n) {
  @return $n * 40px;
}

#sidebar { width: grid-width(5); }

// Kết quả
#sidebar { width: 200px; }
```

Lưu ý
- Function có thể có tham số hoặc không có tham số
- Function có thể truyền tham số mặc định vào trong param
- Function cũng khá giống với mixin nên tùy vào mục đích sử dụng
- Ta dùng function khi muốn tính toán, so sánh giá trị rồi trả về một kết quả