### Giới thiệu
Chào mọi người !
Hôm nay mình sẽ biết tut nho nhỏ về thêm 1 cách nữa giúp chúng ta căn Text chữ vào vị trí trung tâm của 1 line hay border nằm ngang đơn giản bằng CSS Flexbox nhé.
Cái này hay dùng ở chỗ làm Header của 1 block hay tiêu đề của nội dung khi biết cách làm dễ như thế này chúng ta có thể viết và tùy biến nó dễ dàng theo mong muốn.


###  Cách làm
**HTML**
<br>
HTML chỉ cần đơn giản thế này
```HTML
<div class="text-divider">Make Awesome Things That Matter</div>
```
**CSS**
<br>
CSS chúng ta sẽ làm như sau
```CSS
.text-divider {
  display: flex;
  align-items: center;
  --text-divider-gap: 1rem;
}
.text-divider::before,
.text-divider::after {
  content: '';
  height: 1px;
  background-color: #333;
  flex-grow: 1;
}
.text-divider::before {
  margin-right: var(--text-divider-gap);
}
.text-divider::after {
  margin-left: var(--text-divider-gap);
}
```
Cái var(--text-divider-gap) là cái biến chúng ta define trước để căng margin giữa text bên trái vs bên phải so với border nhé.
Để margin 1rem thì sẽ được như Demo bên dưới nhé.
```CSS
.text-divider::before {
  margin-right: 1rem;
}
.text-divider::after {
  margin-left: 1rem;
}
```

### Demo
Các bạn xem demo bên dưới nhé.
{@embed: https://codepen.io/Truelove/pen/KKpBYgX}

### Lời kết
Hi vọng với tech nho nhỏ này sẽ giúp các bạn có thêm 1 cách nữa để viết Ttext header có Line border phân chia ở 2 bên nhé.<br>
Cảm ơn các bạn đã đọc bài !