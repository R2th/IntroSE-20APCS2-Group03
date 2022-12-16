### Nội dung

- Giới thiệu
- IBInspectable
- IBDesignable
- Kết Luận

### Giới thiệu

Có thể chúng ta đã biết đến 2 thuộc tính khai báo của interface builder rất tiện lợi và sử dụng rất nhiều để tạo các custom view đó là IBInspectable và IBDesignable. Trong đó IBInspectable thể  hiện properties của class trong interface builder Attribute Inspector và IBDesignable giúp cập nhật view realtime. Điều này thật tuyệt vời giúp chúng ta thiết kế, chỉnh sửa giao diện ngay trong interface builder rất nhanh mà hiệu quả.

**Nào chúng ta cùng tìm hiểu nhé!**

### Step 0: IBInspectable

Các thuộc tính IBInspectable cung cấp khả năng truy cập mới vào một tính năng cũ: Hiện tại có thể truy cập được từ thanh Attributes, các thuộc tính này đã có sẵn từ trước khi Interface Builder được tích hợp vào Xcode. của mỗi đối tượng trong một NIB, XIB hoặc Storyboard: 
![](https://viblo.asia/uploads/09cb43e3-f8a2-48a1-adee-1590ca029874.png)

Dưới đây là những valid types cho IBInspectable :

```Swift
Int
CGFloat
Double
String
Bool
CGPoint
CGSize
CGRect
UIColor
UIImage
```

Mặc dù các thuộc tính trong runtime attributes có thể thực hiện việc thay đổi 1 cách nhanh chóng. 
Nhưng việc không có bất kỳ gợi ý nào ngoài việc thao tác với keypath, type, value sẽ gây khó khăn cho chúng ta. IBInspectable đã khắc phục nhược điểm này bằng việc trong xcode bạn có thể chỉ định bất kỳ thuộc tính như inspectable và Xcode sẽ xây dựng giao diện tương ứng với tùy chỉnh của bạn trong custom class.

Ví dụ:

```Swift
class OverCustomizableView : UIView {
    @IBInspectable var integer: Int = 0
    @IBInspectable var float: CGFloat = 0
    @IBInspectable var double: Double = 0
    @IBInspectable var point: CGPoint = CGPointZero
    @IBInspectable var size: CGSize = CGSizeZero
    @IBInspectable var customFrame: CGRect = CGRectZero
    @IBInspectable var color: UIColor = UIColor.clearColor()
    @IBInspectable var string: String = "We ❤ Swift"
    @IBInspectable var bool: Bool = false
}
```

Trong Attribute Inspector bạn sẽ nhìn thấy các phần cài đặt ở Xcode hiển thị lên
![](https://viblo.asia/uploads/118670ef-d3ac-47b2-9602-e5d8fd4e771c.png)


Tất cả  được thêm vào một vài  thuộc tính định nghĩa người dùng trong runtime và được cài đặt giá trị khởi tạo khi View được load lên.
![](https://viblo.asia/uploads/8ea43a1d-90b9-4e35-8a72-de1a88a3f234.png)

Chúng ta cùng tìm hiểu thêm ví dụ khá thông dụng về cornerRadius của UIView:

```Swift
@IBInspectable var cornerRadius: CGFloat = 0 {
   didSet {
       layer.cornerRadius = cornerRadius
       layer.masksToBounds = cornerRadius > 0
   }
}
@IBInspectable var borderWidth: CGFloat = 0 {
   didSet {
       layer.borderWidth = borderWidth
   }
}
@IBInspectable var borderColor: UIColor? {
   didSet {
       layer.borderColor = borderColor?.CGColor
   }
}
```

Đánh dấu với @IBInspectable (hoặc IBInspectable trong Objective C), chúng có thể dễ dàng chỉnh sửa trong bảng điều khiển của Interface Builder’s. 

![](https://images.viblo.asia/74b1d0e5-db7a-4cf2-92ed-49eae31f1d9e.png)

### IBDesignable

Chúng ta cùng làm quen với khái niệm khá thú vị tiếp theo là IBDesignable. Với nó, chúng ta sẽ thấy được sự thay đổi trực tiếp trên các giao diện như Xib, Storyboard. Tính năng này cho phép các tùy chình, thay đổi của bạn sẽ xuất hiện luôn mà không cần build hay run app sau mỗi lần thay đổi.

Để đánh dấu một view tùy chỉnh là IBDesignable, chúng ta hãy thêm vào trước class name với prefix là @IBDesignable (hoặc macro IB_DESIGNABLE trong Objective-C):

```Swift
@IBDesignable
class MyCustomView: UIView {
    ...
}
```

![](https://viblo.asia/uploads/3cdef742-bcc8-41cd-b83e-15c37e942697.png)

Khi kết hợp với thuộc tính IBInspectable, các lập trình viên có thể dễ dàng điều chỉnh việc hiển thị, tùy chỉnh các  kết quả mà chúng ta muốn. Ngoài ra có một tính năng rất hay giúp chúng ta debug liên quan đến UI mà không cần phải build và chạy app đó là chúng ta vào Interface Builder, và chọn Editor ➔ Debug Selected Views.

### Kết Luận

Trên đây, mình đã giới thiệu 2 thuộc tính của Interface Builder là IBInspectable / IBDesignable. Với nó, các bạn sẽ giảm tối thiểu được thời gian khi phải vật lộn với mã để thay đổi giao diện cho UIView. Hi vọng các bạn có thể áp dụng vào dự án của mình 1 cách hiệu quả.

Quả thật, 2 thuộc tính của Interface Builder là IBInspectable / IBDesignable đã giúp cho việc tạo một custome class một cách dễ dàng hơn, dễ dàng thay đổi giao diện và tiết kiệm rất nhiều thời gian trong quá trình phát triển ứng dụng.

Cám ơn bạn đã dành thời gian cho bài viết này!

##### _Nguồn:_

[http://nshipster.com/ibinspectable-ibdesignable/](http://nshipster.com/ibinspectable-ibdesignable/)