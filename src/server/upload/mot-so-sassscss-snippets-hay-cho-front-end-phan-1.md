### Giới thiệu
Như các bạn Front End biết thì thì trong SASS có cái cách viết rất hay đó là Mixin,sử dụng Mixin giúp chúng ra viết SASS dễ dàng hơn,rất là thuận tiện nhất là ở những dự án lớn có code lớn thì dùng Mixin sau đó include ra rất là nhanh và code cũng gọn gàng hơn.
Trong phần 1 này mình xin chia sẻ 1 số Snippets hay mà mình hay dùng khi viết SASS.
### Một số Snippets
> #### 1. Clearfix
**Mixin**
```SASS
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
````
**Usage**
```SASS
elements {
  @include clearfix;
}
```
**Output**
```CSS
.elements::after {
  content: '';
  display: table;
  clear: both;
}
```
> #### 2. Center Layout
**Mixin**
```SASS
@mixin center-layout($width, $max: false) {
  display: block;
  @if $max {
    max-width: $width;
  } @else {
    width: $width;
  }
  margin-right: auto;
  margin-left: auto;
}
```
**Usage**
```SASS
.elements01 {
  @include center-layout(960px);
}

.elements02 {
  @include center-layout(1200px, true);
}
```
**Output**
```CSS
.elements01 {
  display: block;
  width: 960px;
  margin-right: auto;
  margin-left: auto;
}

.elements02 {
  display: block;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
}
```
> #### 3. Vertical Div
**Mixin**
```SASS
@mixin vertical-centering {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```
**Usage**
```SASS
.elements {
  @include vertical-centering;
}
```
**Output**
```CSS
.elements {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```
> #### 4.Vertical Hizontal Div
**Mixin**
```SASS
@mixin centering-elements($horizontal: true, $vertical: true) {
  position: absolute;
  @if $horizontal and $vertical {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  } @else if $horizontal {
    left: 50%;
    transform: translate(-50%, 0);
  } @else if $vertical {
    top: 50%;
    transform: translate(0, -50%);
  }
}
```
**Usage**
```SASS
.elements01 {
  @include centering-elements;
}

.elements02 {
  @include centering-elements(true, false);
}

.elements03 {
  @include centering-elements(false, true);
}
```
* Elements01 là căn giữa trung tâm top và left
* Elements02 là căn mỗi bên trái
* Elements03 là căn mỗi bên phải

**Output**
```CSS
.elements01 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.elements02 {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.elements03 {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
```
> #### 4. Web Font
**Mixin**
```SASS
@mixin font-face($family, $path, $weight: normal, $style: normal) {
  @font-face {
    font-family: $family;
    src: url('#{$path}.woff2') format('woff2'),
         url('#{$path}.woff') format('woff'),
         url('#{$path}.ttf') format('truetype');
    font-weight: $weight;
    font-style: $style;
  }
}
```
**Usage**
```SASS
@include font-face('fontName', '../font/fontName');
```
**Output**
```CSS
@font-face {
  font-family: "fontName";
  src: url("../font/fontName.eot");
  src: url("../font/fontName.eot?#iefix") format("embedded-opentype"), url("../font/fontName.woff") format("woff"), url("../font/fontName.ttf") format("truetype"), url("../font/fontName.svg#fontName") format("svg");
  font-weight: normal;
  font-style: normal;
}
```

### Lời kết
Vừa rồi mình đã giới thiệu tới các bạn 4 Snippets viết SASS hi vọng đây là 1 bài tham khảo nho nhỏ để chúng ra có thể sử dụng giúp việc viết code trở nên thuận tiện dễ dàng hơn.Cảm ơn các bạn đã đọc và hẹn các bạn vào Phần 2 nhé.