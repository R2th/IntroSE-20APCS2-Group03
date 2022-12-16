Xin chào anh em, lâu lắm mới lại có thời gian rảnh rỗi ngồi viết những kiến thức mình đã học và đang thực hành trong các project của  minh. 
Viết nhiều về back-end Laravel rồi, thì hôm nay mình xin được chia sẻ kiến thức để viết CSS trong front-end một cách dễ dàng hơn.

Như các bạn biết đấu, nếu chúng ta viết CSS một cách truyền thống, nhiều lúc bạn sẽ phải lặp lại các đoạn mã CSS tương tự nhau, điều đó làm các bạn thấy khó chịu khi phải code rất dài mà các đoạn mã đó trùng lặp nhau. Vì thế bạn cần áp dụng SASS vào khi code CSS nhé  :)


# 1. SASS, SCSS là gì nào ?
Trước khi bạn học về SASS thì các bạn nhớ biết qua về kiến thức CSS nhé :). 

Thì nó cũng không phải là cái gì to tát lắm

* SASS được viết tắt của từ **SYNTACTICALLY AWESOME STYLE-SHEETS**
* SCSS được viết tắt của từ **SASSY CSS**

SASS SCSS là một `CSS Prepocessor`, là  để giúp chúng ta viết ra những đoạn mã CSS nhanh hơn và có cấu trúc rõ ràng hơn. Nhìn chung 2 cái trên mình đề cập đều giúp cho chúng ta viết những đoạn mã CSS một cách dễ dàng hơn. Nhưng có đôi chỗ khác biệt giữa chúng



| SASS | SCSS |
| -------- | -------- |
| Original language, shoter syntax  |      Newer syntax , closer to css, defacto standard|
|![](https://images.viblo.asia/6d53d4ba-4db2-41c7-a951-1276d55d09dc.png)|![](https://images.viblo.asia/6b30f6fa-5996-436a-972c-9a235e6e8b1d.png)|
|Indextation|Curly braces & semi-colons |
|Strict rules for whitespace| Ignores whitespace|
|=my-mixin| @mixin my-mixin|
|+my-mixin|@include my-mixin|
|@import foo|@import foo|
|@extend foo|@extend foo|

# 2. Một số chức năng.
## 2.1 Variables
Chúng ta có thể khai báo biến để có thể dùng cho nhiều chỗ khác nhau trong file .scss của chúng ta

```CSS
$text-color: #222222;

body {
    font-family: sans-serif;
    color: $text-color;
}
```

Khi project của chúng ta viết rất nhiều các đoạn CSS mà cần dùng nhiều đến màu mà đặc điểm là chúng ta sẽ phải dùng đi dùng lại những mà concept quy định. Chúng ta sẽ tách hẳn ra 1 file có thể đặt tên là `_colors.scss` - nơi khai báo các màu chung của project của chúng ta dùng chung.
```CSS
// Black & white
$white:      #fff;
$black:      #1b1b1b;

// Various colors
$blue:    #409EFF !default;
$indigo:  #6610f2 !default;
$purple:  #6f42c1 !default;
$pink:    #e83e8c !default;
$red:     #F56C6C !default;
$orange:  #fd7e14 !default;
$yellow:  #E6A23C !default;
$green:   #67C23A !default;
$teal:    #20c997 !default;
$cyan:    #909399 !default;

// Grayscales
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;

// Semantic colors
$primary:       $blue;
$secondary:     $gray-600;
$success:       $green;
$info:          $cyan;
$warning:       $yellow;
$danger:        $red;

// Light and dark
$light:         $gray-100;
$dark:          $gray-800;

```
Khi muốn sử dụng nhưng biến có giá trị màu này chúng ta có thể import file _color.scss này vào và sử dụng các biến đó bình thường nhé.

VD chúng ta muốn dùng các biến trong file _color.scss trong file main.scss thì chúng ta sẽ làm như sau:
```CSS
@import "colors"
//code
```

Ở đây là 2 file trên đặt cùng cấp với nhau.

## 2.2 Mixin
Mixin là gì ? nó hoạt động như thế nào. Thì mình có thể nói như thế này, `mixin` là một tiện ích , ai biết áp dụng cái này vào viết css thì rất là nhàn. Hay bạn cứ hiểu nó như là một function, có thể sử dụng ở khắp mọi nơi nếu bạn include nó vào file mà chúng ta cần sử dụng, và chúng ta có thể truyền tham số để tùy biến cho nó.

Thì mixin có 2 loại: truyền thăm số và không truyền tham số.

* Không truyền tham số

![](https://images.viblo.asia/6ed43e4a-2893-4bd0-8ce6-04f43dfa20e0.png)

* Truyền tham số 

![](https://images.viblo.asia/f1effac9-d77b-452f-b356-9b23afdef3db.png)

Và khi chúng ta muốn sử dụng mixin ở trong file main.scss thì chúng ta phải import file _mixins.scss vào trong file main.scss để dùng, và dùng `@include tên-mixin-trong-file-_mixins.scss`

![](https://images.viblo.asia/8daeab4e-e38f-4a6c-b89a-933104ef3387.png)

![](https://images.viblo.asia/5fa2d23f-733b-43f2-8137-4febfd96068b.png)

Ngoài ra chúng ta còn có thể dựng sẵn mixins lên trong file _mixins.scss và sau đó viết content sau cho nó ở file main.scss cũng được, điều đó chúng ta sẽ phải sử dụng `@content` trong mixin
```CSS
// file _mixins.scss

@mixin apply-to-ie-6 {
        *html {
                @content
        }
}
```

Và sau đó chúng ta viết nội dụng cho nó ở trong file main.scss như sau: 
```CSS
@include apply-to-ie-6 {
        body {
                font-size: 125%;
        }
}
```

## 2.3. Import
Như các bạn cũng xem những ví dụ của mình ở trên rồi đấy, thì chúng ta có thể import các file .scss vào nhau để dùng nhé.
![](https://images.viblo.asia/8daeab4e-e38f-4a6c-b89a-933104ef3387.png)

## 2.4 Function
Trong scss chúng ta có thể định nghĩa ra các funtcion và sử dụng chúng một cách bình thường giống như các ngôn ngữ lập trình. Thì ở đây ta có 2 loại function : built-in và function mà chúng ta tự định nghĩa.

* Built-in: đó là những function có sẵn mà sass hỗ trợ , chúng ta chỉ việc gọi tên và truyền các biến tương ứng với các hàm đó yêu cầu vào và sử dụng bình thường.
```CSS
$link-color: #fff;
a {
    color: $link-color;
    
    &:hover {
            color: darken($link-color, 15%);
    }
}
```

Các bạn có thể tham khảo những hàm có sẵn mà sass nó hỗ trợ ở [đây](http://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) nhé

*  Hàm tự mình định nghĩa:
Chúng ta có thể tự tạo 1 file , nơi mà bạn sẽ định nghĩa ra tất cả các function mà bạn định nghỉ để sử dụng. Ví dụ, mình định nghĩa 1 file _functions.scss như sau 

![](https://images.viblo.asia/157ac9d8-feee-47d2-9f3c-4cd3218011e9.png)

Sau đó mình sẽ import vào file main.scss để sử dụng function `em ` trong body

![](https://images.viblo.asia/967d7ed2-ba96-4325-bd22-0120992a780d.png)
 
 ## 2.5 Inheritance with extend
 Đây là một tính năng quan trọng mà chúng ta sử dụng rất nhiều. Tính năng nó sẽ kế thừa tất cả các thuộc tính của một class hoặc một cái gì mã chúng ta đã khai báo sẵn. Mình ví dụ cho dễ hiểu hơn nhé,
 ```CSS
         .error {
                 color: red;
         }
         
         .critical-error {
                 @extend .error;
                 bottom: 1px solid red;
                 font-weight: bold;
         }
 ```
 
 Đoạn mã trên khi viết CSS nó sẽ thành
 ```CSS
         .error, .critical-error {
                 color: red;
         }
         
         .critical-error { 
                 bottom: 1px solid red;
                 font-weight: bold;
         }
 ```
 
Như các bạn thấy đấy, chúng ta sẽ sử dụng từ khóa `@extend ` để chúng ta sử dụng được hết tất cả các thuộc tính của class `error` trong class `critical-error`. Điều đo tiện ích cho chúng ta đỡ phải lặp lại những đoạn mã CSS giống nhau trong khi viết CSS, trông đoạn mã CSS sẽ rất clear hơn rất nhiều đó.
 
 
 Ngoài ra chúng ta có thể dùng `Placeholder selector`. Nó là cái gì vây ? `Placeholder selector` trong Sass được khai báo bằng cách bắt đầu `%`. Nó sẽ không render trực tiếp khi biên dịch CSS, chỉ có những class nào @extend nó vào thì nó mới được render các thuộc tính trong class đó. Mình sẽ lấy ví dụ để các bạn hiểu hơn nhé
 ```CSS
 %highlight {
         font-style: italic;
 }
 
 .sub-title {
         @extend %highlight;
         font-size: em(20px);
 }
 ```
 
 Khi render ra CSS thì sẽ được đoạn mã sau:
 ```CSS
         .sub-title {
             font-style: italic;
         }
         
         .sub-title {
             font-size: 1.25em;
         }
 ```
 ## 2.6 Conditional Directives
 Một tiện ích mà chúng ta phải kể đến đó chính là `if  else` trong Scss, chúng ta sẽ sử được phép sử dụng bình thường như những câu lệnh điều kiện trong các ngôn ngữ lập trình khác. Mình sẽ lấy ví dụ để các bạn hiểu ngay đây.
 ```CSS
    // trong file main.scss mình có đoạn code như này
 $contrast: high;
 
 body {
         font-family: $text-font;
         font-size: em(18px);
         @if $contrast == high {
                 color: #000;
         } @else if $contrast == low {
                 color: #999;
         } @else {
                 color: red;
         }
 }
 ```
 
 ## 2.7 Loops
 Nếu như trong file .scss chúng ta giả dụ mà định nghĩa nhiều class như thế này 
 ```CSS
 .col-1 {
         width: 2em;
 }
 
  .col-2 {
         width: 4em;
 }
 
  .col-3 {
         width: 6em;
 }
 
  .col-4 {
         width: 8em;
 }
 
  .col-5 {
         width: 10em;
 }
 
  .col-6 {
         width: 12em;
 }
 
  .col-7 {
         width: 14em;
 }
 ```
 
 thì thay vì chúng ta phải code quá nhiều như trên ta chỉ cần viết với cú pháp vòng lặp trong Scss
 ```CSS
 @for $i from 1 through 7 {
         .col-#{$i} {
                 width: $i * 2em;
         }
 }
 ```
 
 Tiếp theo đó chính là vòng lặp `@each` 
 ```CSS
 $speackers: bob-banker, partty-plume, sandra-smith;
 @each $speacker in $speakers {
         .#{$speaker}-profile {
                 background-image: url('/img/#{$speaker}.png');
         }
 }
 ```
 
 Kết quả khi render sẽ được như sau
 ```CSS
 .bob-baker-profile {
         background-image: url("/img/bob-banker.png");
 }
 
  .patty-plume-profile {
         background-image: url("/img/patty-plume.png");
 }
 
  .sandra-smith-profile {
         background-image: url("/img/sandra-smith.png");
 }
 ```
 
 Và cuối cùng đó chính là vòng lặp `@while`
 ```CSS
 $j: 2;
 @while $j <= 8 {
         .picture-#{$j} {
                 wdth: $i * 10%;
         }
         $j: $j +2;
 }
 ```
 
 Chúng ta sẽ được đoạn mã sau khi render ra như sau 
 ```CSS
 .picture-2 {
         witdh: 20%;
 }
 
  .picture-4 {
         witdh: 40%;
 }
 
  .picture-6 {
         witdh: 6%;
 }
 
  .picture-8 {
         witdh: 80%;
 }
 ```
 # 3. Kết luận
 Vậy qua vài kiến thức mình chia sẻ ở trên mong rằng các bạn sẽ hiểu được phần nào về Sass và Scss. Mong rằng các bạn sẽ áp dụng được nó khi viết CSS để cho code nó ngắn hơn, clear hơn. Cảm ơn các bạn đã đọc bài cviết chia sẻ của mình
 
 # 4. Tài liệu tham khảo
 https://sass-lang.com/guide