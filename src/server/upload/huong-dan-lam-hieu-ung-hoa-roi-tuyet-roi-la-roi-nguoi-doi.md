## Mở đầu
Như tiêu đề, là hiệu ứng tuyết rơi, nhưng cũng từng mùa mà thay đổi, tết thì đào rơi, valentine thì tim rơi, thu thì lá vàng rơi, thi thì chữ rơi, thất tình thì người yêu rơi...vv..vv...

Thả ảnh nó thôi, có cáu thì cũng đừng thả nó từ nóc nhà xuống. Thật đấy, đừng làm thế!

{@embed: https://codepen.io/hungba124/pen/eYdZwaN}

Chả hiểu sao cái link embed vào lại bị 404, các bạn bấm vào link để xem demo nhé

## Bắt đầu
### HTML, CSS
```html
<canvas id="canvas"></canvas>
```
```css
body{margin:0;height:100%;}
canvas{
    position:absolute;top:0;left:0
    background-image: linear-gradient(bottom, rgb(105,173,212) 0%, rgb(23,82,145) 84%);
    background-image: -o-linear-gradient(bottom, rgb(105,173,212) 0%, rgb(23,82,145) 84%);
    background-image: -moz-linear-gradient(bottom, rgb(105,173,212) 0%, rgb(23,82,145) 84%);
    background-image: -webkit-linear-gradient(bottom, rgb(105,173,212) 0%, rgb(23,82,145) 84%);
    background-image: -ms-linear-gradient(bottom, rgb(105,173,212) 0%, rgb(23,82,145) 84%);
    
    background-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(0, rgb(105,173,212)),
        color-stop(0.84, rgb(23,82,145))
    );
}
```
Đừng để ý css dài vậy làm gì, tôi chế cái nền cho đẹp thôi, bạn dùng cái khác cũng đc, không ảnh hường gì.

### Khởi tạo
Vẫn là khởi tạo canvas và mảng như mọi khi, và cũng nhắc lại cho ai không nhớ hoặc không biết là sao tôi phải gán dài rộng canvas bằng js chứ không dùng css thì là vì js nó phân canvas vào loại image và thế nên cái with height khi gán bằng js sẽ được đặt thành attribute  trong element, lúc đó nó mới chạy chuẩn.
```javascript
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    things = [],
    thingsCount = 124,
    mouse = {
      x: -100,
      y: -100
    },
    minDist = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// object image
var image = new Image();
image.src = 'https://i.pinimg.com/originals/90/2c/2b/902c2bbccb72ca76cf3bbe95741174e9.png';
// image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Love_heart_uidaodjsdsew.gif/1200px-Love_heart_uidaodjsdsew.gif';
// image.src = 'https://static.wixstatic.com/media/2cd43b_57438aebde5a4b0fa20c6880a9fafabf~mv2.png/v1/fill/w_320,h_272,fp_0.50_0.50/2cd43b_57438aebde5a4b0fa20c6880a9fafabf~mv2.png';
```
object image là phần tạo đối tượng image, đây là cái thứ được thả rơi ấy, tôi chọn luôn cho vài ảnh đẹp cho anh em test thử luôn đấy :+1:

### Khởi tạo mảng vật thể
```javascript
for (var i = 0; i < thingsCount; i++) {
  let thingWidth = Math.floor(Math.random() * 20) + 20;
  let thingHeight = image.naturalHeight / image.naturalWidth * thingWidth;
  let speed = Math.floor(Math.random() * 2) + 0.5;
  things.push({
    width: thingWidth,
    height: thingHeight,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - thingHeight,
    speed: speed,
    vY: speed,
    vX: 0,
    d: Math.random() * 1.2 - 0.6,
    stepSize: (Math.random()) / 20,
    step: 0,
    angle: Math.random() * 180 - 90,
    rad: Math.floor(Math.random()),
    opacity: Math.random() + 0.4,
    _ratate: Math.floor(Math.random()) // ratate 正負
  });
}
```
`width`, `height` là kích thước vật thể, đã được co lại theo tỉ lệ nên sẽ không sợ méo

`x`, `y` là vị trí ban đâu, `vX`, `vY` là hướng di chuyển của vật thể, nó là cái điểm đầu và cuối của cái vector di chuyển ấy. `vY` là chiều dọc, được gán bằng `speed`, nghĩ là speed càng lớn => vector càng dài => tốc độ rời càng nhanh, `vX` bằng 0 tức là nó sẽ rơi theo chiều dọc. 

Chú ý là đây chỉ là hướng di chuyển khi bắt đầu của vật thể, chuyển đông rơi sau đó sẽ được tính toán lại, lá/tuyết rời nó lắc lư qua lại mà :stuck_out_tongue_winking_eye:

`d` thì bạn có thể hiêủ nó là gió với từng vật :upside_down_face: hơi ngáo ti khi mà làm gió cho tưng object một. Có lẽ hiểu là hướng rơi "chính" cũng được, nó sẽ làm cho object rời về bên trái hay phải ấy, bạn có thể thấy trong demo là object khi rơi, cứ chạy dần về 1 hướng trái hoặc phải, là do cái `d` này, càng lớn/nhỏ nó tức là "gió" càng to nhé

`opacity` thì tất nhiên là độ trong suốt của vật, càng ở xa, vật càng mờ mà, phải không =))

`angle` thì hình như là độ nghiêng ban đầu của vật

`_ratate` thì có vẻ là hướng quay

`rad` và `step` thì tôi không nhớ :zipper_mouth_face:

### Vẽ object
```javascript
function drawThings() {
  things.map((thing) => {
    ctx.beginPath();
    thing.rad = (thing.angle * Math.PI) / 180;
    ctx.save();
    var cx = thing.x + thing.width / 2;
    var cy = thing.y + thing.height / 2;
    ctx.globalAlpha = thing.opacity;
    ctx.setTransform(
      Math.cos(thing.rad),
      Math.sin(thing.rad),
      -Math.sin(thing.rad),
      Math.cos(thing.rad),
      cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
      cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
    );
    ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
    ctx.restore();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawThings();
}
```
Như các bạn có thể thấy, tôi gọi vật thể là `thing` do lúc code bí từ quá :slightly_smiling_face:

`rad` đã được tính lại nên phần trên không nhớ cũng không sao, còn phần này thì tôi không biết làm gì hết, ai nhớ cái công thức đó tính cái gì thì bảo tôi với :upside_down_face:

`cx` và `cy` là vị trí tâm của object

`setTransform` là hàm để "xoay" vật thể, nó cho chính xác thì nó làm biến dạng object như kéo dài, kéo dẹt, làm hình dạng object như bị nghiêng đi nên tạo cảm giá như đang xoay, công thức sử dụng thì các bẹn có thể tra google

Nếu bạn có khả năng hình học lượng giác tốt thì vật thể sẽ không chỉ quay tròn đơn điệu như kim đồng hồ nữa mà còn có thể nhào lộn các kiểu nữa, chỉ trong trường hợp "NẾU" thôi, vậy nên đừng bắt tôi giải thích chỗ này, tôi không hiểu đâu :joy:

### Update vị trí object <=> object di chuyển
```javascript
function update() {
  things.map((thing) => {
    var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);
    
    if (dist < minDist) {
      var force = minDist / (dist * dist),
          xcomp = (mouse.x - thing.x) / dist,
          ycomp = (mouse.y - thing.y) / dist,
          deltaV = force * 2; // deplay when hover mouse

      thing.vX -= deltaV * xcomp;
      thing.vY -= deltaV * ycomp;
      
      if (thing.d * xcomp > 0) {
        thing.d = 0 - thing.d;
      }
    } else {
      thing.vX *= .98;

      if (thing.vY < thing.speed) {
        thing.vY = thing.speed
      }

      thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
    }
    
    thing.y += thing.vY;
    thing.x += thing.vX + thing.d;
    
    var _angle = Math.random() + 0.2;
    // stuff.angle += _angle;
    if (thing._ratate == 0) {
      thing.angle += _angle;
    } else {
      thing.angle -= _angle;
    }
    
    if (thing.y > canvas.height) {
      reset(thing);
    }

    if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
      reset(thing);
    }
  });
}

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
```

Đoạn trên hơi dài tí là vì tôi thêm một tính năng là object khi đến gần chuột sẽ bị "văng" ra

`dist` phép toán ~~bitato~~ đơn giản để tính khoảng cách từ object tới mouse

`minDist` thì ở phần2, đoạn Khởi tạo trong trường hợp bạn không chú ý

Phần `if` là xử lý khi object vào vần mouse sẽ bị văng ra, `else` là khi chạy bình thường. Nói thật là đoạn này tôi copy, nên không hiểu rõ phần văng ra nó chạy sao, tôi chỉ đoán được phần `thing.d * xcomp > 0` là nếu bị văng ra thì hướng "gió" của object đó sẽ bị đổi ngược lại

về phần `else`, các bạn chú ý `thing.vX *= .98;` sẽ khác rất nhiều dù chỉ thay đổi 0.01, tôi đã phải thử rất nhiều mới chọn được số 0.98 đấy. Hàm `cos` ở dưới là tính chuyển động cho object theo chiều ngang, kiểu kiểu nó có thể hiểu như cái hình này:

![](https://images.viblo.asia/f04998ae-ec88-4657-83d7-b0d56761fc9d.png)

Nói chung thì đoạn này anti-vốt-rơ :smile_cat:

Tính sau vector thì update ví trí.

Đoạn `angle` thì nhìn tên là biết tính góc để object quay rồi

Đoạn `reset` thì là để "tái chế" lại object khi mà nó rơi ra ngoài màn hình: rơi xuống dưới, ra ngoài mép trái hoặc phải này, là cái ngay dưới đây này :point_down:

### Đặt lại object khi "rơi" ra ngoài màn hình <=> tái chế, tái sử dụng
```javascript
function reset(thing) {
  thing.width = Math.floor(Math.random() * 20) + 20;
  thing.height = image.naturalHeight / image.naturalWidth * thing.width;
  thing.x = Math.floor(Math.random() * canvas.width);
  thing.y = 0 - thing.height;
  thing.speed = Math.floor(Math.random() * 2) + 0.5
  thing.vY = thing.speed;
  thing.vX = 0;
  // thing.angle = 0;
  // thing.rad = 0;
  thing._ratate = Math.floor(Math.random());
}
```

### Done
```javascript
function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
```

Bước cuối, tổng hợp mấy cái hàm trên, rồi gọi `requestAnimationFrame` để chạy :+1:

## Tổng kết
Các bẹn nên chọn ảnh png không nền sẽ đẹp hơn, không nên chọn ảnh quá lớn, khi render sẽ lâu và giật lag, số lượng cũng không nên quá nhiều vì sẽ làm rồi mắt và giật lag.

Trong Demo tôi có thay đổi một chút so với bản hướng dẫn trên đây, các bạn có thể tự thử và tìm hiểu, có thay đổi gì hay hay thì vui lòng chỉ tôi với.

Còn về người dơi thì là do Đấng dùng siêu sức mạnh của mình bắt tôi ghi vào, tôi không làm khác được.

Chúc anh em thành công.

{@embed: https://codepen.io/hungba124/pen/eYdZwaN?editors=1111}

p/s: giờ thì nó lại embed được :/

Và thêm một vài bản hoa rơi, lá bay khác mà tôi sưu tập được

{@embed: https://codepen.io/hungba124/pen/gOwLxOR}

{@embed: https://codepen.io/hungba124/pen/dypOzyM}