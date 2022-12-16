Hôm nay, để tiếp tục cho series so sánh, hãy cùng mình khám phá thêm 2 địa danh mới khá nổi tiếng của Việt Nam mình đó là Cù Lao Chàm và đảo Lý Sơn.

Nếu là người yêu cảnh sắc thiên nhiên thơ mộng, muốn tìm về với vách đá núi lửa kỳ thú, những đôi chim hải âu bay về tổ ấm hay hoàng hôn dát vàng sóng nước thì đảo Lý Sơn sẽ cho bạn những bức tranh khiến du khách bị mê hoặc. Còn nếu muốn tìm đến sự bình dị, hoang sơ, mộc mạc của 8 hòn đảo lớn nhỏ thì Cù Lao Chàm sẽ là điểm đến phù hợp với bạn qua những rạn san hô phong phú sắc màu, mang đến cho bạn sự khám phá thú vị và sự đa dạng sinh học nơi đây.

![](https://images.viblo.asia/2636382e-642d-4ec4-a367-4bf76db1f073.jpg)

Hãy cùng lên kế hoạch để khám phá 2 địa danh này nhé, trong lúc chờ tàu đưa mình từ đất liền ra đảo Lý Sơn hãy tranh thủ cập nhật kiến thức thú vị nào :D

### 1. `pageX`, `pageY`, `screenX`, `screenY`, `clientX` và `clientY`
Để dễ hình dung, bạn có thể xem hình minh hoạ sau.

![](https://images.viblo.asia/2fa52488-fd6c-4bf0-aa04-784ee57624b4.png)
#### - pageX / pageY
Dựa vào cái tên, chúng ta cũng đã thấy phản ánh lên được mục đích của nó.

Toạ độ `page` bắt đầu từ vị trí trên cùng bên trái, toạ độ tính từ gốc `<html>`, hiểu nôm na là bắt đầu từ phần `top: 0 / left: 0` của trang web, **nó sẽ bao gồm các phần bị ẩn khi scroll**. Toạ độ này cũng có thể ở bất kỳ đâu trong cửa sổ trình duyệt và có thể thay đổi vị trí nếu nó được embed vào trang khác khi người dùng scroll.

#### - clientX / clientY
`clientX / Y` cung cấp tọa độ tương ứng với các `viewport` CSS.

Tương đối với mép (góc) trên bên trái của cửa sổ trình duyệt. Điểm này có thể di chuyển khi người dùng di chuyển / resize trình duyệt xung quanh màn hình. Điểm này không di chuyển kể cả khi được scroll từ bên trong trình duyệt.

#### - screenX / screenY
Tương tự là dùng để lấy giá trị toạ độ, điểm bắt đầu cũng xuất phát từ mép trên cùng bên trái. Nhưng ở đây nó sẽ chỉ thay đổi khi tăng giảm độ phân giải màn hình.

`screenX / Y` cho tọa độ tương ứng với các screenpixel trong thiết bị.

### 2. `offsetHeight`, `clientHeight`, `scrollHeight`
![](https://image.slidesharecdn.com/practicaljavascriptprogramming-session4-170712051634/95/practical-javascript-programming-session-48-38-638.jpg?cb=1499847771)
#### - scrollHeight
Là phép đo chiều cao thực tế của một element bao gồm cả content không hiển thị do bị giới hạn bởi vùng scroll.

`scrollHeight = ENTIRE content + padding`

#### - clientHeight
Là phép đo theo chiều cao CSS của element, bao gồm `border`, `padding` và thanh scroll ngang (nếu có).

`clientHeight = VISIBLE content + padding`

#### - offsetHeight
Tương tự như `clientHeight`, tuy nhiên không tính thêm size của `border`.

`offsetHeight = VISIBLE content + padding + border + scrollbar`

Để dễ hình dung, anh em có thể xem qua demo này:
https://codepen.io/nguyenhuukhuyenudn/full/qBRgeQB
### 3. `naturalWidth` và `width`
![](https://images.viblo.asia/a5319ea5-1b64-49db-82a5-52738f1f95d5.png)

Cả 2 phương thức trên đều trả về giá trị px của 1 element, thường dùng cho trường hợp get size của image. Tuy nhiên mỗi cái lại có một chức năng và mục đích khác nhau.

#### - naturalWidth
Trả về chiều rộng thực tế của một element. Là giá trị không bao giờ thay đổi. Ví dụ: 1 tấm hình rộng 100px luôn có width tự nhiên là 100px ngay cả khi image được thay đổi kích thước bằng CSS hoặc JavaScript.
#### - width
Là chiều rộng đo được khi đã được can thiệp bởi CSS hoặc Javascript.

### Tổng kết
Bài chia sẻ trên là những điểm khác biệt mà quá trình fix bug mình đã nhận ra. Hi vọng sau bài này sẽ giúp anh em có thêm kiến thức để tránh những phát sinh không mong muốn. Hãy đón chờ những bài sau để cùng mình đi du lịch nữa nhé. :D