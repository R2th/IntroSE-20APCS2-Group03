Mình đã làm một ứng dụng được vài năm và nhận được một yêu cầu thiết kế đơn giản: Round corners trên một View và add shadow trên chính View đó. Nhìn vào yêu cầu có vẻ nó khá dễ dàng phải không?

Đoạn code ban đầu của mình như sau : 

```
// set the corner radius
layer.cornerRadius = 6.0
layer.masksToBounds = true
// set the shadow properties
layer.shadowColor = UIColor.black.cgColor
layer.shadowOffset = CGSize(width: 0, height: 1.0)
layer.shadowOpacity = 0.2
layer.shadowRadius = 4.0
```

Đoạn code trên ban đầu mình nghĩ là sẽ chạy ổn . Nhưng không , nó chỉ set được Round corners còn add shadow không được . Sau đó mình set lại masksToBounds  = false thì có shadow nhưng lại không set được Round corners . 

**Lý do tại sao chỉ set được 1 trong 2 hiệu ứng ?**

layer.masksToBounds = true clip tất cả mọi thứ bên ngoài của layer. Một shadow sẽ được vẽ bên ngoài layer, do đó nó cũng được clipped. Vì vậy, chúng ta không thể sử dụng cùng một lớp cho cả hai hiệu ứng này. 

**Solution**

Sau thời gian mình tìm kiếm , tình cờ đã tìm thấy một bài viết của 1 bạn trên StackOverflow , nó đã giúp mình khắc phục được vấn đề .  Sử dụng UIBezierPath để add shadow và round corner trên cùng 1 View : ***shadowLayer.path = UIBezierPath(roundedRect: bounds, cornerRadius: cornerRadius).cgPath***

Full code :

```
private var shadowLayer: CAShapeLayer!
private var cornerRadius: CGFloat = 25.0
private var fillColor: UIColor = .blue // the color applied to the shadowLayer, rather than the view's backgroundColor
 
override func layoutSubviews() {
    super.layoutSubviews()

    if shadowLayer == nil {
        shadowLayer = CAShapeLayer()
      
        shadowLayer.path = UIBezierPath(roundedRect: bounds, cornerRadius: cornerRadius).cgPath
        shadowLayer.fillColor = fillColor.cgColor

        shadowLayer.shadowColor = UIColor.black.cgColor
        shadowLayer.shadowPath = shadowLayer.path
        shadowLayer.shadowOffset = CGSize(width: 0.0, height: 1.0)
        shadowLayer.shadowOpacity = 0.2
        shadowLayer.shadowRadius = 3

        layer.insertSublayer(shadowLayer, at: 0)
    }
}
```

Trên đây minh đã gợi ý cách cho các bạn đang gặp phải trường hợp vừa set shadow vừa set round corner trên cùng 1 View , hy vọng sẽ giúp được bạn 1 phần nào đó để giải quyết vấn đề này .

Hẹn gặp lại các bạn trong bài viết tới . Thanks for watching <3