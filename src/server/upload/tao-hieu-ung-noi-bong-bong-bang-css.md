Chào các bạn, chắc hẳn đã từng có đôi lúc rảnh tay lướt web, bạn từng thấy một số trang có hiệu ứng animation đẹp long lạnh lung linh mà không biết họ làm như nào... :nerd_face:  , một số website có hiệu ứng animation đặc biệt như [species-in-pieces](http://www.species-in-pieces.com/), [mikimottes](https://www.mikimottes.com/), hay 1 trang mình thấy thú vị nhất đó là [7up](https://www.7up.nl/7up) . 
Hôm nay mình xin được mạn phép chỉ các bạn cách làm một hiệu ứng khá đẹp mà lại đơn giản..:sweat_smile: Đó là hiệu ứng nổi bọt bong bóng. :3 
Nào chúng ta cùng bắt tay vào làm nhé
# Ý tưởng
Với những người không giỏi về mảng frontend như mình :sweat_smile: thì thoạt nhìn hiệu ứng nổi bọt có vẻ khá phức tạp và chắc hẳn phải có một tảng code javascript to đùngggggg mới có thể làm được. Nhưng qua tìm hiểu cũng như tham khảo một số nguồn, mình nhận thấy thật ra không quá khó để làm mà chẳng cần tới một dòng js nào. Chúng ta chỉ cần một vài thẻ svg để vẽ lên những bong bóng và animation css để thực hiện việc chuyển động là có thể xây dựng được mớ bong bóng mượt mà và ngon lành :laughing: 
Nói qua một chút về SVG và animations :
## SVG là gì?
SVG (Scalable Vector Graphics), là một định dạng hình ảnh (tương tự như JPG, PNG,... mà chúng ta vẫn thường dùng) sử dụng cấu trúc XML để hiển thị hình ảnh dưới dạng vector. Vì là hình ảnh dạng vector nên chúng ta có thể hiển thị, co giãn (scale) thoải mái mà không làm giảm chất lượng hình ảnh. Một ưu điểm của SVG là tất cả mọi element và attribute của các element đó đều có thể animate.
## Animation trong css
Thuộc tính animation trong css xác định một chuyển động của một tag hay một hình ảnh, là sự tổng hợp của các thuộc tính: animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction.
# Thực hành
Đầu tiên chúng ta cần một vài thẻ để định nghĩa lên các bong bóng, chúng ta cần 2 loại bong bóng lớn và nhỏ để hiệu ứng nhìn thật và sinh động hơn :
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
Trong đó class `bubbles-large` chứa các bong bóng to  với độ rộng border là 7 ( `stroke-width = 7`) và `bubbles-small` chứa các bong bóng nhỏ với độ rộng border là 4.

Để apply  2 animation riêng biệt cho 2 loại bong bóng, chúng ta cần thêm thuộc tính transform vào từng block bong bóng mà chúng ta sử dụng.
Thẻ  `<g>` trong SVG được sử dụng tương tự như thẻ `<div>` trong HTML, chúng ta cần gói những block bong bóng vào một block lớn hơn ( ở đây là 2 thẻ `<g>` có class `bubbles-large` và `bubbles-small`)
Tiếp theo là phần CSS
Ở đây chúng ta sẽ sử dụng `@keyframes` để định nghĩa lên những chuyển động phức tạp, sau đó sử dụng chúng thông qua thuộc tính `animation` trong CSS
```
@keyframes up {
  0% {
  opacity: 0;
  }
  10%, 90% {
  opacity: 1;
  }
  100% {
  opacity: 0;
  transform: translateY(-1024px);
  }
}

@keyframes wobble {
  33% {
  transform: translateX(-50px);
   }
  66% {
  transform: translateX(50px);
   }
  }
```
Trong đó `@keyframes up` chịu trách nhiệm tạo hiệu ứng chuyển động theo chiều dọc cho bong bóng, giúp bong bóng đi lên.
Khi bong bóng ở `0%` ( dưới đáy), opacity sẽ là 0 ( không hiển thị) , từ `10%` tới` 90%` sẽ hiện bong bóng và ở `100%`  bong bóng sẽ biến mất
`@keyframes wobble` chịu trách nhiệm tạo hiệu ứng di chuyển ngang giúp bong bóng lắc lư nhìn cho giống thật :sweat_smile:

Done, xong phần định nghĩa, tiếp theo tới phần sử dụng. Để áp dụng   những hiệu ứng trên cho bong bóng, chúng ta cần css cho thẻ groupvà các thẻ con của nó thông qua `nth-of-type` :
```
.bubbles-large > g {
  opacity: 0;
will-change: transform, opacity;}
.bubbles-large g:nth-of-type(1) {...}
...
.bubbles-small g:nth-of-type(10) {...}
```

Tiếp theo chúng ta sẽ set thời gian cho hiệu ứng, set `repeat` thành `infinite` để hiệu ứng lặp lại mãi mãi từng bong bóng, cũng như thêm một khoảng thời gian ngắn để delay giữa các đợt nổi của bong bóng
```
.bubbles-large g:nth-of-type(1) {
      animation: up 6.5s infinite;
  }
.bubbles-large g:nth-of-type(1) circle {
     animation: wobble 3s infinite; 
  }
...
bubbles-small g:nth-of-type(9) circle {
     animation: wobble 3s 275ms infinite; 
  }
.bubbles-small g:nth-of-type(10) {
   animation: up 6s 900ms infinite;
}
```
Tiếp theo chúng ta sẽ thêm `timing function` ` ease-in-out` để cho  hiệu ứng `wobble` nhìn trông tự nhiên hơn.

Cuối cùng chỉ việc thêm màu mè họa tiết và sao chép các block bong bóng và các style tương ứng với số bong bóng mình muốn là xong. :sweat_smile:

{@codepen: https://codepen.io/tuanphamle/pen/ZEzomdo}


# Tổng kết
Mình xin phép tạm dừng bài viết ở đây, bài viết trên được viết dựa trên ý hiểu cũng như tham khảo một số nguồn, nếu bài viết có sai xót mong mọi người góp ý. Cảm ơn vì đã đọc.:smile::smile::smile: