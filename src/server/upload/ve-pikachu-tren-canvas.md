# 1.Giới thiệu
`Canvas` là một thẻ trong html5 với mục đích vẽ đồ hoạ trên web thông qua `Javascript`. Cho đến hiện tại thì hầu hết trình duyệt đều có support `Canvas`. Dưới đây là các phiên bản trình duyệt đầu tiên có support `Canvas`

![](https://images.viblo.asia/78a301f3-c52e-4083-84f1-f03881ee4ffb.png)
(source: https://www.w3schools.com)

Trong bài viết này mình sẽ giới thiệu một số API của `Canvas` và ứng dụng của chúng để vẽ một ví dụ nho nhỏ :D

# 2.API

Để bắt đầu sử dụng `Canvas` thì chúng ta cần chèn thẻ `<canvas>` vào `html`

```
<canvas id="canvas" width="500" height="500"></canvas>
```

Lệnh trên sẽ tạo ra một `Canvas` có kích cỡ `500px x 500px`.

Tiếp theo chúng ta sẽ bắt đầu vẽ trên `Canvas` thông qua `Javascript`

```
var c = document.getElementById("canvas"); (Lấy tham chiếu của phần tử canvas và gán nó vào biến c)
var ctx = c.getContext("2d"); (chọn kiểu vẽ là 2d)
```

Sau đó chúng ta có thể sử dụng các API để bắt đầu vẽ

Vẽ một đường thẳng
```
ctx.moveTo(0, 0);
ctx.lineTo(100, 100);
ctx.stroke();
```

Vẽ một hình tròn
```
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.stroke();
```

Vẽ một đường cong có 1 `control point`
```
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.quadraticCurveTo(50, 50, 0, 100);
ctx.stroke();
```

Vẽ một đường cong có 2 `control point`
```
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.bezierCurveTo(50, 50, 0, 100, 50, 150);
ctx.stroke();
```

# 3.Pikachu
Giờ chúng ta sẽ bắt đầu sử dụng các API phía trên để vẽ 1 nhân vật rất nổi tiếng :D

Chúng ta khai báo một `Canvas` trong code `html`
```
<canvas id="myC" width="500px" height="400px"></canvas>
```
Và `Javascript`
```
var c = document.getElementById("myC");
var ctx=c.getContext("2d");
```

Chúng ta sẽ bắt đầu vẽ từ phần đuôi đầu tiên
```
ctx.beginPath();
ctx.moveTo(293,265);
ctx.lineTo(320,255);
ctx.lineTo(305,240);
ctx.lineTo(360,215);
ctx.lineTo(320,170);
ctx.lineTo(390,150);
ctx.lineTo(420,80);
ctx.quadraticCurveTo(380,75,220,160);
ctx.lineTo(300,210);
ctx.lineTo(272,230);
ctx.quadraticCurveTo(270,240,293,265);
ctx.lineWidth = 2;
ctx.stroke();
ctx.fillStyle = '#fcd822';
ctx.fill();
```
![](https://images.viblo.asia/69b2220c-c2d9-4693-8add-6af3acb6427a.png)

Tiếp theo là phần thân (trick ở đây là vẽ đối xứng qua một điểm)
```
ctx.beginPath();
ctx.moveTo(130,210);
ctx.quadraticCurveTo(135,230,120,250);
ctx.quadraticCurveTo(90,280,100,310);
ctx.bezierCurveTo(65,280,50,290,60,310);
ctx.bezierCurveTo(90,350,120,380,130,350);
ctx.bezierCurveTo(150,340,250,340,270,350);
ctx.bezierCurveTo(280,380,310,350,340,310);
ctx.bezierCurveTo(350,290,340,280,300,310);
ctx.quadraticCurveTo(310,280,280,250);
ctx.quadraticCurveTo(265,230,270,210);
ctx.lineWidth = 3;
ctx.fillStyle = '#fcd822';
ctx.stroke();
ctx.fill();
```
![](https://images.viblo.asia/71097f32-17a7-493e-a600-bc9a904eae16.png)

Tiếp theo là phần đầu
```
ctx.beginPath();
ctx.moveTo(240,230);
ctx.quadraticCurveTo(305,200,275,160);
ctx.quadraticCurveTo(280,135,270,120);
ctx.quadraticCurveTo(320,90,325,25);
ctx.quadraticCurveTo(280,40,250,100);
ctx.bezierCurveTo(230,80,170,80,150,100);
ctx.quadraticCurveTo(120,40,75,25);
ctx.quadraticCurveTo(80,90,130,120);
ctx.quadraticCurveTo(120,135,125,160);
ctx.quadraticCurveTo(95,200,160,230);
ctx.stroke();
ctx.fill();
```
![](https://images.viblo.asia/c4559d94-1281-4ec4-9c99-6bdee2c33b94.png)

Tiếp theo là 2 tay
```
ctx.beginPath();
ctx.moveTo(130,280);
ctx.quadraticCurveTo(130,310,160,345);
ctx.lineTo(157,350);
ctx.lineTo(165,347);
ctx.lineTo(163,352);
ctx.lineTo(170,347);
ctx.lineTo(175,355);
ctx.lineTo(180,347);
ctx.lineTo(185,352);
ctx.lineTo(185,343);
ctx.quadraticCurveTo(190,310,180,255);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(270,280);
ctx.quadraticCurveTo(270,310,240,345);
ctx.lineTo(243,350);
ctx.lineTo(235,347);
ctx.lineTo(237,352);
ctx.lineTo(230,347);
ctx.lineTo(225,355);
ctx.lineTo(220,347);
ctx.lineTo(215,352);
ctx.lineTo(215,343);
ctx.quadraticCurveTo(210,310,220,255);
ctx.stroke();
ctx.fill();
```
![](https://images.viblo.asia/0bd3f6a1-1c80-4203-a2d1-d68999f5f7f7.png)

Vẽ chi tiết hơn cho 2 chân
```
ctx.beginPath();
ctx.moveTo(70,290);
ctx.lineTo(90,310);
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(58,295);
ctx.lineTo(75,312);
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100,309);
ctx.lineTo(110,317);
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(130,350);
ctx.quadraticCurveTo(132,345,130,335);
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(340,290);
ctx.lineTo(310,310);
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(345,296);
ctx.lineTo(320,320);
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(300,309);
ctx.lineTo(290,317);
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(270,350);
ctx.quadraticCurveTo(268,345,270,335);
ctx.lineWidth = 1;
ctx.stroke();

```
![](https://images.viblo.asia/dd5aa873-45ac-4065-a756-452aff57641d.png)

Sau đó là chi tiết cho 2 tai
```
ctx.beginPath();
ctx.moveTo(102,40);
ctx.lineTo(90,80);
ctx.quadraticCurveTo(73,40,75,25);
ctx.quadraticCurveTo(106,40,102,40);
ctx.fillStyle = '#000';
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(298,40);
ctx.lineTo(310,80);
ctx.quadraticCurveTo(327,40,325,25);
ctx.quadraticCurveTo(294,40,298,40);
ctx.fillStyle = '#000';
ctx.stroke();
ctx.fill();
```
![](https://images.viblo.asia/577e1487-f879-47d7-9055-df4a83fa8af4.png)

Và cuối cùng là vẽ mặt
```
/* left eye */
ctx.beginPath();
ctx.arc(160, 140, 14,  0, Math.PI*2);
ctx.fillStyle = '#000';
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.arc(165,133, 6, 0, Math.PI*2);
ctx.fillStyle = '#fff';
ctx.stroke();
ctx.fill();

/* right eye */
ctx.beginPath();
ctx.arc(240, 140, 14, 0, Math.PI*2);
ctx.fillStyle = '#000';
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.arc(235,133, 6, 0, Math.PI*2);
ctx.fillStyle = '#fff';
ctx.stroke();
ctx.fill();

/* nose */
ctx.beginPath();
ctx.moveTo(195,160);
ctx.lineTo(205,160);
ctx.lineTo(200,165);
ctx.lineTo(195,160);
ctx.fillStyle = '#000';
ctx.stroke();
ctx.fill();

/* mouth */
ctx.beginPath();
ctx.moveTo(180,175);
ctx.quadraticCurveTo(190,185,200,175);
ctx.quadraticCurveTo(210,185,220,175);
ctx.lineWidth =1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(125,160);
ctx.bezierCurveTo(150,160,150,200,120,200);
ctx.quadraticCurveTo(110,180,125,160);
ctx.fillStyle = '#FF0000'
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(275,160);
ctx.bezierCurveTo(250,160,250,200,280,200);
ctx.quadraticCurveTo(290,180,275,160);
ctx.fillStyle = '#FF0000'
ctx.stroke();
ctx.fill();
```
![](https://images.viblo.asia/f85b49bb-343c-463e-9bda-085d6d427328.png)

Vậy là chúng ta đã hoàn thành bản vẽ Pikachu chỉ với một vài API đơn giản. Hi vọng qua bài viết này các bạn sẽ có cái nhìn sơ lược về `canvas` :D