CSS - một thứ thú vị! Chúng ta đều thích CSS phải không? 

Nếu không có CSS thì một trang web chỉ giống như một tài liệu word nhàm chán. Tuy nhiên CSS lại không đơn giản như chúng ta mong đợi, vì những điều cơ bản của CSS thì rất đơn giản để học, tuy nhiên có những thứ lại không hoạt động như bạn mong đợi, đơn giản nó không tuân theo một mô hình nhất định. Thật không may chúng lại thường xuyên xảy ra với bạn, ngay cả khi bạn tìm thấy giải pháp trên Stack Overflow thì bạn cũng chưa chắc biết được nó hoạt động chính xác ra sao, trừ khi bạn thực sự nghiên cứu thêm. Mọi thứ không thể dự đoán được với CSS. bài viết này mình sẽ giới thiệu một số vấn đề mà bạn cần lưu ý để thành thạo CSS hơn.

## Margin-collapsing

Nếu bạn đã làm việc với CSS dù ít hay nhiều thì chắc chắn bạn đã gặp phải khái niệm này.

`Margin-collapsing` để nói về phần margin của các khối nằm kề nhau/sát nhau nhưng chỉ theo chiều dọc. Quá trình xảy ra là: thay vì 2 margin được cộng vào với nahu thì chúng lại gộp thành một, tức là margin giữ 2 khối sẽ là margin lớn nhất thay vì là tổng margin của 2 khối.

Ví dụ dưới đây sẽ giúp bạn dễ hình dung hơn:

Div 1 có `margin-bottom: 50px`

Div 2 có `margin-top: 30px`

Bạn nghĩ khoảng cách giữa hai khối là 80px? Nhưng thực tế kết quả chúng ta nhận được lại là 50px mà thôi.

>  margin-collapsing không xảy ra với margin-left và margin-right. Nó cũng chỉ xảy ra khi cả 2 margin là âm (theo chiều dọc), nhưng không xảy ra khi một margin với giá trị âm, margin còn lại là dương.

Dưới đây là một số tài liệu bạn có thể tìm hiểu thêm:

* [ Mastering margin collapsing (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing?source=post_page---------------------------)
* [ What you should know about collapsing margins (CSS-Tricks)](https://css-tricks.com/what-you-should-know-about-collapsing-margins/?source=post_page---------------------------)

## Block formatting contexts

Cũng như `margin-collapsing` chỉ ảnh hưởng với những khối tương đồng. Trong một trường hợp, `block formatting contexts` về cơ bản là một khối chứa đầy đủ các thành phần, và những thành phần trong đó không thể tương tác với những thứ bên ngoài khối chứa nó.

Để tìm hiểu thêm về điều này các bạn hãy tham khảo thêm ở bài viết này  [Block formatting context (MDN).](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context?source=post_page---------------------------)

## Containing block, absolute posotioning

Hầu hết mọi thứ trong CSS được chứa bởi `content box`, ngoại trừ absolute positioning.

Ví dụ
{@embed: https://codepen.io/BinhLT-S2/pen/KOpboz}

Vị trí của khối `static` là nằm trong `content-box`  của khối cha.
Còn `absolutely positioned` thì nằm trong `paddong-box` của khối cha.
Vì vậy chỉ cần nhớ `absolutely positioned blocks` được nằm trong `padding-box`, các khối khác được bao bọc bởi `content-box.`

`Containing block` là gì? Thông thường, nó là tổ tiên gần nhất có thuộc tính `position` có giá trị khác với `status`. Nhưng điều đó không phải là điều kiện duy nhất.

Hiệu quả mang lại tương tự nếu tổ tiên có:

* Thuộc tính transform với giá trị khác không.
* Thuộc tính filter với giá trị khác không.
* Giá trị thuộc tính sẽ thay đổi với giá trị khác không.

Lưu ý rằng `containing block` không có thuộc tính `position`, thay vào đó nó có thuộc tính `transform`.

Để biết thêm chi tiết về cách thức hoạt động của nó, hãy xem bài viết về Containing block ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block?source=post_page---------------------------)).

## Vertical-align: middle; and centering in CSS
Bạn biết cách làm thế nào để xét vị trí `center` cho một phần tử tốt nhất?

Rất may mắn, điều này ngày nay dễ dàng hơn nhiều khi chúng ta có `flexbox`.

Lưu ý rằng trong tất cả các khả năng, `vertical-align: middle`; không làm được những gì mà bạn nghĩ nó sẽ làm được. Nó chỉ hoạt động cho `tables` hoặc `inline/inline-block`. Bạn không thể sử dụng nó để sắp xếp các khối theo chiều dọc.

Để giúp bạn tránh được rất nhiều rắc rooixsm hãy xem bài viết [Centering in CSS: A Complete Guide (CSS-Tricks)](https://css-tricks.com/centering-css-complete-guide/?source=post_page---------------------------).

## Tổng kết

Trên đây là những lợi ích dễ nhìn thấy mà CSS mang lại cho ứng dụng của mọi người. Phần tiếp theo của series, mình sẽ giới thiệu với các bạn các lợi ích hay hơn nữa mà CSS mang lại cho chúng ta như `flexbow` và `z-index`. Chắc chắn sẽ không để các bạn phải hối hận khi bỏ ra thời gian của bản thân để hiểu thêm về chúng đâu.

Cảm ơn các bạn đã theo dõi !!!!.