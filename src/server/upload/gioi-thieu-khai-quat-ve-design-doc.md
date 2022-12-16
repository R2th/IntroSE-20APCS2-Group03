Nguồn bài viết : [残業も減らせる!? 上級エンジニアになるためのDesign Doc超入門](http://www.atmarkit.co.jp/ait/articles/1606/21/news016.html)

Trong bài viết lần này tác giả sẽ giải thích về「Design Doc」, một loại tài liệu nhìn từ góc nhìn kĩ thuật đã nhận được nhiều sự chú ý từ những năm 2000.
Đối tượng của bài viết chủ yếu sẽ là những kĩ sư đã có 1 số kinh nghiệm về lập trình ở bậc sơ cấp đến trung cấp, tuy nhiên chưa có kinh nghiệm viết specification document.

# Design Doc là loại document như thế nào?
Design Doc là một loại specification document được sử dụng ở những công ty công nghệ hàng đầu, tiêu biểu là Google. Nó không chỉ đơn giản là phương pháp viết document mà còn bao gồm cả việc sử dụng document đó sau khi được viết ra, liên quan đến cả cách vận hành phát triển dự án. 

Vì nó rất phù hợp với cách phát triển software hiện đại như Agile nên Document Doc được sử dụng rộng rãi ở các start up ở thung lũng Silicon, nhưng theo tác giả thấy thì lại chưa được phổ biến lắm ở Nhật Bản.

Design Doc là loại document viết ra để giải thích các điểm quan trọng của thiết kế software khi kĩ sư chuẩn bị cho việc phát triển, bao gồm : làm gì (What), làm để làm gì (Why), làm như thế nào (How). Điều quan trọng ở đây là cần viết ra các điểm quan trọng và chỉ vậy thôi chứ không viết chi tiết hơn. Bở vì với phong cách phát triển hệ thống hiện đại thì nếu muốn biết thông tin chi tiết thì nên xem source code sẽ nhanh hơn.

Design Doc cần được viết với ngôn ngữ tự nhiên để ai cũng có thể đọc được. Các loại biểu đồ, chart có thể dùng được song chỉ là để bổ sung, làm rõ ý cho đoạn văn viết. Bởi vì nếu chỉ có biểu đồ và hình ảnh thì sau một thời gian nhìn lại tài liệu sẽ trở nên khó hiểu và không biết được ý nghĩa chính xác của tài liệu nữa. Văn bản thì luôn có tính chính xác cao về truyền đạt thông tin.

##  Là loại document giúp ích rất nhiều cho cách suy nghĩ
Đối tượng độc giả đầu tiên của Design Doc chính là bản thân kĩ sư. Tất nhiên nó cũng có vai trò chia sẻ thông tin với các bên liên quan giống như các loại document khác, song hơn thế nó có giá trị rất lớn như một công cụ suy nghĩ đối với bản thân kĩ sư thiết kế.

Thiết kế hệ thống là một công việc phức tạp và tốn nhiều thời gian, cần phải xem xét nhiều yếu tố liên quan, giải quyết các vấn đề, quyết định specs đối với từng vấn đề đó…Bộ não con người rất khó có thể xử lí toàn bộ những vấn đề phức tạp đó trong một lần suy nghĩ nên thường sẽ cần phải phân tích ra rồi giải quyết xem xét từ từ từng vấn đề một.

Bởi vậy Design Doc cũng rất phù hợp như là một công cụ cho việc giải quyết các vấn đề trên bởi nó là loại document sống, thường xuyên thay đổi. Chúng ta có thể viết hết ra những ý tưởng mới suy nghĩ được ngang chừng rồi sau đó sửa chữa và hoàn thành.

## Thích hợp với phong cách phát triển hiện đại
Với loại phát triển lặp lại như Agile, hay những team không tập trung ở 1 nơi mà phân tán ở nhiều nơi thì Design Doc sẽ phát huy hiệu quả rất cao.

# Chuẩn bị trước khi viết Design Doc
Hiếm có trường hợp nào mà có thể bắt tay vào viết ngay được Design Doc, bởi thông thường cần có sự chuẩn bị trước như là hiểu về requirement specs, hiểu về các yếu tố kĩ thuật và môi trường cho việc phát triển…

## Hiểu rõ requirement specs
Mục đích của thiết kế software là làm rõ phương pháp để đạt được yêu cầu mà requirement specs đưa ra nên bược đầu tiên là cần phải hiểu thật rõ requirement specs. Trường hợp không thể hiểu hết nếu chỉ đọc document thì cần phải có các cuộc họp với bên liên quan để làm rõ các vấn đề chưa hiểu. Chỉ cần hiểu rõ, hiểu sâu requirement thì sau này việc thiết kế sẽ trở nên đơn giản. 

# Viết Design Doc
Việc đầu tiên là cần viết tên và mục tiêu, mục đích của hệ thống.
## Mục tiêu và mục đích
Mục tiêu và mục đích cần được viết rõ ràng, tránh những cách viết mơ hồ bởi sau này khi phát triển nếu có điểm không rõ thì khi xem lại sẽ quyết định được cách giải quyết mà không tốn nhiều thời gian. Có thể viết theo dạng mục tiêu mục đích của hệ thống là…, không bao gồm các chức năng…để tránh gây hiểu nhầm.

## Viết về bối cảnh
Nếu có thể thì nên viết tại sao lại phát triển hệ thống này để người đọc có thể hiểu sâu hơn về ý tưởng của tài liệu thiết kế.

## Overview về hệ thống
Đây là phần nội dung thiết kế cụ thể. Cấu trúc sẽ được viết theo nguyên tắc đi từ toàn thể đến bộ phận.

Đầu tiên là khái quát về toàn thể hệ thống, cần viết ra đơn vị cao nhất của hệ thống, tiếng Anh gọi là High-Level Architecture, nếu có thêm biểu đồ cấu trúc hệ thống, biểu đồ class…thì sẽ dễ hiểu hơn.

## Viết thiết kế cho các bộ phận của hệ thống

Chúng ta sẽ viết thiết kế cho từng bộ phận của hệ thống theo từng mục riêng biệt. Cần viết mục tiêu, cấu trúc data, algorithm, interface cho từng mục. Nếu cần thiết thì thêm vào các chart hay các đoạn code tương tự cho dễ hiểu. Hơn nữa cần thêm vào lí do tại sao lại thiết kế như vậy, lí do của việc quyết định thiết kế như vậy để giúp những người đọc khác hiểu được.

Hơn nữa khi quyết định các mục trong tài liệu thiết kế thì cần đi theo một nguyên tắc nhất quán, thường thấy như là chia theo chức năng hoặc chia theo module, màn hình.

## Các mục khác
Phương châm test, library, API, tài liệu tham khảo…tóm lại là những mục cần thiết cho việc đạt được mục tiêu của dự án cũng nên được viết vào.
## Lưu vào repository hoặc cloud để chia sẻ 
Khi đã hoàn thành xong document thì hãy chia sẻ với cả team để nhận review, từ đó có thể tránh được những thiếu sót và có thể có thêm được những ý tưởng hay.

## Point khi viết Design Doc
Không chỉ kết quả mà lí do, bối cảnh cũng quan trọng.
　
 
Khác với những loại document khác chỉ chú trọng vào nội dung thiết kế, Design Doc còn chú trọng cả lí do, bối cảnh dẫn đến thiết kế đó (làm gì, làm như thế nào, tại sao). Ngược lại Design Doc không quá chú trọng đến những mục như interface chi tiết cho code level hay định nghĩa chi tiết database.

## Design Doc là một cặp (pair) với source code
Design Doc hướng tới việc phát huy hiệu quả cao nhất khi pair với source code. Vì vậy nếu nội dung Design Doc chỉ ở mức source code hoặc comment thì sẽ không có ý nghĩa mà cần phải viết những nội dung khó truyền đạt qua source code vào Design Doc.

Những thông tin nhỏ, thông tin chi tiết thì chỉ cần source code và comment là đủ. Còn Design Doc thì cần viết những thông tin ở mức độ lớn hơn như là ý đồ, bối cảnh của hệ thống, tính liên quan đến những module, hệ thống khác…

## Không cần viết những đoạn văn dài
Design Doc không phải là tác phẩm văn học nên không cần những đoạn văn dài mà chỉ cần phân chia các mục hợp lí, cách dòng dễ đọc, đoạn văn đơn giản dễ hiểu là đủ.

Tuy nhiên chỉ viết ra những keyword mà đọc vào không hiểu thì cũng không được. Lý tưởng là những đoạn văn bản đọc vào là hiểu và không có chỗ nào bị thừa.

## Design Doc không phải là loại tài liệu chỉ để xem mà nó sẽ được ứng dụng trong phát triển dự án
　
Design Doc sẽ phát huy hiệu quả khi được đặt vào phát triển dự án, dưới đây tác giả sẽ giải thích về cách sử dụng và các điểm quan trọng khi áp dụng Design Doc vào phát triển dự án.

### Sử dụng trong trường hợp nào
Design Doc không dùng cho các dự án phát triển quy mô nhỏ của bản thân dự kiến xong trong vòng 2 đến 3 ngày, mà dành cho các dự án có quy mô lớn hơn, liên quan đến nhiều người hơn.
　
### Viết khi nào
　
Design Doc được viết sau khi requirement đã được quyết định và trước khi bắt đầu bước vào phase thực hiện.  Việc viết Design Doc thường mất khoảng 1 đến 2 tuần. Nếu mất nhiều thời gian hơn thế thì có nghĩa là một người không thể viết hết được mà nên chia ra để các kĩ sư khác cùng viết.

### Quản lí như thế nào
　
Design Doc cần được quản lí theo dạng version, có thể tạo bằng Markdown rồi để chung với source code ở Git hay tạo bằng Google Doc. Tóm lại là cần phải là tài liệu mà tất cả member bất cứ lúc nào đều có thể xem và sửa được.

### Luôn update thông tin mới nhất
　
Trong quá trình phát triển sẽ phát sinh những thay đổi nên cũng cần chỉnh sửa lại Design Doc, trừ những trường hợp khẩn cấp thì nên giữ nguyên tắc nếu Design Doc chưa được chỉnh sửa thì cũng không chỉnh sửa code.

### Lấy làm tài liệu bắt buộc để review code
Tại Google khi review code thì nhất định cần có cả Design Doc. Người review đầu tiên sẽ đọc Design Doc rồi mới review code. Cách làm này sẽ giúp cho việc phát triển hệ thống đạt được chất lượng cao.

### Giúp lên kế hoạch test 
　Nếu có Design Doc thì sẽ có thể tạo testcase song song với việc phát triển. Ít nhất thì cũng có thể estimate được những mục cơ bản như cần test như thế nào, trong bao lâu…

### Giúp tạo user manual
　Nếu có Design Doc thì có thể tạo user manual, tài liệu PR song song với việc phát triển. Bằng cách đó hoạt động marketing của team quảng bá sẽ được thực hiện sớm hơn.

# Ý nghĩa của việc thiết kế software

## Thiết kế là gì
Việc thiết kế từ trước đến nay không thay đổi, đó là quyết định cấu trúc dữ liệu, interface, thuật toán để đạt được mục đích của hệ thống.
　
 Ngôn ngữ lập trình hay môi trường phát triển có thể thay đổi theo thời gian nhưng những mục cơ bản trong thiết kế được nói ở phía trên thì không đổ. Vì vậy chỉ cần có được chúng thì có thể sử dụng được ở rất nhiều trường hợp mà tác giả sẽ giải thích dưới đây.

### Thiết kế cấu trúc dữ liệu
　Là việc quyết phương pháp cách thức lưu dữ liệu của hệ thống như dạng của biến số, cấu trúc class khi áp dụng hướng đối tượng, schema và file format của database…

### Thiết kế thuật toán
　Là việc quyết định phương pháp, cách thức lập trình khi access vào cấu trúc data phía trên để thực hiện gửi, trao đổi tính toán…Hơn nữa có thể chia thuật toán thành 2 loại là thuật toán xử lí và thuật toán giới hạn cho dễ hiểu
#### Thiết kế thuật toán xử lí
Là việc quyết định các step tính toán khi nhập và xuất dữ liệu. Có thể dùng flowchart hoặc UML activity chart để giải thích. Khi phát triển thì sẽ quyết định  hình thức API, function, method.
#### Thiết kế thuật toán giới hạn
Là việc quyết định thời điểm và trình tự thực hiện của thuật toán phía trên : thực hiện khi nào, với điều kiện gì…Có thể dùng timing chart hay biểu đồ di chuyển trạng thái song gần đây cùng với việc sử dụng application framework tăng lên thì việc lựa chọn framework hay middleware cũng là 1 công việc nằm trong thiết kế.
### Thiết kế interface
　
Là việc quyết định specs cho các phần trong và ngoài của hệ thống. Ví dụ như interface về protocol truyền thông tin giữa device node của Web API và BLE, hay interface call object ở ngôn ngữ lập trình hướng đối tượng.
　

User interface cũng là 1 loại interface, cần được quyết định về layout màn hình hay phương pháp thao tác trên màn hình.


# Tổng kết
Trong bài viết này tác giả đã giải thích về Design Doc và cách viết, cách ứng dụng trong phát triển dự án, cũng như giải thích về ý nghĩa của việc thiết kế software.
　

Nếu có thể viết được Design Doc thì sẽ tăng tốc độ cho việc phát triển, giúp việc communication trong team dễ dàng hơn và giảm những hiểu nhầm không cần thiết từ đó dẫn đến giảm được việc làm thêm giờ, đem lại lợi ích cho dự án.