Chúng ta sẽ cùng nhau tìm hiểu 3 kiểu hiển thị phần tử trong CSS đó là Block, Inline và Inline-block xem chúng có gì khác nhau nhé !

Trước khi vào bài viết thì giả sử chúng ta có đoạn mã HTML như sau:

```html
<html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->
      <link rel="stylesheet" href="main.css">
    </head>
    <body>
        <p>Đoạn văn <span class="inline">đầu tiên</span> trong trang</p>
        <p>Đoạn văn <span class="block">thứ 2</span> trong trang</p>
        <p>Đoạn văn <span class="inline-block">thứ 3</span> trong trang</p>
    </body>
</html>
```

Ta sẽ thêm một chút CSS cho các class trên nhé:

```css
span {
    border: 2px doted red;  
}
.inline {
    display: inline;
}
.block {
    display: block;
    width: 100px;
    height: 100px;
}
.inline-block {
    display: inline-block;
    width: 100px;
    height: 100px;
}
```

Khi đó trên giao diện ta sẽ thấy mọi thứ hiển thị thế này:

![](https://images.viblo.asia/47b04426-09d7-4b93-821c-3c04b987e5fb.png)
# 1, Inline

* Phần tử có thuộc tính display thuộc kiểu Inline sẽ nằm cùng dòng với các phần tử cạnh nó.
* Ta có thể coi phần tử Inline như là các từ thuộc một đoạn văn, khi còn chỗ trống thì nó nằm bên cạnh phần tử trước nó, khi hết chỗ trống thì nó "xuống dòng"
* Khoảng cách giữa phần tử Inline và các phần tử cạnh nó được để mặc định là khoảng cách giữa các từ của font-size
* Ta không thể định nghĩa các thuộc tính width, height, padding và margin theo chiều dọc (top, bottom) dành cho các phần tử Inline

Ta có thể thử thêm thuộc tính width và height vào đoạn CSS dành cho phần tử Inline:
```css
.inline {
    display: inline;
    width: 100px;
    height: 100px;
}
```

Và hãy thử xem kết quả:

![](https://images.viblo.asia/47b04426-09d7-4b93-821c-3c04b987e5fb.png)

Mọi thứ vẫn giữ nguyên như vậy.

# 2, Block
* Phần tử có thuộc tính display thuộc kiểu Block sẽ nằm trên một dòng riêng.
* Ta có thể coi phần tử Inline như là một đoạn văn riêng rẽ, tách biệt với các phần nằm trên và dưới nó
* Với phần tử thuộc kiểu Block, ta hoàn toàn có thể định nghĩa width và height cho nó (Mặc định giá trị là 100% so với phần tử cha).

Nếu như ta comment đi phần thuộc tính width và height ở trong ví dụ trên:
```css
.block {
    display: block;
    /*width: 100px;
    height: 100px;*/
}
```

Thì kết quả nhận được như sau:

![](https://images.viblo.asia/83757099-7171-414b-ad53-70ac0d786d98.png)

Rõ ràng là width và height có ảnh hưởng đến thuộc tính Block.

# 3, Inline-block
Nếu như bạn muốn hiển thị Element của mình theo kiểu Inline, nhưng lại muốn căn chỉnh được width, height, padding và margin theo chiều dọc thì đây là thứ bạn cần.

Inline-block là kiểu kết hợp giữa Inline và Block, nó vừa có thể hiển thị trên cùng dòng như Inline, lại có thể căn chỉnh được các giá trị như đã nêu ở trên giống như Block.

Cũng giống như ở phần Block, ta hãy thử comment đi thuộc tính width và height trong đoạn CSS của Inline-block xem:

```css
.block {
    display: inline-block;
    /*width: 100px;
    height: 100px;*/
}
```

Lần này mình sẽ không đăng hình kết quả để bạn thử trải nghiệm xem thế nào nhé !

### Thử tạo một navigation-bar với Inline-block
Với các đặc trưng của Inline-block, chúng ta hãy thử tạo một navigation-bar cùng với nó xem sao nhé. Ở đây mình sẽ chú trong vào đặc tính của Inline-block nên sẽ không làm quá đẹp đâu :v

```html
<body>
    <h1>My Inline-block Navigation Bar</h1>

    <ul class="nav">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About Us</a></li>
      <li><a href="#clients">Our Clients</a></li>  
      <li><a href="#contact">Contact Us</a></li>
    </ul>
</body>
```

```css
.nav {
    background-color: yellow; 
    list-style-type: none;
    text-align: center;
    margin: 0;
    padding: 0;
}

.nav li {
    display: inline-block;
    font-size: 20px;
    padding: 20px;
}
```

# 4, Tài liệu tham khảo
1. https://www.w3schools.com/html/html_blocks.asp
2. https://www.w3schools.com/css/css_inline-block.asp