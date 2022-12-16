## Thẻ <use> có tác dụng gì?
Thẻ <use> sẽ giúp chúng ta tái sử dụng nhiều lần một thẻ <svg>. Bên dưới là một ví dụ: hiển thị 3 hình tròn chỉ với một thẻ <svg>.
    
```
<div class="hide">
    <svg id="circle" width="100" height="100">
       <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="lightgreen" />
    </svg> 
</div>

<svg width="100" height="100"><use xlink:href="#circle"></svg>
<svg width="100" height="100"><use xlink:href="#circle"></svg>
<svg width="100" height="100"><use xlink:href="#circle"></svg>
```
    
{@embed: https://codepen.io/lesontung1996/pen/ZEJgEwa?editors=1000}
    
## Cách thay đổi style cho thẻ <use>
    
Khi chúng ta sử dụng thẻ <use>, trình duyệt sẽ duplicate content bên trong thẻ <svg> và lưu trữ bản sao đó bên trong Shadow DOM. Chính vì sử dụng Shadow DOM nên việc thay đổi style cho các element trong thẻ <use> trực tiếp bằng CSS sẽ không hoạt động. Ở bài viết này, chúng ta sẽ tìm hiểu những cách để thay đổi style cho từng thẻ <use> riêng biệt.
```
use svg circle {
    stroke: blue;
}
// Đoạn CSS selector trên không thể target các element nằm bên trong thẻ <use>
```
    
### Sử dụng biến `curentColor`
Thay vì đặt màu cho <svg> gốc, mình đặt cho nó giá trị là `curentColor` và set các thuộc tính màu khi gọi thẻ <use>.

```
<div class="hide">
    <svg id="circle" width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="curentColor" stroke-width="4" fill="curentColor" />
    </svg> 
</div>

<svg width="100" height="100"><use xlink:href="#circle" stroke="blue" fill="lightblue"></svg>
<svg width="100" height="100"><use xlink:href="#circle" stroke="deeppink" fill="lightpink"></svg>
<svg width="100" height="100"><use xlink:href="#circle" stroke="green" fill="lightgreen"></svg>
```
{@embed: https://codepen.io/lesontung1996/pen/LYjwEgV?editors=1000}
    
### Sử dụng CSS
Trong một số trường hợp chúng ta không có quyền thay đổi markup HTML. Ta có thể ghi đè các thuộc tính của svg gốc bằng cách set giá trị `inherit` ở CSS: 
```
svg circle {
  fill: inherit;
  stroke: inherit;
}
```
Và thay đổi style cho các element:
```
.circle-1 {
  stroke: #2E4C6D;
  fill: #396EB0;
}

.circle-2 {
  stroke: #FFBC97;
  fill: #EED6C4;
}

.circle-3 {
  stroke: #FF5DA2;
  fill: #99DDCC;
}
```
{@embed: https://codepen.io/lesontung1996/pen/bGrXddK?editors=1100}
    
## Kết luận
Ở bài viết này, mình đã cùng tìm hiểu về cách tái sử dụng svg bằng cách sử dụng thẻ <use> và các cách để thay đổi style cho từng element đó.

Mình hy vọng các bạn thấy bài viết này hữu ích. Thanks you for reading.