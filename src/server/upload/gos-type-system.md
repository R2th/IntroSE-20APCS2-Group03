**Go** cung cấp một hệ thống loại (*type*) không phân cấp (*hierarchy-free type*) linh hoạt, điều này cho phép sử dụng lại mã với chi phí tái cấu trúc tối thiểu. Nó vẫn là sự phát triển giống OOP, nhưng không có các vấn đề phức tạp truyền thống. Nếu bạn đã từng giành một tuần để lập kế hoạch cho các abstract class và interface trong một chương trình Java hoặc C++, bạn sẽ đánh giá cao sự đơn giản của hệ thống loại (type system) trong Go.

Các nhà phát triển Go chỉ cần nhúng các loại để có thể tái sử dụng lại chức năng trong một mẫu thiết kế được gọi là thành phần (*composition*). Ở những ngôn ngữ khác cũng có sử dụng thành phần (*composition*), nhưng nó thường gắng chặt với kế thừa, điều này có thể khiến nó trở nên phức tạp và khó sử dụng. Trong Go, loại (*types*) được kết hợp từ các loại (*types*) nhỏ hơn. Trái ngược với các loại mô hình dựa trên kế thừa truyền thống. Ngoài ra, Go cố một cách triển khai các Interface rất thú vị, nó cho phép lập trình viên mô hình hoá hành vi hơn là mô hình hoá loại(*types*). Bạn không cần khai báo những gì bạn *implementing* một *interface* trong Go. Trình biên dịch sẽ xác định xem các giá trị thuộc loại của bạn đáp ứng những Interface nào. Rất nhiều *interfaces* trong thư viện chuẩn của Go rất nhỏ, nó lộ ra (*exposing*) chỉ một function. Nếu bạn đã từng sử dụng lập trình hướng đối tượng (*OOP*) như Java, C#... thì bạn sẽ nhanh chóng làm quen với việc này.

Go cung cấp sẵn một vài kiểu như là **int, string** và cũng cho phép lập trình viên tự định nghĩa kiểu dữ để lưu trữ dữ liệu. Nếu bạn đã từng biết đến *struct trong C*, các loại do người dùng tự định nghĩa trong Go cũng hoạt động tương tự vậy, nhưng có thể khai báo thêm các phương thức (**methods**) hoạt động trên dữ liệu của nó. Thay vì xây dựng cấu trúc kế thừa (*Client extends User extends Entity*), lập trình viên Go xây dựng những kiểu nhỏ như Customer và Admin, sau đó nhúng (*embed*) chúng vào trong một kiểu lớn hơn.

![Hình minh hoạ](https://images.viblo.asia/81f7ffee-41bc-4808-bbef-9d66d6d5babc.png)
 
**Interfaces** cho phép bạn thể hiện hành vi (*behavior*) của một loại. Nếu một giá trị của một loại implements một *interface*, nghĩa là giá trị đó một bộ hành vi cụ thể. Bạn cũng không cần khai báo rõ ràng bạn đang implementing một *interface*; bạn chỉ cần viết nội dung cho implementation đó. Trong Go, nếu một kiểu dữ liệu implements các phương thức của một *interface*, một giá trị thuộc kiểu của bạn có thể được lưu trữ trong một giá trị của một kiểu *interface* nào đó. Không cần khai báo gì đặc biêt. Trong lập trình hướng đối tượng (*OOP*), thông thường một *interface* sẽ bao gồm nhiều phương thức, vì thế bạn thường tốn nhiều thời gian để suy nghĩ (*declare a interface*)trước khi viết mã. Đây là ví dụ một *interface* trong Java:
```java
interface User {
    public void login();
    public void logout();
}
```
Implementing interface này trong Java yêu cầu bạn phải tạo ra một class hoàn thành tất cả các *method* được định nghĩa trong ``User`` interface và khai báo rõ ràng bạn đang implement *interface* đó. Trái lại, *interface* trong Go đại diện cho một *method* duy nhất. Các bạn có thể tìm thấy ví dụ bên trong thư viện chuẩn của Go:
```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```
Để viết một loại (*type*) implements ``Reader`` interface, bạn chỉ cần implement phương thức ``Read``, nó nhận vào một mảng ``bytes`` và trả lại một ``integer`` và ``error``

Đây là một sự khác biệt hoàn toàn so với ``interface`` trong lập trình hướng đối tượng. ``Interface`` trong Go là rất nhỏ và thông thường nó chỉ khai báo một *method*. Trong thực tế, điều này có ý nghĩa giúp tăng tính tái sử dụng code. Bạn có thể implement một ``Reader`` interface và bất kỳ loại nào cũng có thể implement nó.

Bài viết này mình xin dừng lại ở đây. Mình biết bài viết khá nặng về lý thuyết, nhưng mình cũng hi vọng rằng dựa vào những keyword trong bài, các bạn có thể tự tìm hiểu thêm để tăng thêm sự hiểu biết về **Types** trong Go (đặc biệt là ``interface``).

Sau loạt bài giới thiệu về lý thuyết, mình cũng sẽ triển khai một vài bài viết có code làm ví dụ để giúp mọi người có cái nhìn mới mẻ hơn. Cảm ơn các bạn đã đọc bài của mình :)

Ngoài ra mình có lập một blog để lưu lại những bài viết của mình. Đây là link bài viết gốc: https://chiasekienthuc.netlify.app/blog/golang-type-system. Các bạn vào ủng hộ mình nhá =))