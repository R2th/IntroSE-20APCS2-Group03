Xu hướng "website thân thiện" ngày càng trở nên phổ biến. Ngoài yếu tố đơn giản, gọn gàng, thì các hiệu ứng chuyển động trên trang web cũng đóng một phần không nhỏ vào việc thu hút người dùng. Với sự phát triển của phần cứng, các hiệu ứng chuyển động (animation) dần dần được áp dụng trên website nhiều hơn.
Với sự ra đời của HTML5 cùng với CSS3 (Cascading Style Sheet Level 3), việc tạo nên các animation đã trở nên dễ dàng hơn rất nhiều so với việc sử dụng Javascript API như trước đây. Nhưng cho dù bạn có học thuộc lòng các animation rules và  properties của CSS3 đi nữa thì việc sử dụng chúng để xây dựng lên được một hiệu ứng chuyển động theo ý muốn vẫn là vấn đề khá khó khăn :laughing:
**- Vậy, làm sao để  gặp nhạc nào quẩy nhạc đấy trong css animation?** :scream:
Okey, việc đầu tiên là các bạn phải nắm được lý thuyết đã, có 1 vài thứ quan trọng các bạn buộc phải biết:
- [CSS @keyframes ](https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp)và các thuộc tính của nó.
- Sử dụng [css keyframes animation](https://www.w3schools.com/css/css3_animations.asp).
Đã có rất nhiều bài viết về CSS Animations bằng rất nhiều ngôn ngữ nên mình không muốn viết lại nữa, mình sẽ tập trung đi vào từng bước và ví dụ luônnn :joy:

Lấy ví dụ một cái hiệu ứng (ơ mình tạm gọi là hiệu ứng dọn rác) trên một app đang có trên máy mình nhé, cùng xem qua nào!
![](https://images.viblo.asia/792b6eab-69bd-4624-902d-d114c2b79d23.gif)

Uây, nhìn cũng khá nguy hiển đó chứ :joy: ok, giờ chúng ta sẽ phân tích các thành phần chuyển động của hiệu ứng này nhé

Đầu tiên là phân tích thành phần view, nhìn qua thì hiệu ứng này bao gồm 2 view, là cái cánh quạt kia và hình chiếc lá
![](https://images.viblo.asia/68cb1eff-a54f-4a87-94e7-75738734ab87.png)https://images.viblo.asia/68cb1eff-a54f-4a87-94e7-75738734ab87.png

Tiếp theo là phân tích đến thành phần chuyển động, bước này cực kỳ quan trọng nhé, xác định càng chuẩn xác thì càng có keyframe xịn xò:
![](https://images.viblo.asia/07a44821-8145-4ccb-8ceb-1935cdacd773.PNG)https://images.viblo.asia/07a44821-8145-4ccb-8ceb-1935cdacd773.PNG

Quan sát kỹ ta thấy có các chuyển động chính sau:
 Line 1: chuyển động xoay(rotate) của cái jet engine (cánh quạt) kia
 Line 2: Chuyển động xoay quanh tâm của chiếc lá
 Line 3: Chuyển động của chiếc lá xoay quanh tâm của cánh quạt
 Line 4: Chuyển động dịch chuyển của chiếc lá dần vào tâm của cánh quạt
 Line 5: Kích thước chiếc lá thay đổi nhỏ dần lại (scale)
 Sử dụng nhiều view lá sẽ cho ra hiệu ứng như demo
 Nếu là android, để làm view này bằng java or kotlin mình sẽ phải vẽ và tính toán rất nhiều, xác định tọa độ tâm, rồi giải phương trình đường tròn để xác định tọa độ điểm các kiểu...nhưng ơn giời, đây là css, chúng ta sẽ chỉ  sử dụng css thôi nhé :ok_hand: 
 Okey, Vậy là ta đã có kịch bản, vậy từ kịch bản ta sẽ kết hợp với hiểu biết đã có của chúng ta để dựng lên một layout cơ bản như này
 
![](https://images.viblo.asia/9fb18b2a-dbd0-43bb-bb4e-78e2abccbd0e.PNG)
Nhìn hơi ngu nhỉ, nhưng không sau, css sẽ giải quyết vấn đề đó :joy:
Nào, code thêm 1 tí nào
 **HTML**
```
    <div class="scan-block">
        <div class="jet-engine-container">
            <img class="jet-engine" src="./img/jet_engine.png" />
        </div>
        <div class="leaf-container">
            <div class="leaf-group">
                <img src="./img/ic_leaf_green.png" class="leaf leaf-l" style="--leaf-size:80px; --offset:30px;  --leaf-duration:3s" />
            </div>
        </div>

    </div>
    </div>
```

**CSS**
```
.scan-block{
	width: 500px;
	height: 500px;
	background: #34495e;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow:hidden;
}
.jet-engine-container{
	width: 200px;
	height: 200px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.scan-block .jet-engine{
	width: 200px;
	height: 200px;
}

.leaf-group{
    position: absolute;
    width: 500px;
    height: 500px;
}
.leaf{
	position: absolute;
	width: var(--leaf-size);
	height: var(--leaf-size);
}

.leaf-l{
	left: calc(-1 * var(--leaf-size));
	top: var(--offset);
}
```

Giải thích một chút về đoạn trên kia nhỉ?
Ở đây chúng ta có rất nhiều lá, và chúng sẽ chuyển động từ 4 cạnh của view cha nên mỗi chiếc lá mình quy định bằng 1 ảnh như sau:
```
<img src="./img/ic_leaf_green.png" class="leaf leaf-l" style="--leaf-size:80px; --offset:30px;  --leaf-duration:3s" />
```


 -leaf-l, leaf-r, leaf-t, leaf-b là css cho những chiếc lá ở các vị trí tương ứng với side left, right, top và bottom
 Để cho có sự tự nhiên, chúng ta sẽ random các thuộc tính các thuộc tính style bằng cách sử dụng var() để get giá trị trong css, ([đọc thêm về var() tại w3c](https://www.w3schools.com/css/css3_variables.asp)):
 - leaf-size: Kích thước ban đầu của lá
 - offset: Vị trí của lá
 - leaf-duration:  thời gian thực hiện chuyển động của lá
 
 ![](https://images.viblo.asia/a03243b9-1d79-41fc-9a30-c20560f35c5f.gif)
Thử với 1 chiếc lá xem nào :kissing_closed_eyes: nhìn cũng có vẻ đẹp trai đấy =))

 Đó, sau một hồi coppy và paste mình đã có 1 mớ lá như thế này :grinning:
 
 
```
		<div class="leaf-item">

			<img src="./img/ic_leaf_green.png" class="leaf leaf-l" style="--leaf-size:80px; --offset:30px;  --leaf-duration:3s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-l" style="--leaf-size:40px; --offset:50px;  --leaf-duration:6s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-l" style="--leaf-size:60px; --offset:430px;  --leaf-duration:5s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-l" style="--leaf-size:75px; --offset:120px;  --leaf-duration:2s" />

			<img src="./img/ic_leaf_green.png" class="leaf leaf-r" style="--leaf-size:80px; --offset:30px;  --leaf-duration:3s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-r" style="--leaf-size:40px; --offset:50px;  --leaf-duration:6s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-r" style="--leaf-size:60px; --offset:330px;  --leaf-duration:5s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-r" style="--leaf-size:75px; --offset:120px;  --leaf-duration:2s" />

			<img src="./img/ic_leaf_green.png" class="leaf leaf-t" style="--leaf-size:80px; --offset:30px;  --leaf-duration:3s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-t" style="--leaf-size:40px; --offset:350px;  --leaf-duration:6s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-t" style="--leaf-size:60px; --offset:30px;  --leaf-duration:5s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-t" style="--leaf-size:75px; --offset:120px;  --leaf-duration:2s" />

			<img src="./img/ic_leaf_green.png" class="leaf leaf-b" style="--leaf-size:80px; --offset:30px;  --leaf-duration:3s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-b" style="--leaf-size:40px; --offset:250px;  --leaf-duration:6s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-b" style="--leaf-size:60px; --offset:30px;  --leaf-duration:5s" />
			<img src="./img/ic_leaf_green.png" class="leaf leaf-b" style="--leaf-size:75px; --offset:120px;  --leaf-duration:2s" />

		</div>
```

Class **leaf-item** sẽ đảm nhận việc làm cho đám lá kia xoay quanh tâm của cánh quạt
Class **leaf** làm cho chiếc lá tự quay quanh tâm của nó, và scale nhỏ dần lại

Từ kịch bản, và đống HTML bạn vừa dựng kia ta sẽ bắt tay vào xây dựng css keyframes cho chúng. Ở đây mình sử dụng 5 keyframe cho hiệu ứng chuyển động trên:

```
@-webkit-keyframes jet-rotation { //hiệu ứng xoay xoay cho cánh quạt
	from {
		-webkit-transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(10359deg);
	}
}

@-webkit-keyframes leaf-group-rotation {  //hiệu ứng cho đám lá quay quanh trục của cánh quạt
	from {
 		 transform: scale(1) rotate(0deg);
	}
	to {
		 transform: scale(0.5) rotate(870deg); 
	}
}
@-webkit-keyframes leaf-spin-l { //hiệu ứng xoay, di chuyển ra tâm cánh quạt, và rồi biến mất cho từng chiếc lá (phía side bên trái)
    0% { transform:scale(1,1); }
    99% { top: 50%; left: 50%; transform:scale(0.2,0.2) rotate(1110deg); opacity:1}
    100% { top: 50%; left: 50%; transform:scale(0.2,0.2) rotate(1110deg);opacity: 0}
}

@-webkit-keyframes leaf-spin-r { //hiệu ứng xoay, di chuyển ra tâm cánh quạt, và rồi biến mất cho từng chiếc lá (phía side bên phải)
    0% { transform:scale(1,1); }
    99% { top: 50%; right: 50%; transform:scale(0.2,0.2) rotate(1110deg); opacity:1}
    100% { top: 50%; right: 50%; transform:scale(0.2,0.2) rotate(1110deg);opacity: 0}
}
@-webkit-keyframes leaf-spin-t { //hiệu ứng xoay, di chuyển ra tâm cánh quạt, và rồi biến mất cho từng chiếc lá (phía side bên trên)
    0% { transform:scale(1,1); }
    99% { top: 50%; top: 50%; transform:scale(0.2,0.2) rotate(1110deg); opacity:1}
    100% { top: 50%; top: 50%; transform:scale(0.2,0.2) rotate(1110deg); opacity: 0}
}
@-webkit-keyframes leaf-spin-b { //hiệu ứng xoay, di chuyển ra tâm cánh quạt, và rồi biến mất cho từng chiếc lá (phía side bên dưới)
    0% { transform:scale(1,1); }
    99% { bottom: 50%; left: 50%; transform:scale(0.2,0.2) rotate(1110deg); opacity:1}
    100% { bottom: 50%; left: 50%; transform:scale(0.2,0.2) rotate(1110deg);opacity: 0}
}
```


Áp dụng vào animation nào!!
```
.scan-block .jet-engine{
	width: 200px;
	height: 200px;
	-webkit-animation: jet-rotation 10s ease-in-out; //ease-in-out -> giúp cánh quạt quay nhanh dần theo thời gian và giảm dần tốc độ khi về cuối
}

.leaf-group{
    position: absolute;
    width: 500px;
    height: 500px;
	-webkit-animation: leaf-group-rotation 6s  linear;
}
.leaf{
	position: absolute;
	width: var(--leaf-size);
	height: var(--leaf-size);
}

.leaf-l{
	left: calc(-1 * var(--leaf-size));
	top: var(--offset);
	animation: leaf-spin-l ease-in forwards;  //ease-in-> lá sẽ chuyển động và xoay nhanh dần theo thời gian, cho cảm giác chiếc lá bị hút mạnh hơn khi càng ở gần cánh quạt
	animation-duration: var(--leaf-duration);
}

.leaf-r{
	right: calc(-1 * var(--leaf-size));
	top: var(--offset);
	animation: leaf-spin-r ease-in forwards; //forwards-> khi kết thúc quá trình, thì ở nguyên vị trí kết thúc chứ không quay trở về vị trí ban đầu, tránh cảm giác nhìn chiếc lá bị giật
	animation-duration: var(--leaf-duration);
}

.leaf-t{
	top: calc(-1 * var(--leaf-size));
	left: var(--offset);
	animation: leaf-spin-t ease-in forwards;
	animation-duration: var(--leaf-duration);
}

.leaf-b{
	bottom: calc(-1 * var(--leaf-size));
	left: var(--offset);
	animation: leaf-spin-b ease-in forwards;
	animation-duration: var(--leaf-duration);
}
```

Vậy thôi, đơn giản vậy thôi :D, giờ cùng xem thành quả nhé:
{@embed: https://codepen.io/hoangmobi/pen/rgRazg}

Hơn 2 giờ sáng rồi, nhìn nó quay mà buồn ngủ quá, mình làm hộp milo rồi đi ngủ đây ạ! Hẹn gặp lại ở những tutorial về view/animation  tiếp theo của mình :kissing_heart: