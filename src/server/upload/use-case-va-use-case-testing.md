# Use case là gì?
Use case là một tài liệu mô tả từ đầu đến cuối hành vi của hệ thống từ góc nhìn của người sử dụng. Use case mô tả sự tương tác đặc trưng giữa người dùng bên ngoài (Actor) và hệ thống. Mỗi Use case sẽ mô tả cách thức người dùng tương tác với hệ thống để đạt được mục tiêu nào đó. 
Ngoài ra, Use case cũng xác định trình tự các bước mô tả mọi tương tác giữa người dùng và hệ thống. Tuy nhiên, Use case được định nghĩa theo thuật ngữ của người dùng, không phải của hệ thống, mô tả những gì mà người dùng làm và người dùng nhìn thấy hơn là những gì đầu vào hệ  thống mong đợi và đầu ra của hệ thống là gì.
## Những thành phần của Use case
1. Brief description: Mô tả ngắn gọn giải thích các trường hợp
1. Actor: Người dùng hệ thống
1. Precondition: Là các điều kiện được thỏa mãn trước khi bắt đầu thực hiện
1. Basic flow: hay "Main Scenario" là những luồng cơ bản trong hệ thống. Đó là luồng giao dịch được thực hiện bởi người dùng để hoàn thành mục đích của họ. Khi người dùng tương tác với hệ thống, vì đó là workflow bình thường nên sẽ không có bất kì lỗi nào xảy ra và người dùng sẽ nhận được đầu ra như mong đợi.
1. Alternate flow: Ngoài workflow thông thường, hệ thống cũng có thể có workflow thay thế. Đây là tương tác ít phổ biến hơn được thực hiện bởi người dùng với hệ thống
1. Exception flow: Là các luồng ngăn cản người dùng đạt được mục đích của họ
1. Post conditions: Các điều kiện cần được kiểm tra sau khi hoàn thành.
## Use case diagram
Use case diagram là một sơ đồ biểu diễn bằng hình ảnh về các hành vi của người dùng trong một hệ thống, cách người dùng tương tác với hệ thống. Nó chỉ ra luồng đi từ hoạt động này sang hoạt động khác trong một hệ thống. Nó đặc biệt quan trọng trong việc xây dựng mô hình chức năng của hệ thống và nhấn mạnh tới việc chuyển đổi quyền kiểm soát giữa các đối tượng người dùng (Actors)

![](https://images.viblo.asia/6781bf2b-0e4b-416f-bb4b-97591c2edce3.jpg)

* System:  Nó có thể là một trang web, một ứng dụng hoặc bất kỳ component nào khác. Nó thường được biểu diễn bằng một hình chữ nhật. Nó chứa đựng các trường hợp sử dụng (Use case). Người dùng được đặt bên ngoài 'hình chữ nhật'.
* Use case: thường được biểu diễn bằng các hình bầu dục, chỉ định các hành động bên trong nó.
* Actors: là những người sử dụng hệ thống. Nhưng đôi khi nó có thể là các hệ thống khác, người hoặc bất kỳ tổ chức nào khác.

![](https://images.viblo.asia/7a55ac91-5d02-466b-a826-ec44f4216459.jpg)

Trên đây là ví dụ về Use case diagram cho trường hợp 'Login'. Trong ví dụ này, chúng ta có nhiều người sử dụng hệ thống và tất cả đều được đặt bên ngoài hệ thống. Students, Teacher, Parents được xem  như là những người dùng chính (Actors) của hệ thống vì thế họ được đặt bên trái và ở  ngoài hình chữ nhật.
Admin và Staff được xem là người dùng phụ vì thế cũng được đặt bên phải và ở ngoài hình chữ nhật. Tất cả các người dùng đều có thể đăng nhập vào hệ thống vì thế chúng ta biểu diễn mối quan hệ giữa người dùng (Actors) và chức năng Login.
Ngoài ra, còn những chức năng khác của hệ thống như "Reset Password" và "Forgot Password". Chúng cũng có mối liên quan đến chức năng "Login", vì thế chúng ta cũng cần có biểu diễn mối quan hệ giữa các chức năng này với nhau.
# Use case testing là gì?
Use case testing là một kỹ thuật kiểm thử chức năng của kiểm thử hộp đen, vì thế chúng ta sẽ không cần quan tâm đến code. Nó giúp Tester xác định được các kịch bản kiểm thử được thực hiện trên toàn bộ hệ thống từ đầu đến cuối của mỗi giao dịch.

![](https://images.viblo.asia/8e6de62b-a22e-47bc-b28d-f509396ddbcc.jpg)

**Một vài đặc điểm của Use case testing**

* Use case testing không phải được thực hiện để quyết định chất lượng của phần mềm
* Use case testing không đảm bảo bao phủ được toàn bộ ứng dụng của người dùng
* Dựa trên kết quả kiểm thử từ Use case, chúng ta không thể quyết định việc triển khai môi trường của sản phẩm
* Nó sẽ giúp tìm ra được những lỗi từ kiểm thử tích hợp

**Ví dụ về Use case testing**

Ví dụ với trường hợp kiểm tra điểm của sinh viên của hệ thống quản lý giáo dục

Actors: Students, Teacher, Parents

Pre-condition:
1. Hệ thống phải có kết nối mạng Internet
1. Người dùng phải có 'Student ID'

Dưới đây là Use case và Test case tương ứng đối với trường hợp kiểm tra điểm của sinh viên

![](https://images.viblo.asia/a635a9f5-a318-4a1c-9161-55bc4bb5d035.jpg)

# Kết luận

Qua bài viết này tôi hi vọng các bạn có thể hiểu rõ hơn về Use case và Use case testing. 
Viết Use case là một quá trình lặp lại. Bạn chỉ cần dành một chút thời gian để thực hành và cần có kiến thức tốt về hệ thống để thiết kế Use case.
Tóm lại, chúng ta có thể sử dụng ‘Use Case testing’ trong một ứng dụng để tìm các liên kết còn thiếu, các yêu cầu không hoàn chỉnh… Tìm chúng và sửa đổi hệ thống sẽ đạt được hiệu quả và chính xác cho hệ thống.

Nguồn: https://www.softwaretestinghelp.com/use-case-testing/