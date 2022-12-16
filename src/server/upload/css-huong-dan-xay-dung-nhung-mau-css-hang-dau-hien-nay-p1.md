Bạn đã có thể nhận thấy số lượng các ví dụ hiệu ứng CSS có trên các trang web đã tăng lên gần đây. Hiệu ứng đã tạo ra một giật gân trực tuyến và được thiết lập để trở thành một trong những xu hướng thiết kế web quan trọng hiện nay . Tất cả trên web, các nhà thiết kế đang sáng tạo và sử dụng hoạt ảnh CSS để mang cá tính đến trang web của họ, giải thích các ý tưởng phức tạp một cách nhanh chóng và dễ dàng và hướng dẫn hành động của người dùng.

Những hình ảnh động này không cần phải bị thổi phồng - thậm chí một chuyển động tinh tế cũng có thể có tác động lớn (hầu hết vẫn có nguồn gốc trong [12 nguyên tắc hiệu ứng](https://www.creativebloq.com/advice/understand-the-12-principles-of-animation)  cổ điển của Disney). 

Trong bài viết này, mình đã tập hợp một loạt các ví dụ về hoạt ảnh CSS từ một số trang web lớn nhất xung quanh và tìm hiểu về cách tự mình thực hiện các hiệu ứng này. ;;;;;;;
# 1. Thổi bong bóng
![](https://images.viblo.asia/958a67aa-2bde-40b9-b131-b3470fdc11d6.jpg)

[Code](https://codepen.io/matchboxhero/pen/LzdgOv?editors=1100) | [Review](https://www.7up.nl/7up)

Hiệu ứng bong bóng CSS có trên 7UP là một ví dụ tuyệt đẹp về việc mang chủ đề thương hiệu thông qua hoạt ảnh thiết kế trang web. Một số yếu tố: bản vẽ SVG của các bong bóng và sau đó hai hoạt ảnh được áp dụng cho từng bong bóng. 

Các hình ảnh động đầu tiên thay đổi độ mờ đục của bong bóng và di chuyển nó theo chiều dọc trong hộp xem; thứ hai tạo ra hiệu ứng lung lay cho chủ nghĩa hiện thực bổ sung. Việc bù trừ được xử lý bằng cách nhắm mục tiêu mỗi bong bóng và áp dụng thời lượng và thời gian hoạt ảnh khác nhau.

Để tạo ra các bong bóng mình sẽ sử dụng SVG . Trong SVG, mình tạo ra hai lớp bong bóng: một cho các bong bóng lớn hơn và một cho các bong bóng nhỏ hơn. Bên trong SVG, định vị tất cả các bong bóng ở cuối hộp xem.

```
<g class="bubbles-large" stroke-width="7">
  <g transform="translate(10 940)">
  <circle cx="35" cy="35" r="35"/>
  </g>
  ...
</g>
<g class="bubbles-small" stroke-width="4">
  <g transform="translate(147 984)">
  <circle cx="15" cy="15" r="15"/>
  </g>
</g>
  ...
</g>
```
Để áp dụng hai hoạt ảnh riêng biệt cho SVG, cả hai đều sử dụng thuộc tính biến đổi, chúng ta cần áp dụng các hoạt ảnh để phân tách các phần tử. Phần tử `<g>` trong SVG có thể được sử dụng giống như một div trong HTML; chúng ta cần bọc từng bong bóng của chúng ta (đã có trong một nhóm) trong một thẻ nhóm.

```
<g>
  <g transform="translate(10 940)">
  <circle cx="35" cy="35" r="35"/>
  </g>
</g>
```

Để tạo hiệu ứng lung lay, chúng ta chỉ cần di chuyển (hoặc dịch) bong bóng sang trái và phải, chỉ bằng số lượng vừa phải - quá nhiều sẽ khiến hoạt ảnh trông quá khó khăn và bị ngắt kết nối, trong khi quá ít sẽ không được chú ý nhiều. Thử nghiệm là chìa khóa khi làm việc với hoạt ảnh.

```
@keyframes wobble {
  33% {
  transform: translateX(-50px);
  }
  66% {
  transform: translateX(50px);
  }
}
```
Để áp dụng hoạt ảnh cho các bong bóng, mình sẽ sử dụng các nhóm mà mình đã sử dụng trước đó và sự trợ giúp của loại thứ n để xác định từng nhóm bong bóng riêng lẻ. Mình bắt đầu bằng cách áp dụng giá trị độ mờ cho các bong bóng và thuộc tính sẽ thay đổi để sử dụng tăng tốc phần cứng.

```
.bubbles-large > g {
  opacity: 0;
will-change: transform, opacity;}
.bubbles-large g:nth-of-type(1) {...}
...
.bubbles-small g:nth-of-type(10) {...}
```

Mình muốn giữ tất cả thời gian hiệu ứng và sự chậm trễ trong vòng vài giây của nhau và đặt chúng lặp lại vô hạn. Cuối cùng, mình áp dụng chức năng định thời dễ dàng vào hoạt ảnh của mình để làm cho nó trông tự nhiên hơn một chút.
```
.bubbles-large g:nth-of-type(1) {
  animation: up 6.5s infinite; 
}
.bubbles-large g:nth-of-type(1) circle {
  animation: wobble 3s infinite ease-in-out; 
}
...
bubbles-small g:nth-of-type(9) circle {
  animation: wobble 3s 275ms infinite ease-in-out; 
}
.bubbles-small g:nth-of-type(10) {
  animation: up 6s 900ms infinite;
}
```
# 2. Di chuyển chuột
![](https://images.viblo.asia/39adb83c-3178-4608-a365-ea9127a4716f.jpg)

[Code](https://codepen.io/matchboxhero/pen/gGdJYo) | [Review](https://www.balticapprenticeships.com/)

Một hình động chuột di chuyển tinh tế có thể cung cấp hướng cho người dùng khi họ lần đầu tiên truy cập trang web. Mặc dù điều này có thể được thực hiện bằng cách sử dụng các phần tử HTML và các thuộc tính, chúng ta sẽ sử dụng SVG vì điều này phù hợp hơn với việc vẽ.

Bên trong SVG chúng ta cần một hình chữ nhật với các góc tròn và một vòng tròn cho phần tử chúng ta sẽ tạo hiệu ứng động, bằng cách sử dụng SVG, chúng ta có thể mở rộng biểu tượng đến bất kỳ kích thước nào chúng ta cần.
```
<svg class="mouse" xmlns="..." viewBox="0 0 76 130" preserveAspectRatio="xMidYmid meet">
  <g fill="none" fill-rule="evenodd">
  <rect width="70" height="118" x="1.5" y="1.5" stroke="#FFF" stroke-width="3" rx="36"/>
  <circle cx="36.5" cy="31.5" r="4.5" fill="#FFF"/>
  </g>
</svg>
```
Bây giờ mình cần áp dụng một số kiểu đơn giản để kiểm soát kích thước và vị trí của biểu tượng trong vùng chứa. Mình đã bao bọc một liên kết xung quanh SVG chuột và định vị nó ở cuối màn hình.
```
.scroll-link {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
.mouse {
  max-width: 2.5rem;
  width: 100%;
  height: auto;
}
```
Tiếp theo chúng ta sẽ tạo ra hình ảnh động. Tại 0 và 20 phần trăm con đường thông qua hiệu ứng, mình muốn đặt trạng thái của phần tử khi nó bắt đầu. Bằng cách thiết lập nó đến 20% của con đường thông qua, nó sẽ vẫn còn cho một phần của thời gian khi lặp đi lặp lại vô hạn.
```
@keyframes scroll {
  0%, 20% {
  transform: translateY(0) scaleY(1);
  }
}
```
Chúng ta cần thêm điểm bắt đầu opacity và sau đó chuyển đổi cả vị trí Y và tỷ lệ dọc ở mốc 100%, kết thúc hoạt ảnh của chúng ta. Điều cuối cùng chúng ta cần làm là giảm độ mờ đục để làm mờ dần vòng tròn của chúng ta.
```
@keyframes scroll {
  ...
  10% {
  opacity: 1;
  }
  100% {
  transform: translateY(36px) scaleY(2);
  opacity: 0.01;
  }
}
```
Cuối cùng, mình áp dụng hoạt ảnh cho vòng kết nối.
```
.scroll {
  animation-name: scroll;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.650, -0.550, 0.250, 1.500);
  animation-iteration-count: infinite;
  transform-origin: 50% 20.5px;
  will-change: transform;
}
```
# 3. Viết động
![](https://images.viblo.asia/3fd05702-cafa-4a84-b6ea-161f39cbbf65.jpg)

[Code](https://codepen.io/matchboxhero/pen/oGVJXe?editors=1100) | [Review](https://garden-eight.com/)

Trang web Garden Eight sử dụng một kỹ thuật hiệu ứng chung, nhờ đó văn bản dường như được viết ra. Để đạt được hiệu quả, mình chuyển sang SVG. Có hai cách tiếp cận ở đây: chuyển đổi văn bản thành đường dẫn để tạo hiệu ứng động hoặc sử dụng văn bản SVG. Cả hai cách tiếp cận đều có ưu và khuyết điểm của nó.

# 4. Chim bay
![](https://images.viblo.asia/6abffe5d-f505-4ab4-9587-2fe3e8d1b16f.jpg)

[Code](https://codepen.io/matchboxhero/pen/RLebOY?editors=1100) | [Review](https://fournier-pere-fils.com/home)

Mình bắt đầu với các đường vector hoàn toàn thẳng, vẽ từng khung hình hoạt họa của mình, mô tả chim ở trạng thái khác nhau của chuyến bay. Sau đó mình thao tác các điểm vectơ và làm tròn các đường thẳng và cạnh. Cuối cùng, mình đặt mỗi khung vào một hộp có kích thước bằng nhau và đặt chúng cạnh nhau. Xuất tệp dưới dạng SVG.

Thiết lập HTML thực sự đơn giản, chỉ cần quấn từng con chim vào một thùng chứa để áp dụng nhiều hoạt ảnh - một để làm cho chim bay và con kia di chuyển nó qua màn hình.

```
<div class="bird-container">
  <div class="bird"></div>
</div>
```

```
.bird {
  background-image: url('bird.svg');
  background-size: auto 100%;
  width: 88px;
  height: 125px;
  will-change: background-position;
}
@keyframes fly-cycle {
  100% {
  background-position: -900px 0;
  } 
}
```
Hoạt ảnh CSS có một vài thủ thuật mà bạn có thể không biết. Chúng ta có thể sử dụng chức năng animation-timing-function để hiển thị hình ảnh theo các bước - giống như lướt qua các trang trong sổ ghi chép để ám chỉ đến hoạt ảnh.

```
animation-name: fly-cycle;
animation-timing-function: steps(10);
animation-iteration-count: infinite;
animation-duration: 1s;
animation-delay: -0.5s;
```
Bây giờ mình đã tạo chu kỳ bay, chim hiện đang vỗ cánh nhưng không đi đâu cả. Để di chuyển trên màn hình, mình tạo ra một hoạt ảnh khung hình chính khác. Hoạt ảnh này sẽ di chuyển con chim trên màn hình theo chiều ngang trong khi cũng thay đổi vị trí thẳng đứng và tỷ lệ để cho phép con chim uốn lượn trên thực tế hơn.

```
.bird--one {;
  animation-duration: 1s;
  animation-delay: -0.5s;
}
.bird--two {
  animation-duration: 0.9s;
  animation-delay: -0.75s;
}
```

# 5. Menu và close
![](https://images.viblo.asia/1867bc6e-6e15-4f56-aa76-8a9ab50d320d.jpg)

[Code](https://codepen.io/matchboxhero/pen/XexMRo) | [Review](https://better.agency/)

Hoạt ảnh này được sử dụng trên toàn bộ web, chuyển ba dòng thành biểu tượng chéo hoặc đóng. Cho đến gần đây, phần lớn các triển khai đã đạt được bằng cách sử dụng các phần tử HTML, nhưng thực tế SVG phù hợp hơn với loại hoạt ảnh này - không còn cần phải làm nổi bật mã nút của bạn với nhiều nhịp nữa. 

Chúng ta sẽ dựa vào việc chuyển đổi hai thuộc tính: opacity và rotation. Trước hết, chúng ta muốn làm mờ các dòng 1 và 4, chúng ta có thể nhắm mục tiêu bằng cách sử dụng bộ chọn : nth-child.

```;
.menu-icon.is-active {element-type}:nth-child(1),
.menu-icon.is-active {element-type}:nth-child(4) {
  opacity: 0; }
```
Điều duy nhất còn lại để làm là nhắm vào hai đường giữa và xoay chúng 45 độ theo hướng ngược lại.
```
.menu-icon.is-active {element-type}:nth-child(2) {
  transform: rotate(45deg); }
.menu-icon.is-active {element-type}:nth-child(3) {
  transform: rotate(-45deg); } 
```
# 6. Chasing circles
![](https://images.viblo.asia/d626c0c9-5049-4358-b795-4d448422e804.jpg)

[Code](https://codepen.io/matchboxhero/pen/bomWGK?editors=1100) | Review

Biểu tượng tải động được tạo thành từ bốn vòng tròn. Các vòng tròn không có điền, nhưng có xen kẽ màu sắc đột quỵ.

```
<svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
  <circle cx="170" cy="170" r="160" stroke="#E2007C"/>
  <circle cx="170" cy="170" r="135" stroke="#404041"/>
  <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
  <circle cx="170" cy="170" r="85" stroke="#404041"/>
</svg>
```

```
circle:nth-of-type(1) {
  stroke-dasharray: 550; 
}
circle:nth-of-type(2) {
  stroke-dasharray: 500; 
}
circle:nth-of-type(3) {
  stroke-dasharray: 450;}
circle:nth-of-type(4) {
  stroke-dasharray: 300; 
}
```
Tiếp theo, chúng ta cần tạo hoạt ảnh keyframe. hiệu ứng của mình rất đơn giản: xoay vòng tròn 360 độ. Bằng cách đặt chuyển đổi ở mốc 50% của hoạt ảnh, vòng tròn cũng sẽ quay lại vị trí ban đầu của nó.

```
@keyframes preloader {
  50% {
  transform: rotate(360deg);
  } 
}
```

```
animation-name: preloader;
animation-duration: 3s;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;
```
Tạo ra sự chậm trễ bằng cách sử dụng vòng lặp Sass.

```
@for $i from 1 through 4 {
  &:nth-of-type(#{$i}) {
  animation-delay: #{$i * 0.15}s;
  } }
```
Do sự chậm trễ, vòng tròn bây giờ hiệu ứng lần lượt, tạo ra ảo ảnh của các vòng tròn theo đuổi nhau. Vấn đề duy nhất với điều này là khi trang tải lần đầu tiên, các vòng tròn là tĩnh, sau đó chúng bắt đầu di chuyển, từng cái một. Chúng ta có thể đạt được hiệu ứng offset tương tự, nhưng dừng tạm dừng không mong muốn trong hoạt ảnh của chúng ta bằng cách đơn giản thiết lập độ trễ cho một giá trị âm.

`animation-delay: -#{$i * 0.15}s;`


Còn tiếp ...