Bài viết dưới đây của mình sẽ chia sẻ cách làm trái tim có "nhịp đập" bằng HTML và CSS. Mong rằng mọi người sẽ theo dõi hết bài viết này của mình.

# 1. Source code
Để làm một trái tim, cách làm của mình sẽ là tạo ra 2 hình elip, sau đó ghép lại với nhau.

Ở phần code HTML, mình sẽ tạo 1 div lớn có *class* là "*heart*", phía bên trong sẽ là 2 div nhỏ có class lần lượt là "left" và "right" - biểu thị cho hai hình elp phía bên trái và bên phải.

```
<div class="heart">
  <div class="left"></div> // Hình Elip bên trái
  <div class="right"></div> // Hình Elip bên phải
</div>
```

Công việc bây giờ sẽ là biến 2 div con trên trở thành 2 hình elip. Mình bắt đầu xây dựng css của 2 div này

```
.heart div {
	background: red;
	width: 71px;
	height: 126px;
	top: 40px;
	display: block;
	position: absolute;
	border-radius: 50%
}

.left {
	left: 45px;
}

.right{
	right: 45px;
}
```

Ta sẽ được 2 hình elip như hình dưới:

![](https://images.viblo.asia/32738674-b41f-4891-b702-89482af71736.png)

Việc tiếp theo phải làm là xoay lại 2 hình elip rồi ghép chúng vào với nhau để tạo thành một hình trái tim. 

Mình sẽ sử dụng thuộc tính `transform` của css và viết thêm css của class `.heart` để làm điều này.

```
.heart {
	width: 200px;
	height: 200px;
	top: 50%;
	left: 50%;
	z-index: 1;
	display: block;
	position: absolute;
	transform: translate(-50%,-50%)
}

.heart div {
	background: #ff0000;
	width: 71px;
	height: 126px;
	top: 40px;
	display: block;
	position: absolute;
	border-radius: 50%
}

.left {
	left: 45px;
	transform: rotate(330deg);
}

.right {
	right: 45px;
	transform: rotate(30deg);
}
```

Kết quả nhận được là:

![](https://images.viblo.asia/8a993127-9903-478e-9f74-9a1f05ca2e6c.png)

Như vậy là xong hình trái tim. Bây giờ là làm "nhịp đập" cho nó :).

Để giúp cho trái tim này có "nhịp đập", mình sẽ sử dụng 2 thuộc tính của CSS là `animation` và `@keyframes`.

CSS hoàn chỉnh sẽ là:

```
.heart {
	width: 200px;
	height: 200px;
	top: 50%;
	left: 50%;
	z-index: 1;
	display: block;
	position: absolute;
	transform: translate(-50%,-50%);
	animation: heart 1s ease infinite
}

@keyframes heart {
	96% {
		transform: translate(-50%,-50%) scale(.8,.8)
	}
	100% {
		transform: translate(-50%,-50%) scale(1,1)
	}
}

.heart div {
	background: #ff0000;
	width: 71px;
	height: 126px;
	top: 40px;
	display: block;
	position: absolute;
	border-radius: 50%
	}

.left {
	left: 45px;
	transform: rotate(330deg);
}

.right {
	right: 45px;
	transform: rotate(30deg);
}

```

Sau khi hoàn tất phần này, thành quả của chúng ta có sẽ là một trái tim có "nhịp đập" đàng hoàng nhé :).

Đây chính là thành quả cuối cùng:

{@embed: https://codepen.io/longhaieva/pen/OdLNNo}

# 2. Lời kết
Vừa rồi mình đã hướng dẫn các bạn cách tạo một hình trái tim có "nhịp đập" bằng CSS và HTML. Mong rằng bài viết của mình sẽ giúp ích được cho các bạn trong quá trình sáng tạo sản phẩm hay với HTML và CSS.

Tham khảo: Animated Heart by [Amli](https://codepen.io/uzcho_/)