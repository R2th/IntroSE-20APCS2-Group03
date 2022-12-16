Hòa chung không khí vui mừng của giới thiên văn khi chụp được ảnh Lỗ đen, mình đã tham khảo và làm 1 animation nhỏ bằng css về cái này.
Đối tượng bao gồm:
- Vũ trụ: nền đen.
- lỗ đen, là trung tâm
- vành sáng: quanh lỗ đen, như ảnh là màu cam
- 1 hành tinh đang bị hút dần vào vào, quay tròn quanh lỗ đen
- vầng sáng quanh hành tinh đang bị hút đó.

animation bao gồm
lỗ đen tự quay
hành tinh tự quay xung quanh lỗ đen
ánh sáng khi hành tinh bay xung quanh

vũ trụ: 
```
body {
  background: #000;
  display: grid;
  place-content: center;
  height: 100vh;
  filter: blur(8px); // global filter blur cho tất cả tạo hiệu ứng mờ như ảnh
}
```

lỗ đen: 
```
b {
  width: 50vmin;
  height: 51vmin;
  box-shadow: 1vmin 0 3vmin 2vmin #f50,  // vầng sáng xung quanh
       inset -1vmin 0 3vmin 4vmin #f80,
             -4vmin 0 35vmin 0 #f60;
  animation: bh 5s linear infinite;
}
```

animation: 
```
@keyframes bh {
  0% {transform: rotate(0deg)}
  100% {transform: rotate(-360deg)}
}
```

Tránh tạo nhiều div nên mình tận dụng :after & :before của tag <b> (túc là lỗ đen ở trên)
    
```
b, b:before, b:after {
  display: block;
  border-radius: 50%;
}
```
    
```
b:before, b:after {
  content: "";
  background: white;
  position: relative;
  top: 6vmin;
}
b:before {
  width: 3vmin;
  height: 3vmin;
  left: 40vmin;
  box-shadow: yellow 0 0 2vmin 2vmin,
              yellow 2vmin 4vmin 2vmin 0.5vmin;
}

```
b:before là hành tinh quay xung quanh, như bạn thấy là có màu vàng như ở trên, màu tạo bằng box-shadow luôn.
b:after là quầng sáng đi cùng với hành tinh đó, màu nhạt hạt
```
b:after {
  width: 38vmin;
  height: 38vmin;
  opacity: 0.03; // quầng sáng này màu tráng và có opacity để tao hiệu ứng ánh sáng mờ mờ 
  left: -14vmin;
}
```
Demo:
    {@embed: https://codepen.io/buiduccuong30051989/pen/qwYZZw}