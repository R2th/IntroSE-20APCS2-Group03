## Giới thiệu
Knockout text là một kỹ thuật trong đó các chữ được tách ra background. Nói cách khác, nó cho phép bạn nhìn thấy nền bên bên dưới các chữ tạo cảm giác như những chữ nó được đục lỗ để nhìn xuyên qua. Phương pháp này khá hấp dẫn bởi vì nó mở ra cách tạo ra các kiểu chữ mà chúng ta có thể thoát ra khỏi các thuộc tính CSS truyền thống. Tôi đã có 1 bài viết nói qua về phương pháp này bằng cách sử dụng “background-clip” cách bạn có thể xem lại tại ["đây"](https://viblo.asia/p/cach-tao-tieu-de-dep-voi-css3-djeZ1REjlWz) 
## Cách thực hiện
**1. sử dụng Mix Blend Modes**

Chúng ta có 4 mix-blend dễ dành thực hiện loại bỏ màu của văn bản đó là multiply, screen, darken, và  lighten. Khi kết hợp mix-blend-mode với hình ảnh và text sẽ tạo ra hiệu ứng Knockout text khá là bắt mắt.

**HTML:**
```
<div class="backdrop">
    <p class="text">ThangTV</p>
</div>
```
**CSS:**
```
.backdrop {
    background:             url("https://rpsthecoder.github.io/img-repo/Taitō%20by%20Jezael%20Melgoza.jpg") center;
    background-size:        contain;
    margin:                 auto;
    width:                  75vw;
}

.text {
    color:              white;
    border:             4px solid;
    background:         rgb(59, 2, 6);
    mix-blend-mode:     multiply;
    font:               bolder 12vw 'Alfa Slab One';
    text-align:         center;
    margin:             0;
}
```
{@embed: https://codepen.io/TrinhThang/pen/EBgGMR}

Trong ví dụ trên mình sử dụng  blen-mode là multiply, ở chế độ này các bạn có thể hiểu những màu tối hơn sẽ được giữ lại và hơi mờ mờ còn văn bản màu trắng trở nên hoàn toàn nhìn xuyên thấu cho phép nhìn thấy hình ảnh ở phía sau qua các chữ.

Chế độ mix-blend-mode: screen thì ngược lại với chế độ multiply màu tố hơn sẽ trở nên trong suốt và xuyên qua. Còn màu sáng thì được giữ lại

Các chế độ darken và lighten tương tự như multiply và Screen, phần chữ trở nên trong suốt thì các phần hình ảnh phía sau gần như k nhìn thấy ảnh phía sau  với darken thì nó sẽ tối hơn và lighten thì sáng hơn.

**HTML:**
```
<div class="backdrop">
	<p class="text multiply">ThangTV</p>
</div>
<div class="backdrop">
	<p class="text screen">ThangTV</p>
</div>
<div class="backdrop">
	<p class="text darken">ThangTV</p>
</div>
<div class="backdrop">
	<p class="text lighten">ThangTV</p>
</div>
```
**CSS:**
```
.backdrop {
	background: url("https://rpsthecoder.github.io/img-repo/Taitō%20by%20Jezael%20Melgoza.jpg") center;
	background-size: contain;
	margin: auto;
	margin-top: 40px;
	width: 75vw;
}

.text {
	font: bolder 12vw "Alfa Slab One";
	text-align: center;
	margin: 0;
	border: 4px solid;
}

.multiply {
	color: white;
	mix-blend-mode: multiply;
	background-color: rgba(59, 2, 6, 1);
}

.screen {
	color: black;
	mix-blend-mode: screen;
	background-color: rgba(244, 220, 211, 1);
}

.darken {
	color: white;
	mix-blend-mode: darken;
	background-color: rgba(59, 2, 6, 1);
}

.lighten {
	color: black;
	mix-blend-mode: lighten;
	background-color: rgba(244, 220, 211, 1);
}

```
{@embed: https://codepen.io/TrinhThang/pen/mZragb}

Ngoài ra ta có thể tạo ra các hiệu ứng khác kết hợp cùng mix-blend-mode Như text shadow hoặc animation như ví dụ bên dưới:

**HTML:**
```
<div class="backdrop">
    <p class="text">ThangTV</p>
</div>
```

**CSS:**
```
.backdrop {
	background: url("https://rpsthecoder.github.io/img-repo/Taitō%20by%20Jezael%20Melgoza.jpg")
		center;
	background-size: contain;
	margin: auto;
	width: 75vw;
}

.text {
	color: white;
	border: 4px solid;
	background: rgb(59, 2, 6);
	mix-blend-mode: multiply;
	font: bolder 12vw "Alfa Slab One";
	text-align: center;
	margin: 0;
	animation: glow 3s infinite;
}

@keyframes glow {
	0% {
		text-shadow: 0 0 10px white;
	}

	15% {
		text-shadow: 2px 2px 10px rgba(255, 255, 255, 1),
				   -2px -2px 10px rgba(255, 255, 255, 1);
	}
	30% {
		text-shadow: 2px 2px 4px rgba(255, 255, 255, .7),
				   -2px -2px 4px rgba(255, 255, 255, .7);
	}
	50% {
		text-shadow: 20px 20px 50px rgba(255, 255, 255, .5),
				   -20px -20px 50px rgba(255, 255, 255, .5);
	}
}

```
{@embed: https://codepen.io/TrinhThang/pen/LKRadW}

## Kêt luận
Như vậy ở bài viết này tối giới thiêụ thêm với các bạn 1 kĩ thuật Knockout text với CSS nữa để có thể tạo ra những typography thất bắt mắt. Các bạn cần nhớ thuộc tính Thuộc tính background-clip được hỗ trợ bởi tất cả các trình duyệt, nhưng vẫn yêu cầu tiền tố -webkit. Chúc các bạn thành công