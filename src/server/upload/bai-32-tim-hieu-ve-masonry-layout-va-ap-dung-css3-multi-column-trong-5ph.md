## 1. Tìm hiểu về Masonry layout

Trước khi học về CSS3 Multi-column, mình nghĩ mình nên giới thiệu qua cho các bạn hiểu về Masonry layout. Các bạn cùng nhìn ảnh dưới này nhé

![](https://images.viblo.asia/2ac5c2b8-9eac-4941-8161-5fd920031e67.png)

Ảnh bên trên là 1 dạng hiển thị kiểu Masonry layout. Vậy kiểu hiển thị này bắt nguồn từ đâu? Tên gọi của nó bắt nguồn từ tên một plugin trong jquery đó là **[Masonry plugin](https://masonry.desandro.com/)**, được phát triển bởi **David DeSandro** – một designer của Twitter.

![](https://images.viblo.asia/bb07125a-33ba-46b9-a181-d2ac61973f07.png)

**Masonry Layout** dược sử dụng lần đầu tiên bởi trang chuyên chia sẻ hình ảnh project nổi tiếng là [Pinterest.com](https://www.pinterest.com/) nên Masonry Layout còn được biết đến với cái tên Pinterest Style Layout. Mình sẽ nói sơ qua về loại layout mới mẻ này cho các bạn cùng hiểu nhé.

Như chúng ta thường thấy thì các loại bố cục layout cổ điển thường sử dụng thuộc tính Float trong CSS để dàn trang, sắp xếp các element side-by-side, nghĩa là sắp thứ tự theo chiều ngang rồi đến chiều dọc. Nếu như height của các element không đều nhau thì khi dàn hàng chúng sẽ tạo tao ra rất nhiều khoảng trống không cần thiết trong layout.

![](https://images.viblo.asia/b3ec4a1f-fb83-4655-afab-5eb3b02efb51.png)

Nhưng đối với **Masonry Layout**, các element sẽ được đưa vào các cột có chiều rộng (Width) được quy định sẵn, các element có chiều cao (Height) khác nhau nằm chung một cột sẽ được xếp vào mà không tạo ra khoảng trống do khác hàng. Các bạn cứ tưởng tượng Masonry giống như trò chơi xếp gạch – Tetris vậy

![](https://images.viblo.asia/bb3b4925-ff90-413b-9e13-d4031d7f9834.png)

Như vậy các bạn đã hiểu thế nào là Masonry layout rồi chứ? Vậy, một câu hỏi đặt ra lúc này là: **Làm thế nào để tạo được Masonry layout chỉ bằng CSS3 mà không dùng Masonry plugin?**

Câu trả lời đã nằm trên tiêu đề của bài viết này. Đúng vậy, chúng ta dùng **CSS3 Multi-column**. Và bây giờ chúng ta cùng đi tìm hiểu về cách sử dụng CSS3 Multi-column như thế nào để có thể tạo được Masonry layout nhé.

## 2. CSS3 Multi-column

Multi-column nó có các thuộc tính như sau:


| Thuộc tính | Giá trị | Mô tả |
| -------- | -------- | -------- |
|column | number. VD: column: 3;|Xác định số lượng cột muốn hiển thị.|
|column |đơn vị cụ thể. VD: column: 200px; |Xác định chiều rộng cụ thể cho cột. |
| column-count|number hoặc auto |Đối với gái trị **number** sẽ xác định số lượng cột còn **auto** thì số cột sẽ được xác định bởi các thuộc tính colum khác. |
|column-gap | number hoặc normal|**Number** là xác định khoảng cách chính xác giữa các cột. VD: 20px. Còn già trị **normal** thì khoảng cách các cột sẽ có giá trị mặc định (1em) |
|column-rule-style |dashed, dotted, double, groove, hidden, inset, none, outset, ridge, solid |Thiết lập kiểu của các đường kẻ giữa các cột. |
|column-rule-color | Mã màu sắc hoặc tên màu|Thiết lập màu của các đường kẻ giữa các cột.|
| column-rule-width|number (VD: 5px), medium, thin, thick | Xác định chiều rộng của các đường kẻ|
|column-rule|đơn vị, style, color |Đây là 1 kiểu viết kết hợp của 3 cái bên trên (tương tự như khi viết gộp của thuộc tính **border**) |
|column-span |1 hoặc all |Chỉ định số cột mà phần tử dùng (giống như colspan của table)|
| column-width| number hoặc auto|Xác định độ rộng |


Cùng coi **[Demo](https://codepen.io/maiptn226/pen/xoEJKG)** nhé

{@embed: https://codepen.io/maiptn226/pen/xoEJKG}

## 3. Lời kết

Như vậy, qua bài này các bạn cũng hiểu thế nào là Masonry layout và biết cách tạo ra nó rồi nhỉ. Thực lòng mà nói Masonry layout là 1 kiểu layout rất đẹp đúng không các bạn? Mình nghĩ không ít bạn cũng muốn sử dụng kiểu layout như thế này mà chưa tìm được phương pháp tối ưu nhất. Bây giờ thì các bạn có thể dễ dàng sử dụng layout này cho web của mình rồi. Chúc các bạn thành công!