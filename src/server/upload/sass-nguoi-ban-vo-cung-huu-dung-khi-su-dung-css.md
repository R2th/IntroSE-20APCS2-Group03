Là một web developer, tôi dám cá rằng trong khi viết CSS bạn sẽ gặp phải những trường hợp như 1 đoạn code nào đó được sử dụng lặp lại khá nhiều lần, hay một mã màu nào đó khá là khó để nhớ cho việc sử dụng nhiều lần. Khi đó, chắc hẳn bạn sẽ mong muốn có một công cụ hỗ trợ nào đó để khắc phục được những nhược điểm nói trên đúng không. Hôm nay, tôi sẽ giới thiệu cho các bạn một công cụ mang tên `SASS`.

 ![](https://images.viblo.asia/65c01965-3979-47aa-b6f5-4da36a3b964a.png)
 
 # SASS (Syntactically Awesome StyleSheets)
 Sass là một mở rộng của CSS, nó cho phép bạn sử dụng `variables`, `nested rules`, `mixins`, `imports`..., và tất cả chúng đều hoàn toàn tương thích với cú pháp của CSS. 
 
 ### Một vài lợi ích
 - Hoàn toàn tương thích với CSS
 - Cung cấp các tiện ích vô cùng mạnh mẽ như variables, nesting, mixins,...
 - Giúp tiết kiệm thời gian viết CSS
 - Luôn giữ CSS codes của bạn được DRY
 - Tổ chức các files một cách rõ ràng, giúp cho việc dễ dàng phát triển và bảo trì

 ### Sử dụng Sass
 Sass có thể được sử dụng theo 3 cách: như một công cụ sử dụng command-line, như một module Ruby độc lập, và như một plugin cho các Rack framework, bao gồm Ruby on Rails và Merb.
 
 Cài đặt:
 ```
 gem install sass
 ```
 
 Để chạy Sass từ command line, sử dụng:
 ```
 sass input.scss output.css
 ```
 
 Để theo dõi các files Sass và thực hiện việc update các CSS mỗi khi các Sass file đó thay đổi:
 ```
 sass --watch input.scss:output.css
 ```
 
 
 ### Cú pháp
 Sass hỗ trợ 2 định dạng đó là SCSS (.scss) và Sass (.sass). Cú pháp SCSS không khác với cú pháp của CSS nên rất phù hợp với bạn nào muốn làm quen với Sass. Còn Sass thì cú pháp nghiêm ngặt hơn một tý, nó dựa vào indent để phân biệt các block, và không sử dụng `{}`, hay `;`. Sau đây là ví dụ về 2 cách viết đó:
 
 - Cú pháp SCSS:
    ```
    div {
      font: {
        family: Helvetica, Arial, sans-serif;
        size: 20px;
      }
    }
    ```
- Cú pháp Sass:
    ```
    div
      font:
          family: Helvetica, Arial, sans-serif
          size: 20px
    ```

Sau khi biên dịch sang CSS, ta sẽ được:

```css
div {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 20px;
}
```
 
**Trong bài viết này, mình sẽ sử dụng cú pháp SCSS để các bạn dễ làm quen hơn nhé.**
 
# Những tính năng của Sass
## Variables
`Sass` đã mang variables đến với CSS. Như vậy, bạn đã có thể lưu mã màu khó nhớ ở trên vào một variables nào đó, và gọi nó ra mỗi khi bạn cần sử dụng. Đơn giản và hiệu quả hơn rất nhiều phải không ^^.

Những giá trị được chấp nhận cho các variables sử dụng trong Sass là `numbers`, `strings`, `colors`, `booleans`, `nulls`, `lists` và `maps`.

Variables trong Sass được khai báo sử dụng kí tự `$`. Hãy cùng tôi tạo một variables đầu tiên nhé:
```perl
$firstColor: #0000FF;

body { background: $firstColor; }
```
***Biên dịch thành CSS***:
```css
body { background: #0000FF; }
```


Hãy chú ý đến scope (phạm vi) sử dụng của variables. Nếu bạn khai báo một variable bên trong một selector, thì nó chỉ có scope bên trong selector đó thôi.

```perl
$firstColor: #0000FF;

body {
  $firstColor: #ccc;
  background: $firstColor;
}

div { color: $firstColor; }
```
***Biên dịch thành CSS***:
```css
body { background: #ccc; }

div { color: #0000FF; }
```

Nhưng nếu chúng ta muốn thiết lập một variable trở thành global ở trong một khai báo thì có được không? Câu trả lời là có. Sass cung cấp một flag `!global` để hỗ trợ chúng ta việc đó.

```css
$firstColor: #0000FF;

body {
  $firstColor: #ccc !global;
  background: $firstColor;
}

div { color: $firstColor; }
```
***Biên dịch thành CSS***:
```css
body { background: #ccc; }

div { color: #ccc; }
```


Một flag hữu ích khác, đặc biệt khi viết mixins , đó là `!default`. Nó cho phép chúng ta đảm bảo rằng một variable sẽ nhận được một giá trị mặc định trong trường hợp variable đó không được cung cấp. Nếu một giá trị được cung cấp, nó sẽ bị ghi đè:

```perl
$firstColor: #0000FF;

$firstColor: #ccc !default;

body { background: $firstColor; }
```
***Biên dịch thành CSS***:
```css
body { background: #0000FF; }
```
> Chú ý rằng, một thuộc tính được gán cho giá trị null sẽ được coi như chưa gán

## Biểu thức toán học
Không giống như CSS, Sass cho phép chúng ta sử dụng các biểu thức toán học bên trong. Điều này quả thực rất thú vị và hữu ích phải không.

Một số biểu thức hỗ trợ bao gồm: `+`, `-`, `/`, `*`, `%`, `==` và `!=`.

Bạn cần chú ý đến 2 điều sau đây:

Đầu tiên, bởi vì kí tự `/` được sử dụng trong thuộc tính `font` viết tắt trong CSS như `font: 14px/16px`, nên nếu bạn muốn sử dụng phép chia bên trong một giá trị non-variable, bạn cần wrap nó bên trong dấu ngoặc đơn:

```javascript
div {
  $elementWidth: 100px;
  font: 10px/8px; // Plain CSS, không division
  width: $elementWidth/2; // sử dụng variable, có division
  height: (500px/2); // sử dụng ngoặc đơn, có division
  margin-right: 5px + 8px/2px; // Sử dụng +, có division
}
```
***Biên dịch sang CSS:***
```css
div {
  font: 10px/8px;
  width: 50px;
  height: 250px;
  margin-right: 9px;
}
```

Nếu bạn muốn sử dụng variables cùng với một plain CSS `/`, bạn có thể sử dụng `#{}`. Ví dụ:
```php
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```
***Biên dịch sang CSS:***
```css
p {
  font: 12px/30px;
}
```

Thứ hai, bạn không được kết hợp các đơn vị khác nhau trong trong một phép toán, ví dụ:

```markdown
$elementWidth: 100% - 50px;
```
Ví dụ trên sẽ thông báo một lỗi `Incompatible units: 'px' and '%'` khi biên dịch. Thay vào đó bạn có thể sử dụng function `calc` trong CSS. Ví dụ trên được viết lại như sau:

```cs
 $elementWidth: calc(100% - 50px);
 
 div {
     width: $elementWidth;
 }
```

## Nesting

Một trong những tính năng hữu dụng nhất và được sử dụng nhiều nhất trong Sass, đó là khả năng xếp chồng (nesting) các khai báo với nhau. 

Nếu trong CSS thông thường, bạn phải khai báo như sau:

```css
header {
  width: 100%;
}

header h1 {
  color: blue;
}

header div {
  background-color: green;
}
```

Thì với Sass, bạn có thể có được cùng một kết quả với cách viết ngắn gọn, dễ đọc hơn:
```css
header {
  width: 100%;
  h1 { color: blue; }
  div { background-color: green; }
}
```

### Xếp chồng các thuộc tính:

Trong Sass, chúng ta có thể xếp chồng các thuộc tính như margin, padding, border, text... để tránh những khai báo rườm rà, dài dòng:
```css
div {
  text: {
      align: center;
      decoration: none;
      transform: uppercase;
  }
  margin: {
    left: 10px;
    right: 50px;
  }
}
```

***Biên dịch sang CSS:***
```css
div {
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  margin-left: 10px;
  margin-right: 50px;
}
```

### Xếp chồng các media queries:
Nếu như CSS thông thường, bạn phải khai báo các media queries như sau:
```css
header {
  width: 80%;
}
@media screen and (max-width: 767px) {
  header {
    width: 100%;
  }
}
```

Thì Sass sẽ giúp bạn viết ngắn gọn hơn thành:
```css
header {
  width: 80%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
}
```

### Sử dụng & để tham chiếu đến selector cha

Trong Sass, chúng ta có thể sử dụng `&` để tham chiếu đến selector cha trong một khai báo. Ví dụ, chúng ta có một khai báo trong CSS:

```css
div {
  color: blue;
}
div:hover {
  color: red;
}
section div {
  width: 50%;
}
```

Chúng sẽ được viết lại tương tự trong Sass như sau:
```css
div {
  color: blue;
  &:hover {
    color: red;
  }
  section & {
    width: 50%;
  }
}
```

## Imports
Trong Sass, chúng ta có thể dễ dàng tổ chức các styles thành các files riêng biệt với những chức năng riêng, cụ thể, và sau đó import chúng vào chung một file có chức năng to hơn. Nó cũng sẽ giúp ích rất nhiều mỗi khi chúng ta cần tìm kiếm và sửa đổi các styles. 

Chúng ta có thể import một `.scss` file sử dụng `@import` directive:
```javascript
@import "variables.scss";
```

Trên thực tế, chúng ta thậm chí không cần đến extension của chúng:
```objectivec
@import "variables";
```

Sass compiler cũng bao gồm một khái niệm gọi là `"partials"`. Nếu bạn prefix một file `.sass` hoặc `.scss` với dấu gạch dưới `"_"` ví dụ `_mixins.scss`, nó sẽ không được biên dịch sang CSS. Điều này sẽ hữu dụng khi file của bạn chỉ tồn tại để import vào một file `style.scss` chính và không được biên dịch một cách rõ ràng.


## Extends & Placeholders
Trong Sass, chúng ta có thể sử dụng một `@extend` directive để kế thừa những thuộc tính đã được khai báo trong một selector có sẵn. Điều này giúp cho codes Sass của bạn luôn được `DRY` (Don't repeat yourself).

Chúng ta hãy cùng đến với một ví dụ về những thông báo success, warning để hiểu rõ hơn về tính năng này nhé:

```css
.alert {
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.alert-success {
  @extend .alert;
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}

.alert-error {
  @extend .alert;
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
```
***Biên dịch sang CSS:***
```css
.alert, .alert-success, .alert-error {
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.alert-success {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}

.alert-error {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
```

Ví dụ, nếu như selector `.alert` không có trước đó, thì làm sao chúng ta có thể sử dụng những khai báo dùng chung cho cả `.alert-success` và `.alert-error`? Đó chính là phần tiếp theo mà tôi muốn giới thiệu cho các bạn: `placeholder selector`.

Placeholder selector trong Sass được khai báo bằng cách prefix một class name với một kí tự`%`. Nó sẽ không được render trực tiếp khi biên dịch sang CSS,  chỉ có những selector extend nó mới có thể được render trong một single block:

```css
%alert-style {
  font-size: 14px;
}

.alert {
  @extend %alert-style;
  color: blue;
}
```

***Biên dịch sang CSS:***
```css
.alert {
  font-size: 14px;
}

.alert {
  color: blue;
}
```

## Mixins
Mixins directive là một tính năng vô cùng hữu dụng của Sass, ở chỗ, nó cho phép chúng ta sử dụng lại các khai báo giống như cách mà `@extend` đã làm trước đó, và hơn thế nữa, nó còn có khả năng cung cấp các arguments để sử dụng một cách linh hoạt.

### Khai báo một Mixin: `@mixin`
Mixins được khai báo sử dụng `@mixin` directive. Tiếp đến là tên của mixin, các optional arguments và một block có chứa nội dung của mixin đó. Hãy cùng đến với một ví dụ sau đây:

```css
@mixin beauty-link {
  color: blue;
  background-color: green;
  &:hover {
    color: red;
  }
}
```

### Include một Mixin: `@include`
Mixins được include trong document sử dụng `@include` directive. Tiếp đến là tên của mixin và các optional arguments truyền vào. Hãy cùng đến với một ví dụ sử dụng mixin `beauty-link` đã được khai báo ở trên:

```html
a {
  @include beauty-link;
  text-decoration: none;
}
```
***Biên dịch sang CSS:***
```css
a {
  color: blue;
  background-color: green;
  text-decoration: none;
}
a:hover {
  color: red;
}
```

Trong khai báo một mixin cũng có thể include các mixins khác. Ví dụ:

```css
@mixin compound {
  @include highlighted-background;
  @include header-text;
}

@mixin highlighted-background { background-color: green; }
@mixin header-text {
  h1 {
    font-size: 25px;
  }
}
```

***Biên dịch sang CSS:***
```css
header {
  background-color: green;
}
header h1 {
  font-size: 25px;
}
```

### Arguments
Khi khai báo một mixin, các arguments sẽ được viết như những variables được phân chia bởi dấu phẩy, và chúng được wrap bên trong dấu ngoặc đơn sau tên của mixin. Hãy cùng đến với một ví dụ sau:
```css
@mixin button($color, $hover-color) {
  color: $color;
  &:hover {
    color: $hover-color;
  }
}

.submit-button { @include button(blue, navy); }
```
***Biên dịch sang CSS:***
```css
.submit-button {
  color: blue;
}
.submit-button:hover {
  color: navy;
}
```

Chúng ta cũng có thể khai báo một giá trị mặc định cho các arguments, nếu những arguments đó không được truyền vào khi include mixin, nó sẽ sử dụng giá trị mặc định đó:
```css
@mixin button($color, $hover-color: navy) {
  color: $color;
  &:hover {
    color: $hover-color;
  }
}

.submit-button { @include button(blue); }
.cancel-button { @include button(red, green); }
```
***Biên dịch sang CSS:***
```css
.submit-button {
  color: blue;
}
.submit-button:hover {
  color: navy;
}

.cancel-button {
  color: red;
}
.cancel-button:hover {
  color: green;
}
```

#### Keyword Arguments
Mixins có thể được include sử dụng những keyword arguments rõ ràng. Ví dụ trên có thể được viết lại như sau:

```css
.submit-button { @include button($color: blue); }
.cancel-button { @include button($color: red, $hover-color: green); }
```
Viết như này mặc dù có hơi dài dòng hơn một chút, nhưng nó sẽ làm cho stylesheets của bạn trở nên dễ đọc, linh hoạt hơn. Chúng ta có thể truyền vào các arguments theo thứ tự bất kỳ, miễn là phải có đủ trong trường hợp nó chưa có một giá trị mặc định nào.

#### Variable Arguments
Khi một mixin có thể có một số lượng arguments chưa biết trước, là lúc chúng ta cần sử dụng đến tính năng `variable arguments` của Sass. Những arguments đó được khai báo cũng giống như những arguments thông thường, nhưng theo sau chúng là `...`. Ví dụ:

```css
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}

.shadows {
  @include box-shadow(5px 5px blue, 10px 10px red, 15px 15px green);
}
```
***Biên dịch sang CSS:***
```javascript
.shadows {
  -moz-box-shadow: 5px 5px blue, 10px 10px red, 15px 15px green;
  -webkit-box-shadow: 5px 5px blue, 10px 10px red, 15px 15px green;
  box-shadow: 5px 5px blue, 10px 10px red, 15px 15px green;
}
```

## Function Directives
Function Directive trong Sass cũng tương tự như mixins, nhưng thay vì trả về một markup, thì chúng trả về các giá trị thông qua `@return` directive. Hãy cùng đến với một ví dụ sau đây để hiểu rõ hơn:
```css
@function getColumnWidth($width, $columns,$margin){
  @return ($width / $columns) - ($margin * 2);
}

$container-width: 100%;
$column-count: 5;
$margin: 1%;

.container {
  width: $container-width;
}

.column {
  display: block;
  float: left;
  width: getColumnWidth($container-width,$column-count,$margin);
}
```
***Biên dịch sang CSS:***
```css
.container {
  width: 100%;
}

.column {
  display: block;
  float: left;
  width: 18%;
}
```

## Control Directives
Sass cung cấp một số directives cho việc điều khiển code CSS như: `@if`, `@for`, `@each`, `@while`.

### `@if`
Hãy đến với một ví dụ sau về cách sử dụng `@if` directive:
```css
p {
  @if 1 + 1 == 2 { border: 1px solid;  }
  @if 5 < 3      { color: blue; }
  @if true       { margin-left: 10px; }
  @if null       { margin-right: 20px; }
}
```
***Biên dịch sang CSS:***
```css
p {
  border: 1px solid;
  margin-left: 10px;
}
```

`@if` có thể theo sau bởi các câu lệnh `@else if` và một `@else`. Cách thức hoạt động của chúng thì cũng tương tự như các ngôn ngữ khác thôi.
```css
$alert-type: 'warning';
p {
  @if $alert-type == 'success' {
    color: green;
  } @else if $alert-type == 'error' {
    color: red;
  } @else if $alert-type == 'warning' {
    color: orange;
  } @else {
    color: black;
  }
}
```
***Biên dịch sang CSS:***
```css
p { color: orange; }
```

### `@for`
`@for` directive được dùng để lặp lại outputs của một bộ các styles trong một khoảng đã được định sẵn. Sass hỗ trợ 2 kiểu `@for`: `@for $var from <start> through <end>` và `@for $var from <start> to <end>`. Hãy đến với một ví dụ sau để hiểu rõ hơn về chúng:

**Sử dụng `through`**:
```shell
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```
***Biên dịch sang CSS:***
```css
.item-1 { width: 2em; }
.item-2 { width: 4em; }
.item-3 { width: 6em; }
```

**Sử dụng `to`**:
```shell
@for $i from 1 to 3 {
  .item-#{$i} { width: 2em * $i; }
}
```
***Biên dịch sang CSS:***
```css
.item-1 { width: 2em; }
.item-2 { width: 4em; }
```

### `@each`
`@each` directive được khai báo như sau: `@each $var in <list or map>`. `@each` sẽ lần lượt set giá trị của `$var` thành từng giá trị trong list hoặc map đó, sau đó outputs của các styles chứa trong nó sẽ sử dụng giá trị của `$var`. Hãy cùng đến với một ví dụ:
```css
@each $color in red, blue, green {
  .#{$color}-item { color: $color }
}
```
***Biên dịch sang CSS:***
```css
.red-item { color: red; }
.blue-item { color: blue; }
.green-item { color: green; }
```

### `@while`
`@while` directive sẽ lặp lại outputs của các styles cho đến khi giá trị của câu lệnh trở thành `false`. Ví dụ
```html
$i: 3;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i };
  $i: $i - 1;
}
```
***Biên dịch sang CSS:***
```css
.item-3 { width: 6em; }
.item-2 { width: 4em; }
.item-1 { width: 2em; }
```

# Kết luận
Trên đây tôi đã giới thiệu cho các bạn tổng quan về Sass. Như các bạn cũng đã thấy, Sass là một công cụ thật mạnh mẽ và tuyệt vời để tối ưu hóa, tăng tốc độ khi viết codes CSS. Ngoài Sass, hãy tìm hiểu và sử dụng kết hợp thêm với những cách viết như OOCSS (Object-oriented CSS), SMACSS, BEM,... để có thể phát huy được tối đa sự hiệu quả trong việc sử dụng CSS nhé!

# Tài liệu tham khảo
1. http://sass-lang.com/documentation/file.SASS_REFERENCE.html
2. https://scotch.io/tutorials/getting-started-with-sass
3. https://www.creativebloq.com/web-design/what-is-sass-111517618
4. https://sass-lang.com/guide