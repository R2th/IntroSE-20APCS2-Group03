Đây là một tập hợp các mixins sass (scss) mạnh mẽ mà chúng tôi đã sử dụng nhiều nhất tại Jam3 và một số khác mà tôi thấy là hữu ích. Mixins là khá nhiều chức năng trả về khối css, chúng rất mạnh, giúp mã sạch hơn và sẽ tăng tốc quá trình phát triển của bạn. Đây không chỉ dành cho sass.
# 1. Box
```
@mixin box($width, $height: $width) {
  width: $width;
  height: $height;
}

/* ===== Usage ===== */
div {
  // You can pass width && height
  @include box(200px, 300px);
  /* or just pass width and the height
     will default to the width value */
  @include box(200px);
}
```

# 2. Flexbox Toolkit
```
@mixin flex-column {
  display: flex;
  flex-direction: column;
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-center-column {
  @include flex-center;
  flex-direction: column;
}

@mixin flex-center-vert {
  display: flex;
  align-items: center;
}

@mixin flex-center-horiz {
  display: flex;
  justify-content: center;
}
```

# 3. Font Size
```
@mixin font-size($font-size, $line-height: normal, $letter-spacing: normal) {
  font-size: $font-size * 1px;
  // font-size: $font-size * 0.1rem; 
  // example using rem values and 62.5% font-size so 1rem = 10px

  @if $line-height==normal {
    line-height: normal;
  } @else {
    line-height: $line-height / $font-size;
  }

  @if $letter-spacing==normal {
    letter-spacing: normal;
  } @else {
    letter-spacing: #{$letter-spacing / $font-size}em;
  }
}

/* ===== Usage ===== */
p {
  @include font-size(12, 18, 1.2);
  // returns
  font-size: 12px;
  line-height: 1.5; // 18 / 12
  letter-spacing: 0.1em;
}
```

# 4. Font Face
```
@mixin font-face($font-name, $path, $weight: normal, $style: normal) {
  @font-face {
    font-family: quote($font-name);
    src: url($path+".eot");
    src: url($path+".eot?#iefix") format("embedded-opentype"), url($path+".woff")
        format("woff"), url($path+".ttf") format("truetype"), url($path+".svg##{$font-name}")
        format("svg");
    font-weight: $weight;
    font-style: $style;
  }
}

/* ===== Usage ===== */
@include font-face(Roboto, "./assets/Roboto", normal, normal);
```

# 5. Cover Background
```
@mixin cover-background {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* ===== Usage ===== */
div {
  background-image: url("cute-doggo.png");
  @include cover-background;
}
```

# 6. Pseudo
```
@mixin pseudo(
  $width: 100%,
  $height: 100%,
  $display: inline-block,
  $pos: absolute,
  $content: ""
) {
  content: $content;
  display: $display;
  position: $pos;
  @include box($width, $height);
}

/* ===== Usage ===== */
div {
  position: relative;
  width: 200px;
  height: 200px;

  &:after {
    @include pseudo(100px, 100px);
  }
}
```

# 7. Media queries
```
$tablet: 768;
$large: 1024;
$desktop: 1280;

@mixin tablet {
  @media only screen and (min-width: $tablet * 1px) {
    @content;
  }
}

@mixin large {
  @media only screen and (min-width: $large * 1px) {
    @content;
  }
}

@mixin desktop {
  @media only screen and (min-width: $desktop * 1px) {
    @content;
  }
}

/* ===== Usage ===== */
h1 {
  font-size: 10px;

  @include tablet {
    font-size: 12px;
  }

  @include desktop {
    font-size: 20px;
  }
}
```

# 8. z-index handling
```
$elements: landing, header, modal, very-important-modal;

@mixin z-index($id) {
  z-index: index($elements, $id);
}
```

# 9. Visibility
```
@mixin fade($type) {
  @if $type== "hide" {
    visibility: hidden;
    opacity: 0;
    transition: visibility 1s, opacity 1s;
  } @else if $type== "show" {
    visibility: visible;
    opacity: 1;
    transition: visibility 1s, opacity 1s;
  }
}
```

# 10. Background Transition
```
@mixin skew-background-transition($initial, $hover, $inverted: false) {
  background: linear-gradient(
    90deg,
    $hover 0%,
    $hover 50%,
    $initial 50%,
    $initial 100%
  );
  background-repeat: no-repeat;
  background-size: 200% 100%;

  background-position: right bottom;
  @if $inverted {
    background-position: left bottom;
  }
  transition: background-position 0.25s ease-out;

  &:hover {
    background-position: left bottom;
    @if $inverted {
      background-position: right bottom;
    }
  }
}
```

Hi vong bài viết này sẽ giúp ích 1 phần nào đó trong dự án các bạn xử dụng mixins .
Cảm ơn vì đã đọc !