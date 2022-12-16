Hiệu ứng này được tạo ra từ các hạt di chuyển ngẫu nhiên, và khi chúng tới gần nhau thì sẽ được liên kết với nhau bằng một đoạn thẳng, nên việc đầu tiên chúng ta cần làm là vẽ ra các hạt ngẫu nhiên trên khung hình.

Để có thể sử dụng các bạn cần khai báo thẻ canvas trong tập tin HTML:

*index.html*
```html
<canvas id="canvas"></canvas>
```
Thêm chút css cho nó perfect hơn chút:

*app.css*
```css
#canvas {
  border: 1px solid #ccc;
  margin: auto;
}
```
Viết vài dòng js basic để tạo ra cái khung cho code:

app.js
```javascript
var particle = function (options) {
  /* Default options */
  this.defaultOptions = {
    canvas: options.canvas,
    width: options.width ? options.width : window.innerWidth,
    height: options.height ? options.height : window.innerHeight,
    background: options.background ? options.background : 'black',
    nodeNumber: options.nodeNumber ? options.nodeNumber : 20,
    nodeType: options.nodeType ? options.nodeType : 'circle',
    nodeSize: options.nodeSize ? options.nodeSize : 1,
    nodeColor: options.nodeColor ? options.nodeColor : 'rgba(255,255,255,0.5)'
  };
}
```
Ở đây mình tạo ra một đối tượng **particle** với một thuộc tính là **defaultOptions**. Thuộc tính **defaultOptions** này sẽ bị ghi đè nếu có tham số **options** được truyền vào khi khởi tạo đối tượng **particle**.

Tiếp theo mình thêm vào đối tượng **particle** một số thuộc tính sau:
```javascript
...
this.fn = {};

this.ctx = null;

this.nodes = [];

var PAR = this;

PAR.fn.getContext = function () {
    PAR.ctx = PAR.defaultOptions.canvas.getContext('2d');
}

PAR.fn.canvasResize = function () {
    PAR.defaultOptions.canvas.width = PAR.defaultOptions.width;
    PAR.defaultOptions.canvas.height = PAR.defaultOptions.height;
}
...
```
- Thuộc tính **fn** để chứa các phương thức dùng trong đối tượng **particle**, việc này sẽ tiện hơn thay vì phải khai báo các phương thức bằng việc thêm vào prototype `particle.prototype.functionName = ...`.
- Thuộc tính **ctx** để chứa thành phần context của canvas (đối tượng chính chứa các phương thức để điều khiển canvas).
- Thuộc tính **nodes** để chứa các hạt sau khi được tạo ra (mình gọi mỗi hạt là một node)
- Mình khởi tạo một biến **PAR** thể hiện cho đối tượng **particle** để có thể gọi các phương thức và thuộc tính dễ dàng hơn (vì từ khóa this trong javascript chỉ có tác dụng đối với block gần nhất bao bọc nó).
- Lấy thành phần context của canvas gán vào thuộc tính **ctx** bằng phương thức **fn.getContext**.
- Set chiều rộng và chiều cao cho canvas bằng phương thức **fn.canvasResize**.

Tiếp theo là tạo đối tượng **node** như là một thuộc tính trong đối tượng **particle**
```javascript
PAR.node = function () {
    /* Position */
    this.x = Math.random() * PAR.defaultOptions.width;
    this.y = Math.random() * PAR.defaultOptions.height;
    /* Size */
    this.r = Math.random() * PAR.defaultOptions.nodeSize;
 }
```
- Đối tượng **node** sẽ có các thuộc tính **x**, **y** chỉ định vị trí của hạt trên khung hình, thuộc tính **r** dùng để chỉ định kích thước của hạt.
- Mình dùng hàm **random** để tạo ra các vị trí, kích thước ngẫu nhiên cho **node**

Mình tạo thêm một phương thức **draw** cho đối tượng **node**
```javascript
PAR.node.prototype.draw = function () {
    var n = this;
    PAR.ctx.beginPath();
    if (PAR.defaultOptions.nodeType === 'rect') {
      PAR.ctx.rect(n.x, n.y, n.r, n.r);
    } else if (PAR.defaultOptions.nodeType === 'circle') {
      PAR.ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    }
    PAR.ctx.fillStyle = PAR.defaultOptions.nodeColor;
    PAR.ctx.fill();
    PAR.ctx.closePath();
 }
```
- Phương thức này sẽ vẽ một hình vuông hoặc hình tròn lên khung hình tùy thuộc vào options **nodeType** ở các vị trí **x**, **y** ngẫu nhiên và kích thước **r** ngẫu nhiên

Mình tạo thêm phương thức **createNodes** cho đối tượng **particle** để tạo ra các **node** theo số lượng được config trong options **nodeNumber**
```javascript
PAR.fn.createNodes = function () {
    for (var i = 0; i < PAR.defaultOptions.nodeNumber; i++) {
      PAR.nodes.push(new PAR.node());
    }
}
```
- Sau khi tạo thêm một **node** thì sẽ push vào mảng **nodes** để có thể quản lý về sau.
```javascript
PAR.fn.draw = function () {
    for (var i = 0; i < PAR.nodes.length; i++) {
      var node = PAR.nodes[i];
      node.draw();
    }
 }
```
- Phương thức **draw** để vẽ các **node** lên khung hình.

Cuối cùng là một phương thức **init** để chuẩn bị tất cả những gì cần thiết
```javascript
particle.prototype.init = function () {
  this.fn.getContext();
  this.fn.canvasResize();
  this.fn.createNodes();
  this.fn.draw();
}
```
Chúng ta khởi tạo hiệu ứng như sau:
```javascript
var p = new particle({
  canvas: document.getElementById('canvas'),
  nodeSize: 5,
  nodeType: 'rect',
  nodeNumber: 30,
  width: 1000,
  height: 300,
  background: 'rgba(200,100,200,1)'
});
p.init();
```
Và file *app.js* hoàn chỉnh sẽ như sau:
```javascript
var particle = function (options) {
  /* Default options */
  this.defaultOptions = {
    canvas: options.canvas,
    width: options.width ? options.width : window.innerWidth,
    height: options.height ? options.height : window.innerHeight,
    background: options.background ? options.background : 'black',
    nodeNumber: options.nodeNumber ? options.nodeNumber : 20,
    nodeType: options.nodeType ? options.nodeType : 'circle',
    nodeSize: options.nodeSize ? options.nodeSize : 1,
    nodeColor: options.nodeColor ? options.nodeColor : 'rgba(255,255,255,0.5)'
  };
  
  this.fn = {};

  this.ctx = null;

  this.nodes = [];

  var PAR = this;

  PAR.fn.getContext = function () {
      PAR.ctx = PAR.defaultOptions.canvas.getContext('2d');
  }

  PAR.fn.canvasResize = function () {
      PAR.defaultOptions.canvas.width = PAR.defaultOptions.width;
      PAR.defaultOptions.canvas.height = PAR.defaultOptions.height;
  }
  
  PAR.fn.createNodes = function () {
      for (var i = 0; i < PAR.defaultOptions.nodeNumber; i++) {
        PAR.nodes.push(new PAR.node());
      }
  }
  
  PAR.fn.draw = function () {
    for (var i = 0; i < PAR.nodes.length; i++) {
      var node = PAR.nodes[i];
      node.draw();
    }
  }
  
  PAR.node = function () {
    /* Position */
    this.x = Math.random() * PAR.defaultOptions.width;
    this.y = Math.random() * PAR.defaultOptions.height;
    /* Size */
    this.r = Math.random() * PAR.defaultOptions.nodeSize;
 }
 
 PAR.node.prototype.draw = function () {
    var n = this;
    PAR.ctx.beginPath();
    if (PAR.defaultOptions.nodeType === 'rect') {
      PAR.ctx.rect(n.x, n.y, n.r, n.r);
    } else if (PAR.defaultOptions.nodeType === 'circle') {
      PAR.ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    }
    PAR.ctx.fillStyle = PAR.defaultOptions.nodeColor;
    PAR.ctx.fill();
    PAR.ctx.closePath();
 }
}
 
particle.prototype.init = function () {
  this.fn.getContext();
  this.fn.canvasResize();
  this.fn.createNodes();
  this.fn.draw();
}

var p = new particle({
  canvas: document.getElementById('canvas'),
  nodeNumber: 30,
  nodeType: 'rect',
  nodeSize: 5,
  nodeColor: 'black',
  width: 1000,
  height: 300,
  background: 'rgba(200,100,200,1)'
});
p.init();
```
Chạy file *index.html* các bạn sẽ thấy các điểm màu đen được vẽ lên màn hình, mỗi lần refresh lại browser thì các điểm sẽ hiển thị ở vị trí ngẫu nhiên và kích thước ngẫu nhiên.

Xem thêm: [Demo](http://jsbin.com/cidelovitu/1/edit?html,css,js,output)

Video demo: [Youtube](https://www.youtube.com/watch?v=3YGHHokqWIM)

Và chúng ta đã hoàn thành bước đầu tiên, hãy đón xem phần 2 để thực hiện tạo chuyển động cho các hạt.