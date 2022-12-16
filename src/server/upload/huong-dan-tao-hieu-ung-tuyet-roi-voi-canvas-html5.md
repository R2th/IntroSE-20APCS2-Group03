## Canvas HTML5
Hello mọi người, mình mới tìm hiểu một chút về canvas HTML5 nên hôm nay mình sẽ hướng dẫn các bạn tạo ra một bầu trời tuyết rơi đầy lãng mạn nhé. :kissing_heart:

Vậy Canvas HTML5 là gì ?
#### 1.  Canvas là gì ?
Canvas là một phần tử của HTML5, cho phép thực hiện lập trình kết xuất đồ họa các đối tượng hai chiều trên trang web. Canvas chiếm một khu vực trong trang web với chiều rộng và chiều cao định trước. Sau đó sử dụng Javascript có thể truy cập vào khu vực này để vẽ thông qua một tập các hàm đồ họa tương tự như các API 2D khác.
![](https://images.viblo.asia/2783c83d-307e-4c12-9d02-ff3180279619.jpg)

#### 2. Hướng dẫn tạo tuyết rơi với canvas và javascript
* **Khởi tạo và resizing canvas**

Trước tiên, tạo một thẻ html ``<canvas />`` vào file ``index.html`` của bạn

*index.html*
```javascript
<!DOCTYPE html>
<html>
    <head>
      <meta charset="UTF-8">
      <title>Canvas HTML5</title>
    </head>
    <body>
        <canvas id="canvas" />
    </body>
</html>
```
Hãy đặt cho thẻ ``<canvas>`` của bạn môt ``id`` nhé, và ở đây mình đặt cho nó một ``id="canvas"``

![](https://images.viblo.asia/19107294-0e69-4174-a83b-c78279f0871e.jpg)


Giờ thì chúng ta sẽ tiến hành khởi tạo canvas trong file javascript, hãy nhớ link script file này vào file ``index.html`` của bạn.

*index.js*
```javascript
const canvas = document.getElementById('canvas');

const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

``getContext('2d')`` là phương thức trả về một Object cung cấp các phương thức và thuộc tính mà chúng ta có thể vẽ trên canvas. Mặc định ``<canvas>`` sẽ là một hình chữ nhật, chúng ta set chiều dài, rộng cho nó bằng với chiều dài, rộng của ``window`` (tùy thuộc vào bài toán để set kích thước cho nó).
Để kích thước của canvas có thể dynamic theo kích thước của ``window``, chúng ta sẽ lắng nghe sự kiện resize của window để set lại kích thước cho canvas.

*index.js*
```javascript
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})
```

* **Vẽ phần tử trong canvas**

Bây giờ sẽ vẽ các phần tử hay các khối shape trong canvas, cụ thể ở demo này chúng ta sẽ vẽ một bông tuyết (hình tròn).
```javascript
c.beginPath();
c.arc(100, 100, 7, 0, Math.PI * 2);
c.shadowColor = '#fff';
c.shadowBlur = 5;
c.fillStyle = '#fff';
c.fill();
c.closePath();
```
``arc(x, y, radius, 0, 2PI)`` là phương thức để vẽ một hình tròn.

Trong đó:

 - x, y : là vị trí của hình tròn so với canvas.

 - radius: bán kính của hình tròn.
 - 0, PI *2 : nghĩa là 1 vòng của hình tròn

Để tìm hiểu thêm vẽ các shape khác và các thuộc tích của `c`  các bạn tìm hiểu thêm ở đây nhé: 

https://www.w3schools.com/html/html5_canvas.asp

Và đây là kết quả

Các bạn có thể style background cho canvas như demo nhé.

{@embed: https://codepen.io/HungPhan/pen/zYxjRRO?editors=0010}

* **Animating phần tử trong canvas**

Chúng ta có thể thấy để animate thì vị trí của 'bông tuyết' sẽ thay đổi đồng nghĩa với tọa độ (x, y) của 'bông tuyết' sẽ thay đổi liên tục. Để tiếp tục, mình sẽ xây dựng 'bông tuyết' như một đối tượng với các thuộc tính x ,y, radius, color.
```javascript
function snow() {
  this.radius = Math.random() * 5;
  this.x = Math.floor(Math.random() * canvas.width);
  this.y = 100;
  this.color = '#FFF';
}

snow.prototype.draw = function() {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  c.shadowColor = this.color;
  c.shadowBlur = 5;
  c.fillStyle = this.color;
  c.fill();
  c.closePath();
}
```
```this.x``` sẽ là random từ 0 đến chiều rộng của canvas.

```this.y = - this.radius``` tạo hiệu ứng 'bông tuyết' luôn luôn rơi từ trên xuống.

Bây giờ mình sẽ thay đổi x, y thì chúng ta sẽ có một 'bông tuyết đang rơi. :stuck_out_tongue_winking_eye:

```javascript
function snow() {
  ...
  this.speed = {
      x: Math.random() * 4 - 2,
      y: Math.random() * 3 + 2,
  }
}

snow.prototype.update = function() {
  this.x += this.speed.x;
  this.y += this.speed.y;
  
  if (this.y >= canvas.height)
    this.speed.y = 0;
   
  this.draw();
}
```

Mình sẽ thêm một thuộc tính ``speed`` cho snow thể hiện tốc đô rơi của nó. Để có thể giữ lại các snow của mình lại ở dưới khung canvas, mình thêm điều kiện ```this.y > canvas.height```

Và quan trọng nhất bây giờ là chúng ta cần handle liên tục việc x, y thay đổi. Đừng lo ```window.requestAnimationFrame``` sẽ giúp bạn làm điều đó. 

Khi muốn thực hiện một vòng lặp thời gian trong JavaScript chúng ta nghĩ ngay đến ``setInterval()``. Tuy nhiên, mục đích của mình là thực hiện animation, để thực hiện một animation mượt mà, chúng ta cần 60 frame/ 1s như thế này

``
setInterval(function() {
  // chay animation ở đây
}, 1000/60);
``

Tuy nhiên chúng ta có một cách tốt hơn cách trên, dùng `` window.requestAnimationFrame()``. Để tìm hiểu thêm về nó, bạn có thể tham khảo tại đây:

https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

Tiếp tục với demo của chúng ta
```javascript
function animate() {
  c.clearRect(0,0, canvas.width, canvas.height);
  a.update();
  window.requestAnimationFrame(animate);
}

animate();
```
``clearReact`` giúp chúng ta xóa đi hoạt hình cũ sau khi ``animate`` được gọi lại.

Kết quả
{@embed: https://codepen.io/HungPhan/pen/QWwrmWP?editors=0010}

Và cuối cùng, một bông tuyết thôi thì chưa phải mùa đông, phải thật nhiều tuyết rơi mới đúng phải không mn :kissing_heart:

Việc còn lại thật dễ dàng

```javascript
const arr = [];

function init() {
  arr.push(new snow());
}

function animate() {
  c.clearRect(0,0, canvas.width, canvas.height);
  arr.forEach(function(item) {
    item.update();
  })
  if (arr.length > 1000) {
    arr.splice(0,1);
  }
  init();
  window.requestAnimationFrame(animate);
}

animate();
```
Kết quả

{@embed: https://codepen.io/HungPhan/pen/VwYxXBB}

Trong Canvas sẽ còn những tương tác với phần tử nhưng mình sẽ nới ở bài viết với những demo sau.


#### 3. Kết luận
Trên đây là những hướng dẫn tạo một cảnh tuyết rơi bằng Canvas HTML5, thông qua đó hi vọng sẽ giúp các bạn phần nào hiểu về cách tạo, hoạt động của canvas. Bài viết còn nhiều thiếu sót, mong mọi người góp ý để mình bổ sung hoàn thiện những bài viết sau này hơn. Cảm ơn mọi người đã theo dõi.
#### 4. Tài liệu tham khảo
*    [W3School - Canvas HTML5](https://www.w3schools.com/html/html5_canvas.asp)
   
*    [Canvas Tutorials](https://www.youtube.com/playlist?list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL)