# 7. Tuyết rơi
![](https://images.viblo.asia/0162913a-92e2-4a49-ab44-d585ce15b827.jpg)

[Code](https://codepen.io/matchboxhero/pen/JrLJeb?editors=1100) | [Review](http://usatoday.geex-arts.com/)

Tuyết được tạo ra bằng cách sử dụng SVG và kỹ thuật này rất giống với cách mình tạo ra các bong bóng trước đó. Để bắt đầu, mình tạo ra hai lớp vòng tròn bên trong một SVG, sau đó mình tạo hiệu ứng cho hai lớp đó bằng cách dịch giá trị Y với một hoạt ảnh khung hình chính. 

Chúng tôi áp dụng hoạt ảnh cho mỗi lớp thay vì các phần tử riêng lẻ và sử dụng lại cùng một hoạt ảnh cho cả hai lớp. Bằng cách đơn giản là cho chúng thời lượng khác nhau, mình có thể thêm độ sâu vào cảnh của mình.

```
.snow {
	position: absolute;
	min-width: 100vw;
	min-height: 100vh;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
}

.snow .svg {
	position: absolute;
	width: 100%;
	height: 100%;
}

#snow-top-layer {
	will-change: transform;
	transform: translateY(-768px);
	animation: fall 22.5s infinite linear;
}

#snow-bottom-layer {
	will-change: transform;
	transform: translateY(-768px);
	animation: fall 45s infinite linear;
}

@keyframes fall {
	100% {
		transform: translateY(0);
	}
	
}
```
# 8. Di chuyển nền;
![](https://images.viblo.asia/400922fa-e5c2-46c0-a2fa-7eb3379db630.jpg)

[Code](https://codepen.io/matchboxhero/pen/oGqJyd?editors=1100) | [Review](https://www.sbs.com.au/aviolentact/)

```
.container {
	position: relative;
	z-index: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background-color: #01161e;
	overflow: hidden;
	
	&__background {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('https://images.unsplash.com/photo-1500241770736-a3f62bbc8717');
		background-size: 150%;
		background-position: center center;
		animation: move 30s infinite linear;
		will-change: transform;
	}
}

.mask-container {
	position: relative;
	display: block;
	width: 100%;
	
	&::before,
	&::after {
		content: '';
		position: absolute;
		width: 5000%;
		height: 300%;
		left: 0;
		background-color: #01161e;
	}
	
	&::before {
		top: -295%;
	}
	
	&::after {
		bottom: -295%;
	}
}

svg {
	width: 100%;
	height: auto;
	// max-width: 1024px;	
}

@keyframes move {
	25% { transform: translateY(50px) translateX(0) }
	50% { transform: translateY(0px) translateX(50px) }
	75% { transform: translateY(50px) translateX(0) }	
}
```

# 9. Chuyển tiếp đầy màu sắc
![](https://images.viblo.asia/c84ab6db-5c81-4d73-9329-5e62ceb41a35.png)

[Code](https://codepen.io/matchboxhero/pen/XeEYJV?editors=1100) | [Review](http://da-ink.com/tattoos/)

Trang web Da-Ink sử dụng một kỹ thuật thực sự hiệu quả để chuyển đổi giữa các trang. Quá trình chuyển đổi rất đơn giản và bao gồm SVG chứa một số hình chữ nhật có kích thước khác nhau với các màu khác nhau được đặt trên đầu trang của nhau. 

Hoạt ảnh bao gồm việc chuyển đổi vị trí X theo chiều rộng của SVG. Sau đó, sử dụng nth-of-type , chúng tôi áp dụng sự chậm trễ, bù trừ từng 75ms từ lần cuối để tạo chuyển đổi suôn sẻ.

# 10. Xung vòng tròn
![](https://images.viblo.asia/a1f8ca34-a0c1-45f1-b2b1-533dadb204e5.jpg)

[Code](https://codepen.io/matchboxhero/pen/pWLOQb?editors=1100) | [Review](https://peekabeat.com/)

Các hiệu ứng xung được sử dụng trên trang web Peek-a-Beat đơn giản nhưng hiệu quả và không khó để tái sản xuất - bao gồm ba vòng tròn bên trong SVG, trong đó chúng tôi tạo hiệu ứng cho quy mô và độ mờ của chúng. 

# 11. Mở rộng làm nổi bật
![](https://images.viblo.asia/101f0782-f5a8-4247-bc28-cef75b45b868.jpg)

[Code](https://codepen.io/matchboxhero/pen/XeEYyy?editors=1100) | [Review](https://heartbeat.ua/)

Đây là một kỹ thuật rất đơn giản nhưng thực sự hiệu quả. Quá trình chuyển đổi được thực hiện bằng cách sử dụng **`::after`** phần tử giả. Để bắt đầu, phần tử giả được đặt ở dưới cùng trong khi kéo dài toàn bộ chiều rộng, nhưng chỉ có chiều cao vài pixel. 

Khi phần tử được tương tác với, chiều rộng và chiều cao của phần tử giả đều được chuyển sang 105% kích thước của cha mẹ (thay đổi là kịch tính hơn theo chiều dọc), cũng như chuyển đổi màu của văn bản. 

```
.highlight {
    display: inline-block;
    color: #343434;
    transition: color 250ms, text-shadow 250ms;
    text-decoration: none;
    text-shadow: 0px 1px 0px rgba(255, 255, 255, 1);

    position: relative;
    z-index: 0;

    &::after {
        position: absolute;
        z-index: -1;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        width: 100%;
        height: 3px;
        background-color: #343434;
        transition: all 250ms;
    }

    &:hover {
        color: white;
        text-shadow: 0px 1px 0px rgba(0, 0, 0, 1);

        &::after {
            height: 105%;
            width: 105%;
        }
    }
}
```

# 12. Biểu tượng menu quay
![](https://images.viblo.asia/4f41f2cf-5c62-4151-b2db-f9d872b64cd8.png)

[Code](https://codepen.io/matchboxhero/pen/XeEYJV?editors=1100)

Nút menu động được tạo bằng SVG. Các hình ảnh động xảy ra khi người dùng tương tác với nút menu. Hai quá trình chuyển tiếp diễn ra: nhóm tròn xung quanh menu xoay 360 độ và biểu tượng trình đơn ở giữa thay đổi màu sắc. 

Phần phức tạp nhất là hàm thời gian. Bằng cách sử dụng khối-bezier để đạt được kiểm soát hoàn toàn, chúng tôi có thể bắt đầu các hiệu ứng từ từ, cuộc đua qua phần giữa và làm chậm nó xuống một lần nữa ở cuối.

# 13. Gạch dưới từ trung tâm
![](https://images.viblo.asia/b9dbce44-ad51-4c43-94a0-05aec7a8f59a.jpg)

[Code](https://codepen.io/matchboxhero/pen/VMEWrq?editors=1100) | [Review](https://godofwar.playstation.com/)

Hoạt ảnh bao gồm định vị **`::after`** phần tử giả ở phía dưới và sau đó mở rộng quy mô khi nút được tương tác với.

# 14. Mở rộng góc
![](https://images.viblo.asia/cef06a40-949b-4027-b799-9ad84d000def.png)

[Code](https://codepen.io/matchboxhero/pen/WZaObN?editors=1100) | [Review](https://www.thepaaonline.org/)

Trang web Princess Alexandra Auditorium có một cách trực quan để hiển thị các thể loại của các chương trình của nó. Mỗi thẻ hiển thị có một góc tam giác được đặt trong một màu đại diện cho thể loại và sau đó, khi di chuột, tên của danh mục được hiển thị. 

Hiệu ứng được thực hiện bằng cách sử dụng **`::before`** và **`::after`** phần tử giả, chuyển đổi kích thước của hình tam giác và làm mờ tên khi phần tử được tương tác với.