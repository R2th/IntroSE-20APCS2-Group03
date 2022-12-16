## Một số vấn đề cơ bản với css

Chào các bạn, hôm nay mình sẽ đến với một số vấn đề cơ bản của css, js mà nhiều khi nó sẽ gây ra bug với dev như mình...

### Height Columns

Vấn đề đầu tiên mình xin nói tới Height columns.

Khi bạn làm việc với thẻ `div` mà có chia cột chúng ta thường xuyên gặp trường hợp height của các thẻ div không cân đối dẫn tới vỡ layout hoặc khó nhìn theo như ![Hình 1](https://images.viblo.asia/70dedea0-b1ed-4633-b009-6e9e2cadc350.png) với đoạn code:

```
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.col-container {
    display: table;
    width: 100%;
}
.col {
    padding: 16px;
    float: left;
}
</style>
</head>
<body>
<div class="col-container">
  <div class="col" style="background:orange">
    <h2>Column 1</h2>
    <p>Hello World</p>
  </div>

  <div class="col" style="background:yellow">
    <h2>Column 2</h2>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
    <p>Hello World!</p>
  </div>

  <div class="col" style="background:orange">
    <h2>Column 3</h2>
    <p>Some other text..</p>
    <p>Some other text..</p>
  </div>
</div>

</body>
</html>

```

Để đạt được kết quả mong muốn là 3 column đều có height bằng nhau bạn cần chỉnh css thành:

```
<style>
.col-container {
    display: table; /* tạo container giống như 1 table.*/
    width: 100%; 
}
.col {
    display: table-cell; tạo các element trong container đều là một cột hàng của bảng.
    padding: 16px;
}
</style> 
``` 

Và tất nhiên không thể thiếu css response. Vì với màn hình to chúng ta có thể chia thành nhiều cột rất đẹp, vậy với màn hình nhỏ thì sao??

```
 @media only screen and (max-width: 600px) {
    .col { 
        display: block;
        width: 100%;
    }
}
```

Đoạn css trên sẽ giúp css của bạn chuyển thành hàng dọc thay vì ngay như hiện tại.

![Hình 2](https://images.viblo.asia/bb9538c1-ecf9-41a1-adde-a0c390faec6a.png).

### Sử dụng Clearfix.

Bạn đã gặp tình trạng như thế này?
![](https://images.viblo.asia/b4d3a7b0-b0f1-41ad-bfa8-3bf50ca35bcc.png) 

và đây là đoạn code sinh ra lỗi trên:

```
<head>
<style>
div {
    border: 3px solid #4CAF50;
    padding: 5px;
}

.img1 {
    float: right;
}

</style>
</head>
<body>
<div>
<img class="img1" src="pineapple.jpg" alt="Pineapple" width="170" height="170">
Hello world!</div>


</body>

```

Bạn nên sửa đoạn code của mình thành: 

```
<head>
<style>
div {
    border: 3px solid #4CAF50;
    padding: 5px;
}
.clearfix {
    overflow: auto;
}
.img1 {
    float: right;
}
</style>
</head>
<body>
<div class="clearfix">
<img class="img1" src="pineapple.jpg" alt="Pineapple" width="170" height="170">
Hello world!</div>
</body>
```
Nó sẽ giúp bạn giúp cho Image nằng trong boder.

![](https://images.viblo.asia/1ba6329d-0482-4bdb-be53-74f22e89d649.png)


### Tạo menu bottom

Bước 1: Tạo html 
```
<div class="navbar">
  <a href="#home" class="active">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
</div>
```

Bước 2: tùy chỉnh lại css:

```
/* Đặt menu ở cuối trang và cố định lại */
.navbar {
    background-color: #333;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
}

/* Tùy chỉnh lại css */

.navbar a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}
.navbar a:hover {
    background-color: #ddd;
    color: black;
}
.navbar a.active {
    background-color: #4CAF50;
    color: white;
}
```

#### Thêm responsive cho phù hợp với mọi màn hình:

Với menu thì khi bị màn hình bị thu nhỏ chúng ta sẽ thu gọn lại menu vì vậy cần thêm gía trị ở class `navbar` để phù hợp với mọi màn hình.

```
<a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="myFunction()">&#9776;</a>
```

```css

Thêm thuộc tính ẩn và hiện khi màn hình nhỏ.
#css
.navbar .icon {
    display: none;
}

@media screen and (max-width: 600px) {
  .navbar a:not(:first-child) {display: none;}
  .navbar a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .navbar.responsive a.icon {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .navbar.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
```

Add sự kiện js khi click để thêm class.
```js
/* Toggle between adding and removing the "responsive" class to the navbar when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}
```

### Kết luận

Bài viết này mình tham khảo tại https://www.w3schools.com một trang mà mình nghĩ nó là cơ bản nhất khi theo web dev. 
Cám ơn bạn đã theo dõi ạ.