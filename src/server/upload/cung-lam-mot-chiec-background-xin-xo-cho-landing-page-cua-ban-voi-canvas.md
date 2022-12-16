# Mở đầu :wave:
Là một lập trình viên Web chắc chắn ai cũng biết đến HTML, JavaScript, nhưng không phải ai cũng biết đến một thẻ HTML khá thú vị, nó làm cho Website trở nên sinh động hơn, đó chính là `canvas`. Vậy nên hôm nay chúng ta sẽ cũng làm một hình background độc đáo cho trang Web của bạn, hình có tương tác với sự kiện onclick nhé

![](https://images.viblo.asia/dd801bb7-43a2-4b15-8590-c33b2006ec44.png)
![](https://images.viblo.asia/e9727657-36bb-4e76-9dd0-79fb12a4e651.png)

Công nghệ mình sử dụng cho project là Canvas, JavaScript

# Nội Dung
Cho những bạn chưa biết thì  `<canvas>` là một thẻ HTML được sử dụng để vẽ đồ họa trên trang web một cách nhanh chóng. Thẻ  `<canvas>` chỉ là vùng chứa cho đồ họa, chúng ta phải sử dụng JavaScript để thao tác với đối tượng do thẻ canvas tạo ra. Đối tượng `canvas` có một số method để giúp chúng ta vẽ đoạn thẳng, hình hộp, hình tròn, văn bản và thêm hình ảnh. Chi tiết sử dụng thế nào mình sẽ nói ở phần tiếp theo nhé.
    
## HTML
Ở file `HTML` mình chỉ đơn giản sử dụng một thẻ `canvas` với `id` là *canvas*
```HTML 
<canvas id="canvas"></canvas>
```
## Khởi tạo
Đầu tiên chúng ta khởi tạo đối tượng `canvas 2d`, và một số hằng số
```JS
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d') // khởi tạo đối tượng canvas 2d
const H = 800
const W = 800
canvas.width = W
canvas.height = H

// canvas cung cấp method createLinearGradient để tạo hằng số biểu thị Gradient Color để ta có thể sử dụng trong canvas
const gradient = context.createLinearGradient(0, 0, W, H) // tham số là tọa độ 2 điểm chỉ định chiều của gradient
gradient.addColorStop(0, '#92fe9d') // bạn có thể thêm bao nhiêu màu tùy ý
gradient.addColorStop(1, '#00c9ff')

let circles = [] // khởi tạo biến global chứ các điểm di chuyển trên hình

const CIRCLE = {  // hằng số các giá trị cho điểm
  color: 'rgb(256,256,256,0.7)',  // màu sắc của điểm
  colorLine: 'rgb(256,256,256,0.5)', // màu sắc đoạn nối các điểm
  count: 30,   // số lượng điểm xuất hiện cùng lúc trên hình
  vX: 3,   // velocityX vận tốc tối đa theo trục X
  vY: 3,   // velocityY vận tốc tối đa theo trục Y
  range: 150,   // khi dưới khoảng cách này 2 điểm sẽ có đoạn nối
}
```

## Đối tượng Dot
 Tiếp theo chúng ta viết class Dot
 
 ```JS
 class Dot {
  constructor(x, y, vx, vy, r) { //tham số nhận vào
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.r = r   //bán kính của điểm
    this.dotsNears = []  // property xác định danh sách các điểm ở gần, mỗi object gồm tọa độ x y và khoảng cách d giữa 2 điểm
  }

  draw() {  // vẽ điểm và đoạn nối trên canvas
    context.beginPath()   // bắt đầu một đường vẽ, các thuộc tính như màu sắc sẽ trở về mặc định 
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)   //vẽ đường tròn
    context.fillStyle = DOT.color   // style màu cho hình tròn bên trong
    context.fill()  // giờ mới chính tức vẽ
    this.dotsNears.forEach((dotNear) => {   // vẽ các đoạn thẳng nối điểm hiện tại với các điểm gần đấy 
      context.beginPath() 
      context.moveTo(this.x, this.y)   // di chuyển đến tọa độ điểm hiện tại
      context.lineTo(dotNear.x, dotNear.y)   // vẽ đường thằng đến điểm gần đó
      context.lineWidth = (DOT.range - dotNear.d) * (2 / DOT.range)  // độ dày của đoạn thẳng, càng gần nhau thì càng dày, tối đa 2px
      context.strokeStyle = DOT.colorLine    // style màu cho đoạn thằng
      context.stroke()  // gọi thì mới vẽ
    })
  }

  update(dots) {  // update tọa độ điểm theo vận tốc của điểm đó, nhận vào biến global dots để tìm các điểm gần điểm hiện tại
    // khi điểm ta ngoài phạm vi của canvas thì ta sẽ đặt lại tọa độ và random lại vận tốc cho điểm đó
    if (this.x - this.r >= W) {
      this.x = 0 - this.r
      this.vy = (Math.random() - 0.5) * DOT.vY    // ramdom 1 chiều vận tốc thôi, ramdom cả 2 thì sẽ có trường hợp điểm không vào lại canvas mà sẽ bị random tiếp
    } 
    if (this.x + this.r < 0) {
      this.x = W + this.r
      this.vy = (Math.random() - 0.5) * DOT.vY
    }
    if (this.y - this.r >= H) {
      this.y = 0 - this.r
      this.vx = (Math.random() - 0.5) * DOT.vX
    }
    if (this.y + this.r < 0) {
      this.y = H + this.r
      this.vx = (Math.random() - 0.5) * DOT.vX
    }

    this.x += this.vx   // nếu trong hình thì update tọa độ
    this.y += this.vy

    this.dotsNears = []   
    dots.forEach((dot) => {    // tìm tọa độ điểm gần đó
      if (dot === this) return
      const d = Math.sqrt((this.x - dot.x) ** 2 + (this.y - dot.y) ** 2)
      if (d < DOT.range) {
        this.dotsNears.push({ x: dot.x, y: dot.y, d: d })
      }
    })
    this.draw()
  }
}
 ```

## Khởi tạo animate
Ở đây chúng ta sử dụng method `requestAnimationFrame` của đối tượng `window`. Hiểu nôm na nó sẽ như 1 vòng lặp, thay vì `while(true)` vẽ xong xóa thì chúng ra sẽ sử dụng , method của  `window`. Cách sử dụng nó gần giống như kiểu hàm đệ quy, cụ thể như sau

```JS
function init() { // khởi tạo các điểm
  for (let i = 0; i < DOT.count; i++) {
    const r = Math.random() * 3 + 3   //  random bán kính của điểm từ 3 đến 6px 
    const positionX = Math.random() * W
    const positionY = Math.random() * H
    const vx = (Math.random() - 0.5) * DOT.vX    // -0.5 để có cả vận tốc âm, dương, theo trục Y âm sẽ di chuyển từ dưới lên trên
    const vy = (Math.random() - 0.5) * DOT.vY
    dots.push(new Dot(positionX, positionY, vx, vy, r))
  }
}

function animate() {
  requestAnimationFrame(animate) 
  context.fillStyle = gradient   // style màu nền của canvas là màu gradient ta định nghĩ ban đầu
  context.fillRect(0, 0, canvas.width, canvas.height)

  // ....
  
  dots.forEach((dot) => {  // update lại tọa độ các điểm 
    dot.update(dots)
  })
}
 // sau đó chúng ta gọi hàm là đã ok rồi đó
init()
animate()
```
Ở đâu mình muốn nói rõ thêm method `requestAnimationFrame` thông thường có tốc độ là 60 lần mỗi giây (sẽ khớp với tốc độ làm mới hiển thị trong hầu hết các trình duyệt web). Tức là vận tốc di chuyển của các điểm sẽ là vận tốc theo trục của điểm đó `(vx, vy)` nhân với 60/giây. Như ở đầu ta để vận tốc  tối đa của điểm là DOT.vY là 3px tức là nó sẽ có vận tốc tối đa 180px/s
## Thêm sự kiện Click

Giờ chúng ta sẽ thêm sự kiện `click` vào `canvas` để mỗi khi click vào sẽ có 3 điểm xuất hiện từ đó và nở ra, trông khá thích mắt :relaxed:

``` JS
canvas.addEventListener('click', function (event) {
  for (let i = 0; i < 3; i++) {
    const r = Math.random() * 3 + 3
    const positionX = event.offsetX   // tọa độ điểm xuất hiện là tọa độ click chuột
    const positionY = event.offsetY
    const vx = (Math.random() - 0.5) * DOT.vX
    const vy = (Math.random() - 0.5) * DOT.vY
    dots.push(new Dot(positionX, positionY, vx, vy, r))
  }
})
```

Nhưng nếu click nhiều quá thì sẽ có rất nhiều điểm mới được thêm vào, mà cái gì nhiều quá cũng không tốt. Vậy nên ta filter dots nếu nó nhiều hơn `DOT.count` điểm thì điểm nào ra khỏi canvas ta sẽ cho nó đi luôn, khỏi random lại nhé

```JS
function animate() {
  requestAnimationFrame(animate)
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  //filter trước khi update
  if (dots.length > DOT.count) {
    dots = dots.filter(
      (dot) => dot.x + dot.r > 0 && dot.x - dot.r < W && dot.y + dot.r > 0 && dot.y - dot.r < H
    )
  }
  dots.forEach((dot) => {
    dot.update(dots)
  })
}
```

Vậy là ta đã hoàn thành rồi đó :clap:
Đây là link [demo](https://codesandbox.io/s/thirsty-sea-yklby)
# Kết luận
Mình hi vọng với chút chia sẻ như trên sẽ giúp được cho nhiều bạn, đặc biệt là các bạn mới biết thêm những như hay ho mà ta có thể làm được với HTML, JS, từ đó khơi đậy sự sáng tạo, làm cho việc lập trình trở nên thú vị hơn !
Cảm ơn các bạn đã đọc (hay hay không hay thì cũng cho xin 1 vote up nhé mọi người :joy:)