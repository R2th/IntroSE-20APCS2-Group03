Xin chào các bạn, chắc hẳn trong chúng ta ai cũng đã từng một lần làm việc với Excel. Tại đó, chắc chắn bạn đã bắt gặp trường hợp file có lượng data lớn cần cuộn chuột để xem. Và điều gần như bắt buộc đó là bạn cần cố định cột tiêu đề đầu tiên của bảng để biết các giá trị mình đang xem thuộc trường nào.

![](https://images.viblo.asia/b35fb48e-da2a-442c-a4dc-5dd9fbc59b2c.gif)

Liên hệ mật thiết với lập trình front-end đó là trường hợp hiển thị dữ liệu bằng bảng (table). Trong bài viết này mình sẽ chia sẻ một vài tips nhỏ giúp bạn *Tạo bảng có thanh cuộn và cố định tiêu đề chỉ với CSS thuần*

## 1. Tạo 2 bảng độc lập với số column bằng nhau
Trong trường hợp này ta sẽ dùng 2 bảng độc lập với nhau và có cùng số cột, bảng số 2 sẽ được bọc trong một div được fix `height` hoặc `max-height` kết hợp với `overflow` để tạo thanh cuộn. Chi tiết như sau

{@embed: https://codepen.io/hoanghung96cs/pen/JqQqOP}
## 2. Chỉ dùng một bảng, thay đổi dạng hiển thị của thead, tbody, tr
Trường hợp này bạn sẽ sử dụng `table-layout: fixed` để cố định chiều rộng cho các cột, thay đổi dạng hiển thị của thead, tbody tr thành `display: table` và tbody thành `display: block` để có thể fix được `height` và `overflow`. Chi tiết như sau

{@embed: https://codepen.io/hoanghung96cs/pen/ZNdNqP}
## 3. Kết hợp với thuộc tính position
Đây là một thủ thuật rất hay, ta sẽ 'ẩn' đi cột tiêu đề của bảng và thay vào đó là các div với `position: absolute; top: 0` quen thuộc. Chi tiết như sau

{@embed: https://codepen.io/hoanghung96cs/pen/zQVQVY}
## 4. Kết hợp với Bootstrap để chia chiều rộng cho các cột
Trường hợp này ta sẽ chuyển toàn bộ kiểu hiển thị thead, tbody, tr, td, th về `display: block`, kết hợp với lưới grid của bootstrap để chia chiều rộng cho các cột, đồng thời fix `height` hoặc `max-height` kết hợp với `overflow` để tạo thanh cuộn

{@embed: https://codepen.io/hoanghung96cs/pen/rgEEON}

Trong trường hợp bạn không muốn sử dụng bootstrap, hoàn toàn có thể fix chiều rộng bằng các giá trị mong muốn
## 5. Lồng 2 bảng với nhau, sử dụng `colspan`
Trường hợp này khá giống với trường hợp 1. Nhưng thay vì sử dụng độc lập 2 table, ta sẽ lồng chúng vào nhau, sử dụng thuộc tính `colspan` với **giá trị đúng bằng số cột tiêu đề của bảng**. Chi tiết như sau

{@embed: https://codepen.io/hoanghung96cs/pen/VJZadY}

### Kết luận
Trên đây là một số thủ thuật giúp bạn Tạo bảng có thanh cuộn và cố định tiêu đề chỉ với CSS thuần mà mình đã tìm hiểu được để áp dụng vào bài toán thực tế. Hi vọng sẽ giúp ích cho các bạn nếu gặp phải issues tương tự. Nếu bạn có solution nào hay đừng ngần ngại chia sẻ dưới phần bình luận để giúp mọi người học hỏi thêm các kiến thức mới nhé. Nếu thích mình, hãy nhấn follow để nhận thông báo bài viết mới nhé :sweat_smile:

Xin cảm ơn !