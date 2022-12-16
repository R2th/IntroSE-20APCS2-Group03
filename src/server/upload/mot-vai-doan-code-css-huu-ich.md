Bài viết này, mình sẽ giới thiệu đến các bạn một vài đoạn code CSS ngắn mà mình tìm thấy trên mạng. Hi vọng sẽ giúp được các bạn một phần nào đó.

# Bouncing loader
1.  html
```html
<div class="bouncing-loader">
  <div></div>
  <div></div>
  <div></div>
</div>
```
2.  css
```css
@keyframes bouncing-loader {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-1rem);
  }
}
.bouncing-loader {
  display: flex;
  justify-content: center;
}
.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
```

3.  Giải thích:
    1. `@keyframes`: dùng để define `animation` gồm 2 trạng thái (`from` và `to`) (phần tử thay đổi thuộc tính `opacity` và `transform`.
    2. `bouncing-loader`: đây là class của container chứa các phần tử (các hình tròn). Sử dụng thuộc tính `display: flex;` và `justify-content: center;` để làm cho các item bên trong canh giữa.
    3. `.bouncing-loader > div`: style cho các phần tử con bên trong.
    4. `animation-delay`: sử dụng để cho các phần tử không bắt đầu `animation` cùng một lúc.

{@codepen: https://codepen.io/quyenguyengoc/pen/RMgJyG}

# Box-sizing reset
1.  css
```css
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
```

2.  Giải thích:
    1. `box-sizing: border-box` giúp cho việc thêm các thuộc tính `padding` hay `border` không ảnh hưởng đến chiều rộng và chiều cao của phần tử.
    2. `box-sizing: inherit`: giúp cho phần tử con thừa hưởng `box-sizing` từ phần tử cha.

# Circle
1.  html
```html
<div class="circle"></div>
```
2.  css
```css
.circle {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background: #333;
}
```
{@codepen: https://codepen.io/quyenguyengoc/pen/YaQYEB}

# Custom scrollbar
1.  html
```html
<div class="custom-scrollbar">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id exercitationem nulla qui repellat laborum vitae, molestias tempora velit natus. Quas, assumenda nisi. Quisquam enim qui iure, consequatur velit sit?</p>
</div>
```
2.  css
```css
/* Document scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
/* Scrollable element */
.some-element::webkit-scrollbar {
}
```

3.  Giải thích:
    1. `::-webkit-scrollbar`: chỉnh style cho phần tử `scrollbar`.
    2. `::-webkit-scrollbar-track`: chỉnh  style cho `scrollbar track`.
    3. `::-webkit-scrollbar-thumb`: chỉnh style cho `scrollbar thumb`.

{@codepen: https://codepen.io/quyenguyengoc/pen/MVoXBz}

# Custom text selection
1.  html
```html
<p class="custom-text-selection">Select some of this text.</p>
```
2.  css
```css
::selection {
  background: aquamarine;
  color: black;
}
.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```

3.  Giải thích:
    1. `::selection`: define một selector trên phần tử khi mà nó được selected.

{@codepen: https://codepen.io/quyenguyengoc/pen/OvgErx}

# Disable selection
1.  html
```html
<p>You can select me.</p>
<p class="unselectable">You can't select me!</p>
```
2.  css
```css
.unselectable {
  user-select: none;
}
```

3.  Giải thích:
    1. `::selection`: define một selector trên phần tử khi mà nó được selected.

{@codepen: https://codepen.io/quyenguyengoc/pen/geRKER}

# Donut spinner
1.  html
```html
<div class="donut"></div>
```
2.  css
```css
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
```

3.  Giải thích:
    1. Sử dụng `semi-transparent border` (đường viền một nửa) cho cả một phần tử. Trong đó một bên sẽ đóng vai trò là `loading` và sử dụng thuộc tính `rotate` để tạo hiệu ứng xoay tròn.

{@codepen: https://codepen.io/quyenguyengoc/pen/LdLrwN}

# Gradient text
1.  html
```html
<p class="gradient-text">Gradient text</p>
```
2.  css
```css
.gradient-text {
  background: -webkit-linear-gradient(pink, red);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
```

3.  Giải thích:
    1. `background: -webkit-linear-gradient(...)`: tạo cho phần tử một background `gradient`.
    2. `webkit-text-fill-color: transparent`: làm cho màu chữ trong suốt.
    3. `webkit-background-clip: text`: clip màu nền của với màu chữ làm cho màu chữ thành `gradient. 

{@codepen: https://codepen.io/quyenguyengoc/pen/oqwMzB}

# Grid centering
1.  html
```html
<div class="grid-centering">
  <div class="child">Centered content.</div>
</div>
```
2.  css
```css
.grid-centering {
  display: grid;
  justify-content: center;
  align-items: center;
}
```

3.  Giải thích:
    1. `display: grid`: làm cho phần tử hiển thị như `grid`.
    2. `justify-content: center`: làm cho phần tử bên trong canh giữa theo chiều ngang.
    3. `align-items: center`: làm cho phần tử bên trong canh giữa theo chiều dọc.

{@codepen: https://codepen.io/quyenguyengoc/pen/XEgBMb}

# Grid layout
1.  html
```html
<div class="grid-layout">
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="content">
    Content
    <br>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </div>
  <div class="footer">Footer</div>
</div>
```
2.  css
```css
.grid-layout {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'sidebar header header'
    'sidebar content content'
    'sidebar footer  footer';
  color: white;
}
.grid-layout > div {
  background: #333;
  padding: 10px;
}
.sidebar {
  grid-area: sidebar;
}
.content {
  grid-area: content;
}
.header {
  grid-area: header;
}
.footer {
  grid-area: footer;
}
```

3.  Giải thích:
    1. `display: grid`: làm cho phần tử hiển thị như `grid`.
    2. `grid-gap: 10px`: define khoảng cách giữa các phần tử.
    3. `grid-template-columns: repeat(3, 1fr): define 3 phần tử cùng 1 size (witdh).
    4. `grid-template-areas`: define tên của mỗi grid.
    5. `grid-area: sidebar`: define tên cho một grid là `sidebar`.

{@codepen: https://codepen.io/quyenguyengoc/pen/dmRjWW}

# Kết luận:
Trên đây là một số đoạn css nhỏ mình tìm được và giới thiệu với các bạn. Vì kiến thức về css còn ít nên cách trình bày của mình sẽ có vài chỗ chưa đúng. Mong các bạn thông cảm và cảm ơn các bạn đã xem bài.

### Tham khảo:
[Nguồn](https://atomiks.github.io/30-seconds-of-css/).