# Lời mở đầu:
Khi làm một trang web, chắc chắn khách hàng sẽ muốn nhìn thấy "hình hài" của sản phẩm càng sớm càng tốt, vì vậy ta nên xây dựng các trang giao diện html trước để show cho khách hàng. Vì vậy, tiếp sau loạt bài lí thuyết [Những điều cần tìm hiểu khi bắt đầu làm project PHP (Laravel)](https://viblo.asia/s/nhung-dieu-can-tim-hieu-khi-bat-dau-lam-project-php-laravel-Wj53OmjP56m) mình sẽ chia sẻ về cách viết `css` cho một trang giao diện (ngoài ra còn có `javascript` và `jquery` nữa, nhiều lắm nhưng mà nói sau đi, css trước đã ^^)

Nếu chỉ là  viết css thì các bạn có thể dễ dàng tìm kiếm ở [w3school](https://www.w3schools.com/css/default.asp) hay [freetuts](https://freetuts.net/hoc-css/), thế nên mình sẽ chỉ nói về cái "không cơ bản" thôi. Đó là **CSS preprocessor**.
## CSS preprocessor là gì?
Theo như mình tìm hiểu được thì **CSS Preprocessors** là ngôn ngữ tiền xử lý CSS. Nó có nhiệm vụ logic hóa mã CSS sao cho gần giống với ngôn ngữ lập trình. Việc viết CSS Preprocessors mang lại một số lợi ích sau:
- Tiết kiệm thời gian viết CSS.
- Dễ dàng bảo trì và phát triển. 
- Có tính linh hoạt và tái sử dụng cao. 
- Các tập tin, đoạn mã CSS được tổ chức, sắp xếp một cách rõ ràng. 

Và vì nó là "ngôn ngữ" nên sẽ có rất nhiều lựa chọn cho bạn (hoặc là công ty chọn cho bạn :D)
- [SASS](http://sass-lang.com/)
- [LESS](http://lesscss.org/)
- [Stylus ](http://stylus-lang.com/)
- ...

Trong bài viết hôm nay, mình lựa chọn nói về **SASS** và **SCSS**. Vì sao ư? Đơn giản là vì ở chỗ mình làm mọi người sử dụng SASS thôi :D Giờ thì cùng đi tìm hiểu xem nó có gì hay mà lại trở nên phổ biến như vậy nhé.
## SASS syntax (Syntactically Awesome StyleSheets):
Cú pháp thụt lề của **SASS** kế thừa từ người anh cả [Haml](http://haml.info/) (được viết lên bởi những lập trình viên **Ruby**). Bởi vậy, cú pháp của SASS sẽ khá giống với Ruby khi không hề sử dụng những dấu ngoặc nhọn `{}`, dấu chấm phẩy `; `. 

Điều này sẽ khiến các bạn hay quên, thiếu đóng ngoặc hay `;` thích thú, nhưng tin tôi đi, code sẽ khá là khó đọc hiểu nếu như bạn là newbie. Và 1 điều nữa, nó là ngôn ngữ xử lý CSS nhưng cú pháp là khác xa với CSS. 

Tức là gần như bạn sẽ phải học thêm một ngôn ngữ mới để viết CSS mà bạn đã rất quen thuộc. Vậy cùng xem xem nó có gì đặc biệt, và có đáng để mình phải học thêm ngôn ngữ "mới toanh" này không. Một số tính năng đặc sắc có thể kể đến như:
- **Quy tắc xếp chồng (Nested Rules)**
- **Sử dụng biến (Varibles)**
- **Quy tắc Kế thừa**
- **Quy tắc Mixin**

--> Ngoài ra, bạn nên xem chi tiết [phần document của SASS](https://sass-lang.com/documentation/file.SASS_REFERENCE.html) để tìm hiểu cụ thể hơn!

`"Tính năng thì hay đấy, có vẻ giống giống với ngôn ngữ lập trình, nhưng mà cú pháp lạ quá"` 

Và nhà phát triển hiểu được điều đó, phiên bản thứ 3 của **SASS** (**Sassy CSS**) đã cải tiến cú pháp để thuận tiện cho người dùng hơn. Và chúng ta bắt đầu có **SCSS**.


## SCSS syntax (Sassy CSS):
Cú pháp của SCSS dựa trên cú pháp của CSS, bắt đầu sử dụng `{}` và `;` như CSS, không còn quá quan trọng việc thụt lề hay các khoảng trắng. 

Vì là bản cập nhật sau, nó tập hợp những thứ tốt nhất của đàn anh đi trước. Những gì có trong CSS thì cũng có trong SCSS. Và quan trọng hơn, SCSS cũng sở hữu những tính năng tuyệt vời của SASS.

Và hãy cũng xem những ví dụ sau để thấy những tính năng của **SASS** được dùng như thế nào trong **SCSS** nhé:
- Ví dụ một file CSS:
```
.hinh-vuong {
    width: 100px;
    height: 100px;
    background-color:  blue;
    box-shadow: 1px 1px 1px 1px #bf0000;
 }
 .hinh-vuong .mau-chu {
    size: 14px;
    text-align: center;
 }
 .hinh-vuong .mau-chu .dong-1 {
    color: #bf0000;
    text-align: left;
 }
```
### Quy tắc xếp chồng (Nested Rules)
 Với quy tắc này, thay vì viết lại `.hinh-vuong` nhiều lần, bạn chỉ việc đặt `.mau-chu` và `.dong-1` vào bên trong `.hinh-vuong` thôi.
```
.hinh-vuong {
    width: 100px;
    height: 100px;
    background-color: #b3b3b3;
    box-shadow: 1px 1px 1px 1px #bf0000;
    .mau-chu {
        size: 14px;
        text-align: center;
        .dong-1 {
            color: #bf0000;
            text-align: left;
        }
    }
}
```

Thấy giống giống code mình vẫn viết hàng ngày rồi chứ, vừa quen thuộc, vừa đỡ phải viết lại nhiều lần.

### Sử dụng biến (Varibles)
Trong một trang web, có rất nhiều chỗ bạn muốn dùng chung một màu, nhưng bạn không thể nhớ nổi mã màu `#xxxxxx`. Giải pháp cho bạn là hãy đặt tên biến cho giá trị đó và chỉ cần nhớ tên biến ấy để sử dụng thôi, không cần nhớ mã 6 kí tự kia đâu :D
```
$mau-nau-do: #bf0000;
$kich-thuoc: 100px;
.hinh-vuong {
    width: $kich-thuoc;
    height: $kich-thuoc;
    background-color: blue;
    box-shadow: 1px 1px 1px 1px $mau-nau-do;
    .mau-chu {
        size: 14px;
        text-align: center;
        .dong-1 {
            color: $mau-nau-do;
            text-align: left;
        }
    }
}
```
Bắt đầu thích rồi đúng không? Còn nhiều thứ hay ho lắm
### Quy tắc Mixin
Nếu như có nhiều class sử dụng lại có style giống nhau nhưng khác value, bạn có thể sử dụng @mixin (cái này là trong SCSS) để khai báo và sử dụng @include để tái sử dụng.
```
$mau-nau-do: #bf0000;
$kich-thuoc: 100px;

@mixin dong-1($color, $text) {
    color: $color;
    text-align: $text;
}

.hinh-vuong {
    width: $kich-thuoc;
    height: $kich-thuoc;
    background-color: blue;
    box-shadow: 1px 1px 1px 1px $mau-nau-do;
    .mau-chu {
        size: 14px;
        text-align: center;
        .dong-1 {
            @include dong-1($mau-nau-do, left);
        }
    }
}
```

### Quy tắc Kế thừa (nghe như OOP ấy nhỉ ^^)
Cũng gần như thế đấy, bạn chỉ cần khai báo trước một class và kế thừa bằng @extend thôi
```
.do-bong-chu {
    text-shadow: 1px 1px 1px;
}

.hinh-vuong {
    width: $kich-thuoc;
    height: $kich-thuoc;
    background-color: blue;
    box-shadow: 1px 1px 1px 1px $mau-nau-do;
    .mau-chu {
        size: 14px;
        text-align: center;
        .dong-1 {
            @include dong-1($mau-nau-do, left);
            @extend .do-bong-chu;
        }
    }
}
```

## So sánh cơ bản về cú pháp:

| | SASS| SCSS |
| -------- | -------- | -------- |
| Thể hiện quy tắc xếp chồng (Nested)    | Chỉ sử dụng thụt lề (intended)   | Sử dụng cặp dấu { }     |
| Kết thúc property     | Không dùng ";" (semi:colon)     | Dùng ";" để kết thúc property     |
| Khai báo mixins     | Sử dụng =     | Sử dụng @mixins     |
| Sử dụng mixins     | Sử dụng +     | Sử dụng @include     |

Để so sánh cụ thể sự khác nhau về cú pháp, bạn có thể xem trong trang [web](https://sass-lang.com/guide)!
# Kết:
Tạm thời mình nói qua về đặc điểm của SASS nói chung, trong phần tiếp theo của bài viết mình sẽ đi vào chi tiết ưu điểm riêng của SASS và SCSS để các bạn có thể đưa ra lựa chọn của mình: **SASS hay SCSS**!