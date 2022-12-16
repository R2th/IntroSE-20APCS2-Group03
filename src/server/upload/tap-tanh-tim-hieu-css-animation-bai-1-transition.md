Dạo gần đây mình đang học về Css animation, chắc nhiều bạn cũng biết, với sự phát triển của html hiện tại, chúng ta có thể tạo ra rất nhiều hiệu ứng đẹp, mà không cần can thiệp JS, khác hẳn với những bài học css tĩnh và im lìm như hồi đầu mới làm quen với CSS. Tuy nhiên để tạo được hiệu ứng như vậy không hề đơn giản, cần nhiều sự kết hợp của các thuộc tính CSS khác nhau. Vì vậy, mình sẽ viết vài bài giới thiệu và giải thích về 1 số thuộc tính cơ bản để tạo nên hiệu ứng. Bài đầu tiên sẽ là về: Transition 
## Tìm hiểu transition
### CSS Transition là gì?

CSS transition là việc xác định 1 quá trình chuyển đổi khi có 1 hành động. Nói dễ hiểu bằng ví dụ:
bạn có 1 khối `<div>` nền trắng, khi hover vào thì nền của khối `<div>` đó sẽ chuyển sang đỏ. Vậy quá trình chuyển đổi màu nền từ trắng sang đỏ theo hành động hover chính là quá trình transition. Khi bạn bỏ chuột hover khỏi khối đó, bạn sẽ thấy nó chuyển lại về như cũ
```html
<button>Button 1</button>
```
```css
button {
  height: 100px;
  width: 300px;
  font-size: 28px;
  color: white;
  background-color: tomato;
  border: none;
}
button:hover {
  background-color: wheat;
}
```

Thử VD này bạn sẽ thấy quá trình chuyển đổi màu quá nhanh, tạo cảm giác giống button tắt/bật (on/off) ấy. Vậy thì để có thể điều khiển được mọi thứ bên trong quá trình chuyển đổi, chúng ta sẽ cần thêm vài thuộc tính điều khiển quá trình (transition) này. 2 thuộc tính cơ bản nhất để visualize quá trình chuyển đổi cho bạn có thể nhìn thấy đó là `transition-duration` và `transition-property`
* Thời gian diễn ra chuyển đổi: `transition-duration`: Đây là thuộc tính giúp bạn quyết định độ dài của quá trình chuyển đổi - chính là thời gian để thuộc tính đi từ trạng thái ban đầu tới trạng thái cuối cùng mong muốn. Bạn có thể chọn đơn vị seconds `s` hoặc milliseconds `ms` cho thuộc tính `transition-duration` 
* Lựa chọn thuộc tính sẽ thực hiện chuyển đổi: `transition-property`. Giả sử trong quá trình hover trên kia, bạn muốn `background-color` không bị can thiệp quá trình chuyển đổi, và chỉ can thiệp kéo dài 2s cho việc chuyển màu chữ chẳng hạn. Khi đó hãy chọn trực tiếp thuộc tính chuyển đổi và thời gian chuyển đổi: (xem code pen tại [đây](https://codepen.io/bunnypi04/pen/JjjXdYK))
{@embed: https://codepen.io/bunnypi04/pen/JjjXdYK}

Giờ nhờ có việc lựa chọn thuộc tính `transition-property` và thời gian chuyển trạng thái `transition-duration` mà trông `button` của chúng ta đã chuyển trạng thái mượt mà và ưa nhìn hơn lúc đầu rồi :)
### Transition options
* `transition-timing-function`
Nghe qua nhiều người sẽ liên tưởng đến transition-duration ở trên phải không?  Để dễ hình dung, thì Ví dụ bạn có 1 button chuyển màu như button 2 phía trên, nhưng bạn muốn nó không chỉ đơn giản đổi màu từ từ trong 2s như vậy, mà muốn nó ban đầu chuyển màu chậm chậm, sau đó chuyển màu trở nên nhanh hơn chẳng hạn?. `transition-timing-function` giúp cho bạn điều khiển được các giai đoạn chuyển đổi trạng thái cho Element của bạn nhé, còn `transition-duration` chỉ quyết định tổng thời gian diễn ra hết chuyển đổi mà thôi. Có 5 giá trị cho `transition-timing-function`:
    * `ease`:  thay đổi bắt đầu chậm, sau đó tăng dần vận tốc, rồi chậm lại và dừng
    * `linear`: vận tốc không thay đổi trong cả quá trình đổi trạng thái
    * `ease-in`: Vận tốc tăng chậm từ 0, tăng dần đến khi cán đích (tất nhiên hết giờ là đột ngột dừng luôn :v)
    * `ease-out`: Vận tốc lúc đầu lớn, sau đó chậm lại trước khi cán đích (ngược lại với `ease-in`)
    * `ease-in-out`: Bắt đầu chuyển động chậm rãi, rồi tăng tốc ở giai đoạn giữa, sau đó lại chậm lại (không khác `ease` là mấy nhỉ :D)
    
   Dưới đây có 1 [ví dụ](https://codepen.io/bunnypi04/pen/xxxVGML) để mọi người thấy dễ hơn (đừng quá chú ý code đoạn transform, bài sau mình sẽ giải thích)
   {@embed: https://codepen.io/bunnypi04/pen/xxxVGML}
 
*  `transition-delay`: Đây là thuộc tính quyết định độ trễ của hành động - tức là khi bạn chọn: bắt đầu, nó sẽ dừng vài giây, rồi mới bắt đầu chuyển động. Có 2 loại giá trị như `transition-duration`: seconds `s` và milliseconds `ms`

Giờ bạn thử thêm `transition-delay` vào ví dụ đầu tiên xem nhé :)
### Những cách khác nhau để viết thuộc tính transition
Ở ví dụ đầu tiên với Button 2, chúng ta đã áp dụng transition-property lên thuộc tính `color` của button 2 này: 
```css
#button-2 {
  transition-property: color;
  transition-duration: 2s;
}
```
Kết quả là màu chữ được thay đổi 'smoothly' trong 2s khi hover, còn background-color thì thoắt chuyển màu, ko được 'smooth' cho lắm. Tuy nhiên nhỡ chúng ta muốn transition với nhiều thuộc tính, ví dụ như muốn cả màu chữ và màu nên cùng chuyển đổi 'smoothly' thì sao? Câu trả lời là sẽ liệt kế các thuộc tính thôi :):
```css
#button-2 {
  transition-property: color background-color;
  transition-duration: 2s;
}
```
Thử tự thực hành nhé :)
Với các thuộc tính đã được liệt kê trong `transition-propery`, đừng quên xác định trạng thái sau khi thay đổi nhé (ví dụ đổi màu khi hover chẳng hạn). Nếu bạn có rất nhiều thuộc tính cần thay đổi, mà liệt kê hết vào transition thì lâu, khi đó có thể sử dụng:
```css
transition-property: all;
transition-duration: 2s;
```
Ngoài ra bạn có thể rút gọn còn 1 dòng như sau:
```css
//transition: [transition-property] [transition-duration] [transition-option] [transition-delay]
transition: background-color 3s ease-in-out 1s, color 2s ease 4s;
```
Như trên thì danh sách các transition-property với các duration, option, delay riêng đều được viết trên 1 dòng, và các propery này cách nhau bởi dấu `,`
### Những thuộc tính nào có thể được `transition`?
Không phải tất cả các thuộc tính CSS đều có thể `transition` được, bởi sự thay đổi trạng thái của 1 số thuộc tính không thể thay đổi "dần dần" được, mà chỉ thay đổi trạng thái từ 1 tới 2 theo cách 'ngay lập tức'. 'Transition' như đã nói từ đầu, là để can thiệp vào quá trình thay đổi trạng thái, vì vậy, cần phải nhìn thấy quá trình đó (tăng thời gian nhìn thấy được bằng duration) thì mới có thể can thiệp vào quá trình này. Ví dụ như `background-image` không thể sử dụng transition được, bới vì 2 hình ảnh không thể chuyển dần qua nhau (trừ khi bạn can thiệp xử lý hình ảnh video, nhưng cái đấy lại cao siêu không thuộc về css nữa rồi :D) Ngoài ra thì có 1 số thuộc tính khác không sử dụng được transition như: border style, position, float, background-repeat, font family,... Ngược lại, để biết những thuộc tính có thể sử dụng transition để animate, thì ví dụ như là những thuộc tính có thể hiển bằng các con số, bởi vì khi đó trình duyệt có thể tính toán các giá trị cho các thời điểm trong quá trình chuyển đổi: height, border width, padding, margin, line-height, opacity,... Ngoài ra thì cũng có thể animate được những thuộc tính thể hiện bằng màu sắc: như là color, background-color.

Nếu lười suy luận, bạn có thể xem danh sách các thuộc tính có thể `transition` tại [đây](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) nhé
## Kết
Qua bài đầu tiên mình đã giới thiệu về thuộc tính phục vụ animate đầu tiên là position rồi, bài tiếp theo sẽ là về Transform 2D và 3D nhé. Hãy chờ mình tháng sau :D