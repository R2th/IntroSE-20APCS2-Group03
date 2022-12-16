## Canvas là gì?

<canvas> trong HTML được sử dụng để vẽ các hình ảnh, đồ hoạ trong trang web.
<canvas>  được sử dụng  đồ hoạ một cách nhanh chóng, thông qua javascript.
<canvas> có một số phương pháp để vẽ đường line, hộp, hình tròn, text và thêm hình ảnh.

    `
    <canvas id="myCanvas" width="200" height="100"></canvas>
    `
    - Ở đây atribute id (được tham chiếu trong script) và atribute width và height để xác định kích thước của canvas( chiều dài và rộng). 
    
## Sử dụng javascript để làm canvas

  - Đầu tiên chúng ta xây dựng html canvas 

  `
  <canvas id="canvas"></canvas>
  `
  
  - Trong file js chúng ta đầu tiên là: ta dùng addEventListner để load page DOMContentLoaded thì gọi hàm init như đoạn code dưới đây

```
// Đây là đoạn cả page load xong html thì ta gọi hảm init
document.addEventListener('DOMContentLoaded', init);

```

Tại function init( khởi tạo) chúng ta làm như sau : 

```
// function khởi tạo
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red'; // set màu cho canvas
  ctx.fillRect(0, 0, 280, 280);
  canvas.addEventListener('mousedown', getPos); // nhấn chuột thì gọi đến hàm set position
  canvas.addEventListener('mousemove', draw); // di chuột thì gọi đến hàm vẽ
}
```

Khi ta nhấn chuột thì chúng ta pải lấy dc vị trí của con chuột ta set đến hàm position
đầu tiên ta tạo object pos xét vị trí cho nó là 0 

```
let pos = {x:0, y:0};
// function set vị trí của con chuột
function getPos(e) {
  pos.x = e.clientX - canvas.getBoundingClientRect().left; // lấy vị trí chuột khi chạm vào trên trục  x
  pos.y = e.clientY - canvas.getBoundingClientRect().top;  // lấy vị trí chuột khi chạm vào trên trục y
  console.log(pos.y , pos.x);
}
```

- khi ta di chuyển chuột thì sẽ vẽ lên những đường mà ta di chuyển thì ta gọi hàm draw như sau

```
//function vẽ
function draw(e) {
  if(e.buttons != 1) return;  // bỏ vẽ khi vừa đặt chuột
  ctx.beginPath(); // bắt đầu một đoạn line
  ctx.lineWidth = 18; // độ rộng nét vẽ
  ctx.lineCap = 'round'; // nét vẽ hình tròn
  ctx.strokeStyle = 'white'; // màu nét vẽ trắng
  ctx.moveTo(pos.x, pos.y); // di chuyển đến vị trí con chuột
  getPos(e); //tại mỗi vị trí lại set lại vị trí
  ctx.lineTo(pos.x, pos.y); //vẽ đến vị trí muốn vẽ
  ctx.stroke();
}
```

LINk Demo: https://codepen.io/ngc-yn/pen/abmQmmJ

{@codepen:https://codepen.io/ngc-yn/pen/abmQmmJ}

## Kết Luận
- Ở link demo mình đã ghi chi tiết từng bước làm. Mọi người flow theo link demo nhé
- Một thư viện rất hay của javascript tensorflow về[ machine language](https://www.tensorflow.org/) rất hay mình đã sử dụng đã xuất ra ảnh ở div#canvas-img. Các bạn có thể tìm hiểu thêm về nó