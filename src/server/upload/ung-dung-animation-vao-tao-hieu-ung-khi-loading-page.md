Xin chào mọi người, hôm nay mình sẽ giới thiệu tới các bạn một property của CSS đó chính là `animation`.  Animation cho phép chúng ta tạo chuyển động của các object. Vậy thì nó hoạt động như thế nào?
# Introduce
Có lẽ là các bạn đã nghe đến 24 khung hình trên giây trong những thời kỳ đầu của làm phim, và đây là số lượng khung hình tối thiểu để tạo nên sự chuyển động. Và animation cũng không phải là ngoại lệ, nó cũng hoạt động dựa trên khung hình này mà trong css gọi là `@keyframes`. Keyframes thì hoạt động dựa vào phần trăm trên tổng số giây mà nó thực hiện chuyển động, vì vậy mà cú pháp của keyframe sẽ theo dạng %, nếu chúng ta muốn smooth thì chúng ta chia nhỏ % ra
# Practice
{@embed: https://codepen.io/tranhaiquan/pen/NZpeXe}
Trái: chia đều 0:50:100, còn giữa chia không đều 0:50:70:100, và trái thì scale ở 0% và 100% khác nhau

Một nguyên tắc smooth mà tôi đã từng dùng trong game mình đã từng làm đó chính là điểm đầu và điểm cuối phải trùng nhau để tạo hiệu ứng liên tục, không bị giật khi quay từ 100% -> 0%, *bời vì duration từ 100% -> 0% là 0 giây*. Và trong css cũng tương tự như thế.

Thì chúng ta có thể thấy được việc smooth hay không thì chúng ta có thể dựa vào chia % của `keyframe` và ngoài ra thì chúng ta còn phải chỉnh cho thời gian hoạt động của animation và kể cả quỹ đạo chuyển động nữa.

Ở trong animation này thì chúng ta sẽ có một bộ property đi kèm như sau:
```css
/* Thêm code cho dễ nhìn */
.heart1 {
  position: absolute;
  top: 50%;
  left: 20%;
  color: red;
  animation-name: heart1;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  transition-timing-function: linear;
}
```

* **@keyframes**: Thì mình cũng nói ở trên rồi nên phần này mình k nhắc lại nữa
* **animation-name**: Bạn mở codepen của mình lên thì bạn sẽ thấy sau @keyframes thì có tên như là heart1 or heart2 thì đó chính là tên của keyframe mà mình sẽ refer để khai báo ở đây.
* a**nimation-duratio**n: đây là tổng thời gian hoạt động từ khi bắt đầu đến khi kết thúc của animation
* **animation-delay**: Đây là thời gian delay khi lần đầu chạy animation, cái này cũng rất hay trong ứng dụng một chuỗi chấm tròn scale từ 0 - 1 thì thay vì mình sẽ viết cho từng chấm tròn đó một keyframe khác thì mình sẽ thêm thuộc tính delay này vào thì chúng ta sẽ có hiệu ứng chạy lần lượt
* **animation-iteration-count**: Đây là số lần chạy animation, chúng ta có thể điền số lần chạy là 1, 2, 3, 5 gì đó, hoặc muốn lặp thì dùng `infinite`
* **animation-direction**: Thuộc tình này được dùng để đổi kiểu chuyển động của object, nó sẽ bao gồm các giá trị như `normal`, `reverse`, `alternate`, `alternate-reverse`. Giá trị normal thì là mặc định mình khai bao thế nào thì nó sẽ hoạt động như thế, còn `reverse` thì nó sẽ hoạt động ngược lại những gì chúng ta khai báo, ví dụ như chúng ta có 2 object muốn chúng thực hiện đảo nhau thì một object là normal còn object còn lại là `reverse` . `Alternate` là giá trị mà nó sẽ chạy theo tuần tự khai báo lần đầu(lẻ), và sau đó nó  sẽ chạy ngược lại lần trước đó, tuy nhiên để thử thì bạn phải loop animation thì mới trải nghiệm rõ nha. `Alternate-reverse` thì ngược lại với alternate nên mình k nói lại nữa. Ví dụ cụ thể cho dễ hiểu nhé.

{@embed: https://codepen.io/tranhaiquan/pen/EBWrNv}

* **animation-timing-function**: Thuộc tính này nó cũng quyết định đến việc có smooth hay không nhưng, nó lại dùng để custom quỹ đạo chuyển động nhiều hơn, nó là dạng đường thẳng or đường cong, bao gồm: `linear`, `cubic-bezier`, `ease`, `ease-in`, `ease-out`.
Linear là dạng đường thẳng thì ai cũng biết rồi, còn cubic benzier thì trong toán học chúng ta cũng đã được học đường cong benzier. Tuy nhiên trong đây thì tất cả đều là benzier cả, bởi vì linear ở đây cũng là đường benzier với `cubic-benzier(0, 0, 1, 1)`. Nếu các bạn muốn tìm hiểu kỹ hơn thì hãy tìm hiểu tại https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function.
Và dĩ nhiên các đường cong khác cũng thế, nhưng do tính chất similar nên là người ta đã config luôn các thông số trong giá trị của thuộc tính này, vậy nên chúng ta cứ thế mà dùng. Cái mà các bạn cần biết là `ease` thì sẽ có tốc độ chậm ở khúc đầu, tăng tốc ở khúc giữa và chậm dần về cuối. `Ease-in` là chậm trong khúc đầu và sau đó tăng dần đến cuối.`Ease-out` thì ngược lại bắt đầu nhanh và châm dần về khúc cuối.

* **animation-fill-mode**: Thuộc tính này để apply các thuộc tính của đối tượng sau hay trước khi thực hiện animation. Nó bao gồm các giá trị sau: `none`,`forwards`, `backwards`, `both`. None là giá trị sau khi kết thúc animation thì nó sẽ không apply thêm bất cứ thuộc tính nào vào nữa hết. `Forward` là giá trị mà khi kết thúc animation thì sẽ apply các thuộc tính của animation khi kết thúc vào object đó. `Backwards` thì ngược lại với forward là apply trạng thái bắt đầu. `Both` là apply cả 2 các thuộc tính trước và sau khi kết thúc animation. 

* **animation**: Ngoài cách khai báo theo các thuộc tính nhưu trên thì có cách nhanh gọn hơn đó chính là khai báo vào thẳng animation này luôn. :D. Và đưiọc define theo thứ tự sau:
    * animation-name
    * animation-duration
    * animation-timing-function
    * animation-delay
    * animation-iteration-count
    * animation-direction
    * animation-fill-mode
    * animation-play-state
     
Trong bài viết này mình thì mình có sử dụng `transform` để tạo chuyển động cho object thì qua đây mình cũng giới thiệu qua về nó luôn. Nghe cái tên thôi các bạn cũng mường tượng được nó có ý nghĩa gì rồi đúng k ạ, và ai đã từng biết đến bộ phim Transformer thì biết ngay. Thì `transform` là 1 property giúp cho object có thể move, rotate, scale, skew và các bạn nên nhớ là nó không đơn thuần 1 object chỉ có một trạng thái di chuyển đâu nha, vì một object thì dĩ nhiên có nhiều trạng thái di chuyển cùng lúc đúng k ạ. :). Nó có thể vừa di chuyển vừa xoay, hoặc vừa di chuyển vừa scale, hoặc kết hợp cả 4 chúng lại cũng được :D.

Trong quá trình tìm hiểu thì mình cũng đã tự build được một vài effect loading tại: 

http://loading-effect.surge.sh/

 Tài liệu tham khảo: 
 
https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function