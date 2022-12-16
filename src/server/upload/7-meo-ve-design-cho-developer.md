Mọi web developer đều sẽ gặp phải trường hợp họ cần đưa ra một quyết định về design, cho dù có thích hay không.

Có thể là do công ty bạn đang làm việc không có desinger và bạn phải tự tạo UI cho chức năng mới. Hoặc là bạn đang làm side-project và muốn nó trông đẹp hơn một trang bootstrap bình thường.

Tất nhiên bạn có thể nói: "Tôi không thể làm việc này, tôi không phải là nghệ sĩ!", nhưng ngoài kia có cả tấn thủ thuật giúp bạn nâng cao chất lượng công việc mà không yêu cầu kiến thức về thiết kế đồ họa.

Dưới đây là 7 ý tưởng đơn giản giúp bạn cải tiến giao diện.

### 1. Dùng color hoặc font-weight để phân cấp thay vì dùng font-size
![](https://images.viblo.asia/4ab429e9-a2cc-4ebc-8f09-65b7a7155f81.png)

Một lỗi thường gặp khi thiết kế text cho UI là phụ thuộc quá nhiều vào font-size để phân cấp.

*“Đoạn text này quan trọng? Cho no to hơn chút.”*

*“Đoạn này ít quan trọng hơn? Cho nó nhỏ hơn”*

Thay vì để một mình font-size chịu trách nhiệm cho vấn đề này, **hãy dùng thêm màu sắc hoặc font-weight**. 

*“Đoạn text này quan trọng? **Cho nó đậm hơn.**”*

*“Đoạn này ít quan trọng hơn? **Dùng màu nhạt hơn.**”*

Hãy chọn 2 hoặc 3 màu:
* Màu tối (không phải đen) làm content chính (chẳng hạn tiêu đề bài viết)
* Màu xám cho content thứ cấp (như ngày tạo bài viết)
* Màu xám nhạt cho content phụ thuộc (chẳng hạn dòng copyright ở footer)

![](https://images.viblo.asia/f7b77ca5-1c1a-4a7d-8fdb-cd9a833a3bcf.png)

Tương tự, chỉ cần 2 kiểu font-weight là đủ dùng cho UI rồi:
* Text bình thường thì dùng font-weight 400 hoặc 500
* Đoạn text nào muốn nhấn mạnh thì dùng font-weight 600 hoặc 700

**Tuyệt đối tránh font-weight dưới 400 khi thiết kế UI**; chúng có thể dùng cho heading cỡ lớn nhưng thường rất khó đọc khi dùng với text có size bé hơn. Nếu bạn muốn làm giảm độ quan trọng của một số đoạn text nào đấy thì thay vì hạ thấp font-weight, hãy dùng màu nhạt hơn hoặc là font-size bé hơn.

### 2. Không dùng text xám trên nền màu sắc
![](https://images.viblo.asia/9c168bac-b69c-4e3a-9edc-8da9d61c2de8.png)

Màu xám dùng trên nền trắng là một cách để làm mờ text, nhưng dùng trên nền màu thì không hiệu quả cho lắm.

Lý do là hiệu ứng giữa màu xám và màu trắng làm giảm độ tương phản.

![](https://images.viblo.asia/e4adbb81-a455-43f8-93d0-c2fec9c3d770.png)

Nếu mà background có màu sắc, có 2 cách để giảm độ tương phản giữa text và background:
#### 1. Giảm opacity của text màu trắng
Dùng text trắng và opacity thấp cho phép màu nền nét hơn và làm chìm đi đoạn text mà vẫn không gây xung đột với nhau.

![](https://images.viblo.asia/773b1658-c05f-45b2-be99-ca433759cf91.png)
#### 2. Chọn màu tương đồng với background
Khi background là ảnh hoặc một pattern, hãy chọn màu trương đồng với màu background để tránh text bị trôi

![](https://images.viblo.asia/132f8e34-9023-425c-b43c-69cca1892edb.png)

### 3. Đổ bóng
![](https://images.viblo.asia/1af7a28a-314e-4a67-8761-0a142815aa36.png)

Thay vì làm mờ, hãy đổ bóng theo chiều dọc.

Điều này giúp design trông tự nhiên hơn, kiểu như ánh đèn chiếu từ trên xuống như ngoài đời thực.

![](https://images.viblo.asia/40d07768-79a9-4ce1-bdf6-524cfb61c567.png)


### 4. Dùng ít border
![](https://images.viblo.asia/027ffdfe-caa0-47b4-aa21-68846159d00f.png)

Khi cần phân tách 2 element, đừng vội dùng border.

Dù border là cách tuyệt vời để phân biệt 2 phần tử, chúng không phải là cách duy nhất, và lạm dụng điều này sẽ khiến thiết kế của bạn trông luộm thuộm và nặng nề.

Lần tới khi thấy cần dùng border, hãy thử trước một trong những ý tưởng dưới đây:
#### 1. Dùng box shadow

Box shadows tạo biên rất tốt cho element, tương tự như border, nhưng tinh tế hơn và vẫn đạt được mục đích mà không làm giảm đi sự linh hoạt.
![](https://images.viblo.asia/3577939d-385b-4e59-aa6d-c1758c2c4e7d.png)
#### 2. Dùng 2 màu nền khác nhau
Tạo 2 màu nền khác nhau là cách thường dùng khi cần phân biệt 2 phần tử. Nếu bạn đã dùng 2 màu nền khác nhau rồi mà vẫn thêm border thì hãy xóa nó đi vì không cần thiết nữa.

![](https://images.viblo.asia/19fd3abf-e59f-4a40-9196-7242902f48cb.png)
#### 3. Thêm khoảng trống
Cách hay hơn nữa để phân biệt các phần tử với nhau đơn giản là tạo thêm khoảng trống giữa chúng, đơn giản mà vẫn hiệu quả.

![](https://images.viblo.asia/05f029ee-8eb4-4345-9889-8a42d86d23a7.png)

### 5. Không dùng icon quá to
![](https://images.viblo.asia/ac73ab70-ae2d-49ec-a72c-072ece992e9c.png)

Nếu thiết kế cần dùng một vài icon lớn, bạn có thể lấy bộ icon miễn phí như Font Awesome hoặc Zondicons và tăng kích thước cho đến khi đạt được yêu cầu.

Chúng là vector nên chất lượng sẽ không ảnh hưởng dù bạn tăng hay giảm kích thước.

Trong khi đó icon mà được vẽ ở kích cỡ 16-24 px sẽ không được đẹp khi bạn tăng gấp 3 hoặc gấp 4 lần kích thước gốc, chúng sẽ bị mờ và có thể bị vỡ pixel.
![](https://images.viblo.asia/9bc1b209-87b3-4e9f-9e31-13ecf6c0a66c.png)

Nếu bạn chỉ có icon nhỏ, hãy nhét chúng trong một hình khác.
![](https://images.viblo.asia/62676cda-50a0-42b2-ad35-cd0d71e84763.png)

Điều này cho phép giữ nguyên kích thước icon mà kích thước tổng vẫn đủ lớn.

Có điều kiện thì bạn có thể dùng bộ icon trả phí như Heroicons hoặc Iconic.

### 6. Dùng border có màu sắc
![](https://images.viblo.asia/9c8c9a16-4363-4538-a596-e30cf8a8b001.png)
Nếu bạn không phải là designer, làm cách nào để trang trí giao diện người dùng trông lung linh như khi chụp ảnh hoặc vẽ minh họa.

Một thủ thuật đơn giản là tạo điểm nhấn bằng cách thêm border có màu sắc.

Ví dụ, viền của một alert message:
![](https://images.viblo.asia/2cac99e0-af55-491b-88ae-54f64d5f7ed8.png)

… hoặc nhấn mạnh một item của menu
![](https://images.viblo.asia/13b26bc4-9aba-476a-9361-0cf8e5870078.png)

…hoặc thậm chí là toàn layout
![](https://images.viblo.asia/2e9906f2-891e-4079-91a1-d5788d887aa9.png)

Điều này không cần bất cứ tài năng thiên bẩm gì về design, chỉ cần thêm những hình chữ nhật đầy màu sắc sẽ giúp website của bạn trông chuyên nghiệp hơn.

### 7. Không phải button nào cũng cần đổ màu
![](https://images.viblo.asia/1f6d2a84-77cf-4fef-8788-5ba33e861c32.png)
Khi có nhiều hành vi mà user có thể thực hiện trên một trang, bạn rất dễ rơi vào cái bẫy của việc thiết kế những hành vi này dựa trên ngữ nghĩa.

Framework như Bootstrap khuyến khích điều này bằng cách cung cấp cho bạn một bộ style theo ngữ nghĩa để chọn mỗi khi bạn thêm một button mới:
![](https://images.viblo.asia/c7a3184f-97a2-444b-bd71-9cd0bca9467e.png)
*“Hành vi tích cực? Button màu xanh.”*

*“Xóa dữ liệu? Button màu đỏ.”*

Ngữ nghĩa là một phần quan trọng trong thiết kế button, nhưng có một thước đo quan trọng hơn thường bị bỏ qua: thứ bậc.

Mọi hành vi trên một trang đều nằm đâu đó trong kim tự tháp về mức độ ưu tiên. Hầu hết các trang web chỉ có một hành vi chính, vài hành vi thứ cấp, và một số hành vi hiếm khi sử dụng.

Khi thiết kế những hành vi này, điều quan trọng là kết nối vị trí của chúng theo cấp bậc.
* Hành vi chính nên rõ ràng, màu nền có độ tương phản cao là tốt nhất
* Hành vi thứ cấp nên rõ ràng nhưng đừng nổi bật
* Các hành vi phụ nên dễ tìm nhưng không phô. Định dạng kiểu link là tốt nhất.

![](https://images.viblo.asia/bf1f290a-4a07-4250-be9f-f0e2b40b6314.png)
“Những hành vi phá hủy có nên lúc nào cũng là màu đỏ?”

Không cần thiết! Nếu hành vi phá hủy không phải là hành vi chính trên trang đó, có thể xem nó hành vi thứ cấp hoặc phụ.
![](https://images.viblo.asia/9ca315db-c43d-4e34-822f-0152281d5afa.png)

Định dạng màu đỏ, đậm cho những hành vi tiêu cực khi nó là hành vi chính trên giao diện, nhưng dialog sau:
![](https://images.viblo.asia/a7348d38-37da-4c71-ad54-92134c3db4e1.png)

Nguồn: [https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886)