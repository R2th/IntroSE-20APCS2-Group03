### Giới thiệu
Giới thiệu tới mọi người 4 cách viết Sass nâng cao mà mình nghĩ sẽ có ích trong việc code và công việc của mọi người.

### Một số Snippets
> #### 1. Variable expansion in selectors
***SASS***
```SASS
$alertClass: "error";

p.message-#{$alertClass} {
    color: red;
}
```

***CSS***
```CSS
/* compiled CSS */
p.message-error {
  color: red;
}
````


> #### 2. Variable defaults
+ Sử dụng IF <br>
**SASS**
```SASS
$debug: false;

article {
    color: black;

    @if ($debug) { // visualizing layout internals
        border: 1px dotted red;
    }
}
```

**CSS**
```CSS
/* compiled CSS */
article {
  color: black;
}
```

+ Sử dụng each <br>

**SCSS**
```SASS
@each $name in 'save' 'cancel' 'help' {
    .icon-#{$name} {
        background-image: url('/images/#{$name}.png');
    }
}
```
```CSS
/* compiled CSS */
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
> #### 3. The list data type
**SCSS**
```SCSS
$buttonConfig: 'save' 50px, 'cancel' 50px, 'help' 100px; // TODO: move to _settings.scss

@each $tuple in $buttonConfig {
    .button-#{nth($tuple, 1)} {
        width: nth($tuple, 2);
    }
}
```
**CSS**
```CSS
/* compiled CSS */
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

> #### 4. Content block arguments for mixins
**SCSS**
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
**CSS**
```CSS
/* compiled CSS */
@media (max-width: 768px) {
  p {
    font-size: 150%;
  }
}
```


### Lời kết
Hi vọng 4 cách viết này sẽ giúp cho những ai quan tâm có thể có nhiều lựa chọn để viết Sass, nâng cao tuỳ viến và kỹ thuật viết giúp cho công việc được tốt hơn.
Cảm ơn các bạn đã đọc bài nhé và hi vọng nó có ích cho bạn !