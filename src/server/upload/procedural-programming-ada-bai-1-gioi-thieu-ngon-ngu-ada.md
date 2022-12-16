Sau khi đã giới thiệu và tìm hiểu hai mô hình lập trình căn bản nhất và cũng là hai khía cạnh tư duy song song mang tính chất bổ trợ lẫn nhau là Tư Duy Lập Trình Tuần Tự `Imperative Programming` và Tư Duy Lập Trình Định Nghĩa `Declarative Programming`; Chúng ta tiếp tục đến với hai mô hình lập trình tiếp theo là Lập Trình Thủ Tục `Procedural Programming` và Lập Trình Hàm `Functional Programming`.

Nếu trọng tâm của  hai mô hình lập trình đầu tiên là cách thức mà chúng ta diễn đạt một logic hoạt động cho máy tính hiểu bằng `các câu lệnh tuần tự` hay bằng `các biểu thức tương quan giữa các yếu tố`; Thì trọng tâm của hai mô hình tiếp theo là cách mà chúng ta tổ chức, sắp xếp, và quản lý các chương trình con `sub-program`, để kiến trúc nên một chương trình bất kỳ. Và để mở đầu thì chúng ta sẽ đến với mô hình Lập Trình Thủ Tục `Procedural Programming` với ngôn ngữ có tên là [Ada (Lovelace)](https://learn.adacore.com/courses/intro-to-ada/chapters/introduction.html).

## Lịch Sử Ngôn Ngữ

Vào những năm 1970s, tổ chức USDoD (United States Department of Defense) đã phải đối diện với một bài toán lớn về sự bùng nổ số lượng các ngôn ngữ lập trình, với rất nhiều các dự án sử dụng các dạng cú pháp không có tiêu chuẩn chung. DoD đã giải quyết vấn đề này bằng cách mở ra một cuộc trưng cầu ý kiến về các yếu tố thiết yếu mang tính tiêu chuẩn cho một ngôn ngữ lập trình hiện đại nói chung. Và bản thảo được lựa chọn là một sản phẩm của Jean Ichbiah.

Phiên bản đầu tiên của `Ada` được giới thiệu năm 1983; và liên tục được phát triển, cập nhật, vào những năm tiếp theo là 1995, 2005, và 2012, với mỗi phiên bản mới đều mang đến thêm những tính năng hấp dẫn. Tài liệu hướng dẫn học `Ada` này được tham khảo và lược dịch từ trang tài liệu chính thức [`learn.adacore.com`](https://learn.adacore.com/), tập trung vào phiên bản mới nhất của `Ada` từ sau lần cập nhật lớn vào năm 2012.

## Lĩnh Vực Ứng Dụng

Hiện tại thì `Ada` được sử dụng rất nhiều trong lập trình nhúng `embedded` trên các hệ thống `real-time` yêu cầu tính năng điều hành ổn định tuyệt đối cao. Mặc dù `Ada` vốn được thiết kế với định hướng là một ngôn ngữ lập trình phổ cập `general-purpose`, ngôn ngữ này sẽ có thể thực sự thể hiện thế mạnh trong lập trình các ứng dụng bậc thấp `low-level`:

- Lập trình nhúng `embedded` điều hành các hệ thống có dung lượng bộ nhớ thấp và không cho phép các trình thu dọn `garbage collector` khả dụng.
- Giao tiếp trực tiếp với phần cứng của các thiết bị.
- Các hệ thống `real-time`.
- Lập trình bậc thấp `low-level`.

Các lĩnh vực đặc thù mà chúng ta có thể bắt gặp `Ada` được sử dụng đó là Hàng Không Vũ Trụ, Hàng Không Thương Mại, Đường Sắt, và một số khác nữa. Những lĩnh vực này đều yêu cầu mức độ đảm bảo an toàn rất cao, nơi mà một lỗi phần mềm sẽ không đơn giản chỉ có ý nghĩa là một vài giây phút vô nghĩa, mà rất có thể sẽ tạo ra một series các hệ quả khó lường.

Và `Ada` có cung cấp các tính năng giúp đảm bảo sự an toàn này với khả năng phát hiện các lỗi lập trình từ những giai đoạn đầu tiên của tiến trình phát triển phần mềm - tại thời điểm biên dịch code hoặc bằng cách sử dụng các công cụ phân tích code trực quan. Bên cạnh đó thì `Ada` cũng có thể được sử dụng để tạo ra các ứng dụng trong nhiều lĩnh vực khác, ví dụ như:

- Lập trình đồ họa game
- Các ứng dụng Audio `real-time`
- Lõi điều hành `kernel` của các hệ thống

Và nếu để so sánh tương quan về mục tiêu ứng dụng và cấp độ trừu tượng được hỗ trợ bởi ngôn ngữ thì `Ada` có thể được so sánh tương đương với `C++` và `Rust`. Điểm tuyệt vời đáng nói là `Ada` có khả năng giao tiếp với `C` rất dễ dàng và trực quan, vì vậy nên mặc dù không thuộc nhóm các ngôn ngữ rất phổ biến thì `Ada` cũng hề không thiếu tiềm năng để kiến tạo bất kỳ dạng ứng dụng nào. Chúng ta có thể dễ dàng sử dụng lẫn cả `Ada` và `C` trong cùng một `project` giống như các bộ đôi `C# + F#` trên `.NET` hay `Java + Kotlin` trên `JVM`.

Liên kết tham khảo: [Ada Projects on Ada IC](https://www.adaic.org/advantages/projects/)

## Triết Lý Thiết Kế

Căn bản triết lý của `Ada` có nhiều điểm khác biệt so với phần lớn các ngôn ngữ lập trình khác. Ẩn sau thiết kế của `Ada` là các nguyên lý được liệt kê dưới đây:

- Tính dễ đọc, trực quan - được xem là quan trọng hơn là code ngắn gọn. Cụ thể là `Ada` ưu tiên sử dụng các từ khóa `keyword` hơn so với các ký hiệu `symbol`, và không có từ khóa nào của `Ada` là từ ở dạng viết tắt.
- Tính năng định kiểu dữ liệu `typing` cực kỳ mạnh mẽ. Việc tự định nghĩa một kiểu dữ liệu mới trong `Ada` rất đơn giản và hiệu quả trong việc ngăn ngừa các lỗi logic sử dụng. Về điểm này thì `Ada` có thể sánh ngang với các ngôn ngữ Lập Trình Hàm `Functional Programming` như `Haskell` hay `Lisp`.
- Logic của code được biểu thị rõ ràng, tường minh - được xem là tốt hơn so với việc ngầm định bất kỳ yếu tố nào. Mặc dù đây là một khẩu ngữ của `Python`, nhưng `Ada` còn nhấn vào yếu tố này quan trọng hơn bất kỳ ngôn ngữ lập trình nào khác:
    - Tất cả các kiểu dữ liệu đều phải được đặt tên trước khi sử dụng, và sẽ không có các yếu tố lạc danh `anonymous`.
    - Như đã nói trước đó, chúng ta sẽ không có thao tác ngầm định kiểu dữ liệu sử dụng cho bất kỳ tên định danh nào.
    - Ngữ nghĩa của các cú pháp được định nghĩa rất rõ ràng và hạn chế các yếu tố logic không thể xác định ở mức tối thiểu.
    - Người viết code sẽ có thể cung cấp cho trình biên dịch rất rất nhiều thông tin để mô tả các yếu tố được sử dụng trong code.

Hệ quả kéo theo sau bộ nguyên lý thiết kế ngôn ngữ này đó là chất lượng của các phần mềm được viết bằng `Ada` so với viết bằng `C` được cải thiện 70% - 90% số lỗi lập trình và giúp tiết kiệm một nửa chi phí phát triển. Thậm chí `Ada` còn được đánh giá cao hơn nữa khi người ta làm thống kê về chi phí duy trì cập nhật và sửa lỗi phần mềm, mà thông thường phải tiêu tốn tới 80% chi phí phát triển.

Và bây giờ chúng ta sẽ bắt đầu tìm hiểu về từng yếu tố của ngôn ngữ `Ada`, được xem là nền tảng xây dựng nên bộ triết lý thiết kế nói trên.

[[Procedural Programming + Ada] Bài 2 - Một Ngôn Ngữ Imperative](https://viblo.asia/p/x7Z4D6a1LnX)