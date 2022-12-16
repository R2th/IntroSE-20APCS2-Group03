# Zdog là gì?
Zdog là một 3D JavaScript engine cho `<canvas>` và SVG. Với Zdog, bạn có thể thiết kế và hiển thị các mô hình 3D đơn giản trên web. Zdog là một công cụ giả 3D (pseudo-3D). Hình học của nó tồn tại trong không gian 3D nhưng được hiển thị dưới dạng phẳng, điều này làm cho Zdog trở nên đặc biệt. 

Một vài đặc trưng của Zdog đó là:

* Zdog là thư viện nhỏ: nó chỉ nó 2100 dòng code, chiếm 28KB.
* Zdog tròn: tất cả các hình tròn được hiển thị dưới dạng cạnh tròn, không có răng cưa đa giác.
* Zdog thân thiện: các model được thực hiện bằng cách khai báo thẳng các API.

Zdog được thiết kế để mang lại sự đơn giản của minh họa vector sang 3D. Việc vẽ vòng tròn và hình vuông sẽ trở nên dễ dàng và thú vị hơn.

Trong bài viết này, mình sẽ chỉ đi tìm hiểu những khái niệm đơn giản và những bản demo nhỏ giúp chúng ta dễ hình dung hơn về Zdog. Let's go!
# Getting started
## 1. Install
Giống như 1 thư viện Javascript, bạn có thể include Zdog vào project bằng các cách sau:

**Download**

* [zdog.dist.min.js](https://unpkg.com/zdog@1.1.0/dist/zdog.dist.min.js) - minified
* [zdog.dist.js](https://unpkg.com/zdog@1.1.0/dist/zdog.dist.js) - un-minified

**CDN**

Link trực tiếp đến Zdog trên [unpkg](https://unpkg.com/):
```
<script src="https://unpkg.com/zdog@1/dist/zdog.dist.min.js"></script>
```

**Package managers**

* Cài đặt với npm: `npm install zdog`
* Cài đặt với Bower: `bower install zdog --save`

Chưa cần hiểu code như thế nào, trước tiên bạn hãy xem bản demo `Hello world` trên codepen để xem qua cách làm việc của Zdog:
{@embed: https://codepen.io/desandro/pen/YbrLaO}

DeSando đã cung cấp một `Getting Started guide` rất chi tiết và đầy đủ, và mình cũng sẽ dựa vào nó để tìm hiểu cách làm việc của thư viện này.
## 2. Zdog làm việc như thế nào
Đầu tiên hãy thử tạo 1vòng tròn SVG tĩnh.

Bạn chỉ cần khai báo 1 thẻ bao `<svg></svg>`. Nếu bạn muốn tạo đồ họa Zdog bằng phần tử canvas, thì bạn có thể thay thế thẻ `svg` bằng `canvas`.

```html
 <svg id="circle" width="100" height="100"></svg>
```

Và giờ ta sẽ thêm CSS cho phần tử SVG này:
```css
#circle {
    background-color: #081d3f;
    width: 100vw;
    height: 100vh;
} 
```

Cuối cùng là thêm Javascript:
```javascript
/* tạo một thực thể Zdog của lớp Illustration */
    let circle = new Zdog.Illustration({
      element: '#circle'
    })

    /* tạo một thực thể Zdog của lớp Ellipse */
    new Zdog.Ellipse({
      // thêm vòng tròn
      addTo: circle,
      // thiết lập một vài thuộc tính
      diameter: 20,
      stroke: 20,
      color: '#ccc'
    })

    // hiển thị
    circle.updateRenderGraph()
```

Chúng ta sẽ cùng nhau đi giải thích những dòng code ở bên trên:

Đầu tiên bạn cần tạo 1 thực thể của lớp Zdog. `Illustration` là lớp cao nhất (top-level) liên quan đến phần tử `<canvas>` hoặc `<svg>`. Hình mà bạn tạo sẽ là con của thực thể `Illustration`.

`Ellipse` sẽ là lớp hình học. Bạn có thể tạo một thực thể mới của lớp `Ellipse` và thêm chúng vào container, ở đoạn code trên ta vẽ hình tròn `circle` thì bạn sử dụng hàm `addTo()`. Zdog còn cung cấp rất nhiều hình dạng được xác định trước như là `rect`, `polygon`... Nếu bạn muốn tự custom hình của riêng mình thì phải sử dụng lớp `Shape` và xác định các `path` và `line` của nó.

Để biết thêm về các thuộc tính cần thêm, bạn hãy tìm hiểu [link](https://zzz.dog/api#shape) này. Như ví dụ trên thì chúng ta thiết lập đường kính (diameter), hiển thị đường kẻ hình và độ rộng đường kẻ (stroke), và màu sắc của hình (color).

Ngoài ra còn có các thuộc tính rất hay như:
* width: set độ rộng cho hình, mặc định width: 1
* height: set chiều cao cho hình, mặc định height: 1
* cornerRadius: set bo góc cho hình, mặc định là cornerRadius: 0.25
* quarter: chia hình tròn thành 1 nửa hoặc 1/4, vd quarters: 2 là chia nửa hình tròn
* Với hình đa giác thì set số mặt với thuộc tính `sizes`  và bán kính `radius`


Quan trọng hơn, để hiển thị được hình vẽ lên màn hình, bạn phải gọi hàm `updateRenderGraph()` trên thực thể `circle` đã khai báo lúc đầu.

Đoạn code của chúng ta sẽ trông như sau:

{@embed: https://codepen.io/antonietta/pen/bPBeXZ}

## 3. Animating và Dragging với Zdog
Animation yêu cầu thực thể `circle` phải được re-rendered (hiển thị lại) trên mọi khung nhìn. Để làm được như vậy, Zdog đã hỗ trợ hàm `requestAnimationFrame()` như sau:
```javascript
function animate() {
      /* tăng dần vòng quay trên trục y */
      circle.rotate.y += 0.03
      // re-render hình tròn
      circle.updateRenderGraph()
      // tạo khung hình động        
      requestAnimationFrame(animate)
    }

    animate()
```

Zdog hỗ trợ bạn thêm chức năng dragging (kéo) 1 cách nhanh chóng. Đây là những gì bạn cần làm nếu bạn muốn dừng animation khi bắt đầu kéo và tiếp tục animation sau khi quá trình kéo kết thúc.

Đầu tiên thiết lập cờ `isSprinning` là `true`:
```javascript
let isSpinning = true
```

Tiếp đến, hãy chọn thực thể `circle` của class `Illustration` và thiết lập thuộc tính `dragRotate` thành `true`. Sau đó, chuyển flag bên trong các phương thức `onDragStart()` và `onDragEnd()`, khi quá trình kéo bắt đầu thì đặt `isSpinning` là false, sau khi quá trình kéo kết thúc nó sẽ trở thành `true`:
```javascript
let circle = new Zdog.Illustration({
    element: '#circle',
    dragRotate: true,
    onDragStart() {
        isSpinning = false
    },
    onDragEnd() {
        isSpinning = true
    }
})
```

Muốn hàm `animate()` thực hiện thì hãy đặt đoạn code trên ở trên cùng để việc xoay vòng chỉ được thực hiện khi cờ `isSpinning` được thiết lập là `true`.
```javascript
if(isSpinning) {
    circle.rotate.y += 0.03 
}
```
{@embed: https://codepen.io/antonietta/pen/jjVBWO}

# Kết luận

Đây mới chỉ là phần đơn giản nhất của Zdog, nó còn rất nhiều điều tuyệt vời cần bạn khám phá thêm nữa. Bạn còn có thể mix chúng với những thư viện khác như là [GreenSock](https://greensock.com/) để có nhiều thứ hay ho hơn.

Dưới đây là resources và các demos mà bạn có thể tham khảo và học hỏi thêm:
* [Zdog website](https://zzz.dog/): nơi bạn có thể tìm thấy các chi tiết về API, demos,  hướng dẫn...
* [Holy Zdog](https://blog.codepen.io/2019/06/07/holy-zdog/): là một CodePen blog với những demo cơ bản về Zdog
* [Made with Zdog](https://codepen.io/collection/DzdGMe/): một CodePen collection với những demo về Zdog
* [Made with Zdog](https://twitter.com/i/moments/1135000612356206592): một bộ sưu tập các bản demo tuyệt vời trên Twitter

Còn chần chờ gì nữa mà không sáng tạo ra những hình ảnh 3D của riêng mình với Zdog!

Tham khảo: 
> https://zzz.dog/