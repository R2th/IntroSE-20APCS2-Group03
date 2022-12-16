# Animation là gì?
Animation giúp chuyển động từ kiểu css ban đầu sang kiểu css khác, gồm hai thành phần: kiểu mô tả animation và bộ khung hình chính biểu thị trạng thái ban đầu và kết thúc của animation
Để tạo một chuỗi animation, bạn định kiểu phần tử bạn muốn tạo hiểu ứng với thuộc tính animation hoặc thuộc tính phụ của nó và được thực hiện bằng quy tắc @keyframes như được xác định chuỗi animation bằng cách sử dụng khung hình bên dưới.
# Cấu hình animation
Như ở trên ta có nhắc tới quy tắc @keyframes để set cáu hình animation, ngoài ra nó còn có các thuộc tính đi kèm sau:
### animation-name:
Xác định tên mà @keyframes trỏ tới
### animation-duration:
Xác định thời gian chuyển tiếp một chu kì của animatio
### animation-timing-function:
Được hiểu để thiết lập tốc độ cho animation, gồm các giá trị sau:
* ease : chậm khi bắt đầu, nhanh dần và chậm lại khi kết thúc;
* linear : bắt đầu và kết thúc cùng tốc độ
* ease-in: khởi đầu chậm và nhanh dần
* ease-out: ngược lại với ease-in thì có kết thúc chậm
* ease-in-out: chậm khi bắt đầu, nhanh dần giữa và chậm lại khi kết thúc
* cubic-bezier(n,n,n,n): tự set giá trị cho animation
### animation-delay:
Độ trễ của chuyển động, nhận giá trị thời gian (s) tức là sau bao nhiêu giây thì animation bắt đầu hoạt động
### animation-iteration-count:
Số lần lặp lại của chuyển động, đặc biệt có giá trị 'infinite ' là lặp vô hạn
### animation-direction:
Chuyển đổi hướng trên mỗi lần chạy qua chuỗi hoặc đặt lại về điểm ban đầu và lặp lại chính nó, nó gồm các giá trị sau:
* normal: kiểu mặc định chuyển động theo keyframes
* reverse: được chuyển động theo hướng ngược lại
* alternate : Chuyển động theo keyframes trước rồi mới ngược lại
* alternate-reverse: Chuyển động ngược lại trước sau đó mới theo keyframes (ngược với alternate)

![](https://images.viblo.asia/06a79fd6-4cec-4190-9c73-2bfe75988884.PNG)

{@embed: https://codepen.io/hoasadoa009/pen/exrbGM}

References:   [w3school.com](https://www.w3schools.com/css/css3_animations.asp)