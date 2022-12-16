# 1. SOLID là gì
Thử tưởng tượng bạn đang ở trong một thư viện sách. Bạn muốn tìm một cuốn sách nào đó. Nếu như thư viện được sắp xếp gọn gàng, phân loại sách tốt thì bạn sẽ dễ dàng tìm được cuốn mình cần. Ngoài ra, nếu như thư viện mà được thiết kế nội thất tốt, bạn sẽ có hứng thú hơn khi đọc sách.

Cũng giống như ví dụ trên, khi bạn xây dựng một ứng dụng, bạn phải biết cách viết code và tổ chức sao cho gọn gàng, dễ đọc. Đặc biệt với dự án đặc thù khách hàng thay đổi yêu cầu liên tục thì việc này lại càng trở nên quan trọng hơn. 

S.O.L.I.D là bộ quy tắc viết code được phát minh bởi Robert C. Martin (Uncle Bob). Khi bạn ứng dụng bộ quy tắc này vào dự án, đảm bảo mã nguồn của bạn sẽ cực kỳ “clean” luôn.

Vậy SOLID là gì?<br>
SOLID là một bộ quy tắc gồm 5 nguyên lý:<br>
- S — Single Responsibility Principle<br>
- O — Open Closed Principle<br>
- L — Liskov Substitution Principle<br>
- I — Interface Segregation Principle<br>
- D — Dependency Inversion Principle<br>

Bây giờ chúng ta cùng đi vào từng nguyên lý và cách sử dụng nó trong Android như thế nào nhé :3

# 2. Single Responsibility Principle (SRP)
Nguyên lý đầu tiên tương ứng với chữ S có nội dung là:<br>
> A class should have one and only one reason to change

<br>
Giống như tên gọi, mỗi một class/module chỉ thực hiện một chức năng. Nếu class của bạn có nhiều hơn 1 nhiệm vụ, hãy tách các function đó sang 1 class khác.

Để hiểu hơn về nguyên lý này, chúng ta cùng xem xét một số ví dụ sau:<br><br>
![](https://images.viblo.asia/daa9810c-7b69-4658-a5cb-bc3b40ce013f.JPG)<br>
Ở đây, class Student có 2 nhiệm vụ là lưu trữ, và xuất thông tin của sinh viên<br>
Do đó, chỉ cần ta thay đổi DB, thay đổi cách xuất kết quả, … ta sẽ phải sửa đổi class này. Càng về sau class sẽ càng phình to ra. 
Theo đúng nguyên lý, ta phải tách class này ra làm 2 class riêng. Tuy số lượng class nhiều hơn nhưng việc sửa chữa sẽ đơn giản hơn, class ngắn hơn nên cũng ít bug hơn.

Best solution

![](https://images.viblo.asia/12b5074d-b62b-4ff5-beaf-cf678b132d43.JPG)

Một ví dụ khác về 1 class Adapter với các logic được implement trong onBindViewHolder như sau:

![](https://images.viblo.asia/56e6db61-40db-4484-a08c-dcbf78c730a3.JPG)

Cách viết code này đã vi phạm nguyên lý của SOLID.
Hàm onBindViewHolder() chỉ nên làm một nhiệm vụ duy nhất là thiết lập dữ liệu để hiển thị ra view thôi, không xử lý bất kì logic nào cả.
# 3. Open-Closed principle (OCP).
> Objects or entities should be open for extension but closed for modification

<br>
Theo nguyên lý này, mỗi khi ta muốn thêm chức năng, ... cho chương trình, chúng ta nên viết class mới mở rộng class cũ ( bằng cách kế thừa hoặc sở hữu class cũ), không khuyến khích việc sửa đổi class cũ.

Ví dụ cho nguyên tắc OCP:<br>
Bad code

![](https://images.viblo.asia/13cc9cb5-b1b6-4f0c-afb5-bed4bc532703.JPG)

Better Solution

![](https://images.viblo.asia/fe7f6004-6502-4d78-ba2c-298357e86aed.JPG)

Trong ví dụ này, chúng ta tập trung vào việc mở rộng các function bằng cách sử dụng interface. <br>Trong đoạn code đầu tiên, giả sử chúng ta có thêm 1 đối tượng nữa là Square thì trong class AreaManager cần tạo thêm function là getSquareArea với param truyền vào là Square. Cứ như thế class AreaManager sẽ phình to lên rất nhiều.<br>
Thay vào đó chúng ta chỉ cần tạo class Square implement Shape và overriding function getArea().
# 4. Liskov Substitution Principle (LSP)
Nguyên lý thứ ba, tương ứng với chữ L trong SOLID. Nội dung nguyên lý:
> Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.

<br>
Trong đó nói rằng các lớp con  có thể thay thế cho các lớp cha mà không làm thay đổi tính đúng đắn của chương trình. Ví dụ: nếu MySubclass là một lớp con của MyClass, bạn sẽ có thể thay thế MyClass bằng MySubclass mà không làm hỏng chương trình.

Nghe có vẻ khó hiểu nhỉ? Mình sẽ lấy một ví dụ để làm rõ hơn về nguyên lý này nhé.

![](https://images.viblo.asia/38e6916d-8c91-41c1-9626-d5ff49527d8b.JPG)

Chúng ta có class Bird có hai hành vi là kêu và bay, class Eagle và Penguin kế thừa class Bird. Thoạt nhìn thì không có vấn đề gì, tuy nhiên chim cánh cụt thì lại không bay được nên việc overriding phương thức fly() trong class Penguin sẽ vi phạm nguyên lý LSP

Better Solution

![](https://images.viblo.asia/e95c7865-8237-49d8-bba4-9fe8fb17575d.JPG)

# 5. Interface Segregation Principle — ISP
> Many client-specific interfaces are better than one general-purpose interface

<br>
Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể

Nguyên lý này khá dễ hiểu. Hãy tưởng tượng chúng ta có 1 interface lớn, khoảng 100 methods. Việc implements sẽ khá cực khổ, ngoài ra còn có thể dư thừa vì 1 class không cần dùng hết 100 method. Khi tách interface ra thành nhiều interface nhỏ, gồm các method liên quan tới nhau, việc implement và quản lý sẽ dễ hơn.

Ví dụ cho nguyên lý này. Chúng ta có interface ComicsDataSource có các function như sau:

![](https://images.viblo.asia/35eb3cfd-39b7-485e-9976-8d4492ae8f83.JPG)

Dễ dàng thấy, các function trong interface này chia thành 2 nhóm chức năng là xử lý dữ liêu ở Local và xử lý dữ liệu ở Remote. Nếu viết code như thế này thì dưới Local khi implementation interface ComicsDataSource, nó sẽ overriding cả các function ở Remote lẫn Local như thế này.

![](https://images.viblo.asia/10e730a9-49a8-494b-8914-1d9c04f73269.JPG)

Điều này thật không hợp lí. Giải pháp ở đây là nên tách interface ComicsDataSource thành 2 interface nhỏ tương ứng với hai nhóm chức năng như sau:

![](https://images.viblo.asia/c7849e39-d0db-4fce-b696-b5a72028c30d.JPG)

# 6. Dependency Inversion Principle — DIP
> High-level modules should not depend on low-level modules. Both should depend on abstractions.
> Abstractions should not depend on details. Details should depend on abstractions.

<br>
Ý nói là các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction. Ngoài ra, interface(abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại.
(Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation)<br><br>
Nếu bạn đã sử dụng mô hình MVP thì có thể đã sử dụng nguyên lý này. Bạn có một Interface giúp chúng ta kết nối các class. Tức là, các UI class không cần quan tâm đến logic được implement trong Presenter như thế nào.
<br>
Ví dụ bằng code nhé.<br>

![](https://images.viblo.asia/558dc4d2-b342-4388-bd59-f36c69ce7073.JPG)
![](https://images.viblo.asia/0fcbf968-bac7-4281-800e-d97d555250c6.JPG)

Chúng ta có interface là Presenter có các function liên quan đến việc CRUD Note. class NotePresenter implementation interface Presenter sẽ triển khai tất cả các function trong interface đó. Trong NoteFragment khi muốn thực hiện các thao tác CRUD chỉ cần gọi thông qua tên function trong interface Presenter. Vì vậy, nếu bạn có phải thay đổi logic bên trong Presenter thì UI cũng không biết, không cần phải thay đổi code vì điều đó.
# 7. Tổng kết
Chúng ta vừa cùng nhau tìm hiểu qua 5 nguyên lí của SOLID. Tóm gọn lại, những nguyên tắc này sẽ giúp chúng ta: viết code trong sáng hơn, rõ ràng hơn, các module hệ thống tách bạch hơn, phần mềm sẽ dễ dàng kiểm thử, bảo trì và mở rộng hơn.

Trên đây là những hiểu biết cơ bản của mình về SOLID. Hi vọng đã cung cấp cho các bạn những thông tin bổ ích!
# 8. Tài liệu tham khảo
https://docs.microsoft.com/en-us/archive/blogs/cdndevs/the-solid-principles-explained-with-motivational-posters