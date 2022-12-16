MVC là viết tắt của Model - View - Controller, tạm dịch nôm na là Mô Phỏng - Hiển Thị - Điều Hành. MVC được sử dụng khi chúng ta muốn tách rời logic Mô Phỏng hoạt động của phần mềm `Model` và logic Hiển Thị của giao diện người dùng `View`. Nhờ vậy thì việc phát triển 2 khối này có thể được tiến hành độc lập mà không cần phải chờ đợi lẫn nhau. Đồng thời phép triển khai này còn cho phép chúng ta xây dựng nhiều lựa chọn giao diện người dùng khác nhau cho một phần mềm một cách thuận tiện hơn.

## Kiến trúc tổng quan

Trong MVC, chúng ta có 3 đối tượng chính cần quan tâm:

- `Model` là đối tượng Mô Phỏng logic hoạt động và xử lý dữ liệu của phần mềm.
- `View` là đối tượng vẽ giao diện người dùng và xử lý các logic Hiển Thị.
- `Controller` là đối tượng trung gian Điều Hành giao tiếp dạng `request/response` (yêu cầu/phản hồi) giữa `Model` và `View`, đồng thời có thể điều hành việc thực hiện một số thao tác tiền xử lý/hậu xử lý đối với các `request` và `response`.

![](https://images.viblo.asia/5664c21d-c8f5-435d-9f25-212a70c6c81c.png)

Chúng ta cũng có thể bắt gặp `View` và `Model` được triển khai thêm kết nối `observe/notify` bằng [Observer Pattern](https://viblo.asia/p/design-patterns-observer-pattern-gGJ59rXJKX2) hay một dạng giao tiếp tương tự cho phép `Model` phát đi thông báo sự kiện về việc dữ liệu được cập nhật để `View` có thể đáp ứng tức thì với sự thay đổi của dữ liệu theo thời gian thực; Và sơ đồ khối của kiến trúc MVC lúc này có dạng như 1 vòng khép kín:

![](https://images.viblo.asia/24a1fd6d-609c-449d-8ded-6786dd1fcfd0.png)

Tuy nhiên, ngay cả trong trường hợp này, `Model` vẫn sẽ không biết gì về logic hiển thị
của `View` và chỉ đơn giản là cung cấp một giao diện trừu tượng `Obserable` hay `Observed` (có thể được quan sát) để cho code client ở bất kỳ đâu đó có thể gửi các `Observer` tới và gắn vào. Khi dữ liệu được cập nhật thì `Model` chỉ thực hiện công việc của mình và thông báo sự kiện cho các `Observer` mà không quan tâm tới việc `View` có được cập nhật hay không.

Tương tự thì về phía `View` vẫn sẽ không biết gì về logic quản lý dữ liệu của `Model` mà 
chỉ đơn giản là tạo ra các `Observer` rồi gắn tới một giao diện truy vấn dữ liệu trừu tượng được cung cấp từ đâu đó. Khi nhận được các trạng thái dữ liệu mới được báo cáo bởi các `Observer` thì `View` tự thực hiện việc điều chỉnh giao diện người dùng chứ không phải là do `Model` điều hành.

Vì vậy nên chung quy thì chúng ta vẫn chỉ có một kiến trúc MVC tổng quan duy nhất với 3 đối tượng được xếp hàng thẳng tắp và `Controller` được đặt ở giữa `Model` và `View` như ban đầu.

## Áp dụng triển khai

Phương thức triển khai MVC chi tiết sẽ rất đa dạng và khác biệt đối với mỗi trường hợp cụ thể, tùy thuộc vào các yếu tố như: 

- Quy mô của phần mềm đang xây dựng nhỏ hay lớn?
- Kiểu phần mềm đang xây dựng là gì? Web, native, hay console?
- Tiêu chí quản lý code là gì? v.v....

Vì vậy nên chúng ta có thể sẽ bắt gặp code triển khai MVC với các class được thiết kế theo kiểu cứ `1 class Model` sẽ  có `1 class View` và `1 class Controller` tương ứng; Với các class `View` sẽ phản ánh thông tin là dữ liệu của các class `Model` giống như lý do nguyên thủy khiến MVC xuất hiện.

> Cảm hứng ban đầu khi MVC được tạo ra là để cho phép việc xây dựng giao diện người dùng cho bất kỳ một `object` nào.  
> *_Alan Kay*

![](https://images.viblo.asia/ce3a00d4-0397-41be-91fa-93703876ed38.png)

Kiểu thiết kế này đặc biệt thường thấy với các ứng dụng `console` hay desktop với tính năng nhập/xuất dữ liệu không quá phức tạp.

Tuy nhiên, đối với các ứng dụng web hay các ứng dụng có tính năng đa dạng hơn thì mối liên hệ như trên dường như không bao giờ tồn tại. Lý do là vì lúc này logic hiển thị giao diện người dùng trở nên phức tạp hơn và yêu cầu một cơ chế giao tiếp linh hoạt hơn giữa khối `view` và `controller`. Điều tương tự cũng xảy ra với khối xử lý logic điều hành hoạt động và xử lý dữ liệu, dẫn tới yêu cầu cơ chế giao tiếp linh động hơn giữa khối `model` và `controller`.

![](https://images.viblo.asia/2e15e855-6efa-4fb9-8d07-8ccb8d4e0535.png)