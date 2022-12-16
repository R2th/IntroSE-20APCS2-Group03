Chào các bạn !  <br />
Hôm nay mình xin chia sẽ một Framework khá thú vị là PixiJS, <br />
Giúp bạn có thêm nhiều lựa chọn hơn khi làm việc với HTML5, cụ thể là Canvas và WebGL <br />
Cho phép bạn tạo các đồ họa tương tác, hiệu ứng phong phú, các ứng dụng đa nền tảng, và các trò chơi. <br />
**PixiJS là gì :**<br />
Pixi.js là một công cụ hiển thị cho phép bạn sử dụng sức mạnh của WebGL và canvas để render nội dung bạn muốn trên màn hình một cách liên tục. <br />
Trong thực tế, pixi.js bao gồm cả WebGL và một canvas renderer, có thể quay trở lại chế độ dành cho thiết bị cấp thấp hơn. Bạn có thể khai thác sức mạnh của WebGL và đồ họa hardware-accelerated trên các thiết bị đủ mạnh để sử dụng nó. <br />
Nếu một trong những người dùng đang sử dụng thiết bị cũ hơn, engine sẽ tự động quay lại canvas renderer và không có sự khác biệt nào xảy ra, do đó bạn không phải lo lắng về vấn đề này.<br />
**Ví dụ**<br />
làm một ví dụ để hiểu rõ hơn về Pixi
```
var app = new PIXI.Application();
document.body.appendChild(app.view);

var count = 0;

// build a rope!
var ropeLength = 45;

var points = [];

for (var i = 0; i < 25; i++) {
    points.push(new PIXI.Point(i * ropeLength, 0));
}

var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/tentacle.png'), points);

strip.x = -40;
strip.y = 300;

app.stage.addChild(strip);

var g = new PIXI.Graphics();
g.x = strip.x;
g.y = strip.y;
app.stage.addChild(g);

// start animating
app.ticker.add(function() {

    count += 0.1;

    // make the snake
    for (var i = 0; i < points.length; i++) {
        points[i].y = Math.sin((i * 0.5) + count) * 30;
        points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    }
    renderPoints();
});

function renderPoints () {

    g.clear();

    g.lineStyle(2,0x000);
    g.moveTo(points[0].x,points[0].y);

    for (var i = 1; i < points.length; i++) {
        g.lineTo(points[i].x,points[i].y);
    }

    for (var i = 1; i < points.length; i++) {
        g.beginFill(0xfffff);
        g.drawCircle(points[i].x,points[i].y,8);
        g.endFill();
    }
}

```
- Các thành phần trong App sẽ đưa vào trong "stage", như một box chứa các phần tử bên trong của bạn.
- Texture lưu trữ thông tin của một image, Bạn có thể trực tiếp tạo ra một Texture từ một hình ảnh và sau đó tái sử dụng nó nhiều lần như thế này:
```
let texture = PIXI.Texture.fromImage('assets/image.png');
let sprite1 = new PIXI.Sprite(texture);
let sprite2 = new PIXI.Sprite(texture);
```
- Pixi Graphics chứa các phương thức được sử dụng để vẽ các hình dạng căn bản như các đường thẳng, hình tròn và hình chữ nhật và đổ màu cho chúng.<br />
và còn nhiều chức năng khác bạn có thể tham khảo thêm ở đây: https://github.com/pixijs/pixi.js

Xem thêm ví dụ bên trên ở đây: https://codepen.io/yes_no8x/pen/YRYvjm <br />

Bài chia sẽ hi vọng sẽ có ích cho các bạn, Thanks !!!