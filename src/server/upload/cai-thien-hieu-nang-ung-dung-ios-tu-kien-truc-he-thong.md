Chất lượng code phụ thuộc vào một số yếu tố như dễ đọc, độ chính xác, hiệu suất, v.v. Nếu bạn nghĩ rằng thời gian là điều quan trọng nhất trên thế giới, thì hiệu suất là một yếu tố  không thể bị đánh giá thấp.
Dự án ngày càng phát triển số lượng code càng nhiều, bạn có thể bị ảnh hưởng rất lớn bởi thời gian biên dịch hoặc hiệu suất ứng dụng.

# Sử dụng Use Protocol Oriented Programming thay vì Object Oriented Programming

Nếu bạn xem code những thư viện chuẩn của swift, bạn có thể nhận ra rằng Protocols được sử dụng thường xuyên. Apple thích Protocol Oriented Programming và khuyên bạn nên sử dụng nó. 
Bạn có thể đọc thêm tài liệu chính thức của Apple về phần này
https://developer.apple.com/documentation/swift/choosing_between_structures_and_classes

![](https://images.viblo.asia/d1ebe4e9-4fee-49a9-b788-d65f951f8573.png)


Mô hình OOP giải quyết vấn đề phức tạp trong ứng dụng bằng cách sử dụng tính kế thừa và tính đa hình là phần hữu ích nhất. Trong khi chương trình đang chạy, trong thời gian chạy, nó sẽ quyết định tham số hoặc phương thức nào nên được gọi. Quá trình quyết định này được gọi là Dynamic Dispatch.
Ảnh chụp màn hình ở trên là một ví dụ nhỏ về OOP. Chúng ta biết rằng lớp B có một phương thức echo với từ khóa override vì nó đã được định nghĩa trong lớp cha là lớp A. Và khi chúng ta gọi phương thức echo trong lớp B, phương thức echo được ghi đè trong lớp B gọi, không phải lớp A.
Mọi thứ trông rất tuyệt, phải không? Thực ra là không, vì mỗi quá trình được thực hiện trong thời gian chạy, như trong ví dụ trên, làm chậm thời gian thực thi của chúng ta. Vậy giải pháp là gì?
Sử dụng protocol

![](https://images.viblo.asia/5b7f91e4-5d6c-423e-9587-5bdde4f93c35.png)

POP là viết tắt của Protocol Oriented Programmings. Chúng tôi đã giảm tính toán thời gian chạy chỉ với một sửa đổi nhỏ. Việc sử dụng POP đã quá quen thuộc phải không? Đó là mẫu ủy quyền được sử dụng nhiều của Apple trong UIKit.

# Xử dụng Static Dispatch
Trong khi đọc tài liệu của Apple, bạn có thể thấy giai đoạn "“use structs over classes”" rất nhiều. Cả struct và class đều có cấu trúc giống nhau, ngoại trừ struct là kiểu giá trị, trong khi các class là kiểu tham chiếu. Có vẻ như đó chỉ là một sự khác biệt nhỏ. Trên thực tế không phải là nhỏ!

Do sự khác biệt đó, nếu bạn tạo một đối tượng từ một lớp, nó sẽ được cấp phát động nhưng các đối tượng struct được cấp phát tĩnh. Chỉ giải thích một cách khác, các đối tượng được tạo tĩnh được tạo trong thời gian biên dịch trong Stack với kích thước cố định trong khi các đối tượng được tạo động được tạo trong thời gian chạy trong Heap. Kích thước của chúng được tính toán và cấp phát bộ nhớ cần thiết trong thời gian chạy. Do đó, các phương thức được gọi từ đối tượng lớp hoạt động với điều phối động, trong khi đối tượng struct cũng hoạt động với điều hướng tĩnh.
Tóm lại, sử dụng struct kết hợp với protocol thay vì sử dụng kế thừa của class.

> NOTE: 
> Có phải các struct được cấp phát tĩnh trong khi các lớp được cấp phát động. 
> Nhưng điều gì sẽ xảy ra nếu một lớp chứa một tham số là một kiểu struct? 
> Liệu tham số struct vẫn được cấp phát tĩnh và được tạo trên Stack? 
> 
> Câu trả lời là không! Mặc dù đó là kiểu cấu trúc, nhưng vùng chứa của nó là một lớp nên tham số được cấp phát trong Heap với điều phối động.
# Kiểm tra các cấp độ truy cập( Access Levels)
Cho đến khi chương trình đang chạy, một phương thức được gọi và quyền truy cập tham số sẽ không được xác định cho một đối tượng được tạo từ một lớp. Do đó, khi bạn nhấp vào nút chạy trong Xcode, trình biên dịch sẽ biên dịch mã của bạn và xác định việc phân bổ bộ nhớ và quan hệ giữa các phương thức và truy cập tham số, tức là sử dụng đa hình. Và nếu trình biên dịch nhận thấy rằng một phương thức hoặc tham số không được truy cập bên ngoài, và gán cho phương thức hoặc tham số đó key final
Nếu bạn biết rằng một lớp không phải là cơ sở của bất kỳ lớp nào, bạn nên thêm key final vào định nghĩa lớp. Trong khi thêm final vào một lớp, bạn thêm final cho tất cả các tham số và phương thức trong lớp.

Giả sử bạn có một lớp cần được ghi đè. Do đó lớp này không thể có từ khóa cuối cùng. Vì vậy, bạn có thể thêm key private cho tất cả các tham số và phương thức không được truy cập trong các lớp con.


# Kết

Mọi người nên đọc thêm những thông tin chính thức từ Apple để có thêm nhiều thông tin hữu ích trong quá trình phát triển dự án về iOS
https://developer.apple.com/swift/blog/?id=27