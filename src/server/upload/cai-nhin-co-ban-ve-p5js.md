### Lời mở đầu 
p5.js là một thư viện JavaScript được khởi dựa trên mục đích chính của [Processing](https://processing.org/) (phát triển bởi Ben Fry và Casey Reas) nhằm giúp những người không trong chuyên ngành hay những người mới bắt đầu lập trình có thể  tiếp cận với lập trình tương tác và lập trình đồ họa một cách dễ  dàng hơn. p5.js giúp người dùng có thể tương tác trực tiếp với website. Giống như một cuốn sổ phác họa, p5.js có đầy đủ các bộ chức năng phục vụ cho việc vẽ và annimation trên website. p5.js cũng cung cấp các [thư viện addons](http://p5js.org/libraries/) giúp tương tác dễ dàng hơn với các đối tượng trong HTML5, bao gồm text, input, video, webcam và âm thanh.

### Hello world
Vì p5.js chỉ là một thư viện JavaScript nên tất cả những gì bạn cần làm chỉ là tải file p5.js ở [đây](https://p5js.org/download/) và mọi hướng dẫn cài đặt được hướng dẫn rất dễ hiểu tại [đây](http://p5js.org/get-started/) 

Có hai hàm chính mà bạn sẽ sử dụng trong ứng dụng của bạn. Hàm `setup()` chỉ chạy 1 lần, và chủ yêu sử dụng để khởi tạo, hoặc là để viết một chức năng mà không cần phải chạy nhiều lần lặp đi lặp lại. Hàm `draw()` chạy liên tục. lặp đi lặp lại, thường dùng để làm Animation 

Đầu tiên chúng ta cần tạo hàm `setup()` và thêm 1 dòng như sau
```
function setup() {
  line(15, 25, 70, 90); //tọa độ điểm bắt đầu và kết thúc của đường kẻ
}
```
Khi view trên trình duyệt ta có thể thấy như một đường kẻ chéo nhỏ nhỏ xinh xinh trong một thẻ `canvas` có kích thước 100px x 100px (mình sẽ đề cập đến canvas ở mục tiếp theo).

Thêm hàm `draw()` sẽ giúp bạn tương tác và tạo hiệu ứng và  animation. ở ví dụ phía dưới, biến `x` sẽ được cập nhật mỗi khi hàm `draw()` chạy, khiến hình tròn chạy từ trái sang phải thẻ `canvas`.

```
var x = 0;

function setup() {
  background(100);   //set background cho canvas
}

function draw() {
  ellipse(x, height/2, 20, 20); //vẽ hình tròn với vị trí tâm hình tròn ở tọa độ x và nằm giữa canvas với kích thước cao 20px rộng 20px
  x = x + 1; //tăng 1px cho vị trí tâm hình tròn sau mỗi lần hàm draw() chạy
}
```

Để `p5.js` load và chạy thì yêu cầu phải sử dùng hàm `setup()` hoặc `draw()` (không bắt buộc phải dùng cả hai)

Tất cả các công cụ và phương thức vẽ và thao tác với đồ họa 2D, ảnh và text đều có ở [đây](http://p5js.org/reference/) và một số ví dụ của chúng tại [đây](http://p5js.org/examples/)

### createCanvas

Mặc định khi không quy định gì thì khung `canvas` để chúng ta thao tác sẽ có size là 100x100(px). Nếu bạn muốn set cho nó một kích thước khác thì chúng ta có thể dùng hàm `createCanvas()` với tham số là chiều dài và chiều rộng của khung `canvas` mong muốn. Chúng ta nên dùng hàm này ở dòng đầu tiên của hàm `setup()`.

```
var x = 0;

function setup() {
  createCanvas(600, 400); //tạo một canvas với kích thước là 600x400
  background(100);  
}

function draw() {
  ellipse(x, height/2, 20, 20);
  x = x + 1;
}
```

Vậy là hình tròn bé nhỏ của chúng ta đã có thể chạy xa hơn rồi
![](https://images.viblo.asia/7f3181b9-76fc-4107-8b9e-c67b3e3815eb.png)

`createCanvas()`  sẽ tạo 1 khung canvas với kích thước đã định và append vào trang html mà chúng ta đang code. Nếu trang đó đang có nội dung rồi thì khung `canvas` này sẽ được append xuống dưới cùng của trang web. Nếu bạn muốn set cho nó một vị trí nhất định trong trang web thì chúng ta có thể dùng phương thức parent() và truyền vào id của thẻ bao ngoài vị trí mong muốn đặt `canvas`, như này nè: 
```
<div id='myContainer'></div>
```

Sau đó đặt một biến để trỏ tới khung `canvas` bạn vừa tạo, rồi gọi .parent() từ biến này
```
function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent('myContainer');
}
```

### Tương tác với chuột và cảm ứng

p5.js có một tập hợp các phương thức dùng để handling các sự kiện thao tác chuột và cảm ứng. Bảng bên dưới đã sắp xếp các event của chuột và cảm ứng tương ứng với nhau bao gồm kèm link để tìm hiểu thêm

| mouse | touch |
| -------- | -------- |
| [mouseX](http://p5js.org/reference/#p5/mouseX)   | [touchX](http://p5js.org/reference/#p5/touchX)   |
| [mouseY](http://p5js.org/reference/#p5/mouseY)   | [touchY](http://p5js.org/reference/#p5/touchY)   |
|          | [touches[]](http://p5js.org/reference/#p5/touches%5B%5D)   |
| [mouseIsPressed](http://p5js.org/reference/#p5/mouseIsPressed)   |    |
| [mousePressed()](http://p5js.org/reference/#p5/mousePressed)   | [touchStarted()](http://p5js.org/reference/#p5/touchStarted)   |
| [mouseMoved()](http://p5js.org/reference/#p5/mouseMoved)   | [touchStarted() ](http://p5js.org/reference/#p5/touchMoved)  |
| [mouseDragged()](http://p5js.org/reference/#p5/mouseDragged)   | [touchMoved()](http://p5js.org/reference/#p5/touchMoved)   |
| [mouseReleased()](http://p5js.org/reference/#p5/mouseReleased)   |  [touchEnded()](http://p5js.org/reference/#p5/touchEnded)  |
| [mouseClicked()](http://p5js.org/reference/#p5/mouseClicked)   |    |
| [mouseScrolled()](http://p5js.org/reference/#p5/mouseScrolled)   |   |

Chúng ta có ví dụ đơn giản như sau.

```
function draw() {
  ellipse(height/2, height/2, 50, 50);
  fill(255,0,0);
  if(mouseIsPressed) { //nếu chuột được ấn thì hình tròn sẽ đổi màu từ đỏ sang xanh. và ngược lại khi nhả chuột
    fill(0,255,0);
  }
}
```
### Xử lý bất đồng bộ và load file
JavaScript vốn chỉ có 1 luồng và xử lý đồng bộ, có nghĩa là 1 dòng code thực hiện xong thì mới chạy câu tiếp theo. Tuy nhiên có một số hàm bất đồng bộ được sử dụng nhằm tăng tốc độ của chương trình. Load ảnh, file ngoài hoặc URL về cơ bản là được xử lý bất đồng bộ.

#### Callback
Tất cả các hàm load của p5.js đều chấp nhận một callback function như một tham số optional cuối cùng. Ở ví dụ sau, ảnh sẽ được hiển thị ra thì toàn bộ đã load thành công
```
function setup() {
  createCanvas(400, 240);
  loadImage('con-meo.jpg', drawImage); //drawImage là một hàm callback
}

function drawImage(img) {
  image(img, 0, 0);
}
```

So sánh ví dụ trên với việc gọi image() ngay sau loadImage() sẽ dẫn đến ko có ảnh do ảnh chưa kịp load

```
function setup() {
  createCanvas(400, 240);
  var img = loadImage('con-meo.jpg');
  image(img, 0, 0);
}
```
#### Preload
Ngoài ra, chúng ta có thể sử dụng hàm `preload()`.Nếu có hàm `preload()` tồn tại thì nó luôn chạy đầu tiên, và hàm `setup()` sẽ chờ đến khi tất cả mọi thứ trong hàm `preload()` chạy xong thì nó mới chạy, cho nên chúng ta có thể sử dụng hàm này nhằm preload hết mọi thứ cần thiết và dùng lại chúng  trong `setup()` và `draw()`. Nên chú ý rằng chỉ nên dùng các hàm load ở trong `preload()`, mọi thứ khởi tạo nên ở trong `setup()`, và không cần dùng callback ở đây.

### Các functions liên quan đến trình duyệt và native JavaScript

Có một số biến và hàm giúp việc tương tác với trình duyệt dễ dàng hơn.

* [windowWidth](http://p5js.org/reference/#p5/windowWidth) / [windowHeight](http://p5js.org/reference/#p5/windowHeight)
* [displayWidth](http://p5js.org/reference/#p5/displayWidth) / [displayHeight](http://p5js.org/reference/#p5/displayHeight)
* [winMouseX](http://p5js.org/reference/#p5/winMouseX) / [winMouseY](http://p5js.org/reference/#p5/winMouseY)
* [fullscreen()](http://p5js.org/reference/#p5/fullscreen)

Các function của JavaScript đều có thể sử dụng trong p5.js hoàn toàn bình thường.

### Thư viện

* [p5.dom](http://p5js.org/reference/#/libraries/p5.dom) hỗ trợ tương tác với các đối tượng trong HTML5
* [p5.sound](http://p5js.org/reference/#/libraries/p5.sound) cung cấp một interface đơn giản dễ sử dụng cho HTML5 web audio API để loading, playing và biên tập âm thanh

### Tổng kết

Như vậy ta đã tìm hiểu sơ qua được về p5.js, về một vài hàm mà p5.js hỗ trợ trong việc ta tạo ra các vật thể một cách dễ dàng. Chúng ta cũng đã bắt tay vào làm việc với chương trình và tương tác với chúng. Ở bài viết sau mình sẽ phát triển 1 game nho nhỏ bằng p5.js để áp dụng những kiến thức mà chúng ta đã được làm quen ở bài viết này.

Cảm ơn các bạn.

Nguồn:
* https://github.com/processing/p5.js
* https://p5js.org/