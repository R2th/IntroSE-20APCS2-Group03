## 1. Giới thiệu
Css với chúng ta dường như là bài lọt lòng ắt hẳn ai cũng đã từng sử dụng nó thì về cơ bản chúng ta cũng không còn quá xa lạ, nhưng nếu mà ai đã làm việc lâu với css thì có bao giờ bạn cảm thấy nhàm chán với cách viết truyển thống này không, có cách nào để bố cục lại cho chuyên nghiệp dễ hiểu mà quản lý dễ hơn không hay có thể bạn đã chán ngán nhiều thao tác lặp đi lặp lại rất nhạt nhẽo, và bạn mong muốn có một cái gì đó hỗ trợ bạn làm việc với CSS chuyên nghiệp hơn. Thì trong bài ngày hôm nay chúng ta sẽ đi tìm hiểu nhé !  Nếu như bạn muốn đưa kiến thức CSS của mình lên một tầm cao mới, làm việc chuyên nghiệp thì công cụ đầu tiên bạn cần sử dụng là SASS/SCSS - CSS Preprocessor.
<br>
![](https://images.viblo.asia/398ed224-7fc7-454e-a50b-ca787a4f9e0f.png)
<br>
## 2. CSS Preprocessor là gì?
**CSS Preprocessors** được hiểu là ngôn ngữ tiền xử lý CSS. Nó có nhiệm vụ logic hóa mã CSS sao cho gần giống với ngôn ngữ lập trình. Việc viết CSS Preprocessors mang lại một số lợi ích sau:

* Tiết kiệm thời gian viết CSS.
* Dễ dàng bảo trì và phát triển. 
* Có tính linh hoạt và tái sử dụng cao. 
* Các tập tin, đoạn mã CSS được tổ chức, sắp xếp một cách rõ ràng. 

Có khá nhiều CSS Preprocessor như [SASS](http://sass-lang.com/), [LESS](http://lesscss.org/ ), [CSS-Crush](http://the-echoplex.net/csscrush/ ), ... tuy nhiên CSS Preprocessor được sử dụng phổ biến nhất là SASS, sau đây là thông số tổng hợp từ năm 2015:
![](https://images.viblo.asia/fe705f5f-73b2-4a53-a8f6-66703f92e533.JPG)

Vậy cùng nhau tìm hiểu xem SASS là gì nào.
<br>
## 3. SASS là gì?
**SASS** (Syntactically Awesome StyleSheets)  là một CSS Prepocessor giúp bạn viết CSS nhanh hơn và có cấu trúc rõ ràng hơn. Với SASS, bạn có thể sử dụng biến (variables), quy tắc xếp chồng (nested rules), mixins, thừa kế (selector inheritance), hàm (functions), ...
Hiểu đơn giản là mình làm style bằng SASS, rồi SASS sẽ render thành file CSS
<br>
<br>
**SASS** bản thân có hai kiểu viết khác nhau, một kiểu như là HAML, Pug - Sử dụng indent để phân tách các khối code , sử dụng xuống dòng để phân biệt rules , có phần mở rộng là `.sass` .
* Sử dụng indent để thể hiện quy tắc xếp chồng (nested rules)
* Không cần sử dụng ; khi kết thúc một property
* Khai báo mixins bằng ký tự =
* Sử dụng mixins bằng ký tự +

```sass
.abc
  .def
    display: block
```
Một kiểu viết khác, ra đời sau là **SCSS**, cú pháp tương tự như CSS, có phần mở rộng là `.scss`
* Sử dụng dấu { và } để thể hiện quy tắc xếp chồng (nested rules)
* Sử dụng ; để kết thúc một property
* Khai báo mixins bằng directive @mixin
* Sử dụng mixins bằng directive @include

```scss
.abc {
  .def {
     display: block;
  }
}
```
## 4. Một số tính năng cơ bản của SASS

### **Sử dụng biến (Variables)**
<br>
Chẳng hạn trong một trang web, có rất nhiều chỗ có chung một màu, nhưng việc nhớ mã màu là điều tương đối khó. SASS cho bạn giải pháp đó là đặt tên biến cho màu đó, chỉ cần nhớ tên biến là bạn đã có thể sử dụng màu đó rồi

```scss
$mau-do: #ff0000;
$kich-thuoc: 100px;
.hinh-vuong {
    width: $kich-thuoc;
    height: $kich-thuoc;
    background-color: $mau-do;
}
```

### Quy tắc xếp chồng (Nested Rules)

```scss
.foo{
    .bar {
        color: black;
    }
    .bar1 {
        color: white;
    }
}
```
Ở đây thay vì phải viết lại `.foo` nhiều lần, bạn chỉ cần đặt `.bar` và `.bar1` trong cùng bên trong `.foo` thôi
<br>
<br>
### Mixin
<br>
Nếu như có nhiều class sử dụng lại có style giống nhau nhưng khác value, bạn có thể sử dụng @mixin để khai báo và sử dụng @include để tái sử dụng

```scss
$mau-do: #ff0000;
$kich-thuoc: 100px;

@mixin dong-1($color, $text) {
    color: $color;
    text-align: $text;
}

.hinh-vuong {
    width: $kich-thuoc;
    height: $kich-thuoc;
    box-shadow: 1px 1px 1px 1px $mau-do;
    .mau-chu {
        size: 14px;
        text-align: center;
        .dong-1 {
            @include dong-1($mau-do, left);
        }
    }
}
```

### Sử dụng "&"

```scss
.foo {
  &_bar {
      property: "value .bar";
  }

  &_boop {
      property: "value .boop";
  }

  &.boo {
      property: "value .foo.boo";
  }
}
```

sẽ compile như sau:
```css
.foo_bar {
  property: "value .bar";
}
.foo_boop {
  property: "value .boop";
}
.foo.boo {
  property: "value .foo.boo";
}
```

Sử dụng với các pseudo class và pseudo element rất tiện dụng
```scss
h1 {
 	text-align: center;
 	color: black;
 	&:hover {
 		color: #FF00F0;
 	}
 }
```

### Extends – Kế thừa
Nói đến kế thừa thì chắc hẳn ae lại nghĩ ngay tới OOP phải không nào thì liệu kế thừa ở đây nó có giống trong OOP không nhé ! Cách thực hiện sẽ là bạn định nghĩa ra 1 class, rồi những tag nào cần sử dụng thì @extend nó vào là được rồi (y)

```scss
.title-box {
    color: #dacb46;
    text-shadow: 1px 1px 1px #1a1a1a;
    display: inline-block;
    text-transform: uppercase;
}

.navbar {
    ul.menu {
        list-style: none;

        li {
            padding: 5px;

            a {
                text-decoration: none;
                @extend .title-box;
            }
        }
    }
}
```

## Kết luận
<br>
Trên đây là một số tính năng cơ bản của SASS, hi vọng các bạn sẽ hiểu được sự tiện lợi do nó mang lại.
<br>
Về cách sử dụng SASS và cũng như đọc thêm tài liệu về SASS các bạn có thể tìm kiếm thêm trên mạng hoặc vào trang chủ của SASS để nghiên cứu nhé!
<br>
<br>
Tài liệu tham khảo:
https://sass-lang.com/guide