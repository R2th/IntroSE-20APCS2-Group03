# Sử dụng SASS/SCSS code CSS
## SASS là gì?
SASS (Syntactically Awesome StyleSheets) là một CSS Preprocessor giúp bạn viết CSS nhanh hơn và có cấu trúc rõ ràng hơn. Với SASS, bạn có thể viết CSS theo thứ tự rõ ràng, quản lý các biến đã được định nghĩa sẵn, các class dùng chung hay có thể tự động nén tập tin CSS lại để bạn tiết kiệm dung lượng


## Quy tắc xếp chồng (Nested Rule)
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
Nếu bạn tiếp tục muốn CSS cho thẻ li trong thẻ ul (có class là menu) thì

```css
.navbar ul.menu li {
    padding: 5px;
}
```
Rồi bạn lại tiếp tục muốn CSS cho thẻ a trong thẻ li... thì cứ phải viết lặp đi lặp lại tên tag (hoặc class, hoặc id) cha của thẻ muốn css thì rất cực phải không nào ?

Nested Rule của SASS sinh ra để giúp bạn làm điều trên một cách đơn giản hơn.

Cú pháp viết như sau:

```css
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
Thực tế quy tắc xếp chồng được sử dụng rất nhiều khi vào 1 project có viết css bằng SASS

## Biến (Variable)
Biến chứa các giá trị mà bạn có thể sử dụng nhiều lần, ví dụ mã màu, font hay kiểu chữ....

Để khai báo một biến trong SASS, chúng ta sẽ viết dấu $ cùng với tên biến (rất quen thuộc với các dev PHP =)) ).

Ví dụ:

```css
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
## Quy tắc Mixin
Với biến bạn chỉ có thể lưu 1 giá vào biến đó ? Giả sử ngoài thuộc tính color cho thẻ a, sau này mình muốn thêm font-size nữa thì sẽ ntn ? Bạn đang nghĩ đến việc viết thêm 1 biến $fontSize nữa phải ko ? Nghe được đấy, nhưng giả sử bạn có CSS cả color, cả fontSize cho nhiều thẻ a, hay p, hay h1 khác nhau thì cứ phải viết đi viết lại tên biến. Thử xem Mixin dưới xem có khác gì không nhé

Mixin là một cơ chế khá phổ biến trong SASS. Công dụng của nó là mang nhiều thuộc tính mà bạn đã quy ước trong một mix nào đó rồi @include vào một thành phần bất kỳ mà không cần phải viết lại các thuộc tính đó (Ví dụ ở trên là color vs font-size)

```css
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

```css
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

## Extends – Kế thừa
Bạn định nghĩa ra 1 class, rồi những tag nào cần sử dụng thì @extend nó vào là được.
```css
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