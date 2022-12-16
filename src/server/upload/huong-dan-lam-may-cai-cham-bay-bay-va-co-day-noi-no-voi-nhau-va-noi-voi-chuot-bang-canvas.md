## Mở đầu
Sau vài bài thì tôi nhận ra là mềnh hông có khiếu viết mấy bài giới thiệu, phân tích, nên là tôi lại quay lại viết mấy bài hướng dẫn làm mấy thứ làng nhàng vui vui vậy.

Hôm nay hướng dẫn ae làm cái ae làm cái mấy cái chấm bay lung tung, khi di chuột qua thì nó có cái tơ nối với con trỏ nhé, tôi gọi nó là connecting đốt-s

Thực ra là lúc bắt đầu, tôi cũng phân vân có nên làm cái random ra 108 câu tỏ tình hiệu ứng lung linh cực đẹp để ae dùng luôn dịp noen này luôn không, nhưng thấy đài báo bảo giờ đang thừa nam thiếu nữ, ae tỏ tình thành công thì tôi cũng vui, nhưng nguy cơ ế thì gần thêm một đoạn, nên là đợi tôi có người yêu rồi sẽ hỗ trợ ae sau vậy.

Trông như vậy này

{@embed: https://codepen.io/hungba124/pen/ZEbxKjw}

Như các bạn có thể thấy, một thứ rất hay, rất thú vị ~~nhưng vô dụng~~

Bắt đầu nào!

## Bắt đầu thực hiện
### Step 1: HTML + CSS
Một dòng HTML và CSS thôi, nhưng vì đoạn sau cũng sẽ chia ra nên tôi cũng chia đoạn này ra luôn
```html:html
<canvas id="canvas"></canvas>
<style>
    canvas {background: #000}
</style>
```
### Step 2: Khai báo canvas
```javascript
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```
Như các bạn thấy, tôi tạo kích thước rộng, dài của canvas trong js thay vì dùng css ở trên. Nhìn thì tưởng giống nhau, nhưng có chút khác biệt, css nhận định các selector như nhau, còn js sẽ nhận địch canvas là 1 thuộc tính ảnh, nên khi đẩy chiểu rộng, dài vào, nó sẽ dùng attribute `width` và `height`, chính cái này mới là cái xác định của kích thước thật sự của canvas.

### Step 3: Khởi tạo mảng "sao"
```javascript
var stars = [],
    number = 300,
    mouse = {
      x: 0,
      y: 0
    };

// khởi tạo từng sao
for (var i = 0; i < number; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25,
    speed: Math.floor(Math.random() * 41) - 10,
  });
}
```

`number` là số lượng sao.

`mouse`  là vị trí của con trỏ, chúng ta cần nó để có thể tạo cái tơ nối các sao xung quang con trỏ tới nó

`x` và `y` là vị trị tri ban đầu của sao

`radius` là kích thước của chấm sao

`vx` và `vy` là hướng di chuyển của sao, kiểu kẻ vector ấy

`speed` tất nhiên là tốc độ của sao rồi, đặt số cố định thì các sao sẽ chạy cũng tốc độ, đây tôi đặt random tốc độ từ 50->10, càng nhỏ thì chạy càng nhanh nhé

Bonus thêm cho mn thông thức lấy số random trong 1 khoảng này: `Math.random() * (max - min + 1) + min)`

### Step 4: Chuẩn bị
Không có gì đặc biệt, tạo cái hàm tính khoảng cách 2 điểm và lấy vị trị của chuột thôi. Hình như có cái hàm để tính luôn, nhưng ngồi 1 lúc không nhớ ra nên tôi dùng luôn ~~bitato~~ Pythagoras cho nhẹ đầu, là cái định lý "bình phương cạnh huyền tam giác vuông bằng tổng bình phương các cạnh góc vuông" trong trường hợp bạn không nhớ =))
```javascript
function distance( point1, point2 ){
  var xs = 0;
  var ys = 0;

  xs = (point2.x - point1.x) ** 2;
  ys = (point2.y - point1.y) ** 2;

  return Math.sqrt( xs + ys );
}

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
```

### Step 5: Vẽ bầu trời sao
Đây là  tạo sao này~
```javascript
function drawStars() {
  stars.map((star) => {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
  });
}
```
`arc` là để vẽ vòng tròn, tâm ở tọa độ `star.x` và `star.y` , bán kính là `star.radius`

Tiếp theo là vị trí bắt đầu vẽ và vị trí kết thúc nét vẽ, 0 là vị trí hướng 3h, vẽ xuôi chiều kim đồng hồ, 6h là 0.5PI, 9h là 1PI... là lượng giác ấy =)))

Giờ gặp thằng nhóc nào bảo "Cháu muốn là lập trình viên/ lập trình game/ làm hacker" mà không chịu học toán thì ae cứ đấm nó mấy phát cho tỉnh cơn mơ. Quay được về quá khứ, thì tôi cũng muốn đấm mình nữa :joy:

Quay lại vấn đề, `fillStyle` là chọn màu và `fill` là đổ màu vào, nếu các bạn dùng `stroke` thay cho `fill` thì nó sẽ chỉ vẽ ra một **vòng** tròn thôi, viền thì có màu, nhưng bên trong thì không.

Đây là lối các ông sao với nhau này~
```javascript
function drawLines() {
  stars.map((starI) => {
    ctx.moveTo(starI.x, starI.y);
    if (distance(mouse, starI) < 250) ctx.lineTo(mouse.x, mouse.y);

    stars.map((starII) => {
      if (distance(starI, starII) < 50) ctx.lineTo(starII.x, starII.y);
    });
  });
  ctx.lineWidth = 0.1;
  ctx.strokeStyle = "white";
  ctx.stroke();
}
```
Tôi đặt khoảng cách các sao đến mouse là 250, và các sao nỗi với nhau trong khoảng 50px. Bạn nên để khoảng cách này là biến, khai báo luôn đoạn bước 3 nay trên ấy, vậy cho dễ chỉnh sửa, ở đây, tôi viết luôn đây là do ~~quên~~ thích =))

Độ dày của line cũng không nên quá lớn, 0.2 trở xuống là đẹp, tôi để 0.1 cho dễ nhìn thôi, chứ 0.05 nó mới chuẩn.

Giờ thì vẽ bầu trời sao
```javascript
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "lighter";

  drawStars();

  ctx.beginPath();
  drawLines();
}
```
`clearRect` là vẽ hình chữ nhật, là cái nền ấy đen ấy, bắt đầu tại vị trị 0, 0 và có chiều rộng là `canvas.width`, chiều dài là `canvas.height`

`globalCompositeOperation` là để giúp chúng ta xử lý việc các bản vẽ trên canvas sẽ chèn đè, xếp lớp thế nào, ở đây chúng ta muốn "sao" trên nền "trời", mà thường thì bản vẽ sau sẽ đè lên bản vẽ trước thôi, nhưng cứ thêm vào cho chắc =))

`ctx.globalCompositeOperation = "lighter"` nghĩ là nó sẽ trông vậy ![canvas lighter](https://images.viblo.asia/c6f20436-3fde-4170-b312-954e972830aa.png) 2 màu sẽ được trộn lại với nhau.

Sao lại dùng cái `globalCompositeOperation` này hả?

I've no idea. B-)

Bỏ đi, tôi thấy nó vẫn chạy, nhưng thêm vào thì trông code nguy hiểm hơn :relieved:

### Step 6: Update vị trị sao
```javascript
function update() {
  stars.map((star) => {
    star.x += star.vx / star.speed;
    star.y += star.vy / star.speed;

    if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
    if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
  });
}
```
function này sẽ update vị trị của từng sao, trong trường hợp sao chạm vào cạnh của khung canvas (đoạn `if` ấy) thì sẽ nảy ngược lại bằng 1 góc bằng với góc vào, như cái gương ấy, là cái hàm đồ thị bậc 1 thôi =))

### Final
```javascript
function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
```

cuối cùng là tổng hợp những gì đã làm và thêm cái `requestAnimationFrame` để có thể chạy được.

## Kết
Cái connecting dots này bạn có thể dùng nó làm nền cho website tăng độ "nguy hiểm" khi chào mời khách, nhưng performance sẽ giảm kha khá nhé.

Source code các bạn có thể xem theo link tôi để ngay dưới đây.

Chúc ae thành công và qua được mùa noen lạnh lẽo :pensive:

*souce code: https://codepen.io/hungba124/pen/ZEbxKjw*