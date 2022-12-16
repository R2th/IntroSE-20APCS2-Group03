Barcode(mã vạch) là sự thể hiện thông tin trong các dạng nhìn thấy trên các bề mặt của sản phẩm, hàng hóa mà máy móc có thể đọc được.
Nguyên thủy thì mã vạch lưu trữ dữ liệu theo bề rộng của các vạch được in song song cũng như của khoảng trống giữa chúng, nhưng ngày nay chúng còn được in theo các mẫu của các điểm, theo các vòng tròn đồng tâm hay chúng ẩn trong các hình ảnh. Mã vạch có thể được đọc bởi các thiết bị quét quang học gọi là máy đọc mã vạch hay được quét từ hình ảnh bằng các phần mềm chuyên biệt.

![](https://images.viblo.asia/acd45af6-21d5-4fc0-862f-ef30eff360b3.png)

**Tiện ích của mã vạch giúp ích cho các doanh nghiệp rất nhiều:**

- Quản lý bảo hành sản phẩm
- Quản lý giá cả
- Bảo vệ thương hiệu sản phẩm
- Truy xuất nguồn gốc sản phẩm
- Hỗ trợ truyền thông, marketing
- ...

Dưới đây mình giớ thiệu đến các bạn 1 ví dụ nhỏ mô tả barcode và hiệu ứng quét barcode đơn giản bằng HTML & CSS.

**HTML:**

```html
<head>
  <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'>
</head>
<body>
  <div class='spacer'></div>
  <div class='anim-box center spacer'>
    <div></div>
    <div class='scanner'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-lg'></div>
    <div class='anim-item anim-item-lg'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-lg'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-md'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-md'></div>
    <div class='anim-item anim-item-lg'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-lg'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-lg'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-lg'></div>
    <div class='anim-item anim-item-sm'></div>
    <div class='anim-item anim-item-md'></div> 
  </div>
  <div class='spacer'></div>
</body>
```

**CSS:**

```css
body {
	font-family: Lato;
  font-weight: 400;
	background-color: #26282a;
	color: white;
}

.center {
	margin: 0 auto;
	text-align: center;
}

.spacer {
	margin-top: 6rem;
}

.anim-box {
	position: relative;
	width: 220px;
	height: 100px;
	padding: 25px 30px;
	transition: transform .6s ease-out;
}

.anim-box:before, .anim-box:after, .anim-box>:first-child:before, .anim-box>:first-child:after {
	position: absolute;
	width: 10%; height: 15%;
	border-color: white; 
	border-style: solid;
	content: ' ';
}

.anim-box:before {
	top: 0; left: 0;
	border-width: 2px 0 0 2px;
}

.anim-box:after {
	top: 0; right: 0;
	border-width: 2px 2px 0 0;
}

.anim-box>:first-child:before {
	bottom: 0; right: 0;
	border-width: 0 2px 2px 0;
}

.anim-box>:first-child:after {
	bottom: 0; left: 0;
	border-width: 0 0 2px 2px;
}

.anim-item {
	display: inline-block;
	background-color: white;
	height: 100px;
}

.anim-item-sm {
	width: 2px;
	margin-right: 3px;
}

.anim-item-md {
	width: 3px;
	margin-right: 2px;
}

.anim-item-lg {
	width: 5px;
	margin-right: 5px;
}

.anim-box:hover {
	transform: scale(1.5, 2);
}

.anim-box:hover .scanner {
  animation-play-state: running;
}

.scanner {
	width: 100%;
	height: 3px;
	background-color: red;
  opacity: 0.7;
  position:relative;
  box-shadow: 0px 0px 8px 10px rgba(170, 11, 23, 0.49);
  top:50%;
  animation-name: scan;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: paused;
}

@keyframes scan {
  0% {
    box-shadow: 0px 0px 8px 10px rgba(170, 11, 23, 0.49);
    top: 50%;
  }  
  25% {
    box-shadow: 0px 6px 8px 10px rgba(170, 11, 23, 0.49);
    top: 5px;
  }
  75% {
    box-shadow: 0px -6px 8px 10px rgba(170, 11, 23, 0.49);
    top: 98%;
  }
}
```

**Link demo**

{@embed: https://codepen.io/hoatnv/pen/jXExaO}

Cảm ơn bạn đã theo dõi bài viết !