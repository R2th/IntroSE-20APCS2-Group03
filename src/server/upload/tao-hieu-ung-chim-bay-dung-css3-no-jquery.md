![](https://images.viblo.asia/a4192010-91c5-4939-9f0c-c64e473b1b01.jpg)
hôm nay tôi  sẽ  tạo ứng dụng hiển thị Chim Bay  trên website hoặc blog. Với sự hỗ trợ từ CSS3 animation, mà các bước thực hiện thì cực kỳ đơn giản, sẽ không khó để các bạn có thể hiểu.
### **The Graphics**
![](https://images.viblo.asia/f17f6cf3-fd6f-469a-a80d-7e8d4c238963.png)
### **HTML**
Trước hết, chúng ta sẽ tạo định dạng html cho chú chim sẽ hiển thị như sau :
```
	<div class="bird-container">
		<div class="bird"></div>
	</div>
```

Trong đoạn html bên trên, thẻ div với class là ” bird-container ” sẽ là nơi chứa khung chứa đủ hình ảnh 1 chú chim
Những class  "bird" sẽ chứa hình ảnh chứa chú chim với các trạng thái bay khác nhau , các bạn có thể xem ở phần hình ảnh bên trên

### **CSS**

```
.bird {
  background-image: url('bird.svg');
  background-size: auto 100%;
  width: 88px;
  height: 125px;
  will-change: background-position;
     // hiệu ưng
  animation-name: fly-cycle;
    animation-duration: 1s;
    animation-delay: -0.5s;
    animation-timing-function: steps(10);
    animation-iteration-count: infinite;
}
@keyframes fly-cycle {
  100% {
  background-position: -900px 0;
  } 
}

```
 [  DEMO LINK](https://codepen.io/But/pen/zjbRGd)
{@codepen: https://codepen.io/But/pen/zjbRGd}
Qua bài viết này, các bạn sẽ có thêm kinh nghiệm trong việc sử dụng hàm animation và có thể áp dụng cho những ứng dụng khác sau này.
Xin cảm ơn!