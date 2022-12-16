Ở 1 bài trước đây về CSS mình đã giới thiệu về 1 số thuộc tính hay ho của CSS3, các bạn quan tâm thì có thể xem nó ở [đây](https://viblo.asia/p/mot-vai-tinh-nang-tuyet-voi-cua-css3-ma-co-the-ban-chua-biet-WAyK8xQEKxX). 

Hôm nay, mình xin mạn phép giới thiệu tiếp 1 số thuộc tính khá hay nữa của CSS mà chưa có dịp giới thiệu ở phần trước. Bài viết có thể hữu ích cho bạn hoặc không, nếu không thì vui lòng đừng ném đá mình nhé :D.

P/s: Nếu thấy hay thì nhớ cho mình 1 vote =))

*Lưu ý: Bài viết chống chỉ định cho pro Frontend Dev (bow)!*

## 1. Column
Thuộc tính `column` trong CSS dùng để chia một thành phần HTML trong trang web thành nhiều cột văn bản. Giống như các trang báo giấy mọi người thường hay đọc vậy. Thuộc tính này chỉ khả dụng với các thành phần HTML là block, nếu là inline thì cần phải set CSS cho nó là block.

> HTML code:
```
<p class="newspaper">
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta
nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.
</p>
```

> CSS code
```
.newspaper {
  padding: 15px;
  column-count: 3;
  column-gap: 40px;
  column-rule: 1px solid lightgrey;
}
```

Kết quả:
{@codepen: https://codepen.io/tranquocy/pen/aaoLVX}

## 2. Empty-cells
Khi ta sử dụng table để show dữ liệu thì sẽ có những ô sẽ không có nội dung, nhưng những ô này vẫn hiển thị viền và màu nền. Nếu bạn muồn ẩn những ô rỗng này đi thì thuộc tính `empty-cells` là thuộc tính dùng để thực hiện điều đó.

> HTML code
```
<table border="1">
  <tr>
    <td>Framgia</td>
    <td>Framgia</td>
  </tr>
  <tr>
    <td>Framgia</td>
    <td></td>
  </tr>
</table>
```

> CSS code
```
table {
  empty-cells: hide;
}
```

Kết quả:
{@codepen: https://codepen.io/tranquocy/pen/LJPzgY}

## 3. Counter-increment
Thuộc tính `counter-increment` dùng để tăng hoặc giảm giá trị của một hoặc nhiều CSS counter. Thuộc tính này thường được sử dụng thông qua `pseudo-elements` của CSS, kèm với thuộc tính `counter-reset` và thuộc tính `content`. Nói nôm na là nó sẽ tự động đánh số thứ tự cho các element được chọn trong văn bản HTML thông qua CSS.

> HTML viết
```
<p>HTML Tutorial</p>
<p>CSS Tutorial</p>
<p>JavaScript Tutorial</p>
<p>Bootstrap Tutorial</p>
<p>SQL Tutorial</p>
<p>PHP Tutorial</p>
```
> CSS viết
```
body {
  /* Set "my-sec-counter" to 0 */
  counter-reset: my-sec-counter;
}

p::before {
  /* Increment "my-sec-counter" by 1 */
  counter-increment: my-sec-counter;
  content: counter(my-sec-counter) ". ";
}
```

Kết quả:
{@codepen: https://codepen.io/tranquocy/pen/PdYOwK}

Trên đây là 1 số thuộc tính CSS mà bản thân mình thấy khá hay và hữu ích. Hy vọng sẽ giúp được các bạn khi áp dụng vào công việc. Xin cảm ơn đã đọc bài viết và hẹn gặp lại!