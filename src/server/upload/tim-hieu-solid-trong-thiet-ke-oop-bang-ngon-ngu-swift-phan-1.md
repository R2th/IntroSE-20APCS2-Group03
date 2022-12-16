# Mở đầu
Hẳn chúng ta đã rất quen thuộc với lập trình hướng đối tượng OOP với 4 tính chất căn bản :Trừu tượng - Đóng gói - Kế thừa - Đa hình. Tuy nhiên việc áp dụng vào thực tế để xây dựng cấu trúc ứng dụng gây cho lập trình viên không ít khó khăn. Bài toán đặt ra là làm sao để có thể xây dựng được hệ thống có khả năng mở rộng và bảo trì dễ dàng, tránh việc đập đi xây lại sau một thời gian phát triển. Vì vậy cần phải có 1 bộ nguyên tắc để các lập trình viên có thể dễ dàng áp dụng giúp xây dựng nên cấu trúc nhất quán và dễ dàng phát triển, đó là lý do SOLID ra đời.

Trong bài viết này, chúng ta sẽ cùng tìm hiểu những khái niệm cơ bản của bộ nguyên tắc SOLID để có cái nhìn khái quát. Các bài viết sau, chúng ta sẽ cùng tìm hiểu cụ thể hơn từng nguyên tắc thông qua những ví dụ cụ thể bằng ngôn ngữ Swift.
# Khái quát về SOLID
### Single responsibility principle: Nguyên tắc đơn nhiệm

> In the context of the Single Responsibility Principle (SRP) we define a responsibility to be “a reason for change.” If you can think of more than one motive for changing a class, then that class has more than one responsibility. - Bob Martin

Nguyên tắc đơn nhiệm phát biểu rằng: mỗi class hay module chỉ nên có một và chỉ một chức năng (a.ka. chịu trách nhiệm cho một việc) và phải được đóng gói hoàn toàn bởi class đó. Tất cả các services của nó phải được liên kết chặt chẽ với trách nhiệm đó. Thường thì nguyên tắc này rất dễ bị vi phạm, kiểu như một class User chịu trách nhiệm cho rất nhiều việc trong ứng dụng, từ validate email cho tới đăng nhập, gửi email v.v. Những class làm quá nhiều việc khác nhau như vậy thường được gọi là god object.

Nguyên tắc này lần đầu được giới thiệu bởi Robert C. Martin (Principles of Object Oriented Design). Trong đó, ông định nghĩa “responsibility” như là "một lý do để thay đổi", và kết luận rằng một class hoặc module nên có một, và chỉ có một, lý do để được thay đổi (tức là viết lại). Ví dụ, hãy xem xét một module có hai chức năng biên dịch và in thông báo. Hãy tưởng tượng một module như vậy có thể được thay đổi vì hai lý do. Đầu tiên, nội dung của báo cáo có thể thay đổi. Thứ hai, định dạng của báo cáo có thể thay đổi. Hai điều này thay đổi vì những nguyên nhân rất khác nhau; nội dung, và định dạng. Nguyên tắc đơn nhiệm chỉ ra rằng hai khía cạnh của vấn đề này thực sự là hai "responsibility" riêng biệt, và do đó nó cần phải ở trong các class hoặc module riêng biệt. Sẽ là một thiết kế tồi tệ nếu ghép đôi hai chức năng này vào trong 1 class hoặc module, vì chúng có thể thay đổi vì những lý do khác nhau vào những thời điểm khác nhau.

Lý do quan trọng để giữ một class tập trung vào một trách nhiệm duy nhất là làm cho class đó độc lập hơn. Tiếp tục với ví dụ trên, nếu có sự thay đổi trong quá trình biên dịch thông báo, có nguy cơ lớn là thông báo in ra sẽ bị lỗi hoặc không giống như kỳ vọng trước đó nếu nó là một phần của cùng một lớp.

### Open/closed principle: Nguyên tắc đóng/mở

> Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

Nguyên tắc này có thể được hiểu rằng: các class, module hoặc hàm nên được thiết kế để có thể mở rộng, nhưng cần đóng lại để tránh sự thay đổi. Điều này có nghĩa là những thực thể đó có thể cho phép hành vi của nó được mở rộng mà không cần sửa đổi source code của nó. Việc này giúp các lập trình viên sau này có thể mở rộng các class có sẵn để cung cấp thêm chức năng thay vì chỉnh sửa trên mã nguồn tồn tại sẵn trong hệ thống.

Đối với những dự án lớn với lượng source code khổng lồ với đông đảo số người tham gia thì điều này cực kỳ quan trọng. Nó giúp cho những lập trình viên sau này cùng làm việc trên một code base không cần phải viết test lại cho code có sẵn và hạn chế tối đa side effects. Bởi vì đối với những code base lớn thì một thay đổi nhỏ cũng có thể gây ra hậu quả lớn.

### Liskov substitution principle: Nguyên tắc thay thế Liskov

> The Liskov substitution principle (LSP) states that objects should be replacable with instances of their subtypes without alterting the correctness of that program.

Khả năng thay thế là một nguyên tắc trong lập trình hướng đối tượng, cụ thể, nếu S là một subclass của T, thì đối tượng của kiểu T có thể được thay thế bằng các đối tượng kiểu S (tức là một đối tượng kiểu T có thể được thay thế bằng bất kỳ đối tượng nào được tạo ra từ S) mà không thay đổi bất kỳ thuộc tính mong muốn nào của chương trình.

Trong lập trình iOS chúng ta cũng thường xuyên áp dụng nguyên tắc này, cụ thể như việc implement cho một hàm yêu cầu truyền vào đối tượng có kiểu T thì hàm đó cũng có thể nhận đối tượng được tạo ra bởi S là subclass của T mà chúng ta không cần phải thay đổi gì trong code đã implement trước đó.

### Interface segregation principle: Nguyên tắc phân chia Interface

> The interface-segregation principle (ISP) states that no client should be forced to depend on methods it does not use.

Nguyên tắc phân chia Interface phát biểu rằng implementation của một interface không nên bị phụ thuộc vào những methods mà nó không dùng. Do đó thay vì dùng một interface lớn, ta nên tách chúng thành nhiều interface nhỏ, với nhiều mục đích cụ thể, tránh thừa methods cho các class implement nó.

Tác dụng của nguyên tắc này chúng ta có thể thấy rõ ràng trong công việc lập trình hàng ngày, nhất là đối với những dự án lớn, có những interface có vài chục, thậm chí cả trăm methods thì việc phân tách lại càng quan trọng. Vì nếu không tách ra thì những class implement nó sẽ phải implement toàn bộ methods trong interface trong khi thực tế nó chỉ cần vài methods trong đó.

### Dependency inversion principle

> The dependency inversion principle (DIP) states that high-level code should not depend on low-level code, and that abstractions should not depend upon details.

Nội dung của nguyên tắc này có 2 ý:

1. Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại. (Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation).

Để dễ hiểu thì code càng gần với ngôn ngữ máy hoặc làm những việc càng cơ bản thì gọi là low-level code (ví dụ: truy vấn trực tiếp database, đọc ghi xuống file, network v.v). Còn code nào xử lý logic và sử dụng các thư viện low-level thì được gọi là…high-level code.

Nguyên tắc này nói rằng, high-level code không nên phụ thuộc vào low-level code. Thay vào đó high-level nên phụ thuộc vào một abstraction mà hỗ trợ tương tác với low-level code đó, nhưng không được phụ thuộc chi tiết của low-level code đó.
# Kết luận
Trên đây chúng ta đã cùng nhau tìm hiểu 5 nguyên tắc SOLID, việc áp dụng SOLID giúp chúng ta xây dựng những hệ thống lớn, dễ mở rộng và bảo trì. Tuy nhiên, nó cũng sẽ gây cho những lập trình viên mới không ít khó khăn do tính trừu tượng trong khái niệm của nó và số lượng class, module, interface,... sinh ra tương đối lớn.

Trong các bài viết tiếp theo, chúng ta sẽ tìm hiểu cụ thể hơn từng nguyên tắc với những ví dụ cụ thể trong lập trình iOS bằng ngôn ngữ Swift.