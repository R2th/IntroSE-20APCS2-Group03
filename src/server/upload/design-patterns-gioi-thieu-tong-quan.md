`Design Patterns` là các dạng thức triển khai code được các lập trình viên giàu kinh nghiệm đúc kết, giúp nhanh chóng xử lý nhiều vấn đề phổ biến mà chúng ta thường gặp trong quá trình viết code. Các giải pháp này được ghi nhận qua thời gian dài và được chiêm nghiệm bởi rất nhiều nhà phát triển phần mềm.

## Giới thiệu Bộ Tứ GoF (Gang of Four)

Năm 1994, có bốn tác giả lớn là `Erich Gamma`, `Richard Helm`, `Ralph Johnson`, và `John Vlissides` đã đồng xuất bản một cuốn sách có tên là `Design Patterns - Elements of Reusable Object-Oriented Software` .Dịch nôm na là `Các dạng thức triển khai - Những yếu tố đặc trưng của code OOP có thể tái sử dụng`. Cuốn sách này đã đặt nền móng mở đầu cho thuật ngữ `Design Patterns` trong việc phát triển phần mềm.

Các tác giả này được biết đến với tên gọi là `Bộ Tứ` hay `GoF (Gang of Four)`. Theo họ cho biết, `Design Patterns` chủ yếu được xây dựng dựa theo các tiêu chí sau của thiết kế hướng đối tượng:

- Lập trình hướng đến một `interface` (giao diện) chứ không phải là triển khai mở rộng `interface` đó.
- Ưu tiên việc tổ hợp object `hơn` so với việc sử dụng hình thức kế thừa.

## Ứng dụng của Design Patterns

`Design Patterns` có 2 ứng dụng chính trong công việc phát triển phần mềm.

### 1. Tạo ra một nền tảng chung cho các nhà phát triển

Các `pattern` cung cấp một giải pháp chung mang tính chất tiêu chuẩn mặt bằng và đặc trưng cho nhiều trường hợp. Ví dụ, `Singleton` được các nhà phát triển biết đến và sử dụng làm giải pháp chung để tạo ra một `object` đơn nguyên duy nhất của một `class`. Và họ cũng sẽ nói ra cái tên này khi được hỏi về giải pháp thực hiện một công việc như vậy.

### 2. Có thể được xem là các giải pháp tốt nhất

Các `pattern` cũng được phát triển qua thời gian dài và mang đến những giải pháp tốt nhất cho nhiều vấn đề thường gặp khi phát triển phần mềm. Việc học các dạng thức triển khai này sẽ giúp cho các nhà phát triển phần mềm chưa có kinh nghiệm có thể học được cách thiết kế phần mềm dễ dàng hơn.

## Có tất cả bao nhiêu dạng thức đã được công nhận

Nguyên gốc theo cuốn `Design Patterns - Elements of Reusable Object-Oriented Software` thì có tất cả `23 dạng` thức triển khai và có thể được chia ra làm `3 nhóm` là Khởi Tạo `Creational`, Kiến Trúc `Structural`, và Hành Vi `Behavioral` - dựa trên công dụng của các dạng thức. Tuy nhiên thì ở thời điểm hiện tại con số này đã có một chút sự tăng tiến và chúng ta còn có thêm một nhóm mới là `J2EE Patterns`. Chúng ta sẽ cùng nhau tìm hiểu chi tiết hơn trong các bài viết tiếp theo.

- Các `pattern` Khởi Tạo -` Creational Patterns`
    - Các `pattern` này cung cấp giải pháp khởi tạo các `object` trong khi ẩn đi logic của tiến trình khởi tạo, thay vì khởi tạo `object` trực tiếp bằng toán tử `new`. Cách khởi tạo này giúp đem lại sự linh động tốt hơn trong việc quyết định những `object` nào cần được tạo ra trong trường hợp cụ thể.
- Các `pattern` Kiến Trúc - `Structural Patterns`
    - Các `pattern` này quan tâm tới vấn đề tổ hợp các `class` và `object`. Trong đó, tính kế thừa được áp dụng để tổ hợp các giao diện và định nghĩa cách thức tổ hợp các Object để có thêm tính năng mới.
- Các `pattern` Hành Vi - `Behavioral Patterns`
    - Các `pattern` này quan tâm chủ yếu tới yếu tố giao tiếp giữa các `object`.
- Các `pattern` của Sun Java - `J2EE Patterns`
    - Các `pattern` này đặc biệt quan tâm tới tầng biểu thị dữ liệu và được đặt nhận diện bởi Sun Java Center.

Nhân tiện dịch tới đây thì mình mới nhớ ra một vấn đề quan trọng, đó là các ví dụ triển khai được sử dụng trong các bài viết tiếp theo sẽ sử dụng Java. Lý do mà Tutorialspoint họ chọn Java để làm Tút có lẽ cũng dễ hiểu, đó là bởi vì sự phổ biến của ngôn ngữ này và quan trọng hơn nữa đó là cú pháp rườm rà, cứng nhắc, khó có thể có sự nhầm lẫn gì giữa người viết và người đọc code.

Vì vậy nên nếu như bạn chưa từng nói chuyện với máy tính bằng Java bao giờ thì rất có thể bạn sẽ cần một khóa cơ bản cấp tốc trước khi đọc bài viết tiếp theo đấy nhé. :D