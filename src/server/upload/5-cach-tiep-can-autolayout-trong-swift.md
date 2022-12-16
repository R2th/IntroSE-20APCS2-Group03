Đây là bài dịch từ trang [medium.com](https://medium.com/). Mời các bạn xem bài gốc tại đây: https://medium.com/better-programming/5-auto-layout-approaches-at-swift-b229cf396ee2

Để tạo giao diện người dùng thích ứng với những thay đổi về kích thước màn hình và hướng của thiết bị, chúng ta sử dụng `Auto Layout`, hệ thống bố cục dựa vào các ràng buộc.
Bài viết này cung cấp tổng quan về năm cách tiếp cận khác nhau để thêm các ràng buộc bằng mã.

-----
### Tại sao lại sử dụng `Auto Layout`
Nếu không có `Auto Layout` vị trí của các `subview` trên một `view` sẽ được cố định. Nếu chúng ta đặt một `subview` có màu nền là đỏ vào trung tâm của iPhone 11, thì điểm trung tâm `view` màu đỏ này sẽ có vị trí cố định là (207, 448) vì iPhone 11 có kích thước chiều ngang là 414 points (tức 828 pixels) và kích thước chiều dọc là 896 points (tức 1792 pixels).

Khi chạy ứng dụng trên iPhone SE, 8, 12 và iPad Pro, chúng ta sẽ thấy `view` màu đỏ không còn ở chính giữa màn hình nữa.

![](https://images.viblo.asia/60f57972-0440-47cd-928c-24e0eba367db.png)

Khi chúng ta quay màn hình trên iPhone 11 `view` màu đỏ cũng sẽ chạy ra khỏi màn hình.

![](https://images.viblo.asia/5afba7d6-78f4-4b8c-9f91-a19f950869ea.png)

-----
### 1. Sử dụng `NSLayoutConstraint`
`NSLayoutConstraint` xách định mối quan hệ giữa 2 đối tượng giao diện bằng một phương trình tuyến tính có định dạng như sau:
`item1.attribute1 = multiplier × item2.attribute2 + constant`
* `attribute1` và `attribute2` là các biến mà `Auto Layout` có thể điều chính khi giải quyết các ràng buộc này. Ví dụ các thuộc tính của 1 ràng buộc như: `left`, `right`, `top`, `bottom`, `leading`, `trailing`, `width`, `height`, `centerX`, `centerY`, `lastBaseLine`...
* `multiplier` và `constant` xác định vị trí tương đối của hai thuộc tính.

Ví dụ khi đặt 1 `subview` lên một `view` khác, chúng ta sẽ sử dụng đoạn mã sau để thêm `Auto Layout` cho `subview` đó như sau:
```
private func addConstraintUsingNSLayoutConstraint() {
    subView.translatesAutoresizingMaskIntoConstraints = false

    // X Constraint
    let centerXConstraint = NSLayoutConstraint(
        item: subView,
        attribute: .centerX,
        relatedBy: .equal,
        toItem: view,
        attribute: .centerX,
        multiplier: 1,
        constant: 0
    )
    
    // Y Constraint
    let centerYConstraint = NSLayoutConstraint(
        item: subView,
        attribute: .centerY,
        relatedBy: .equal,
        toItem: view,
        attribute: .centerY,
        multiplier: 1,
        constant: 0
    )
    
    // Width Constraint
    let widthConstraint = NSLayoutConstraint(
        item: subView,
        attribute: .width,
        relatedBy: .equal,
        toItem: view,
        attribute: .width,
        multiplier: 0.5,
        constant: 0
    )
    
    // Height Constraint
    let heightConstraint = NSLayoutConstraint(
        item: subView,
        attribute: .height,
        relatedBy: .equal,
        toItem: nil,
        attribute: .notAnAttribute,
        multiplier: 1,
        constant: 100
    )
    
    view.addConstraints([
        centerXConstraint,
        centerYConstraint,
        widthConstraint,
        heightConstraint,
    ])
}
```
* Thiết lập `translatesAutoresizingMaskIntoConstraints` là `false` với mục đích bỏ qua các tác dụng của `auto-resizing mask`. Nó cũng sẽ bỏ qua việc thay đổi kích thước và vị trí của view bằng cách sử dụng các thuộc tính `frame`, `bounds` và `center`.
* Đoạn mã trên tạo các ràng buộc: `width`, `height`, `centerX`, và `centerY`bằng cách xác định vị trí tương đối của các thuộc tính này.

![](https://images.viblo.asia/be0901c0-a6f0-4ccc-bd75-bb2eae236ce3.png)

### 2. Sử dụng ngôn ngữ định dạng trực quan (Visual Format Language)
Hầu hết các ràng buộc hữu ích trong giao diện người dùng có thể được thể hiện bằng cách sử dụng Ngôn ngữ Định dạng Trực quan. Cú pháp của ngôn ngữ định dạng trực quan cho Auto Layout [tại đây](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/VisualFormatLanguage.html).
```
private func addVisualFormatLanguage() {
    subView.translatesAutoresizingMaskIntoConstraints = false
    let views: [String: Any] = ["superView": view!, "view": subView]
    let metrics = ["width": view.frame.width / 2]
    let horizontalConstraints = NSLayoutConstraint.constraints(
        withVisualFormat: "H:[superView]-(<=0)-[view(width)]",
        options: .alignAllCenterY,
        metrics: metrics,
        views: views
    )
    let verticalConstraints = NSLayoutConstraint.constraints(
        withVisualFormat: "V:[superView]-(<=0)-[view(100)]",
        options: .alignAllCenterX,
        metrics: nil,
        views: views
    )
    view.addConstraints(horizontalConstraints)
    view.addConstraints(verticalConstraints)
}
```
* `view` xác định cặp khóa-giá trị của mỗi view trong hệ thống thứ tự các view.
* Chúng ta dùng `metrics` để tính `width`một cách tự động.
* `H` chỉ định đây là ràng buộc theo chiều ngang và `V` chỉ chiều dọc.

![](https://images.viblo.asia/6e4494af-d35c-4d1c-84d6-b6ef3dafdb17.png)

### 3. Sử dụng `AutoresizingMask`
> `AutoresizingMask` xác định cách mà đối tượng sẽ tự thay đổi kích thước khi kích thước của `superview` của nó thay đổi. Khi kích thước của một `view` thay đổi, nó sẽ tự động thay đổi kích thước của các `subview` theo `auto-resizing mask` của `subview` đó. Bạn chỉ định giá trị của `auto-resizing mask` này bằng cách kết hợp các hằng số được mô tả trong `UIView.AutoresizingMask` bằng cách sử dụng toán tử `OR`. Việc kết hợp các hằng số này cho phép bạn chỉ định kích thước nào `view` sẽ rộng ra hoặc thu nhỏ so với `superview`. Theo [tài liệu dành cho nhà phát triển của Apple](https://developer.apple.com/documentation/uikit/uiview/1622559-autoresizingmask?changes=_4).
```
private func addAutoresizingMask() {
    subView.translatesAutoresizingMaskIntoConstraints = true
    subView.bounds = CGRect(
        x: 0,
        y: 0,
        width: 207,
        height: 100
    )
    subView.center = CGPoint(
        x: view.bounds.midX,
        y: view.bounds.midY
    )
    subView.autoresizingMask = [
        .flexibleLeftMargin,
        .flexibleRightMargin,
        .flexibleTopMargin,
        .flexibleBottomMargin
    ]
}
```
* Để sự dụng `AutoresizingMask`, quan trọng chúng ta phải thiết lập `translatesAutoresizingMaskIntoConstraints` là `true`
* Chúng ta chỉ định kích thước và vị trí cho `subView`
* Chúng ta để các lề của `subView` linh hoạt ở `top`, `left`, `right` và `bottom` để giữ cho kích thước của nó không đổi và luôn ở trung tâm của `superview`.

### 4. Sử dụng `NSLayoutAnchor`
> `NSLayoutAnchor` xây dựng ràng buộc bằng cách bắt đầu với một đối tượng dạng `view` và chọn một trong các thuộc tính neo của đối tượng đó. Các thuộc tính này tương ứng với các giá trị `NSLayoutConstraint.Attribute` chính được sử dụng trong `Auto Layout` và cung cấp một lớp con `NSLayoutAnchor` thích hợp để tạo các ràng buộc cho thuộc tính đó. Theo [tài liệu dành cho nhà phát triển của Apple](https://developer.apple.com/documentation/uikit/nslayoutanchor).
```
private func addNSLayoutAnchor() {
    subView.translatesAutoresizingMaskIntoConstraints = false
    
    NSLayoutConstraint.activate([
        subView.heightAnchor.constraint(equalToConstant: 100),
        subView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.5),
        subView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
        subView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
    ])
}
```

### 5. Sử dụng `intrinsicContentSize`
`intrinsicContentSize` là một thuộc tính *get-only* của `UIView`
> Nó cho phép một `view` tùy chỉnh giao tiếp với hệ thống bố cục kích thước cái mà kích thước của nó dựa trên nội dung. Kích thước nội tại này phải độc lập với khung nội dung bởi vì không có cách nào để giao tiếp động khi chiều rộng thay đổi tới hệ thống bố cục dựa trên chiều cao đã thay đổi. Cách duy nhất để sử dụng `intrinsicContentSize` là tạo một lớp mới kế thừa `UIView`. Theo [tài liệu dành cho nhà phát triển của Apple](https://developer.apple.com/documentation/uikit/uiview/1622600-intrinsiccontentsize).
```
class CustomView: UIView {
    override var intrinsicContentSize: CGSize {
        return CGSize(width: 207, height: 100)
    }
}

private func useIntrinsicContentSize() {
    let subView = CustomView()
    
    view.addSubview(subView)
    subView.backgroundColor = .red
    subView.translatesAutoresizingMaskIntoConstraints = false
    NSLayoutConstraint.activate([
        subView.heightAnchor.constraint(equalToConstant: 100),
        subView.widthAnchor.constraint(equalTo: view.widthAnchor, multiplier: 0.5),
        subView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
        subView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
    ])
    
}
```

![](https://images.viblo.asia/fbe0ddea-4952-43f7-b0ee-fbb7e35359fc.png)

Cảm ơn vì đã đọc!