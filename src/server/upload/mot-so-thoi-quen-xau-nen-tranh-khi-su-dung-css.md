![](https://images.viblo.asia/73cf9b7f-4dd4-4e77-9bcb-78ef83c4b3b1.jpg)

### 1. Set margin/padding và reset chúng

Ta rất hay thấy mọi người set margin, padding cho tất cả các elements rồi lại reset chúng cho thằng đầu tiên hoặc cuối cùng. Tại sao phải sử dụng 2 lần set trong khi chúng ta có thể dễ dàng thực hiện nó cùng một lúc.

Sử dụng một trong những cách đơn giản, ngắn hơn như: 
- `nth-child` hoặc `nth-of-type` selectors
- `:not()` pseudo-class
- `+` : bộ tổ hợp anh/chị/em liền kề 

Bad
```css
.item {
  margin-right: 1.6rem;
}

.item:last-child {
  margin-right: 0;
}
```

Better

```css
.item:not(:last-child) {
  margin-right: 1.6rem;
}

/* hoặc */

.item:nth-child(n+2) {
  margin-left: 1.6rem;
}

/* hoặc */

.item + .item {
  margin-left: 1.6rem;
}
```

### 2. `display: block` cho các phần tử có `position: absolute/fixed`

Bạn có biết rằng mặc định `display: block` đã được thêm cho các phần tử có `position: absolute` hay `position: fixed` ?

Ngoài ra, nếu sử dụng các giá trị `inline-*`, chúng sẽ thay đổi như sau: 
- `inline` hoặc `inline-block` --> `block`
- `inline-flex` --> `flex`
- `inline-grid` --> `grid`
- `inline-table` --> `table`

Vì vậy, chỉ cần viết `position: absolute` hay `position: fixed` và chỉ thêm `display` khi cần giá trị là `flex/grid`.

Bad
```css
.button::before {
  content: "";
  position: absolute;
  display: block;
}

/* hoặc */

.button::before {
  content: "";
  position: fixed;
  display: block;
}
```

Better

```css
.button::before {
  content: "";
  position: absolute;
}

/* hoặc */

.button::before {
  content: "";
  position: fixed;
}
```

### 3. `transform: translate(-50%, -50%)` để căn giữa

Vấn đề căn giữa cho một phần tử có `height` tùy ý theo 2 trục đã từng gây ra rất nhiều rắc rối cho đến tận năm 2015, và các giải pháp của nó đều gặp phải một số khó khăn.  

Đặc biệt, có một giải pháp là sử dụng kết hợp `position: absolute` và `transform`. Kỹ thuật này gây ra vấn đề text mờ trên các trình duyệt nền tảng Chromium. Nhưng sau sự ra đời của flexbox, kỹ thuật trên đã không còn phù hợp nữa. Nó không thể giải quyết vấn đề text mờ, cộng thêm việc buộc phải sử dụng tới 5 thuộc tính.

Chúng ta chỉ cần sử dụng `margin: auto` bên trong container `flex` và trình duyệt sẽ căn giữa các phần tử để giải quyết ngắn gọn vấn đề trên.

Bad
```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

Better
```css
.parent {
  display: flex;
}

.child {
  margin: auto;
}
```

### 4. `width: 100%` cho các phần tử `block`

Chúng ta thường sử dụng `flexbox` để tạo grid multi-column dần chuyển thành một column duy nhất bằng cách sử dụng `width: 100%`. Tại sao lại phải làm vậy?

Các phần tử `grid` là các phần tử `block` có thể thực hiện điều này một cách mặc định mà không cần sử dụng các thuộc tính bổ sung. Do đó, không cần dùng `width: 100%`, nhưng cần viết media query để `flexbox` chỉ được sử dụng để tạo grid multi-column,

Bad
```html
<div class="parent">
  <div class="child">Item 1</div>
  <div class="child">Item 2</div>
  <div class="child">Item 3</div>
  <div class="child">Item 4</div>
</div>

<!-- css -->
.parent {
  display: flex;
  flex-wrap: wrap;
}

.child {
  width: 100%;
}

@media (min-width: 1024px) {
  .child {
    width: 25%;
  }
}
```

Better

```html
<div class="parent">
  <div class="child">Item 1</div>
  <div class="child">Item 2</div>
  <div class="child">Item 3</div>
  <div class="child">Item 4</div>
</div>

<!-- css -->
@media (min-width: 1024px) {
  .parent {
    display: flex;
    flex-wrap: wrap;
  }

  .child {
    width: 25%;
  }
}

```

### 5. `display: block` cho flex items

Khi dùng `flexbox`, điều quan trọng cần nhớ là khi tạo container `flex` (display: flex) thì tất cả các items con (các flex items) đều sẽ bị block.

Điều này có nghĩa là các phần tử chỉ có thể có `display: block`. Do đó, nếu đặt `inline` hay `inline-block`, nó sẽ chuyển thành `block`, tương tự với `inline-flex` --> `flex`, `inline-grid` --> `grid` và `inline-table` --> `table`.

Vì vậy, không thêm `display: block` cho các flex items. Trình duyệt sẽ làm điều đó.

Bad
```css
.parent {
  display: flex;
}

.child {
  display: block;
}
```

Better
```css
.parent {
  display: flex;
}
```


[Nguồn](https://betterprogramming.pub/5-css-practices-to-avoid-as-a-web-developer-1b7553c05131)