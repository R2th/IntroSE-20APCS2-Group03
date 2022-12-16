Xin chào mọi người, sau bài một về tổng quan Spring thì nay chúng ta cùng đi sâu vào 2 khái niệm trung tâm và trái tim của Spring nhé đó là IoC (Inversion of Control) và DI (Dependency Injection). Nhưng trước khi đi vào 2 khái niệm này mình sẽ đưa một bài tuy không thuộc hệ sinh thái Spring Framework nhưng nó là cơ sở lý thuyết cho khái niệm DI đấy nhé, và 1 chút lý thuyết sẽ dễ cho bạn hình dung hơn đó là khái niệm Tight-coupling, Loose-coupling, Loosely coupled (chắc nghe lạ lắm đúng không dù nó có trong OOP đấy nhé).

# Tight-coupling và Loose-coupling
Ok mọi người bây giờ chúng ta sẽ đi vào 2 khái niệm nhỏ của lập trình hướng đối tượng nha:
1. **Tight-coupling** là gì? Tight-coupling xảy ra khi một nhóm các lớp có sự ràng buộc (phụ thuộc) cao tới các lớp khác trong chương trình.
	- Ví dụ: Hãy suy nghĩ một chút về làn da của chúng ta, da bị mắc kẹt vào cơ thể bạn khi bạn sinh ra đến đây vẫn ổn nè . Nhưng nếu bạn muốn thay đổi màu da của bạn từ trắng sang đen thì sao? Bạn có thể tưởng tượng sẽ đau đớn thế nào khi lột da của bạn, nhuộm màu cho nó, và sau đó dán nó trở lại? Thay đổi làn da của bạn là khó khăn vì nó được gắn chặt với cơ thể của bạn. Bạn không thể thay đổi dễ dàng. Bạn sẽ phải thiết kế lại một cách cơ bản một con người để biến điều này thành có thể.
	- Điểm mấu chốt số 1: Nói cách khác, nếu bạn muốn thay đổi làn da, bạn cũng sẽ phải thay đổi thiết kế của cơ thể vì cả hai được kết hợp với nhau – chúng được gắn kết chặt chẽ.
	- Kết luận: Khi các lớp phụ thuộc hay ràng buộc lẫn nhau khi thay đổi ứng dụng, bảo trì hoặc nâng cấp thay vì thay đổi nhỏ ta phải kéo theo sự thay đổi với các lớp liên quan điều này rất phản khoa học trong thiết kế phần mềm đúng không nào 😀
2. **Loose-coupling** là gì? Ngược lại với Tight-coupling thì Loose-coupling là khuyến khích việc thiết kế các lớp có vai trò riêng biệt và giảm sự liên quan lẫn nhau trong chương trình.
	- Ví dụ: Bây giờ nghĩ về việc mặc quần áo vào buổi sáng hay buổi tối tùy bạn. Bạn không thích màu xanh? Không có vấn đề gì, bạn có thể lấy một chiếc áo đỏ thay thế. Bạn có thể làm điều này một cách dễ dàng vì chiếc áo không thực sự kết nối với cơ thể của bạn giống như làn da của bạn. Chiếc áo không biết hoặc quan tâm đến cơ thể nó đang được mặc vào. Nói cách khác, bạn có thể thay đổi quần áo mà không thực sự thay đổi cơ thể.
	- Điểm mấu chốt số 2: Nếu bạn thay áo, thì bạn không bị buộc phải thay đổi cơ thể – khi bạn có thể làm điều đó, thì bạn có liên kết lỏng lẻo. Khi bạn không thể làm điều đó, thì bạn có liên kết chặt chẽ.
	- Kết luận: Liên kết lỏng lẻo giúp cho các lớp làm việc độc lập, có tranh nhiệm rõ ràng và khi cần nâng cấp bảo trì chúng ta cần kế thừa, thêm interface hoặc mở rộng lớp code mà không thay đổi code cũ.

# Ví dụ thực tế cho 2 khái niệm và cách làm giảm sự liên kết phụ thuộc (**Loosely coupled**)
Ví dụ khi bạn làm việc với đầu vào đầu ra thì khi chúng ta đọc lưu dữ liệu vào cơ sở dữ liệu, code chúng ta không cần quan tâm ta lưu gì vì lớp lưu vào cơ sở dữ liệu đã có các lớp đảm nhận, tương tự như xuất dữ liệu đầu ra ta cũng không quan tâm xuất ra dữ liệu gì vì xuất ra file Excel sẽ có lớp Export Excel đảm nhận, xuất ra CSV sẽ có lớp Export CSV đảm nhận. Luồng làm việc ta chỉ việc gọi các hàm lưu dữ liệu, xuất dữ liệu và tùy vào yêu cầu người dùng mà thao tác chọn lớp thực hiện cho phù hợp. Ok qua code sẽ dễ hiểu hơn cho mọi người nà 😀
Đầu tiên là ví dụ cho Tight-coupling nhé khi làm việc các lớp phụ thuộc được tiêm trực tiếp và trở thành một thuộc tính quan trọng trong một lớp và khi muốn thay đổi code sẽ dẫn đến một cơ số rắc rối kéo theo :v Ở đây là nhóc tì ExportCSV đã tham gia vào lớp ExportData vậy là cậu ta phụ thuộc rồi, Export được khởi tạo thì cậu ta mới khởi tạo theo.

![](https://images.viblo.asia/e0abe62c-d01d-4bd9-895b-5b93625fc1fd.png)

Như mọi người thấy ở trên thì lớp ExportCSV liên kết với ExportData và bây giờ khi yêu cầu thay đổi xuất JSON thay cho CSV thì giải quyết sao đây mọi người? Khi đó chúng ta sẽ làm giảm sự phụ thuộc loosely coupled vì bây giờ lớp ExportCSV sống chết mặc bây rồi nó tồn tại khi ExportData tồn tài mà 😀

![](https://images.viblo.asia/9ad11d0d-a534-4041-8e0d-6cfc4a90fa57.png)

Ok bây giờ ta thêm một interface để chỉ quan tâm phương thức thực hiện mà không cần biết chi tiết thực hiện của nó, nhưng yêu cầu bây giờ là xuất định dạng JSON mà sao interface lại định nghĩa một lớp ExportCSV thế kia. À thì ra lúc này chính là lúc tùy vào yêu cầu người dùng mà ta tiêm vào hay đứa vào các lớp phụ thuộc cho chương trình chạy ngon nghe hơn nè.

![](https://images.viblo.asia/1293d2f9-016e-4307-9907-78f6bc4d8782.png)

Khi đó tùy vào nhu cầu nghiệp vụ mà ta sẽ có các lớp export tương ứng và các lớp này sẽ implements Interface IExport có nhiệm vụ là Export. Khi đó lớp ExportData chỉ nhận nhiệm vụ xuất dữ liệu mà không cần quan tâm xem nó xuất JSON hay CSV mà việc này dó chúng ta tiêm các lớp ràng buộc logic vào. Thêm nữa khi mọi người nhìn code bên trên sẽ thấy tương đối dài dòng khi khai báo này nọ đó là lý do các Design Pattern ra đời và Factory Method sẽ giúp chúng ta giải quyết vấn đề tùy vào yêu cầu mà tạo một đối tượng có lớp thích hợp (Mình sẽ đề cập trong Series Design Pattern hen :D). Ok trên đây là các khái niệm Tight-coupling, Loose-coupling cũng như cách làm giảm sự phụ thuộc giữa các lớp Loosely coupled trong lập trình hướng đối tượng. Nếu mọi người không hiểu chỗ nào cữ bình luận mình sẽ giải đáp nhé. Bên dưới là link tham khảo cho bài viết, cảm ơn mọi người đã theo dõi đến đây ^^ Cảm ơn mọi người nhiều!

Tài liệu tham khảo:
1. https://stackoverflow.com/questions/2832017/what-is-the-difference-between-loose-coupling-and-tight-coupling-in-the-object-o#targetText=Tight%20coupling%20is%20when%20a,than%20having%20its%20own%20class.
2. https://gociter.wordpress.com/2019/09/18/spring-oi-minh-hoc-tu-dau-the-phan-2-tight-coupling-loose-coupling-va-loosely-coupled-nen-tang-ly-thuyet-cho-ioc-va-di/