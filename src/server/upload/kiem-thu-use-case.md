# 1. Use case là gì?

Use case là một tài liệu mô tả từ đầu đến cuối hành vi của hệ thống từ góc nhìn của người sử dụng. Use case mô tả sự tương tác đặc trưng giữa người dùng bên ngoài (Actor) và hệ thống. Mỗi Use case sẽ mô tả cách thức người dùng tương tác với hệ thống để đạt được mục tiêu nào đó. 

Sự tương tác ở đây có thể là:

* Người dùng tương tác với hệ thống như thế nào?

* Hoặc, hệ thống tương tác với các hệ thống khác như thế nào?

Ngoài ra, Use case cũng xác định trình tự các bước mô tả mọi tương tác giữa người dùng và hệ thống. Tuy nhiên, Use case được định nghĩa theo thuật ngữ của người dùng, không phải của hệ thống, mô tả những gì mà người dùng làm và người dùng nhìn thấy hơn là những gì đầu vào hệ thống mong đợi và đầu ra của hệ thống là gì.

Use case được sử dụng rộng rãi trong việc xây dựng kiểm thử ở cấp độ kiểm thử hệ thống hoặc kiểm thử chấp nhận.

# 2. Những thành phần của Use case

1. Brief description: Mô tả ngắn gọn giải thích các trường hợp

2. Actor: Người dùng hệ thống

3. Precondition: Là các điều kiện được thỏa mãn trước khi bắt đầu thực hiện

4. Basic flow: hay "Main Scenario" là những luồng cơ bản trong hệ thống. Đó là luồng giao dịch được thực hiện bởi người dùng để hoàn thành mục đích của họ. Khi người dùng tương tác với hệ thống, vì đó là workflow bình thường nên sẽ không có bất kì lỗi nào xảy ra và người dùng sẽ nhận được đầu ra như mong đợi.

5. Alternate flow: Ngoài workflow thông thường, hệ thống cũng có thể có workflow thay thế. Đây là tương tác ít phổ biến hơn được thực hiện bởi người dùng với hệ thống

6. Exception flow: Là các luồng ngăn cản người dùng đạt được mục đích của họ

7. Post conditions: Các điều kiện cần được kiểm tra sau khi hoàn thành.

# 3. Use case diagram

Use case diagram là một sơ đồ biểu diễn bằng hình ảnh về các hành vi của người dùng trong một hệ thống, cách người dùng tương tác với hệ thống. 

Nó chỉ ra luồng đi từ hoạt động này sang hoạt động khác trong một hệ thống. Nó đặc biệt quan trọng trong việc xây dựng mô hình chức năng của hệ thống và nhấn mạnh tới việc chuyển đổi quyền kiểm soát giữa các đối tượng người dùng (Actors)

Use Case Diagram gồm 5 thành phần chính:

* Actor

* Use Case

* Communication Link

* Boundary of System

* Relationships.

![](https://images.viblo.asia/b92938b4-deeb-439e-8abf-961bcbd9c978.jpg)

*Các thành phần có trong một Use Case Diagram*

# 4. Kiểm thử Use case là gì?

Kiểm thử Use case được định nghĩa là một kỹ thuật kiểm thử phần mềm, giúp xác định các test cases bao phủ toàn bộ hệ thống trên cơ sở chuyển giao từ điểm bắt đầu đến điểm kết thúc.

Ta có thể sử dụng Kiểm thử Use Case để tìm các liên kết còn thiếu sót hay các yêu cầu không hoàn chỉnh, từ đó tìm cách khắc phục, hệ thống sẽ hoạt động chính xác hơn.

Use case testing là một kỹ thuật kiểm thử chức năng của kiểm thử hộp đen, vì thế chúng ta sẽ không cần quan tâm đến code.

## 1. Một vài đặc điểm của Use case testing

* Use case testing không phải được thực hiện để quyết định chất lượng của phần mềm

* Use case testing không đảm bảo bao phủ được toàn bộ ứng dụng của người dùng

* Dựa trên kết quả kiểm thử từ Use case, chúng ta không thể quyết định việc triển khai môi trường của sản phẩm

* Nó sẽ giúp tìm ra được những lỗi từ kiểm thử tích hợp

## 2. Ví dụ về cách thực hiện Kiểm thử Use case

Một Actor được ký hiệu là "A" và System được ký hiệu là "S". Chúng ta tạo Use Case cho chức năng đăng nhập của ứng dụng web như dưới đây:

![](https://images.viblo.asia/e93a13b6-0d1f-492d-a750-e54cecb6b7b3.jpg)

![](https://images.viblo.asia/5521afbf-99a0-49f2-a9e7-f43f47159151.jpg)

* Xét bước đầu tiên của kịch bản cho chức năng đăng nhập của ứng dụng web, Actor nhập email và mật khẩu.

* Bước tiếp theo, hệ thống sẽ xác thực mật khẩu

* Nếu mật khẩu đúng, quyền truy cập sẽ được cấp

* Có thể có phần mở rộng của use case này. Trong trường hợp mật khẩu không hợp lệ, hệ thống sẽ hiển thị một thông báo và yêu cầu thử lại 4 lần

* Nếu nhập mật khẩu không hợp lệ 4 lần, hệ thống sẽ cấm địa chỉ IP.

# 5. Làm Use Case được lợi ích gì?

* Use Case giúp mọi người thể hiện được rõ Requirement theo góc nhìn của người dùng cuối. 

* Theo đó, những gì được thể hiện trong Use Case rất tự nhiên, dễ hiểu.

* Use Case có thể chia nhỏ phạm vi theo nhiều phân hệ, hoặc cụm tính năng. Và nó cũng có thể nhìn dưới góc độ high-level. Do đó, dễ hơn cho mình rất nhiều để cover đủ các yêu cầu trong một dự án lớn.

* Use Case là bước đệm tuyệt vời giữa việc mô tả tổng quát và mô tả chi tiết sự tương tác thông qua Sequence Diagram.

* Use Case được dùng để tạo các Epic, và các User Stories trong dự án Scrum, làm mọi thứ được nhất quán và rất chặt chẽ.

* Use Case còn được dùng để tạo các Test Case sau này.

***Bài viết được tham khảo từ nhiều nguồn tài liệu như: TutorialsPoint, Guru99***