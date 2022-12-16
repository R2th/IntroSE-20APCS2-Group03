## Giới thiệu
Chắc nhiều bạn học frontend cũng không xa lạ gì với việc show popup ảnh để hiển thị ảnh full tỉ lệ, to hơn, dễ nhìn hơn. Hồi mới học code mình hay đi tìm plugin, tuy là chúng rất đẹp, mượt và nhanh nhưng việc lạm dụng cũng không tốt khi phải thêm code, thêm dung lượng trang, mà hạn chế đi khả năng sáng tạo của bản thân. Mình viết bài này để giới thiệu qua với các bạn mới cách làm 1 popup image *đơn giản*, mượt mà để dùng :satisfied:

## Lý thuyết
Mình sẽ làm 2 ví dụ đơn giản nhất, 1 cái là ấn thì hiện modal với hiệu ứng dạng fade, 1 cái thì xoay xoay cho chóng mặt :rofl:
Modal thì có thể dùng modal của bootstrap nhưng mục đích là làm 1 cái popup mini nhỏ gọn nên tự viết xem sao, lý thuyết là ban đầu cho cái modal ẩn đi, khi ấn vào ảnh thì cho hiện lên, full màn hình và nền đen để content là cái ảnh dễ nhìn.
Nội dung modal là cái ảnh đúng tỉ lệ ảnh gốc, do khi hiển thị nhiều khi chỉ để background-image thu gọn, popup mới show đúng kích thước, css thì căn giữa và không cho ảnh vượt quá màn hình, css này khá đơn giản, còn việc lấy src của ảnh thì ta dùng js.
Có lẽ vấn đề khó nhất ở ví dụ này là làm sao để có hiệu ứng fade hay rotate hay gì gì đó? Câu trả lời là css animation.
Các bạn có thể search với từ khóa keyframe animation, rất nhiều ví dụ thú vị để xem, mình sẽ trích nguyên lời của w3schools:

*The @keyframes rule specifies the animation code.

The animation is created by gradually changing from one set of CSS styles to another.

During the animation, you can change the set of CSS styles many times.

Specify when the style change will happen in percent, or with the keywords "from" and "to", which is the same as 0% and 100%. 0% is the beginning of the animation, 100% is when the animation is complete.

Tip: For best browser support, you should always define both the 0% and the 100% selectors.

Note: Use the animation properties to control the appearance of the animation, and also to bind the animation to selectors.

Note: The !important rule is ignored in a keyframe (See last example on this page).*

*[https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp](https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp)*

Nguyên tắc của nó là bạn set cho hiệu ứng của mình 1 khoảng thời gian thực hiện, có lặp lại hay không, bắt đầu thì như nào và kết thúc thì ra sao, khá đơn giản nhưng để sáng tạo thì ra vô vàn thứ hay ho. 
Áp dụng với bài toán của mình, để làm hiệu ứng fade tương tự JQuery, ta có thể hình dung dùng animation css, ban đầu thì modal opacity 0, kết thúc animation thì opacity 1, còn rotate thì thay vì opacity có thêm transform: rotate thôi.

Các bạn hãy ấn vào Default và Rotate xem thử nhé:
{@embed: https://codepen.io/dfly25e/pen/ZEELEpN}

## Kết luận
Lý thuyết thì ngắn và dễ hiểu nhưng để phát triển sáng tạo thêm thì cần nhiều thời gian, mình chỉ làm thử 2 ví dụ đơn giản nhất thôi, các bạn hãy tự làm cho mình 1 cái thật hoành tráng nhé :triumph: