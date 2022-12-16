### Giới thiệu
Xin chào các bạn,tiếp nối Phần 1 mình xin giới thiệu thêm 5 snippets về SASS ở Phần 2 này.
Lần này sẽ là về vòng lặp each vs for.
### Một số Snippets
> #### 1. Class Name & Background Image
**SASS**
```SASS
$pages: pageA, pageB, pageC, pageD, pageE;

@each $page in $pages {
  .#{$page}-bg {
    background: url(../images/#{$page}/bg.jpg) 0 0 no-repeat;
  }
}
````
**CSS**
```CSS
.pageA-bg {
  background: url(../images/pageA/bg.jpg) 0 0 no-repeat;
}
.pageB-bg {
  background: url(../images/pageB/bg.jpg) 0 0 no-repeat;
}
.pageC-bg {
  background: url(../images/pageC/bg.jpg) 0 0 no-repeat;
}
.pageD-bg {
  background: url(../images/pageD/bg.jpg) 0 0 no-repeat;
}
.pageE-bg {
  background: url(../images/pageE/bg.jpg) 0 0 no-repeat;
}
```
> #### 2. Class Name & Background Color
**SASS**
```SASS
$page-color: (
  'pageA': #0ff,
  'pageB': #f0f,
  'pageC': #ff0,
  'pageD': #000,
  'pageE': #fff
);

@each $page, $color in $page-color {
  .#{$page}-bg {
    background-color: $color;
  }
}
```
**CSS**
```CSS
.pageA-bg {
  background-color: #0ff;
}
.pageB-bg {
  background-color: #f0f;
}
.pageC-bg {
  background-color: #ff0;
}
.pageD-bg {
  background-color: #000;
}
.pageE-bg {
  background-color: #fff;
}
```
> #### 3. Class Name & Background Color (RGBA)
**SASS**
```SASS
$page-color: (
  'pageA': #0ff,
  'pageB': #f0f,
  'pageC': #ff0,
  'pageD': #000,
  'pageE': #fff
);

@each $page, $color in $page-color {
  .#{$page}-bg {
    background-color: rgba($color, .5);
  }
}
```
**CSS**
```CSS
.pageA-bg {
  background-color: rgba(0, 255, 255, 0.5);
}
.pageB-bg {
  background-color: rgba(255, 0, 255, 0.5);
}
.pageC-bg {
  background-color: rgba(255, 255, 0, 0.5);
}
.pageD-bg {
  background-color: rgba(0, 0, 0, 0.5);
}
.pageE-bg {
  background-color: rgba(255, 255, 255, 0.5);
}
```
> #### 4.Class Name,Background Image & Background  Color
**SASS**
```SASS
$page-color: (
  'pageA': #0ff,
  'pageB': #f0f,
  'pageC': #ff0,
  'pageD': #000,
  'pageE': #fff
);

@each $page, $color in $page-color {
  .#{$page}-bg {
    background: $color url(../images/#{$page}/bg.jpg) 0 0 no-repeat;
  }
}
```
**CSS**
```CSS
.pageA-bg {
  background: #0ff url(../images/pageA/bg.jpg) 0 0 no-repeat;
}
.pageB-bg {
  background: #f0f url(../images/pageB/bg.jpg) 0 0 no-repeat;
}
.pageC-bg {
  background: #ff0 url(../images/pageC/bg.jpg) 0 0 no-repeat;
}
.pageD-bg {
  background: #000 url(../images/pageD/bg.jpg) 0 0 no-repeat;
}
.pageE-bg {
  background: #fff url(../images/pageE/bg.jpg) 0 0 no-repeat;
}
```
> #### 5. Margin & Padding (Cài đặt cố định theo tên viết tắt vs số tương ứng)
Ví dụ như 
```
.mt0 = margin-top : 0px!important;
```
```
.pt1 = padding-top : 1px!important;
```
**SASS**
```SASS
$num: 5;

@for $i from 0 through 10 {
  .mt#{$i * $num} {
    margin-top: #{$i * $num}px !important;
  }
  .mr#{$i * $num} {
    margin-right: #{$i * $num}px !important;
  }
  .mb#{$i * $num} {
    margin-bottom: #{$i * $num}px !important;
  }
  .ml#{$i * $num} {
    margin-left: #{$i * $num}px !important;
  }
  .pt#{$i * $num} {
    padding-top: #{$i * $num}px !important;
  }
  .pr#{$i * $num} {
    padding-right: #{$i * $num}px !important;
  }
  .pb#{$i * $num} {
    padding-bottom: #{$i * $num}px !important;
  }
  .pl#{$i * $num} {
    padding-left: #{$i * $num}px !important;
  }
}
```
**CSS**
```CSS
.mt0 { margin-top: 0px !important; }
.mr0 { margin-right: 0px !important; }
.mb0 { margin-bottom: 0px !important; }
.ml0 { margin-left: 0px !important; }
.pt0 { padding-top: 0px !important; }
.pr0 { padding-right: 0px !important; }
.pb0 { padding-bottom: 0px !important; }
.pl0 { padding-left: 0px !important; }
```

### Lời kết
Đây là 5 cách viết vòng lặp cho Class Name, Background Image vs Background Color cùng với cài đặt cố định Margin vs Padding.Hi vọng sẽ giúp ích cho mọi người phần nào đó trong việc viết SASS.
Cảm ơn mọi người đã đọc vs tham khảo vs mình sẽ kết thúc chủ để này ở Phần 3 .Xin chào và hẹn gặp lại.
ご参考になれば！！
ご覧をいただきありがとうございました。