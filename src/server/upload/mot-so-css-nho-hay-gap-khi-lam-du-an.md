Chào các bạn, hôm nay chúng ta cùng nhau xem qua các tip CSS hay gặp khi làm dự án nhé.

`Nguồn: https://30-seconds.github.io/30-seconds-of-css/`
# 1. Dấu ba chấm
- **Từ khoá:** Loading-dot
- **Code:**
> **HTML**
> 
```
<div class="loading-dot">
  <div></div>
  <div></div>
  <div></div>
</div>
```

> **CSS**
> 

```
@keyframes loading-dot {
   to {
     opacity: 0.1;
     transform: translate3d(0, -1rem, 0);
   }
 }
 .loading-dot {
   display: flex;
   justify-content: center;
 }
 .loading-dot > div {
   width: 1rem;
   height: 1rem;
   margin: 3rem 0.2rem;
   background: #8385aa;
   border-radius: 50%;
   animation: loading-dot 0.6s infinite alternate;
 }
 .loading-dot > div:nth-child(2) {
   animation-delay: 0.2s;
 }
 .loading-dot > div:nth-child(3) {
   animation-delay: 0.4s;
 }
```

- **Demo:**

![](https://images.viblo.asia/a3bb2f29-8e3e-40d4-96e3-cbeb391feb68.png)

- **Giải thích:**

> 1. `1rem` được tính là `16px`
> 2. `@keyframes` định nghĩa một `animation` với hai trạng thái, khi element thay đổi `opacity` và được chuyển lên trạng thái 2D bằng `transform: translate3d()`. Sử dụng `transform: translate3d()` sẽ tăng tốc độ của `animation`
> 3. `.loading-dot` là class cha của các `loading-dot` và sử dụng thuộc tính `display: flex` và `justify-content: center` để đưa chúng về giữa.
> 4. `.loading-dot > div` chỉ đến ba `div` nhỏ nằm bên trong `div.loading-dot` với `width` và `height` là `1rem`, sử dụng `border-radius: 50%` để đưa chúng từ hình vuông sang hình tròn.
> 5. `animation` là property ngắn gọn của rất nhiều property animation khác như: `animation-name`, `animation-duration`, `animation-iteration-count`, `animation-direction`.  Khi sử dụng `animation` thì các property trên đều được sử dụng.
> 6. `nth-child(n)` trỏ đến các element con của element cha.
> 7. `animation-delay` được sử dụng cho `div` thứ 2 và thứ 3 để bảo đảm các element không hoạt động cùng một lúc.
> 

# 2. Hình tròn
- **Từ khoá:** Circle
- **Code:**
> **HTML**
> 
```
<div class="circle">
```

> **CSS**
> 

```
.circle {
   border-radius: 50%;
   width: 2rem;
   height: 2rem;
   background: #333;
 }
```

- **Demo:**

![](https://images.viblo.asia/df2d24e7-77aa-4184-ba0e-7999c67cd964.png)

- **Giải thích:**

> 1. Thuộc tính `border-radius: 50%` sẽ làm cong border của element thành hình tròn.
> 2. Vì hình tròn có cùng bán kính ở bất kỳ điểm nào, nên `width` và `height` phải bằng nhau. Nếu chúng khác nhau sẽ tạo ra hình `elip`.
> 

# 3. Clearfix

- **Từ khoá:** Clearfix
- **Code:**
> **HTML**
> 
```
<div class="clearfix">
  <div class="floated">Clearfix 1</div>
  <div class="floated">Clearfix 2</div>
  <div class="floated">Clearfix 3</div>
</div>
```

> **CSS**
> 

```
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
.floated {
  float: left;
}
```

- **Demo:**

![](https://images.viblo.asia/23b9eb38-0a27-4f3d-b0b9-1bea8aa1612f.png)

- **Giải thích:**

> 1. Class `clearfix::after` định nghĩa một [pseudo-element.](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
> 2. `content: ''` cho phép pseudo-element có thể tác động đến layout.
> 3. `clear: both` chỉ định bên trái, bên phải của element không thể liền kề với phần tử `floated` ở trước mặc dù trong cùng `format block`.
> 

# 4. Danh sách với số đếm
- **Từ khoá:** Counter in list
- **Code:**
> **HTML**
> 
```
<ul>
  <li>List item</li>
  <li>List item</li>
  <li>
    List item
    <ul>
      <li>List item</li>
      <li>List item</li>
      <li>List item</li>
    </ul>
  </li>
</ul>
```

> **CSS**
> 

```
ul {
  counter-reset: counter;
}
li::before {
  counter-increment: counter;
  content: counters(counter, '.') ' ';
}
```

- **Demo:**

![](https://images.viblo.asia/87973636-62ec-4ed7-a32b-d0231f8ac8d9.png)

- **Giải thích:**

> 1. `counter-reset` khởi tạo bộ đếm, giá trị là tên của bộ đếm. Mặc định bộ đếm sẽ bắt đầu đếm từ 0, `property` này có thể thay đổi giá trị thành bất cứ số nào.
> 2. `counter-increment`: Sử dụng trong element cần được đếm, khi `counter-reset` được khởi tạo thì giá trị của bộ đếm sẽ được tăng hoặc giảm tuỳ ý.
> 3. `counter(name, style)`: Hiển thị giá trị của bộ đếm, thông thường sẽ được sử dụng trong `property content`. Hàm `counter` này cần 2 tham số, đầu tiên là tên của bộ đếm và tiếp theo là `decimal` hoặc `upper-roman` (mặc định là `decimal`).
> 4. counters(counter, string, style): Hiển thị giá trị của bộ đếm, tương tự ở `mục số 3`, hàm này lại nhận 3 tham số, đầu tiên là tên của bộ đếm, tiếp theo bạn có thể thêm string (tuỳ ý) vào trước hoặc sau của bộ đếm, cuối cùng là `decimal` hoặc `upper-roman` (mặc định là `decimal`).
> 

# 5. Custom lại scrollbar

- **Từ khoá:** Custom scrollbar
- **Code:**
> **HTML**
> 
```
<div class="custom-scrollbar">
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi. <br />
    Quisquam enim qui iure, consequatur velit sit?<br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi. <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
    Iure id exercitationem nulla qui repellat laborum vitae, <br />
    molestias tempora velit natus. Quas, assumenda nisi.
  </p>
</div>
```

> **CSS**
> 

```
.custom-scrollbar {
  height: 70px;
  overflow-y: scroll;
}
/* To style the document scrollbar, remove `.custom-scrollbar` */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
```

- **Demo:**

![](https://images.viblo.asia/376475c1-d2a7-42c2-b442-3cb8ceb26d21.png)

- **Giải thích:**

> 1. `::webkit-scrollbar`: trỏ đến toàn bộ element của scrollbar.
> 2. `::webkit-scrollbar-track` : trỏ đến phần trắng của scrollbar.
> 3. `::webkit-scrollbar-thumb` : trỏ đến phần thanh cuộn của scrollbar.
> 

# 6. Custom lại style của select text
- **Từ khoá:** Custom text selection
- **Code:**
> **HTML**
> 
```
<p class="custom-text-selection">Select some of this text.</p>
```

> **CSS**
> 

```
::selection {
  background: aquamarine;
  color: black;
}
.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```

- **Demo:**

![](https://images.viblo.asia/13ee6e75-7ac7-4cbf-b094-b12db30b382a.png)

- **Giải thích:**

> `::selection` định nghĩa `pseudo selector` trong element để thay đổi `style` khi select một đoạn text. Nếu chúng ta không thêm `::selection` vào trong bất cứ element nào thì nó sẽ tác động đến phần tử `root`, hay bất cứ element nào được select.
> 

# 7. Không cho phép select text

- **Từ khoá:** Disable selection
- **Code:**
> **HTML**
> 
```
<p>You can select me.</p>
<p class="unselectable">You can't select me!</p>
```

> **CSS**
> 

```
.unselectable {
  user-select: none;
}
```

- **Demo:**

![](https://images.viblo.asia/0bfc7c24-af4c-40ec-9304-475bf2c0b884.png)

- **Giải thích:**

> `user-select: none` làm cho text không thể được select.
> 

# 8. Hiển thị table vào giữa

- **Từ khoá:** Display table centering
- **Code:**
> **HTML**
> 
```
<div class="container">
  <div class="center"><span>Centered content</span></div>
</div>
```

> **CSS**
> 

```
.unselectable {
  user-select: none;
}
```

- **Demo:**

![](https://images.viblo.asia/b970ea09-9402-4a01-83a7-50475c2227f4.png)

- **Giải thích:**

> 1. `display: table` nằm bên trong class `.center` cho phép element trở thành giống tag `<table>`.
> 2. 100% height và width cho phép element có thể lấp đầy toàn bộ độ rộng của element cha.
> 3. `display: table-cell` bên trong `.center > span` cho phép element trở thành giống một HTML element.
> 4. `text-align: center` bên trong `.center > span` sẽ căn giữa theo chiều ngang.
> 5. `vertical-align: middle` bên trong `.center > span` sẽ căn giữa theo chiều dọc.
> 6. Phần tử bọc ngoài (trong trường hợp này là `class .container`) cần phải có width và height cố định.
>


Vậy là chúng ta đã điểm qua được 8 CSS nho nhỏ hay gặp trong quá trình làm dự án rồi. `Cảm ơn các bạn đã theo dõi!`