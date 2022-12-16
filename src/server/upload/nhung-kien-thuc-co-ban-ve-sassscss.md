Xin chào tất cả các bạn, bài viết này mình xin trình bày một chút kiến thức kiến thức cơ bản về SCSS mà mình học được, rất mong được sự theo dõi của mọi người.
### 1) SASS/SCSS là gì?
Chắc hẳn khi bạn bắt đầu làm quen với web thì không còn xa lạ gì với html, css vậy SASS là gì?

- SASS là một CSS Prepocessor - giúp cho việc viết code CSS nhanh hơn và cấu trúc rõ ràng hơn, quản lý các biến đã định nghĩa sẵn.
- SCSS thực chất cũng giống với SASS chỉ là khác nhau một chút về cú pháp như một bên sử dụng dấu ngoặc (SCSS) một bên thì không (SASS), dấu chấm phải ở cuối ...

Ví dụ SASS
```scss
    $font-stack: Helvetica, sans-serif
    $primary-color: #333
    
    body
        font: 100% $font-stack
        color: $primary-color
```

Ví dụ SCSS
```scss
    $font-stack: Helvetica, sans-serif;
    $primary-color: #333;
    
    body {
        font: 100% $font-stack
        color: $primary-color
    }
```

Trong bài này thì mình sẽ sử dụng cú pháp của SCSS để trình bày.

### 2) Tại sao nên sử dụng SCSS?
- Viết CSS sẽ nhanh hơn
- Tiết kiệm thời gian, giảm việc lặp code
- Dễ bảo trì và phát triển
- Tái sử dụng dễ dàng

### 3) Cài đặt môi trường

- Phần đuôi mở rộng: *.scss.
- Cài đặt SCSS thông qua lệnh (Linux):
> npm install -g sass
> 
- Để biên dịch code SCSS sang CSS thì ta truy cập vào thư mục chứa file SCSS sau đó chạy lệnh:
> sass --watch input.scss output.css
> 

Ví du:
![](https://images.viblo.asia/8d2dcf3e-2e5c-445e-8040-ce35addfe544.png)

Trên là hình ảnh minh họa khi mình viết SCSS sau đó biên dịch qua CSS, từ hình ảnh trên ta thấy viết SCSS sẽ ngắn gọn hơn nhiều so với viết CSS


### 3) Các cú pháp cơ bản về SCSS

**3.1) Nested Rules trong Scss**

Như chúng ta đã biết thì để truy vấn các đối tượng HTML trong CSS ta sử dụng cú pháp selector. Nhưng khi trong một trang HTML mà có nhiều phân cấp cha con thì việc truy cập đến một đối tượng HTML thực sự rất rối, vì vậy SCSS cung cấp cho chúng ta một cách để truy cập dễ dàng hơn đó là Nested Rule

- Ví dụ

HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Nested Rules</title>
    <!-- Latest compiled and minified CSS & JS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="child">
            <a href="#">Quay lai</a>
            <p>Mo ta</p>
            <p class="content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </p>
        </div>
    </div>

    <script src="//code.jquery.com/jquery.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</body>
</html>
```

CSS

Giả sử mình muốn định dạng style cho thẻ a và thể p trong đoạn HTML trên 
```css
    div.container div.child a {
        color: gray;
        font-size: 32px;
        font-weight: 700;
    }

    div.container p {
        color: green;
        font-size: 18px;
        border: 1px solid gray;
    }
```

Giờ chúng ta thử sử dụng nested rules của SCSS nó sẽ như sau

SCSS

```scss
    // Nested Rules - SCSS
    div.container {
        div.child {
            a {
                color: gray;
                font-size: 32px;
                font-weight: 700;
            }
        }

        p {
            color: green;
            font-size: 18px;
            border: 1px solid gray;
        }
    }
```

file CSS sau khi biên dịch SCSS

```css
    div.container div.child a {
      color: gray;
      font-size: 32px;
      font-weight: 700;
    }
    div.container p {
      color: green;
      font-size: 18px;
      border: 1px solid gray;
    }
```

- Nhìn vào ví dụ ở trên chắc các bạn cũng hiểu phần nào về nested rules. Khi sử dụng nested rules của SCSS thì chúng ta viết sẽ trở nên ngắn gọn hơn nhìn cũng gần như cấu trúc phân cấp của HTML mà khi biên dịch ra CSS để sử dụng thì kết quả hoàn toàn như nhau so với khi chúng ta viết CSS thông thường.

- Ngoài ra ta còn có Nested Properties: Dành cho thuộc tính Css có cùng tiền tố. Ví dụ như: font-family, font-size, font-weight, ...

Ví dụ:
- Ở trên mình có một class="content" giờ mình sẽ viết style cho nó áp dụng phân cấp thuộc tính cụ thể

```css
div.container {
    div.child {
        a {
            color: gray;
            font-size: 32px;
            font-weight: 700;
        }
    }

    p {
        color: green;
        font-size: 18px;
        border-bottom: 1px solid gray;
    }

    p.content {
        margin: 20px;
        padding: 20px;
        // border-top: solid 3px red;
        // border-right: solid 3px blue;
        // border-left: solid 3px green;
        // border-bottom: solid 3px pink;
        
        // thay vì viết như ở trên mình comment thì chúng ta viết như sau kết quả khi biên dịch CSS sẽ như khi viết CSS bình thường
        border: {
            top: solid 3px red;
            left: solid 3px blue;
            right: solid 3px green;
            bottom: solid 3px pink;
        }
    }
}
```

CSS
File CSS đã được biên dịch
```css
div.container div.child a {
  color: gray;
  font-size: 32px;
  font-weight: 700;
}
div.container p {
  color: green;
  font-size: 18px;
  border-bottom: 1px solid gray;
}
div.container p.content {
  margin: 20px;
  padding: 20px;
  border-top: solid 3px red;
  border-left: solid 3px blue;
  border-right: solid 3px green;
  border-bottom: solid 3px pink;
}

/*# sourceMappingURL=style.css.map */

```

**3.2) Referencing Parent trong Scss**
- Giúp tham chiếu đến phần tử cha
- Cú pháp: &

Ví dụ

HTML

```html
<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Title Page</title>

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <div class="container">
            <button>Dang Nhap</button>
        </div>

        <!-- jQuery -->
        <script src="//code.jquery.com/jquery.js"></script>
        <!-- Bootstrap JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
         <script src="Hello World"></script>
    </body>
</html>
```

SCSS

```scss
div.container {
    button {
        background-color: red;
        color: white;
        border: none;
        font-weight: 700;
        border-radius: 2px;
        padding: 10px 20px;
        margin: 20px;

        // Thao tac voi button
        // &:hover; <=> button:hover
        
        &:hover, &:active, &:focus{
            background-color: gray;
        }
    }

    &__title {
        color: green;
        border: solid 1px gray;
        padding: 20px;
    }

    #content {
        width: 150px;
        height: 150px;
        margin: 10px;
        background-color: pink;
        font-weight: 700;
        &__left {
            width: 50px;
            height: 50px;
            background-color: black;
            color: white;
        }

    }
}
```

CSS

File CSS sau khi biên dịch

```css
div.container button {
  background-color: red;
  color: white;
  border: none;
  font-weight: 700;
  border-radius: 2px;
  padding: 10px 20px;
  margin: 20px;
}
div.container button:hover, div.container button:active, div.container button:focus {
  background-color: gray;
}
div.container__title {
  color: green;
  border: solid 1px gray;
  padding: 20px;
}
div.container #content {
  width: 150px;
  height: 150px;
  margin: 10px;
  background-color: pink;
  font-weight: 700;
}
div.container #content__left {
  width: 50px;
  height: 50px;
  background-color: black;
  color: white;
}

/*# sourceMappingURL=style.css.map */

```

- Nhìn vào ví dụ trên ta thấy dấu "&" sẽ tương đương với thằng cha gần nhất đó là thẻ, ví dụ như dấu "&" <=> với thẻ button.

**3.3) Comment trong Scss**
- Để comment các đoạn mã lệnh hoặc ghi chú t sử dụng cứ pháp sau:
> Single Line: // - Ghi chú trên 1 dòng
> 
> Multi Line:  /* Ghi chú trên nhiều dòng */
> 
- Lưu ý: Chỉ multi line mới được biên dịch và hiển thị tại Scss

**3.4) Variables trong Scss**

-Giả sử khi bạn có một giá trị thuộc tính nào đó muốn sử dụng nhiều lần mà khi sử thì chỉ muốn sửa tại một chỗ chắc hẳn bạn sữ nghĩ ngay đến việc khai báo biến để việc sử dụng dễ dàng hơn và trong Scss có hỗ trợ cho chúng ta khai bao biến.
- Khai báo biến trong Scss ta sử dụng cú pháp sau:

> $name: value
> 

Ví dụ

HTML

```html
<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Title Page</title>

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="panel panel-danger">
                        <div class="panel-heading">
                            <h3 class="panel-title">Variables</h3>
                        </div>
                        <div class="panel-body">
                            <h3>Variables</h3>
                            <p class="content">
                                Lorem ipsum dolor sit amet.
                                <br>
                                <a href="#">
                                    Go to HomePage
                                </a>
                            </p>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- jQuery -->
        <script src="//code.jquery.com/jquery.js"></script>
        <!-- Bootstrap JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
         <script src="Hello World"></script>
    </body>
</html>
```

SCSS

```scss
//Khai báo biến trong Scss
$primary_color: #7b1fa2;
$text_large_size: 30px;
$white_color: yellow;

h3 {
    color: $primary_color;
}

p.content {
    background-color: $primary_color;
    padding: 20px;
    color: white;
    a {
        font: {
            size: $text-large-size;
        }
        color: $white_color;
    }
}

span {
    border: 1px solid $primary_color;
    color: $white_color;
}
```

CSS

```css
h3 {
  color: #7b1fa2;
}

p.content {
  background-color: #7b1fa2;
  padding: 20px;
  color: white;
}
p.content a {
  font-size: 30px;
  color: yellow;
}

span {
  border: 1px solid #7b1fa2;
  color: yellow;
}

/*# sourceMappingURL=style.css.map */

```

**3.5) DataType và Operators trong Scss**

Trong Scss có hỗ trợ cho chúng ta kiểu dữ liệu và toán tử:
- Các kiểu dữ liệu trong Scss

    - number: 10px, 15em, 1.2, 15 ...
    - string:  "value", 'value'
    - color: red, #7b1fa2, rgb(255,0,0,1)
    - boolean: true, false
    - nulls
    - lists
    - maps: (key: value)

- Các toán tử: +, -, *,  /, %, ==, !=, <, >, <=, > ...

Ví dụ:

SCSS

```scss
$primary_color: red;
$size: 30;
$text_size: $size * 1px;
$text_size_string: $size + px;

h1 {
    color: $primary_color;
}

p {
    font: {
        size: $text_size;
    }
}
```

**3.6) Interpolation trong Scss**

- Lấy giá trị các biến lưu trữ
- Áp dụng Selectors và tên thuộc tính css
- Cú pháp:
> #{tên_biến}

Ví dụ:

SCSS

```scss
$name: content;
$attr_bg: background;

div.#{$name} {
    #{$attr_bg}-color: red;
}
```

CSS

```css
div.content {
  background-color: red;
}

/*# sourceMappingURL=style-1.css.map */

```

**3.7) Quy tắc Mixin**

- Mixin là được sử dụng tương đối phỏ biến khi bạn sử dụng SCSS, nó sẽ mang nhiều thuộc tính mà mình đã định nghĩa trong một mix nào đó bỏ vào một thành phần nào đó mà không phải viết lại các thuộc tính đó.
- Cú pháp khai báo:
```css
// không có tham số
@mixin mixin_name
{
    // SASS selectors or CSS
}
// có tham số
@mixin mixin_name (params)
{
    // SASS selectors or CSS
}
```

- Cú pháp sử dụng:

```css
@include mixin_name;
```

Ví dụ:

SCSS

```scss
@mixin fontDefault {
    font-size: 32px;
    font-weight: 700;
}

div.container {
    div.child {
        a {
            color: gray;
            @include fontDefault;
        }
    }

    p {
        color: green;
        @include fontDefault;
        border-bottom: 1px solid gray;
    }
}
```

CSS

```css
div.container div.child a {
  color: gray;
  font-size: 32px;
  font-weight: 700;
}
div.container p {
  color: green;
  font-size: 32px;
  font-weight: 700;
  border-bottom: 1px solid gray;
}

/*# sourceMappingURL=style-1.css.map */

```

Ngoài ra khi bạn muốn trong mixin có thể bổ sung CSS cho nó sau khi khai báo thì ta sử dụng @content đặt trong vị trí muốn bổ sung.

Ví dụ

SCSS

```scss
@mixin fontDefault {
    font-size: 32px;
    font-weight: 700;
    @content
}

div.container {
    div.child {
        a {
            color: gray;
            @include fontDefault {
                background-color: gray;
            }
        }
    }

    p {
        color: green;
        @include fontDefault;
        border-bottom: 1px solid gray;
    }
}
```

CSS

```css
div.container div.child a {
  color: gray;
  font-size: 32px;
  font-weight: 700;
  background-color: gray;
}
div.container p {
  color: green;
  font-size: 32px;
  font-weight: 700;
  border-bottom: 1px solid gray;
}

/*# sourceMappingURL=style-1.css.map */

```

**3.8) Kế thừa extend trong Scss**

- Extend trong Scss được dùng trong trường hợp bạn muốn một selector sử dụng lại những thuộc tính của selector khác

Ví dụ: 

SCSS

```scss
.message{
    border: solid 1px;
    text-align: center;
    font-size: 16px;
    padding: 20px 10px;
}
 
.error{
    @extend .message;
    background: red;
}
 
.success{
    @extend .message;
    background: blue;
}
 
.warning{
    @extend .message;
    background: yellow;
}
```

CSS

```css
.message, .error, .success, .warning {
    border: solid 1px;
    text-align: center;
    font-size: 16px;
    padding: 20px 10px; 
}
 
.error {
    background: red; 
}
 
.success {
    background: blue; 
}
 
.warning {
    background: yellow; 
}
```

Ta thấy ở ví dụ trên khi các class: .success, .erorr, .warning kế thừa class: .message lúc này ra ta thấy chúng có một cách hiển thị chỉ khác nhau về màu nền.

### Kết luận

Trên đây là một chút kiến thức mà mình tìm hiểu được về SASS/SCSS, rất mong được sự góp ý của mọi người. Cảm ơn mọi người đã theo dõi bài viết của mình.

**Nguồn tham khảo**

- http://sass-lang.com/
- https://freetuts.net/