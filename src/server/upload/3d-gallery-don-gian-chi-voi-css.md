###  Giới Thiệu
Tạo thư viện ảnh sáng tạo, tự động, chỉ với CSS xoay qua các hình ảnh trong không gian 3D đơn giản mà không cần sử dụng javascript.
Bên dưới là các bước thực hiện. Các bạn có thể tham khảo tại codepen này nhé:

{@codepen: https://codepen.io/oBuiThiHuyen/pen/oNLzMNE}

### Các Bước Thực Hiện

1.  Tạo HTML và add images vào để tạo khung list ảnh

```html
<div class="rotator">
  <div class="items">
    <img src="1.jpg" alt="Image Alt" />
  </div>
  <div class="items">
    <img src="2.jpg" alt="Image Alt" />
  </div>
  <div class="items">
    <img src="3.jpg" alt="Image Alt" />
  </div>
  <div class="items">
    <img src="4.jpg" alt="Image Alt" />
  </div>
  <div class="items">
    <img src="5.jpg" alt="Image Alt" />
  </div>
  <div class="items">
    <img src="6.jpg" alt="Image Alt" />
  </div>
  <div class="items">
    <img src="7.jpg" alt="Image Alt" />
  </div>
  <div class="items">
    <img src="8.jpg" alt="Image Alt" />
  </div>
  <div class="items">
    <img src="9.jpg" alt="Image Alt" />
  </div>
</div>
```

2.  Styles cho thư viện ảnh xoay tròn

```css 
.rotator {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 55%;
  height: 150px;
  transform-style: preserve-3d;
  animation: roter 17s linear infinite;
}

.rotator:hover {
  animation-play-state: paused;
}

@keyframes roter {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

.items {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 2px solid #333;
}

.items:hover img {
  transform: scale(1.2);
}

.items img {
  height: 100%;
  width: 100%;
  transition: all 3s ease;
}
```


3.  Xác định vị trí ban đầu của mỗi ảnh

```css 
.items:first-child {
  transform: rotateY(calc(40deg * 1)) translateZ(300px);
}

.items:nth-child(2) {
  transform: rotateY(calc(40deg * 2)) translateZ(300px);
}

.items:nth-child(3) {
  transform: rotateY(calc(40deg * 3)) translateZ(300px);
}

.items:nth-child(4) {
  transform: rotateY(calc(40deg * 4)) translateZ(300px);
}

.items:nth-child(5) {
  transform: rotateY(calc(40deg * 5)) translateZ(300px);
}

.items:nth-child(6) {
  transform: rotateY(calc(40deg * 6)) translateZ(300px);
}

.items:nth-child(7) {
  transform: rotateY(calc(40deg * 7)) translateZ(300px);
}

.items:nth-child(8) {
  transform: rotateY(calc(40deg * 8)) translateZ(300px);
}

.items:nth-child(9) {
  transform: rotateY(calc(40deg * 9)) translateZ(300px);
}
```

###  Kết
Đơn giản không ạ, chỉ cần 3 bước đơn giản, anh em đã có 1 thư viện ảnh vô cùng sáng tạo :D
tài liệu tham khảo: https://www.cssscript.com/3d-rotator-gallery/