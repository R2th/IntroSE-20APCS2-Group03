### Tổng quan
Việc tạo hiệu ứng trên trang web chưa bao giờ là đơn giản. SVG (Scalable Vector Graphics) sử dụng đánh dấu XML để giúp hiển thị tốt trên mọi kích thước màn hình. Nếu bạn download ảnh png hoặc jpg bạn sẽ nhận được hình ảnh chỉ có thể hiển thị trên trình duyệt với thẻ `<img/>`. Chúng ta sẽ sử dụng hình ảnh này và trình duyệt có thể hiển thị tốt những ảnh với định dạng này, nhưng nếu chúng ta muốn làm cho nó có hiệu ứng chuyển động thì rất hạn chế. SVG đã thay đổi việc này như thế nào?
```
<svg width=”100" height=”100">
 <circle cx=”50" cy=”50" r=”40" stroke=”green” stroke-width=”4" fill=”yellow” />
</svg>
```
Đây là một ví dụ về SVG. Nó sử dụng XML rất giống với HTML. Để tạo hiệu ứng, điều này khiến mọi thứ trở nên rất đơn giản. 

Đầu tiên để tạo hiệu ứng chúng ta cần tới 2 thư viện **TweenMax** và **TimelineMax** từ **GSAP**. Bạn có thể xem thêm thông tin tại [đây](https://greensock.com/gsap).


Trong hướng dẫn này, mình sẽ không tạo ra ảnh SVG riêng mà chúng ta sẽ lấy trên Internet. Một trong số những trang web chúng ta có thể lấy các icons và các hình ảnh đẹp đó là [Flaticon](https://www.flaticon.com/). Trang web này có rất nhiều lựa chọn khác nhau nhưng ở đây mình sẽ chọn ảnh một màn hình [máy tính](https://www.flaticon.com/free-icon/coding_230317#term=computer&page=1&position=69).


![](https://images.viblo.asia/8800d7ae-c3a1-43db-8da8-b9d940c4cc7e.png)


Khi bạn đã download ảnh, hãy mở tệp và sao chép mã vào trang web như [CodePen](https://codepen.io/) hoặc [JSfiddle](https://jsfiddle.net/)... hoặc bạn có thể sử dụng trình soạn thảo mã của mình. Cùng bắt đầu nào!

### Style cho SVG
Bước này là tùy chọn nhưng ảnh SVG không căn giữa. Chúng ta cũng sẽ thay đổi màu background. Thay đổi màu background thành bất kỳ màu nào bạn muốn và thêm ID cho phần tử SVG (ở đây mình dùng #Layer_1). 
```
body {
  background-color: #2b4b63
}

#Layer_1 {
  display: block;
  margin: 0 auto;
}
```

![](https://images.viblo.asia/24fb688d-b8a4-4f98-b79c-0b5a3dc046a4.gif)

### Phân tích ảnh SVG
Ở phần trên, bạn thấy rằng mình đã sử dụng CSS để căn giữa SVG. Tập tin SVG của chúng ta như sau:
```
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="300" wx="0px" y="0px"
  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
 <path style="fill:#E8EDEE;" d="M361.931,494.345H150.069c0-19.5,15.81-35.31,35.31-35.31h141.241
  C346.121,459.034,361.931,474.845,361.931,494.345"/>
 <polygon style="fill:#B0B6BB;" points="317.793,459.034 194.207,459.034 211.862,388.414 300.138,388.414  "/>
```

Chúng ta có thể sử dụng ID cho từng phần tử SVG riêng biệt. Tất cả các phần tử **polygons** và **paths** là những phần tử khác nhau bên trong ảnh SVG. Điều này sẽ làm mọi thứ trở nên dễ dàng hơn. Bạn có thể nhận thấy ở đây mình gán ID cho các phần tử **polygons** và **paths**

### Tạo hiệu ứng cho phần tử đầu tiên
Hãy chắc chắn là bạn đã import 2 thư viện từ GSAP. Đầu tiên hãy khởi tạo thể hiện của đối tượng timeline. Cách làm như sau: 

Chúng ta khởi tạo timeline sử dụng biến **tl**
```
var tl = new TimelineMax();
```
Chúng ta sử dụng biến tl để tạo hiệu ứng trên timeline. Nó có một số tham số chúng ta phải truyền vào.

`tl.from` : xác định vị trí hiệu ứng bắt đầu và nó sẽ tạo ra hiệu ứng trên trình duyệt hiển thị SVG.

`tl.from('#stand'`: chọn phần tử với ID stand để tạo hiệu ứng. 

`tl.from('#stand', 0.5`: thời gian của hiệu ứng. Trong trường hợp này là nửa giây.

`tl.from('#stand', 0.5, {}`: tất cả mọi thứ bên trong các dấu ngoặc nhọn là các tham số hiệu ứng. Bên trong dấu ngoặc chúng ta có các tham số:

`{scaleY: 0` : thu phóng khiến phần tử biến mất.

`{scaleY:0, transformOrigin: “bottom"` : tham số `transformOrigin` cho biết vị trí xảy ra hiệu ứng transform. Nếu chúng ta không truyền vào tham số `bottom` thì hiệu ứng sẽ xảy ra từ trên xuống dưới. 

`ease: Power2.easeOut`: tham số xác định tốc độ chuyển động. Chúng ta có một công cụ trực quan giúp bạn tạo ra tham số tại [đây](https://greensock.com/ease-visualizer).

![](https://images.viblo.asia/02785e79-77c1-439c-8879-8d5d597772c1.gif)
```
tl.from('#stand', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Power2.easeOut})
```
Chúng ta sẽ được kết quả như sau:

![](https://images.viblo.asia/e224e135-b275-4404-a818-0a809a2c8a78.gif)

Để tạo hiệu ứng sau ngay khi hiệu ứng trước kết thúc, chúng ta chỉ cần sử dụng thêm hàm `.from` ngay bên dưới. 
```
var tl = new TimelineMax();
tl.from('#stand', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Power2.easeOut})
  .from('#standBack', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Bounce.easeOut})
```

### Transform Origin
Chúng ta xem lại các 2 hiệu ứng xảy ra từ dưới lên. Đối với hiệu ứng này, chúng ta muốn phần dưới của màn hình kéo dài từ giữa sang hai bên.

```
var tl = new TimelineMax();
tl.from('#stand', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Power2.easeOut})
  .from('#standBack', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Bounce.easeOut})
.from('#monitorBottom', 0.7, {scaleX: 0, transformOrigin: "center", ease: Bounce.easeOut})
```

![](https://images.viblo.asia/967d91ab-f860-4eb7-89b0-5c7c4e9d7466.gif)

### Tạo hiệu ứng cho màn hình máy tính
Đến đây chúng ta đã tạo ra hiệu ứng tuyệt vời. Tuy nhiên, hiệu ứng xảy quá nhanh nên chúng ta cần một chút delay. Delay sẽ trì hoãn 1 khoảng thời gian trước khi hiệu ứng xảy ra. Bây giờ chúng ta sẽ tạo ra hiệu ứng cho phần trên của máy tính. Chúng ta sẽ sử dụng đoạn mã sau để tạo hiệu ứng cho nó.
```
tl.from('#stand', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Power2.easeOut})
  .from('#standBack', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Bounce.easeOut}) 
  .from('#monitorBottom', 0.7, {scaleX: 0, transformOrigin: "center", ease: Bounce.easeOut})
  .from('#screen', 0.6, {scaleY: 0, transformOrigin: "bottom", ease: Circ.easeOut, delay: 0.4})
```

![](https://images.viblo.asia/55114457-4e3c-47e8-bbc6-9ea842830e3d.gif)

### Tạo hiệu ứng cho box màu vàng
Đối với hiệu ứng này, chúng ta chỉ cần cho nó xuất hiện. Chúng ta sử dụng đoạn mã sau:
```
var tl = new TimelineMax();
tl.from('#stand', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Power2.easeOut})
  .from('#standBack', 0.5, {scaleY: 0, transformOrigin: "bottom", ease: Bounce.easeOut}) 
  .from('#monitorBottom', 0.7, {scaleX: 0, transformOrigin: "center", ease: Bounce.easeOut})
  .from('#screen', 0.6, {scaleY: 0, transformOrigin: "bottom", ease: Circ.easeOut, delay: 0.4})
.from('#yellowBox', 0.5, {scale: 0})
```

![](https://images.viblo.asia/e747d4c0-af30-40f3-8ccd-1bc0cda39b45.gif)

### Tạo hiệu ứng cho các phần tử màu đỏ
Ở những phần trên chúng ta chỉ áp dụng hiệu ứng cho các phần tử đơn lẻ. Ở đây chúng ta có một tập hợp các phần tử màu đỏ nên chúng ta sẽ sử dụng selector chung. Sử dụng devtools chúng ta có thể thấy tất cả các đường màu đỏ đều có phần tử cha là **<g>**. Do đó, chúng ta có selector như sau:
    
`#Layer_1 > g:nth-child(1) > g`

Bây giờ để có được tất cả các phần tử con của phần tử cha này, chúng ta chỉ cần thêm vào đường dẫn đến cuối selector. Điều này sẽ hoạt động:

`#Layer_1 > g:nth-child(1) > g path`

Bây giờ chúng ta có một danh sách tất cả các phần tử có màu đỏ. Chúng ta có thể sử dụng hàm `tl.from` để tạo hiệu ứng này nhưng nó sẽ làm động tất cả chúng cùng một lúc. Thay vào đó chúng ta sử dụng `tl.staggerFrom` sẽ làm chính xác điều này! Hãy cùng xem đoạn mã cuối cùng.

```
.staggerFrom('#Layer_1 > g:nth-child(1) > g path', 0.2, {scaleX: 0}, -0.1)
```

Chúng ta đặt selector mà chúng ta đã xác định trước đó, chúng ta đặt thời gian, chúng ta nhận thấy `-0,1`? Điều đó có nghĩa là gì?

Trên hàm `.staggerFrom`, chúng ta cần xác định tại điểm nào chúng ta muốn mỗi phần tử `path` xảy ra hiệu ứng khi hiệu ứng trước kết thúc. Trong trường hợp này, chúng ta thêm `0.1s`. Lý do chúng ta thêm vào `-` trong đó để hiệu ứng xảy ra từ trái sang phải chứ không phải hướng ngược lại.

![](https://images.viblo.asia/f2f209c7-b751-4522-bea8-686dc26205f2.gif)

Bạn có thể tham khảo toàn bộ source code tại [đây](https://codepen.io/lewismenelaws/pen/ypKjpd)

### Kết luận
Điều làm cho GSAP trở nên tuyệt vời đến nỗi bạn có thể tạo ra những hiệu ứng tuyệt vời như vậy với các phần tử HTML cũng như các phần tử SVG. Khi bạn hiểu cú pháp, việc tạo ra hiệu ứng như thế này chỉ mất 10 phút.

Nguồn tham khảo: https://medium.com/@LewisMenelaws/how-to-create-beautiful-svg-animations-easily-610eb2690ac3