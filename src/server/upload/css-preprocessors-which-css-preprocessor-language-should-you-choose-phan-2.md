Xin chào các bạn,

Sau một khoảng thời gian vắng bóng, hôm nay mình quay trở lại và sẽ tiếp tục với serries còn dang dở: CSS preprocessors :grinning: Trong phần 1 chúng ta đã cùng nhau tìm hiểu nhanh về khái niệm cũng như sự lợi hại và các khuyết điểm của các ngôn ngữ tiền xử lý CSS, nếu như bạn chưa đọc nó, hãy xem qua nhé :stuck_out_tongue_winking_eye: [PHẦN 1](https://viblo.asia/p/css-preprocessors-va-nhung-dieu-can-biet-phan-1-RnB5pybJKPG). Nhìn chung hiện nay có khá nhiều CSS preprocessors được sử dụng như:
* SASS : http://sass-lang.com/ 
* LESS : http://lesscss.org/ 
* Stylus : http://stylus-lang.com/ 
* CSS-Crush : http://the-echoplex.net/csscrush/ 
* Myth : http://www.myth.io/ 

Và còn một số CSS Preprocesors khác nữa.

Ở bài viết này, mình sẽ giới thiệu về 2 CSS Preprocesors phổ biến nhất. Đó là SASS/SCSS và LESS, đã có những cuộc tranh luận gay gắt trên cộng đồng front-end deverloper nói riêng, cũng như người sử dụng chúng nói chung, để tìm ra loại nào nên sử dụng và được sử dụng rộng rãi nhất.
![](https://images.viblo.asia/b7bd13bd-09c8-4c43-a9d0-bca057f5e514.png)

Theo như một cuộc bỏ phiếu khảo sát trong một nghiên cứu nhỏ để đưa ra CSS Preprocessors mà họ ưa thích. Có 66.0% người chọn Sass và 13.4% chọn Less cho các dự án của mình.
![](https://images.viblo.asia/497549b5-5f2c-4306-9f2b-258d3cc70973.jpeg)

Vậy ta có thể biết được một cách tương đối rằng SASS và LESS là 2 CSS Preprocessors được sử dụng phổ biến nhất. Cả 2 đều là các phần mở rộng CSS rất mạnh, chúng có tính tương thích ngược vì vậy bạn có thể chuyển đổi các tập tin CSS của bạn bằng cách đổi tên tệp .css thành .sass, .less hay .scss tương ứng. Giờ thì cùng đi tìm hiểu chúng có gì hay ho nhé. :heart_eyes:

 :point_down::point_down::point_down::point_down:

### 1. Syntax
#### SASS Syntax
Cú pháp thụt lề của SASS kế thừa từ người anh cả Haml (được viết lên bởi những lập trình viên Ruby). Bởi vậy, SASS sử dụng cú pháp giống như Ruby với việc không có dấu ngoặc nhọn `{}`, dấu chấm phẩy `;`
```
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block
```

#### LESS Syntax
Cú pháp của LESS thì khác so với SASS có đầy đủ ngoặc nhọn `{}`, dấu chấm phẩy `;`
```
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
}
```

:point_right::point_right::point_right: Sau khi biến dịch chúng ta đều sẽ thu được code CSS như sau:
```
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
```
### 2. Variables
Biến được sử dụng để lưu trữ những giá trị mà bạn đã xác định là sẽ sử dụng nhiều lần trong suốt quá trình style của mình như các mã màu, font chữ, font-weight,... hay bất kì giá trị nào mà bạn muốn 
#### SASS
Sass sử dụng kí hiệu `$` để định nghĩa biến

Ví dụ:
`$font-family: Helvetica, sans-serif`
Sau đó, khi bạn gặp bất cứ cái gì muốn sử dụng font này thì chỉ cần chèn $font-family vào đó

```
$font-family: Helvetica, sans-serif;
$primary-color: #333;

body
 font-family: $$font-family;
 color: $primary-color;
```

:point_right::point_right::point_right: Sau khi biến dịch chúng ta sẽ thu được code CSS như sau:
```
body {
 font-family: 100% Helvetica, sans-serif;
 color: #333;
}
```
#### LESS
Còn Less sử dụng kia hiệu `@`để định nghĩa biến
```
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header {
 color: @light-blue;
}
```
:point_right::point_right::point_right: Sau khi biến dịch chúng ta sẽ thu được code CSS như sau:
```
#header {
 color: #6c94be;
}
```
### 3. Mixins
Với Sass mixin được sử dụng với cú pháp` @mixin` để khai báo và `@include` để gọi, so với LESS thì cách của Sass rõ ràng hơn nhưng LESS lại ngắn hơn nhưng đôi khi dễ dẫn tới sự lộn xộn vì nó có thể gọi một selector như thường hoặc khi khai báo chỉ cần thêm dấu ngoặc nếu không muốn nó được biên dịch ra CSS. Cá nhân mình thích sử dụng `@mixin` của Sass hơn vì nó tường minh, dễ hiểu hơn là ở Less. 
Cùng ví dụ nhé:
#### SASS
```
@mixin border-radius($radius)
   border-radius: $radius

.box 
   @include border-radius(10px)
```
:point_right::point_right::point_right: CSS Output:
```
.box {
  border-radius: 10px;
}
```
#### LESS
```
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```
:point_right::point_right::point_right: CSS Output:
```
#menu a {
 color: #111;
 border-top: dotted 1px black;
 border-bottom: solid 2px black;
}

.post a {
 color: red;
 border-top: dotted 1px black;
 border-bottom: solid 2px black;
}
```
### 4. Extend
Đây là 1 tính năng rất mạnh mẽ. Nó cho bạn kế thừa, chia sẻ từ 1 selector khác. Ở phần này, cá nhân mình thích sử dụng `@extend `ở Sass hơn vì nó thể hiện rõ ràng selector.
#### SASS
Ở Sass sử dụng `@extend`
```
.message
   border: 1px solid #ccc;
   padding: 10px;
   color: #333;

.success 
   @extend .message;
   border-color: green;

.error 
   @extend .message;
   border-color: red;

.warning
   @extend .message;
   border-color: yellow;
```
:point_right::point_right::point_right: CSS Output:
```
.message, .success, .error, .warning {
   border: 1px solid #cccccc;
   padding: 10px;
   color: #333;
}

.success {
   border-color: green;
}

.error {
   border-color: red;
}

.warning {
   border-color: yellow;
}
```

#### LESS
Ở Less sử dụng `:extend`
```
.inline {
  color: red;
}

nav ul {
  &:extend(.inline);
  background: blue;
}
```
:point_right::point_right::point_right: CSS Output:
```
nav ul {
  background: blue;
}

.inline,
 nav ul {
  color: red;
}
```
### 5. Operations
Khác với CSS, bạn có thể thực hiện tất cả các operation trong cả SASS và LESS

#### SASS
```
.container
   width: 100%

article[role="main"]
  float: left
  width: 600px / 960px * 100%

aside[role="complimentary"]
   float: right
   width: 300px / 960px * 100%
```
:point_right::point_right::point_right: CSS Output:

```
.container {
    width: 100%;
}

article[role="main"] {
    float: left;
    width: 62.5%;
}

aside[role="complimentary"] {
    float: right;
    width: 31.25%;
}
```
#### LESS

`sqrt(18.6%)`

:point_right::point_right::point_right: CSS Output:

`4.312771730569565%;`

## Kết luận
Về cơ bản thì Sass và Less đều giống nhau, nó chỉ khác nhau ở cú pháp. Hiện Sass vẫn đang được phát triển trên nền của Ruby, còn Less thì được chuyển sang phát triển trên Nodejs. Chúng đều là những CSS Preprocessors rất mạnh mẽ và được sử dụng rộng rãi vì những tiện ích chúng mang lại. Trên đây là ý kiến cá nhân của mình về 2 CSS Preprocessors phổ biến hiện nay, và mình đang sử dụng Sass(Scss) cho các dự án mình tham gia vì những ưu điểm của nó. 

Which CSS preprocessor do you prefer? Hãy cho mình biết ở dưới comment nhé :point_down::point_down::grinning: