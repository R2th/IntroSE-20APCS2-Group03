Đây là bài dịch từ của một chia sẻ trên trang [medium.com](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://blog.getdoctalk.com/adaptive-ui-for-multiple-screen-sizes-in-ios-fd8c6999a0a3

#### Tổng quan
Trong iOS không khó để tạo một giao diện phức tạp bằng AutoLayout hoặc ManualLayout. Nhưng làm cho giao diện hoạt động tốt trên các kích thước màn hình khác nhau là việc không đơn giản.
Chúng ta hãy cùng xem ví dụ về giao diện trên **Phone 7 Plus** và **iPhone SE**:

![a](https://images.viblo.asia/3717fb00-a9b4-4a24-9086-3b92ac50ff3e.png) ![b](https://images.viblo.asia/5bbef654-71f8-4489-91a9-9bd205f600d2.png)

Bạn sẽ nhận thấy có rất nhiều không gian trống xung quanh các thành phần giao diện trên **iPhone 7 Plus**. Nhưng cùng một kích thước thì giao diện trên **iPhone SE** trông hợp lý hơn nhiều. 
   
Trong iOS, chúng ta có một cách để khắc phục điều này bằng cách sử dụng các ảnh với các kích thước khác nhau được xuất ra từ design với kích thước **@1x**, **@2x**, **@3x**. 

Trong Android, việc này được thực hiện dễ dàng hơn vì có thể sử dụng các đơn vị **dp**.

#### Giải pháp
Nó đơn giản hơn tôi đã nghĩ lúc đầu. Tôi chỉ cần tạo một **extension** cho struct **CGFloat** như sau:
```
extension CGFloat {
    /**
     The relative dimension to the corresponding screen size.
     
     //Usage
     let someView = UIView(frame: CGRect(x: 0, y: 0, width: 320.dp, height: 40.dp)
     
     **Warning** Only works with size references from @1x mockups.
     
     */
    var dp: CGFloat {
        return (self / 320) * UIScreen.main.bounds.width
    }
}
```
Link [github](https://gist.github.com/sauravexodus/1c127677a3c289a03ac6d541e9800a67#file-cgfloat-extensions-swift)
Xong, tôi gọi biến này là **dp**. Bạn có thể thay thế 320 bằng giá trị bạn muốn dựa trên độ phân giải mà màn hình được sử dụng. Dưới đây là các giá trị bạn có thể thay thế 320 trên các điện thoại với kích thước màn hình khác nhau:
* Với iPhone 6, 7, 8 Plus là: 414
* Với iPhone 6, 7, 8, X là:  375

#### Cách sử dụng
Khi đã có **extension** ở trên, bạn chỉ cần đặt **.dp** sau bất kì giá trị **CGFloat** nào.
Dưới đây, bạn có thể thấy một vài ví dụ:
```
// Creating CGRects for your UIView frame
let imageView = UIImageView(frame: CGRect(x: 0, y: 0, width: 200.dp, height: 40.dp))

//Creating constraints
imageView.leftAnchor.constaint(equalTo: view.leftAnchor, constant: 16.dp).isActive = true

//Using as a font size
myLabel.font = UIFont.systemFont(ofSize: 13.dp)
```
Link [github](https://gist.github.com/sauravexodus/f45d6ebd1914ea36a2d909c1f5f099f8#file-relativedimensioningusage-swift)

Rất đơn giản phải không!
Xây dựng giao diện người dùng hoạt động trên các kích thước màn hình sẽ trở nên thật dễ dàng.