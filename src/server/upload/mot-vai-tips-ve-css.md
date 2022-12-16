**1. Image rendering:**

Thuộc tính này khá hữu ích trong việc hiển thị mã QR và các thumbnails, giúp tăng chất lượng ảnh của chúng.
```css
img.QRcode {
  image-rendering: pixelated;
}
```

**2. Check empty:**

Ẩn phần tử khi không có nội dung bên trong. Trả về khoảng trắng thay cho phần nội dung bị khuyết.
```css
element:empty {
  display: none;
}
```

**3. Tạo độ cong cho text:**

```cpp
p {
  shape-outside: polygon(0 0, 0 200px, 300px 600px);
}
```
Thuộc tính này giúp phần content bao quanh bên ngoài sẽ có hình dạng cong.

**4. Plain SVG như background:**

```css
element {
  background-image: url('data:image/svg+xml;utf8,<svg>...</svg>');
}
```
Use <svg> như một css background mà không cần convert sang base64. 

**5. Vô hiệu hoá các tương tác:**

```css
[data-untouchable] {
  pointer-events: none;
}
```
Vô hiệu hoá tất cả các tương tác của người dùng, thậm chí cả các sự kiện css chỉ bằng một thuộc tính.

**6. Kiểm tra nếu input có giá trị:**

```css
.Note {
  opacity: 0;
  transition: opacity 200ms ease-out;
}

input:not(:placeholder-shown) + .Note {
  opacity: 1;
}
```
Pseudo class này sẽ cho phép kiểm tra xem input có giá trị nào không. 

**7. Lặp lại gradients:**

```css
.RepeatLinear {
  background:
    repeating-linear-gradient(
      45deg,
      lime,
      lime 10px,
      pink 10px,
      pink 20px
    );
}

.RepeatRadial {
  background:
    repeating-conic-gradient(
      circle at 0 0,
      tomato,
      limegreen 50px
    );
}
```
Có thể sử dụng lặp lại gradient thay vì bị rối loạn với mixins.

**8. Float dựa theo hướng:**

```css
img {
  float: inline-start; /* ...or inline-end */
}
```
Float một phần tử dựa theo hướng một văn bản (right-to-left hoặc left-to-right).

**9. Target mặc định đến một phần tử trong form:**

```css
input:default {
  opacity: 0.2;
}
```
Target đến phần input mặc định được selected. [Xem ví dụ](https://jsfiddle.net/equinusocio/kn231bx9/)

**10. Import css khi cần:**

@import url('portrait.css') screen and (orientation: portrait);
Có thể import css theo cách trên như khi sử dụng trong thẻ <link>.

**11. Ngăn việc over-scroll:**

```css
.ScollingContent {
  overscroll-behavior: contain;
}
```
Ngăn việc over-scroll khi scroll đến điểm cuối của phần tử.

Link bài viết tham khảo [tại đây](https://equinsuocha.io/blog/hot-tips-css).