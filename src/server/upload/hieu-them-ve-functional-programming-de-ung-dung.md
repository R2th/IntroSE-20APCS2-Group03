**Functional Programming là gì?**

Functional Programming đã có mặt từ rất lâu, nó là nền tảng lập trình chính. Công nghệ ngày càng phát triển, những ngôn ngữ lập trình khác ra đời như SML, OCaml, APL và Clean, đã làm FP bị tuột lại phía sau, tuy là vẫn được phát triển nhưng chỉ được sử dụng cho mục đích học thuật và nghiên cứu là chủ yếu. Từ đó đặt ra câu hỏi, tại sao dù có mặt từ rất lâu và vẫn duy trì phát triển nhưng FP lại không đạt được nhiều thành công như, Imperative hay OO...

FP là một phương pháp lập trình khá phổ biến và quan trọng trong khoa học máy tính. Công việc của FP là xem chương trình là một tập hợp các hàm nhận vào đối số và trả về giá trị. Không giống như imperative và OO, FP không tạo ra hiệu ứng phụ và sử dụng đệ qui thay cho vòng lặp. Hàm của FP rất giống với hàm trong toán học vì nó không làm thay đổi trạng thái của chương trình.

Ví dụ như: f(x) = y thì x sẽ luôn bằng y, đại lượng khi được gán giá trị thì không bao giờ thay đổi giá trị đó.

Cơ sở toán học của FP rất minh bạch, chính vì thế nó không linh hoạt thay đổi trạng thái, FE cung cấp giải pháp logic và ngắn gọn cho các vấn đề tính toán. Do đó khiến người ta ưa chuộng các paradigm khác hơn để xử lý các thao tác tính toán thông dụng. Với F#, rào cản trên được giải quyết vì cho phép sử dụng nhiều paradigm và trộn lẫn chúng với nhau để giải quyết vấn đề theo cách tiện lợi nhất.

Những thuật ngữ trong FP cũng đơn giản rõ ràng như chính bản thân nó vậy. Để có một cái nhìn bao quát về ngành này, chúng ta phải hiểu được những khái niệm về nó trước.

**Pure function (Hàm thuần khiết)**

Một hàm thuần khiết của FP bao gồm các inputs giống nhau, luôn cho ra một output giống nhau và chắc chắn là sẽ không có hiệu ứng phụ

**Function composition (Hàm kết hợp)**

Đây là hành động thực hiện một tiến trình có kết hợp hai hay nhiều hàm để tạo nên hàm mới hoặc thực hiện một nhiệm vụ gì đó. Nếu bạn có thể sử dụng nhuần nhuyễn function composition thì đó sẽ là một bước quan trọng để hiểu phần mềm được xây dựng sử dụng Functional Programming như thế nào.

**Shared state (Chia sẻ biến)**

Shared state được hiểu nôm na là dù ở bất cứ các biến, đối tượng, hoặc không gian bộ nhớ mà chúng tồn tại trong một phạm vi được chia sẻ (shared scope). Một shared scope bao gồm scope toàn cục và scope closure. Chúng được dùng chung quá nhiều nơi và rất khó để biết hàm nào đã làm thay đổi biến đó. Các hàm không nên chia sẻ nhau giữa các biến, dữ liệu. Kết quả có thể khác nhau nếu chúng ta đổi thứ tự của các hàm với những biến chia sẻ.

**Nhược điểm của FP?**

Tuy cách thức hoạt động của FP khá đơn giản nhưng khi kết hợp chúng vào một chương trình lớn thì rất khó: Tất cả các hàm phải tuân theo pattern giống nhau, nếu không FP sẽ bắt lỗi tất cả và không thể vận hành được.

Có thể hiểu là FP là 1 bài toán khó, nó sẽ đi kèm với các khái niệm về toán học nâng cao: đây sẽ là lý do gây nản lòng khi bạn học nó. Khi bạn quyết định đi theo functional programming, bạn sẽ phải làm quen và nắm vững recursive (đệ quy), thay vì for, while sử như khi làm OOP. Chính vì thế việc tối ưu bộ nhớ khi sử dụng đệ quy là điểm cần lưu ý. Nhưng điều này có thể giảm đáng kể bằng cách sử dụng tail recursion.