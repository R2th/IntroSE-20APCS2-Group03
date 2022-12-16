Câu hỏi được đặt ra trong bối cảnh mấy bạn code NodeJS và các ngôn ngữ khác khi chuyển qua Golang mới được biết tới món đặt sản tên Channel. Thứ được tác giả ngôn ngữ thiết kế từ trong core, là first class language, không cần phải import thêm package để sử dụng.

Channel sinh ra để các tiến trình bất đồng bộ (trong Go hay gọi là Goroutines) có thể giao tiếp với nhau mà không cần phải dùng biến từ bên ngoài. Nó không được thiết kế để giải quyết mọi trường hợp của concurrent nhưng nó giúp việc này dễ dàng, an toàn và vui hơn. Thậm chí tới những trường hợp không cần dùng channel nhưng các gopher vẫn dùng channel chỉ vì họ thực sự thích nó.

Điều làm Go Channel trở nên đặc biệt là vì nó vừa là kênh giao tiếp (truyền data), vừa là một cơ chế lock/unlock như mutex. Nó giống như hình ảnh của người phục vụ và thực khách, giả sử bàn ăn chỉ để được 1 món duy nhất. Nếu tốc độ phục vụ đồ ăn nhanh hơn của khách, trên bàn còn món, thì người phục vụ sẽ đứng đợi để đặt lên món mới. Ngược lại người khách phải đợi phục vụ lên món mới ăn tiếp được. Công việc của cả 2 người này là hoàn toàn bất đồng bộ với nhau, chỉ "giao tiếp" qua channel bàn ăn và đồ ăn trên bàn.

**1. So với Callback function:**
Khi ta cần chạy 1 task bất đồng bộ (async task), nhưng lại không biết khi nào nó done để lấy kết quả từ nó mà chạy tiếp. CB sẽ là một giải pháp, định nghĩa một function với tham số đầu vào là kết quả của task trên, khi task này chạy xong sẽ call vào hàm này. Mình tạm coi đây là giao tiếp một chiều từ Async Task -> CB.

Để làm được giao tiếp 2 chiều: Async Task <-> CB thì CB phải được định nghĩa có trả về để Async Task lấy nó rồi làm tiếp,... Nhưng lưu ý là cách giao tiếp này Async Task sẽ gọi CB một cách bình thường, là Sync Call, phải đứng đợi trả về. Nếu ta cố gắng gọi CB như một Async Task nữa thì lại phải phát sinh thêm một CB nữa, việc này là rất rắc rối và dễ bị stackoverflow.

**2. So với mutex lock:**
Mutex lock vẫn luôn là giải pháp rất tốt và tránh bị data racing khi có nhiều Goroutines cùng đọc và ghi vào 1 biến chung. Đây là phương thức truyền thống, sử dụng share memory như một kênh giao tiếp. Trái ngược với Channel: dùng kênh giao tiếp để share memory.

Có 3 điểm khác biệt chính khi so sánh mutex lock và channel :
- Channel đưa ra khái niệm give ownership, khi data đã đẩy vào channel, thì Goroutine hiện tại đã "bàn giao". Goroutine nào nhận nó thì có toàn quyền, không cần care "ai đó" cũng đang xài chung hay không.

- Nếu cần đồng bộ nhiều Goroutines (>2) thì ta nên dùng mutex lock. Vì mutex không quan tâm shared memory đang được tham chiếu bởi bao nhiêu Goroutines. việc dùng channel lúc này lại vô tình phức tạp hơn.

- Vì mutex chỉ quan tâm là lock và unlock biến, nên một Goroutine có thể read/write shared memory N lần không care tới các tiến trình khác, miễn không bị lock. Với channel thì có, nó giúp đồng bộ cả số lượng thực thi của 2 tiến trình. Như ví dụ trên, rõ ràng là thực khách không thể ăn nhiều món hơn số lượt phục vụ được, và ngược lại với người phục vụ cũng thế. Đây là cơ chế rất quan trọng trong Streaming Data và pub/sub rất hay dùng trong Go.

Sẽ còn nhiều sự khác biệt khác nhưng có thể mình không kịp nhớ ra. Tuy nhiên việc so sánh không nhằm quảng bá thần thánh hoá Go Channel. Thay vào đó chúng ta sẽ cùng hiểu rõ bản chất của nó để đưa ra lựa giải pháp phù hợp cho bài toán cụ thể.

No tool best fit all cases.

Link bài viết gốc tại [đây](https://www.facebook.com/photo.php?fbid=2723323394362429&set=gm.2796864637007238&type=3&theater&ifg=1)