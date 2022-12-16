![](https://images.viblo.asia/6bd5abf5-b57a-4088-8b1d-39d5895b69c4.jpg)
## Scroll snapping là gì?

Hầu hết trong số chúng ta trong quá trình duyệt web, đã từng trải nghiệm qua `scroll snapping`, nhưng không biết nó được gọi là gì :laughing:

Theo định nghĩa: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap
> CSS Scroll Snap is a module of CSS that introduces scroll snap positions, which enforce the scroll positions that a scroll container’s scrollport may end at after a scrolling operation has completed.

Hiểu nôm na, `scroll snapping` cho phép bạn khóa chế độ xem (`viewport`) theo các thành phần hoặc vị trí nhất định sau khi người dùng cuộn xong. Nó rất tuyệt để xây dựng các tương tác như thế này:
{@codepen: https://codepen.io/doanh/pen/XGOBNG}

### Những trình duyệt nào hỗ trợ scroll snapping
Theo như [caniuse](https://caniuse.com/#feat=css-snappoints), khá nhiều trình duyệt đã hỗ trợ module css này:
![](https://images.viblo.asia/c503442a-4dfe-4636-b5b8-6546d7a39dcb.png)

### Sử dụng scroll snapping

Sử dụng nó khá là đơn giản, chúng ta thêm thuộc tính `scroll-snap-type` cho container và `scroll-snap-align` cho các phần tử con bên trong. Khi nội dung bên trong container được cuộn, nó sẽ tự động `snap` các phần tử con như bạn đã định nghĩa. Bạn có thể setup đơn giản như dưới:

html
```html
<div class='container'>
    <section class='child'></section>
    <section class='child'></section>
    <section class='child'></section>
</div>
```

css
```css
.container {
  scroll-snap-type: y mandatory;
}

.child {
  scroll-snap-align: start;
}
```

### scroll-snap-type
Thuộc tính `scroll-snap-type` áp dụng cho container, nó có thể đặt 1 trong 3 giá trị: `none`, `mandatory`, `proximity`. Ứng với mỗi giá trị, browser sẽ `snap` theo cách khác khau
- `mandatory`: browser sẽ `snap` tại `snap point` khi người dùng dừng scroll.
- `proximity`: browser `có thể` snap tại `snap point` nếu browser thấy thích hợp.

{@codepen: https://codepen.io/doanh/pen/YgBOXr}

### scroll-padding
Như thuộc tính `scroll-snap-type`, thuộc tính này cũng áp dụng cho container.
Theo mặc định, nội dung sẽ `snap` vào các cạnh của container. Bạn có thể thay đổi điều đó bằng cách đặt thêm thuộc tính `scroll-padding` cho container.

Điều này có thể hữu ích nếu bố cục của bạn có các yếu tố có thể che nội dung của trang, như `fixed header`.

### scroll-snap-align
Thuộc tính này áp dụng cho các item bên trong container, nó có thể có 1 trong 3 giá trị: `start`, `center`, va `end`.
![](https://images.viblo.asia/0b0c030e-f462-48c3-84f7-3183a5418087.png)

Các giá trị này liên quan đến hướng cuộn. Nếu bạn cuộn theo chiều dọc, bắt đầu tham chiếu (refer) đến cạnh trên của phần tử. Nếu bạn cuộn theo chiều ngang, nó tham chiếu đến cạnh trái. `center` và `end` theo cùng một `principle`. Bạn có thể đặt một giá trị khác nhau cho mỗi hướng cuộn được phân tách bằng khoảng trắng.

### scroll-snap-stop
Thuộc tính này có thể nhận 1 trong 2 giá trị `normal`, `always`.

Theo mặc định, snapping cuộn chỉ khởi động khi người dùng dừng cuộn, nghĩa là nó có thể bỏ qua một số `snap point` trước khi dừng lại.

Bạn có thể thay đổi điều này bằng cách đặt `scroll-snap-stop: always` ở bất kỳ phần tử con nào. Điều này buộc `container` cuộn dừng lại trên phần tử đó trước khi người dùng có thể tiếp tục cuộn.

## Một số ví dụ
### Vertical full screen
```css
body {
    scroll-snap-type: y mandatory;
}

section {
    height: 100vh;
    width: 100vw;
    scroll-snap-align: start;
}
```
{@codepen: https://codepen.io/doanh/pen/ywZxjY}

### Horizontal full screen
```css
body {
    scroll-snap-type: x mandatory;
}

section {
    height: 100vh;
    width: 100vw;
    scroll-snap-align: start;
}
```

{@codepen: https://codepen.io/doanh/pen/zbeJLZ}

### Mix nhiều thuộc tính
{@codepen: https://codepen.io/doanh/pen/bZzxxX}