# HTML
Để làm được thì chúng ta sẽ cần 1 wrapper element để bao bọc lấy element đối tượng. Vì vậy mình sẽ sử dụng `blockquote` element làm element con và dùng thẻ div để làm wrapper. 
```html
<div class="quote-wrapper">
  <blockquote class="text" cite="http://www.inspireux.com/category/quotes/jesse-james-garrett/">
    <p>Experience design is the design of anything, independent of medium, or across media, with human experience as an explicit outcome, and human engagement as an explicit goal.</p>
    <footer>– Jesse James Garrett</footer>
  </blockquote>
</div>
```

# CSS
Bắt đầu với thẻ div dùng làm wrapper.
```css
.quote-wrapper {
  height: 300px;
  position: relative;
  width: 300px;
}
```
Kế tiếp chúng ta sẽ làm cho `blockquote` fill lấy thẻ div ngoài và dùng thuộc tính `radial-gradient` để tạo background bo tròn.
```css
.text {
  background: radial-gradient(
    ellipse at center,
    rgba(0, 128, 172, 1) 0%,
    rgba(0, 128, 172, 1) 70%,
    rgba(0, 128, 172, 0) 70.3%
  );
  height: 100%;
  width: 100%;
}
```
**Lưu ý:** Vì 70% sẽ hơi tạo răng cưa ở viền bo nên mình để lên làm 70.3%

![](https://images.viblo.asia/feeb118b-e4e1-4f55-a215-169fe29c76ca.png)

Sau khi đã có cái base background thì kế đến mình sẽ set style cho đoạn text.

```css
.text {
  color: white;
  position: relative;
  margin: 0;
}
```
Và cho tới thời điểm hiện tại thì chúng ta đã có:

![](https://images.viblo.asia/c34983e7-8f76-4fda-8a23-13dc1415579a.png)

Kế đó mình sẽ set style riêng cho thẻ `<p>` chứa nội dung được quote
```css
.text p {
  font-size: 21px;
  font-style: italic;
  height: 100%;
  line-height: 1.25;
  padding: 0;
  text-align: center;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3);
}
```

Sử dụng pseudo-element `::before` để tạo shape. Mình sử dụng hàm `polygon()` cho thuộc tính `shape-outside` để vẽ các tọa độ cho shape rồi wrap đoạn text lại bằng cách cho `float:left`.
```css
.text::before {
  content: "";
  float: left;
  height: 100%;
  width: 50%;
  shape-outside: polygon(
    0 0,
    98% 0,
    50% 6%,
    23.4% 17.3%,
    6% 32.6%,
    0 50%,
    6% 65.6%,
    23.4% 82.7%,
    50% 94%,
    98% 100%,
    0 100%
  );
  shape-margin: 7%;
}
```

Tạm thời thay đổi radial background sang màu đỏ để có thể thấy rõ được độ tương phản của background với đường polygon path (đường vẽ màu xanh) của editor tool.
```css
.text {
    ...
    background: radial-gradient(
      ellipse at center,
      rgba(210, 20, 20, 1) 0%,
      rgba(210, 20, 20, 1) 70%,
      rgba(210, 20, 20, 0) 70.3%
    );
    ...
}
```

Developer tool của trình duyệt Firefox sẽ rất tiện lợi trong trường hợp này khi nó cho phép chúng ta inspect được các điểm nối shape hiện tại bằng cách click vào icon polygon tại thuộc tính `shape-outside`.

![](https://images.viblo.asia/97e142cc-cc7a-432c-974b-6ea12472290b.png)

![](https://images.viblo.asia/2a7e99c4-f923-4b81-9d1e-d732b76a11ef.png)

Làm điều tương tự cho pseudo element `::before` của thẻ `<p>` trong `.text` để tạo shape ở phía bên phải bằng cách cho `float:right`.

```css
.text p::before {
  content: "";
  float: right;
  height: 100%;
  width: 50%;
  shape-outside: polygon(
    2% 0%,
    100% 0%,
    100% 100%,
    2% 100%,
    50% 94%,
    76.6% 82.7%,
    94% 65.6%,
    100% 50%,
    94% 32.6%,
    76.6% 17.3%,
    50% 6%
    );
  shape-margin: 7%;
}
```

![](https://images.viblo.asia/5f11e2ef-01c2-4956-aedf-7651441e90ed.png)

# Thêm style cho footer
Footer khi này sẽ bị che đi mất bởi các background tròn nên cần set lại position cho thẻ `<blockquote>`
```css
.quote-wrapper blockquote footer {
  bottom: 25px;
  font-size: 17px;
  font-style: italic;
  position: absolute;
  text-align: center;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.3);
  width: 100%;
}
```

# Thêm quote mark
Tiếp tục tận dụng lợi thế của pseudo element `::before` cho thẻ có class `.quote-wrapper`
```css
.quote-wrapper::before {
  content: "\201C";
  color: #ccc;
  font-family: sans-serif, serif;
  font-size: 270px;
  height: 82px;
  line-height: 1;
  opacity: .9;
  position: absolute;
  top: -48px;
  left: 0;
  z-index: 1;
}
```
Cuối cùng các bạn nhớ trả lại background ban đầu cho `.text` nhé
# Demo
{@embed: https://codepen.io/Kerrys7777/pen/eYNGxow}