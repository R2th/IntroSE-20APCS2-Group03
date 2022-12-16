Việc căn giữa phần tử bằng CSS là việc thường xuyên phải làm trên bất cứ giao diện web nào. Dưới đây là một tập các kĩ thuật căn giữa phần tử bằng CSS mà mình sưu tầm được. Cùng tham khảo nhé!<br>
### 1. Căn giữa theo chiều ngang<br>
**Text**<br>
Dễ dàng căn giữa cho text với **'text-align: center;'**<br>

![](https://images.viblo.asia/b780c2c0-a190-484d-80f0-0d2afdd0d63b.png)

**Block**<br>
Có nhiều cách để căn giữa cho một phần tử Block, tiêu biểu có 4 cách sau đây<br>
Cách 1:<br>
Bất cứ phần tử Block nào đều có thể căn giữa bằng cách căn lề tự động trái, phải và set độ rộng cho phần tử.<br>

![](https://images.viblo.asia/9c04acec-8157-4729-a0ae-c1758ffd4e76.png)

Cách 2:<br>
**'text-align: center'** là một trong những cách phổ biến để căn giữa phần tử. Nó thường sử dụng chủ yếu để căn giữa văn bản trên trang HTML, nhưng nó cũng có thể sử dụng để căn giữa cho một div.<br>
   {@embed: https://codepen.io/ThanhNhanHT/pen/qGrVPY}

Cách 3:<br>
Cách hiện đại nhất hiện nay đó là sử dụng Flexbox. Bất cứ phần tử nào bên trong #mysection thì đều được căn giữa:

![](https://images.viblo.asia/8b591d67-3081-498d-b579-182e8e0a59cb.png)

Kết quả:

![](https://images.viblo.asia/5c821a0b-55bc-47b3-bf16-2265e65cf0fd.png)

Cách 4:<br>
Kết hợp giữa position và transform cũng dễ dàng giúp bạn căn giữa phần tử. Trên phần tử con, set position là absolute và 'left: 50%'. Vì vị trí được tính từ góc trên cùng bên trái, nên ta set lại transform: translate(-50%, 0).

{@embed: https://codepen.io/ThanhNhanHT/pen/MdpOdE}

### 2. Căn giữa cả chiều ngang và chiều dọc<br>


Cách 1:<br>
Sử dụng Flexbox để căn giữa theo chiều dọc và chiều ngang dễ dàng với **'justify-content: center;'** và **'align-items: center;'**

{@embed: https://codepen.io/ThanhNhanHT/pen/yWMpOp}

Cách 2:

Postion cũng là một cách hoàn hảo để căn đều nữa nhé. Tương tự như căn giữa theo chiều ngang, ta bổ sung thêm căn chỉnh dọc nhờ 'top: 50%' và 'transform: translate(-50%, -50%)'

{@embed: https://codepen.io/ThanhNhanHT/pen/yWMpgv}

Cách 3:

Căn chỉnh bằng **'display: grid;'**:

{@embed: https://codepen.io/ThanhNhanHT/pen/wbJpdJ}

**Tài liệu tham khảo:**<br>
* https://flaviocopes.com/css-centering/
* https://www.w3schools.com/howto/howto_css_center-vertical.asp
* https://medium.freecodecamp.org/how-to-center-things-with-style-in-css-dc87b7542689

### Tổng kết:

Bài viết chỉ mang tính chất liệt kê các cách để các bạn tham khảo. Để hiểu sâu và cụ thể hơn, các bạn nên bắt tay vào làm và tìm hiểu chi tiết từng thuộc tính nhé! Hi vọng mọi người sẽ tăng thêm skill CSS với các tips trên