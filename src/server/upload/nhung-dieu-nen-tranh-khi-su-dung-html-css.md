**HTML** và **CSS** là 2 công nghệ lập trình website khá dễ học, tuy nhiên với những người mới làm quen với việc lập trình web thì đôi khi không thể tránh được những sai lầm. Nhất là khi làm việc với HTML, CSS chúng ta sẽ có rất nhiều thuộc tính phần tử và chúng có thể tương tác với nhau theo nhiều cách khác nhau. Một điểm nữa khiến các lập trình viên dễ mắc sai lầm khi code là việc HTML, CSS không báo lỗi. Bài viết này sẽ chỉ các lỗi thường mắc phải khi code HTML, CSS.

### 1. Sử dụng thuộc tính placholder thay vì label

Thông thường các lập trình viên sẽ sử dụng thuộc tính **placholder** thay vì sử dụng phần tử **label**.

Nhưng điều này đôi khi mang đến sự bất tiện cho người sử dụng ứng dụng, vì đôi khi người dùng không nhớ được họ đang nhập vào trường nào trên form và để điền tiếp nội dung cho ô input đó người dùng buộc phải xóa đi nội họ vừa điền để thấy được tên trường họ đang nhập. 
```
<input type="email" placeholder="Enter your email">
```
Vì vậy thay vì chỉ sử dụng **placholder** tôi khuyên các bạn nên dùng thêm phần tử **label**
```
<label>
  <span>Enter your email</span>
  <input type="email" placeholder="e.g. example@gmail.com">
</label>
```

### 2. Sử dụng thẻ <img> để hiển thị các icon
Đôi khi tôi thấy một số bạn sử dụng thẻ <img> để hiện thị các icon.
```
<a href="https://twitter.com" class="social">
  <img class="social__icon" src="twitter.svg" alt>
  <span class="social__name">Twitter</span>
</a>
```
Các icon là  các biểu tượng thường được các thư viện đã hỗ trợ sẵn, hoặc có thể do các đội phát triển tạo ra giúp người sử dụng ứng dụng hiểu nhanh hơn ý nghĩa của phần tử mà không cần đọc nhiều văn bản, tuy nhiên trong trường hợp này để không phải sử dụng thẻ <img> các bạn có thể sử dụng cách sau.
```
<a href="https://twitter.com" class="social">
  <span class="social__name">Twitter</span>
</a>
```
```
.social::before {
  background-image: url("twitter.svg");
}
```

### 3. Tắt thuộc tính reszie của thẻ textarea
Khi bạn sử dụng thuộc tính **resize: none** cho thẻ **textarea** việc này sẽ khiến người dùng không thể thay đổi khả năng thay đổi kích thước của input của người dùng.
```
textarea {
  width: 100%;
  height: 200px;
  resize: none;
}
```
Thay vì sử dụng **resize: none** cho thẻ **textarea** bạn có thể sử dụng các thuộc tính `min-width, max-width, min-height, max-height` để giới hạn khoảng không gian cho người dùng có thể thay đổi kích thước của  thẻ **textarea**. 
```
textarea {
  min-width: 100%;
  max-width: 100%;
  min-height: 200px;
  max-height: 400px;
}
```
Việc này vừa không làm mất chức năng thay đổi kích thước thẻ **textarea** cho người sử dụng và việc thay đổi kích thước của người dùng cũng nằm trong tầm kiểm soát của nhà phát triển mà không ảnh hưởng đến các phần tử khác.

### 4. Sử dụng thuộc tính display: block và position: absolute (fixed) cùng nhau
 
Đôi khi tôi lại thấy đoạn code như thế này 

```
.button::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
```
Nhưng vì trình duyệt đặt giá trị mặc định là block. Do đó, bạn không cần thêm giá trị này cho các phần tử có **position** là **fixed** hay **absolute**. Thay vì sử dụng đoạn code trên bạn có thể dùng đoạn code này :
```
.button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
}
```
### 5. Thiết lập giá trị none cho thuộc tính outline

Khi bạn sử dụng thuộc tính **outline** với giá trị **none** nghĩa là khi bạn sử dụng phím tab để chuyển con trỏ đến input, hay button mà bạn mong muốn thì input hay button đó sẽ không hiển thị lên các dấu hiệu cho thấy là nó đang được focus, điều này khá nguy hiểm, vì nếu không biết mình đang focus vào button nào mà lại bấm **enter** thì sẽ tạo ra các request không như ý.
```
.button:focus {
  outline: none;
}

/* or */

.button:focus {
  outline: 0;
}
```
Vậy nên lời khuyên trong trường hợp này là nếu tắt hiển thị của focus mặc định thì hãy tạo ra một hiển thị focus để thay thế 

```
.button:focus {
  outline: none;
  box-shadow: 0 0 3px 0 blue;
}
```
### 6. Để phần tử trống
Đôi khi tôi thấy một số bạn để các thẻ rỗng, sau đó thêm css cho thẻ đó hoặc với các mục đích khác nhau, ví dụ như dưới đây:
```
<button class="hamburger">
  <span></span>
  <span></span>
  <span></span>
</button>
```

```
.hamburger {
  width: 60px;
  height: 45px;
  position: relative;
}

.hamburger span {
  width: 100%;
  height: 9px;

  background-color: #d3531a;
  border-radius: 9px;

  position: absolute;
  left: 0;
}

.hamburger span:nth-child(1) {
  top: 0;
}

.hamburger span:nth-child(2) {
  top: 18px;
}

.hamburger span:nth-child(3) {
  top: 36px;
}
```

Tuy nhiên thay vì dùng cách trên, các bạn có thể sử dụng thẻ với : before và :: after để đạt được kết quả tương tự.
```
<button class="hamburger">
  <span class="hamburger__text">
    <span class="visually-hidden">Open menu</span>
  </span>
</button>
```

```
.hamburger {
  width: 60px;
  height: 45px;
  position: relative;
}

.hamburger::before,
.hamburger::after,
.hamburger__text::before {
  content: "";
  width: 100%;
  height: 9px;

  background-color: #d3531a;
  border-radius: 9px;

  position: absolute;
  left: 0;
}

.hamburger::before {
  top: 0;
}

.hamburger::after {
  top: 18px;
}

.hamburger__text::before {
  top: 36px;
}

.visually-hidden {
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px !important; 
  height: 1px !important; 
  overflow: hidden;
}
```

### 7. Kết luận
Như đã nói ở đầu bài viết HTML và CSS là 2 công nghệ phổ biến và bắt buộc phải biết khi lập trình website. Hy vọng thông qua bài viết này các bạn có thể ghi nhớ và tránh được các sai lầm mình đã nêu phía trên, qua đó cải thiện kỹ năng lập trình. Nếu các bạn có thắc mắc hay ý kiến đóng góp cho bài viết thì có thể comment phía bên dưới bài viết nhé. Cảm ơn vì đã đọc bài viết của mình !!!

### 8. Tài liệu tham khảo
1. https://developer.mozilla.org/en-US/docs/Web/CSS
1. https://devdocs.io/css/
1. https://dev.to/melnik909/the-6-most-common-mistakes-developers-when-writing-html-and-css-f92