![](https://images.viblo.asia/88635916-4c16-4aee-bf64-625560afb02b.jpg)

CSS chưa bao giờ là khó để học, nhưng để viết ít code CSS nhất mà vẫn có thể cover được nhiều tình huống layout xảy ra thì không hề dễ dàng chút nào.

Thuần thục được món này đòi hỏi người làm UI có 1 sự trải nghiệm thật nhiều, va chạm với nhiều kiểu layout, bị dự án, bị khách hàng ép cho các tình huống xử lý layout khó để rồi phải đi tìm tòi và thế là am hiểu nó hơn

Đây là 1 vài thủ thuật mà trong quá trình làm CSS mình gặp phải và học được cách giải quyết nó 1 cách đơn giản


### 1. Border-radius

Tạo 1 button rounded, 2 góc bo tròn như demo bên dưới, trường hợp button của mình có height là **40px** thì mình sẽ thiết lập CSS `border-radius` có giá trị bằng **height/2 => 20px** hoặc **height => 40px** thì sẽ đúng.

{@codepen: https://codepen.io/tinhh/pen/deagPQ}

Tuy nhiên nếu tăng height của button lên thành **100px** chẳng hạn, thì lúc này giá trị **20px** hay **40px** đều không đúng.

Để đạt kết quả đúng, chúng ta phải sửa lại giá trị của `border-radius` theo công thức trên.

> Vậy câu hỏi đặt ra là:
>
> **Có cách nào để chỉ tăng height của button mà border-radius tự động bo tròn theo và luôn đúng với hầu hết các trường hợp không?**
> 
> Câu trả lời là **CÓ**
> 
> Cách của chúng ta là sẽ tăng giá trị của `border-radius` lên khoảng **999px** và nó sẽ luôn đúng với hầu hết trường hợp.
> 
{@codepen: https://codepen.io/tinhh/pen/deaEqB}

Để hiểu thêm về thủ thuật này, các bạn có thể đọc thêm trên [StackOverflow](https://stackoverflow.com/questions/29966499/border-radius-in-percentage-and-pixels-px-or-em)

### 2. Image background responsive

Có những trường hợp ta cần sử dụng hình ảnh ở `background-image` trong CSS, thay vì là `img` ở HTML. Thì thường đối mặt với 1 vấn đề là hình ảnh **không thể** hoặc **khó** responsive.

Với thẻ `img` thì chúng ta thường hay có thuộc tính CSS cho nó là:

```css
    max-width: 100%;
    height: auto;
```

Nghĩa là khi kích thước của hình ảnh lớn hơn thành phần bọc nó, thì cả `width` và `height` của hình sẽ tự động scale theo tỉ lệ tương ứng (1 cách tự động). Nó trông như vầy:

![](https://images.viblo.asia/704c30f9-e316-4453-8633-d1c3b77e56de.gif)

Nhưng nếu là hình trong `background-image` thì phải làm thế nào để scale tự động được như trên.

```html
<div class="image"></div>
```

```css
width: 500px;
max-width: 100%;
height: 350px;
background: url("http://via.placeholder.com/500x350") no-repeat 0 0;
background-size: contain;
```

Với đoạn code trên thì hình đã được scale, tuy nhiên nó vẫn chiếm 1 cái height cố định, không thể nào set height auto được

![](https://images.viblo.asia/9779429a-ab0b-4c3b-af4a-6d721ee6f518.gif)

> Vậy câu hỏi đặt ra là:
>
> **Có cách nào để cái height đó scale tự động không?**
> 
> Câu trả lời là **CÓ**
> 
```css
.image {
  width: 500px;
  max-width: 100%;
  height: 350px;
  background: url("http://via.placeholder.com/500x350") no-repeat 0 0;
  background-size: contain;
}

// Thêm đoạn code như thế này vào
// breakpoint là 500px tương ứng với width của image
@media (max-width: 500px) {
  .image {
    height: 0;
    /* (heightImage/widthImage)*100% */
    padding-bottom: 70%; 
  }
}
```

([Xem source code](https://codepen.io/tinhh/pen/RyvzyV))

![](https://images.viblo.asia/45ba6e21-3e93-4f50-b137-ed32300f8c70.gif)

Để lý giải chi tiết cho trick ở trên, các bạn có thể đọc thêm [tại đây](http://alistapart.com/article/creating-intrinsic-ratios-for-video)

1 ví dụ khác sử dụng trick này là ở Bootstrap phần embed video có responsive, họ cũng dựa trên cơ chế này để làm responsive cho video

* [Bootstrap 3](http://getbootstrap.com/docs/3.3/components/#responsive-embed)
* [Bootstrap 4](https://getbootstrap.com/docs/4.0/utilities/embed/)

### 3. Selector :not()

Xử lý 1 layout navigation, giữa các item có 1 border ngăn cách, các bạn thường hay làm theo cách này:

```css
.nav-item {
  border-right: 1px solid black;
}
.nav-item:last-child {
  border-right: 0;
}
```

Chúng ta có 1 mẹo để giảm số lượng dòng code mà vẫn có đc UI như trên, đó là sử dụng selector `:not(:last-child)`

```css
.nav-item:not(:last-child) {
  border-right: 1px solid black;
}
```

# Tổng kết

Còn nhiều thủ thuật mà mình chưa thể chia sẻ hết trong bài viết này, có lẽ nên tách sang làm phần 2 (đôi khi thành series về thủ thuật CSS cũng nên) và giải thích nhiều hơn, kỹ hơn với từng loại thủ thuật để anh em dev FE cùng hiểu **behind the scene** của nó.


***P/s: Cái tiêu đề là để câu view, các anh em dev (đặc biệt là Frontend) mà biết hết các thủ thuật trên rồi thì đừng có chém em nhé! :)***