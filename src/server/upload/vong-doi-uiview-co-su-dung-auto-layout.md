Auto Layout là một mảng kiến thức vô cùng quan trọng đối với một nhà phát triển iOS. Việc nắm rõ vòng đời của Auto Layout là rất cần thiết để tiết kiệm thời gian phát triển và tránh được những lỗi về giao diện ứng dụng. Bài viết này sẽ cung cấp kiến thức về vòng đời của bất cứ `UIView` nào với Auto Layout để có thể được hiển thị lên màn hình.
# Tổng quát vòng đời Auto Layout
Bất cứ `UIView` nào được thiết lập Auto Layout sẽ phải trải qua 3 bước sau khi được khởi tạo: **Update**, **Layout** và **Render** (Hình 1). Các bước này không nhất thiết phải thực hiện tuần tự theo một chiều, mà nó có thể gọi lại các bước ở phía trước hoặc chạy lại từ đầu toàn bộ chu trình.

![](https://images.viblo.asia/2eaebee2-32b3-4630-8b05-1792d7a32925.png)

Hình 1 - Vòng đời `UIView` với Auto Layout (Nguồn: https://www.vadimbulavin.com/view-auto-layout-life-cycle/)
## Bước Update
Bước này sẽ thực hiện tính toán frame cho `UIView` dựa trên các constraints. Hệ thống sẽ duyệt phân cấp view (view hierarchy) từ trên xuống dưới (từ superview xuống đến các subviews) và gọi `updateConstraints()` cho từng view.

Quá trình này sẽ chạy tự động, tuy nhiên đôi khi chúng ta cần kích hoạt nó một cách có chủ đích. Ví dụ, chúng ta cần tính toán lại constraints ngay lập tức khi có một sự kiện làm thay đổi trạng thái của ứng dụng.

Phương thức `setNeedsUpdateConstraints()` vô hiệu hoá các constraints hiện tại và lên lịch trình cập nhật tính toán lại ở chu kỳ kế tiếp. Phương thức `updateConstraintsIfNeeded()` kích hoạt `updateConstraints()` ngay lập tức nếu như các constraints đã bị vô hiệu hoá từ trước đó.

## Bước Layout
Trong bước này, các frames của mỗi view sẽ được cập nhật với các thông số được tính toán trong bước **Update**. Nó diễn ra từ dưới lên trên theo phân cấp view (từ các subviews lên đến superview) và gọi `layoutSubviews()` cho từng view.

`layoutSubviews()` là phương thức được override phổ biến nhất trong toàn bộ vòng đời Auto Layout. Chúng ta override phương thức này khi:
* Không đủ constraints để mô tả layout của view.
* Frames được tính toán từ code.

Có hai phương thức bổ trợ trong bước này: `setNeedsLayout()` vô hiệu hoá layout hiện tại và `layoutIfNeeded()` kích hoạt `layoutSubviews()` ngay lập tức nếu như layout đã bị vô hiệu hoá từ trước đó.

Khi override phương thức `layoutSubviews()`:
* Chắc chắn đã gọi `super.layoutSubviews()`.
* Không gọi `setNeedsLayout()` hoặc `setNeedsUpdateConstraints()`, nếu không sẽ xuất hiện vòng lặp vô hạn.
* Không thay đổi các constraints của các views nằm ngoài phân cấp hiện tại.
* Cẩn thận khi thay đổi constraints của các views trong phân cấp hiện tại, có thể sẽ xuất hiện vòng lặp vô hạn.

## Bước Rendering
Bước này có nhiệm vụ hiển thị các views lên màn hình. Cho dù view có sử dụng Auto Layout hay không thì bước này luôn được thực hiện. `UIView` sẽ chuyển phần việc hiển thị này cho `CALayer`. Tất cả các thay đổi như đổi màu background, thêm subviews, … đều được vẽ lên màn hình một cách tự động. Phương thức chính của bước này là `drawRect()`.

# Về phía UIViewController
Trong vòng đời Auto Layout, trong bước **Update** và bước **Layout**, `UIViewController` cũng có các phương thức tương tự `UIView`:
* Bước **Update**: `updateViewConstraints()`
* Bước **Layout**: `viewWillLayoutSubviews()` / `viewDidLayoutSubviews()`

Phương thức `viewDidLayoutSubviews()` là quan trọng nhất. Nó được gọi để thông báo cho view controller rằng view của nó đã hoàn thành bước **Layout** (bound của nó đã thay đổi). Đây sẽ là thời điểm để thay đổi một view sau khi nó đã bố trí xong các subviews, nhưng trước khi nó được hiển thị lên màn hình.

# Intrinsic Content Size
Intrinsic Content Size là kích thước tự nhiên của một view dựa trên nội dung của nó (ví dụ intrinsic content size của một ảnh là kích thước nguyên bản của ảnh đó).

Có 2 mẹo sẽ giúp việc bố cục được đơn giản hoá và giảm tải số lượng constraints:
* Override thuộc tính `intrinsicContentSize` của một view để trả về kích thước phù hợp cho view đó.
* Nếu view chỉ có intrinsic size cho 1 chiều, vẫn override thuộc tính `intrinsicContentSize` và trả về `UIViewNoIntrinsicMetric` cho chiều không xác định.

# Tài liệu tham khảo
https://www.vadimbulavin.com/view-auto-layout-life-cycle/