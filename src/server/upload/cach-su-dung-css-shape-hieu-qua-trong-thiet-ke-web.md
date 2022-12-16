## 1. Lời mở đầu
Trong một thời gian dài, hình khối (hình chữ nhật, hình vuông) là hình dạng duy nhất mà một nhà phát triển web có thể tạo bằng cách sử dụng CSS. Hầu hết bố cục không phải hình chữ nhật, hình vuông đều được tạo bằng cách sử dụng hình ảnh, làm ảnh hưởng đến hiệu suất web rất nhiều. Với sự ra đời của CSS3 và CSS Shapes, vấn đề đó đã được giải quyết và làm cho các trang web, trang tạp chí có layout phong phú hơn và đẹp hơn.
## 2. Giới thiệu về CSS Shapes
CSS Shapes cho phép các nhà thiết kế web tạo ra các layout hình học trừu tượng hơn, bên cạnh các hình vuông và chữ nhật đơn giản như cũ. Công nghệ phát triển cung cấp cho chúng ta các thuộc tính CSS mới bao gồm `shape-outside`, `shape-inside`,` shape-margin` và `shape-padding`. Ngoài ra `shape-outside` còn có thể làm việc với giá trị `url()` để có thể tạo shape theo hình png hoặc SVG, lúc này để cắt phần tử theo shape ta sẽ không dùng clip-path nữa mà sẽ dùng mask-image. Trình duyệt hỗ trợ những thuộc tính này khá ít vì các thuộc tính này hiện chỉ hoạt động trên Chrome, Opera và Safari..., bạn có thể kiểm tra các trình duyệt hỗ trợ [tại đây](https://caniuse.com/#search=shape-outside)
## 3. Cách tạo Shapes cơ bản
Cách dễ nhất để xem quy trình CSS Shapes hoạt động là tạo một hình tròn. Dưới đây là một thẻ div (hình tròn) với một đoạn văn kế bên.
* **HTML**
```
<div class="circle"></div>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio ducimus, minus distinctio quae alias velit vel quas aliquid laboriosam, expedita reiciendis, aperiam quos! Soluta necessitatibus commodi adipisci eum optio mollitia.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At provident in commodi similique deserunt atque nostrum fuga aspernatur eos quisquam.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, sit.</p>
```
Dưới đây là một số style cơ bản để tạo ra một hình tròn, bao gồm `width` và `height` của hình tròn của chúng ta,` border-radius` để định hình, và `float` để đoạn văn bao quanh hình tròn. Để cho đoạn văn bám vào đường cong của shape, chúng ta cần thay đổi nó thành một shape thật sự thông qua thuộc tính `shape-outside`; trong trường hợp này, chúng ta sẽ thêm một hàm `circle()` truyền vào như là một giá trị.
* **CSS**
```
.circle {
    width: 250px;
    height: 250px;
    margin: 25px;
    background-color: #40a977;
    border-radius: 50%;
    float: left;
    -webkit-shape-outside: circle();
    shape-outside: circle();
}
```
Như vậy với 1 số thuộc tính css cơ bản và sử dụng `shape-outside` chúng ta đã tạo ra một layout khá là bắt mắt
{@codepen: https://codepen.io/TrinhThang/pen/xaJKbq}
## 4. Cách tạo Shapes nâng cao
Ngoài việc sử dụng 1 số hàm hình học sẵn có của css shape như `circle()`, `ellipse()`, hay `inset()`. Bạn có thể tạo ra các hình học mà mình thích với hàm `polygon()` và sử dụng `url()`
* **Sử dụng hàm `polygon()`**

Để sử dụng được hàm `polygon()` thì ta sử dụng theo định dạng polygon(x1 y1, x2 y2, x3 y3 ...) trong đó tọa độ x và y là tọa độ cho mỗi điểm của đa giác đó, và số điểm tối thiểu của đa giác là 3 điểm.
{@codepen: https://codepen.io/TrinhThang/pen/jveVYR}

* **Sử dụng hàm `url()`**

Một giá trị khác mà chúng ta có thể sử dụng trong thuộc tính shape-outside là hàm url(); hàm tương tự mà chúng ta sử dụng trong CSS để thêm một hình nền. Trong trường hợp này, hàm url() cho phép thuộc tính shape-outside xác định một hình dạng dựa trên hình ảnh. Hình ảnh này được tạo dưới dạng png và được cắt viền sát theo chủ thể ta muốn tạo hình cho shape.

{@codepen: https://codepen.io/TrinhThang/pen/dqjbZK}

Như vậy, sau bài viết này, các bạn có thể sử dụng css shape để tạo ra nhiều layout với các dạng hình khối từ đơn giản đến phúc tạp để làm tăng tính thẩm mỹ cho website của chúng ta.

Chúc thành công!