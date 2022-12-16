Làm việc với CSS là việc thường xuyên của mọi thể loại dev :v. Có khi nào bạn thấy chán cách viết CSS 'chay' mà bạn vẫn đang viết thường ngày? Có cách nào để viết CSS một cách chuyên nghiệp hơn không ? Có đấy, cùng tìm hiểu trong bài viết này nhé.

![](https://images.viblo.asia/8b3ad4fc-abea-4475-bfa3-1566156db7ec.png)

# CSS Preprocessor là gì?
CSS Preprocessors là ngôn ngữ tiền xử lý CSS. Nó có công dụng sẽ giúp bạn viết một cú pháp CSS gần nhau với một ngôn ngữ lập trình rồi compile nó ra CSS thuần.

Có rất nhiều CSS Preprocessor như SASS, LESS, Stylus.... Tuy nhiên trong khuôn khổ bài viết này, mình sẽ giới thiệu bạn về SASS.

Nếu bạn đã biết đến Typescript - javascript Preprocessor thì công dụng của SASS cũng như Typescript vậy đó.

Cùng tìm hiểu xem nó như thế nào nhé.

# SASS là gì?

SASS (Syntactically Awesome StyleSheets) là một CSS Preprocessor giúp bạn viết CSS nhanh hơn và có cấu trúc rõ ràng hơn. Với SASS, bạn có thể viết CSS theo thứ tự rõ ràng, quản lý các biến đã được định nghĩa sẵn, các class dùng chung hay có thể tự động nén tập tin CSS lại để bạn tiết kiệm dung lượng.

![](https://images.viblo.asia/0cdd6149-526b-45ba-b6d7-2c3d02a94cd1.jpg)

# SCCS là gì?
SASS được thiết kế và viết bởi các lập trình viên Ruby. Bởi vậy, Sass stylesheets sử dụng cú pháp giống như Ruby với việc không có các dấu ngoặc nhọn {}, dấu chấm phẩy, việc viết CSS như vậy không 'gần' CSS thuần nên việc hiểu và đọc code SASS rất khó hiểu, kiểu như này:

```
.title 
     color= #fff;
     font-size= 50px;
```

Sass giống như vậy cho đến khi phiên bản 3.0 được phát hành vào tháng 5/2010, nó giới thiệu một cú pháp mới được gọi là SCSS (Sassy CSS). Cú pháp này nhằm thu hẹp khoảng cách giữa Sass và CSS bằng cách mang tới một cú pháp thân thiện với CSS.

Hiểu 1 cách đơn giản, SCSS là một bản nâng cấp của SASS giúp chúng ta viết CSS một cách dễ dàng và dễ hiểu hơn.

Ok, let's gooooooooooo !!!

# Quy tắc xếp chồng (Nested Rule)

Ví dụ mình có một đoạn HTML như sau
```html
 <div class="container">
    <div class="row">
        <div class="navbar col-12">
            <a class="brand">Viblo</a>
            <ul class="menu">
                <li><a href="#">Menu 1</a></li>
                <li><a href="#">Menu 2</a></li>
            </ul>
        </div>
    </div>
</div>
``` 

Giả sử bạn chỉ muốn CSS cho thẻ ul với class menu, với CSS thuần bạn viết
```css
.navbar ul.menu {
    list-style: none;
}
```

Nếu bạn tiếp tục muốn CSS cho thẻ li trong thẻ ul (có class là menu)  thì
```css
.navbar ul.menu li {
    padding: 5px;
}
```

Rồi bạn lại tiếp tục muốn CSS cho thẻ a trong thẻ li... thì cứ phải viết lặp đi lặp lại tên tag (hoặc class, hoặc id) cha của thẻ muốn css thì rất cực phải không nào ?

Nested Rule của SASS sinh ra để giúp bạn làm điều trên một cách đơn giản hơn.

Cú pháp viết như sau:

```sass
.navbar {
    ul.menu {
        list-style: none;

        li {
            padding: 5px;

            a {
                text-decoration: none;
            }
        }
    }
}
```

Và sau khi được đoạn SASS trên được compile ra CSS thuần sẽ như sau:
```css
.navbar ul.menu {
    list-style: none;
}
.navbar ul.menu li {
    padding: 5px;
}
.navbar ul.menu li a {
    text-decoration: none;
}
```

Thực tế quy tắc xếp chồng được sử dụng rất nhiều khi vào 1 project có viết css bằng SASS :))

# Biến (Variable)
Biến chứa các giá trị mà bạn có thể sử dụng nhiều lần, ví dụ mã màu, font hay kiểu chữ....

Để khai báo một biến trong SASS, chúng ta sẽ viết dấu $ cùng với tên biến (rất quen thuộc với các dev PHP =)) ).

Ví dụ:

```sass
$whiteColor = #fff;

.navbar {
    ul.menu {
        list-style: none;

        li {
            padding: 5px;

            a {
                text-decoration: none;
                color: $whitecolor
            }
        }
    }
}
```

Quá ez nhỉ ? :v: 

# Quy tắc Mixin
Với biến bạn chỉ có thể lưu 1 giá vào biến đó ? Giả sử ngoài thuộc tính color cho thẻ a, sau này mình muốn thêm font-size nữa thì sẽ ntn ? Bạn đang nghĩ đến việc viết thêm 1 biến $fontSize nữa phải ko ? Nghe được đấy, nhưng giả sử bạn có CSS cả color, cả fontSize cho nhiều thẻ a, hay p, hay h1 khác nhau thì cứ phải viết đi viết lại tên biến hử :( Thử xem Mixin dưới xem có khác gì không nhá :V

Mixin là một cơ chế khá phổ biến trong SASS. Công dụng của nó là mang nhiều thuộc tính mà bạn đã quy ước trong một mix nào đó rồi @include vào một thành phần bất kỳ mà không cần phải viết lại các thuộc tính đó (Ví dụ ở trên là color vs font-size)

```sass
@mixin colorVsFont {
    color: #fff;
    font-size: 50px;
}

.navbar {
    ul.menu {
        list-style: none;

        li {
            padding: 5px;

            a {
                text-decoration: none;
                @include colorVsFont;
            }
        }
    }
}
```

Hoặc nếu bạn k muốn color lúc nào cũng là #fff, thì bạn có thể truyền thuộc tính vào mix như 1 tham số bằng cách viết như sau

```sass
@mixin colorVsFont($color, $fontSize) {
    color: $color;
    font-size: $fontSize;
}

.navbar {
    ul.menu {
        list-style: none;

        li {
            padding: 5px;

            a {
                text-decoration: none;
                @include colorVsFont(#000, 50px);
            }
        }
    }
}
```

Như kiểu truyền params vào method ấy nhỉ =))

# Extends – Kế thừa
Nghe giống OOP hem ? Thực ra là giống đấy :)) Cách thực hiện sẽ là bạn định nghĩa ra 1 class, rồi những tag nào cần sử dụng thì @extend nó vào là được rồi (y)

```sass
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

# Import
Đây là một cú pháp của SASS mà mình muốn giới thiệu với bạn vì nó rất hữu dụng và thường xuyên sử dụng trong các project. Nó khá giống cách bạn require hay include file này vào file khác trong PHP.

Giả sử bạn có 1 trang index, bao gồm header, body, footer. Thay vì bạn CSS cho các phần trên vào 1 style.css thì với SASS bạn làm như sau:

1. Tạo 1 file **_header.scss** để CSS riêng cho header.

2. Tạo 1 file **_body.scss** để CSS riêng cho body.

3. Tạo 1 file **_footer.scss** để CSS riêng cho footer. 

     (nhớ có dấu _ trước tên file được import)

4. Rồi ở file style.css ta chỉ cần @import 3 file trên là ngon lành cành đào ngay :v: 

_header.scss
```sass
#header {
    // code sass here
}
```

_body.scss
```sass
#body {
    // code sass here
}
```

_footer.scss
```sass
#footer {
    // code sass here
}
```

style.scss
```sass
@import 'header';
@import 'body';
@import 'footer';

// code sass here
```

Khi bạn import sẽ không cần tên đuôi file (.scss) nhé, thêm nữa là nhớ lưu ý đường dẫn của file bạn import.

# Trình compile SASS
Có khá nhiều trình biên dịch SASS sang CSS thuần. Mình sẽ giới thiệu 2 công cụ mà mình đã sử dụng, ngoài ra bạn có thể tự search thêm nhé.

1. Koala
    - Đây là phần mềm dùng để compile CSS Preprocessor như SASS, LESS... mình khá thường dùng nó khi viết SASS.
    - Bạn có thể tải và cài đặt nó tại đây: http://koala-app.com/
    
   ![](https://images.viblo.asia/d00702f0-937b-4852-9e17-638648efac71.png)


2. Laravel Mix
    - Nếu bạn đang làm việc với project Laravel thì bạn chẳng cần đến phần mềm thứ 3 nữa vì Laravel đã tích hợp một công cụ gọi là Laravel Mix với rất nhiều tính năng, có thể compile các CSS Preprocessor sang CSS thuần là một trong những tính năng hay ho của nó.
    - Bạn có thể tìm hiểu nó tại đây: https://laravel.com/docs/5.7/mix

# Kết luận
Trên đây mình đã giới thiệu bạn 1 số cú pháp thường dùng để viết CSS bằng SASS/SCSS. Sẽ còn các cú pháp khác nữa mình chưa kịp giới thiệu trong bài viết này, nếu bạn có nhu cầu và muốn hiểu sâu về nó nữa thì có thể tìm hiểu thêm tại [đây](https://sass-lang.com/documentation/). Nhưng mình nghĩ nhiêu đây bạn cũng đủ chiến rồi đấy :))

Nếu bạn đã đọc bài này đến đây rồi thì mình khuyên chân thành là đừng viết CSS 'chay' nữa nhé (kể cả với dev Back-end), hãy viết SASS ngay và luôn. :vulcan_salute: 

Tham khảo: https://sass-lang.com/guide