![](https://images.viblo.asia/92ca0e72-aa18-4bf8-bc1e-e96451b6e15d.png)
### Mở đầu
Một cheatsheet rất hữu ích cho những ai mới bắt đầu sử dụng `SCSS`.

### Cheatsheet

<br>

`Variables`
```CSS
$red: #833;

body {
  color: $red;
}
```

<br>

`Extend`
```CSS
.button {
  ···
}

.push-button {
  @extend .button;
}
```

<br>

`Nesting`
```CSS
.markdown-body {
  p {
    color: blue;
  }

  &:hover {
    color: red;
  }
}
```

<br>

`Composing`
```CSS
@import './other_sass_file`;
The .scss or .sass extension is optional.
```

<br>

`Comments`
```CSS
/* Block comments */
// Line comments
```

<br>

`Mixins`
```CSS
@mixin heading-font {
  font-family: sans-serif;
  font-weight: bold;
}

h1 {
  @include heading-font;
}

with parameters
@mixin font-size($n) {
  font-size: $n * 1.2em;
}

body {
  @include font-size(2);
}

with default values
@mixin pad($n: 10px) {
  padding: $n;
}

body {
  @include pad(15px);
}

with a default variable

// Set a default value

$default-padding: 10px;
@mixin pad($n: $default-padding) {
  padding: $n;
}

body {
  @include pad(15px);
}
```
<br>

`For loops`
```CSS
@for $i from 1 through 4 {
  .item-#{$i} { left: 20px * $i; }
}
```
<br>

`Each loops (simple)`
```CSS
$menu-items: home about services contact;

@each $item in $menu-items {
  .photo-#{$item} {
    background: url('images/#{$item}.jpg');
  }
}
```
<br>

`Each loops (nested)`
```CSS
$backgrounds: (home, 'home.jpg'), (about, 'about.jpg');

@each $id, $image in $backgrounds {
  .photo-#{$id} {
    background: url($image);
  }
}
```
<br>

`While loops`
```CSS
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}

```
<br>

`Conditionals`
```CSS
@if $position == 'left' {
   position: absolute;
   left: 0;
}
@else {
   position: static;
}
```
<br>

`Maps`
```CSS
$map: (key1: value1, key2: value2, key3: value3);

map-get($map, key1)
```
<br>

### Kết luận
Cảm ơn vì đã đọc bài !

Tham khảo thêm [tại đây](https://devhints.io/sass)