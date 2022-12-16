### TRANSITION
Một sự cải tiến mới trong `css3` là khả năng viết các hiệu ứng (transition). Các nhà phát triển giao diện người dùng đã tìm ra khả năng thiết kế các tương tác này trong htmk và css mà không cần `Javasscript. `

Với các CSS3 transitions bạn có thể thay đổi diện mạo hành vi của một phần tử bất cứ khi nào có sự tác động vào nó. Ví dụ như hover, click, ...

Như đã đề cập ở trên, để transition được diễn ra , một yếu tố để thây đổi được trạng thái, cần có những sự tác động vào nó. VD: hover, focus, active and target
Transition có 4 thuộc tính liên quan đến quá trình chuyển đổi: transition-property, transition-duration, transition-timing-function, và transition-delay. Nhưng không phải tất cả các thuộc tính này là bắt buộc, nhưng 3 thuộc tính đầu tiên là được sử dụng phổ biến nhất.

Dưới đây là một ví dụ thay đổi background của một khổi khi ta :hover vào nó
![](https://images.viblo.asia/e8e9803a-87fc-4557-97d4-52216e3b194c.PNG)

Để được hỗ trợ tốt nhất trên các trình duyệt, ta thêm các tiền tố sau:

![](https://images.viblo.asia/5f2f156d-2d77-43c1-8d08-66aa845de822.PNG)

### Transitional Properties
Điều quan trọng cần lưu ý là không phải tất cả các thuộc tính đều có thể chuyển đổi được. chỉ các thuộc tính có điểm giữa chừng có thể xác định được. Màu sắc, kích thước, phông chữ có thể chuyển đổi từ giá trị này sang giá trị khác. dưới đây là một số transitions phổ biến:

![](https://images.viblo.asia/3411a849-fdb0-47d1-aeee-e4ab4b748534.PNG)

### Transition timing

Trong quá trình chuyển đổi transition có thời gian  diễn ra bằng cách sử dụng transition-duration được xác định bằng các giá trị thời gian giây(s), mili giây (ms). Khi transition nhiều thuộc tính, bạn có thể đặt nhiều thời lượng  cho mỗi thuộc tính và được cách nhau bằng dấu  phẩy, VD: 
    
![](https://images.viblo.asia/d9d2c854-b288-440f-b6d0-f3ab02ee85d7.PNG)

### Transition delay
Ngoài việc khai báo thuộc tính transition, timing, duration, bạn cũng có thể đặt delay với thuộc tính transition-delay với giá trị thời gian, giây hoặc mili giây. Như với tất cả các thuộc tính transition khác, delay nhiều lần, các giá trị cũng được cách nhau bằng dấu phẩy.

![](https://images.viblo.asia/0427a025-429a-4e46-a2a9-5659e7c5a1f4.PNG)