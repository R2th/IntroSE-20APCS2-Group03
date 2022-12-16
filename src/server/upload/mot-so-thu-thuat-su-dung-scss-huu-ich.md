SCSS là một CSS Preprocessor mang lại cách viết code CSS gọn gàng, dễ nhìn và tận dụng tối đa source trước khi compile hơn. Hiện nay, SASS/SCSS đã được cộng đồng Coder sử dụng trong hầu hết các dự án cần đến HTML/CSS. Bài viết dưới đây của mình sẽ đưa ra một số thủ thuật đơn giản nhưng hữu ích trong việc sử dụng SCSS

# Sử dụng selector parent trong child

Bạn có thể đã quen với đoạn code sau:

```
.li {
  &:hover {
    background: #000;
  }
}
```

Sẽ render ra thành:

```
.li:hover { background: #000; }
```

Nhưng bạn cũng có thể nghĩ tới việc gọi parent class ngay trong child class như thế này:

```
.li {
  .page-template-home & {
    background: #fff;
  }
}
```

Nó sẽ render ra thành:

```
.page-template-home .li{ background: #fff; }
```

# Sử dụng variable trong selector

Bạn có thể tạo ra các dynamic class của selector bằng cách sử dụng # ngay trước khi output variable trong cặp dấu ngoặc nhọn {}.

```
$alertClass: "error";
.message-#{$alertClass} {
 color: #232425;
}
```

Khi render code sẽ ra:

```
.message-error { color: #232425; }
```

Hoặc ví dụ như: 

```
$breakpoint: 768px;

@media (max-width: #{$breakpoint}) {
    /* This block only applies to viewports <= #{$breakpoint} wide... */
}
```

Sau khi render sẽ là:

```
@media (max-width: 768px) {
  /* This block only applies to viewports <= 768px wide... */
}
```

# Variable mặc định

Thông thường bạn sẽ define variable và sử dụng chúng trong các thuộc tính:

```
$message-color: blue !default;
p.message {
    color: $message-color;
}
```

Với !default, nó sẽ chỉ apply khi chưa có thuộc tính được định nghĩa trước đó.

Output sẽ ra là:

```
p.message {
  color: black;
}
```

# Biến mặc định

Trong mixins và function có hỗ trợ bạn thiết lập biến mặc định, chẳng hạn như trong tình huống dưới đây ta có xác định trước $elem là all:

```
@mixin transition($elem: all) {
  transition: $elem .3s ease;
}
```

Vậy nếu bạn gọi:

```
.box {
  @include transition;
}
```

Thì khi render sẽ được:

```
.box { transition: all .3s ease; }
```

# Extending selectors

SCSS cho phép Extending selectors, bằng cách sao chép và kết hợp các bộ chọn trong đầu ra CSS. Điều thú vị là, trong khi cơ chế rõ ràng là rất khác nhau, đặc tính của @extend trong SCSS lại khá giống với các ngôn ngữ lập trình hướng đối tượng truyền thống ( như Java hay whatnot) :

```
.animal {
    background: gray;
}
.cat {
    @extend .animal;
    color: white;
}
```

ouput sẽ là:

```
.animal, .cat {
  background: gray;
}
.cat {
  color: white;
}
```

Ngoài ra, Extending Selector còn cho phép tích hợp vào thư viện CSS của bên thứ ba. Ví dụ dưới đây ta sẽ extend lại class .btn từ Twitter Bootstrap:

```
@import "bootstrap.scss"; // just a renamed .css file, so that @import works

button {
    @extend .btn;
}
```

# Kiểu dữ liệu danh sách

Như chúng ta đã biết, @each được dùng để lặp qua lại ở trong một danh sách. Danh sách thực tế là một phần cơ bản ở trong SCSS, dưới đây là một minh chứng về tính hữu ích của nó:

```
$buttonConfig: 'save' 50px, 'cancel' 50px, 'help' 100px;

@each $tuple in $buttonConfig {
    .button-#{nth($tuple, 1)} {
        width: nth($tuple, 2);
    }
}
```

CSS output:

```
.button-save {
  width: 50px;
}
.button-cancel {
  width: 50px;
}
.button-help {
  width: 100px;
}
```

# Lời kết

Trên đây là một số thủ thuật mình nghĩ là sẽ hữu ích giúp cho các bạn trong việc sử dụng SCSS. Các bạn có thể tham khảo thêm một số thủ thuật khác tại [đây](https://gist.github.com/jareware/4738651/)

Cảm ơn các bạn đã đọc bài viết này!

Tham khảo: https://gist.github.com/jareware/4738651/