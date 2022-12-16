## I. Singleton - Creational Patterns
- Singleton không còn quá xa lạ với lập trình viên, là mẫu thiết kế mà mọi người đều nhớ đến đầu tiên khi nhắc về design patterns. Gần như 80% câu hỏi của lập trình viên đều dành cho Singleton khi đặt vấn đề về Design Patterns.
- Đúng theo tên gọi của nó, Singleton là một instance duy nhất của một loại đối tượng, chắc chắn không tồn tại đối tượng thứ hai như vậy trong toàn bộ chương trình của chúng ta. Tại lần đầu tiên được gọi, instance sẽ được khởi tạo và được `reuse` cho tất cả các lần sử dụng tiếp theo trong chương trình.

## II. Khi nào nên sử dụng Singleton?
Vậy thì khi nào chúng ta nên sử dụng Singleton, mình sẽ liệt kê một vài trường hợp sau mà chúng ta thường sử dụng Singleton nhé:
- Khi chúng ta muốn tận dụng một connection duy nhất xuống database cho từng query khác nhau.
- Khi cần mở một `Secure Shell` (SSH) kết nối đến server để làm một số công việc, và chúng ta không muốn reopen connection này khi làm từng công việc đó.
- Chúng ta cần giới hạn số lượng truy cập đến một biến, hay một vùng nhớ, khi đó Singleton đóng vai trò như một (những) con đường mà chúng ta giới hạn số lượng truy cập đồng thời (thường được biết đến là Connection Pool Design Pattern). Với Golang, chúng ta có thể sử dụng `channels` để handle việc này.

Còn rất tính ứng dụng của mẫu Singleton, mình chỉ liệt kê một vài thứ phía trên thôi ^^.

## III. Ví dụ thực tế
- Chúng ta có 1 `function Print` được thực thi khi user click button `In đơn hàng` và một đối tượng Counter để ghi lại số lần Click của User trong suốt lifetime. Khi đó ta phải luôn đảm bảo rằng đối tượng Counter luôn là duy nhất, khi đó Singleton sẽ hữu dụng với chúng ta (tuy nhiên vẫn còn nhiều cách không sử dụng Singleton vẫn có thể làm được, nhưng có lẽ sẽ messy hơn 😄)
![image.png](https://images.viblo.asia/d46ce2d6-bd7b-4c98-9668-b0d73afc846f.png)
<div align="center">*User không biết được đối tượng Counter luôn là duy nhất sau những lần Print (những lần open the door khác nhau). Nguồn: Guru*</div>

- **Để hoạt động một cách đúng đắn, đối tượng Counter ở trên cần tuân thủ những nguyên tắc sau:**
    <br>1. Khi chưa có đối tượng Counter nào được khởi tạo trước đó, Couter sẽ được khởi tạo với initial value là 0.
    <br>2. Trong trường hợp Counter đã được khởi tạo từ trước, trả về instance Counter đó.
    <br>3. Nếu chúng ta trigger phương thức `Print`, count value của Counter được tăng thêm 1.
    
## IV. Implementation
Mình sẽ tạo một chương trình đơn giản để implement Singleton Counter trong ví dụ trên, bắt đầu với project structure như sau: ![image.png](https://images.viblo.asia/98ef56dc-21f0-4b08-bb34-89cdf5b8b7a8.png)
- File main.go (entry point)
- Package Singleton: implement coutner singleton
- File go.mod

Đoạn code cũng ngắn, nên mình sẽ source toàn bộ source ở ảnh bên dưới nhé: 
![image.png](https://images.viblo.asia/04fda4d4-b1cc-4970-83eb-39353345395b.png)

- Ở file counter.go, chúng ta define một private struct là `singleton` bao gồm field counter kiểu int. Struct singleton bao gồm 2 method Increase và Get.
- Vì là private struct, nên chúng ta không thể truy cập/khởi tạo trực tiếp đối tượng `singleton` này từ bên ngoài được, mà phải thông qua public function `GetInstance`, function này có nhiệm vụ kiểm tra instance singleton đã được khai báo từ trước chưa. Nếu chưa thì sẽ khởi tạo đối tượng mới, ngược lại thì trả về đối tượng hiện tại.
- Qua file main.go ở đây mình có note một vài comments. Hiểu đơn thuần là khi muốn tăng giá trị biến counter hay get value từ nó, chúng ta phải thông qua GetInstance, điều này đảm bảo cho chúng ta luôn sử dụng đúng đối tượng Singleton duy nhất trong toàn bộ chương trình.
- Run chương trình bằng câu lệnh: `go run main.go` và kết quả cho ta: ![image.png](https://images.viblo.asia/8100ab05-71a7-442e-a74f-1d094e8b28ae.png)

## V. Lời kết
Trên đây mình đã giải thích cho các bạn hiểu về Singleton, mẫu Design Pattern thông dụng nhất đối với developers. `Counter` ở trên chỉ là một ví dụ nho nhỏ, đối với các chương trình lớn, phức tạp hơn, việc khởi tạo một đối tượng đôi khi sẽ trải qua một quá trình tính toán phức tạp, hay tiêu tốn nhiều tài nguyên và thời gian, chúng ta sẽ thấy được tầm quan trọng của Singleton một cách rõ ràng hơn.
<br>Ở bài viết này mình chỉ giới hạn ở mực basic nhất cách triển khai Singleton trong Golang, còn có rất nhiều vấn đề phải quan tâm khi implement Singleton, chẳng hạn như `Not Thread Safe` hay `Thread Safe`. Hi vọng sẽ gặp các bạn ở các chapters sau.

<br>Cảm ơn các bạn đã đọc ^^

Source code: https://github.com/khaaleoo/golang-design-patterns

## VI. References
- Go Design Patterns (Mario Castro Contreras)
- [Guru](https://refactoring.guru/) 

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).