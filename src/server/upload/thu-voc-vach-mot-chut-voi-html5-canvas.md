**Canvas thực sự không khó, nó khá đơn giản với những dev...giỏi (giỏi cả về logic và thuật toán) :D. Thật ra khi bắt đầu tiếp cận với canvas sẽ khá nhanh, vì các hàm để tương tác với canvas được định nghĩa rõ ràng và dễ hiểu.**

Tuy nhiên, cái khó ở đây chính là khi tiếp cận với những hiệu ứng phức tạp (các bạn có thể tìm thấy hàng tá demo trên [Codepen](https://codepen.io/KyeBuff/pen/eevxxw)). Để có được những hiệu ứng lung linh đó các bạn không chỉ đơn thuần chỉ dùng các hàm của canvas, mà còn phải động đến 1 mớ các công thức toán học dài loằng ngoằng và rắc rối...sẽ làm bạn nhanh chóng bị rối não. :D

Thôi thì mình cũng biết thân biết phận, cũng đua đòi vọc vạch được một số thứ hay ho của canvas và làm 1 vài thứ linh tinh để tự an ủi mình. 

Mình xin để [demo](https://codepen.io/tranquocy/pen/vYOKyBB) của sản phẩm đã hoàn thiện trước cho sinh động, rồi sau đó cùng đi tìm hiểu từng bước để hoàn thành nhé. ;)

{@embed: https://codepen.io/tranquocy/pen/vYOKyBB}

***Nó chính là 1 cái đồng hồ treo tường đó các bạn ạ.*** :D

### Bước 1. Vẽ khung và tâm
Đầu tiên đồng hồ thì cần phải có 1 cái khung chứa, chiều cao chiều rộng tuỳ các bạn set nhé, thêm vài thuộc tính CSS cho nó dễ nhìn.

> HTML code

```html
<canvas width="400" height="400"></canvas>
```
> CSS code

```css
body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
  }
```

**Nền đồng hồ**

> Javascript code
```javascript
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// bán kính đường tròn
let radius = canvas.height / 2;

function drawClock() {
  // dịch chuyển tâm đường tròn về đúng chính giữa, mọi thứ sau này sẽ đều bắt đầu từ đây
  ctx.translate(radius, radius);
  // vẽ đường tròn
  ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

drawClock();
```

Ở đoạn code trên, 2 dòng đầu tiên chỉ đơn giản là lấy ra thẻ Canvas trong HTML để Javascript có thể tương tác (bản thân thẻ Canvas thì không có khả năng gì cả :)).

Biến `let radius` là giá trị của bán kính đường tròn, bởi vì đồng hồ là hình tròn, hay nói đúng hơn là có tâm và các kim xoay quanh tâm đó tạo thành hình tròn, bán kính sẽ bằng nửa đường kính, mà đường kính thì bằng đúng chiều cao của phần tử Canvas.

**Viền và đồng tâm**
> Javascript code

```javascript
// Viền đồng hồ
grd = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
//  màu bắt đầu
grd.addColorStop(0, "#333");
//màu trung gian
grd.addColorStop(0.5, "#fff");
// màu kết thúc
grd.addColorStop(1, "#333");
ctx.strokeStyle = grd;
ctx.lineWidth = radius*0.1;
ctx.stroke();

// Tâm đồng hồ
ctx.beginPath();
ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
ctx.fillStyle = "#333";
ctx.fill();
```

Để tạo viền đồng hồ ta dùng phương thức `createRadialGradient` để vẽ nhằm mục đích tạo viền có màu dạng gradient, viền trong nhỏ hơn đường kính (`radius * 0.95`) và viền ngoài lớn hơn chút để tạo sự tương phản rõ ràng (`radius * 1.05`), cùng kết hợp với màu trắng đen và độ dày của viền là `radius*0.1`.

Sau đó vẽ tâm, đơn giản là 1 hình tròn ở giữa với độ rộng bằng 1/10 đường tròn `radius * 0.1`.

### Bước 2. Hiển thị số

> Javascript code

```javascript
function drawClockNumber(getContext, radius) {
  let ang;
  let num;

  // 3 dòng này chỉ đơn giản là định dạng font chữ
  getContext.font = radius * .15 + "px arial";
  getContext.textBaseline="middle";
  getContext.textAlign="center";
  
  for(num = 1; num < 13; num++) {
    // tính toán vị trí xuất hiện của mỗi số
    ang = num * (2*Math.PI) / 12;
    
    // xoay số tương ứng với 1 góc bằng giá trị 'ang'
    getContext.rotate(ang);
    // dịch chuyển số từ tâm x=0, y=0 đến vị trí y ở mép ngoài của đồng hồ
    getContext.translate(0, -radius * 0.85);
    // xoay ngược trở lại để số nằm thẳng đứng
    getContext.rotate(-ang);
    // Viết số
    getContext.fillText(num.toString(), 0, 0);
    // reset về tâm sau khi xoay để tiếp tục fill cho số tiếp theo
    getContext.rotate(ang);
    getContext.translate(0, radius * 0.85);
    getContext.rotate(-ang);
  }
}
```

Trong function trên ta quan tâm đến vòng `for`, để hiển thị số lên mặt đồng hồ sao cho vị trí của mỗi số có vị trí tương đối chính xác nhất ta cần áp dụng 1 chút kiến thức toán lượng giác cấp 3. 

> Theo quy ước trong toán lượng giác ta có `𝞹 = 180 độ`, tương đương với `2𝞹 = 360 độ` (1 vòng tròn bằng 360 độ).

Áp dụng quy ước trên, ta sẽ tính toán vị trí của các số tương ứng trên đồng hồ từ 1 đến 12 bằng cách chia đồng hồ thành 12 phần, mỗi phần tương ứng với 1 số theo thứ tự từ nhỏ đến lớn:

> `ang = num * (2 * Math.PI) / 12;`

Nghĩa là số 1 sẽ nằm ở vị trí 1/12 của đường tròn, số 2 sẽ nằm ở vị trí 2/12 của đường tròn... cứ thế cho đến số 12 là vừa đủ 1 vòng tròn.

### Bước 3. Vẽ kim
Tương tự như vẽ số ở trên, ta cũng áp dụng cách tính của công thức lượng giác `𝞹 = 180 độ` để tính vị trí của kim giờ, kim phút và kim giây.

```javascript
function drawClockTime(getContext, radius){
  // lấy ra giờ, phút, giây hiện tại của hệ thống
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  
  //hour
  hour = (hour*2*Math.PI/12)+(minute*2*Math.PI/(12*60))+(second*2*Math.PI/(360*60));
  drawHand(getContext, hour, radius*0.5, radius*0.07);
  //minute
  minute = (minute*2*Math.PI/60)+(second*2*Math.PI/(60*60));
  drawHand(getContext, minute, radius*0.8, radius*0.07);
  // second
  second = (second*2*Math.PI/60);
  drawHand(getContext, second, radius*0.9, radius*0.02);
}

function drawHand (getContext, pos, length, width) {
  getContext.beginPath();
  getContext.lineWidth = width;
  getContext.moveTo(0, 0);
  getContext.rotate(pos);
  getContext.lineTo(0, -length);
  getContext.stroke();
  getContext.rotate(-pos);
}
```

### Bước 4. Chạy đồng hồ

Gom tất cả các funtion trên gom lại thành 1 function duy nhất và dùng hàm `setInterval` để set thời gian chạy là `1000ms` tương ứng với 1s đồng hồ chạy.

> Javascript code 

```javascript
setInterval(drawClock, 1000);

function drawClock() {
  drawClockFace(getContext, radius);
  drawClockNumber(getContext, radius);
  drawClockTime(getContext, radius);
}
```

Đã xong, bây giờ thì bỏ code vào 1 chiếc laptop rồi treo lên tường để có 1 chiếc đồng hồ treo tường thật là độc đáo nào các bạn :D.

Cảm ơn các bạn đã theo dõi bài viết của mình. Xin chào và hẹn gặp lại! ;)

Tham khảo: [https://www.w3schools.com/graphics/canvas_clock.asp](https://www.w3schools.com/graphics/canvas_clock.asp)