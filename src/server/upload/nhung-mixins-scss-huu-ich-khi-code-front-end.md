Hello các bạn, như trên tiêu đề, mình sẽ giới thiệu các bạn những mixins mà mình cũng như các dev Front-end khác hay dùng nhất trong một dự án.

Có rất nhiều nơi recommend các mixin để giải quyết vấn đề prefix cho trình duyệt cũ, nhưng cá nhân mình thấy nó hơi thừa, vì ngày nay chúng ta thường dùng PostCSS hoặc Autoprefixer để tự thêm chúng rồi.
Vậy nên mình sẽ không nhắc tới các mixin kiểu như vậy nữa.

Ok, dài dòng vậy đủ rồi, mình sẽ vào vấn đề chính luôn :grinning:

# 1. Responsive
Đây là mixin dùng nhiều nhất với mình, dùng để code responsive trang web (Mobile first nhé).

```
@mixin responsive($canvas) {
  @if $canvas == xs {
    @media only screen and (min-width: 320px) { @content; }
  }

  @else if $canvas == sm {
    @media only screen and (min-width: 576px) { @content; }
  }

  @else if $canvas == md {
    @media only screen and (min-width: 768px) { @content; }
  }

  @else if $canvas == lg {
    @media only screen and (min-width: 992px) { @content; }
  }

  @else if $canvas == xl {
    @media only screen and (min-width: 1200px) { @content; }
  }

  @else if $canvas == xxl {
    @media only screen and (min-width: 1600px) { @content; }
  }
}
```

Ở đây mình chia theo các mốc lưới của Bootstrap 4, lần lượt là 320, 576, 768, 992, 1200 và có cải tiến thêm mốc 1600 dành cho các bản thiết kế lớn hơn. Cách dùng:

```
html {
  font-size: 12px;
  
  @include responsive(sm) {
    font-size: 13px;
  }

  @include responsive(md) {
    font-size: 14px;
  }
  
  @include responsive(lg) {
      font-size: 16px;
  }
}
```

Cũng khá đơn giản đúng không :grinning: giờ mình sẽ chỉ thêm cái quan trọng thứ 2 mà gần như dự án nào cũng dùng

# 2. Gutter (Chỉ áp dụng cho dự án dùng Bootstrap)
Đây là code để các bạn điều chỉnh khoảng cách giữa các column trong Bootstrap. Giả sử bạn có 1 row sản phẩm gồm 4 sản phẩm. Mặc định bootstrap là cách 30px giữa các sản phẩm. Nếu bạn muốn cách 50px thì sao? Tất nhiên bạn có thể customize trong core của bootstrap, nhưng như vậy sẽ ảnh hưởng toàn bộ hệ thống Grid mà trong khi bạn chỉ muốn cái row này cách 50px mà thôi. Vậy nên ta sẽ cần cái mixin này:

```
@mixin gutter( $gutterWidth ) {
  @if $gutterWidth <= 30 {
    margin-right: -#{$gutterWidth / 2}px;
    margin-left: -#{$gutterWidth / 2}px;

    > .col,
    > [class^="col-"],
    > [class^=" col-"] {
      padding-right: #{$gutterWidth / 2}px;
      padding-left: #{$gutterWidth / 2}px;
    }
  }

  @else {
    @include responsive(lg) {
      margin-right: -#{$gutterWidth / 2}px;
      margin-left: -#{$gutterWidth / 2}px;

      > .col,
      > [class^="col-"],
      > [class^=" col-"] {
        padding-right: #{$gutterWidth / 2}px;
        padding-left: #{$gutterWidth / 2}px;
      }
    }
  }
}
```

Cách dùng như sau: Giả sử bạn muốn cách 50px, ta sẽ khai báo class trong scss để tái sử dụng được nhiều nơi.

**SCSS**
```
.row.gutter-50 {
    @include gutter(50);
}
```

**HTML**
```
<div class="row gutter-50"> // Thêm class gutter-50 vào khối chứa class row
    <div class="col-12 col-lg-3">
        <article class="post">
            ...
        </article>
    </div>
</div>
```

*Lưu ý: Có thể các bạn sẽ thắc mắc tại sao mixin của mình lại có đoạn @if và @else trông có vẻ thừa kia. Lý do là vì nếu bạn báo gutter lớn hơn 30 thì khi xuống màn hình mobile, tổng padding 2 bên trái phải của column sẽ lớn hơn mặc định của container bootstrap (30px) **dẫn đến sinh thanh cuộn ngang** làm mất thẩm mỹ responsive, **vậy nên, với những gutter > 30px ta chỉ áp dụng với màn hình cỡ lớn***

# 3. Placeholder
Đây là code để ta có thể tùy biến placeholder của input. Lưu ý đoạn code này chỉ áp dụng cho SCSS bản 3.4 đổ đi

```
@mixin optional-at-root($sel) {
  @at-root #{if(not &, $sel, selector-append(&, $sel))} {
    @content;
  }
}

@mixin placeholder {
  @include optional-at-root('::-webkit-input-placeholder') {
    @content;
  }

  @include optional-at-root(':-moz-placeholder') {
    @content;
  }

  @include optional-at-root('::-moz-placeholder') {
    @content;
  }

  @include optional-at-root(':-ms-input-placeholder') {
    @content;
  }
}
```

Cách dùng:
```
.foo {
  @include placeholder {
    color: green;
  }
}

@include placeholder {
  color: red;
}
```

Kết quả: 
```
.foo::-webkit-input-placeholder {
  color: green;
}
.foo:-moz-placeholder {
  color: green;
}
.foo::-moz-placeholder {
  color: green;
}
.foo:-ms-input-placeholder {
  color: green;
}

::-webkit-input-placeholder {
  color: red;
}
:-moz-placeholder {
  color: red;
}
::-moz-placeholder {
  color: red;
}
:-ms-input-placeholder {
  color: red;
}
```

# 4. Gradient
Đây là mixin để thêm background gradient cho DOM. Ta có $start-color: màu bắt đầu, $end-color: màu kết thúc, $orientation: Chiều của gradient.
Orientation có thể là *vertical* (dọc), *horizontal* ( ngang) hoặc không để gì thì sẽ là Gradient hình tròn.

```
@mixin gradient($start-color, $end-color, $orientation) {
  background: $start-color;
  @if $orientation == 'vertical' {
    background: -webkit-linear-gradient(top, $start-color, $end-color);
    background: linear-gradient(to bottom, $start-color, $end-color);
  } @else if $orientation == 'horizontal' {
    background: -webkit-linear-gradient(left, $start-color, $end-color);
    background: linear-gradient(to right, $start-color, $end-color);
  } @else {
    background: -webkit-radial-gradient(center, ellipse cover, $start-color, $end-color);
    background: radial-gradient(ellipse at center, $start-color, $end-color);
  }
}
```

Cách dùng:
```
.gradient {
  @include gradient(#07c, #06f, vertical);
}
```

Oke, vậy là trên đây mình đã giới thiệu 4 Mixins mà mình thấy dự án nào mình cũng cần dùng rồi. Cảm ơn các bạn đã đọc, nếu có mixins nào hữu ích nữa, các bạn có thể comment cho mình biết với nha :grinning: