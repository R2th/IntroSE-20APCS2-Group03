Đây là bài dịch từ của một chia sẻ trên trang medium.com, bài viết nguồn mời các bạn xem tại đây: https://medium.com/@GabEarnsh/painless-icon-generation-for-ios-apps-with-sketch-and-xcode-part-3-c68a27b4006
### Tổng quan
Việc tạo ra các icon cho một ứng dụng iOS có thể mất khá nhiều thời gian. Đây là phần 3, trong loạt 3 bài viết giải thích cách tôi đã thực hiện quá trình export các icon từ Sketch vào Xcode dưới một phút, thậm chí với cập nhật một icon hoàn toàn mới.

Trong phần đầu, tôi đã giới thiệu cho các bạn cách sử dụng Sketch để xuất một bộ icon đầy đủ từ một Artboard.
https://viblo.asia/p/tao-icon-cho-cac-ung-dung-ios-voi-sketch-va-xcode-phan-1-RnB5p0Vb5PG

Trong phần hai, tôi đã mô tả cách thiết lập bộ icon của bạn trong Xcode để liên kết các file icon với placeholder của chúng một cách nhanh chóng.
https://viblo.asia/p/tao-icon-cho-cac-ung-dung-ios-voi-sketch-va-xcode-phan-2-bWrZngLrlxw

Trong phần này, tôi sẽ chia sẻ một số thủ thuật để thiết lập artboard để quản lý nhiều icon cùng một lúc.
### Tạo nhiều bộ icon cho XCode
Thông thường, một dự án trong XCode có thể có nhiều hơn một bộ icon. Ví dụ, bạn có nhiều cấu hình với nhiều icon khác nhau. Cách tiếp cận tôi đã từng giới thiệu trước đây đáp ứng tốt yêu cầu này, nhưng nó còn có thể được thực hiện nhanh hơn nữa.

Ví dụ, tôi có 2 bộ icon trong XCode:
* *AppIcon*
* *AppIcon.debug*

Các bộ icon này đã được thiết lập chính xác như trong phần 2, với các file liên kết đúng với các placeholder tương ứng của chúng.

Tôi cũng có 2 icon trong Sketch, chính xác như trong phần 1, và tôi sẽ export ra 2 folder là *release/icon* và *debug/icon*.
![](https://images.viblo.asia/a8905730-f93a-4694-b606-957c161e6663.png)

Bạn sẽ thấy 2 folder icon của XCode tương ứng là: *AppIcon.appiconset* và *AppIcon.debug.appiconset*, như trong phần 2 đã đề cập.
![](https://images.viblo.asia/fa4197a3-60b2-428c-b6ac-815d16878d39.png)

Khi mọi thứ đã được thiết lập, nếu bạn thay đổi icon mới, bạn sẽ cần export lại chúng và copy các file icon mới vào lại XCode. Và để làm việc này một cách nhanh chóng, chúng ta cần phải export tất cả các icon trong Sketch cùng một lúc. Hãy thay đổi các slide là chúng ta có thể làm được điều này.

### Đổi tên các slice trong Sketch
Như trong phần 1, chúng ta đã biết rằng: tên của slice dùng để export file từ Sketch ra folder. Nếu các slice được đổi tên để trùng với tên icon trong XCode, chúng ta có thể sao chép các folder vừa được export này vào XCode cùng một lúc. 
1. Đổi tên slice *AppIcon* thành *AppIcon.appiconset/icon*
2. Đổi tên slice *AppIcon.debug* thành *AppIcon.debug.appiconset/icon*
![](https://images.viblo.asia/6d5a61c1-544b-4b83-b78c-42008a2a109b.png)
### Export các slice
Thay vì export các slice riêng rẽ, bạn có thể sử dụng nút export file để export toàn bộ các slice cùng một lúc.
1. Nhấp vào nút *Export* ở bên phải của thanh công cụ (hoặc sử dụng **File** → **Export**)
2. Chắc chắn là tất cả các slice đã được chọn
3. Nhấp chuột vào *Export* 
4. Chọn thư mục đầu ra
![](https://images.viblo.asia/fe15965e-9b13-46a1-acef-eb6c9f392f9c.png)
Nếu kiểm tra thư mục đầu ra bạn sẽ thấy có 2 folder: *AppIcon.appiconset* và *AppIcon.debug.appiconset*, trong đó chứa các file icon tương ứng. 
### Sao chép các file icon vào Xcode
Để sao chép các file đã được export vào XCode:
1. Chọn và sao chép cả 2 folder icon đã được export, ở ví dụ này là *AppIcon.appiconset* và *AppIcon.debug.appiconset*
2. Paste các thư mục trực tiếp vào thư mục Assets.xcassets của dự án Xcode của bạn (bạn sẽ được cảnh báo về việc ghi đè lên các tệp, hãy chọn ok)
![](https://images.viblo.asia/9f7f3216-8d96-494a-a768-806585fa9c55.png)
Khi bạn kiểm tra các biểu tượng của mình trong Xcode, bạn sẽ thấy rằng cả hai đều đã được cập nhật với các thay đổi tương ứng của chúng.

### Tổng kết
Trong phần này, tôi đã chia sẻ một số thủ thuật để tăng tốc luồng công việc của bạn cho nhiều biểu tượng trong một dự án Xcode. Bây giờ bạn sẽ có một luồng công việc siêu nhanh để tạo các biểu tượng với Sketch và nhập chúng vào các dự án Xcode của bạn.