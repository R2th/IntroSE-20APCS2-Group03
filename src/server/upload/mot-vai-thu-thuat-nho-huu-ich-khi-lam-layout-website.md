![](https://images.viblo.asia/dec5a376-447b-4f5b-b8fc-221346305cd9.jpg)

Xin chào các bạn, hôm nay mình xin chia sẻ đến các bạn một vài thủ thuật nhỏ với HTML/CSS mà trong khi làm việc mình thấy khá cần thiết và hữu ích dành cho các bạn không chuyên Frontend khi làm layout website. Những thủ thuật này hy vọng có thể sẽ giúp bạn tiết kiệm thời gian và tối ưu layout trang web của mình hơn thay vì phải loay hoay với những dòng code CSS nhàm chán :D

## 1. Sticky footer
Một trang web thông thường sẽ trông đẹp và hài hòa khí có đủ cả 3 phần header, content và footer. Tuy nhiên, nếu ở 1 page nào đó của trang web mà nội dung rất ít hoặc không có nội dung thì phần footer sẽ tự động nhảy lên nằm sát với header, điều này sẽ làm người dùng nhìn rất khó chịu. Vì vậy, khái niệm **sticky footer**  có nghĩa là làm cho phần footer của trang web luôn luôn nằm dưới cùng của màn hình hoặc dưới cùng của trang web dù cho phần thân có nội dung hay không. 
> Ví dụ:

{@codepen: https://codepen.io/chriscoyier/pen/YWKNrE}

## 2. Truncate text
Có những đoạn văn bản trong trang web do số lượng ký tự quá nhiều và viết liền nhau nên không thể tự động xuống dòng được mà bị tràn sang hai bên, dẫn đến vỡ layout trang web. Vì vậy, cần phải ngắt đoạn văn bản đó ở một độ dài cần thiết để ngăn chặn lỗi trên, đó gọi là **truncate text** HTML. **Truncate text** có thể có nhiều cách, dùng javascript hoặc dùng bất kỳ ngôn ngữ lập trình nào để tính toán số ký tự, nhưng đơn giản nhất vẫn là dùng CSS. Có 2 dạng truncate **truncate multi line** và **truncate one line**
> Ví dụ

{@codepen: https://codepen.io/jessyhoule/pen/Jvjwzy?page=1&}

## 3. Căn giữa theo chiều dọc cho phần tử
Mình đã gặp trường hợp nhiều bạn không chuyên Frontend gặp khá nhiều khó khăn trong việc căn giữa theo chiều dọc cho 1 phần tử bất kỳ trong trang web. Trước đây, khi flexbox chưa phổ biến trên hầu hết các trình duyệt, thì việc căn giữa một phần tử bất kỳ nào đó cũng khá vất vả, nhưng từ khi flexbox hoạt động tốt trên hầu hết các trình duyệt, công việc này lại trở nên vô cùng đơn giản và nhanh chóng.
> Ví dụ

{@codepen: https://codepen.io/tranquocy/pen/jxPLeX}

## 4. Chia nhiều cột có chiều rộng luôn bằng nhau
Giả sử ta có 20 item bên trong 1 list item lớn, yêu cầu là sẽ chia 20 item thành 5 hàng, mỗi hàng 4 item có width bằng nhau. Yêu cầu khá đơn giản phải không nào? Tuy nhiên, nếu không áp dụng 1 vài thủ thuật nhỏ với CSS ở đây thì sẽ mất khá nhiều thời gian như canh width bao nhiêu % hay px cho mỗi phần tử, rồi khoảng cách bên trái, bên phải giữa các phần tử là bao nhiêu cho hợp lý để các phần tử không bị rớt xuống dưới mà luôn nằm cùng 1 hàng. 
Bí quyết để giải quyết các vấn đề trên là dùng thuộc tính `display: flex` cho phần tử bao ngoài và dùng `width: calc()` cho các item bên trong.
 > Ví dụ
 > 
{@codepen:  https://codepen.io/tranquocy/pen/jxPavG}


***Trên đây là một viết ngắn chia sẻ những thủ thuật làm layout website trong quá trình làm việc của mình, hy vọng sẽ giúp ích được các bạn trong công việc. Xin cảm ơn và hẹn gặp lại!***