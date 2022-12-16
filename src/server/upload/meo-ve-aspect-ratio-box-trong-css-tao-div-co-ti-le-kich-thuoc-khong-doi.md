![](https://images.viblo.asia/9440a174-84d1-47dc-bcc4-11f8f796bbe4.png)

Trong HTML, một vài loại phần tử có khả năng giữ tỉ lệ kích thước không đổi, ví dụ với `<img>` hay `<canvas>`. Khi những phần tử này bị thay đổi chiều rộng (width) chẳng hạn, thì chiều cao (height) của chúng cũng tự giác thay đổi theo tương ứng, giúp bảo toàn tỉ lệ kích thước như ban đầu!

Tuy nhiên, có một vài trường hợp mà bạn cần tạo một phần tử DIV có khả năng giữ nguyên tỉ lệ kích thước như vậy. Không may là các phần tử `<div>` không dễ dàng thay đổi kích thước như vậy. CSS đã có thêm thuộc tính mới `aspect-ratio` để giúp chúng ta tạo ratio box, nhưng hỗ trợ trình duyệt chưa thật sự tốt (ở thời điểm viết bài, chỉ có các trình duyệt Chromium và Firefox Nightly là hỗ trợ, Safari thì chưa thấy đâu).

Trong bài viết ngắn này, mình xin được chia sẻ về một vài giải pháp để tạo ra các phần tử có đảm bảo aspect ratio, cũng như một vài trường hợp bạn cần đến chúng.

# Aspect Ratio Box cần dùng khi nào?
Tuy không quá phổ biến, nhưng một lúc nào đó bạn sẽ gặp mong muốn có một phần tử `<div>` với tỉ lệ kích thước không đổi. Trường hợp cụ thể thì không có nhiều, nhưng mình có thể kể ra một vài ví dụ:
- Khi bạn muốn tạo một placeholder cho một hay nhiều phần tử con, cho rằng bạn đã biết trước width và height của nó. Mục đích của việc này có thể là để ngăn chặn việc Web bị tình trạng *cumulative layout shift*.
- Khi bạn muốn embed một iframe hiện một video, và muốn iframe có tỉ lệ kích thước tương tự tỉ lệ của video đó. Lưu ý là tuy phần tử `<video>` thì có đảm bảo aspect ratio, nhưng phần tử `<iframe>` thì không.
- Khi bạn muốn tạo một `<div>` có kích thước phụ thuộc vào kích thước của trình duyệt (viewport), nhưng lại muốn giữ cho nó luôn là hình vuông (1:1).
# Một vài mẹo tạo Aspect Ratio Box
## Phương pháp đầu tiên: `padding-top` với giá trị theo phần trăm
`padding-top` có giá trị tương đối với width của phần tử cha. Điều đó có nghĩa là: nếu giả sử phần tử cha hiện đang có kích thước 500px, và phần tử `<div>` con có thuộc tính `padding-top` được đặt giá trị là 100%, thì tức là `padding-top` cũng sẽ có độ dài đúng 500px. Lúc phần tử cha thay đổi kích thước, thì `<div>` cũng thay đổi chiều cao tương ứng. Như vậy là bạn đã có một `<div>` có tỉ lệ luôn là hình vuông!

```html
<div style="width: 700px; max-width: 100%;">
  <div style="width: 100%; padding-top: 100%; background-color: red;"></div>
</div>
```

Thử tạo một file HTML với đoạn code trên và thay đổi cỡ chiều ngang của trình duyệt, bạn sẽ thấy chiều dọc của phần tử sẽ được thay đổi tương ứng để đảm bảo luôn là hình vuông!

{@embed: https://codepen.io/tranxuanthang/pen/GRWONwr}

Tương tự với logic này, nếu bạn muốn có một `<div>` có tỉ lệ của video 16:9 thì sao? Thay giá trị của `padding-top` thành 56.25% là được. Lý do đơn giản bởi vì $\frac{9}{16} = 56.25\%$!

Một thứ nữa mà có thể bạn thắc mắc: làm thế nào nếu mình muốn thêm nội dung (chữ, ảnh, video,...) vào bên trong phần tử `<div>` ratio box đã được tạo? Vì phần nội dung bị chiếm bằng "mẹo" padding, nên bạn không thể thêm nội dung theo cách bình thường được. Cách khắc phục khá đơn giản bằng cách sử dụng `position`!

```html
<div class="parent">
  <div class="ratio-box"></div>
  <div class="child">Phần tử này luôn có kích thước là 16/9</div>
</div>
```

```css
.parent {
  width: 700px;
  max-width: 100%;
  position: relative;
}

.ratio-box {
  width: 100%;
  padding-top: 56.25%;
}

.child {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  color: white;
  font-weight: bold;
}
```

{@embed: https://codepen.io/tranxuanthang/pen/LYWObKp}

Phương pháp này tương đối phổ biến, được Google áp dụng cho mã embed của Youtube, và hoạt động tốt cho mọi trình duyệt (cả IE, Safari,...).

## Phương pháp 2: lợi dụng phần tử `<canvas>`
Ở đầu bài mình có nhắc đến việc phần tử `<img>` hay `<canvas>` mặc định đã có khả năng giữ tỉ lệ. Như vậy, ta cũng có thể lợi dụng phần tử canvas này để tạo ra một ratio box hoàn hảo mà không phải dựa vào phép chia hay padding trick.

Ưu điểm so với phương pháp đầu có lẽ là trông nó ít "mẹo" hơn, hay những tỉ lệ mà phép chia ra số vô tỉ (ví dụ với tỉ lệ 3:2 thì sẽ phải là $\frac{2}{3} = 0.66666666$. Đoạn code thì khá giống với phương pháp đầu tiên, chỉ khác là thay cho phần tử "trick padding" thì ta thay bằng phần tử `<canvas>`:

```html
<div class="parent">
  <canvas width="16" height="9" class="ratio-box"></canvas>
  <div class="child">Phần tử này luôn có kích thước là 16/9</div>
</div>
```

```css
.parent {
  width: 700px;
  max-width: 100%;
  position: relative;
}

.ratio-box {
  width: 100%;
}

.child {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  color: white;
  font-weight: bold;
}
```

{@embed: https://codepen.io/tranxuanthang/pen/JjWOEdY}

## Cách chính thống nhất: thuộc tính `aspect-ratio` trong CSS
Với phương pháp chính thức được hỗ trợ bởi trình duyệt, bạn không cần phải làm rối code thêm với các thuộc tính `position` nữa. Cùng với ví dụ tạo ra một phần tử `<div>` có kích thước 16:9 như ở trên, bây giờ bạn chỉ cần làm đơn giản thế này:

```html
<div class="parent">
  <div class="child">Phần tử này luôn có kích thước là 16/9</div>
</div>
```

```css
.parent {
  width: 700px;
  max-width: 100%;
}

.child {
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  color: white;
  font-weight: bold;
}
```

{@embed: https://codepen.io/tranxuanthang/pen/yLMPgOw}

Tiện lợi hơn rất nhiều nhỉ? Nhưng đáng tiếc là ngay đến bây giờ, các trình duyệt vẫn chưa hỗ trợ hết thuộc tính này. Chrome (và các trình duyệt Chromium-based) là trình duyệt duy nhất hỗ trợ property này. Trình duyệt khác như Firefox thì chuẩn bị hỗ trợ ở bản 89 (Firefox stable hiện đang ở bản 88), còn Safari thì chưa có tin gì về việc hỗ trợ.

# Tham khảo
- [aspect-ratio trên MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
- [Aspect Ratio Boxes - CSS Tricks](https://css-tricks.com/aspect-ratio-boxes/)