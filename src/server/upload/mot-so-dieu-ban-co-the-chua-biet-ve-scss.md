### 1. Prefixing parent selector references
Trong SCSS `&` thường được sử dụng như sau:
```SCSS
a {
    &:hover {
        color: red;
    }
}
```
Nhưng bạn có biết `&` còn có thể được dùng như này:
```SCSS
p {
    body.no-touch & {
        display: none;
    }
}
```
output:
```CSS
body.no-touch p {
  display: none;
}
```
### 2. Variable expansion in selectors
Sử dụng biến trong tên của selector:
```SCSS
$alertClass: "error";

p.message-#{$alertClass} {
    color: red;
}
```
output:
```CSS
p.message-error {
  color: red;
}
```

Hoặc dùng trong @media:

```SCSS
$breakpoint: 768px;

@media (max-width: #{$breakpoint}) {
    /* This block only applies to viewports <= #{$breakpoint} wide... */
}
```
output:
```CSS
@media (max-width: 768px) {
  /* This block only applies to viewports <= 768px wide... */
}
```
### 3. Control directives
SCSS có hỗ trợ những flow control như

`@if`
```SCSS
$debug: false; // TODO: move to _settings.scss

article {
    color: black;

    @if ($debug) { // visualizing layout internals
        border: 1px dotted red;
    }
}
```
output:
```CSS
article {
  color: black;
}
```
`@each`
```SCSS
@each $name in 'save' 'cancel' 'help' {
    .icon-#{$name} {
        background-image: url('/images/#{$name}.png');
    }
}
```
output:
```CSS
.icon-save {
  background-image: url("/images/save.png");
}
.icon-cancel {
  background-image: url("/images/cancel.png");
}
.icon-help {
  background-image: url("/images/help.png");
}
```
Tương tự SCSS còn hỗ trợ `for` `white`
### 4. The list data type
Sử dụng `@each` để loop qua một list
```SCSS
$buttonConfig: 'save' 50px, 'cancel' 50px, 'help' 100px; // TODO: move to _settings.scss

@each $tuple in $buttonConfig {
    .button-#{nth($tuple, 1)} {
        width: nth($tuple, 2);
    }
}
```
output:
```CSS
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
### 5. Defining custom functions
Chúng ta có thể tự tạo một function riêng:
```SCSS
@function make-greener($value) {
    @return $value + rgb(0,50,0); // arithmetic with colors is totally fine, btw
}
p {
    background: make-greener(gray);
}
```
output
```CSS
p {
  background: #80b280;
}
```
### 6. Variable arguments for functions/mixins
```SCSS
@mixin config-icon-colors($prefix, $colors...) {
    @each $i in $colors {
        .#{$prefix}#{nth($i, 1)} {
            color: nth($i, 2);
        }
    }
}
@include config-icon-colors('icon-',
    'save'   green,
    'cancel' gray,
    'delete' red
);
```
output
```CSS
.icon-save {
  color: green;
}
.icon-cancel {
  color: gray;
}
.icon-delete {
  color: red;
}
```

### 7. Content block arguments for mixins
Từ version 3.2.0 SCSS cho phép ta truyền block vào mixin
```SCSS
@mixin only-for-mobile {
    @media (max-width: 768px) {
        @content;
    }
}

@include only-for-mobile() /* note: @content begins here */ {
    p {
        font-size: 150%;
    }
} /* @content ends */
```
output
```CSS
@media (max-width: 768px) {
  p {
    font-size: 150%;
  }
}
```
### 8. Content block overrides -pattern
Ta có thể viết đè lên content đã tạo sãn trong mixin:
```SCSS
@mixin message($class) {
    .message-#{$class} {
        border: 1px dotted yellow;
        color: yellow;
        margin: 20px;
        padding: 10px;
        @content;
    }
}

@include message("subtle") {
    margin: 5px;
}
```
output
```CSS
.message-subtle {
  border: 1px dotted yellow;
  color: yellow;
  margin: 20px;
  padding: 10px;
  margin: 5px;
}
```

Cảm ơn đã đọc. [Tham khảo](https://gist.github.com/jareware/4738651)