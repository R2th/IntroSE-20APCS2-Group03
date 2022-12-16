iOS 13 mang đến một danh sách khá nhiều tính năng mới: SwiftUI, Combine, Dark Mode, RealityKit, iPad OS, v.v. 
Nhưng một số thứ gần như không được chú ý. 
Trong số đó là sự xuất hiện mới của một số thành phần UIKit. UISegmentedControl cùng với UISwitch, UIStepper và UISlider đã có một diện mạo mới.

![](https://images.viblo.asia/ac04768c-cc6e-4d71-8997-49d49c9d8901.png)

Nhưng không may, trong trường hợp của UISegmentedControl, những thay đổi đó đã gây ra một số vấn đề mà tôi sẽ mô tả tiếp theo.

## 1. Tint color không còn hoạt động nữa
Thuộc tính tintColor đã được giới thiệu trong iOS 7 cho phép thay đổi giao diện của UISegmentedControl.

![](https://images.viblo.asia/d030f69d-b625-4b4d-88c5-9adb5dfdc1fc.png)

Bắt đầu với iOS 13 `tintColor` sẽ không làm gì cả. Cho dù bạn có gán màu gì, UISegmentedControl cũng không thay đổi gì cả. 
Để làm cho mọi thứ thậm chí còn trực quan hơn, Apple đã không đánh dấu thuộc tính này là không dùng nữa. 
Nhưng đừng lo, để cung cấp ít nhất một số cách để tùy chỉnh màu sắc của UISegmentedControl bên cạnh `backgroundColor` thì Apple đã giới thiệu thuộc tính mới có tên là `selectedSegmentTintColor`.
Sử dụng đặc tính này, chúng ta có thể thay đổi màu sắc của các thanh điều khiển slide.

![](https://images.viblo.asia/f681fdc9-8f43-44aa-a430-7ddf4bda492a.png)

## 2. Hình nền mặc định
Trong khi cố gắng chọn màu nền đẹp cho các segmented control trong ứng dụng của mình, tôi nhận thấy màu của tôi nhìn hơi xỉn. 
Sau khi kiểm tra View Hierarchy, tôi phát hiện ra rằng khi custom background image không được đặt, UISegmentedControl sẽ sử dụng một số hình ảnh mặc định.

![](https://images.viblo.asia/0d4252cc-d605-42de-b552-f85b4c2e77d1.png)

Fill color của những hình ảnh đó có thể được sao chép bằng màu đen với độ mờ 6%. 
Điều thú vị ở đây là chúng ta có thể có được quyền truy cập vào hình nền mặc định như là `backgroundImage(for: .normal, barMetrics: .default)` phương thức này trả về nil trong trường hợp này. 
Điều thậm chí còn tệ hơn là nếu chúng ta đặt một hình nền trống (`UIImage()` hoặc bất kỳ hình ảnh nào về mặt kỹ thuật) thì hình ảnh màu trắng với bóng bên dưới slide control biến mất, làm cho segmented control không thể sử dụng được.

![](https://images.viblo.asia/23ef5eb7-fff1-427f-81cd-3c829afd6127.png)

Hành vi như vậy làm không thể sử dụng một số màu nền thuần túy, ví dụ: trắng. 
Chắc chắn chúng ta có thể gán nó, nhưng nó sẽ xuất hiện một chút màu xám do pha trộn với hình ảnh nền mặc định.

## 3. Rounded corners mặc định

Một vấn đề khác phát sinh khi hình ảnh nền được sử dụng full frame trong segmented control. 
Bắt đầu với iOS 13, khi corner radius khi không được set, một phần các góc sẽ bị mất:
![](https://images.viblo.asia/a9709ed7-25ff-4930-9e41-44ad2b156f4b.png)

May mắn thay, vấn đề này có thể được khắc phục bằng cách sử dụng lớp con của UISegmentedControl với override phương thức `layoutSubviews`:
```
class SquareSegmentedControl: UISegmentedControl {
    override func layoutSubviews() {
        super.layoutSubviews()
        layer.cornerRadius = 0
    }
}
```

## Suy nghĩ cuối cùng

Nhìn chung, tôi có cảm xúc lẫn lộn về một bản cập nhật của UISegmentedControl trong phiên bản iOS này. 
Chắc chắn giao diện mới rất thú vị, nhưng nó có thể buộc chúng ta phải điều chỉnh thiết kế các phần khác của ứng dụng để chúng trông tự nhiên hơn cùng với UISegmentedControl mới và không có cách nào để có được design hoàn chỉnh như của iOS 12, phải giành thêm thời gian để thiết kế lại ứng dụng.
Có một cách để lấy lại một phần kiểu iOS 12 được mô tả tại https://stackoverflow.com/a/56458794 nhưng nó sẽ chỉ hoạt động cho solid color background.

Nguồn: medium.com