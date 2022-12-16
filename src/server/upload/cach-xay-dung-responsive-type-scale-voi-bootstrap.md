# Giới thiệu
Trong bài hướng dẫn này, mình sẽ đi sâu tìm hiểu về cách Bootstrap xử lí kiểu chữ, và làm thế nào để mình có thể sửa đổi code theo vài cách khác nhau cũng như tạo một `responsive type scale` (responsive cho font chữ).  Mục đích của việc làm này là giữ cho kiểu chữ của bạn có thể đọc được trên tất cả các kích cỡ màn hình và hiển thị trên điện thoại di động sao cho dễ nhìn nhất.
# Cách Bootstrap thiết lập Kiểu chữ theo mặc định

Muốn biết cách hoạt động của Bootstrap typography (style và định dạng kiểu chữ) thì ta cần phải xem code trong file `SCSS` để tìm hiểu các cài đặt mặc định. Mình sẽ đi nhận xét cả các style khác nhau từ Bootstrap mà không chỉ có typography. 
## Thẻ `html` 
Đầu tiên là style cho thẻ `html` được viết ở file `_reboot.scss` [dòng 27](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss#L27):
```css
html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  // -ms-overflow-style: scrollbar;
  // -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

Ở thẻ `html` thì không có nhiều thiết lập về type scale. Tuy nhiên, cũng có 1 dòng đáng chú ý đó là `-webkit-text-size-adjust: 100%;`, chúng được sử dụng để ngăn 1 số trình duyệt di động tăng kích cỡ font chữ theo ý mình.

## Thẻ `body` 
Đây là style của thẻ `body`, được viết ở [dòng 46](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss#L46):
```css
body {
  // margin: 0; // 1
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-base;
  line-height: $line-height-base;
  color: $body-color;
  text-align: left; // 3
  // background-color: $body-bg; // 2
}
```
Và bây giờ chúng ta có thể nhìn thấy 1 số style cho kiểu chữ. Trong type scale thì chúng ta chỉ cần quan tâm đến `font-size`. Theo mặc định thì giá trị này được đặt thông qua biến `$font-size-base` trong file `_variables.scss` và bằng `1rem`.

## Thẻ `p` 
Style của thẻ `p` được viết ở [dòng 97](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_reboot.scss#L97):
```css
p {
  margin-top: 0;
  margin-bottom: $paragraph-margin-bottom;
}
```
Không có gì nhiều cần phải xem xét ở đây, thẻ `p` chỉ đơn giản là kế thừa `font-size` và `line-height` từ `body`.

## Từ thẻ `h1` đến `h6`
Dưới đây là style của thẻ từ `h1` đến `h6`, được viết từ [dòng 16](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_type.scss#L16) của file `_type.scss`:
```css
h1, .h1 { font-size: $h1-font-size; }
h2, .h2 { font-size: $h2-font-size; }
h3, .h3 { font-size: $h3-font-size; }
h4, .h4 { font-size: $h4-font-size; }
h5, .h5 { font-size: $h5-font-size; }
h6, .h6 { font-size: $h6-font-size; }
```
Bạn có thể thấy các phần tử được cung cấp `font-size` thông qua biến. Các biến được khai báo trong file `_variables.scss` từ dòng 291 đến dòng 296. Nhìn vào các biến này, chúng ta có thể thấy nó đều phụ thuộc vào 1 biến mặc định `$font-size-base`, biến này được đặt ra để hoạt động trên tất cả các browser và viewport:
```css
$h1-font-size: $font-size-base * 2.5 !default;
$h2-font-size: $font-size-base * 2 !default;
$h3-font-size: $font-size-base * 1.75 !default;
$h4-font-size: $font-size-base * 1.5 !default;
$h5-font-size: $font-size-base * 1.25 !default;
$h6-font-size: $font-size-base !default;
```
Tùy theo từng loại mà kích thước tăng khác nhau.

Các kích thước này có thể được ghi đè trong file của bạn nếu bạn sử dụng trình biên dịch Sass, nhưng nó vẫn để lại cho bạn một kích thước `font-size` cho mỗi tiêu đề trên tất cả các browser và viewport.

## Từ Utility Class (lớp tiện ích) `.display-1` đến `.display-4`
Code style được viết ở file `_type.scss`[ từ dòng 29 đến dòng 48](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_type.scss#L29):
```css
// Type display classes
.display-1 {
  font-size: $display1-size;
  // font-weight: $display1-weight;
  // line-height: $display-line-height;
}
.display-2 {
  font-size: $display2-size;
  // font-weight: $display2-weight;
  // line-height: $display-line-height;
}
.display-3 {
  font-size: $display3-size;
  // font-weight: $display3-weight;
  // line-height: $display-line-height;
}
.display-4 {
  font-size: $display4-size;
  // font-weight: $display4-weight;
  // line-height: $display-line-height;
}
```

Cũng giống như các phần tử ở heading, kích thước của các lớp tiện ích này cũng được định nghĩa trong file `_variables.scss`  [dòng 304](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss#L304). 

Cái này các bạn cũng có thể tùy chỉnh bằng cách ghi đè trong file của bạn.

Những điều trên đều đã được thực hiện bởi Bootstrap. Còn giờ chúng ta sẽ tạo 1 Responsive Type Scale của mình.
# Tạo Responsive Type Scale
Chúng ta sẽ mở rộng trên những gì đã có sẵn. Mặc định, `font-size` cho heading và lớp `display-*` được thiết lập một cách rõ ràng thông qua việc sử dụng các biến trong `_variables.scss` và quy tắc trong `_type.scss`.

Nếu chỉ đặt `font-size` chung cho tất cả các màn hình và viewport thì chắc chắn các tiêu đề sẽ bị quá khổ trên thiết bị nhỏ, tạo trải nghiệm người dùng không tốt.

Tất nhiên là bạn cũng có thể truy vấn ra phương tiện nào đang được sử dụng để set font cho phù hợp nhưng nó sẽ rất phức tạp và rắc rối.

Thay vào đó là Responsive Type Scale và một cách hay của Sassy để triển khai nó thành một dự án Bootstrap!
## Tổng quan về Responsive Type Scale cho Bootstrap
Mình sẽ cần thiết lập 3 thứ:

* 1 type scale map
* 1 function để kiểm tra xem scale đó có được valid để sử dụng không
* 2 mixin cho phép điều chỉnh kích thước font chữ
## Responsive Type Scales Map
Tạo [Sass map](https://www.sitepoint.com/using-sass-maps/) để xác định trước  các tỉ lệ cỡ chữ,  biến `$type-scales` sẽ tuân theo chuẩn của [type-scale.com](https://type-scale.com/). Các tỉ lệ trong map có thể thông qua [Sass mixin](https://www.sitepoint.com/sass-basics-the-mixin-directive/) để tạo font-size bằng cách sử dụng `key` từ cặp `key: value`.

Sau khi map các tỉ lệ thì chúng ta sẽ xác định `$heading-type-scale-base` và `$display-type-scale-base`. Các biến này được giữ nguyên tỉ lệ ban đầu được sử dụng từ viewport zero-width của trình duyệt, chúng nhận key từ  map `$type-scales` hoặc có thể thông qua 1 giá trị đơn vị:
```css
$type-scales : (
  minor-second: 1.067,
  major-second: 1.125,
  minor-third: 1.200,
  major-third: 1.250,
  perfect-fourth: 1.333,
  augmented-fourth: 1.414,
  perfect-fifth: 1.500,
  golden-ratio: 1.618
);

$heading-type-scale-base : minor-third;
$display-type-scale-base : minor-third;
```

## Làm thế nào để kiểm tra giá trị Responsive Type Scales
Điều quan trọng là bạn không chỉ bị giới hạn bởi các giá trị bên trong map vì có thể nó không phù hợp với design trang web của bạn. Đó là lí do mà mình viết hàm dưới đây để kiểm tra xem giá trị được truyền cho mixin có phải là một trong những giá trị được set trong `$type-scales` hay nó phải là một unitless value (giá trị đơn vị) để tạo type scale:
```css
@function check-type-scale-value($scale) {

  // Kiểm tra $scale có giá trị trong $type-scales không.
  @if map-has-key($type-scales, $scale) {

    // Nếu giá trị $scale đã được định nghĩa trong $type-scales
    // thì trả về giá trị của $scale.
    @return map-get($type-scales, $scale);

  // Nếu giá trị $scale không được định nghĩa trong $type-scales map
  // kiểm tra nếu giá trị là 1 number
  // và nếu số đó là giá trị đơn vị (unitless value).
  } @else if type-of($scale) == number and unitless($scale) {

    // Nếu giá trị của $scale là một unitless number,
    // trả về số đó.
    @return $scale;

  // Cuối cùng nếu giá trị được truyền cho $scale
  // không được tìm thấy trong $type-scales map và cũng không phải là unitless number,
  // hãy đưa ra 1 Sass error.
  } @else {

    // Đưa ra thông báo lỗi
    @error "Sorry, `#{$scale}` is not a unitless number value or a pre-defined key in the $type-scales map.";
  }

}
```

Tiếp theo chúng ta sẽ xây dựng mixin để khởi tạo font-size.


## Tạo Heading và hiển thị Font sizes
Đầu tiên `mixin` được sử dụng để tạo heading font size từ `h6` đến `h1`:
```css
@mixin create-heading-type-scale($scale) {

    // Kiểm tra giá trị $scale và lưu chúng vào 1 biến để sử dụng khi tính toán font size
    $the-heading-type-scale: check-type-scale-value($scale);

    // Bắt đầu từ h6, nhân giá trị trước đó với biến $the-heading-type-scale để có được giá trị tiếp theo
    $font-size-h6 : $font-size-base;
    $font-size-h5 : $font-size-h6 * $the-heading-type-scale;
    $font-size-h4 : $font-size-h5 * $the-heading-type-scale;
    $font-size-h3 : $font-size-h4 * $the-heading-type-scale;
    $font-size-h2 : $font-size-h3 * $the-heading-type-scale;
    $font-size-h1 : $font-size-h2 * $the-heading-type-scale;
    // $font-size-display-base được tạo với phạm vi là global để có thể truy cập được từ mixin tiếp theo.
    $font-size-display-base : $font-size-h1 !global;

    // Gán font size cho các element và class
    h1, .h1 { font-size: $font-size-h1; }
    h2, .h2 { font-size: $font-size-h2; }
    h3, .h3 { font-size: $font-size-h3; }
    h4, .h4 { font-size: $font-size-h4; }
    h5, .h5 { font-size: $font-size-h5; }
    h6, .h6 { font-size: $font-size-h6; }
}
```

Ở trên, các font size đã được tạo và lưu trữ trong biến bắt đầu từ $font-size-base và nhân theo từng giá trị đó với type scale. Nguyên tắc này cũng được áp dụng với `$font-size-display-base` như sau:
```css
@mixin create-display-type-scale($scale) {

    // Lưu giá trị type scale mặc định trong 1 biến để tính toán
    $the-display-type-scale: check-type-scale-value($scale);

    // Tạo các biến tham chiếu từ font size trước đó
    $font-size-display-4 : $font-size-display-base + $font-size-base;
    $font-size-display-3 : $font-size-display-4 * $the-display-type-scale;
    $font-size-display-2 : $font-size-display-3 * $the-display-type-scale;
    $font-size-display-1 : $font-size-display-2 * $the-display-type-scale;

    // Gán font size cho các element và class
    .display-4 { font-size: $font-size-display-4; }
    .display-3 { font-size: $font-size-display-3; }
    .display-2 { font-size: $font-size-display-2; }
    .display-1 { font-size: $font-size-display-1; }
}
```
## Drop the Root `font-size`
Ở đây mình muốn để `font-size` là 14px cho điện thoại và với kích thước màn hình lớn hơn tương ứng với `16px` và `18px`. Đoạn `SCSS` dưới đây mình sử dụng breakpoint size của `md` và `lg`:
```css
html {
    font-size: 14px;
    @media (min-width: 768px) {
        font-size: 16px;
    }
    @media (min-width: 992px) {
        font-size: 18px;
    }
}
```
## Đóng gói
Khi mà công việc đã gần hoàn thiện thì bạn chỉ cần include mixins và chọn scale mong muốn là xong!
```css
// Tạo một heading font size
@include create-heading-type-scale($heading-type-scale-base);

// Tạo một display font size
@include create-display-type-scale($display-type-scale-base);

// Điều chỉnh heading type scale tại breakpoint md
@media (min-width: 768px) {
    @include create-heading-type-scale(minor-third);
}
```

Như bạn thấy đấy, bạn có thể include mixin ở bất kì breakpoint nào và thay đổi lại hoàn toàn type scale theo ý mình. Bạn vẫn có thể ghi đè font size nếu cần thiết.

# Kết luận
Hi vọng là bài viết này đã cung cấp cho bạn cái nhìn cơ bản về cách tùy chỉnh Bootstrap và làm thế nào để làm được 1 responsive type scale cho riêng mình.
 >Tham khảo:
 >https://www.sitepoint.com/build-responsive-type-scale-bootstrap/