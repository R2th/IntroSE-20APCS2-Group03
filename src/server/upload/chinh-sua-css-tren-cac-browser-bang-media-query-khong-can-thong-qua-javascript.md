Chào các bạn!

Đọc tiêu đề bài viết này chắc các bạn cũng hiểu luôn nội dung của bài viết này là sẽ viết về cái gì rồi nhỉ. Có lẽ bất kỳ ai là 1 developer sẽ không ít lần đau đầu với việc fix bug css trên các browser khác nhau nhỉ? Thực ra không chỉ các bạn chuyên về backend, thậm chí ngay cả những fontender như bọn mình chuyên về UI cũng đau đầu không kém thì có request là sẽ test trên nhiều brower đặc biệt là IE. Mặc dù IE được coi là root browser đấy nhưng về độ cùi của nó thì chắc không cần giới thiệu nhiều nữa rồi.

Nếu như trước đây khi chưa biết tới tip này, mình toàn sử dụng cách hơi cùi bắp 1 chút đó là **define browser bằng js sau đó add class tương ứng với mỗi browser vào body rồi từ đó chỉnh sửa css cho từng browser**.

Ví dụ như cách sử dụng đoạn js sau để define browser (hoặc cũng có thể là 1 đoạn js khác)

```css 
function myFunction() { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
        {
            alert('Opera');
        }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
        {
            alert('Chrome');
        }
    else if(navigator.userAgent.indexOf("Safari") != -1)
        {
            alert('Safari');
        }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
        {
             alert('Firefox');
        }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
        {
          alert('IE'); 
        }  
    else 
        {
           alert('unknown');
        }
}
```

Tuy nhiên, cho tới thời điểm hiện tại, mình đã phát hiện ra tip khá tiện lợi và nhẹ nhàng hơn cực kỳ nhiều, có thể hỗ trợ các bạn chỉnh sửa css trên các browser thông qua **media query**. Và bây giờ chúng ta cùng đi vào chi tiết xem tip này bao gồm những gì nhé. Let's go!

## 1. Internet Explorer

Về IE, tất nhiên, cho tới hiện tại chắc chẳng còn ai dùng các version IE6, IE7 thậm chí là IE8 nhưng việc liệt kê ra đây chắc cũng không thừa đâu nhỉ :blush: 

**IE 6**

```css
* html .ie6 { property: value; }
```

Hoặc

```css
.ie6 { _property: value; }
```

**IE 7**

```css
*+html .ie7 { property: value; }
```

Hoặc

```css
*:first-child+html .ie7 { property: value; }
```

**IE 6 and 7**

```css
@media screen\9 { 
    .ie67 {
        property: value; 
    }
}
```

Hoặc

```css
.ie67 { *property: value; }
```

Hoặc

```css
.ie67 { #property: value; }
```

**IE 6, 7 and 8**

```css
@media \0screen\,screen\9 {
    .ie678 {
        property: value;
    }
}
```

**IE 8**

```css
html>/**/body .ie8 { property: value; }
```

Hoặc

```css
@media \0screen {
    .ie8 {
        property: value;
    }
}
```

**IE 8 Standards Mode Only**

```css
.ie8 { property /*\**/: value\9 }
```

**IE 8,9 and 10**

```css
@media screen\0 {
    .ie8910 {
        property: value;
    }
}
```

**IE 9 only**

```css
@media screen and (min-width:0\0) and (min-resolution: .001dpcm) { 
    // IE9 CSS
    .ie9{
        property: value;
    }
}
```

**IE 9 and above**

```css
@media screen and (min-width:0\0) and (min-resolution: +72dpi) {
    // IE9+ CSS
    .ie9up { 
        property: value; 
    }
}
```

**IE 9 and 10**

```css
@media screen and (min-width:0\0) {
    .ie910 {
        property: value\9;
    } /* backslash-9 removes ie11+ & old Safari 4 */
}
```

**IE 10 only**

```css
_:-ms-lang(x), .ie10 { property: value\9; }
```

**IE 10 and above**

```css
_:-ms-lang(x), .ie10up { property: value; }
```

Hoặc

```css
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .ie10up {
        property:value;
    }
}
```

**IE 11 (and above..)**

```css
_:-ms-fullscreen, :root .ie11up { property: value; }
```

**Microsoft Edge**

```css
@supports (-ms-ime-align:auto) {
    .selector {
        property: value;
    }
}
```

## 2. Firefox

```css
@-moz-document url-prefix() {
  h1 {
    color: red;
  }
}
```

Hoặc

```css
@supports (-moz-appearance:none) {
    h1 { color:red; } 
}
```

## 3. Webkit

Có lẽ đa phần deloper đều quá quen thuộc với các browser được build trên nền tảng **-webkit-** này rồi nhỉ. Không xa lạ gì cả, đó là 2 browser **Chrome** và **Safari**. Hiện tại có thêm **Microsoft Edge** cũng chạy trên nền tảng **-webkit-** luôn. 

Với bản thân mình luôn code trên Chrome nên sẽ set Chrome là default, lấy Chrome làm thước đo chuẩn nên rất ít khi sử dụng các media query browser để chỉnh sửa css. Tuy nhiên, mình vẫn sẽ liệt kê ra đây cho đầy đủ.

**Chrome & Safari (any version)**

```css
@media screen and (-webkit-min-device-pixel-ratio:0) { 
    property: value;
}
```

**Chrome 29+**

```css
@media screen and (-webkit-min-device-pixel-ratio:0) and (min-resolution:.001dpcm) {
    .chrome {
        property: value;
    }
}
```

**Safari (7.1+)**

```css
_::-webkit-full-page-media, _:future, :root .safari_only {
    property: value;
}
```

```css
@media screen and (min-color-index:0) and(-webkit-min-device-pixel-ratio:0) { 
    @media {
        .safari6 { 
            color:#0000FF; 
            background-color:#CCCCCC; 
        }
    }
}
```

**Safari (10.1+)**

```css
@media not all and (min-resolution:.001dpcm) { 
    @media {
        .safari10 { 
            color:#0000FF; 
            background-color:#CCCCCC; 
        }
    }
}
```


Trên đây gần như là tất cả những gì mình đã khám phá được về việc sử dụng media query để chỉnh sửa css trên các browser khác nhau. List này tuy chưa đủ nhưng nó cũng vô cùng dài và mình thì chưa dùng hết tất cả. Tuy nhiên đã áp dụng thành công cho IE10&11 và Firefox. Tất nhiên không thể coi là đầy đủ vì sẽ còn vô vàn cách khác nữa, nếu bạn nào biết thêm thì comment bên dưới cho mình học hỏi thêm với nhé.

Chúc các bạn áp dụng thành công!