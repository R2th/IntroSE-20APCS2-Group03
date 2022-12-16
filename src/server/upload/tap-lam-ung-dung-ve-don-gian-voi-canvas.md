#### I. Mở đầu
Trong bài viết này mình xin phép chia sẻ các bước tập tành làm ứng dụng **draw** bằng **canvas**, nếu bạn chưa biết thì **canvas** là một thành phần của **HTML** cho phép làm các tác vụ liên quan đến đồ hoạ trên nền **web**.   
Ý tưởng đơn giản là **app** sẽ có một cái bảng, cho phép vẽ lên đó các nét bằng thao tác di **chuột**
![](https://images.viblo.asia/7d45c95f-0fe0-4161-ac90-5b7c76af7cf9.png)
#### II. Thực hiện  
Tạo thư mục **project**.
```
draw-app
   |- index.html
   |- script.js
```
Trước hết cần khởi tạo **canvas**, trong **index.html**  
```html
<!DOCTYPE html>
<html>
  <body>
    <canvas id="canvas"></canvas>
    <script src="script.js"></script>
  </body>
</html>
```
Thiết lập **canvas** và sử dụng **context 2d** để thực hiện vẽ.
```js
// script.js
var canvas = document.getElementById('canvas')
canvas.width = 800
canvas.height = 450
const context = canvas.getContext('2d)
```
Ý tưởng là chúng ta sẽ sử dụng công cụ đơn giản trong **canvas** để vẽ, đó là vẽ đoạn thẳng, giả sử nếu cần vẽ đoạn thẳng nối liền 2 điểm **A (x1, y1) ~ B(x2, y2)**
```js
function Draw(A, B) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
```
Hãy hình dung quá trình vẽ bằng chuột, đầu tiên nhấn chuột (**mousedown**) tại một điểm sau đó giữ và di chuột (**mousemove**), nét vẽ của chúng ta sẽ là tập hợp các điểm mà con trỏ đi qua tới khi kết thúc quá trình vẽ bằng cách bỏ giữ chuột (**mouseup**), chúng ta sẽ sử dụng các **mouse events** để tiến hành.
```js
// biến xác định quá trình vẽ
let drawing = false
// toạ độ điểm bắt đầu vẽ
let startPoint = [0, 0] // x = 0, y = 0

// khai báo các sự kiện (event)
canvas.addEventListener('mousedown', handleMouseDown)
canvas.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
```
Hàm xử lý bắt đầu quá trình vẽ - **mousedown**
```js
function handleMouseDown(event) {
    drawing = true
    const { pageX: x, pageY: y } = event
    // lưu điểm bắt đầu vẽ
    ...
}
```
Ở đây cần lưu ý, khi sự kiện xảy ra, chúng ta cần lưu điểm bắt đầu tương ứng trên **canvas layout**, tuy nhiên không thể lấy trực tiếp toạ độ đó được, mà sẽ chỉ lấy được điểm nhấp chuột tương ứng với toàn bộ **window**. Chúng ta sẽ tính toạ độ hiện tại của khối **canvas** so với màn hình **window** và lấy toạ độ của **event** vừa xác định được trừ đi giá trị đó sẽ biết toạ độ của điểm nhấp chuột trên khối **canvas**
![](https://images.viblo.asia/6589265c-a63f-43ac-b206-9744cbd02b58.png)  

##### Tiến Hành thực hiện
```js
function getPointOfCanvas(event) {
// xác định toạ độ của canvas
  const { x, y } = canvas.getBoundingClientRect()
  const { pageX, pageY } = event
  return [ pageX - x, pageY - y ]
}

function handleMouseDown(event) {
    drawing = true
   startPoint = getPointOfCanvas(event)
}
```
Kết thúc tiến trình vẽ khi người dùng bỏ giữ chuột - **mouseup**, sự kiện này nên được bắt ở toàn bộ ứng dụng thay vì chỉ ở trong khuôn khổ của khối **canvas**, để tránh lỗi khi người dùng di chuột ra bên ngoài **canvas** và bỏ giữ chuột thì không kết thúc tiến trình vẽ.
```js
function handleMouseUp() {
    drawing = false
    startPoint = [0, 0]
}
```
Thực thi vẽ, ở đây ta làm như sau, giả sử nhấp chuột vào điểm **A** sau đó giữ và di chuột tới điểm **B** sau đó tiếp tục di chuột tới điểm **C**, ta sẽ lần lượt vẽ 2 đoạn thẳng từ **A** tới **B** và từ **B** tới **C** và tiếp tục như vậy  
```js
function handleMouseMove(event) {
    // không làm gì nếu chưa trong tiến trình vẽ
    if (!drawing) return
    const nextPoint = getPointOfCanvas(event)
    context.beginPath()
    context.moveTo(...startPoint)
    context.lineTo(...nextPoint)
    context.stroke()
    context.closePath()
    // B sẽ trở thành điểm bắt đầu
    startPoint = [...nextPoint]
}
```
Kiểm tra thành quả:
![](https://images.viblo.asia/bff3d417-a70b-47fa-a079-9634f0f4fc1e.png)  
Không có gì phức tạp phải không các bạn, ở đây mình kết hợp các **mouse event** và **API** đơn giản của **canvas** để bước đầu tạo ra một bảng trắng có thể vẽ bằng cách di chuột, đi sâu vào **canvas** hơn, chúng ta có thể mở rộng ứng dựng với nhiều chức năng thú vị hơn, cảm ơn các bạn đã theo dõi và vui lòng để lại góp ý giúp mình dưới bài viết.