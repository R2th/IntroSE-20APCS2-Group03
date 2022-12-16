Là một dev Frontend, chắc hẳn ai cũng từng phải làm việc với 1 list. Đó có thể là 1 list sản phẩm, list ảnh, list item...
![](https://images.viblo.asia/0cc5341e-8a83-439b-857d-e8151fda9747.png)

Với 1 list item, để chia layout sao cho đều chúng ta có thể dùng nhiều cách, ví dụ dùng `display: grid` hoặc `display: flex`
Điểm khác biệt lớn nhất giữa `grid` và  `flex` là với `grid` thì chúng ta có thể set khoảng cách giữa cách item rất dễ dàng so với `flex`

Lấy ví dụ với 1 layout như sau
![](https://images.viblo.asia/f663eb4c-314c-4b9b-b417-b8eed446b1a7.png)
Chúng ta có một list item gồm 4 item 1 hàng
```PUG
.grid
  .grid__layout
    .grid__item Item 1
    .grid__item Item 2
    .grid__item Item 3
    .grid__item Item 4
    .grid__item Item 5
    .grid__item Item 6
```
Với `grid` thì chúng ta chỉ cần set `column-gap` là các item sẽ tự động cách đều nhau
Nhưng với `flex` thì chùng ta cần dùng đến margin để chia khoảng cách, cộng thêm với việc responsive sẽ rất khó khắn trong tính toán
Chúng ta có thể giải quyết vẫn đề này bằng cách dùng `CSS Variables`
```SCSS
.grid {
  --itemPerRow: 4;
  --itemMargin: 16px;
  
  @media (max-width: 1399.98px) {
    --itemPerRow: 3;
    --itemMargin: 16px;
  }

  @media (max-width: 1199.98px) {
    --itemPerRow: 2;
    --itemMargin: 14px;
  }

  @media (max-width: 991.98px) {
    --itemPerRow: 1;
    --itemMargin: 12px;
  }
  
  &__layout {
    display: flex;
    flex-wrap: wrap;
    margin-right: calc(-1 * var(--itemMargin));
  }
  
  &__item {
    width: calc(100% / var(--itemPerRow) - var(--itemMargin));
    margin: 0 var(--itemMargin) var(--itemMargin) 0;
  }
}
```
{@embed: https://codepen.io/phongct-1713/pen/jOmjRrQ}