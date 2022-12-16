##  Khái niệm
### Sass là gì 
**Sass** là viết tắt của **Syntactically Awesome Style Sheets**, một ngôn ngữ tiền xử lý CSS. Cú pháp Css của bạn sẽ được viết dưới dạng Sass, sau đó sẽ được biên dịch qua Css. 

Có nhiều loại CSS Preprocessor: 
 
 - Sass
 - Stylus
 - Less
 - ....

Trong bài viết này mình sẽ giới thiệu về Sass.

### Scss là gì
Bản thân Sass có 2 kiểu viết, scss là kiểu viết được tạo ra sau. Một kiểu viết có đuôi **.sass**, một kiểu viết thứ 2 là **scss** có đuôi là **.scss** .

Cách viết **sass**: 
```css
.f16
   font-size: 153cm;
```

Cách viết **scss**: 
```css
.f16 {
   font-size: 153cm;
}
```
cả  2 đều render ra css
```css
.f16 {
   font-size: 153cm;
}
```


## Các tiện ích của Sass 

- Đã có một thời gian dài phát triển và được sử dụng rộng rãi
- Tiết kiệm được thời gian code Css
- Có cộng đồng rộng lớn
- Tính tương thích với css cao.

## Các quy tắc viết Sass

Mình prefer việc sử dụng Scss hơn là Sass, vì cú pháp vẫn giữ lại dấu ngoặc nhọn (giống vs cú pháp của Css) nên rất dễ hiểu. 

### Quy tắc xếp chồng (Nested Rule)

Ví dụ mình có một đoạn html 
```html
<!DOCTYPE html>
<html>
<link rel="stylesheet" href="mystyle.css">
<body>

<nav>
  <ul>
    <li><a href="#">HTML</a></li>
    <li><a href="#">CSS</a></li>
    <li><a href="#">SASS</a></li>
  </ul>
</nav>

</body>
</html>
```

Với cú pháp Css thuần, chúng ta sẽ phải viết như sau 
```css
 nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}

```

Tuy nhiên chúng ta có thể bỏ qua việc phải viết lại thứ tự các thẻ khi style bằng **scss**

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}

```


### Variable 
Cho phép ta định nghĩa variable, thuận tiện khi định nghĩa các font, kiểu chữ chung trong 1 project.

Variable trong Sass có các scope khác nhau: **global** và **scope** thường

Ví dụ:
```scss
$myColor: red;

h1 {
  $myColor: green;
  color: $myColor;
}

p {
  color: $myColor;
}
```

```html
<!DOCTYPE html>
<html>
<link rel="stylesheet" href="mystyle.css">
<body>

<h1>Hello World</h1>

<p>This is a paragraph.</p>

</body>
</html>
```

Thẻ <p> sẽ có màu đỏ chứ không phải màu xanh.

Nếu sử dụng global scope như sau thì <p> sẽ có màu xanh 
    
```scss
$myColor: red;

h1 {
  $myColor: green !global;
  color: $myColor;
}

p {
  color: $myColor;
}
```
    
    
### Mixin 
Trong sass, **@mixin** cho phép ta tạo ra 1 đoạn code có thể được sử dụng lại.
    
 **@include** cho phép ta include trực tiếp đoạn code ta đã tạo bằng **@mixin **
    
VD: 
```scss
@mixin important-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}
    
```
```scss
.danger {
  @include important-text;
  background-color: green;
}    
```
    
**Mixin có thể include mixin khác hay truyền variable vào mixin**
```scss
@mixin special-text {
  @include important-text;
}
```

```scss
@mixin bordered($color: blue, $width: 50px) {
  border: $width solid $color;
}

.myArticle {
  @include bordered(blue, 1px);  // Call mixin with two values
}

.myNotes {
  @include bordered(red, 2px); // Call mixin with two values
}
```

  
### Extend
    
@extend cho phép ta chia sẻ 1 set style css với các phần tử khác. 
```scss
.button-basic  {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  @extend .button-basic;
  background-color: red;
}

.button-submit  {
  @extend .button-basic;
  background-color: green;
  color: white;
}
```
Khi biên dịch ra css 
```css
.button-basic, .button-report, .button-submit {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  background-color: red;
}

.button-submit  {
  background-color: green;
  color: white;
}
```

### Import 
@import cho phép ta include nội dung của 1 file vào file khác
    
Css import gọi HTTP request mỗi lần import, còn sass @import thực hiện import trong CSS, cải thiện performance.
    
VD:
    
style.scss
```scss
html,
body,
ul,
ol {
  margin: 0;
  padding: 0;
}
```
main.scss
```scss
@import "reset";

body {
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  color: red;
}
```
 
**Sass partial**
    
Mặc định Sass sẽ biên dịch tất cả các file qua css. Tuy nhiên khi import trong **sass** thì ta không cần biên dịch qua css. Vậy nên ta có thể sử dụng partial để skip việc biên dịch qua css.  Cú pháp là ta thêm "_" trước tên file.

VD:

**_style.scss** (sẽ không bị biên dịch qua css)
```scss
$myPink: #EE82EE;
$myBlue: #4169E1;
$myGreen: #8FBC8F;
```

## Kết luận 
Khi làm việc trong dự án thì việc phải viết sass là điều không tránh khỏi bởi hiện nay sass rất phổ biến. 
    
Sass có nhiều tiện ích về cú pháp cho phép ta giảm thời gian code hơn. Cám ơn đã theo dõi bài viết.