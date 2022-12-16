Tiếp nối phần một, các bạn đã vẽ được các hạt ngẫu nhiên trên khung hình, tuy nhiên tới đây mới chỉ hoàn thành 30% công việc. Hôm nay chúng ta sẽ tiếp tục thêm mắm thêm muối vào cái hiệu ứng cho nó mặn mà hơn chút nhé!

Đầu tiên các bạn hãy nhớ về những đoạn phim hoạt hình được vẽ bằng rất nhiều hình ảnh trên rất nhiều tờ giấy, khi xếp chúng lại và lật qua các trang giấy với tốc độ nhanh thì các hình ảnh trên giấy có hiệu ứng chuyển động. Việc tạo hiệu ứng chuyển động trên canvas cũng như vậy, bản chất là chúng ta sẽ vẽ lại liên tiếp các hình ảnh ở các vị trí khác nhau, việc này diễn ra liên tục sẽ tạo nên một hiệu ứng chuyển động.

Quay lại phần trước tại file *app.js* chúng ta tạo thêm một phương thức **update** như sau:
```javascript
PAR.fn.update = function () {
    for (var i = 0; i < PAR.nodes.length; i++) {
        var node = PAR.nodes[i];
        node.x += 1;
        node.y += 1;
    }
    
    PAR.fn.draw();
    requestAnimationFrame(PAR.fn.update);
}
```
- Phương thức này có nhiệm vụ duyệt qua từng **node** và thay đổi tọa độ của chúng, sau đó sẽ vẽ lại các **node** ở tọa độ mới.
- Tôi lặp lại hành động thay đổi vị trí và vẽ lại các **node** bằng cách sử dụng hàm **requestAnimationFrame()** của javascript, hàm này có chức năng gần giống với **setInterval()** nhưng được tối ưu hóa cho việc tạo hiệu ứng chuyển động. Tham khảo thêm [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

Sau đó gọi hàm **update** tại **init**
```javascript
particle.prototype.init = function () {
  ....
  this.fn.update();
}
```
Các bạn mở lại ví dụ và theo dõi [Demo](https://jsbin.com/tudikeloye/edit?html,js,output)

- Các bạn có thấy các **node** chạy chéo xuống dưới và tạo thành một vệt màu đen? Lý do là các **node** được vẽ lại liên tục tại các vị trí khác nhau nhưng hình ảnh của **node** được vẽ trước đó vẫn hiển thị trên khung hình nên sẽ tạo thành một vệt đen.
- Để khắc phục vấn đề này thì mỗi lần vẽ lại các **node** mình sẽ vẽ đè một hình chữ nhật có kích thước bằng với khung hình để che đi hình ảnh của các **node** đã vẽ trước đó.
```javascript
PAR.fn.update = function () {
    PAR.ctx.fillStyle = PAR.defaultOptions.background;
    PAR.ctx.fillRect(0, 0, PAR.defaultOptions.width, PAR.defaultOptions.height);
    ...
}
```
Mình sẽ vẽ hình chữ nhật ngay khi hàm **update** được gọi, màu của hình chữ nhật được xác định bởi thuộc tính **background** của **options**.

Xem lại ví dụ [Demo](https://jsbin.com/tipisaroru/edit?html,js,output)

- Các bạn sẽ thấy các **node** đã di chuyển, tuy nhiên có 2 vấn đề:
    1. Khi di chuyển quá mép của khung hình thì các **node** sẽ không đổi hướng.
    2. Khi ứng dụng bắt đầu, các **node** sẽ cùng di chuyển về một hướng duy nhất

Để giải quyết các vấn đề trên, mình sẽ thêm vào mỗi đối tượng **node** các thuộc tính là **orx** và **ory**
```javascript
PAR.node = function () {
    ...
    /* Orient */
    this.orx = Math.random();
    this.ory = Math.random();
}
```
- **orx** và **ory** là hướng di chuyển của toạn độ **x**, **y** của **node**. Hai thuộc tính này sẽ nhận giá trị từ hàm **Math.random()** có giá trị ngẫu nhiên từ **0** đến **1**. Tham khảo [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- Dựa vào các giá trị ngẫu nhiên từ **0** - **1** tôi tự định nghĩa ra một quy luật như sau:
```javascript
PAR.fn.update = function () {
    ...
    for (var i = 0; i < PAR.nodes.length; i++) {
        var node = PAR.nodes[i];
        node.x = node.orx > 0.5 ? node.x += 1 : node.x -= 1;
        node.y = node.ory > 0.5 ? node.y += 1 : node.y -= 1;
    }
    ...
}
```
- Nếu **orx** lớn hơn **0.5** thì tôi sẽ tăng tọa độ **x** lên 1, nếu **orx** nhỏ hơn **0.5** thì tôi sẽ giảm toạ độ **x** xuống 1. Nghĩa là nếu **orx** lớn hơn **0.5** thì **node** sẽ di chuyển sang phải, **orx** nhỏ hơn **0.5** thì **node** sẽ di chuyển sang trái.
- Tương tự như thế thì **node** sẽ di chuyển lên trên hoặc xuống dưới tùy theo giá trị của **ory**.
```javascript
PAR.fn.update = function () {
    ...
    for (var i = 0; i < PAR.nodes.length; i++) {
        var node = PAR.nodes[i];
        node.x = node.orx > 0.5 ? node.x += 1 : node.x -= 1;
        node.y = node.ory > 0.5 ? node.y += 1 : node.y -= 1;
        
        /* Check orient */
        if (node.x <= 0) {
            node.orx = 1;
        } else if (node.x >= PAR.defaultOptions.width) {
            node.orx = 0;
        }

        if (node.y <= 0) {
            node.ory = 1;
        } else if (node.y >= PAR.defaultOptions.height) {
            node.ory = 0;
        }
    }
    ...
}
```
- Tiếp theo tôi sẽ kiểm tra nếu **node** di chuyển vượt quá các biên **trên**, **dưới**, **trái**, **phải** thì sẽ thay đổi giá trị của **orx** và **ory** để **node** thay đổi hướng di chuyển. Mục đích của việc này là dữ cho **node** luôn di chuyển trong khung hình mà ko bị đi ra ngoài.Cùng xem lại ví dụ [Demo](https://jsbin.com/bumesohihe/edit?html,js,output).
- Các bạn thấy các **node** đã di chuyển đúng theo mong muốn của chúng ta. Tuy nhiên các **node** lại luôn luôn di chuyển cùng tốc độ với nhau, điều này khiến cho hiệu ứng của chúng ta sẽ trở nên khô cứng và không đẹp mắt.

Để giải quyết vấn đề đó, tôi thêm vào mỗi đối tượng **node** một thuộc tính là **v** (tốc độ di chuyển).
```javascript
PAR.node = function () {
    ...
    /* Speed */
    var that = this;
    this.getV = function () {
        var _v = Math.random() * PAR.defaultOptions.nodeSpeed;
        return _v < 0.2 ? that.getV() : _v;
    }
    this.v = this.getV();
}
```
- **v** sẽ nhận giá trị **random** từ **0.2** đến giá trị **nodeSpeed** trong **options**. Mục đích mình để giá trị min của **v** là **0.2** để ngăn việc các **node** di chuyển quá chậm.

Tiếp theo mình thay giá trị **v** vào đoạn thay đổi giá trị của tọa độ **x**, **y**
```javascript
PAR.fn.update = function () {
    ...
    for (var i = 0; i < PAR.nodes.length; i++) {
        var node = PAR.nodes[i];
        
        // node.x = node.orx > 0.5 ? node.x += 1 : node.x -= 1;
        // node.y = node.ory > 0.5 ? node.y += 1 : node.y -= 1;
        
        node.x = node.orx > 0.5 ? node.x += node.v : node.x -= node.v;
        node.y = node.ory > 0.5 ? node.y += node.v : node.y -= node.v;
        ...
    }
    ...
}
```

Cùng xem lại ví dụ [Demo](https://jsbin.com/filazuqoka/edit?html,js,output)

Tuyệt vời, các **node** đã di chuyển đúng theo mong muốn của chúng ta! Đến đây thì chỉ còn một bước nữa là tính toán khoảng cách giữa các **node** và liên kết chúng với nhau, các bạn hãy đón xem phần tiếp theo nhé!

Video demo: [Youtube](https://www.youtube.com/watch?v=npbWTCy4s3E)